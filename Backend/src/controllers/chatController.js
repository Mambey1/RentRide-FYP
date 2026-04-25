// // // // // // // import Chat from "../models/Chat.js";
// // // // // // // import User from "../models/User.js";
// // // // // // // import UserVehicle from "../models/UserVehicle.js";
// // // // // // // import Vehicle from "../models/Vehicle.js";
// // // // // // // import Booking from "../models/Booking.js";
// // // // // // // import { createNotification } from "../utils/notificationHelper.js";

// // // // // // // // Get or create chat between user and vehicle owner
// // // // // // // export const getOrCreateVehicleChat = async (req, res) => {
// // // // // // //   try {
// // // // // // //     const { vehicleId, vehicleType } = req.body;
// // // // // // //     const userId = req.user.id;

// // // // // // //     // Find the vehicle and get owner
// // // // // // //     let ownerId = null;
// // // // // // //     let vehicleName = "";
// // // // // // //     let vehicleData = null;

// // // // // // //     if (vehicleType === "user") {
// // // // // // //       const userVehicle = await UserVehicle.findById(vehicleId);
// // // // // // //       if (!userVehicle) {
// // // // // // //         return res
// // // // // // //           .status(404)
// // // // // // //           .json({ success: false, message: "Vehicle not found" });
// // // // // // //       }
// // // // // // //       ownerId = userVehicle.user;
// // // // // // //       vehicleName = userVehicle.carName;
// // // // // // //       vehicleData = userVehicle;
// // // // // // //     } else {
// // // // // // //       // Admin vehicles - chat with admin/support
// // // // // // //       const adminVehicle = await Vehicle.findById(vehicleId);
// // // // // // //       if (!adminVehicle) {
// // // // // // //         return res
// // // // // // //           .status(404)
// // // // // // //           .json({ success: false, message: "Vehicle not found" });
// // // // // // //       }
// // // // // // //       vehicleName = adminVehicle.carName;
// // // // // // //       vehicleData = adminVehicle;
// // // // // // //       // For admin vehicles, find an admin user to chat with
// // // // // // //       const adminUser = await User.findOne({ role: "admin" });
// // // // // // //       if (adminUser) {
// // // // // // //         ownerId = adminUser._id;
// // // // // // //       }
// // // // // // //     }

// // // // // // //     if (!ownerId) {
// // // // // // //       return res
// // // // // // //         .status(404)
// // // // // // //         .json({ success: false, message: "No owner/admin found" });
// // // // // // //     }

// // // // // // //     // Check if chat already exists
// // // // // // //     let chat = await Chat.findOne({
// // // // // // //       chatType: "vehicle",
// // // // // // //       participants: { $all: [userId, ownerId] },
// // // // // // //       vehicleId: vehicleId,
// // // // // // //       isActive: true,
// // // // // // //     }).populate("participants", "name email profilePhoto role");

// // // // // // //     if (!chat) {
// // // // // // //       // Create new chat
// // // // // // //       chat = new Chat({
// // // // // // //         chatType: "vehicle",
// // // // // // //         participants: [userId, ownerId],
// // // // // // //         vehicleId: vehicleId,
// // // // // // //         vehicleModel: vehicleType === "user" ? "UserVehicle" : "Vehicle",
// // // // // // //         vehicleName: vehicleName,
// // // // // // //         title: `Chat about ${vehicleName}`,
// // // // // // //         messages: [],
// // // // // // //         unreadCounts: new Map([
// // // // // // //           [userId.toString(), 0],
// // // // // // //           [ownerId.toString(), 0],
// // // // // // //         ]),
// // // // // // //       });
// // // // // // //       await chat.save();
// // // // // // //       await chat.populate("participants", "name email profilePhoto role");
// // // // // // //     } else {
// // // // // // //       // Make sure vehicleName is set even for existing chats
// // // // // // //       if (!chat.vehicleName && vehicleName) {
// // // // // // //         chat.vehicleName = vehicleName;
// // // // // // //         await chat.save();
// // // // // // //       }
// // // // // // //     }

// // // // // // //     res.status(200).json({
// // // // // // //       success: true,
// // // // // // //       data: chat,
// // // // // // //     });
// // // // // // //   } catch (error) {
// // // // // // //     console.error("Error getting vehicle chat:", error);
// // // // // // //     res.status(500).json({ success: false, message: error.message });
// // // // // // //   }
// // // // // // // };

// // // // // // // // Get or create support chat
// // // // // // // export const getOrCreateSupportChat = async (req, res) => {
// // // // // // //   try {
// // // // // // //     const userId = req.user.id;

// // // // // // //     // Check if user already has an active support chat
// // // // // // //     let chat = await Chat.findOne({
// // // // // // //       chatType: "support",
// // // // // // //       participants: userId,
// // // // // // //       isActive: true,
// // // // // // //     }).populate("participants", "name email profilePhoto role");

// // // // // // //     if (!chat) {
// // // // // // //       // Find all admin users
// // // // // // //       const admins = await User.find({ role: "admin" }).select("_id");
// // // // // // //       const adminIds = admins.map((a) => a._id);

// // // // // // //       const participants = [userId, ...adminIds];

// // // // // // //       // Initialize unread counts
// // // // // // //       const unreadCounts = new Map();
// // // // // // //       participants.forEach((p) => {
// // // // // // //         unreadCounts.set(p.toString(), 0);
// // // // // // //       });

// // // // // // //       chat = new Chat({
// // // // // // //         chatType: "support",
// // // // // // //         participants: participants,
// // // // // // //         title: "Support Chat",
// // // // // // //         messages: [],
// // // // // // //         unreadCounts: unreadCounts,
// // // // // // //       });
// // // // // // //       await chat.save();
// // // // // // //       await chat.populate("participants", "name email profilePhoto role");
// // // // // // //     }

// // // // // // //     res.status(200).json({
// // // // // // //       success: true,
// // // // // // //       data: chat,
// // // // // // //     });
// // // // // // //   } catch (error) {
// // // // // // //     console.error("Error getting support chat:", error);
// // // // // // //     res.status(500).json({ success: false, message: error.message });
// // // // // // //   }
// // // // // // // };

// // // // // // // // Get chat by ID
// // // // // // // export const getChatById = async (req, res) => {
// // // // // // //   try {
// // // // // // //     const { chatId } = req.params;
// // // // // // //     const userId = req.user.id;

// // // // // // //     const chat = await Chat.findById(chatId)
// // // // // // //       .populate("participants", "name email profilePhoto role")
// // // // // // //       .populate("messages.sender", "name email profilePhoto role")
// // // // // // //       .populate("lastMessageSender", "name");

// // // // // // //     if (!chat) {
// // // // // // //       return res
// // // // // // //         .status(404)
// // // // // // //         .json({ success: false, message: "Chat not found" });
// // // // // // //     }

// // // // // // //     // Check if user is participant
// // // // // // //     if (!chat.participants.some((p) => p._id.toString() === userId)) {
// // // // // // //       return res.status(403).json({ success: false, message: "Unauthorized" });
// // // // // // //     }

// // // // // // //     res.status(200).json({
// // // // // // //       success: true,
// // // // // // //       data: chat,
// // // // // // //     });
// // // // // // //   } catch (error) {
// // // // // // //     console.error("Error getting chat:", error);
// // // // // // //     res.status(500).json({ success: false, message: error.message });
// // // // // // //   }
// // // // // // // };

// // // // // // // // Get user's all chats
// // // // // // // export const getUserChats = async (req, res) => {
// // // // // // //   try {
// // // // // // //     const userId = req.user.id;

// // // // // // //     const chats = await Chat.find({
// // // // // // //       participants: userId,
// // // // // // //       isActive: true,
// // // // // // //     })
// // // // // // //       .populate("participants", "name email profilePhoto role")
// // // // // // //       .populate("lastMessageSender", "name")
// // // // // // //       .sort({ updatedAt: -1 });

// // // // // // //     res.status(200).json({
// // // // // // //       success: true,
// // // // // // //       data: chats,
// // // // // // //     });
// // // // // // //   } catch (error) {
// // // // // // //     console.error("Error getting user chats:", error);
// // // // // // //     res.status(500).json({ success: false, message: error.message });
// // // // // // //   }
// // // // // // // };

// // // // // // // // Mark messages as read
// // // // // // // export const markMessagesAsRead = async (req, res) => {
// // // // // // //   try {
// // // // // // //     const { chatId } = req.params;
// // // // // // //     const userId = req.user.id;

// // // // // // //     const chat = await Chat.findById(chatId);
// // // // // // //     if (!chat) {
// // // // // // //       return res
// // // // // // //         .status(404)
// // // // // // //         .json({ success: false, message: "Chat not found" });
// // // // // // //     }

// // // // // // //     // Mark all unread messages from others as read
// // // // // // //     let updated = false;
// // // // // // //     chat.messages.forEach((message) => {
// // // // // // //       if (message.sender.toString() !== userId && !message.read) {
// // // // // // //         message.read = true;
// // // // // // //         message.readAt = new Date();
// // // // // // //         updated = true;
// // // // // // //       }
// // // // // // //     });

// // // // // // //     // Reset unread count for this user
// // // // // // //     chat.unreadCounts.set(userId.toString(), 0);

// // // // // // //     if (updated) {
// // // // // // //       await chat.save();
// // // // // // //     }

// // // // // // //     res.status(200).json({
// // // // // // //       success: true,
// // // // // // //       message: "Messages marked as read",
// // // // // // //     });
// // // // // // //   } catch (error) {
// // // // // // //     console.error("Error marking messages as read:", error);
// // // // // // //     res.status(500).json({ success: false, message: error.message });
// // // // // // //   }
// // // // // // // };

// // // // // // // // Get unread count for user
// // // // // // // export const getUnreadCount = async (req, res) => {
// // // // // // //   try {
// // // // // // //     const userId = req.user.id;

// // // // // // //     const chats = await Chat.find({
// // // // // // //       participants: userId,
// // // // // // //       isActive: true,
// // // // // // //     });

// // // // // // //     let totalUnread = 0;
// // // // // // //     chats.forEach((chat) => {
// // // // // // //       totalUnread += chat.unreadCounts.get(userId.toString()) || 0;
// // // // // // //     });

// // // // // // //     res.status(200).json({
// // // // // // //       success: true,
// // // // // // //       unreadCount: totalUnread,
// // // // // // //     });
// // // // // // //   } catch (error) {
// // // // // // //     console.error("Error getting unread count:", error);
// // // // // // //     res.status(500).json({ success: false, message: error.message });
// // // // // // //   }
// // // // // // // };

// // // // // // // // Close chat (admin only)
// // // // // // // export const closeChat = async (req, res) => {
// // // // // // //   try {
// // // // // // //     const { chatId } = req.params;
// // // // // // //     const userId = req.user.id;
// // // // // // //     const isAdmin = req.user.role === "admin";

// // // // // // //     const chat = await Chat.findById(chatId);
// // // // // // //     if (!chat) {
// // // // // // //       return res
// // // // // // //         .status(404)
// // // // // // //         .json({ success: false, message: "Chat not found" });
// // // // // // //     }

// // // // // // //     if (!isAdmin) {
// // // // // // //       return res
// // // // // // //         .status(403)
// // // // // // //         .json({ success: false, message: "Only admins can close chats" });
// // // // // // //     }

// // // // // // //     chat.isActive = false;
// // // // // // //     chat.closedBy = userId;
// // // // // // //     chat.closedAt = new Date();
// // // // // // //     await chat.save();

// // // // // // //     res.status(200).json({
// // // // // // //       success: true,
// // // // // // //       message: "Chat closed successfully",
// // // // // // //     });
// // // // // // //   } catch (error) {
// // // // // // //     console.error("Error closing chat:", error);
// // // // // // //     res.status(500).json({ success: false, message: error.message });
// // // // // // //   }
// // // // // // // };
// // // // // // // // Add this function to chatController.js
// // // // // // // export const sendMessage = async (req, res) => {
// // // // // // //   try {
// // // // // // //     const { chatId } = req.params;
// // // // // // //     const { message } = req.body;
// // // // // // //     const userId = req.user.id;

// // // // // // //     const chat = await Chat.findById(chatId);
// // // // // // //     if (!chat) {
// // // // // // //       return res
// // // // // // //         .status(404)
// // // // // // //         .json({ success: false, message: "Chat not found" });
// // // // // // //     }

// // // // // // //     // Check if user is participant
// // // // // // //     if (!chat.participants.includes(userId)) {
// // // // // // //       return res.status(403).json({ success: false, message: "Unauthorized" });
// // // // // // //     }

// // // // // // //     // Determine sender type
// // // // // // //     let senderType = "user";
// // // // // // //     if (req.user.role === "admin") {
// // // // // // //       senderType = "admin";
// // // // // // //     }

// // // // // // //     const newMessage = {
// // // // // // //       sender: userId,
// // // // // // //       senderType,
// // // // // // //       message: message.trim(),
// // // // // // //       read: false,
// // // // // // //       delivered: true,
// // // // // // //     };

// // // // // // //     chat.messages.push(newMessage);
// // // // // // //     chat.lastMessage = message;
// // // // // // //     chat.lastMessageAt = new Date();
// // // // // // //     chat.lastMessageSender = userId;

// // // // // // //     // Update unread counts for other participants
// // // // // // //     for (const participantId of chat.participants) {
// // // // // // //       if (participantId.toString() !== userId) {
// // // // // // //         const currentUnread =
// // // // // // //           chat.unreadCounts.get(participantId.toString()) || 0;
// // // // // // //         chat.unreadCounts.set(participantId.toString(), currentUnread + 1);
// // // // // // //       }
// // // // // // //     }

// // // // // // //     await chat.save();

// // // // // // //     // Get the saved message with full details
// // // // // // //     const savedMessage = chat.messages[chat.messages.length - 1];

// // // // // // //     // Get sender details
// // // // // // //     const sender = await User.findById(userId).select(
// // // // // // //       "name email profilePhoto role",
// // // // // // //     );

// // // // // // //     // Prepare message for socket emission
// // // // // // //     const messageToEmit = {
// // // // // // //       _id: savedMessage._id,
// // // // // // //       message: savedMessage.message,
// // // // // // //       senderType: savedMessage.senderType,
// // // // // // //       read: savedMessage.read,
// // // // // // //       delivered: savedMessage.delivered,
// // // // // // //       createdAt: savedMessage.createdAt,
// // // // // // //       sender: {
// // // // // // //         _id: userId,
// // // // // // //         name: sender.name,
// // // // // // //         email: sender.email,
// // // // // // //         profilePhoto: sender.profilePhoto,
// // // // // // //         role: sender.role,
// // // // // // //       },
// // // // // // //     };

// // // // // // //     // Emit via socket for real-time - FIXED
// // // // // // //     const io = req.app.get("io");
// // // // // // //     if (io) {
// // // // // // //       // Emit to the specific chat room
// // // // // // //       io.to(`chat_${chatId}`).emit("new_message", {
// // // // // // //         chatId,
// // // // // // //         message: messageToEmit,
// // // // // // //       });

// // // // // // //       // Also send personal notifications to each participant
// // // // // // //       for (const participantId of chat.participants) {
// // // // // // //         if (participantId.toString() !== userId) {
// // // // // // //           io.to(`user_${participantId}`).emit("new_message_notification", {
// // // // // // //             chatId,
// // // // // // //             from: sender.name,
// // // // // // //             message: message.substring(0, 100),
// // // // // // //           });
// // // // // // //         }
// // // // // // //       }
// // // // // // //     } else {
// // // // // // //       console.log(
// // // // // // //         "Socket.IO not available, message saved but not sent in real-time",
// // // // // // //       );
// // // // // // //     }

// // // // // // //     res.status(200).json({
// // // // // // //       success: true,
// // // // // // //       message: "Message sent successfully",
// // // // // // //       data: messageToEmit,
// // // // // // //     });
// // // // // // //   } catch (error) {
// // // // // // //     console.error("Error sending message:", error);
// // // // // // //     res.status(500).json({ success: false, message: error.message });
// // // // // // //   }
// // // // // // // };
// // // // // // // // Block user in chat
// // // // // // // export const blockUser = async (req, res) => {
// // // // // // //   try {
// // // // // // //     const { chatId } = req.params;
// // // // // // //     const userId = req.user.id;

// // // // // // //     const chat = await Chat.findById(chatId);
// // // // // // //     if (!chat) {
// // // // // // //       return res.status(404).json({ success: false, message: "Chat not found" });
// // // // // // //     }

// // // // // // //     if (!chat.participants.includes(userId)) {
// // // // // // //       return res.status(403).json({ success: false, message: "Unauthorized" });
// // // // // // //     }

// // // // // // //     chat.isBlocked = true;
// // // // // // //     chat.blockedBy = userId;
// // // // // // //     chat.blockedAt = new Date();
// // // // // // //     await chat.save();

// // // // // // //     const io = req.app.get("io");
// // // // // // //     if (io) {
// // // // // // //       io.to(`chat_${chatId}`).emit("user_blocked", { chatId, blockedBy: userId });
// // // // // // //     }

// // // // // // //     res.status(200).json({ success: true, message: "User blocked successfully" });
// // // // // // //   } catch (error) {
// // // // // // //     console.error("Error blocking user:", error);
// // // // // // //     res.status(500).json({ success: false, message: error.message });
// // // // // // //   }
// // // // // // // };

// // // // // // // // Unblock user
// // // // // // // export const unblockUser = async (req, res) => {
// // // // // // //   try {
// // // // // // //     const { chatId } = req.params;
// // // // // // //     const userId = req.user.id;

