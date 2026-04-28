// // // controllers/profileController.js
// // import User from "../models/User.js";

// // // Get user profile
// // export const getUserProfile = async (req, res) => {
// //   try {
// //     console.log("Getting profile for user ID:", req.user._id);

// //     const user = await User.findById(req.user._id).select("-password");

// //     if (!user) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "User not found",
// //       });
// //     }

// //     console.log("Profile found:", user);

// //     res.status(200).json({
// //       success: true,
// //       user: {
// //         _id: user._id,
// //         name: user.name,
// //         email: user.email,
// //         username: user.username || user.email?.split("@")[0],
// //         gender: user.gender,
// //         profilePhoto: user.profilePhoto,
// //         kycVerified: user.kycVerified,
// //         createdAt: user.createdAt,
// //       },
// //     });
// //   } catch (error) {
// //     console.error("Profile controller error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // };

// // // Update user profile
// // export const updateUserProfile = async (req, res) => {
// //   try {
// //     const { name, username, gender } = req.body;

// //     const updateData = {};
// //     if (name) updateData.name = name;
// //     if (username) updateData.username = username;
// //     if (gender) updateData.gender = gender;

// //     // Handle file upload
// //     if (req.file) {
// //       updateData.profilePhoto = req.file.filename;
// //     }

// //     const updatedUser = await User.findByIdAndUpdate(req.user._id, updateData, {
// //       new: true,
// //       runValidators: true,
// //     }).select("-password");

// //     if (!updatedUser) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "User not found",
// //       });
// //     }

// //     res.status(200).json({
// //       success: true,
// //       message: "Profile updated successfully",
// //       user: {
// //         _id: updatedUser._id,
// //         name: updatedUser.name,
// //         email: updatedUser.email,
// //         username: updatedUser.username || updatedUser.email?.split("@")[0],
// //         gender: updatedUser.gender,
// //         profilePhoto: updatedUser.profilePhoto,
// //         kycVerified: updatedUser.kycVerified,
// //         createdAt: updatedUser.createdAt,
// //       },
// //     });
// //   } catch (error) {
// //     console.error("Update profile error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // };
// // // Get user by ID (for public profile viewing)
// // // export const getUserById = async (req, res) => {
// // //   try {
// // //     const { userId } = req.params;

// // //     const user = await User.findById(userId).select("-password -emailVerificationOtp -emailVerificationOtpExpires -resetPasswordOTP -resetPasswordOTPExpires");

// // //     if (!user) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: "User not found",
// // //       });
// // //     }

// // //     res.status(200).json({
// // //       success: true,
// // //       user: {
// // //         _id: user._id,
// // //         name: user.name,
// // //         email: user.email,
// // //         username: user.username,
// // //         profilePhoto: user.profilePhoto,
// // //         gender: user.gender,
// // //         createdAt: user.createdAt,
// // //       },
// // //     });
// // //   } catch (error) {
// // //     console.error("Get user by ID error:", error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: "Failed to fetch user",
// // //     });
// // //   }
// // // };

// // // Get user by ID (for public profile viewing)
// // export const getUserById = async (req, res) => {
// //   try {
// //     const { userId } = req.params;

// //     const user = await User.findById(userId).select("-password -emailVerificationOtp -emailVerificationOtpExpires -resetPasswordOTP -resetPasswordOTPExpires");

// //     if (!user) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "User not found",
// //       });
// //     }

// //     res.status(200).json({
// //       success: true,
// //       user: {
// //         _id: user._id,
// //         name: user.name,
// //         email: user.email,
// //         username: user.username,
// //         profilePhoto: user.profilePhoto,
// //         gender: user.gender,
// //         role: user.role,
// //         createdAt: user.createdAt,
// //       },
// //     });
// //   } catch (error) {
// //     console.error("Get user by ID error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to fetch user",
// //     });
// //   }
// // };

// import User from "../models/User.js";
// import multer from "multer";
// import path from "path";
// import fs from "fs";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // ─── Multer config for profile photos ────────────────────────────────────────
// // Saves to /uploads/profiles/ with a "profile-" prefix
// const profileStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(__dirname, "../../uploads/profiles");
//     if (!fs.existsSync(uploadPath)) {
//       fs.mkdirSync(uploadPath, { recursive: true });
//     }
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const ext = path.extname(file.originalname);
//     cb(null, "profile-" + uniqueSuffix + ext);
//   },
// });

// const profileFileFilter = (req, file, cb) => {
//   const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
//   if (allowed.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only image files are allowed"), false);
//   }
// };

// export const uploadProfilePhoto = multer({
//   storage: profileStorage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
//   fileFilter: profileFileFilter,
// }).single("profilePhoto");

// // ─── Get user profile ─────────────────────────────────────────────────────────
// export const getUserProfile = async (req, res) => {
//   try {
//     console.log("Getting profile for user ID:", req.user._id);

//     const user = await User.findById(req.user._id).select("-password");

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         username: user.username || user.email?.split("@")[0],
//         gender: user.gender,
//         profilePhoto: user.profilePhoto,
//         kycVerified: user.kycVerified,
//         createdAt: user.createdAt,
//       },
//     });
//   } catch (error) {
//     console.error("Profile controller error:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ─── Update user profile ──────────────────────────────────────────────────────
// export const updateUserProfile = async (req, res) => {
//   try {
//     const { name, username, gender } = req.body;

