


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
        "Sedan",
        "SUV",
        "Hatchback",
        "MPV",
        "Coupe",
        "Convertible",
        "Pickup",
        "Minivan",
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
          enum: ["Front View", "Inside View", "Rear View", "Side View", "Extra View"],
          required: true
        },
        filename: {
          type: String,
          required: true
        }
      },
    ],
    driverName: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Available", "Booked", "Maintenance"],
      default: "Available",
    },
    description: {
      type: String,
      trim: true,
    },
    features: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Vehicle", vehicleSchema);