// // // // // // //     const chat = await Chat.findById(chatId);
// // // // // // //     if (!chat) {
// // // // // // //       return res.status(404).json({ success: false, message: "Chat not found" });
// // // // // // //     }

// // // // // // //     chat.isBlocked = false;
// // // // // // //     chat.blockedBy = null;
// // // // // // //     chat.blockedAt = null;
// // // // // // //     await chat.save();

// // // // // // //     res.status(200).json({ success: true, message: "User unblocked successfully" });
// // // // // // //   } catch (error) {
// // // // // // //     console.error("Error unblocking user:", error);
// // // // // // //     res.status(500).json({ success: false, message: error.message });
// // // // // // //   }
// // // // // // // };

// // // // // // import Chat from "../models/Chat.js";
// // // // // // import User from "../models/User.js";
// // // // // // import UserVehicle from "../models/UserVehicle.js";
// // // // // // import Vehicle from "../models/Vehicle.js";
// // // // // // import Booking from "../models/Booking.js";
// // // // // // import { createNotification } from "../utils/notificationHelper.js";

// // // // // // // Get or create chat between user and vehicle owner
// // // // // // export const getOrCreateVehicleChat = async (req, res) => {
// // // // // //   try {
// // // // // //     const { vehicleId, vehicleType } = req.body;
// // // // // //     const userId = req.user.id;

// // // // // //     // Find the vehicle and get owner
// // // // // //     let ownerId = null;
// // // // // //     let vehicleName = "";
// // // // // //     let vehicleData = null;

// // // // // //     if (vehicleType === "user") {
// // // // // //       const userVehicle = await UserVehicle.findById(vehicleId);
// // // // // //       if (!userVehicle) {
// // // // // //         return res
// // // // // //           .status(404)
// // // // // //           .json({ success: false, message: "Vehicle not found" });
// // // // // //       }
// // // // // //       ownerId = userVehicle.user;
// // // // // //       vehicleName = userVehicle.carName;
// // // // // //       vehicleData = userVehicle;
// // // // // //     } else {
// // // // // //       // Admin vehicles - chat with admin/support
// // // // // //       const adminVehicle = await Vehicle.findById(vehicleId);
// // // // // //       if (!adminVehicle) {
// // // // // //         return res
// // // // // //           .status(404)
// // // // // //           .json({ success: false, message: "Vehicle not found" });
// // // // // //       }
// // // // // //       vehicleName = adminVehicle.carName;
// // // // // //       vehicleData = adminVehicle;
// // // // // //       // For admin vehicles, find an admin user to chat with
// // // // // //       const adminUser = await User.findOne({ role: "admin" });
// // // // // //       if (adminUser) {
// // // // // //         ownerId = adminUser._id;
// // // // // //       }
// // // // // //     }

// // // // // //     if (!ownerId) {
// // // // // //       return res
// // // // // //         .status(404)
// // // // // //         .json({ success: false, message: "No owner/admin found" });
// // // // // //     }

// // // // // //     // Check if chat already exists
// // // // // //     let chat = await Chat.findOne({
// // // // // //       chatType: "vehicle",
// // // // // //       participants: { $all: [userId, ownerId] },
// // // // // //       vehicleId: vehicleId,
// // // // // //       isActive: true,
// // // // // //     }).populate("participants", "name email profilePhoto role");

// // // // // //     if (!chat) {
// // // // // //       // Create new chat
// // // // // //       chat = new Chat({
// // // // // //         chatType: "vehicle",
// // // // // //         participants: [userId, ownerId],
// // // // // //         vehicleId: vehicleId,
// // // // // //         vehicleModel: vehicleType === "user" ? "UserVehicle" : "Vehicle",
// // // // // //         vehicleName: vehicleName,
// // // // // //         title: `Chat about ${vehicleName}`,
// // // // // //         messages: [],
// // // // // //         unreadCounts: new Map([
// // // // // //           [userId.toString(), 0],
// // // // // //           [ownerId.toString(), 0],
// // // // // //         ]),
// // // // // //       });
// // // // // //       await chat.save();
// // // // // //       await chat.populate("participants", "name email profilePhoto role");
// // // // // //     } else {
// // // // // //       // Make sure vehicleName is set even for existing chats
// // // // // //       if (!chat.vehicleName && vehicleName) {
// // // // // //         chat.vehicleName = vehicleName;
// // // // // //         await chat.save();
// // // // // //       }
// // // // // //     }

// // // // // //     res.status(200).json({
// // // // // //       success: true,
// // // // // //       data: chat,
// // // // // //     });
// // // // // //   } catch (error) {
// // // // // //     console.error("Error getting vehicle chat:", error);
// // // // // //     res.status(500).json({ success: false, message: error.message });
// // // // // //   }
// // // // // // };

// // // // // // // Get or create support chat
// // // // // // export const getOrCreateSupportChat = async (req, res) => {
// // // // // //   try {
// // // // // //     const userId = req.user.id;

// // // // // //     // Check if user already has an active support chat
// // // // // //     let chat = await Chat.findOne({
// // // // // //       chatType: "support",
// // // // // //       participants: userId,
// // // // // //       isActive: true,
// // // // // //     }).populate("participants", "name email profilePhoto role");

// // // // // //     if (!chat) {
// // // // // //       // Find all admin users
// // // // // //       const admins = await User.find({ role: "admin" }).select("_id");
// // // // // //       const adminIds = admins.map((a) => a._id);

// // // // // //       const participants = [userId, ...adminIds];

// // // // // //       // Initialize unread counts
// // // // // //       const unreadCounts = new Map();
// // // // // //       participants.forEach((p) => {
// // // // // //         unreadCounts.set(p.toString(), 0);
// // // // // //       });

// // // // // //       chat = new Chat({
// // // // // //         chatType: "support",
// // // // // //         participants: participants,
// // // // // //         title: "Support Chat",
// // // // // //         messages: [],
// // // // // //         unreadCounts: unreadCounts,
// // // // // //       });
// // // // // //       await chat.save();
// // // // // //       await chat.populate("participants", "name email profilePhoto role");
// // // // // //     }

// // // // // //     res.status(200).json({
// // // // // //       success: true,
// // // // // //       data: chat,
// // // // // //     });
// // // // // //   } catch (error) {
// // // // // //     console.error("Error getting support chat:", error);
// // // // // //     res.status(500).json({ success: false, message: error.message });
// // // // // //   }
// // // // // // };

// // // // // // // Get chat by ID
// // // // // // export const getChatById = async (req, res) => {
// // // // // //   try {
// // // // // //     const { chatId } = req.params;
// // // // // //     const userId = req.user.id;

// // // // // //     const chat = await Chat.findById(chatId)
// // // // // //       .populate("participants", "name email profilePhoto role")
// // // // // //       .populate("messages.sender", "name email profilePhoto role")
// // // // // //       .populate("lastMessageSender", "name");

// // // // // //     if (!chat) {
// // // // // //       return res
// // // // // //         .status(404)
// // // // // //         .json({ success: false, message: "Chat not found" });
// // // // // //     }

// // // // // //     // Check if user is participant
// // // // // //     if (!chat.participants.some((p) => p._id.toString() === userId)) {
// // // // // //       return res.status(403).json({ success: false, message: "Unauthorized" });
// // // // // //     }

// // // // // //     res.status(200).json({
// // // // // //       success: true,
// // // // // //       data: chat,
// // // // // //     });
// // // // // //   } catch (error) {
// // // // // //     console.error("Error getting chat:", error);
// // // // // //     res.status(500).json({ success: false, message: error.message });
// // // // // //   }
// // // // // // };

// // // // // // // Get user's all chats
// // // // // // export const getUserChats = async (req, res) => {
// // // // // //   try {
// // // // // //     const userId = req.user.id;

// // // // // //     const chats = await Chat.find({
// // // // // //       participants: userId,
// // // // // //       isActive: true,
// // // // // //     })
// // // // // //       .populate("participants", "name email profilePhoto role")
// // // // // //       .populate("lastMessageSender", "name")
// // // // // //       .sort({ updatedAt: -1 });

// // // // // //     res.status(200).json({
// // // // // //       success: true,
// // // // // //       data: chats,
// // // // // //     });
// // // // // //   } catch (error) {
// // // // // //     console.error("Error getting user chats:", error);
// // // // // //     res.status(500).json({ success: false, message: error.message });
// // // // // //   }
// // // // // // };

// // // // // // // Mark messages as read
// // // // // // export const markMessagesAsRead = async (req, res) => {
// // // // // //   try {
// // // // // //     const { chatId } = req.params;
// // // // // //     const userId = req.user.id;

// // // // // //     const chat = await Chat.findById(chatId);
// // // // // //     if (!chat) {
// // // // // //       return res
// // // // // //         .status(404)
// // // // // //         .json({ success: false, message: "Chat not found" });
// // // // // //     }

// // // // // //     // Mark all unread messages from others as read
// // // // // //     let updated = false;
// // // // // //     chat.messages.forEach((message) => {
// // // // // //       if (message.sender.toString() !== userId && !message.read) {
// // // // // //         message.read = true;
// // // // // //         message.readAt = new Date();
// // // // // //         updated = true;
// // // // // //       }
// // // // // //     });

// // // // // //     // Reset unread count for this user
// // // // // //     chat.unreadCounts.set(userId.toString(), 0);

// // // // // //     if (updated) {
// // // // // //       await chat.save();
// // // // // //     }

// // // // // //     res.status(200).json({
// // // // // //       success: true,
// // // // // //       message: "Messages marked as read",
// // // // // //     });
// // // // // //   } catch (error) {
// // // // // //     console.error("Error marking messages as read:", error);
// // // // // //     res.status(500).json({ success: false, message: error.message });
// // // // // //   }
// // // // // // };

// // // // // // // Get unread count for user
// // // // // // export const getUnreadCount = async (req, res) => {
// // // // // //   try {
// // // // // //     const userId = req.user.id;

// // // // // //     const chats = await Chat.find({
// // // // // //       participants: userId,
// // // // // //       isActive: true,
// // // // // //     });

// // // // // //     let totalUnread = 0;
// // // // // //     chats.forEach((chat) => {
// // // // // //       totalUnread += chat.unreadCounts.get(userId.toString()) || 0;
// // // // // //     });

// // // // // //     res.status(200).json({
// // // // // //       success: true,
// // // // // //       unreadCount: totalUnread,
// // // // // //     });
// // // // // //   } catch (error) {
// // // // // //     console.error("Error getting unread count:", error);
// // // // // //     res.status(500).json({ success: false, message: error.message });
// // // // // //   }
// // // // // // };

// // // // // // // Close chat (admin only)
// // // // // // export const closeChat = async (req, res) => {
// // // // // //   try {
// // // // // //     const { chatId } = req.params;
// // // // // //     const userId = req.user.id;
// // // // // //     const isAdmin = req.user.role === "admin";

// // // // // //     const chat = await Chat.findById(chatId);
// // // // // //     if (!chat) {
// // // // // //       return res
// // // // // //         .status(404)
// // // // // //         .json({ success: false, message: "Chat not found" });
// // // // // //     }

// // // // // //     if (!isAdmin) {
// // // // // //       return res
// // // // // //         .status(403)
// // // // // //         .json({ success: false, message: "Only admins can close chats" });
// // // // // //     }

// // // // // //     chat.isActive = false;
// // // // // //     chat.closedBy = userId;
// // // // // //     chat.closedAt = new Date();
// // // // // //     await chat.save();

// // // // // //     res.status(200).json({
// // // // // //       success: true,
// // // // // //       message: "Chat closed successfully",
// // // // // //     });
// // // // // //   } catch (error) {
// // // // // //     console.error("Error closing chat:", error);
// // // // // //     res.status(500).json({ success: false, message: error.message });
// // // // // //   }
// // // // // // };

// // // // // // // Send message - FIXED: No duplicate saving
// // // // // // export const sendMessage = async (req, res) => {
// // // // // //   try {
// // // // // //     const { chatId } = req.params;
// // // // // //     const { message } = req.body;
// // // // // //     const userId = req.user.id;

// // // // // //     const chat = await Chat.findById(chatId);
// // // // // //     if (!chat) {
// // // // // //       return res
// // // // // //         .status(404)
// // // // // //         .json({ success: false, message: "Chat not found" });
// // // // // //     }

// // // // // //     // Check if user is participant
// // // // // //     if (!chat.participants.includes(userId)) {
// // // // // //       return res.status(403).json({ success: false, message: "Unauthorized" });
// // // // // //     }

// // // // // //     // Determine sender type
// // // // // //     let senderType = "user";
// // // // // //     if (req.user.role === "admin") {
// // // // // //       senderType = "admin";
// // // // // //     } else if (chat.chatType === "vehicle") {
// // // // // //       // Check if this user is the vehicle owner
// // // // // //       const isOwner =
// // // // // //         chat.participants.length === 2 &&
// // // // // //         chat.participants[0].toString() === userId;
// // // // // //       if (isOwner) {
// // // // // //         senderType = "owner";
// // // // // //       }
// // // // // //     }

// // // // // //     const newMessage = {
// // // // // //       sender: userId,
// // // // // //       senderType,
// // // // // //       message: message.trim(),
// // // // // //       read: false,
// // // // // //       delivered: true,
// // // // // //       createdAt: new Date(),
// // // // // //     };

// // // // // //     chat.messages.push(newMessage);
// // // // // //     chat.lastMessage = message.trim();
// // // // // //     chat.lastMessageAt = new Date();
// // // // // //     chat.lastMessageSender = userId;

// // // // // //     // Update unread counts for other participants
// // // // // //     for (const participantId of chat.participants) {
// // // // // //       if (participantId.toString() !== userId) {
// // // // // //         const currentUnread =
// // // // // //           chat.unreadCounts?.get(participantId.toString()) || 0;
// // // // // //         chat.unreadCounts.set(participantId.toString(), currentUnread + 1);
// // // // // //       }
// // // // // //     }

// // // // // //     await chat.save();

// // // // // //     // Get sender details
// // // // // //     const sender = await User.findById(userId).select(
// // // // // //       "name email profilePhoto role",
// // // // // //     );

// // // // // //     const messageToReturn = {
// // // // // //       _id: chat.messages[chat.messages.length - 1]._id,
// // // // // //       message: newMessage.message,
// // // // // //       senderType: newMessage.senderType,
// // // // // //       read: newMessage.read,
// // // // // //       delivered: newMessage.delivered,
// // // // // //       createdAt: newMessage.createdAt,
// // // // // //       sender: {
// // // // // //         _id: userId,
// // // // // //         name: sender.name,
// // // // // //         email: sender.email,
// // // // // //         profilePhoto: sender.profilePhoto,
// // // // // //         role: sender.role,
// // // // // //       },
// // // // // //     };

// // // // // //     // Emit via Socket.IO - ONLY emit, don't save again
// // // // // //     const io = req.app.get("io");
// // // // // //     if (io) {
// // // // // //       io.to(`chat_${chatId}`).emit("new_message", {
// // // // // //         chatId,
// // // // // //         message: messageToReturn,
// // // // // //       });

// // // // // //       // Send notifications to other participants
// // // // // //       for (const participantId of chat.participants) {
// // // // // //         if (participantId.toString() !== userId) {
// // // // // //           io.to(`user_${participantId}`).emit("new_message_notification", {
// // // // // //             chatId,
// // // // // //             from: sender.name,
// // // // // //             message: message.substring(0, 100),
// // // // // //           });
// // // // // //         }
// // // // // //       }
// // // // // //     }

// // // // // //     res.status(200).json({
// // // // // //       success: true,
// // // // // //       message: "Message sent successfully",
// // // // // //       data: messageToReturn,
// // // // // //     });
// // // // // //   } catch (error) {
// // // // // //     console.error("Error sending message:", error);
// // // // // //     res.status(500).json({ success: false, message: error.message });
// // // // // //   }
// // // // // // };

// // // // // // // Block user in chat
// // // // // // export const blockUser = async (req, res) => {
// // // // // //   try {
// // // // // //     const { chatId } = req.params;
// // // // // //     const userId = req.user.id;

// // // // // //     const chat = await Chat.findById(chatId);
// // // // // //     if (!chat) {
// // // // // //       return res
// // // // // //         .status(404)
// // // // // //         .json({ success: false, message: "Chat not found" });
// // // // // //     }

// // // // // //     if (!chat.participants.includes(userId)) {
// // // // // //       return res.status(403).json({ success: false, message: "Unauthorized" });
// // // // // //     }

// // // // // //     chat.isBlocked = true;
// // // // // //     chat.blockedBy = userId;
// // // // // //     chat.blockedAt = new Date();
// // // // // //     await chat.save();

// // // // // //     const io = req.app.get("io");
// // // // // //     if (io) {
// // // // // //       io.to(`chat_${chatId}`).emit("user_blocked", {
// // // // // //         chatId,
// // // // // //         blockedBy: userId,
// // // // // //       });
// // // // // //     }

// // // // // //     res
// // // // // //       .status(200)
// // // // // //       .json({ success: true, message: "User blocked successfully" });
// // // // // //   } catch (error) {
// // // // // //     console.error("Error blocking user:", error);
// // // // // //     res.status(500).json({ success: false, message: error.message });
// // // // // //   }
// // // // // // };

// // // // // // // Unblock user
// // // // // // export const unblockUser = async (req, res) => {
// // // // // //   try {
// // // // // //     const { chatId } = req.params;
// // // // // //     const userId = req.user.id;

