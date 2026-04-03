import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import {
  getAdminVehicleRevenue,
  getUserVehicleRevenue,
  getCombinedRevenue,
  getRevenueByVehicle
} from "../controllers/revenueController.js";

const router = express.Router();

// All revenue routes require admin authentication
router.use(protect, adminOnly);

router.get("/admin-vehicles", getAdminVehicleRevenue);
router.get("/user-vehicles", getUserVehicleRevenue);
router.get("/combined", getCombinedRevenue);
router.get("/by-vehicle", getRevenueByVehicle);

export default router;