// // // // import mongoose from "mongoose";

// // // // const userVehicleSchema = new mongoose.Schema(
// // // //   {
// // // //     user: {
// // // //       type: mongoose.Schema.Types.ObjectId,
// // // //       ref: "User",
// // // //       required: true,
// // // //     },
// // // //     // Vehicle Details
// // // //     carName: {
// // // //       type: String,
// // // //       required: true,
// // // //     },
// // // //     carNumber: {
// // // //       type: String,
// // // //       required: true,
// // // //       unique: true,
// // // //     },
// // // //     carType: {
// // // //       type: String,
// // // //       required: true,
// // // //       enum: [
// // // //         "SUV",
// // // //         "Sedan",
// // // //         "Hatchback",
// // // //         "MPV",
// // // //         "Coupe",
// // // //         "Convertible",
// // // //         "Pickup",
// // // //       ],
// // // //     },
// // // //     ratePerDay: {
// // // //       type: Number,
// // // //       required: true,
// // // //       min: 0,
// // // //     },
// // // //     seats: {
// // // //       type: Number,
// // // //       required: true,
// // // //       min: 1,
// // // //     },
// // // //     bookingType: {
// // // //       type: String,
// // // //       enum: ["Both", "With Driver", "Without Driver"],
// // // //       default: "Both",
// // // //     },
// // // //     gearType: {
// // // //       type: String,
// // // //       enum: ["Automatic", "Manual"],
// // // //       required: true,
// // // //     },
// // // //     airCondition: {
// // // //       type: String,
// // // //       enum: ["Yes", "No"],
// // // //       default: "Yes",
// // // //     },
// // // //     description: {
// // // //       type: String,
// // // //     },
// // // //     features: [String],

// // // //     // Vehicle Photos
// // // //     vehiclePhotos: [
// // // //       {
// // // //         filename: String,
// // // //         originalName: String,
// // // //         path: String,
// // // //         url: String,
// // // //         label: String,
// // // //         uploadedAt: Date,
// // // //       },
// // // //     ],

// // // //     // Citizenship Documents
// // // //     citizenshipFront: {
// // // //       filename: String,
// // // //       originalName: String,
// // // //       path: String,
// // // //       url: String,
// // // //       uploadedAt: Date,
// // // //     },
// // // //     citizenshipBack: {
// // // //       filename: String,
// // // //       originalName: String,
// // // //       path: String,
// // // //       url: String,
// // // //       uploadedAt: Date,
// // // //     },

// // // //     // Passport Photo
// // // //     passportPhoto: {
// // // //       filename: String,
// // // //       originalName: String,
// // // //       path: String,
// // // //       url: String,
// // // //       uploadedAt: Date,
// // // //     },

// // // //     // Personal Information
// // // //     fullName: {
// // // //       type: String,
// // // //       required: true,
// // // //     },
// // // //     citizenshipNumber: {
// // // //       type: String,
// // // //       required: true,
// // // //     },
// // // //     phoneNumber: {
// // // // //       type: String,
// // // // //       required: true,
// // // // //     },
// // // // //     address: {
// // // // //       type: String,
// // // // //       required: true,
// // // // //     },
// // // // //     city: {
// // // // //       type: String,
// // // // //       required: true,
// // // // //     },
// // // // //     district: {
// // // // //       type: String,
// // // // //     },

// // // // //     // Vehicle Documents
// // // // //     documents: [
// // // // //       {
// // // // //         type: {
// // // // //           type: String,
// // // // //           enum: ["bluebook", "insurance", "pollution"],
// // // // //         },
// // // // //         label: String,
// // // // //         filename: String,
// // // // //         originalName: String,
// // // // //         path: String,
// // // // //         url: String,
// // // // //         uploadedAt: Date,
// // // // //       },
// // // // //     ],

// // // // //     // Status
// // // // //     status: {
// // // // //       type: String,
// // // // //       enum: ["pending", "approved", "rejected", "active", "inactive"],
// // // // //       default: "pending",
// // // // //     },
// // // // //     rejectionReason: {
// // // // //       type: String,
// // // // //     },
// // // // //     approvedBy: {
// // // // //       type: mongoose.Schema.Types.ObjectId,
// // // // //       ref: "User",
// // // // //     },
// // // // //     approvedAt: Date,
// // // // //     isListed: {
// // // // //       type: Boolean,
// // // // //       default: false,
// // // // //     },
// // // // //     listedAt: Date,
// // // // //   },
// // // // //   {
// // // // //     timestamps: true,
// // // // //   },
// // // // // );

// // // // // // Index for faster queries
// // // // // userVehicleSchema.index({ user: 1 });
// // // // // userVehicleSchema.index({ status: 1 });
// // // // // userVehicleSchema.index({ carNumber: 1 }, { unique: true });

// // // // // export default mongoose.model("UserVehicle", userVehicleSchema);
// // // // import mongoose from "mongoose";

// // // // const userVehicleSchema = new mongoose.Schema(
// // // //   {
// // // //     user: {
// // // //       type: mongoose.Schema.Types.ObjectId,
// // // //       ref: "User",
// // // //       required: true,
// // // //     },
// // // //     // Vehicle Details
// // // //     carName: {
// // // //       type: String,
// // // //       required: true,
// // // //     },
// // // //     carNumber: {
// // // //       type: String,
// // // //       required: true,
// // // //       unique: true,
// // // //     },
// // // //     carType: {
// // // //       type: String,
// // // //       required: true,
// // // //       enum: [
// // // //         "SUV",
// // // //         "Sedan",
// // // //         "Hatchback",
// // // //         "MPV",
// // // //         "Coupe",
// // // //         "Convertible",
// // // //         "Pickup",
// // // //       ],
// // // //     },
// // // //     ratePerDay: {
// // // //       type: Number,
// // // //       required: true,
// // // //       min: 0,
// // // //     },
// // // //     seats: {
// // // //       type: Number,
// // // //       required: true,
// // // //       min: 1,
// // // //     },
// // // //     bookingType: {
// // // //       type: String,
// // // //       enum: ["Both", "With Driver", "Without Driver"],
// // // //       default: "Both",
// // // //     },
// // // //     gearType: {
// // // //       type: String,
// // // //       enum: ["Automatic", "Manual"],
// // // //       required: true,
// // // //     },
// // // //     airCondition: {
// // // //       type: String,
// // // //       enum: ["Yes", "No"],
// // // //       default: "Yes",
// // // //     },
// // // //     description: {
// // // //       type: String,
// // // //     },
// // // //     features: [String],

// // // //     // Vehicle Photos
// // // //     vehiclePhotos: [
// // // //       {
// // // //         filename: String,
// // // //         originalName: String,
// // // //         path: String,
// // // //         url: String,
// // // //         label: String,
// // // //         uploadedAt: Date,
// // // //       },
// // // //     ],

// // // //     // Citizenship Documents
// // // //     citizenshipFront: {
// // // //       filename: String,
// // // //       originalName: String,
// // // //       path: String,
// // // //       url: String,
// // // //       uploadedAt: Date,
// // // //     },
// // // //     citizenshipBack: {
// // // //       filename: String,
// // // //       originalName: String,
// // // //       path: String,
// // // //       url: String,
// // // //       uploadedAt: Date,
// // // //     },

// // // //     // Passport Photo
// // // //     passportPhoto: {
// // // //       filename: String,
// // // //       originalName: String,
// // // //       path: String,
// // // //       url: String,
// // // //       uploadedAt: Date,
// // // //     },

// // // //     // Personal Information
// // // //     fullName: {
// // // //       type: String,
// // // //       required: true,
// // // //     },
// // // //     citizenshipNumber: {
// // // //       type: String,
// // // //       required: true,
// // // //     },
// // // //     phoneNumber: {
// // // //       type: String,
// // // //       required: true,
// // // //     },
// // // //     address: {
// // // //       type: String,
// // // //       required: true,
// // // //     },
// // // //     city: {
// // // //       type: String,
// // // //       required: true,
// // // //     },
// // // //     district: {
// // // //       type: String,
// // // //     },

// // // //     // Vehicle Documents
// // // //     documents: [
// // // //       {
// // // //         type: {
// // // //           type: String,
// // // //           enum: ["bluebook", "insurance", "pollution"],
// // // //         },
// // // //         label: String,
// // // //         filename: String,
// // // //         originalName: String,
// // // //         path: String,
// // // //         url: String,
// // // //         uploadedAt: Date,
// // // //       },
// // // //     ],

// // // //     // Status - Added "booked" status
// // // //     status: {
// // // //       type: String,
// // // //       enum: ["pending", "approved", "rejected", "active", "inactive", "booked"],
// // // //       default: "pending",
// // // //     },
// // // //     rejectionReason: {
// // // //       type: String,
// // // //     },
// // // //     approvedBy: {
// // // //       type: mongoose.Schema.Types.ObjectId,
// // // //       ref: "User",
// // // //     },
// // // //     approvedAt: Date,
// // // //     isListed: {
// // // //       type: Boolean,
// // // //       default: false,
// // // //     },
// // // //     listedAt: Date,
// // // //   },
// // // //   {
// // // //     timestamps: true,
// // // //   },
// // // // );

