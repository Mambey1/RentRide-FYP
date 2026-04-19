import Bike from "../models/Bike.js";
import BikeBooking from "../models/BikeBooking.js";
import { createNotification } from "../utils/notificationHelper.js";

// ========== BIKE CRUD ==========

// Get all bikes (public)
export const getAllBikes = async (req, res) => {
  try {
    const { type, status, search } = req.query;
    let query = {};

    if (type && type !== "all") {
      query.bikeType = type;
    }
    if (status) {
      query.status = status;
    }
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
    res.status(500).json({ success: false, message: "Failed to fetch bikes" });
  }
};

// Get single bike
export const getBikeById = async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id);
    if (!bike) {
      return res.status(404).json({ success: false, message: "Bike not found" });
    }
    res.json({ success: true, data: bike });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch bike" });
  }
};

// Create bike (admin)
export const createBike = async (req, res) => {
  try {
    const bikeData = req.body;

    if (req.files && req.files.length > 0) {
      const photoLabels = ["Front View", "Side View", "Rear View", "Dashboard", "Extra View"];
      bikeData.photos = req.files.map((file, index) => ({
        label: photoLabels[index] || "Extra View",
        filename: file.filename,
      }));
    }

    bikeData.createdBy = req.user.id;
    const bike = new Bike(bikeData);
    await bike.save();

    res.status(201).json({ success: true, message: "Bike added successfully", data: bike });
  } catch (error) {
    console.error("Error creating bike:", error);
    res.status(500).json({ success: false, message: "Failed to add bike" });
  }
};

// Update bike (admin)
export const updateBike = async (req, res) => {
  try {
    const bikeData = req.body;

    if (req.files && req.files.length > 0) {
      const photoLabels = ["Front View", "Side View", "Rear View", "Dashboard", "Extra View"];
      bikeData.photos = req.files.map((file, index) => ({
        label: photoLabels[index] || "Extra View",
        filename: file.filename,
      }));
    }

    const bike = await Bike.findByIdAndUpdate(req.params.id, bikeData, { new: true });
    if (!bike) {
      return res.status(404).json({ success: false, message: "Bike not found" });
    }

    res.json({ success: true, message: "Bike updated successfully", data: bike });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update bike" });
  }
};

// Delete bike (admin)
export const deleteBike = async (req, res) => {
  try {
    const bike = await Bike.findByIdAndDelete(req.params.id);
    if (!bike) {
      return res.status(404).json({ success: false, message: "Bike not found" });
    }
    res.json({ success: true, message: "Bike deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete bike" });
  }
};

// Update bike status
export const updateBikeStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const bike = await Bike.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!bike) {
      return res.status(404).json({ success: false, message: "Bike not found" });
    }
    res.json({ success: true, message: "Bike status updated", data: bike });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update status" });
  }
};

// ========== BIKE BOOKING ==========

// Create bike booking
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
      helmetIncluded,
      extraHelmet,
      ridingGear,
      specialRequests,
      riderExperience,
      emergencyContact,
    } = req.body;

    const userId = req.user.id;

    // Get bike details
    const bike = await Bike.findById(bikeId);
    if (!bike) {
      return res.status(404).json({ success: false, message: "Bike not found" });
    }

    if (bike.status !== "Available") {
      return res.status(400).json({ success: false, message: "Bike is not available" });
    }

    // Calculate days
    const pickupDateTime = new Date(pickupDate);
    const returnDateTime = new Date(returnDate);
    const totalDays = Math.ceil((returnDateTime - pickupDateTime) / (1000 * 3600 * 24));

    if (totalDays < 1) {
      return res.status(400).json({ success: false, message: "Minimum booking is 1 day" });
    }

    // Calculate pricing
    const basePrice = bike.ratePerDay * totalDays;
    const serviceFee = 200;
    let extraCharges = 0;
    if (extraHelmet) extraCharges += 100 * totalDays;
    if (ridingGear) extraCharges += 200 * totalDays;
    const totalAmount = basePrice + serviceFee + extraCharges;

    // Create booking
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
      helmetIncluded: helmetIncluded !== false,
      extraHelmet: extraHelmet || false,
      ridingGear: ridingGear || false,
      specialRequests: specialRequests || "",
      riderExperience: riderExperience || "Intermediate",
      emergencyContact: emergencyContact || {},
      status: "pending",
      paymentStatus: "pending",
    });

    await booking.save();

    // Create notification
    await createNotification(
      userId,
      "Bike Booking Created 🏍️",
      `Your booking for ${bike.bikeName} has been created and is awaiting approval.`,
      "info",
      `Booking ID: ${booking.confirmationCode}`,
      { bookingId: booking._id }
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
    res.status(500).json({ success: false, message: "Failed to create booking" });
  }
};

// Get user's bike bookings
export const getUserBikeBookings = async (req, res) => {
  try {
    const bookings = await BikeBooking.find({ user: req.user.id })
      .populate("bike", "bikeName bikeType ratePerDay photos")
      .sort({ createdAt: -1 });
    res.json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch bookings" });
  }
};

// Get all bike bookings (admin)
export const getAllBikeBookings = async (req, res) => {
  try {
    const { status } = req.query;
    const query = {};
    if (status) query.status = status;

    const bookings = await BikeBooking.find(query)
      .populate("user", "name email phone")
      .populate("bike", "bikeName bikeNumber bikeType")
      .sort({ createdAt: -1 });
    res.json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch bookings" });
  }
};

// Approve bike booking
export const approveBikeBooking = async (req, res) => {
  try {
    const booking = await BikeBooking.findById(req.params.id).populate("user", "name email");
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    booking.status = "approved";
    booking.approvedBy = req.user.id;
    booking.approvedAt = new Date();
    await booking.save();

    // Update bike status
    await Bike.findByIdAndUpdate(booking.bike, { status: "Booked" });

    await createNotification(
      booking.user._id,
      "Bike Booking Approved 🏍️",
      `Your booking for bike has been approved! Complete payment to confirm.`,
      "success",
      `Booking ID: ${booking.confirmationCode}`,
      { bookingId: booking._id }
    );

    res.json({ success: true, message: "Booking approved successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to approve booking" });
  }
};

// Cancel bike booking
export const cancelBikeBooking = async (req, res) => {
  try {
    const { reason } = req.body;
    const booking = await BikeBooking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    booking.status = "cancelled";
    booking.cancellationReason = reason;
    booking.cancellationDate = new Date();
    await booking.save();

    // Update bike status back to available
    await Bike.findByIdAndUpdate(booking.bike, { status: "Available" });

    res.json({ success: true, message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to cancel booking" });
  }
};