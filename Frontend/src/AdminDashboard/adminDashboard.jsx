// // };

// // export default AdminDashboard;
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   FaCar,
//   FaCheckCircle,
//   FaClock,
//   FaCogs,
//   FaEnvelope,
//   FaUsers,
//   FaSpinner,
//   FaTimes,
// } from "react-icons/fa";

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const [vehicles, setVehicles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);
//   const [stats, setStats] = useState({
//     totalVehicles: 0,
//     availableVehicles: 0,
//     bookedVehicles: 0,
//     maintenanceVehicles: 0,
//   });

//   // Email newsletter states
//   const [showEmailModal, setShowEmailModal] = useState(false);
//   const [emailSubject, setEmailSubject] = useState("");
//   const [emailMessage, setEmailMessage] = useState("");
//   const [subscriberCount, setSubscriberCount] = useState(0);
//   const [sendingEmail, setSendingEmail] = useState(false);
//   const [emailResult, setEmailResult] = useState(null);
//   const [subscribers, setSubscribers] = useState([]);
//   const [showSubscribers, setShowSubscribers] = useState(false);

//   useEffect(() => {
//     const token =
//       localStorage.getItem("token") || sessionStorage.getItem("token");
//     const userData = JSON.parse(
//       localStorage.getItem("user") || sessionStorage.getItem("user") || "null",
//     );

//     if (!token || !userData || userData.role !== "admin") {
//       alert("Access denied. Admin privileges required.");
//       navigate("/rentridehome");
//       return;
//     }

//     setUser(userData);
//     fetchVehicles();
//     fetchSubscriberCount();
//   }, []);

//   const fetchVehicles = async () => {
//     try {
//       const token =
//         localStorage.getItem("token") || sessionStorage.getItem("token");
//       const response = await axios.get("http://localhost:5000/api/vehicles", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setVehicles(response.data);
//       calculateStats(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching vehicles:", error);
//       setLoading(false);
//     }
//   };

//   const fetchSubscriberCount = async () => {
//     try {
//       const token =
//         localStorage.getItem("token") || sessionStorage.getItem("token");
//       const response = await axios.get(
//         "http://localhost:5000/api/admin/emails/subscriber-count",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       );
//       if (response.data.success) {
//         setSubscriberCount(response.data.count);
//         setSubscribers(response.data.recentSubscribers || []);
//       }
//     } catch (error) {
//       console.error("Error fetching subscribers:", error);
//     }
//   };

//   const calculateStats = (vehiclesData) => {
//     const statsData = {
//       totalVehicles: vehiclesData.length,
//       availableVehicles: vehiclesData.filter((v) => v.status === "Available")
//         .length,
//       bookedVehicles: vehiclesData.filter((v) => v.status === "Booked").length,
//       maintenanceVehicles: vehiclesData.filter(
//         (v) => v.status === "Maintenance",
//       ).length,
//     };
//     setStats(statsData);
//   };

//   const handleSendNewsletter = async (e) => {
//     e.preventDefault();
//     if (!emailSubject || !emailMessage) {
//       alert("Please fill in both subject and message");
//       return;
//     }

//     setSendingEmail(true);
//     setEmailResult(null);

//     try {
//       const token =
//         localStorage.getItem("token") || sessionStorage.getItem("token");
//       const response = await axios.post(
//         "http://localhost:5000/api/admin/emails/send-bulk",
//         { subject: emailSubject, message: emailMessage },
//         { headers: { Authorization: `Bearer ${token}` } },
//       );

