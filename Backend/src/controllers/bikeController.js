import Bike from "../models/Bike.js";
import BikeBooking from "../models/BikeBooking.js";
import {
  createBikeOnHoldNotification,
  createBikeBookingApprovedNotification,
  createBikePaymentRequiredNotification,
} from "../utils/notificationHelper.js";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "../../uploads/bikes");

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/jpg", "image/webp"];
const ALLOWED_LABEL = "JPG, JPEG, WEBP";
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const validateImageFiles = (files) => {
  if (!files || files.length === 0) return { valid: true };
  for (const file of files) {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype))
      return {
        valid: false,
        error: `"${file.originalname}": Only ${ALLOWED_LABEL} images are allowed`,
      };
    if (file.size > MAX_FILE_SIZE)
      return {
        valid: false,
        error: `"${file.originalname}": File size must be less than 5MB`,
      };
  }
  return { valid: true };
};

const cleanupFiles = (files) => {
  if (files && files.length) {
    files.forEach((file) => {
      const filePath = path.join(uploadDir, file.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`🗑️ Deleted file: ${file.filename}`);
      }
    });
  }
};

export const getBikeBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const isAdmin = req.user.role === "admin";

    const booking = await BikeBooking.findById(id)
      .populate("bike", "bikeName bikeType engineCapacity photos ratePerDay")
      .populate("user", "name email phone");

    if (!booking)
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });

    if (!isAdmin && booking.user._id.toString() !== userId)
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized to view this booking" });

    res.json({ success: true, data: booking });
  } catch (error) {
    console.error("Error fetching bike booking:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch booking",
      error: error.message,
    });
  }
};

// ========== BIKE CRUD ==========

export const getAllBikes = async (req, res) => {
  try {
    const { type, status, search } = req.query;
    let query = {};
    if (type && type !== "all") query.bikeType = type;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { bikeName: { $regex: search, $options: "i" } },
        { bikeNumber: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
      ];
    }
    const bikes = await Bike.find(query).sort({ createdAt: -1 });
    res.json({ success: true, data: bikes });
  } catch (error) {
    console.error("Error fetching bikes:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch bikes",
      error: error.message,
    });
  }
};

export const getBikeById = async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id);
    if (!bike)
      return res
        .status(404)
        .json({ success: false, message: "Bike not found" });
    res.json({ success: true, data: bike });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch bike",
      error: error.message,
    });
  }
};

export const createBike = async (req, res) => {
  try {
    console.log("📝 Creating new bike...");
    const bikeData = { ...req.body };
    [
      "ratePerDay",
      "ratePerWeek",
      "securityDeposit",
      "quantity",
      "minimumAge",
      "year",
    ].forEach((f) => {
      if (bikeData[f]) bikeData[f] = Number(bikeData[f]);
    });
    if (bikeData.features && typeof bikeData.features === "string") {
      bikeData.features = bikeData.features
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean);
    }
    if (req.files && req.files.length > 0) {
      const validation = validateImageFiles(req.files);
      if (!validation.valid) {
        cleanupFiles(req.files);
        return res
          .status(400)
          .json({ success: false, message: validation.error });
      }
      const photoLabels = ["Front View", "Rear View", "Extra View"];
      bikeData.photos = req.files.map((file, index) => ({
        label: photoLabels[index] || "Extra View",
        filename: file.filename,
      }));
    } else {
      bikeData.photos = [];
    }
    bikeData.createdBy = req.user.id;
    const bike = new Bike(bikeData);
    await bike.save();
    console.log(`✅ Bike created: ${bike.bikeName}`);
    res
      .status(201)
      .json({ success: true, message: "Bike added successfully", data: bike });
  } catch (error) {
    cleanupFiles(req.files);
    if (error.code === 11000)
      return res
        .status(400)
        .json({ success: false, message: "Bike number already exists" });
    res
      .status(500)
      .json({ success: false, message: error.message || "Failed to add bike" });
  }
};

