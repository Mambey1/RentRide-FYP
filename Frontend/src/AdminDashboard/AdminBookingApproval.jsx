

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaCar,
  FaUser,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaRupeeSign,
  FaCheckCircle,
  FaTimesCircle,
  FaClock as FaPending,
  FaEye,
  FaFileAlt,
  FaIdCard,
  FaSearch,
  FaFilter,
  FaDownload,
  FaPrint,
  FaArrowLeft,
  FaInfoCircle,
  FaImage,
  FaFilePdf,
  FaFileImage,
  FaExpand,
  FaTrash,
  FaHistory,
  FaUndo,
  FaUserCircle,
  FaSpinner,
  FaPassport,
} from "react-icons/fa";

const AdminBookingApproval = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedDocuments, setSelectedDocuments] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDocumentsModal, setShowDocumentsModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmBookingId, setConfirmBookingId] = useState(null);
  const [confirmTitle, setConfirmTitle] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmType, setConfirmType] = useState("");
  // Result animation
  const [showResultAnimation, setShowResultAnimation] = useState(false);
  const [resultType, setResultType] = useState("");
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    confirmed: 0,
    active: 0,
    completed: 0,
    cancelled: 0,
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/bookings/admin/all",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.data.success) {
        setBookings(response.data.data.bookings);
        setFilteredBookings(response.data.data.bookings);
        calculateStats(response.data.data.bookings);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to fetch bookings");
      setLoading(false);
    }
  };

  const fetchDocuments = async (bookingId) => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/documents/booking/${bookingId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.data.success) {
        setSelectedDocuments(response.data.data);
        setShowDocumentsModal(true);
      } else {
        toast.info("No documents found for this booking");
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
      toast.error("Failed to fetch documents");
    }
  };

  const calculateStats = (bookingsData) => {
    setStats({
      total: bookingsData.length,
      pending: bookingsData.filter((b) => b.status === "pending").length,
      approved: bookingsData.filter((b) => b.status === "approved").length,
      rejected: bookingsData.filter((b) => b.status === "rejected").length,
      confirmed: bookingsData.filter((b) => b.status === "confirmed").length,
      active: bookingsData.filter((b) => b.status === "active").length,
      completed: bookingsData.filter((b) => b.status === "completed").length,
      cancelled: bookingsData.filter((b) => b.status === "cancelled").length,
    });
  };

  const showConfirmation = (action, bookingId, title, message, type) => {
    setConfirmAction(() => action);
    setConfirmBookingId(bookingId);
    setConfirmTitle(title);
    setConfirmMessage(message);
    setConfirmType(type);
    setShowConfirmModal(true);
  };

  const executeAction = async () => {
    if (confirmAction) await confirmAction(confirmBookingId);
    setShowConfirmModal(false);
    setConfirmAction(null);
    setConfirmBookingId(null);
  };

  const handleApprove = async (bookingId) => {
    setActionLoading(true);
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/bookings/admin/${bookingId}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setShowConfirmModal(false);
      setShowDetailsModal(false);
      setResultType("approved");
      setShowResultAnimation(true);
      fetchBookings();
      setTimeout(() => setShowResultAnimation(false), 3500);
    } catch (error) {
      console.error("Error approving booking:", error);
      toast.error(error.response?.data?.message || "Failed to approve booking");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (bookingId) => {
    if (!rejectionReason.trim()) {
      toast.error("Please provide a reason for rejection");
      return;
    }
    setActionLoading(true);
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/bookings/admin/${bookingId}/reject`,
        { reason: rejectionReason },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setShowRejectModal(false);
      setRejectionReason("");
      setShowDetailsModal(false);
      setResultType("rejected");
      setShowResultAnimation(true);
      fetchBookings();
      setTimeout(() => setShowResultAnimation(false), 3500);
    } catch (error) {
      console.error("Error rejecting booking:", error);
      toast.error(error.response?.data?.message || "Failed to reject booking");
    } finally {
      setActionLoading(false);
    }
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setFilteredBookings(
      status === "all" ? bookings : bookings.filter((b) => b.status === status),
    );
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    let filtered =
      filterStatus !== "all"
        ? bookings.filter((b) => b.status === filterStatus)
        : bookings;
    setFilteredBookings(
      filtered.filter(
        (b) =>
          b.user?.name?.toLowerCase().includes(term) ||
          b.user?.email?.toLowerCase().includes(term) ||
          b.vehicle?.carName?.toLowerCase().includes(term) ||
          b.confirmationCode?.toLowerCase().includes(term),
      ),
    );
  };

  const getStatusBadge = (status) => {
    const cfg = {
      pending: {
        color: "bg-yellow-100 text-yellow-800",
        icon: FaPending,
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
      confirmed: {
        color: "bg-green-100 text-green-800",
        icon: FaCheckCircle,
        label: "Confirmed",
      },
      active: {
        color: "bg-purple-100 text-purple-800",
        icon: FaCar,
        label: "Active",
      },
      completed: {
        color: "bg-gray-100 text-gray-800",
        icon: FaCheckCircle,
        label: "Completed",
      },
      cancelled: {
        color: "bg-red-100 text-red-800",
        icon: FaTimesCircle,
        label: "Cancelled",
      },
    };
    const c = cfg[status] || cfg.pending;
    const Icon = c.icon;
    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-1 ${c.color}`}
      >
        <Icon size={12} />
        {c.label}
      </span>
    );
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  const formatDateTime = (date) =>
    new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  const formatCurrency = (amount) =>
    `रु ${amount?.toLocaleString("en-NP") || 0}`;

  const getFileIcon = (mimetype) => {
    if (mimetype?.startsWith("image/"))
      return <FaFileImage className="text-blue-500 text-2xl" />;
    if (mimetype === "application/pdf")
      return <FaFilePdf className="text-red-500 text-2xl" />;
    return <FaFileAlt className="text-gray-500 text-2xl" />;
  };

  const openImageViewer = (url) => {
    setSelectedImage(url);
    setShowImageViewer(true);
  };

  const getConfirmModalStyles = () => {
    if (confirmType === "approve")
      return {
        icon: <FaCheckCircle className="text-green-600 text-5xl mb-4" />,
        buttonClass: "bg-green-600 hover:bg-green-700",
        buttonText: "Yes, Approve",
      };
    if (confirmType === "reject")
      return {
        icon: <FaTimesCircle className="text-red-600 text-5xl mb-4" />,
        buttonClass: "bg-red-600 hover:bg-red-700",
        buttonText: "Yes, Reject",
      };
    return {
      icon: <FaCheckCircle className="text-blue-600 text-5xl mb-4" />,
      buttonClass: "bg-blue-600 hover:bg-blue-700",
      buttonText: "Yes, Proceed",
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading bookings...</p>
        </div>
      </div>
    );
  }

  const modalStyles = getConfirmModalStyles();

  return (
    <div className="p-8">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Grand Confirmation Modal */}
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
              className={`absolute -inset-1 rounded-3xl blur-xl opacity-60 ${confirmType === "approve" ? "bg-gradient-to-r from-green-400 to-emerald-400" : "bg-gradient-to-r from-red-400 to-rose-400"}`}
            />
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div
                className={`h-2 w-full ${confirmType === "approve" ? "bg-gradient-to-r from-green-400 to-emerald-500" : "bg-gradient-to-r from-red-400 to-rose-500"}`}
              />
              <div className="p-8 text-center">
                <div
                  className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center shadow-lg ${confirmType === "approve" ? "bg-gradient-to-br from-green-400 to-emerald-500" : "bg-gradient-to-br from-red-400 to-rose-500"}`}
                  style={{
                    animation:
                      "iconBounce 0.5s 0.2s cubic-bezier(0.34,1.56,0.64,1) both",
                  }}
                >
                  {confirmType === "approve" ? (
                    <svg
                      viewBox="0 0 24 24"
                      className="w-12 h-12 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      className="w-12 h-12 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  )}
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
                    className="flex-1 px-5 py-3.5 border-2 border-gray-200 text-gray-600 font-semibold rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={executeAction}
                    disabled={actionLoading}
                    className={`flex-1 px-5 py-3.5 text-white font-bold rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 ${
                      confirmType === "approve"
                        ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-green-200 hover:scale-[1.02]"
                        : "bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 shadow-red-200 hover:scale-[1.02]"
                    }`}
                  >
                    {actionLoading ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      modalStyles.buttonText
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Result Animation Overlay */}
      {showResultAnimation && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <div
            className="relative flex flex-col items-center justify-center"
            style={{ animation: "resultFadeIn 0.4s ease-out both" }}
          >
            {resultType === "approved" ? (
              <>
                <div
                  className="w-40 h-40 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-2xl shadow-green-500/50 mb-6"
                  style={{
                    animation:
                      "resultBounce 0.6s cubic-bezier(0.34,1.56,0.64,1) both",
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-20 h-20 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      animation: "drawCheck 0.4s 0.3s ease-out both",
                      strokeDasharray: 30,
                      strokeDashoffset: 30,
                    }}
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div
                  className="text-center text-white"
                  style={{
                    animation: "resultFadeIn 0.4s 0.5s ease-out both",
                    opacity: 0,
                  }}
                >
                  <p className="text-4xl font-black tracking-wide drop-shadow-lg">
                    APPROVED!
                  </p>
                  <p className="text-green-200 mt-2 text-lg font-medium">
                    Booking has been approved successfully
                  </p>
                </div>
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 rounded-full"
                    style={{
                      background: [
                        "#10b981",
                        "#34d399",
                        "#6ee7b7",
                        "#fbbf24",
                        "#f59e0b",
                        "#3b82f6",
                        "#60a5fa",
                        "#a78bfa",
                        "#f472b6",
                      ][i % 9],
                      animation: `confetti${i} 1s 0.3s ease-out both`,
                      top: "50%",
                      left: "50%",
                    }}
                  />
                ))}
              </>
            ) : (
              <>
                <div
                  className="w-40 h-40 rounded-full bg-gradient-to-br from-red-400 to-rose-500 flex items-center justify-center shadow-2xl shadow-red-500/50 mb-6"
                  style={{
                    animation:
                      "resultBounce 0.6s cubic-bezier(0.34,1.56,0.64,1) both",
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-20 h-20 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
                <div
                  className="text-center text-white"
                  style={{
                    animation: "resultFadeIn 0.4s 0.5s ease-out both",
                    opacity: 0,
                  }}
                >
                  <p className="text-4xl font-black tracking-wide drop-shadow-lg">
                    REJECTED
                  </p>
                  <p className="text-red-200 mt-2 text-lg font-medium">
                    Booking has been rejected
                  </p>
                </div>
              </>
            )}
          </div>
          <style>{`
            @keyframes modalPop{from{opacity:0;transform:scale(0.8) translateY(20px);}to{opacity:1;transform:scale(1) translateY(0);}}
            @keyframes iconBounce{from{opacity:0;transform:scale(0);}to{opacity:1;transform:scale(1);}}
            @keyframes resultFadeIn{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
            @keyframes resultBounce{from{opacity:0;transform:scale(0.3);}to{opacity:1;transform:scale(1);}}
            @keyframes drawCheck{to{stroke-dashoffset:0;}}
            @keyframes confetti0{0%{opacity:1;transform:translate(-50%,-50%) scale(1);}100%{opacity:0;transform:translate(calc(-50% + 120px),calc(-50% + 0px)) scale(0);}}
            @keyframes confetti1{0%{opacity:1;transform:translate(-50%,-50%) scale(1);}100%{opacity:0;transform:translate(calc(-50% + 104px),calc(-50% + 60px)) scale(0);}}
            @keyframes confetti2{0%{opacity:1;transform:translate(-50%,-50%) scale(1);}100%{opacity:0;transform:translate(calc(-50% + 60px),calc(-50% + 104px)) scale(0);}}
            @keyframes confetti3{0%{opacity:1;transform:translate(-50%,-50%) scale(1);}100%{opacity:0;transform:translate(calc(-50% + 0px),calc(-50% + 130px)) scale(0);}}
            @keyframes confetti4{0%{opacity:1;transform:translate(-50%,-50%) scale(1);}100%{opacity:0;transform:translate(calc(-50% + -60px),calc(-50% + 104px)) scale(0);}}
            @keyframes confetti5{0%{opacity:1;transform:translate(-50%,-50%) scale(1);}100%{opacity:0;transform:translate(calc(-50% + -104px),calc(-50% + 60px)) scale(0);}}
            @keyframes confetti6{0%{opacity:1;transform:translate(-50%,-50%) scale(1);}100%{opacity:0;transform:translate(calc(-50% + -140px),calc(-50% + 0px)) scale(0);}}
            @keyframes confetti7{0%{opacity:1;transform:translate(-50%,-50%) scale(1);}100%{opacity:0;transform:translate(calc(-50% + -104px),calc(-50% + -60px)) scale(0);}}
            @keyframes confetti8{0%{opacity:1;transform:translate(-50%,-50%) scale(1);}100%{opacity:0;transform:translate(calc(-50% + -60px),calc(-50% + -104px)) scale(0);}}
            @keyframes confetti9{0%{opacity:1;transform:translate(-50%,-50%) scale(1);}100%{opacity:0;transform:translate(calc(-50% + 0px),calc(-50% + -130px)) scale(0);}}
            @keyframes confetti10{0%{opacity:1;transform:translate(-50%,-50%) scale(1);}100%{opacity:0;transform:translate(calc(-50% + 60px),calc(-50% + -104px)) scale(0);}}
            @keyframes confetti11{0%{opacity:1;transform:translate(-50%,-50%) scale(1);}100%{opacity:0;transform:translate(calc(-50% + 104px),calc(-50% + -60px)) scale(0);}}
          `}</style>
        </div>
      )}

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          Booking Approval Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Review and manage all customer bookings
        </p>
      </div>

      {/* Stats */}
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
            label: "Rejected",
            value: stats.rejected,
            cls: "bg-red-50 border-l-4 border-red-500",
            t: "text-red-600",
            v: "text-red-700",
          },
          {
            label: "Confirmed",
            value: stats.confirmed,
            cls: "bg-green-50 border-l-4 border-green-500",
            t: "text-green-600",
            v: "text-green-700",
          },
          {
            label: "Active",
            value: stats.active,
            cls: "bg-purple-50 border-l-4 border-purple-500",
            t: "text-purple-600",
            v: "text-purple-700",
          },
          {
            label: "Completed",
            value: stats.completed,
            cls: "bg-gray-50 border-l-4 border-gray-500",
            t: "text-gray-600",
            v: "text-gray-700",
          },
          {
            label: "Cancelled",
            value: stats.cancelled,
            cls: "bg-red-100 border-l-4 border-red-700",
            t: "text-red-700",
            v: "text-red-800",
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

      {/* Filters */}
      <div className="bg-white rounded-lg shadow mb-6 p-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              ["all", "blue"],
              ["pending", "yellow"],
              ["approved", "blue"],
              ["rejected", "red"],
              ["confirmed", "green"],
              ["cancelled", "red"],
            ].map(([s, c]) => (
              <button
                key={s}
                onClick={() => handleFilterChange(s)}
                className={`px-4 py-2 rounded-lg font-medium transition capitalize ${filterStatus === s ? `bg-${c}-600 text-white` : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-64">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, vehicle..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Booking ID",
                  "Customer",
                  "Vehicle",
                  "Dates",
                  "Total",
                  "Status",
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
              {filteredBookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {booking.confirmationCode || booking._id.slice(-6)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {booking.user?.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {booking.user?.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FaCar className="text-gray-400" />
                      <span className="text-sm text-gray-900">
                        {booking.vehicle?.carName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {formatDate(booking.pickupDate)} -{" "}
                      {formatDate(booking.returnDate)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {booking.totalDays} days
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {formatCurrency(booking.totalAmount)}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(booking.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewDetails(booking)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => fetchDocuments(booking._id)}
                        className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition"
                        title="View Documents"
                      >
                        <FaFileAlt />
                      </button>
                      {booking.status === "pending" && (
                        <>
                          <button
                            onClick={() =>
                              showConfirmation(
                                handleApprove,
                                booking._id,
                                "Approve Booking",
                                `Approve booking for ${booking.vehicle?.carName}?`,
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
                              setSelectedBooking(booking);
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
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No bookings found</p>
          </div>
        )}
      </div>

      {/* Booking Details Modal */}
      {showDetailsModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <FaInfoCircle className="text-blue-600 text-2xl" />
                  <h3 className="text-xl font-bold text-gray-800">
                    Booking Details
                  </h3>
                </div>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimesCircle size={24} />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <FaFileAlt className="text-blue-600" /> Booking Info
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-gray-600">ID:</span>{" "}
                      <strong>
                        {selectedBooking.confirmationCode ||
                          selectedBooking._id}
                      </strong>
                    </p>
                    <p>
                      <span className="text-gray-600">Status:</span>{" "}
                      {getStatusBadge(selectedBooking.status)}
                    </p>
                    <p>
                      <span className="text-gray-600">Created:</span>{" "}
                      {formatDateTime(selectedBooking.createdAt)}
                    </p>
                    {selectedBooking.approvedAt && (
                      <p>
                        <span className="text-gray-600">Approved:</span>{" "}
                        {formatDateTime(selectedBooking.approvedAt)}
                      </p>
                    )}
                    {selectedBooking.rejectionReason && (
                      <p>
                        <span className="text-gray-600">Rejection Reason:</span>{" "}
                        <span className="text-red-600">
                          {selectedBooking.rejectionReason}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <FaUser className="text-blue-600" /> Customer
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-gray-600">Name:</span>{" "}
                      <strong>{selectedBooking.user?.name}</strong>
                    </p>
                    <p>
                      <span className="text-gray-600">Email:</span>{" "}
                      {selectedBooking.user?.email}
                    </p>
                    <p>
                      <span className="text-gray-600">Phone:</span>{" "}
                      {selectedBooking.user?.phone || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>

              {selectedBooking.status === "cancelled" && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                    <FaTimesCircle className="text-red-600" /> Cancellation Info
                  </h4>
                  <p className="text-sm">
                    <span className="text-red-700 font-medium">
                      Cancelled On:
                    </span>{" "}
                    {formatDateTime(selectedBooking.cancellationDate)}
                  </p>
                  <p className="text-sm">
                    <span className="text-red-700 font-medium">Reason:</span>{" "}
                    {selectedBooking.cancellationReason || "No reason provided"}
                  </p>
                </div>
              )}

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FaCar className="text-blue-600" /> Vehicle Info
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Name</p>
                    <p className="font-medium">
                      {selectedBooking.vehicle?.carName}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Number</p>
                    <p className="font-medium">
                      {selectedBooking.vehicle?.carNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Type</p>
                    <p className="font-medium">
                      {selectedBooking.vehicle?.carType}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Seats</p>
                    <p className="font-medium">
                      {selectedBooking.vehicle?.seats}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FaCalendarAlt className="text-blue-600" /> Rental Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-gray-500">Pickup</p>
                    <p className="font-medium">
                      {formatDate(selectedBooking.pickupDate)} at{" "}
                      {selectedBooking.pickupTime}
                    </p>
                    <p className="text-gray-500">
                      {selectedBooking.pickupLocation}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Return</p>
                    <p className="font-medium">
                      {formatDate(selectedBooking.returnDate)} at{" "}
                      {selectedBooking.returnTime}
                    </p>
                    <p className="text-gray-500">
                      {selectedBooking.dropoffLocation}
                    </p>
                  </div>
                </div>
                <div className="border-t pt-3 text-sm space-y-1">
                  <p>
                    <span className="text-gray-600">Duration:</span>{" "}
                    <strong>{selectedBooking.totalDays} days</strong>
                  </p>
                  <p>
                    <span className="text-gray-600">Driver:</span>{" "}
                    {selectedBooking.driverOption === "with"
                      ? "With Driver"
                      : "Self Drive"}
                  </p>
                  <p>
                    <span className="text-gray-600">Insurance:</span>{" "}
                    {selectedBooking.insuranceOption === "premium"
                      ? "Premium Coverage"
                      : "Basic Coverage"}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FaRupeeSign className="text-blue-600" /> Pricing
                </h4>
                <div className="space-y-2 text-sm">
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
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-blue-600">
                      {formatCurrency(selectedBooking.totalAmount)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-between">
                <button
                  onClick={() => fetchDocuments(selectedBooking._id)}
                  className="px-5 py-2 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition font-medium flex items-center gap-2"
                >
                  <FaFileAlt /> View Documents
                </button>
                {selectedBooking.status === "pending" && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setShowDetailsModal(false);
                        setShowRejectModal(true);
                      }}
                      className="px-6 py-2 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition font-medium"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() =>
                        showConfirmation(
                          handleApprove,
                          selectedBooking._id,
                          "Approve Booking",
                          `Approve booking for ${selectedBooking.vehicle?.carName}?`,
                          "approve",
                        )
                      }
                      className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium"
                    >
                      Approve
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Documents Modal */}
      {showDocumentsModal && selectedDocuments && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <FaFileAlt className="text-purple-600 text-2xl" />
                  <h3 className="text-xl font-bold text-gray-800">
                    Customer Documents
                  </h3>
                </div>
                <button
                  onClick={() => setShowDocumentsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimesCircle size={24} />
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Verify customer identity documents before approving the booking
              </p>
            </div>
            <div className="p-6">
              {/* Citizenship */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-lg border-b pb-2">
                  <FaIdCard className="text-blue-600" /> Citizenship Certificate
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    ["citizenshipFront", "Front Side"],
                    ["citizenshipBack", "Back Side"],
                  ].map(([key, label]) =>
                    selectedDocuments[key] ? (
                      <div
                        key={key}
                        className="border rounded-xl p-4 bg-gray-50 hover:shadow-md transition"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {getFileIcon(selectedDocuments[key].mimetype)}
                            <p className="font-medium">{label}</p>
                          </div>
                          <button
                            onClick={() =>
                              openImageViewer(
                                `http://localhost:5000${selectedDocuments[key].url}`,
                              )
                            }
                            className="text-blue-600 text-sm flex items-center gap-1"
                          >
                            <FaExpand size={12} /> View Full
                          </button>
                        </div>
                        {selectedDocuments[key].mimetype?.startsWith(
                          "image/",
                        ) ? (
                          <div
                            className="cursor-pointer overflow-hidden rounded-lg border border-gray-200"
                            onClick={() =>
                              openImageViewer(
                                `http://localhost:5000${selectedDocuments[key].url}`,
                              )
                            }
                          >
                            <img
                              src={`http://localhost:5000${selectedDocuments[key].url}`}
                              alt={label}
                              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ) : (
                          <div className="p-8 bg-white rounded-lg border text-center">
                            <FaFilePdf className="text-red-500 text-5xl mx-auto mb-2" />
                            <a
                              href={`http://localhost:5000${selectedDocuments[key].url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 inline-block mt-2"
                            >
                              View PDF
                            </a>
                          </div>
                        )}
                        <p className="text-xs text-gray-500 mt-2">
                          Uploaded:{" "}
                          {new Date(
                            selectedDocuments[key].uploadedAt,
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    ) : null,
                  )}
                  {!selectedDocuments.citizenshipFront &&
                    !selectedDocuments.citizenshipBack && (
                      <div className="col-span-2 text-center py-8 bg-gray-50 rounded-lg">
                        <FaIdCard className="text-gray-400 text-5xl mx-auto mb-2" />
                        <p className="text-gray-500">
                          No citizenship documents uploaded
                        </p>
                      </div>
                    )}
                </div>
              </div>

              {/* License */}
              {(selectedDocuments.licenseFront ||
                selectedDocuments.licenseBack) && (
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-lg border-b pb-2">
                    <FaIdCard className="text-green-600" /> Driver's License
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      ["licenseFront", "Front Side"],
                      ["licenseBack", "Back Side"],
                    ].map(([key, label]) =>
                      selectedDocuments[key] ? (
                        <div
                          key={key}
                          className="border rounded-xl p-4 bg-gray-50 hover:shadow-md transition"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              {getFileIcon(selectedDocuments[key].mimetype)}
                              <p className="font-medium">{label}</p>
                            </div>
                            <button
                              onClick={() =>
                                openImageViewer(
                                  `http://localhost:5000${selectedDocuments[key].url}`,
                                )
                              }
                              className="text-blue-600 text-sm flex items-center gap-1"
                            >
                              <FaExpand size={12} /> View Full
                            </button>
                          </div>
                          {selectedDocuments[key].mimetype?.startsWith(
                            "image/",
                          ) ? (
                            <div
                              className="cursor-pointer overflow-hidden rounded-lg border border-gray-200"
                              onClick={() =>
                                openImageViewer(
                                  `http://localhost:5000${selectedDocuments[key].url}`,
                                )
                              }
                            >
                              <img
                                src={`http://localhost:5000${selectedDocuments[key].url}`}
                                alt={label}
                                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          ) : (
                            <div className="p-8 bg-white rounded-lg border text-center">
                              <FaFilePdf className="text-red-500 text-5xl mx-auto mb-2" />
                              <a
                                href={`http://localhost:5000${selectedDocuments[key].url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 inline-block mt-2"
                              >
                                View PDF
                              </a>
                            </div>
                          )}
                          <p className="text-xs text-gray-500 mt-2">
                            Uploaded:{" "}
                            {new Date(
                              selectedDocuments[key].uploadedAt,
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      ) : null,
                    )}
                  </div>
                </div>
              )}

              {/* Passport Photo */}
              {selectedDocuments.passportPhoto && (
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-lg border-b pb-2">
                    <FaPassport className="text-orange-600" /> Passport Photo
                  </h4>
                  <div className="max-w-md">
                    <div className="border rounded-xl p-4 bg-gray-50 hover:shadow-md transition">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {getFileIcon(
                            selectedDocuments.passportPhoto.mimetype,
                          )}
                          <p className="font-medium">Passport Photo</p>
                        </div>
                        <button
                          onClick={() =>
                            openImageViewer(
                              `http://localhost:5000${selectedDocuments.passportPhoto.url}`,
                            )
                          }
                          className="text-blue-600 text-sm flex items-center gap-1"
                        >
                          <FaExpand size={12} /> View Full
                        </button>
                      </div>
                      {selectedDocuments.passportPhoto.mimetype?.startsWith(
                        "image/",
                      ) ? (
                        <div
                          className="cursor-pointer overflow-hidden rounded-lg border border-gray-200"
                          onClick={() =>
                            openImageViewer(
                              `http://localhost:5000${selectedDocuments.passportPhoto.url}`,
                            )
                          }
                        >
                          <img
                            src={`http://localhost:5000${selectedDocuments.passportPhoto.url}`}
                            alt="Passport"
                            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ) : (
                        <div className="p-8 bg-white rounded-lg border text-center">
                          <FaFilePdf className="text-red-500 text-5xl mx-auto mb-2" />
                          <a
                            href={`http://localhost:5000${selectedDocuments.passportPhoto.url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 inline-block mt-2"
                          >
                            View PDF
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Verification Summary */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FaCheckCircle className="text-green-600" /> Verification
                  Summary
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-white rounded-lg">
                    <p className="text-sm text-gray-500">Citizenship</p>
                    <p className="font-semibold text-blue-600">
                      {
                        [
                          selectedDocuments.citizenshipFront,
                          selectedDocuments.citizenshipBack,
                        ].filter(Boolean).length
                      }
                      /2 Uploaded
                    </p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <p className="text-sm text-gray-500">Driver's License</p>
                    <p className="font-semibold text-green-600">
                      {
                        [
                          selectedDocuments.licenseFront,
                          selectedDocuments.licenseBack,
                        ].filter(Boolean).length
                      }
                      /2 Uploaded
                    </p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <p className="text-sm text-gray-500">Passport Photo</p>
                    <p className="font-semibold text-orange-600">
                      {selectedDocuments.passportPhoto ? 1 : 0}/1 Uploaded
                    </p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <p className="text-sm text-gray-500">Verification Status</p>
                    <p
                      className={`font-semibold ${selectedDocuments.verificationStatus === "verified" ? "text-green-600" : selectedDocuments.verificationStatus === "rejected" ? "text-red-600" : "text-yellow-600"}`}
                    >
                      {selectedDocuments.verificationStatus?.toUpperCase() ||
                        "PENDING"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Viewer */}
      {showImageViewer && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-[60]">
          <div className="relative max-w-5xl max-h-[90vh]">
            <button
              onClick={() => setShowImageViewer(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition"
            >
              <FaTimesCircle size={32} />
            </button>
            <img
              src={selectedImage}
              alt="Document Preview"
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg text-sm">
              Click outside or press ESC to close
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <FaTimesCircle className="text-red-600 text-2xl" />
              <h3 className="text-xl font-bold text-gray-800">
                Reject Booking
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              Reject booking <strong>{selectedBooking.confirmationCode}</strong>
              ?
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
                onClick={() => handleReject(selectedBooking._id)}
                disabled={actionLoading}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium disabled:opacity-50"
              >
                {actionLoading ? (
                  <FaSpinner className="animate-spin inline" />
                ) : (
                  "Reject Booking"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBookingApproval;
