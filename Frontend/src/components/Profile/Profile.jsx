// // // export default ProfileDetails;

// // import React, { useState, useEffect, useRef } from "react";
// // import {
// //   FaCar,
// //   FaSignOutAlt,
// //   FaUserEdit,
// //   FaEnvelope,
// //   FaVenusMars,
// //   FaKey,
// //   FaCheckCircle,
// //   FaCamera,
// //   FaTimes,
// //   FaSave,
// //   FaArrowLeft,
// //   FaPlus,
// //   FaList,
// //   FaCalendarAlt,
// //   FaClock,
// //   FaMapMarkerAlt,
// //   FaRupeeSign,
// //   FaEye,
// //   FaEdit,
// //   FaTrash,
// //   FaBars,
// //   FaUserCircle,
// // } from "react-icons/fa";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import Notification from "./Notification";

// // const ProfileDetails = () => {
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const [editing, setEditing] = useState(false);
// //   const [gender, setGender] = useState("Male");
// //   const [name, setName] = useState("");
// //   const [username, setUsername] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [profilePhoto, setProfilePhoto] = useState(null);
// //   const [photoPreview, setPhotoPreview] = useState(null);
// //   const [uploading, setUploading] = useState(false);
// //   const [notifications, setNotifications] = useState([]);
// //   const [activeTab, setActiveTab] = useState("profile");
// //   const [bookings, setBookings] = useState([]);
// //   const [userVehicles, setUserVehicles] = useState([]);
// //   const [bookingsLoading, setBookingsLoading] = useState(false);
// //   const [vehiclesLoading, setVehiclesLoading] = useState(false);
// //   const [sidebarOpen, setSidebarOpen] = useState(true);
// //   const [hoveredItem, setHoveredItem] = useState(null);
// //   const fileInputRef = useRef(null);
// //   const navigate = useNavigate();

// //   // Fetch user profile data
// //   useEffect(() => {
// //     fetchUserProfile();
// //     fetchNotifications();
// //     fetchUserBookings();
// //     fetchUserVehicles();
// //   }, []);

// //   const fetchUserProfile = async () => {
// //     try {
// //       setError("");
// //       setLoading(true);

// //       const token =
// //         localStorage.getItem("token") || sessionStorage.getItem("token");

// //       if (!token) {
// //         setError("Please login to view your profile");
// //         setLoading(false);
// //         return;
// //       }

// //       const response = await axios.get("http://localhost:5000/api/profile", {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });

// //       if (response.data && response.data.success) {
// //         const userData = response.data.user;
// //         setUser(userData);
// //         setName(userData.name || "");
// //         setEmail(userData.email || "");
// //         setUsername(userData.username || userData.email?.split("@")[0] || "");
// //         setGender(userData.gender || "Male");

// //         if (userData.profilePhoto) {
// //           setPhotoPreview(
// //             `http://localhost:5000/uploads/profiles/${userData.profilePhoto}`,
// //           );
// //         }
// //         setError("");
// //       } else {
// //         setError(response.data?.message || "Failed to load profile data");
// //       }
// //       setLoading(false);
// //     } catch (error) {
// //       console.error("Error fetching profile:", error);
// //       let errorMessage = "Failed to load profile";

// //       if (error.response?.status === 401) {
// //         errorMessage = "Session expired. Please login again.";
// //         localStorage.removeItem("token");
// //         sessionStorage.removeItem("token");
// //       } else if (error.code === "ECONNREFUSED") {
// //         errorMessage =
// //           "Cannot connect to server. Please check if backend is running.";
// //       }

// //       setError(errorMessage);
// //       setLoading(false);
// //     }
// //   };

// //   const fetchUserBookings = async () => {
// //     try {
// //       setBookingsLoading(true);
// //       const token =
// //         localStorage.getItem("token") || sessionStorage.getItem("token");
// //       if (!token) return;

// //       const response = await axios.get(
// //         "http://localhost:5000/api/bookings/my-bookings",
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         },
// //       );

// //       if (response.data.success) {
// //         setBookings(response.data.data.bookings);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching bookings:", error);
// //     } finally {
// //       setBookingsLoading(false);
// //     }
// //   };

// //   const fetchUserVehicles = async () => {
// //     try {
// //       setVehiclesLoading(true);
// //       const token =
// //         localStorage.getItem("token") || sessionStorage.getItem("token");
// //       if (!token) return;

// //       const response = await axios.get(
// //         "http://localhost:5000/api/user-vehicles/my-vehicles",
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         },
// //       );

// //       if (response.data.success) {
// //         setUserVehicles(response.data.data.vehicles);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching user vehicles:", error);
// //     } finally {
// //       setVehiclesLoading(false);
// //     }
// //   };

// //   const fetchNotifications = async () => {
// //     try {
// //       const token =
// //         localStorage.getItem("token") || sessionStorage.getItem("token");
// //       if (!token) return;

// //       const response = await axios.get(
// //         "http://localhost:5000/api/notifications",
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         },
// //       );

// //       if (response.data.success) {
// //         setNotifications(response.data.data);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching notifications:", error);
// //     }
// //   };

// //   const markNotificationAsRead = async (notificationId) => {
// //     try {
// //       const token =
// //         localStorage.getItem("token") || sessionStorage.getItem("token");
// //       await axios.put(
// //         `http://localhost:5000/api/notifications/${notificationId}/read`,
// //         {},
// //         { headers: { Authorization: `Bearer ${token}` } },
// //       );

// //       setNotifications((prev) =>
// //         prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n)),
// //       );
// //     } catch (error) {
// //       console.error("Error marking notification as read:", error);
// //     }
// //   };

// //   const deleteNotification = async (notificationId) => {
// //     try {
// //       const token =
// //         localStorage.getItem("token") || sessionStorage.getItem("token");
// //       await axios.delete(
// //         `http://localhost:5000/api/notifications/${notificationId}`,
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         },
// //       );

// //       setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
// //     } catch (error) {
// //       console.error("Error deleting notification:", error);
// //     }
// //   };

// //   const handleLogout = () => {
// //     localStorage.removeItem("token");
// //     sessionStorage.removeItem("token");
// //     navigate("/login");
// //   };

// //   const handleBack = () => {
// //     const token =
// //       localStorage.getItem("token") || sessionStorage.getItem("token");
// //     if (token) {
// //       navigate("/rentridehome");
// //     } else {
// //       navigate("/login");
// //     }
// //   };

// //   const handleEditToggle = () => {
// //     if (editing) {
// //       if (user) {
// //         setName(user.name);
// //         setUsername(user.username || user.email?.split("@")[0] || "");
// //         setGender(user.gender || "Male");
// //         if (user.profilePhoto) {
// //           setPhotoPreview(
// //             `http://localhost:5000/uploads/profiles/${user.profilePhoto}`,
// //           );
// //         } else {
// //           setPhotoPreview(null);
// //         }
// //         setProfilePhoto(null);
// //       }
// //     }
// //     setEditing(!editing);
// //   };

