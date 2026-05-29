



// import React, { useState, useEffect, useRef } from "react";
// import {
//   FaCar,
//   FaStar,
//   FaHeart,
//   FaRegHeart,
//   FaCalendarAlt,
//   FaClock,
//   FaMapMarkerAlt,
//   FaUser,
//   FaPhone,
//   FaCreditCard,
//   FaShieldAlt,
//   FaArrowLeft,
//   FaSpinner,
//   FaTrash,
//   FaEdit,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaInfoCircle,
//   FaUserCircle,
//   FaChartBar,
//   FaComments,
//   FaPaperPlane,
//   FaImage,
//   FaArrowRight,
//   FaCheck,
//   FaRegCommentDots,
//   FaTimes,
//   FaLock,
//   FaCamera,
// } from "react-icons/fa";
// import { useNavigate, useLocation, useParams } from "react-router-dom";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // Custom Country Code Selector Component
// const CountryCodeSelector = ({ value, onChange, className = "" }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   const countries = [
//     { code: "+977", flag: "🇳🇵", name: "Nepal", short: "NP" },
//     { code: "+1", flag: "🇺🇸", name: "USA", short: "US" },
//     { code: "+44", flag: "🇬🇧", name: "UK", short: "GB" },
//     { code: "+91", flag: "🇮🇳", name: "India", short: "IN" },
//     { code: "+86", flag: "🇨🇳", name: "China", short: "CN" },
//     { code: "+81", flag: "🇯🇵", name: "Japan", short: "JP" },
//     { code: "+82", flag: "🇰🇷", name: "S.Korea", short: "KR" },
//     { code: "+61", flag: "🇦🇺", name: "Australia", short: "AU" },
//     { code: "+49", flag: "🇩🇪", name: "Germany", short: "DE" },
//     { code: "+33", flag: "🇫🇷", name: "France", short: "FR" },
//     { code: "+39", flag: "🇮🇹", name: "Italy", short: "IT" },
//     { code: "+34", flag: "🇪🇸", name: "Spain", short: "ES" },
//     { code: "+7", flag: "🇷🇺", name: "Russia", short: "RU" },
//     { code: "+55", flag: "🇧🇷", name: "Brazil", short: "BR" },
//     { code: "+27", flag: "🇿🇦", name: "S.Africa", short: "ZA" },
//     { code: "+971", flag: "🇦🇪", name: "UAE", short: "AE" },
//     { code: "+65", flag: "🇸🇬", name: "Singapore", short: "SG" },
//     { code: "+60", flag: "🇲🇾", name: "Malaysia", short: "MY" },
//     { code: "+66", flag: "🇹🇭", name: "Thailand", short: "TH" },
//     { code: "+84", flag: "🇻🇳", name: "Vietnam", short: "VN" },
//   ];

//   const selectedCountry =
//     countries.find((c) => c.code === value) || countries[0];

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleSelect = (code) => {
//     onChange(code);
//     setIsOpen(false);
//   };

//   return (
//     <div ref={dropdownRef} className={`relative ${className}`}>
//       <button
//         type="button"
//         onClick={() => setIsOpen(!isOpen)}
//         className="w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm flex items-center justify-between hover:bg-gray-100 transition"
//       >
//         <span className="flex items-center gap-2">
//           <img
//             src={`https://flagcdn.com/w20/${selectedCountry.short.toLowerCase()}.png`}
//             alt={selectedCountry.name}
//             className="w-5 h-4 object-cover rounded-sm"
//             onError={(e) => {
//               e.target.style.display = "none";
//               e.target.nextSibling.style.display = "inline";
//             }}
//           />
//           <span className="hidden text-lg">{selectedCountry.flag}</span>
//           <span className="font-medium">{selectedCountry.code}</span>
//         </span>
//         <svg
//           className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M19 9l-7 7-7-7"
//           />
//         </svg>
//       </button>

//       {isOpen && (
//         <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
//           {countries.map((country) => (
//             <button
//               key={country.code}
//               type="button"
//               onClick={() => handleSelect(country.code)}
//               className={`w-full px-3 py-2.5 text-left hover:bg-blue-50 transition flex items-center gap-2 ${
//                 value === country.code ? "bg-blue-50 font-medium" : ""
//               }`}
//             >
//               <img
//                 src={`https://flagcdn.com/w20/${country.short.toLowerCase()}.png`}
//                 alt={country.name}
//                 className="w-5 h-4 object-cover rounded-sm"
//                 onError={(e) => {
//                   e.target.style.display = "none";
//                   e.target.nextSibling.style.display = "inline";
//                 }}
//               />
//               <span className="hidden text-lg">{country.flag}</span>
//               <span className="text-sm flex-1">{country.code}</span>
//               <span className="text-xs text-gray-500">{country.name}</span>
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const API_URL = "http://localhost:5000/api";

// const axiosInstance = axios.create({
//   baseURL: API_URL,
//   timeout: 10000,
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token =
//       localStorage.getItem("token") || sessionStorage.getItem("token");
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   },
//   (error) => Promise.reject(error),
// );

// // ── Circular Progress Rating Component ────────────────────────────────────────
// const CircularRating = ({ rating, size = 80, strokeWidth = 6 }) => {
//   const radius = (size - strokeWidth) / 2;
//   const circumference = radius * 2 * Math.PI;
//   const progress = (rating / 5) * circumference;

//   return (
//     <div className="relative inline-flex items-center justify-center">
//       <svg width={size} height={size} className="transform -rotate-90">
//         {/* Background circle */}
//         <circle
//           cx={size / 2}
//           cy={size / 2}
//           r={radius}
//           stroke="#E5E7EB"
//           strokeWidth={strokeWidth}
//           fill="none"
//         />
//         {/* Progress circle */}
//         <circle
//           cx={size / 2}
//           cy={size / 2}
//           r={radius}
//           stroke="url(#gradient)"
//           strokeWidth={strokeWidth}
//           fill="none"
//           strokeDasharray={circumference}
//           strokeDashoffset={circumference - progress}
//           strokeLinecap="round"
//           className="transition-all duration-500"
//         />
//         <defs>
//           <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
//             <stop offset="0%" stopColor="#FBBF24" />
//             <stop offset="100%" stopColor="#F59E0B" />
//           </linearGradient>
//         </defs>
//       </svg>
//       <div className="absolute inset-0 flex flex-col items-center justify-center">
//         <span className="text-2xl font-bold text-gray-900">
//           {rating.toFixed(1)}
//         </span>
//         <FaStar className="text-yellow-400 text-xs mt-0.5" />
//       </div>
//     </div>
//   );
// };

// // ── Status helpers ────────────────────────────────────────────────────────────
// const getHoldTimeRemaining = (holdExpiresAt) => {
//   if (!holdExpiresAt) return null;
//   const diff = new Date(holdExpiresAt) - new Date();
//   if (diff <= 0) return "Available soon";
//   const hours = Math.floor(diff / (1000 * 60 * 60));
//   const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//   return `${hours}h ${minutes}m`;
// };

// const getVehicleDisplayStatus = (vehicle) => {
//   if (!vehicle) return null;
//   const status = vehicle.status;
//   if (status === "Maintenance") return { type: "maintenance", label: "In Maintenance", color: "gray" };
//   if (status === "On Hold") return { type: "processing", label: "Processing", color: "amber" };
//   if (status === "Available") return { type: "available", label: "Available", color: "green" };
//   return { type: "unknown", label: status || "Unknown", color: "gray" };
// };

// const chatService = {
//   getVehicleChat: async (vehicleId, vehicleType) => {
//     const response = await axiosInstance.post("/chats/vehicle", {
//       vehicleId,
//       vehicleType,
//     });
//     return response.data;
//   },
//   getChat: async (chatId) => {
//     const response = await axiosInstance.get(`/chats/${chatId}`);
//     return response.data;
//   },
//   markAsRead: async (chatId) => {
//     const response = await axiosInstance.put(`/chats/${chatId}/read`);
//     return response.data;
//   },
//   sendMessage: async (chatId, message) => {
//     const response = await axiosInstance.post(`/chats/${chatId}/message`, {
//       message,
//     });
//     return response.data;
//   },
// };

// // ── Country code helper ────────────────────────────────────────────────────
// const getCountryFlag = (countryCode) => {
//   const flags = {
//     "+977": "🇳🇵",
//     "+1": "🇺🇸",
//     "+44": "🇬🇧",
//     "+91": "🇮🇳",
//     "+86": "🇨🇳",
//     "+81": "🇯🇵",
//     "+82": "🇰🇷",
//     "+61": "🇦🇺",
//     "+49": "🇩🇪",
//     "+33": "🇫🇷",
//     "+39": "🇮🇹",
//     "+34": "🇪🇸",
//     "+7": "🇷🇺",
//     "+55": "🇧🇷",
//     "+27": "🇿🇦",
//     "+971": "🇦🇪",
//     "+65": "🇸🇬",
//     "+60": "🇲🇾",
//     "+66": "🇹🇭",
//     "+84": "🇻🇳",
//   };
//   return flags[countryCode] || "🌐";
// };

// // ── Confirm Dialog Component ──────────────────────────────────────────────────
// const ConfirmDialog = ({
//   isOpen,
//   title,
//   message,
//   onConfirm,
//   onCancel,
//   confirmText = "Confirm",
//   confirmColor = "red",
// }) => {
//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
//       <div
//         className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//         onClick={onCancel}
//       />
//       <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 z-10">
//         <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
//         <p className="text-gray-600 mb-6">{message}</p>
//         <div className="flex gap-3">
//           <button
//             onClick={onCancel}
//             className="flex-1 py-2.5 border-2 border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onConfirm}
//             className={`flex-1 py-2.5 text-white font-semibold rounded-xl transition ${
//               confirmColor === "red"
//                 ? "bg-red-600 hover:bg-red-700"
//                 : "bg-blue-600 hover:bg-blue-700"
//             }`}
//           >
//             {confirmText}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Booking = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { vehicleId } = useParams();

//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedTime, setSelectedTime] = useState("09:00");
//   const [pickupLocation, setPickupLocation] = useState("Kathmandu, Nepal");
//   const [dropoffLocation, setDropoffLocation] = useState("Kathmandu, Nepal");
//   const [bookingDays, setBookingDays] = useState(1);
//   const [driverOption, setDriverOption] = useState("without");
//   const [insuranceOption, setInsuranceOption] = useState("basic");
//   const [vehicleDetails, setVehicleDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [specialRequests, setSpecialRequests] = useState("");
//   const [emergencyContact, setEmergencyContact] = useState({
//     name: "",
//     phone: "",
//     countryCode: "+977",
//     relationship: "",
//   });
//   const [userPhoneNumber, setUserPhoneNumber] = useState("");

//   // Confirm dialog state
//   const [confirmDialog, setConfirmDialog] = useState({
//     isOpen: false,
//     title: "",
//     message: "",
//     onConfirm: null,
//   });

//   // Review states
//   const [reviews, setReviews] = useState([]);
//   const [reviewsLoading, setReviewsLoading] = useState(true);
//   const [userReview, setUserReview] = useState(null);
//   const [showReviewForm, setShowReviewForm] = useState(false);
//   const [newRating, setNewRating] = useState(5);
//   const [newComment, setNewComment] = useState("");
//   const [submittingReview, setSubmittingReview] = useState(false);
//   const [deletingReview, setDeletingReview] = useState(false);
//   const [editingReview, setEditingReview] = useState(false);
//   const [hasBookedThisVehicle, setHasBookedThisVehicle] = useState(false);
//   const [ratingDistribution, setRatingDistribution] = useState([
//     { stars: 5, percentage: 0, count: 0 },
//     { stars: 4, percentage: 0, count: 0 },
//     { stars: 3, percentage: 0, count: 0 },
//     { stars: 2, percentage: 0, count: 0 },
//     { stars: 1, percentage: 0, count: 0 },
//   ]);
//   const [averageRating, setAverageRating] = useState(0);
//   const [totalReviews, setTotalReviews] = useState(0);
//   const [showChartModal, setShowChartModal] = useState(false);
//   const [likedReviews, setLikedReviews] = useState(new Set());
//   const [selectedReviewImages, setSelectedReviewImages] = useState([]);
//   const [showImageModal, setShowImageModal] = useState(false);

//   // Chat states
//   const [showChatModal, setShowChatModal] = useState(false);
//   const [chatMessages, setChatMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [sendingMessage, setSendingMessage] = useState(false);
//   const [chatLoading, setChatLoading] = useState(false);
//   const [activeChatId, setActiveChatId] = useState(null);
//   const [chatPartnerInfo, setChatPartnerInfo] = useState(null);
//   const messagesEndRef = useRef(null);

//   // Availability check states
//   const [isAvailable, setIsAvailable] = useState(true);
//   const [availabilityMessage, setAvailabilityMessage] = useState("");
//   const [checkingAvailability, setCheckingAvailability] = useState(false);
//   const [conflictingDates, setConflictingDates] = useState([]);
//   const [nextAvailableDate, setNextAvailableDate] = useState(null);

//   const timeSlots = [
//     "09:00",
//     "10:00",
//     "11:00",
//     "12:00",
//     "13:00",
//     "14:00",
//     "15:00",
//     "16:00",
//     "17:00",
//   ];

//   const showConfirm = (title, message, onConfirm) => {
//     setConfirmDialog({ isOpen: true, title, message, onConfirm });
//   };

//   const closeConfirm = () => {
//     setConfirmDialog({
//       isOpen: false,
//       title: "",
//       message: "",
//       onConfirm: null,
//     });
//   };

//   useEffect(() => {
//     const storedLikes = localStorage.getItem("likedReviews");
//     if (storedLikes) setLikedReviews(new Set(JSON.parse(storedLikes)));
//   }, []);

//   useEffect(() => {
//     if (messagesEndRef.current)
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//   }, [chatMessages]);

//   const getAvailableDriverOptions = () => {
//     if (!vehicleDetails) return { withDriver: false, withoutDriver: false };
//     const bookingType = vehicleDetails.bookingType || "";
//     if (bookingType.toLowerCase() === "both")
//       return { withDriver: true, withoutDriver: true };
//     if (bookingType.toLowerCase().includes("with driver"))
//       return { withDriver: true, withoutDriver: false };
//     if (bookingType.toLowerCase().includes("without driver"))
//       return { withDriver: false, withoutDriver: true };
//     return { withDriver: true, withoutDriver: true };
//   };

//   const availableOptions = getAvailableDriverOptions();

//   useEffect(() => {
//     if (!availableOptions.withDriver && availableOptions.withoutDriver)
//       setDriverOption("without");
//     else if (availableOptions.withDriver && !availableOptions.withoutDriver)
//       setDriverOption("with");
//   }, [vehicleDetails]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError("");
//         if (location.state?.vehicle) {
//           setVehicleDetails(location.state.vehicle);
//           if (
//             location.state.vehicle.source === "user" &&
//             location.state.vehicle.userId
//           ) {
//             await fetchOwnerDetails(location.state.vehicle.userId);
//           }
//         } else if (vehicleId) {
//           let vehicleData = null;
//           try {
//             const adminResponse = await axios.get(
//               `http://localhost:5000/api/vehicles/${vehicleId}`,
//               { timeout: 10000 },
//             );
//             vehicleData = adminResponse.data;
//           } catch {
//             try {
//               const userResponse = await axios.get(
//                 `http://localhost:5000/api/user-vehicles/public/${vehicleId}`,
//                 { timeout: 10000 },
//               );
//               if (userResponse.data.success && userResponse.data.data) {
//                 const uv = userResponse.data.data;
//                 vehicleData = {
//                   _id: uv._id,
//                   carName: uv.carName,
//                   carNumber: uv.carNumber,
//                   carType: uv.carType,
//                   ratePerDay: uv.ratePerDay,
//                   seats: uv.seats,
//                   bookingType: uv.bookingType,
//                   gearType: uv.gearType,
//                   airCondition: uv.airCondition,
//                   description: uv.description,
//                   features: uv.features,
//                   photos: uv.photos,
//                   phoneNumber: uv.phoneNumber,
//                   driverName: uv.driverName,
//                   status: uv.status || "Available",
//                   holdExpiresAt: uv.holdExpiresAt || null,
//                   source: "user",
//                   owner: uv.fullName,
//                   ownerPhone: uv.phoneNumber,
//                   userId: uv.userId || uv.user,
//                 };
//                 if (vehicleData.userId)
//                   await fetchOwnerDetails(vehicleData.userId);
//               }
//             } catch {
//               console.error("Vehicle not found");
//             }
//           }
//           if (vehicleData) setVehicleDetails(vehicleData);
//           else setError("Vehicle not found");
//         } else {
//           setError("No vehicle selected");
//         }
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to load vehicle details");
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [location, vehicleId]);

//   const fetchOwnerDetails = async (userId) => {
//     try {
//       await axiosInstance.get(`/profile/user/${userId}`);
//     } catch (err) {
//       console.error("Error fetching owner details:", err);
//     }
//   };

//   useEffect(() => {
//     if (vehicleDetails?._id) {
//       fetchReviews();
//       checkUserBookingStatus();
//     }
//   }, [vehicleDetails]);

//   // Add useEffect to check availability when dates change
//   useEffect(() => {
//     if (selectedDate && vehicleDetails) {
//       const timeoutId = setTimeout(() => {
//         checkAvailability();
//       }, 500);
//       return () => clearTimeout(timeoutId);
//     }
//   }, [selectedDate, bookingDays, vehicleDetails]);

//   const fetchReviews = async () => {
//     try {
//       setReviewsLoading(true);
//       const response = await axios.get(
//         `${API_URL}/reviews/vehicle/${vehicleDetails._id}`,
//       );
//       if (response.data.success) {
//         setReviews(response.data.data.reviews);
//         updateRatingDistribution(response.data.data.reviews);
//         setAverageRating(response.data.data.averageRating || 0);
//         setTotalReviews(response.data.data.totalReviews || 0);
//         const likedIds = response.data.data.reviews
//           .filter((r) => r.hasLiked)
//           .map((r) => r._id);
//         setLikedReviews(new Set(likedIds));
//         localStorage.setItem("likedReviews", JSON.stringify(likedIds));
//       }
//     } catch (err) {
//       console.error("Error fetching reviews:", err);
//     } finally {
//       setReviewsLoading(false);
//     }
//   };

