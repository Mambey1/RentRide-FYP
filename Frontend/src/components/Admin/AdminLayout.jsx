

import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  FaCar,
  FaPlus,
  FaTachometerAlt,
  FaList,
  FaCheckCircle,
  FaChartLine,
  FaSignOutAlt,
  FaBars,
  FaUserCircle,
  FaShieldAlt,
} from "react-icons/fa";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(
      localStorage.getItem("user") || sessionStorage.getItem("user") || "null",
    );
    if (userData) {
      setUser(userData);
    }
  }, []);

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
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-r from-blue-500 to-cyan-500",
    },
    {
      id: "inventory",
      path: "/admin/inventory",
      icon: FaList,
      label: "Vehicle Inventory",
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-gradient-to-r from-emerald-500 to-teal-500",
    },
    {
      id: "bookings",
      path: "/admin/bookings",
      icon: FaCheckCircle,
      label: "Manage Bookings",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-gradient-to-r from-orange-500 to-red-500",
    },
    {
      id: "vehicleVerification",
      path: "/admin/vehicle-verification",
      icon: FaShieldAlt,
      label: "Vehicle Verification",
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-gradient-to-r from-indigo-500 to-purple-500",
    },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full backdrop-blur-xl bg-white/95 shadow-2xl transition-all duration-300 z-20 ${
          sidebarOpen ? "w-72" : "w-20"
        }`}
        style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
      >
        {/* Logo Section */}
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
                  <p className="text-xs text-gray-500 mt-0.5">Admin Panel</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300"
            >
              <FaBars className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Admin Info */}
        {sidebarOpen && user && (
          <div className="mx-4 mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
                <FaUserCircle className="text-white text-2xl" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded-full">
                  Administrator
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="mt-6 px-3">
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

            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`relative w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-xl transition-all duration-300 group ${
                  active
                    ? `${item.bgColor} text-white shadow-lg`
                    : "text-gray-600 hover:bg-gray-100"
                } ${!sidebarOpen && "justify-center"}`}
              >
                <Icon
                  className={`text-xl ${
                    active ? "text-white" : "text-gray-500"
                  } transition-transform duration-300 group-hover:scale-110`}
                />
                {sidebarOpen && (
                  <span className={`font-medium ${active ? "text-white" : ""}`}>
                    {item.label}
                  </span>
                )}
                {!sidebarOpen && isHovered && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
                {active && sidebarOpen && (
                  <div className="absolute left-0 w-1 h-8 bg-white rounded-r-full"></div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
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
        className={`transition-all duration-300 ${
          sidebarOpen ? "ml-72" : "ml-20"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
