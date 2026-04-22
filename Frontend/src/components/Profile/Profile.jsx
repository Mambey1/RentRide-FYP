// import React, { useState, useEffect, useRef, useCallback } from "react";
// import {
//   FaCar,
//   FaSignOutAlt,
//   FaUserEdit,
//   FaEnvelope,
//   FaVenusMars,
//   FaKey,
//   FaCheckCircle,
//   FaCamera,
//   FaTimes,
//   FaSave,
//   FaArrowLeft,
//   FaPlus,
//   FaList,
//   FaCalendarAlt,
//   FaClock,
//   FaMapMarkerAlt,
//   FaRupeeSign,
//   FaEye,
//   FaEdit,
//   FaTrash,
//   FaBars,
//   FaUserCircle,
//   FaInfoCircle,
//   FaFileAlt,
//   FaUser,
//   FaPhone,
//   FaSpinner,
//   FaTimesCircle,
//   FaWallet,
//   FaChartLine,
//   FaPercentage,
//   FaCreditCard,
//   FaShieldAlt,
//   FaUserFriends,
//   FaComments,
//   FaCommentDots,
//   FaHeadset,
//   FaPaperPlane,
//   FaSmile,
//   FaSync,
//   FaBan,
//   FaCheck,
//   FaCheckDouble,
//   FaLock,
//   FaUnlock,
//   FaSearch,
// } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Notification from "./Notification";
// import { useSocket } from "../../context/SocketContext";

// const chatService = {
//   getUserChats: async () => {
//     const token =
//       localStorage.getItem("token") || sessionStorage.getItem("token");
//     const response = await axios.get(
//       "http://localhost:5000/api/chats/my-chats",
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       },
//     );
//     return response.data;
//   },
//   getChat: async (chatId) => {
//     const token =
//       localStorage.getItem("token") || sessionStorage.getItem("token");
//     const response = await axios.get(
//       `http://localhost:5000/api/chats/${chatId}`,
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       },
//     );
//     return response.data;
//   },
//   markAsRead: async (chatId) => {
//     const token =
//       localStorage.getItem("token") || sessionStorage.getItem("token");
//     const response = await axios.put(
//       `http://localhost:5000/api/chats/${chatId}/read`,
//       {},
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       },
//     );
//     return response.data;
//   },
//   blockUser: async (chatId) => {
//     const token =
//       localStorage.getItem("token") || sessionStorage.getItem("token");
//     const response = await axios.put(
//       `http://localhost:5000/api/chats/${chatId}/block`,
//       {},
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       },
//     );
//     return response.data;
//   },
//   unblockUser: async (chatId) => {
//     const token =
//       localStorage.getItem("token") || sessionStorage.getItem("token");
//     const response = await axios.put(
//       `http://localhost:5000/api/chats/${chatId}/unblock`,
//       {},
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       },
//     );
//     return response.data;
//   },
//   sendMessage: async (chatId, message) => {
//     const token =
//       localStorage.getItem("token") || sessionStorage.getItem("token");
//     const response = await axios.post(
//       `http://localhost:5000/api/chats/${chatId}/message`,
//       { message },
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       },
//     );
//     return response.data;
//   },
//   getSupportChat: async () => {
//     const token =
//       localStorage.getItem("token") || sessionStorage.getItem("token");
//     const response = await axios.post(
//       "http://localhost:5000/api/chats/support",
//       {},
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       },
//     );
//     return response.data;
//   },
// };

// const ProfileDetails = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [editing, setEditing] = useState(false);
//   const [gender, setGender] = useState("Male");
//   const [name, setName] = useState("");
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [profilePhoto, setProfilePhoto] = useState(null);
//   const [photoPreview, setPhotoPreview] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const [activeTab, setActiveTab] = useState("profile");
//   const [bookings, setBookings] = useState([]);
//   const [userVehicles, setUserVehicles] = useState([]);
//   const [bookingsLoading, setBookingsLoading] = useState(false);
//   const [vehiclesLoading, setVehiclesLoading] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [hoveredItem, setHoveredItem] = useState(null);
//   const [showBookingModal, setShowBookingModal] = useState(false);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [showImageViewer, setShowImageViewer] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [cancellingBooking, setCancellingBooking] = useState(false);
//   const [showCancelConfirm, setShowCancelConfirm] = useState(false);
//   const [cancelReason, setCancelReason] = useState("");
//   const [earnings, setEarnings] = useState(null);
//   const [earningsLoading, setEarningsLoading] = useState(false);
//   const [selectedEarningVehicle, setSelectedEarningVehicle] = useState(null);
//   const [showEarningDetailsModal, setShowEarningDetailsModal] = useState(false);
//   const [paymentLoading, setPaymentLoading] = useState(false);
//   const [startingSupportChat, setStartingSupportChat] = useState(false);
//   const [processedMessageIds, setProcessedMessageIds] = useState(new Set());

//   // Chat states
//   const [chats, setChats] = useState([]);
//   const [chatsLoading, setChatsLoading] = useState(false);
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [showChatWindow, setShowChatWindow] = useState(false);
//   const [chatMessages, setChatMessages] = useState([]);
//   const [chatMessagesLoading, setChatMessagesLoading] = useState(false);
//   const [newChatMessage, setNewChatMessage] = useState("");
//   const [sendingMessage, setSendingMessage] = useState(false);
//   const [showBlockConfirm, setShowBlockConfirm] = useState(false);
//   const [showUnblockConfirm, setShowUnblockConfirm] = useState(false);
//   const [blockingUser, setBlockingUser] = useState(false);
//   const [unblockingUser, setUnblockingUser] = useState(false);
//   const [chatSearch, setChatSearch] = useState("");
//   const [localUnreadCount, setLocalUnreadCount] = useState(0);
//   const messagesEndRef = useRef(null);
//   const selectedChatRef = useRef(null);
//   const initialLoadDone = useRef(false);

//   const {
//     isConnected,
//     onNewMessage,
//     sendMessage: socketSendMessage,
//     unreadCount: socketUnreadCount,
//     resetUnreadCount,
//     joinChat,
//     leaveChat,
//     markRead,
//   } = useSocket();

//   const fileInputRef = useRef(null);
//   const navigate = useNavigate();

//   // Update local unread count when socket unread count changes
//   useEffect(() => {
//     setLocalUnreadCount(socketUnreadCount);
//   }, [socketUnreadCount]);

//   // Fetch user data on mount
//   useEffect(() => {
//     fetchUserProfile();
//     fetchNotifications();
//     fetchUserBookings();
//     fetchUserVehicles();
//     fetchUserEarnings();
//   }, []);

//   // Fetch chats when switching to messages tab
//   useEffect(() => {
//     if (activeTab === "messages" && !initialLoadDone.current) {
//       fetchUserChats();
//       initialLoadDone.current = true;
//     }
//   }, [activeTab]);

//   // Socket listener for new messages
//   useEffect(() => {
//     const unsubscribe = onNewMessage("*", (data) => {
//       if (!data.message) return;

//       // Prevent duplicate messages
//       const messageId = data.message._id;
//       if (messageId && processedMessageIds.has(messageId)) {
//         console.log("Duplicate message ignored:", messageId);
//         return;
//       }
//       if (messageId) {
//         setProcessedMessageIds((prev) => new Set([...prev, messageId]));
//         setTimeout(() => {
//           setProcessedMessageIds((prev) => {
//             const newSet = new Set(prev);
//             newSet.delete(messageId);
//             return newSet;
//           });
//         }, 5000);
//       }

//       setChats((prevChats) =>
//         prevChats.map((chat) => {
//           if (chat._id !== data.chatId) return chat;
//           const isCurrentlyOpen = selectedChatRef.current?._id === data.chatId;
//           const currentUnread = chat.unreadCounts?.[user?._id] || 0;
//           return {
//             ...chat,
//             lastMessage: data.message.message,
//             lastMessageAt: data.message.createdAt,
//             unreadCounts: {
//               ...chat.unreadCounts,
//               [user?._id]: isCurrentlyOpen ? 0 : currentUnread + 1,
//             },
//           };
//         }),
//       );

//       setChats((prev) => {
//         const total = prev.reduce((acc, chat) => {
//           return acc + (chat.unreadCounts?.[user?._id] || 0);
//         }, 0);
//         setLocalUnreadCount(total);
//         return prev;
//       });

//       if (selectedChatRef.current?._id === data.chatId) {
//         setChatMessages((prev) => {
//           if (prev.some((m) => m._id === data.message._id)) return prev;
//           return [...prev, data.message];
//         });
//         chatService.markAsRead(data.chatId);
//         markRead(data.chatId);
//       }
//     });
//     return unsubscribe;
//   }, [onNewMessage, user?._id, markRead]);

//   // Per-chat socket listener
//   useEffect(() => {
//     if (!selectedChat?._id) return;
//     const chatId = selectedChat._id;
//     selectedChatRef.current = selectedChat;

//     const unsubscribe = onNewMessage(chatId, (data) => {
//       if (!data.message) return;

//       // Prevent duplicate messages
//       const messageId = data.message._id;
//       if (messageId && processedMessageIds.has(messageId)) {
//         console.log("Duplicate message ignored in chat:", messageId);
//         return;
//       }
//       if (messageId) {
//         setProcessedMessageIds((prev) => new Set([...prev, messageId]));
//         setTimeout(() => {
//           setProcessedMessageIds((prev) => {
//             const newSet = new Set(prev);
//             newSet.delete(messageId);
//             return newSet;
//           });
//         }, 5000);
//       }

//       setChatMessages((prev) => {
//         if (prev.some((m) => m._id === data.message._id)) return prev;
//         const tempIdx = prev.findIndex(
//           (m) =>
//             m._id?.toString().startsWith("temp-") &&
//             m.message === data.message.message,
//         );
//         if (tempIdx !== -1) {
//           const next = [...prev];
//           next[tempIdx] = data.message;
//           return next;
//         }
//         return [...prev, data.message];
//       });
//       setTimeout(() => {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//       }, 100);
//       chatService.markAsRead(chatId);
//       markRead(chatId);
//     });

//     return unsubscribe;
//   }, [selectedChat?._id, onNewMessage, markRead]);

//   // Auto-scroll on new messages
//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [chatMessages]);

//   const fetchUserProfile = async () => {
//     try {
//       setError("");
//       setLoading(true);
//       const token =
//         localStorage.getItem("token") || sessionStorage.getItem("token");
//       if (!token) {
//         setError("Please login to view your profile");
//         setLoading(false);
//         return;
//       }
//       const response = await axios.get("http://localhost:5000/api/profile", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (response.data && response.data.success) {
//         const userData = response.data.user;
//         setUser(userData);
//         setName(userData.name || "");
//         setEmail(userData.email || "");
//         setUsername(userData.username || userData.email?.split("@")[0] || "");
//         setGender(userData.gender || "Male");
//         if (userData.profilePhoto)
//           setPhotoPreview(
//             `http://localhost:5000/uploads/profiles/${userData.profilePhoto}`,
//           );
//         setError("");
//       } else {
//         setError(response.data?.message || "Failed to load profile data");
//       }
//       setLoading(false);
//     } catch (error) {
//       let errorMessage = "Failed to load profile";
//       if (error.response?.status === 401) {
//         errorMessage = "Session expired.";
//         localStorage.removeItem("token");
//         sessionStorage.removeItem("token");
//       }
//       setError(errorMessage);
//       setLoading(false);
//     }
//   };

//   const fetchUserBookings = async () => {
//     try {
//       setBookingsLoading(true);
//       const token =
//         localStorage.getItem("token") || sessionStorage.getItem("token");
//       if (!token) return;
//       const response = await axios.get(
//         "http://localhost:5000/api/bookings/my-bookings",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       );
//       if (response.data.success) setBookings(response.data.data.bookings);
//     } catch (error) {
//       toast.error("Failed to load bookings");
//     } finally {
//       setBookingsLoading(false);
//     }
//   };

//   const fetchUserVehicles = async () => {
//     try {
//       setVehiclesLoading(true);
//       const token =
//         localStorage.getItem("token") || sessionStorage.getItem("token");
//       if (!token) return;
//       const response = await axios.get(
//         "http://localhost:5000/api/user-vehicles/my-vehicles",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       );
//       if (response.data.success) setUserVehicles(response.data.data.vehicles);
//     } catch (error) {
//       toast.error("Failed to load vehicles");
//     } finally {
//       setVehiclesLoading(false);
//     }
//   };

//   const fetchUserEarnings = async () => {
//     try {
//       setEarningsLoading(true);
//       const token =
//         localStorage.getItem("token") || sessionStorage.getItem("token");
//       if (!token) return;
//       const response = await axios.get(
//         "http://localhost:5000/api/user-vehicles/my-earnings",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       );
//       if (response.data.success) setEarnings(response.data.data);
//     } catch (error) {
//       toast.error("Failed to load earnings data");
//     } finally {
//       setEarningsLoading(false);
//     }
//   };

//   const fetchNotifications = async () => {
//     try {
//       const token =
//         localStorage.getItem("token") || sessionStorage.getItem("token");
//       if (!token) return;
//       const response = await axios.get(
//         "http://localhost:5000/api/notifications",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       );
//       if (response.data.success) setNotifications(response.data.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const fetchUserChats = async () => {
//     try {
//       setChatsLoading(true);
//       const token =
//         localStorage.getItem("token") || sessionStorage.getItem("token");
//       if (!token) return;
//       const response = await chatService.getUserChats();
//       if (response.success) {
//         setChats(response.data);
//         const totalUnread = response.data.reduce((acc, chat) => {
//           return acc + (chat.unreadCounts?.[user?._id] || 0);
//         }, 0);
//         setLocalUnreadCount(totalUnread);
//         if (resetUnreadCount) resetUnreadCount();
//       }
//     } catch (error) {
//       toast.error("Failed to load messages");
//     } finally {
//       setChatsLoading(false);
//     }
//   };

//   const fetchChatMessages = async (chatId) => {
//     try {
//       setChatMessagesLoading(true);
//       const response = await chatService.getChat(chatId);
//       if (response.success) {
//         setChatMessages(response.data.messages || []);
//         await chatService.markAsRead(chatId);
//         markRead(chatId);
//         setChats((prev) =>
//           prev.map((c) =>
//             c._id !== chatId
//               ? c
//               : {
//                   ...c,
//                   unreadCounts: { ...c.unreadCounts, [user?._id]: 0 },
//                 },
//           ),
//         );
//         const totalUnread = chats.reduce((acc, chat) => {
//           if (chat._id === chatId) return acc;
//           return acc + (chat.unreadCounts?.[user?._id] || 0);
//         }, 0);
//         setLocalUnreadCount(totalUnread);
//       }
//     } catch (error) {
//       toast.error("Failed to load messages");
//     } finally {
//       setChatMessagesLoading(false);
//     }
//   };

//   const handleOpenChat = async (chat) => {
//     if (selectedChatRef.current?._id) {
//       leaveChat(selectedChatRef.current._id);
//     }

//     setSelectedChat(chat);
//     setShowChatWindow(true);
//     joinChat(chat._id);

//     if (!chat.isBlocked) {
//       await fetchChatMessages(chat._id);
//     } else {
//       setChatMessages([]);
//     }

//     setTimeout(() => {
//       const input = document.querySelector(".chat-message-input");
//       if (input) input.focus();
//     }, 200);
//   };

//   const handleCloseChat = () => {
//     if (selectedChatRef.current?._id) {
//       leaveChat(selectedChatRef.current._id);
//     }
//     setShowChatWindow(false);
//     setSelectedChat(null);
//     setChatMessages([]);
//     setNewChatMessage("");
//     selectedChatRef.current = null;
//   };

//   const handleBlockUser = async () => {
//     if (!selectedChat) return;
//     setBlockingUser(true);
//     try {
//       const response = await chatService.blockUser(selectedChat._id);
//       if (response.success) {
//         toast.success(
//           `${getOtherParticipant(selectedChat)?.name} has been blocked`,
//         );
//         await fetchUserChats();
//         setSelectedChat((prev) => ({
//           ...prev,
//           isBlocked: true,
//           blockedBy: user?._id,
//         }));
//         setChatMessages([]);
//       }
//     } catch (error) {
//       toast.error("Failed to block user");
//     } finally {
//       setBlockingUser(false);
//       setShowBlockConfirm(false);
//     }
//   };

//   const handleUnblockUser = async () => {
//     if (!selectedChat) return;
//     setUnblockingUser(true);
//     try {
//       const response = await chatService.unblockUser(selectedChat._id);
//       if (response.success) {
//         toast.success(
//           `${getOtherParticipant(selectedChat)?.name} has been unblocked`,
//         );
//         await fetchUserChats();
//         const updatedChat = {
//           ...selectedChat,
//           isBlocked: false,
//           blockedBy: null,
//         };
//         setSelectedChat(updatedChat);
//         await fetchChatMessages(selectedChat._id);
//       }
//     } catch (error) {
//       toast.error("Failed to unblock user");
//     } finally {
//       setUnblockingUser(false);
//       setShowUnblockConfirm(false);
//     }
//   };

//   const handleSendChatMessage = async () => {
//     if (!newChatMessage.trim() || sendingMessage || selectedChat?.isBlocked)
//       return;

//     setSendingMessage(true);
//     const messageText = newChatMessage;
//     const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

//     const tempMessage = {
//       _id: `temp-${Date.now()}`,
//       message: messageText,
//       senderType: "user",
//       read: false,
//       delivered: false,
//       createdAt: new Date(),
//       sender: {
//         _id: currentUser.id,
//         name: currentUser.name,
//         email: currentUser.email,
//         profilePhoto: currentUser.profilePhoto,
//         role: currentUser.role,
//       },
//     };

//     setChatMessages((prev) => [...prev, tempMessage]);
//     setNewChatMessage("");

//     setTimeout(() => {
//       messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, 100);

