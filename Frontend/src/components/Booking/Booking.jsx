// import React, { useState, useEffect } from "react";
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
//   FaSmile,
//   FaArrowRight,
//   FaCheck,
//   FaEye,
//   FaRegCommentDots,
//   FaTimes,
// } from "react-icons/fa";
// import { useNavigate, useLocation, useParams } from "react-router-dom";
// import axios from "axios";

// const API_URL = "http://localhost:5000/api";

// // Configure axios with token
// const axiosInstance = axios.create({
//   baseURL: API_URL,
//   timeout: 10000,
// });

// // Add request interceptor
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

// // Chat Service
// const chatService = {
//   getVehicleChat: async (vehicleId, vehicleType) => {
//     const response = await axiosInstance.post("/chats/vehicle", {
//       vehicleId,
//       vehicleType,
//     });
//     return response.data;
//   },
//   getSupportChat: async () => {
//     const response = await axiosInstance.post("/chats/support");
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
//   getUserChats: async () => {
//     const response = await axiosInstance.get("/chats/my-chats");
//     return response.data;
//   },
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
//     relationship: "",
//   });

//   // Review States
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
//   const [userBookingStatus, setUserBookingStatus] = useState(null);
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

//   // Like tracking with heart - stored in localStorage
//   const [likedReviews, setLikedReviews] = useState(new Set());

//   // Chat States
//   const [showChatModal, setShowChatModal] = useState(false);
//   const [selectedReviewer, setSelectedReviewer] = useState(null);
//   const [chatMessages, setChatMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [sendingMessage, setSendingMessage] = useState(false);
//   const [chatLoading, setChatLoading] = useState(false);
//   const [activeChatId, setActiveChatId] = useState(null);
//   const [ownerDetails, setOwnerDetails] = useState(null);
//   const [chatPartnerInfo, setChatPartnerInfo] = useState(null);

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

//   // Load liked reviews from localStorage
//   useEffect(() => {
//     const storedLikes = localStorage.getItem("likedReviews");
//     if (storedLikes) {
//       setLikedReviews(new Set(JSON.parse(storedLikes)));
//     }
//   }, []);

//   // Determine available driver options
//   const getAvailableDriverOptions = () => {
//     if (!vehicleDetails) return { withDriver: false, withoutDriver: false };
//     const bookingType = vehicleDetails.bookingType || "";
//     if (bookingType.toLowerCase() === "both") {
//       return { withDriver: true, withoutDriver: true };
//     } else if (bookingType.toLowerCase().includes("with driver")) {
//       return { withDriver: true, withoutDriver: false };
//     } else if (bookingType.toLowerCase().includes("without driver")) {
//       return { withDriver: false, withoutDriver: true };
//     } else {
//       return { withDriver: true, withoutDriver: true };
//     }
//   };

//   const availableOptions = getAvailableDriverOptions();

//   useEffect(() => {
//     if (!availableOptions.withDriver && availableOptions.withoutDriver) {
//       setDriverOption("without");
//     } else if (availableOptions.withDriver && !availableOptions.withoutDriver) {
//       setDriverOption("with");
//     }
//   }, [vehicleDetails]);

//   // Fetch vehicle data
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
//           } catch (adminError) {
//             try {
//               const userResponse = await axios.get(
//                 `http://localhost:5000/api/user-vehicles/public/${vehicleId}`,
//                 { timeout: 10000 },
//               );
//               if (userResponse.data.success && userResponse.data.data) {
//                 const userVehicle = userResponse.data.data;
//                 vehicleData = {
//                   _id: userVehicle._id,
//                   carName: userVehicle.carName,
//                   carNumber: userVehicle.carNumber,
//                   carType: userVehicle.carType,
//                   ratePerDay: userVehicle.ratePerDay,
//                   seats: userVehicle.seats,
//                   bookingType: userVehicle.bookingType,
//                   gearType: userVehicle.gearType,
//                   airCondition: userVehicle.airCondition,
//                   description: userVehicle.description,
//                   features: userVehicle.features,
//                   photos: userVehicle.photos,
//                   phoneNumber: userVehicle.phoneNumber,
//                   driverName: userVehicle.driverName,
//                   status: "Available",
//                   source: "user",
//                   owner: userVehicle.fullName,
//                   ownerPhone: userVehicle.phoneNumber,
//                   userId: userVehicle.userId || userVehicle.user,
//                 };
//                 if (vehicleData.userId) {
//                   await fetchOwnerDetails(vehicleData.userId);
//                 }
//               }
//             } catch (userError) {
//               console.error("Vehicle not found");
//             }
//           }

//           if (vehicleData) {
//             setVehicleDetails(vehicleData);
//           } else {
//             setError("Vehicle not found");
//           }
//         } else {
//           setError("No vehicle selected");
//         }

//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setError("Failed to load vehicle details");
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [location, vehicleId]);

//   // Fetch owner details
//   const fetchOwnerDetails = async (userId) => {
//     try {
//       const response = await axiosInstance.get(`/profile/user/${userId}`);
//       if (response.data.success) {
//         setOwnerDetails(response.data.user);
//       }
//     } catch (error) {
//       console.error("Error fetching owner details:", error);
//     }
//   };

//   // Get owner profile image URL
//   const getOwnerProfileImage = () => {
//     if (ownerDetails?.profilePhoto) {
//       return `http://localhost:5000/uploads/profiles/${ownerDetails.profilePhoto}`;
//     }
//     return null;
//   };

//   // Fetch reviews and user booking status
//   useEffect(() => {
//     if (vehicleDetails && vehicleDetails._id) {
//       fetchReviews();
//       checkUserBookingStatus();
//     }
//   }, [vehicleDetails]);

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

//         const likedReviewIds = response.data.data.reviews
//           .filter((review) => review.hasLiked)
//           .map((review) => review._id);
//         setLikedReviews(new Set(likedReviewIds));
//         localStorage.setItem("likedReviews", JSON.stringify(likedReviewIds));
//       }
//     } catch (error) {
//       console.error("Error fetching reviews:", error);
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
//       if (idx >= 0 && idx < 5) {
//         distribution[idx].count++;
//       }
//     });

//     const total = reviewsList.length;
//     distribution.forEach((item) => {
//       item.percentage = total > 0 ? (item.count / total) * 100 : 0;
//     });

//     setRatingDistribution(distribution);
//   };

//   const checkUserBookingStatus = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setHasBookedThisVehicle(false);
//         return;
//       }

//       const response = await axiosInstance.get(
//         `/bookings/user/vehicle/${vehicleDetails._id}/status`,
//       );

//       if (response.data.success) {
//         setHasBookedThisVehicle(response.data.data.hasBooked);
//         setUserBookingStatus(response.data.data.status);

//         if (response.data.data.hasBooked) {
//           const reviewResponse = await axiosInstance.get(
//             `/reviews/user/vehicle/${vehicleDetails._id}`,
//           );
//           if (reviewResponse.data.success && reviewResponse.data.data) {
//             setUserReview(reviewResponse.data.data);
//           }
//         }
//       }
//     } catch (error) {
//       console.error("Error checking booking status:", error);
//       setHasBookedThisVehicle(false);
//     }
//   };

//   const handleSubmitReview = async () => {
//     if (!newComment.trim()) {
//       alert("Please enter a review comment");
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
//         alert("Review submitted successfully!");
//         setShowReviewForm(false);
//         setNewComment("");
//         setNewRating(5);
//         fetchReviews();
//         checkUserBookingStatus();
//       }
//     } catch (error) {
//       console.error("Error submitting review:", error);
//       alert(error.response?.data?.message || "Failed to submit review");
//     } finally {
//       setSubmittingReview(false);
//     }
//   };

//   const handleUpdateReview = async () => {
//     if (!newComment.trim()) {
//       alert("Please enter a review comment");
//       return;
//     }

//     setSubmittingReview(true);
//     try {
//       const response = await axiosInstance.put(`/reviews/${userReview._id}`, {
//         rating: newRating,
//         comment: newComment,
//       });

//       if (response.data.success) {
//         alert("Review updated successfully!");
//         setEditingReview(false);
//         setShowReviewForm(false);
//         setNewComment("");
//         setNewRating(5);
//         fetchReviews();
//         checkUserBookingStatus();
//       }
//     } catch (error) {
//       console.error("Error updating review:", error);
//       alert(error.response?.data?.message || "Failed to update review");
//     } finally {
//       setSubmittingReview(false);
//     }
//   };

