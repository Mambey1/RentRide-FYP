// // export default AdminDashboard;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   FaCar,
//   FaCheckCircle,
//   FaClock,
//   FaCogs,
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

//   // Check admin access on mount
//   useEffect(() => {
//     const token = localStorage.getItem("token") || sessionStorage.getItem("token");
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
//   }, []);

//   const fetchVehicles = async () => {
//     try {
//       const token = localStorage.getItem("token") || sessionStorage.getItem("token");
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

//   const calculateStats = (vehiclesData) => {
//     const statsData = {
//       totalVehicles: vehiclesData.length,
//       availableVehicles: vehiclesData.filter((v) => v.status === "Available").length,
//       bookedVehicles: vehiclesData.filter((v) => v.status === "Booked").length,
//       maintenanceVehicles: vehiclesData.filter((v) => v.status === "Maintenance").length,
//     };
//     setStats(statsData);
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
//         <div className="flex justify-between items-center">
//           <div>
//             <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
//               Dashboard Overview
//             </h1>
//             <p className="text-gray-500 mt-2">
//               Welcome back, {user?.name}! Here's what's happening with your fleet today.
//             </p>
//           </div>
//           <button
//             onClick={() => navigate("/admin/inventory")}
//             className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2.5 px-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
//           >
//             <FaCar className="text-white" />
//             Manage Vehicles
//           </button>
//         </div>
//       </div>

//       {/* Statistics Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-500 text-sm font-medium">Total Vehicles</p>
//               <p className="text-3xl font-bold text-gray-800 mt-1">{stats.totalVehicles}</p>
//               <p className="text-xs text-green-600 mt-2">↑ 12% from last month</p>
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
//               <p className="text-3xl font-bold text-green-600 mt-1">{stats.availableVehicles}</p>
//               <p className="text-xs text-green-600 mt-2">Ready for booking</p>
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
//               <p className="text-3xl font-bold text-yellow-600 mt-1">{stats.bookedVehicles}</p>
//               <p className="text-xs text-yellow-600 mt-2">Currently on rent</p>
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
//               <p className="text-3xl font-bold text-red-600 mt-1">{stats.maintenanceVehicles}</p>
//               <p className="text-xs text-red-600 mt-2">Under service</p>
//             </div>
//             <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl">
//               <FaCogs className="text-white text-2xl" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Recent Vehicles Table */}
//       <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//         <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
//           <h2 className="text-lg font-semibold text-gray-800">Recent Vehicles Added</h2>
//           <p className="text-sm text-gray-500 mt-1">Latest additions to your fleet</p>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vehicle</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rate/Day</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {vehicles.slice(0, 5).map((vehicle) => (
//                 <tr key={vehicle._id} className="hover:bg-gray-50 transition-colors">
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
//                         <p className="font-medium text-gray-900">{vehicle.carName}</p>
//                         <p className="text-sm text-gray-500">{vehicle.carNumber}</p>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
//                       {vehicle.carType}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className="font-semibold">₹{vehicle.ratePerDay}</span>
//                     <span className="text-xs text-gray-500">/day</span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-medium ${
//                         vehicle.status === "Available"
//                           ? "bg-green-100 text-green-800"
//                           : vehicle.status === "Booked"
//                           ? "bg-yellow-100 text-yellow-800"
//                           : "bg-red-100 text-red-800"
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
//     </div>
//   );
// };

