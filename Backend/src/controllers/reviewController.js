// // reviewController.js - FIXED VERSION
// import Review from "../models/Review.js";
// import Booking from "../models/Booking.js";
// import Vehicle from "../models/Vehicle.js";
// import UserVehicle from "../models/UserVehicle.js";

// // Submit a new review
// export const createReview = async (req, res) => {
//   try {
//     const { vehicleId, rating, comment } = req.body;
//     const userId = req.user.id;

//     console.log("=== CREATE REVIEW DEBUG ===");
//     console.log("User ID:", userId);
//     console.log("Vehicle ID:", vehicleId);
//     console.log("Rating:", rating);
//     console.log("Comment:", comment);

//     if (!vehicleId || !rating || !comment) {
//       return res.status(400).json({
//         success: false,
//         message: "Vehicle ID, rating, and comment are required",
//       });
//     }

//     if (rating < 1 || rating > 5) {
//       return res.status(400).json({
//         success: false,
//         message: "Rating must be between 1 and 5",
//       });
//     }

//     if (comment.length > 1000) {
//       return res.status(400).json({
//         success: false,
//         message: "Comment cannot exceed 1000 characters",
//       });
//     }

//     // Check if vehicle exists and determine model
//     let vehicleModel = null;
//     let vehicleExists = false;

//     const adminVehicle = await Vehicle.findById(vehicleId);
//     if (adminVehicle) {
//       vehicleModel = "Vehicle";
//       vehicleExists = true;
//       console.log("Vehicle found in admin collection");
//     }

//     if (!vehicleExists) {
//       const userVehicle = await UserVehicle.findById(vehicleId);
//       if (userVehicle && userVehicle.status === "approved") {
//         vehicleModel = "UserVehicle";
//         vehicleExists = true;
//         console.log("Vehicle found in user vehicle collection");
//       }
//     }

//     if (!vehicleExists) {
//       return res.status(404).json({
//         success: false,
//         message: "Vehicle not found",
//       });
//     }

//     // Check if user has already reviewed this vehicle
//     const existingReview = await Review.findOne({
//       user: userId,
//       vehicleId: vehicleId,
//       vehicleModel: vehicleModel,
//       isDeleted: false,
//     });

//     if (existingReview) {
//       return res.status(400).json({
//         success: false,
//         message: "You have already reviewed this vehicle",
//       });
//     }

//     // FIXED: Check if user has booked and completed this vehicle
//     // Query for bookings where vehicle matches AND status is completed/confirmed
//     const hasCompletedBooking = await Booking.findOne({
//       user: userId,
//       vehicle: vehicleId,
//       status: { $in: ["completed", "confirmed", "approved"] },
//       paymentStatus: "paid",
//     });

//     console.log("Booking check result:", hasCompletedBooking ? "Found" : "Not found");
//     if (hasCompletedBooking) {
//       console.log("Booking ID:", hasCompletedBooking._id);
//       console.log("Booking Status:", hasCompletedBooking.status);
//       console.log("Payment Status:", hasCompletedBooking.paymentStatus);
//     }

//     if (!hasCompletedBooking) {
//       return res.status(403).json({
//         success: false,
//         message: "You must complete the rental before leaving a review",
//       });
//     }

//     // Create review
//     const review = new Review({
//       user: userId,
//       vehicleId: vehicleId,
//       vehicleModel: vehicleModel,
//       rating: rating,
//       comment: comment,
//     });

//     await review.save();
//     console.log("Review saved successfully with ID:", review._id);

//     // Populate user details for response
//     await review.populate("user", "name email profilePhoto");

//     res.status(201).json({
//       success: true,
//       message: "Review submitted successfully",
//       data: review,
//     });
//   } catch (error) {
//     console.error("Error creating review:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message || "Failed to submit review",
//     });
//   }
// };

