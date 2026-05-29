

import React, { useState, useEffect } from "react";
import {
  FaCar,
  FaCheckCircle,
  FaShieldAlt,
  FaCogs,
  FaSnowflake,
  FaUser,
  FaPhone,
  FaChair,
  FaStar,
  FaHeart,
  FaMapMarkerAlt,
  FaClock,
  FaSearch,
  FaCalendarAlt,
  FaCreditCard,
  FaInfoCircle,
  FaEnvelope,
  FaMotorcycle,
  FaExchangeAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BikesSection from "./BikesSection";

/* Component imports */
import TestimonialsCarousel from "./TestimonialsCarousel";
import VehicleComparison from "./VehicleComparison";

const API_URL = "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const RentRideHome = () => {
  const [activeFilter, setActiveFilter] = useState("All vehicles");
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState(new Set());
  const [userProfile, setUserProfile] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [subscriberEmail, setSubscriberEmail] = useState("");
  const [subscribeMessage, setSubscribeMessage] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState(null);
  const [activeTab, setActiveTab] = useState("cars");
  const [bikeCount, setBikeCount] = useState(null);
  const [showVehicleComparison, setShowVehicleComparison] = useState(false);
  const [filteredVehicles, setFilteredVehicles] = useState([]);

  const navigate = useNavigate();

  const filters = [
    "All vehicles",
    "Sedan",
    "SUV",
    "Hatchback",
    "MPV",
    "Coupe",
    "Convertible",
    "Pickup",
    "Minivan",
    "Electric",
  ];

  const features = [
    {
      icon: <FaCar className="text-3xl" />,
      title: "Wide Selection",
      description: "Choose from premium vehicles for every need",
      gradient: "from-blue-500 to-cyan-400",
    },
    {
      icon: <FaCheckCircle className="text-3xl" />,
      title: "Easy Booking",
      description: "Book in 3 simple steps, 24/7 availability",
      gradient: "from-green-500 to-emerald-400",
    },
    {
      icon: <FaShieldAlt className="text-3xl" />,
      title: "Fully Insured",
      description: "Comprehensive coverage for peace of mind",
      gradient: "from-purple-500 to-pink-400",
    },
    {
      icon: <FaCreditCard className="text-3xl" />,
      title: "Flexible Payment",
      description: "Multiple payment options available",
      gradient: "from-orange-500 to-yellow-400",
    },
  ];

  const fetchUserProfile = async () => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        setUserLoading(false);
        return;
      }
      const response = await axiosInstance.get("/profile");
      if (response.data.success) setUserProfile(response.data.user);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setUserLoading(false);
    }
  };

  const getProfilePhotoUrl = () => {
    if (!userProfile?.profilePhoto) return null;
    if (userProfile.profilePhoto.startsWith("http")) {
      return userProfile.profilePhoto;
    }
    return `http://localhost:5000/uploads/profiles/${userProfile.profilePhoto}`;
  };

  const getUserInitial = () =>
    userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : "U";

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!subscriberEmail) {
      setSubscribeMessage("Please enter your email address");
      setSubscribeStatus("error");
      setTimeout(() => setSubscribeMessage(""), 3000);
      return;
    }
    setSubscribeMessage("Subscribing...");
    setSubscribeStatus("loading");
    try {
      const response = await axios.post(`${API_URL}/subscribe`, {
        email: subscriberEmail,
      });
      if (response.data.success) {
        setSubscribeMessage(
          "Thank you for subscribing! You'll receive exclusive updates.",
        );
        setSubscribeStatus("success");
        setSubscriberEmail("");
      }
    } catch (error) {
      setSubscribeMessage(
        error.response?.data?.message ||
          "Subscription failed. Please try again.",
      );
      setSubscribeStatus("error");
    }
    setTimeout(() => setSubscribeMessage(""), 5000);
  };

  useEffect(() => {
    fetchAllVehicles();
    fetchUserProfile();
  }, []);

  // Filter effect
  useEffect(() => {
    let filtered = vehicles;

    if (activeFilter !== "All vehicles") {
      filtered = filtered.filter(
        (v) => v.carType?.toLowerCase() === activeFilter.toLowerCase(),
      );
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter((v) =>
        v.carName?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    setFilteredVehicles(filtered);
  }, [activeFilter, vehicles, searchQuery]);

  const fetchAllVehicles = async () => {
    try {
      setLoading(true);
      setError("");
      const adminResponse = await axios.get(
        "http://localhost:5000/api/vehicles",
        { timeout: 10000 },
      );
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      let userVehicles = [];
      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const userResponse = await axios.get(
          "http://localhost:5000/api/user-vehicles/public/active",
          { timeout: 10000, headers },
        );
        if (userResponse.data.success) userVehicles = userResponse.data.data;
      } catch (userError) {
        console.log("Could not fetch user vehicles:", userError.message);
      }

      let currentUserId = null;
      if (token) {
        try {
          const tokenParts = token.split(".");
          if (tokenParts.length === 3) {
            const payload = JSON.parse(atob(tokenParts[1]));
            currentUserId = payload.id || payload.userId;
          }
        } catch (decodeError) {
          console.error("Error decoding token:", decodeError);
        }
      }

      const filteredUserVehicles = userVehicles.filter((vehicle) => {
        if (!currentUserId) return true;
        const vehicleOwnerId = vehicle.userId || vehicle.owner || vehicle.user;
        return vehicleOwnerId?.toString() !== currentUserId?.toString();
      });

      let allVehicles = [];
      if (adminResponse.data && Array.isArray(adminResponse.data)) {
        allVehicles = [...adminResponse.data];
      } else if (
        adminResponse.data?.data &&
        Array.isArray(adminResponse.data.data)
      ) {
        allVehicles = [...adminResponse.data.data];
      }
      filteredUserVehicles.forEach((v) =>
        allVehicles.push({ ...v, source: "user" }),
      );
      setVehicles(allVehicles);
      setFilteredVehicles(allVehicles);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      setError("Failed to load vehicles. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleWishlist = (vehicleId, e) => {
    e.stopPropagation();
    const newWishlist = new Set(wishlist);
    newWishlist.has(vehicleId)
      ? newWishlist.delete(vehicleId)
      : newWishlist.add(vehicleId);
    setWishlist(newWishlist);
  };

  const getVehicleImage = (vehicle) => {
    if (vehicle.photos?.length > 0) {
      const extraView = vehicle.photos.find((p) => p.label === "Extra View");
      const photo = extraView || vehicle.photos[0];
      const folder = vehicle.source === "user" ? "user-vehicles" : "vehicles";
      return `http://localhost:5000/uploads/${folder}/${photo.filename}`;
    }
    return null;
  };

  const handleViewDetails = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowDetailsModal(true);
  };

  const handleBookNow = (vehicle) => navigate(`/booking/${vehicle._id}`);

  const CarCard = ({ vehicle }) => {
    const imageUrl = getVehicleImage(vehicle);
    const isWishlisted = wishlist.has(vehicle._id);

    return (
      <div
        className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 cursor-pointer hover:-translate-y-1"
        onClick={() => handleViewDetails(vehicle)}
      >
        <button
          onClick={(e) => toggleWishlist(vehicle._id, e)}
          className="absolute top-3 right-3 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white hover:scale-110 transition-all duration-300"
        >
          <FaHeart
            className={`text-base ${isWishlisted ? "text-red-500" : "text-gray-400"}`}
          />
        </button>

        <div className="absolute top-3 left-3 z-10">
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-bold tracking-wide ${
              vehicle.status === "Available"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {vehicle.status}
          </span>
        </div>

        <div className="h-52 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 relative">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={vehicle.carName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
              <FaCar className="text-6xl text-gray-300" />
              <span className="text-xs text-gray-400">No image available</span>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-lg font-bold text-gray-900 leading-tight truncate">
              {vehicle.carName}
            </h3>
            <span className="flex-shrink-0 px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full border border-blue-100">
              {vehicle.carType}
            </span>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center text-gray-400 text-xs gap-1">
              <FaMapMarkerAlt size={10} />
              <span>Kathmandu, Nepal</span>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`text-xs ${i < 4 ? "text-yellow-400" : "text-gray-200"}`}
                />
              ))}
              <span className="text-xs text-gray-400 ml-1">4.8</span>
            </div>
          </div>

          <div className="flex items-center gap-4 py-3 px-3 bg-gray-50 rounded-xl mb-4">
            <div className="flex items-center gap-1.5 text-gray-600 text-xs">
              <FaCogs size={12} className="text-blue-500" />
              <span className="font-medium">{vehicle.gearType}</span>
            </div>
            <div className="w-px h-3 bg-gray-300" />
            <div className="flex items-center gap-1.5 text-gray-600 text-xs">
              <FaChair size={12} className="text-blue-500" />
              <span className="font-medium">{vehicle.seats} Seats</span>
            </div>
            <div className="w-px h-3 bg-gray-300" />
            <div className="flex items-center gap-1.5 text-gray-600 text-xs">
              <FaSnowflake size={12} className="text-blue-500" />
              <span className="font-medium">
                {vehicle.airCondition === "Yes" ? "AC" : "No AC"}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Daily rate</p>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-gray-900">
                  रु {vehicle.ratePerDay?.toLocaleString()}
                </span>
                <span className="text-xs text-gray-400">/day</span>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleViewDetails(vehicle);
              }}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Header ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <div className="p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
                <FaCar className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Rent<span className="text-gray-800">Ride</span>
                </h1>
                <p className="text-xs text-gray-500 -mt-1">
                  Premium Car Rentals
                </p>
              </div>
            </div>

            <div className="hidden md:block flex-1 max-w-xl mx-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by car name or type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <nav className="hidden lg:flex items-center space-x-8">
              <a
                href="#vehicles"
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
              >
                Browse
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300 rounded-full"></span>
              </a>
              <a
                href="#how-it-works"
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
              >
                How It Works
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300 rounded-full"></span>
              </a>
              <a
                href="#contact"
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300 rounded-full"></span>
              </a>
            </nav>

            <div className="flex items-center gap-4">
              <button
                className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg"
                onClick={() =>
                  document
                    .getElementById("vehicles")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Book Now
              </button>
              {userLoading ? (
                <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
              ) : userProfile && getProfilePhotoUrl() ? (
                <div
                  onClick={() => navigate("/profiledetails")}
                  className="cursor-pointer"
                >
                  <img
                    src={getProfilePhotoUrl()}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              ) : (
                <div
                  onClick={() => navigate("/profiledetails")}
                  className="cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                    {getUserInitial()}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile search */}
          <div className="md:hidden mt-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search vehicles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
        <div className="container mx-auto px-6 py-24 md:py-32 relative z-20">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              Premium Service Since 2024
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Drive Your <span className="text-blue-400">Dream Car</span> in
              Kathmandu
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-200 max-w-xl">
              Experience luxury and convenience with our premium car rental
              service. Book online in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() =>
                  document
                    .getElementById("vehicles")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:shadow-2xl transition-all"
              >
                Explore Cars
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("how-it-works")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-xl hover:bg-white/20"
              >
                How It Works
              </button>
            </div>
          </div>
        </div>

        {/* ── Stats bar ── */}
        <div className="relative z-20 pb-8">
          <div className="container mx-auto px-6">
            <div className="bg-white rounded-2xl shadow-2xl py-8 px-4 grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-gray-100">
              <div className="text-center px-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  10K+
                </div>
                <div className="text-gray-500 text-sm">Happy Customers</div>
              </div>
              <div className="text-center px-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  200+
                </div>
                <div className="text-gray-500 text-sm">Premium Vehicles</div>
              </div>
              <div className="text-center px-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">15+</div>
                <div className="text-gray-500 text-sm">Cities</div>
              </div>
              <div className="text-center px-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  24/7
                </div>
                <div className="text-gray-500 text-sm">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────────── */}
      <section
        id="how-it-works"
        className="py-20 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
              WHY CHOOSE US
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              The Best Rental Experience
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-base">
              We combine technology with personalized service to deliver an
              exceptional car rental experience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white p-7 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-gray-50 to-transparent rounded-bl-3xl pointer-events-none" />
                <div
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-5 group-hover:scale-110 transition-transform duration-300 shadow-md`}
                >
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Fleet Section ──────────────────────────────────────── */}
      <section id="vehicles" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-3">
              FLEET COLLECTION
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-3">
              Choose Your Perfect Ride
            </h2>
            <p className="text-gray-500 text-base max-w-xl mx-auto">
              Browse our premium cars or explore our bike collection
            </p>
          </div>

          {/* ── Tab Switcher ── */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-white rounded-2xl p-1.5 shadow-lg border border-gray-100 gap-1">
              <button
                onClick={() => setActiveTab("cars")}
                className={`flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                  activeTab === "cars"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30 scale-[1.02]"
                    : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                <FaCar
                  className={
                    activeTab === "cars" ? "text-white" : "text-blue-400"
                  }
                  size={16}
                />
                <span>Cars</span>
                {!loading && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      activeTab === "cars"
                        ? "bg-white/20 text-white"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {vehicles.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab("bikes")}
                className={`flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                  activeTab === "bikes"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30 scale-[1.02]"
                    : "text-gray-500 hover:text-purple-600 hover:bg-purple-50"
                }`}
              >
                <FaMotorcycle
                  className={
                    activeTab === "bikes" ? "text-white" : "text-purple-400"
                  }
                  size={16}
                />
                <span>Bikes</span>
                {bikeCount !== null && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      activeTab === "bikes"
                        ? "bg-white/20 text-white"
                        : "bg-purple-100 text-purple-600"
                    }`}
                  >
                    {bikeCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* ── Cars Tab Content ── */}
          {activeTab === "cars" && (
            <div>
              <div className="flex flex-wrap gap-2 mb-8 justify-center">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                      activeFilter === filter
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25 scale-105"
                        : "bg-white text-gray-600 hover:bg-gray-100 shadow-sm border border-gray-200 hover:border-blue-200 hover:text-blue-600"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Compare Vehicles Button */}
              {!loading && filteredVehicles.length > 0 && (
                <div className="flex justify-center mb-8">
                  <button
                    onClick={() => setShowVehicleComparison(true)}
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-2xl hover:scale-105 transition-all inline-flex items-center gap-2"
                  >
                    <FaExchangeAlt /> Compare Vehicles
                  </button>
                </div>
              )}

              {loading && (
                <div className="text-center py-24">
                  <div className="relative w-16 h-16 mx-auto mb-5">
                    <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-t-blue-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                    <FaCar className="absolute inset-0 m-auto text-blue-400 text-lg" />
                  </div>
                  <p className="text-gray-500 font-medium">
                    Loading premium vehicles...
                  </p>
                </div>
              )}

              {error && !loading && (
                <div className="text-center py-24">
                  <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">⚠️</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Something went wrong
                  </h3>
                  <p className="text-gray-500 mb-6">{error}</p>
                  <button
                    onClick={fetchAllVehicles}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {!loading && !error && filteredVehicles.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredVehicles.map((vehicle) => (
                    <CarCard key={vehicle._id} vehicle={vehicle} />
                  ))}
                </div>
              )}

              {!loading && !error && filteredVehicles.length === 0 && (
                <div className="text-center py-24">
                  <div className="w-24 h-24 mx-auto mb-5 flex items-center justify-center bg-blue-50 rounded-3xl">
                    <FaCar className="text-4xl text-blue-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No vehicles found
                  </h3>
                  <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                    {searchQuery
                      ? `No results for "${searchQuery}"`
                      : "No vehicles available in this category"}
                  </p>
                  <button
                    onClick={() => {
                      setActiveFilter("All vehicles");
                      setSearchQuery("");
                    }}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                  >
                    View All Vehicles
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ── Bikes Tab Content ── */}
          {activeTab === "bikes" && (
            <BikesSection
              isLoggedIn={
                !!(
                  localStorage.getItem("token") ||
                  sessionStorage.getItem("token")
                )
              }
              embeddedMode
              onCountReady={(count) => setBikeCount(count)}
            />
          )}
        </div>
      </section>

      {/* ── Vehicle Details Modal ───────────────────────────────── */}
      {showDetailsModal && selectedVehicle && (
        <div className="fixed inset-0 z-[100]">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowDetailsModal(false)}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-100 px-8 py-5 flex justify-between items-center z-10">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedVehicle.carName}
                  </h2>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold border border-blue-100">
                      {selectedVehicle.carType}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        selectedVehicle.status === "Available"
                          ? "bg-green-50 text-green-600 border border-green-100"
                          : "bg-red-50 text-red-600 border border-red-100"
                      }`}
                    >
                      {selectedVehicle.status}
                    </span>
                    {selectedVehicle.carNumber && (
                      <span className="text-gray-400 text-xs">
                        #{selectedVehicle.carNumber}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-red-50 hover:text-red-500 rounded-full transition-all duration-200 text-gray-500 text-xl font-light"
                >
                  ×
                </button>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                  {selectedVehicle.photos &&
                  selectedVehicle.photos.length > 0 ? (
                    selectedVehicle.photos.map((photo, index) => (
                      <div
                        key={index}
                        className={index === 0 ? "lg:col-span-2" : ""}
                      >
                        <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden">
                          <img
                            src={`http://localhost:5000/uploads/${
                              selectedVehicle.source === "user"
                                ? "user-vehicles"
                                : "vehicles"
                            }/${photo.filename}`}
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
                      <FaCar className="text-8xl text-gray-300" />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      Specifications
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        {
                          icon: FaCogs,
                          label: "Transmission",
                          value: selectedVehicle.gearType,
                        },
                        {
                          icon: FaChair,
                          label: "Seats",
                          value: `${selectedVehicle.seats} Persons`,
                        },
                        {
                          icon: FaSnowflake,
                          label: "Air Conditioning",
                          value: selectedVehicle.airCondition,
                        },
                        {
                          icon: FaUser,
                          label: "Driver",
                          value: selectedVehicle.driverName || "Not Included",
                        },
                        {
                          icon: FaPhone,
                          label: "Contact",
                          value: selectedVehicle.phoneNumber,
                        },
                        {
                          icon: FaCalendarAlt,
                          label: "Booking Type",
                          value: selectedVehicle.bookingType,
                        },
                      ].map((spec, index) => (
                        <div
                          key={index}
                          className="flex items-center p-4 bg-gray-50 rounded-xl"
                        >
                          <div className="p-3 bg-white rounded-lg shadow-sm mr-4">
                            <spec.icon className="text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              {spec.label}
                            </p>
                            <p className="font-semibold text-gray-900">
                              {spec.value}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {selectedVehicle.features &&
                      selectedVehicle.features.length > 0 && (
                        <div className="mt-10">
                          <h3 className="text-2xl font-bold text-gray-900 mb-6">
                            Features and Amenities
                          </h3>
                          <div className="flex flex-wrap gap-3">
                            {selectedVehicle.features.map((feature, index) => (
                              <span
                                key={index}
                                className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                    {selectedVehicle.description && (
                      <div className="mt-10">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                          Description
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {selectedVehicle.description}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-1">
                    <div className="sticky top-24 bg-gradient-to-b from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-lg">
                      <div className="text-center mb-6">
                        <p className="text-gray-500 mb-2">Daily Rate</p>
                        <div className="flex items-baseline justify-center">
                          <span className="text-5xl font-bold text-gray-900">
                            रु {selectedVehicle.ratePerDay?.toLocaleString()}
                          </span>
                          <span className="text-gray-500 ml-2">/day</span>
                        </div>
                      </div>
                      <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                        <div className="flex items-start">
                          <FaInfoCircle className="text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-blue-800 mb-1">
                              Complete Price Breakdown
                            </h4>
                            <p className="text-sm text-blue-700">
                              Full price calculation including optional extras,
                              service fee, and taxes will be shown during
                              booking.
                            </p>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          handleBookNow(selectedVehicle);
                          setShowDetailsModal(false);
                        }}
                        className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-green-500/30 hover:scale-105 transition-all duration-300"
                      >
                        Book This Vehicle
                      </button>
                      <div className="mt-6 text-center">
                        <p className="text-gray-500 text-sm">
                          Free cancellation - 24/7 support - Instant
                          confirmation
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Vehicle Comparison Modal ───────────────────────────── */}
      {showVehicleComparison && (
        <VehicleComparison
          vehicles={filteredVehicles}
          onClose={() => setShowVehicleComparison(false)}
          type="car"
        />
      )}

      {/* ── Testimonials Section ───────────────────────────────── */}
      <TestimonialsCarousel />

      {/* ── CTA Section ────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-blue-900">
        <div className="container mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 bg-white/10 text-white rounded-full text-sm font-semibold mb-6 backdrop-blur-sm border border-white/20">
            Start Your Journey Today
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust RentRide for their
            travel needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/profiledetails")}
              className="px-10 py-4 bg-white text-gray-900 font-bold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Start Booking Now
            </button>
            <button className="px-10 py-4 bg-transparent border-2 border-white/50 text-white font-bold rounded-xl hover:bg-white/10 hover:border-white transition-all duration-300">
              Contact Support
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer id="contact" className="bg-gray-900 text-white pt-20 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
                  <FaCar className="text-white text-2xl" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Rent<span className="text-white">Ride</span>
                  </h1>
                  <p className="text-xs text-gray-400 -mt-1">
                    Premium Car Rental
                  </p>
                </div>
              </div>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                Premium car rental service in Kathmandu. Experience luxury,
                reliability, and exceptional service.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { label: "Browse Cars", href: "#vehicles" },
                  { label: "How It Works", href: "#how-it-works" },
                  { label: "About Us", href: "#contact" },
                  { label: "Contact", href: "#contact" },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-all duration-200 text-sm block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 text-white">
                Contact Info
              </h4>
              <ul className="text-gray-400 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <FaMapMarkerAlt className="mt-1 text-blue-400 flex-shrink-0" />
                  <span>Kathmandu, Nepal</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaPhone className="text-blue-400 flex-shrink-0" />
                  <span>+977 9844177965</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaClock className="text-blue-400 flex-shrink-0" />
                  <span>24/7 Support</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Newsletter</h4>
              <p className="text-gray-400 mb-4 text-sm">
                Subscribe for exclusive deals and updates
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <div className="flex rounded-xl overflow-hidden border border-gray-700 focus-within:border-blue-500 transition-colors">
                  <input
                    type="email"
                    placeholder="Your email"
                    value={subscriberEmail}
                    onChange={(e) => setSubscriberEmail(e.target.value)}
                    className="flex-1 px-4 py-3 bg-gray-800 text-white text-sm focus:outline-none placeholder-gray-500"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:opacity-90 transition-opacity flex items-center gap-1 text-sm"
                  >
                    <FaEnvelope size={13} />
                  </button>
                </div>
                {subscribeMessage && (
                  <p
                    className={`text-xs ${
                      subscribeStatus === "success"
                        ? "text-green-400"
                        : subscribeStatus === "error"
                          ? "text-red-400"
                          : "text-blue-400"
                    }`}
                  >
                    {subscribeMessage}
                  </p>
                )}
              </form>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} RentRide. All rights reserved.
            </p>
            <p className="text-gray-600 text-xs mt-2">
              Premium car rental service in Kathmandu
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RentRideHome;
