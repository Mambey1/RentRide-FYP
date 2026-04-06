import express from "express";
import {
  createReview,
  getVehicleReviews,
  getUserVehicleReview,
  updateReview,
  deleteReview,
  markReviewHelpful,
  getAllReviews,
} from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes (no auth required)
router.get("/vehicle/:vehicleId", getVehicleReviews);

// Protected routes (auth required)
router.use(protect); // All routes below require authentication

router.post("/", createReview);
router.get("/user/vehicle/:vehicleId", getUserVehicleReview);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);
router.post("/:id/helpful", markReviewHelpful);

// Admin only routes
router.get("/admin/all", getAllReviews);

export default router;