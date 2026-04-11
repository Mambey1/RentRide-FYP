import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import Chat from "../models/Chat.js";
import User from "../models/User.js";

let io;

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173", "http://localhost:3000"],
      credentials: true,
      methods: ["GET", "POST"],
    },
    transports: ["websocket", "polling"],
  });

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error("Authentication error"));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return next(new Error("User not found"));
      }

      socket.user = user;
      socket.userId = user._id.toString();
      next();
    } catch (error) {
      console.error("Socket auth error:", error);
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    console.log(`🟢 User connected: ${socket.user.name} (${socket.userId})`);

    socket.join(`user_${socket.userId}`);
    console.log(`📱 User joined personal room: user_${socket.userId}`);

    if (socket.user.role === "admin") {
      socket.join("admin_room");
      console.log(`🔵 Admin joined admin room: ${socket.user.name}`);
    }

    socket.on("join_chat", async (chatId) => {
      try {
        const chat = await Chat.findById(chatId);
        if (!chat || !chat.participants.includes(socket.userId)) {
          socket.emit("error", { message: "Unauthorized" });
          return;
        }

        socket.join(`chat_${chatId}`);
        console.log(`📱 User ${socket.user.name} joined chat ${chatId}`);

        socket.emit("joined_chat", {
          chatId,
          messages: chat.messages.slice(-50),
        });
      } catch (error) {
        console.error("Join chat error:", error);
        socket.emit("error", { message: error.message });
      }
    });

    socket.on("send_message", async (data) => {
      try {
        const { chatId, message, attachments } = data;

        if (!message || !message.trim()) {
          return;
        }

        const chat = await Chat.findById(chatId);
        if (!chat || !chat.participants.includes(socket.userId)) {
          socket.emit("error", { message: "Unauthorized" });
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
        };

        chat.messages.push(newMessage);
        chat.lastMessage = message;
        chat.lastMessageAt = new Date();
        chat.lastMessageSender = socket.userId;

        for (const participantId of chat.participants) {
          if (participantId.toString() !== socket.userId) {
            const currentUnread =
              chat.unreadCounts.get(participantId.toString()) || 0;
            chat.unreadCounts.set(participantId.toString(), currentUnread + 1);
          }
        }

        await chat.save();

        const populatedMessage = {
          ...newMessage,
          _id: chat.messages[chat.messages.length - 1]._id,
          createdAt: new Date(),
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
        });
        console.log(`📤 Message emitted to chat_${chatId}`);

        for (const participantId of chat.participants) {
          if (participantId.toString() !== socket.userId) {
            io.to(`user_${participantId}`).emit("new_message_notification", {
              chatId,
              from: socket.user.name,
              message: message.substring(0, 100),
            });
            console.log(`🔔 Notification sent to user_${participantId}`);
          }
        }
      } catch (error) {
        console.error("Send message error:", error);
        socket.emit("error", { message: error.message });
      }
    });

    socket.on("typing", (data) => {
      const { chatId, isTyping } = data;
      socket.to(`chat_${chatId}`).emit("user_typing", {
        chatId,
        userId: socket.userId,
        name: socket.user.name,
        isTyping,
      });
    });

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
