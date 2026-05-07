// // // frontend/src/AdminDashboard/AdminReports.jsx
// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import {
// //   FaChartLine,
// //   FaFileAlt,
// //   FaDownload,
// //   FaCar,
// //   FaUsers,
// //   FaRupeeSign,
// //   FaCalendarAlt,
// //   FaSpinner,
// //   FaChartBar,
// //   FaEye,
// //   FaTimes,
// //   FaPrint,
// //   FaFileExcel,
// //   FaFilter,
// //   FaClock,
// //   FaCheckCircle,
// //   FaArrowUp,
// //   FaArrowDown,
// // } from "react-icons/fa";
// // import {
// //   LineChart,
// //   Line,
// //   BarChart,
// //   Bar,
// //   PieChart,
// //   Pie,
// //   Cell,
// //   XAxis,
// //   YAxis,
// //   CartesianGrid,
// //   Tooltip,
// //   Legend,
// //   ResponsiveContainer,
// //   Area,
// //   AreaChart,
// //   RadialBarChart,
// //   RadialBar,
// // } from "recharts";
// // import { toast, ToastContainer } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";

// // const API_URL = "http://localhost:5000/api";

// // /* ─────────────────────────────────────────
// //    Custom Tooltip for charts
// // ───────────────────────────────────────── */
// // const CustomTooltip = ({ active, payload, label, currency }) => {
// //   if (!active || !payload || !payload.length) return null;
// //   return (
// //     <div className="bg-white border border-gray-100 shadow-2xl rounded-xl px-4 py-3 text-sm">
// //       <p className="font-semibold text-gray-700 mb-2 border-b border-gray-100 pb-1">
// //         {label}
// //       </p>
// //       {payload.map((p, i) => (
// //         <div key={i} className="flex items-center gap-2 py-0.5">
// //           <span
// //             className="w-2.5 h-2.5 rounded-full"
// //             style={{ background: p.color }}
// //           />
// //           <span className="text-gray-500">{p.name}:</span>
// //           <span className="font-bold text-gray-800">
// //             {currency
// //               ? `रु ${(p.value || 0).toLocaleString("en-NP")}`
// //               : p.value}
// //           </span>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // /* ─────────────────────────────────────────
// //    Custom Pie label
// // ───────────────────────────────────────── */
// // const renderCustomPieLabel = ({
// //   cx,
// //   cy,
// //   midAngle,
// //   innerRadius,
// //   outerRadius,
// //   percent,
// //   name,
// // }) => {
// //   if (percent < 0.05) return null;
// //   const RADIAN = Math.PI / 180;
// //   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
// //   const x = cx + radius * Math.cos(-midAngle * RADIAN);
// //   const y = cy + radius * Math.sin(-midAngle * RADIAN);
// //   return (
// //     <text
// //       x={x}
// //       y={y}
// //       fill="white"
// //       textAnchor="middle"
// //       dominantBaseline="central"
// //       fontSize={12}
// //       fontWeight={700}
// //     >
// //       {`${(percent * 100).toFixed(0)}%`}
// //     </text>
// //   );
// // };

// // /* ─────────────────────────────────────────
// //    Main Component
// // ───────────────────────────────────────── */
// // const AdminReports = () => {
// //   const [loading, setLoading] = useState(true);
// //   const [dateRange, setDateRange] = useState({
// //     start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
// //       .toISOString()
// //       .split("T")[0],
// //     end: new Date().toISOString().split("T")[0],
// //   });
// //   const [reportType, setReportType] = useState("overview");
// //   const [showDatePicker, setShowDatePicker] = useState(false);

// //   const [bookingStats, setBookingStats] = useState(null);
// //   const [revenueData, setRevenueData] = useState(null);
// //   const [vehicleStats, setVehicleStats] = useState(null);
// //   const [dailyTrends, setDailyTrends] = useState([]);
// //   const [topVehicles, setTopVehicles] = useState([]);
// //   const [bookingStatusDistribution, setBookingStatusDistribution] = useState(
// //     [],
// //   );
// //   const [vehicleTypeDistribution, setVehicleTypeDistribution] = useState([]);
// //   const [userStats, setUserStats] = useState({ total: 0, active: 0 });

// //   const CHART_COLORS = [
// //     "#6366f1",
// //     "#10b981",
// //     "#f59e0b",
// //     "#ef4444",
// //     "#8b5cf6",
// //     "#06b6d4",
// //     "#f97316",
// //     "#84cc16",
// //   ];

// //   useEffect(() => {
// //     fetchAllReportData();
// //   }, [dateRange]);

// //   const fetchAllReportData = async () => {
// //     setLoading(true);
// //     try {
// //       const token = localStorage.getItem("token");
// //       if (!token) {
// //         toast.error("Please login to view reports");
// //         setLoading(false);
// //         return;
// //       }
// //       const headers = { Authorization: `Bearer ${token}` };
// //       const params = {};
// //       if (dateRange.start) params.startDate = dateRange.start;
// //       if (dateRange.end) params.endDate = dateRange.end;

// //       try {
// //         const res = await axios.get(`${API_URL}/bookings/admin/stats`, {
// //           params,
// //           headers,
// //         });
// //         if (res.data.success) setBookingStats(res.data.data);
// //       } catch (e) {
// //         console.error("Booking stats:", e.message);
// //       }

// //       try {
// //         const res = await axios.get(`${API_URL}/revenue/combined`, {
// //           params,
// //           headers,
// //         });
// //         if (res.data.success) setRevenueData(res.data.data);
// //       } catch (e) {
// //         console.error("Revenue:", e.message);
// //       }

// //       try {
// //         const res = await axios.get(`${API_URL}/bookings/admin/all`, {
// //           params,
// //           headers,
// //         });
// //         if (res.data.success && res.data.data.bookings) {
// //           const bookings = res.data.data.bookings;
// //           setDailyTrends(processDailyTrends(bookings));
// //           setTopVehicles(processTopVehicles(bookings));
// //           setBookingStatusDistribution(processStatusDistribution(bookings));
// //         }
// //       } catch (e) {
// //         console.error("Bookings:", e.message);
// //       }

// //       try {
// //         const uvRes = await axios.get(`${API_URL}/user-vehicles/admin/all`, {
// //           params: { limit: 1000 },
// //           headers,
// //         });
// //         const avRes = await axios.get(`${API_URL}/vehicles`, { headers });
// //         const userVehicles = uvRes.data?.data?.vehicles || [];
// //         const adminVehicles = avRes.data || [];
// //         const all = [...adminVehicles, ...userVehicles];
// //         setVehicleTypeDistribution(processVehicleTypeDistribution(all));
// //         setVehicleStats({
// //           total: all.length,
// //           admin: adminVehicles.length,
// //           user: userVehicles.length,
// //           available: all.filter(
// //             (v) => v.status === "Available" || v.status === "active",
// //           ).length,
// //           booked: all.filter(
// //             (v) => v.status === "Booked" || v.status === "booked",
// //           ).length,
// //           maintenance: all.filter((v) => v.status === "Maintenance").length,
// //         });
// //       } catch (e) {
// //         console.error("Vehicles:", e.message);
// //         setVehicleStats({
// //           total: 0,
// //           admin: 0,
// //           user: 0,
// //           available: 0,
// //           booked: 0,
// //           maintenance: 0,
// //         });
// //       }

// //       try {
// //         const res = await axios.get(`${API_URL}/auth/users/count`, { headers });
// //         setUserStats({
// //           total: res.data?.count || 0,
// //           active: res.data?.activeCount || 0,
// //         });
// //       } catch (e) {
// //         console.error("Users:", e.message);
// //       }
// //     } catch (error) {
// //       toast.error("Failed to load report data");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const processDailyTrends = (bookings) => {
// //     const trends = {};
// //     bookings.forEach((b) => {
// //       const date = new Date(b.createdAt).toLocaleDateString("en-US", {
// //         month: "short",
// //         day: "numeric",
// //       });
// //       if (!trends[date]) trends[date] = { date, bookings: 0, revenue: 0 };
// //       trends[date].bookings++;
// //       trends[date].revenue += b.totalAmount || 0;
// //     });
// //     return Object.values(trends)
// //       .sort((a, b) => new Date(a.date) - new Date(b.date))
// //       .slice(-30);
// //   };

// //   const processTopVehicles = (bookings) => {
// //     const map = {};
// //     bookings.forEach((b) => {
// //       const name = b.vehicle?.carName || "Unknown";
// //       if (!map[name]) map[name] = { name, revenue: 0, bookings: 0 };
// //       map[name].revenue += b.totalAmount || 0;
// //       map[name].bookings++;
// //     });
// //     return Object.values(map)
// //       .sort((a, b) => b.revenue - a.revenue)
// //       .slice(0, 10);
// //   };

// //   const processStatusDistribution = (bookings) => {
// //     const dist = {};
// //     bookings.forEach((b) => {
// //       const s = b.status || "pending";
// //       if (!dist[s]) dist[s] = { name: s, value: 0 };
// //       dist[s].value++;
// //     });
// //     return Object.values(dist);
// //   };

// //   const processVehicleTypeDistribution = (vehicles) => {
// //     const dist = {};
// //     vehicles.forEach((v) => {
// //       const t = v.carType || "Other";
// //       if (!dist[t]) dist[t] = { name: t, value: 0 };
// //       dist[t].value++;
// //     });
// //     return Object.values(dist);
// //   };

// //   const formatCurrency = (amount) =>
// //     "रु " + (amount || 0).toLocaleString("en-NP");
// //   const formatDate = (date) =>
// //     new Date(date).toLocaleDateString("en-US", {
// //       year: "numeric",
// //       month: "short",
// //       day: "numeric",
// //     });

// //   const exportToCSV = (data, filename) => {
// //     if (!data || data.length === 0) {
// //       toast.warning("No data to export");
// //       return;
// //     }
// //     const headers = Object.keys(data[0]);
// //     const csvContent = [
// //       headers.join(","),
// //       ...data.map((row) =>
// //         headers.map((h) => JSON.stringify(row[h] || "")).join(","),
// //       ),
// //     ].join("\n");
// //     const blob = new Blob([csvContent], { type: "text/csv" });
// //     const url = URL.createObjectURL(blob);
// //     const a = document.createElement("a");
// //     a.href = url;
// //     a.download = `${filename}.csv`;
// //     a.click();
// //     URL.revokeObjectURL(url);
// //     toast.success("Report exported successfully!");
// //   };

// //   const handleExportCSV = () => {
// //     const map = {
// //       overview: dailyTrends,
// //       revenue: topVehicles,
// //       vehicles: vehicleTypeDistribution,
// //       bookings: bookingStatusDistribution,
// //     };
// //     exportToCSV(
// //       map[reportType] || dailyTrends,
// //       `${reportType}_report_${dateRange.start}_to_${dateRange.end}`,
// //     );
// //   };

// //   /* ── Stat Card ── */
// //   const StatCard = ({
// //     title,
// //     value,
// //     subtitle,
// //     icon: Icon,
// //     gradient,
// //     accent,
// //   }) => (
// //     <div
// //       className={`relative bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5`}
// //     >
// //       {/* top accent bar */}
// //       <div className={`h-1 w-full ${accent}`} />
// //       <div className="p-5">
// //         <div className="flex items-start justify-between">
// //           <div className="flex-1 min-w-0">
// //             <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
// //               {title}
// //             </p>
// //             <p className="text-2xl font-black text-gray-800 truncate">
// //               {value}
// //             </p>
// //             {subtitle && (
// //               <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
// //                 {subtitle}
// //               </p>
// //             )}
// //           </div>
// //           <div
// //             className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center ${gradient} shadow-md ml-3`}
// //           >
// //             <Icon className="text-white text-lg" />
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   /* ── Section Header ── */
// //   const SectionHeader = ({ icon: Icon, title, color }) => (
// //     <h3 className="text-base font-bold text-gray-800 mb-5 flex items-center gap-2.5">
// //       <span
// //         className={`w-7 h-7 rounded-lg flex items-center justify-center ${color}`}
// //       >
// //         <Icon className="text-white text-sm" />
// //       </span>
// //       {title}
// //     </h3>
// //   );

// //   /* ── Empty State ── */
// //   const EmptyState = ({ message }) => (
// //     <div className="flex flex-col items-center justify-center py-14 text-gray-400">
// //       <FaChartBar className="text-4xl mb-3 opacity-25" />
// //       <p className="text-sm font-medium">{message}</p>
// //     </div>
// //   );

// //   /* ── Chart Card wrapper ── */
// //   const ChartCard = ({ children, className = "" }) => (
// //     <div
// //       className={`bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300 ${className}`}
// //     >
// //       {children}
// //     </div>
// //   );

// //   if (loading) {
// //     return (
// //       <div className="flex items-center justify-center h-screen bg-gray-50">
// //         <div className="text-center">
// //           <div className="relative w-16 h-16 mx-auto mb-5">
// //             <div className="absolute inset-0 rounded-full border-4 border-indigo-100" />
// //             <div className="absolute inset-0 rounded-full border-4 border-t-indigo-600 animate-spin" />
// //           </div>
// //           <p className="text-sm font-semibold text-gray-500 tracking-wide uppercase">
// //             Loading Analytics
// //           </p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const tabs = [
// //     { id: "overview", label: "Overview", icon: FaChartLine },
// //     { id: "revenue", label: "Revenue", icon: FaRupeeSign },
// //     { id: "vehicles", label: "Vehicles", icon: FaCar },
// //     { id: "bookings", label: "Bookings", icon: FaFileAlt },
// //   ];

// //   /* ── Status color map ── */
// //   const statusColors = {
// //     pending: "#f59e0b",
// //     approved: "#6366f1",
// //     confirmed: "#10b981",
// //     active: "#06b6d4",
// //     completed: "#8b5cf6",
// //     cancelled: "#ef4444",
// //     rejected: "#f97316",
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50/70 p-6 lg:p-8">
// //       <ToastContainer position="top-right" autoClose={3000} />

// //       {/* ── Page Header ── */}
// //       <div className="mb-7">
// //         <div className="flex flex-wrap justify-between items-start gap-4">
// //           <div>
// //             <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2.5 tracking-tight">
// //               <span className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md shadow-indigo-200">
// //                 <FaChartLine className="text-white text-base" />
// //               </span>
// //               Reports & Analytics
// //             </h1>
// //             <p className="text-sm text-gray-500 mt-1.5 ml-12">
// //               Detailed insights about your business performance
// //             </p>
// //           </div>

