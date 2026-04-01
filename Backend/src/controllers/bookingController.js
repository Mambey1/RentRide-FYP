// // import Booking from "../models/Booking.js";
// // import Vehicle from "../models/Vehicle.js";
// // import Document from "../models/Document.js";
// // import User from "../models/User.js";
// // import mongoose from "mongoose";
// // import {
// //   sendBookingApprovalEmail,
// //   sendBookingRejectionEmail,
// //   sendBookingConfirmationEmail,
// // } from "../utils/emailService.js";

// // // Create new booking
// // export const createBooking = async (req, res) => {
// //   try {
// //     console.log("=== 🚀 CREATE BOOKING START ===");
// //     console.log("Request body:", JSON.stringify(req.body, null, 2));
// //     console.log("User from token:", req.user ? req.user.email : "No user");

// //     const {
// //       vehicleId,
// //       pickupDate,
// //       pickupTime,
// //       returnDate,
// //       returnTime,
// //       pickupLocation,
// //       dropoffLocation,
// //       driverOption,
// //       insuranceOption,
// //       specialRequests,
// //       emergencyContact,
// //     } = req.body;

// //     const userId = req.user.id;
// //     console.log("User ID:", userId);

// //     // Validate required fields
// //     if (!vehicleId || !pickupDate || !returnDate) {
// //       console.log("❌ Missing required fields");
// //       return res.status(400).json({
// //         success: false,
// //         message: "Vehicle ID, pickup date, and return date are required",
// //       });
// //     }

// //     // Check if vehicle exists
// //     console.log("Looking for vehicle with ID:", vehicleId);
// //     const vehicle = await Vehicle.findById(vehicleId);
// //     if (!vehicle) {
// //       console.log("❌ Vehicle not found");
// //       return res.status(404).json({
// //         success: false,
// //         message: "Vehicle not found",
// //       });
// //     }
// //     console.log("✅ Vehicle found:", vehicle.carName);

// //     // Check vehicle availability
// //     if (vehicle.status !== "Available") {
// //       console.log("❌ Vehicle not available, status:", vehicle.status);
// //       return res.status(400).json({
// //         success: false,
// //         message: "Vehicle is not available for booking",
// //       });
// //     }

// //     // Parse dates
// //     const pickupDateTime = new Date(pickupDate);
// //     const returnDateTime = new Date(returnDate);

// //     console.log("Pickup date:", pickupDateTime);
// //     console.log("Return date:", returnDateTime);

// //     // Validate dates
// //     if (pickupDateTime >= returnDateTime) {
// //       console.log("❌ Return date must be after pickup date");
// //       return res.status(400).json({
// //         success: false,
// //         message: "Return date must be after pickup date",
// //       });
// //     }

// //     if (pickupDateTime < new Date()) {
// //       console.log("❌ Pickup date cannot be in the past");
// //       return res.status(400).json({
// //         success: false,
// //         message: "Pickup date cannot be in the past",
// //       });
// //     }

// //     // Calculate total days
// //     const timeDiff = returnDateTime.getTime() - pickupDateTime.getTime();
// //     const totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
// //     console.log("Total days:", totalDays);

// //     if (totalDays < 1) {
// //       console.log("❌ Minimum booking duration is 1 day");
// //       return res.status(400).json({
// //         success: false,
// //         message: "Minimum booking duration is 1 day",
// //       });
// //     }

// //     // Calculate pricing
// //     const basePrice = (vehicle.ratePerDay || 5000) * totalDays;
// //     const driverFee = driverOption === "with" ? 500 * totalDays : 0;
// //     const insuranceFee = insuranceOption === "premium" ? 1500 * totalDays : 0;
// //     const serviceFee = 500;
// //     const tax = 0;
// //     const totalAmount = basePrice + driverFee + insuranceFee + serviceFee + tax;

// //     console.log("💰 Pricing calculated:", {
// //       basePrice,
// //       driverFee,
// //       insuranceFee,
// //       serviceFee,
// //       totalAmount,
// //     });

// //     // Check for overlapping bookings
// //     const overlappingBookings = await Booking.find({
// //       vehicle: vehicleId,
// //       status: { $in: ["approved", "confirmed", "active"] },
// //       $or: [
// //         {
// //           pickupDate: { $lt: returnDateTime },
// //           returnDate: { $gt: pickupDateTime },
// //         },
// //       ],
// //     });
// //     console.log("Overlapping bookings found:", overlappingBookings.length);

// //     if (overlappingBookings.length > 0) {
// //       console.log("❌ Vehicle already booked for these dates");
// //       return res.status(400).json({
// //         success: false,
// //         message: "Vehicle is already booked for the selected dates",
// //       });
// //     }

// //     // Create booking
// //     const bookingData = {
// //       user: userId,
// //       vehicle: vehicleId,
// //       pickupDate: pickupDateTime,
// //       pickupTime,
// //       returnDate: returnDateTime,
// //       returnTime,
// //       pickupLocation,
// //       dropoffLocation,
// //       totalDays,
// //       basePrice,
// //       driverFee,
// //       insuranceFee,
// //       serviceFee,
// //       tax,
// //       totalAmount,
// //       driverOption,
// //       insuranceOption,
// //       specialRequests: specialRequests || "",
// //       emergencyContact: {
// //         name: emergencyContact?.name || "",
// //         phone: emergencyContact?.phone || "",
// //         relationship: emergencyContact?.relationship || "",
// //       },
// //       status: "pending",
// //     };

// //     console.log("📝 Creating booking with data:", bookingData);
// //     const booking = new Booking(bookingData);
// //     await booking.save();
// //     console.log("✅ Booking saved with ID:", booking._id);
// //     console.log("✅ Confirmation code:", booking.confirmationCode);

// //     // Populate vehicle details
// //     await booking.populate("vehicle", "carName carType carNumber photos");
// //     console.log("✅ Booking populated with vehicle details");

// //     const responseData = {
// //       success: true,
// //       message: "Booking created successfully. Waiting for admin approval.",
// //       data: {
// //         booking: {
// //           id: booking._id,
// //           confirmationCode: booking.confirmationCode,
// //           vehicle: booking.vehicle.carName,
// //           pickupDate: booking.pickupDate,
// //           returnDate: booking.returnDate,
// //           totalDays: booking.totalDays,
// //           totalAmount: booking.totalAmount,
// //           status: booking.status,
// //           createdAt: booking.createdAt,
// //         },
// //         nextStep: "Upload documents for verification",
// //       },
// //     };

// //     console.log("📤 Sending response:", JSON.stringify(responseData, null, 2));

// //     res.status(201).json(responseData);
// //   } catch (error) {
// //     console.error("=== ❌ CREATE BOOKING ERROR ===");
// //     console.error("Error name:", error.name);
// //     console.error("Error message:", error.message);
// //     console.error("Error stack:", error.stack);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to create booking",
// //       error:
// //         process.env.NODE_ENV === "development"
// //           ? error.message
// //           : "Internal server error",
// //     });
// //   }
// // };

// // // Get user's bookings
// // export const getUserBookings = async (req, res) => {
// //   try {
// //     const userId = req.user.id;
// //     const { status, page = 1, limit = 10 } = req.query;

// //     const query = { user: userId };
// //     if (status) {
// //       query.status = status;
// //     }

// //     const skip = (page - 1) * limit;

// //     const bookings = await Booking.find(query)
// //       .populate("vehicle", "carName carType photos")
// //       .sort({ createdAt: -1 })
// //       .skip(skip)
// //       .limit(parseInt(limit))
// //       .lean();

// //     const total = await Booking.countDocuments(query);

// //     res.status(200).json({
// //       success: true,
// //       data: {
// //         bookings,
// //         pagination: {
// //           page: parseInt(page),
// //           limit: parseInt(limit),
// //           total,
// //           pages: Math.ceil(total / limit),
// //         },
// //       },
// //     });
// //   } catch (error) {
// //     console.error("Get user bookings error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to fetch bookings",
// //     });
// //   }
// // };

// // // Get booking by ID
// // export const getBookingById = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const userId = req.user.id;
// //     const isAdmin = req.user.role === "admin";

// //     const booking = await Booking.findById(id)
// //       .populate("vehicle", "carName carType carNumber photos ratePerDay")
// //       .populate("user", "name email phone")
// //       .populate("approvedBy", "name email")
// //       .populate("rejectedBy", "name email")
// //       .lean();

// //     if (!booking) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Booking not found",
// //       });
// //     }

// //     // Check permissions
// //     if (!isAdmin && booking.user._id.toString() !== userId) {
// //       return res.status(403).json({
// //         success: false,
// //         message: "Unauthorized to view this booking",
// //       });
// //     }

// //     // Get documents if any
// //     const documents = await Document.findOne({ booking: id });

// //     res.status(200).json({
// //       success: true,
// //       data: {
// //         booking: {
// //           ...booking,
// //           documents,
// //         },
// //       },
// //     });
// //   } catch (error) {
// //     console.error("Get booking error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to fetch booking details",
// //     });
// //   }
// // };

// // // Update booking (user)
// // export const updateBooking = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const userId = req.user.id;
// //     const updateData = req.body;

// //     const booking = await Booking.findById(id);

// //     if (!booking) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Booking not found",
// //       });
// //     }

// //     // Check ownership
// //     if (booking.user.toString() !== userId) {
// //       return res.status(403).json({
// //         success: false,
// //         message: "Unauthorized to update this booking",
// //       });
// //     }