//     try {
//       const response = await chatService.sendMessage(
//         selectedChat._id,
//         messageText,
//       );
//       if (response.success) {
//         setChatMessages((prev) =>
//           prev.map((m) => (m._id === tempMessage._id ? response.data : m)),
//         );
//         if (socketSendMessage && isConnected) {
//           socketSendMessage(selectedChat._id, messageText);
//         }
//       } else {
//         setChatMessages((prev) =>
//           prev.filter((m) => m._id !== tempMessage._id),
//         );
//         toast.error("Failed to send message");
//       }
//     } catch (error) {
//       console.error("Error sending message:", error);
//       setChatMessages((prev) => prev.filter((m) => m._id !== tempMessage._id));
//       toast.error("Failed to send message");
//     } finally {
//       setSendingMessage(false);
//     }
//   };

//   const handleStartSupportChat = async () => {
//     setStartingSupportChat(true);
//     try {
//       const response = await chatService.getSupportChat();
//       if (response.success) {
//         setActiveTab("messages");
//         setSelectedChat(response.data);
//         setShowChatWindow(true);
//         toast.success("Support chat started!");
//       }
//     } catch (error) {
//       console.error("Error starting support chat:", error);
//       toast.error("Failed to start support chat");
//     } finally {
//       setStartingSupportChat(false);
//     }
//   };

//   const markNotificationAsRead = async (notificationId) => {
//     try {
//       const token =
//         localStorage.getItem("token") || sessionStorage.getItem("token");
//       await axios.put(
//         `http://localhost:5000/api/notifications/${notificationId}/read`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       );
//       setNotifications((prev) =>
//         prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n)),
//       );
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const deleteNotification = async (notificationId) => {
//     try {
//       const token =
//         localStorage.getItem("token") || sessionStorage.getItem("token");
//       await axios.delete(
//         `http://localhost:5000/api/notifications/${notificationId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       );
//       setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     sessionStorage.removeItem("token");
//     localStorage.removeItem("user");
//     sessionStorage.removeItem("user");
//     localStorage.removeItem("rememberMe");
//     navigate("/login");
//   };

//   const handleEditToggle = () => {
//     if (editing && user) {
//       setName(user.name);
//       setUsername(user.username || user.email?.split("@")[0] || "");
//       setGender(user.gender || "Male");
//       if (user.profilePhoto)
//         setPhotoPreview(
//           `http://localhost:5000/uploads/profiles/${user.profilePhoto}`,
//         );
//       else setPhotoPreview(null);
//       setProfilePhoto(null);
//     }
//     setEditing(!editing);
//   };

//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfilePhoto(file);
//       const reader = new FileReader();
//       reader.onloadend = () => setPhotoPreview(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleRemovePhoto = () => {
//     setProfilePhoto(null);
//     setPhotoPreview(null);
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

//   const handleSaveProfile = async () => {
//     try {
//       const token =
//         localStorage.getItem("token") || sessionStorage.getItem("token");
//       if (!token) {
//         toast.error("Please login again");
//         navigate("/login");
//         return;
//       }
//       setUploading(true);
//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("username", username);
//       formData.append("gender", gender);
//       if (profilePhoto) formData.append("profilePhoto", profilePhoto);
//       const response = await axios.put(
//         "http://localhost:5000/api/profile/update",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         },
//       );
//       if (response.data.success) {
//         setUser(response.data.user);
//         setEditing(false);
//         setProfilePhoto(null);
//         if (response.data.user.profilePhoto)
//           setPhotoPreview(
//             `http://localhost:5000/uploads/profiles/${response.data.user.profilePhoto}`,
//           );
//         toast.success("Profile updated successfully!");
//       } else toast.error("Failed to update profile");
//       setUploading(false);
//     } catch (error) {
//       setUploading(false);
//       toast.error(error.response?.data?.message || "Failed to update profile.");
//     }
//   };

//   const handleCancelBooking = async () => {
//     if (!cancelReason.trim()) {
//       toast.error("Please provide a reason for cancellation");
//       return;
//     }
//     setCancellingBooking(true);
//     try {
//       const token =
//         localStorage.getItem("token") || sessionStorage.getItem("token");
//       const response = await axios.post(
//         `http://localhost:5000/api/bookings/${selectedBooking._id}/cancel`,
//         { reason: cancelReason },
//         { headers: { Authorization: `Bearer ${token}` } },
//       );
//       if (response.data.success) {
//         toast.success("Booking cancelled successfully!");
//         fetchUserBookings();
//         setShowBookingModal(false);
//         setShowCancelConfirm(false);
//         setCancelReason("");
//       } else toast.error(response.data.message || "Failed to cancel booking");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to cancel booking");
//     } finally {
//       setCancellingBooking(false);
//     }
//   };

//   const openCancelModal = (booking) => {
//     setSelectedBooking(booking);
//     setShowCancelConfirm(true);
//   };

//   const handleViewDetails = (booking) => {
//     setSelectedBooking(booking);
//     setShowBookingModal(true);
//   };

//   const handleMakePayment = async (booking) => {
//     setSelectedBooking(booking);
//     setPaymentLoading(true);
//     try {
//       const token =
//         localStorage.getItem("token") || sessionStorage.getItem("token");
//       const response = await axios.post(
//         "http://localhost:5000/api/payments/initiate-khalti",
//         {
//           bookingId: booking._id,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       );
//       if (response.data.success && response.data.payment_url) {
//         sessionStorage.setItem("current_booking_id", booking._id);
//         window.location.href = response.data.payment_url;
//       } else toast.error("Failed to initiate payment");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Payment failed");
//     } finally {
//       setPaymentLoading(false);
//     }
//   };

//   const openImageViewer = (imageUrl) => {
//     setSelectedImage(imageUrl);
//     setShowImageViewer(true);
//   };

//   const getVehicleImageUrl = (vehicle, index = 0) => {
//     if (vehicle.vehiclePhotos && vehicle.vehiclePhotos[index])
//       return `http://localhost:5000${vehicle.vehiclePhotos[index].url}`;
//     return null;
//   };

//   const getVehicleImageForBooking = (booking) => {
//     if (booking.vehicle?.photos && booking.vehicle.photos.length > 0) {
//       const folder =
//         booking.vehicleType === "user" ? "user-vehicles" : "vehicles";
//       return `http://localhost:5000/uploads/${folder}/${booking.vehicle.photos[0].filename}`;
//     }
//     if (
//       booking.vehicle?.vehiclePhotos &&
//       booking.vehicle.vehiclePhotos.length > 0
//     )
//       return `http://localhost:5000${booking.vehicle.vehiclePhotos[0].url}`;
//     return null;
//   };

//   const getOtherParticipant = (chat) => {
//     const currentUserId = user?._id;
//     if (!chat || !chat.participants || !Array.isArray(chat.participants)) {
//       return null;
//     }
//     const others = chat.participants.filter(
//       (p) => p && p._id && p._id !== currentUserId,
//     );
//     return others[0] || null;
//   };

//   const filteredChats = chats.filter((chat) => {
//     if (!chatSearch.trim()) return true;
//     const other = getOtherParticipant(chat);
//     if (!other) return false;
//     const q = chatSearch.toLowerCase();
//     return (
//       (other?.name || "").toLowerCase().includes(q) ||
//       (chat.lastMessage || "").toLowerCase().includes(q) ||
//       (chat.vehicleName || "").toLowerCase().includes(q)
//     );
//   });

//   const formatChatTime = (date) => {
//     if (!date) return "";
//     const now = new Date();
//     const msgDate = new Date(date);
//     const diffMs = now - msgDate;
//     const diffMins = Math.floor(diffMs / 60000);
//     const diffHours = Math.floor(diffMs / 3600000);
//     const diffDays = Math.floor(diffMs / 86400000);
//     if (diffMins < 1) return "now";
//     if (diffMins < 60) return `${diffMins}m`;
//     if (diffHours < 24) return `${diffHours}h`;
//     if (diffDays === 1) return "Yesterday";
//     return msgDate.toLocaleDateString();
//   };

//   const formatMessageTime = (date) =>
//     new Date(date).toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });

//   const getUnreadCountForChat = (chat) => {
//     return chat.unreadCounts?.[user?._id] || 0;
//   };

//   // Helper function to get sender label
//   const getSenderLabel = (senderType) => {
//     if (senderType === "admin") return "Support Team";
//     if (senderType === "owner") return "Vehicle Owner";
//     return "Customer";
//   };

//   // Helper function to get message bubble style
//   const getMessageBubbleStyle = (isOwn, senderType) => {
//     if (isOwn) {
//       return "bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl rounded-br-sm shadow-sm";
//     }
//     if (senderType === "owner") {
//       return "bg-orange-50 border border-orange-200 text-gray-800 rounded-2xl rounded-bl-sm shadow-sm";
//     }
//     if (senderType === "admin") {
//       return "bg-purple-50 border border-purple-200 text-gray-800 rounded-2xl rounded-bl-sm shadow-sm";
//     }
//     return "bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-bl-sm shadow-sm";
//   };

//   const getRoleDisplayForChat = (chat) => {
//     if (chat.chatType === "support") return "Support Team";
//     if (chat.chatType === "vehicle") {
//       const other = getOtherParticipant(chat);
//       if (other?.role === "admin") return "Support";
//       // Determine if current user is the owner
//       const currentUserIsOwner = chat.metadata?.get?.("ownerId") === user?._id;
//       if (currentUserIsOwner) {
//         return "Customer";
//       } else {
//         return "Vehicle Owner";
//       }
//     }
//     return "Customer";
//   };

//   const getStatusBadge = (status) => {
//     const cfg = {
//       pending: {
//         color: "bg-yellow-100 text-yellow-800",
//         label: "Pending",
//         icon: FaClock,
//       },
//       approved: {
//         color: "bg-blue-100 text-blue-800",
//         label: "Approved",
//         icon: FaCheckCircle,
//       },
//       rejected: {
//         color: "bg-red-100 text-red-800",
//         label: "Rejected",
//         icon: FaTimesCircle,
//       },
//       confirmed: {
//         color: "bg-green-100 text-green-800",
//         label: "Confirmed",
//         icon: FaCheckCircle,
//       },
//       active: {
//         color: "bg-purple-100 text-purple-800",
//         label: "Active",
//         icon: FaCar,
//       },
//       completed: {
//         color: "bg-gray-100 text-gray-800",
//         label: "Completed",
//         icon: FaCheckCircle,
//       },
//       cancelled: {
//         color: "bg-red-100 text-red-800",
//         label: "Cancelled",
//         icon: FaTimesCircle,
//       },
//       expired: {
//         color: "bg-orange-100 text-orange-800",
//         label: "Expired",
//         icon: FaClock,
//       },
//     };
//     const c = cfg[status] || cfg.pending;
//     const Icon = c.icon;
//     return (
//       <span
//         className={`px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-1 ${c.color}`}
//       >
//         <Icon size={12} /> {c.label}
//       </span>
//     );
//   };

//   const getPaymentStatusBadge = (ps) => {
//     const cfg = {
//       pending: {
//         color: "bg-yellow-100 text-yellow-800",
//         label: "Payment Pending",
//       },
//       paid: { color: "bg-green-100 text-green-800", label: "Paid" },
//       failed: { color: "bg-red-100 text-red-800", label: "Payment Failed" },
//       refunded: { color: "bg-gray-100 text-gray-800", label: "Refunded" },
//     };
//     const s = cfg[ps] || cfg.pending;
//     return (
//       <span className={`px-2 py-1 rounded-full text-xs font-medium ${s.color}`}>
//         {s.label}
//       </span>
//     );
//   };

//   const formatDate = (d) =>
//     new Date(d).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   const formatDateTime = (d) =>
//     new Date(d).toLocaleString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   const formatCurrency = (a) => `रु ${a?.toLocaleString("en-NP") || 0}`;

//   const sidebarItems = [
//     { id: "profile", icon: FaUserCircle, label: "Profile" },
//     { id: "bookings", icon: FaCalendarAlt, label: "My Bookings" },
//     { id: "listed-vehicles", icon: FaList, label: "My Listed Vehicles" },
//     { id: "earnings", icon: FaRupeeSign, label: "My Earnings" },
//     { id: "messages", icon: FaComments, label: "Messages" },
//   ];

//   const iBlockedThem =
//     selectedChat?.isBlocked && selectedChat?.blockedBy === user?._id;

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading profile...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error && !user) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-red-600 text-4xl mb-4">⚠️</div>
//           <h2 className="text-xl font-semibold mb-2">Error Loading Profile</h2>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={() => {
//               setLoading(true);
//               fetchUserProfile();
//             }}
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       <ToastContainer position="top-right" autoClose={3000} />

//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-full backdrop-blur-xl bg-white/95 shadow-2xl transition-all duration-300 z-20 ${
//           sidebarOpen ? "w-72" : "w-20"
//         }`}
//       >
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
//                 <FaCar className="text-white text-2xl" />
//               </div>
//               {sidebarOpen && (
//                 <div>
//                   <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                     Rent<span className="text-gray-800">Ride</span>
//                   </h1>
//                   <p className="text-xs text-gray-500 mt-0.5">User Panel</p>
//                 </div>
//               )}
//             </div>
//             <button
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//               className="p-2 hover:bg-gray-100 rounded-lg"
//             >
//               <FaBars className="text-gray-600" />
//             </button>
//           </div>
//         </div>

//         {sidebarOpen && user && (
//           <div className="mx-4 mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
//             <div className="flex items-center gap-3">
//               {photoPreview ? (
//                 <img
//                   src={photoPreview}
//                   alt="profile"
//                   className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
//                 />
//               ) : (
//                 <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
//                   <FaUserCircle className="text-white text-2xl" />
//                 </div>
//               )}
//               <div className="flex-1 min-w-0">
//                 <p className="font-semibold text-gray-800">{user.name}</p>
//                 <p className="text-xs text-gray-500 truncate">{user.email}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         <nav className="mt-6 px-3">
//           <p
//             className={`text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 ${!sidebarOpen && "text-center"}`}
//           >
//             {sidebarOpen ? "MAIN MENU" : "..."}
//           </p>
//           {sidebarItems.map((item) => {
//             const Icon = item.icon;
//             const isActive = activeTab === item.id;
//             const isHovered = hoveredItem === item.id;
//             return (
//               <button
//                 key={item.id}
//                 onClick={() => {
//                   setActiveTab(item.id);
//                   if (item.id === "messages") fetchUserChats();
//                 }}
//                 onMouseEnter={() => setHoveredItem(item.id)}
//                 onMouseLeave={() => setHoveredItem(null)}
//                 className={`relative w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-xl transition-all duration-300 group ${
//                   isActive
//                     ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
//                     : "text-gray-600 hover:bg-gray-100"
//                 } ${!sidebarOpen && "justify-center"}`}
//               >
//                 <Icon
//                   className={`text-xl ${
//                     isActive ? "text-white" : "text-gray-500"
//                   } transition-transform duration-300 group-hover:scale-110`}
//                 />
//                 {sidebarOpen && (
//                   <span
//                     className={`font-medium ${isActive ? "text-white" : ""}`}
//                   >
//                     {item.label}
//                   </span>
//                 )}
//                 {!sidebarOpen && isHovered && (
//                   <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded whitespace-nowrap z-50">
//                     {item.label}
//                   </div>
//                 )}
//                 {isActive && sidebarOpen && (
//                   <div className="absolute left-0 w-1 h-8 bg-white rounded-r-full"></div>
//                 )}
//                 {item.id === "messages" &&
//                   localUnreadCount > 0 &&
//                   sidebarOpen && (
//                     <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
//                       {localUnreadCount > 99 ? "99+" : localUnreadCount}
//                     </span>
//                   )}
//               </button>
//             );
//           })}
//         </nav>

//         <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
//           <button
//             onClick={handleLogout}
//             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
//               !sidebarOpen && "justify-center"
//             } bg-red-50 hover:bg-red-100 text-red-600 group`}
//           >
//             <FaSignOutAlt className="text-xl transition-transform duration-300 group-hover:scale-110" />
//             {sidebarOpen && <span className="font-medium">Logout</span>}
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div
//         className={`transition-all duration-300 ${sidebarOpen ? "ml-72" : "ml-20"}`}
//       >
//         <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
//           <div className="px-8 py-5">
//             <div className="flex justify-between items-center">
//               <div>
//                 <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
//                   {activeTab === "profile" && "My Profile"}
//                   {activeTab === "bookings" && "My Bookings"}
//                   {activeTab === "listed-vehicles" && "My Listed Vehicles"}
//                   {activeTab === "earnings" && "My Earnings"}
//                   {activeTab === "messages" && "Messages"}
//                 </h1>
//                 <p className="text-sm text-gray-500 mt-1">
//                   {activeTab === "profile" &&
//                     "Manage your personal information"}
//                   {activeTab === "bookings" && "View and manage your bookings"}
//                   {activeTab === "listed-vehicles" &&
//                     "Manage your listed vehicles"}
//                   {activeTab === "earnings" &&
//                     "Track your earnings from listed vehicles"}
//                   {activeTab === "messages" && "Your conversations"}
//                 </p>
//               </div>
//               <div className="flex items-center gap-3">
//                 <button
//                   onClick={handleStartSupportChat}
//                   disabled={startingSupportChat}
//                   className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition disabled:opacity-50"
//                 >
//                   {startingSupportChat ? (
//                     <FaSpinner className="animate-spin" size={14} />
//                   ) : (
//                     <FaHeadset size={14} />
//                   )}
//                   <span>Contact Support</span>
//                 </button>
//                 <Notification
//                   notifications={notifications}
//                   onMarkAsRead={markNotificationAsRead}
//                   onDelete={deleteNotification}
//                 />
//               </div>
//             </div>
//           </div>
//         </header>

//         <main className="p-8">
//           {/* Profile Tab */}
//           {activeTab === "profile" && (
//             <div className="flex flex-col items-center text-center">
//               {/* Profile content - keep your existing code */}
//               <div className="relative mb-4">
//                 {photoPreview ? (
//                   <img
//                     src={photoPreview}
//                     alt="profile"
//                     className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
//                   />
//                 ) : (
//                   <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-3xl shadow-lg">
//                     {user?.name?.charAt(0).toUpperCase() || "U"}
//                   </div>
//                 )}
//                 {editing && (
//                   <>
//                     <button
//                       onClick={() => fileInputRef.current.click()}
//                       className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition shadow-md"
//                     >
//                       <FaCamera />
//                     </button>
//                     {photoPreview && (
//                       <button
//                         onClick={handleRemovePhoto}
//                         className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition shadow-md"
//                       >
//                         <FaTimes size={12} />
//                       </button>
//                     )}
//                   </>
//                 )}
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   className="hidden"
//                   accept="image/*"
//                   onChange={handlePhotoChange}
//                 />
//               </div>
//               <div className="mb-6">
//                 {editing ? (
//                   <div className="flex flex-col items-center gap-2">
//                     <input
//                       type="text"
//                       value={name}
//                       onChange={(e) => setName(e.target.value)}
//                       className="text-xl font-semibold text-center bg-transparent border-b border-blue-300 focus:outline-none mb-1 focus:border-blue-500"
//                       placeholder="Enter name"
//                     />
//                     <div className="flex items-center gap-2">
//                       <span className="text-gray-500">@</span>
//                       <input
//                         type="text"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         className="text-gray-500 text-center bg-transparent border-b border-blue-300 focus:outline-none focus:border-blue-500"
//                         placeholder="username"
//                       />
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="flex flex-col items-center">
//                     <h2 className="text-xl font-semibold">{user?.name}</h2>
//                     <p className="text-gray-500">@{username}</p>
//                   </div>
//                 )}
//               </div>
//               <button
//                 onClick={editing ? handleSaveProfile : handleEditToggle}
//                 disabled={uploading}
//                 className={`flex items-center gap-2 w-64 py-3 rounded-xl font-medium mb-10 justify-center transition ${
//                   editing
//                     ? "bg-green-600 hover:bg-green-700 text-white"
//                     : "bg-gray-100 hover:bg-gray-200"
//                 } ${uploading ? "opacity-70 cursor-not-allowed" : ""}`}
//               >
//                 {uploading ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     Saving...
//                   </>
//                 ) : editing ? (
//                   <>
//                     <FaSave /> Save Profile
//                   </>
//                 ) : (
//                   <>
//                     <FaUserEdit /> Edit Profile
//                   </>
//                 )}
//               </button>
//               {editing && (
//                 <button
//                   onClick={handleEditToggle}
//                   className="flex items-center gap-2 w-64 bg-red-100 hover:bg-red-200 text-red-700 py-3 rounded-xl font-medium mb-10 justify-center transition"
//                 >
//                   <FaTimes /> Cancel Edit
//                 </button>
//               )}
//               <div className="w-full max-w-xl space-y-6">
//                 <div className="flex items-center justify-between border-b pb-4">
//                   <div className="flex items-center gap-3 text-gray-600">
//                     <FaEnvelope /> <span>Email</span>
//                   </div>
//                   <span className="font-medium">{user?.email}</span>
//                 </div>
//                 <div className="flex items-center justify-between border-b pb-4">
//                   <div className="flex items-center gap-3 text-gray-600">
//                     <FaVenusMars /> <span>Gender</span>
//                   </div>
//                   {editing ? (
//                     <select
//                       value={gender}
//                       onChange={(e) => setGender(e.target.value)}
//                       className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
//                     >
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                       <option value="Other">Other</option>
//                       <option value="Prefer not to say">
//                         Prefer not to say
//                       </option>
//                     </select>
//                   ) : (
//                     <span className="font-medium">
//                       {user?.gender || "Not specified"}
//                     </span>
//                   )}
//                 </div>
//                 <div className="space-y-4 pt-4">
//                   <button
//                     onClick={() => navigate("/change-password")}
//                     className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-6 py-2 rounded-xl font-medium transition w-full justify-center"
//                   >
//                     <FaKey /> Change Password
//                   </button>
//                   <div className="text-center mt-4">
//                     <button
//                       onClick={() => navigate("/forgot-password")}
//                       className="text-sm text-blue-600 hover:text-blue-700 transition"
//                     >
//                       Forgot Password?
//                     </button>
//                   </div>
//                   <div className="flex items-center justify-center gap-3">
//                     {user?.kycVerified ? (
//                       <>
//                         <FaCheckCircle className="text-green-600 text-lg" />
//                         <span className="font-medium text-green-600">
//                           KYC Verified
//                         </span>
//                       </>
//                     ) : (
//                       <>
//                         <FaCheckCircle className="text-yellow-500 text-lg" />
//                         <span className="font-medium text-yellow-600">
//                           KYC Pending
//                         </span>
//                         <button
//                           onClick={() => navigate("/identity-verification")}
//                           className="ml-2 text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-200 transition"
//                         >
//                           Verify Now
//                         </button>
//                       </>
//                     )}
//                   </div>
//                 </div>
//                 <div className="pt-6 border-t">
//                   <p className="text-sm text-center text-gray-500">
//                     Member since:{" "}
//                     {user?.createdAt
//                       ? new Date(user.createdAt).toLocaleDateString("en-US", {
//                           month: "long",
//                           year: "numeric",
//                         })
//                       : "Recently"}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Bookings Tab */}
//           {activeTab === "bookings" && (
//             <div>
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                 My Bookings
//               </h2>
//               {/* Bookings content - keep your existing code */}
//               {bookingsLoading ? (
//                 <div className="text-center py-12">
//                   <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//                   <p className="text-gray-500">Loading bookings...</p>
//                 </div>
//               ) : bookings.length === 0 ? (
//                 <div className="text-center py-12 bg-white rounded-2xl shadow">
//                   <FaCalendarAlt className="text-5xl text-gray-300 mx-auto mb-3" />
//                   <p className="text-gray-500">No bookings found</p>
//                   <button
//                     onClick={() => navigate("/rentridehome")}
//                     className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//                   >
//                     Browse Vehicles
//                   </button>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {bookings.map((booking) => (
//                     <div
//                       key={booking._id}
//                       className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition"
//                     >
//                       {/* Booking card content - keep your existing code */}
//                       <div className="flex gap-4">
//                         <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
//                           {getVehicleImageForBooking(booking) ? (
//                             <img
//                               src={getVehicleImageForBooking(booking)}
//                               alt={booking.vehicle?.carName}
//                               className="w-full h-full object-cover cursor-pointer"
//                               onClick={() =>
//                                 openImageViewer(
//                                   getVehicleImageForBooking(booking),
//                                 )
//                               }
//                             />
//                           ) : (
//                             <div className="w-full h-full flex items-center justify-center">
//                               <FaCar className="text-gray-400 text-3xl" />
//                             </div>
//                           )}
//                         </div>
//                         <div className="flex-1">
//                           <div className="flex justify-between items-start mb-2">
//                             <div>
//                               <h3 className="text-lg font-semibold text-gray-900">
//                                 {booking.vehicle?.carName}
//                               </h3>
//                               <p className="text-sm text-gray-500">
//                                 {booking.vehicle?.carNumber}
//                               </p>
//                               <p className="text-xs text-gray-400 mt-1">
//                                 Booking ID: {booking.confirmationCode}
//                               </p>
//                             </div>
//                             <div className="text-right">
//                               {getStatusBadge(booking.status)}
//                               <div className="mt-2">
//                                 {getPaymentStatusBadge(booking.paymentStatus)}
//                               </div>
//                             </div>
//                           </div>
//                           <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
//                             <div className="flex items-center gap-1 text-xs text-gray-600">
//                               <FaCalendarAlt size={10} />
//                               <span>
//                                 {formatDate(booking.pickupDate)} -{" "}
//                                 {formatDate(booking.returnDate)}
//                               </span>
//                             </div>
//                             <div className="flex items-center gap-1 text-xs text-gray-600">
//                               <FaClock size={10} />
//                               <span>
//                                 {booking.totalDays} day
//                                 {booking.totalDays > 1 ? "s" : ""}
//                               </span>
//                             </div>
//                             <div className="flex items-center gap-1 text-xs text-gray-600">
//                               <FaMapMarkerAlt size={10} />
//                               <span className="truncate">
//                                 {booking.pickupLocation}
//                               </span>
//                             </div>
//                             <div className="flex items-center gap-1 text-xs text-gray-600">
//                               <FaRupeeSign size={10} />
//                               <span className="font-semibold text-blue-600">
//                                 {formatCurrency(booking.totalAmount)}
//                               </span>
//                             </div>
//                             <div className="flex items-center gap-1 text-xs text-gray-600">
//                               <FaUser size={10} />
//                               <span>
//                                 {booking.driverOption === "with"
//                                   ? "With Driver"
//                                   : "Self Drive"}
//                               </span>
//                             </div>
//                             <div className="flex items-center gap-1 text-xs text-gray-600">
//                               <FaShieldAlt size={10} />
//                               <span>
//                                 {booking.insuranceOption === "premium"
//                                   ? "Premium"
//                                   : "Basic"}
//                               </span>
//                             </div>
//                           </div>
//                           <div className="flex justify-end gap-3">
//                             <button
//                               onClick={() => handleViewDetails(booking)}
//                               className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
//                             >
//                               <FaEye size={12} /> View Details
//                             </button>
//                             {booking.status === "approved" &&
//                               booking.paymentStatus === "pending" && (
//                                 <button
//                                   onClick={() => handleMakePayment(booking)}
//                                   disabled={paymentLoading}
//                                   className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1"
//                                 >
//                                   <FaCreditCard size={12} /> Make Payment
//                                 </button>
//                               )}
//                             {(booking.status === "pending" ||
//                               booking.status === "approved") && (
//                               <button
//                                 onClick={() => openCancelModal(booking)}
//                                 className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1"
//                               >
//                                 <FaTrash size={12} /> Cancel Booking
//                               </button>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Listed Vehicles Tab */}
//           {activeTab === "listed-vehicles" && (
//             <div>
//               <div className="flex justify-between items-center mb-6">
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-900">
//                     My Listed Vehicles
//                   </h2>
//                   <p className="text-sm text-gray-500 mt-1">
//                     Manage and track all vehicles you've listed for rent
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => navigate("/list-vehicle")}
//                   className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2.5 px-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
//                 >
//                   <FaPlus /> List New Vehicle
//                 </button>
//               </div>
//               {/* Listed vehicles content - keep your existing code */}
//               {vehiclesLoading ? (
//                 <div className="text-center py-12">
//                   <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//                   <p className="text-gray-500">Loading vehicles...</p>
//                 </div>
//               ) : userVehicles.length === 0 ? (
//                 <div className="text-center py-12 bg-white rounded-2xl shadow">
//                   <FaCar className="text-5xl text-gray-300 mx-auto mb-3" />
//                   <p className="text-gray-500">No vehicles listed</p>
//                   <button
//                     onClick={() => navigate("/list-vehicle")}
//                     className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//                   >
//                     List Your First Vehicle
//                   </button>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {userVehicles.map((vehicle) => (
//                     <div
//                       key={vehicle._id}
//                       className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition"
//                     >
//                       {/* Vehicle card content - keep your existing code */}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Earnings Tab */}
//           {activeTab === "earnings" && (
//             <div>
//               <div className="mb-8">
//                 <h2 className="text-2xl font-bold text-gray-900 mb-2">
//                   My Earnings
//                 </h2>
//                 <p className="text-gray-500">
//                   Track your earnings from vehicles you've listed on RentRide
//                   (70% of booking amount)
//                 </p>
//               </div>
//               {/* Earnings content - keep your existing code */}
//               {earningsLoading ? (
//                 <div className="text-center py-12">
//                   <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//                   <p className="text-gray-500">Loading earnings data...</p>
//                 </div>
//               ) : !earnings || earnings.totalEarnings === 0 ? (
//                 <div className="text-center py-12 bg-white rounded-2xl shadow">
//                   <FaWallet className="text-5xl text-gray-300 mx-auto mb-3" />
//                   <p className="text-gray-500">No earnings yet</p>
//                   <p className="text-sm text-gray-400 mt-1">
//                     When users book your listed vehicles, you'll see your
//                     earnings here
//                   </p>
//                   <button
//                     onClick={() => navigate("/list-vehicle")}
//                     className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//                   >
//                     List a Vehicle
//                   </button>
//                 </div>
//               ) : (
//                 <>
//                   <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//                     {/* Earnings cards - keep your existing code */}
//                   </div>
//                   <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
//                     <div className="flex items-center gap-3">
//                       <div className="p-2 bg-blue-100 rounded-lg">
//                         <FaInfoCircle className="text-blue-600" />
//                       </div>
//                       <p className="text-sm text-blue-800">
//                         <strong>Commission Structure:</strong> When a user books
//                         your vehicle, RentRide takes 30% commission and you
//                         receive 70% of the total booking amount.
//                       </p>
//                     </div>
//                   </div>
//                   <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//                     <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
//                       <h2 className="text-lg font-semibold text-gray-800">
//                         Earnings by Vehicle
//                       </h2>
//                       <p className="text-sm text-gray-500">
//                         Detailed breakdown of earnings from each vehicle
//                       </p>
//                     </div>
//                     <div className="overflow-x-auto">
//                       <table className="min-w-full divide-y divide-gray-200">
//                         <thead className="bg-gray-50">
//                           <tr>
//                             {[
//                               "Vehicle",
//                               "Bookings",
//                               "Gross Revenue",
//                               "Your Earnings (70%)",
//                               "Action",
//                             ].map((h) => (
//                               <th
//                                 key={h}
//                                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
//                               >
//                                 {h}
//                               </th>
//                             ))}
//                           </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                           {earnings.vehicles?.map((ve, index) => (
//                             <tr
//                               key={index}
//                               className="hover:bg-gray-50 transition"
//                             >
//                               <td className="px-6 py-4">
//                                 <div className="flex items-center gap-3">
//                                   {ve.vehicle?.vehiclePhotos?.[0] && (
//                                     <img
//                                       src={`http://localhost:5000${ve.vehicle.vehiclePhotos[0].url}`}
//                                       alt={ve.vehicle?.carName}
//                                       className="w-10 h-10 object-cover rounded-lg"
//                                     />
//                                   )}
//                                   <div>
//                                     <p className="font-medium text-gray-900">
//                                       {ve.vehicle?.carName}
//                                     </p>
//                                     <p className="text-xs text-gray-500">
//                                       {ve.vehicle?.carNumber}
//                                     </p>
//                                   </div>
//                                 </div>
//                               </td>
//                               <td className="px-6 py-4">
//                                 <span className="font-semibold text-gray-700">
//                                   {ve.totalBookings}
//                                 </span>
//                               </td>
//                               <td className="px-6 py-4 font-medium text-gray-700">
//                                 {formatCurrency(ve.grossRevenue)}
//                               </td>
//                               <td className="px-6 py-4">
//                                 <span className="font-bold text-green-600">
//                                   {formatCurrency(ve.ownerEarnings)}
//                                 </span>
//                                 <p className="text-xs text-gray-400">
//                                   70% of {formatCurrency(ve.grossRevenue)}
//                                 </p>
//                               </td>
//                               <td className="px-6 py-4">
//                                 <button
//                                   onClick={() => {
//                                     setSelectedEarningVehicle(ve);
//                                     setShowEarningDetailsModal(true);
//                                   }}
//                                   className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
//                                 >
//                                   <FaEye size={12} /> View Details
//                                 </button>
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 </>
//               )}
//             </div>
//           )}

//           {/* =================== MESSAGES TAB =================== */}
//           {activeTab === "messages" && (
//             <div className="flex h-[calc(100vh-180px)] rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-white">
//               {/* Chat List */}
//               <div
//                 className={`${showChatWindow ? "hidden md:flex" : "flex"} flex-col md:w-[320px] w-full border-r border-gray-100 bg-white flex-shrink-0`}
//               >
//                 <div className="px-4 pt-4 pb-3 border-b border-gray-100">
//                   <div className="flex items-center justify-between mb-3">
//                     <div>
//                       <h2 className="text-base font-bold text-gray-900">
//                         Messages
//                       </h2>
//                       <p className="text-xs text-gray-400">
//                         {chats.length} conversation
//                         {chats.length !== 1 ? "s" : ""}
//                       </p>
//                     </div>
//                     <button
//                       onClick={fetchUserChats}
//                       title="Refresh"
//                       className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-blue-500 transition"
//                     >
//                       <FaSync
//                         className={chatsLoading ? "animate-spin" : ""}
//                         size={13}
//                       />
//                     </button>
//                   </div>
//                   <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
//                     <FaSearch
//                       size={11}
//                       className="text-gray-400 flex-shrink-0"
//                     />
//                     <input
//                       type="text"
//                       value={chatSearch}
//                       onChange={(e) => setChatSearch(e.target.value)}
//                       placeholder="Search conversations…"
//                       className="flex-1 bg-transparent text-xs text-gray-700 placeholder-gray-400 focus:outline-none"
//                     />
//                     {chatSearch && (
//                       <button
//                         onClick={() => setChatSearch("")}
//                         className="text-gray-400 hover:text-gray-600"
//                       >
//                         <FaTimes size={10} />
//                       </button>
//                     )}
//                   </div>
//                 </div>

