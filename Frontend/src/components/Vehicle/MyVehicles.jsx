import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaCar,
  FaEye,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaArrowLeft,
  FaImage,
} from "react-icons/fa";

const MyVehicles = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/user-vehicles/my-vehicles",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.data.success) {
        setVehicles(response.data.data.vehicles);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      setError("Failed to fetch your vehicles");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this vehicle listing?")
    ) {
      try {
        const token =
          localStorage.getItem("token") || sessionStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/user-vehicles/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Vehicle deleted successfully");
        fetchVehicles();
      } catch (error) {
        console.error("Error deleting vehicle:", error);
        alert(error.response?.data?.message || "Failed to delete vehicle");
      }
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
      inactive: {
        color: "bg-gray-100 text-gray-800",
        icon: FaTimesCircle,
        label: "Inactive",
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
          <p className="text-gray-600">Loading your vehicles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition mb-4"
          >
            <FaArrowLeft /> Back
          </button>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg">
                <FaCar className="text-white text-2xl" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                My Vehicles
              </h1>
            </div>
            <button
              onClick={() => navigate("/list-vehicle")}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            >
              <FaCar />
              List New Vehicle
            </button>
          </div>
          <p className="text-gray-500 mt-2">Manage your listed vehicles</p>
        </div>

        {vehicles.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <FaCar className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Vehicles Listed
            </h3>
            <p className="text-gray-500 mb-6">
              You haven't listed any vehicles yet.
            </p>
            <button
              onClick={() => navigate("/list-vehicle")}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              List Your First Vehicle
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
              >
                {/* Vehicle Image */}
                <div className="h-48 bg-gray-200 relative">
                  {vehicle.vehiclePhotos && vehicle.vehiclePhotos[0] ? (
                    <img
                      src={`http://localhost:5000${vehicle.vehiclePhotos[0].url}`}
                      alt={vehicle.carName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FaCar className="text-gray-400 text-5xl" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    {getStatusBadge(vehicle.status)}
                  </div>
                </div>

                {/* Vehicle Info */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {vehicle.carName}
                  </h3>
                  <p className="text-gray-500 text-sm mb-2">
                    {vehicle.carNumber}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-blue-600 font-bold">
                      रु {vehicle.ratePerDay}/day
                    </span>
                    <span className="text-gray-500 text-sm">
                      {vehicle.seats} seats • {vehicle.gearType}
                    </span>
                  </div>

                  {/* Vehicle Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <FaImage /> {vehicle.vehiclePhotos?.length || 0} photos
                    </span>
                    <span className="flex items-center gap-1">
                      <FaCheckCircle /> {vehicle.documents?.length || 0}{" "}
                      documents
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t">
                    <button
                      onClick={() =>
                        navigate(`/vehicle-details/${vehicle._id}`)
                      }
                      className="flex-1 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition flex items-center justify-center gap-2"
                    >
                      <FaEye /> View
                    </button>
                    {vehicle.status === "pending" ||
                    vehicle.status === "rejected" ? (
                      <button
                        onClick={() => navigate(`/edit-vehicle/${vehicle._id}`)}
                        className="flex-1 py-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition flex items-center justify-center gap-2"
                      >
                        <FaEdit /> Edit
                      </button>
                    ) : null}
                    {(vehicle.status === "pending" ||
                      vehicle.status === "rejected") && (
                      <button
                        onClick={() => handleDelete(vehicle._id)}
                        className="py-2 px-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>

                  {vehicle.rejectionReason && (
                    <div className="mt-3 p-2 bg-red-50 rounded-lg text-xs text-red-600">
                      Reason: {vehicle.rejectionReason}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyVehicles;