// // controllers/reviewController.js - Updated getVehicleReviews
// export const getVehicleReviews = async (req, res) => {
//   try {
//     const { vehicleId } = req.params;

//     console.log("Fetching reviews for vehicle:", vehicleId);

//     if (!vehicleId) {
//       return res.status(400).json({
//         success: false,
//         message: "Vehicle ID is required",
//       });
//     }

//     // Determine vehicle model
//     let vehicleModel = null;
//     const adminVehicle = await Vehicle.findById(vehicleId);
//     if (adminVehicle) {
//       vehicleModel = "Vehicle";
//     } else {
//       const userVehicle = await UserVehicle.findById(vehicleId);
//       if (userVehicle) {
//         vehicleModel = "UserVehicle";
//       }
//     }

//     if (!vehicleModel) {
//       return res.status(404).json({
//         success: false,
//         message: "Vehicle not found",
//       });
//     }

//     // Get ALL reviews for this vehicle (no user filter)
//     const reviews = await Review.find({
//       vehicleId: vehicleId,
//       vehicleModel: vehicleModel,
//       isDeleted: false,
//     })
//       .populate("user", "name email profilePhoto")
//       .sort({ createdAt: -1 });

//     console.log(`Found ${reviews.length} reviews for vehicle ${vehicleId}`);

//     // Get rating statistics - wrap in try-catch to prevent errors
//     let stats = { averageRating: 0, totalReviews: 0, ratingDistribution: {} };
//     try {
//       stats = await Review.getAverageRating(vehicleId, vehicleModel);
//       console.log("Rating stats calculated:", stats);
//     } catch (statsError) {
//       console.error("Error calculating stats:", statsError);
//     }

//     res.status(200).json({
//       success: true,
//       data: {
//         reviews: reviews,
//         averageRating: stats.averageRating || 0,
//         totalReviews: stats.totalReviews || reviews.length,
//         ratingDistribution: stats.ratingDistribution || {},
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching reviews:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message || "Failed to fetch reviews",
//     });
//   }
// };
// // Get user's review for a specific vehicle
// export const getUserVehicleReview = async (req, res) => {
//   try {
//     const { vehicleId } = req.params;
//     const userId = req.user.id;

//     console.log("Checking user review for vehicle:", vehicleId);
//     console.log("User ID:", userId);

//     if (!vehicleId) {
//       return res.status(400).json({
//         success: false,
//         message: "Vehicle ID is required",
//       });
//     }

//     // Determine vehicle model
//     let vehicleModel = null;
//     const adminVehicle = await Vehicle.findById(vehicleId);
//     if (adminVehicle) {
//       vehicleModel = "Vehicle";
//     } else {
//       const userVehicle = await UserVehicle.findById(vehicleId);
//       if (userVehicle) {
//         vehicleModel = "UserVehicle";
//       }
//     }

//     if (!vehicleModel) {
//       return res.status(404).json({
//         success: false,
//         message: "Vehicle not found",
//       });
//     }

//     const review = await Review.findOne({
//       user: userId,
//       vehicleId: vehicleId,
//       vehicleModel: vehicleModel,
//       isDeleted: false,
//     }).populate("user", "name email profilePhoto");

//     console.log("User review found:", review ? "Yes" : "No");

//     res.status(200).json({
//       success: true,
//       data: review || null,
//     });
//   } catch (error) {
//     console.error("Error fetching user review:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message || "Failed to fetch review",
//     });
//   }
// };

// // Update a review
// export const updateReview = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { rating, comment } = req.body;
//     const userId = req.user.id;

//     const review = await Review.findById(id);

//     if (!review) {
//       return res.status(404).json({
//         success: false,
//         message: "Review not found",
//       });
//     }

//     // Check if user owns the review
//     if (review.user.toString() !== userId) {
//       return res.status(403).json({
//         success: false,
//         message: "You are not authorized to update this review",
//       });
//     }

