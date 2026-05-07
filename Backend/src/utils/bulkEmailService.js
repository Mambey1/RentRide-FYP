// import Subscriber from "../models/Subscriber.js";
// import { transporter } from "./emailService.js";

// // // Send bulk email to all subscribers
// // export const sendBulkEmail = async (subject, htmlContent, textContent = "") => {
// //   try {
// //     // Get all active subscribers
// //     const subscribers = await Subscriber.find({ isActive: true });

// //     if (subscribers.length === 0) {
// //       console.log("No subscribers found");
// //       return { success: false, count: 0 };
// //     }

// //     console.log(`📧 Sending email to ${subscribers.length} subscribers...`);

// //     let successCount = 0;
// //     let failCount = 0;

// //     // Send emails in batches to avoid rate limiting
// //     const batchSize = 50;
// //     for (let i = 0; i < subscribers.length; i += batchSize) {
// //       const batch = subscribers.slice(i, i + batchSize);

// //       await Promise.all(
// //         batch.map(async (subscriber) => {
// //           try {
// //             const mailOptions = {
// //               from: process.env.EMAIL_USER ? `"Rent-Ride" <${process.env.EMAIL_USER}>` : '"Rent-Ride" <noreply@rentride.com>',
// //               to: subscriber.email,
// //               subject: subject,
// //               html: htmlContent,
// //               text: textContent,
// //             };

// //             await transporter.sendMail(mailOptions);
// //             successCount++;
// //             console.log(`✅ Email sent to ${subscriber.email}`);
// //           } catch (error) {
// //             failCount++;
// //             console.error(`❌ Failed to send to ${subscriber.email}:`, error.message);
// //           }
// //         })
// //       );

// //       // Wait between batches
// //       if (i + batchSize < subscribers.length) {
// //         await new Promise(resolve => setTimeout(resolve, 2000));
// //       }
// //     }

// //     console.log(`📊 Summary: ${successCount} sent, ${failCount} failed`);
// //     return { success: true, successCount, failCount, total: subscribers.length };
// //   } catch (error) {
// //     console.error("Bulk email error:", error);
// //     return { success: false, error: error.message };
// //   }
// // };

// // In your admin email controller - update the sendBulkEmail function

// export const sendBulkEmail = async (req, res) => {
//   try {
//     const { subject, message, target = "subscribers" } = req.body;
//     // target: "subscribers" | "users" | "both"

//     if (!subject || !message) {
//       return res.status(400).json({ success: false, message: "Subject and message are required" });
//     }

//     let recipientEmails = new Set();

//     // Fetch subscribers if needed
//     if (target === "subscribers" || target === "both") {
//       const subs = await NewsletterSubscriber.find({ isSubscribed: true }).select("email");
//       subs.forEach(s => recipientEmails.add(s.email));
//     }

//     // Fetch verified users if needed
//     if (target === "users" || target === "both") {
//       const users = await User.find({ isEmailVerified: true, isBlocked: false }).select("email");
//       users.forEach(u => recipientEmails.add(u.email)); // Set deduplicates automatically
//     }

//     const emails = [...recipientEmails];

//     if (emails.length === 0) {
//       return res.status(400).json({ success: false, message: "No recipients found" });
//     }

//     let successCount = 0;
//     let failCount = 0;

//     // Send emails (reuse your existing sendNewsletterEmail utility)
//     for (const email of emails) {
//       try {
//         await sendNewsletterEmail(email, subject, message);
//         successCount++;
//       } catch (err) {
//         console.error(`Failed to send to ${email}:`, err.message);
//         failCount++;
//       }
//     }

//     res.status(200).json({
//       success: true,
//       message: "Emails sent",
//       successCount,
//       failCount,
//       totalRecipients: emails.length,
//     });
//   } catch (error) {
//     console.error("Bulk email error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Send email to specific subscribers
// export const sendEmailToSubscribers = async (emails, subject, htmlContent) => {
//   try {
//     let successCount = 0;

//     for (const email of emails) {
//       try {
//         const mailOptions = {
//           from: process.env.EMAIL_USER ? `"Rent-Ride" <${process.env.EMAIL_USER}>` : '"Rent-Ride" <noreply@rentride.com>',
//           to: email,
//           subject: subject,
//           html: htmlContent,
//         };

//         await transporter.sendMail(mailOptions);
//         successCount++;
//       } catch (error) {
//         console.error(`Failed to send to ${email}:`, error.message);
//       }
//     }

