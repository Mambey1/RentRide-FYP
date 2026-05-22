const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    trim: true,
    maxlength: [100, 'Role cannot exceed 100 characters']
  },
  text: {
    type: String,
    required: [true, 'Review text is required'],
    minlength: [20, 'Review must be at least 20 characters'],
    maxlength: [500, 'Review cannot exceed 500 characters']
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5'],
    default: 5
  },
  location: {
    type: String,
    trim: true,
    maxlength: [100, 'Location cannot exceed 100 characters']
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },
  profilePhoto: {
    type: String, // Filename only, not full path
    default: null
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null // Optional - if user is logged in
  },
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    default: null // Optional - link to specific rental
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    default: null // Optional - link to booking
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null // Admin who approved/rejected
  },
  reviewedAt: {
    type: Date,
    default: null
  },
  rejectionReason: {
    type: String,
    default: null
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

// Index for faster queries
testimonialSchema.index({ status: 1, createdAt: -1 });
testimonialSchema.index({ userId: 1 });
testimonialSchema.index({ rating: 1 });

// Virtual for full photo URL
testimonialSchema.virtual('photoUrl').get(function() {
  if (!this.profilePhoto) return null;
  if (this.profilePhoto.startsWith('http')) return this.profilePhoto;
  return `/uploads/testimonials/${this.profilePhoto}`;
});

// Method to get average rating
testimonialSchema.statics.getAverageRating = async function() {
  const result = await this.aggregate([
    { $match: { status: 'approved' } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' },
        totalCount: { $sum: 1 }
      }
    }
  ]);
  
  return result.length > 0 ? result[0] : { averageRating: 0, totalCount: 0 };
};

// Method to get rating distribution
testimonialSchema.statics.getRatingDistribution = async function() {
  const distribution = await this.aggregate([
    { $match: { status: 'approved' } },
    {
      $group: {
        _id: '$rating',
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: -1 } }
  ]);
  
  return distribution;
};

module.exports = mongoose.model('Testimonial', testimonialSchema);