// // import mongoose from "mongoose";

// // const bookingSchema = new mongoose.Schema(
// //   {
// //     user: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "User",
// //       required: true,
// //     },
// //     vehicle: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "Vehicle",
// //       required: true,
// //     },
// //     vehicleType: {
// //       type: String,
// //       enum: ["admin", "user"],
// //       default: "admin",
// //     },
// //     documents: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "Document",
// //     },
// //     // Booking Details
// //     pickupDate: {
// //       type: Date,
// //       required: true,
// //     },
// //     pickupTime: {
// //       type: String,
// //       required: true,
// //     },
// //     returnDate: {
// //       type: Date,
// //       required: true,
// //     },
// //     returnTime: {
// //       type: String,
// //       required: true,
// //     },
// //     pickupLocation: {
// //       type: String,
// //       required: true,
// //     },
// //     dropoffLocation: {
// //       type: String,
// //       required: true,
// //     },
// //     // Pricing
// //     totalDays: {
// //       type: Number,
// //       required: true,
// //       min: 1,
// //     },
// //     basePrice: {
// //       type: Number,
// //       required: true,
// //       min: 0,
// //     },
// //     driverFee: {
// //       type: Number,
// //       default: 0,
// //     },
// //     insuranceFee: {
// //       type: Number,
// //       default: 0,
// //     },
// //     serviceFee: {
// //       type: Number,
// //       default: 500,
// //     },
// //     tax: {
// //       type: Number,
// //       default: 0,
// //     },
// //     totalAmount: {
// //       type: Number,
// //       required: true,
// //     },
// //     paidAmount: {
// //       type: Number,
// //       default: 0,
// //     },
// //     // Options
// //     driverOption: {
// //       type: String,
// //       enum: ["with", "without"],
// //       default: "without",
// //     },
// //     insuranceOption: {
// //       type: String,
// //       enum: ["basic", "premium"],
// //       default: "basic",
// //     },
// //     // Status & Workflow
// //     status: {
// //       type: String,
// //       enum: [
// //         "pending",
// //         "approved",
// //         "rejected",
// //         "confirmed",
// //         "active",
// //         "completed",
// //         "cancelled",
// //         "expired",
// //       ],
// //       default: "pending",
// //     },
// //     // Admin Actions
// //     approvedBy: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "User",
// //     },
// //     approvedAt: {
// //       type: Date,
// //     },
// //     rejectedBy: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "User",
// //     },
// //     rejectedAt: {
// //       type: Date,
// //     },
// //     rejectionReason: {
// //       type: String,
// //     },
// //     // Confirmation
// //     confirmationCode: {
// //       type: String,
// //       unique: true,
// //     },
// //     confirmedAt: {
// //       type: Date,
// //     },
// //     // Dates
// //     cancellationDate: {
// //       type: Date,
// //     },
// //     cancellationReason: {
// //       type: String,
// //     },
// //     startDate: {
// //       type: Date,
// //     },
// //     endDate: {
// //       type: Date,
// //     },
// //     // Payment
// //     paymentStatus: {
// //       type: String,
// //       enum: ["pending", "partial", "paid", "refunded", "failed"],
// //       default: "pending",
// //     },
// //     paymentMethod: {
// //       type: String,
// //       enum: ["cash", "card", "online", "bank_transfer"],
// //     },
// //     paymentId: {
// //       type: String,
// //     },
// //     // Additional Info
// //     specialRequests: {
// //       type: String,
// //     },
// //     emergencyContact: {
// //       name: String,
// //       phone: String,
// //       relationship: String,
// //     },
// //     // Metadata
// //     expiresAt: {
// //       type: Date,
// //       default: () => new Date(Date.now() + 24 * 60 * 60 * 1000),
// //     },
// //   },
// //   {
// //     timestamps: true,
// //     toJSON: { virtuals: true },
// //     toObject: { virtuals: true },
// //   }
// // );

// // // Indexes for performance
// // bookingSchema.index({ user: 1 });
// // bookingSchema.index({ vehicle: 1 });
// // bookingSchema.index({ status: 1 });
// // bookingSchema.index({ pickupDate: 1 });
// // bookingSchema.index({ createdAt: 1 });
// // bookingSchema.index({ confirmationCode: 1 }, { unique: true });
// // bookingSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// // // Virtuals
// // bookingSchema.virtual("isActive").get(function () {
// //   return this.status === "active";
// // });

// // bookingSchema.virtual("isPending").get(function () {
// //   return this.status === "pending";
// // });

