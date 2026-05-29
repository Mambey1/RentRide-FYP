// export default AdminVehicleVerification;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaCar,
  FaUser,
  FaPhone,
  FaIdCard,
  FaMapMarkerAlt,
  FaChair,
  FaCogs,
  FaSnowflake,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaEye,
  FaFileAlt,
  FaSearch,
  FaInfoCircle,
  FaTimes,
  FaShieldAlt,
  FaFileInvoice,
  FaLeaf,
  FaUserCircle,
  FaEdit,
  FaTrash,
  FaBan,
  FaPlay,
  FaStop,
  FaFilePdf,
  FaFileImage,
  FaDownload,
  FaBook,
  FaHistory,
  FaSpinner,
  FaQuestionCircle,
  FaHourglassHalf,
  FaImage,
  FaFilter,
  FaArrowLeft,
  FaExpand,
  FaExternalLinkAlt,
} from "react-icons/fa";

const BASE = "http://localhost:5000";

const getHoldTimeRemaining = (holdExpiresAt) => {
  if (!holdExpiresAt) return null;
  const diff = new Date(holdExpiresAt) - new Date();
  if (diff <= 0) return "Expired";
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m remaining`;
};

// ── Resolves a document field to a full URL ───────────────────────────────────
// Handles: plain string URL, object with .url property, null/undefined
const resolveUrl = (field) => {
  if (!field) return null;
  if (typeof field === "string")
    return field.startsWith("http") ? field : `${BASE}${field}`;
  if (typeof field === "object" && field.url) {
    return field.url.startsWith("http") ? field.url : `${BASE}${field.url}`;
  }
  return null;
};

// ── Get a doc from the documents[] array by its type field ───────────────────
const getDocByType = (documents, type) => {
  if (!Array.isArray(documents)) return null;
  const doc = documents.find((d) => d.type === type);
  return doc ? resolveUrl(doc) : null;
};

// ── Document Card ─────────────────────────────────────────────────────────────
const DocCard = ({ label, url, openImageViewer }) => {
  if (!url) {
    return (
      <div className="flex flex-col gap-2 bg-gray-50 rounded-xl p-4 border border-dashed border-gray-200">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          {label}
        </p>
        <div className="flex items-center gap-2 text-gray-300">
          <FaQuestionCircle size={14} />
          <span className="text-sm">Not provided</span>
        </div>
      </div>
    );
  }

  const isImg = /\.(jpg|jpeg|png|webp|gif)$/i.test(url);
  const isPdf = /\.pdf$/i.test(url);

  return (
    <div className="flex flex-col gap-2 bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        {label}
      </p>
      {isImg ? (
        <div
          className="relative group cursor-pointer"
          onClick={() => openImageViewer(url)}
        >
          <img
            src={url}
            alt={label}
            className="w-full h-40 object-cover rounded-lg"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
          <div
            className="w-full h-40 bg-gray-100 rounded-lg items-center justify-center text-gray-400"
            style={{ display: "none" }}
          >
            <FaImage size={28} />
          </div>
          <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
            <span className="text-white text-sm font-semibold flex items-center gap-1">
              <FaExpand size={12} /> View Full
            </span>
          </div>
        </div>
      ) : isPdf ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 bg-red-50 border border-red-100 rounded-lg hover:bg-red-100 transition"
        >
          <FaFilePdf size={24} className="text-red-500 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-red-700 truncate">{label}</p>
            <p className="text-xs text-red-400">Click to open PDF</p>
          </div>
          <FaExternalLinkAlt size={12} className="text-red-400 flex-shrink-0" />
        </a>
      ) : (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 transition"
        >
          <FaFileAlt size={24} className="text-blue-500 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-blue-700 truncate">
              {label}
            </p>
            <p className="text-xs text-blue-400">Click to open</p>
          </div>
          <FaExternalLinkAlt
            size={12}
            className="text-blue-400 flex-shrink-0"
          />
        </a>
      )}
    </div>
  );
};

const AdminVehicleVerification = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDocsModal, setShowDocsModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmVehicleId, setConfirmVehicleId] = useState(null);
  const [confirmTitle, setConfirmTitle] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmType, setConfirmType] = useState("");
  const [showResultAnimation, setShowResultAnimation] = useState(false);
  const [resultType, setResultType] = useState("");
  const [resultLabel, setResultLabel] = useState("");
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    active: 0,
    inactive: 0,
    booked: 0,
    on_hold: 0,
  });

  useEffect(() => {
    fetchVehicles();
    const interval = setInterval(fetchVehicles, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      setError("");
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        setError("No authentication token found.");
        setLoading(false);
        return;
      }
      const response = await axios.get(`${BASE}/api/user-vehicles/admin/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data && response.data.success) {
        let vehiclesData = [];
        if (response.data.data?.vehicles)
          vehiclesData = response.data.data.vehicles;
        else if (response.data.vehicles) vehiclesData = response.data.vehicles;
        else if (Array.isArray(response.data.data))
          vehiclesData = response.data.data;
        else if (Array.isArray(response.data)) vehiclesData = response.data;
        setVehicles(vehiclesData);
        setFilteredVehicles(vehiclesData);
        calculateStats(vehiclesData);
      } else {
        setError(response.data?.message || "Failed to fetch vehicles");
        setVehicles([]);
        setFilteredVehicles([]);
        calculateStats([]);
      }
    } catch (error) {
      if (error.response)
        setError(
          error.response.data?.message ||
            `Server error: ${error.response.status}`,
        );
      else if (error.request) setError("Cannot connect to server.");
      else setError(error.message);
      setVehicles([]);
      setFilteredVehicles([]);
      calculateStats([]);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const d = Array.isArray(data) ? data : [];
    setStats({
      total: d.length,
      pending: d.filter((v) => v?.status === "pending").length,
      approved: d.filter((v) => v?.status === "approved").length,
      rejected: d.filter((v) => v?.status === "rejected").length,
      active: d.filter((v) => v?.status === "active").length,
      inactive: d.filter((v) => v?.status === "inactive").length,
      booked: d.filter((v) => v?.status === "booked").length,
      // schema uses "On_Hold" (capital O) — handle both
      on_hold: d.filter(
        (v) => v?.status === "on_hold" || v?.status === "On_Hold",
      ).length,
    });
  };

  const showConfirmation = (action, vehicleId, title, message, type) => {
    setConfirmAction(() => action);
    setConfirmVehicleId(vehicleId);
    setConfirmTitle(title);
    setConfirmMessage(message);
    setConfirmType(type);
    setShowConfirmModal(true);
  };

  const executeAction = async () => {
    if (confirmAction) await confirmAction(confirmVehicleId);
    setShowConfirmModal(false);
    setConfirmAction(null);
    setConfirmVehicleId(null);
  };

  const triggerResult = (type, label) => {
    setResultType(type);
    setResultLabel(label);
    setShowResultAnimation(true);
    setTimeout(() => setShowResultAnimation(false), 3000);
  };

  const getToken = () =>
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const handleApprove = async (vehicleId) => {
    setActionLoading(true);
    try {
      await axios.post(
        `${BASE}/api/user-vehicles/admin/${vehicleId}/approve`,
        {},
        { headers: { Authorization: `Bearer ${getToken()}` } },
      );
      await fetchVehicles();
      setShowDetailsModal(false);
      setShowDocsModal(false);
      triggerResult("approved", "APPROVED!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to approve vehicle");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (vehicleId) => {
    if (!rejectionReason.trim()) {
      toast.error("Please provide a reason for rejection");
      return;
    }
    setActionLoading(true);
    try {
      await axios.post(
        `${BASE}/api/user-vehicles/admin/${vehicleId}/reject`,
        { reason: rejectionReason },
        { headers: { Authorization: `Bearer ${getToken()}` } },
      );
      await fetchVehicles();
      setShowRejectModal(false);
      setRejectionReason("");
      setShowDetailsModal(false);
      setShowDocsModal(false);
      triggerResult("rejected", "REJECTED");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reject vehicle");
    } finally {
      setActionLoading(false);
    }
  };

  const handleActivate = async (vehicleId) => {
    setActionLoading(true);
    try {
      await axios.put(
        `${BASE}/api/user-vehicles/admin/${vehicleId}/activate`,
        {},
        { headers: { Authorization: `Bearer ${getToken()}` } },
      );
      await fetchVehicles();
      setShowDetailsModal(false);
      setShowDocsModal(false);
      triggerResult("activated", "ACTIVATED!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to activate vehicle",
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeactivate = async (vehicleId) => {
    setActionLoading(true);
    try {
      await axios.put(
        `${BASE}/api/user-vehicles/admin/${vehicleId}/deactivate`,
        {},
        { headers: { Authorization: `Bearer ${getToken()}` } },
      );
      await fetchVehicles();
      setShowDetailsModal(false);
      setShowDocsModal(false);
      triggerResult("deactivated", "DEACTIVATED");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to deactivate vehicle",
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (vehicleId) => {
    setActionLoading(true);
    try {
      await axios.delete(
        `${BASE}/api/user-vehicles/admin/${vehicleId}/delete`,
        { headers: { Authorization: `Bearer ${getToken()}` } },
      );
      await fetchVehicles();
      setShowDetailsModal(false);
      setShowDocsModal(false);
      triggerResult("deleted", "DELETED");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete vehicle");
    } finally {
      setActionLoading(false);
    }
  };

  const handleResetToActive = async (vehicleId) => {
    setActionLoading(true);
    try {
      await axios.put(
        `${BASE}/api/user-vehicles/admin/${vehicleId}/fix-status`,
        { status: "active", isListed: true },
        { headers: { Authorization: `Bearer ${getToken()}` } },
      );
      await fetchVehicles();
      setShowDetailsModal(false);
      setShowDocsModal(false);
      triggerResult("activated", "RESET TO ACTIVE!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to reset vehicle status",
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handleViewDetails = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowDetailsModal(true);
  };
  const handleViewDocuments = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowDocsModal(true);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setFilteredVehicles(
      status === "all" ? vehicles : vehicles.filter((v) => v.status === status),
    );
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    let filtered = vehicles;
    if (filterStatus !== "all")
      filtered = filtered.filter((v) => v.status === filterStatus);
    setFilteredVehicles(
      filtered.filter(
        (vehicle) =>
          vehicle?.carName?.toLowerCase().includes(term) ||
          vehicle?.carNumber?.toLowerCase().includes(term) ||
          vehicle?.fullName?.toLowerCase().includes(term) ||
          vehicle?.citizenshipNumber?.toLowerCase().includes(term),
      ),
    );
  };

  const isOnHoldStatus = (status) =>
    status === "on_hold" || status === "On_Hold";

  const getStatusBadge = (status, holdExpiresAt = null) => {
    const statusConfig = {
      pending: {
        color: "bg-yellow-100 text-yellow-800",
        icon: FaClock,
        label: "Pending",
      },
      approved: {
        color: "bg-blue-100 text-blue-800",
        icon: FaCheckCircle,
        label: "Approved",
      },
      rejected: {
        color: "bg-red-100 text-red-800",
        icon: FaTimesCircle,
        label: "Rejected",
      },
      active: {
        color: "bg-green-100 text-green-800",
        icon: FaPlay,
        label: "Active",
      },
      inactive: {
        color: "bg-gray-100 text-gray-800",
        icon: FaStop,
        label: "Inactive",
      },
      booked: {
        color: "bg-orange-100 text-orange-800",
        icon: FaBook,
        label: "Booked",
      },
      on_hold: {
        color: "bg-amber-100 text-amber-800",
        icon: FaHourglassHalf,
        label: "On Hold",
      },
      On_Hold: {
        color: "bg-amber-100 text-amber-800",
        icon: FaHourglassHalf,
        label: "On Hold",
      },
    };
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    return (
      <div className="flex flex-col gap-1">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-1 ${config.color}`}
        >
          <Icon size={12} /> {config.label}
        </span>
        {isOnHoldStatus(status) && holdExpiresAt && (
          <span className="text-xs text-amber-600 font-semibold flex items-center gap-1">
            <FaClock size={10} /> {getHoldTimeRemaining(holdExpiresAt)}
          </span>
        )}
      </div>
    );
  };

  const openImageViewer = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowImageViewer(true);
  };

  const getConfirmStyle = () => {
    const styles = {
      approve: {
        grad: "from-green-400 to-emerald-500",
        btn: "from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600",
        shadow: "shadow-green-200",
        icon: "✓",
        text: "Yes, Approve",
      },
      reject: {
        grad: "from-red-400 to-rose-500",
        btn: "from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600",
        shadow: "shadow-red-200",
        icon: "✕",
        text: "Yes, Reject",
      },
      activate: {
        grad: "from-green-400 to-emerald-500",
        btn: "from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600",
        shadow: "shadow-green-200",
        icon: "▶",
        text: "Yes, Activate",
      },
      deactivate: {
        grad: "from-yellow-400 to-amber-500",
        btn: "from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600",
        shadow: "shadow-yellow-200",
        icon: "⏸",
        text: "Yes, Deactivate",
      },
      delete: {
        grad: "from-red-500 to-rose-600",
        btn: "from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700",
        shadow: "shadow-red-300",
        icon: "🗑",
        text: "Yes, Delete",
      },
      reset: {
        grad: "from-blue-400 to-indigo-500",
        btn: "from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600",
        shadow: "shadow-blue-200",
        icon: "↺",
        text: "Yes, Reset",
      },
    };
    return styles[confirmType] || styles.approve;
  };

  const getResultStyle = () => {
    const styles = {
      approved: {
        grad: "from-green-400 to-emerald-500",
        shadow: "shadow-green-500/50",
        sub: "text-green-200",
      },
      rejected: {
        grad: "from-red-400 to-rose-500",
        shadow: "shadow-red-500/50",
        sub: "text-red-200",
      },
      activated: {
        grad: "from-green-400 to-emerald-500",
        shadow: "shadow-green-500/50",
        sub: "text-green-200",
      },
      deactivated: {
        grad: "from-yellow-400 to-amber-500",
        shadow: "shadow-yellow-500/50",
        sub: "text-yellow-100",
      },
      deleted: {
        grad: "from-red-500 to-rose-600",
        shadow: "shadow-red-500/50",
        sub: "text-red-200",
      },
    };
    return styles[resultType] || styles.approved;
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading vehicle listings...</p>
        </div>
      </div>
    );

  if (error && vehicles.length === 0)
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center max-w-md">
          <div className="text-red-600 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold mb-2">Error Loading Vehicles</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchVehicles}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  const confirmStyle = getConfirmStyle();
  const resultStyle = getResultStyle();

  return (
    <div className="p-8">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* ══ CONFIRM MODAL ══ */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => setShowConfirmModal(false)}
          />
          <div
            className="relative w-full max-w-md mx-4"
            style={{
              animation: "modalPop 0.35s cubic-bezier(0.34,1.56,0.64,1) both",
            }}
          >
            <div
              className={`absolute -inset-1 rounded-3xl blur-xl opacity-60 bg-gradient-to-r ${confirmStyle.grad}`}
            />
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div
                className={`h-2 w-full bg-gradient-to-r ${confirmStyle.grad}`}
              />
              <div className="p-8 text-center">
                <div
                  className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center shadow-lg bg-gradient-to-br ${confirmStyle.grad}`}
                  style={{
                    animation:
                      "iconBounce 0.5s 0.2s cubic-bezier(0.34,1.56,0.64,1) both",
                  }}
                >
                  <span className="text-white text-4xl font-bold">
                    {confirmStyle.icon}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">
                  {confirmTitle}
                </h3>
                <p className="text-gray-500 mb-8 leading-relaxed">
                  {confirmMessage}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="flex-1 px-5 py-3.5 border-2 border-gray-200 text-gray-600 font-semibold rounded-2xl hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={executeAction}
                    disabled={actionLoading}
                    className={`flex-1 px-5 py-3.5 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg ${confirmStyle.shadow} hover:scale-[1.02] disabled:opacity-50 bg-gradient-to-r ${confirmStyle.btn}`}
                  >
                    {actionLoading ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      confirmStyle.text
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ RESULT ANIMATION ══ */}
      {showResultAnimation && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <div
            className="relative flex flex-col items-center justify-center"
            style={{ animation: "resultFadeIn 0.4s ease-out both" }}
          >
            <div
              className={`w-40 h-40 rounded-full bg-gradient-to-br ${resultStyle.grad} flex items-center justify-center shadow-2xl ${resultStyle.shadow} mb-6`}
              style={{
                animation:
                  "resultBounce 0.6s cubic-bezier(0.34,1.56,0.64,1) both",
              }}
            >
              <span className="text-white text-6xl font-bold">
                {resultType === "approved" || resultType === "activated"
                  ? "✓"
                  : resultType === "rejected" || resultType === "deleted"
                    ? "✕"
                    : "⏸"}
              </span>
            </div>
            <div
              className="text-center text-white"
              style={{
                animation: "resultFadeIn 0.4s 0.5s ease-out both",
                opacity: 0,
              }}
            >
              <p className="text-4xl font-black tracking-wide drop-shadow-lg">
                {resultLabel}
              </p>
              <p className={`mt-2 text-lg font-medium ${resultStyle.sub}`}>
                Vehicle has been {resultType} successfully
              </p>
            </div>
          </div>
          <style>{`
            @keyframes modalPop{from{opacity:0;transform:scale(0.8) translateY(20px);}to{opacity:1;transform:scale(1) translateY(0);}}
            @keyframes iconBounce{from{opacity:0;transform:scale(0);}to{opacity:1;transform:scale(1);}}
            @keyframes resultFadeIn{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
            @keyframes resultBounce{from{opacity:0;transform:scale(0.3);}to{opacity:1;transform:scale(1);}}
          `}</style>
        </div>
      )}

      {/* ══ HEADER ══ */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Vehicle Verification Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Review and verify user-submitted vehicle listings
        </p>
      </div>

      {/* ══ STATS ══ */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
        {[
          { label: "Total", value: stats.total, cls: "bg-white" },
          {
            label: "Pending",
            value: stats.pending,
            cls: "bg-yellow-50 border-l-4 border-yellow-500",
            t: "text-yellow-600",
            v: "text-yellow-700",
          },
          {
            label: "Approved",
            value: stats.approved,
            cls: "bg-blue-50 border-l-4 border-blue-500",
            t: "text-blue-600",
            v: "text-blue-700",
          },
          {
            label: "On Hold",
            value: stats.on_hold,
            cls: "bg-amber-50 border-l-4 border-amber-500",
            t: "text-amber-600",
            v: "text-amber-700",
          },
          {
            label: "Active",
            value: stats.active,
            cls: "bg-green-50 border-l-4 border-green-500",
            t: "text-green-600",
            v: "text-green-700",
          },
          {
            label: "Inactive",
            value: stats.inactive,
            cls: "bg-gray-50 border-l-4 border-gray-500",
            t: "text-gray-600",
            v: "text-gray-700",
          },
          {
            label: "Rejected",
            value: stats.rejected,
            cls: "bg-red-50 border-l-4 border-red-500",
            t: "text-red-600",
            v: "text-red-700",
          },
          {
            label: "Booked",
            value: stats.booked,
            cls: "bg-orange-50 border-l-4 border-orange-500",
            t: "text-orange-600",
            v: "text-orange-700",
          },
        ].map((s) => (
          <div key={s.label} className={`rounded-lg shadow p-4 ${s.cls}`}>
            <p className={`text-sm ${s.t || "text-gray-500"}`}>{s.label}</p>
            <p className={`text-2xl font-bold ${s.v || "text-gray-800"}`}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* ══ ON HOLD BANNER ══ */}
      {stats.on_hold > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaHourglassHalf className="text-amber-600 text-xl" />
            <div>
              <p className="text-amber-800 font-medium">
                Vehicles On Hold — Awaiting Payment
              </p>
              <p className="text-amber-700 text-sm">
                {stats.on_hold} vehicle(s) are currently on hold pending
                customer payment.
              </p>
            </div>
          </div>
          <button
            onClick={() => handleFilterChange("On_Hold")}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition text-sm whitespace-nowrap"
          >
            View On Hold
          </button>
        </div>
      )}

      {/* ══ FILTERS ══ */}
      <div className="bg-white rounded-lg shadow mb-6 p-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex gap-2 overflow-x-auto pb-2 flex-wrap">
            {[
              "all",
              "pending",
              "approved",
              "On_Hold",
              "active",
              "inactive",
              "rejected",
              "booked",
            ].map((status) => (
              <button
                key={status}
                onClick={() => handleFilterChange(status)}
                className={`px-4 py-2 rounded-lg font-medium transition capitalize whitespace-nowrap ${
                  filterStatus === status
                    ? status === "pending"
                      ? "bg-yellow-500 text-white"
                      : status === "approved"
                        ? "bg-blue-600 text-white"
                        : status === "On_Hold"
                          ? "bg-amber-500 text-white"
                          : status === "active"
                            ? "bg-green-600 text-white"
                            : status === "inactive"
                              ? "bg-gray-600 text-white"
                              : status === "rejected"
                                ? "bg-red-600 text-white"
                                : status === "booked"
                                  ? "bg-orange-600 text-white"
                                  : "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {status === "On_Hold"
                  ? "On Hold"
                  : status === "all"
                    ? "All"
                    : status}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-64">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by car name, number, owner..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* ══ TABLE ══ */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {vehicles.length === 0 ? (
          <div className="text-center py-12">
            <FaCar className="text-5xl text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No vehicle listings found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Vehicle",
                    "Owner",
                    "Car Number",
                    "Rate/Day",
                    "Status",
                    "Submitted",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredVehicles.map((vehicle) => (
                  <tr
                    key={vehicle._id}
                    className={`hover:bg-gray-50 transition ${isOnHoldStatus(vehicle.status) ? "bg-amber-50/30" : ""}`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {vehicle.vehiclePhotos?.[0] ? (
                          <img
                            src={resolveUrl(vehicle.vehiclePhotos[0])}
                            alt={vehicle.carName}
                            className="w-12 h-12 object-cover rounded-lg"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                            <FaCar className="text-gray-400" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-900">
                            {vehicle.carName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {vehicle.carType} • {vehicle.seats} seats
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900">
                        {vehicle.fullName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {vehicle.phoneNumber}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {vehicle.carNumber}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      रु {vehicle.ratePerDay}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(vehicle.status, vehicle.holdExpiresAt)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(vehicle.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2 flex-wrap gap-1">
                        <button
                          onClick={() => handleViewDetails(vehicle)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleViewDocuments(vehicle)}
                          className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition"
                          title="View Documents"
                        >
                          <FaFileAlt />
                        </button>
                        {vehicle.status === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                showConfirmation(
                                  handleApprove,
                                  vehicle._id,
                                  "Approve Vehicle Listing",
                                  `Approve "${vehicle.carName}"?`,
                                  "approve",
                                )
                              }
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                              title="Approve"
                              disabled={actionLoading}
                            >
                              <FaCheckCircle />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedVehicle(vehicle);
                                setShowRejectModal(true);
                              }}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                              title="Reject"
                              disabled={actionLoading}
                            >
                              <FaTimesCircle />
                            </button>
                          </>
                        )}
                        {isOnHoldStatus(vehicle.status) && (
                          <button
                            onClick={() =>
                              showConfirmation(
                                handleResetToActive,
                                vehicle._id,
                                "Release Hold & Set Active",
                                `Release the hold on "${vehicle.carName}"?`,
                                "reset",
                              )
                            }
                            className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition"
                            title="Release Hold"
                            disabled={actionLoading}
                          >
                            <FaHistory />
                          </button>
                        )}
                        {(vehicle.status === "approved" ||
                          vehicle.status === "active" ||
                          vehicle.status === "inactive") && (
                          <>
                            {vehicle.status !== "active" && (
                              <button
                                onClick={() =>
                                  showConfirmation(
                                    handleActivate,
                                    vehicle._id,
                                    "Activate Vehicle Listing",
                                    `Activate "${vehicle.carName}"?`,
                                    "activate",
                                  )
                                }
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                                title="Activate"
                                disabled={actionLoading}
                              >
                                <FaPlay />
                              </button>
                            )}
                            {vehicle.status !== "inactive" && (
                              <button
                                onClick={() =>
                                  showConfirmation(
                                    handleDeactivate,
                                    vehicle._id,
                                    "Deactivate Vehicle Listing",
                                    `Deactivate "${vehicle.carName}"?`,
                                    "deactivate",
                                  )
                                }
                                className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition"
                                title="Deactivate"
                                disabled={actionLoading}
                              >
                                <FaStop />
                              </button>
                            )}
                            <button
                              onClick={() =>
                                showConfirmation(
                                  handleDelete,
                                  vehicle._id,
                                  "Delete Vehicle Permanently",
                                  `Permanently delete "${vehicle.carName}"?`,
                                  "delete",
                                )
                              }
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                              title="Delete"
                              disabled={actionLoading}
                            >
                              <FaTrash />
                            </button>
                          </>
                        )}
                        {vehicle.status === "booked" && (
                          <>
                            <button
                              onClick={() =>
                                showConfirmation(
                                  handleResetToActive,
                                  vehicle._id,
                                  "Reset to Active",
                                  `Reset "${vehicle.carName}" from Booked to Active?`,
                                  "reset",
                                )
                              }
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                              title="Reset to Active"
                              disabled={actionLoading}
                            >
                              <FaHistory />
                            </button>
                            <button
                              onClick={() =>
                                showConfirmation(
                                  handleDelete,
                                  vehicle._id,
                                  "Delete Vehicle Permanently",
                                  `Permanently delete "${vehicle.carName}"?`,
                                  "delete",
                                )
                              }
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                              title="Delete"
                              disabled={actionLoading}
                            >
                              <FaTrash />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {filteredVehicles.length === 0 && vehicles.length > 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No vehicles match your search or filter
            </p>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════════
          DOCUMENTS MODAL
          Schema mapping:
            citizenshipFront  → object { url, filename, ... }
            citizenshipBack   → object { url, filename, ... }
            passportPhoto     → object { url, filename, ... }
            documents[]       → [{ type: "bluebook"|"insurance"|"pollution", url, label, ... }]
            vehiclePhotos[]   → [{ url, label, filename, ... }]
      ══════════════════════════════════════════════════════════════ */}
      {showDocsModal && selectedVehicle && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-8">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <FaFileAlt className="text-purple-600 text-lg" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Vehicle Documents
                  </h3>
                  <p className="text-sm text-gray-500">
                    {selectedVehicle.carName} — {selectedVehicle.carNumber}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {getStatusBadge(
                  selectedVehicle.status,
                  selectedVehicle.holdExpiresAt,
                )}
                <button
                  onClick={() => setShowDocsModal(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition"
                >
                  <FaTimes size={18} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-8">
              {/* On hold alert */}
              {isOnHoldStatus(selectedVehicle.status) &&
                selectedVehicle.holdExpiresAt && (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3">
                    <FaHourglassHalf className="text-amber-600 text-xl flex-shrink-0" />
                    <div>
                      <p className="text-amber-800 font-semibold text-sm">
                        Vehicle is On Hold — Awaiting Payment
                      </p>
                      <p className="text-amber-700 text-xs mt-0.5">
                        Time remaining:{" "}
                        <strong>
                          {getHoldTimeRemaining(selectedVehicle.holdExpiresAt)}
                        </strong>
                      </p>
                    </div>
                  </div>
                )}

              {/* Owner Info */}
              <div>
                <h4 className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">
                  <FaUser className="text-blue-500" /> Owner Information
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: "Full Name", value: selectedVehicle.fullName },
                    {
                      label: "Citizenship No.",
                      value: selectedVehicle.citizenshipNumber,
                    },
                    { label: "Phone", value: selectedVehicle.phoneNumber },
                    {
                      label: "Address",
                      value: [
                        selectedVehicle.address,
                        selectedVehicle.city,
                        selectedVehicle.district,
                      ]
                        .filter(Boolean)
                        .join(", "),
                    },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="bg-gray-50 rounded-xl p-3 border border-gray-100"
                    >
                      <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">
                        {label}
                      </p>
                      <p className="text-sm font-semibold text-gray-800">
                        {value || "—"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Citizenship Documents — these are objects with .url */}
              <div>
                <h4 className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">
                  <FaIdCard className="text-indigo-500" /> Citizenship /
                  Identity Documents
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <DocCard
                    label="Citizenship Front"
                    url={resolveUrl(selectedVehicle.citizenshipFront)}
                    openImageViewer={openImageViewer}
                  />
                  <DocCard
                    label="Citizenship Back"
                    url={resolveUrl(selectedVehicle.citizenshipBack)}
                    openImageViewer={openImageViewer}
                  />
                  <DocCard
                    label="Passport Photo"
                    url={resolveUrl(selectedVehicle.passportPhoto)}
                    openImageViewer={openImageViewer}
                  />
                </div>
              </div>

              {/* Vehicle Documents — stored in documents[] array with type field */}
              <div>
                <h4 className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">
                  <FaCar className="text-green-500" /> Vehicle Documents
                </h4>
                {!selectedVehicle.documents ||
                selectedVehicle.documents.length === 0 ? (
                  <div className="bg-gray-50 rounded-xl p-6 border border-dashed border-gray-200 text-center text-gray-400">
                    <FaFileAlt size={28} className="mx-auto mb-2 opacity-40" />
                    <p className="text-sm">No vehicle documents uploaded</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <DocCard
                        label="Bluebook / Registration"
                        url={getDocByType(
                          selectedVehicle.documents,
                          "bluebook",
                        )}
                        openImageViewer={openImageViewer}
                      />
                      <DocCard
                        label="Insurance Document"
                        url={getDocByType(
                          selectedVehicle.documents,
                          "insurance",
                        )}
                        openImageViewer={openImageViewer}
                      />
                      <DocCard
                        label="Pollution Certificate"
                        url={getDocByType(
                          selectedVehicle.documents,
                          "pollution",
                        )}
                        openImageViewer={openImageViewer}
                      />
                    </div>
                    {/* Badge list of all uploaded doc types */}
                    <div className="mt-3 flex flex-wrap gap-2 px-1">
                      {selectedVehicle.documents.map((d, i) => (
                        <span
                          key={i}
                          className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
                            d.type === "bluebook"
                              ? "bg-green-100 text-green-700"
                              : d.type === "insurance"
                                ? "bg-blue-100 text-blue-700"
                                : d.type === "pollution"
                                  ? "bg-teal-100 text-teal-700"
                                  : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          ✓ {d.label || d.type}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Vehicle Photos — array of objects with .url */}
              {selectedVehicle.vehiclePhotos?.length > 0 && (
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">
                    <FaImage className="text-pink-500" /> Vehicle Photos (
                    {selectedVehicle.vehiclePhotos.length})
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {selectedVehicle.vehiclePhotos.map((photo, index) => {
                      const photoUrl = resolveUrl(photo);
                      if (!photoUrl) return null;
                      return (
                        <div
                          key={index}
                          className="relative group cursor-pointer"
                          onClick={() => openImageViewer(photoUrl)}
                        >
                          <img
                            src={photoUrl}
                            alt={photo.label || `Photo ${index + 1}`}
                            className="w-full h-32 object-cover rounded-xl border border-gray-200"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                          <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                            <FaExpand className="text-white" size={18} />
                          </div>
                          {photo.label && (
                            <p className="text-xs text-center text-gray-500 mt-1 truncate">
                              {photo.label}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Rejection reason */}
              {selectedVehicle.rejectionReason && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-sm font-bold text-red-700 mb-1 flex items-center gap-2">
                    <FaTimesCircle size={12} /> Rejection Reason
                  </p>
                  <p className="text-sm text-red-600">
                    {selectedVehicle.rejectionReason}
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex items-center justify-between flex-wrap gap-3">
              <button
                onClick={() => {
                  setShowDocsModal(false);
                  handleViewDetails(selectedVehicle);
                }}
                className="flex items-center gap-2 px-4 py-2 border border-blue-200 text-blue-600 rounded-xl hover:bg-blue-50 transition text-sm font-medium"
              >
                <FaInfoCircle size={13} /> View Full Details
              </button>
              <div className="flex gap-2 flex-wrap">
                {selectedVehicle.status === "pending" && (
                  <>
                    <button
                      onClick={() => {
                        setShowDocsModal(false);
                        setShowRejectModal(true);
                      }}
                      className="px-5 py-2 border-2 border-red-500 text-red-600 rounded-xl hover:bg-red-50 transition font-semibold text-sm"
                      disabled={actionLoading}
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => {
                        setShowDocsModal(false);
                        showConfirmation(
                          handleApprove,
                          selectedVehicle._id,
                          "Approve Vehicle Listing",
                          `Approve "${selectedVehicle.carName}"?`,
                          "approve",
                        );
                      }}
                      className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition font-semibold text-sm"
                      disabled={actionLoading}
                    >
                      {actionLoading ? (
                        <FaSpinner className="animate-spin inline" />
                      ) : (
                        "Approve"
                      )}
                    </button>
                  </>
                )}
                {isOnHoldStatus(selectedVehicle.status) && (
                  <button
                    onClick={() => {
                      setShowDocsModal(false);
                      showConfirmation(
                        handleResetToActive,
                        selectedVehicle._id,
                        "Release Hold",
                        `Release hold on "${selectedVehicle.carName}"?`,
                        "reset",
                      );
                    }}
                    className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl transition font-semibold text-sm"
                    disabled={actionLoading}
                  >
                    Release Hold
                  </button>
                )}
                {(selectedVehicle.status === "approved" ||
                  selectedVehicle.status === "active" ||
                  selectedVehicle.status === "inactive") && (
                  <>
                    {selectedVehicle.status !== "active" && (
                      <button
                        onClick={() => {
                          setShowDocsModal(false);
                          showConfirmation(
                            handleActivate,
                            selectedVehicle._id,
                            "Activate",
                            `Activate "${selectedVehicle.carName}"?`,
                            "activate",
                          );
                        }}
                        className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition font-semibold text-sm"
                        disabled={actionLoading}
                      >
                        Activate
                      </button>
                    )}
                    {selectedVehicle.status !== "inactive" && (
                      <button
                        onClick={() => {
                          setShowDocsModal(false);
                          showConfirmation(
                            handleDeactivate,
                            selectedVehicle._id,
                            "Deactivate",
                            `Deactivate "${selectedVehicle.carName}"?`,
                            "deactivate",
                          );
                        }}
                        className="px-5 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-xl transition font-semibold text-sm"
                        disabled={actionLoading}
                      >
                        Deactivate
                      </button>
                    )}
                  </>
                )}
                <button
                  onClick={() => setShowDocsModal(false)}
                  className="px-5 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-100 transition font-medium text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ DETAILS MODAL ══ */}
      {showDetailsModal && selectedVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <FaInfoCircle className="text-blue-600 text-2xl" />
                  <h3 className="text-xl font-bold text-gray-800">
                    Vehicle Listing Details
                  </h3>
                </div>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes size={24} />
                </button>
              </div>
            </div>
            <div className="p-6">
              {isOnHoldStatus(selectedVehicle.status) &&
                selectedVehicle.holdExpiresAt && (
                  <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-3">
                    <FaHourglassHalf className="text-amber-600 text-2xl flex-shrink-0" />
                    <div>
                      <p className="text-amber-800 font-semibold">
                        Vehicle is On Hold — Awaiting Payment
                      </p>
                      <p className="text-amber-700 text-sm">
                        Time remaining:{" "}
                        <strong>
                          {getHoldTimeRemaining(selectedVehicle.holdExpiresAt)}
                        </strong>
                      </p>
                    </div>
                  </div>
                )}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Vehicle Photos
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedVehicle.vehiclePhotos?.map((photo, index) => {
                      const url = resolveUrl(photo);
                      return url ? (
                        <div key={index} className="relative">
                          <img
                            src={url}
                            alt={photo.label}
                            className="w-full h-40 object-cover rounded-lg cursor-pointer hover:opacity-90 transition"
                            onClick={() => openImageViewer(url)}
                          />
                          <p className="text-xs text-gray-500 mt-1 text-center">
                            {photo.label}
                          </p>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Vehicle Information
                  </h4>
                  <div className="space-y-3 bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        ["Car Name", selectedVehicle.carName],
                        ["Car Number", selectedVehicle.carNumber],
                        ["Car Type", selectedVehicle.carType],
                        ["Rate Per Day", `रु ${selectedVehicle.ratePerDay}`],
                        ["Seats", selectedVehicle.seats],
                        ["Gear Type", selectedVehicle.gearType],
                        ["Air Condition", selectedVehicle.airCondition],
                        ["Booking Type", selectedVehicle.bookingType],
                      ].map(([label, value]) => (
                        <div key={label}>
                          <p className="text-sm text-gray-500">{label}</p>
                          <p className="font-medium">{value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Status</p>
                      {getStatusBadge(
                        selectedVehicle.status,
                        selectedVehicle.holdExpiresAt,
                      )}
                    </div>
                    {selectedVehicle.description && (
                      <div>
                        <p className="text-sm text-gray-500">Description</p>
                        <p className="text-gray-700">
                          {selectedVehicle.description}
                        </p>
                      </div>
                    )}
                    {selectedVehicle.features?.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-500">Features</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedVehicle.features.map((f, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="font-semibold text-gray-800 mb-3">
                  Owner Information
                </h4>
                <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    ["Full Name", selectedVehicle.fullName],
                    ["Citizenship Number", selectedVehicle.citizenshipNumber],
                    ["Phone Number", selectedVehicle.phoneNumber],
                    [
                      "Address",
                      [
                        selectedVehicle.address,
                        selectedVehicle.city,
                        selectedVehicle.district,
                      ]
                        .filter(Boolean)
                        .join(", "),
                    ],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <p className="text-sm text-gray-500">{label}</p>
                      <p className="font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between items-center flex-wrap gap-3">
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    handleViewDocuments(selectedVehicle);
                  }}
                  className="px-5 py-2 border-2 border-purple-500 text-purple-600 rounded-lg hover:bg-purple-50 transition font-medium flex items-center gap-2"
                >
                  <FaFileAlt /> View Documents
                </button>
                <div className="flex gap-3 flex-wrap">
                  {selectedVehicle.status === "pending" && (
                    <>
                      <button
                        onClick={() => {
                          setShowDetailsModal(false);
                          setShowRejectModal(true);
                        }}
                        className="px-6 py-2 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition font-medium"
                        disabled={actionLoading}
                      >
                        Reject Listing
                      </button>
                      <button
                        onClick={() =>
                          showConfirmation(
                            handleApprove,
                            selectedVehicle._id,
                            "Approve Vehicle Listing",
                            `Approve "${selectedVehicle.carName}"?`,
                            "approve",
                          )
                        }
                        className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium"
                        disabled={actionLoading}
                      >
                        {actionLoading ? (
                          <FaSpinner className="animate-spin" />
                        ) : (
                          "Approve Listing"
                        )}
                      </button>
                    </>
                  )}
                  {isOnHoldStatus(selectedVehicle.status) && (
                    <button
                      onClick={() =>
                        showConfirmation(
                          handleResetToActive,
                          selectedVehicle._id,
                          "Release Hold",
                          `Release hold on "${selectedVehicle.carName}"?`,
                          "reset",
                        )
                      }
                      className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition font-medium"
                      disabled={actionLoading}
                    >
                      {actionLoading ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        "Release Hold"
                      )}
                    </button>
                  )}
                  {selectedVehicle.status === "booked" && (
                    <button
                      onClick={() =>
                        showConfirmation(
                          handleResetToActive,
                          selectedVehicle._id,
                          "Reset to Active",
                          `Reset "${selectedVehicle.carName}" to Active?`,
                          "reset",
                        )
                      }
                      className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium"
                      disabled={actionLoading}
                    >
                      {actionLoading ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        "Reset to Active"
                      )}
                    </button>
                  )}
                  {(selectedVehicle.status === "approved" ||
                    selectedVehicle.status === "active" ||
                    selectedVehicle.status === "inactive") && (
                    <>
                      {selectedVehicle.status !== "active" && (
                        <button
                          onClick={() =>
                            showConfirmation(
                              handleActivate,
                              selectedVehicle._id,
                              "Activate",
                              `Activate "${selectedVehicle.carName}"?`,
                              "activate",
                            )
                          }
                          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium"
                          disabled={actionLoading}
                        >
                          Activate Listing
                        </button>
                      )}
                      {selectedVehicle.status !== "inactive" && (
                        <button
                          onClick={() =>
                            showConfirmation(
                              handleDeactivate,
                              selectedVehicle._id,
                              "Deactivate",
                              `Deactivate "${selectedVehicle.carName}"?`,
                              "deactivate",
                            )
                          }
                          className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition font-medium"
                          disabled={actionLoading}
                        >
                          Deactivate
                        </button>
                      )}
                      <button
                        onClick={() =>
                          showConfirmation(
                            handleDelete,
                            selectedVehicle._id,
                            "Delete",
                            `Delete "${selectedVehicle.carName}" permanently?`,
                            "delete",
                          )
                        }
                        className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium"
                        disabled={actionLoading}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
              {selectedVehicle.rejectionReason && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 font-medium">Rejection Reason:</p>
                  <p className="text-red-700 text-sm">
                    {selectedVehicle.rejectionReason}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ══ REJECT MODAL ══ */}
      {showRejectModal && selectedVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <FaTimesCircle className="text-red-600 text-2xl" />
                <h3 className="text-xl font-bold text-gray-800">
                  Reject Vehicle Listing
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Reject listing for <strong>{selectedVehicle.carName}</strong>?
              </p>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Rejection *
                </label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none"
                  placeholder="Please provide a reason..."
                  required
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowRejectModal(false);
                    setRejectionReason("");
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleReject(selectedVehicle._id)}
                  disabled={actionLoading}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium disabled:opacity-50"
                >
                  {actionLoading ? (
                    <FaSpinner className="animate-spin inline" />
                  ) : (
                    "Reject Listing"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ IMAGE VIEWER ══ */}
      {showImageViewer && selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-[60]"
          onClick={() => setShowImageViewer(false)}
        >
          <div
            className="relative max-w-5xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowImageViewer(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition"
            >
              <FaTimes size={32} />
            </button>
            <img
              src={selectedImage}
              alt="Document Preview"
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVehicleVerification;