//                 <div className="flex-1 overflow-y-auto">
//                   {chatsLoading ? (
//                     <div className="flex justify-center items-center h-32">
//                       <FaSpinner className="animate-spin text-blue-400 text-xl" />
//                     </div>
//                   ) : filteredChats.length === 0 ? (
//                     <div className="flex flex-col items-center justify-center h-full py-16 text-center px-6">
//                       <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-3">
//                         <FaCommentDots className="text-blue-300 text-2xl" />
//                       </div>
//                       <p className="text-sm font-medium text-gray-600">
//                         {chatSearch
//                           ? "No results found"
//                           : "No conversations yet"}
//                       </p>
//                       <p className="text-xs text-gray-400 mt-1">
//                         {chatSearch
//                           ? "Try a different search"
//                           : "Start a chat from any vehicle listing or click 'Contact Support'"}
//                       </p>
//                     </div>
//                   ) : (
//                     filteredChats.map((chat) => {
//                       const other = getOtherParticipant(chat);
//                       const unreadCnt = getUnreadCountForChat(chat);
//                       const lastMsg = chat.lastMessage || "No messages yet";
//                       const lastMsgTime = formatChatTime(
//                         chat.lastMessageAt || chat.updatedAt,
//                       );
//                       const isVehicleChat = chat.chatType === "vehicle";
//                       const isSupportChat = chat.chatType === "support";
//                       const isBlocked = chat.isBlocked;
//                       const isSelected =
//                         selectedChat?._id === chat._id && showChatWindow;
//                       const roleDisplay = getRoleDisplayForChat(chat);

//                       return (
//                         <div
//                           key={chat._id}
//                           onClick={() => handleOpenChat(chat)}
//                           className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all border-b border-gray-50 ${isSelected ? "bg-blue-50 border-l-[3px] border-l-blue-500" : "hover:bg-gray-50 border-l-[3px] border-l-transparent"} ${isBlocked ? "opacity-70" : ""}`}
//                         >
//                           <div className="relative flex-shrink-0">
//                             {isSupportChat ? (
//                               <div className="w-11 h-11 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-lg font-bold">
//                                 <FaHeadset size={20} />
//                               </div>
//                             ) : other?.profilePhoto ? (
//                               <img
//                                 src={`http://localhost:5000/uploads/profiles/${other.profilePhoto}`}
//                                 alt={other.name}
//                                 className="w-11 h-11 rounded-full object-cover"
//                               />
//                             ) : (
//                               <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
//                                 {other?.name?.charAt(0).toUpperCase() || "?"}
//                               </div>
//                             )}
//                             {unreadCnt > 0 && !isBlocked && (
//                               <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-0.5">
//                                 {unreadCnt > 9 ? "9+" : unreadCnt}
//                               </span>
//                             )}
//                             {isBlocked && (
//                               <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center shadow-sm">
//                                 <FaBan size={7} />
//                               </span>
//                             )}
//                           </div>
//                           <div className="flex-1 min-w-0">
//                             <div className="flex items-baseline justify-between gap-1">
//                               <span
//                                 className={`text-sm font-semibold truncate ${unreadCnt > 0 ? "text-gray-900" : "text-gray-700"}`}
//                               >
//                                 {isSupportChat
//                                   ? "Support Team"
//                                   : other?.name || "Unknown User"}
//                               </span>
//                               <span className="text-[10px] text-gray-400 flex-shrink-0">
//                                 {lastMsgTime}
//                               </span>
//                             </div>
//                             <p
//                               className={`text-xs truncate mt-0.5 ${unreadCnt > 0 && !isBlocked ? "text-gray-800 font-medium" : "text-gray-400"}`}
//                             >
//                               {isBlocked ? "Conversation blocked" : lastMsg}
//                             </p>
//                             <div className="flex items-center gap-1.5 mt-1">
//                               <span
//                                 className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold uppercase tracking-wide ${isSupportChat ? "bg-purple-50 text-purple-600" : isVehicleChat ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-600"}`}
//                               >
//                                 {roleDisplay}
//                               </span>
//                               {chat.vehicleName && !isSupportChat && (
//                                 <span className="text-[10px] text-gray-400 truncate">
//                                   · {chat.vehicleName}
//                                 </span>
//                               )}
//                               {isBlocked && (
//                                 <span className="text-[9px] text-red-500 font-semibold uppercase tracking-wide">
//                                   Blocked
//                                 </span>
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       );
//                     })
//                   )}
//                 </div>

//                 <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
//                   <span className="text-xs text-gray-500">
//                     {chats.length} conversation{chats.length !== 1 ? "s" : ""}
//                   </span>
//                   {localUnreadCount > 0 && (
//                     <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-full">
//                       {localUnreadCount} unread
//                     </span>
//                   )}
//                 </div>
//               </div>

//               {/* Chat Window */}
//               {showChatWindow && selectedChat ? (
//                 <div className="flex-1 flex flex-col min-w-0">
//                   {/* Header */}
//                   <div className="px-5 py-3 bg-white border-b border-gray-100 flex items-center justify-between shadow-sm">
//                     <div className="flex items-center gap-3">
//                       <button
//                         onClick={handleCloseChat}
//                         className="lg:hidden w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition"
//                       >
//                         <FaArrowLeft size={14} />
//                       </button>
//                       {(() => {
//                         const other = getOtherParticipant(selectedChat);
//                         const isSupportChat =
//                           selectedChat.chatType === "support";
//                         const roleText = getRoleDisplayForChat(selectedChat);
//                         return (
//                           <>
//                             {isSupportChat ? (
//                               <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-lg font-bold">
//                                 <FaHeadset size={18} />
//                               </div>
//                             ) : other?.profilePhoto ? (
//                               <img
//                                 src={`http://localhost:5000/uploads/profiles/${other.profilePhoto}`}
//                                 alt={other.name}
//                                 className="w-9 h-9 rounded-full object-cover"
//                               />
//                             ) : (
//                               <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
//                                 {other?.name?.charAt(0).toUpperCase() || "?"}
//                               </div>
//                             )}
//                             <div>
//                               <div className="flex items-center gap-2">
//                                 <p className="text-sm font-semibold text-gray-900 leading-tight">
//                                   {isSupportChat
//                                     ? "Support Team"
//                                     : other?.name || "Unknown User"}
//                                 </p>
//                                 {selectedChat.isBlocked && (
//                                   <span className="inline-flex items-center gap-1 text-[10px] bg-red-50 text-red-500 border border-red-200 px-1.5 py-0.5 rounded-full font-semibold">
//                                     <FaBan size={8} /> Blocked
//                                   </span>
//                                 )}
//                               </div>
//                               <p className="text-xs text-gray-400">
//                                 {roleText}
//                                 {selectedChat.vehicleName && !isSupportChat && (
//                                   <span className="ml-1">
//                                     · {selectedChat.vehicleName}
//                                   </span>
//                                 )}
//                                 {isSupportChat && (
//                                   <span className="ml-1">Available 24/7</span>
//                                 )}
//                               </p>
//                             </div>
//                           </>
//                         );
//                       })()}
//                     </div>
//                     <div className="flex items-center gap-2">
//                       {!selectedChat.isBlocked ? (
//                         <button
//                           onClick={() => setShowBlockConfirm(true)}
//                           className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-500 hover:bg-red-50 border border-red-100 transition"
//                         >
//                           <FaBan size={11} /> Block
//                         </button>
//                       ) : iBlockedThem ? (
//                         <button
//                           onClick={() => setShowUnblockConfirm(true)}
//                           className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-600 hover:bg-emerald-50 border border-emerald-200 transition"
//                         >
//                           <FaUnlock size={11} /> Unblock
//                         </button>
//                       ) : null}
//                     </div>
//                   </div>

//                   {/* Vehicle banner - only for vehicle chats */}
//                   {selectedChat.vehicleId &&
//                     selectedChat.chatType === "vehicle" && (
//                       <div className="px-5 py-2.5 bg-blue-50 border-b border-blue-100 flex items-center gap-3">
//                         <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
//                           <FaCar size={12} className="text-blue-600" />
//                         </div>
//                         <span className="text-xs font-semibold text-blue-800">
//                           {selectedChat.vehicleName || "Vehicle Inquiry"}
//                         </span>
//                       </div>
//                     )}

//                   {/* Support banner */}
//                   {selectedChat.chatType === "support" && (
//                     <div className="px-5 py-2.5 bg-purple-50 border-b border-purple-100 flex items-center gap-3">
//                       <div className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
//                         <FaHeadset size={12} className="text-purple-600" />
//                       </div>
//                       <span className="text-xs font-semibold text-purple-800">
//                         Official Support Channel - Response within 24 hours
//                       </span>
//                     </div>
//                   )}

//                   {/* Block banner */}
//                   {selectedChat.isBlocked && (
//                     <div
//                       className={`flex items-center justify-between px-5 py-3 border-b ${iBlockedThem ? "bg-red-50 border-red-100" : "bg-amber-50 border-amber-100"}`}
//                     >
//                       <div className="flex items-center gap-3">
//                         <div
//                           className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${iBlockedThem ? "bg-red-100" : "bg-amber-100"}`}
//                         >
//                           <FaBan
//                             size={13}
//                             className={
//                               iBlockedThem ? "text-red-500" : "text-amber-500"
//                             }
//                           />
//                         </div>
//                         <div>
//                           <p
//                             className={`text-xs font-bold ${iBlockedThem ? "text-red-700" : "text-amber-700"}`}
//                           >
//                             {iBlockedThem
//                               ? `You blocked ${getOtherParticipant(selectedChat)?.name}`
//                               : "You can't message this user"}
//                           </p>
//                           <p
//                             className={`text-[11px] mt-0.5 ${iBlockedThem ? "text-red-500" : "text-amber-500"}`}
//                           >
//                             {iBlockedThem
//                               ? "They can't message you. Unblock to restore the conversation."
//                               : "This user has restricted messaging."}
//                           </p>
//                         </div>
//                       </div>
//                       {iBlockedThem && (
//                         <button
//                           onClick={() => setShowUnblockConfirm(true)}
//                           className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition whitespace-nowrap ml-3"
//                         >
//                           <FaUnlock size={10} /> Unblock
//                         </button>
//                       )}
//                     </div>
//                   )}

//                   {/* Messages */}
//                   <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1 bg-gray-50">
//                     {chatMessagesLoading ? (
//                       <div className="flex justify-center items-center h-full">
//                         <FaSpinner className="animate-spin text-blue-400 text-2xl" />
//                       </div>
//                     ) : selectedChat.isBlocked && chatMessages.length === 0 ? (
//                       <div className="flex flex-col items-center justify-center h-full text-center px-8">
//                         <div
//                           className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${iBlockedThem ? "bg-red-50" : "bg-amber-50"}`}
//                         >
//                           <FaLock
//                             size={28}
//                             className={
//                               iBlockedThem ? "text-red-300" : "text-amber-300"
//                             }
//                           />
//                         </div>
//                         <p className="text-sm font-bold text-gray-600">
//                           {iBlockedThem
//                             ? "Conversation blocked"
//                             : "Messaging unavailable"}
//                         </p>
//                         <p className="text-xs text-gray-400 mt-2 leading-relaxed max-w-xs">
//                           {iBlockedThem
//                             ? `You have blocked ${getOtherParticipant(selectedChat)?.name}. Unblock to restore the conversation and see previous messages.`
//                             : "This user has restricted messaging. You cannot view messages or send new ones."}
//                         </p>
//                         {iBlockedThem && (
//                           <button
//                             onClick={() => setShowUnblockConfirm(true)}
//                             className="mt-5 flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition"
//                           >
//                             <FaUnlock size={12} /> Unblock{" "}
//                             {getOtherParticipant(selectedChat)?.name}
//                           </button>
//                         )}
//                       </div>
//                     ) : chatMessages.length === 0 ? (
//                       <div className="flex flex-col items-center justify-center h-full text-center">
//                         <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-3">
//                           <FaCommentDots className="text-blue-300 text-2xl" />
//                         </div>
//                         <p className="text-sm font-medium text-gray-500">
//                           No messages yet
//                         </p>
//                         <p className="text-xs text-gray-400 mt-1">
//                           Say hello to start the conversation!
//                         </p>
//                       </div>
//                     ) : (
//                       (() => {
//                         const groups = [];
//                         let lastDate = null;
//                         chatMessages.forEach((msg, idx) => {
//                           const msgDay = new Date(msg.createdAt).toDateString();
//                           if (msgDay !== lastDate) {
//                             groups.push({
//                               type: "date",
//                               label: msgDay,
//                               key: `date-${idx}`,
//                             });
//                             lastDate = msgDay;
//                           }
//                           groups.push({
//                             type: "msg",
//                             msg,
//                             key: msg._id || idx,
//                           });
//                         });
//                         return groups.map((item) => {
//                           if (item.type === "date") {
//                             const today = new Date().toDateString();
//                             const yesterday = new Date(
//                               Date.now() - 86400000,
//                             ).toDateString();
//                             const label =
//                               item.label === today
//                                 ? "Today"
//                                 : item.label === yesterday
//                                   ? "Yesterday"
//                                   : item.label;
//                             return (
//                               <div
//                                 key={item.key}
//                                 className="flex items-center gap-3 py-2"
//                               >
//                                 <div className="flex-1 h-px bg-gray-200" />
//                                 <span className="text-[10px] text-gray-400 font-medium px-2.5 py-1 bg-white border border-gray-200 rounded-full whitespace-nowrap shadow-sm">
//                                   {label}
//                                 </span>
//                                 <div className="flex-1 h-px bg-gray-200" />
//                               </div>
//                             );
//                           }
//                           const { msg } = item;
//                           const isOwn = msg.sender?._id === user?._id;
//                           const senderLabel = getSenderLabel(msg.senderType);
//                           const other = getOtherParticipant(selectedChat);

//                           return (
//                             <div
//                               key={item.key}
//                               className={`flex flex-col ${isOwn ? "items-end" : "items-start"} mb-3`}
//                             >
//                               {!isOwn && (
//                                 <div className="flex items-center gap-2 mb-1 ml-2">
//                                   <span className="text-[10px] font-medium text-gray-500">
//                                     {senderLabel}
//                                   </span>
//                                 </div>
//                               )}
//                               <div
//                                 className={`flex items-end gap-2 ${isOwn ? "justify-end" : "justify-start"} w-full`}
//                               >
//                                 {!isOwn && (
//                                   <div className="flex-shrink-0 mb-1">
//                                     {selectedChat.chatType === "support" ? (
//                                       <div className="w-7 h-7 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
//                                         <FaHeadset size={14} />
//                                       </div>
//                                     ) : other?.profilePhoto ? (
//                                       <img
//                                         src={`http://localhost:5000/uploads/profiles/${other.profilePhoto}`}
//                                         alt=""
//                                         className="w-7 h-7 rounded-full object-cover"
//                                       />
//                                     ) : (
//                                       <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-[10px] font-bold">
//                                         {other?.name?.charAt(0).toUpperCase() ||
//                                           "?"}
//                                       </div>
//                                     )}
//                                   </div>
//                                 )}
//                                 <div
//                                   className={`flex flex-col ${isOwn ? "items-end" : "items-start"} max-w-[70%]`}
//                                 >
//                                   <div
//                                     className={`px-4 py-2.5 text-sm leading-relaxed break-words ${getMessageBubbleStyle(isOwn, msg.senderType)}`}
//                                   >
//                                     {msg.message}
//                                   </div>
//                                   <div
//                                     className={`flex items-center gap-1 mt-1 px-1 ${isOwn ? "flex-row-reverse" : ""}`}
//                                   >
//                                     <span className="text-[10px] text-gray-400">
//                                       {formatMessageTime(msg.createdAt)}
//                                     </span>
//                                     {isOwn && (
//                                       <FaCheckDouble
//                                         size={9}
//                                         className={
//                                           msg.read
//                                             ? "text-blue-400"
//                                             : "text-gray-300"
//                                         }
//                                       />
//                                     )}
//                                   </div>
//                                 </div>
//                                 {isOwn && (
//                                   <div className="flex-shrink-0 mb-1">
//                                     {user?.profilePhoto ? (
//                                       <img
//                                         src={`http://localhost:5000/uploads/profiles/${user.profilePhoto}`}
//                                         alt=""
//                                         className="w-7 h-7 rounded-full object-cover"
//                                       />
//                                     ) : (
//                                       <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center text-white text-[10px] font-bold">
//                                         {user?.name?.charAt(0).toUpperCase() ||
//                                           "U"}
//                                       </div>
//                                     )}
//                                   </div>
//                                 )}
//                               </div>
//                             </div>
//                           );
//                         });
//                       })()
//                     )}
//                     <div ref={messagesEndRef} />
//                   </div>

//                   {/* Input */}
//                   <div className="px-4 py-3 bg-white border-t border-gray-100">
//                     {!isConnected && (
//                       <p className="text-[11px] text-center text-amber-500 mb-2">
//                         Reconnecting to chat server…
//                       </p>
//                     )}
//                     {selectedChat.isBlocked ? (
//                       <div
//                         className={`flex items-center gap-3 rounded-2xl px-4 py-3 ${iBlockedThem ? "bg-red-50 border border-red-100" : "bg-amber-50 border border-amber-100"}`}
//                       >
//                         <FaLock
//                           size={14}
//                           className={
//                             iBlockedThem ? "text-red-400" : "text-amber-400"
//                           }
//                         />
//                         <p
//                           className={`text-xs flex-1 ${iBlockedThem ? "text-red-500" : "text-amber-600"}`}
//                         >
//                           {iBlockedThem ? (
//                             <>
//                               You blocked this user.{" "}
//                               <button
//                                 onClick={() => setShowUnblockConfirm(true)}
//                                 className="underline font-semibold hover:no-underline"
//                               >
//                                 Unblock to chat
//                               </button>
//                             </>
//                           ) : (
//                             "You cannot send messages in this conversation."
//                           )}
//                         </p>
//                       </div>
//                     ) : (
//                       <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-3 py-2">
//                         <button className="text-gray-400 hover:text-blue-500 transition flex-shrink-0">
//                           <FaSmile size={18} />
//                         </button>
//                         <input
//                           type="text"
//                           value={newChatMessage}
//                           onChange={(e) => setNewChatMessage(e.target.value)}
//                           onKeyPress={(e) =>
//                             e.key === "Enter" && handleSendChatMessage()
//                           }
//                           placeholder="Type a message…"
//                           className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none chat-message-input"
//                         />
//                         <button
//                           onClick={handleSendChatMessage}
//                           disabled={!newChatMessage.trim() || sendingMessage}
//                           className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-md transition"
//                         >
//                           {sendingMessage ? (
//                             <FaSpinner className="animate-spin" size={13} />
//                           ) : (
//                             <FaPaperPlane size={13} />
//                           )}
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="flex-1 hidden md:flex flex-col items-center justify-center bg-gray-50 text-center px-8">
//                   <div className="w-20 h-20 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
//                     <FaComments className="text-blue-300 text-3xl" />
//                   </div>
//                   <p className="text-base font-semibold text-gray-600">
//                     Select a conversation
//                   </p>
//                   <p className="text-sm text-gray-400 mt-1">
//                     Choose a chat from the left to start messaging
//                   </p>
//                   <button
//                     onClick={handleStartSupportChat}
//                     className="mt-4 flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
//                   >
//                     <FaHeadset /> Start Support Chat
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}
//         </main>
//       </div>

