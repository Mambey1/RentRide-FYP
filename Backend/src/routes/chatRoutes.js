// // import express from "express";
// // import {
// //   // Existing
// //   getOrCreateVehicleChat,
// //   getOrCreateSupportChat,
// //   getChatById,
// //   getUserChats,
// //   markMessagesAsRead,
// //   getUnreadCount,
// //   closeChat,
// //   sendMessage,
// //   blockUser,
// //   unblockUser,
// //   uploadChatImage,
// //   uploadChatImageHandler,
// //   // New
// //   unsendMessage,
// //   deleteMessageForMe,
// //   deleteConversation,
// //   reactToMessage,
// //   muteChat,
// // } from "../controllers/chatController.js";
// // import { protect } from "../middleware/authMiddleware.js";

// // const router = express.Router();

// // // All chat routes require authentication
// // router.use(protect);

// // // ─── Chat creation ────────────────────────────────────────────────────────────
// // router.post("/vehicle", getOrCreateVehicleChat);
// // router.post("/support", getOrCreateSupportChat);

// // // ─── Chat listing & unread ────────────────────────────────────────────────────
// // router.get("/my-chats", getUserChats);
// // router.get("/unread-count", getUnreadCount);

// // // ─── Single chat ──────────────────────────────────────────────────────────────
// // router.get("/:chatId", getChatById);
// // router.put("/:chatId/read", markMessagesAsRead);
// // router.put("/:chatId/close", closeChat);

// // // ─── Messaging ────────────────────────────────────────────────────────────────
// // router.post("/:chatId/message", sendMessage);

// // // Image upload — note: this uses multer middleware before the handler
// // router.post("/:chatId/image", uploadChatImage, uploadChatImageHandler);

// // // Legacy upload endpoint (kept for backward compat)
// // router.post("/upload-image", uploadChatImage, uploadChatImageHandler);

// // // ─── Message actions ──────────────────────────────────────────────────────────
// // // Unsend a message (visible to everyone as "This message was unsent")
// // router.delete("/:chatId/message/:messageId/unsend", unsendMessage);

// // // Delete a message only for the requesting user
// // router.delete("/:chatId/message/:messageId", deleteMessageForMe);

// // // React to a message with an emoji (toggle on/off)
// // router.post("/:chatId/message/:messageId/react", reactToMessage);

// // // ─── Conversation actions ─────────────────────────────────────────────────────
// // // Delete the entire conversation for the requesting user only
// // router.delete("/:chatId/conversation", deleteConversation);

// // // Mute / unmute a chat (toggles)
// // router.put("/:chatId/mute", muteChat);

// // // ─── Block / Unblock ──────────────────────────────────────────────────────────
// // router.put("/:chatId/block", blockUser);
// // router.put("/:chatId/unblock", unblockUser);

// // export default router;



// import express from "express";
// import {
//   // Existing
//   getOrCreateVehicleChat,
//   getOrCreateSupportChat,
//   getChatById,
//   getUserChats,
//   markMessagesAsRead,
//   getUnreadCount,
//   closeChat,
//   sendMessage,
//   blockUser,
//   unblockUser,
//   uploadChatImage,
//   uploadChatImageHandler,
//   // New
//   unsendMessage,
//   deleteMessageForMe,
//   deleteConversation,
//   reactToMessage,
//   muteChat,
// } from "../controllers/chatController.js";
// import { protect } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // All chat routes require authentication
// router.use(protect);

// // ─── Chat creation ────────────────────────────────────────────────────────────
// router.post("/vehicle", getOrCreateVehicleChat);
// router.post("/support", getOrCreateSupportChat);

// // ─── Chat listing & unread ────────────────────────────────────────────────────
// router.get("/my-chats", getUserChats);
// router.get("/unread-count", getUnreadCount);

// // ─── Single chat ──────────────────────────────────────────────────────────────
// router.get("/:chatId", getChatById);
// router.put("/:chatId/read", markMessagesAsRead);
// router.put("/:chatId/close", closeChat);