// // // // // //     const chat = await Chat.findById(chatId);
// // // // // //     if (!chat) {
// // // // // //       return res
// // // // // //         .status(404)
// // // // // //         .json({ success: false, message: "Chat not found" });
// // // // // //     }

// // // // // //     chat.isBlocked = false;
// // // // // //     chat.blockedBy = null;
// // // // // //     chat.blockedAt = null;
// // // // // //     await chat.save();

// // // // // //     res
// // // // // //       .status(200)
// // // // // //       .json({ success: true, message: "User unblocked successfully" });
// // // // // //   } catch (error) {
// // // // // //     console.error("Error unblocking user:", error);
// // // // // //     res.status(500).json({ success: false, message: error.message });
// // // // // //   }
// // // // // // };

// // // // // import Chat from "../models/Chat.js";
// // // // // import User from "../models/User.js";
// // // // // import UserVehicle from "../models/UserVehicle.js";
// // // // // import Vehicle from "../models/Vehicle.js";
// // // // // import Booking from "../models/Booking.js";
// // // // // import { createNotification } from "../utils/notificationHelper.js";

// // // // // // Get or create chat between user and vehicle owner
// // // // // export const getOrCreateVehicleChat = async (req, res) => {
// // // // //   try {
// // // // //     const { vehicleId, vehicleType } = req.body;
// // // // //     const userId = req.user.id;

// // // // //     let ownerId = null;
// // // // //     let vehicleName = "";
// // // // //     let vehicleData = null;

// // // // //     if (vehicleType === "user") {
// // // // //       const userVehicle = await UserVehicle.findById(vehicleId);
// // // // //       if (!userVehicle) {
// // // // //         return res.status(404).json({ success: false, message: "Vehicle not found" });
// // // // //       }
// // // // //       ownerId = userVehicle.user;
// // // // //       vehicleName = userVehicle.carName;
// // // // //       vehicleData = userVehicle;
// // // // //     } else {
// // // // //       const adminVehicle = await Vehicle.findById(vehicleId);
// // // // //       if (!adminVehicle) {
// // // // //         return res.status(404).json({ success: false, message: "Vehicle not found" });
// // // // //       }
// // // // //       vehicleName = adminVehicle.carName;
// // // // //       vehicleData = adminVehicle;
// // // // //       const adminUser = await User.findOne({ role: "admin" });
// // // // //       if (adminUser) {
// // // // //         ownerId = adminUser._id;
// // // // //       }
// // // // //     }

// // // // //     if (!ownerId) {
// // // // //       return res.status(404).json({ success: false, message: "No owner/admin found" });
// // // // //     }

// // // // //     let chat = await Chat.findOne({
// // // // //       chatType: "vehicle",
// // // // //       participants: { $all: [userId, ownerId] },
// // // // //       vehicleId: vehicleId,
// // // // //       isActive: true,
// // // // //     }).populate("participants", "name email profilePhoto role");

// // // // //     if (!chat) {
// // // // //       chat = new Chat({
// // // // //         chatType: "vehicle",
// // // // //         participants: [userId, ownerId],
// // // // //         vehicleId: vehicleId,
// // // // //         vehicleModel: vehicleType === "user" ? "UserVehicle" : "Vehicle",
// // // // //         vehicleName: vehicleName,
// // // // //         title: `Chat about ${vehicleName}`,
// // // // //         messages: [],
// // // // //         unreadCounts: new Map([
// // // // //           [userId.toString(), 0],
// // // // //           [ownerId.toString(), 0],
// // // // //         ]),
// // // // //       });
// // // // //       await chat.save();
// // // // //       await chat.populate("participants", "name email profilePhoto role");
// // // // //     } else {
// // // // //       if (!chat.vehicleName && vehicleName) {
// // // // //         chat.vehicleName = vehicleName;
// // // // //         await chat.save();
// // // // //       }
// // // // //     }

// // // // //     res.status(200).json({
// // // // //       success: true,
// // // // //       data: chat,
// // // // //     });
// // // // //   } catch (error) {
// // // // //     console.error("Error getting vehicle chat:", error);
// // // // //     res.status(500).json({ success: false, message: error.message });
// // // // //   }
// // // // // };

// // // // // // Get or create support chat
// // // // // export const getOrCreateSupportChat = async (req, res) => {
// // // // //   try {
// // // // //     const userId = req.user.id;

// // // // //     let chat = await Chat.findOne({
// // // // //       chatType: "support",
// // // // //       participants: userId,
// // // // //       isActive: true,
// // // // //     }).populate("participants", "name email profilePhoto role");

// // // // //     if (!chat) {
// // // // //       const admins = await User.find({ role: "admin" }).select("_id");
// // // // //       const adminIds = admins.map((a) => a._id);
// // // // //       const participants = [userId, ...adminIds];

// // // // //       const unreadCounts = new Map();
// // // // //       participants.forEach((p) => {
// // // // //         unreadCounts.set(p.toString(), 0);
// // // // //       });

// // // // //       chat = new Chat({
// // // // //         chatType: "support",
// // // // //         participants: participants,
// // // // //         title: "Support Chat",
// // // // //         messages: [],
// // // // //         unreadCounts: unreadCounts,
// // // // //       });
// // // // //       await chat.save();
// // // // //       await chat.populate("participants", "name email profilePhoto role");
// // // // //     }

// // // // //     res.status(200).json({
// // // // //       success: true,
// // // // //       data: chat,
// // // // //     });
// // // // //   } catch (error) {
// // // // //     console.error("Error getting support chat:", error);
// // // // //     res.status(500).json({ success: false, message: error.message });
// // // // //   }
// // // // // };

// // // // // // Get chat by ID
// // // // // export const getChatById = async (req, res) => {
// // // // //   try {
// // // // //     const { chatId } = req.params;
// // // // //     const userId = req.user.id;

// // // // //     const chat = await Chat.findById(chatId)
// // // // //       .populate("participants", "name email profilePhoto role")
// // // // //       .populate("messages.sender", "name email profilePhoto role")
// // // // //       .populate("lastMessageSender", "name");

// // // // //     if (!chat) {
// // // // //       return res.status(404).json({ success: false, message: "Chat not found" });
// // // // //     }

// // // // //     if (!chat.participants.some((p) => p._id.toString() === userId)) {
// // // // //       return res.status(403).json({ success: false, message: "Unauthorized" });
// // // // //     }

// // // // //     res.status(200).json({
// // // // //       success: true,
// // // // //       data: chat,
// // // // //     });
// // // // //   } catch (error) {
// // // // //     console.error("Error getting chat:", error);
// // // // //     res.status(500).json({ success: false, message: error.message });
// // // // //   }
// // // // // };

// // // // // // Get user's all chats
// // // // // export const getUserChats = async (req, res) => {
// // // // //   try {
// // // // //     const userId = req.user.id;

// // // // //     const chats = await Chat.find({
// // // // //       participants: userId,
// // // // //       isActive: true,
// // // // //     })
// // // // //       .populate("participants", "name email profilePhoto role")
// // // // //       .populate("lastMessageSender", "name")
// // // // //       .sort({ updatedAt: -1 });

// // // // //     res.status(200).json({
// // // // //       success: true,
// // // // //       data: chats,
// // // // //     });
// // // // //   } catch (error) {
// // // // //     console.error("Error getting user chats:", error);
// // // // //     res.status(500).json({ success: false, message: error.message });
// // // // //   }
// // // // // };

// // // // // // Mark messages as read
// // // // // export const markMessagesAsRead = async (req, res) => {
// // // // //   try {
// // // // //     const { chatId } = req.params;
// // // // //     const userId = req.user.id;

// // // // //     const chat = await Chat.findById(chatId);
// // // // //     if (!chat) {
// // // // //       return res.status(404).json({ success: false, message: "Chat not found" });
// // // // //     }

// // // // //     let updated = false;
// // // // //     chat.messages.forEach((message) => {
// // // // //       if (message.sender.toString() !== userId && !message.read) {
// // // // //         message.read = true;
// // // // //         message.readAt = new Date();
// // // // //         updated = true;
// // // // //       }
// // // // //     });

// // // // //     chat.unreadCounts.set(userId.toString(), 0);

// // // // //     if (updated) {
// // // // //       await chat.save();
// // // // //     }

// // // // //     res.status(200).json({
// // // // //       success: true,
// // // // //       message: "Messages marked as read",
// // // // //     });
// // // // //   } catch (error) {
// // // // //     console.error("Error marking messages as read:", error);
// // // // //     res.status(500).json({ success: false, message: error.message });
// // // // //   }
// // // // // };

// // // // // // Get unread count for user
// // // // // export const getUnreadCount = async (req, res) => {
// // // // //   try {
// // // // //     const userId = req.user.id;

// // // // //     const chats = await Chat.find({
// // // // //       participants: userId,
// // // // //       isActive: true,
// // // // //     });

// // // // //     let totalUnread = 0;
// // // // //     chats.forEach((chat) => {
// // // // //       totalUnread += chat.unreadCounts.get(userId.toString()) || 0;
// // // // //     });

// // // // //     res.status(200).json({
// // // // //       success: true,
// // // // //       unreadCount: totalUnread,
// // // // //     });
// // // // //   } catch (error) {
// // // // //     console.error("Error getting unread count:", error);
// // // // //     res.status(500).json({ success: false, message: error.message });
// // // // //   }
// // // // // };

// // // // // // Close chat (admin only)
// // // // // export const closeChat = async (req, res) => {
// // // // //   try {
// // // // //     const { chatId } = req.params;
// // // // //     const userId = req.user.id;
// // // // //     const isAdmin = req.user.role === "admin";

// // // // //     const chat = await Chat.findById(chatId);
// // // // //     if (!chat) {
// // // // //       return res.status(404).json({ success: false, message: "Chat not found" });
// // // // //     }

// // // // //     if (!isAdmin) {
// // // // //       return res.status(403).json({ success: false, message: "Only admins can close chats" });
// // // // //     }

// // // // //     chat.isActive = false;
// // // // //     chat.closedBy = userId;
// // // // //     chat.closedAt = new Date();
// // // // //     await chat.save();

// // // // //     res.status(200).json({
// // // // //       success: true,
// // // // //       message: "Chat closed successfully",
// // // // //     });
// // // // //   } catch (error) {
// // // // //     console.error("Error closing chat:", error);
// // // // //     res.status(500).json({ success: false, message: error.message });
// // // // //   }
// // // // // };

// // // // // // Send message
// // // // // export const sendMessage = async (req, res) => {
// // // // //   try {
// // // // //     const { chatId } = req.params;
// // // // //     const { message } = req.body;
// // // // //     const userId = req.user.id;

// // // // //     const chat = await Chat.findById(chatId);
// // // // //     if (!chat) {
// // // // //       return res.status(404).json({ success: false, message: "Chat not found" });
// // // // //     }

// // // // //     if (!chat.participants.includes(userId)) {
// // // // //       return res.status(403).json({ success: false, message: "Unauthorized" });
// // // // //     }

// // // // //     let senderType = "user";
// // // // //     if (req.user.role === "admin") {
// // // // //       senderType = "admin";
// // // // //     } else if (chat.chatType === "vehicle") {
// // // // //       const isOwner = chat.participants.length === 2 && chat.participants[0].toString() === userId;
// // // // //       if (isOwner) {
// // // // //         senderType = "owner";
// // // // //       }
// // // // //     }

// // // // //     const newMessage = {
// // // // //       sender: userId,
// // // // //       senderType,
// // // // //       message: message.trim(),
// // // // //       read: false,
// // // // //       delivered: true,
// // // // //       createdAt: new Date(),
// // // // //     };

// // // // //     chat.messages.push(newMessage);
// // // // //     chat.lastMessage = message.trim();
// // // // //     chat.lastMessageAt = new Date();
// // // // //     chat.lastMessageSender = userId;

// // // // //     for (const participantId of chat.participants) {
// // // // //       if (participantId.toString() !== userId) {
// // // // //         const currentUnread = chat.unreadCounts?.get(participantId.toString()) || 0;
// // // // //         chat.unreadCounts.set(participantId.toString(), currentUnread + 1);
// // // // //       }
// // // // //     }

// // // // //     await chat.save();

// // // // //     const sender = await User.findById(userId).select("name email profilePhoto role");

// // // // //     const messageToReturn = {
// // // // //       _id: chat.messages[chat.messages.length - 1]._id,
// // // // //       message: newMessage.message,
// // // // //       senderType: newMessage.senderType,
// // // // //       read: newMessage.read,
// // // // //       delivered: newMessage.delivered,
// // // // //       createdAt: newMessage.createdAt,
// // // // //       sender: {
// // // // //         _id: userId,
// // // // //         name: sender.name,
// // // // //         email: sender.email,
// // // // //         profilePhoto: sender.profilePhoto,
// // // // //         role: sender.role,
// // // // //       },
// // // // //     };

// // // // //     const io = req.app.get("io");
// // // // //     if (io) {
// // // // //       io.to(`chat_${chatId}`).emit("new_message", {
// // // // //         chatId,
// // // // //         message: messageToReturn,
// // // // //       });

// // // // //       for (const participantId of chat.participants) {
// // // // //         if (participantId.toString() !== userId) {
// // // // //           io.to(`user_${participantId}`).emit("new_message_notification", {
// // // // //             chatId,
// // // // //             from: sender.name,
// // // // //             message: message.substring(0, 100),
// // // // //             chatType: chat.chatType,
// // // // //             vehicleName: chat.vehicleName,
// // // // //           });
// // // // //         }
// // // // //       }
// // // // //     }

// // // // //     res.status(200).json({
// // // // //       success: true,
// // // // //       message: "Message sent successfully",
// // // // //       data: messageToReturn,
// // // // //     });
// // // // //   } catch (error) {
// // // // //     console.error("Error sending message:", error);
// // // // //     res.status(500).json({ success: false, message: error.message });
// // // // //   }
// // // // // };

// // // // // // Block user in chat
// // // // // export const blockUser = async (req, res) => {
// // // // //   try {
// // // // //     const { chatId } = req.params;
// // // // //     const userId = req.user.id;

// // // // //     const chat = await Chat.findById(chatId);
// // // // //     if (!chat) {
// // // // //       return res.status(404).json({ success: false, message: "Chat not found" });
// // // // //     }

// // // // //     if (!chat.participants.includes(userId)) {
// // // // //       return res.status(403).json({ success: false, message: "Unauthorized" });
// // // // //     }

// // // // //     chat.isBlocked = true;
// // // // //     chat.blockedBy = userId;
// // // // //     chat.blockedAt = new Date();
// // // // //     await chat.save();

// // // // //     const io = req.app.get("io");
// // // // //     if (io) {
// // // // //       io.to(`chat_${chatId}`).emit("user_blocked", { chatId, blockedBy: userId });
// // // // //     }

// // // // //     res.status(200).json({ success: true, message: "User blocked successfully" });
// // // // //   } catch (error) {
// // // // //     console.error("Error blocking user:", error);
// // // // //     res.status(500).json({ success: false, message: error.message });
// // // // //   }
// // // // // };

// // // // // // Unblock user
// // // // // export const unblockUser = async (req, res) => {
// // // // //   try {
// // // // //     const { chatId } = req.params;
// // // // //     const userId = req.user.id;

// // // // //     const chat = await Chat.findById(chatId);
// // // // //     if (!chat) {
// // // // //       return res.status(404).json({ success: false, message: "Chat not found" });
// // // // //     }

// // // // //     chat.isBlocked = false;
// // // // //     chat.blockedBy = null;
// // // // //     chat.blockedAt = null;
// // // // //     await chat.save();

// // // // //     res.status(200).json({ success: true, message: "User unblocked successfully" });
// // // // //   } catch (error) {
// // // // //     console.error("Error unblocking user:", error);
// // // // //     res.status(500).json({ success: false, message: error.message });
// // // // //   }
// // // // // };

// // // // import Chat from "../models/Chat.js";
// // // // import User from "../models/User.js";
// // // // import UserVehicle from "../models/UserVehicle.js";
// // // // import Vehicle from "../models/Vehicle.js";
// // // // import Booking from "../models/Booking.js";
// // // // import { createNotification } from "../utils/notificationHelper.js";

// // // // // Get or create chat between user and vehicle owner
// // // // export const getOrCreateVehicleChat = async (req, res) => {
// // // //   try {
// // // //     const { vehicleId, vehicleType } = req.body;
// // // //     const userId = req.user.id;

// // // //     let ownerId = null;
// // // //     let vehicleName = "";
// // // //     let vehicleData = null;

// // // //     if (vehicleType === "user") {
// // // //       const userVehicle = await UserVehicle.findById(vehicleId);
// // // //       if (!userVehicle) {
// // // //         return res
// // // //           .status(404)
// // // //           .json({ success: false, message: "Vehicle not found" });
// // // //       }
// // // //       ownerId = userVehicle.user;
// // // //       vehicleName = userVehicle.carName;
// // // //       vehicleData = userVehicle;
// // // //     } else {
// // // //       const adminVehicle = await Vehicle.findById(vehicleId);
// // // //       if (!adminVehicle) {
// // // //         return res
// // // //           .status(404)
// // // //           .json({ success: false, message: "Vehicle not found" });
// // // //       }
// // // //       vehicleName = adminVehicle.carName;
// // // //       vehicleData = adminVehicle;
// // // //       const adminUser = await User.findOne({ role: "admin" });
// // // //       if (adminUser) {
// // // //         ownerId = adminUser._id;
// // // //       }
// // // //     }