// // bookingSchema.virtual("isConfirmed").get(function () {
// //   return this.status === "confirmed";
// // });

// // bookingSchema.virtual("canBeCancelled").get(function () {
// //   const now = new Date();
// //   const pickupDateTime = new Date(this.pickupDate);
// //   const hoursUntilPickup = (pickupDateTime - now) / (1000 * 60 * 60);

// //   return (
// //     ["pending", "approved", "confirmed"].includes(this.status) &&
// //     hoursUntilPickup > 24
// //   );
// // });

// // // Pre-save middleware
// // bookingSchema.pre("save", function () {
// //   if (this.isNew && !this.confirmationCode) {
// //     const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
// //     let code = "RR-";
// //     for (let i = 0; i < 6; i++) {
// //       code += chars.charAt(Math.floor(Math.random() * chars.length));
// //     }
// //     this.confirmationCode = code;
// //   }
// // });

// // // Method to check vehicle availability
// // bookingSchema.methods.checkVehicleAvailability = async function () {
// //   const overlappingBookings = await mongoose.model("Booking").find({
// //     vehicle: this.vehicle,
// //     status: { $in: ["approved", "confirmed", "active"] },
// //     $or: [
// //       {
// //         pickupDate: { $lt: this.returnDate },
// //         returnDate: { $gt: this.pickupDate },
// //       },
// //     ],
// //     _id: { $ne: this._id },
// //   });

// //   return overlappingBookings.length === 0;
// // };

// // // Method to calculate refund amount
// // bookingSchema.methods.calculateRefund = function () {
// //   if (!this.canBeCancelled) return 0;

// //   const now = new Date();
// //   const pickupDateTime = new Date(this.pickupDate);
// //   const daysUntilPickup = (pickupDateTime - now) / (1000 * 60 * 60 * 24);

// //   if (daysUntilPickup > 7) {
// //     return this.totalAmount * 0.9;
// //   } else if (daysUntilPickup > 3) {
// //     return this.totalAmount * 0.5;
// //   } else {
// //     return this.totalAmount * 0.2;
// //   }
// // };

// // // Static method to get booking statistics
// // bookingSchema.statics.getStatistics = async function (userId = null) {
// //   const matchStage = userId ? { user: userId } : {};

// //   const stats = await this.aggregate([
// //     { $match: matchStage },
// //     {
// //       $group: {
// //         _id: "$status",
// //         count: { $sum: 1 },
// //         totalRevenue: { $sum: "$totalAmount" },
// //       },
// //     },
// //     {
// //       $group: {
// //         _id: null,
// //         totalBookings: { $sum: "$count" },
// //         totalRevenue: { $sum: "$totalRevenue" },
// //         byStatus: {
// //           $push: {
// //             status: "$_id",
// //             count: "$count",
// //           },
// //         },
// //       },
// //     },
// //   ]);

// //   return stats[0] || {
// //     totalBookings: 0,
// //     totalRevenue: 0,
// //     byStatus: [],
// //   };
// // };

// // export default mongoose.model("Booking", bookingSchema);

// import mongoose from "mongoose";

