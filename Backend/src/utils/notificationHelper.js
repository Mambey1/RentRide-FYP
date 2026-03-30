import Notification from "../models/Notification.js";

// Create a notification for a user
export const createNotification = async (userId, title, message, type = "info", details = null, metadata = {}) => {
  try {
    const notification = new Notification({
      user: userId,
      title,
      message,
      type,
      details,
      metadata,
      read: false,
    });
    
    await notification.save();
    console.log(`✅ Notification created for user ${userId}: ${title}`);
    return notification;
  } catch (error) {
    console.error("Error creating notification:", error);
    return null;
  }
};

// Create notification for multiple users
export const createBulkNotifications = async (userIds, title, message, type = "info", details = null, metadata = {}) => {
  try {
    const notifications = userIds.map(userId => ({
      user: userId,
      title,
      message,
      type,
      details,
      metadata,
      read: false,
    }));
    
    await Notification.insertMany(notifications);
    console.log(`✅ Created ${notifications.length} notifications`);
    return true;
  } catch (error) {
    console.error("Error creating bulk notifications:", error);
    return false;
  }
};