// //   const handlePhotoChange = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       setProfilePhoto(file);
// //       const reader = new FileReader();
// //       reader.onloadend = () => {
// //         setPhotoPreview(reader.result);
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   const handleRemovePhoto = () => {
// //     setProfilePhoto(null);
// //     setPhotoPreview(null);
// //     if (fileInputRef.current) {
// //       fileInputRef.current.value = "";
// //     }
// //   };

// //   const handleSaveProfile = async () => {
// //     try {
// //       const token =
// //         localStorage.getItem("token") || sessionStorage.getItem("token");
// //       if (!token) {
// //         alert("Please login again");
// //         navigate("/login");
// //         return;
// //       }

// //       setUploading(true);

// //       const formData = new FormData();
// //       formData.append("name", name);
// //       formData.append("username", username);
// //       formData.append("gender", gender);

// //       if (profilePhoto) {
// //         formData.append("profilePhoto", profilePhoto);
// //       }

// //       const response = await axios.put(
// //         "http://localhost:5000/api/profile/update",
// //         formData,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             "Content-Type": "multipart/form-data",
// //           },
// //         },
// //       );

// //       if (response.data.success) {
// //         setUser(response.data.user);
// //         setEditing(false);
// //         setProfilePhoto(null);

// //         if (response.data.user.profilePhoto) {
// //           setPhotoPreview(
// //             `http://localhost:5000/uploads/profiles/${response.data.user.profilePhoto}`,
// //           );
// //         }

// //         addNotification({
// //           title: "Profile Updated",
// //           message: "Your profile has been successfully updated.",
// //           type: "success",
// //         });

// //         alert("Profile updated successfully!");
// //       } else {
// //         alert("Failed to update profile");
// //       }

// //       setUploading(false);
// //     } catch (error) {
// //       console.error("Error updating profile:", error);
// //       setUploading(false);
// //       alert(
// //         error.response?.data?.message ||
// //           "Failed to update profile. Please try again.",
// //       );
// //     }
// //   };

// //   const addNotification = async (notification) => {
// //     try {
// //       const token =
// //         localStorage.getItem("token") || sessionStorage.getItem("token");
// //       const response = await axios.post(
// //         "http://localhost:5000/api/notifications",
// //         notification,
// //         { headers: { Authorization: `Bearer ${token}` } },
// //       );

// //       if (response.data.success) {
// //         setNotifications((prev) => [response.data.data, ...prev]);
// //       }
// //     } catch (error) {
// //       console.error("Error adding notification:", error);
// //     }
// //   };

// //   const getStatusBadge = (status) => {
// //     const statusConfig = {
// //       pending: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
// //       approved: { color: "bg-blue-100 text-blue-800", label: "Approved" },
// //       rejected: { color: "bg-red-100 text-red-800", label: "Rejected" },
// //       confirmed: { color: "bg-green-100 text-green-800", label: "Confirmed" },
// //       active: { color: "bg-purple-100 text-purple-800", label: "Active" },
// //       completed: { color: "bg-gray-100 text-gray-800", label: "Completed" },
// //       cancelled: { color: "bg-red-100 text-red-800", label: "Cancelled" },
// //     };
// //     const config = statusConfig[status] || statusConfig.pending;
// //     return (
// //       <span
// //         className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
// //       >
// //         {config.label}
// //       </span>
// //     );
// //   };

// //   const formatDate = (date) => {
// //     return new Date(date).toLocaleDateString("en-US", {
// //       year: "numeric",
// //       month: "short",
// //       day: "numeric",
// //     });
// //   };

// //   const formatCurrency = (amount) => {
// //     return `रु ${amount?.toLocaleString("en-NP") || 0}`;
// //   };

// //   const sidebarItems = [
// //     { id: "profile", icon: FaUserCircle, label: "Profile" },
// //     { id: "bookings", icon: FaCalendarAlt, label: "My Bookings" },
// //     { id: "listed-vehicles", icon: FaList, label: "My Listed Vehicles" },
// //   ];

// //   const handleRetry = () => {
// //     setLoading(true);
// //     fetchUserProfile();
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
// //           <p className="text-gray-600">Loading profile...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error && !user) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="text-red-600 text-4xl mb-4">⚠️</div>
// //           <h2 className="text-xl font-semibold mb-2">Error Loading Profile</h2>
// //           <p className="text-gray-600 mb-4">{error}</p>
// //           <button
// //             onClick={handleRetry}
// //             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
// //           >
// //             Try Again
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
// //       {/* Sidebar */}
// //       <div
// //         className={`fixed top-0 left-0 h-full backdrop-blur-xl bg-white/95 shadow-2xl transition-all duration-300 z-20 ${
// //           sidebarOpen ? "w-72" : "w-20"
// //         }`}
// //         style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
// //       >
// //         {/* Logo Section */}
// //         <div className="p-6 border-b border-gray-200">
// //           <div className="flex items-center justify-between">
// //             <div className="flex items-center gap-3">
// //               <div className="p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
// //                 <FaCar className="text-white text-2xl" />
// //               </div>
// //               {sidebarOpen && (
// //                 <div>
// //                   <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
// //                     Rent<span className="text-gray-800">Ride</span>
// //                   </h1>
// //                   <p className="text-xs text-gray-500 mt-0.5">User Panel</p>
// //                 </div>
// //               )}
// //             </div>
// //             <button
// //               onClick={() => setSidebarOpen(!sidebarOpen)}
// //               className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300"
// //             >
// //               <FaBars className="text-gray-600" />
// //             </button>
// //           </div>
// //         </div>

// //         {/* User Info */}
// //         {sidebarOpen && user && (
// //           <div className="mx-4 mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
// //             <div className="flex items-center gap-3">
// //               {photoPreview ? (
// //                 <img
// //                   src={photoPreview}
// //                   alt="profile"
// //                   className="w-12 h-12 rounded-full object-cover object-center border-2 border-white shadow-md"
// //                 />
// //               ) : (
// //                 <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
// //                   <FaUserCircle className="text-white text-2xl" />
// //                 </div>
// //               )}
// //               <div className="flex-1">
// //                 <p className="font-semibold text-gray-800">{user.name}</p>
// //                 <p className="text-xs text-gray-500 truncate">{user.email}</p>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {/* Navigation Menu */}
// //         <nav className="mt-6 px-3">
// //           <p
// //             className={`text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 ${
// //               !sidebarOpen && "text-center"
// //             }`}
// //           >
// //             {sidebarOpen ? "MAIN MENU" : "..."}
// //           </p>
// //           {sidebarItems.map((item) => {
// //             const Icon = item.icon;
// //             const isActive = activeTab === item.id;
// //             const isHovered = hoveredItem === item.id;

// //             return (
// //               <button
// //                 key={item.id}
// //                 onClick={() => setActiveTab(item.id)}
// //                 onMouseEnter={() => setHoveredItem(item.id)}
// //                 onMouseLeave={() => setHoveredItem(null)}
// //                 className={`relative w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-xl transition-all duration-300 group ${
// //                   isActive
// //                     ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
// //                     : "text-gray-600 hover:bg-gray-100"
// //                 } ${!sidebarOpen && "justify-center"}`}
// //               >
// //                 <Icon
// //                   className={`text-xl ${
// //                     isActive ? "text-white" : "text-gray-500"
// //                   } transition-transform duration-300 group-hover:scale-110`}
// //                 />
// //                 {sidebarOpen && (
// //                   <span
// //                     className={`font-medium ${isActive ? "text-white" : ""}`}
// //                   >
// //                     {item.label}
// //                   </span>
// //                 )}
// //                 {!sidebarOpen && isHovered && (
// //                   <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded whitespace-nowrap z-50">
// //                     {item.label}
// //                   </div>
// //                 )}
// //                 {isActive && sidebarOpen && (
// //                   <div className="absolute left-0 w-1 h-8 bg-white rounded-r-full"></div>
// //                 )}
// //               </button>
// //             );
// //           })}
// //         </nav>

// //         {/* Logout Button */}
// //         <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
// //           <button
// //             onClick={handleLogout}
// //             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
// //               !sidebarOpen && "justify-center"
// //             } bg-red-50 hover:bg-red-100 text-red-600 group`}
// //           >
// //             <FaSignOutAlt className="text-xl transition-transform duration-300 group-hover:scale-110" />
// //             {sidebarOpen && <span className="font-medium">Logout</span>}
// //           </button>
// //         </div>
// //       </div>

// //       {/* Main Content */}
// //       <div
// //         className={`transition-all duration-300 ${
// //           sidebarOpen ? "ml-72" : "ml-20"
// //         }`}
// //       >
// //         {/* Header */}
// //         <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
// //           <div className="px-8 py-5">
// //             <div className="flex justify-between items-center">
// //               <div>
// //                 <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
// //                   {activeTab === "profile" && "My Profile"}
// //                   {activeTab === "bookings" && "My Bookings"}
// //                   {activeTab === "listed-vehicles" && "My Listed Vehicles"}
// //                 </h1>
// //                 <p className="text-sm text-gray-500 mt-1">
// //                   {activeTab === "profile" &&
// //                     "Manage your personal information"}
// //                   {activeTab === "bookings" && "View and manage your bookings"}
// //                   {activeTab === "listed-vehicles" &&
// //                     "Manage your listed vehicles"}
// //                 </p>
// //               </div>
// //               <Notification
// //                 notifications={notifications}
// //                 onMarkAsRead={markNotificationAsRead}
// //                 onDelete={deleteNotification}
// //               />
// //             </div>
// //           </div>
// //         </header>

// //         {/* Content */}
// //         <main className="p-8">
// //           {/* Profile Tab */}
// //           {activeTab === "profile" && (
// //             <div className="flex flex-col items-center text-center">
// //               {/* Avatar with edit functionality */}
// //               <div className="relative mb-4">
// //                 {photoPreview ? (
// //                   <img
// //                     src={photoPreview}
// //                     alt="profile"
// //                     className="w-28 h-28 rounded-full object-cover object-center border-4 border-white shadow-lg"
// //                   />
// //                 ) : (
// //                   <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-3xl shadow-lg">
// //                     {user?.name?.charAt(0).toUpperCase() || "U"}
// //                   </div>
// //                 )}

// //                 {editing && (
// //                   <>
// //                     <button
// //                       onClick={() => fileInputRef.current.click()}
// //                       className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition shadow-md"
// //                     >
// //                       <FaCamera />
// //                     </button>
// //                     {photoPreview && (
// //                       <button
// //                         onClick={handleRemovePhoto}
// //                         className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition shadow-md"
// //                       >
// //                         <FaTimes size={12} />
// //                       </button>
// //                     )}
// //                   </>
// //                 )}

// //                 <input
// //                   type="file"
// //                   ref={fileInputRef}
// //                   className="hidden"
// //                   accept="image/*"
// //                   onChange={handlePhotoChange}
// //                 />
// //               </div>

// //               {/* Name and Username */}
// //               <div className="mb-6">
// //                 {editing ? (
// //                   <div className="flex flex-col items-center gap-2">
// //                     <input
// //                       type="text"
// //                       value={name}
// //                       onChange={(e) => setName(e.target.value)}
// //                       className="text-xl font-semibold text-center bg-transparent border-b border-blue-300 focus:outline-none mb-1 focus:border-blue-500"
// //                       placeholder="Enter name"
// //                     />
// //                     <div className="flex items-center gap-2">
// //                       <span className="text-gray-500">@</span>
// //                       <input
// //                         type="text"
// //                         value={username}
// //                         onChange={(e) => setUsername(e.target.value)}
// //                         className="text-gray-500 text-center bg-transparent border-b border-blue-300 focus:outline-none focus:border-blue-500"
// //                         placeholder="username"
// //                       />
// //                     </div>
// //                   </div>
// //                 ) : (
// //                   <div className="flex flex-col items-center">
// //                     <h2 className="text-xl font-semibold">{user?.name}</h2>
// //                     <p className="text-gray-500">@{username}</p>
// //                   </div>
// //                 )}
// //               </div>

// //               {/* Edit/Save Profile Button */}
// //               <button
// //                 onClick={editing ? handleSaveProfile : handleEditToggle}
// //                 disabled={uploading}
// //                 className={`flex items-center gap-2 w-64 py-3 rounded-xl font-medium mb-10 justify-center transition ${
// //                   editing
// //                     ? "bg-green-600 hover:bg-green-700 text-white"
// //                     : "bg-gray-100 hover:bg-gray-200"
// //                 } ${uploading ? "opacity-70 cursor-not-allowed" : ""}`}
// //               >
// //                 {uploading ? (
// //                   <>
// //                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
// //                     Saving...
// //                   </>
// //                 ) : editing ? (
// //                   <>
// //                     <FaSave />
// //                     Save Profile
// //                   </>
// //                 ) : (
// //                   <>
// //                     <FaUserEdit />
// //                     Edit Profile
// //                   </>
// //                 )}
// //               </button>

// //               {/* Cancel Edit Button */}
// //               {editing && (
// //                 <button
// //                   onClick={handleEditToggle}
// //                   className="flex items-center gap-2 w-64 bg-red-100 hover:bg-red-200 text-red-700 py-3 rounded-xl font-medium mb-10 justify-center transition"
// //                 >
// //                   <FaTimes />
// //                   Cancel Edit
// //                 </button>
// //               )}

// //               {/* Info Section */}
// //               <div className="w-full max-w-xl space-y-6">
// //                 {/* Email */}
// //                 <div className="flex items-center justify-between border-b pb-4">
// //                   <div className="flex items-center gap-3 text-gray-600">
// //                     <FaEnvelope />
// //                     <span>Email</span>
// //                   </div>
// //                   <span className="font-medium">{user?.email}</span>
// //                 </div>

// //                 {/* Gender Dropdown */}
// //                 <div className="flex items-center justify-between border-b pb-4">
// //                   <div className="flex items-center gap-3 text-gray-600">
// //                     <FaVenusMars />
// //                     <span>Gender</span>
// //                   </div>

// //                   {editing ? (
// //                     <select
// //                       value={gender}
// //                       onChange={(e) => setGender(e.target.value)}
// //                       className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
// //                     >
// //                       <option value="Male">Male</option>
// //                       <option value="Female">Female</option>
// //                       <option value="Other">Other</option>
// //                       <option value="Prefer not to say">
// //                         Prefer not to say
// //                       </option>
// //                     </select>
// //                   ) : (
// //                     <span className="font-medium">
// //                       {user?.gender || "Not specified"}
// //                     </span>
// //                   )}
// //                 </div>

// //                 {/* Actions */}
// //                 <div className="space-y-4 pt-4">
// //                   <button
// //                     onClick={() => navigate("/change-password")}
// //                     className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-6 py-2 rounded-xl font-medium transition w-full justify-center"
// //                   >
// //                     <FaKey />
// //                     Change / Forgot Password
// //                   </button>

// //                   <div className="flex items-center justify-center gap-3">
// //                     {user?.kycVerified ? (
// //                       <>
// //                         <FaCheckCircle className="text-green-600 text-lg" />
// //                         <span className="font-medium text-green-600">
// //                           KYC Verified
// //                         </span>
// //                       </>
// //                     ) : (
// //                       <>
// //                         <FaCheckCircle className="text-yellow-500 text-lg" />
// //                         <span className="font-medium text-yellow-600">
// //                           KYC Pending
// //                         </span>
// //                         <button
// //                           onClick={() => navigate("/identity-verification")}
// //                           className="ml-2 text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-200 transition"
// //                         >
// //                           Verify Now
// //                         </button>
// //                       </>
// //                     )}
// //                   </div>
// //                 </div>

// //                 {/* Member Since */}
// //                 <div className="pt-6 border-t">
// //                   <div className="text-center text-gray-500">
// //                     <p className="text-sm">
// //                       Member since:{" "}
// //                       {user?.createdAt
// //                         ? new Date(user.createdAt).toLocaleDateString("en-US", {
// //                             month: "long",
// //                             year: "numeric",
// //                           })
// //                         : "Recently"}
// //                     </p>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {/* My Bookings Tab */}
// //           {activeTab === "bookings" && (
// //             <div>
// //               <h2 className="text-2xl font-bold text-gray-900 mb-6">
// //                 My Bookings
// //               </h2>

// //               {bookingsLoading ? (
// //                 <div className="text-center py-12">
// //                   <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
// //                   <p className="text-gray-500">Loading bookings...</p>
// //                 </div>
// //               ) : bookings.length === 0 ? (
// //                 <div className="text-center py-12 bg-white rounded-2xl shadow">
// //                   <FaCalendarAlt className="text-5xl text-gray-300 mx-auto mb-3" />
// //                   <p className="text-gray-500">No bookings found</p>
// //                   <button
// //                     onClick={() => navigate("/rentridehome")}
// //                     className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
// //                   >
// //                     Browse Vehicles
// //                   </button>
// //                 </div>
// //               ) : (
// //                 <div className="space-y-4">
// //                   {bookings.map((booking) => (
// //                     <div
// //                       key={booking._id}
// //                       className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition"
// //                     >
// //                       <div className="flex justify-between items-start mb-4">
// //                         <div>
// //                           <h3 className="text-lg font-semibold text-gray-900">
// //                             {booking.vehicle?.carName}
// //                           </h3>
// //                           <p className="text-sm text-gray-500">
// //                             {booking.vehicle?.carNumber}
// //                           </p>
// //                         </div>
// //                         {getStatusBadge(booking.status)}
// //                       </div>

// //                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
// //                         <div className="flex items-center gap-2 text-gray-600">
// //                           <FaCalendarAlt />
// //                           <span className="text-sm">
// //                             {formatDate(booking.pickupDate)} -{" "}
// //                             {formatDate(booking.returnDate)}
// //                           </span>
// //                         </div>
// //                         <div className="flex items-center gap-2 text-gray-600">
// //                           <FaClock />
// //                           <span className="text-sm">
// //                             {booking.totalDays} day
// //                             {booking.totalDays > 1 ? "s" : ""}
// //                           </span>
// //                         </div>
// //                         <div className="flex items-center gap-2 text-gray-600">
// //                           <FaMapMarkerAlt />
// //                           <span className="text-sm">
// //                             {booking.pickupLocation}
// //                           </span>
// //                         </div>
// //                         <div className="flex items-center gap-2 text-gray-600">
// //                           <FaRupeeSign />
// //                           <span className="text-sm font-semibold text-blue-600">
// //                             {formatCurrency(booking.totalAmount)}
// //                           </span>
// //                         </div>
// //                       </div>

// //                       <div className="flex justify-end">
// //                         <button
// //                           onClick={() =>
// //                             navigate(`/booking-details/${booking._id}`)
// //                           }
// //                           className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
// //                         >
// //                           <FaEye size={12} /> View Details
// //                         </button>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}
// //             </div>
// //           )}

// //           {/* My Listed Vehicles Tab */}
// //           {activeTab === "listed-vehicles" && (
// //             <div>
// //               <h2 className="text-2xl font-bold text-gray-900 mb-6">
// //                 My Listed Vehicles
// //               </h2>

// //               {vehiclesLoading ? (
// //                 <div className="text-center py-12">
// //                   <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
// //                   <p className="text-gray-500">Loading vehicles...</p>
// //                 </div>
// //               ) : userVehicles.length === 0 ? (
// //                 <div className="text-center py-12 bg-white rounded-2xl shadow">
// //                   <FaCar className="text-5xl text-gray-300 mx-auto mb-3" />
// //                   <p className="text-gray-500">No vehicles listed</p>
// //                   <button
// //                     onClick={() => navigate("/list-vehicle")}
// //                     className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
// //                   >
// //                     List Your First Vehicle
// //                   </button>
// //                 </div>
// //               ) : (
// //                 <div className="space-y-4">
// //                   {userVehicles.map((vehicle) => (
// //                     <div
// //                       key={vehicle._id}
// //                       className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition"
// //                     >
// //                       <div className="flex gap-4">
// //                         <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
// //                           {vehicle.vehiclePhotos && vehicle.vehiclePhotos[0] ? (
// //                             <img
// //                               src={`http://localhost:5000${vehicle.vehiclePhotos[0].url}`}
// //                               alt={vehicle.carName}
// //                               className="w-full h-full object-cover"
// //                             />
// //                           ) : (
// //                             <div className="w-full h-full flex items-center justify-center">
// //                               <FaCar className="text-gray-400 text-3xl" />
// //                             </div>
// //                           )}
// //                         </div>

// //                         <div className="flex-1">
// //                           <div className="flex justify-between items-start mb-2">
// //                             <div>
// //                               <h3 className="text-lg font-semibold text-gray-900">
// //                                 {vehicle.carName}
// //                               </h3>
// //                               <p className="text-sm text-gray-500">
// //                                 {vehicle.carNumber}
// //                               </p>
// //                             </div>
// //                             {getStatusBadge(vehicle.status)}
// //                           </div>

// //                           <div className="grid grid-cols-2 gap-2 mb-3">
// //                             <div className="text-sm text-gray-600">
// //                               <span className="font-medium">Rate:</span> रु{" "}
// //                               {vehicle.ratePerDay}/day
// //                             </div>
// //                             <div className="text-sm text-gray-600">
// //                               <span className="font-medium">Type:</span>{" "}
// //                               {vehicle.carType}
// //                             </div>
// //                             <div className="text-sm text-gray-600">
// //                               <span className="font-medium">Seats:</span>{" "}
// //                               {vehicle.seats}
// //                             </div>
// //                             <div className="text-sm text-gray-600">
// //                               <span className="font-medium">Transmission:</span>{" "}
// //                               {vehicle.gearType}
// //                             </div>
// //                           </div>

// //                           {vehicle.rejectionReason && (
// //                             <div className="mt-2 p-2 bg-red-50 rounded-lg text-xs text-red-600">
// //                               <span className="font-medium">
// //                                 Rejection Reason:
// //                               </span>{" "}
// //                               {vehicle.rejectionReason}
// //                             </div>
// //                           )}

// //                           <div className="flex justify-end gap-3 mt-3">
// //                             <button
// //                               onClick={() =>
// //                                 navigate(`/vehicle-details/${vehicle._id}`)
// //                               }
// //                               className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
// //                             >
// //                               <FaEye size={12} /> View Details
// //                             </button>
// //                             {(vehicle.status === "pending" ||
// //                               vehicle.status === "rejected") && (
// //                               <>
// //                                 <button
// //                                   onClick={() =>
// //                                     navigate(`/edit-vehicle/${vehicle._id}`)
// //                                   }
// //                                   className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1"
// //                                 >
// //                                   <FaEdit size={12} /> Edit
// //                                 </button>
// //                                 <button
// //                                   onClick={() => {
// //                                     if (
// //                                       window.confirm(
// //                                         "Are you sure you want to delete this listing?",
// //                                       )
// //                                     ) {
// //                                       // Handle delete
// //                                     }
// //                                   }}
// //                                   className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1"
// //                                 >
// //                                   <FaTrash size={12} /> Delete
// //                                 </button>
// //                               </>
// //                             )}
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}
// //             </div>
// //           )}
// //         </main>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProfileDetails;

// // import React, { useState, useEffect, useRef } from "react";
// // import {
// //   FaCar,
// //   FaSignOutAlt,
// //   FaUserEdit,
// //   FaEnvelope,
// //   FaVenusMars,
// //   FaKey,
// //   FaCheckCircle,
// //   FaCamera,
// //   FaTimes,
// //   FaSave,
// //   FaArrowLeft,
// //   FaPlus,
// //   FaList,
// //   FaCalendarAlt,
// //   FaClock,
// //   FaMapMarkerAlt,
// //   FaRupeeSign,
// //   FaEye,
// //   FaEdit,
// //   FaTrash,
// //   FaBars,
// //   FaUserCircle,
// //   FaInfoCircle,
// //   FaFileAlt,
// //   FaUser,
// //   FaPhone,
// //   FaImage,
// //   FaFilePdf,
// //   FaFileImage,
// //   FaExpand,
// //   FaSpinner,
// //   FaTimesCircle,
// // } from "react-icons/fa";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import { toast, ToastContainer } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import Notification from "./Notification";

