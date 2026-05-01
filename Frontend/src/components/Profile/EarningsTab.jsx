import React from "react";
import {
  FaCar,
  FaPlus,
  FaRupeeSign,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUser,
  FaEye,
  FaEdit,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ListedVehiclesTab = ({
  userVehicles,
  vehiclesLoading,
  getStatusBadge,
  formatDate,
  formatCurrency,
  openImageViewer,
}) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Listed Vehicles</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage and track all vehicles you've listed for rent
          </p>
        </div>
        <button
          onClick={() => navigate("/list-vehicle")}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2.5 px-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <FaPlus /> List New Vehicle
        </button>
      </div>

      {vehiclesLoading ? (
        <div className="text-center py-12">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading vehicles...</p>
        </div>
      ) : userVehicles.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl shadow">
          <FaCar className="text-5xl text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No vehicles listed</p>
          <button
            onClick={() => navigate("/list-vehicle")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            List Your First Vehicle
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {userVehicles.map((vehicle) => (
            <div
              key={vehicle._id}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition"
            >
              <div className="flex gap-4">
                <div className="w-32 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  {vehicle.vehiclePhotos && vehicle.vehiclePhotos[0] ? (
                    <img
                      src={`http://localhost:5000${vehicle.vehiclePhotos[0].url}`}
                      alt={vehicle.carName}
                      className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition"
                      onClick={() =>
                        openImageViewer(
                          `http://localhost:5000${vehicle.vehiclePhotos[0].url}`
                        )
                      }
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FaCar className="text-gray-400 text-3xl" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{vehicle.carName}</h3>
                      <p className="text-sm text-gray-500">{vehicle.carNumber}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {vehicle.carType} &middot; {vehicle.seats} seats &middot;{" "}
                        {vehicle.gearType} &middot;{" "}
                        {vehicle.airCondition === "Yes" ? "AC" : "No AC"}
                      </p>
                    </div>
                    <div className="flex-shrink-0">{getStatusBadge(vehicle.status)}</div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <FaRupeeSign size={10} className="text-blue-500" />
                      <span className="font-semibold text-blue-600">
                        {formatCurrency(vehicle.ratePerDay)}/day
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <FaMapMarkerAlt size={10} className="text-red-400" />
                      <span className="truncate">
                        {vehicle.city}
                        {vehicle.district ? `, ${vehicle.district}` : ""}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <FaCalendarAlt size={10} className="text-gray-400" />
                      <span>
                        {vehicle.listedAt
                          ? `Listed ${formatDate(vehicle.listedAt)}`
                          : `Added ${formatDate(vehicle.createdAt)}`}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <FaUser size={10} className="text-gray-400" />
                      <span>{vehicle.bookingType}</span>
                    </div>
                    {vehicle.vehiclePhotos?.length > 0 && (
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <FaEye size={10} />
                        <span>
                          {vehicle.vehiclePhotos.length} photo
                          {vehicle.vehiclePhotos.length !== 1 ? "s" : ""}
                        </span>
                      </div>
                    )}
                  </div>
                  {vehicle.rejectionReason && (
                    <div className="mb-3 p-2 bg-red-50 border border-red-100 rounded-lg text-xs text-red-600">
                      <span className="font-semibold">Rejection reason:</span>{" "}
                      {vehicle.rejectionReason}
                    </div>
                  )}
                  <div className="flex justify-end gap-3 pt-1">
                    <button
                      onClick={() => navigate(`/vehicle-details/${vehicle._id}`)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 transition"
                    >
                      <FaEye size={12} /> View Details
                    </button>
                    {(vehicle.status === "pending" || vehicle.status === "rejected") && (
                      <button
                        onClick={() => navigate(`/edit-vehicle/${vehicle._id}`)}
                        className="text-yellow-600 hover:text-yellow-700 text-sm font-medium flex items-center gap-1 transition"
                      >
                        <FaEdit size={12} /> Edit
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListedVehiclesTab;