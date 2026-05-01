import express from "express";
import {
  createBooking,
  getUserBookings,
  getBookingById,
  updateBooking,
  cancelBooking,
  confirmBooking,
  getAllBookings,
  approveBooking,
  rejectBooking,
  updateBookingStatus,
  getBookingStatistics,
  deleteBooking, // ADD THIS IMPORT
  autoUpdateBookingStatuses,
  checkUserBookingStatus,
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Add this middleware to log ALL requests to this router
router.use((req, res, next) => {
  console.log("🔥 Booking route accessed!");
  console.log("Method:", req.method);
  console.log("Path:", req.path);
  console.log("Full URL:", req.originalUrl);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  next();
});

// Public test route
router.get("/test", (req, res) => {
  console.log("✅ Test GET route hit!");
  res.json({
    success: true,
    message: "Booking routes are working",
    timestamp: new Date().toISOString(),
  });
});

// Test POST route
router.post("/test-create", (req, res) => {
  console.log("✅ Test POST route hit!");
  console.log("Request body:", req.body);
  res.json({
    success: true,
    message: "Test endpoint working",
    receivedData: req.body,
  });
});

// All routes below require authentication
console.log("Applying protect middleware...");
router.use(protect);

// User routes
router.post("/", createBooking);
router.get("/my-bookings", getUserBookings);
router.get("/:id", getBookingById);
router.put("/:id", updateBooking);
router.post("/:id/cancel", cancelBooking);
router.post("/:id/confirm", confirmBooking);

// Admin routes
router.get("/admin/all", getAllBookings);
router.post("/admin/:id/approve", approveBooking);
router.post("/admin/:id/reject", rejectBooking);
router.put("/admin/:id/status", updateBookingStatus);
router.get("/admin/stats", getBookingStatistics);
router.delete("/admin/:id/delete", protect, deleteBooking); // ADD THIS ROUTE
// Admin route to manually trigger auto-update
router.post("/admin/auto-update", protect, autoUpdateBookingStatuses);
// Add this route
router.get("/user/vehicle/:vehicleId/status", protect, checkUserBookingStatus);

export default router;