// // const ProfileDetails = () => {
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const [editing, setEditing] = useState(false);
// //   const [gender, setGender] = useState("Male");
// //   const [name, setName] = useState("");
// //   const [username, setUsername] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [profilePhoto, setProfilePhoto] = useState(null);
// //   const [photoPreview, setPhotoPreview] = useState(null);
// //   const [uploading, setUploading] = useState(false);
// //   const [notifications, setNotifications] = useState([]);
// //   const [activeTab, setActiveTab] = useState("profile");
// //   const [bookings, setBookings] = useState([]);
// //   const [userVehicles, setUserVehicles] = useState([]);
// //   const [bookingsLoading, setBookingsLoading] = useState(false);
// //   const [vehiclesLoading, setVehiclesLoading] = useState(false);
// //   const [sidebarOpen, setSidebarOpen] = useState(true);
// //   const [hoveredItem, setHoveredItem] = useState(null);
// //   const [showBookingModal, setShowBookingModal] = useState(false);
// //   const [selectedBooking, setSelectedBooking] = useState(null);
// //   const [showImageViewer, setShowImageViewer] = useState(false);
// //   const [selectedImage, setSelectedImage] = useState(null);
// //   const [cancellingBooking, setCancellingBooking] = useState(false);
// //   const [showCancelConfirm, setShowCancelConfirm] = useState(false);
// //   const [cancelReason, setCancelReason] = useState("");
// //   const fileInputRef = useRef(null);
// //   const navigate = useNavigate();

// //   // Fetch user profile data
// //   useEffect(() => {
// //     fetchUserProfile();
// //     fetchNotifications();
// //     fetchUserBookings();
// //     fetchUserVehicles();
// //   }, []);

// //   const fetchUserProfile = async () => {
// //     try {
// //       setError("");
// //       setLoading(true);

// //       const token =
// //         localStorage.getItem("token") || sessionStorage.getItem("token");

// //       if (!token) {
// //         setError("Please login to view your profile");
// //         setLoading(false);
// //         return;
// //       }

// //       const response = await axios.get("http://localhost:5000/api/profile", {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });

// //       if (response.data && response.data.success) {
// //         const userData = response.data.user;
// //         setUser(userData);
// //         setName(userData.name || "");
// //         setEmail(userData.email || "");
// //         setUsername(userData.username || userData.email?.split("@")[0] || "");
// //         setGender(userData.gender || "Male");

// //         if (userData.profilePhoto) {
// //           setPhotoPreview(
// //             `http://localhost:5000/uploads/profiles/${userData.profilePhoto}`,
// //           );
// //         }
// //         setError("");
// //       } else {
// //         setError(response.data?.message || "Failed to load profile data");
// //       }
// //       setLoading(false);
// //     } catch (error) {
// //       console.error("Error fetching profile:", error);
// //       let errorMessage = "Failed to load profile";

// //       if (error.response?.status === 401) {
// //         errorMessage = "Session expired. Please login again.";
// //         localStorage.removeItem("token");
// //         sessionStorage.removeItem("token");
// //       } else if (error.code === "ECONNREFUSED") {
// //         errorMessage =
// //           "Cannot connect to server. Please check if backend is running.";
// //       }

// //       setError(errorMessage);
// //       setLoading(false);
// //     }
// //   };

// //   const fetchUserBookings = async () => {
// //     try {
// //       setBookingsLoading(true);
// //       const token =
// //         localStorage.getItem("token") || sessionStorage.getItem("token");
// //       if (!token) return;

// //       const response = await axios.get(
// //         "http://localhost:5000/api/bookings/my-bookings",
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         },
// //       );

// //       if (response.data.success) {
// //         setBookings(response.data.data.bookings);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching bookings:", error);
// //       toast.error("Failed to load bookings");
// //     } finally {
// //       setBookingsLoading(false);
// //     }
// //   };

// //   const fetchUserVehicles = async () => {
// //     try {
// //       setVehiclesLoading(true);
// //       const token =
// //         localStorage.getItem("token") || sessionStorage.getItem("token");
// //       if (!token) return;

// //       const response = await axios.get(
// //         "http://localhost:5000/api/user-vehicles/my-vehicles",
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         },
// //       );

// //       if (response.data.success) {
// //         setUserVehicles(response.data.data.vehicles);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching user vehicles:", error);
// //       toast.error("Failed to load vehicles");
// //     } finally {
// //       setVehiclesLoading(false);
// //     }
// //   };

// //   const fetchNotifications = async () => {
// //     try {
// //       const token =
// //         localStorage.getItem("token") || sessionStorage.getItem("token");
// //       if (!token) return;

// //       const response = await axios.get(
// //         "http://localhost:5000/api/notifications",
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         },
// //       );

// //       if (response.data.success) {
// //         setNotifications(response.data.data);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching notifications:", error);
// //     }
// //   };

// //   const markNotificationAsRead = async (notificationId) => {
// //     try {
// //       const token =
// //         localStorage.getItem("token") || sessionStorage.getItem("token");
// //       await axios.put(
// //         `http://localhost:5000/api/notifications/${notificationId}/read`,
// //         {},
// //         { headers: { Authorization: `Bearer ${token}` } },
// //       );

// //       setNotifications((prev) =>
// //         prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n)),
// //       );
// //     } catch (error) {
// //       console.error("Error marking notification as read:", error);
// //     }
// //   };

// //   const deleteNotification = async (notificationId) => {
// //     try {
// //       const token =
// //         localStorage.getItem("token") || sessionStorage.getItem("token");
// //       await axios.delete(
// //         `http://localhost:5000/api/notifications/${notificationId}`,
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         },
// //       );

// //       setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
// //     } catch (error) {
// //       console.error("Error deleting notification:", error);
// //     }
// //   };

// //   const handleLogout = () => {
// //     localStorage.removeItem("token");
// //     sessionStorage.removeItem("token");
// //     navigate("/login");
// //   };

// //   const handleBack = () => {
// //     const token =
// //       localStorage.getItem("token") || sessionStorage.getItem("token");
// //     if (token) {
// //       navigate("/rentridehome");
// //     } else {
// //       navigate("/login");
// //     }
// //   };

// //   const handleEditToggle = () => {
// //     if (editing) {
// //       if (user) {
// //         setName(user.name);
// //         setUsername(user.username || user.email?.split("@")[0] || "");
// //         setGender(user.gender || "Male");
// //         if (user.profilePhoto) {
// //           setPhotoPreview(
// //             `http://localhost:5000/uploads/profiles/${user.profilePhoto}`,
// //           );
// //         } else {
// //           setPhotoPreview(null);
// //         }
// //         setProfilePhoto(null);
// //       }
// //     }
// //     setEditing(!editing);
// //   };

// //   const handlePhotoChange = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       setProfilePhoto(file);
// //       const reader = new FileReader();
// //       reader.onloadend = () => {
// //         setPhotoPreview(reader.result);
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   const handleRemovePhoto = () => {
// //     setProfilePhoto(null);
// //     setPhotoPreview(null);
// //     if (fileInputRef.current) {
// //       fileInputRef.current.value = "";
// //     }
// //   };

// //   const handleSaveProfile = async () => {
// //     try {
// //       const token =
// //         localStorage.getItem("token") || sessionStorage.getItem("token");
// //       if (!token) {
// //         toast.error("Please login again");
// //         navigate("/login");
// //         return;
// //       }

// //       setUploading(true);

// //       const formData = new FormData();
// //       formData.append("name", name);
// //       formData.append("username", username);
// //       formData.append("gender", gender);

// //       if (profilePhoto) {
// //         formData.append("profilePhoto", profilePhoto);
// //       }

// //       const response = await axios.put(
// //         "http://localhost:5000/api/profile/update",
// //         formData,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             "Content-Type": "multipart/form-data",
// //           },
// //         },
// //       );

// //       if (response.data.success) {
// //         setUser(response.data.user);
// //         setEditing(false);
// //         setProfilePhoto(null);

// //         if (response.data.user.profilePhoto) {
// //           setPhotoPreview(
// //             `http://localhost:5000/uploads/profiles/${response.data.user.profilePhoto}`,
// //           );
// //         }

// //         addNotification({
// //           title: "Profile Updated",
// //           message: "Your profile has been successfully updated.",
// //           type: "success",
// //         });

// //         toast.success("Profile updated successfully!");
// //       } else {
// //         toast.error("Failed to update profile");
// //       }

// //       setUploading(false);
// //     } catch (error) {
// //       console.error("Error updating profile:", error);
// //       setUploading(false);
// //       toast.error(
// //         error.response?.data?.message ||
// //           "Failed to update profile. Please try again.",
// //       );
// //     }
// //   };

// //   const addNotification = async (notification) => {
// //     try {
// //       const token =
// //         localStorage.getItem("token") || sessionStorage.getItem("token");
// //       const response = await axios.post(
// //         "http://localhost:5000/api/notifications",
// //         notification,
// //         { headers: { Authorization: `Bearer ${token}` } },
// //       );

// //       if (response.data.success) {
// //         setNotifications((prev) => [response.data.data, ...prev]);
// //       }
// //     } catch (error) {
// //       console.error("Error adding notification:", error);
// //     }
// //   };

// //   const handleCancelBooking = async () => {
// //     if (!cancelReason.trim()) {
// //       toast.error("Please provide a reason for cancellation");
// //       return;
// //     }

// //     setCancellingBooking(true);
// //     try {
// //       const token =
// //         localStorage.getItem("token") || sessionStorage.getItem("token");
// //       const response = await axios.post(
// //         `http://localhost:5000/api/bookings/${selectedBooking._id}/cancel`,
// //         { reason: cancelReason },
// //         { headers: { Authorization: `Bearer ${token}` } },
// //       );

// //       if (response.data.success) {
// //         toast.success("Booking cancelled successfully!");
// //         fetchUserBookings(); // Refresh bookings list
// //         setShowBookingModal(false); // Close modal
// //         setShowCancelConfirm(false);
// //         setCancelReason("");
// //       } else {
// //         toast.error(response.data.message || "Failed to cancel booking");
// //       }
// //     } catch (error) {
// //       console.error("Error cancelling booking:", error);
// //       toast.error(error.response?.data?.message || "Failed to cancel booking");
// //     } finally {
// //       setCancellingBooking(false);
// //     }
// //   };

// //   const openCancelModal = (booking) => {
// //     setSelectedBooking(booking);
// //     setShowCancelConfirm(true);
// //   };

// //   const handleViewDetails = (booking) => {
// //     setSelectedBooking(booking);
// //     setShowBookingModal(true);
// //   };

// //   const openImageViewer = (imageUrl) => {
// //     setSelectedImage(imageUrl);
// //     setShowImageViewer(true);
// //   };

// //   const getFileIcon = (mimetype) => {
// //     if (mimetype?.startsWith("image/")) {
// //       return <FaFileImage className="text-blue-500" />;
// //     } else if (mimetype === "application/pdf") {
// //       return <FaFilePdf className="text-red-500" />;
// //     }
// //     return <FaFileAlt className="text-gray-500" />;
// //   };

// //   const getVehicleImageUrl = (vehicle, index = 0) => {
// //     if (vehicle.vehiclePhotos && vehicle.vehiclePhotos[index]) {
// //       return `http://localhost:5000${vehicle.vehiclePhotos[index].url}`;
// //     }
// //     return null;
// //   };

// //   const canCancelBooking = (status) => {
// //     // Only pending bookings can be cancelled
// //     return status === "pending";
// //   };

// //   const getStatusBadge = (status) => {
// //     const statusConfig = {
// //       pending: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
// //       approved: { color: "bg-blue-100 text-blue-800", label: "Approved" },
// //       rejected: { color: "bg-red-100 text-red-800", label: "Rejected" },
// //       confirmed: { color: "bg-green-100 text-green-800", label: "Confirmed" },
// //       active: { color: "bg-purple-100 text-purple-800", label: "Active" },
// //       completed: { color: "bg-gray-100 text-gray-800", label: "Completed" },
// //       cancelled: { color: "bg-red-100 text-red-800", label: "Cancelled" },
// //     };
// //     const config = statusConfig[status] || statusConfig.pending;
// //     return (
// //       <span
// //         className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
// //       >
// //         {config.label}
// //       </span>
// //     );
// //   };

// //   const formatDate = (date) => {
// //     return new Date(date).toLocaleDateString("en-US", {
// //       year: "numeric",
// //       month: "short",
// //       day: "numeric",
// //     });
// //   };

// //   const formatDateTime = (date) => {
// //     return new Date(date).toLocaleString("en-US", {
// //       year: "numeric",
// //       month: "short",
// //       day: "numeric",
// //       hour: "2-digit",
// //       minute: "2-digit",
// //     });
// //   };

// //   const formatCurrency = (amount) => {
// //     return `रु ${amount?.toLocaleString("en-NP") || 0}`;
// //   };

// //   const sidebarItems = [
// //     { id: "profile", icon: FaUserCircle, label: "Profile" },
// //     { id: "bookings", icon: FaCalendarAlt, label: "My Bookings" },
// //     { id: "listed-vehicles", icon: FaList, label: "My Listed Vehicles" },
// //   ];

// //   const handleRetry = () => {
// //     setLoading(true);
// //     fetchUserProfile();
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
// //           <p className="text-gray-600">Loading profile...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error && !user) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="text-red-600 text-4xl mb-4">⚠️</div>
// //           <h2 className="text-xl font-semibold mb-2">Error Loading Profile</h2>
// //           <p className="text-gray-600 mb-4">{error}</p>
// //           <button
// //             onClick={handleRetry}
// //             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
// //           >
// //             Try Again
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
// //       <ToastContainer position="top-right" autoClose={3000} />

// //       {/* Sidebar - same as before */}
// //       <div
// //         className={`fixed top-0 left-0 h-full backdrop-blur-xl bg-white/95 shadow-2xl transition-all duration-300 z-20 ${
// //           sidebarOpen ? "w-72" : "w-20"
// //         }`}
// //         style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
// //       >
// //         {/* Logo Section */}
// //         <div className="p-6 border-b border-gray-200">
// //           <div className="flex items-center justify-between">
// //             <div className="flex items-center gap-3">
// //               <div className="p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
// //                 <FaCar className="text-white text-2xl" />
// //               </div>
// //               {sidebarOpen && (
// //                 <div>
// //                   <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
// //                     Rent<span className="text-gray-800">Ride</span>
// //                   </h1>
// //                   <p className="text-xs text-gray-500 mt-0.5">User Panel</p>
// //                 </div>
// //               )}
// //             </div>
// //             <button
// //               onClick={() => setSidebarOpen(!sidebarOpen)}
// //               className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300"
// //             >
// //               <FaBars className="text-gray-600" />
// //             </button>
// //           </div>
// //         </div>

// //         {/* User Info */}
// //         {sidebarOpen && user && (
// //           <div className="mx-4 mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
// //             <div className="flex items-center gap-3">
// //               {photoPreview ? (
// //                 <img
// //                   src={photoPreview}
// //                   alt="profile"
// //                   className="w-12 h-12 rounded-full object-cover object-center border-2 border-white shadow-md"
// //                 />
// //               ) : (
// //                 <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
// //                   <FaUserCircle className="text-white text-2xl" />
// //                 </div>
// //               )}
// //               <div className="flex-1">
// //                 <p className="font-semibold text-gray-800">{user.name}</p>
// //                 <p className="text-xs text-gray-500 truncate">{user.email}</p>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {/* Navigation Menu */}
// //         <nav className="mt-6 px-3">
// //           <p
// //             className={`text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 ${
// //               !sidebarOpen && "text-center"
// //             }`}
// //           >
// //             {sidebarOpen ? "MAIN MENU" : "..."}
// //           </p>
// //           {sidebarItems.map((item) => {
// //             const Icon = item.icon;
// //             const isActive = activeTab === item.id;
// //             const isHovered = hoveredItem === item.id;

// //             return (
// //               <button
// //                 key={item.id}
// //                 onClick={() => setActiveTab(item.id)}
// //                 onMouseEnter={() => setHoveredItem(item.id)}
// //                 onMouseLeave={() => setHoveredItem(null)}
// //                 className={`relative w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-xl transition-all duration-300 group ${
// //                   isActive
// //                     ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
// //                     : "text-gray-600 hover:bg-gray-100"
// //                 } ${!sidebarOpen && "justify-center"}`}
// //               >
// //                 <Icon
// //                   className={`text-xl ${
// //                     isActive ? "text-white" : "text-gray-500"
// //                   } transition-transform duration-300 group-hover:scale-110`}
// //                 />
// //                 {sidebarOpen && (
// //                   <span
// //                     className={`font-medium ${isActive ? "text-white" : ""}`}
// //                   >
// //                     {item.label}
// //                   </span>
// //                 )}
// //                 {!sidebarOpen && isHovered && (
// //                   <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded whitespace-nowrap z-50">
// //                     {item.label}
// //                   </div>
// //                 )}
// //                 {isActive && sidebarOpen && (
// //                   <div className="absolute left-0 w-1 h-8 bg-white rounded-r-full"></div>
// //                 )}
// //               </button>
// //             );
// //           })}
// //         </nav>

// //         {/* Logout Button */}
// //         <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
// //           <button
// //             onClick={handleLogout}
// //             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
// //               !sidebarOpen && "justify-center"
// //             } bg-red-50 hover:bg-red-100 text-red-600 group`}
// //           >
// //             <FaSignOutAlt className="text-xl transition-transform duration-300 group-hover:scale-110" />
// //             {sidebarOpen && <span className="font-medium">Logout</span>}
// //           </button>
// //         </div>
// //       </div>

// //       {/* Main Content */}
// //       <div
// //         className={`transition-all duration-300 ${
// //           sidebarOpen ? "ml-72" : "ml-20"
// //         }`}
// //       >
// //         {/* Header */}
// //         <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
// //           <div className="px-8 py-5">
// //             <div className="flex justify-between items-center">
// //               <div>
// //                 <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
// //                   {activeTab === "profile" && "My Profile"}
// //                   {activeTab === "bookings" && "My Bookings"}
// //                   {activeTab === "listed-vehicles" && "My Listed Vehicles"}
// //                 </h1>
// //                 <p className="text-sm text-gray-500 mt-1">
// //                   {activeTab === "profile" &&
// //                     "Manage your personal information"}
// //                   {activeTab === "bookings" && "View and manage your bookings"}
// //                   {activeTab === "listed-vehicles" &&
// //                     "Manage your listed vehicles"}
// //                 </p>
// //               </div>
// //               <Notification
// //                 notifications={notifications}
// //                 onMarkAsRead={markNotificationAsRead}
// //                 onDelete={deleteNotification}
// //               />
// //             </div>
// //           </div>
// //         </header>

// //         {/* Content */}
// //         <main className="p-8">
// //           {/* Profile Tab */}
// //           {activeTab === "profile" && (
// //             <div className="flex flex-col items-center text-center">
// //               {/* Avatar with edit functionality */}
// //               <div className="relative mb-4">
// //                 {photoPreview ? (
// //                   <img
// //                     src={photoPreview}
// //                     alt="profile"
// //                     className="w-28 h-28 rounded-full object-cover object-center border-4 border-white shadow-lg"
// //                   />
// //                 ) : (
// //                   <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-3xl shadow-lg">
// //                     {user?.name?.charAt(0).toUpperCase() || "U"}
// //                   </div>
// //                 )}

// //                 {editing && (
// //                   <>
// //                     <button
// //                       onClick={() => fileInputRef.current.click()}
// //                       className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition shadow-md"
// //                     >
// //                       <FaCamera />
// //                     </button>
// //                     {photoPreview && (
// //                       <button
// //                         onClick={handleRemovePhoto}
// //                         className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition shadow-md"
// //                       >
// //                         <FaTimes size={12} />
// //                       </button>
// //                     )}
// //                   </>
// //                 )}

// //                 <input
// //                   type="file"
// //                   ref={fileInputRef}
// //                   className="hidden"
// //                   accept="image/*"
// //                   onChange={handlePhotoChange}
// //                 />
// //               </div>

// //               {/* Name and Username */}
// //               <div className="mb-6">
// //                 {editing ? (
// //                   <div className="flex flex-col items-center gap-2">
// //                     <input
// //                       type="text"
// //                       value={name}
// //                       onChange={(e) => setName(e.target.value)}
// //                       className="text-xl font-semibold text-center bg-transparent border-b border-blue-300 focus:outline-none mb-1 focus:border-blue-500"
// //                       placeholder="Enter name"
// //                     />
// //                     <div className="flex items-center gap-2">
// //                       <span className="text-gray-500">@</span>
// //                       <input
// //                         type="text"
// //                         value={username}
// //                         onChange={(e) => setUsername(e.target.value)}
// //                         className="text-gray-500 text-center bg-transparent border-b border-blue-300 focus:outline-none focus:border-blue-500"
// //                         placeholder="username"
// //                       />
// //                     </div>
// //                   </div>
// //                 ) : (
// //                   <div className="flex flex-col items-center">
// //                     <h2 className="text-xl font-semibold">{user?.name}</h2>
// //                     <p className="text-gray-500">@{username}</p>
// //                   </div>
// //                 )}
// //               </div>

// //               {/* Edit/Save Profile Button */}
// //               <button
// //                 onClick={editing ? handleSaveProfile : handleEditToggle}
// //                 disabled={uploading}
// //                 className={`flex items-center gap-2 w-64 py-3 rounded-xl font-medium mb-10 justify-center transition ${
// //                   editing
// //                     ? "bg-green-600 hover:bg-green-700 text-white"
// //                     : "bg-gray-100 hover:bg-gray-200"
// //                 } ${uploading ? "opacity-70 cursor-not-allowed" : ""}`}
// //               >
// //                 {uploading ? (
// //                   <>
// //                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
// //                     Saving...
// //                   </>
// //                 ) : editing ? (
// //                   <>
// //                     <FaSave />
// //                     Save Profile
// //                   </>
// //                 ) : (
// //                   <>
// //                     <FaUserEdit />
// //                     Edit Profile
// //                   </>
// //                 )}
// //               </button>

// //               {/* Cancel Edit Button */}
// //               {editing && (
// //                 <button
// //                   onClick={handleEditToggle}
// //                   className="flex items-center gap-2 w-64 bg-red-100 hover:bg-red-200 text-red-700 py-3 rounded-xl font-medium mb-10 justify-center transition"
// //                 >
// //                   <FaTimes />
// //                   Cancel Edit
// //                 </button>
// //               )}

// //               {/* Info Section */}
// //               <div className="w-full max-w-xl space-y-6">
// //                 {/* Email */}
// //                 <div className="flex items-center justify-between border-b pb-4">
// //                   <div className="flex items-center gap-3 text-gray-600">
// //                     <FaEnvelope />
// //                     <span>Email</span>
// //                   </div>
// //                   <span className="font-medium">{user?.email}</span>
// //                 </div>

// //                 {/* Gender Dropdown */}
// //                 <div className="flex items-center justify-between border-b pb-4">
// //                   <div className="flex items-center gap-3 text-gray-600">
// //                     <FaVenusMars />
// //                     <span>Gender</span>
// //                   </div>

// //                   {editing ? (
// //                     <select
// //                       value={gender}
// //                       onChange={(e) => setGender(e.target.value)}
// //                       className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
// //                     >
// //                       <option value="Male">Male</option>
// //                       <option value="Female">Female</option>
// //                       <option value="Other">Other</option>
// //                       <option value="Prefer not to say">
// //                         Prefer not to say
// //                       </option>
// //                     </select>
// //                   ) : (
// //                     <span className="font-medium">
// //                       {user?.gender || "Not specified"}
// //                     </span>
// //                   )}
// //                 </div>

// //                 {/* Actions */}
// //                 <div className="space-y-4 pt-4">
// //                   <button
// //                     onClick={() => navigate("/change-password")}
// //                     className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-6 py-2 rounded-xl font-medium transition w-full justify-center"
// //                   >
// //                     <FaKey />
// //                     Change / Forgot Password
// //                   </button>

// //                   <div className="flex items-center justify-center gap-3">
// //                     {user?.kycVerified ? (
// //                       <>
// //                         <FaCheckCircle className="text-green-600 text-lg" />
// //                         <span className="font-medium text-green-600">
// //                           KYC Verified
// //                         </span>
// //                       </>
// //                     ) : (
// //                       <>
// //                         <FaCheckCircle className="text-yellow-500 text-lg" />
// //                         <span className="font-medium text-yellow-600">
// //                           KYC Pending
// //                         </span>
// //                         <button
// //                           onClick={() => navigate("/identity-verification")}
// //                           className="ml-2 text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-200 transition"
// //                         >
// //                           Verify Now
// //                         </button>
// //                       </>
// //                     )}
// //                   </div>
// //                 </div>

// //                 {/* Member Since */}
// //                 <div className="pt-6 border-t">
// //                   <div className="text-center text-gray-500">
// //                     <p className="text-sm">
// //                       Member since:{" "}
// //                       {user?.createdAt
// //                         ? new Date(user.createdAt).toLocaleDateString("en-US", {
// //                             month: "long",
// //                             year: "numeric",
// //                           })
// //                         : "Recently"}
// //                     </p>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {/* My Bookings Tab */}
// //           {activeTab === "bookings" && (
// //             <div>
// //               <h2 className="text-2xl font-bold text-gray-900 mb-6">
// //                 My Bookings
// //               </h2>

// //               {bookingsLoading ? (
// //                 <div className="text-center py-12">
// //                   <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
// //                   <p className="text-gray-500">Loading bookings...</p>
// //                 </div>
// //               ) : bookings.length === 0 ? (
// //                 <div className="text-center py-12 bg-white rounded-2xl shadow">
// //                   <FaCalendarAlt className="text-5xl text-gray-300 mx-auto mb-3" />
// //                   <p className="text-gray-500">No bookings found</p>
// //                   <button
// //                     onClick={() => navigate("/rentridehome")}
// //                     className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
// //                   >
// //                     Browse Vehicles
// //                   </button>
// //                 </div>
// //               ) : (
// //                 <div className="space-y-4">
// //                   {bookings.map((booking) => (
// //                     <div
// //                       key={booking._id}
// //                       className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition"
// //                     >
// //                       <div className="flex justify-between items-start mb-4">
// //                         <div>
// //                           <h3 className="text-lg font-semibold text-gray-900">
// //                             {booking.vehicle?.carName}
// //                           </h3>
// //                           <p className="text-sm text-gray-500">
// //                             {booking.vehicle?.carNumber}
// //                           </p>
// //                         </div>
// //                         {getStatusBadge(booking.status)}
// //                       </div>

// //                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
// //                         <div className="flex items-center gap-2 text-gray-600">
// //                           <FaCalendarAlt />
// //                           <span className="text-sm">
// //                             {formatDate(booking.pickupDate)} -{" "}
// //                             {formatDate(booking.returnDate)}
// //                           </span>
// //                         </div>
// //                         <div className="flex items-center gap-2 text-gray-600">
// //                           <FaClock />
// //                           <span className="text-sm">
// //                             {booking.totalDays} day
// //                             {booking.totalDays > 1 ? "s" : ""}
// //                           </span>
// //                         </div>
// //                         <div className="flex items-center gap-2 text-gray-600">
// //                           <FaMapMarkerAlt />
// //                           <span className="text-sm">
// //                             {booking.pickupLocation}
// //                           </span>
// //                         </div>
// //                         <div className="flex items-center gap-2 text-gray-600">
// //                           <FaRupeeSign />
// //                           <span className="text-sm font-semibold text-blue-600">
// //                             {formatCurrency(booking.totalAmount)}
// //                           </span>
// //                         </div>
// //                       </div>

// //                       <div className="flex justify-end gap-3">
// //                         <button
// //                           onClick={() => handleViewDetails(booking)}
// //                           className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
// //                         >
// //                           <FaEye size={12} /> View Details
// //                         </button>
// //                         {canCancelBooking(booking.status) && (
// //                           <button
// //                             onClick={() => openCancelModal(booking)}
// //                             className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1"
// //                           >
// //                             <FaTrash size={12} /> Cancel Booking
// //                           </button>
// //                         )}
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}
// //             </div>
// //           )}

// //           {/* My Listed Vehicles Tab */}
// //           {activeTab === "listed-vehicles" && (
// //             <div>
// //               <h2 className="text-2xl font-bold text-gray-900 mb-6">
// //                 My Listed Vehicles
// //               </h2>

// //               {vehiclesLoading ? (
// //                 <div className="text-center py-12">
// //                   <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
// //                   <p className="text-gray-500">Loading vehicles...</p>
// //                 </div>
// //               ) : userVehicles.length === 0 ? (
// //                 <div className="text-center py-12 bg-white rounded-2xl shadow">
// //                   <FaCar className="text-5xl text-gray-300 mx-auto mb-3" />
// //                   <p className="text-gray-500">No vehicles listed</p>
// //                   <button
// //                     onClick={() => navigate("/list-vehicle")}
// //                     className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
// //                   >
// //                     List Your First Vehicle
// //                   </button>
// //                 </div>
// //               ) : (
// //                 <div className="space-y-4">
// //                   {userVehicles.map((vehicle) => (
// //                     <div
// //                       key={vehicle._id}
// //                       className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition"
// //                     >
// //                       <div className="flex gap-4">
// //                         <div
// //                           className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer"
// //                           onClick={() => {
// //                             const firstImage = getVehicleImageUrl(vehicle, 0);
// //                             if (firstImage) openImageViewer(firstImage);
// //                           }}
// //                         >
// //                           {vehicle.vehiclePhotos && vehicle.vehiclePhotos[0] ? (
// //                             <img
// //                               src={getVehicleImageUrl(vehicle, 0)}
// //                               alt={vehicle.carName}
// //                               className="w-full h-full object-cover"
// //                             />
// //                           ) : (
// //                             <div className="w-full h-full flex items-center justify-center">
// //                               <FaCar className="text-gray-400 text-3xl" />
// //                             </div>
// //                           )}
// //                         </div>

// //                         <div className="flex-1">
// //                           <div className="flex justify-between items-start mb-2">
// //                             <div>
// //                               <h3 className="text-lg font-semibold text-gray-900">
// //                                 {vehicle.carName}
// //                               </h3>
// //                               <p className="text-sm text-gray-500">
// //                                 {vehicle.carNumber}
// //                               </p>
// //                             </div>
// //                             {getStatusBadge(vehicle.status)}
// //                           </div>

// //                           <div className="grid grid-cols-2 gap-2 mb-3">
// //                             <div className="text-sm text-gray-600">
// //                               <span className="font-medium">Rate:</span> रु{" "}
// //                               {vehicle.ratePerDay}/day
// //                             </div>
// //                             <div className="text-sm text-gray-600">
// //                               <span className="font-medium">Type:</span>{" "}
// //                               {vehicle.carType}
// //                             </div>
// //                             <div className="text-sm text-gray-600">
// //                               <span className="font-medium">Seats:</span>{" "}
// //                               {vehicle.seats}
// //                             </div>
// //                             <div className="text-sm text-gray-600">
// //                               <span className="font-medium">Transmission:</span>{" "}
// //                               {vehicle.gearType}
// //                             </div>
// //                           </div>

// //                           {vehicle.rejectionReason && (
// //                             <div className="mt-2 p-2 bg-red-50 rounded-lg text-xs text-red-600">
// //                               <span className="font-medium">
// //                                 Rejection Reason:
// //                               </span>{" "}
// //                               {vehicle.rejectionReason}
// //                             </div>
// //                           )}

// //                           <div className="flex justify-end gap-3 mt-3">
// //                             <button
// //                               onClick={() =>
// //                                 navigate(`/vehicle-details/${vehicle._id}`)
// //                               }
// //                               className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
// //                             >
// //                               <FaEye size={12} /> View Details
// //                             </button>
// //                             {(vehicle.status === "pending" ||
// //                               vehicle.status === "rejected") && (
// //                               <>
// //                                 <button
// //                                   onClick={() =>
// //                                     navigate(`/edit-vehicle/${vehicle._id}`)
// //                                   }
// //                                   className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1"
// //                                 >
// //                                   <FaEdit size={12} /> Edit
// //                                 </button>
// //                                 <button
// //                                   onClick={() => {
// //                                     if (
// //                                       window.confirm(
// //                                         "Are you sure you want to delete this listing?",
// //                                       )
// //                                     ) {
// //                                       // Handle delete
// //                                     }
// //                                   }}
// //                                   className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1"
// //                                 >
// //                                   <FaTrash size={12} /> Delete
// //                                 </button>
// //                               </>
// //                             )}
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}
// //             </div>
// //           )}
// //         </main>
// //       </div>

// //       {/* Booking Details Modal */}
// //       {showBookingModal && selectedBooking && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
// //           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
// //             <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
// //               <div className="flex justify-between items-center">
// //                 <div className="flex items-center gap-3">
// //                   <FaInfoCircle className="text-blue-600 text-2xl" />
// //                   <h3 className="text-xl font-bold text-gray-800">
// //                     Booking Details
// //                   </h3>
// //                 </div>
// //                 <button
// //                   onClick={() => setShowBookingModal(false)}
// //                   className="text-gray-400 hover:text-gray-600"
// //                 >
// //                   <FaTimes size={24} />
// //                 </button>
// //               </div>
// //             </div>

// //             <div className="p-6">
// //               {/* Vehicle Images Section */}
// //               {selectedBooking.vehicle?.photos &&
// //                 selectedBooking.vehicle.photos.length > 0 && (
// //                   <div className="mb-8">
// //                     <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
// //                       <FaImage className="text-blue-600" />
// //                       Vehicle Images
// //                     </h4>
// //                     <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
// //                       {selectedBooking.vehicle.photos
// //                         .slice(0, 4)
// //                         .map((photo, index) => (
// //                           <div
// //                             key={index}
// //                             className="relative h-32 rounded-lg overflow-hidden cursor-pointer group"
// //                             onClick={() =>
// //                               openImageViewer(
// //                                 `http://localhost:5000/uploads/${selectedBooking.vehicleType === "user" ? "user-vehicles" : "vehicles"}/${photo.filename}`,
// //                               )
// //                             }
// //                           >
// //                             <img
// //                               src={`http://localhost:5000/uploads/${selectedBooking.vehicleType === "user" ? "user-vehicles" : "vehicles"}/${photo.filename}`}
// //                               alt={photo.label || `Vehicle ${index + 1}`}
// //                               className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
// //                             />
// //                             <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
// //                               <FaExpand className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
// //                             </div>
// //                           </div>
// //                         ))}
// //                     </div>
// //                   </div>
// //                 )}

// //               {/* Booking Information */}
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
// //                 <div className="bg-gray-50 rounded-lg p-4">
// //                   <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
// //                     <FaFileAlt className="text-blue-600" />
// //                     Booking Information
// //                   </h4>
// //                   <div className="space-y-2">
// //                     <p>
// //                       <span className="text-gray-600">Booking ID:</span>{" "}
// //                       <strong>
// //                         {selectedBooking.confirmationCode ||
// //                           selectedBooking._id}
// //                       </strong>
// //                     </p>
// //                     <p>
// //                       <span className="text-gray-600">Status:</span>{" "}
// //                       {getStatusBadge(selectedBooking.status)}
// //                     </p>
// //                     <p>
// //                       <span className="text-gray-600">Created:</span>{" "}
// //                       {formatDateTime(selectedBooking.createdAt)}
// //                     </p>
// //                     {selectedBooking.approvedAt && (
// //                       <p>
// //                         <span className="text-gray-600">Approved:</span>{" "}
// //                         {formatDateTime(selectedBooking.approvedAt)}
// //                       </p>
// //                     )}
// //                     {selectedBooking.rejectionReason && (
// //                       <p>
// //                         <span className="text-gray-600">Rejection Reason:</span>{" "}
// //                         <span className="text-red-600">
// //                           {selectedBooking.rejectionReason}
// //                         </span>
// //                       </p>
// //                     )}
// //                   </div>
// //                 </div>

// //                 <div className="bg-gray-50 rounded-lg p-4">
// //                   <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
// //                     <FaUser className="text-blue-600" />
// //                     Customer Information
// //                   </h4>
// //                   <div className="space-y-2">
// //                     <p>
// //                       <span className="text-gray-600">Name:</span>{" "}
// //                       <strong>{selectedBooking.user?.name}</strong>
// //                     </p>
// //                     <p>
// //                       <span className="text-gray-600">Email:</span>{" "}
// //                       {selectedBooking.user?.email}
// //                     </p>
// //                     <p>
// //                       <span className="text-gray-600">Phone:</span>{" "}
// //                       {selectedBooking.user?.phone || "Not provided"}
// //                     </p>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Vehicle Information */}
// //               <div className="bg-gray-50 rounded-lg p-4 mb-8">
// //                 <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
// //                   <FaCar className="text-blue-600" />
// //                   Vehicle Information
// //                 </h4>
// //                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// //                   <div>
// //                     <p className="text-gray-600 text-sm">Vehicle Name</p>
// //                     <p className="font-medium">
// //                       {selectedBooking.vehicle?.carName}
// //                     </p>
// //                   </div>
// //                   <div>
// //                     <p className="text-gray-600 text-sm">Car Number</p>
// //                     <p className="font-medium">
// //                       {selectedBooking.vehicle?.carNumber}
// //                     </p>
// //                   </div>
// //                   <div>
// //                     <p className="text-gray-600 text-sm">Car Type</p>
// //                     <p className="font-medium">
// //                       {selectedBooking.vehicle?.carType}
// //                     </p>
// //                   </div>
// //                   <div>
// //                     <p className="text-gray-600 text-sm">Seats</p>
// //                     <p className="font-medium">
// //                       {selectedBooking.vehicle?.seats}
// //                     </p>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Rental Details */}
// //               <div className="bg-gray-50 rounded-lg p-4 mb-8">
// //                 <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
// //                   <FaCalendarAlt className="text-blue-600" />
// //                   Rental Details
// //                 </h4>
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                   <div>
// //                     <p className="text-gray-600 text-sm">Pickup</p>
// //                     <p className="font-medium">
// //                       {formatDate(selectedBooking.pickupDate)} at{" "}
// //                       {selectedBooking.pickupTime}
// //                     </p>
// //                     <p className="text-sm text-gray-600">
// //                       {selectedBooking.pickupLocation}
// //                     </p>
// //                   </div>
// //                   <div>
// //                     <p className="text-gray-600 text-sm">Return</p>
// //                     <p className="font-medium">
// //                       {formatDate(selectedBooking.returnDate)} at{" "}
// //                       {selectedBooking.returnTime}
// //                     </p>
// //                     <p className="text-sm text-gray-600">
// //                       {selectedBooking.dropoffLocation}
// //                     </p>
// //                   </div>
// //                 </div>
// //                 <div className="mt-4 pt-4 border-t border-gray-200">
// //                   <p>
// //                     <span className="text-gray-600">Duration:</span>{" "}
// //                     <strong>{selectedBooking.totalDays} days</strong>
// //                   </p>
// //                   <p>
// //                     <span className="text-gray-600">Driver Option:</span>{" "}
// //                     {selectedBooking.driverOption === "with"
// //                       ? "With Driver"
// //                       : "Self Drive"}
// //                   </p>
// //                   <p>
// //                     <span className="text-gray-600">Insurance:</span>{" "}
// //                     {selectedBooking.insuranceOption === "premium"
// //                       ? "Premium Coverage"
// //                       : "Basic Coverage"}
// //                   </p>
// //                 </div>
// //               </div>

// //               {/* Pricing Breakdown */}
// //               <div className="bg-gray-50 rounded-lg p-4 mb-8">
// //                 <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
// //                   <FaRupeeSign className="text-blue-600" />
// //                   Pricing Breakdown
// //                 </h4>
// //                 <div className="space-y-2">
// //                   <div className="flex justify-between">
// //                     <span className="text-gray-600">
// //                       Base Price ({selectedBooking.totalDays} days)
// //                     </span>
// //                     <span>{formatCurrency(selectedBooking.basePrice)}</span>
// //                   </div>
// //                   {selectedBooking.driverFee > 0 && (
// //                     <div className="flex justify-between">
// //                       <span className="text-gray-600">Driver Fee</span>
// //                       <span>{formatCurrency(selectedBooking.driverFee)}</span>
// //                     </div>
// //                   )}
// //                   {selectedBooking.insuranceFee > 0 && (
// //                     <div className="flex justify-between">
// //                       <span className="text-gray-600">Premium Insurance</span>
// //                       <span>
// //                         {formatCurrency(selectedBooking.insuranceFee)}
// //                       </span>
// //                     </div>
// //                   )}
// //                   <div className="flex justify-between">
// //                     <span className="text-gray-600">Service Fee</span>
// //                     <span>{formatCurrency(selectedBooking.serviceFee)}</span>
// //                   </div>
// //                   {selectedBooking.tax > 0 && (
// //                     <div className="flex justify-between">
// //                       <span className="text-gray-600">Tax</span>
// //                       <span>{formatCurrency(selectedBooking.tax)}</span>
// //                     </div>
// //                   )}
// //                   <div className="border-t pt-2 mt-2">
// //                     <div className="flex justify-between font-bold">
// //                       <span>Total Amount</span>
// //                       <span className="text-blue-600">
// //                         {formatCurrency(selectedBooking.totalAmount)}
// //                       </span>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Emergency Contact */}
// //               {selectedBooking.emergencyContact && (
// //                 <div className="bg-gray-50 rounded-lg p-4 mb-8">
// //                   <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
// //                     <FaPhone className="text-blue-600" /> Emergency Contact
// //                   </h4>
// //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                     <div>
// //                       <p className="text-gray-600 text-sm">Name</p>
// //                       <p className="font-medium">
// //                         {selectedBooking.emergencyContact.name}
// //                       </p>
// //                     </div>
// //                     <div>
// //                       <p className="text-gray-600 text-sm">Phone</p>
// //                       <p className="font-medium">
// //                         {selectedBooking.emergencyContact.phone}
// //                       </p>
// //                     </div>
// //                     <div>
// //                       <p className="text-gray-600 text-sm">Relationship</p>
// //                       <p className="font-medium">
// //                         {selectedBooking.emergencyContact.relationship ||
// //                           "Not specified"}
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </div>
// //               )}

// //               {/* Special Requests */}
// //               {selectedBooking.specialRequests && (
// //                 <div className="bg-gray-50 rounded-lg p-4 mb-8">
// //                   <h4 className="font-semibold text-gray-800 mb-2">
// //                     Special Requests
// //                   </h4>
// //                   <p className="text-gray-700">
// //                     {selectedBooking.specialRequests}
// //                   </p>
// //                 </div>
// //               )}

// //               {/* Action Buttons - Only for Pending Bookings */}
// //               {selectedBooking.status === "pending" && (
// //                 <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
// //                   <button
// //                     onClick={() => openCancelModal(selectedBooking)}
// //                     className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium flex items-center gap-2"
// //                   >
// //                     <FaTrash />
// //                     Cancel Booking
// //                   </button>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Cancel Booking Confirmation Modal */}
// //       {showCancelConfirm && selectedBooking && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[70]">
// //           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
// //             <div className="p-6">
// //               <div className="flex items-center gap-3 mb-4">
// //                 <FaTimesCircle className="text-red-600 text-2xl" />
// //                 <h3 className="text-xl font-bold text-gray-800">
// //                   Cancel Booking
// //                 </h3>
// //               </div>

// //               <p className="text-gray-600 mb-4">
// //                 Are you sure you want to cancel your booking for{" "}
// //                 <strong>{selectedBooking.vehicle?.carName}</strong>?
// //               </p>

// //               <div className="mb-4">
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Reason for Cancellation *
// //                 </label>
// //                 <textarea
// //                   value={cancelReason}
// //                   onChange={(e) => setCancelReason(e.target.value)}
// //                   rows="3"
// //                   className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none"
// //                   placeholder="Please provide a reason for cancelling this booking..."
// //                 />
// //               </div>

// //               <div className="flex justify-end gap-3">
// //                 <button
// //                   onClick={() => {
// //                     setShowCancelConfirm(false);
// //                     setCancelReason("");
// //                   }}
// //                   className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
// //                 >
// //                   Close
// //                 </button>
// //                 <button
// //                   onClick={handleCancelBooking}
// //                   disabled={cancellingBooking}
// //                   className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium disabled:opacity-50 flex items-center gap-2"
// //                 >
// //                   {cancellingBooking ? (
// //                     <>
// //                       <FaSpinner className="animate-spin" />
// //                       Cancelling...
// //                     </>
// //                   ) : (
// //                     "Yes, Cancel Booking"
// //                   )}
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
// //               alt="Preview"
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

// // export default ProfileDetails;

// import React, { useState, useEffect, useRef } from "react";
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
//   FaImage,
//   FaFilePdf,
//   FaFileImage,
//   FaExpand,
//   FaSpinner,
//   FaTimesCircle,
//   FaWallet,
//   FaChartLine,
//   FaPercentage,
// } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Notification from "./Notification";

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

//   // Earnings state
//   const [earnings, setEarnings] = useState(null);
//   const [earningsLoading, setEarningsLoading] = useState(false);
//   const [selectedEarningVehicle, setSelectedEarningVehicle] = useState(null);
//   const [showEarningDetailsModal, setShowEarningDetailsModal] = useState(false);

//   const fileInputRef = useRef(null);
//   const navigate = useNavigate();