//   const updateRatingDistribution = (reviewsList) => {
//     const distribution = [
//       { stars: 5, percentage: 0, count: 0 },
//       { stars: 4, percentage: 0, count: 0 },
//       { stars: 3, percentage: 0, count: 0 },
//       { stars: 2, percentage: 0, count: 0 },
//       { stars: 1, percentage: 0, count: 0 },
//     ];
//     reviewsList.forEach((review) => {
//       const idx = 5 - review.rating;
//       if (idx >= 0 && idx < 5) distribution[idx].count++;
//     });
//     const total = reviewsList.length;
//     distribution.forEach((item) => {
//       item.percentage = total > 0 ? (item.count / total) * 100 : 0;
//     });
//     setRatingDistribution(distribution);
//   };

//   const checkUserBookingStatus = async () => {
//     try {
//       const token =
//         localStorage.getItem("token") || sessionStorage.getItem("token");
//       if (!token) {
//         setHasBookedThisVehicle(false);
//         return;
//       }
//       const response = await axiosInstance.get(
//         `/bookings/user/vehicle/${vehicleDetails._id}/status`,
//       );
//       if (response.data.success) {
//         setHasBookedThisVehicle(response.data.data.hasBooked);
//         if (response.data.data.hasBooked) {
//           const reviewResponse = await axiosInstance.get(
//             `/reviews/user/vehicle/${vehicleDetails._id}`,
//           );
//           if (reviewResponse.data.success && reviewResponse.data.data)
//             setUserReview(reviewResponse.data.data);
//         }
//       }
//     } catch {
//       setHasBookedThisVehicle(false);
//     }
//   };

//   const handleSubmitReview = async () => {
//     if (!newComment.trim()) {
//       toast.error("Please enter a review comment");
//       return;
//     }
//     setSubmittingReview(true);
//     try {
//       const response = await axiosInstance.post("/reviews", {
//         vehicleId: vehicleDetails._id,
//         rating: newRating,
//         comment: newComment,
//       });
//       if (response.data.success) {
//         toast.success("Review submitted successfully!");
//         setShowReviewForm(false);
//         setNewComment("");
//         setNewRating(5);
//         fetchReviews();
//         checkUserBookingStatus();
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to submit review");
//     } finally {
//       setSubmittingReview(false);
//     }
//   };

//   const handleUpdateReview = async () => {
//     if (!newComment.trim()) {
//       toast.error("Please enter a review comment");
//       return;
//     }
//     setSubmittingReview(true);
//     try {
//       const response = await axiosInstance.put(`/reviews/${userReview._id}`, {
//         rating: newRating,
//         comment: newComment,
//       });
//       if (response.data.success) {
//         toast.success("Review updated successfully!");
//         setEditingReview(false);
//         setShowReviewForm(false);
//         setNewComment("");
//         setNewRating(5);
//         fetchReviews();
//         checkUserBookingStatus();
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to update review");
//     } finally {
//       setSubmittingReview(false);
//     }
//   };

//   const handleDeleteReview = () => {
//     showConfirm(
//       "Delete Review",
//       "Are you sure you want to delete your review? This cannot be undone.",
//       async () => {
//         closeConfirm();
//         setDeletingReview(true);
//         try {
//           const response = await axiosInstance.delete(
//             `/reviews/${userReview._id}`,
//           );
//           if (response.data.success) {
//             toast.success("Review deleted successfully!");
//             setUserReview(null);
//             setShowReviewForm(false);
//             setEditingReview(false);
//             setNewComment("");
//             setNewRating(5);
//             await fetchReviews();
//             await checkUserBookingStatus();
//           }
//         } catch (err) {
//           toast.error(err.response?.data?.message || "Failed to delete review");
//         } finally {
//           setDeletingReview(false);
//         }
//       },
//     );
//   };

//   const handleEditReview = () => {
//     setNewRating(userReview.rating);
//     setNewComment(userReview.comment);
//     setEditingReview(true);
//     setShowReviewForm(true);
//   };

//   const handleToggleHelpful = async (reviewId, e) => {
//     e.stopPropagation();
//     const review = reviews.find((r) => r._id === reviewId);
//     const wasLiked = review?.hasLiked || false;
//     setReviews((prev) =>
//       prev.map((r) =>
//         r._id === reviewId
//           ? {
//               ...r,
//               hasLiked: !wasLiked,
//               helpful: wasLiked ? r.helpful - 1 : r.helpful + 1,
//             }
//           : r,
//       ),
//     );
//     const newLiked = new Set(likedReviews);
//     wasLiked ? newLiked.delete(reviewId) : newLiked.add(reviewId);
//     setLikedReviews(newLiked);
//     localStorage.setItem("likedReviews", JSON.stringify([...newLiked]));
//     try {
//       const response = await axiosInstance.post(`/reviews/${reviewId}/helpful`);
//       if (response.data.success) {
//         setReviews((prev) =>
//           prev.map((r) =>
//             r._id === reviewId
//               ? {
//                   ...r,
//                   hasLiked: response.data.isLiked,
//                   helpful: response.data.helpful,
//                 }
//               : r,
//           ),
//         );
//       }
//     } catch {}
//   };

//   const getChatPartnerFromChat = async (chatId) => {
//     try {
//       const response = await chatService.getChat(chatId);
//       if (response.success) {
//         const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
//         const other = response.data.participants.find(
//           (p) => p._id !== currentUser.id,
//         );
//         if (other) {
//           let role = "user",
//             displayName = other.name,
//             image = null;
//           if (response.data.chatType === "vehicle") {
//             if (other.role === "admin") {
//               role = "admin";
//               displayName = "Support Team";
//               image = `https://ui-avatars.com/api/?background=6B21A5&color=fff&rounded=true&size=128&name=Support`;
//             } else if (vehicleDetails?.source === "user") {
//               role = "owner";
//               displayName =
//                 other.name || vehicleDetails.owner || "Vehicle Owner";
//               image = other.profilePhoto
//                 ? `http://localhost:5000/uploads/profiles/${other.profilePhoto}`
//                 : `https://ui-avatars.com/api/?background=16A34A&color=fff&rounded=true&size=128&name=${displayName.charAt(0)}`;
//             } else {
//               role = "support";
//               displayName = "Support Team";
//               image = `https://ui-avatars.com/api/?background=6B21A5&color=fff&rounded=true&size=128&name=Support`;
//             }
//           }
//           setChatPartnerInfo({ name: displayName, image, role, id: other._id });
//         }
//       }
//     } catch (err) {
//       console.error("Error getting chat partner:", err);
//     }
//   };

//   const loadChatMessages = async (chatId) => {
//     try {
//       const response = await chatService.getChat(chatId);
//       if (response.success) {
//         const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
//         const currentUserId = (currentUser._id || currentUser.id)?.toString();
//         const formatted = (response.data.messages || []).map((msg, index) => ({
//           _id: msg._id || index,
//           message: msg.message,
//           createdAt: msg.createdAt,
//           isOwn:
//             (msg.sender?._id || msg.sender?.id || msg.sender)?.toString() ===
//             currentUserId,
//           sender: msg.sender,
//           read: msg.read,
//           delivered: msg.delivered,
//         }));
//         setChatMessages(formatted);
//         await chatService.markAsRead(chatId);
//       }
//     } catch (err) {
//       console.error("Error loading chat messages:", err);
//     }
//   };

//   const handleSendChatMessage = async () => {
//     if (!newMessage.trim() || sendingMessage || !activeChatId) return;
//     const messageText = newMessage.trim();
//     const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
//     setSendingMessage(true);
//     const tempMessage = {
//       _id: `temp-${Date.now()}`,
//       message: messageText,
//       createdAt: new Date(),
//       isOwn: true,
//       sending: true,
//       sender: {
//         _id: currentUser._id || currentUser.id,
//         name: currentUser.name,
//       },
//     };
//     setChatMessages((prev) => [...prev, tempMessage]);
//     setNewMessage("");
//     setTimeout(
//       () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
//       100,
//     );
//     try {
//       const response = await chatService.sendMessage(activeChatId, messageText);
//       if (response.success) {
//         setChatMessages((prev) =>
//           prev.map((msg) =>
//             msg._id === tempMessage._id ? response.data : msg,
//           ),
//         );
//       } else {
//         setChatMessages((prev) =>
//           prev.filter((msg) => msg._id !== tempMessage._id),
//         );
//         toast.error("Failed to send message");
//       }
//     } catch {
//       setChatMessages((prev) =>
//         prev.filter((msg) => msg._id !== tempMessage._id),
//       );
//       toast.error("Failed to send message");
//     } finally {
//       setSendingMessage(false);
//     }
//   };

//   const handleChatWithOwner = async () => {
//     const token =
//       localStorage.getItem("token") || sessionStorage.getItem("token");
//     if (!token) {
//       toast.error("Please login to chat");
//       navigate("/login");
//       return;
//     }
//     setChatLoading(true);
//     try {
//       const vehicleSource = vehicleDetails.source === "user" ? "user" : "admin";
//       const response = await chatService.getVehicleChat(
//         vehicleDetails._id,
//         vehicleSource,
//       );
//       if (response.success) {
//         setActiveChatId(response.data._id);
//         await loadChatMessages(response.data._id);
//         await getChatPartnerFromChat(response.data._id);
//         setShowChatModal(true);
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to start chat");
//     } finally {
//       setChatLoading(false);
//     }
//   };

//   const handleOpenReviewerChat = async (reviewer) => {
//     const token =
//       localStorage.getItem("token") || sessionStorage.getItem("token");
//     if (!token) {
//       toast.error("Please login to chat");
//       navigate("/login");
//       return;
//     }
//     setChatLoading(true);
//     setChatPartnerInfo({
//       name: reviewer.name,
//       image: reviewer.profilePhoto
//         ? `http://localhost:5000/uploads/profiles/${reviewer.profilePhoto}`
//         : `https://ui-avatars.com/api/?background=3B82F6&color=fff&rounded=true&size=128&name=${reviewer.name?.charAt(0) || "U"}`,
//       role: "reviewer",
//       id: reviewer._id,
//     });
//     setShowChatModal(true);
//     try {
//       const response = await axiosInstance.post("/chats/direct", {
//         recipientId: reviewer._id,
//       });
//       if (response.data.success) {
//         setActiveChatId(response.data.data._id);
//         await loadChatMessages(response.data.data._id);
//       }
//     } catch (err) {
//       console.error("Error opening reviewer chat:", err);
//       toast.error("Failed to start chat");
//       setShowChatModal(false);
//     } finally {
//       setChatLoading(false);
//     }
//   };

//   const formatDate = (dateString) =>
//     new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });

//   const formatChatTime = (date) =>
//     new Date(date).toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });

//   const renderStars = (rating, size = "text-sm") => (
//     <div className="flex items-center gap-0.5">
//       {[1, 2, 3, 4, 5].map((star) => (
//         <FaStar
//           key={star}
//           className={`${size} ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
//           fill={star <= rating ? "currentColor" : "none"}
//         />
//       ))}
//     </div>
//   );

//   const renderStarInput = () => (
//     <div className="flex items-center gap-2 mb-4">
//       <span className="text-gray-700 font-medium">Your Rating:</span>
//       <div className="flex items-center gap-1">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <button
//             key={star}
//             type="button"
//             onClick={() => setNewRating(star)}
//             className="focus:outline-none transition-transform hover:scale-110"
//           >
//             <FaStar
//               className={`text-2xl ${star <= newRating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
//             />
//           </button>
//         ))}
//       </div>
//     </div>
//   );

//   const calculateTotal = () => {
//     if (!vehicleDetails)
//       return {
//         basePrice: 0,
//         driverFee: 0,
//         insuranceFee: 0,
//         serviceFee: 500,
//         total: 0,
//       };
//     const basePrice = (vehicleDetails.ratePerDay || 5000) * bookingDays;
//     const driverFee = driverOption === "with" ? 500 * bookingDays : 0;
//     const insuranceFee = insuranceOption === "premium" ? 1500 * bookingDays : 0;
//     const serviceFee = 500;
//     return {
//       basePrice,
//       driverFee,
//       insuranceFee,
//       serviceFee,
//       total: basePrice + driverFee + insuranceFee + serviceFee,
//     };
//   };

//   const totals = calculateTotal();
//   const formatNPR = (amount) => "रु " + amount.toLocaleString("en-NP");

//   const calculateReturnDate = () => {
//     if (!selectedDate) return "";
//     const returnDate = new Date(selectedDate);
//     returnDate.setDate(returnDate.getDate() + bookingDays);
//     return returnDate.toISOString().split("T")[0];
//   };

//   const displayStatus = getVehicleDisplayStatus(vehicleDetails);
//   const vehicleIsInMaintenance = displayStatus?.type === "maintenance";

//   // Add availability check function
//   const checkAvailability = async () => {
//     if (!selectedDate || !calculateReturnDate() || !vehicleDetails?._id) {
//       return;
//     }

//     setCheckingAvailability(true);
//     try {
//       const token = localStorage.getItem("token") || sessionStorage.getItem("token");
//       const response = await axios.post(
//         `${API_URL}/bookings/check-availability`,
//         {
//           vehicleId: vehicleDetails._id,
//           pickupDate: selectedDate,
//           returnDate: calculateReturnDate(),
//         },
//         {
//           headers: token ? { Authorization: `Bearer ${token}` } : {},
//         }
//       );

//       if (response.data.success) {
//         setIsAvailable(response.data.available);
//         setAvailabilityMessage(response.data.message);
//         setNextAvailableDate(response.data.nextAvailableDate);
//         setConflictingDates(response.data.overlappingBookings || []);
        
//         if (!response.data.available) {
//           toast.warning(response.data.message);
//         }
//       }
//     } catch (error) {
//       console.error("Availability check failed:", error);
//       setIsAvailable(false);
//       setAvailabilityMessage("Unable to check availability. Please try again.");
//     } finally {
//       setCheckingAvailability(false);
//     }
//   };

//   const handleBookNow = async () => {
//     const token =
//       localStorage.getItem("token") || sessionStorage.getItem("token");
//     if (!token) {
//       toast.error("Please login to book a vehicle");
//       navigate("/login");
//       return;
//     }
//     if (!vehicleDetails) {
//       toast.error("Please select a vehicle first");
//       return;
//     }
//     // Add this check after checking if vehicle exists:
//     if (!isAvailable) {
//       toast.error(availabilityMessage || "This vehicle is not available for the selected dates. Please choose different dates.");
//       return;
//     }

//     if (vehicleIsInMaintenance) {
//       toast.error("This vehicle is currently under maintenance and cannot be booked.");
//       return;
//     }
//     if (!selectedDate) {
//       toast.error("Please select a pickup date");
//       return;
//     }
//     if (!userPhoneNumber || userPhoneNumber.length !== 10) {
//       toast.error("Please enter a valid 10-digit Nepali phone number");
//       return;
//     }
//     if (!emergencyContact.name || !emergencyContact.phone) {
//       toast.error("Please provide emergency contact information");
//       return;
//     }

//     setSubmitting(true);
//     try {
//       const returnDate = calculateReturnDate();
//       const bookingData = {
//         vehicleId: vehicleDetails._id,
//         pickupDate: new Date(selectedDate).toISOString(),
//         pickupTime: selectedTime,
//         returnDate: new Date(returnDate).toISOString(),
//         returnTime: selectedTime,
//         pickupLocation,
//         dropoffLocation,
//         driverOption,
//         insuranceOption,
//         specialRequests,
//         userContact: {
//           countryCode: "+977",
//           phone: userPhoneNumber,
//           fullPhone: `+977${userPhoneNumber}`,
//         },
//         emergencyContact: {
//           ...emergencyContact,
//           fullPhone: `${emergencyContact.countryCode}${emergencyContact.phone}`,
//         },
//         vehicleSource: vehicleDetails.source || "admin",
//       };

//       // Don't create booking yet - pass data to upload page
//       toast.success("Proceeding to document upload...");
//       setTimeout(() => {
//         navigate("/upload-documents", {
//           state: {
//             bookingData, // Pass the booking data without creating it
//             vehicleDetails,
//             driverOption,
//             bookingDetails: {
//               ...bookingData,
//               totalAmount: totals.total,
//               formattedTotal: formatNPR(totals.total),
//             },
//           },
//         });
//       }, 500);
//     } catch (err) {
//       toast.error("Failed to proceed. Please try again.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const getVehicleImage = () => {
//     if (!vehicleDetails?.photos?.length)
//       return "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80";
//     const extraView = vehicleDetails.photos.find(
//       (p) => p.label === "Extra View",
//     );
//     const photo = extraView || vehicleDetails.photos[0];
//     const folder =
//       vehicleDetails.source === "user" ? "user-vehicles" : "vehicles";
//     return `http://localhost:5000/uploads/${folder}/${photo.filename}`;
//   };

//   const getVehicleImages = () => {
//     if (!vehicleDetails?.photos?.length)
//       return [
//         "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
//       ];
//     const folder =
//       vehicleDetails.source === "user" ? "user-vehicles" : "vehicles";
//     return vehicleDetails.photos.map(
//       (p) => `http://localhost:5000/uploads/${folder}/${p.filename}`,
//     );
//   };

//   const getVehicleFeatures = () => {
//     if (!vehicleDetails) return [];
//     const features = [];
//     if (vehicleDetails.features && Array.isArray(vehicleDetails.features))
//       features.push(...vehicleDetails.features);
//     if (vehicleDetails.airCondition === "Yes")
//       features.push("Air Conditioning");
//     if (vehicleDetails.gearType)
//       features.push(`${vehicleDetails.gearType} Transmission`);
//     if (vehicleDetails.seats) features.push(`${vehicleDetails.seats} Seats`);
//     return features;
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading vehicle details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !vehicleDetails) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-red-600 text-4xl mb-4">⚠️</div>
//           <h2 className="text-xl font-semibold mb-2">Error Loading Vehicle</h2>
//           <p className="text-gray-600 mb-4">{error || "Vehicle not found"}</p>
//           <button
//             onClick={() => navigate("/rentridehome")}
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//           >
//             Back to Vehicles
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const vehicleImages = getVehicleImages();
//   const vehicleFeatures = getVehicleFeatures();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop
//         closeOnClick
//       />

//       {/* Confirm Dialog */}
//       <ConfirmDialog
//         isOpen={confirmDialog.isOpen}
//         title={confirmDialog.title}
//         message={confirmDialog.message}
//         onConfirm={confirmDialog.onConfirm}
//         onCancel={closeConfirm}
//         confirmText="Yes, Delete"
//         confirmColor="red"
//       />