//     if (rating && (rating < 1 || rating > 5)) {
//       return res.status(400).json({
//         success: false,
//         message: "Rating must be between 1 and 5",
//       });
//     }

//     if (comment && comment.length > 1000) {
//       return res.status(400).json({
//         success: false,
//         message: "Comment cannot exceed 1000 characters",
//       });
//     }

//     if (rating) review.rating = rating;
//     if (comment) review.comment = comment;

//     await review.save();
//     await review.populate("user", "name email profilePhoto");

//     res.status(200).json({
//       success: true,
//       message: "Review updated successfully",
//       data: review,
//     });
//   } catch (error) {
//     console.error("Error updating review:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message || "Failed to update review",
//     });
//   }
// };

// // Delete a review (soft delete)
// export const deleteReview = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;

//     const review = await Review.findById(id);

//     if (!review) {
//       return res.status(404).json({
//         success: false,
//         message: "Review not found",
//       });
//     }

//     // Check if user owns the review or is admin
//     const isAdmin = req.user.role === "admin";
//     if (review.user.toString() !== userId && !isAdmin) {
//       return res.status(403).json({
//         success: false,
//         message: "You are not authorized to delete this review",
//       });
//     }

//     // Soft delete
//     review.isDeleted = true;
//     await review.save();

//     res.status(200).json({
//       success: true,
//       message: "Review deleted successfully",
//     });
//   } catch (error) {
//     console.error("Error deleting review:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message || "Failed to delete review",
//     });
//   }
// };

// // Mark review as helpful
// export const markReviewHelpful = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const review = await Review.findById(id);

//     if (!review) {
//       return res.status(404).json({
//         success: false,
//         message: "Review not found",
//       });
//     }

//     review.helpful += 1;
//     await review.save();

//     res.status(200).json({
//       success: true,
//       message: "Review marked as helpful",
//       helpful: review.helpful,
//     });
//   } catch (error) {
//     console.error("Error marking review helpful:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message || "Failed to mark review as helpful",
//     });
//   }
// };

// // Admin: Get all reviews (with filters)
// export const getAllReviews = async (req, res) => {
//   try {
//     const { page = 1, limit = 20, rating, vehicleType, sort = "-createdAt" } = req.query;

//     const query = { isDeleted: false };

//     if (rating) query.rating = parseInt(rating);
//     if (vehicleType) query.vehicleModel = vehicleType;

//     const reviews = await Review.find(query)
//       .populate("user", "name email profilePhoto")
//       .sort(sort)
//       .limit(limit * 1)
//       .skip((page - 1) * limit);

//     const total = await Review.countDocuments(query);

//     res.status(200).json({
//       success: true,
//       data: {
//         reviews,
//         totalPages: Math.ceil(total / limit),
//         currentPage: page,
//         totalReviews: total,
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching all reviews:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message || "Failed to fetch reviews",
//     });
//   }
// };

// reviewController.js - Complete version with likedBy array

import Review from "../models/Review.js";
import Booking from "../models/Booking.js";
import Vehicle from "../models/Vehicle.js";
import UserVehicle from "../models/UserVehicle.js";

