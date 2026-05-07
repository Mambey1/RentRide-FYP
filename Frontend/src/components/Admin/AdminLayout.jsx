// // // // // // import React, { useState, useEffect } from "react";
// // // // // // import { Outlet, useNavigate, useLocation } from "react-router-dom";
// // // // // // import {
// // // // // //   FaCar,
// // // // // //   FaPlus,
// // // // // //   FaTachometerAlt,
// // // // // //   FaList,
// // // // // //   FaCheckCircle,
// // // // // //   FaChartLine,
// // // // // //   FaSignOutAlt,
// // // // // //   FaBars,
// // // // // //   FaUserCircle,
// // // // // //   FaShieldAlt,
// // // // // // } from "react-icons/fa";

// // // // // // const AdminLayout = () => {
// // // // // //   const navigate = useNavigate();
// // // // // //   const location = useLocation();
// // // // // //   const [sidebarOpen, setSidebarOpen] = useState(true);
// // // // // //   const [user, setUser] = useState(null);
// // // // // //   const [hoveredItem, setHoveredItem] = useState(null);

// // // // // //   useEffect(() => {
// // // // // //     const userData = JSON.parse(
// // // // // //       localStorage.getItem("user") || sessionStorage.getItem("user") || "null",
// // // // // //     );
// // // // // //     if (userData) {
// // // // // //       setUser(userData);
// // // // // //     }
// // // // // //   }, []);

// // // // // //   const handleLogout = () => {
// // // // // //     localStorage.removeItem("token");
// // // // // //     localStorage.removeItem("user");
// // // // // //     sessionStorage.removeItem("token");
// // // // // //     sessionStorage.removeItem("user");
// // // // // //     navigate("/login");
// // // // // //   };

// // // // // //   const sidebarItems = [
// // // // // //     {
// // // // // //       id: "dashboard",
// // // // // //       path: "/admin/dashboard",
// // // // // //       icon: FaTachometerAlt,
// // // // // //       label: "Dashboard",
// // // // // //       color: "from-blue-500 to-cyan-500",
// // // // // //       bgColor: "bg-gradient-to-r from-blue-500 to-cyan-500",
// // // // // //     },
// // // // // //     {
// // // // // //       id: "inventory",
// // // // // //       path: "/admin/inventory",
// // // // // //       icon: FaList,
// // // // // //       label: "Vehicle Inventory",
// // // // // //       color: "from-emerald-500 to-teal-500",
// // // // // //       bgColor: "bg-gradient-to-r from-emerald-500 to-teal-500",
// // // // // //     },
// // // // // //     {
// // // // // //       id: "bookings",
// // // // // //       path: "/admin/bookings",
// // // // // //       icon: FaCheckCircle,
// // // // // //       label: "Manage Bookings",
// // // // // //       color: "from-orange-500 to-red-500",
// // // // // //       bgColor: "bg-gradient-to-r from-orange-500 to-red-500",
// // // // // //     },
// // // // // //     {
// // // // // //       id: "vehicleVerification",
// // // // // //       path: "/admin/vehicle-verification",
// // // // // //       icon: FaShieldAlt,
// // // // // //       label: "Vehicle Verification",
// // // // // //       color: "from-indigo-500 to-purple-500",
// // // // // //       bgColor: "bg-gradient-to-r from-indigo-500 to-purple-500",
// // // // // //     },
// // // // // //   ];

// // // // // //   const isActive = (path) => {
// // // // // //     return location.pathname === path;
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
// // // // // //       {/* Sidebar */}
// // // // // //       <div
// // // // // //         className={`fixed top-0 left-0 h-full backdrop-blur-xl bg-white/95 shadow-2xl transition-all duration-300 z-20 ${
// // // // // //           sidebarOpen ? "w-72" : "w-20"
// // // // // //         }`}
// // // // // //         style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
// // // // // //       >
// // // // // //         {/* Logo Section */}
// // // // // //         <div className="p-6 border-b border-gray-200">
// // // // // //           <div className="flex items-center justify-between">
// // // // // //             <div className="flex items-center gap-3">
// // // // // //               <div className="p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
// // // // // //                 <FaCar className="text-white text-2xl" />
// // // // // //               </div>
// // // // // //               {sidebarOpen && (
// // // // // //                 <div>
// // // // // //                   <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
// // // // // //                     Rent<span className="text-gray-800">Ride</span>
// // // // // //                   </h1>
// // // // // //                   <p className="text-xs text-gray-500 mt-0.5">Admin Panel</p>
// // // // // //                 </div>
// // // // // //               )}
// // // // // //             </div>
// // // // // //             <button
// // // // // //               onClick={() => setSidebarOpen(!sidebarOpen)}
// // // // // //               className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300"
// // // // // //             >
// // // // // //               <FaBars className="text-gray-600" />
// // // // // //             </button>
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         {/* Admin Info */}
// // // // // //         {sidebarOpen && user && (
// // // // // //           <div className="mx-4 mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
// // // // // //             <div className="flex items-center gap-3">
// // // // // //               <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
// // // // // //                 <FaUserCircle className="text-white text-2xl" />
// // // // // //               </div>
// // // // // //               <div className="flex-1">
// // // // // //                 <p className="font-semibold text-gray-800">{user.name}</p>
// // // // // //                 <p className="text-xs text-gray-500 truncate">{user.email}</p>
// // // // // //                 <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded-full">
// // // // // //                   Administrator
// // // // // //                 </span>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         )}

// // // // // //         {/* Navigation Menu */}
// // // // // //         <nav className="mt-6 px-3">
// // // // // //           <p
// // // // // //             className={`text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 ${
// // // // // //               !sidebarOpen && "text-center"
// // // // // //             }`}
// // // // // //           >
// // // // // //             {sidebarOpen ? "MAIN MENU" : "..."}
// // // // // //           </p>
// // // // // //           {sidebarItems.map((item) => {
// // // // // //             const Icon = item.icon;
// // // // // //             const active = isActive(item.path);
// // // // // //             const isHovered = hoveredItem === item.id;

// // // // // //             return (
// // // // // //               <button
// // // // // //                 key={item.id}
// // // // // //                 onClick={() => navigate(item.path)}
// // // // // //                 onMouseEnter={() => setHoveredItem(item.id)}
// // // // // //                 onMouseLeave={() => setHoveredItem(null)}
// // // // // //                 className={`relative w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-xl transition-all duration-300 group ${
// // // // // //                   active
// // // // // //                     ? `${item.bgColor} text-white shadow-lg`
// // // // // //                     : "text-gray-600 hover:bg-gray-100"
// // // // // //                 } ${!sidebarOpen && "justify-center"}`}
// // // // // //               >
// // // // // //                 <Icon
// // // // // //                   className={`text-xl ${
// // // // // //                     active ? "text-white" : "text-gray-500"
// // // // // //                   } transition-transform duration-300 group-hover:scale-110`}
// // // // // //                 />
// // // // // //                 {sidebarOpen && (
// // // // // //                   <span className={`font-medium ${active ? "text-white" : ""}`}>
// // // // // //                     {item.label}
// // // // // //                   </span>
// // // // // //                 )}
// // // // // //                 {!sidebarOpen && isHovered && (
// // // // // //                   <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded whitespace-nowrap z-50">
// // // // // //                     {item.label}
// // // // // //                   </div>
// // // // // //                 )}
// // // // // //                 {active && sidebarOpen && (
// // // // // //                   <div className="absolute left-0 w-1 h-8 bg-white rounded-r-full"></div>
// // // // // //                 )}
// // // // // //               </button>
// // // // // //             );
// // // // // //           })}
// // // // // //         </nav>

// // // // // //         {/* Logout Button */}
// // // // // //         <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
// // // // // //           <button
// // // // // //             onClick={handleLogout}
// // // // // //             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
// // // // // //               !sidebarOpen && "justify-center"
// // // // // //             } bg-red-50 hover:bg-red-100 text-red-600 group`}
// // // // // //           >
// // // // // //             <FaSignOutAlt className="text-xl transition-transform duration-300 group-hover:scale-110" />
// // // // // //             {sidebarOpen && <span className="font-medium">Logout</span>}
// // // // // //           </button>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* Main Content */}
// // // // // //       <div
// // // // // //         className={`transition-all duration-300 ${
// // // // // //           sidebarOpen ? "ml-72" : "ml-20"
// // // // // //         }`}
// // // // // //       >
// // // // // //         <Outlet />
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default AdminLayout;

// // // // // import React, { useState, useEffect } from "react";
// // // // // import { Outlet, useNavigate, useLocation } from "react-router-dom";
// // // // // import {
// // // // //   FaCar,
// // // // //   FaPlus,
// // // // //   FaTachometerAlt,
// // // // //   FaList,
// // // // //   FaCheckCircle,
// // // // //   FaChartLine,
// // // // //   FaSignOutAlt,
// // // // //   FaBars,
// // // // //   FaUserCircle,
// // // // //   FaShieldAlt,
// // // // //   FaEnvelope,
// // // // // } from "react-icons/fa";

// // // // // const AdminLayout = () => {
// // // // //   const navigate = useNavigate();
// // // // //   const location = useLocation();
// // // // //   const [sidebarOpen, setSidebarOpen] = useState(true);
// // // // //   const [user, setUser] = useState(null);
// // // // //   const [hoveredItem, setHoveredItem] = useState(null);

// // // // //   useEffect(() => {
// // // // //     const userData = JSON.parse(
// // // // //       localStorage.getItem("user") || sessionStorage.getItem("user") || "null",
// // // // //     );
// // // // //     if (userData) {
// // // // //       setUser(userData);
// // // // //     }
// // // // //   }, []);

// // // // //   const handleLogout = () => {
// // // // //     localStorage.removeItem("token");
// // // // //     localStorage.removeItem("user");
// // // // //     sessionStorage.removeItem("token");
// // // // //     sessionStorage.removeItem("user");
// // // // //     navigate("/login");
// // // // //   };

// // // // //   const sidebarItems = [
// // // // //     {
// // // // //       id: "dashboard",
// // // // //       path: "/admin/dashboard",
// // // // //       icon: FaTachometerAlt,
// // // // //       label: "Dashboard",
// // // // //       color: "from-blue-500 to-cyan-500",
// // // // //       bgColor: "bg-gradient-to-r from-blue-500 to-cyan-500",
// // // // //     },
// // // // //     {
// // // // //       id: "inventory",
// // // // //       path: "/admin/inventory",
// // // // //       icon: FaList,
// // // // //       label: "Vehicle Inventory",
// // // // //       color: "from-emerald-500 to-teal-500",
// // // // //       bgColor: "bg-gradient-to-r from-emerald-500 to-teal-500",
// // // // //     },
// // // // //     {
// // // // //       id: "bookings",
// // // // //       path: "/admin/bookings",
// // // // //       icon: FaCheckCircle,
// // // // //       label: "Manage Bookings",
// // // // //       color: "from-orange-500 to-red-500",
// // // // //       bgColor: "bg-gradient-to-r from-orange-500 to-red-500",
// // // // //     },
// // // // //     {
// // // // //       id: "vehicleVerification",
// // // // //       path: "/admin/vehicle-verification",
// // // // //       icon: FaShieldAlt,
// // // // //       label: "Vehicle Verification",
// // // // //       color: "from-indigo-500 to-purple-500",
// // // // //       bgColor: "bg-gradient-to-r from-indigo-500 to-purple-500",
// // // // //     },
// // // // //     // {
// // // // //     //   id: "newsletter",
// // // // //     //   path: "/admin/newsletter",
// // // // //     //   icon: FaEnvelope,
// // // // //     //   label: "Newsletter",
// // // // //     //   color: "from-purple-500 to-pink-500",
// // // // //     //   bgColor: "bg-gradient-to-r from-purple-500 to-pink-500",
// // // // //     // },
// // // // //     // // Add to sidebarItems array
// // // // //     {
// // // // //       id: "revenue",
// // // // //       path: "/admin/revenue",
// // // // //       icon: FaChartLine,
// // // // //       label: "Revenue",
// // // // //       color: "from-green-500 to-emerald-500",
// // // // //       bgColor: "bg-gradient-to-r from-green-500 to-emerald-500",
// // // // //     },
// // // // //   ];

// // // // //   const isActive = (path) => {
// // // // //     return location.pathname === path;
// // // // //   };

// // // // //   return (
// // // // //     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
// // // // //       {/* Sidebar */}
// // // // //       <div
// // // // //         className={`fixed top-0 left-0 h-full backdrop-blur-xl bg-white/95 shadow-2xl transition-all duration-300 z-20 ${
// // // // //           sidebarOpen ? "w-72" : "w-20"
// // // // //         }`}
// // // // //         style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
// // // // //       >
// // // // //         {/* Logo Section */}
// // // // //         <div className="p-6 border-b border-gray-200">
// // // // //           <div className="flex items-center justify-between">
// // // // //             <div className="flex items-center gap-3">
// // // // //               <div className="p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
// // // // //                 <FaCar className="text-white text-2xl" />
// // // // //               </div>
// // // // //               {sidebarOpen && (
// // // // //                 <div>
// // // // //                   <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
// // // // //                     Rent<span className="text-gray-800">Ride</span>
// // // // //                   </h1>
// // // // //                   <p className="text-xs text-gray-500 mt-0.5">Admin Panel</p>
// // // // //                 </div>
// // // // //               )}
// // // // //             </div>
// // // // //             <button
// // // // //               onClick={() => setSidebarOpen(!sidebarOpen)}
// // // // //               className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300"
// // // // //             >
// // // // //               <FaBars className="text-gray-600" />
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* Admin Info */}
// // // // //         {sidebarOpen && user && (
// // // // //           <div className="mx-4 mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
// // // // //             <div className="flex items-center gap-3">
// // // // //               <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
// // // // //                 <FaUserCircle className="text-white text-2xl" />
// // // // //               </div>
// // // // //               <div className="flex-1">
// // // // //                 <p className="font-semibold text-gray-800">{user.name}</p>
// // // // //                 <p className="text-xs text-gray-500 truncate">{user.email}</p>
// // // // //                 <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded-full">
// // // // //                   Administrator
// // // // //                 </span>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         )}

// // // // //         {/* Navigation Menu */}
// // // // //         <nav className="mt-6 px-3">
// // // // //           <p
// // // // //             className={`text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 ${
// // // // //               !sidebarOpen && "text-center"
// // // // //             }`}
// // // // //           >
// // // // //             {sidebarOpen ? "MAIN MENU" : "..."}
// // // // //           </p>
// // // // //           {sidebarItems.map((item) => {
// // // // //             const Icon = item.icon;
// // // // //             const active = isActive(item.path);
// // // // //             const isHovered = hoveredItem === item.id;

