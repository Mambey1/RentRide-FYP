

import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { protect, authorize } from "../middleware/authMiddleware.js";
import UserVehicle from "../models/UserVehicle.js";
import {
  listVehicle,
  getUserVehicles,
  getUserVehicleById,
  updateUserVehicle,
  deleteUserVehicle,
  getAllUserVehicles,
  approveUserVehicle,
  rejectUserVehicle,
  activateUserVehicle,
  deactivateUserVehicle,
  deleteUserVehicleAdmin,
} from "../controllers/userVehicleController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../../uploads/user-vehicles");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, PNG, and PDF are allowed."));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// ========== PUBLIC ROUTES (NO AUTHENTICATION REQUIRED) ==========
// These must be placed BEFORE router.use(protect)

// Test route to check if router is working
router.get("/test", (req, res) => {
  res.json({ success: true, message: "User vehicles route is working" });
});

// Public route to get approved and active user vehicles (no authentication required)
router.get("/public/active", async (req, res) => {
  try {
    console.log("Fetching public user vehicles...");
    const vehicles = await UserVehicle.find({
      status: "active",
      isListed: true,
    }).select(
      "-documents -citizenshipFront -citizenshipBack -passportPhoto -__v",
    );

    console.log(`Found ${vehicles.length} active user vehicles`);

    const formattedVehicles = vehicles.map((vehicle) => ({
      _id: vehicle._id,
      carName: vehicle.carName,
      carNumber: vehicle.carNumber,
      carType: vehicle.carType,
      ratePerDay: vehicle.ratePerDay,
      seats: vehicle.seats,
      bookingType: vehicle.bookingType,
      gearType: vehicle.gearType,
      airCondition: vehicle.airCondition,
      description: vehicle.description,
      features: vehicle.features,
      photos: vehicle.vehiclePhotos,
      phoneNumber: vehicle.phoneNumber,
      driverName: vehicle.driverName,
      status: "Available",
      source: "user",
      owner: vehicle.fullName,
      ownerPhone: vehicle.phoneNumber,
    }));

    res.status(200).json({
      success: true,
      data: formattedVehicles,
    });
  } catch (error) {
    console.error("Error fetching public user vehicles:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch vehicles",
    });
  }
});

// ========== PROTECTED ROUTES (AUTHENTICATION REQUIRED) ==========
// All routes below require authentication
router.use(protect);

// User routes
router.post(
  "/list",
  upload.fields([
    { name: "vehiclePhotos", maxCount: 5 },
    { name: "citizenshipFront", maxCount: 1 },
    { name: "citizenshipBack", maxCount: 1 },
    { name: "passportPhoto", maxCount: 1 },
    { name: "blueBook", maxCount: 1 },
    { name: "insurance", maxCount: 1 },
    { name: "pollution", maxCount: 1 },
  ]),
  listVehicle,
);

router.get("/my-vehicles", getUserVehicles);
router.get("/:id", getUserVehicleById);
router.put("/:id", updateUserVehicle);
router.delete("/:id", deleteUserVehicle);

// Admin routes - require admin or staff role
router.get("/admin/all", authorize("admin", "staff"), getAllUserVehicles);
router.post(
  "/admin/:id/approve",
  authorize("admin", "staff"),
  approveUserVehicle,
);
router.post(
  "/admin/:id/reject",
  authorize("admin", "staff"),
  rejectUserVehicle,
);
router.put(
  "/admin/:id/activate",
  authorize("admin", "staff"),
  activateUserVehicle,
);
router.put(
  "/admin/:id/deactivate",
  authorize("admin", "staff"),
  deactivateUserVehicle,
);
router.delete(
  "/admin/:id/delete",
  authorize("admin", "staff"),
  deleteUserVehicleAdmin,
);

export default router;