export const updateBike = async (req, res) => {
  try {
    const bikeData = { ...req.body };
    [
      "ratePerDay",
      "ratePerWeek",
      "securityDeposit",
      "quantity",
      "minimumAge",
      "year",
    ].forEach((f) => {
      if (bikeData[f]) bikeData[f] = Number(bikeData[f]);
    });
    if (bikeData.features && typeof bikeData.features === "string") {
      bikeData.features = bikeData.features
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean);
    }
    if (req.files && req.files.length > 0) {
      const validation = validateImageFiles(req.files);
      if (!validation.valid) {
        cleanupFiles(req.files);
        return res
          .status(400)
          .json({ success: false, message: validation.error });
      }
      const photoLabels = ["Front View", "Rear View", "Extra View"];
      bikeData.photos = req.files.map((file, index) => ({
        label: photoLabels[index] || "Extra View",
        filename: file.filename,
      }));
    }
    const bike = await Bike.findByIdAndUpdate(req.params.id, bikeData, {
      new: true,
      runValidators: true,
    });
    if (!bike) {
      cleanupFiles(req.files);
      return res
        .status(404)
        .json({ success: false, message: "Bike not found" });
    }
    res.json({
      success: true,
      message: "Bike updated successfully",
      data: bike,
    });
  } catch (error) {
    cleanupFiles(req.files);
    res.status(500).json({
      success: false,
      message: "Failed to update bike",
      error: error.message,
    });
  }
};

export const deleteBike = async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id);
    if (!bike)
      return res
        .status(404)
        .json({ success: false, message: "Bike not found" });
    if (bike.photos?.length > 0) {
      bike.photos.forEach((photo) => {
        const filePath = path.join(uploadDir, photo.filename);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      });
    }
    await Bike.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Bike deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete bike",
      error: error.message,
    });
  }
};

export const updateBikeStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const bike = await Bike.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );
    if (!bike)
      return res
        .status(404)
        .json({ success: false, message: "Bike not found" });
    res.json({ success: true, message: "Bike status updated", data: bike });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update status",
      error: error.message,
    });
  }
};

// ========== BIKE BOOKING ==========

export const createBikeBooking = async (req, res) => {
  try {
    const {
      bikeId,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
      pickupLocation,
      dropoffLocation,
      extraHelmet,
      ridingGear,
      specialRequests,
      riderExperience,
      emergencyContact,
    } = req.body;

    const userId = req.user.id;
    const bike = await Bike.findById(bikeId);
    if (!bike)
      return res
        .status(404)
        .json({ success: false, message: "Bike not found" });
    if (bike.status !== "Available")
      return res
        .status(400)
        .json({ success: false, message: "Bike is not available" });

    const pickupDateTime = new Date(pickupDate);
    const returnDateTime = new Date(returnDate);
    const totalDays = Math.ceil(
      (returnDateTime - pickupDateTime) / (1000 * 3600 * 24),
    );
    if (totalDays < 1)
      return res
        .status(400)
        .json({ success: false, message: "Minimum booking is 1 day" });

    const basePrice = bike.ratePerDay * totalDays;
    const serviceFee = 200;
    let extraCharges = 0;
    if (extraHelmet) extraCharges += 100 * totalDays;
    if (ridingGear) extraCharges += 200 * totalDays;
    const totalAmount = basePrice + serviceFee + extraCharges;

    const booking = new BikeBooking({
      user: userId,
      bike: bikeId,
      pickupDate: pickupDateTime,
      pickupTime,
      returnDate: returnDateTime,
      returnTime,
      pickupLocation: pickupLocation || "Kathmandu, Nepal",
      dropoffLocation: dropoffLocation || "Kathmandu, Nepal",
      totalDays,
      basePrice,
      serviceFee,
      totalAmount,
      extraHelmet: extraHelmet || false,
      ridingGear: ridingGear || false,
      specialRequests: specialRequests || "",
      riderExperience: riderExperience || "Intermediate",
      emergencyContact: emergencyContact || {},
      status: "pending",
      paymentStatus: "pending",
    });

    await booking.save();

    await createNotification(
      userId,
      "Bike Booking Created 🏍️",
      `Your booking for ${bike.bikeName} is awaiting approval.`,
      "info",
      `Booking ID: ${booking.confirmationCode}`,
      { bookingId: booking._id },
    );

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: {
        bookingId: booking._id,
        confirmationCode: booking.confirmationCode,
        bike: bike.bikeName,
        totalDays,
        totalAmount,
        status: booking.status,
      },
    });
  } catch (error) {
    console.error("Error creating bike booking:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create booking",
      error: error.message,
    });
  }
};

