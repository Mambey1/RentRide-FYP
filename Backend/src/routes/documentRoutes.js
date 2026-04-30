// import express from "express";
// import multer from "multer";
// import path from "path";
// import { fileURLToPath } from "url";
// import { protect } from "../middleware/authMiddleware.js";
// import Document from "../models/Document.js";
// import Booking from "../models/Booking.js";
// import Vehicle from "../models/Vehicle.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const router = express.Router();

// // Configure multer for file upload
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(__dirname, "../../uploads/documents");
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const ext = path.extname(file.originalname);
//     cb(null, file.fieldname + "-" + uniqueSuffix + ext);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = [
//     "image/jpeg",
//     "image/jpg",
//     "image/png",
//     "application/pdf",
//   ];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Invalid file type. Only JPEG, PNG, and PDF are allowed."));
//   }
// };

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
// });

// // Upload documents - MATCH THE FIELD NAMES FROM FRONTEND
// router.post(
//   "/upload",
//   protect,
//   upload.fields([
//     { name: "citizenshipFront", maxCount: 1 },
//     { name: "citizenshipBack", maxCount: 1 },
//     { name: "licenseFront", maxCount: 1 },
//     { name: "licenseBack", maxCount: 1 },
//   ]),
//   async (req, res) => {
//     try {
//       console.log("=== Document Upload Request ===");
//       console.log("Files received:", req.files);
//       console.log("Body:", req.body);

//       const { booking, vehicle } = req.body;
//       const userId = req.user.id;

//       // Check if booking exists and belongs to user
//       const bookingDoc = await Booking.findById(booking);
//       if (!bookingDoc) {
//         return res
//           .status(404)
//           .json({ success: false, message: "Booking not found" });
//       }

//       if (bookingDoc.user.toString() !== userId) {
//         return res
//           .status(403)
//           .json({ success: false, message: "Unauthorized" });
//       }

//       // Check if documents already uploaded
//       const existingDocs = await Document.findOne({ booking });
//       if (existingDocs) {
//         return res
//           .status(400)
//           .json({ success: false, message: "Documents already uploaded" });
//       }

//       // Create document record
//       const documentData = {
//         user: userId,
//         booking,
//         vehicle,
//       };

//       // Process citizenship front
//       if (req.files.citizenshipFront && req.files.citizenshipFront[0]) {
//         documentData.citizenshipFront = {
//           filename: req.files.citizenshipFront[0].filename,
//           originalName: req.files.citizenshipFront[0].originalname,
//           path: req.files.citizenshipFront[0].path,
//           url: `/uploads/documents/${req.files.citizenshipFront[0].filename}`,
//           mimetype: req.files.citizenshipFront[0].mimetype,
//           size: req.files.citizenshipFront[0].size,
//           uploadedAt: new Date(),
//         };
//       }

//       // Process citizenship back
//       if (req.files.citizenshipBack && req.files.citizenshipBack[0]) {
//         documentData.citizenshipBack = {
//           filename: req.files.citizenshipBack[0].filename,
//           originalName: req.files.citizenshipBack[0].originalname,
//           path: req.files.citizenshipBack[0].path,
//           url: `/uploads/documents/${req.files.citizenshipBack[0].filename}`,
//           mimetype: req.files.citizenshipBack[0].mimetype,
//           size: req.files.citizenshipBack[0].size,
//           uploadedAt: new Date(),
//         };
//       }

//       // Process license front (if provided)
//       if (req.files.licenseFront && req.files.licenseFront[0]) {
//         documentData.licenseFront = {
//           filename: req.files.licenseFront[0].filename,
//           originalName: req.files.licenseFront[0].originalname,
//           path: req.files.licenseFront[0].path,
//           url: `/uploads/documents/${req.files.licenseFront[0].filename}`,
//           mimetype: req.files.licenseFront[0].mimetype,
//           size: req.files.licenseFront[0].size,
//           uploadedAt: new Date(),
//         };
//       }

//       // Process license back (if provided)
//       if (req.files.licenseBack && req.files.licenseBack[0]) {
//         documentData.licenseBack = {
//           filename: req.files.licenseBack[0].filename,
//           originalName: req.files.licenseBack[0].originalname,
//           path: req.files.licenseBack[0].path,
//           url: `/uploads/documents/${req.files.licenseBack[0].filename}`,
//           mimetype: req.files.licenseBack[0].mimetype,
//           size: req.files.licenseBack[0].size,
//           uploadedAt: new Date(),
//         };
//       }

//       const document = new Document(documentData);
//       await document.save();

//       // Update booking with document reference
//       bookingDoc.documents = document._id;
//       await bookingDoc.save();

//       console.log("✅ Documents uploaded successfully for booking:", booking);

//       res.status(201).json({
//         success: true,
//         message: "Documents uploaded successfully",
//         data: {
//           documentId: document._id,
//           bookingId: booking,
//         },
//       });
//     } catch (error) {
//       console.error("Document upload error:", error);
//       res.status(500).json({
//         success: false,
//         message: "Failed to upload documents",
//         error:
//           process.env.NODE_ENV === "development" ? error.message : undefined,
//       });
//     }
//   },
// );

// // Get documents for a booking
// router.get("/booking/:bookingId", protect, async (req, res) => {
//   try {
//     const { bookingId } = req.params;
//     const userId = req.user.id;
//     const isAdmin = req.user.role === "admin";

