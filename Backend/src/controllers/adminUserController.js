import User from "../models/User.js";
import Report from "../models/Report.js";
import Warning from "../models/Warning.js";
import Booking from "../models/Booking.js";           // ← add this
import BikeBooking from "../models/BikeBooking.js";   // ← add this
import UserVehicle from "../models/UserVehicle.js";   // ← add this
import { createNotification } from "../utils/notificationHelper.js";

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } })
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// // Get user details
// export const getUserDetails = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const user = await User.findById(userId).select("-password");

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     const warnings = await Warning.find({ userId })
//       .populate("givenBy", "name email")
//       .sort({ createdAt: -1 });

//     const reports = await Report.find({ reportedUser: userId })
//       .populate("reportedBy", "name email")
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       user,
//       warnings,
//       reports,
//     });
//   } catch (error) {
//     console.error("Get user details error:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };



export const getUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const [warnings, reports, carBookings, bikeBookings, vehicles] = await Promise.all([
      Warning.find({ userId })
        .populate("givenBy", "name email")
        .sort({ createdAt: -1 }),

      Report.find({ reportedUser: userId })
        .populate("reportedBy", "name email")
        .sort({ createdAt: -1 }),

      Booking.find({ user: userId })
        .populate("vehicle", "carName vehiclePhotos")
        .sort({ createdAt: -1 }),

      BikeBooking.find({ user: userId })
        .populate("bike", "name photos")
        .sort({ createdAt: -1 }),

      UserVehicle.find({ user: userId })
        .sort({ createdAt: -1 }),
    ]);

    // Merge car and bike bookings, newest first
    const bookings = [...carBookings, ...bikeBookings].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    res.status(200).json({
      success: true,
      user,
      warnings,
      reports,
      bookings,
      vehicles,
    });
  } catch (error) {
    console.error("Get user details error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Give warning to user
export const giveWarning = async (req, res) => {
  try {
    const { userId } = req.params;
    const { reason, reportId } = req.body;
    const adminId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Create warning record
    const warning = await Warning.create({
      userId,
      givenBy: adminId,
      reason,
      reportId: reportId || null,
    });

    // Increment warning count
    user.warningCount += 1;

    // Check if user should be blocked (3 warnings)
    let isBlocked = false;
    let blockMessage = "";

    if (user.warningCount >= 3) {
      user.isBlocked = true;
      user.blockedAt = new Date();
      user.blockedReason = `Auto-blocked due to ${user.warningCount} warnings`;
      isBlocked = true;
      blockMessage = "The user has been automatically blocked due to 3 warnings.";
    }

    await user.save();

    // Create notification for user
    await createNotification(
      userId,
      "Warning Issued",
      `You have received a warning. Reason: ${reason}. ${user.warningCount}/3 warnings. ${isBlocked ? "Your account has been blocked." : "Further violations may lead to account suspension."}`,
      "warning",
      "Account Warning",
    );

    // Update report status if reportId provided
    if (reportId) {
      await Report.findByIdAndUpdate(reportId, {
        status: "action_taken",
        warningGiven: true,
        adminNote: `Warning issued. ${isBlocked ? "User blocked." : ""}`,
      });
    }

    res.status(200).json({
      success: true,
      message: isBlocked ? `Warning given. User is now blocked.` : `Warning given. User has ${user.warningCount}/3 warnings.`,
      warningCount: user.warningCount,
      isBlocked,
    });
  } catch (error) {
    console.error("Give warning error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Block user manually
export const blockUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { reason } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.isBlocked = true;
    user.blockedAt = new Date();
    user.blockedReason = reason || "Manual block by admin";
    await user.save();

    await createNotification(
      userId,
      "Account Blocked",
      `Your account has been blocked. Reason: ${user.blockedReason}. Please contact support for more information.`,
      "error",
      "Account Suspended",
    );

    res.status(200).json({
      success: true,
      message: "User blocked successfully",
    });
  } catch (error) {
    console.error("Block user error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Unblock user
export const unblockUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { reason } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.isBlocked = false;
    user.blockedAt = null;
    user.blockedReason = null;
    // Reset warning count when unblocking (optional - can keep or reset)
    // user.warningCount = 0;
    await user.save();

    await createNotification(
      userId,
      "Account Unblocked",
      `Your account has been unblocked. Reason: ${reason || "Admin discretion"}. You can now log in again.`,
      "success",
      "Account Restored",
    );

    res.status(200).json({
      success: true,
      message: "User unblocked successfully",
    });
  } catch (error) {
    console.error("Unblock user error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create report
export const createReport = async (req, res) => {
  try {
    const { reportedUserId, reason, description } = req.body;
    const reporterId = req.user.id;

    // Handle screenshot upload if exists
    let screenshotUrl = null;
    if (req.file) {
      screenshotUrl = `/uploads/reports/${req.file.filename}`;
    }

    const report = await Report.create({
      reportedBy: reporterId,
      reportedUser: reportedUserId,
      reason,
      description,
      screenshotProof: screenshotUrl,
      status: "pending",
    });

    // Notify admin about new report (can implement socket later)
    
    res.status(201).json({
      success: true,
      message: "Report submitted successfully. Admin will review it.",
      report,
    });
  } catch (error) {
    console.error("Create report error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all reports (admin)
export const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("reportedBy", "name email")
      .populate("reportedUser", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reports,
    });
  } catch (error) {
    console.error("Get all reports error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update report status
export const updateReportStatus = async (req, res) => {
  try {
    const { reportId } = req.params;
    const { status, adminNote } = req.body;

    const report = await Report.findByIdAndUpdate(
      reportId,
      { status, adminNote },
      { new: true },
    );

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Report status updated",
      report,
    });
  } catch (error) {
    console.error("Update report status error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Don't allow deleting admin
    if (user.role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Cannot delete admin user",
      });
    }

    await User.findByIdAndDelete(userId);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Reset warnings for user
export const resetWarnings = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.warningCount = 0;
    await user.save();

    // Optionally delete old warnings or keep for history
    // await Warning.deleteMany({ userId });

    await createNotification(
      userId,
      "Warnings Reset",
      "Your warnings have been reset by admin.",
      "info",
      "Account Update",
    );

    res.status(200).json({
      success: true,
      message: "User warnings reset successfully",
    });
  } catch (error) {
    console.error("Reset warnings error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};