export const getUserBikeBookings = async (req, res) => {
  try {
    const bookings = await BikeBooking.find({ user: req.user.id })
      .populate("bike", "bikeName bikeType ratePerDay photos")
      .sort({ createdAt: -1 });
    res.json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
};

export const getAllBikeBookings = async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};
    const bookings = await BikeBooking.find(query)
      .populate("user", "name email phone")
      .populate("bike", "bikeName bikeNumber bikeType")
      .sort({ createdAt: -1 });
    res.json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
};

// export const approveBikeBooking = async (req, res) => {
//   try {
//     const booking = await BikeBooking.findById(req.params.id).populate(
//       "user",
//       "name email",
//     );
//     if (!booking)
//       return res
//         .status(404)
//         .json({ success: false, message: "Booking not found" });

//     booking.status = "approved";
//     booking.approvedBy = req.user.id;
//     booking.approvedAt = new Date();
//     await booking.save();

//     await Bike.findByIdAndUpdate(booking.bike, { status: "Booked" });

//     // Get bike details for notifications
//     const bikeData = await Bike.findById(booking.bike);

//     // Fire both notifications — same as vehicle booking approval
//     await createBikeBookingApprovedNotification(
//       booking.user._id,
//       booking,
//       bikeData,
//     );
//     await createBikePaymentRequiredNotification(
//       booking.user._id,
//       booking,
//       bikeData,
//     );

//     res.json({ success: true, message: "Booking approved successfully" });
//   } catch (error) {
//     res
//       .status(500)
//       .json({
//         success: false,
//         message: "Failed to approve booking",
//         error: error.message,
//       });
//   }
// };

// export const approveBikeBooking = async (req, res) => {
//   try {
//     const booking = await BikeBooking.findById(req.params.id).populate(
//       "user",
//       "name email",
//     );
//     if (!booking)
//       return res
//         .status(404)
//         .json({ success: false, message: "Booking not found" });

//     booking.status = "approved";
//     booking.approvedBy = req.user.id;
//     booking.approvedAt = new Date();
//     await booking.save();

//     await Bike.findByIdAndUpdate(booking.bike, { status: "Booked" });

//     const bikeData = await Bike.findById(booking.bike);

//     console.log("🏍️ Firing bike notifications for:", bikeData?.bikeName);
//     console.log("User ID:", booking.user._id);
//     console.log("Booking amount:", booking.totalAmount);

//     try {
//       await createBikeBookingApprovedNotification(
//         booking.user._id,
//         booking,
//         bikeData,
//       );
//       console.log("✅ Approved notification sent");
//       await createBikePaymentRequiredNotification(
//         booking.user._id,
//         booking,
//         bikeData,
//       );
//       console.log("✅ Payment notification sent");
//     } catch (notifErr) {
//       console.error("❌ Notification error:", notifErr.message);
//       console.error("Stack:", notifErr.stack);
//     }

//     res.json({ success: true, message: "Booking approved successfully" });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to approve booking",
//       error: error.message,
//     });
//   }
// };


export const approveBikeBooking = async (req, res) => {
  try {
    const booking = await BikeBooking.findById(req.params.id).populate("user", "name email");
    if (!booking)
      return res.status(404).json({ success: false, message: "Booking not found" });

    const holdExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

    booking.status = "approved";
    booking.approvedBy = req.user.id;
    booking.approvedAt = new Date();
    booking.holdExpiresAt = holdExpiry;    // ← new
    await booking.save();

    // Set bike to On Hold instead of Booked
    await Bike.findByIdAndUpdate(booking.bike, {
      status: "On Hold",
      holdExpiresAt: holdExpiry,
    });

    const bikeData = await Bike.findById(booking.bike);

    try {
      await createBikeOnHoldNotification(booking.user._id, booking, bikeData);
      await createBikeBookingApprovedNotification(booking.user._id, booking, bikeData);
      await createBikePaymentRequiredNotification(booking.user._id, booking, bikeData);
    } catch (notifErr) {
      console.error("❌ Notification error:", notifErr.message);
    }

    res.json({ success: true, message: "Booking approved — bike placed on hold for 24 hours" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to approve booking", error: error.message });
  }
};

export const cancelBikeBooking = async (req, res) => {
  try {
    const { reason } = req.body;
    const booking = await BikeBooking.findById(req.params.id);
    if (!booking)
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });

    booking.status = "cancelled";
    booking.cancellationReason = reason;
    booking.cancellationDate = new Date();
    await booking.save();

    await Bike.findByIdAndUpdate(booking.bike, { status: "Available" });

    res.json({ success: true, message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to cancel booking",
      error: error.message,
    });
  }
};