//   // Fetch user profile data
//   useEffect(() => {
//     fetchUserProfile();
//     fetchNotifications();
//     fetchUserBookings();
//     fetchUserVehicles();
//     fetchUserEarnings();
//   }, []);

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
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.data && response.data.success) {
//         const userData = response.data.user;
//         setUser(userData);
//         setName(userData.name || "");
//         setEmail(userData.email || "");
//         setUsername(userData.username || userData.email?.split("@")[0] || "");
//         setGender(userData.gender || "Male");

//         if (userData.profilePhoto) {
//           setPhotoPreview(
//             `http://localhost:5000/uploads/profiles/${userData.profilePhoto}`,
//           );
//         }
//         setError("");
//       } else {
//         setError(response.data?.message || "Failed to load profile data");
//       }
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching profile:", error);
//       let errorMessage = "Failed to load profile";

//       if (error.response?.status === 401) {
//         errorMessage = "Session expired. Please login again.";
//         localStorage.removeItem("token");
//         sessionStorage.removeItem("token");
//       } else if (error.code === "ECONNREFUSED") {
//         errorMessage =
//           "Cannot connect to server. Please check if backend is running.";
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

//       if (response.data.success) {
//         setBookings(response.data.data.bookings);
//       }
//     } catch (error) {
//       console.error("Error fetching bookings:", error);
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

//       if (response.data.success) {
//         setUserVehicles(response.data.data.vehicles);
//       }
//     } catch (error) {
//       console.error("Error fetching user vehicles:", error);
//       toast.error("Failed to load vehicles");
//     } finally {
//       setVehiclesLoading(false);
//     }
//   };

//   // Fetch user earnings from listed vehicles
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

//       if (response.data.success) {
//         setEarnings(response.data.data);
//       }
//     } catch (error) {
//       console.error("Error fetching earnings:", error);
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

//       if (response.data.success) {
//         setNotifications(response.data.data);
//       }
//     } catch (error) {
//       console.error("Error fetching notifications:", error);
//     }
//   };

//   const markNotificationAsRead = async (notificationId) => {
//     try {
//       const token =
//         localStorage.getItem("token") || sessionStorage.getItem("token");
//       await axios.put(
//         `http://localhost:5000/api/notifications/${notificationId}/read`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } },
//       );

//       setNotifications((prev) =>
//         prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n)),
//       );
//     } catch (error) {
//       console.error("Error marking notification as read:", error);
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
//       console.error("Error deleting notification:", error);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     sessionStorage.removeItem("token");
//     navigate("/login");
//   };

//   const handleBack = () => {
//     const token =
//       localStorage.getItem("token") || sessionStorage.getItem("token");
//     if (token) {
//       navigate("/rentridehome");
//     } else {
//       navigate("/login");
//     }
//   };

//   const handleEditToggle = () => {
//     if (editing) {
//       if (user) {
//         setName(user.name);
//         setUsername(user.username || user.email?.split("@")[0] || "");
//         setGender(user.gender || "Male");
//         if (user.profilePhoto) {
//           setPhotoPreview(
//             `http://localhost:5000/uploads/profiles/${user.profilePhoto}`,
//           );
//         } else {
//           setPhotoPreview(null);
//         }
//         setProfilePhoto(null);
//       }
//     }
//     setEditing(!editing);
//   };

//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfilePhoto(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPhotoPreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleRemovePhoto = () => {
//     setProfilePhoto(null);
//     setPhotoPreview(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
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

//       if (profilePhoto) {
//         formData.append("profilePhoto", profilePhoto);
//       }

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

//         if (response.data.user.profilePhoto) {
//           setPhotoPreview(
//             `http://localhost:5000/uploads/profiles/${response.data.user.profilePhoto}`,
//           );
//         }

//         addNotification({
//           title: "Profile Updated",
//           message: "Your profile has been successfully updated.",
//           type: "success",
//         });

//         toast.success("Profile updated successfully!");
//       } else {
//         toast.error("Failed to update profile");
//       }

//       setUploading(false);
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       setUploading(false);
//       toast.error(
//         error.response?.data?.message ||
//           "Failed to update profile. Please try again.",
//       );
//     }
//   };

//   const addNotification = async (notification) => {
//     try {
//       const token =
//         localStorage.getItem("token") || sessionStorage.getItem("token");
//       const response = await axios.post(
//         "http://localhost:5000/api/notifications",
//         notification,
//         { headers: { Authorization: `Bearer ${token}` } },
//       );

//       if (response.data.success) {
//         setNotifications((prev) => [response.data.data, ...prev]);
//       }
//     } catch (error) {
//       console.error("Error adding notification:", error);
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
//       } else {
//         toast.error(response.data.message || "Failed to cancel booking");
//       }
//     } catch (error) {
//       console.error("Error cancelling booking:", error);
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

//   const openImageViewer = (imageUrl) => {
//     setSelectedImage(imageUrl);
//     setShowImageViewer(true);
//   };

//   const getFileIcon = (mimetype) => {
//     if (mimetype?.startsWith("image/")) {
//       return <FaFileImage className="text-blue-500" />;
//     } else if (mimetype === "application/pdf") {
//       return <FaFilePdf className="text-red-500" />;
//     }
//     return <FaFileAlt className="text-gray-500" />;
//   };

//   const getVehicleImageUrl = (vehicle, index = 0) => {
//     if (vehicle.vehiclePhotos && vehicle.vehiclePhotos[index]) {
//       return `http://localhost:5000${vehicle.vehiclePhotos[index].url}`;
//     }
//     return null;
//   };

//   const canCancelBooking = (status) => {
//     return status === "pending";
//   };

//   const getStatusBadge = (status) => {
//     const statusConfig = {
//       pending: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
//       approved: { color: "bg-blue-100 text-blue-800", label: "Approved" },
//       rejected: { color: "bg-red-100 text-red-800", label: "Rejected" },
//       confirmed: { color: "bg-green-100 text-green-800", label: "Confirmed" },
//       active: { color: "bg-purple-100 text-purple-800", label: "Active" },
//       completed: { color: "bg-gray-100 text-gray-800", label: "Completed" },
//       cancelled: { color: "bg-red-100 text-red-800", label: "Cancelled" },
//     };
//     const config = statusConfig[status] || statusConfig.pending;
//     return (
//       <span
//         className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
//       >
//         {config.label}
//       </span>
//     );
//   };

//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   const formatDateTime = (date) => {
//     return new Date(date).toLocaleString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const formatCurrency = (amount) => {
//     return `रु ${amount?.toLocaleString("en-NP") || 0}`;
//   };

//   const sidebarItems = [
//     { id: "profile", icon: FaUserCircle, label: "Profile" },
//     { id: "bookings", icon: FaCalendarAlt, label: "My Bookings" },
//     { id: "listed-vehicles", icon: FaList, label: "My Listed Vehicles" },
//     { id: "earnings", icon: FaRupeeSign, label: "My Earnings" },
//   ];

//   const handleRetry = () => {
//     setLoading(true);
//     fetchUserProfile();
//   };

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
//             onClick={handleRetry}
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
//         style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
//       >
//         {/* Logo Section */}
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
//               className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300"
//             >
//               <FaBars className="text-gray-600" />
//             </button>
//           </div>
//         </div>

//         {/* User Info */}
//         {sidebarOpen && user && (
//           <div className="mx-4 mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
//             <div className="flex items-center gap-3">
//               {photoPreview ? (
//                 <img
//                   src={photoPreview}
//                   alt="profile"
//                   className="w-12 h-12 rounded-full object-cover object-center border-2 border-white shadow-md"
//                 />
//               ) : (
//                 <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
//                   <FaUserCircle className="text-white text-2xl" />
//                 </div>
//               )}
//               <div className="flex-1">
//                 <p className="font-semibold text-gray-800">{user.name}</p>
//                 <p className="text-xs text-gray-500 truncate">{user.email}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Navigation Menu */}
//         <nav className="mt-6 px-3">
//           <p
//             className={`text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 ${
//               !sidebarOpen && "text-center"
//             }`}
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
//                 onClick={() => setActiveTab(item.id)}
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
//               </button>
//             );
//           })}
//         </nav>

//         {/* Logout Button */}
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
//         className={`transition-all duration-300 ${
//           sidebarOpen ? "ml-72" : "ml-20"
//         }`}
//       >
//         {/* Header */}
//         <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
//           <div className="px-8 py-5">
//             <div className="flex justify-between items-center">
//               <div>
//                 <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
//                   {activeTab === "profile" && "My Profile"}
//                   {activeTab === "bookings" && "My Bookings"}
//                   {activeTab === "listed-vehicles" && "My Listed Vehicles"}
//                   {activeTab === "earnings" && "My Earnings"}
//                 </h1>
//                 <p className="text-sm text-gray-500 mt-1">
//                   {activeTab === "profile" &&
//                     "Manage your personal information"}
//                   {activeTab === "bookings" && "View and manage your bookings"}
//                   {activeTab === "listed-vehicles" &&
//                     "Manage your listed vehicles"}
//                   {activeTab === "earnings" &&
//                     "Track your earnings from listed vehicles"}
//                 </p>
//               </div>
//               <Notification
//                 notifications={notifications}
//                 onMarkAsRead={markNotificationAsRead}
//                 onDelete={deleteNotification}
//               />
//             </div>
//           </div>
//         </header>

//         {/* Content */}
//         <main className="p-8">
//           {/* Profile Tab */}
//           {activeTab === "profile" && (
//             <div className="flex flex-col items-center text-center">
//               {/* Avatar with edit functionality */}
//               <div className="relative mb-4">
//                 {photoPreview ? (
//                   <img
//                     src={photoPreview}
//                     alt="profile"
//                     className="w-28 h-28 rounded-full object-cover object-center border-4 border-white shadow-lg"
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

//               {/* Name and Username */}
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

//               {/* Edit/Save Profile Button */}
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
//                     <FaSave />
//                     Save Profile
//                   </>
//                 ) : (
//                   <>
//                     <FaUserEdit />
//                     Edit Profile
//                   </>
//                 )}
//               </button>

//               {/* Cancel Edit Button */}
//               {editing && (
//                 <button
//                   onClick={handleEditToggle}
//                   className="flex items-center gap-2 w-64 bg-red-100 hover:bg-red-200 text-red-700 py-3 rounded-xl font-medium mb-10 justify-center transition"
//                 >
//                   <FaTimes />
//                   Cancel Edit
//                 </button>
//               )}

//               {/* Info Section */}
//               <div className="w-full max-w-xl space-y-6">
//                 {/* Email */}
//                 <div className="flex items-center justify-between border-b pb-4">
//                   <div className="flex items-center gap-3 text-gray-600">
//                     <FaEnvelope />
//                     <span>Email</span>
//                   </div>
//                   <span className="font-medium">{user?.email}</span>
//                 </div>

//                 {/* Gender Dropdown */}
//                 <div className="flex items-center justify-between border-b pb-4">
//                   <div className="flex items-center gap-3 text-gray-600">
//                     <FaVenusMars />
//                     <span>Gender</span>
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

//                 {/* Actions */}
//                 <div className="space-y-4 pt-4">
//                   <button
//                     onClick={() => navigate("/change-password")}
//                     className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-6 py-2 rounded-xl font-medium transition w-full justify-center"
//                   >
//                     <FaKey />
//                     Change Password
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

//                 {/* Member Since */}
//                 <div className="pt-6 border-t">
//                   <div className="text-center text-gray-500">
//                     <p className="text-sm">
//                       Member since:{" "}
//                       {user?.createdAt
//                         ? new Date(user.createdAt).toLocaleDateString("en-US", {
//                             month: "long",
//                             year: "numeric",
//                           })
//                         : "Recently"}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* My Bookings Tab */}
//           {activeTab === "bookings" && (
//             <div>
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                 My Bookings
//               </h2>

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
//                       <div className="flex justify-between items-start mb-4">
//                         <div>
//                           <h3 className="text-lg font-semibold text-gray-900">
//                             {booking.vehicle?.carName}
//                           </h3>
//                           <p className="text-sm text-gray-500">
//                             {booking.vehicle?.carNumber}
//                           </p>
//                         </div>
//                         {getStatusBadge(booking.status)}
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                         <div className="flex items-center gap-2 text-gray-600">
//                           <FaCalendarAlt />
//                           <span className="text-sm">
//                             {formatDate(booking.pickupDate)} -{" "}
//                             {formatDate(booking.returnDate)}
//                           </span>
//                         </div>
//                         <div className="flex items-center gap-2 text-gray-600">
//                           <FaClock />
//                           <span className="text-sm">
//                             {booking.totalDays} day
//                             {booking.totalDays > 1 ? "s" : ""}
//                           </span>
//                         </div>
//                         <div className="flex items-center gap-2 text-gray-600">
//                           <FaMapMarkerAlt />
//                           <span className="text-sm">
//                             {booking.pickupLocation}
//                           </span>
//                         </div>
//                         <div className="flex items-center gap-2 text-gray-600">
//                           <FaRupeeSign />
//                           <span className="text-sm font-semibold text-blue-600">
//                             {formatCurrency(booking.totalAmount)}
//                           </span>
//                         </div>
//                       </div>

//                       <div className="flex justify-end gap-3">
//                         <button
//                           onClick={() => handleViewDetails(booking)}
//                           className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
//                         >
//                           <FaEye size={12} /> View Details
//                         </button>
//                         {canCancelBooking(booking.status) && (
//                           <button
//                             onClick={() => openCancelModal(booking)}
//                             className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1"
//                           >
//                             <FaTrash size={12} /> Cancel Booking
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}

//           {/* My Listed Vehicles Tab */}
//           {activeTab === "listed-vehicles" && (
//             <div>
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                 My Listed Vehicles
//               </h2>

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
//                       <div className="flex gap-4">
//                         <div
//                           className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer"
//                           onClick={() => {
//                             const firstImage = getVehicleImageUrl(vehicle, 0);
//                             if (firstImage) openImageViewer(firstImage);
//                           }}
//                         >
//                           {vehicle.vehiclePhotos && vehicle.vehiclePhotos[0] ? (
//                             <img
//                               src={getVehicleImageUrl(vehicle, 0)}
//                               alt={vehicle.carName}
//                               className="w-full h-full object-cover"
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
//                                 {vehicle.carName}
//                               </h3>
//                               <p className="text-sm text-gray-500">
//                                 {vehicle.carNumber}
//                               </p>
//                             </div>
//                             {getStatusBadge(vehicle.status)}
//                           </div>

//                           <div className="grid grid-cols-2 gap-2 mb-3">
//                             <div className="text-sm text-gray-600">
//                               <span className="font-medium">Rate:</span> रु{" "}
//                               {vehicle.ratePerDay}/day
//                             </div>
//                             <div className="text-sm text-gray-600">
//                               <span className="font-medium">Type:</span>{" "}
//                               {vehicle.carType}
//                             </div>
//                             <div className="text-sm text-gray-600">
//                               <span className="font-medium">Seats:</span>{" "}
//                               {vehicle.seats}
//                             </div>
//                             <div className="text-sm text-gray-600">
//                               <span className="font-medium">Transmission:</span>{" "}
//                               {vehicle.gearType}
//                             </div>
//                           </div>

//                           {vehicle.rejectionReason && (
//                             <div className="mt-2 p-2 bg-red-50 rounded-lg text-xs text-red-600">
//                               <span className="font-medium">
//                                 Rejection Reason:
//                               </span>{" "}
//                               {vehicle.rejectionReason}
//                             </div>
//                           )}

//                           <div className="flex justify-end gap-3 mt-3">
//                             <button
//                               onClick={() =>
//                                 navigate(`/vehicle-details/${vehicle._id}`)
//                               }
//                               className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
//                             >
//                               <FaEye size={12} /> View Details
//                             </button>
//                             {(vehicle.status === "pending" ||
//                               vehicle.status === "rejected") && (
//                               <>
//                                 <button
//                                   onClick={() =>
//                                     navigate(`/edit-vehicle/${vehicle._id}`)
//                                   }
//                                   className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1"
//                                 >
//                                   <FaEdit size={12} /> Edit
//                                 </button>
//                                 <button
//                                   onClick={() => {
//                                     if (
//                                       window.confirm(
//                                         "Are you sure you want to delete this listing?",
//                                       )
//                                     ) {
//                                       // Handle delete
//                                     }
//                                   }}
//                                   className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1"
//                                 >
//                                   <FaTrash size={12} /> Delete
//                                 </button>
//                               </>
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

//           {/* My Earnings Tab */}
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
//                   {/* Earnings Summary Cards */}
//                   <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//                     <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg p-6 text-white">
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="text-green-100 text-sm">
//                             Total Earnings
//                           </p>
//                           <p className="text-3xl font-bold mt-1">
//                             {formatCurrency(earnings.totalEarnings)}
//                           </p>
//                           <p className="text-green-100 text-xs mt-2">
//                             70% of total bookings
//                           </p>
//                         </div>
//                         <div className="p-3 bg-white/20 rounded-xl">
//                           <FaWallet className="text-2xl" />
//                         </div>
//                       </div>
//                     </div>

//                     <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl shadow-lg p-6 text-white">
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="text-blue-100 text-sm">
//                             Total Bookings
//                           </p>
//                           <p className="text-3xl font-bold mt-1">
//                             {earnings.totalBookings}
//                           </p>
//                           <p className="text-blue-100 text-xs mt-2">
//                             Completed bookings
//                           </p>
//                         </div>
//                         <div className="p-3 bg-white/20 rounded-xl">
//                           <FaCalendarAlt className="text-2xl" />
//                         </div>
//                       </div>
//                     </div>

//                     <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl shadow-lg p-6 text-white">
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="text-purple-100 text-sm">
//                             Gross Revenue
//                           </p>
//                           <p className="text-3xl font-bold mt-1">
//                             {formatCurrency(earnings.grossRevenue)}
//                           </p>
//                           <p className="text-purple-100 text-xs mt-2">
//                             Total booking amount
//                           </p>
//                         </div>
//                         <div className="p-3 bg-white/20 rounded-xl">
//                           <FaChartLine className="text-2xl" />
//                         </div>
//                       </div>
//                     </div>

