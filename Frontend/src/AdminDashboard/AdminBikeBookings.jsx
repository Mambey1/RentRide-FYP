import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaMotorcycle,
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
  FaHelmetSafety,
} from "react-icons/fa";

const AdminBikeBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmBookingId, setConfirmBookingId] = useState(null);
  const [confirmTitle, setConfirmTitle] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmType, setConfirmType] = useState("");
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
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/bikes/admin/bookings",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.data.success) {
        setBookings(response.data.data);
        setFilteredBookings(response.data.data);
        calculateStats(response.data.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bike bookings:", error);
      toast.error("Failed to fetch bike bookings");
      setLoading(false);
    }
  };

  const calculateStats = (bookingsData) => {
    const statsData = {
      total: bookingsData.length,
      pending: bookingsData.filter((b) => b.status === "pending").length,
      approved: bookingsData.filter((b) => b.status === "approved").length,
      rejected: bookingsData.filter((b) => b.status === "rejected").length,
      confirmed: bookingsData.filter((b) => b.status === "confirmed").length,
      active: bookingsData.filter((b) => b.status === "active").length,
      completed: bookingsData.filter((b) => b.status === "completed").length,
      cancelled: bookingsData.filter((b) => b.status === "cancelled").length,
    };
    setStats(statsData);
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
    if (confirmAction) {
      await confirmAction(confirmBookingId);
    }
    setShowConfirmModal(false);
    setConfirmAction(null);
    setConfirmBookingId(null);
  };

  const handleApprove = async (bookingId) => {
    setActionLoading(true);
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/bikes/admin/bookings/${bookingId}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success("✅ Bike booking approved successfully!");
      fetchBookings();
      setShowDetailsModal(false);
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
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/bikes/admin/bookings/${bookingId}/cancel`,
        { reason: rejectionReason },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.error("❌ Bike booking rejected successfully!");
      fetchBookings();
      setShowRejectModal(false);
      setRejectionReason("");
      setShowDetailsModal(false);
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
    if (status === "all") {
      setFilteredBookings(bookings);
    } else {
      setFilteredBookings(
        bookings.filter((booking) => booking.status === status),
      );
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    let filtered = bookings;
    if (filterStatus !== "all") {
      filtered = filtered.filter((b) => b.status === filterStatus);
    }

    const searched = filtered.filter(
      (booking) =>
        booking.user?.name?.toLowerCase().includes(term) ||
        booking.user?.email?.toLowerCase().includes(term) ||
        booking.bike?.bikeName?.toLowerCase().includes(term) ||
        booking.confirmationCode?.toLowerCase().includes(term),
    );

    setFilteredBookings(searched);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
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
        icon: FaMotorcycle,
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
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-1 ${config.color}`}
      >
        <Icon size={12} />
        {config.label}
      </span>
    );
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateTime = (date) => {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount) => {
    return `रु ${amount?.toLocaleString("en-NP") || 0}`;
  };

  const getConfirmModalStyles = () => {
    switch (confirmType) {
      case "approve":
        return {
          icon: <FaCheckCircle className="text-green-600 text-5xl mb-4" />,
          buttonClass: "bg-green-600 hover:bg-green-700",
          buttonText: "Yes, Approve",
        };
      case "reject":
        return {
          icon: <FaTimesCircle className="text-red-600 text-5xl mb-4" />,
          buttonClass: "bg-red-600 hover:bg-red-700",
          buttonText: "Yes, Reject",
        };
      default:
        return {
          icon: <FaCheckCircle className="text-blue-600 text-5xl mb-4" />,
          buttonClass: "bg-blue-600 hover:bg-blue-700",
          buttonText: "Yes, Proceed",
        };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading bike bookings...</p>
        </div>
      </div>
    );
  }

  const modalStyles = getConfirmModalStyles();

  return (
    <div className="p-8">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Custom Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowConfirmModal(false)}
          ></div>
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 animate-in fade-in zoom-in duration-200">
            <div className="text-center">
              {modalStyles.icon}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {confirmTitle}
              </h3>
              <p className="text-gray-600 mb-6">{confirmMessage}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={executeAction}
                  disabled={actionLoading}
                  className={`flex-1 px-4 py-2 text-white font-medium rounded-lg transition flex items-center justify-center gap-2 ${modalStyles.buttonClass} disabled:opacity-50`}
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
      )}

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-2">
          <FaMotorcycle /> Bike Booking Approval Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Review and manage all bike bookings
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-500 text-sm">Total</p>
          <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
        </div>
        <div className="bg-yellow-50 rounded-lg shadow p-4 border-l-4 border-yellow-500">
          <p className="text-yellow-600 text-sm">Pending</p>
          <p className="text-2xl font-bold text-yellow-700">{stats.pending}</p>
        </div>
        <div className="bg-blue-50 rounded-lg shadow p-4 border-l-4 border-blue-500">
          <p className="text-blue-600 text-sm">Approved</p>
          <p className="text-2xl font-bold text-blue-700">{stats.approved}</p>
        </div>
        <div className="bg-red-50 rounded-lg shadow p-4 border-l-4 border-red-500">
          <p className="text-red-600 text-sm">Rejected</p>
          <p className="text-2xl font-bold text-red-700">{stats.rejected}</p>
        </div>
        <div className="bg-green-50 rounded-lg shadow p-4 border-l-4 border-green-500">
          <p className="text-green-600 text-sm">Confirmed</p>
          <p className="text-2xl font-bold text-green-700">{stats.confirmed}</p>
        </div>
        <div className="bg-purple-50 rounded-lg shadow p-4 border-l-4 border-purple-500">
          <p className="text-purple-600 text-sm">Active</p>
          <p className="text-2xl font-bold text-purple-700">{stats.active}</p>
        </div>
        <div className="bg-gray-50 rounded-lg shadow p-4 border-l-4 border-gray-500">
          <p className="text-gray-600 text-sm">Completed</p>
          <p className="text-2xl font-bold text-gray-700">{stats.completed}</p>
        </div>
        <div className="bg-red-100 rounded-lg shadow p-4 border-l-4 border-red-700">
          <p className="text-red-700 text-sm">Cancelled</p>
          <p className="text-2xl font-bold text-red-800">{stats.cancelled}</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow mb-6 p-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => handleFilterChange("all")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filterStatus === "all"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleFilterChange("pending")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filterStatus === "pending"
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => handleFilterChange("approved")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filterStatus === "approved"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Approved
            </button>
            <button
              onClick={() => handleFilterChange("rejected")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filterStatus === "rejected"
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Rejected
            </button>
            <button
              onClick={() => handleFilterChange("confirmed")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filterStatus === "confirmed"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Confirmed
            </button>
            <button
              onClick={() => handleFilterChange("cancelled")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filterStatus === "cancelled"
                  ? "bg-red-700 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Cancelled
            </button>
          </div>

          <div className="relative w-full md:w-64">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, bike..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bike
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {booking.confirmationCode || booking._id.slice(-6)}
                    </div>
                   </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {booking.user?.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {booking.user?.email}
                      </div>
                    </div>
                   </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FaMotorcycle className="text-gray-400" />
                      <span className="text-sm text-gray-900">
                        {booking.bike?.bikeName}
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
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(booking.totalAmount)}
                    </div>
                   </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(booking.status)}
                   </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewDetails(booking)}
                        className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition"
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      {booking.status === "pending" && (
                        <>
                          <button
                            onClick={() =>
                              showConfirmation(
                                handleApprove,
                                booking._id,
                                "Approve Bike Booking",
                                `Are you sure you want to approve this booking for ${booking.bike?.bikeName}?`,
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
            <p className="text-gray-500">No bike bookings found</p>
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
                  <FaInfoCircle className="text-purple-600 text-2xl" />
                  <h3 className="text-xl font-bold text-gray-800">
                    Bike Booking Details
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <FaFileAlt className="text-purple-600" /> Booking Information
                  </h4>
                  <div className="space-y-2">
                    <p>
                      <span className="text-gray-600">Booking ID:</span>{" "}
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
                    <FaUser className="text-purple-600" /> Customer Information
                  </h4>
                  <div className="space-y-2">
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

              <div className="bg-gray-50 rounded-lg p-4 mb-8">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FaMotorcycle className="text-purple-600" /> Bike Information
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm">Bike Name</p>
                    <p className="font-medium">
                      {selectedBooking.bike?.bikeName}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Bike Number</p>
                    <p className="font-medium">
                      {selectedBooking.bike?.bikeNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Bike Type</p>
                    <p className="font-medium">
                      {selectedBooking.bike?.bikeType}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Engine</p>
                    <p className="font-medium">
                      {selectedBooking.bike?.engineCapacity}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-8">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FaCalendarAlt className="text-purple-600" /> Rental Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm">Pickup</p>
                    <p className="font-medium">
                      {formatDate(selectedBooking.pickupDate)} at{" "}
                      {selectedBooking.pickupTime}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedBooking.pickupLocation}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Return</p>
                    <p className="font-medium">
                      {formatDate(selectedBooking.returnDate)} at{" "}
                      {selectedBooking.returnTime}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedBooking.dropoffLocation}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p>
                    <span className="text-gray-600">Duration:</span>{" "}
                    <strong>{selectedBooking.totalDays} days</strong>
                  </p>
                  <p>
                    <span className="text-gray-600">Rider Experience:</span>{" "}
                    <strong>{selectedBooking.riderExperience || "N/A"}</strong>
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    {selectedBooking.extraHelmet && (
                      <span className="flex items-center gap-1 text-sm text-gray-600">
                        <FaHelmetSafety className="text-purple-500" /> Extra Helmet
                      </span>
                    )}
                    {selectedBooking.ridingGear && (
                      <span className="flex items-center gap-1 text-sm text-gray-600">
                        <FaShieldAlt className="text-purple-500" /> Riding Gear
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-8">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FaRupeeSign className="text-purple-600" /> Pricing Breakdown
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Base Price ({selectedBooking.totalDays} days)
                    </span>
                    <span>{formatCurrency(selectedBooking.basePrice)}</span>
                  </div>
                  {selectedBooking.extraHelmet && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Extra Helmet</span>
                      <span>{formatCurrency(100 * selectedBooking.totalDays)}</span>
                    </div>
                  )}
                  {selectedBooking.ridingGear && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Riding Gear</span>
                      <span>{formatCurrency(200 * selectedBooking.totalDays)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Fee</span>
                    <span>{formatCurrency(selectedBooking.serviceFee)}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total Amount</span>
                      <span className="text-purple-600">
                        {formatCurrency(selectedBooking.totalAmount)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              {selectedBooking.emergencyContact && (
                <div className="bg-gray-50 rounded-lg p-4 mb-8">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <FaPhone className="text-purple-600" /> Emergency Contact
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600 text-sm">Name</p>
                      <p className="font-medium">
                        {selectedBooking.emergencyContact.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Phone</p>
                      <p className="font-medium">
                        {selectedBooking.emergencyContact.phone}
                      </p>
                    </div>
                    {selectedBooking.emergencyContact.relationship && (
                      <div>
                        <p className="text-gray-600 text-sm">Relationship</p>
                        <p className="font-medium">
                          {selectedBooking.emergencyContact.relationship}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {selectedBooking.specialRequests && (
                <div className="bg-gray-50 rounded-lg p-4 mb-8">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <FaInfoCircle className="text-purple-600" /> Special Requests
                  </h4>
                  <p className="text-gray-700">{selectedBooking.specialRequests}</p>
                </div>
              )}

              {selectedBooking.status === "pending" && (
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setShowDetailsModal(false);
                      setShowRejectModal(true);
                    }}
                    className="px-6 py-2 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition font-medium"
                  >
                    Reject Booking
                  </button>
                  <button
                    onClick={() =>
                      showConfirmation(
                        handleApprove,
                        selectedBooking._id,
                        "Approve Bike Booking",
                        `Are you sure you want to approve this booking for ${selectedBooking.bike?.bikeName}?`,
                        "approve",
                      )
                    }
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium"
                  >
                    Approve Booking
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <FaTimesCircle className="text-red-600 text-2xl" />
                <h3 className="text-xl font-bold text-gray-800">
                  Reject Bike Booking
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Are you sure you want to reject booking{" "}
                <strong>{selectedBooking.confirmationCode}</strong>?
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
                  placeholder="Please provide a reason for rejecting this booking..."
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
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium"
                  disabled={actionLoading}
                >
                  Reject Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBikeBookings;