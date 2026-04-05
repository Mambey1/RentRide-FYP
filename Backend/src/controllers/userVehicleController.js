// // // import UserVehicle from "../models/UserVehicle.js";
// // // import path from "path";
// // // import fs from "fs";
// // // import { fileURLToPath } from "url";

// // // const __filename = fileURLToPath(import.meta.url);
// // // const __dirname = path.dirname(__filename);

// // // // List a new vehicle (User)
// // // export const listVehicle = async (req, res) => {
// // //   try {
// // //     console.log("=== LIST VEHICLE REQUEST RECEIVED ===");
// // //     console.log("User ID:", req.user.id);
// // //     console.log("Request body:", req.body);
// // //     console.log(
// // //       "Files received:",
// // //       req.files ? Object.keys(req.files) : "No files",
// // //     );

// // //     const userId = req.user.id;
// // //     const {
// // //       carName,
// // //       carNumber,
// // //       carType,
// // //       ratePerDay,
// // //       seats,
// // //       bookingType,
// // //       gearType,
// // //       airCondition,
// // //       description,
// // //       features,
// // //       fullName,
// // //       citizenshipNumber,
// // //       phoneNumber,
// // //       address,
// // //       city,
// // //       district,
// // //     } = req.body;

// // //     // Validate required fields
// // //     if (
// // //       !carName ||
// // //       !carNumber ||
// // //       !ratePerDay ||
// // //       !fullName ||
// // //       !citizenshipNumber ||
// // //       !phoneNumber ||
// // //       !address ||
// // //       !city
// // //     ) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: "Please fill in all required fields",
// // //       });
// // //     }

// // //     // Check if vehicle already exists
// // //     const existingVehicle = await UserVehicle.findOne({ carNumber });
// // //     if (existingVehicle) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: "Vehicle with this number already exists",
// // //       });
// // //     }

// // //     // Process features
// // //     let featuresArray = [];
// // //     if (features) {
// // //       if (Array.isArray(features)) {
// // //         featuresArray = features;
// // //       } else if (typeof features === "string") {
// // //         featuresArray = features
// // //           .split(",")
// // //           .map((f) => f.trim())
// // //           .filter((f) => f);
// // //       }
// // //     }

// // //     // Process vehicle photos
// // //     const vehiclePhotos = [];
// // //     if (req.files && req.files.vehiclePhotos) {
// // //       const photoLabels = [
// // //         "Front View",
// // //         "Inside View",
// // //         "Rear View",
// // //         "Side View",
// // //         "Extra View",
// // //       ];
// // //       req.files.vehiclePhotos.forEach((file, index) => {
// // //         vehiclePhotos.push({
// // //           filename: file.filename,
// // //           originalName: file.originalname,
// // //           path: file.path,
// // //           url: `/uploads/user-vehicles/${file.filename}`,
// // //           label: photoLabels[index] || `Photo ${index + 1}`,
// // //           uploadedAt: new Date(),
// // //         });
// // //       });
// // //     }

// // //     // Process citizenship documents
// // //     let citizenshipFront = null;
// // //     let citizenshipBack = null;

// // //     if (req.files && req.files.citizenshipFront) {
// // //       const file = req.files.citizenshipFront[0];
// // //       citizenshipFront = {
// // //         filename: file.filename,
// // //         originalName: file.originalname,
// // //         path: file.path,
// // //         url: `/uploads/user-vehicles/${file.filename}`,
// // //         uploadedAt: new Date(),
// // //       };
// // //     }

// // //     if (req.files && req.files.citizenshipBack) {
// // //       const file = req.files.citizenshipBack[0];
// // //       citizenshipBack = {
// // //         filename: file.filename,
// // //         originalName: file.originalname,
// // //         path: file.path,
// // //         url: `/uploads/user-vehicles/${file.filename}`,
// // //         uploadedAt: new Date(),
// // //       };
// // //     }

// // //     // Process passport photo
// // //     let passportPhoto = null;
// // //     if (req.files && req.files.passportPhoto) {
// // //       const file = req.files.passportPhoto[0];
// // //       passportPhoto = {
// // //         filename: file.filename,
// // //         originalName: file.originalname,
// // //         path: file.path,
// // //         url: `/uploads/user-vehicles/${file.filename}`,
// // //         uploadedAt: new Date(),
// // //       };
// // //     }

// // //     // Process vehicle documents
// // //     const documents = [];
// // //     const docMapping = {
// // //       blueBook: { type: "bluebook", label: "Blue Book (Registration)" },
// // //       insurance: { type: "insurance", label: "Insurance Certificate" },
// // //       pollution: { type: "pollution", label: "Pollution Certificate" },
// // //     };

// // //     if (req.files) {
// // //       Object.keys(docMapping).forEach((docKey) => {
// // //         if (req.files[docKey] && req.files[docKey][0]) {
// // //           const file = req.files[docKey][0];
// // //           documents.push({
// // //             type: docMapping[docKey].type,
// // //             label: docMapping[docKey].label,
// // //             filename: file.filename,
// // //             originalName: file.originalname,
// // //             path: file.path,
// // //             url: `/uploads/user-vehicles/${file.filename}`,
// // //             uploadedAt: new Date(),
// // //           });
// // //         }
// // //       });
// // //     }

// // //     // Create user vehicle entry
// // //     const userVehicle = new UserVehicle({
// // //       user: userId,
// // //       carName,
// // //       carNumber,
// // //       carType,
// // //       ratePerDay: Number(ratePerDay),
// // //       seats: Number(seats),
// // //       bookingType: bookingType || "Both",
// // //       gearType: gearType || "Automatic",
// // //       airCondition: airCondition || "Yes",
// // //       description: description || "",
// // //       features: featuresArray,
// // //       vehiclePhotos,
// // //       citizenshipFront,
// // //       citizenshipBack,
// // //       passportPhoto,
// // //       fullName,
// // //       citizenshipNumber,
// // //       phoneNumber,
// // //       address,
// // //       city,
// // //       district: district || "",
// // //       documents,
// // //       status: "pending",
// // //       isListed: false,
// // //     });

// // //     await userVehicle.save();

// // //     console.log("✅ Vehicle listed successfully:", userVehicle._id);

// // //     res.status(201).json({
// // //       success: true,
// // //       message:
// // //         "Vehicle listing submitted successfully. Awaiting admin approval.",
// // //       data: {
// // //         vehicleId: userVehicle._id,
// // //         status: userVehicle.status,
// // //       },
// // //     });
// // //   } catch (error) {
// // //     console.error("List vehicle error:", error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: "Failed to list vehicle",
// // //       error: process.env.NODE_ENV === "development" ? error.message : undefined,
// // //     });
// // //   }
// // // };

// // // // Get user's vehicles
// // // export const getUserVehicles = async (req, res) => {
// // //   try {
// // //     const userId = req.user.id;
// // //     const { status, page = 1, limit = 10 } = req.query;

// // //     const query = { user: userId };
// // //     if (status) {
// // //       query.status = status;
// // //     }

// // //     const skip = (page - 1) * limit;

// // //     const vehicles = await UserVehicle.find(query)
// // //       .sort({ createdAt: -1 })
// // //       .skip(skip)
// // //       .limit(parseInt(limit))
// // //       .lean();

// // //     const total = await UserVehicle.countDocuments(query);

// // //     res.status(200).json({
// // //       success: true,
// // //       data: {
// // //         vehicles,
// // //         pagination: {
// // //           page: parseInt(page),
// // //           limit: parseInt(limit),
// // //           total,
// // //           pages: Math.ceil(total / limit),
// // //         },
// // //       },
// // //     });
// // //   } catch (error) {
// // //     console.error("Get user vehicles error:", error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: "Failed to fetch vehicles",
// // //     });
// // //   }
// // // };

// // // // Get single user vehicle by ID
// // // // export const getUserVehicleById = async (req, res) => {
// // // //   try {
// // // //     const { id } = req.params;
// // // //     const userId = req.user.id;

// // // //     const vehicle = await UserVehicle.findOne({ _id: id, user: userId }).lean();

// // // //     if (!vehicle) {
// // // //       return res.status(404).json({
// // // //         success: false,
// // // //         message: "Vehicle not found",
// // // //       });
// // // //     }

// // // //     res.status(200).json({
// // // //       success: true,
// // // //       data: vehicle,
// // // //     });
// // // //   } catch (error) {
// // // //     console.error("Get user vehicle error:", error);
// // // //     res.status(500).json({
// // // //       success: false,
// // // //       message: "Failed to fetch vehicle",
// // // //     });
// // // //   }
// // // // };

// // // // Get single user vehicle by ID
// // // export const getUserVehicleById = async (req, res) => {
// // //   try {
// // //     const { id } = req.params;
// // //     const userId = req.user.id;
// // //     const isAdmin = req.user.role === "admin";

// // //     console.log(`Fetching user vehicle with ID: ${id} for user: ${userId}`);

// // //     // Build query - allow admin to see any vehicle, users only their own
// // //     const query = { _id: id };
// // //     if (!isAdmin) {
// // //       query.user = userId;
// // //     }

// // //     const vehicle = await UserVehicle.findOne(query).lean();

// // //     if (!vehicle) {
// // //       console.log(`Vehicle not found: ${id}`);
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: "Vehicle not found",
// // //       });
// // //     }

// // //     // If vehicle is active and listed, anyone can view it for booking
// // //     if (vehicle.status === "active" && vehicle.isListed) {
// // //       // Remove sensitive information for non-owners
// // //       if (!isAdmin && vehicle.user.toString() !== userId) {
// // //         delete vehicle.documents;
// // //         delete vehicle.citizenshipFront;
// // //         delete vehicle.citizenshipBack;
// // //         delete vehicle.passportPhoto;
// // //       }
// // //     }

// // //     console.log(`✅ Vehicle found: ${vehicle.carName}`);
// // //     res.status(200).json({
// // //       success: true,
// // //       data: vehicle,
// // //     });
// // //   } catch (error) {
// // //     console.error("Get user vehicle error:", error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: "Failed to fetch vehicle",
// // //     });
// // //   }
// // // };

// // // // Update user vehicle
// // // export const updateUserVehicle = async (req, res) => {
// // //   try {
// // //     const { id } = req.params;
// // //     const userId = req.user.id;
// // //     const updates = req.body;

// // //     const vehicle = await UserVehicle.findOne({ _id: id, user: userId });
// // //     if (!vehicle) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: "Vehicle not found",
// // //       });
// // //     }

// // //     // Only allow updates if status is pending or rejected
// // //     if (!["pending", "rejected"].includes(vehicle.status)) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: "Vehicle cannot be updated in its current status",
// // //       });
// // //     }

// // //     // Update allowed fields
// // //     const allowedUpdates = [
// // //       "carName",
// // //       "carNumber",
// // //       "carType",
// // //       "ratePerDay",
// // //       "seats",
// // //       "bookingType",
// // //       "gearType",
// // //       "airCondition",
// // //       "description",
// // //       "features",
// // //       "fullName",
// // //       "citizenshipNumber",
// // //       "phoneNumber",
// // //       "address",
// // //       "city",
// // //       "district",
// // //     ];

// // //     allowedUpdates.forEach((field) => {
// // //       if (updates[field] !== undefined) {
// // //         vehicle[field] = updates[field];
// // //       }
// // //     });

// // //     // Update features if provided
// // //     if (updates.features) {
// // //       if (Array.isArray(updates.features)) {
// // //         vehicle.features = updates.features;
// // //       } else if (typeof updates.features === "string") {
// // //         vehicle.features = updates.features
// // //           .split(",")
// // //           .map((f) => f.trim())
// // //           .filter((f) => f);
// // //       }
// // //     }

// // //     await vehicle.save();

// // //     res.status(200).json({
// // //       success: true,
// // //       message: "Vehicle updated successfully",
// // //       data: vehicle,
// // //     });
// // //   } catch (error) {
// // //     console.error("Update user vehicle error:", error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: "Failed to update vehicle",
// // //     });
// // //   }
// // // };

// // // // Delete user vehicle
// // // export const deleteUserVehicle = async (req, res) => {
// // //   try {
// // //     const { id } = req.params;
// // //     const userId = req.user.id;

// // //     const vehicle = await UserVehicle.findOne({ _id: id, user: userId });
// // //     if (!vehicle) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: "Vehicle not found",
// // //       });
// // //     }

// // //     // Only allow deletion if status is pending or rejected
// // //     if (!["pending", "rejected"].includes(vehicle.status)) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: "Vehicle cannot be deleted in its current status",
// // //       });
// // //     }

// // //     // Delete associated files
// // //     const allFiles = [...vehicle.vehiclePhotos];

// // //     if (vehicle.citizenshipFront) allFiles.push(vehicle.citizenshipFront);
// // //     if (vehicle.citizenshipBack) allFiles.push(vehicle.citizenshipBack);
// // //     if (vehicle.passportPhoto) allFiles.push(vehicle.passportPhoto);
// // //     if (vehicle.documents) allFiles.push(...vehicle.documents);

// // //     allFiles.forEach((file) => {
// // //       if (file && file.filename) {
// // //         const filePath = path.join(
// // //           __dirname,
// // //           "../../uploads/user-vehicles",
// // //           file.filename,
// // //         );
// // //         if (fs.existsSync(filePath)) {
// // //           try {
// // //             fs.unlinkSync(filePath);
// // //           } catch (err) {
// // //             console.error("Error deleting file:", err);
// // //           }
// // //         }
// // //       }
// // //     });

// // //     await vehicle.deleteOne();

// // //     res.status(200).json({
// // //       success: true,
// // //       message: "Vehicle deleted successfully",
// // //     });
// // //   } catch (error) {
// // //     console.error("Delete user vehicle error:", error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: "Failed to delete vehicle",
// // //     });
// // //   }
// // // };

// // // // Get all user vehicles (admin)
// // // export const getAllUserVehicles = async (req, res) => {
// // //   try {
// // //     const { status, page = 1, limit = 20 } = req.query;

// // //     const query = {};
// // //     if (status) {
// // //       query.status = status;
// // //     }

// // //     const skip = (page - 1) * limit;

// // //     const vehicles = await UserVehicle.find(query)
// // //       .populate("user", "name email phone")
// // //       .sort({ createdAt: -1 })
// // //       .skip(skip)
// // //       .limit(parseInt(limit))
// // //       .lean();

// // //     const total = await UserVehicle.countDocuments(query);

// // //     res.status(200).json({
// // //       success: true,
// // //       data: {
// // //         vehicles,
// // //         pagination: {
// // //           page: parseInt(page),
// // //           limit: parseInt(limit),
// // //           total,
// // //           pages: Math.ceil(total / limit),
// // //         },
// // //       },
// // //     });
// // //   } catch (error) {
// // //     console.error("Get all user vehicles error:", error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: "Failed to fetch vehicles",
// // //     });
// // //   }
// // // };

// // // // Approve user vehicle (admin)
// // // export const approveUserVehicle = async (req, res) => {
// // //   try {
// // //     const { id } = req.params;
// // //     const adminId = req.user.id;

// // //     const vehicle = await UserVehicle.findById(id).populate(
// // //       "user",
// // //       "name email",
// // //     );

// // //     if (!vehicle) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: "Vehicle not found",
// // //       });
// // //     }

// // //     if (vehicle.status !== "pending") {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: `Vehicle cannot be approved in ${vehicle.status} status`,
// // //       });
// // //     }

// // //     vehicle.status = "approved";
// // //     vehicle.isListed = true;
// // //     vehicle.listedAt = new Date();
// // //     vehicle.approvedBy = adminId;
// // //     vehicle.approvedAt = new Date();

// // //     await vehicle.save();

// // //     // Send approval email to user
// // //     try {
// // //       const { sendVehicleApprovalEmail } =
// // //         await import("../utils/emailService.js");
// // //       await sendVehicleApprovalEmail(
// // //         vehicle.user.email,
// // //         vehicle.user.name,
// // //         vehicle,
// // //       );
// // //     } catch (emailError) {
// // //       console.error("Error sending approval email:", emailError);
// // //     }

// // //     res.status(200).json({
// // //       success: true,
// // //       message: "Vehicle approved successfully",
// // //       data: vehicle,
// // //     });
// // //   } catch (error) {
// // //     console.error("Approve user vehicle error:", error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: "Failed to approve vehicle",
// // //     });
// // //   }
// // // };

// // // // Reject user vehicle (admin)
// // // export const rejectUserVehicle = async (req, res) => {
// // //   try {
// // //     const { id } = req.params;
// // //     const { reason } = req.body;
// // //     const adminId = req.user.id;

// // //     const vehicle = await UserVehicle.findById(id).populate(
// // //       "user",
// // //       "name email",
// // //     );

// // //     if (!vehicle) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: "Vehicle not found",
// // //       });
// // //     }

// // //     if (vehicle.status !== "pending") {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: `Vehicle cannot be rejected in ${vehicle.status} status`,
// // //       });
// // //     }

// // //     vehicle.status = "rejected";
// // //     vehicle.rejectionReason = reason;
// // //     vehicle.isListed = false;
// // //     vehicle.approvedBy = adminId;
// // //     vehicle.approvedAt = new Date();

// // //     await vehicle.save();

// // //     // Send rejection email to user
// // //     try {
// // //       const { sendVehicleRejectionEmail } =
// // //         await import("../utils/emailService.js");
// // //       await sendVehicleRejectionEmail(
// // //         vehicle.user.email,
// // //         vehicle.user.name,
// // //         vehicle,
// // //         reason,
// // //       );
// // //     } catch (emailError) {
// // //       console.error("Error sending rejection email:", emailError);
// // //     }

// // //     res.status(200).json({
// // //       success: true,
// // //       message: "Vehicle rejected successfully",
// // //       data: vehicle,
// // //     });
// // //   } catch (error) {
// // //     console.error("Reject user vehicle error:", error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: "Failed to reject vehicle",
// // //     });
// // //   }
// // // };

// // // // Activate user vehicle (admin)
// // // export const activateUserVehicle = async (req, res) => {
// // //   try {
// // //     const { id } = req.params;

// // //     const vehicle = await UserVehicle.findById(id);

// // //     if (!vehicle) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: "Vehicle not found",
// // //       });
// // //     }

// // //     if (vehicle.status !== "approved" && vehicle.status !== "inactive") {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: `Vehicle cannot be activated from ${vehicle.status} status`,
// // //       });
// // //     }

// // //     vehicle.status = "active";
// // //     vehicle.isListed = true;

// // //     await vehicle.save();

// // //     res.status(200).json({
// // //       success: true,
// // //       message: "Vehicle activated successfully",
// // //       data: vehicle,
// // //     });
// // //   } catch (error) {
// // //     console.error("Activate vehicle error:", error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: "Failed to activate vehicle",
// // //     });
// // //   }
// // // };

// // // // Deactivate user vehicle (admin)
// // // export const deactivateUserVehicle = async (req, res) => {
// // //   try {
// // //     const { id } = req.params;

// // //     const vehicle = await UserVehicle.findById(id);

// // //     if (!vehicle) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: "Vehicle not found",
// // //       });
// // //     }

// // //     if (vehicle.status !== "active") {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: `Vehicle cannot be deactivated from ${vehicle.status} status`,
// // //       });
// // //     }

// // //     vehicle.status = "inactive";
// // //     vehicle.isListed = false;

// // //     await vehicle.save();

// // //     res.status(200).json({
// // //       success: true,
// // //       message: "Vehicle deactivated successfully",
// // //       data: vehicle,
// // //     });
// // //   } catch (error) {
// // //     console.error("Deactivate vehicle error:", error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: "Failed to deactivate vehicle",
// // //     });
// // //   }
// // // };

// // // // Delete user vehicle (admin) - permanent deletion
// // // export const deleteUserVehicleAdmin = async (req, res) => {
// // //   try {
// // //     const { id } = req.params;

// // //     const vehicle = await UserVehicle.findById(id);

// // //     if (!vehicle) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: "Vehicle not found",
// // //       });
// // //     }

// // //     // Delete associated files
// // //     const allFiles = [...vehicle.vehiclePhotos];

// // //     if (vehicle.citizenshipFront) allFiles.push(vehicle.citizenshipFront);
// // //     if (vehicle.citizenshipBack) allFiles.push(vehicle.citizenshipBack);
// // //     if (vehicle.passportPhoto) allFiles.push(vehicle.passportPhoto);
// // //     if (vehicle.documents) allFiles.push(...vehicle.documents);

// // //     allFiles.forEach((file) => {
// // //       if (file && file.filename) {
// // //         const filePath = path.join(
// // //           __dirname,
// // //           "../../uploads/user-vehicles",
// // //           file.filename,
// // //         );
// // //         if (fs.existsSync(filePath)) {
// // //           try {
// // //             fs.unlinkSync(filePath);
// // //           } catch (err) {
// // //             console.error("Error deleting file:", err);
// // //           }
// // //         }
// // //       }
// // //     });

// // //     await vehicle.deleteOne();

// // //     res.status(200).json({
// // //       success: true,
// // //       message: "Vehicle deleted permanently",
// // //     });
// // //   } catch (error) {
// // //     console.error("Delete vehicle error:", error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: "Failed to delete vehicle",
// // //     });
// // //   }
// // // };

// // import UserVehicle from "../models/UserVehicle.js";
// // import path from "path";
// // import fs from "fs";
// // import { fileURLToPath } from "url";
// // import { createNotification } from "../utils/notificationHelper.js";

// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);

// // // List a new vehicle (User)
// // export const listVehicle = async (req, res) => {
// //   try {
// //     console.log("=== LIST VEHICLE REQUEST RECEIVED ===");
// //     console.log("User ID:", req.user.id);
// //     console.log("Request body:", req.body);
// //     console.log(
// //       "Files received:",
// //       req.files ? Object.keys(req.files) : "No files",
// //     );

// //     const userId = req.user.id;
// //     const {
// //       carName,
// //       carNumber,
// //       carType,
// //       ratePerDay,
// //       seats,
// //       bookingType,
// //       gearType,
// //       airCondition,
// //       description,
// //       features,
// //       fullName,
// //       citizenshipNumber,
// //       phoneNumber,
// //       address,
// //       city,
// //       district,
// //     } = req.body;

// //     // Validate required fields
// //     if (
// //       !carName ||
// //       !carNumber ||
// //       !ratePerDay ||
// //       !fullName ||
// //       !citizenshipNumber ||
// //       !phoneNumber ||
// //       !address ||
// //       !city
// //     ) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Please fill in all required fields",
// //       });
// //     }

// //     // Check if vehicle already exists
// //     const existingVehicle = await UserVehicle.findOne({ carNumber });
// //     if (existingVehicle) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Vehicle with this number already exists",
// //       });
// //     }

// //     // Process features
// //     let featuresArray = [];
// //     if (features) {
// //       if (Array.isArray(features)) {
// //         featuresArray = features;
// //       } else if (typeof features === "string") {
// //         featuresArray = features
// //           .split(",")
// //           .map((f) => f.trim())
// //           .filter((f) => f);
// //       }
// //     }

// //     // Process vehicle photos
// //     const vehiclePhotos = [];
// //     if (req.files && req.files.vehiclePhotos) {
// //       const photoLabels = [
// //         "Front View",
// //         "Inside View",
// //         "Rear View",
// //         "Side View",
// //         "Extra View",
// //       ];
// //       req.files.vehiclePhotos.forEach((file, index) => {
// //         vehiclePhotos.push({
// //           filename: file.filename,
// //           originalName: file.originalname,
// //           path: file.path,
// //           url: `/uploads/user-vehicles/${file.filename}`,
// //           label: photoLabels[index] || `Photo ${index + 1}`,
// //           uploadedAt: new Date(),
// //         });
// //       });
// //     }

// //     // Process citizenship documents
// //     let citizenshipFront = null;
// //     let citizenshipBack = null;

// //     if (req.files && req.files.citizenshipFront) {
// //       const file = req.files.citizenshipFront[0];
// //       citizenshipFront = {
// //         filename: file.filename,
// //         originalName: file.originalname,
// //         path: file.path,
// //         url: `/uploads/user-vehicles/${file.filename}`,
// //         uploadedAt: new Date(),
// //       };
// //     }

// //     if (req.files && req.files.citizenshipBack) {
// //       const file = req.files.citizenshipBack[0];
// //       citizenshipBack = {
// //         filename: file.filename,
// //         originalName: file.originalname,
// //         path: file.path,
// //         url: `/uploads/user-vehicles/${file.filename}`,
// //         uploadedAt: new Date(),
// //       };
// //     }

// //     // Process passport photo
// //     let passportPhoto = null;
// //     if (req.files && req.files.passportPhoto) {
// //       const file = req.files.passportPhoto[0];
// //       passportPhoto = {
// //         filename: file.filename,
// //         originalName: file.originalname,
// //         path: file.path,
// //         url: `/uploads/user-vehicles/${file.filename}`,
// //         uploadedAt: new Date(),
// //       };
// //     }

// //     // Process vehicle documents
// //     const documents = [];
// //     const docMapping = {
// //       blueBook: { type: "bluebook", label: "Blue Book (Registration)" },
// //       insurance: { type: "insurance", label: "Insurance Certificate" },
// //       pollution: { type: "pollution", label: "Pollution Certificate" },
// //     };

// //     if (req.files) {
// //       Object.keys(docMapping).forEach((docKey) => {
// //         if (req.files[docKey] && req.files[docKey][0]) {
// //           const file = req.files[docKey][0];
// //           documents.push({
// //             type: docMapping[docKey].type,
// //             label: docMapping[docKey].label,
// //             filename: file.filename,
// //             originalName: file.originalname,
// //             path: file.path,
// //             url: `/uploads/user-vehicles/${file.filename}`,
// //             uploadedAt: new Date(),
// //           });
// //         }
// //       });
// //     }

// //     // Create user vehicle entry
// //     const userVehicle = new UserVehicle({
// //       user: userId,
// //       carName,
// //       carNumber,
// //       carType,
// //       ratePerDay: Number(ratePerDay),
// //       seats: Number(seats),
// //       bookingType: bookingType || "Both",
// //       gearType: gearType || "Automatic",
// //       airCondition: airCondition || "Yes",
// //       description: description || "",
// //       features: featuresArray,
// //       vehiclePhotos,
// //       citizenshipFront,
// //       citizenshipBack,
// //       passportPhoto,
// //       fullName,
// //       citizenshipNumber,
// //       phoneNumber,
// //       address,
// //       city,
// //       district: district || "",
// //       documents,
// //       status: "pending",
// //       isListed: false,
// //     });

// //     await userVehicle.save();

// //     // Create notification for listing submitted
// //     await createNotification(
// //       userId,
// //       "Vehicle Listed for Approval 🚗",
// //       `Your vehicle ${carName} (${carNumber}) has been submitted for admin approval.`,
// //       "info",
// //       "Awaiting verification",
// //       { vehicleId: userVehicle._id },
// //     );

// //     console.log("✅ Vehicle listed successfully:", userVehicle._id);

// //     res.status(201).json({
// //       success: true,
// //       message:
// //         "Vehicle listing submitted successfully. Awaiting admin approval.",
// //       data: {
// //         vehicleId: userVehicle._id,
// //         status: userVehicle.status,
// //       },
// //     });
// //   } catch (error) {
// //     console.error("List vehicle error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to list vehicle",
// //       error: process.env.NODE_ENV === "development" ? error.message : undefined,
// //     });
// //   }
// // };

// // // Get user's vehicles
// // export const getUserVehicles = async (req, res) => {
// //   try {
// //     const userId = req.user.id;
// //     const { status, page = 1, limit = 10 } = req.query;

// //     const query = { user: userId };
// //     if (status) {
// //       query.status = status;
// //     }

// //     const skip = (page - 1) * limit;

// //     const vehicles = await UserVehicle.find(query)
// //       .sort({ createdAt: -1 })
// //       .skip(skip)
// //       .limit(parseInt(limit))
// //       .lean();

// //     const total = await UserVehicle.countDocuments(query);

// //     res.status(200).json({
// //       success: true,
// //       data: {
// //         vehicles,
// //         pagination: {
// //           page: parseInt(page),
// //           limit: parseInt(limit),
// //           total,
// //           pages: Math.ceil(total / limit),
// //         },
// //       },
// //     });
// //   } catch (error) {
// //     console.error("Get user vehicles error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to fetch vehicles",
// //     });
// //   }
// // };

// // // Get single user vehicle by ID
// // // export const getUserVehicleById = async (req, res) => {
// // //   try {
// // //     const { id } = req.params;
// // //     const userId = req.user.id;
// // //     const isAdmin = req.user.role === "admin";

// // //     console.log(`Fetching user vehicle with ID: ${id} for user: ${userId}`);

// // //     const query = { _id: id };
// // //     if (!isAdmin) {
// // //       query.user = userId;
// // //     }

// // //     const vehicle = await UserVehicle.findOne(query).lean();

// // //     if (!vehicle) {
// // //       console.log(`Vehicle not found: ${id}`);
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: "Vehicle not found",
// // //       });
// // //     }

// // //     if (vehicle.status === "active" && vehicle.isListed) {
// // //       if (!isAdmin && vehicle.user.toString() !== userId) {
// // //         delete vehicle.documents;
// // //         delete vehicle.citizenshipFront;
// // //         delete vehicle.citizenshipBack;
// // //         delete vehicle.passportPhoto;
// // //       }
// // //     }

// // //     console.log(`✅ Vehicle found: ${vehicle.carName}`);
// // //     res.status(200).json({
// // //       success: true,
// // //       data: vehicle,
// // //     });
// // //   } catch (error) {
// // //     console.error("Get user vehicle error:", error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: "Failed to fetch vehicle",
// // //     });
// // //   }
// // // };

// // // Get single user vehicle by ID (PUBLIC for active vehicles)
// // export const getUserVehicleById = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const userId = req.user?.id; // May be undefined for public access
// //     const isAdmin = req.user?.role === "admin";

// //     console.log(`Fetching user vehicle with ID: ${id}`);
// //     console.log(`Requesting user: ${userId || "Not logged in"}`);

// //     // First, find the vehicle
// //     const vehicle = await UserVehicle.findById(id).lean();

// //     if (!vehicle) {
// //       console.log(`Vehicle not found: ${id}`);
// //       return res.status(404).json({
// //         success: false,
// //         message: "Vehicle not found",
// //       });
// //     }

// //     // Check if vehicle is active and listed - anyone can view it
// //     if (vehicle.status === "active" && vehicle.isListed) {
// //       // Remove sensitive information for non-owners
// //       if (!isAdmin && vehicle.user.toString() !== userId) {
// //         delete vehicle.documents;
// //         delete vehicle.citizenshipFront;
// //         delete vehicle.citizenshipBack;
// //         delete vehicle.passportPhoto;
// //       }
// //       console.log(`✅ Vehicle found and available: ${vehicle.carName}`);
// //       return res.status(200).json({
// //         success: true,
// //         data: vehicle,
// //       });
// //     }

// //     // If vehicle is not active/listed, only owner or admin can view
// //     if (vehicle.user.toString() !== userId && !isAdmin) {
// //       console.log(
// //         `❌ Vehicle not available for booking (status: ${vehicle.status})`,
// //       );
// //       return res.status(403).json({
// //         success: false,
// //         message: "This vehicle is not available for booking",
// //       });
// //     }

// //     console.log(`✅ Vehicle found for owner: ${vehicle.carName}`);
// //     res.status(200).json({
// //       success: true,
// //       data: vehicle,
// //     });
// //   } catch (error) {
// //     console.error("Get user vehicle error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to fetch vehicle",
// //     });
// //   }
// // };

// // // Update user vehicle
// // export const updateUserVehicle = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const userId = req.user.id;
// //     const updates = req.body;

// //     const vehicle = await UserVehicle.findOne({ _id: id, user: userId });
// //     if (!vehicle) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Vehicle not found",
// //       });
// //     }

// //     if (!["pending", "rejected"].includes(vehicle.status)) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Vehicle cannot be updated in its current status",
// //       });
// //     }

// //     const allowedUpdates = [
// //       "carName",
// //       "carNumber",
// //       "carType",
// //       "ratePerDay",
// //       "seats",
// //       "bookingType",
// //       "gearType",
// //       "airCondition",
// //       "description",
// //       "features",
// //       "fullName",
// //       "citizenshipNumber",
// //       "phoneNumber",
// //       "address",
// //       "city",
// //       "district",
// //     ];

// //     allowedUpdates.forEach((field) => {
// //       if (updates[field] !== undefined) {
// //         vehicle[field] = updates[field];
// //       }
// //     });

// //     if (updates.features) {
// //       if (Array.isArray(updates.features)) {
// //         vehicle.features = updates.features;
// //       } else if (typeof updates.features === "string") {
// //         vehicle.features = updates.features
// //           .split(",")
// //           .map((f) => f.trim())
// //           .filter((f) => f);
// //       }
// //     }

// //     await vehicle.save();

// //     // Create notification for update
// //     await createNotification(
// //       userId,
// //       "Vehicle Updated ✏️",
// //       `Your vehicle ${vehicle.carName} has been updated. It will be reviewed again if pending.`,
// //       "info",
// //       `Car Number: ${vehicle.carNumber}`,
// //       { vehicleId: vehicle._id },
// //     );

// //     res.status(200).json({
// //       success: true,
// //       message: "Vehicle updated successfully",
// //       data: vehicle,
// //     });
// //   } catch (error) {
// //     console.error("Update user vehicle error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to update vehicle",
// //     });
// //   }
// // };

// // // Delete user vehicle
// // export const deleteUserVehicle = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const userId = req.user.id;

// //     const vehicle = await UserVehicle.findOne({ _id: id, user: userId });
// //     if (!vehicle) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Vehicle not found",
// //       });
// //     }

// //     if (!["pending", "rejected"].includes(vehicle.status)) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Vehicle cannot be deleted in its current status",
// //       });
// //     }

// //     const allFiles = [...vehicle.vehiclePhotos];

// //     if (vehicle.citizenshipFront) allFiles.push(vehicle.citizenshipFront);
// //     if (vehicle.citizenshipBack) allFiles.push(vehicle.citizenshipBack);
// //     if (vehicle.passportPhoto) allFiles.push(vehicle.passportPhoto);
// //     if (vehicle.documents) allFiles.push(...vehicle.documents);

// //     allFiles.forEach((file) => {
// //       if (file && file.filename) {
// //         const filePath = path.join(
// //           __dirname,
// //           "../../uploads/user-vehicles",
// //           file.filename,
// //         );
// //         if (fs.existsSync(filePath)) {
// //           try {
// //             fs.unlinkSync(filePath);
// //           } catch (err) {
// //             console.error("Error deleting file:", err);
// //           }
// //         }
// //       }
// //     });

// //     await vehicle.deleteOne();

// //     await createNotification(
// //       userId,
// //       "Vehicle Deleted 🗑️",
// //       `Your vehicle ${vehicle.carName} has been deleted from the system.`,
// //       "error",
// //       `Car Number: ${vehicle.carNumber}`,
// //       { vehicleId: vehicle._id },
// //     );

// //     res.status(200).json({
// //       success: true,
// //       message: "Vehicle deleted successfully",
// //     });
// //   } catch (error) {
// //     console.error("Delete user vehicle error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to delete vehicle",
// //     });
// //   }
// // };

// // // Get all user vehicles (admin)
// // export const getAllUserVehicles = async (req, res) => {
// //   try {
// //     const { status, page = 1, limit = 20 } = req.query;

// //     const query = {};
// //     if (status) {
// //       query.status = status;
// //     }

// //     const skip = (page - 1) * limit;

// //     const vehicles = await UserVehicle.find(query)
// //       .populate("user", "name email phone")
// //       .sort({ createdAt: -1 })
// //       .skip(skip)
// //       .limit(parseInt(limit))
// //       .lean();

// //     const total = await UserVehicle.countDocuments(query);

