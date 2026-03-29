

import express from "express";
import {
  getAllVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} from "../controllers/vehicleController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Get all vehicles (public)
router.get("/", getAllVehicles);

// Get single vehicle (public)
router.get("/:id", getVehicleById);

// Create new vehicle (with up to 5 images) - Admin only
router.post("/", upload.array("photos", 5), createVehicle);

// Update vehicle (with up to 5 images) - Admin only
router.put("/:id", upload.array("photos", 5), updateVehicle);

// Delete vehicle - Admin only
router.delete("/:id", deleteVehicle);

export default router;
