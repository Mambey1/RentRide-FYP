// /Backend/src/jobs/autoUpdateScheduler.js
import cron from "node-cron";
import { autoUpdateBookingStatuses } from "../controllers/bookingController.js";
import Vehicle from "../models/Vehicle.js";
import UserVehicle from "../models/UserVehicle.js";
import Booking from "../models/Booking.js";

// Function to release vehicles with no active bookings
export const releaseExpiredVehicleHolds = async () => {
  try {
    const now = new Date();
    let releasedCount = 0;
    
    console.log(`🔄 Running vehicle release check at ${now.toISOString()}`);
    
    // Find all admin vehicles that are marked as "On Hold" or "Booked"
    const adminVehicles = await Vehicle.find({
      status: { $in: ["On Hold", "Booked"] }
    });
    
    for (const vehicle of adminVehicles) {
      const activeBookings = await Booking.find({
        vehicle: vehicle._id,
        vehicleModel: "Vehicle",
        status: { $in: ["confirmed", "active", "approved"] },
        returnDate: { $gt: now }
      });
      
      if (activeBookings.length === 0) {
        vehicle.status = "Available";
        vehicle.holdExpiresAt = null;
        await vehicle.save();
        releasedCount++;
        console.log(`✅ Released vehicle ${vehicle.carName}`);
      }
    }
    
    // Find all user vehicles that are marked as "On_Hold" or "booked"
    const userVehicles = await UserVehicle.find({
      status: { $in: ["On_Hold", "booked"] }
    });
    
    for (const vehicle of userVehicles) {
      const activeBookings = await Booking.find({
        vehicle: vehicle._id,
        vehicleModel: "UserVehicle",
        status: { $in: ["confirmed", "active", "approved"] },
        returnDate: { $gt: now }
      });
      
      if (activeBookings.length === 0) {
        vehicle.status = "active";
        vehicle.isListed = true;
        vehicle.holdExpiresAt = null;
        await vehicle.save();
        releasedCount++;
        console.log(`✅ Released user vehicle ${vehicle.carName}`);
      }
    }
    
    console.log(`✅ Released ${releasedCount} vehicles`);
    return releasedCount;
  } catch (error) {
    console.error("Error releasing vehicles:", error);
    return 0;
  }
};

// Start all auto-update jobs
export const startAutoUpdateJobs = () => {
  console.log("🕐 Auto-update scheduler started");
  
  // Run every hour
  cron.schedule("0 * * * *", async () => {
    console.log("🔄 Running scheduled auto-update...");
    try {
      await autoUpdateBookingStatuses(null, null);
      await releaseExpiredVehicleHolds();
      console.log("✅ Scheduled auto-update completed");
    } catch (error) {
      console.error("❌ Scheduled auto-update failed:", error);
    }
  });
  
  // Run initial check on startup
  setTimeout(async () => {
    console.log("🔄 Running initial auto-update on startup...");
    try {
      await autoUpdateBookingStatuses(null, null);
      await releaseExpiredVehicleHolds();
      console.log("✅ Initial auto-update completed");
    } catch (error) {
      console.error("❌ Initial auto-update failed:", error);
    }
  }, 5000);
};