//                     <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl shadow-lg p-6 text-white">
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="text-orange-100 text-sm">
//                             Avg. per Booking
//                           </p>
//                           <p className="text-3xl font-bold mt-1">
//                             {formatCurrency(earnings.averagePerBooking)}
//                           </p>
//                           <p className="text-orange-100 text-xs mt-2">
//                             Your average earning
//                           </p>
//                         </div>
//                         <div className="p-3 bg-white/20 rounded-xl">
//                           <FaPercentage className="text-2xl" />
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Commission Info Card */}
//                   <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
//                     <div className="flex items-center gap-3">
//                       <div className="p-2 bg-blue-100 rounded-lg">
//                         <FaInfoCircle className="text-blue-600" />
//                       </div>
//                       <div>
//                         <p className="text-sm text-blue-800">
//                           <strong>Commission Structure:</strong> When a user
//                           books your vehicle, RentRide takes 30% commission and
//                           you receive 70% of the total booking amount.
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Earnings by Vehicle Table */}
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
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                               Vehicle
//                             </th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                               Bookings
//                             </th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                               Gross Revenue
//                             </th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                               Your Earnings (70%)
//                             </th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                               Action
//                             </th>
//                           </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                           {earnings.vehicles?.map((vehicleEarning, index) => (
//                             <tr
//                               key={index}
//                               className="hover:bg-gray-50 transition"
//                             >
//                               <td className="px-6 py-4">
//                                 <div className="flex items-center gap-3">
//                                   {vehicleEarning.vehicle
//                                     ?.vehiclePhotos?.[0] && (
//                                     <img
//                                       src={`http://localhost:5000${vehicleEarning.vehicle.vehiclePhotos[0].url}`}
//                                       alt={vehicleEarning.vehicle?.carName}
//                                       className="w-10 h-10 object-cover rounded-lg"
//                                     />
//                                   )}
//                                   <div>
//                                     <p className="font-medium text-gray-900">
//                                       {vehicleEarning.vehicle?.carName}
//                                     </p>
//                                     <p className="text-xs text-gray-500">
//                                       {vehicleEarning.vehicle?.carNumber}
//                                     </p>
//                                   </div>
//                                 </div>
//                               </td>
//                               <td className="px-6 py-4">
//                                 <span className="font-semibold text-gray-700">
//                                   {vehicleEarning.totalBookings}
//                                 </span>
//                               </td>
//                               <td className="px-6 py-4 font-medium text-gray-700">
//                                 {formatCurrency(vehicleEarning.grossRevenue)}
//                               </td>
//                               <td className="px-6 py-4">
//                                 <span className="font-bold text-green-600">
//                                   {formatCurrency(vehicleEarning.ownerEarnings)}
//                                 </span>
//                                 <p className="text-xs text-gray-400">
//                                   70% of{" "}
//                                   {formatCurrency(vehicleEarning.grossRevenue)}
//                                 </p>
//                               </td>
//                               <td className="px-6 py-4">
//                                 <button
//                                   onClick={() => {
//                                     setSelectedEarningVehicle(vehicleEarning);
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

//                   {/* Recent Transactions */}
//                   {earnings.recentTransactions &&
//                     earnings.recentTransactions.length > 0 && (
//                       <div className="bg-white rounded-2xl shadow-lg overflow-hidden mt-8">
//                         <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
//                           <h2 className="text-lg font-semibold text-gray-800">
//                             Recent Transactions
//                           </h2>
//                           <p className="text-sm text-gray-500">
//                             Latest booking transactions for your vehicles
//                           </p>
//                         </div>
//                         <div className="overflow-x-auto">
//                           <table className="min-w-full divide-y divide-gray-200">
//                             <thead className="bg-gray-50">
//                               <tr>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                                   Booking ID
//                                 </th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                                   Vehicle
//                                 </th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                                   Renter
//                                 </th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                                   Booking Amount
//                                 </th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                                   Your Earnings
//                                 </th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                                   Date
//                                 </th>
//                               </tr>
//                             </thead>
//                             <tbody className="bg-white divide-y divide-gray-200">
//                               {earnings.recentTransactions.map(
//                                 (transaction, index) => (
//                                   <tr key={index} className="hover:bg-gray-50">
//                                     <td className="px-6 py-4 font-mono text-sm">
//                                       {transaction.confirmationCode}
//                                     </td>
//                                     <td className="px-6 py-4">
//                                       <div className="flex items-center gap-2">
//                                         {transaction.vehicle
//                                           ?.vehiclePhotos?.[0] && (
//                                           <img
//                                             src={`http://localhost:5000${transaction.vehicle.vehiclePhotos[0].url}`}
//                                             alt=""
//                                             className="w-6 h-6 object-cover rounded"
//                                           />
//                                         )}
//                                         <span className="text-sm">
//                                           {transaction.vehicle?.carName}
//                                         </span>
//                                       </div>
//                                     </td>
//                                     <td className="px-6 py-4 text-sm text-gray-600">
//                                       {transaction.user?.name || "N/A"}
//                                     </td>
//                                     <td className="px-6 py-4 font-medium text-gray-700">
//                                       {formatCurrency(transaction.totalAmount)}
//                                     </td>
//                                     <td className="px-6 py-4">
//                                       <span className="font-semibold text-green-600">
//                                         {formatCurrency(
//                                           transaction.ownerEarnings,
//                                         )}
//                                       </span>
//                                     </td>
//                                     <td className="px-6 py-4 text-sm text-gray-500">
//                                       {formatDate(transaction.createdAt)}
//                                     </td>
//                                   </tr>
//                                 ),
//                               )}
//                             </tbody>
//                           </table>
//                         </div>
//                       </div>
//                     )}
//                 </>
//               )}
//             </div>
//           )}
//         </main>
//       </div>

//       {/* Booking Details Modal */}
//       {showBookingModal && selectedBooking && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
//               <div className="flex justify-between items-center">
//                 <div className="flex items-center gap-3">
//                   <FaInfoCircle className="text-blue-600 text-2xl" />
//                   <h3 className="text-xl font-bold text-gray-800">
//                     Booking Details
//                   </h3>
//                 </div>
//                 <button
//                   onClick={() => setShowBookingModal(false)}
//                   className="text-gray-400 hover:text-gray-600"
//                 >
//                   <FaTimes size={24} />
//                 </button>
//               </div>
//             </div>

//             <div className="p-6">
//               {/* Vehicle Images Section */}
//               {selectedBooking.vehicle?.photos &&
//                 selectedBooking.vehicle.photos.length > 0 && (
//                   <div className="mb-8">
//                     <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                       <FaImage className="text-blue-600" />
//                       Vehicle Images
//                     </h4>
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                       {selectedBooking.vehicle.photos
//                         .slice(0, 4)
//                         .map((photo, index) => (
//                           <div
//                             key={index}
//                             className="relative h-32 rounded-lg overflow-hidden cursor-pointer group"
//                             onClick={() =>
//                               openImageViewer(
//                                 `http://localhost:5000/uploads/${selectedBooking.vehicleType === "user" ? "user-vehicles" : "vehicles"}/${photo.filename}`,
//                               )
//                             }
//                           >
//                             <img
//                               src={`http://localhost:5000/uploads/${selectedBooking.vehicleType === "user" ? "user-vehicles" : "vehicles"}/${photo.filename}`}
//                               alt={photo.label || `Vehicle ${index + 1}`}
//                               className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//                             />
//                             <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
//                               <FaExpand className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                             </div>
//                           </div>
//                         ))}
//                     </div>
//                   </div>
//                 )}

//               {/* Booking Information */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                 <div className="bg-gray-50 rounded-lg p-4">
//                   <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                     <FaFileAlt className="text-blue-600" />
//                     Booking Information
//                   </h4>
//                   <div className="space-y-2">
//                     <p>
//                       <span className="text-gray-600">Booking ID:</span>{" "}
//                       <strong>
//                         {selectedBooking.confirmationCode ||
//                           selectedBooking._id}
//                       </strong>
//                     </p>
//                     <p>
//                       <span className="text-gray-600">Status:</span>{" "}
//                       {getStatusBadge(selectedBooking.status)}
//                     </p>
//                     <p>
//                       <span className="text-gray-600">Created:</span>{" "}
//                       {formatDateTime(selectedBooking.createdAt)}
//                     </p>
//                     {selectedBooking.approvedAt && (
//                       <p>
//                         <span className="text-gray-600">Approved:</span>{" "}
//                         {formatDateTime(selectedBooking.approvedAt)}
//                       </p>
//                     )}
//                     {selectedBooking.rejectionReason && (
//                       <p>
//                         <span className="text-gray-600">Rejection Reason:</span>{" "}
//                         <span className="text-red-600">
//                           {selectedBooking.rejectionReason}
//                         </span>
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 <div className="bg-gray-50 rounded-lg p-4">
//                   <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                     <FaUser className="text-blue-600" />
//                     Customer Information
//                   </h4>
//                   <div className="space-y-2">
//                     <p>
//                       <span className="text-gray-600">Name:</span>{" "}
//                       <strong>{selectedBooking.user?.name}</strong>
//                     </p>
//                     <p>
//                       <span className="text-gray-600">Email:</span>{" "}
//                       {selectedBooking.user?.email}
//                     </p>
//                     <p>
//                       <span className="text-gray-600">Phone:</span>{" "}
//                       {selectedBooking.user?.phone || "Not provided"}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Vehicle Information */}
//               <div className="bg-gray-50 rounded-lg p-4 mb-8">
//                 <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                   <FaCar className="text-blue-600" />
//                   Vehicle Information
//                 </h4>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                   <div>
//                     <p className="text-gray-600 text-sm">Vehicle Name</p>
//                     <p className="font-medium">
//                       {selectedBooking.vehicle?.carName}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-gray-600 text-sm">Car Number</p>
//                     <p className="font-medium">
//                       {selectedBooking.vehicle?.carNumber}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-gray-600 text-sm">Car Type</p>
//                     <p className="font-medium">
//                       {selectedBooking.vehicle?.carType}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-gray-600 text-sm">Seats</p>
//                     <p className="font-medium">
//                       {selectedBooking.vehicle?.seats}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Rental Details */}
//               <div className="bg-gray-50 rounded-lg p-4 mb-8">
//                 <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                   <FaCalendarAlt className="text-blue-600" />
//                   Rental Details
//                 </h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <p className="text-gray-600 text-sm">Pickup</p>
//                     <p className="font-medium">
//                       {formatDate(selectedBooking.pickupDate)} at{" "}
//                       {selectedBooking.pickupTime}
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       {selectedBooking.pickupLocation}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-gray-600 text-sm">Return</p>
//                     <p className="font-medium">
//                       {formatDate(selectedBooking.returnDate)} at{" "}
//                       {selectedBooking.returnTime}
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       {selectedBooking.dropoffLocation}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="mt-4 pt-4 border-t border-gray-200">
//                   <p>
//                     <span className="text-gray-600">Duration:</span>{" "}
//                     <strong>{selectedBooking.totalDays} days</strong>
//                   </p>
//                   <p>
//                     <span className="text-gray-600">Driver Option:</span>{" "}
//                     {selectedBooking.driverOption === "with"
//                       ? "With Driver"
//                       : "Self Drive"}
//                   </p>
//                   <p>
//                     <span className="text-gray-600">Insurance:</span>{" "}
//                     {selectedBooking.insuranceOption === "premium"
//                       ? "Premium Coverage"
//                       : "Basic Coverage"}
//                   </p>
//                 </div>
//               </div>

//               {/* Pricing Breakdown */}
//               <div className="bg-gray-50 rounded-lg p-4 mb-8">
//                 <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                   <FaRupeeSign className="text-blue-600" />
//                   Pricing Breakdown
//                 </h4>
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">
//                       Base Price ({selectedBooking.totalDays} days)
//                     </span>
//                     <span>{formatCurrency(selectedBooking.basePrice)}</span>
//                   </div>
//                   {selectedBooking.driverFee > 0 && (
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Driver Fee</span>
//                       <span>{formatCurrency(selectedBooking.driverFee)}</span>
//                     </div>
//                   )}
//                   {selectedBooking.insuranceFee > 0 && (
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Premium Insurance</span>
//                       <span>
//                         {formatCurrency(selectedBooking.insuranceFee)}
//                       </span>
//                     </div>
//                   )}
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Service Fee</span>
//                     <span>{formatCurrency(selectedBooking.serviceFee)}</span>
//                   </div>
//                   {selectedBooking.tax > 0 && (
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Tax</span>
//                       <span>{formatCurrency(selectedBooking.tax)}</span>
//                     </div>
//                   )}
//                   <div className="border-t pt-2 mt-2">
//                     <div className="flex justify-between font-bold">
//                       <span>Total Amount</span>
//                       <span className="text-blue-600">
//                         {formatCurrency(selectedBooking.totalAmount)}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Emergency Contact */}
//               {selectedBooking.emergencyContact && (
//                 <div className="bg-gray-50 rounded-lg p-4 mb-8">
//                   <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                     <FaPhone className="text-blue-600" /> Emergency Contact
//                   </h4>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <div>
//                       <p className="text-gray-600 text-sm">Name</p>
//                       <p className="font-medium">
//                         {selectedBooking.emergencyContact.name}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-gray-600 text-sm">Phone</p>
//                       <p className="font-medium">
//                         {selectedBooking.emergencyContact.phone}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-gray-600 text-sm">Relationship</p>
//                       <p className="font-medium">
//                         {selectedBooking.emergencyContact.relationship ||
//                           "Not specified"}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Special Requests */}
//               {selectedBooking.specialRequests && (
//                 <div className="bg-gray-50 rounded-lg p-4 mb-8">
//                   <h4 className="font-semibold text-gray-800 mb-2">
//                     Special Requests
//                   </h4>
//                   <p className="text-gray-700">
//                     {selectedBooking.specialRequests}
//                   </p>
//                 </div>
//               )}

//               {/* Action Buttons */}
//               {selectedBooking.status === "pending" && (
//                 <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
//                   <button
//                     onClick={() => openCancelModal(selectedBooking)}
//                     className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium flex items-center gap-2"
//                   >
//                     <FaTrash />
//                     Cancel Booking
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Cancel Booking Confirmation Modal */}
//       {showCancelConfirm && selectedBooking && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[70]">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
//             <div className="p-6">
//               <div className="flex items-center gap-3 mb-4">
//                 <FaTimesCircle className="text-red-600 text-2xl" />
//                 <h3 className="text-xl font-bold text-gray-800">
//                   Cancel Booking
//                 </h3>
//               </div>

//               <p className="text-gray-600 mb-4">
//                 Are you sure you want to cancel your booking for{" "}
//                 <strong>{selectedBooking.vehicle?.carName}</strong>?
//               </p>

//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Reason for Cancellation *
//                 </label>
//                 <textarea
//                   value={cancelReason}
//                   onChange={(e) => setCancelReason(e.target.value)}
//                   rows="3"
//                   className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none"
//                   placeholder="Please provide a reason for cancelling this booking..."
//                 />
//               </div>

//               <div className="flex justify-end gap-3">
//                 <button
//                   onClick={() => {
//                     setShowCancelConfirm(false);
//                     setCancelReason("");
//                   }}
//                   className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
//                 >
//                   Close
//                 </button>
//                 <button
//                   onClick={handleCancelBooking}
//                   disabled={cancellingBooking}
//                   className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium disabled:opacity-50 flex items-center gap-2"
//                 >
//                   {cancellingBooking ? (
//                     <>
//                       <FaSpinner className="animate-spin" />
//                       Cancelling...
//                     </>
//                   ) : (
//                     "Yes, Cancel Booking"
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Earning Details Modal */}
//       {showEarningDetailsModal && selectedEarningVehicle && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
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
//               {/* Summary Cards */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//                 <div className="bg-green-50 rounded-lg p-4 text-center">
//                   <p className="text-sm text-gray-600">Total Bookings</p>
//                   <p className="text-2xl font-bold text-green-600">
//                     {selectedEarningVehicle.totalBookings}
//                   </p>
//                 </div>
//                 <div className="bg-blue-50 rounded-lg p-4 text-center">
//                   <p className="text-sm text-gray-600">Gross Revenue</p>
//                   <p className="text-2xl font-bold text-blue-600">
//                     {formatCurrency(selectedEarningVehicle.grossRevenue)}
//                   </p>
//                 </div>
//                 <div className="bg-purple-50 rounded-lg p-4 text-center">
//                   <p className="text-sm text-gray-600">Your Earnings (70%)</p>
//                   <p className="text-2xl font-bold text-purple-600">
//                     {formatCurrency(selectedEarningVehicle.ownerEarnings)}
//                   </p>
//                 </div>
//               </div>