// Submit a new review
export const createReview = async (req, res) => {
  try {
    const { vehicleId, rating, comment } = req.body;
    const userId = req.user.id;

    if (!vehicleId || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "Vehicle ID, rating, and comment are required",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    if (comment.length > 1000) {
      return res.status(400).json({
        success: false,
        message: "Comment cannot exceed 1000 characters",
      });
    }

    // Check if vehicle exists
    let vehicleModel = null;
    let vehicleExists = false;

    const adminVehicle = await Vehicle.findById(vehicleId);
    if (adminVehicle) {
      vehicleModel = "Vehicle";
      vehicleExists = true;
    }

    if (!vehicleExists) {
      const userVehicle = await UserVehicle.findById(vehicleId);
      if (userVehicle && userVehicle.status === "approved") {
        vehicleModel = "UserVehicle";
        vehicleExists = true;
      }
    }

    if (!vehicleExists) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    // Check if user has already reviewed
    const existingReview = await Review.findOne({
      user: userId,
      vehicleId: vehicleId,
      vehicleModel: vehicleModel,
      isDeleted: false,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this vehicle",
      });
    }

    // Check if user has completed booking
    const hasCompletedBooking = await Booking.findOne({
      user: userId,
      vehicle: vehicleId,
      status: { $in: ["completed", "confirmed", "approved"] },
      paymentStatus: "paid",
    });

    if (!hasCompletedBooking) {
      return res.status(403).json({
        success: false,
        message: "You must complete the rental before leaving a review",
      });
    }

    // Create review
    const review = new Review({
      user: userId,
      vehicleId: vehicleId,
      vehicleModel: vehicleModel,
      rating: rating,
      comment: comment,
      helpful: 0,
      likedBy: [],
    });

    await review.save();
    await review.populate("user", "name email profilePhoto");

    res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      data: review,
    });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to submit review",
    });
  }
};

// Get all reviews for a vehicle (with user's like status)
// export const getVehicleReviews = async (req, res) => {
//   try {
//     const { vehicleId } = req.params;
//     const currentUserId = req.user?.id;

//     console.log("Fetching reviews for vehicle:", vehicleId);
//     console.log("Current user ID:", currentUserId);

//     if (!vehicleId) {
//       return res.status(400).json({
//         success: false,
//         message: "Vehicle ID is required",
//       });
//     }

//     // Determine vehicle model
//     let vehicleModel = null;
//     const adminVehicle = await Vehicle.findById(vehicleId);
//     if (adminVehicle) {
//       vehicleModel = "Vehicle";
//     } else {
//       const userVehicle = await UserVehicle.findById(vehicleId);
//       if (userVehicle) {
//         vehicleModel = "UserVehicle";
//       }
//     }

//     if (!vehicleModel) {
//       return res.status(404).json({
//         success: false,
//         message: "Vehicle not found",
//       });
//     }

//     // Get all reviews
//     const reviews = await Review.find({
//       vehicleId: vehicleId,
//       vehicleModel: vehicleModel,
//       isDeleted: false,
//     })
//       .populate("user", "name email profilePhoto")
//       .sort({ createdAt: -1 });

//     console.log(`Found ${reviews.length} reviews for vehicle ${vehicleId}`);

//     // Add hasLiked flag using the likedBy array
//     const reviewsWithLikeStatus = reviews.map((review) => {
//       const reviewObj = review.toObject();
//       // Check if current user has liked this review
//       const hasLiked = currentUserId
//         ? review.likedBy?.some((id) => id.toString() === currentUserId)
//         : false;

//       return {
//         ...reviewObj,
//         hasLiked: hasLiked,
//         // Remove likedBy array from response for security (optional)
//         likedBy: undefined,
//       };
//     });

//     // Get rating statistics
//     let stats = { averageRating: 0, totalReviews: 0, ratingDistribution: {} };
//     try {
//       stats = await Review.getAverageRating(vehicleId, vehicleModel);
//       console.log("Rating stats calculated:", stats);
//     } catch (statsError) {
//       console.error("Error calculating stats:", statsError);
//     }

//     res.status(200).json({
//       success: true,
//       data: {
//         reviews: reviewsWithLikeStatus,
//         averageRating: stats.averageRating || 0,
//         totalReviews: stats.totalReviews || reviews.length,
//         ratingDistribution: stats.ratingDistribution || {},
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching reviews:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message || "Failed to fetch reviews",
//     });
//   }
// };


