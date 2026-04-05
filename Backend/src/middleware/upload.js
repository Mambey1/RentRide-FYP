// import multer from "multer";
// import path from "path";
// import fs from "fs";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Create directories if they don't exist
// const createDirectories = () => {
//   const dirs = [
//     "uploads/profiles",
//     "uploads/vehicles",
//     "uploads/user-vehicles",
//     "uploads/documents",
//   ];

//   dirs.forEach((dir) => {
//     const fullPath = path.join(__dirname, "../../", dir);
//     if (!fs.existsSync(fullPath)) {
//       fs.mkdirSync(fullPath, { recursive: true });
//     }
//   });
// };

// createDirectories();

// // Set storage engine
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // Determine destination based on field name
//     if (file.fieldname === "profilePhoto") {
//       cb(null, path.join(__dirname, "../../uploads/profiles/"));
//     } else if (file.fieldname === "photos") {
//       // Check if it's admin vehicle or user vehicle
//       if (req.baseUrl.includes("admin")) {
//         cb(null, path.join(__dirname, "../../uploads/vehicles/"));
//       } else {
//         cb(null, path.join(__dirname, "../../uploads/user-vehicles/"));
//       }
//     } else if (file.fieldname === "document") {
//       cb(null, path.join(__dirname, "../../uploads/documents/"));
//     } else {
//       cb(null, path.join(__dirname, "../../uploads/"));
//     }
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const ext = path.extname(file.originalname);
//     cb(null, file.fieldname + "-" + uniqueSuffix + ext);
//   },
// });

// // Check file type
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|gif|webp/;
//   const extname = allowedTypes.test(
//     path.extname(file.originalname).toLowerCase(),
//   );
//   const mimetype = allowedTypes.test(file.mimetype);

//   if (mimetype && extname) {
//     return cb(null, true);
//   } else {
//     cb(new Error("Only image files are allowed (jpeg, jpg, png, gif, webp)"));
//   }
// };

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 5 * 1024 * 1024, // 5MB per file
//   },
//   fileFilter: fileFilter,
// });

// export default upload;

import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create directories if they don't exist
const createDirectories = () => {
  const dirs = [
    "uploads/profiles",
    "uploads/vehicles",
    "uploads/user-vehicles",
    "uploads/documents",
  ];

  dirs.forEach((dir) => {
    const fullPath = path.join(__dirname, "../../", dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
  });
};

createDirectories();

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // For vehicle photos - always save to vehicles folder for admin
    if (file.fieldname === "photos") {
      // Check if it's coming from admin vehicle management
      // You can check the URL path or add a custom header
      if (
        (req.originalUrl.includes("/api/vehicles") && req.method === "POST") ||
        req.method === "PUT"
      ) {
        // Admin vehicle management - save to vehicles folder
        console.log("Saving to vehicles folder (admin)");
        cb(null, path.join(__dirname, "../../uploads/vehicles/"));
      } else {
        // User uploaded vehicles - save to user-vehicles folder
        console.log("Saving to user-vehicles folder");
        cb(null, path.join(__dirname, "../../uploads/user-vehicles/"));
      }
    }
    // For profile photos
    else if (file.fieldname === "profilePhoto") {
      cb(null, path.join(__dirname, "../../uploads/profiles/"));
    }
    // For documents
    else if (file.fieldname === "document") {
      cb(null, path.join(__dirname, "../../uploads/documents/"));
    }
    // Default
    else {
      cb(null, path.join(__dirname, "../../uploads/"));
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    // Use original fieldname to avoid confusion
    cb(null, "vehicle-" + uniqueSuffix + ext);
  },
});

// Check file type
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only image files are allowed (jpeg, jpg, png, gif, webp)"));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB per file
  },
  fileFilter: fileFilter,
});

export default upload;