// // ─── Messaging ────────────────────────────────────────────────────────────────
// // uploadChatImage multer middleware runs first so req.file is available
// // in sendMessage for image attachments — text-only messages skip the file
// router.post("/:chatId/message", uploadChatImage, sendMessage);

// // Legacy standalone image upload endpoint (kept for backward compat)
// router.post("/:chatId/image", uploadChatImage, uploadChatImageHandler);
// router.post("/upload-image", uploadChatImage, uploadChatImageHandler);

// // ─── Message actions ──────────────────────────────────────────────────────────
// // Unsend a message (visible to everyone as "This message was unsent")
// router.delete("/:chatId/message/:messageId/unsend", unsendMessage);

// // Delete a message only for the requesting user
// router.delete("/:chatId/message/:messageId", deleteMessageForMe);

// // React to a message with an emoji (toggle on/off)
// router.post("/:chatId/message/:messageId/react", reactToMessage);

// // ─── Conversation actions ─────────────────────────────────────────────────────
// // Delete the entire conversation for the requesting user only
// router.delete("/:chatId/conversation", deleteConversation);

// // Mute / unmute a chat (toggles)
// router.put("/:chatId/mute", muteChat);

// // ─── Block / Unblock ──────────────────────────────────────────────────────────
// router.put("/:chatId/block", blockUser);
// router.put("/:chatId/unblock", unblockUser);

// export default router;




import express from "express";
import {
  // Existing
  getOrCreateVehicleChat,
  getOrCreateSupportChat,
  getOrCreateDirectChat,
  getChatById,
  getUserChats,
  markMessagesAsRead,
  getUnreadCount,
  closeChat,
  sendMessage,
  blockUser,
  unblockUser,
  uploadChatImage,
  uploadChatImageHandler,
  // New
  unsendMessage,
  deleteMessageForMe,
  deleteConversation,
  reactToMessage,
  muteChat,
} from "../controllers/chatController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All chat routes require authentication
router.use(protect);

// ─── Chat creation ────────────────────────────────────────────────────────────
router.post("/vehicle", getOrCreateVehicleChat);
router.post("/support", getOrCreateSupportChat);
router.post("/direct", getOrCreateDirectChat);

// ─── Chat listing & unread ────────────────────────────────────────────────────
router.get("/my-chats", getUserChats);
router.get("/unread-count", getUnreadCount);

// ─── Single chat ──────────────────────────────────────────────────────────────
router.get("/:chatId", getChatById);
router.put("/:chatId/read", markMessagesAsRead);
router.put("/:chatId/close", closeChat);

// ─── Messaging ────────────────────────────────────────────────────────────────
// uploadChatImage multer middleware runs first so req.file is available
// in sendMessage for image attachments — text-only messages skip the file
router.post("/:chatId/message", uploadChatImage, sendMessage);

// Legacy standalone image upload endpoint (kept for backward compat)
router.post("/:chatId/image", uploadChatImage, uploadChatImageHandler);
router.post("/upload-image", uploadChatImage, uploadChatImageHandler);

// ─── Message actions ──────────────────────────────────────────────────────────
// Unsend a message (visible to everyone as "This message was unsent")
router.delete("/:chatId/message/:messageId/unsend", unsendMessage);

// Delete a message only for the requesting user
router.delete("/:chatId/message/:messageId", deleteMessageForMe);

// React to a message with an emoji (toggle on/off)
router.post("/:chatId/message/:messageId/react", reactToMessage);

// ─── Conversation actions ─────────────────────────────────────────────────────
// Delete the entire conversation for the requesting user only
router.delete("/:chatId/conversation", deleteConversation);

// Mute / unmute a chat (toggles)
router.put("/:chatId/mute", muteChat);

// ─── Block / Unblock ──────────────────────────────────────────────────────────
router.put("/:chatId/block", blockUser);
router.put("/:chatId/unblock", unblockUser);

export default router;