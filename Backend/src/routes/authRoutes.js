// import express from "express";
// import { registerUser, loginUser } from "../controllers/authController.js";

// const router = express.Router();

// router.post("/signup", registerUser);
// router.post("/login", loginUser);

// export default router;

import express from "express";
import {
  registerUser,
  loginUser,
  verifyEmailOTP,
  resendVerificationOTP,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/verify-email", verifyEmailOTP);
router.post("/resend-otp", resendVerificationOTP);

export default router;
