// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import { toast, ToastContainer } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import {
// //   FaCar,
// //   FaUser,
// //   FaPhone,
// //   FaIdCard,
// //   FaMapMarkerAlt,
// //   FaRupeeSign,
// //   FaChair,
// //   FaCogs,
// //   FaSnowflake,
// //   FaImage,
// //   FaCheckCircle,
// //   FaTimesCircle,
// //   FaClock,
// //   FaEye,
// //   FaFileAlt,
// //   FaSearch,
// //   FaFilter,
// //   FaInfoCircle,
// //   FaArrowLeft,
// //   FaTimes,
// //   FaExpand,
// //   FaShieldAlt,
// //   FaFileInvoice,
// //   FaLeaf,
// //   FaIdCard as FaCitizenship,
// //   FaUserCircle,
// //   FaEdit,
// //   FaTrash,
// //   FaBan,
// //   FaPlay,
// //   FaStop,
// //   FaFilePdf,
// //   FaFileImage,
// //   FaDownload,
// //   FaBook,
// //   FaHistory,
// //   FaSpinner,
// //   FaQuestionCircle,
// // } from "react-icons/fa";

// // const AdminVehicleVerification = () => {
// //   const navigate = useNavigate();
// //   const [vehicles, setVehicles] = useState([]);
// //   const [filteredVehicles, setFilteredVehicles] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const [selectedVehicle, setSelectedVehicle] = useState(null);
// //   const [showDetailsModal, setShowDetailsModal] = useState(false);
// //   const [showDocsModal, setShowDocsModal] = useState(false);
// //   const [filterStatus, setFilterStatus] = useState("all");
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [rejectionReason, setRejectionReason] = useState("");
// //   const [showRejectModal, setShowRejectModal] = useState(false);
// //   const [selectedImage, setSelectedImage] = useState(null);
// //   const [showImageViewer, setShowImageViewer] = useState(false);
// //   const [actionLoading, setActionLoading] = useState(false);

// //   // Confirmation Modal State
// //   const [showConfirmModal, setShowConfirmModal] = useState(false);
// //   const [confirmAction, setConfirmAction] = useState(null);
// //   const [confirmVehicleId, setConfirmVehicleId] = useState(null);
// //   const [confirmTitle, setConfirmTitle] = useState("");
// //   const [confirmMessage, setConfirmMessage] = useState("");
// //   const [confirmType, setConfirmType] = useState(""); // approve, reject, activate, deactivate, delete, reset

// //   const [stats, setStats] = useState({
// //     total: 0,
// //     pending: 0,
// //     approved: 0,
// //     rejected: 0,
// //     active: 0,
// //     inactive: 0,
// //     booked: 0,
// //   });

// //   useEffect(() => {
// //     fetchVehicles();
// //     const interval = setInterval(() => {
// //       fetchVehicles();
// //     }, 30000);
// //     return () => clearInterval(interval);
// //   }, []);

// //   const fetchVehicles = async () => {
// //     try {
// //       setLoading(true);
// //       setError("");

// //       const token =
// //         localStorage.getItem("token") || sessionStorage.getItem("token");

// //       if (!token) {
// //         setError("No authentication token found. Please login again.");
// //         setLoading(false);
// //         return;
// //       }

// //       const response = await axios.get(
// //         "http://localhost:5000/api/user-vehicles/admin/all",
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         },
// //       );

// //       if (response.data && response.data.success) {
// //         let vehiclesData = [];

// //         if (response.data.data && response.data.data.vehicles) {
// //           vehiclesData = response.data.data.vehicles;
// //         } else if (response.data.vehicles) {
// //           vehiclesData = response.data.vehicles;
// //         } else if (Array.isArray(response.data.data)) {
// //           vehiclesData = response.data.data;
// //         } else if (Array.isArray(response.data)) {
// //           vehiclesData = response.data;
// //         }

// //         setVehicles(vehiclesData);
// //         setFilteredVehicles(vehiclesData);
// //         calculateStats(vehiclesData);
// //       } else {
// //         setError(response.data?.message || "Failed to fetch vehicles");
// //         setVehicles([]);
// //         setFilteredVehicles([]);
// //         calculateStats([]);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching vehicles:", error);
// //       if (error.response) {
// //         setError(
// //           error.response.data?.message ||
// //             `Server error: ${error.response.status}`,
// //         );
// //       } else if (error.request) {
// //         setError(
// //           "Cannot connect to server. Please check if backend is running.",
// //         );
// //       } else {
// //         setError(error.message);
// //       }
// //       setVehicles([]);
// //       setFilteredVehicles([]);
// //       calculateStats([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const calculateStats = (vehiclesData) => {
// //     const data = Array.isArray(vehiclesData) ? vehiclesData : [];

// //     const statsData = {
// //       total: data.length,
// //       pending: data.filter((v) => v?.status === "pending").length,
// //       approved: data.filter((v) => v?.status === "approved").length,
// //       rejected: data.filter((v) => v?.status === "rejected").length,
// //       active: data.filter((v) => v?.status === "active").length,
// //       inactive: data.filter((v) => v?.status === "inactive").length,
// //       booked: data.filter((v) => v?.status === "booked").length,
// //     };
// //     setStats(statsData);
// //   };

// //   // Show confirmation modal
// //   const showConfirmation = (action, vehicleId, title, message, type) => {
// //     setConfirmAction(() => action);
// //     setConfirmVehicleId(vehicleId);
// //     setConfirmTitle(title);
// //     setConfirmMessage(message);
// //     setConfirmType(type);
// //     setShowConfirmModal(true);
// //   };

// //   // Execute action after confirmation
// //   const executeAction = async () => {
// //     if (confirmAction) {
// //       await confirmAction(confirmVehicleId);
// //     }
// //     setShowConfirmModal(false);
// //     setConfirmAction(null);
// //     setConfirmVehicleId(null);
// //   };

