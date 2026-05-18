// // // import express from "express";
// // // import Chat from "../models/Chat.js";
// // // import User from "../models/User.js";
// // // import { protect, adminOnly } from "../middleware/authMiddleware.js";

// // // const router = express.Router();

// // // // Apply admin authentication to all routes
// // // router.use(protect, adminOnly);

// // // // Helper function to get the other participant
// // // const getOtherParticipant = (chat, adminId) => {
// // //   if (!chat.participants) return null;
// // //   const adminIdStr = adminId.toString();
// // //   const other = chat.participants.find(p => p._id.toString() !== adminIdStr);
// // //   return other || null;
// // // };

// // // // ─── GET /api/admin/chats ─────────────────────────────────────────────
// // // // Get all chats with optional filtering
// // // router.get("/", async (req, res) => {
// // //   try {
// // //     const { filter = "all", search = "" } = req.query;
// // //     const adminId = req.user._id;

// // //     let query = {
// // //       isActive: true,
// // //       participants: adminId
// // //     };

// // //     // Filter by chat type
// // //     if (filter === "vehicle") query.chatType = "vehicle";
// // //     else if (filter === "support") query.chatType = "support";
// // //     else if (filter === "booking") query.chatType = "booking";

// // //     let chats = await Chat.find(query)
// // //       .populate("participants", "name email profilePhoto role")
// // //       .sort({ lastMessageAt: -1, updatedAt: -1 });

// // //     // Apply search filter
// // //     if (search) {
// // //       const searchLower = search.toLowerCase();
// // //       chats = chats.filter(chat => {
// // //         const otherUser = getOtherParticipant(chat, adminId);
// // //         return (
// // //           otherUser?.name?.toLowerCase().includes(searchLower) ||
// // //           chat.vehicleName?.toLowerCase().includes(searchLower) ||
// // //           chat.lastMessage?.toLowerCase().includes(searchLower)
// // //         );
// // //       });
// // //     }

// // //     // Format chats for response
// // //     const formattedChats = chats.map(chat => {
// // //       const otherUser = getOtherParticipant(chat, adminId);
// // //       const unreadCount = chat.unreadCounts?.get(adminId.toString()) || 0;

// // //       return {
// // //         _id: chat._id,
// // //         chatType: chat.chatType,
// // //         participants: chat.participants,
// // //         vehicleId: chat.vehicleId,
// // //         vehicleName: chat.vehicleName,
// // //         vehicleNumber: chat.vehicleNumber,
// // //         title: chat.title,
// // //         lastMessage: chat.lastMessage,
// // //         lastMessageAt: chat.lastMessageAt || chat.updatedAt,
// // //         isActive: chat.isActive,
// // //         isBlocked: chat.isBlocked,
// // //         blockedBy: chat.blockedBy,
// // //         unreadCounts: chat.unreadCounts ? Object.fromEntries(chat.unreadCounts) : {},
// // //         unreadForAdmin: unreadCount,
// // //         otherParticipant: otherUser ? {
// // //           _id: otherUser._id,
// // //           name: otherUser.name,
// // //           email: otherUser.email,
// // //           profilePhoto: otherUser.profilePhoto,
// // //           role: otherUser.role,
// // //         } : null,
// // //       };
// // //     });

// // //     // If filter is "unread", only return chats with unread messages
// // //     const result = filter === "unread"
// // //       ? formattedChats.filter(c => c.unreadForAdmin > 0)
// // //       : formattedChats;

// // //     res.json({ success: true, data: result });
// // //   } catch (err) {
// // //     console.error("Admin get chats error:", err);
// // //     res.status(500).json({ success: false, message: "Server error" });
// // //   }
// // // });

// // // // ─── GET /api/admin/chats/:chatId ─────────────────────────────────────
// // // // Get a single chat with full message history
// // // router.get("/:chatId", async (req, res) => {
// // //   try {
// // //     const { chatId } = req.params;
// // //     const adminId = req.user._id;

// // //     const chat = await Chat.findById(chatId)
// // //       .populate("participants", "name email profilePhoto role")
// // //       .populate("messages.sender", "name email profilePhoto role");

// // //     if (!chat) {
// // //       return res.status(404).json({ success: false, message: "Chat not found" });
// // //     }

// // //     // Check if admin is a participant
// // //     if (!chat.participants.some(p => p._id.toString() === adminId.toString())) {
// // //       return res.status(403).json({ success: false, message: "Unauthorized" });
// // //     }

// // //     const otherUser = getOtherParticipant(chat, adminId);
// // //     const unreadCount = chat.unreadCounts?.get(adminId.toString()) || 0;

// // //     res.json({
// // //       success: true,
// // //       data: {
// // //         _id: chat._id,
// // //         chatType: chat.chatType,
// // //         participants: chat.participants,
// // //         vehicleId: chat.vehicleId,
// // //         vehicleName: chat.vehicleName,
// // //         vehicleNumber: chat.vehicleNumber,
// // //         title: chat.title,
// // //         messages: chat.messages || [],
// // //         lastMessage: chat.lastMessage,
// // //         lastMessageAt: chat.lastMessageAt,
// // //         isActive: chat.isActive,
// // //         isBlocked: chat.isBlocked,
// // //         blockedBy: chat.blockedBy,
// // //         unreadForAdmin: unreadCount,
// // //         otherParticipant: otherUser ? {
// // //           _id: otherUser._id,
// // //           name: otherUser.name,
// // //           email: otherUser.email,
// // //           profilePhoto: otherUser.profilePhoto,
// // //           role: otherUser.role,
// // //         } : null,
// // //       },
// // //     });
// // //   } catch (err) {
// // //     console.error("Admin get chat error:", err);
// // //     res.status(500).json({ success: false, message: "Server error" });
// // //   }
// // // });

// // // // ─── POST /api/admin/chats/:chatId/message ────────────────────────────
// // // // Send a message as admin
// // // router.post("/:chatId/message", async (req, res) => {
// // //   try {
// // //     const { chatId } = req.params;
// // //     const { message } = req.body;
// // //     const adminId = req.user._id;

// // //     if (!message?.trim()) {
// // //       return res.status(400).json({ success: false, message: "Message is required" });
// // //     }

// // //     const chat = await Chat.findById(chatId);
// // //     if (!chat) {
// // //       return res.status(404).json({ success: false, message: "Chat not found" });
// // //     }