//     const booking = await Booking.findById(bookingId);
//     if (!booking) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Booking not found" });
//     }

//     if (!isAdmin && booking.user.toString() !== userId) {
//       return res.status(403).json({ success: false, message: "Unauthorized" });
//     }

//     const documents = await Document.findOne({ booking: bookingId });
//     res.status(200).json({ success: true, data: documents });
//   } catch (error) {
//     console.error("Get documents error:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to fetch documents" });
//   }
// });

// export default router;

import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { protect } from "../middleware/authMiddleware.js";
import Document from "../models/Document.js";
import Booking from "../models/Booking.js";
import BikeBooking from "../models/BikeBooking.js";
import Vehicle from "../models/Vehicle.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../../uploads/documents");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, PNG, and PDF are allowed."));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Upload documents — works for both vehicle AND bike bookings
router.post(
  "/upload",
  protect,
  upload.fields([
    { name: "citizenshipFront", maxCount: 1 },
    { name: "citizenshipBack", maxCount: 1 },
    { name: "licenseFront", maxCount: 1 },
    { name: "licenseBack", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      console.log("=== Document Upload Request ===");
      console.log("Files received:", req.files);
      console.log("Body:", req.body);

      const { booking, vehicle } = req.body;
      const userId = req.user.id;

      // Check vehicle booking first, then bike booking
      let bookingDoc = await Booking.findById(booking);
      let isBikeBooking = false;

      if (!bookingDoc) {
        // Try bike booking
        bookingDoc = await BikeBooking.findById(booking);
        isBikeBooking = true;
      }

      if (!bookingDoc) {
        return res
          .status(404)
          .json({ success: false, message: "Booking not found" });
      }

      if (bookingDoc.user.toString() !== userId) {
        return res
          .status(403)
          .json({ success: false, message: "Unauthorized" });
      }

      // Check if documents already uploaded
      const existingDocs = await Document.findOne({ booking });
      if (existingDocs) {
        return res
          .status(400)
          .json({ success: false, message: "Documents already uploaded" });
      }

      // Create document record
      const documentData = {
        user: userId,
        booking,
        vehicle,
      };

      // Process citizenship front
      if (req.files.citizenshipFront && req.files.citizenshipFront[0]) {
        documentData.citizenshipFront = {
          filename: req.files.citizenshipFront[0].filename,
          originalName: req.files.citizenshipFront[0].originalname,
          path: req.files.citizenshipFront[0].path,
          url: `/uploads/documents/${req.files.citizenshipFront[0].filename}`,
          mimetype: req.files.citizenshipFront[0].mimetype,
          size: req.files.citizenshipFront[0].size,
          uploadedAt: new Date(),
        };
      }

      // Process citizenship back
      if (req.files.citizenshipBack && req.files.citizenshipBack[0]) {
        documentData.citizenshipBack = {
          filename: req.files.citizenshipBack[0].filename,
          originalName: req.files.citizenshipBack[0].originalname,
          path: req.files.citizenshipBack[0].path,
          url: `/uploads/documents/${req.files.citizenshipBack[0].filename}`,
          mimetype: req.files.citizenshipBack[0].mimetype,
          size: req.files.citizenshipBack[0].size,
          uploadedAt: new Date(),
        };
      }

      // Process license front
      if (req.files.licenseFront && req.files.licenseFront[0]) {
        documentData.licenseFront = {
          filename: req.files.licenseFront[0].filename,
          originalName: req.files.licenseFront[0].originalname,
          path: req.files.licenseFront[0].path,
          url: `/uploads/documents/${req.files.licenseFront[0].filename}`,
          mimetype: req.files.licenseFront[0].mimetype,
          size: req.files.licenseFront[0].size,
          uploadedAt: new Date(),
        };
      }

      // Process license back
      if (req.files.licenseBack && req.files.licenseBack[0]) {
        documentData.licenseBack = {
          filename: req.files.licenseBack[0].filename,
          originalName: req.files.licenseBack[0].originalname,
          path: req.files.licenseBack[0].path,
          url: `/uploads/documents/${req.files.licenseBack[0].filename}`,
          mimetype: req.files.licenseBack[0].mimetype,
          size: req.files.licenseBack[0].size,
          uploadedAt: new Date(),
        };
      }

      const document = new Document(documentData);
      await document.save();

      // Update booking with document reference
      bookingDoc.documents = document._id;
      await bookingDoc.save();

      console.log(
        `✅ Documents uploaded successfully for ${isBikeBooking ? "bike" : "vehicle"} booking:`,
        booking,
      );

      res.status(201).json({
        success: true,
        message: "Documents uploaded successfully",
        data: {
          documentId: document._id,
          bookingId: booking,
        },
      });
    } catch (error) {
      console.error("Document upload error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to upload documents",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  },
);

// Get documents for a booking
router.get("/booking/:bookingId", protect, async (req, res) => {
  try {
    const { bookingId } = req.params;
    const userId = req.user.id;
    const isAdmin = req.user.role === "admin";

    // Check vehicle booking first, then bike booking
    let booking = await Booking.findById(bookingId);
    if (!booking) booking = await BikeBooking.findById(bookingId);

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    if (!isAdmin && booking.user.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    const documents = await Document.findOne({ booking: bookingId });
    res.status(200).json({ success: true, data: documents });
  } catch (error) {
    console.error("Get documents error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch documents" });
  }
});

export default router;
