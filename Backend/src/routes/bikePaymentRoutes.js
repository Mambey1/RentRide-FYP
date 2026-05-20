import express from "express";
import {
  initiateKhaltiBikePayment,
  verifyKhaltiBikePayment,
  getBikePaymentStatus,
} from "../controllers/bikePaymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/initiate-khalti", protect, initiateKhaltiBikePayment);
router.post("/verify",          protect, verifyKhaltiBikePayment);
router.get("/status/:bookingId", protect, getBikePaymentStatus);

router.get("/test", (req, res) => {
  res.json({ success: true, message: "Bike payment routes are working!" });
});

export default router;
