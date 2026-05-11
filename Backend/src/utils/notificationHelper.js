// // // // import Notification from "../models/Notification.js";

// // // // // Create a notification for a user
// // // // export const createNotification = async (userId, title, message, type = "info", details = null, metadata = {}) => {
// // // //   try {
// // // //     const notification = new Notification({
// // // //       user: userId,
// // // //       title,
// // // //       message,
// // // //       type,
// // // //       details,
// // // //       metadata,
// // // //       read: false,
// // // //     });

// // // //     await notification.save();
// // // //     console.log(` Notification created for user ${userId}: ${title}`);
// // // //     return notification;
// // // //   } catch (error) {
// // // //     console.error("Error creating notification:", error);
// // // //     return null;
// // // //   }
// // // // };

// // // // // Create notification for multiple users
// // // // export const createBulkNotifications = async (userIds, title, message, type = "info", details = null, metadata = {}) => {
// // // //   try {
// // // //     const notifications = userIds.map(userId => ({
// // // //       user: userId,
// // // //       title,
// // // //       message,
// // // //       type,
// // // //       details,
// // // //       metadata,
// // // //       read: false,
// // // //     }));

// // // //     await Notification.insertMany(notifications);
// // // //     console.log(`Created ${notifications.length} notifications`);
// // // //     return true;
// // // //   } catch (error) {
// // // //     console.error("Error creating bulk notifications:", error);
// // // //     return false;
// // // //   }
// // // // };

// // // // import Notification from "../models/Notification.js";

// // // // // Create a notification with action
// // // // export const createNotification = async (
// // // //   userId,
// // // //   title,
// // // //   message,
// // // //   type = "info",
// // // //   details = null,
// // // //   metadata = {},
// // // //   action = null,
// // // //   priority = "medium",
// // // //   expiresAt = null,
// // // // ) => {
// // // //   try {
// // // //     const notificationData = {
// // // //       user: userId,
// // // //       title,
// // // //       message,
// // // //       type,
// // // //       details,
// // // //       metadata,
// // // //       read: false,
// // // //       priority,
// // // //     };

// // // //     if (action) {
// // // //       notificationData.action = action;
// // // //     }

// // // //     if (expiresAt) {
// // // //       notificationData.expiresAt = expiresAt;
// // // //     }

// // // //     const notification = new Notification(notificationData);
// // // //     await notification.save();

// // // //     console.log(`📧 Notification created for user ${userId}: ${title}`);
// // // //     return notification;
// // // //   } catch (error) {
// // // //     console.error("Error creating notification:", error);
// // // //     return null;
// // // //   }
// // // // };

// // // // // Create payment required notification
// // // // export const createPaymentRequiredNotification = async (
// // // //   userId,
// // // //   booking,
// // // //   vehicleData,
// // // // ) => {
// // // //   const dueDate = new Date(
// // // //     booking.paymentDueDate || Date.now() + 48 * 60 * 60 * 1000,
// // // //   );
// // // //   const formattedDueDate = dueDate.toLocaleDateString();

// // // //   return await createNotification(
// // // //     userId,
// // // //     "💳 Payment Required - Action Needed",
// // // //     `Your booking for ${vehicleData.carName} has been approved! Please complete the payment of रु ${booking.totalAmount.toLocaleString()} to confirm your booking. Payment must be completed by ${formattedDueDate}.`,
// // // //     "payment",
// // // //     `Booking ID: ${booking.confirmationCode} | Amount: रु ${booking.totalAmount.toLocaleString()}`,
// // // //     {
// // // //       bookingId: booking._id,
// // // //       bookingCode: booking.confirmationCode,
// // // //       vehicleName: vehicleData.carName,
// // // //       amount: booking.totalAmount,
// // // //       dueDate: dueDate,
// // // //     },
// // // //     {
// // // //       type: "payment",
// // // //       path: `/payment/${booking._id}`,
// // // //       data: {
// // // //         bookingId: booking._id,
// // // //         amount: booking.totalAmount,
// // // //         confirmationCode: booking.confirmationCode,
// // // //       },
// // // //     },
// // // //     "high",
// // // //     dueDate,
// // // //   );
// // // // };

// // // // // Create booking approved notification (with payment link)
// // // // export const createBookingApprovedNotification = async (
// // // //   userId,
// // // //   booking,
// // // //   vehicleData,
// // // // ) => {
// // // //   return await createNotification(
// // // //     userId,
// // // //     "✅ Booking Approved! Complete Payment",
// // // //     `Great news! Your booking for ${vehicleData.carName} has been approved by the admin. Click here to complete your payment of रु ${booking.totalAmount.toLocaleString()} and confirm your booking.`,
// // // //     "success",
// // // //     `Booking ID: ${booking.confirmationCode} | Vehicle: ${vehicleData.carName}`,
// // // //     {
// // // //       bookingId: booking._id,
// // // //       bookingCode: booking.confirmationCode,
// // // //       vehicleName: vehicleData.carName,
// // // //       amount: booking.totalAmount,
// // // //       approvedAt: new Date(),
// // // //     },
// // // //     {
// // // //       type: "payment",
// // // //       path: `/payment/${booking._id}`,
// // // //       data: {
// // // //         bookingId: booking._id,
// // // //         amount: booking.totalAmount,
// // // //         confirmationCode: booking.confirmationCode,
// // // //         vehicleName: vehicleData.carName,
// // // //       },
// // // //     },
// // // //     "high",
// // // //   );
// // // // };

// // // // // Create payment success notification
// // // // export const createPaymentSuccessNotification = async (
// // // //   userId,
// // // //   booking,
// // // //   vehicleData,
// // // //   paymentDetails,
// // // // ) => {
// // // //   return await createNotification(
// // // //     userId,
// // // //     "🎉 Payment Successful! Booking Confirmed",
// // // //     `Your payment of रु ${booking.totalAmount.toLocaleString()} for ${vehicleData.carName} has been successfully processed. Your booking is now confirmed!`,
// // // //     "success",
// // // //     `Booking ID: ${booking.confirmationCode} | Transaction: ${paymentDetails.transactionId}`,
// // // //     {
// // // //       bookingId: booking._id,
// // // //       bookingCode: booking.confirmationCode,
// // // //       vehicleName: vehicleData.carName,
// // // //       amount: booking.totalAmount,
// // // //       transactionId: paymentDetails.transactionId,
// // // //     },
// // // //     {
// // // //       type: "booking",
// // // //       path: `/booking/confirmation/${booking._id}`,
// // // //       data: {
// // // //         bookingId: booking._id,
// // // //         confirmationCode: booking.confirmationCode,
// // // //       },
// // // //     },
// // // //     "high",
// // // //   );
// // // // };

// // // // // Create booking confirmation reminder
// // // // export const createBookingConfirmationReminder = async (
// // // //   userId,
// // // //   booking,
// // // //   vehicleData,
// // // // ) => {
// // // //   const hoursRemaining = Math.floor(
// // // //     (booking.expiresAt - new Date()) / (1000 * 60 * 60),
// // // //   );