// // // // // Index for faster queries
// // // // userVehicleSchema.index({ user: 1 });
// // // // userVehicleSchema.index({ status: 1 });
// // // // userVehicleSchema.index({ carNumber: 1 }, { unique: true });

// // // // export default mongoose.model("UserVehicle", userVehicleSchema);
// // // import mongoose from "mongoose";

// // // const userVehicleSchema = new mongoose.Schema(
// // //   {
// // //     user: {
// // //       type: mongoose.Schema.Types.ObjectId,
// // //       ref: "User",
// // //       required: true,
// // //     },
// // //     // Vehicle Details
// // //     carName: {
// // //       type: String,
// // //       required: true,
// // //     },
// // //     carNumber: {
// // //       type: String,
// // //       required: true,
// // //       unique: true,
// // //     },
// // //     carType: {
// // //       type: String,
// // //       required: true,
// // //       enum: [
// // //         "SUV",
// // //         "Sedan",
// // //         "Hatchback",
// // //         "MPV",
// // //         "Coupe",
// // //         "Convertible",
// // //         "Pickup",
// // //       ],
// // //     },
// // //     ratePerDay: {
// // //       type: Number,
// // //       required: true,
// // //       min: 0,
// // //     },
// // //     seats: {
// // //       type: Number,
// // //       required: true,
// // //       min: 1,
// // //     },
// // //     bookingType: {
// // //       type: String,
// // //       enum: ["Both", "With Driver", "Without Driver"],
// // //       default: "Both",
// // //     },
// // //     gearType: {
// // //       type: String,
// // //       enum: ["Automatic", "Manual"],
// // //       required: true,
// // //     },
// // //     airCondition: {
// // //       type: String,
// // //       enum: ["Yes", "No"],
// // //       default: "Yes",
// // //     },
// // //     description: {
// // //       type: String,
// // //     },
// // //     features: [String],

// // //     // Vehicle Photos
// // //     vehiclePhotos: [
// // //       {
// // //         filename: String,
// // //         originalName: String,
// // //         path: String,
// // //         url: String,
// // //         label: String,
// // //         uploadedAt: Date,
// // //       },
// // //     ],

// // //     // Citizenship Documents
// // //     citizenshipFront: {
// // //       filename: String,
// // //       originalName: String,
// // //       path: String,
// // //       url: String,
// // //       uploadedAt: Date,
// // //     },
// // //     citizenshipBack: {
// // //       filename: String,
// // //       originalName: String,
// // //       path: String,
// // //       url: String,
// // //       uploadedAt: Date,
// // //     },

// // //     // Passport Photo
// // //     passportPhoto: {
// // //       filename: String,
// // //       originalName: String,
// // //       path: String,
// // //       url: String,
// // //       uploadedAt: Date,
// // //     },

// // //     // Personal Information
// // //     fullName: {
// // //       type: String,
// // //       required: true,
// // //     },
// // //     citizenshipNumber: {
// // //       type: String,
// // //       required: true,
// // //     },
// // //     phoneNumber: {
// // //       type: String,
// // //       required: true,
// // //     },
// // //     address: {
// // //       type: String,
// // //       required: true,
// // //     },
// // //     city: {
// // //       type: String,
// // //       required: true,
// // //     },
// // //     district: {
// // //       type: String,
// // //     },

// // //     // Vehicle Documents
// // //     documents: [
// // //       {
// // //         type: {
// // //           type: String,
// // //           enum: ["bluebook", "insurance", "pollution"],
// // //         },
// // //         label: String,
// // //         filename: String,
// // //         originalName: String,
// // //         path: String,
// // //         url: String,
// // //         uploadedAt: Date,
// // //       },
// // //     ],

// // //     // Status - ADDED "booked" to enum
// // //     status: {
// // //       type: String,
// // //       enum: ["pending", "approved", "rejected", "active", "inactive", "booked"],
// // //       default: "pending",
// // //     },
// // //     rejectionReason: {
// // //       type: String,
// // //     },
// // //     approvedBy: {
// // //       type: mongoose.Schema.Types.ObjectId,
// // //       ref: "User",
// // //     },
// // //     approvedAt: Date,
// // //     isListed: {
// // //       type: Boolean,
// // //       default: false,
// // //     },
// // //     listedAt: Date,
// // //   },
// // //   {
// // //     timestamps: true,
// // //   },
// // // );

