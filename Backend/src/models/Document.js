

import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },
    // Citizenship Documents
    citizenshipFront: {
      filename: String,
      originalName: String,
      path: String,
      url: String,
      mimetype: String,
      size: Number,
      uploadedAt: Date,
    },
    citizenshipBack: {
      filename: String,
      originalName: String,
      path: String,
      url: String,
      mimetype: String,
      size: Number,
      uploadedAt: Date,
    },
    // License Documents
    licenseFront: {
      filename: String,
      originalName: String,
      path: String,
      url: String,
      mimetype: String,
      size: Number,
      uploadedAt: Date,
    },
    licenseBack: {
      filename: String,
      originalName: String,
      path: String,
      url: String,
      mimetype: String,
      size: Number,
      uploadedAt: Date,
    },
    // Verification status
    verificationStatus: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    verifiedAt: Date,
    rejectionReason: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Document", documentSchema);