// // // // //             return (
// // // // //               <button
// // // // //                 key={item.id}
// // // // //                 onClick={() => navigate(item.path)}
// // // // //                 onMouseEnter={() => setHoveredItem(item.id)}
// // // // //                 onMouseLeave={() => setHoveredItem(null)}
// // // // //                 className={`relative w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-xl transition-all duration-300 group ${
// // // // //                   active
// // // // //                     ? `${item.bgColor} text-white shadow-lg`
// // // // //                     : "text-gray-600 hover:bg-gray-100"
// // // // //                 } ${!sidebarOpen && "justify-center"}`}
// // // // //               >
// // // // //                 <Icon
// // // // //                   className={`text-xl ${
// // // // //                     active ? "text-white" : "text-gray-500"
// // // // //                   } transition-transform duration-300 group-hover:scale-110`}
// // // // //                 />
// // // // //                 {sidebarOpen && (
// // // // //                   <span className={`font-medium ${active ? "text-white" : ""}`}>
// // // // //                     {item.label}
// // // // //                   </span>
// // // // //                 )}
// // // // //                 {!sidebarOpen && isHovered && (
// // // // //                   <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded whitespace-nowrap z-50">
// // // // //                     {item.label}
// // // // //                   </div>
// // // // //                 )}
// // // // //                 {active && sidebarOpen && (
// // // // //                   <div className="absolute left-0 w-1 h-8 bg-white rounded-r-full"></div>
// // // // //                 )}
// // // // //               </button>
// // // // //             );
// // // // //           })}
// // // // //         </nav>

// // // // //         {/* Logout Button */}
// // // // //         <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
// // // // //           <button
// // // // //             onClick={handleLogout}
// // // // //             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
// // // // //               !sidebarOpen && "justify-center"
// // // // //             } bg-red-50 hover:bg-red-100 text-red-600 group`}
// // // // //           >
// // // // //             <FaSignOutAlt className="text-xl transition-transform duration-300 group-hover:scale-110" />
// // // // //             {sidebarOpen && <span className="font-medium">Logout</span>}
// // // // //           </button>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* Main Content */}
// // // // //       <div
// // // // //         className={`transition-all duration-300 ${
// // // // //           sidebarOpen ? "ml-72" : "ml-20"
// // // // //         }`}
// // // // //       >
// // // // //         <Outlet />
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default AdminLayout;

// // // // import React, { useState, useEffect } from "react";
// // // // import { Outlet, useNavigate, useLocation } from "react-router-dom";
// // // // import {
// // // //   FaCar,
// // // //   FaTachometerAlt,
// // // //   FaList,
// // // //   FaCheckCircle,
// // // //   FaChartLine,
// // // //   FaSignOutAlt,
// // // //   FaBars,
// // // //   FaUserCircle,
// // // //   FaShieldAlt,
// // // //   FaComments,
// // // //   FaMotorcycle, // ← new
// // // // } from "react-icons/fa";

// // // // const AdminLayout = () => {
// // // //   const navigate = useNavigate();
// // // //   const location = useLocation();
// // // //   const [sidebarOpen, setSidebarOpen] = useState(true);
// // // //   const [user, setUser] = useState(null);
// // // //   const [hoveredItem, setHoveredItem] = useState(null);

// // // //   useEffect(() => {
// // // //     const userData = JSON.parse(
// // // //       localStorage.getItem("user") || sessionStorage.getItem("user") || "null",
// // // //     );
// // // //     if (userData) setUser(userData);
// // // //   }, []);

// // // //   const handleLogout = () => {
// // // //     localStorage.removeItem("token");
// // // //     localStorage.removeItem("user");
// // // //     sessionStorage.removeItem("token");
// // // //     sessionStorage.removeItem("user");
// // // //     navigate("/login");
// // // //   };

// // // //   const sidebarItems = [
// // // //     {
// // // //       id: "dashboard",
// // // //       path: "/admin/dashboard",
// // // //       icon: FaTachometerAlt,
// // // //       label: "Dashboard",
// // // //       bgColor: "bg-gradient-to-r from-blue-500 to-cyan-500",
// // // //     },
// // // //     {
// // // //       id: "inventory",
// // // //       path: "/admin/inventory",
// // // //       icon: FaList,
// // // //       label: "Vehicle Inventory",
// // // //       bgColor: "bg-gradient-to-r from-emerald-500 to-teal-500",
// // // //     },
// // // //     {
// // // //       id: "bikes",
// // // //       path: "/admin/bikes",
// // // //       icon: FaMotorcycle,
// // // //       label: "Bikes",
// // // //       bgColor: "bg-gradient-to-r from-purple-500 to-pink-500",
// // // //     },
// // // //     {
// // // //       id: "bookings",
// // // //       path: "/admin/bookings",
// // // //       icon: FaCheckCircle,
// // // //       label: "Manage Car Bookings",
// // // //       bgColor: "bg-gradient-to-r from-orange-500 to-red-500",
// // // //     },
// // // //     {
// // // //   id: "bikeBookings",
// // // //   path: "/admin/bike-bookings",
// // // //   icon: FaMotorcycle,
// // // //   label: "Manage Bike Bookings",
// // // //   bgColor: "bg-gradient-to-r from-purple-500 to-pink-500",
// // // // },
// // // //     {
// // // //       id: "vehicleVerification",
// // // //       path: "/admin/vehicle-verification",
// // // //       icon: FaShieldAlt,
// // // //       label: "Vehicle Verification",
// // // //       bgColor: "bg-gradient-to-r from-indigo-500 to-purple-500",
// // // //     },
// // // //     {
// // // //       id: "revenue",
// // // //       path: "/admin/revenue",
// // // //       icon: FaChartLine,
// // // //       label: "Revenue",
// // // //       bgColor: "bg-gradient-to-r from-green-500 to-emerald-500",
// // // //     },
// // // //     // ── New Messages entry ──────────────────────────────────────────────────
// // // //     {
// // // //       id: "messages",
// // // //       path: "/admin/messages",
// // // //       icon: FaComments,
// // // //       label: "Messages",
// // // //       bgColor: "bg-gradient-to-r from-blue-500 to-purple-500",
// // // //     },
// // // //   ];

// // // //   const isActive = (path) => location.pathname === path;

// // // //   return (
// // // //     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
// // // //       {/* Sidebar */}
// // // //       <div
// // // //         className={`fixed top-0 left-0 h-full backdrop-blur-xl bg-white/95 shadow-2xl transition-all duration-300 z-20 ${
// // // //           sidebarOpen ? "w-72" : "w-20"
// // // //         }`}
// // // //         style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
// // // //       >
// // // //         {/* Logo */}
// // // //         <div className="p-6 border-b border-gray-200">
// // // //           <div className="flex items-center justify-between">
// // // //             <div className="flex items-center gap-3">
// // // //               <div className="p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
// // // //                 <FaCar className="text-white text-2xl" />
// // // //               </div>
// // // //               {sidebarOpen && (
// // // //                 <div>
// // // //                   <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
// // // //                     Rent<span className="text-gray-800">Ride</span>
// // // //                   </h1>
// // // //                   <p className="text-xs text-gray-500 mt-0.5">Admin Panel</p>
// // // //                 </div>
// // // //               )}
// // // //             </div>
// // // //             <button
// // // //               onClick={() => setSidebarOpen(!sidebarOpen)}
// // // //               className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300"
// // // //             >
// // // //               <FaBars className="text-gray-600" />
// // // //             </button>
// // // //           </div>
// // // //         </div>

// // // //         {/* Admin info */}
// // // //         {sidebarOpen && user && (
// // // //           <div className="mx-4 mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
// // // //             <div className="flex items-center gap-3">
// // // //               <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
// // // //                 <FaUserCircle className="text-white text-2xl" />
// // // //               </div>
// // // //               <div className="flex-1">
// // // //                 <p className="font-semibold text-gray-800">{user.name}</p>
// // // //                 <p className="text-xs text-gray-500 truncate">{user.email}</p>
// // // //                 <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded-full">
// // // //                   Administrator
// // // //                 </span>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         )}