// // // //   if (hoursRemaining <= 24 && hoursRemaining > 0) {
// // // //     return await createNotification(
// // // //       userId,
// // // //       "⏰ Booking Expiring Soon! Complete Payment",
// // // //       `Your booking for ${vehicleData.carName} will expire in ${hoursRemaining} hours. Please complete the payment of रु ${booking.totalAmount.toLocaleString()} to confirm your booking.`,
// // // //       "warning",
// // // //       `Booking ID: ${booking.confirmationCode} | Expires in: ${hoursRemaining} hours`,
// // // //       {
// // // //         bookingId: booking._id,
// // // //         bookingCode: booking.confirmationCode,
// // // //         vehicleName: vehicleData.carName,
// // // //         amount: booking.totalAmount,
// // // //         expiresAt: booking.expiresAt,
// // // //       },
// // // //       {
// // // //         type: "payment",
// // // //         path: `/payment/${booking._id}`,
// // // //         data: {
// // // //           bookingId: booking._id,
// // // //           amount: booking.totalAmount,
// // // //         },
// // // //       },
// // // //       "high",
// // // //       booking.expiresAt,
// // // //     );
// // // //   }
// // // //   return null;
// // // // };

// // // // // Create bulk notifications for multiple users
// // // // export const createBulkNotifications = async (
// // // //   userIds,
// // // //   title,
// // // //   message,
// // // //   type = "info",
// // // //   details = null,
// // // //   metadata = {},
// // // //   action = null,
// // // // ) => {
// // // //   try {
// // // //     const notifications = userIds.map((userId) => ({
// // // //       user: userId,
// // // //       title,
// // // //       message,
// // // //       type,
// // // //       details,
// // // //       metadata,
// // // //       read: false,
// // // //       action: action || { type: "none" },
// // // //     }));

// // // //     await Notification.insertMany(notifications);
// // // //     console.log(`📧 Created ${notifications.length} notifications`);
// // // //     return true;
// // // //   } catch (error) {
// // // //     console.error("Error creating bulk notifications:", error);
// // // //     return false;
// // // //   }
// // // // };

// // // import Notification from "../models/Notification.js";

// // // // Create a notification with action
// // // export const createNotification = async (
// // //   userId,
// // //   title,
// // //   message,
// // //   type = "info",
// // //   details = null,
// // //   metadata = {},
// // //   action = null,
// // //   priority = "medium",
// // //   expiresAt = null,
// // // ) => {
// // //   try {
// // //     const notificationData = {
// // //       user: userId,
// // //       title,
// // //       message,
// // //       type,
// // //       details,
// // //       metadata,
// // //       read: false,
// // //       priority,
// // //     };

// // //     if (action) {
// // //       notificationData.action = action;
// // //     }

// // //     if (expiresAt) {
// // //       notificationData.expiresAt = expiresAt;
// // //     }

// // //     const notification = new Notification(notificationData);
// // //     await notification.save();

// // //     console.log(`📧 Notification created for user ${userId}: ${title}`);
// // //     return notification;
// // //   } catch (error) {
// // //     console.error("Error creating notification:", error);
// // //     return null;
// // //   }
// // // };

// // // // Create chat unread notification
// // // export const createChatUnreadNotification = async (
// // //   userId,
// // //   senderName,
// // //   chatId,
// // //   unreadCount,
// // //   messagePreview,
// // //   chatType,
// // //   vehicleName,
// // // ) => {
// // //   let title = "";
// // //   let message = "";
// // //   let priority = "medium";

// // //   if (unreadCount >= 3) {
// // //     title = `📬 ${unreadCount} Unread Messages from ${senderName}`;
// // //     message = `You have ${unreadCount} unread messages from ${senderName}. ${messagePreview ? `Latest: "${messagePreview}"` : "Check your inbox now!"}`;
// // //     priority = "high";
// // //   } else {
// // //     title = `💬 New Message from ${senderName}`;
// // //     message = `You have a new message from ${senderName}. ${messagePreview ? `"${messagePreview}"` : "Tap to read it."}`;
// // //   }

// // //   if (vehicleName) {
// // //     message += ` regarding ${vehicleName}.`;
// // //   }

// // //   return await createNotification(
// // //     userId,
// // //     title,
// // //     message,
// // //     "chat",
// // //     `Chat with ${senderName}${vehicleName ? ` about ${vehicleName}` : ""}`,
// // //     {
// // //       chatId: chatId,
// // //       senderName: senderName,
// // //       unreadCount: unreadCount,
// // //       chatType: chatType,
// // //       vehicleName: vehicleName,
// // //     },
// // //     {
// // //       type: "chat",
// // //       path: `/profiledetails?tab=messages&chat=${chatId}`,
// // //       data: {
// // //         chatId: chatId,
// // //         openChat: true,
// // //       },
// // //     },
// // //     priority,
// // //   );
// // // };

// // // // Check if a user has already received a notification for this chat recently
// // // export const hasRecentChatNotification = async (
// // //   userId,
// // //   chatId,
// // //   hoursAgo = 1,
// // // ) => {
// // //   try {
// // //     const recentNotification = await Notification.findOne({
// // //       user: userId,
// // //       "metadata.chatId": chatId,
// // //       type: "chat",
// // //       createdAt: { $gte: new Date(Date.now() - hoursAgo * 60 * 60 * 1000) },
// // //     });
// // //     return !!recentNotification;
// // //   } catch (error) {
// // //     console.error("Error checking recent notification:", error);
// // //     return false;
// // //   }
// // // };

// // // // Send email notification for unread messages
// // // export const sendChatUnreadEmail = async (
// // //   email,
// // //   name,
// // //   senderName,
// // //   unreadCount,
// // //   messagePreview,
// // //   chatId,
// // //   vehicleName,
// // // ) => {
// // //   console.log(`\n📧 Sending chat unread email to: ${email}`);
// // //   console.log(`   Unread count: ${unreadCount}, From: ${senderName}`);

// // //   try {
// // //     // Dynamic import to avoid circular dependency
// // //     const { transporter } = await import("./emailService.js");

// // //     if (!transporter) {
// // //       console.log("⚠️  No transporter, skipping email");
// // //       return true;
// // //     }

// // //     let subject = "";
// // //     let urgencyText = "";

// // //     if (unreadCount >= 3) {
// // //       subject = `🔔 ${unreadCount} Unread Messages from ${senderName} on Rent-Ride`;
// // //       urgencyText = `<div style="background-color: #fee2e2; border-left: 4px solid #dc2626; padding: 15px; margin: 20px 0;">
// // //         <p style="color: #991b1b; margin: 0; font-weight: bold;">
// // //           ⚠️ Urgent: You have ${unreadCount} unread messages waiting for you!
// // //         </p>
// // //       </div>`;
// // //     } else {
// // //       subject = `💬 New Message from ${senderName} on Rent-Ride`;
// // //     }

// // //     const mailOptions = {
// // //       from: process.env.EMAIL_USER
// // //         ? `"Rent-Ride" <${process.env.EMAIL_USER}>`
// // //         : '"Rent-Ride" <noreply@rentride.com>',
// // //       to: email,
// // //       subject: subject,
// // //       html: `
// // //         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
// // //           <div style="text-align: center; margin-bottom: 30px;">
// // //             <h1 style="color: #2563eb; margin: 0;">Rent<span style="color: #1e40af;">Ride</span></h1>
// // //             <p style="color: #6b7280; font-size: 14px;">Premium Car Rental Service</p>
// // //           </div>

// // //           <div style="background-color: #eff6ff; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
// // //             <h2 style="color: #1e40af; margin-top: 0;">You have ${unreadCount} unread message${unreadCount > 1 ? "s" : ""} from <strong>${senderName}</strong>!</h2>
// // //             <p style="color: #1e40af; line-height: 1.6;">
// // //               Dear <strong>${name || "User"}</strong>,
// // //             </p>
// // //             <p style="color: #1e40af; line-height: 1.6;">
// // //               ${unreadCount >= 3 ? "You have received multiple messages that are still unread." : "You have a new message waiting for you."}
// // //             </p>
// // //             ${urgencyText}

