
// const ADMIN_EMAIL = "admin@rentride.com";
// const ADMIN_PASSWORD = "admin123";

// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import {
//   generateOTP,
//   sendVerificationEmail,
//   sendWelcomeEmail,
// } from "../utils/emailService.js";

// // SIGN UP
// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({
//         success: false,
//         message: "User already exists",
//       });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Generate OTP and set expiration (10 minutes)
//     const otp = generateOTP();
//     const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       emailVerificationOtp: otp,
//       emailVerificationOtpExpires: otpExpires,
//       isEmailVerified: false,
//     });

//     // Send verification email
//     await sendVerificationEmail(email, otp);

//     // Generate temporary token (for verification only)
//     const tempToken = jwt.sign(
//       {
//         id: user._id,
//         email: user.email,
//         purpose: "email_verification",
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: "15m" },
//     );

//     res.status(201).json({
//       success: true,
//       message:
//         "Registration successful! Please check your email for verification OTP.",
//       tempToken,
//       email: user.email,
//       requiresVerification: true,
//     });
//   } catch (error) {
//     console.error("Registration error:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // VERIFY OTP
// export const verifyEmailOTP = async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     if (!email || !otp) {
//       return res.status(400).json({
//         success: false,
//         message: "Email and OTP are required",
//       });
//     }

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // Check if email is already verified
//     if (user.isEmailVerified) {
//       return res.status(400).json({
//         success: false,
//         message: "Email is already verified",
//       });
//     }

//     // Check OTP and expiration
//     if (!user.emailVerificationOtp || !user.emailVerificationOtpExpires) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid OTP request",
//       });
//     }

//     if (user.emailVerificationOtp !== otp) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid OTP",
//       });
//     }

//     if (new Date() > user.emailVerificationOtpExpires) {
//       return res.status(400).json({
//         success: false,
//         message: "OTP has expired",
//       });
//     }

//     // Update user as verified
//     user.isEmailVerified = true;
//     user.emailVerificationOtp = null;
//     user.emailVerificationOtpExpires = null;
//     await user.save();

//     // Send welcome email
//     await sendWelcomeEmail(user.email, user.name);

//     // Generate actual login token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     res.status(200).json({
//       success: true,
//       message: "Email verified successfully!",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         gender: user.gender,
//         profilePhoto: user.profilePhoto,
//         kycVerified: user.kycVerified,
//         username: user.username,
//         isEmailVerified: user.isEmailVerified,
//       },
//     });
//   } catch (error) {
//     console.error("OTP verification error:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // RESEND OTP
// export const resendVerificationOTP = async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({
//         success: false,
//         message: "Email is required",
//       });
//     }

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     if (user.isEmailVerified) {
//       return res.status(400).json({
//         success: false,
//         message: "Email is already verified",
//       });
//     }

//     // Generate new OTP
//     const otp = generateOTP();
//     const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

//     // Update user with new OTP
//     user.emailVerificationOtp = otp;
//     user.emailVerificationOtpExpires = otpExpires;
//     await user.save();

//     // Send new verification email
//     await sendVerificationEmail(email, otp);

//     res.status(200).json({
//       success: true,
//       message: "New OTP sent to your email",
//     });
//   } catch (error) {
//     console.error("Resend OTP error:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Input validation
//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Email and password are required",
//       });
//     }

//     // Check for admin login
//     if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
//       // Create admin user if it doesn't exist
//       let adminUser = await User.findOne({ email: ADMIN_EMAIL });

//       if (!adminUser) {
//         // Create admin user
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt);

//         adminUser = await User.create({
//           name: "Admin User",
//           email: ADMIN_EMAIL,
//           password: hashedPassword,
//           role: "admin",
//           isEmailVerified: true,
//           username: "admin",
//         });
//         console.log("Admin user created");
//       }

//       // Generate token for admin
//       const token = jwt.sign(
//         { id: adminUser._id, email: adminUser.email, role: "admin" },
//         process.env.JWT_SECRET,
//         { expiresIn: "7d" },
//       );

//       return res.status(200).json({
//         success: true,
//         message: "Admin login successful",
//         token,
//         user: {
//           id: adminUser._id,
//           name: adminUser.name,
//           email: adminUser.email,
//           role: "admin",
//           isEmailVerified: true,
//         },
//       });
//     }

//     // Regular user login
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid credentials",
//       });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid credentials",
//       });
//     }

