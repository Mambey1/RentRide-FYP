import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { sendBulkEmail } from "../utils/bulkEmailService.js";
import Subscriber from "../models/Subscriber.js";

const router = express.Router();

// Send bulk email to all subscribers (admin only)
router.post("/send-bulk", protect, adminOnly, async (req, res) => {
  try {
    const { subject, message } = req.body;

    if (!subject || !message) {
      return res
        .status(400)
        .json({ success: false, message: "Subject and message are required" });
    }

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb;">Rent<span style="color: #1e40af;">Ride</span></h1>
          <p style="color: #6b7280;">Premium Car Rental Service</p>
        </div>
        <div style="background-color: #f8fafc; padding: 25px; border-radius: 8px;">
          <h2 style="color: #1f2937; margin-top: 0;">${subject}</h2>
          <div style="color: #4b5563; line-height: 1.6;">
            ${message.replace(/\n/g, "<br/>")}
          </div>
        </div>
        <div style="margin-top: 20px; text-align: center; color: #9ca3af; font-size: 12px;">
          <p>© ${new Date().getFullYear()} Rent-Ride. All rights reserved.</p>
        </div>
      </div>
    `;

    const result = await sendBulkEmail(subject, htmlContent, message);

    if (result.success) {
      res.json({
        success: true,
        message: `Email sent to ${result.successCount} subscribers`,
        total: result.total,
        successCount: result.successCount,
        failCount: result.failCount,
      });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Failed to send emails" });
    }
  } catch (error) {
    console.error("Bulk email error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get subscriber count (admin only)
router.get("/subscriber-count", protect, adminOnly, async (req, res) => {
  try {
    const count = await Subscriber.countDocuments({ isActive: true });
    const subscribers = await Subscriber.find({ isActive: true })
      .select("email subscribedAt source")
      .sort({ createdAt: -1 })
      .limit(100);

    res.json({
      success: true,
      count,
      recentSubscribers: subscribers,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
