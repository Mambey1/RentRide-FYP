
// frontend/src/AdminDashboard/AdminRevenue.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaRupeeSign, FaCar, FaUsers, FaChartLine, FaCalendarAlt,
  FaSpinner, FaDownload, FaEye, FaWallet, FaPercentage,
  FaUser, FaPhone, FaEnvelope, FaFileAlt,
} from "react-icons/fa";
import { GiScooter } from "react-icons/gi";


const API_URL = "http://localhost:5000/api";

const AdminRevenue = () => {
  const [activeTab, setActiveTab] = useState("admin");
  const [loading, setLoading] = useState(true);
  const [adminRevenue, setAdminRevenue]       = useState(null);
  const [userRevenue, setUserRevenue]         = useState(null);
  const [combinedRevenue, setCombinedRevenue] = useState(null);
  const [bikeBookings, setBikeBookings]       = useState([]);
  const [bikeSummary, setBikeSummary]         = useState({ totalBookings:0, totalRevenue:0, avgBookingValue:0 });
  const [dateRange, setDateRange]             = useState({ start:"", end:"" });
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal]             = useState(false);

  useEffect(() => { fetchAllRevenue(); }, [dateRange]);

  const fetchAllRevenue = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const params = {};
      if (dateRange.start) params.startDate = dateRange.start;
      if (dateRange.end)   params.endDate   = dateRange.end;
      const headers = { Authorization: `Bearer ${token}` };

      const [adminRes, userRes, combinedRes, bikeRes] = await Promise.allSettled([
        axios.get(`${API_URL}/revenue/admin-vehicles`,  { params, headers }),
        axios.get(`${API_URL}/revenue/user-vehicles`,   { params, headers }),
        axios.get(`${API_URL}/revenue/combined`,         { params, headers }),
        axios.get(`${API_URL}/bikes/admin/bookings`,     { params, headers }),
      ]);

      if (adminRes.status    === "fulfilled" && adminRes.value.data.success)    setAdminRevenue(adminRes.value.data.data);
      if (userRes.status     === "fulfilled" && userRes.value.data.success)     setUserRevenue(userRes.value.data.data);
      if (combinedRes.status === "fulfilled" && combinedRes.value.data.success) setCombinedRevenue(combinedRes.value.data.data);

      if (bikeRes.status === "fulfilled" && bikeRes.value.data.success) {
        const bookings = bikeRes.value.data.data || [];
        setBikeBookings(bookings);
        const paidBookings = bookings.filter(b => b.paymentStatus === "paid");
        const totalRevenue = paidBookings.reduce((s, b) => s + (b.totalAmount || 0), 0);
        setBikeSummary({
          totalBookings:   bookings.length,
          paidBookings:    paidBookings.length,
          totalRevenue,
          avgBookingValue: paidBookings.length > 0 ? Math.round(totalRevenue / paidBookings.length) : 0,
        });
      }
    } catch (error) {
      console.error("Error fetching revenue:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => "रु " + (amount || 0).toLocaleString("en-NP");

  /* ── CSV export ── */
  const exportToCSV = (data, filename) => {
    if (!data) return;

    let headers, rows;
    if (filename === "admin_revenue") {
      headers = ["Booking ID","Customer","Vehicle","Days","Total Amount","Date","Status"];
      rows = data.bookings?.map(b => [b.confirmationCode, b.user?.name||"N/A", b.vehicle?.carName||"N/A", b.totalDays, b.totalAmount, new Date(b.createdAt).toLocaleDateString(), b.status]) || [];
    } else if (filename === "user_revenue") {
      headers = ["Booking ID","Customer","Vehicle","Owner","Owner Phone","Total Amount","Commission (30%)","Owner Payout (70%)","Date"];
      rows = data.bookings?.map(b => [b.confirmationCode, b.user?.name||"N/A", b.vehicle?.carName||"N/A", b.vehicle?.fullName||"N/A", b.vehicle?.phoneNumber||"N/A", b.totalAmount, b.revenueBreakdown?.companyRevenue||0, b.revenueBreakdown?.ownerRevenue||0, new Date(b.createdAt).toLocaleDateString()]) || [];
    } else {
      // bikes
      headers = ["Booking ID","Customer","Bike","Days","Base Price","Service Fee","Total Amount","Date","Status"];
      rows = (Array.isArray(data) ? data : []).map(b => [b.confirmationCode, b.user?.name||"N/A", b.bike?.bikeName||"N/A", b.totalDays, b.basePrice, b.serviceFee, b.totalAmount, new Date(b.createdAt).toLocaleDateString(), b.status]);
    }

    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a"); a.href = url; a.download = `${filename}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  const handleExport = () => {
    if (activeTab === "admin")  exportToCSV(adminRevenue, "admin_revenue");
    if (activeTab === "user")   exportToCSV(userRevenue,  "user_revenue");
    if (activeTab === "bikes")  exportToCSV(bikeBookings, "bike_revenue");
  };

  /* ── Reusable card ── */
  const RevenueCard = ({ title, amount, subtitle, icon, color, plain }) => (
    <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-l-blue-500">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">{plain ? (amount || 0).toLocaleString() : (typeof amount === "number" ? formatCurrency(amount) : amount)}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-2">{subtitle}</p>}
        </div>
        <div className={`p-3 bg-gradient-to-r ${color} rounded-xl`}>{icon}</div>
      </div>
    </div>
  );

  /* ── Table header cell ── */
  const Th = ({ children }) => (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{children}</th>
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

  /* ── Totals for combined summary row ── */
  const bikeTotal = bikeSummary.totalRevenue;
  const grandTotal = (combinedRevenue?.totalRevenue || 0) + bikeTotal;
  const grandNet   = (combinedRevenue?.totalCompanyRevenue || 0) + bikeTotal;

  return (
    <div className="p-6">
      {/* ── Header ── */}
      <div className="mb-8">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Revenue Management
            </h1>
            <p className="text-gray-500 mt-2">Track earnings from cars and bikes</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <div className="flex items-center gap-2 bg-white rounded-lg shadow px-4 py-2">
              <FaCalendarAlt className="text-gray-400" />
              <input type="date" value={dateRange.start} onChange={e=>setDateRange({...dateRange,start:e.target.value})} className="border-none focus:outline-none text-sm" />
              <span className="text-gray-400">to</span>
              <input type="date" value={dateRange.end}   onChange={e=>setDateRange({...dateRange,end:e.target.value})}   className="border-none focus:outline-none text-sm" />
            </div>
            <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
              <FaDownload /> Export
            </button>
          </div>
        </div>
      </div>

      {/* ── Combined summary (all sources) ── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <RevenueCard title="Total Revenue (All)" amount={grandTotal}
          subtitle="Cars + bikes combined" icon={<FaRupeeSign className="text-white text-2xl" />} color="from-blue-500 to-cyan-500" />
        <RevenueCard title="Company Net Revenue" amount={grandNet}
          subtitle="After owner payouts" icon={<FaWallet className="text-white text-2xl" />} color="from-purple-500 to-pink-500" />
        <RevenueCard title="Owner Payouts" amount={combinedRevenue?.totalOwnerPayout||0}
          subtitle="Paid to user-vehicle owners" icon={<FaUsers className="text-white text-2xl" />} color="from-green-500 to-emerald-500" />
        <RevenueCard title="Bike Revenue" amount={bikeTotal}
          subtitle={`${bikeSummary.paidBookings || 0} paid of ${bikeSummary.totalBookings} bookings`} icon={<GiScooter className="text-white text-2xl" />} color="from-orange-500 to-yellow-500" />
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-2 mb-6 border-b border-gray-200 flex-wrap">
        {[
          { id:"admin", label:"Admin Vehicles (100%)",         icon:<FaCar className="inline mr-2" />,             activeColor:"text-blue-600", activeBorder:"border-blue-500" },
          { id:"user",  label:"User Vehicles (30% Commission)",icon:<FaUsers className="inline mr-2" />,           activeColor:"text-purple-600", activeBorder:"border-purple-500" },
          { id:"bikes", label:"Bikes (100%)",                  icon:<GiScooter className="inline mr-2" />,  activeColor:"text-orange-600", activeBorder:"border-orange-500" },
        ].map(({id,label,icon,activeColor,activeBorder})=>(
          <button key={id} onClick={()=>setActiveTab(id)}
            className={`px-6 py-3 font-semibold transition-all ${activeTab===id ? `border-b-2 ${activeBorder} ${activeColor}` : "text-gray-500 hover:text-gray-700"}`}>
            {icon}{label}
          </button>
        ))}
      </div>

      {/* ════════════════════════════════════════
          ADMIN VEHICLES TAB
      ════════════════════════════════════════ */}
      {activeTab === "admin" && adminRevenue && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <RevenueCard title="Total Bookings" amount={adminRevenue.summary.totalBookings} subtitle="Completed bookings" plain
              icon={<FaFileAlt className="text-white text-2xl" />} color="from-blue-500 to-cyan-500" />
            <RevenueCard title="Total Revenue" amount={adminRevenue.summary.totalRevenue} subtitle="From admin fleet"
              icon={<FaRupeeSign className="text-white text-2xl" />} color="from-green-500 to-emerald-500" />
            <RevenueCard title="Average Booking" amount={adminRevenue.summary.averageBookingValue} subtitle="Per booking value"
              icon={<FaWallet className="text-white text-2xl" />} color="from-orange-500 to-yellow-500" />
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <h2 className="text-lg font-semibold text-gray-800">Booking Transactions</h2>
              <p className="text-sm text-gray-500">Detailed list of all completed bookings</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr><Th>Booking ID</Th><Th>Customer</Th><Th>Vehicle</Th><Th>Days</Th><Th>Amount</Th><Th>Date</Th><Th>Action</Th></tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {adminRevenue.bookings?.map(booking => (
                    <tr key={booking._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-mono text-sm">{booking.confirmationCode}</td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">{booking.user?.name}</p>
                        <p className="text-sm text-gray-500">{booking.user?.email}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {booking.vehicle?.photos?.[0] && (
                            <img src={`http://localhost:5000/uploads/vehicles/${booking.vehicle.photos[0].filename}`} alt="" className="w-8 h-8 object-cover rounded" />
                          )}
                          <span className="font-medium">{booking.vehicle?.carName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">{booking.totalDays} days</td>
                      <td className="px-6 py-4 font-semibold text-green-600">{formatCurrency(booking.totalAmount)}</td>
                      <td className="px-6 py-4 text-gray-500">{new Date(booking.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <button onClick={()=>{setSelectedBooking({...booking,_modalType:"car-admin"});setShowModal(true);}} className="text-blue-600 hover:text-blue-800"><FaEye /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!adminRevenue.bookings?.length && <p className="text-center text-gray-400 py-10 text-sm">No bookings found for this period.</p>}
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════
          USER VEHICLES TAB
      ════════════════════════════════════════ */}
      {activeTab === "user" && userRevenue && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <RevenueCard title="Total Bookings" amount={userRevenue.summary.totalBookings} subtitle="User vehicle bookings" plain
              icon={<FaFileAlt className="text-white text-2xl" />} color="from-blue-500 to-cyan-500" />
            <RevenueCard title="Gross Revenue" amount={userRevenue.summary.totalRevenue} subtitle="Total collected"
              icon={<FaRupeeSign className="text-white text-2xl" />} color="from-green-500 to-emerald-500" />
            <RevenueCard title="RentRide Commission (30%)" amount={userRevenue.summary.totalCompanyRevenue} subtitle="Platform earnings"
              icon={<FaPercentage className="text-white text-2xl" />} color="from-purple-500 to-pink-500" />
            <RevenueCard title="Owner Payout (70%)" amount={userRevenue.summary.totalOwnerRevenue} subtitle="Paid to vehicle owners"
              icon={<FaUsers className="text-white text-2xl" />} color="from-orange-500 to-yellow-500" />
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <h2 className="text-lg font-semibold text-gray-800">User Vehicle Transactions</h2>
              <p className="text-sm text-gray-500">Commission: 30% to RentRide, 70% to Vehicle Owner</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr><Th>Booking ID</Th><Th>Customer</Th><Th>Vehicle</Th><Th>Owner</Th><Th>Phone</Th><Th>Total</Th><Th>Commission (30%)</Th><Th>Payout (70%)</Th><Th>Action</Th></tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userRevenue.bookings?.map(booking => (
                    <tr key={booking._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-mono text-sm">{booking.confirmationCode}</td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">{booking.user?.name}</p>
                        <p className="text-sm text-gray-500">{booking.user?.email}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {booking.vehicle?.vehiclePhotos?.[0] && (
                            <img src={`http://localhost:5000/uploads/user-vehicles/${booking.vehicle.vehiclePhotos[0].filename}`} alt="" className="w-8 h-8 object-cover rounded" />
                          )}
                          <div>
                            <span className="font-medium block">{booking.vehicle?.carName}</span>
                            <span className="text-xs text-gray-500">{booking.vehicle?.carNumber}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium">{booking.vehicle?.fullName||"N/A"}</p>
                        <p className="text-xs text-gray-500">{booking.vehicle?.address}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <FaPhone className="text-gray-400 text-xs" />
                          <span className="text-sm">{booking.vehicle?.phoneNumber||"N/A"}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-green-600">{formatCurrency(booking.totalAmount)}</td>
                      <td className="px-6 py-4">
                        <span className="text-purple-600 font-medium block">{formatCurrency(booking.revenueBreakdown?.companyRevenue)}</span>
                        <span className="text-xs text-gray-400">30%</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-orange-600 font-medium block">{formatCurrency(booking.revenueBreakdown?.ownerRevenue)}</span>
                        <span className="text-xs text-gray-400">70%</span>
                      </td>
                      <td className="px-6 py-4">
                        <button onClick={()=>{setSelectedBooking({...booking,_modalType:"car-user"});setShowModal(true);}} className="text-blue-600 hover:text-blue-800"><FaEye /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!userRevenue.bookings?.length && <p className="text-center text-gray-400 py-10 text-sm">No bookings found for this period.</p>}
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════
          BIKES TAB
      ════════════════════════════════════════ */}
      {activeTab === "bikes" && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <RevenueCard title="Total Bike Bookings" amount={bikeSummary.totalBookings} subtitle="All statuses" plain
              icon={<FaFileAlt className="text-white text-2xl" />} color="from-orange-500 to-yellow-500" />
            <RevenueCard title="Bike Revenue" amount={bikeSummary.totalRevenue} subtitle="100% company revenue"
              icon={<FaRupeeSign className="text-white text-2xl" />} color="from-green-500 to-emerald-500" />
            <RevenueCard title="Avg. Booking Value" amount={bikeSummary.avgBookingValue} subtitle="Per bike booking"
              icon={<FaWallet className="text-white text-2xl" />} color="from-purple-500 to-pink-500" />
          </div>

          {/* Bikes = 100% company revenue notice */}
          <div className="flex items-center gap-3 bg-orange-50 border border-orange-100 rounded-xl px-5 py-3.5 mb-6">
            <GiScooter className="text-orange-500 text-xl flex-shrink-0" />
            <p className="text-sm text-orange-800">
              All bikes are <strong>admin-owned</strong>. 100% of bike booking revenue goes directly to RentRide — no owner commission split.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <h2 className="text-lg font-semibold text-gray-800">Bike Booking Transactions</h2>
              <p className="text-sm text-gray-500">All bike rentals — base price + service fee + add-ons</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <Th>Booking ID</Th><Th>Customer</Th><Th>Bike</Th>
                    <Th>Days</Th><Th>Add-ons</Th><Th>Total Amount</Th>
                    <Th>Date</Th><Th>Status</Th><Th>Action</Th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bikeBookings.map(booking => (
                    <tr key={booking._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-mono text-sm">{booking.confirmationCode}</td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">{booking.user?.name || "N/A"}</p>
                        <p className="text-sm text-gray-500">{booking.user?.email}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {booking.bike?.photos?.[0] && (
                            <img src={`http://localhost:5000/uploads/bikes/${booking.bike.photos[0].filename}`} alt="" className="w-8 h-8 object-cover rounded" />
                          )}
                          <div>
                            <span className="font-medium block">{booking.bike?.bikeName || "N/A"}</span>
                            <span className="text-xs text-gray-500">{booking.bike?.bikeType}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">{booking.totalDays} days</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1 flex-wrap">
                          {booking.extraHelmet && <span className="text-xs bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-full">Helmet</span>}
                          {booking.ridingGear  && <span className="text-xs bg-purple-50 text-purple-700 border border-purple-100 px-2 py-0.5 rounded-full">Gear</span>}
                          {!booking.extraHelmet && !booking.ridingGear && <span className="text-xs text-gray-400">—</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-green-600">{formatCurrency(booking.totalAmount)}</td>
                      <td className="px-6 py-4 text-gray-500">{new Date(booking.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
                          booking.status === "completed" ? "bg-green-100 text-green-800" :
                          booking.status === "confirmed" ? "bg-blue-100 text-blue-800" :
                          booking.status === "active"    ? "bg-cyan-100 text-cyan-800" :
                          booking.status === "cancelled" ? "bg-red-100 text-red-800" :
                          booking.status === "approved"  ? "bg-indigo-100 text-indigo-800" :
                          "bg-yellow-100 text-yellow-800"
                        }`}>{booking.status}</span>
                      </td>
                      <td className="px-6 py-4">
                        <button onClick={()=>{setSelectedBooking({...booking,_modalType:"bike"});setShowModal(true);}} className="text-blue-600 hover:text-blue-800"><FaEye /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!bikeBookings.length && <p className="text-center text-gray-400 py-10 text-sm">No bike bookings found for this period.</p>}
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════
          MODAL
      ════════════════════════════════════════ */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">
                {selectedBooking._modalType === "bike" ? "Bike Booking Details" : "Booking Details"}
              </h2>
              <button onClick={()=>setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">✕</button>
            </div>

            <div className="p-6 space-y-6">
              {/* ── Booking info ── */}
              <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FaCalendarAlt className="text-blue-500" /> Booking Information
                </h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  {[
                    ["Booking ID", selectedBooking.confirmationCode],
                    ["Status", selectedBooking.status],
                    ["Booking Date", new Date(selectedBooking.createdAt).toLocaleDateString()],
                    ["Duration", `${selectedBooking.totalDays} days`],
                  ].map(([label, val]) => (
                    <div key={label}>
                      <p className="text-gray-500 text-sm">{label}</p>
                      <p className="font-semibold capitalize">{val}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Customer ── */}
              <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FaUser className="text-green-500" /> Customer Information
                </h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div><p className="text-gray-500 text-sm">Name</p><p className="font-semibold">{selectedBooking.user?.name}</p></div>
                  <div><p className="text-gray-500 text-sm">Email</p><p className="font-semibold">{selectedBooking.user?.email}</p></div>
                  <div><p className="text-gray-500 text-sm">Phone</p><p className="font-semibold">{selectedBooking.user?.phone||"N/A"}</p></div>
                </div>
              </section>

              {/* ── Vehicle / Bike ── */}
              <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  {selectedBooking._modalType === "bike" ? <GiScooter className="text-orange-500" /> : <FaCar className="text-purple-500" />}
                  {selectedBooking._modalType === "bike" ? "Bike Information" : "Vehicle Information"}
                </h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  {selectedBooking._modalType === "bike" ? (
                    <>
                      <div><p className="text-gray-500 text-sm">Bike Name</p><p className="font-semibold">{selectedBooking.bike?.bikeName}</p></div>
                      <div><p className="text-gray-500 text-sm">Bike Type</p><p className="font-semibold">{selectedBooking.bike?.bikeType}</p></div>
                      <div><p className="text-gray-500 text-sm">Engine</p><p className="font-semibold">{selectedBooking.bike?.engineCapacity||"N/A"}</p></div>
                      <div><p className="text-gray-500 text-sm">Rate Per Day</p><p className="font-semibold">{formatCurrency(selectedBooking.bike?.ratePerDay)}</p></div>
                      {selectedBooking.extraHelmet && <div><p className="text-gray-500 text-sm">Extra Helmet</p><p className="font-semibold text-blue-600">Yes</p></div>}
                      {selectedBooking.ridingGear  && <div><p className="text-gray-500 text-sm">Riding Gear</p><p className="font-semibold text-purple-600">Yes</p></div>}
                    </>
                  ) : (
                    <>
                      <div><p className="text-gray-500 text-sm">Vehicle Name</p><p className="font-semibold">{selectedBooking.vehicle?.carName}</p></div>
                      <div><p className="text-gray-500 text-sm">Car Number</p><p className="font-semibold">{selectedBooking.vehicle?.carNumber}</p></div>
                      <div><p className="text-gray-500 text-sm">Car Type</p><p className="font-semibold">{selectedBooking.vehicle?.carType}</p></div>
                      <div><p className="text-gray-500 text-sm">Rate Per Day</p><p className="font-semibold">{formatCurrency(selectedBooking.vehicle?.ratePerDay)}</p></div>
                    </>
                  )}
                </div>
              </section>

              {/* ── Owner info (user vehicles only) ── */}
              {selectedBooking._modalType === "car-user" && selectedBooking.vehicle?.fullName && (
                <section>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <FaUsers className="text-orange-500" /> Owner Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4 bg-orange-50 p-4 rounded-lg">
                    <div><p className="text-gray-500 text-sm">Owner Name</p><p className="font-semibold">{selectedBooking.vehicle.fullName}</p></div>
                    <div><p className="text-gray-500 text-sm">Phone</p><p className="font-semibold">{selectedBooking.vehicle.phoneNumber}</p></div>
                    <div><p className="text-gray-500 text-sm">Address</p><p className="font-semibold">{selectedBooking.vehicle.address}, {selectedBooking.vehicle.city}</p></div>
                    <div><p className="text-gray-500 text-sm">Citizenship No.</p><p className="font-semibold">{selectedBooking.vehicle.citizenshipNumber}</p></div>
                  </div>
                </section>
              )}

              {/* ── Payment breakdown ── */}
              <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FaRupeeSign className="text-green-500" /> Payment Breakdown
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  {[
                    [`Base Price (${selectedBooking.totalDays} days)`, selectedBooking.basePrice],
                    selectedBooking.driverFee   > 0 && ["Driver Fee",        selectedBooking.driverFee],
                    selectedBooking.insuranceFee> 0 && ["Premium Insurance", selectedBooking.insuranceFee],
                    ["Service Fee", selectedBooking.serviceFee],
                    selectedBooking._modalType === "bike" && selectedBooking.extraHelmet && ["Extra Helmet", selectedBooking.totalDays * 100],
                    selectedBooking._modalType === "bike" && selectedBooking.ridingGear  && ["Riding Gear",  selectedBooking.totalDays * 200],
                  ].filter(Boolean).map(([label, val]) => (
                    <div key={label} className="flex justify-between">
                      <span className="text-gray-600">{label}</span>
                      <span>{formatCurrency(val)}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>Total Amount</span>
                    <span className="text-green-600">{formatCurrency(selectedBooking.totalAmount)}</span>
                  </div>
                </div>
              </section>

              {/* ── Commission breakdown (user vehicles only) ── */}
              {selectedBooking._modalType === "car-user" && selectedBooking.revenueBreakdown && (
                <section>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <FaPercentage className="text-purple-500" /> Commission Breakdown
                  </h3>
                  <div className="bg-purple-50 p-4 rounded-lg grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-white rounded-lg">
                      <p className="text-sm text-gray-500">RentRide (30%)</p>
                      <p className="text-xl font-bold text-purple-600">{formatCurrency(selectedBooking.revenueBreakdown.companyRevenue)}</p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <p className="text-sm text-gray-500">Owner (70%)</p>
                      <p className="text-xl font-bold text-orange-600">{formatCurrency(selectedBooking.revenueBreakdown.ownerRevenue)}</p>
                    </div>
                  </div>
                </section>
              )}

              {/* ── Rental period ── */}
              <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FaCalendarAlt className="text-blue-500" /> Rental Period
                </h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-gray-500 text-sm">Pickup</p>
                    <p className="font-semibold">{new Date(selectedBooking.pickupDate).toLocaleDateString()} at {selectedBooking.pickupTime}</p>
                    <p className="text-sm text-gray-500">{selectedBooking.pickupLocation}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Return</p>
                    <p className="font-semibold">{new Date(selectedBooking.returnDate).toLocaleDateString()} at {selectedBooking.returnTime}</p>
                    <p className="text-sm text-gray-500">{selectedBooking.dropoffLocation}</p>
                  </div>
                </div>
              </section>

              {/* ── Bike-specific: emergency contact ── */}
              {selectedBooking._modalType === "bike" && selectedBooking.emergencyContact?.name && (
                <section>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <FaPhone className="text-red-500" /> Emergency Contact
                  </h3>
                  <div className="grid grid-cols-2 gap-4 bg-red-50 p-4 rounded-lg">
                    <div><p className="text-gray-500 text-sm">Name</p><p className="font-semibold">{selectedBooking.emergencyContact.name}</p></div>
                    <div><p className="text-gray-500 text-sm">Phone</p><p className="font-semibold">{selectedBooking.emergencyContact.phone}</p></div>
                    <div><p className="text-gray-500 text-sm">Relationship</p><p className="font-semibold">{selectedBooking.emergencyContact.relationship}</p></div>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRevenue;