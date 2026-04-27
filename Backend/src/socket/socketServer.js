// import { Server } from "socket.io";
// import jwt from "jsonwebtoken";
// import Chat from "../models/Chat.js";
// import User from "../models/User.js";

// let io;

// export const initializeSocket = (server) => {
//   io = new Server(server, {
//     cors: {
//       origin: [
//         "http://localhost:5173",
//         "http://localhost:3000",
//         "http://localhost:5174",
//       ],
//       credentials: true,
//       methods: ["GET", "POST"],
//     },
//     transports: ["polling", "websocket"],
//     allowEIO3: true,
//     pingTimeout: 60000,
//     pingInterval: 25000,
//   });

//   io.use(async (socket, next) => {
//     try {
//       const token = socket.handshake.auth.token;
//       if (!token) {
//         console.log("Socket auth: No token provided");
//         return next(new Error("Authentication error"));
//       }

//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       const user = await User.findById(decoded.id).select("-password");

//       if (!user) {
//         return next(new Error("User not found"));
//       }

//       socket.user = user;
//       socket.userId = user._id.toString();
//       console.log(`✅ Socket authenticated: ${user.name} (${user.role})`);
//       next();
//     } catch (error) {
//       console.error("Socket auth error:", error.message);
//       next(new Error("Authentication error"));
//     }
//   });

//   io.on("connection", (socket) => {
//     console.log(
//       `🟢 User connected: ${socket.user.name} (${socket.userId}) [Role: ${socket.user.role}]`,
//     );

//     // Join user's personal notification room
//     socket.join(`user_${socket.userId}`);
//     console.log(`📱 User joined personal room: user_${socket.userId}`);

//     // Join admin room if user is admin
//     if (socket.user.role === "admin") {
//       socket.join("admin_room");
//       console.log(`🔵 Admin joined admin room: ${socket.user.name}`);
//     }

//     // Handle explicit join_user_room (sent by frontend on connect as fallback)
//     socket.on("join_user_room", (userId) => {
//       if (userId && userId.toString() === socket.userId) {
//         socket.join(`user_${userId}`);
//         console.log(`📬 Confirmed personal room: user_${userId}`);
//       }
//     });

//     // Join chat room
//     socket.on("join_chat", async (chatId) => {
//       try {
//         console.log(`📡 Joining chat: ${chatId} for user: ${socket.user.name}`);
//         const chat = await Chat.findById(chatId);

//         if (!chat) {
//           socket.emit("error", { message: "Chat not found" });
//           return;
//         }

//         if (!chat.participants.includes(socket.userId)) {
//           socket.emit("error", { message: "Unauthorized - Not a participant" });
//           return;
//         }

//         socket.join(`chat_${chatId}`);
//         console.log(`✅ User ${socket.user.name} joined chat ${chatId}`);

//         const lastMessages = chat.messages.slice(-50);

//         socket.emit("joined_chat", {
//           chatId,
//           messages: lastMessages,
//           chat: {
//             _id: chat._id,
//             chatType: chat.chatType,
//             vehicleName: chat.vehicleName,
//             isBlocked: chat.isBlocked,
//             blockedBy: chat.blockedBy,
//           },
//         });

//         // Mark messages as read
//         let updated = false;
//         chat.messages.forEach((message) => {
//           if (message.sender.toString() !== socket.userId && !message.read) {
//             message.read = true;
//             message.readAt = new Date();
//             updated = true;
//           }
//         });

//         if (updated) {
//           chat.unreadCounts.set(socket.userId, 0);
//           await chat.save();

//           socket.to(`chat_${chatId}`).emit("messages_read", {
//             chatId,
//             userId: socket.userId,
//           });
//         }
//       } catch (error) {
//         console.error("Join chat error:", error);
//         socket.emit("error", { message: error.message });
//       }
//     });

//     // Leave chat room
//     socket.on("leave_chat", async (chatId) => {
//       socket.leave(`chat_${chatId}`);
//       console.log(`👋 User ${socket.user.name} left chat ${chatId}`);
//     });

//     // Send message via socket
//     socket.on("send_message", async (data) => {
//       try {
//         const { chatId, message, attachments } = data;

//         if (!message || !message.trim()) {
//           socket.emit("error", { message: "Message cannot be empty" });
//           return;
//         }

