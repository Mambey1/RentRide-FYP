import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
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

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "../../uploads/bikes");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("📁 Created bikes upload directory");
}

// Configure multer for bike images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, "bike-" + uniqueSuffix + ext);
  },
});

// File filter — only jpg, jpeg, webp allowed (no png/gif)
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/webp"];
  const allowedExtensions = /\.(jpg|jpeg|webp)$/i;

  if (
    allowedMimeTypes.includes(file.mimetype) &&
    allowedExtensions.test(path.extname(file.originalname))
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, JPEG, and WEBP images are allowed"));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter,
});

// Multer error handler middleware
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ success: false, message: "File size must be less than 5MB" });
    }
    return res.status(400).json({ success: false, message: err.message });
  }
  if (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
  next();
};

// ========== PUBLIC ROUTES ==========
router.get("/", getAllBikes);

// ─── IMPORTANT: Static sub-paths MUST come BEFORE /:id ───────────────────────
// Otherwise Express matches "bookings" as an :id param.

// ========== PROTECTED USER ROUTES ==========
router.post("/bookings", protect, createBikeBooking);
router.get("/bookings/my-bookings", protect, getUserBikeBookings);

// ========== ADMIN BOOKING ROUTES ==========
router.get("/admin/bookings", protect, adminOnly, getAllBikeBookings);
router.put("/admin/bookings/:id/approve", protect, adminOnly, approveBikeBooking);
router.put("/admin/bookings/:id/cancel", protect, adminOnly, cancelBikeBooking);

// ========== DYNAMIC :id ROUTES (must be after all static routes) ==========
router.get("/:id", getBikeById);
router.post("/", protect, adminOnly, upload.array("photos", 3), handleMulterError, createBike);
router.put("/:id", protect, adminOnly, upload.array("photos", 3), handleMulterError, updateBike);
router.delete("/:id", protect, adminOnly, deleteBike);
router.put("/:id/status", protect, adminOnly, updateBikeStatus);

export default router;