// const bookingSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     vehicle: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       refPath: "vehicleModel", // Dynamic reference to either Vehicle or UserVehicle
//     },
//     vehicleModel: {
//       type: String,
//       required: true,
//       enum: ["Vehicle", "UserVehicle"],
//       default: "Vehicle",
//     },
//     vehicleType: {
//       type: String,
//       enum: ["admin", "user"],
//       default: "admin",
//     },
//     documents: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Document",
//     },
//     // Booking Details
//     pickupDate: {
//       type: Date,
//       required: true,
//     },
//     pickupTime: {
//       type: String,
//       required: true,
//     },
//     returnDate: {
//       type: Date,
//       required: true,
//     },
//     returnTime: {
//       type: String,
//       required: true,
//     },
//     pickupLocation: {
//       type: String,
//       required: true,
//     },
//     dropoffLocation: {
//       type: String,
//       required: true,
//     },
//     // Pricing
//     totalDays: {
//       type: Number,
//       required: true,
//       min: 1,
//     },
//     basePrice: {
//       type: Number,
//       required: true,
//       min: 0,
//     },
//     driverFee: {
//       type: Number,
//       default: 0,
//     },
//     insuranceFee: {
//       type: Number,
//       default: 0,
//     },
//     serviceFee: {
//       type: Number,
//       default: 500,
//     },
//     tax: {
//       type: Number,
//       default: 0,
//     },
//     totalAmount: {
//       type: Number,
//       required: true,
//     },
//     paidAmount: {
//       type: Number,
//       default: 0,
//     },
//     // Options
//     driverOption: {
//       type: String,
//       enum: ["with", "without"],
//       default: "without",
//     },
//     insuranceOption: {
//       type: String,
//       enum: ["basic", "premium"],
//       default: "basic",
//     },
//     // Status & Workflow
//     status: {
//       type: String,
//       enum: [
//         "pending",
//         "approved",
//         "rejected",
//         "confirmed",
//         "active",
//         "completed",
//         "cancelled",
//         "expired",
//       ],
//       default: "pending",
//     },
//     // Admin Actions
//     approvedBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//     approvedAt: {
//       type: Date,
//     },
//     rejectedBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//     rejectedAt: {
//       type: Date,
//     },
//     rejectionReason: {
//       type: String,
//     },
//     // Confirmation
//     confirmationCode: {
//       type: String,
//       unique: true,
//     },
//     confirmedAt: {
//       type: Date,
//     },
//     // Dates
//     cancellationDate: {
//       type: Date,
//     },
//     cancellationReason: {
//       type: String,
//     },
//     startDate: {
//       type: Date,
//     },
//     endDate: {
//       type: Date,
//     },
//     // Payment
//     paymentStatus: {
//       type: String,
//       enum: ["pending", "partial", "paid", "refunded", "failed"],
//       default: "pending",
//     },
//     paymentMethod: {
//       type: String,
//       enum: ["cash", "card", "online", "bank_transfer"],
//     },
//     paymentId: {
//       type: String,
//     },
//     // Additional Info
//     specialRequests: {
//       type: String,
//     },
//     emergencyContact: {
//       name: String,
//       phone: String,
//       relationship: String,
//     },
//     // Metadata
//     expiresAt: {
//       type: Date,
//       default: () => new Date(Date.now() + 24 * 60 * 60 * 1000),
//     },
//     holdExpiresAt: {
//       type: Date,
//       default: null,
//     },
//   },
//   {
//     timestamps: true,
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true },
//   },
// );

// // Indexes for performance
// bookingSchema.index({ user: 1 });
// bookingSchema.index({ vehicle: 1 });
// bookingSchema.index({ vehicleModel: 1 });
// bookingSchema.index({ status: 1 });
// bookingSchema.index({ pickupDate: 1 });
// bookingSchema.index({ createdAt: 1 });
// bookingSchema.index({ confirmationCode: 1 }, { unique: true });
// bookingSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
// bookingSchema.index({ user: 1, vehicle: 1, status: 1, paymentStatus: 1 }); // For review eligibility check

// // Virtuals
// bookingSchema.virtual("isActive").get(function () {
//   return this.status === "active";
// });

// bookingSchema.virtual("isPending").get(function () {
//   return this.status === "pending";
// });

// bookingSchema.virtual("isConfirmed").get(function () {
//   return this.status === "confirmed";
// });

// bookingSchema.virtual("canBeCancelled").get(function () {
//   const now = new Date();
//   const pickupDateTime = new Date(this.pickupDate);
//   const hoursUntilPickup = (pickupDateTime - now) / (1000 * 60 * 60);

//   return (
//     ["pending", "approved", "confirmed"].includes(this.status) &&
//     hoursUntilPickup > 24
//   );
// });

// // Check if user can review this booking
// bookingSchema.virtual("canReview").get(function () {
//   return (
//     this.status === "completed" &&
//     this.paymentStatus === "paid" &&
//     new Date(this.returnDate) <= new Date()
//   );
// });

// // Pre-save middleware
// bookingSchema.pre("save", function () {
//   if (this.isNew && !this.confirmationCode) {
//     const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//     let code = "RR-";
//     for (let i = 0; i < 6; i++) {
//       code += chars.charAt(Math.floor(Math.random() * chars.length));
//     }
//     this.confirmationCode = code;
//   }
// });

// // Method to check vehicle availability (updated for dynamic vehicle reference)
// bookingSchema.methods.checkVehicleAvailability = async function () {
//   const VehicleModel = mongoose.model(this.vehicleModel);
//   const vehicle = await VehicleModel.findById(this.vehicle);

//   if (!vehicle) return false;

//   const overlappingBookings = await mongoose.model("Booking").find({
//     vehicle: this.vehicle,
//     vehicleModel: this.vehicleModel,
//     status: { $in: ["approved", "confirmed", "active"] },
//     $or: [
//       {
//         pickupDate: { $lt: this.returnDate },
//         returnDate: { $gt: this.pickupDate },
//       },
//     ],
//     _id: { $ne: this._id },
//   });

