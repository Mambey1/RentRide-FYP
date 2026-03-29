

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

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
import userVehicleRoutes from "./src/routes/userVehicleRoutes.js"; // ADD THIS
import notificationRoutes from "./src/routes/notificationRoutes.js";

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

// Serve uploaded files
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use("/uploads", express.static(uploadsDir));

// Create user-vehicles upload directory
const userVehiclesDir = path.join(__dirname, "uploads/user-vehicles");
if (!fs.existsSync(userVehiclesDir)) {
  fs.mkdirSync(userVehiclesDir, { recursive: true });
  console.log("📁 Created user-vehicles upload directory");
}

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/user-vehicles", userVehicleRoutes); // ADD THIS ROUTE
app.use("/api/notifications", notificationRoutes);

// Health check route
app.get("/api/test", (req, res) => {
  res.json({ success: true, message: "Backend is working!" });
});

// Test user-vehicles route
app.get("/api/user-vehicles-test", (req, res) => {
  res.json({ success: true, message: "User vehicles route is available!" });
});

// MongoDB connection
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/rentride";
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`✅ Routes available:`);
  console.log(`   - /api/auth`);
  console.log(`   - /api/profile`);
  console.log(`   - /api/vehicles`);
  console.log(`   - /api/bookings`);
  console.log(`   - /api/documents`);
  console.log(`   - /api/user-vehicles`);
});
