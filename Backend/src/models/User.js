// // // import mongoose from "mongoose";

// // // const userSchema = new mongoose.Schema(
// // //   {
// // //     name: {
// // //       type: String,
// // //       required: true,
// // //     },
// // //     email: {
// // //       type: String,
// // //       required: true,
// // //       unique: true,
// // //     },
// // //     password: {
// // //       type: String,
// // //       required: true,
// // //     },
// // //     gender: {
// // //       type: String,
// // //       enum: ['Male', 'Female', 'Other', 'Prefer not to say'],
// // //       default: 'Prefer not to say'
// // //     },
// // //     profilePhoto: {
// // //       type: String,
// // //       default: null
// // //     },
// // //     kycVerified: {
// // //       type: Boolean,
// // //       default: false
// // //     },
// // //     username: {
// // //       type: String,
// // //       default: function() {
// // //         return this.email.split('@')[0];
// // //       }
// // //     }
// // //   },
// // //   { timestamps: true }
// // // );

// // // export default mongoose.model("User", userSchema);

// // import mongoose from "mongoose";

// // const userSchema = new mongoose.Schema(
// //   {
// //     name: {
// //       type: String,
// //       required: true,
// //     },
// //     username: {
// //       type: String,
// //       unique: true,
// //       sparse: true,
// //     },
// //     email: {
// //       type: String,
// //       required: true,
// //       unique: true,
// //     },
// //     password: {
// //       type: String,
// //       required: true,
// //     },
// //     gender: {
// //       type: String,
// //       enum: ["Male", "Female", "Other", "Prefer not to say"],
// //       default: "Prefer not to say",
// //     },
// //     profilePhoto: {
// //       type: String,
// //       default: null,
// //     },
// //     kycVerified: {
// //       type: Boolean,
// //       default: false,
// //     },
// //   },
// //   { timestamps: true }
// // );

// // export default mongoose.model("User", userSchema);

// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     username: {
//       type: String,
//       unique: true,
//       sparse: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     gender: {
//       type: String,
//       enum: ["Male", "Female", "Other", "Prefer not to say"],
//       default: "Prefer not to say",
//     },
//     profilePhoto: {
//       type: String,
//       default: null,
//     },
//     kycVerified: {
//       type: Boolean,
//       default: false,
//     },
//     isEmailVerified: {
//       type: Boolean,
//       default: false,
//     },
//     emailVerificationToken: {
//       type: String,
//       default: null,
//     },
//     emailVerificationTokenExpires: {
//       type: Date,
//       default: null,
//     },
//     emailVerificationOtp: {
//       type: String,
//       default: null,
//     },
//     emailVerificationOtpExpires: {
//       type: Date,
//       default: null,
//     },
//   },
//   { timestamps: true },
// );

// export default mongoose.model("User", userSchema);

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      sparse: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other", "Prefer not to say"],
      default: "Prefer not to say",
    },
    profilePhoto: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["user", "admin", "staff"],
      default: "user",
    },
    kycVerified: {
      type: Boolean,
      default: false,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,
      default: null,
    },
    emailVerificationTokenExpires: {
      type: Date,
      default: null,
    },
    emailVerificationOtp: {
      type: String,
      default: null,
    },
    emailVerificationOtpExpires: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
