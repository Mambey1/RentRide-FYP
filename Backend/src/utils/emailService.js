
import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from Backend root directory
config({ path: join(__dirname, "..", "..", ".env") });

console.log("🔍 Email Service - Direct .env load:");
console.log("EMAIL_USER:", process.env.EMAIL_USER || "❌ NOT FOUND");
console.log("EMAIL_PASS exists:", process.env.EMAIL_PASS ? "✅ YES" : "❌ NO");
console.log("Current directory:", __dirname);
console.log("Env file path:", join(__dirname, "..", "..", ".env"));
// ========== END OF ADDED CODE ==========

import nodemailer from "nodemailer";

// Debug: Check if environment variables are loaded
console.log("🔍 Email Service Debug:");
console.log(
  "EMAIL_USER from process.env:",
  process.env.EMAIL_USER || "❌ NOT FOUND",
);
console.log("EMAIL_PASS exists:", process.env.EMAIL_PASS ? "✅ YES" : "❌ NO");

let transporter;

// Initialize transporter with fallback options
try {
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    console.log("📧 Using Gmail configuration");
    console.log("Gmail User:", process.env.EMAIL_USER);
    console.log("Password length:", process.env.EMAIL_PASS.length);

    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Test connection
    transporter.verify(function (error, success) {
      if (error) {
        console.log("❌ Gmail connection failed:", error.message);
        console.log("💡 Creating test transporter instead...");
        createTestTransporter();
      } else {
        console.log("✅ Gmail server is ready to send messages");
      }
    });
  } else {
    console.log("⚠️  Gmail credentials missing, creating test transporter");
    createTestTransporter();
  }
} catch (error) {
  console.error("❌ Transporter creation error:", error.message);
  createTestTransporter();
}

// Create test transporter as fallback
async function createTestTransporter() {
  try {
    console.log("📧 Creating test email account...");
    const testAccount = await nodemailer.createTestAccount();

    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    console.log("✅ Test email account created!");
    console.log("   Username:", testAccount.user);
    console.log("   Password:", testAccount.pass);
    console.log("   Check emails at: https://ethereal.email");
    console.log("   (Use this for development testing)");
  } catch (error) {
    console.error("❌ Failed to create test transporter:", error.message);
    // Create a dummy transporter that just logs emails
    transporter = {
      sendMail: async (mailOptions) => {
        console.log("📧 [DUMMY] Would send email:");
        console.log("   To:", mailOptions.to);
        console.log("   Subject:", mailOptions.subject);
        return { messageId: "dummy-" + Date.now() };
      },
    };
  }
}

// Generate OTP
export const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log("🔢 Generated OTP:", otp);
  return otp;
};