//   const handleDeleteReview = async () => {
//     if (!window.confirm("Are you sure you want to delete your review?")) {
//       return;
//     }

//     setDeletingReview(true);
//     try {
//       const response = await axiosInstance.delete(`/reviews/${userReview._id}`);

//       if (response.data.success) {
//         alert("Review deleted successfully!");
//         setUserReview(null);
//         setShowReviewForm(false);
//         setEditingReview(false);
//         fetchReviews();
//         checkUserBookingStatus();
//       }
//     } catch (error) {
//       console.error("Error deleting review:", error);
//       alert(error.response?.data?.message || "Failed to delete review");
//     } finally {
//       setDeletingReview(false);
//     }
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

//     setReviews((prevReviews) =>
//       prevReviews.map((r) => {
//         if (r._id === reviewId) {
//           return {
//             ...r,
//             hasLiked: !wasLiked,
//             helpful: wasLiked ? r.helpful - 1 : r.helpful + 1,
//           };
//         }
//         return r;
//       }),
//     );

//     if (wasLiked) {
//       const newLiked = new Set(likedReviews);
//       newLiked.delete(reviewId);
//       setLikedReviews(newLiked);
//       localStorage.setItem("likedReviews", JSON.stringify([...newLiked]));
//     } else {
//       const newLiked = new Set(likedReviews);
//       newLiked.add(reviewId);
//       setLikedReviews(newLiked);
//       localStorage.setItem("likedReviews", JSON.stringify([...newLiked]));
//     }

//     try {
//       const response = await axiosInstance.post(`/reviews/${reviewId}/helpful`);

//       if (response.data.success) {
//         setReviews((prevReviews) =>
//           prevReviews.map((r) => {
//             if (r._id === reviewId) {
//               return {
//                 ...r,
//                 hasLiked: response.data.isLiked,
//                 helpful: response.data.helpful,
//               };
//             }
//             return r;
//           }),
//         );
//       }
//     } catch (error) {
//       setReviews((prevReviews) =>
//         prevReviews.map((r) => {
//           if (r._id === reviewId) {
//             return {
//               ...r,
//               hasLiked: wasLiked,
//               helpful: wasLiked ? r.helpful + 1 : r.helpful - 1,
//             };
//           }
//           return r;
//         }),
//       );

//       if (wasLiked) {
//         const revertLiked = new Set(likedReviews);
//         revertLiked.add(reviewId);
//         setLikedReviews(revertLiked);
//         localStorage.setItem("likedReviews", JSON.stringify([...revertLiked]));
//       } else {
//         const revertLiked = new Set(likedReviews);
//         revertLiked.delete(reviewId);
//         setLikedReviews(revertLiked);
//         localStorage.setItem("likedReviews", JSON.stringify([...revertLiked]));
//       }

//       console.error("Error toggling helpful:", error);
//       alert(error.response?.data?.message || "Failed to update");
//     }
//   };

//   // Get chat partner from chat ID
//   const getChatPartnerFromChat = async (chatId) => {
//     try {
//       const response = await chatService.getChat(chatId);
//       if (response.success) {
//         const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
//         const otherParticipant = response.data.participants.find(
//           (p) => p._id !== currentUser.id,
//         );

//         if (otherParticipant) {
//           let role = "user";
//           let displayName = otherParticipant.name;
//           let image = null;

//           if (response.data.chatType === "vehicle") {
//             if (otherParticipant.role === "admin") {
//               role = "admin";
//               displayName = "Support Team";
//               image = `https://ui-avatars.com/api/?background=6B21A5&color=fff&rounded=true&size=128&name=Support`;
//             } else if (vehicleDetails?.source === "user") {
//               role = "owner";
//               displayName =
//                 otherParticipant.name ||
//                 vehicleDetails.owner ||
//                 "Vehicle Owner";
//               image = otherParticipant.profilePhoto
//                 ? `http://localhost:5000/uploads/profiles/${otherParticipant.profilePhoto}`
//                 : `https://ui-avatars.com/api/?background=16A34A&color=fff&rounded=true&size=128&name=${displayName.charAt(0)}`;
//             } else {
//               role = "support";
//               displayName = "Support Team";
//               image = `https://ui-avatars.com/api/?background=6B21A5&color=fff&rounded=true&size=128&name=Support`;
//             }
//           } else if (response.data.chatType === "support") {
//             role = "support";
//             displayName = "Support Team";
//             image = `https://ui-avatars.com/api/?background=6B21A5&color=fff&rounded=true&size=128&name=Support`;
//           } else {
//             role = otherParticipant.role === "admin" ? "admin" : "user";
//             displayName = otherParticipant.name;
//             image = otherParticipant.profilePhoto
//               ? `http://localhost:5000/uploads/profiles/${otherParticipant.profilePhoto}`
//               : `https://ui-avatars.com/api/?background=3B82F6&color=fff&rounded=true&size=128&name=${displayName.charAt(0)}`;
//           }

//           setChatPartnerInfo({
//             name: displayName,
//             image: image,
//             role: role,
//             id: otherParticipant._id,
//           });
//         }
//       }
//     } catch (error) {
//       console.error("Error getting chat partner:", error);
//     }
//   };

//   // Load chat messages
//   const loadChatMessages = async (chatId) => {
//     try {
//       const response = await chatService.getChat(chatId);
//       if (response.success) {
//         const messages = response.data.messages || [];
//         const formattedMessages = messages.map((msg, index) => ({
//           id: msg._id || index,
//           message: msg.message,
//           timestamp: msg.createdAt,
//           isOwn:
//             msg.sender?._id ===
//             JSON.parse(localStorage.getItem("user") || "{}").id,
//           sender: msg.sender,
//           read: msg.read,
//           delivered: msg.delivered,
//         }));
//         setChatMessages(formattedMessages);
//         await chatService.markAsRead(chatId);
//       }
//     } catch (error) {
//       console.error("Error loading chat messages:", error);
//     }
//   };

//   // Send message in chat
//   const handleSendChatMessage = async () => {
//     if (!newMessage.trim() || sendingMessage) return;

//     setSendingMessage(true);
//     const messageText = newMessage;
//     const tempId = Date.now();

//     const tempMessage = {
//       id: tempId,
//       message: messageText,
//       timestamp: new Date(),
//       isOwn: true,
//       sending: true,
//     };
//     setChatMessages((prev) => [...prev, tempMessage]);
//     setNewMessage("");

//     try {
//       setTimeout(() => {
//         setChatMessages((prev) =>
//           prev.map((msg) =>
//             msg.id === tempId
//               ? { ...msg, sending: false, delivered: true }
//               : msg,
//           ),
//         );
//       }, 500);
//     } catch (error) {
//       console.error("Error sending message:", error);
//       setChatMessages((prev) =>
//         prev.map((msg) =>
//           msg.id === tempId ? { ...msg, error: true, sending: false } : msg,
//         ),
//       );
//       alert("Failed to send message. Please try again.");
//     } finally {
//       setSendingMessage(false);
//     }
//   };

//   // Chat with Vehicle Owner/Admin
//   const handleChatWithOwner = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("Please login to chat with the owner");
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
//     } catch (error) {
//       console.error("Error starting chat:", error);
//       if (vehicleDetails.source === "user") {
//         setChatPartnerInfo({
//           name: ownerDetails?.name || vehicleDetails.owner || "Vehicle Owner",
//           image:
//             getOwnerProfileImage() ||
//             `https://ui-avatars.com/api/?background=16A34A&color=fff&rounded=true&size=128&name=${(ownerDetails?.name || vehicleDetails.owner || "O").charAt(0)}`,
//           role: "owner",
//         });
//       } else {
//         setChatPartnerInfo({
//           name: "Support Team",
//           image: `https://ui-avatars.com/api/?background=6B21A5&color=fff&rounded=true&size=128&name=Support`,
//           role: "admin",
//         });
//       }
//       setShowChatModal(true);
//     } finally {
//       setChatLoading(false);
//     }
//   };

//   // Open chat with reviewer
//   const handleOpenReviewerChat = async (reviewer) => {
//     setSelectedReviewer(reviewer);
//     setChatLoading(true);

//     setChatPartnerInfo({
//       name: reviewer.name,
//       image: reviewer.profilePhoto
//         ? `http://localhost:5000/uploads/profiles/${reviewer.profilePhoto}`
//         : `https://ui-avatars.com/api/?background=3B82F6&color=fff&rounded=true&size=128&name=${reviewer.name?.charAt(0) || "U"}`,
//       role: "reviewer",
//     });

//     setShowChatModal(true);

//     try {
//       const response = await chatService.getSupportChat();
//       if (response.success) {
//         setActiveChatId(response.data._id);
//         await loadChatMessages(response.data._id);
//         await getChatPartnerFromChat(response.data._id);
//       }
//     } catch (error) {
//       console.error("Error opening reviewer chat:", error);
//       setChatMessages([
//         {
//           id: 1,
//           message: `Hi! I saw your review about ${vehicleDetails?.carName}. I'm interested in renting this vehicle. Can you share more about your experience?`,
//           timestamp: new Date(),
//           isOwn: true,
//         },
//         {
//           id: 2,
//           message:
//             "Thanks for reaching out! I'd be happy to help. The car was in excellent condition and very comfortable.",
//           timestamp: new Date(Date.now() - 60000),
//           isOwn: false,
//         },
//       ]);
//     } finally {
//       setChatLoading(false);
//     }
//   };

//   const getProfileImageUrl = (user) => {
//     if (user?.profilePhoto) {
//       return `http://localhost:5000/uploads/profiles/${user.profilePhoto}`;
//     }
//     return null;
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   const formatChatTime = (date) => {
//     return new Date(date).toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const renderStars = (rating, size = "text-sm") => {
//     return (
//       <div className="flex items-center gap-0.5">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <FaStar
//             key={star}
//             className={`${size} ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
//             fill={star <= rating ? "currentColor" : "none"}
//           />
//         ))}
//       </div>
//     );
//   };

//   const renderStarInput = () => {
//     return (
//       <div className="flex items-center gap-2 mb-4">
//         <span className="text-gray-700 font-medium">Your Rating:</span>
//         <div className="flex items-center gap-1">
//           {[1, 2, 3, 4, 5].map((star) => (
//             <button
//               key={star}
//               type="button"
//               onClick={() => setNewRating(star)}
//               className="focus:outline-none transition-transform hover:scale-110"
//             >
//               <FaStar
//                 className={`text-2xl ${star <= newRating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
//               />
//             </button>
//           ))}
//         </div>
//       </div>
//     );
//   };

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
//       basePrice: basePrice,
//       driverFee: driverFee,
//       insuranceFee: insuranceFee,
//       serviceFee: serviceFee,
//       total: basePrice + driverFee + insuranceFee + serviceFee,
//     };
//   };

//   const totals = calculateTotal();

//   const formatNPR = (amount) => {
//     return "रु " + amount.toLocaleString("en-NP");
//   };

//   const calculateReturnDate = () => {
//     if (!selectedDate) return "";
//     const pickupDate = new Date(selectedDate);
//     const returnDate = new Date(pickupDate);
//     returnDate.setDate(returnDate.getDate() + bookingDays);
//     return returnDate.toISOString().split("T")[0];
//   };

//   const handleBookNow = async () => {
//     const token =
//       localStorage.getItem("token") || sessionStorage.getItem("token");
//     if (!token) {
//       alert("Please login to book a vehicle");
//       navigate("/login");
//       return;
//     }

//     if (!vehicleDetails) {
//       alert("Please select a vehicle first");
//       return;
//     }

//     if (!selectedDate) {
//       alert("Please select a pickup date");
//       return;
//     }

//     if (!emergencyContact.name || !emergencyContact.phone) {
//       alert("Please provide emergency contact information");
//       return;
//     }

//     setSubmitting(true);

//     try {
//       const returnDate = calculateReturnDate();
//       const pickupDateTime = new Date(selectedDate);
//       const returnDateTime = new Date(returnDate);

//       const bookingData = {
//         vehicleId: vehicleDetails._id,
//         pickupDate: pickupDateTime.toISOString(),
//         pickupTime: selectedTime,
//         returnDate: returnDateTime.toISOString(),
//         returnTime: selectedTime,
//         pickupLocation: pickupLocation,
//         dropoffLocation: dropoffLocation,
//         driverOption: driverOption,
//         insuranceOption: insuranceOption,
//         specialRequests: specialRequests,
//         emergencyContact: emergencyContact,
//         vehicleSource: vehicleDetails.source || "admin",
//       };

//       const response = await axiosInstance.post("/bookings", bookingData);

//       if (!response.data?.data?.booking?.id) {
//         throw new Error("No booking ID received from server");
//       }

//       navigate("/upload-documents", {
//         state: {
//           bookingId: response.data.data.booking.id,
//           confirmationCode: response.data.data.booking.confirmationCode,
//           vehicleDetails: vehicleDetails,
//           driverOption: driverOption,
//           bookingDetails: {
//             ...bookingData,
//             totalAmount: totals.total,
//             formattedTotal: formatNPR(totals.total),
//           },
//         },
//       });
//     } catch (error) {
//       console.error("Booking error:", error);
//       alert(error.response?.data?.message || "Failed to create booking");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const getVehicleImage = () => {
//     if (
//       !vehicleDetails ||
//       !vehicleDetails.photos ||
//       vehicleDetails.photos.length === 0
//     ) {
//       return "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80";
//     }

//     const extraView = vehicleDetails.photos.find(
//       (photo) => photo.label === "Extra View",
//     );
//     const photo = extraView || vehicleDetails.photos[0];
//     const folder =
//       vehicleDetails.source === "user" ? "user-vehicles" : "vehicles";
//     return `http://localhost:5000/uploads/${folder}/${photo.filename}`;
//   };

//   const getVehicleImages = () => {
//     if (
//       !vehicleDetails ||
//       !vehicleDetails.photos ||
//       vehicleDetails.photos.length === 0
//     ) {
//       return [
//         "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
//       ];
//     }

//     const folder =
//       vehicleDetails.source === "user" ? "user-vehicles" : "vehicles";
//     return vehicleDetails.photos.map(
//       (photo) => `http://localhost:5000/uploads/${folder}/${photo.filename}`,
//     );
//   };

//   const getVehicleFeatures = () => {
//     if (!vehicleDetails) return [];
//     const features = [];
//     if (vehicleDetails.features && Array.isArray(vehicleDetails.features)) {
//       features.push(...vehicleDetails.features);
//     }
//     if (vehicleDetails.airCondition === "Yes") {
//       features.push("Air Conditioning");
//     }
//     if (vehicleDetails.gearType) {
//       features.push(`${vehicleDetails.gearType} Transmission`);
//     }
//     if (vehicleDetails.seats) {
//       features.push(`${vehicleDetails.seats} Seats`);
//     }
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
//                 <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg">
//                   <FaCar className="text-white text-2xl" />
//                 </div>
//                 <h1 className="text-2xl font-bold text-gray-900">
//                   Rent<span className="text-blue-600">Ride</span>
//                 </h1>
//               </div>
//             </div>
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={() => navigate("/profiledetails")}
//                 className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
//               >
//                 My Bookings
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="container mx-auto px-6 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Vehicle Details & Booking Form */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Vehicle Details Card */}
//             <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//               <div className="p-8">
//                 <div className="flex flex-col lg:flex-row gap-8">
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
//                           <div className="flex items-center bg-gradient-to-r from-yellow-400 to-orange-400 px-4 py-2 rounded-full">
//                             <span className="text-2xl font-bold text-white mr-2">
//                               {averageRating.toFixed(1)}
//                             </span>
//                             {renderStars(
//                               Math.round(averageRating),
//                               "text-sm text-white",
//                             )}
//                           </div>
//                           <span className="text-gray-600">
//                             {totalReviews}{" "}
//                             {totalReviews === 1 ? "review" : "reviews"}
//                           </span>
//                         </div>
//                       </div>
//                       <div className="text-right">
//                         <div className="text-4xl font-bold text-blue-600">
//                           {formatNPR(vehicleDetails.ratePerDay || 5000)}
//                         </div>
//                         <div className="text-gray-500">प्रति दिन</div>
//                         <div
//                           className={`mt-2 px-3 py-1 rounded-full text-sm font-medium ${vehicleDetails.status === "Available" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
//                         >
//                           {vehicleDetails.status || "Available"}
//                         </div>
//                         {/* Chat Button - Single line */}
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

//             {/* Booking Form */}
//             <div className="bg-white rounded-2xl shadow-lg p-8">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                 Booking Details
//               </h2>
//               <div className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       <div className="flex items-center gap-2">
//                         <FaCalendarAlt className="text-blue-600" />
//                         Pickup Date
//                       </div>
//                     </label>
//                     <input
//                       type="date"
//                       value={selectedDate}
//                       onChange={(e) => setSelectedDate(e.target.value)}
//                       min={new Date().toISOString().split("T")[0]}
//                       className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       required
//                     />
//                     <p className="text-sm text-gray-500 mt-1">
//                       Return date:{" "}
//                       {calculateReturnDate() || "Select pickup date first"}
//                     </p>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       <div className="flex items-center gap-2">
//                         <FaClock className="text-blue-600" />
//                         Pickup Time
//                       </div>
//                     </label>
//                     <div className="flex flex-wrap gap-2">
//                       {timeSlots.map((time) => (
//                         <button
//                           key={time}
//                           onClick={() => setSelectedTime(time)}
//                           className={`px-4 py-2 rounded-lg transition-all duration-300 ${selectedTime === time ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
//                         >
//                           {time}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       <div className="flex items-center gap-2">
//                         <FaMapMarkerAlt className="text-blue-600" />
//                         Pickup Location
//                       </div>
//                     </label>
//                     <input
//                       type="text"
//                       value={pickupLocation}
//                       onChange={(e) => setPickupLocation(e.target.value)}
//                       className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl"
//                       placeholder="Enter pickup location"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       <div className="flex items-center gap-2">
//                         <FaMapMarkerAlt className="text-green-600" />
//                         Drop-off Location
//                       </div>
//                     </label>
//                     <input
//                       type="text"
//                       value={dropoffLocation}
//                       onChange={(e) => setDropoffLocation(e.target.value)}
//                       className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl"
//                       placeholder="Enter drop-off location"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Rental Duration
//                   </label>
//                   <div className="flex items-center gap-4">
//                     <button
//                       onClick={() =>
//                         setBookingDays(Math.max(1, bookingDays - 1))
//                       }
//                       className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-bold text-xl"
//                     >
//                       -
//                     </button>
//                     <div className="text-center">
//                       <div className="text-3xl font-bold text-gray-900">
//                         {bookingDays} day{bookingDays > 1 ? "s" : ""}
//                       </div>
//                       <div className="text-gray-500 text-sm">
//                         Total:{" "}
//                         {formatNPR(
//                           (vehicleDetails.ratePerDay || 5000) * bookingDays,
//                         )}
//                       </div>
//                     </div>
//                     <button
//                       onClick={() => setBookingDays(bookingDays + 1)}
//                       className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-bold text-xl"
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//                 {(availableOptions.withDriver ||
//                   availableOptions.withoutDriver) && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-3">
//                       <div className="flex items-center gap-2">
//                         <FaUser className="text-blue-600" />
//                         Driver Option
//                       </div>
//                     </label>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       {availableOptions.withDriver && (
//                         <button
//                           onClick={() => setDriverOption("with")}
//                           className={`p-4 rounded-xl border-2 transition-all duration-300 ${driverOption === "with" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"}`}
//                         >
//                           <div className="text-left">
//                             <div className="font-semibold text-gray-900">
//                               With Driver
//                             </div>
//                             <div className="text-sm text-gray-600 mt-1">
//                               Professional driver included
//                             </div>
//                             <div className="text-blue-600 font-bold mt-2">
//                               +{formatNPR(500)}/day
//                             </div>
//                           </div>
//                         </button>
//                       )}
//                       {availableOptions.withoutDriver && (
//                         <button
//                           onClick={() => setDriverOption("without")}
//                           className={`p-4 rounded-xl border-2 transition-all duration-300 ${driverOption === "without" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"}`}
//                         >
//                           <div className="text-left">
//                             <div className="font-semibold text-gray-900">
//                               Self Drive
//                             </div>
//                             <div className="text-sm text-gray-600 mt-1">
//                               Drive yourself
//                             </div>
//                             <div className="text-green-600 font-bold mt-2">
//                               No extra cost
//                             </div>
//                           </div>
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 )}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-3">
//                     <div className="flex items-center gap-2">
//                       <FaShieldAlt className="text-blue-600" />
//                       Insurance Coverage
//                     </div>
//                   </label>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <button
//                       onClick={() => setInsuranceOption("basic")}
//                       className={`p-4 rounded-xl border-2 transition-all duration-300 ${insuranceOption === "basic" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"}`}
//                     >
//                       <div className="text-left">
//                         <div className="font-semibold text-gray-900">
//                           Basic Coverage
//                         </div>
//                         <div className="text-sm text-gray-600 mt-1">
//                           Standard protection
//                         </div>
//                         <div className="text-green-600 font-bold mt-2">
//                           Included
//                         </div>
//                       </div>
//                     </button>
//                     <button
//                       onClick={() => setInsuranceOption("premium")}
//                       className={`p-4 rounded-xl border-2 transition-all duration-300 ${insuranceOption === "premium" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"}`}
//                     >
//                       <div className="text-left">
//                         <div className="font-semibold text-gray-900">
//                           Premium Coverage
//                         </div>
//                         <div className="text-sm text-gray-600 mt-1">
//                           Full protection with zero deductible
//                         </div>
//                         <div className="text-blue-600 font-bold mt-2">
//                           +{formatNPR(1500)}/day
//                         </div>
//                       </div>
//                     </button>
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-3">
//                     <div className="flex items-center gap-2">
//                       <FaPhone className="text-blue-600" />
//                       Emergency Contact
//                     </div>
//                   </label>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <input
//                       type="text"
//                       value={emergencyContact.name}
//                       onChange={(e) =>
//                         setEmergencyContact({
//                           ...emergencyContact,
//                           name: e.target.value,
//                         })
//                       }
//                       className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl"
//                       placeholder="Full Name"
//                       required
//                     />
//                     <input
//                       type="tel"
//                       value={emergencyContact.phone}
//                       onChange={(e) =>
//                         setEmergencyContact({
//                           ...emergencyContact,
//                           phone: e.target.value,
//                         })
//                       }
//                       className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl"
//                       placeholder="Phone Number"
//                       required
//                     />
//                     <input
//                       type="text"
//                       value={emergencyContact.relationship}
//                       onChange={(e) =>
//                         setEmergencyContact({
//                           ...emergencyContact,
//                           relationship: e.target.value,
//                         })
//                       }
//                       className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl"
//                       placeholder="Relationship"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Special Requests (Optional)
//                   </label>
//                   <textarea
//                     value={specialRequests}
//                     onChange={(e) => setSpecialRequests(e.target.value)}
//                     rows="3"
//                     className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl"
//                     placeholder="Any special requests or requirements?"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Pricing Summary & Reviews */}
//           <div className="space-y-8">
//             {/* Pricing Summary */}
//             <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
//               <h2 className="text-xl font-bold text-gray-900 mb-6">
//                 Pricing Summary
//               </h2>
//               <div className="space-y-4">
//                 <div className="flex justify-between py-2">
//                   <span className="text-gray-600">Base Price</span>
//                   <span className="font-semibold">
//                     {formatNPR(totals.basePrice)}
//                   </span>
//                 </div>
//                 {totals.driverFee > 0 && (
//                   <div className="flex justify-between py-2">
//                     <span className="text-gray-600">Driver Fee</span>
//                     <span className="font-semibold">
//                       {formatNPR(totals.driverFee)}
//                     </span>
//                   </div>
//                 )}
//                 {totals.insuranceFee > 0 && (
//                   <div className="flex justify-between py-2">
//                     <span className="text-gray-600">Premium Insurance</span>
//                     <span className="font-semibold">
//                       {formatNPR(totals.insuranceFee)}
//                     </span>
//                   </div>
//                 )}
//                 <div className="flex justify-between py-2">
//                   <span className="text-gray-600">Service Fee</span>
//                   <span className="font-semibold">
//                     {formatNPR(totals.serviceFee)}
//                   </span>
//                 </div>
//                 <div className="border-t pt-4 mt-2">
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
//                   disabled={submitting}
//                   className="w-full mt-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50"
//                 >
//                   <div className="flex items-center justify-center gap-2">
//                     {submitting ? (
//                       <>
//                         <FaSpinner className="animate-spin" /> Processing...
//                       </>
//                     ) : (
//                       <>
//                         <FaCreditCard /> Continue to Document Upload
//                       </>
//                     )}
//                   </div>
//                 </button>
//                 <div className="text-center mt-4">
//                   <p className="text-gray-500 text-sm">
//                     Free cancellation up to 24 hours before pickup • 24/7
//                     support
//                   </p>
//                   <p className="text-blue-600 text-xs mt-2">
//                     Next: Upload your documents for verification
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Ratings and Reviews */}
//             <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-[calc(24rem+2rem)]">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-xl font-bold text-gray-900">
//                   Ratings & Reviews
//                 </h2>
//                 <button
//                   onClick={() => setShowChartModal(true)}
//                   className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
//                 >
//                   <FaChartBar className="text-blue-600" />
//                   <span className="text-sm">Chart</span>
//                 </button>
//               </div>

