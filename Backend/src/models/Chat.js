// // // import mongoose from "mongoose";

// // // const messageSchema = new mongoose.Schema({
// // //   sender: {
// // //     type: mongoose.Schema.Types.ObjectId,
// // //     ref: "User",
// // //     required: true,
// // //   },
// // //   senderType: {
// // //     type: String,
// // //     enum: ["user", "owner", "admin"],
// // //     default: "user",
// // //   },
// // //   message: {
// // //     type: String,
// // //     required: true,
// // //     trim: true,
// // //   },
// // //   attachments: [{
// // //     type: String,
// // //     url: String,
// // //     filename: String,
// // //   }],
// // //   read: {
// // //     type: Boolean,
// // //     default: false,
// // //   },
// // //   readAt: Date,
// // //   delivered: {
// // //     type: Boolean,
// // //     default: true,
// // //   },
// // // }, { timestamps: true });

// // // const chatSchema = new mongoose.Schema({
// // //   chatType: {
// // //     type: String,
// // //     enum: ["vehicle", "support", "booking"],
// // //     required: true,
// // //   },

// // //   participants: [{
// // //     type: mongoose.Schema.Types.ObjectId,
// // //     ref: "User",
// // //     required: true,
// // //   }],

// // //   // For vehicle chats
// // //   vehicleId: {
// // //     type: mongoose.Schema.Types.ObjectId,
// // //     refPath: "vehicleModel",
// // //   },
// // //   vehicleModel: {
// // //     type: String,
// // //     enum: ["Vehicle", "UserVehicle"],
// // //   },
// // //   vehicleName: String,

// // //   // For booking chats
// // //   bookingId: {
// // //     type: mongoose.Schema.Types.ObjectId,
// // //     ref: "Booking",
// // //   },

// // //   title: String,
// // //   lastMessage: String,
// // //   lastMessageAt: Date,
// // //   lastMessageSender: {
// // //     type: mongoose.Schema.Types.ObjectId,
// // //     ref: "User",
// // //   },

// // //   messages: [messageSchema],

// // //   isActive: {
// // //     type: Boolean,
// // //     default: true,
// // //   },
// // //   closedBy: {
// // //     type: mongoose.Schema.Types.ObjectId,
// // //     ref: "User",
// // //   },
// // //   closedAt: Date,

// // //   // Track unread counts per participant
// // //   unreadCounts: {
// // //     type: Map,
// // //     of: Number,
// // //     default: {},
// // //   },

// // //   // Add these fields to your existing Chat schema
// // // blockedBy: {
// // //   type: mongoose.Schema.Types.ObjectId,
// // //   ref: "User",
// // //   default: null,
// // // },
// // // blockedAt: Date,
// // // isBlocked: {
// // //   type: Boolean,
// // //   default: false,
// // // },

// // // }, { timestamps: true });

// // // // Indexes for faster queries
// // // chatSchema.index({ participants: 1 });
// // // chatSchema.index({ vehicleId: 1 });
// // // chatSchema.index({ updatedAt: -1 });
// // // chatSchema.index({ chatType: 1 });

// // // export default mongoose.model("Chat", chatSchema);

// // // models/Chat.js - Updated messageSchema with better attachment support
// // import mongoose from "mongoose";

// // const attachmentSchema = new mongoose.Schema({
// //   type: {
// //     type: String,
// //     enum: ["image", "file"],
// //     default: "image",
// //   },
// //   url: {
// //     type: String,
// //     required: true,
// //   },
// //   filename: String,
// //   originalName: String,
// //   size: Number,
// //   mimeType: String,
// //   uploadedAt: {
// //     type: Date,
// //     default: Date.now,
// //   },
// // });

// // const messageSchema = new mongoose.Schema(
// //   {
// //     sender: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "User",
// //       required: true,
// //     },
// //     senderType: {
// //       type: String,
// //       enum: ["user", "owner", "admin"],
// //       default: "user",
// //     },
// //     message: {
// //       type: String,
// //       trim: true,
// //       default: "",
// //     },
// //     attachments: [attachmentSchema],
// //     read: {
// //       type: Boolean,
// //       default: false,
// //     },
// //     readAt: Date,
// //     delivered: {
// //       type: Boolean,
// //       default: true,
// //     },
// //   },
// //   { timestamps: true },
// // );

// // const chatSchema = new mongoose.Schema(
// //   {
// //     chatType: {
// //       type: String,
// //       enum: ["vehicle", "support", "booking"],
// //       required: true,
// //     },
// //     participants: [
// //       {
// //         type: mongoose.Schema.Types.ObjectId,
// //         ref: "User",
// //         required: true,
// //       },
// //     ],
// //     vehicleId: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       refPath: "vehicleModel",
// //     },
// //     vehicleModel: {
// //       type: String,
// //       enum: ["Vehicle", "UserVehicle"],
// //     },
// //     vehicleName: String,
// //     bookingId: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "Booking",
// //     },
// //     title: String,
// //     lastMessage: String,
// //     lastMessageAt: Date,
// //     lastMessageSender: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "User",
// //     },
// //     messages: [messageSchema],
// //     isActive: {
// //       type: Boolean,
// //       default: true,
// //     },
// //     closedBy: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "User",
// //     },
// //     closedAt: Date,
// //     unreadCounts: {
// //       type: Map,
// //       of: Number,
// //       default: {},
// //     },
// //     blockedBy: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "User",
// //       default: null,
// //     },
// //     blockedAt: Date,
// //     isBlocked: {
// //       type: Boolean,
// //       default: false,
// //     },
// //   },
// //   { timestamps: true },
// // );

