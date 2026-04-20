import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaMotorcycle,
  FaSearch,
  FaTachometerAlt,
  FaBolt,
  FaShieldAlt,
  FaArrowRight,
  FaStar,
  FaPhone,
  FaGasPump,
  FaCogs,
  FaCalendarAlt,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const API_URL = "http://localhost:5000/api";

// ── helpers ──────────────────────────────────────────────────────────────────

const getBikeImage = (bike, index = 0) => {
  if (bike.photos?.length > index) {
    return `http://localhost:5000/uploads/bikes/${bike.photos[index].filename}`;
  }
  return null;
};

const getStatusStyle = (status) => {
  if (status === "Available") return "bg-green-100 text-green-700 border border-green-200";
  if (status === "Booked") return "bg-blue-100 text-blue-700 border border-blue-200";
  return "bg-yellow-100 text-yellow-700 border border-yellow-200";
};

// ── BikeDetailModal ───────────────────────────────────────────────────────────

const BikeDetailModal = ({ bike, onClose, onBook, isLoggedIn }) => {
  const [activePhoto, setActivePhoto] = useState(0);
  if (!bike) return null;

  const photos = bike.photos || [];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur border-b px-6 py-4 flex justify-between items-center z-10 rounded-t-3xl">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{bike.bikeName}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2.5 py-0.5 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                {bike.bikeType}
              </span>
              <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${getStatusStyle(bike.status)}`}>
                {bike.status}
              </span>
              <span className="text-gray-400 text-sm">{bike.bikeNumber}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
            <FaTimes className="text-gray-500" size={18} />
          </button>
        </div>

        <div className="p-6">
          {/* Photo gallery */}
          {photos.length > 0 ? (
            <div className="mb-6">
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-gray-100 mb-3">
                <img
                  src={`http://localhost:5000/uploads/bikes/${photos[activePhoto].filename}`}
                  alt={photos[activePhoto].label}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur">
                  {photos[activePhoto].label}
                </div>
                {photos.length > 1 && (
                  <>
                    <button
                      onClick={() => setActivePhoto(p => (p - 1 + photos.length) % photos.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow transition"
                    >
                      <FaChevronLeft size={12} />
                    </button>
                    <button
                      onClick={() => setActivePhoto(p => (p + 1) % photos.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow transition"
                    >
                      <FaChevronRight size={12} />
                    </button>
                  </>
                )}
              </div>
              {photos.length > 1 && (
                <div className="flex gap-2 justify-center">
                  {photos.map((photo, i) => (
                    <button
                      key={i}
                      onClick={() => setActivePhoto(i)}
                      className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition ${
                        i === activePhoto ? "border-purple-500" : "border-transparent opacity-60"
                      }`}
                    >
                      <img
                        src={`http://localhost:5000/uploads/bikes/${photo.filename}`}
                        alt={photo.label}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="h-56 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl flex items-center justify-center mb-6">
              <FaMotorcycle className="text-7xl text-purple-200" />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Specs */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Specifications</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { icon: FaCogs, label: "Transmission", value: bike.transmission },
                  { icon: FaGasPump, label: "Fuel", value: bike.fuelType },
                  { icon: FaTachometerAlt, label: "Engine", value: bike.engineCapacity },
                  { icon: FaBolt, label: "Mileage", value: bike.mileage },
                  { icon: FaCalendarAlt, label: "Year", value: bike.year },
                  { icon: FaPhone, label: "Contact", value: bike.phoneNumber },
                ].filter(s => s.value).map((spec, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <spec.icon className="text-purple-500" size={13} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">{spec.label}</p>
                      <p className="text-sm font-semibold text-gray-800">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {bike.features?.length > 0 && (
                <div className="mt-5">
                  <h4 className="text-sm font-bold text-gray-700 mb-2">Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {bike.features.map((f, i) => (
                      <span key={i} className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-lg">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {bike.description && (
                <div className="mt-5">
                  <h4 className="text-sm font-bold text-gray-700 mb-2">Description</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{bike.description}</p>
                </div>
              )}
            </div>

            {/* Pricing & Booking */}
            <div>
              <div className="bg-gradient-to-b from-purple-50 to-pink-50 border border-purple-100 rounded-2xl p-5 sticky top-4">
                <div className="text-center mb-5">
                  <p className="text-gray-500 text-sm mb-1">Daily Rate</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-black text-gray-900">रु{bike.ratePerDay}</span>
                    <span className="text-gray-400 ml-1 text-sm">/day</span>
                  </div>
                  {bike.ratePerWeek && (
                    <p className="text-xs text-purple-600 mt-1">Weekly: रु{bike.ratePerWeek}</p>
                  )}
                  {bike.securityDeposit > 0 && (
                    <p className="text-xs text-gray-400 mt-1">Deposit: रु{bike.securityDeposit}</p>
                  )}
                </div>

                <div className="space-y-2 mb-5 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <FaShieldAlt className="text-green-500" />
                    <span>Helmet {bike.helmetIncluded ? "included" : "not included"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-blue-500" />
                    <span>Min. age: {bike.minimumAge} years</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaStar className="text-yellow-500" />
                    <span>License required: {bike.licenseRequired}</span>
                  </div>
                </div>

                {bike.status === "Available" ? (
                  <button
                    onClick={() => onBook(bike)}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all"
                  >
                    Book Now
                  </button>
                ) : (
                  <div className="w-full py-3 bg-gray-100 text-gray-400 font-semibold rounded-xl text-center text-sm">
                    Currently {bike.status}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Main BikesSection ─────────────────────────────────────────────────────────

const BikesSection = ({ isLoggedIn = false }) => {
  const navigate = useNavigate();
  const [bikes, setBikes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [selectedBike, setSelectedBike] = useState(null);

  const bikeTypes = ["All", "Sports", "Cruiser", "Touring", "Scooter", "Electric", "Dirt Bike", "Standard"];

  useEffect(() => {
    fetchBikes();
  }, []);

  useEffect(() => {
    let result = bikes;
    if (typeFilter !== "All") result = result.filter(b => b.bikeType === typeFilter);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(b =>
        b.bikeName?.toLowerCase().includes(q) ||
        b.brand?.toLowerCase().includes(q) ||
        b.bikeType?.toLowerCase().includes(q)
      );
    }
    setFiltered(result);
  }, [search, typeFilter, bikes]);

  const fetchBikes = async () => {
    try {
      const res = await axios.get(`${API_URL}/bikes?status=Available`);
      if (res.data.success) {
        setBikes(res.data.data);
        setFiltered(res.data.data);
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

  return (
    <section id="bikes-section" className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
            <FaMotorcycle /> Bike Rentals
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
            Ride on Two Wheels
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            From nimble scooters to powerful sports bikes — find your perfect ride in Kathmandu.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search bikes..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white shadow-sm"
            />
          </div>
        </div>

        {/* Type Filter Pills */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {bikeTypes.map(type => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                typeFilter === type
                  ? "bg-purple-600 text-white shadow-md shadow-purple-200"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-purple-300 hover:text-purple-600"
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
              <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
              <p className="text-gray-400 text-sm">Loading bikes...</p>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <FaMotorcycle className="text-6xl text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 text-lg font-medium">No bikes available right now</p>
            <p className="text-gray-300 text-sm mt-1">Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map(bike => {
              const img = getBikeImage(bike);
              const isAvailable = bike.status === "Available";
              return (
                <div
                  key={bike._id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                  onClick={() => setSelectedBike(bike)}
                >
                  {/* Image */}
                  <div className="relative h-48 bg-gradient-to-br from-gray-100 to-purple-50 overflow-hidden">
                    {img ? (
                      <img
                        src={img}
                        alt={bike.bikeName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FaMotorcycle className="text-5xl text-purple-200" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getStatusStyle(bike.status)}`}>
                        {bike.status}
                      </span>
                    </div>
                    {bike.photos?.length > 1 && (
                      <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">
                        {bike.photos.length} photos
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-gray-800 truncate pr-2">{bike.bikeName}</h3>
                    </div>
                    <p className="text-xs text-gray-400 mb-2">{bike.brand} {bike.model}</p>
                    <div className="flex gap-1.5 mb-3 flex-wrap">
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-600 text-xs font-medium rounded-full">
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
                        <p className="text-lg font-black text-purple-600">
                          रु{bike.ratePerDay}<span className="text-xs font-normal text-gray-400">/day</span>
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isAvailable) handleBook(bike);
                        }}
                        disabled={!isAvailable}
                        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                          isAvailable
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-md hover:shadow-purple-200 hover:scale-105"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        {isAvailable ? <>Book <FaArrowRight size={11} /></> : "Unavailable"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View all hint */}
        {!loading && filtered.length > 0 && (
          <p className="text-center text-gray-400 text-sm mt-8">
            Showing {filtered.length} bike{filtered.length !== 1 ? "s" : ""}
            {typeFilter !== "All" && ` in ${typeFilter}`}
          </p>
        )}
      </div>

      {/* Detail Modal */}
      {selectedBike && (
        <BikeDetailModal
          bike={selectedBike}
          onClose={() => setSelectedBike(null)}
          onBook={handleBook}
          isLoggedIn={isLoggedIn}
        />
      )}
    </section>
  );
};

export default BikesSection;