// //     // Check if booking can be updated
// //     if (!["pending", "approved"].includes(booking.status)) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Booking cannot be updated in its current status",
// //       });
// //     }

// //     // Only allow certain fields to be updated
// //     const allowedUpdates = [
// //       "pickupTime",
// //       "returnTime",
// //       "pickupLocation",
// //       "dropoffLocation",
// //       "specialRequests",
// //       "emergencyContact",
// //     ];

// //     const updates = {};
// //     allowedUpdates.forEach((field) => {
// //       if (updateData[field] !== undefined) {
// //         updates[field] = updateData[field];
// //       }
// //     });

// //     // Update booking
// //     const updatedBooking = await Booking.findByIdAndUpdate(
// //       id,
// //       { $set: updates },
// //       { new: true, runValidators: true },
// //     ).populate("vehicle", "carName carType");

// //     res.status(200).json({
// //       success: true,
// //       message: "Booking updated successfully",
// //       data: {
// //         booking: updatedBooking,
// //       },
// //     });
// //   } catch (error) {
// //     console.error("Update booking error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to update booking",
// //     });
// //   }
// // };

// // // Cancel booking (user)
// // export const cancelBooking = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const userId = req.user.id;
// //     const { reason } = req.body;

// //     const booking = await Booking.findById(id);

// //     if (!booking) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Booking not found",
// //       });
// //     }

// //     // Check ownership
// //     if (booking.user.toString() !== userId) {
// //       return res.status(403).json({
// //         success: false,
// //         message: "Unauthorized to cancel this booking",
// //       });
// //     }

// //     // Check if booking can be cancelled
// //     if (!booking.canBeCancelled) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Booking cannot be cancelled at this time",
// //       });
// //     }

// //     // Calculate refund amount
// //     const refundAmount = booking.calculateRefund();

// //     // Update booking status
// //     booking.status = "cancelled";
// //     booking.cancellationDate = new Date();
// //     booking.cancellationReason = reason;

// //     // If there's a refund, update payment status
// //     if (refundAmount > 0 && booking.paidAmount > 0) {
// //       booking.paymentStatus = "refunded";
// //     }

// //     await booking.save();

// //     // Update vehicle status if needed
// //     if (booking.status === "confirmed" || booking.status === "approved") {
// //       await Vehicle.findByIdAndUpdate(booking.vehicle, {
// //         status: "Available",
// //       });
// //     }

// //     res.status(200).json({
// //       success: true,
// //       message: "Booking cancelled successfully",
// //       data: {
// //         booking: {
// //           id: booking._id,
// //           status: booking.status,
// //           refundAmount,
// //           cancellationDate: booking.cancellationDate,
// //         },
// //       },
// //     });
// //   } catch (error) {
// //     console.error("Cancel booking error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to cancel booking",
// //     });
// //   }
// // };

// // // ADMIN FUNCTIONS

// // // Get all bookings (admin)
// // export const getAllBookings = async (req, res) => {
// //   try {
// //     const {
// //       status,
// //       startDate,
// //       endDate,
// //       vehicleId,
// //       userId,
// //       page = 1,
// //       limit = 20,
// //       sortBy = "createdAt",
// //       sortOrder = "desc",
// //     } = req.query;

// //     const query = {};

// //     // Filter by status
// //     if (status) {
// //       query.status = status;
// //     }

// //     // Filter by date range
// //     if (startDate || endDate) {
// //       query.createdAt = {};
// //       if (startDate) {
// //         query.createdAt.$gte = new Date(startDate);
// //       }
// //       if (endDate) {
// //         query.createdAt.$lte = new Date(endDate);
// //       }
// //     }

// //     // Filter by vehicle
// //     if (vehicleId) {
// //       query.vehicle = vehicleId;
// //     }

// //     // Filter by user
// //     if (userId) {
// //       query.user = userId;
// //     }

// //     const skip = (page - 1) * limit;
// //     const sort = { [sortBy]: sortOrder === "desc" ? -1 : 1 };

// //     const bookings = await Booking.find(query)
// //       .populate("user", "name email phone")
// //       .populate("vehicle", "carName carNumber")
// //       .populate("approvedBy", "name")
// //       .populate("rejectedBy", "name")
// //       .sort(sort)
// //       .skip(skip)
// //       .limit(parseInt(limit))
// //       .lean();

// //     const total = await Booking.countDocuments(query);

// //     // Get statistics
// //     const stats = await Booking.aggregate([
// //       { $match: query },
// //       {
// //         $group: {
// //           _id: "$status",
// //           count: { $sum: 1 },
// //           totalRevenue: { $sum: "$totalAmount" },
// //         },
// //       },
// //     ]);

// //     res.status(200).json({
// //       success: true,
// //       data: {
// //         bookings,
// //         pagination: {
// //           page: parseInt(page),
// //           limit: parseInt(limit),
// //           total,
// //           pages: Math.ceil(total / limit),
// //         },
// //         statistics: stats,
// //       },
// //     });
// //   } catch (error) {
// //     console.error("Get all bookings error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to fetch bookings",
// //     });
// //   }
// // };

// // // Approve booking (admin) - WITH EMAIL
// // export const approveBooking = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const adminId = req.user.id;

// //     const booking = await Booking.findById(id)
// //       .populate("vehicle")
// //       .populate("user", "name email");

// //     if (!booking) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Booking not found",
// //       });
// //     }

// //     // Check if booking can be approved
// //     if (booking.status !== "pending") {
// //       return res.status(400).json({
// //         success: false,
// //         message: `Booking cannot be approved in ${booking.status} status`,
// //       });
// //     }

// //     // Check vehicle availability again
// //     const isAvailable = await booking.checkVehicleAvailability();
// //     if (!isAvailable) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Vehicle is no longer available for the selected dates",
// //       });
// //     }

// //     // Check if documents are uploaded
// //     const documents = await Document.findOne({ booking: id });
// //     if (!documents) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Documents are required before approval",
// //       });
// //     }

// //     // Update booking status
// //     booking.status = "approved";
// //     booking.approvedBy = adminId;
// //     booking.approvedAt = new Date();
// //     booking.expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000); // 48 hours for user confirmation

// //     await booking.save();

// //     // Update vehicle status
// //     await Vehicle.findByIdAndUpdate(booking.vehicle._id, {
// //       status: "Booked",
// //     });

// //     // SEND APPROVAL EMAIL TO USER
// //     await sendBookingApprovalEmail(booking.user.email, booking.user.name, {
// //       ...booking.toObject(),
// //       vehicle: booking.vehicle,
// //       confirmationCode: booking.confirmationCode,
// //     });

// //     res.status(200).json({
// //       success: true,
// //       message: "Booking approved successfully. Email sent to customer.",
// //       data: {
// //         booking: {
// //           id: booking._id,
// //           status: booking.status,
// //           approvedAt: booking.approvedAt,
// //           expiresAt: booking.expiresAt,
// //           confirmationCode: booking.confirmationCode,
// //         },
// //       },
// //     });
// //   } catch (error) {
// //     console.error("Approve booking error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to approve booking",
// //     });
// //   }
// // };

// // // Reject booking (admin) - WITH EMAIL
// // export const rejectBooking = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const { reason } = req.body;
// //     const adminId = req.user.id;

// //     const booking = await Booking.findById(id)
// //       .populate("vehicle")
// //       .populate("user", "name email");

// //     if (!booking) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Booking not found",
// //       });
// //     }

// //     // Check if booking can be rejected
// //     if (booking.status !== "pending") {
// //       return res.status(400).json({
// //         success: false,
// //         message: `Booking cannot be rejected in ${booking.status} status`,
// //       });
// //     }

// //     // Update booking status
// //     booking.status = "rejected";
// //     booking.rejectedBy = adminId;
// //     booking.rejectedAt = new Date();
// //     booking.rejectionReason = reason;

// //     await booking.save();

// //     // SEND REJECTION EMAIL TO USER
// //     await sendBookingRejectionEmail(
// //       booking.user.email,
// //       booking.user.name,
// //       {
// //         ...booking.toObject(),
// //         vehicle: booking.vehicle,
// //         confirmationCode: booking.confirmationCode,
// //       },
// //       reason || "No specific reason provided",
// //     );

// //     res.status(200).json({
// //       success: true,
// //       message: "Booking rejected successfully. Email sent to customer.",
// //       data: {
// //         booking: {
// //           id: booking._id,
// //           status: booking.status,
// //           rejectedAt: booking.rejectedAt,
// //           rejectionReason: booking.rejectionReason,
// //         },
// //       },
// //     });
// //   } catch (error) {
// //     console.error("Reject booking error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to reject booking",
// //     });
// //   }
// // };

// // // Confirm booking (user after admin approval) - WITH EMAIL
// // export const confirmBooking = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const userId = req.user.id;

// //     const booking = await Booking.findById(id)
// //       .populate("vehicle")
// //       .populate("user", "name email");

// //     if (!booking) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Booking not found",
// //       });
// //     }

// //     // Check ownership
// //     if (booking.user.toString() !== userId) {
// //       return res.status(403).json({
// //         success: false,
// //         message: "Unauthorized to confirm this booking",
// //       });
// //     }

