import React, { useState } from "react";
import {
  FaTimes,
  FaCheck,
  FaCar,
  FaMotorcycle,
  FaExchangeAlt,
} from "react-icons/fa";

const VehicleComparison = ({ vehicles, onClose, type = "car" }) => {
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const maxSelection = 2; // Changed to 2 for better comparison

  const toggleVehicle = (vehicle) => {
    if (selectedVehicles.find((v) => v._id === vehicle._id)) {
      setSelectedVehicles(
        selectedVehicles.filter((v) => v._id !== vehicle._id),
      );
    } else if (selectedVehicles.length < maxSelection) {
      setSelectedVehicles([...selectedVehicles, vehicle]);
    }
  };

  const getVehicleImage = (vehicle) => {
    if (type === "bike") {
      return vehicle.photos?.[0]
        ? `http://localhost:5000/uploads/bikes/${vehicle.photos[0].filename}`
        : null;
    }

    // For cars, check different photo structures
    if (vehicle.photos && vehicle.photos.length > 0) {
      const photoUrl = vehicle.photos[0].url || vehicle.photos[0].filename;
      const source = vehicle.source === "user" ? "user-vehicles" : "vehicles";
      return `http://localhost:5000/uploads/${source}/${photoUrl}`;
    }

    if (vehicle.vehiclePhotos && vehicle.vehiclePhotos.length > 0) {
      return `http://localhost:5000${vehicle.vehiclePhotos[0].url}`;
    }

    return null;
  };

  const comparisonFeatures =
    type === "bike"
      ? [
          {
            key: "ratePerDay",
            label: "Daily Rate",
            format: (v) => `रु ${v?.toLocaleString()}`,
          },
          { key: "bikeType", label: "Type" },
          { key: "engineCapacity", label: "Engine" },
          { key: "fuelType", label: "Fuel Type" },
          { key: "transmission", label: "Transmission" },
          { key: "mileage", label: "Mileage" },
          { key: "year", label: "Year" },
          {
            key: "helmetIncluded",
            label: "Helmet Included",
            format: (v) => (v ? "✓ Yes" : "✗ No"),
          },
          {
            key: "securityDeposit",
            label: "Security Deposit",
            format: (v) => (v ? `रु ${v?.toLocaleString()}` : "रु 0"),
          },
        ]
      : [
          {
            key: "ratePerDay",
            label: "Daily Rate",
            format: (v) => `रु ${v?.toLocaleString()}`,
          },
          { key: "carType", label: "Type" },
          {
            key: "seats",
            label: "Seats",
            format: (v) => (v ? `${v} Persons` : "—"),
          },
          { key: "gearType", label: "Transmission" },
          {
            key: "airCondition",
            label: "AC",
            format: (v) => (v === "Yes" ? "✓ Yes" : "✗ No"),
          },
          { key: "bookingType", label: "Booking Type" },
          { key: "fuelType", label: "Fuel Type" },
          { key: "year", label: "Year" },
        ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <FaExchangeAlt />
              Compare {type === "bike" ? "Bikes" : "Vehicles"}
            </h2>
            <p className="text-blue-100 text-sm mt-1">
              Select {maxSelection} {type === "bike" ? "bikes" : "vehicles"} to
              compare side by side
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition"
          >
            <FaTimes />
          </button>
        </div>

        <div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Vehicle Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Select {type === "bike" ? "Bikes" : "Vehicles"} to Compare (
              {selectedVehicles.length}/{maxSelection})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {vehicles.map((vehicle) => {
                const isSelected = selectedVehicles.find(
                  (v) => v._id === vehicle._id,
                );
                const image = getVehicleImage(vehicle);
                const name = vehicle.bikeName || vehicle.carName;

                return (
                  <button
                    key={vehicle._id}
                    onClick={() => toggleVehicle(vehicle)}
                    disabled={
                      !isSelected && selectedVehicles.length >= maxSelection
                    }
                    className={`relative p-3 rounded-xl border-2 transition-all ${
                      isSelected
                        ? "border-blue-500 bg-blue-50 shadow-lg scale-105"
                        : selectedVehicles.length >= maxSelection
                          ? "border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed"
                          : "border-gray-200 hover:border-blue-300 bg-white hover:shadow-md"
                    }`}
                  >
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-2">
                      {image ? (
                        <img
                          src={image}
                          alt={name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          {type === "bike" ? (
                            <FaMotorcycle className="text-gray-300 text-2xl" />
                          ) : (
                            <FaCar className="text-gray-300 text-2xl" />
                          )}
                        </div>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-gray-900 truncate">
                      {name}
                    </p>
                    <p className="text-xs text-blue-600 font-bold mt-1">
                      रु {vehicle.ratePerDay?.toLocaleString()}
                    </p>
                    {isSelected && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                        <FaCheck className="text-white text-xs" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Comparison Table */}
          {selectedVehicles.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-blue-50">
                    <th className="p-4 text-left font-bold text-gray-900 border-b-2 border-gray-200 sticky left-0 bg-gray-50 min-w-[150px]">
                      Feature
                    </th>
                    {selectedVehicles.map((vehicle) => (
                      <th
                        key={vehicle._id}
                        className="p-4 border-b-2 border-gray-200 min-w-[250px]"
                      >
                        <div className="text-center">
                          <div className="w-40 h-24 bg-gray-100 rounded-lg overflow-hidden mx-auto mb-3">
                            {(() => {
                              const img = getVehicleImage(vehicle);
                              return img ? (
                                <img
                                  src={img}
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  {type === "bike" ? (
                                    <FaMotorcycle className="text-gray-300 text-3xl" />
                                  ) : (
                                    <FaCar className="text-gray-300 text-3xl" />
                                  )}
                                </div>
                              );
                            })()}
                          </div>
                          <p className="text-sm font-bold text-gray-900">
                            {vehicle.bikeName || vehicle.carName}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {vehicle.bikeType || vehicle.carType}
                          </p>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature, index) => (
                    <tr
                      key={feature.key}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="p-4 font-semibold text-gray-700 border-b border-gray-200 sticky left-0 bg-inherit">
                        {feature.label}
                      </td>
                      {selectedVehicles.map((vehicle) => {
                        const value = vehicle[feature.key];
                        const displayValue = feature.format
                          ? feature.format(value)
                          : value || "—";

                        return (
                          <td
                            key={vehicle._id}
                            className="p-4 text-center border-b border-gray-200"
                          >
                            <span className="text-gray-900 font-medium">
                              {displayValue}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {selectedVehicles.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {type === "bike" ? (
                  <FaMotorcycle className="text-4xl text-gray-300" />
                ) : (
                  <FaCar className="text-4xl text-gray-300" />
                )}
              </div>
              <p className="text-lg font-medium">
                Select {type === "bike" ? "bikes" : "vehicles"} to start
                comparing
              </p>
              <p className="text-sm mt-2">
                Choose {maxSelection} {type === "bike" ? "bikes" : "vehicles"}{" "}
                to see detailed comparisons
              </p>
            </div>
          )}

          {selectedVehicles.length === 1 && (
            <div className="text-center py-8 text-blue-600">
              <p className="text-sm font-medium">
                Select one more {type === "bike" ? "bike" : "vehicle"} to
                compare
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleComparison;