// export default AdminDashboard;
import React, { useState, useEffect } from "react";
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

  // Email newsletter states
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailResult, setEmailResult] = useState(null);
  const [subscribers, setSubscribers] = useState([]);
  const [showSubscribers, setShowSubscribers] = useState(false);

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
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.data.success) {
        setSubscriberCount(response.data.count);
        setSubscribers(response.data.recentSubscribers || []);
      }
    } catch (error) {
      console.error("Error fetching subscribers:", error);
    }
  };

  const calculateStats = (vehiclesData) => {
    const statsData = {
      totalVehicles: vehiclesData.length,
      availableVehicles: vehiclesData.filter((v) => v.status === "Available")
        .length,
      bookedVehicles: vehiclesData.filter((v) => v.status === "Booked").length,
      maintenanceVehicles: vehiclesData.filter(
        (v) => v.status === "Maintenance",
      ).length,
    };
    setStats(statsData);
  };

  const handleSendNewsletter = async (e) => {
    e.preventDefault();
    if (!emailSubject || !emailMessage) {
      alert("Please fill in both subject and message");
      return;
    }

    setSendingEmail(true);
    setEmailResult(null);

    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/admin/emails/send-bulk",
        { subject: emailSubject, message: emailMessage },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (response.data.success) {
        setEmailResult({
          success: true,
          message: `✅ Email sent to ${response.data.successCount} subscribers! (${response.data.failCount || 0} failed)`,
        });
        setEmailSubject("");
        setEmailMessage("");
        setTimeout(() => setShowEmailModal(false), 2000);
      } else {
        setEmailResult({ success: false, message: "❌ Failed to send emails" });
      }
    } catch (error) {
      setEmailResult({
        success: false,
        message: "❌ Error sending emails. Please try again.",
      });
    } finally {
      setSendingEmail(false);
      setTimeout(() => setEmailResult(null), 5000);
    }
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

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Dashboard Overview
            </h1>
            <p className="text-gray-500 mt-2">
              Welcome back, {user?.name}! Here's what's happening with your
              fleet today.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowEmailModal(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2.5 px-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <FaEnvelope className="text-white" />
              Send Newsletter
            </button>
            <button
              onClick={() => navigate("/admin/inventory")}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2.5 px-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <FaCar className="text-white" />
              Manage Vehicles
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">
                Total Vehicles
              </p>
              <p className="text-3xl font-bold text-gray-800 mt-1">
                {stats.totalVehicles}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl">
              <FaCar className="text-white text-2xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Available</p>
              <p className="text-3xl font-bold text-green-600 mt-1">
                {stats.availableVehicles}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl">
              <FaCheckCircle className="text-white text-2xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500 hover:shadow-xl transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Booked</p>
              <p className="text-3xl font-bold text-yellow-600 mt-1">
                {stats.bookedVehicles}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl">
              <FaClock className="text-white text-2xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-500 hover:shadow-xl transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Maintenance</p>
              <p className="text-3xl font-bold text-red-600 mt-1">
                {stats.maintenanceVehicles}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl">
              <FaCogs className="text-white text-2xl" />
            </div>
          </div>
        </div>
        <div
          onClick={() => setShowSubscribers(!showSubscribers)}
          className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Subscribers</p>
              <p className="text-3xl font-bold text-purple-600 mt-1">
                {subscriberCount}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
              <FaUsers className="text-white text-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Subscribers List (Expandable) */}
      {showSubscribers && subscribers.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Recent Subscribers
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Total {subscriberCount} active subscribers
              </p>
            </div>
            <button
              onClick={() => setShowSubscribers(false)}
              className="p-2 hover:bg-gray-200 rounded-lg"
            >
              <FaTimes />
            </button>
          </div>
          <div className="overflow-x-auto max-h-64 overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Subscribed On
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Source
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subscribers.map((sub, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">{sub.email}</td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(sub.subscribedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                        {sub.source || "newsletter"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recent Vehicles Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <h2 className="text-lg font-semibold text-gray-800">
            Recent Vehicles Added
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Latest additions to your fleet
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
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Rate/Day
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vehicles.slice(0, 5).map((vehicle) => (
                <tr
                  key={vehicle._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {vehicle.photos && vehicle.photos[0] && (
                        <img
                          src={`http://localhost:5000/uploads/vehicles/${vehicle.photos[0].filename}`}
                          alt={vehicle.carName}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                      )}
                      <div>
                        <p className="font-medium text-gray-900">
                          {vehicle.carName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {vehicle.carNumber}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {vehicle.carType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold">
                      रु {vehicle.ratePerDay}
                    </span>
                    <span className="text-xs text-gray-500">/day</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        vehicle.status === "Available"
                          ? "bg-green-100 text-green-800"
                          : vehicle.status === "Booked"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {vehicle.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Email Newsletter Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                  <FaEnvelope className="text-white text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Send Newsletter
                  </h2>
                  <p className="text-sm text-gray-500">
                    Send email to {subscriberCount} subscribers
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowEmailModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <FaTimes className="text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSendNewsletter} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter email subject..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={emailMessage}
                  onChange={(e) => setEmailMessage(e.target.value)}
                  rows={8}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Write your message here...&#10;&#10;You can use HTML tags for formatting:&#10;&lt;strong&gt;bold&lt;/strong&gt;, &lt;em&gt;italic&lt;/em&gt;, &lt;br&gt; for line breaks"
                />
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-purple-800">
                  <FaUsers />
                  <span className="font-medium">
                    {subscriberCount} active subscribers
                  </span>
                </div>
                <p className="text-sm text-purple-600 mt-1">
                  This email will be sent to all subscribed users who opted in
                  to receive newsletters.
                </p>
              </div>

              {emailResult && (
                <div
                  className={`p-4 rounded-lg ${emailResult.success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}
                >
                  {emailResult.message}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowEmailModal(false)}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={sendingEmail}
                  className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {sendingEmail ? (
                    <span className="flex items-center justify-center gap-2">
                      <FaSpinner className="animate-spin" /> Sending...
                    </span>
                  ) : (
                    `Send to ${subscriberCount} Subscribers`
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