// Get all reviews for a vehicle (PUBLIC - no auth required)
export const getVehicleReviews = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const currentUserId = req.user?.id; // This will be undefined if not logged in

    console.log("Fetching reviews for vehicle:", vehicleId);
    console.log("Current user ID (may be undefined):", currentUserId);

    if (!vehicleId) {
      return res.status(400).json({
        success: false,
        message: "Vehicle ID is required",
      });
    }

    // Determine vehicle model
    let vehicleModel = null;
    const adminVehicle = await Vehicle.findById(vehicleId);
    if (adminVehicle) {
      vehicleModel = "Vehicle";
    } else {
      const userVehicle = await UserVehicle.findById(vehicleId);
      if (userVehicle) {
        vehicleModel = "UserVehicle";
      }
    }

    if (!vehicleModel) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    // Get all reviews
    const reviews = await Review.find({
      vehicleId: vehicleId,
      vehicleModel: vehicleModel,
      isDeleted: false,
    })
      .populate("user", "name email profilePhoto")
      .sort({ createdAt: -1 });

    console.log(`Found ${reviews.length} reviews for vehicle ${vehicleId}`);

    // Add hasLiked flag using the likedBy array (only if user is logged in)
    const reviewsWithLikeStatus = reviews.map(review => {
      const reviewObj = review.toObject();
      const hasLiked = currentUserId 
        ? review.likedBy?.some(id => id.toString() === currentUserId)
        : false;
      
      return {
        ...reviewObj,
        hasLiked: hasLiked,
        likedBy: undefined, // Remove likedBy array from response for security
      };
    });

    // Get rating statistics
    let stats = { averageRating: 0, totalReviews: 0, ratingDistribution: {} };
    try {
      stats = await Review.getAverageRating(vehicleId, vehicleModel);
      console.log("Rating stats calculated:", stats);
    } catch (statsError) {
      console.error("Error calculating stats:", statsError);
    }

    res.status(200).json({
      success: true,
      data: {
        reviews: reviewsWithLikeStatus,
        averageRating: stats.averageRating || 0,
        totalReviews: stats.totalReviews || reviews.length,
        ratingDistribution: stats.ratingDistribution || {},
      },
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch reviews",
    });
  }
};

// // Toggle helpful (like/unlike) - Using likedBy array
// export const toggleReviewHelpful = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;

//     console.log("Toggling helpful for review:", id);
//     console.log("User ID:", userId);

//     // Find the review
//     const review = await Review.findById(id);

//     if (!review) {
//       return res.status(404).json({
//         success: false,
//         message: "Review not found",
//       });
//     }

//     // Prevent users from liking their own review
//     if (review.user.toString() === userId) {
//       return res.status(400).json({
//         success: false,
//         message: "You cannot like your own review",
//       });
//     }

//     // Check if user already liked (convert ObjectIds to strings for comparison)
//     const alreadyLiked = review.likedBy.some((id) => id.toString() === userId);

//     let isLiked = false;
//     let newHelpfulCount = review.helpful;

//     if (alreadyLiked) {
//       // Unlike - remove user from likedBy array
//       review.likedBy = review.likedBy.filter((id) => id.toString() !== userId);
//       newHelpfulCount = Math.max(0, review.helpful - 1);
//       isLiked = false;
//       console.log("User unliked the review");
//     } else {
//       // Like - add user to likedBy array
//       review.likedBy.push(userId);
//       newHelpfulCount = review.helpful + 1;
//       isLiked = true;
//       console.log("User liked the review");
//     }

//     // Update helpful count
//     review.helpful = newHelpfulCount;
//     await review.save();

//     console.log(`Review ${id} now has ${newHelpfulCount} helpful marks`);

//     res.status(200).json({
//       success: true,
//       message: isLiked
//         ? "Review marked as helpful"
//         : "Review unmarked as helpful",
//       helpful: newHelpfulCount,
//       isLiked: isLiked,
//     });
//   } catch (error) {
//     console.error("Error toggling review helpful:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message || "Failed to toggle helpful",
//     });
//   }
// };