// // // //         {/* Nav */}
// // // //         <nav className="mt-6 px-3">
// // // //           <p
// // // //             className={`text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 ${
// // // //               !sidebarOpen && "text-center"
// // // //             }`}
// // // //           >
// // // //             {sidebarOpen ? "MAIN MENU" : "..."}
// // // //           </p>
// // // //           {sidebarItems.map((item) => {
// // // //             const Icon = item.icon;
// // // //             const active = isActive(item.path);
// // // //             const isHovered = hoveredItem === item.id;
// // // //             return (
// // // //               <button
// // // //                 key={item.id}
// // // //                 onClick={() => navigate(item.path)}
// // // //                 onMouseEnter={() => setHoveredItem(item.id)}
// // // //                 onMouseLeave={() => setHoveredItem(null)}
// // // //                 className={`relative w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-xl transition-all duration-300 group ${
// // // //                   active
// // // //                     ? `${item.bgColor} text-white shadow-lg`
// // // //                     : "text-gray-600 hover:bg-gray-100"
// // // //                 } ${!sidebarOpen && "justify-center"}`}
// // // //               >
// // // //                 <Icon
// // // //                   className={`text-xl ${
// // // //                     active ? "text-white" : "text-gray-500"
// // // //                   } transition-transform duration-300 group-hover:scale-110`}
// // // //                 />
// // // //                 {sidebarOpen && (
// // // //                   <span className={`font-medium ${active ? "text-white" : ""}`}>
// // // //                     {item.label}
// // // //                   </span>
// // // //                 )}
// // // //                 {!sidebarOpen && isHovered && (
// // // //                   <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded whitespace-nowrap z-50">
// // // //                     {item.label}
// // // //                   </div>
// // // //                 )}
// // // //                 {active && sidebarOpen && (
// // // //                   <div className="absolute left-0 w-1 h-8 bg-white rounded-r-full" />
// // // //                 )}
// // // //               </button>
// // // //             );
// // // //           })}
// // // //         </nav>

// // // //         {/* Logout */}
// // // //         <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
// // // //           <button
// // // //             onClick={handleLogout}
// // // //             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
// // // //               !sidebarOpen && "justify-center"
// // // //             } bg-red-50 hover:bg-red-100 text-red-600 group`}
// // // //           >
// // // //             <FaSignOutAlt className="text-xl transition-transform duration-300 group-hover:scale-110" />
// // // //             {sidebarOpen && <span className="font-medium">Logout</span>}
// // // //           </button>
// // // //         </div>
// // // //       </div>

// // // //       {/* Main content */}
// // // //       <div
// // // //         className={`transition-all duration-300 ${
// // // //           sidebarOpen ? "ml-72" : "ml-20"
// // // //         }`}
// // // //       >
// // // //         <Outlet />
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default AdminLayout;
// // // import React, { useState, useEffect } from "react";
// // // import { Outlet, useNavigate, useLocation } from "react-router-dom";
// // // import {
// // //   FaCar,
// // //   FaTachometerAlt,
// // //   FaList,
// // //   FaCheckCircle,
// // //   FaChartLine,
// // //   FaSignOutAlt,
// // //   FaBars,
// // //   FaUserCircle,
// // //   FaShieldAlt,
// // //   FaComments,
// // //   FaMotorcycle,
// // //   FaFileAlt,
// // // } from "react-icons/fa";

// // // const AdminLayout = () => {
// // //   const navigate = useNavigate();
// // //   const location = useLocation();
// // //   const [sidebarOpen, setSidebarOpen] = useState(true);
// // //   const [user, setUser] = useState(null);
// // //   const [hoveredItem, setHoveredItem] = useState(null);

// // //   useEffect(() => {
// // //     const userData = JSON.parse(
// // //       localStorage.getItem("user") || sessionStorage.getItem("user") || "null",
// // //     );
// // //     if (userData) setUser(userData);
// // //   }, []);

// // //   const handleLogout = () => {
// // //     localStorage.removeItem("token");
// // //     localStorage.removeItem("user");
// // //     sessionStorage.removeItem("token");
// // //     sessionStorage.removeItem("user");
// // //     navigate("/login");
// // //   };

// // //   const sidebarItems = [
// // //     {
// // //       id: "dashboard",
// // //       path: "/admin/dashboard",
// // //       icon: FaTachometerAlt,
// // //       label: "Dashboard",
// // //       bgColor: "bg-gradient-to-r from-blue-500 to-cyan-500",
// // //     },
// // //     {
// // //       id: "inventory",
// // //       path: "/admin/inventory",
// // //       icon: FaList,
// // //       label: "Vehicle Inventory",
// // //       bgColor: "bg-gradient-to-r from-emerald-500 to-teal-500",
// // //     },
// // //     {
// // //       id: "bikes",
// // //       path: "/admin/bikes",
// // //       icon: FaMotorcycle,
// // //       label: "Bikes",
// // //       bgColor: "bg-gradient-to-r from-purple-500 to-pink-500",
// // //     },
// // //     {
// // //       id: "bookings",
// // //       path: "/admin/bookings",
// // //       icon: FaCheckCircle,
// // //       label: "Manage Car Bookings",
// // //       bgColor: "bg-gradient-to-r from-orange-500 to-red-500",
// // //     },
// // //     {
// // //       id: "bikeBookings",
// // //       path: "/admin/bike-bookings",
// // //       icon: FaMotorcycle,
// // //       label: "Manage Bike Bookings",
// // //       bgColor: "bg-gradient-to-r from-purple-500 to-pink-500",
// // //     },
// // //     {
// // //       id: "vehicleVerification",
// // //       path: "/admin/vehicle-verification",
// // //       icon: FaShieldAlt,
// // //       label: "Vehicle Verification",
// // //       bgColor: "bg-gradient-to-r from-indigo-500 to-purple-500",
// // //     },
// // //     {
// // //       id: "revenue",
// // //       path: "/admin/revenue",
// // //       icon: FaChartLine,
// // //       label: "Revenue",
// // //       bgColor: "bg-gradient-to-r from-green-500 to-emerald-500",
// // //     },
// // //     {
// // //       id: "reports",
// // //       path: "/admin/reports",
// // //       icon: FaFileAlt,
// // //       label: "Reports",
// // //       bgColor: "bg-gradient-to-r from-indigo-500 to-purple-500",
// // //     },
// // //     {
// // //       id: "messages",
// // //       path: "/admin/messages",
// // //       icon: FaComments,
// // //       label: "Messages",
// // //       bgColor: "bg-gradient-to-r from-blue-500 to-purple-500",
// // //     },
// // //   ];

// // //   const isActive = (path) => location.pathname === path;

// // //   return (
// // //     <div className="h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
// // //       {/* Sidebar */}
// // //       <div
// // //         className={`fixed top-0 left-0 h-full backdrop-blur-xl bg-white/95 shadow-2xl transition-all duration-300 z-20 ${
// // //           sidebarOpen ? "w-72" : "w-20"
// // //         }`}
// // //         style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
// // //       >
// // //         {/* Logo */}
// // //         <div className="p-6 border-b border-gray-200">
// // //           <div className="flex items-center justify-between">
// // //             <div className="flex items-center gap-3">
// // //               <div className="p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
// // //                 <FaCar className="text-white text-2xl" />
// // //               </div>
// // //               {sidebarOpen && (
// // //                 <div>
// // //                   <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
// // //                     Rent<span className="text-gray-800">Ride</span>
// // //                   </h1>
// // //                   <p className="text-xs text-gray-500 mt-0.5">Admin Panel</p>
// // //                 </div>
// // //               )}
// // //             </div>
// // //             <button
// // //               onClick={() => setSidebarOpen(!sidebarOpen)}
// // //               className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300"
// // //             >
// // //               <FaBars className="text-gray-600" />
// // //             </button>
// // //           </div>
// // //         </div>

