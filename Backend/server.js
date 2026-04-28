// // // import express from "express";
// // // import mongoose from "mongoose";
// // // import cors from "cors";
// // // import dotenv from "dotenv";
// // // import path from "path";
// // // import { fileURLToPath } from "url";
// // // import fs from "fs";

// // // const __filename = fileURLToPath(import.meta.url);
// // // const __dirname = path.dirname(__filename);

// // // // Load environment variables
// // // dotenv.config();

// // // // Import routes
// // // import authRoutes from "./src/routes/authRoutes.js";
// // // import profileRoutes from "./src/routes/profileRoutes.js";
// // // import vehicleRoutes from "./src/routes/vehicleRoutes.js";
// // // import bookingRoutes from "./src/routes/bookingRoutes.js";
// // // import documentRoutes from "./src/routes/documentRoutes.js";
// // // import userVehicleRoutes from "./src/routes/userVehicleRoutes.js"; // ADD THIS
// // // import notificationRoutes from "./src/routes/notificationRoutes.js";
// // // // import paymentRoutes from "./routes/paymentRoutes.js";
// // // import paymentRoutes from "./src/routes/paymentRoutes.js";
// // // import subscribeRoutes from "./src/routes/subscribeRoutes.js";
// // // import adminEmailRoutes from "./src/routes/adminEmailRoutes.js";

// // // //Revenue
// // // import revenueRoutes from "./src/routes/revenueRoutes.js";

// // // //Review
// // // // In your main app.js or server.js
// // // import reviewRoutes from "./src/routes/reviewRoutes.js";

// // // const app = express();

// // // // CORS configuration
// // // app.use(
// // //   cors({
// // //     origin: [
// // //       "http://localhost:5173",
// // //       "http://localhost:3000",
// // //       "http://127.0.0.1:5173",
// // //     ],
// // //     credentials: true,
// // //     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
// // //     allowedHeaders: ["Content-Type", "Authorization"],
// // //   }),
// // // );

// // // app.use(express.json());
// // // app.use(express.urlencoded({ extended: true }));

// // // // Serve uploaded files
// // // const uploadsDir = path.join(__dirname, "uploads");
// // // if (!fs.existsSync(uploadsDir)) {
// // //   fs.mkdirSync(uploadsDir, { recursive: true });
// // // }
// // // app.use("/uploads", express.static(uploadsDir));

// // // // Create user-vehicles upload directory
// // // const userVehiclesDir = path.join(__dirname, "uploads/user-vehicles");
// // // if (!fs.existsSync(userVehiclesDir)) {
// // //   fs.mkdirSync(userVehiclesDir, { recursive: true });
// // //   console.log("📁 Created user-vehicles upload directory");
// // // }

// // // // Routes
// // // app.use("/api/auth", authRoutes);
// // // app.use("/api/profile", profileRoutes);
// // // app.use("/api/vehicles", vehicleRoutes);
// // // app.use("/api/bookings", bookingRoutes);
// // // app.use("/api/documents", documentRoutes);
// // // app.use("/api/user-vehicles", userVehicleRoutes); // ADD THIS ROUTE
// // // app.use("/api/notifications", notificationRoutes);
// // // app.use("/api/payments", paymentRoutes);
// // // app.use("/api/subscribe", subscribeRoutes);
// // // app.use("/api/admin/emails", adminEmailRoutes);

// // // app.use("/api/revenue", revenueRoutes);

// // // app.use("/api/reviews", reviewRoutes);

// // // // Health check route
// // // app.get("/api/test", (req, res) => {
// // //   res.json({ success: true, message: "Backend is working!" });
// // // });

// // // // Test user-vehicles route
// // // app.get("/api/user-vehicles-test", (req, res) => {
// // //   res.json({ success: true, message: "User vehicles route is available!" });
// // // });

// // // // MongoDB connection
// // // const MONGODB_URI =
// // //   process.env.MONGODB_URI || "mongodb://localhost:27017/rentride";
// // // mongoose
// // //   .connect(MONGODB_URI)
// // //   .then(() => console.log("✅ MongoDB connected successfully"))
// // //   .catch((err) => console.log("❌ MongoDB connection error:", err));

// // // const PORT = process.env.PORT || 5000;
// // // app.listen(PORT, () => {
// // //   console.log(`🚀 Server running on http://localhost:${PORT}`);
// // //   console.log(`✅ Routes available:`);
// // //   console.log(`   - /api/auth`);
// // //   console.log(`   - /api/profile`);
// // //   console.log(`   - /api/vehicles`);
// // //   console.log(`   - /api/bookings`);
// // //   console.log(`   - /api/documents`);
// // //   console.log(`   - /api/user-vehicles`);
// // // });

// // import express from "express";
// // import mongoose from "mongoose";
// // import cors from "cors";
// // import dotenv from "dotenv";
// // import path from "path";
// // import { fileURLToPath } from "url";
// // import fs from "fs";
// // import { createServer } from "http";

// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);

// // // Load environment variables
// // dotenv.config();

// // // Import routes
// // import authRoutes from "./src/routes/authRoutes.js";
// // import profileRoutes from "./src/routes/profileRoutes.js";
// // import vehicleRoutes from "./src/routes/vehicleRoutes.js";
// // import bookingRoutes from "./src/routes/bookingRoutes.js";
// // import documentRoutes from "./src/routes/documentRoutes.js";
// // import userVehicleRoutes from "./src/routes/userVehicleRoutes.js";
// // import notificationRoutes from "./src/routes/notificationRoutes.js";
// // import paymentRoutes from "./src/routes/paymentRoutes.js";
// // import subscribeRoutes from "./src/routes/subscribeRoutes.js";
// // import adminEmailRoutes from "./src/routes/adminEmailRoutes.js";
// // import revenueRoutes from "./src/routes/revenueRoutes.js";
// // import reviewRoutes from "./src/routes/reviewRoutes.js";
// // import chatRoutes from "./src/routes/chatRoutes.js";

// // // Import Socket.IO
// // import { initializeSocket } from "./src/socket/socketServer.js";

// // const app = express();

// // // CORS configuration
// // app.use(
// //   cors({
// //     origin: [
// //       "http://localhost:5173",
// //       "http://localhost:3000",
// //       "http://127.0.0.1:5173",
// //     ],
// //     credentials: true,
// //     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
// //     allowedHeaders: ["Content-Type", "Authorization"],
// //   }),
// // );

// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));

// // // Serve uploaded files
// // const uploadsDir = path.join(__dirname, "uploads");
// // if (!fs.existsSync(uploadsDir)) {
// //   fs.mkdirSync(uploadsDir, { recursive: true });
// // }
// // app.use("/uploads", express.static(uploadsDir));

// // // Create user-vehicles upload directory
// // const userVehiclesDir = path.join(__dirname, "uploads/user-vehicles");
// // if (!fs.existsSync(userVehiclesDir)) {
// //   fs.mkdirSync(userVehiclesDir, { recursive: true });
// //   console.log("📁 Created user-vehicles upload directory");
// // }

// // // Routes
// // app.use("/api/auth", authRoutes);
// // app.use("/api/profile", profileRoutes);
// // app.use("/api/vehicles", vehicleRoutes);
// // app.use("/api/bookings", bookingRoutes);
// // app.use("/api/documents", documentRoutes);
// // app.use("/api/user-vehicles", userVehicleRoutes);
// // app.use("/api/notifications", notificationRoutes);
// // app.use("/api/payments", paymentRoutes);
// // app.use("/api/subscribe", subscribeRoutes);
// // app.use("/api/admin/emails", adminEmailRoutes);
// // app.use("/api/revenue", revenueRoutes);
// // app.use("/api/reviews", reviewRoutes);
// // app.use("/api/chats", chatRoutes);  // CHAT ROUTES ADDED

// // // Health check route
// // app.get("/api/test", (req, res) => {
// //   res.json({ success: true, message: "Backend is working!" });
// // });

// // app.get("/api/health", (req, res) => {
// //   res.json({ success: true, message: "Server is running", timestamp: new Date().toISOString() });
// // });

// // // Test user-vehicles route
// // app.get("/api/user-vehicles-test", (req, res) => {
// //   res.json({ success: true, message: "User vehicles route is available!" });
// // });

// // // MongoDB connection
// // const MONGODB_URI =
// //   process.env.MONGODB_URI || "mongodb://localhost:27017/rentride";
// // mongoose
// //   .connect(MONGODB_URI)
// //   .then(() => console.log("✅ MongoDB connected successfully"))
// //   .catch((err) => console.log("❌ MongoDB connection error:", err));

