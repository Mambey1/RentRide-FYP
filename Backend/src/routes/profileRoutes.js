// // import express from "express";
// // import {
// //   getUserProfile,
// //   updateUserProfile,
// // } from "../controllers/profileController.js";
// // import upload from "../middleware/upload.js";
// // import { protect } from "../middleware/authMiddleware.js";

// // const router = express.Router();

// // router.get("/", protect, getUserProfile);
// // router.put(
// //   "/update",
// //   protect,
// //   upload.single("profilePhoto"),
// //   updateUserProfile,
// // );

// // export default router;


// import express from "express";
// import {
//   getUserProfile,
//   updateUserProfile,
//   uploadProfilePhoto,  // ← use this instead of the external upload middleware
// } from "../controllers/profileController.js";
// import { protect } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.get("/", protect, getUserProfile);
// router.put("/update", protect, uploadProfilePhoto, updateUserProfile);

// export default router;



import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  uploadProfilePhoto,
  getUserById,
} from "../controllers/profileController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getUserProfile);
router.put("/update", protect, uploadProfilePhoto, updateUserProfile);

// Public — used by VehicleDetails to fetch owner profile photo
router.get("/user/:userId", getUserById);

export default router;