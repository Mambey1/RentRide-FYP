// import express from "express";
// import { protect } from "../middleware/authMiddleware.js";
// import Notification from "../models/Notification.js";

// const router = express.Router();

// // Get user notifications
// router.get("/", protect, async (req, res) => {
//   try {
//     const notifications = await Notification.find({ user: req.user.id })
//       .sort({ createdAt: -1 })
//       .limit(50);

//     res.json({ success: true, data: notifications });
//   } catch (error) {
//     console.error("Error fetching notifications:", error);
//     res.status(500).json({ success: false, message: "Failed to fetch notifications" });
//   }
// });

// // Create notification
// router.post("/", protect, async (req, res) => {
//   try {
//     const { title, message, type, details } = req.body;

//     const notification = new Notification({
//       user: req.user.id,
//       title,
//       message,
//       type: type || "info",
//       details,
//       read: false,
//     });

//     await notification.save();

//     res.json({ success: true, data: notification });
//   } catch (error) {
//     console.error("Error creating notification:", error);
//     res.status(500).json({ success: false, message: "Failed to create notification" });
//   }
// });

// // Mark notification as read
// router.put("/:id/read", protect, async (req, res) => {
//   try {
//     const notification = await Notification.findOne({
//       _id: req.params.id,
//       user: req.user.id,
//     });

//     if (!notification) {
//       return res.status(404).json({ success: false, message: "Notification not found" });
//     }

//     notification.read = true;
//     await notification.save();

//     res.json({ success: true, data: notification });
//   } catch (error) {
//     console.error("Error marking notification as read:", error);
//     res.status(500).json({ success: false, message: "Failed to update notification" });
//   }
// });

// // Delete notification
// router.delete("/:id", protect, async (req, res) => {
//   try {
//     await Notification.findOneAndDelete({
//       _id: req.params.id,
//       user: req.user.id,
//     });

//     res.json({ success: true, message: "Notification deleted" });
//   } catch (error) {
//     console.error("Error deleting notification:", error);
//     res.status(500).json({ success: false, message: "Failed to delete notification" });
//   }
// });

// export default router;

import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import Notification from "../models/Notification.js";

const router = express.Router();

// Get user notifications with payment actions
router.get("/", protect, async (req, res) => {
  try {
    const { unreadOnly = false, limit = 50, page = 1 } = req.query;

    const query = { user: req.user.id };
    if (unreadOnly === "true") {
      query.read = false;
    }

    const skip = (page - 1) * limit;

    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Notification.countDocuments(query);
    const unreadCount = await Notification.countDocuments({
      user: req.user.id,
      read: false,
    });

    res.json({
      success: true,
      data: notifications,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
      unreadCount,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch notifications" });
  }
});

// Get unread count
router.get("/unread-count", protect, async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      user: req.user.id,
      read: false,
    });
    res.json({ success: true, count });
  } catch (error) {
    console.error("Error fetching unread count:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch unread count" });
  }
});

// Create notification (for testing)
router.post("/", protect, async (req, res) => {
  try {
    const { title, message, type, details, action, priority } = req.body;

    const notification = new Notification({
      user: req.user.id,
      title,
      message,
      type: type || "info",
      details,
      read: false,
      priority: priority || "medium",
      action: action || { type: "none" },
    });

    await notification.save();

    res.json({ success: true, data: notification });
  } catch (error) {
    console.error("Error creating notification:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to create notification" });
  }
});

// Mark notification as read
router.put("/:id/read", protect, async (req, res) => {
  try {
    const notification = await Notification.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!notification) {
      return res
        .status(404)
        .json({ success: false, message: "Notification not found" });
    }

    notification.read = true;
    await notification.save();

    res.json({ success: true, data: notification });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update notification" });
  }
});

// Mark all as read
router.put("/mark-all-read", protect, async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.user.id, read: false },
      { $set: { read: true } },
    );

    res.json({ success: true, message: "All notifications marked as read" });
  } catch (error) {
    console.error("Error marking all as read:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to mark all as read" });
  }
});

// Delete notification
router.delete("/:id", protect, async (req, res) => {
  try {
    await Notification.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    res.json({ success: true, message: "Notification deleted" });
  } catch (error) {
    console.error("Error deleting notification:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete notification" });
  }
});

export default router;