// // // Create HTTP server for Socket.IO
// // const server = createServer(app);

// // // Initialize Socket.IO
// // initializeSocket(server);

// // const PORT = process.env.PORT || 5000;
// // server.listen(PORT, '0.0.0.0', () => {
// //   console.log(`🚀 Server running on http://localhost:${PORT}`);
// //   console.log(`✅ Socket.IO ready for real-time chat`);
// //   console.log(`✅ Routes available:`);
// //   console.log(`   - /api/auth`);
// //   console.log(`   - /api/profile`);
// //   console.log(`   - /api/vehicles`);
// //   console.log(`   - /api/bookings`);
// //   console.log(`   - /api/documents`);
// //   console.log(`   - /api/user-vehicles`);
// //   console.log(`   - /api/chats`);
// // });

// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";
// import fs from "fs";
// import { createServer } from "http";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Load environment variables
// dotenv.config();

// // Import routes
// import authRoutes from "./src/routes/authRoutes.js";
// import profileRoutes from "./src/routes/profileRoutes.js";
// import vehicleRoutes from "./src/routes/vehicleRoutes.js";
// import bookingRoutes from "./src/routes/bookingRoutes.js";
// import documentRoutes from "./src/routes/documentRoutes.js";
// import userVehicleRoutes from "./src/routes/userVehicleRoutes.js";
// import notificationRoutes from "./src/routes/notificationRoutes.js";
// import paymentRoutes from "./src/routes/paymentRoutes.js";
// import subscribeRoutes from "./src/routes/subscribeRoutes.js";
// import adminEmailRoutes from "./src/routes/adminEmailRoutes.js";
// import revenueRoutes from "./src/routes/revenueRoutes.js";
// import reviewRoutes from "./src/routes/reviewRoutes.js";
// import chatRoutes from "./src/routes/chatRoutes.js";
// // import adminChatRoutes from "./routes/adminChatRoutes.js";
// // Import Socket.IO
// import { initializeSocket } from "./src/socket/socketServer.js";
// import adminChatRoutes from "./src/routes/adminChatRoutes.js";

// import bikeRoutes from "./src/routes/bikeRoutes.js";

// const app = express();

// // CORS configuration
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "http://localhost:3000",
//       "http://127.0.0.1:5173",
//     ],
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   }),
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Serve uploaded files
// const uploadsDir = path.join(__dirname, "uploads");
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir, { recursive: true });
// }
// app.use("/uploads", express.static(uploadsDir));

// // Create user-vehicles upload directory
// const userVehiclesDir = path.join(__dirname, "uploads/user-vehicles");
// if (!fs.existsSync(userVehiclesDir)) {
//   fs.mkdirSync(userVehiclesDir, { recursive: true });
//   console.log("📁 Created user-vehicles upload directory");
// }

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/profile", profileRoutes);
// app.use("/api/vehicles", vehicleRoutes);
// app.use("/api/bookings", bookingRoutes);
// app.use("/api/documents", documentRoutes);
// app.use("/api/user-vehicles", userVehicleRoutes);
// app.use("/api/notifications", notificationRoutes);
// app.use("/api/payments", paymentRoutes);
// app.use("/api/subscribe", subscribeRoutes);
// app.use("/api/admin/emails", adminEmailRoutes);
// app.use("/api/revenue", revenueRoutes);
// app.use("/api/reviews", reviewRoutes);
// app.use("/api/chats", chatRoutes);
// app.use("/api/admin/chats", adminChatRoutes);

// app.use("/api/bikes", bikeRoutes);
// // Health check route
// app.get("/api/test", (req, res) => {
//   res.json({ success: true, message: "Backend is working!" });
// });

// app.get("/api/health", (req, res) => {
//   res.json({
//     success: true,
//     message: "Server is running",
//     timestamp: new Date().toISOString(),
//   });
// });

// // Test user-vehicles route
// app.get("/api/user-vehicles-test", (req, res) => {
//   res.json({ success: true, message: "User vehicles route is available!" });
// });