//         console.log(
//           `📨 Sending message to chat ${chatId} from ${socket.user.name}`,
//         );

//         const chat = await Chat.findById(chatId);
//         if (!chat) {
//           socket.emit("error", { message: "Chat not found" });
//           return;
//         }

//         if (!chat.participants.includes(socket.userId)) {
//           socket.emit("error", { message: "Unauthorized" });
//           return;
//         }

//         if (chat.isBlocked && chat.blockedBy?.toString() !== socket.userId) {
//           socket.emit("error", {
//             message: "You cannot send messages in this conversation",
//           });
//           return;
//         }

//         let senderType = "user";
//         if (socket.user.role === "admin") {
//           senderType = "admin";
//         }

//         const newMessage = {
//           sender: socket.userId,
//           senderType,
//           message: message.trim(),
//           attachments: attachments || [],
//           read: false,
//           delivered: true,
//           createdAt: new Date(),
//         };

//         chat.messages.push(newMessage);
//         chat.lastMessage = message.trim();
//         chat.lastMessageAt = new Date();
//         chat.lastMessageSender = socket.userId;

//         if (!chat.unreadCounts) {
//           chat.unreadCounts = new Map();
//         }
//         for (const participantId of chat.participants) {
//           if (participantId.toString() !== socket.userId) {
//             const currentUnread =
//               chat.unreadCounts.get(participantId.toString()) || 0;
//             chat.unreadCounts.set(participantId.toString(), currentUnread + 1);
//           }
//         }
//         chat.unreadCounts.set(socket.userId, 0);

//         await chat.save();

//         const savedMessage = chat.messages[chat.messages.length - 1];

//         const populatedMessage = {
//           _id: savedMessage._id,
//           message: savedMessage.message,
//           senderType: savedMessage.senderType,
//           read: savedMessage.read,
//           delivered: savedMessage.delivered,
//           createdAt: savedMessage.createdAt,
//           attachments: savedMessage.attachments,
//           sender: {
//             _id: socket.userId,
//             name: socket.user.name,
//             email: socket.user.email,
//             profilePhoto: socket.user.profilePhoto,
//             role: socket.user.role,
//           },
//         };

//         // ── KEY FIX: include senderId so frontend can identify own messages ──
//         io.to(`chat_${chatId}`).emit("new_message", {
//           chatId,
//           message: populatedMessage,
//           senderId: socket.userId, // ← THIS WAS MISSING — causes unread bug
//         });
//         console.log(
//           `📤 Message emitted to chat_${chatId} (senderId: ${socket.userId})`,
//         );

//         // Notify each recipient in their personal room
//         for (const participantId of chat.participants) {
//           if (participantId.toString() !== socket.userId) {
//             io.to(`user_${participantId}`).emit("new_message_notification", {
//               chatId,
//               from: socket.user.name,
//               message: message.substring(0, 100),
//               chatType: chat.chatType,
//               vehicleName: chat.vehicleName,
//               senderId: socket.userId,
//             });
//             console.log(`🔔 Notification sent to user_${participantId}`);
//           }
//         }
//       } catch (error) {
//         console.error("Send message error:", error);
//         socket.emit("error", { message: error.message });
//       }
//     });

//     // Typing indicator
//     socket.on("typing", (data) => {
//       const { chatId, isTyping } = data;
//       socket.to(`chat_${chatId}`).emit("user_typing", {
//         chatId,
//         userId: socket.userId,
//         name: socket.user.name,
//         role: socket.user.role,
//         isTyping,
//       });
//     });

//     // Mark messages as read
//     socket.on("mark_read", async (chatId) => {
//       try {
//         const chat = await Chat.findById(chatId);
//         if (!chat) return;

//         let updated = false;
//         chat.messages.forEach((message) => {
//           if (message.sender.toString() !== socket.userId && !message.read) {
//             message.read = true;
//             message.readAt = new Date();
//             updated = true;
//           }
//         });

//         if (updated) {
//           chat.unreadCounts.set(socket.userId, 0);
//           await chat.save();

//           io.to(`chat_${chatId}`).emit("messages_read", {
//             chatId,
//             userId: socket.userId,
//           });
//         }
//       } catch (error) {
//         console.error("Mark read error:", error);
//       }
//     });

//     // Disconnect
//     socket.on("disconnect", () => {
//       console.log(`🔴 User disconnected: ${socket.user.name}`);
//     });
//   });

