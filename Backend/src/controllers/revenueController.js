// import Booking from "../models/Booking.js";
// import Vehicle from "../models/Vehicle.js";
// import UserVehicle from "../models/UserVehicle.js";
// import User from "../models/User.js";

// // Get revenue from admin vehicles (100% to company)
// export const getAdminVehicleRevenue = async (req, res) => {
//   try {
//     const { startDate, endDate } = req.query;

//     const matchStage = { vehicleType: "admin", paymentStatus: "paid" };

//     if (startDate || endDate) {
//       matchStage.createdAt = {};
//       if (startDate) matchStage.createdAt.$gte = new Date(startDate);
//       if (endDate) matchStage.createdAt.$lte = new Date(endDate);
//     }

//     const revenueData = await Booking.aggregate([
//       { $match: matchStage },
//       {
//         $lookup: {
//           from: "users",
//           localField: "user",
//           foreignField: "_id",
//           as: "userDetails"
//         }
//       },
//       {
//         $lookup: {
//           from: "vehicles",
//           localField: "vehicle",
//           foreignField: "_id",
//           as: "vehicleDetails"
//         }
//       },
//       { $unwind: { path: "$userDetails", preserveNullAndEmptyArrays: true } },
//       { $unwind: { path: "$vehicleDetails", preserveNullAndEmptyArrays: true } },
//       {
//         $group: {
//           _id: null,
//           totalRevenue: { $sum: "$totalAmount" },
//           totalBookings: { $sum: 1 },
//           averageBookingValue: { $avg: "$totalAmount" },
//           bookings: { $push: "$$ROOT" }
//         }
//       }
//     ]);

//     // Get detailed bookings list
//     const bookings = await Booking.find(matchStage)
//       .populate("user", "name email phone")
//       .sort({ createdAt: -1 });

//     // Populate vehicle details for each booking
//     const populatedBookings = await Promise.all(
//       bookings.map(async (booking) => {
//         const vehicle = await Vehicle.findById(booking.vehicle).lean();
//         return {
//           ...booking.toObject(),
//           vehicle: vehicle
//         };
//       })
//     );

//     res.status(200).json({
//       success: true,
//       data: {
//         summary: revenueData[0] || {
//           totalRevenue: 0,
//           totalBookings: 0,
//           averageBookingValue: 0
//         },
//         bookings: populatedBookings
//       }
//     });
//   } catch (error) {
//     console.error("Get admin vehicle revenue error:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// // Get revenue from user vehicles (30% to company, 70% to owner)
// export const getUserVehicleRevenue = async (req, res) => {
//   try {
//     const { startDate, endDate } = req.query;
//     const COMMISSION_RATE = 0.30; // 30% to RentRide, 70% to vehicle owner

//     const matchStage = { vehicleType: "user", paymentStatus: "paid" };

//     if (startDate || endDate) {
//       matchStage.createdAt = {};
//       if (startDate) matchStage.createdAt.$gte = new Date(startDate);
//       if (endDate) matchStage.createdAt.$lte = new Date(endDate);
//     }

//     const revenueData = await Booking.aggregate([
//       { $match: matchStage },
//       {
//         $lookup: {
//           from: "uservehicles",
//           localField: "vehicle",
//           foreignField: "_id",
//           as: "vehicleDetails"
//         }
//       },
//       {
//         $lookup: {
//           from: "users",
//           localField: "user",
//           foreignField: "_id",
//           as: "userDetails"
//         }
//       },
//       { $unwind: { path: "$vehicleDetails", preserveNullAndEmptyArrays: true } },
//       { $unwind: { path: "$userDetails", preserveNullAndEmptyArrays: true } },
//       {
//         $addFields: {
//           companyRevenue: { $multiply: ["$totalAmount", COMMISSION_RATE] },
//           ownerRevenue: { $multiply: ["$totalAmount", 0.70] }
//         }
//       },
//       {
//         $group: {
//           _id: null,
//           totalRevenue: { $sum: "$totalAmount" },
//           totalCompanyRevenue: { $sum: "$companyRevenue" },
//           totalOwnerRevenue: { $sum: "$ownerRevenue" },
//           totalBookings: { $sum: 1 },
//           averageBookingValue: { $avg: "$totalAmount" }
//         }
//       }
//     ]);

//     // Get detailed bookings list with revenue breakdown
//     const bookings = await Booking.find(matchStage)
//       .populate("user", "name email phone")
//       .sort({ createdAt: -1 });

