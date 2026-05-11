import mongoose from "mongoose";

const bikeBookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bike: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bike",
      required: true,
    },
    pickupDate: {
      type: Date,
      required: true,
    },
    pickupTime: {
      type: String,
      required: true,
    },
    returnDate: {
      type: Date,
      required: true,
    },
    returnTime: {
      type: String,
      required: true,
    },
    pickupLocation: {
      type: String,
      default: "Kathmandu, Nepal",
    },
    dropoffLocation: {
      type: String,
      default: "Kathmandu, Nepal",
    },
    totalDays: {
      type: Number,
      required: true,
      min: 1,
    },
    basePrice: {
      type: Number,
      required: true,
    },
    serviceFee: {
      type: Number,
      default: 200,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paidAmount: {
      type: Number,
      default: 0,
    },
    extraHelmet: {
      type: Boolean,
      default: false,
    },

    ridingGear: {
      type: Boolean,
      default: false,
    },
    holdExpiresAt: {
      type: Date,
      default: null,
    },
    holdExpiresAt: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "approved",
        "rejected",
        "confirmed",
        "active",
        "completed",
        "cancelled",
        "expired",
      ],
      default: "pending",
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    approvedAt: Date,
    rejectedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    rejectedAt: Date,
    rejectionReason: String,
    confirmationCode: {
      type: String,
      unique: true,
    },
    confirmedAt: Date,
    cancellationDate: Date,
    cancellationReason: String,
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "refunded", "failed"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "online"],
    },
    paymentId: String,
    specialRequests: String,
    riderExperience: {
      type: String,
      enum: ["Beginner", "Intermediate", "Experienced"],
    },
    emergencyContact: {
      name: String,
      phone: String,
      relationship: String,
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 48 * 60 * 60 * 1000),
    },
  },
  {
    timestamps: true,
  },
);

// Generate confirmation code
bikeBookingSchema.pre("save", function () {
  if (this.isNew && !this.confirmationCode) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "BIKE-";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    this.confirmationCode = code;
  }
});

// Indexes
bikeBookingSchema.index({ user: 1 });
bikeBookingSchema.index({ bike: 1 });
bikeBookingSchema.index({ status: 1 });
bikeBookingSchema.index({ confirmationCode: 1 }, { unique: true });

export default mongoose.model("BikeBooking", bikeBookingSchema);