// // // //     if (!ownerId) {
// // // //       return res
// // // //         .status(404)
// // // //         .json({ success: false, message: "No owner/admin found" });
// // // //     }

// // // //     let chat = await Chat.findOne({
// // // //       chatType: "vehicle",
// // // //       participants: { $all: [userId, ownerId] },
// // // //       vehicleId: vehicleId,
// // // //       isActive: true,
// // // //     }).populate("participants", "name email profilePhoto role");

// // // //     if (!chat) {
// // // //       chat = new Chat({
// // // //         chatType: "vehicle",
// // // //         participants: [userId, ownerId],
// // // //         vehicleId: vehicleId,
// // // //         vehicleModel: vehicleType === "user" ? "UserVehicle" : "Vehicle",
// // // //         vehicleName: vehicleName,
// // // //         title: `Chat about ${vehicleName}`,
// // // //         messages: [],
// // // //         unreadCounts: new Map([
// // // //           [userId.toString(), 0],
// // // //           [ownerId.toString(), 0],
// // // //         ]),
// // // //       });
// // // //       await chat.save();
// // // //       await chat.populate("participants", "name email profilePhoto role");
// // // //     } else {
// // // //       if (!chat.vehicleName && vehicleName) {
// // // //         chat.vehicleName = vehicleName;
// // // //         await chat.save();
// // // //       }
// // // //     }

// // // //     res.status(200).json({
// // // //       success: true,
// // // //       data: chat,
// // // //     });
// // // //   } catch (error) {
// // // //     console.error("Error getting vehicle chat:", error);
// // // //     res.status(500).json({ success: false, message: error.message });
// // // //   }
// // // // };

// // // // // Get or create support chat
// // // // export const getOrCreateSupportChat = async (req, res) => {
// // // //   try {
// // // //     const userId = req.user.id;

// // // //     let chat = await Chat.findOne({
// // // //       chatType: "support",
// // // //       participants: userId,
// // // //       isActive: true,
// // // //     }).populate("participants", "name email profilePhoto role");

// // // //     if (!chat) {
// // // //       const admins = await User.find({ role: "admin" }).select("_id");
// // // //       const adminIds = admins.map((a) => a._id);
// // // //       const participants = [userId, ...adminIds];

// // // //       const unreadCounts = new Map();
// // // //       participants.forEach((p) => {
// // // //         unreadCounts.set(p.toString(), 0);
// // // //       });

// // // //       chat = new Chat({
// // // //         chatType: "support",
// // // //         participants: participants,
// // // //         title: "Support Chat",
// // // //         messages: [],
// // // //         unreadCounts: unreadCounts,
// // // //       });
// // // //       await chat.save();
// // // //       await chat.populate("participants", "name email profilePhoto role");
// // // //     }

// // // //     res.status(200).json({
// // // //       success: true,
// // // //       data: chat,
// // // //     });
// // // //   } catch (error) {
// // // //     console.error("Error getting support chat:", error);
// // // //     res.status(500).json({ success: false, message: error.message });
// // // //   }
// // // // };

// // // // // Get chat by ID
// // // // export const getChatById = async (req, res) => {
// // // //   try {
// // // //     const { chatId } = req.params;
// // // //     const userId = req.user.id;

// // // //     const chat = await Chat.findById(chatId)
// // // //       .populate("participants", "name email profilePhoto role")
// // // //       .populate("messages.sender", "name email profilePhoto role")
// // // //       .populate("lastMessageSender", "name");

// // // //     if (!chat) {
// // // //       return res
// // // //         .status(404)
// // // //         .json({ success: false, message: "Chat not found" });
// // // //     }

// // // //     if (!chat.participants.some((p) => p._id.toString() === userId)) {
// // // //       return res.status(403).json({ success: false, message: "Unauthorized" });
// // // //     }

// // // //     res.status(200).json({
// // // //       success: true,
// // // //       data: chat,
// // // //     });
// // // //   } catch (error) {
// // // //     console.error("Error getting chat:", error);
// // // //     res.status(500).json({ success: false, message: error.message });
// // // //   }
// // // // };

// // // // // Get user's all chats
// // // // export const getUserChats = async (req, res) => {
// // // //   try {
// // // //     const userId = req.user.id;

// // // //     const chats = await Chat.find({
// // // //       participants: userId,
// // // //       isActive: true,
// // // //     })
// // // //       .populate("participants", "name email profilePhoto role")
// // // //       .populate("lastMessageSender", "name")
// // // //       .sort({ updatedAt: -1 });

// // // //     res.status(200).json({
// // // //       success: true,
// // // //       data: chats,
// // // //     });
// // // //   } catch (error) {
// // // //     console.error("Error getting user chats:", error);
// // // //     res.status(500).json({ success: false, message: error.message });
// // // //   }
// // // // };

// // // // // Mark messages as read
// // // // export const markMessagesAsRead = async (req, res) => {
// // // //   try {
// // // //     const { chatId } = req.params;
// // // //     const userId = req.user.id;

// // // //     const chat = await Chat.findById(chatId);
// // // //     if (!chat) {
// // // //       return res
// // // //         .status(404)
// // // //         .json({ success: false, message: "Chat not found" });
// // // //     }

// // // //     let updated = false;
// // // //     chat.messages.forEach((message) => {
// // // //       if (message.sender.toString() !== userId && !message.read) {
// // // //         message.read = true;
// // // //         message.readAt = new Date();
// // // //         updated = true;
// // // //       }
// // // //     });

// // // //     chat.unreadCounts.set(userId.toString(), 0);

// // // //     if (updated) {
// // // //       await chat.save();
// // // //     }

// // // //     res.status(200).json({
// // // //       success: true,
// // // //       message: "Messages marked as read",
// // // //     });
// // // //   } catch (error) {
// // // //     console.error("Error marking messages as read:", error);
// // // //     res.status(500).json({ success: false, message: error.message });
// // // //   }
// // // // };

// // // // // Get unread count for user
// // // // export const getUnreadCount = async (req, res) => {
// // // //   try {
// // // //     const userId = req.user.id;

// // // //     const chats = await Chat.find({
// // // //       participants: userId,
// // // //       isActive: true,
// // // //     });

// // // //     let totalUnread = 0;
// // // //     chats.forEach((chat) => {
// // // //       totalUnread += chat.unreadCounts.get(userId.toString()) || 0;
// // // //     });

// // // //     res.status(200).json({
// // // //       success: true,
// // // //       unreadCount: totalUnread,
// // // //     });
// // // //   } catch (error) {
// // // //     console.error("Error getting unread count:", error);
// // // //     res.status(500).json({ success: false, message: error.message });
// // // //   }
// // // // };

// // // // // Close chat (admin only)
// // // // export const closeChat = async (req, res) => {
// // // //   try {
// // // //     const { chatId } = req.params;
// // // //     const userId = req.user.id;
// // // //     const isAdmin = req.user.role === "admin";

// // // //     const chat = await Chat.findById(chatId);
// // // //     if (!chat) {
// // // //       return res
// // // //         .status(404)
// // // //         .json({ success: false, message: "Chat not found" });
// // // //     }

// // // //     if (!isAdmin) {
// // // //       return res
// // // //         .status(403)
// // // //         .json({ success: false, message: "Only admins can close chats" });
// // // //     }

// // // //     chat.isActive = false;
// // // //     chat.closedBy = userId;
// // // //     chat.closedAt = new Date();
// // // //     await chat.save();

// // // //     res.status(200).json({
// // // //       success: true,
// // // //       message: "Chat closed successfully",
// // // //     });
// // // //   } catch (error) {
// // // //     console.error("Error closing chat:", error);
// // // //     res.status(500).json({ success: false, message: error.message });
// // // //   }
// // // // };

// // // // // Send message - FIXED: Correctly identify sender type
// // // // export const sendMessage = async (req, res) => {
// // // //   try {
// // // //     const { chatId } = req.params;
// // // //     const { message } = req.body;
// // // //     const userId = req.user.id;

// // // //     const chat = await Chat.findById(chatId);
// // // //     if (!chat) {
// // // //       return res
// // // //         .status(404)
// // // //         .json({ success: false, message: "Chat not found" });
// // // //     }

// // // //     if (!chat.participants.includes(userId)) {
// // // //       return res.status(403).json({ success: false, message: "Unauthorized" });
// // // //     }

// // // //     // Determine sender type correctly
// // // //     let senderType = "user";

// // // //     // If user is admin
// // // //     if (req.user.role === "admin") {
// // // //       senderType = "admin";
// // // //     }
// // // //     // For vehicle chats, check if this user is actually the vehicle owner
// // // //     else if (chat.chatType === "vehicle") {
// // // //       // Get the vehicle to check ownership
// // // //       if (chat.vehicleModel === "UserVehicle") {
// // // //         const vehicle = await UserVehicle.findById(chat.vehicleId);
// // // //         if (vehicle && vehicle.user.toString() === userId) {
// // // //           senderType = "owner";
// // // //         }
// // // //       } else if (chat.vehicleModel === "Vehicle") {
// // // //         // For admin vehicles, the admin is the "owner"
// // // //         const adminUser = await User.findOne({ role: "admin" });
// // // //         if (adminUser && adminUser._id.toString() === userId) {
// // // //           senderType = "owner";
// // // //         }
// // // //       }
// // // //     }

// // // //     const newMessage = {
// // // //       sender: userId,
// // // //       senderType,
// // // //       message: message.trim(),
// // // //       read: false,
// // // //       delivered: true,
// // // //       createdAt: new Date(),
// // // //     };

// // // //     chat.messages.push(newMessage);
// // // //     chat.lastMessage = message.trim();
// // // //     chat.lastMessageAt = new Date();
// // // //     chat.lastMessageSender = userId;

// // // //     // Update unread counts for other participants
// // // //     for (const participantId of chat.participants) {
// // // //       if (participantId.toString() !== userId) {
// // // //         const currentUnread =
// // // //           chat.unreadCounts?.get(participantId.toString()) || 0;
// // // //         chat.unreadCounts.set(participantId.toString(), currentUnread + 1);
// // // //       }
// // // //     }

// // // //     await chat.save();

// // // //     const sender = await User.findById(userId).select(
// // // //       "name email profilePhoto role",
// // // //     );

// // // //     const messageToReturn = {
// // // //       _id: chat.messages[chat.messages.length - 1]._id,
// // // //       message: newMessage.message,
// // // //       senderType: newMessage.senderType,
// // // //       read: newMessage.read,
// // // //       delivered: newMessage.delivered,
// // // //       createdAt: newMessage.createdAt,
// // // //       sender: {
// // // //         _id: userId,
// // // //         name: sender.name,
// // // //         email: sender.email,
// // // //         profilePhoto: sender.profilePhoto,
// // // //         role: sender.role,
// // // //       },
// // // //     };

// // // //     const io = req.app.get("io");
// // // //     if (io) {
// // // //       io.to(`chat_${chatId}`).emit("new_message", {
// // // //         chatId,
// // // //         message: messageToReturn,
// // // //       });

// // // //       for (const participantId of chat.participants) {
// // // //         if (participantId.toString() !== userId) {
// // // //           io.to(`user_${participantId}`).emit("new_message_notification", {
// // // //             chatId,
// // // //             from: sender.name,
// // // //             message: message.substring(0, 100),
// // // //             chatType: chat.chatType,
// // // //             vehicleName: chat.vehicleName,
// // // //           });
// // // //         }
// // // //       }
// // // //     }

// // // //     res.status(200).json({
// // // //       success: true,
// // // //       message: "Message sent successfully",
// // // //       data: messageToReturn,
// // // //     });
// // // //   } catch (error) {
// // // //     console.error("Error sending message:", error);
// // // //     res.status(500).json({ success: false, message: error.message });
// // // //   }
// // // // };

// // // // // Block user in chat
// // // // export const blockUser = async (req, res) => {
// // // //   try {
// // // //     const { chatId } = req.params;
// // // //     const userId = req.user.id;

// // // //     const chat = await Chat.findById(chatId);
// // // //     if (!chat) {
// // // //       return res
// // // //         .status(404)
// // // //         .json({ success: false, message: "Chat not found" });
// // // //     }

// // // //     if (!chat.participants.includes(userId)) {
// // // //       return res.status(403).json({ success: false, message: "Unauthorized" });
// // // //     }

// // // //     chat.isBlocked = true;
// // // //     chat.blockedBy = userId;
// // // //     chat.blockedAt = new Date();
// // // //     await chat.save();

// // // //     const io = req.app.get("io");
// // // //     if (io) {
// // // //       io.to(`chat_${chatId}`).emit("user_blocked", {
// // // //         chatId,
// // // //         blockedBy: userId,
// // // //       });
// // // //     }

// // // //     res
// // // //       .status(200)
// // // //       .json({ success: true, message: "User blocked successfully" });
// // // //   } catch (error) {
// // // //     console.error("Error blocking user:", error);
// // // //     res.status(500).json({ success: false, message: error.message });
// // // //   }
// // // // };

// // // // // Unblock user
// // // // export const unblockUser = async (req, res) => {
// // // //   try {
// // // //     const { chatId } = req.params;
// // // //     const userId = req.user.id;

// // // //     const chat = await Chat.findById(chatId);
// // // //     if (!chat) {
// // // //       return res
// // // //         .status(404)
// // // //         .json({ success: false, message: "Chat not found" });
// // // //     }

// // // //     chat.isBlocked = false;
// // // //     chat.blockedBy = null;
// // // //     chat.blockedAt = null;
// // // //     await chat.save();

// // // //     res
// // // //       .status(200)
// // // //       .json({ success: true, message: "User unblocked successfully" });
// // // //   } catch (error) {
// // // //     console.error("Error unblocking user:", error);
// // // //     res.status(500).json({ success: false, message: error.message });
// // // //   }
// // // // };

// // // import Chat from "../models/Chat.js";
// // // import User from "../models/User.js";
// // // import UserVehicle from "../models/UserVehicle.js";
// // // import Vehicle from "../models/Vehicle.js";
// // // import Booking from "../models/Booking.js";
// // // import { createNotification } from "../utils/notificationHelper.js";
// // // import multer from "multer";
// // // import path from "path";
// // // import fs from "fs";
// // // import { fileURLToPath } from "url";

// // // const __filename = fileURLToPath(import.meta.url);
// // // const __dirname = path.dirname(__filename);

// // // // Configure multer for chat attachments
// // // const storage = multer.diskStorage({
// // //   destination: (req, file, cb) => {
// // //     const uploadPath = path.join(__dirname, "../../uploads/chats");
// // //     if (!fs.existsSync(uploadPath)) {
// // //       fs.mkdirSync(uploadPath, { recursive: true });
// // //     }
// // //     cb(null, uploadPath);
// // //   },
// // //   filename: (req, file, cb) => {
// // //     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
// // //     cb(null, "chat-" + uniqueSuffix + path.extname(file.originalname));
// // //   },
// // // });

// // // const fileFilter = (req, file, cb) => {
// // //   const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
// // //   if (allowedTypes.includes(file.mimetype)) {
// // //     cb(null, true);
// // //   } else {
// // //     cb(new Error("Only image files are allowed"), false);
// // //   }
// // // };

// // // export const uploadChatImage = multer({
// // //   storage,
// // //   limits: { fileSize: 5 * 1024 * 1024 },
// // //   fileFilter,
// // // }).single("image");

// // // // Get or create chat between user and vehicle owner
// // // export const getOrCreateVehicleChat = async (req, res) => {
// // //   try {
// // //     const { vehicleId, vehicleType } = req.body;
// // //     const userId = req.user.id;

// // //     let ownerId = null;
// // //     let vehicleName = "";
// // //     let vehicleData = null;

// // //     if (vehicleType === "user") {
// // //       const userVehicle = await UserVehicle.findById(vehicleId);
// // //       if (!userVehicle) {
// // //         return res
// // //           .status(404)
// // //           .json({ success: false, message: "Vehicle not found" });
// // //       }
// // //       ownerId = userVehicle.user;
// // //       vehicleName = userVehicle.carName;
// // //       vehicleData = userVehicle;
// // //     } else {
// // //       const adminVehicle = await Vehicle.findById(vehicleId);
// // //       if (!adminVehicle) {
// // //         return res
// // //           .status(404)
// // //           .json({ success: false, message: "Vehicle not found" });
// // //       }
// // //       vehicleName = adminVehicle.carName;
// // //       vehicleData = adminVehicle;
// // //       const adminUser = await User.findOne({ role: "admin" });
// // //       if (adminUser) {
// // //         ownerId = adminUser._id;
// // //       }
// // //     }

// // //     if (!ownerId) {
// // //       return res
// // //         .status(404)
// // //         .json({ success: false, message: "No owner/admin found" });
// // //     }

// // //     let chat = await Chat.findOne({
// // //       chatType: "vehicle",
// // //       participants: { $all: [userId, ownerId] },
// // //       vehicleId: vehicleId,
// // //       isActive: true,
// // //     }).populate("participants", "name email profilePhoto role");

// // //     if (!chat) {
// // //       chat = new Chat({
// // //         chatType: "vehicle",
// // //         participants: [userId, ownerId],
// // //         vehicleId: vehicleId,
// // //         vehicleModel: vehicleType === "user" ? "UserVehicle" : "Vehicle",
// // //         vehicleName: vehicleName,
// // //         title: `Chat about ${vehicleName}`,
// // //         messages: [],
// // //         unreadCounts: new Map([
// // //           [userId.toString(), 0],
// // //           [ownerId.toString(), 0],
// // //         ]),
// // //       });
// // //       await chat.save();
// // //       await chat.populate("participants", "name email profilePhoto role");
// // //     } else {
// // //       if (!chat.vehicleName && vehicleName) {
// // //         chat.vehicleName = vehicleName;
// // //         await chat.save();
// // //       }
// // //     }

// // //     res.status(200).json({
// // //       success: true,
// // //       data: chat,
// // //     });
// // //   } catch (error) {
// // //     console.error("Error getting vehicle chat:", error);
// // //     res.status(500).json({ success: false, message: error.message });
// // //   }
// // // };

// // // // Get or create support chat
// // // export const getOrCreateSupportChat = async (req, res) => {
// // //   try {
// // //     const userId = req.user.id;

// // //     let chat = await Chat.findOne({
// // //       chatType: "support",
// // //       participants: userId,
// // //       isActive: true,
// // //     }).populate("participants", "name email profilePhoto role");

// // //     if (!chat) {
// // //       const admins = await User.find({ role: "admin" }).select("_id");
// // //       const adminIds = admins.map((a) => a._id);
// // //       const participants = [userId, ...adminIds];

// // //       const unreadCounts = new Map();
// // //       participants.forEach((p) => {
// // //         unreadCounts.set(p.toString(), 0);
// // //       });

// // //       chat = new Chat({
// // //         chatType: "support",
// // //         participants: participants,
// // //         title: "Support Chat",
// // //         messages: [],
// // //         unreadCounts: unreadCounts,
// // //       });
// // //       await chat.save();
// // //       await chat.populate("participants", "name email profilePhoto role");
// // //     }

// // //     res.status(200).json({
// // //       success: true,
// // //       data: chat,
// // //     });
// // //   } catch (error) {
// // //     console.error("Error getting support chat:", error);
// // //     res.status(500).json({ success: false, message: error.message });
// // //   }
// // // };

// // // // Get chat by ID
// // // export const getChatById = async (req, res) => {
// // //   try {
// // //     const { chatId } = req.params;
// // //     const userId = req.user.id;

// // //     const chat = await Chat.findById(chatId)
// // //       .populate("participants", "name email profilePhoto role")
// // //       .populate("messages.sender", "name email profilePhoto role")
// // //       .populate("lastMessageSender", "name");

// // //     if (!chat) {
// // //       return res
// // //         .status(404)
// // //         .json({ success: false, message: "Chat not found" });
// // //     }

// // //     if (!chat.participants.some((p) => p._id.toString() === userId)) {
// // //       return res.status(403).json({ success: false, message: "Unauthorized" });
// // //     }

// // //     res.status(200).json({
// // //       success: true,
// // //       data: chat,
// // //     });
// // //   } catch (error) {
// // //     console.error("Error getting chat:", error);
// // //     res.status(500).json({ success: false, message: error.message });
// // //   }
// // // };

// // // // Get user's all chats
// // // export const getUserChats = async (req, res) => {
// // //   try {
// // //     const userId = req.user.id;

// // //     const chats = await Chat.find({
// // //       participants: userId,
// // //       isActive: true,
// // //     })
// // //       .populate("participants", "name email profilePhoto role")
// // //       .populate("lastMessageSender", "name")
// // //       .sort({ updatedAt: -1 });

// // //     res.status(200).json({
// // //       success: true,
// // //       data: chats,
// // //     });
// // //   } catch (error) {
// // //     console.error("Error getting user chats:", error);
// // //     res.status(500).json({ success: false, message: error.message });
// // //   }
// // // };

// // // // Mark messages as read
// // // export const markMessagesAsRead = async (req, res) => {
// // //   try {
// // //     const { chatId } = req.params;
// // //     const userId = req.user.id;

// // //     const chat = await Chat.findById(chatId);
// // //     if (!chat) {
// // //       return res
// // //         .status(404)
// // //         .json({ success: false, message: "Chat not found" });
// // //     }

// // //     let updated = false;
// // //     chat.messages.forEach((message) => {
// // //       if (message.sender.toString() !== userId && !message.read) {
// // //         message.read = true;
// // //         message.readAt = new Date();
// // //         updated = true;
// // //       }
// // //     });

// // //     chat.unreadCounts.set(userId.toString(), 0);

// // //     if (updated) {
// // //       await chat.save();
// // //     }

// // //     res.status(200).json({
// // //       success: true,
// // //       message: "Messages marked as read",
// // //     });
// // //   } catch (error) {
// // //     console.error("Error marking messages as read:", error);
// // //     res.status(500).json({ success: false, message: error.message });
// // //   }
// // // };

// // // // Get unread count for user
// // // export const getUnreadCount = async (req, res) => {
// // //   try {
// // //     const userId = req.user.id;

// // //     const chats = await Chat.find({
// // //       participants: userId,
// // //       isActive: true,
// // //     });

// // //     let totalUnread = 0;
// // //     chats.forEach((chat) => {
// // //       totalUnread += chat.unreadCounts.get(userId.toString()) || 0;
// // //     });

// // //     res.status(200).json({
// // //       success: true,
// // //       unreadCount: totalUnread,
// // //     });
// // //   } catch (error) {
// // //     console.error("Error getting unread count:", error);
// // //     res.status(500).json({ success: false, message: error.message });
// // //   }
// // // };

// // // // Close chat (admin only)
// // // export const closeChat = async (req, res) => {
// // //   try {
// // //     const { chatId } = req.params;
// // //     const userId = req.user.id;
// // //     const isAdmin = req.user.role === "admin";

// // //     const chat = await Chat.findById(chatId);
// // //     if (!chat) {
// // //       return res
// // //         .status(404)
// // //         .json({ success: false, message: "Chat not found" });
// // //     }

// // //     if (!isAdmin) {
// // //       return res
// // //         .status(403)
// // //         .json({ success: false, message: "Only admins can close chats" });
// // //     }

// // //     chat.isActive = false;
// // //     chat.closedBy = userId;
// // //     chat.closedAt = new Date();
// // //     await chat.save();

// // //     res.status(200).json({
// // //       success: true,
// // //       message: "Chat closed successfully",
// // //     });
// // //   } catch (error) {
// // //     console.error("Error closing chat:", error);
// // //     res.status(500).json({ success: false, message: error.message });
// // //   }
// // // };

// // // // Send message with attachment support
// // // export const sendMessage = async (req, res) => {
// // //   try {
// // //     const { chatId } = req.params;
// // //     const { message } = req.body;
// // //     const userId = req.user.id;

// // //     const chat = await Chat.findById(chatId);
// // //     if (!chat) {
// // //       return res.status(404).json({ success: false, message: "Chat not found" });
// // //     }

// // //     if (!chat.participants.includes(userId)) {
// // //       return res.status(403).json({ success: false, message: "Unauthorized" });
// // //     }

// // //     let senderType = "user";
// // //     if (req.user.role === "admin") {
// // //       senderType = "admin";
// // //     } else if (chat.chatType === "vehicle") {
// // //       if (chat.vehicleModel === "UserVehicle") {
// // //         const vehicle = await UserVehicle.findById(chat.vehicleId);
// // //         if (vehicle && vehicle.user.toString() === userId) {
// // //           senderType = "owner";
// // //         }
// // //       }
// // //     }

// // //     const newMessage = {
// // //       sender: userId,
// // //       senderType,
// // //       message: message?.trim() || "",
// // //       read: false,
// // //       delivered: true,
// // //       createdAt: new Date(),
// // //       attachments: [],
// // //     };

// // //     if (req.file) {
// // //       newMessage.attachments.push({
// // //         type: "image",
// // //         url: `/uploads/chats/${req.file.filename}`,
// // //         filename: req.file.filename,
// // //         originalName: req.file.originalname,
// // //         size: req.file.size,
// // //         mimeType: req.file.mimetype,
// // //       });
// // //     }

// // //     chat.messages.push(newMessage);
// // //     chat.lastMessage = message?.trim() || (newMessage.attachments.length > 0 ? "📷 Image" : "");
// // //     chat.lastMessageAt = new Date();
// // //     chat.lastMessageSender = userId;

// // //     for (const participantId of chat.participants) {
// // //       if (participantId.toString() !== userId) {
// // //         const currentUnread = chat.unreadCounts?.get(participantId.toString()) || 0;
// // //         chat.unreadCounts.set(participantId.toString(), currentUnread + 1);
// // //       }
// // //     }

// // //     await chat.save();

// // //     const sender = await User.findById(userId).select("name email profilePhoto role");

// // //     const messageToReturn = {
// // //       _id: chat.messages[chat.messages.length - 1]._id,
// // //       message: newMessage.message,
// // //       senderType: newMessage.senderType,
// // //       read: newMessage.read,
// // //       delivered: newMessage.delivered,
// // //       createdAt: newMessage.createdAt,
// // //       attachments: newMessage.attachments,
// // //       sender: {
// // //         _id: userId,
// // //         name: sender.name,
// // //         email: sender.email,
// // //         profilePhoto: sender.profilePhoto,
// // //         role: sender.role,
// // //       },
// // //     };

// // //     const io = req.app.get("io");
// // //     if (io) {
// // //       io.to(`chat_${chatId}`).emit("new_message", {
// // //         chatId,
// // //         message: messageToReturn,
// // //       });

// // //       for (const participantId of chat.participants) {
// // //         if (participantId.toString() !== userId) {
// // //           io.to(`user_${participantId}`).emit("new_message_notification", {
// // //             chatId,
// // //             from: sender.name,
// // //             message: message?.substring(0, 100) || "📷 Image",
// // //             chatType: chat.chatType,
// // //             vehicleName: chat.vehicleName,
// // //           });
// // //         }
// // //       }
// // //     }

// // //     res.status(200).json({
// // //       success: true,
// // //       message: "Message sent successfully",
// // //       data: messageToReturn,
// // //     });
// // //   } catch (error) {
// // //     console.error("Error sending message:", error);
// // //     res.status(500).json({ success: false, message: error.message });
// // //   }
// // // };

// // // // Upload image handler
// // // export const uploadChatImageHandler = async (req, res) => {
// // //   try {
// // //     if (!req.file) {
// // //       return res.status(400).json({ success: false, message: "No file uploaded" });
// // //     }
// // //     res.json({
// // //       success: true,
// // //       data: {
// // //         url: `/uploads/chats/${req.file.filename}`,
// // //         filename: req.file.filename,
// // //         originalName: req.file.originalname,
// // //         size: req.file.size,
// // //       },
// // //     });
// // //   } catch (error) {
// // //     console.error("Error uploading image:", error);
// // //     res.status(500).json({ success: false, message: "Failed to upload image" });
// // //   }
// // // };

// // // // Block user in chat
// // // export const blockUser = async (req, res) => {
// // //   try {
// // //     const { chatId } = req.params;
// // //     const userId = req.user.id;

// // //     const chat = await Chat.findById(chatId);
// // //     if (!chat) {
// // //       return res
// // //         .status(404)
// // //         .json({ success: false, message: "Chat not found" });
// // //     }

// // //     if (!chat.participants.includes(userId)) {
// // //       return res.status(403).json({ success: false, message: "Unauthorized" });
// // //     }

// // //     chat.isBlocked = true;
// // //     chat.blockedBy = userId;
// // //     chat.blockedAt = new Date();
// // //     await chat.save();

// // //     const io = req.app.get("io");
// // //     if (io) {
// // //       io.to(`chat_${chatId}`).emit("user_blocked", {
// // //         chatId,
// // //         blockedBy: userId,
// // //       });
// // //     }

// // //     res
// // //       .status(200)
// // //       .json({ success: true, message: "User blocked successfully" });
// // //   } catch (error) {
// // //     console.error("Error blocking user:", error);
// // //     res.status(500).json({ success: false, message: error.message });
// // //   }
// // // };

// // // // Unblock user
// // // export const unblockUser = async (req, res) => {
// // //   try {
// // //     const { chatId } = req.params;
// // //     const userId = req.user.id;

// // //     const chat = await Chat.findById(chatId);
// // //     if (!chat) {
// // //       return res
// // //         .status(404)
// // //         .json({ success: false, message: "Chat not found" });
// // //     }

// // //     chat.isBlocked = false;
// // //     chat.blockedBy = null;
// // //     chat.blockedAt = null;
// // //     await chat.save();

// // //     res
// // //       .status(200)
// // //       .json({ success: true, message: "User unblocked successfully" });
// // //   } catch (error) {
// // //     console.error("Error unblocking user:", error);
// // //     res.status(500).json({ success: false, message: error.message });
// // //   }
// // // };

// // import Chat from "../models/Chat.js";
// // import User from "../models/User.js";
// // import UserVehicle from "../models/UserVehicle.js";
// // import Vehicle from "../models/Vehicle.js";
// // import Booking from "../models/Booking.js";
// // import { createNotification } from "../utils/notificationHelper.js";
// // import multer from "multer";
// // import path from "path";
// // import fs from "fs";
// // import { fileURLToPath } from "url";

// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);

// // // Configure multer for chat attachments
// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     const uploadPath = path.join(__dirname, "../../uploads/chats");
// //     if (!fs.existsSync(uploadPath)) {
// //       fs.mkdirSync(uploadPath, { recursive: true });
// //     }
// //     cb(null, uploadPath);
// //   },
// //   filename: (req, file, cb) => {
// //     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
// //     cb(null, "chat-" + uniqueSuffix + path.extname(file.originalname));
// //   },
// // });

// // const fileFilter = (req, file, cb) => {
// //   const allowedTypes = [
// //     "image/jpeg",
// //     "image/jpg",
// //     "image/png",
// //     "image/gif",
// //     "image/webp",
// //   ];
// //   if (allowedTypes.includes(file.mimetype)) {
// //     cb(null, true);
// //   } else {
// //     cb(new Error("Only image files are allowed"), false);
// //   }
// // };

// // export const uploadChatImage = multer({
// //   storage,
// //   limits: { fileSize: 5 * 1024 * 1024 },
// //   fileFilter,
// // }).single("image");

// // // Get or create chat between user and vehicle owner
// // export const getOrCreateVehicleChat = async (req, res) => {
// //   try {
// //     const { vehicleId, vehicleType } = req.body;
// //     const userId = req.user.id;

// //     let ownerId = null;
// //     let vehicleName = "";
// //     let vehicleData = null;

// //     if (vehicleType === "user") {
// //       const userVehicle = await UserVehicle.findById(vehicleId);
// //       if (!userVehicle) {
// //         return res
// //           .status(404)
// //           .json({ success: false, message: "Vehicle not found" });
// //       }
// //       ownerId = userVehicle.user;
// //       vehicleName = userVehicle.carName;
// //       vehicleData = userVehicle;
// //     } else {
// //       const adminVehicle = await Vehicle.findById(vehicleId);
// //       if (!adminVehicle) {
// //         return res
// //           .status(404)
// //           .json({ success: false, message: "Vehicle not found" });
// //       }
// //       vehicleName = adminVehicle.carName;
// //       vehicleData = adminVehicle;
// //       const adminUser = await User.findOne({ role: "admin" });
// //       if (adminUser) {
// //         ownerId = adminUser._id;
// //       }
// //     }

// //     if (!ownerId) {
// //       return res
// //         .status(404)
// //         .json({ success: false, message: "No owner/admin found" });
// //     }

// //     let chat = await Chat.findOne({
// //       chatType: "vehicle",
// //       participants: { $all: [userId, ownerId] },
// //       vehicleId: vehicleId,
// //       isActive: true,
// //     }).populate("participants", "name email profilePhoto role");

// //     if (!chat) {
// //       chat = new Chat({
// //         chatType: "vehicle",
// //         participants: [userId, ownerId],
// //         vehicleId: vehicleId,
// //         vehicleModel: vehicleType === "user" ? "UserVehicle" : "Vehicle",
// //         vehicleName: vehicleName,
// //         title: `Chat about ${vehicleName}`,
// //         messages: [],
// //         unreadCounts: new Map([
// //           [userId.toString(), 0],
// //           [ownerId.toString(), 0],
// //         ]),
// //       });
// //       await chat.save();
// //       await chat.populate("participants", "name email profilePhoto role");
// //     } else {
// //       if (!chat.vehicleName && vehicleName) {
// //         chat.vehicleName = vehicleName;
// //         await chat.save();
// //       }
// //     }

// //     res.status(200).json({
// //       success: true,
// //       data: chat,
// //     });
// //   } catch (error) {
// //     console.error("Error getting vehicle chat:", error);
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // // Get or create support chat
// // export const getOrCreateSupportChat = async (req, res) => {
// //   try {
// //     const userId = req.user.id;

// //     let chat = await Chat.findOne({
// //       chatType: "support",
// //       participants: userId,
// //       isActive: true,
// //     }).populate("participants", "name email profilePhoto role");

// //     if (!chat) {
// //       const admins = await User.find({ role: "admin" }).select("_id");
// //       const adminIds = admins.map((a) => a._id);
// //       const participants = [userId, ...adminIds];

// //       const unreadCounts = new Map();
// //       participants.forEach((p) => {
// //         unreadCounts.set(p.toString(), 0);
// //       });

// //       chat = new Chat({
// //         chatType: "support",
// //         participants: participants,
// //         title: "Support Chat",
// //         messages: [],
// //         unreadCounts: unreadCounts,
// //       });
// //       await chat.save();
// //       await chat.populate("participants", "name email profilePhoto role");
// //     }