// // // // Index for faster queries
// // // userVehicleSchema.index({ user: 1 });
// // // userVehicleSchema.index({ status: 1 });
// // // userVehicleSchema.index({ carNumber: 1 }, { unique: true });

// // // export default mongoose.model("UserVehicle", userVehicleSchema);



// // import mongoose from "mongoose";

// // const userVehicleSchema = new mongoose.Schema(
// //   {
// //     user: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "User",
// //       required: true,
// //     },
// //     // Vehicle Details
// //     carName: {
// //       type: String,
// //       required: true,
// //     },
// //     carNumber: {
// //       type: String,
// //       required: true,
// //       unique: true,
// //     },
// //     carType: {
// //       type: String,
// //       required: true,
// //       enum: [
// //         "SUV",
// //         "Sedan",
// //         "Hatchback",
// //         "MPV",
// //         "Coupe",
// //         "Convertible",
// //         "Pickup",
// //       ],
// //     },
// //     ratePerDay: {
// //       type: Number,
// //       required: true,
// //       min: 0,
// //     },
// //     seats: {
// //       type: Number,
// //       required: true,
// //       min: 1,
// //     },
// //     bookingType: {
// //       type: String,
// //       enum: ["Both", "With Driver", "Without Driver"],
// //       default: "Both",
// //     },
// //     gearType: {
// //       type: String,
// //       enum: ["Automatic", "Manual"],
// //       required: true,
// //     },
// //     airCondition: {
// //       type: String,
// //       enum: ["Yes", "No"],
// //       default: "Yes",
// //     },
// //     description: {
// //       type: String,
// //     },
// //     features: [String],

// //     // Vehicle Photos
// //     vehiclePhotos: [
// //       {
// //         filename: String,
// //         originalName: String,
// //         path: String,
// //         url: String,
// //         label: String,
// //         uploadedAt: Date,
// //       },
// //     ],

// //     // Citizenship Documents
// //     citizenshipFront: {
// //       filename: String,
// //       originalName: String,
// //       path: String,
// //       url: String,
// //       uploadedAt: Date,
// //     },
// //     citizenshipBack: {
// //       filename: String,
// //       originalName: String,
// //       path: String,
// //       url: String,
// //       uploadedAt: Date,
// //     },

// //     // Passport Photo
// //     passportPhoto: {
// //       filename: String,
// //       originalName: String,
// //       path: String,
// //       url: String,
// //       uploadedAt: Date,
// //     },

// //     // Personal Information
// //     fullName: {
// //       type: String,
// //       required: true,
// //     },
// //     citizenshipNumber: {
// //       type: String,
// //       required: true,
// //     },
// //     phoneNumber: {
// //       type: String,
// //       required: true,
// //     },
// //     address: {
// //       type: String,
// //       required: true,
// //     },
// //     city: {
// //       type: String,
// //       required: true,
// //     },
// //     district: {
// //       type: String,
// //     },

// //     // Vehicle Documents
// //     documents: [
// //       {
// //         type: {
// //           type: String,
// //           enum: ["bluebook", "insurance", "pollution"],
// //         },
// //         label: String,
// //         filename: String,
// //         originalName: String,
// //         path: String,
// //         url: String,
// //         uploadedAt: Date,
// //       },
// //     ],

// //     // Status - ADDED "booked" to enum
// //     status: {
// //       type: String,
// //       enum: ["pending", "approved", "rejected", "active", "inactive", "booked"],
// //       default: "pending",
// //     },
// //     rejectionReason: {
// //       type: String,
// //     },
// //     approvedBy: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "User",
// //     },
// //     approvedAt: Date,
// //     isListed: {
// //       type: Boolean,
// //       default: false,
// //     },
// //     listedAt: Date,
// //   },
// //   {
// //     timestamps: true,
// //   },
// // );

// // // Index for faster queries
// // userVehicleSchema.index({ user: 1 });
// // userVehicleSchema.index({ status: 1 });
// // userVehicleSchema.index({ carNumber: 1 }, { unique: true });

// // export default mongoose.model("UserVehicle", userVehicleSchema);



// import mongoose from "mongoose";

