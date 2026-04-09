import Chat from "../models/Chat.js";
import User from "../models/User.js";
import UserVehicle from "../models/UserVehicle.js";
import Vehicle from "../models/Vehicle.js";
import Booking from "../models/Booking.js";
import { createNotification } from "../utils/notificationHelper.js";

// Get or create chat between user and vehicle owner
export const getOrCreateVehicleChat = async (req, res) => {
  try {
    const { vehicleId, vehicleType } = req.body;
    const userId = req.user.id;

    // Find the vehicle and get owner
    let ownerId = null;
    let vehicleName = "";
    let vehicleData = null;

    if (vehicleType === "user") {
      const userVehicle = await UserVehicle.findById(vehicleId);
      if (!userVehicle) {
        return res.status(404).json({ success: false, message: "Vehicle not found" });
      }
      ownerId = userVehicle.user;
      vehicleName = userVehicle.carName;
      vehicleData = userVehicle;
    } else {
      // Admin vehicles - chat with admin/support
      const adminVehicle = await Vehicle.findById(vehicleId);
      if (!adminVehicle) {
        return res.status(404).json({ success: false, message: "Vehicle not found" });
      }
      vehicleName = adminVehicle.carName;
      vehicleData = adminVehicle;
      // For admin vehicles, find an admin user to chat with
      const adminUser = await User.findOne({ role: "admin" });
      if (adminUser) {
        ownerId = adminUser._id;
      }
    }

    if (!ownerId) {
      return res.status(404).json({ success: false, message: "No owner/admin found" });
    }

    // Check if chat already exists
    let chat = await Chat.findOne({
      chatType: "vehicle",
      participants: { $all: [userId, ownerId] },
      vehicleId: vehicleId,
      isActive: true,
    }).populate("participants", "name email profilePhoto role");

    if (!chat) {
      // Create new chat
      chat = new Chat({
        chatType: "vehicle",
        participants: [userId, ownerId],
        vehicleId: vehicleId,
        vehicleModel: vehicleType === "user" ? "UserVehicle" : "Vehicle",
        vehicleName: vehicleName,
        title: `Chat about ${vehicleName}`,
        messages: [],
        unreadCounts: new Map([
          [userId.toString(), 0],
          [ownerId.toString(), 0],
        ]),
      });
      await chat.save();
      await chat.populate("participants", "name email profilePhoto role");
    }

    res.status(200).json({
      success: true,
      data: chat,
    });
  } catch (error) {
    console.error("Error getting vehicle chat:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get or create support chat
export const getOrCreateSupportChat = async (req, res) => {
  try {
    const userId = req.user.id;

    // Check if user already has an active support chat
    let chat = await Chat.findOne({
      chatType: "support",
      participants: userId,
      isActive: true,
    }).populate("participants", "name email profilePhoto role");

    if (!chat) {
      // Find all admin users
      const admins = await User.find({ role: "admin" }).select("_id");
      const adminIds = admins.map(a => a._id);
      
      const participants = [userId, ...adminIds];
      
      // Initialize unread counts
      const unreadCounts = new Map();
      participants.forEach(p => {
        unreadCounts.set(p.toString(), 0);
      });
      
      chat = new Chat({
        chatType: "support",
        participants: participants,
        title: "Support Chat",
        messages: [],
        unreadCounts: unreadCounts,
      });
      await chat.save();
      await chat.populate("participants", "name email profilePhoto role");
    }

    res.status(200).json({
      success: true,
      data: chat,
    });
  } catch (error) {
    console.error("Error getting support chat:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get chat by ID
export const getChatById = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user.id;

    const chat = await Chat.findById(chatId)
      .populate("participants", "name email profilePhoto role")
      .populate("messages.sender", "name email profilePhoto role")
      .populate("lastMessageSender", "name");

    if (!chat) {
      return res.status(404).json({ success: false, message: "Chat not found" });
    }

    // Check if user is participant
    if (!chat.participants.some(p => p._id.toString() === userId)) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    res.status(200).json({
      success: true,
      data: chat,
    });
  } catch (error) {
    console.error("Error getting chat:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get user's all chats
export const getUserChats = async (req, res) => {
  try {
    const userId = req.user.id;

    const chats = await Chat.find({
      participants: userId,
      isActive: true,
    })
      .populate("participants", "name email profilePhoto role")
      .populate("lastMessageSender", "name")
      .sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      data: chats,
    });
  } catch (error) {
    console.error("Error getting user chats:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Mark messages as read
export const markMessagesAsRead = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user.id;

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ success: false, message: "Chat not found" });
    }

    // Mark all unread messages from others as read
    let updated = false;
    chat.messages.forEach(message => {
      if (message.sender.toString() !== userId && !message.read) {
        message.read = true;
        message.readAt = new Date();
        updated = true;
      }
    });

    // Reset unread count for this user
    chat.unreadCounts.set(userId.toString(), 0);

    if (updated) {
      await chat.save();
    }

    res.status(200).json({
      success: true,
      message: "Messages marked as read",
    });
  } catch (error) {
    console.error("Error marking messages as read:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get unread count for user
export const getUnreadCount = async (req, res) => {
  try {
    const userId = req.user.id;

    const chats = await Chat.find({
      participants: userId,
      isActive: true,
    });

    let totalUnread = 0;
    chats.forEach(chat => {
      totalUnread += chat.unreadCounts.get(userId.toString()) || 0;
    });

    res.status(200).json({
      success: true,
      unreadCount: totalUnread,
    });
  } catch (error) {
    console.error("Error getting unread count:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Close chat (admin only)
export const closeChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user.id;
    const isAdmin = req.user.role === "admin";

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ success: false, message: "Chat not found" });
    }

    if (!isAdmin) {
      return res.status(403).json({ success: false, message: "Only admins can close chats" });
    }

    chat.isActive = false;
    chat.closedBy = userId;
    chat.closedAt = new Date();
    await chat.save();

    res.status(200).json({
      success: true,
      message: "Chat closed successfully",
    });
  } catch (error) {
    console.error("Error closing chat:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};