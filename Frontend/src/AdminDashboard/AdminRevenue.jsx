// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   FaRupeeSign,
//   FaCar,
//   FaUsers,
//   FaChartLine,
//   FaCalendarAlt,
//   FaSpinner,
//   FaDownload,
//   FaEye,
//   FaWallet,
//   FaPercentage,
// } from "react-icons/fa";

// const API_URL = "http://localhost:5000/api";

// const AdminRevenue = () => {
//   const [activeTab, setActiveTab] = useState("admin");
//   const [loading, setLoading] = useState(true);
//   const [adminRevenue, setAdminRevenue] = useState(null);
//   const [userRevenue, setUserRevenue] = useState(null);
//   const [combinedRevenue, setCombinedRevenue] = useState(null);
//   const [dateRange, setDateRange] = useState({ start: "", end: "" });
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     fetchAllRevenue();
//   }, [dateRange]);

//   const fetchAllRevenue = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       const params = {};
//       if (dateRange.start) params.startDate = dateRange.start;
//       if (dateRange.end) params.endDate = dateRange.end;

//       const [adminRes, userRes, combinedRes] = await Promise.all([
//         axios.get(`${API_URL}/revenue/admin-vehicles`, {
//           params,
//           headers: { Authorization: `Bearer ${token}` }
//         }),
//         axios.get(`${API_URL}/revenue/user-vehicles`, {
//           params,
//           headers: { Authorization: `Bearer ${token}` }
//         }),
//         axios.get(`${API_URL}/revenue/combined`, {
//           params,
//           headers: { Authorization: `Bearer ${token}` }
//         })
//       ]);

//       setAdminRevenue(adminRes.data.data);
//       setUserRevenue(userRes.data.data);
//       setCombinedRevenue(combinedRes.data.data);
//     } catch (error) {
//       console.error("Error fetching revenue:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatCurrency = (amount) => {
//     return "रु " + (amount || 0).toLocaleString("en-NP");
//   };

//   const exportToCSV = (data, filename) => {
//     if (!data || !data.bookings) return;

//     const headers = ["Booking ID", "User", "Vehicle", "Total Amount", "Date", "Status"];
//     const rows = data.bookings.map(booking => [
//       booking.confirmationCode,
//       booking.user?.name || "N/A",
//       booking.vehicle?.carName || "N/A",
//       booking.totalAmount,
//       new Date(booking.createdAt).toLocaleDateString(),
//       booking.status
//     ]);

//     const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");
//     const blob = new Blob([csvContent], { type: "text/csv" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `${filename}.csv`;
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   const RevenueCard = ({ title, amount, subtitle, icon, color }) => (
//     <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-l-blue-500">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-gray-500 text-sm">{title}</p>
//           <p className="text-3xl font-bold text-gray-800 mt-1">{formatCurrency(amount)}</p>
//           {subtitle && <p className="text-xs text-gray-400 mt-2">{subtitle}</p>}
//         </div>
//         <div className={`p-3 bg-gradient-to-r ${color} rounded-xl`}>
//           {icon}
//         </div>
//       </div>
//     </div>
//   );

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-96">
//         <div className="text-center">
//           <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto mb-4" />
//           <p className="text-gray-500">Loading revenue data...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="mb-8">
//         <div className="flex justify-between items-center flex-wrap gap-4">
//           <div>
//             <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
//               Revenue Management
//             </h1>
//             <p className="text-gray-500 mt-2">Track earnings from fleet operations</p>
//           </div>
//           <div className="flex gap-3">
//             <div className="flex items-center gap-2 bg-white rounded-lg shadow px-4 py-2">
//               <FaCalendarAlt className="text-gray-400" />
//               <input
//                 type="date"
//                 value={dateRange.start}
//                 onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
//                 className="border-none focus:outline-none text-sm"
//               />
//               <span className="text-gray-400">to</span>
//               <input
//                 type="date"
//                 value={dateRange.end}
//                 onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
//                 className="border-none focus:outline-none text-sm"
//               />
//             </div>
//             <button
//               onClick={() => exportToCSV(activeTab === "admin" ? adminRevenue : userRevenue, `${activeTab}_revenue`)}
//               className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
//             >
//               <FaDownload /> Export
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Combined Summary Cards */}
//       {combinedRevenue && (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <RevenueCard
//             title="Total Revenue"
//             amount={combinedRevenue.totalRevenue}
//             subtitle="Overall earnings"
//             icon={<FaRupeeSign className="text-white text-2xl" />}
//             color="from-blue-500 to-cyan-500"
//           />
//           <RevenueCard
//             title="Company Revenue"
//             amount={combinedRevenue.totalCompanyRevenue}
//             subtitle="After commission deductions"
//             icon={<FaWallet className="text-white text-2xl" />}
//             color="from-purple-500 to-pink-500"
//           />
//           <RevenueCard
//             title="Owner Payout"
//             amount={combinedRevenue.totalOwnerPayout}
//             subtitle="Paid to vehicle owners"
//             icon={<FaUsers className="text-white text-2xl" />}
//             color="from-green-500 to-emerald-500"
//           />
//         </div>
//       )}