//       if (response.data.success) {
//         setEmailResult({
//           success: true,
//           message: `✅ Email sent to ${response.data.successCount} subscribers! (${response.data.failCount || 0} failed)`,
//         });
//         setEmailSubject("");
//         setEmailMessage("");
//         setTimeout(() => setShowEmailModal(false), 2000);
//       } else {
//         setEmailResult({ success: false, message: "❌ Failed to send emails" });
//       }
//     } catch (error) {
//       setEmailResult({
//         success: false,
//         message: "❌ Error sending emails. Please try again.",
//       });
//     } finally {
//       setSendingEmail(false);
//       setTimeout(() => setEmailResult(null), 5000);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-96">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-8">
//       {/* Page Header */}
//       <div className="mb-8">
//         <div className="flex justify-between items-center flex-wrap gap-4">
//           <div>
//             <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
//               Dashboard Overview
//             </h1>
//             <p className="text-gray-500 mt-2">
//               Welcome back, {user?.name}! Here's what's happening with your
//               fleet today.
//             </p>
//           </div>
//           <div className="flex gap-3">
//             <button
//               onClick={() => setShowEmailModal(true)}
//               className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2.5 px-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
//             >
//               <FaEnvelope className="text-white" />
//               Send Newsletter
//             </button>
//             <button
//               onClick={() => navigate("/admin/inventory")}
//               className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2.5 px-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
//             >
//               <FaCar className="text-white" />
//               Manage Vehicles
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Statistics Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
//         <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-500 text-sm font-medium">
//                 Total Vehicles
//               </p>
//               <p className="text-3xl font-bold text-gray-800 mt-1">
//                 {stats.totalVehicles}
//               </p>
//             </div>
//             <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl">
//               <FaCar className="text-white text-2xl" />
//             </div>
//           </div>
//         </div>
//         <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-500 text-sm font-medium">Available</p>
//               <p className="text-3xl font-bold text-green-600 mt-1">
//                 {stats.availableVehicles}
//               </p>
//             </div>
//             <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl">
//               <FaCheckCircle className="text-white text-2xl" />
//             </div>
//           </div>
//         </div>
//         <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500 hover:shadow-xl transition">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-500 text-sm font-medium">Booked</p>
//               <p className="text-3xl font-bold text-yellow-600 mt-1">
//                 {stats.bookedVehicles}
//               </p>
//             </div>
//             <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl">
//               <FaClock className="text-white text-2xl" />
//             </div>
//           </div>
//         </div>
//         <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-500 hover:shadow-xl transition">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-500 text-sm font-medium">Maintenance</p>
//               <p className="text-3xl font-bold text-red-600 mt-1">
//                 {stats.maintenanceVehicles}
//               </p>
//             </div>
//             <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl">
//               <FaCogs className="text-white text-2xl" />
//             </div>
//           </div>
//         </div>
//         <div
//           onClick={() => setShowSubscribers(!showSubscribers)}
//           className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition cursor-pointer"
//         >
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-500 text-sm font-medium">Subscribers</p>
//               <p className="text-3xl font-bold text-purple-600 mt-1">
//                 {subscriberCount}
//               </p>
//             </div>
//             <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
//               <FaUsers className="text-white text-2xl" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Subscribers List (Expandable) */}
//       {showSubscribers && subscribers.length > 0 && (
//         <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
//           <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50 flex justify-between items-center">
//             <div>
//               <h2 className="text-lg font-semibold text-gray-800">
//                 Recent Subscribers
//               </h2>
//               <p className="text-sm text-gray-500 mt-1">
//                 Total {subscriberCount} active subscribers
//               </p>
//             </div>
//             <button
//               onClick={() => setShowSubscribers(false)}
//               className="p-2 hover:bg-gray-200 rounded-lg"
//             >
//               <FaTimes />
//             </button>
//           </div>
//           <div className="overflow-x-auto max-h-64 overflow-y-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50 sticky top-0">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     Email
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     Subscribed On
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     Source
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {subscribers.map((sub, idx) => (
//                   <tr key={idx} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 text-gray-900">{sub.email}</td>
//                     <td className="px-6 py-4 text-gray-500">
//                       {new Date(sub.subscribedAt).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
//                         {sub.source || "newsletter"}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* Recent Vehicles Table */}
//       <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//         <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
//           <h2 className="text-lg font-semibold text-gray-800">
//             Recent Vehicles Added
//           </h2>
//           <p className="text-sm text-gray-500 mt-1">
//             Latest additions to your fleet
//           </p>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Vehicle
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Type
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Rate/Day
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Status
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {vehicles.slice(0, 5).map((vehicle) => (
//                 <tr
//                   key={vehicle._id}
//                   className="hover:bg-gray-50 transition-colors"
//                 >
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-3">
//                       {vehicle.photos && vehicle.photos[0] && (
//                         <img
//                           src={`http://localhost:5000/uploads/vehicles/${vehicle.photos[0].filename}`}
//                           alt={vehicle.carName}
//                           className="w-12 h-12 object-cover rounded-lg"
//                         />
//                       )}
//                       <div>
//                         <p className="font-medium text-gray-900">
//                           {vehicle.carName}
//                         </p>
//                         <p className="text-sm text-gray-500">
//                           {vehicle.carNumber}
//                         </p>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
//                       {vehicle.carType}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className="font-semibold">
//                       रु {vehicle.ratePerDay}
//                     </span>
//                     <span className="text-xs text-gray-500">/day</span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-medium ${
//                         vehicle.status === "Available"
//                           ? "bg-green-100 text-green-800"
//                           : vehicle.status === "Booked"
//                             ? "bg-yellow-100 text-yellow-800"
//                             : "bg-red-100 text-red-800"
//                       }`}
//                     >
//                       {vehicle.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Email Newsletter Modal */}
//       {showEmailModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
//                   <FaEnvelope className="text-white text-xl" />
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-bold text-gray-900">
//                     Send Newsletter
//                   </h2>
//                   <p className="text-sm text-gray-500">
//                     Send email to {subscriberCount} subscribers
//                   </p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => setShowEmailModal(false)}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition"
//               >
//                 <FaTimes className="text-gray-500" />
//               </button>
//             </div>

//             <form onSubmit={handleSendNewsletter} className="p-6 space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Subject
//                 </label>
//                 <input
//                   type="text"
//                   value={emailSubject}
//                   onChange={(e) => setEmailSubject(e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                   placeholder="Enter email subject..."
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Message
//                 </label>
//                 <textarea
//                   value={emailMessage}
//                   onChange={(e) => setEmailMessage(e.target.value)}
//                   rows={8}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                   placeholder="Write your message here...&#10;&#10;You can use HTML tags for formatting:&#10;&lt;strong&gt;bold&lt;/strong&gt;, &lt;em&gt;italic&lt;/em&gt;, &lt;br&gt; for line breaks"
//                 />
//               </div>

//               <div className="bg-purple-50 p-4 rounded-lg">
//                 <div className="flex items-center gap-2 text-purple-800">
//                   <FaUsers />
//                   <span className="font-medium">
//                     {subscriberCount} active subscribers
//                   </span>
//                 </div>
//                 <p className="text-sm text-purple-600 mt-1">
//                   This email will be sent to all subscribed users who opted in
//                   to receive newsletters.
//                 </p>
//               </div>

//               {emailResult && (
//                 <div
//                   className={`p-4 rounded-lg ${emailResult.success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}
//                 >
//                   {emailResult.message}
//                 </div>
//               )}

//               <div className="flex gap-3">
//                 <button
//                   type="button"
//                   onClick={() => setShowEmailModal(false)}
//                   className="flex-1 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={sendingEmail}
//                   className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
//                 >
//                   {sendingEmail ? (
//                     <span className="flex items-center justify-center gap-2">
//                       <FaSpinner className="animate-spin" /> Sending...
//                     </span>
//                   ) : (
//                     `Send to ${subscriberCount} Subscribers`
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  FaComments,
  FaCommentDots,
  FaSearch,
  FaTimes,
  FaSync,
  FaPaperPlane,
  FaSmile,
  FaSpinner,
  FaBan,
  FaUnlock,
  FaCheck,
  FaCheckDouble,
  FaLock,
  FaArrowLeft,
  FaCar,
  FaShieldAlt,
  FaInbox,
} from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSocket } from "../../context/SocketContext"; // same context as user-side

// ─── Token helper ─────────────────────────────────────────────────────────────
const getToken = () =>
  localStorage.getItem("token") || sessionStorage.getItem("token");
const authHeader = () => ({ Authorization: `Bearer ${getToken()}` });

// ─── API service ──────────────────────────────────────────────────────────────
const adminChatService = {
  getAllChats: async (filter = "all") => {
    const res = await axios.get(
      `http://localhost:5000/api/admin/chats?filter=${filter}`,
      { headers: authHeader() },
    );
    return res.data;
  },
  getChat: async (chatId) => {
    const res = await axios.get(
      `http://localhost:5000/api/admin/chats/${chatId}`,
      { headers: authHeader() },
    );
    return res.data;
  },
  sendMessage: async (chatId, message) => {
    const res = await axios.post(
      `http://localhost:5000/api/admin/chats/${chatId}/message`,
      { message },
      { headers: authHeader() },
    );
    return res.data;
  },
  markAsRead: async (chatId) => {
    const res = await axios.put(
      `http://localhost:5000/api/admin/chats/${chatId}/read`,
      {},
      { headers: authHeader() },
    );
    return res.data;
  },
  blockUser: async (chatId) => {
    const res = await axios.put(
      `http://localhost:5000/api/chats/${chatId}/block`,
      {},
      { headers: authHeader() },
    );
    return res.data;
  },
  unblockUser: async (chatId) => {
    const res = await axios.put(
      `http://localhost:5000/api/chats/${chatId}/unblock`,
      {},
      { headers: authHeader() },
    );
    return res.data;
  },
};

// ─── Time helpers ─────────────────────────────────────────────────────────────
const formatChatTime = (date) => {
  if (!date) return "";
  const now = new Date();
  const d = new Date(date);
  const diffMs = now - d;
  const mins = Math.floor(diffMs / 60000);
  const hours = Math.floor(diffMs / 3600000);
  const days = Math.floor(diffMs / 86400000);
  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m`;
  if (hours < 24) return `${hours}h`;
  if (days === 1) return "Yesterday";
  return d.toLocaleDateString();
};
const formatMsgTime = (date) =>
  new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

// ─── Avatar ───────────────────────────────────────────────────────────────────
const Avatar = ({ user, size = "md", className = "" }) => {
  const s =
    size === "sm"
      ? "w-7 h-7 text-[10px]"
      : size === "lg"
        ? "w-12 h-12 text-base"
        : "w-9 h-9 text-sm";
  if (user?.profilePhoto) {
    return (
      <img
        src={`http://localhost:5000/uploads/profiles/${user.profilePhoto}`}
        alt={user.name}
        className={`${s} rounded-full object-cover flex-shrink-0 ${className}`}
      />
    );
  }
  return (
    <div
      className={`${s} rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0 ${className}`}
    >
      {user?.name?.charAt(0)?.toUpperCase() || "?"}
    </div>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────
const AdminMessages = () => {
  // Read admin user from storage — same pattern used in AdminDashboard
  const adminUser = JSON.parse(
    localStorage.getItem("user") || sessionStorage.getItem("user") || "null",
  );
  const adminId = adminUser?._id || adminUser?.id;

  // Reuse the SocketContext already wrapping the whole app in App.jsx
  const { onNewMessage, sendMessage: socketSend, isConnected } = useSocket();

  const [chats, setChats] = useState([]);
  const [filteredChats, setFilteredChats] = useState([]);
  const [chatsLoading, setChatsLoading] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [showChatWindow, setShowChatWindow] = useState(false);
  const [showBlockConfirm, setShowBlockConfirm] = useState(false);
  const [showUnblockConfirm, setShowUnblockConfirm] = useState(false);
  const [blockingUser, setBlockingUser] = useState(false);
  const [totalUnread, setTotalUnread] = useState(0);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  // Stable ref so socket handler always sees the current selectedChat
  const selectedChatRef = useRef(null);
  useEffect(() => {
    selectedChatRef.current = selectedChat;
  }, [selectedChat]);

  // ── Fetch chats ─────────────────────────────────────────────────────────────
  const fetchChats = useCallback(async () => {
    try {
      setChatsLoading(true);
      const res = await adminChatService.getAllChats(activeFilter);
      if (res.success) {
        setChats(res.data);
        const unread = res.data.reduce(
          (acc, c) => acc + (c.unreadCounts?.[adminId] || 0),
          0,
        );
        setTotalUnread(unread);
      }
    } catch {
      toast.error("Failed to load chats");
    } finally {
      setChatsLoading(false);
    }
  }, [activeFilter, adminId]);

  useEffect(() => {
    fetchChats();
    const interval = setInterval(fetchChats, 30000);
    return () => clearInterval(interval);
  }, [fetchChats]);

  // ── Socket — uses onNewMessage from SocketContext (same as ProfileDetails) ──
  useEffect(() => {
    const unsubscribe = onNewMessage((data) => {
      fetchChats();
      const current = selectedChatRef.current;
      if (current && data.chatId === current._id) {
        setMessages((prev) => {
          if (prev.some((m) => m._id === data.message._id)) return prev;
          return [...prev, data.message];
        });
        adminChatService.markAsRead(current._id).catch(() => {});
        setTimeout(
          () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
          100,
        );
      }
    });
    return unsubscribe;
  }, [onNewMessage, fetchChats]);

  // Auto-scroll
  useEffect(() => {
    if (messagesEndRef.current)
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ── Search filter ───────────────────────────────────────────────────────────
  useEffect(() => {
    const q = searchQuery.toLowerCase();
    setFilteredChats(
      chats.filter((c) => {
        if (!q) return true;
        const u = getChatUser(c);
        return (
          (u?.name || "").toLowerCase().includes(q) ||
          (c.lastMessage || "").toLowerCase().includes(q) ||
          (c.vehicleName || "").toLowerCase().includes(q) ||
          (u?.email || "").toLowerCase().includes(q)
        );
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chats, searchQuery]);

  // ── Utilities ───────────────────────────────────────────────────────────────
  const getChatUser = (chat) => {
    if (!chat?.participants) return null;
    return (
      chat.participants.find((p) => p._id !== adminId && p.role !== "admin") ||
      chat.participants[0]
    );
  };
  const getUnread = (chat) => chat.unreadCounts?.[adminId] || 0;
  const iBlockedThem =
    selectedChat?.isBlocked && selectedChat?.blockedBy === adminId;

  // ── Open / close chat ───────────────────────────────────────────────────────
  const openChat = async (chat) => {
    setSelectedChat(chat);
    setShowChatWindow(true);
    setMessages([]);
    if (!chat.isBlocked) {
      try {
        setMessagesLoading(true);
        const res = await adminChatService.getChat(chat._id);
        if (res.success) {
          setMessages(res.data.messages || []);
          await adminChatService.markAsRead(chat._id);
          setChats((prev) =>
            prev.map((c) =>
              c._id !== chat._id
                ? c
                : {
                    ...c,
                    unreadCounts: { ...c.unreadCounts, [adminId]: 0 },
                  },
            ),
          );
        }
      } catch {
        toast.error("Failed to load messages");
      } finally {
        setMessagesLoading(false);
      }
    }
    setTimeout(() => inputRef.current?.focus(), 200);
  };

  const closeChat = () => {
    setShowChatWindow(false);
    setSelectedChat(null);
    setMessages([]);
    setNewMessage("");
  };

  // ── Send message ────────────────────────────────────────────────────────────
  const sendMessage = async () => {
    if (!newMessage.trim() || sending || selectedChat?.isBlocked) return;
    const text = newMessage.trim();
    setSending(true);
    const tempMsg = {
      _id: `temp-${Date.now()}`,
      message: text,
      senderType: "admin",
      read: false,
      createdAt: new Date(),
      sender: adminUser,
    };
    setMessages((prev) => [...prev, tempMsg]);
    setNewMessage("");
    setTimeout(
      () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
      100,
    );
    try {
      const res = await adminChatService.sendMessage(selectedChat._id, text);
      if (res.success) {
        setMessages((prev) =>
          prev.map((m) => (m._id === tempMsg._id ? res.data : m)),
        );
        if (socketSend && isConnected) socketSend(selectedChat._id, text);
        fetchChats();
      }
    } catch {
      toast.error("Failed to send message");
      setMessages((prev) => prev.filter((m) => m._id !== tempMsg._id));
    } finally {
      setSending(false);
    }
  };

  // ── Block / unblock ─────────────────────────────────────────────────────────
  const handleBlock = async () => {
    setBlockingUser(true);
    try {
      const res = await adminChatService.blockUser(selectedChat._id);
      if (res.success) {
        toast.success(`${getChatUser(selectedChat)?.name} has been blocked`);
        await fetchChats();
        setSelectedChat((p) => ({
          ...p,
          isBlocked: true,
          blockedBy: adminId,
        }));
        setMessages([]);
      }
    } catch {
      toast.error("Failed to block user");
    } finally {
      setBlockingUser(false);
      setShowBlockConfirm(false);
    }
  };

  const handleUnblock = async () => {
    setBlockingUser(true);
    try {
      const res = await adminChatService.unblockUser(selectedChat._id);
      if (res.success) {
        toast.success(`${getChatUser(selectedChat)?.name} has been unblocked`);
        await fetchChats();
        setSelectedChat((p) => ({ ...p, isBlocked: false, blockedBy: null }));
        const msgRes = await adminChatService.getChat(selectedChat._id);
        if (msgRes.success) setMessages(msgRes.data.messages || []);
      }
    } catch {
      toast.error("Failed to unblock user");
    } finally {
      setBlockingUser(false);
      setShowUnblockConfirm(false);
    }
  };

  // ── Filter tab counts ───────────────────────────────────────────────────────
  const filterTabs = [
    { id: "all", label: "All", count: chats.length },
    {
      id: "vehicle",
      label: "Vehicle Chats",
      count: chats.filter((c) => c.chatType === "vehicle").length,
    },
    {
      id: "support",
      label: "Support",
      count: chats.filter((c) => c.chatType === "support").length,
    },
    {
      id: "unread",
      label: "Unread",
      count: chats.filter((c) => getUnread(c) > 0).length,
    },
  ];

  // ── Group messages by date ──────────────────────────────────────────────────
  const groupedMessages = (() => {
    const groups = [];
    let lastDate = null;
    messages.forEach((msg, i) => {
      const day = new Date(msg.createdAt).toDateString();
      if (day !== lastDate) {
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        groups.push({
          type: "date",
          label:
            day === today ? "Today" : day === yesterday ? "Yesterday" : day,
          key: `date-${i}`,
        });
        lastDate = day;
      }
      groups.push({ type: "msg", msg, key: msg._id || i });
    });
    return groups;
  })();

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Full-height container that sits inside AdminLayout's <Outlet /> */}
      <div
        className="flex flex-col bg-gradient-to-br from-gray-50 to-gray-100"
        style={{ height: "100vh" }}
      >
        {/* Header — matches other admin pages */}
        <div className="px-8 py-5 bg-white/80 backdrop-blur-md shadow-sm flex-shrink-0">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent flex items-center gap-2">
                <FaComments className="text-blue-600" />
                Messages
                {totalUnread > 0 && (
                  <span className="ml-1 px-2 py-0.5 bg-blue-600 text-white text-xs font-bold rounded-full">
                    {totalUnread > 99 ? "99+" : totalUnread}
                  </span>
                )}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage all user conversations and vehicle inquiries
              </p>
            </div>
            <button
              onClick={fetchChats}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition shadow-sm"
            >
              <FaSync
                className={
                  chatsLoading ? "animate-spin text-blue-500" : "text-gray-400"
                }
                size={13}
              />
              Refresh
            </button>
          </div>
        </div>

        {/* Chat panel */}
        <div className="flex flex-1 min-h-0 m-6 rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-white">
          {/* ════ LEFT: Chat list ════ */}
          <div
            className={`${
              showChatWindow ? "hidden lg:flex" : "flex"
            } flex-col w-full lg:w-[340px] border-r border-gray-100 flex-shrink-0`}
          >
            {/* Search + filter */}
            <div className="p-4 border-b border-gray-100 space-y-3">
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
                <FaSearch size={12} className="text-gray-400 flex-shrink-0" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search conversations, users…"
                  className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes size={11} />
                  </button>
                )}
              </div>
              <div className="flex gap-1 overflow-x-auto">
                {filterTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveFilter(tab.id)}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
                      activeFilter === tab.id
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    {tab.label}
                    {tab.count > 0 && (
                      <span
                        className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                          activeFilter === tab.id
                            ? "bg-white/20 text-white"
                            : "bg-gray-300 text-gray-600"
                        }`}
                      >
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat items */}
            <div className="flex-1 overflow-y-auto">
              {chatsLoading && chats.length === 0 ? (
                <div className="flex items-center justify-center h-32">
                  <FaSpinner className="animate-spin text-blue-400 text-xl" />
                </div>
              ) : filteredChats.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center px-6">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-3">
                    <FaInbox className="text-blue-300 text-2xl" />
                  </div>
                  <p className="text-sm font-semibold text-gray-600">
                    {searchQuery ? "No results found" : "No conversations yet"}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {searchQuery
                      ? "Try a different search term"
                      : "User conversations will appear here"}
                  </p>
                </div>
              ) : (
                filteredChats.map((chat) => {
                  const chatUser = getChatUser(chat);
                  const unread = getUnread(chat);
                  const isSelected =
                    selectedChat?._id === chat._id && showChatWindow;
                  const isBlocked = chat.isBlocked;
                  const isVehicle = chat.chatType === "vehicle";
                  return (
                    <div
                      key={chat._id}
                      onClick={() => openChat(chat)}
                      className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer transition-all border-b border-gray-50 ${
                        isSelected
                          ? "bg-blue-50 border-l-[3px] border-l-blue-500"
                          : "hover:bg-gray-50 border-l-[3px] border-l-transparent"
                      } ${isBlocked ? "opacity-60" : ""}`}
                    >
                      <div className="relative flex-shrink-0">
                        <Avatar user={chatUser} size="md" />
                        {isBlocked && (
                          <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center shadow-sm">
                            <FaBan size={7} />
                          </span>
                        )}
                        {unread > 0 && !isBlocked && (
                          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-blue-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                            {unread > 9 ? "9+" : unread}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-1 mb-0.5">
                          <span
                            className={`text-sm font-semibold truncate ${
                              unread > 0 ? "text-gray-900" : "text-gray-700"
                            }`}
                          >
                            {chatUser?.name || "Unknown User"}
                          </span>
                          <span className="text-[10px] text-gray-400 flex-shrink-0">
                            {formatChatTime(
                              chat.lastMessageAt || chat.updatedAt,
                            )}
                          </span>
                        </div>
                        <p
                          className={`text-xs truncate ${
                            unread > 0 && !isBlocked
                              ? "text-gray-700 font-medium"
                              : "text-gray-400"
                          }`}
                        >
                          {isBlocked
                            ? "Conversation blocked"
                            : chat.lastMessage || "No messages yet"}
                        </p>
                        <div className="flex items-center gap-1.5 mt-1">
                          {isVehicle ? (
                            <span className="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded-full font-semibold bg-blue-50 text-blue-600 uppercase tracking-wide">
                              <FaCar size={7} /> Vehicle
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded-full font-semibold bg-purple-50 text-purple-600 uppercase tracking-wide">
                              <FaShieldAlt size={7} /> Support
                            </span>
                          )}
                          {chat.vehicleName && (
                            <span className="text-[10px] text-gray-400 truncate">
                              · {chat.vehicleName}
                            </span>
                          )}
                          {isBlocked && (
                            <span className="text-[9px] text-red-500 font-bold uppercase">
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

            {/* Stats bar */}
            <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
              <span className="text-xs text-gray-500">
                {chats.length} conversation{chats.length !== 1 ? "s" : ""}
              </span>
              {totalUnread > 0 && (
                <span className="text-xs font-semibold text-blue-600">
                  {totalUnread} unread
                </span>
              )}
            </div>
          </div>

          {/* ════ RIGHT: Chat window ════ */}
          {showChatWindow && selectedChat ? (
            <div className="flex-1 flex flex-col min-w-0">
              {/* Header */}
              <div className="px-5 py-3.5 bg-white border-b border-gray-100 flex items-center justify-between flex-shrink-0 shadow-sm">
                <div className="flex items-center gap-3">
                  <button
                    onClick={closeChat}
                    className="lg:hidden w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition"
                  >
                    <FaArrowLeft size={14} />
                  </button>
                  {(() => {
                    const chatUser = getChatUser(selectedChat);
                    return (
                      <>
                        <Avatar user={chatUser} size="md" />
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-bold text-gray-900">
                              {chatUser?.name || "Unknown User"}
                            </p>
                            {selectedChat.isBlocked && (
                              <span className="inline-flex items-center gap-1 text-[10px] bg-red-50 text-red-500 border border-red-200 px-1.5 py-0.5 rounded-full font-semibold">
                                <FaBan size={8} /> Blocked
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <p className="text-xs text-gray-400">
                              {chatUser?.email}
                            </p>
                            {selectedChat.vehicleName && (
                              <>
                                <span className="text-gray-300">·</span>
                                <span className="text-xs text-blue-500 flex items-center gap-1">
                                  <FaCar size={9} /> {selectedChat.vehicleName}
                                </span>
                              </>
                            )}
                          </div>
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
              {selectedChat.vehicleId && (
                <div className="px-5 py-2.5 bg-blue-50 border-b border-blue-100 flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <FaCar size={12} className="text-blue-600" />
                  </div>
                  <span className="text-xs font-semibold text-blue-800">
                    {selectedChat.vehicleName || "Vehicle Inquiry"}
                  </span>
                  {selectedChat.vehicleNumber && (
                    <span className="ml-1 text-xs text-blue-500">
                      · {selectedChat.vehicleNumber}
                    </span>
                  )}
                </div>
              )}

              {/* Block banner */}
              {selectedChat.isBlocked && (
                <div
                  className={`flex items-center justify-between px-5 py-3 border-b ${
                    iBlockedThem
                      ? "bg-red-50 border-red-100"
                      : "bg-amber-50 border-amber-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        iBlockedThem ? "bg-red-100" : "bg-amber-100"
                      }`}
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
                        className={`text-xs font-bold ${
                          iBlockedThem ? "text-red-700" : "text-amber-700"
                        }`}
                      >
                        {iBlockedThem
                          ? `You blocked ${getChatUser(selectedChat)?.name}`
                          : "This user has restricted messaging"}
                      </p>
                      <p
                        className={`text-[11px] mt-0.5 ${
                          iBlockedThem ? "text-red-500" : "text-amber-500"
                        }`}
                      >
                        {iBlockedThem
                          ? "They cannot message you. Unblock to restore the conversation."
                          : "You cannot send messages in this conversation."}
                      </p>
                    </div>
                  </div>
                  {iBlockedThem && (
                    <button
                      onClick={() => setShowUnblockConfirm(true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition ml-3 whitespace-nowrap"
                    >
                      <FaUnlock size={10} /> Unblock
                    </button>
                  )}
                </div>
              )}

              {/* Messages area */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1 bg-gray-50">
                {messagesLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <FaSpinner className="animate-spin text-blue-400 text-2xl" />
                  </div>
                ) : selectedChat.isBlocked && messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center px-8">
                    <div
                      className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${
                        iBlockedThem ? "bg-red-50" : "bg-amber-50"
                      }`}
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
                        ? `You have blocked ${getChatUser(selectedChat)?.name}. Unblock to restore the conversation.`
                        : "This user has restricted messaging."}
                    </p>
                    {iBlockedThem && (
                      <button
                        onClick={() => setShowUnblockConfirm(true)}
                        className="mt-5 flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition"
                      >
                        <FaUnlock size={12} /> Unblock{" "}
                        {getChatUser(selectedChat)?.name}
                      </button>
                    )}
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-3">
                      <FaCommentDots className="text-blue-300 text-2xl" />
                    </div>
                    <p className="text-sm font-semibold text-gray-500">
                      No messages yet
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Start the conversation with this user
                    </p>
                  </div>
                ) : (
                  groupedMessages.map((item) => {
                    if (item.type === "date") {
                      return (
                        <div
                          key={item.key}
                          className="flex items-center gap-3 py-2"
                        >
                          <div className="flex-1 h-px bg-gray-200" />
                          <span className="text-[10px] text-gray-400 font-medium px-2.5 py-1 bg-white border border-gray-200 rounded-full whitespace-nowrap shadow-sm">
                            {item.label}
                          </span>
                          <div className="flex-1 h-px bg-gray-200" />
                        </div>
                      );
                    }
                    const { msg } = item;
                    const isOwn =
                      msg.senderType === "admin" || msg.sender?._id === adminId;
                    const chatUser = getChatUser(selectedChat);
                    return (
                      <div
                        key={item.key}
                        className={`flex items-end gap-2 ${
                          isOwn ? "justify-end" : "justify-start"
                        }`}
                      >
                        {!isOwn && (
                          <div className="flex-shrink-0 mb-1">
                            <Avatar user={chatUser} size="sm" />
                          </div>
                        )}
                        <div
                          className={`flex flex-col ${
                            isOwn ? "items-end" : "items-start"
                          } max-w-[65%]`}
                        >
                          <div
                            className={`px-4 py-2.5 text-sm leading-relaxed break-words ${
                              isOwn
                                ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl rounded-br-sm shadow-sm"
                                : "bg-white text-gray-800 rounded-2xl rounded-bl-sm border border-gray-100 shadow-sm"
                            }`}
                          >
                            {msg.message}
                          </div>
                          <div
                            className={`flex items-center gap-1 mt-1 px-1 ${
                              isOwn ? "flex-row-reverse" : ""
                            }`}
                          >
                            <span className="text-[10px] text-gray-400">
                              {formatMsgTime(msg.createdAt)}
                            </span>
                            {isOwn && (
                              <FaCheckDouble
                                size={9}
                                className={
                                  msg.read ? "text-blue-400" : "text-gray-300"
                                }
                              />
                            )}
                          </div>
                        </div>
                        {isOwn && (
                          <div className="flex-shrink-0 mb-1">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-[10px] font-bold">
                              {(adminUser?.name || "A").charAt(0).toUpperCase()}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="px-4 py-3 bg-white border-t border-gray-100 flex-shrink-0">
                {!isConnected && (
                  <p className="text-[11px] text-center text-amber-500 mb-2">
                    Reconnecting to chat server…
                  </p>
                )}
                {selectedChat.isBlocked ? (
                  <div
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 ${
                      iBlockedThem
                        ? "bg-red-50 border border-red-100"
                        : "bg-amber-50 border border-amber-100"
                    }`}
                  >
                    <FaLock
                      size={14}
                      className={
                        iBlockedThem ? "text-red-400" : "text-amber-400"
                      }
                    />
                    <p
                      className={`text-xs flex-1 ${
                        iBlockedThem ? "text-red-500" : "text-amber-600"
                      }`}
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
                      ref={inputRef}
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                      placeholder="Type a reply…"
                      className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!newMessage.trim() || sending}
                      className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-md transition"
                    >
                      {sending ? (
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
            /* Empty state */
            <div className="flex-1 hidden lg:flex flex-col items-center justify-center bg-gray-50 text-center px-8">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center mb-5 shadow-inner">
                <FaComments className="text-blue-300 text-4xl" />
              </div>
              <p className="text-lg font-bold text-gray-600">
                Select a conversation
              </p>
              <p className="text-sm text-gray-400 mt-2 max-w-xs">
                Choose a chat from the left panel to start replying to users
              </p>
              {totalUnread > 0 && (
                <div className="mt-4 px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl">
                  <p className="text-sm font-semibold text-blue-600">
                    {totalUnread} unread message
                    {totalUnread !== 1 ? "s" : ""} waiting
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Block Modal ── */}
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
                <Avatar user={getChatUser(selectedChat)} size="md" />
                <div>
                  <p className="font-semibold text-gray-800 text-sm">
                    {getChatUser(selectedChat)?.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Will be blocked from messaging
                  </p>
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
                  onClick={handleBlock}
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

      {/* ── Unblock Modal ── */}
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
                <Avatar user={getChatUser(selectedChat)} size="md" />
                <div>
                  <p className="font-semibold text-gray-800 text-sm">
                    {getChatUser(selectedChat)?.name}
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
                  onClick={handleUnblock}
                  disabled={blockingUser}
                  className="flex-1 px-4 py-2.5 text-sm bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl font-semibold transition flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {blockingUser ? (
                    <FaSpinner className="animate-spin" size={13} />
                  ) : (
                    <FaUnlock size={12} />
                  )}
                  {blockingUser ? "Unblocking…" : "Unblock User"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminMessages;
