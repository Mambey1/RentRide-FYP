const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  getAllVehicles,
  getVehicleForReview,
  approveVehicle,
  rejectVehicle,
  getPendingCount,
  getVehicleStatistics,
  bulkApproveVehicles
} = require('../controllers/adminVehicleController');

// All routes require admin access
router.use(protect, admin);

// Get pending count
router.get('/pending-count', getPendingCount);

// Get statistics
router.get('/stats', getVehicleStatistics);

// Bulk operations
router.post('/bulk-approve', bulkApproveVehicles);

// Get all vehicles with filters
router.get('/', getAllVehicles);

// Review single vehicle
router.get('/:id', getVehicleForReview);

// Approve vehicle
router.put('/:id/approve', approveVehicle);

// Reject vehicle
router.put('/:id/reject', rejectVehicle);

module.exports = router;