// // //     // Check if admin is a participant
// // //     if (!chat.participants.includes(adminId)) {
// // //       return res.status(403).json({ success: false, message: "Unauthorized" });
// // //     }

// // //     // Check if chat is blocked by admin
// // //     if (chat.isBlocked && chat.blockedBy?.toString() === adminId.toString()) {
// // //       return res.status(403).json({ success: false, message: "Chat is blocked by you" });
// // //     }

// // //     // Create new message
// // //     const newMessage = {
// // //       sender: adminId,
// // //       senderType: "admin",
// // //       message: message.trim(),
// // //       read: false,
// // //       delivered: true,
// // //       createdAt: new Date(),
// // //     };

// // //     chat.messages.push(newMessage);
// // //     chat.lastMessage = message.trim();
// // //     chat.lastMessageAt = new Date();
// // //     chat.lastMessageSender = adminId;

// // //     // Update unread counts for other participants (not admin)
// // //     if (!chat.unreadCounts) {
// // //       chat.unreadCounts = new Map();
// // //     }
// // //     for (const participantId of chat.participants) {
// // //       if (participantId.toString() !== adminId.toString()) {
// // //         const currentUnread = chat.unreadCounts.get(participantId.toString()) || 0;
// // //         chat.unreadCounts.set(participantId.toString(), currentUnread + 1);
// // //       }
// // //     }

// // //     // Reset admin's unread count
// // //     chat.unreadCounts.set(adminId.toString(), 0);

// // //     await chat.save();

// // //     // Get the saved message with sender details
// // //     const savedMessage = chat.messages[chat.messages.length - 1];
// // //     const sender = await User.findById(adminId).select("name email profilePhoto role");

// // //     const messageToReturn = {
// // //       _id: savedMessage._id,
// // //       message: savedMessage.message,
// // //       senderType: savedMessage.senderType,
// // //       read: savedMessage.read,
// // //       delivered: savedMessage.delivered,
// // //       createdAt: savedMessage.createdAt,
// // //       sender: {
// // //         _id: adminId,
// // //         name: sender.name,
// // //         email: sender.email,
// // //         profilePhoto: sender.profilePhoto,
// // //         role: sender.role,
// // //       },
// // //     };

// // //     // Emit via Socket.IO if available
// // //     const io = req.app.get("io");
// // //     if (io) {
// // //       // Emit to the chat room
// // //       io.to(`chat_${chatId}`).emit("new_message", {
// // //         chatId,
// // //         message: messageToReturn,
// // //       });

// // //       // Send notifications to other participants
// // //       for (const participantId of chat.participants) {
// // //         if (participantId.toString() !== adminId.toString()) {
// // //           io.to(`user_${participantId}`).emit("new_message_notification", {
// // //             chatId,
// // //             from: sender.name,
// // //             message: message.substring(0, 100),
// // //           });
// // //         }
// // //       }
// // //     }

// // //     res.json({ success: true, data: messageToReturn });
// // //   } catch (err) {
// // //     console.error("Admin send message error:", err);
// // //     res.status(500).json({ success: false, message: "Server error" });
// // //   }
// // // });

// // // // ─── PUT /api/admin/chats/:chatId/read ────────────────────────────────
// // // // Mark all messages as read for admin
// // // router.put("/:chatId/read", async (req, res) => {
// // //   try {
// // //     const { chatId } = req.params;
// // //     const adminId = req.user._id;

// // //     const chat = await Chat.findById(chatId);
// // //     if (!chat) {
// // //       return res.status(404).json({ success: false, message: "Chat not found" });
// // //     }

// // //     // Mark all messages from others as read
// // //     let updated = false;
// // //     chat.messages.forEach((message) => {
// // //       if (message.sender.toString() !== adminId.toString() && !message.read) {
// // //         message.read = true;
// // //         message.readAt = new Date();
// // //         updated = true;
// // //       }
// // //     });

// // //     // Reset admin's unread count
// // //     if (!chat.unreadCounts) {
// // //       chat.unreadCounts = new Map();
// // //     }
// // //     chat.unreadCounts.set(adminId.toString(), 0);

// // //     if (updated) {
// // //       await chat.save();
// // //     }

// // //     res.json({ success: true, message: "Messages marked as read" });
// // //   } catch (err) {
// // //     console.error("Admin mark read error:", err);
// // //     res.status(500).json({ success: false, message: "Server error" });
// // //   }
// // // });

// // // // ─── PUT /api/admin/chats/:chatId/block ───────────────────────────────
// // // // Block a user from chatting (admin blocks the other participant)
// // // router.put("/:chatId/block", async (req, res) => {
// // //   try {
// // //     const { chatId } = req.params;
// // //     const adminId = req.user._id;

// // //     const chat = await Chat.findById(chatId);
// // //     if (!chat) {
// // //       return res.status(404).json({ success: false, message: "Chat not found" });
// // //     }

// // //     if (!chat.participants.includes(adminId)) {
// // //       return res.status(403).json({ success: false, message: "Unauthorized" });
// // //     }

// // //     chat.isBlocked = true;
// // //     chat.blockedBy = adminId;
// // //     chat.blockedAt = new Date();
// // //     await chat.save();

// // //     // Emit block event
// // //     const io = req.app.get("io");
// // //     if (io) {
// // //       io.to(`chat_${chatId}`).emit("user_blocked", { chatId, blockedBy: adminId });
// // //     }

// // //     res.json({ success: true, message: "User blocked successfully" });
// // //   } catch (err) {
// // //     console.error("Admin block error:", err);
// // //     res.status(500).json({ success: false, message: "Server error" });
// // //   }
// // // });

// // // // ─── PUT /api/admin/chats/:chatId/unblock ─────────────────────────────
// // // // Unblock a user
// // // router.put("/:chatId/unblock", async (req, res) => {
// // //   try {
// // //     const { chatId } = req.params;
// // //     const adminId = req.user._id;

// // //     const chat = await Chat.findById(chatId);
// // //     if (!chat) {
// // //       return res.status(404).json({ success: false, message: "Chat not found" });
// // //     }

// // //     chat.isBlocked = false;
// // //     chat.blockedBy = null;
// // //     chat.blockedAt = null;
// // //     await chat.save();

// // //     res.json({ success: true, message: "User unblocked successfully" });
// // //   } catch (err) {
// // //     console.error("Admin unblock error:", err);
// // //     res.status(500).json({ success: false, message: "Server error" });
// // //   }
// // // });