// //           <div className="flex flex-wrap gap-2.5 items-center">
// //             {/* Date Range Picker */}
// //             <div className="relative">
// //               <button
// //                 onClick={() => setShowDatePicker(!showDatePicker)}
// //                 className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:border-indigo-400 hover:text-indigo-600 shadow-sm transition-all"
// //               >
// //                 <FaCalendarAlt className="text-indigo-400" />
// //                 {formatDate(dateRange.start)} — {formatDate(dateRange.end)}
// //                 <FaFilter className="text-gray-300 text-xs ml-1" />
// //               </button>
// //               {showDatePicker && (
// //                 <div className="absolute top-full mt-2 right-0 bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 z-30 w-76 min-w-72">
// //                   <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
// //                     Date Range
// //                   </p>
// //                   <div className="space-y-3 mb-4">
// //                     <div>
// //                       <label className="block text-xs font-semibold text-gray-600 mb-1">
// //                         From
// //                       </label>
// //                       <input
// //                         type="date"
// //                         value={dateRange.start}
// //                         onChange={(e) =>
// //                           setDateRange({ ...dateRange, start: e.target.value })
// //                         }
// //                         className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400"
// //                       />
// //                     </div>
// //                     <div>
// //                       <label className="block text-xs font-semibold text-gray-600 mb-1">
// //                         To
// //                       </label>
// //                       <input
// //                         type="date"
// //                         value={dateRange.end}
// //                         onChange={(e) =>
// //                           setDateRange({ ...dateRange, end: e.target.value })
// //                         }
// //                         className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400"
// //                       />
// //                     </div>
// //                   </div>
// //                   <div className="grid grid-cols-2 gap-2 mb-3">
// //                     {[
// //                       { label: "7 Days", days: 7 },
// //                       { label: "30 Days", days: 30 },
// //                       { label: "90 Days", days: 90 },
// //                       { label: "This Year", days: 365 },
// //                     ].map(({ label, days }) => (
// //                       <button
// //                         key={days}
// //                         onClick={() => {
// //                           setDateRange({
// //                             start: new Date(Date.now() - days * 86400000)
// //                               .toISOString()
// //                               .split("T")[0],
// //                             end: new Date().toISOString().split("T")[0],
// //                           });
// //                           setShowDatePicker(false);
// //                         }}
// //                         className="px-3 py-1.5 text-xs font-semibold bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition border border-gray-100"
// //                       >
// //                         Last {label}
// //                       </button>
// //                     ))}
// //                   </div>
// //                   <button
// //                     onClick={() => setShowDatePicker(false)}
// //                     className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition"
// //                   >
// //                     Apply
// //                   </button>
// //                 </div>
// //               )}
// //             </div>

// //             <button
// //               onClick={handleExportCSV}
// //               className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl shadow-sm shadow-emerald-200 transition-all"
// //             >
// //               <FaFileExcel /> Export CSV
// //             </button>
// //             <button
// //               onClick={() => window.print()}
// //               className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-xl shadow-sm shadow-purple-200 transition-all"
// //             >
// //               <FaPrint /> Print
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* ── Tabs ── */}
// //       <div className="flex gap-1 mb-7 bg-white border border-gray-100 rounded-2xl p-1.5 shadow-sm w-fit">
// //         {tabs.map(({ id, label, icon: Icon }) => (
// //           <button
// //             key={id}
// //             onClick={() => setReportType(id)}
// //             className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
// //               reportType === id
// //                 ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
// //                 : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
// //             }`}
// //           >
// //             <Icon size={14} /> {label}
// //           </button>
// //         ))}
// //       </div>

// //       {/* ════════════════════════════════════════
// //           OVERVIEW TAB
// //       ════════════════════════════════════════ */}
// //       {reportType === "overview" && (
// //         <div className="space-y-7">
// //           {/* KPI Cards */}
// //           <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
// //             <StatCard
// //               title="Total Revenue"
// //               value={formatCurrency(revenueData?.totalRevenue || 0)}
// //               subtitle="All-time earnings"
// //               icon={FaRupeeSign}
// //               gradient="bg-gradient-to-br from-indigo-500 to-indigo-700"
// //               accent="bg-gradient-to-r from-indigo-400 to-indigo-600"
// //             />
// //             <StatCard
// //               title="Total Bookings"
// //               value={(
// //                 bookingStats?.overview?.[0]?.totalBookings || 0
// //               ).toLocaleString()}
// //               subtitle="Across all statuses"
// //               icon={FaFileAlt}
// //               gradient="bg-gradient-to-br from-emerald-500 to-emerald-700"
// //               accent="bg-gradient-to-r from-emerald-400 to-emerald-600"
// //             />
// //             <StatCard
// //               title="Fleet Size"
// //               value={(vehicleStats?.total || 0).toLocaleString()}
// //               subtitle={`${vehicleStats?.available || 0} available now`}
// //               icon={FaCar}
// //               gradient="bg-gradient-to-br from-purple-500 to-purple-700"
// //               accent="bg-gradient-to-r from-purple-400 to-purple-600"
// //             />
// //             <StatCard
// //               title="Net Revenue"
// //               value={formatCurrency(revenueData?.totalCompanyRevenue || 0)}
// //               subtitle="After owner payouts"
// //               icon={FaChartLine}
// //               gradient="bg-gradient-to-br from-orange-500 to-orange-700"
// //               accent="bg-gradient-to-r from-orange-400 to-orange-600"
// //             />
// //           </div>

// //           {/* Area Chart - Revenue Trend */}
// //           <ChartCard>
// //             <SectionHeader
// //               icon={FaChartLine}
// //               title="Revenue & Bookings Trend"
// //               color="bg-indigo-500"
// //             />
// //             {dailyTrends.length > 0 ? (
// //               <ResponsiveContainer width="100%" height={340}>
// //                 <AreaChart
// //                   data={dailyTrends}
// //                   margin={{ top: 5, right: 10, bottom: 5, left: 10 }}
// //                 >
// //                   <defs>
// //                     <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
// //                       <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
// //                       <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
// //                     </linearGradient>
// //                     <linearGradient id="bookGrad" x1="0" y1="0" x2="0" y2="1">
// //                       <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
// //                       <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
// //                     </linearGradient>
// //                   </defs>
// //                   <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
// //                   <XAxis
// //                     dataKey="date"
// //                     tick={{ fontSize: 11, fill: "#94a3b8" }}
// //                     axisLine={false}
// //                     tickLine={false}
// //                   />
// //                   <YAxis
// //                     yAxisId="left"
// //                     tick={{ fontSize: 11, fill: "#94a3b8" }}
// //                     axisLine={false}
// //                     tickLine={false}
// //                     tickFormatter={(v) => `रु${(v / 1000).toFixed(0)}k`}
// //                   />
// //                   <YAxis
// //                     yAxisId="right"
// //                     orientation="right"
// //                     tick={{ fontSize: 11, fill: "#94a3b8" }}
// //                     axisLine={false}
// //                     tickLine={false}
// //                   />
// //                   <Tooltip content={<CustomTooltip currency />} />
// //                   <Legend
// //                     wrapperStyle={{ fontSize: "12px", paddingTop: "16px" }}
// //                   />
// //                   <Area
// //                     yAxisId="left"
// //                     type="monotone"
// //                     dataKey="revenue"
// //                     name="Revenue"
// //                     stroke="#6366f1"
// //                     strokeWidth={2.5}
// //                     fill="url(#revGrad)"
// //                     dot={false}
// //                     activeDot={{ r: 5, fill: "#6366f1" }}
// //                   />
// //                   <Area
// //                     yAxisId="right"
// //                     type="monotone"
// //                     dataKey="bookings"
// //                     name="Bookings"
// //                     stroke="#10b981"
// //                     strokeWidth={2.5}
// //                     fill="url(#bookGrad)"
// //                     dot={false}
// //                     activeDot={{ r: 5, fill: "#10b981" }}
// //                   />
// //                 </AreaChart>
// //               </ResponsiveContainer>
// //             ) : (
// //               <EmptyState message="No trend data for this period" />
// //             )}
// //           </ChartCard>

// //           {/* Bottom row */}
// //           <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
// //             {/* Top Vehicles - 3 cols */}
// //             <ChartCard className="lg:col-span-3">
// //               <SectionHeader
// //                 icon={FaCar}
// //                 title="Top Earning Vehicles"
// //                 color="bg-emerald-500"
// //               />
// //               {topVehicles.length > 0 ? (
// //                 <div className="space-y-3">
// //                   {topVehicles.slice(0, 5).map((v, i) => {
// //                     const maxRev = topVehicles[0].revenue || 1;
// //                     const pct = Math.round((v.revenue / maxRev) * 100);
// //                     return (
// //                       <div key={i} className="group">
// //                         <div className="flex items-center justify-between mb-1.5">
// //                           <div className="flex items-center gap-2.5">
// //                             <span
// //                               className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black text-white ${
// //                                 i === 0
// //                                   ? "bg-amber-400"
// //                                   : i === 1
// //                                     ? "bg-gray-400"
// //                                     : i === 2
// //                                       ? "bg-orange-400"
// //                                       : "bg-gray-200"
// //                               }`}
// //                             >
// //                               {i + 1}
// //                             </span>
// //                             <span className="text-sm font-semibold text-gray-700 truncate max-w-40">
// //                               {v.name}
// //                             </span>
// //                             <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
// //                               {v.bookings} trips
// //                             </span>
// //                           </div>
// //                           <span className="text-sm font-bold text-emerald-600 ml-2">
// //                             {formatCurrency(v.revenue)}
// //                           </span>
// //                         </div>
// //                         <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
// //                           <div
// //                             className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-700"
// //                             style={{ width: `${pct}%` }}
// //                           />
// //                         </div>
// //                       </div>
// //                     );
// //                   })}
// //                 </div>
// //               ) : (
// //                 <EmptyState message="No vehicle earnings data" />
// //               )}
// //             </ChartCard>

// //             {/* Booking Status Donut - 2 cols */}
// //             <ChartCard className="lg:col-span-2">
// //               <SectionHeader
// //                 icon={FaChartBar}
// //                 title="Booking Status"
// //                 color="bg-purple-500"
// //               />
// //               {bookingStatusDistribution.length > 0 ? (
// //                 <>
// //                   <ResponsiveContainer width="100%" height={200}>
// //                     <PieChart>
// //                       <Pie
// //                         data={bookingStatusDistribution}
// //                         cx="50%"
// //                         cy="50%"
// //                         innerRadius={55}
// //                         outerRadius={85}
// //                         paddingAngle={3}
// //                         dataKey="value"
// //                         labelLine={false}
// //                         label={renderCustomPieLabel}
// //                       >
// //                         {bookingStatusDistribution.map((entry, i) => (
// //                           <Cell
// //                             key={i}
// //                             fill={
// //                               statusColors[entry.name] ||
// //                               CHART_COLORS[i % CHART_COLORS.length]
// //                             }
// //                             stroke="white"
// //                             strokeWidth={2}
// //                           />
// //                         ))}
// //                       </Pie>
// //                       <Tooltip
// //                         formatter={(v, n) => [
// //                           v,
// //                           n.charAt(0).toUpperCase() + n.slice(1),
// //                         ]}
// //                       />
// //                     </PieChart>
// //                   </ResponsiveContainer>
// //                   <div className="grid grid-cols-2 gap-1.5 mt-1">
// //                     {bookingStatusDistribution.map((entry, i) => (
// //                       <div
// //                         key={i}
// //                         className="flex items-center gap-1.5 text-xs"
// //                       >
// //                         <span
// //                           className="w-2.5 h-2.5 rounded-full flex-shrink-0"
// //                           style={{
// //                             background:
// //                               statusColors[entry.name] ||
// //                               CHART_COLORS[i % CHART_COLORS.length],
// //                           }}
// //                         />
// //                         <span className="text-gray-500 capitalize truncate">
// //                           {entry.name}
// //                         </span>
// //                         <span className="font-bold text-gray-700 ml-auto">
// //                           {entry.value}
// //                         </span>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </>
// //               ) : (
// //                 <EmptyState message="No status data available" />
// //               )}
// //             </ChartCard>
// //           </div>
// //         </div>
// //       )}

// //       {/* ════════════════════════════════════════
// //           REVENUE TAB
// //       ════════════════════════════════════════ */}
// //       {reportType === "revenue" && (
// //         <div className="space-y-7">
// //           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
// //             <StatCard
// //               title="Total Revenue"
// //               value={formatCurrency(revenueData?.totalRevenue || 0)}
// //               subtitle="Gross earnings"
// //               icon={FaRupeeSign}
// //               gradient="bg-gradient-to-br from-indigo-500 to-indigo-700"
// //               accent="bg-gradient-to-r from-indigo-400 to-indigo-600"
// //             />
// //             <StatCard
// //               title="Company Revenue"
// //               value={formatCurrency(revenueData?.totalCompanyRevenue || 0)}
// //               subtitle="After commission split"
// //               icon={FaChartLine}
// //               gradient="bg-gradient-to-br from-purple-500 to-purple-700"
// //               accent="bg-gradient-to-r from-purple-400 to-purple-600"
// //             />
// //             <StatCard
// //               title="Owner Payouts"
// //               value={formatCurrency(revenueData?.totalOwnerPayout || 0)}
// //               subtitle="Paid to vehicle owners"
// //               icon={FaUsers}
// //               gradient="bg-gradient-to-br from-emerald-500 to-emerald-700"
// //               accent="bg-gradient-to-r from-emerald-400 to-emerald-600"
// //             />
// //           </div>

// //           {/* Revenue Area Chart */}
// //           <ChartCard>
// //             <SectionHeader
// //               icon={FaChartLine}
// //               title="Revenue Over Time"
// //               color="bg-indigo-500"
// //             />
// //             {dailyTrends.length > 0 ? (
// //               <ResponsiveContainer width="100%" height={320}>
// //                 <AreaChart
// //                   data={dailyTrends}
// //                   margin={{ top: 5, right: 10, bottom: 5, left: 10 }}
// //                 >
// //                   <defs>
// //                     <linearGradient id="revGrad2" x1="0" y1="0" x2="0" y2="1">
// //                       <stop
// //                         offset="5%"
// //                         stopColor="#6366f1"
// //                         stopOpacity={0.25}
// //                       />
// //                       <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
// //                     </linearGradient>
// //                   </defs>
// //                   <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
// //                   <XAxis
// //                     dataKey="date"
// //                     tick={{ fontSize: 11, fill: "#94a3b8" }}
// //                     axisLine={false}
// //                     tickLine={false}
// //                   />
// //                   <YAxis
// //                     tick={{ fontSize: 11, fill: "#94a3b8" }}
// //                     axisLine={false}
// //                     tickLine={false}
// //                     tickFormatter={(v) => `रु${(v / 1000).toFixed(0)}k`}
// //                   />
// //                   <Tooltip content={<CustomTooltip currency />} />
// //                   <Area
// //                     type="monotone"
// //                     dataKey="revenue"
// //                     name="Revenue"
// //                     stroke="#6366f1"
// //                     strokeWidth={3}
// //                     fill="url(#revGrad2)"
// //                     dot={false}
// //                     activeDot={{ r: 6, fill: "#6366f1", strokeWidth: 0 }}
// //                   />
// //                 </AreaChart>
// //               </ResponsiveContainer>
// //             ) : (
// //               <EmptyState message="No revenue trend data for this period" />
// //             )}
// //           </ChartCard>

// //           {/* Horizontal bar - top vehicles by revenue */}
// //           <ChartCard>
// //             <SectionHeader
// //               icon={FaChartBar}
// //               title="Top Earning Vehicles"
// //               color="bg-emerald-500"
// //             />
// //             {topVehicles.length > 0 ? (
// //               <ResponsiveContainer
// //                 width="100%"
// //                 height={Math.max(300, topVehicles.slice(0, 8).length * 52)}
// //               >
// //                 <BarChart
// //                   data={topVehicles.slice(0, 8)}
// //                   layout="vertical"
// //                   margin={{ left: 10, right: 30, top: 5, bottom: 5 }}
// //                 >
// //                   <CartesianGrid
// //                     strokeDasharray="3 3"
// //                     stroke="#f1f5f9"
// //                     horizontal={false}
// //                   />
// //                   <XAxis
// //                     type="number"
// //                     tick={{ fontSize: 11, fill: "#94a3b8" }}
// //                     axisLine={false}
// //                     tickLine={false}
// //                     tickFormatter={(v) => `रु${(v / 1000).toFixed(0)}k`}
// //                   />
// //                   <YAxis
// //                     type="category"
// //                     dataKey="name"
// //                     width={110}
// //                     tick={{ fontSize: 12, fill: "#475569", fontWeight: 600 }}
// //                     axisLine={false}
// //                     tickLine={false}
// //                   />
// //                   <Tooltip content={<CustomTooltip currency />} />
// //                   <Bar
// //                     dataKey="revenue"
// //                     name="Revenue"
// //                     radius={[0, 8, 8, 0]}
// //                     fill="url(#barGrad)"
// //                   >
// //                     <defs>
// //                       <linearGradient id="barGrad" x1="0" y1="0" x2="1" y2="0">
// //                         <stop offset="0%" stopColor="#6366f1" />
// //                         <stop offset="100%" stopColor="#10b981" />
// //                       </linearGradient>
// //                     </defs>
// //                     {topVehicles.slice(0, 8).map((_, i) => (
// //                       <Cell key={i} fill={`url(#barGrad)`} />
// //                     ))}
// //                   </Bar>
// //                 </BarChart>
// //               </ResponsiveContainer>
// //             ) : (
// //               <EmptyState message="No vehicle revenue data" />
// //             )}
// //           </ChartCard>