// //     res.status(200).json({
// //       success: true,
// //       data: {
// //         vehicles,
// //         pagination: {
// //           page: parseInt(page),
// //           limit: parseInt(limit),
// //           total,
// //           pages: Math.ceil(total / limit),
// //         },
// //       },
// //     });
// //   } catch (error) {
// //     console.error("Get all user vehicles error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to fetch vehicles",
// //     });
// //   }
// // };

// // // Approve user vehicle (admin) - WITH NOTIFICATION
// // export const approveUserVehicle = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const adminId = req.user.id;

// //     const vehicle = await UserVehicle.findById(id).populate(
// //       "user",
// //       "name email",
// //     );

// //     if (!vehicle) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Vehicle not found",
// //       });
// //     }

// //     if (vehicle.status !== "pending") {
// //       return res.status(400).json({
// //         success: false,
// //         message: `Vehicle cannot be approved in ${vehicle.status} status`,
// //       });
// //     }

// //     vehicle.status = "approved";
// //     vehicle.isListed = true;
// //     vehicle.listedAt = new Date();
// //     vehicle.approvedBy = adminId;
// //     vehicle.approvedAt = new Date();

// //     await vehicle.save();

// //     // Send approval email
// //     try {
// //       const { sendVehicleApprovalEmail } =
// //         await import("../utils/emailService.js");
// //       await sendVehicleApprovalEmail(
// //         vehicle.user.email,
// //         vehicle.user.name,
// //         vehicle,
// //       );
// //     } catch (emailError) {
// //       console.error("Error sending approval email:", emailError);
// //     }

// //     // Create in-app notification
// //     await createNotification(
// //       vehicle.user._id,
// //       "Vehicle Approved! 🚗",
// //       `Your vehicle ${vehicle.carName} (${vehicle.carNumber}) has been approved and is now listed for rent.`,
// //       "success",
// //       `Rate: रु ${vehicle.ratePerDay}/day`,
// //       { vehicleId: vehicle._id },
// //     );

// //     res.status(200).json({
// //       success: true,
// //       message: "Vehicle approved successfully",
// //       data: vehicle,
// //     });
// //   } catch (error) {
// //     console.error("Approve user vehicle error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to approve vehicle",
// //     });
// //   }
// // };

// // // Reject user vehicle (admin) - WITH NOTIFICATION
// // export const rejectUserVehicle = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const { reason } = req.body;
// //     const adminId = req.user.id;

// //     const vehicle = await UserVehicle.findById(id).populate(
// //       "user",
// //       "name email",
// //     );

// //     if (!vehicle) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Vehicle not found",
// //       });
// //     }

// //     if (vehicle.status !== "pending") {
// //       return res.status(400).json({
// //         success: false,
// //         message: `Vehicle cannot be rejected in ${vehicle.status} status`,
// //       });
// //     }

// //     vehicle.status = "rejected";
// //     vehicle.rejectionReason = reason;
// //     vehicle.isListed = false;
// //     vehicle.approvedBy = adminId;
// //     vehicle.approvedAt = new Date();

// //     await vehicle.save();

// //     // Send rejection email
// //     try {
// //       const { sendVehicleRejectionEmail } =
// //         await import("../utils/emailService.js");
// //       await sendVehicleRejectionEmail(
// //         vehicle.user.email,
// //         vehicle.user.name,
// //         vehicle,
// //         reason,
// //       );
// //     } catch (emailError) {
// //       console.error("Error sending rejection email:", emailError);
// //     }

// //     // Create in-app notification
// //     await createNotification(
// //       vehicle.user._id,
// //       "Vehicle Rejected ❌",
// //       `Your vehicle ${vehicle.carName} (${vehicle.carNumber}) has been rejected. Reason: ${reason}`,
// //       "error",
// //       "Please update and resubmit",
// //       { vehicleId: vehicle._id, rejectionReason: reason },
// //     );

// //     res.status(200).json({
// //       success: true,
// //       message: "Vehicle rejected successfully",
// //       data: vehicle,
// //     });
// //   } catch (error) {
// //     console.error("Reject user vehicle error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to reject vehicle",
// //     });
// //   }
// // };

// // // Activate user vehicle (admin) - WITH NOTIFICATION
// // export const activateUserVehicle = async (req, res) => {
// //   try {
// //     const { id } = req.params;

// //     const vehicle = await UserVehicle.findById(id).populate(
// //       "user",
// //       "name email",
// //     );

// //     if (!vehicle) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Vehicle not found",
// //       });
// //     }

// //     if (vehicle.status !== "approved" && vehicle.status !== "inactive") {
// //       return res.status(400).json({
// //         success: false,
// //         message: `Vehicle cannot be activated from ${vehicle.status} status`,
// //       });
// //     }

// //     vehicle.status = "active";
// //     vehicle.isListed = true;

// //     await vehicle.save();

// //     // Create in-app notification
// //     await createNotification(
// //       vehicle.user._id,
// //       "Vehicle Activated! 🚗",
// //       `Your vehicle ${vehicle.carName} (${vehicle.carNumber}) has been activated and is now available for rent.`,
// //       "success",
// //       `Rate: रु ${vehicle.ratePerDay}/day`,
// //       { vehicleId: vehicle._id },
// //     );

// //     res.status(200).json({
// //       success: true,
// //       message: "Vehicle activated successfully",
// //       data: vehicle,
// //     });
// //   } catch (error) {
// //     console.error("Activate vehicle error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to activate vehicle",
// //     });
// //   }
// // };

// // // Deactivate user vehicle (admin) - WITH NOTIFICATION
// // export const deactivateUserVehicle = async (req, res) => {
// //   try {
// //     const { id } = req.params;

// //     const vehicle = await UserVehicle.findById(id).populate(
// //       "user",
// //       "name email",
// //     );

// //     if (!vehicle) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Vehicle not found",
// //       });
// //     }

// //     if (vehicle.status !== "active") {
// //       return res.status(400).json({
// //         success: false,
// //         message: `Vehicle cannot be deactivated from ${vehicle.status} status`,
// //       });
// //     }

// //     vehicle.status = "inactive";
// //     vehicle.isListed = false;

// //     await vehicle.save();

// //     // Create in-app notification
// //     await createNotification(
// //       vehicle.user._id,
// //       "Vehicle Deactivated ⏸️",
// //       `Your vehicle ${vehicle.carName} (${vehicle.carNumber}) has been deactivated and is no longer available for rent.`,
// //       "warning",
// //       "Contact admin for more information",
// //       { vehicleId: vehicle._id },
// //     );

// //     res.status(200).json({
// //       success: true,
// //       message: "Vehicle deactivated successfully",
// //       data: vehicle,
// //     });
// //   } catch (error) {
// //     console.error("Deactivate vehicle error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to deactivate vehicle",
// //     });
// //   }
// // };

// // // Delete user vehicle (admin) - permanent deletion
// // export const deleteUserVehicleAdmin = async (req, res) => {
// //   try {
// //     const { id } = req.params;

// //     const vehicle = await UserVehicle.findById(id).populate(
// //       "user",
// //       "name email",
// //     );

// //     if (!vehicle) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Vehicle not found",
// //       });
// //     }

// //     // Delete associated files
// //     const allFiles = [...vehicle.vehiclePhotos];

// //     if (vehicle.citizenshipFront) allFiles.push(vehicle.citizenshipFront);
// //     if (vehicle.citizenshipBack) allFiles.push(vehicle.citizenshipBack);
// //     if (vehicle.passportPhoto) allFiles.push(vehicle.passportPhoto);
// //     if (vehicle.documents) allFiles.push(...vehicle.documents);

// //     allFiles.forEach((file) => {
// //       if (file && file.filename) {
// //         const filePath = path.join(
// //           __dirname,
// //           "../../uploads/user-vehicles",
// //           file.filename,
// //         );
// //         if (fs.existsSync(filePath)) {
// //           try {
// //             fs.unlinkSync(filePath);
// //           } catch (err) {
// //             console.error("Error deleting file:", err);
// //           }
// //         }
// //       }
// //     });

// //     await vehicle.deleteOne();

// //     // Create notification for deletion
// //     await createNotification(
// //       vehicle.user._id,
// //       "Vehicle Deleted 🗑️",
// //       `Your vehicle ${vehicle.carName} (${vehicle.carNumber}) has been permanently deleted from the system.`,
// //       "error",
// //       "Vehicle listing removed",
// //       { vehicleId: vehicle._id },
// //     );

// //     res.status(200).json({
// //       success: true,
// //       message: "Vehicle deleted permanently",
// //     });
// //   } catch (error) {
// //     console.error("Delete vehicle error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to delete vehicle",
// //     });
// //   }
// // };

// // // Get earnings for user's listed vehicles
// // export const getUserEarnings = async (req, res) => {
// //   try {
// //     const userId = req.user.id;

// //     // Get all user's vehicles
// //     const userVehicles = await UserVehicle.find({
// //       user: userId,
// //       isListed: true,
// //     });

// //     let totalEarnings = 0;
// //     let totalBookings = 0;
// //     let grossRevenue = 0;
// //     const vehiclesEarnings = [];
// //     const allTransactions = [];

// //     for (const vehicle of userVehicles) {
// //       // Get completed bookings for this vehicle (paymentStatus: "paid" and status: "confirmed" or "completed")
// //       const bookings = await Booking.find({
// //         vehicle: vehicle._id,
// //         vehicleType: "user",
// //         paymentStatus: "paid",
// //         status: { $in: ["confirmed", "completed", "active"] },
// //       }).populate("user", "name email");

// //       const vehicleGrossRevenue = bookings.reduce(
// //         (sum, b) => sum + b.totalAmount,
// //         0,
// //       );
// //       const vehicleOwnerEarnings = vehicleGrossRevenue * 0.7;

// //       totalEarnings += vehicleOwnerEarnings;
// //       totalBookings += bookings.length;
// //       grossRevenue += vehicleGrossRevenue;

// //       vehiclesEarnings.push({
// //         vehicle: {
// //           carName: vehicle.carName,
// //           carNumber: vehicle.carNumber,
// //           vehiclePhotos: vehicle.vehiclePhotos,
// //         },
// //         totalBookings: bookings.length,
// //         grossRevenue: vehicleGrossRevenue,
// //         ownerEarnings: vehicleOwnerEarnings,
// //         bookings: bookings.map((b) => ({
// //           _id: b._id,
// //           confirmationCode: b.confirmationCode,
// //           totalAmount: b.totalAmount,
// //           user: b.user,
// //           createdAt: b.createdAt,
// //         })),
// //       });

// //       // Add to all transactions
// //       bookings.forEach((booking) => {
// //         allTransactions.push({
// //           ...booking.toObject(),
// //           ownerEarnings: booking.totalAmount * 0.7,
// //           vehicle: {
// //             carName: vehicle.carName,
// //             vehiclePhotos: vehicle.vehiclePhotos,
// //           },
// //         });
// //       });
// //     }

// //     // Sort transactions by date (newest first)
// //     allTransactions.sort(
// //       (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
// //     );

// //     res.json({
// //       success: true,
// //       data: {
// //         totalEarnings,
// //         totalBookings,
// //         grossRevenue,
// //         averagePerBooking:
// //           totalBookings > 0 ? totalEarnings / totalBookings : 0,
// //         vehicles: vehiclesEarnings,
// //         recentTransactions: allTransactions.slice(0, 10),
// //       },
// //     });
// //   } catch (error) {
// //     console.error("Get user earnings error:", error);
// //     res.status(500).json({ success: false, message: "Server error" });
// //   }
// // };







// // import UserVehicle from "../models/UserVehicle.js";
// // import Booking from "../models/Booking.js";
// // import path from "path";
// // import fs from "fs";
// // import { fileURLToPath } from "url";
// // import { createNotification } from "../utils/notificationHelper.js";

// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);

// // // List a new vehicle (User)
// // export const listVehicle = async (req, res) => {
// //   try {
// //     console.log("=== LIST VEHICLE REQUEST RECEIVED ===");
// //     console.log("User ID:", req.user.id);
// //     console.log("Request body:", req.body);
// //     console.log(
// //       "Files received:",
// //       req.files ? Object.keys(req.files) : "No files",
// //     );

// //     const userId = req.user.id;
// //     const {
// //       carName,
// //       carNumber,
// //       carType,
// //       ratePerDay,
// //       seats,
// //       bookingType,
// //       gearType,
// //       airCondition,
// //       description,
// //       features,
// //       fullName,
// //       citizenshipNumber,
// //       phoneNumber,
// //       address,
// //       city,
// //       district,
// //     } = req.body;

// //     // Validate required fields
// //     if (
// //       !carName ||
// //       !carNumber ||
// //       !ratePerDay ||
// //       !fullName ||
// //       !citizenshipNumber ||
// //       !phoneNumber ||
// //       !address ||
// //       !city
// //     ) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Please fill in all required fields",
// //       });
// //     }

// //     // Check if vehicle already exists
// //     const existingVehicle = await UserVehicle.findOne({ carNumber });
// //     if (existingVehicle) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Vehicle with this number already exists",
// //       });
// //     }

// //     // Process features
// //     let featuresArray = [];
// //     if (features) {
// //       if (Array.isArray(features)) {
// //         featuresArray = features;
// //       } else if (typeof features === "string") {
// //         featuresArray = features
// //           .split(",")
// //           .map((f) => f.trim())
// //           .filter((f) => f);
// //       }
// //     }

// //     // Process vehicle photos
// //     const vehiclePhotos = [];
// //     if (req.files && req.files.vehiclePhotos) {
// //       const photoLabels = [
// //         "Front View",
// //         "Inside View",
// //         "Rear View",
// //         "Side View",
// //         "Extra View",
// //       ];
// //       req.files.vehiclePhotos.forEach((file, index) => {
// //         vehiclePhotos.push({
// //           filename: file.filename,
// //           originalName: file.originalname,
// //           path: file.path,
// //           url: `/uploads/user-vehicles/${file.filename}`,
// //           label: photoLabels[index] || `Photo ${index + 1}`,
// //           uploadedAt: new Date(),
// //         });
// //       });
// //     }

// //     // Process citizenship documents
// //     let citizenshipFront = null;
// //     let citizenshipBack = null;

// //     if (req.files && req.files.citizenshipFront) {
// //       const file = req.files.citizenshipFront[0];
// //       citizenshipFront = {
// //         filename: file.filename,
// //         originalName: file.originalname,
// //         path: file.path,
// //         url: `/uploads/user-vehicles/${file.filename}`,
// //         uploadedAt: new Date(),
// //       };
// //     }

// //     if (req.files && req.files.citizenshipBack) {
// //       const file = req.files.citizenshipBack[0];
// //       citizenshipBack = {
// //         filename: file.filename,
// //         originalName: file.originalname,
// //         path: file.path,
// //         url: `/uploads/user-vehicles/${file.filename}`,
// //         uploadedAt: new Date(),
// //       };
// //     }

// //     // Process passport photo
// //     let passportPhoto = null;
// //     if (req.files && req.files.passportPhoto) {
// //       const file = req.files.passportPhoto[0];
// //       passportPhoto = {
// //         filename: file.filename,
// //         originalName: file.originalname,
// //         path: file.path,
// //         url: `/uploads/user-vehicles/${file.filename}`,
// //         uploadedAt: new Date(),
// //       };
// //     }

// //     // Process vehicle documents
// //     const documents = [];
// //     const docMapping = {
// //       blueBook: { type: "bluebook", label: "Blue Book (Registration)" },
// //       insurance: { type: "insurance", label: "Insurance Certificate" },
// //       pollution: { type: "pollution", label: "Pollution Certificate" },
// //     };

// //     if (req.files) {
// //       Object.keys(docMapping).forEach((docKey) => {
// //         if (req.files[docKey] && req.files[docKey][0]) {
// //           const file = req.files[docKey][0];
// //           documents.push({
// //             type: docMapping[docKey].type,
// //             label: docMapping[docKey].label,
// //             filename: file.filename,
// //             originalName: file.originalname,
// //             path: file.path,
// //             url: `/uploads/user-vehicles/${file.filename}`,
// //             uploadedAt: new Date(),
// //           });
// //         }
// //       });
// //     }

// //     // Create user vehicle entry
// //     const userVehicle = new UserVehicle({
// //       user: userId,
// //       carName,
// //       carNumber,
// //       carType,
// //       ratePerDay: Number(ratePerDay),
// //       seats: Number(seats),
// //       bookingType: bookingType || "Both",
// //       gearType: gearType || "Automatic",
// //       airCondition: airCondition || "Yes",
// //       description: description || "",
// //       features: featuresArray,
// //       vehiclePhotos,
// //       citizenshipFront,
// //       citizenshipBack,
// //       passportPhoto,
// //       fullName,
// //       citizenshipNumber,
// //       phoneNumber,
// //       address,
// //       city,
// //       district: district || "",
// //       documents,
// //       status: "pending",
// //       isListed: false,
// //     });

// //     await userVehicle.save();

// //     // Create notification for listing submitted
// //     await createNotification(
// //       userId,
// //       "Vehicle Listed for Approval 🚗",
// //       `Your vehicle ${carName} (${carNumber}) has been submitted for admin approval.`,
// //       "info",
// //       "Awaiting verification",
// //       { vehicleId: userVehicle._id },
// //     );

// //     console.log("✅ Vehicle listed successfully:", userVehicle._id);

// //     res.status(201).json({
// //       success: true,
// //       message:
// //         "Vehicle listing submitted successfully. Awaiting admin approval.",
// //       data: {
// //         vehicleId: userVehicle._id,
// //         status: userVehicle.status,
// //       },
// //     });
// //   } catch (error) {
// //     console.error("List vehicle error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to list vehicle",
// //       error: process.env.NODE_ENV === "development" ? error.message : undefined,
// //     });
// //   }
// // };

// // // Get user's vehicles
// // export const getUserVehicles = async (req, res) => {
// //   try {
// //     const userId = req.user.id;
// //     const { status, page = 1, limit = 10 } = req.query;

// //     const query = { user: userId };
// //     if (status) {
// //       query.status = status;
// //     }

