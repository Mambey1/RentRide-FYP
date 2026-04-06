// // models/Review.js - FIXED getAverageRating method
// import mongoose from "mongoose";

// const reviewSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     vehicleId: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       refPath: "vehicleModel",
//     },
//     vehicleModel: {
//       type: String,
//       required: true,
//       enum: ["Vehicle", "UserVehicle"],
//     },
//     rating: {
//       type: Number,
//       required: true,
//       min: 1,
//       max: 5,
//     },
//     comment: {
//       type: String,
//       required: true,
//       trim: true,
//       maxlength: 1000,
//     },
//     isDeleted: {
//       type: Boolean,
//       default: false,
//     },
//     helpful: {
//       type: Number,
//       default: 0,
//     },
//   },
//   {
//     timestamps: true,
//   },
// );

// // Ensure one review per user per vehicle (prevent duplicate reviews)
// reviewSchema.index(
//   { user: 1, vehicleId: 1, vehicleModel: 1 },
//   { unique: true },
// );

// // Index for faster queries
// reviewSchema.index({ vehicleId: 1, vehicleModel: 1, createdAt: -1 });
// reviewSchema.index({ rating: 1 });
// reviewSchema.index({ user: 1 });

// // FIXED: Virtual for average rating (static method)
// reviewSchema.statics.getAverageRating = async function (
//   vehicleId,
//   vehicleModel,
// ) {
//   // Convert string to ObjectId properly using 'new'
//   const objectId = new mongoose.Types.ObjectId(vehicleId);

//   const result = await this.aggregate([
//     {
//       $match: {
//         vehicleId: objectId,
//         vehicleModel: vehicleModel,
//         isDeleted: false,
//       },
//     },
//     {
//       $group: {
//         _id: null,
//         averageRating: { $avg: "$rating" },
//         totalReviews: { $sum: 1 },
//         ratingCounts: {
//           $push: "$rating",
//         },
//       },
//     },
//   ]);

//   if (result.length === 0) {
//     return { averageRating: 0, totalReviews: 0, ratingDistribution: {} };
//   }

//   // Calculate rating distribution
//   const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
//   if (result[0].ratingCounts) {
//     result[0].ratingCounts.forEach((rating) => {
//       ratingCounts[rating] = (ratingCounts[rating] || 0) + 1;
//     });
//   }

//   return {
//     averageRating: result[0].averageRating
//       ? parseFloat(result[0].averageRating.toFixed(1))
//       : 0,
//     totalReviews: result[0].totalReviews || 0,
//     ratingDistribution: ratingCounts,
//   };
// };

// const Review = mongoose.model("Review", reviewSchema);
// export default Review;

// models/Review.js - Final version with likedBy array
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "vehicleModel",
    },
    vehicleModel: {
      type: String,
      required: true,
      enum: ["Vehicle", "UserVehicle"],
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    helpful: {
      type: Number,
      default: 0,
    },
    likedBy: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

// Indexes
reviewSchema.index(
  { user: 1, vehicleId: 1, vehicleModel: 1 },
  { unique: true },
);
reviewSchema.index({ vehicleId: 1, vehicleModel: 1, createdAt: -1 });
reviewSchema.index({ rating: 1 });
reviewSchema.index({ user: 1 });
reviewSchema.index({ likedBy: 1 }); // For "reviews liked by user" queries

// Get average rating
reviewSchema.statics.getAverageRating = async function (
  vehicleId,
  vehicleModel,
) {
  const objectId = new mongoose.Types.ObjectId(vehicleId);

  const result = await this.aggregate([
    {
      $match: {
        vehicleId: objectId,
        vehicleModel: vehicleModel,
        isDeleted: false,
      },
    },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
        totalReviews: { $sum: 1 },
        ratingCounts: { $push: "$rating" },
      },
    },
  ]);

  if (result.length === 0) {
    return { averageRating: 0, totalReviews: 0, ratingDistribution: {} };
  }

  const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  result[0].ratingCounts?.forEach((rating) => {
    ratingCounts[rating]++;
  });

  return {
    averageRating: result[0].averageRating
      ? parseFloat(result[0].averageRating.toFixed(1))
      : 0,
    totalReviews: result[0].totalReviews || 0,
    ratingDistribution: ratingCounts,
  };
};

const Review = mongoose.model("Review", reviewSchema);
export default Review;
    