// // MongoDB connection
// const MONGODB_URI =
//   process.env.MONGODB_URI || "mongodb://localhost:27017/rentride";
// mongoose
//   .connect(MONGODB_URI)
//   .then(() => console.log("✅ MongoDB connected successfully"))
//   .catch((err) => console.log("❌ MongoDB connection error:", err));

// // Create HTTP server for Socket.IO
// const server = createServer(app);

// // Initialize Socket.IO
// const io = initializeSocket(server);

// // Add this before your routes
// app.get("/api/bikes-test", (req, res) => {
//   res.json({ success: true, message: "Bikes API is working!" });
// });

// // Store io in app for access in controllers
// app.set("io", io);

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, "0.0.0.0", () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
//   console.log(`✅ Socket.IO ready for real-time chat`);
//   console.log(`✅ Routes available:`);
//   console.log(`   - /api/auth`);
//   console.log(`   - /api/profile`);
//   console.log(`   - /api/vehicles`);
//   console.log(`   - /api/bookings`);
//   console.log(`   - /api/documents`);
//   console.log(`   - /api/user-vehicles`);
//   console.log(`   - /api/chats`);
// });


import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { createServer } from "http";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Import routes
import authRoutes from "./src/routes/authRoutes.js";
import profileRoutes from "./src/routes/profileRoutes.js";
import vehicleRoutes from "./src/routes/vehicleRoutes.js";
import bookingRoutes from "./src/routes/bookingRoutes.js";
import documentRoutes from "./src/routes/documentRoutes.js";
import userVehicleRoutes from "./src/routes/userVehicleRoutes.js";
import notificationRoutes from "./src/routes/notificationRoutes.js";
import paymentRoutes from "./src/routes/paymentRoutes.js";
import subscribeRoutes from "./src/routes/subscribeRoutes.js";
import adminEmailRoutes from "./src/routes/adminEmailRoutes.js";
import revenueRoutes from "./src/routes/revenueRoutes.js";
import reviewRoutes from "./src/routes/reviewRoutes.js";
import chatRoutes from "./src/routes/chatRoutes.js";
import adminChatRoutes from "./src/routes/adminChatRoutes.js";
import bikeRoutes from "./src/routes/bikeRoutes.js";

// Import Socket.IO
import { initializeSocket } from "./src/socket/socketServer.js";

const app = express();

// CORS configuration
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://127.0.0.1:5173",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Ensure all upload directories exist ─────────────────────────────────────
const uploadDirs = [
  "uploads",
  "uploads/profiles",       // ← profile photos
  "uploads/chats",          // ← chat images
  "uploads/vehicles",       // ← admin vehicle photos
  "uploads/user-vehicles",  // ← user listed vehicle photos
  "uploads/documents",      // ← KYC documents
  "uploads/bikes",          // ← bike photos
];

uploadDirs.forEach((dir) => {
  const fullPath = path.join(__dirname, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`📁 Created upload directory: ${dir}`);
  }
});

// Serve ALL uploaded files under /uploads/*
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/user-vehicles", userVehicleRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/subscribe", subscribeRoutes);
app.use("/api/admin/emails", adminEmailRoutes);
app.use("/api/revenue", revenueRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/admin/chats", adminChatRoutes);
app.use("/api/bikes", bikeRoutes);

// ─── Health check routes ──────────────────────────────────────────────────────
app.get("/api/test", (req, res) => {
  res.json({ success: true, message: "Backend is working!" });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/user-vehicles-test", (req, res) => {
  res.json({ success: true, message: "User vehicles route is available!" });
});

app.get("/api/bikes-test", (req, res) => {
  res.json({ success: true, message: "Bikes API is working!" });
});

// ─── MongoDB connection ───────────────────────────────────────────────────────
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/rentride";
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// ─── HTTP + Socket.IO server ──────────────────────────────────────────────────
const server = createServer(app);
const io = initializeSocket(server);
app.set("io", io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`✅ Socket.IO ready for real-time chat`);
  console.log(`✅ Upload directories ready`);
  console.log(`✅ Routes available:`);
  console.log(`   - /api/auth`);
  console.log(`   - /api/profile`);
  console.log(`   - /api/vehicles`);
  console.log(`   - /api/bookings`);
  console.log(`   - /api/documents`);
  console.log(`   - /api/user-vehicles`);
  console.log(`   - /api/chats`);
  console.log(`   - /api/bikes`);
});