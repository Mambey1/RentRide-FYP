// import Booking from "../models/Booking.js";
// import Transaction from "../models/Transaction.js";
// import axios from "axios";
// import crypto from "crypto";

// // Khalti configuration
// const KHALTI_CONFIG = {
//   secretKey:
//     process.env.KHALTI_SECRET_KEY ||
//     "test_secret_key_f59e8b7d18b4499ca40f68195a846e9b",
//   publicKey:
//     process.env.KHALTI_PUBLIC_KEY ||
//     "test_public_key_dc74e0fd57fd46ad9b351d04b3c1b6a4",
//   paymentUrl: "https://a.khalti.com/api/v2/epayment/initiate/",
//   verificationUrl: "https://a.khalti.com/api/v2/epayment/lookup/",
// };

// // Generate unique transaction ID
// const generateTransactionId = () => {
//   return `RENTRIDE-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
// };

// // Initiate Khalti payment
// export const initiateKhaltiPayment = async (req, res) => {
//   try {
//     const { bookingId } = req.body;
//     const userId = req.user.id;

//     console.log("🔐 Initiating Khalti payment for booking:", bookingId);

//     // Find the booking
//     const booking = await Booking.findOne({
//       _id: bookingId,
//       user: userId,
//     }).populate("vehicle");

//     if (!booking) {
//       return res.status(404).json({
//         success: false,
//         message: "Booking not found",
//       });
//     }

//     // Check if payment already completed
//     if (booking.paymentStatus === "paid") {
//       return res.status(400).json({
//         success: false,
//         message: "Payment already completed for this booking",
//       });
//     }

//     // Generate transaction ID
//     const transactionId = generateTransactionId();

//     // Get customer info
//     const user = await User.findById(userId);

//     // Prepare Khalti payment data
//     const paymentData = {
//       amount: booking.totalAmount * 100, // Convert to paisa
//       purchase_order_id: booking._id.toString(),
//       purchase_order_name: `Car Rental: ${booking.vehicle?.carName || "Vehicle"}`,
//       customer_info: {
//         name: user?.name || "Customer",
//         email: user?.email || "customer@example.com",
//         phone: user?.phone || "9800000000",
//       },
//       return_url: `${process.env.FRONTEND_URL || "http://localhost:5173"}/payment-success`,
//       website_url: process.env.FRONTEND_URL || "http://localhost:5173",
//     };

//     console.log("📤 Sending to Khalti:", {
//       ...paymentData,
//       amount: paymentData.amount / 100,
//     });

//     // Make request to Khalti
//     const response = await axios.post(KHALTI_CONFIG.paymentUrl, paymentData, {
//       headers: {
//         Authorization: `Key ${KHALTI_CONFIG.secretKey}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (response.data && response.data.payment_url) {
//       // Update booking with payment info
//       booking.paymentMethod = "online";
//       booking.paymentId = transactionId;
//       booking.paymentStatus = "pending";
//       await booking.save();

//       // Create transaction record
//       const transaction = new Transaction({
//         bookingId: booking._id,
//         userId: userId,
//         transactionId: transactionId,
//         pidx: response.data.pidx,
//         amount: booking.totalAmount,
//         paymentGateway: "khalti",
//         status: "PENDING",
//         customerDetails: {
//           name: user?.name || "Customer",
//           email: user?.email || "customer@example.com",
//           phone: user?.phone || "9800000000",
//         },
//         productName: `Car Rental: ${booking.vehicle?.carName || "Vehicle"}`,
//         productId: booking._id.toString(),
//       });
//       await transaction.save();

//       console.log(
//         "✅ Khalti payment initiated, redirecting to:",
//         response.data.payment_url,
//       );

//       return res.json({
//         success: true,
//         payment_url: response.data.payment_url,
//         pidx: response.data.pidx,
//         transactionId: transactionId,
//       });
//     } else {
//       throw new Error("No payment URL received from Khalti");
//     }
//   } catch (error) {
//     console.error(
//       "❌ Khalti payment initiation error:",
//       error.response?.data || error.message,
//     );
//     return res.status(500).json({
//       success: false,
//       message: "Failed to initiate payment",
//       error: error.response?.data?.detail || error.message,
//     });
//   }
// };

// // Verify Khalti payment
// export const verifyKhaltiPayment = async (req, res) => {
//   try {
//     const { pidx, bookingId } = req.body;

//     console.log(
//       "🔍 Verifying Khalti payment for booking:",
//       bookingId,
//       "pidx:",
//       pidx,
//     );

//     // Find transaction
//     const transaction = await Transaction.findOne({ pidx });
//     if (!transaction) {
//       return res.status(404).json({
//         success: false,
//         message: "Transaction not found",
//       });
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
//       },
//     );

//     const paymentStatus = response.data;
//     console.log("Khalti verification response:", paymentStatus);

//     // Update transaction status
//     if (paymentStatus.status === "Completed") {
//       transaction.status = "COMPLETED";
//       await transaction.save();

//       // Update booking
//       const booking = await Booking.findById(transaction.bookingId);
//       if (booking) {
//         booking.paymentStatus = "paid";
//         booking.paidAmount = booking.totalAmount;
//         booking.status = "confirmed"; // Auto-confirm after payment
//         booking.confirmedAt = new Date();
//         await booking.save();

//         // Update vehicle status if needed
//         if (booking.vehicleType === "user") {
//           await UserVehicle.findByIdAndUpdate(booking.vehicle, {
//             status: "booked",
//           });
//         } else {
//           await Vehicle.findByIdAndUpdate(booking.vehicle, {
//             status: "Booked",
//           });
//         }

//         console.log("✅ Payment verified and booking confirmed:", booking._id);
//       }

//       return res.json({
//         success: true,
//         status: "COMPLETED",
//         message: "Payment verified successfully",
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
//         message: "Payment verification failed",
//       });
//     }
//   } catch (error) {
//     console.error(
//       "❌ Khalti verification error:",
//       error.response?.data || error.message,
//     );
//     return res.status(500).json({
//       success: false,
//       message: "Payment verification failed",
//       error: error.response?.data?.detail || error.message,
//     });
//   }
// };

// // Get payment status
// export const getPaymentStatus = async (req, res) => {
//   try {
//     const { bookingId } = req.params;
//     const userId = req.user.id;

//     const booking = await Booking.findOne({
//       _id: bookingId,
//       user: userId,
//     });

//     if (!booking) {
//       return res.status(404).json({
//         success: false,
//         message: "Booking not found",
//       });
//     }

//     return res.json({
//       success: true,
//       paymentStatus: booking.paymentStatus,
//       paymentId: booking.paymentId,
//       amount: booking.totalAmount,
//       paidAmount: booking.paidAmount,
//     });
//   } catch (error) {
//     console.error("Error fetching payment status:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch payment status",
//     });
//   }
// };

// // Webhook for payment callbacks (optional)
// export const handlePaymentWebhook = async (req, res) => {
//   try {
//     const { pidx, status, transaction_id } = req.body;

//     console.log("📡 Payment webhook received:", {
//       pidx,
//       status,
//       transaction_id,
//     });

//     // Find transaction
//     const transaction = await Transaction.findOne({ pidx });
//     if (!transaction) {
//       return res.status(404).json({
//         success: false,
//         message: "Transaction not found",
//       });
//     }

//     if (status === "Completed") {
//       transaction.status = "COMPLETED";
//       await transaction.save();

//       const booking = await Booking.findById(transaction.bookingId);
//       if (booking && booking.paymentStatus !== "paid") {
//         booking.paymentStatus = "paid";
//         booking.paidAmount = booking.totalAmount;
//         booking.status = "confirmed";
//         booking.confirmedAt = new Date();
//         await booking.save();

//         console.log("✅ Webhook: Payment completed for booking:", booking._id);
//       }
//     }

//     res.json({ success: true });
//   } catch (error) {
//     console.error("Webhook error:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Webhook processing failed" });
//   }
// };

import Booking from "../models/Booking.js";
import Transaction from "../models/Transaction.js";
import Vehicle from "../models/Vehicle.js";
import UserVehicle from "../models/UserVehicle.js";
import axios from "axios";

// Khalti configuration
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