// //     res.status(200).json({
// //       success: true,
// //       data: chat,
// //     });
// //   } catch (error) {
// //     console.error("Error getting support chat:", error);
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // // Get chat by ID
// // export const getChatById = async (req, res) => {
// //   try {
// //     const { chatId } = req.params;
// //     const userId = req.user.id;

// //     const chat = await Chat.findById(chatId)
// //       .populate("participants", "name email profilePhoto role")
// //       .populate("messages.sender", "name email profilePhoto role")
// //       .populate("lastMessageSender", "name");

// //     if (!chat) {
// //       return res
// //         .status(404)
// //         .json({ success: false, message: "Chat not found" });
// //     }

// //     if (!chat.participants.some((p) => p._id.toString() === userId)) {
// //       return res.status(403).json({ success: false, message: "Unauthorized" });
// //     }

// //     res.status(200).json({
// //       success: true,
// //       data: chat,
// //     });
// //   } catch (error) {
// //     console.error("Error getting chat:", error);
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // // Get user's all chats
// // export const getUserChats = async (req, res) => {
// //   try {
// //     const userId = req.user.id;

// //     const chats = await Chat.find({
// //       participants: userId,
// //       isActive: true,
// //     })
// //       .populate("participants", "name email profilePhoto role")
// //       .populate("lastMessageSender", "name")
// //       .sort({ updatedAt: -1 });

// //     res.status(200).json({
// //       success: true,
// //       data: chats,
// //     });
// //   } catch (error) {
// //     console.error("Error getting user chats:", error);
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // // Mark messages as read
// // export const markMessagesAsRead = async (req, res) => {
// //   try {
// //     const { chatId } = req.params;
// //     const userId = req.user.id;

// //     const chat = await Chat.findById(chatId);
// //     if (!chat) {
// //       return res
// //         .status(404)
// //         .json({ success: false, message: "Chat not found" });
// //     }

// //     let updated = false;
// //     chat.messages.forEach((message) => {
// //       if (message.sender.toString() !== userId && !message.read) {
// //         message.read = true;
// //         message.readAt = new Date();
// //         updated = true;
// //       }
// //     });

// //     chat.unreadCounts.set(userId.toString(), 0);

// //     if (updated) {
// //       await chat.save();
// //     } else {
// //       // Always reset unread count even if no messages were updated
// //       await chat.save();
// //     }

// //     res.status(200).json({
// //       success: true,
// //       message: "Messages marked as read",
// //     });
// //   } catch (error) {
// //     console.error("Error marking messages as read:", error);
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // // Get unread count for user
// // export const getUnreadCount = async (req, res) => {
// //   try {
// //     const userId = req.user.id;

// //     const chats = await Chat.find({
// //       participants: userId,
// //       isActive: true,
// //     });

// //     let totalUnread = 0;
// //     chats.forEach((chat) => {
// //       totalUnread += chat.unreadCounts.get(userId.toString()) || 0;
// //     });

// //     res.status(200).json({
// //       success: true,
// //       unreadCount: totalUnread,
// //     });
// //   } catch (error) {
// //     console.error("Error getting unread count:", error);
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // // Close chat (admin only)
// // export const closeChat = async (req, res) => {
// //   try {
// //     const { chatId } = req.params;
// //     const userId = req.user.id;
// //     const isAdmin = req.user.role === "admin";

// //     const chat = await Chat.findById(chatId);
// //     if (!chat) {
// //       return res
// //         .status(404)
// //         .json({ success: false, message: "Chat not found" });
// //     }

// //     if (!isAdmin) {
// //       return res
// //         .status(403)
// //         .json({ success: false, message: "Only admins can close chats" });
// //     }

// //     chat.isActive = false;
// //     chat.closedBy = userId;
// //     chat.closedAt = new Date();
// //     await chat.save();

// //     res.status(200).json({
// //       success: true,
// //       message: "Chat closed successfully",
// //     });
// //   } catch (error) {
// //     console.error("Error closing chat:", error);
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // // Send message with attachment support
// // export const sendMessage = async (req, res) => {
// //   try {
// //     const { chatId } = req.params;
// //     const { message } = req.body;
// //     const userId = req.user.id;

// //     const chat = await Chat.findById(chatId);
// //     if (!chat) {
// //       return res
// //         .status(404)
// //         .json({ success: false, message: "Chat not found" });
// //     }

// //     if (!chat.participants.includes(userId)) {
// //       return res.status(403).json({ success: false, message: "Unauthorized" });
// //     }

// //     // Check if chat is blocked
// //     if (chat.isBlocked) {
// //       return res
// //         .status(403)
// //         .json({ success: false, message: "Chat is blocked" });
// //     }

// //     let senderType = "user";
// //     if (req.user.role === "admin") {
// //       senderType = "admin";
// //     } else if (chat.chatType === "vehicle") {
// //       if (chat.vehicleModel === "UserVehicle") {
// //         const vehicle = await UserVehicle.findById(chat.vehicleId);
// //         if (vehicle && vehicle.user.toString() === userId) {
// //           senderType = "owner";
// //         }
// //       }
// //     }

// //     const newMessage = {
// //       sender: userId,
// //       senderType,
// //       message: message?.trim() || "",
// //       read: false,
// //       delivered: true,
// //       createdAt: new Date(),
// //       attachments: [],
// //     };

// //     if (req.file) {
// //       newMessage.attachments.push({
// //         type: "image",
// //         url: `/uploads/chats/${req.file.filename}`,
// //         filename: req.file.filename,
// //         originalName: req.file.originalname,
// //         size: req.file.size,
// //         mimeType: req.file.mimetype,
// //       });
// //     }

// //     chat.messages.push(newMessage);
// //     chat.lastMessage =
// //       message?.trim() || (newMessage.attachments.length > 0 ? "📷 Image" : "");
// //     chat.lastMessageAt = new Date();
// //     chat.lastMessageSender = userId;

// //     // Only increment unread for OTHER participants, not the sender
// //     for (const participantId of chat.participants) {
// //       if (participantId.toString() !== userId) {
// //         const currentUnread =
// //           chat.unreadCounts?.get(participantId.toString()) || 0;
// //         chat.unreadCounts.set(participantId.toString(), currentUnread + 1);
// //       }
// //     }

// //     await chat.save();

// //     const sender = await User.findById(userId).select(
// //       "name email profilePhoto role",
// //     );

// //     const messageToReturn = {
// //       _id: chat.messages[chat.messages.length - 1]._id,
// //       message: newMessage.message,
// //       senderType: newMessage.senderType,
// //       read: newMessage.read,
// //       delivered: newMessage.delivered,
// //       createdAt: newMessage.createdAt,
// //       attachments: newMessage.attachments,
// //       sender: {
// //         _id: userId,
// //         name: sender.name,
// //         email: sender.email,
// //         profilePhoto: sender.profilePhoto,
// //         role: sender.role,
// //       },
// //     };

// //     const io = req.app.get("io");
// //     if (io) {
// //       // FIX: Include senderId as a top-level field in the socket payload.
// //       // This lets the frontend reliably detect own messages and skip
// //       // incrementing the unread count for the sender.
// //       io.to(`chat_${chatId}`).emit("new_message", {
// //         chatId,
// //         message: messageToReturn,
// //         senderId: userId, // ← KEY FIX: plain string, always reliable
// //       });

// //       // Notify other participants only (not the sender)
// //       for (const participantId of chat.participants) {
// //         if (participantId.toString() !== userId) {
// //           io.to(`user_${participantId}`).emit("new_message_notification", {
// //             chatId,
// //             from: sender.name,
// //             message: message?.substring(0, 100) || "📷 Image",
// //             chatType: chat.chatType,
// //             vehicleName: chat.vehicleName,
// //           });
// //         }
// //       }
// //     }

// //     res.status(200).json({
// //       success: true,
// //       message: "Message sent successfully",
// //       data: messageToReturn,
// //     });
// //   } catch (error) {
// //     console.error("Error sending message:", error);
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // // Upload image handler
// // export const uploadChatImageHandler = async (req, res) => {
// //   try {
// //     if (!req.file) {
// //       return res
// //         .status(400)
// //         .json({ success: false, message: "No file uploaded" });
// //     }
// //     res.json({
// //       success: true,
// //       data: {
// //         url: `/uploads/chats/${req.file.filename}`,
// //         filename: req.file.filename,
// //         originalName: req.file.originalname,
// //         size: req.file.size,
// //       },
// //     });
// //   } catch (error) {
// //     console.error("Error uploading image:", error);
// //     res.status(500).json({ success: false, message: "Failed to upload image" });
// //   }
// // };

// // // Block user in chat
// // export const blockUser = async (req, res) => {
// //   try {
// //     const { chatId } = req.params;
// //     const userId = req.user.id;

// //     const chat = await Chat.findById(chatId);
// //     if (!chat) {
// //       return res
// //         .status(404)
// //         .json({ success: false, message: "Chat not found" });
// //     }

// //     if (!chat.participants.includes(userId)) {
// //       return res.status(403).json({ success: false, message: "Unauthorized" });
// //     }

// //     chat.isBlocked = true;
// //     chat.blockedBy = userId;
// //     chat.blockedAt = new Date();
// //     await chat.save();

// //     const io = req.app.get("io");
// //     if (io) {
// //       io.to(`chat_${chatId}`).emit("user_blocked", {
// //         chatId,
// //         blockedBy: userId,
// //       });
// //     }

// //     res
// //       .status(200)
// //       .json({ success: true, message: "User blocked successfully" });
// //   } catch (error) {
// //     console.error("Error blocking user:", error);
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // // Unblock user
// // export const unblockUser = async (req, res) => {
// //   try {
// //     const { chatId } = req.params;
// //     const userId = req.user.id;

// //     const chat = await Chat.findById(chatId);
// //     if (!chat) {
// //       return res
// //         .status(404)
// //         .json({ success: false, message: "Chat not found" });
// //     }

// //     if (!chat.participants.includes(userId)) {
// //       return res.status(403).json({ success: false, message: "Unauthorized" });
// //     }

// //     chat.isBlocked = false;
// //     chat.blockedBy = null;
// //     chat.blockedAt = null;
// //     await chat.save();

// //     const io = req.app.get("io");
// //     if (io) {
// //       io.to(`chat_${chatId}`).emit("user_unblocked", {
// //         chatId,
// //       });
// //     }

// //     res
// //       .status(200)
// //       .json({ success: true, message: "User unblocked successfully" });
// //   } catch (error) {
// //     console.error("Error unblocking user:", error);
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// import Chat from "../models/Chat.js";
// import User from "../models/User.js";
// import UserVehicle from "../models/UserVehicle.js";
// import Vehicle from "../models/Vehicle.js";
// import { createNotification } from "../utils/notificationHelper.js";
// import multer from "multer";
// import path from "path";
// import fs from "fs";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // ─── Multer ───────────────────────────────────────────────────────────────────
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(__dirname, "../../uploads/chats");
//     if (!fs.existsSync(uploadPath))
//       fs.mkdirSync(uploadPath, { recursive: true });
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, "chat-" + uniqueSuffix + path.extname(file.originalname));
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowed = [
//     "image/jpeg",
//     "image/jpg",
//     "image/png",
//     "image/gif",
//     "image/webp",
//   ];
//   allowed.includes(file.mimetype)
//     ? cb(null, true)
//     : cb(new Error("Only image files are allowed"), false);
// };

// export const uploadChatImage = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 },
//   fileFilter,
// }).single("image");

// // ─── Helper ───────────────────────────────────────────────────────────────────
// const emitToChat = (io, chatId, event, data) => {
//   if (io) io.to(`chat_${chatId}`).emit(event, data);
// };

// // ─── Get or create vehicle chat ───────────────────────────────────────────────
// export const getOrCreateVehicleChat = async (req, res) => {
//   try {
//     const { vehicleId, vehicleType } = req.body;
//     const userId = req.user.id;
//     let ownerId = null;
//     let vehicleName = "";

//     if (vehicleType === "user") {
//       const uv = await UserVehicle.findById(vehicleId);
//       if (!uv)
//         return res
//           .status(404)
//           .json({ success: false, message: "Vehicle not found" });
//       ownerId = uv.user;
//       vehicleName = uv.carName;
//     } else {
//       const av = await Vehicle.findById(vehicleId);
//       if (!av)
//         return res
//           .status(404)
//           .json({ success: false, message: "Vehicle not found" });
//       vehicleName = av.carName;
//       const admin = await User.findOne({ role: "admin" });
//       if (admin) ownerId = admin._id;
//     }

//     if (!ownerId)
//       return res
//         .status(404)
//         .json({ success: false, message: "No owner/admin found" });

//     let chat = await Chat.findOne({
//       chatType: "vehicle",
//       participants: { $all: [userId, ownerId] },
//       vehicleId,
//       isActive: true,
//     }).populate("participants", "name email profilePhoto role");

//     if (!chat) {
//       chat = new Chat({
//         chatType: "vehicle",
//         participants: [userId, ownerId],
//         vehicleId,
//         vehicleModel: vehicleType === "user" ? "UserVehicle" : "Vehicle",
//         vehicleName,
//         title: `Chat about ${vehicleName}`,
//         messages: [],
//         unreadCounts: new Map([
//           [userId.toString(), 0],
//           [ownerId.toString(), 0],
//         ]),
//       });
//       await chat.save();
//       await chat.populate("participants", "name email profilePhoto role");
//     } else if (!chat.vehicleName && vehicleName) {
//       chat.vehicleName = vehicleName;
//       await chat.save();
//     }

//     res.status(200).json({ success: true, data: chat });
//   } catch (error) {
//     console.error("Error getting vehicle chat:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ─── Get or create support chat ───────────────────────────────────────────────
// export const getOrCreateSupportChat = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     let chat = await Chat.findOne({
//       chatType: "support",
//       participants: userId,
//       isActive: true,
//     }).populate("participants", "name email profilePhoto role");

//     if (!chat) {
//       const admins = await User.find({ role: "admin" }).select("_id");
//       const participants = [userId, ...admins.map((a) => a._id)];
//       const unreadCounts = new Map();
//       participants.forEach((p) => unreadCounts.set(p.toString(), 0));

//       chat = new Chat({
//         chatType: "support",
//         participants,
//         title: "Support Chat",
//         messages: [],
//         unreadCounts,
//       });
//       await chat.save();
//       await chat.populate("participants", "name email profilePhoto role");
//     }

//     res.status(200).json({ success: true, data: chat });
//   } catch (error) {
//     console.error("Error getting support chat:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ─── Get chat by ID ───────────────────────────────────────────────────────────
// export const getChatById = async (req, res) => {
//   try {
//     const { chatId } = req.params;
//     const userId = req.user.id;

//     const chat = await Chat.findById(chatId)
//       .populate("participants", "name email profilePhoto role")
//       .populate("messages.sender", "name email profilePhoto role")
//       .populate(
//         "messages.replyTo",
//         "message sender senderType attachments isUnsent",
//       )
//       .populate("lastMessageSender", "name");

//     if (!chat)
//       return res
//         .status(404)
//         .json({ success: false, message: "Chat not found" });
//     if (!chat.participants.some((p) => p._id.toString() === userId))
//       return res.status(403).json({ success: false, message: "Unauthorized" });

//     // Filter out messages deleted for this user
//     const filteredMessages = chat.messages.filter(
//       (m) => !m.deletedFor?.map((id) => id.toString()).includes(userId),
//     );

//     res.status(200).json({
//       success: true,
//       data: { ...chat.toObject(), messages: filteredMessages },
//     });
//   } catch (error) {
//     console.error("Error getting chat:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ─── Get user's chats ─────────────────────────────────────────────────────────
// export const getUserChats = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const chats = await Chat.find({ participants: userId, isActive: true })
//       .populate("participants", "name email profilePhoto role")
//       .populate("lastMessageSender", "name")
//       .sort({ updatedAt: -1 });

//     // Attach muted flag per user
//     const chatsWithMeta = chats.map((c) => {
//       const obj = c.toObject();
//       obj.isMuted =
//         c.mutedBy?.map((id) => id.toString()).includes(userId) || false;
//       return obj;
//     });

//     res.status(200).json({ success: true, data: chatsWithMeta });
//   } catch (error) {
//     console.error("Error getting user chats:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ─── Mark messages as read ────────────────────────────────────────────────────
// export const markMessagesAsRead = async (req, res) => {
//   try {
//     const { chatId } = req.params;
//     const userId = req.user.id;

//     const chat = await Chat.findById(chatId);
//     if (!chat)
//       return res
//         .status(404)
//         .json({ success: false, message: "Chat not found" });

//     chat.messages.forEach((msg) => {
//       if (msg.sender.toString() !== userId && !msg.read) {
//         msg.read = true;
//         msg.readAt = new Date();
//       }
//     });

//     chat.unreadCounts.set(userId.toString(), 0);
//     await chat.save();

//     res.status(200).json({ success: true, message: "Messages marked as read" });
//   } catch (error) {
//     console.error("Error marking messages as read:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ─── Get unread count (conversations, not messages) ───────────────────────────
// export const getUnreadCount = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const chats = await Chat.find({ participants: userId, isActive: true });

//     // Count CONVERSATIONS (not total messages) that have unread and are not muted
//     const unreadConversations = chats.filter((chat) => {
//       const hasUnread = (chat.unreadCounts.get(userId.toString()) || 0) > 0;
//       const isMuted = chat.mutedBy?.map((id) => id.toString()).includes(userId);
//       return hasUnread && !isMuted;
//     }).length;

//     res.status(200).json({ success: true, unreadCount: unreadConversations });
//   } catch (error) {
//     console.error("Error getting unread count:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ─── Send message ─────────────────────────────────────────────────────────────
// export const sendMessage = async (req, res) => {
//   try {
//     const { chatId } = req.params;
//     const { message, replyToId } = req.body;
//     const userId = req.user.id;

//     const chat = await Chat.findById(chatId);
//     if (!chat)
//       return res
//         .status(404)
//         .json({ success: false, message: "Chat not found" });
//     if (!chat.participants.includes(userId))
//       return res.status(403).json({ success: false, message: "Unauthorized" });
//     if (chat.isBlocked)
//       return res
//         .status(403)
//         .json({ success: false, message: "Chat is blocked" });

//     let senderType = "user";
//     if (req.user.role === "admin") {
//       senderType = "admin";
//     } else if (
//       chat.chatType === "vehicle" &&
//       chat.vehicleModel === "UserVehicle"
//     ) {
//       const vehicle = await UserVehicle.findById(chat.vehicleId);
//       if (vehicle && vehicle.user.toString() === userId) senderType = "owner";
//     }

//     const newMessage = {
//       sender: userId,
//       senderType,
//       message: message?.trim() || "",
//       read: false,
//       delivered: true,
//       createdAt: new Date(),
//       attachments: [],
//       reactions: [],
//       deletedFor: [],
//       isUnsent: false,
//     };

//     // Reply support
//     if (replyToId) {
//       const replyMsg = chat.messages.id(replyToId);
//       if (replyMsg) newMessage.replyTo = replyToId;
//     }

//     if (req.file) {
//       newMessage.attachments.push({
//         type: "image",
//         url: `/uploads/chats/${req.file.filename}`,
//         filename: req.file.filename,
//         originalName: req.file.originalname,
//         size: req.file.size,
//         mimeType: req.file.mimetype,
//       });
//     }

//     chat.messages.push(newMessage);
//     chat.lastMessage =
//       message?.trim() || (newMessage.attachments.length > 0 ? "📷 Image" : "");
//     chat.lastMessageAt = new Date();
//     chat.lastMessageSender = userId;

//     for (const participantId of chat.participants) {
//       if (participantId.toString() !== userId) {
//         const cur = chat.unreadCounts?.get(participantId.toString()) || 0;
//         chat.unreadCounts.set(participantId.toString(), cur + 1);
//       }
//     }

//     await chat.save();

//     const sender = await User.findById(userId).select(
//       "name email profilePhoto role",
//     );
//     const savedMsg = chat.messages[chat.messages.length - 1];

//     // Build replyTo preview
//     let replyToData = null;
//     if (newMessage.replyTo) {
//       const original = chat.messages.id(newMessage.replyTo);
//       if (original) {
//         const rtSender = await User.findById(original.sender).select(
//           "name profilePhoto",
//         );
//         replyToData = {
//           _id: original._id,
//           message: original.isUnsent
//             ? "This message was unsent"
//             : original.message,
//           senderType: original.senderType,
//           attachments: original.attachments,
//           sender: rtSender,
//         };
//       }
//     }

//     const messageToReturn = {
//       _id: savedMsg._id,
//       message: newMessage.message,
//       senderType: newMessage.senderType,
//       read: newMessage.read,
//       delivered: newMessage.delivered,
//       createdAt: newMessage.createdAt,
//       attachments: newMessage.attachments,
//       reactions: [],
//       isUnsent: false,
//       replyTo: replyToData,
//       sender: {
//         _id: userId,
//         name: sender.name,
//         email: sender.email,
//         profilePhoto: sender.profilePhoto,
//         role: sender.role,
//       },
//     };

//     const io = req.app.get("io");
//     if (io) {
//       io.to(`chat_${chatId}`).emit("new_message", {
//         chatId,
//         message: messageToReturn,
//         senderId: userId,
//       });

//       for (const participantId of chat.participants) {
//         if (participantId.toString() !== userId) {
//           const isMuted = chat.mutedBy
//             ?.map((id) => id.toString())
//             .includes(participantId.toString());
//           if (!isMuted) {
//             io.to(`user_${participantId}`).emit("new_message_notification", {
//               chatId,
//               from: sender.name,
//               message: message?.substring(0, 100) || "📷 Image",
//               chatType: chat.chatType,
//               vehicleName: chat.vehicleName,
//             });
//           }
//         }
//       }
//     }

//     res
//       .status(200)
//       .json({
//         success: true,
//         message: "Message sent successfully",
//         data: messageToReturn,
//       });
//   } catch (error) {
//     console.error("Error sending message:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ─── Unsend message ───────────────────────────────────────────────────────────
// export const unsendMessage = async (req, res) => {
//   try {
//     const { chatId, messageId } = req.params;
//     const userId = req.user.id;

//     const chat = await Chat.findById(chatId);
//     if (!chat)
//       return res
//         .status(404)
//         .json({ success: false, message: "Chat not found" });

//     const msg = chat.messages.id(messageId);
//     if (!msg)
//       return res
//         .status(404)
//         .json({ success: false, message: "Message not found" });
//     if (msg.sender.toString() !== userId)
//       return res
//         .status(403)
//         .json({
//           success: false,
//           message: "You can only unsend your own messages",
//         });

//     msg.isUnsent = true;
//     msg.message = "";
//     msg.attachments = [];
//     msg.reactions = [];
//     await chat.save();

//     emitToChat(req.app.get("io"), chatId, "message_unsent", {
//       chatId,
//       messageId,
//     });
//     res.status(200).json({ success: true, message: "Message unsent" });
//   } catch (error) {
//     console.error("Error unsending message:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ─── Delete message for me ────────────────────────────────────────────────────
// export const deleteMessageForMe = async (req, res) => {
//   try {
//     const { chatId, messageId } = req.params;
//     const userId = req.user.id;

//     const chat = await Chat.findById(chatId);
//     if (!chat)
//       return res
//         .status(404)
//         .json({ success: false, message: "Chat not found" });

//     const msg = chat.messages.id(messageId);
//     if (!msg)
//       return res
//         .status(404)
//         .json({ success: false, message: "Message not found" });

//     if (!msg.deletedFor) msg.deletedFor = [];
//     if (!msg.deletedFor.map((id) => id.toString()).includes(userId)) {
//       msg.deletedFor.push(userId);
//     }

//     await chat.save();
//     res.status(200).json({ success: true, message: "Message deleted for you" });
//   } catch (error) {
//     console.error("Error deleting message:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ─── Delete entire conversation for me ───────────────────────────────────────
// export const deleteConversation = async (req, res) => {
//   try {
//     const { chatId } = req.params;
//     const userId = req.user.id;

//     const chat = await Chat.findById(chatId);
//     if (!chat)
//       return res
//         .status(404)
//         .json({ success: false, message: "Chat not found" });
//     if (!chat.participants.map((p) => p.toString()).includes(userId))
//       return res.status(403).json({ success: false, message: "Unauthorized" });

//     chat.messages.forEach((msg) => {
//       if (!msg.deletedFor) msg.deletedFor = [];
//       if (!msg.deletedFor.map((id) => id.toString()).includes(userId)) {
//         msg.deletedFor.push(userId);
//       }
//     });

//     if (!chat.clearedFor) chat.clearedFor = [];
//     if (!chat.clearedFor.map((id) => id.toString()).includes(userId)) {
//       chat.clearedFor.push(userId);
//     }

//     await chat.save();
//     res.status(200).json({ success: true, message: "Conversation deleted" });
//   } catch (error) {
//     console.error("Error deleting conversation:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ─── React to message ─────────────────────────────────────────────────────────
// export const reactToMessage = async (req, res) => {
//   try {
//     const { chatId, messageId } = req.params;
//     const { emoji } = req.body;
//     const userId = req.user.id;

//     if (!emoji)
//       return res
//         .status(400)
//         .json({ success: false, message: "Emoji required" });

//     const chat = await Chat.findById(chatId);
//     if (!chat)
//       return res
//         .status(404)
//         .json({ success: false, message: "Chat not found" });

//     const msg = chat.messages.id(messageId);
//     if (!msg)
//       return res
//         .status(404)
//         .json({ success: false, message: "Message not found" });

//     if (!msg.reactions) msg.reactions = [];

//     const existingIdx = msg.reactions.findIndex(
//       (r) => r.userId.toString() === userId && r.emoji === emoji,
//     );

//     if (existingIdx !== -1) {
//       // Toggle off same emoji
//       msg.reactions.splice(existingIdx, 1);
//     } else {
//       // Remove previous reaction from this user (one reaction per user)
//       const prevIdx = msg.reactions.findIndex(
//         (r) => r.userId.toString() === userId,
//       );
//       if (prevIdx !== -1) msg.reactions.splice(prevIdx, 1);
//       msg.reactions.push({ userId, emoji, createdAt: new Date() });
//     }

//     await chat.save();

//     emitToChat(req.app.get("io"), chatId, "message_reaction", {
//       chatId,
//       messageId,
//       reactions: msg.reactions,
//       reactedBy: userId,
//     });

//     res.status(200).json({ success: true, reactions: msg.reactions });
//   } catch (error) {
//     console.error("Error reacting to message:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ─── Mute / unmute chat ───────────────────────────────────────────────────────
// export const muteChat = async (req, res) => {
//   try {
//     const { chatId } = req.params;
//     const userId = req.user.id;

//     const chat = await Chat.findById(chatId);
//     if (!chat)
//       return res
//         .status(404)
//         .json({ success: false, message: "Chat not found" });
//     if (!chat.participants.map((p) => p.toString()).includes(userId))
//       return res.status(403).json({ success: false, message: "Unauthorized" });

//     if (!chat.mutedBy) chat.mutedBy = [];
//     const idx = chat.mutedBy.findIndex((id) => id.toString() === userId);

//     if (idx !== -1) {
//       chat.mutedBy.splice(idx, 1);
//       await chat.save();
//       return res
//         .status(200)
//         .json({ success: true, muted: false, message: "Chat unmuted" });
//     } else {
//       chat.mutedBy.push(userId);
//       await chat.save();
//       return res
//         .status(200)
//         .json({ success: true, muted: true, message: "Chat muted" });
//     }
//   } catch (error) {
//     console.error("Error muting chat:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ─── Upload image ─────────────────────────────────────────────────────────────
// export const uploadChatImageHandler = async (req, res) => {
//   try {
//     if (!req.file)
//       return res
//         .status(400)
//         .json({ success: false, message: "No file uploaded" });
//     res.json({
//       success: true,
//       data: {
//         url: `/uploads/chats/${req.file.filename}`,
//         filename: req.file.filename,
//         originalName: req.file.originalname,
//         size: req.file.size,
//       },
//     });
//   } catch (error) {
//     console.error("Error uploading image:", error);
//     res.status(500).json({ success: false, message: "Failed to upload image" });
//   }
// };

// // ─── Block / Unblock ──────────────────────────────────────────────────────────
// export const blockUser = async (req, res) => {
//   try {
//     const { chatId } = req.params;
//     const userId = req.user.id;

//     const chat = await Chat.findById(chatId);
//     if (!chat)
//       return res
//         .status(404)
//         .json({ success: false, message: "Chat not found" });
//     if (!chat.participants.map((p) => p.toString()).includes(userId))
//       return res.status(403).json({ success: false, message: "Unauthorized" });

//     chat.isBlocked = true;
//     chat.blockedBy = userId;
//     chat.blockedAt = new Date();
//     await chat.save();

//     emitToChat(req.app.get("io"), chatId, "user_blocked", {
//       chatId,
//       blockedBy: userId,
//     });
//     res
//       .status(200)
//       .json({ success: true, message: "User blocked successfully" });
//   } catch (error) {
//     console.error("Error blocking user:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const unblockUser = async (req, res) => {
//   try {
//     const { chatId } = req.params;
//     const userId = req.user.id;

//     const chat = await Chat.findById(chatId);
//     if (!chat)
//       return res
//         .status(404)
//         .json({ success: false, message: "Chat not found" });
//     if (!chat.participants.map((p) => p.toString()).includes(userId))
//       return res.status(403).json({ success: false, message: "Unauthorized" });

//     chat.isBlocked = false;
//     chat.blockedBy = null;
//     chat.blockedAt = null;
//     await chat.save();

//     emitToChat(req.app.get("io"), chatId, "user_unblocked", { chatId });
//     res
//       .status(200)
//       .json({ success: true, message: "User unblocked successfully" });
//   } catch (error) {
//     console.error("Error unblocking user:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ─── Close chat (admin only) ──────────────────────────────────────────────────
// export const closeChat = async (req, res) => {
//   try {
//     const { chatId } = req.params;
//     const userId = req.user.id;

//     if (req.user.role !== "admin")
//       return res
//         .status(403)
//         .json({ success: false, message: "Only admins can close chats" });

//     const chat = await Chat.findById(chatId);
//     if (!chat)
//       return res
//         .status(404)
//         .json({ success: false, message: "Chat not found" });

//     chat.isActive = false;
//     chat.closedBy = userId;
//     chat.closedAt = new Date();
//     await chat.save();

//     res
//       .status(200)
//       .json({ success: true, message: "Chat closed successfully" });
//   } catch (error) {
//     console.error("Error closing chat:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ─── Auto-delete messages older than 3 days ───────────────────────────────────
// // Wire this up in your cron scheduler, e.g. with node-cron:
// //
// //   import cron from "node-cron";
// //   import { autoDeleteExpiredMessages } from "./controllers/chatController.js";
// //   cron.schedule("0 2 * * *", autoDeleteExpiredMessages); // 2 AM every day
// //
// export const autoDeleteExpiredMessages = async () => {
//   try {
//     const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
//     const chats = await Chat.find({ isActive: true });
//     let totalDeleted = 0;

//     for (const chat of chats) {
//       const before = chat.messages.length;
//       chat.messages = chat.messages.filter(
//         (msg) => new Date(msg.createdAt) > threeDaysAgo,
//       );
//       const deleted = before - chat.messages.length;

//       if (deleted > 0) {
//         totalDeleted += deleted;
//         if (chat.messages.length > 0) {
//           const last = chat.messages[chat.messages.length - 1];
//           chat.lastMessage = last.isUnsent
//             ? "Message unsent"
//             : last.message || "📷 Image";
//           chat.lastMessageAt = last.createdAt;
//         } else {
//           chat.lastMessage = "";
//           chat.lastMessageAt = null;
//         }
//         await chat.save();
//       }
//     }

//     console.log(`[AutoDelete] Cleaned ${totalDeleted} expired messages`);
//     return totalDeleted;
//   } catch (error) {
//     console.error("[AutoDelete] Error:", error);
//   }
// };

import Chat from "../models/Chat.js";
import User from "../models/User.js";
import UserVehicle from "../models/UserVehicle.js";
import Vehicle from "../models/Vehicle.js";
import { createNotification } from "../utils/notificationHelper.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── Multer ───────────────────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../../uploads/chats");
    if (!fs.existsSync(uploadPath))
      fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "chat-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
  ];
  allowed.includes(file.mimetype)
    ? cb(null, true)
    : cb(new Error("Only image files are allowed"), false);
};

export const uploadChatImage = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
}).single("image");

// ─── Helper ───────────────────────────────────────────────────────────────────
const emitToChat = (io, chatId, event, data) => {
  if (io) io.to(`chat_${chatId}`).emit(event, data);
};