// Get user's review for a specific vehicle
export const getUserVehicleReview = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const userId = req.user.id;

    console.log("Checking user review for vehicle:", vehicleId);
    console.log("User ID:", userId);

    if (!vehicleId) {
      return res.status(400).json({
        success: false,
        message: "Vehicle ID is required",
      });
    }

    // Determine vehicle model
    let vehicleModel = null;
    const adminVehicle = await Vehicle.findById(vehicleId);
    if (adminVehicle) {
      vehicleModel = "Vehicle";
    } else {
      const userVehicle = await UserVehicle.findById(vehicleId);
      if (userVehicle) {
        vehicleModel = "UserVehicle";
      }
    }

    if (!vehicleModel) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    const review = await Review.findOne({
      user: userId,
      vehicleId: vehicleId,
      vehicleModel: vehicleModel,
      isDeleted: false,
    }).populate("user", "name email profilePhoto");

    console.log("User review found:", review ? "Yes" : "No");

    res.status(200).json({
      success: true,
      data: review || null,
    });
  } catch (error) {
    console.error("Error fetching user review:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch review",
    });
  }
};
// Toggle helpful (like/unlike) - Using likedBy array
export const toggleReviewHelpful = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    console.log("Toggling helpful for review:", id);
    console.log("User ID:", userId);

    // Find the review
    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    // Prevent users from liking their own review
    if (review.user.toString() === userId) {
      return res.status(400).json({
        success: false,
        message: "You cannot like your own review",
      });
    }

    // Check if user already liked (convert ObjectIds to strings for comparison)
    const alreadyLiked = review.likedBy.some(id => id.toString() === userId);
    
    let isLiked = false;
    let newHelpfulCount = review.helpful;

    if (alreadyLiked) {
      // Unlike - remove user from likedBy array
      review.likedBy = review.likedBy.filter(id => id.toString() !== userId);
      newHelpfulCount = Math.max(0, review.helpful - 1);
      isLiked = false;
      console.log("User unliked the review");
    } else {
      // Like - add user to likedBy array
      review.likedBy.push(userId);
      newHelpfulCount = review.helpful + 1;
      isLiked = true;
      console.log("User liked the review");
    }

    // Update helpful count
    review.helpful = newHelpfulCount;
    await review.save();

    console.log(`Review ${id} now has ${newHelpfulCount} helpful marks`);

    res.status(200).json({
      success: true,
      message: isLiked ? "Review marked as helpful" : "Review unmarked as helpful",
      helpful: newHelpfulCount,
      isLiked: isLiked,
    });
  } catch (error) {
    console.error("Error toggling review helpful:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to toggle helpful",
    });
  }
};
// Update a review
export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.id;

    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    // Check if user owns the review
    if (review.user.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this review",
      });
    }

    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    if (comment && comment.length > 1000) {
      return res.status(400).json({
        success: false,
        message: "Comment cannot exceed 1000 characters",
      });
    }

    if (rating) review.rating = rating;
    if (comment) review.comment = comment;

    await review.save();
    await review.populate("user", "name email profilePhoto");

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: review,
    });
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update review",
    });
  }
};

// Delete a review (soft delete)
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    // Check if user owns the review or is admin
    const isAdmin = req.user.role === "admin";
    if (review.user.toString() !== userId && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this review",
      });
    }

    // Soft delete
    review.isDeleted = true;
    await review.save();

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete review",
    });
  }
};

// Admin: Get all reviews (with filters)
export const getAllReviews = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      rating,
      vehicleType,
      sort = "-createdAt",
    } = req.query;

    const query = { isDeleted: false };

    if (rating) query.rating = parseInt(rating);
    if (vehicleType) query.vehicleModel = vehicleType;

    const reviews = await Review.find(query)
      .populate("user", "name email profilePhoto")
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Review.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        reviews,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        totalReviews: total,
      },
    });
  } catch (error) {
    console.error("Error fetching all reviews:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch reviews",
    });
  }
};
