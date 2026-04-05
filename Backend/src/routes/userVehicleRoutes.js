// // // // // import express from "express";
// // // // // import multer from "multer";
// // // // // import path from "path";
// // // // // import { fileURLToPath } from "url";
// // // // // import { protect, authorize } from "../middleware/authMiddleware.js";
// // // // // import UserVehicle from "../models/UserVehicle.js";
// // // // // import {
// // // // //   listVehicle,
// // // // //   getUserVehicles,
// // // // //   getUserVehicleById,
// // // // //   updateUserVehicle,
// // // // //   deleteUserVehicle,
// // // // //   getAllUserVehicles,
// // // // //   approveUserVehicle,
// // // // //   rejectUserVehicle,
// // // // //   activateUserVehicle,
// // // // //   deactivateUserVehicle,
// // // // //   deleteUserVehicleAdmin,
// // // // // } from "../controllers/userVehicleController.js";

// // // // // const __filename = fileURLToPath(import.meta.url);
// // // // // const __dirname = path.dirname(__filename);

// // // // // const router = express.Router();

// // // // // // Configure multer for file upload
// // // // // const storage = multer.diskStorage({
// // // // //   destination: (req, file, cb) => {
// // // // //     const uploadPath = path.join(__dirname, "../../uploads/user-vehicles");
// // // // //     cb(null, uploadPath);
// // // // //   },
// // // // //   filename: (req, file, cb) => {
// // // // //     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
// // // // //     const ext = path.extname(file.originalname);
// // // // //     cb(null, file.fieldname + "-" + uniqueSuffix + ext);
// // // // //   },
// // // // // });

// // // // // const fileFilter = (req, file, cb) => {
// // // // //   const allowedTypes = [
// // // // //     "image/jpeg",
// // // // //     "image/jpg",
// // // // //     "image/png",
// // // // //     "application/pdf",
// // // // //   ];
// // // // //   if (allowedTypes.includes(file.mimetype)) {
// // // // //     cb(null, true);
// // // // //   } else {
// // // // //     cb(new Error("Invalid file type. Only JPEG, PNG, and PDF are allowed."));
// // // // //   }
// // // // // };

// // // // // const upload = multer({
// // // // //   storage,
// // // // //   fileFilter,
// // // // //   limits: { fileSize: 5 * 1024 * 1024 },
// // // // // });

// // // // // // ========== PUBLIC ROUTES (NO AUTHENTICATION REQUIRED) ==========
// // // // // // These must be placed BEFORE router.use(protect)

// // // // // // Test route to check if router is working
// // // // // router.get("/test", (req, res) => {
// // // // //   res.json({ success: true, message: "User vehicles route is working" });
// // // // // });

// // // // // // Public route to get approved and active user vehicles (no authentication required)
// // // // // router.get("/public/active", async (req, res) => {
// // // // //   try {
// // // // //     console.log("Fetching public user vehicles...");
// // // // //     const vehicles = await UserVehicle.find({
// // // // //       status: "active",
// // // // //       isListed: true,
// // // // //     }).select(
// // // // //       "-documents -citizenshipFront -citizenshipBack -passportPhoto -__v",
// // // // //     );

// // // // //     console.log(`Found ${vehicles.length} active user vehicles`);

// // // // //     const formattedVehicles = vehicles.map((vehicle) => ({
// // // // //       _id: vehicle._id,
// // // // //       carName: vehicle.carName,
// // // // //       carNumber: vehicle.carNumber,
// // // // //       carType: vehicle.carType,
// // // // //       ratePerDay: vehicle.ratePerDay,
// // // // //       seats: vehicle.seats,
// // // // //       bookingType: vehicle.bookingType,
// // // // //       gearType: vehicle.gearType,
// // // // //       airCondition: vehicle.airCondition,
// // // // //       description: vehicle.description,
// // // // //       features: vehicle.features,
// // // // //       photos: vehicle.vehiclePhotos,
// // // // //       phoneNumber: vehicle.phoneNumber,
// // // // //       driverName: vehicle.driverName,
// // // // //       status: "Available",
// // // // //       source: "user",
// // // // //       owner: vehicle.fullName,
// // // // //       ownerPhone: vehicle.phoneNumber,
// // // // //     }));

// // // // //     res.status(200).json({
// // // // //       success: true,
// // // // //       data: formattedVehicles,
// // // // //     });
// // // // //   } catch (error) {
// // // // //     console.error("Error fetching public user vehicles:", error);
// // // // //     res.status(500).json({
// // // // //       success: false,
// // // // //       message: "Failed to fetch vehicles",
// // // // //     });
// // // // //   }
// // // // // });

// // // // // // ========== PROTECTED ROUTES (AUTHENTICATION REQUIRED) ==========
// // // // // // All routes below require authentication
// // // // // router.use(protect);

// // // // // // User routes
// // // // // router.post(
// // // // //   "/list",
// // // // //   upload.fields([
// // // // //     { name: "vehiclePhotos", maxCount: 5 },
// // // // //     { name: "citizenshipFront", maxCount: 1 },
// // // // //     { name: "citizenshipBack", maxCount: 1 },
// // // // //     { name: "passportPhoto", maxCount: 1 },
// // // // //     { name: "blueBook", maxCount: 1 },
// // // // //     { name: "insurance", maxCount: 1 },
// // // // //     { name: "pollution", maxCount: 1 },
// // // // //   ]),
// // // // //   listVehicle,
// // // // // );

