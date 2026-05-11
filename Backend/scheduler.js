import cron from "node-cron";
import Booking from "./src/models/Booking.js";
import BikeBooking from "./src/models/BikeBooking.js";
import Vehicle from "./src/models/Vehicle.js";
import UserVehicle from "./src/models/UserVehicle.js";
import Bike from "./src/models/Bike.js";
import {
  createVehicleHoldExpiredNotification,
  createBikeHoldExpiredNotification,
} from "./src/utils/notificationHelper.js";

export const startScheduler = () => {
  console.log("⏰ Scheduler started — checking holds every minute");

  // Every minute
  cron.schedule("* * * * *", async () => {
    await releaseExpiredHolds();
  });

  // Every hour — send 12-hour warning reminders
  cron.schedule("0 * * * *", async () => {
    await sendHoldExpiryReminders();
  });
};

// ── Release vehicles/bikes whose 24hr hold has expired ───────────────────────
async function releaseExpiredHolds() {
  const now = new Date();

  // ── Car bookings ────────────────────────────────────────────────────────────
  try {
    const expiredCarBookings = await Booking.find({
      status: "approved",
      paymentStatus: { $in: ["pending", "failed"] },
      holdExpiresAt: { $lte: now, $ne: null },
    }).populate("user", "name email _id");

    for (const booking of expiredCarBookings) {
      try {
        // Get vehicle name before anything
        let vehicleName = "your vehicle";
        if (booking.vehicleType === "user") {
          const uv = await UserVehicle.findById(booking.vehicle);
          vehicleName = uv?.carName || vehicleName;
          await UserVehicle.findByIdAndUpdate(booking.vehicle, {
            status: "active",
            isListed: true,
            holdExpiresAt: null,
          });
        } else {
          const v = await Vehicle.findById(booking.vehicle);
          vehicleName = v?.carName || vehicleName;
          await Vehicle.findByIdAndUpdate(booking.vehicle, {
            status: "Available",
            holdExpiresAt: null,
          });
        }

        // Cancel the booking
        await Booking.findByIdAndUpdate(booking._id, {
          status: "expired",
          cancellationReason: "Payment not completed within 24 hours — hold released automatically",
          cancellationDate: now,
        });

        // Notify user
        if (booking.user?._id) {
          await createVehicleHoldExpiredNotification(booking.user._id, booking, vehicleName);
        }

        console.log(`✅ Hold released — car booking ${booking.confirmationCode} expired`);
      } catch (err) {
        console.error(`Error releasing car hold for booking ${booking._id}:`, err.message);
      }
    }
  } catch (err) {
    console.error("Error querying expired car bookings:", err.message);
  }

  // ── Bike bookings ───────────────────────────────────────────────────────────
  try {
    const expiredBikeBookings = await BikeBooking.find({
      status: "approved",
      paymentStatus: { $in: ["pending", "failed"] },
      holdExpiresAt: { $lte: now, $ne: null },
    }).populate("user", "name email _id");

    for (const booking of expiredBikeBookings) {
      try {
        const bike = await Bike.findById(booking.bike);
        const bikeName = bike?.bikeName || "your bike";

        await Bike.findByIdAndUpdate(booking.bike, {
          status: "Available",
          holdExpiresAt: null,
        });

        await BikeBooking.findByIdAndUpdate(booking._id, {
          status: "expired",
          cancellationReason: "Payment not completed within 24 hours — hold released automatically",
          cancellationDate: now,
        });

        if (booking.user?._id) {
          await createBikeHoldExpiredNotification(booking.user._id, booking, bikeName);
        }

        console.log(`✅ Hold released — bike booking ${booking.confirmationCode} expired`);
      } catch (err) {
        console.error(`Error releasing bike hold for booking ${booking._id}:`, err.message);
      }
    }
  } catch (err) {
    console.error("Error querying expired bike bookings:", err.message);
  }
}

// ── Send 12-hour warning reminders ───────────────────────────────────────────
async function sendHoldExpiryReminders() {
  const now = new Date();
  const in12Hours = new Date(now.getTime() + 12 * 60 * 60 * 1000);
  const in13Hours = new Date(now.getTime() + 13 * 60 * 60 * 1000);

  try {
    const soonExpiring = await Booking.find({
      status: "approved",
      paymentStatus: "pending",
      holdExpiresAt: { $gte: in12Hours, $lte: in13Hours },
    }).populate("user", "name email _id");

    for (const booking of soonExpiring) {
      try {
        const { createBookingConfirmationReminder } = await import("./src/utils/notificationHelper.js");
        let vehicleData = { carName: "your vehicle" };
        if (booking.vehicleType === "user") {
          const uv = await UserVehicle.findById(booking.vehicle);
          if (uv) vehicleData = { carName: uv.carName };
        } else {
          const v = await Vehicle.findById(booking.vehicle);
          if (v) vehicleData = { carName: v.carName };
        }
        await createBookingConfirmationReminder(booking.user._id, booking, vehicleData);
        console.log(`⏰ 12-hour reminder sent for booking ${booking.confirmationCode}`);
      } catch (err) {
        console.error(`Error sending reminder for booking ${booking._id}:`, err.message);
      }
    }
  } catch (err) {
    console.error("Error querying soon-expiring bookings:", err.message);
  }
}