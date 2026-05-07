// // // import express from "express";
// // // import { registerUser, loginUser } from "../controllers/authController.js";

// // // const router = express.Router();

// // // router.post("/signup", registerUser);
// // // router.post("/login", loginUser);

// // // export default router;

// // import express from "express";
// // import {
// //   registerUser,
// //   loginUser,
// //   verifyEmailOTP,
// //   resendVerificationOTP,
// // } from "../controllers/authController.js";

// // const router = express.Router();

// // router.post("/signup", registerUser);
// // router.post("/login", loginUser);
// // router.post("/verify-email", verifyEmailOTP);
// // router.post("/resend-otp", resendVerificationOTP);

// // export default router;

// import express from "express";
// import {
//   registerUser,
//   loginUser,
//   verifyEmailOTP,
//   resendVerificationOTP,
//   forgotPassword,
//   resetPassword,
//   changePassword,
// } from "../controllers/authController.js";
// import { protect } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // Auth routes
// router.post("/signup", registerUser);
// router.post("/login", loginUser);
// router.post("/verify-email", verifyEmailOTP);
// router.post("/resend-otp", resendVerificationOTP);

// // Password reset routes
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password", resetPassword);

// // Change password (requires authentication)
// router.post("/change-password", protect, changePassword);

// export default router;



import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
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

// ── Existing routes ───────────────────────────────────────────
router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/verify-email", verifyEmailOTP);
router.post("/resend-otp", resendVerificationOTP);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/change-password", protect, changePassword);

// ── Google OAuth ──────────────────────────────────────────────

// Step 1: Redirect to Google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

// Step 2: Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=google_failed`,
  }),
  (req, res) => {
    const user = req.user;

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role || "user" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const userPayload = encodeURIComponent(
      JSON.stringify({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || "user",
        profilePhoto: user.profilePhoto,
        kycVerified: user.kycVerified,
        username: user.username,
        isEmailVerified: user.isEmailVerified,
      })
    );

    res.redirect(
      `${process.env.FRONTEND_URL}/auth/google/callback?token=${token}&user=${userPayload}`
    );
  }
);

export default router;