// // chatSchema.index({ participants: 1 });
// // chatSchema.index({ vehicleId: 1 });
// // chatSchema.index({ updatedAt: -1 });
// // chatSchema.index({ chatType: 1 });

// // export default mongoose.model("Chat", chatSchema);

// import mongoose from "mongoose";

// const attachmentSchema = new mongoose.Schema({
//   type: {
//     type: String,
//     enum: ["image", "file"],
//     default: "image",
//   },
//   url: {
//     type: String,
//     required: true,
//   },
//   filename: String,
//   originalName: String,
//   size: Number,
//   mimeType: String,
//   uploadedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const messageSchema = new mongoose.Schema(
//   {
//     sender: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     senderType: {
//       type: String,
//       enum: ["user", "owner", "admin"],
//       default: "user",
//     },
//     message: {
//       type: String,
//       trim: true,
//       default: "",
//     },
//     attachments: [attachmentSchema],
//     read: {
//       type: Boolean,
//       default: false,
//     },
//     readAt: Date,
//     delivered: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   { timestamps: true },
// );

// const chatSchema = new mongoose.Schema(
//   {
//     chatType: {
//       type: String,
//       enum: ["vehicle", "support", "booking"],
//       required: true,
//     },
//     participants: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true,
//       },
//     ],
//     vehicleId: {
//       type: mongoose.Schema.Types.ObjectId,
//       refPath: "vehicleModel",
//     },
//     vehicleModel: {
//       type: String,
//       enum: ["Vehicle", "UserVehicle"],
//     },
//     vehicleName: String,
//     bookingId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Booking",
//     },
//     title: String,
//     lastMessage: String,
//     lastMessageAt: Date,
//     lastMessageSender: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//     messages: [messageSchema],
//     isActive: {
//       type: Boolean,
//       default: true,
//     },
//     closedBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//     closedAt: Date,
//     unreadCounts: {
//       type: Map,
//       of: Number,
//       default: {},
//     },
//     blockedBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       default: null,
//     },
//     blockedAt: Date,
//     isBlocked: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { timestamps: true },
// );

// chatSchema.index({ participants: 1 });
// chatSchema.index({ vehicleId: 1 });
// chatSchema.index({ updatedAt: -1 });
// chatSchema.index({ chatType: 1 });

// export default mongoose.model("Chat", chatSchema);

import mongoose from "mongoose";

// ─── Attachment Schema ────────────────────────────────────────────────────────
const attachmentSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["image", "file"],
    default: "image",
  },
  url: {
    type: String,
    required: true,
  },
  filename: String,
  originalName: String,
  size: Number,
  mimeType: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

// ─── Reaction Schema ──────────────────────────────────────────────────────────
const reactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    emoji: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

// ─── Message Schema ───────────────────────────────────────────────────────────
const messageSchema = new mongoose.Schema(
  {
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
      trim: true,
      default: "",
    },
    attachments: [attachmentSchema],
    read: {
      type: Boolean,
      default: false,
    },
    readAt: Date,
    delivered: {
      type: Boolean,
      default: true,
    },

    // ── Reply feature ──────────────────────────────────────────────────────
    // Stores the _id of the message being replied to (within the same chat).
    // We store it as a plain ObjectId — NOT a ref — because Mongoose cannot
    // populate embedded subdocuments that reference themselves in the same array.
    // The controller looks up the original message manually when needed.
    replyTo: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    // Inline snapshot of the replied-to message so we can display the preview
    // even after the original is unsent or deleted.
    replyToSnapshot: {
      message: { type: String, default: "" },
      senderType: { type: String, default: "user" },
      isUnsent: { type: Boolean, default: false },
      hasImage: { type: Boolean, default: false },
    },

    // ── Reactions ──────────────────────────────────────────────────────────
    reactions: {
      type: [reactionSchema],
      default: [],
    },

    // ── Unsend ────────────────────────────────────────────────────────────
    // When true the message content is hidden for everyone and replaced with
    // "This message was unsent".
    isUnsent: {
      type: Boolean,
      default: false,
    },

    // ── Delete for me ─────────────────────────────────────────────────────
    // Array of user IDs for whom this message is hidden. The message still
    // exists in DB but is filtered out before being sent to those users.
    deletedFor: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  { timestamps: true },
);

// ─── Chat Schema ──────────────────────────────────────────────────────────────
const chatSchema = new mongoose.Schema(
  {
    chatType: {
      type: String,
      enum: ["vehicle", "support", "booking"],
      required: true,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "vehicleModel",
    },
    vehicleModel: {
      type: String,
      enum: ["Vehicle", "UserVehicle"],
    },
    vehicleName: String,
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

    // ── Unread counts ──────────────────────────────────────────────────────
    // Map of userId → number of unread messages for that user
    unreadCounts: {
      type: Map,
      of: Number,
      default: {},
    },

    // ── Block ──────────────────────────────────────────────────────────────
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

    // ── Mute ──────────────────────────────────────────────────────────────
    // Array of user IDs who have muted this chat.
    // Muted users still receive messages but get no notifications.
    mutedBy: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },

    // ── Delete conversation ────────────────────────────────────────────────
    // Tracks which users have "cleared" the conversation for themselves.
    // Used alongside deletedFor on individual messages.
    clearedFor: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  { timestamps: true },
);

// ─── Indexes ──────────────────────────────────────────────────────────────────
chatSchema.index({ participants: 1 });
chatSchema.index({ vehicleId: 1 });
chatSchema.index({ updatedAt: -1 });
chatSchema.index({ chatType: 1 });
chatSchema.index({ isActive: 1 });
// Compound index for the most common query pattern
chatSchema.index({ participants: 1, isActive: 1 });

export default mongoose.model("Chat", chatSchema);