//       {/* Header */}
//       <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
//         <div className="container mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-6">
//               <button
//                 onClick={() => navigate(-1)}
//                 className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               >
//                 <FaArrowLeft className="text-gray-700 text-lg" />
//               </button>
//               <div className="flex items-center gap-3">
//                 <div className="p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
//                   <FaCar className="text-white text-2xl" />
//                 </div>
//                 <div>
//                   <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                     Rent<span className="text-gray-800">Ride</span>
//                   </h1>
//                   <p className="text-xs text-gray-500 -mt-1">
//                     Premium Car Rentals
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <button
//               onClick={() => navigate("/profiledetails")}
//               className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
//             >
//               My Bookings
//             </button>
//           </div>
//         </div>
//       </header>

//       <div className="container mx-auto px-6 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* ── Left Column ── */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Vehicle Details Card */}
//             <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//               <div className="p-8">
//                 {/* Maintenance Banner */}
//                 {vehicleIsInMaintenance && (
//                   <div className="mb-6 p-4 bg-gray-100 border border-gray-300 rounded-xl flex items-center gap-3">
//                     <span className="text-gray-600 text-2xl flex-shrink-0">🔧</span>
//                     <div>
//                       <p className="text-gray-800 font-semibold text-lg">
//                         Vehicle Under Maintenance
//                       </p>
//                       <p className="text-gray-600 text-sm mt-0.5">
//                         This vehicle is currently not available for booking.
//                       </p>
//                     </div>
//                   </div>
//                 )}

//                 <div className="flex flex-col lg:flex-row gap-8">
//                   {/* Images */}
//                   <div className="lg:w-2/5">
//                     <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden">
//                       <img
//                         src={getVehicleImage()}
//                         alt={vehicleDetails.carName}
//                         className="w-full h-full object-cover"
//                       />
//                       <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/60 text-white text-sm font-medium rounded-full backdrop-blur-sm">
//                         {vehicleDetails.carType || "Premium Vehicle"}
//                       </div>
//                       <div className="absolute top-4 right-4">
//                         <span
//                           className={`px-3 py-1 rounded-full text-xs font-bold ${
//                             vehicleIsInMaintenance
//                               ? "bg-gray-500 text-white"
//                               : "bg-green-500 text-white"
//                           }`}
//                         >
//                           {vehicleIsInMaintenance
//                             ? "Maintenance"
//                             : vehicleDetails.status}
//                         </span>
//                       </div>
//                       {vehicleDetails.source === "user" && (
//                         <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-purple-500/90 text-white text-sm font-medium rounded-full backdrop-blur-sm">
//                           Owner Listed
//                         </div>
//                       )}
//                     </div>
//                     <div className="flex gap-3 mt-4">
//                       {vehicleImages.slice(1, 3).map((img, index) => (
//                         <div
//                           key={index}
//                           className="flex-1 h-20 rounded-xl overflow-hidden cursor-pointer hover:opacity-90"
//                         >
//                           <img
//                             src={img}
//                             alt={`${vehicleDetails.carName} ${index + 2}`}
//                             className="w-full h-full object-cover"
//                           />
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Info */}
//                   <div className="lg:w-3/5">
//                     <div className="flex items-start justify-between mb-6">
//                       <div>
//                         <h1 className="text-3xl font-bold text-gray-900">
//                           {vehicleDetails.carName}
//                         </h1>
//                         <p className="text-gray-600 mt-1">
//                           {vehicleDetails.carType}
//                         </p>
//                         {vehicleDetails.carNumber && (
//                           <p className="text-sm text-gray-400 mt-1">
//                             {vehicleDetails.carNumber}
//                           </p>
//                         )}
//                         <div className="flex items-center gap-3 mt-4">
//                           {totalReviews > 0 ? (
//                             <>
//                               <div className="flex items-center bg-gradient-to-r from-yellow-400 to-orange-400 px-4 py-2 rounded-full shadow-md">
//                                 <span className="text-2xl font-bold text-white mr-2">
//                                   {averageRating.toFixed(1)}
//                                 </span>
//                                 {renderStars(
//                                   Math.round(averageRating),
//                                   "text-sm text-white",
//                                 )}
//                               </div>
//                               <span className="text-gray-600 font-medium">
//                                 {totalReviews}{" "}
//                                 {totalReviews === 1 ? "review" : "reviews"}
//                               </span>
//                             </>
//                           ) : (
//                             <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
//                               <span className="text-gray-400 text-sm font-medium">
//                                 No reviews yet
//                               </span>
//                               <div className="flex items-center gap-0.5">
//                                 {[...Array(5)].map((_, i) => (
//                                   <FaStar
//                                     key={i}
//                                     className="text-xs text-gray-300"
//                                   />
//                                 ))}
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                       <div className="text-right">
//                         <div className="text-4xl font-bold text-blue-600">
//                           {formatNPR(vehicleDetails.ratePerDay || 5000)}
//                         </div>
//                         <div className="text-gray-500">प्रति दिन</div>
//                         <div
//                           className={`mt-2 px-3 py-1 rounded-full text-sm font-medium ${
//                             vehicleIsInMaintenance
//                               ? "bg-gray-100 text-gray-700"
//                               : "bg-green-100 text-green-600"
//                           }`}
//                         >
//                           {vehicleIsInMaintenance
//                             ? "Maintenance"
//                             : vehicleDetails.status || "Available"}
//                         </div>
//                         <button
//                           onClick={handleChatWithOwner}
//                           disabled={chatLoading}
//                           className="mt-3 flex items-center justify-center gap-2 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition w-full whitespace-nowrap"
//                         >
//                           {chatLoading ? (
//                             <FaSpinner className="animate-spin" size={14} />
//                           ) : (
//                             <FaComments size={14} />
//                           )}
//                           <span>
//                             Chat with{" "}
//                             {vehicleDetails.source === "user"
//                               ? "Owner"
//                               : "Support"}
//                           </span>
//                         </button>
//                       </div>
//                     </div>

//                     {/* Features */}
//                     <div className="mb-8">
//                       <h3 className="text-lg font-semibold text-gray-900 mb-3">
//                         Key Features
//                       </h3>
//                       <div className="flex flex-wrap gap-2">
//                         {vehicleFeatures.map((feature, index) => (
//                           <span
//                             key={index}
//                             className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium"
//                           >
//                             {feature}
//                           </span>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Specs */}
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-900 mb-3">
//                         Specifications
//                       </h3>
//                       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                         {vehicleDetails.gearType && (
//                           <div className="p-3 bg-gray-50 rounded-xl text-center">
//                             <div className="text-sm text-gray-500">
//                               Transmission
//                             </div>
//                             <div className="font-semibold text-gray-900">
//                               {vehicleDetails.gearType}
//                             </div>
//                           </div>
//                         )}
//                         {vehicleDetails.seats && (
//                           <div className="p-3 bg-gray-50 rounded-xl text-center">
//                             <div className="text-sm text-gray-500">Seats</div>
//                             <div className="font-semibold text-gray-900">
//                               {vehicleDetails.seats}
//                             </div>
//                           </div>
//                         )}
//                         {vehicleDetails.airCondition && (
//                           <div className="p-3 bg-gray-50 rounded-xl text-center">
//                             <div className="text-sm text-gray-500">
//                               Air Condition
//                             </div>
//                             <div className="font-semibold text-gray-900">
//                               {vehicleDetails.airCondition}
//                             </div>
//                           </div>
//                         )}
//                         <div className="p-3 bg-gray-50 rounded-xl text-center">
//                           <div className="text-sm text-gray-500">
//                             Booking Type
//                           </div>
//                           <div className="font-semibold text-gray-900">
//                             {vehicleDetails.bookingType || "Both"}
//                           </div>
//                         </div>
//                         {vehicleDetails.driverName && (
//                           <div className="p-3 bg-gray-50 rounded-xl text-center">
//                             <div className="text-sm text-gray-500">Driver</div>
//                             <div className="font-semibold text-gray-900">
//                               {vehicleDetails.driverName}
//                             </div>
//                           </div>
//                         )}
//                         {vehicleDetails.phoneNumber && (
//                           <div className="p-3 bg-gray-50 rounded-xl text-center">
//                             <div className="text-sm text-gray-500">Contact</div>
//                             <div className="font-semibold text-gray-900">
//                               {vehicleDetails.phoneNumber}
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Booking Form OR Unavailable Message */}
//             {!vehicleIsInMaintenance ? (
//               <div className="bg-white rounded-2xl shadow-lg p-8">
//                 <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                   Booking Details
//                 </h2>
//                 <div className="space-y-6">
//                   {/* Date & Time */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         <div className="flex items-center gap-2">
//                           <FaCalendarAlt className="text-blue-600" /> Pickup
//                           Date
//                         </div>
//                       </label>
//                       <input
//                         type="date"
//                         value={selectedDate}
//                         onChange={(e) => setSelectedDate(e.target.value)}
//                         min={new Date().toISOString().split("T")[0]}
//                         className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         required
//                       />
//                       <p className="text-sm text-gray-500 mt-1">
//                         Return date:{" "}
//                         {calculateReturnDate() || "Select pickup date first"}
//                       </p>
//                       {/* Add availability status indicator */}
//                       {selectedDate && calculateReturnDate() && (
//                         <div className={`mt-2 text-sm ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
//                           {checkingAvailability ? (
//                             <div className="flex items-center gap-2">
//                               <FaSpinner className="animate-spin" />
//                               Checking availability...
//                             </div>
//                           ) : (
//                             <div className="flex items-center gap-2">
//                               {isAvailable ? (
//                                 <>
//                                   <FaCheckCircle className="text-green-600" />
//                                   <span>{availabilityMessage || "Vehicle available for selected dates!"}</span>
//                                 </>
//                               ) : (
//                                 <>
//                                   <FaTimesCircle className="text-red-600" />
//                                   <span>{availabilityMessage}</span>
//                                 </>
//                               )}
//                             </div>
//                           )}
//                         </div>
//                       )}

//                       {/* Add next available date suggestion */}
//                       {!isAvailable && nextAvailableDate && (
//                         <div className="mt-2 p-3 bg-blue-50 rounded-lg">
//                           <p className="text-sm text-blue-800">
//                             <strong>💡 Suggestion:</strong> This vehicle becomes available from{" "}
//                             {new Date(nextAvailableDate).toLocaleDateString()}
//                           </p>
//                           <button
//                             onClick={() => {
//                               const nextDate = new Date(nextAvailableDate);
//                               setSelectedDate(nextDate.toISOString().split("T")[0]);
//                               setBookingDays(1);
//                             }}
//                             className="mt-2 text-xs text-blue-600 hover:text-blue-800 underline"
//                           >
//                             Book from this date →
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         <div className="flex items-center gap-2">
//                           <FaClock className="text-blue-600" /> Pickup Time
//                         </div>
//                       </label>
//                       <div className="flex flex-wrap gap-2">
//                         {timeSlots.map((time) => (
//                           <button
//                             key={time}
//                             onClick={() => setSelectedTime(time)}
//                             className={`px-4 py-2 rounded-lg transition-all duration-300 ${
//                               selectedTime === time
//                                 ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
//                                 : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                             }`}
//                           >
//                             {time}
//                           </button>
//                         ))}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Locations */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         <div className="flex items-center gap-2">
//                           <FaMapMarkerAlt className="text-blue-600" /> Pickup
//                           Location
//                         </div>
//                       </label>
//                       <input
//                         type="text"
//                         value={pickupLocation}
//                         onChange={(e) => setPickupLocation(e.target.value)}
//                         className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder="Enter pickup location"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         <div className="flex items-center gap-2">
//                           <FaMapMarkerAlt className="text-green-600" /> Drop-off
//                           Location
//                         </div>
//                       </label>
//                       <input
//                         type="text"
//                         value={dropoffLocation}
//                         onChange={(e) => setDropoffLocation(e.target.value)}
//                         className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder="Enter drop-off location"
//                       />
//                     </div>
//                   </div>

//                   {/* Duration */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Rental Duration
//                     </label>
//                     <div className="flex items-center gap-4">
//                       <button
//                         onClick={() =>
//                           setBookingDays(Math.max(1, bookingDays - 1))
//                         }
//                         className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-bold text-xl"
//                       >
//                         -
//                       </button>
//                       <div className="text-center">
//                         <div className="text-3xl font-bold text-gray-900">
//                           {bookingDays} day{bookingDays > 1 ? "s" : ""}
//                         </div>
//                         <div className="text-gray-500 text-sm">
//                           Total:{" "}
//                           {formatNPR(
//                             (vehicleDetails.ratePerDay || 5000) * bookingDays,
//                           )}
//                         </div>
//                       </div>
//                       <button
//                         onClick={() => setBookingDays(bookingDays + 1)}
//                         className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-bold text-xl"
//                       >
//                         +
//                       </button>
//                     </div>
//                   </div>

//                   {/* Driver Option */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-3">
//                       Driver Option
//                     </label>
//                     <div className="grid grid-cols-2 gap-4">
//                       <button
//                         type="button"
//                         onClick={() =>
//                           availableOptions.withoutDriver &&
//                           setDriverOption("without")
//                         }
//                         className={`p-4 rounded-xl border-2 text-left transition-all relative ${
//                           driverOption === "without"
//                             ? "border-blue-500 bg-blue-50"
//                             : "border-gray-200 hover:border-gray-300"
//                         } ${!availableOptions.withoutDriver ? "opacity-40 cursor-not-allowed" : ""}`}
//                       >
//                         <div className="flex items-center justify-between mb-1">
//                           <div className="font-semibold text-gray-900">
//                             Without Driver
//                           </div>
//                           <div className="group relative">
//                             <FaInfoCircle
//                               className="text-blue-500 cursor-help text-sm"
//                               onClick={(e) => e.stopPropagation()}
//                             />
//                             <div className="invisible group-hover:visible absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg w-56 z-50">
//                               <div className="font-semibold mb-1">
//                                 Self-Drive Requirements:
//                               </div>
//                               <ul className="space-y-0.5 text-left">
//                                 <li>• Valid driving license required</li>
//                                 <li>• Minimum 1 year experience</li>
//                                 <li>• Age 21+ years</li>
//                                 <li>• You pay for fuel</li>
//                               </ul>
//                               <div className="absolute top-full right-4 -mt-1">
//                                 <div className="border-4 border-transparent border-t-gray-900"></div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="text-sm text-gray-500 mt-1">
//                           Self-drive
//                         </div>
//                         <div className="text-sm font-medium text-blue-600 mt-2">
//                           +रु 0/day
//                         </div>
//                       </button>
//                       <button
//                         type="button"
//                         onClick={() =>
//                           availableOptions.withDriver && setDriverOption("with")
//                         }
//                         className={`p-4 rounded-xl border-2 text-left transition-all relative ${
//                           driverOption === "with"
//                             ? "border-blue-500 bg-blue-50"
//                             : "border-gray-200 hover:border-gray-300"
//                         } ${!availableOptions.withDriver ? "opacity-40 cursor-not-allowed" : ""}`}
//                       >
//                         <div className="flex items-center justify-between mb-1">
//                           <div className="font-semibold text-gray-900">
//                             With Driver
//                           </div>
//                           <div className="group relative">
//                             <FaInfoCircle
//                               className="text-blue-500 cursor-help text-sm"
//                               onClick={(e) => e.stopPropagation()}
//                             />
//                             <div className="invisible group-hover:visible absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg w-56 z-50">
//                               <div className="font-semibold mb-1">
//                                 Professional Driver Includes:
//                               </div>
//                               <ul className="space-y-0.5 text-left">
//                                 <li>• Experienced driver</li>
//                                 <li>• 8 hours/day service</li>
//                                 <li>• 80 km/day limit</li>
//                                 <li>• Extra: रु 50/km, रु 500/hr</li>
//                                 <li>• You pay for fuel</li>
//                               </ul>
//                               <div className="absolute top-full right-4 -mt-1">
//                                 <div className="border-4 border-transparent border-t-gray-900"></div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="text-sm text-gray-500 mt-1">
//                           Includes driver
//                         </div>
//                         <div className="text-sm font-medium text-blue-600 mt-2">
//                           +रु 500/day
//                         </div>
//                       </button>
//                     </div>
//                     <p className="text-xs text-gray-400 mt-2">
//                       This vehicle supports:{" "}
//                       <span className="font-medium">
//                         {vehicleDetails.bookingType || "Both"}
//                       </span>
//                     </p>
//                   </div>

//                   {/* Insurance */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-3">
//                       <div className="flex items-center gap-2">
//                         <FaShieldAlt className="text-blue-600" /> Insurance
//                         Coverage
//                       </div>
//                     </label>
//                     <div className="grid grid-cols-2 gap-4">
//                       <button
//                         type="button"
//                         onClick={() => setInsuranceOption("basic")}
//                         className={`p-4 rounded-xl border-2 text-left transition-all relative ${
//                           insuranceOption === "basic"
//                             ? "border-green-500 bg-green-50"
//                             : "border-gray-200 hover:border-gray-300"
//                         }`}
//                       >
//                         <div className="flex items-center justify-between mb-1">
//                           <div className="font-semibold text-gray-900">
//                             Basic Coverage
//                           </div>
//                           <div className="group relative">
//                             <FaInfoCircle
//                               className="text-blue-500 cursor-help text-sm"
//                               onClick={(e) => e.stopPropagation()}
//                             />
//                             <div className="invisible group-hover:visible absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg w-56 z-50">
//                               <div className="font-semibold mb-1">
//                                 Basic Coverage Includes:
//                               </div>
//                               <ul className="space-y-0.5 text-left">
//                                 <li>• Third-party liability</li>
//                                 <li>• Basic accident coverage</li>
//                                 <li>• Theft protection</li>
//                                 <li>• Deductible: रु 10,000</li>
//                               </ul>
//                               <div className="absolute top-full right-4 -mt-1">
//                                 <div className="border-4 border-transparent border-t-gray-900"></div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="text-sm text-gray-500 mt-1">
//                           Standard protection
//                         </div>
//                         <div className="text-sm font-medium text-green-600 mt-2">
//                           Included
//                         </div>
//                       </button>
//                       <button
//                         type="button"
//                         onClick={() => setInsuranceOption("premium")}
//                         className={`p-4 rounded-xl border-2 text-left transition-all relative ${
//                           insuranceOption === "premium"
//                             ? "border-green-500 bg-green-50"
//                             : "border-gray-200 hover:border-gray-300"
//                         }`}
//                       >
//                         <div className="flex items-center justify-between mb-1">
//                           <div className="font-semibold text-gray-900">
//                             Premium Coverage
//                           </div>
//                           <div className="group relative">
//                             <FaInfoCircle
//                               className="text-blue-500 cursor-help text-sm"
//                               onClick={(e) => e.stopPropagation()}
//                             />
//                             <div className="invisible group-hover:visible absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg w-56 z-50">
//                               <div className="font-semibold mb-1">
//                                 Premium Coverage Includes:
//                               </div>
//                               <ul className="space-y-0.5 text-left">
//                                 <li>• Full comprehensive insurance</li>
//                                 <li>• Zero deductible</li>
//                                 <li>• 24/7 roadside assistance</li>
//                                 <li>• Personal accident cover</li>
//                                 <li>• Glass & tire damage</li>
//                               </ul>
//                               <div className="absolute top-full right-4 -mt-1">
//                                 <div className="border-4 border-transparent border-t-gray-900"></div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="text-sm text-gray-500 mt-1">
//                           Full protection
//                         </div>
//                         <div className="text-sm font-medium text-green-600 mt-2">
//                           +रु 1,500/day
//                         </div>
//                       </button>
//                     </div>
//                   </div>

