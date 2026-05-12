import BikeBooking from "../models/BikeBooking.js";
import Transaction from "../models/Transaction.js";
import Bike from "../models/Bike.js";
import axios from "axios";

// Khalti configuration — same keys as vehicle payment
const KHALTI_CONFIG = {
  secretKey:
    process.env.KHALTI_SECRET_KEY ||
    "test_secret_key_f59e8b7d18b4499ca40f68195a846e9b",
  publicKey:
    process.env.KHALTI_PUBLIC_KEY ||
    "test_public_key_dc74e0fd57fd46ad9b351d04b3c1b6a4",
  paymentUrl: "https://a.khalti.com/api/v2/epayment/initiate/",
  verificationUrl: "https://a.khalti.com/api/v2/epayment/lookup/",
};

const generateTransactionId = () => {
  return `RENTRIDE-BIKE-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// ── Initiate Khalti payment for a bike booking ────────────────────────────────
export const initiateKhaltiBikePayment = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const userId = req.user.id;

    console.log("🏍️ Initiating Khalti bike payment for booking:", bookingId);

    const booking = await BikeBooking.findById(bookingId).populate(
      "user",
      "name email phone"
    );

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    if (booking.user._id.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized to pay for this booking" });
    }

    if (booking.status !== "approved") {
      return res.status(400).json({
        success: false,
        message: `Booking cannot be paid in ${booking.status} status. Booking must be approved first.`,
      });
    }

    if (booking.paymentStatus === "paid") {
      return res.status(400).json({ success: false, message: "Payment already completed for this booking" });
    }

    // Get bike name for order label
    const bike = await Bike.findById(booking.bike).lean();
    const bikeName = bike?.bikeName || "Bike";

    const transactionId = generateTransactionId();
    const user = booking.user;

    const paymentData = {
      amount: booking.totalAmount * 100, // Convert to paisa
      purchase_order_id: booking._id.toString(),
      purchase_order_name: `Bike Rental: ${bikeName}`,
      customer_info: {
        name: user?.name || "Customer",
        email: user?.email || "customer@example.com",
        phone: user?.phone || "9800000000",
      },
      return_url: `${process.env.FRONTEND_URL || "http://localhost:5173"}/payment-success`,
      website_url: process.env.FRONTEND_URL || "http://localhost:5173",
    };

    console.log("📤 Sending bike payment to Khalti:", {
      ...paymentData,
      amount: paymentData.amount / 100,
    });

    const response = await axios.post(KHALTI_CONFIG.paymentUrl, paymentData, {
      headers: {
        Authorization: `Key ${KHALTI_CONFIG.secretKey}`,
        "Content-Type": "application/json",
      },
    });

    if (response.data && response.data.payment_url) {
      booking.paymentMethod = "online";
      booking.paymentId = transactionId;
      booking.paymentStatus = "pending";
      await booking.save();

      // Reuse the same Transaction model
      const transaction = new Transaction({
        bookingId: booking._id,
        userId: userId,
        transactionId: transactionId,
        pidx: response.data.pidx,
        amount: booking.totalAmount,
        paymentGateway: "khalti",
        status: "PENDING",
        customerDetails: {
          name: user?.name || "Customer",
          email: user?.email || "customer@example.com",
          phone: user?.phone || "9800000000",
        },
        productName: `Bike Rental: ${bikeName}`,
        productId: booking._id.toString(),
      });
      await transaction.save();

      console.log("✅ Khalti bike payment initiated:", response.data.payment_url);

      return res.json({
        success: true,
        payment_url: response.data.payment_url,
        pidx: response.data.pidx,
        transactionId: transactionId,
      });
    } else {
      throw new Error("No payment URL received from Khalti");
    }
  } catch (error) {
    console.error("❌ Khalti bike payment initiation error:", error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to initiate bike payment",
      error: error.response?.data?.detail || error.message,
    });
  }
};

// // ── Verify Khalti payment for a bike booking ──────────────────────────────────
// export const verifyKhaltiBikePayment = async (req, res) => {
//   try {
//     const { pidx, bookingId } = req.body;
//     const userId = req.user.id;

//     console.log("🔍 Verifying Khalti bike payment — booking:", bookingId, "pidx:", pidx);

//     const transaction = await Transaction.findOne({ pidx });
//     if (!transaction) {
//       return res.status(404).json({ success: false, message: "Transaction not found" });
//     }

//     if (transaction.userId.toString() !== userId) {
//       return res.status(403).json({ success: false, message: "Unauthorized to verify this transaction" });
//     }

//     // Verify with Khalti
//     const response = await axios.post(
//       KHALTI_CONFIG.verificationUrl,
//       { pidx },
//       {
//         headers: {
//           Authorization: `Key ${KHALTI_CONFIG.secretKey}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const paymentStatus = response.data;
//     console.log("Khalti bike verification response:", paymentStatus);

//     if (paymentStatus.status === "Completed") {
//       transaction.status = "COMPLETED";
//       await transaction.save();

//       const booking = await BikeBooking.findById(transaction.bookingId);
//       if (booking) {
//         booking.paymentStatus = "paid";
//         booking.paidAmount = booking.totalAmount;
//         booking.status = "confirmed";
//         booking.confirmedAt = new Date();
//         await booking.save();

//         // Keep bike as Booked (already set during approval)
//         const bike = await Bike.findById(booking.bike);
//         if (bike && bike.status !== "Booked") {
//           bike.status = "Booked";
//           await bike.save();
//           console.log("⚠️ Bike status corrected to Booked after payment");
//         }

//         console.log("✅ Bike payment verified, booking confirmed:", booking._id);
//       }

//       return res.json({
//         success: true,
//         status: "COMPLETED",
//         message: "Bike payment verified successfully",
//         booking: {
//           id: booking._id,
//           status: booking.status,
//           confirmationCode: booking.confirmationCode,
//         },
//       });
//     } else {
//       transaction.status = "FAILED";
//       await transaction.save();

//       return res.json({
//         success: false,
//         status: "FAILED",
//         message: "Bike payment verification failed",
//       });
//     }
//   } catch (error) {
//     console.error("❌ Khalti bike verification error:", error.response?.data || error.message);
//     return res.status(500).json({
//       success: false,
//       message: "Bike payment verification failed",
//       error: error.response?.data?.detail || error.message,
//     });
//   }
// };


export const verifyKhaltiBikePayment = async (req, res) => {
  try {
    const { pidx, bookingId } = req.body;
    const userId = req.user.id;

    console.log("🔍 Verifying Khalti bike payment — booking:", bookingId, "pidx:", pidx);

    const transaction = await Transaction.findOne({ pidx });
    if (!transaction) {
      return res.status(404).json({ success: false, message: "Transaction not found" });
    }

    if (transaction.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized to verify this transaction" });
    }

    const response = await axios.post(
      KHALTI_CONFIG.verificationUrl,
      { pidx },
      { headers: { Authorization: `Key ${KHALTI_CONFIG.secretKey}`, "Content-Type": "application/json" } }
    );

    const paymentStatus = response.data;
    console.log("Khalti bike verification response:", paymentStatus);

    if (paymentStatus.status === "Completed") {
      transaction.status = "COMPLETED";
      await transaction.save();

      const booking = await BikeBooking.findById(transaction.bookingId);
      if (booking) {
        booking.paymentStatus = "paid";
        booking.paidAmount = booking.totalAmount;
        booking.status = "confirmed";
        booking.confirmedAt = new Date();
        booking.holdExpiresAt = null; // ← clear hold timer
        await booking.save();

        // ── Set bike to Booked now that payment is confirmed ─────────────────
        await Bike.findByIdAndUpdate(booking.bike, {
          status: "Booked",      // ← now truly booked after payment
          holdExpiresAt: null,   // ← clear hold timer
        });
        console.log("✅ Bike set to Booked after payment");

        console.log("✅ Bike payment verified, booking confirmed:", booking._id);
      }

      return res.json({
        success: true,
        status: "COMPLETED",
        message: "Bike payment verified successfully",
        booking: {
          id: booking._id,
          status: booking.status,
          confirmationCode: booking.confirmationCode,
        },
      });
    } else {
      transaction.status = "FAILED";
      await transaction.save();

      return res.json({
        success: false,
        status: "FAILED",
        message: "Bike payment verification failed",
      });
    }
  } catch (error) {
    console.error("❌ Khalti bike verification error:", error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: "Bike payment verification failed",
      error: error.response?.data?.detail || error.message,
    });
  }
};

// ── Get bike payment status ───────────────────────────────────────────────────
export const getBikePaymentStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const userId = req.user.id;

    const booking = await BikeBooking.findOne({ _id: bookingId, user: userId });
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    return res.json({
      success: true,
      paymentStatus: booking.paymentStatus,
      paymentId: booking.paymentId,
      amount: booking.totalAmount,
      paidAmount: booking.paidAmount,
    });
  } catch (error) {
    console.error("Error fetching bike payment status:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch payment status" });
  }
};