// // // // ─── GET /api/admin/chats/unread/count ────────────────────────────────
// // // // Get total unread count for admin across all chats
// // // router.get("/unread/count", async (req, res) => {
// // //   try {
// // //     const adminId = req.user._id;

// // //     const chats = await Chat.find({
// // //       participants: adminId,
// // //       isActive: true,
// // //     });

// // //     let totalUnread = 0;
// // //     chats.forEach((chat) => {
// // //       totalUnread += chat.unreadCounts?.get(adminId.toString()) || 0;
// // //     });

// // //     res.json({ success: true, count: totalUnread });
// // //   } catch (err) {
// // //     console.error("Admin unread count error:", err);
// // //     res.status(500).json({ success: false, message: "Server error" });
// // //   }
// // // });

// // // export default router;

// // import express from "express";
// // import Chat from "../models/Chat.js";
// // import User from "../models/User.js";
// // import { protect, adminOnly } from "../middleware/authMiddleware.js";

// // const router = express.Router();

// // // Apply admin authentication to all routes
// // router.use(protect, adminOnly);

// // // Helper function to get the other participant
// // const getOtherParticipant = (chat, adminId) => {
// //   if (!chat || !chat.participants) return null;
// //   const adminIdStr = adminId.toString();
// //   const other = chat.participants.find(p => p && p._id && p._id.toString() !== adminIdStr);
// //   return other || null;
// // };

// // // GET /api/admin/chats - Get all chats
// // router.get("/", async (req, res) => {
// //   try {
// //     const { filter = "all", search = "" } = req.query;
// //     const adminId = req.user._id;

// //     let query = {
// //       isActive: true,
// //       participants: adminId
// //     };

// //     if (filter === "vehicle") query.chatType = "vehicle";
// //     else if (filter === "support") query.chatType = "support";
// //     else if (filter === "booking") query.chatType = "booking";

// //     let chats = await Chat.find(query)
// //       .populate("participants", "name email profilePhoto role")
// //       .sort({ lastMessageAt: -1, updatedAt: -1 });

// //     if (search) {
// //       const searchLower = search.toLowerCase();
// //       chats = chats.filter(chat => {
// //         const otherUser = getOtherParticipant(chat, adminId);
// //         return (
// //           otherUser?.name?.toLowerCase().includes(searchLower) ||
// //           chat.vehicleName?.toLowerCase().includes(searchLower) ||
// //           chat.lastMessage?.toLowerCase().includes(searchLower)
// //         );
// //       });
// //     }

// //     const formattedChats = chats.map(chat => {
// //       const otherUser = getOtherParticipant(chat, adminId);
// //       const unreadCount = chat.unreadCounts?.get(adminId.toString()) || 0;

// //       return {
// //         _id: chat._id,
// //         chatType: chat.chatType,
// //         participants: chat.participants,
// //         vehicleId: chat.vehicleId,
// //         vehicleName: chat.vehicleName,
// //         vehicleNumber: chat.vehicleNumber,
// //         title: chat.title,
// //         lastMessage: chat.lastMessage,
// //         lastMessageAt: chat.lastMessageAt || chat.updatedAt,
// //         isActive: chat.isActive,
// //         isBlocked: chat.isBlocked,
// //         blockedBy: chat.blockedBy,
// //         unreadCounts: chat.unreadCounts ? Object.fromEntries(chat.unreadCounts) : {},
// //         unreadForAdmin: unreadCount,
// //         otherParticipant: otherUser ? {
// //           _id: otherUser._id,
// //           name: otherUser.name,
// //           email: otherUser.email,
// //           profilePhoto: otherUser.profilePhoto,
// //           role: otherUser.role,
// //         } : null,
// //       };
// //     });

// //     const result = filter === "unread"
// //       ? formattedChats.filter(c => c.unreadForAdmin > 0)
// //       : formattedChats;

// //     res.json({ success: true, data: result });
// //   } catch (err) {
// //     console.error("Admin get chats error:", err);
// //     res.status(500).json({ success: false, message: "Server error" });
// //   }
// // });

// // // GET /api/admin/chats/:chatId - Get single chat
// // router.get("/:chatId", async (req, res) => {
// //   try {
// //     const { chatId } = req.params;
// //     const adminId = req.user._id;

// //     const chat = await Chat.findById(chatId)
// //       .populate("participants", "name email profilePhoto role")
// //       .populate("messages.sender", "name email profilePhoto role");

// //     if (!chat) {
// //       return res.status(404).json({ success: false, message: "Chat not found" });
// //     }

// //     if (!chat.participants.some(p => p._id.toString() === adminId.toString())) {
// //       return res.status(403).json({ success: false, message: "Unauthorized" });
// //     }

// //     const otherUser = getOtherParticipant(chat, adminId);
// //     const unreadCount = chat.unreadCounts?.get(adminId.toString()) || 0;

// //     res.json({
// //       success: true,
// //       data: {
// //         _id: chat._id,
// //         chatType: chat.chatType,
// //         participants: chat.participants,
// //         vehicleId: chat.vehicleId,
// //         vehicleName: chat.vehicleName,
// //         vehicleNumber: chat.vehicleNumber,
// //         title: chat.title,
// //         messages: chat.messages || [],
// //         lastMessage: chat.lastMessage,
// //         lastMessageAt: chat.lastMessageAt,
// //         isActive: chat.isActive,
// //         isBlocked: chat.isBlocked,
// //         blockedBy: chat.blockedBy,
// //         unreadForAdmin: unreadCount,
// //         otherParticipant: otherUser ? {
// //           _id: otherUser._id,
// //           name: otherUser.name,
// //           email: otherUser.email,
// //           profilePhoto: otherUser.profilePhoto,
// //           role: otherUser.role,
// //         } : null,
// //       },
// //     });
// //   } catch (err) {
// //     console.error("Admin get chat error:", err);
// //     res.status(500).json({ success: false, message: "Server error" });
// //   }
// // });

// // // POST /api/admin/chats/:chatId/message - Send message as admin
// // router.post("/:chatId/message", async (req, res) => {
// //   try {
// //     const { chatId } = req.params;
// //     const { message } = req.body;
// //     const adminId = req.user._id;

// //     if (!message?.trim()) {
// //       return res.status(400).json({ success: false, message: "Message is required" });
// //     }

