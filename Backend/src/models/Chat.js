import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  senderType: {
    type: String,
    enum: ["user", "owner", "admin"],
    default: "user",
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  attachments: [{
    type: String,
    url: String,
    filename: String,
  }],
  read: {
    type: Boolean,
    default: false,
  },
  readAt: Date,
  delivered: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const chatSchema = new mongoose.Schema({
  chatType: {
    type: String,
    enum: ["vehicle", "support", "booking"],
    required: true,
  },
  
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }],
  
  // For vehicle chats
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "vehicleModel",
  },
  vehicleModel: {
    type: String,
    enum: ["Vehicle", "UserVehicle"],
  },
  vehicleName: String,
  
  // For booking chats
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
  },
  
  title: String,
  lastMessage: String,
  lastMessageAt: Date,
  lastMessageSender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  
  messages: [messageSchema],
  
  isActive: {
    type: Boolean,
    default: true,
  },
  closedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  closedAt: Date,
  
  // Track unread counts per participant
  unreadCounts: {
    type: Map,
    of: Number,
    default: {},
  },

  // Add these fields to your existing Chat schema
blockedBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  default: null,
},
blockedAt: Date,
isBlocked: {
  type: Boolean,
  default: false,
},
  
}, { timestamps: true });

// Indexes for faster queries
chatSchema.index({ participants: 1 });
chatSchema.index({ vehicleId: 1 });
chatSchema.index({ updatedAt: -1 });
chatSchema.index({ chatType: 1 });

export default mongoose.model("Chat", chatSchema);