//     const populatedBookings = await Promise.all(
//       bookings.map(async (booking) => {
//         const userVehicle = await UserVehicle.findById(booking.vehicle).lean();
//         const companyRevenue = booking.totalAmount * COMMISSION_RATE;
//         const ownerRevenue = booking.totalAmount * 0.70;

//         return {
//           ...booking.toObject(),
//           vehicle: userVehicle,
//           revenueBreakdown: {
//             totalAmount: booking.totalAmount,
//             companyRevenue: companyRevenue,
//             ownerRevenue: ownerRevenue,
//             commissionRate: "30%"
//           }
//         };
//       })
//     );

//     res.status(200).json({
//       success: true,
//       data: {
//         summary: revenueData[0] || {
//           totalRevenue: 0,
//           totalCompanyRevenue: 0,
//           totalOwnerRevenue: 0,
//           totalBookings: 0,
//           averageBookingValue: 0
//         },
//         bookings: populatedBookings,
//         commissionRate: `${COMMISSION_RATE * 100}%`
//       }
//     });
//   } catch (error) {
//     console.error("Get user vehicle revenue error:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// // Get combined revenue summary
// export const getCombinedRevenue = async (req, res) => {
//   try {
//     const { startDate, endDate } = req.query;
//     const COMMISSION_RATE = 0.30;

//     const matchStage = { paymentStatus: "paid" };
//     if (startDate || endDate) {
//       matchStage.createdAt = {};
//       if (startDate) matchStage.createdAt.$gte = new Date(startDate);
//       if (endDate) matchStage.createdAt.$lte = new Date(endDate);
//     }

//     const revenueData = await Booking.aggregate([
//       { $match: matchStage },
//       {
//         $facet: {
//           adminRevenue: [
//             { $match: { vehicleType: "admin" } },
//             {
//               $group: {
//                 _id: null,
//                 totalRevenue: { $sum: "$totalAmount" },
//                 count: { $sum: 1 }
//               }
//             }
//           ],
//           userRevenue: [
//             { $match: { vehicleType: "user" } },
//             {
//               $addFields: {
//                 companyRevenue: { $multiply: ["$totalAmount", COMMISSION_RATE] },
//                 ownerRevenue: { $multiply: ["$totalAmount", 0.70] }
//               }
//             },
//             {
//               $group: {
//                 _id: null,
//                 totalGrossRevenue: { $sum: "$totalAmount" },
//                 totalCompanyRevenue: { $sum: "$companyRevenue" },
//                 totalOwnerRevenue: { $sum: "$ownerRevenue" },
//                 count: { $sum: 1 }
//               }
//             }
//           ]
//         }
//       }
//     ]);

//     const adminTotal = revenueData[0]?.adminRevenue[0]?.totalRevenue || 0;
//     const userGrossTotal = revenueData[0]?.userRevenue[0]?.totalGrossRevenue || 0;
//     const userCompanyTotal = revenueData[0]?.userRevenue[0]?.totalCompanyRevenue || 0;
//     const userOwnerTotal = revenueData[0]?.userRevenue[0]?.totalOwnerRevenue || 0;

//     res.status(200).json({
//       success: true,
//       data: {
//         totalRevenue: adminTotal + userGrossTotal,
//         totalCompanyRevenue: adminTotal + userCompanyTotal,
//         totalOwnerPayout: userOwnerTotal,
//         breakdown: {
//           adminVehicles: {
//             revenue: adminTotal,
//             bookings: revenueData[0]?.adminRevenue[0]?.count || 0
//           },
//           userVehicles: {
//             grossRevenue: userGrossTotal,
//             companyCommission: userCompanyTotal,
//             ownerPayout: userOwnerTotal,
//             bookings: revenueData[0]?.userRevenue[0]?.count || 0
//           }
//         }
//       }
//     });
//   } catch (error) {
//     console.error("Get combined revenue error:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// // Get revenue by vehicle (top earning vehicles)
// export const getRevenueByVehicle = async (req, res) => {
//   try {
//     const { vehicleType = "all", limit = 10 } = req.query;

//     let matchStage = { paymentStatus: "paid" };
//     if (vehicleType !== "all") {
//       matchStage.vehicleType = vehicleType;
//     }