//       {/* Tabs */}
//       <div className="flex gap-2 mb-6 border-b border-gray-200">
//         <button
//           onClick={() => setActiveTab("admin")}
//           className={`px-6 py-3 font-semibold transition-all ${
//             activeTab === "admin"
//               ? "border-b-2 border-blue-500 text-blue-600"
//               : "text-gray-500 hover:text-gray-700"
//           }`}
//         >
//           <FaCar className="inline mr-2" /> Admin Vehicles (100%)
//         </button>
//         <button
//           onClick={() => setActiveTab("user")}
//           className={`px-6 py-3 font-semibold transition-all ${
//             activeTab === "user"
//               ? "border-b-2 border-purple-500 text-purple-600"
//               : "text-gray-500 hover:text-gray-700"
//           }`}
//         >
//           <FaUsers className="inline mr-2" /> User Vehicles (30% Commission)
//         </button>
//       </div>

//       {/* Admin Vehicles Revenue Tab */}
//       {activeTab === "admin" && adminRevenue && (
//         <div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             <RevenueCard
//               title="Total Bookings"
//               amount={adminRevenue.summary.totalBookings}
//               subtitle="Completed bookings"
//               icon={<FaChartLine className="text-white text-2xl" />}
//               color="from-blue-500 to-cyan-500"
//             />
//             <RevenueCard
//               title="Total Revenue"
//               amount={adminRevenue.summary.totalRevenue}
//               subtitle="From admin fleet"
//               icon={<FaRupeeSign className="text-white text-2xl" />}
//               color="from-green-500 to-emerald-500"
//             />
//             <RevenueCard
//               title="Average Booking"
//               amount={adminRevenue.summary.averageBookingValue}
//               subtitle="Per booking value"
//               icon={<FaWallet className="text-white text-2xl" />}
//               color="from-orange-500 to-yellow-500"
//             />
//           </div>

