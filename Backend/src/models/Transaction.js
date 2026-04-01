import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    pidx: {
      type: String,
      sparse: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentGateway: {
      type: String,
      enum: ["khalti", "esewa"],
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "COMPLETED", "FAILED", "REFUNDED"],
      default: "PENDING",
    },
    customerDetails: {
      name: String,
      email: String,
      phone: String,
    },
    productName: String,
    productId: String,
    paymentDetails: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  },
);

// Create indexes
transactionSchema.index({ transactionId: 1 });
transactionSchema.index({ pidx: 1 });
transactionSchema.index({ bookingId: 1 });
transactionSchema.index({ userId: 1 });

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