//     const revenueByVehicle = await Booking.aggregate([
//       { $match: matchStage },
//       {
//         $group: {
//           _id: "$vehicle",
//           vehicleType: { $first: "$vehicleType" },
//           totalRevenue: { $sum: "$totalAmount" },
//           totalBookings: { $sum: 1 },
//           averageRevenue: { $avg: "$totalAmount" }
//         }
//       },
//       { $sort: { totalRevenue: -1 } },
//       { $limit: parseInt(limit) }
//     ]);

//     // Populate vehicle details
//     const populatedVehicles = await Promise.all(
//       revenueByVehicle.map(async (item) => {
//         let vehicle = null;
//         if (item.vehicleType === "admin") {
//           vehicle = await Vehicle.findById(item._id).lean();
//         } else {
//           vehicle = await UserVehicle.findById(item._id).lean();
//         }
//         return {
//           ...item,
//           vehicle: vehicle
//         };
//       })
//     );

//     res.status(200).json({
//       success: true,
//       data: populatedVehicles
//     });
//   } catch (error) {
//     console.error("Get revenue by vehicle error:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

import Booking from "../models/Booking.js";
import Vehicle from "../models/Vehicle.js";
import UserVehicle from "../models/UserVehicle.js";
import User from "../models/User.js";

// Helper function to get user vehicle details
async function getUserVehicleDetails(vehicleId) {
  try {
    const userVehicle = await UserVehicle.findById(vehicleId).lean();
    if (userVehicle) {
      return {
        carName: userVehicle.carName,
        carNumber: userVehicle.carNumber,
        carType: userVehicle.carType,
        ratePerDay: userVehicle.ratePerDay,
        seats: userVehicle.seats,
        vehiclePhotos: userVehicle.vehiclePhotos,
        fullName: userVehicle.fullName,
        phoneNumber: userVehicle.phoneNumber,
        address: userVehicle.address,
        city: userVehicle.city,
        citizenshipNumber: userVehicle.citizenshipNumber,
        source: "user",
      };
    }
    return null;
  } catch (error) {
    console.error("Error getting user vehicle details:", error);
    return null;
  }
}

// Helper function to get admin vehicle details
async function getAdminVehicleDetails(vehicleId) {
  try {
    const vehicle = await Vehicle.findById(vehicleId).lean();
    if (vehicle) {
      return {
        carName: vehicle.carName,
        carNumber: vehicle.carNumber,
        carType: vehicle.carType,
        ratePerDay: vehicle.ratePerDay,
        seats: vehicle.seats,
        photos: vehicle.photos,
        source: "admin",
      };
    }
    return null;
  } catch (error) {
    console.error("Error getting admin vehicle details:", error);
    return null;
  }
}