// //     // Check if booking can be confirmed
// //     if (booking.status !== "approved") {
// //       return res.status(400).json({
// //         success: false,
// //         message: `Booking cannot be confirmed in ${booking.status} status`,
// //       });
// //     }

// //     // Check if confirmation window expired
// //     if (new Date() > booking.expiresAt) {
// //       booking.status = "expired";
// //       await booking.save();

// //       return res.status(400).json({
// //         success: false,
// //         message: "Confirmation window has expired",
// //       });
// //     }

// //     // Update booking status
// //     booking.status = "confirmed";
// //     booking.confirmedAt = new Date();
// //     await booking.save();

// //     // SEND CONFIRMATION EMAIL TO USER
// //     await sendBookingConfirmationEmail(booking.user.email, booking.user.name, {
// //       ...booking.toObject(),
// //       vehicle: booking.vehicle,
// //       confirmationCode: booking.confirmationCode,
// //     });

// //     res.status(200).json({
// //       success: true,
// //       message: "Booking confirmed successfully. Email sent to customer.",
// //       data: {
// //         booking: {
// //           id: booking._id,
// //           status: booking.status,
// //           confirmedAt: booking.confirmedAt,
// //           confirmationCode: booking.confirmationCode,
// //         },
// //       },
// //     });
// //   } catch (error) {
// //     console.error("Confirm booking error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to confirm booking",
// //     });
// //   }
// // };

// // // Update booking status (admin - for marking as active/completed)
// // export const updateBookingStatus = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const { status, notes } = req.body;
// //     const adminId = req.user.id;

// //     const booking = await Booking.findById(id).populate("vehicle");

// //     if (!booking) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Booking not found",
// //       });
// //     }

// //     // Validate status transition
// //     const validTransitions = {
// //       confirmed: ["active"],
// //       active: ["completed", "cancelled"],
// //       completed: [], // Final state
// //       cancelled: [], // Final state
// //     };

// //     if (!validTransitions[booking.status]?.includes(status)) {
// //       return res.status(400).json({
// //         success: false,
// //         message: `Cannot transition from ${booking.status} to ${status}`,
// //       });
// //     }

// //     // Update booking
// //     const oldStatus = booking.status;
// //     booking.status = status;

// //     if (status === "active") {
// //       booking.startDate = new Date();
// //     } else if (status === "completed") {
// //       booking.endDate = new Date();
// //       // Update vehicle status back to available
// //       await Vehicle.findByIdAndUpdate(booking.vehicle._id, {
// //         status: "Available",
// //       });
// //     }

// //     await booking.save();

// //     // Add to activity log
// //     await addBookingActivity(
// //       id,
// //       adminId,
// //       `Status changed from ${oldStatus} to ${status}`,
// //       notes,
// //     );

// //     res.status(200).json({
// //       success: true,
// //       message: `Booking marked as ${status}`,
// //       data: {
// //         booking: {
// //           id: booking._id,
// //           status: booking.status,
// //           startDate: booking.startDate,
// //           endDate: booking.endDate,
// //         },
// //       },
// //     });
// //   } catch (error) {
// //     console.error("Update booking status error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to update booking status",
// //     });
// //   }
// // };

// // // Get booking statistics (admin dashboard)
// // export const getBookingStatistics = async (req, res) => {
// //   try {
// //     const { startDate, endDate } = req.query;

// //     const matchStage = {};
// //     if (startDate || endDate) {
// //       matchStage.createdAt = {};
// //       if (startDate) matchStage.createdAt.$gte = new Date(startDate);
// //       if (endDate) matchStage.createdAt.$lte = new Date(endDate);
// //     }

// //     const stats = await Booking.aggregate([
// //       { $match: matchStage },
// //       {
// //         $facet: {
// //           // Overall statistics
// //           overview: [
// //             {
// //               $group: {
// //                 _id: null,
// //                 totalBookings: { $sum: 1 },
// //                 totalRevenue: { $sum: "$totalAmount" },
// //                 avgBookingValue: { $avg: "$totalAmount" },
// //                 pendingBookings: {
// //                   $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] },
// //                 },
// //                 activeBookings: {
// //                   $sum: { $cond: [{ $eq: ["$status", "active"] }, 1, 0] },
// //                 },
// //               },
// //             },
// //           ],
// //           // By status
// //           byStatus: [
// //             {
// //               $group: {
// //                 _id: "$status",
// //                 count: { $sum: 1 },
// //                 revenue: { $sum: "$totalAmount" },
// //               },
// //             },
// //           ],
// //           // Daily trends (last 30 days)
// //           dailyTrends: [
// //             {
// //               $match: {
// //                 createdAt: {
// //                   $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
// //                 },
// //               },
// //             },
// //             {
// //               $group: {
// //                 _id: {
// //                   $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
// //                 },
// //                 bookings: { $sum: 1 },
// //                 revenue: { $sum: "$totalAmount" },
// //               },
// //             },
// //             { $sort: { _id: 1 } },
// //             { $limit: 30 },
// //           ],
// //           // By vehicle type
// //           byVehicleType: [
// //             {
// //               $lookup: {
// //                 from: "vehicles",
// //                 localField: "vehicle",
// //                 foreignField: "_id",
// //                 as: "vehicleInfo",
// //               },
// //             },
// //             { $unwind: "$vehicleInfo" },
// //             {
// //               $group: {
// //                 _id: "$vehicleInfo.carType",
// //                 count: { $sum: 1 },
// //                 revenue: { $sum: "$totalAmount" },
// //               },
// //             },
// //           ],
// //         },
// //       },
// //     ]);

// //     res.status(200).json({
// //       success: true,
// //       data: stats[0],
// //     });
// //   } catch (error) {
// //     console.error("Get statistics error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to fetch statistics",
// //     });
// //   }
// // };

// // // Helper function to get available dates for a vehicle
// // async function getAvailableDates(vehicleId) {
// //   const bookings = await Booking.find({
// //     vehicle: vehicleId,
// //     status: { $in: ["approved", "confirmed", "active"] },
// //     returnDate: { $gte: new Date() },
// //   }).sort({ pickupDate: 1 });

// //   const bookedDates = [];
// //   bookings.forEach((booking) => {
// //     const current = new Date(booking.pickupDate);
// //     const end = new Date(booking.returnDate);
// //     while (current <= end) {
// //       bookedDates.push(new Date(current).toISOString().split("T")[0]);
// //       current.setDate(current.getDate() + 1);
// //     }
// //   });

// //   return bookedDates;
// // }

// // // Helper function to add activity log
// // async function addBookingActivity(bookingId, userId, action, notes = "") {
// //   console.log(
// //     `Booking Activity: ${bookingId} - ${userId} - ${action} - ${notes}`,
// //   );
// // }

// import Booking from "../models/Booking.js";
// import Vehicle from "../models/Vehicle.js";
// import Document from "../models/Document.js";
// import User from "../models/User.js";
// import mongoose from "mongoose";
// import {
//   sendBookingApprovalEmail,
//   sendBookingRejectionEmail,
//   sendBookingConfirmationEmail,
// } from "../utils/emailService.js";
// import { createNotification } from "../utils/notificationHelper.js";

// // Create new booking
// export const createBooking = async (req, res) => {
//   try {
//     console.log("=== 🚀 CREATE BOOKING START ===");
//     console.log("Request body:", JSON.stringify(req.body, null, 2));
//     console.log("User from token:", req.user ? req.user.email : "No user");

//     const {
//       vehicleId,
//       pickupDate,
//       pickupTime,
//       returnDate,
//       returnTime,
//       pickupLocation,
//       dropoffLocation,
//       driverOption,
//       insuranceOption,
//       specialRequests,
//       emergencyContact,
//     } = req.body;

//     const userId = req.user.id;
//     console.log("User ID:", userId);

//     // Validate required fields
//     if (!vehicleId || !pickupDate || !returnDate) {
//       console.log("❌ Missing required fields");
//       return res.status(400).json({
//         success: false,
//         message: "Vehicle ID, pickup date, and return date are required",
//       });
//     }

//     // Check if vehicle exists
//     console.log("Looking for vehicle with ID:", vehicleId);
//     const vehicle = await Vehicle.findById(vehicleId);
//     if (!vehicle) {
//       console.log("❌ Vehicle not found");
//       return res.status(404).json({
//         success: false,
//         message: "Vehicle not found",
//       });
//     }
//     console.log("✅ Vehicle found:", vehicle.carName);

//     // Check vehicle availability
//     if (vehicle.status !== "Available") {
//       console.log("❌ Vehicle not available, status:", vehicle.status);
//       return res.status(400).json({
//         success: false,
//         message: "Vehicle is not available for booking",
//       });
//     }

//     // Parse dates
//     const pickupDateTime = new Date(pickupDate);
//     const returnDateTime = new Date(returnDate);

//     console.log("Pickup date:", pickupDateTime);
//     console.log("Return date:", returnDateTime);

//     // Validate dates
//     if (pickupDateTime >= returnDateTime) {
//       console.log("❌ Return date must be after pickup date");
//       return res.status(400).json({
//         success: false,
//         message: "Return date must be after pickup date",
//       });
//     }

//     if (pickupDateTime < new Date()) {
//       console.log("❌ Pickup date cannot be in the past");
//       return res.status(400).json({
//         success: false,
//         message: "Pickup date cannot be in the past",
//       });
//     }

