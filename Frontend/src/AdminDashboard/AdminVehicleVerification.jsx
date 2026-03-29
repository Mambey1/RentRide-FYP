

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaCar,
  FaUser,
  FaPhone,
  FaIdCard,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaChair,
  FaCogs,
  FaSnowflake,
  FaImage,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaEye,
  FaFileAlt,
  FaSearch,
  FaFilter,
  FaInfoCircle,
  FaArrowLeft,
  FaTimes,
  FaExpand,
  FaShieldAlt,
  FaFileInvoice,
  FaLeaf,
  FaIdCard as FaCitizenship,
  FaUserCircle,
  FaEdit,
  FaTrash,
  FaBan,
  FaPlay,
  FaStop,
} from "react-icons/fa";

const AdminVehicleVerification = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
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
    active: 0,
    inactive: 0,
  });

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/user-vehicles/admin/all",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.data.success) {
        setVehicles(response.data.data.vehicles);
        setFilteredVehicles(response.data.data.vehicles);
        calculateStats(response.data.data.vehicles);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      setLoading(false);
    }
  };

  const calculateStats = (vehiclesData) => {
    const statsData = {
      total: vehiclesData.length,
      pending: vehiclesData.filter((v) => v.status === "pending").length,
      approved: vehiclesData.filter((v) => v.status === "approved").length,
      rejected: vehiclesData.filter((v) => v.status === "rejected").length,
      active: vehiclesData.filter((v) => v.status === "active").length,
      inactive: vehiclesData.filter((v) => v.status === "inactive").length,
    };
    setStats(statsData);
  };

  const handleApprove = async (vehicleId) => {
    if (
      window.confirm("Are you sure you want to approve this vehicle listing?")
    ) {
      try {
        const token =
          localStorage.getItem("token") || sessionStorage.getItem("token");
        await axios.post(
          `http://localhost:5000/api/user-vehicles/admin/${vehicleId}/approve`,
          {},
          { headers: { Authorization: `Bearer ${token}` } },
        );
        alert("Vehicle approved successfully!");
        fetchVehicles();
        setShowDetailsModal(false);
      } catch (error) {
        console.error("Error approving vehicle:", error);
        alert(error.response?.data?.message || "Failed to approve vehicle");
      }
    }
  };

  const handleReject = async (vehicleId) => {
    if (!rejectionReason.trim()) {
      alert("Please provide a reason for rejection");
      return;
    }

    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/user-vehicles/admin/${vehicleId}/reject`,
        { reason: rejectionReason },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      alert("Vehicle rejected successfully!");
      fetchVehicles();
      setShowRejectModal(false);
      setRejectionReason("");
      setShowDetailsModal(false);
    } catch (error) {
      console.error("Error rejecting vehicle:", error);
      alert(error.response?.data?.message || "Failed to reject vehicle");
    }
  };

  const handleActivate = async (vehicleId) => {
    if (
      window.confirm("Are you sure you want to activate this vehicle listing?")
    ) {
      try {
        const token =
          localStorage.getItem("token") || sessionStorage.getItem("token");
        await axios.put(
          `http://localhost:5000/api/user-vehicles/admin/${vehicleId}/activate`,
          {},
          { headers: { Authorization: `Bearer ${token}` } },
        );
        alert("Vehicle activated successfully!");
        fetchVehicles();
        setShowDetailsModal(false);
      } catch (error) {
        console.error("Error activating vehicle:", error);
        alert(error.response?.data?.message || "Failed to activate vehicle");
      }
    }
  };

  const handleDeactivate = async (vehicleId) => {
    if (
      window.confirm(
        "Are you sure you want to deactivate this vehicle listing? It will not be available for booking.",
      )
    ) {
      try {
        const token =
          localStorage.getItem("token") || sessionStorage.getItem("token");
        await axios.put(
          `http://localhost:5000/api/user-vehicles/admin/${vehicleId}/deactivate`,
          {},
          { headers: { Authorization: `Bearer ${token}` } },
        );
        alert("Vehicle deactivated successfully!");
        fetchVehicles();
        setShowDetailsModal(false);
      } catch (error) {
        console.error("Error deactivating vehicle:", error);
        alert(error.response?.data?.message || "Failed to deactivate vehicle");
      }
    }
  };

  const handleDelete = async (vehicleId) => {
    if (
      window.confirm(
        "Are you sure you want to permanently delete this vehicle listing? This action cannot be undone.",
      )
    ) {
      try {
        const token =
          localStorage.getItem("token") || sessionStorage.getItem("token");
        await axios.delete(
          `http://localhost:5000/api/user-vehicles/admin/${vehicleId}/delete`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        alert("Vehicle deleted successfully!");
        fetchVehicles();
        setShowDetailsModal(false);
      } catch (error) {
        console.error("Error deleting vehicle:", error);
        alert(error.response?.data?.message || "Failed to delete vehicle");
      }
    }
  };

  const handleViewDetails = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowDetailsModal(true);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    if (status === "all") {
      setFilteredVehicles(vehicles);
    } else {
      setFilteredVehicles(
        vehicles.filter((vehicle) => vehicle.status === status),
      );
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    let filtered = vehicles;
    if (filterStatus !== "all") {
      filtered = filtered.filter((v) => v.status === filterStatus);
    }

    const searched = filtered.filter(
      (vehicle) =>
        vehicle.carName?.toLowerCase().includes(term) ||
        vehicle.carNumber?.toLowerCase().includes(term) ||
        vehicle.fullName?.toLowerCase().includes(term) ||
        vehicle.citizenshipNumber?.toLowerCase().includes(term),
    );

    setFilteredVehicles(searched);
  };

  const getStatusBadge = (status) => {
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

  const openImageViewer = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowImageViewer(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading vehicle listings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Vehicle Verification Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Review and verify user-submitted vehicle listings
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-500 text-sm">Total Listings</p>
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
        <div className="bg-green-50 rounded-lg shadow p-4 border-l-4 border-green-500">
          <p className="text-green-600 text-sm">Active</p>
          <p className="text-2xl font-bold text-green-700">{stats.active}</p>
        </div>
        <div className="bg-gray-50 rounded-lg shadow p-4 border-l-4 border-gray-500">
          <p className="text-gray-600 text-sm">Inactive</p>
          <p className="text-2xl font-bold text-gray-700">{stats.inactive}</p>
        </div>
        <div className="bg-red-50 rounded-lg shadow p-4 border-l-4 border-red-500">
          <p className="text-red-600 text-sm">Rejected</p>
          <p className="text-2xl font-bold text-red-700">{stats.rejected}</p>
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
              onClick={() => handleFilterChange("active")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filterStatus === "active"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => handleFilterChange("inactive")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filterStatus === "inactive"
                  ? "bg-gray-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Inactive
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

      {/* Vehicles Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Car Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rate/Day
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {vehicle.vehiclePhotos && vehicle.vehiclePhotos[0] ? (
                        <img
                          src={`http://localhost:5000${vehicle.vehiclePhotos[0].url}`}
                          alt={vehicle.carName}
                          className="w-12 h-12 object-cover rounded-lg"
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
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {vehicle.fullName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {vehicle.phoneNumber}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {vehicle.carNumber}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    रु {vehicle.ratePerDay}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(vehicle.status)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(vehicle.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewDetails(vehicle)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      {vehicle.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(vehicle._id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                            title="Approve"
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
                          >
                            <FaTimesCircle />
                          </button>
                        </>
                      )}
                      {(vehicle.status === "approved" ||
                        vehicle.status === "active" ||
                        vehicle.status === "inactive") && (
                        <>
                          {vehicle.status !== "active" && (
                            <button
                              onClick={() => handleActivate(vehicle._id)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                              title="Activate"
                            >
                              <FaPlay />
                            </button>
                          )}
                          {vehicle.status !== "inactive" &&
                            vehicle.status !== "rejected" && (
                              <button
                                onClick={() => handleDeactivate(vehicle._id)}
                                className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition"
                                title="Deactivate"
                              >
                                <FaStop />
                              </button>
                            )}
                          <button
                            onClick={() => handleDelete(vehicle._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Delete"
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

        {filteredVehicles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No vehicle listings found</p>
          </div>
        )}
      </div>

      {/* Vehicle Details Modal */}
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
              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Vehicle Photos */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Vehicle Photos
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedVehicle.vehiclePhotos?.map((photo, index) => (
                      <div key={index} className="relative">
                        <img
                          src={`http://localhost:5000${photo.url}`}
                          alt={photo.label}
                          className="w-full h-40 object-cover rounded-lg cursor-pointer"
                          onClick={() =>
                            openImageViewer(`http://localhost:5000${photo.url}`)
                          }
                        />
                        <p className="text-xs text-gray-500 mt-1 text-center">
                          {photo.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column - Vehicle Details */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Vehicle Information
                  </h4>
                  <div className="space-y-3 bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Car Name</p>
                        <p className="font-medium">{selectedVehicle.carName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Car Number</p>
                        <p className="font-medium">
                          {selectedVehicle.carNumber}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Car Type</p>
                        <p className="font-medium">{selectedVehicle.carType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Rate Per Day</p>
                        <p className="font-medium text-blue-600">
                          रु {selectedVehicle.ratePerDay}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Seats</p>
                        <p className="font-medium">{selectedVehicle.seats}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Gear Type</p>
                        <p className="font-medium">
                          {selectedVehicle.gearType}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Air Condition</p>
                        <p className="font-medium">
                          {selectedVehicle.airCondition}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Booking Type</p>
                        <p className="font-medium">
                          {selectedVehicle.bookingType}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Status</p>
                      {getStatusBadge(selectedVehicle.status)}
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
                          {selectedVehicle.features.map((feature, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Owner Information */}
              <div className="mt-6">
                <h4 className="font-semibold text-gray-800 mb-3">
                  Owner Information
                </h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium">{selectedVehicle.fullName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        Citizenship Number
                      </p>
                      <p className="font-medium">
                        {selectedVehicle.citizenshipNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone Number</p>
                      <p className="font-medium">
                        {selectedVehicle.phoneNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium">
                        {selectedVehicle.address}, {selectedVehicle.city},{" "}
                        {selectedVehicle.district}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div className="mt-6">
                <h4 className="font-semibold text-gray-800 mb-3">
                  Uploaded Documents
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Citizenship Front */}
                  {selectedVehicle.citizenshipFront && (
                    <div className="border rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <FaCitizenship className="text-blue-500" />
                        <p className="font-medium">Citizenship (Front)</p>
                      </div>
                      <img
                        src={`http://localhost:5000${selectedVehicle.citizenshipFront.url}`}
                        alt="Citizenship Front"
                        className="w-full h-32 object-cover rounded cursor-pointer"
                        onClick={() =>
                          openImageViewer(
                            `http://localhost:5000${selectedVehicle.citizenshipFront.url}`,
                          )
                        }
                      />
                    </div>
                  )}
                  {/* Citizenship Back */}
                  {selectedVehicle.citizenshipBack && (
                    <div className="border rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <FaCitizenship className="text-blue-500" />
                        <p className="font-medium">Citizenship (Back)</p>
                      </div>
                      <img
                        src={`http://localhost:5000${selectedVehicle.citizenshipBack.url}`}
                        alt="Citizenship Back"
                        className="w-full h-32 object-cover rounded cursor-pointer"
                        onClick={() =>
                          openImageViewer(
                            `http://localhost:5000${selectedVehicle.citizenshipBack.url}`,
                          )
                        }
                      />
                    </div>
                  )}
                  {/* Passport Photo */}
                  {selectedVehicle.passportPhoto && (
                    <div className="border rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <FaUserCircle className="text-green-500" />
                        <p className="font-medium">Passport Photo</p>
                      </div>
                      <img
                        src={`http://localhost:5000${selectedVehicle.passportPhoto.url}`}
                        alt="Passport Photo"
                        className="w-full h-32 object-cover rounded cursor-pointer"
                        onClick={() =>
                          openImageViewer(
                            `http://localhost:5000${selectedVehicle.passportPhoto.url}`,
                          )
                        }
                      />
                    </div>
                  )}
                </div>

                {/* Vehicle Documents */}
                <h4 className="font-semibold text-gray-800 mb-3 mt-4">
                  Vehicle Documents
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedVehicle.documents?.map((doc, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        {doc.type === "bluebook" ? (
                          <FaFileInvoice className="text-purple-500" />
                        ) : doc.type === "insurance" ? (
                          <FaShieldAlt className="text-green-500" />
                        ) : (
                          <FaLeaf className="text-teal-500" />
                        )}
                        <p className="font-medium capitalize">
                          {doc.label || doc.type}
                        </p>
                      </div>
                      <img
                        src={`http://localhost:5000${doc.url}`}
                        alt={doc.type}
                        className="w-full h-32 object-cover rounded cursor-pointer"
                        onClick={() =>
                          openImageViewer(`http://localhost:5000${doc.url}`)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end gap-3">
                {selectedVehicle.status === "pending" && (
                  <>
                    <button
                      onClick={() => {
                        setShowDetailsModal(false);
                        setShowRejectModal(true);
                      }}
                      className="px-6 py-2 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition font-medium"
                    >
                      Reject Listing
                    </button>
                    <button
                      onClick={() => handleApprove(selectedVehicle._id)}
                      className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium"
                    >
                      Approve Listing
                    </button>
                  </>
                )}
                {(selectedVehicle.status === "approved" ||
                  selectedVehicle.status === "active" ||
                  selectedVehicle.status === "inactive") && (
                  <>
                    {selectedVehicle.status !== "active" && (
                      <button
                        onClick={() => handleActivate(selectedVehicle._id)}
                        className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium"
                      >
                        Activate Listing
                      </button>
                    )}
                    {selectedVehicle.status !== "inactive" &&
                      selectedVehicle.status !== "rejected" && (
                        <button
                          onClick={() => handleDeactivate(selectedVehicle._id)}
                          className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition font-medium"
                        >
                          Deactivate Listing
                        </button>
                      )}
                    <button
                      onClick={() => handleDelete(selectedVehicle._id)}
                      className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium"
                    >
                      Delete Permanently
                    </button>
                  </>
                )}
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

      {/* Reject Modal */}
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
                Are you sure you want to reject the listing for{" "}
                <strong>{selectedVehicle.carName}</strong>?
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
                  placeholder="Please provide a reason for rejecting this listing..."
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
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium"
                >
                  Reject Listing
                </button>
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