//   return io;
// };

// export const getIO = () => {
//   if (!io) {
//     throw new Error("Socket.io not initialized");
//   }
//   return io;
// };

import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import Chat from "../models/Chat.js";
import User from "../models/User.js";
import {
  scheduleUnreadNotification,
  cancelNotification,
} from "../utils/chatNotificationScheduler.js";

let io;

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://localhost:5174",
      ],
      credentials: true,
      methods: ["GET", "POST"],
    },
    transports: ["polling", "websocket"],
    allowEIO3: true,
    pingTimeout: 60000,
    pingInterval: 25000,
  });

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        console.log("Socket auth: No token provided");
        return next(new Error("Authentication error"));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return next(new Error("User not found"));
      }

      socket.user = user;
      socket.userId = user._id.toString();
      console.log(`✅ Socket authenticated: ${user.name} (${user.role})`);
      next();
    } catch (error) {
      console.error("Socket auth error:", error.message);
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    console.log(
      `🟢 User connected: ${socket.user.name} (${socket.userId}) [Role: ${socket.user.role}]`,
    );

    // Join user's personal notification room
    socket.join(`user_${socket.userId}`);
    console.log(`📱 User joined personal room: user_${socket.userId}`);

    // Join admin room if user is admin
    if (socket.user.role === "admin") {
      socket.join("admin_room");
      console.log(`🔵 Admin joined admin room: ${socket.user.name}`);
    }

    // Handle explicit join_user_room (sent by frontend on connect as fallback)
    socket.on("join_user_room", (userId) => {
      if (userId && userId.toString() === socket.userId) {
        socket.join(`user_${userId}`);
        console.log(`📬 Confirmed personal room: user_${userId}`);
      }
    });

    // ─── Join chat room ───────────────────────────────────────────────────────
    socket.on("join_chat", async (chatId) => {
      try {
        console.log(`📡 Joining chat: ${chatId} for user: ${socket.user.name}`);
        const chat = await Chat.findById(chatId);

        if (!chat) {
          socket.emit("error", { message: "Chat not found" });
          return;
        }

        if (!chat.participants.includes(socket.userId)) {
          socket.emit("error", { message: "Unauthorized - Not a participant" });
          return;
        }

        socket.join(`chat_${chatId}`);
        console.log(`✅ User ${socket.user.name} joined chat ${chatId}`);

        const lastMessages = chat.messages.slice(-50);

        socket.emit("joined_chat", {
          chatId,
          messages: lastMessages,
          chat: {
            _id: chat._id,
            chatType: chat.chatType,
            vehicleName: chat.vehicleName,
            isBlocked: chat.isBlocked,
            blockedBy: chat.blockedBy,
          },
        });

        // Mark messages as read & reset notification cycle
        let updated = false;
        chat.messages.forEach((message) => {
          if (message.sender.toString() !== socket.userId && !message.read) {
            message.read = true;
            message.readAt = new Date();
            updated = true;
          }
        });

        if (updated) {
          chat.unreadCounts.set(socket.userId, 0);
          await chat.save();

          // ── Cancel pending notification timers for this user ───────────────
          cancelNotification(chatId, socket.userId);

          socket.to(`chat_${chatId}`).emit("messages_read", {
            chatId,
            userId: socket.userId,
          });
        }
      } catch (error) {
        console.error("Join chat error:", error);
        socket.emit("error", { message: error.message });
      }
    });

    // ─── Leave chat room ──────────────────────────────────────────────────────
    socket.on("leave_chat", async (chatId) => {
      socket.leave(`chat_${chatId}`);
      console.log(`👋 User ${socket.user.name} left chat ${chatId}`);
    });

    // ─── Send message via socket ──────────────────────────────────────────────
    socket.on("send_message", async (data) => {
      try {
        const { chatId, message, attachments } = data;

        if (!message || !message.trim()) {
          socket.emit("error", { message: "Message cannot be empty" });
          return;
        }

        console.log(
          `📨 Sending message to chat ${chatId} from ${socket.user.name}`,
        );

        const chat = await Chat.findById(chatId);
        if (!chat) {
          socket.emit("error", { message: "Chat not found" });
          return;
        }

        if (!chat.participants.includes(socket.userId)) {
          socket.emit("error", { message: "Unauthorized" });
          return;
        }

        if (chat.isBlocked && chat.blockedBy?.toString() !== socket.userId) {
          socket.emit("error", {
            message: "You cannot send messages in this conversation",
          });
          return;
        }

        let senderType = "user";
        if (socket.user.role === "admin") {
          senderType = "admin";
        }

        const newMessage = {
          sender: socket.userId,
          senderType,
          message: message.trim(),
          attachments: attachments || [],
          read: false,
          delivered: true,
          createdAt: new Date(),
        };

        chat.messages.push(newMessage);
        chat.lastMessage = message.trim();
        chat.lastMessageAt = new Date();
        chat.lastMessageSender = socket.userId;

        if (!chat.unreadCounts) {
          chat.unreadCounts = new Map();
        }
        for (const participantId of chat.participants) {
          if (participantId.toString() !== socket.userId) {
            const currentUnread =
              chat.unreadCounts.get(participantId.toString()) || 0;
            chat.unreadCounts.set(participantId.toString(), currentUnread + 1);
          }
        }
        chat.unreadCounts.set(socket.userId, 0);

        await chat.save();

        const savedMessage = chat.messages[chat.messages.length - 1];

        const populatedMessage = {
          _id: savedMessage._id,
          message: savedMessage.message,
          senderType: savedMessage.senderType,
          read: savedMessage.read,
          delivered: savedMessage.delivered,
          createdAt: savedMessage.createdAt,
          attachments: savedMessage.attachments,
          sender: {
            _id: socket.userId,
            name: socket.user.name,
            email: socket.user.email,
            profilePhoto: socket.user.profilePhoto,
            role: socket.user.role,
          },
        };

        io.to(`chat_${chatId}`).emit("new_message", {
          chatId,
          message: populatedMessage,
          senderId: socket.userId,
        });
        console.log(
          `📤 Message emitted to chat_${chatId} (senderId: ${socket.userId})`,
        );

        // Real-time toast notification for online recipients
        for (const participantId of chat.participants) {
          if (participantId.toString() !== socket.userId) {
            const isMuted = (chat.mutedBy || [])
              .map((id) => id.toString())
              .includes(participantId.toString());

            if (!isMuted) {
              io.to(`user_${participantId}`).emit("new_message_notification", {
                chatId,
                from: socket.user.name,
                message: message.substring(0, 100),
                chatType: chat.chatType,
                vehicleName: chat.vehicleName,
                senderId: socket.userId,
              });
              console.log(
                `🔔 Toast notification sent to user_${participantId}`,
              );
            }
          }
        }

        // ── Schedule smart email + in-app notifications ───────────────────────
        for (const participantId of chat.participants) {
          if (participantId.toString() !== socket.userId) {
            scheduleUnreadNotification({
              chat,
              recipientId: participantId,
              sender: { _id: socket.userId, name: socket.user.name },
            }).catch((err) =>
              console.error("scheduleUnreadNotification error:", err),
            );
          }
        }
      } catch (error) {
        console.error("Send message error:", error);
        socket.emit("error", { message: error.message });
      }
    });

    // ─── Typing indicator ─────────────────────────────────────────────────────
    socket.on("typing", (data) => {
      const { chatId, isTyping } = data;
      socket.to(`chat_${chatId}`).emit("user_typing", {
        chatId,
        userId: socket.userId,
        name: socket.user.name,
        role: socket.user.role,
        isTyping,
      });
    });

    // ─── Mark messages as read ────────────────────────────────────────────────
    socket.on("mark_read", async (chatId) => {
      try {
        const chat = await Chat.findById(chatId);
        if (!chat) return;

        let updated = false;
        chat.messages.forEach((message) => {
          if (message.sender.toString() !== socket.userId && !message.read) {
            message.read = true;
            message.readAt = new Date();
            updated = true;
          }
        });

        if (updated) {
          chat.unreadCounts.set(socket.userId, 0);
          await chat.save();

          // ── Cancel pending notification timers ─────────────────────────────
          cancelNotification(chatId, socket.userId);

          io.to(`chat_${chatId}`).emit("messages_read", {
            chatId,
            userId: socket.userId,
          });
        }
      } catch (error) {
        console.error("Mark read error:", error);
      }
    });

    // ─── Disconnect ───────────────────────────────────────────────────────────
    socket.on("disconnect", () => {
      console.log(`🔴 User disconnected: ${socket.user.name}`);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