//     // Calculate total days
//     const timeDiff = returnDateTime.getTime() - pickupDateTime.getTime();
//     const totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
//     console.log("Total days:", totalDays);

//     if (totalDays < 1) {
//       console.log("❌ Minimum booking duration is 1 day");
//       return res.status(400).json({
//         success: false,
//         message: "Minimum booking duration is 1 day",
//       });
//     }

//     // Calculate pricing
//     const basePrice = (vehicle.ratePerDay || 5000) * totalDays;
//     const driverFee = driverOption === "with" ? 500 * totalDays : 0;
//     const insuranceFee = insuranceOption === "premium" ? 1500 * totalDays : 0;
//     const serviceFee = 500;
//     const tax = 0;
//     const totalAmount = basePrice + driverFee + insuranceFee + serviceFee + tax;

//     console.log("💰 Pricing calculated:", {
//       basePrice,
//       driverFee,
//       insuranceFee,
//       serviceFee,
//       totalAmount,
//     });

//     // Check for overlapping bookings
//     const overlappingBookings = await Booking.find({
//       vehicle: vehicleId,
//       status: { $in: ["approved", "confirmed", "active"] },
//       $or: [
//         {
//           pickupDate: { $lt: returnDateTime },
//           returnDate: { $gt: pickupDateTime },
//         },
//       ],
//     });
//     console.log("Overlapping bookings found:", overlappingBookings.length);

//     if (overlappingBookings.length > 0) {
//       console.log("❌ Vehicle already booked for these dates");
//       return res.status(400).json({
//         success: false,
//         message: "Vehicle is already booked for the selected dates",
//       });
//     }

//     // Create booking
//     const bookingData = {
//       user: userId,
//       vehicle: vehicleId,
//       pickupDate: pickupDateTime,
//       pickupTime,
//       returnDate: returnDateTime,
//       returnTime,
//       pickupLocation,
//       dropoffLocation,
//       totalDays,
//       basePrice,
//       driverFee,
//       insuranceFee,
//       serviceFee,
//       tax,
//       totalAmount,
//       driverOption,
//       insuranceOption,
//       specialRequests: specialRequests || "",
//       emergencyContact: {
//         name: emergencyContact?.name || "",
//         phone: emergencyContact?.phone || "",
//         relationship: emergencyContact?.relationship || "",
//       },
//       status: "pending",
//     };

//     console.log("📝 Creating booking with data:", bookingData);
//     const booking = new Booking(bookingData);
//     await booking.save();
//     console.log("✅ Booking saved with ID:", booking._id);
//     console.log("✅ Confirmation code:", booking.confirmationCode);

//     // Populate vehicle details
//     await booking.populate("vehicle", "carName carType carNumber photos");
//     console.log("✅ Booking populated with vehicle details");

//     // Create notification for booking created
//     await createNotification(
//       userId,
//       "Booking Created 📝",
//       `Your booking for ${booking.vehicle.carName} has been created and is awaiting admin approval.`,
//       "info",
//       `Booking ID: ${booking.confirmationCode}`,
//       { bookingId: booking._id },
//     );

//     const responseData = {
//       success: true,
//       message: "Booking created successfully. Waiting for admin approval.",
//       data: {
//         booking: {
//           id: booking._id,
//           confirmationCode: booking.confirmationCode,
//           vehicle: booking.vehicle.carName,
//           pickupDate: booking.pickupDate,
//           returnDate: booking.returnDate,
//           totalDays: booking.totalDays,
//           totalAmount: booking.totalAmount,
//           status: booking.status,
//           createdAt: booking.createdAt,
//         },
//         nextStep: "Upload documents for verification",
//       },
//     };

//     console.log("📤 Sending response:", JSON.stringify(responseData, null, 2));

//     res.status(201).json(responseData);
//   } catch (error) {
//     console.error("=== ❌ CREATE BOOKING ERROR ===");
//     console.error("Error name:", error.name);
//     console.error("Error message:", error.message);
//     console.error("Error stack:", error.stack);
//     res.status(500).json({
//       success: false,
//       message: "Failed to create booking",
//       error:
//         process.env.NODE_ENV === "development"
//           ? error.message
//           : "Internal server error",
//     });
//   }
// };

// // Get user's bookings
// export const getUserBookings = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { status, page = 1, limit = 10 } = req.query;

//     const query = { user: userId };
//     if (status) {
//       query.status = status;
//     }

//     const skip = (page - 1) * limit;

//     const bookings = await Booking.find(query)
//       .populate("vehicle", "carName carType photos")
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(parseInt(limit))
//       .lean();

//     const total = await Booking.countDocuments(query);

//     res.status(200).json({
//       success: true,
//       data: {
//         bookings,
//         pagination: {
//           page: parseInt(page),
//           limit: parseInt(limit),
//           total,
//           pages: Math.ceil(total / limit),
//         },
//       },
//     });
//   } catch (error) {
//     console.error("Get user bookings error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch bookings",
//     });
//   }
// };

// // Get booking by ID
// export const getBookingById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;
//     const isAdmin = req.user.role === "admin";

//     const booking = await Booking.findById(id)
//       .populate("vehicle", "carName carType carNumber photos ratePerDay")
//       .populate("user", "name email phone")
//       .populate("approvedBy", "name email")
//       .populate("rejectedBy", "name email")
//       .lean();

//     if (!booking) {
//       return res.status(404).json({
//         success: false,
//         message: "Booking not found",
//       });
//     }

//     // Check permissions
//     if (!isAdmin && booking.user._id.toString() !== userId) {
//       return res.status(403).json({
//         success: false,
//         message: "Unauthorized to view this booking",
//       });
//     }

//     // Get documents if any
//     const documents = await Document.findOne({ booking: id });

//     res.status(200).json({
//       success: true,
//       data: {
//         booking: {
//           ...booking,
//           documents,
//         },
//       },
//     });
//   } catch (error) {
//     console.error("Get booking error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch booking details",
//     });
//   }
// };

// // Update booking (user)
// export const updateBooking = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;
//     const updateData = req.body;

//     const booking = await Booking.findById(id);

//     if (!booking) {
//       return res.status(404).json({
//         success: false,
//         message: "Booking not found",
//       });
//     }

//     // Check ownership
//     if (booking.user.toString() !== userId) {
//       return res.status(403).json({
//         success: false,
//         message: "Unauthorized to update this booking",
//       });
//     }

//     // Check if booking can be updated
//     if (!["pending", "approved"].includes(booking.status)) {
//       return res.status(400).json({
//         success: false,
//         message: "Booking cannot be updated in its current status",
//       });
//     }

//     // Only allow certain fields to be updated
//     const allowedUpdates = [
//       "pickupTime",
//       "returnTime",
//       "pickupLocation",
//       "dropoffLocation",
//       "specialRequests",
//       "emergencyContact",
//     ];

//     const updates = {};
//     allowedUpdates.forEach((field) => {
//       if (updateData[field] !== undefined) {
//         updates[field] = updateData[field];
//       }
//     });

//     // Update booking
//     const updatedBooking = await Booking.findByIdAndUpdate(
//       id,
//       { $set: updates },
//       { new: true, runValidators: true },
//     ).populate("vehicle", "carName carType");

//     res.status(200).json({
//       success: true,
//       message: "Booking updated successfully",
//       data: {
//         booking: updatedBooking,
//       },
//     });
//   } catch (error) {
//     console.error("Update booking error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to update booking",
//     });
//   }
// };

// // Cancel booking (user)
// export const cancelBooking = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;
//     const { reason } = req.body;

//     const booking = await Booking.findById(id);

//     if (!booking) {
//       return res.status(404).json({
//         success: false,
//         message: "Booking not found",
//       });
//     }

//     // Check ownership
//     if (booking.user.toString() !== userId) {
//       return res.status(403).json({
//         success: false,
//         message: "Unauthorized to cancel this booking",
//       });
//     }

//     // Check if booking can be cancelled
//     if (!booking.canBeCancelled) {
//       return res.status(400).json({
//         success: false,
//         message: "Booking cannot be cancelled at this time",
//       });
//     }

//     // Calculate refund amount
//     const refundAmount = booking.calculateRefund();

//     // Update booking status
//     booking.status = "cancelled";
//     booking.cancellationDate = new Date();
//     booking.cancellationReason = reason;

//     // If there's a refund, update payment status
//     if (refundAmount > 0 && booking.paidAmount > 0) {
//       booking.paymentStatus = "refunded";
//     }

//     await booking.save();

//     // Update vehicle status if needed
//     if (booking.status === "confirmed" || booking.status === "approved") {
//       await Vehicle.findByIdAndUpdate(booking.vehicle, {
//         status: "Available",
//       });
//     }

//     // Create cancellation notification
//     await createNotification(
//       userId,
//       "Booking Cancelled ❌",
//       `Your booking for ${booking.vehicle?.carName} has been cancelled. ${reason ? `Reason: ${reason}` : ""}`,
//       "error",
//       `Booking ID: ${booking.confirmationCode}`,
//       { bookingId: booking._id },
//     );

//     res.status(200).json({
//       success: true,
//       message: "Booking cancelled successfully",
//       data: {
//         booking: {
//           id: booking._id,
//           status: booking.status,
//           refundAmount,
//           cancellationDate: booking.cancellationDate,
//         },
//       },
//     });
//   } catch (error) {
//     console.error("Cancel booking error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to cancel booking",
//     });
//   }
// };

