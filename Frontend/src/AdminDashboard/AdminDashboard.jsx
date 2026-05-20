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



import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaCar,
  FaCheckCircle,
  FaClock,
  FaCogs,
  FaEnvelope,
  FaUsers,
  FaSpinner,
  FaTimes,
  FaPaperPlane,
  FaNewspaper,
  FaUserFriends,
  FaLayerGroup,
  FaEye,
  FaCode,
} from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalVehicles: 0,
    availableVehicles: 0,
    bookedVehicles: 0,
    maintenanceVehicles: 0,
  });

  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailResult, setEmailResult] = useState(null);
  const [subscribers, setSubscribers] = useState([]);
  const [showSubscribers, setShowSubscribers] = useState(false);
  const [target, setTarget] = useState("subscribers");
  const [previewMode, setPreviewMode] = useState("write"); // "write" | "preview" | "html"
  const [sendProgress, setSendProgress] = useState(0);
  const progressRef = useRef(null);

  const recipientCount =
    target === "subscribers"
      ? subscriberCount
      : target === "users"
        ? userCount
        : subscriberCount + userCount;

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const userData = JSON.parse(
      localStorage.getItem("user") || sessionStorage.getItem("user") || "null",
    );

    if (!token || !userData || userData.role !== "admin") {
      alert("Access denied. Admin privileges required.");
      navigate("/rentridehome");
      return;
    }

    setUser(userData);
    fetchVehicles();
    fetchSubscriberCount();
  }, []);

  const fetchVehicles = async () => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/vehicles", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVehicles(response.data);
      calculateStats(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      setLoading(false);
    }
  };

  const fetchSubscriberCount = async () => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/admin/emails/subscriber-count",
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (response.data.success) {
        setSubscriberCount(response.data.count);
        setUserCount(response.data.userCount || 0);
        setSubscribers(response.data.recentSubscribers || []);
      }
    } catch (error) {
      console.error("Error fetching subscribers:", error);
    }
  };

  const calculateStats = (vehiclesData) => {
    setStats({
      totalVehicles: vehiclesData.length,
      availableVehicles: vehiclesData.filter((v) => v.status === "Available").length,
      bookedVehicles: vehiclesData.filter((v) => v.status === "Booked").length,
      maintenanceVehicles: vehiclesData.filter((v) => v.status === "Maintenance").length,
    });
  };

  const simulateProgress = () => {
    setSendProgress(0);
    let p = 0;
    progressRef.current = setInterval(() => {
      p += Math.random() * 12;
      if (p >= 90) {
        clearInterval(progressRef.current);
        p = 90;
      }
      setSendProgress(Math.min(p, 90));
    }, 300);
  };

  const handleSendNewsletter = async (e) => {
    e.preventDefault();
    if (!emailSubject || !emailMessage) {
      alert("Please fill in both subject and message");
      return;
    }

    setSendingEmail(true);
    setEmailResult(null);
    simulateProgress();

    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/admin/emails/send-bulk",
        { subject: emailSubject, message: emailMessage, target },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      clearInterval(progressRef.current);
      setSendProgress(100);

      if (response.data.success) {
        setEmailResult({
          success: true,
          message: `Successfully delivered to ${response.data.successCount} recipient${response.data.successCount !== 1 ? "s" : ""}`,
          failed: response.data.failCount || 0,
        });
        setEmailSubject("");
        setEmailMessage("");
        setTarget("subscribers");
        setTimeout(() => {
          setShowEmailModal(false);
          setEmailResult(null);
          setSendProgress(0);
        }, 3000);
      } else {
        setEmailResult({ success: false, message: "Delivery failed. Please try again." });
      }
    } catch (error) {
      clearInterval(progressRef.current);
      setSendProgress(0);
      setEmailResult({ success: false, message: "Network error. Check your connection." });
    } finally {
      setSendingEmail(false);
    }
  };

  const closeModal = () => {
    if (!sendingEmail) {
      setShowEmailModal(false);
      setEmailResult(null);
      setSendProgress(0);
      setPreviewMode("write");
    }
  };

  const renderMessagePreview = () => {
    const lines = emailMessage.split("\n");
    return lines.map((line, i) =>
      line.trim() === "" ? <br key={i} /> : <p key={i} className="mb-2 text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: line }} />
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const targetOptions = [
    {
      id: "subscribers",
      label: "Newsletter subscribers",
      sublabel: "Opted-in only",
      count: subscriberCount,
      icon: <FaNewspaper className="text-purple-500" />,
      color: "purple",
    },
    {
      id: "users",
      label: "Verified users",
      sublabel: "Registered accounts",
      count: userCount,
      icon: <FaUserFriends className="text-blue-500" />,
      color: "blue",
    },
    {
      id: "both",
      label: "Everyone",
      sublabel: "Subscribers + users",
      count: subscriberCount + userCount,
      icon: <FaLayerGroup className="text-emerald-500" />,
      color: "emerald",
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Dashboard Overview
            </h1>
            <p className="text-gray-500 mt-2">
              Welcome back, {user?.name}! Here's what's happening with your fleet today.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowEmailModal(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2.5 px-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <FaEnvelope />
              Send Newsletter
            </button>
            <button
              onClick={() => navigate("/admin/inventory")}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2.5 px-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <FaCar />
              Manage Vehicles
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {[
          { label: "Total Vehicles", value: stats.totalVehicles, color: "blue", icon: <FaCar className="text-white text-2xl" /> },
          { label: "Available", value: stats.availableVehicles, color: "green", icon: <FaCheckCircle className="text-white text-2xl" /> },
          { label: "Booked", value: stats.bookedVehicles, color: "yellow", icon: <FaClock className="text-white text-2xl" /> },
          { label: "Maintenance", value: stats.maintenanceVehicles, color: "red", icon: <FaCogs className="text-white text-2xl" /> },
        ].map(({ label, value, color, icon }) => (
          <div key={label} className={`bg-white rounded-2xl shadow-lg p-6 border-l-4 border-${color}-500 hover:shadow-xl transition`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">{label}</p>
                <p className={`text-3xl font-bold text-${color === "blue" ? "gray-800" : color + "-600"} mt-1`}>{value}</p>
              </div>
              <div className={`p-3 bg-gradient-to-r from-${color}-500 to-${color}-400 rounded-2xl`}>{icon}</div>
            </div>
          </div>
        ))}
        <div
          onClick={() => setShowSubscribers(!showSubscribers)}
          className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Subscribers</p>
              <p className="text-3xl font-bold text-purple-600 mt-1">{subscriberCount}</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
              <FaUsers className="text-white text-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Subscribers table */}
      {showSubscribers && subscribers.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Recent Subscribers</h2>
              <p className="text-sm text-gray-500 mt-1">Total {subscriberCount} active subscribers</p>
            </div>
            <button onClick={() => setShowSubscribers(false)} className="p-2 hover:bg-gray-200 rounded-lg"><FaTimes /></button>
          </div>
          <div className="overflow-x-auto max-h-64 overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subscribed On</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Source</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subscribers.map((sub, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">{sub.email}</td>
                    <td className="px-6 py-4 text-gray-500">{new Date(sub.subscribedAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">{sub.source || "newsletter"}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Vehicles table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <h2 className="text-lg font-semibold text-gray-800">Recent Vehicles Added</h2>
          <p className="text-sm text-gray-500 mt-1">Latest additions to your fleet</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vehicle</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rate/Day</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vehicles.slice(0, 5).map((vehicle) => (
                <tr key={vehicle._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {vehicle.photos?.[0] && (
                        <img src={`http://localhost:5000/uploads/vehicles/${vehicle.photos[0].filename}`} alt={vehicle.carName} className="w-12 h-12 object-cover rounded-lg" />
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{vehicle.carName}</p>
                        <p className="text-sm text-gray-500">{vehicle.carNumber}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">{vehicle.carType}</span></td>
                  <td className="px-6 py-4"><span className="font-semibold">रु {vehicle.ratePerDay}</span><span className="text-xs text-gray-500">/day</span></td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${vehicle.status === "Available" ? "bg-green-100 text-green-800" : vehicle.status === "Booked" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>
                      {vehicle.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Newsletter Modal ─────────────────────────────────────────── */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4">
          <div
            className="bg-white w-full sm:rounded-3xl shadow-2xl flex flex-col"
            style={{ maxWidth: "780px", maxHeight: "95vh", height: "auto" }}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-7 pt-7 pb-5 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center shadow-lg shadow-violet-200">
                  <FaPaperPlane className="text-white text-base" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 leading-tight">Compose newsletter</h2>
                  <p className="text-xs text-gray-400 mt-0.5 font-medium tracking-wide uppercase">Broadcast center</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                disabled={sendingEmail}
                className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition disabled:opacity-40"
              >
                <FaTimes className="text-sm" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 px-7 py-6 space-y-6">

              {/* Audience selector */}
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Send to</p>
                <div className="grid grid-cols-3 gap-3">
                  {targetOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setTarget(opt.id)}
                      className={`relative flex flex-col items-start p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                        target === opt.id
                          ? opt.id === "subscribers"
                            ? "border-purple-500 bg-purple-50"
                            : opt.id === "users"
                              ? "border-blue-500 bg-blue-50"
                              : "border-emerald-500 bg-emerald-50"
                          : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {target === opt.id && (
                        <span className={`absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs ${
                          opt.id === "subscribers" ? "bg-purple-500" : opt.id === "users" ? "bg-blue-500" : "bg-emerald-500"
                        }`}>✓</span>
                      )}
                      <span className="text-2xl mb-2">{opt.icon}</span>
                      <span className={`text-sm font-semibold leading-tight ${target === opt.id ? (opt.id === "subscribers" ? "text-purple-700" : opt.id === "users" ? "text-blue-700" : "text-emerald-700") : "text-gray-800"}`}>
                        {opt.label}
                      </span>
                      <span className="text-xs text-gray-400 mt-0.5">{opt.sublabel}</span>
                      <span className={`mt-2 text-xs font-bold px-2 py-0.5 rounded-full ${
                        target === opt.id
                          ? opt.id === "subscribers" ? "bg-purple-100 text-purple-600" : opt.id === "users" ? "bg-blue-100 text-blue-600" : "bg-emerald-100 text-emerald-600"
                          : "bg-gray-100 text-gray-500"
                      }`}>
                        {opt.count.toLocaleString()} recipients
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest block mb-2">Subject line</label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  disabled={sendingEmail}
                  placeholder="e.g. 🚗 New vehicles just arrived — Book now!"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-sm text-gray-800 placeholder-gray-400 transition disabled:bg-gray-50 disabled:text-gray-400"
                />
              </div>

              {/* Message with tabs */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Message body</label>
                  <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
                    {[
                      { id: "write", icon: <FaCode className="text-xs" />, label: "Write" },
                      { id: "preview", icon: <FaEye className="text-xs" />, label: "Preview" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setPreviewMode(tab.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                          previewMode === tab.id ? "bg-white text-gray-800 shadow-sm" : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        {tab.icon} {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {previewMode === "write" ? (
                  <textarea
                    value={emailMessage}
                    onChange={(e) => setEmailMessage(e.target.value)}
                    disabled={sendingEmail}
                    rows={8}
                    placeholder={"Write your message here...\n\nHTML tags are supported:\n<strong>Bold text</strong>, <em>italic</em>, <a href='...'>link</a>, <br> for line breaks"}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-sm text-gray-800 placeholder-gray-400 font-mono resize-none transition disabled:bg-gray-50 disabled:text-gray-400 leading-relaxed"
                  />
                ) : (
                  <div className="w-full min-h-[200px] rounded-xl border border-gray-200 bg-gray-50 p-5 overflow-auto">
                    {emailSubject && (
                      <div className="mb-4 pb-4 border-b border-gray-200">
                        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Subject</p>
                        <p className="text-base font-semibold text-gray-900">{emailSubject}</p>
                      </div>
                    )}
                    <div className="prose prose-sm max-w-none">
                      {emailMessage ? renderMessagePreview() : <p className="text-gray-400 italic text-sm">Nothing to preview yet…</p>}
                    </div>
                  </div>
                )}

                <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                  <FaCode className="text-xs" /> Supports HTML formatting tags
                </p>
              </div>

              {/* Result banner */}
              {emailResult && (
                <div className={`flex items-start gap-3 p-4 rounded-2xl ${emailResult.success ? "bg-emerald-50 border border-emerald-200" : "bg-red-50 border border-red-200"}`}>
                  <span className={`text-2xl ${emailResult.success ? "text-emerald-500" : "text-red-500"}`}>
                    {emailResult.success ? "✅" : "❌"}
                  </span>
                  <div>
                    <p className={`font-semibold text-sm ${emailResult.success ? "text-emerald-800" : "text-red-800"}`}>{emailResult.message}</p>
                    {emailResult.success && emailResult.failed > 0 && (
                      <p className="text-xs text-emerald-600 mt-0.5">{emailResult.failed} failed deliveries</p>
                    )}
                  </div>
                </div>
              )}

              {/* Progress bar */}
              {sendingEmail && (
                <div>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Sending to {recipientCount.toLocaleString()} recipients…</span>
                    <span>{Math.round(sendProgress)}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet-500 to-pink-500 rounded-full transition-all duration-300"
                      style={{ width: `${sendProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-7 py-5 border-t border-gray-100 flex items-center gap-3">
              {/* Recipient pill */}
              <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3.5 py-2 mr-auto">
                <FaUsers className="text-gray-400 text-xs" />
                <span className="text-xs font-semibold text-gray-600">
                  {recipientCount.toLocaleString()} {target === "both" ? "total" : ""} recipient{recipientCount !== 1 ? "s" : ""}
                </span>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={sendingEmail}
                className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition disabled:opacity-40"
              >
                Cancel
              </button>
              <button
                onClick={handleSendNewsletter}
                disabled={sendingEmail || !emailSubject || !emailMessage}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white text-sm font-bold shadow-lg shadow-violet-200 hover:shadow-violet-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
              >
                {sendingEmail ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="text-xs" />
                    Send campaign
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;