// Generate unique transaction ID
const generateTransactionId = () => {
  return `RENTRIDE-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Helper function to get vehicle details
async function getVehicleDetails(vehicleId, vehicleType) {
  if (vehicleType === "user") {
    const userVehicle = await UserVehicle.findById(vehicleId).lean();
    if (userVehicle) {
      return {
        carName: userVehicle.carName,
        carType: userVehicle.carType,
      };
    }
  } else {
    const vehicle = await Vehicle.findById(vehicleId).lean();
    if (vehicle) {
      return {
        carName: vehicle.carName,
        carType: vehicle.carType,
      };
    }
  }
  return { carName: "Vehicle", carType: "Car" };
}

// Initiate Khalti payment
export const initiateKhaltiPayment = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const userId = req.user.id;

    console.log("🔐 Initiating Khalti payment for booking:", bookingId);

    // Find the booking
    const booking = await Booking.findById(bookingId).populate(
      "user",
      "name email phone",
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Check if user owns this booking
    if (booking.user._id.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to pay for this booking",
      });
    }

    // Check if booking is approved and pending payment
    if (booking.status !== "approved") {
      return res.status(400).json({
        success: false,
        message: `Booking cannot be paid in ${booking.status} status. Booking must be approved first.`,
      });
    }

    // Check if payment already completed
    if (booking.paymentStatus === "paid") {
      return res.status(400).json({
        success: false,
        message: "Payment already completed for this booking",
      });
    }

    // Check if booking has expired
    if (new Date() > booking.expiresAt) {
      booking.status = "expired";
      await booking.save();
      return res.status(400).json({
        success: false,
        message: "Booking has expired. Please create a new booking.",
      });
    }

    // Get vehicle details
    const vehicleData = await getVehicleDetails(
      booking.vehicle,
      booking.vehicleType,
    );

    // Generate transaction ID
    const transactionId = generateTransactionId();

    // Get user info
    const user = booking.user;

    // Prepare Khalti payment data
    const paymentData = {
      amount: booking.totalAmount * 100, // Convert to paisa
      purchase_order_id: booking._id.toString(),
      purchase_order_name: `Car Rental: ${vehicleData.carName}`,
      customer_info: {
        name: user?.name || "Customer",
        email: user?.email || "customer@example.com",
        phone: user?.phone || "9800000000",
      },
      return_url: `${process.env.FRONTEND_URL || "http://localhost:5173"}/payment-success`,
      website_url: process.env.FRONTEND_URL || "http://localhost:5173",
    };

    console.log("📤 Sending to Khalti:", {
      ...paymentData,
      amount: paymentData.amount / 100,
      bookingId: booking._id,
      totalAmount: booking.totalAmount,
    });

    // Make request to Khalti
    const response = await axios.post(KHALTI_CONFIG.paymentUrl, paymentData, {
      headers: {
        Authorization: `Key ${KHALTI_CONFIG.secretKey}`,
        "Content-Type": "application/json",
      },
    });

    if (response.data && response.data.payment_url) {
      // Update booking with payment info
      booking.paymentMethod = "online";
      booking.paymentId = transactionId;
      booking.paymentStatus = "pending";
      await booking.save();

      // Create transaction record
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
        productName: `Car Rental: ${vehicleData.carName}`,
        productId: booking._id.toString(),
      });
      await transaction.save();

      console.log(
        "✅ Khalti payment initiated, redirecting to:",
        response.data.payment_url,
      );

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
    console.error(
      "❌ Khalti payment initiation error:",
      error.response?.data || error.message,
    );
    return res.status(500).json({
      success: false,
      message: "Failed to initiate payment",
      error: error.response?.data?.detail || error.message,
    });
  }
};

// Verify Khalti payment
export const verifyKhaltiPayment = async (req, res) => {
  try {
    const { pidx, bookingId } = req.body;
    const userId = req.user.id;

    console.log(
      "🔍 Verifying Khalti payment for booking:",
      bookingId,
      "pidx:",
      pidx,
    );

    // Find transaction
    const transaction = await Transaction.findOne({ pidx });
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    // Verify user owns this transaction
    if (transaction.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to verify this transaction",
      });
    }

    // Verify with Khalti
    const response = await axios.post(
      KHALTI_CONFIG.verificationUrl,
      { pidx },
      {
        headers: {
          Authorization: `Key ${KHALTI_CONFIG.secretKey}`,
          "Content-Type": "application/json",
        },
      },
    );

    const paymentStatus = response.data;
    console.log("Khalti verification response:", paymentStatus);

    // Update transaction status
    if (paymentStatus.status === "Completed") {
      transaction.status = "COMPLETED";
      await transaction.save();

      // Update booking
      const booking = await Booking.findById(transaction.bookingId);
      if (booking) {
        booking.paymentStatus = "paid";
        booking.paidAmount = booking.totalAmount;
        booking.status = "confirmed"; // Auto-confirm after payment
        booking.confirmedAt = new Date();
        await booking.save();

        // Update vehicle status if needed
        if (booking.vehicleType === "user") {
          await UserVehicle.findByIdAndUpdate(booking.vehicle, {
            status: "booked",
          });
        } else {
          await Vehicle.findByIdAndUpdate(booking.vehicle, {
            status: "Booked",
          });
        }

        console.log("✅ Payment verified and booking confirmed:", booking._id);
      }

      return res.json({
        success: true,
        status: "COMPLETED",
        message: "Payment verified successfully",
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
        message: "Payment verification failed",
      });
    }
  } catch (error) {
    console.error(
      "❌ Khalti verification error:",
      error.response?.data || error.message,
    );
    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
      error: error.response?.data?.detail || error.message,
    });
  }
};

// Get payment status
export const getPaymentStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const userId = req.user.id;

    const booking = await Booking.findOne({
      _id: bookingId,
      user: userId,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    return res.json({
      success: true,
      paymentStatus: booking.paymentStatus,
      paymentId: booking.paymentId,
      amount: booking.totalAmount,
      paidAmount: booking.paidAmount,
    });
  } catch (error) {
    console.error("Error fetching payment status:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch payment status",
    });
  }
};