//       {/* Block Confirm Modal */}
//       {showBlockConfirm && selectedChat && (
//         <div
//           className="fixed inset-0 z-[200] flex items-center justify-center p-4"
//           style={{ background: "rgba(0,0,0,0.55)" }}
//         >
//           <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
//             <div className="bg-gradient-to-r from-red-500 to-rose-600 px-6 pt-6 pb-10">
//               <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
//                 <FaBan size={26} className="text-white" />
//               </div>
//               <h3 className="text-white text-center text-lg font-bold">
//                 Block User?
//               </h3>
//               <p className="text-red-100 text-center text-xs mt-1">
//                 You can unblock them anytime
//               </p>
//             </div>
//             <div className="-mt-4 bg-white rounded-t-2xl px-6 pt-5 pb-6">
//               <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
//                 {(() => {
//                   const other = getOtherParticipant(selectedChat);
//                   return other?.profilePhoto ? (
//                     <img
//                       src={`http://localhost:5000/uploads/profiles/${other.profilePhoto}`}
//                       alt=""
//                       className="w-10 h-10 rounded-full object-cover"
//                     />
//                   ) : (
//                     <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
//                       {other?.name?.charAt(0).toUpperCase() || "?"}
//                     </div>
//                   );
//                 })()}
//                 <div>
//                   <p className="font-semibold text-gray-800 text-sm">
//                     {getOtherParticipant(selectedChat)?.name}
//                   </p>
//                   <p className="text-xs text-gray-500">Will be blocked</p>
//                 </div>
//               </div>
//               <ul className="space-y-2 mb-5">
//                 {[
//                   "They won't be able to message you",
//                   "Their messages will be hidden",
//                   "You can unblock them anytime",
//                 ].map((t, i) => (
//                   <li
//                     key={i}
//                     className="flex items-center gap-2 text-xs text-gray-600"
//                   >
//                     <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
//                       <FaTimes size={7} className="text-red-500" />
//                     </span>
//                     {t}
//                   </li>
//                 ))}
//               </ul>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => setShowBlockConfirm(false)}
//                   className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition font-medium"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleBlockUser}
//                   disabled={blockingUser}
//                   className="flex-1 px-4 py-2.5 text-sm bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white rounded-xl font-semibold transition flex items-center justify-center gap-2 disabled:opacity-60"
//                 >
//                   {blockingUser ? (
//                     <FaSpinner className="animate-spin" size={13} />
//                   ) : (
//                     <FaBan size={12} />
//                   )}
//                   {blockingUser ? "Blocking…" : "Block User"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Unblock Confirm Modal */}
//       {showUnblockConfirm && selectedChat && (
//         <div
//           className="fixed inset-0 z-[200] flex items-center justify-center p-4"
//           style={{ background: "rgba(0,0,0,0.55)" }}
//         >
//           <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
//             <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 pt-6 pb-10">
//               <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
//                 <FaUnlock size={24} className="text-white" />
//               </div>
//               <h3 className="text-white text-center text-lg font-bold">
//                 Unblock User?
//               </h3>
//               <p className="text-emerald-100 text-center text-xs mt-1">
//                 Resume your conversation
//               </p>
//             </div>
//             <div className="-mt-4 bg-white rounded-t-2xl px-6 pt-5 pb-6">
//               <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
//                 {(() => {
//                   const other = getOtherParticipant(selectedChat);
//                   return other?.profilePhoto ? (
//                     <img
//                       src={`http://localhost:5000/uploads/profiles/${other.profilePhoto}`}
//                       alt=""
//                       className="w-10 h-10 rounded-full object-cover"
//                     />
//                   ) : (
//                     <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold">
//                       {other?.name?.charAt(0).toUpperCase() || "?"}
//                     </div>
//                   );
//                 })()}
//                 <div>
//                   <p className="font-semibold text-gray-800 text-sm">
//                     {getOtherParticipant(selectedChat)?.name}
//                   </p>
//                   <p className="text-xs text-gray-500">Will be unblocked</p>
//                 </div>
//               </div>
//               <ul className="space-y-2 mb-5">
//                 {[
//                   "They can message you again",
//                   "Previous messages will be restored",
//                   "You can block them again anytime",
//                 ].map((t, i) => (
//                   <li
//                     key={i}
//                     className="flex items-center gap-2 text-xs text-gray-600"
//                   >
//                     <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
//                       <FaCheck size={7} className="text-emerald-600" />
//                     </span>
//                     {t}
//                   </li>
//                 ))}
//               </ul>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => setShowUnblockConfirm(false)}
//                   className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition font-medium"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleUnblockUser}
//                   disabled={unblockingUser}
//                   className="flex-1 px-4 py-2.5 text-sm bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl font-semibold transition flex items-center justify-center gap-2 disabled:opacity-60"
//                 >
//                   {unblockingUser ? (
//                     <FaSpinner className="animate-spin" size={13} />
//                   ) : (
//                     <FaUnlock size={12} />
//                   )}
//                   {unblockingUser ? "Unblocking…" : "Unblock User"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Earning Details Modal */}
//       {showEarningDetailsModal && selectedEarningVehicle && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[80vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
//               <div className="flex justify-between items-center">
//                 <div className="flex items-center gap-3">
//                   <FaRupeeSign className="text-green-600 text-2xl" />
//                   <h3 className="text-xl font-bold text-gray-800">
//                     Earnings Details - {selectedEarningVehicle.vehicle?.carName}
//                   </h3>
//                 </div>
//                 <button
//                   onClick={() => setShowEarningDetailsModal(false)}
//                   className="text-gray-400 hover:text-gray-600"
//                 >
//                   <FaTimes size={24} />
//                 </button>
//               </div>
//             </div>
//             <div className="p-6">
//               {selectedEarningVehicle.bookings?.length > 0 ? (
//                 <div className="space-y-4">
//                   {selectedEarningVehicle.bookings.map((booking, idx) => (
//                     <div
//                       key={idx}
//                       className="border rounded-xl p-4 hover:shadow-md transition"
//                     >
//                       <div className="flex justify-between items-start mb-3">
//                         <div>
//                           <p className="font-semibold text-gray-800">
//                             Booking #
//                             {booking.confirmationCode || booking._id?.slice(-8)}
//                           </p>
//                           <p className="text-sm text-gray-500">
//                             {formatDate(booking.createdAt)}
//                           </p>
//                         </div>
//                         <div className="text-right">
//                           <p className="font-bold text-green-600">
//                             {formatCurrency(booking.totalAmount)}
//                           </p>
//                           <p className="text-xs text-gray-500">
//                             You earned:{" "}
//                             {formatCurrency(booking.totalAmount * 0.7)}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="grid grid-cols-2 gap-2 text-sm">
//                         <div>
//                           <span className="text-gray-500">Customer:</span>{" "}
//                           <span className="font-medium">
//                             {booking.user?.name || "N/A"}
//                           </span>
//                         </div>
//                         <div>
//                           <span className="text-gray-500">Duration:</span>{" "}
//                           <span className="font-medium">
//                             {booking.totalDays} days
//                           </span>
//                         </div>
//                         <div>
//                           <span className="text-gray-500">Pickup:</span>{" "}
//                           <span className="font-medium">
//                             {formatDate(booking.pickupDate)}
//                           </span>
//                         </div>
//                         <div>
//                           <span className="text-gray-500">Return:</span>{" "}
//                           <span className="font-medium">
//                             {formatDate(booking.returnDate)}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-12">
//                   <p className="text-gray-500">No booking details available</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Image Viewer */}
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
//               alt="Preview"
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

// export default ProfileDetails;



import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  FaCar,
  FaSignOutAlt,
  FaUserEdit,
  FaEnvelope,
  FaVenusMars,
  FaKey,
  FaCheckCircle,
  FaCamera,
  FaTimes,
  FaSave,
  FaArrowLeft,
  FaPlus,
  FaList,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaEye,
  FaEdit,
  FaTrash,
  FaBars,
  FaUserCircle,
  FaInfoCircle,
  FaFileAlt,
  FaUser,
  FaPhone,
  FaSpinner,
  FaTimesCircle,
  FaWallet,
  FaChartLine,
  FaPercentage,
  FaCreditCard,
  FaShieldAlt,
  FaUserFriends,
  FaComments,
  FaCommentDots,
  FaHeadset,
  FaPaperPlane,
  FaSmile,
  FaSync,
  FaBan,
  FaCheck,
  FaCheckDouble,
  FaLock,
  FaUnlock,
  FaSearch,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notification from "./Notification";
import { useSocket } from "../../context/SocketContext";

const chatService = {
  getUserChats: async () => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:5000/api/chats/my-chats",
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data;
  },
  getChat: async (chatId) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const response = await axios.get(
      `http://localhost:5000/api/chats/${chatId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data;
  },
  markAsRead: async (chatId) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const response = await axios.put(
      `http://localhost:5000/api/chats/${chatId}/read`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data;
  },
  blockUser: async (chatId) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const response = await axios.put(
      `http://localhost:5000/api/chats/${chatId}/block`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data;
  },
  unblockUser: async (chatId) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const response = await axios.put(
      `http://localhost:5000/api/chats/${chatId}/unblock`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data;
  },
  sendMessage: async (chatId, message) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const response = await axios.post(
      `http://localhost:5000/api/chats/${chatId}/message`,
      { message },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data;
  },
  getSupportChat: async () => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const response = await axios.post(
      "http://localhost:5000/api/chats/support",
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data;
  },
};

