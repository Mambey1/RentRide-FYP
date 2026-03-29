
// controllers/profileController.js
import User from "../models/User.js";

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    console.log("Getting profile for user ID:", req.user._id);

    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.log("Profile found:", user);

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
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { name, username, gender } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (username) updateData.username = username;
    if (gender) updateData.gender = gender;

    // Handle file upload
    if (req.file) {
      updateData.profilePhoto = req.file.filename;
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
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
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