// // // // // router.get("/my-vehicles", getUserVehicles);
// // // // // router.get("/:id", getUserVehicleById);
// // // // // router.put("/:id", updateUserVehicle);
// // // // // router.delete("/:id", deleteUserVehicle);

// // // // // // Admin routes - require admin or staff role
// // // // // router.get("/admin/all", authorize("admin", "staff"), getAllUserVehicles);
// // // // // router.post(
// // // // //   "/admin/:id/approve",
// // // // //   authorize("admin", "staff"),
// // // // //   approveUserVehicle,
// // // // // );
// // // // // router.post(
// // // // //   "/admin/:id/reject",
// // // // //   authorize("admin", "staff"),
// // // // //   rejectUserVehicle,
// // // // // );
// // // // // router.put(
// // // // //   "/admin/:id/activate",
// // // // //   authorize("admin", "staff"),
// // // // //   activateUserVehicle,
// // // // // );
// // // // // router.put(
// // // // //   "/admin/:id/deactivate",
// // // // //   authorize("admin", "staff"),
// // // // //   deactivateUserVehicle,
// // // // // );
// // // // // router.delete(
// // // // //   "/admin/:id/delete",
// // // // //   authorize("admin", "staff"),
// // // // //   deleteUserVehicleAdmin,
// // // // // );

// // // // // export default router;

// // // // import express from "express";
// // // // import multer from "multer";
// // // // import path from "path";
// // // // import { fileURLToPath } from "url";
// // // // import { protect, authorize } from "../middleware/authMiddleware.js";
// // // // import UserVehicle from "../models/UserVehicle.js";
// // // // import {
// // // //   listVehicle,
// // // //   getUserVehicles,
// // // //   getUserVehicleById,
// // // //   updateUserVehicle,
// // // //   deleteUserVehicle,
// // // //   getAllUserVehicles,
// // // //   approveUserVehicle,
// // // //   rejectUserVehicle,
// // // //   activateUserVehicle,
// // // //   deactivateUserVehicle,
// // // //   deleteUserVehicleAdmin,
// // // // } from "../controllers/userVehicleController.js";

// // // // const __filename = fileURLToPath(import.meta.url);
// // // // const __dirname = path.dirname(__filename);

// // // // const router = express.Router();

// // // // // Configure multer for file upload
// // // // const storage = multer.diskStorage({
// // // //   destination: (req, file, cb) => {
// // // //     const uploadPath = path.join(__dirname, "../../uploads/user-vehicles");
// // // //     cb(null, uploadPath);
// // // //   },
// // // //   filename: (req, file, cb) => {
// // // //     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
// // // //     const ext = path.extname(file.originalname);
// // // //     cb(null, file.fieldname + "-" + uniqueSuffix + ext);
// // // //   },
// // // // });

// // // // const fileFilter = (req, file, cb) => {
// // // //   const allowedTypes = [
// // // //     "image/jpeg",
// // // //     "image/jpg",
// // // //     "image/png",
// // // //     "application/pdf",
// // // //   ];
// // // //   if (allowedTypes.includes(file.mimetype)) {
// // // //     cb(null, true);
// // // //   } else {
// // // //     cb(new Error("Invalid file type. Only JPEG, PNG, and PDF are allowed."));
// // // //   }
// // // // };

// // // // const upload = multer({
// // // //   storage,
// // // //   fileFilter,
// // // //   limits: { fileSize: 5 * 1024 * 1024 },
// // // // });

// // // // // ========== PUBLIC ROUTES (NO AUTHENTICATION REQUIRED) ==========
// // // // // These must be placed BEFORE router.use(protect)

// // // // // Test route to check if router is working
// // // // router.get("/test", (req, res) => {
// // // //   res.json({ success: true, message: "User vehicles route is working" });
// // // // });

// // // // // Public route to get approved and active user vehicles (no authentication required)
// // // // router.get("/public/active", async (req, res) => {
// // // //   try {
// // // //     console.log("Fetching public user vehicles...");
// // // //     const vehicles = await UserVehicle.find({
// // // //       status: "active",
// // // //       isListed: true,
// // // //     }).select(
// // // //       "-documents -citizenshipFront -citizenshipBack -passportPhoto -__v",
// // // //     );

// // // //     console.log(`Found ${vehicles.length} active user vehicles`);

// // // //     const formattedVehicles = vehicles.map((vehicle) => ({
// // // //       _id: vehicle._id,
// // // //       carName: vehicle.carName,
// // // //       carNumber: vehicle.carNumber,
// // // //       carType: vehicle.carType,
// // // //       ratePerDay: vehicle.ratePerDay,
// // // //       seats: vehicle.seats,
// // // //       bookingType: vehicle.bookingType,
// // // //       gearType: vehicle.gearType,
// // // //       airCondition: vehicle.airCondition,
// // // //       description: vehicle.description,
// // // //       features: vehicle.features,
// // // //       photos: vehicle.vehiclePhotos,
// // // //       phoneNumber: vehicle.phoneNumber,
// // // //       driverName: vehicle.driverName,
// // // //       status: "Available",
// // // //       source: "user",
// // // //       owner: vehicle.fullName,
// // // //       ownerPhone: vehicle.phoneNumber,
// // // //     }));

// // // //     res.status(200).json({
// // // //       success: true,
// // // //       data: formattedVehicles,
// // // //     });
// // // //   } catch (error) {
// // // //     console.error("Error fetching public user vehicles:", error);
// // // //     res.status(500).json({
// // // //       success: false,
// // // //       message: "Failed to fetch vehicles",
// // // //     });
// // // //   }
// // // // });

// // // // // PUBLIC ROUTE to get single vehicle by ID (for booking - no authentication required)
// // // // router.get("/public/:id", async (req, res) => {
// // // //   try {
// // // //     const { id } = req.params;
// // // //     console.log(`Fetching public vehicle with ID: ${id}`);

// // // //     const vehicle = await UserVehicle.findById(id).lean();

// // // //     if (!vehicle) {
// // // //       console.log(`Vehicle not found: ${id}`);
// // // //       return res.status(404).json({
// // // //         success: false,
// // // //         message: "Vehicle not found",
// // // //       });
// // // //     }

// // // //     // Only return if vehicle is active and listed
// // // //     if (vehicle.status !== "active" || !vehicle.isListed) {
// // // //       console.log(
// // // //         `Vehicle not available for booking. Status: ${vehicle.status}, Listed: ${vehicle.isListed}`,
// // // //       );
// // // //       return res.status(403).json({
// // // //         success: false,
// // // //         message: "This vehicle is not available for booking",
// // // //       });
// // // //     }

// // // //     // Remove sensitive information
// // // //     const publicVehicle = {
// // // //       _id: vehicle._id,
// // // //       carName: vehicle.carName,
// // // //       carNumber: vehicle.carNumber,
// // // //       carType: vehicle.carType,
// // // //       ratePerDay: vehicle.ratePerDay,
// // // //       seats: vehicle.seats,
// // // //       bookingType: vehicle.bookingType,
// // // //       gearType: vehicle.gearType,
// // // //       airCondition: vehicle.airCondition,
// // // //       description: vehicle.description,
// // // //       features: vehicle.features,
// // // //       photos: vehicle.vehiclePhotos,
// // // //       phoneNumber: vehicle.phoneNumber,
// // // //       driverName: vehicle.driverName,
// // // //       status: "Available",
// // // //       source: "user",
// // // //       owner: vehicle.fullName,
// // // //       ownerPhone: vehicle.phoneNumber,
// // // //     };

// // // //     console.log(`✅ Public vehicle fetched: ${vehicle.carName}`);
// // // //     res.status(200).json({
// // // //       success: true,
// // // //       data: publicVehicle,
// // // //     });
// // // //   } catch (error) {
// // // //     console.error("Error fetching public vehicle:", error);
// // // //     res.status(500).json({
// // // //       success: false,
// // // //       message: "Failed to fetch vehicle",
// // // //     });
// // // //   }
// // // // });

// // // // // ========== PROTECTED ROUTES (AUTHENTICATION REQUIRED) ==========
// // // // // All routes below require authentication
// // // // router.use(protect);

// // // // // User routes
// // // // router.post(
// // // //   "/list",
// // // //   upload.fields([
// // // //     { name: "vehiclePhotos", maxCount: 5 },
// // // //     { name: "citizenshipFront", maxCount: 1 },
// // // //     { name: "citizenshipBack", maxCount: 1 },
// // // //     { name: "passportPhoto", maxCount: 1 },
// // // //     { name: "blueBook", maxCount: 1 },
// // // //     { name: "insurance", maxCount: 1 },
// // // //     { name: "pollution", maxCount: 1 },
// // // //   ]),
// // // //   listVehicle,
// // // // );

// // // // router.get("/my-vehicles", getUserVehicles);
// // // // router.get("/:id", getUserVehicleById);
// // // // router.put("/:id", updateUserVehicle);
// // // // router.delete("/:id", deleteUserVehicle);

// // // // // Admin routes - require admin or staff role
// // // // router.get("/admin/all", authorize("admin", "staff"), getAllUserVehicles);
// // // // router.post(
// // // //   "/admin/:id/approve",
// // // //   authorize("admin", "staff"),
// // // //   approveUserVehicle,
// // // // );
// // // // router.post(
// // // //   "/admin/:id/reject",
// // // //   authorize("admin", "staff"),
// // // //   rejectUserVehicle,
// // // // );
// // // // router.put(
// // // //   "/admin/:id/activate",
// // // //   authorize("admin", "staff"),
// // // //   activateUserVehicle,
// // // // );
// // // // router.put(
// // // //   "/admin/:id/deactivate",
// // // //   authorize("admin", "staff"),
// // // //   deactivateUserVehicle,
// // // // );
// // // // router.delete(
// // // //   "/admin/:id/delete",
// // // //   authorize("admin", "staff"),
// // // //   deleteUserVehicleAdmin,
// // // // );

// // // // export default router;

// // // import express from "express";
// // // import multer from "multer";
// // // import path from "path";
// // // import { fileURLToPath } from "url";
// // // import { protect, authorize } from "../middleware/authMiddleware.js";
// // // import UserVehicle from "../models/UserVehicle.js";
// // // import {
// // //   listVehicle,
// // //   getUserVehicles,
// // //   getUserVehicleById,
// // //   updateUserVehicle,
// // //   deleteUserVehicle,
// // //   getAllUserVehicles,
// // //   approveUserVehicle,
// // //   rejectUserVehicle,
// // //   activateUserVehicle,
// // //   deactivateUserVehicle,
// // //   deleteUserVehicleAdmin,
// // //     fixVehicleStatus,
// // //   getUserEarnings, // Add this import
// // // } from "../controllers/userVehicleController.js";