// // ADMIN FUNCTIONS

// // Get all bookings (admin)
// export const getAllBookings = async (req, res) => {
//   try {
//     const {
//       status,
//       startDate,
//       endDate,
//       vehicleId,
//       userId,
//       page = 1,
//       limit = 20,
//       sortBy = "createdAt",
//       sortOrder = "desc",
//     } = req.query;

//     const query = {};

//     if (status) {
//       query.status = status;
//     }

//     if (startDate || endDate) {
//       query.createdAt = {};
//       if (startDate) {
//         query.createdAt.$gte = new Date(startDate);
//       }
//       if (endDate) {
//         query.createdAt.$lte = new Date(endDate);
//       }
//     }

//     if (vehicleId) {
//       query.vehicle = vehicleId;
//     }

//     if (userId) {
//       query.user = userId;
//     }

//     const skip = (page - 1) * limit;
//     const sort = { [sortBy]: sortOrder === "desc" ? -1 : 1 };

//     const bookings = await Booking.find(query)
//       .populate("user", "name email phone")
//       .populate("vehicle", "carName carNumber")
//       .populate("approvedBy", "name")
//       .populate("rejectedBy", "name")
//       .sort(sort)
//       .skip(skip)
//       .limit(parseInt(limit))
//       .lean();

//     const total = await Booking.countDocuments(query);

//     const stats = await Booking.aggregate([
//       { $match: query },
//       {
//         $group: {
//           _id: "$status",
//           count: { $sum: 1 },
//           totalRevenue: { $sum: "$totalAmount" },
//         },
//       },
//     ]);

//     res.status(200).json({
//       success: true,
//       data: {
//         bookings,
//         pagination: {
//           page: parseInt(page),
//           limit: parseInt(limit),
//           total,
//           pages: Math.ceil(total / limit),
//         },
//         statistics: stats,
//       },
//     });
//   } catch (error) {
//     console.error("Get all bookings error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch bookings",
//     });
//   }
// };

// // Approve booking (admin) - WITH EMAIL AND NOTIFICATION
// export const approveBooking = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const adminId = req.user.id;

//     const booking = await Booking.findById(id)
//       .populate("vehicle")
//       .populate("user", "name email");

//     if (!booking) {
//       return res.status(404).json({
//         success: false,
//         message: "Booking not found",
//       });
//     }

//     if (booking.status !== "pending") {
//       return res.status(400).json({
//         success: false,
//         message: `Booking cannot be approved in ${booking.status} status`,
//       });
//     }

//     const isAvailable = await booking.checkVehicleAvailability();
//     if (!isAvailable) {
//       return res.status(400).json({
//         success: false,
//         message: "Vehicle is no longer available for the selected dates",
//       });
//     }

//     const documents = await Document.findOne({ booking: id });
//     if (!documents) {
//       return res.status(400).json({
//         success: false,
//         message: "Documents are required before approval",
//       });
//     }

//     booking.status = "approved";
//     booking.approvedBy = adminId;
//     booking.approvedAt = new Date();
//     booking.expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000);

//     await booking.save();

//     await Vehicle.findByIdAndUpdate(booking.vehicle._id, {
//       status: "Booked",
//     });

//     // Send email
//     await sendBookingApprovalEmail(booking.user.email, booking.user.name, {
//       ...booking.toObject(),
//       vehicle: booking.vehicle,
//       confirmationCode: booking.confirmationCode,
//     });

//     // Create in-app notification
//     await createNotification(
//       booking.user._id,
//       "Booking Approved! 🎉",
//       `Your booking for ${booking.vehicle.carName} has been approved! Please confirm within 48 hours.`,
//       "success",
//       `Booking ID: ${booking.confirmationCode}`,
//       { bookingId: booking._id },
//     );

//     res.status(200).json({
//       success: true,
//       message: "Booking approved successfully. Email sent to customer.",
//       data: {
//         booking: {
//           id: booking._id,
//           status: booking.status,
//           approvedAt: booking.approvedAt,
//           expiresAt: booking.expiresAt,
//           confirmationCode: booking.confirmationCode,
//         },
//       },
//     });
//   } catch (error) {
//     console.error("Approve booking error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to approve booking",
//     });
//   }
// };

// // Reject booking (admin) - WITH EMAIL AND NOTIFICATION
// export const rejectBooking = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { reason } = req.body;
//     const adminId = req.user.id;

//     const booking = await Booking.findById(id)
//       .populate("vehicle")
//       .populate("user", "name email");

//     if (!booking) {
//       return res.status(404).json({
//         success: false,
//         message: "Booking not found",
//       });
//     }

//     if (booking.status !== "pending") {
//       return res.status(400).json({
//         success: false,
//         message: `Booking cannot be rejected in ${booking.status} status`,
//       });
//     }

//     booking.status = "rejected";
//     booking.rejectedBy = adminId;
//     booking.rejectedAt = new Date();
//     booking.rejectionReason = reason;

//     await booking.save();

//     // Send email
//     await sendBookingRejectionEmail(
//       booking.user.email,
//       booking.user.name,
//       {
//         ...booking.toObject(),
//         vehicle: booking.vehicle,
//         confirmationCode: booking.confirmationCode,
//       },
//       reason || "No specific reason provided",
//     );

//     // Create in-app notification
//     await createNotification(
//       booking.user._id,
//       "Booking Rejected ❌",
//       `Your booking for ${booking.vehicle.carName} has been rejected. Reason: ${reason || "No specific reason provided"}`,
//       "error",
//       `Booking ID: ${booking.confirmationCode}`,
//       { bookingId: booking._id, rejectionReason: reason },
//     );

//     res.status(200).json({
//       success: true,
//       message: "Booking rejected successfully. Email sent to customer.",
//       data: {
//         booking: {
//           id: booking._id,
//           status: booking.status,
//           rejectedAt: booking.rejectedAt,
//           rejectionReason: booking.rejectionReason,
//         },
//       },
//     });
//   } catch (error) {
//     console.error("Reject booking error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to reject booking",
//     });
//   }
// };

// // Confirm booking (user after admin approval) - WITH EMAIL AND NOTIFICATION
// export const confirmBooking = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;

//     const booking = await Booking.findById(id)
//       .populate("vehicle")
//       .populate("user", "name email");

//     if (!booking) {
//       return res.status(404).json({
//         success: false,
//         message: "Booking not found",
//       });
//     }

//     if (booking.user.toString() !== userId) {
//       return res.status(403).json({
//         success: false,
//         message: "Unauthorized to confirm this booking",
//       });
//     }

//     if (booking.status !== "approved") {
//       return res.status(400).json({
//         success: false,
//         message: `Booking cannot be confirmed in ${booking.status} status`,
//       });
//     }

//     if (new Date() > booking.expiresAt) {
//       booking.status = "expired";
//       await booking.save();

//       return res.status(400).json({
//         success: false,
//         message: "Confirmation window has expired",
//       });
//     }

//     booking.status = "confirmed";
//     booking.confirmedAt = new Date();
//     await booking.save();

//     // Send email
//     await sendBookingConfirmationEmail(booking.user.email, booking.user.name, {
//       ...booking.toObject(),
//       vehicle: booking.vehicle,
//       confirmationCode: booking.confirmationCode,
//     });

//     // Create in-app notification
//     await createNotification(
//       booking.user._id,
//       "Booking Confirmed! 🚗",
//       `Your booking for ${booking.vehicle.carName} is confirmed. Enjoy your ride!`,
//       "success",
//       `Pickup: ${new Date(booking.pickupDate).toLocaleDateString()}`,
//       { bookingId: booking._id },
//     );

//     res.status(200).json({
//       success: true,
//       message: "Booking confirmed successfully. Email sent to customer.",
//       data: {
//         booking: {
//           id: booking._id,
//           status: booking.status,
//           confirmedAt: booking.confirmedAt,
//           confirmationCode: booking.confirmationCode,
//         },
//       },
//     });
//   } catch (error) {
//     console.error("Confirm booking error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to confirm booking",
//     });
//   }
// };

// // Update booking status (admin - for marking as active/completed)
// export const updateBookingStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status, notes } = req.body;
//     const adminId = req.user.id;

//     const booking = await Booking.findById(id)
//       .populate("vehicle")
//       .populate("user", "name email");

//     if (!booking) {
//       return res.status(404).json({
//         success: false,
//         message: "Booking not found",
//       });
//     }

//     const validTransitions = {
//       confirmed: ["active"],
//       active: ["completed", "cancelled"],
//       completed: [],
//       cancelled: [],
//     };

//     if (!validTransitions[booking.status]?.includes(status)) {
//       return res.status(400).json({
//         success: false,
//         message: `Cannot transition from ${booking.status} to ${status}`,
//       });
//     }

//     const oldStatus = booking.status;
//     booking.status = status;

//     if (status === "active") {
//       booking.startDate = new Date();
//     } else if (status === "completed") {
//       booking.endDate = new Date();
//       await Vehicle.findByIdAndUpdate(booking.vehicle._id, {
//         status: "Available",
//       });
//     }

//     await booking.save();

//     // Create notification for status change
//     await createNotification(
//       booking.user._id,
//       `Booking ${status.charAt(0).toUpperCase() + status.slice(1)}`,
//       `Your booking for ${booking.vehicle.carName} is now ${status}.`,
//       status === "active" ? "success" : "info",
//       `Booking ID: ${booking.confirmationCode}`,
//       { bookingId: booking._id, newStatus: status },
//     );