//     // Check if email is verified
//     if (!user.isEmailVerified) {
//       const otp = generateOTP();
//       const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

//       user.emailVerificationOtp = otp;
//       user.emailVerificationOtpExpires = otpExpires;
//       await user.save();

//       await sendVerificationEmail(email, otp);

//       return res.status(403).json({
//         success: false,
//         message: "Please verify your email first. A new OTP has been sent.",
//         requiresVerification: true,
//         email: user.email,
//       });
//     }

//     const token = jwt.sign(
//       { id: user._id, email: user.email, role: user.role || "user" },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" },
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role || "user",
//         profilePhoto: user.profilePhoto,
//         kycVerified: user.kycVerified,
//         username: user.username,
//         isEmailVerified: user.isEmailVerified,
//       },
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


const ADMIN_EMAIL = "admin@rentride.com";
const ADMIN_PASSWORD = "admin123";

import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  generateOTP,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../utils/emailService.js";
import { createNotification } from "../utils/notificationHelper.js";

// SIGN UP
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      emailVerificationOtp: otp,
      emailVerificationOtpExpires: otpExpires,
      isEmailVerified: false,
    });

    await sendVerificationEmail(email, otp);

    // Create in-app notification
    await createNotification(
      user._id,
      "Welcome to RentRide! 🎉",
      `Welcome ${name}! Please verify your email to get started. Check your inbox for the OTP.`,
      "success",
      "Email verification required"
    );

    const tempToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        purpose: "email_verification",
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" },
    );

    res.status(201).json({
      success: true,
      message:
        "Registration successful! Please check your email for verification OTP.",
      tempToken,
      email: user.email,
      requiresVerification: true,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// VERIFY OTP
export const verifyEmailOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified",
      });
    }

    if (!user.emailVerificationOtp || !user.emailVerificationOtpExpires) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP request",
      });
    }

    if (user.emailVerificationOtp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (new Date() > user.emailVerificationOtpExpires) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    user.isEmailVerified = true;
    user.emailVerificationOtp = null;
    user.emailVerificationOtpExpires = null;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);

    // Create welcome notification
    await createNotification(
      user._id,
      "Email Verified! ✅",
      "Your email has been successfully verified. Welcome to RentRide!",
      "success",
      "Account activated"
    );

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      success: true,
      message: "Email verified successfully!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        profilePhoto: user.profilePhoto,
        kycVerified: user.kycVerified,
        username: user.username,
        isEmailVerified: user.isEmailVerified,
      },
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// RESEND OTP
export const resendVerificationOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified",
      });
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    user.emailVerificationOtp = otp;
    user.emailVerificationOtpExpires = otpExpires;
    await user.save();

    await sendVerificationEmail(email, otp);

    // Create notification for resend
    await createNotification(
      user._id,
      "New OTP Sent 📧",
      "A new verification OTP has been sent to your email.",
      "info",
      "Check your inbox"
    );

    res.status(200).json({
      success: true,
      message: "New OTP sent to your email",
    });
  } catch (error) {
    console.error("Resend OTP error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Check for admin login
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      let adminUser = await User.findOne({ email: ADMIN_EMAIL });

      if (!adminUser) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt);

        adminUser = await User.create({
          name: "Admin User",
          email: ADMIN_EMAIL,
          password: hashedPassword,
          role: "admin",
          isEmailVerified: true,
          username: "admin",
        });
        console.log("Admin user created");
      }

      const token = jwt.sign(
        { id: adminUser._id, email: adminUser.email, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
      );

      return res.status(200).json({
        success: true,
        message: "Admin login successful",
        token,
        user: {
          id: adminUser._id,
          name: adminUser.name,
          email: adminUser.email,
          role: "admin",
          isEmailVerified: true,
        },
      });
    }

    // Regular user login
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check if email is verified
    if (!user.isEmailVerified) {
      const otp = generateOTP();
      const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

      user.emailVerificationOtp = otp;
      user.emailVerificationOtpExpires = otpExpires;
      await user.save();

      await sendVerificationEmail(email, otp);

      return res.status(403).json({
        success: false,
        message: "Please verify your email first. A new OTP has been sent.",
        requiresVerification: true,
        email: user.email,
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role || "user" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || "user",
        profilePhoto: user.profilePhoto,
        kycVerified: user.kycVerified,
        username: user.username,
        isEmailVerified: user.isEmailVerified,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};