// //           <div className="flex items-center gap-3 bg-indigo-50 border border-indigo-100 rounded-xl px-5 py-3.5">
// //             <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
// //               <FaRupeeSign className="text-indigo-600 text-sm" />
// //             </div>
// //             <p className="text-sm text-indigo-800">
// //               <strong>Commission Structure:</strong> Admin vehicles → 100% to
// //               company &nbsp;|&nbsp; User-listed vehicles → 30% commission to
// //               company, 70% to owner
// //             </p>
// //           </div>
// //         </div>
// //       )}

// //       {/* ════════════════════════════════════════
// //           VEHICLES TAB
// //       ════════════════════════════════════════ */}
// //       {reportType === "vehicles" && (
// //         <div className="space-y-7">
// //           <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
// //             <StatCard
// //               title="Total"
// //               value={vehicleStats?.total || 0}
// //               icon={FaCar}
// //               gradient="bg-gradient-to-br from-indigo-500 to-indigo-700"
// //               accent="bg-gradient-to-r from-indigo-400 to-indigo-600"
// //             />
// //             <StatCard
// //               title="Admin Fleet"
// //               value={vehicleStats?.admin || 0}
// //               icon={FaCar}
// //               gradient="bg-gradient-to-br from-blue-500 to-blue-700"
// //               accent="bg-gradient-to-r from-blue-400 to-blue-600"
// //             />
// //             <StatCard
// //               title="User Listed"
// //               value={vehicleStats?.user || 0}
// //               icon={FaUsers}
// //               gradient="bg-gradient-to-br from-purple-500 to-purple-700"
// //               accent="bg-gradient-to-r from-purple-400 to-purple-600"
// //             />
// //             <StatCard
// //               title="Available"
// //               value={vehicleStats?.available || 0}
// //               icon={FaCheckCircle}
// //               gradient="bg-gradient-to-br from-emerald-500 to-emerald-700"
// //               accent="bg-gradient-to-r from-emerald-400 to-emerald-600"
// //             />
// //             <StatCard
// //               title="Booked"
// //               value={vehicleStats?.booked || 0}
// //               icon={FaCalendarAlt}
// //               gradient="bg-gradient-to-br from-orange-500 to-orange-700"
// //               accent="bg-gradient-to-r from-orange-400 to-orange-600"
// //             />
// //           </div>

// //           {/* Fleet utilization visual */}
// //           {vehicleStats && vehicleStats.total > 0 && (
// //             <ChartCard>
// //               <SectionHeader
// //                 icon={FaChartBar}
// //                 title="Fleet Utilization"
// //                 color="bg-indigo-500"
// //               />
// //               <div className="space-y-4">
// //                 {[
// //                   {
// //                     label: "Available",
// //                     count: vehicleStats.available,
// //                     color: "bg-emerald-500",
// //                   },
// //                   {
// //                     label: "Booked",
// //                     count: vehicleStats.booked,
// //                     color: "bg-indigo-500",
// //                   },
// //                   {
// //                     label: "Maintenance",
// //                     count: vehicleStats.maintenance,
// //                     color: "bg-amber-500",
// //                   },
// //                 ].map(({ label, count, color }) => {
// //                   const pct =
// //                     vehicleStats.total > 0
// //                       ? ((count / vehicleStats.total) * 100).toFixed(1)
// //                       : 0;
// //                   return (
// //                     <div key={label}>
// //                       <div className="flex justify-between text-sm mb-1.5">
// //                         <span className="font-semibold text-gray-700">
// //                           {label}
// //                         </span>
// //                         <span className="text-gray-500">
// //                           {count} vehicles{" "}
// //                           <span className="text-gray-400">({pct}%)</span>
// //                         </span>
// //                       </div>
// //                       <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
// //                         <div
// //                           className={`h-full ${color} rounded-full transition-all duration-700`}
// //                           style={{ width: `${pct}%` }}
// //                         />
// //                       </div>
// //                     </div>
// //                   );
// //                 })}
// //               </div>
// //             </ChartCard>
// //           )}

// //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //             {/* Donut - vehicle type dist */}
// //             <ChartCard>
// //               <SectionHeader
// //                 icon={FaCar}
// //                 title="Vehicle Type Distribution"
// //                 color="bg-purple-500"
// //               />
// //               {vehicleTypeDistribution.length > 0 ? (
// //                 <>
// //                   <ResponsiveContainer width="100%" height={240}>
// //                     <PieChart>
// //                       <Pie
// //                         data={vehicleTypeDistribution}
// //                         cx="50%"
// //                         cy="50%"
// //                         innerRadius={60}
// //                         outerRadius={95}
// //                         paddingAngle={3}
// //                         dataKey="value"
// //                         label={renderCustomPieLabel}
// //                         labelLine={false}
// //                       >
// //                         {vehicleTypeDistribution.map((_, i) => (
// //                           <Cell
// //                             key={i}
// //                             fill={CHART_COLORS[i % CHART_COLORS.length]}
// //                             stroke="white"
// //                             strokeWidth={2}
// //                           />
// //                         ))}
// //                       </Pie>
// //                       <Tooltip />
// //                     </PieChart>
// //                   </ResponsiveContainer>
// //                   <div className="grid grid-cols-2 gap-2 mt-2">
// //                     {vehicleTypeDistribution.map((d, i) => (
// //                       <div key={i} className="flex items-center gap-2 text-xs">
// //                         <span
// //                           className="w-3 h-3 rounded-full flex-shrink-0"
// //                           style={{
// //                             background: CHART_COLORS[i % CHART_COLORS.length],
// //                           }}
// //                         />
// //                         <span className="text-gray-600 truncate">{d.name}</span>
// //                         <span className="font-bold text-gray-800 ml-auto">
// //                           {d.value}
// //                         </span>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </>
// //               ) : (
// //                 <EmptyState message="No vehicle data available" />
// //               )}
// //             </ChartCard>

// //             {/* Bar - type dist */}
// //             <ChartCard>
// //               <SectionHeader
// //                 icon={FaChartBar}
// //                 title="Vehicles by Type"
// //                 color="bg-blue-500"
// //               />
// //               {vehicleTypeDistribution.length > 0 ? (
// //                 <ResponsiveContainer width="100%" height={280}>
// //                   <BarChart
// //                     data={vehicleTypeDistribution}
// //                     margin={{ top: 5, right: 10, bottom: 25, left: 5 }}
// //                   >
// //                     <CartesianGrid
// //                       strokeDasharray="3 3"
// //                       stroke="#f1f5f9"
// //                       vertical={false}
// //                     />
// //                     <XAxis
// //                       dataKey="name"
// //                       tick={{ fontSize: 11, fill: "#94a3b8" }}
// //                       axisLine={false}
// //                       tickLine={false}
// //                       angle={-30}
// //                       textAnchor="end"
// //                     />
// //                     <YAxis
// //                       tick={{ fontSize: 11, fill: "#94a3b8" }}
// //                       axisLine={false}
// //                       tickLine={false}
// //                     />
// //                     <Tooltip />
// //                     <Bar dataKey="value" name="Vehicles" radius={[6, 6, 0, 0]}>
// //                       {vehicleTypeDistribution.map((_, i) => (
// //                         <Cell
// //                           key={i}
// //                           fill={CHART_COLORS[i % CHART_COLORS.length]}
// //                         />
// //                       ))}
// //                     </Bar>
// //                   </BarChart>
// //                 </ResponsiveContainer>
// //               ) : (
// //                 <EmptyState message="No type data available" />
// //               )}
// //             </ChartCard>
// //           </div>
// //         </div>
// //       )}

// //       {/* ════════════════════════════════════════
// //           BOOKINGS TAB
// //       ════════════════════════════════════════ */}
// //       {reportType === "bookings" && (
// //         <div className="space-y-7">
// //           <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
// //             <StatCard
// //               title="Total Bookings"
// //               value={(
// //                 bookingStats?.overview?.[0]?.totalBookings || 0
// //               ).toLocaleString()}
// //               icon={FaFileAlt}
// //               gradient="bg-gradient-to-br from-indigo-500 to-indigo-700"
// //               accent="bg-gradient-to-r from-indigo-400 to-indigo-600"
// //             />
// //             <StatCard
// //               title="Pending"
// //               value={bookingStats?.overview?.[0]?.pendingBookings || 0}
// //               subtitle="Awaiting approval"
// //               icon={FaClock}
// //               gradient="bg-gradient-to-br from-amber-500 to-amber-700"
// //               accent="bg-gradient-to-r from-amber-400 to-amber-600"
// //             />
// //             <StatCard
// //               title="Active Rides"
// //               value={bookingStats?.overview?.[0]?.activeBookings || 0}
// //               subtitle="Currently on road"
// //               icon={FaCar}
// //               gradient="bg-gradient-to-br from-emerald-500 to-emerald-700"
// //               accent="bg-gradient-to-r from-emerald-400 to-emerald-600"
// //             />
// //             <StatCard
// //               title="Avg. Booking Value"
// //               value={formatCurrency(
// //                 bookingStats?.overview?.[0]?.avgBookingValue || 0,
// //               )}
// //               icon={FaRupeeSign}
// //               gradient="bg-gradient-to-br from-purple-500 to-purple-700"
// //               accent="bg-gradient-to-r from-purple-400 to-purple-600"
// //             />
// //           </div>

// //           <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
// //             {/* Bookings by Status bar */}
// //             <ChartCard className="lg:col-span-3">
// //               <SectionHeader
// //                 icon={FaChartBar}
// //                 title="Bookings by Status"
// //                 color="bg-indigo-500"
// //               />
// //               {bookingStatusDistribution.length > 0 ? (
// //                 <ResponsiveContainer width="100%" height={280}>
// //                   <BarChart
// //                     data={bookingStatusDistribution}
// //                     margin={{ top: 5, right: 10, bottom: 5, left: 5 }}
// //                   >
// //                     <CartesianGrid
// //                       strokeDasharray="3 3"
// //                       stroke="#f1f5f9"
// //                       vertical={false}
// //                     />
// //                     <XAxis
// //                       dataKey="name"
// //                       tick={{ fontSize: 11, fill: "#94a3b8" }}
// //                       axisLine={false}
// //                       tickLine={false}
// //                     />
// //                     <YAxis
// //                       tick={{ fontSize: 11, fill: "#94a3b8" }}
// //                       axisLine={false}
// //                       tickLine={false}
// //                     />
// //                     <Tooltip content={<CustomTooltip />} />
// //                     <Bar dataKey="value" name="Bookings" radius={[6, 6, 0, 0]}>
// //                       {bookingStatusDistribution.map((entry, i) => (
// //                         <Cell
// //                           key={i}
// //                           fill={
// //                             statusColors[entry.name] ||
// //                             CHART_COLORS[i % CHART_COLORS.length]
// //                           }
// //                         />
// //                       ))}
// //                     </Bar>
// //                   </BarChart>
// //                 </ResponsiveContainer>
// //               ) : (
// //                 <EmptyState message="No booking status data" />
// //               )}
// //             </ChartCard>

// //             {/* Donut */}
// //             <ChartCard className="lg:col-span-2">
// //               <SectionHeader
// //                 icon={FaChartBar}
// //                 title="Status Split"
// //                 color="bg-purple-500"
// //               />
// //               {bookingStatusDistribution.length > 0 ? (
// //                 <>
// //                   <ResponsiveContainer width="100%" height={190}>
// //                     <PieChart>
// //                       <Pie
// //                         data={bookingStatusDistribution}
// //                         cx="50%"
// //                         cy="50%"
// //                         innerRadius={50}
// //                         outerRadius={78}
// //                         paddingAngle={3}
// //                         dataKey="value"
// //                         labelLine={false}
// //                         label={renderCustomPieLabel}
// //                       >
// //                         {bookingStatusDistribution.map((entry, i) => (
// //                           <Cell
// //                             key={i}
// //                             fill={
// //                               statusColors[entry.name] ||
// //                               CHART_COLORS[i % CHART_COLORS.length]
// //                             }
// //                             stroke="white"
// //                             strokeWidth={2}
// //                           />
// //                         ))}
// //                       </Pie>
// //                       <Tooltip />
// //                     </PieChart>
// //                   </ResponsiveContainer>
// //                   <div className="space-y-1.5 mt-1">
// //                     {bookingStatusDistribution.map((entry, i) => {
// //                       const total = bookingStatusDistribution.reduce(
// //                         (s, x) => s + x.value,
// //                         0,
// //                       );
// //                       return (
// //                         <div
// //                           key={i}
// //                           className="flex items-center gap-2 text-xs"
// //                         >
// //                           <span
// //                             className="w-2.5 h-2.5 rounded-full flex-shrink-0"
// //                             style={{
// //                               background:
// //                                 statusColors[entry.name] ||
// //                                 CHART_COLORS[i % CHART_COLORS.length],
// //                             }}
// //                           />
// //                           <span className="text-gray-500 capitalize">
// //                             {entry.name}
// //                           </span>
// //                           <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden mx-1">
// //                             <div
// //                               className="h-full rounded-full"
// //                               style={{
// //                                 width: `${((entry.value / total) * 100).toFixed(0)}%`,
// //                                 background:
// //                                   statusColors[entry.name] ||
// //                                   CHART_COLORS[i % CHART_COLORS.length],
// //                               }}
// //                             />
// //                           </div>
// //                           <span className="font-bold text-gray-700">
// //                             {entry.value}
// //                           </span>
// //                         </div>
// //                       );
// //                     })}
// //                   </div>
// //                 </>
// //               ) : (
// //                 <EmptyState message="No data available" />
// //               )}
// //             </ChartCard>
// //           </div>