//           {/* Bookings Table */}
//           <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//             <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
//               <h2 className="text-lg font-semibold text-gray-800">Booking Transactions</h2>
//               <p className="text-sm text-gray-500">Detailed list of all completed bookings</p>
//             </div>
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Booking ID</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vehicle</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Days</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {adminRevenue.bookings?.map((booking) => (
//                     <tr key={booking._id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 font-mono text-sm">{booking.confirmationCode}</td>
//                       <td className="px-6 py-4">
//                         <div>
//                           <p className="font-medium text-gray-900">{booking.user?.name}</p>
//                           <p className="text-sm text-gray-500">{booking.user?.email}</p>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="flex items-center gap-2">
//                           {booking.vehicle?.photos?.[0] && (
//                             <img
//                               src={`http://localhost:5000/uploads/vehicles/${booking.vehicle.photos[0].filename}`}
//                               alt={booking.vehicle?.carName}
//                               className="w-8 h-8 object-cover rounded"
//                             />
//                           )}
//                           <span className="font-medium">{booking.vehicle?.carName}</span>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">{booking.totalDays} days</td>
//                       <td className="px-6 py-4 font-semibold text-green-600">{formatCurrency(booking.totalAmount)}</td>
//                       <td className="px-6 py-4 text-gray-500">{new Date(booking.createdAt).toLocaleDateString()}</td>
//                       <td className="px-6 py-4">
//                         <button
//                           onClick={() => { setSelectedBooking(booking); setShowModal(true); }}
//                           className="text-blue-600 hover:text-blue-800"
//                         >
//                           <FaEye />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* User Vehicles Revenue Tab */}
//       {activeTab === "user" && userRevenue && (
//         <div>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//             <RevenueCard
//               title="Total Bookings"
//               amount={userRevenue.summary.totalBookings}
//               subtitle="User vehicle bookings"
//               icon={<FaChartLine className="text-white text-2xl" />}
//               color="from-blue-500 to-cyan-500"
//             />
//             <RevenueCard
//               title="Gross Revenue"
//               amount={userRevenue.summary.totalRevenue}
//               subtitle="Total collected"
//               icon={<FaRupeeSign className="text-white text-2xl" />}
//               color="from-green-500 to-emerald-500"
//             />
//             <RevenueCard
//               title="RentRide Commission (30%)"
//               amount={userRevenue.summary.totalCompanyRevenue}
//               subtitle="Platform earnings"
//               icon={<FaPercentage className="text-white text-2xl" />}
//               color="from-purple-500 to-pink-500"
//             />
//             <RevenueCard
//               title="Owner Payout (70%)"
//               amount={userRevenue.summary.totalOwnerRevenue}
//               subtitle="Paid to vehicle owners"
//               icon={<FaUsers className="text-white text-2xl" />}
//               color="from-orange-500 to-yellow-500"
//             />
//           </div>

//           {/* User Vehicle Bookings Table with Commission Breakdown */}
//           <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//             <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
//               <h2 className="text-lg font-semibold text-gray-800">User Vehicle Transactions</h2>
//               <p className="text-sm text-gray-500">Commission: 30% to RentRide, 70% to Vehicle Owner</p>
//             </div>
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Booking ID</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vehicle</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Owner</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Amount</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Commission (30%)</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Owner Payout (70%)</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {userRevenue.bookings?.map((booking) => (
//                     <tr key={booking._id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 font-mono text-sm">{booking.confirmationCode}</td>
//                       <td className="px-6 py-4">
//                         <div>
//                           <p className="font-medium text-gray-900">{booking.user?.name}</p>
//                           <p className="text-sm text-gray-500">{booking.user?.email}</p>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="flex items-center gap-2">
//                           {booking.vehicle?.vehiclePhotos?.[0] && (
//                             <img
//                               src={`http://localhost:5000/uploads/user-vehicles/${booking.vehicle.vehiclePhotos[0].filename}`}
//                               alt={booking.vehicle?.carName}
//                               className="w-8 h-8 object-cover rounded"
//                             />
//                           )}
//                           <span className="font-medium">{booking.vehicle?.carName}</span>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div>
//                           <p className="font-medium text-gray-900">{booking.vehicle?.fullName || "N/A"}</p>
//                           <p className="text-sm text-gray-500">{booking.vehicle?.phoneNumber}</p>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 font-semibold text-green-600">{formatCurrency(booking.totalAmount)}</td>
//                       <td className="px-6 py-4">
//                         <span className="text-purple-600 font-medium">{formatCurrency(booking.revenueBreakdown?.companyRevenue)}</span>
//                         <p className="text-xs text-gray-400">30%</p>
//                       </td>
//                       <td className="px-6 py-4">
//                         <span className="text-orange-600 font-medium">{formatCurrency(booking.revenueBreakdown?.ownerRevenue)}</span>
//                         <p className="text-xs text-gray-400">70%</p>
//                       </td>
//                       <td className="px-6 py-4">
//                         <button
//                           onClick={() => { setSelectedBooking(booking); setShowModal(true); }}
//                           className="text-blue-600 hover:text-blue-800"
//                         >
//                           <FaEye />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Booking Details Modal */}
//       {showModal && selectedBooking && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
//               <h2 className="text-xl font-bold text-gray-900">Booking Details</h2>
//               <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">✕</button>
//             </div>
//             <div className="p-6 space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div><p className="text-gray-500 text-sm">Booking ID</p><p className="font-semibold">{selectedBooking.confirmationCode}</p></div>
//                 <div><p className="text-gray-500 text-sm">Status</p><span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                   selectedBooking.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
//                 }`}>{selectedBooking.status}</span></div>
//                 <div><p className="text-gray-500 text-sm">Customer</p><p className="font-semibold">{selectedBooking.user?.name}</p></div>
//                 <div><p className="text-gray-500 text-sm">Email</p><p className="font-semibold">{selectedBooking.user?.email}</p></div>
//                 <div><p className="text-gray-500 text-sm">Vehicle</p><p className="font-semibold">{selectedBooking.vehicle?.carName}</p></div>
//                 <div><p className="text-gray-500 text-sm">Pickup Date</p><p className="font-semibold">{new Date(selectedBooking.pickupDate).toLocaleDateString()}</p></div>
//                 <div><p className="text-gray-500 text-sm">Return Date</p><p className="font-semibold">{new Date(selectedBooking.returnDate).toLocaleDateString()}</p></div>
//                 <div><p className="text-gray-500 text-sm">Total Amount</p><p className="font-semibold text-green-600">{formatCurrency(selectedBooking.totalAmount)}</p></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminRevenue;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaRupeeSign,
  FaCar,
  FaUsers,
  FaChartLine,
  FaCalendarAlt,
  FaSpinner,
  FaDownload,
  FaEye,
  FaWallet,
  FaPercentage,
  FaUser,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

const API_URL = "http://localhost:5000/api";

const AdminRevenue = () => {
  const [activeTab, setActiveTab] = useState("admin");
  const [loading, setLoading] = useState(true);
  const [adminRevenue, setAdminRevenue] = useState(null);
  const [userRevenue, setUserRevenue] = useState(null);
  const [combinedRevenue, setCombinedRevenue] = useState(null);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchAllRevenue();
  }, [dateRange]);

  const fetchAllRevenue = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const params = {};
      if (dateRange.start) params.startDate = dateRange.start;
      if (dateRange.end) params.endDate = dateRange.end;

      const [adminRes, userRes, combinedRes] = await Promise.all([
        axios.get(`${API_URL}/revenue/admin-vehicles`, {
          params,
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${API_URL}/revenue/user-vehicles`, {
          params,
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${API_URL}/revenue/combined`, {
          params,
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setAdminRevenue(adminRes.data.data);
      setUserRevenue(userRes.data.data);
      setCombinedRevenue(combinedRes.data.data);
    } catch (error) {
      console.error("Error fetching revenue:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return "रु " + (amount || 0).toLocaleString("en-NP");
  };

  const exportToCSV = (data, filename) => {
    if (!data || !data.bookings) return;

    let headers, rows;

    if (filename === "admin_revenue") {
      headers = [
        "Booking ID",
        "Customer",
        "Vehicle",
        "Days",
        "Total Amount",
        "Date",
        "Status",
      ];
      rows = data.bookings.map((booking) => [
        booking.confirmationCode,
        booking.user?.name || "N/A",
        booking.vehicle?.carName || "N/A",
        booking.totalDays,
        booking.totalAmount,
        new Date(booking.createdAt).toLocaleDateString(),
        booking.status,
      ]);
    } else {
      headers = [
        "Booking ID",
        "Customer",
        "Vehicle",
        "Owner",
        "Owner Phone",
        "Total Amount",
        "Commission (30%)",
        "Owner Payout (70%)",
        "Date",
      ];
      rows = data.bookings.map((booking) => [
        booking.confirmationCode,
        booking.user?.name || "N/A",
        booking.vehicle?.carName || "N/A",
        booking.vehicle?.fullName || "N/A",
        booking.vehicle?.phoneNumber || "N/A",
        booking.totalAmount,
        booking.revenueBreakdown?.companyRevenue || 0,
        booking.revenueBreakdown?.ownerRevenue || 0,
        new Date(booking.createdAt).toLocaleDateString(),
      ]);
    }

    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const RevenueCard = ({ title, amount, subtitle, icon, color }) => (
    <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-l-blue-500">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">
            {formatCurrency(amount)}
          </p>
          {subtitle && <p className="text-xs text-gray-400 mt-2">{subtitle}</p>}
        </div>
        <div className={`p-3 bg-gradient-to-r ${color} rounded-xl`}>{icon}</div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto mb-4" />
          <p className="text-gray-500">Loading revenue data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Revenue Management
            </h1>
            <p className="text-gray-500 mt-2">
              Track earnings from fleet operations
            </p>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-2 bg-white rounded-lg shadow px-4 py-2">
              <FaCalendarAlt className="text-gray-400" />
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) =>
                  setDateRange({ ...dateRange, start: e.target.value })
                }
                className="border-none focus:outline-none text-sm"
              />
              <span className="text-gray-400">to</span>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) =>
                  setDateRange({ ...dateRange, end: e.target.value })
                }
                className="border-none focus:outline-none text-sm"
              />
            </div>
            <button
              onClick={() =>
                exportToCSV(
                  activeTab === "admin" ? adminRevenue : userRevenue,
                  `${activeTab === "admin" ? "admin_revenue" : "user_revenue"}`,
                )
              }
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              <FaDownload /> Export
            </button>
          </div>
        </div>
      </div>

      {/* Combined Summary Cards */}
      {combinedRevenue && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <RevenueCard
            title="Total Revenue"
            amount={combinedRevenue.totalRevenue}
            subtitle="Overall earnings"
            icon={<FaRupeeSign className="text-white text-2xl" />}
            color="from-blue-500 to-cyan-500"
          />
          <RevenueCard
            title="Company Revenue"
            amount={combinedRevenue.totalCompanyRevenue}
            subtitle="After commission deductions"
            icon={<FaWallet className="text-white text-2xl" />}
            color="from-purple-500 to-pink-500"
          />
          <RevenueCard
            title="Owner Payout"
            amount={combinedRevenue.totalOwnerPayout}
            subtitle="Paid to vehicle owners"
            icon={<FaUsers className="text-white text-2xl" />}
            color="from-green-500 to-emerald-500"
          />
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("admin")}
          className={`px-6 py-3 font-semibold transition-all ${
            activeTab === "admin"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <FaCar className="inline mr-2" /> Admin Vehicles (100%)
        </button>
        <button
          onClick={() => setActiveTab("user")}
          className={`px-6 py-3 font-semibold transition-all ${
            activeTab === "user"
              ? "border-b-2 border-purple-500 text-purple-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <FaUsers className="inline mr-2" /> User Vehicles (30% Commission)
        </button>
      </div>

      {/* Admin Vehicles Revenue Tab */}
      {activeTab === "admin" && adminRevenue && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <RevenueCard
              title="Total Bookings"
              amount={adminRevenue.summary.totalBookings}
              subtitle="Completed bookings"
              icon={<FaChartLine className="text-white text-2xl" />}
              color="from-blue-500 to-cyan-500"
            />
            <RevenueCard
              title="Total Revenue"
              amount={adminRevenue.summary.totalRevenue}
              subtitle="From admin fleet"
              icon={<FaRupeeSign className="text-white text-2xl" />}
              color="from-green-500 to-emerald-500"
            />
            <RevenueCard
              title="Average Booking"
              amount={adminRevenue.summary.averageBookingValue}
              subtitle="Per booking value"
              icon={<FaWallet className="text-white text-2xl" />}
              color="from-orange-500 to-yellow-500"
            />
          </div>

          {/* Bookings Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <h2 className="text-lg font-semibold text-gray-800">
                Booking Transactions
              </h2>
              <p className="text-sm text-gray-500">
                Detailed list of all completed bookings
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Booking ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Vehicle
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Days
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {adminRevenue.bookings?.map((booking) => (
                    <tr key={booking._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-mono text-sm">
                        {booking.confirmationCode}
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">
                            {booking.user?.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {booking.user?.email}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {booking.vehicle?.photos?.[0] && (
                            <img
                              src={`http://localhost:5000/uploads/vehicles/${booking.vehicle.photos[0].filename}`}
                              alt={booking.vehicle?.carName}
                              className="w-8 h-8 object-cover rounded"
                            />
                          )}
                          <span className="font-medium">
                            {booking.vehicle?.carName}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">{booking.totalDays} days</td>
                      <td className="px-6 py-4 font-semibold text-green-600">
                        {formatCurrency(booking.totalAmount)}
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            setSelectedBooking(booking);
                            setShowModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FaEye />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* User Vehicles Revenue Tab */}
      {activeTab === "user" && userRevenue && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <RevenueCard
              title="Total Bookings"
              amount={userRevenue.summary.totalBookings}
              subtitle="User vehicle bookings"
              icon={<FaChartLine className="text-white text-2xl" />}
              color="from-blue-500 to-cyan-500"
            />
            <RevenueCard
              title="Gross Revenue"
              amount={userRevenue.summary.totalRevenue}
              subtitle="Total collected"
              icon={<FaRupeeSign className="text-white text-2xl" />}
              color="from-green-500 to-emerald-500"
            />
            <RevenueCard
              title="RentRide Commission (30%)"
              amount={userRevenue.summary.totalCompanyRevenue}
              subtitle="Platform earnings"
              icon={<FaPercentage className="text-white text-2xl" />}
              color="from-purple-500 to-pink-500"
            />
            <RevenueCard
              title="Owner Payout (70%)"
              amount={userRevenue.summary.totalOwnerRevenue}
              subtitle="Paid to vehicle owners"
              icon={<FaUsers className="text-white text-2xl" />}
              color="from-orange-500 to-yellow-500"
            />
          </div>

          {/* User Vehicle Bookings Table with Commission Breakdown */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <h2 className="text-lg font-semibold text-gray-800">
                User Vehicle Transactions
              </h2>
              <p className="text-sm text-gray-500">
                Commission: 30% to RentRide, 70% to Vehicle Owner
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Booking ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Vehicle
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Owner
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Owner Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Total Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Commission (30%)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Owner Payout (70%)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userRevenue.bookings?.map((booking) => (
                    <tr key={booking._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-mono text-sm">
                        {booking.confirmationCode}
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">
                            {booking.user?.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {booking.user?.email}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {booking.vehicle?.vehiclePhotos?.[0] && (
                            <img
                              src={`http://localhost:5000/uploads/user-vehicles/${booking.vehicle.vehiclePhotos[0].filename}`}
                              alt={booking.vehicle?.carName}
                              className="w-8 h-8 object-cover rounded"
                            />
                          )}
                          <span className="font-medium">
                            {booking.vehicle?.carName}
                          </span>
                          <p className="text-xs text-gray-500">
                            {booking.vehicle?.carNumber}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">
                            {booking.vehicle?.fullName || "N/A"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {booking.vehicle?.address}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <FaPhone className="text-gray-400 text-xs" />
                          <span className="text-sm">
                            {booking.vehicle?.phoneNumber || "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-green-600">
                        {formatCurrency(booking.totalAmount)}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-purple-600 font-medium">
                          {formatCurrency(
                            booking.revenueBreakdown?.companyRevenue,
                          )}
                        </span>
                        <p className="text-xs text-gray-400">30%</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-orange-600 font-medium">
                          {formatCurrency(
                            booking.revenueBreakdown?.ownerRevenue,
                          )}
                        </span>
                        <p className="text-xs text-gray-400">70%</p>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            setSelectedBooking(booking);
                            setShowModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FaEye />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Booking Details Modal - Enhanced for both admin and user vehicles */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">
                Booking Details
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              {/* Booking Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FaCalendarAlt className="text-blue-500" /> Booking
                  Information
                </h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-gray-500 text-sm">Booking ID</p>
                    <p className="font-semibold">
                      {selectedBooking.confirmationCode}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Status</p>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        selectedBooking.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {selectedBooking.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Booking Date</p>
                    <p className="font-semibold">
                      {new Date(selectedBooking.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Duration</p>
                    <p className="font-semibold">
                      {selectedBooking.totalDays} days
                    </p>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FaUser className="text-green-500" /> Customer Information
                </h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-gray-500 text-sm">Name</p>
                    <p className="font-semibold">
                      {selectedBooking.user?.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Email</p>
                    <p className="font-semibold">
                      {selectedBooking.user?.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Phone</p>
                    <p className="font-semibold">
                      {selectedBooking.user?.phone || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Vehicle Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FaCar className="text-purple-500" /> Vehicle Information
                </h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-gray-500 text-sm">Vehicle Name</p>
                    <p className="font-semibold">
                      {selectedBooking.vehicle?.carName}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Car Number</p>
                    <p className="font-semibold">
                      {selectedBooking.vehicle?.carNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Car Type</p>
                    <p className="font-semibold">
                      {selectedBooking.vehicle?.carType}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Rate Per Day</p>
                    <p className="font-semibold">
                      {formatCurrency(selectedBooking.vehicle?.ratePerDay)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Owner Information (only for user vehicles) */}
              {selectedBooking.vehicle?.source === "user" &&
                selectedBooking.vehicle?.fullName && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <FaUsers className="text-orange-500" /> Owner Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4 bg-orange-50 p-4 rounded-lg">
                      <div>
                        <p className="text-gray-500 text-sm">Owner Name</p>
                        <p className="font-semibold">
                          {selectedBooking.vehicle?.fullName}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Phone Number</p>
                        <p className="font-semibold">
                          {selectedBooking.vehicle?.phoneNumber}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Address</p>
                        <p className="font-semibold">
                          {selectedBooking.vehicle?.address},{" "}
                          {selectedBooking.vehicle?.city}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">
                          Citizenship Number
                        </p>
                        <p className="font-semibold">
                          {selectedBooking.vehicle?.citizenshipNumber}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

              {/* Payment Breakdown */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FaRupeeSign className="text-green-500" /> Payment Breakdown
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Base Price ({selectedBooking.totalDays} days)
                      </span>
                      <span>{formatCurrency(selectedBooking.basePrice)}</span>
                    </div>
                    {selectedBooking.driverFee > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Driver Fee</span>
                        <span>{formatCurrency(selectedBooking.driverFee)}</span>
                      </div>
                    )}
                    {selectedBooking.insuranceFee > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Premium Insurance</span>
                        <span>
                          {formatCurrency(selectedBooking.insuranceFee)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service Fee</span>
                      <span>{formatCurrency(selectedBooking.serviceFee)}</span>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-bold">
                        <span>Total Amount</span>
                        <span className="text-green-600">
                          {formatCurrency(selectedBooking.totalAmount)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Commission Breakdown (only for user vehicles) */}
              {selectedBooking.revenueBreakdown && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <FaPercentage className="text-purple-500" /> Commission
                    Breakdown
                  </h3>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-white rounded-lg">
                        <p className="text-sm text-gray-500">
                          RentRide Commission (30%)
                        </p>
                        <p className="text-xl font-bold text-purple-600">
                          {formatCurrency(
                            selectedBooking.revenueBreakdown.companyRevenue,
                          )}
                        </p>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <p className="text-sm text-gray-500">
                          Owner Payout (70%)
                        </p>
                        <p className="text-xl font-bold text-orange-600">
                          {formatCurrency(
                            selectedBooking.revenueBreakdown.ownerRevenue,
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Rental Dates */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FaCalendarAlt className="text-blue-500" /> Rental Period
                </h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-gray-500 text-sm">Pickup Date & Time</p>
                    <p className="font-semibold">
                      {new Date(
                        selectedBooking.pickupDate,
                      ).toLocaleDateString()}{" "}
                      at {selectedBooking.pickupTime}
                    </p>
                    <p className="text-sm text-gray-500">
                      {selectedBooking.pickupLocation}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Return Date & Time</p>
                    <p className="font-semibold">
                      {new Date(
                        selectedBooking.returnDate,
                      ).toLocaleDateString()}{" "}
                      at {selectedBooking.returnTime}
                    </p>
                    <p className="text-sm text-gray-500">
                      {selectedBooking.dropoffLocation}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRevenue;
