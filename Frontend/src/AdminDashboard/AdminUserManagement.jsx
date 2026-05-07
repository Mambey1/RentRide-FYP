

// export default AdminUserManagement;
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  FaUsers,
  FaShieldAlt,
  FaBan,
  FaCheckCircle,
  FaTrash,
  FaExclamationTriangle,
  FaEye,
  FaGavel,
  FaSpinner,
  FaTimes,
  FaUserCheck,
  FaUserSlash,
  FaSearch,
  FaFilter,
  FaDownload,
  FaFlag,
  FaCamera,
  FaCar,
  FaCalendarAlt,
  FaEnvelope,
  FaIdCard,
  FaUser,
  FaLock,
  FaUnlock,
  FaHistory,
  FaImage,
  FaMotorcycle,
  FaChevronRight,
  FaInfoCircle,
  FaTimesCircle,
  FaArrowLeft,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE = "http://localhost:5000";
const token = () => localStorage.getItem("token") || sessionStorage.getItem("token");
const authHeader = () => ({ Authorization: `Bearer ${token()}` });

// ─── Inline Confirm Modal (replaces window.confirm) ───
const ConfirmModal = ({ isOpen, title, message, confirmLabel, confirmColor = "red", onConfirm, onCancel, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        <div className={`px-6 py-5 border-b border-gray-100 flex items-center gap-3`}>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${confirmColor === "red" ? "bg-red-100" : confirmColor === "yellow" ? "bg-yellow-100" : "bg-blue-100"}`}>
            <FaExclamationTriangle className={confirmColor === "red" ? "text-red-500" : confirmColor === "yellow" ? "text-yellow-500" : "text-blue-500"} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">{message}</p>
          </div>
        </div>
        {children && <div className="px-6 py-4">{children}</div>}
        <div className="px-6 py-4 flex gap-3 justify-end border-t border-gray-100">
          <button onClick={onCancel} className="px-5 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition font-medium">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-5 py-2 rounded-xl text-sm text-white font-semibold transition ${confirmColor === "red" ? "bg-red-500 hover:bg-red-600" : confirmColor === "yellow" ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-500 hover:bg-blue-600"}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Image Viewer ───
const ImageViewer = ({ src, onClose }) => {
  if (!src) return null;
  return (
    <div className="fixed inset-0 z-[300] bg-black/90 flex items-center justify-center p-4" onClick={onClose}>
      <button className="absolute top-4 right-4 text-white/70 hover:text-white transition">
        <FaTimes size={28} />
      </button>
      <img src={src} alt="Preview" className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl" onClick={(e) => e.stopPropagation()} />
    </div>
  );
};

// ─── Stat Card ───
const StatCard = ({ label, value, icon: Icon, gradient, sub }) => (
  <div className={`${gradient} rounded-2xl p-5 text-white relative overflow-hidden`}>
    <div className="absolute right-4 top-4 opacity-20">
      <Icon size={40} />
    </div>
    <p className="text-sm font-medium opacity-90 mb-1">{label}</p>
    <p className="text-3xl font-bold">{value}</p>
    {sub && <p className="text-xs opacity-75 mt-1">{sub}</p>}
  </div>
);

// ─── Status Badge ───
const StatusBadge = ({ isBlocked }) => (
  isBlocked
    ? <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700"><FaBan size={9} /> Blocked</span>
    : <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700"><FaCheckCircle size={9} /> Active</span>
);

// ─── Warning Pip ───
const WarningPips = ({ count }) => (
  <div className="flex items-center gap-1">
    {[0, 1, 2].map((i) => (
      <div key={i} className={`w-2.5 h-2.5 rounded-full transition-all ${i < count ? (count >= 3 ? "bg-red-500" : count >= 2 ? "bg-orange-400" : "bg-yellow-400") : "bg-gray-200"}`} />
    ))}
    <span className={`text-xs font-semibold ml-1 ${count >= 3 ? "text-red-600" : count >= 2 ? "text-orange-500" : count >= 1 ? "text-yellow-600" : "text-gray-400"}`}>
      {count}/3
    </span>
  </div>
);

const REPORT_STATUS_STYLES = {
  pending: "bg-amber-100 text-amber-700 border-amber-200",
  reviewed: "bg-blue-100 text-blue-700 border-blue-200",
  action_taken: "bg-emerald-100 text-emerald-700 border-emerald-200",
  dismissed: "bg-gray-100 text-gray-500 border-gray-200",
};

const AdminUserManagement = () => {
  const [activeTab, setActiveTab] = useState("users"); // "users" | "reports"
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Detail panel (right-side drawer)
  const [detailUser, setDetailUser] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailTab, setDetailTab] = useState("profile"); // profile | bookings | listings | warnings | reports

  // Reports tab
  const [reports, setReports] = useState([]);
  const [reportsLoading, setReportsLoading] = useState(false);
  const [reportFilter, setReportFilter] = useState("all");

  // Image viewer
  const [viewImage, setViewImage] = useState(null);

  // Confirm modals state
  const [confirm, setConfirm] = useState({ open: false, type: "", userId: null, inputVal: "" });

  // Warning modal
  const [warningModal, setWarningModal] = useState({ open: false, userId: null, userName: "", warningCount: 0 });
  const [warningReason, setWarningReason] = useState("");
  const [warningSubmitting, setWarningSubmitting] = useState(false);

  // Report action modal
  const [reportActionModal, setReportActionModal] = useState({ open: false, report: null, adminNote: "" });
  const [reportActionLoading, setReportActionLoading] = useState(false);

  useEffect(() => { fetchUsers(); fetchReports(); }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE}/api/admin/users`, { headers: authHeader() });
      setUsers(res.data.users || []);
    } catch (e) {
      toast.error("Failed to fetch users");
    } finally { setLoading(false); }
  };

  const fetchReports = async () => {
    setReportsLoading(true);
    try {
      const res = await axios.get(`${BASE}/api/admin/reports`, { headers: authHeader() });
      setReports(res.data.reports || []);
    } catch (e) {
      toast.error("Failed to fetch reports");
    } finally { setReportsLoading(false); }
  };

  const fetchUserDetails = async (userId) => {
    setDetailLoading(true);
    setDetailTab("profile");
    try {
      const res = await axios.get(`${BASE}/api/admin/users/${userId}`, { headers: authHeader() });
      setDetailUser(res.data);
    } catch (e) {
      toast.error("Failed to load user details");
    } finally { setDetailLoading(false); }
  };

  // ─── Actions ───
  const handleGiveWarning = async () => {
    if (!warningReason.trim()) { toast.error("Please enter a reason."); return; }
    setWarningSubmitting(true);
    try {
      const res = await axios.post(
        `${BASE}/api/admin/users/${warningModal.userId}/warning`,
        { reason: warningReason },
        { headers: authHeader() }
      );
      toast.success(res.data.message);
      setWarningModal({ open: false, userId: null, userName: "", warningCount: 0 });
      setWarningReason("");
      fetchUsers();
      if (detailUser?.user?._id === warningModal.userId) fetchUserDetails(warningModal.userId);
      fetchReports();
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to give warning");
    } finally { setWarningSubmitting(false); }
  };

  const handleBlockUser = async (userId, reason) => {
    try {
      const res = await axios.post(`${BASE}/api/admin/users/${userId}/block`, { reason }, { headers: authHeader() });
      toast.success(res.data.message);
      fetchUsers();
      if (detailUser?.user?._id === userId) fetchUserDetails(userId);
    } catch (e) { toast.error(e.response?.data?.message || "Failed to block user"); }
    setConfirm({ open: false, type: "", userId: null, inputVal: "" });
  };

  const handleUnblockUser = async (userId, reason) => {
    try {
      const res = await axios.post(`${BASE}/api/admin/users/${userId}/unblock`, { reason }, { headers: authHeader() });
      toast.success(res.data.message);
      fetchUsers();
      if (detailUser?.user?._id === userId) fetchUserDetails(userId);
    } catch (e) { toast.error(e.response?.data?.message || "Failed to unblock user"); }
    setConfirm({ open: false, type: "", userId: null, inputVal: "" });
  };

  const handleResetWarnings = async (userId) => {
    try {
      const res = await axios.post(`${BASE}/api/admin/users/${userId}/reset-warnings`, {}, { headers: authHeader() });
      toast.success(res.data.message);
      fetchUsers();
      if (detailUser?.user?._id === userId) fetchUserDetails(userId);
    } catch (e) { toast.error("Failed to reset warnings"); }
    setConfirm({ open: false, type: "", userId: null, inputVal: "" });
  };

  const handleDeleteUser = async (userId) => {
    try {
      const res = await axios.delete(`${BASE}/api/admin/users/${userId}`, { headers: authHeader() });
      toast.success(res.data.message);
      fetchUsers();
      if (detailUser?.user?._id === userId) setDetailUser(null);
    } catch (e) { toast.error(e.response?.data?.message || "Failed to delete user"); }
    setConfirm({ open: false, type: "", userId: null, inputVal: "" });
  };

  const handleUpdateReportStatus = async (reportId, status) => {
    setReportActionLoading(true);
    try {
      await axios.patch(
        `${BASE}/api/admin/reports/${reportId}/status`,
        { status, adminNote: reportActionModal.adminNote },
        { headers: authHeader() }
      );
      toast.success("Report status updated");
      setReportActionModal({ open: false, report: null, adminNote: "" });
      fetchReports();
    } catch (e) { toast.error("Failed to update report"); }
    finally { setReportActionLoading(false); }
  };

  // ─── Filtered data ───
  const filteredUsers = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter =
      filterStatus === "all" ||
      (filterStatus === "blocked" && u.isBlocked) ||
      (filterStatus === "active" && !u.isBlocked) ||
      (filterStatus === "warnings" && u.warningCount > 0);
    return matchSearch && matchFilter;
  });

  const filteredReports = reports.filter((r) =>
    reportFilter === "all" ? true : r.status === reportFilter
  );

  const pendingReportsCount = reports.filter((r) => r.status === "pending").length;

  const exportCSV = () => {
    const rows = filteredUsers.map((u) => [
      u.name, u.email, u.isBlocked ? "Blocked" : "Active",
      u.warningCount, new Date(u.createdAt).toLocaleDateString()
    ]);
    const csv = [["Name", "Email", "Status", "Warnings", "Joined"], ...rows].map((r) => r.join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = `users_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    toast.success("CSV exported");
  };

  // ─── Render ───
  if (loading) return (
    <div className="flex items-center justify-center h-96">
      <div className="text-center">
        <FaSpinner className="text-blue-500 animate-spin text-4xl mx-auto mb-3" />
        <p className="text-gray-500 text-sm">Loading users…</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/60">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <ImageViewer src={viewImage} onClose={() => setViewImage(null)} />

      <div className="p-6 max-w-screen-xl mx-auto">
        {/* ── Page Header ── */}
        <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
            <p className="text-sm text-gray-500 mt-1">Manage accounts, warnings, blocks and reports</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <button onClick={exportCSV}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 shadow-sm transition">
              <FaDownload size={12} /> Export CSV
            </button>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Users" value={users.length} icon={FaUsers} gradient="bg-gradient-to-br from-blue-500 to-cyan-500" />
          <StatCard label="Active" value={users.filter((u) => !u.isBlocked).length} icon={FaUserCheck} gradient="bg-gradient-to-br from-emerald-500 to-teal-500" />
          <StatCard label="Blocked" value={users.filter((u) => u.isBlocked).length} icon={FaBan} gradient="bg-gradient-to-br from-red-500 to-rose-500" />
          <StatCard
            label="Pending Reports"
            value={pendingReportsCount}
            icon={FaFlag}
            gradient="bg-gradient-to-br from-orange-500 to-amber-500"
            sub={pendingReportsCount > 0 ? "Needs review" : "All clear"}
          />
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-1 mb-6 bg-white border border-gray-200 rounded-xl p-1 w-fit shadow-sm">
          {[
            { key: "users", label: "Users", icon: FaUsers },
            { key: "reports", label: `Reports${pendingReportsCount > 0 ? ` (${pendingReportsCount})` : ""}`, icon: FaFlag },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === tab.key
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              <tab.icon size={13} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* ══════════ USERS TAB ══════════ */}
        {activeTab === "users" && (
          <div className={`flex gap-6 ${detailUser ? "flex-col xl:flex-row" : ""}`}>
            {/* Left: Table */}
            <div className={`flex-1 min-w-0 ${detailUser ? "xl:max-w-[55%]" : ""}`}>
              {/* Filters */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 mb-4">
                <div className="flex gap-3 flex-wrap">
                  <div className="relative flex-1 min-w-[200px]">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={12} />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search by name or email…"
                      className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                    />
                  </div>
                  <div className="relative">
                    <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={12} />
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="pl-9 pr-8 py-2 border border-gray-200 rounded-xl text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                      <option value="all">All Users</option>
                      <option value="active">Active</option>
                      <option value="blocked">Blocked</option>
                      <option value="warnings">Has Warnings</option>
                    </select>
                  </div>
                  <span className="self-center text-xs text-gray-400">{filteredUsers.length} users</span>
                </div>
              </div>

              {/* Users List */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                {filteredUsers.length === 0 ? (
                  <div className="text-center py-16 text-gray-400">
                    <FaUsers size={40} className="mx-auto mb-3 opacity-30" />
                    <p className="text-sm font-medium">No users found</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {filteredUsers.map((u) => (
                      <div
                        key={u._id}
                        className={`flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 transition cursor-pointer group ${detailUser?.user?._id === u._id ? "bg-blue-50 border-l-4 border-l-blue-500" : "border-l-4 border-l-transparent"}`}
                        onClick={() => fetchUserDetails(u._id)}
                      >
                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                          {u.profilePhoto ? (
                            <img src={`${BASE}/uploads/profiles/${u.profilePhoto}`} alt={u.name}
                              className="w-10 h-10 rounded-full object-cover" />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                              {u.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                          {u.isBlocked && (
                            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                              <FaBan className="text-white" size={7} />
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-sm font-semibold text-gray-900 truncate">{u.name}</p>
                            <StatusBadge isBlocked={u.isBlocked} />
                          </div>
                          <p className="text-xs text-gray-400 truncate">{u.email}</p>
                        </div>

                        {/* Warning pips */}
                        <div className="hidden sm:block flex-shrink-0">
                          {u.warningCount > 0 && <WarningPips count={u.warningCount} />}
                        </div>

                        <FaChevronRight size={11} className="text-gray-300 group-hover:text-gray-500 transition flex-shrink-0" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right: Detail Panel */}
            {detailUser && (
              <div className="flex-1 min-w-0 xl:max-w-[45%]">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden sticky top-6">
                  {detailLoading ? (
                    <div className="flex items-center justify-center h-64">
                      <FaSpinner className="animate-spin text-blue-400 text-2xl" />
                    </div>
                  ) : (
                    <>
                      {/* Detail header */}
                      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50">
                        <div className="flex items-center gap-3">
                          {detailUser.user.profilePhoto ? (
                            <img
                              src={`${BASE}/uploads/profiles/${detailUser.user.profilePhoto}`}
                              alt={detailUser.user.name}
                              className="w-12 h-12 rounded-xl object-cover cursor-pointer hover:opacity-90 transition border border-white shadow-sm"
                              onClick={() => setViewImage(`${BASE}/uploads/profiles/${detailUser.user.profilePhoto}`)}
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                              {detailUser.user.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <h3 className="font-bold text-gray-900 text-sm">{detailUser.user.name}</h3>
                            <p className="text-xs text-gray-500">{detailUser.user.email}</p>
                          </div>
                        </div>
                        <button onClick={() => setDetailUser(null)}
                          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/80 text-gray-400 hover:text-gray-600 transition">
                          <FaTimes size={14} />
                        </button>
                      </div>

                      {/* Status bar */}
                      <div className="flex items-center gap-3 px-5 py-2.5 bg-white border-b border-gray-100">
                        <StatusBadge isBlocked={detailUser.user.isBlocked} />
                        <WarningPips count={detailUser.user.warningCount || 0} />
                        {detailUser.user.kycVerified && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full">
                            <FaIdCard size={9} /> KYC
                          </span>
                        )}
                        {detailUser.user.isEmailVerified && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-600 text-xs font-semibold rounded-full">
                            <FaCheckCircle size={9} /> Verified
                          </span>
                        )}
                      </div>

                      {/* Detail tabs */}
                      <div className="flex border-b border-gray-100 overflow-x-auto">
                        {[
                          { key: "profile", label: "Profile", icon: FaUser },
                          { key: "bookings", label: `Bookings (${detailUser.bookings?.length || 0})`, icon: FaCalendarAlt },
                          { key: "listings", label: `Listings (${detailUser.vehicles?.length || 0})`, icon: FaCar },
                          { key: "warnings", label: `Warnings (${detailUser.warnings?.length || 0})`, icon: FaExclamationTriangle },
                          { key: "reports", label: `Reports (${detailUser.reports?.length || 0})`, icon: FaFlag },
                        ].map((t) => (
                          <button
                            key={t.key}
                            onClick={() => setDetailTab(t.key)}
                            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold whitespace-nowrap border-b-2 transition ${
                              detailTab === t.key
                                ? "border-blue-500 text-blue-600"
                                : "border-transparent text-gray-500 hover:text-gray-700"
                            }`}
                          >
                            <t.icon size={10} />
                            {t.label}
                          </button>
                        ))}
                      </div>

                      {/* Detail content */}
                      <div className="p-5 max-h-[55vh] overflow-y-auto">
                        {/* Profile tab */}
                        {detailTab === "profile" && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                              {[
                                { label: "Full Name", value: detailUser.user.name },
                                { label: "Username", value: `@${detailUser.user.username || detailUser.user.email.split("@")[0]}` },
                                { label: "Gender", value: detailUser.user.gender || "Not specified" },
                                { label: "Role", value: detailUser.user.role || "user", className: "capitalize" },
                                { label: "Joined", value: new Date(detailUser.user.createdAt).toLocaleDateString() },
                                { label: "Warnings", value: `${detailUser.user.warningCount || 0}/3`, className: detailUser.user.warningCount >= 3 ? "text-red-600 font-bold" : "text-yellow-600 font-semibold" },
                              ].map((item) => (
                                <div key={item.label} className="bg-gray-50 rounded-xl p-3">
                                  <p className="text-xs text-gray-400 mb-0.5">{item.label}</p>
                                  <p className={`text-sm font-semibold text-gray-800 truncate ${item.className || ""}`}>{item.value}</p>
                                </div>
                              ))}
                            </div>
                            {detailUser.user.isBlocked && (
                              <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-1">
                                  <FaBan className="text-red-400" size={12} />
                                  <p className="text-xs font-semibold text-red-700">Blocked</p>
                                </div>
                                <p className="text-xs text-red-600">{detailUser.user.blockedReason || "No reason specified"}</p>
                                {detailUser.user.blockedAt && (
                                  <p className="text-xs text-red-400 mt-1">{new Date(detailUser.user.blockedAt).toLocaleString()}</p>
                                )}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Bookings tab */}
                        {detailTab === "bookings" && (
                          <div>
                            {(!detailUser.bookings || detailUser.bookings.length === 0) ? (
                              <div className="text-center py-10 text-gray-400">
                                <FaCalendarAlt size={32} className="mx-auto mb-2 opacity-30" />
                                <p className="text-sm">No bookings yet</p>
                              </div>
                            ) : (
                              <div className="space-y-3">
                                {detailUser.bookings.map((b) => (
                                  <div key={b._id} className="border border-gray-100 rounded-xl p-3 hover:border-gray-200 transition">
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                      <div>
                                        <p className="text-sm font-semibold text-gray-800 truncate">
                                          {b.vehicle?.carName || b.bike?.name || "Vehicle"}
                                        </p>
                                        <p className="text-xs text-gray-400">Code: {b.confirmationCode || b.bookingCode || "—"}</p>
                                      </div>
                                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${
                                        b.status === "completed" ? "bg-emerald-100 text-emerald-700" :
                                        b.status === "cancelled" ? "bg-red-100 text-red-600" :
                                        b.status === "active" ? "bg-blue-100 text-blue-700" :
                                        "bg-gray-100 text-gray-600"
                                      } capitalize`}>
                                        {b.status}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-gray-400">
                                      <span>📅 {new Date(b.pickupDate || b.startDate || b.createdAt).toLocaleDateString()}</span>
                                      {b.totalAmount && <span>💰 Rs. {b.totalAmount.toLocaleString()}</span>}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Listings tab */}
                        {detailTab === "listings" && (
                          <div>
                            {(!detailUser.vehicles || detailUser.vehicles.length === 0) ? (
                              <div className="text-center py-10 text-gray-400">
                                <FaCar size={32} className="mx-auto mb-2 opacity-30" />
                                <p className="text-sm">No listings yet</p>
                              </div>
                            ) : (
                              <div className="space-y-3">
                                {detailUser.vehicles.map((v) => {
                                  const thumb = v.vehiclePhotos?.[0]?.url || null;
                                  return (
                                    <div key={v._id} className="border border-gray-100 rounded-xl p-3 hover:border-gray-200 transition flex gap-3">
                                      {thumb ? (
                                        <img
                                          src={`${BASE}${thumb}`}
                                          alt={v.carName}
                                          className="w-16 h-14 rounded-lg object-cover flex-shrink-0 cursor-pointer hover:opacity-90 transition"
                                          onClick={() => setViewImage(`${BASE}${thumb}`)}
                                        />
                                      ) : (
                                        <div className="w-16 h-14 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                                          <FaImage size={20} className="text-gray-300" />
                                        </div>
                                      )}
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2">
                                          <p className="text-sm font-semibold text-gray-800 truncate">{v.carName}</p>
                                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap capitalize ${
                                            v.status === "active" ? "bg-emerald-100 text-emerald-700" :
                                            v.status === "pending" ? "bg-amber-100 text-amber-700" :
                                            v.status === "rejected" ? "bg-red-100 text-red-600" :
                                            "bg-gray-100 text-gray-600"
                                          }`}>{v.status}</span>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-0.5 truncate">{v.city}</p>
                                        {v.ratePerDay && (
                                          <p className="text-xs text-blue-600 font-medium mt-1">Rs. {v.ratePerDay?.toLocaleString()}/day</p>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Warnings tab */}
                        {detailTab === "warnings" && (
                          <div>
                            {(!detailUser.warnings || detailUser.warnings.length === 0) ? (
                              <div className="text-center py-10 text-gray-400">
                                <FaExclamationTriangle size={32} className="mx-auto mb-2 opacity-30" />
                                <p className="text-sm">No warnings issued</p>
                              </div>
                            ) : (
                              <div className="space-y-3">
                                {detailUser.warnings.map((w, idx) => (
                                  <div key={idx} className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">Warning #{idx + 1}</span>
                                      <span className="text-xs text-gray-400">{new Date(w.createdAt).toLocaleString()}</span>
                                    </div>
                                    <p className="text-sm text-gray-800">{w.reason}</p>
                                    <p className="text-xs text-gray-400 mt-1">By: {w.givenBy?.name || "Admin"}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Reports tab (reports against this user) */}
                        {detailTab === "reports" && (
                          <div>
                            {(!detailUser.reports || detailUser.reports.length === 0) ? (
                              <div className="text-center py-10 text-gray-400">
                                <FaFlag size={32} className="mx-auto mb-2 opacity-30" />
                                <p className="text-sm">No reports against this user</p>
                              </div>
                            ) : (
                              <div className="space-y-3">
                                {detailUser.reports.map((r, idx) => (
                                  <div key={idx} className="bg-red-50 border border-red-100 rounded-xl p-4">
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="text-xs font-bold text-red-600 capitalize">{r.reason?.replace("_", " ")}</span>
                                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${REPORT_STATUS_STYLES[r.status] || REPORT_STATUS_STYLES.pending}`}>
                                        {r.status}
                                      </span>
                                    </div>
                                    <p className="text-sm text-gray-700">{r.description}</p>
                                    <p className="text-xs text-gray-400 mt-1">By: {r.reportedBy?.name || "Anonymous"} · {new Date(r.createdAt).toLocaleString()}</p>
                                    {r.screenshotProof && (
                                      <button
                                        onClick={() => setViewImage(`${BASE}${r.screenshotProof}`)}
                                        className="mt-2 text-xs text-blue-600 hover:underline flex items-center gap-1">
                                        <FaImage size={10} /> View Screenshot
                                      </button>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Action footer */}
                      <div className="px-5 py-4 border-t border-gray-100 bg-gray-50 flex flex-wrap gap-2">
                        {!detailUser.user.isBlocked ? (
                          <>
                            <button
                              onClick={() => setWarningModal({ open: true, userId: detailUser.user._id, userName: detailUser.user.name, warningCount: detailUser.user.warningCount || 0 })}
                              className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold rounded-xl transition shadow-sm"
                            >
                              <FaGavel size={11} /> Warn
                            </button>
                            <button
                              onClick={() => setConfirm({ open: true, type: "block", userId: detailUser.user._id, inputVal: "" })}
                              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded-xl transition shadow-sm"
                            >
                              <FaBan size={11} /> Block
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => setConfirm({ open: true, type: "unblock", userId: detailUser.user._id, inputVal: "" })}
                            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold rounded-xl transition shadow-sm"
                          >
                            <FaUnlock size={11} /> Unblock
                          </button>
                        )}
                        {(detailUser.user.warningCount || 0) > 0 && (
                          <button
                            onClick={() => setConfirm({ open: true, type: "resetWarnings", userId: detailUser.user._id, inputVal: "" })}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold rounded-xl transition shadow-sm"
                          >
                            <FaHistory size={11} /> Reset Warnings
                          </button>
                        )}
                        <button
                          onClick={() => setConfirm({ open: true, type: "delete", userId: detailUser.user._id, inputVal: "" })}
                          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-semibold rounded-xl transition"
                        >
                          <FaTrash size={11} /> Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══════════ REPORTS TAB ══════════ */}
        {activeTab === "reports" && (
          <div>
            {/* Report filter */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 mb-4 flex gap-2 flex-wrap">
              {["all", "pending", "reviewed", "action_taken", "dismissed"].map((s) => (
                <button
                  key={s}
                  onClick={() => setReportFilter(s)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-semibold capitalize transition border ${
                    reportFilter === s
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {s.replace("_", " ")}
                  {s !== "all" && (
                    <span className="ml-1 opacity-70">({reports.filter((r) => r.status === s).length})</span>
                  )}
                </button>
              ))}
              <button
                onClick={fetchReports}
                className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
              >
                <FaSpinner className={reportsLoading ? "animate-spin" : ""} size={10} /> Refresh
              </button>
            </div>

            {reportsLoading ? (
              <div className="flex items-center justify-center h-40"><FaSpinner className="animate-spin text-blue-400 text-2xl" /></div>
            ) : filteredReports.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm text-center py-20 text-gray-400">
                <FaFlag size={40} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm font-medium">No reports</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredReports.map((report) => (
                  <div key={report._id} className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 hover:border-gray-300 transition">
                    <div className="flex items-start gap-4 flex-wrap">
                      {/* Reporter & Reported */}
                      <div className="flex-1 min-w-[200px]">
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                          <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border capitalize ${REPORT_STATUS_STYLES[report.status] || REPORT_STATUS_STYLES.pending}`}>
                            {report.status.replace("_", " ")}
                          </span>
                          <span className="text-xs text-gray-400">{new Date(report.createdAt).toLocaleString()}</span>
                        </div>

                        <div className="flex items-center gap-3 mb-2">
                          <div>
                            <p className="text-xs text-gray-400">Reported User</p>
                            <p className="text-sm font-bold text-gray-900">{report.reportedUser?.name || "Unknown"}</p>
                            <p className="text-xs text-gray-400 truncate">{report.reportedUser?.email}</p>
                          </div>
                          <div className="text-gray-200 font-bold text-lg mx-1">→</div>
                          <div>
                            <p className="text-xs text-gray-400">Reported By</p>
                            <p className="text-sm font-semibold text-gray-700">{report.reportedBy?.name || "Anonymous"}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs bg-orange-50 border border-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium capitalize">
                            {report.reason?.replace("_", " ")}
                          </span>
                        </div>

                        <p className="text-sm text-gray-700 bg-gray-50 rounded-xl p-3 leading-relaxed">{report.description}</p>

                        {report.screenshotProof && (
                          <button
                            onClick={() => setViewImage(`${BASE}${report.screenshotProof}`)}
                            className="mt-3 flex items-center gap-2 text-xs text-blue-600 hover:underline font-medium"
                          >
                            <FaImage size={12} /> View Screenshot Evidence
                          </button>
                        )}

                        {report.adminNote && (
                          <div className="mt-3 p-3 bg-blue-50 border border-blue-100 rounded-xl">
                            <p className="text-xs font-semibold text-blue-700 mb-1">Admin Note</p>
                            <p className="text-xs text-blue-600">{report.adminNote}</p>
                          </div>
                        )}
                      </div>

                      {/* Actions column */}
                      <div className="flex flex-col gap-2 flex-shrink-0">
                        <button
                          onClick={() => {
                            fetchUserDetails(report.reportedUser?._id);
                            setActiveTab("users");
                          }}
                          className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-100 rounded-xl transition whitespace-nowrap"
                        >
                          <FaEye size={11} /> View User
                        </button>

                        {report.status === "pending" && (
                          <>
                            <button
                              onClick={() => {
                                setWarningModal({
                                  open: true,
                                  userId: report.reportedUser?._id,
                                  userName: report.reportedUser?.name,
                                  warningCount: 0
                                });
                              }}
                              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-100 rounded-xl transition whitespace-nowrap"
                            >
                              <FaGavel size={11} /> Warn User
                            </button>
                            <button
                              onClick={() => setConfirm({ open: true, type: "block", userId: report.reportedUser?._id, inputVal: "" })}
                              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 border border-red-100 rounded-xl transition whitespace-nowrap"
                            >
                              <FaBan size={11} /> Block User
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => setReportActionModal({ open: true, report, adminNote: report.adminNote || "" })}
                          className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition whitespace-nowrap"
                        >
                          <FaInfoCircle size={11} /> Update Status
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ══════ WARNING MODAL ══════ */}
      {warningModal.open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-amber-50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center">
                  <FaGavel className="text-white" size={15} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">Issue Warning</h3>
                  <p className="text-xs text-gray-500">{warningModal.userName}</p>
                </div>
              </div>
              <button onClick={() => { setWarningModal({ open: false, userId: null, userName: "", warningCount: 0 }); setWarningReason(""); }}
                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-amber-100 text-gray-400 transition">
                <FaTimes size={13} />
              </button>
            </div>
            <div className="p-6">
              <div className={`mb-4 p-3 rounded-xl border text-sm ${warningModal.warningCount + 1 >= 3 ? "bg-red-50 border-red-100 text-red-700" : "bg-amber-50 border-amber-100 text-amber-700"}`}>
                {warningModal.warningCount + 1 >= 3
                  ? "⚠️ This will be the 3rd warning — user will be automatically blocked!"
                  : `After this: ${warningModal.warningCount + 1}/3 warnings. ${3 - warningModal.warningCount - 1} more until auto-block.`}
              </div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">Reason for warning <span className="text-red-400">*</span></label>
              <textarea
                value={warningReason}
                onChange={(e) => setWarningReason(e.target.value)}
                placeholder="Describe the violation or behaviour in detail…"
                rows={4}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-300 resize-none transition"
              />
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
              <button onClick={() => { setWarningModal({ open: false }); setWarningReason(""); }}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition font-medium">
                Cancel
              </button>
              <button
                onClick={handleGiveWarning}
                disabled={warningSubmitting || !warningReason.trim()}
                className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition disabled:opacity-40 flex items-center justify-center gap-2 text-sm"
              >
                {warningSubmitting ? <FaSpinner className="animate-spin" size={13} /> : <FaGavel size={13} />}
                Issue Warning
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════ BLOCK CONFIRM MODAL ══════ */}
      {confirm.open && confirm.type === "block" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3 bg-red-50">
              <div className="w-9 h-9 rounded-xl bg-red-500 flex items-center justify-center">
                <FaBan className="text-white" size={15} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Block User</h3>
                <p className="text-xs text-gray-500">This will prevent the user from logging in</p>
              </div>
            </div>
            <div className="p-6">
              <label className="block text-xs font-semibold text-gray-700 mb-2">Reason for blocking <span className="text-red-400">*</span></label>
              <textarea
                value={confirm.inputVal}
                onChange={(e) => setConfirm((p) => ({ ...p, inputVal: e.target.value }))}
                placeholder="Enter the reason for blocking this user…"
                rows={3}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-300 resize-none transition"
              />
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
              <button onClick={() => setConfirm({ open: false, type: "", userId: null, inputVal: "" })}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition font-medium">
                Cancel
              </button>
              <button
                onClick={() => handleBlockUser(confirm.userId, confirm.inputVal)}
                disabled={!confirm.inputVal.trim()}
                className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition disabled:opacity-40 text-sm flex items-center justify-center gap-2"
              >
                <FaBan size={13} /> Block User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════ UNBLOCK CONFIRM MODAL ══════ */}
      {confirm.open && confirm.type === "unblock" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3 bg-emerald-50">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center">
                <FaUnlock className="text-white" size={15} />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">Unblock User</h3>
            </div>
            <div className="p-6">
              <label className="block text-xs font-semibold text-gray-700 mb-2">Reason for unblocking</label>
              <textarea
                value={confirm.inputVal}
                onChange={(e) => setConfirm((p) => ({ ...p, inputVal: e.target.value }))}
                placeholder="Reason for unblocking…"
                rows={3}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 resize-none transition"
              />
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
              <button onClick={() => setConfirm({ open: false, type: "", userId: null, inputVal: "" })}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition font-medium">
                Cancel
              </button>
              <button
                onClick={() => handleUnblockUser(confirm.userId, confirm.inputVal || "Unblocked by admin")}
                className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition text-sm flex items-center justify-center gap-2"
              >
                <FaUnlock size={13} /> Unblock User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════ RESET WARNINGS CONFIRM ══════ */}
      <ConfirmModal
        isOpen={confirm.open && confirm.type === "resetWarnings"}
        title="Reset Warnings"
        message="This will clear all warnings for this user. Are you sure?"
        confirmLabel="Reset Warnings"
        confirmColor="blue"
        onConfirm={() => handleResetWarnings(confirm.userId)}
        onCancel={() => setConfirm({ open: false, type: "", userId: null, inputVal: "" })}
      />

      {/* ══════ DELETE CONFIRM ══════ */}
      <ConfirmModal
        isOpen={confirm.open && confirm.type === "delete"}
        title="Delete User"
        message="This action is permanent and cannot be undone. All user data will be removed."
        confirmLabel="Delete Permanently"
        confirmColor="red"
        onConfirm={() => handleDeleteUser(confirm.userId)}
        onCancel={() => setConfirm({ open: false, type: "", userId: null, inputVal: "" })}
      />

      {/* ══════ REPORT STATUS MODAL ══════ */}
      {reportActionModal.open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">Update Report Status</h3>
              <button onClick={() => setReportActionModal({ open: false, report: null, adminNote: "" })}
                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 transition">
                <FaTimes size={13} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-xs font-semibold text-gray-600 mb-1">Report by <strong>{reportActionModal.report?.reportedBy?.name}</strong> against <strong>{reportActionModal.report?.reportedUser?.name}</strong></p>
                <p className="text-xs text-gray-400 capitalize">{reportActionModal.report?.reason?.replace("_", " ")} · {reportActionModal.report?.status}</p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Admin Note</label>
                <textarea
                  value={reportActionModal.adminNote}
                  onChange={(e) => setReportActionModal((p) => ({ ...p, adminNote: e.target.value }))}
                  placeholder="Add a note about your decision…"
                  rows={3}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none transition"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {["reviewed", "action_taken", "dismissed"].map((s) => (
                  <button
                    key={s}
                    onClick={() => handleUpdateReportStatus(reportActionModal.report._id, s)}
                    disabled={reportActionLoading}
                    className={`flex-1 py-2 text-xs font-semibold rounded-xl transition border capitalize whitespace-nowrap ${
                      s === "action_taken" ? "bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-500" :
                      s === "dismissed" ? "bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200" :
                      "bg-blue-500 hover:bg-blue-600 text-white border-blue-500"
                    } disabled:opacity-50`}
                  >
                    {reportActionLoading ? <FaSpinner className="animate-spin inline" size={11} /> : s.replace("_", " ")}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserManagement;