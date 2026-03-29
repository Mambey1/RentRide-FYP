import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  FaCar,
  FaArrowLeft,
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
} from "react-icons/fa";

const VehicleDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchVehicle();
  }, [id]);

  const fetchVehicle = async () => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/user-vehicles/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.data.success) {
        setVehicle(response.data.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching vehicle:", error);
      setError("Failed to load vehicle details");
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const config = {
      pending: {
        color: "bg-yellow-100 text-yellow-800",
        icon: FaClock,
        label: "Pending Approval",
      },
      approved: {
        color: "bg-green-100 text-green-800",
        icon: FaCheckCircle,
        label: "Approved",
      },
      rejected: {
        color: "bg-red-100 text-red-800",
        icon: FaTimesCircle,
        label: "Rejected",
      },
      active: {
        color: "bg-blue-100 text-blue-800",
        icon: FaCheckCircle,
        label: "Active",
      },
    };
    const statusConfig = config[status] || config.pending;
    const Icon = statusConfig.icon;
    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-1 ${statusConfig.color}`}
      >
        <Icon size={12} />
        {statusConfig.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading vehicle details...</p>
        </div>
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || "Vehicle not found"}</p>
          <button
            onClick={() => navigate("/my-vehicles")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            Back to My Vehicles
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/my-vehicles")}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition mb-4"
          >
            <FaArrowLeft /> Back to My Vehicles
          </button>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg">
                <FaCar className="text-white text-2xl" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Vehicle Details
              </h1>
            </div>
            {getStatusBadge(vehicle.status)}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Images */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative h-96 bg-gray-100">
                {vehicle.vehiclePhotos &&
                vehicle.vehiclePhotos.length > 0 &&
                vehicle.vehiclePhotos[currentImageIndex] ? (
                  <img
                    src={`http://localhost:5000${vehicle.vehiclePhotos[currentImageIndex].url}`}
                    alt={vehicle.vehiclePhotos[currentImageIndex].label}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FaCar className="text-gray-400 text-6xl" />
                  </div>
                )}
                {vehicle.vehiclePhotos && vehicle.vehiclePhotos.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setCurrentImageIndex((prev) =>
                          prev === 0
                            ? vehicle.vehiclePhotos.length - 1
                            : prev - 1,
                        )
                      }
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
                    >
                      ❮
                    </button>
                    <button
                      onClick={() =>
                        setCurrentImageIndex((prev) =>
                          prev === vehicle.vehiclePhotos.length - 1
                            ? 0
                            : prev + 1,
                        )
                      }
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
                    >
                      ❯
                    </button>
                  </>
                )}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {vehicle.vehiclePhotos?.length || 0}
                </div>
              </div>

              {/* Thumbnails */}
              {vehicle.vehiclePhotos && vehicle.vehiclePhotos.length > 1 && (
                <div className="p-4 grid grid-cols-5 gap-2">
                  {vehicle.vehiclePhotos.map((photo, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`rounded-lg overflow-hidden border-2 ${currentImageIndex === index ? "border-blue-500" : "border-gray-200"}`}
                    >
                      <img
                        src={`http://localhost:5000${photo.url}`}
                        alt={photo.label}
                        className="w-full h-16 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Vehicle Info Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {vehicle.carName}
              </h2>
              <p className="text-gray-500 mb-4">{vehicle.carNumber}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <FaRupeeSign className="text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-500">Rate Per Day</p>
                    <p className="font-semibold">रु {vehicle.ratePerDay}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FaChair className="text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-500">Seats</p>
                    <p className="font-semibold">{vehicle.seats}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FaCogs className="text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-500">Gear Type</p>
                    <p className="font-semibold">{vehicle.gearType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FaSnowflake className="text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-500">Air Condition</p>
                    <p className="font-semibold">{vehicle.airCondition}</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-gray-500 mb-2">Booking Type</p>
                <p className="font-medium">{vehicle.bookingType}</p>
              </div>

              {vehicle.description && (
                <div className="border-t pt-4 mt-4">
                  <p className="text-sm text-gray-500 mb-2">Description</p>
                  <p className="text-gray-700">{vehicle.description}</p>
                </div>
              )}

              {vehicle.features && vehicle.features.length > 0 && (
                <div className="border-t pt-4 mt-4">
                  <p className="text-sm text-gray-500 mb-2">Features</p>
                  <div className="flex flex-wrap gap-2">
                    {vehicle.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Owner Info Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaUser className="text-blue-600" />
                Owner Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FaUser className="text-gray-400" />
                  <span className="text-gray-700">{vehicle.fullName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaIdCard className="text-gray-400" />
                  <span className="text-gray-700">
                    {vehicle.citizenshipNumber}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaPhone className="text-gray-400" />
                  <span className="text-gray-700">{vehicle.phoneNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-gray-400" />
                  <span className="text-gray-700">
                    {vehicle.address}, {vehicle.city}, {vehicle.district}
                  </span>
                </div>
              </div>
            </div>

            {/* Documents Card */}
            {vehicle.documents && vehicle.documents.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FaImage className="text-blue-600" />
                  Uploaded Documents
                </h3>
                <div className="space-y-2">
                  {vehicle.documents.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <FaFileAlt className="text-gray-500" />
                        <span className="text-sm capitalize">{doc.type}</span>
                      </div>
                      <a
                        href={`http://localhost:5000${doc.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                      >
                        <FaEye size={12} /> View
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {vehicle.rejectionReason && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-600 font-medium mb-1">
                  Rejection Reason:
                </p>
                <p className="text-red-700 text-sm">
                  {vehicle.rejectionReason}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