// // // const __filename = fileURLToPath(import.meta.url);
// // // const __dirname = path.dirname(__filename);

// // // const router = express.Router();

// // // // Configure multer for file upload
// // // const storage = multer.diskStorage({
// // //   destination: (req, file, cb) => {
// // //     const uploadPath = path.join(__dirname, "../../uploads/user-vehicles");
// // //     cb(null, uploadPath);
// // //   },
// // //   filename: (req, file, cb) => {
// // //     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
// // //     const ext = path.extname(file.originalname);
// // //     cb(null, file.fieldname + "-" + uniqueSuffix + ext);
// // //   },
// // // });

// // // const fileFilter = (req, file, cb) => {
// // //   const allowedTypes = [
// // //     "image/jpeg",
// // //     "image/jpg",
// // //     "image/png",
// // //     "image/webp",
// // //     "application/pdf",
// // //   ];
// // //   if (allowedTypes.includes(file.mimetype)) {
// // //     cb(null, true);
// // //   } else {
// // //     cb(new Error("Invalid file type. Only JPEG, PNG, and PDF are allowed."));
// // //   }
// // // };

// // // const upload = multer({
// // //   storage,
// // //   fileFilter,
// // //   limits: { fileSize: 5 * 1024 * 1024 },
// // // });

// // // // ========== PUBLIC ROUTES (NO AUTHENTICATION REQUIRED) ==========
// // // // These must be placed BEFORE router.use(protect)

// // // // Test route to check if router is working
// // // router.get("/test", (req, res) => {
// // //   res.json({ success: true, message: "User vehicles route is working" });
// // // });

// // // // Public route to get approved and active user vehicles (no authentication required)
// // // router.get("/public/active", async (req, res) => {
// // //   try {
// // //     console.log("Fetching public user vehicles...");
// // //     const vehicles = await UserVehicle.find({
// // //       status: "active",
// // //       isListed: true,
// // //     }).select(
// // //       "-documents -citizenshipFront -citizenshipBack -passportPhoto -__v",
// // //     );

// // //     console.log(`Found ${vehicles.length} active user vehicles`);

// // //     const formattedVehicles = vehicles.map((vehicle) => ({
// // //       _id: vehicle._id,
// // //       carName: vehicle.carName,
// // //       carNumber: vehicle.carNumber,
// // //       carType: vehicle.carType,
// // //       ratePerDay: vehicle.ratePerDay,
// // //       seats: vehicle.seats,
// // //       bookingType: vehicle.bookingType,
// // //       gearType: vehicle.gearType,
// // //       airCondition: vehicle.airCondition,
// // //       description: vehicle.description,
// // //       features: vehicle.features,
// // //       photos: vehicle.vehiclePhotos,
// // //       phoneNumber: vehicle.phoneNumber,
// // //       driverName: vehicle.driverName,
// // //       status: "Available",
// // //       source: "user",
// // //       owner: vehicle.fullName,
// // //       ownerPhone: vehicle.phoneNumber,
// // //     }));

// // //     res.status(200).json({
// // //       success: true,
// // //       data: formattedVehicles,
// // //     });
// // //   } catch (error) {
// // //     console.error("Error fetching public user vehicles:", error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: "Failed to fetch vehicles",
// // //     });
// // //   }
// // // });

// // // // PUBLIC ROUTE to get single vehicle by ID (for booking - no authentication required)
// // // router.get("/public/:id", async (req, res) => {
// // //   try {
// // //     const { id } = req.params;
// // //     console.log(`Fetching public vehicle with ID: ${id}`);

// // //     const vehicle = await UserVehicle.findById(id).lean();

// // //     if (!vehicle) {
// // //       console.log(`Vehicle not found: ${id}`);
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: "Vehicle not found",
// // //       });
// // //     }

// // //     // Only return if vehicle is active and listed
// // //     if (vehicle.status !== "active" || !vehicle.isListed) {
// // //       console.log(
// // //         `Vehicle not available for booking. Status: ${vehicle.status}, Listed: ${vehicle.isListed}`,
// // //       );
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: "This vehicle is not available for booking",
// // //       });
// // //     }

// // //     // Remove sensitive information
// // //     const publicVehicle = {
// // //       _id: vehicle._id,
// // //       carName: vehicle.carName,
// // //       carNumber: vehicle.carNumber,
// // //       carType: vehicle.carType,
// // //       ratePerDay: vehicle.ratePerDay,
// // //       seats: vehicle.seats,
// // //       bookingType: vehicle.bookingType,
// // //       gearType: vehicle.gearType,
// // //       airCondition: vehicle.airCondition,
// // //       description: vehicle.description,
// // //       features: vehicle.features,
// // //       photos: vehicle.vehiclePhotos,
// // //       phoneNumber: vehicle.phoneNumber,
// // //       driverName: vehicle.driverName,
// // //       status: "Available",
// // //       source: "user",
// // //       owner: vehicle.fullName,
// // //       ownerPhone: vehicle.phoneNumber,
// // //     };

// // //     console.log(`✅ Public vehicle fetched: ${vehicle.carName}`);
// // //     res.status(200).json({
// // //       success: true,
// // //       data: publicVehicle,
// // //     });
// // //   } catch (error) {
// // //     console.error("Error fetching public vehicle:", error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: "Failed to fetch vehicle",
// // //     });
// // //   }
// // // });

// // // // ========== PROTECTED ROUTES (AUTHENTICATION REQUIRED) ==========
// // // // All routes below require authentication
// // // router.use(protect);

// // // // User routes
// // // router.post(
// // //   "/list",
// // //   upload.fields([
// // //     { name: "vehiclePhotos", maxCount: 5 },
// // //     { name: "citizenshipFront", maxCount: 1 },
// // //     { name: "citizenshipBack", maxCount: 1 },
// // //     { name: "passportPhoto", maxCount: 1 },
// // //     { name: "blueBook", maxCount: 1 },
// // //     { name: "insurance", maxCount: 1 },
// // //     { name: "pollution", maxCount: 1 },
// // //   ]),
// // //   listVehicle,
// // // );

// // // router.get("/my-vehicles", getUserVehicles);
// // // router.get("/my-earnings", getUserEarnings); // ADD THIS LINE - Earnings endpoint
// // // router.get("/:id", getUserVehicleById);
// // // router.put("/:id", updateUserVehicle);
// // // router.delete("/:id", deleteUserVehicle);

// // // // Admin routes - require admin or staff role
// // // router.get("/admin/all", authorize("admin", "staff"), getAllUserVehicles);
// // // router.post(
// // //   "/admin/:id/approve",
// // //   authorize("admin", "staff"),
// // //   approveUserVehicle,
// // // );
// // // router.post(
// // //   "/admin/:id/reject",
// // //   authorize("admin", "staff"),
// // //   rejectUserVehicle,
// // // );
// // // router.put(
// // //   "/admin/:id/activate",
// // //   authorize("admin", "staff"),
// // //   activateUserVehicle,
// // // );
// // // router.put(
// // //   "/admin/:id/deactivate",
// // //   authorize("admin", "staff"),
// // //   deactivateUserVehicle,
// // // );
// // // router.delete(
// // //   "/admin/:id/delete",
// // //   authorize("admin", "staff"),
// // //   deleteUserVehicleAdmin,
// // // );

// // // // Add this with other admin routes
// // // router.put("/admin/:id/fix-status", authorize("admin", "staff"), fixVehicleStatus);

// // // export default router;

// // import express from "express";
// // import multer from "multer";
// // import path from "path";
// // import { fileURLToPath } from "url";
// // import { protect, authorize } from "../middleware/authMiddleware.js";
// // import UserVehicle from "../models/UserVehicle.js";
// // import {
// //   listVehicle,
// //   getUserVehicles,
// //   getUserVehicleById,
// //   updateUserVehicle,
// //   deleteUserVehicle,
// //   getAllUserVehicles,
// //   approveUserVehicle,
// //   rejectUserVehicle,
// //   activateUserVehicle,
// //   deactivateUserVehicle,
// //   deleteUserVehicleAdmin,
// //   getUserEarnings,
// //   fixVehicleStatus,
// // } from "../controllers/userVehicleController.js";

// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);

// // const router = express.Router();

// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     cb(null, path.join(__dirname, "../../uploads/user-vehicles"));
// //   },
// //   filename: (req, file, cb) => {
// //     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
// //     cb(
// //       null,
// //       file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
// //     );
// //   },
// // });

// // const fileFilter = (req, file, cb) => {
// //   const allowedTypes = [
// //     "image/jpeg",
// //     "image/jpg",
// //     "image/png",
// //     "image/webp",
// //     "application/pdf",
// //   ];
// //   allowedTypes.includes(file.mimetype)
// //     ? cb(null, true)
// //     : cb(
// //         new Error(
// //           "Invalid file type. Only JPEG, PNG, WEBP, and PDF are allowed.",
// //         ),
// //       );
// // };

// // const upload = multer({
// //   storage,
// //   fileFilter,
// //   limits: { fileSize: 5 * 1024 * 1024 },
// // });

// // // Public routes
// // router.get("/test", (req, res) => {
// //   res.json({ success: true, message: "User vehicles route is working" });
// // });

// // router.get("/public/active", async (req, res) => {
// //   try {
// //     const vehicles = await UserVehicle.find({
// //       status: "active",
// //       isListed: true,
// //     }).select(
// //       "-documents -citizenshipFront -citizenshipBack -passportPhoto -__v",
// //     );
// //     const formattedVehicles = vehicles.map((vehicle) => ({
// //       _id: vehicle._id,
// //       carName: vehicle.carName,
// //       carNumber: vehicle.carNumber,
// //       carType: vehicle.carType,
// //       ratePerDay: vehicle.ratePerDay,
// //       seats: vehicle.seats,
// //       bookingType: vehicle.bookingType,
// //       gearType: vehicle.gearType,
// //       airCondition: vehicle.airCondition,
// //       description: vehicle.description,
// //       features: vehicle.features,
// //       photos: vehicle.vehiclePhotos,
// //       phoneNumber: vehicle.phoneNumber,
// //       driverName: vehicle.driverName,
// //       status: "Available",
// //       source: "user",
// //       owner: vehicle.fullName,
// //       ownerPhone: vehicle.phoneNumber,
// //     }));
// //     res.status(200).json({ success: true, data: formattedVehicles });
// //   } catch (error) {
// //     res
// //       .status(500)
// //       .json({ success: false, message: "Failed to fetch vehicles" });
// //   }
// // });

// // router.get("/public/:id", async (req, res) => {
// //   try {
// //     const vehicle = await UserVehicle.findById(req.params.id).lean();
// //     if (!vehicle)
// //       return res
// //         .status(404)
// //         .json({ success: false, message: "Vehicle not found" });
// //     if (vehicle.status !== "active" || !vehicle.isListed)
// //       return res
// //         .status(403)
// //         .json({
// //           success: false,
// //           message: "This vehicle is not available for booking",
// //         });
// //     const publicVehicle = {
// //       _id: vehicle._id,
// //       carName: vehicle.carName,
// //       carNumber: vehicle.carNumber,
// //       carType: vehicle.carType,
// //       ratePerDay: vehicle.ratePerDay,
// //       seats: vehicle.seats,
// //       bookingType: vehicle.bookingType,
// //       gearType: vehicle.gearType,
// //       airCondition: vehicle.airCondition,
// //       description: vehicle.description,
// //       features: vehicle.features,
// //       photos: vehicle.vehiclePhotos,
// //       phoneNumber: vehicle.phoneNumber,
// //       driverName: vehicle.driverName,
// //       status: "Available",
// //       source: "user",
// //       owner: vehicle.fullName,
// //       ownerPhone: vehicle.phoneNumber,
// //     };
// //     res.status(200).json({ success: true, data: publicVehicle });
// //   } catch (error) {
// //     res
// //       .status(500)
// //       .json({ success: false, message: "Failed to fetch vehicle" });
// //   }
// // });

// // // Protected routes
// // router.use(protect);

// // router.post(
// //   "/list",
// //   upload.fields([
// //     { name: "vehiclePhotos", maxCount: 5 },
// //     { name: "citizenshipFront", maxCount: 1 },
// //     { name: "citizenshipBack", maxCount: 1 },
// //     { name: "passportPhoto", maxCount: 1 },
// //     { name: "blueBook", maxCount: 1 },
// //     { name: "insurance", maxCount: 1 },
// //     { name: "pollution", maxCount: 1 },
// //   ]),
// //   listVehicle,
// // );
// // router.get("/my-vehicles", getUserVehicles);
// // router.get("/my-earnings", getUserEarnings);
// // router.get("/:id", getUserVehicleById);
// // router.put("/:id", updateUserVehicle);
// // router.delete("/:id", deleteUserVehicle);

// // // Admin routes
// // router.get("/admin/all", authorize("admin", "staff"), getAllUserVehicles);
// // router.post(
// //   "/admin/:id/approve",
// //   authorize("admin", "staff"),
// //   approveUserVehicle,
// // );
// // router.post(
// //   "/admin/:id/reject",
// //   authorize("admin", "staff"),
// //   rejectUserVehicle,
// // );
// // router.put(
// //   "/admin/:id/activate",
// //   authorize("admin", "staff"),
// //   activateUserVehicle,
// // );
// // router.put(
// //   "/admin/:id/deactivate",
// //   authorize("admin", "staff"),
// //   deactivateUserVehicle,
// // );
// // router.delete(
// //   "/admin/:id/delete",
// //   authorize("admin", "staff"),
// //   deleteUserVehicleAdmin,
// // );
// // router.put(
// //   "/admin/:id/fix-status",
// //   authorize("admin", "staff"),
// //   fixVehicleStatus,
// // );

// // export default router;

// import express from "express";
// import multer from "multer";
// import path from "path";
// import { fileURLToPath } from "url";
// import { protect, authorize } from "../middleware/authMiddleware.js";
// import UserVehicle from "../models/UserVehicle.js";
// import {
//   listVehicle,
//   getUserVehicles,
//   getUserVehicleById,
//   updateUserVehicle,
//   deleteUserVehicle,
//   getAllUserVehicles,
//   approveUserVehicle,
//   rejectUserVehicle,
//   activateUserVehicle,
//   deactivateUserVehicle,
//   deleteUserVehicleAdmin,
//   getUserEarnings,
//   fixVehicleStatus,
// } from "../controllers/userVehicleController.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, "../../uploads/user-vehicles"));
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(
//       null,
//       file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
//     );
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = [
//     "image/jpeg",
//     "image/jpg",
//     "image/png",
//     "image/webp",
//     "application/pdf",
//   ];
//   allowedTypes.includes(file.mimetype)
//     ? cb(null, true)
//     : cb(
//         new Error(
//           "Invalid file type. Only JPEG, PNG, WEBP, and PDF are allowed.",
//         ),
//       );
// };

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 },
// });

// // ========== PUBLIC ROUTES ==========
// router.get("/test", (req, res) => {
//   res.json({ success: true, message: "User vehicles route is working" });
// });

// // Only show vehicles with status "active" (not booked)
// router.get("/public/active", async (req, res) => {
//   try {
//     const vehicles = await UserVehicle.find({
//       status: "active",
//       isListed: true,
//     }).select(
//       "-documents -citizenshipFront -citizenshipBack -passportPhoto -__v",
//     );

//     const formattedVehicles = vehicles.map((vehicle) => ({
//       _id: vehicle._id,
//       carName: vehicle.carName,
//       carNumber: vehicle.carNumber,
//       carType: vehicle.carType,
//       ratePerDay: vehicle.ratePerDay,
//       seats: vehicle.seats,
//       bookingType: vehicle.bookingType,
//       gearType: vehicle.gearType,
//       airCondition: vehicle.airCondition,
//       description: vehicle.description,
//       features: vehicle.features,
//       photos: vehicle.vehiclePhotos,
//       phoneNumber: vehicle.phoneNumber,
//       driverName: vehicle.driverName,
//       status: "Available",
//       source: "user",
//       owner: vehicle.fullName,
//       ownerPhone: vehicle.phoneNumber,
//     }));

//     res.status(200).json({ success: true, data: formattedVehicles });
//   } catch (error) {
//     console.error("Error fetching public user vehicles:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to fetch vehicles" });
//   }
// });

// router.get("/public/:id", async (req, res) => {
//   try {
//     const vehicle = await UserVehicle.findById(req.params.id).lean();
//     if (!vehicle) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Vehicle not found" });
//     }
//     if (vehicle.status !== "active" || !vehicle.isListed) {
//       return res.status(403).json({
//         success: false,
//         message: "This vehicle is not available for booking",
//       });
//     }
//     const publicVehicle = {
//       _id: vehicle._id,
//       carName: vehicle.carName,
//       carNumber: vehicle.carNumber,
//       carType: vehicle.carType,
//       ratePerDay: vehicle.ratePerDay,
//       seats: vehicle.seats,
//       bookingType: vehicle.bookingType,
//       gearType: vehicle.gearType,
//       airCondition: vehicle.airCondition,
//       description: vehicle.description,
//       features: vehicle.features,
//       photos: vehicle.vehiclePhotos,
//       phoneNumber: vehicle.phoneNumber,
//       driverName: vehicle.driverName,
//       status: "Available",
//       source: "user",
//       owner: vehicle.fullName,
//       ownerPhone: vehicle.phoneNumber,
//     };
//     res.status(200).json({ success: true, data: publicVehicle });
//   } catch (error) {
//     console.error("Error fetching public vehicle:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to fetch vehicle" });
//   }
// });

// // ========== PROTECTED ROUTES ==========
// router.use(protect);

// router.post(
//   "/list",
//   upload.fields([
//     { name: "vehiclePhotos", maxCount: 5 },
//     { name: "citizenshipFront", maxCount: 1 },
//     { name: "citizenshipBack", maxCount: 1 },
//     { name: "passportPhoto", maxCount: 1 },
//     { name: "blueBook", maxCount: 1 },
//     { name: "insurance", maxCount: 1 },
//     { name: "pollution", maxCount: 1 },
//   ]),
//   listVehicle,
// );

// router.get("/my-vehicles", getUserVehicles);
// router.get("/my-earnings", getUserEarnings);
// router.get("/:id", getUserVehicleById);
// router.put("/:id", updateUserVehicle);
// router.delete("/:id", deleteUserVehicle);

// // ========== ADMIN ROUTES ==========
// router.get("/admin/all", authorize("admin", "staff"), getAllUserVehicles);
// router.post(
//   "/admin/:id/approve",
//   authorize("admin", "staff"),
//   approveUserVehicle,
// );
// router.post(
//   "/admin/:id/reject",
//   authorize("admin", "staff"),
//   rejectUserVehicle,
// );
// router.put(
//   "/admin/:id/activate",
//   authorize("admin", "staff"),
//   activateUserVehicle,
// );
// router.put(
//   "/admin/:id/deactivate",
//   authorize("admin", "staff"),
//   deactivateUserVehicle,
// );
// router.delete(
//   "/admin/:id/delete",
//   authorize("admin", "staff"),
//   deleteUserVehicleAdmin,
// );
// router.put(
//   "/admin/:id/fix-status",
//   authorize("admin", "staff"),
//   fixVehicleStatus,
// );

// export default router;

import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { protect, authorize } from "../middleware/authMiddleware.js";
import UserVehicle from "../models/UserVehicle.js";
import {
  listVehicle,
  getUserVehicles,
  getUserVehicleById,
  updateUserVehicle,
  deleteUserVehicle,
  getAllUserVehicles,
  approveUserVehicle,
  rejectUserVehicle,
  activateUserVehicle,
  deactivateUserVehicle,
  deleteUserVehicleAdmin,
  getUserEarnings,
  fixVehicleStatus,
} from "../controllers/userVehicleController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads/user-vehicles"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
    );
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "application/pdf",
  ];
  allowedTypes.includes(file.mimetype)
    ? cb(null, true)
    : cb(
        new Error(
          "Invalid file type. Only JPEG, PNG, WEBP, and PDF are allowed.",
        ),
      );
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// ========== PUBLIC ROUTES ==========
router.get("/test", (req, res) => {
  res.json({ success: true, message: "User vehicles route is working" });
});

// FIXED: Only show vehicles with status "active" and NOT owned by the current user
router.get("/public/active", async (req, res) => {
  try {
    // Get current user ID from token (if provided in Authorization header)
    let currentUserId = null;
    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
      try {
        // Decode JWT token to get user ID
        const jwt = await import("jsonwebtoken");
        const decoded = jwt.default.decode(token);
        currentUserId = decoded?.id || decoded?.userId;
        console.log("🔑 Current user ID from token:", currentUserId);
      } catch (decodeError) {
        console.log("No valid token or unable to decode:", decodeError.message);
      }
    }

    // Fetch only active and listed vehicles
    const vehicles = await UserVehicle.find({
      status: "active",
      isListed: true,
    })
      .select(
        "-documents -citizenshipFront -citizenshipBack -passportPhoto -__v",
      )
      .lean();

    // Filter out vehicles owned by the current user
    let filteredVehicles = vehicles;
    if (currentUserId) {
      const originalCount = vehicles.length;
      filteredVehicles = vehicles.filter((vehicle) => {
        const vehicleOwnerId = vehicle.user?.toString();
        const isNotOwnVehicle = vehicleOwnerId !== currentUserId;
        if (!isNotOwnVehicle) {
          console.log(
            `🚫 Filtering out own vehicle: ${vehicle.carName} (Owner: ${vehicleOwnerId})`,
          );
        }
        return isNotOwnVehicle;
      });
      console.log(
        `✅ Showing ${filteredVehicles.length} out of ${originalCount} vehicles (excluded ${originalCount - filteredVehicles.length} own vehicles)`,
      );
    }

    const formattedVehicles = filteredVehicles.map((vehicle) => ({
      _id: vehicle._id,
      carName: vehicle.carName,
      carNumber: vehicle.carNumber,
      carType: vehicle.carType,
      ratePerDay: vehicle.ratePerDay,
      seats: vehicle.seats,
      bookingType: vehicle.bookingType,
      gearType: vehicle.gearType,
      airCondition: vehicle.airCondition,
      description: vehicle.description,
      features: vehicle.features,
      photos: vehicle.vehiclePhotos,
      phoneNumber: vehicle.phoneNumber,
      driverName: vehicle.driverName,
      status: "Available",
      source: "user",
      owner: vehicle.fullName,
      ownerPhone: vehicle.phoneNumber,
      userId: vehicle.user, // Include user ID for debugging (optional)
    }));

    res.status(200).json({ success: true, data: formattedVehicles });
  } catch (error) {
    console.error("Error fetching public user vehicles:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch vehicles" });
  }
});

// FIXED: Get single public vehicle and check ownership
router.get("/public/:id", async (req, res) => {
  try {
    // Get current user ID from token (if provided)
    let currentUserId = null;
    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
      try {
        const jwt = await import("jsonwebtoken");
        const decoded = jwt.default.decode(token);
        currentUserId = decoded?.id || decoded?.userId;
      } catch (decodeError) {
        console.log("No valid token or unable to decode");
      }
    }

    const vehicle = await UserVehicle.findById(req.params.id).lean();
    if (!vehicle) {
      return res
        .status(404)
        .json({ success: false, message: "Vehicle not found" });
    }

    // Check if vehicle is available
    if (vehicle.status !== "active" || !vehicle.isListed) {
      return res.status(403).json({
        success: false,
        message: "This vehicle is not available for booking",
      });
    }

    // Check if the vehicle belongs to the current user
    if (currentUserId && vehicle.user?.toString() === currentUserId) {
      return res.status(403).json({
        success: false,
        message: "You cannot book your own vehicle",
      });
    }

    const publicVehicle = {
      _id: vehicle._id,
      carName: vehicle.carName,
      carNumber: vehicle.carNumber,
      carType: vehicle.carType,
      ratePerDay: vehicle.ratePerDay,
      seats: vehicle.seats,
      bookingType: vehicle.bookingType,
      gearType: vehicle.gearType,
      airCondition: vehicle.airCondition,
      description: vehicle.description,
      features: vehicle.features,
      photos: vehicle.vehiclePhotos,
      phoneNumber: vehicle.phoneNumber,
      driverName: vehicle.driverName,
      status: "Available",
      source: "user",
      owner: vehicle.fullName,
      ownerPhone: vehicle.phoneNumber,
    };
    res.status(200).json({ success: true, data: publicVehicle });
  } catch (error) {
    console.error("Error fetching public vehicle:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch vehicle" });
  }
});

// ========== PROTECTED ROUTES ==========
router.use(protect);

router.post(
  "/list",
  upload.fields([
    { name: "vehiclePhotos", maxCount: 5 },
    { name: "citizenshipFront", maxCount: 1 },
    { name: "citizenshipBack", maxCount: 1 },
    { name: "passportPhoto", maxCount: 1 },
    { name: "blueBook", maxCount: 1 },
    { name: "insurance", maxCount: 1 },
    { name: "pollution", maxCount: 1 },
  ]),
  listVehicle,
);

router.get("/my-vehicles", getUserVehicles);
router.get("/my-earnings", getUserEarnings);
router.get("/:id", getUserVehicleById);
router.put("/:id", updateUserVehicle);
router.delete("/:id", deleteUserVehicle);

// ========== ADMIN ROUTES ==========
router.get("/admin/all", authorize("admin", "staff"), getAllUserVehicles);
router.post(
  "/admin/:id/approve",
  authorize("admin", "staff"),
  approveUserVehicle,
);
router.post(
  "/admin/:id/reject",
  authorize("admin", "staff"),
  rejectUserVehicle,
);
router.put(
  "/admin/:id/activate",
  authorize("admin", "staff"),
  activateUserVehicle,
);
router.put(
  "/admin/:id/deactivate",
  authorize("admin", "staff"),
  deactivateUserVehicle,
);
router.delete(
  "/admin/:id/delete",
  authorize("admin", "staff"),
  deleteUserVehicleAdmin,
);
router.put(
  "/admin/:id/fix-status",
  authorize("admin", "staff"),
  fixVehicleStatus,
);

export default router;