//     const updateData = {};
//     if (name) updateData.name = name;
//     if (username) updateData.username = username;
//     if (gender) updateData.gender = gender;

//     // Handle profile photo upload — file is saved to /uploads/profiles/
//     if (req.file) {
//       // Delete old profile photo from disk if it exists and was stored in profiles folder
//       const existingUser = await User.findById(req.user._id).select(
//         "profilePhoto",
//       );
//       if (
//         existingUser?.profilePhoto &&
//         existingUser.profilePhoto.startsWith("profile-")
//       ) {
//         const oldPath = path.join(
//           __dirname,
//           "../../uploads/profiles",
//           existingUser.profilePhoto,
//         );
//         if (fs.existsSync(oldPath)) {
//           fs.unlinkSync(oldPath);
//           console.log(
//             "🗑️  Deleted old profile photo:",
//             existingUser.profilePhoto,
//           );
//         }
//       }

//       updateData.profilePhoto = req.file.filename; // e.g. "profile-1234567890-123.jpg"
//       console.log("📸 New profile photo saved:", req.file.filename);
//     }

//     const updatedUser = await User.findByIdAndUpdate(req.user._id, updateData, {
//       new: true,
//       runValidators: true,
//     }).select("-password");

//     if (!updatedUser) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Profile updated successfully",
//       user: {
//         _id: updatedUser._id,
//         name: updatedUser.name,
//         email: updatedUser.email,
//         username: updatedUser.username || updatedUser.email?.split("@")[0],
//         gender: updatedUser.gender,
//         profilePhoto: updatedUser.profilePhoto,
//         kycVerified: updatedUser.kycVerified,
//         createdAt: updatedUser.createdAt,
//       },
//     });
//   } catch (error) {
//     console.error("Update profile error:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ─── Get user by ID (public profile) ─────────────────────────────────────────
// export const getUserById = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const user = await User.findById(userId).select(
//       "-password -emailVerificationOtp -emailVerificationOtpExpires -resetPasswordOTP -resetPasswordOTPExpires",
//     );

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         username: user.username,
//         profilePhoto: user.profilePhoto,
//         gender: user.gender,
//         role: user.role,
//         createdAt: user.createdAt,
//       },
//     });
//   } catch (error) {
//     console.error("Get user by ID error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch user",
//     });
//   }
// };

// /*
// ─────────────────────────────────────────────────────────────────────────────
// HOW TO USE IN YOUR PROFILE ROUTES FILE (profileRoutes.js):

//   import {
//     getUserProfile,
//     updateUserProfile,
//     uploadProfilePhoto,   ← import this multer middleware
//     getUserById,
//   } from "../controllers/profileController.js";
//   import { protect } from "../middleware/authMiddleware.js";

//   router.get("/", protect, getUserProfile);

//   // Use uploadProfilePhoto middleware BEFORE updateUserProfile
//   router.put("/update", protect, uploadProfilePhoto, updateUserProfile);

//   router.get("/user/:userId", getUserById);

// This ensures:
//   ✅ Files go to /uploads/profiles/
//   ✅ Filenames start with "profile-"  (never "vehicle-" again)
//   ✅ Old profile photo is deleted on update
// ─────────────────────────────────────────────────────────────────────────────
// */




import User from "../models/User.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── Multer config for profile photos ────────────────────────────────────────
const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../../uploads/profiles");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, "profile-" + uniqueSuffix + ext);
  },
});

const profileFileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

export const uploadProfilePhoto = multer({
  storage: profileStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: profileFileFilter,
}).single("profilePhoto");

// ─── Get user profile ─────────────────────────────────────────────────────────
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username || user.email?.split("@")[0],
        gender: user.gender,
        profilePhoto: user.profilePhoto,
        kycVerified: user.kycVerified,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Profile controller error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Update user profile ──────────────────────────────────────────────────────
export const updateUserProfile = async (req, res) => {
  try {
    const { name, username, gender } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (username) updateData.username = username;
    if (gender) updateData.gender = gender;

    if (req.file) {
      // Delete old profile photo if it was saved with correct prefix
      const existingUser = await User.findById(req.user._id).select("profilePhoto");
      if (existingUser?.profilePhoto && existingUser.profilePhoto.startsWith("profile-")) {
        const oldPath = path.join(__dirname, "../../uploads/profiles", existingUser.profilePhoto);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
          console.log("🗑️  Deleted old profile photo:", existingUser.profilePhoto);
        }
      }
      updateData.profilePhoto = req.file.filename;
      console.log("📸 New profile photo saved:", req.file.filename);
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        username: updatedUser.username || updatedUser.email?.split("@")[0],
        gender: updatedUser.gender,
        profilePhoto: updatedUser.profilePhoto,
        kycVerified: updatedUser.kycVerified,
        createdAt: updatedUser.createdAt,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Get user by ID (public) ──────────────────────────────────────────────────
// Used by VehicleDetails.jsx to fetch owner profile photo
// Route: GET /api/profile/user/:userId  (no auth required)
export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select(
      "-password -emailVerificationOtp -emailVerificationOtpExpires -resetPasswordOTP -resetPasswordOTPExpires"
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        profilePhoto: user.profilePhoto,
        gender: user.gender,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Get user by ID error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch user" });
  }
};
