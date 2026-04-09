import express from "express";
import {
  getOrCreateVehicleChat,
  getOrCreateSupportChat,
  getChatById,
  getUserChats,
  markMessagesAsRead,
  getUnreadCount,
  closeChat,
} from "../controllers/chatController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All chat routes require authentication
router.use(protect);

router.post("/vehicle", getOrCreateVehicleChat);
router.post("/support", getOrCreateSupportChat);
router.get("/my-chats", getUserChats);
router.get("/unread-count", getUnreadCount);
router.get("/:chatId", getChatById);
router.put("/:chatId/read", markMessagesAsRead);
router.put("/:chatId/close", closeChat);

export default router;