// // //         {/* Admin info */}
// // //         {sidebarOpen && user && (
// // //           <div className="mx-4 mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
// // //             <div className="flex items-center gap-3">
// // //               <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
// // //                 <FaUserCircle className="text-white text-2xl" />
// // //               </div>
// // //               <div className="flex-1">
// // //                 <p className="font-semibold text-gray-800">{user.name}</p>
// // //                 <p className="text-xs text-gray-500 truncate">{user.email}</p>
// // //                 <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded-full">
// // //                   Administrator
// // //                 </span>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* Nav */}
// // //         <nav
// // //           className="mt-6 px-3 overflow-y-auto pb-24"
// // //           style={{ maxHeight: "calc(100vh - 220px)" }}
// // //         >
// // //           <p
// // //             className={`text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 ${
// // //               !sidebarOpen && "text-center"
// // //             }`}
// // //           >
// // //             {sidebarOpen ? "MAIN MENU" : "..."}
// // //           </p>
// // //           {sidebarItems.map((item) => {
// // //             const Icon = item.icon;
// // //             const active = isActive(item.path);
// // //             const isHovered = hoveredItem === item.id;
// // //             return (
// // //               <button
// // //                 key={item.id}
// // //                 onClick={() => navigate(item.path)}
// // //                 onMouseEnter={() => setHoveredItem(item.id)}
// // //                 onMouseLeave={() => setHoveredItem(null)}
// // //                 className={`relative w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-xl transition-all duration-300 group ${
// // //                   active
// // //                     ? `${item.bgColor} text-white shadow-lg`
// // //                     : "text-gray-600 hover:bg-gray-100"
// // //                 } ${!sidebarOpen && "justify-center"}`}
// // //               >
// // //                 <Icon
// // //                   className={`text-xl ${
// // //                     active ? "text-white" : "text-gray-500"
// // //                   } transition-transform duration-300 group-hover:scale-110`}
// // //                 />
// // //                 {sidebarOpen && (
// // //                   <span className={`font-medium ${active ? "text-white" : ""}`}>
// // //                     {item.label}
// // //                   </span>
// // //                 )}
// // //                 {!sidebarOpen && isHovered && (
// // //                   <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded whitespace-nowrap z-50">
// // //                     {item.label}
// // //                   </div>
// // //                 )}
// // //                 {active && sidebarOpen && (
// // //                   <div className="absolute left-0 w-1 h-8 bg-white rounded-r-full" />
// // //                 )}
// // //               </button>
// // //             );
// // //           })}
// // //         </nav>

// // //         {/* Logout */}
// // //         <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
// // //           <button
// // //             onClick={handleLogout}
// // //             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
// // //               !sidebarOpen && "justify-center"
// // //             } bg-red-50 hover:bg-red-100 text-red-600 group`}
// // //           >
// // //             <FaSignOutAlt className="text-xl transition-transform duration-300 group-hover:scale-110" />
// // //             {sidebarOpen && <span className="font-medium">Logout</span>}
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* Main content */}
// // //       <div
// // //         className={`transition-all duration-300 h-screen overflow-y-auto ${
// // //           sidebarOpen ? "ml-72" : "ml-20"
// // //         }`}
// // //       >
// // //         <Outlet />
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default AdminLayout;

// // import React, { useState, useEffect, useCallback } from "react";
// // import { Outlet, useNavigate, useLocation } from "react-router-dom";
// // import {
// //   FaCar,
// //   FaTachometerAlt,
// //   FaList,
// //   FaCheckCircle,
// //   FaChartLine,
// //   FaSignOutAlt,
// //   FaBars,
// //   FaUserCircle,
// //   FaShieldAlt,
// //   FaComments,
// //   FaMotorcycle,
// //   FaFileAlt,
// // } from "react-icons/fa";
// // import { useSocket } from "../../context/SocketContext"; // ← correct path from src/components/Admin/

// // const AdminLayout = () => {
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const [sidebarOpen, setSidebarOpen] = useState(true);
// //   const [user, setUser] = useState(null);
// //   const [hoveredItem, setHoveredItem] = useState(null);
// //   const [unreadCount, setUnreadCount] = useState(0);

// //   const { onNewMessage, onNewMessageNotification } = useSocket();

// //   useEffect(() => {
// //     const userData = JSON.parse(
// //       localStorage.getItem("user") || sessionStorage.getItem("user") || "null",
// //     );
// //     if (userData) setUser(userData);
// //   }, []);

// //   // Fetch unread count from server
// //   const fetchUnreadCount = useCallback(async () => {
// //     try {
// //       const token = localStorage.getItem("token") || sessionStorage.getItem("token");
// //       if (!token) return;
// //       const res = await fetch("http://localhost:5000/api/admin/chats/unread/count", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       const data = await res.json();
// //       if (data.success) setUnreadCount(data.count || 0);
// //     } catch {}
// //   }, []);

// //   // Fetch on mount + every 30s
// //   useEffect(() => {
// //     fetchUnreadCount();
// //     const interval = setInterval(fetchUnreadCount, 30000);
// //     return () => clearInterval(interval);
// //   }, [fetchUnreadCount]);

// //   // Real-time: re-fetch badge when a new message notification arrives
// //   useEffect(() => {
// //     if (!onNewMessageNotification) return;
// //     const unsub = onNewMessageNotification(() => {
// //       fetchUnreadCount();
// //     });
// //     return unsub;
// //   }, [onNewMessageNotification, fetchUnreadCount]);

// //   // Also listen to new_message socket events
// //   useEffect(() => {
// //     const unsub = onNewMessage("*", () => {
// //       fetchUnreadCount();
// //     });
// //     return unsub;
// //   }, [onNewMessage, fetchUnreadCount]);

// //   // Clear badge when navigating to messages page
// //   useEffect(() => {
// //     if (location.pathname === "/admin/messages") {
// //       setUnreadCount(0);
// //     }
// //   }, [location.pathname]);

// //   const handleLogout = () => {
// //     localStorage.removeItem("token");
// //     localStorage.removeItem("user");
// //     sessionStorage.removeItem("token");
// //     sessionStorage.removeItem("user");
// //     navigate("/login");
// //   };