//                   {/* User Contact Information - Nepal Only */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-3">
//                       <div className="flex items-center gap-2">
//                         <FaPhone className="text-blue-600" />
//                         Your Contact Number{" "}
//                         <span className="text-red-500">*</span>
//                       </div>
//                     </label>
//                     <div className="flex gap-2">
//                       <div className="w-28 px-3 py-3 bg-gray-100 border border-gray-300 rounded-xl flex items-center justify-center gap-2">
//                         <img
//                           src="https://flagcdn.com/w20/np.png"
//                           alt="Nepal"
//                           className="w-5 h-4 object-cover rounded-sm"
//                         />
//                         <span className="font-medium text-gray-700">+977</span>
//                       </div>
//                       <input
//                         type="tel"
//                         value={userPhoneNumber}
//                         onChange={(e) => {
//                           const value = e.target.value.replace(/[^0-9]/g, "");
//                           if (value.length <= 10) {
//                             setUserPhoneNumber(value);
//                           }
//                         }}
//                         maxLength={10}
//                         className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder="98XXXXXXXX"
//                         required
//                       />
//                     </div>
//                     <p className="text-xs text-gray-400 mt-1">
//                       Format: 🇳🇵 +977 {userPhoneNumber || "98XXXXXXXX"}
//                     </p>
//                     <p className="text-xs text-blue-600 mt-2">
//                       We'll use this number to contact you about your booking
//                     </p>
//                   </div>

//                   {/* Emergency Contact with Country Code Selector */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-3">
//                       <div className="flex items-center gap-2">
//                         <FaPhone className="text-blue-600" />
//                         Emergency Contact{" "}
//                         <span className="text-red-500">*</span>
//                       </div>
//                     </label>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                       <div>
//                         <label className="block text-xs text-gray-500 mb-1">
//                           Full Name <span className="text-red-500">*</span>
//                         </label>
//                         <input
//                           type="text"
//                           value={emergencyContact.name}
//                           onChange={(e) =>
//                             setEmergencyContact({
//                               ...emergencyContact,
//                               name: e.target.value,
//                             })
//                           }
//                           className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           placeholder="Enter full name"
//                           required
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-xs text-gray-500 mb-1">
//                           Phone Number <span className="text-red-500">*</span>
//                         </label>
//                         <div className="flex gap-2">
//                           <CountryCodeSelector
//                             value={emergencyContact.countryCode || "+977"}
//                             onChange={(code) =>
//                               setEmergencyContact({
//                                 ...emergencyContact,
//                                 countryCode: code,
//                               })
//                             }
//                             className="w-32"
//                           />
//                           <input
//                             type="tel"
//                             value={emergencyContact.phone}
//                             onChange={(e) => {
//                               const value = e.target.value.replace(
//                                 /[^0-9]/g,
//                                 "",
//                               );
//                               setEmergencyContact({
//                                 ...emergencyContact,
//                                 phone: value,
//                               });
//                             }}
//                             className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             placeholder="Enter phone number"
//                             required
//                           />
//                         </div>
//                         <p className="text-xs text-gray-400 mt-1">
//                           Format:{" "}
//                           {getCountryFlag(
//                             emergencyContact.countryCode || "+977",
//                           )}{" "}
//                           {emergencyContact.countryCode || "+977"}{" "}
//                           {emergencyContact.phone || "XXXXXXXXXX"}
//                         </p>
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-xs text-gray-500 mb-1">
//                         Relationship
//                       </label>
//                       <input
//                         type="text"
//                         value={emergencyContact.relationship}
//                         onChange={(e) =>
//                           setEmergencyContact({
//                             ...emergencyContact,
//                             relationship: e.target.value,
//                           })
//                         }
//                         className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder="e.g. Parent, Spouse, Friend"
//                       />
//                     </div>
//                   </div>

//                   {/* Special Requests */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Special Requests{" "}
//                       <span className="text-gray-400 font-normal">
//                         (optional)
//                       </span>
//                     </label>
//                     <textarea
//                       value={specialRequests}
//                       onChange={(e) => setSpecialRequests(e.target.value)}
//                       rows={3}
//                       className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
//                       placeholder="Any specific requirements or notes..."
//                     />
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="border-2 rounded-2xl p-8 text-center bg-gray-50 border-gray-200">
//                 <div className="text-6xl mb-4">🔧</div>
//                 <h3 className="text-2xl font-bold text-gray-800 mb-3">
//                   Vehicle Under Maintenance
//                 </h3>
//                 <p className="text-gray-600 mb-2">
//                   This vehicle is currently under maintenance and is not available for booking.
//                 </p>
//                 <p className="text-sm text-gray-500 mt-4">
//                   Please check back later or browse other available vehicles.
//                 </p>
//                 <button
//                   onClick={() => navigate("/rentridehome")}
//                   className="mt-6 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all"
//                 >
//                   Browse Other Vehicles
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* ── Right Column ── */}
//           <div className="space-y-8">
//             {/* Pricing Summary */}
//             <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 z-10">
//               <h2 className="text-xl font-bold text-gray-900 mb-6">
//                 Pricing Summary
//               </h2>
//               <div className="space-y-4">
//                 <div className="flex justify-between py-2 border-b border-gray-100">
//                   <span className="text-gray-600">
//                     Base Price ({bookingDays} day{bookingDays > 1 ? "s" : ""})
//                   </span>
//                   <span className="font-semibold">
//                     {formatNPR(totals.basePrice)}
//                   </span>
//                 </div>
//                 {totals.driverFee > 0 && (
//                   <div className="flex justify-between py-2 border-b border-gray-100">
//                     <span className="text-gray-600">Driver Fee</span>
//                     <span className="font-semibold">
//                       {formatNPR(totals.driverFee)}
//                     </span>
//                   </div>
//                 )}
//                 {totals.insuranceFee > 0 && (
//                   <div className="flex justify-between py-2 border-b border-gray-100">
//                     <span className="text-gray-600">Premium Insurance</span>
//                     <span className="font-semibold">
//                       {formatNPR(totals.insuranceFee)}
//                     </span>
//                   </div>
//                 )}
//                 <div className="flex justify-between py-2 border-b border-gray-100">
//                   <span className="text-gray-600">Service Fee</span>
//                   <span className="font-semibold">
//                     {formatNPR(totals.serviceFee)}
//                   </span>
//                 </div>
//                 <div className="pt-2">
//                   <div className="flex justify-between items-center">
//                     <span className="text-lg font-bold text-gray-900">
//                       Total
//                     </span>
//                     <span className="text-3xl font-bold text-blue-600">
//                       {formatNPR(totals.total)}
//                     </span>
//                   </div>
//                 </div>

//                 <button
//                   onClick={handleBookNow}
//                   disabled={submitting || vehicleIsInMaintenance || !isAvailable || checkingAvailability || !selectedDate}
//                   className={`w-full mt-6 py-4 font-bold rounded-xl transition-all duration-300 ${
//                     !isAvailable || checkingAvailability || !selectedDate
//                       ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                       : vehicleIsInMaintenance
//                         ? "bg-gray-100 text-gray-700 cursor-not-allowed"
//                         : "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-2xl disabled:opacity-50"
//                   }`}
//                 >
//                   {checkingAvailability ? (
//                     <div className="flex items-center justify-center gap-2">
//                       <FaSpinner className="animate-spin" /> Checking Availability...
//                     </div>
//                   ) : !isAvailable && selectedDate ? (
//                     <div className="flex items-center justify-center gap-2">
//                       <FaTimesCircle /> Not Available for Selected Dates
//                     </div>
//                   ) : !selectedDate ? (
//                     <div className="flex items-center justify-center gap-2">
//                       <FaCalendarAlt /> Select Pickup Date First
//                     </div>
//                   ) : vehicleIsInMaintenance ? (
//                     <div className="flex items-center justify-center gap-2">
//                       🔧 Under Maintenance
//                     </div>
//                   ) : submitting ? (
//                     <div className="flex items-center justify-center gap-2">
//                       <FaSpinner className="animate-spin" /> Processing...
//                     </div>
//                   ) : (
//                     <div className="flex items-center justify-center gap-2">
//                       <FaCreditCard /> Continue to Document Upload
//                     </div>
//                   )}
//                 </button>

//                 {/* Add warning after button */}
//                 {!selectedDate && (
//                   <p className="text-xs text-amber-600 text-center mt-2">
//                     Please select pickup date to continue
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Enhanced Ratings & Reviews Section */}
//             <div className="bg-white rounded-2xl shadow-lg p-6 relative z-0">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-xl font-bold text-gray-900">
//                   Ratings & Reviews
//                 </h2>
//                 <button
//                   onClick={() => setShowChartModal(true)}
//                   className="p-2 text-gray-500 hover:text-blue-600 transition"
//                 >
//                   <FaChartBar />
//                 </button>
//               </div>

//               {/* Average Rating with Circular Progress */}
//               <div className="flex items-center gap-6 mb-6 p-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-100">
//                 <div className="flex-shrink-0">
//                   {totalReviews > 0 ? (
//                     <CircularRating
//                       rating={averageRating}
//                       size={90}
//                       strokeWidth={8}
//                     />
//                   ) : (
//                     <div className="w-[90px] h-[90px] rounded-full border-4 border-gray-200 flex flex-col items-center justify-center bg-white">
//                       <span className="text-2xl font-bold text-gray-300">
//                         N/A
//                       </span>
//                       <FaStar className="text-gray-300 text-xs mt-0.5" />
//                     </div>
//                   )}
//                 </div>
//                 <div className="flex-1 space-y-1.5">
//                   {ratingDistribution.map((item) => (
//                     <div key={item.stars} className="flex items-center gap-2">
//                       <span className="text-xs text-gray-600 w-4 font-medium">
//                         {item.stars}
//                       </span>
//                       <FaStar className="text-yellow-400 text-xs" />
//                       <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
//                         <div
//                           className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transition-all duration-500"
//                           style={{ width: `${item.percentage}%` }}
//                         />
//                       </div>
//                       <span className="text-xs text-gray-500 w-6 text-right font-medium">
//                         {item.count}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <p className="text-center text-sm text-gray-500 mb-4">
//                 {totalReviews > 0
//                   ? `Based on ${totalReviews} verified ${totalReviews === 1 ? "review" : "reviews"}`
//                   : "Be the first to review this vehicle"}
//               </p>

//               {/* Review CTA */}
//               {!hasBookedThisVehicle && !userReview && !showReviewForm && (
//                 <div className="mb-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-xl">
//                   <div className="flex items-start gap-3">
//                     <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
//                       <FaLock className="text-white text-sm" />
//                     </div>
//                     <div className="flex-1">
//                       <p className="text-sm font-semibold text-gray-800">
//                         Want to leave a review?
//                       </p>
//                       <p className="text-xs text-gray-600 mt-0.5">
//                         You must book and complete a rental to write a review.
//                         Reviews help build trust.
//                       </p>
//                       <button
//                         onClick={() => {
//                           if (!vehicleIsInMaintenance) {
//                             document
//                               .querySelector('input[type="date"]')
//                               ?.scrollIntoView({
//                                 behavior: "smooth",
//                                 block: "center",
//                               });
//                           } else {
//                             navigate("/rentridehome");
//                           }
//                         }}
//                         className="mt-2 px-4 py-1.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xs font-semibold rounded-lg transition shadow-sm"
//                       >
//                         {vehicleIsInMaintenance
//                           ? "Browse Available Vehicles"
//                           : "Book This Vehicle"}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Write Review Button */}
//               {hasBookedThisVehicle && !userReview && !showReviewForm && (
//                 <button
//                   onClick={() => {
//                     setEditingReview(false);
//                     setShowReviewForm(true);
//                   }}
//                   className="w-full py-3 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition flex items-center justify-center gap-2 shadow-md"
//                 >
//                   <FaEdit /> Write a Review
//                 </button>
//               )}

//               {/* User's Existing Review */}
//               {userReview && !showReviewForm && (
//                 <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl">
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-sm font-semibold text-blue-700 flex items-center gap-1">
//                       <FaCheckCircle className="text-blue-600" /> Your Review
//                     </span>
//                     <div className="flex gap-2">
//                       <button
//                         onClick={handleEditReview}
//                         className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg transition"
//                       >
//                         <FaEdit size={14} />
//                       </button>
//                       <button
//                         onClick={handleDeleteReview}
//                         disabled={deletingReview}
//                         className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition"
//                       >
//                         {deletingReview ? (
//                           <FaSpinner className="animate-spin" size={14} />
//                         ) : (
//                           <FaTrash size={14} />
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                   {renderStars(userReview.rating)}
//                   <p className="text-sm text-gray-700 mt-2">
//                     {userReview.comment}
//                   </p>
//                   <p className="text-xs text-gray-400 mt-1">
//                     {formatDate(userReview.createdAt)}
//                   </p>
//                 </div>
//               )}

//               {/* Review Form */}
//               {showReviewForm && (
//                 <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-xl">
//                   <h3 className="font-semibold text-gray-900 mb-3">
//                     {editingReview ? "Edit Your Review" : "Write a Review"}
//                   </h3>
//                   {renderStarInput()}
//                   <textarea
//                     value={newComment}
//                     onChange={(e) => setNewComment(e.target.value)}
//                     rows={3}
//                     className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
//                     placeholder="Share your experience with this vehicle..."
//                   />
//                   <div className="flex gap-2 mt-3">
//                     <button
//                       onClick={
//                         editingReview ? handleUpdateReview : handleSubmitReview
//                       }
//                       disabled={submittingReview}
//                       className="flex-1 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-semibold rounded-lg transition flex items-center justify-center gap-2"
//                     >
//                       {submittingReview ? (
//                         <FaSpinner className="animate-spin" />
//                       ) : (
//                         <FaCheck />
//                       )}
//                       {editingReview ? "Update Review" : "Submit Review"}
//                     </button>
//                     <button
//                       onClick={() => {
//                         setShowReviewForm(false);
//                         setEditingReview(false);
//                         setNewComment("");
//                         setNewRating(5);
//                       }}
//                       className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-semibold rounded-lg transition"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* Enhanced Reviews List */}
//               {reviewsLoading ? (
//                 <div className="flex justify-center py-8">
//                   <FaSpinner className="animate-spin text-blue-600 text-2xl" />
//                 </div>
//               ) : reviews.length === 0 ? (
//                 <div className="text-center py-8 text-gray-500">
//                   <FaRegCommentDots className="text-4xl mx-auto mb-2 text-gray-300" />
//                   <p className="font-medium">No reviews yet</p>
//                   <p className="text-sm mt-1">
//                     Be the first to review this vehicle!
//                   </p>
//                 </div>
//               ) : (
//                 <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
//                   {reviews.map((review) => (
//                     <div
//                       key={review._id}
//                       className="p-4 border border-gray-100 rounded-xl hover:shadow-md transition bg-white"
//                     >
//                       <div className="flex items-start justify-between mb-3">
//                         <div className="flex items-center gap-3">
//                           <div className="relative">
//                             {review.user?.profilePhoto ? (
//                               <img
//                                 src={`http://localhost:5000/uploads/profiles/${review.user.profilePhoto}`}
//                                 alt={review.user?.name}
//                                 className="w-11 h-11 rounded-full object-cover border-2 border-blue-100"
//                               />
//                             ) : (
//                               <div className="w-11 h-11 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold border-2 border-blue-100">
//                                 {review.user?.name?.charAt(0)?.toUpperCase() ||
//                                   "U"}
//                               </div>
//                             )}
//                             {/* Verified Renter Badge */}
//                             {review.verified && (
//                               <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-0.5">
//                                 <FaCheckCircle className="text-white text-xs" />
//                               </div>
//                             )}
//                           </div>
//                           <div>
//                             <p className="font-semibold text-gray-900 text-sm flex items-center gap-1">
//                               {review.user?.name || "Anonymous"}
//                               {review.verified && (
//                                 <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium">
//                                   Verified Renter
//                                 </span>
//                               )}
//                             </p>
//                             <p className="text-xs text-gray-400">
//                               {formatDate(review.createdAt)}
//                             </p>
//                           </div>
//                         </div>
//                         {renderStars(review.rating, "text-xs")}
//                       </div>
//                       <p className="text-sm text-gray-700 leading-relaxed mb-3">
//                         {review.comment}
//                       </p>

//                       {/* Review Photos (if available) */}
//                       {review.photos && review.photos.length > 0 && (
//                         <div className="flex gap-2 mb-3 overflow-x-auto">
//                           {review.photos.map((photo, idx) => (
//                             <div
//                               key={idx}
//                               className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition"
//                               onClick={() => {
//                                 setSelectedReviewImages(review.photos);
//                                 setShowImageModal(true);
//                               }}
//                             >
//                               <img
//                                 src={photo}
//                                 alt={`Review ${idx + 1}`}
//                                 className="w-full h-full object-cover"
//                               />
//                             </div>
//                           ))}
//                           {review.photos.length > 3 && (
//                             <div className="flex-shrink-0 w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 text-xs font-medium">
//                               +{review.photos.length - 3}
//                             </div>
//                           )}
//                         </div>
//                       )}