//               {/* Bookings Table */}
//               <h4 className="font-semibold text-gray-800 mb-3">
//                 Booking Transactions
//               </h4>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
//                         Booking ID
//                       </th>
//                       <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
//                         Renter
//                       </th>
//                       <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
//                         Amount
//                       </th>
//                       <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
//                         Your Earnings
//                       </th>
//                       <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
//                         Date
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {selectedEarningVehicle.bookings?.map((booking, idx) => (
//                       <tr key={idx} className="hover:bg-gray-50">
//                         <td className="px-4 py-2 font-mono text-sm">
//                           {booking.confirmationCode}
//                         </td>
//                         <td className="px-4 py-2 text-sm">
//                           {booking.user?.name || "N/A"}
//                         </td>
//                         <td className="px-4 py-2 text-sm">
//                           {formatCurrency(booking.totalAmount)}
//                         </td>
//                         <td className="px-4 py-2 text-sm font-semibold text-green-600">
//                           {formatCurrency(booking.totalAmount * 0.7)}
//                         </td>
//                         <td className="px-4 py-2 text-sm">
//                           {formatDate(booking.createdAt)}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Image Viewer Modal */}
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

import React, { useState, useEffect, useRef } from "react";
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
  FaImage,
  FaFilePdf,
  FaFileImage,
  FaExpand,
  FaSpinner,
  FaTimesCircle,
  FaWallet,
  FaChartLine,
  FaPercentage,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notification from "./Notification";

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

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
    fetchNotifications();
    fetchUserBookings();
    fetchUserVehicles();
    fetchUserEarnings();
  }, []);

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
        if (userData.profilePhoto) {
          setPhotoPreview(
            `http://localhost:5000/uploads/profiles/${userData.profilePhoto}`,
          );
        }
        setError("");
      } else {
        setError(response.data?.message || "Failed to load profile data");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile:", error);
      let errorMessage = "Failed to load profile";
      if (error.response?.status === 401) {
        errorMessage = "Session expired. Please login again.";
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
      } else if (error.code === "ECONNREFUSED") {
        errorMessage =
          "Cannot connect to server. Please check if backend is running.";
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
      if (response.data.success) {
        setBookings(response.data.data.bookings);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
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
      if (response.data.success) {
        setUserVehicles(response.data.data.vehicles);
      }
    } catch (error) {
      console.error("Error fetching user vehicles:", error);
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
      if (response.data.success) {
        setEarnings(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching earnings:", error);
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
      if (response.data.success) {
        setNotifications(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const markNotificationAsRead = async (notificationId) => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/notifications/${notificationId}/read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n)),
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
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
      console.error("Error deleting notification:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  const handleEditToggle = () => {
    if (editing) {
      if (user) {
        setName(user.name);
        setUsername(user.username || user.email?.split("@")[0] || "");
        setGender(user.gender || "Male");
        if (user.profilePhoto) {
          setPhotoPreview(
            `http://localhost:5000/uploads/profiles/${user.profilePhoto}`,
          );
        } else {
          setPhotoPreview(null);
        }
        setProfilePhoto(null);
      }
    }
    setEditing(!editing);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setProfilePhoto(null);
    setPhotoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
      if (profilePhoto) {
        formData.append("profilePhoto", profilePhoto);
      }
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
        if (response.data.user.profilePhoto) {
          setPhotoPreview(
            `http://localhost:5000/uploads/profiles/${response.data.user.profilePhoto}`,
          );
        }
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Failed to update profile");
      }
      setUploading(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      setUploading(false);
      toast.error(
        error.response?.data?.message ||
          "Failed to update profile. Please try again.",
      );
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
      } else {
        toast.error(response.data.message || "Failed to cancel booking");
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
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

  const openImageViewer = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowImageViewer(true);
  };

  const getVehicleImageUrl = (vehicle, index = 0) => {
    if (vehicle.vehiclePhotos && vehicle.vehiclePhotos[index]) {
      return `http://localhost:5000${vehicle.vehiclePhotos[index].url}`;
    }
    return null;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
      approved: { color: "bg-blue-100 text-blue-800", label: "Approved" },
      rejected: { color: "bg-red-100 text-red-800", label: "Rejected" },
      confirmed: { color: "bg-green-100 text-green-800", label: "Confirmed" },
      active: { color: "bg-purple-100 text-purple-800", label: "Active" },
      completed: { color: "bg-gray-100 text-gray-800", label: "Completed" },
      cancelled: { color: "bg-red-100 text-red-800", label: "Cancelled" },
    };
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.label}
      </span>
    );
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateTime = (date) => {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount) => {
    return `रु ${amount?.toLocaleString("en-NP") || 0}`;
  };

  const sidebarItems = [
    { id: "profile", icon: FaUserCircle, label: "Profile" },
    { id: "bookings", icon: FaCalendarAlt, label: "My Bookings" },
    { id: "listed-vehicles", icon: FaList, label: "My Listed Vehicles" },
    { id: "earnings", icon: FaRupeeSign, label: "My Earnings" },
  ];

  const handleRetry = () => {
    setLoading(true);
    fetchUserProfile();
  };

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
            onClick={handleRetry}
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
      <div
        className={`fixed top-0 left-0 h-full backdrop-blur-xl bg-white/95 shadow-2xl transition-all duration-300 z-20 ${sidebarOpen ? "w-72" : "w-20"}`}
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
              <div className="flex-1">
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
                onClick={() => setActiveTab(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`relative w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-xl transition-all duration-300 group ${isActive ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg" : "text-gray-600 hover:bg-gray-100"} ${!sidebarOpen && "justify-center"}`}
              >
                <Icon
                  className={`text-xl ${isActive ? "text-white" : "text-gray-500"} transition-transform duration-300 group-hover:scale-110`}
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
              </button>
            );
          })}
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${!sidebarOpen && "justify-center"} bg-red-50 hover:bg-red-100 text-red-600 group`}
          >
            <FaSignOutAlt className="text-xl transition-transform duration-300 group-hover:scale-110" />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </div>
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
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  {activeTab === "profile" &&
                    "Manage your personal information"}
                  {activeTab === "bookings" && "View and manage your bookings"}
                  {activeTab === "listed-vehicles" &&
                    "Manage your listed vehicles"}
                  {activeTab === "earnings" &&
                    "Track your earnings from listed vehicles"}
                </p>
              </div>
              <Notification
                notifications={notifications}
                onMarkAsRead={markNotificationAsRead}
                onDelete={deleteNotification}
              />
            </div>
          </div>
        </header>
        <main className="p-8">
          {/* Profile Tab */}
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
                className={`flex items-center gap-2 w-64 py-3 rounded-xl font-medium mb-10 justify-center transition ${editing ? "bg-green-600 hover:bg-green-700 text-white" : "bg-gray-100 hover:bg-gray-200"} ${uploading ? "opacity-70 cursor-not-allowed" : ""}`}
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
                    <FaEnvelope />
                    <span>Email</span>
                  </div>
                  <span className="font-medium">{user?.email}</span>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <FaVenusMars />
                    <span>Gender</span>
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
                  <div className="text-center text-gray-500">
                    <p className="text-sm">
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
            </div>
          )}

          {/* My Bookings Tab */}
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
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {booking.vehicle?.carName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {booking.vehicle?.carNumber}
                          </p>
                        </div>
                        {getStatusBadge(booking.status)}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <FaCalendarAlt />
                          <span className="text-sm">
                            {formatDate(booking.pickupDate)} -{" "}
                            {formatDate(booking.returnDate)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <FaClock />
                          <span className="text-sm">
                            {booking.totalDays} day
                            {booking.totalDays > 1 ? "s" : ""}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <FaMapMarkerAlt />
                          <span className="text-sm">
                            {booking.pickupLocation}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <FaRupeeSign />
                          <span className="text-sm font-semibold text-blue-600">
                            {formatCurrency(booking.totalAmount)}
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
                        {booking.status === "pending" && (
                          <button
                            onClick={() => openCancelModal(booking)}
                            className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1"
                          >
                            <FaTrash size={12} /> Cancel Booking
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* My Listed Vehicles Tab */}
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
                        <div
                          className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer"
                          onClick={() => {
                            const firstImage = getVehicleImageUrl(vehicle, 0);
                            if (firstImage) openImageViewer(firstImage);
                          }}
                        >
                          {vehicle.vehiclePhotos && vehicle.vehiclePhotos[0] ? (
                            <img
                              src={getVehicleImageUrl(vehicle, 0)}
                              alt={vehicle.carName}
                              className="w-full h-full object-cover"
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
                                {vehicle.carName}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {vehicle.carNumber}
                              </p>
                            </div>
                            {getStatusBadge(vehicle.status)}
                          </div>
                          <div className="grid grid-cols-2 gap-2 mb-3">
                            <div className="text-sm text-gray-600">
                              <span className="font-medium">Rate:</span> रु{" "}
                              {vehicle.ratePerDay}/day
                            </div>
                            <div className="text-sm text-gray-600">
                              <span className="font-medium">Type:</span>{" "}
                              {vehicle.carType}
                            </div>
                            <div className="text-sm text-gray-600">
                              <span className="font-medium">Seats:</span>{" "}
                              {vehicle.seats}
                            </div>
                            <div className="text-sm text-gray-600">
                              <span className="font-medium">Transmission:</span>{" "}
                              {vehicle.gearType}
                            </div>
                          </div>
                          {vehicle.rejectionReason && (
                            <div className="mt-2 p-2 bg-red-50 rounded-lg text-xs text-red-600">
                              <span className="font-medium">
                                Rejection Reason:
                              </span>{" "}
                              {vehicle.rejectionReason}
                            </div>
                          )}
                          <div className="flex justify-end gap-3 mt-3">
                            <button
                              onClick={() =>
                                navigate(`/vehicle-details/${vehicle._id}`)
                              }
                              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
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
                                  className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1"
                                >
                                  <FaEdit size={12} /> Edit
                                </button>
                                <button
                                  onClick={() => {
                                    if (
                                      window.confirm(
                                        "Are you sure you want to delete this listing?",
                                      )
                                    ) {
                                      /* Handle delete */
                                    }
                                  }}
                                  className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1"
                                >
                                  <FaTrash size={12} /> Delete
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

          {/* My Earnings Tab */}
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
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg p-6 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-100 text-sm">
                            Total Earnings
                          </p>
                          <p className="text-3xl font-bold mt-1">
                            {formatCurrency(earnings.totalEarnings)}
                          </p>
                          <p className="text-green-100 text-xs mt-2">
                            70% of total bookings
                          </p>
                        </div>
                        <div className="p-3 bg-white/20 rounded-xl">
                          <FaWallet className="text-2xl" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl shadow-lg p-6 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100 text-sm">
                            Total Bookings
                          </p>
                          <p className="text-3xl font-bold mt-1">
                            {earnings.totalBookings}
                          </p>
                          <p className="text-blue-100 text-xs mt-2">
                            Completed bookings
                          </p>
                        </div>
                        <div className="p-3 bg-white/20 rounded-xl">
                          <FaCalendarAlt className="text-2xl" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl shadow-lg p-6 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-100 text-sm">
                            Gross Revenue
                          </p>
                          <p className="text-3xl font-bold mt-1">
                            {formatCurrency(earnings.grossRevenue)}
                          </p>
                          <p className="text-purple-100 text-xs mt-2">
                            Total booking amount
                          </p>
                        </div>
                        <div className="p-3 bg-white/20 rounded-xl">
                          <FaChartLine className="text-2xl" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl shadow-lg p-6 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-orange-100 text-sm">
                            Avg. per Booking
                          </p>
                          <p className="text-3xl font-bold mt-1">
                            {formatCurrency(earnings.averagePerBooking)}
                          </p>
                          <p className="text-orange-100 text-xs mt-2">
                            Your average earning
                          </p>
                        </div>
                        <div className="p-3 bg-white/20 rounded-xl">
                          <FaPercentage className="text-2xl" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <FaInfoCircle className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-blue-800">
                          <strong>Commission Structure:</strong> When a user
                          books your vehicle, RentRide takes 30% commission and
                          you receive 70% of the total booking amount.
                        </p>
                      </div>
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
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Vehicle
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Bookings
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Gross Revenue
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Your Earnings (70%)
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {earnings.vehicles?.map((vehicleEarning, index) => (
                            <tr
                              key={index}
                              className="hover:bg-gray-50 transition"
                            >
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  {vehicleEarning.vehicle
                                    ?.vehiclePhotos?.[0] && (
                                    <img
                                      src={`http://localhost:5000${vehicleEarning.vehicle.vehiclePhotos[0].url}`}
                                      alt={vehicleEarning.vehicle?.carName}
                                      className="w-10 h-10 object-cover rounded-lg"
                                    />
                                  )}
                                  <div>
                                    <p className="font-medium text-gray-900">
                                      {vehicleEarning.vehicle?.carName}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {vehicleEarning.vehicle?.carNumber}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className="font-semibold text-gray-700">
                                  {vehicleEarning.totalBookings}
                                </span>
                              </td>
                              <td className="px-6 py-4 font-medium text-gray-700">
                                {formatCurrency(vehicleEarning.grossRevenue)}
                              </td>
                              <td className="px-6 py-4">
                                <span className="font-bold text-green-600">
                                  {formatCurrency(vehicleEarning.ownerEarnings)}
                                </span>
                                <p className="text-xs text-gray-400">
                                  70% of{" "}
                                  {formatCurrency(vehicleEarning.grossRevenue)}
                                </p>
                              </td>
                              <td className="px-6 py-4">
                                <button
                                  onClick={() => {
                                    setSelectedEarningVehicle(vehicleEarning);
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
        </main>
      </div>

      {/* Booking Details Modal */}
      {showBookingModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <FaInfoCircle className="text-blue-600 text-2xl" />
                  <h3 className="text-xl font-bold text-gray-800">
                    Booking Details
                  </h3>
                </div>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes size={24} />
                </button>
              </div>
            </div>
            <div className="p-6">
              <p className="text-center text-gray-500">
                Booking details would appear here
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Booking Confirmation Modal */}
      {showCancelConfirm && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[70]">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <FaTimesCircle className="text-red-600 text-2xl" />
                <h3 className="text-xl font-bold text-gray-800">
                  Cancel Booking
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Are you sure you want to cancel your booking for{" "}
                <strong>{selectedBooking.vehicle?.carName}</strong>?
              </p>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Cancellation *
                </label>
                <textarea
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none"
                  placeholder="Please provide a reason for cancelling this booking..."
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowCancelConfirm(false);
                    setCancelReason("");
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Close
                </button>
                <button
                  onClick={handleCancelBooking}
                  disabled={cancellingBooking}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium disabled:opacity-50 flex items-center gap-2"
                >
                  {cancellingBooking ? (
                    <>
                      <FaSpinner className="animate-spin" /> Cancelling...
                    </>
                  ) : (
                    "Yes, Cancel Booking"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Earning Details Modal */}
      {showEarningDetailsModal && selectedEarningVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <FaRupeeSign className="text-green-600 text-2xl" />
                  <h3 className="text-xl font-bold text-gray-800">
                    Earnings Details - {selectedEarningVehicle.vehicle?.carName}
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
              <p className="text-center text-gray-500">
                Earning details would appear here
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Image Viewer Modal */}
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