// //     const chat = await Chat.findById(chatId);
// //     if (!chat) {
// //       return res.status(404).json({ success: false, message: "Chat not found" });
// //     }

// //     if (!chat.participants.includes(adminId)) {
// //       return res.status(403).json({ success: false, message: "Unauthorized" });
// //     }

// //     if (chat.isBlocked && chat.blockedBy?.toString() === adminId.toString()) {
// //       return res.status(403).json({ success: false, message: "Chat is blocked by you" });
// //     }

// //     const newMessage = {
// //       sender: adminId,
// //       senderType: "admin",
// //       message: message.trim(),
// //       read: false,
// //       delivered: true,
// //       createdAt: new Date(),
// //     };

// //     chat.messages.push(newMessage);
// //     chat.lastMessage = message.trim();
// //     chat.lastMessageAt = new Date();
// //     chat.lastMessageSender = adminId;

// //     if (!chat.unreadCounts) {
// //       chat.unreadCounts = new Map();
// //     }
// //     for (const participantId of chat.participants) {
// //       if (participantId.toString() !== adminId.toString()) {
// //         const currentUnread = chat.unreadCounts.get(participantId.toString()) || 0;
// //         chat.unreadCounts.set(participantId.toString(), currentUnread + 1);
// //       }
// //     }
// //     chat.unreadCounts.set(adminId.toString(), 0);

// //     await chat.save();

// //     const sender = await User.findById(adminId).select("name email profilePhoto role");
// //     const savedMessage = chat.messages[chat.messages.length - 1];

// //     const messageToReturn = {
// //       _id: savedMessage._id,
// //       message: savedMessage.message,
// //       senderType: savedMessage.senderType,
// //       read: savedMessage.read,
// //       delivered: savedMessage.delivered,
// //       createdAt: savedMessage.createdAt,
// //       sender: {
// //         _id: adminId,
// //         name: sender.name,
// //         email: sender.email,
// //         profilePhoto: sender.profilePhoto,
// //         role: sender.role,
// //       },
// //     };

// //     const io = req.app.get("io");
// //     if (io) {
// //       io.to(`chat_${chatId}`).emit("new_message", {
// //         chatId,
// //         message: messageToReturn,
// //       });

// //       for (const participantId of chat.participants) {
// //         if (participantId.toString() !== adminId.toString()) {
// //           io.to(`user_${participantId}`).emit("new_message_notification", {
// //             chatId,
// //             from: sender.name,
// //             message: message.substring(0, 100),
// //           });
// //         }
// //       }
// //     }

// //     res.json({ success: true, data: messageToReturn });
// //   } catch (err) {
// //     console.error("Admin send message error:", err);
// //     res.status(500).json({ success: false, message: "Server error" });
// //   }
// // });

// // // PUT /api/admin/chats/:chatId/read - Mark messages as read
// // router.put("/:chatId/read", async (req, res) => {
// //   try {
// //     const { chatId } = req.params;
// //     const adminId = req.user._id;

// //     const chat = await Chat.findById(chatId);
// //     if (!chat) {
// //       return res.status(404).json({ success: false, message: "Chat not found" });
// //     }

// //     let updated = false;
// //     chat.messages.forEach((message) => {
// //       if (message.sender.toString() !== adminId.toString() && !message.read) {
// //         message.read = true;
// //         message.readAt = new Date();
// //         updated = true;
// //       }
// //     });

// //     if (!chat.unreadCounts) {
// //       chat.unreadCounts = new Map();
// //     }
// //     chat.unreadCounts.set(adminId.toString(), 0);

// //     if (updated) {
// //       await chat.save();
// //     }

// //     res.json({ success: true, message: "Messages marked as read" });
// //   } catch (err) {
// //     console.error("Admin mark read error:", err);
// //     res.status(500).json({ success: false, message: "Server error" });
// //   }
// // });

// // // PUT /api/admin/chats/:chatId/block - Block user
// // router.put("/:chatId/block", async (req, res) => {
// //   try {
// //     const { chatId } = req.params;
// //     const adminId = req.user._id;

// //     const chat = await Chat.findById(chatId);
// //     if (!chat) {
// //       return res.status(404).json({ success: false, message: "Chat not found" });
// //     }

// //     if (!chat.participants.includes(adminId)) {
// //       return res.status(403).json({ success: false, message: "Unauthorized" });
// //     }

// //     chat.isBlocked = true;
// //     chat.blockedBy = adminId;
// //     chat.blockedAt = new Date();
// //     await chat.save();

// //     const io = req.app.get("io");
// //     if (io) {
// //       io.to(`chat_${chatId}`).emit("user_blocked", { chatId, blockedBy: adminId });
// //     }

// //     res.json({ success: true, message: "User blocked successfully" });
// //   } catch (err) {
// //     console.error("Admin block error:", err);
// //     res.status(500).json({ success: false, message: "Server error" });
// //   }
// // });

// // // PUT /api/admin/chats/:chatId/unblock - Unblock user
// // router.put("/:chatId/unblock", async (req, res) => {
// //   try {
// //     const { chatId } = req.params;
// //     const adminId = req.user._id;

// //     const chat = await Chat.findById(chatId);
// //     if (!chat) {
// //       return res.status(404).json({ success: false, message: "Chat not found" });
// //     }

// //     chat.isBlocked = false;
// //     chat.blockedBy = null;
// //     chat.blockedAt = null;
// //     await chat.save();

// //     res.json({ success: true, message: "User unblocked successfully" });
// //   } catch (err) {
// //     console.error("Admin unblock error:", err);
// //     res.status(500).json({ success: false, message: "Server error" });
// //   }
// // });

// // // GET /api/admin/chats/unread/count - Get unread count
// // router.get("/unread/count", async (req, res) => {
// //   try {
// //     const adminId = req.user._id;

// //     const chats = await Chat.find({
// //       participants: adminId,
// //       isActive: true,
// //     });

// //     let totalUnread = 0;
// //     chats.forEach((chat) => {
// //       totalUnread += chat.unreadCounts?.get(adminId.toString()) || 0;
// //     });

// //     res.json({ success: true, count: totalUnread });
// //   } catch (err) {
// //     console.error("Admin unread count error:", err);
// //     res.status(500).json({ success: false, message: "Server error" });
// //   }
// // });

// // export default router;

