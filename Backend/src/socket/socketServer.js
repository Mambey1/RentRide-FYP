import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import Chat from "../models/Chat.js";
import User from "../models/User.js";
import { createNotification } from "../utils/notificationHelper.js";

let io;

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:5173",
      credentials: true,
      methods: ["GET", "POST"],
    },
    transports: ["websocket", "polling"],
  });

  // Middleware to authenticate socket connections
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

    // Join user's personal room for direct notifications
    socket.join(`user_${socket.userId}`);
    
    // Join admin room if user is admin
    if (socket.user.role === "admin") {
      socket.join("admin_room");
      console.log(`🔵 Admin joined: ${socket.user.name}`);
    }

    // Join a specific chat room
    socket.on("join_chat", async (chatId) => {
      try {
        const chat = await Chat.findById(chatId);
        if (!chat) {
          socket.emit("error", { message: "Chat not found" });
          return;
        }
        
        // Check if user is a participant
        if (!chat.participants.includes(socket.userId)) {
          socket.emit("error", { message: "Unauthorized to join this chat" });
          return;
        }

        socket.join(`chat_${chatId}`);
        console.log(`📱 User ${socket.user.name} joined chat ${chatId}`);
        
        // Mark messages as read when user joins
        let updated = false;
        chat.messages.forEach(message => {
          if (message.sender.toString() !== socket.userId && !message.read) {
            message.read = true;
            message.readAt = new Date();
            updated = true;
          }
        });
        
        if (updated) {
          chat.unreadCounts.set(socket.userId, 0);
          await chat.save();
          
          // Notify other participants that messages were read
          socket.to(`chat_${chatId}`).emit("messages_read", {
            chatId,
            userId: socket.userId,
          });
        }
        
        // Send recent messages to the user
        socket.emit("joined_chat", { 
          chatId, 
          messages: chat.messages.slice(-50) // Last 50 messages
        });
      } catch (error) {
        console.error("Join chat error:", error);
        socket.emit("error", { message: error.message });
      }
    });

    // Send a new message
    socket.on("send_message", async (data) => {
      try {
        const { chatId, message, attachments } = data;
        
        if (!message || !message.trim()) {
          socket.emit("error", { message: "Message cannot be empty" });
          return;
        }

        const chat = await Chat.findById(chatId).populate("participants", "name email role");
        if (!chat) {
          socket.emit("error", { message: "Chat not found" });
          return;
        }

        // Check if user is a participant
        if (!chat.participants.some(p => p._id.toString() === socket.userId)) {
          socket.emit("error", { message: "Unauthorized" });
          return;
        }

        // Determine sender type
        let senderType = "user";
        if (socket.user.role === "admin") {
          senderType = "admin";
        } else if (chat.chatType === "vehicle") {
          // Check if user is the vehicle owner
          const isOwner = chat.participants[0]._id.toString() === socket.userId ||
                         chat.participants[1]?._id.toString() === socket.userId;
          senderType = isOwner ? "owner" : "user";
        }

        // Create message object
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

        // Update unread counts for other participants
        for (const participant of chat.participants) {
          const participantId = participant._id.toString();
          if (participantId !== socket.userId) {
            const currentUnread = chat.unreadCounts.get(participantId) || 0;
            chat.unreadCounts.set(participantId, currentUnread + 1);
          }
        }

        await chat.save();
        
        // Get the saved message with ID
        const savedMessage = chat.messages[chat.messages.length - 1];
        
        // Populate sender info for the new message
        const populatedMessage = {
          _id: savedMessage._id,
          message: savedMessage.message,
          senderType: savedMessage.senderType,
          attachments: savedMessage.attachments,
          read: savedMessage.read,
          delivered: savedMessage.delivered,
          createdAt: savedMessage.createdAt,
          sender: {
            _id: socket.userId,
            name: socket.user.name,
            email: socket.user.email,
            profilePhoto: socket.user.profilePhoto,
            role: socket.user.role,
          },
        };

        // Emit to all users in the chat room
        io.to(`chat_${chatId}`).emit("new_message", {
          chatId,
          message: populatedMessage,
        });

        // Send notifications to other participants
        for (const participant of chat.participants) {
          const participantId = participant._id.toString();
          if (participantId !== socket.userId) {
            // Send real-time notification via socket
            io.to(`user_${participantId}`).emit("new_message_notification", {
              chatId,
              chatTitle: chat.title || `Chat about ${chat.vehicleName || "Vehicle"}`,
              from: socket.user.name,
              message: message.substring(0, 100),
              vehicleName: chat.vehicleName,
            });
            
            // Create in-app notification
            await createNotification(
              participantId,
              `New message from ${socket.user.name}`,
              message.substring(0, 100),
              "info",
              chat.title || "New message",
              { 
                chatId, 
                messagePreview: message.substring(0, 100),
                vehicleName: chat.vehicleName,
              },
              {
                type: "navigate",
                path: `/chat/${chatId}`,
                data: { chatId },
              }
            );
          }
        }
        
      } catch (error) {
        console.error("Send message error:", error);
        socket.emit("error", { message: error.message });
      }
    });

    // Typing indicator
    socket.on("typing", (data) => {
      const { chatId, isTyping } = data;
      socket.to(`chat_${chatId}`).emit("user_typing", {
        chatId,
        userId: socket.userId,
        name: socket.user.name,
        isTyping,
      });
    });

    // Disconnect
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