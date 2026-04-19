import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import {
  getAllBikes,
  getBikeById,
  createBike,
  updateBike,
  deleteBike,
  updateBikeStatus,
  createBikeBooking,
  getUserBikeBookings,
  getAllBikeBookings,
  approveBikeBooking,
  cancelBikeBooking,
} from "../controllers/bikeController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Multer setup for bike images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads/bikes"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "bike-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

// ========== PUBLIC ROUTES ==========
router.get("/", getAllBikes);
router.get("/:id", getBikeById);

// ========== PROTECTED ROUTES ==========
router.use(protect);

// Bike Bookings
router.post("/bookings", createBikeBooking);
router.get("/bookings/my-bookings", getUserBikeBookings);

// ========== ADMIN ROUTES ==========
router.post("/", adminOnly, upload.array("photos", 5), createBike);
router.put("/:id", adminOnly, upload.array("photos", 5), updateBike);
router.delete("/:id", adminOnly, deleteBike);
router.put("/:id/status", adminOnly, updateBikeStatus);
router.get("/admin/bookings", adminOnly, getAllBikeBookings);
router.put("/admin/bookings/:id/approve", adminOnly, approveBikeBooking);
router.put("/admin/bookings/:id/cancel", adminOnly, cancelBikeBooking);

export default router;