// Send verification email with OTP
export const sendVerificationEmail = async (email, otp) => {
  console.log("\n📧 Sending verification email...");
  console.log("   To:", email);
  console.log("   OTP:", otp);

  try {
    if (!transporter) {
      throw new Error("Email transporter not initialized");
    }

    const mailOptions = {
      from: process.env.EMAIL_USER
        ? `"Rent-Ride" <${process.env.EMAIL_USER}>`
        : '"Rent-Ride" <noreply@rentride.com>',
      to: email,
      subject: "Email Verification OTP - Rent-Ride",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; margin: 0;">Rent<span style="color: #1e40af;">Ride</span></h1>
            <p style="color: #6b7280; font-size: 14px; margin-top: 5px;">Premium Car Rental Service</p>
          </div>
          
          <div style="background-color: #f8fafc; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1f2937; margin-top: 0;">Verify Your Email Address</h2>
            <p style="color: #4b5563; line-height: 1.6;">
              Thank you for registering with Rent-Ride! To complete your registration and access all features, please use the OTP below to verify your email address.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <div style="background-color: #ffffff; border: 2px dashed #2563eb; padding: 20px; display: inline-block; border-radius: 8px;">
                <div style="font-size: 32px; font-weight: bold; color: #2563eb; letter-spacing: 8px;">
                  ${otp}
                </div>
              </div>
              <p style="color: #6b7280; font-size: 14px; margin-top: 10px;">
                This OTP is valid for 10 minutes
              </p>
            </div>
            
            <p style="color: #4b5563; line-height: 1.6;">
              If you didn't create an account with Rent-Ride, please ignore this email or contact our support team.
            </p>
          </div>
          
          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center;">
            <p style="color: #9ca3af; font-size: 12px; margin-bottom: 5px;">
              Need help? Contact us at 
              <a href="mailto:support@rentride.com" style="color: #2563eb; text-decoration: none;">
                support@rentride.com
              </a>
            </p>
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              © ${new Date().getFullYear()} Rent-Ride. All rights reserved.
            </p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    if (info.response && info.response.includes("ethereal.email")) {
      const previewUrl = nodemailer.getTestMessageUrl(info);
      console.log("✅ Test email sent! Preview URL:", previewUrl);
    } else if (info.response && info.response.includes("gmail.com")) {
      console.log(
        "✅ REAL Gmail email sent successfully! Message ID:",
        info.messageId,
      );
    } else {
      console.log("✅ Email sent successfully! Message ID:", info.messageId);
    }

    return true;
  } catch (error) {
    console.error("❌ Error sending verification email:", error.message);
    console.log("📝 For development, OTP is:", otp);
    return true;
  }
};

// Send welcome email after verification
export const sendWelcomeEmail = async (email, name) => {
  console.log("\n📧 Sending welcome email to:", email);

  try {
    if (!transporter) {
      console.log("⚠️  No transporter, skipping welcome email");
      return true;
    }

    const mailOptions = {
      from: process.env.EMAIL_USER
        ? `"Rent-Ride" <${process.env.EMAIL_USER}>`
        : '"Rent-Ride" <noreply@rentride.com>',
      to: email,
      subject: "Welcome to Rent-Ride!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; margin: 0;">Welcome to <span style="color: #1e40af;">Rent-Ride!</span></h1>
            <p style="color: #6b7280; font-size: 14px; margin-top: 5px;">Premium Car Rental Service</p>
          </div>
          
          <div style="background-color: #f8fafc; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1f2937; margin-top: 0;">Hi ${name},</h2>
            <p style="color: #4b5563; line-height: 1.6;">
              Congratulations! Your email has been successfully verified and your account is now active.
            </p>
            
            <div style="background-color: #dcfce7; border-left: 4px solid #22c55e; padding: 15px; margin: 20px 0;">
              <p style="color: #166534; margin: 0;">
                ✅ <strong>Your account is now ready to use!</strong>
              </p>
            </div>
            
            <p style="color: #4b5563; line-height: 1.6;">
              You can now:
            </p>
            <ul style="color: #4b5563; line-height: 1.6; padding-left: 20px;">
              <li>Browse and rent premium vehicles</li>
              <li>Save your favorite cars</li>
              <li>Track your rentals</li>
              <li>Manage your profile and preferences</li>
            </ul>
            
            <div style="text-align: center; margin: 25px 0;">
              <a href="http://localhost:5173/rentridehome" 
                 style="background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                Start Exploring Cars
              </a>
            </div>
          </div>
          
          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              © ${new Date().getFullYear()} Rent-Ride. All rights reserved.
            </p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Welcome email sent!");

    if (info.response && info.response.includes("ethereal.email")) {
      console.log("   Preview:", nodemailer.getTestMessageUrl(info));
    }

    return true;
  } catch (error) {
    console.error("❌ Error sending welcome email:", error.message);
    return true;
  }
};

// Send booking approval email
export const sendBookingApprovalEmail = async (email, name, bookingDetails) => {
  console.log("\n📧 Sending booking approval email to:", email);

  try {
    if (!transporter) {
      console.log("⚠️  No transporter, skipping approval email");
      return true;
    }

    const pickupDate = new Date(bookingDetails.pickupDate).toLocaleDateString();
    const returnDate = new Date(bookingDetails.returnDate).toLocaleDateString();

    const mailOptions = {
      from: process.env.EMAIL_USER
        ? `"Rent-Ride" <${process.env.EMAIL_USER}>`
        : '"Rent-Ride" <noreply@rentride.com>',
      to: email,
      subject: "Booking Approved! 🎉 - Rent-Ride",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; margin: 0;">Rent<span style="color: #1e40af;">Ride</span></h1>
            <p style="color: #6b7280; font-size: 14px; margin-top: 5px;">Premium Car Rental Service</p>
          </div>
          
          <div style="background-color: #f0fdf4; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #166534; margin-top: 0;">✓ Booking Approved!</h2>
            <p style="color: #15803d; line-height: 1.6;">
              Dear <strong>${name}</strong>,
            </p>
            <p style="color: #15803d; line-height: 1.6;">
              Great news! Your booking has been <strong style="color: #22c55e;">APPROVED</strong> by our admin team.
            </p>
          </div>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #1f2937; margin-top: 0;">Booking Details:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #4b5563;"><strong>Booking ID:</strong></td>
                <td style="padding: 8px 0; text-align: right;">${bookingDetails.confirmationCode || bookingDetails._id}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #4b5563;"><strong>Vehicle:</strong></td>
                <td style="padding: 8px 0; text-align: right;">${bookingDetails.vehicle?.carName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #4b5563;"><strong>Pickup Date:</strong></td>
                <td style="padding: 8px 0; text-align: right;">${pickupDate} at ${bookingDetails.pickupTime}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #4b5563;"><strong>Return Date:</strong></td>
                <td style="padding: 8px 0; text-align: right;">${returnDate} at ${bookingDetails.returnTime}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #4b5563;"><strong>Total Amount:</strong></td>
                <td style="padding: 8px 0; text-align: right; font-weight: bold; color: #2563eb;">रु ${bookingDetails.totalAmount?.toLocaleString()}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #4b5563;"><strong>Driver Option:</strong></td>
                <td style="padding: 8px 0; text-align: right;">${bookingDetails.driverOption === "with" ? "With Driver" : "Self Drive"}</td>
              </tr>
            </table>
          </div>
          
          <div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 15px; margin-bottom: 20px;">
            <p style="color: #1e40af; margin: 0;">
              📌 <strong>Next Steps:</strong> Please confirm your booking by logging into your account. You have 48 hours to confirm before the booking expires.
            </p>
          </div>
          
          <div style="text-align: center; margin: 25px 0;">
            <a href="http://localhost:5173/profiledetails" 
               style="background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
              View My Bookings
            </a>
          </div>
          
          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center;">
            <p style="color: #9ca3af; font-size: 12px; margin-bottom: 5px;">
              Need help? Contact us at 
              <a href="mailto:support@rentride.com" style="color: #2563eb; text-decoration: none;">
                support@rentride.com
              </a>
            </p>
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              © ${new Date().getFullYear()} Rent-Ride. All rights reserved.
            </p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Booking approval email sent!");

    if (info.response && info.response.includes("ethereal.email")) {
      console.log("   Preview:", nodemailer.getTestMessageUrl(info));
    }

    return true;
  } catch (error) {
    console.error("❌ Error sending approval email:", error.message);
    return true;
  }
};

// Send booking rejection email
export const sendBookingRejectionEmail = async (
  email,
  name,
  bookingDetails,
  reason,
) => {
  console.log("\n📧 Sending booking rejection email to:", email);

  try {
    if (!transporter) {
      console.log("⚠️  No transporter, skipping rejection email");
      return true;
    }

    const pickupDate = new Date(bookingDetails.pickupDate).toLocaleDateString();

    const mailOptions = {
      from: process.env.EMAIL_USER
        ? `"Rent-Ride" <${process.env.EMAIL_USER}>`
        : '"Rent-Ride" <noreply@rentride.com>',
      to: email,
      subject: "Booking Update - Rent-Ride",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; margin: 0;">Rent<span style="color: #1e40af;">Ride</span></h1>
            <p style="color: #6b7280; font-size: 14px; margin-top: 5px;">Premium Car Rental Service</p>
          </div>
          
          <div style="background-color: #fef2f2; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #991b1b; margin-top: 0;">✗ Booking Rejected</h2>
            <p style="color: #b91c1c; line-height: 1.6;">
              Dear <strong>${name}</strong>,
            </p>
            <p style="color: #b91c1c; line-height: 1.6;">
              We regret to inform you that your booking has been <strong style="color: #dc2626;">REJECTED</strong>.
            </p>
          </div>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #1f2937; margin-top: 0;">Booking Details:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #4b5563;"><strong>Booking ID:</strong></td>
                <td style="padding: 8px 0; text-align: right;">${bookingDetails.confirmationCode || bookingDetails._id}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #4b5563;"><strong>Vehicle:</strong></td>
                <td style="padding: 8px 0; text-align: right;">${bookingDetails.vehicle?.carName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #4b5563;"><strong>Pickup Date:</strong></td>
                <td style="padding: 8px 0; text-align: right;">${pickupDate} at ${bookingDetails.pickupTime}</td>
               </tr>
            </table>
          </div>
          
          <div style="background-color: #fee2e2; border-left: 4px solid #dc2626; padding: 15px; margin-bottom: 20px;">
            <p style="color: #991b1b; margin: 0; font-weight: bold;">
              Reason for Rejection:
            </p>
            <p style="color: #b91c1c; margin: 8px 0 0 0;">
              ${reason || "No specific reason provided. Please contact support for more information."}
            </p>
          </div>
          
          <div style="background-color: #fef9c3; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
            <p style="color: #854d0e; margin: 0; font-size: 14px;">
              💡 <strong>What can you do?</strong>
            </p>
            <ul style="color: #854d0e; margin: 8px 0 0 20px; font-size: 14px;">
              <li>Check the reason above and update your booking details</li>
              <li>Contact our support team for assistance</li>
              <li>Try booking a different vehicle or date</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 25px 0;">
            <a href="http://localhost:5173/rentridehome" 
               style="background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
              Browse Other Vehicles
            </a>
          </div>
          
          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center;">
            <p style="color: #9ca3af; font-size: 12px; margin-bottom: 5px;">
              Need help? Contact us at 
              <a href="mailto:support@rentride.com" style="color: #2563eb; text-decoration: none;">
                support@rentride.com
              </a>
            </p>
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              © ${new Date().getFullYear()} Rent-Ride. All rights reserved.
            </p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Booking rejection email sent!");

    if (info.response && info.response.includes("ethereal.email")) {
      console.log("   Preview:", nodemailer.getTestMessageUrl(info));
    }

    return true;
  } catch (error) {
    console.error("❌ Error sending rejection email:", error.message);
    return true;
  }
};

// Send booking confirmation email (after user confirms)
export const sendBookingConfirmationEmail = async (
  email,
  name,
  bookingDetails,
) => {
  console.log("\n📧 Sending booking confirmation email to:", email);

  try {
    if (!transporter) {
      console.log("⚠️  No transporter, skipping confirmation email");
      return true;
    }

    const pickupDate = new Date(bookingDetails.pickupDate).toLocaleDateString();
    const returnDate = new Date(bookingDetails.returnDate).toLocaleDateString();

    const mailOptions = {
      from: process.env.EMAIL_USER
        ? `"Rent-Ride" <${process.env.EMAIL_USER}>`
        : '"Rent-Ride" <noreply@rentride.com>',
      to: email,
      subject: "Booking Confirmed! 🚗 - Rent-Ride",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; margin: 0;">Rent<span style="color: #1e40af;">Ride</span></h1>
            <p style="color: #6b7280; font-size: 14px; margin-top: 5px;">Premium Car Rental Service</p>
          </div>
          
          <div style="background-color: #f0fdf4; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #166534; margin-top: 0;">✓ Booking Confirmed!</h2>
            <p style="color: #15803d; line-height: 1.6;">
              Congratulations <strong>${name}</strong>! Your booking is now <strong style="color: #22c55e;">CONFIRMED</strong>.
            </p>
          </div>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #1f2937; margin-top: 0;">Booking Details:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #4b5563;"><strong>Booking ID:</strong></td>
                <td style="padding: 8px 0; text-align: right;">${bookingDetails.confirmationCode || bookingDetails._id}</td>
               </tr>
              <tr>
                <td style="padding: 8px 0; color: #4b5563;"><strong>Vehicle:</strong></td>
                <td style="padding: 8px 0; text-align: right;">${bookingDetails.vehicle?.carName}</td>
               </tr>
              <tr>
                <td style="padding: 8px 0; color: #4b5563;"><strong>Pickup:</strong></td>
                <td style="padding: 8px 0; text-align: right;">${pickupDate} at ${bookingDetails.pickupTime}</td>
               </tr>
              <tr>
                <td style="padding: 8px 0; color: #4b5563;"><strong>Return:</strong></td>
                <td style="padding: 8px 0; text-align: right;">${returnDate} at ${bookingDetails.returnTime}</td>
               </tr>
              <tr>
                <td style="padding: 8px 0; color: #4b5563;"><strong>Pickup Location:</strong></td>
                <td style="padding: 8px 0; text-align: right;">${bookingDetails.pickupLocation}</td>
               </tr>
              <tr>
                <td style="padding: 8px 0; color: #4b5563;"><strong>Total Amount:</strong></td>
                <td style="padding: 8px 0; text-align: right; font-weight: bold; color: #2563eb;">रु ${bookingDetails.totalAmount?.toLocaleString()}</td>
               </tr>
            </table>
          </div>
          
          <div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 15px; margin-bottom: 20px;">
            <p style="color: #1e40af; margin: 0;">
              🚗 <strong>Important:</strong> Please arrive on time for pickup. Don't forget to bring your driver's license and the confirmation code.
            </p>
          </div>
          
          <div style="text-align: center; margin: 25px 0;">
            <a href="http://localhost:5173/profiledetails" 
               style="background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
              View Booking Details
            </a>
          </div>
          
          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center;">
            <p style="color: #9ca3af; font-size: 12px; margin-bottom: 5px;">
              Need help? Contact us at 
              <a href="mailto:support@rentride.com" style="color: #2563eb; text-decoration: none;">
                support@rentride.com
              </a>
            </p>
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              © ${new Date().getFullYear()} Rent-Ride. All rights reserved.
            </p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Booking confirmation email sent!");

    if (info.response && info.response.includes("ethereal.email")) {
      console.log("   Preview:", nodemailer.getTestMessageUrl(info));
    }

    return true;
  } catch (error) {
    console.error("❌ Error sending confirmation email:", error.message);
    return true;
  }
};

// Send vehicle approval email
export const sendVehicleApprovalEmail = async (email, name, vehicleDetails) => {
  console.log("\n📧 Sending vehicle approval email to:", email);

  try {
    if (!transporter) {
      console.log("⚠️  No transporter, skipping approval email");
      return true;
    }

    const mailOptions = {
      from: process.env.EMAIL_USER
        ? `"Rent-Ride" <${process.env.EMAIL_USER}>`
        : '"Rent-Ride" <noreply@rentride.com>',
      to: email,
      subject: "Vehicle Listing Approved! 🚗 - Rent-Ride",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; margin: 0;">Rent<span style="color: #1e40af;">Ride</span></h1>
            <p style="color: #6b7280; font-size: 14px;">Premium Car Rental Service</p>
          </div>
          
          <div style="background-color: #f0fdf4; padding: 25px; border-radius: 8px;">
            <h2 style="color: #166534;">✓ Vehicle Approved!</h2>
            <p>Dear <strong>${name}</strong>,</p>
            <p>Congratulations! Your vehicle <strong>${vehicleDetails.carName}</strong> (${vehicleDetails.carNumber}) has been approved and is now listed on Rent-Ride.</p>
            <p>Users can now book your vehicle. You can view your listing in the "My Vehicles" section.</p>
            <div style="margin: 20px 0; padding: 15px; background-color: #e6f7e6; border-radius: 8px;">
              <p><strong>Vehicle Details:</strong></p>
              <p>🚗 Car: ${vehicleDetails.carName}</p>
              <p>📝 Car Number: ${vehicleDetails.carNumber}</p>
              <p>💰 Rate: रु ${vehicleDetails.ratePerDay}/day</p>
            </div>
            <div style="text-align: center; margin: 25px 0;">
              <a href="http://localhost:5173/my-vehicles" style="background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block;">
                View My Vehicles
              </a>
            </div>
          </div>
          
          <div style="margin-top: 20px; text-align: center; color: #6b7280; font-size: 12px;">
            <p>Need help? Contact us at support@rentride.com</p>
            <p>© ${new Date().getFullYear()} Rent-Ride. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Vehicle approval email sent!");

    if (info.response && info.response.includes("ethereal.email")) {
      console.log("   Preview:", nodemailer.getTestMessageUrl(info));
    }

    return true;
  } catch (error) {
    console.error("❌ Error sending approval email:", error.message);
    return true;
  }
};

// Send vehicle rejection email
export const sendVehicleRejectionEmail = async (email, name, vehicleDetails, reason) => {
  console.log("\n📧 Sending vehicle rejection email to:", email);

  try {
    if (!transporter) {
      console.log("⚠️  No transporter, skipping rejection email");
      return true;
    }

    const mailOptions = {
      from: process.env.EMAIL_USER
        ? `"Rent-Ride" <${process.env.EMAIL_USER}>`
        : '"Rent-Ride" <noreply@rentride.com>',
      to: email,
      subject: "Vehicle Listing Update - Rent-Ride",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; margin: 0;">Rent<span style="color: #1e40af;">Ride</span></h1>
            <p style="color: #6b7280; font-size: 14px;">Premium Car Rental Service</p>
          </div>
          
          <div style="background-color: #fef2f2; padding: 25px; border-radius: 8px;">
            <h2 style="color: #991b1b;">✗ Vehicle Listing Rejected</h2>
            <p>Dear <strong>${name}</strong>,</p>
            <p>We regret to inform you that your vehicle listing for <strong>${vehicleDetails.carName}</strong> (${vehicleDetails.carNumber}) has been rejected.</p>
            <div style="background-color: #fee2e2; padding: 15px; border-radius: 6px; margin: 15px 0;">
              <p style="color: #991b1b; margin: 0;"><strong>Reason for Rejection:</strong></p>
              <p style="color: #b91c1c; margin: 8px 0 0 0;">${reason}</p>
            </div>
            <p>Please update the required information and resubmit your listing.</p>
            <div style="text-align: center; margin: 25px 0;">
              <a href="http://localhost:5173/list-vehicle" style="background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Edit & Resubmit
              </a>
            </div>
          </div>
          
          <div style="margin-top: 20px; text-align: center; color: #6b7280; font-size: 12px;">
            <p>Need help? Contact us at support@rentride.com</p>
            <p>© ${new Date().getFullYear()} Rent-Ride. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Vehicle rejection email sent!");

    if (info.response && info.response.includes("ethereal.email")) {
      console.log("   Preview:", nodemailer.getTestMessageUrl(info));
    }

    return true;
  } catch (error) {
    console.error("❌ Error sending rejection email:", error.message);
    return true;
  }
};


// Send subscription confirmation email
export const sendSubscriptionEmail = async (email) => {
  console.log("\n📧 Sending subscription confirmation email to:", email);

  try {
    if (!transporter) {
      console.log("⚠️  No transporter, skipping subscription email");
      return true;
    }

    const mailOptions = {
      from: process.env.EMAIL_USER ? `"Rent-Ride" <${process.env.EMAIL_USER}>` : '"Rent-Ride" <noreply@rentride.com>',
      to: email,
      subject: "Welcome to Rent-Ride Newsletter! 🎉",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; margin: 0;">Rent<span style="color: #1e40af;">Ride</span></h1>
            <p style="color: #6b7280; font-size: 14px;">Premium Car Rental Service</p>
          </div>
          
          <div style="background-color: #f0fdf4; padding: 25px; border-radius: 8px;">
            <h2 style="color: #166534;">Thank You for Subscribing! ✅</h2>
            <p>Dear Subscriber,</p>
            <p>Thank you for subscribing to the Rent-Ride newsletter! You will now receive all exclusive notifications, deals, and updates about our premium car rental service.</p>
            <div style="margin: 20px 0; padding: 15px; background-color: #dcfce7; border-radius: 8px;">
              <p style="margin: 0;">✨ <strong>What to expect:</strong></p>
              <ul style="margin-top: 10px;">
                <li>🚗 Exclusive vehicle deals and discounts</li>
                <li>🎉 Special offers for subscribers only</li>
                <li>📅 Event notifications and updates</li>
                <li>💡 Car rental tips and recommendations</li>
              </ul>
            </div>
            <p>We're excited to have you on board!</p>
          </div>
          
          <div style="margin-top: 20px; text-align: center; color: #6b7280; font-size: 12px;">
            <p>Need help? Contact us at support@rentride.com</p>
            <p>© ${new Date().getFullYear()} Rent-Ride. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Subscription email sent!");

    if (info.response && info.response.includes("ethereal.email")) {
      console.log("   Preview:", nodemailer.getTestMessageUrl(info));
    }

    return true;
  } catch (error) {
    console.error("❌ Error sending subscription email:", error.message);
    return false;
  }
};
// Export transporter for testing
export { transporter };
