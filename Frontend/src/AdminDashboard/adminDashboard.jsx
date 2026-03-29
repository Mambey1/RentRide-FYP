
// export default AdminDashboard;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaCar,
  FaCheckCircle,
  FaClock,
  FaCogs,
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

  // Check admin access on mount
  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
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
  }, []);

  const fetchVehicles = async () => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
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

  const calculateStats = (vehiclesData) => {
    const statsData = {
      totalVehicles: vehiclesData.length,
      availableVehicles: vehiclesData.filter((v) => v.status === "Available").length,
      bookedVehicles: vehiclesData.filter((v) => v.status === "Booked").length,
      maintenanceVehicles: vehiclesData.filter((v) => v.status === "Maintenance").length,
    };
    setStats(statsData);
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
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Dashboard Overview
            </h1>
            <p className="text-gray-500 mt-2">
              Welcome back, {user?.name}! Here's what's happening with your fleet today.
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/inventory")}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2.5 px-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <FaCar className="text-white" />
            Manage Vehicles
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Vehicles</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{stats.totalVehicles}</p>
              <p className="text-xs text-green-600 mt-2">↑ 12% from last month</p>
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
              <p className="text-3xl font-bold text-green-600 mt-1">{stats.availableVehicles}</p>
              <p className="text-xs text-green-600 mt-2">Ready for booking</p>
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
              <p className="text-3xl font-bold text-yellow-600 mt-1">{stats.bookedVehicles}</p>
              <p className="text-xs text-yellow-600 mt-2">Currently on rent</p>
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
              <p className="text-3xl font-bold text-red-600 mt-1">{stats.maintenanceVehicles}</p>
              <p className="text-xs text-red-600 mt-2">Under service</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl">
              <FaCogs className="text-white text-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Vehicles Table */}
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
                      {vehicle.photos && vehicle.photos[0] && (
                        <img
                          src={`http://localhost:5000/uploads/vehicles/${vehicle.photos[0].filename}`}
                          alt={vehicle.carName}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{vehicle.carName}</p>
                        <p className="text-sm text-gray-500">{vehicle.carNumber}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {vehicle.carType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold">₹{vehicle.ratePerDay}</span>
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
    </div>
  );
};

export default AdminDashboard;