//     await addBookingActivity(
//       id,
//       adminId,
//       `Status changed from ${oldStatus} to ${status}`,
//       notes,
//     );

//     res.status(200).json({
//       success: true,
//       message: `Booking marked as ${status}`,
//       data: {
//         booking: {
//           id: booking._id,
//           status: booking.status,
//           startDate: booking.startDate,
//           endDate: booking.endDate,
//         },
//       },
//     });
//   } catch (error) {
//     console.error("Update booking status error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to update booking status",
//     });
//   }
// };

// // Get booking statistics (admin dashboard)
// export const getBookingStatistics = async (req, res) => {
//   try {
//     const { startDate, endDate } = req.query;

//     const matchStage = {};
//     if (startDate || endDate) {
//       matchStage.createdAt = {};
//       if (startDate) matchStage.createdAt.$gte = new Date(startDate);
//       if (endDate) matchStage.createdAt.$lte = new Date(endDate);
//     }

//     const stats = await Booking.aggregate([
//       { $match: matchStage },
//       {
//         $facet: {
//           overview: [
//             {
//               $group: {
//                 _id: null,
//                 totalBookings: { $sum: 1 },
//                 totalRevenue: { $sum: "$totalAmount" },
//                 avgBookingValue: { $avg: "$totalAmount" },
//                 pendingBookings: {
//                   $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] },
//                 },
//                 activeBookings: {
//                   $sum: { $cond: [{ $eq: ["$status", "active"] }, 1, 0] },
//                 },
//               },
//             },
//           ],
//           byStatus: [
//             {
//               $group: {
//                 _id: "$status",
//                 count: { $sum: 1 },
//                 revenue: { $sum: "$totalAmount" },
//               },
//             },
//           ],
//           dailyTrends: [
//             {
//               $match: {
//                 createdAt: {
//                   $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
//                 },
//               },
//             },
//             {
//               $group: {
//                 _id: {
//                   $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
//                 },
//                 bookings: { $sum: 1 },
//                 revenue: { $sum: "$totalAmount" },
//               },
//             },
//             { $sort: { _id: 1 } },
//             { $limit: 30 },
//           ],
//           byVehicleType: [
//             {
//               $lookup: {
//                 from: "vehicles",
//                 localField: "vehicle",
//                 foreignField: "_id",
//                 as: "vehicleInfo",
//               },
//             },
//             { $unwind: "$vehicleInfo" },
//             {
//               $group: {
//                 _id: "$vehicleInfo.carType",
//                 count: { $sum: 1 },
//                 revenue: { $sum: "$totalAmount" },
//               },
//             },
//           ],
//         },
//       },
//     ]);

//     res.status(200).json({
//       success: true,
//       data: stats[0],
//     });
//   } catch (error) {
//     console.error("Get statistics error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch statistics",
//     });
//   }
// };

// // Helper function to get available dates for a vehicle
// async function getAvailableDates(vehicleId) {
//   const bookings = await Booking.find({
//     vehicle: vehicleId,
//     status: { $in: ["approved", "confirmed", "active"] },
//     returnDate: { $gte: new Date() },
//   }).sort({ pickupDate: 1 });

//   const bookedDates = [];
//   bookings.forEach((booking) => {
//     const current = new Date(booking.pickupDate);
//     const end = new Date(booking.returnDate);
//     while (current <= end) {
//       bookedDates.push(new Date(current).toISOString().split("T")[0]);
//       current.setDate(current.getDate() + 1);
//     }
//   });

//   return bookedDates;
// }

// // Helper function to add activity log
// async function addBookingActivity(bookingId, userId, action, notes = "") {
//   console.log(
//     `Booking Activity: ${bookingId} - ${userId} - ${action} - ${notes}`,
//   );
// }

import Booking from "../models/Booking.js";
import Vehicle from "../models/Vehicle.js";
import UserVehicle from "../models/UserVehicle.js";
import Document from "../models/Document.js";
import User from "../models/User.js";
import mongoose from "mongoose";
import {
  sendBookingApprovalEmail,
  sendBookingRejectionEmail,
  sendBookingConfirmationEmail,
} from "../utils/emailService.js";
import { createNotification } from "../utils/notificationHelper.js";

// Helper function to get vehicle details by ID and type
async function getVehicleDetails(vehicleId, vehicleType) {
  if (vehicleType === "user") {
    const userVehicle = await UserVehicle.findById(vehicleId).lean();
    if (userVehicle) {
      return {
        _id: userVehicle._id,
        carName: userVehicle.carName,
        carNumber: userVehicle.carNumber,
        carType: userVehicle.carType,
        ratePerDay: userVehicle.ratePerDay,
        seats: userVehicle.seats,
        bookingType: userVehicle.bookingType,
        gearType: userVehicle.gearType,
        airCondition: userVehicle.airCondition,
        description: userVehicle.description,
        features: userVehicle.features,
        photos: userVehicle.vehiclePhotos,
        phoneNumber: userVehicle.phoneNumber,
        driverName: userVehicle.driverName,
        source: "user",
        owner: userVehicle.fullName,
        ownerPhone: userVehicle.phoneNumber,
      };
    }
  } else {
    return await Vehicle.findById(vehicleId).lean();
  }
  return null;
}

