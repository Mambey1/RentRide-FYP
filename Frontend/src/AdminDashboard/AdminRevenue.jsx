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
          headers: { Authorization: `Bearer ${token}` } 
        }),
        axios.get(`${API_URL}/revenue/user-vehicles`, { 
          params, 
          headers: { Authorization: `Bearer ${token}` } 
        }),
        axios.get(`${API_URL}/revenue/combined`, { 
          params, 
          headers: { Authorization: `Bearer ${token}` } 
        })
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
    
    const headers = ["Booking ID", "User", "Vehicle", "Total Amount", "Date", "Status"];
    const rows = data.bookings.map(booking => [
      booking.confirmationCode,
      booking.user?.name || "N/A",
      booking.vehicle?.carName || "N/A",
      booking.totalAmount,
      new Date(booking.createdAt).toLocaleDateString(),
      booking.status
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");
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
          <p className="text-3xl font-bold text-gray-800 mt-1">{formatCurrency(amount)}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-2">{subtitle}</p>}
        </div>
        <div className={`p-3 bg-gradient-to-r ${color} rounded-xl`}>
          {icon}
        </div>
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
            <p className="text-gray-500 mt-2">Track earnings from fleet operations</p>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-2 bg-white rounded-lg shadow px-4 py-2">
              <FaCalendarAlt className="text-gray-400" />
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="border-none focus:outline-none text-sm"
              />
              <span className="text-gray-400">to</span>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="border-none focus:outline-none text-sm"
              />
            </div>
            <button
              onClick={() => exportToCSV(activeTab === "admin" ? adminRevenue : userRevenue, `${activeTab}_revenue`)}
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
              <h2 className="text-lg font-semibold text-gray-800">Booking Transactions</h2>
              <p className="text-sm text-gray-500">Detailed list of all completed bookings</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Booking ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vehicle</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Days</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {adminRevenue.bookings?.map((booking) => (
                    <tr key={booking._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-mono text-sm">{booking.confirmationCode}</td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{booking.user?.name}</p>
                          <p className="text-sm text-gray-500">{booking.user?.email}</p>
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
                          <span className="font-medium">{booking.vehicle?.carName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">{booking.totalDays} days</td>
                      <td className="px-6 py-4 font-semibold text-green-600">{formatCurrency(booking.totalAmount)}</td>
                      <td className="px-6 py-4 text-gray-500">{new Date(booking.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => { setSelectedBooking(booking); setShowModal(true); }}
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
              <h2 className="text-lg font-semibold text-gray-800">User Vehicle Transactions</h2>
              <p className="text-sm text-gray-500">Commission: 30% to RentRide, 70% to Vehicle Owner</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Booking ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vehicle</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Owner</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Commission (30%)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Owner Payout (70%)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userRevenue.bookings?.map((booking) => (
                    <tr key={booking._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-mono text-sm">{booking.confirmationCode}</td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{booking.user?.name}</p>
                          <p className="text-sm text-gray-500">{booking.user?.email}</p>
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
                          <span className="font-medium">{booking.vehicle?.carName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{booking.vehicle?.fullName || "N/A"}</p>
                          <p className="text-sm text-gray-500">{booking.vehicle?.phoneNumber}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-green-600">{formatCurrency(booking.totalAmount)}</td>
                      <td className="px-6 py-4">
                        <span className="text-purple-600 font-medium">{formatCurrency(booking.revenueBreakdown?.companyRevenue)}</span>
                        <p className="text-xs text-gray-400">30%</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-orange-600 font-medium">{formatCurrency(booking.revenueBreakdown?.ownerRevenue)}</span>
                        <p className="text-xs text-gray-400">70%</p>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => { setSelectedBooking(booking); setShowModal(true); }}
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

      {/* Booking Details Modal */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Booking Details</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-gray-500 text-sm">Booking ID</p><p className="font-semibold">{selectedBooking.confirmationCode}</p></div>
                <div><p className="text-gray-500 text-sm">Status</p><span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  selectedBooking.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                }`}>{selectedBooking.status}</span></div>
                <div><p className="text-gray-500 text-sm">Customer</p><p className="font-semibold">{selectedBooking.user?.name}</p></div>
                <div><p className="text-gray-500 text-sm">Email</p><p className="font-semibold">{selectedBooking.user?.email}</p></div>
                <div><p className="text-gray-500 text-sm">Vehicle</p><p className="font-semibold">{selectedBooking.vehicle?.carName}</p></div>
                <div><p className="text-gray-500 text-sm">Pickup Date</p><p className="font-semibold">{new Date(selectedBooking.pickupDate).toLocaleDateString()}</p></div>
                <div><p className="text-gray-500 text-sm">Return Date</p><p className="font-semibold">{new Date(selectedBooking.returnDate).toLocaleDateString()}</p></div>
                <div><p className="text-gray-500 text-sm">Total Amount</p><p className="font-semibold text-green-600">{formatCurrency(selectedBooking.totalAmount)}</p></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRevenue;