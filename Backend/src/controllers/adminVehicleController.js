const UserVehicle = require('../models/UserVehicle');
const User = require('../models/User');
const { sendEmail } = require('../utils/emailService');

// @desc    Get all vehicles for admin (with filters)
// @route   GET /api/admin/vehicles
// @access  Private/Admin
exports.getAllVehicles = async (req, res) => {
  try {
    const { status, page = 1, limit = 10, search } = req.query;
    
    let query = {};
    
    if (status) {
      query.verificationStatus = status;
    }
    
    if (search) {
      query.$or = [
        { carName: { $regex: search, $options: 'i' } },
        { carNumber: { $regex: search, $options: 'i' } },
        { 'userDetails.name': { $regex: search, $options: 'i' } },
        { 'userDetails.email': { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const vehicles = await UserVehicle.find(query)
      .populate('userId', 'name email phone username')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await UserVehicle.countDocuments(query);

    res.json({
      success: true,
      vehicles,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    });

  } catch (error) {
    console.error('Error fetching vehicles for admin:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch vehicles',
      error: error.message
    });
  }
};

// @desc    Get vehicle details for admin review
// @route   GET /api/admin/vehicles/:id
// @access  Private/Admin
exports.getVehicleForReview = async (req, res) => {
  try {
    const vehicle = await UserVehicle.findById(req.params.id)
      .populate('userId', 'name email phone username profilePhoto createdAt');

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      });
    }

    res.json({
      success: true,
      vehicle
    });

  } catch (error) {
    console.error('Error fetching vehicle for review:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch vehicle',
      error: error.message
    });
  }
};

// @desc    Approve vehicle listing
// @route   PUT /api/admin/vehicles/:id/approve
// @access  Private/Admin
exports.approveVehicle = async (req, res) => {
  try {
    const { remarks } = req.body;
    const vehicle = await UserVehicle.findById(req.params.id)
      .populate('userId', 'email name');

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      });
    }

    // Update vehicle status
    vehicle.verificationStatus = 'approved';
    vehicle.isActive = true;
    vehicle.adminRemarks = remarks || 'Vehicle approved successfully';
    vehicle.verifiedBy = req.user.id;
    vehicle.verifiedAt = new Date();

    await vehicle.save();

    // Send email notification to user
    try {
      await sendEmail({
        to: vehicle.userDetails.email || vehicle.userId.email,
        subject: 'Your Vehicle Listing Has Been Approved - RentRide',
        html: `
          <h2>Vehicle Listing Approved</h2>
          <p>Dear ${vehicle.userDetails.name || vehicle.userId.name},</p>
          <p>Congratulations! Your vehicle listing has been approved by our admin team.</p>
          <p><strong>Vehicle Details:</strong></p>
          <ul>
            <li>Car: ${vehicle.carName}</li>
            <li>Number: ${vehicle.carNumber}</li>
            <li>Type: ${vehicle.carType}</li>
          </ul>
          ${remarks ? `<p><strong>Admin Remarks:</strong> ${remarks}</p>` : ''}
          <p>Your vehicle is now live and visible to customers. You can manage your listings from your dashboard.</p>
          <p>Thank you for choosing RentRide!</p>
        `
      });
    } catch (emailError) {
      console.error('Error sending approval email:', emailError);
      // Don't fail the request if email fails
    }

    res.json({
      success: true,
      message: 'Vehicle approved successfully',
      vehicle
    });

  } catch (error) {
    console.error('Error approving vehicle:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to approve vehicle',
      error: error.message
    });
  }
};

// @desc    Reject vehicle listing
// @route   PUT /api/admin/vehicles/:id/reject
// @access  Private/Admin
exports.rejectVehicle = async (req, res) => {
  try {
    const { reason, remarks } = req.body;
    
    if (!reason) {
      return res.status(400).json({
        success: false,
        message: 'Rejection reason is required'
      });
    }

    const vehicle = await UserVehicle.findById(req.params.id)
      .populate('userId', 'email name');

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      });
    }

    // Update vehicle status
    vehicle.verificationStatus = 'rejected';
    vehicle.isActive = false;
    vehicle.rejectionReason = reason;
    vehicle.adminRemarks = remarks || '';
    vehicle.rejectionCount += 1;
    vehicle.verifiedBy = req.user.id;
    vehicle.verifiedAt = new Date();

    await vehicle.save();

    // Send email notification to user
    try {
      await sendEmail({
        to: vehicle.userDetails.email || vehicle.userId.email,
        subject: 'Update on Your Vehicle Listing - RentRide',
        html: `
          <h2>Vehicle Listing Update</h2>
          <p>Dear ${vehicle.userDetails.name || vehicle.userId.name},</p>
          <p>We have reviewed your vehicle listing and unfortunately, it could not be approved at this time.</p>
          <p><strong>Vehicle Details:</strong></p>
          <ul>
            <li>Car: ${vehicle.carName}</li>
            <li>Number: ${vehicle.carNumber}</li>
          </ul>
          <p><strong>Reason for Rejection:</strong> ${reason}</p>
          ${remarks ? `<p><strong>Additional Remarks:</strong> ${remarks}</p>` : ''}
          <p>Please update your listing based on the feedback and resubmit for verification.</p>
          <p>If you have any questions, please contact our support team.</p>
        `
      });
    } catch (emailError) {
      console.error('Error sending rejection email:', emailError);
    }

    res.json({
      success: true,
      message: 'Vehicle rejected successfully',
      vehicle
    });

  } catch (error) {
    console.error('Error rejecting vehicle:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reject vehicle',
      error: error.message
    });
  }
};

// @desc    Get pending vehicles count for admin dashboard
// @route   GET /api/admin/vehicles/pending-count
// @access  Private/Admin
exports.getPendingCount = async (req, res) => {
  try {
    const count = await UserVehicle.countDocuments({ 
      verificationStatus: 'pending' 
    });

    res.json({
      success: true,
      pendingCount: count
    });

  } catch (error) {
    console.error('Error fetching pending count:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch pending count'
    });
  }
};

// @desc    Get vehicle statistics for admin
// @route   GET /api/admin/vehicles/stats
// @access  Private/Admin
exports.getVehicleStatistics = async (req, res) => {
  try {
    const stats = await UserVehicle.aggregate([
      {
        $group: {
          _id: '$verificationStatus',
          count: { $sum: 1 }
        }
      }
    ]);

    const monthlyStats = await UserVehicle.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 6 }
    ]);

    const result = {
      total: 0,
      pending: 0,
      approved: 0,
      rejected: 0
    };

    stats.forEach(stat => {
      result[stat._id] = stat.count;
      result.total += stat.count;
    });

    res.json({
      success: true,
      stats: result,
      monthlyStats
    });

  } catch (error) {
    console.error('Error fetching vehicle statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics'
    });
  }
};

// @desc    Bulk approve vehicles
// @route   POST /api/admin/vehicles/bulk-approve
// @access  Private/Admin
exports.bulkApproveVehicles = async (req, res) => {
  try {
    const { vehicleIds } = req.body;

    if (!vehicleIds || !Array.isArray(vehicleIds) || vehicleIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide vehicle IDs to approve'
      });
    }

    const result = await UserVehicle.updateMany(
      { _id: { $in: vehicleIds } },
      {
        $set: {
          verificationStatus: 'approved',
          isActive: true,
          verifiedBy: req.user.id,
          verifiedAt: new Date(),
          adminRemarks: 'Bulk approved'
        }
      }
    );

    res.json({
      success: true,
      message: `${result.modifiedCount} vehicles approved successfully`,
      modifiedCount: result.modifiedCount
    });

  } catch (error) {
    console.error('Error bulk approving vehicles:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to bulk approve vehicles'
    });
  }
};