//                       <div className="flex items-center justify-between pt-2 border-t border-gray-100">
//                         <button
//                           onClick={(e) => handleToggleHelpful(review._id, e)}
//                           className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition ${
//                             review.hasLiked
//                               ? "bg-red-50 text-red-500 font-medium"
//                               : "bg-gray-100 text-gray-500 hover:bg-gray-200"
//                           }`}
//                         >
//                           {review.hasLiked ? (
//                             <FaHeart size={10} />
//                           ) : (
//                             <FaRegHeart size={10} />
//                           )}
//                           <span>Helpful ({review.helpful || 0})</span>
//                         </button>
//                         <button
//                           onClick={() => handleOpenReviewerChat(review.user)}
//                           className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-purple-50 text-purple-600 hover:bg-purple-100 rounded-full transition font-medium"
//                         >
//                           <FaRegCommentDots size={10} /> Chat
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Rating Chart Modal */}
//       {showChartModal && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
//           <div
//             className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//             onClick={() => setShowChartModal(false)}
//           />
//           <div className="relative bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-bold text-gray-900">
//                 Rating Distribution
//               </h3>
//               <button
//                 onClick={() => setShowChartModal(false)}
//                 className="p-2 hover:bg-gray-100 rounded-full transition"
//               >
//                 <FaTimes />
//               </button>
//             </div>
//             <div className="flex items-center gap-6 mb-6">
//               <CircularRating
//                 rating={averageRating}
//                 size={100}
//                 strokeWidth={10}
//               />
//               <div className="flex-1 space-y-2">
//                 {ratingDistribution.map((item) => (
//                   <div key={item.stars} className="flex items-center gap-2">
//                     <span className="text-sm text-gray-600 w-4">
//                       {item.stars}
//                     </span>
//                     <FaStar className="text-yellow-400 text-xs" />
//                     <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
//                       <div
//                         className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
//                         style={{ width: `${item.percentage}%` }}
//                       />
//                     </div>
//                     <span className="text-sm text-gray-500 w-6 text-right">
//                       {item.count}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <p className="text-center text-sm text-gray-500">
//               {totalReviews} total reviews
//             </p>
//           </div>
//         </div>
//       )}

//       {/* Image Modal for Review Photos */}
//       {showImageModal && (
//         <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
//           <div
//             className="absolute inset-0 bg-black/80 backdrop-blur-sm"
//             onClick={() => setShowImageModal(false)}
//           />
//           <div className="relative bg-white rounded-2xl p-4 w-full max-w-2xl shadow-2xl">
//             <button
//               onClick={() => setShowImageModal(false)}
//               className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition z-10"
//             >
//               <FaTimes />
//             </button>
//             <div className="grid grid-cols-2 gap-4 mt-8">
//               {selectedReviewImages.map((img, idx) => (
//                 <div key={idx} className="rounded-lg overflow-hidden">
//                   <img
//                     src={img}
//                     alt={`Review ${idx + 1}`}
//                     className="w-full h-auto object-cover"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Chat Modal */}
//       {showChatModal && (
//         <div className="fixed inset-0 z-[100] p-4">
//           <div
//             className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//             onClick={() => setShowChatModal(false)}
//           />
//           <div className="absolute inset-0 flex items-center justify-center p-4">
//             <div className="bg-white rounded-2xl w-full max-w-md h-[550px] flex flex-col shadow-2xl overflow-hidden">
//               <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white">
//                 <div className="flex items-center gap-3">
//                   <button
//                     onClick={() => setShowChatModal(false)}
//                     className="text-white hover:bg-white/20 rounded-full p-1 transition"
//                   >
//                     <FaArrowLeft />
//                   </button>
//                   <div className="flex items-center gap-3">
//                     {chatPartnerInfo?.image ? (
//                       <img
//                         src={chatPartnerInfo.image}
//                         alt={chatPartnerInfo.name}
//                         className="w-10 h-10 rounded-full object-cover border-2 border-white"
//                       />
//                     ) : (
//                       <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
//                         <FaUserCircle className="text-2xl" />
//                       </div>
//                     )}
//                     <div>
//                       <h3 className="font-semibold">
//                         {chatPartnerInfo?.name || "Loading..."}
//                       </h3>
//                       <p className="text-xs text-white/80">
//                         {chatPartnerInfo?.role === "owner"
//                           ? "Vehicle Owner"
//                           : chatPartnerInfo?.role === "admin"
//                             ? "Support Team"
//                             : chatPartnerInfo?.role === "reviewer"
//                               ? "Customer"
//                               : "Online"}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => setShowChatModal(false)}
//                   className="p-2 hover:bg-white/20 rounded-full transition"
//                 >
//                   <FaTimes />
//                 </button>
//               </div>

//               <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
//                 {chatLoading ? (
//                   <div className="flex justify-center py-8">
//                     <FaSpinner className="animate-spin text-blue-600 text-2xl" />
//                   </div>
//                 ) : chatMessages.length === 0 ? (
//                   <div className="flex flex-col items-center justify-center h-full text-center">
//                     <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-3">
//                       <FaRegCommentDots className="text-gray-400 text-2xl" />
//                     </div>
//                     <p className="text-gray-500">No messages yet</p>
//                     <p className="text-gray-400 text-sm mt-1">
//                       Start a conversation about {vehicleDetails?.carName}
//                     </p>
//                   </div>
//                 ) : (
//                   chatMessages.map((msg, idx) => (
//                     <div
//                       key={msg._id || idx}
//                       className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
//                     >
//                       {!msg.isOwn && (
//                         <div className="flex-shrink-0 mr-2">
//                           {chatPartnerInfo?.image ? (
//                             <img
//                               src={chatPartnerInfo.image}
//                               alt=""
//                               className="w-8 h-8 rounded-full object-cover"
//                             />
//                           ) : (
//                             <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
//                               {chatPartnerInfo?.name?.charAt(0).toUpperCase() ||
//                                 "U"}
//                             </div>
//                           )}
//                         </div>
//                       )}
//                       <div
//                         className={`max-w-[70%] rounded-2xl px-4 py-2 ${
//                           msg.isOwn
//                             ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-sm"
//                             : "bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-sm"
//                         }`}
//                       >
//                         <p className="text-sm break-words">{msg.message}</p>
//                         <div
//                           className={`text-xs mt-1 flex items-center gap-1 ${msg.isOwn ? "text-blue-100" : "text-gray-400"}`}
//                         >
//                           <span>{formatChatTime(msg.createdAt)}</span>
//                           {msg.sending && (
//                             <FaSpinner className="animate-spin text-xs" />
//                           )}
//                           {msg.delivered && !msg.sending && (
//                             <FaCheck className="text-xs" />
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 )}
//                 <div ref={messagesEndRef} />
//               </div>