//               {/* Overall Rating */}
//               <div className="flex items-center gap-6 mb-8">
//                 <div className="text-center">
//                   <div className="text-5xl font-bold text-gray-900">
//                     {averageRating.toFixed(1)}
//                   </div>
//                   <div className="flex items-center justify-center mt-2">
//                     {renderStars(Math.round(averageRating), "text-sm")}
//                   </div>
//                   <div className="text-gray-600 text-sm mt-1">
//                     {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
//                   </div>
//                 </div>
//                 <div className="flex-1">
//                   {ratingDistribution.map((item) => (
//                     <div
//                       key={item.stars}
//                       className="flex items-center gap-3 mb-2"
//                     >
//                       <div className="flex items-center w-16">
//                         <span className="text-sm text-gray-600 w-4">
//                           {item.stars}
//                         </span>
//                         <FaStar className="text-yellow-400 ml-1 text-sm" />
//                       </div>
//                       <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
//                         <div
//                           className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
//                           style={{ width: `${item.percentage}%` }}
//                         ></div>
//                       </div>
//                       <span className="text-sm text-gray-600 w-10 text-right">
//                         {item.percentage.toFixed(0)}%
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Review Form */}
//               {hasBookedThisVehicle && !userReview && !showReviewForm && (
//                 <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <FaCheckCircle className="text-green-600 text-lg mb-2" />
//                       <p className="text-green-800 font-medium">
//                         You've booked this vehicle!
//                       </p>
//                       <p className="text-green-600 text-sm">
//                         Share your experience with others
//                       </p>
//                     </div>
//                     <button
//                       onClick={() => setShowReviewForm(true)}
//                       className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
//                     >
//                       Write a Review
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {userReview && !editingReview && !showReviewForm && (
//                 <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
//                   <div className="flex items-center justify-between mb-3">
//                     <div className="flex items-center gap-2">
//                       <FaStar className="text-yellow-400" />
//                       <span className="font-semibold">Your Review</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <button
//                         onClick={handleEditReview}
//                         className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg"
//                       >
//                         <FaEdit />
//                       </button>
//                       <button
//                         onClick={handleDeleteReview}
//                         disabled={deletingReview}
//                         className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg"
//                       >
//                         {deletingReview ? (
//                           <FaSpinner className="animate-spin" />
//                         ) : (
//                           <FaTrash />
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2 mb-2">
//                     {renderStars(userReview.rating, "text-sm")}
//                     <span className="text-sm text-gray-500">
//                       {formatDate(userReview.createdAt)}
//                     </span>
//                   </div>
//                   <p className="text-gray-700">{userReview.comment}</p>
//                 </div>
//               )}

//               {showReviewForm && (
//                 <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="font-semibold text-gray-900">
//                       {editingReview ? "Edit Your Review" : "Write a Review"}
//                     </h3>
//                     <button
//                       onClick={() => {
//                         setShowReviewForm(false);
//                         setEditingReview(false);
//                         setNewRating(5);
//                         setNewComment("");
//                       }}
//                       className="text-gray-400 hover:text-gray-600"
//                     >
//                       <FaTimesCircle />
//                     </button>
//                   </div>
//                   {renderStarInput()}
//                   <textarea
//                     value={newComment}
//                     onChange={(e) => setNewComment(e.target.value)}
//                     rows="4"
//                     className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
//                     placeholder="Share your experience with this vehicle..."
//                   />
//                   <div className="flex justify-end gap-3">
//                     <button
//                       onClick={() => {
//                         setShowReviewForm(false);
//                         setEditingReview(false);
//                         setNewRating(5);
//                         setNewComment("");
//                       }}
//                       className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       onClick={
//                         editingReview ? handleUpdateReview : handleSubmitReview
//                       }
//                       disabled={submittingReview}
//                       className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
//                     >
//                       {submittingReview ? (
//                         <>
//                           <FaSpinner className="animate-spin inline mr-2" />{" "}
//                           Submitting...
//                         </>
//                       ) : editingReview ? (
//                         "Update Review"
//                       ) : (
//                         "Submit Review"
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {!hasBookedThisVehicle && (
//                 <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-xl">
//                   <div className="flex items-center gap-3">
//                     <FaInfoCircle className="text-blue-500 text-xl" />
//                     <div>
//                       <p className="text-gray-800 font-medium">
//                         You must book this vehicle before leaving a review
//                       </p>
//                       <p className="text-gray-500 text-sm">
//                         Complete your booking and come back to share your
//                         experience
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Reviews List */}
//               {reviewsLoading ? (
//                 <div className="text-center py-8">
//                   <FaSpinner className="animate-spin text-blue-600 text-2xl mx-auto" />
//                   <p className="text-gray-500 mt-2">Loading reviews...</p>
//                 </div>
//               ) : reviews.length === 0 ? (
//                 <div className="text-center py-8">
//                   <p className="text-gray-500">No reviews yet</p>
//                   {hasBookedThisVehicle && !userReview && (
//                     <button
//                       onClick={() => setShowReviewForm(true)}
//                       className="mt-3 text-blue-600 hover:text-blue-700 font-medium"
//                     >
//                       Be the first to review this vehicle!
//                     </button>
//                   )}
//                 </div>
//               ) : (
//                 <div className="space-y-6 max-h-96 overflow-y-auto pr-2">
//                   {reviews.map((review) => (
//                     <div
//                       key={review._id}
//                       className="border-b border-gray-100 pb-6 last:border-0"
//                     >
//                       <div className="flex items-start justify-between mb-3">
//                         <div className="flex items-center gap-3">
//                           {getProfileImageUrl(review.user) ? (
//                             <img
//                               src={getProfileImageUrl(review.user)}
//                               alt={review.user?.name}
//                               className="w-10 h-10 rounded-full object-cover"
//                             />
//                           ) : (
//                             <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
//                               {review.user?.name?.charAt(0).toUpperCase() ||
//                                 "U"}
//                             </div>
//                           )}
//                           <div>
//                             <h4 className="font-semibold text-gray-900">
//                               {review.user?.name || "Anonymous User"}
//                             </h4>
//                             <p className="text-gray-500 text-xs">
//                               {formatDate(review.createdAt)}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           {renderStars(review.rating, "text-sm")}
//                           <button
//                             onClick={() => handleOpenReviewerChat(review.user)}
//                             className="ml-2 p-1.5 text-blue-600 hover:bg-blue-50 rounded-full transition"
//                             title="Start conversation"
//                           >
//                             <FaComments size={14} />
//                           </button>
//                         </div>
//                       </div>
//                       <p className="text-gray-700 mb-3">{review.comment}</p>
//                       <div className="flex items-center gap-4">
//                         <button
//                           onClick={(e) => handleToggleHelpful(review._id, e)}
//                           className={`flex items-center gap-2 text-sm transition-all duration-200 ${review.hasLiked ? "text-red-500" : "text-gray-500 hover:text-red-500"}`}
//                         >
//                           {review.hasLiked ? (
//                             <FaHeart className="text-red-500" />
//                           ) : (
//                             <FaRegHeart />
//                           )}
//                           <span>{review.helpful || 0}</span>
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
//         <div className="fixed inset-0 z-[100]">
//           <div
//             className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//             onClick={() => setShowChartModal(false)}
//           ></div>
//           <div className="absolute inset-0 flex items-center justify-center p-4">
//             <div className="bg-white rounded-2xl max-w-md w-full p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-xl font-bold text-gray-900">
//                   Rating Distribution
//                 </h3>
//                 <button
//                   onClick={() => setShowChartModal(false)}
//                   className="text-gray-400 hover:text-gray-600"
//                 >
//                   <FaTimesCircle size={24} />
//                 </button>
//               </div>
//               <div className="space-y-4">
//                 {ratingDistribution.map((item) => (
//                   <div key={item.stars}>
//                     <div className="flex items-center justify-between mb-1">
//                       <div className="flex items-center gap-1">
//                         <span className="text-sm font-medium">
//                           {item.stars}
//                         </span>
//                         <FaStar className="text-yellow-400 text-sm" />
//                       </div>
//                       <span className="text-sm text-gray-600">
//                         {item.count} reviews
//                       </span>
//                     </div>
//                     <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
//                       <div
//                         className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
//                         style={{ width: `${item.percentage}%` }}
//                       ></div>
//                     </div>
//                     <p className="text-xs text-gray-500 text-right mt-1">
//                       {item.percentage.toFixed(0)}%
//                     </p>
//                   </div>
//                 ))}
//                 <div className="pt-4 border-t text-center">
//                   <p className="text-gray-600">Total Reviews: {totalReviews}</p>
//                   <p className="text-gray-500 text-sm mt-1">
//                     Average Rating: {averageRating.toFixed(1)} / 5
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Chat Modal - No Full Page Option */}
//       {showChatModal && (
//         <div className="fixed inset-0 z-[100] p-4">
//           <div
//             className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//             onClick={() => setShowChatModal(false)}
//           ></div>
//           <div className="absolute inset-0 flex items-center justify-center p-4">
//             <div className="bg-white rounded-2xl w-full max-w-md h-[550px] flex flex-col shadow-2xl overflow-hidden">
//               {/* Chat Header */}
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

//               {/* Chat Messages */}
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
//                   chatMessages.map((msg) => (
//                     <div
//                       key={msg.id}
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
//                         className={`max-w-[70%] rounded-2xl px-4 py-2 ${msg.isOwn ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-sm" : "bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-sm"}`}
//                       >
//                         <p className="text-sm break-words">{msg.message}</p>
//                         <div
//                           className={`text-xs mt-1 flex items-center gap-1 ${msg.isOwn ? "text-blue-100" : "text-gray-400"}`}
//                         >
//                           <span>{formatChatTime(msg.timestamp)}</span>
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
//               </div>

//               {/* Chat Input */}
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
//               <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg">
//                 <FaCar className="text-white" />
//               </div>
//               <h3 className="text-xl font-bold">
//                 Rent<span className="text-blue-400">Ride</span>
//               </h3>
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
  FaSmile,
  FaArrowRight,
  FaCheck,
  FaEye,
  FaRegCommentDots,
  FaTimes,
} from "react-icons/fa";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Configure axios with token
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Chat Service with real API calls
const chatService = {
  getVehicleChat: async (vehicleId, vehicleType) => {
    const response = await axiosInstance.post("/chats/vehicle", {
      vehicleId,
      vehicleType,
    });
    return response.data;
  },
  getSupportChat: async () => {
    const response = await axiosInstance.post("/chats/support");
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
  getUserChats: async () => {
    const response = await axiosInstance.get("/chats/my-chats");
    return response.data;
  },
};

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { vehicleId } = useParams();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("09:00");
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
    relationship: "",
  });

  // Review States
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
  const [userBookingStatus, setUserBookingStatus] = useState(null);
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

  // Like tracking with heart - stored in localStorage
  const [likedReviews, setLikedReviews] = useState(new Set());

  // Chat States
  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedReviewer, setSelectedReviewer] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const [activeChatId, setActiveChatId] = useState(null);
  const [ownerDetails, setOwnerDetails] = useState(null);
  const [chatPartnerInfo, setChatPartnerInfo] = useState(null);
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

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

  // Load liked reviews from localStorage
  useEffect(() => {
    const storedLikes = localStorage.getItem("likedReviews");
    if (storedLikes) {
      setLikedReviews(new Set(JSON.parse(storedLikes)));
    }
  }, []);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  // Determine available driver options
  const getAvailableDriverOptions = () => {
    if (!vehicleDetails) return { withDriver: false, withoutDriver: false };
    const bookingType = vehicleDetails.bookingType || "";
    if (bookingType.toLowerCase() === "both") {
      return { withDriver: true, withoutDriver: true };
    } else if (bookingType.toLowerCase().includes("with driver")) {
      return { withDriver: true, withoutDriver: false };
    } else if (bookingType.toLowerCase().includes("without driver")) {
      return { withDriver: false, withoutDriver: true };
    } else {
      return { withDriver: true, withoutDriver: true };
    }
  };

  const availableOptions = getAvailableDriverOptions();

  useEffect(() => {
    if (!availableOptions.withDriver && availableOptions.withoutDriver) {
      setDriverOption("without");
    } else if (availableOptions.withDriver && !availableOptions.withoutDriver) {
      setDriverOption("with");
    }
  }, [vehicleDetails]);

  // Fetch vehicle data
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
          } catch (adminError) {
            try {
              const userResponse = await axios.get(
                `http://localhost:5000/api/user-vehicles/public/${vehicleId}`,
                { timeout: 10000 },
              );
              if (userResponse.data.success && userResponse.data.data) {
                const userVehicle = userResponse.data.data;
                vehicleData = {
                  _id: userVehicle._id,
                  carName: userVehicle.carName,
                  carNumber: userVehicle.carNumber,
                  carType: userVehicle.carType,
                  ratePerDay: userVehicle.ratePerDay,
                  seats: userVehicle.seats,
                  bookingType: userVehicle.bookingType,
                  gearType: userVehicle.gearType,
                  airCondition: userVehicle.airCondition,
                  description: userVehicle.description,
                  features: userVehicle.features,
                  photos: userVehicle.photos,
                  phoneNumber: userVehicle.phoneNumber,
                  driverName: userVehicle.driverName,
                  status: "Available",
                  source: "user",
                  owner: userVehicle.fullName,
                  ownerPhone: userVehicle.phoneNumber,
                  userId: userVehicle.userId || userVehicle.user,
                };
                if (vehicleData.userId) {
                  await fetchOwnerDetails(vehicleData.userId);
                }
              }
            } catch (userError) {
              console.error("Vehicle not found");
            }
          }

          if (vehicleData) {
            setVehicleDetails(vehicleData);
          } else {
            setError("Vehicle not found");
          }
        } else {
          setError("No vehicle selected");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load vehicle details");
        setLoading(false);
      }
    };

    fetchData();
  }, [location, vehicleId]);

  // Fetch owner details
  const fetchOwnerDetails = async (userId) => {
    try {
      const response = await axiosInstance.get(`/profile/user/${userId}`);
      if (response.data.success) {
        setOwnerDetails(response.data.user);
      }
    } catch (error) {
      console.error("Error fetching owner details:", error);
    }
  };

  // Get owner profile image URL
  const getOwnerProfileImage = () => {
    if (ownerDetails?.profilePhoto) {
      return `http://localhost:5000/uploads/profiles/${ownerDetails.profilePhoto}`;
    }
    return null;
  };

  // Fetch reviews and user booking status
  useEffect(() => {
    if (vehicleDetails && vehicleDetails._id) {
      fetchReviews();
      checkUserBookingStatus();
    }
  }, [vehicleDetails]);

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

        const likedReviewIds = response.data.data.reviews
          .filter((review) => review.hasLiked)
          .map((review) => review._id);
        setLikedReviews(new Set(likedReviewIds));
        localStorage.setItem("likedReviews", JSON.stringify(likedReviewIds));
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
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
      if (idx >= 0 && idx < 5) {
        distribution[idx].count++;
      }
    });

    const total = reviewsList.length;
    distribution.forEach((item) => {
      item.percentage = total > 0 ? (item.count / total) * 100 : 0;
    });

    setRatingDistribution(distribution);
  };

  const checkUserBookingStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setHasBookedThisVehicle(false);
        return;
      }

      const response = await axiosInstance.get(
        `/bookings/user/vehicle/${vehicleDetails._id}/status`,
      );

      if (response.data.success) {
        setHasBookedThisVehicle(response.data.data.hasBooked);
        setUserBookingStatus(response.data.data.status);

        if (response.data.data.hasBooked) {
          const reviewResponse = await axiosInstance.get(
            `/reviews/user/vehicle/${vehicleDetails._id}`,
          );
          if (reviewResponse.data.success && reviewResponse.data.data) {
            setUserReview(reviewResponse.data.data);
          }
        }
      }
    } catch (error) {
      console.error("Error checking booking status:", error);
      setHasBookedThisVehicle(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!newComment.trim()) {
      alert("Please enter a review comment");
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
        alert("Review submitted successfully!");
        setShowReviewForm(false);
        setNewComment("");
        setNewRating(5);
        fetchReviews();
        checkUserBookingStatus();
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert(error.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleUpdateReview = async () => {
    if (!newComment.trim()) {
      alert("Please enter a review comment");
      return;
    }

    setSubmittingReview(true);
    try {
      const response = await axiosInstance.put(`/reviews/${userReview._id}`, {
        rating: newRating,
        comment: newComment,
      });

      if (response.data.success) {
        alert("Review updated successfully!");
        setEditingReview(false);
        setShowReviewForm(false);
        setNewComment("");
        setNewRating(5);
        fetchReviews();
        checkUserBookingStatus();
      }
    } catch (error) {
      console.error("Error updating review:", error);
      alert(error.response?.data?.message || "Failed to update review");
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleDeleteReview = async () => {
    if (!window.confirm("Are you sure you want to delete your review?")) {
      return;
    }

    setDeletingReview(true);
    try {
      const response = await axiosInstance.delete(`/reviews/${userReview._id}`);

      if (response.data.success) {
        alert("Review deleted successfully!");
        setUserReview(null);
        setShowReviewForm(false);
        setEditingReview(false);
        fetchReviews();
        checkUserBookingStatus();
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      alert(error.response?.data?.message || "Failed to delete review");
    } finally {
      setDeletingReview(false);
    }
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

    setReviews((prevReviews) =>
      prevReviews.map((r) => {
        if (r._id === reviewId) {
          return {
            ...r,
            hasLiked: !wasLiked,
            helpful: wasLiked ? r.helpful - 1 : r.helpful + 1,
          };
        }
        return r;
      }),
    );

    if (wasLiked) {
      const newLiked = new Set(likedReviews);
      newLiked.delete(reviewId);
      setLikedReviews(newLiked);
      localStorage.setItem("likedReviews", JSON.stringify([...newLiked]));
    } else {
      const newLiked = new Set(likedReviews);
      newLiked.add(reviewId);
      setLikedReviews(newLiked);
      localStorage.setItem("likedReviews", JSON.stringify([...newLiked]));
    }

    try {
      const response = await axiosInstance.post(`/reviews/${reviewId}/helpful`);

      if (response.data.success) {
        setReviews((prevReviews) =>
          prevReviews.map((r) => {
            if (r._id === reviewId) {
              return {
                ...r,
                hasLiked: response.data.isLiked,
                helpful: response.data.helpful,
              };
            }
            return r;
          }),
        );
      }
    } catch (error) {
      setReviews((prevReviews) =>
        prevReviews.map((r) => {
          if (r._id === reviewId) {
            return {
              ...r,
              hasLiked: wasLiked,
              helpful: wasLiked ? r.helpful + 1 : r.helpful - 1,
            };
          }
          return r;
        }),
      );

      if (wasLiked) {
        const revertLiked = new Set(likedReviews);
        revertLiked.add(reviewId);
        setLikedReviews(revertLiked);
        localStorage.setItem("likedReviews", JSON.stringify([...revertLiked]));
      } else {
        const revertLiked = new Set(likedReviews);
        revertLiked.delete(reviewId);
        setLikedReviews(revertLiked);
        localStorage.setItem("likedReviews", JSON.stringify([...revertLiked]));
      }

      console.error("Error toggling helpful:", error);
      alert(error.response?.data?.message || "Failed to update");
    }
  };

  // Get chat partner from chat ID
  const getChatPartnerFromChat = async (chatId) => {
    try {
      const response = await chatService.getChat(chatId);
      if (response.success) {
        const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
        const otherParticipant = response.data.participants.find(
          (p) => p._id !== currentUser.id,
        );

        if (otherParticipant) {
          let role = "user";
          let displayName = otherParticipant.name;
          let image = null;

          if (response.data.chatType === "vehicle") {
            if (otherParticipant.role === "admin") {
              role = "admin";
              displayName = "Support Team";
              image = `https://ui-avatars.com/api/?background=6B21A5&color=fff&rounded=true&size=128&name=Support`;
            } else if (vehicleDetails?.source === "user") {
              role = "owner";
              displayName =
                otherParticipant.name ||
                vehicleDetails.owner ||
                "Vehicle Owner";
              image = otherParticipant.profilePhoto
                ? `http://localhost:5000/uploads/profiles/${otherParticipant.profilePhoto}`
                : `https://ui-avatars.com/api/?background=16A34A&color=fff&rounded=true&size=128&name=${displayName.charAt(0)}`;
            } else {
              role = "support";
              displayName = "Support Team";
              image = `https://ui-avatars.com/api/?background=6B21A5&color=fff&rounded=true&size=128&name=Support`;
            }
          } else if (response.data.chatType === "support") {
            role = "support";
            displayName = "Support Team";
            image = `https://ui-avatars.com/api/?background=6B21A5&color=fff&rounded=true&size=128&name=Support`;
          } else {
            role = otherParticipant.role === "admin" ? "admin" : "user";
            displayName = otherParticipant.name;
            image = otherParticipant.profilePhoto
              ? `http://localhost:5000/uploads/profiles/${otherParticipant.profilePhoto}`
              : `https://ui-avatars.com/api/?background=3B82F6&color=fff&rounded=true&size=128&name=${displayName.charAt(0)}`;
          }

          setChatPartnerInfo({
            name: displayName,
            image: image,
            role: role,
            id: otherParticipant._id,
          });
        }
      }
    } catch (error) {
      console.error("Error getting chat partner:", error);
    }
  };

  // Load chat messages
  const loadChatMessages = async (chatId) => {
    try {
      const response = await chatService.getChat(chatId);
      if (response.success) {
        const messages = response.data.messages || [];
        const formattedMessages = messages.map((msg, index) => ({
          _id: msg._id || index,
          message: msg.message,
          createdAt: msg.createdAt,
          isOwn:
            msg.sender?._id ===
            JSON.parse(localStorage.getItem("user") || "{}").id,
          sender: msg.sender,
          read: msg.read,
          delivered: msg.delivered,
        }));
        setChatMessages(formattedMessages);
        await chatService.markAsRead(chatId);
      }
    } catch (error) {
      console.error("Error loading chat messages:", error);
    }
  };

  // Send message in chat - FIXED with real API call
  const handleSendChatMessage = async () => {
    if (!newMessage.trim() || sendingMessage || !activeChatId) return;

    const messageText = newMessage.trim();
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

    setSendingMessage(true);

    // Create temporary message for optimistic UI
    const tempMessage = {
      _id: `temp-${Date.now()}`,
      message: messageText,
      createdAt: new Date(),
      isOwn: true,
      sending: true,
      sender: {
        _id: currentUser.id,
        name: currentUser.name,
      },
    };

    setChatMessages((prev) => [...prev, tempMessage]);
    setNewMessage("");

    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    try {
      // Send real API request
      const response = await chatService.sendMessage(activeChatId, messageText);

      if (response.success) {
        // Replace temp message with real one
        setChatMessages((prev) =>
          prev.map((msg) =>
            msg._id === tempMessage._id ? response.data : msg,
          ),
        );
      } else {
        // Remove temp message on error
        setChatMessages((prev) =>
          prev.filter((msg) => msg._id !== tempMessage._id),
        );
        alert("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setChatMessages((prev) =>
        prev.filter((msg) => msg._id !== tempMessage._id),
      );
      alert(error.response?.data?.message || "Failed to send message");
    } finally {
      setSendingMessage(false);
    }
  };

  // Chat with Vehicle Owner/Admin - FIXED
  const handleChatWithOwner = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to chat with the owner");
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
    } catch (error) {
      console.error("Error starting chat:", error);
      alert(error.response?.data?.message || "Failed to start chat");
    } finally {
      setChatLoading(false);
    }
  };

  // Open chat with reviewer
  const handleOpenReviewerChat = async (reviewer) => {
    setSelectedReviewer(reviewer);
    setChatLoading(true);

    setChatPartnerInfo({
      name: reviewer.name,
      image: reviewer.profilePhoto
        ? `http://localhost:5000/uploads/profiles/${reviewer.profilePhoto}`
        : `https://ui-avatars.com/api/?background=3B82F6&color=fff&rounded=true&size=128&name=${reviewer.name?.charAt(0) || "U"}`,
      role: "reviewer",
    });

    setShowChatModal(true);

    try {
      const response = await chatService.getSupportChat();
      if (response.success) {
        setActiveChatId(response.data._id);
        await loadChatMessages(response.data._id);
        await getChatPartnerFromChat(response.data._id);
      }
    } catch (error) {
      console.error("Error opening reviewer chat:", error);
      alert("Failed to start chat with reviewer");
    } finally {
      setChatLoading(false);
    }
  };

  const getProfileImageUrl = (user) => {
    if (user?.profilePhoto) {
      return `http://localhost:5000/uploads/profiles/${user.profilePhoto}`;
    }
    return null;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatChatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderStars = (rating, size = "text-sm") => {
    return (
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
  };

  const renderStarInput = () => {
    return (
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
  };

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
      basePrice: basePrice,
      driverFee: driverFee,
      insuranceFee: insuranceFee,
      serviceFee: serviceFee,
      total: basePrice + driverFee + insuranceFee + serviceFee,
    };
  };

  const totals = calculateTotal();

  const formatNPR = (amount) => {
    return "रु " + amount.toLocaleString("en-NP");
  };

  const calculateReturnDate = () => {
    if (!selectedDate) return "";
    const pickupDate = new Date(selectedDate);
    const returnDate = new Date(pickupDate);
    returnDate.setDate(returnDate.getDate() + bookingDays);
    return returnDate.toISOString().split("T")[0];
  };

  const handleBookNow = async () => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      alert("Please login to book a vehicle");
      navigate("/login");
      return;
    }

    if (!vehicleDetails) {
      alert("Please select a vehicle first");
      return;
    }

    if (!selectedDate) {
      alert("Please select a pickup date");
      return;
    }

    if (!emergencyContact.name || !emergencyContact.phone) {
      alert("Please provide emergency contact information");
      return;
    }

    setSubmitting(true);

    try {
      const returnDate = calculateReturnDate();
      const pickupDateTime = new Date(selectedDate);
      const returnDateTime = new Date(returnDate);

      const bookingData = {
        vehicleId: vehicleDetails._id,
        pickupDate: pickupDateTime.toISOString(),
        pickupTime: selectedTime,
        returnDate: returnDateTime.toISOString(),
        returnTime: selectedTime,
        pickupLocation: pickupLocation,
        dropoffLocation: dropoffLocation,
        driverOption: driverOption,
        insuranceOption: insuranceOption,
        specialRequests: specialRequests,
        emergencyContact: emergencyContact,
        vehicleSource: vehicleDetails.source || "admin",
      };

      const response = await axiosInstance.post("/bookings", bookingData);

      if (!response.data?.data?.booking?.id) {
        throw new Error("No booking ID received from server");
      }

      navigate("/upload-documents", {
        state: {
          bookingId: response.data.data.booking.id,
          confirmationCode: response.data.data.booking.confirmationCode,
          vehicleDetails: vehicleDetails,
          driverOption: driverOption,
          bookingDetails: {
            ...bookingData,
            totalAmount: totals.total,
            formattedTotal: formatNPR(totals.total),
          },
        },
      });
    } catch (error) {
      console.error("Booking error:", error);
      alert(error.response?.data?.message || "Failed to create booking");
    } finally {
      setSubmitting(false);
    }
  };

  const getVehicleImage = () => {
    if (
      !vehicleDetails ||
      !vehicleDetails.photos ||
      vehicleDetails.photos.length === 0
    ) {
      return "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80";
    }

    const extraView = vehicleDetails.photos.find(
      (photo) => photo.label === "Extra View",
    );
    const photo = extraView || vehicleDetails.photos[0];
    const folder =
      vehicleDetails.source === "user" ? "user-vehicles" : "vehicles";
    return `http://localhost:5000/uploads/${folder}/${photo.filename}`;
  };

  const getVehicleImages = () => {
    if (
      !vehicleDetails ||
      !vehicleDetails.photos ||
      vehicleDetails.photos.length === 0
    ) {
      return [
        "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
      ];
    }

    const folder =
      vehicleDetails.source === "user" ? "user-vehicles" : "vehicles";
    return vehicleDetails.photos.map(
      (photo) => `http://localhost:5000/uploads/${folder}/${photo.filename}`,
    );
  };

  const getVehicleFeatures = () => {
    if (!vehicleDetails) return [];
    const features = [];
    if (vehicleDetails.features && Array.isArray(vehicleDetails.features)) {
      features.push(...vehicleDetails.features);
    }
    if (vehicleDetails.airCondition === "Yes") {
      features.push("Air Conditioning");
    }
    if (vehicleDetails.gearType) {
      features.push(`${vehicleDetails.gearType} Transmission`);
    }
    if (vehicleDetails.seats) {
      features.push(`${vehicleDetails.seats} Seats`);
    }
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
                <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg">
                  <FaCar className="text-white text-2xl" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Rent<span className="text-blue-600">Ride</span>
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/profiledetails")}
                className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
              >
                My Bookings
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Vehicle Details & Booking Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Vehicle Details Card - Keep your existing code */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* ... keep your existing vehicle details JSX ... */}
              <div className="p-8">
                <div className="flex flex-col lg:flex-row gap-8">
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
                          <div className="flex items-center bg-gradient-to-r from-yellow-400 to-orange-400 px-4 py-2 rounded-full">
                            <span className="text-2xl font-bold text-white mr-2">
                              {averageRating.toFixed(1)}
                            </span>
                            {renderStars(
                              Math.round(averageRating),
                              "text-sm text-white",
                            )}
                          </div>
                          <span className="text-gray-600">
                            {totalReviews}{" "}
                            {totalReviews === 1 ? "review" : "reviews"}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-4xl font-bold text-blue-600">
                          {formatNPR(vehicleDetails.ratePerDay || 5000)}
                        </div>
                        <div className="text-gray-500">प्रति दिन</div>
                        <div
                          className={`mt-2 px-3 py-1 rounded-full text-sm font-medium ${vehicleDetails.status === "Available" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
                        >
                          {vehicleDetails.status || "Available"}
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

            {/* Booking Form - Keep your existing code */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {/* ... keep your existing booking form JSX ... */}
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Booking Details
              </h2>
              <div className="space-y-6">
                {/* Date, Time, Location fields - keep existing */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-blue-600" />
                        Pickup Date
                      </div>
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Return date:{" "}
                      {calculateReturnDate() || "Select pickup date first"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <FaClock className="text-blue-600" />
                        Pickup Time
                      </div>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`px-4 py-2 rounded-lg transition-all duration-300 ${selectedTime === time ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-blue-600" />
                        Pickup Location
                      </div>
                    </label>
                    <input
                      type="text"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl"
                      placeholder="Enter pickup location"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-green-600" />
                        Drop-off Location
                      </div>
                    </label>
                    <input
                      type="text"
                      value={dropoffLocation}
                      onChange={(e) => setDropoffLocation(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl"
                      placeholder="Enter drop-off location"
                    />
                  </div>
                </div>
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
                {/* Driver Option, Insurance, Emergency Contact fields - keep existing */}
              </div>
            </div>
          </div>

          {/* Right Column - Pricing Summary & Reviews */}
          <div className="space-y-8">
            {/* Pricing Summary - Keep your existing code */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Pricing Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Base Price</span>
                  <span className="font-semibold">
                    {formatNPR(totals.basePrice)}
                  </span>
                </div>
                {totals.driverFee > 0 && (
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Driver Fee</span>
                    <span className="font-semibold">
                      {formatNPR(totals.driverFee)}
                    </span>
                  </div>
                )}
                {totals.insuranceFee > 0 && (
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Premium Insurance</span>
                    <span className="font-semibold">
                      {formatNPR(totals.insuranceFee)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Service Fee</span>
                  <span className="font-semibold">
                    {formatNPR(totals.serviceFee)}
                  </span>
                </div>
                <div className="border-t pt-4 mt-2">
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
                  disabled={submitting}
                  className="w-full mt-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50"
                >
                  <div className="flex items-center justify-center gap-2">
                    {submitting ? (
                      <>
                        <FaSpinner className="animate-spin" /> Processing...
                      </>
                    ) : (
                      <>
                        <FaCreditCard /> Continue to Document Upload
                      </>
                    )}
                  </div>
                </button>
              </div>
            </div>

            {/* Ratings and Reviews - Keep your existing code */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-[calc(24rem+2rem)]">
              {/* ... keep your existing reviews JSX ... */}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Modal - FIXED with real message sending */}
      {showChatModal && (
        <div className="fixed inset-0 z-[100] p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowChatModal(false)}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md h-[550px] flex flex-col shadow-2xl overflow-hidden">
              {/* Chat Header */}
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

              {/* Chat Messages */}
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
                          className={`text-xs mt-1 flex items-center gap-1 ${
                            msg.isOwn ? "text-blue-100" : "text-gray-400"
                          }`}
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

              {/* Chat Input */}
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
              <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg">
                <FaCar className="text-white" />
              </div>
              <h3 className="text-xl font-bold">
                Rent<span className="text-blue-400">Ride</span>
              </h3>
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
