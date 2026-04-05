import cron from "node-cron";
import { autoUpdateBookingStatuses } from "../controllers/bookingController.js";

// Run every hour at minute 0 (e.g., 1:00, 2:00, 3:00)
export const startScheduler = () => {
  console.log("🕐 Starting booking status scheduler...");
  
  // Run every hour
  cron.schedule("0 * * * *", async () => {
    console.log("🔄 Running scheduled booking status update...", new Date().toISOString());
    try {
      const count = await autoUpdateBookingStatuses({}, {});
      if (count > 0) {
        console.log(`✅ Updated ${count} expired bookings`);
      }
    } catch (error) {
      console.error("Scheduled task error:", error);
    }
  });
  
  // Also run at server startup to catch any missed updates
  setTimeout(async () => {
    console.log("🔄 Running initial booking status update on startup...");
    await autoUpdateBookingStatuses({}, {});
  }, 5000);
  
  console.log("✅ Scheduler started - will check every hour");
};