// //           {/* Daily booking trends */}
// //           <ChartCard>
// //             <SectionHeader
// //               icon={FaChartLine}
// //               title="Daily Booking Trend"
// //               color="bg-emerald-500"
// //             />
// //             {dailyTrends.length > 0 ? (
// //               <ResponsiveContainer width="100%" height={300}>
// //                 <AreaChart
// //                   data={dailyTrends}
// //                   margin={{ top: 5, right: 10, bottom: 5, left: 5 }}
// //                 >
// //                   <defs>
// //                     <linearGradient id="bookGrad2" x1="0" y1="0" x2="0" y2="1">
// //                       <stop
// //                         offset="5%"
// //                         stopColor="#10b981"
// //                         stopOpacity={0.25}
// //                       />
// //                       <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
// //                     </linearGradient>
// //                   </defs>
// //                   <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
// //                   <XAxis
// //                     dataKey="date"
// //                     tick={{ fontSize: 11, fill: "#94a3b8" }}
// //                     axisLine={false}
// //                     tickLine={false}
// //                   />
// //                   <YAxis
// //                     tick={{ fontSize: 11, fill: "#94a3b8" }}
// //                     axisLine={false}
// //                     tickLine={false}
// //                   />
// //                   <Tooltip content={<CustomTooltip />} />
// //                   <Area
// //                     type="monotone"
// //                     dataKey="bookings"
// //                     name="Bookings"
// //                     stroke="#10b981"
// //                     strokeWidth={3}
// //                     fill="url(#bookGrad2)"
// //                     dot={false}
// //                     activeDot={{ r: 6, fill: "#10b981", strokeWidth: 0 }}
// //                   />
// //                 </AreaChart>
// //               </ResponsiveContainer>
// //             ) : (
// //               <EmptyState message="No daily trend data for this period" />
// //             )}
// //           </ChartCard>
// //         </div>
// //       )}

// //       {/* ── Footer ── */}
// //       <div className="mt-10 pt-6 border-t border-gray-100 text-center text-xs text-gray-400 space-y-1 print:mt-4">
// //         <p>Report generated on {new Date().toLocaleString()}</p>
// //         <p>
// //           Period: {formatDate(dateRange.start)} → {formatDate(dateRange.end)}
// //         </p>
// //         <p>© {new Date().getFullYear()} RentRide — All Rights Reserved</p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminReports;



// // frontend/src/AdminDashboard/AdminReports.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   FaChartLine,
//   FaFileAlt,
//   FaDownload,
//   FaCar,
//   FaUsers,
//   FaRupeeSign,
//   FaCalendarAlt,
//   FaSpinner,
//   FaChartBar,
//   FaEye,
//   FaTimes,
//   FaPrint,
//   FaFileExcel,
//   FaFilter,
//   FaClock,
//   FaCheckCircle,
//   FaArrowUp,
//   FaArrowDown,
// } from "react-icons/fa";
// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   Area,
//   AreaChart,
//   RadialBarChart,
//   RadialBar,
// } from "recharts";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const API_URL = "http://localhost:5000/api";

// /* ─────────────────────────────────────────
//    Custom Tooltip for charts
// ───────────────────────────────────────── */
// const CustomTooltip = ({ active, payload, label, currency }) => {
//   if (!active || !payload || !payload.length) return null;
//   return (
//     <div className="bg-white border border-gray-100 shadow-2xl rounded-xl px-4 py-3 text-sm">
//       <p className="font-semibold text-gray-700 mb-2 border-b border-gray-100 pb-1">
//         {label}
//       </p>
//       {payload.map((p, i) => (
//         <div key={i} className="flex items-center gap-2 py-0.5">
//           <span className="w-2.5 h-2.5 rounded-full" style={{ background: p.color }} />
//           <span className="text-gray-500">{p.name}:</span>
//           <span className="font-bold text-gray-800">
//             {currency ? `रु ${(p.value || 0).toLocaleString("en-NP")}` : p.value}
//           </span>
//         </div>
//       ))}
//     </div>
//   );
// };

// /* ─────────────────────────────────────────
//    Custom Pie label
// ───────────────────────────────────────── */
// const renderCustomPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
//   if (percent < 0.05) return null;
//   const RADIAN = Math.PI / 180;
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);
//   return (
//     <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={700}>
//       {`${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };

// /* ─────────────────────────────────────────
//    Main Component
// ───────────────────────────────────────── */
// const AdminReports = () => {
//   const [loading, setLoading] = useState(true);
//   const [dateRange, setDateRange] = useState({
//     start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
//     end: new Date().toISOString().split("T")[0],
//   });
//   const [reportType, setReportType] = useState("overview");
//   const [showDatePicker, setShowDatePicker] = useState(false);

//   const [bookingStats, setBookingStats] = useState(null);
//   const [revenueData, setRevenueData] = useState(null);
//   const [vehicleStats, setVehicleStats] = useState(null);
//   const [dailyTrends, setDailyTrends] = useState([]);
//   const [topVehicles, setTopVehicles] = useState([]);
//   const [bookingStatusDistribution, setBookingStatusDistribution] = useState([]);
//   const [vehicleTypeDistribution, setVehicleTypeDistribution] = useState([]);
//   const [userStats, setUserStats] = useState({ total: 0, active: 0 });

//   // Separate tracking for source breakdown (for Revenue tab)
//   const [revenueSourceBreakdown, setRevenueSourceBreakdown] = useState({
//     adminRevenue: 0,
//     userVehicleCommission: 0,
//     ownerPayouts: 0,
//   });

//   const CHART_COLORS = [
//     "#6366f1", "#10b981", "#f59e0b", "#ef4444",
//     "#8b5cf6", "#06b6d4", "#f97316", "#84cc16",
//   ];

//   useEffect(() => {
//     fetchAllReportData();
//   }, [dateRange]);

//   const fetchAllReportData = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         toast.error("Please login to view reports");
//         setLoading(false);
//         return;
//       }
//       const headers = { Authorization: `Bearer ${token}` };
//       const params = {};
//       if (dateRange.start) params.startDate = dateRange.start;
//       if (dateRange.end) params.endDate = dateRange.end;

//       // ── 1. Booking stats (overview counts) ──
//       try {
//         const res = await axios.get(`${API_URL}/bookings/admin/stats`, { params, headers });
//         if (res.data.success) setBookingStats(res.data.data);
//       } catch (e) { console.error("Booking stats:", e.message); }

//       // ── 2. Combined revenue (uses both admin + user vehicle revenue) ──
//       try {
//         const res = await axios.get(`${API_URL}/revenue/combined`, { params, headers });
//         if (res.data.success) setRevenueData(res.data.data);
//       } catch (e) { console.error("Revenue:", e.message); }

//       // ── 3. COMBINED bookings: admin vehicles + user-listed vehicles ──
//       //    This is the key fix — AdminRevenue fetches BOTH endpoints; we do the same here.
//       let allBookings = [];

//       try {
//         // 3a. Admin-vehicle bookings
//         const adminRes = await axios.get(`${API_URL}/bookings/admin/all`, { params, headers });
//         if (adminRes.data.success && adminRes.data.data.bookings) {
//           const adminBookings = adminRes.data.data.bookings.map((b) => ({
//             ...b,
//             _source: "admin",
//           }));
//           allBookings = [...allBookings, ...adminBookings];
//         }
//       } catch (e) { console.error("Admin bookings:", e.message); }

//       try {
//         // 3b. User-vehicle bookings (from the revenue endpoint — same shape AdminRevenue uses)
//         const userRes = await axios.get(`${API_URL}/revenue/user-vehicles`, { params, headers });
//         if (userRes.data.success && userRes.data.data?.bookings) {
//           const userBookings = userRes.data.data.bookings.map((b) => ({
//             ...b,
//             _source: "user",
//           }));
//           allBookings = [...allBookings, ...userBookings];

//           // Capture breakdown for Revenue tab
//           const summary = userRes.data.data.summary || {};
//           setRevenueSourceBreakdown((prev) => ({
//             ...prev,
//             userVehicleCommission: summary.totalCompanyRevenue || 0,
//             ownerPayouts: summary.totalOwnerRevenue || 0,
//           }));
//         }
//       } catch (e) { console.error("User vehicle bookings:", e.message); }

//       // Process combined booking data
//       if (allBookings.length > 0) {
//         setDailyTrends(processDailyTrends(allBookings));
//         setTopVehicles(processTopVehicles(allBookings));
//         setBookingStatusDistribution(processStatusDistribution(allBookings));
//       }

//       // ── 4. Vehicle fleet stats ──
//       try {
//         const uvRes = await axios.get(`${API_URL}/user-vehicles/admin/all`, {
//           params: { limit: 1000 },
//           headers,
//         });
//         const avRes = await axios.get(`${API_URL}/vehicles`, { headers });
//         const userVehicles = uvRes.data?.data?.vehicles || [];
//         const adminVehicles = avRes.data || [];
//         const all = [...adminVehicles, ...userVehicles];
//         setVehicleTypeDistribution(processVehicleTypeDistribution(all));
//         setVehicleStats({
//           total: all.length,
//           admin: adminVehicles.length,
//           user: userVehicles.length,
//           available: all.filter((v) => v.status === "Available" || v.status === "active").length,
//           booked: all.filter((v) => v.status === "Booked" || v.status === "booked").length,
//           maintenance: all.filter((v) => v.status === "Maintenance").length,
//         });
//       } catch (e) {
//         console.error("Vehicles:", e.message);
//         setVehicleStats({ total: 0, admin: 0, user: 0, available: 0, booked: 0, maintenance: 0 });
//       }

//       // ── 5. User counts ──
//       try {
//         const res = await axios.get(`${API_URL}/auth/users/count`, { headers });
//         setUserStats({ total: res.data?.count || 0, active: res.data?.activeCount || 0 });
//       } catch (e) { console.error("Users:", e.message); }

//     } catch (error) {
//       toast.error("Failed to load report data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ── Data processors (unchanged, but now receive combined bookings) ── */
//   const processDailyTrends = (bookings) => {
//     const trends = {};
//     bookings.forEach((b) => {
//       const date = new Date(b.createdAt).toLocaleDateString("en-US", {
//         month: "short", day: "numeric",
//       });
//       if (!trends[date]) trends[date] = { date, bookings: 0, revenue: 0 };
//       trends[date].bookings++;
//       trends[date].revenue += b.totalAmount || 0;
//     });
//     return Object.values(trends)
//       .sort((a, b) => new Date(a.date) - new Date(b.date))
//       .slice(-30);
//   };

//   const processTopVehicles = (bookings) => {
//     const map = {};
//     bookings.forEach((b) => {
//       const name = b.vehicle?.carName || "Unknown";
//       if (!map[name]) map[name] = { name, revenue: 0, bookings: 0 };
//       map[name].revenue += b.totalAmount || 0;
//       map[name].bookings++;
//     });
//     return Object.values(map).sort((a, b) => b.revenue - a.revenue).slice(0, 10);
//   };

//   const processStatusDistribution = (bookings) => {
//     const dist = {};
//     bookings.forEach((b) => {
//       const s = b.status || "pending";
//       if (!dist[s]) dist[s] = { name: s, value: 0 };
//       dist[s].value++;
//     });
//     return Object.values(dist);
//   };

//   const processVehicleTypeDistribution = (vehicles) => {
//     const dist = {};
//     vehicles.forEach((v) => {
//       const t = v.carType || "Other";
//       if (!dist[t]) dist[t] = { name: t, value: 0 };
//       dist[t].value++;
//     });
//     return Object.values(dist);
//   };

//   const formatCurrency = (amount) => "रु " + (amount || 0).toLocaleString("en-NP");
//   const formatDate = (date) =>
//     new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

//   const exportToCSV = (data, filename) => {
//     if (!data || data.length === 0) { toast.warning("No data to export"); return; }
//     const headers = Object.keys(data[0]);
//     const csvContent = [
//       headers.join(","),
//       ...data.map((row) => headers.map((h) => JSON.stringify(row[h] || "")).join(",")),
//     ].join("\n");
//     const blob = new Blob([csvContent], { type: "text/csv" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `${filename}.csv`;
//     a.click();
//     URL.revokeObjectURL(url);
//     toast.success("Report exported successfully!");
//   };

//   const handleExportCSV = () => {
//     const map = {
//       overview: dailyTrends,
//       revenue: topVehicles,
//       vehicles: vehicleTypeDistribution,
//       bookings: bookingStatusDistribution,
//     };
//     exportToCSV(map[reportType] || dailyTrends, `${reportType}_report_${dateRange.start}_to_${dateRange.end}`);
//   };

//   /* ── Sub-components ── */
//   const StatCard = ({ title, value, subtitle, icon: Icon, gradient, accent }) => (
//     <div className="relative bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
//       <div className={`h-1 w-full ${accent}`} />
//       <div className="p-5">
//         <div className="flex items-start justify-between">
//           <div className="flex-1 min-w-0">
//             <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">{title}</p>
//             <p className="text-2xl font-black text-gray-800 truncate">{value}</p>
//             {subtitle && <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">{subtitle}</p>}
//           </div>
//           <div className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center ${gradient} shadow-md ml-3`}>
//             <Icon className="text-white text-lg" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const SectionHeader = ({ icon: Icon, title, color }) => (
//     <h3 className="text-base font-bold text-gray-800 mb-5 flex items-center gap-2.5">
//       <span className={`w-7 h-7 rounded-lg flex items-center justify-center ${color}`}>
//         <Icon className="text-white text-sm" />
//       </span>
//       {title}
//     </h3>
//   );

//   const EmptyState = ({ message }) => (
//     <div className="flex flex-col items-center justify-center py-14 text-gray-400">
//       <FaChartBar className="text-4xl mb-3 opacity-25" />
//       <p className="text-sm font-medium">{message}</p>
//     </div>
//   );

//   const ChartCard = ({ children, className = "" }) => (
//     <div className={`bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300 ${className}`}>
//       {children}
//     </div>
//   );

//   // ── Source breakdown pill (shows admin vs user vehicle split in totals) ──
//   const SourceBadge = ({ adminCount, userCount }) => (
//     <div className="flex gap-2 mt-2">
//       <span className="inline-flex items-center gap-1 text-xs font-semibold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-100">
//         <FaCar size={9} /> Admin: {adminCount}
//       </span>
//       <span className="inline-flex items-center gap-1 text-xs font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-100">
//         <FaUsers size={9} /> User: {userCount}
//       </span>
//     </div>
//   );

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-50">
//         <div className="text-center">
//           <div className="relative w-16 h-16 mx-auto mb-5">
//             <div className="absolute inset-0 rounded-full border-4 border-indigo-100" />
//             <div className="absolute inset-0 rounded-full border-4 border-t-indigo-600 animate-spin" />
//           </div>
//           <p className="text-sm font-semibold text-gray-500 tracking-wide uppercase">Loading Analytics</p>
//         </div>
//       </div>
//     );
//   }

//   const tabs = [
//     { id: "overview", label: "Overview", icon: FaChartLine },
//     { id: "revenue", label: "Revenue", icon: FaRupeeSign },
//     { id: "vehicles", label: "Vehicles", icon: FaCar },
//     { id: "bookings", label: "Bookings", icon: FaFileAlt },
//   ];

//   const statusColors = {
//     pending: "#f59e0b", approved: "#6366f1", confirmed: "#10b981",
//     active: "#06b6d4", completed: "#8b5cf6", cancelled: "#ef4444", rejected: "#f97316",
//   };

//   // Compute combined booking counts
//   const totalBookings = bookingStatusDistribution.reduce((s, x) => s + x.value, 0);

//   return (
//     <div className="min-h-screen bg-gray-50/70 p-6 lg:p-8">
//       <ToastContainer position="top-right" autoClose={3000} />

//       {/* ── Page Header ── */}
//       <div className="mb-7">
//         <div className="flex flex-wrap justify-between items-start gap-4">
//           <div>
//             <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2.5 tracking-tight">
//               <span className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md shadow-indigo-200">
//                 <FaChartLine className="text-white text-base" />
//               </span>
//               Reports & Analytics
//             </h1>
//             <p className="text-sm text-gray-500 mt-1.5 ml-12">
//               Detailed insights — admin fleet + user-listed vehicles combined
//             </p>
//           </div>

