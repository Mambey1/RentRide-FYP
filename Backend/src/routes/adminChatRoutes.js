// routes/adminChatRoutes.js
// Mount this in your Express app as: app.use('/api/admin/chats', adminChatRoutes)

import express from "express";
import Chat from "../models/Chat.js";
import Message from "../models/Message.js";

// ── Import YOUR existing auth middleware directly ──────────────────────────
// protect   → verifies JWT and attaches req.user
// adminOnly → checks req.user.role === "admin"  (or use authorize("admin"))
import { protect, adminOnly } from "../middleware/authMiddleware.js";
// If your file is named differently, adjust the path above. Examples:
//   import { protect, adminOnly } from "../middleware/auth.js";
//   import { protect, authorize } from "../middleware/authMiddleware.js";
//   const adminOnly = authorize("admin");  ← if you prefer the authorize helper

const router = express.Router();

// ─── GET /api/admin/chats ─────────────────────────────────────────────────────
// Returns ALL chats (optionally filtered). Admin sees every conversation.
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const { filter = "all" } = req.query;

    let query = {};

    // Filter by chat type
    if (filter === "vehicle") query.chatType = "vehicle";
    else if (filter === "support") query.chatType = "support";
    else if (filter === "unread") {
      // chats where admin has unread messages — handled after fetch
    }

    const chats = await Chat.find(query)
      .populate("participants", "name email profilePhoto role")
      .populate("vehicle", "carName carNumber vehiclePhotos")
      .sort({ lastMessageAt: -1, updatedAt: -1 })
      .lean();

    // Attach last message text & unread counts per participant
    const enriched = chats.map((chat) => {
      const adminId = req.user._id.toString();
      const unreadForAdmin = chat.unreadCounts?.[adminId] || 0;
      return {
        ...chat,
        vehicleName: chat.vehicle?.carName || chat.vehicleName,
        vehicleNumber: chat.vehicle?.carNumber,
        unreadCounts: chat.unreadCounts || {},
        _unreadForAdmin: unreadForAdmin,
      };
    });

    // If filter === 'unread', only return chats where admin has unread msgs
    const result =
      filter === "unread"
        ? enriched.filter((c) => c._unreadForAdmin > 0)
        : enriched;

    res.json({ success: true, data: result });
  } catch (err) {
    console.error("Admin get chats error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ─── GET /api/admin/chats/:chatId ─────────────────────────────────────────────
// Returns a single chat with its full message history
router.get("/:chatId", protect, adminOnly, async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId)
      .populate("participants", "name email profilePhoto role")
      .populate("vehicle", "carName carNumber vehiclePhotos")
      .lean();

    if (!chat) return res.status(404).json({ success: false, message: "Chat not found" });

    // Fetch messages — adjust depending on your schema:
    // Option A: messages embedded in Chat document → const messages = chat.messages || [];
    // Option B: separate Message collection with chatId reference (default below)
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name email profilePhoto role")
      .sort({ createdAt: 1 })
      .lean();

    res.json({
      success: true,
      data: {
        ...chat,
        vehicleName: chat.vehicle?.carName || chat.vehicleName,
        vehicleNumber: chat.vehicle?.carNumber,
        messages,
      },
    });
  } catch (err) {
    console.error("Admin get chat error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ─── POST /api/admin/chats/:chatId/message ────────────────────────────────────
// Admin sends a message in a chat
router.post("/:chatId/message", protect, adminOnly, async (req, res) => {
  try {
    const { message } = req.body;
    if (!message?.trim()) {
      return res.status(400).json({ success: false, message: "Message is required" });
    }

    const chat = await Chat.findById(req.params.chatId)
      .populate("participants", "name email profilePhoto role");

    if (!chat) return res.status(404).json({ success: false, message: "Chat not found" });
    if (chat.isBlocked) return res.status(403).json({ success: false, message: "Chat is blocked" });

    const newMsg = await Message.create({
      chat: chat._id,
      sender: req.user._id,
      senderType: "admin",
      message: message.trim(),
      read: false,
    });

    await newMsg.populate("sender", "name email profilePhoto role");

    // Update the chat's lastMessage and bump unread counts for non-admin participants
    const updateData = {
      lastMessage: message.trim(),
      lastMessageAt: new Date(),
    };

    // Increment unread count for each non-admin participant
    chat.participants.forEach((p) => {
      if (p.role !== "admin") {
        updateData[`unreadCounts.${p._id}`] =
          (chat.unreadCounts?.get(p._id.toString()) || 0) + 1;
      }
    });

    await Chat.findByIdAndUpdate(chat._id, { $set: updateData });

    // ── Emit via Socket.IO (access from app) ──
    const io = req.app.get("io");
    if (io) {
      io.to(chat._id.toString()).emit("newMessage", {
        chatId: chat._id,
        message: newMsg,
      });
    }

    res.json({ success: true, data: newMsg });
  } catch (err) {
    console.error("Admin send message error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ─── PUT /api/admin/chats/:chatId/read ───────────────────────────────────────
// Mark all messages in a chat as read for the admin
router.put("/:chatId/read", protect, adminOnly, async (req, res) => {
  try {
    const adminId = req.user._id.toString();

    await Chat.findByIdAndUpdate(req.params.chatId, {
      $set: { [`unreadCounts.${adminId}`]: 0 },
    });

    // Also mark individual messages as read if you track per-message read status
    // await Message.updateMany({ chat: req.params.chatId, read: false }, { $set: { read: true } });

    res.json({ success: true });
  } catch (err) {
    console.error("Admin mark read error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;

// ─────────────────────────────────────────────────────────────────────────────
// HOW TO REGISTER IN YOUR Express app (app.js / server.js)
// ─────────────────────────────────────────────────────────────────────────────
//
//   import adminChatRoutes from './routes/adminChatRoutes.js';
//   app.use('/api/admin/chats', adminChatRoutes);
//
// Block/unblock still use your EXISTING user-chat routes — no changes needed:
//   PUT /api/chats/:chatId/block
//   PUT /api/chats/:chatId/unblock