// Create new booking
export const createBooking = async (req, res) => {
  try {
    console.log("=== 🚀 CREATE BOOKING START ===");
    console.log("Request body:", JSON.stringify(req.body, null, 2));
    console.log("User from token:", req.user ? req.user.email : "No user");

    const {
      vehicleId,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
      pickupLocation,
      dropoffLocation,
      driverOption,
      insuranceOption,
      specialRequests,
      emergencyContact,
    } = req.body;

    const userId = req.user.id;
    console.log("User ID:", userId);
    console.log("Vehicle ID being searched:", vehicleId);

    // Validate required fields
    if (!vehicleId || !pickupDate || !returnDate) {
      console.log("❌ Missing required fields");
      return res.status(400).json({
        success: false,
        message: "Vehicle ID, pickup date, and return date are required",
      });
    }

    // First try to find in admin vehicles
    let vehicle = null;
    let vehicleType = "admin";

    console.log("Looking for vehicle in admin collection...");

    // Check admin vehicles
    vehicle = await Vehicle.findById(vehicleId);
    if (vehicle) {
      console.log("✅ Vehicle found in admin collection:", vehicle.carName);
      vehicleType = "admin";
    } else {
      // If not found, check user vehicles
      console.log("Checking user vehicles collection...");
      try {
        const userVehicle = await UserVehicle.findById(vehicleId).populate(
          "user",
          "name email phone",
        );

        if (userVehicle) {
          console.log(
            "✅ Vehicle found in user collection:",
            userVehicle.carName,
          );
          console.log("User vehicle status:", userVehicle.status);
          console.log("User vehicle isListed:", userVehicle.isListed);

          // Check if user vehicle is active and listed
          if (userVehicle.status !== "active" || !userVehicle.isListed) {
            console.log(
              "❌ User vehicle not available for booking. Status:",
              userVehicle.status,
            );
            return res.status(400).json({
              success: false,
              message: `This vehicle is not available for booking. Status: ${userVehicle.status}`,
            });
          }

          // Format user vehicle to match admin vehicle structure
          vehicle = {
            _id: userVehicle._id,
            carName: userVehicle.carName,
            carNumber: userVehicle.carNumber,
            carType: userVehicle.carType,
            ratePerDay: userVehicle.ratePerDay,
            seats: userVehicle.seats,
            bookingType: userVehicle.bookingType,
            gearType: userVehicle.gearType,
            airCondition: userVehicle.airCondition,
            description: userVehicle.description,
            features: userVehicle.features,
            photos: userVehicle.vehiclePhotos,
            phoneNumber: userVehicle.phoneNumber,
            driverName: userVehicle.driverName,
            status: "Available",
            source: "user",
            owner: userVehicle.fullName,
            ownerPhone: userVehicle.phoneNumber,
          };
          vehicleType = "user";
          console.log("✅ User vehicle formatted for booking");
        } else {
          console.log(
            "❌ Vehicle not found in user collection with ID:",
            vehicleId,
          );
        }
      } catch (userVehicleError) {
        console.error("Error querying user vehicle:", userVehicleError);
      }
    }

    if (!vehicle) {
      console.log("❌ Vehicle not found in any collection");
      return res.status(404).json({
        success: false,
        message: "Vehicle not found. Please check the vehicle ID.",
      });
    }

    // Check vehicle availability (only for admin vehicles)
    if (vehicleType === "admin" && vehicle.status !== "Available") {
      console.log("❌ Vehicle not available, status:", vehicle.status);
      return res.status(400).json({
        success: false,
        message: "Vehicle is not available for booking",
      });
    }

    // Parse dates
    const pickupDateTime = new Date(pickupDate);
    const returnDateTime = new Date(returnDate);

    console.log("Pickup date:", pickupDateTime);
    console.log("Return date:", returnDateTime);

    // Validate dates
    if (pickupDateTime >= returnDateTime) {
      console.log("❌ Return date must be after pickup date");
      return res.status(400).json({
        success: false,
        message: "Return date must be after pickup date",
      });
    }

    // Only check if pickup date is not in the past (allow same day)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (pickupDateTime < today) {
      console.log("❌ Pickup date cannot be in the past");
      return res.status(400).json({
        success: false,
        message: "Pickup date cannot be in the past",
      });
    }

    // Calculate total days
    const timeDiff = returnDateTime.getTime() - pickupDateTime.getTime();
    const totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    console.log("Total days:", totalDays);

    if (totalDays < 1) {
      console.log("❌ Minimum booking duration is 1 day");
      return res.status(400).json({
        success: false,
        message: "Minimum booking duration is 1 day",
      });
    }

    // Calculate pricing
    const basePrice = (vehicle.ratePerDay || 5000) * totalDays;
    const driverFee = driverOption === "with" ? 500 * totalDays : 0;
    const insuranceFee = insuranceOption === "premium" ? 1500 * totalDays : 0;
    const serviceFee = 500;
    const tax = 0;
    const totalAmount = basePrice + driverFee + insuranceFee + serviceFee + tax;

    console.log("💰 Pricing calculated:", {
      basePrice,
      driverFee,
      insuranceFee,
      serviceFee,
      totalAmount,
    });

    // Check for overlapping bookings (only for admin vehicles)
    let overlappingBookings = [];
    if (vehicleType === "admin") {
      overlappingBookings = await Booking.find({
        vehicle: vehicleId,
        status: { $in: ["approved", "confirmed", "active"] },
        $or: [
          {
            pickupDate: { $lt: returnDateTime },
            returnDate: { $gt: pickupDateTime },
          },
        ],
      });
      console.log("Overlapping bookings found:", overlappingBookings.length);

      if (overlappingBookings.length > 0) {
        console.log("❌ Vehicle already booked for these dates");
        return res.status(400).json({
          success: false,
          message: "Vehicle is already booked for the selected dates",
        });
      }
    }

    // Create booking
    const bookingData = {
      user: userId,
      vehicle: vehicleId,
      pickupDate: pickupDateTime,
      pickupTime,
      returnDate: returnDateTime,
      returnTime,
      pickupLocation,
      dropoffLocation,
      totalDays,
      basePrice,
      driverFee,
      insuranceFee,
      serviceFee,
      tax,
      totalAmount,
      driverOption,
      insuranceOption,
      specialRequests: specialRequests || "",
      emergencyContact: {
        name: emergencyContact?.name || "",
        phone: emergencyContact?.phone || "",
        relationship: emergencyContact?.relationship || "",
      },
      status: "pending",
      vehicleType: vehicleType,
    };

    console.log("📝 Creating booking with data:", bookingData);
    const booking = new Booking(bookingData);
    await booking.save();
    console.log("✅ Booking saved with ID:", booking._id);
    console.log("✅ Confirmation code:", booking.confirmationCode);

    // For response, use the vehicle object we already have
    const responseVehicle = vehicle;

    // Create notification for booking created
    try {
      await createNotification(
        userId,
        "Booking Created 📝",
        `Your booking for ${responseVehicle.carName} has been created and is awaiting admin approval.`,
        "info",
        `Booking ID: ${booking.confirmationCode}`,
        { bookingId: booking._id },
      );
    } catch (notifError) {
      console.error("Error creating notification:", notifError);
    }

    const responseData = {
      success: true,
      message: "Booking created successfully. Waiting for admin approval.",
      data: {
        booking: {
          id: booking._id,
          confirmationCode: booking.confirmationCode,
          vehicle: responseVehicle.carName,
          pickupDate: booking.pickupDate,
          returnDate: booking.returnDate,
          totalDays: booking.totalDays,
          totalAmount: booking.totalAmount,
          status: booking.status,
          createdAt: booking.createdAt,
        },
        nextStep: "Upload documents for verification",
      },
    };

    console.log("📤 Sending response:", JSON.stringify(responseData, null, 2));

    res.status(201).json(responseData);
  } catch (error) {
    console.error("=== ❌ CREATE BOOKING ERROR ===");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    res.status(500).json({
      success: false,
      message: "Failed to create booking",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
};

// Get user's bookings
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status, page = 1, limit = 10 } = req.query;

    const query = { user: userId };
    if (status) {
      query.status = status;
    }

    const skip = (page - 1) * limit;

    const bookings = await Booking.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    // Manually populate vehicle data for each booking
    const populatedBookings = await Promise.all(
      bookings.map(async (booking) => {
        const vehicleData = await getVehicleDetails(
          booking.vehicle,
          booking.vehicleType,
        );
        return {
          ...booking,
          vehicle: vehicleData,
        };
      }),
    );

    const total = await Booking.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        bookings: populatedBookings,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error("Get user bookings error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
    });
  }
};

// Get booking by ID
export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const isAdmin = req.user.role === "admin";

    const booking = await Booking.findById(id)
      .populate("user", "name email phone")
      .populate("approvedBy", "name email")
      .populate("rejectedBy", "name email")
      .lean();

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (!isAdmin && booking.user._id.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to view this booking",
      });
    }

    // Get vehicle details based on type
    const vehicleData = await getVehicleDetails(
      booking.vehicle,
      booking.vehicleType,
    );

    // Get documents if any
    const documents = await Document.findOne({ booking: id });

    res.status(200).json({
      success: true,
      data: {
        booking: {
          ...booking,
          vehicle: vehicleData,
          documents,
        },
      },
    });
  } catch (error) {
    console.error("Get booking error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch booking details",
    });
  }
};

// Update booking (user)
export const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const updateData = req.body;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.user.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to update this booking",
      });
    }

    if (!["pending", "approved"].includes(booking.status)) {
      return res.status(400).json({
        success: false,
        message: "Booking cannot be updated in its current status",
      });
    }

    const allowedUpdates = [
      "pickupTime",
      "returnTime",
      "pickupLocation",
      "dropoffLocation",
      "specialRequests",
      "emergencyContact",
    ];

    const updates = {};
    allowedUpdates.forEach((field) => {
      if (updateData[field] !== undefined) {
        updates[field] = updateData[field];
      }
    });

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true },
    );

    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: {
        booking: updatedBooking,
      },
    });
  } catch (error) {
    console.error("Update booking error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update booking",
    });
  }
};

// Cancel booking (user)
export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { reason } = req.body;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.user.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to cancel this booking",
      });
    }

    if (!booking.canBeCancelled) {
      return res.status(400).json({
        success: false,
        message: "Booking cannot be cancelled at this time",
      });
    }

    const refundAmount = booking.calculateRefund();

    booking.status = "cancelled";
    booking.cancellationDate = new Date();
    booking.cancellationReason = reason;

    if (refundAmount > 0 && booking.paidAmount > 0) {
      booking.paymentStatus = "refunded";
    }

    await booking.save();

    // Update vehicle status based on type
    if (booking.status === "confirmed" || booking.status === "approved") {
      if (booking.vehicleType === "user") {
        await UserVehicle.findByIdAndUpdate(booking.vehicle, {
          status: "active",
        });
      } else {
        await Vehicle.findByIdAndUpdate(booking.vehicle, {
          status: "Available",
        });
      }
    }

    const vehicleData = await getVehicleDetails(
      booking.vehicle,
      booking.vehicleType,
    );

    await createNotification(
      userId,
      "Booking Cancelled ❌",
      `Your booking for ${vehicleData?.carName} has been cancelled. ${
        reason ? `Reason: ${reason}` : ""
      }`,
      "error",
      `Booking ID: ${booking.confirmationCode}`,
      { bookingId: booking._id },
    );

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      data: {
        booking: {
          id: booking._id,
          status: booking.status,
          refundAmount,
          cancellationDate: booking.cancellationDate,
        },
      },
    });
  } catch (error) {
    console.error("Cancel booking error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to cancel booking",
    });
  }
};

// ADMIN FUNCTIONS

// Get all bookings (admin)
export const getAllBookings = async (req, res) => {
  try {
    const {
      status,
      startDate,
      endDate,
      vehicleId,
      userId,
      page = 1,
      limit = 20,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    const query = {};

    if (status) {
      query.status = status;
    }

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) {
        query.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        query.createdAt.$lte = new Date(endDate);
      }
    }

    if (vehicleId) {
      query.vehicle = vehicleId;
    }

    if (userId) {
      query.user = userId;
    }

    const skip = (page - 1) * limit;
    const sort = { [sortBy]: sortOrder === "desc" ? -1 : 1 };

    const bookings = await Booking.find(query)
      .populate("user", "name email phone")
      .populate("approvedBy", "name")
      .populate("rejectedBy", "name")
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    // Manually populate vehicle data for each booking
    const populatedBookings = await Promise.all(
      bookings.map(async (booking) => {
        const vehicleData = await getVehicleDetails(
          booking.vehicle,
          booking.vehicleType,
        );
        return {
          ...booking,
          vehicle: vehicleData,
        };
      }),
    );

    const total = await Booking.countDocuments(query);

    const stats = await Booking.aggregate([
      { $match: query },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        bookings: populatedBookings,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
        statistics: stats,
      },
    });
  } catch (error) {
    console.error("Get all bookings error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
    });
  }
};

