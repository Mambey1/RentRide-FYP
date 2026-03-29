


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
  FaCompress,
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
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    confirmed: 0,
    active: 0,
    completed: 0,
  });

  // Fetch all bookings on mount
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/bookings/admin/all",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setBookings(response.data.data.bookings);
        setFilteredBookings(response.data.data.bookings);
        calculateStats(response.data.data.bookings);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setLoading(false);
    }
  };

  const fetchDocuments = async (bookingId) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/documents/booking/${bookingId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setSelectedDocuments(response.data.data);
        setShowDocumentsModal(true);
      } else {
        alert("No documents found for this booking");
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
      alert("Failed to fetch documents");
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
    };
    setStats(statsData);
  };

  const handleApprove = async (bookingId) => {
    if (window.confirm("Are you sure you want to approve this booking?")) {
      try {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        await axios.post(
          `http://localhost:5000/api/bookings/admin/${bookingId}/approve`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Booking approved successfully!");
        fetchBookings();
        setShowDetailsModal(false);
      } catch (error) {
        console.error("Error approving booking:", error);
        alert(error.response?.data?.message || "Failed to approve booking");
      }
    }
  };

  const handleReject = async (bookingId) => {
    if (!rejectionReason.trim()) {
      alert("Please provide a reason for rejection");
      return;
    }

    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/bookings/admin/${bookingId}/reject`,
        { reason: rejectionReason },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Booking rejected successfully!");
      fetchBookings();
      setShowRejectModal(false);
      setRejectionReason("");
      setShowDetailsModal(false);
    } catch (error) {
      console.error("Error rejecting booking:", error);
      alert(error.response?.data?.message || "Failed to reject booking");
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
      setFilteredBookings(bookings.filter((booking) => booking.status === status));
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
        booking.vehicle?.carName?.toLowerCase().includes(term) ||
        booking.confirmationCode?.toLowerCase().includes(term)
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
        icon: FaCar,
        label: "Active",
      },
      completed: {
        color: "bg-gray-100 text-gray-800",
        icon: FaCheckCircle,
        label: "Completed",
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

  const formatCurrency = (amount) => {
    return `रु ${amount?.toLocaleString("en-NP") || 0}`;
  };

  const getFileIcon = (mimetype) => {
    if (mimetype?.startsWith("image/")) {
      return <FaFileImage className="text-blue-500" />;
    } else if (mimetype === "application/pdf") {
      return <FaFilePdf className="text-red-500" />;
    }
    return <FaFileAlt className="text-gray-500" />;
  };

  const openImageViewer = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowImageViewer(true);
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

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          Booking Approval Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Review and manage all customer bookings
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
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
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow mb-6 p-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => handleFilterChange("all")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filterStatus === "all"
                  ? "bg-blue-600 text-white"
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

      {/* Bookings Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documents</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
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
                      <div className="text-sm font-medium text-gray-900">{booking.user?.name}</div>
                      <div className="text-sm text-gray-500">{booking.user?.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FaCar className="text-gray-400" />
                      <span className="text-sm text-gray-900">{booking.vehicle?.carName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {formatDate(booking.pickupDate)} - {formatDate(booking.returnDate)}
                    </div>
                    <div className="text-xs text-gray-500">{booking.totalDays} days</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{formatCurrency(booking.totalAmount)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => fetchDocuments(booking._id)}
                      className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm hover:bg-blue-200 transition flex items-center gap-1"
                    >
                      <FaFileAlt size={12} />
                      View Docs
                    </button>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(booking.status)}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewDetails(booking)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      {booking.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(booking._id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                            title="Approve"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <FaInfoCircle className="text-blue-600 text-2xl" />
                  <h3 className="text-xl font-bold text-gray-800">Booking Details</h3>
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
              {/* Booking Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <FaFileAlt className="text-blue-600" />
                    Booking Information
                  </h4>
                  <div className="space-y-2">
                    <p>
                      <span className="text-gray-600">Booking ID:</span>{" "}
                      <strong>{selectedBooking.confirmationCode || selectedBooking._id}</strong>
                    </p>
                    <p>
                      <span className="text-gray-600">Status:</span>{" "}
                      {getStatusBadge(selectedBooking.status)}
                    </p>
                    <p>
                      <span className="text-gray-600">Created:</span>{" "}
                      {new Date(selectedBooking.createdAt).toLocaleString()}
                    </p>
                    {selectedBooking.approvedAt && (
                      <p>
                        <span className="text-gray-600">Approved:</span>{" "}
                        {new Date(selectedBooking.approvedAt).toLocaleString()}
                      </p>
                    )}
                    {selectedBooking.rejectedAt && (
                      <p>
                        <span className="text-gray-600">Rejected:</span>{" "}
                        {new Date(selectedBooking.rejectedAt).toLocaleString()}
                      </p>
                    )}
                    {selectedBooking.rejectionReason && (
                      <p>
                        <span className="text-gray-600">Rejection Reason:</span>{" "}
                        <span className="text-red-600">{selectedBooking.rejectionReason}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <FaUser className="text-blue-600" />
                    Customer Information
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

              {/* Vehicle Information */}
              <div className="bg-gray-50 rounded-lg p-4 mb-8">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FaCar className="text-blue-600" />
                  Vehicle Information
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm">Vehicle Name</p>
                    <p className="font-medium">{selectedBooking.vehicle?.carName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Car Number</p>
                    <p className="font-medium">{selectedBooking.vehicle?.carNumber}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Car Type</p>
                    <p className="font-medium">{selectedBooking.vehicle?.carType}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Seats</p>
                    <p className="font-medium">{selectedBooking.vehicle?.seats}</p>
                  </div>
                </div>
              </div>

              {/* Rental Details */}
              <div className="bg-gray-50 rounded-lg p-4 mb-8">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FaCalendarAlt className="text-blue-600" />
                  Rental Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm flex items-center gap-1">
                      <FaCalendarAlt size={12} /> Pickup
                    </p>
                    <p className="font-medium">
                      {formatDate(selectedBooking.pickupDate)} at {selectedBooking.pickupTime}
                    </p>
                    <p className="text-sm text-gray-600">{selectedBooking.pickupLocation}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm flex items-center gap-1">
                      <FaCalendarAlt size={12} /> Return
                    </p>
                    <p className="font-medium">
                      {formatDate(selectedBooking.returnDate)} at {selectedBooking.returnTime}
                    </p>
                    <p className="text-sm text-gray-600">{selectedBooking.dropoffLocation}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p>
                    <span className="text-gray-600">Duration:</span>{" "}
                    <strong>{selectedBooking.totalDays} days</strong>
                  </p>
                  <p>
                    <span className="text-gray-600">Driver Option:</span>{" "}
                    {selectedBooking.driverOption === "with" ? "With Driver" : "Self Drive"}
                  </p>
                  <p>
                    <span className="text-gray-600">Insurance:</span>{" "}
                    {selectedBooking.insuranceOption === "premium" ? "Premium Coverage" : "Basic Coverage"}
                  </p>
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div className="bg-gray-50 rounded-lg p-4 mb-8">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FaRupeeSign className="text-blue-600" />
                  Pricing Breakdown
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base Price ({selectedBooking.totalDays} days)</span>
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
                      <span>{formatCurrency(selectedBooking.insuranceFee)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Fee</span>
                    <span>{formatCurrency(selectedBooking.serviceFee)}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total Amount</span>
                      <span className="text-blue-600">{formatCurrency(selectedBooking.totalAmount)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              {selectedBooking.emergencyContact && (
                <div className="bg-gray-50 rounded-lg p-4 mb-8">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <FaPhone className="text-blue-600" /> Emergency Contact
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-gray-600 text-sm">Name</p>
                      <p className="font-medium">{selectedBooking.emergencyContact.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Phone</p>
                      <p className="font-medium">{selectedBooking.emergencyContact.phone}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Relationship</p>
                      <p className="font-medium">{selectedBooking.emergencyContact.relationship || "Not specified"}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Special Requests */}
              {selectedBooking.specialRequests && (
                <div className="bg-gray-50 rounded-lg p-4 mb-8">
                  <h4 className="font-semibold text-gray-800 mb-2">Special Requests</h4>
                  <p className="text-gray-700">{selectedBooking.specialRequests}</p>
                </div>
              )}

              {/* Action Buttons */}
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
                    onClick={() => handleApprove(selectedBooking._id)}
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

      {/* Documents Modal with Thumbnails */}
      {showDocumentsModal && selectedDocuments && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <FaFileAlt className="text-blue-600 text-2xl" />
                  <h3 className="text-xl font-bold text-gray-800">Customer Documents</h3>
                </div>
                <button
                  onClick={() => setShowDocumentsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimesCircle size={24} />
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Citizenship Documents with Thumbnails */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-lg">
                  <FaIdCard className="text-blue-600" />
                  Citizenship Certificate
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedDocuments.citizenshipFront && (
                    <div className="border rounded-xl p-4 bg-gray-50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {getFileIcon(selectedDocuments.citizenshipFront.mimetype)}
                          <p className="font-medium">Front Side</p>
                        </div>
                        <button
                          onClick={() => openImageViewer(`http://localhost:5000${selectedDocuments.citizenshipFront.url}`)}
                          className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                        >
                          <FaExpand size={12} /> View Full
                        </button>
                      </div>
                      {selectedDocuments.citizenshipFront.mimetype?.startsWith("image/") ? (
                        <div
                          className="mt-2 cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white"
                          onClick={() => openImageViewer(`http://localhost:5000${selectedDocuments.citizenshipFront.url}`)}
                        >
                          <img
                            src={`http://localhost:5000${selectedDocuments.citizenshipFront.url}`}
                            alt="Citizenship Front"
                            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ) : (
                        <div className="mt-2 p-8 bg-white rounded-lg border border-gray-200 text-center">
                          <FaFilePdf className="text-red-500 text-5xl mx-auto mb-2" />
                          <p className="text-sm text-gray-600">{selectedDocuments.citizenshipFront.originalName}</p>
                          <a
                            href={`http://localhost:5000${selectedDocuments.citizenshipFront.url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-3 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition"
                          >
                            View PDF
                          </a>
                        </div>
                      )}
                      <p className="text-xs text-gray-500 mt-2">
                        Uploaded: {new Date(selectedDocuments.citizenshipFront.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  {selectedDocuments.citizenshipBack && (
                    <div className="border rounded-xl p-4 bg-gray-50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {getFileIcon(selectedDocuments.citizenshipBack.mimetype)}
                          <p className="font-medium">Back Side</p>
                        </div>
                        <button
                          onClick={() => openImageViewer(`http://localhost:5000${selectedDocuments.citizenshipBack.url}`)}
                          className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                        >
                          <FaExpand size={12} /> View Full
                        </button>
                      </div>
                      {selectedDocuments.citizenshipBack.mimetype?.startsWith("image/") ? (
                        <div
                          className="mt-2 cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white"
                          onClick={() => openImageViewer(`http://localhost:5000${selectedDocuments.citizenshipBack.url}`)}
                        >
                          <img
                            src={`http://localhost:5000${selectedDocuments.citizenshipBack.url}`}
                            alt="Citizenship Back"
                            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ) : (
                        <div className="mt-2 p-8 bg-white rounded-lg border border-gray-200 text-center">
                          <FaFilePdf className="text-red-500 text-5xl mx-auto mb-2" />
                          <p className="text-sm text-gray-600">{selectedDocuments.citizenshipBack.originalName}</p>
                          <a
                            href={`http://localhost:5000${selectedDocuments.citizenshipBack.url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-3 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition"
                          >
                            View PDF
                          </a>
                        </div>
                      )}
                      <p className="text-xs text-gray-500 mt-2">
                        Uploaded: {new Date(selectedDocuments.citizenshipBack.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Driver's License Documents with Thumbnails */}
              {(selectedDocuments.licenseFront || selectedDocuments.licenseBack) && (
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-lg">
                    <FaIdCard className="text-green-600" />
                    Driver's License
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedDocuments.licenseFront && (
                      <div className="border rounded-xl p-4 bg-gray-50">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {getFileIcon(selectedDocuments.licenseFront.mimetype)}
                            <p className="font-medium">Front Side</p>
                          </div>
                          <button
                            onClick={() => openImageViewer(`http://localhost:5000${selectedDocuments.licenseFront.url}`)}
                            className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                          >
                            <FaExpand size={12} /> View Full
                          </button>
                        </div>
                        {selectedDocuments.licenseFront.mimetype?.startsWith("image/") ? (
                          <div
                            className="mt-2 cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white"
                            onClick={() => openImageViewer(`http://localhost:5000${selectedDocuments.licenseFront.url}`)}
                          >
                            <img
                              src={`http://localhost:5000${selectedDocuments.licenseFront.url}`}
                              alt="License Front"
                              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ) : (
                          <div className="mt-2 p-8 bg-white rounded-lg border border-gray-200 text-center">
                            <FaFilePdf className="text-red-500 text-5xl mx-auto mb-2" />
                            <p className="text-sm text-gray-600">{selectedDocuments.licenseFront.originalName}</p>
                            <a
                              href={`http://localhost:5000${selectedDocuments.licenseFront.url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block mt-3 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition"
                            >
                              View PDF
                            </a>
                          </div>
                        )}
                        <p className="text-xs text-gray-500 mt-2">
                          Uploaded: {new Date(selectedDocuments.licenseFront.uploadedAt).toLocaleDateString()}
                        </p>
                      </div>
                    )}

                    {selectedDocuments.licenseBack && (
                      <div className="border rounded-xl p-4 bg-gray-50">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {getFileIcon(selectedDocuments.licenseBack.mimetype)}
                            <p className="font-medium">Back Side</p>
                          </div>
                          <button
                            onClick={() => openImageViewer(`http://localhost:5000${selectedDocuments.licenseBack.url}`)}
                            className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                          >
                            <FaExpand size={12} /> View Full
                          </button>
                        </div>
                        {selectedDocuments.licenseBack.mimetype?.startsWith("image/") ? (
                          <div
                            className="mt-2 cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white"
                            onClick={() => openImageViewer(`http://localhost:5000${selectedDocuments.licenseBack.url}`)}
                          >
                            <img
                              src={`http://localhost:5000${selectedDocuments.licenseBack.url}`}
                              alt="License Back"
                              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ) : (
                          <div className="mt-2 p-8 bg-white rounded-lg border border-gray-200 text-center">
                            <FaFilePdf className="text-red-500 text-5xl mx-auto mb-2" />
                            <p className="text-sm text-gray-600">{selectedDocuments.licenseBack.originalName}</p>
                            <a
                              href={`http://localhost:5000${selectedDocuments.licenseBack.url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block mt-3 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition"
                            >
                              View PDF
                            </a>
                          </div>
                        )}
                        <p className="text-xs text-gray-500 mt-2">
                          Uploaded: {new Date(selectedDocuments.licenseBack.uploadedAt).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Verification Status */}
              <div className="bg-gradient-to-r from-gray-50 to-white rounded-lg p-4 border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2">Verification Status</h4>
                <p className="text-gray-600">
                  Status:{" "}
                  <span
                    className={`font-medium ${
                      selectedDocuments.verificationStatus === "verified"
                        ? "text-green-600"
                        : selectedDocuments.verificationStatus === "rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {selectedDocuments.verificationStatus?.toUpperCase() || "PENDING"}
                  </span>
                </p>
                {selectedDocuments.verifiedAt && (
                  <p className="text-sm text-gray-500 mt-1">
                    Verified on: {new Date(selectedDocuments.verifiedAt).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Viewer Modal */}
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
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <FaTimesCircle className="text-red-600 text-2xl" />
                <h3 className="text-xl font-bold text-gray-800">Reject Booking</h3>
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

export default AdminBookingApproval;