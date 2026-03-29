

import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Protect routes - verify token
export const protect = async (req, res, next) => {
  let token;

  console.log("Auth middleware - checking token...");

  // Check for token in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];
      console.log("Token found:", token.substring(0, 20) + "...");

      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "your-secret-key-change-this",
      );
      console.log("Token decoded:", decoded);

      // Get user from token
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        console.log("User not found for token");
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }

      console.log(
        "User authenticated:",
        req.user.email,
        "Role:",
        req.user.role,
      );
      next();
    } catch (error) {
      console.error("Auth error:", error.message);
      return res.status(401).json({
        success: false,
        message: "Not authorized, token failed",
      });
    }
  }

  if (!token) {
    console.log("No token provided");
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token",
    });
  }
};

// Authorize based on roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    console.log("Checking role:", req.user.role, "Required roles:", roles);

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role ${req.user.role} is not authorized to access this route`,
      });
    }
    next();
  };
};

// Optional: Admin only middleware (shortcut for authorize("admin"))
export const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access required",
    });
  }
  next();
};
