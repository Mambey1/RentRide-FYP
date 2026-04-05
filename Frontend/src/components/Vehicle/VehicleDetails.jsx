import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCar,
  FaArrowLeft,
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaChair,
  FaCogs,
  FaSnowflake,
  FaInfoCircle,
  FaSpinner,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaIdCard,
  FaImage,
  FaHeart,
  FaShare,
  FaStar,
  FaShieldAlt,
  FaGasPump,
  FaRoad,
  FaCalendarCheck,
  FaFileAlt,
  FaFilePdf,
  FaFileImage,
  FaDownload,
  FaEye,
  FaExpand,
  FaTimes,
  FaUserCircle,
  FaEnvelope,
} from "react-icons/fa";

const VehicleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [ownerProfile, setOwnerProfile] = useState(null);

  useEffect(() => {
    fetchVehicleDetails();
  }, [id]);

  const fetchVehicleDetails = async () => {
    try {
      setLoading(true);
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:5000/api/user-vehicles/${id}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        },
      );

      if (response.data.success) {
        const vehicleData = response.data.data;
        setVehicle(vehicleData);

        // Fetch owner profile if user ID is available
        if (vehicleData.user) {
          fetchOwnerProfile(vehicleData.user);
        }
      } else {
        setError("Vehicle not found");
      }
    } catch (error) {
      console.error("Error fetching vehicle:", error);
      setError("Failed to load vehicle details");
    } finally {
      setLoading(false);
    }
  };

  const fetchOwnerProfile = async (userId) => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/profile/user/${userId}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        },
      );
      if (response.data.success) {
        setOwnerProfile(response.data.user);
      }
    } catch (error) {
      console.error("Error fetching owner profile:", error);
    }
  };

  const formatCurrency = (amount) => {
    return `रु ${amount?.toLocaleString("en-NP") || 0}`;
  };

  const getStatusConfig = (status) => {
    const config = {
      active: {
        color: "bg-green-500",
        label: "Available",
        icon: FaCheckCircle,
      },
      booked: {
        color: "bg-orange-500",
        label: "Currently Booked",
        icon: FaClock,
      },
      pending: {
        color: "bg-yellow-500",
        label: "Pending Approval",
        icon: FaClock,
      },
      approved: {
        color: "bg-blue-500",
        label: "Approved",
        icon: FaCheckCircle,
      },
      rejected: { color: "bg-red-500", label: "Rejected", icon: FaTimesCircle },
    };
    return config[status] || config.pending;
  };

  const getDocumentIcon = (url) => {
    if (url?.toLowerCase().includes(".pdf")) {
      return <FaFilePdf className="text-red-500 text-3xl" />;
    } else if (
      url?.toLowerCase().includes(".jpg") ||
      url?.toLowerCase().includes(".png") ||
      url?.toLowerCase().includes(".jpeg")
    ) {
      return <FaFileImage className="text-blue-500 text-3xl" />;
    }
    return <FaFileAlt className="text-gray-500 text-3xl" />;
  };

  const openDocumentViewer = (doc) => {
    setSelectedDocument(doc);
    setShowDocumentModal(true);
  };

  const getProfileImageUrl = () => {
    if (ownerProfile?.profilePhoto) {
      return `http://localhost:5000/uploads/profiles/${ownerProfile.profilePhoto}`;
    }
    return null;
  };

  const nextImage = () => {
    if (vehicle?.vehiclePhotos?.length) {
      setCurrentImageIndex((prev) => (prev + 1) % vehicle.vehiclePhotos.length);
    }
  };

  const prevImage = () => {
    if (vehicle?.vehiclePhotos?.length) {
      setCurrentImageIndex(
        (prev) =>
          (prev - 1 + vehicle.vehiclePhotos.length) %
          vehicle.vehiclePhotos.length,
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="text-center"
        >
          <FaSpinner className="text-5xl text-white mb-4" />
          <p className="text-white text-lg">Loading vehicle details...</p>
        </motion.div>
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md"
        >
          <FaTimesCircle className="text-red-400 text-6xl mx-auto mb-4" />
          <p className="text-white text-lg mb-6">
            {error || "Vehicle not found"}
          </p>
          <button
            onClick={() => navigate("/profiledetails")}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
          >
            Go Back
          </button>
        </motion.div>
      </div>
    );
  }

  const statusConfig = getStatusConfig(vehicle.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section with Image */}
      <div className="relative h-[50vh] md:h-[60vh] bg-gradient-to-r from-gray-900 to-gray-800 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            src={
              vehicle.vehiclePhotos?.[currentImageIndex]
                ? `http://localhost:5000${vehicle.vehiclePhotos[currentImageIndex].url}`
                : "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3"
            }
            alt={vehicle.carName}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        {vehicle.vehiclePhotos?.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300"
            >
              ❮
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300"
            >
              ❯
            </button>
          </>
        )}

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
          {currentImageIndex + 1} / {vehicle.vehiclePhotos?.length || 1}
        </div>

        {vehicle.vehiclePhotos?.length > 1 && (
          <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-2 overflow-x-auto pb-2">
            {vehicle.vehiclePhotos.map((photo, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                  currentImageIndex === idx
                    ? "border-white scale-110"
                    : "border-white/50"
                }`}
              >
                <img
                  src={`http://localhost:5000${photo.url}`}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300"
        >
          <FaArrowLeft />
        </button>

        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300"
          >
            <FaHeart
              className={isWishlisted ? "text-red-500 fill-red-500" : ""}
            />
          </button>
          <button className="bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300">
            <FaShare />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        {/* Vehicle Title & Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                {vehicle.carName}
              </h1>
              <p className="text-gray-500 text-lg">{vehicle.carNumber}</p>
              <div className="flex items-center gap-2 mt-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-sm" />
                  ))}
                  <span className="text-gray-600 ml-2">5.0 (24 reviews)</span>
                </div>
              </div>
            </div>
            <div
              className={`${statusConfig.color} text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg`}
            >
              <StatusIcon />
              <span className="font-semibold">{statusConfig.label}</span>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Key Specifications Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaCar className="text-blue-600" />
                Key Specifications
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <FaRupeeSign className="text-green-600 text-xl" />
                  <div>
                    <p className="text-xs text-gray-500">Rate Per Day</p>
                    <p className="font-bold text-gray-900">
                      {formatCurrency(vehicle.ratePerDay)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <FaChair className="text-blue-600 text-xl" />
                  <div>
                    <p className="text-xs text-gray-500">Seats</p>
                    <p className="font-bold text-gray-900">
                      {vehicle.seats} Persons
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <FaCogs className="text-purple-600 text-xl" />
                  <div>
                    <p className="text-xs text-gray-500">Transmission</p>
                    <p className="font-bold text-gray-900">
                      {vehicle.gearType}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <FaSnowflake className="text-cyan-600 text-xl" />
                  <div>
                    <p className="text-xs text-gray-500">Air Condition</p>
                    <p className="font-bold text-gray-900">
                      {vehicle.airCondition}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <FaGasPump className="text-orange-600 text-xl" />
                  <div>
                    <p className="text-xs text-gray-500">Fuel Type</p>
                    <p className="font-bold text-gray-900">Petrol</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <FaRoad className="text-indigo-600 text-xl" />
                  <div>
                    <p className="text-xs text-gray-500">Booking Type</p>
                    <p className="font-bold text-gray-900">
                      {vehicle.bookingType}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Features Card */}
            {vehicle.features && vehicle.features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaShieldAlt className="text-purple-600" />
                  Features & Amenities
                </h2>
                <div className="flex flex-wrap gap-3">
                  {vehicle.features.map((feature, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-sm font-medium"
                    >
                      {feature}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Description Card */}
            {vehicle.description && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaInfoCircle className="text-blue-600" />
                  Description
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {vehicle.description}
                </p>
              </motion.div>
            )}

            {/* Documents Card */}
            {(vehicle.documents?.length > 0 ||
              vehicle.citizenshipFront ||
              vehicle.citizenshipBack ||
              vehicle.passportPhoto) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaFileAlt className="text-blue-600" />
                  Uploaded Documents
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Citizenship Documents */}
                  {(vehicle.citizenshipFront || vehicle.citizenshipBack) && (
                    <div className="border rounded-xl p-4 bg-gray-50">
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <FaIdCard className="text-blue-600" />
                        Citizenship Certificate
                      </h3>
                      <div className="space-y-2">
                        {vehicle.citizenshipFront && (
                          <button
                            onClick={() =>
                              openDocumentViewer(vehicle.citizenshipFront)
                            }
                            className="w-full flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-md transition-all"
                          >
                            <div className="flex items-center gap-3">
                              {getDocumentIcon(vehicle.citizenshipFront.url)}
                              <div className="text-left">
                                <p className="font-medium text-gray-800">
                                  Front Side
                                </p>
                                <p className="text-xs text-gray-500">
                                  {new Date(
                                    vehicle.citizenshipFront.uploadedAt,
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <FaEye className="text-blue-600" />
                          </button>
                        )}
                        {vehicle.citizenshipBack && (
                          <button
                            onClick={() =>
                              openDocumentViewer(vehicle.citizenshipBack)
                            }
                            className="w-full flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-md transition-all"
                          >
                            <div className="flex items-center gap-3">
                              {getDocumentIcon(vehicle.citizenshipBack.url)}
                              <div className="text-left">
                                <p className="font-medium text-gray-800">
                                  Back Side
                                </p>
                                <p className="text-xs text-gray-500">
                                  {new Date(
                                    vehicle.citizenshipBack.uploadedAt,
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <FaEye className="text-blue-600" />
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Passport Photo */}
                  {vehicle.passportPhoto && (
                    <div className="border rounded-xl p-4 bg-gray-50">
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <FaUserCircle className="text-green-600" />
                        Passport Photo
                      </h3>
                      <button
                        onClick={() =>
                          openDocumentViewer(vehicle.passportPhoto)
                        }
                        className="w-full flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-md transition-all"
                      >
                        <div className="flex items-center gap-3">
                          {getDocumentIcon(vehicle.passportPhoto.url)}
                          <div className="text-left">
                            <p className="font-medium text-gray-800">
                              Passport Photo
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(
                                vehicle.passportPhoto.uploadedAt,
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <FaEye className="text-blue-600" />
                      </button>
                    </div>
                  )}

                  {/* Vehicle Documents */}
                  {vehicle.documents?.map((doc, idx) => (
                    <div key={idx} className="border rounded-xl p-4 bg-gray-50">
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2 capitalize">
                        {getDocumentIcon(doc.url)}
                        {doc.label || doc.type}
                      </h3>
                      <button
                        onClick={() => openDocumentViewer(doc)}
                        className="w-full flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-md transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-left">
                            <p className="font-medium text-gray-800">
                              {doc.label || doc.type}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(doc.uploadedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <FaEye className="text-blue-600" />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Owner Info */}
          <div className="space-y-6">
            {/* Owner Information Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-6 sticky top-24"
            >
              <div className="text-center mb-6">
                {getProfileImageUrl() ? (
                  <img
                    src={getProfileImageUrl()}
                    alt={vehicle.fullName}
                    className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-3 shadow-lg">
                    <FaUser className="text-white text-4xl" />
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-800">
                  {vehicle.fullName}
                </h3>
                <p className="text-gray-500 text-sm">Vehicle Owner</p>
                {ownerProfile?.email && (
                  <p className="text-xs text-gray-400 mt-1 flex items-center justify-center gap-1">
                    <FaEnvelope className="text-xs" /> {ownerProfile.email}
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <FaPhone className="text-green-600" />
                  <div>
                    <p className="text-xs text-gray-500">Phone Number</p>
                    <p className="font-medium text-gray-900">
                      {vehicle.phoneNumber}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <FaIdCard className="text-purple-600" />
                  <div>
                    <p className="text-xs text-gray-500">Citizenship Number</p>
                    <p className="font-medium text-gray-900">
                      {vehicle.citizenshipNumber}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <FaMapMarkerAlt className="text-red-600" />
                  <div>
                    <p className="text-xs text-gray-500">Address</p>
                    <p className="font-medium text-gray-900">
                      {vehicle.address}, {vehicle.city}, {vehicle.district}
                    </p>
                  </div>
                </div>
              </div>

              {vehicle.status === "pending" && (
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <div className="flex items-center gap-2 text-yellow-800">
                    <FaClock />
                    <span className="text-sm font-medium">
                      Pending Approval
                    </span>
                  </div>
                  <p className="text-xs text-yellow-700 mt-1">
                    Your vehicle is awaiting admin approval. This process
                    usually takes 24-48 hours.
                  </p>
                </div>
              )}

              {vehicle.status === "booked" && (
                <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-xl">
                  <div className="flex items-center gap-2 text-orange-800">
                    <FaCalendarCheck />
                    <span className="text-sm font-medium">
                      Currently Booked
                    </span>
                  </div>
                  <p className="text-xs text-orange-700 mt-1">
                    This vehicle is currently rented out. It will be available
                    again when the booking period ends.
                  </p>
                </div>
              )}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <button
                onClick={() => navigate(`/booking/${vehicle._id}`)}
                disabled={vehicle.status !== "active"}
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                  vehicle.status === "active"
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg hover:scale-105"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {vehicle.status === "active"
                  ? "Book This Vehicle"
                  : "Not Available for Booking"}
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Document Viewer Modal */}
      {showDocumentModal && selectedDocument && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90">
          <div className="relative max-w-5xl w-full max-h-[90vh]">
            <button
              onClick={() => setShowDocumentModal(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition"
            >
              <FaTimes size={32} />
            </button>

            {selectedDocument.url?.toLowerCase().includes(".pdf") ? (
              <iframe
                src={`http://localhost:5000${selectedDocument.url}`}
                className="w-full h-[80vh] rounded-lg bg-white"
                title="Document Viewer"
              />
            ) : (
              <img
                src={`http://localhost:5000${selectedDocument.url}`}
                alt="Document"
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
              />
            )}

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg text-sm">
              {selectedDocument.label || selectedDocument.type || "Document"} •
              Click outside or press ESC to close
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleDetails;