// Get revenue from admin vehicles (100% to company)
export const getAdminVehicleRevenue = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const matchStage = { vehicleType: "admin", paymentStatus: "paid" };

    if (startDate || endDate) {
      matchStage.createdAt = {};
      if (startDate) matchStage.createdAt.$gte = new Date(startDate);
      if (endDate) matchStage.createdAt.$lte = new Date(endDate);
    }

    const bookings = await Booking.find(matchStage)
      .populate("user", "name email phone")
      .sort({ createdAt: -1 });

    // Populate vehicle details for each booking
    const populatedBookings = await Promise.all(
      bookings.map(async (booking) => {
        const vehicleData = await getAdminVehicleDetails(booking.vehicle);
        return {
          ...booking.toObject(),
          vehicle: vehicleData,
        };
      }),
    );

    const totalRevenue = populatedBookings.reduce(
      (sum, b) => sum + (b.totalAmount || 0),
      0,
    );
    const totalBookings = populatedBookings.length;
    const averageBookingValue =
      totalBookings > 0 ? totalRevenue / totalBookings : 0;

    res.status(200).json({
      success: true,
      data: {
        summary: {
          totalRevenue,
          totalBookings,
          averageBookingValue,
        },
        bookings: populatedBookings,
      },
    });
  } catch (error) {
    console.error("Get admin vehicle revenue error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get revenue from user vehicles (30% to company, 70% to owner)
export const getUserVehicleRevenue = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const COMMISSION_RATE = 0.3;

    const matchStage = { vehicleType: "user", paymentStatus: "paid" };

    if (startDate || endDate) {
      matchStage.createdAt = {};
      if (startDate) matchStage.createdAt.$gte = new Date(startDate);
      if (endDate) matchStage.createdAt.$lte = new Date(endDate);
    }

    const bookings = await Booking.find(matchStage)
      .populate("user", "name email phone")
      .sort({ createdAt: -1 });

    // Populate vehicle details for each booking
    const populatedBookings = await Promise.all(
      bookings.map(async (booking) => {
        const vehicleData = await getUserVehicleDetails(booking.vehicle);
        const companyRevenue = booking.totalAmount * COMMISSION_RATE;
        const ownerRevenue = booking.totalAmount * 0.7;

        return {
          ...booking.toObject(),
          vehicle: vehicleData,
          revenueBreakdown: {
            totalAmount: booking.totalAmount,
            companyRevenue: companyRevenue,
            ownerRevenue: ownerRevenue,
            commissionRate: "30%",
          },
        };
      }),
    );

    const totalRevenue = populatedBookings.reduce(
      (sum, b) => sum + (b.totalAmount || 0),
      0,
    );
    const totalCompanyRevenue = populatedBookings.reduce(
      (sum, b) => sum + (b.revenueBreakdown?.companyRevenue || 0),
      0,
    );
    const totalOwnerRevenue = populatedBookings.reduce(
      (sum, b) => sum + (b.revenueBreakdown?.ownerRevenue || 0),
      0,
    );
    const totalBookings = populatedBookings.length;
    const averageBookingValue =
      totalBookings > 0 ? totalRevenue / totalBookings : 0;

    res.status(200).json({
      success: true,
      data: {
        summary: {
          totalRevenue,
          totalCompanyRevenue,
          totalOwnerRevenue,
          totalBookings,
          averageBookingValue,
        },
        bookings: populatedBookings,
        commissionRate: `${COMMISSION_RATE * 100}%`,
      },
    });
  } catch (error) {
    console.error("Get user vehicle revenue error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get combined revenue summary
export const getCombinedRevenue = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const COMMISSION_RATE = 0.3;

    const matchStage = { paymentStatus: "paid" };
    if (startDate || endDate) {
      matchStage.createdAt = {};
      if (startDate) matchStage.createdAt.$gte = new Date(startDate);
      if (endDate) matchStage.createdAt.$lte = new Date(endDate);
    }

    const bookings = await Booking.find(matchStage);

    let adminTotal = 0;
    let userGrossTotal = 0;
    let userCompanyTotal = 0;
    let userOwnerTotal = 0;
    let adminCount = 0;
    let userCount = 0;

    for (const booking of bookings) {
      if (booking.vehicleType === "admin") {
        adminTotal += booking.totalAmount;
        adminCount++;
      } else {
        userGrossTotal += booking.totalAmount;
        userCompanyTotal += booking.totalAmount * COMMISSION_RATE;
        userOwnerTotal += booking.totalAmount * 0.7;
        userCount++;
      }
    }

    res.status(200).json({
      success: true,
      data: {
        totalRevenue: adminTotal + userGrossTotal,
        totalCompanyRevenue: adminTotal + userCompanyTotal,
        totalOwnerPayout: userOwnerTotal,
        breakdown: {
          adminVehicles: {
            revenue: adminTotal,
            bookings: adminCount,
          },
          userVehicles: {
            grossRevenue: userGrossTotal,
            companyCommission: userCompanyTotal,
            ownerPayout: userOwnerTotal,
            bookings: userCount,
          },
        },
      },
    });
  } catch (error) {
    console.error("Get combined revenue error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get revenue by vehicle (top earning vehicles)
export const getRevenueByVehicle = async (req, res) => {
  try {
    const { vehicleType = "all", limit = 10 } = req.query;

    let matchStage = { paymentStatus: "paid" };
    if (vehicleType !== "all") {
      matchStage.vehicleType = vehicleType;
    }

    const revenueByVehicle = await Booking.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: "$vehicle",
          vehicleType: { $first: "$vehicleType" },
          totalRevenue: { $sum: "$totalAmount" },
          totalBookings: { $sum: 1 },
          averageRevenue: { $avg: "$totalAmount" },
        },
      },
      { $sort: { totalRevenue: -1 } },
      { $limit: parseInt(limit) },
    ]);

    // Populate vehicle details
    const populatedVehicles = await Promise.all(
      revenueByVehicle.map(async (item) => {
        let vehicle = null;
        if (item.vehicleType === "admin") {
          vehicle = await Vehicle.findById(item._id).lean();
        } else {
          vehicle = await UserVehicle.findById(item._id).lean();
        }
        return {
          ...item,
          vehicle: vehicle,
        };
      }),
    );

    res.status(200).json({
      success: true,
      data: populatedVehicles,
    });
  } catch (error) {
    console.error("Get revenue by vehicle error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