const ProfileDetails = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [gender, setGender] = useState("Male");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState("profile");
  const [bookings, setBookings] = useState([]);
  const [userVehicles, setUserVehicles] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [vehiclesLoading, setVehiclesLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [cancellingBooking, setCancellingBooking] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [earnings, setEarnings] = useState(null);
  const [earningsLoading, setEarningsLoading] = useState(false);
  const [selectedEarningVehicle, setSelectedEarningVehicle] = useState(null);
  const [showEarningDetailsModal, setShowEarningDetailsModal] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [startingSupportChat, setStartingSupportChat] = useState(false);
  const [processedMessageIds, setProcessedMessageIds] = useState(new Set());

  // Chat states
  const [chats, setChats] = useState([]);
  const [chatsLoading, setChatsLoading] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [showChatWindow, setShowChatWindow] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatMessagesLoading, setChatMessagesLoading] = useState(false);
  const [newChatMessage, setNewChatMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const [showBlockConfirm, setShowBlockConfirm] = useState(false);
  const [showUnblockConfirm, setShowUnblockConfirm] = useState(false);
  const [blockingUser, setBlockingUser] = useState(false);
  const [unblockingUser, setUnblockingUser] = useState(false);
  const [chatSearch, setChatSearch] = useState("");
  const [localUnreadCount, setLocalUnreadCount] = useState(0);
  const messagesEndRef = useRef(null);
  const selectedChatRef = useRef(null);
  const initialLoadDone = useRef(false);

  const {
    isConnected,
    onNewMessage,
    sendMessage: socketSendMessage,
    unreadCount: socketUnreadCount,
    resetUnreadCount,
    joinChat,
    leaveChat,
    markRead,
  } = useSocket();

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Update local unread count when socket unread count changes
  useEffect(() => {
    setLocalUnreadCount(socketUnreadCount);
  }, [socketUnreadCount]);

  // Fetch user data on mount
  useEffect(() => {
    fetchUserProfile();
    fetchNotifications();
    fetchUserBookings();
    fetchUserVehicles();
    fetchUserEarnings();
  }, []);

  // Fetch chats when switching to messages tab
  useEffect(() => {
    if (activeTab === "messages" && !initialLoadDone.current) {
      fetchUserChats();
      initialLoadDone.current = true;
    }
  }, [activeTab]);

  // Socket listener for new messages
  useEffect(() => {
    const unsubscribe = onNewMessage("*", (data) => {
      if (!data.message) return;

      const messageId = data.message._id;
      if (messageId && processedMessageIds.has(messageId)) return;
      if (messageId) {
        setProcessedMessageIds((prev) => new Set([...prev, messageId]));
        setTimeout(() => {
          setProcessedMessageIds((prev) => {
            const newSet = new Set(prev);
            newSet.delete(messageId);
            return newSet;
          });
        }, 5000);
      }

      setChats((prevChats) =>
        prevChats.map((chat) => {
          if (chat._id !== data.chatId) return chat;
          const isCurrentlyOpen = selectedChatRef.current?._id === data.chatId;
          const currentUnread = chat.unreadCounts?.[user?._id] || 0;
          return {
            ...chat,
            lastMessage: data.message.message,
            lastMessageAt: data.message.createdAt,
            unreadCounts: {
              ...chat.unreadCounts,
              [user?._id]: isCurrentlyOpen ? 0 : currentUnread + 1,
            },
          };
        }),
      );

      setChats((prev) => {
        const total = prev.reduce((acc, chat) => {
          return acc + (chat.unreadCounts?.[user?._id] || 0);
        }, 0);
        setLocalUnreadCount(total);
        return prev;
      });

      if (selectedChatRef.current?._id === data.chatId) {
        setChatMessages((prev) => {
          if (prev.some((m) => m._id === data.message._id)) return prev;
          return [...prev, data.message];
        });
        chatService.markAsRead(data.chatId);
        markRead(data.chatId);
      }
    });
    return unsubscribe;
  }, [onNewMessage, user?._id, markRead]);

  // Per-chat socket listener
  useEffect(() => {
    if (!selectedChat?._id) return;
    const chatId = selectedChat._id;
    selectedChatRef.current = selectedChat;

    const unsubscribe = onNewMessage(chatId, (data) => {
      if (!data.message) return;

      const messageId = data.message._id;
      if (messageId && processedMessageIds.has(messageId)) return;
      if (messageId) {
        setProcessedMessageIds((prev) => new Set([...prev, messageId]));
        setTimeout(() => {
          setProcessedMessageIds((prev) => {
            const newSet = new Set(prev);
            newSet.delete(messageId);
            return newSet;
          });
        }, 5000);
      }

      setChatMessages((prev) => {
        if (prev.some((m) => m._id === data.message._id)) return prev;
        const tempIdx = prev.findIndex(
          (m) =>
            m._id?.toString().startsWith("temp-") &&
            m.message === data.message.message,
        );
        if (tempIdx !== -1) {
          const next = [...prev];
          next[tempIdx] = data.message;
          return next;
        }
        return [...prev, data.message];
      });
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      chatService.markAsRead(chatId);
      markRead(chatId);
    });

    return unsubscribe;
  }, [selectedChat?._id, onNewMessage, markRead]);

  // Auto-scroll on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  const fetchUserProfile = async () => {
    try {
      setError("");
      setLoading(true);
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        setError("Please login to view your profile");
        setLoading(false);
        return;
      }
      const response = await axios.get("http://localhost:5000/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data && response.data.success) {
        const userData = response.data.user;
        setUser(userData);
        setName(userData.name || "");
        setEmail(userData.email || "");
        setUsername(userData.username || userData.email?.split("@")[0] || "");
        setGender(userData.gender || "Male");
        if (userData.profilePhoto)
          setPhotoPreview(
            `http://localhost:5000/uploads/profiles/${userData.profilePhoto}`,
          );
        setError("");
      } else {
        setError(response.data?.message || "Failed to load profile data");
      }
      setLoading(false);
    } catch (error) {
      let errorMessage = "Failed to load profile";
      if (error.response?.status === 401) {
        errorMessage = "Session expired.";
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
      }
      setError(errorMessage);
      setLoading(false);
    }
  };

  const fetchUserBookings = async () => {
    try {
      setBookingsLoading(true);
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) return;
      const response = await axios.get(
        "http://localhost:5000/api/bookings/my-bookings",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.data.success) setBookings(response.data.data.bookings);
    } catch (error) {
      toast.error("Failed to load bookings");
    } finally {
      setBookingsLoading(false);
    }
  };

  const fetchUserVehicles = async () => {
    try {
      setVehiclesLoading(true);
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) return;
      const response = await axios.get(
        "http://localhost:5000/api/user-vehicles/my-vehicles",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.data.success) setUserVehicles(response.data.data.vehicles);
    } catch (error) {
      toast.error("Failed to load vehicles");
    } finally {
      setVehiclesLoading(false);
    }
  };

  const fetchUserEarnings = async () => {
    try {
      setEarningsLoading(true);
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) return;
      const response = await axios.get(
        "http://localhost:5000/api/user-vehicles/my-earnings",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.data.success) setEarnings(response.data.data);
    } catch (error) {
      toast.error("Failed to load earnings data");
    } finally {
      setEarningsLoading(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) return;
      const response = await axios.get(
        "http://localhost:5000/api/notifications",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.data.success) setNotifications(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserChats = async () => {
    try {
      setChatsLoading(true);
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) return;
      const response = await chatService.getUserChats();
      if (response.success) {
        setChats(response.data);
        const totalUnread = response.data.reduce((acc, chat) => {
          return acc + (chat.unreadCounts?.[user?._id] || 0);
        }, 0);
        setLocalUnreadCount(totalUnread);
        if (resetUnreadCount) resetUnreadCount();
      }
    } catch (error) {
      toast.error("Failed to load messages");
    } finally {
      setChatsLoading(false);
    }
  };

  const fetchChatMessages = async (chatId) => {
    try {
      setChatMessagesLoading(true);
      const response = await chatService.getChat(chatId);
      if (response.success) {
        setChatMessages(response.data.messages || []);
        await chatService.markAsRead(chatId);
        markRead(chatId);
        setChats((prev) =>
          prev.map((c) =>
            c._id !== chatId
              ? c
              : {
                  ...c,
                  unreadCounts: { ...c.unreadCounts, [user?._id]: 0 },
                },
          ),
        );
        const totalUnread = chats.reduce((acc, chat) => {
          if (chat._id === chatId) return acc;
          return acc + (chat.unreadCounts?.[user?._id] || 0);
        }, 0);
        setLocalUnreadCount(totalUnread);
      }
    } catch (error) {
      toast.error("Failed to load messages");
    } finally {
      setChatMessagesLoading(false);
    }
  };

  const handleOpenChat = async (chat) => {
    if (selectedChatRef.current?._id) {
      leaveChat(selectedChatRef.current._id);
    }

    setSelectedChat(chat);
    setShowChatWindow(true);
    joinChat(chat._id);

    if (!chat.isBlocked) {
      await fetchChatMessages(chat._id);
    } else {
      setChatMessages([]);
    }

    setTimeout(() => {
      const input = document.querySelector(".chat-message-input");
      if (input) input.focus();
    }, 200);
  };

  const handleCloseChat = () => {
    if (selectedChatRef.current?._id) {
      leaveChat(selectedChatRef.current._id);
    }
    setShowChatWindow(false);
    setSelectedChat(null);
    setChatMessages([]);
    setNewChatMessage("");
    selectedChatRef.current = null;
  };

  const handleBlockUser = async () => {
    if (!selectedChat) return;
    setBlockingUser(true);
    try {
      const response = await chatService.blockUser(selectedChat._id);
      if (response.success) {
        toast.success(
          `${getOtherParticipant(selectedChat)?.name} has been blocked`,
        );
        await fetchUserChats();
        setSelectedChat((prev) => ({
          ...prev,
          isBlocked: true,
          blockedBy: user?._id,
        }));
        setChatMessages([]);
      }
    } catch (error) {
      toast.error("Failed to block user");
    } finally {
      setBlockingUser(false);
      setShowBlockConfirm(false);
    }
  };

  const handleUnblockUser = async () => {
    if (!selectedChat) return;
    setUnblockingUser(true);
    try {
      const response = await chatService.unblockUser(selectedChat._id);
      if (response.success) {
        toast.success(
          `${getOtherParticipant(selectedChat)?.name} has been unblocked`,
        );
        await fetchUserChats();
        const updatedChat = {
          ...selectedChat,
          isBlocked: false,
          blockedBy: null,
        };
        setSelectedChat(updatedChat);
        await fetchChatMessages(selectedChat._id);
      }
    } catch (error) {
      toast.error("Failed to unblock user");
    } finally {
      setUnblockingUser(false);
      setShowUnblockConfirm(false);
    }
  };

  const handleSendChatMessage = async () => {
    if (!newChatMessage.trim() || sendingMessage || selectedChat?.isBlocked)
      return;

    setSendingMessage(true);
    const messageText = newChatMessage;
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

    const tempMessage = {
      _id: `temp-${Date.now()}`,
      message: messageText,
      senderType: "user",
      read: false,
      delivered: false,
      createdAt: new Date(),
      sender: {
        _id: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
        profilePhoto: currentUser.profilePhoto,
        role: currentUser.role,
      },
    };

    setChatMessages((prev) => [...prev, tempMessage]);
    setNewChatMessage("");

    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    try {
      const response = await chatService.sendMessage(
        selectedChat._id,
        messageText,
      );
      if (response.success) {
        setChatMessages((prev) =>
          prev.map((m) => (m._id === tempMessage._id ? response.data : m)),
        );
        if (socketSendMessage && isConnected) {
          socketSendMessage(selectedChat._id, messageText);
        }
      } else {
        setChatMessages((prev) =>
          prev.filter((m) => m._id !== tempMessage._id),
        );
        toast.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setChatMessages((prev) => prev.filter((m) => m._id !== tempMessage._id));
      toast.error("Failed to send message");
    } finally {
      setSendingMessage(false);
    }
  };

  const handleStartSupportChat = async () => {
    setStartingSupportChat(true);
    try {
      const response = await chatService.getSupportChat();
      if (response.success) {
        setActiveTab("messages");
        setSelectedChat(response.data);
        setShowChatWindow(true);
        toast.success("Support chat started!");
      }
    } catch (error) {
      console.error("Error starting support chat:", error);
      toast.error("Failed to start support chat");
    } finally {
      setStartingSupportChat(false);
    }
  };

  const markNotificationAsRead = async (notificationId) => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/notifications/${notificationId}/read`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n)),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      await axios.delete(
        `http://localhost:5000/api/notifications/${notificationId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    localStorage.removeItem("rememberMe");
    navigate("/login");
  };

  const handleEditToggle = () => {
    if (editing && user) {
      setName(user.name);
      setUsername(user.username || user.email?.split("@")[0] || "");
      setGender(user.gender || "Male");
      if (user.profilePhoto)
        setPhotoPreview(
          `http://localhost:5000/uploads/profiles/${user.profilePhoto}`,
        );
      else setPhotoPreview(null);
      setProfilePhoto(null);
    }
    setEditing(!editing);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setProfilePhoto(null);
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSaveProfile = async () => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        toast.error("Please login again");
        navigate("/login");
        return;
      }
      setUploading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("username", username);
      formData.append("gender", gender);
      if (profilePhoto) formData.append("profilePhoto", profilePhoto);
      const response = await axios.put(
        "http://localhost:5000/api/profile/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (response.data.success) {
        setUser(response.data.user);
        setEditing(false);
        setProfilePhoto(null);
        if (response.data.user.profilePhoto)
          setPhotoPreview(
            `http://localhost:5000/uploads/profiles/${response.data.user.profilePhoto}`,
          );
        toast.success("Profile updated successfully!");
      } else toast.error("Failed to update profile");
      setUploading(false);
    } catch (error) {
      setUploading(false);
      toast.error(error.response?.data?.message || "Failed to update profile.");
    }
  };

  const handleCancelBooking = async () => {
    if (!cancelReason.trim()) {
      toast.error("Please provide a reason for cancellation");
      return;
    }
    setCancellingBooking(true);
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:5000/api/bookings/${selectedBooking._id}/cancel`,
        { reason: cancelReason },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (response.data.success) {
        toast.success("Booking cancelled successfully!");
        fetchUserBookings();
        setShowBookingModal(false);
        setShowCancelConfirm(false);
        setCancelReason("");
      } else toast.error(response.data.message || "Failed to cancel booking");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to cancel booking");
    } finally {
      setCancellingBooking(false);
    }
  };

  const openCancelModal = (booking) => {
    setSelectedBooking(booking);
    setShowCancelConfirm(true);
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowBookingModal(true);
  };

  const handleMakePayment = async (booking) => {
    setSelectedBooking(booking);
    setPaymentLoading(true);
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/payments/initiate-khalti",
        {
          bookingId: booking._id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.data.success && response.data.payment_url) {
        sessionStorage.setItem("current_booking_id", booking._id);
        window.location.href = response.data.payment_url;
      } else toast.error("Failed to initiate payment");
    } catch (error) {
      toast.error(error.response?.data?.message || "Payment failed");
    } finally {
      setPaymentLoading(false);
    }
  };

  const openImageViewer = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowImageViewer(true);
  };

  const getVehicleImageUrl = (vehicle, index = 0) => {
    if (vehicle.vehiclePhotos && vehicle.vehiclePhotos[index])
      return `http://localhost:5000${vehicle.vehiclePhotos[index].url}`;
    return null;
  };

  const getVehicleImageForBooking = (booking) => {
    if (booking.vehicle?.photos && booking.vehicle.photos.length > 0) {
      const folder =
        booking.vehicleType === "user" ? "user-vehicles" : "vehicles";
      return `http://localhost:5000/uploads/${folder}/${booking.vehicle.photos[0].filename}`;
    }
    if (
      booking.vehicle?.vehiclePhotos &&
      booking.vehicle.vehiclePhotos.length > 0
    )
      return `http://localhost:5000${booking.vehicle.vehiclePhotos[0].url}`;
    return null;
  };

  const getOtherParticipant = (chat) => {
    const currentUserId = user?._id;
    if (!chat || !chat.participants || !Array.isArray(chat.participants)) {
      return null;
    }
    const others = chat.participants.filter(
      (p) => p && p._id && p._id !== currentUserId,
    );
    return others[0] || null;
  };

  const filteredChats = chats.filter((chat) => {
    if (!chatSearch.trim()) return true;
    const other = getOtherParticipant(chat);
    if (!other) return false;
    const q = chatSearch.toLowerCase();
    return (
      (other?.name || "").toLowerCase().includes(q) ||
      (chat.lastMessage || "").toLowerCase().includes(q) ||
      (chat.vehicleName || "").toLowerCase().includes(q)
    );
  });

  const formatChatTime = (date) => {
    if (!date) return "";
    const now = new Date();
    const msgDate = new Date(date);
    const diffMs = now - msgDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffMins < 1) return "now";
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays === 1) return "Yesterday";
    return msgDate.toLocaleDateString();
  };

  const formatMessageTime = (date) =>
    new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  const getUnreadCountForChat = (chat) => {
    return chat.unreadCounts?.[user?._id] || 0;
  };

  const getSenderLabel = (senderType) => {
    if (senderType === "admin") return "Support Team";
    if (senderType === "owner") return "Vehicle Owner";
    return "Customer";
  };

  const getMessageBubbleStyle = (isOwn, senderType) => {
    if (isOwn) {
      return "bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl rounded-br-sm shadow-sm";
    }
    if (senderType === "owner") {
      return "bg-orange-50 border border-orange-200 text-gray-800 rounded-2xl rounded-bl-sm shadow-sm";
    }
    if (senderType === "admin") {
      return "bg-purple-50 border border-purple-200 text-gray-800 rounded-2xl rounded-bl-sm shadow-sm";
    }
    return "bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-bl-sm shadow-sm";
  };

  const getRoleDisplayForChat = (chat) => {
    if (chat.chatType === "support") return "Support Team";
    if (chat.chatType === "vehicle") {
      const other = getOtherParticipant(chat);
      if (other?.role === "admin") return "Support";
      const currentUserIsOwner = chat.metadata?.get?.("ownerId") === user?._id;
      if (currentUserIsOwner) {
        return "Customer";
      } else {
        return "Vehicle Owner";
      }
    }
    return "Customer";
  };

  const getStatusBadge = (status) => {
    const cfg = {
      pending: {
        color: "bg-yellow-100 text-yellow-800",
        label: "Pending",
        icon: FaClock,
      },
      approved: {
        color: "bg-blue-100 text-blue-800",
        label: "Approved",
        icon: FaCheckCircle,
      },
      rejected: {
        color: "bg-red-100 text-red-800",
        label: "Rejected",
        icon: FaTimesCircle,
      },
      confirmed: {
        color: "bg-green-100 text-green-800",
        label: "Confirmed",
        icon: FaCheckCircle,
      },
      active: {
        color: "bg-purple-100 text-purple-800",
        label: "Active",
        icon: FaCar,
      },
      completed: {
        color: "bg-gray-100 text-gray-800",
        label: "Completed",
        icon: FaCheckCircle,
      },
      cancelled: {
        color: "bg-red-100 text-red-800",
        label: "Cancelled",
        icon: FaTimesCircle,
      },
      expired: {
        color: "bg-orange-100 text-orange-800",
        label: "Expired",
        icon: FaClock,
      },
      inactive: {
        color: "bg-gray-100 text-gray-600",
        label: "Inactive",
        icon: FaTimesCircle,
      },
      booked: {
        color: "bg-orange-100 text-orange-800",
        label: "Booked",
        icon: FaCalendarAlt,
      },
    };
    const c = cfg[status] || cfg.pending;
    const Icon = c.icon;
    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-1 ${c.color}`}
      >
        <Icon size={12} /> {c.label}
      </span>
    );
  };

  const getPaymentStatusBadge = (ps) => {
    const cfg = {
      pending: {
        color: "bg-yellow-100 text-yellow-800",
        label: "Payment Pending",
      },
      paid: { color: "bg-green-100 text-green-800", label: "Paid" },
      failed: { color: "bg-red-100 text-red-800", label: "Payment Failed" },
      refunded: { color: "bg-gray-100 text-gray-800", label: "Refunded" },
    };
    const s = cfg[ps] || cfg.pending;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${s.color}`}>
        {s.label}
      </span>
    );
  };

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  const formatDateTime = (d) =>
    new Date(d).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  const formatCurrency = (a) => `रु ${a?.toLocaleString("en-NP") || 0}`;

  const sidebarItems = [
    { id: "profile", icon: FaUserCircle, label: "Profile" },
    { id: "bookings", icon: FaCalendarAlt, label: "My Bookings" },
    { id: "listed-vehicles", icon: FaList, label: "My Listed Vehicles" },
    { id: "earnings", icon: FaRupeeSign, label: "My Earnings" },
    { id: "messages", icon: FaComments, label: "Messages" },
  ];

  const iBlockedThem =
    selectedChat?.isBlocked && selectedChat?.blockedBy === user?._id;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold mb-2">Error Loading Profile</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => {
              setLoading(true);
              fetchUserProfile();
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full backdrop-blur-xl bg-white/95 shadow-2xl transition-all duration-300 z-20 ${
          sidebarOpen ? "w-72" : "w-20"
        }`}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
                <FaCar className="text-white text-2xl" />
              </div>
              {sidebarOpen && (
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Rent<span className="text-gray-800">Ride</span>
                  </h1>
                  <p className="text-xs text-gray-500 mt-0.5">User Panel</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <FaBars className="text-gray-600" />
            </button>
          </div>
        </div>

        {sidebarOpen && user && (
          <div className="mx-4 mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
            <div className="flex items-center gap-3">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="profile"
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                />
              ) : (
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
                  <FaUserCircle className="text-white text-2xl" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        <nav className="mt-6 px-3">
          <p
            className={`text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 ${!sidebarOpen && "text-center"}`}
          >
            {sidebarOpen ? "MAIN MENU" : "..."}
          </p>
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const isHovered = hoveredItem === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (item.id === "messages") fetchUserChats();
                }}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`relative w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-xl transition-all duration-300 group ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-100"
                } ${!sidebarOpen && "justify-center"}`}
              >
                <Icon
                  className={`text-xl ${
                    isActive ? "text-white" : "text-gray-500"
                  } transition-transform duration-300 group-hover:scale-110`}
                />
                {sidebarOpen && (
                  <span
                    className={`font-medium ${isActive ? "text-white" : ""}`}
                  >
                    {item.label}
                  </span>
                )}
                {!sidebarOpen && isHovered && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
                {isActive && sidebarOpen && (
                  <div className="absolute left-0 w-1 h-8 bg-white rounded-r-full"></div>
                )}
                {item.id === "messages" &&
                  localUnreadCount > 0 &&
                  sidebarOpen && (
                    <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                      {localUnreadCount > 99 ? "99+" : localUnreadCount}
                    </span>
                  )}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              !sidebarOpen && "justify-center"
            } bg-red-50 hover:bg-red-100 text-red-600 group`}
          >
            <FaSignOutAlt className="text-xl transition-transform duration-300 group-hover:scale-110" />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${sidebarOpen ? "ml-72" : "ml-20"}`}
      >
        <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
          <div className="px-8 py-5">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  {activeTab === "profile" && "My Profile"}
                  {activeTab === "bookings" && "My Bookings"}
                  {activeTab === "listed-vehicles" && "My Listed Vehicles"}
                  {activeTab === "earnings" && "My Earnings"}
                  {activeTab === "messages" && "Messages"}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  {activeTab === "profile" &&
                    "Manage your personal information"}
                  {activeTab === "bookings" && "View and manage your bookings"}
                  {activeTab === "listed-vehicles" &&
                    "Manage your listed vehicles"}
                  {activeTab === "earnings" &&
                    "Track your earnings from listed vehicles"}
                  {activeTab === "messages" && "Your conversations"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleStartSupportChat}
                  disabled={startingSupportChat}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition disabled:opacity-50"
                >
                  {startingSupportChat ? (
                    <FaSpinner className="animate-spin" size={14} />
                  ) : (
                    <FaHeadset size={14} />
                  )}
                  <span>Contact Support</span>
                </button>
                <Notification
                  notifications={notifications}
                  onMarkAsRead={markNotificationAsRead}
                  onDelete={deleteNotification}
                />
              </div>
            </div>
          </div>
        </header>

        <main className="p-8">
          {/* ===== PROFILE TAB ===== */}
          {activeTab === "profile" && (
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="profile"
                    className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-3xl shadow-lg">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
                {editing && (
                  <>
                    <button
                      onClick={() => fileInputRef.current.click()}
                      className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition shadow-md"
                    >
                      <FaCamera />
                    </button>
                    {photoPreview && (
                      <button
                        onClick={handleRemovePhoto}
                        className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition shadow-md"
                      >
                        <FaTimes size={12} />
                      </button>
                    )}
                  </>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </div>
              <div className="mb-6">
                {editing ? (
                  <div className="flex flex-col items-center gap-2">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="text-xl font-semibold text-center bg-transparent border-b border-blue-300 focus:outline-none mb-1 focus:border-blue-500"
                      placeholder="Enter name"
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">@</span>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="text-gray-500 text-center bg-transparent border-b border-blue-300 focus:outline-none focus:border-blue-500"
                        placeholder="username"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <h2 className="text-xl font-semibold">{user?.name}</h2>
                    <p className="text-gray-500">@{username}</p>
                  </div>
                )}
              </div>
              <button
                onClick={editing ? handleSaveProfile : handleEditToggle}
                disabled={uploading}
                className={`flex items-center gap-2 w-64 py-3 rounded-xl font-medium mb-10 justify-center transition ${
                  editing
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                } ${uploading ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {uploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : editing ? (
                  <>
                    <FaSave /> Save Profile
                  </>
                ) : (
                  <>
                    <FaUserEdit /> Edit Profile
                  </>
                )}
              </button>
              {editing && (
                <button
                  onClick={handleEditToggle}
                  className="flex items-center gap-2 w-64 bg-red-100 hover:bg-red-200 text-red-700 py-3 rounded-xl font-medium mb-10 justify-center transition"
                >
                  <FaTimes /> Cancel Edit
                </button>
              )}
              <div className="w-full max-w-xl space-y-6">
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <FaEnvelope /> <span>Email</span>
                  </div>
                  <span className="font-medium">{user?.email}</span>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <FaVenusMars /> <span>Gender</span>
                  </div>
                  {editing ? (
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">
                        Prefer not to say
                      </option>
                    </select>
                  ) : (
                    <span className="font-medium">
                      {user?.gender || "Not specified"}
                    </span>
                  )}
                </div>
                <div className="space-y-4 pt-4">
                  <button
                    onClick={() => navigate("/change-password")}
                    className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-6 py-2 rounded-xl font-medium transition w-full justify-center"
                  >
                    <FaKey /> Change Password
                  </button>
                  <div className="text-center mt-4">
                    <button
                      onClick={() => navigate("/forgot-password")}
                      className="text-sm text-blue-600 hover:text-blue-700 transition"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    {user?.kycVerified ? (
                      <>
                        <FaCheckCircle className="text-green-600 text-lg" />
                        <span className="font-medium text-green-600">
                          KYC Verified
                        </span>
                      </>
                    ) : (
                      <>
                        <FaCheckCircle className="text-yellow-500 text-lg" />
                        <span className="font-medium text-yellow-600">
                          KYC Pending
                        </span>
                        <button
                          onClick={() => navigate("/identity-verification")}
                          className="ml-2 text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-200 transition"
                        >
                          Verify Now
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className="pt-6 border-t">
                  <p className="text-sm text-center text-gray-500">
                    Member since:{" "}
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        })
                      : "Recently"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ===== BOOKINGS TAB ===== */}
          {activeTab === "bookings" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                My Bookings
              </h2>
              {bookingsLoading ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-500">Loading bookings...</p>
                </div>
              ) : bookings.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl shadow">
                  <FaCalendarAlt className="text-5xl text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No bookings found</p>
                  <button
                    onClick={() => navigate("/rentridehome")}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Browse Vehicles
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking._id}
                      className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition"
                    >
                      <div className="flex gap-4">
                        <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          {getVehicleImageForBooking(booking) ? (
                            <img
                              src={getVehicleImageForBooking(booking)}
                              alt={booking.vehicle?.carName}
                              className="w-full h-full object-cover cursor-pointer"
                              onClick={() =>
                                openImageViewer(
                                  getVehicleImageForBooking(booking),
                                )
                              }
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <FaCar className="text-gray-400 text-3xl" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">
                                {booking.vehicle?.carName}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {booking.vehicle?.carNumber}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                Booking ID: {booking.confirmationCode}
                              </p>
                            </div>
                            <div className="text-right">
                              {getStatusBadge(booking.status)}
                              <div className="mt-2">
                                {getPaymentStatusBadge(booking.paymentStatus)}
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                            <div className="flex items-center gap-1 text-xs text-gray-600">
                              <FaCalendarAlt size={10} />
                              <span>
                                {formatDate(booking.pickupDate)} -{" "}
                                {formatDate(booking.returnDate)}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-600">
                              <FaClock size={10} />
                              <span>
                                {booking.totalDays} day
                                {booking.totalDays > 1 ? "s" : ""}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-600">
                              <FaMapMarkerAlt size={10} />
                              <span className="truncate">
                                {booking.pickupLocation}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-600">
                              <FaRupeeSign size={10} />
                              <span className="font-semibold text-blue-600">
                                {formatCurrency(booking.totalAmount)}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-600">
                              <FaUser size={10} />
                              <span>
                                {booking.driverOption === "with"
                                  ? "With Driver"
                                  : "Self Drive"}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-600">
                              <FaShieldAlt size={10} />
                              <span>
                                {booking.insuranceOption === "premium"
                                  ? "Premium"
                                  : "Basic"}
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-end gap-3">
                            <button
                              onClick={() => handleViewDetails(booking)}
                              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                            >
                              <FaEye size={12} /> View Details
                            </button>
                            {booking.status === "approved" &&
                              booking.paymentStatus === "pending" && (
                                <button
                                  onClick={() => handleMakePayment(booking)}
                                  disabled={paymentLoading}
                                  className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1"
                                >
                                  <FaCreditCard size={12} /> Make Payment
                                </button>
                              )}
                            {(booking.status === "pending" ||
                              booking.status === "approved") && (
                              <button
                                onClick={() => openCancelModal(booking)}
                                className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1"
                              >
                                <FaTrash size={12} /> Cancel Booking
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ===== LISTED VEHICLES TAB ===== */}
          {activeTab === "listed-vehicles" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    My Listed Vehicles
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Manage and track all vehicles you've listed for rent
                  </p>
                </div>
                <button
                  onClick={() => navigate("/list-vehicle")}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2.5 px-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <FaPlus /> List New Vehicle
                </button>
              </div>

              {vehiclesLoading ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-500">Loading vehicles...</p>
                </div>
              ) : userVehicles.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl shadow">
                  <FaCar className="text-5xl text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No vehicles listed</p>
                  <button
                    onClick={() => navigate("/list-vehicle")}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    List Your First Vehicle
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {userVehicles.map((vehicle) => (
                    <div
                      key={vehicle._id}
                      className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition"
                    >
                      <div className="flex gap-4">
                        {/* Vehicle Thumbnail */}
                        <div className="w-32 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          {vehicle.vehiclePhotos && vehicle.vehiclePhotos[0] ? (
                            <img
                              src={`http://localhost:5000${vehicle.vehiclePhotos[0].url}`}
                              alt={vehicle.carName}
                              className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition"
                              onClick={() =>
                                openImageViewer(
                                  `http://localhost:5000${vehicle.vehiclePhotos[0].url}`,
                                )
                              }
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <FaCar className="text-gray-400 text-3xl" />
                            </div>
                          )}
                        </div>

                        {/* Vehicle Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">
                                {vehicle.carName}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {vehicle.carNumber}
                              </p>
                              <p className="text-xs text-gray-400 mt-0.5">
                                {vehicle.carType} &middot; {vehicle.seats} seats
                                &middot; {vehicle.gearType} &middot;{" "}
                                {vehicle.airCondition === "Yes" ? "AC" : "No AC"}
                              </p>
                            </div>
                            <div className="flex-shrink-0">
                              {getStatusBadge(vehicle.status)}
                            </div>
                          </div>

                          {/* Details row */}
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                            <div className="flex items-center gap-1 text-xs text-gray-600">
                              <FaRupeeSign size={10} className="text-blue-500" />
                              <span className="font-semibold text-blue-600">
                                {formatCurrency(vehicle.ratePerDay)}/day
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-600">
                              <FaMapMarkerAlt size={10} className="text-red-400" />
                              <span className="truncate">
                                {vehicle.city}
                                {vehicle.district
                                  ? `, ${vehicle.district}`
                                  : ""}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-600">
                              <FaCalendarAlt size={10} className="text-gray-400" />
                              <span>
                                {vehicle.listedAt
                                  ? `Listed ${formatDate(vehicle.listedAt)}`
                                  : `Added ${formatDate(vehicle.createdAt)}`}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-600">
                              <FaUser size={10} className="text-gray-400" />
                              <span>{vehicle.bookingType}</span>
                            </div>
                            {vehicle.vehiclePhotos?.length > 0 && (
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <FaEye size={10} />
                                <span>
                                  {vehicle.vehiclePhotos.length} photo
                                  {vehicle.vehiclePhotos.length !== 1 ? "s" : ""}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Rejection reason */}
                          {vehicle.rejectionReason && (
                            <div className="mb-3 p-2 bg-red-50 border border-red-100 rounded-lg text-xs text-red-600">
                              <span className="font-semibold">
                                Rejection reason:
                              </span>{" "}
                              {vehicle.rejectionReason}
                            </div>
                          )}

                          {/* Action buttons */}
                          <div className="flex justify-end gap-3 pt-1">
                            <button
                              onClick={() =>
                                navigate(`/vehicle-details/${vehicle._id}`)
                              }
                              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 transition"
                            >
                              <FaEye size={12} /> View Details
                            </button>
                            {(vehicle.status === "pending" ||
                              vehicle.status === "rejected") && (
                              <>
                                <button
                                  onClick={() =>
                                    navigate(`/edit-vehicle/${vehicle._id}`)
                                  }
                                  className="text-yellow-600 hover:text-yellow-700 text-sm font-medium flex items-center gap-1 transition"
                                >
                                  <FaEdit size={12} /> Edit
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ===== EARNINGS TAB ===== */}
          {activeTab === "earnings" && (
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  My Earnings
                </h2>
                <p className="text-gray-500">
                  Track your earnings from vehicles you've listed on RentRide
                  (70% of booking amount)
                </p>
              </div>
              {earningsLoading ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-500">Loading earnings data...</p>
                </div>
              ) : !earnings || earnings.totalEarnings === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl shadow">
                  <FaWallet className="text-5xl text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No earnings yet</p>
                  <p className="text-sm text-gray-400 mt-1">
                    When users book your listed vehicles, you'll see your
                    earnings here
                  </p>
                  <button
                    onClick={() => navigate("/list-vehicle")}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    List a Vehicle
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-2xl shadow p-5 flex items-center gap-4">
                      <div className="p-3 bg-green-100 rounded-xl">
                        <FaRupeeSign className="text-green-600 text-xl" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Total Earnings</p>
                        <p className="text-xl font-bold text-green-600">
                          {formatCurrency(earnings.totalEarnings)}
                        </p>
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow p-5 flex items-center gap-4">
                      <div className="p-3 bg-blue-100 rounded-xl">
                        <FaCalendarAlt className="text-blue-600 text-xl" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Total Bookings</p>
                        <p className="text-xl font-bold text-blue-600">
                          {earnings.totalBookings}
                        </p>
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow p-5 flex items-center gap-4">
                      <div className="p-3 bg-purple-100 rounded-xl">
                        <FaChartLine className="text-purple-600 text-xl" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Gross Revenue</p>
                        <p className="text-xl font-bold text-purple-600">
                          {formatCurrency(earnings.grossRevenue)}
                        </p>
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow p-5 flex items-center gap-4">
                      <div className="p-3 bg-orange-100 rounded-xl">
                        <FaPercentage className="text-orange-600 text-xl" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Avg per Booking</p>
                        <p className="text-xl font-bold text-orange-600">
                          {formatCurrency(earnings.averagePerBooking)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <FaInfoCircle className="text-blue-600" />
                      </div>
                      <p className="text-sm text-blue-800">
                        <strong>Commission Structure:</strong> When a user books
                        your vehicle, RentRide takes 30% commission and you
                        receive 70% of the total booking amount.
                      </p>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                      <h2 className="text-lg font-semibold text-gray-800">
                        Earnings by Vehicle
                      </h2>
                      <p className="text-sm text-gray-500">
                        Detailed breakdown of earnings from each vehicle
                      </p>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            {[
                              "Vehicle",
                              "Bookings",
                              "Gross Revenue",
                              "Your Earnings (70%)",
                              "Action",
                            ].map((h) => (
                              <th
                                key={h}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                              >
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {earnings.vehicles?.map((ve, index) => (
                            <tr
                              key={index}
                              className="hover:bg-gray-50 transition"
                            >
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  {ve.vehicle?.vehiclePhotos?.[0] && (
                                    <img
                                      src={`http://localhost:5000${ve.vehicle.vehiclePhotos[0].url}`}
                                      alt={ve.vehicle?.carName}
                                      className="w-10 h-10 object-cover rounded-lg"
                                    />
                                  )}
                                  <div>
                                    <p className="font-medium text-gray-900">
                                      {ve.vehicle?.carName}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {ve.vehicle?.carNumber}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className="font-semibold text-gray-700">
                                  {ve.totalBookings}
                                </span>
                              </td>
                              <td className="px-6 py-4 font-medium text-gray-700">
                                {formatCurrency(ve.grossRevenue)}
                              </td>
                              <td className="px-6 py-4">
                                <span className="font-bold text-green-600">
                                  {formatCurrency(ve.ownerEarnings)}
                                </span>
                                <p className="text-xs text-gray-400">
                                  70% of {formatCurrency(ve.grossRevenue)}
                                </p>
                              </td>
                              <td className="px-6 py-4">
                                <button
                                  onClick={() => {
                                    setSelectedEarningVehicle(ve);
                                    setShowEarningDetailsModal(true);
                                  }}
                                  className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                                >
                                  <FaEye size={12} /> View Details
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ===== MESSAGES TAB ===== */}
          {activeTab === "messages" && (
            <div className="flex h-[calc(100vh-180px)] rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-white">
              {/* Chat List */}
              <div
                className={`${showChatWindow ? "hidden md:flex" : "flex"} flex-col md:w-[320px] w-full border-r border-gray-100 bg-white flex-shrink-0`}
              >
                <div className="px-4 pt-4 pb-3 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h2 className="text-base font-bold text-gray-900">
                        Messages
                      </h2>
                      <p className="text-xs text-gray-400">
                        {chats.length} conversation
                        {chats.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <button
                      onClick={fetchUserChats}
                      title="Refresh"
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-blue-500 transition"
                    >
                      <FaSync
                        className={chatsLoading ? "animate-spin" : ""}
                        size={13}
                      />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                    <FaSearch
                      size={11}
                      className="text-gray-400 flex-shrink-0"
                    />
                    <input
                      type="text"
                      value={chatSearch}
                      onChange={(e) => setChatSearch(e.target.value)}
                      placeholder="Search conversations…"
                      className="flex-1 bg-transparent text-xs text-gray-700 placeholder-gray-400 focus:outline-none"
                    />
                    {chatSearch && (
                      <button
                        onClick={() => setChatSearch("")}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <FaTimes size={10} />
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {chatsLoading ? (
                    <div className="flex justify-center items-center h-32">
                      <FaSpinner className="animate-spin text-blue-400 text-xl" />
                    </div>
                  ) : filteredChats.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full py-16 text-center px-6">
                      <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-3">
                        <FaCommentDots className="text-blue-300 text-2xl" />
                      </div>
                      <p className="text-sm font-medium text-gray-600">
                        {chatSearch
                          ? "No results found"
                          : "No conversations yet"}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {chatSearch
                          ? "Try a different search"
                          : "Start a chat from any vehicle listing or click 'Contact Support'"}
                      </p>
                    </div>
                  ) : (
                    filteredChats.map((chat) => {
                      const other = getOtherParticipant(chat);
                      const unreadCnt = getUnreadCountForChat(chat);
                      const lastMsg = chat.lastMessage || "No messages yet";
                      const lastMsgTime = formatChatTime(
                        chat.lastMessageAt || chat.updatedAt,
                      );
                      const isVehicleChat = chat.chatType === "vehicle";
                      const isSupportChat = chat.chatType === "support";
                      const isBlocked = chat.isBlocked;
                      const isSelected =
                        selectedChat?._id === chat._id && showChatWindow;
                      const roleDisplay = getRoleDisplayForChat(chat);

                      return (
                        <div
                          key={chat._id}
                          onClick={() => handleOpenChat(chat)}
                          className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all border-b border-gray-50 ${isSelected ? "bg-blue-50 border-l-[3px] border-l-blue-500" : "hover:bg-gray-50 border-l-[3px] border-l-transparent"} ${isBlocked ? "opacity-70" : ""}`}
                        >
                          <div className="relative flex-shrink-0">
                            {isSupportChat ? (
                              <div className="w-11 h-11 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-lg font-bold">
                                <FaHeadset size={20} />
                              </div>
                            ) : other?.profilePhoto ? (
                              <img
                                src={`http://localhost:5000/uploads/profiles/${other.profilePhoto}`}
                                alt={other.name}
                                className="w-11 h-11 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
                                {other?.name?.charAt(0).toUpperCase() || "?"}
                              </div>
                            )}
                            {unreadCnt > 0 && !isBlocked && (
                              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-0.5">
                                {unreadCnt > 9 ? "9+" : unreadCnt}
                              </span>
                            )}
                            {isBlocked && (
                              <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center shadow-sm">
                                <FaBan size={7} />
                              </span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline justify-between gap-1">
                              <span
                                className={`text-sm font-semibold truncate ${unreadCnt > 0 ? "text-gray-900" : "text-gray-700"}`}
                              >
                                {isSupportChat
                                  ? "Support Team"
                                  : other?.name || "Unknown User"}
                              </span>
                              <span className="text-[10px] text-gray-400 flex-shrink-0">
                                {lastMsgTime}
                              </span>
                            </div>
                            <p
                              className={`text-xs truncate mt-0.5 ${unreadCnt > 0 && !isBlocked ? "text-gray-800 font-medium" : "text-gray-400"}`}
                            >
                              {isBlocked ? "Conversation blocked" : lastMsg}
                            </p>
                            <div className="flex items-center gap-1.5 mt-1">
                              <span
                                className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold uppercase tracking-wide ${isSupportChat ? "bg-purple-50 text-purple-600" : isVehicleChat ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-600"}`}
                              >
                                {roleDisplay}
                              </span>
                              {chat.vehicleName && !isSupportChat && (
                                <span className="text-[10px] text-gray-400 truncate">
                                  · {chat.vehicleName}
                                </span>
                              )}
                              {isBlocked && (
                                <span className="text-[9px] text-red-500 font-semibold uppercase tracking-wide">
                                  Blocked
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {chats.length} conversation{chats.length !== 1 ? "s" : ""}
                  </span>
                  {localUnreadCount > 0 && (
                    <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-full">
                      {localUnreadCount} unread
                    </span>
                  )}
                </div>
              </div>

              {/* Chat Window */}
              {showChatWindow && selectedChat ? (
                <div className="flex-1 flex flex-col min-w-0">
                  {/* Header */}
                  <div className="px-5 py-3 bg-white border-b border-gray-100 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleCloseChat}
                        className="lg:hidden w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition"
                      >
                        <FaArrowLeft size={14} />
                      </button>
                      {(() => {
                        const other = getOtherParticipant(selectedChat);
                        const isSupportChat =
                          selectedChat.chatType === "support";
                        const roleText = getRoleDisplayForChat(selectedChat);
                        return (
                          <>
                            {isSupportChat ? (
                              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-lg font-bold">
                                <FaHeadset size={18} />
                              </div>
                            ) : other?.profilePhoto ? (
                              <img
                                src={`http://localhost:5000/uploads/profiles/${other.profilePhoto}`}
                                alt={other.name}
                                className="w-9 h-9 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
                                {other?.name?.charAt(0).toUpperCase() || "?"}
                              </div>
                            )}
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-semibold text-gray-900 leading-tight">
                                  {isSupportChat
                                    ? "Support Team"
                                    : other?.name || "Unknown User"}
                                </p>
                                {selectedChat.isBlocked && (
                                  <span className="inline-flex items-center gap-1 text-[10px] bg-red-50 text-red-500 border border-red-200 px-1.5 py-0.5 rounded-full font-semibold">
                                    <FaBan size={8} /> Blocked
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-gray-400">
                                {roleText}
                                {selectedChat.vehicleName && !isSupportChat && (
                                  <span className="ml-1">
                                    · {selectedChat.vehicleName}
                                  </span>
                                )}
                                {isSupportChat && (
                                  <span className="ml-1">Available 24/7</span>
                                )}
                              </p>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                    <div className="flex items-center gap-2">
                      {!selectedChat.isBlocked ? (
                        <button
                          onClick={() => setShowBlockConfirm(true)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-500 hover:bg-red-50 border border-red-100 transition"
                        >
                          <FaBan size={11} /> Block
                        </button>
                      ) : iBlockedThem ? (
                        <button
                          onClick={() => setShowUnblockConfirm(true)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-600 hover:bg-emerald-50 border border-emerald-200 transition"
                        >
                          <FaUnlock size={11} /> Unblock
                        </button>
                      ) : null}
                    </div>
                  </div>

                  {/* Vehicle banner */}
                  {selectedChat.vehicleId &&
                    selectedChat.chatType === "vehicle" && (
                      <div className="px-5 py-2.5 bg-blue-50 border-b border-blue-100 flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <FaCar size={12} className="text-blue-600" />
                        </div>
                        <span className="text-xs font-semibold text-blue-800">
                          {selectedChat.vehicleName || "Vehicle Inquiry"}
                        </span>
                      </div>
                    )}

                  {/* Support banner */}
                  {selectedChat.chatType === "support" && (
                    <div className="px-5 py-2.5 bg-purple-50 border-b border-purple-100 flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <FaHeadset size={12} className="text-purple-600" />
                      </div>
                      <span className="text-xs font-semibold text-purple-800">
                        Official Support Channel - Response within 24 hours
                      </span>
                    </div>
                  )}

                  {/* Block banner */}
                  {selectedChat.isBlocked && (
                    <div
                      className={`flex items-center justify-between px-5 py-3 border-b ${iBlockedThem ? "bg-red-50 border-red-100" : "bg-amber-50 border-amber-100"}`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${iBlockedThem ? "bg-red-100" : "bg-amber-100"}`}
                        >
                          <FaBan
                            size={13}
                            className={
                              iBlockedThem ? "text-red-500" : "text-amber-500"
                            }
                          />
                        </div>
                        <div>
                          <p
                            className={`text-xs font-bold ${iBlockedThem ? "text-red-700" : "text-amber-700"}`}
                          >
                            {iBlockedThem
                              ? `You blocked ${getOtherParticipant(selectedChat)?.name}`
                              : "You can't message this user"}
                          </p>
                          <p
                            className={`text-[11px] mt-0.5 ${iBlockedThem ? "text-red-500" : "text-amber-500"}`}
                          >
                            {iBlockedThem
                              ? "They can't message you. Unblock to restore the conversation."
                              : "This user has restricted messaging."}
                          </p>
                        </div>
                      </div>
                      {iBlockedThem && (
                        <button
                          onClick={() => setShowUnblockConfirm(true)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition whitespace-nowrap ml-3"
                        >
                          <FaUnlock size={10} /> Unblock
                        </button>
                      )}
                    </div>
                  )}

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1 bg-gray-50">
                    {chatMessagesLoading ? (
                      <div className="flex justify-center items-center h-full">
                        <FaSpinner className="animate-spin text-blue-400 text-2xl" />
                      </div>
                    ) : selectedChat.isBlocked && chatMessages.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-center px-8">
                        <div
                          className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${iBlockedThem ? "bg-red-50" : "bg-amber-50"}`}
                        >
                          <FaLock
                            size={28}
                            className={
                              iBlockedThem ? "text-red-300" : "text-amber-300"
                            }
                          />
                        </div>
                        <p className="text-sm font-bold text-gray-600">
                          {iBlockedThem
                            ? "Conversation blocked"
                            : "Messaging unavailable"}
                        </p>
                        <p className="text-xs text-gray-400 mt-2 leading-relaxed max-w-xs">
                          {iBlockedThem
                            ? `You have blocked ${getOtherParticipant(selectedChat)?.name}. Unblock to restore the conversation and see previous messages.`
                            : "This user has restricted messaging. You cannot view messages or send new ones."}
                        </p>
                        {iBlockedThem && (
                          <button
                            onClick={() => setShowUnblockConfirm(true)}
                            className="mt-5 flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition"
                          >
                            <FaUnlock size={12} /> Unblock{" "}
                            {getOtherParticipant(selectedChat)?.name}
                          </button>
                        )}
                      </div>
                    ) : chatMessages.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-center">
                        <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-3">
                          <FaCommentDots className="text-blue-300 text-2xl" />
                        </div>
                        <p className="text-sm font-medium text-gray-500">
                          No messages yet
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Say hello to start the conversation!
                        </p>
                      </div>
                    ) : (
                      (() => {
                        const groups = [];
                        let lastDate = null;
                        chatMessages.forEach((msg, idx) => {
                          const msgDay = new Date(msg.createdAt).toDateString();
                          if (msgDay !== lastDate) {
                            groups.push({
                              type: "date",
                              label: msgDay,
                              key: `date-${idx}`,
                            });
                            lastDate = msgDay;
                          }
                          groups.push({
                            type: "msg",
                            msg,
                            key: msg._id || idx,
                          });
                        });
                        return groups.map((item) => {
                          if (item.type === "date") {
                            const today = new Date().toDateString();
                            const yesterday = new Date(
                              Date.now() - 86400000,
                            ).toDateString();
                            const label =
                              item.label === today
                                ? "Today"
                                : item.label === yesterday
                                  ? "Yesterday"
                                  : item.label;
                            return (
                              <div
                                key={item.key}
                                className="flex items-center gap-3 py-2"
                              >
                                <div className="flex-1 h-px bg-gray-200" />
                                <span className="text-[10px] text-gray-400 font-medium px-2.5 py-1 bg-white border border-gray-200 rounded-full whitespace-nowrap shadow-sm">
                                  {label}
                                </span>
                                <div className="flex-1 h-px bg-gray-200" />
                              </div>
                            );
                          }
                          const { msg } = item;
                          const isOwn = msg.sender?._id === user?._id;
                          const senderLabel = getSenderLabel(msg.senderType);
                          const other = getOtherParticipant(selectedChat);

                          return (
                            <div
                              key={item.key}
                              className={`flex flex-col ${isOwn ? "items-end" : "items-start"} mb-3`}
                            >
                              {!isOwn && (
                                <div className="flex items-center gap-2 mb-1 ml-2">
                                  <span className="text-[10px] font-medium text-gray-500">
                                    {senderLabel}
                                  </span>
                                </div>
                              )}
                              <div
                                className={`flex items-end gap-2 ${isOwn ? "justify-end" : "justify-start"} w-full`}
                              >
                                {!isOwn && (
                                  <div className="flex-shrink-0 mb-1">
                                    {selectedChat.chatType === "support" ? (
                                      <div className="w-7 h-7 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                                        <FaHeadset size={14} />
                                      </div>
                                    ) : other?.profilePhoto ? (
                                      <img
                                        src={`http://localhost:5000/uploads/profiles/${other.profilePhoto}`}
                                        alt=""
                                        className="w-7 h-7 rounded-full object-cover"
                                      />
                                    ) : (
                                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-[10px] font-bold">
                                        {other?.name?.charAt(0).toUpperCase() ||
                                          "?"}
                                      </div>
                                    )}
                                  </div>
                                )}
                                <div
                                  className={`flex flex-col ${isOwn ? "items-end" : "items-start"} max-w-[70%]`}
                                >
                                  <div
                                    className={`px-4 py-2.5 text-sm leading-relaxed break-words ${getMessageBubbleStyle(isOwn, msg.senderType)}`}
                                  >
                                    {msg.message}
                                  </div>
                                  <div
                                    className={`flex items-center gap-1 mt-1 px-1 ${isOwn ? "flex-row-reverse" : ""}`}
                                  >
                                    <span className="text-[10px] text-gray-400">
                                      {formatMessageTime(msg.createdAt)}
                                    </span>
                                    {isOwn && (
                                      <FaCheckDouble
                                        size={9}
                                        className={
                                          msg.read
                                            ? "text-blue-400"
                                            : "text-gray-300"
                                        }
                                      />
                                    )}
                                  </div>
                                </div>
                                {isOwn && (
                                  <div className="flex-shrink-0 mb-1">
                                    {user?.profilePhoto ? (
                                      <img
                                        src={`http://localhost:5000/uploads/profiles/${user.profilePhoto}`}
                                        alt=""
                                        className="w-7 h-7 rounded-full object-cover"
                                      />
                                    ) : (
                                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center text-white text-[10px] font-bold">
                                        {user?.name?.charAt(0).toUpperCase() ||
                                          "U"}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        });
                      })()
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <div className="px-4 py-3 bg-white border-t border-gray-100">
                    {!isConnected && (
                      <p className="text-[11px] text-center text-amber-500 mb-2">
                        Reconnecting to chat server…
                      </p>
                    )}
                    {selectedChat.isBlocked ? (
                      <div
                        className={`flex items-center gap-3 rounded-2xl px-4 py-3 ${iBlockedThem ? "bg-red-50 border border-red-100" : "bg-amber-50 border border-amber-100"}`}
                      >
                        <FaLock
                          size={14}
                          className={
                            iBlockedThem ? "text-red-400" : "text-amber-400"
                          }
                        />
                        <p
                          className={`text-xs flex-1 ${iBlockedThem ? "text-red-500" : "text-amber-600"}`}
                        >
                          {iBlockedThem ? (
                            <>
                              You blocked this user.{" "}
                              <button
                                onClick={() => setShowUnblockConfirm(true)}
                                className="underline font-semibold hover:no-underline"
                              >
                                Unblock to chat
                              </button>
                            </>
                          ) : (
                            "You cannot send messages in this conversation."
                          )}
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-3 py-2">
                        <button className="text-gray-400 hover:text-blue-500 transition flex-shrink-0">
                          <FaSmile size={18} />
                        </button>
                        <input
                          type="text"
                          value={newChatMessage}
                          onChange={(e) => setNewChatMessage(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === "Enter" && handleSendChatMessage()
                          }
                          placeholder="Type a message…"
                          className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none chat-message-input"
                        />
                        <button
                          onClick={handleSendChatMessage}
                          disabled={!newChatMessage.trim() || sendingMessage}
                          className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-md transition"
                        >
                          {sendingMessage ? (
                            <FaSpinner className="animate-spin" size={13} />
                          ) : (
                            <FaPaperPlane size={13} />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex-1 hidden md:flex flex-col items-center justify-center bg-gray-50 text-center px-8">
                  <div className="w-20 h-20 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
                    <FaComments className="text-blue-300 text-3xl" />
                  </div>
                  <p className="text-base font-semibold text-gray-600">
                    Select a conversation
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Choose a chat from the left to start messaging
                  </p>
                  <button
                    onClick={handleStartSupportChat}
                    className="mt-4 flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                  >
                    <FaHeadset /> Start Support Chat
                  </button>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Block Confirm Modal */}
      {showBlockConfirm && selectedChat && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.55)" }}
        >
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-rose-600 px-6 pt-6 pb-10">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                <FaBan size={26} className="text-white" />
              </div>
              <h3 className="text-white text-center text-lg font-bold">
                Block User?
              </h3>
              <p className="text-red-100 text-center text-xs mt-1">
                You can unblock them anytime
              </p>
            </div>
            <div className="-mt-4 bg-white rounded-t-2xl px-6 pt-5 pb-6">
              <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                {(() => {
                  const other = getOtherParticipant(selectedChat);
                  return other?.profilePhoto ? (
                    <img
                      src={`http://localhost:5000/uploads/profiles/${other.profilePhoto}`}
                      alt=""
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                      {other?.name?.charAt(0).toUpperCase() || "?"}
                    </div>
                  );
                })()}
                <div>
                  <p className="font-semibold text-gray-800 text-sm">
                    {getOtherParticipant(selectedChat)?.name}
                  </p>
                  <p className="text-xs text-gray-500">Will be blocked</p>
                </div>
              </div>
              <ul className="space-y-2 mb-5">
                {[
                  "They won't be able to message you",
                  "Their messages will be hidden",
                  "You can unblock them anytime",
                ].map((t, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-xs text-gray-600"
                  >
                    <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                      <FaTimes size={7} className="text-red-500" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowBlockConfirm(false)}
                  className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBlockUser}
                  disabled={blockingUser}
                  className="flex-1 px-4 py-2.5 text-sm bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white rounded-xl font-semibold transition flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {blockingUser ? (
                    <FaSpinner className="animate-spin" size={13} />
                  ) : (
                    <FaBan size={12} />
                  )}
                  {blockingUser ? "Blocking…" : "Block User"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Unblock Confirm Modal */}
      {showUnblockConfirm && selectedChat && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.55)" }}
        >
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 pt-6 pb-10">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                <FaUnlock size={24} className="text-white" />
              </div>
              <h3 className="text-white text-center text-lg font-bold">
                Unblock User?
              </h3>
              <p className="text-emerald-100 text-center text-xs mt-1">
                Resume your conversation
              </p>
            </div>
            <div className="-mt-4 bg-white rounded-t-2xl px-6 pt-5 pb-6">
              <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                {(() => {
                  const other = getOtherParticipant(selectedChat);
                  return other?.profilePhoto ? (
                    <img
                      src={`http://localhost:5000/uploads/profiles/${other.profilePhoto}`}
                      alt=""
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold">
                      {other?.name?.charAt(0).toUpperCase() || "?"}
                    </div>
                  );
                })()}
                <div>
                  <p className="font-semibold text-gray-800 text-sm">
                    {getOtherParticipant(selectedChat)?.name}
                  </p>
                  <p className="text-xs text-gray-500">Will be unblocked</p>
                </div>
              </div>
              <ul className="space-y-2 mb-5">
                {[
                  "They can message you again",
                  "Previous messages will be restored",
                  "You can block them again anytime",
                ].map((t, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-xs text-gray-600"
                  >
                    <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <FaCheck size={7} className="text-emerald-600" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowUnblockConfirm(false)}
                  className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUnblockUser}
                  disabled={unblockingUser}
                  className="flex-1 px-4 py-2.5 text-sm bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl font-semibold transition flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {unblockingUser ? (
                    <FaSpinner className="animate-spin" size={13} />
                  ) : (
                    <FaUnlock size={12} />
                  )}
                  {unblockingUser ? "Unblocking…" : "Unblock User"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Earning Details Modal */}
      {showEarningDetailsModal && selectedEarningVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <FaRupeeSign className="text-green-600 text-2xl" />
                  <h3 className="text-xl font-bold text-gray-800">
                    Earnings Details -{" "}
                    {selectedEarningVehicle.vehicle?.carName}
                  </h3>
                </div>
                <button
                  onClick={() => setShowEarningDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes size={24} />
                </button>
              </div>
            </div>
            <div className="p-6">
              {selectedEarningVehicle.bookings?.length > 0 ? (
                <div className="space-y-4">
                  {selectedEarningVehicle.bookings.map((booking, idx) => (
                    <div
                      key={idx}
                      className="border rounded-xl p-4 hover:shadow-md transition"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-semibold text-gray-800">
                            Booking #
                            {booking.confirmationCode ||
                              booking._id?.slice(-8)}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatDate(booking.createdAt)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">
                            {formatCurrency(booking.totalAmount)}
                          </p>
                          <p className="text-xs text-gray-500">
                            You earned:{" "}
                            {formatCurrency(booking.totalAmount * 0.7)}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">Customer:</span>{" "}
                          <span className="font-medium">
                            {booking.user?.name || "N/A"}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Duration:</span>{" "}
                          <span className="font-medium">
                            {booking.totalDays} days
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Pickup:</span>{" "}
                          <span className="font-medium">
                            {formatDate(booking.pickupDate)}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Return:</span>{" "}
                          <span className="font-medium">
                            {formatDate(booking.returnDate)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">
                    No booking details available
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Image Viewer */}
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
              alt="Preview"
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

export default ProfileDetails;