// Approve booking (admin)
export const approveBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const adminId = req.user.id;

    const booking = await Booking.findById(id).populate("user", "name email");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: `Booking cannot be approved in ${booking.status} status`,
      });
    }

    const isAvailable = await booking.checkVehicleAvailability();
    if (!isAvailable) {
      return res.status(400).json({
        success: false,
        message: "Vehicle is no longer available for the selected dates",
      });
    }

    const documents = await Document.findOne({ booking: id });
    if (!documents) {
      return res.status(400).json({
        success: false,
        message: "Documents are required before approval",
      });
    }

    booking.status = "approved";
    booking.approvedBy = adminId;
    booking.approvedAt = new Date();
    booking.expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000);

    await booking.save();

    // Update vehicle status based on vehicle type
    if (booking.vehicleType === "user") {
      try {
        await UserVehicle.findByIdAndUpdate(booking.vehicle, {
          status: "booked",
        });
        console.log("✅ User vehicle status updated to booked");
      } catch (error) {
        console.error("Error updating user vehicle status:", error);
      }
    } else {
      await Vehicle.findByIdAndUpdate(booking.vehicle, {
        status: "Booked",
      });
      console.log("✅ Admin vehicle status updated to Booked");
    }

    const vehicleData = await getVehicleDetails(
      booking.vehicle,
      booking.vehicleType,
    );

    // Send approval email
    await sendBookingApprovalEmail(booking.user.email, booking.user.name, {
      ...booking.toObject(),
      vehicle: vehicleData,
      confirmationCode: booking.confirmationCode,
    });

    // Create in-app notification
    await createNotification(
      booking.user._id,
      "Booking Approved! 🎉",
      `Your booking for ${vehicleData?.carName} has been approved! Please confirm within 48 hours.`,
      "success",
      `Booking ID: ${booking.confirmationCode}`,
      { bookingId: booking._id },
    );

    res.status(200).json({
      success: true,
      message: "Booking approved successfully. Email sent to customer.",
      data: {
        booking: {
          id: booking._id,
          status: booking.status,
          approvedAt: booking.approvedAt,
          expiresAt: booking.expiresAt,
          confirmationCode: booking.confirmationCode,
        },
      },
    });
  } catch (error) {
    console.error("Approve booking error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to approve booking",
    });
  }
};

// Reject booking (admin)
export const rejectBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    const adminId = req.user.id;

    const booking = await Booking.findById(id).populate("user", "name email");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: `Booking cannot be rejected in ${booking.status} status`,
      });
    }

    booking.status = "rejected";
    booking.rejectedBy = adminId;
    booking.rejectedAt = new Date();
    booking.rejectionReason = reason;

    await booking.save();

    const vehicleData = await getVehicleDetails(
      booking.vehicle,
      booking.vehicleType,
    );

    // Send rejection email
    await sendBookingRejectionEmail(
      booking.user.email,
      booking.user.name,
      {
        ...booking.toObject(),
        vehicle: vehicleData,
        confirmationCode: booking.confirmationCode,
      },
      reason || "No specific reason provided",
    );

    // Create in-app notification
    await createNotification(
      booking.user._id,
      "Booking Rejected ❌",
      `Your booking for ${vehicleData?.carName} has been rejected. Reason: ${
        reason || "No specific reason provided"
      }`,
      "error",
      `Booking ID: ${booking.confirmationCode}`,
      { bookingId: booking._id, rejectionReason: reason },
    );

    res.status(200).json({
      success: true,
      message: "Booking rejected successfully. Email sent to customer.",
      data: {
        booking: {
          id: booking._id,
          status: booking.status,
          rejectedAt: booking.rejectedAt,
          rejectionReason: booking.rejectionReason,
        },
      },
    });
  } catch (error) {
    console.error("Reject booking error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to reject booking",
    });
  }
};

// Confirm booking (user after admin approval)
export const confirmBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const booking = await Booking.findById(id).populate("user", "name email");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.user.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to confirm this booking",
      });
    }

    if (booking.status !== "approved") {
      return res.status(400).json({
        success: false,
        message: `Booking cannot be confirmed in ${booking.status} status`,
      });
    }

    if (new Date() > booking.expiresAt) {
      booking.status = "expired";
      await booking.save();

      return res.status(400).json({
        success: false,
        message: "Confirmation window has expired",
      });
    }

    booking.status = "confirmed";
    booking.confirmedAt = new Date();
    await booking.save();

    const vehicleData = await getVehicleDetails(
      booking.vehicle,
      booking.vehicleType,
    );

    // Send confirmation email
    await sendBookingConfirmationEmail(booking.user.email, booking.user.name, {
      ...booking.toObject(),
      vehicle: vehicleData,
      confirmationCode: booking.confirmationCode,
    });

    // Create in-app notification
    await createNotification(
      booking.user._id,
      "Booking Confirmed! 🚗",
      `Your booking for ${vehicleData?.carName} is confirmed. Enjoy your ride!`,
      "success",
      `Pickup: ${new Date(booking.pickupDate).toLocaleDateString()}`,
      { bookingId: booking._id },
    );

    res.status(200).json({
      success: true,
      message: "Booking confirmed successfully. Email sent to customer.",
      data: {
        booking: {
          id: booking._id,
          status: booking.status,
          confirmedAt: booking.confirmedAt,
          confirmationCode: booking.confirmationCode,
        },
      },
    });
  } catch (error) {
    console.error("Confirm booking error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to confirm booking",
    });
  }
};

// Update booking status (admin - for marking as active/completed)
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    const adminId = req.user.id;

    const booking = await Booking.findById(id).populate("user", "name email");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    const validTransitions = {
      confirmed: ["active"],
      active: ["completed", "cancelled"],
      completed: [],
      cancelled: [],
    };

    if (!validTransitions[booking.status]?.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Cannot transition from ${booking.status} to ${status}`,
      });
    }

    const oldStatus = booking.status;
    booking.status = status;

    if (status === "active") {
      booking.startDate = new Date();
    } else if (status === "completed") {
      booking.endDate = new Date();
      if (booking.vehicleType === "user") {
        await UserVehicle.findByIdAndUpdate(booking.vehicle, {
          status: "active",
        });
      } else {
        await Vehicle.findByIdAndUpdate(booking.vehicle, {
          status: "Available",
        });
      }
    }

    await booking.save();

    const vehicleData = await getVehicleDetails(
      booking.vehicle,
      booking.vehicleType,
    );

    await createNotification(
      booking.user._id,
      `Booking ${status.charAt(0).toUpperCase() + status.slice(1)}`,
      `Your booking for ${vehicleData?.carName} is now ${status}.`,
      status === "active" ? "success" : "info",
      `Booking ID: ${booking.confirmationCode}`,
      { bookingId: booking._id, newStatus: status },
    );

    await addBookingActivity(
      id,
      adminId,
      `Status changed from ${oldStatus} to ${status}`,
      notes,
    );

    res.status(200).json({
      success: true,
      message: `Booking marked as ${status}`,
      data: {
        booking: {
          id: booking._id,
          status: booking.status,
          startDate: booking.startDate,
          endDate: booking.endDate,
        },
      },
    });
  } catch (error) {
    console.error("Update booking status error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update booking status",
    });
  }
};

// Get booking statistics (admin dashboard)
export const getBookingStatistics = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const matchStage = {};
    if (startDate || endDate) {
      matchStage.createdAt = {};
      if (startDate) matchStage.createdAt.$gte = new Date(startDate);
      if (endDate) matchStage.createdAt.$lte = new Date(endDate);
    }

    const stats = await Booking.aggregate([
      { $match: matchStage },
      {
        $facet: {
          overview: [
            {
              $group: {
                _id: null,
                totalBookings: { $sum: 1 },
                totalRevenue: { $sum: "$totalAmount" },
                avgBookingValue: { $avg: "$totalAmount" },
                pendingBookings: {
                  $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] },
                },
                activeBookings: {
                  $sum: { $cond: [{ $eq: ["$status", "active"] }, 1, 0] },
                },
              },
            },
          ],
          byStatus: [
            {
              $group: {
                _id: "$status",
                count: { $sum: 1 },
                revenue: { $sum: "$totalAmount" },
              },
            },
          ],
          dailyTrends: [
            {
              $match: {
                createdAt: {
                  $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                },
              },
            },
            {
              $group: {
                _id: {
                  $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                },
                bookings: { $sum: 1 },
                revenue: { $sum: "$totalAmount" },
              },
            },
            { $sort: { _id: 1 } },
            { $limit: 30 },
          ],
          byVehicleType: [
            {
              $group: {
                _id: "$vehicleType",
                count: { $sum: 1 },
                revenue: { $sum: "$totalAmount" },
              },
            },
          ],
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: stats[0],
    });
  } catch (error) {
    console.error("Get statistics error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch statistics",
    });
  }
};

// Helper function to get available dates for a vehicle
async function getAvailableDates(vehicleId) {
  const bookings = await Booking.find({
    vehicle: vehicleId,
    status: { $in: ["approved", "confirmed", "active"] },
    returnDate: { $gte: new Date() },
  }).sort({ pickupDate: 1 });

  const bookedDates = [];
  bookings.forEach((booking) => {
    const current = new Date(booking.pickupDate);
    const end = new Date(booking.returnDate);
    while (current <= end) {
      bookedDates.push(new Date(current).toISOString().split("T")[0]);
      current.setDate(current.getDate() + 1);
    }
  });

  return bookedDates;
}

// Helper function to add activity log
async function addBookingActivity(bookingId, userId, action, notes = "") {
  console.log(
    `Booking Activity: ${bookingId} - ${userId} - ${action} - ${notes}`,
  );
}
