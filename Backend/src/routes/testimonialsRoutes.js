const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../uploads/testimonials');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for photo uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'testimonial-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files (JPEG, JPG, PNG, WebP) are allowed'));
    }
  }
});

// ══════════════════════════════════════════════════════════════════════════════
// PUBLIC ROUTES
// ══════════════════════════════════════════════════════════════════════════════

/**
 * @route   GET /api/testimonials
 * @desc    Get all approved testimonials
 * @access  Public
 */
router.get('/testimonials', async (req, res) => {
  try {
    const { limit = 20, skip = 0, rating } = req.query;
    
    const query = { status: 'approved' };
    
    // Filter by rating if provided
    if (rating) {
      query.rating = parseInt(rating);
    }
    
    const testimonials = await Testimonial.find(query)
      .select('-email -rejectionReason -reviewedBy') // Don't expose sensitive data
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .lean();
    
    const total = await Testimonial.countDocuments(query);
    
    res.json({
      success: true,
      data: testimonials,
      pagination: {
        total,
        limit: parseInt(limit),
        skip: parseInt(skip),
        hasMore: total > parseInt(skip) + testimonials.length
      }
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching testimonials',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/testimonials/stats
 * @desc    Get testimonial statistics
 * @access  Public
 */
router.get('/testimonials/stats', async (req, res) => {
  try {
    const averageData = await Testimonial.getAverageRating();
    const distribution = await Testimonial.getRatingDistribution();
    
    res.json({
      success: true,
      data: {
        averageRating: averageData.averageRating,
        totalReviews: averageData.totalCount,
        ratingDistribution: distribution
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
});

/**
 * @route   POST /api/testimonials
 * @desc    Submit a new testimonial (with optional photo)
 * @access  Public
 */
router.post('/testimonials', upload.single('photo'), async (req, res) => {
  try {
    const { name, role, text, rating, location, email, userId, vehicleId, bookingId } = req.body;
    
    // Validation
    if (!name || !role || !text || !rating) {
      return res.status(400).json({
        success: false,
        message: 'Name, role, text, and rating are required'
      });
    }
    
    if (text.length < 20) {
      return res.status(400).json({
        success: false,
        message: 'Review must be at least 20 characters long'
      });
    }
    
    if (text.length > 500) {
      return res.status(400).json({
        success: false,
        message: 'Review cannot exceed 500 characters'
      });
    }
    
    const ratingNum = parseInt(rating);
    if (ratingNum < 1 || ratingNum > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }
    
    const testimonialData = {
      name: name.trim(),
      role: role.trim(),
      text: text.trim(),
      rating: ratingNum,
      status: 'pending' // Requires admin approval
    };
    
    // Optional fields
    if (location) testimonialData.location = location.trim();
    if (email) testimonialData.email = email.trim().toLowerCase();
    if (userId) testimonialData.userId = userId;
    if (vehicleId) testimonialData.vehicleId = vehicleId;
    if (bookingId) testimonialData.bookingId = bookingId;
    
    // Add photo if uploaded
    if (req.file) {
      testimonialData.profilePhoto = req.file.filename;
    }
    
    const testimonial = new Testimonial(testimonialData);
    await testimonial.save();
    
    res.status(201).json({
      success: true,
      message: 'Thank you! Your testimonial has been submitted for review.',
      data: {
        _id: testimonial._id,
        name: testimonial.name,
        status: testimonial.status
      }
    });
  } catch (error) {
    console.error('Error submitting testimonial:', error);
    
    // Delete uploaded file if testimonial creation failed
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error submitting testimonial',
      error: error.message
    });
  }
});

// ══════════════════════════════════════════════════════════════════════════════
// ADMIN ROUTES (Add authentication middleware as needed)
// ══════════════════════════════════════════════════════════════════════════════

/**
 * @route   GET /api/admin/testimonials
 * @desc    Get all testimonials (including pending) - ADMIN ONLY
 * @access  Admin
 */
router.get('/admin/testimonials', async (req, res) => {
  try {
    const { status, limit = 50, skip = 0 } = req.query;
    
    const query = {};
    if (status) query.status = status;
    
    const testimonials = await Testimonial.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .populate('userId', 'name email')
      .populate('reviewedBy', 'name')
      .lean();
    
    const total = await Testimonial.countDocuments(query);
    
    const stats = {
      total,
      pending: await Testimonial.countDocuments({ status: 'pending' }),
      approved: await Testimonial.countDocuments({ status: 'approved' }),
      rejected: await Testimonial.countDocuments({ status: 'rejected' })
    };
    
    res.json({
      success: true,
      data: testimonials,
      stats,
      pagination: {
        total,
        limit: parseInt(limit),
        skip: parseInt(skip)
      }
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching testimonials',
      error: error.message
    });
  }
});

/**
 * @route   PUT /api/admin/testimonials/:id/approve
 * @desc    Approve a testimonial - ADMIN ONLY
 * @access  Admin
 */
router.put('/admin/testimonials/:id/approve', async (req, res) => {
  try {
    const { id } = req.params;
    const { adminId } = req.body; // Get from auth middleware in production
    
    const testimonial = await Testimonial.findByIdAndUpdate(
      id,
      {
        status: 'approved',
        reviewedBy: adminId,
        reviewedAt: new Date()
      },
      { new: true }
    );
    
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Testimonial approved successfully',
      data: testimonial
    });
  } catch (error) {
    console.error('Error approving testimonial:', error);
    res.status(500).json({
      success: false,
      message: 'Error approving testimonial',
      error: error.message
    });
  }
});

/**
 * @route   PUT /api/admin/testimonials/:id/reject
 * @desc    Reject a testimonial - ADMIN ONLY
 * @access  Admin
 */
router.put('/admin/testimonials/:id/reject', async (req, res) => {
  try {
    const { id } = req.params;
    const { adminId, reason } = req.body;
    
    const testimonial = await Testimonial.findByIdAndUpdate(
      id,
      {
        status: 'rejected',
        reviewedBy: adminId,
        reviewedAt: new Date(),
        rejectionReason: reason || 'No reason provided'
      },
      { new: true }
    );
    
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Testimonial rejected',
      data: testimonial
    });
  } catch (error) {
    console.error('Error rejecting testimonial:', error);
    res.status(500).json({
      success: false,
      message: 'Error rejecting testimonial',
      error: error.message
    });
  }
});

/**
 * @route   DELETE /api/admin/testimonials/:id
 * @desc    Delete a testimonial - ADMIN ONLY
 * @access  Admin
 */
router.delete('/admin/testimonials/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const testimonial = await Testimonial.findById(id);
    
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }
    
    // Delete photo if exists
    if (testimonial.profilePhoto && !testimonial.profilePhoto.startsWith('http')) {
      const photoPath = path.join(uploadDir, testimonial.profilePhoto);
      fs.unlink(photoPath, (err) => {
        if (err) console.error('Error deleting photo:', err);
      });
    }
    
    await testimonial.deleteOne();
    
    res.json({
      success: true,
      message: 'Testimonial deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting testimonial',
      error: error.message
    });
  }
});

module.exports = router;