//           <div className="flex flex-wrap gap-2.5 items-center">
//             {/* Date Range Picker */}
//             <div className="relative">
//               <button
//                 onClick={() => setShowDatePicker(!showDatePicker)}
//                 className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:border-indigo-400 hover:text-indigo-600 shadow-sm transition-all"
//               >
//                 <FaCalendarAlt className="text-indigo-400" />
//                 {formatDate(dateRange.start)} — {formatDate(dateRange.end)}
//                 <FaFilter className="text-gray-300 text-xs ml-1" />
//               </button>
//               {showDatePicker && (
//                 <div className="absolute top-full mt-2 right-0 bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 z-30 w-76 min-w-72">
//                   <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Date Range</p>
//                   <div className="space-y-3 mb-4">
//                     <div>
//                       <label className="block text-xs font-semibold text-gray-600 mb-1">From</label>
//                       <input type="date" value={dateRange.start}
//                         onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
//                         className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-xs font-semibold text-gray-600 mb-1">To</label>
//                       <input type="date" value={dateRange.end}
//                         onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
//                         className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400"
//                       />
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-2 gap-2 mb-3">
//                     {[{ label: "7 Days", days: 7 }, { label: "30 Days", days: 30 }, { label: "90 Days", days: 90 }, { label: "This Year", days: 365 }].map(({ label, days }) => (
//                       <button key={days}
//                         onClick={() => { setDateRange({ start: new Date(Date.now() - days * 86400000).toISOString().split("T")[0], end: new Date().toISOString().split("T")[0] }); setShowDatePicker(false); }}
//                         className="px-3 py-1.5 text-xs font-semibold bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition border border-gray-100"
//                       >
//                         Last {label}
//                       </button>
//                     ))}
//                   </div>
//                   <button onClick={() => setShowDatePicker(false)} className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition">
//                     Apply
//                   </button>
//                 </div>
//               )}
//             </div>

//             <button onClick={handleExportCSV} className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl shadow-sm shadow-emerald-200 transition-all">
//               <FaFileExcel /> Export CSV
//             </button>
//             <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-xl shadow-sm shadow-purple-200 transition-all">
//               <FaPrint /> Print
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ── Tabs ── */}
//       <div className="flex gap-1 mb-7 bg-white border border-gray-100 rounded-2xl p-1.5 shadow-sm w-fit">
//         {tabs.map(({ id, label, icon: Icon }) => (
//           <button key={id} onClick={() => setReportType(id)}
//             className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${reportType === id ? "bg-indigo-600 text-white shadow-md shadow-indigo-200" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}
//           >
//             <Icon size={14} /> {label}
//           </button>
//         ))}
//       </div>

//       {/* ════════════════════════════════════════
//           OVERVIEW TAB
//       ════════════════════════════════════════ */}
//       {reportType === "overview" && (
//         <div className="space-y-7">
//           {/* KPI Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
//             <StatCard
//               title="Total Revenue"
//               value={formatCurrency(revenueData?.totalRevenue || 0)}
//               subtitle="Admin + user-listed vehicles"
//               icon={FaRupeeSign}
//               gradient="bg-gradient-to-br from-indigo-500 to-indigo-700"
//               accent="bg-gradient-to-r from-indigo-400 to-indigo-600"
//             />
//             <StatCard
//               title="Total Bookings"
//               value={totalBookings.toLocaleString()}
//               subtitle="All vehicles, all statuses"
//               icon={FaFileAlt}
//               gradient="bg-gradient-to-br from-emerald-500 to-emerald-700"
//               accent="bg-gradient-to-r from-emerald-400 to-emerald-600"
//             />
//             <StatCard
//               title="Fleet Size"
//               value={(vehicleStats?.total || 0).toLocaleString()}
//               subtitle={`${vehicleStats?.available || 0} available now`}
//               icon={FaCar}
//               gradient="bg-gradient-to-br from-purple-500 to-purple-700"
//               accent="bg-gradient-to-r from-purple-400 to-purple-600"
//             />
//             <StatCard
//               title="Net Revenue"
//               value={formatCurrency(revenueData?.totalCompanyRevenue || 0)}
//               subtitle="After owner payouts"
//               icon={FaChartLine}
//               gradient="bg-gradient-to-br from-orange-500 to-orange-700"
//               accent="bg-gradient-to-r from-orange-400 to-orange-600"
//             />
//           </div>

//           {/* Source split info bar */}
//           <div className="flex items-center gap-3 bg-indigo-50 border border-indigo-100 rounded-xl px-5 py-3">
//             <FaChartBar className="text-indigo-400 flex-shrink-0" />
//             <p className="text-sm text-indigo-800">
//               All charts below include bookings from <strong>both admin-owned vehicles</strong> and <strong>user-listed vehicles</strong>.
//             </p>
//           </div>

//           {/* Area Chart - Revenue & Bookings Trend */}
//           <ChartCard>
//             <SectionHeader icon={FaChartLine} title="Revenue & Bookings Trend (Combined)" color="bg-indigo-500" />
//             {dailyTrends.length > 0 ? (
//               <ResponsiveContainer width="100%" height={340}>
//                 <AreaChart data={dailyTrends} margin={{ top: 5, right: 10, bottom: 5, left: 10 }}>
//                   <defs>
//                     <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
//                       <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
//                     </linearGradient>
//                     <linearGradient id="bookGrad" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
//                       <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
//                     </linearGradient>
//                   </defs>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
//                   <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
//                   <YAxis yAxisId="left" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `रु${(v / 1000).toFixed(0)}k`} />
//                   <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
//                   <Tooltip content={<CustomTooltip currency />} />
//                   <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "16px" }} />
//                   <Area yAxisId="left" type="monotone" dataKey="revenue" name="Revenue" stroke="#6366f1" strokeWidth={2.5} fill="url(#revGrad)" dot={false} activeDot={{ r: 5, fill: "#6366f1" }} />
//                   <Area yAxisId="right" type="monotone" dataKey="bookings" name="Bookings" stroke="#10b981" strokeWidth={2.5} fill="url(#bookGrad)" dot={false} activeDot={{ r: 5, fill: "#10b981" }} />
//                 </AreaChart>
//               </ResponsiveContainer>
//             ) : (
//               <EmptyState message="No trend data for this period" />
//             )}
//           </ChartCard>

//           {/* Bottom row */}
//           <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
//             {/* Top Vehicles - 3 cols */}
//             <ChartCard className="lg:col-span-3">
//               <SectionHeader icon={FaCar} title="Top Earning Vehicles (All Sources)" color="bg-emerald-500" />
//               {topVehicles.length > 0 ? (
//                 <div className="space-y-3">
//                   {topVehicles.slice(0, 5).map((v, i) => {
//                     const maxRev = topVehicles[0].revenue || 1;
//                     const pct = Math.round((v.revenue / maxRev) * 100);
//                     return (
//                       <div key={i} className="group">
//                         <div className="flex items-center justify-between mb-1.5">
//                           <div className="flex items-center gap-2.5">
//                             <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black text-white ${i === 0 ? "bg-amber-400" : i === 1 ? "bg-gray-400" : i === 2 ? "bg-orange-400" : "bg-gray-200"}`}>
//                               {i + 1}
//                             </span>
//                             <span className="text-sm font-semibold text-gray-700 truncate max-w-40">{v.name}</span>
//                             <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">{v.bookings} trips</span>
//                           </div>
//                           <span className="text-sm font-bold text-emerald-600 ml-2">{formatCurrency(v.revenue)}</span>
//                         </div>
//                         <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
//                           <div className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               ) : (
//                 <EmptyState message="No vehicle earnings data" />
//               )}
//             </ChartCard>

//             {/* Booking Status Donut - 2 cols */}
//             <ChartCard className="lg:col-span-2">
//               <SectionHeader icon={FaChartBar} title="Booking Status" color="bg-purple-500" />
//               {bookingStatusDistribution.length > 0 ? (
//                 <>
//                   <ResponsiveContainer width="100%" height={200}>
//                     <PieChart>
//                       <Pie data={bookingStatusDistribution} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value" labelLine={false} label={renderCustomPieLabel}>
//                         {bookingStatusDistribution.map((entry, i) => (
//                           <Cell key={i} fill={statusColors[entry.name] || CHART_COLORS[i % CHART_COLORS.length]} stroke="white" strokeWidth={2} />
//                         ))}
//                       </Pie>
//                       <Tooltip formatter={(v, n) => [v, n.charAt(0).toUpperCase() + n.slice(1)]} />
//                     </PieChart>
//                   </ResponsiveContainer>
//                   <div className="grid grid-cols-2 gap-1.5 mt-1">
//                     {bookingStatusDistribution.map((entry, i) => (
//                       <div key={i} className="flex items-center gap-1.5 text-xs">
//                         <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: statusColors[entry.name] || CHART_COLORS[i % CHART_COLORS.length] }} />
//                         <span className="text-gray-500 capitalize truncate">{entry.name}</span>
//                         <span className="font-bold text-gray-700 ml-auto">{entry.value}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </>
//               ) : (
//                 <EmptyState message="No status data available" />
//               )}
//             </ChartCard>
//           </div>
//         </div>
//       )}

//       {/* ════════════════════════════════════════
//           REVENUE TAB
//       ════════════════════════════════════════ */}
//       {reportType === "revenue" && (
//         <div className="space-y-7">
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//             <StatCard
//               title="Total Revenue"
//               value={formatCurrency(revenueData?.totalRevenue || 0)}
//               subtitle="Admin + user vehicle bookings"
//               icon={FaRupeeSign}
//               gradient="bg-gradient-to-br from-indigo-500 to-indigo-700"
//               accent="bg-gradient-to-r from-indigo-400 to-indigo-600"
//             />
//             <StatCard
//               title="Company Revenue"
//               value={formatCurrency(revenueData?.totalCompanyRevenue || 0)}
//               subtitle="After commission split"
//               icon={FaChartLine}
//               gradient="bg-gradient-to-br from-purple-500 to-purple-700"
//               accent="bg-gradient-to-r from-purple-400 to-purple-600"
//             />
//             <StatCard
//               title="Owner Payouts"
//               value={formatCurrency(revenueData?.totalOwnerPayout || 0)}
//               subtitle="Paid to user-vehicle owners"
//               icon={FaUsers}
//               gradient="bg-gradient-to-br from-emerald-500 to-emerald-700"
//               accent="bg-gradient-to-r from-emerald-400 to-emerald-600"
//             />
//           </div>

//           {/* Commission structure breakdown */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
//               <div className="flex items-center gap-3 mb-2">
//                 <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
//                   <FaCar className="text-indigo-600 text-sm" />
//                 </div>
//                 <span className="text-sm font-bold text-indigo-900">Admin Fleet</span>
//                 <span className="ml-auto text-xs font-semibold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">100% to company</span>
//               </div>
//               <p className="text-xs text-indigo-700 ml-11">All revenue from admin-owned vehicles goes directly to RentRide.</p>
//             </div>
//             <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
//               <div className="flex items-center gap-3 mb-2">
//                 <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
//                   <FaUsers className="text-emerald-600 text-sm" />
//                 </div>
//                 <span className="text-sm font-bold text-emerald-900">User Vehicles</span>
//                 <span className="ml-auto text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">30% / 70% split</span>
//               </div>
//               <p className="text-xs text-emerald-700 ml-11">30% commission to RentRide · 70% payout to vehicle owner.</p>
//             </div>
//           </div>

//           {/* Revenue Area Chart */}
//           <ChartCard>
//             <SectionHeader icon={FaChartLine} title="Revenue Over Time (Combined)" color="bg-indigo-500" />
//             {dailyTrends.length > 0 ? (
//               <ResponsiveContainer width="100%" height={320}>
//                 <AreaChart data={dailyTrends} margin={{ top: 5, right: 10, bottom: 5, left: 10 }}>
//                   <defs>
//                     <linearGradient id="revGrad2" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
//                       <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
//                     </linearGradient>
//                   </defs>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
//                   <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
//                   <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `रु${(v / 1000).toFixed(0)}k`} />
//                   <Tooltip content={<CustomTooltip currency />} />
//                   <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#6366f1" strokeWidth={3} fill="url(#revGrad2)" dot={false} activeDot={{ r: 6, fill: "#6366f1", strokeWidth: 0 }} />
//                 </AreaChart>
//               </ResponsiveContainer>
//             ) : (
//               <EmptyState message="No revenue trend data for this period" />
//             )}
//           </ChartCard>

//           {/* Horizontal bar - top vehicles by revenue */}
//           <ChartCard>
//             <SectionHeader icon={FaChartBar} title="Top Earning Vehicles (Admin + User Listed)" color="bg-emerald-500" />
//             {topVehicles.length > 0 ? (
//               <ResponsiveContainer width="100%" height={Math.max(300, topVehicles.slice(0, 8).length * 52)}>
//                 <BarChart data={topVehicles.slice(0, 8)} layout="vertical" margin={{ left: 10, right: 30, top: 5, bottom: 5 }}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
//                   <XAxis type="number" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `रु${(v / 1000).toFixed(0)}k`} />
//                   <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 12, fill: "#475569", fontWeight: 600 }} axisLine={false} tickLine={false} />
//                   <Tooltip content={<CustomTooltip currency />} />
//                   <Bar dataKey="revenue" name="Revenue" radius={[0, 8, 8, 0]}>
//                     <defs>
//                       <linearGradient id="barGrad" x1="0" y1="0" x2="1" y2="0">
//                         <stop offset="0%" stopColor="#6366f1" />
//                         <stop offset="100%" stopColor="#10b981" />
//                       </linearGradient>
//                     </defs>
//                     {topVehicles.slice(0, 8).map((_, i) => (
//                       <Cell key={i} fill="url(#barGrad)" />
//                     ))}
//                   </Bar>
//                 </BarChart>
//               </ResponsiveContainer>
//             ) : (
//               <EmptyState message="No vehicle revenue data" />
//             )}
//           </ChartCard>
//         </div>
//       )}

//       {/* ════════════════════════════════════════
//           VEHICLES TAB  (unchanged — already correct)
//       ════════════════════════════════════════ */}
//       {reportType === "vehicles" && (
//         <div className="space-y-7">
//           <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
//             <StatCard title="Total" value={vehicleStats?.total || 0} icon={FaCar} gradient="bg-gradient-to-br from-indigo-500 to-indigo-700" accent="bg-gradient-to-r from-indigo-400 to-indigo-600" />
//             <StatCard title="Admin Fleet" value={vehicleStats?.admin || 0} icon={FaCar} gradient="bg-gradient-to-br from-blue-500 to-blue-700" accent="bg-gradient-to-r from-blue-400 to-blue-600" />
//             <StatCard title="User Listed" value={vehicleStats?.user || 0} icon={FaUsers} gradient="bg-gradient-to-br from-purple-500 to-purple-700" accent="bg-gradient-to-r from-purple-400 to-purple-600" />
//             <StatCard title="Available" value={vehicleStats?.available || 0} icon={FaCheckCircle} gradient="bg-gradient-to-br from-emerald-500 to-emerald-700" accent="bg-gradient-to-r from-emerald-400 to-emerald-600" />
//             <StatCard title="Booked" value={vehicleStats?.booked || 0} icon={FaCalendarAlt} gradient="bg-gradient-to-br from-orange-500 to-orange-700" accent="bg-gradient-to-r from-orange-400 to-orange-600" />
//           </div>