// ─── Get or create vehicle chat ───────────────────────────────────────────────
export const getOrCreateVehicleChat = async (req, res) => {
  try {
    const { vehicleId, vehicleType } = req.body;
    const userId = req.user.id;
    let ownerId = null;
    let vehicleName = "";

    if (vehicleType === "user") {
      const uv = await UserVehicle.findById(vehicleId);
      if (!uv)
        return res
          .status(404)
          .json({ success: false, message: "Vehicle not found" });
      ownerId = uv.user;
      vehicleName = uv.carName;
    } else {
      const av = await Vehicle.findById(vehicleId);
      if (!av)
        return res
          .status(404)
          .json({ success: false, message: "Vehicle not found" });
      vehicleName = av.carName;
      const admin = await User.findOne({ role: "admin" });
      if (admin) ownerId = admin._id;
    }

    if (!ownerId)
      return res
        .status(404)
        .json({ success: false, message: "No owner/admin found" });

    let chat = await Chat.findOne({
      chatType: "vehicle",
      participants: { $all: [userId, ownerId] },
      vehicleId,
      isActive: true,
    }).populate("participants", "name email profilePhoto role");

    if (!chat) {
      chat = new Chat({
        chatType: "vehicle",
        participants: [userId, ownerId],
        vehicleId,
        vehicleModel: vehicleType === "user" ? "UserVehicle" : "Vehicle",
        vehicleName,
        title: `Chat about ${vehicleName}`,
        messages: [],
        unreadCounts: new Map([
          [userId.toString(), 0],
          [ownerId.toString(), 0],
        ]),
      });
      await chat.save();
      await chat.populate("participants", "name email profilePhoto role");
    } else if (!chat.vehicleName && vehicleName) {
      chat.vehicleName = vehicleName;
      await chat.save();
    }

    res.status(200).json({ success: true, data: chat });
  } catch (error) {
    console.error("Error getting vehicle chat:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Get or create support chat ───────────────────────────────────────────────
export const getOrCreateSupportChat = async (req, res) => {
  try {
    const userId = req.user.id;

    let chat = await Chat.findOne({
      chatType: "support",
      participants: userId,
      isActive: true,
    }).populate("participants", "name email profilePhoto role");

    if (!chat) {
      const admins = await User.find({ role: "admin" }).select("_id");
      const participants = [userId, ...admins.map((a) => a._id)];
      const unreadCounts = new Map();
      participants.forEach((p) => unreadCounts.set(p.toString(), 0));

      chat = new Chat({
        chatType: "support",
        participants,
        title: "Support Chat",
        messages: [],
        unreadCounts,
      });
      await chat.save();
      await chat.populate("participants", "name email profilePhoto role");
    }

    res.status(200).json({ success: true, data: chat });
  } catch (error) {
    console.error("Error getting support chat:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Get chat by ID ───────────────────────────────────────────────────────────
export const getChatById = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user.id;

    const chat = await Chat.findById(chatId)
      .populate("participants", "name email profilePhoto role")
      .populate("messages.sender", "name email profilePhoto role")
      .populate("lastMessageSender", "name");

    if (!chat)
      return res
        .status(404)
        .json({ success: false, message: "Chat not found" });
    if (!chat.participants.some((p) => p._id.toString() === userId))
      return res.status(403).json({ success: false, message: "Unauthorized" });

    // Filter out messages deleted for this user
    const filteredMessages = chat.messages.filter(
      (m) => !m.deletedFor?.map((id) => id.toString()).includes(userId),
    );

    res.status(200).json({
      success: true,
      data: { ...chat.toObject(), messages: filteredMessages },
    });
  } catch (error) {
    console.error("Error getting chat:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Get user's chats ─────────────────────────────────────────────────────────
export const getUserChats = async (req, res) => {
  try {
    const userId = req.user.id;

    const chats = await Chat.find({ participants: userId, isActive: true })
      .populate("participants", "name email profilePhoto role")
      .populate("lastMessageSender", "name")
      .sort({ updatedAt: -1 });

    // Attach muted flag per user
    const chatsWithMeta = chats.map((c) => {
      const obj = c.toObject();
      obj.isMuted =
        c.mutedBy?.map((id) => id.toString()).includes(userId) || false;
      return obj;
    });

    res.status(200).json({ success: true, data: chatsWithMeta });
  } catch (error) {
    console.error("Error getting user chats:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Mark messages as read ────────────────────────────────────────────────────
// export const markMessagesAsRead = async (req, res) => {
//   try {
//     const { chatId } = req.params;
//     const userId = req.user.id;

//     const chat = await Chat.findById(chatId);
//     if (!chat)
//       return res
//         .status(404)
//         .json({ success: false, message: "Chat not found" });

//     chat.messages.forEach((msg) => {
//       if (msg.sender.toString() !== userId && !msg.read) {
//         msg.read = true;
//         msg.readAt = new Date();
//       }
//     });

//     chat.unreadCounts.set(userId.toString(), 0);
//     await chat.save();

//     res.status(200).json({ success: true, message: "Messages marked as read" });
//   } catch (error) {
//     console.error("Error marking messages as read:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

export const markMessagesAsRead = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user.id;

    const chat = await Chat.findById(chatId);
    if (!chat)
      return res.status(404).json({ success: false, message: "Chat not found" });

    // Collect which message IDs we're marking as read
    const readMessageIds = [];
    chat.messages.forEach((msg) => {
      if (msg.sender.toString() !== userId && !msg.read) {
        msg.read = true;
        msg.readAt = new Date();
        readMessageIds.push(msg._id);
      }
    });

    chat.unreadCounts.set(userId.toString(), 0);
    await chat.save();

    // ✅ Emit to the chat room so the SENDER sees blue ticks in real-time
    if (readMessageIds.length > 0) {
      const io = req.app.get("io");
      if (io) {
        io.to(`chat_${chatId}`).emit("messages_read", {
          chatId,
          readBy: userId,
          messageIds: readMessageIds,
        });
      }
    }

    res.status(200).json({ success: true, message: "Messages marked as read" });
  } catch (error) {
    console.error("Error marking messages as read:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Get unread count (conversations, not messages) ───────────────────────────
export const getUnreadCount = async (req, res) => {
  try {
    const userId = req.user.id;

    const chats = await Chat.find({ participants: userId, isActive: true });

    // Count CONVERSATIONS (not total messages) that have unread and are not muted
    const unreadConversations = chats.filter((chat) => {
      const hasUnread = (chat.unreadCounts.get(userId.toString()) || 0) > 0;
      const isMuted = chat.mutedBy?.map((id) => id.toString()).includes(userId);
      return hasUnread && !isMuted;
    }).length;

    res.status(200).json({ success: true, unreadCount: unreadConversations });
  } catch (error) {
    console.error("Error getting unread count:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Send message ─────────────────────────────────────────────────────────────
export const sendMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { message, replyToId } = req.body;
    const userId = req.user.id;

    const chat = await Chat.findById(chatId);
    if (!chat)
      return res
        .status(404)
        .json({ success: false, message: "Chat not found" });
    if (!chat.participants.includes(userId))
      return res.status(403).json({ success: false, message: "Unauthorized" });
    if (chat.isBlocked)
      return res
        .status(403)
        .json({ success: false, message: "Chat is blocked" });

    let senderType = "user";
    if (req.user.role === "admin") {
      senderType = "admin";
    } else if (
      chat.chatType === "vehicle" &&
      chat.vehicleModel === "UserVehicle"
    ) {
      const vehicle = await UserVehicle.findById(chat.vehicleId);
      if (vehicle && vehicle.user.toString() === userId) senderType = "owner";
    }

    const newMessage = {
      sender: userId,
      senderType,
      message: message?.trim() || "",
      read: false,
      delivered: true,
      createdAt: new Date(),
      attachments: [],
      reactions: [],
      deletedFor: [],
      isUnsent: false,
    };

    // Reply support — store both the ID and an inline snapshot
    // The snapshot is used for display even if the original is later unsent/deleted
    if (replyToId) {
      const replyMsg = chat.messages.id(replyToId);
      if (replyMsg) {
        newMessage.replyTo = replyToId;
        newMessage.replyToSnapshot = {
          message: replyMsg.isUnsent ? "" : replyMsg.message || "",
          senderType: replyMsg.senderType || "user",
          isUnsent: replyMsg.isUnsent || false,
          hasImage: (replyMsg.attachments || []).length > 0,
        };
      }
    }

    if (req.file) {
      newMessage.attachments.push({
        type: "image",
        url: `/uploads/chats/${req.file.filename}`,
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        mimeType: req.file.mimetype,
      });
    }

    chat.messages.push(newMessage);
    chat.lastMessage =
      message?.trim() || (newMessage.attachments.length > 0 ? "📷 Image" : "");
    chat.lastMessageAt = new Date();
    chat.lastMessageSender = userId;

    for (const participantId of chat.participants) {
      if (participantId.toString() !== userId) {
        const cur = chat.unreadCounts?.get(participantId.toString()) || 0;
        chat.unreadCounts.set(participantId.toString(), cur + 1);
      }
    }

    await chat.save();

    const sender = await User.findById(userId).select(
      "name email profilePhoto role",
    );
    const savedMsg = chat.messages[chat.messages.length - 1];

    // Build replyTo preview from snapshot (no extra DB lookup needed)
    let replyToData = null;
    if (newMessage.replyTo && newMessage.replyToSnapshot) {
      replyToData = {
        _id: newMessage.replyTo,
        message: newMessage.replyToSnapshot.isUnsent
          ? "This message was unsent"
          : newMessage.replyToSnapshot.message,
        senderType: newMessage.replyToSnapshot.senderType,
        hasImage: newMessage.replyToSnapshot.hasImage,
        isUnsent: newMessage.replyToSnapshot.isUnsent,
      };
    }

    const messageToReturn = {
      _id: savedMsg._id,
      message: newMessage.message,
      senderType: newMessage.senderType,
      read: newMessage.read,
      delivered: newMessage.delivered,
      createdAt: newMessage.createdAt,
      attachments: newMessage.attachments,
      reactions: [],
      isUnsent: false,
      replyTo: replyToData,
      replyToSnapshot: newMessage.replyToSnapshot || null,
      sender: {
        _id: userId,
        name: sender.name,
        email: sender.email,
        profilePhoto: sender.profilePhoto,
        role: sender.role,
      },
    };

    const io = req.app.get("io");
    if (io) {
      io.to(`chat_${chatId}`).emit("new_message", {
        chatId,
        message: messageToReturn,
        senderId: userId,
      });

      for (const participantId of chat.participants) {
        if (participantId.toString() !== userId) {
          const isMuted = chat.mutedBy
            ?.map((id) => id.toString())
            .includes(participantId.toString());
          if (!isMuted) {
            io.to(`user_${participantId}`).emit("new_message_notification", {
              chatId,
              from: sender.name,
              message: message?.substring(0, 100) || "📷 Image",
              chatType: chat.chatType,
              vehicleName: chat.vehicleName,
            });
          }
        }
      }
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Message sent successfully",
        data: messageToReturn,
      });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Unsend message ───────────────────────────────────────────────────────────
export const unsendMessage = async (req, res) => {
  try {
    const { chatId, messageId } = req.params;
    const userId = req.user.id;

    const chat = await Chat.findById(chatId);
    if (!chat)
      return res
        .status(404)
        .json({ success: false, message: "Chat not found" });

    const msg = chat.messages.id(messageId);
    if (!msg)
      return res
        .status(404)
        .json({ success: false, message: "Message not found" });
    if (msg.sender.toString() !== userId)
      return res
        .status(403)
        .json({
          success: false,
          message: "You can only unsend your own messages",
        });

    msg.isUnsent = true;
    msg.message = "";
    msg.attachments = [];
    msg.reactions = [];
    await chat.save();

    emitToChat(req.app.get("io"), chatId, "message_unsent", {
      chatId,
      messageId,
    });
    res.status(200).json({ success: true, message: "Message unsent" });
  } catch (error) {
    console.error("Error unsending message:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Delete message for me ────────────────────────────────────────────────────
export const deleteMessageForMe = async (req, res) => {
  try {
    const { chatId, messageId } = req.params;
    const userId = req.user.id;

    const chat = await Chat.findById(chatId);
    if (!chat)
      return res
        .status(404)
        .json({ success: false, message: "Chat not found" });

    const msg = chat.messages.id(messageId);
    if (!msg)
      return res
        .status(404)
        .json({ success: false, message: "Message not found" });

    if (!msg.deletedFor) msg.deletedFor = [];
    if (!msg.deletedFor.map((id) => id.toString()).includes(userId)) {
      msg.deletedFor.push(userId);
    }

    await chat.save();
    res.status(200).json({ success: true, message: "Message deleted for you" });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Delete entire conversation for me ───────────────────────────────────────
export const deleteConversation = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user.id;

    const chat = await Chat.findById(chatId);
    if (!chat)
      return res
        .status(404)
        .json({ success: false, message: "Chat not found" });
    if (!chat.participants.map((p) => p.toString()).includes(userId))
      return res.status(403).json({ success: false, message: "Unauthorized" });

    chat.messages.forEach((msg) => {
      if (!msg.deletedFor) msg.deletedFor = [];
      if (!msg.deletedFor.map((id) => id.toString()).includes(userId)) {
        msg.deletedFor.push(userId);
      }
    });

    if (!chat.clearedFor) chat.clearedFor = [];
    if (!chat.clearedFor.map((id) => id.toString()).includes(userId)) {
      chat.clearedFor.push(userId);
    }

    await chat.save();
    res.status(200).json({ success: true, message: "Conversation deleted" });
  } catch (error) {
    console.error("Error deleting conversation:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── React to message ─────────────────────────────────────────────────────────
export const reactToMessage = async (req, res) => {
  try {
    const { chatId, messageId } = req.params;
    const { emoji } = req.body;
    const userId = req.user.id;

    if (!emoji)
      return res
        .status(400)
        .json({ success: false, message: "Emoji required" });

    const chat = await Chat.findById(chatId);
    if (!chat)
      return res
        .status(404)
        .json({ success: false, message: "Chat not found" });

    const msg = chat.messages.id(messageId);
    if (!msg)
      return res
        .status(404)
        .json({ success: false, message: "Message not found" });

    if (!msg.reactions) msg.reactions = [];

    const existingIdx = msg.reactions.findIndex(
      (r) => r.userId.toString() === userId && r.emoji === emoji,
    );

    if (existingIdx !== -1) {
      // Toggle off same emoji
      msg.reactions.splice(existingIdx, 1);
    } else {
      // Remove previous reaction from this user (one reaction per user)
      const prevIdx = msg.reactions.findIndex(
        (r) => r.userId.toString() === userId,
      );
      if (prevIdx !== -1) msg.reactions.splice(prevIdx, 1);
      msg.reactions.push({ userId, emoji, createdAt: new Date() });
    }

    await chat.save();

    emitToChat(req.app.get("io"), chatId, "message_reaction", {
      chatId,
      messageId,
      reactions: msg.reactions,
      reactedBy: userId,
    });

    res.status(200).json({ success: true, reactions: msg.reactions });
  } catch (error) {
    console.error("Error reacting to message:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Mute / unmute chat ───────────────────────────────────────────────────────
export const muteChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user.id;

    const chat = await Chat.findById(chatId);
    if (!chat)
      return res
        .status(404)
        .json({ success: false, message: "Chat not found" });
    if (!chat.participants.map((p) => p.toString()).includes(userId))
      return res.status(403).json({ success: false, message: "Unauthorized" });

    if (!chat.mutedBy) chat.mutedBy = [];
    const idx = chat.mutedBy.findIndex((id) => id.toString() === userId);

    if (idx !== -1) {
      chat.mutedBy.splice(idx, 1);
      await chat.save();
      return res
        .status(200)
        .json({ success: true, muted: false, message: "Chat unmuted" });
    } else {
      chat.mutedBy.push(userId);
      await chat.save();
      return res
        .status(200)
        .json({ success: true, muted: true, message: "Chat muted" });
    }
  } catch (error) {
    console.error("Error muting chat:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Upload image ─────────────────────────────────────────────────────────────
export const uploadChatImageHandler = async (req, res) => {
  try {
    if (!req.file)
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    res.json({
      success: true,
      data: {
        url: `/uploads/chats/${req.file.filename}`,
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
      },
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ success: false, message: "Failed to upload image" });
  }
};

// ─── Block / Unblock ──────────────────────────────────────────────────────────
export const blockUser = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user.id;

    const chat = await Chat.findById(chatId);
    if (!chat)
      return res
        .status(404)
        .json({ success: false, message: "Chat not found" });
    if (!chat.participants.map((p) => p.toString()).includes(userId))
      return res.status(403).json({ success: false, message: "Unauthorized" });

    chat.isBlocked = true;
    chat.blockedBy = userId;
    chat.blockedAt = new Date();
    await chat.save();

    emitToChat(req.app.get("io"), chatId, "user_blocked", {
      chatId,
      blockedBy: userId,
    });
    res
      .status(200)
      .json({ success: true, message: "User blocked successfully" });
  } catch (error) {
    console.error("Error blocking user:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const unblockUser = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user.id;

    const chat = await Chat.findById(chatId);
    if (!chat)
      return res
        .status(404)
        .json({ success: false, message: "Chat not found" });
    if (!chat.participants.map((p) => p.toString()).includes(userId))
      return res.status(403).json({ success: false, message: "Unauthorized" });

    chat.isBlocked = false;
    chat.blockedBy = null;
    chat.blockedAt = null;
    await chat.save();

    emitToChat(req.app.get("io"), chatId, "user_unblocked", { chatId });
    res
      .status(200)
      .json({ success: true, message: "User unblocked successfully" });
  } catch (error) {
    console.error("Error unblocking user:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Close chat (admin only) ──────────────────────────────────────────────────
export const closeChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user.id;

    if (req.user.role !== "admin")
      return res
        .status(403)
        .json({ success: false, message: "Only admins can close chats" });

    const chat = await Chat.findById(chatId);
    if (!chat)
      return res
        .status(404)
        .json({ success: false, message: "Chat not found" });

    chat.isActive = false;
    chat.closedBy = userId;
    chat.closedAt = new Date();
    await chat.save();

    res
      .status(200)
      .json({ success: true, message: "Chat closed successfully" });
  } catch (error) {
    console.error("Error closing chat:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Auto-delete messages older than 3 days ───────────────────────────────────
// Wire this up in your cron scheduler, e.g. with node-cron:
//
//   import cron from "node-cron";
//   import { autoDeleteExpiredMessages } from "./controllers/chatController.js";
//   cron.schedule("0 2 * * *", autoDeleteExpiredMessages); // 2 AM every day
//
export const autoDeleteExpiredMessages = async () => {
  try {
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
    const chats = await Chat.find({ isActive: true });
    let totalDeleted = 0;

    for (const chat of chats) {
      const before = chat.messages.length;
      chat.messages = chat.messages.filter(
        (msg) => new Date(msg.createdAt) > threeDaysAgo,
      );
      const deleted = before - chat.messages.length;

      if (deleted > 0) {
        totalDeleted += deleted;
        if (chat.messages.length > 0) {
          const last = chat.messages[chat.messages.length - 1];
          chat.lastMessage = last.isUnsent
            ? "Message unsent"
            : last.message || "📷 Image";
          chat.lastMessageAt = last.createdAt;
        } else {
          chat.lastMessage = "";
          chat.lastMessageAt = null;
        }
        await chat.save();
      }
    }

    console.log(`[AutoDelete] Cleaned ${totalDeleted} expired messages`);
    return totalDeleted;
  } catch (error) {
    console.error("[AutoDelete] Error:", error);
  }
};
