import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    subscribedAt: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    source: {
      type: String,
      enum: ["newsletter", "booking", "registration"],
      default: "newsletter",
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
subscriberSchema.index({ email: 1 });
subscriberSchema.index({ isActive: 1 });
subscriberSchema.index({ createdAt: -1 });

export default mongoose.model("Subscriber", subscriberSchema);