//           {vehicleStats && vehicleStats.total > 0 && (
//             <ChartCard>
//               <SectionHeader icon={FaChartBar} title="Fleet Utilization" color="bg-indigo-500" />
//               <div className="space-y-4">
//                 {[
//                   { label: "Available", count: vehicleStats.available, color: "bg-emerald-500" },
//                   { label: "Booked", count: vehicleStats.booked, color: "bg-indigo-500" },
//                   { label: "Maintenance", count: vehicleStats.maintenance, color: "bg-amber-500" },
//                 ].map(({ label, count, color }) => {
//                   const pct = vehicleStats.total > 0 ? ((count / vehicleStats.total) * 100).toFixed(1) : 0;
//                   return (
//                     <div key={label}>
//                       <div className="flex justify-between text-sm mb-1.5">
//                         <span className="font-semibold text-gray-700">{label}</span>
//                         <span className="text-gray-500">{count} vehicles <span className="text-gray-400">({pct}%)</span></span>
//                       </div>
//                       <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
//                         <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </ChartCard>
//           )}

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <ChartCard>
//               <SectionHeader icon={FaCar} title="Vehicle Type Distribution" color="bg-purple-500" />
//               {vehicleTypeDistribution.length > 0 ? (
//                 <>
//                   <ResponsiveContainer width="100%" height={240}>
//                     <PieChart>
//                       <Pie data={vehicleTypeDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={95} paddingAngle={3} dataKey="value" label={renderCustomPieLabel} labelLine={false}>
//                         {vehicleTypeDistribution.map((_, i) => (
//                           <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} stroke="white" strokeWidth={2} />
//                         ))}
//                       </Pie>
//                       <Tooltip />
//                     </PieChart>
//                   </ResponsiveContainer>
//                   <div className="grid grid-cols-2 gap-2 mt-2">
//                     {vehicleTypeDistribution.map((d, i) => (
//                       <div key={i} className="flex items-center gap-2 text-xs">
//                         <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
//                         <span className="text-gray-600 truncate">{d.name}</span>
//                         <span className="font-bold text-gray-800 ml-auto">{d.value}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </>
//               ) : (
//                 <EmptyState message="No vehicle data available" />
//               )}
//             </ChartCard>

//             <ChartCard>
//               <SectionHeader icon={FaChartBar} title="Vehicles by Type" color="bg-blue-500" />
//               {vehicleTypeDistribution.length > 0 ? (
//                 <ResponsiveContainer width="100%" height={280}>
//                   <BarChart data={vehicleTypeDistribution} margin={{ top: 5, right: 10, bottom: 25, left: 5 }}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
//                     <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} angle={-30} textAnchor="end" />
//                     <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
//                     <Tooltip />
//                     <Bar dataKey="value" name="Vehicles" radius={[6, 6, 0, 0]}>
//                       {vehicleTypeDistribution.map((_, i) => (
//                         <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
//                       ))}
//                     </Bar>
//                   </BarChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <EmptyState message="No type data available" />
//               )}
//             </ChartCard>
//           </div>
//         </div>
//       )}

//       {/* ════════════════════════════════════════
//           BOOKINGS TAB
//       ════════════════════════════════════════ */}
//       {reportType === "bookings" && (
//         <div className="space-y-7">
//           <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
//             <StatCard
//               title="Total Bookings"
//               value={totalBookings.toLocaleString()}
//               subtitle="Admin + user-vehicle combined"
//               icon={FaFileAlt}
//               gradient="bg-gradient-to-br from-indigo-500 to-indigo-700"
//               accent="bg-gradient-to-r from-indigo-400 to-indigo-600"
//             />
//             <StatCard
//               title="Pending"
//               value={bookingStatusDistribution.find((s) => s.name === "pending")?.value || 0}
//               subtitle="Awaiting approval"
//               icon={FaClock}
//               gradient="bg-gradient-to-br from-amber-500 to-amber-700"
//               accent="bg-gradient-to-r from-amber-400 to-amber-600"
//             />
//             <StatCard
//               title="Active Rides"
//               value={bookingStatusDistribution.find((s) => s.name === "active")?.value || 0}
//               subtitle="Currently on road"
//               icon={FaCar}
//               gradient="bg-gradient-to-br from-emerald-500 to-emerald-700"
//               accent="bg-gradient-to-r from-emerald-400 to-emerald-600"
//             />
//             <StatCard
//               title="Avg. Booking Value"
//               value={formatCurrency(totalBookings > 0 ? (revenueData?.totalRevenue || 0) / totalBookings : 0)}
//               subtitle="Across all vehicles"
//               icon={FaRupeeSign}
//               gradient="bg-gradient-to-br from-purple-500 to-purple-700"
//               accent="bg-gradient-to-r from-purple-400 to-purple-600"
//             />
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
//             <ChartCard className="lg:col-span-3">
//               <SectionHeader icon={FaChartBar} title="Bookings by Status (All Sources)" color="bg-indigo-500" />
//               {bookingStatusDistribution.length > 0 ? (
//                 <ResponsiveContainer width="100%" height={280}>
//                   <BarChart data={bookingStatusDistribution} margin={{ top: 5, right: 10, bottom: 5, left: 5 }}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
//                     <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
//                     <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
//                     <Tooltip content={<CustomTooltip />} />
//                     <Bar dataKey="value" name="Bookings" radius={[6, 6, 0, 0]}>
//                       {bookingStatusDistribution.map((entry, i) => (
//                         <Cell key={i} fill={statusColors[entry.name] || CHART_COLORS[i % CHART_COLORS.length]} />
//                       ))}
//                     </Bar>
//                   </BarChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <EmptyState message="No booking status data" />
//               )}
//             </ChartCard>

//             <ChartCard className="lg:col-span-2">
//               <SectionHeader icon={FaChartBar} title="Status Split" color="bg-purple-500" />
//               {bookingStatusDistribution.length > 0 ? (
//                 <>
//                   <ResponsiveContainer width="100%" height={190}>
//                     <PieChart>
//                       <Pie data={bookingStatusDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={78} paddingAngle={3} dataKey="value" labelLine={false} label={renderCustomPieLabel}>
//                         {bookingStatusDistribution.map((entry, i) => (
//                           <Cell key={i} fill={statusColors[entry.name] || CHART_COLORS[i % CHART_COLORS.length]} stroke="white" strokeWidth={2} />
//                         ))}
//                       </Pie>
//                       <Tooltip />
//                     </PieChart>
//                   </ResponsiveContainer>
//                   <div className="space-y-1.5 mt-1">
//                     {bookingStatusDistribution.map((entry, i) => {
//                       const total = bookingStatusDistribution.reduce((s, x) => s + x.value, 0);
//                       return (
//                         <div key={i} className="flex items-center gap-2 text-xs">
//                           <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: statusColors[entry.name] || CHART_COLORS[i % CHART_COLORS.length] }} />
//                           <span className="text-gray-500 capitalize">{entry.name}</span>
//                           <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden mx-1">
//                             <div className="h-full rounded-full" style={{ width: `${((entry.value / total) * 100).toFixed(0)}%`, background: statusColors[entry.name] || CHART_COLORS[i % CHART_COLORS.length] }} />
//                           </div>
//                           <span className="font-bold text-gray-700">{entry.value}</span>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </>
//               ) : (
//                 <EmptyState message="No data available" />
//               )}
//             </ChartCard>
//           </div>

//           <ChartCard>
//             <SectionHeader icon={FaChartLine} title="Daily Booking Trend (Combined)" color="bg-emerald-500" />
//             {dailyTrends.length > 0 ? (
//               <ResponsiveContainer width="100%" height={300}>
//                 <AreaChart data={dailyTrends} margin={{ top: 5, right: 10, bottom: 5, left: 5 }}>
//                   <defs>
//                     <linearGradient id="bookGrad2" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
//                       <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
//                     </linearGradient>
//                   </defs>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
//                   <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
//                   <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
//                   <Tooltip content={<CustomTooltip />} />
//                   <Area type="monotone" dataKey="bookings" name="Bookings" stroke="#10b981" strokeWidth={3} fill="url(#bookGrad2)" dot={false} activeDot={{ r: 6, fill: "#10b981", strokeWidth: 0 }} />
//                 </AreaChart>
//               </ResponsiveContainer>
//             ) : (
//               <EmptyState message="No daily trend data for this period" />
//             )}
//           </ChartCard>
//         </div>
//       )}

//       {/* ── Footer ── */}
//       <div className="mt-10 pt-6 border-t border-gray-100 text-center text-xs text-gray-400 space-y-1 print:mt-4">
//         <p>Report generated on {new Date().toLocaleString()}</p>
//         <p>Period: {formatDate(dateRange.start)} → {formatDate(dateRange.end)}</p>
//         <p>© {new Date().getFullYear()} RentRide — All Rights Reserved</p>
//       </div>
//     </div>
//   );
// };

// export default AdminReports;



// frontend/src/AdminDashboard/AdminReports.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaChartLine, FaFileAlt, FaCar, FaUsers, FaRupeeSign,
  FaCalendarAlt, FaChartBar, FaPrint, FaFileExcel,
  FaFilter, FaClock, FaCheckCircle,
} from "react-icons/fa";
import { GiScooter } from "react-icons/gi";

import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Area, AreaChart,
} from "recharts";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:5000/api";

const authAxios = (token) =>
  axios.create({ baseURL: API_URL, headers: { Authorization: `Bearer ${token}` } });

/* ─── Custom Tooltip ─── */
const CustomTooltip = ({ active, payload, label, currency }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 shadow-2xl rounded-xl px-4 py-3 text-sm">
      <p className="font-semibold text-gray-700 mb-2 border-b border-gray-100 pb-1">{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2 py-0.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: p.color }} />
          <span className="text-gray-500">{p.name}:</span>
          <span className="font-bold text-gray-800">
            {currency ? `रु ${(p.value || 0).toLocaleString("en-NP")}` : p.value}
          </span>
        </div>
      ))}
    </div>
  );
};

const renderCustomPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.05) return null;
  const R = Math.PI / 180;
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  return (
    <text x={cx + r * Math.cos(-midAngle * R)} y={cy + r * Math.sin(-midAngle * R)}
      fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={700}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CHART_COLORS = ["#6366f1","#10b981","#f59e0b","#ef4444","#8b5cf6","#06b6d4","#f97316","#84cc16"];
const STATUS_COLORS = { pending:"#f59e0b", approved:"#6366f1", confirmed:"#10b981", active:"#06b6d4", completed:"#8b5cf6", cancelled:"#ef4444", rejected:"#f97316" };

/* ─────────────────────────────────────────
   Main Component
───────────────────────────────────────── */
const AdminReports = () => {
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    end: new Date().toISOString().split("T")[0],
  });
  const [reportType, setReportType] = useState("overview");
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Car state
  const [revenueData, setRevenueData]       = useState(null);
  const [vehicleStats, setVehicleStats]     = useState(null);
  const [carTopVehicles, setCarTopVehicles] = useState([]);
  const [carStatusDist, setCarStatusDist]   = useState([]);
  const [carTypeDist, setCarTypeDist]       = useState([]);

  // Bike state
  const [bikeStats, setBikeStats]           = useState({ total: 0, available: 0, booked: 0, maintenance: 0 });
  const [topBikes, setTopBikes]             = useState([]);
  const [bikeStatusDist, setBikeStatusDist] = useState([]);
  const [bikeTypeDist, setBikeTypeDist]     = useState([]);
  const [bikeRevenue, setBikeRevenue]       = useState({ total: 0, avgBooking: 0, totalBookings: 0 });

  // Combined
  const [combinedTrends, setCombinedTrends] = useState([]);

  useEffect(() => { fetchAllReportData(); }, [dateRange]);

  /* ── Data processors ── */
  // Only bookings with paymentStatus === "paid" count toward revenue figures
  const isPaid = (b) => b.paymentStatus === "paid";

  const processDailyTrends = (bookings) => {
    const trends = {};
    bookings.forEach(b => {
      const date = new Date(b.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" });
      if (!trends[date]) trends[date] = { date, bookings: 0, revenue: 0 };
      trends[date].bookings++;                                    // all bookings count for volume
      if (isPaid(b)) trends[date].revenue += b.totalAmount || 0; // only paid count for revenue
    });
    return Object.values(trends).sort((a, b) => new Date(a.date) - new Date(b.date)).slice(-30);
  };

  const processTopItems = (bookings, vehicleField, nameField) => {
    const map = {};
    bookings.forEach(b => {
      const name = b[vehicleField]?.[nameField] || "Unknown";
      if (!map[name]) map[name] = { name, revenue: 0, bookings: 0 };
      if (isPaid(b)) map[name].revenue += b.totalAmount || 0; // only paid count for revenue
      map[name].bookings++;                                    // all bookings count for trip count
    });
    return Object.values(map).sort((a, b) => b.revenue - a.revenue).slice(0, 10);
  };

  const processStatusDist = (bookings) => {
    const dist = {};
    bookings.forEach(b => {
      const s = b.status || "pending";
      if (!dist[s]) dist[s] = { name: s, value: 0 };
      dist[s].value++;
    });
    return Object.values(dist);
  };

  const processTypeDist = (items, typeField) => {
    const dist = {};
    items.forEach(v => {
      const t = v[typeField] || "Other";
      if (!dist[t]) dist[t] = { name: t, value: 0 };
      dist[t].value++;
    });
    return Object.values(dist);
  };

  const mergeTrends = (carTrends, bikeTrends) => {
    const merged = {};
    carTrends.forEach(d => { merged[d.date] = { date: d.date, carRevenue: d.revenue, carBookings: d.bookings, bikeRevenue: 0, bikeBookings: 0 }; });
    bikeTrends.forEach(d => {
      if (merged[d.date]) { merged[d.date].bikeRevenue = d.revenue; merged[d.date].bikeBookings = d.bookings; }
      else merged[d.date] = { date: d.date, carRevenue: 0, carBookings: 0, bikeRevenue: d.revenue, bikeBookings: d.bookings };
    });
    return Object.values(merged).sort((a, b) => new Date(a.date) - new Date(b.date)).slice(-30);
  };

  /* ── Fetch ── */
  const fetchAllReportData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) { toast.error("Please login"); setLoading(false); return; }
    const api = authAxios(token);
    const params = {};
    if (dateRange.start) params.startDate = dateRange.start;
    if (dateRange.end) params.endDate = dateRange.end;

    // --- Cars ---
    let allCarBookings = [];
    try {
      const r = await api.get("/bookings/admin/all", { params });
      if (r.data.success) allCarBookings.push(...r.data.data.bookings.map(b => ({ ...b, _source: "admin" })));
    } catch (e) { console.error("Admin car bookings:", e.message); }
    try {
      const r = await api.get("/revenue/user-vehicles", { params });
      if (r.data.success) allCarBookings.push(...(r.data.data?.bookings || []).map(b => ({ ...b, _source: "user" })));
    } catch (e) { console.error("User car bookings:", e.message); }

    setCarTopVehicles(processTopItems(allCarBookings, "vehicle", "carName"));
    setCarStatusDist(processStatusDist(allCarBookings));

    try {
      const r = await api.get("/revenue/combined", { params });
      if (r.data.success) setRevenueData(r.data.data);
    } catch (e) { console.error("Revenue:", e.message); }

    try {
      const [uvRes, avRes] = await Promise.all([
        api.get("/user-vehicles/admin/all", { params: { limit: 1000 } }),
        api.get("/vehicles"),
      ]);
      const uv = uvRes.data?.data?.vehicles || [];
      const av = avRes.data || [];
      const all = [...av, ...uv];
      setCarTypeDist(processTypeDist(all, "carType"));
      setVehicleStats({
        total: all.length, admin: av.length, user: uv.length,
        available: all.filter(v => v.status === "Available" || v.status === "active").length,
        booked: all.filter(v => v.status === "Booked" || v.status === "booked").length,
        maintenance: all.filter(v => v.status === "Maintenance").length,
      });
    } catch (e) {
      console.error("Car fleet:", e.message);
      setVehicleStats({ total:0, admin:0, user:0, available:0, booked:0, maintenance:0 });
    }

    // --- Bikes ---
    let allBikeBookings = [];
    try {
      const r = await api.get("/bikes/admin/bookings", { params });
      if (r.data.success) {
        allBikeBookings = r.data.data || [];
        const paidBikeBookings = allBikeBookings.filter(b => b.paymentStatus === "paid");
        const totalRev = paidBikeBookings.reduce((s, b) => s + (b.totalAmount || 0), 0);
        setBikeRevenue({
          total: totalRev,
          totalBookings: allBikeBookings.length, // total bookings regardless of payment
          paidBookings: paidBikeBookings.length,
          avgBooking: paidBikeBookings.length > 0 ? Math.round(totalRev / paidBikeBookings.length) : 0,
        });
        setTopBikes(processTopItems(allBikeBookings, "bike", "bikeName"));
        setBikeStatusDist(processStatusDist(allBikeBookings));
      }
    } catch (e) { console.error("Bike bookings:", e.message); }

    try {
      const r = await api.get("/bikes");
      if (r.data.success) {
        const bikes = r.data.data || [];
        setBikeStats({
          total: bikes.length,
          available: bikes.filter(b => b.status === "Available").length,
          booked: bikes.filter(b => b.status === "Booked").length,
          maintenance: bikes.filter(b => b.status === "Maintenance").length,
        });
        setBikeTypeDist(processTypeDist(bikes, "bikeType"));
      }
    } catch (e) { console.error("Bike fleet:", e.message); }

    // Merge daily trends
    setCombinedTrends(mergeTrends(processDailyTrends(allCarBookings), processDailyTrends(allBikeBookings)));
    setLoading(false);
  };

  const formatCurrency = (n) => "रु " + (n || 0).toLocaleString("en-NP");
  const formatDate = (d) => new Date(d).toLocaleDateString("en-US", { year:"numeric", month:"short", day:"numeric" });

  const handleExportCSV = () => {
    const dataMap = { overview: combinedTrends, revenue: [...carTopVehicles,...topBikes], vehicles: carTypeDist, bikes: bikeTypeDist, bookings: [...carStatusDist,...bikeStatusDist] };
    const data = dataMap[reportType] || combinedTrends;
    if (!data?.length) { toast.warning("No data to export"); return; }
    const headers = Object.keys(data[0]);
    const csv = [headers.join(","), ...data.map(r => headers.map(h => JSON.stringify(r[h]||"")).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href=url; a.download=`${reportType}_report.csv`; a.click();
    URL.revokeObjectURL(url);
    toast.success("Exported!");
  };

  /* ─── Sub-components ─── */
  const StatCard = ({ title, value, subtitle, icon: Icon, gradient, accent }) => (
    <div className="relative bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
      <div className={`h-1 w-full ${accent}`} />
      <div className="p-5 flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">{title}</p>
          <p className="text-2xl font-black text-gray-800 truncate">{value}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-1.5">{subtitle}</p>}
        </div>
        <div className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center ${gradient} shadow-md`}>
          <Icon className="text-white text-lg" />
        </div>
      </div>
    </div>
  );

  const SectionHeader = ({ icon: Icon, title, color }) => (
    <h3 className="text-base font-bold text-gray-800 mb-5 flex items-center gap-2.5">
      <span className={`w-7 h-7 rounded-lg flex items-center justify-center ${color}`}><Icon className="text-white text-sm" /></span>
      {title}
    </h3>
  );

  const EmptyState = ({ message }) => (
    <div className="flex flex-col items-center justify-center py-14 text-gray-400">
      <FaChartBar className="text-4xl mb-3 opacity-25" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );

  const ChartCard = ({ children, className = "" }) => (
    <div className={`bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300 ${className}`}>{children}</div>
  );

  const TopItemsList = ({ items, label }) => {
    if (!items.length) return <EmptyState message={`No ${label} data`} />;
    const max = items[0].revenue || 1;
    return (
      <div className="space-y-3">
        {items.slice(0, 5).map((v, i) => (
          <div key={i}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2.5">
                <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black text-white ${i===0?"bg-amber-400":i===1?"bg-gray-400":i===2?"bg-orange-400":"bg-gray-200"}`}>{i+1}</span>
                <span className="text-sm font-semibold text-gray-700 truncate max-w-[140px]">{v.name}</span>
                <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">{v.bookings} trips</span>
              </div>
              <span className="text-sm font-bold text-emerald-600 ml-2">{formatCurrency(v.revenue)}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full" style={{ width: `${Math.round((v.revenue/max)*100)}%` }} />
            </div>
          </div>
        ))}
      </div>
    );
  };

  const StatusDonut = ({ data }) => {
    if (!data.length) return <EmptyState message="No status data" />;
    return (
      <>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value" labelLine={false} label={renderCustomPieLabel}>
              {data.map((entry, i) => <Cell key={i} fill={STATUS_COLORS[entry.name]||CHART_COLORS[i%CHART_COLORS.length]} stroke="white" strokeWidth={2} />)}
            </Pie>
            <Tooltip formatter={(v,n)=>[v,n.charAt(0).toUpperCase()+n.slice(1)]} />
          </PieChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-2 gap-1.5 mt-1">
          {data.map((entry, i) => (
            <div key={i} className="flex items-center gap-1.5 text-xs">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: STATUS_COLORS[entry.name]||CHART_COLORS[i%CHART_COLORS.length] }} />
              <span className="text-gray-500 capitalize truncate">{entry.name}</span>
              <span className="font-bold text-gray-700 ml-auto">{entry.value}</span>
            </div>
          ))}
        </div>
      </>
    );
  };

  const TypeDonut = ({ data }) => {
    if (!data.length) return <EmptyState message="No type data" />;
    return (
      <>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={95} paddingAngle={3} dataKey="value" label={renderCustomPieLabel} labelLine={false}>
              {data.map((_, i) => <Cell key={i} fill={CHART_COLORS[i%CHART_COLORS.length]} stroke="white" strokeWidth={2} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {data.map((d, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: CHART_COLORS[i%CHART_COLORS.length] }} />
              <span className="text-gray-600 truncate">{d.name}</span>
              <span className="font-bold text-gray-800 ml-auto">{d.value}</span>
            </div>
          ))}
        </div>
      </>
    );
  };

  const FleetUtilization = ({ stats, label }) => {
    if (!stats || stats.total === 0) return null;
    return (
      <div className="space-y-4">
        {[{label:"Available",count:stats.available,color:"bg-emerald-500"},{label:"Booked",count:stats.booked,color:"bg-indigo-500"},{label:"Maintenance",count:stats.maintenance,color:"bg-amber-500"}].map(({label:l,count,color})=>{
          const pct = stats.total > 0 ? ((count/stats.total)*100).toFixed(1) : 0;
          return (
            <div key={l}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-semibold text-gray-700">{l}</span>
                <span className="text-gray-500">{count} {label} <span className="text-gray-400">({pct}%)</span></span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full ${color} rounded-full`} style={{ width:`${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-5">
            <div className="absolute inset-0 rounded-full border-4 border-indigo-100" />
            <div className="absolute inset-0 rounded-full border-4 border-t-indigo-600 animate-spin" />
          </div>
          <p className="text-sm font-semibold text-gray-500 tracking-wide uppercase">Loading Analytics</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id:"overview", label:"Overview",  icon:FaChartLine },
    { id:"revenue",  label:"Revenue",   icon:FaRupeeSign },
    { id:"vehicles", label:"Cars",      icon:FaCar },
    { id:"bikes",    label:"Bikes",     icon:GiScooter },
    { id:"bookings", label:"Bookings",  icon:FaFileAlt },
  ];

  const totalCarBookings  = carStatusDist.reduce((s,x)=>s+x.value,0);
  const totalBikeBookings = bikeStatusDist.reduce((s,x)=>s+x.value,0);
  const totalRevenue      = (revenueData?.totalRevenue||0) + bikeRevenue.total;
  const totalNetRevenue   = (revenueData?.totalCompanyRevenue||0) + bikeRevenue.total;

  return (
    <div className="min-h-screen bg-gray-50/70 p-6 lg:p-8">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* ── Header ── */}
      <div className="mb-7">
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div>
            <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2.5 tracking-tight">
              <span className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md shadow-indigo-200">
                <FaChartLine className="text-white text-base" />
              </span>
              Reports & Analytics
            </h1>
            <p className="text-sm text-gray-500 mt-1.5 ml-12">Cars (admin + user-listed) · Bikes · Combined</p>
          </div>

          <div className="flex flex-wrap gap-2.5 items-center">
            <div className="relative">
              <button onClick={()=>setShowDatePicker(!showDatePicker)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:border-indigo-400 hover:text-indigo-600 shadow-sm transition-all">
                <FaCalendarAlt className="text-indigo-400" />
                {formatDate(dateRange.start)} — {formatDate(dateRange.end)}
                <FaFilter className="text-gray-300 text-xs ml-1" />
              </button>
              {showDatePicker && (
                <div className="absolute top-full mt-2 right-0 bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 z-30 min-w-72">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Date Range</p>
                  <div className="space-y-3 mb-4">
                    {[["From","start"],["To","end"]].map(([lbl,key])=>(
                      <div key={key}>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">{lbl}</label>
                        <input type="date" value={dateRange[key]} onChange={e=>setDateRange({...dateRange,[key]:e.target.value})}
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {[{label:"7 Days",days:7},{label:"30 Days",days:30},{label:"90 Days",days:90},{label:"This Year",days:365}].map(({label,days})=>(
                      <button key={days}
                        onClick={()=>{setDateRange({start:new Date(Date.now()-days*86400000).toISOString().split("T")[0],end:new Date().toISOString().split("T")[0]});setShowDatePicker(false);}}
                        className="px-3 py-1.5 text-xs font-semibold bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition border border-gray-100">
                        Last {label}
                      </button>
                    ))}
                  </div>
                  <button onClick={()=>setShowDatePicker(false)} className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition">Apply</button>
                </div>
              )}
            </div>
            <button onClick={handleExportCSV} className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-all">
              <FaFileExcel /> Export CSV
            </button>
            <button onClick={()=>window.print()} className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-all">
              <FaPrint /> Print
            </button>
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-1 mb-7 bg-white border border-gray-100 rounded-2xl p-1.5 shadow-sm w-fit flex-wrap">
        {tabs.map(({id,label,icon:Icon})=>(
          <button key={id} onClick={()=>setReportType(id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${reportType===id?"bg-indigo-600 text-white shadow-md shadow-indigo-200":"text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}>
            <Icon size={14} /> {label}
          </button>
        ))}
      </div>

      {/* ════════════════════════════════════════
          OVERVIEW
      ════════════════════════════════════════ */}
      {reportType === "overview" && (
        <div className="space-y-7">
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            <StatCard title="Total Revenue" value={formatCurrency(totalRevenue)} subtitle="Cars + bikes combined"
              icon={FaRupeeSign} gradient="bg-gradient-to-br from-indigo-500 to-indigo-700" accent="bg-gradient-to-r from-indigo-400 to-indigo-600" />
            <StatCard title="Total Bookings" value={(totalCarBookings+totalBikeBookings).toLocaleString()} subtitle={`${totalCarBookings} cars · ${totalBikeBookings} bikes`}
              icon={FaFileAlt} gradient="bg-gradient-to-br from-emerald-500 to-emerald-700" accent="bg-gradient-to-r from-emerald-400 to-emerald-600" />
            <StatCard title="Fleet Size" value={((vehicleStats?.total||0)+bikeStats.total).toLocaleString()} subtitle={`${vehicleStats?.total||0} cars · ${bikeStats.total} bikes`}
              icon={FaCar} gradient="bg-gradient-to-br from-purple-500 to-purple-700" accent="bg-gradient-to-r from-purple-400 to-purple-600" />
            <StatCard title="Net Revenue" value={formatCurrency(totalNetRevenue)} subtitle="After owner payouts"
              icon={FaChartLine} gradient="bg-gradient-to-br from-orange-500 to-orange-700" accent="bg-gradient-to-r from-orange-400 to-orange-600" />
          </div>

          <ChartCard>
            <SectionHeader icon={FaChartLine} title="Revenue Trend — Cars vs Bikes" color="bg-indigo-500" />
            {combinedTrends.length > 0 ? (
              <ResponsiveContainer width="100%" height={340}>
                <AreaChart data={combinedTrends} margin={{top:5,right:10,bottom:5,left:10}}>
                  <defs>
                    <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/><stop offset="95%" stopColor="#6366f1" stopOpacity={0}/></linearGradient>
                    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2}/><stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="date" tick={{fontSize:11,fill:"#94a3b8"}} axisLine={false} tickLine={false} />
                  <YAxis tick={{fontSize:11,fill:"#94a3b8"}} axisLine={false} tickLine={false} tickFormatter={v=>`रु${(v/1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip currency />} />
                  <Legend wrapperStyle={{fontSize:"12px",paddingTop:"16px"}} />
                  <Area type="monotone" dataKey="carRevenue" name="Car Revenue" stroke="#6366f1" strokeWidth={2.5} fill="url(#cg)" dot={false} activeDot={{r:5}} />
                  <Area type="monotone" dataKey="bikeRevenue" name="Bike Revenue" stroke="#f59e0b" strokeWidth={2.5} fill="url(#bg)" dot={false} activeDot={{r:5}} />
                </AreaChart>
              </ResponsiveContainer>
            ) : <EmptyState message="No trend data" />}
          </ChartCard>

          <ChartCard>
            <SectionHeader icon={FaChartBar} title="Booking Volume — Cars vs Bikes" color="bg-emerald-500" />
            {combinedTrends.length > 0 ? (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={combinedTrends} margin={{top:5,right:10,bottom:5,left:5}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="date" tick={{fontSize:10,fill:"#94a3b8"}} axisLine={false} tickLine={false} />
                  <YAxis tick={{fontSize:11,fill:"#94a3b8"}} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{fontSize:"12px",paddingTop:"12px"}} />
                  <Bar dataKey="carBookings" name="Cars" fill="#6366f1" radius={[4,4,0,0]} stackId="a" />
                  <Bar dataKey="bikeBookings" name="Bikes" fill="#f59e0b" radius={[4,4,0,0]} stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            ) : <EmptyState message="No booking volume data" />}
          </ChartCard>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard><SectionHeader icon={FaCar} title="Top Earning Cars" color="bg-blue-500" /><TopItemsList items={carTopVehicles} label="car" /></ChartCard>
            <ChartCard><SectionHeader icon={GiScooter} title="Top Earning Bikes" color="bg-amber-500" /><TopItemsList items={topBikes} label="bike" /></ChartCard>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard><SectionHeader icon={FaChartBar} title="Car Booking Status" color="bg-purple-500" /><StatusDonut data={carStatusDist} /></ChartCard>
            <ChartCard><SectionHeader icon={FaChartBar} title="Bike Booking Status" color="bg-amber-500" /><StatusDonut data={bikeStatusDist} /></ChartCard>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════
          REVENUE
      ════════════════════════════════════════ */}
      {reportType === "revenue" && (
        <div className="space-y-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <StatCard title="Car Revenue (Gross)" value={formatCurrency(revenueData?.totalRevenue||0)} subtitle="Admin + user-listed vehicles"
              icon={FaCar} gradient="bg-gradient-to-br from-indigo-500 to-indigo-700" accent="bg-gradient-to-r from-indigo-400 to-indigo-600" />
            <StatCard title="Bike Revenue" value={formatCurrency(bikeRevenue.total)} subtitle={`${bikeRevenue.paidBookings || 0} paid of ${bikeRevenue.totalBookings} bookings`}
              icon={GiScooter} gradient="bg-gradient-to-br from-amber-500 to-amber-700" accent="bg-gradient-to-r from-amber-400 to-amber-600" />
            <StatCard title="Company Net Revenue" value={formatCurrency((revenueData?.totalCompanyRevenue||0)+bikeRevenue.total)} subtitle="After user-vehicle owner payouts"
              icon={FaChartLine} gradient="bg-gradient-to-br from-purple-500 to-purple-700" accent="bg-gradient-to-r from-purple-400 to-purple-600" />
            <StatCard title="Owner Payouts" value={formatCurrency(revenueData?.totalOwnerPayout||0)} subtitle="Paid to user-vehicle owners"
              icon={FaUsers} gradient="bg-gradient-to-br from-emerald-500 to-emerald-700" accent="bg-gradient-to-r from-emerald-400 to-emerald-600" />
          </div>

          {/* Commission structure */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label:"Admin Cars", note:"100% → company", bg:"bg-indigo-50", border:"border-indigo-100", icon:FaCar, iconBg:"bg-indigo-100", iconColor:"text-indigo-600", titleColor:"text-indigo-900", noteColor:"text-indigo-700" },
              { label:"User-Listed Cars", note:"30% commission · 70% to owner", bg:"bg-emerald-50", border:"border-emerald-100", icon:FaUsers, iconBg:"bg-emerald-100", iconColor:"text-emerald-600", titleColor:"text-emerald-900", noteColor:"text-emerald-700" },
              { label:"Bikes (Admin)", note:"100% → company", bg:"bg-amber-50", border:"border-amber-100", icon:GiScooter, iconBg:"bg-amber-100", iconColor:"text-amber-600", titleColor:"text-amber-900", noteColor:"text-amber-700" },
            ].map(({label,note,bg,border,icon:Icon,iconBg,iconColor,titleColor,noteColor})=>(
              <div key={label} className={`${bg} border ${border} rounded-xl p-4 flex items-start gap-3`}>
                <div className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`${iconColor} text-sm`} />
                </div>
                <div>
                  <p className={`text-sm font-bold ${titleColor}`}>{label}</p>
                  <p className={`text-xs ${noteColor} mt-0.5`}>{note}</p>
                </div>
              </div>
            ))}
          </div>

          <ChartCard>
            <SectionHeader icon={FaChartLine} title="Revenue Over Time (Cars + Bikes)" color="bg-indigo-500" />
            {combinedTrends.length > 0 ? (
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={combinedTrends} margin={{top:5,right:10,bottom:5,left:10}}>
                  <defs>
                    <linearGradient id="cg2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.25}/><stop offset="95%" stopColor="#6366f1" stopOpacity={0}/></linearGradient>
                    <linearGradient id="bg2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f59e0b" stopOpacity={0.25}/><stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="date" tick={{fontSize:11,fill:"#94a3b8"}} axisLine={false} tickLine={false} />
                  <YAxis tick={{fontSize:11,fill:"#94a3b8"}} axisLine={false} tickLine={false} tickFormatter={v=>`रु${(v/1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip currency />} />
                  <Legend wrapperStyle={{fontSize:"12px",paddingTop:"16px"}} />
                  <Area type="monotone" dataKey="carRevenue" name="Car Revenue" stroke="#6366f1" strokeWidth={3} fill="url(#cg2)" dot={false} activeDot={{r:5}} />
                  <Area type="monotone" dataKey="bikeRevenue" name="Bike Revenue" stroke="#f59e0b" strokeWidth={3} fill="url(#bg2)" dot={false} activeDot={{r:5}} />
                </AreaChart>
              </ResponsiveContainer>
            ) : <EmptyState message="No revenue data" />}
          </ChartCard>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard><SectionHeader icon={FaCar} title="Top Earning Cars" color="bg-blue-500" /><TopItemsList items={carTopVehicles} label="car" /></ChartCard>
            <ChartCard><SectionHeader icon={GiScooter} title="Top Earning Bikes" color="bg-amber-500" /><TopItemsList items={topBikes} label="bike" /></ChartCard>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════
          CARS TAB
      ════════════════════════════════════════ */}
      {reportType === "vehicles" && (
        <div className="space-y-7">
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
            <StatCard title="Total Cars" value={vehicleStats?.total||0} icon={FaCar} gradient="bg-gradient-to-br from-indigo-500 to-indigo-700" accent="bg-gradient-to-r from-indigo-400 to-indigo-600" />
            <StatCard title="Admin Fleet" value={vehicleStats?.admin||0} icon={FaCar} gradient="bg-gradient-to-br from-blue-500 to-blue-700" accent="bg-gradient-to-r from-blue-400 to-blue-600" />
            <StatCard title="User Listed" value={vehicleStats?.user||0} icon={FaUsers} gradient="bg-gradient-to-br from-purple-500 to-purple-700" accent="bg-gradient-to-r from-purple-400 to-purple-600" />
            <StatCard title="Available" value={vehicleStats?.available||0} icon={FaCheckCircle} gradient="bg-gradient-to-br from-emerald-500 to-emerald-700" accent="bg-gradient-to-r from-emerald-400 to-emerald-600" />
            <StatCard title="Booked" value={vehicleStats?.booked||0} icon={FaCalendarAlt} gradient="bg-gradient-to-br from-orange-500 to-orange-700" accent="bg-gradient-to-r from-orange-400 to-orange-600" />
          </div>
          <ChartCard><SectionHeader icon={FaChartBar} title="Car Fleet Utilization" color="bg-indigo-500" /><FleetUtilization stats={vehicleStats} label="cars" /></ChartCard>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard><SectionHeader icon={FaCar} title="Car Type Distribution" color="bg-purple-500" /><TypeDonut data={carTypeDist} /></ChartCard>
            <ChartCard>
              <SectionHeader icon={FaChartBar} title="Cars by Type" color="bg-blue-500" />
              {carTypeDist.length > 0 ? (
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={carTypeDist} margin={{top:5,right:10,bottom:25,left:5}}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="name" tick={{fontSize:11,fill:"#94a3b8"}} axisLine={false} tickLine={false} angle={-30} textAnchor="end" />
                    <YAxis tick={{fontSize:11,fill:"#94a3b8"}} axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Bar dataKey="value" name="Cars" radius={[6,6,0,0]}>
                      {carTypeDist.map((_,i)=><Cell key={i} fill={CHART_COLORS[i%CHART_COLORS.length]} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : <EmptyState message="No car type data" />}
            </ChartCard>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════
          BIKES TAB
      ════════════════════════════════════════ */}
      {reportType === "bikes" && (
        <div className="space-y-7">
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            <StatCard title="Total Bikes" value={bikeStats.total} icon={GiScooter} gradient="bg-gradient-to-br from-amber-500 to-amber-700" accent="bg-gradient-to-r from-amber-400 to-amber-600" />
            <StatCard title="Available" value={bikeStats.available} icon={FaCheckCircle} gradient="bg-gradient-to-br from-emerald-500 to-emerald-700" accent="bg-gradient-to-r from-emerald-400 to-emerald-600" />
            <StatCard title="Bike Revenue" value={formatCurrency(bikeRevenue.total)} subtitle={`${bikeRevenue.paidBookings || 0} paid of ${bikeRevenue.totalBookings} bookings`}
              icon={FaRupeeSign} gradient="bg-gradient-to-br from-purple-500 to-purple-700" accent="bg-gradient-to-r from-purple-400 to-purple-600" />
            <StatCard title="Avg. Booking Value" value={formatCurrency(bikeRevenue.avgBooking)} icon={FaChartLine} gradient="bg-gradient-to-br from-indigo-500 to-indigo-700" accent="bg-gradient-to-r from-indigo-400 to-indigo-600" />
          </div>

          <ChartCard><SectionHeader icon={FaChartBar} title="Bike Fleet Utilization" color="bg-amber-500" /><FleetUtilization stats={bikeStats} label="bikes" /></ChartCard>

          <ChartCard>
            <SectionHeader icon={FaChartLine} title="Bike Revenue Trend" color="bg-amber-500" />
            {bikeRevenue.totalBookings > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={combinedTrends} margin={{top:5,right:10,bottom:5,left:10}}>
                  <defs>
                    <linearGradient id="brg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f59e0b" stopOpacity={0.25}/><stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="date" tick={{fontSize:11,fill:"#94a3b8"}} axisLine={false} tickLine={false} />
                  <YAxis tick={{fontSize:11,fill:"#94a3b8"}} axisLine={false} tickLine={false} tickFormatter={v=>`रु${(v/1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip currency />} />
                  <Area type="monotone" dataKey="bikeRevenue" name="Bike Revenue" stroke="#f59e0b" strokeWidth={3} fill="url(#brg)" dot={false} activeDot={{r:6,fill:"#f59e0b",strokeWidth:0}} />
                </AreaChart>
              </ResponsiveContainer>
            ) : <EmptyState message="No bike revenue data" />}
          </ChartCard>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <ChartCard className="lg:col-span-3"><SectionHeader icon={GiScooter} title="Top Earning Bikes" color="bg-amber-500" /><TopItemsList items={topBikes} label="bike" /></ChartCard>
            <ChartCard className="lg:col-span-2"><SectionHeader icon={FaChartBar} title="Booking Status" color="bg-purple-500" /><StatusDonut data={bikeStatusDist} /></ChartCard>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard><SectionHeader icon={GiScooter} title="Bike Type Distribution" color="bg-amber-500" /><TypeDonut data={bikeTypeDist} /></ChartCard>
            <ChartCard>
              <SectionHeader icon={FaChartBar} title="Bikes by Type" color="bg-orange-500" />
              {bikeTypeDist.length > 0 ? (
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={bikeTypeDist} margin={{top:5,right:10,bottom:25,left:5}}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="name" tick={{fontSize:11,fill:"#94a3b8"}} axisLine={false} tickLine={false} angle={-30} textAnchor="end" />
                    <YAxis tick={{fontSize:11,fill:"#94a3b8"}} axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Bar dataKey="value" name="Bikes" radius={[6,6,0,0]}>
                      {bikeTypeDist.map((_,i)=><Cell key={i} fill={CHART_COLORS[i%CHART_COLORS.length]} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : <EmptyState message="No type data" />}
            </ChartCard>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════
          BOOKINGS TAB
      ════════════════════════════════════════ */}
      {reportType === "bookings" && (
        <div className="space-y-7">
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            <StatCard title="Car Bookings" value={totalCarBookings.toLocaleString()} subtitle="All statuses"
              icon={FaCar} gradient="bg-gradient-to-br from-indigo-500 to-indigo-700" accent="bg-gradient-to-r from-indigo-400 to-indigo-600" />
            <StatCard title="Bike Bookings" value={totalBikeBookings.toLocaleString()} subtitle="All statuses"
              icon={GiScooter} gradient="bg-gradient-to-br from-amber-500 to-amber-700" accent="bg-gradient-to-r from-amber-400 to-amber-600" />
            <StatCard title="Car Pending" value={carStatusDist.find(s=>s.name==="pending")?.value||0} subtitle="Awaiting approval"
              icon={FaClock} gradient="bg-gradient-to-br from-yellow-500 to-yellow-700" accent="bg-gradient-to-r from-yellow-400 to-yellow-600" />
            <StatCard title="Bike Pending" value={bikeStatusDist.find(s=>s.name==="pending")?.value||0} subtitle="Awaiting approval"
              icon={FaClock} gradient="bg-gradient-to-br from-orange-500 to-orange-700" accent="bg-gradient-to-r from-orange-400 to-orange-600" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard>
              <SectionHeader icon={FaCar} title="Car Bookings by Status" color="bg-indigo-500" />
              {carStatusDist.length > 0 ? (
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={carStatusDist} margin={{top:5,right:10,bottom:5,left:5}}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="name" tick={{fontSize:11,fill:"#94a3b8"}} axisLine={false} tickLine={false} />
                    <YAxis tick={{fontSize:11,fill:"#94a3b8"}} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" name="Bookings" radius={[6,6,0,0]}>
                      {carStatusDist.map((e,i)=><Cell key={i} fill={STATUS_COLORS[e.name]||CHART_COLORS[i%CHART_COLORS.length]} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : <EmptyState message="No car booking data" />}
            </ChartCard>

            <ChartCard>
              <SectionHeader icon={GiScooter} title="Bike Bookings by Status" color="bg-amber-500" />
              {bikeStatusDist.length > 0 ? (
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={bikeStatusDist} margin={{top:5,right:10,bottom:5,left:5}}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="name" tick={{fontSize:11,fill:"#94a3b8"}} axisLine={false} tickLine={false} />
                    <YAxis tick={{fontSize:11,fill:"#94a3b8"}} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" name="Bookings" radius={[6,6,0,0]}>
                      {bikeStatusDist.map((e,i)=><Cell key={i} fill={STATUS_COLORS[e.name]||CHART_COLORS[i%CHART_COLORS.length]} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : <EmptyState message="No bike booking data" />}
            </ChartCard>
          </div>

          <ChartCard>
            <SectionHeader icon={FaChartLine} title="Daily Booking Trend — Cars vs Bikes" color="bg-emerald-500" />
            {combinedTrends.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={combinedTrends} margin={{top:5,right:10,bottom:5,left:5}}>
                  <defs>
                    <linearGradient id="cBG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/><stop offset="95%" stopColor="#6366f1" stopOpacity={0}/></linearGradient>
                    <linearGradient id="bBG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2}/><stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="date" tick={{fontSize:11,fill:"#94a3b8"}} axisLine={false} tickLine={false} />
                  <YAxis tick={{fontSize:11,fill:"#94a3b8"}} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{fontSize:"12px",paddingTop:"12px"}} />
                  <Area type="monotone" dataKey="carBookings" name="Cars" stroke="#6366f1" strokeWidth={2.5} fill="url(#cBG)" dot={false} activeDot={{r:5}} />
                  <Area type="monotone" dataKey="bikeBookings" name="Bikes" stroke="#f59e0b" strokeWidth={2.5} fill="url(#bBG)" dot={false} activeDot={{r:5}} />
                </AreaChart>
              </ResponsiveContainer>
            ) : <EmptyState message="No trend data" />}
          </ChartCard>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard><SectionHeader icon={FaChartBar} title="Car Status Split" color="bg-purple-500" /><StatusDonut data={carStatusDist} /></ChartCard>
            <ChartCard><SectionHeader icon={FaChartBar} title="Bike Status Split" color="bg-amber-500" /><StatusDonut data={bikeStatusDist} /></ChartCard>
          </div>
        </div>
      )}

      {/* ── Footer ── */}
      <div className="mt-10 pt-6 border-t border-gray-100 text-center text-xs text-gray-400 space-y-1 print:mt-4">
        <p>Report generated on {new Date().toLocaleString()}</p>
        <p>Period: {formatDate(dateRange.start)} → {formatDate(dateRange.end)}</p>
        <p>© {new Date().getFullYear()} RentRide — All Rights Reserved</p>
      </div>
    </div>
  );
};

export default AdminReports;