// //     const skip = (page - 1) * limit;

// //     const vehicles = await UserVehicle.find(query)
// //       .sort({ createdAt: -1 })
// //       .skip(skip)
// //       .limit(parseInt(limit))
// //       .lean();

// //     const total = await UserVehicle.countDocuments(query);

// //     res.status(200).json({
// //       success: true,
// //       data: {
// //         vehicles,
// //         pagination: {
// //           page: parseInt(page),
// //           limit: parseInt(limit),
// //           total,
// //           pages: Math.ceil(total / limit),
// //         },
// //       },
// //     });
// //   } catch (error) {
// //     console.error("Get user vehicles error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to fetch vehicles",
// //     });
// //   }
// // };

// // // Get single user vehicle by ID (PUBLIC for active vehicles)
// // export const getUserVehicleById = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const userId = req.user?.id;
// //     const isAdmin = req.user?.role === "admin";

// //     console.log(`Fetching user vehicle with ID: ${id}`);
// //     console.log(`Requesting user: ${userId || "Not logged in"}`);

// //     const vehicle = await UserVehicle.findById(id).lean();

// //     if (!vehicle) {
// //       console.log(`Vehicle not found: ${id}`);
// //       return res.status(404).json({
// //         success: false,
// //         message: "Vehicle not found",
// //       });
// //     }

// //     if (vehicle.status === "active" && vehicle.isListed) {
// //       if (!isAdmin && vehicle.user.toString() !== userId) {
// //         delete vehicle.documents;
// //         delete vehicle.citizenshipFront;
// //         delete vehicle.citizenshipBack;
// //         delete vehicle.passportPhoto;
// //       }
// //       console.log(`✅ Vehicle found and available: ${vehicle.carName}`);
// //       return res.status(200).json({
// //         success: true,
// //         data: vehicle,
// //       });
// //     }

// //     if (vehicle.user.toString() !== userId && !isAdmin) {
// //       console.log(
// //         `❌ Vehicle not available for booking (status: ${vehicle.status})`,
// //       );
// //       return res.status(403).json({
// //         success: false,
// //         message: "This vehicle is not available for booking",
// //       });
// //     }

// //     console.log(`✅ Vehicle found for owner: ${vehicle.carName}`);
// //     res.status(200).json({
// //       success: true,
// //       data: vehicle,
// //     });
// //   } catch (error) {
// //     console.error("Get user vehicle error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to fetch vehicle",
// //     });
// //   }
// // };

// // // Update user vehicle
// // export const updateUserVehicle = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const userId = req.user.id;
// //     const updates = req.body;

// //     const vehicle = await UserVehicle.findOne({ _id: id, user: userId });
// //     if (!vehicle) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Vehicle not found",
// //       });
// //     }

// //     if (!["pending", "rejected"].includes(vehicle.status)) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Vehicle cannot be updated in its current status",
// //       });
// //     }

// //     const allowedUpdates = [
// //       "carName",
// //       "carNumber",
// //       "carType",
// //       "ratePerDay",
// //       "seats",
// //       "bookingType",
// //       "gearType",
// //       "airCondition",
// //       "description",
// //       "features",
// //       "fullName",
// //       "citizenshipNumber",
// //       "phoneNumber",
// //       "address",
// //       "city",
// //       "district",
// //     ];

// //     allowedUpdates.forEach((field) => {
// //       if (updates[field] !== undefined) {
// //         vehicle[field] = updates[field];
// //       }
// //     });

// //     if (updates.features) {
// //       if (Array.isArray(updates.features)) {
// //         vehicle.features = updates.features;
// //       } else if (typeof updates.features === "string") {
// //         vehicle.features = updates.features
// //           .split(",")
// //           .map((f) => f.trim())
// //           .filter((f) => f);
// //       }
// //     }

// //     await vehicle.save();

// //     await createNotification(
// //       userId,
// //       "Vehicle Updated ✏️",
// //       `Your vehicle ${vehicle.carName} has been updated. It will be reviewed again if pending.`,
// //       "info",
// //       `Car Number: ${vehicle.carNumber}`,
// //       { vehicleId: vehicle._id },
// //     );

// //     res.status(200).json({
// //       success: true,
// //       message: "Vehicle updated successfully",
// //       data: vehicle,
// //     });
// //   } catch (error) {
// //     console.error("Update user vehicle error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to update vehicle",
// //     });
// //   }
// // };

// // // Delete user vehicle
// // export const deleteUserVehicle = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const userId = req.user.id;

// //     const vehicle = await UserVehicle.findOne({ _id: id, user: userId });
// //     if (!vehicle) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Vehicle not found",
// //       });
// //     }

// //     if (!["pending", "rejected"].includes(vehicle.status)) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Vehicle cannot be deleted in its current status",
// //       });
// //     }

// //     const allFiles = [...vehicle.vehiclePhotos];

// //     if (vehicle.citizenshipFront) allFiles.push(vehicle.citizenshipFront);
// //     if (vehicle.citizenshipBack) allFiles.push(vehicle.citizenshipBack);
// //     if (vehicle.passportPhoto) allFiles.push(vehicle.passportPhoto);
// //     if (vehicle.documents) allFiles.push(...vehicle.documents);

// //     allFiles.forEach((file) => {
// //       if (file && file.filename) {
// //         const filePath = path.join(
// //           __dirname,
// //           "../../uploads/user-vehicles",
// //           file.filename,
// //         );
// //         if (fs.existsSync(filePath)) {
// //           try {
// //             fs.unlinkSync(filePath);
// //           } catch (err) {
// //             console.error("Error deleting file:", err);
// //           }
// //         }
// //       }
// //     });

// //     await vehicle.deleteOne();

// //     await createNotification(
// //       userId,
// //       "Vehicle Deleted 🗑️",
// //       `Your vehicle ${vehicle.carName} has been deleted from the system.`,
// //       "error",
// //       `Car Number: ${vehicle.carNumber}`,
// //       { vehicleId: vehicle._id },
// //     );

// //     res.status(200).json({
// //       success: true,
// //       message: "Vehicle deleted successfully",
// //     });
// //   } catch (error) {
// //     console.error("Delete user vehicle error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to delete vehicle",
// //     });
// //   }
// // };

// // // // Get all user vehicles (admin)
// // // export const getAllUserVehicles = async (req, res) => {
// // //   try {
// // //     const { status, page = 1, limit = 20 } = req.query;

// // //     const query = {};
// // //     if (status) {
// // //       query.status = status;
// // //     }

// // //     const skip = (page - 1) * limit;

// // //     const vehicles = await UserVehicle.find(query)
// // //       .populate("user", "name email phone")
// // //       .sort({ createdAt: -1 })
// // //       .skip(skip)
// // //       .limit(parseInt(limit))
// // //       .lean();

// // //     const total = await UserVehicle.countDocuments(query);

// // //     res.status(200).json({
// // //       success: true,
// // //       data: {
// // //         vehicles,
// // //         pagination: {
// // //           page: parseInt(page),
// // //           limit: parseInt(limit),
// // //           total,
// // //           pages: Math.ceil(total / limit),
// // //         },
// // //       },
// // //     });
// // //   } catch (error) {
// // //     console.error("Get all user vehicles error:", error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: "Failed to fetch vehicles",
// // //     });
// // //   }
// // // };


// // // Get all user vehicles (admin) - WITH DEBUG LOGGING
// // export const getAllUserVehicles = async (req, res) => {
// //   try {
// //     const { status, page = 1, limit = 20 } = req.query;

// //     const query = {};
// //     if (status) {
// //       query.status = status;
// //     }

// //     const skip = (page - 1) * limit;

// //     const vehicles = await UserVehicle.find(query)
// //       .populate("user", "name email phone")
// //       .sort({ createdAt: -1 })
// //       .skip(skip)
// //       .limit(parseInt(limit))
// //       .lean();

// //     // Debug logging
// //     console.log("=== ALL USER VEHICLES STATUS ===");
// //     const statusCount = {};
// //     vehicles.forEach(v => {
// //       console.log(`- ${v.carName}: status = ${v.status}, isListed = ${v.isListed}`);
// //       statusCount[v.status] = (statusCount[v.status] || 0) + 1;
// //     });
// //     console.log("Status counts:", statusCount);

// //     const total = await UserVehicle.countDocuments(query);

// //     res.status(200).json({
// //       success: true,
// //       data: {
// //         vehicles,
// //         pagination: {
// //           page: parseInt(page),
// //           limit: parseInt(limit),
// //           total,
// //           pages: Math.ceil(total / limit),
// //         },
// //       },
// //     });
// //   } catch (error) {
// //     console.error("Get all user vehicles error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to fetch vehicles",
// //     });
// //   }
// // };

// // // Approve user vehicle (admin)
// // export const approveUserVehicle = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const adminId = req.user.id;

// //     const vehicle = await UserVehicle.findById(id).populate(
// //       "user",
// //       "name email",
// //     );

// //     if (!vehicle) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Vehicle not found",
// //       });
// //     }

// //     if (vehicle.status !== "pending") {
// //       return res.status(400).json({
// //         success: false,
// //         message: `Vehicle cannot be approved in ${vehicle.status} status`,
// //       });
// //     }

// //     vehicle.status = "approved";
// //     vehicle.isListed = true;
// //     vehicle.listedAt = new Date();
// //     vehicle.approvedBy = adminId;
// //     vehicle.approvedAt = new Date();

// //     await vehicle.save();

// //     try {
// //       const { sendVehicleApprovalEmail } =
// //         await import("../utils/emailService.js");
// //       await sendVehicleApprovalEmail(
// //         vehicle.user.email,
// //         vehicle.user.name,
// //         vehicle,
// //       );
// //     } catch (emailError) {
// //       console.error("Error sending approval email:", emailError);
// //     }

// //     await createNotification(
// //       vehicle.user._id,
// //       "Vehicle Approved! 🚗",
// //       `Your vehicle ${vehicle.carName} (${vehicle.carNumber}) has been approved and is now listed for rent.`,
// //       "success",
// //       `Rate: रु ${vehicle.ratePerDay}/day`,
// //       { vehicleId: vehicle._id },
// //     );

// //     res.status(200).json({
// //       success: true,
// //       message: "Vehicle approved successfully",
// //       data: vehicle,
// //     });
// //   } catch (error) {
// //     console.error("Approve user vehicle error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to approve vehicle",
// //     });
// //   }
// // };

// // // Reject user vehicle (admin)
// // export const rejectUserVehicle = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const { reason } = req.body;
// //     const adminId = req.user.id;

// //     const vehicle = await UserVehicle.findById(id).populate(
// //       "user",
// //       "name email",
// //     );

// //     if (!vehicle) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Vehicle not found",
// //       });
// //     }

// //     if (vehicle.status !== "pending") {
// //       return res.status(400).json({
// //         success: false,
// //         message: `Vehicle cannot be rejected in ${vehicle.status} status`,
// //       });
// //     }

// //     vehicle.status = "rejected";
// //     vehicle.rejectionReason = reason;
// //     vehicle.isListed = false;
// //     vehicle.approvedBy = adminId;
// //     vehicle.approvedAt = new Date();

// //     await vehicle.save();

// //     try {
// //       const { sendVehicleRejectionEmail } =
// //         await import("../utils/emailService.js");
// //       await sendVehicleRejectionEmail(
// //         vehicle.user.email,
// //         vehicle.user.name,
// //         vehicle,
// //         reason,
// //       );
// //     } catch (emailError) {
// //       console.error("Error sending rejection email:", emailError);
// //     }

// //     await createNotification(
// //       vehicle.user._id,
// //       "Vehicle Rejected ❌",
// //       `Your vehicle ${vehicle.carName} (${vehicle.carNumber}) has been rejected. Reason: ${reason}`,
// //       "error",
// //       "Please update and resubmit",
// //       { vehicleId: vehicle._id, rejectionReason: reason },
// //     );

// //     res.status(200).json({
// //       success: true,
// //       message: "Vehicle rejected successfully",
// //       data: vehicle,
// //     });
// //   } catch (error) {
// //     console.error("Reject user vehicle error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to reject vehicle",
// //     });
// //   }
// // };

// // // Activate user vehicle (admin)
// // export const activateUserVehicle = async (req, res) => {
// //   try {
// //     const { id } = req.params;

// //     const vehicle = await UserVehicle.findById(id).populate(
// //       "user",
// //       "name email",
// //     );

// //     if (!vehicle) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Vehicle not found",
// //       });
// //     }

// //     if (vehicle.status !== "approved" && vehicle.status !== "inactive") {
// //       return res.status(400).json({
// //         success: false,
// //         message: `Vehicle cannot be activated from ${vehicle.status} status`,
// //       });
// //     }

// //     vehicle.status = "active";
// //     vehicle.isListed = true;

// //     await vehicle.save();

// //     await createNotification(
// //       vehicle.user._id,
// //       "Vehicle Activated! 🚗",
// //       `Your vehicle ${vehicle.carName} (${vehicle.carNumber}) has been activated and is now available for rent.`,
// //       "success",
// //       `Rate: रु ${vehicle.ratePerDay}/day`,
// //       { vehicleId: vehicle._id },
// //     );

// //     res.status(200).json({
// //       success: true,
// //       message: "Vehicle activated successfully",
// //       data: vehicle,
// //     });
// //   } catch (error) {
// //     console.error("Activate vehicle error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to activate vehicle",
// //     });
// //   }
// // };

// // // Deactivate user vehicle (admin)
// // export const deactivateUserVehicle = async (req, res) => {
// //   try {
// //     const { id } = req.params;

// //     const vehicle = await UserVehicle.findById(id).populate(
// //       "user",
// //       "name email",
// //     );

// //     if (!vehicle) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Vehicle not found",
// //       });
// //     }

// //     if (vehicle.status !== "active") {
// //       return res.status(400).json({
// //         success: false,
// //         message: `Vehicle cannot be deactivated from ${vehicle.status} status`,
// //       });
// //     }

// //     vehicle.status = "inactive";
// //     vehicle.isListed = false;

// //     await vehicle.save();

// //     await createNotification(
// //       vehicle.user._id,
// //       "Vehicle Deactivated ⏸️",
// //       `Your vehicle ${vehicle.carName} (${vehicle.carNumber}) has been deactivated and is no longer available for rent.`,
// //       "warning",
// //       "Contact admin for more information",
// //       { vehicleId: vehicle._id },
// //     );

// //     res.status(200).json({
// //       success: true,
// //       message: "Vehicle deactivated successfully",
// //       data: vehicle,
// //     });
// //   } catch (error) {
// //     console.error("Deactivate vehicle error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to deactivate vehicle",
// //     });
// //   }
// // };

// // // Delete user vehicle (admin)
// // export const deleteUserVehicleAdmin = async (req, res) => {
// //   try {
// //     const { id } = req.params;

// //     const vehicle = await UserVehicle.findById(id).populate(
// //       "user",
// //       "name email",
// //     );

// //     if (!vehicle) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Vehicle not found",
// //       });
// //     }

// //     const allFiles = [...vehicle.vehiclePhotos];

// //     if (vehicle.citizenshipFront) allFiles.push(vehicle.citizenshipFront);
// //     if (vehicle.citizenshipBack) allFiles.push(vehicle.citizenshipBack);
// //     if (vehicle.passportPhoto) allFiles.push(vehicle.passportPhoto);
// //     if (vehicle.documents) allFiles.push(...vehicle.documents);

// //     allFiles.forEach((file) => {
// //       if (file && file.filename) {
// //         const filePath = path.join(
// //           __dirname,
// //           "../../uploads/user-vehicles",
// //           file.filename,
// //         );
// //         if (fs.existsSync(filePath)) {
// //           try {
// //             fs.unlinkSync(filePath);
// //           } catch (err) {
// //             console.error("Error deleting file:", err);
// //           }
// //         }
// //       }
// //     });

// //     await vehicle.deleteOne();

// //     await createNotification(
// //       vehicle.user._id,
// //       "Vehicle Deleted 🗑️",
// //       `Your vehicle ${vehicle.carName} (${vehicle.carNumber}) has been permanently deleted from the system.`,
// //       "error",
// //       "Vehicle listing removed",
// //       { vehicleId: vehicle._id },
// //     );

// //     res.status(200).json({
// //       success: true,
// //       message: "Vehicle deleted permanently",
// //     });
// //   } catch (error) {
// //     console.error("Delete vehicle error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to delete vehicle",
// //     });
// //   }
// // };

// // // Get earnings for user's listed vehicles
// // export const getUserEarnings = async (req, res) => {
// //   try {
// //     const userId = req.user.id;
// //     console.log(`Fetching earnings for user: ${userId}`);

// //     // Get all user's vehicles that are listed
// //     const userVehicles = await UserVehicle.find({
// //       user: userId,
// //       isListed: true,
// //     }).lean();

// //     if (userVehicles.length === 0) {
// //       return res.json({
// //         success: true,
// //         data: {
// //           totalEarnings: 0,
// //           totalBookings: 0,
// //           grossRevenue: 0,
// //           averagePerBooking: 0,
// //           vehicles: [],
// //           recentTransactions: [],
// //         },
// //       });
// //     }

// //     let totalEarnings = 0;
// //     let totalBookings = 0;
// //     let grossRevenue = 0;
// //     const vehiclesEarnings = [];
// //     const allTransactions = [];

// //     for (const vehicle of userVehicles) {
// //       try {
// //         // Get completed bookings for this vehicle
// //         const bookings = await Booking.find({
// //           vehicle: vehicle._id,
// //           vehicleType: "user",
// //           paymentStatus: "paid",
// //           status: { $in: ["confirmed", "completed", "active"] },
// //         })
// //           .populate("user", "name email phone")
// //           .lean();

// //         const vehicleGrossRevenue = bookings.reduce(
// //           (sum, b) => sum + (b.totalAmount || 0),
// //           0,
// //         );
// //         const vehicleOwnerEarnings = vehicleGrossRevenue * 0.7;

// //         totalEarnings += vehicleOwnerEarnings;
// //         totalBookings += bookings.length;
// //         grossRevenue += vehicleGrossRevenue;