// import express from "express";
// import Chat from "../models/Chat.js";
// import User from "../models/User.js";
// import { protect, adminOnly } from "../middleware/authMiddleware.js";
// import { uploadChatImage, uploadChatImageHandler, sendMessage } from "../controllers/chatController.js";

// const router = express.Router();

// // Apply admin authentication to all routes
// router.use(protect, adminOnly);

// // Helper function to get the other participant
// const getOtherParticipant = (chat, adminId) => {
//   if (!chat || !chat.participants) return null;
//   const adminIdStr = adminId.toString();
//   const other = chat.participants.find(p => p && p._id && p._id.toString() !== adminIdStr);
//   return other || null;
// };

// // GET /api/admin/chats - Get all chats
// router.get("/", async (req, res) => {
//   try {
//     const { filter = "all", search = "" } = req.query;
//     const adminId = req.user._id;

//     let query = {
//       isActive: true,
//       participants: adminId
//     };

//     if (filter === "vehicle") query.chatType = "vehicle";
//     else if (filter === "support") query.chatType = "support";
//     else if (filter === "booking") query.chatType = "booking";

//     let chats = await Chat.find(query)
//       .populate("participants", "name email profilePhoto role")
//       .sort({ lastMessageAt: -1, updatedAt: -1 });

//     if (search) {
//       const searchLower = search.toLowerCase();
//       chats = chats.filter(chat => {
//         const otherUser = getOtherParticipant(chat, adminId);
//         return (
//           otherUser?.name?.toLowerCase().includes(searchLower) ||
//           chat.vehicleName?.toLowerCase().includes(searchLower) ||
//           chat.lastMessage?.toLowerCase().includes(searchLower)
//         );
//       });
//     }

//     const formattedChats = chats.map(chat => {
//       const otherUser = getOtherParticipant(chat, adminId);
//       const unreadCount = chat.unreadCounts?.get(adminId.toString()) || 0;

//       return {
//         _id: chat._id,
//         chatType: chat.chatType,
//         participants: chat.participants,
//         vehicleId: chat.vehicleId,
//         vehicleName: chat.vehicleName,
//         title: chat.title,
//         lastMessage: chat.lastMessage,
//         lastMessageAt: chat.lastMessageAt || chat.updatedAt,
//         isActive: chat.isActive,
//         isBlocked: chat.isBlocked,
//         blockedBy: chat.blockedBy,
//         unreadCounts: chat.unreadCounts ? Object.fromEntries(chat.unreadCounts) : {},
//         unreadForAdmin: unreadCount,
//         otherParticipant: otherUser ? {
//           _id: otherUser._id,
//           name: otherUser.name,
//           email: otherUser.email,
//           profilePhoto: otherUser.profilePhoto,
//           role: otherUser.role,
//         } : null,
//       };
//     });

//     const result = filter === "unread"
//       ? formattedChats.filter(c => c.unreadForAdmin > 0)
//       : formattedChats;

//     res.json({ success: true, data: result });
//   } catch (err) {
//     console.error("Admin get chats error:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // GET /api/admin/chats/:chatId - Get single chat
// router.get("/:chatId", async (req, res) => {
//   try {
//     const { chatId } = req.params;
//     const adminId = req.user._id;

//     const chat = await Chat.findById(chatId)
//       .populate("participants", "name email profilePhoto role")
//       .populate("messages.sender", "name email profilePhoto role");

//     if (!chat) {
//       return res.status(404).json({ success: false, message: "Chat not found" });
//     }

//     if (!chat.participants.some(p => p._id.toString() === adminId.toString())) {
//       return res.status(403).json({ success: false, message: "Unauthorized" });
//     }

//     const otherUser = getOtherParticipant(chat, adminId);
//     const unreadCount = chat.unreadCounts?.get(adminId.toString()) || 0;

//     res.json({
//       success: true,
//       data: {
//         _id: chat._id,
//         chatType: chat.chatType,
//         participants: chat.participants,
//         vehicleId: chat.vehicleId,
//         vehicleName: chat.vehicleName,
//         title: chat.title,
//         messages: chat.messages || [],
//         lastMessage: chat.lastMessage,
//         lastMessageAt: chat.lastMessageAt,
//         isActive: chat.isActive,
//         isBlocked: chat.isBlocked,
//         blockedBy: chat.blockedBy,
//         unreadForAdmin: unreadCount,
//         otherParticipant: otherUser ? {
//           _id: otherUser._id,
//           name: otherUser.name,
//           email: otherUser.email,
//           profilePhoto: otherUser.profilePhoto,
//           role: otherUser.role,
//         } : null,
//       },
//     });
//   } catch (err) {
//     console.error("Admin get chat error:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // POST /api/admin/chats/:chatId/message - Send message as admin
// router.post("/:chatId/message", async (req, res) => {
//   try {
//     const { chatId } = req.params;
//     const { message } = req.body;
//     const adminId = req.user._id;

//     if (!message?.trim()) {
//       return res.status(400).json({ success: false, message: "Message is required" });
//     }

//     const chat = await Chat.findById(chatId);
//     if (!chat) {
//       return res.status(404).json({ success: false, message: "Chat not found" });
//     }

//     if (!chat.participants.includes(adminId)) {
//       return res.status(403).json({ success: false, message: "Unauthorized" });
//     }

//     if (chat.isBlocked && chat.blockedBy?.toString() === adminId.toString()) {
//       return res.status(403).json({ success: false, message: "Chat is blocked by you" });
//     }

//     const newMessage = {
//       sender: adminId,
//       senderType: "admin",
//       message: message.trim(),
//       read: false,
//       delivered: true,
//       createdAt: new Date(),
//       attachments: [],
//     };

//     chat.messages.push(newMessage);
//     chat.lastMessage = message.trim();
//     chat.lastMessageAt = new Date();
//     chat.lastMessageSender = adminId;

//     if (!chat.unreadCounts) {
//       chat.unreadCounts = new Map();
//     }
//     for (const participantId of chat.participants) {
//       if (participantId.toString() !== adminId.toString()) {
//         const currentUnread = chat.unreadCounts.get(participantId.toString()) || 0;
//         chat.unreadCounts.set(participantId.toString(), currentUnread + 1);
//       }
//     }
//     chat.unreadCounts.set(adminId.toString(), 0);

//     await chat.save();

