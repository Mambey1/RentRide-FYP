// // import express from "express";
// // import { registerUser, loginUser } from "../controllers/authController.js";

// // const router = express.Router();

// // router.post("/signup", registerUser);
// // router.post("/login", loginUser);

// // export default router;

// import express from "express";
// import {
//   registerUser,
//   loginUser,
//   verifyEmailOTP,
//   resendVerificationOTP,
// } from "../controllers/authController.js";

// const router = express.Router();

// router.post("/signup", registerUser);
// router.post("/login", loginUser);
// router.post("/verify-email", verifyEmailOTP);
// router.post("/resend-otp", resendVerificationOTP);

// export default router;

import express from "express";
import {
  registerUser,
  loginUser,
  verifyEmailOTP,
  resendVerificationOTP,
  forgotPassword,
  resetPassword,
  changePassword,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Auth routes
router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/verify-email", verifyEmailOTP);
router.post("/resend-otp", resendVerificationOTP);

// Password reset routes
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Change password (requires authentication)
router.post("/change-password", protect, changePassword);

export default router;
