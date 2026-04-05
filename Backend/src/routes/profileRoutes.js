import express from "express";
import {
  getUserProfile,
  updateUserProfile,
} from "../controllers/profileController.js";
import upload from "../middleware/upload.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getUserProfile);
router.put(
  "/update",
  protect,
  upload.single("profilePhoto"),
  updateUserProfile,
);

export default router;