//     const sender = await User.findById(adminId).select("name email profilePhoto role");
//     const savedMessage = chat.messages[chat.messages.length - 1];

//     const messageToReturn = {
//       _id: savedMessage._id,
//       message: savedMessage.message,
//       senderType: savedMessage.senderType,
//       read: savedMessage.read,
//       delivered: savedMessage.delivered,
//       createdAt: savedMessage.createdAt,
//       attachments: savedMessage.attachments,
//       sender: {
//         _id: adminId,
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
//       });

//       for (const participantId of chat.participants) {
//         if (participantId.toString() !== adminId.toString()) {
//           io.to(`user_${participantId}`).emit("new_message_notification", {
//             chatId,
//             from: sender.name,
//             message: message.substring(0, 100),
//           });
//         }
//       }
//     }

//     res.json({ success: true, data: messageToReturn });
//   } catch (err) {
//     console.error("Admin send message error:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // POST /api/admin/chats/:chatId/image - Upload image as admin
// router.post("/:chatId/image", uploadChatImage, async (req, res) => {
//   try {
//     const { chatId } = req.params;
//     const adminId = req.user._id;

//     if (!req.file) {
//       return res.status(400).json({ success: false, message: "No file uploaded" });
//     }

//     const chat = await Chat.findById(chatId);
//     if (!chat) {
//       return res.status(404).json({ success: false, message: "Chat not found" });
//     }

//     if (!chat.participants.includes(adminId)) {
//       return res.status(403).json({ success: false, message: "Unauthorized" });
//     }

//     if (chat.isBlocked && chat.blockedBy?.toString() === adminId.toString()) {
//       return res.status(403).json({ success: false, message: "Chat is blocked by you" });
//     }

//     const newMessage = {
//       sender: adminId,
//       senderType: "admin",
//       message: "",
//       read: false,
//       delivered: true,
//       createdAt: new Date(),
//       attachments: [{
//         type: "image",
//         url: `/uploads/chats/${req.file.filename}`,
//         filename: req.file.filename,
//         originalName: req.file.originalname,
//         size: req.file.size,
//         mimeType: req.file.mimetype,
//       }],
//     };

//     chat.messages.push(newMessage);
//     chat.lastMessage = "📷 Image";
//     chat.lastMessageAt = new Date();
//     chat.lastMessageSender = adminId;

//     if (!chat.unreadCounts) {
//       chat.unreadCounts = new Map();
//     }
//     for (const participantId of chat.participants) {
//       if (participantId.toString() !== adminId.toString()) {
//         const currentUnread = chat.unreadCounts.get(participantId.toString()) || 0;
//         chat.unreadCounts.set(participantId.toString(), currentUnread + 1);
//       }
//     }
//     chat.unreadCounts.set(adminId.toString(), 0);

//     await chat.save();

//     const sender = await User.findById(adminId).select("name email profilePhoto role");
//     const savedMessage = chat.messages[chat.messages.length - 1];

//     const messageToReturn = {
//       _id: savedMessage._id,
//       message: savedMessage.message,
//       senderType: savedMessage.senderType,
//       read: savedMessage.read,
//       delivered: savedMessage.delivered,
//       createdAt: savedMessage.createdAt,
//       attachments: savedMessage.attachments,
//       sender: {
//         _id: adminId,
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
//       });

//       for (const participantId of chat.participants) {
//         if (participantId.toString() !== adminId.toString()) {
//           io.to(`user_${participantId}`).emit("new_message_notification", {
//             chatId,
//             from: sender.name,
//             message: "📷 Image",
//           });
//         }
//       }
//     }

//     res.json({ success: true, data: messageToReturn });
//   } catch (err) {
//     console.error("Admin upload image error:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // PUT /api/admin/chats/:chatId/read - Mark messages as read
// router.put("/:chatId/read", async (req, res) => {
//   try {
//     const { chatId } = req.params;
//     const adminId = req.user._id;

//     const chat = await Chat.findById(chatId);
//     if (!chat) {
//       return res.status(404).json({ success: false, message: "Chat not found" });
//     }

//     let updated = false;
//     chat.messages.forEach((message) => {
//       if (message.sender.toString() !== adminId.toString() && !message.read) {
//         message.read = true;
//         message.readAt = new Date();
//         updated = true;
//       }
//     });

//     if (!chat.unreadCounts) {
//       chat.unreadCounts = new Map();
//     }
//     chat.unreadCounts.set(adminId.toString(), 0);

//     if (updated) {
//       await chat.save();
//     }

//     res.json({ success: true, message: "Messages marked as read" });
//   } catch (err) {
//     console.error("Admin mark read error:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // PUT /api/admin/chats/:chatId/block - Block user
// router.put("/:chatId/block", async (req, res) => {
//   try {
//     const { chatId } = req.params;
//     const adminId = req.user._id;

//     const chat = await Chat.findById(chatId);
//     if (!chat) {
//       return res.status(404).json({ success: false, message: "Chat not found" });
//     }

//     if (!chat.participants.includes(adminId)) {
//       return res.status(403).json({ success: false, message: "Unauthorized" });
//     }

//     chat.isBlocked = true;
//     chat.blockedBy = adminId;
//     chat.blockedAt = new Date();
//     await chat.save();

//     const io = req.app.get("io");
//     if (io) {
//       io.to(`chat_${chatId}`).emit("user_blocked", { chatId, blockedBy: adminId });
//     }

//     res.json({ success: true, message: "User blocked successfully" });
//   } catch (err) {
//     console.error("Admin block error:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // PUT /api/admin/chats/:chatId/unblock - Unblock user
// router.put("/:chatId/unblock", async (req, res) => {
//   try {
//     const { chatId } = req.params;
//     const adminId = req.user._id;

//     const chat = await Chat.findById(chatId);
//     if (!chat) {
//       return res.status(404).json({ success: false, message: "Chat not found" });
//     }

//     chat.isBlocked = false;
//     chat.blockedBy = null;
//     chat.blockedAt = null;
//     await chat.save();

//     res.json({ success: true, message: "User unblocked successfully" });
//   } catch (err) {
//     console.error("Admin unblock error:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // GET /api/admin/chats/unread/count - Get unread count
// router.get("/unread/count", async (req, res) => {
//   try {
//     const adminId = req.user._id;

//     const chats = await Chat.find({
//       participants: adminId,
//       isActive: true,
//     });

