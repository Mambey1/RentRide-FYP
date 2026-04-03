import express from "express";
import Subscriber from "../models/Subscriber.js";
import { sendSubscriptionEmail } from "../utils/emailService.js";

const router = express.Router();

// Subscribe to newsletter
router.post("/", async (req, res) => {
  try {
    const { email, source = "newsletter" } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    // Check if already subscribed
    let subscriber = await Subscriber.findOne({ email });

    if (subscriber) {
      // If exists but inactive, reactivate
      if (!subscriber.isActive) {
        subscriber.isActive = true;
        await subscriber.save();
        // Send confirmation email
        await sendSubscriptionEmail(email);
        return res.json({
          success: true,
          message: "Welcome back! You've been resubscribed.",
        });
      }
      // Already active subscriber
      return res.json({ success: true, message: "You're already subscribed!" });
    }

    // Create new subscriber
    subscriber = new Subscriber({
      email,
      source,
      isActive: true,
      subscribedAt: new Date(),
    });

    await subscriber.save();
    console.log(`✅ New subscriber saved: ${email}`);

    // Send confirmation email
    const emailSent = await sendSubscriptionEmail(email);

    if (emailSent) {
      res.json({
        success: true,
        message: "Subscribed successfully! Check your email for confirmation.",
      });
    } else {
      // Email failed but subscriber is saved
      res.json({
        success: true,
        message:
          "Subscribed successfully! (Confirmation email could not be sent)",
      });
    }
  } catch (error) {
    console.error("Subscription error:", error);
    // Handle duplicate key error
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ success: false, message: "This email is already subscribed." });
    }
    res
      .status(500)
      .json({ success: false, message: "Server error. Please try again." });
  }
});

// Unsubscribe
router.post("/unsubscribe", async (req, res) => {
  try {
    const { email } = req.body;

    const subscriber = await Subscriber.findOneAndUpdate(
      { email },
      { isActive: false },
      { new: true },
    );

    if (subscriber) {
      res.json({ success: true, message: "Unsubscribed successfully" });
    } else {
      res.status(404).json({ success: false, message: "Email not found" });
    }
  } catch (error) {
    console.error("Unsubscribe error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get all active subscribers (protected - admin only)
router.get("/all", async (req, res) => {
  try {
    // You should add admin authentication here
    const subscribers = await Subscriber.find({ isActive: true })
      .sort({ createdAt: -1 })
      .select("email subscribedAt source");

    res.json({
      success: true,
      count: subscribers.length,
      subscribers,
    });
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
