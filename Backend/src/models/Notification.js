// import mongoose from "mongoose";

// const notificationSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     title: {
//       type: String,
//       required: true,
//     },
//     message: {
//       type: String,
//       required: true,
//     },
//     type: {
//       type: String,
//       enum: ["info", "success", "warning", "error", "booking", "vehicle"],
//       default: "info",
//     },
//     details: {
//       type: String,Q
//     },
//     read: {
//       type: Boolean,
//       default: false,
//     },
//     metadata: {
//       type: mongoose.Schema.Types.Mixed,
//       default: {},
//     },
//   },
//   {
//     timestamps: true,
//   },
// );

// // Index for faster queries
// notificationSchema.index({ user: 1, createdAt: -1 });
// notificationSchema.index({ user: 1, read: 1 });

// export default mongoose.model("Notification", notificationSchema);
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: [
        "info",
        "success",
        "warning",
        "error",
        "booking",
        "payment",
        "vehicle",
      ],
      default: "info",
    },
    details: {
      type: String,
    },
    read: {
      type: Boolean,
      default: false,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    // Action for clickable notifications
    action: {
      type: {
        type: String,
        enum: ["navigate", "payment", "booking", "none","bike_payment"],
        default: "none",
      },
      path: String,
      data: mongoose.Schema.Types.Mixed,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    expiresAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

// Indexes for faster queries
notificationSchema.index({ user: 1, createdAt: -1 });
notificationSchema.index({ user: 1, read: 1 });
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("Notification", notificationSchema);