//     let totalUnread = 0;
//     chats.forEach((chat) => {
//       totalUnread += chat.unreadCounts?.get(adminId.toString()) || 0;
//     });

//     res.json({ success: true, count: totalUnread });
//   } catch (err) {
//     console.error("Admin unread count error:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// export default router;

import express from "express";
import Chat from "../models/Chat.js";
import User from "../models/User.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import {
  uploadChatImage,
  uploadChatImageHandler,
  sendMessage,
} from "../controllers/chatController.js";

const router = express.Router();

// Apply admin authentication to all routes
router.use(protect, adminOnly);

// Helper function to get the other participant
const getOtherParticipant = (chat, adminId) => {
  if (!chat || !chat.participants) return null;
  const adminIdStr = adminId.toString();
  const other = chat.participants.find(
    (p) => p && p._id && p._id.toString() !== adminIdStr,
  );
  return other || null;
};

// GET /api/admin/chats - Get all chats
router.get("/", async (req, res) => {
  try {
    const { filter = "all", search = "" } = req.query;
    const adminId = req.user._id;

    let query = {
      isActive: true,
      participants: adminId,
    };

    if (filter === "vehicle") query.chatType = "vehicle";
    else if (filter === "support") query.chatType = "support";
    else if (filter === "booking") query.chatType = "booking";

    let chats = await Chat.find(query)
      .populate("participants", "name email profilePhoto role")
      .sort({ lastMessageAt: -1, updatedAt: -1 });

    if (search) {
      const searchLower = search.toLowerCase();
      chats = chats.filter((chat) => {
        const otherUser = getOtherParticipant(chat, adminId);
        return (
          otherUser?.name?.toLowerCase().includes(searchLower) ||
          chat.vehicleName?.toLowerCase().includes(searchLower) ||
          chat.lastMessage?.toLowerCase().includes(searchLower)
        );
      });
    }

    const formattedChats = chats.map((chat) => {
      const otherUser = getOtherParticipant(chat, adminId);
      const unreadCount = chat.unreadCounts?.get(adminId.toString()) || 0;

      return {
        _id: chat._id,
        chatType: chat.chatType,
        participants: chat.participants,
        vehicleId: chat.vehicleId,
        vehicleName: chat.vehicleName,
        title: chat.title,
        lastMessage: chat.lastMessage,
        lastMessageAt: chat.lastMessageAt || chat.updatedAt,
        isActive: chat.isActive,
        isBlocked: chat.isBlocked,
        blockedBy: chat.blockedBy,
        unreadCounts: chat.unreadCounts
          ? Object.fromEntries(chat.unreadCounts)
          : {},
        unreadForAdmin: unreadCount,
        otherParticipant: otherUser
          ? {
              _id: otherUser._id,
              name: otherUser.name,
              email: otherUser.email,
              profilePhoto: otherUser.profilePhoto,
              role: otherUser.role,
            }
          : null,
      };
    });

    const result =
      filter === "unread"
        ? formattedChats.filter((c) => c.unreadForAdmin > 0)
        : formattedChats;

    res.json({ success: true, data: result });
  } catch (err) {
    console.error("Admin get chats error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/admin/chats/direct - Get or create a direct support chat with a user
// IMPORTANT: must be defined BEFORE /:chatId routes
// ─────────────────────────────────────────────────────────────────────────────
router.post("/direct", async (req, res) => {
  try {
    const { userId } = req.body;
    const adminId = req.user._id;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "userId is required" });
    }

    // Check if the target user exists
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Try to find an existing support chat between this admin and the user
    let chat = await Chat.findOne({
      participants: { $all: [adminId, userId] },
      chatType: "support",
    }).populate("participants", "name email profilePhoto role");

    // If none exists, create a fresh one
    if (!chat) {
      const newChat = await Chat.create({
        participants: [adminId, userId],
        chatType: "support",
        isActive: true,
        unreadCounts: new Map(),
      });

      chat = await Chat.findById(newChat._id).populate(
        "participants",
        "name email profilePhoto role",
      );
    }

    res.json({ success: true, data: chat });
  } catch (err) {
    console.error("Admin direct chat error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET /api/admin/chats/:chatId - Get single chat
router.get("/:chatId", async (req, res) => {
  try {
    const { chatId } = req.params;
    const adminId = req.user._id;

    const chat = await Chat.findById(chatId)
      .populate("participants", "name email profilePhoto role")
      .populate("messages.sender", "name email profilePhoto role");

    if (!chat) {
      return res
        .status(404)
        .json({ success: false, message: "Chat not found" });
    }

    if (
      !chat.participants.some((p) => p._id.toString() === adminId.toString())
    ) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    const otherUser = getOtherParticipant(chat, adminId);
    const unreadCount = chat.unreadCounts?.get(adminId.toString()) || 0;

    res.json({
      success: true,
      data: {
        _id: chat._id,
        chatType: chat.chatType,
        participants: chat.participants,
        vehicleId: chat.vehicleId,
        vehicleName: chat.vehicleName,
        title: chat.title,
        messages: chat.messages || [],
        lastMessage: chat.lastMessage,
        lastMessageAt: chat.lastMessageAt,
        isActive: chat.isActive,
        isBlocked: chat.isBlocked,
        blockedBy: chat.blockedBy,
        unreadForAdmin: unreadCount,
        otherParticipant: otherUser
          ? {
              _id: otherUser._id,
              name: otherUser.name,
              email: otherUser.email,
              profilePhoto: otherUser.profilePhoto,
              role: otherUser.role,
            }
          : null,
      },
    });
  } catch (err) {
    console.error("Admin get chat error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// POST /api/admin/chats/:chatId/message - Send message as admin
router.post("/:chatId/message", async (req, res) => {
  try {
    const { chatId } = req.params;
    const { message } = req.body;
    const adminId = req.user._id;

    if (!message?.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Message is required" });
    }

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res
        .status(404)
        .json({ success: false, message: "Chat not found" });
    }

    if (!chat.participants.includes(adminId)) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    if (chat.isBlocked && chat.blockedBy?.toString() === adminId.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Chat is blocked by you" });
    }

    const newMessage = {
      sender: adminId,
      senderType: "admin",
      message: message.trim(),
      read: false,
      delivered: true,
      createdAt: new Date(),
      attachments: [],
    };

    chat.messages.push(newMessage);
    chat.lastMessage = message.trim();
    chat.lastMessageAt = new Date();
    chat.lastMessageSender = adminId;

    if (!chat.unreadCounts) {
      chat.unreadCounts = new Map();
    }
    for (const participantId of chat.participants) {
      if (participantId.toString() !== adminId.toString()) {
        const currentUnread =
          chat.unreadCounts.get(participantId.toString()) || 0;
        chat.unreadCounts.set(participantId.toString(), currentUnread + 1);
      }
    }
    chat.unreadCounts.set(adminId.toString(), 0);

    await chat.save();

    const sender = await User.findById(adminId).select(
      "name email profilePhoto role",
    );
    const savedMessage = chat.messages[chat.messages.length - 1];

    const messageToReturn = {
      _id: savedMessage._id,
      message: savedMessage.message,
      senderType: savedMessage.senderType,
      read: savedMessage.read,
      delivered: savedMessage.delivered,
      createdAt: savedMessage.createdAt,
      attachments: savedMessage.attachments,
      sender: {
        _id: adminId,
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
      });

      for (const participantId of chat.participants) {
        if (participantId.toString() !== adminId.toString()) {
          io.to(`user_${participantId}`).emit("new_message_notification", {
            chatId,
            from: sender.name,
            message: message.substring(0, 100),
          });
        }
      }
    }

    res.json({ success: true, data: messageToReturn });
  } catch (err) {
    console.error("Admin send message error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// POST /api/admin/chats/:chatId/image - Upload image as admin
router.post("/:chatId/image", uploadChatImage, async (req, res) => {
  try {
    const { chatId } = req.params;
    const adminId = req.user._id;

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res
        .status(404)
        .json({ success: false, message: "Chat not found" });
    }

    if (!chat.participants.includes(adminId)) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    if (chat.isBlocked && chat.blockedBy?.toString() === adminId.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Chat is blocked by you" });
    }

    const newMessage = {
      sender: adminId,
      senderType: "admin",
      message: "",
      read: false,
      delivered: true,
      createdAt: new Date(),
      attachments: [
        {
          type: "image",
          url: `/uploads/chats/${req.file.filename}`,
          filename: req.file.filename,
          originalName: req.file.originalname,
          size: req.file.size,
          mimeType: req.file.mimetype,
        },
      ],
    };

    chat.messages.push(newMessage);
    chat.lastMessage = "📷 Image";
    chat.lastMessageAt = new Date();
    chat.lastMessageSender = adminId;

    if (!chat.unreadCounts) {
      chat.unreadCounts = new Map();
    }
    for (const participantId of chat.participants) {
      if (participantId.toString() !== adminId.toString()) {
        const currentUnread =
          chat.unreadCounts.get(participantId.toString()) || 0;
        chat.unreadCounts.set(participantId.toString(), currentUnread + 1);
      }
    }
    chat.unreadCounts.set(adminId.toString(), 0);

    await chat.save();

    const sender = await User.findById(adminId).select(
      "name email profilePhoto role",
    );
    const savedMessage = chat.messages[chat.messages.length - 1];

    const messageToReturn = {
      _id: savedMessage._id,
      message: savedMessage.message,
      senderType: savedMessage.senderType,
      read: savedMessage.read,
      delivered: savedMessage.delivered,
      createdAt: savedMessage.createdAt,
      attachments: savedMessage.attachments,
      sender: {
        _id: adminId,
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
      });

      for (const participantId of chat.participants) {
        if (participantId.toString() !== adminId.toString()) {
          io.to(`user_${participantId}`).emit("new_message_notification", {
            chatId,
            from: sender.name,
            message: "📷 Image",
          });
        }
      }
    }

    res.json({ success: true, data: messageToReturn });
  } catch (err) {
    console.error("Admin upload image error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// PUT /api/admin/chats/:chatId/read - Mark messages as read
router.put("/:chatId/read", async (req, res) => {
  try {
    const { chatId } = req.params;
    const adminId = req.user._id;

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res
        .status(404)
        .json({ success: false, message: "Chat not found" });
    }

    let updated = false;
    chat.messages.forEach((message) => {
      if (message.sender.toString() !== adminId.toString() && !message.read) {
        message.read = true;
        message.readAt = new Date();
        updated = true;
      }
    });

    if (!chat.unreadCounts) {
      chat.unreadCounts = new Map();
    }
    chat.unreadCounts.set(adminId.toString(), 0);

    if (updated) {
      await chat.save();
    }

    res.json({ success: true, message: "Messages marked as read" });
  } catch (err) {
    console.error("Admin mark read error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// PUT /api/admin/chats/:chatId/block - Block user
router.put("/:chatId/block", async (req, res) => {
  try {
    const { chatId } = req.params;
    const adminId = req.user._id;

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res
        .status(404)
        .json({ success: false, message: "Chat not found" });
    }

    if (!chat.participants.includes(adminId)) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    chat.isBlocked = true;
    chat.blockedBy = adminId;
    chat.blockedAt = new Date();
    await chat.save();

    const io = req.app.get("io");
    if (io) {
      io.to(`chat_${chatId}`).emit("user_blocked", {
        chatId,
        blockedBy: adminId,
      });
    }

    res.json({ success: true, message: "User blocked successfully" });
  } catch (err) {
    console.error("Admin block error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// PUT /api/admin/chats/:chatId/unblock - Unblock user
router.put("/:chatId/unblock", async (req, res) => {
  try {
    const { chatId } = req.params;
    const adminId = req.user._id;

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res
        .status(404)
        .json({ success: false, message: "Chat not found" });
    }

    chat.isBlocked = false;
    chat.blockedBy = null;
    chat.blockedAt = null;
    await chat.save();

    res.json({ success: true, message: "User unblocked successfully" });
  } catch (err) {
    console.error("Admin unblock error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET /api/admin/chats/unread/count - Get unread count
// NOTE: This must also be before /:chatId to avoid conflict, but "unread/count"
// won't clash because Express matches the full segment — keep it here or move above /:chatId if issues arise
router.get("/unread/count", async (req, res) => {
  try {
    const adminId = req.user._id;

    const chats = await Chat.find({
      participants: adminId,
      isActive: true,
    });

    let totalUnread = 0;
    chats.forEach((chat) => {
      totalUnread += chat.unreadCounts?.get(adminId.toString()) || 0;
    });

    res.json({ success: true, count: totalUnread });
  } catch (err) {
    console.error("Admin unread count error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
