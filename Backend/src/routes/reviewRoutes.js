import express from "express";
import {
  createReview,
  getVehicleReviews,
  getUserVehicleReview,
  updateReview,
  deleteReview,
  toggleReviewHelpful,
  getAllReviews,
} from "../controllers/reviewController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// PUBLIC route - anyone can view reviews (no authentication required)
router.get("/vehicle/:vehicleId", getVehicleReviews);

// PROTECTED routes - require authentication
router.use(protect);

router.post("/", createReview);
router.get("/user/vehicle/:vehicleId", getUserVehicleReview);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);
router.post("/:id/helpful", toggleReviewHelpful);

// Admin only routes
router.get("/admin/all", adminOnly, getAllReviews);

export default router;
