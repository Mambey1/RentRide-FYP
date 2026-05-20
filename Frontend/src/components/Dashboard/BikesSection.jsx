import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaMotorcycle,
  FaSearch,
  FaTachometerAlt,
  FaBolt,
  FaShieldAlt,
  FaArrowRight,
  FaPhone,
  FaGasPump,
  FaCogs,
  FaCalendarAlt,
} from "react-icons/fa";

const API_URL = "http://localhost:5000/api";

const getBikeImage = (bike, index = 0) => {
  if (bike.photos?.length > index)
    return `http://localhost:5000/uploads/bikes/${bike.photos[index].filename}`;
  return null;
};

const getStatusStyle = (status) => {
  if (status === "Available") return "bg-green-500 text-white";
  if (status === "Booked") return "bg-blue-500 text-white";
  if (status === "On Hold") return "bg-amber-500 text-white";
  return "bg-yellow-500 text-white";
};

// ── Countdown helper ──────────────────────────────────────────────────────────
const getHoldTimeRemaining = (holdExpiresAt) => {
  if (!holdExpiresAt) return null;
  const diff = new Date(holdExpiresAt) - new Date();
  if (diff <= 0) return "Available soon";
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `Available in ${hours}h ${minutes}m`;
};

// ── BikeDetailModal ───────────────────────────────────────────────────────────
const BikeDetailModal = ({ bike, onClose, onBook }) => {
  if (!bike) return null;
  const photos = bike.photos || [];
  const isAvailable = bike.status === "Available";
  const isOnHold = bike.status === "On Hold";

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[200]">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-100 px-8 py-5 flex justify-between items-center z-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {bike.bikeName}
              </h2>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold border border-blue-100">
                  {bike.bikeType}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(bike.status)}`}
                >
                  {bike.status}
                </span>
                {bike.bikeNumber && (
                  <span className="text-gray-400 text-xs">
                    #{bike.bikeNumber}
                  </span>
                )}
              </div>

              {/* On Hold banner in modal header */}
              {isOnHold && bike.holdExpiresAt && (
                <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-2">
                  <span className="text-amber-600 text-lg flex-shrink-0">
                    ⏱
                  </span>
                  <div>
                    <p className="text-amber-800 text-sm font-semibold">
                      This bike is currently on hold
                    </p>
                    <p className="text-amber-700 text-xs">
                      <strong>
                        {getHoldTimeRemaining(bike.holdExpiresAt)}
                      </strong>{" "}
                      — will be released automatically if payment is not
                      completed.
                    </p>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-red-50 hover:text-red-500 rounded-full transition-all duration-200 text-gray-500 text-xl font-light"
            >
              ×
            </button>
          </div>

          <div className="p-8">
            {/* Photo Gallery */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
              {photos.length > 0 ? (
                photos.map((photo, index) => (
                  <div
                    key={index}
                    className={index === 0 ? "lg:col-span-2" : ""}
                  >
                    <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden">
                      <img
                        src={`http://localhost:5000/uploads/bikes/${photo.filename}`}
                        alt={photo.label}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm backdrop-blur-sm">
                        {photo.label}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="lg:col-span-3 h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                  <FaMotorcycle className="text-8xl text-gray-300" />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left — Specs */}
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Specifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: FaCogs,
                      label: "Transmission",
                      value: bike.transmission,
                    },
                    {
                      icon: FaGasPump,
                      label: "Fuel Type",
                      value: bike.fuelType,
                    },
                    {
                      icon: FaTachometerAlt,
                      label: "Engine",
                      value: bike.engineCapacity,
                    },
                    { icon: FaBolt, label: "Mileage", value: bike.mileage },
                    { icon: FaCalendarAlt, label: "Year", value: bike.year },
                    {
                      icon: FaPhone,
                      label: "Contact",
                      value: bike.phoneNumber,
                    },
                  ]
                    .filter((s) => s.value)
                    .map((spec, i) => (
                      <div
                        key={i}
                        className="flex items-center p-4 bg-gray-50 rounded-xl"
                      >
                        <div className="p-3 bg-white rounded-lg shadow-sm mr-4">
                          <spec.icon className="text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{spec.label}</p>
                          <p className="font-semibold text-gray-900">
                            {spec.value}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>

                {bike.features?.length > 0 && (
                  <div className="mt-10">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      Features & Amenities
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {bike.features.map((f, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {bike.description && (
                  <div className="mt-10">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Description
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {bike.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Right — Pricing & Booking */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 bg-gradient-to-b from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-lg">
                  <div className="text-center mb-6">
                    <p className="text-gray-500 mb-2">Daily Rate</p>
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold text-gray-900">
                        &#2352;{bike.ratePerDay}
                      </span>
                      <span className="text-gray-500 ml-2">/day</span>
                    </div>
                    {bike.ratePerWeek && (
                      <p className="text-sm text-blue-600 mt-2">
                        Weekly: &#2352;{bike.ratePerWeek}
                      </p>
                    )}
                  </div>

                  <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                    <div className="flex items-start">
                      <FaShieldAlt className="text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-blue-700">
                        Helmet{" "}
                        {bike.helmetIncluded ? "included" : "not included"}.
                        {bike.minimumAge
                          ? ` Min. age ${bike.minimumAge} yrs.`
                          : ""}
                        {bike.securityDeposit > 0
                          ? ` Deposit: &#2352;${bike.securityDeposit}.`
                          : ""}{" "}
                        Full price breakdown during booking.
                      </p>
                    </div>
                  </div>

                  {/* Book button — aware of On Hold status */}
                  {isAvailable ? (
                    <button
                      onClick={() => onBook(bike)}
                      className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-green-500/30 hover:scale-105 transition-all duration-300"
                    >
                      Book This Bike
                    </button>
                  ) : isOnHold ? (
                    <div className="w-full py-4 bg-amber-50 border border-amber-200 text-amber-700 font-semibold rounded-xl text-center">
                      <p>⏱ On Hold</p>
                      {bike.holdExpiresAt && (
                        <p className="text-xs mt-1 font-normal">
                          {getHoldTimeRemaining(bike.holdExpiresAt)}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="w-full py-4 bg-gray-100 text-gray-400 font-semibold rounded-xl text-center">
                      Currently {bike.status}
                    </div>
                  )}

                  <div className="mt-6 text-center">
                    <p className="text-gray-500 text-sm">
                      Free cancellation • 24/7 support • Instant confirmation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

// ── Main BikesSection ─────────────────────────────────────────────────────────
const BikesSection = ({
  isLoggedIn = false,
  embeddedMode = false,
  onCountReady = null,
}) => {
  const navigate = useNavigate();
  const [bikes, setBikes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [selectedBike, setSelectedBike] = useState(null);

  const bikeTypes = [
    "All",
    "Sports",
    "Cruiser",
    "Touring",
    "Scooter",
    "Electric",
    "Dirt Bike",
    "Standard",
  ];

  useEffect(() => {
    fetchBikes();
  }, []);

  useEffect(() => {
    let result = bikes;
    if (typeFilter !== "All")
      result = result.filter((b) => b.bikeType === typeFilter);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (b) =>
          b.bikeName?.toLowerCase().includes(q) ||
          b.brand?.toLowerCase().includes(q) ||
          b.bikeType?.toLowerCase().includes(q),
      );
    }
    setFiltered(result);
  }, [search, typeFilter, bikes]);

  const fetchBikes = async () => {
    try {
      // Fetch all bikes including On Hold so users can see them
      const res = await axios.get(`${API_URL}/bikes`);
      if (res.data.success) {
        setBikes(res.data.data);
        setFiltered(res.data.data);
        // Count only Available bikes for the tab badge
        const availableCount = res.data.data.filter(
          (b) => b.status === "Available",
        ).length;
        if (onCountReady) onCountReady(availableCount);
      }
    } catch (err) {
      console.error("Failed to fetch bikes:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = (bike) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    navigate(`/bike-booking/${bike._id}`);
  };

  const inner = (
    <div className={embeddedMode ? "" : "container mx-auto px-4 sm:px-6"}>
      {!embeddedMode && (
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
            <FaMotorcycle /> Bike Rentals
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
            Ride on Two Wheels
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            From nimble scooters to powerful sports bikes — find your perfect
            ride in Kathmandu.
          </p>
        </div>
      )}

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8 max-w-2xl mx-auto">
        <div className="relative flex-1">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search bikes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
          />
        </div>
      </div>

      {/* Type Filter Pills */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {bikeTypes.map((type) => (
          <button
            key={type}
            onClick={() => setTypeFilter(type)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
              typeFilter === type
                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25 scale-105"
                : "bg-white text-gray-600 hover:bg-gray-100 shadow-sm border border-gray-200 hover:border-blue-200 hover:text-blue-600"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
            <p className="text-gray-400 text-sm">Loading bikes...</p>
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <FaMotorcycle className="text-6xl text-gray-200 mx-auto mb-4" />
          <p className="text-gray-400 text-lg font-medium">
            No bikes available right now
          </p>
          <p className="text-gray-300 text-sm mt-1">Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((bike) => {
            const img = getBikeImage(bike);
            const bikeIsAvailable = bike.status === "Available";
            const bikeIsOnHold = bike.status === "On Hold";

            return (
              <div
                key={bike._id}
                onClick={() => setSelectedBike(bike)}
                className={`bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer ${
                  bikeIsOnHold ? "border-amber-200" : "border-gray-100"
                }`}
              >
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  {img ? (
                    <img
                      src={img}
                      alt={bike.bikeName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FaMotorcycle className="text-5xl text-gray-300" />
                    </div>
                  )}

                  {/* Status badge */}
                  <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
                    <span
                      className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getStatusStyle(bike.status)}`}
                    >
                      {bike.status}
                    </span>
                  </div>

                  {bike.photos?.length > 1 && (
                    <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">
                      {bike.photos.length} photos
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-gray-800 truncate pr-2">
                      {bike.bikeName}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-400 mb-1">
                    {bike.brand} {bike.model}
                  </p>

                  {/* On Hold countdown shown on card */}
                  {bikeIsOnHold && bike.holdExpiresAt && (
                    <p className="text-xs text-amber-600 font-semibold mb-2">
                      ⏱ {getHoldTimeRemaining(bike.holdExpiresAt)}
                    </p>
                  )}

                  <div className="flex gap-1.5 mb-3 flex-wrap">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full border border-blue-100">
                      {bike.bikeType}
                    </span>
                    {bike.engineCapacity && (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">
                        {bike.engineCapacity}
                      </span>
                    )}
                    {bike.fuelType && bike.fuelType !== "Petrol" && (
                      <span className="px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded-full">
                        {bike.fuelType}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400">From</p>
                      <p className="text-xl font-bold text-gray-900">
                        &#2352;{bike.ratePerDay}
                        <span className="text-xs font-normal text-gray-400">
                          /day
                        </span>
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (bikeIsAvailable) handleBook(bike);
                      }}
                      disabled={!bikeIsAvailable}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                        bikeIsAvailable
                          ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg hover:shadow-blue-500/25 hover:from-blue-700 hover:to-blue-800"
                          : bikeIsOnHold
                            ? "bg-amber-100 text-amber-700 cursor-not-allowed"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {bikeIsAvailable ? (
                        <>
                          <span>Book</span>
                          <FaArrowRight size={11} />
                        </>
                      ) : bikeIsOnHold ? (
                        "On Hold"
                      ) : (
                        "Unavailable"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <p className="text-center text-gray-400 text-sm mt-8">
          Showing {filtered.length} bike{filtered.length !== 1 ? "s" : ""}
          {typeFilter !== "All" && ` in ${typeFilter}`}
        </p>
      )}
    </div>
  );

  return (
    <>
      {embeddedMode ? (
        inner
      ) : (
        <section
          id="bikes-section"
          className="py-16 bg-gradient-to-b from-gray-50 to-white"
        >
          {inner}
        </section>
      )}
      {selectedBike && (
        <BikeDetailModal
          bike={selectedBike}
          onClose={() => setSelectedBike(null)}
          onBook={handleBook}
        />
      )}
    </>
  );
};

export default BikesSection;