//   return overlappingBookings.length === 0;
// };

// // Method to calculate refund amount
// bookingSchema.methods.calculateRefund = function () {
//   if (!this.canBeCancelled) return 0;

//   const now = new Date();
//   const pickupDateTime = new Date(this.pickupDate);
//   const daysUntilPickup = (pickupDateTime - now) / (1000 * 60 * 60 * 24);

//   if (daysUntilPickup > 7) {
//     return this.totalAmount * 0.9;
//   } else if (daysUntilPickup > 3) {
//     return this.totalAmount * 0.5;
//   } else {
//     return this.totalAmount * 0.2;
//   }
// };

// // Static method to get booking statistics
// bookingSchema.statics.getStatistics = async function (userId = null) {
//   const matchStage = userId ? { user: userId } : {};

//   const stats = await this.aggregate([
//     { $match: matchStage },
//     {
//       $group: {
//         _id: "$status",
//         count: { $sum: 1 },
//         totalRevenue: { $sum: "$totalAmount" },
//       },
//     },
//     {
//       $group: {
//         _id: null,
//         totalBookings: { $sum: "$count" },
//         totalRevenue: { $sum: "$totalRevenue" },
//         byStatus: {
//           $push: {
//             status: "$_id",
//             count: "$count",
//           },
//         },
//       },
//     },
//   ]);

//   return (
//     stats[0] || {
//       totalBookings: 0,
//       totalRevenue: 0,
//       byStatus: [],
//     }
//   );
// };

// // Static method to check if user has completed booking for a vehicle
// bookingSchema.statics.hasUserCompletedBooking = async function (
//   userId,
//   vehicleId,
//   vehicleModel = null,
// ) {
//   const query = {
//     user: userId,
//     vehicle: vehicleId,
//     status: { $in: ["completed", "confirmed"] },
//     paymentStatus: "paid",
//   };

//   if (vehicleModel) {
//     query.vehicleModel = vehicleModel;
//   }

//   const booking = await this.findOne(query);
//   return !!booking;
// };

// // Static method to get user's completed bookings for review eligibility
// bookingSchema.statics.getUserCompletedBookings = async function (userId) {
//   return await this.find({
//     user: userId,
//     status: { $in: ["completed", "confirmed"] },
//     paymentStatus: "paid",
//   }).populate("vehicle");
// };

// export default mongoose.model("Booking", bookingSchema);