// // //             ${
// // //               messagePreview
// // //                 ? `
// // //             <div style="background-color: #ffffff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 15px; margin: 20px 0;">
// // //               <p style="color: #4b5563; margin: 0; font-style: italic;">
// // //                 "${messagePreview}"
// // //               </p>
// // //             </div>
// // //             `
// // //                 : ""
// // //             }

// // //             ${vehicleName ? `<p style="color: #1e40af;">📝 Regarding: <strong>${vehicleName}</strong></p>` : ""}

// // //             <div style="text-align: center; margin: 25px 0;">
// // //               <a href="http://localhost:5173/profiledetails?tab=messages&chat=${chatId}"
// // //                  style="background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
// // //                 📬 Reply to ${senderName}
// // //               </a>
// // //             </div>
// // //           </div>

// // //           <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center;">
// // //             <p style="color: #9ca3af; font-size: 12px; margin-bottom: 5px;">
// // //               You can mute notifications from specific conversations in your chat settings.
// // //             </p>
// // //             <p style="color: #9ca3af; font-size: 12px; margin: 0;">
// // //               Need help? Contact us at <a href="mailto:support@rentride.com" style="color: #2563eb;">support@rentride.com</a>
// // //             </p>
// // //             <p style="color: #9ca3af; font-size: 12px; margin: 0;">
// // //               © ${new Date().getFullYear()} Rent-Ride. All rights reserved.
// // //             </p>
// // //           </div>
// // //         </div>
// // //       `,
// // //     };

// // //     const info = await transporter.sendMail(mailOptions);
// // //     console.log("✅ Chat unread email sent!");

// // //     return true;
// // //   } catch (error) {
// // //     console.error("❌ Error sending chat unread email:", error.message);
// // //     return false;
// // //   }
// // // };

// // // // Create payment required notification
// // // export const createPaymentRequiredNotification = async (
// // //   userId,
// // //   booking,
// // //   vehicleData,
// // // ) => {
// // //   const dueDate = new Date(
// // //     booking.paymentDueDate || Date.now() + 48 * 60 * 60 * 1000,
// // //   );
// // //   const formattedDueDate = dueDate.toLocaleDateString();

// // //   return await createNotification(
// // //     userId,
// // //     "💳 Payment Required - Action Needed",
// // //     `Your booking for ${vehicleData.carName} has been approved! Please complete the payment of रु ${booking.totalAmount.toLocaleString()} to confirm your booking. Payment must be completed by ${formattedDueDate}.`,
// // //     "payment",
// // //     `Booking ID: ${booking.confirmationCode} | Amount: रु ${booking.totalAmount.toLocaleString()}`,
// // //     {
// // //       bookingId: booking._id,
// // //       bookingCode: booking.confirmationCode,
// // //       vehicleName: vehicleData.carName,
// // //       amount: booking.totalAmount,
// // //       dueDate: dueDate,
// // //     },
// // //     {
// // //       type: "payment",
// // //       path: `/payment/${booking._id}`,
// // //       data: {
// // //         bookingId: booking._id,
// // //         amount: booking.totalAmount,
// // //         confirmationCode: booking.confirmationCode,
// // //       },
// // //     },
// // //     "high",
// // //     dueDate,
// // //   );
// // // };

// // // // Create booking approved notification
// // // export const createBookingApprovedNotification = async (
// // //   userId,
// // //   booking,
// // //   vehicleData,
// // // ) => {
// // //   return await createNotification(
// // //     userId,
// // //     "✅ Booking Approved! Complete Payment",
// // //     `Great news! Your booking for ${vehicleData.carName} has been approved by the admin. Click here to complete your payment of रु ${booking.totalAmount.toLocaleString()} and confirm your booking.`,
// // //     "success",
// // //     `Booking ID: ${booking.confirmationCode} | Vehicle: ${vehicleData.carName}`,
// // //     {
// // //       bookingId: booking._id,
// // //       bookingCode: booking.confirmationCode,
// // //       vehicleName: vehicleData.carName,
// // //       amount: booking.totalAmount,
// // //       approvedAt: new Date(),
// // //     },
// // //     {
// // //       type: "payment",
// // //       path: `/payment/${booking._id}`,
// // //       data: {
// // //         bookingId: booking._id,
// // //         amount: booking.totalAmount,
// // //         confirmationCode: booking.confirmationCode,
// // //       },
// // //     },
// // //     "high",
// // //   );
// // // };

// // // // Create payment success notification
// // // export const createPaymentSuccessNotification = async (
// // //   userId,
// // //   booking,
// // //   vehicleData,
// // //   paymentDetails,
// // // ) => {
// // //   return await createNotification(
// // //     userId,
// // //     "🎉 Payment Successful! Booking Confirmed",
// // //     `Your payment of रु ${booking.totalAmount.toLocaleString()} for ${vehicleData.carName} has been successfully processed. Your booking is now confirmed!`,
// // //     "success",
// // //     `Booking ID: ${booking.confirmationCode} | Transaction: ${paymentDetails.transactionId}`,
// // //     {
// // //       bookingId: booking._id,
// // //       bookingCode: booking.confirmationCode,
// // //       vehicleName: vehicleData.carName,
// // //       amount: booking.totalAmount,
// // //       transactionId: paymentDetails.transactionId,
// // //     },
// // //     {
// // //       type: "booking",
// // //       path: `/booking/confirmation/${booking._id}`,
// // //       data: {
// // //         bookingId: booking._id,
// // //         confirmationCode: booking.confirmationCode,
// // //       },
// // //     },
// // //     "high",
// // //   );
// // // };

// // // // Create booking confirmation reminder
// // // export const createBookingConfirmationReminder = async (
// // //   userId,
// // //   booking,
// // //   vehicleData,
// // // ) => {
// // //   const hoursRemaining = Math.floor(
// // //     (booking.expiresAt - new Date()) / (1000 * 60 * 60),
// // //   );

// // //   if (hoursRemaining <= 24 && hoursRemaining > 0) {
// // //     return await createNotification(
// // //       userId,
// // //       "⏰ Booking Expiring Soon! Complete Payment",
// // //       `Your booking for ${vehicleData.carName} will expire in ${hoursRemaining} hours. Please complete the payment of रु ${booking.totalAmount.toLocaleString()} to confirm your booking.`,
// // //       "warning",
// // //       `Booking ID: ${booking.confirmationCode} | Expires in: ${hoursRemaining} hours`,
// // //       {
// // //         bookingId: booking._id,
// // //         bookingCode: booking.confirmationCode,
// // //         vehicleName: vehicleData.carName,
// // //         amount: booking.totalAmount,
// // //         expiresAt: booking.expiresAt,
// // //       },
// // //       {
// // //         type: "payment",
// // //         path: `/payment/${booking._id}`,
// // //         data: {
// // //           bookingId: booking._id,
// // //           amount: booking.totalAmount,
// // //         },
// // //       },
// // //       "high",
// // //       booking.expiresAt,
// // //     );
// // //   }
// // //   return null;
// // // };

// // // // Create bulk notifications for multiple users
// // // export const createBulkNotifications = async (
// // //   userIds,
// // //   title,
// // //   message,
// // //   type = "info",
// // //   details = null,
// // //   metadata = {},
// // //   action = null,
// // // ) => {
// // //   try {
// // //     const notifications = userIds.map((userId) => ({
// // //       user: userId,
// // //       title,
// // //       message,
// // //       type,
// // //       details,
// // //       metadata,
// // //       read: false,
// // //       action: action || { type: "none" },
// // //     }));

// // //     await Notification.insertMany(notifications);
// // //     console.log(`📧 Created ${notifications.length} notifications`);
// // //     return true;
// // //   } catch (error) {
// // //     console.error("Error creating bulk notifications:", error);
// // //     return false;
// // //   }
// // // };

// // import Notification from "../models/Notification.js";

// // // ── Generic notification creator ──────────────────────────────────────────────
// // export const createNotification = async (
// //   userId,
// //   title,
// //   message,
// //   type = "info",
// //   details = null,
// //   metadata = {},
// //   action = null,
// //   priority = "medium",
// //   expiresAt = null,
// // ) => {
// //   try {
// //     const notificationData = {
// //       user: userId,
// //       title,
// //       message,
// //       type,
// //       details,
// //       metadata,
// //       read: false,
// //       priority,
// //     };
// //     if (action) notificationData.action = action;
// //     if (expiresAt) notificationData.expiresAt = expiresAt;
// //     const notification = new Notification(notificationData);
// //     await notification.save();
// //     console.log(`📧 Notification created for user ${userId}: ${title}`);
// //     return notification;
// //   } catch (error) {
// //     console.error("Error creating notification:", error);
// //     return null;
// //   }
// // };

// // // ── Chat notifications ────────────────────────────────────────────────────────
// // export const createChatUnreadNotification = async (
// //   userId,
// //   senderName,
// //   chatId,
// //   unreadCount,
// //   messagePreview,
// //   chatType,
// //   vehicleName,
// // ) => {
// //   let title =
// //     unreadCount >= 3
// //       ? `📬 ${unreadCount} Unread Messages from ${senderName}`
// //       : `💬 New Message from ${senderName}`;
// //   let message =
// //     unreadCount >= 3
// //       ? `You have ${unreadCount} unread messages from ${senderName}. ${messagePreview ? `Latest: "${messagePreview}"` : "Check your inbox now!"}`
// //       : `You have a new message from ${senderName}. ${messagePreview ? `"${messagePreview}"` : "Tap to read it."}`;
// //   if (vehicleName) message += ` regarding ${vehicleName}.`;

// //   return await createNotification(
// //     userId,
// //     title,
// //     message,
// //     "chat",
// //     `Chat with ${senderName}${vehicleName ? ` about ${vehicleName}` : ""}`,
// //     { chatId, senderName, unreadCount, chatType, vehicleName },
// //     {
// //       type: "chat",
// //       path: `/profiledetails?tab=messages&chat=${chatId}`,
// //       data: { chatId, openChat: true },
// //     },
// //     unreadCount >= 3 ? "high" : "medium",
// //   );
// // };

// // export const hasRecentChatNotification = async (
// //   userId,
// //   chatId,
// //   hoursAgo = 1,
// // ) => {
// //   try {
// //     const n = await Notification.findOne({
// //       user: userId,
// //       "metadata.chatId": chatId,
// //       type: "chat",
// //       createdAt: { $gte: new Date(Date.now() - hoursAgo * 60 * 60 * 1000) },
// //     });
// //     return !!n;
// //   } catch (error) {
// //     console.error("Error checking recent notification:", error);
// //     return false;
// //   }
// // };

// // export const sendChatUnreadEmail = async (
// //   email,
// //   name,
// //   senderName,
// //   unreadCount,
// //   messagePreview,
// //   chatId,
// //   vehicleName,
// // ) => {
// //   console.log(`\n📧 Sending chat unread email to: ${email}`);
// //   try {
// //     const { transporter } = await import("./emailService.js");
// //     if (!transporter) {
// //       console.log("⚠️ No transporter, skipping email");
// //       return true;
// //     }
// //     const subject =
// //       unreadCount >= 3
// //         ? `🔔 ${unreadCount} Unread Messages from ${senderName} on Rent-Ride`
// //         : `💬 New Message from ${senderName} on Rent-Ride`;
// //     const mailOptions = {
// //       from: process.env.EMAIL_USER
// //         ? `"Rent-Ride" <${process.env.EMAIL_USER}>`
// //         : '"Rent-Ride" <noreply@rentride.com>',
// //       to: email,
// //       subject,
// //       html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;border:1px solid #e0e0e0;border-radius:10px;">
// //         <h1 style="color:#2563eb;text-align:center;">Rent<span style="color:#1e40af;">Ride</span></h1>
// //         <h2 style="color:#1e40af;">You have ${unreadCount} unread message${unreadCount > 1 ? "s" : ""} from <strong>${senderName}</strong>!</h2>
// //         <p>Dear <strong>${name || "User"}</strong>, ${messagePreview ? `Latest: "${messagePreview}"` : ""} ${vehicleName ? `Regarding: <strong>${vehicleName}</strong>` : ""}</p>
// //         <div style="text-align:center;margin:25px 0;">
// //           <a href="http://localhost:5173/profiledetails?tab=messages&chat=${chatId}" style="background:#2563eb;color:white;padding:12px 30px;text-decoration:none;border-radius:6px;font-weight:bold;display:inline-block;">📬 Reply to ${senderName}</a>
// //         </div>
// //         <p style="color:#9ca3af;font-size:12px;text-align:center;">© ${new Date().getFullYear()} Rent-Ride. All rights reserved.</p>
// //       </div>`,
// //     };
// //     await transporter.sendMail(mailOptions);
// //     console.log("✅ Chat unread email sent!");
// //     return true;
// //   } catch (error) {
// //     console.error("❌ Error sending chat unread email:", error.message);
// //     return false;
// //   }
// // };

// // // ── Vehicle booking notifications ─────────────────────────────────────────────
// // export const createPaymentRequiredNotification = async (
// //   userId,
// //   booking,
// //   vehicleData,
// // ) => {
// //   const dueDate = new Date(
// //     booking.paymentDueDate || Date.now() + 48 * 60 * 60 * 1000,
// //   );
// //   return await createNotification(
// //     userId,
// //     "💳 Payment Required - Action Needed",
// //     `Your booking for ${vehicleData.carName} has been approved! Please complete the payment of रु ${booking.totalAmount.toLocaleString()} to confirm your booking. Payment must be completed by ${dueDate.toLocaleDateString()}.`,
// //     "payment",
// //     `Booking ID: ${booking.confirmationCode} | Amount: रु ${booking.totalAmount.toLocaleString()}`,
// //     {
// //       bookingId: booking._id,
// //       bookingCode: booking.confirmationCode,
// //       vehicleName: vehicleData.carName,
// //       amount: booking.totalAmount,
// //       dueDate,
// //     },
// //     {
// //       type: "payment",
// //       path: `/payment/${booking._id}`,
// //       data: {
// //         bookingId: booking._id,
// //         amount: booking.totalAmount,
// //         confirmationCode: booking.confirmationCode,
// //       },
// //     },
// //     "high",
// //     dueDate,
// //   );
// // };

// // export const createBookingApprovedNotification = async (
// //   userId,
// //   booking,
// //   vehicleData,
// // ) => {
// //   return await createNotification(
// //     userId,
// //     "✅ Booking Approved! Complete Payment",
// //     `Great news! Your booking for ${vehicleData.carName} has been approved by the admin. Click here to complete your payment of रु ${booking.totalAmount.toLocaleString()} and confirm your booking.`,
// //     "success",
// //     `Booking ID: ${booking.confirmationCode} | Vehicle: ${vehicleData.carName}`,
// //     {
// //       bookingId: booking._id,
// //       bookingCode: booking.confirmationCode,
// //       vehicleName: vehicleData.carName,
// //       amount: booking.totalAmount,
// //       approvedAt: new Date(),
// //     },
// //     {
// //       type: "payment",
// //       path: `/payment/${booking._id}`,
// //       data: {
// //         bookingId: booking._id,
// //         amount: booking.totalAmount,
// //         confirmationCode: booking.confirmationCode,
// //       },
// //     },
// //     "high",
// //   );
// // };

// // export const createPaymentSuccessNotification = async (
// //   userId,
// //   booking,
// //   vehicleData,
// //   paymentDetails,
// // ) => {
// //   return await createNotification(
// //     userId,
// //     "🎉 Payment Successful! Booking Confirmed",
// //     `Your payment of रु ${booking.totalAmount.toLocaleString()} for ${vehicleData.carName} has been successfully processed. Your booking is now confirmed!`,
// //     "success",
// //     `Booking ID: ${booking.confirmationCode} | Transaction: ${paymentDetails.transactionId}`,
// //     {
// //       bookingId: booking._id,
// //       bookingCode: booking.confirmationCode,
// //       vehicleName: vehicleData.carName,
// //       amount: booking.totalAmount,
// //       transactionId: paymentDetails.transactionId,
// //     },
// //     {
// //       type: "booking",
// //       path: `/booking/confirmation/${booking._id}`,
// //       data: {
// //         bookingId: booking._id,
// //         confirmationCode: booking.confirmationCode,
// //       },
// //     },
// //     "high",
// //   );
// // };

// // export const createBookingConfirmationReminder = async (
// //   userId,
// //   booking,
// //   vehicleData,
// // ) => {
// //   const hoursRemaining = Math.floor(
// //     (booking.expiresAt - new Date()) / (1000 * 60 * 60),
// //   );
// //   if (hoursRemaining <= 24 && hoursRemaining > 0) {
// //     return await createNotification(
// //       userId,
// //       "⏰ Booking Expiring Soon! Complete Payment",
// //       `Your booking for ${vehicleData.carName} will expire in ${hoursRemaining} hours. Please complete the payment of रु ${booking.totalAmount.toLocaleString()} to confirm your booking.`,
// //       "warning",
// //       `Booking ID: ${booking.confirmationCode} | Expires in: ${hoursRemaining} hours`,
// //       {
// //         bookingId: booking._id,
// //         bookingCode: booking.confirmationCode,
// //         vehicleName: vehicleData.carName,
// //         amount: booking.totalAmount,
// //         expiresAt: booking.expiresAt,
// //       },
// //       {
// //         type: "payment",
// //         path: `/payment/${booking._id}`,
// //         data: { bookingId: booking._id, amount: booking.totalAmount },
// //       },
// //       "high",
// //       booking.expiresAt,
// //     );
// //   }
// //   return null;
// // };

// // // ── 🏍️ BIKE booking notifications ────────────────────────────────────────────
// // export const createBikePaymentRequiredNotification = async (
// //   userId,
// //   booking,
// //   bike,
// // ) => {
// //   const dueDate = new Date(Date.now() + 48 * 60 * 60 * 1000);
// //   return await createNotification(
// //     userId,
// //     "💳 Bike Payment Required - Action Needed",
// //     `Your booking for ${bike.bikeName} has been approved! Please complete the payment of रु ${booking.totalAmount.toLocaleString()} to confirm your booking. Payment must be completed by ${dueDate.toLocaleDateString()}.`,
// //     "payment",
// //     `Booking ID: ${booking.confirmationCode} | Amount: रु ${booking.totalAmount.toLocaleString()}`,
// //     {
// //       bookingId: booking._id,
// //       bookingCode: booking.confirmationCode,
// //       vehicleName: bike.bikeName,
// //       amount: booking.totalAmount,
// //       dueDate,
// //       bookingType: "bike",
// //     },
// //     {
// //       type: "bike_payment",
// //       path: `/bike-payment/${booking._id}`,
// //       data: {
// //         bookingId: booking._id,
// //         amount: booking.totalAmount,
// //         confirmationCode: booking.confirmationCode,
// //       },
// //     },
// //     "high",
// //     dueDate,
// //   );
// // };

// // export const createBikeBookingApprovedNotification = async (
// //   userId,
// //   booking,
// //   bike,
// // ) => {
// //   return await createNotification(
// //     userId,
// //     "✅ Bike Booking Approved! Complete Payment",
// //     `Great news! Your booking for ${bike.bikeName} has been approved by the admin. Click here to complete your payment of रु ${booking.totalAmount.toLocaleString()} and confirm your booking.`,
// //     "success",
// //     `Booking ID: ${booking.confirmationCode} | Bike: ${bike.bikeName}`,
// //     {
// //       bookingId: booking._id,
// //       bookingCode: booking.confirmationCode,
// //       vehicleName: bike.bikeName,
// //       amount: booking.totalAmount,
// //       approvedAt: new Date(),
// //       bookingType: "bike",
// //     },
// //     {
// //       type: "bike_payment",
// //       path: `/bike-payment/${booking._id}`,
// //       data: {
// //         bookingId: booking._id,
// //         amount: booking.totalAmount,
// //         confirmationCode: booking.confirmationCode,
// //       },
// //     },
// //     "high",
// //   );
// // };

// // // ── Bulk notifications ────────────────────────────────────────────────────────
// // export const createBulkNotifications = async (
// //   userIds,
// //   title,
// //   message,
// //   type = "info",
// //   details = null,
// //   metadata = {},
// //   action = null,
// // ) => {
// //   try {
// //     const notifications = userIds.map((userId) => ({
// //       user: userId,
// //       title,
// //       message,
// //       type,
// //       details,
// //       metadata,
// //       read: false,
// //       action: action || { type: "none" },
// //     }));
// //     await Notification.insertMany(notifications);
// //     console.log(`📧 Created ${notifications.length} notifications`);
// //     return true;
// //   } catch (error) {
// //     console.error("Error creating bulk notifications:", error);
// //     return false;
// //   }
// // };

// import Notification from "../models/Notification.js";

// // ── Generic notification creator ──────────────────────────────────────────────
// export const createNotification = async (
//   userId,
//   title,
//   message,
//   type = "info",
//   details = null,
//   metadata = {},
//   action = null,
//   priority = "medium",
//   expiresAt = null,
// ) => {
//   try {
//     const notificationData = {
//       user: userId,
//       title,
//       message,
//       type,
//       details,
//       metadata,
//       read: false,
//       priority,
//     };
//     if (action) notificationData.action = action;
//     if (expiresAt) notificationData.expiresAt = expiresAt;
//     const notification = new Notification(notificationData);
//     await notification.save();
//     console.log(`📧 Notification created for user ${userId}: ${title}`);
//     return notification;
//   } catch (error) {
//     console.error("Error creating notification:", error);
//     return null;
//   }
// };

// // ── Chat notifications ────────────────────────────────────────────────────────
// export const createChatUnreadNotification = async (
//   userId,
//   senderName,
//   chatId,
//   unreadCount,
//   messagePreview,
//   chatType,
//   vehicleName,
// ) => {
//   let title =
//     unreadCount >= 3
//       ? `📬 ${unreadCount} Unread Messages from ${senderName}`
//       : `💬 New Message from ${senderName}`;
//   let message =
//     unreadCount >= 3
//       ? `You have ${unreadCount} unread messages from ${senderName}. ${messagePreview ? `Latest: "${messagePreview}"` : "Check your inbox now!"}`
//       : `You have a new message from ${senderName}. ${messagePreview ? `"${messagePreview}"` : "Tap to read it."}`;
//   if (vehicleName) message += ` regarding ${vehicleName}.`;

//   return await createNotification(
//     userId,
//     title,
//     message,
//     "chat",
//     `Chat with ${senderName}${vehicleName ? ` about ${vehicleName}` : ""}`,
//     { chatId, senderName, unreadCount, chatType, vehicleName },
//     {
//       type: "chat",
//       path: `/profiledetails?tab=messages&chat=${chatId}`,
//       data: { chatId, openChat: true },
//     },
//     unreadCount >= 3 ? "high" : "medium",
//   );
// };

// export const hasRecentChatNotification = async (
//   userId,
//   chatId,
//   hoursAgo = 1,
// ) => {
//   try {
//     const n = await Notification.findOne({
//       user: userId,
//       "metadata.chatId": chatId,
//       type: "chat",
//       createdAt: { $gte: new Date(Date.now() - hoursAgo * 60 * 60 * 1000) },
//     });
//     return !!n;
//   } catch (error) {
//     console.error("Error checking recent notification:", error);
//     return false;
//   }
// };

// export const sendChatUnreadEmail = async (
//   email,
//   name,
//   senderName,
//   unreadCount,
//   messagePreview,
//   chatId,
//   vehicleName,
// ) => {
//   console.log(`\n📧 Sending chat unread email to: ${email}`);
//   try {
//     const { transporter } = await import("./emailService.js");
//     if (!transporter) {
//       console.log("⚠️ No transporter, skipping email");
//       return true;
//     }
//     const subject =
//       unreadCount >= 3
//         ? `🔔 ${unreadCount} Unread Messages from ${senderName} on Rent-Ride`
//         : `💬 New Message from ${senderName} on Rent-Ride`;
//     const mailOptions = {
//       from: process.env.EMAIL_USER
//         ? `"Rent-Ride" <${process.env.EMAIL_USER}>`
//         : '"Rent-Ride" <noreply@rentride.com>',
//       to: email,
//       subject,
//       html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;border:1px solid #e0e0e0;border-radius:10px;">
//         <h1 style="color:#2563eb;text-align:center;">Rent<span style="color:#1e40af;">Ride</span></h1>
//         <h2 style="color:#1e40af;">You have ${unreadCount} unread message${unreadCount > 1 ? "s" : ""} from <strong>${senderName}</strong>!</h2>
//         <p>Dear <strong>${name || "User"}</strong>, ${messagePreview ? `Latest: "${messagePreview}"` : ""} ${vehicleName ? `Regarding: <strong>${vehicleName}</strong>` : ""}</p>
//         <div style="text-align:center;margin:25px 0;">
//           <a href="http://localhost:5173/profiledetails?tab=messages&chat=${chatId}" style="background:#2563eb;color:white;padding:12px 30px;text-decoration:none;border-radius:6px;font-weight:bold;display:inline-block;">📬 Reply to ${senderName}</a>
//         </div>
//         <p style="color:#9ca3af;font-size:12px;text-align:center;">© ${new Date().getFullYear()} Rent-Ride. All rights reserved.</p>
//       </div>`,
//     };
//     await transporter.sendMail(mailOptions);
//     console.log("✅ Chat unread email sent!");
//     return true;
//   } catch (error) {
//     console.error("❌ Error sending chat unread email:", error.message);
//     return false;
//   }
// };

// // ── Vehicle booking notifications ─────────────────────────────────────────────
// export const createPaymentRequiredNotification = async (
//   userId,
//   booking,
//   vehicleData,
// ) => {
//   const dueDate = new Date(
//     booking.paymentDueDate || Date.now() + 48 * 60 * 60 * 1000,
//   );
//   return await createNotification(
//     userId,
//     "💳 Payment Required - Action Needed",
//     `Your booking for ${vehicleData.carName} has been approved! Please complete the payment of रु ${booking.totalAmount.toLocaleString()} to confirm your booking. Payment must be completed by ${dueDate.toLocaleDateString()}.`,
//     "payment",
//     `Booking ID: ${booking.confirmationCode} | Amount: रु ${booking.totalAmount.toLocaleString()}`,
//     {
//       bookingId: booking._id,
//       bookingCode: booking.confirmationCode,
//       vehicleName: vehicleData.carName,
//       amount: booking.totalAmount,
//       dueDate,
//     },
//     {
//       type: "payment",
//       path: `/payment/${booking._id}`,
//       data: {
//         bookingId: booking._id,
//         amount: booking.totalAmount,
//         confirmationCode: booking.confirmationCode,
//       },
//     },
//     "high",
//     dueDate,
//   );
// };

// export const createBookingApprovedNotification = async (
//   userId,
//   booking,
//   vehicleData,
// ) => {
//   return await createNotification(
//     userId,
//     "✅ Booking Approved! Complete Payment",
//     `Great news! Your booking for ${vehicleData.carName} has been approved by the admin. Click here to complete your payment of रु ${booking.totalAmount.toLocaleString()} and confirm your booking.`,
//     "success",
//     `Booking ID: ${booking.confirmationCode} | Vehicle: ${vehicleData.carName}`,
//     {
//       bookingId: booking._id,
//       bookingCode: booking.confirmationCode,
//       vehicleName: vehicleData.carName,
//       amount: booking.totalAmount,
//       approvedAt: new Date(),
//     },
//     {
//       type: "payment",
//       path: `/payment/${booking._id}`,
//       data: {
//         bookingId: booking._id,
//         amount: booking.totalAmount,
//         confirmationCode: booking.confirmationCode,
//       },
//     },
//     "high",
//   );
// };

// export const createPaymentSuccessNotification = async (
//   userId,
//   booking,
//   vehicleData,
//   paymentDetails,
// ) => {
//   return await createNotification(
//     userId,
//     "🎉 Payment Successful! Booking Confirmed",
//     `Your payment of रु ${booking.totalAmount.toLocaleString()} for ${vehicleData.carName} has been successfully processed. Your booking is now confirmed!`,
//     "success",
//     `Booking ID: ${booking.confirmationCode} | Transaction: ${paymentDetails.transactionId}`,
//     {
//       bookingId: booking._id,
//       bookingCode: booking.confirmationCode,
//       vehicleName: vehicleData.carName,
//       amount: booking.totalAmount,
//       transactionId: paymentDetails.transactionId,
//     },
//     {
//       type: "booking",
//       path: `/booking/confirmation/${booking._id}`,
//       data: {
//         bookingId: booking._id,
//         confirmationCode: booking.confirmationCode,
//       },
//     },
//     "high",
//   );
// };

// export const createBookingConfirmationReminder = async (
//   userId,
//   booking,
//   vehicleData,
// ) => {
//   const hoursRemaining = Math.floor(
//     (booking.expiresAt - new Date()) / (1000 * 60 * 60),
//   );
//   if (hoursRemaining <= 24 && hoursRemaining > 0) {
//     return await createNotification(
//       userId,
//       "⏰ Booking Expiring Soon! Complete Payment",
//       `Your booking for ${vehicleData.carName} will expire in ${hoursRemaining} hours. Please complete the payment of रु ${booking.totalAmount.toLocaleString()} to confirm your booking.`,
//       "warning",
//       `Booking ID: ${booking.confirmationCode} | Expires in: ${hoursRemaining} hours`,
//       {
//         bookingId: booking._id,
//         bookingCode: booking.confirmationCode,
//         vehicleName: vehicleData.carName,
//         amount: booking.totalAmount,
//         expiresAt: booking.expiresAt,
//       },
//       {
//         type: "payment",
//         path: `/payment/${booking._id}`,
//         data: { bookingId: booking._id, amount: booking.totalAmount },
//       },
//       "high",
//       booking.expiresAt,
//     );
//   }
//   return null;
// };

// // ── 🏍️ BIKE booking notifications ────────────────────────────────────────────
// export const createBikePaymentRequiredNotification = async (
//   userId,
//   booking,
//   bike,
// ) => {
//   const dueDate = new Date(Date.now() + 48 * 60 * 60 * 1000);
//   return await createNotification(
//     userId,
//     "💳 Bike Payment Required - Action Needed",
//     `Your booking for ${bike.bikeName} has been approved! Please complete the payment of रु ${booking.totalAmount.toLocaleString()} to confirm your booking. Payment must be completed by ${dueDate.toLocaleDateString()}.`,
//     "payment",
//     `Booking ID: ${booking.confirmationCode} | Amount: रु ${booking.totalAmount.toLocaleString()}`,
//     {
//       bookingId: booking._id,
//       bookingCode: booking.confirmationCode,
//       vehicleName: bike.bikeName,
//       amount: booking.totalAmount,
//       dueDate,
//       bookingType: "bike",
//     },
//     {
//       type: "bike_payment",
//       path: `/bike-payment/${booking._id}`,
//       data: {
//         bookingId: booking._id,
//         amount: booking.totalAmount,
//         confirmationCode: booking.confirmationCode,
//       },
//     },
//     "high",
//     dueDate,
//   );
// };

// // export const createBikeBookingApprovedNotification = async (
// //   userId,
// //   booking,
// //   bike,
// // ) => {
// //   return await createNotification(
// //     userId,
// //     "💳 Bike Booking Approved! Complete Payment",
// //     `Great news! Your booking for ${bike.bikeName} has been approved by the admin. Click here to complete your payment of रु ${booking.totalAmount.toLocaleString()} and confirm your booking.`,
// //     "payment",
// //     `Booking ID: ${booking.confirmationCode} | Bike: ${bike.bikeName}`,
// //     {
// //       bookingId: booking._id,
// //       bookingCode: booking.confirmationCode,
// //       vehicleName: bike.bikeName,
// //       amount: booking.totalAmount,
// //       approvedAt: new Date(),
// //       bookingType: "bike",
// //     },
// //     {
// //       type: "bike_payment",
// //       path: `/bike-payment/${booking._id}`,
// //       data: {
// //         bookingId: booking._id,
// //         amount: booking.totalAmount,
// //         confirmationCode: booking.confirmationCode,
// //       },
// //     },
// //     "high",
// //   );
// // };

// export const createBikeBookingApprovedNotification = async (userId, booking, bike) => {
//   const dueDate = new Date(Date.now() + 48 * 60 * 60 * 1000);
//   return await createNotification(
//     userId,
//     "✅ Bike Booking Approved! Complete Payment",
//     `Your booking for ${bike.bikeName} has been approved! Complete the payment of रु ${booking.totalAmount.toLocaleString()} by ${dueDate.toLocaleDateString()} to confirm.`,
//     "payment",
//     `Booking ID: ${booking.confirmationCode} | Amount: रु ${booking.totalAmount.toLocaleString()}`,
//     {
//       bookingId: booking._id,
//       bookingCode: booking.confirmationCode,
//       vehicleName: bike.bikeName,
//       amount: booking.totalAmount,
//       approvedAt: new Date(),
//       bookingType: "bike",
//     },
//     {
//       type: "bike_payment",
//       path: `/bike-payment/${booking._id}`,
//       data: { bookingId: booking._id, amount: booking.totalAmount },
//     },
//     "high",
//     dueDate,
//   );
// };

// // ── Bulk notifications ────────────────────────────────────────────────────────
// export const createBulkNotifications = async (
//   userIds,
//   title,
//   message,
//   type = "info",
//   details = null,
//   metadata = {},
//   action = null,
// ) => {
//   try {
//     const notifications = userIds.map((userId) => ({
//       user: userId,
//       title,
//       message,
//       type,
//       details,
//       metadata,
//       read: false,
//       action: action || { type: "none" },
//     }));
//     await Notification.insertMany(notifications);
//     console.log(`📧 Created ${notifications.length} notifications`);
//     return true;
//   } catch (error) {
//     console.error("Error creating bulk notifications:", error);
//     return false;
//   }
// };

import Notification from "../models/Notification.js";

// ── Generic notification creator ──────────────────────────────────────────────
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
    if (action) notificationData.action = action;
    if (expiresAt) notificationData.expiresAt = expiresAt;
    const notification = new Notification(notificationData);
    await notification.save();
    console.log(`📧 Notification created for user ${userId}: ${title}`);
    return notification;
  } catch (error) {
    console.error("Error creating notification:", error);
    return null;
  }
};

// ── Chat notifications ────────────────────────────────────────────────────────
export const createChatUnreadNotification = async (
  userId,
  senderName,
  chatId,
  unreadCount,
  messagePreview,
  chatType,
  vehicleName,
) => {
  let title =
    unreadCount >= 3
      ? `📬 ${unreadCount} Unread Messages from ${senderName}`
      : `💬 New Message from ${senderName}`;
  let message =
    unreadCount >= 3
      ? `You have ${unreadCount} unread messages from ${senderName}. ${messagePreview ? `Latest: "${messagePreview}"` : "Check your inbox now!"}`
      : `You have a new message from ${senderName}. ${messagePreview ? `"${messagePreview}"` : "Tap to read it."}`;
  if (vehicleName) message += ` regarding ${vehicleName}.`;

  return await createNotification(
    userId,
    title,
    message,
    "chat",
    `Chat with ${senderName}${vehicleName ? ` about ${vehicleName}` : ""}`,
    { chatId, senderName, unreadCount, chatType, vehicleName },
    {
      type: "chat",
      path: `/profiledetails?tab=messages&chat=${chatId}`,
      data: { chatId, openChat: true },
    },
    unreadCount >= 3 ? "high" : "medium",
  );
};

export const hasRecentChatNotification = async (
  userId,
  chatId,
  hoursAgo = 1,
) => {
  try {
    const n = await Notification.findOne({
      user: userId,
      "metadata.chatId": chatId,
      type: "chat",
      createdAt: { $gte: new Date(Date.now() - hoursAgo * 60 * 60 * 1000) },
    });
    return !!n;
  } catch (error) {
    console.error("Error checking recent notification:", error);
    return false;
  }
};

export const sendChatUnreadEmail = async (
  email,
  name,
  senderName,
  unreadCount,
  messagePreview,
  chatId,
  vehicleName,
) => {
  console.log(`\n📧 Sending chat unread email to: ${email}`);
  try {
    const { transporter } = await import("./emailService.js");
    if (!transporter) {
      console.log("⚠️ No transporter, skipping email");
      return true;
    }
    const subject =
      unreadCount >= 3
        ? `🔔 ${unreadCount} Unread Messages from ${senderName} on Rent-Ride`
        : `💬 New Message from ${senderName} on Rent-Ride`;
    const mailOptions = {
      from: process.env.EMAIL_USER
        ? `"Rent-Ride" <${process.env.EMAIL_USER}>`
        : '"Rent-Ride" <noreply@rentride.com>',
      to: email,
      subject,
      html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;border:1px solid #e0e0e0;border-radius:10px;">
        <h1 style="color:#2563eb;text-align:center;">Rent<span style="color:#1e40af;">Ride</span></h1>
        <h2 style="color:#1e40af;">You have ${unreadCount} unread message${unreadCount > 1 ? "s" : ""} from <strong>${senderName}</strong>!</h2>
        <p>Dear <strong>${name || "User"}</strong>, ${messagePreview ? `Latest: "${messagePreview}"` : ""} ${vehicleName ? `Regarding: <strong>${vehicleName}</strong>` : ""}</p>
        <div style="text-align:center;margin:25px 0;">
          <a href="http://localhost:5173/profiledetails?tab=messages&chat=${chatId}" style="background:#2563eb;color:white;padding:12px 30px;text-decoration:none;border-radius:6px;font-weight:bold;display:inline-block;">📬 Reply to ${senderName}</a>
        </div>
        <p style="color:#9ca3af;font-size:12px;text-align:center;">© ${new Date().getFullYear()} Rent-Ride. All rights reserved.</p>
      </div>`,
    };
    await transporter.sendMail(mailOptions);
    console.log("✅ Chat unread email sent!");
    return true;
  } catch (error) {
    console.error("❌ Error sending chat unread email:", error.message);
    return false;
  }
};

// ── Vehicle booking notifications ─────────────────────────────────────────────
export const createPaymentRequiredNotification = async (
  userId,
  booking,
  vehicleData,
) => {
  const dueDate = new Date(
    booking.paymentDueDate || Date.now() + 48 * 60 * 60 * 1000,
  );
  return await createNotification(
    userId,
    "💳 Payment Required - Action Needed",
    `Your booking for ${vehicleData.carName} has been approved! Please complete the payment of रु ${booking.totalAmount.toLocaleString()} to confirm your booking. Payment must be completed by ${dueDate.toLocaleDateString()}.`,
    "payment",
    `Booking ID: ${booking.confirmationCode} | Amount: रु ${booking.totalAmount.toLocaleString()}`,
    {
      bookingId: booking._id,
      bookingCode: booking.confirmationCode,
      vehicleName: vehicleData.carName,
      amount: booking.totalAmount,
      dueDate,
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
      },
    },
    "high",
  );
};

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
        data: { bookingId: booking._id, amount: booking.totalAmount },
      },
      "high",
      booking.expiresAt,
    );
  }
  return null;
};

// ── 🏍️ BIKE booking notifications ────────────────────────────────────────────
export const createBikePaymentRequiredNotification = async (
  userId,
  booking,
  bike,
) => {
  const dueDate = new Date(Date.now() + 48 * 60 * 60 * 1000);
  return await createNotification(
    userId,
    "💳 Bike Payment Required - Action Needed",
    `Your booking for ${bike.bikeName} has been approved! Please complete the payment of रु ${booking.totalAmount.toLocaleString()} to confirm your booking. Payment must be completed by ${dueDate.toLocaleDateString()}.`,
    "payment",
    `Booking ID: ${booking.confirmationCode} | Amount: रु ${booking.totalAmount.toLocaleString()}`,
    {
      bookingId: booking._id,
      bookingCode: booking.confirmationCode,
      vehicleName: bike.bikeName,
      amount: booking.totalAmount,
      dueDate,
      bookingType: "bike",
    },
    {
      type: "bike_payment",
      path: `/bike-payment/${booking._id}`,
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

export const createBikeBookingApprovedNotification = async (
  userId,
  booking,
  bike,
) => {
  return await createNotification(
    userId,
    "💳 Bike Booking Approved! Complete Payment",
    `Great news! Your booking for ${bike.bikeName} has been approved by the admin. Click here to complete your payment of रु ${booking.totalAmount.toLocaleString()} and confirm your booking.`,
    "payment",
    `Booking ID: ${booking.confirmationCode} | Bike: ${bike.bikeName}`,
    {
      bookingId: booking._id,
      bookingCode: booking.confirmationCode,
      vehicleName: bike.bikeName,
      amount: booking.totalAmount,
      approvedAt: new Date(),
      bookingType: "bike",
    },
    {
      type: "bike_payment",
      path: `/bike-payment/${booking._id}`,
      data: {
        bookingId: booking._id,
        amount: booking.totalAmount,
        confirmationCode: booking.confirmationCode,
      },
    },
    "high",
  );
};

// ── On-Hold notifications (vehicle) ──────────────────────────────────────────
export const createVehicleOnHoldNotification = async (userId, booking, vehicleData) => {
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  return await createNotification(
    userId,
    "🚗 Vehicle On Hold — Complete Payment Within 24 Hours",
    `Your booking for ${vehicleData.carName} has been approved and the vehicle is now on hold for you. Please complete the payment of रु ${booking.totalAmount.toLocaleString()} within 24 hours, otherwise the vehicle will be released.`,
    "warning",
    `Booking ID: ${booking.confirmationCode} | Expires: ${expiresAt.toLocaleString()}`,
    {
      bookingId: booking._id,
      bookingCode: booking.confirmationCode,
      vehicleName: vehicleData.carName,
      amount: booking.totalAmount,
      holdExpiresAt: expiresAt,
    },
    {
      type: "payment",
      path: `/payment/${booking._id}`,
      data: { bookingId: booking._id, amount: booking.totalAmount },
    },
    "high",
    expiresAt,
  );
};

// ── On-Hold notifications (bike) ──────────────────────────────────────────────
export const createBikeOnHoldNotification = async (userId, booking, bike) => {
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  return await createNotification(
    userId,
    "🏍️ Bike On Hold — Complete Payment Within 24 Hours",
    `Your booking for ${bike.bikeName} has been approved and the bike is now on hold for you. Please complete the payment of रु ${booking.totalAmount.toLocaleString()} within 24 hours, otherwise the bike will be released.`,
    "warning",
    `Booking ID: ${booking.confirmationCode} | Expires: ${expiresAt.toLocaleString()}`,
    {
      bookingId: booking._id,
      bookingCode: booking.confirmationCode,
      vehicleName: bike.bikeName,
      amount: booking.totalAmount,
      holdExpiresAt: expiresAt,
      bookingType: "bike",
    },
    {
      type: "bike_payment",
      path: `/bike-payment/${booking._id}`,
      data: { bookingId: booking._id, amount: booking.totalAmount },
    },
    "high",
    expiresAt,
  );
};

export const createVehicleHoldExpiredNotification = async (userId, booking, vehicleName) => {
  return await createNotification(
    userId,
    "⏰ Booking Expired — Payment Not Received",
    `Your booking (${booking.confirmationCode}) for ${vehicleName} has been automatically cancelled because payment was not completed within 24 hours. The vehicle is now available for others to book. You can create a new booking anytime.`,
    "error",
    `Booking ID: ${booking.confirmationCode}`,
    { bookingId: booking._id, bookingCode: booking.confirmationCode, vehicleName },
    { type: "booking", path: `/rentridehome`, data: {} },
    "high",
  );
};

export const createBikeHoldExpiredNotification = async (userId, booking, bikeName) => {
  return await createNotification(
    userId,
    "⏰ Bike Booking Expired — Payment Not Received",
    `Your bike booking (${booking.confirmationCode}) for ${bikeName} has been automatically cancelled because payment was not completed within 24 hours. The bike is now available for others to book. You can create a new booking anytime.`,
    "error",
    `Booking ID: ${booking.confirmationCode}`,
    { bookingId: booking._id, bookingCode: booking.confirmationCode, bikeName, bookingType: "bike" },
    { type: "booking", path: `/rentridehome`, data: {} },
    "high",
  );
};

// ── Bulk notifications ────────────────────────────────────────────────────────
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