// //   const sidebarItems = [
// //     {
// //       id: "dashboard",
// //       path: "/admin/dashboard",
// //       icon: FaTachometerAlt,
// //       label: "Dashboard",
// //       bgColor: "bg-gradient-to-r from-blue-500 to-cyan-500",
// //     },
// //     {
// //       id: "inventory",
// //       path: "/admin/inventory",
// //       icon: FaList,
// //       label: "Vehicle Inventory",
// //       bgColor: "bg-gradient-to-r from-emerald-500 to-teal-500",
// //     },
// //     {
// //       id: "bikes",
// //       path: "/admin/bikes",
// //       icon: FaMotorcycle,
// //       label: "Bikes",
// //       bgColor: "bg-gradient-to-r from-purple-500 to-pink-500",
// //     },
// //     {
// //       id: "bookings",
// //       path: "/admin/bookings",
// //       icon: FaCheckCircle,
// //       label: "Manage Car Bookings",
// //       bgColor: "bg-gradient-to-r from-orange-500 to-red-500",
// //     },
// //     {
// //       id: "bikeBookings",
// //       path: "/admin/bike-bookings",
// //       icon: FaMotorcycle,
// //       label: "Manage Bike Bookings",
// //       bgColor: "bg-gradient-to-r from-purple-500 to-pink-500",
// //     },
// //     {
// //       id: "vehicleVerification",
// //       path: "/admin/vehicle-verification",
// //       icon: FaShieldAlt,
// //       label: "Vehicle Verification",
// //       bgColor: "bg-gradient-to-r from-indigo-500 to-purple-500",
// //     },
// //     {
// //       id: "revenue",
// //       path: "/admin/revenue",
// //       icon: FaChartLine,
// //       label: "Revenue",
// //       bgColor: "bg-gradient-to-r from-green-500 to-emerald-500",
// //     },
// //     {
// //       id: "reports",
// //       path: "/admin/reports",
// //       icon: FaFileAlt,
// //       label: "Reports",
// //       bgColor: "bg-gradient-to-r from-indigo-500 to-purple-500",
// //     },
// //     {
// //       id: "messages",
// //       path: "/admin/messages",
// //       icon: FaComments,
// //       label: "Messages",
// //       bgColor: "bg-gradient-to-r from-blue-500 to-purple-500",
// //       badge: true, // shows unread count badge
// //     },
// //   ];

// //   const isActive = (path) => location.pathname === path;

// //   return (
// //     <div className="h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
// //       {/* Sidebar */}
// //       <div
// //         className={`fixed top-0 left-0 h-full backdrop-blur-xl bg-white/95 shadow-2xl transition-all duration-300 z-20 ${
// //           sidebarOpen ? "w-72" : "w-20"
// //         }`}
// //         style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
// //       >
// //         {/* Logo */}
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
// //                   <p className="text-xs text-gray-500 mt-0.5">Admin Panel</p>
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

// //         {/* Admin info */}
// //         {sidebarOpen && user && (
// //           <div className="mx-4 mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
// //             <div className="flex items-center gap-3">
// //               <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
// //                 <FaUserCircle className="text-white text-2xl" />
// //               </div>
// //               <div className="flex-1">
// //                 <p className="font-semibold text-gray-800">{user.name}</p>
// //                 <p className="text-xs text-gray-500 truncate">{user.email}</p>
// //                 <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded-full">
// //                   Administrator
// //                 </span>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {/* Nav */}
// //         <nav
// //           className="mt-6 px-3 overflow-y-auto pb-24"
// //           style={{ maxHeight: "calc(100vh - 220px)" }}
// //         >
// //           <p
// //             className={`text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 ${
// //               !sidebarOpen && "text-center"
// //             }`}
// //           >
// //             {sidebarOpen ? "MAIN MENU" : "..."}
// //           </p>
// //           {sidebarItems.map((item) => {
// //             const Icon = item.icon;
// //             const active = isActive(item.path);
// //             const isHovered = hoveredItem === item.id;
// //             const showBadge = item.badge && unreadCount > 0;

// //             return (
// //               <button
// //                 key={item.id}
// //                 onClick={() => navigate(item.path)}
// //                 onMouseEnter={() => setHoveredItem(item.id)}
// //                 onMouseLeave={() => setHoveredItem(null)}
// //                 className={`relative w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-xl transition-all duration-300 group ${
// //                   active
// //                     ? `${item.bgColor} text-white shadow-lg`
// //                     : "text-gray-600 hover:bg-gray-100"
// //                 } ${!sidebarOpen && "justify-center"}`}
// //               >
// //                 {/* Icon with dot badge when collapsed */}
// //                 <div className="relative flex-shrink-0">
// //                   <Icon
// //                     className={`text-xl ${
// //                       active ? "text-white" : "text-gray-500"
// //                     } transition-transform duration-300 group-hover:scale-110`}
// //                   />
// //                   {!sidebarOpen && showBadge && (
// //                     <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-[16px] bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5 shadow-md animate-pulse">
// //                       {unreadCount > 99 ? "99+" : unreadCount}
// //                     </span>
// //                   )}
// //                 </div>

// //                 {sidebarOpen && (
// //                   <span className={`font-medium flex-1 text-left ${active ? "text-white" : ""}`}>
// //                     {item.label}
// //                   </span>
// //                 )}

// //                 {/* Pill badge when sidebar is open */}
// //                 {sidebarOpen && showBadge && (
// //                   <span className={`ml-auto min-w-[22px] h-[22px] px-1.5 text-[11px] font-bold rounded-full flex items-center justify-center shadow-sm ${
// //                     active ? "bg-white/25 text-white" : "bg-red-500 text-white animate-pulse"
// //                   }`}>
// //                     {unreadCount > 99 ? "99+" : unreadCount}
// //                   </span>
// //                 )}

// //                 {!sidebarOpen && isHovered && (
// //                   <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded whitespace-nowrap z-50 flex items-center gap-2">
// //                     {item.label}
// //                     {showBadge && (
// //                       <span className="bg-red-500 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5">
// //                         {unreadCount}
// //                       </span>
// //                     )}
// //                   </div>
// //                 )}

// //                 {active && sidebarOpen && (
// //                   <div className="absolute left-0 w-1 h-8 bg-white rounded-r-full" />
// //                 )}
// //               </button>
// //             );
// //           })}
// //         </nav>

// //         {/* Logout */}
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

// //       {/* Main content */}
// //       <div
// //         className={`transition-all duration-300 h-screen overflow-y-auto ${
// //           sidebarOpen ? "ml-72" : "ml-20"
// //         }`}
// //       >
// //         <Outlet />
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminLayout;

// import React, { useState, useEffect, useCallback } from "react";
// import { Outlet, useNavigate, useLocation } from "react-router-dom";
// import {
//   FaCar,
//   FaTachometerAlt,
//   FaList,
//   FaCheckCircle,
//   FaChartLine,
//   FaSignOutAlt,
//   FaBars,
//   FaUserCircle,
//   FaShieldAlt,
//   FaComments,
//   FaMotorcycle,
//   FaFileAlt,
//   FaUsers ,
// } from "react-icons/fa";
// import { useSocket } from "../../context/SocketContext"; // ← correct path from src/components/Admin/

// const AdminLayout = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [user, setUser] = useState(null);
//   const [hoveredItem, setHoveredItem] = useState(null);
//   const [unreadCount, setUnreadCount] = useState(0);

//   const { onNewMessage, onNewMessageNotification } = useSocket();

//   useEffect(() => {
//     const userData = JSON.parse(
//       localStorage.getItem("user") || sessionStorage.getItem("user") || "null",
//     );
//     if (userData) setUser(userData);
//   }, []);

//   // Fetch unread count from server
//   const fetchUnreadCount = useCallback(async () => {
//     try {
//       const token = localStorage.getItem("token") || sessionStorage.getItem("token");
//       if (!token) return;
//       const res = await fetch("http://localhost:5000/api/admin/chats/unread/count", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       if (data.success) setUnreadCount(data.count || 0);
//     } catch {}
//   }, []);

//   // Fetch on mount + every 30s
//   useEffect(() => {
//     fetchUnreadCount();
//     const interval = setInterval(fetchUnreadCount, 30000);
//     return () => clearInterval(interval);
//   }, [fetchUnreadCount]);

//   // Real-time: re-fetch badge when a new message notification arrives
//   useEffect(() => {
//     if (!onNewMessageNotification) return;
//     const unsub = onNewMessageNotification(() => {
//       fetchUnreadCount();
//     });
//     return unsub;
//   }, [onNewMessageNotification, fetchUnreadCount]);