// //         vehiclesEarnings.push({
// //           vehicle: {
// //             carName: vehicle.carName,
// //             carNumber: vehicle.carNumber,
// //             vehiclePhotos: vehicle.vehiclePhotos || [],
// //           },
// //           totalBookings: bookings.length,
// //           grossRevenue: Math.round(vehicleGrossRevenue),
// //           ownerEarnings: Math.round(vehicleOwnerEarnings),
// //           bookings: bookings.map((b) => ({
// //             _id: b._id,
// //             confirmationCode: b.confirmationCode,
// //             totalAmount: b.totalAmount,
// //             user: b.user,
// //             createdAt: b.createdAt,
// //           })),
// //         });

// //         // Add to all transactions
// //         bookings.forEach((booking) => {
// //           allTransactions.push({
// //             _id: booking._id,
// //             confirmationCode: booking.confirmationCode,
// //             totalAmount: booking.totalAmount,
// //             user: booking.user,
// //             createdAt: booking.createdAt,
// //             ownerEarnings: Math.round(booking.totalAmount * 0.7),
// //             vehicle: {
// //               carName: vehicle.carName,
// //               carNumber: vehicle.carNumber,
// //               vehiclePhotos: vehicle.vehiclePhotos || [],
// //             },
// //           });
// //         });
// //       } catch (vehicleError) {
// //         console.error(`Error processing vehicle ${vehicle._id}:`, vehicleError);
// //         // Continue with next vehicle
// //       }
// //     }

// //     // Sort transactions by date (newest first)
// //     allTransactions.sort(
// //       (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
// //     );

// //     res.json({
// //       success: true,
// //       data: {
// //         totalEarnings: Math.round(totalEarnings),
// //         totalBookings,
// //         grossRevenue: Math.round(grossRevenue),
// //         averagePerBooking:
// //           totalBookings > 0 ? Math.round(totalEarnings / totalBookings) : 0,
// //         vehicles: vehiclesEarnings,
// //         recentTransactions: allTransactions.slice(0, 10),
// //       },
// //     });
// //   } catch (error) {
// //     console.error("Get user earnings error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to fetch earnings data",
// //       error: error.message,
// //     });
// //   }
// // };
// // // Mark vehicle as booked (when a booking is confirmed)
// // export const markVehicleAsBooked = async (vehicleId) => {
// //   try {
// //     const vehicle = await UserVehicle.findById(vehicleId);
// //     if (!vehicle) return null;
    
// //     vehicle.status = "booked";
// //     vehicle.isListed = false; // Temporarily unavailable for new bookings
// //     await vehicle.save();
// //     console.log(`✅ Vehicle ${vehicle.carName} marked as booked`);
// //     return vehicle;
// //   } catch (error) {
// //     console.error("Error marking vehicle as booked:", error);
// //     return null;
// //   }
// // };

// // // Mark vehicle as available (when booking is completed/cancelled)
// // export const markVehicleAsAvailable = async (vehicleId) => {
// //   try {
// //     const vehicle = await UserVehicle.findById(vehicleId);
// //     if (!vehicle) return null;
    
// //     vehicle.status = "active";
// //     vehicle.isListed = true;
// //     await vehicle.save();
// //     console.log(`✅ Vehicle ${vehicle.carName} marked as available`);
// //     return vehicle;
// //   } catch (error) {
// //     console.error("Error marking vehicle as available:", error);
// //     return null;
// //   }
// // };

// // // Get vehicle by ID with status check (for booking)
// // export const getAvailableVehicleForBooking = async (vehicleId) => {
// //   try {
// //     const vehicle = await UserVehicle.findOne({
// //       _id: vehicleId,
// //       status: "active",
// //       isListed: true,
// //     });
// //     return vehicle;
// //   } catch (error) {
// //     console.error("Error getting available vehicle:", error);
// //     return null;
// //   }
// // };



// // // Fix vehicle status (admin only) - ADD THIS FUNCTION
// // export const fixVehicleStatus = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const { status, isListed } = req.body;

// //     const vehicle = await UserVehicle.findById(id);
// //     if (!vehicle) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Vehicle not found",
// //       });
// //     }

// //     if (status) vehicle.status = status;
// //     if (isListed !== undefined) vehicle.isListed = isListed;
    
// //     await vehicle.save();

// //     console.log(`✅ Vehicle ${vehicle.carName} status fixed to: ${vehicle.status}, isListed: ${vehicle.isListed}`);

// //     res.status(200).json({
// //       success: true,
// //       message: "Vehicle status fixed successfully",
// //       data: {
// //         status: vehicle.status,
// //         isListed: vehicle.isListed,
// //       },
// //     });
// //   } catch (error) {
// //     console.error("Fix vehicle status error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to fix vehicle status",
// //     });
// //   }
// // };




// import UserVehicle from "../models/UserVehicle.js";
// import Booking from "../models/Booking.js";
// import path from "path";
// import fs from "fs";
// import { fileURLToPath } from "url";
// import { createNotification } from "../utils/notificationHelper.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // List a new vehicle (User)
// export const listVehicle = async (req, res) => {
//   try {
//     console.log("=== LIST VEHICLE REQUEST RECEIVED ===");
//     console.log("User ID:", req.user.id);
//     console.log("Request body:", req.body);
//     console.log(
//       "Files received:",
//       req.files ? Object.keys(req.files) : "No files",
//     );

//     const userId = req.user.id;
//     const {
//       carName,
//       carNumber,
//       carType,
//       ratePerDay,
//       seats,
//       bookingType,
//       gearType,
//       airCondition,
//       description,
//       features,
//       fullName,
//       citizenshipNumber,
//       phoneNumber,
//       address,
//       city,
//       district,
//     } = req.body;

//     // Validate required fields
//     if (
//       !carName ||
//       !carNumber ||
//       !ratePerDay ||
//       !fullName ||
//       !citizenshipNumber ||
//       !phoneNumber ||
//       !address ||
//       !city
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "Please fill in all required fields",
//       });
//     }

//     // Check if vehicle already exists
//     const existingVehicle = await UserVehicle.findOne({ carNumber });
//     if (existingVehicle) {
//       return res.status(400).json({
//         success: false,
//         message: "Vehicle with this number already exists",
//       });
//     }

//     // Process features
//     let featuresArray = [];
//     if (features) {
//       if (Array.isArray(features)) {
//         featuresArray = features;
//       } else if (typeof features === "string") {
//         featuresArray = features
//           .split(",")
//           .map((f) => f.trim())
//           .filter((f) => f);
//       }
//     }

//     // Process vehicle photos
//     const vehiclePhotos = [];
//     if (req.files && req.files.vehiclePhotos) {
//       const photoLabels = [
//         "Front View",
//         "Inside View",
//         "Rear View",
//         "Side View",
//         "Extra View",
//       ];
//       req.files.vehiclePhotos.forEach((file, index) => {
//         vehiclePhotos.push({
//           filename: file.filename,
//           originalName: file.originalname,
//           path: file.path,
//           url: `/uploads/user-vehicles/${file.filename}`,
//           label: photoLabels[index] || `Photo ${index + 1}`,
//           uploadedAt: new Date(),
//         });
//       });
//     }

//     // Process citizenship documents
//     let citizenshipFront = null;
//     let citizenshipBack = null;

//     if (req.files && req.files.citizenshipFront) {
//       const file = req.files.citizenshipFront[0];
//       citizenshipFront = {
//         filename: file.filename,
//         originalName: file.originalname,
//         path: file.path,
//         url: `/uploads/user-vehicles/${file.filename}`,
//         uploadedAt: new Date(),
//       };
//     }

//     if (req.files && req.files.citizenshipBack) {
//       const file = req.files.citizenshipBack[0];
//       citizenshipBack = {
//         filename: file.filename,
//         originalName: file.originalname,
//         path: file.path,
//         url: `/uploads/user-vehicles/${file.filename}`,
//         uploadedAt: new Date(),
//       };
//     }

//     // Process passport photo
//     let passportPhoto = null;
//     if (req.files && req.files.passportPhoto) {
//       const file = req.files.passportPhoto[0];
//       passportPhoto = {
//         filename: file.filename,
//         originalName: file.originalname,
//         path: file.path,
//         url: `/uploads/user-vehicles/${file.filename}`,
//         uploadedAt: new Date(),
//       };
//     }

//     // Process vehicle documents
//     const documents = [];
//     const docMapping = {
//       blueBook: { type: "bluebook", label: "Blue Book (Registration)" },
//       insurance: { type: "insurance", label: "Insurance Certificate" },
//       pollution: { type: "pollution", label: "Pollution Certificate" },
//     };

//     if (req.files) {
//       Object.keys(docMapping).forEach((docKey) => {
//         if (req.files[docKey] && req.files[docKey][0]) {
//           const file = req.files[docKey][0];
//           documents.push({
//             type: docMapping[docKey].type,
//             label: docMapping[docKey].label,
//             filename: file.filename,
//             originalName: file.originalname,
//             path: file.path,
//             url: `/uploads/user-vehicles/${file.filename}`,
//             uploadedAt: new Date(),
//           });
//         }
//       });
//     }

//     // Create user vehicle entry
//     const userVehicle = new UserVehicle({
//       user: userId,
//       carName,
//       carNumber,
//       carType,
//       ratePerDay: Number(ratePerDay),
//       seats: Number(seats),
//       bookingType: bookingType || "Both",
//       gearType: gearType || "Automatic",
//       airCondition: airCondition || "Yes",
//       description: description || "",
//       features: featuresArray,
//       vehiclePhotos,
//       citizenshipFront,
//       citizenshipBack,
//       passportPhoto,
//       fullName,
//       citizenshipNumber,
//       phoneNumber,
//       address,
//       city,
//       district: district || "",
//       documents,
//       status: "pending",
//       isListed: false,
//     });

//     await userVehicle.save();

//     await createNotification(
//       userId,
//       "Vehicle Listed for Approval 🚗",
//       `Your vehicle ${carName} (${carNumber}) has been submitted for admin approval.`,
//       "info",
//       "Awaiting verification",
//       { vehicleId: userVehicle._id },
//     );

//     console.log("✅ Vehicle listed successfully:", userVehicle._id);

//     res.status(201).json({
//       success: true,
//       message: "Vehicle listing submitted successfully. Awaiting admin approval.",
//       data: {
//         vehicleId: userVehicle._id,
//         status: userVehicle.status,
//       },
//     });
//   } catch (error) {
//     console.error("List vehicle error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to list vehicle",
//       error: process.env.NODE_ENV === "development" ? error.message : undefined,
//     });
//   }
// };

// // Get user's vehicles
// export const getUserVehicles = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { status, page = 1, limit = 10 } = req.query;

//     const query = { user: userId };
//     if (status) {
//       query.status = status;
//     }

//     const skip = (page - 1) * limit;

//     const vehicles = await UserVehicle.find(query)
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(parseInt(limit))
//       .lean();

//     const total = await UserVehicle.countDocuments(query);

//     res.status(200).json({
//       success: true,
//       data: {
//         vehicles,
//         pagination: {
//           page: parseInt(page),
//           limit: parseInt(limit),
//           total,
//           pages: Math.ceil(total / limit),
//         },
//       },
//     });
//   } catch (error) {
//     console.error("Get user vehicles error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch vehicles",
//     });
//   }
// };

// // Get single user vehicle by ID (PUBLIC for active vehicles)
// export const getUserVehicleById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user?.id;
//     const isAdmin = req.user?.role === "admin";

//     console.log(`Fetching user vehicle with ID: ${id}`);
//     console.log(`Requesting user: ${userId || "Not logged in"}`);

//     const vehicle = await UserVehicle.findById(id).lean();

//     if (!vehicle) {
//       console.log(`Vehicle not found: ${id}`);
//       return res.status(404).json({
//         success: false,
//         message: "Vehicle not found",
//       });
//     }

//     if (vehicle.status === "active" && vehicle.isListed) {
//       if (!isAdmin && vehicle.user.toString() !== userId) {
//         delete vehicle.documents;
//         delete vehicle.citizenshipFront;
//         delete vehicle.citizenshipBack;
//         delete vehicle.passportPhoto;
//       }
//       console.log(`✅ Vehicle found and available: ${vehicle.carName}`);
//       return res.status(200).json({
//         success: true,
//         data: vehicle,
//       });
//     }

//     if (vehicle.user.toString() !== userId && !isAdmin) {
//       console.log(`❌ Vehicle not available for booking (status: ${vehicle.status})`);
//       return res.status(403).json({
//         success: false,
//         message: "This vehicle is not available for booking",
//       });
//     }

//     console.log(`✅ Vehicle found for owner: ${vehicle.carName}`);
//     res.status(200).json({
//       success: true,
//       data: vehicle,
//     });
//   } catch (error) {
//     console.error("Get user vehicle error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch vehicle",
//     });
//   }
// };

// // Update user vehicle
// export const updateUserVehicle = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;
//     const updates = req.body;

//     const vehicle = await UserVehicle.findOne({ _id: id, user: userId });
//     if (!vehicle) {
//       return res.status(404).json({
//         success: false,
//         message: "Vehicle not found",
//       });
//     }

//     if (!["pending", "rejected"].includes(vehicle.status)) {
//       return res.status(400).json({
//         success: false,
//         message: "Vehicle cannot be updated in its current status",
//       });
//     }

//     const allowedUpdates = [
//       "carName",
//       "carNumber",
//       "carType",
//       "ratePerDay",
//       "seats",
//       "bookingType",
//       "gearType",
//       "airCondition",
//       "description",
//       "features",
//       "fullName",
//       "citizenshipNumber",
//       "phoneNumber",
//       "address",
//       "city",
//       "district",
//     ];

//     allowedUpdates.forEach((field) => {
//       if (updates[field] !== undefined) {
//         vehicle[field] = updates[field];
//       }
//     });

//     if (updates.features) {
//       if (Array.isArray(updates.features)) {
//         vehicle.features = updates.features;
//       } else if (typeof updates.features === "string") {
//         vehicle.features = updates.features
//           .split(",")
//           .map((f) => f.trim())
//           .filter((f) => f);
//       }
//     }

//     await vehicle.save();

//     await createNotification(
//       userId,
//       "Vehicle Updated ✏️",
//       `Your vehicle ${vehicle.carName} has been updated. It will be reviewed again if pending.`,
//       "info",
//       `Car Number: ${vehicle.carNumber}`,
//       { vehicleId: vehicle._id },
//     );

//     res.status(200).json({
//       success: true,
//       message: "Vehicle updated successfully",
//       data: vehicle,
//     });
//   } catch (error) {
//     console.error("Update user vehicle error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to update vehicle",
//     });
//   }
// };

// // Delete user vehicle
// export const deleteUserVehicle = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;

//     const vehicle = await UserVehicle.findOne({ _id: id, user: userId });
//     if (!vehicle) {
//       return res.status(404).json({
//         success: false,
//         message: "Vehicle not found",
//       });
//     }

//     if (!["pending", "rejected"].includes(vehicle.status)) {
//       return res.status(400).json({
//         success: false,
//         message: "Vehicle cannot be deleted in its current status",
//       });
//     }

//     const allFiles = [...vehicle.vehiclePhotos];

//     if (vehicle.citizenshipFront) allFiles.push(vehicle.citizenshipFront);
//     if (vehicle.citizenshipBack) allFiles.push(vehicle.citizenshipBack);
//     if (vehicle.passportPhoto) allFiles.push(vehicle.passportPhoto);
//     if (vehicle.documents) allFiles.push(...vehicle.documents);

//     allFiles.forEach((file) => {
//       if (file && file.filename) {
//         const filePath = path.join(__dirname, "../../uploads/user-vehicles", file.filename);
//         if (fs.existsSync(filePath)) {
//           try {
//             fs.unlinkSync(filePath);
//           } catch (err) {
//             console.error("Error deleting file:", err);
//           }
//         }
//       }
//     });

//     await vehicle.deleteOne();

//     await createNotification(
//       userId,
//       "Vehicle Deleted 🗑️",
//       `Your vehicle ${vehicle.carName} has been deleted from the system.`,
//       "error",
//       `Car Number: ${vehicle.carNumber}`,
//       { vehicleId: vehicle._id },
//     );

//     res.status(200).json({
//       success: true,
//       message: "Vehicle deleted successfully",
//     });
//   } catch (error) {
//     console.error("Delete user vehicle error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to delete vehicle",
//     });
//   }
// };

// // Get all user vehicles (admin) - WITH DEBUG LOGGING
// export const getAllUserVehicles = async (req, res) => {
//   try {
//     const { status, page = 1, limit = 20 } = req.query;

//     const query = {};
//     if (status) {
//       query.status = status;
//     }

//     const skip = (page - 1) * limit;

//     const vehicles = await UserVehicle.find(query)
//       .populate("user", "name email phone")
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(parseInt(limit))
//       .lean();

//     // Debug logging
//     console.log("=== ALL USER VEHICLES STATUS ===");
//     const statusCount = {};
//     vehicles.forEach(v => {
//       console.log(`- ${v.carName}: status = ${v.status}, isListed = ${v.isListed}`);
//       statusCount[v.status] = (statusCount[v.status] || 0) + 1;
//     });
//     console.log("Status counts:", statusCount);

//     const total = await UserVehicle.countDocuments(query);

//     res.status(200).json({
//       success: true,
//       data: {
//         vehicles,
//         pagination: {
//           page: parseInt(page),
//           limit: parseInt(limit),
//           total,
//           pages: Math.ceil(total / limit),
//         },
//       },
//     });
//   } catch (error) {
//     console.error("Get all user vehicles error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch vehicles",
//     });
//   }
// };

// // Approve user vehicle (admin)
// export const approveUserVehicle = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const adminId = req.user.id;

//     const vehicle = await UserVehicle.findById(id).populate("user", "name email");

//     if (!vehicle) {
//       return res.status(404).json({
//         success: false,
//         message: "Vehicle not found",
//       });
//     }