// //   // Action functions
// //   const handleApprove = async (vehicleId) => {
// //     setActionLoading(true);
// //     try {
// //       const token =
// //         localStorage.getItem("token") || sessionStorage.getItem("token");
// //       await axios.post(
// //         `http://localhost:5000/api/user-vehicles/admin/${vehicleId}/approve`,
// //         {},
// //         { headers: { Authorization: `Bearer ${token}` } },
// //       );
// //       toast.success("✅ Vehicle approved successfully!");
// //       await fetchVehicles();
// //       setShowDetailsModal(false);
// //       setShowDocsModal(false);
// //     } catch (error) {
// //       console.error("Error approving vehicle:", error);
// //       toast.error(error.response?.data?.message || "Failed to approve vehicle");
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   const handleReject = async (vehicleId) => {
// //     if (!rejectionReason.trim()) {
// //       toast.error("Please provide a reason for rejection");
// //       return;
// //     }

// //     setActionLoading(true);
// //     try {
// //       const token =
// //         localStorage.getItem("token") || sessionStorage.getItem("token");
// //       await axios.post(
// //         `http://localhost:5000/api/user-vehicles/admin/${vehicleId}/reject`,
// //         { reason: rejectionReason },
// //         { headers: { Authorization: `Bearer ${token}` } },
// //       );
// //       toast.error("❌ Vehicle rejected successfully!");
// //       await fetchVehicles();
// //       setShowRejectModal(false);
// //       setRejectionReason("");
// //       setShowDetailsModal(false);
// //       setShowDocsModal(false);
// //     } catch (error) {
// //       console.error("Error rejecting vehicle:", error);
// //       toast.error(error.response?.data?.message || "Failed to reject vehicle");
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   const handleActivate = async (vehicleId) => {
// //     setActionLoading(true);
// //     try {
// //       const token =
// //         localStorage.getItem("token") || sessionStorage.getItem("token");
// //       await axios.put(
// //         `http://localhost:5000/api/user-vehicles/admin/${vehicleId}/activate`,
// //         {},
// //         { headers: { Authorization: `Bearer ${token}` } },
// //       );
// //       toast.success("✅ Vehicle activated successfully!");
// //       await fetchVehicles();
// //       setShowDetailsModal(false);
// //       setShowDocsModal(false);
// //     } catch (error) {
// //       console.error("Error activating vehicle:", error);
// //       toast.error(
// //         error.response?.data?.message || "Failed to activate vehicle",
// //       );
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   const handleDeactivate = async (vehicleId) => {
// //     setActionLoading(true);
// //     try {
// //       const token =
// //         localStorage.getItem("token") || sessionStorage.getItem("token");
// //       await axios.put(
// //         `http://localhost:5000/api/user-vehicles/admin/${vehicleId}/deactivate`,
// //         {},
// //         { headers: { Authorization: `Bearer ${token}` } },
// //       );
// //       toast.info("⏸️ Vehicle deactivated successfully!");
// //       await fetchVehicles();
// //       setShowDetailsModal(false);
// //       setShowDocsModal(false);
// //     } catch (error) {
// //       console.error("Error deactivating vehicle:", error);
// //       toast.error(
// //         error.response?.data?.message || "Failed to deactivate vehicle",
// //       );
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   const handleDelete = async (vehicleId) => {
// //     setActionLoading(true);
// //     try {
// //       const token =
// //         localStorage.getItem("token") || sessionStorage.getItem("token");
// //       await axios.delete(
// //         `http://localhost:5000/api/user-vehicles/admin/${vehicleId}/delete`,
// //         { headers: { Authorization: `Bearer ${token}` } },
// //       );
// //       toast.error("🗑️ Vehicle deleted successfully!");
// //       await fetchVehicles();
// //       setShowDetailsModal(false);
// //       setShowDocsModal(false);
// //     } catch (error) {
// //       console.error("Error deleting vehicle:", error);
// //       toast.error(error.response?.data?.message || "Failed to delete vehicle");
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   const handleResetToActive = async (vehicleId) => {
// //     setActionLoading(true);
// //     try {
// //       const token =
// //         localStorage.getItem("token") || sessionStorage.getItem("token");
// //       await axios.put(
// //         `http://localhost:5000/api/user-vehicles/admin/${vehicleId}/fix-status`,
// //         { status: "active", isListed: true },
// //         { headers: { Authorization: `Bearer ${token}` } },
// //       );
// //       toast.success("✅ Vehicle status reset to Active successfully!");
// //       await fetchVehicles();
// //       setShowDetailsModal(false);
// //       setShowDocsModal(false);
// //     } catch (error) {
// //       console.error("Error resetting vehicle status:", error);
// //       toast.error(
// //         error.response?.data?.message || "Failed to reset vehicle status",
// //       );
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   const handleViewDetails = (vehicle) => {
// //     setSelectedVehicle(vehicle);
// //     setShowDetailsModal(true);
// //   };

// //   const handleViewDocuments = (vehicle) => {
// //     setSelectedVehicle(vehicle);
// //     setShowDocsModal(true);
// //   };

// //   const handleFilterChange = (status) => {
// //     setFilterStatus(status);
// //     if (status === "all") {
// //       setFilteredVehicles(vehicles);
// //     } else {
// //       setFilteredVehicles(
// //         vehicles.filter((vehicle) => vehicle.status === status),
// //       );
// //     }
// //   };

// //   const handleSearch = (e) => {
// //     const term = e.target.value.toLowerCase();
// //     setSearchTerm(term);

// //     let filtered = vehicles;
// //     if (filterStatus !== "all") {
// //       filtered = filtered.filter((v) => v.status === filterStatus);
// //     }

// //     const searched = filtered.filter(
// //       (vehicle) =>
// //         vehicle?.carName?.toLowerCase().includes(term) ||
// //         vehicle?.carNumber?.toLowerCase().includes(term) ||
// //         vehicle?.fullName?.toLowerCase().includes(term) ||
// //         vehicle?.citizenshipNumber?.toLowerCase().includes(term),
// //     );

// //     setFilteredVehicles(searched);
// //   };

// //   const getStatusBadge = (status) => {
// //     const statusConfig = {
// //       pending: {
// //         color: "bg-yellow-100 text-yellow-800",
// //         icon: FaClock,
// //         label: "Pending",
// //       },
// //       approved: {
// //         color: "bg-blue-100 text-blue-800",
// //         icon: FaCheckCircle,
// //         label: "Approved",
// //       },
// //       rejected: {
// //         color: "bg-red-100 text-red-800",
// //         icon: FaTimesCircle,
// //         label: "Rejected",
// //       },
// //       active: {
// //         color: "bg-green-100 text-green-800",
// //         icon: FaPlay,
// //         label: "Active",
// //       },
// //       inactive: {
// //         color: "bg-gray-100 text-gray-800",
// //         icon: FaStop,
// //         label: "Inactive",
// //       },
// //       booked: {
// //         color: "bg-orange-100 text-orange-800",
// //         icon: FaBook,
// //         label: "Booked",
// //       },
// //     };
// //     const config = statusConfig[status] || statusConfig.pending;
// //     const Icon = config.icon;
// //     return (
// //       <span
// //         className={`px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-1 ${config.color}`}
// //       >
// //         <Icon size={12} />
// //         {config.label}
// //       </span>
// //     );
// //   };

// //   const openImageViewer = (imageUrl) => {
// //     setSelectedImage(imageUrl);
// //     setShowImageViewer(true);
// //   };

// //   // Get confirmation modal styles based on type
// //   const getConfirmModalStyles = () => {
// //     switch (confirmType) {
// //       case "approve":
// //         return {
// //           icon: <FaCheckCircle className="text-green-600 text-5xl mb-4" />,
// //           buttonClass: "bg-green-600 hover:bg-green-700",
// //           buttonText: "Yes, Approve",
// //         };
// //       case "reject":
// //         return {
// //           icon: <FaTimesCircle className="text-red-600 text-5xl mb-4" />,
// //           buttonClass: "bg-red-600 hover:bg-red-700",
// //           buttonText: "Yes, Reject",
// //         };
// //       case "activate":
// //         return {
// //           icon: <FaPlay className="text-green-600 text-5xl mb-4" />,
// //           buttonClass: "bg-green-600 hover:bg-green-700",
// //           buttonText: "Yes, Activate",
// //         };
// //       case "deactivate":
// //         return {
// //           icon: <FaStop className="text-yellow-600 text-5xl mb-4" />,
// //           buttonClass: "bg-yellow-600 hover:bg-yellow-700",
// //           buttonText: "Yes, Deactivate",
// //         };
// //       case "delete":
// //         return {
// //           icon: <FaTrash className="text-red-600 text-5xl mb-4" />,
// //           buttonClass: "bg-red-600 hover:bg-red-700",
// //           buttonText: "Yes, Delete",
// //         };
// //       case "reset":
// //         return {
// //           icon: <FaHistory className="text-blue-600 text-5xl mb-4" />,
// //           buttonClass: "bg-blue-600 hover:bg-blue-700",
// //           buttonText: "Yes, Reset",
// //         };
// //       default:
// //         return {
// //           icon: <FaQuestionCircle className="text-blue-600 text-5xl mb-4" />,
// //           buttonClass: "bg-blue-600 hover:bg-blue-700",
// //           buttonText: "Yes, Proceed",
// //         };
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="flex items-center justify-center h-96">
// //         <div className="text-center">
// //           <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
// //           <p className="text-gray-600">Loading vehicle listings...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error && vehicles.length === 0) {
// //     return (
// //       <div className="flex items-center justify-center h-96">
// //         <div className="text-center max-w-md">
// //           <div className="text-red-600 text-5xl mb-4">⚠️</div>
// //           <h2 className="text-xl font-semibold mb-2">Error Loading Vehicles</h2>
// //           <p className="text-gray-600 mb-4">{error}</p>
// //           <button
// //             onClick={fetchVehicles}
// //             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
// //           >
// //             Try Again
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const modalStyles = getConfirmModalStyles();

// //   return (
// //     <div className="p-8">
// //       <ToastContainer position="top-right" autoClose={3000} />

// //       {/* Custom Confirmation Modal */}
// //       {showConfirmModal && (
// //         <div className="fixed inset-0 z-[100] flex items-center justify-center">
// //           <div
// //             className="absolute inset-0 bg-black/50 backdrop-blur-sm"
// //             onClick={() => setShowConfirmModal(false)}
// //           ></div>
// //           <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 animate-in fade-in zoom-in duration-200">
// //             <div className="text-center">
// //               {modalStyles.icon}
// //               <h3 className="text-xl font-bold text-gray-900 mb-2">
// //                 {confirmTitle}
// //               </h3>
// //               <p className="text-gray-600 mb-6">{confirmMessage}</p>
// //               <div className="flex gap-3">
// //                 <button
// //                   onClick={() => setShowConfirmModal(false)}
// //                   className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
// //                 >
// //                   Cancel
// //                 </button>
// //                 <button
// //                   onClick={executeAction}
// //                   disabled={actionLoading}
// //                   className={`flex-1 px-4 py-2 text-white font-medium rounded-lg transition flex items-center justify-center gap-2 ${modalStyles.buttonClass} disabled:opacity-50`}
// //                 >
// //                   {actionLoading ? (
// //                     <FaSpinner className="animate-spin" />
// //                   ) : (
// //                     modalStyles.buttonText
// //                   )}
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Page Header */}
// //       <div className="mb-8">
// //         <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
// //           Vehicle Verification Dashboard
// //         </h1>
// //         <p className="text-gray-500 mt-2">
// //           Review and verify user-submitted vehicle listings
// //         </p>
// //       </div>

// //       {/* Statistics Cards */}
// //       <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-8">
// //         <div className="bg-white rounded-lg shadow p-4">
// //           <p className="text-gray-500 text-sm">Total Listings</p>
// //           <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
// //         </div>
// //         <div className="bg-yellow-50 rounded-lg shadow p-4 border-l-4 border-yellow-500">
// //           <p className="text-yellow-600 text-sm">Pending</p>
// //           <p className="text-2xl font-bold text-yellow-700">{stats.pending}</p>
// //         </div>
// //         <div className="bg-blue-50 rounded-lg shadow p-4 border-l-4 border-blue-500">
// //           <p className="text-blue-600 text-sm">Approved</p>
// //           <p className="text-2xl font-bold text-blue-700">{stats.approved}</p>
// //         </div>
// //         <div className="bg-green-50 rounded-lg shadow p-4 border-l-4 border-green-500">
// //           <p className="text-green-600 text-sm">Active</p>
// //           <p className="text-2xl font-bold text-green-700">{stats.active}</p>
// //         </div>
// //         <div className="bg-gray-50 rounded-lg shadow p-4 border-l-4 border-gray-500">
// //           <p className="text-gray-600 text-sm">Inactive</p>
// //           <p className="text-2xl font-bold text-gray-700">{stats.inactive}</p>
// //         </div>
// //         <div className="bg-red-50 rounded-lg shadow p-4 border-l-4 border-red-500">
// //           <p className="text-red-600 text-sm">Rejected</p>
// //           <p className="text-2xl font-bold text-red-700">{stats.rejected}</p>
// //         </div>
// //         <div className="bg-orange-50 rounded-lg shadow p-4 border-l-4 border-orange-500">
// //           <p className="text-orange-600 text-sm">Booked</p>
// //           <p className="text-2xl font-bold text-orange-700">{stats.booked}</p>
// //         </div>
// //       </div>

// //       {/* Info Banner for Booked Vehicles */}
// //       {stats.booked > 0 && (
// //         <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6 flex items-center justify-between">
// //           <div className="flex items-center gap-3">
// //             <FaHistory className="text-orange-600 text-xl" />
// //             <div>
// //               <p className="text-orange-800 font-medium">
// //                 Booked Vehicles Notice
// //               </p>
// //               <p className="text-orange-700 text-sm">
// //                 {stats.booked} vehicle(s) are currently booked. They will
// //                 automatically become "Active" when the booking period ends.
// //               </p>
// //             </div>
// //           </div>
// //           <button
// //             onClick={() => handleFilterChange("booked")}
// //             className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition text-sm"
// //           >
// //             View Booked Vehicles
// //           </button>
// //         </div>
// //       )}

// //       {/* Filters and Search */}
// //       <div className="bg-white rounded-lg shadow mb-6 p-4">
// //         <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
// //           <div className="flex gap-2 overflow-x-auto pb-2">
// //             {[
// //               "all",
// //               "pending",
// //               "approved",
// //               "active",
// //               "inactive",
// //               "rejected",
// //               "booked",
// //             ].map((status) => (
// //               <button
// //                 key={status}
// //                 onClick={() => handleFilterChange(status)}
// //                 className={`px-4 py-2 rounded-lg font-medium transition capitalize ${
// //                   filterStatus === status
// //                     ? status === "pending"
// //                       ? "bg-yellow-500 text-white"
// //                       : status === "approved"
// //                         ? "bg-blue-600 text-white"
// //                         : status === "active"
// //                           ? "bg-green-600 text-white"
// //                           : status === "inactive"
// //                             ? "bg-gray-600 text-white"
// //                             : status === "rejected"
// //                               ? "bg-red-600 text-white"
// //                               : status === "booked"
// //                                 ? "bg-orange-600 text-white"
// //                                 : "bg-blue-600 text-white"
// //                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
// //                 }`}
// //               >
// //                 {status === "all" ? "All" : status}
// //               </button>
// //             ))}
// //           </div>

// //           <div className="relative w-full md:w-64">
// //             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
// //             <input
// //               type="text"
// //               placeholder="Search by car name, number, owner..."
// //               value={searchTerm}
// //               onChange={handleSearch}
// //               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             />
// //           </div>
// //         </div>
// //       </div>

// //       {/* Vehicles Table */}
// //       <div className="bg-white rounded-lg shadow overflow-hidden">
// //         {vehicles.length === 0 ? (
// //           <div className="text-center py-12">
// //             <FaCar className="text-5xl text-gray-300 mx-auto mb-3" />
// //             <p className="text-gray-500">No vehicle listings found</p>
// //             <p className="text-sm text-gray-400 mt-1">
// //               Vehicles will appear here once users list them
// //             </p>
// //           </div>
// //         ) : (
// //           <div className="overflow-x-auto">
// //             <table className="min-w-full divide-y divide-gray-200">
// //               <thead className="bg-gray-50">
// //                 <tr>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                     Vehicle
// //                   </th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                     Owner
// //                   </th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                     Car Number
// //                   </th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                     Rate/Day
// //                   </th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                     Status
// //                   </th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                     Submitted
// //                   </th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                     Actions
// //                   </th>
// //                 </tr>
// //               </thead>
// //               <tbody className="bg-white divide-y divide-gray-200">
// //                 {filteredVehicles.map((vehicle) => (
// //                   <tr key={vehicle._id} className="hover:bg-gray-50">
// //                     <td className="px-6 py-4">
// //                       <div className="flex items-center gap-3">
// //                         {vehicle.vehiclePhotos && vehicle.vehiclePhotos[0] ? (
// //                           <img
// //                             src={`http://localhost:5000${vehicle.vehiclePhotos[0].url}`}
// //                             alt={vehicle.carName}
// //                             className="w-12 h-12 object-cover rounded-lg"
// //                           />
// //                         ) : (
// //                           <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
// //                             <FaCar className="text-gray-400" />
// //                           </div>
// //                         )}
// //                         <div>
// //                           <p className="font-medium text-gray-900">
// //                             {vehicle.carName}
// //                           </p>
// //                           <p className="text-sm text-gray-500">
// //                             {vehicle.carType} • {vehicle.seats} seats
// //                           </p>
// //                         </div>
// //                       </div>
// //                     </td>
// //                     <td className="px-6 py-4">
// //                       <div>
// //                         <p className="text-sm font-medium text-gray-900">
// //                           {vehicle.fullName}
// //                         </p>
// //                         <p className="text-sm text-gray-500">
// //                           {vehicle.phoneNumber}
// //                         </p>
// //                       </div>
// //                     </td>
// //                     <td className="px-6 py-4 text-sm text-gray-900">
// //                       {vehicle.carNumber}
// //                     </td>
// //                     <td className="px-6 py-4 text-sm font-medium text-gray-900">
// //                       रु {vehicle.ratePerDay}
// //                     </td>
// //                     <td className="px-6 py-4">
// //                       {getStatusBadge(vehicle.status)}
// //                     </td>
// //                     <td className="px-6 py-4 text-sm text-gray-500">
// //                       {new Date(vehicle.createdAt).toLocaleDateString()}
// //                     </td>
// //                     <td className="px-6 py-4">
// //                       <div className="flex space-x-2">
// //                         <button
// //                           onClick={() => handleViewDetails(vehicle)}
// //                           className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
// //                           title="View Details"
// //                         >
// //                           <FaEye />
// //                         </button>
// //                         <button
// //                           onClick={() => handleViewDocuments(vehicle)}
// //                           className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition"
// //                           title="View Documents"
// //                         >
// //                           <FaFileAlt />
// //                         </button>

// //                         {vehicle.status === "pending" && (
// //                           <>
// //                             <button
// //                               onClick={() =>
// //                                 showConfirmation(
// //                                   handleApprove,
// //                                   vehicle._id,
// //                                   "Approve Vehicle Listing",
// //                                   `Are you sure you want to approve "${vehicle.carName}"? This vehicle will be listed for rent.`,
// //                                   "approve",
// //                                 )
// //                               }
// //                               className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
// //                               title="Approve"
// //                               disabled={actionLoading}
// //                             >
// //                               <FaCheckCircle />
// //                             </button>
// //                             <button
// //                               onClick={() => {
// //                                 setSelectedVehicle(vehicle);
// //                                 setShowRejectModal(true);
// //                               }}
// //                               className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
// //                               title="Reject"
// //                               disabled={actionLoading}
// //                             >
// //                               <FaTimesCircle />
// //                             </button>
// //                           </>
// //                         )}

// //                         {(vehicle.status === "approved" ||
// //                           vehicle.status === "active" ||
// //                           vehicle.status === "inactive") && (
// //                           <>
// //                             {vehicle.status !== "active" && (
// //                               <button
// //                                 onClick={() =>
// //                                   showConfirmation(
// //                                     handleActivate,
// //                                     vehicle._id,
// //                                     "Activate Vehicle Listing",
// //                                     `Are you sure you want to activate "${vehicle.carName}"? This vehicle will be available for booking.`,
// //                                     "activate",
// //                                   )
// //                                 }
// //                                 className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
// //                                 title="Activate"
// //                                 disabled={actionLoading}
// //                               >
// //                                 <FaPlay />
// //                               </button>
// //                             )}
// //                             {vehicle.status !== "inactive" &&
// //                               vehicle.status !== "rejected" && (
// //                                 <button
// //                                   onClick={() =>
// //                                     showConfirmation(
// //                                       handleDeactivate,
// //                                       vehicle._id,
// //                                       "Deactivate Vehicle Listing",
// //                                       `Are you sure you want to deactivate "${vehicle.carName}"? This vehicle will not be available for booking.`,
// //                                       "deactivate",
// //                                     )
// //                                   }
// //                                   className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition"
// //                                   title="Deactivate"
// //                                   disabled={actionLoading}
// //                                 >
// //                                   <FaStop />
// //                                 </button>
// //                               )}
// //                             <button
// //                               onClick={() =>
// //                                 showConfirmation(
// //                                   handleDelete,
// //                                   vehicle._id,
// //                                   "Delete Vehicle Permanently",
// //                                   `Are you sure you want to permanently delete "${vehicle.carName}"? This action cannot be undone.`,
// //                                   "delete",
// //                                 )
// //                               }
// //                               className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
// //                               title="Delete"
// //                               disabled={actionLoading}
// //                             >
// //                               <FaTrash />
// //                             </button>
// //                           </>
// //                         )}

// //                         {vehicle.status === "booked" && (
// //                           <>
// //                             <button
// //                               onClick={() =>
// //                                 showConfirmation(
// //                                   handleResetToActive,
// //                                   vehicle._id,
// //                                   "Reset Vehicle to Active",
// //                                   `Reset "${vehicle.carName}" from Booked to Active? This will make it available for new bookings.`,
// //                                   "reset",
// //                                 )
// //                               }
// //                               className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
// //                               title="Reset to Active"
// //                               disabled={actionLoading}
// //                             >
// //                               <FaHistory />
// //                             </button>
// //                             <button
// //                               onClick={() =>
// //                                 showConfirmation(
// //                                   handleDelete,
// //                                   vehicle._id,
// //                                   "Delete Vehicle Permanently",
// //                                   `Are you sure you want to permanently delete "${vehicle.carName}"? This action cannot be undone.`,
// //                                   "delete",
// //                                 )
// //                               }
// //                               className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
// //                               title="Delete"
// //                               disabled={actionLoading}
// //                             >
// //                               <FaTrash />
// //                             </button>
// //                           </>
// //                         )}
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         )}
// //       </div>

// //       {/* Vehicle Details Modal */}
// //       {showDetailsModal && selectedVehicle && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
// //           <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto">
// //             <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
// //               <div className="flex justify-between items-center">
// //                 <div className="flex items-center gap-3">
// //                   <FaInfoCircle className="text-blue-600 text-2xl" />
// //                   <h3 className="text-xl font-bold text-gray-800">
// //                     Vehicle Listing Details
// //                   </h3>
// //                 </div>
// //                 <button
// //                   onClick={() => setShowDetailsModal(false)}
// //                   className="text-gray-400 hover:text-gray-600"
// //                 >
// //                   <FaTimes size={24} />
// //                 </button>
// //               </div>
// //             </div>

// //             <div className="p-6">
// //               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //                 <div>
// //                   <h4 className="font-semibold text-gray-800 mb-3">
// //                     Vehicle Photos
// //                   </h4>
// //                   <div className="grid grid-cols-2 gap-3">
// //                     {selectedVehicle.vehiclePhotos?.map((photo, index) => (
// //                       <div key={index} className="relative">
// //                         <img
// //                           src={`http://localhost:5000${photo.url}`}
// //                           alt={photo.label}
// //                           className="w-full h-40 object-cover rounded-lg cursor-pointer"
// //                           onClick={() =>
// //                             openImageViewer(`http://localhost:5000${photo.url}`)
// //                           }
// //                         />
// //                         <p className="text-xs text-gray-500 mt-1 text-center">
// //                           {photo.label}
// //                         </p>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>

// //                 <div>
// //                   <h4 className="font-semibold text-gray-800 mb-3">
// //                     Vehicle Information
// //                   </h4>
// //                   <div className="space-y-3 bg-gray-50 rounded-lg p-4">
// //                     <div className="grid grid-cols-2 gap-4">
// //                       <div>
// //                         <p className="text-sm text-gray-500">Car Name</p>
// //                         <p className="font-medium">{selectedVehicle.carName}</p>
// //                       </div>
// //                       <div>
// //                         <p className="text-sm text-gray-500">Car Number</p>
// //                         <p className="font-medium">
// //                           {selectedVehicle.carNumber}
// //                         </p>
// //                       </div>
// //                       <div>
// //                         <p className="text-sm text-gray-500">Car Type</p>
// //                         <p className="font-medium">{selectedVehicle.carType}</p>
// //                       </div>
// //                       <div>
// //                         <p className="text-sm text-gray-500">Rate Per Day</p>
// //                         <p className="font-medium text-blue-600">
// //                           रु {selectedVehicle.ratePerDay}
// //                         </p>
// //                       </div>
// //                       <div>
// //                         <p className="text-sm text-gray-500">Seats</p>
// //                         <p className="font-medium">{selectedVehicle.seats}</p>
// //                       </div>
// //                       <div>
// //                         <p className="text-sm text-gray-500">Gear Type</p>
// //                         <p className="font-medium">
// //                           {selectedVehicle.gearType}
// //                         </p>
// //                       </div>
// //                       <div>
// //                         <p className="text-sm text-gray-500">Air Condition</p>
// //                         <p className="font-medium">
// //                           {selectedVehicle.airCondition}
// //                         </p>
// //                       </div>
// //                       <div>
// //                         <p className="text-sm text-gray-500">Booking Type</p>
// //                         <p className="font-medium">
// //                           {selectedVehicle.bookingType}
// //                         </p>
// //                       </div>
// //                     </div>
// //                     <div className="mt-2">
// //                       <p className="text-sm text-gray-500">Status</p>
// //                       {getStatusBadge(selectedVehicle.status)}
// //                     </div>
// //                     {selectedVehicle.description && (
// //                       <div>
// //                         <p className="text-sm text-gray-500">Description</p>
// //                         <p className="text-gray-700">
// //                           {selectedVehicle.description}
// //                         </p>
// //                       </div>
// //                     )}
// //                     {selectedVehicle.features?.length > 0 && (
// //                       <div>
// //                         <p className="text-sm text-gray-500">Features</p>
// //                         <div className="flex flex-wrap gap-2 mt-1">
// //                           {selectedVehicle.features.map((feature, idx) => (
// //                             <span
// //                               key={idx}
// //                               className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
// //                             >
// //                               {feature}
// //                             </span>
// //                           ))}
// //                         </div>
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="mt-6">
// //                 <h4 className="font-semibold text-gray-800 mb-3">
// //                   Owner Information
// //                 </h4>
// //                 <div className="bg-gray-50 rounded-lg p-4">
// //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                     <div>
// //                       <p className="text-sm text-gray-500">Full Name</p>
// //                       <p className="font-medium">{selectedVehicle.fullName}</p>
// //                     </div>
// //                     <div>
// //                       <p className="text-sm text-gray-500">
// //                         Citizenship Number
// //                       </p>
// //                       <p className="font-medium">
// //                         {selectedVehicle.citizenshipNumber}
// //                       </p>
// //                     </div>
// //                     <div>
// //                       <p className="text-sm text-gray-500">Phone Number</p>
// //                       <p className="font-medium">
// //                         {selectedVehicle.phoneNumber}
// //                       </p>
// //                     </div>
// //                     <div>
// //                       <p className="text-sm text-gray-500">Address</p>
// //                       <p className="font-medium">
// //                         {selectedVehicle.address}, {selectedVehicle.city},{" "}
// //                         {selectedVehicle.district}
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end gap-3">
// //                 {selectedVehicle.status === "pending" && (
// //                   <>
// //                     <button
// //                       onClick={() => {
// //                         setShowDetailsModal(false);
// //                         setShowRejectModal(true);
// //                       }}
// //                       className="px-6 py-2 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition font-medium"
// //                       disabled={actionLoading}
// //                     >
// //                       Reject Listing
// //                     </button>
// //                     <button
// //                       onClick={() =>
// //                         showConfirmation(
// //                           handleApprove,
// //                           selectedVehicle._id,
// //                           "Approve Vehicle Listing",
// //                           `Are you sure you want to approve "${selectedVehicle.carName}"? This vehicle will be listed for rent.`,
// //                           "approve",
// //                         )
// //                       }
// //                       className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium"
// //                       disabled={actionLoading}
// //                     >
// //                       {actionLoading ? (
// //                         <FaSpinner className="animate-spin" />
// //                       ) : (
// //                         "Approve Listing"
// //                       )}
// //                     </button>
// //                   </>
// //                 )}
// //                 {selectedVehicle.status === "booked" && (
// //                   <button
// //                     onClick={() =>
// //                       showConfirmation(
// //                         handleResetToActive,
// //                         selectedVehicle._id,
// //                         "Reset Vehicle to Active",
// //                         `Reset "${selectedVehicle.carName}" from Booked to Active? This will make it available for new bookings.`,
// //                         "reset",
// //                       )
// //                     }
// //                     className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium"
// //                     disabled={actionLoading}
// //                   >
// //                     {actionLoading ? (
// //                       <FaSpinner className="animate-spin" />
// //                     ) : (
// //                       "Reset to Active"
// //                     )}
// //                   </button>
// //                 )}
// //                 {(selectedVehicle.status === "approved" ||
// //                   selectedVehicle.status === "active" ||
// //                   selectedVehicle.status === "inactive") && (
// //                   <>
// //                     {selectedVehicle.status !== "active" && (
// //                       <button
// //                         onClick={() =>
// //                           showConfirmation(
// //                             handleActivate,
// //                             selectedVehicle._id,
// //                             "Activate Vehicle Listing",
// //                             `Are you sure you want to activate "${selectedVehicle.carName}"? This vehicle will be available for booking.`,
// //                             "activate",
// //                           )
// //                         }
// //                         className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium"
// //                         disabled={actionLoading}
// //                       >
// //                         Activate Listing
// //                       </button>
// //                     )}
// //                     {selectedVehicle.status !== "inactive" &&
// //                       selectedVehicle.status !== "rejected" && (
// //                         <button
// //                           onClick={() =>
// //                             showConfirmation(
// //                               handleDeactivate,
// //                               selectedVehicle._id,
// //                               "Deactivate Vehicle Listing",
// //                               `Are you sure you want to deactivate "${selectedVehicle.carName}"? This vehicle will not be available for booking.`,
// //                               "deactivate",
// //                             )
// //                           }
// //                           className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition font-medium"
// //                           disabled={actionLoading}
// //                         >
// //                           Deactivate Listing
// //                         </button>
// //                       )}
// //                     <button
// //                       onClick={() =>
// //                         showConfirmation(
// //                           handleDelete,
// //                           selectedVehicle._id,
// //                           "Delete Vehicle Permanently",
// //                           `Are you sure you want to permanently delete "${selectedVehicle.carName}"? This action cannot be undone.`,
// //                           "delete",
// //                         )
// //                       }
// //                       className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium"
// //                       disabled={actionLoading}
// //                     >
// //                       Delete Permanently
// //                     </button>
// //                   </>
// //                 )}
// //               </div>
// //               {selectedVehicle.rejectionReason && (
// //                 <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
// //                   <p className="text-red-600 font-medium">Rejection Reason:</p>
// //                   <p className="text-red-700 text-sm">
// //                     {selectedVehicle.rejectionReason}
// //                   </p>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Documents Verification Modal */}
// //       {showDocsModal && selectedVehicle && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
// //           <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto">
// //             <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
// //               <div className="flex justify-between items-center">
// //                 <div className="flex items-center gap-3">
// //                   <FaFileAlt className="text-purple-600 text-2xl" />
// //                   <h3 className="text-xl font-bold text-gray-800">
// //                     Document Verification - {selectedVehicle.carName}
// //                   </h3>
// //                 </div>
// //                 <button
// //                   onClick={() => setShowDocsModal(false)}
// //                   className="text-gray-400 hover:text-gray-600"
// //                 >
// //                   <FaTimes size={24} />
// //                 </button>
// //               </div>
// //               <p className="text-sm text-gray-500 mt-2">
// //                 Verify all documents before approving the vehicle listing
// //               </p>
// //             </div>

// //             <div className="p-6">
// //               <div className="mb-8">
// //                 <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
// //                   <FaUserCircle className="text-blue-500" /> Owner Identity
// //                   Documents
// //                 </h4>
// //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                   <div className="border rounded-lg p-4">
// //                     <div className="flex items-center justify-between mb-3">
// //                       <div className="flex items-center gap-2">
// //                         <FaCitizenship className="text-blue-500 text-xl" />
// //                         <p className="font-medium">Citizenship (Front)</p>
// //                       </div>
// //                       <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
// //                         Required
// //                       </span>
// //                     </div>
// //                     {selectedVehicle.citizenshipFront ? (
// //                       <img
// //                         src={`http://localhost:5000${selectedVehicle.citizenshipFront.url}`}
// //                         alt="Citizenship Front"
// //                         className="w-full h-40 object-cover rounded-lg cursor-pointer"
// //                         onClick={() =>
// //                           openImageViewer(
// //                             `http://localhost:5000${selectedVehicle.citizenshipFront.url}`,
// //                           )
// //                         }
// //                       />
// //                     ) : (
// //                       <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center">
// //                         <p className="text-gray-400 text-sm">Not uploaded</p>
// //                       </div>
// //                     )}
// //                   </div>
// //                   <div className="border rounded-lg p-4">
// //                     <div className="flex items-center justify-between mb-3">
// //                       <div className="flex items-center gap-2">
// //                         <FaCitizenship className="text-blue-500 text-xl" />
// //                         <p className="font-medium">Citizenship (Back)</p>
// //                       </div>
// //                       <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
// //                         Required
// //                       </span>
// //                     </div>
// //                     {selectedVehicle.citizenshipBack ? (
// //                       <img
// //                         src={`http://localhost:5000${selectedVehicle.citizenshipBack.url}`}
// //                         alt="Citizenship Back"
// //                         className="w-full h-40 object-cover rounded-lg cursor-pointer"
// //                         onClick={() =>
// //                           openImageViewer(
// //                             `http://localhost:5000${selectedVehicle.citizenshipBack.url}`,
// //                           )
// //                         }
// //                       />
// //                     ) : (
// //                       <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center">
// //                         <p className="text-gray-400 text-sm">Not uploaded</p>
// //                       </div>
// //                     )}
// //                   </div>
// //                   <div className="border rounded-lg p-4">
// //                     <div className="flex items-center justify-between mb-3">
// //                       <div className="flex items-center gap-2">
// //                         <FaUserCircle className="text-green-500 text-xl" />
// //                         <p className="font-medium">Passport Photo</p>
// //                       </div>
// //                       <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
// //                         Required
// //                       </span>
// //                     </div>
// //                     {selectedVehicle.passportPhoto ? (
// //                       <img
// //                         src={`http://localhost:5000${selectedVehicle.passportPhoto.url}`}
// //                         alt="Passport Photo"
// //                         className="w-full h-40 object-cover rounded-lg cursor-pointer"
// //                         onClick={() =>
// //                           openImageViewer(
// //                             `http://localhost:5000${selectedVehicle.passportPhoto.url}`,
// //                           )
// //                         }
// //                       />
// //                     ) : (
// //                       <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center">
// //                         <p className="text-gray-400 text-sm">Not uploaded</p>
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="mb-8">
// //                 <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
// //                   <FaShieldAlt className="text-purple-500" /> Vehicle Documents
// //                 </h4>
// //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                   {selectedVehicle.documents?.map((doc, index) => (
// //                     <div key={index} className="border rounded-lg p-4">
// //                       <div className="flex items-center gap-2 mb-2">
// //                         {doc.type === "bluebook" ? (
// //                           <FaFileInvoice className="text-purple-500" />
// //                         ) : doc.type === "insurance" ? (
// //                           <FaShieldAlt className="text-green-500" />
// //                         ) : (
// //                           <FaLeaf className="text-teal-500" />
// //                         )}
// //                         <p className="font-medium capitalize">
// //                           {doc.label || doc.type}
// //                         </p>
// //                       </div>
// //                       <img
// //                         src={`http://localhost:5000${doc.url}`}
// //                         alt={doc.type}
// //                         className="w-full h-32 object-cover rounded-lg cursor-pointer"
// //                         onClick={() =>
// //                           openImageViewer(`http://localhost:5000${doc.url}`)
// //                         }
// //                       />
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>

// //               <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
// //                 <button
// //                   onClick={() => setShowDocsModal(false)}
// //                   className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
// //                 >
// //                   Close
// //                 </button>
// //                 {selectedVehicle.status === "pending" && (
// //                   <>
// //                     <button
// //                       onClick={() => {
// //                         setShowDocsModal(false);
// //                         setShowRejectModal(true);
// //                       }}
// //                       className="px-6 py-2 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition font-medium"
// //                     >
// //                       Reject Listing
// //                     </button>
// //                     <button
// //                       onClick={() =>
// //                         showConfirmation(
// //                           handleApprove,
// //                           selectedVehicle._id,
// //                           "Approve Vehicle Listing",
// //                           `Are you sure you want to approve "${selectedVehicle.carName}"?`,
// //                           "approve",
// //                         )
// //                       }
// //                       className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium"
// //                     >
// //                       Approve Listing
// //                     </button>
// //                   </>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Reject Modal */}
// //       {showRejectModal && selectedVehicle && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
// //           <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
// //             <div className="p-6">
// //               <div className="flex items-center gap-3 mb-4">
// //                 <FaTimesCircle className="text-red-600 text-2xl" />
// //                 <h3 className="text-xl font-bold text-gray-800">
// //                   Reject Vehicle Listing
// //                 </h3>
// //               </div>
// //               <p className="text-gray-600 mb-4">
// //                 Are you sure you want to reject the listing for{" "}
// //                 <strong>{selectedVehicle.carName}</strong>?
// //               </p>
// //               <div className="mb-4">
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Reason for Rejection *
// //                 </label>
// //                 <textarea
// //                   value={rejectionReason}
// //                   onChange={(e) => setRejectionReason(e.target.value)}
// //                   rows="4"
// //                   className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none"
// //                   placeholder="Please provide a reason for rejecting this listing..."
// //                   required
// //                 />
// //               </div>
// //               <div className="flex justify-end gap-3">
// //                 <button
// //                   onClick={() => {
// //                     setShowRejectModal(false);
// //                     setRejectionReason("");
// //                   }}
// //                   className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
// //                 >
// //                   Cancel
// //                 </button>
// //                 <button
// //                   onClick={() => handleReject(selectedVehicle._id)}
// //                   className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium"
// //                   disabled={actionLoading}
// //                 >
// //                   Reject Listing
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Image Viewer Modal */}
// //       {showImageViewer && selectedImage && (
// //         <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-[60]">
// //           <div className="relative max-w-5xl max-h-[90vh]">
// //             <button
// //               onClick={() => setShowImageViewer(false)}
// //               className="absolute -top-12 right-0 text-white hover:text-gray-300 transition"
// //             >
// //               <FaTimes size={32} />
// //             </button>
// //             <img
// //               src={selectedImage}
// //               alt="Document Preview"
// //               className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
// //             />
// //             <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg text-sm">
// //               Click outside or press ESC to close
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default AdminVehicleVerification;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   FaCar,
//   FaUser,
//   FaPhone,
//   FaIdCard,
//   FaMapMarkerAlt,
//   FaRupeeSign,
//   FaChair,
//   FaCogs,
//   FaSnowflake,
//   FaImage,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaClock,
//   FaEye,
//   FaFileAlt,
//   FaSearch,
//   FaFilter,
//   FaInfoCircle,
//   FaArrowLeft,
//   FaTimes,
//   FaExpand,
//   FaShieldAlt,
//   FaFileInvoice,
//   FaLeaf,
//   FaIdCard as FaCitizenship,
//   FaUserCircle,
//   FaEdit,
//   FaTrash,
//   FaBan,
//   FaPlay,
//   FaStop,
//   FaFilePdf,
//   FaFileImage,
//   FaDownload,
//   FaBook,
//   FaHistory,
//   FaSpinner,
//   FaQuestionCircle,
// } from "react-icons/fa";

// const AdminVehicleVerification = () => {
//   const navigate = useNavigate();
//   const [vehicles, setVehicles] = useState([]);
//   const [filteredVehicles, setFilteredVehicles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selectedVehicle, setSelectedVehicle] = useState(null);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [showDocsModal, setShowDocsModal] = useState(false);
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [rejectionReason, setRejectionReason] = useState("");
//   const [showRejectModal, setShowRejectModal] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [showImageViewer, setShowImageViewer] = useState(false);
//   const [actionLoading, setActionLoading] = useState(false);

//   // Confirmation Modal State
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [confirmAction, setConfirmAction] = useState(null);
//   const [confirmVehicleId, setConfirmVehicleId] = useState(null);
//   const [confirmTitle, setConfirmTitle] = useState("");
//   const [confirmMessage, setConfirmMessage] = useState("");
//   const [confirmType, setConfirmType] = useState("");

//   // Result animation state
//   const [showResultAnimation, setShowResultAnimation] = useState(false);
//   const [resultType, setResultType] = useState("");
//   const [resultLabel, setResultLabel] = useState("");

//   const [stats, setStats] = useState({
//     total: 0,
//     pending: 0,
//     approved: 0,
//     rejected: 0,
//     active: 0,
//     inactive: 0,
//     booked: 0,
//   });

//   useEffect(() => {
//     fetchVehicles();
//     const interval = setInterval(() => {
//       fetchVehicles();
//     }, 30000);
//     return () => clearInterval(interval);
//   }, []);

//   const fetchVehicles = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       const token =
//         localStorage.getItem("token") || sessionStorage.getItem("token");
//       if (!token) {
//         setError("No authentication token found. Please login again.");
//         setLoading(false);
//         return;
//       }
//       const response = await axios.get(
//         "http://localhost:5000/api/user-vehicles/admin/all",
//         { headers: { Authorization: `Bearer ${token}` } },
//       );
//       if (response.data && response.data.success) {
//         let vehiclesData = [];
//         if (response.data.data && response.data.data.vehicles) {
//           vehiclesData = response.data.data.vehicles;
//         } else if (response.data.vehicles) {
//           vehiclesData = response.data.vehicles;
//         } else if (Array.isArray(response.data.data)) {
//           vehiclesData = response.data.data;
//         } else if (Array.isArray(response.data)) {
//           vehiclesData = response.data;
//         }
//         setVehicles(vehiclesData);
//         setFilteredVehicles(vehiclesData);
//         calculateStats(vehiclesData);
//       } else {
//         setError(response.data?.message || "Failed to fetch vehicles");
//         setVehicles([]);
//         setFilteredVehicles([]);
//         calculateStats([]);
//       }
//     } catch (error) {
//       console.error("Error fetching vehicles:", error);
//       if (error.response) {
//         setError(
//           error.response.data?.message ||
//             `Server error: ${error.response.status}`,
//         );
//       } else if (error.request) {
//         setError(
//           "Cannot connect to server. Please check if backend is running.",
//         );
//       } else {
//         setError(error.message);
//       }
//       setVehicles([]);
//       setFilteredVehicles([]);
//       calculateStats([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const calculateStats = (vehiclesData) => {
//     const data = Array.isArray(vehiclesData) ? vehiclesData : [];
//     setStats({
//       total: data.length,
//       pending: data.filter((v) => v?.status === "pending").length,
//       approved: data.filter((v) => v?.status === "approved").length,
//       rejected: data.filter((v) => v?.status === "rejected").length,
//       active: data.filter((v) => v?.status === "active").length,
//       inactive: data.filter((v) => v?.status === "inactive").length,
//       booked: data.filter((v) => v?.status === "booked").length,
//     });
//   };

//   const showConfirmation = (action, vehicleId, title, message, type) => {
//     setConfirmAction(() => action);
//     setConfirmVehicleId(vehicleId);
//     setConfirmTitle(title);
//     setConfirmMessage(message);
//     setConfirmType(type);
//     setShowConfirmModal(true);
//   };

//   const executeAction = async () => {
//     if (confirmAction) await confirmAction(confirmVehicleId);
//     setShowConfirmModal(false);
//     setConfirmAction(null);
//     setConfirmVehicleId(null);
//   };

//   const triggerResult = (type, label) => {
//     setResultType(type);
//     setResultLabel(label);
//     setShowResultAnimation(true);
//     setTimeout(() => setShowResultAnimation(false), 3000);
//   };

//   // ── Action handlers ────────────────────────────────────────────────────────
//   const handleApprove = async (vehicleId) => {
//     setActionLoading(true);
//     try {
//       const token =
//         localStorage.getItem("token") || sessionStorage.getItem("token");
//       await axios.post(
//         `http://localhost:5000/api/user-vehicles/admin/${vehicleId}/approve`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } },
//       );
//       await fetchVehicles();
//       setShowDetailsModal(false);
//       setShowDocsModal(false);
//       triggerResult("approved", "APPROVED!");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to approve vehicle");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handleReject = async (vehicleId) => {
//     if (!rejectionReason.trim()) {
//       toast.error("Please provide a reason for rejection");
//       return;
//     }
//     setActionLoading(true);
//     try {
//       const token =
//         localStorage.getItem("token") || sessionStorage.getItem("token");
//       await axios.post(
//         `http://localhost:5000/api/user-vehicles/admin/${vehicleId}/reject`,
//         { reason: rejectionReason },
//         { headers: { Authorization: `Bearer ${token}` } },
//       );
//       await fetchVehicles();
//       setShowRejectModal(false);
//       setRejectionReason("");
//       setShowDetailsModal(false);
//       setShowDocsModal(false);
//       triggerResult("rejected", "REJECTED");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to reject vehicle");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handleActivate = async (vehicleId) => {
//     setActionLoading(true);
//     try {
//       const token =
//         localStorage.getItem("token") || sessionStorage.getItem("token");
//       await axios.put(
//         `http://localhost:5000/api/user-vehicles/admin/${vehicleId}/activate`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } },
//       );
//       await fetchVehicles();
//       setShowDetailsModal(false);
//       setShowDocsModal(false);
//       triggerResult("activated", "ACTIVATED!");
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || "Failed to activate vehicle",
//       );
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handleDeactivate = async (vehicleId) => {
//     setActionLoading(true);
//     try {
//       const token =
//         localStorage.getItem("token") || sessionStorage.getItem("token");
//       await axios.put(
//         `http://localhost:5000/api/user-vehicles/admin/${vehicleId}/deactivate`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } },
//       );
//       await fetchVehicles();
//       setShowDetailsModal(false);
//       setShowDocsModal(false);
//       triggerResult("deactivated", "DEACTIVATED");
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || "Failed to deactivate vehicle",
//       );
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handleDelete = async (vehicleId) => {
//     setActionLoading(true);
//     try {
//       const token =
//         localStorage.getItem("token") || sessionStorage.getItem("token");
//       await axios.delete(
//         `http://localhost:5000/api/user-vehicles/admin/${vehicleId}/delete`,
//         { headers: { Authorization: `Bearer ${token}` } },
//       );
//       await fetchVehicles();
//       setShowDetailsModal(false);
//       setShowDocsModal(false);
//       triggerResult("deleted", "DELETED");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to delete vehicle");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handleResetToActive = async (vehicleId) => {
//     setActionLoading(true);
//     try {
//       const token =
//         localStorage.getItem("token") || sessionStorage.getItem("token");
//       await axios.put(
//         `http://localhost:5000/api/user-vehicles/admin/${vehicleId}/fix-status`,
//         { status: "active", isListed: true },
//         { headers: { Authorization: `Bearer ${token}` } },
//       );
//       await fetchVehicles();
//       setShowDetailsModal(false);
//       setShowDocsModal(false);
//       triggerResult("activated", "RESET TO ACTIVE!");
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || "Failed to reset vehicle status",
//       );
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handleViewDetails = (vehicle) => {
//     setSelectedVehicle(vehicle);
//     setShowDetailsModal(true);
//   };
//   const handleViewDocuments = (vehicle) => {
//     setSelectedVehicle(vehicle);
//     setShowDocsModal(true);
//   };

//   const handleFilterChange = (status) => {
//     setFilterStatus(status);
//     setFilteredVehicles(
//       status === "all" ? vehicles : vehicles.filter((v) => v.status === status),
//     );
//   };

//   const handleSearch = (e) => {
//     const term = e.target.value.toLowerCase();
//     setSearchTerm(term);
//     let filtered = vehicles;
//     if (filterStatus !== "all")
//       filtered = filtered.filter((v) => v.status === filterStatus);
//     setFilteredVehicles(
//       filtered.filter(
//         (vehicle) =>
//           vehicle?.carName?.toLowerCase().includes(term) ||
//           vehicle?.carNumber?.toLowerCase().includes(term) ||
//           vehicle?.fullName?.toLowerCase().includes(term) ||
//           vehicle?.citizenshipNumber?.toLowerCase().includes(term),
//       ),
//     );
//   };

//   const getStatusBadge = (status) => {
//     const statusConfig = {
//       pending: {
//         color: "bg-yellow-100 text-yellow-800",
//         icon: FaClock,
//         label: "Pending",
//       },
//       approved: {
//         color: "bg-blue-100 text-blue-800",
//         icon: FaCheckCircle,
//         label: "Approved",
//       },
//       rejected: {
//         color: "bg-red-100 text-red-800",
//         icon: FaTimesCircle,
//         label: "Rejected",
//       },
//       active: {
//         color: "bg-green-100 text-green-800",
//         icon: FaPlay,
//         label: "Active",
//       },
//       inactive: {
//         color: "bg-gray-100 text-gray-800",
//         icon: FaStop,
//         label: "Inactive",
//       },
//       booked: {
//         color: "bg-orange-100 text-orange-800",
//         icon: FaBook,
//         label: "Booked",
//       },
//     };
//     const config = statusConfig[status] || statusConfig.pending;
//     const Icon = config.icon;
//     return (
//       <span
//         className={`px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-1 ${config.color}`}
//       >
//         <Icon size={12} /> {config.label}
//       </span>
//     );
//   };

//   const openImageViewer = (imageUrl) => {
//     setSelectedImage(imageUrl);
//     setShowImageViewer(true);
//   };

//   // ── Detect image by extension (schema has no mimetype field) ───────────────
//   const isImage = (urlOrFilename) => {
//     if (!urlOrFilename) return false;
//     return /\.(jpg|jpeg|png|webp|gif)$/i.test(urlOrFilename);
//   };

//   // ── Grand confirmation modal styles ────────────────────────────────────────
//   const getConfirmStyle = () => {
//     const styles = {
//       approve: {
//         grad: "from-green-400 to-emerald-500",
//         btn: "from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600",
//         shadow: "shadow-green-200",
//         icon: "✓",
//         text: "Yes, Approve",
//       },
//       reject: {
//         grad: "from-red-400 to-rose-500",
//         btn: "from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600",
//         shadow: "shadow-red-200",
//         icon: "✕",
//         text: "Yes, Reject",
//       },
//       activate: {
//         grad: "from-green-400 to-emerald-500",
//         btn: "from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600",
//         shadow: "shadow-green-200",
//         icon: "▶",
//         text: "Yes, Activate",
//       },
//       deactivate: {
//         grad: "from-yellow-400 to-amber-500",
//         btn: "from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600",
//         shadow: "shadow-yellow-200",
//         icon: "⏸",
//         text: "Yes, Deactivate",
//       },
//       delete: {
//         grad: "from-red-500 to-rose-600",
//         btn: "from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700",
//         shadow: "shadow-red-300",
//         icon: "🗑",
//         text: "Yes, Delete",
//       },
//       reset: {
//         grad: "from-blue-400 to-indigo-500",
//         btn: "from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600",
//         shadow: "shadow-blue-200",
//         icon: "↺",
//         text: "Yes, Reset",
//       },
//     };
//     return styles[confirmType] || styles.approve;
//   };

//   const getResultStyle = () => {
//     const styles = {
//       approved: {
//         grad: "from-green-400 to-emerald-500",
//         shadow: "shadow-green-500/50",
//         sub: "text-green-200",
//       },
//       rejected: {
//         grad: "from-red-400 to-rose-500",
//         shadow: "shadow-red-500/50",
//         sub: "text-red-200",
//       },
//       activated: {
//         grad: "from-green-400 to-emerald-500",
//         shadow: "shadow-green-500/50",
//         sub: "text-green-200",
//       },
//       deactivated: {
//         grad: "from-yellow-400 to-amber-500",
//         shadow: "shadow-yellow-500/50",
//         sub: "text-yellow-100",
//       },
//       deleted: {
//         grad: "from-red-500 to-rose-600",
//         shadow: "shadow-red-500/50",
//         sub: "text-red-200",
//       },
//     };
//     return styles[resultType] || styles.approved;
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-96">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading vehicle listings...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error && vehicles.length === 0) {
//     return (
//       <div className="flex items-center justify-center h-96">
//         <div className="text-center max-w-md">
//           <div className="text-red-600 text-5xl mb-4">⚠️</div>
//           <h2 className="text-xl font-semibold mb-2">Error Loading Vehicles</h2>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={fetchVehicles}
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const confirmStyle = getConfirmStyle();
//   const resultStyle = getResultStyle();

//   return (
//     <div className="p-8">
//       <ToastContainer position="top-right" autoClose={3000} />

//       {/* ══════════ GRAND CONFIRMATION MODAL ══════════ */}
//       {showConfirmModal && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center">
//           <div
//             className="absolute inset-0 bg-black/70 backdrop-blur-md"
//             onClick={() => setShowConfirmModal(false)}
//           />
//           <div
//             className="relative w-full max-w-md mx-4"
//             style={{
//               animation: "modalPop 0.35s cubic-bezier(0.34,1.56,0.64,1) both",
//             }}
//           >
//             <div
//               className={`absolute -inset-1 rounded-3xl blur-xl opacity-60 bg-gradient-to-r ${confirmStyle.grad}`}
//             />
//             <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
//               <div
//                 className={`h-2 w-full bg-gradient-to-r ${confirmStyle.grad}`}
//               />
//               <div className="p-8 text-center">
//                 <div
//                   className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center shadow-lg bg-gradient-to-br ${confirmStyle.grad}`}
//                   style={{
//                     animation:
//                       "iconBounce 0.5s 0.2s cubic-bezier(0.34,1.56,0.64,1) both",
//                   }}
//                 >
//                   <span className="text-white text-4xl font-bold">
//                     {confirmStyle.icon}
//                   </span>
//                 </div>
//                 <h3 className="text-2xl font-black text-gray-900 mb-2">
//                   {confirmTitle}
//                 </h3>
//                 <p className="text-gray-500 mb-8 leading-relaxed">
//                   {confirmMessage}
//                 </p>
//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => setShowConfirmModal(false)}
//                     className="flex-1 px-5 py-3.5 border-2 border-gray-200 text-gray-600 font-semibold rounded-2xl hover:bg-gray-50 transition-all duration-200"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={executeAction}
//                     disabled={actionLoading}
//                     className={`flex-1 px-5 py-3.5 text-white font-bold rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg ${confirmStyle.shadow} hover:scale-[1.02] disabled:opacity-50 bg-gradient-to-r ${confirmStyle.btn}`}
//                   >
//                     {actionLoading ? (
//                       <FaSpinner className="animate-spin" />
//                     ) : (
//                       confirmStyle.text
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ══════════ RESULT ANIMATION OVERLAY ══════════ */}
//       {showResultAnimation && (
//         <div className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none">
//           <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
//           <div
//             className="relative flex flex-col items-center justify-center"
//             style={{ animation: "resultFadeIn 0.4s ease-out both" }}
//           >
//             <div
//               className={`w-40 h-40 rounded-full bg-gradient-to-br ${resultStyle.grad} flex items-center justify-center shadow-2xl ${resultStyle.shadow} mb-6`}
//               style={{
//                 animation:
//                   "resultBounce 0.6s cubic-bezier(0.34,1.56,0.64,1) both",
//               }}
//             >
//               <span className="text-white text-6xl font-bold">
//                 {resultType === "approved" || resultType === "activated"
//                   ? "✓"
//                   : resultType === "rejected" || resultType === "deleted"
//                     ? "✕"
//                     : "⏸"}
//               </span>
//             </div>
//             <div
//               className="text-center text-white"
//               style={{
//                 animation: "resultFadeIn 0.4s 0.5s ease-out both",
//                 opacity: 0,
//               }}
//             >
//               <p className="text-4xl font-black tracking-wide drop-shadow-lg">
//                 {resultLabel}
//               </p>
//               <p className={`mt-2 text-lg font-medium ${resultStyle.sub}`}>
//                 Vehicle has been {resultType} successfully
//               </p>
//             </div>
//             {(resultType === "approved" || resultType === "activated") &&
//               [...Array(12)].map((_, i) => (
//                 <div
//                   key={i}
//                   className="absolute w-3 h-3 rounded-full"
//                   style={{
//                     background: [
//                       "#10b981",
//                       "#34d399",
//                       "#6ee7b7",
//                       "#fbbf24",
//                       "#f59e0b",
//                       "#3b82f6",
//                       "#60a5fa",
//                       "#a78bfa",
//                       "#f472b6",
//                     ][i % 9],
//                     animation: `confetti${i} 1s 0.3s ease-out both`,
//                     top: "50%",
//                     left: "50%",
//                   }}
//                 />
//               ))}
//           </div>
//           <style>{`
//             @keyframes modalPop{from{opacity:0;transform:scale(0.8) translateY(20px);}to{opacity:1;transform:scale(1) translateY(0);}}
//             @keyframes iconBounce{from{opacity:0;transform:scale(0);}to{opacity:1;transform:scale(1);}}
//             @keyframes resultFadeIn{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
//             @keyframes resultBounce{from{opacity:0;transform:scale(0.3);}to{opacity:1;transform:scale(1);}}
//             @keyframes confetti0{0%{opacity:1;transform:translate(-50%,-50%);}100%{opacity:0;transform:translate(calc(-50% + 120px),calc(-50% + 0px)) scale(0);}}
//             @keyframes confetti1{0%{opacity:1;transform:translate(-50%,-50%);}100%{opacity:0;transform:translate(calc(-50% + 104px),calc(-50% + 60px)) scale(0);}}
//             @keyframes confetti2{0%{opacity:1;transform:translate(-50%,-50%);}100%{opacity:0;transform:translate(calc(-50% + 60px),calc(-50% + 104px)) scale(0);}}
//             @keyframes confetti3{0%{opacity:1;transform:translate(-50%,-50%);}100%{opacity:0;transform:translate(calc(-50% + 0px),calc(-50% + 130px)) scale(0);}}
//             @keyframes confetti4{0%{opacity:1;transform:translate(-50%,-50%);}100%{opacity:0;transform:translate(calc(-50% + -60px),calc(-50% + 104px)) scale(0);}}
//             @keyframes confetti5{0%{opacity:1;transform:translate(-50%,-50%);}100%{opacity:0;transform:translate(calc(-50% + -104px),calc(-50% + 60px)) scale(0);}}
//             @keyframes confetti6{0%{opacity:1;transform:translate(-50%,-50%);}100%{opacity:0;transform:translate(calc(-50% + -140px),calc(-50% + 0px)) scale(0);}}
//             @keyframes confetti7{0%{opacity:1;transform:translate(-50%,-50%);}100%{opacity:0;transform:translate(calc(-50% + -104px),calc(-50% + -60px)) scale(0);}}
//             @keyframes confetti8{0%{opacity:1;transform:translate(-50%,-50%);}100%{opacity:0;transform:translate(calc(-50% + -60px),calc(-50% + -104px)) scale(0);}}
//             @keyframes confetti9{0%{opacity:1;transform:translate(-50%,-50%);}100%{opacity:0;transform:translate(calc(-50% + 0px),calc(-50% + -130px)) scale(0);}}
//             @keyframes confetti10{0%{opacity:1;transform:translate(-50%,-50%);}100%{opacity:0;transform:translate(calc(-50% + 60px),calc(-50% + -104px)) scale(0);}}
//             @keyframes confetti11{0%{opacity:1;transform:translate(-50%,-50%);}100%{opacity:0;transform:translate(calc(-50% + 104px),calc(-50% + -60px)) scale(0);}}
//           `}</style>
//         </div>
//       )}

//       {/* ══════════ PAGE HEADER (original) ══════════ */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//           Vehicle Verification Dashboard
//         </h1>
//         <p className="text-gray-500 mt-2">
//           Review and verify user-submitted vehicle listings
//         </p>
//       </div>

//       {/* ══════════ STATS (original) ══════════ */}
//       <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-8">
//         <div className="bg-white rounded-lg shadow p-4">
//           <p className="text-gray-500 text-sm">Total Listings</p>
//           <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
//         </div>
//         <div className="bg-yellow-50 rounded-lg shadow p-4 border-l-4 border-yellow-500">
//           <p className="text-yellow-600 text-sm">Pending</p>
//           <p className="text-2xl font-bold text-yellow-700">{stats.pending}</p>
//         </div>
//         <div className="bg-blue-50 rounded-lg shadow p-4 border-l-4 border-blue-500">
//           <p className="text-blue-600 text-sm">Approved</p>
//           <p className="text-2xl font-bold text-blue-700">{stats.approved}</p>
//         </div>
//         <div className="bg-green-50 rounded-lg shadow p-4 border-l-4 border-green-500">
//           <p className="text-green-600 text-sm">Active</p>
//           <p className="text-2xl font-bold text-green-700">{stats.active}</p>
//         </div>
//         <div className="bg-gray-50 rounded-lg shadow p-4 border-l-4 border-gray-500">
//           <p className="text-gray-600 text-sm">Inactive</p>
//           <p className="text-2xl font-bold text-gray-700">{stats.inactive}</p>
//         </div>
//         <div className="bg-red-50 rounded-lg shadow p-4 border-l-4 border-red-500">
//           <p className="text-red-600 text-sm">Rejected</p>
//           <p className="text-2xl font-bold text-red-700">{stats.rejected}</p>
//         </div>
//         <div className="bg-orange-50 rounded-lg shadow p-4 border-l-4 border-orange-500">
//           <p className="text-orange-600 text-sm">Booked</p>
//           <p className="text-2xl font-bold text-orange-700">{stats.booked}</p>
//         </div>
//       </div>

//       {/* ══════════ BOOKED BANNER (original) ══════════ */}
//       {stats.booked > 0 && (
//         <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <FaHistory className="text-orange-600 text-xl" />
//             <div>
//               <p className="text-orange-800 font-medium">
//                 Booked Vehicles Notice
//               </p>
//               <p className="text-orange-700 text-sm">
//                 {stats.booked} vehicle(s) are currently booked. They will
//                 automatically become "Active" when the booking period ends.
//               </p>
//             </div>
//           </div>
//           <button
//             onClick={() => handleFilterChange("booked")}
//             className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition text-sm"
//           >
//             View Booked Vehicles
//           </button>
//         </div>
//       )}

//       {/* ══════════ FILTERS & SEARCH (original) ══════════ */}
//       <div className="bg-white rounded-lg shadow mb-6 p-4">
//         <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
//           <div className="flex gap-2 overflow-x-auto pb-2">
//             {[
//               "all",
//               "pending",
//               "approved",
//               "active",
//               "inactive",
//               "rejected",
//               "booked",
//             ].map((status) => (
//               <button
//                 key={status}
//                 onClick={() => handleFilterChange(status)}
//                 className={`px-4 py-2 rounded-lg font-medium transition capitalize ${
//                   filterStatus === status
//                     ? status === "pending"
//                       ? "bg-yellow-500 text-white"
//                       : status === "approved"
//                         ? "bg-blue-600 text-white"
//                         : status === "active"
//                           ? "bg-green-600 text-white"
//                           : status === "inactive"
//                             ? "bg-gray-600 text-white"
//                             : status === "rejected"
//                               ? "bg-red-600 text-white"
//                               : status === "booked"
//                                 ? "bg-orange-600 text-white"
//                                 : "bg-blue-600 text-white"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 {status === "all" ? "All" : status}
//               </button>
//             ))}
//           </div>
//           <div className="relative w-full md:w-64">
//             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search by car name, number, owner..."
//               value={searchTerm}
//               onChange={handleSearch}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         </div>
//       </div>

//       {/* ══════════ TABLE (original) ══════════ */}
//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         {vehicles.length === 0 ? (
//           <div className="text-center py-12">
//             <FaCar className="text-5xl text-gray-300 mx-auto mb-3" />
//             <p className="text-gray-500">No vehicle listings found</p>
//             <p className="text-sm text-gray-400 mt-1">
//               Vehicles will appear here once users list them
//             </p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   {[
//                     "Vehicle",
//                     "Owner",
//                     "Car Number",
//                     "Rate/Day",
//                     "Status",
//                     "Submitted",
//                     "Actions",
//                   ].map((h) => (
//                     <th
//                       key={h}
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                     >
//                       {h}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {filteredVehicles.map((vehicle) => (
//                   <tr key={vehicle._id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-3">
//                         {vehicle.vehiclePhotos && vehicle.vehiclePhotos[0] ? (
//                           <img
//                             src={`http://localhost:5000${vehicle.vehiclePhotos[0].url}`}
//                             alt={vehicle.carName}
//                             className="w-12 h-12 object-cover rounded-lg"
//                           />
//                         ) : (
//                           <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
//                             <FaCar className="text-gray-400" />
//                           </div>
//                         )}
//                         <div>
//                           <p className="font-medium text-gray-900">
//                             {vehicle.carName}
//                           </p>
//                           <p className="text-sm text-gray-500">
//                             {vehicle.carType} • {vehicle.seats} seats
//                           </p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <p className="text-sm font-medium text-gray-900">
//                         {vehicle.fullName}
//                       </p>
//                       <p className="text-sm text-gray-500">
//                         {vehicle.phoneNumber}
//                       </p>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-900">
//                       {vehicle.carNumber}
//                     </td>
//                     <td className="px-6 py-4 text-sm font-medium text-gray-900">
//                       रु {vehicle.ratePerDay}
//                     </td>
//                     <td className="px-6 py-4">
//                       {getStatusBadge(vehicle.status)}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-500">
//                       {new Date(vehicle.createdAt).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex space-x-2">
//                         <button
//                           onClick={() => handleViewDetails(vehicle)}
//                           className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
//                           title="View Details"
//                         >
//                           <FaEye />
//                         </button>
//                         <button
//                           onClick={() => handleViewDocuments(vehicle)}
//                           className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition"
//                           title="View Documents"
//                         >
//                           <FaFileAlt />
//                         </button>
//                         {vehicle.status === "pending" && (
//                           <>
//                             <button
//                               onClick={() =>
//                                 showConfirmation(
//                                   handleApprove,
//                                   vehicle._id,
//                                   "Approve Vehicle Listing",
//                                   `Are you sure you want to approve "${vehicle.carName}"? This vehicle will be listed for rent.`,
//                                   "approve",
//                                 )
//                               }
//                               className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
//                               title="Approve"
//                               disabled={actionLoading}
//                             >
//                               <FaCheckCircle />
//                             </button>
//                             <button
//                               onClick={() => {
//                                 setSelectedVehicle(vehicle);
//                                 setShowRejectModal(true);
//                               }}
//                               className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
//                               title="Reject"
//                               disabled={actionLoading}
//                             >
//                               <FaTimesCircle />
//                             </button>
//                           </>
//                         )}
//                         {(vehicle.status === "approved" ||
//                           vehicle.status === "active" ||
//                           vehicle.status === "inactive") && (
//                           <>
//                             {vehicle.status !== "active" && (
//                               <button
//                                 onClick={() =>
//                                   showConfirmation(
//                                     handleActivate,
//                                     vehicle._id,
//                                     "Activate Vehicle Listing",
//                                     `Are you sure you want to activate "${vehicle.carName}"? This vehicle will be available for booking.`,
//                                     "activate",
//                                   )
//                                 }
//                                 className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
//                                 title="Activate"
//                                 disabled={actionLoading}
//                               >
//                                 <FaPlay />
//                               </button>
//                             )}
//                             {vehicle.status !== "inactive" &&
//                               vehicle.status !== "rejected" && (
//                                 <button
//                                   onClick={() =>
//                                     showConfirmation(
//                                       handleDeactivate,
//                                       vehicle._id,
//                                       "Deactivate Vehicle Listing",
//                                       `Are you sure you want to deactivate "${vehicle.carName}"? This vehicle will not be available for booking.`,
//                                       "deactivate",
//                                     )
//                                   }
//                                   className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition"
//                                   title="Deactivate"
//                                   disabled={actionLoading}
//                                 >
//                                   <FaStop />
//                                 </button>
//                               )}
//                             <button
//                               onClick={() =>
//                                 showConfirmation(
//                                   handleDelete,
//                                   vehicle._id,
//                                   "Delete Vehicle Permanently",
//                                   `Are you sure you want to permanently delete "${vehicle.carName}"? This action cannot be undone.`,
//                                   "delete",
//                                 )
//                               }
//                               className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
//                               title="Delete"
//                               disabled={actionLoading}
//                             >
//                               <FaTrash />
//                             </button>
//                           </>
//                         )}
//                         {vehicle.status === "booked" && (
//                           <>
//                             <button
//                               onClick={() =>
//                                 showConfirmation(
//                                   handleResetToActive,
//                                   vehicle._id,
//                                   "Reset Vehicle to Active",
//                                   `Reset "${vehicle.carName}" from Booked to Active? This will make it available for new bookings.`,
//                                   "reset",
//                                 )
//                               }
//                               className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
//                               title="Reset to Active"
//                               disabled={actionLoading}
//                             >
//                               <FaHistory />
//                             </button>
//                             <button
//                               onClick={() =>
//                                 showConfirmation(
//                                   handleDelete,
//                                   vehicle._id,
//                                   "Delete Vehicle Permanently",
//                                   `Are you sure you want to permanently delete "${vehicle.carName}"? This action cannot be undone.`,
//                                   "delete",
//                                 )
//                               }
//                               className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
//                               title="Delete"
//                               disabled={actionLoading}
//                             >
//                               <FaTrash />
//                             </button>
//                           </>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* ══════════ VEHICLE DETAILS MODAL (original — unchanged) ══════════ */}
//       {showDetailsModal && selectedVehicle && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
//           <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
//               <div className="flex justify-between items-center">
//                 <div className="flex items-center gap-3">
//                   <FaInfoCircle className="text-blue-600 text-2xl" />
//                   <h3 className="text-xl font-bold text-gray-800">
//                     Vehicle Listing Details
//                   </h3>
//                 </div>
//                 <button
//                   onClick={() => setShowDetailsModal(false)}
//                   className="text-gray-400 hover:text-gray-600"
//                 >
//                   <FaTimes size={24} />
//                 </button>
//               </div>
//             </div>
//             <div className="p-6">
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 <div>
//                   <h4 className="font-semibold text-gray-800 mb-3">
//                     Vehicle Photos
//                   </h4>
//                   <div className="grid grid-cols-2 gap-3">
//                     {selectedVehicle.vehiclePhotos?.map((photo, index) => (
//                       <div key={index} className="relative">
//                         <img
//                           src={`http://localhost:5000${photo.url}`}
//                           alt={photo.label}
//                           className="w-full h-40 object-cover rounded-lg cursor-pointer"
//                           onClick={() =>
//                             openImageViewer(`http://localhost:5000${photo.url}`)
//                           }
//                         />
//                         <p className="text-xs text-gray-500 mt-1 text-center">
//                           {photo.label}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//                 <div>
//                   <h4 className="font-semibold text-gray-800 mb-3">
//                     Vehicle Information
//                   </h4>
//                   <div className="space-y-3 bg-gray-50 rounded-lg p-4">
//                     <div className="grid grid-cols-2 gap-4">
//                       {[
//                         ["Car Name", selectedVehicle.carName],
//                         ["Car Number", selectedVehicle.carNumber],
//                         ["Car Type", selectedVehicle.carType],
//                         ["Rate Per Day", `रु ${selectedVehicle.ratePerDay}`],
//                         ["Seats", selectedVehicle.seats],
//                         ["Gear Type", selectedVehicle.gearType],
//                         ["Air Condition", selectedVehicle.airCondition],
//                         ["Booking Type", selectedVehicle.bookingType],
//                       ].map(([label, value]) => (
//                         <div key={label}>
//                           <p className="text-sm text-gray-500">{label}</p>
//                           <p className="font-medium">{value}</p>
//                         </div>
//                       ))}
//                     </div>
//                     <div className="mt-2">
//                       <p className="text-sm text-gray-500">Status</p>
//                       {getStatusBadge(selectedVehicle.status)}
//                     </div>
//                     {selectedVehicle.description && (
//                       <div>
//                         <p className="text-sm text-gray-500">Description</p>
//                         <p className="text-gray-700">
//                           {selectedVehicle.description}
//                         </p>
//                       </div>
//                     )}
//                     {selectedVehicle.features?.length > 0 && (
//                       <div>
//                         <p className="text-sm text-gray-500">Features</p>
//                         <div className="flex flex-wrap gap-2 mt-1">
//                           {selectedVehicle.features.map((feature, idx) => (
//                             <span
//                               key={idx}
//                               className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
//                             >
//                               {feature}
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-6">
//                 <h4 className="font-semibold text-gray-800 mb-3">
//                   Owner Information
//                 </h4>
//                 <div className="bg-gray-50 rounded-lg p-4">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <p className="text-sm text-gray-500">Full Name</p>
//                       <p className="font-medium">{selectedVehicle.fullName}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500">
//                         Citizenship Number
//                       </p>
//                       <p className="font-medium">
//                         {selectedVehicle.citizenshipNumber}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500">Phone Number</p>
//                       <p className="font-medium">
//                         {selectedVehicle.phoneNumber}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500">Address</p>
//                       <p className="font-medium">
//                         {selectedVehicle.address}, {selectedVehicle.city},{" "}
//                         {selectedVehicle.district}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end gap-3">
//                 {selectedVehicle.status === "pending" && (
//                   <>
//                     <button
//                       onClick={() => {
//                         setShowDetailsModal(false);
//                         setShowRejectModal(true);
//                       }}
//                       className="px-6 py-2 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition font-medium"
//                       disabled={actionLoading}
//                     >
//                       Reject Listing
//                     </button>
//                     <button
//                       onClick={() =>
//                         showConfirmation(
//                           handleApprove,
//                           selectedVehicle._id,
//                           "Approve Vehicle Listing",
//                           `Are you sure you want to approve "${selectedVehicle.carName}"? This vehicle will be listed for rent.`,
//                           "approve",
//                         )
//                       }
//                       className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium"
//                       disabled={actionLoading}
//                     >
//                       {actionLoading ? (
//                         <FaSpinner className="animate-spin" />
//                       ) : (
//                         "Approve Listing"
//                       )}
//                     </button>
//                   </>
//                 )}
//                 {selectedVehicle.status === "booked" && (
//                   <button
//                     onClick={() =>
//                       showConfirmation(
//                         handleResetToActive,
//                         selectedVehicle._id,
//                         "Reset Vehicle to Active",
//                         `Reset "${selectedVehicle.carName}" from Booked to Active?`,
//                         "reset",
//                       )
//                     }
//                     className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium"
//                     disabled={actionLoading}
//                   >
//                     {actionLoading ? (
//                       <FaSpinner className="animate-spin" />
//                     ) : (
//                       "Reset to Active"
//                     )}
//                   </button>
//                 )}
//                 {(selectedVehicle.status === "approved" ||
//                   selectedVehicle.status === "active" ||
//                   selectedVehicle.status === "inactive") && (
//                   <>
//                     {selectedVehicle.status !== "active" && (
//                       <button
//                         onClick={() =>
//                           showConfirmation(
//                             handleActivate,
//                             selectedVehicle._id,
//                             "Activate Vehicle Listing",
//                             `Are you sure you want to activate "${selectedVehicle.carName}"?`,
//                             "activate",
//                           )
//                         }
//                         className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium"
//                         disabled={actionLoading}
//                       >
//                         Activate Listing
//                       </button>
//                     )}
//                     {selectedVehicle.status !== "inactive" &&
//                       selectedVehicle.status !== "rejected" && (
//                         <button
//                           onClick={() =>
//                             showConfirmation(
//                               handleDeactivate,
//                               selectedVehicle._id,
//                               "Deactivate Vehicle Listing",
//                               `Are you sure you want to deactivate "${selectedVehicle.carName}"?`,
//                               "deactivate",
//                             )
//                           }
//                           className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition font-medium"
//                           disabled={actionLoading}
//                         >
//                           Deactivate Listing
//                         </button>
//                       )}
//                     <button
//                       onClick={() =>
//                         showConfirmation(
//                           handleDelete,
//                           selectedVehicle._id,
//                           "Delete Vehicle Permanently",
//                           `Are you sure you want to permanently delete "${selectedVehicle.carName}"? This cannot be undone.`,
//                           "delete",
//                         )
//                       }
//                       className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium"
//                       disabled={actionLoading}
//                     >
//                       Delete Permanently
//                     </button>
//                   </>
//                 )}
//               </div>
//               {selectedVehicle.rejectionReason && (
//                 <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
//                   <p className="text-red-600 font-medium">Rejection Reason:</p>
//                   <p className="text-red-700 text-sm">
//                     {selectedVehicle.rejectionReason}
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ══════════ DOCUMENTS MODAL (original layout + image fix) ══════════ */}
//       {showDocsModal && selectedVehicle && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
//           <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
//               <div className="flex justify-between items-center">
//                 <div className="flex items-center gap-3">
//                   <FaFileAlt className="text-purple-600 text-2xl" />
//                   <h3 className="text-xl font-bold text-gray-800">
//                     Document Verification - {selectedVehicle.carName}
//                   </h3>
//                 </div>
//                 <button
//                   onClick={() => setShowDocsModal(false)}
//                   className="text-gray-400 hover:text-gray-600"
//                 >
//                   <FaTimes size={24} />
//                 </button>
//               </div>
//               <p className="text-sm text-gray-500 mt-2">
//                 Verify all documents before approving the vehicle listing
//               </p>
//             </div>
//             <div className="p-6">
//               {/* Owner Identity Documents */}
//               <div className="mb-8">
//                 <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
//                   <FaUserCircle className="text-blue-500" /> Owner Identity
//                   Documents
//                 </h4>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   {[
//                     { key: "citizenshipFront", label: "Citizenship (Front)" },
//                     { key: "citizenshipBack", label: "Citizenship (Back)" },
//                     { key: "passportPhoto", label: "Passport Photo" },
//                   ].map(({ key, label }) => (
//                     <div key={key} className="border rounded-lg p-4">
//                       <div className="flex items-center justify-between mb-3">
//                         <div className="flex items-center gap-2">
//                           <FaCitizenship className="text-blue-500 text-xl" />
//                           <p className="font-medium">{label}</p>
//                         </div>
//                         <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
//                           Required
//                         </span>
//                       </div>
//                       {selectedVehicle[key] ? (
//                         isImage(selectedVehicle[key].url) ? (
//                           <img
//                             src={`http://localhost:5000${selectedVehicle[key].url}`}
//                             alt={label}
//                             className="w-full h-40 object-cover rounded-lg cursor-pointer hover:opacity-90 transition"
//                             onClick={() =>
//                               openImageViewer(
//                                 `http://localhost:5000${selectedVehicle[key].url}`,
//                               )
//                             }
//                           />
//                         ) : (
//                           <div className="w-full h-40 bg-gray-50 rounded-lg border flex flex-col items-center justify-center gap-2">
//                             <FaFilePdf className="text-red-500 text-4xl" />
//                             <a
//                               href={`http://localhost:5000${selectedVehicle[key].url}`}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs hover:bg-red-700"
//                             >
//                               View PDF
//                             </a>
//                           </div>
//                         )
//                       ) : (
//                         <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center">
//                           <p className="text-gray-400 text-sm">Not uploaded</p>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Vehicle Documents */}
//               <div className="mb-8">
//                 <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
//                   <FaShieldAlt className="text-purple-500" /> Vehicle Documents
//                 </h4>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   {selectedVehicle.documents?.map((doc, index) => (
//                     <div key={index} className="border rounded-lg p-4">
//                       <div className="flex items-center gap-2 mb-2">
//                         {doc.type === "bluebook" ? (
//                           <FaFileInvoice className="text-purple-500" />
//                         ) : doc.type === "insurance" ? (
//                           <FaShieldAlt className="text-green-500" />
//                         ) : (
//                           <FaLeaf className="text-teal-500" />
//                         )}
//                         <p className="font-medium capitalize">
//                           {doc.label || doc.type}
//                         </p>
//                       </div>
//                       {isImage(doc.url) ? (
//                         <img
//                           src={`http://localhost:5000${doc.url}`}
//                           alt={doc.type}
//                           className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-90 transition"
//                           onClick={() =>
//                             openImageViewer(`http://localhost:5000${doc.url}`)
//                           }
//                         />
//                       ) : (
//                         <div className="w-full h-32 bg-gray-50 rounded-lg border flex flex-col items-center justify-center gap-2">
//                           <FaFilePdf className="text-red-500 text-3xl" />
//                           <a
//                             href={`http://localhost:5000${doc.url}`}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs hover:bg-red-700"
//                           >
//                             View PDF
//                           </a>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
//                 <button
//                   onClick={() => setShowDocsModal(false)}
//                   className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
//                 >
//                   Close
//                 </button>
//                 {selectedVehicle.status === "pending" && (
//                   <>
//                     <button
//                       onClick={() => {
//                         setShowDocsModal(false);
//                         setShowRejectModal(true);
//                       }}
//                       className="px-6 py-2 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition font-medium"
//                     >
//                       Reject Listing
//                     </button>
//                     <button
//                       onClick={() =>
//                         showConfirmation(
//                           handleApprove,
//                           selectedVehicle._id,
//                           "Approve Vehicle Listing",
//                           `Are you sure you want to approve "${selectedVehicle.carName}"?`,
//                           "approve",
//                         )
//                       }
//                       className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium"
//                     >
//                       Approve Listing
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ══════════ REJECT MODAL (original — unchanged) ══════════ */}
//       {showRejectModal && selectedVehicle && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
//             <div className="p-6">
//               <div className="flex items-center gap-3 mb-4">
//                 <FaTimesCircle className="text-red-600 text-2xl" />
//                 <h3 className="text-xl font-bold text-gray-800">
//                   Reject Vehicle Listing
//                 </h3>
//               </div>
//               <p className="text-gray-600 mb-4">
//                 Are you sure you want to reject the listing for{" "}
//                 <strong>{selectedVehicle.carName}</strong>?
//               </p>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Reason for Rejection *
//                 </label>
//                 <textarea
//                   value={rejectionReason}
//                   onChange={(e) => setRejectionReason(e.target.value)}
//                   rows="4"
//                   className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none"
//                   placeholder="Please provide a reason for rejecting this listing..."
//                   required
//                 />
//               </div>
//               <div className="flex justify-end gap-3">
//                 <button
//                   onClick={() => {
//                     setShowRejectModal(false);
//                     setRejectionReason("");
//                   }}
//                   className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={() => handleReject(selectedVehicle._id)}
//                   className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium"
//                   disabled={actionLoading}
//                 >
//                   {actionLoading ? (
//                     <FaSpinner className="animate-spin inline" />
//                   ) : (
//                     "Reject Listing"
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ══════════ IMAGE VIEWER (original — unchanged) ══════════ */}
//       {showImageViewer && selectedImage && (
//         <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-[60]">
//           <div className="relative max-w-5xl max-h-[90vh]">
//             <button
//               onClick={() => setShowImageViewer(false)}
//               className="absolute -top-12 right-0 text-white hover:text-gray-300 transition"
//             >
//               <FaTimes size={32} />
//             </button>
//             <img
//               src={selectedImage}
//               alt="Document Preview"
//               className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
//             />
//             <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg text-sm">
//               Click outside or press ESC to close
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminVehicleVerification;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaCar,
  FaUser,
  FaPhone,
  FaIdCard,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaChair,
  FaCogs,
  FaSnowflake,
  FaImage,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaEye,
  FaFileAlt,
  FaSearch,
  FaFilter,
  FaInfoCircle,
  FaArrowLeft,
  FaTimes,
  FaExpand,
  FaShieldAlt,
  FaFileInvoice,
  FaLeaf,
  FaIdCard as FaCitizenship,
  FaUserCircle,
  FaEdit,
  FaTrash,
  FaBan,
  FaPlay,
  FaStop,
  FaFilePdf,
  FaFileImage,
  FaDownload,
  FaBook,
  FaHistory,
  FaSpinner,
  FaQuestionCircle,
} from "react-icons/fa";