//   // Also listen to new_message socket events
//   useEffect(() => {
//     const unsub = onNewMessage("*", () => {
//       fetchUnreadCount();
//     });
//     return unsub;
//   }, [onNewMessage, fetchUnreadCount]);

//   // Clear badge when navigating to messages page
//   useEffect(() => {
//     if (location.pathname === "/admin/messages") {
//       setUnreadCount(0);
//     }
//   }, [location.pathname]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     sessionStorage.removeItem("token");
//     sessionStorage.removeItem("user");
//     navigate("/login");
//   };

//   const sidebarItems = [
//     {
//       id: "dashboard",
//       path: "/admin/dashboard",
//       icon: FaTachometerAlt,
//       label: "Dashboard",
//       bgColor: "bg-gradient-to-r from-blue-500 to-cyan-500",
//     },
//     {
//       id: "inventory",
//       path: "/admin/inventory",
//       icon: FaList,
//       label: "Vehicle Inventory",
//       bgColor: "bg-gradient-to-r from-emerald-500 to-teal-500",
//     },
//     {
//       id: "bikes",
//       path: "/admin/bikes",
//       icon: FaMotorcycle,
//       label: "Bikes Invent",
//       bgColor: "bg-gradient-to-r from-purple-500 to-pink-500",
//     },
//     {
//       id: "bookings",
//       path: "/admin/bookings",
//       icon: FaCheckCircle,
//       label: "Manage Car Bookings",
//       bgColor: "bg-gradient-to-r from-orange-500 to-red-500",
//     },
//     {
//       id: "bikeBookings",
//       path: "/admin/bike-bookings",
//       icon: FaMotorcycle,
//       label: "Manage Bike Bookings",
//       bgColor: "bg-gradient-to-r from-purple-500 to-pink-500",
//     },
//     {
//       id: "vehicleVerification",
//       path: "/admin/vehicle-verification",
//       icon: FaShieldAlt,
//       label: "Vehicle Verification",
//       bgColor: "bg-gradient-to-r from-indigo-500 to-purple-500",
//     },
//     {
//       id: "revenue",
//       path: "/admin/revenue",
//       icon: FaChartLine,
//       label: "Revenue",
//       bgColor: "bg-gradient-to-r from-green-500 to-emerald-500",
//     },
//     {
//       id: "reports",
//       path: "/admin/reports",
//       icon: FaFileAlt,
//       label: "Reports",
//       bgColor: "bg-gradient-to-r from-indigo-500 to-purple-500",
//     },
//     {
//       id: "messages",
//       path: "/admin/messages",
//       icon: FaComments,
//       label: "Messages",
//       bgColor: "bg-gradient-to-r from-blue-500 to-purple-500",
//       badge: true, // shows unread count badge
//     },

//     {
//     id: "users",
//     path: "/admin/users",         // 👈 THIS ONE IS FOR USER MANAGEMENT
//     icon: FaUsers,                // Where you manage users (warnings, blocks, reports)
//     label: "User Management",
//     bgColor: "bg-gradient-to-r from-purple-500 to-pink-500",
//   },
//   ];

//   const isActive = (path) => location.pathname === path;

//   return (
//     <div className="h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-full backdrop-blur-xl bg-white/95 shadow-2xl transition-all duration-300 z-20 ${
//           sidebarOpen ? "w-72" : "w-20"
//         }`}
//         style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
//       >
//         {/* Logo */}
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
//                   <p className="text-xs text-gray-500 mt-0.5">Admin Panel</p>
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

//         {/* Admin info */}
//         {sidebarOpen && user && (
//           <div className="mx-4 mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
//             <div className="flex items-center gap-3">
//               <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
//                 <FaUserCircle className="text-white text-2xl" />
//               </div>
//               <div className="flex-1">
//                 <p className="font-semibold text-gray-800">{user.name}</p>
//                 <p className="text-xs text-gray-500 truncate">{user.email}</p>
//                 <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded-full">
//                   Administrator
//                 </span>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Nav */}
//         <nav
//           className="mt-6 px-3 overflow-y-auto pb-24"
//           style={{ maxHeight: "calc(100vh - 220px)" }}
//         >
//           <p
//             className={`text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 ${
//               !sidebarOpen && "text-center"
//             }`}
//           >
//             {sidebarOpen ? "MAIN MENU" : "..."}
//           </p>
//           {sidebarItems.map((item) => {
//             const Icon = item.icon;
//             const active = isActive(item.path);
//             const isHovered = hoveredItem === item.id;
//             const showBadge = item.badge && unreadCount > 0;

//             return (
//               <button
//                 key={item.id}
//                 onClick={() => navigate(item.path)}
//                 onMouseEnter={() => setHoveredItem(item.id)}
//                 onMouseLeave={() => setHoveredItem(null)}
//                 className={`relative w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-xl transition-all duration-300 group ${
//                   active
//                     ? `${item.bgColor} text-white shadow-lg`
//                     : "text-gray-600 hover:bg-gray-100"
//                 } ${!sidebarOpen && "justify-center"}`}
//               >
//                 {/* Icon with dot badge when collapsed */}
//                 <div className="relative flex-shrink-0">
//                   <Icon
//                     className={`text-xl ${
//                       active ? "text-white" : "text-gray-500"
//                     } transition-transform duration-300 group-hover:scale-110`}
//                   />
//                   {!sidebarOpen && showBadge && (
//                     <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-[16px] bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5 shadow-md animate-pulse">
//                       {unreadCount > 99 ? "99+" : unreadCount}
//                     </span>
//                   )}
//                 </div>

//                 {sidebarOpen && (
//                   <span className={`font-medium flex-1 text-left ${active ? "text-white" : ""}`}>
//                     {item.label}
//                   </span>
//                 )}

//                 {/* Pill badge when sidebar is open */}
//                 {sidebarOpen && showBadge && (
//                   <span className={`ml-auto min-w-[22px] h-[22px] px-1.5 text-[11px] font-bold rounded-full flex items-center justify-center shadow-sm ${
//                     active ? "bg-white/25 text-white" : "bg-red-500 text-white animate-pulse"
//                   }`}>
//                     {unreadCount > 99 ? "99+" : unreadCount}
//                   </span>
//                 )}

//                 {!sidebarOpen && isHovered && (
//                   <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded whitespace-nowrap z-50 flex items-center gap-2">
//                     {item.label}
//                     {showBadge && (
//                       <span className="bg-red-500 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5">
//                         {unreadCount}
//                       </span>
//                     )}
//                   </div>
//                 )}

//                 {active && sidebarOpen && (
//                   <div className="absolute left-0 w-1 h-8 bg-white rounded-r-full" />
//                 )}
//               </button>
//             );
//           })}
//         </nav>

//         {/* Logout */}
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

//       {/* Main content */}
//       <div
//         className={`transition-all duration-300 h-screen overflow-y-auto ${
//           sidebarOpen ? "ml-72" : "ml-20"
//         }`}
//       >
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;

