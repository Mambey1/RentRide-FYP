import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reportedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reason: {
      type: String,
      required: true,
      enum: [
        "spam",
        "harassment",
        "fake_listing",
        "scam",
        "inappropriate_content",
        "other",
      ],
    },
    description: {
      type: String,
      required: true,
    },
    screenshotProof: {
      type: String, // URL to uploaded screenshot
      default: null,
    },
    status: {
      type: String,
      enum: ["pending", "reviewed", "action_taken", "dismissed"],
      default: "pending",
    },
    adminNote: {
      type: String,
      default: null,
    },
    warningGiven: {
      type: Boolean,
      default: false,
    },
    actionTaken: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Report", reportSchema);