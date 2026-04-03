import Subscriber from "../models/Subscriber.js";
import { transporter } from "./emailService.js";

// Send bulk email to all subscribers
export const sendBulkEmail = async (subject, htmlContent, textContent = "") => {
  try {
    // Get all active subscribers
    const subscribers = await Subscriber.find({ isActive: true });
    
    if (subscribers.length === 0) {
      console.log("No subscribers found");
      return { success: false, count: 0 };
    }

    console.log(`📧 Sending email to ${subscribers.length} subscribers...`);

    let successCount = 0;
    let failCount = 0;

    // Send emails in batches to avoid rate limiting
    const batchSize = 50;
    for (let i = 0; i < subscribers.length; i += batchSize) {
      const batch = subscribers.slice(i, i + batchSize);
      
      await Promise.all(
        batch.map(async (subscriber) => {
          try {
            const mailOptions = {
              from: process.env.EMAIL_USER ? `"Rent-Ride" <${process.env.EMAIL_USER}>` : '"Rent-Ride" <noreply@rentride.com>',
              to: subscriber.email,
              subject: subject,
              html: htmlContent,
              text: textContent,
            };
            
            await transporter.sendMail(mailOptions);
            successCount++;
            console.log(`✅ Email sent to ${subscriber.email}`);
          } catch (error) {
            failCount++;
            console.error(`❌ Failed to send to ${subscriber.email}:`, error.message);
          }
        })
      );
      
      // Wait between batches
      if (i + batchSize < subscribers.length) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    console.log(`📊 Summary: ${successCount} sent, ${failCount} failed`);
    return { success: true, successCount, failCount, total: subscribers.length };
  } catch (error) {
    console.error("Bulk email error:", error);
    return { success: false, error: error.message };
  }
};

// Send email to specific subscribers
export const sendEmailToSubscribers = async (emails, subject, htmlContent) => {
  try {
    let successCount = 0;
    
    for (const email of emails) {
      try {
        const mailOptions = {
          from: process.env.EMAIL_USER ? `"Rent-Ride" <${process.env.EMAIL_USER}>` : '"Rent-Ride" <noreply@rentride.com>',
          to: email,
          subject: subject,
          html: htmlContent,
        };
        
        await transporter.sendMail(mailOptions);
        successCount++;
      } catch (error) {
        console.error(`Failed to send to ${email}:`, error.message);
      }
    }
    
    return { success: true, sent: successCount };
  } catch (error) {
    return { success: false, error: error.message };
  }
};