import React, { useState, useEffect, useCallback } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  FaCar,
  FaTachometerAlt,
  FaList,
  FaCheckCircle,
  FaChartLine,
  FaSignOutAlt,
  FaBars,
  FaUserCircle,
  FaShieldAlt,
  FaComments,
  FaMotorcycle,
  FaFileAlt,
  FaUsers,
} from "react-icons/fa";
import { useSocket } from "../../context/SocketContext";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  const { onNewMessage, onNewMessageNotification } = useSocket();

  useEffect(() => {
    const userData = JSON.parse(
      localStorage.getItem("user") || sessionStorage.getItem("user") || "null",
    );
    if (userData) setUser(userData);
  }, []);

  const fetchUnreadCount = useCallback(async () => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) return;
      const res = await fetch(
        "http://localhost:5000/api/admin/chats/unread/count",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await res.json();
      if (data.success) setUnreadCount(data.count || 0);
    } catch {}
  }, []);

  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, [fetchUnreadCount]);

  useEffect(() => {
    if (!onNewMessageNotification) return;
    const unsub = onNewMessageNotification(() => {
      fetchUnreadCount();
    });
    return unsub;
  }, [onNewMessageNotification, fetchUnreadCount]);

  useEffect(() => {
    const unsub = onNewMessage("*", () => {
      fetchUnreadCount();
    });
    return unsub;
  }, [onNewMessage, fetchUnreadCount]);

  useEffect(() => {
    if (location.pathname === "/admin/messages") {
      setUnreadCount(0);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  const sidebarItems = [
    {
      id: "dashboard",
      path: "/admin/dashboard",
      icon: FaTachometerAlt,
      label: "Dashboard",
      bgColor: "bg-gradient-to-r from-blue-500 to-cyan-500",
      activeCollapsedBg: "bg-blue-100",
      activeCollapsedText: "text-blue-600",
    },
    {
      id: "inventory",
      path: "/admin/inventory",
      icon: FaList,
      label: "Vehicle Inventory",
      bgColor: "bg-gradient-to-r from-emerald-500 to-teal-500",
      activeCollapsedBg: "bg-emerald-100",
      activeCollapsedText: "text-emerald-600",
    },
    {
      id: "bikes",
      path: "/admin/bikes",
      icon: FaMotorcycle,
      label: "Bikes Invent",
      bgColor: "bg-gradient-to-r from-purple-500 to-pink-500",
      activeCollapsedBg: "bg-purple-100",
      activeCollapsedText: "text-purple-600",
    },
    {
      id: "bookings",
      path: "/admin/bookings",
      icon: FaCheckCircle,
      label: "Manage Car Bookings",
      bgColor: "bg-gradient-to-r from-orange-500 to-red-500",
      activeCollapsedBg: "bg-orange-100",
      activeCollapsedText: "text-orange-600",
    },
    {
      id: "bikeBookings",
      path: "/admin/bike-bookings",
      icon: FaMotorcycle,
      label: "Manage Bike Bookings",
      bgColor: "bg-gradient-to-r from-purple-500 to-pink-500",
      activeCollapsedBg: "bg-purple-100",
      activeCollapsedText: "text-purple-600",
    },
    {
      id: "vehicleVerification",
      path: "/admin/vehicle-verification",
      icon: FaShieldAlt,
      label: "Vehicle Verification",
      bgColor: "bg-gradient-to-r from-indigo-500 to-purple-500",
      activeCollapsedBg: "bg-indigo-100",
      activeCollapsedText: "text-indigo-600",
    },
    {
      id: "revenue",
      path: "/admin/revenue",
      icon: FaChartLine,
      label: "Revenue",
      bgColor: "bg-gradient-to-r from-green-500 to-emerald-500",
      activeCollapsedBg: "bg-green-100",
      activeCollapsedText: "text-green-600",
    },
    {
      id: "reports",
      path: "/admin/reports",
      icon: FaFileAlt,
      label: "Reports",
      bgColor: "bg-gradient-to-r from-indigo-500 to-purple-500",
      activeCollapsedBg: "bg-indigo-100",
      activeCollapsedText: "text-indigo-600",
    },
    {
      id: "messages",
      path: "/admin/messages",
      icon: FaComments,
      label: "Messages",
      bgColor: "bg-gradient-to-r from-blue-500 to-purple-500",
      activeCollapsedBg: "bg-blue-100",
      activeCollapsedText: "text-blue-600",
      badge: true,
    },
    {
      id: "users",
      path: "/admin/users",
      icon: FaUsers,
      label: "User Management",
      bgColor: "bg-gradient-to-r from-purple-500 to-pink-500",
      activeCollapsedBg: "bg-purple-100",
      activeCollapsedText: "text-purple-600",
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full backdrop-blur-xl bg-white/95 shadow-2xl transition-all duration-300 z-20 ${
          sidebarOpen ? "w-72" : "w-20"
        }`}
        style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg flex-shrink-0">
                <FaCar className="text-white text-2xl" />
              </div>
              {sidebarOpen && (
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Rent<span className="text-gray-800">Ride</span>
                  </h1>
                  <p className="text-xs text-gray-500 mt-0.5">Admin Panel</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300 flex-shrink-0"
            >
              <FaBars className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Admin info */}
        {sidebarOpen && user && (
          <div className="mx-4 mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                <FaUserCircle className="text-white text-2xl" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded-full">
                  Administrator
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav
          className="mt-6 px-3 overflow-y-auto pb-24"
          style={{ maxHeight: "calc(100vh - 220px)" }}
        >
          <p
            className={`text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 ${
              !sidebarOpen && "text-center"
            }`}
          >
            {sidebarOpen ? "MAIN MENU" : "..."}
          </p>

          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            const isHovered = hoveredItem === item.id;
            const showBadge = item.badge && unreadCount > 0;

            // Determine button classes based on open/collapsed + active state
            const buttonClass = [
              "relative w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-xl transition-all duration-300 group",
              !sidebarOpen && "justify-center",
              active
                ? sidebarOpen
                  ? `${item.bgColor} text-white shadow-lg`
                  : `${item.activeCollapsedBg} ${item.activeCollapsedText}`
                : "text-gray-600 hover:bg-gray-100",
            ]
              .filter(Boolean)
              .join(" ");

            const iconClass = [
              "text-xl transition-transform duration-300 group-hover:scale-110",
              active
                ? sidebarOpen
                  ? "text-white"
                  : item.activeCollapsedText
                : "text-gray-500",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={buttonClass}
              >
                {/* Icon with dot badge when collapsed */}
                <div className="relative flex-shrink-0">
                  <Icon className={iconClass} />
                  {!sidebarOpen && showBadge && (
                    <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-[16px] bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5 shadow-md animate-pulse">
                      {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                  )}
                </div>

                {/* Label */}
                {sidebarOpen && (
                  <span
                    className={`font-medium flex-1 text-left ${
                      active ? "text-white" : ""
                    }`}
                  >
                    {item.label}
                  </span>
                )}

                {/* Pill badge when open */}
                {sidebarOpen && showBadge && (
                  <span
                    className={`ml-auto min-w-[22px] h-[22px] px-1.5 text-[11px] font-bold rounded-full flex items-center justify-center shadow-sm ${
                      active
                        ? "bg-white/25 text-white"
                        : "bg-red-500 text-white animate-pulse"
                    }`}
                  >
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}

                {/* Tooltip when collapsed */}
                {!sidebarOpen && isHovered && (
                  <div className="absolute left-full ml-2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap z-50 flex items-center gap-2 shadow-xl">
                    {item.label}
                    {showBadge && (
                      <span className="bg-red-500 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                )}

                {/* Active left bar indicator */}
                {active && sidebarOpen && (
                  <div className="absolute left-0 w-1 h-8 bg-white rounded-r-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 bg-white/95">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              !sidebarOpen && "justify-center"
            } bg-red-50 hover:bg-red-100 text-red-600 group`}
          >
            <FaSignOutAlt className="text-xl transition-transform duration-300 group-hover:scale-110 flex-shrink-0" />
            {sidebarOpen && <span className="font-medium">Logout</span>}
            {!sidebarOpen && hoveredItem === "logout" && (
              <div className="absolute left-full ml-2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap z-50 shadow-xl">
                Logout
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div
        className={`transition-all duration-300 h-screen overflow-y-auto ${
          sidebarOpen ? "ml-72" : "ml-20"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
