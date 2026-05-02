import React, { useState, useEffect, useRef } from "react";
import {
  FaWallet,
  FaRupeeSign,
  FaCalendarAlt,
  FaChartLine,
  FaChartBar,
  FaChartPie,
  FaPercentage,
  FaEye,
  FaInfoCircle,
  FaTimes,
  FaCheckCircle,
  FaClock,
  FaCar,
  FaArrowUp,
  FaArrowDown,
  FaListAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE = "http://localhost:5000";

// ── Tiny bar chart (pure CSS/SVG, no library needed) ─────────────────────────
const MiniBarChart = ({ data, color = "#22c55e" }) => {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="flex items-end gap-1 h-16">
      {data.map((d, i) => (
        <div key={i} className="flex flex-col items-center flex-1 gap-1">
          <div
            className="w-full rounded-t-sm transition-all duration-500"
            style={{
              height: `${Math.max((d.value / max) * 56, 2)}px`,
              backgroundColor: color,
              opacity: 0.7 + (i / data.length) * 0.3,
            }}
            title={`${d.label}: रु ${d.value?.toLocaleString("en-NP")}`}
          />
          <span className="text-[8px] text-gray-400 truncate w-full text-center">
            {d.label}
          </span>
        </div>
      ))}
    </div>
  );
};

// ── Donut chart (SVG) ─────────────────────────────────────────────────────────
const DonutChart = ({ segments, size = 120 }) => {
  const r = 40;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const total = segments.reduce((a, s) => a + s.value, 0);
  if (total === 0) return null;

  let offset = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f3f4f6" strokeWidth="16" />
      {segments.map((seg, i) => {
        const dash = (seg.value / total) * circumference;
        const gap = circumference - dash;
        const el = (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={seg.color}
            strokeWidth="16"
            strokeDasharray={`${dash} ${gap}`}
            strokeDashoffset={-offset}
            strokeLinecap="butt"
            style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
          />
        );
        offset += dash;
        return el;
      })}
      <text x={cx} y={cy - 4} textAnchor="middle" className="text-xs font-bold" fontSize="11" fill="#111">
        {segments.length}
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" fontSize="8" fill="#6b7280">
        vehicles
      </text>
    </svg>
  );
};

// ── Helper ────────────────────────────────────────────────────────────────────
const fmt = (a) => `रु ${(a || 0).toLocaleString("en-NP")}`;
const fmtDate = (d) => {
  if (!d) return "—";
  const date = new Date(d);
  if (isNaN(date)) return "—";
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};

const getPaymentLabel = (status) => {
  if (status === "paid") return { label: "Paid", cls: "bg-green-100 text-green-700" };
  if (status === "partial") return { label: "Partial", cls: "bg-blue-100 text-blue-700" };
  if (status === "refunded") return { label: "Refunded", cls: "bg-gray-100 text-gray-600" };
  if (status === "failed") return { label: "Failed", cls: "bg-red-100 text-red-700" };
  return { label: "Pending", cls: "bg-yellow-100 text-yellow-700" };
};

const getBookingStatusLabel = (status) => {
  const map = {
    confirmed: { label: "Confirmed", cls: "bg-green-100 text-green-700" },
    completed: { label: "Completed", cls: "bg-blue-100 text-blue-700" },
    active: { label: "Active", cls: "bg-purple-100 text-purple-700" },
    approved: { label: "Approved", cls: "bg-cyan-100 text-cyan-700" },
    pending: { label: "Pending", cls: "bg-yellow-100 text-yellow-700" },
    cancelled: { label: "Cancelled", cls: "bg-red-100 text-red-700" },
  };
  return map[status] || { label: status || "Unknown", cls: "bg-gray-100 text-gray-600" };
};

// ─────────────────────────────────────────────────────────────────────────────
const EarningsTab = () => {
  const navigate = useNavigate();
  const [earnings, setEarnings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSubTab, setActiveSubTab] = useState("overview"); // overview | vehicles | reports
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const getToken = () =>
    localStorage.getItem("token") || sessionStorage.getItem("token");

  useEffect(() => {
    fetchEarnings();
  }, []);

  const fetchEarnings = async () => {
    try {
      setLoading(true);
      const token = getToken();
      if (!token) return;
      const res = await axios.get(`${BASE}/api/user-vehicles/my-earnings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setEarnings(res.data.data || res.data || null);
      }
    } catch (err) {
      console.error("Earnings fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ── Loading ─────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 text-sm">Loading earnings data...</p>
      </div>
    );
  }

  // ── No earnings ─────────────────────────────────────────────────────────
  const hasEarnings = earnings && (earnings.totalEarnings > 0 || (earnings.vehicles && earnings.vehicles.length > 0));

  if (!hasEarnings) {
    return (
      <div>
        <PageHeader />
        <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaWallet className="text-green-300 text-3xl" />
          </div>
          <p className="text-gray-700 font-semibold text-lg">No earnings yet</p>
          <p className="text-sm text-gray-400 mt-1 max-w-xs mx-auto">
            When users book your listed vehicles and pay, your earnings will appear here.
          </p>
          <button
            onClick={() => navigate("/list-vehicle")}
            className="mt-5 px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition text-sm font-medium"
          >
            List a Vehicle
          </button>
        </div>
      </div>
    );
  }

  const vehicles = earnings.vehicles || [];
  const totalEarnings = earnings.totalEarnings || 0;
  const totalBookings = earnings.totalBookings || 0;
  const grossRevenue = earnings.grossRevenue || 0;
  const avgPerBooking = earnings.averagePerBooking || (totalBookings > 0 ? totalEarnings / totalBookings : 0);

  // Build chart data from vehicles
  const barData = vehicles.map((v) => ({
    label: (v.vehicle?.carName || "Vehicle").slice(0, 6),
    value: v.ownerEarnings || 0,
  }));

  const donutSegments = vehicles.map((v, i) => ({
    value: v.grossRevenue || 0,
    color: ["#3b82f6", "#22c55e", "#f59e0b", "#8b5cf6", "#ef4444", "#06b6d4"][i % 6],
    name: v.vehicle?.carName,
  }));

  // Collect all bookings across all vehicles for reports tab
  const allBookings = vehicles.flatMap((v) =>
    (v.bookings || []).map((b) => ({
      ...b,
      vehicleName: v.vehicle?.carName || "Unknown",
      vehicleNumber: v.vehicle?.carNumber || "",
      ownerEarning: (b.totalAmount || 0) * 0.7,
    }))
  ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <>
      <div>
        <PageHeader />

        {/* ── Sub-tab switcher ── */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6 w-fit">
          {[
            { id: "overview", label: "Overview", icon: FaChartPie },
            { id: "vehicles", label: "By Vehicle", icon: FaCar },
            { id: "reports", label: "Reports", icon: FaChartBar },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSubTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeSubTab === id
                  ? "bg-white shadow text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Icon size={13} /> {label}
            </button>
          ))}
        </div>

        {/* ══════════════════════ OVERVIEW TAB ══════════════════════ */}
        {activeSubTab === "overview" && (
          <>
            {/* Stats cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
              <StatCard icon={<FaRupeeSign />} bg="bg-green-100" iconColor="text-green-600"
                label="Your Earnings (70%)" value={fmt(totalEarnings)} valueClass="text-green-600" />
              <StatCard icon={<FaCalendarAlt />} bg="bg-blue-100" iconColor="text-blue-600"
                label="Total Bookings" value={totalBookings} valueClass="text-blue-600" />
              <StatCard icon={<FaChartLine />} bg="bg-purple-100" iconColor="text-purple-600"
                label="Gross Revenue" value={fmt(grossRevenue)} valueClass="text-purple-600" />
              <StatCard icon={<FaPercentage />} bg="bg-orange-100" iconColor="text-orange-600"
                label="Avg per Booking" value={fmt(avgPerBooking)} valueClass="text-orange-600" />
            </div>

            {/* Charts row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
              {/* Bar chart */}
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-800">Earnings by Vehicle</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Your 70% share per vehicle</p>
                  </div>
                  <FaChartBar className="text-blue-400 text-lg" />
                </div>
                {barData.length > 0 ? (
                  <MiniBarChart data={barData} color="#3b82f6" />
                ) : (
                  <p className="text-xs text-gray-400 py-8 text-center">No data</p>
                )}
              </div>

              {/* Donut + legend */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-800">Revenue Share</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Gross per vehicle</p>
                  </div>
                  <FaChartPie className="text-purple-400 text-lg" />
                </div>
                <div className="flex items-center gap-4">
                  <DonutChart segments={donutSegments} size={110} />
                  <div className="flex flex-col gap-2 flex-1 min-w-0">
                    {donutSegments.map((seg, i) => (
                      <div key={i} className="flex items-center gap-2 min-w-0">
                        <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: seg.color }} />
                        <span className="text-[11px] text-gray-600 truncate">{seg.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Commission info */}
            <CommissionBanner />

            {/* Recent bookings preview */}
            {allBookings.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800">Recent Bookings</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Latest 5 earning bookings</p>
                  </div>
                  <button
                    onClick={() => setActiveSubTab("reports")}
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                  >
                    View all <FaArrowUp className="rotate-90" size={10} />
                  </button>
                </div>
                <div className="divide-y divide-gray-50">
                  {allBookings.slice(0, 5).map((booking, idx) => (
                    <BookingRow key={idx} booking={booking} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* ══════════════════════ BY VEHICLE TAB ══════════════════════ */}
        {activeSubTab === "vehicles" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <h3 className="font-semibold text-gray-800">Earnings by Vehicle</h3>
              <p className="text-xs text-gray-500 mt-0.5">Click "View Details" to see individual bookings</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-gray-50">
                  <tr>
                    {["Vehicle", "Bookings", "Gross Revenue", "Your Earnings (70%)", "Action"].map((h) => (
                      <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {vehicles.map((ve, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {ve.vehicle?.vehiclePhotos?.[0] ? (
                            <img
                              src={`${BASE}${ve.vehicle.vehiclePhotos[0].url}`}
                              alt={ve.vehicle?.carName}
                              className="w-11 h-11 object-cover rounded-xl border border-gray-100"
                            />
                          ) : (
                            <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center">
                              <FaCar className="text-blue-300 text-lg" />
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">{ve.vehicle?.carName || "Unknown"}</p>
                            <p className="text-xs text-gray-400">{ve.vehicle?.carNumber || ""}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                          <FaCalendarAlt size={9} /> {ve.totalBookings || 0}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-700 text-sm">
                        {fmt(ve.grossRevenue || 0)}
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-green-600 text-sm">{fmt(ve.ownerEarnings || 0)}</span>
                        <p className="text-[11px] text-gray-400 mt-0.5">70% of {fmt(ve.grossRevenue || 0)}</p>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => { setSelectedVehicle(ve); setShowModal(true); }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold rounded-lg transition"
                        >
                          <FaEye size={11} /> View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ══════════════════════ REPORTS TAB ══════════════════════ */}
        {activeSubTab === "reports" && (
          <div>
            {/* Summary row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-5 text-white">
                <p className="text-green-100 text-xs font-medium mb-1">Total Earned</p>
                <p className="text-2xl font-bold">{fmt(totalEarnings)}</p>
                <p className="text-green-200 text-xs mt-1">After 30% platform commission</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-5 text-white">
                <p className="text-blue-100 text-xs font-medium mb-1">Platform Commission</p>
                <p className="text-2xl font-bold">{fmt(grossRevenue - totalEarnings)}</p>
                <p className="text-blue-200 text-xs mt-1">30% of रु {grossRevenue.toLocaleString("en-NP")}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl p-5 text-white">
                <p className="text-purple-100 text-xs font-medium mb-1">Vehicles Listed</p>
                <p className="text-2xl font-bold">{vehicles.length}</p>
                <p className="text-purple-200 text-xs mt-1">{totalBookings} total booking{totalBookings !== 1 ? "s" : ""}</p>
              </div>
            </div>

            {/* Full booking history table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">All Booking Earnings</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{allBookings.length} record{allBookings.length !== 1 ? "s" : ""} found</p>
                </div>
                <FaListAlt className="text-gray-300 text-lg" />
              </div>

              {allBookings.length === 0 ? (
                <div className="py-16 text-center">
                  <FaWallet className="text-4xl text-gray-200 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm">No booking records yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-100">
                    <thead className="bg-gray-50">
                      <tr>
                        {["Booking ID", "Vehicle", "Customer", "Dates", "Amount", "Payment", "Status", "You Earn"].map((h) => (
                          <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {allBookings.map((b, idx) => {
                        const payment = getPaymentLabel(b.paymentStatus);
                        const bStatus = getBookingStatusLabel(b.status);
                        return (
                          <tr key={idx} className="hover:bg-gray-50 transition">
                            <td className="px-4 py-3">
                              <span className="text-xs font-mono font-semibold text-gray-700">
                                #{b.confirmationCode || b._id?.slice(-8) || "—"}
                              </span>
                              <p className="text-[10px] text-gray-400 mt-0.5">{fmtDate(b.createdAt)}</p>
                            </td>
                            <td className="px-4 py-3">
                              <p className="text-xs font-medium text-gray-800">{b.vehicleName}</p>
                              <p className="text-[10px] text-gray-400">{b.vehicleNumber}</p>
                            </td>
                            <td className="px-4 py-3">
                              <p className="text-xs text-gray-700">{b.user?.name || "N/A"}</p>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <p className="text-xs text-gray-700">{fmtDate(b.pickupDate)}</p>
                              <p className="text-[10px] text-gray-400">→ {fmtDate(b.returnDate)}</p>
                              <p className="text-[10px] text-blue-500 mt-0.5">
                                {b.totalDays ? `${b.totalDays} day${b.totalDays !== 1 ? "s" : ""}` : "—"}
                              </p>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <p className="text-xs font-semibold text-gray-800">{fmt(b.totalAmount)}</p>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold ${payment.cls}`}>
                                {payment.label}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold ${bStatus.cls}`}>
                                {bStatus.label}
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <p className="text-xs font-bold text-green-600">{fmt(b.ownerEarning)}</p>
                              <p className="text-[10px] text-gray-400">70%</p>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    {/* Totals footer */}
                    <tfoot className="bg-gray-50 border-t-2 border-gray-200">
                      <tr>
                        <td colSpan={4} className="px-4 py-3 text-xs font-bold text-gray-700">
                          TOTAL ({allBookings.length} bookings)
                        </td>
                        <td className="px-4 py-3 text-xs font-bold text-gray-800">{fmt(grossRevenue)}</td>
                        <td colSpan={2} />
                        <td className="px-4 py-3 text-xs font-bold text-green-600">{fmt(totalEarnings)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ══════════ VEHICLE DETAIL MODAL ══════════ */}
      {showModal && selectedVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto">
            {/* Modal header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                {selectedVehicle.vehicle?.vehiclePhotos?.[0] ? (
                  <img
                    src={`${BASE}${selectedVehicle.vehicle.vehiclePhotos[0].url}`}
                    alt=""
                    className="w-10 h-10 rounded-xl object-cover border border-gray-100"
                  />
                ) : (
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <FaCar className="text-blue-400" />
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-gray-900">{selectedVehicle.vehicle?.carName}</h3>
                  <p className="text-xs text-gray-400">{selectedVehicle.vehicle?.carNumber}</p>
                </div>
              </div>
              <button
                onClick={() => { setShowModal(false); setSelectedVehicle(null); }}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 transition"
              >
                <FaTimes size={16} />
              </button>
            </div>

            {/* Summary pills */}
            <div className="grid grid-cols-3 gap-3 px-6 py-4 border-b border-gray-100">
              <div className="bg-green-50 rounded-xl p-3 text-center">
                <p className="text-[10px] text-gray-500 mb-1">Your Earnings</p>
                <p className="font-bold text-green-600">{fmt(selectedVehicle.ownerEarnings || 0)}</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-3 text-center">
                <p className="text-[10px] text-gray-500 mb-1">Gross Revenue</p>
                <p className="font-bold text-blue-600">{fmt(selectedVehicle.grossRevenue || 0)}</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-3 text-center">
                <p className="text-[10px] text-gray-500 mb-1">Bookings</p>
                <p className="font-bold text-purple-600">{selectedVehicle.totalBookings || 0}</p>
              </div>
            </div>

            {/* Booking list */}
            <div className="p-6">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Booking History</h4>
              {selectedVehicle.bookings?.length > 0 ? (
                <div className="space-y-3">
                  {selectedVehicle.bookings.map((booking, idx) => {
                    const payment = getPaymentLabel(booking.paymentStatus);
                    const bStatus = getBookingStatusLabel(booking.status);
                    return (
                      <div key={idx} className="border border-gray-100 rounded-xl p-4 hover:shadow-sm transition bg-gray-50/40">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="font-semibold text-gray-800 text-sm">
                              #{booking.confirmationCode || booking._id?.slice(-8) || "—"}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">{fmtDate(booking.createdAt)}</p>
                            <div className="flex items-center gap-2 mt-1.5">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${payment.cls}`}>
                                {payment.label}
                              </span>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${bStatus.cls}`}>
                                {bStatus.label}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-800 text-sm">{fmt(booking.totalAmount)}</p>
                            <p className="text-xs text-green-600 font-semibold mt-0.5">
                              You earn: {fmt((booking.totalAmount || 0) * 0.7)}
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Customer</span>
                            <span className="font-medium text-gray-700">{booking.user?.name || "N/A"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Duration</span>
                            <span className="font-medium text-gray-700">
                              {booking.totalDays ? `${booking.totalDays} day${booking.totalDays !== 1 ? "s" : ""}` : "—"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Pickup</span>
                            <span className="font-medium text-gray-700">{fmtDate(booking.pickupDate)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Return</span>
                            <span className="font-medium text-gray-700">{fmtDate(booking.returnDate)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-10">
                  <FaRupeeSign className="text-3xl text-gray-200 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">No bookings for this vehicle yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// ── Sub-components ────────────────────────────────────────────────────────────
const PageHeader = () => (
  <div className="mb-6">
    <h2 className="text-2xl font-bold text-gray-900 mb-1">My Earnings</h2>
    <p className="text-gray-500 text-sm">
      Track your earnings from vehicles listed on RentRide — you receive 70% of every booking.
    </p>
  </div>
);

const StatCard = ({ icon, bg, iconColor, label, value, valueClass }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
    <div className={`p-3 ${bg} rounded-xl flex-shrink-0`}>
      <span className={`text-xl ${iconColor}`}>{icon}</span>
    </div>
    <div className="min-w-0">
      <p className="text-xs text-gray-500 truncate">{label}</p>
      <p className={`text-xl font-bold mt-0.5 ${valueClass}`}>{value}</p>
    </div>
  </div>
);

const CommissionBanner = () => (
  <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 flex items-start gap-3">
    <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0 mt-0.5">
      <FaInfoCircle className="text-blue-600 text-sm" />
    </div>
    <p className="text-sm text-blue-800">
      <strong>Commission structure:</strong> RentRide takes 30% on each booking.
      You receive the remaining <strong>70%</strong> once payment is confirmed.
    </p>
  </div>
);

const BookingRow = ({ booking }) => {
  const payment = getPaymentLabel(booking.paymentStatus);
  return (
    <div className="px-6 py-3 flex items-center justify-between gap-4 hover:bg-gray-50 transition">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800">
          #{booking.confirmationCode || booking._id?.slice(-8) || "—"}
        </p>
        <p className="text-xs text-gray-400">{booking.vehicleName} · {fmtDate(booking.createdAt)}</p>
      </div>
      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold flex-shrink-0 ${payment.cls}`}>
        {payment.label}
      </span>
      <div className="text-right flex-shrink-0">
        <p className="text-sm font-bold text-gray-800">{fmt(booking.totalAmount)}</p>
        <p className="text-xs text-green-600">+{fmt(booking.ownerEarning)}</p>
      </div>
    </div>
  );
};

export default EarningsTab;