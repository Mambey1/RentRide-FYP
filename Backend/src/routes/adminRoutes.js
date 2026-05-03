import express from "express";
import {
  getAllUsers,
  getUserDetails,
  giveWarning,
  blockUser,
  unblockUser,
  deleteUser,
  resetWarnings,
  getAllReports,
  updateReportStatus,
  createReport,
} from "../controllers/adminUserController.js";
import { protect } from "../middleware/authMiddleware.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Configure multer for screenshot uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/reports/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "report-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// All routes require authentication
router.use(protect);

// User management routes
router.get("/users", getAllUsers);
router.get("/users/:userId", getUserDetails);
router.post("/users/:userId/warning", giveWarning);
router.post("/users/:userId/block", blockUser);
router.post("/users/:userId/unblock", unblockUser);
router.delete("/users/:userId", deleteUser);
router.post("/users/:userId/reset-warnings", resetWarnings);

// Report routes
router.get("/reports", getAllReports);
router.post("/reports", upload.single("screenshot"), createReport);
router.put("/reports/:reportId", updateReportStatus);

export default router;