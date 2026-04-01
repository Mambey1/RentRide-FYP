// import express from "express";
// import {
//   initiateKhaltiPayment,
//   verifyKhaltiPayment,
//   getPaymentStatus,
// } from "../controllers/paymentController.js";
// import { protect } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // Protected routes
// router.post("/initiate-khalti", protect, initiateKhaltiPayment);
// router.post("/verify-khalti", protect, verifyKhaltiPayment);
// router.get("/status/:bookingId", protect, getPaymentStatus);

// export default router;

import express from "express";
import {
  initiateKhaltiPayment,
  verifyKhaltiPayment,
  getPaymentStatus,
} from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected routes
router.post("/initiate-khalti", protect, initiateKhaltiPayment);
router.post("/verify-khalti", protect, verifyKhaltiPayment);
router.get("/status/:bookingId", protect, getPaymentStatus);

// Test route
router.get("/test", (req, res) => {
  res.json({ success: true, message: "Payment routes are working!" });
});

export default router;