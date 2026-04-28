// import express from "express";
// import cors from "cors";
// import path from "path";
// import { fileURLToPath } from "url";

// // Import routes
// import authRoutes from "./routes/authRoutes.js";
// import vehicleRoutes from "./routes/vehicleRoutes.js";
// import adminVehicleRoutes from "./routes/adminVehicleRoutes.js";
// import bookingRoutes from "./routes/bookingRoutes.js";
// import profileRoutes from "./routes/profileRoutes.js";
// import userVehicleRoutes from "./routes/userVehicleRoutes.js";
// import documentRoutes from "./routes/documentRoutes.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Static files for uploads
// app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// // API Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/vehicles", vehicleRoutes);
// app.use("/api/admin/vehicles", adminVehicleRoutes);
// app.use("/api/bookings", bookingRoutes);
// app.use("/api/profile", profileRoutes);
// app.use("/api/user-vehicles", userVehicleRoutes);
// app.use("/api/documents", documentRoutes); // Add document routes

// // Health check endpoint
// app.get("/api/health", (req, res) => {
//   res.json({ status: "OK", message: "Server is running" });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error("Error:", err.stack);
//   res.status(500).json({
//     success: false,
//     message: "Something went wrong!",
//     error: process.env.NODE_ENV === "development" ? err.message : undefined,
//   });
// });

// // 404 handler for undefined routes
// app.use("*", (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: "Route not found",
//   });
// });

// export default app;