//     return { success: true, sent: successCount };
//   } catch (error) {
//     return { success: false, error: error.message };
//   }
// };

import Subscriber from "../models/Subscriber.js";
import User from "../models/User.js";
import { transporter } from "./emailService.js";

// GET /api/admin/emails/subscriber-count
// Returns subscriber count, user count, and recent subscribers
export const getSubscriberCount = async (req, res) => {
  try {
    const [subscriberCount, recentSubscribers, userCount] = await Promise.all([
      Subscriber.countDocuments({ isSubscribed: true }),
      Subscriber.find({ isSubscribed: true })
        .sort({ subscribedAt: -1 })
        .limit(20)
        .select("email subscribedAt source"),
      User.countDocuments({ isEmailVerified: true }),
    ]);

    res.status(200).json({
      success: true,
      count: subscriberCount,
      userCount,
      recentSubscribers,
    });
  } catch (error) {
    console.error("Error fetching subscriber count:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/admin/emails/send-bulk
// target: "subscribers" | "users" | "both"
export const sendBulkEmail = async (req, res) => {
  try {
    const { subject, message, target = "subscribers" } = req.body;

    if (!subject || !message) {
      return res
        .status(400)
        .json({ success: false, message: "Subject and message are required" });
    }

    let recipientEmails = new Set();

    if (target === "subscribers" || target === "both") {
      const subs = await Subscriber.find({ isSubscribed: true }).select(
        "email",
      );
      subs.forEach((s) => recipientEmails.add(s.email));
    }

    if (target === "users" || target === "both") {
      const users = await User.find({
        isEmailVerified: true,
      }).select("email");
      users.forEach((u) => recipientEmails.add(u.email));
    }

    const emails = [...recipientEmails];

    if (emails.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No recipients found" });
    }

    let successCount = 0;
    let failCount = 0;

    const htmlContent = buildEmailHTML(subject, message);

    // Send in batches of 50 to avoid rate limiting
    const batchSize = 50;
    for (let i = 0; i < emails.length; i += batchSize) {
      const batch = emails.slice(i, i + batchSize);

      await Promise.all(
        batch.map(async (email) => {
          try {
            await transporter.sendMail({
              from: process.env.EMAIL_USER
                ? `"Rent-Ride" <${process.env.EMAIL_USER}>`
                : '"Rent-Ride" <noreply@rentride.com>',
              to: email,
              subject,
              html: htmlContent,
              text: message,
            });
            successCount++;
          } catch (err) {
            console.error(`Failed to send to ${email}:`, err.message);
            failCount++;
          }
        }),
      );

      // Pause between batches
      if (i + batchSize < emails.length) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
    }

    console.log(`📊 Bulk email: ${successCount} sent, ${failCount} failed`);

    res.status(200).json({
      success: true,
      message: "Campaign sent",
      successCount,
      failCount,
      totalRecipients: emails.length,
    });
  } catch (error) {
    console.error("Bulk email error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Helper: wrap plain/HTML message in a branded email template
const buildEmailHTML = (subject, body) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#7c3aed,#ec4899);padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700;letter-spacing:-0.5px;">🚗 Rent-Ride</h1>
              <p style="margin:6px 0 0;color:rgba(255,255,255,0.8);font-size:13px;">Your trusted vehicle rental partner</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px;color:#374151;font-size:15px;line-height:1.75;">
              <h2 style="margin:0 0 20px;font-size:20px;color:#111827;">${subject}</h2>
              <div>${body.replace(/\n/g, "<br/>")}</div>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;padding:24px 40px;border-top:1px solid #e5e7eb;text-align:center;">
              <p style="margin:0;font-size:12px;color:#9ca3af;">
                You are receiving this email because you subscribed to Rent-Ride updates.<br/>
                © ${new Date().getFullYear()} Rent-Ride. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

// Send email to a specific list of addresses (utility function)
export const sendEmailToSubscribers = async (emails, subject, htmlContent) => {
  let successCount = 0;

  for (const email of emails) {
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER
          ? `"Rent-Ride" <${process.env.EMAIL_USER}>`
          : '"Rent-Ride" <noreply@rentride.com>',
        to: email,
        subject,
        html: htmlContent,
      });
      successCount++;
    } catch (error) {
      console.error(`Failed to send to ${email}:`, error.message);
    }
  }

  return { success: true, sent: successCount };
};
