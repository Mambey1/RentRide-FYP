// import Notification from "../models/Notification.js";

// // Create a notification for a user
// export const createNotification = async (userId, title, message, type = "info", details = null, metadata = {}) => {
//   try {
//     const notification = new Notification({
//       user: userId,
//       title,
//       message,
//       type,
//       details,
//       metadata,
//       read: false,
//     });

//     await notification.save();
//     console.log(` Notification created for user ${userId}: ${title}`);
//     return notification;
//   } catch (error) {
//     console.error("Error creating notification:", error);
//     return null;
//   }
// };

// // Create notification for multiple users
// export const createBulkNotifications = async (userIds, title, message, type = "info", details = null, metadata = {}) => {
//   try {
//     const notifications = userIds.map(userId => ({
//       user: userId,
//       title,
//       message,
//       type,
//       details,
//       metadata,
//       read: false,
//     }));

//     await Notification.insertMany(notifications);
//     console.log(`Created ${notifications.length} notifications`);
//     return true;
//   } catch (error) {
//     console.error("Error creating bulk notifications:", error);
//     return false;
//   }
// };

import Notification from "../models/Notification.js";

// Create a notification with action
export const createNotification = async (
  userId,
  title,
  message,
  type = "info",
  details = null,
  metadata = {},
  action = null,
  priority = "medium",
  expiresAt = null,
) => {
  try {
    const notificationData = {
      user: userId,
      title,
      message,
      type,
      details,
      metadata,
      read: false,
      priority,
    };

    if (action) {
      notificationData.action = action;
    }

    if (expiresAt) {
      notificationData.expiresAt = expiresAt;
    }

    const notification = new Notification(notificationData);
    await notification.save();

    console.log(`📧 Notification created for user ${userId}: ${title}`);
    return notification;
  } catch (error) {
    console.error("Error creating notification:", error);
    return null;
  }
};

// Create payment required notification
export const createPaymentRequiredNotification = async (
  userId,
  booking,
  vehicleData,
) => {
  const dueDate = new Date(
    booking.paymentDueDate || Date.now() + 48 * 60 * 60 * 1000,
  );
  const formattedDueDate = dueDate.toLocaleDateString();

  return await createNotification(
    userId,
    "💳 Payment Required - Action Needed",
    `Your booking for ${vehicleData.carName} has been approved! Please complete the payment of रु ${booking.totalAmount.toLocaleString()} to confirm your booking. Payment must be completed by ${formattedDueDate}.`,
    "payment",
    `Booking ID: ${booking.confirmationCode} | Amount: रु ${booking.totalAmount.toLocaleString()}`,
    {
      bookingId: booking._id,
      bookingCode: booking.confirmationCode,
      vehicleName: vehicleData.carName,
      amount: booking.totalAmount,
      dueDate: dueDate,
    },
    {
      type: "payment",
      path: `/payment/${booking._id}`,
      data: {
        bookingId: booking._id,
        amount: booking.totalAmount,
        confirmationCode: booking.confirmationCode,
      },
    },
    "high",
    dueDate,
  );
};

// Create booking approved notification (with payment link)
export const createBookingApprovedNotification = async (
  userId,
  booking,
  vehicleData,
) => {
  return await createNotification(
    userId,
    "✅ Booking Approved! Complete Payment",
    `Great news! Your booking for ${vehicleData.carName} has been approved by the admin. Click here to complete your payment of रु ${booking.totalAmount.toLocaleString()} and confirm your booking.`,
    "success",
    `Booking ID: ${booking.confirmationCode} | Vehicle: ${vehicleData.carName}`,
    {
      bookingId: booking._id,
      bookingCode: booking.confirmationCode,
      vehicleName: vehicleData.carName,
      amount: booking.totalAmount,
      approvedAt: new Date(),
    },
    {
      type: "payment",
      path: `/payment/${booking._id}`,
      data: {
        bookingId: booking._id,
        amount: booking.totalAmount,
        confirmationCode: booking.confirmationCode,
        vehicleName: vehicleData.carName,
      },
    },
    "high",
  );
};

// Create payment success notification
export const createPaymentSuccessNotification = async (
  userId,
  booking,
  vehicleData,
  paymentDetails,
) => {
  return await createNotification(
    userId,
    "🎉 Payment Successful! Booking Confirmed",
    `Your payment of रु ${booking.totalAmount.toLocaleString()} for ${vehicleData.carName} has been successfully processed. Your booking is now confirmed!`,
    "success",
    `Booking ID: ${booking.confirmationCode} | Transaction: ${paymentDetails.transactionId}`,
    {
      bookingId: booking._id,
      bookingCode: booking.confirmationCode,
      vehicleName: vehicleData.carName,
      amount: booking.totalAmount,
      transactionId: paymentDetails.transactionId,
    },
    {
      type: "booking",
      path: `/booking/confirmation/${booking._id}`,
      data: {
        bookingId: booking._id,
        confirmationCode: booking.confirmationCode,
      },
    },
    "high",
  );
};

// Create booking confirmation reminder
export const createBookingConfirmationReminder = async (
  userId,
  booking,
  vehicleData,
) => {
  const hoursRemaining = Math.floor(
    (booking.expiresAt - new Date()) / (1000 * 60 * 60),
  );

  if (hoursRemaining <= 24 && hoursRemaining > 0) {
    return await createNotification(
      userId,
      "⏰ Booking Expiring Soon! Complete Payment",
      `Your booking for ${vehicleData.carName} will expire in ${hoursRemaining} hours. Please complete the payment of रु ${booking.totalAmount.toLocaleString()} to confirm your booking.`,
      "warning",
      `Booking ID: ${booking.confirmationCode} | Expires in: ${hoursRemaining} hours`,
      {
        bookingId: booking._id,
        bookingCode: booking.confirmationCode,
        vehicleName: vehicleData.carName,
        amount: booking.totalAmount,
        expiresAt: booking.expiresAt,
      },
      {
        type: "payment",
        path: `/payment/${booking._id}`,
        data: {
          bookingId: booking._id,
          amount: booking.totalAmount,
        },
      },
      "high",
      booking.expiresAt,
    );
  }
  return null;
};

// Create bulk notifications for multiple users
export const createBulkNotifications = async (
  userIds,
  title,
  message,
  type = "info",
  details = null,
  metadata = {},
  action = null,
) => {
  try {
    const notifications = userIds.map((userId) => ({
      user: userId,
      title,
      message,
      type,
      details,
      metadata,
      read: false,
      action: action || { type: "none" },
    }));

    await Notification.insertMany(notifications);
    console.log(`📧 Created ${notifications.length} notifications`);
    return true;
  } catch (error) {
    console.error("Error creating bulk notifications:", error);
    return false;
  }
};
