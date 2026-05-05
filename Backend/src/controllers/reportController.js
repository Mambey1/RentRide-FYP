import Report from "../models/Report.js";
import User from "../models/User.js";
import multer from "multer";
import path from "path";
import fs from "fs";

// ─── Multer storage for report screenshots ───────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/reports";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `report_${req.user._id}_${Date.now()}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("Only image files are allowed"), false);
};

export const uploadReportScreenshot = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
}).single("screenshot");

// ─── POST /api/reports/submit ─────────────────────────────────────────────────
// Authenticated user reports another user
export const submitReport = async (req, res) => {
  try {
    const { reportedUser, reason, description } = req.body;
    const reportedBy = req.user._id;

    // Validate required fields
    if (!reportedUser || !reason || !description?.trim()) {
      return res.status(400).json({ message: "reportedUser, reason and description are required." });
    }

    // Cannot report yourself
    if (reportedUser.toString() === reportedBy.toString()) {
      return res.status(400).json({ message: "You cannot report yourself." });
    }

    // Check reported user exists
    const target = await User.findById(reportedUser);
    if (!target) return res.status(404).json({ message: "Reported user not found." });

    // Rate-limit: max 1 active report per (reporter → reported) pair
    const existing = await Report.findOne({
      reportedBy,
      reportedUser,
      status: "pending",
    });
    if (existing) {
      return res.status(409).json({ message: "You already have a pending report against this user." });
    }

    const screenshotProof = req.file
      ? `/uploads/reports/${req.file.filename}`
      : null;

    const report = await Report.create({
      reportedBy,
      reportedUser,
      reason,
      description: description.trim(),
      screenshotProof,
    });

    res.status(201).json({ message: "Report submitted successfully.", report });
  } catch (err) {
    console.error("submitReport error:", err);
    res.status(500).json({ message: "Failed to submit report." });
  }
};

// ─── GET /api/admin/reports ───────────────────────────────────────────────────
// Admin: list all reports, newest first
export const getAllReports = async (req, res) => {
  try {
    const { status, page = 1, limit = 50 } = req.query;

    const filter = {};
    if (status && status !== "all") filter.status = status;

    const reports = await Report.find(filter)
      .populate("reportedBy", "name email profilePhoto")
      .populate("reportedUser", "name email profilePhoto isBlocked warningCount")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Report.countDocuments(filter);

    res.json({ reports, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    console.error("getAllReports error:", err);
    res.status(500).json({ message: "Failed to fetch reports." });
  }
};

// ─── PATCH /api/admin/reports/:reportId/status ────────────────────────────────
// Admin: update report status and optionally add a note
export const updateReportStatus = async (req, res) => {
  try {
    const { reportId } = req.params;
    const { status, adminNote, actionTaken } = req.body;

    const allowed = ["reviewed", "action_taken", "dismissed"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: `Status must be one of: ${allowed.join(", ")}` });
    }

    const report = await Report.findById(reportId);
    if (!report) return res.status(404).json({ message: "Report not found." });

    report.status = status;
    if (adminNote !== undefined) report.adminNote = adminNote.trim() || null;
    if (actionTaken !== undefined) report.actionTaken = actionTaken;

    await report.save();

    const populated = await report.populate([
      { path: "reportedBy", select: "name email" },
      { path: "reportedUser", select: "name email" },
    ]);

    res.json({ message: "Report updated.", report: populated });
  } catch (err) {
    console.error("updateReportStatus error:", err);
    res.status(500).json({ message: "Failed to update report." });
  }
};

// ─── GET /api/admin/reports/:reportId ────────────────────────────────────────
export const getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.reportId)
      .populate("reportedBy", "name email profilePhoto")
      .populate("reportedUser", "name email profilePhoto isBlocked warningCount")
      .populate("givenBy", "name email");

    if (!report) return res.status(404).json({ message: "Report not found." });
    res.json({ report });
  } catch (err) {
    console.error("getReportById error:", err);
    res.status(500).json({ message: "Failed to fetch report." });
  }
};

// ─── DELETE /api/admin/reports/:reportId ─────────────────────────────────────
export const deleteReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.reportId);
    if (!report) return res.status(404).json({ message: "Report not found." });

    // Remove screenshot file if exists
    if (report.screenshotProof) {
      const filePath = `.${report.screenshotProof}`;
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await report.deleteOne();
    res.json({ message: "Report deleted." });
  } catch (err) {
    console.error("deleteReport error:", err);
    res.status(500).json({ message: "Failed to delete report." });
  }
};