import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "vehicleModel", // Dynamic reference to either Vehicle or UserVehicle
    },
    vehicleModel: {
      type: String,
      required: true,
      enum: ["Vehicle", "UserVehicle"],
      default: "Vehicle",
    },
    vehicleType: {
      type: String,
      enum: ["admin", "user"],
      default: "admin",
    },
    documents: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
    },
    // Booking Details
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
      required: true,
    },
    dropoffLocation: {
      type: String,
      required: true,
    },
    // Pricing
    totalDays: {
      type: Number,
      required: true,
      min: 1,
    },
    basePrice: {
      type: Number,
      required: true,
      min: 0,
    },
    driverFee: {
      type: Number,
      default: 0,
    },
    insuranceFee: {
      type: Number,
      default: 0,
    },
    serviceFee: {
      type: Number,
      default: 500,
    },
    tax: {
      type: Number,
      default: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paidAmount: {
      type: Number,
      default: 0,
    },
    // Options
    driverOption: {
      type: String,
      enum: ["with", "without"],
      default: "without",
    },
    insuranceOption: {
      type: String,
      enum: ["basic", "premium"],
      default: "basic",
    },
    // Status & Workflow
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
    // Admin Actions
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    approvedAt: {
      type: Date,
    },
    rejectedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    rejectedAt: {
      type: Date,
    },
    rejectionReason: {
      type: String,
    },
    // Confirmation
    confirmationCode: {
      type: String,
      unique: true,
    },
    confirmedAt: {
      type: Date,
    },
    // Dates
    cancellationDate: {
      type: Date,
    },
    cancellationReason: {
      type: String,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    // Payment
    paymentStatus: {
      type: String,
      enum: ["pending", "partial", "paid", "refunded", "failed"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "online", "bank_transfer"],
    },
    paymentId: {
      type: String,
    },
    // Additional Info
    specialRequests: {
      type: String,
    },
    userContact: {
      countryCode: {
        type: String,
        default: "+977",
      },
      phone: {
        type: String,
      },
      fullPhone: {
        type: String,
      },
    },
    emergencyContact: {
      name: String,
      phone: String,
      countryCode: String,
      fullPhone: String,
      relationship: String,
    },
    // Metadata
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
    holdExpiresAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Indexes for performance
bookingSchema.index({ user: 1 });
bookingSchema.index({ vehicle: 1 });
bookingSchema.index({ vehicleModel: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ pickupDate: 1 });
bookingSchema.index({ createdAt: 1 });
bookingSchema.index({ confirmationCode: 1 }, { unique: true });
bookingSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
bookingSchema.index({ user: 1, vehicle: 1, status: 1, paymentStatus: 1 }); // For review eligibility check

// Virtuals
bookingSchema.virtual("isActive").get(function () {
  return this.status === "active";
});

bookingSchema.virtual("isPending").get(function () {
  return this.status === "pending";
});

bookingSchema.virtual("isConfirmed").get(function () {
  return this.status === "confirmed";
});

bookingSchema.virtual("canBeCancelled").get(function () {
  const now = new Date();
  const pickupDateTime = new Date(this.pickupDate);
  const hoursUntilPickup = (pickupDateTime - now) / (1000 * 60 * 60);

  return (
    ["pending", "approved", "confirmed"].includes(this.status) &&
    hoursUntilPickup > 24
  );
});

// Check if user can review this booking
bookingSchema.virtual("canReview").get(function () {
  return (
    this.status === "completed" &&
    this.paymentStatus === "paid" &&
    new Date(this.returnDate) <= new Date()
  );
});

// Pre-save middleware
bookingSchema.pre("save", function () {
  if (this.isNew && !this.confirmationCode) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "RR-";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    this.confirmationCode = code;
  }
});

// Method to check vehicle availability (updated for dynamic vehicle reference)
bookingSchema.methods.checkVehicleAvailability = async function () {
  const VehicleModel = mongoose.model(this.vehicleModel);
  const vehicle = await VehicleModel.findById(this.vehicle);

  if (!vehicle) return false;

  const overlappingBookings = await mongoose.model("Booking").find({
    vehicle: this.vehicle,
    vehicleModel: this.vehicleModel,
    status: { $in: ["approved", "confirmed", "active"] },
    $or: [
      {
        pickupDate: { $lt: this.returnDate },
        returnDate: { $gt: this.pickupDate },
      },
    ],
    _id: { $ne: this._id },
  });

  return overlappingBookings.length === 0;
};

// Method to calculate refund amount
bookingSchema.methods.calculateRefund = function () {
  if (!this.canBeCancelled) return 0;

  const now = new Date();
  const pickupDateTime = new Date(this.pickupDate);
  const daysUntilPickup = (pickupDateTime - now) / (1000 * 60 * 60 * 24);

  if (daysUntilPickup > 7) {
    return this.totalAmount * 0.9;
  } else if (daysUntilPickup > 3) {
    return this.totalAmount * 0.5;
  } else {
    return this.totalAmount * 0.2;
  }
};

// Static method to get booking statistics
bookingSchema.statics.getStatistics = async function (userId = null) {
  const matchStage = userId ? { user: userId } : {};

  const stats = await this.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
        totalRevenue: { $sum: "$totalAmount" },
      },
    },
    {
      $group: {
        _id: null,
        totalBookings: { $sum: "$count" },
        totalRevenue: { $sum: "$totalRevenue" },
        byStatus: {
          $push: {
            status: "$_id",
            count: "$count",
          },
        },
      },
    },
  ]);

  return (
    stats[0] || {
      totalBookings: 0,
      totalRevenue: 0,
      byStatus: [],
    }
  );
};

// Static method to check if user has completed booking for a vehicle
bookingSchema.statics.hasUserCompletedBooking = async function (
  userId,
  vehicleId,
  vehicleModel = null,
) {
  const query = {
    user: userId,
    vehicle: vehicleId,
    status: { $in: ["completed", "confirmed"] },
    paymentStatus: "paid",
  };

  if (vehicleModel) {
    query.vehicleModel = vehicleModel;
  }

  const booking = await this.findOne(query);
  return !!booking;
};

// Static method to get user's completed bookings for review eligibility
bookingSchema.statics.getUserCompletedBookings = async function (userId) {
  return await this.find({
    user: userId,
    status: { $in: ["completed", "confirmed"] },
    paymentStatus: "paid",
  }).populate("vehicle");
};

export default mongoose.model("Booking", bookingSchema);