// const userVehicleSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     carName: {
//       type: String,
//       required: true,
//     },
//     carNumber: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     carType: {
//       type: String,
//       required: true,
//       enum: ["SUV", "Sedan", "Hatchback", "MPV", "Coupe", "Convertible", "Pickup"],
//     },
//     ratePerDay: {
//       type: Number,
//       required: true,
//       min: 0,
//     },
//     seats: {
//       type: Number,
//       required: true,
//       min: 1,
//     },
//     bookingType: {
//       type: String,
//       enum: ["Both", "With Driver", "Without Driver"],
//       default: "Both",
//     },
//     gearType: {
//       type: String,
//       enum: ["Automatic", "Manual"],
//       required: true,
//     },
//     airCondition: {
//       type: String,
//       enum: ["Yes", "No"],
//       default: "Yes",
//     },
//     description: {
//       type: String,
//     },
//     features: [String],
//     vehiclePhotos: [
//       {
//         filename: String,
//         originalName: String,
//         path: String,
//         url: String,
//         label: String,
//         uploadedAt: Date,
//       },
//     ],
//     citizenshipFront: {
//       filename: String,
//       originalName: String,
//       path: String,
//       url: String,
//       uploadedAt: Date,
//     },
//     citizenshipBack: {
//       filename: String,
//       originalName: String,
//       path: String,
//       url: String,
//       uploadedAt: Date,
//     },
//     passportPhoto: {
//       filename: String,
//       originalName: String,
//       path: String,
//       url: String,
//       uploadedAt: Date,
//     },
//     fullName: {
//       type: String,
//       required: true,
//     },
//     citizenshipNumber: {
//       type: String,
//       required: true,
//     },
//     phoneNumber: {
//       type: String,
//       required: true,
//     },
//     address: {
//       type: String,
//       required: true,
//     },
//     city: {
//       type: String,
//       required: true,
//     },
//     district: {
//       type: String,
//     },
//     documents: [
//       {
//         type: {
//           type: String,
//           enum: ["bluebook", "insurance", "pollution"],
//         },
//         label: String,
//         filename: String,
//         originalName: String,
//         path: String,
//         url: String,
//         uploadedAt: Date,
//       },
//     ],
//     status: {
//       type: String,
//       enum: ["pending", "approved", "rejected", "active", "inactive", "booked"],
//       default: "pending",
//     },
//     rejectionReason: {
//       type: String,
//     },
//     approvedBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//     approvedAt: Date,
//     isListed: {
//       type: Boolean,
//       default: false,
//     },
//     listedAt: Date,
//   },
//   {
//     timestamps: true,
//   },
// );

// userVehicleSchema.index({ user: 1 });
// userVehicleSchema.index({ status: 1 });
// userVehicleSchema.index({ carNumber: 1 }, { unique: true });

// export default mongoose.model("UserVehicle", userVehicleSchema);



import mongoose from "mongoose";

const userVehicleSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    carName: { type: String, required: true },
    carNumber: { type: String, required: true, unique: true },
    carType: {
      type: String,
      required: true,
      enum: ["SUV", "Sedan", "Hatchback", "MPV", "Coupe", "Convertible", "Pickup"],
    },
    ratePerDay: { type: Number, required: true, min: 0 },
    seats: { type: Number, required: true, min: 1 },
    bookingType: {
      type: String,
      enum: ["Both", "With Driver", "Without Driver"],
      default: "Both",
    },
    gearType: { type: String, enum: ["Automatic", "Manual"], required: true },
    airCondition: { type: String, enum: ["Yes", "No"], default: "Yes" },
    description: { type: String },
    features: [String],
    vehiclePhotos: [
      {
        filename: String,
        originalName: String,
        path: String,
        url: String,
        label: String,
        uploadedAt: Date,
      },
    ],
    citizenshipFront: {
      filename: String, originalName: String, path: String, url: String, uploadedAt: Date,
    },
    citizenshipBack: {
      filename: String, originalName: String, path: String, url: String, uploadedAt: Date,
    },
    passportPhoto: {
      filename: String, originalName: String, path: String, url: String, uploadedAt: Date,
    },
    fullName: { type: String, required: true },
    citizenshipNumber: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String },
    documents: [
      {
        type: { type: String, enum: ["bluebook", "insurance", "pollution"] },
        label: String,
        filename: String,
        originalName: String,
        path: String,
        url: String,
        uploadedAt: Date,
      },
    ],
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "active", "inactive", "booked", "on_hold"],
      default: "pending",
    },
    holdExpiresAt: { type: Date, default: null },
    rejectionReason: { type: String },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    approvedAt: Date,
    isListed: { type: Boolean, default: false },
    listedAt: Date,
  },
  { timestamps: true }
);

userVehicleSchema.index({ user: 1 });
userVehicleSchema.index({ status: 1 });
userVehicleSchema.index({ carNumber: 1 }, { unique: true });

export default mongoose.model("UserVehicle", userVehicleSchema);