//               <div className="p-4 border-t bg-white">
//                 <div className="flex items-center gap-2">
//                   <button className="p-2 text-gray-500 hover:text-blue-600 transition rounded-full">
//                     <FaImage size={20} />
//                   </button>
//                   <input
//                     type="text"
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     onKeyPress={(e) =>
//                       e.key === "Enter" && handleSendChatMessage()
//                     }
//                     placeholder="Type a message..."
//                     className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//                   />
//                   <button
//                     onClick={handleSendChatMessage}
//                     disabled={sendingMessage || !newMessage.trim()}
//                     className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg transition disabled:opacity-50"
//                   >
//                     {sendingMessage ? (
//                       <FaSpinner className="animate-spin" size={20} />
//                     ) : (
//                       <FaPaperPlane size={20} />
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white mt-12 pt-8 pb-6">
//         <div className="container mx-auto px-6">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <div className="flex items-center gap-3 mb-4 md:mb-0">
//               <div className="p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
//                 <FaCar className="text-white text-xl" />
//               </div>
//               <div>
//                 <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                   Rent<span className="text-white">Ride</span>
//                 </h3>
//                 <p className="text-xs text-gray-400 -mt-1">
//                   Premium Car Rentals
//                 </p>
//               </div>
//             </div>
//             <div className="text-gray-400 text-sm">
//               &copy; {new Date().getFullYear()} RentRide. All rights reserved.
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Booking;


import React, { useState, useEffect, useRef } from "react";
import {
  FaCar,
  FaStar,
  FaHeart,
  FaRegHeart,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUser,
  FaPhone,
  FaCreditCard,
  FaShieldAlt,
  FaArrowLeft,
  FaSpinner,
  FaTrash,
  FaEdit,
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
  FaUserCircle,
  FaChartBar,
  FaComments,
  FaPaperPlane,
  FaImage,
  FaArrowRight,
  FaCheck,
  FaRegCommentDots,
  FaTimes,
  FaLock,
  FaCamera,
} from "react-icons/fa";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Custom Country Code Selector Component
const CountryCodeSelector = ({ value, onChange, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const countries = [
    { code: "+977", flag: "🇳🇵", name: "Nepal", short: "NP" },
    { code: "+1", flag: "🇺🇸", name: "USA", short: "US" },
    { code: "+44", flag: "🇬🇧", name: "UK", short: "GB" },
    { code: "+91", flag: "🇮🇳", name: "India", short: "IN" },
    { code: "+86", flag: "🇨🇳", name: "China", short: "CN" },
    { code: "+81", flag: "🇯🇵", name: "Japan", short: "JP" },
    { code: "+82", flag: "🇰🇷", name: "S.Korea", short: "KR" },
    { code: "+61", flag: "🇦🇺", name: "Australia", short: "AU" },
    { code: "+49", flag: "🇩🇪", name: "Germany", short: "DE" },
    { code: "+33", flag: "🇫🇷", name: "France", short: "FR" },
    { code: "+39", flag: "🇮🇹", name: "Italy", short: "IT" },
    { code: "+34", flag: "🇪🇸", name: "Spain", short: "ES" },
    { code: "+7", flag: "🇷🇺", name: "Russia", short: "RU" },
    { code: "+55", flag: "🇧🇷", name: "Brazil", short: "BR" },
    { code: "+27", flag: "🇿🇦", name: "S.Africa", short: "ZA" },
    { code: "+971", flag: "🇦🇪", name: "UAE", short: "AE" },
    { code: "+65", flag: "🇸🇬", name: "Singapore", short: "SG" },
    { code: "+60", flag: "🇲🇾", name: "Malaysia", short: "MY" },
    { code: "+66", flag: "🇹🇭", name: "Thailand", short: "TH" },
    { code: "+84", flag: "🇻🇳", name: "Vietnam", short: "VN" },
  ];

  const selectedCountry =
    countries.find((c) => c.code === value) || countries[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (code) => {
    onChange(code);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm flex items-center justify-between hover:bg-gray-100 transition"
      >
        <span className="flex items-center gap-2">
          <img
            src={`https://flagcdn.com/w20/${selectedCountry.short.toLowerCase()}.png`}
            alt={selectedCountry.name}
            className="w-5 h-4 object-cover rounded-sm"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "inline";
            }}
          />
          <span className="hidden text-lg">{selectedCountry.flag}</span>
          <span className="font-medium">{selectedCountry.code}</span>
        </span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
          {countries.map((country) => (
            <button
              key={country.code}
              type="button"
              onClick={() => handleSelect(country.code)}
              className={`w-full px-3 py-2.5 text-left hover:bg-blue-50 transition flex items-center gap-2 ${
                value === country.code ? "bg-blue-50 font-medium" : ""
              }`}
            >
              <img
                src={`https://flagcdn.com/w20/${country.short.toLowerCase()}.png`}
                alt={country.name}
                className="w-5 h-4 object-cover rounded-sm"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "inline";
                }}
              />
              <span className="hidden text-lg">{country.flag}</span>
              <span className="text-sm flex-1">{country.code}</span>
              <span className="text-xs text-gray-500">{country.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const API_URL = "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

// ── Circular Progress Rating Component ────────────────────────────────────────
const CircularRating = ({ rating, size = 80, strokeWidth = 6 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = (rating / 5) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-gray-900">
          {rating.toFixed(1)}
        </span>
        <FaStar className="text-yellow-400 text-xs mt-0.5" />
      </div>
    </div>
  );
};

// ── Status helpers ────────────────────────────────────────────────────────────
const getHoldTimeRemaining = (holdExpiresAt) => {
  if (!holdExpiresAt) return null;
  const diff = new Date(holdExpiresAt) - new Date();
  if (diff <= 0) return "Available soon";
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
};

const getVehicleDisplayStatus = (vehicle) => {
  if (!vehicle) return null;
  const status = vehicle.status;
  if (status === "Maintenance") return { type: "maintenance", label: "In Maintenance", color: "gray" };
  if (status === "On Hold") return { type: "processing", label: "Processing", color: "amber" };
  if (status === "Available") return { type: "available", label: "Available", color: "green" };
  return { type: "unknown", label: status || "Unknown", color: "gray" };
};

const chatService = {
  getVehicleChat: async (vehicleId, vehicleType) => {
    const response = await axiosInstance.post("/chats/vehicle", {
      vehicleId,
      vehicleType,
    });
    return response.data;
  },
  getChat: async (chatId) => {
    const response = await axiosInstance.get(`/chats/${chatId}`);
    return response.data;
  },
  markAsRead: async (chatId) => {
    const response = await axiosInstance.put(`/chats/${chatId}/read`);
    return response.data;
  },
  sendMessage: async (chatId, message) => {
    const response = await axiosInstance.post(`/chats/${chatId}/message`, {
      message,
    });
    return response.data;
  },
};

// ── Country code helper ────────────────────────────────────────────────────
const getCountryFlag = (countryCode) => {
  const flags = {
    "+977": "🇳🇵",
    "+1": "🇺🇸",
    "+44": "🇬🇧",
    "+91": "🇮🇳",
    "+86": "🇨🇳",
    "+81": "🇯🇵",
    "+82": "🇰🇷",
    "+61": "🇦🇺",
    "+49": "🇩🇪",
    "+33": "🇫🇷",
    "+39": "🇮🇹",
    "+34": "🇪🇸",
    "+7": "🇷🇺",
    "+55": "🇧🇷",
    "+27": "🇿🇦",
    "+971": "🇦🇪",
    "+65": "🇸🇬",
    "+60": "🇲🇾",
    "+66": "🇹🇭",
    "+84": "🇻🇳",
  };
  return flags[countryCode] || "🌐";
};

// ── Confirm Dialog Component ──────────────────────────────────────────────────
const ConfirmDialog = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  confirmColor = "red",
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 z-10">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 border-2 border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-2.5 text-white font-semibold rounded-xl transition ${
              confirmColor === "red"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { vehicleId } = useParams();

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [pickupLocation, setPickupLocation] = useState("Kathmandu, Nepal");
  const [dropoffLocation, setDropoffLocation] = useState("Kathmandu, Nepal");
  const [bookingDays, setBookingDays] = useState(1);
  const [driverOption, setDriverOption] = useState("without");
  const [insuranceOption, setInsuranceOption] = useState("basic");
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [specialRequests, setSpecialRequests] = useState("");
  const [emergencyContact, setEmergencyContact] = useState({
    name: "",
    phone: "",
    countryCode: "+977",
    relationship: "",
  });
  const [userPhoneNumber, setUserPhoneNumber] = useState("");

  // Confirm dialog state
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: null,
  });

  // Review states
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [userReview, setUserReview] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);
  const [deletingReview, setDeletingReview] = useState(false);
  const [editingReview, setEditingReview] = useState(false);
  const [hasBookedThisVehicle, setHasBookedThisVehicle] = useState(false);
  const [ratingDistribution, setRatingDistribution] = useState([
    { stars: 5, percentage: 0, count: 0 },
    { stars: 4, percentage: 0, count: 0 },
    { stars: 3, percentage: 0, count: 0 },
    { stars: 2, percentage: 0, count: 0 },
    { stars: 1, percentage: 0, count: 0 },
  ]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [showChartModal, setShowChartModal] = useState(false);
  const [likedReviews, setLikedReviews] = useState(new Set());
  const [selectedReviewImages, setSelectedReviewImages] = useState([]);
  const [showImageModal, setShowImageModal] = useState(false);

  // Chat states
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const [activeChatId, setActiveChatId] = useState(null);
  const [chatPartnerInfo, setChatPartnerInfo] = useState(null);
  const messagesEndRef = useRef(null);

  // Availability check states
  const [isAvailable, setIsAvailable] = useState(true);
  const [availabilityMessage, setAvailabilityMessage] = useState("");
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [conflictingDates, setConflictingDates] = useState([]);
  const [nextAvailableDate, setNextAvailableDate] = useState(null);

  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  // ── TIME VALIDATION FUNCTIONS ───────────────────────────────────────────────
  // Check if selected pickup time is valid (not in the past for today)
  const isPickupTimeValid = () => {
    if (!selectedDate || !selectedTime) return true;
    
    const today = new Date();
    const pickupDateObj = new Date(selectedDate);
    
    // Compare dates (ignore time)
    const isToday = pickupDateObj.toDateString() === today.toDateString();
    
    // If pickup date is in the future, any time is valid
    if (pickupDateObj > today && !isToday) return true;
    
    // If pickup date is today, check if selected time is after current time
    if (isToday) {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const [selectedHour, selectedMinute] = selectedTime.split(':').map(Number);
      
      // Allow if selected time is strictly greater than current time
      if (selectedHour > currentHour || 
          (selectedHour === currentHour && selectedMinute > currentMinute)) {
        return true;
      }
      return false;
    }
    
    return true;
  };

  // Get available time slots (filter out past times for today)
  const getAvailableTimeSlots = () => {
    if (!selectedDate) return timeSlots;
    
    const today = new Date();
    const pickupDateObj = new Date(selectedDate);
    const isToday = pickupDateObj.toDateString() === today.toDateString();
    
    // If pickup date is not today, return all slots
    if (!isToday) {
      return timeSlots;
    }
    
    // Filter out past times for today
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    const availableSlots = timeSlots.filter(time => {
      const [hour, minute] = time.split(':').map(Number);
      return hour > currentHour || (hour === currentHour && minute > currentMinute);
    });
    
    return availableSlots;
  };

  // Get available times message for display
  const getAvailableTimesMessage = () => {
    if (!selectedDate) return "";
    const isToday = new Date(selectedDate).toDateString() === new Date().toDateString();
    if (!isToday) return "";
    
    const availableSlots = getAvailableTimeSlots();
    if (availableSlots.length === 0) {
      return "No time slots available for today";
    }
    return `Available times: ${availableSlots.join(', ')}`;
  };
  // ── END TIME VALIDATION FUNCTIONS ───────────────────────────────────────────

  const showConfirm = (title, message, onConfirm) => {
    setConfirmDialog({ isOpen: true, title, message, onConfirm });
  };

  const closeConfirm = () => {
    setConfirmDialog({
      isOpen: false,
      title: "",
      message: "",
      onConfirm: null,
    });
  };

  useEffect(() => {
    const storedLikes = localStorage.getItem("likedReviews");
    if (storedLikes) setLikedReviews(new Set(JSON.parse(storedLikes)));
  }, []);

  useEffect(() => {
    if (messagesEndRef.current)
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const getAvailableDriverOptions = () => {
    if (!vehicleDetails) return { withDriver: false, withoutDriver: false };
    const bookingType = vehicleDetails.bookingType || "";
    if (bookingType.toLowerCase() === "both")
      return { withDriver: true, withoutDriver: true };
    if (bookingType.toLowerCase().includes("with driver"))
      return { withDriver: true, withoutDriver: false };
    if (bookingType.toLowerCase().includes("without driver"))
      return { withDriver: false, withoutDriver: true };
    return { withDriver: true, withoutDriver: true };
  };

  const availableOptions = getAvailableDriverOptions();

  useEffect(() => {
    if (!availableOptions.withDriver && availableOptions.withoutDriver)
      setDriverOption("without");
    else if (availableOptions.withDriver && !availableOptions.withoutDriver)
      setDriverOption("with");
  }, [vehicleDetails]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        if (location.state?.vehicle) {
          setVehicleDetails(location.state.vehicle);
          if (
            location.state.vehicle.source === "user" &&
            location.state.vehicle.userId
          ) {
            await fetchOwnerDetails(location.state.vehicle.userId);
          }
        } else if (vehicleId) {
          let vehicleData = null;
          try {
            const adminResponse = await axios.get(
              `http://localhost:5000/api/vehicles/${vehicleId}`,
              { timeout: 10000 },
            );
            vehicleData = adminResponse.data;
          } catch {
            try {
              const userResponse = await axios.get(
                `http://localhost:5000/api/user-vehicles/public/${vehicleId}`,
                { timeout: 10000 },
              );
              if (userResponse.data.success && userResponse.data.data) {
                const uv = userResponse.data.data;
                vehicleData = {
                  _id: uv._id,
                  carName: uv.carName,
                  carNumber: uv.carNumber,
                  carType: uv.carType,
                  ratePerDay: uv.ratePerDay,
                  seats: uv.seats,
                  bookingType: uv.bookingType,
                  gearType: uv.gearType,
                  airCondition: uv.airCondition,
                  description: uv.description,
                  features: uv.features,
                  photos: uv.photos,
                  phoneNumber: uv.phoneNumber,
                  driverName: uv.driverName,
                  status: uv.status || "Available",
                  holdExpiresAt: uv.holdExpiresAt || null,
                  source: "user",
                  owner: uv.fullName,
                  ownerPhone: uv.phoneNumber,
                  userId: uv.userId || uv.user,
                };
                if (vehicleData.userId)
                  await fetchOwnerDetails(vehicleData.userId);
              }
            } catch {
              console.error("Vehicle not found");
            }
          }
          if (vehicleData) setVehicleDetails(vehicleData);
          else setError("Vehicle not found");
        } else {
          setError("No vehicle selected");
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to load vehicle details");
        setLoading(false);
      }
    };
    fetchData();
  }, [location, vehicleId]);

  const fetchOwnerDetails = async (userId) => {
    try {
      await axiosInstance.get(`/profile/user/${userId}`);
    } catch (err) {
      console.error("Error fetching owner details:", err);
    }
  };

  useEffect(() => {
    if (vehicleDetails?._id) {
      fetchReviews();
      checkUserBookingStatus();
    }
  }, [vehicleDetails]);

  // Add useEffect to check availability when dates change
  useEffect(() => {
    if (selectedDate && vehicleDetails) {
      const timeoutId = setTimeout(() => {
        checkAvailability();
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [selectedDate, bookingDays, vehicleDetails]);

  // Auto-select first available time when date changes
  useEffect(() => {
    if (selectedDate) {
      const availableSlots = getAvailableTimeSlots();
      
      if (availableSlots.length > 0) {
        // Always set to first available time when date changes
        if (!selectedTime || !availableSlots.includes(selectedTime)) {
          setSelectedTime(availableSlots[0]);
        }
      } else {
        // No available slots today
        setSelectedTime("");
        // Show warning for today
        if (new Date(selectedDate).toDateString() === new Date().toDateString()) {
          toast.warning("No available time slots for today. Please select a future date.");
        }
      }
    }
  }, [selectedDate]);

  const fetchReviews = async () => {
    try {
      setReviewsLoading(true);
      const response = await axios.get(
        `${API_URL}/reviews/vehicle/${vehicleDetails._id}`,
      );
      if (response.data.success) {
        setReviews(response.data.data.reviews);
        updateRatingDistribution(response.data.data.reviews);
        setAverageRating(response.data.data.averageRating || 0);
        setTotalReviews(response.data.data.totalReviews || 0);
        const likedIds = response.data.data.reviews
          .filter((r) => r.hasLiked)
          .map((r) => r._id);
        setLikedReviews(new Set(likedIds));
        localStorage.setItem("likedReviews", JSON.stringify(likedIds));
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
    } finally {
      setReviewsLoading(false);
    }
  };

  const updateRatingDistribution = (reviewsList) => {
    const distribution = [
      { stars: 5, percentage: 0, count: 0 },
      { stars: 4, percentage: 0, count: 0 },
      { stars: 3, percentage: 0, count: 0 },
      { stars: 2, percentage: 0, count: 0 },
      { stars: 1, percentage: 0, count: 0 },
    ];
    reviewsList.forEach((review) => {
      const idx = 5 - review.rating;
      if (idx >= 0 && idx < 5) distribution[idx].count++;
    });
    const total = reviewsList.length;
    distribution.forEach((item) => {
      item.percentage = total > 0 ? (item.count / total) * 100 : 0;
    });
    setRatingDistribution(distribution);
  };

  const checkUserBookingStatus = async () => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        setHasBookedThisVehicle(false);
        return;
      }
      const response = await axiosInstance.get(
        `/bookings/user/vehicle/${vehicleDetails._id}/status`,
      );
      if (response.data.success) {
        setHasBookedThisVehicle(response.data.data.hasBooked);
        if (response.data.data.hasBooked) {
          const reviewResponse = await axiosInstance.get(
            `/reviews/user/vehicle/${vehicleDetails._id}`,
          );
          if (reviewResponse.data.success && reviewResponse.data.data)
            setUserReview(reviewResponse.data.data);
        }
      }
    } catch {
      setHasBookedThisVehicle(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!newComment.trim()) {
      toast.error("Please enter a review comment");
      return;
    }
    setSubmittingReview(true);
    try {
      const response = await axiosInstance.post("/reviews", {
        vehicleId: vehicleDetails._id,
        rating: newRating,
        comment: newComment,
      });
      if (response.data.success) {
        toast.success("Review submitted successfully!");
        setShowReviewForm(false);
        setNewComment("");
        setNewRating(5);
        fetchReviews();
        checkUserBookingStatus();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleUpdateReview = async () => {
    if (!newComment.trim()) {
      toast.error("Please enter a review comment");
      return;
    }
    setSubmittingReview(true);
    try {
      const response = await axiosInstance.put(`/reviews/${userReview._id}`, {
        rating: newRating,
        comment: newComment,
      });
      if (response.data.success) {
        toast.success("Review updated successfully!");
        setEditingReview(false);
        setShowReviewForm(false);
        setNewComment("");
        setNewRating(5);
        fetchReviews();
        checkUserBookingStatus();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update review");
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleDeleteReview = () => {
    showConfirm(
      "Delete Review",
      "Are you sure you want to delete your review? This cannot be undone.",
      async () => {
        closeConfirm();
        setDeletingReview(true);
        try {
          const response = await axiosInstance.delete(
            `/reviews/${userReview._id}`,
          );
          if (response.data.success) {
            toast.success("Review deleted successfully!");
            setUserReview(null);
            setShowReviewForm(false);
            setEditingReview(false);
            setNewComment("");
            setNewRating(5);
            await fetchReviews();
            await checkUserBookingStatus();
          }
        } catch (err) {
          toast.error(err.response?.data?.message || "Failed to delete review");
        } finally {
          setDeletingReview(false);
        }
      },
    );
  };

  const handleEditReview = () => {
    setNewRating(userReview.rating);
    setNewComment(userReview.comment);
    setEditingReview(true);
    setShowReviewForm(true);
  };

  const handleToggleHelpful = async (reviewId, e) => {
    e.stopPropagation();
    const review = reviews.find((r) => r._id === reviewId);
    const wasLiked = review?.hasLiked || false;
    setReviews((prev) =>
      prev.map((r) =>
        r._id === reviewId
          ? {
              ...r,
              hasLiked: !wasLiked,
              helpful: wasLiked ? r.helpful - 1 : r.helpful + 1,
            }
          : r,
      ),
    );
    const newLiked = new Set(likedReviews);
    wasLiked ? newLiked.delete(reviewId) : newLiked.add(reviewId);
    setLikedReviews(newLiked);
    localStorage.setItem("likedReviews", JSON.stringify([...newLiked]));
    try {
      const response = await axiosInstance.post(`/reviews/${reviewId}/helpful`);
      if (response.data.success) {
        setReviews((prev) =>
          prev.map((r) =>
            r._id === reviewId
              ? {
                  ...r,
                  hasLiked: response.data.isLiked,
                  helpful: response.data.helpful,
                }
              : r,
          ),
        );
      }
    } catch {}
  };

  const getChatPartnerFromChat = async (chatId) => {
    try {
      const response = await chatService.getChat(chatId);
      if (response.success) {
        const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
        const other = response.data.participants.find(
          (p) => p._id !== currentUser.id,
        );
        if (other) {
          let role = "user",
            displayName = other.name,
            image = null;
          if (response.data.chatType === "vehicle") {
            if (other.role === "admin") {
              role = "admin";
              displayName = "Support Team";
              image = `https://ui-avatars.com/api/?background=6B21A5&color=fff&rounded=true&size=128&name=Support`;
            } else if (vehicleDetails?.source === "user") {
              role = "owner";
              displayName =
                other.name || vehicleDetails.owner || "Vehicle Owner";
              image = other.profilePhoto
                ? `http://localhost:5000/uploads/profiles/${other.profilePhoto}`
                : `https://ui-avatars.com/api/?background=16A34A&color=fff&rounded=true&size=128&name=${displayName.charAt(0)}`;
            } else {
              role = "support";
              displayName = "Support Team";
              image = `https://ui-avatars.com/api/?background=6B21A5&color=fff&rounded=true&size=128&name=Support`;
            }
          }
          setChatPartnerInfo({ name: displayName, image, role, id: other._id });
        }
      }
    } catch (err) {
      console.error("Error getting chat partner:", err);
    }
  };

  const loadChatMessages = async (chatId) => {
    try {
      const response = await chatService.getChat(chatId);
      if (response.success) {
        const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
        const currentUserId = (currentUser._id || currentUser.id)?.toString();
        const formatted = (response.data.messages || []).map((msg, index) => ({
          _id: msg._id || index,
          message: msg.message,
          createdAt: msg.createdAt,
          isOwn:
            (msg.sender?._id || msg.sender?.id || msg.sender)?.toString() ===
            currentUserId,
          sender: msg.sender,
          read: msg.read,
          delivered: msg.delivered,
        }));
        setChatMessages(formatted);
        await chatService.markAsRead(chatId);
      }
    } catch (err) {
      console.error("Error loading chat messages:", err);
    }
  };

  const handleSendChatMessage = async () => {
    if (!newMessage.trim() || sendingMessage || !activeChatId) return;
    const messageText = newMessage.trim();
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    setSendingMessage(true);
    const tempMessage = {
      _id: `temp-${Date.now()}`,
      message: messageText,
      createdAt: new Date(),
      isOwn: true,
      sending: true,
      sender: {
        _id: currentUser._id || currentUser.id,
        name: currentUser.name,
      },
    };
    setChatMessages((prev) => [...prev, tempMessage]);
    setNewMessage("");
    setTimeout(
      () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
      100,
    );
    try {
      const response = await chatService.sendMessage(activeChatId, messageText);
      if (response.success) {
        setChatMessages((prev) =>
          prev.map((msg) =>
            msg._id === tempMessage._id ? response.data : msg,
          ),
        );
      } else {
        setChatMessages((prev) =>
          prev.filter((msg) => msg._id !== tempMessage._id),
        );
        toast.error("Failed to send message");
      }
    } catch {
      setChatMessages((prev) =>
        prev.filter((msg) => msg._id !== tempMessage._id),
      );
      toast.error("Failed to send message");
    } finally {
      setSendingMessage(false);
    }
  };

  const handleChatWithOwner = async () => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      toast.error("Please login to chat");
      navigate("/login");
      return;
    }
    setChatLoading(true);
    try {
      const vehicleSource = vehicleDetails.source === "user" ? "user" : "admin";
      const response = await chatService.getVehicleChat(
        vehicleDetails._id,
        vehicleSource,
      );
      if (response.success) {
        setActiveChatId(response.data._id);
        await loadChatMessages(response.data._id);
        await getChatPartnerFromChat(response.data._id);
        setShowChatModal(true);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to start chat");
    } finally {
      setChatLoading(false);
    }
  };

  const handleOpenReviewerChat = async (reviewer) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      toast.error("Please login to chat");
      navigate("/login");
      return;
    }
    setChatLoading(true);
    setChatPartnerInfo({
      name: reviewer.name,
      image: reviewer.profilePhoto
        ? `http://localhost:5000/uploads/profiles/${reviewer.profilePhoto}`
        : `https://ui-avatars.com/api/?background=3B82F6&color=fff&rounded=true&size=128&name=${reviewer.name?.charAt(0) || "U"}`,
      role: "reviewer",
      id: reviewer._id,
    });
    setShowChatModal(true);
    try {
      const response = await axiosInstance.post("/chats/direct", {
        recipientId: reviewer._id,
      });
      if (response.data.success) {
        setActiveChatId(response.data.data._id);
        await loadChatMessages(response.data.data._id);
      }
    } catch (err) {
      console.error("Error opening reviewer chat:", err);
      toast.error("Failed to start chat");
      setShowChatModal(false);
    } finally {
      setChatLoading(false);
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const formatChatTime = (date) =>
    new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  const renderStars = (rating, size = "text-sm") => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          className={`${size} ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
          fill={star <= rating ? "currentColor" : "none"}
        />
      ))}
    </div>
  );

  const renderStarInput = () => (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-gray-700 font-medium">Your Rating:</span>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setNewRating(star)}
            className="focus:outline-none transition-transform hover:scale-110"
          >
            <FaStar
              className={`text-2xl ${star <= newRating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
            />
          </button>
        ))}
      </div>
    </div>
  );

  const calculateTotal = () => {
    if (!vehicleDetails)
      return {
        basePrice: 0,
        driverFee: 0,
        insuranceFee: 0,
        serviceFee: 500,
        total: 0,
      };
    const basePrice = (vehicleDetails.ratePerDay || 5000) * bookingDays;
    const driverFee = driverOption === "with" ? 500 * bookingDays : 0;
    const insuranceFee = insuranceOption === "premium" ? 1500 * bookingDays : 0;
    const serviceFee = 500;
    return {
      basePrice,
      driverFee,
      insuranceFee,
      serviceFee,
      total: basePrice + driverFee + insuranceFee + serviceFee,
    };
  };

  const totals = calculateTotal();
  const formatNPR = (amount) => "रु " + amount.toLocaleString("en-NP");

  const calculateReturnDate = () => {
    if (!selectedDate) return "";
    const returnDate = new Date(selectedDate);
    returnDate.setDate(returnDate.getDate() + bookingDays);
    return returnDate.toISOString().split("T")[0];
  };

  const displayStatus = getVehicleDisplayStatus(vehicleDetails);
  const vehicleIsInMaintenance = displayStatus?.type === "maintenance";

  // Add availability check function with time validation
  const checkAvailability = async () => {
    if (!selectedDate || !calculateReturnDate() || !vehicleDetails?._id) {
      return;
    }

    // For today's date, just check if we have ANY available time slots
    const isToday = new Date(selectedDate).toDateString() === new Date().toDateString();
    if (isToday && getAvailableTimeSlots().length === 0) {
      setIsAvailable(false);
      setAvailabilityMessage("No available time slots for today. Please select a future date.");
      return;
    }

    // If time is selected but invalid for today, show message but don't block availability check completely
    if (isToday && selectedTime && !isPickupTimeValid()) {
      setAvailabilityMessage("⚠️ Selected time is in the past. Please choose a later time.");
    }

    setCheckingAvailability(true);
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await axios.post(
        `${API_URL}/bookings/check-availability`,
        {
          vehicleId: vehicleDetails._id,
          pickupDate: selectedDate,
          returnDate: calculateReturnDate(),
        },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      if (response.data.success) {
        setIsAvailable(response.data.available);
        setAvailabilityMessage(response.data.message);
        setNextAvailableDate(response.data.nextAvailableDate);
        setConflictingDates(response.data.overlappingBookings || []);
        
        if (!response.data.available) {
          toast.warning(response.data.message);
        } else if (isToday && selectedTime && !isPickupTimeValid()) {
          toast.warning("Please select a pickup time after the current time.");
        }
      }
    } catch (error) {
      console.error("Availability check failed:", error);
      setIsAvailable(false);
      setAvailabilityMessage("Unable to check availability. Please try again.");
    } finally {
      setCheckingAvailability(false);
    }
  };

  const handleBookNow = async () => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      toast.error("Please login to book a vehicle");
      navigate("/login");
      return;
    }
    if (!vehicleDetails) {
      toast.error("Please select a vehicle first");
      return;
    }
    if (!isAvailable) {
      toast.error(availabilityMessage || "This vehicle is not available for the selected dates. Please choose different dates.");
      return;
    }
    if (vehicleIsInMaintenance) {
      toast.error("This vehicle is currently under maintenance and cannot be booked.");
      return;
    }
    if (!selectedDate) {
      toast.error("Please select a pickup date");
      return;
    }
    
    // Check if there are any available time slots for today
    const isToday = new Date(selectedDate).toDateString() === new Date().toDateString();
    const availableSlots = getAvailableTimeSlots();
    
    if (isToday && availableSlots.length === 0) {
      toast.error("No available time slots for today. Please select a future date.");
      return;
    }
    
    // Check if selected time is valid for same-day booking
    if (isToday && (!selectedTime || !isPickupTimeValid())) {
      toast.error(`For same-day pickup, please select a time after current time. Available times: ${availableSlots.join(', ')}`);
      return;
    }
    
    if (!selectedTime) {
      toast.error("Please select a pickup time");
      return;
    }
    
    if (!userPhoneNumber || userPhoneNumber.length !== 10) {
      toast.error("Please enter a valid 10-digit Nepali phone number");
      return;
    }
    if (!emergencyContact.name || !emergencyContact.phone) {
      toast.error("Please provide emergency contact information");
      return;
    }

    setSubmitting(true);
    try {
      const returnDate = calculateReturnDate();
      const bookingData = {
        vehicleId: vehicleDetails._id,
        pickupDate: new Date(selectedDate).toISOString(),
        pickupTime: selectedTime,
        returnDate: new Date(returnDate).toISOString(),
        returnTime: selectedTime,
        pickupLocation,
        dropoffLocation,
        driverOption,
        insuranceOption,
        specialRequests,
        userContact: {
          countryCode: "+977",
          phone: userPhoneNumber,
          fullPhone: `+977${userPhoneNumber}`,
        },
        emergencyContact: {
          ...emergencyContact,
          fullPhone: `${emergencyContact.countryCode}${emergencyContact.phone}`,
        },
        vehicleSource: vehicleDetails.source || "admin",
      };

      toast.success("Proceeding to document upload...");
      setTimeout(() => {
        navigate("/upload-documents", {
          state: {
            bookingData,
            vehicleDetails,
            driverOption,
            bookingDetails: {
              ...bookingData,
              totalAmount: totals.total,
              formattedTotal: formatNPR(totals.total),
            },
          },
        });
      }, 500);
    } catch (err) {
      toast.error("Failed to proceed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const getVehicleImage = () => {
    if (!vehicleDetails?.photos?.length)
      return "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80";
    const extraView = vehicleDetails.photos.find(
      (p) => p.label === "Extra View",
    );
    const photo = extraView || vehicleDetails.photos[0];
    const folder =
      vehicleDetails.source === "user" ? "user-vehicles" : "vehicles";
    return `http://localhost:5000/uploads/${folder}/${photo.filename}`;
  };

  const getVehicleImages = () => {
    if (!vehicleDetails?.photos?.length)
      return [
        "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
      ];
    const folder =
      vehicleDetails.source === "user" ? "user-vehicles" : "vehicles";
    return vehicleDetails.photos.map(
      (p) => `http://localhost:5000/uploads/${folder}/${p.filename}`,
    );
  };

  const getVehicleFeatures = () => {
    if (!vehicleDetails) return [];
    const features = [];
    if (vehicleDetails.features && Array.isArray(vehicleDetails.features))
      features.push(...vehicleDetails.features);
    if (vehicleDetails.airCondition === "Yes")
      features.push("Air Conditioning");
    if (vehicleDetails.gearType)
      features.push(`${vehicleDetails.gearType} Transmission`);
    if (vehicleDetails.seats) features.push(`${vehicleDetails.seats} Seats`);
    return features;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading vehicle details...</p>
        </div>
      </div>
    );
  }

  if (error || !vehicleDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold mb-2">Error Loading Vehicle</h2>
          <p className="text-gray-600 mb-4">{error || "Vehicle not found"}</p>
          <button
            onClick={() => navigate("/rentridehome")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Back to Vehicles
          </button>
        </div>
      </div>
    );
  }

  const vehicleImages = getVehicleImages();
  const vehicleFeatures = getVehicleFeatures();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
      />

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        onConfirm={confirmDialog.onConfirm}
        onCancel={closeConfirm}
        confirmText="Yes, Delete"
        confirmColor="red"
      />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FaArrowLeft className="text-gray-700 text-lg" />
              </button>
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
                  <FaCar className="text-white text-2xl" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Rent<span className="text-gray-800">Ride</span>
                  </h1>
                  <p className="text-xs text-gray-500 -mt-1">
                    Premium Car Rentals
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate("/profiledetails")}
              className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
            >
              My Bookings
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Left Column ── */}
          <div className="lg:col-span-2 space-y-8">
            {/* Vehicle Details Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-8">
                {/* Maintenance Banner */}
                {vehicleIsInMaintenance && (
                  <div className="mb-6 p-4 bg-gray-100 border border-gray-300 rounded-xl flex items-center gap-3">
                    <span className="text-gray-600 text-2xl flex-shrink-0">🔧</span>
                    <div>
                      <p className="text-gray-800 font-semibold text-lg">
                        Vehicle Under Maintenance
                      </p>
                      <p className="text-gray-600 text-sm mt-0.5">
                        This vehicle is currently not available for booking.
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Images */}
                  <div className="lg:w-2/5">
                    <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden">
                      <img
                        src={getVehicleImage()}
                        alt={vehicleDetails.carName}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/60 text-white text-sm font-medium rounded-full backdrop-blur-sm">
                        {vehicleDetails.carType || "Premium Vehicle"}
                      </div>
                      <div className="absolute top-4 right-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            vehicleIsInMaintenance
                              ? "bg-gray-500 text-white"
                              : "bg-green-500 text-white"
                          }`}
                        >
                          {vehicleIsInMaintenance
                            ? "Maintenance"
                            : vehicleDetails.status}
                        </span>
                      </div>
                      {vehicleDetails.source === "user" && (
                        <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-purple-500/90 text-white text-sm font-medium rounded-full backdrop-blur-sm">
                          Owner Listed
                        </div>
                      )}
                    </div>
                    <div className="flex gap-3 mt-4">
                      {vehicleImages.slice(1, 3).map((img, index) => (
                        <div
                          key={index}
                          className="flex-1 h-20 rounded-xl overflow-hidden cursor-pointer hover:opacity-90"
                        >
                          <img
                            src={img}
                            alt={`${vehicleDetails.carName} ${index + 2}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="lg:w-3/5">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                          {vehicleDetails.carName}
                        </h1>
                        <p className="text-gray-600 mt-1">
                          {vehicleDetails.carType}
                        </p>
                        {vehicleDetails.carNumber && (
                          <p className="text-sm text-gray-400 mt-1">
                            {vehicleDetails.carNumber}
                          </p>
                        )}
                        <div className="flex items-center gap-3 mt-4">
                          {totalReviews > 0 ? (
                            <>
                              <div className="flex items-center bg-gradient-to-r from-yellow-400 to-orange-400 px-4 py-2 rounded-full shadow-md">
                                <span className="text-2xl font-bold text-white mr-2">
                                  {averageRating.toFixed(1)}
                                </span>
                                {renderStars(
                                  Math.round(averageRating),
                                  "text-sm text-white",
                                )}
                              </div>
                              <span className="text-gray-600 font-medium">
                                {totalReviews}{" "}
                                {totalReviews === 1 ? "review" : "reviews"}
                              </span>
                            </>
                          ) : (
                            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
                              <span className="text-gray-400 text-sm font-medium">
                                No reviews yet
                              </span>
                              <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <FaStar
                                    key={i}
                                    className="text-xs text-gray-300"
                                  />
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-4xl font-bold text-blue-600">
                          {formatNPR(vehicleDetails.ratePerDay || 5000)}
                        </div>
                        <div className="text-gray-500">प्रति दिन</div>
                        <div
                          className={`mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                            vehicleIsInMaintenance
                              ? "bg-gray-100 text-gray-700"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {vehicleIsInMaintenance
                            ? "Maintenance"
                            : vehicleDetails.status || "Available"}
                        </div>
                        <button
                          onClick={handleChatWithOwner}
                          disabled={chatLoading}
                          className="mt-3 flex items-center justify-center gap-2 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition w-full whitespace-nowrap"
                        >
                          {chatLoading ? (
                            <FaSpinner className="animate-spin" size={14} />
                          ) : (
                            <FaComments size={14} />
                          )}
                          <span>
                            Chat with{" "}
                            {vehicleDetails.source === "user"
                              ? "Owner"
                              : "Support"}
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Key Features
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {vehicleFeatures.map((feature, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Specs */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Specifications
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {vehicleDetails.gearType && (
                          <div className="p-3 bg-gray-50 rounded-xl text-center">
                            <div className="text-sm text-gray-500">
                              Transmission
                            </div>
                            <div className="font-semibold text-gray-900">
                              {vehicleDetails.gearType}
                            </div>
                          </div>
                        )}
                        {vehicleDetails.seats && (
                          <div className="p-3 bg-gray-50 rounded-xl text-center">
                            <div className="text-sm text-gray-500">Seats</div>
                            <div className="font-semibold text-gray-900">
                              {vehicleDetails.seats}
                            </div>
                          </div>
                        )}
                        {vehicleDetails.airCondition && (
                          <div className="p-3 bg-gray-50 rounded-xl text-center">
                            <div className="text-sm text-gray-500">
                              Air Condition
                            </div>
                            <div className="font-semibold text-gray-900">
                              {vehicleDetails.airCondition}
                            </div>
                          </div>
                        )}
                        <div className="p-3 bg-gray-50 rounded-xl text-center">
                          <div className="text-sm text-gray-500">
                            Booking Type
                          </div>
                          <div className="font-semibold text-gray-900">
                            {vehicleDetails.bookingType || "Both"}
                          </div>
                        </div>
                        {vehicleDetails.driverName && (
                          <div className="p-3 bg-gray-50 rounded-xl text-center">
                            <div className="text-sm text-gray-500">Driver</div>
                            <div className="font-semibold text-gray-900">
                              {vehicleDetails.driverName}
                            </div>
                          </div>
                        )}
                        {vehicleDetails.phoneNumber && (
                          <div className="p-3 bg-gray-50 rounded-xl text-center">
                            <div className="text-sm text-gray-500">Contact</div>
                            <div className="font-semibold text-gray-900">
                              {vehicleDetails.phoneNumber}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form OR Unavailable Message */}
            {!vehicleIsInMaintenance ? (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Booking Details
                </h2>
                <div className="space-y-6">
                  {/* Date & Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt className="text-blue-600" /> Pickup Date
                        </div>
                      </label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => {
                          setSelectedDate(e.target.value);
                        }}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      
                      {/* Show warning for same-day booking */}
                      {selectedDate && new Date(selectedDate).toDateString() === new Date().toDateString() && (
                        <p className="text-sm text-amber-600 mt-1 flex items-center gap-1">
                          <FaClock className="text-amber-500" />
                          Same-day pickup: Only times after current time are available
                        </p>
                      )}
                      
                      <p className="text-sm text-gray-500 mt-1">
                        Return date: {calculateReturnDate() || "Select pickup date first"}
                      </p>
                      
                      {/* Add availability status indicator */}
                      {selectedDate && calculateReturnDate() && (
                        <div className={`mt-2 text-sm ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                          {checkingAvailability ? (
                            <div className="flex items-center gap-2">
                              <FaSpinner className="animate-spin" />
                              Checking availability...
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              {isAvailable ? (
                                <>
                                  <FaCheckCircle className="text-green-600" />
                                  <span>{availabilityMessage || "Vehicle available for selected dates!"}</span>
                                </>
                              ) : (
                                <>
                                  <FaTimesCircle className="text-red-600" />
                                  <span>{availabilityMessage}</span>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Add next available date suggestion */}
                      {!isAvailable && nextAvailableDate && (
                        <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-800">
                            <strong>💡 Suggestion:</strong> This vehicle becomes available from{" "}
                            {new Date(nextAvailableDate).toLocaleDateString()}
                          </p>
                          <button
                            onClick={() => {
                              const nextDate = new Date(nextAvailableDate);
                              setSelectedDate(nextDate.toISOString().split("T")[0]);
                              setBookingDays(1);
                            }}
                            className="mt-2 text-xs text-blue-600 hover:text-blue-800 underline"
                          >
                            Book from this date →
                          </button>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center gap-2">
                          <FaClock className="text-blue-600" /> Pickup Time
                        </div>
                      </label>
                      
                      {/* Show warning for same-day bookings */}
                      {selectedDate && new Date(selectedDate).toDateString() === new Date().toDateString() && (
                        <div className="mb-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg text-xs text-yellow-700">
                          ⚠️ Same-day booking: Only available time slots from now onwards are shown
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-2">
                        {getAvailableTimeSlots().map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                              selectedTime === time
                                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                      
                      {/* Show available times helper text */}
                      {selectedDate && new Date(selectedDate).toDateString() === new Date().toDateString() && getAvailableTimeSlots().length > 0 && (
                        <div className="mt-2 text-xs text-blue-600">
                          {getAvailableTimesMessage()}
                        </div>
                      )}
                      
                      {getAvailableTimeSlots().length === 0 && selectedDate && (
                        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                          <FaTimesCircle className="inline mr-2" />
                          No available time slots for today. Please select a future date.
                        </div>
                      )}
                      
                      {selectedDate && !isPickupTimeValid() && selectedTime && (
                        <p className="text-red-500 text-xs mt-2">
                          Please select a pickup time after the current time for same-day booking.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Locations */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-blue-600" /> Pickup Location
                        </div>
                      </label>
                      <input
                        type="text"
                        value={pickupLocation}
                        onChange={(e) => setPickupLocation(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter pickup location"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-green-600" /> Drop-off Location
                        </div>
                      </label>
                      <input
                        type="text"
                        value={dropoffLocation}
                        onChange={(e) => setDropoffLocation(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter drop-off location"
                      />
                    </div>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rental Duration
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() =>
                          setBookingDays(Math.max(1, bookingDays - 1))
                        }
                        className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-bold text-xl"
                      >
                        -
                      </button>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900">
                          {bookingDays} day{bookingDays > 1 ? "s" : ""}
                        </div>
                        <div className="text-gray-500 text-sm">
                          Total:{" "}
                          {formatNPR(
                            (vehicleDetails.ratePerDay || 5000) * bookingDays,
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => setBookingDays(bookingDays + 1)}
                        className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-bold text-xl"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Driver Option */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Driver Option
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() =>
                          availableOptions.withoutDriver &&
                          setDriverOption("without")
                        }
                        className={`p-4 rounded-xl border-2 text-left transition-all relative ${
                          driverOption === "without"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        } ${!availableOptions.withoutDriver ? "opacity-40 cursor-not-allowed" : ""}`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-semibold text-gray-900">
                            Without Driver
                          </div>
                          <div className="group relative">
                            <FaInfoCircle
                              className="text-blue-500 cursor-help text-sm"
                              onClick={(e) => e.stopPropagation()}
                            />
                            <div className="invisible group-hover:visible absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg w-56 z-50">
                              <div className="font-semibold mb-1">
                                Self-Drive Requirements:
                              </div>
                              <ul className="space-y-0.5 text-left">
                                <li>• Valid driving license required</li>
                                <li>• Minimum 1 year experience</li>
                                <li>• Age 21+ years</li>
                                <li>• You pay for fuel</li>
                              </ul>
                              <div className="absolute top-full right-4 -mt-1">
                                <div className="border-4 border-transparent border-t-gray-900"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          Self-drive
                        </div>
                        <div className="text-sm font-medium text-blue-600 mt-2">
                          +रु 0/day
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          availableOptions.withDriver && setDriverOption("with")
                        }
                        className={`p-4 rounded-xl border-2 text-left transition-all relative ${
                          driverOption === "with"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        } ${!availableOptions.withDriver ? "opacity-40 cursor-not-allowed" : ""}`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-semibold text-gray-900">
                            With Driver
                          </div>
                          <div className="group relative">
                            <FaInfoCircle
                              className="text-blue-500 cursor-help text-sm"
                              onClick={(e) => e.stopPropagation()}
                            />
                            <div className="invisible group-hover:visible absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg w-56 z-50">
                              <div className="font-semibold mb-1">
                                Professional Driver Includes:
                              </div>
                              <ul className="space-y-0.5 text-left">
                                <li>• Experienced driver</li>
                                <li>• 12 hours/day service</li>
                                <li>• You pay for fuel</li>
                              </ul>
                              <div className="absolute top-full right-4 -mt-1">
                                <div className="border-4 border-transparent border-t-gray-900"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          Includes driver
                        </div>
                        <div className="text-sm font-medium text-blue-600 mt-2">
                          +रु 500/day
                        </div>
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      This vehicle supports:{" "}
                      <span className="font-medium">
                        {vehicleDetails.bookingType || "Both"}
                      </span>
                    </p>
                  </div>

                  {/* Insurance */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      <div className="flex items-center gap-2">
                        <FaShieldAlt className="text-blue-600" /> Insurance Coverage
                      </div>
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setInsuranceOption("basic")}
                        className={`p-4 rounded-xl border-2 text-left transition-all relative ${
                          insuranceOption === "basic"
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-semibold text-gray-900">
                            Basic Coverage
                          </div>
                          <div className="group relative">
                            <FaInfoCircle
                              className="text-blue-500 cursor-help text-sm"
                              onClick={(e) => e.stopPropagation()}
                            />
                            <div className="invisible group-hover:visible absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg w-56 z-50">
                              <div className="font-semibold mb-1">
                                Basic Coverage Includes:
                              </div>
                              <ul className="space-y-0.5 text-left">
                                <li>• Third-party liability</li>
                                <li>• Basic accident coverage</li>
                                <li>• Theft protection</li>
                                <li>• Deductible: रु 10,000</li>
                              </ul>
                              <div className="absolute top-full right-4 -mt-1">
                                <div className="border-4 border-transparent border-t-gray-900"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          Standard protection
                        </div>
                        <div className="text-sm font-medium text-green-600 mt-2">
                          Included
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setInsuranceOption("premium")}
                        className={`p-4 rounded-xl border-2 text-left transition-all relative ${
                          insuranceOption === "premium"
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-semibold text-gray-900">
                            Premium Coverage
                          </div>
                          <div className="group relative">
                            <FaInfoCircle
                              className="text-blue-500 cursor-help text-sm"
                              onClick={(e) => e.stopPropagation()}
                            />
                            <div className="invisible group-hover:visible absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg w-56 z-50">
                              <div className="font-semibold mb-1">
                                Premium Coverage Includes:
                              </div>
                              <ul className="space-y-0.5 text-left">
                                <li>• Full comprehensive insurance</li>
                                <li>• Zero deductible</li>
                                <li>• 24/7 roadside assistance</li>
                                <li>• Personal accident cover</li>
                                <li>• Glass & tire damage</li>
                              </ul>
                              <div className="absolute top-full right-4 -mt-1">
                                <div className="border-4 border-transparent border-t-gray-900"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          Full protection
                        </div>
                        <div className="text-sm font-medium text-green-600 mt-2">
                          +रु 1,500/day
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* User Contact Information - Nepal Only */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      <div className="flex items-center gap-2">
                        <FaPhone className="text-blue-600" />
                        Your Contact Number{" "}
                        <span className="text-red-500">*</span>
                      </div>
                    </label>
                    <div className="flex gap-2">
                      <div className="w-28 px-3 py-3 bg-gray-100 border border-gray-300 rounded-xl flex items-center justify-center gap-2">
                        <img
                          src="https://flagcdn.com/w20/np.png"
                          alt="Nepal"
                          className="w-5 h-4 object-cover rounded-sm"
                        />
                        <span className="font-medium text-gray-700">+977</span>
                      </div>
                      <input
                        type="tel"
                        value={userPhoneNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, "");
                          if (value.length <= 10) {
                            setUserPhoneNumber(value);
                          }
                        }}
                        maxLength={10}
                        className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="98XXXXXXXX"
                        required
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Format: 🇳🇵 +977 {userPhoneNumber || "98XXXXXXXX"}
                    </p>
                    <p className="text-xs text-blue-600 mt-2">
                      We'll use this number to contact you about your booking
                    </p>
                  </div>

                  {/* Emergency Contact with Country Code Selector */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      <div className="flex items-center gap-2">
                        <FaPhone className="text-blue-600" />
                        Emergency Contact{" "}
                        <span className="text-red-500">*</span>
                      </div>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={emergencyContact.name}
                          onChange={(e) =>
                            setEmergencyContact({
                              ...emergencyContact,
                              name: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter full name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-2">
                          <CountryCodeSelector
                            value={emergencyContact.countryCode || "+977"}
                            onChange={(code) =>
                              setEmergencyContact({
                                ...emergencyContact,
                                countryCode: code,
                              })
                            }
                            className="w-32"
                          />
                          <input
                            type="tel"
                            value={emergencyContact.phone}
                            onChange={(e) => {
                              const value = e.target.value.replace(
                                /[^0-9]/g,
                                "",
                              );
                              setEmergencyContact({
                                ...emergencyContact,
                                phone: value,
                              });
                            }}
                            className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter phone number"
                            required
                          />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          Format:{" "}
                          {getCountryFlag(
                            emergencyContact.countryCode || "+977",
                          )}{" "}
                          {emergencyContact.countryCode || "+977"}{" "}
                          {emergencyContact.phone || "XXXXXXXXXX"}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        Relationship
                      </label>
                      <input
                        type="text"
                        value={emergencyContact.relationship}
                        onChange={(e) =>
                          setEmergencyContact({
                            ...emergencyContact,
                            relationship: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. Parent, Spouse, Friend"
                      />
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Special Requests{" "}
                      <span className="text-gray-400 font-normal">
                        (optional)
                      </span>
                    </label>
                    <textarea
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      placeholder="Any specific requirements or notes..."
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="border-2 rounded-2xl p-8 text-center bg-gray-50 border-gray-200">
                <div className="text-6xl mb-4">🔧</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  Vehicle Under Maintenance
                </h3>
                <p className="text-gray-600 mb-2">
                  This vehicle is currently under maintenance and is not available for booking.
                </p>
                <p className="text-sm text-gray-500 mt-4">
                  Please check back later or browse other available vehicles.
                </p>
                <button
                  onClick={() => navigate("/rentridehome")}
                  className="mt-6 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all"
                >
                  Browse Other Vehicles
                </button>
              </div>
            )}
          </div>

          {/* ── Right Column ── */}
          <div className="space-y-8">
            {/* Pricing Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 z-10">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Pricing Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">
                    Base Price ({bookingDays} day{bookingDays > 1 ? "s" : ""})
                  </span>
                  <span className="font-semibold">
                    {formatNPR(totals.basePrice)}
                  </span>
                </div>
                {totals.driverFee > 0 && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Driver Fee</span>
                    <span className="font-semibold">
                      {formatNPR(totals.driverFee)}
                    </span>
                  </div>
                )}
                {totals.insuranceFee > 0 && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Premium Insurance</span>
                    <span className="font-semibold">
                      {formatNPR(totals.insuranceFee)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Service Fee</span>
                  <span className="font-semibold">
                    {formatNPR(totals.serviceFee)}
                  </span>
                </div>
                <div className="pt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">
                      Total
                    </span>
                    <span className="text-3xl font-bold text-blue-600">
                      {formatNPR(totals.total)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleBookNow}
                  disabled={submitting || vehicleIsInMaintenance || !isAvailable || checkingAvailability || !selectedDate || !selectedTime}
                  className={`w-full mt-6 py-4 font-bold rounded-xl transition-all duration-300 ${
                    !isAvailable || checkingAvailability || !selectedDate || !selectedTime
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : vehicleIsInMaintenance
                        ? "bg-gray-100 text-gray-700 cursor-not-allowed"
                        : "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-2xl disabled:opacity-50"
                  }`}
                >
                  {checkingAvailability ? (
                    <div className="flex items-center justify-center gap-2">
                      <FaSpinner className="animate-spin" /> Checking Availability...
                    </div>
                  ) : !isAvailable && selectedDate ? (
                    <div className="flex items-center justify-center gap-2">
                      <FaTimesCircle /> Not Available for Selected Dates
                    </div>
                  ) : !selectedDate ? (
                    <div className="flex items-center justify-center gap-2">
                      <FaCalendarAlt /> Select Pickup Date First
                    </div>
                  ) : !selectedTime ? (
                    <div className="flex items-center justify-center gap-2">
                      <FaClock /> Select Pickup Time
                    </div>
                  ) : vehicleIsInMaintenance ? (
                    <div className="flex items-center justify-center gap-2">
                      🔧 Under Maintenance
                    </div>
                  ) : submitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <FaSpinner className="animate-spin" /> Processing...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <FaCreditCard /> Continue to Document Upload
                    </div>
                  )}
                </button>

                {/* Add warning after button */}
                {!selectedDate && (
                  <p className="text-xs text-amber-600 text-center mt-2">
                    Please select pickup date to continue
                  </p>
                )}
                {selectedDate && !selectedTime && (
                  <p className="text-xs text-amber-600 text-center mt-2">
                    Please select pickup time to continue
                  </p>
                )}
              </div>
            </div>

            {/* Enhanced Ratings & Reviews Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 relative z-0">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Ratings & Reviews
                </h2>
                <button
                  onClick={() => setShowChartModal(true)}
                  className="p-2 text-gray-500 hover:text-blue-600 transition"
                >
                  <FaChartBar />
                </button>
              </div>

              {/* Average Rating with Circular Progress */}
              <div className="flex items-center gap-6 mb-6 p-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-100">
                <div className="flex-shrink-0">
                  {totalReviews > 0 ? (
                    <CircularRating
                      rating={averageRating}
                      size={90}
                      strokeWidth={8}
                    />
                  ) : (
                    <div className="w-[90px] h-[90px] rounded-full border-4 border-gray-200 flex flex-col items-center justify-center bg-white">
                      <span className="text-2xl font-bold text-gray-300">
                        N/A
                      </span>
                      <FaStar className="text-gray-300 text-xs mt-0.5" />
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-1.5">
                  {ratingDistribution.map((item) => (
                    <div key={item.stars} className="flex items-center gap-2">
                      <span className="text-xs text-gray-600 w-4 font-medium">
                        {item.stars}
                      </span>
                      <FaStar className="text-yellow-400 text-xs" />
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transition-all duration-500"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 w-6 text-right font-medium">
                        {item.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-center text-sm text-gray-500 mb-4">
                {totalReviews > 0
                  ? `Based on ${totalReviews} verified ${totalReviews === 1 ? "review" : "reviews"}`
                  : "Be the first to review this vehicle"}
              </p>

              {/* Review CTA */}
              {!hasBookedThisVehicle && !userReview && !showReviewForm && (
                <div className="mb-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FaLock className="text-white text-sm" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800">
                        Want to leave a review?
                      </p>
                      <p className="text-xs text-gray-600 mt-0.5">
                        You must book and complete a rental to write a review.
                        Reviews help build trust.
                      </p>
                      <button
                        onClick={() => {
                          if (!vehicleIsInMaintenance) {
                            document
                              .querySelector('input[type="date"]')
                              ?.scrollIntoView({
                                behavior: "smooth",
                                block: "center",
                              });
                          } else {
                            navigate("/rentridehome");
                          }
                        }}
                        className="mt-2 px-4 py-1.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xs font-semibold rounded-lg transition shadow-sm"
                      >
                        {vehicleIsInMaintenance
                          ? "Browse Available Vehicles"
                          : "Book This Vehicle"}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Write Review Button */}
              {hasBookedThisVehicle && !userReview && !showReviewForm && (
                <button
                  onClick={() => {
                    setEditingReview(false);
                    setShowReviewForm(true);
                  }}
                  className="w-full py-3 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition flex items-center justify-center gap-2 shadow-md"
                >
                  <FaEdit /> Write a Review
                </button>
              )}

              {/* User's Existing Review */}
              {userReview && !showReviewForm && (
                <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-blue-700 flex items-center gap-1">
                      <FaCheckCircle className="text-blue-600" /> Your Review
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={handleEditReview}
                        className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                      >
                        <FaEdit size={14} />
                      </button>
                      <button
                        onClick={handleDeleteReview}
                        disabled={deletingReview}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition"
                      >
                        {deletingReview ? (
                          <FaSpinner className="animate-spin" size={14} />
                        ) : (
                          <FaTrash size={14} />
                        )}
                      </button>
                    </div>
                  </div>
                  {renderStars(userReview.rating)}
                  <p className="text-sm text-gray-700 mt-2">
                    {userReview.comment}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatDate(userReview.createdAt)}
                  </p>
                </div>
              )}

              {/* Review Form */}
              {showReviewForm && (
                <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    {editingReview ? "Edit Your Review" : "Write a Review"}
                  </h3>
                  {renderStarInput()}
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Share your experience with this vehicle..."
                  />
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={
                        editingReview ? handleUpdateReview : handleSubmitReview
                      }
                      disabled={submittingReview}
                      className="flex-1 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-semibold rounded-lg transition flex items-center justify-center gap-2"
                    >
                      {submittingReview ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <FaCheck />
                      )}
                      {editingReview ? "Update Review" : "Submit Review"}
                    </button>
                    <button
                      onClick={() => {
                        setShowReviewForm(false);
                        setEditingReview(false);
                        setNewComment("");
                        setNewRating(5);
                      }}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-semibold rounded-lg transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Enhanced Reviews List */}
              {reviewsLoading ? (
                <div className="flex justify-center py-8">
                  <FaSpinner className="animate-spin text-blue-600 text-2xl" />
                </div>
              ) : reviews.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <FaRegCommentDots className="text-4xl mx-auto mb-2 text-gray-300" />
                  <p className="font-medium">No reviews yet</p>
                  <p className="text-sm mt-1">
                    Be the first to review this vehicle!
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
                  {reviews.map((review) => (
                    <div
                      key={review._id}
                      className="p-4 border border-gray-100 rounded-xl hover:shadow-md transition bg-white"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            {review.user?.profilePhoto ? (
                              <img
                                src={`http://localhost:5000/uploads/profiles/${review.user.profilePhoto}`}
                                alt={review.user?.name}
                                className="w-11 h-11 rounded-full object-cover border-2 border-blue-100"
                              />
                            ) : (
                              <div className="w-11 h-11 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold border-2 border-blue-100">
                                {review.user?.name?.charAt(0)?.toUpperCase() ||
                                  "U"}
                              </div>
                            )}
                            {review.verified && (
                              <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-0.5">
                                <FaCheckCircle className="text-white text-xs" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-sm flex items-center gap-1">
                              {review.user?.name || "Anonymous"}
                              {review.verified && (
                                <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium">
                                  Verified Renter
                                </span>
                              )}
                            </p>
                            <p className="text-xs text-gray-400">
                              {formatDate(review.createdAt)}
                            </p>
                          </div>
                        </div>
                        {renderStars(review.rating, "text-xs")}
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed mb-3">
                        {review.comment}
                      </p>

                      {review.photos && review.photos.length > 0 && (
                        <div className="flex gap-2 mb-3 overflow-x-auto">
                          {review.photos.map((photo, idx) => (
                            <div
                              key={idx}
                              className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition"
                              onClick={() => {
                                setSelectedReviewImages(review.photos);
                                setShowImageModal(true);
                              }}
                            >
                              <img
                                src={photo}
                                alt={`Review ${idx + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                          {review.photos.length > 3 && (
                            <div className="flex-shrink-0 w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 text-xs font-medium">
                              +{review.photos.length - 3}
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <button
                          onClick={(e) => handleToggleHelpful(review._id, e)}
                          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition ${
                            review.hasLiked
                              ? "bg-red-50 text-red-500 font-medium"
                              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                          }`}
                        >
                          {review.hasLiked ? (
                            <FaHeart size={10} />
                          ) : (
                            <FaRegHeart size={10} />
                          )}
                          <span>Helpful ({review.helpful || 0})</span>
                        </button>
                        <button
                          onClick={() => handleOpenReviewerChat(review.user)}
                          className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-purple-50 text-purple-600 hover:bg-purple-100 rounded-full transition font-medium"
                        >
                          <FaRegCommentDots size={10} /> Chat
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Rating Chart Modal */}
      {showChartModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowChartModal(false)}
          />
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                Rating Distribution
              </h3>
              <button
                onClick={() => setShowChartModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <FaTimes />
              </button>
            </div>
            <div className="flex items-center gap-6 mb-6">
              <CircularRating
                rating={averageRating}
                size={100}
                strokeWidth={10}
              />
              <div className="flex-1 space-y-2">
                {ratingDistribution.map((item) => (
                  <div key={item.stars} className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 w-4">
                      {item.stars}
                    </span>
                    <FaStar className="text-yellow-400 text-xs" />
                    <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 w-6 text-right">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-center text-sm text-gray-500">
              {totalReviews} total reviews
            </p>
          </div>
        </div>
      )}

      {/* Image Modal for Review Photos */}
      {showImageModal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowImageModal(false)}
          />
          <div className="relative bg-white rounded-2xl p-4 w-full max-w-2xl shadow-2xl">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition z-10"
            >
              <FaTimes />
            </button>
            <div className="grid grid-cols-2 gap-4 mt-8">
              {selectedReviewImages.map((img, idx) => (
                <div key={idx} className="rounded-lg overflow-hidden">
                  <img
                    src={img}
                    alt={`Review ${idx + 1}`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Chat Modal */}
      {showChatModal && (
        <div className="fixed inset-0 z-[100] p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowChatModal(false)}
          />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md h-[550px] flex flex-col shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowChatModal(false)}
                    className="text-white hover:bg-white/20 rounded-full p-1 transition"
                  >
                    <FaArrowLeft />
                  </button>
                  <div className="flex items-center gap-3">
                    {chatPartnerInfo?.image ? (
                      <img
                        src={chatPartnerInfo.image}
                        alt={chatPartnerInfo.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <FaUserCircle className="text-2xl" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold">
                        {chatPartnerInfo?.name || "Loading..."}
                      </h3>
                      <p className="text-xs text-white/80">
                        {chatPartnerInfo?.role === "owner"
                          ? "Vehicle Owner"
                          : chatPartnerInfo?.role === "admin"
                            ? "Support Team"
                            : chatPartnerInfo?.role === "reviewer"
                              ? "Customer"
                              : "Online"}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowChatModal(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                {chatLoading ? (
                  <div className="flex justify-center py-8">
                    <FaSpinner className="animate-spin text-blue-600 text-2xl" />
                  </div>
                ) : chatMessages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-3">
                      <FaRegCommentDots className="text-gray-400 text-2xl" />
                    </div>
                    <p className="text-gray-500">No messages yet</p>
                    <p className="text-gray-400 text-sm mt-1">
                      Start a conversation about {vehicleDetails?.carName}
                    </p>
                  </div>
                ) : (
                  chatMessages.map((msg, idx) => (
                    <div
                      key={msg._id || idx}
                      className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
                    >
                      {!msg.isOwn && (
                        <div className="flex-shrink-0 mr-2">
                          {chatPartnerInfo?.image ? (
                            <img
                              src={chatPartnerInfo.image}
                              alt=""
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              {chatPartnerInfo?.name?.charAt(0).toUpperCase() ||
                                "U"}
                            </div>
                          )}
                        </div>
                      )}
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                          msg.isOwn
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-sm"
                            : "bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-sm"
                        }`}
                      >
                        <p className="text-sm break-words">{msg.message}</p>
                        <div
                          className={`text-xs mt-1 flex items-center gap-1 ${msg.isOwn ? "text-blue-100" : "text-gray-400"}`}
                        >
                          <span>{formatChatTime(msg.createdAt)}</span>
                          {msg.sending && (
                            <FaSpinner className="animate-spin text-xs" />
                          )}
                          {msg.delivered && !msg.sending && (
                            <FaCheck className="text-xs" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 border-t bg-white">
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-500 hover:text-blue-600 transition rounded-full">
                    <FaImage size={20} />
                  </button>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleSendChatMessage()
                    }
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleSendChatMessage}
                    disabled={sendingMessage || !newMessage.trim()}
                    className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg transition disabled:opacity-50"
                  >
                    {sendingMessage ? (
                      <FaSpinner className="animate-spin" size={20} />
                    ) : (
                      <FaPaperPlane size={20} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-12 pt-8 pb-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
                <FaCar className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Rent<span className="text-white">Ride</span>
                </h3>
                <p className="text-xs text-gray-400 -mt-1">
                  Premium Car Rentals
                </p>
              </div>
            </div>
            <div className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} RentRide. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Booking;