const AdminVehicleVerification = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDocsModal, setShowDocsModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Confirmation Modal State
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmVehicleId, setConfirmVehicleId] = useState(null);
  const [confirmTitle, setConfirmTitle] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmType, setConfirmType] = useState("");

  // Result animation state
  const [showResultAnimation, setShowResultAnimation] = useState(false);
  const [resultType, setResultType] = useState("");
  const [resultLabel, setResultLabel] = useState("");

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    active: 0,
    inactive: 0,
    booked: 0,
  });

  useEffect(() => {
    fetchVehicles();
    const interval = setInterval(fetchVehicles, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      setError("");
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        setError("No authentication token found. Please login again.");
        setLoading(false);
        return;
      }
      const response = await axios.get(
        "http://localhost:5000/api/user-vehicles/admin/all",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.data && response.data.success) {
        let vehiclesData = [];
        if (response.data.data?.vehicles)
          vehiclesData = response.data.data.vehicles;
        else if (response.data.vehicles) vehiclesData = response.data.vehicles;
        else if (Array.isArray(response.data.data))
          vehiclesData = response.data.data;
        else if (Array.isArray(response.data)) vehiclesData = response.data;
        setVehicles(vehiclesData);
        setFilteredVehicles(vehiclesData);
        calculateStats(vehiclesData);
      } else {
        setError(response.data?.message || "Failed to fetch vehicles");
        setVehicles([]);
        setFilteredVehicles([]);
        calculateStats([]);
      }
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      if (error.response)
        setError(
          error.response.data?.message ||
            `Server error: ${error.response.status}`,
        );
      else if (error.request)
        setError(
          "Cannot connect to server. Please check if backend is running.",
        );
      else setError(error.message);
      setVehicles([]);
      setFilteredVehicles([]);
      calculateStats([]);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (vehiclesData) => {
    const data = Array.isArray(vehiclesData) ? vehiclesData : [];
    setStats({
      total: data.length,
      pending: data.filter((v) => v?.status === "pending").length,
      approved: data.filter((v) => v?.status === "approved").length,
      rejected: data.filter((v) => v?.status === "rejected").length,
      active: data.filter((v) => v?.status === "active").length,
      inactive: data.filter((v) => v?.status === "inactive").length,
      booked: data.filter((v) => v?.status === "booked").length,
    });
  };

  const showConfirmation = (action, vehicleId, title, message, type) => {
    setConfirmAction(() => action);
    setConfirmVehicleId(vehicleId);
    setConfirmTitle(title);
    setConfirmMessage(message);
    setConfirmType(type);
    setShowConfirmModal(true);
  };

  const executeAction = async () => {
    if (confirmAction) await confirmAction(confirmVehicleId);
    setShowConfirmModal(false);
    setConfirmAction(null);
    setConfirmVehicleId(null);
  };

  const triggerResult = (type, label) => {
    setResultType(type);
    setResultLabel(label);
    setShowResultAnimation(true);
    setTimeout(() => setShowResultAnimation(false), 3000);
  };

  // ── Action handlers ────────────────────────────────────────────────────────
  const handleApprove = async (vehicleId) => {
    setActionLoading(true);
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/user-vehicles/admin/${vehicleId}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      await fetchVehicles();
      setShowDetailsModal(false);
      setShowDocsModal(false);
      triggerResult("approved", "APPROVED!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to approve vehicle");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (vehicleId) => {
    if (!rejectionReason.trim()) {
      toast.error("Please provide a reason for rejection");
      return;
    }
    setActionLoading(true);
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/user-vehicles/admin/${vehicleId}/reject`,
        { reason: rejectionReason },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      await fetchVehicles();
      setShowRejectModal(false);
      setRejectionReason("");
      setShowDetailsModal(false);
      setShowDocsModal(false);
      triggerResult("rejected", "REJECTED");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reject vehicle");
    } finally {
      setActionLoading(false);
    }
  };

  const handleActivate = async (vehicleId) => {
    setActionLoading(true);
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/user-vehicles/admin/${vehicleId}/activate`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      await fetchVehicles();
      setShowDetailsModal(false);
      setShowDocsModal(false);
      triggerResult("activated", "ACTIVATED!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to activate vehicle",
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeactivate = async (vehicleId) => {
    setActionLoading(true);
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/user-vehicles/admin/${vehicleId}/deactivate`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      await fetchVehicles();
      setShowDetailsModal(false);
      setShowDocsModal(false);
      triggerResult("deactivated", "DEACTIVATED");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to deactivate vehicle",
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (vehicleId) => {
    setActionLoading(true);
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      await axios.delete(
        `http://localhost:5000/api/user-vehicles/admin/${vehicleId}/delete`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      await fetchVehicles();
      setShowDetailsModal(false);
      setShowDocsModal(false);
      triggerResult("deleted", "DELETED");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete vehicle");
    } finally {
      setActionLoading(false);
    }
  };

  const handleResetToActive = async (vehicleId) => {
    setActionLoading(true);
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/user-vehicles/admin/${vehicleId}/fix-status`,
        { status: "active", isListed: true },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      await fetchVehicles();
      setShowDetailsModal(false);
      setShowDocsModal(false);
      triggerResult("activated", "RESET TO ACTIVE!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to reset vehicle status",
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handleViewDetails = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowDetailsModal(true);
  };
  const handleViewDocuments = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowDocsModal(true);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setFilteredVehicles(
      status === "all" ? vehicles : vehicles.filter((v) => v.status === status),
    );
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    let filtered = vehicles;
    if (filterStatus !== "all")
      filtered = filtered.filter((v) => v.status === filterStatus);
    setFilteredVehicles(
      filtered.filter(
        (vehicle) =>
          vehicle?.carName?.toLowerCase().includes(term) ||
          vehicle?.carNumber?.toLowerCase().includes(term) ||
          vehicle?.fullName?.toLowerCase().includes(term) ||
          vehicle?.citizenshipNumber?.toLowerCase().includes(term),
      ),
    );
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        color: "bg-yellow-100 text-yellow-800",
        icon: FaClock,
        label: "Pending",
      },
      approved: {
        color: "bg-blue-100 text-blue-800",
        icon: FaCheckCircle,
        label: "Approved",
      },
      rejected: {
        color: "bg-red-100 text-red-800",
        icon: FaTimesCircle,
        label: "Rejected",
      },
      active: {
        color: "bg-green-100 text-green-800",
        icon: FaPlay,
        label: "Active",
      },
      inactive: {
        color: "bg-gray-100 text-gray-800",
        icon: FaStop,
        label: "Inactive",
      },
      booked: {
        color: "bg-orange-100 text-orange-800",
        icon: FaBook,
        label: "Booked",
      },
    };
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-1 ${config.color}`}
      >
        <Icon size={12} /> {config.label}
      </span>
    );
  };

  const openImageViewer = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowImageViewer(true);
  };

  const isImage = (urlOrFilename) => {
    if (!urlOrFilename) return false;
    return /\.(jpg|jpeg|png|webp|gif)$/i.test(urlOrFilename);
  };

  const getConfirmStyle = () => {
    const styles = {
      approve: {
        grad: "from-green-400 to-emerald-500",
        btn: "from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600",
        shadow: "shadow-green-200",
        icon: "✓",
        text: "Yes, Approve",
      },
      reject: {
        grad: "from-red-400 to-rose-500",
        btn: "from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600",
        shadow: "shadow-red-200",
        icon: "✕",
        text: "Yes, Reject",
      },
      activate: {
        grad: "from-green-400 to-emerald-500",
        btn: "from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600",
        shadow: "shadow-green-200",
        icon: "▶",
        text: "Yes, Activate",
      },
      deactivate: {
        grad: "from-yellow-400 to-amber-500",
        btn: "from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600",
        shadow: "shadow-yellow-200",
        icon: "⏸",
        text: "Yes, Deactivate",
      },
      delete: {
        grad: "from-red-500 to-rose-600",
        btn: "from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700",
        shadow: "shadow-red-300",
        icon: "🗑",
        text: "Yes, Delete",
      },
      reset: {
        grad: "from-blue-400 to-indigo-500",
        btn: "from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600",
        shadow: "shadow-blue-200",
        icon: "↺",
        text: "Yes, Reset",
      },
    };
    return styles[confirmType] || styles.approve;
  };

  const getResultStyle = () => {
    const styles = {
      approved: {
        grad: "from-green-400 to-emerald-500",
        shadow: "shadow-green-500/50",
        sub: "text-green-200",
      },
      rejected: {
        grad: "from-red-400 to-rose-500",
        shadow: "shadow-red-500/50",
        sub: "text-red-200",
      },
      activated: {
        grad: "from-green-400 to-emerald-500",
        shadow: "shadow-green-500/50",
        sub: "text-green-200",
      },
      deactivated: {
        grad: "from-yellow-400 to-amber-500",
        shadow: "shadow-yellow-500/50",
        sub: "text-yellow-100",
      },
      deleted: {
        grad: "from-red-500 to-rose-600",
        shadow: "shadow-red-500/50",
        sub: "text-red-200",
      },
    };
    return styles[resultType] || styles.approved;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading vehicle listings...</p>
        </div>
      </div>
    );
  }

  if (error && vehicles.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center max-w-md">
          <div className="text-red-600 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold mb-2">Error Loading Vehicles</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchVehicles}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const confirmStyle = getConfirmStyle();
  const resultStyle = getResultStyle();

  return (
    <div className="p-8">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* ══════════ GRAND CONFIRMATION MODAL ══════════ */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => setShowConfirmModal(false)}
          />
          <div
            className="relative w-full max-w-md mx-4"
            style={{
              animation: "modalPop 0.35s cubic-bezier(0.34,1.56,0.64,1) both",
            }}
          >
            <div
              className={`absolute -inset-1 rounded-3xl blur-xl opacity-60 bg-gradient-to-r ${confirmStyle.grad}`}
            />
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div
                className={`h-2 w-full bg-gradient-to-r ${confirmStyle.grad}`}
              />
              <div className="p-8 text-center">
                <div
                  className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center shadow-lg bg-gradient-to-br ${confirmStyle.grad}`}
                  style={{
                    animation:
                      "iconBounce 0.5s 0.2s cubic-bezier(0.34,1.56,0.64,1) both",
                  }}
                >
                  <span className="text-white text-4xl font-bold">
                    {confirmStyle.icon}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">
                  {confirmTitle}
                </h3>
                <p className="text-gray-500 mb-8 leading-relaxed">
                  {confirmMessage}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="flex-1 px-5 py-3.5 border-2 border-gray-200 text-gray-600 font-semibold rounded-2xl hover:bg-gray-50 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={executeAction}
                    disabled={actionLoading}
                    className={`flex-1 px-5 py-3.5 text-white font-bold rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg ${confirmStyle.shadow} hover:scale-[1.02] disabled:opacity-50 bg-gradient-to-r ${confirmStyle.btn}`}
                  >
                    {actionLoading ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      confirmStyle.text
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════ RESULT ANIMATION OVERLAY ══════════ */}
      {showResultAnimation && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <div
            className="relative flex flex-col items-center justify-center"
            style={{ animation: "resultFadeIn 0.4s ease-out both" }}
          >
            <div
              className={`w-40 h-40 rounded-full bg-gradient-to-br ${resultStyle.grad} flex items-center justify-center shadow-2xl ${resultStyle.shadow} mb-6`}
              style={{
                animation:
                  "resultBounce 0.6s cubic-bezier(0.34,1.56,0.64,1) both",
              }}
            >
              <span className="text-white text-6xl font-bold">
                {resultType === "approved" || resultType === "activated"
                  ? "✓"
                  : resultType === "rejected" || resultType === "deleted"
                    ? "✕"
                    : "⏸"}
              </span>
            </div>
            <div
              className="text-center text-white"
              style={{
                animation: "resultFadeIn 0.4s 0.5s ease-out both",
                opacity: 0,
              }}
            >
              <p className="text-4xl font-black tracking-wide drop-shadow-lg">
                {resultLabel}
              </p>
              <p className={`mt-2 text-lg font-medium ${resultStyle.sub}`}>
                Vehicle has been {resultType} successfully
              </p>
            </div>
            {(resultType === "approved" || resultType === "activated") &&
              [...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    background: [
                      "#10b981",
                      "#34d399",
                      "#6ee7b7",
                      "#fbbf24",
                      "#f59e0b",
                      "#3b82f6",
                      "#60a5fa",
                      "#a78bfa",
                      "#f472b6",
                    ][i % 9],
                    animation: `confetti${i} 1s 0.3s ease-out both`,
                    top: "50%",
                    left: "50%",
                  }}
                />
              ))}
          </div>
          <style>{`
            @keyframes modalPop{from{opacity:0;transform:scale(0.8) translateY(20px);}to{opacity:1;transform:scale(1) translateY(0);}}
            @keyframes iconBounce{from{opacity:0;transform:scale(0);}to{opacity:1;transform:scale(1);}}
            @keyframes resultFadeIn{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
            @keyframes resultBounce{from{opacity:0;transform:scale(0.3);}to{opacity:1;transform:scale(1);}}
            @keyframes confetti0{0%{opacity:1;transform:translate(-50%,-50%);}100%{opacity:0;transform:translate(calc(-50% + 120px),calc(-50% + 0px)) scale(0);}}
            @keyframes confetti1{0%{opacity:1;transform:translate(-50%,-50%);}100%{opacity:0;transform:translate(calc(-50% + 104px),calc(-50% + 60px)) scale(0);}}
            @keyframes confetti2{0%{opacity:1;transform:translate(-50%,-50%);}100%{opacity:0;transform:translate(calc(-50% + 60px),calc(-50% + 104px)) scale(0);}}
            @keyframes confetti3{0%{opacity:1;transform:translate(-50%,-50%);}100%{opacity:0;transform:translate(calc(-50% + 0px),calc(-50% + 130px)) scale(0);}}
            @keyframes confetti4{0%{opacity:1;transform:translate(-50%,-50%);}100%{opacity:0;transform:translate(calc(-50% + -60px),calc(-50% + 104px)) scale(0);}}
            @keyframes confetti5{0%{opacity:1;transform:translate(-50%,-50%);}100%{opacity:0;transform:translate(calc(-50% + -104px),calc(-50% + 60px)) scale(0);}}
            @keyframes confetti6{0%{opacity:1;transform:translate(-50%,-50%);}100%{opacity:0;transform:translate(calc(-50% + -140px),calc(-50% + 0px)) scale(0);}}
            @keyframes confetti7{0%{opacity:1;transform:translate(-50%,-50%);}100%{opacity:0;transform:translate(calc(-50% + -104px),calc(-50% + -60px)) scale(0);}}
            @keyframes confetti8{0%{opacity:1;transform:translate(-50%,-50%);}100%{opacity:0;transform:translate(calc(-50% + -60px),calc(-50% + -104px)) scale(0);}}
            @keyframes confetti9{0%{opacity:1;transform:translate(-50%,-50%);}100%{opacity:0;transform:translate(calc(-50% + 0px),calc(-50% + -130px)) scale(0);}}
            @keyframes confetti10{0%{opacity:1;transform:translate(-50%,-50%);}100%{opacity:0;transform:translate(calc(-50% + 60px),calc(-50% + -104px)) scale(0);}}
            @keyframes confetti11{0%{opacity:1;transform:translate(-50%,-50%);}100%{opacity:0;transform:translate(calc(-50% + 104px),calc(-50% + -60px)) scale(0);}}
          `}</style>
        </div>
      )}

      {/* ══════════ PAGE HEADER ══════════ */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Vehicle Verification Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Review and verify user-submitted vehicle listings
        </p>
      </div>

      {/* ══════════ STATS — same card style as AdminBookingApproval ══════════ */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
        {[
          { label: "Total", value: stats.total, cls: "bg-white" },
          {
            label: "Pending",
            value: stats.pending,
            cls: "bg-yellow-50 border-l-4 border-yellow-500",
            t: "text-yellow-600",
            v: "text-yellow-700",
          },
          {
            label: "Approved",
            value: stats.approved,
            cls: "bg-blue-50 border-l-4 border-blue-500",
            t: "text-blue-600",
            v: "text-blue-700",
          },
          {
            label: "Active",
            value: stats.active,
            cls: "bg-green-50 border-l-4 border-green-500",
            t: "text-green-600",
            v: "text-green-700",
          },
          {
            label: "Inactive",
            value: stats.inactive,
            cls: "bg-gray-50 border-l-4 border-gray-500",
            t: "text-gray-600",
            v: "text-gray-700",
          },
          {
            label: "Rejected",
            value: stats.rejected,
            cls: "bg-red-50 border-l-4 border-red-500",
            t: "text-red-600",
            v: "text-red-700",
          },
          {
            label: "Booked",
            value: stats.booked,
            cls: "bg-orange-50 border-l-4 border-orange-500",
            t: "text-orange-600",
            v: "text-orange-700",
          },
        ].map((s) => (
          <div key={s.label} className={`rounded-lg shadow p-4 ${s.cls}`}>
            <p className={`text-sm ${s.t || "text-gray-500"}`}>{s.label}</p>
            <p className={`text-2xl font-bold ${s.v || "text-gray-800"}`}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* ══════════ BOOKED BANNER ══════════ */}
      {stats.booked > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaHistory className="text-orange-600 text-xl" />
            <div>
              <p className="text-orange-800 font-medium">
                Booked Vehicles Notice
              </p>
              <p className="text-orange-700 text-sm">
                {stats.booked} vehicle(s) are currently booked. They will
                automatically become "Active" when the booking period ends.
              </p>
            </div>
          </div>
          <button
            onClick={() => handleFilterChange("booked")}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition text-sm"
          >
            View Booked Vehicles
          </button>
        </div>
      )}

      {/* ══════════ FILTERS & SEARCH — same style as AdminBookingApproval ══════════ */}
      <div className="bg-white rounded-lg shadow mb-6 p-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              "all",
              "pending",
              "approved",
              "active",
              "inactive",
              "rejected",
              "booked",
            ].map((status) => (
              <button
                key={status}
                onClick={() => handleFilterChange(status)}
                className={`px-4 py-2 rounded-lg font-medium transition capitalize whitespace-nowrap ${
                  filterStatus === status
                    ? status === "pending"
                      ? "bg-yellow-500 text-white"
                      : status === "approved"
                        ? "bg-blue-600 text-white"
                        : status === "active"
                          ? "bg-green-600 text-white"
                          : status === "inactive"
                            ? "bg-gray-600 text-white"
                            : status === "rejected"
                              ? "bg-red-600 text-white"
                              : status === "booked"
                                ? "bg-orange-600 text-white"
                                : "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {status === "all" ? "All" : status}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-64">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by car name, number, owner..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* ══════════ TABLE — same style as AdminBookingApproval ══════════ */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {vehicles.length === 0 ? (
          <div className="text-center py-12">
            <FaCar className="text-5xl text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No vehicle listings found</p>
            <p className="text-sm text-gray-400 mt-1">
              Vehicles will appear here once users list them
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Vehicle",
                    "Owner",
                    "Car Number",
                    "Rate/Day",
                    "Status",
                    "Submitted",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredVehicles.map((vehicle) => (
                  <tr key={vehicle._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {vehicle.vehiclePhotos?.[0] ? (
                          <img
                            src={`http://localhost:5000${vehicle.vehiclePhotos[0].url}`}
                            alt={vehicle.carName}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                            <FaCar className="text-gray-400" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-900">
                            {vehicle.carName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {vehicle.carType} • {vehicle.seats} seats
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900">
                        {vehicle.fullName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {vehicle.phoneNumber}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {vehicle.carNumber}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      रु {vehicle.ratePerDay}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(vehicle.status)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(vehicle.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewDetails(vehicle)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleViewDocuments(vehicle)}
                          className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition"
                          title="View Documents"
                        >
                          <FaFileAlt />
                        </button>
                        {vehicle.status === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                showConfirmation(
                                  handleApprove,
                                  vehicle._id,
                                  "Approve Vehicle Listing",
                                  `Are you sure you want to approve "${vehicle.carName}"? This vehicle will be listed for rent.`,
                                  "approve",
                                )
                              }
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                              title="Approve"
                              disabled={actionLoading}
                            >
                              <FaCheckCircle />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedVehicle(vehicle);
                                setShowRejectModal(true);
                              }}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                              title="Reject"
                              disabled={actionLoading}
                            >
                              <FaTimesCircle />
                            </button>
                          </>
                        )}
                        {(vehicle.status === "approved" ||
                          vehicle.status === "active" ||
                          vehicle.status === "inactive") && (
                          <>
                            {vehicle.status !== "active" && (
                              <button
                                onClick={() =>
                                  showConfirmation(
                                    handleActivate,
                                    vehicle._id,
                                    "Activate Vehicle Listing",
                                    `Are you sure you want to activate "${vehicle.carName}"? This vehicle will be available for booking.`,
                                    "activate",
                                  )
                                }
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                                title="Activate"
                                disabled={actionLoading}
                              >
                                <FaPlay />
                              </button>
                            )}
                            {vehicle.status !== "inactive" &&
                              vehicle.status !== "rejected" && (
                                <button
                                  onClick={() =>
                                    showConfirmation(
                                      handleDeactivate,
                                      vehicle._id,
                                      "Deactivate Vehicle Listing",
                                      `Are you sure you want to deactivate "${vehicle.carName}"? This vehicle will not be available for booking.`,
                                      "deactivate",
                                    )
                                  }
                                  className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition"
                                  title="Deactivate"
                                  disabled={actionLoading}
                                >
                                  <FaStop />
                                </button>
                              )}
                            <button
                              onClick={() =>
                                showConfirmation(
                                  handleDelete,
                                  vehicle._id,
                                  "Delete Vehicle Permanently",
                                  `Are you sure you want to permanently delete "${vehicle.carName}"? This action cannot be undone.`,
                                  "delete",
                                )
                              }
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                              title="Delete"
                              disabled={actionLoading}
                            >
                              <FaTrash />
                            </button>
                          </>
                        )}
                        {vehicle.status === "booked" && (
                          <>
                            <button
                              onClick={() =>
                                showConfirmation(
                                  handleResetToActive,
                                  vehicle._id,
                                  "Reset Vehicle to Active",
                                  `Reset "${vehicle.carName}" from Booked to Active? This will make it available for new bookings.`,
                                  "reset",
                                )
                              }
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                              title="Reset to Active"
                              disabled={actionLoading}
                            >
                              <FaHistory />
                            </button>
                            <button
                              onClick={() =>
                                showConfirmation(
                                  handleDelete,
                                  vehicle._id,
                                  "Delete Vehicle Permanently",
                                  `Are you sure you want to permanently delete "${vehicle.carName}"? This action cannot be undone.`,
                                  "delete",
                                )
                              }
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                              title="Delete"
                              disabled={actionLoading}
                            >
                              <FaTrash />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {filteredVehicles.length === 0 && vehicles.length > 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No vehicles match your search or filter
            </p>
          </div>
        )}
      </div>

      {/* ══════════ VEHICLE DETAILS MODAL ══════════ */}
      {showDetailsModal && selectedVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <FaInfoCircle className="text-blue-600 text-2xl" />
                  <h3 className="text-xl font-bold text-gray-800">
                    Vehicle Listing Details
                  </h3>
                </div>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes size={24} />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Vehicle Photos
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedVehicle.vehiclePhotos?.map((photo, index) => (
                      <div key={index} className="relative">
                        <img
                          src={`http://localhost:5000${photo.url}`}
                          alt={photo.label}
                          className="w-full h-40 object-cover rounded-lg cursor-pointer hover:opacity-90 transition"
                          onClick={() =>
                            openImageViewer(`http://localhost:5000${photo.url}`)
                          }
                        />
                        <p className="text-xs text-gray-500 mt-1 text-center">
                          {photo.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Vehicle Information
                  </h4>
                  <div className="space-y-3 bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        ["Car Name", selectedVehicle.carName],
                        ["Car Number", selectedVehicle.carNumber],
                        ["Car Type", selectedVehicle.carType],
                        ["Rate Per Day", `रु ${selectedVehicle.ratePerDay}`],
                        ["Seats", selectedVehicle.seats],
                        ["Gear Type", selectedVehicle.gearType],
                        ["Air Condition", selectedVehicle.airCondition],
                        ["Booking Type", selectedVehicle.bookingType],
                      ].map(([label, value]) => (
                        <div key={label}>
                          <p className="text-sm text-gray-500">{label}</p>
                          <p className="font-medium">{value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Status</p>
                      {getStatusBadge(selectedVehicle.status)}
                    </div>
                    {selectedVehicle.description && (
                      <div>
                        <p className="text-sm text-gray-500">Description</p>
                        <p className="text-gray-700">
                          {selectedVehicle.description}
                        </p>
                      </div>
                    )}
                    {selectedVehicle.features?.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-500">Features</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedVehicle.features.map((feature, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="font-semibold text-gray-800 mb-3">
                  Owner Information
                </h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium">{selectedVehicle.fullName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        Citizenship Number
                      </p>
                      <p className="font-medium">
                        {selectedVehicle.citizenshipNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone Number</p>
                      <p className="font-medium">
                        {selectedVehicle.phoneNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium">
                        {selectedVehicle.address}, {selectedVehicle.city},{" "}
                        {selectedVehicle.district}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between items-center">
                <button
                  onClick={() => handleViewDocuments(selectedVehicle)}
                  className="px-5 py-2 border-2 border-purple-500 text-purple-600 rounded-lg hover:bg-purple-50 transition font-medium flex items-center gap-2"
                >
                  <FaFileAlt /> View Documents
                </button>
                <div className="flex gap-3">
                  {selectedVehicle.status === "pending" && (
                    <>
                      <button
                        onClick={() => {
                          setShowDetailsModal(false);
                          setShowRejectModal(true);
                        }}
                        className="px-6 py-2 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition font-medium"
                        disabled={actionLoading}
                      >
                        Reject Listing
                      </button>
                      <button
                        onClick={() =>
                          showConfirmation(
                            handleApprove,
                            selectedVehicle._id,
                            "Approve Vehicle Listing",
                            `Are you sure you want to approve "${selectedVehicle.carName}"? This vehicle will be listed for rent.`,
                            "approve",
                          )
                        }
                        className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium"
                        disabled={actionLoading}
                      >
                        {actionLoading ? (
                          <FaSpinner className="animate-spin" />
                        ) : (
                          "Approve Listing"
                        )}
                      </button>
                    </>
                  )}
                  {selectedVehicle.status === "booked" && (
                    <button
                      onClick={() =>
                        showConfirmation(
                          handleResetToActive,
                          selectedVehicle._id,
                          "Reset Vehicle to Active",
                          `Reset "${selectedVehicle.carName}" from Booked to Active?`,
                          "reset",
                        )
                      }
                      className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium"
                      disabled={actionLoading}
                    >
                      {actionLoading ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        "Reset to Active"
                      )}
                    </button>
                  )}
                  {(selectedVehicle.status === "approved" ||
                    selectedVehicle.status === "active" ||
                    selectedVehicle.status === "inactive") && (
                    <>
                      {selectedVehicle.status !== "active" && (
                        <button
                          onClick={() =>
                            showConfirmation(
                              handleActivate,
                              selectedVehicle._id,
                              "Activate Vehicle Listing",
                              `Are you sure you want to activate "${selectedVehicle.carName}"?`,
                              "activate",
                            )
                          }
                          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium"
                          disabled={actionLoading}
                        >
                          Activate Listing
                        </button>
                      )}
                      {selectedVehicle.status !== "inactive" &&
                        selectedVehicle.status !== "rejected" && (
                          <button
                            onClick={() =>
                              showConfirmation(
                                handleDeactivate,
                                selectedVehicle._id,
                                "Deactivate Vehicle Listing",
                                `Are you sure you want to deactivate "${selectedVehicle.carName}"?`,
                                "deactivate",
                              )
                            }
                            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition font-medium"
                            disabled={actionLoading}
                          >
                            Deactivate Listing
                          </button>
                        )}
                      <button
                        onClick={() =>
                          showConfirmation(
                            handleDelete,
                            selectedVehicle._id,
                            "Delete Vehicle Permanently",
                            `Are you sure you want to permanently delete "${selectedVehicle.carName}"? This cannot be undone.`,
                            "delete",
                          )
                        }
                        className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium"
                        disabled={actionLoading}
                      >
                        Delete Permanently
                      </button>
                    </>
                  )}
                </div>
              </div>
              {selectedVehicle.rejectionReason && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 font-medium">Rejection Reason:</p>
                  <p className="text-red-700 text-sm">
                    {selectedVehicle.rejectionReason}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ══════════ DOCUMENTS MODAL ══════════ */}
      {showDocsModal && selectedVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <FaFileAlt className="text-purple-600 text-2xl" />
                  <h3 className="text-xl font-bold text-gray-800">
                    Document Verification - {selectedVehicle.carName}
                  </h3>
                </div>
                <button
                  onClick={() => setShowDocsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes size={24} />
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Verify all documents before approving the vehicle listing
              </p>
            </div>
            <div className="p-6">
              {/* Owner Identity Documents */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FaUserCircle className="text-blue-500" /> Owner Identity
                  Documents
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { key: "citizenshipFront", label: "Citizenship (Front)" },
                    { key: "citizenshipBack", label: "Citizenship (Back)" },
                    { key: "passportPhoto", label: "Passport Photo" },
                  ].map(({ key, label }) => (
                    <div key={key} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <FaCitizenship className="text-blue-500 text-xl" />
                          <p className="font-medium">{label}</p>
                        </div>
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                          Required
                        </span>
                      </div>
                      {selectedVehicle[key] ? (
                        isImage(selectedVehicle[key].url) ? (
                          <img
                            src={`http://localhost:5000${selectedVehicle[key].url}`}
                            alt={label}
                            className="w-full h-40 object-cover rounded-lg cursor-pointer hover:opacity-90 transition"
                            onClick={() =>
                              openImageViewer(
                                `http://localhost:5000${selectedVehicle[key].url}`,
                              )
                            }
                          />
                        ) : (
                          <div className="w-full h-40 bg-gray-50 rounded-lg border flex flex-col items-center justify-center gap-2">
                            <FaFilePdf className="text-red-500 text-4xl" />
                            <a
                              href={`http://localhost:5000${selectedVehicle[key].url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs hover:bg-red-700"
                            >
                              View PDF
                            </a>
                          </div>
                        )
                      ) : (
                        <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                          <p className="text-gray-400 text-sm">Not uploaded</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Vehicle Documents */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FaShieldAlt className="text-purple-500" /> Vehicle Documents
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedVehicle.documents?.map((doc, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        {doc.type === "bluebook" ? (
                          <FaFileInvoice className="text-purple-500" />
                        ) : doc.type === "insurance" ? (
                          <FaShieldAlt className="text-green-500" />
                        ) : (
                          <FaLeaf className="text-teal-500" />
                        )}
                        <p className="font-medium capitalize">
                          {doc.label || doc.type}
                        </p>
                      </div>
                      {isImage(doc.url) ? (
                        <img
                          src={`http://localhost:5000${doc.url}`}
                          alt={doc.type}
                          className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-90 transition"
                          onClick={() =>
                            openImageViewer(`http://localhost:5000${doc.url}`)
                          }
                        />
                      ) : (
                        <div className="w-full h-32 bg-gray-50 rounded-lg border flex flex-col items-center justify-center gap-2">
                          <FaFilePdf className="text-red-500 text-3xl" />
                          <a
                            href={`http://localhost:5000${doc.url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs hover:bg-red-700"
                          >
                            View PDF
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Verification summary — same style as AdminBookingApproval */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200 mb-6">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FaCheckCircle className="text-green-600" /> Verification
                  Summary
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    {
                      label: "Citizenship",
                      count: [
                        selectedVehicle.citizenshipFront,
                        selectedVehicle.citizenshipBack,
                      ].filter(Boolean).length,
                      total: 2,
                      color: "text-blue-600",
                    },
                    {
                      label: "Passport",
                      count: selectedVehicle.passportPhoto ? 1 : 0,
                      total: 1,
                      color: "text-orange-600",
                    },
                    {
                      label: "Vehicle Docs",
                      count: selectedVehicle.documents?.length || 0,
                      total: 3,
                      color: "text-green-600",
                    },
                    {
                      label: "Vehicle Photos",
                      count: selectedVehicle.vehiclePhotos?.length || 0,
                      total: 5,
                      color: "text-purple-600",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="text-center p-3 bg-white rounded-lg"
                    >
                      <p className="text-sm text-gray-500">{item.label}</p>
                      <p className={`font-semibold ${item.color}`}>
                        {item.count}/{item.total} Uploaded
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowDocsModal(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                >
                  Close
                </button>
                {selectedVehicle.status === "pending" && (
                  <>
                    <button
                      onClick={() => {
                        setShowDocsModal(false);
                        setShowRejectModal(true);
                      }}
                      className="px-6 py-2 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition font-medium"
                    >
                      Reject Listing
                    </button>
                    <button
                      onClick={() =>
                        showConfirmation(
                          handleApprove,
                          selectedVehicle._id,
                          "Approve Vehicle Listing",
                          `Are you sure you want to approve "${selectedVehicle.carName}"?`,
                          "approve",
                        )
                      }
                      className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium"
                    >
                      Approve Listing
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════ REJECT MODAL ══════════ */}
      {showRejectModal && selectedVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <FaTimesCircle className="text-red-600 text-2xl" />
                <h3 className="text-xl font-bold text-gray-800">
                  Reject Vehicle Listing
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Are you sure you want to reject the listing for{" "}
                <strong>{selectedVehicle.carName}</strong>?
              </p>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Rejection *
                </label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none"
                  placeholder="Please provide a reason for rejecting this listing..."
                  required
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowRejectModal(false);
                    setRejectionReason("");
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleReject(selectedVehicle._id)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium"
                  disabled={actionLoading}
                >
                  {actionLoading ? (
                    <FaSpinner className="animate-spin inline" />
                  ) : (
                    "Reject Listing"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════ IMAGE VIEWER ══════════ */}
      {showImageViewer && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-[60]">
          <div className="relative max-w-5xl max-h-[90vh]">
            <button
              onClick={() => setShowImageViewer(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition"
            >
              <FaTimes size={32} />
            </button>
            <img
              src={selectedImage}
              alt="Document Preview"
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg text-sm">
              Click outside or press ESC to close
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVehicleVerification;
