import mongoose from "mongoose";

const bikeSchema = new mongoose.Schema(
  {
    bikeName: {
      type: String,
      required: true,
      trim: true,
    },
    bikeNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    bikeType: {
      type: String,
      required: true,
      enum: ["Sports", "Cruiser", "Touring", "Scooter", "Electric", "Dirt Bike", "Standard"],
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      trim: true,
    },
    year: {
      type: Number,
      min: 2000,
      max: new Date().getFullYear() + 1,
    },
    ratePerDay: {
      type: Number,
      required: true,
      min: 0,
    },
    ratePerWeek: {
      type: Number,
      min: 0,
    },
    securityDeposit: {
      type: Number,
      default: 0,
    },
    engineCapacity: {
      type: String,
    },
    fuelType: {
      type: String,
      enum: ["Petrol", "Electric", "Hybrid"],
      default: "Petrol",
    },
    mileage: {
      type: String,
    },
    transmission: {
      type: String,
      enum: ["Manual", "Automatic", "Semi-Automatic"],
      default: "Manual",
    },
    features: [String],
    description: {
      type: String,
      trim: true,
    },
    photos: [
      {
        label: {
          type: String,
          enum: ["Front View", "Side View", "Rear View", "Dashboard", "Extra View"],
        },
        filename: {
          type: String,
        },
      },
    ],
    status: {
      type: String,
      enum: ["Available", "Booked", "Maintenance"],
      default: "Available",
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    helmetIncluded: {
      type: Boolean,
      default: true,
    },
    licenseRequired: {
      type: String,
      enum: ["Any", "Two-Wheeler", "Heavy"],
      default: "Two-Wheeler",
    },
    minimumAge: {
      type: Number,
      default: 18,
      min: 16,
      max: 25,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
bikeSchema.index({ bikeNumber: 1 }, { unique: true });
bikeSchema.index({ bikeType: 1 });
bikeSchema.index({ status: 1 });

export default mongoose.model("Bike", bikeSchema);