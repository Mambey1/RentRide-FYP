import express from "express";
import {
  uploadReportScreenshot,
  submitReport,
} from "../controllers/reportController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/submit", protect, (req, res, next) => {
  uploadReportScreenshot(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message });
    next();
  });
}, submitReport);

export default router;