//     if (vehicle.status !== "pending") {
//       return res.status(400).json({
//         success: false,
//         message: `Vehicle cannot be approved in ${vehicle.status} status`,
//       });
//     }

//     vehicle.status = "approved";
//     vehicle.isListed = true;
//     vehicle.listedAt = new Date();
//     vehicle.approvedBy = adminId;
//     vehicle.approvedAt = new Date();

//     await vehicle.save();

//     try {
//       const { sendVehicleApprovalEmail } = await import("../utils/emailService.js");
//       await sendVehicleApprovalEmail(vehicle.user.email, vehicle.user.name, vehicle);
//     } catch (emailError) {
//       console.error("Error sending approval email:", emailError);
//     }

//     await createNotification(
//       vehicle.user._id,
//       "Vehicle Approved! 🚗",
//       `Your vehicle ${vehicle.carName} (${vehicle.carNumber}) has been approved and is now listed for rent.`,
//       "success",
//       `Rate: रु ${vehicle.ratePerDay}/day`,
//       { vehicleId: vehicle._id },
//     );

//     res.status(200).json({
//       success: true,
//       message: "Vehicle approved successfully",
//       data: vehicle,
//     });
//   } catch (error) {
//     console.error("Approve user vehicle error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to approve vehicle",
//     });
//   }
// };

// // Reject user vehicle (admin)
// export const rejectUserVehicle = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { reason } = req.body;
//     const adminId = req.user.id;

//     const vehicle = await UserVehicle.findById(id).populate("user", "name email");

//     if (!vehicle) {
//       return res.status(404).json({
//         success: false,
//         message: "Vehicle not found",
//       });
//     }

//     if (vehicle.status !== "pending") {
//       return res.status(400).json({
//         success: false,
//         message: `Vehicle cannot be rejected in ${vehicle.status} status`,
//       });
//     }

//     vehicle.status = "rejected";
//     vehicle.rejectionReason = reason;
//     vehicle.isListed = false;
//     vehicle.approvedBy = adminId;
//     vehicle.approvedAt = new Date();

//     await vehicle.save();

//     try {
//       const { sendVehicleRejectionEmail } = await import("../utils/emailService.js");
//       await sendVehicleRejectionEmail(vehicle.user.email, vehicle.user.name, vehicle, reason);
//     } catch (emailError) {
//       console.error("Error sending rejection email:", emailError);
//     }

//     await createNotification(
//       vehicle.user._id,
//       "Vehicle Rejected ❌",
//       `Your vehicle ${vehicle.carName} (${vehicle.carNumber}) has been rejected. Reason: ${reason}`,
//       "error",
//       "Please update and resubmit",
//       { vehicleId: vehicle._id, rejectionReason: reason },
//     );

//     res.status(200).json({
//       success: true,
//       message: "Vehicle rejected successfully",
//       data: vehicle,
//     });
//   } catch (error) {
//     console.error("Reject user vehicle error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to reject vehicle",
//     });
//   }
// };

// // Activate user vehicle (admin)
// export const activateUserVehicle = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const vehicle = await UserVehicle.findById(id).populate("user", "name email");

//     if (!vehicle) {
//       return res.status(404).json({
//         success: false,
//         message: "Vehicle not found",
//       });
//     }

//     if (vehicle.status !== "approved" && vehicle.status !== "inactive") {
//       return res.status(400).json({
//         success: false,
//         message: `Vehicle cannot be activated from ${vehicle.status} status`,
//       });
//     }

//     vehicle.status = "active";
//     vehicle.isListed = true;

//     await vehicle.save();

//     await createNotification(
//       vehicle.user._id,
//       "Vehicle Activated! 🚗",
//       `Your vehicle ${vehicle.carName} (${vehicle.carNumber}) has been activated and is now available for rent.`,
//       "success",
//       `Rate: रु ${vehicle.ratePerDay}/day`,
//       { vehicleId: vehicle._id },
//     );

//     res.status(200).json({
//       success: true,
//       message: "Vehicle activated successfully",
//       data: vehicle,
//     });
//   } catch (error) {
//     console.error("Activate vehicle error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to activate vehicle",
//     });
//   }
// };

// // Deactivate user vehicle (admin)
// export const deactivateUserVehicle = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const vehicle = await UserVehicle.findById(id).populate("user", "name email");

//     if (!vehicle) {
//       return res.status(404).json({
//         success: false,
//         message: "Vehicle not found",
//       });
//     }

//     if (vehicle.status !== "active") {
//       return res.status(400).json({
//         success: false,
//         message: `Vehicle cannot be deactivated from ${vehicle.status} status`,
//       });
//     }

//     vehicle.status = "inactive";
//     vehicle.isListed = false;

//     await vehicle.save();

//     await createNotification(
//       vehicle.user._id,
//       "Vehicle Deactivated ⏸️",
//       `Your vehicle ${vehicle.carName} (${vehicle.carNumber}) has been deactivated and is no longer available for rent.`,
//       "warning",
//       "Contact admin for more information",
//       { vehicleId: vehicle._id },
//     );

//     res.status(200).json({
//       success: true,
//       message: "Vehicle deactivated successfully",
//       data: vehicle,
//     });
//   } catch (error) {
//     console.error("Deactivate vehicle error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to deactivate vehicle",
//     });
//   }
// };

// // Delete user vehicle (admin)
// export const deleteUserVehicleAdmin = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const vehicle = await UserVehicle.findById(id).populate("user", "name email");

//     if (!vehicle) {
//       return res.status(404).json({
//         success: false,
//         message: "Vehicle not found",
//       });
//     }

//     const allFiles = [...vehicle.vehiclePhotos];

//     if (vehicle.citizenshipFront) allFiles.push(vehicle.citizenshipFront);
//     if (vehicle.citizenshipBack) allFiles.push(vehicle.citizenshipBack);
//     if (vehicle.passportPhoto) allFiles.push(vehicle.passportPhoto);
//     if (vehicle.documents) allFiles.push(...vehicle.documents);

//     allFiles.forEach((file) => {
//       if (file && file.filename) {
//         const filePath = path.join(__dirname, "../../uploads/user-vehicles", file.filename);
//         if (fs.existsSync(filePath)) {
//           try {
//             fs.unlinkSync(filePath);
//           } catch (err) {
//             console.error("Error deleting file:", err);
//           }
//         }
//       }
//     });

//     await vehicle.deleteOne();

//     await createNotification(
//       vehicle.user._id,
//       "Vehicle Deleted 🗑️",
//       `Your vehicle ${vehicle.carName} (${vehicle.carNumber}) has been permanently deleted from the system.`,
//       "error",
//       "Vehicle listing removed",
//       { vehicleId: vehicle._id },
//     );

//     res.status(200).json({
//       success: true,
//       message: "Vehicle deleted permanently",
//     });
//   } catch (error) {
//     console.error("Delete vehicle error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to delete vehicle",
//     });
//   }
// };

// // Get earnings for user's listed vehicles
// export const getUserEarnings = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     console.log(`Fetching earnings for user: ${userId}`);

//     const userVehicles = await UserVehicle.find({
//       user: userId,
//       isListed: true,
//     }).lean();

//     if (userVehicles.length === 0) {
//       return res.json({
//         success: true,
//         data: {
//           totalEarnings: 0,
//           totalBookings: 0,
//           grossRevenue: 0,
//           averagePerBooking: 0,
//           vehicles: [],
//           recentTransactions: [],
//         },
//       });
//     }

//     let totalEarnings = 0;
//     let totalBookings = 0;
//     let grossRevenue = 0;
//     const vehiclesEarnings = [];
//     const allTransactions = [];

//     for (const vehicle of userVehicles) {
//       try {
//         const bookings = await Booking.find({
//           vehicle: vehicle._id,
//           vehicleType: "user",
//           paymentStatus: "paid",
//           status: { $in: ["confirmed", "completed", "active"] },
//         })
//           .populate("user", "name email phone")
//           .lean();

//         const vehicleGrossRevenue = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
//         const vehicleOwnerEarnings = vehicleGrossRevenue * 0.7;

//         totalEarnings += vehicleOwnerEarnings;
//         totalBookings += bookings.length;
//         grossRevenue += vehicleGrossRevenue;

//         vehiclesEarnings.push({
//           vehicle: {
//             carName: vehicle.carName,
//             carNumber: vehicle.carNumber,
//             vehiclePhotos: vehicle.vehiclePhotos || [],
//           },
//           totalBookings: bookings.length,
//           grossRevenue: Math.round(vehicleGrossRevenue),
//           ownerEarnings: Math.round(vehicleOwnerEarnings),
//           bookings: bookings.map((b) => ({
//             _id: b._id,
//             confirmationCode: b.confirmationCode,
//             totalAmount: b.totalAmount,
//             user: b.user,
//             createdAt: b.createdAt,
//           })),
//         });

//         bookings.forEach((booking) => {
//           allTransactions.push({
//             _id: booking._id,
//             confirmationCode: booking.confirmationCode,
//             totalAmount: booking.totalAmount,
//             user: booking.user,
//             createdAt: booking.createdAt,
//             ownerEarnings: Math.round(booking.totalAmount * 0.7),
//             vehicle: {
//               carName: vehicle.carName,
//               carNumber: vehicle.carNumber,
//               vehiclePhotos: vehicle.vehiclePhotos || [],
//             },
//           });
//         });
//       } catch (vehicleError) {
//         console.error(`Error processing vehicle ${vehicle._id}:`, vehicleError);
//       }
//     }

//     allTransactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

//     res.json({
//       success: true,
//       data: {
//         totalEarnings: Math.round(totalEarnings),
//         totalBookings,
//         grossRevenue: Math.round(grossRevenue),
//         averagePerBooking: totalBookings > 0 ? Math.round(totalEarnings / totalBookings) : 0,
//         vehicles: vehiclesEarnings,
//         recentTransactions: allTransactions.slice(0, 10),
//       },
//     });
//   } catch (error) {
//     console.error("Get user earnings error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch earnings data",
//       error: error.message,
//     });
//   }
// };

// // Mark vehicle as booked (when a booking is confirmed)
// export const markVehicleAsBooked = async (vehicleId) => {
//   try {
//     const vehicle = await UserVehicle.findById(vehicleId);
//     if (!vehicle) return null;
    
//     vehicle.status = "booked";
//     vehicle.isListed = false;
//     await vehicle.save();
//     console.log(`✅ Vehicle ${vehicle.carName} marked as booked`);
//     return vehicle;
//   } catch (error) {
//     console.error("Error marking vehicle as booked:", error);
//     return null;
//   }
// };

// // Mark vehicle as available (when booking is completed/cancelled)
// export const markVehicleAsAvailable = async (vehicleId) => {
//   try {
//     const vehicle = await UserVehicle.findById(vehicleId);
//     if (!vehicle) return null;
    
//     vehicle.status = "active";
//     vehicle.isListed = true;
//     await vehicle.save();
//     console.log(`✅ Vehicle ${vehicle.carName} marked as available`);
//     return vehicle;
//   } catch (error) {
//     console.error("Error marking vehicle as available:", error);
//     return null;
//   }
// };

// // Get vehicle by ID with status check (for booking)
// export const getAvailableVehicleForBooking = async (vehicleId) => {
//   try {
//     const vehicle = await UserVehicle.findOne({
//       _id: vehicleId,
//       status: "active",
//       isListed: true,
//     });
//     return vehicle;
//   } catch (error) {
//     console.error("Error getting available vehicle:", error);
//     return null;
//   }
// };

// // Fix vehicle status (admin only)
// export const fixVehicleStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status, isListed } = req.body;

//     const vehicle = await UserVehicle.findById(id);
//     if (!vehicle) {
//       return res.status(404).json({
//         success: false,
//         message: "Vehicle not found",
//       });
//     }

//     if (status) vehicle.status = status;
//     if (isListed !== undefined) vehicle.isListed = isListed;
    
//     await vehicle.save();

//     console.log(`✅ Vehicle ${vehicle.carName} status fixed to: ${vehicle.status}, isListed: ${vehicle.isListed}`);

//     res.status(200).json({
//       success: true,
//       message: "Vehicle status fixed successfully",
//       data: {
//         status: vehicle.status,
//         isListed: vehicle.isListed,
//       },
//     });
//   } catch (error) {
//     console.error("Fix vehicle status error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fix vehicle status",
//     });
//   }
// };




// import UserVehicle from "../models/UserVehicle.js";
// import Booking from "../models/Booking.js";
// import path from "path";
// import fs from "fs";
// import { fileURLToPath } from "url";
// import { createNotification } from "../utils/notificationHelper.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// export const listVehicle = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const {
//       carName, carNumber, carType, ratePerDay, seats, bookingType,
//       gearType, airCondition, description, features, fullName,
//       citizenshipNumber, phoneNumber, address, city, district,
//     } = req.body;

//     if (!carName || !carNumber || !ratePerDay || !fullName || !citizenshipNumber || !phoneNumber || !address || !city) {
//       return res.status(400).json({ success: false, message: "Please fill in all required fields" });
//     }

//     const existingVehicle = await UserVehicle.findOne({ carNumber });
//     if (existingVehicle) {
//       return res.status(400).json({ success: false, message: "Vehicle with this number already exists" });
//     }

//     let featuresArray = [];
//     if (features) {
//       if (Array.isArray(features)) featuresArray = features;
//       else if (typeof features === "string") featuresArray = features.split(",").map(f => f.trim()).filter(f => f);
//     }

//     const vehiclePhotos = [];
//     if (req.files && req.files.vehiclePhotos) {
//       const photoLabels = ["Front View", "Inside View", "Rear View", "Side View", "Extra View"];
//       req.files.vehiclePhotos.forEach((file, index) => {
//         vehiclePhotos.push({
//           filename: file.filename,
//           originalName: file.originalname,
//           path: file.path,
//           url: `/uploads/user-vehicles/${file.filename}`,
//           label: photoLabels[index] || `Photo ${index + 1}`,
//           uploadedAt: new Date(),
//         });
//       });
//     }

//     let citizenshipFront = null, citizenshipBack = null, passportPhoto = null;
//     if (req.files && req.files.citizenshipFront) {
//       citizenshipFront = { filename: req.files.citizenshipFront[0].filename, originalName: req.files.citizenshipFront[0].originalname, path: req.files.citizenshipFront[0].path, url: `/uploads/user-vehicles/${req.files.citizenshipFront[0].filename}`, uploadedAt: new Date() };
//     }
//     if (req.files && req.files.citizenshipBack) {
//       citizenshipBack = { filename: req.files.citizenshipBack[0].filename, originalName: req.files.citizenshipBack[0].originalname, path: req.files.citizenshipBack[0].path, url: `/uploads/user-vehicles/${req.files.citizenshipBack[0].filename}`, uploadedAt: new Date() };
//     }
//     if (req.files && req.files.passportPhoto) {
//       passportPhoto = { filename: req.files.passportPhoto[0].filename, originalName: req.files.passportPhoto[0].originalname, path: req.files.passportPhoto[0].path, url: `/uploads/user-vehicles/${req.files.passportPhoto[0].filename}`, uploadedAt: new Date() };
//     }

//     const documents = [];
//     const docMapping = { blueBook: { type: "bluebook", label: "Blue Book (Registration)" }, insurance: { type: "insurance", label: "Insurance Certificate" }, pollution: { type: "pollution", label: "Pollution Certificate" } };
//     if (req.files) {
//       Object.keys(docMapping).forEach((docKey) => {
//         if (req.files[docKey] && req.files[docKey][0]) {
//           const file = req.files[docKey][0];
//           documents.push({ type: docMapping[docKey].type, label: docMapping[docKey].label, filename: file.filename, originalName: file.originalname, path: file.path, url: `/uploads/user-vehicles/${file.filename}`, uploadedAt: new Date() });
//         }
//       });
//     }

//     const userVehicle = new UserVehicle({
//       user: userId, carName, carNumber, carType, ratePerDay: Number(ratePerDay), seats: Number(seats),
//       bookingType: bookingType || "Both", gearType: gearType || "Automatic", airCondition: airCondition || "Yes",
//       description: description || "", features: featuresArray, vehiclePhotos, citizenshipFront, citizenshipBack,
//       passportPhoto, fullName, citizenshipNumber, phoneNumber, address, city, district: district || "",
//       documents, status: "pending", isListed: false,
//     });

//     await userVehicle.save();
//     await createNotification(userId, "Vehicle Listed for Approval 🚗", `Your vehicle ${carName} (${carNumber}) has been submitted for admin approval.`, "info", "Awaiting verification", { vehicleId: userVehicle._id });

//     res.status(201).json({ success: true, message: "Vehicle listing submitted successfully. Awaiting admin approval.", data: { vehicleId: userVehicle._id, status: userVehicle.status } });
//   } catch (error) {
//     console.error("List vehicle error:", error);
//     res.status(500).json({ success: false, message: "Failed to list vehicle" });
//   }
// };

// export const getUserVehicles = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { status, page = 1, limit = 10 } = req.query;
//     const query = { user: userId };
//     if (status) query.status = status;
//     const skip = (page - 1) * limit;
//     const vehicles = await UserVehicle.find(query).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)).lean();
//     const total = await UserVehicle.countDocuments(query);
//     res.status(200).json({ success: true, data: { vehicles, pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / limit) } } });
//   } catch (error) {
//     console.error("Get user vehicles error:", error);
//     res.status(500).json({ success: false, message: "Failed to fetch vehicles" });
//   }
// };

// export const getUserVehicleById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user?.id;
//     const isAdmin = req.user?.role === "admin";
//     const vehicle = await UserVehicle.findById(id).lean();
//     if (!vehicle) return res.status(404).json({ success: false, message: "Vehicle not found" });

//     if (vehicle.status === "active" && vehicle.isListed) {
//       if (!isAdmin && vehicle.user.toString() !== userId) {
//         delete vehicle.documents;
//         delete vehicle.citizenshipFront;
//         delete vehicle.citizenshipBack;
//         delete vehicle.passportPhoto;
//       }
//       return res.status(200).json({ success: true, data: vehicle });
//     }
//     if (vehicle.user.toString() !== userId && !isAdmin) {
//       return res.status(403).json({ success: false, message: "This vehicle is not available for booking" });
//     }
//     res.status(200).json({ success: true, data: vehicle });
//   } catch (error) {
//     console.error("Get user vehicle error:", error);
//     res.status(500).json({ success: false, message: "Failed to fetch vehicle" });
//   }
// };

// export const updateUserVehicle = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;
//     const updates = req.body;
//     const vehicle = await UserVehicle.findOne({ _id: id, user: userId });
//     if (!vehicle) return res.status(404).json({ success: false, message: "Vehicle not found" });
//     if (!["pending", "rejected"].includes(vehicle.status)) {
//       return res.status(400).json({ success: false, message: "Vehicle cannot be updated in its current status" });
//     }

//     const allowedUpdates = ["carName", "carNumber", "carType", "ratePerDay", "seats", "bookingType", "gearType", "airCondition", "description", "features", "fullName", "citizenshipNumber", "phoneNumber", "address", "city", "district"];
//     allowedUpdates.forEach((field) => { if (updates[field] !== undefined) vehicle[field] = updates[field]; });
//     if (updates.features) {
//       if (Array.isArray(updates.features)) vehicle.features = updates.features;
//       else if (typeof updates.features === "string") vehicle.features = updates.features.split(",").map(f => f.trim()).filter(f => f);
//     }
//     await vehicle.save();
//     await createNotification(userId, "Vehicle Updated ✏️", `Your vehicle ${vehicle.carName} has been updated.`, "info", `Car Number: ${vehicle.carNumber}`, { vehicleId: vehicle._id });
//     res.status(200).json({ success: true, message: "Vehicle updated successfully", data: vehicle });
//   } catch (error) {
//     console.error("Update user vehicle error:", error);
//     res.status(500).json({ success: false, message: "Failed to update vehicle" });
//   }
// };

// export const deleteUserVehicle = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;
//     const vehicle = await UserVehicle.findOne({ _id: id, user: userId });
//     if (!vehicle) return res.status(404).json({ success: false, message: "Vehicle not found" });
//     if (!["pending", "rejected"].includes(vehicle.status)) {
//       return res.status(400).json({ success: false, message: "Vehicle cannot be deleted in its current status" });
//     }

//     const allFiles = [...vehicle.vehiclePhotos];
//     if (vehicle.citizenshipFront) allFiles.push(vehicle.citizenshipFront);
//     if (vehicle.citizenshipBack) allFiles.push(vehicle.citizenshipBack);
//     if (vehicle.passportPhoto) allFiles.push(vehicle.passportPhoto);
//     if (vehicle.documents) allFiles.push(...vehicle.documents);
//     allFiles.forEach((file) => {
//       if (file && file.filename) {
//         const filePath = path.join(__dirname, "../../uploads/user-vehicles", file.filename);
//         if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
//       }
//     });
//     await vehicle.deleteOne();
//     await createNotification(userId, "Vehicle Deleted 🗑️", `Your vehicle ${vehicle.carName} has been deleted.`, "error", `Car Number: ${vehicle.carNumber}`, { vehicleId: vehicle._id });
//     res.status(200).json({ success: true, message: "Vehicle deleted successfully" });
//   } catch (error) {
//     console.error("Delete user vehicle error:", error);
//     res.status(500).json({ success: false, message: "Failed to delete vehicle" });
//   }
// };

// export const getAllUserVehicles = async (req, res) => {
//   try {
//     const { status, page = 1, limit = 20 } = req.query;
//     const query = {};
//     if (status) query.status = status;
//     const skip = (page - 1) * limit;
//     const vehicles = await UserVehicle.find(query).populate("user", "name email phone").sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)).lean();
//     const total = await UserVehicle.countDocuments(query);
//     res.status(200).json({ success: true, data: { vehicles, pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / limit) } } });
//   } catch (error) {
//     console.error("Get all user vehicles error:", error);
//     res.status(500).json({ success: false, message: "Failed to fetch vehicles" });
//   }
// };

// export const approveUserVehicle = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const adminId = req.user.id;
//     const vehicle = await UserVehicle.findById(id).populate("user", "name email");
//     if (!vehicle) return res.status(404).json({ success: false, message: "Vehicle not found" });
//     if (vehicle.status !== "pending") return res.status(400).json({ success: false, message: `Vehicle cannot be approved in ${vehicle.status} status` });

//     vehicle.status = "approved";
//     vehicle.isListed = true;
//     vehicle.listedAt = new Date();
//     vehicle.approvedBy = adminId;
//     vehicle.approvedAt = new Date();
//     await vehicle.save();

//     await createNotification(vehicle.user._id, "Vehicle Approved! 🚗", `Your vehicle ${vehicle.carName} (${vehicle.carNumber}) has been approved and is now listed for rent.`, "success", `Rate: रु ${vehicle.ratePerDay}/day`, { vehicleId: vehicle._id });
//     res.status(200).json({ success: true, message: "Vehicle approved successfully", data: vehicle });
//   } catch (error) {
//     console.error("Approve user vehicle error:", error);
//     res.status(500).json({ success: false, message: "Failed to approve vehicle" });
//   }
// };

// export const rejectUserVehicle = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { reason } = req.body;
//     const adminId = req.user.id;
//     const vehicle = await UserVehicle.findById(id).populate("user", "name email");
//     if (!vehicle) return res.status(404).json({ success: false, message: "Vehicle not found" });
//     if (vehicle.status !== "pending") return res.status(400).json({ success: false, message: `Vehicle cannot be rejected in ${vehicle.status} status` });

//     vehicle.status = "rejected";
//     vehicle.rejectionReason = reason;
//     vehicle.isListed = false;
//     vehicle.approvedBy = adminId;
//     vehicle.approvedAt = new Date();
//     await vehicle.save();

//     await createNotification(vehicle.user._id, "Vehicle Rejected ❌", `Your vehicle ${vehicle.carName} (${vehicle.carNumber}) has been rejected. Reason: ${reason}`, "error", "Please update and resubmit", { vehicleId: vehicle._id, rejectionReason: reason });
//     res.status(200).json({ success: true, message: "Vehicle rejected successfully", data: vehicle });
//   } catch (error) {
//     console.error("Reject user vehicle error:", error);
//     res.status(500).json({ success: false, message: "Failed to reject vehicle" });
//   }
// };

// export const activateUserVehicle = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const vehicle = await UserVehicle.findById(id).populate("user", "name email");
//     if (!vehicle) return res.status(404).json({ success: false, message: "Vehicle not found" });
//     if (vehicle.status !== "approved" && vehicle.status !== "inactive") {
//       return res.status(400).json({ success: false, message: `Vehicle cannot be activated from ${vehicle.status} status` });
//     }
//     vehicle.status = "active";
//     vehicle.isListed = true;
//     await vehicle.save();
//     await createNotification(vehicle.user._id, "Vehicle Activated! 🚗", `Your vehicle ${vehicle.carName} (${vehicle.carNumber}) has been activated and is now available for rent.`, "success", `Rate: रु ${vehicle.ratePerDay}/day`, { vehicleId: vehicle._id });
//     res.status(200).json({ success: true, message: "Vehicle activated successfully", data: vehicle });
//   } catch (error) {
//     console.error("Activate vehicle error:", error);
//     res.status(500).json({ success: false, message: "Failed to activate vehicle" });
//   }
// };

// export const deactivateUserVehicle = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const vehicle = await UserVehicle.findById(id).populate("user", "name email");
//     if (!vehicle) return res.status(404).json({ success: false, message: "Vehicle not found" });
//     if (vehicle.status !== "active") return res.status(400).json({ success: false, message: `Vehicle cannot be deactivated from ${vehicle.status} status` });
//     vehicle.status = "inactive";
//     vehicle.isListed = false;
//     await vehicle.save();
//     await createNotification(vehicle.user._id, "Vehicle Deactivated ⏸️", `Your vehicle ${vehicle.carName} (${vehicle.carNumber}) has been deactivated.`, "warning", "Contact admin for more information", { vehicleId: vehicle._id });
//     res.status(200).json({ success: true, message: "Vehicle deactivated successfully", data: vehicle });
//   } catch (error) {
//     console.error("Deactivate vehicle error:", error);
//     res.status(500).json({ success: false, message: "Failed to deactivate vehicle" });
//   }
// };

// export const deleteUserVehicleAdmin = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const vehicle = await UserVehicle.findById(id).populate("user", "name email");
//     if (!vehicle) return res.status(404).json({ success: false, message: "Vehicle not found" });

//     const allFiles = [...vehicle.vehiclePhotos];
//     if (vehicle.citizenshipFront) allFiles.push(vehicle.citizenshipFront);
//     if (vehicle.citizenshipBack) allFiles.push(vehicle.citizenshipBack);
//     if (vehicle.passportPhoto) allFiles.push(vehicle.passportPhoto);
//     if (vehicle.documents) allFiles.push(...vehicle.documents);
//     allFiles.forEach((file) => {
//       if (file && file.filename) {
//         const filePath = path.join(__dirname, "../../uploads/user-vehicles", file.filename);
//         if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
//       }
//     });
//     await vehicle.deleteOne();
//     await createNotification(vehicle.user._id, "Vehicle Deleted 🗑️", `Your vehicle ${vehicle.carName} (${vehicle.carNumber}) has been permanently deleted.`, "error", "Vehicle listing removed", { vehicleId: vehicle._id });
//     res.status(200).json({ success: true, message: "Vehicle deleted permanently" });
//   } catch (error) {
//     console.error("Delete vehicle error:", error);
//     res.status(500).json({ success: false, message: "Failed to delete vehicle" });
//   }
// };

// export const getUserEarnings = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const userVehicles = await UserVehicle.find({ user: userId, isListed: true }).lean();
//     if (userVehicles.length === 0) {
//       return res.json({ success: true, data: { totalEarnings: 0, totalBookings: 0, grossRevenue: 0, averagePerBooking: 0, vehicles: [], recentTransactions: [] } });
//     }

//     let totalEarnings = 0, totalBookings = 0, grossRevenue = 0;
//     const vehiclesEarnings = [], allTransactions = [];

//     for (const vehicle of userVehicles) {
//       const bookings = await Booking.find({ vehicle: vehicle._id, vehicleType: "user", paymentStatus: "paid", status: { $in: ["confirmed", "completed", "active"] } }).populate("user", "name email phone").lean();
//       const vehicleGrossRevenue = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
//       const vehicleOwnerEarnings = vehicleGrossRevenue * 0.7;
//       totalEarnings += vehicleOwnerEarnings;
//       totalBookings += bookings.length;
//       grossRevenue += vehicleGrossRevenue;
//       vehiclesEarnings.push({ vehicle: { carName: vehicle.carName, carNumber: vehicle.carNumber, vehiclePhotos: vehicle.vehiclePhotos || [] }, totalBookings: bookings.length, grossRevenue: Math.round(vehicleGrossRevenue), ownerEarnings: Math.round(vehicleOwnerEarnings), bookings: bookings.map(b => ({ _id: b._id, confirmationCode: b.confirmationCode, totalAmount: b.totalAmount, user: b.user, createdAt: b.createdAt })) });
//       bookings.forEach(booking => { allTransactions.push({ _id: booking._id, confirmationCode: booking.confirmationCode, totalAmount: booking.totalAmount, user: booking.user, createdAt: booking.createdAt, ownerEarnings: Math.round(booking.totalAmount * 0.7), vehicle: { carName: vehicle.carName, carNumber: vehicle.carNumber, vehiclePhotos: vehicle.vehiclePhotos || [] } }); });
//     }
//     allTransactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//     res.json({ success: true, data: { totalEarnings: Math.round(totalEarnings), totalBookings, grossRevenue: Math.round(grossRevenue), averagePerBooking: totalBookings > 0 ? Math.round(totalEarnings / totalBookings) : 0, vehicles: vehiclesEarnings, recentTransactions: allTransactions.slice(0, 10) } });
//   } catch (error) {
//     console.error("Get user earnings error:", error);
//     res.status(500).json({ success: false, message: "Failed to fetch earnings data" });
//   }
// };

// export const markVehicleAsBooked = async (vehicleId) => {
//   try {
//     const vehicle = await UserVehicle.findById(vehicleId);
//     if (!vehicle) return null;
//     vehicle.status = "booked";
//     vehicle.isListed = false;
//     await vehicle.save();
//     console.log(`✅ Vehicle ${vehicle.carName} marked as booked`);
//     return vehicle;
//   } catch (error) {
//     console.error("Error marking vehicle as booked:", error);
//     return null;
//   }
// };

// export const markVehicleAsAvailable = async (vehicleId) => {
//   try {
//     const vehicle = await UserVehicle.findById(vehicleId);
//     if (!vehicle) return null;
//     vehicle.status = "active";
//     vehicle.isListed = true;
//     await vehicle.save();
//     console.log(`✅ Vehicle ${vehicle.carName} marked as available`);
//     return vehicle;
//   } catch (error) {
//     console.error("Error marking vehicle as available:", error);
//     return null;
//   }
// };

// export const getAvailableVehicleForBooking = async (vehicleId) => {
//   try {
//     return await UserVehicle.findOne({ _id: vehicleId, status: "active", isListed: true });
//   } catch (error) {
//     console.error("Error getting available vehicle:", error);
//     return null;
//   }
// };

// export const fixVehicleStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status, isListed } = req.body;
//     const vehicle = await UserVehicle.findById(id);
//     if (!vehicle) return res.status(404).json({ success: false, message: "Vehicle not found" });
//     if (status) vehicle.status = status;
//     if (isListed !== undefined) vehicle.isListed = isListed;
//     await vehicle.save();
//     res.status(200).json({ success: true, message: "Vehicle status fixed successfully", data: { status: vehicle.status, isListed: vehicle.isListed } });
//   } catch (error) {
//     console.error("Fix vehicle status error:", error);
//     res.status(500).json({ success: false, message: "Failed to fix vehicle status" });
//   }
// };






import UserVehicle from "../models/UserVehicle.js";
import Booking from "../models/Booking.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createNotification } from "../utils/notificationHelper.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const listVehicle = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      carName, carNumber, carType, ratePerDay, seats, bookingType,
      gearType, airCondition, description, features, fullName,
      citizenshipNumber, phoneNumber, address, city, district,
    } = req.body;

    if (!carName || !carNumber || !ratePerDay || !fullName || !citizenshipNumber || !phoneNumber || !address || !city) {
      return res.status(400).json({ success: false, message: "Please fill in all required fields" });
    }

    const existingVehicle = await UserVehicle.findOne({ carNumber });
    if (existingVehicle) {
      return res.status(400).json({ success: false, message: "Vehicle with this number already exists" });
    }

    let featuresArray = [];
    if (features) {
      if (Array.isArray(features)) featuresArray = features;
      else if (typeof features === "string") featuresArray = features.split(",").map(f => f.trim()).filter(f => f);
    }

    const vehiclePhotos = [];
    if (req.files && req.files.vehiclePhotos) {
      const photoLabels = ["Front View", "Inside View", "Rear View", "Side View", "Extra View"];
      req.files.vehiclePhotos.forEach((file, index) => {
        vehiclePhotos.push({
          filename: file.filename,
          originalName: file.originalname,
          path: file.path,
          url: `/uploads/user-vehicles/${file.filename}`,
          label: photoLabels[index] || `Photo ${index + 1}`,
          uploadedAt: new Date(),
        });
      });
    }

    let citizenshipFront = null, citizenshipBack = null, passportPhoto = null;
    if (req.files && req.files.citizenshipFront) {
      citizenshipFront = { filename: req.files.citizenshipFront[0].filename, originalName: req.files.citizenshipFront[0].originalname, path: req.files.citizenshipFront[0].path, url: `/uploads/user-vehicles/${req.files.citizenshipFront[0].filename}`, uploadedAt: new Date() };
    }
    if (req.files && req.files.citizenshipBack) {
      citizenshipBack = { filename: req.files.citizenshipBack[0].filename, originalName: req.files.citizenshipBack[0].originalname, path: req.files.citizenshipBack[0].path, url: `/uploads/user-vehicles/${req.files.citizenshipBack[0].filename}`, uploadedAt: new Date() };
    }
    if (req.files && req.files.passportPhoto) {
      passportPhoto = { filename: req.files.passportPhoto[0].filename, originalName: req.files.passportPhoto[0].originalname, path: req.files.passportPhoto[0].path, url: `/uploads/user-vehicles/${req.files.passportPhoto[0].filename}`, uploadedAt: new Date() };
    }

    const documents = [];
    const docMapping = { blueBook: { type: "bluebook", label: "Blue Book (Registration)" }, insurance: { type: "insurance", label: "Insurance Certificate" }, pollution: { type: "pollution", label: "Pollution Certificate" } };
    if (req.files) {
      Object.keys(docMapping).forEach((docKey) => {
        if (req.files[docKey] && req.files[docKey][0]) {
          const file = req.files[docKey][0];
          documents.push({ type: docMapping[docKey].type, label: docMapping[docKey].label, filename: file.filename, originalName: file.originalname, path: file.path, url: `/uploads/user-vehicles/${file.filename}`, uploadedAt: new Date() });
        }
      });
    }

    const userVehicle = new UserVehicle({
      user: userId, carName, carNumber, carType, ratePerDay: Number(ratePerDay), seats: Number(seats),
      bookingType: bookingType || "Both", gearType: gearType || "Automatic", airCondition: airCondition || "Yes",
      description: description || "", features: featuresArray, vehiclePhotos, citizenshipFront, citizenshipBack,
      passportPhoto, fullName, citizenshipNumber, phoneNumber, address, city, district: district || "",
      documents, status: "pending", isListed: false,
    });

    await userVehicle.save();
    await createNotification(userId, "Vehicle Listed for Approval 🚗", `Your vehicle ${carName} (${carNumber}) has been submitted for admin approval.`, "info", "Awaiting verification", { vehicleId: userVehicle._id });

    res.status(201).json({ success: true, message: "Vehicle listing submitted successfully. Awaiting admin approval.", data: { vehicleId: userVehicle._id, status: userVehicle.status } });
  } catch (error) {
    console.error("List vehicle error:", error);
    res.status(500).json({ success: false, message: "Failed to list vehicle" });
  }
};

export const getUserVehicles = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status, page = 1, limit = 10 } = req.query;
    const query = { user: userId };
    if (status) query.status = status;
    const skip = (page - 1) * limit;
    const vehicles = await UserVehicle.find(query).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)).lean();
    const total = await UserVehicle.countDocuments(query);
    res.status(200).json({ success: true, data: { vehicles, pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / limit) } } });
  } catch (error) {
    console.error("Get user vehicles error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch vehicles" });
  }
};

export const getUserVehicleById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const isAdmin = req.user?.role === "admin";
    const vehicle = await UserVehicle.findById(id).lean();
    if (!vehicle) return res.status(404).json({ success: false, message: "Vehicle not found" });

    if (vehicle.status === "active" && vehicle.isListed) {
      if (!isAdmin && vehicle.user.toString() !== userId) {
        delete vehicle.documents;
        delete vehicle.citizenshipFront;
        delete vehicle.citizenshipBack;
        delete vehicle.passportPhoto;
      }
      return res.status(200).json({ success: true, data: vehicle });
    }
    if (vehicle.user.toString() !== userId && !isAdmin) {
      return res.status(403).json({ success: false, message: "This vehicle is not available for booking" });
    }
    res.status(200).json({ success: true, data: vehicle });
  } catch (error) {
    console.error("Get user vehicle error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch vehicle" });
  }
};

export const updateUserVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const updates = req.body;
    const vehicle = await UserVehicle.findOne({ _id: id, user: userId });
    if (!vehicle) return res.status(404).json({ success: false, message: "Vehicle not found" });
    if (!["pending", "rejected"].includes(vehicle.status)) {
      return res.status(400).json({ success: false, message: "Vehicle cannot be updated in its current status" });
    }

    const allowedUpdates = ["carName", "carNumber", "carType", "ratePerDay", "seats", "bookingType", "gearType", "airCondition", "description", "features", "fullName", "citizenshipNumber", "phoneNumber", "address", "city", "district"];
    allowedUpdates.forEach((field) => { if (updates[field] !== undefined) vehicle[field] = updates[field]; });
    if (updates.features) {
      if (Array.isArray(updates.features)) vehicle.features = updates.features;
      else if (typeof updates.features === "string") vehicle.features = updates.features.split(",").map(f => f.trim()).filter(f => f);
    }
    await vehicle.save();
    await createNotification(userId, "Vehicle Updated ✏️", `Your vehicle ${vehicle.carName} has been updated.`, "info", `Car Number: ${vehicle.carNumber}`, { vehicleId: vehicle._id });
    res.status(200).json({ success: true, message: "Vehicle updated successfully", data: vehicle });
  } catch (error) {
    console.error("Update user vehicle error:", error);
    res.status(500).json({ success: false, message: "Failed to update vehicle" });
  }
};

export const deleteUserVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const vehicle = await UserVehicle.findOne({ _id: id, user: userId });
    if (!vehicle) return res.status(404).json({ success: false, message: "Vehicle not found" });
    if (!["pending", "rejected"].includes(vehicle.status)) {
      return res.status(400).json({ success: false, message: "Vehicle cannot be deleted in its current status" });
    }

    const allFiles = [...vehicle.vehiclePhotos];
    if (vehicle.citizenshipFront) allFiles.push(vehicle.citizenshipFront);
    if (vehicle.citizenshipBack) allFiles.push(vehicle.citizenshipBack);
    if (vehicle.passportPhoto) allFiles.push(vehicle.passportPhoto);
    if (vehicle.documents) allFiles.push(...vehicle.documents);
    allFiles.forEach((file) => {
      if (file && file.filename) {
        const filePath = path.join(__dirname, "../../uploads/user-vehicles", file.filename);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }
    });
    await vehicle.deleteOne();
    await createNotification(userId, "Vehicle Deleted 🗑️", `Your vehicle ${vehicle.carName} has been deleted.`, "error", `Car Number: ${vehicle.carNumber}`, { vehicleId: vehicle._id });
    res.status(200).json({ success: true, message: "Vehicle deleted successfully" });
  } catch (error) {
    console.error("Delete user vehicle error:", error);
    res.status(500).json({ success: false, message: "Failed to delete vehicle" });
  }
};

// FIXED: This function now filters out vehicles owned by the requesting user
// export const getAllUserVehicles = async (req, res) => {
//   try {
//     const { status, page = 1, limit = 20 } = req.query;
//     const query = {};
    
//     // Only show active and listed vehicles for public viewing
//     query.status = "active";
//     query.isListed = true;
    
//     // If specific status is requested and user is admin, allow filtering
//     if (status && req.user?.role === "admin") {
//       query.status = status;
//     }
    
//     const skip = (page - 1) * limit;
    
//     // Get current user ID from token (if logged in)
//     const currentUserId = req.user?.id;
    
//     // Fetch vehicles
//     let vehicles = await UserVehicle.find(query)
//       .populate("user", "name email phone")
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(parseInt(limit))
//       .lean();
    
//     // Filter out vehicles owned by the current user (if logged in)
//     if (currentUserId) {
//       const originalCount = vehicles.length;
//       vehicles = vehicles.filter(vehicle => {
//         const vehicleOwnerId = vehicle.user?._id?.toString() || vehicle.user?.toString();
//         const isNotOwnVehicle = vehicleOwnerId !== currentUserId;
//         if (!isNotOwnVehicle) {
//           console.log(`🚫 Filtering out own vehicle: ${vehicle.carName} (Owner: ${vehicleOwnerId})`);
//         }
//         return isNotOwnVehicle;
//       });
//       console.log(`✅ Showing ${vehicles.length} out of ${originalCount} vehicles (excluded own vehicles)`);
//     }
    
//     const total = await UserVehicle.countDocuments(query);
    
//     res.status(200).json({ 
//       success: true, 
//       data: vehicles,
//       pagination: { 
//         page: parseInt(page), 
//         limit: parseInt(limit), 
//         total, 
//         pages: Math.ceil(total / limit) 
//       } 
//     });
//   } catch (error) {
//     console.error("Get all user vehicles error:", error);
//     res.status(500).json({ success: false, message: "Failed to fetch vehicles" });
//   }
// };



// Get all user vehicles (admin) - FIXED to return proper structure
export const getAllUserVehicles = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    const query = {};
    if (status && status !== 'all') {
      query.status = status;
    }

    const skip = (page - 1) * limit;

    const vehicles = await UserVehicle.find(query)
      .populate("user", "name email phone")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    console.log(`📊 Found ${vehicles.length} user vehicles`);
    
    // Log each vehicle's status for debugging
    vehicles.forEach(v => {
      console.log(`- ${v.carName}: status = ${v.status}, isListed = ${v.isListed}`);
    });

    const total = await UserVehicle.countDocuments(query);

    // Return in the expected format
    res.status(200).json({
      success: true,
      data: {
        vehicles: vehicles,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error("Get all user vehicles error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch vehicles",
      error: error.message,
    });
  }
};

// NEW: Public endpoint for home page that excludes owner's own vehicles
export const getPublicVehicles = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    
    // Only fetch active and listed vehicles
    const query = {
      status: "active",
      isListed: true
    };
    
    const skip = (page - 1) * limit;
    
    // Get current user ID from token (if logged in)
    const currentUserId = req.user?.id;
    
    // Fetch vehicles with user info (excluding sensitive data)
    let vehicles = await UserVehicle.find(query)
      .select("-documents -citizenshipFront -citizenshipBack -passportPhoto")
      .populate("user", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();
    
    // Filter out vehicles owned by the current user (if logged in)
    if (currentUserId) {
      const originalCount = vehicles.length;
      vehicles = vehicles.filter(vehicle => {
        const vehicleOwnerId = vehicle.user?._id?.toString() || vehicle.user?.toString();
        return vehicleOwnerId !== currentUserId;
      });
      console.log(`📊 Public vehicles: Showing ${vehicles.length} out of ${originalCount} (excluded ${originalCount - vehicles.length} own vehicles)`);
    }
    
    const total = await UserVehicle.countDocuments(query);
    
    res.status(200).json({ 
      success: true, 
      data: vehicles,
      pagination: { 
        page: parseInt(page), 
        limit: parseInt(limit), 
        total, 
        pages: Math.ceil(total / limit) 
      } 
    });
  } catch (error) {
    console.error("Get public vehicles error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch vehicles" });
  }
};

export const approveUserVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const adminId = req.user.id;
    const vehicle = await UserVehicle.findById(id).populate("user", "name email");
    if (!vehicle) return res.status(404).json({ success: false, message: "Vehicle not found" });
    if (vehicle.status !== "pending") return res.status(400).json({ success: false, message: `Vehicle cannot be approved in ${vehicle.status} status` });

    vehicle.status = "approved";
    vehicle.isListed = true;
    vehicle.listedAt = new Date();
    vehicle.approvedBy = adminId;
    vehicle.approvedAt = new Date();
    await vehicle.save();

    await createNotification(vehicle.user._id, "Vehicle Approved! 🚗", `Your vehicle ${vehicle.carName} (${vehicle.carNumber}) has been approved and is now listed for rent.`, "success", `Rate: रु ${vehicle.ratePerDay}/day`, { vehicleId: vehicle._id });
    res.status(200).json({ success: true, message: "Vehicle approved successfully", data: vehicle });
  } catch (error) {
    console.error("Approve user vehicle error:", error);
    res.status(500).json({ success: false, message: "Failed to approve vehicle" });
  }
};

export const rejectUserVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    const adminId = req.user.id;
    const vehicle = await UserVehicle.findById(id).populate("user", "name email");
    if (!vehicle) return res.status(404).json({ success: false, message: "Vehicle not found" });
    if (vehicle.status !== "pending") return res.status(400).json({ success: false, message: `Vehicle cannot be rejected in ${vehicle.status} status` });

    vehicle.status = "rejected";
    vehicle.rejectionReason = reason;
    vehicle.isListed = false;
    vehicle.approvedBy = adminId;
    vehicle.approvedAt = new Date();
    await vehicle.save();

    await createNotification(vehicle.user._id, "Vehicle Rejected ❌", `Your vehicle ${vehicle.carName} (${vehicle.carNumber}) has been rejected. Reason: ${reason}`, "error", "Please update and resubmit", { vehicleId: vehicle._id, rejectionReason: reason });
    res.status(200).json({ success: true, message: "Vehicle rejected successfully", data: vehicle });
  } catch (error) {
    console.error("Reject user vehicle error:", error);
    res.status(500).json({ success: false, message: "Failed to reject vehicle" });
  }
};

export const activateUserVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await UserVehicle.findById(id).populate("user", "name email");
    if (!vehicle) return res.status(404).json({ success: false, message: "Vehicle not found" });
    if (vehicle.status !== "approved" && vehicle.status !== "inactive") {
      return res.status(400).json({ success: false, message: `Vehicle cannot be activated from ${vehicle.status} status` });
    }
    vehicle.status = "active";
    vehicle.isListed = true;
    await vehicle.save();
    await createNotification(vehicle.user._id, "Vehicle Activated! 🚗", `Your vehicle ${vehicle.carName} (${vehicle.carNumber}) has been activated and is now available for rent.`, "success", `Rate: रु ${vehicle.ratePerDay}/day`, { vehicleId: vehicle._id });
    res.status(200).json({ success: true, message: "Vehicle activated successfully", data: vehicle });
  } catch (error) {
    console.error("Activate vehicle error:", error);
    res.status(500).json({ success: false, message: "Failed to activate vehicle" });
  }
};

export const deactivateUserVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await UserVehicle.findById(id).populate("user", "name email");
    if (!vehicle) return res.status(404).json({ success: false, message: "Vehicle not found" });
    if (vehicle.status !== "active") return res.status(400).json({ success: false, message: `Vehicle cannot be deactivated from ${vehicle.status} status` });
    vehicle.status = "inactive";
    vehicle.isListed = false;
    await vehicle.save();
    await createNotification(vehicle.user._id, "Vehicle Deactivated ⏸️", `Your vehicle ${vehicle.carName} (${vehicle.carNumber}) has been deactivated.`, "warning", "Contact admin for more information", { vehicleId: vehicle._id });
    res.status(200).json({ success: true, message: "Vehicle deactivated successfully", data: vehicle });
  } catch (error) {
    console.error("Deactivate vehicle error:", error);
    res.status(500).json({ success: false, message: "Failed to deactivate vehicle" });
  }
};

export const deleteUserVehicleAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await UserVehicle.findById(id).populate("user", "name email");
    if (!vehicle) return res.status(404).json({ success: false, message: "Vehicle not found" });

    const allFiles = [...vehicle.vehiclePhotos];
    if (vehicle.citizenshipFront) allFiles.push(vehicle.citizenshipFront);
    if (vehicle.citizenshipBack) allFiles.push(vehicle.citizenshipBack);
    if (vehicle.passportPhoto) allFiles.push(vehicle.passportPhoto);
    if (vehicle.documents) allFiles.push(...vehicle.documents);
    allFiles.forEach((file) => {
      if (file && file.filename) {
        const filePath = path.join(__dirname, "../../uploads/user-vehicles", file.filename);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }
    });
    await vehicle.deleteOne();
    await createNotification(vehicle.user._id, "Vehicle Deleted 🗑️", `Your vehicle ${vehicle.carName} (${vehicle.carNumber}) has been permanently deleted.`, "error", "Vehicle listing removed", { vehicleId: vehicle._id });
    res.status(200).json({ success: true, message: "Vehicle deleted permanently" });
  } catch (error) {
    console.error("Delete vehicle error:", error);
    res.status(500).json({ success: false, message: "Failed to delete vehicle" });
  }
};

export const getUserEarnings = async (req, res) => {
  try {
    const userId = req.user.id;
    const userVehicles = await UserVehicle.find({ user: userId, isListed: true }).lean();
    if (userVehicles.length === 0) {
      return res.json({ success: true, data: { totalEarnings: 0, totalBookings: 0, grossRevenue: 0, averagePerBooking: 0, vehicles: [], recentTransactions: [] } });
    }

    let totalEarnings = 0, totalBookings = 0, grossRevenue = 0;
    const vehiclesEarnings = [], allTransactions = [];

    for (const vehicle of userVehicles) {
      const bookings = await Booking.find({ vehicle: vehicle._id, vehicleType: "user", paymentStatus: "paid", status: { $in: ["confirmed", "completed", "active"] } }).populate("user", "name email phone").lean();
      const vehicleGrossRevenue = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
      const vehicleOwnerEarnings = vehicleGrossRevenue * 0.7;
      totalEarnings += vehicleOwnerEarnings;
      totalBookings += bookings.length;
      grossRevenue += vehicleGrossRevenue;
      vehiclesEarnings.push({ vehicle: { carName: vehicle.carName, carNumber: vehicle.carNumber, vehiclePhotos: vehicle.vehiclePhotos || [] }, totalBookings: bookings.length, grossRevenue: Math.round(vehicleGrossRevenue), ownerEarnings: Math.round(vehicleOwnerEarnings), bookings: bookings.map(b => ({ _id: b._id, confirmationCode: b.confirmationCode, totalAmount: b.totalAmount, user: b.user, createdAt: b.createdAt })) });
      bookings.forEach(booking => { allTransactions.push({ _id: booking._id, confirmationCode: booking.confirmationCode, totalAmount: booking.totalAmount, user: booking.user, createdAt: booking.createdAt, ownerEarnings: Math.round(booking.totalAmount * 0.7), vehicle: { carName: vehicle.carName, carNumber: vehicle.carNumber, vehiclePhotos: vehicle.vehiclePhotos || [] } }); });
    }
    allTransactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json({ success: true, data: { totalEarnings: Math.round(totalEarnings), totalBookings, grossRevenue: Math.round(grossRevenue), averagePerBooking: totalBookings > 0 ? Math.round(totalEarnings / totalBookings) : 0, vehicles: vehiclesEarnings, recentTransactions: allTransactions.slice(0, 10) } });
  } catch (error) {
    console.error("Get user earnings error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch earnings data" });
  }
};

export const markVehicleAsBooked = async (vehicleId) => {
  try {
    const vehicle = await UserVehicle.findById(vehicleId);
    if (!vehicle) return null;
    vehicle.status = "booked";
    vehicle.isListed = false;
    await vehicle.save();
    console.log(`✅ Vehicle ${vehicle.carName} marked as booked`);
    return vehicle;
  } catch (error) {
    console.error("Error marking vehicle as booked:", error);
    return null;
  }
};

export const markVehicleAsAvailable = async (vehicleId) => {
  try {
    const vehicle = await UserVehicle.findById(vehicleId);
    if (!vehicle) return null;
    vehicle.status = "active";
    vehicle.isListed = true;
    await vehicle.save();
    console.log(`✅ Vehicle ${vehicle.carName} marked as available`);
    return vehicle;
  } catch (error) {
    console.error("Error marking vehicle as available:", error);
    return null;
  }
};

export const getAvailableVehicleForBooking = async (vehicleId) => {
  try {
    return await UserVehicle.findOne({ _id: vehicleId, status: "active", isListed: true });
  } catch (error) {
    console.error("Error getting available vehicle:", error);
    return null;
  }
};

export const fixVehicleStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, isListed } = req.body;
    const vehicle = await UserVehicle.findById(id);
    if (!vehicle) return res.status(404).json({ success: false, message: "Vehicle not found" });
    if (status) vehicle.status = status;
    if (isListed !== undefined) vehicle.isListed = isListed;
    await vehicle.save();
    res.status(200).json({ success: true, message: "Vehicle status fixed successfully", data: { status: vehicle.status, isListed: vehicle.isListed } });
  } catch (error) {
    console.error("Fix vehicle status error:", error);
    res.status(500).json({ success: false, message: "Failed to fix vehicle status" });
  }
};