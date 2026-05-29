// src/models/Vehicle.js
import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    carName: {
      type: String,
      required: true,
      trim: true,
    },
    carNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    carType: {
      type: String,
      required: true,
      enum: [
        "SUV",
        "Sedan",
        "Hatchback",
        "Coupe",
        "Convertible",
        "Sports",
        "Luxury",
        "Pickup",
        "Van",
        "Electric",
        "Hybrid",
      ],
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    ratePerDay: {
      type: Number,
      required: true,
      min: 0,
    },
    seats: {
      type: Number,
      required: true,
      min: 1,
      max: 20,
    },
    bookingType: {
      type: String,
      required: true,
      enum: ["With Driver", "Without Driver", "Both"],
    },
    gearType: {
      type: String,
      required: true,
      enum: ["Manual", "Automatic"],
    },
    airCondition: {
      type: String,
      required: true,
      enum: ["Yes", "No"],
    },
    // Update photos to store objects with label and filename
    photos: [
      {
        label: {
          type: String,
          enum: [
            "Front View",
            "Inside View",
            "Rear View",
            "Side View",
            "Extra View",
          ],
          required: true,
        },
        filename: {
          type: String,
          required: true,
        },
      },
    ],
    driverName: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Available", "Booked", "Maintenance", "On Hold"],
      default: "Available",
    },
    holdExpiresAt: { type: Date, default: null },
    description: { type: String, trim: true },
    features: [{ type: String, trim: true }],
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

// Add these methods to Vehicle schema (before export)
vehicleSchema.methods.isAvailableForDates = async function (
  startDate,
  endDate,
) {
  const Booking = mongoose.model("Booking");

  const overlappingBookings = await Booking.findOverlappingBookings(
    this._id,
    "Vehicle",
    startDate,
    endDate,
  );

  return overlappingBookings.length === 0;
};

vehicleSchema.methods.getBookedDates = async function () {
  const Booking = mongoose.model("Booking");

  const bookings = await Booking.find({
    vehicle: this._id,
    vehicleModel: "Vehicle",
    status: { $in: ["confirmed", "active", "approved"] },
    returnDate: { $gt: new Date() },
  }).sort({ pickupDate: 1 });

  return bookings.map((booking) => ({
    start: booking.pickupDate,
    end: booking.returnDate,
  }));
};

// Add virtual for display status (not for blocking)
vehicleSchema.virtual("displayStatus").get(function () {
  // This is just for UI display, not for blocking logic
  if (this.status === "Maintenance") return "In Maintenance";
  if (this.status === "On Hold") return "Processing";
  return this.status;
});

export default mongoose.model("Vehicle", vehicleSchema);
