// // // // // }

// // // // import { Link } from "react-router-dom";
// // // // import { useState, useEffect } from "react";
// // // // import {
// // // //   FaCar,
// // // //   FaDollarSign,
// // // //   FaShieldAlt,
// // // //   FaClock,
// // // //   FaUserTie,
// // // //   FaTruck,
// // // //   FaHeadset,
// // // //   FaChevronDown,
// // // //   FaStar,
// // // //   FaCheckCircle,
// // // //   FaMapMarkerAlt,
// // // //   FaBolt,
// // // //   FaCrown,
// // // //   FaHeart,
// // // //   FaRegHeart,
// // // //   FaUsers,
// // // //   FaSnowflake,
// // // //   FaCogs,
// // // //   FaChair,
// // // //   FaInfoCircle,
// // // //   FaSearch,
// // // //   FaPhone,
// // // //   FaCalendarAlt,
// // // //   FaEnvelope,
// // // //   FaUserCircle,
// // // //   FaArrowRight,
// // // //   FaCreditCard,
// // // //   FaIdCard,
// // // //   FaFacebook,
// // // //   FaTwitter,
// // // //   FaInstagram,
// // // // } from "react-icons/fa";
// // // // import axios from "axios";
// // // // import { useNavigate } from "react-router-dom";

// // // // /* Image imports */
// // // // import heroVideo from "../../assets/Dashboard/INtro.mp4";
// // // // import sedan from "../../assets/Dashboard/sedan.jpg";
// // // // import suv from "../../assets/Dashboard/suv.jpg";
// // // // import ev from "../../assets/Dashboard/ev.jpg";
// // // // import convertible from "../../assets/Dashboard/convertible.jpg";
// // // // import minivan from "../../assets/Dashboard/minivan.jpg";
// // // // import sport from "../../assets/Dashboard/sport.jpg";

// // // // const API_URL = "http://localhost:5000/api";

// // // // export default function App() {
// // // //   const [favorites, setFavorites] = useState(new Set());
// // // //   const [vehicles, setVehicles] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState("");
// // // //   const [filteredVehicles, setFilteredVehicles] = useState([]);
// // // //   const [activeFilter, setActiveFilter] = useState("All vehicles");
// // // //   const [searchQuery, setSearchQuery] = useState("");
// // // //   const [selectedVehicle, setSelectedVehicle] = useState(null);
// // // //   const [showDetailsModal, setShowDetailsModal] = useState(false);
// // // //   const navigate = useNavigate();

// // // //   const filters = [
// // // //     "All vehicles",
// // // //     "Sedan",
// // // //     "SUV",
// // // //     "Hatchback",
// // // //     "MPV",
// // // //     "Coupe",
// // // //     "Convertible",
// // // //     "Pickup",
// // // //     "Minivan",
// // // //     "Electric",
// // // //   ];

// // // //   // Fetch vehicles from backend (Public Landing Page - NO AUTH)
// // // //   useEffect(() => {
// // // //     fetchVehicles();
// // // //   }, []);

// // // //   const fetchVehicles = async () => {
// // // //     try {
// // // //       setLoading(true);
// // // //       setError("");

// // // //       // Fetch admin vehicles (public)
// // // //       const adminResponse = await axios.get(
// // // //         "http://localhost:5000/api/vehicles",
// // // //         {
// // // //           timeout: 10000,
// // // //         },
// // // //       );

// // // //       // Fetch user vehicles from public endpoint (only active and listed)
// // // //       let userVehicles = [];
// // // //       try {
// // // //         const userResponse = await axios.get(
// // // //           "http://localhost:5000/api/user-vehicles/public/active",
// // // //           { timeout: 10000 },
// // // //         );
// // // //         if (userResponse.data.success) userVehicles = userResponse.data.data;
// // // //       } catch (userError) {
// // // //         console.log("Could not fetch user vehicles:", userError.message);
// // // //       }

// // // //       let allVehicles = [];

// // // //       // Add admin vehicles
// // // //       if (adminResponse.data && Array.isArray(adminResponse.data)) {
// // // //         allVehicles = [...adminResponse.data];
// // // //       } else if (
// // // //         adminResponse.data?.data &&
// // // //         Array.isArray(adminResponse.data.data)
// // // //       ) {
// // // //         allVehicles = [...adminResponse.data.data];
// // // //       }

// // // //       // Add user vehicles
// // // //       userVehicles.forEach((userVehicle) =>
// // // //         allVehicles.push({ ...userVehicle, source: "user" }),
// // // //       );

// // // //       setVehicles(allVehicles);
// // // //       setFilteredVehicles(allVehicles);
// // // //     } catch (error) {
// // // //       console.error("Error fetching vehicles:", error);
// // // //       setError("Failed to load vehicles. Please try again.");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const toggleFavorite = (vehicleId, e) => {
// // // //     e?.stopPropagation();
// // // //     const newWishlist = new Set(favorites);
// // // //     if (newWishlist.has(vehicleId)) {
// // // //       newWishlist.delete(vehicleId);
// // // //     } else {
// // // //       newWishlist.add(vehicleId);
// // // //     }
// // // //     setFavorites(newWishlist);
// // // //   };

// // // //   // Filter vehicles based on active filter and search
// // // //   useEffect(() => {
// // // //     const filtered = vehicles.filter((vehicle) => {
// // // //       const matchesFilter =
// // // //         activeFilter === "All vehicles" ||
// // // //         vehicle.carType?.toLowerCase() === activeFilter.toLowerCase();
// // // //       const matchesSearch =
// // // //         searchQuery === "" ||
// // // //         vehicle.carName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
// // // //         vehicle.carType?.toLowerCase().includes(searchQuery.toLowerCase());
// // // //       return matchesFilter && matchesSearch;
// // // //     });
// // // //     setFilteredVehicles(filtered);
// // // //   }, [activeFilter, searchQuery, vehicles]);

// // // //   // Get vehicle image URL
// // // //   const getVehicleImage = (vehicle) => {
// // // //     if (vehicle.photos?.length > 0) {
// // // //       const extraView = vehicle.photos.find(
// // // //         (photo) => photo.label === "Extra View",
// // // //       );
// // // //       const photo = extraView || vehicle.photos[0];
// // // //       const folder = vehicle.source === "user" ? "user-vehicles" : "vehicles";
// // // //       return `http://localhost:5000/uploads/${folder}/${photo.filename}`;
// // // //     }

// // // //     // Fallback based on car type
// // // //     switch (vehicle.carType) {
// // // //       case "SUV":
// // // //         return suv;
// // // //       case "Sedan":
// // // //         return sedan;
// // // //       case "Hatchback":
// // // //         return sedan;
// // // //       case "MPV":
// // // //         return minivan;
// // // //       case "Convertible":
// // // //         return convertible;
// // // //       case "Coupe":
// // // //         return sport;
// // // //       case "Pickup":
// // // //         return suv;
// // // //       case "Minivan":
// // // //         return minivan;
// // // //       case "Electric":
// // // //         return ev;
// // // //       default:
// // // //         return sedan;
// // // //     }
// // // //   };

// // // //   // Handle View Details click
// // // //   const handleViewDetails = (vehicle) => {
// // // //     setSelectedVehicle(vehicle);
// // // //     setShowDetailsModal(true);
// // // //   };

// // // //   // Handle Book Now click
// // // //   const handleBookNow = (vehicle) => {
// // // //     navigate(`/booking/${vehicle._id}`);
// // // //   };

// // // //   // Format price with रु symbol
// // // //   const formatPrice = (price) => {
// // // //     return `रु ${price}`;
// // // //   };

// // // //   // Get rating based on vehicle properties
// // // //   const getRating = (vehicle) => {
// // // //     let baseRating = 4.0;
// // // //     if (vehicle.airCondition === "Yes") baseRating += 0.3;
// // // //     if (vehicle.gearType === "Automatic") baseRating += 0.2;
// // // //     if (vehicle.seats >= 7) baseRating += 0.2;
// // // //     if (vehicle.carType === "SUV" || vehicle.carType === "Convertible")
// // // //       baseRating += 0.3;
// // // //     return Math.min(5.0, baseRating).toFixed(1);
// // // //   };

// // // //   // Get review count
// // // //   const getReviewCount = (vehicle) => {
// // // //     const baseCounts = {
// // // //       SUV: 1200,
// // // //       Sedan: 1000,
// // // //       Hatchback: 800,
// // // //       MPV: 600,
// // // //       Coupe: 400,
// // // //       Convertible: 300,
// // // //       Pickup: 200,
// // // //       Minivan: 500,
// // // //       Electric: 350,
// // // //     };
// // // //     return baseCounts[vehicle.carType] || 500;
// // // //   };

// // // //   // Scroll to section
// // // //   const scrollToSection = (sectionId) => {
// // // //     const section = document.getElementById(sectionId);
// // // //     if (section) {
// // // //       section.scrollIntoView({ behavior: "smooth" });
// // // //     }
// // // //   };

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
// // // //         <div className="text-center">
// // // //           <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
// // // //           <p className="text-gray-600 text-lg">Loading vehicles...</p>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (error) {
// // // //     return (
// // // //       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
// // // //         <div className="text-center">
// // // //           <div className="text-red-500 text-5xl mb-4">⚠️</div>
// // // //           <h3 className="text-xl font-semibold mb-2">Something went wrong</h3>
// // // //           <p className="text-gray-600 mb-6 max-w-md mx-auto">{error}</p>
// // // //           <button
// // // //             onClick={fetchVehicles}
// // // //             className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
// // // //           >
// // // //             Try Again
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="font-sans text-gray-900 bg-gradient-to-br from-gray-50 to-blue-50">
// // // //       {/* Navbar */}
// // // //       <nav className="w-full bg-white/90 backdrop-blur-md shadow-2xl sticky top-0 z-50">
// // // //         <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
// // // //           {/* <div
// // // //             className="flex items-center gap-2 cursor-pointer"
// // // //             onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
// // // //           >
// // // //             <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg">
// // // //               <FaCar className="text-white text-2xl" />
// // // //             </div>
// // // //             <h1 className="text-2xl font-bold">
// // // //               Rent<span className="text-blue-600">Ride</span>
// // // //             </h1>
// // // //           </div> */}
// // // //           <div
// // // //             className="flex items-center gap-3 cursor-pointer"
// // // //             onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
// // // //           >
// // // //             <div className="p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
// // // //               <FaCar className="text-white text-2xl" />
// // // //             </div>
// // // //             <div>
// // // //               <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
// // // //                 Rent<span className="text-gray-800">Ride</span>
// // // //               </h1>
// // // //               <p className="text-xs text-gray-500 -mt-1">Premium Car Rentals</p>
// // // //             </div>
// // // //           </div>
// // // //           {/* Search Bar */}
// // // //           <div className="hidden md:block flex-1 max-w-md mx-8">
// // // //             <div className="relative">
// // // //               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
// // // //                 <FaSearch className="text-gray-400" />
// // // //               </div>
// // // //               <input
// // // //                 type="text"
// // // //                 placeholder="Search vehicles..."
// // // //                 value={searchQuery}
// // // //                 onChange={(e) => setSearchQuery(e.target.value)}
// // // //                 className="w-full pl-12 pr-4 py-2.5 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-300"
// // // //               />
// // // //             </div>
// // // //           </div>

// // // //           <ul className="hidden lg:flex items-center gap-10 text-sm font-medium">
// // // //             <li className="relative group">
// // // //               <button
// // // //                 onClick={() => scrollToSection("home")}
// // // //                 className="text-gray-700 group-hover:text-blue-600 transition-all duration-300"
// // // //               >
// // // //                 Home
// // // //               </button>
// // // //               <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
// // // //             </li>
// // // //             <li className="relative group">
// // // //               <button
// // // //                 onClick={() => scrollToSection("vehicles")}
// // // //                 className="text-gray-700 group-hover:text-blue-600 transition-all duration-300"
// // // //               >
// // // //                 Vehicles
// // // //               </button>
// // // //               <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
// // // //             </li>
// // // //             <li className="relative group">
// // // //               <button
// // // //                 onClick={() => scrollToSection("how-it-works")}
// // // //                 className="text-gray-700 group-hover:text-blue-600 transition-all duration-300"
// // // //               >
// // // //                 How It Works
// // // //               </button>
// // // //               <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
// // // //             </li>
// // // //             <li className="relative group">
// // // //               <button
// // // //                 onClick={() => scrollToSection("contact")}
// // // //                 className="text-gray-700 group-hover:text-blue-600 transition-all duration-300"
// // // //               >
// // // //                 Contact
// // // //               </button>
// // // //               <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
// // // //             </li>
// // // //           </ul>

// // // //           <div className="flex items-center gap-4">
// // // //             <Link
// // // //               to="/login"
// // // //               className="px-6 py-2.5 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-all duration-300"
// // // //             >
// // // //               Login
// // // //             </Link>
// // // //             <Link
// // // //               to="/signup"
// // // //               className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 transition-all duration-300 text-white px-7 py-2.5 rounded-full text-sm font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
// // // //             >
// // // //               Sign Up
// // // //             </Link>
// // // //           </div>
// // // //         </div>

// // // //         {/* Mobile Search */}
// // // //         <div className="md:hidden px-6 pb-4">
// // // //           <div className="relative">
// // // //             <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
// // // //               <FaSearch className="text-gray-400" />
// // // //             </div>
// // // //             <input
// // // //               type="text"
// // // //               placeholder="Search vehicles..."
// // // //               value={searchQuery}
// // // //               onChange={(e) => setSearchQuery(e.target.value)}
// // // //               className="w-full pl-12 pr-4 py-3 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-300"
// // // //             />
// // // //           </div>
// // // //         </div>
// // // //       </nav>

// // // //       {/* Hero Section */}
// // // //       <section id="home" className="max-w-7xl mx-auto px-6 py-16">
// // // //         <div className="grid md:grid-cols-2 gap-14 items-center bg-gradient-to-br from-white to-blue-50 rounded-3xl p-10 shadow-3xl border border-blue-100 relative overflow-hidden">
// // // //           <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-32 translate-x-32"></div>
// // // //           <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-full -translate-x-64 translate-y-64"></div>

// // // //           <div className="relative z-10">
// // // //             <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
// // // //               <video
// // // //                 src={heroVideo}
// // // //                 autoPlay
// // // //                 muted
// // // //                 loop
// // // //                 playsInline
// // // //                 className="rounded-2xl w-full h-[380px] object-cover transform group-hover:scale-110 transition-transform duration-700"
// // // //               />
// // // //               <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
// // // //               <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg">
// // // //                 <p className="text-sm font-semibold text-gray-800">
// // // //                   {vehicles.length}+ Vehicles Available
// // // //                 </p>
// // // //                 <p className="text-xs text-gray-600">24/7 pickup service</p>
// // // //               </div>
// // // //             </div>
// // // //           </div>

// // // //           <div className="relative z-10">
// // // //             <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full mb-6 shadow-lg">
// // // //               <FaBolt className="text-blue-600" />
// // // //               <span className="text-sm font-semibold text-blue-700">
// // // //                 Fast & Easy Booking
// // // //               </span>
// // // //             </div>
// // // //             <h2 className="text-[44px] leading-tight font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
// // // //               Discover Your <br />
// // // //               <span className="relative">
// // // //                 Perfect Ride
// // // //                 <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600"></span>
// // // //               </span>
// // // //             </h2>
// // // //             <p className="mt-5 text-gray-600 max-w-md text-lg leading-relaxed">
// // // //               Experience effortless booking and premium rentals with RentRide.
// // // //               Your journey begins with a click.
// // // //             </p>
// // // //             <div className="flex gap-4 mt-8">
// // // //               <button
// // // //                 onClick={() => scrollToSection("vehicles")}
// // // //                 className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-full hover:shadow-lg transition-all"
// // // //               >
// // // //                 Explore Cars
// // // //               </button>
// // // //               <button
// // // //                 onClick={() => scrollToSection("how-it-works")}
// // // //                 className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-all"
// // // //               >
// // // //                 How It Works
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </section>

// // // //       {/* Vehicle Filter Section */}
// // // //       <section id="vehicles" className="max-w-7xl mx-auto px-6 py-10">
// // // //         <div className="text-center mb-8">
// // // //           <h2 className="text-3xl font-bold mb-4">Browse Our Fleet</h2>
// // // //           <p className="text-gray-600 mb-8">
// // // //             Choose from our wide range of vehicles
// // // //           </p>

// // // //           {/* Filter Buttons */}
// // // //           <div className="flex flex-wrap justify-center gap-4 mb-12">
// // // //             {filters.map((filter) => (
// // // //               <button
// // // //                 key={filter}
// // // //                 onClick={() => setActiveFilter(filter)}
// // // //                 className={`px-5 py-2.5 rounded-full transition-all duration-300 ${
// // // //                   activeFilter === filter
// // // //                     ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25"
// // // //                     : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
// // // //                 }`}
// // // //               >
// // // //                 {filter} {filter === "All vehicles" && `(${vehicles.length})`}
// // // //               </button>
// // // //             ))}
// // // //           </div>
// // // //         </div>

// // // //         {/* Vehicles Grid - Enhanced Card Design */}
// // // //         <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
// // // //           {filteredVehicles.map((vehicle) => (
// // // //             <div
// // // //               key={vehicle._id}
// // // //               className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 cursor-pointer hover:-translate-y-2"
// // // //               onClick={() => handleViewDetails(vehicle)}
// // // //             >
// // // //               {/* Wishlist Button */}
// // // //               <button
// // // //                 onClick={(e) => toggleFavorite(vehicle._id, e)}
// // // //                 className="absolute top-4 right-4 z-10 p-2.5 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 transition-transform duration-300"
// // // //               >
// // // //                 <FaHeart
// // // //                   className={`text-lg ${favorites.has(vehicle._id) ? "text-red-500 fill-red-500" : "text-gray-400"}`}
// // // //                 />
// // // //               </button>

// // // //               {/* Status Badge */}
// // // //               <div className="absolute top-4 left-4 z-10">
// // // //                 <span
// // // //                   className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
// // // //                     vehicle.status === "Available"
// // // //                       ? "bg-green-500/90 text-white"
// // // //                       : "bg-red-500/90 text-white"
// // // //                   }`}
// // // //                 >
// // // //                   {vehicle.status}
// // // //                 </span>
// // // //               </div>

// // // //               {/* Car Image */}
// // // //               <div className="h-56 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
// // // //                 <img
// // // //                   src={getVehicleImage(vehicle)}
// // // //                   alt={vehicle.carName}
// // // //                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
// // // //                   onError={(e) => {
// // // //                     e.target.src = sedan;
// // // //                   }}
// // // //                 />
// // // //               </div>

// // // //               {/* Car Details */}
// // // //               <div className="p-6">
// // // //                 <div className="flex justify-between items-start mb-4">
// // // //                   <div className="flex-1">
// // // //                     <div className="flex items-center gap-2 mb-1">
// // // //                       <h3 className="text-xl font-bold text-gray-800 truncate">
// // // //                         {vehicle.carName}
// // // //                       </h3>
// // // //                       <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
// // // //                         {vehicle.carType}
// // // //                       </span>
// // // //                     </div>
// // // //                     <div className="flex items-center text-gray-500 text-sm mb-3">
// // // //                       <FaMapMarkerAlt className="mr-1.5" />
// // // //                       <span>Kathmandu, Nepal</span>
// // // //                     </div>
// // // //                     <div className="flex items-center gap-1 mb-4">
// // // //                       {[...Array(5)].map((_, i) => (
// // // //                         <FaStar
// // // //                           key={i}
// // // //                           className={`text-sm ${
// // // //                             i < Math.floor(getRating(vehicle))
// // // //                               ? "text-yellow-400 fill-yellow-400"
// // // //                               : "text-gray-300"
// // // //                           }`}
// // // //                         />
// // // //                       ))}
// // // //                       <span className="text-gray-500 text-sm ml-2">
// // // //                         {getRating(vehicle)} ({getReviewCount(vehicle)})
// // // //                       </span>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>

// // // //                 {/* Specifications */}
// // // //                 <div className="grid grid-cols-2 gap-3 mb-6">
// // // //                   <div className="flex items-center gap-2">
// // // //                     <div className="p-2 bg-gray-50 rounded-lg">
// // // //                       <FaCogs className="text-gray-600" />
// // // //                     </div>
// // // //                     <div>
// // // //                       <p className="text-xs text-gray-500">Transmission</p>
// // // //                       <p className="font-medium text-gray-800">
// // // //                         {vehicle.gearType}
// // // //                       </p>
// // // //                     </div>
// // // //                   </div>
// // // //                   <div className="flex items-center gap-2">
// // // //                     <div className="p-2 bg-gray-50 rounded-lg">
// // // //                       <FaChair className="text-gray-600" />
// // // //                     </div>
// // // //                     <div>
// // // //                       <p className="text-xs text-gray-500">Seats</p>
// // // //                       <p className="font-medium text-gray-800">
// // // //                         {vehicle.seats}
// // // //                       </p>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>

// // // //                 {/* Price and Action */}
// // // //                 <div className="flex items-center justify-between pt-4 border-t border-gray-100">
// // // //                   <div>
// // // //                     <p className="text-xs text-gray-500">Daily rate</p>
// // // //                     <div className="flex items-baseline">
// // // //                       <span className="text-2xl font-bold text-gray-800">
// // // //                         {formatPrice(vehicle.ratePerDay)}
// // // //                       </span>
// // // //                       <span className="text-gray-500 text-sm ml-1">/day</span>
// // // //                     </div>
// // // //                   </div>
// // // //                   <button
// // // //                     onClick={(e) => {
// // // //                       e.stopPropagation();
// // // //                       handleViewDetails(vehicle);
// // // //                     }}
// // // //                     className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
// // // //                   >
// // // //                     View Details
// // // //                   </button>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           ))}
// // // //         </div>

// // // //         {filteredVehicles.length === 0 && (
// // // //           <div className="text-center py-12">
// // // //             <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
// // // //               <FaCar className="text-gray-400 text-2xl" />
// // // //             </div>
// // // //             <h3 className="text-xl font-semibold text-gray-700 mb-2">
// // // //               No vehicles found
// // // //             </h3>
// // // //             <p className="text-gray-500">
// // // //               {searchQuery
// // // //                 ? `No results for "${searchQuery}"`
// // // //                 : "Try selecting a different category"}
// // // //             </p>
// // // //           </div>
// // // //         )}
// // // //       </section>

// // // //       {/* Vehicle Details Modal */}
// // // //       {showDetailsModal && selectedVehicle && (
// // // //         <div className="fixed inset-0 z-[100]">
// // // //           <div
// // // //             className="absolute inset-0 bg-black/60 backdrop-blur-sm"
// // // //             onClick={() => setShowDetailsModal(false)}
// // // //           ></div>

// // // //           <div className="absolute inset-0 flex items-center justify-center p-4">
// // // //             <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
// // // //               <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center">
// // // //                 <div>
// // // //                   <h2 className="text-3xl font-bold text-gray-900">
// // // //                     {selectedVehicle.carName}
// // // //                   </h2>
// // // //                   <div className="flex items-center gap-3 mt-2">
// // // //                     <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
// // // //                       {selectedVehicle.carType}
// // // //                     </span>
// // // //                     <span
// // // //                       className={`px-3 py-1 rounded-full text-sm font-medium ${
// // // //                         selectedVehicle.status === "Available"
// // // //                           ? "bg-green-100 text-green-600"
// // // //                           : "bg-red-100 text-red-600"
// // // //                       }`}
// // // //                     >
// // // //                       {selectedVehicle.status}
// // // //                     </span>
// // // //                     <span className="text-gray-500">
// // // //                       {selectedVehicle.carNumber}
// // // //                     </span>
// // // //                   </div>
// // // //                 </div>
// // // //                 <button
// // // //                   onClick={() => setShowDetailsModal(false)}
// // // //                   className="p-3 hover:bg-gray-100 rounded-full transition-colors"
// // // //                 >
// // // //                   <span className="text-2xl text-gray-500">×</span>
// // // //                 </button>
// // // //               </div>

// // // //               <div className="p-8">
// // // //                 {/* Gallery */}
// // // //                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
// // // //                   {selectedVehicle.photos &&
// // // //                   selectedVehicle.photos.length > 0 ? (
// // // //                     selectedVehicle.photos.map((photo, index) => (
// // // //                       <div
// // // //                         key={index}
// // // //                         className={`${index === 0 ? "lg:col-span-2" : ""}`}
// // // //                       >
// // // //                         <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden">
// // // //                           <img
// // // //                             src={`http://localhost:5000/uploads/${selectedVehicle.source === "user" ? "user-vehicles" : "vehicles"}/${photo.filename}`}
// // // //                             alt={photo.label}
// // // //                             className="w-full h-full object-cover"
// // // //                           />
// // // //                           <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm backdrop-blur-sm">
// // // //                             {photo.label}
// // // //                           </div>
// // // //                         </div>
// // // //                       </div>
// // // //                     ))
// // // //                   ) : (
// // // //                     <div className="lg:col-span-3 h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
// // // //                       <FaCar className="text-8xl text-gray-300" />
// // // //                     </div>
// // // //                   )}
// // // //                 </div>

// // // //                 {/* Main Details */}
// // // //                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// // // //                   {/* Left Column - Specifications */}
// // // //                   <div className="lg:col-span-2">
// // // //                     <h3 className="text-2xl font-bold text-gray-900 mb-6">
// // // //                       Specifications
// // // //                     </h3>
// // // //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // //                       {[
// // // //                         {
// // // //                           icon: FaCogs,
// // // //                           label: "Transmission",
// // // //                           value: selectedVehicle.gearType,
// // // //                         },
// // // //                         {
// // // //                           icon: FaChair,
// // // //                           label: "Seats",
// // // //                           value: `${selectedVehicle.seats} Persons`,
// // // //                         },
// // // //                         {
// // // //                           icon: FaSnowflake,
// // // //                           label: "Air Conditioning",
// // // //                           value: selectedVehicle.airCondition,
// // // //                         },
// // // //                         {
// // // //                           icon: FaUserTie,
// // // //                           label: "Driver",
// // // //                           value: selectedVehicle.driverName || "Not Included",
// // // //                         },
// // // //                         {
// // // //                           icon: FaPhone,
// // // //                           label: "Contact",
// // // //                           value: selectedVehicle.phoneNumber,
// // // //                         },
// // // //                         {
// // // //                           icon: FaCalendarAlt,
// // // //                           label: "Booking Type",
// // // //                           value: selectedVehicle.bookingType,
// // // //                         },
// // // //                       ].map((spec, index) => (
// // // //                         <div
// // // //                           key={index}
// // // //                           className="flex items-center p-4 bg-gray-50 rounded-xl"
// // // //                         >
// // // //                           <div className="p-3 bg-white rounded-lg shadow-sm mr-4">
// // // //                             <spec.icon className="text-blue-600" />
// // // //                           </div>
// // // //                           <div>
// // // //                             <p className="text-sm text-gray-500">
// // // //                               {spec.label}
// // // //                             </p>
// // // //                             <p className="font-semibold text-gray-900">
// // // //                               {spec.value}
// // // //                             </p>
// // // //                           </div>
// // // //                         </div>
// // // //                       ))}
// // // //                     </div>

// // // //                     {/* Features */}
// // // //                     {selectedVehicle.features &&
// // // //                       selectedVehicle.features.length > 0 && (
// // // //                         <div className="mt-10">
// // // //                           <h3 className="text-2xl font-bold text-gray-900 mb-6">
// // // //                             Features & Amenities
// // // //                           </h3>
// // // //                           <div className="flex flex-wrap gap-3">
// // // //                             {selectedVehicle.features.map((feature, index) => (
// // // //                               <span
// // // //                                 key={index}
// // // //                                 className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium"
// // // //                               >
// // // //                                 {feature}
// // // //                               </span>
// // // //                             ))}
// // // //                           </div>
// // // //                         </div>
// // // //                       )}

// // // //                     {/* Description */}
// // // //                     {selectedVehicle.description && (
// // // //                       <div className="mt-10">
// // // //                         <h3 className="text-2xl font-bold text-gray-900 mb-4">
// // // //                           Description
// // // //                         </h3>
// // // //                         <p className="text-gray-600 leading-relaxed">
// // // //                           {selectedVehicle.description}
// // // //                         </p>
// // // //                       </div>
// // // //                     )}
// // // //                   </div>

// // // //                   {/* Right Column - Pricing & Booking */}
// // // //                   <div className="lg:col-span-1">
// // // //                     <div className="sticky top-24 bg-gradient-to-b from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-lg">
// // // //                       <div className="text-center mb-6">
// // // //                         <p className="text-gray-500 mb-2">Daily Rate</p>
// // // //                         <div className="flex items-baseline justify-center">
// // // //                           <span className="text-5xl font-bold text-gray-900">
// // // //                             रु{selectedVehicle.ratePerDay}
// // // //                           </span>
// // // //                           <span className="text-gray-500 ml-2">/day</span>
// // // //                         </div>
// // // //                       </div>

// // // //                       <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
// // // //                         <div className="flex items-start">
// // // //                           <FaInfoCircle className="text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
// // // //                           <div>
// // // //                             <h4 className="font-semibold text-blue-800 mb-1">
// // // //                               Complete Price Breakdown
// // // //                             </h4>
// // // //                             <p className="text-sm text-blue-700">
// // // //                               Full price calculation including optional extras
// // // //                               will be shown during booking.
// // // //                             </p>
// // // //                           </div>
// // // //                         </div>
// // // //                       </div>

// // // //                       <button
// // // //                         onClick={() => {
// // // //                           handleBookNow(selectedVehicle);
// // // //                           setShowDetailsModal(false);
// // // //                         }}
// // // //                         className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-green-500/30 hover:scale-105 transition-all duration-300"
// // // //                       >
// // // //                         Book This Vehicle
// // // //                       </button>

// // // //                       <div className="mt-6 text-center">
// // // //                         <p className="text-gray-500 text-sm">
// // // //                           • Free cancellation • 24/7 support • Instant
// // // //                           confirmation
// // // //                         </p>
// // // //                       </div>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {/* Key Features */}
// // // //       <section className="max-w-7xl mx-auto px-6 py-10">
// // // //         <div className="text-center mb-16">
// // // //           <div className="inline-flex items-center gap-3 mb-4">
// // // //             <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
// // // //             <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
// // // //               Why Choose Us
// // // //             </h3>
// // // //             <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
// // // //           </div>
// // // //           <h2 className="text-4xl font-bold mt-2">Key Features</h2>
// // // //           <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
// // // //             Experience premium car rental service with our standout features
// // // //           </p>
// // // //         </div>
// // // //         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
// // // //           <Feature
// // // //             icon={<FaClock className="text-2xl" />}
// // // //             title="Instant Availability"
// // // //             desc="Real-time booking with instant confirmation"
// // // //             gradient="from-blue-500 to-blue-600"
// // // //           />
// // // //           <Feature
// // // //             icon={<FaCar className="text-2xl" />}
// // // //             title="Comfortable Rides"
// // // //             desc="Premium vehicles with latest amenities"
// // // //             gradient="from-purple-500 to-purple-600"
// // // //           />
// // // //           <Feature
// // // //             icon={<FaDollarSign className="text-2xl" />}
// // // //             title="Best Pricing"
// // // //             desc="Competitive rates with no hidden charges"
// // // //             gradient="from-green-500 to-green-600"
// // // //           />
// // // //           <Feature
// // // //             icon={<FaShieldAlt className="text-2xl" />}
// // // //             title="No Hidden Fees"
// // // //             desc="Transparent pricing, all fees included"
// // // //             gradient="from-orange-500 to-orange-600"
// // // //           />
// // // //         </div>
// // // //       </section>

// // // //       {/* Advantages */}
// // // //       <section className="max-w-7xl mx-auto px-6 py-16">
// // // //         <div className="text-center mb-16">
// // // //           <div className="inline-flex items-center gap-3 mb-4">
// // // //             <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
// // // //             <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
// // // //               Our Benefits
// // // //             </h3>
// // // //             <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
// // // //           </div>
// // // //           <h2 className="text-4xl font-bold mt-2">RentRide Advantages</h2>
// // // //           <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
// // // //             Discover why thousands choose RentRide
// // // //           </p>
// // // //         </div>
// // // //         <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
// // // //           <Advantage
// // // //             icon={<FaDollarSign className="text-2xl" />}
// // // //             title="Best price guarantee"
// // // //             desc="We guarantee the best prices in the market"
// // // //             color="green"
// // // //             stat={`${vehicles.length}+ Vehicles`}
// // // //           />
// // // //           <Advantage
// // // //             icon={<FaUserTie className="text-2xl" />}
// // // //             title="Professional drivers"
// // // //             desc="Highly trained and certified drivers"
// // // //             color="blue"
// // // //             stat="500+ Drivers"
// // // //           />
// // // //           <Advantage
// // // //             icon={<FaTruck className="text-2xl" />}
// // // //             title="Doorstep delivery"
// // // //             desc="Get your car delivered to your location"
// // // //             color="purple"
// // // //             stat="24/7 Delivery"
// // // //           />
// // // //           <Advantage
// // // //             icon={<FaHeadset className="text-2xl" />}
// // // //             title="24/7 support"
// // // //             desc="Round-the-clock customer support"
// // // //             color="orange"
// // // //             stat="Instant Response"
// // // //           />
// // // //           <Advantage
// // // //             icon={<FaCar className="text-2xl" />}
// // // //             title="Wide vehicle range"
// // // //             desc="Choose from economy to luxury"
// // // //             color="red"
// // // //             stat={`${vehicles.length} Models`}
// // // //           />
// // // //         </div>
// // // //       </section>

// // // //       {/* How it Works */}
// // // //       <section
// // // //         id="how-it-works"
// // // //         className="max-w-7xl mx-auto px-6 py-20 bg-gradient-to-br from-white to-blue-50 rounded-3xl my-16 shadow-3xl relative overflow-hidden"
// // // //       >
// // // //         <div className="text-center mb-16 relative z-10">
// // // //           <div className="inline-flex items-center gap-3 mb-4">
// // // //             <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
// // // //             <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
// // // //               Process
// // // //             </h3>
// // // //             <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
// // // //           </div>
// // // //           <h2 className="text-4xl font-bold mt-2">How It Works</h2>
// // // //           <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
// // // //             Simple steps to get your perfect ride
// // // //           </p>
// // // //         </div>
// // // //         <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto relative z-10">
// // // //           <Step
// // // //             number="01"
// // // //             title="Choose Vehicle"
// // // //             desc="Browse our fleet and select your preferred vehicle"
// // // //             icon={<FaCar />}
// // // //           />
// // // //           <Step
// // // //             number="02"
// // // //             title="Book & Pay"
// // // //             desc="Select dates, add extras, and complete secure payment"
// // // //             icon={<FaCreditCard />}
// // // //           />
// // // //           <Step
// // // //             number="03"
// // // //             title="Get Your Vehicle"
// // // //             desc="Pick up from our location or get doorstep delivery"
// // // //             icon={<FaMapMarkerAlt />}
// // // //           />
// // // //         </div>
// // // //       </section>

// // // //       {/* Delivery Information */}
// // // //       <section className="max-w-7xl mx-auto px-6 py-16">
// // // //         <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-10">
// // // //           <div className="text-center mb-10">
// // // //             <h2 className="text-3xl font-bold text-gray-800">
// // // //               Delivery Options
// // // //             </h2>
// // // //             <p className="text-gray-600 mt-2">
// // // //               Choose how you want to receive your vehicle
// // // //             </p>
// // // //           </div>
// // // //           <div className="grid md:grid-cols-2 gap-8">
// // // //             <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all">
// // // //               <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
// // // //                 <FaMapMarkerAlt className="text-blue-600 text-2xl" />
// // // //               </div>
// // // //               <h3 className="text-xl font-bold text-gray-800 mb-2">
// // // //                 Pickup from Location
// // // //               </h3>
// // // //               <p className="text-gray-600">
// // // //                 Collect your vehicle from our nearest branch. Our team will
// // // //                 assist you with the handover process.
// // // //               </p>
// // // //               <ul className="mt-4 text-left text-sm text-gray-500 space-y-2">
// // // //                 <li className="flex items-center gap-2">
// // // //                   <FaCheckCircle className="text-green-500 text-sm" /> Free
// // // //                   pickup service
// // // //                 </li>
// // // //                 <li className="flex items-center gap-2">
// // // //                   <FaCheckCircle className="text-green-500 text-sm" /> Vehicle
// // // //                   inspection on site
// // // //                 </li>
// // // //                 <li className="flex items-center gap-2">
// // // //                   <FaCheckCircle className="text-green-500 text-sm" /> Document
// // // //                   verification
// // // //                 </li>
// // // //               </ul>
// // // //             </div>
// // // //             <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all">
// // // //               <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
// // // //                 <FaTruck className="text-purple-600 text-2xl" />
// // // //               </div>
// // // //               <h3 className="text-xl font-bold text-gray-800 mb-2">
// // // //                 Doorstep Delivery
// // // //               </h3>
// // // //               <p className="text-gray-600">
// // // //                 Get your vehicle delivered to your home, hotel, or office. Our
// // // //                 driver will bring the car to you.
// // // //               </p>
// // // //               <ul className="mt-4 text-left text-sm text-gray-500 space-y-2">
// // // //                 <li className="flex items-center gap-2">
// // // //                   <FaCheckCircle className="text-green-500 text-sm" /> Delivery
// // // //                   within Kathmandu Valley
// // // //                 </li>
// // // //                 <li className="flex items-center gap-2">
// // // //                   <FaCheckCircle className="text-green-500 text-sm" /> Free
// // // //                   delivery for 3+ days booking
// // // //                 </li>
// // // //                 <li className="flex items-center gap-2">
// // // //                   <FaCheckCircle className="text-green-500 text-sm" /> Real-time
// // // //                   tracking available
// // // //                 </li>
// // // //               </ul>
// // // //             </div>
// // // //           </div>
// // // //           <div className="mt-8 text-center">
// // // //             <p className="text-sm text-gray-500">
// // // //               After booking confirmation, you'll receive a call from our support
// // // //               team to confirm delivery/pickup details.
// // // //             </p>
// // // //           </div>
// // // //         </div>
// // // //       </section>

// // // //       {/* Testimonials */}
// // // //       <section className="max-w-7xl mx-auto px-6 py-16">
// // // //         <div className="text-center mb-16">
// // // //           <div className="inline-flex items-center gap-3 mb-4">
// // // //             <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
// // // //             <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
// // // //               Testimonials
// // // //             </h3>
// // // //             <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
// // // //           </div>
// // // //           <h2 className="text-4xl font-bold mt-2">What Our Customers Say</h2>
// // // //           <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
// // // //             Join thousands of satisfied customers who trust RentRide
// // // //           </p>
// // // //         </div>
// // // //         <div className="grid md:grid-cols-3 gap-8">
// // // //           <Testimonial
// // // //             name="Bijay Pandey"
// // // //             role="Business Traveler"
// // // //             text="RentRide made renting a car incredibly easy and stress-free. The vehicle was spotless and perfectly maintained."
// // // //             rating={5}
// // // //             avatarColor="bg-blue-100"
// // // //           />
// // // //           <Testimonial
// // // //             name="Yogesh Bikram Shah"
// // // //             role="Family Vacationer"
// // // //             text="Wide selection of vehicles and competitive pricing. Our family trip was comfortable thanks to their excellent service."
// // // //             rating={4}
// // // //             avatarColor="bg-green-100"
// // // //           />
// // // //           <Testimonial
// // // //             name="Aashriti Karki"
// // // //             role="Adventure Seeker"
// // // //             text="Support team was very helpful and responsive. The 4x4 I rented handled mountain roads perfectly!"
// // // //             rating={5}
// // // //             avatarColor="bg-purple-100"
// // // //           />
// // // //         </div>
// // // //       </section>

// // // //       {/* FAQ */}
// // // //       <section className="max-w-7xl mx-auto px-6 py-16">
// // // //         <div className="text-center mb-16">
// // // //           <div className="inline-flex items-center gap-3 mb-4">
// // // //             <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
// // // //             <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
// // // //               FAQ
// // // //             </h3>
// // // //             <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
// // // //           </div>
// // // //           <h2 className="text-4xl font-bold mt-2">
// // // //             Frequently Asked Questions
// // // //           </h2>
// // // //           <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
// // // //             Get answers to common questions
// // // //           </p>
// // // //         </div>
// // // //         <div className="space-y-4 max-w-3xl mx-auto">
// // // //           <Faq
// // // //             q="How do I book a car?"
// // // //             a="Simply choose a vehicle, select your dates, add any extras, and confirm booking with secure payment. You'll receive instant confirmation."
// // // //           />
// // // //           <Faq
// // // //             q="What is included in the insurance?"
// // // //             a="Comprehensive insurance covering collision damage, theft, and third-party liability is included in all rentals."
// // // //           />
// // // //           <Faq
// // // //             q="What payment methods are accepted?"
// // // //             a="We accept all major credit cards, debit cards, digital wallets (Khalti, eSewa), and bank transfers."
// // // //           />
// // // //           <Faq
// // // //             q="How does delivery work after confirmation?"
// // // //             a="After booking confirmation, our support team will contact you within 2 hours to confirm delivery/pickup details. For doorstep delivery, the vehicle will be delivered to your specified location. For pickup, you can collect from our nearest branch."
// // // //           />
// // // //         </div>
// // // //       </section>

// // // //       {/* CTA Section */}
// // // //       <section className="max-w-7xl mx-auto px-6 py-20">
// // // //         <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-3xl p-12 text-center text-white shadow-3xl relative overflow-hidden">
// // // //           <div className="relative z-10">
// // // //             <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full mb-8">
// // // //               <FaCrown className="text-yellow-300" />
// // // //               <span className="font-semibold">Premium Service Guaranteed</span>
// // // //             </div>
// // // //             <h2 className="text-4xl font-bold mb-6">Ready to Hit the Road?</h2>
// // // //             <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
// // // //               Join thousands of satisfied customers and experience premium car
// // // //               rental service like never before
// // // //             </p>
// // // //             <div className="flex flex-col sm:flex-row gap-6 justify-center">
// // // //               <Link
// // // //                 to="/signup"
// // // //                 className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-12 rounded-xl transition-all duration-300 hover:-translate-y-1 shadow-2xl hover:shadow-3xl flex items-center justify-center gap-3 group"
// // // //               >
// // // //                 <FaCar className="group-hover:scale-110 transition-transform" />
// // // //                 Sign Up Now
// // // //               </Link>
// // // //               <Link
// // // //                 to="/login"
// // // //                 className="bg-transparent border-2 border-white hover:bg-white/20 font-bold py-4 px-12 rounded-xl transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
// // // //               >
// // // //                 Login to Account
// // // //               </Link>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </section>

// // // //       {/* Footer */}
// // // //       <footer
// // // //         id="contact"
// // // //         className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16"
// // // //       >
// // // //         <div className="max-w-7xl mx-auto px-6">
// // // //           <div className="grid md:grid-cols-4 gap-12 mb-12">
// // // //             <div>
// // // //               {/* <div className="flex items-center gap-3 mb-8">
// // // //                 <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-lg">
// // // //                   <FaCar className="text-white text-2xl" />
// // // //                 </div>
// // // //                 <h1 className="text-2xl font-bold">
// // // //                   Rent<span className="text-blue-400">Ride</span>
// // // //                 </h1>
// // // //               </div> */}

// // // //               <div className="flex items-center gap-3 mb-8">
// // // //                 <div className="p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
// // // //                   <FaCar className="text-white text-2xl" />
// // // //                 </div>
// // // //                 <div>
// // // //                   <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
// // // //                     Rent<span className="text-white">Ride</span>
// // // //                   </h1>
// // // //                   <p className="text-xs text-gray-400 -mt-1">
// // // //                     Premium Car Rentals
// // // //                   </p>
// // // //                 </div>
// // // //               </div>
// // // //               <p className="text-gray-400 text-sm leading-relaxed mb-6">
// // // //                 Premium car rental service offering the best rates and
// // // //                 exceptional customer experience in Nepal.
// // // //               </p>
// // // //               <div className="flex gap-4">
// // // //                 <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
// // // //                   <FaFacebook />
// // // //                 </div>
// // // //                 <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
// // // //                   <FaTwitter />
// // // //                 </div>
// // // //                 <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
// // // //                   <FaInstagram />
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //             <div>
// // // //               <h4 className="font-bold text-lg mb-8 relative inline-block">
// // // //                 Quick Links
// // // //                 <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></span>
// // // //               </h4>
// // // //               <ul className="space-y-4 text-gray-400 text-sm">
// // // //                 <li className="hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-2 flex items-center gap-2">
// // // //                   <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
// // // //                   About Us
// // // //                 </li>
// // // //                 <li className="hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-2 flex items-center gap-2">
// // // //                   <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
// // // //                   Contact Support
// // // //                 </li>
// // // //                 <li className="hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-2 flex items-center gap-2">
// // // //                   <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
// // // //                   Privacy Policy
// // // //                 </li>
// // // //                 <li className="hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-2 flex items-center gap-2">
// // // //                   <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
// // // //                   Terms & Conditions
// // // //                 </li>
// // // //               </ul>
// // // //             </div>
// // // //             <div>
// // // //               <h4 className="font-bold text-lg mb-8 relative inline-block">
// // // //                 Our Services
// // // //                 <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></span>
// // // //               </h4>
// // // //               <ul className="space-y-4 text-gray-400 text-sm">
// // // //                 <li className="hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-2 flex items-center gap-2">
// // // //                   <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
// // // //                   Airport Rentals
// // // //                 </li>
// // // //                 <li className="hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-2 flex items-center gap-2">
// // // //                   <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
// // // //                   Luxury Cars
// // // //                 </li>
// // // //                 <li className="hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-2 flex items-center gap-2">
// // // //                   <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
// // // //                   Long Term Rentals
// // // //                 </li>
// // // //                 <li className="hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-2 flex items-center gap-2">
// // // //                   <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
// // // //                   Doorstep Delivery
// // // //                 </li>
// // // //               </ul>
// // // //             </div>
// // // //             <div>
// // // //               <h4 className="font-bold text-lg mb-8 relative inline-block">
// // // //                 Contact Info
// // // //                 <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></span>
// // // //               </h4>
// // // //               <ul className="space-y-4 text-gray-400 text-sm">
// // // //                 <li className="flex items-start gap-3">
// // // //                   <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
// // // //                     📍
// // // //                   </div>
// // // //                   <span>Kathmandu, Nepal</span>
// // // //                 </li>
// // // //                 <li className="flex items-start gap-3">
// // // //                   <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
// // // //                     📞
// // // //                   </div>
// // // //                   <span>+977 9844177965</span>
// // // //                 </li>
// // // //                 <li className="flex items-start gap-3">
// // // //                   <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
// // // //                     ✉️
// // // //                   </div>
// // // //                   <span>support@rentride.com</span>
// // // //                 </li>
// // // //                 <li className="flex items-start gap-3">
// // // //                   <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
// // // //                     🕐
// // // //                   </div>
// // // //                   <span>24/7 Customer Support</span>
// // // //                 </li>
// // // //               </ul>
// // // //             </div>
// // // //           </div>

// // // //           <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
// // // //             <p>© {new Date().getFullYear()} RentRide. All rights reserved.</p>
// // // //             <p className="mt-2 text-xs">
// // // //               Premium car rental service in Kathmandu, Nepal
// // // //             </p>
// // // //           </div>
// // // //         </div>
// // // //       </footer>
// // // //     </div>
// // // //   );
// // // // }

// // // // /* Components */
// // // // function Feature({
// // // //   icon,
// // // //   title,
// // // //   desc,
// // // //   gradient = "from-blue-500 to-blue-600",
// // // // }) {
// // // //   return (
// // // //     <div className="group relative">
// // // //       <div className="absolute -inset-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 blur transition duration-500 group-hover:duration-200 rounded-2xl"></div>
// // // //       <div className="relative bg-white rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 border border-gray-100">
// // // //         <div
// // // //           className={`bg-gradient-to-br ${gradient} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
// // // //         >
// // // //           {icon}
// // // //         </div>
// // // //         <h4 className="font-bold text-xl mb-3 group-hover:text-blue-600 transition-colors">
// // // //           {title}
// // // //         </h4>
// // // //         <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
// // // //         <div className="mt-6 h-1 w-12 bg-gradient-to-r from-gray-200 to-transparent group-hover:from-blue-500 transition-all duration-300"></div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // function Advantage({ icon, title, desc, color = "blue", stat }) {
// // // //   const colorClasses = {
// // // //     blue: "from-blue-500 to-blue-600",
// // // //     green: "from-green-500 to-green-600",
// // // //     purple: "from-purple-500 to-purple-600",
// // // //     orange: "from-orange-500 to-orange-600",
// // // //     red: "from-red-500 to-red-600",
// // // //   };

// // // //   return (
// // // //     <div className="group relative">
// // // //       <div className="absolute -inset-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 blur transition duration-500 group-hover:duration-200 rounded-2xl"></div>
// // // //       <div className="relative bg-white rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
// // // //         <div
// // // //           className={`bg-gradient-to-br ${colorClasses[color]} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
// // // //         >
// // // //           {icon}
// // // //         </div>
// // // //         <h4 className="font-bold text-xl mb-3 group-hover:text-gray-800 transition-colors">
// // // //           {title}
// // // //         </h4>
// // // //         <p className="text-gray-600 text-sm leading-relaxed mb-4">{desc}</p>
// // // //         {stat && (
// // // //           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gray-50 to-gray-100 text-sm font-semibold">
// // // //             <FaCheckCircle className="text-green-500" />
// // // //             <span>{stat}</span>
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // function Step({ number, title, desc, icon }) {
// // // //   return (
// // // //     <div className="relative z-20">
// // // //       <div className="text-center bg-white p-10 rounded-2xl shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 group">
// // // //         <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 relative">
// // // //           {number}
// // // //         </div>
// // // //         <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center mx-auto mb-4 text-blue-600">
// // // //           {icon}
// // // //         </div>
// // // //         <h4 className="font-bold text-xl mb-4 group-hover:text-blue-600 transition-colors">
// // // //           {title}
// // // //         </h4>
// // // //         <p className="text-gray-600 leading-relaxed">{desc}</p>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // function Testimonial({
// // // //   name,
// // // //   role,
// // // //   text,
// // // //   rating,
// // // //   avatarColor = "bg-blue-100",
// // // // }) {
// // // //   return (
// // // //     <div className="group">
// // // //       <div className="bg-white rounded-2xl p-10 shadow-2xl hover:shadow-3xl border border-gray-100 transition-all duration-500 hover:-translate-y-3">
// // // //         <div className="flex mb-6">
// // // //           {[...Array(5)].map((_, i) => (
// // // //             <FaStar
// // // //               key={i}
// // // //               className={`text-lg ${
// // // //                 i < rating ? "text-yellow-400" : "text-gray-300"
// // // //               }`}
// // // //             />
// // // //           ))}
// // // //         </div>
// // // //         <p className="text-gray-700 text-lg leading-relaxed italic mb-8">
// // // //           "{text}"
// // // //         </p>
// // // //         <div className="flex items-center pt-8 border-t border-gray-100">
// // // //           <div
// // // //             className={`w-14 h-14 rounded-full ${avatarColor} flex items-center justify-center text-2xl font-bold mr-4 shadow-lg`}
// // // //           >
// // // //             {name.charAt(0)}
// // // //           </div>
// // // //           <div>
// // // //             <p className="font-bold text-gray-900 text-lg">{name}</p>
// // // //             <p className="text-sm text-gray-500">{role}</p>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // function Faq({ q, a }) {
// // // //   const [open, setOpen] = useState(false);
// // // //   return (
// // // //     <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group">
// // // //       <button
// // // //         onClick={() => setOpen(!open)}
// // // //         className="w-full flex justify-between items-center p-8 text-left hover:bg-gray-50 transition-colors duration-300"
// // // //       >
// // // //         <div className="flex items-start gap-4">
// // // //           <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
// // // //             <span className="text-blue-600 font-semibold">?</span>
// // // //           </div>
// // // //           <span className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
// // // //             {q}
// // // //           </span>
// // // //         </div>
// // // //         <div
// // // //           className={`w-10 h-10 rounded-full bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center transition-all duration-300 ${
// // // //             open ? "rotate-180 bg-blue-100" : ""
// // // //           }`}
// // // //         >
// // // //           <FaChevronDown className="text-blue-600" />
// // // //         </div>
// // // //       </button>
// // // //       {open && (
// // // //         <div className="px-8 pb-8">
// // // //           <div className="pl-12 border-l-2 border-blue-200">
// // // //             <p className="text-gray-600 leading-relaxed">{a}</p>
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }

// // // import { Link } from "react-router-dom";
// // // import { useState, useEffect } from "react";
// // // import {
// // //   FaCar,
// // //   FaDollarSign,
// // //   FaShieldAlt,
// // //   FaClock,
// // //   FaUserTie,
// // //   FaTruck,
// // //   FaHeadset,
// // //   FaChevronDown,
// // //   FaStar,
// // //   FaCheckCircle,
// // //   FaMapMarkerAlt,
// // //   FaBolt,
// // //   FaCrown,
// // //   FaHeart,
// // //   FaRegHeart,
// // //   FaUsers,
// // //   FaSnowflake,
// // //   FaCogs,
// // //   FaChair,
// // //   FaInfoCircle,
// // //   FaSearch,
// // //   FaPhone,
// // //   FaCalendarAlt,
// // //   FaEnvelope,
// // //   FaUserCircle,
// // //   FaArrowRight,
// // //   FaCreditCard,
// // //   FaIdCard,
// // //   FaFacebook,
// // //   FaTwitter,
// // //   FaInstagram,
// // //   FaWhatsapp,
// // //   FaArrowUp,
// // // } from "react-icons/fa";
// // // import { motion, AnimatePresence } from "framer-motion";
// // // import axios from "axios";
// // // import { useNavigate } from "react-router-dom";

// // // /* Image imports */
// // // import heroVideo from "../../assets/Dashboard/INtro.mp4";
// // // import sedan from "../../assets/Dashboard/sedan.jpg";
// // // import suv from "../../assets/Dashboard/suv.jpg";
// // // import ev from "../../assets/Dashboard/ev.jpg";
// // // import convertible from "../../assets/Dashboard/convertible.jpg";
// // // import minivan from "../../assets/Dashboard/minivan.jpg";
// // // import sport from "../../assets/Dashboard/sport.jpg";

// // // const API_URL = "http://localhost:5000/api";

// // // export default function App() {
// // //   const [favorites, setFavorites] = useState(new Set());
// // //   const [vehicles, setVehicles] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState("");
// // //   const [filteredVehicles, setFilteredVehicles] = useState([]);
// // //   const [activeFilter, setActiveFilter] = useState("All vehicles");
// // //   const [searchQuery, setSearchQuery] = useState("");
// // //   const [selectedVehicle, setSelectedVehicle] = useState(null);
// // //   const [showDetailsModal, setShowDetailsModal] = useState(false);
// // //   const [showScrollTop, setShowScrollTop] = useState(false);
// // //   const [activeNav, setActiveNav] = useState("home");
// // //   const navigate = useNavigate();

// // //   const filters = [
// // //     "All vehicles",
// // //     "Sedan",
// // //     "SUV",
// // //     "Hatchback",
// // //     "MPV",
// // //     "Coupe",
// // //     "Convertible",
// // //     "Pickup",
// // //     "Minivan",
// // //     "Electric",
// // //   ];

// // //   // Scroll to top button visibility
// // //   useEffect(() => {
// // //     const handleScroll = () => {
// // //       setShowScrollTop(window.scrollY > 500);
// // //       const sections = ["home", "vehicles", "how-it-works", "contact"];
// // //       for (const section of sections) {
// // //         const element = document.getElementById(section);
// // //         if (element) {
// // //           const rect = element.getBoundingClientRect();
// // //           if (rect.top <= 100 && rect.bottom >= 100) {
// // //             setActiveNav(section);
// // //             break;
// // //           }
// // //         }
// // //       }
// // //     };
// // //     window.addEventListener("scroll", handleScroll);
// // //     return () => window.removeEventListener("scroll", handleScroll);
// // //   }, []);

// // //   // Fetch vehicles
// // //   useEffect(() => {
// // //     fetchVehicles();
// // //   }, []);

// // //   const fetchVehicles = async () => {
// // //     try {
// // //       setLoading(true);
// // //       setError("");

// // //       const adminResponse = await axios.get(
// // //         "http://localhost:5000/api/vehicles",
// // //         { timeout: 10000 },
// // //       );

// // //       let userVehicles = [];
// // //       try {
// // //         const userResponse = await axios.get(
// // //           "http://localhost:5000/api/user-vehicles/public/active",
// // //           { timeout: 10000 },
// // //         );
// // //         if (userResponse.data.success) userVehicles = userResponse.data.data;
// // //       } catch (userError) {
// // //         console.log("Could not fetch user vehicles:", userError.message);
// // //       }

// // //       let allVehicles = [];
// // //       if (adminResponse.data && Array.isArray(adminResponse.data)) {
// // //         allVehicles = [...adminResponse.data];
// // //       } else if (
// // //         adminResponse.data?.data &&
// // //         Array.isArray(adminResponse.data.data)
// // //       ) {
// // //         allVehicles = [...adminResponse.data.data];
// // //       }

// // //       userVehicles.forEach((userVehicle) =>
// // //         allVehicles.push({ ...userVehicle, source: "user" }),
// // //       );

// // //       setVehicles(allVehicles);
// // //       setFilteredVehicles(allVehicles);
// // //     } catch (error) {
// // //       console.error("Error fetching vehicles:", error);
// // //       setError("Failed to load vehicles. Please try again.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const toggleFavorite = (vehicleId, e) => {
// // //     e?.stopPropagation();
// // //     const newWishlist = new Set(favorites);
// // //     if (newWishlist.has(vehicleId)) {
// // //       newWishlist.delete(vehicleId);
// // //     } else {
// // //       newWishlist.add(vehicleId);
// // //     }
// // //     setFavorites(newWishlist);
// // //   };

// // //   useEffect(() => {
// // //     const filtered = vehicles.filter((vehicle) => {
// // //       const matchesFilter =
// // //         activeFilter === "All vehicles" ||
// // //         vehicle.carType?.toLowerCase() === activeFilter.toLowerCase();
// // //       const matchesSearch =
// // //         searchQuery === "" ||
// // //         vehicle.carName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
// // //         vehicle.carType?.toLowerCase().includes(searchQuery.toLowerCase());
// // //       return matchesFilter && matchesSearch;
// // //     });
// // //     setFilteredVehicles(filtered);
// // //   }, [activeFilter, searchQuery, vehicles]);

// // //   const getVehicleImage = (vehicle) => {
// // //     if (vehicle.photos?.length > 0) {
// // //       const extraView = vehicle.photos.find(
// // //         (photo) => photo.label === "Extra View",
// // //       );
// // //       const photo = extraView || vehicle.photos[0];
// // //       const folder = vehicle.source === "user" ? "user-vehicles" : "vehicles";
// // //       return `http://localhost:5000/uploads/${folder}/${photo.filename}`;
// // //     }
// // //     switch (vehicle.carType) {
// // //       case "SUV":
// // //         return suv;
// // //       case "Sedan":
// // //         return sedan;
// // //       case "Hatchback":
// // //         return sedan;
// // //       case "MPV":
// // //         return minivan;
// // //       case "Convertible":
// // //         return convertible;
// // //       case "Coupe":
// // //         return sport;
// // //       case "Pickup":
// // //         return suv;
// // //       case "Minivan":
// // //         return minivan;
// // //       case "Electric":
// // //         return ev;
// // //       default:
// // //         return sedan;
// // //     }
// // //   };

// // //   const handleViewDetails = (vehicle) => {
// // //     setSelectedVehicle(vehicle);
// // //     setShowDetailsModal(true);
// // //   };

// // //   const handleBookNow = (vehicle) => {
// // //     navigate(`/booking/${vehicle._id}`);
// // //   };

// // //   const formatPrice = (price) => `रु ${price.toLocaleString()}`;

// // //   const scrollToTop = () => {
// // //     window.scrollTo({ top: 0, behavior: "smooth" });
// // //   };

// // //   const scrollToSection = (sectionId) => {
// // //     const section = document.getElementById(sectionId);
// // //     if (section) {
// // //       section.scrollIntoView({ behavior: "smooth" });
// // //       setActiveNav(sectionId);
// // //     }
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
// // //         <div className="text-center">
// // //           <div className="relative w-24 h-24 mx-auto mb-6">
// // //             <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full"></div>
// // //             <div className="absolute inset-0 border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
// // //             <div className="absolute inset-2 border-4 border-t-transparent border-r-blue-500 border-b-transparent border-l-transparent rounded-full animate-spin animation-delay-300"></div>
// // //             <FaCar className="absolute inset-0 m-auto text-white text-2xl animate-pulse" />
// // //           </div>
// // //           <p className="text-white/80 text-lg">Loading premium vehicles...</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (error) {
// // //     return (
// // //       <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 flex items-center justify-center">
// // //         <div className="text-center max-w-md mx-auto p-8 bg-white/10 backdrop-blur-lg rounded-2xl">
// // //           <div className="text-6xl mb-4">⚠️</div>
// // //           <h3 className="text-xl font-semibold text-white mb-2">
// // //             Something went wrong
// // //           </h3>
// // //           <p className="text-white/70 mb-6">{error}</p>
// // //           <button
// // //             onClick={fetchVehicles}
// // //             className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
// // //           >
// // //             Try Again
// // //           </button>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="font-sans text-gray-900 bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
// // //       {/* Navbar */}
// // //       <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100">
// // //         <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
// // //           <div
// // //             className="flex items-center gap-3 cursor-pointer group"
// // //             onClick={() => scrollToSection("home")}
// // //           >
// // //             <div className="p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
// // //               <FaCar className="text-white text-2xl" />
// // //             </div>
// // //             <div>
// // //               <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
// // //                 Rent<span className="text-gray-800">Ride</span>
// // //               </h1>
// // //               <p className="text-xs text-gray-500 -mt-1">Premium Car Rentals</p>
// // //             </div>
// // //           </div>

// // //           {/* Desktop Navigation */}
// // //           <div className="hidden lg:flex items-center gap-8">
// // //             {[
// // //               { id: "home", label: "Home" },
// // //               { id: "vehicles", label: "Vehicles" },
// // //               { id: "how-it-works", label: "How It Works" },
// // //               { id: "contact", label: "Contact" },
// // //             ].map((item) => (
// // //               <button
// // //                 key={item.id}
// // //                 onClick={() => scrollToSection(item.id)}
// // //                 className={`relative text-sm font-medium transition-all duration-300 ${
// // //                   activeNav === item.id
// // //                     ? "text-purple-600"
// // //                     : "text-gray-700 hover:text-purple-600"
// // //                 }`}
// // //               >
// // //                 {item.label}
// // //                 {activeNav === item.id && (
// // //                   <motion.div
// // //                     layoutId="activeNav"
// // //                     className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"
// // //                     initial={{ width: 0 }}
// // //                     animate={{ width: "100%" }}
// // //                     transition={{ duration: 0.3 }}
// // //                   />
// // //                 )}
// // //               </button>
// // //             ))}
// // //           </div>

// // //           {/* Search Bar - Desktop */}
// // //           <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
// // //             <div className="relative w-full">
// // //               <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
// // //               <input
// // //                 type="text"
// // //                 placeholder="Search by car name or type..."
// // //                 value={searchQuery}
// // //                 onChange={(e) => setSearchQuery(e.target.value)}
// // //                 className="w-full pl-11 pr-4 py-2.5 bg-gray-100 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
// // //               />
// // //             </div>
// // //           </div>

// // //           <div className="flex items-center gap-3">
// // //             <Link
// // //               to="/login"
// // //               className="px-5 py-2 border-2 border-purple-600 text-purple-600 font-semibold rounded-full hover:bg-purple-50 transition-all duration-300 text-sm"
// // //             >
// // //               Login
// // //             </Link>
// // //             <Link
// // //               to="/signup"
// // //               className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all"
// // //             >
// // //               Sign Up
// // //             </Link>
// // //           </div>
// // //         </div>

// // //         {/* Mobile Search */}
// // //         <div className="md:hidden px-6 pb-4">
// // //           <div className="relative">
// // //             <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
// // //             <input
// // //               type="text"
// // //               placeholder="Search vehicles..."
// // //               value={searchQuery}
// // //               onChange={(e) => setSearchQuery(e.target.value)}
// // //               className="w-full pl-11 pr-4 py-3 bg-gray-100 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
// // //             />
// // //           </div>
// // //         </div>
// // //       </nav>

// // //       {/* Hero Section */}
// // //       <section id="home" className="pt-24 pb-16 px-6">
// // //         <div className="max-w-7xl mx-auto">
// // //           <div className="grid lg:grid-cols-2 gap-12 items-center">
// // //             <motion.div
// // //               initial={{ opacity: 0, x: -50 }}
// // //               animate={{ opacity: 1, x: 0 }}
// // //               transition={{ duration: 0.6 }}
// // //               className="space-y-6"
// // //             >
// // //               <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full">
// // //                 <FaBolt className="text-purple-600 text-sm" />
// // //                 <span className="text-sm font-semibold text-purple-700">
// // //                   Trusted by 10,000+ Customers
// // //                 </span>
// // //               </div>
// // //               <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
// // //                 Drive Your{" "}
// // //                 <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
// // //                   Dream Car
// // //                 </span>
// // //                 <br />
// // //                 in Kathmandu
// // //               </h1>
// // //               <p className="text-gray-600 text-lg max-w-md">
// // //                 Experience luxury and convenience with our premium car rental
// // //                 service. Book online in minutes, drive away in style.
// // //               </p>
// // //               <div className="flex flex-wrap gap-4">
// // //                 <button
// // //                   onClick={() => scrollToSection("vehicles")}
// // //                   className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:shadow-xl transition-all transform hover:scale-105"
// // //                 >
// // //                   Explore Cars
// // //                 </button>
// // //                 <button
// // //                   onClick={() => scrollToSection("how-it-works")}
// // //                   className="px-8 py-3.5 border-2 border-purple-600 text-purple-600 font-semibold rounded-full hover:bg-purple-50 transition-all"
// // //                 >
// // //                   How It Works
// // //                 </button>
// // //               </div>

// // //               {/* Stats */}
// // //               <div className="flex flex-wrap gap-8 pt-8">
// // //                 {[
// // //                   { value: "10K+", label: "Happy Customers", icon: FaUsers },
// // //                   { value: "200+", label: "Premium Vehicles", icon: FaCar },
// // //                   { value: "15+", label: "Cities", icon: FaMapMarkerAlt },
// // //                   { value: "24/7", label: "Support", icon: FaHeadset },
// // //                 ].map((stat, idx) => (
// // //                   <div key={idx} className="text-center">
// // //                     <div className="text-2xl font-bold text-gray-900">
// // //                       {stat.value}
// // //                     </div>
// // //                     <div className="text-sm text-gray-500 flex items-center gap-1">
// // //                       <stat.icon className="text-purple-500 text-xs" />{" "}
// // //                       {stat.label}
// // //                     </div>
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             </motion.div>

// // //             <motion.div
// // //               initial={{ opacity: 0, x: 50 }}
// // //               animate={{ opacity: 1, x: 0 }}
// // //               transition={{ duration: 0.6, delay: 0.2 }}
// // //               className="relative"
// // //             >
// // //               <div className="relative rounded-2xl overflow-hidden shadow-2xl">
// // //                 <video
// // //                   src={heroVideo}
// // //                   autoPlay
// // //                   muted
// // //                   loop
// // //                   playsInline
// // //                   className="w-full h-[400px] object-cover"
// // //                 />
// // //                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
// // //               </div>
// // //               <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 backdrop-blur-sm">
// // //                 <p className="text-sm font-semibold text-gray-800">
// // //                   {vehicles.length}+ Vehicles Available
// // //                 </p>
// // //                 <p className="text-xs text-gray-500">24/7 pickup & delivery</p>
// // //               </div>
// // //             </motion.div>
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* Features Section */}
// // //       <section className="py-20 px-6 bg-gradient-to-br from-purple-50/50 to-pink-50/50">
// // //         <div className="max-w-7xl mx-auto">
// // //           <div className="text-center mb-12">
// // //             <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold mb-4">
// // //               WHY CHOOSE US
// // //             </span>
// // //             <h2 className="text-4xl font-bold text-gray-900 mb-4">
// // //               The Best Rental Experience
// // //             </h2>
// // //             <p className="text-gray-600 max-w-2xl mx-auto">
// // //               We combine technology with personalized service to deliver an
// // //               exceptional car rental experience
// // //             </p>
// // //           </div>
// // //           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
// // //             {[
// // //               {
// // //                 icon: FaCar,
// // //                 title: "Wide Selection",
// // //                 desc: "Choose from premium vehicles for every need",
// // //                 color: "from-blue-500 to-cyan-400",
// // //               },
// // //               {
// // //                 icon: FaClock,
// // //                 title: "Easy Booking",
// // //                 desc: "Book in 3 simple steps, 24/7 availability",
// // //                 color: "from-green-500 to-emerald-400",
// // //               },
// // //               {
// // //                 icon: FaShieldAlt,
// // //                 title: "Fully Insured",
// // //                 desc: "Comprehensive coverage for peace of mind",
// // //                 color: "from-purple-500 to-pink-400",
// // //               },
// // //               {
// // //                 icon: FaCreditCard,
// // //                 title: "Flexible Payment",
// // //                 desc: "Multiple payment options available",
// // //                 color: "from-orange-500 to-yellow-400",
// // //               },
// // //             ].map((feature, idx) => (
// // //               <motion.div
// // //                 key={idx}
// // //                 initial={{ opacity: 0, y: 30 }}
// // //                 whileInView={{ opacity: 1, y: 0 }}
// // //                 transition={{ duration: 0.5, delay: idx * 0.1 }}
// // //                 viewport={{ once: true }}
// // //                 className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
// // //               >
// // //                 <div
// // //                   className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
// // //                 >
// // //                   <feature.icon className="text-white text-2xl" />
// // //                 </div>
// // //                 <h3 className="text-xl font-bold text-gray-900 mb-2">
// // //                   {feature.title}
// // //                 </h3>
// // //                 <p className="text-gray-600">{feature.desc}</p>
// // //               </motion.div>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* Vehicle Filter Section */}
// // //       <section id="vehicles" className="py-20 px-6">
// // //         <div className="max-w-7xl mx-auto">
// // //           <div className="text-center mb-12">
// // //             <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
// // //               OUR FLEET
// // //             </span>
// // //             <h2 className="text-4xl font-bold text-gray-900 mb-4">
// // //               Choose Your Perfect Ride
// // //             </h2>
// // //             <p className="text-gray-600 max-w-2xl mx-auto">
// // //               Select from our premium collection of vehicles
// // //             </p>
// // //           </div>

// // //           {/* Filter Buttons */}
// // //           <div className="flex flex-wrap justify-center gap-3 mb-12">
// // //             {filters.map((filter) => (
// // //               <button
// // //                 key={filter}
// // //                 onClick={() => setActiveFilter(filter)}
// // //                 className={`px-5 py-2.5 rounded-full transition-all duration-300 ${
// // //                   activeFilter === filter
// // //                     ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
// // //                     : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm border border-gray-200"
// // //                 }`}
// // //               >
// // //                 {filter} {filter === "All vehicles" && `(${vehicles.length})`}
// // //               </button>
// // //             ))}
// // //           </div>

// // //           {/* Vehicles Grid */}
// // //           {filteredVehicles.length === 0 ? (
// // //             <div className="text-center py-20">
// // //               <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
// // //                 <FaCar className="text-gray-400 text-4xl" />
// // //               </div>
// // //               <h3 className="text-xl font-semibold text-gray-700 mb-2">
// // //                 No vehicles found
// // //               </h3>
// // //               <p className="text-gray-500">
// // //                 {searchQuery
// // //                   ? `No results for "${searchQuery}"`
// // //                   : "Try selecting a different category"}
// // //               </p>
// // //             </div>
// // //           ) : (
// // //             <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// // //               {filteredVehicles.map((vehicle, idx) => (
// // //                 <motion.div
// // //                   key={vehicle._id}
// // //                   initial={{ opacity: 0, y: 30 }}
// // //                   whileInView={{ opacity: 1, y: 0 }}
// // //                   transition={{ duration: 0.5, delay: idx * 0.05 }}
// // //                   viewport={{ once: true }}
// // //                   className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 cursor-pointer hover:-translate-y-2"
// // //                   onClick={() => handleViewDetails(vehicle)}
// // //                 >
// // //                   {/* Wishlist Button */}
// // //                   <button
// // //                     onClick={(e) => toggleFavorite(vehicle._id, e)}
// // //                     className="absolute top-4 right-4 z-10 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:scale-110 transition-transform duration-300"
// // //                   >
// // //                     <FaHeart
// // //                       className={`text-lg ${favorites.has(vehicle._id) ? "text-red-500 fill-red-500" : "text-gray-400"}`}
// // //                     />
// // //                   </button>

// // //                   {/* Status Badge */}
// // //                   <div className="absolute top-4 left-4 z-10">
// // //                     <span
// // //                       className={`px-3 py-1.5 rounded-full text-xs font-semibold ${vehicle.status === "Available" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
// // //                     >
// // //                       {vehicle.status}
// // //                     </span>
// // //                   </div>

// // //                   {/* Car Image */}
// // //                   <div className="h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
// // //                     <img
// // //                       src={getVehicleImage(vehicle)}
// // //                       alt={vehicle.carName}
// // //                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
// // //                       onError={(e) => {
// // //                         e.target.src = sedan;
// // //                       }}
// // //                     />
// // //                   </div>

// // //                   {/* Car Details */}
// // //                   <div className="p-5">
// // //                     <div className="flex items-start justify-between mb-3">
// // //                       <div>
// // //                         <h3 className="text-lg font-bold text-gray-800">
// // //                           {vehicle.carName}
// // //                         </h3>
// // //                         <div className="flex items-center gap-1 mt-1">
// // //                           {[...Array(5)].map((_, i) => (
// // //                             <FaStar
// // //                               key={i}
// // //                               className={`text-xs ${i < 4 ? "text-yellow-400" : "text-gray-300"}`}
// // //                             />
// // //                           ))}
// // //                           <span className="text-xs text-gray-500 ml-1">
// // //                             (128 reviews)
// // //                           </span>
// // //                         </div>
// // //                       </div>
// // //                       <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
// // //                         {vehicle.carType}
// // //                       </span>
// // //                     </div>

// // //                     <div className="flex items-center gap-3 mb-4 text-sm text-gray-500">
// // //                       <div className="flex items-center gap-1">
// // //                         <FaCogs size={12} />
// // //                         <span>{vehicle.gearType}</span>
// // //                       </div>
// // //                       <div className="flex items-center gap-1">
// // //                         <FaChair size={12} />
// // //                         <span>{vehicle.seats} seats</span>
// // //                       </div>
// // //                     </div>

// // //                     <div className="flex items-center justify-between pt-3 border-t border-gray-100">
// // //                       <div>
// // //                         <p className="text-xs text-gray-500">Daily rate</p>
// // //                         <p className="text-xl font-bold text-gray-900">
// // //                           {formatPrice(vehicle.ratePerDay)}
// // //                           <span className="text-sm font-normal text-gray-500">
// // //                             /day
// // //                           </span>
// // //                         </p>
// // //                       </div>
// // //                       <button
// // //                         onClick={(e) => {
// // //                           e.stopPropagation();
// // //                           handleViewDetails(vehicle);
// // //                         }}
// // //                         className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-lg hover:shadow-lg transition-all"
// // //                       >
// // //                         View Details
// // //                       </button>
// // //                     </div>
// // //                   </div>
// // //                 </motion.div>
// // //               ))}
// // //             </div>
// // //           )}
// // //         </div>
// // //       </section>

// // //       {/* How It Works */}
// // //       <section
// // //         id="how-it-works"
// // //         className="py-20 px-6 bg-gradient-to-br from-slate-900 to-purple-900"
// // //       >
// // //         <div className="max-w-7xl mx-auto">
// // //           <div className="text-center mb-12">
// // //             <span className="inline-block px-4 py-1.5 bg-white/20 text-white rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
// // //               SIMPLE PROCESS
// // //             </span>
// // //             <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
// // //             <p className="text-white/70 max-w-2xl mx-auto">
// // //               Get your perfect ride in three simple steps
// // //             </p>
// // //           </div>
// // //           <div className="grid md:grid-cols-3 gap-8">
// // //             {[
// // //               {
// // //                 number: "01",
// // //                 title: "Choose Vehicle",
// // //                 desc: "Browse our fleet and select your preferred vehicle",
// // //                 icon: FaCar,
// // //                 color: "from-blue-500 to-cyan-400",
// // //               },
// // //               {
// // //                 number: "02",
// // //                 title: "Book & Pay",
// // //                 desc: "Select dates, add extras, and complete secure payment",
// // //                 icon: FaCreditCard,
// // //                 color: "from-purple-500 to-pink-500",
// // //               },
// // //               {
// // //                 number: "03",
// // //                 title: "Get Your Vehicle",
// // //                 desc: "Pick up from our location or get doorstep delivery",
// // //                 icon: FaMapMarkerAlt,
// // //                 color: "from-green-500 to-emerald-500",
// // //               },
// // //             ].map((step, idx) => (
// // //               <motion.div
// // //                 key={idx}
// // //                 initial={{ opacity: 0, y: 30 }}
// // //                 whileInView={{ opacity: 1, y: 0 }}
// // //                 transition={{ duration: 0.5, delay: idx * 0.1 }}
// // //                 viewport={{ once: true }}
// // //                 className="relative text-center"
// // //               >
// // //                 <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
// // //                   {step.number}
// // //                 </div>
// // //                 <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 pt-12 border border-white/20 hover:border-white/40 transition-all">
// // //                   <div
// // //                     className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center mx-auto mb-5 shadow-lg`}
// // //                   >
// // //                     <step.icon className="text-white text-3xl" />
// // //                   </div>
// // //                   <h3 className="text-xl font-bold text-white mb-2">
// // //                     {step.title}
// // //                   </h3>
// // //                   <p className="text-white/70">{step.desc}</p>
// // //                 </div>
// // //                 {idx < 2 && (
// // //                   <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-white/30 text-3xl">
// // //                     <FaArrowRight />
// // //                   </div>
// // //                 )}
// // //               </motion.div>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* Delivery Information */}
// // //       <section className="py-20 px-6">
// // //         <div className="max-w-7xl mx-auto">
// // //           <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-10">
// // //             <div className="text-center mb-10">
// // //               <h2 className="text-3xl font-bold text-gray-800">
// // //                 Delivery Options
// // //               </h2>
// // //               <p className="text-gray-600 mt-2">
// // //                 Choose how you want to receive your vehicle
// // //               </p>
// // //             </div>
// // //             <div className="grid md:grid-cols-2 gap-8">
// // //               <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all">
// // //                 <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
// // //                   <FaMapMarkerAlt className="text-blue-600 text-2xl" />
// // //                 </div>
// // //                 <h3 className="text-xl font-bold text-gray-800 mb-2">
// // //                   Pickup from Location
// // //                 </h3>
// // //                 <p className="text-gray-600">
// // //                   Collect your vehicle from our nearest branch. Our team will
// // //                   assist you with the handover process.
// // //                 </p>
// // //                 <ul className="mt-4 text-left text-sm text-gray-500 space-y-2">
// // //                   <li className="flex items-center gap-2">
// // //                     <FaCheckCircle className="text-green-500 text-sm" /> Free
// // //                     pickup service
// // //                   </li>
// // //                   <li className="flex items-center gap-2">
// // //                     <FaCheckCircle className="text-green-500 text-sm" /> Vehicle
// // //                     inspection on site
// // //                   </li>
// // //                   <li className="flex items-center gap-2">
// // //                     <FaCheckCircle className="text-green-500 text-sm" />{" "}
// // //                     Document verification
// // //                   </li>
// // //                 </ul>
// // //               </div>
// // //               <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all">
// // //                 <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
// // //                   <FaTruck className="text-purple-600 text-2xl" />
// // //                 </div>
// // //                 <h3 className="text-xl font-bold text-gray-800 mb-2">
// // //                   Doorstep Delivery
// // //                 </h3>
// // //                 <p className="text-gray-600">
// // //                   Get your vehicle delivered to your home, hotel, or office. Our
// // //                   driver will bring the car to you.
// // //                 </p>
// // //                 <ul className="mt-4 text-left text-sm text-gray-500 space-y-2">
// // //                   <li className="flex items-center gap-2">
// // //                     <FaCheckCircle className="text-green-500 text-sm" />{" "}
// // //                     Delivery within Kathmandu Valley
// // //                   </li>
// // //                   <li className="flex items-center gap-2">
// // //                     <FaCheckCircle className="text-green-500 text-sm" /> Free
// // //                     delivery for 3+ days booking
// // //                   </li>
// // //                   <li className="flex items-center gap-2">
// // //                     <FaCheckCircle className="text-green-500 text-sm" />{" "}
// // //                     Real-time tracking available
// // //                   </li>
// // //                 </ul>
// // //               </div>
// // //             </div>
// // //             <div className="mt-8 text-center">
// // //               <p className="text-sm text-gray-500">
// // //                 After booking confirmation, you'll receive a call from our
// // //                 support team to confirm delivery/pickup details.
// // //               </p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* Stats Section */}
// // //       <section className="py-16 px-6 bg-white">
// // //         <div className="max-w-7xl mx-auto">
// // //           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
// // //             {[
// // //               {
// // //                 value: "98%",
// // //                 label: "Customer Satisfaction",
// // //                 icon: FaCheckCircle,
// // //               },
// // //               { value: "5-min", label: "Quick Response", icon: FaClock },
// // //               { value: "₹0", label: "Hidden Fees", icon: FaShieldAlt },
// // //               { value: "24/7", label: "Support Available", icon: FaHeadset },
// // //             ].map((stat, idx) => (
// // //               <div key={idx} className="text-center">
// // //                 <div className="text-3xl font-bold text-purple-600 mb-2">
// // //                   {stat.value}
// // //                 </div>
// // //                 <div className="text-sm text-gray-500 flex items-center justify-center gap-1">
// // //                   <stat.icon className="text-purple-400" /> {stat.label}
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* CTA Section */}
// // //       <section className="py-20 px-6">
// // //         <div className="max-w-7xl mx-auto">
// // //           <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 p-12 text-center">
// // //             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
// // //             <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-48 translate-y-48"></div>
// // //             <div className="relative z-10">
// // //               <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full mb-6">
// // //                 <FaCrown className="text-yellow-300" />
// // //                 <span className="text-white font-semibold">
// // //                   Premium Service Guaranteed
// // //                 </span>
// // //               </div>
// // //               <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
// // //                 Ready to Hit the Road?
// // //               </h2>
// // //               <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
// // //                 Join thousands of satisfied customers and experience premium car
// // //                 rental service like never before
// // //               </p>
// // //               <div className="flex flex-col sm:flex-row gap-4 justify-center">
// // //                 <Link
// // //                   to="/signup"
// // //                   className="px-8 py-3.5 bg-white text-purple-600 font-semibold rounded-full hover:shadow-xl transition-all transform hover:scale-105"
// // //                 >
// // //                   Sign Up Now
// // //                 </Link>
// // //                 <Link
// // //                   to="/login"
// // //                   className="px-8 py-3.5 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all"
// // //                 >
// // //                   Login to Account
// // //                 </Link>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* Footer */}
// // //       <footer id="contact" className="bg-gray-900 text-white pt-16 pb-8">
// // //         <div className="max-w-7xl mx-auto px-6">
// // //           <div className="grid md:grid-cols-4 gap-10 mb-12">
// // //             <div>
// // //               <div className="flex items-center gap-3 mb-6">
// // //                 <div className="p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
// // //                   <FaCar className="text-white text-2xl" />
// // //                 </div>
// // //                 <div>
// // //                   <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
// // //                     Rent<span className="text-white">Ride</span>
// // //                   </h1>
// // //                   <p className="text-xs text-gray-400 -mt-1">
// // //                     Premium Car Rentals
// // //                   </p>
// // //                 </div>
// // //               </div>
// // //               <p className="text-gray-400 text-sm leading-relaxed mb-6">
// // //                 Premium car rental service offering the best rates and
// // //                 exceptional customer experience in Nepal.
// // //               </p>
// // //               <div className="flex gap-3">
// // //                 {[FaFacebook, FaTwitter, FaInstagram, FaWhatsapp].map(
// // //                   (Icon, idx) => (
// // //                     <div
// // //                       key={idx}
// // //                       className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer"
// // //                     >
// // //                       <Icon size={14} />
// // //                     </div>
// // //                   ),
// // //                 )}
// // //               </div>
// // //             </div>

// // //             <div>
// // //               <h4 className="font-bold text-lg mb-6">Quick Links</h4>
// // //               <ul className="space-y-3 text-gray-400 text-sm">
// // //                 <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
// // //                   About Us
// // //                 </li>
// // //                 <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
// // //                   Contact Support
// // //                 </li>
// // //                 <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
// // //                   Privacy Policy
// // //                 </li>
// // //                 <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
// // //                   Terms & Conditions
// // //                 </li>
// // //               </ul>
// // //             </div>

// // //             <div>
// // //               <h4 className="font-bold text-lg mb-6">Our Services</h4>
// // //               <ul className="space-y-3 text-gray-400 text-sm">
// // //                 <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
// // //                   Airport Rentals
// // //                 </li>
// // //                 <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
// // //                   Luxury Cars
// // //                 </li>
// // //                 <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
// // //                   Long Term Rentals
// // //                 </li>
// // //                 <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
// // //                   Doorstep Delivery
// // //                 </li>
// // //               </ul>
// // //             </div>

// // //             <div>
// // //               <h4 className="font-bold text-lg mb-6">Contact Info</h4>
// // //               <ul className="space-y-4 text-gray-400 text-sm">
// // //                 <li className="flex items-start gap-3">
// // //                   <span className="text-xl">📍</span>
// // //                   <span>Kathmandu, Nepal</span>
// // //                 </li>
// // //                 <li className="flex items-center gap-3">
// // //                   <span className="text-xl">📞</span>
// // //                   <span>+977 9844177965</span>
// // //                 </li>
// // //                 <li className="flex items-center gap-3">
// // //                   <span className="text-xl">✉️</span>
// // //                   <span>support@rentride.com</span>
// // //                 </li>
// // //                 <li className="flex items-center gap-3">
// // //                   <span className="text-xl">🕐</span>
// // //                   <span>24/7 Customer Support</span>
// // //                 </li>
// // //               </ul>
// // //             </div>
// // //           </div>

// // //           <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
// // //             <p>© {new Date().getFullYear()} RentRide. All rights reserved.</p>
// // //             <p className="mt-1 text-xs">
// // //               Premium car rental service in Kathmandu, Nepal
// // //             </p>
// // //           </div>
// // //         </div>
// // //       </footer>

// // //       {/* Scroll to Top Button */}
// // //       <AnimatePresence>
// // //         {showScrollTop && (
// // //           <motion.button
// // //             initial={{ opacity: 0, scale: 0 }}
// // //             animate={{ opacity: 1, scale: 1 }}
// // //             exit={{ opacity: 0, scale: 0 }}
// // //             onClick={scrollToTop}
// // //             className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
// // //           >
// // //             <FaArrowUp />
// // //           </motion.button>
// // //         )}
// // //       </AnimatePresence>

// // //       {/* Vehicle Details Modal */}
// // //       {showDetailsModal && selectedVehicle && (
// // //         <div className="fixed inset-0 z-[100]">
// // //           <div
// // //             className="absolute inset-0 bg-black/60 backdrop-blur-sm"
// // //             onClick={() => setShowDetailsModal(false)}
// // //           ></div>
// // //           <div className="absolute inset-0 flex items-center justify-center p-4">
// // //             <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
// // //               <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center">
// // //                 <div>
// // //                   <h2 className="text-3xl font-bold text-gray-900">
// // //                     {selectedVehicle.carName}
// // //                   </h2>
// // //                   <div className="flex items-center gap-3 mt-2">
// // //                     <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
// // //                       {selectedVehicle.carType}
// // //                     </span>
// // //                     <span
// // //                       className={`px-3 py-1 rounded-full text-sm font-medium ${
// // //                         selectedVehicle.status === "Available"
// // //                           ? "bg-green-100 text-green-600"
// // //                           : "bg-red-100 text-red-600"
// // //                       }`}
// // //                     >
// // //                       {selectedVehicle.status}
// // //                     </span>
// // //                     <span className="text-gray-500">
// // //                       {selectedVehicle.carNumber}
// // //                     </span>
// // //                   </div>
// // //                 </div>
// // //                 <button
// // //                   onClick={() => setShowDetailsModal(false)}
// // //                   className="p-3 hover:bg-gray-100 rounded-full transition-colors"
// // //                 >
// // //                   <span className="text-2xl text-gray-500">×</span>
// // //                 </button>
// // //               </div>
// // //               <div className="p-8">
// // //                 {/* Gallery */}
// // //                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
// // //                   {selectedVehicle.photos &&
// // //                   selectedVehicle.photos.length > 0 ? (
// // //                     selectedVehicle.photos.map((photo, index) => (
// // //                       <div
// // //                         key={index}
// // //                         className={`${index === 0 ? "lg:col-span-2" : ""}`}
// // //                       >
// // //                         <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden">
// // //                           <img
// // //                             src={`http://localhost:5000/uploads/${selectedVehicle.source === "user" ? "user-vehicles" : "vehicles"}/${photo.filename}`}
// // //                             alt={photo.label}
// // //                             className="w-full h-full object-cover"
// // //                           />
// // //                           <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm backdrop-blur-sm">
// // //                             {photo.label}
// // //                           </div>
// // //                         </div>
// // //                       </div>
// // //                     ))
// // //                   ) : (
// // //                     <div className="lg:col-span-3 h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
// // //                       <FaCar className="text-8xl text-gray-300" />
// // //                     </div>
// // //                   )}
// // //                 </div>

// // //                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// // //                   {/* Left Column - Specifications */}
// // //                   <div className="lg:col-span-2">
// // //                     <h3 className="text-2xl font-bold text-gray-900 mb-6">
// // //                       Specifications
// // //                     </h3>
// // //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //                       {[
// // //                         {
// // //                           icon: FaCogs,
// // //                           label: "Transmission",
// // //                           value: selectedVehicle.gearType,
// // //                         },
// // //                         {
// // //                           icon: FaChair,
// // //                           label: "Seats",
// // //                           value: `${selectedVehicle.seats} Persons`,
// // //                         },
// // //                         {
// // //                           icon: FaSnowflake,
// // //                           label: "Air Conditioning",
// // //                           value: selectedVehicle.airCondition,
// // //                         },
// // //                         {
// // //                           icon: FaUserTie,
// // //                           label: "Driver",
// // //                           value: selectedVehicle.driverName || "Not Included",
// // //                         },
// // //                         {
// // //                           icon: FaPhone,
// // //                           label: "Contact",
// // //                           value: selectedVehicle.phoneNumber,
// // //                         },
// // //                         {
// // //                           icon: FaCalendarAlt,
// // //                           label: "Booking Type",
// // //                           value: selectedVehicle.bookingType,
// // //                         },
// // //                       ].map((spec, index) => (
// // //                         <div
// // //                           key={index}
// // //                           className="flex items-center p-4 bg-gray-50 rounded-xl"
// // //                         >
// // //                           <div className="p-3 bg-white rounded-lg shadow-sm mr-4">
// // //                             <spec.icon className="text-purple-600" />
// // //                           </div>
// // //                           <div>
// // //                             <p className="text-sm text-gray-500">
// // //                               {spec.label}
// // //                             </p>
// // //                             <p className="font-semibold text-gray-900">
// // //                               {spec.value}
// // //                             </p>
// // //                           </div>
// // //                         </div>
// // //                       ))}
// // //                     </div>

// // //                     {selectedVehicle.features &&
// // //                       selectedVehicle.features.length > 0 && (
// // //                         <div className="mt-10">
// // //                           <h3 className="text-2xl font-bold text-gray-900 mb-6">
// // //                             Features & Amenities
// // //                           </h3>
// // //                           <div className="flex flex-wrap gap-3">
// // //                             {selectedVehicle.features.map((feature, index) => (
// // //                               <span
// // //                                 key={index}
// // //                                 className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg font-medium"
// // //                               >
// // //                                 {feature}
// // //                               </span>
// // //                             ))}
// // //                           </div>
// // //                         </div>
// // //                       )}

// // //                     {selectedVehicle.description && (
// // //                       <div className="mt-10">
// // //                         <h3 className="text-2xl font-bold text-gray-900 mb-4">
// // //                           Description
// // //                         </h3>
// // //                         <p className="text-gray-600 leading-relaxed">
// // //                           {selectedVehicle.description}
// // //                         </p>
// // //                       </div>
// // //                     )}
// // //                   </div>

// // //                   {/* Right Column - Pricing & Booking */}
// // //                   <div className="lg:col-span-1">
// // //                     <div className="sticky top-24 bg-gradient-to-b from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-lg">
// // //                       <div className="text-center mb-6">
// // //                         <p className="text-gray-500 mb-2">Daily Rate</p>
// // //                         <div className="flex items-baseline justify-center">
// // //                           <span className="text-5xl font-bold text-gray-900">
// // //                             रु{selectedVehicle.ratePerDay}
// // //                           </span>
// // //                           <span className="text-gray-500 ml-2">/day</span>
// // //                         </div>
// // //                       </div>

// // //                       <div className="mb-6 p-4 bg-purple-50 border border-purple-100 rounded-lg">
// // //                         <div className="flex items-start">
// // //                           <FaInfoCircle className="text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
// // //                           <div>
// // //                             <h4 className="font-semibold text-purple-800 mb-1">
// // //                               Complete Price Breakdown
// // //                             </h4>
// // //                             <p className="text-sm text-purple-700">
// // //                               Full price calculation including optional extras
// // //                               will be shown during booking.
// // //                             </p>
// // //                           </div>
// // //                         </div>
// // //                       </div>

// // //                       <button
// // //                         onClick={() => {
// // //                           handleBookNow(selectedVehicle);
// // //                           setShowDetailsModal(false);
// // //                         }}
// // //                         className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-green-500/30 hover:scale-105 transition-all duration-300"
// // //                       >
// // //                         Book This Vehicle
// // //                       </button>

// // //                       <div className="mt-6 text-center">
// // //                         <p className="text-gray-500 text-sm">
// // //                           • Free cancellation • 24/7 support • Instant
// // //                           confirmation
// // //                         </p>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // import { Link } from "react-router-dom";
// // import { useState, useEffect } from "react";
// // import {
// //   FaCar,
// //   FaDollarSign,
// //   FaShieldAlt,
// //   FaClock,
// //   FaUserTie,
// //   FaTruck,
// //   FaHeadset,
// //   FaChevronDown,
// //   FaStar,
// //   FaCheckCircle,
// //   FaMapMarkerAlt,
// //   FaBolt,
// //   FaCrown,
// //   FaHeart,
// //   FaRegHeart,
// //   FaUsers,
// //   FaSnowflake,
// //   FaCogs,
// //   FaChair,
// //   FaInfoCircle,
// //   FaSearch,
// //   FaPhone,
// //   FaCalendarAlt,
// //   FaEnvelope,
// //   FaUserCircle,
// //   FaArrowRight,
// //   FaCreditCard,
// //   FaIdCard,
// //   FaFacebook,
// //   FaTwitter,
// //   FaInstagram,
// //   FaWhatsapp,
// //   FaArrowUp,
// // } from "react-icons/fa";
// // import { motion, AnimatePresence } from "framer-motion";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import BikesSection from "./BikesSection";

// // /* Image imports */
// // import heroVideo from "../../assets/Dashboard/INtro.mp4";
// // import sedan from "../../assets/Dashboard/sedan.jpg";
// // import suv from "../../assets/Dashboard/suv.jpg";
// // import ev from "../../assets/Dashboard/ev.jpg";
// // import convertible from "../../assets/Dashboard/convertible.jpg";
// // import minivan from "../../assets/Dashboard/minivan.jpg";
// // import sport from "../../assets/Dashboard/sport.jpg";

// // const API_URL = "http://localhost:5000/api";

// // export default function App() {
// //   const [favorites, setFavorites] = useState(new Set());
// //   const [vehicles, setVehicles] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const [filteredVehicles, setFilteredVehicles] = useState([]);
// //   const [activeFilter, setActiveFilter] = useState("All vehicles");
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [selectedVehicle, setSelectedVehicle] = useState(null);
// //   const [showDetailsModal, setShowDetailsModal] = useState(false);
// //   const [showScrollTop, setShowScrollTop] = useState(false);
// //   const [activeNav, setActiveNav] = useState("home");
// //   const [hoveredCard, setHoveredCard] = useState(null);
// //   const navigate = useNavigate();

// //   const filters = [
// //     "All vehicles",
// //     "Sedan",
// //     "SUV",
// //     "Hatchback",
// //     "MPV",
// //     "Coupe",
// //     "Convertible",
// //     "Pickup",
// //     "Minivan",
// //     "Electric",
// //   ];

// //   // Scroll to top button visibility
// //   useEffect(() => {
// //     const handleScroll = () => {
// //       setShowScrollTop(window.scrollY > 500);
// //       const sections = ["home", "vehicles", "how-it-works", "contact"];
// //       for (const section of sections) {
// //         const element = document.getElementById(section);
// //         if (element) {
// //           const rect = element.getBoundingClientRect();
// //           if (rect.top <= 100 && rect.bottom >= 100) {
// //             setActiveNav(section);
// //             break;
// //           }
// //         }
// //       }
// //     };
// //     window.addEventListener("scroll", handleScroll);
// //     return () => window.removeEventListener("scroll", handleScroll);
// //   }, []);

// //   // Fetch vehicles
// //   useEffect(() => {
// //     fetchVehicles();
// //   }, []);

// //   const fetchVehicles = async () => {
// //     try {
// //       setLoading(true);
// //       setError("");

// //       const adminResponse = await axios.get(
// //         "http://localhost:5000/api/vehicles",
// //         { timeout: 10000 },
// //       );

// //       let userVehicles = [];
// //       try {
// //         const userResponse = await axios.get(
// //           "http://localhost:5000/api/user-vehicles/public/active",
// //           { timeout: 10000 },
// //         );
// //         if (userResponse.data.success) userVehicles = userResponse.data.data;
// //       } catch (userError) {
// //         console.log("Could not fetch user vehicles:", userError.message);
// //       }

// //       let allVehicles = [];
// //       if (adminResponse.data && Array.isArray(adminResponse.data)) {
// //         allVehicles = [...adminResponse.data];
// //       } else if (
// //         adminResponse.data?.data &&
// //         Array.isArray(adminResponse.data.data)
// //       ) {
// //         allVehicles = [...adminResponse.data.data];
// //       }

// //       userVehicles.forEach((userVehicle) =>
// //         allVehicles.push({ ...userVehicle, source: "user" }),
// //       );

// //       setVehicles(allVehicles);
// //       setFilteredVehicles(allVehicles);
// //     } catch (error) {
// //       console.error("Error fetching vehicles:", error);
// //       setError("Failed to load vehicles. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const toggleFavorite = (vehicleId, e) => {
// //     e?.stopPropagation();
// //     const newWishlist = new Set(favorites);
// //     if (newWishlist.has(vehicleId)) {
// //       newWishlist.delete(vehicleId);
// //     } else {
// //       newWishlist.add(vehicleId);
// //     }
// //     setFavorites(newWishlist);
// //   };

// //   useEffect(() => {
// //     const filtered = vehicles.filter((vehicle) => {
// //       const matchesFilter =
// //         activeFilter === "All vehicles" ||
// //         vehicle.carType?.toLowerCase() === activeFilter.toLowerCase();
// //       const matchesSearch =
// //         searchQuery === "" ||
// //         vehicle.carName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //         vehicle.carType?.toLowerCase().includes(searchQuery.toLowerCase());
// //       return matchesFilter && matchesSearch;
// //     });
// //     setFilteredVehicles(filtered);
// //   }, [activeFilter, searchQuery, vehicles]);

// //   const getVehicleImage = (vehicle) => {
// //     if (vehicle.photos?.length > 0) {
// //       const extraView = vehicle.photos.find(
// //         (photo) => photo.label === "Extra View",
// //       );
// //       const photo = extraView || vehicle.photos[0];
// //       const folder = vehicle.source === "user" ? "user-vehicles" : "vehicles";
// //       return `http://localhost:5000/uploads/${folder}/${photo.filename}`;
// //     }
// //     switch (vehicle.carType) {
// //       case "SUV":
// //         return suv;
// //       case "Sedan":
// //         return sedan;
// //       case "Hatchback":
// //         return sedan;
// //       case "MPV":
// //         return minivan;
// //       case "Convertible":
// //         return convertible;
// //       case "Coupe":
// //         return sport;
// //       case "Pickup":
// //         return suv;
// //       case "Minivan":
// //         return minivan;
// //       case "Electric":
// //         return ev;
// //       default:
// //         return sedan;
// //     }
// //   };

// //   const handleViewDetails = (vehicle) => {
// //     setSelectedVehicle(vehicle);
// //     setShowDetailsModal(true);
// //   };

// //   const handleBookNow = (vehicle) => {
// //     navigate(`/booking/${vehicle._id}`);
// //   };

// //   const formatPrice = (price) => `रु ${price.toLocaleString()}`;

// //   const scrollToTop = () => {
// //     window.scrollTo({ top: 0, behavior: "smooth" });
// //   };

// //   const scrollToSection = (sectionId) => {
// //     const section = document.getElementById(sectionId);
// //     if (section) {
// //       section.scrollIntoView({ behavior: "smooth" });
// //       setActiveNav(sectionId);
// //     }
// //   };

// //   const CarCard = ({ vehicle, index }) => {
// //     const imageUrl = getVehicleImage(vehicle);
// //     const isWishlisted = favorites.has(vehicle._id);
// //     const isHovered = hoveredCard === vehicle._id;

// //     return (
// //       <motion.div
// //         initial={{ opacity: 0, y: 50 }}
// //         whileInView={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.5, delay: index * 0.05 }}
// //         viewport={{ once: true, margin: "-50px" }}
// //         onHoverStart={() => setHoveredCard(vehicle._id)}
// //         onHoverEnd={() => setHoveredCard(null)}
// //         className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 cursor-pointer h-full flex flex-col"
// //         onClick={() => handleViewDetails(vehicle)}
// //       >
// //         <motion.div
// //           className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 rounded-2xl"
// //           animate={{ opacity: isHovered ? 0.08 : 0 }}
// //           transition={{ duration: 0.3 }}
// //         />

// //         <motion.button
// //           whileTap={{ scale: 0.9 }}
// //           onClick={(e) => toggleFavorite(vehicle._id, e)}
// //           className="absolute top-4 right-4 z-10 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all duration-300"
// //         >
// //           <motion.div
// //             animate={{ scale: isWishlisted ? [1, 1.2, 1] : 1 }}
// //             transition={{ duration: 0.3 }}
// //           >
// //             <FaHeart
// //               className={`text-lg ${isWishlisted ? "text-red-500 fill-red-500" : "text-gray-400"}`}
// //             />
// //           </motion.div>
// //         </motion.button>

// //         <div className="absolute top-4 left-4 z-10">
// //           <motion.span
// //             initial={{ x: -20, opacity: 0 }}
// //             animate={{ x: 0, opacity: 1 }}
// //             className={`px-3 py-1.5 rounded-full text-xs font-semibold ${vehicle.status === "Available" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
// //           >
// //             {vehicle.status}
// //           </motion.span>
// //         </div>

// //         <div className="h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0">
// //           <motion.img
// //             src={imageUrl}
// //             alt={vehicle.carName}
// //             className="w-full h-full object-cover"
// //             animate={{ scale: isHovered ? 1.1 : 1 }}
// //             transition={{ duration: 0.5 }}
// //           />
// //         </div>

// //         <div className="p-5 flex flex-col flex-grow">
// //           <div className="flex justify-between items-start mb-3">
// //             <div className="flex-1">
// //               <div className="flex items-center gap-2 mb-1">
// //                 <h3 className="text-lg font-bold text-gray-900 truncate">
// //                   {vehicle.carName}
// //                 </h3>
// //                 <span className="px-2 py-0.5 bg-purple-50 text-purple-600 text-xs font-medium rounded-full whitespace-nowrap">
// //                   {vehicle.carType}
// //                 </span>
// //               </div>
// //               <div className="flex items-center gap-1 mt-1">
// //                 {[...Array(5)].map((_, i) => (
// //                   <FaStar
// //                     key={i}
// //                     className={`text-xs ${i < 4 ? "text-yellow-400" : "text-gray-300"}`}
// //                   />
// //                 ))}
// //                 <span className="text-xs text-gray-500 ml-1">
// //                   (128 reviews)
// //                 </span>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="flex items-center gap-3 mb-4 text-sm text-gray-500">
// //             <div className="flex items-center gap-1">
// //               <FaCogs size={12} className="text-purple-500" />
// //               <span>{vehicle.gearType}</span>
// //             </div>
// //             <div className="flex items-center gap-1">
// //               <FaChair size={12} className="text-purple-500" />
// //               <span>{vehicle.seats} seats</span>
// //             </div>
// //             <div className="flex items-center gap-1">
// //               <FaSnowflake size={12} className="text-purple-500" />
// //               <span>{vehicle.airCondition === "Yes" ? "AC" : "No AC"}</span>
// //             </div>
// //           </div>

// //           <div className="mt-auto pt-3 border-t border-gray-100">
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <p className="text-xs text-gray-500">Daily rate</p>
// //                 <p className="text-xl font-bold text-purple-600">
// //                   {formatPrice(vehicle.ratePerDay)}
// //                   <span className="text-sm font-normal text-gray-500">
// //                     /day
// //                   </span>
// //                 </p>
// //               </div>
// //               <motion.button
// //                 whileHover={{ scale: 1.05 }}
// //                 whileTap={{ scale: 0.95 }}
// //                 onClick={(e) => {
// //                   e.stopPropagation();
// //                   handleViewDetails(vehicle);
// //                 }}
// //                 className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all whitespace-nowrap"
// //               >
// //                 View Details
// //               </motion.button>
// //             </div>
// //           </div>
// //         </div>
// //       </motion.div>
// //     );
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
// //         <div className="text-center">
// //           <motion.div
// //             animate={{ rotate: 360 }}
// //             transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
// //             className="relative w-24 h-24 mx-auto mb-6"
// //           >
// //             <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full"></div>
// //             <div className="absolute inset-0 border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full"></div>
// //             <div className="absolute inset-2 border-4 border-t-transparent border-r-blue-500 border-b-transparent border-l-transparent rounded-full"></div>
// //             <FaCar className="absolute inset-0 m-auto text-white text-2xl animate-pulse" />
// //           </motion.div>
// //           <p className="text-white/80 text-lg">Loading premium vehicles...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 flex items-center justify-center">
// //         <motion.div
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           className="text-center max-w-md mx-auto p-8 bg-white/10 backdrop-blur-lg rounded-2xl"
// //         >
// //           <div className="text-6xl mb-4">⚠️</div>
// //           <h3 className="text-xl font-semibold text-white mb-2">
// //             Something went wrong
// //           </h3>
// //           <p className="text-white/70 mb-6">{error}</p>
// //           <button
// //             onClick={fetchVehicles}
// //             className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
// //           >
// //             Try Again
// //           </button>
// //         </motion.div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="font-sans text-gray-900 bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
// //       {/* Navbar */}
// //       <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100">
// //         <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
// //           <div
// //             className="flex items-center gap-3 cursor-pointer group"
// //             onClick={() => scrollToSection("home")}
// //           >
// //             <div className="p-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
// //               <FaCar className="text-white text-2xl" />
// //             </div>
// //             <div>
// //               <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
// //                 Rent<span className="text-gray-800">Ride</span>
// //               </h1>
// //               <p className="text-xs text-gray-500 -mt-1">Premium Car Rentals</p>
// //             </div>
// //           </div>

// //           {/* Desktop Navigation */}
// //           <div className="hidden lg:flex items-center gap-8">
// //             {[
// //               { id: "home", label: "Home" },
// //               { id: "vehicles", label: "Vehicles" },
// //               { id: "how-it-works", label: "How It Works" },
// //               { id: "contact", label: "Contact" },
// //             ].map((item) => (
// //               <button
// //                 key={item.id}
// //                 onClick={() => scrollToSection(item.id)}
// //                 className={`relative text-sm font-medium transition-all duration-300 ${
// //                   activeNav === item.id
// //                     ? "text-purple-600"
// //                     : "text-gray-700 hover:text-purple-600"
// //                 }`}
// //               >
// //                 {item.label}
// //                 {activeNav === item.id && (
// //                   <motion.div
// //                     layoutId="activeNav"
// //                     className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600"
// //                     initial={{ width: 0 }}
// //                     animate={{ width: "100%" }}
// //                     transition={{ duration: 0.3 }}
// //                   />
// //                 )}
// //               </button>
// //             ))}
// //           </div>

// //           {/* Search Bar - Desktop */}
// //           <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
// //             <div className="relative w-full">
// //               <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
// //               <input
// //                 type="text"
// //                 placeholder="Search by car name or type..."
// //                 value={searchQuery}
// //                 onChange={(e) => setSearchQuery(e.target.value)}
// //                 className="w-full pl-11 pr-4 py-2.5 bg-gray-100 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
// //               />
// //             </div>
// //           </div>

// //           <div className="flex items-center gap-3">
// //             <Link
// //               to="/login"
// //               className="px-5 py-2 border-2 border-purple-600 text-purple-600 font-semibold rounded-full hover:bg-purple-50 transition-all duration-300 text-sm"
// //             >
// //               Login
// //             </Link>
// //             <Link
// //               to="/signup"
// //               className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all"
// //             >
// //               Sign Up
// //             </Link>
// //           </div>
// //         </div>

// //         {/* Mobile Search */}
// //         <div className="md:hidden px-6 pb-4">
// //           <div className="relative">
// //             <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
// //             <input
// //               type="text"
// //               placeholder="Search vehicles..."
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //               className="w-full pl-11 pr-4 py-3 bg-gray-100 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
// //             />
// //           </div>
// //         </div>
// //       </nav>

// //       {/* Hero Section */}
// //       <section id="home" className="pt-24 pb-16 px-6">
// //         <div className="max-w-7xl mx-auto">
// //           <div className="grid lg:grid-cols-2 gap-12 items-center">
// //             <motion.div
// //               initial={{ opacity: 0, x: -50 }}
// //               animate={{ opacity: 1, x: 0 }}
// //               transition={{ duration: 0.6 }}
// //               className="space-y-6"
// //             >
// //               <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full">
// //                 <FaBolt className="text-purple-600 text-sm" />
// //                 <span className="text-sm font-semibold text-purple-700">
// //                   Trusted by 10,000+ Customers
// //                 </span>
// //               </div>
// //               <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
// //                 Drive Your{" "}
// //                 <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
// //                   Dream Car
// //                 </span>
// //                 <br />
// //                 in Kathmandu
// //               </h1>
// //               <p className="text-gray-600 text-lg max-w-md">
// //                 Experience luxury and convenience with our premium car rental
// //                 service. Book online in minutes, drive away in style.
// //               </p>
// //               <div className="flex flex-wrap gap-4">
// //                 <motion.button
// //                   whileHover={{ scale: 1.05 }}
// //                   whileTap={{ scale: 0.95 }}
// //                   onClick={() => scrollToSection("vehicles")}
// //                   className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:shadow-xl transition-all transform hover:scale-105"
// //                 >
// //                   Explore Cars
// //                 </motion.button>
// //                 <motion.button
// //                   whileHover={{ scale: 1.05 }}
// //                   whileTap={{ scale: 0.95 }}
// //                   onClick={() => scrollToSection("how-it-works")}
// //                   className="px-8 py-3.5 border-2 border-purple-600 text-purple-600 font-semibold rounded-full hover:bg-purple-50 transition-all"
// //                 >
// //                   How It Works
// //                 </motion.button>
// //               </div>

// //               {/* Stats */}
// //               <div className="flex flex-wrap gap-8 pt-8">
// //                 {[
// //                   { value: "10K+", label: "Happy Customers", icon: FaUsers },
// //                   { value: "200+", label: "Premium Vehicles", icon: FaCar },
// //                   { value: "15+", label: "Cities", icon: FaMapMarkerAlt },
// //                   { value: "24/7", label: "Support", icon: FaHeadset },
// //                 ].map((stat, idx) => (
// //                   <motion.div
// //                     key={idx}
// //                     initial={{ opacity: 0, y: 20 }}
// //                     animate={{ opacity: 1, y: 0 }}
// //                     transition={{ delay: 0.1 * idx }}
// //                     className="text-center"
// //                   >
// //                     <div className="text-2xl font-bold text-gray-900">
// //                       {stat.value}
// //                     </div>
// //                     <div className="text-sm text-gray-500 flex items-center gap-1">
// //                       <stat.icon className="text-purple-500 text-xs" />{" "}
// //                       {stat.label}
// //                     </div>
// //                   </motion.div>
// //                 ))}
// //               </div>
// //             </motion.div>

// //             <motion.div
// //               initial={{ opacity: 0, x: 50 }}
// //               animate={{ opacity: 1, x: 0 }}
// //               transition={{ duration: 0.6, delay: 0.2 }}
// //               className="relative"
// //             >
// //               <div className="relative rounded-2xl overflow-hidden shadow-2xl">
// //                 <video
// //                   src={heroVideo}
// //                   autoPlay
// //                   muted
// //                   loop
// //                   playsInline
// //                   className="w-full h-[400px] object-cover"
// //                 />
// //                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
// //               </div>
// //               <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 backdrop-blur-sm">
// //                 <p className="text-sm font-semibold text-gray-800">
// //                   {vehicles.length}+ Vehicles Available
// //                 </p>
// //                 <p className="text-xs text-gray-500">24/7 pickup & delivery</p>
// //               </div>
// //             </motion.div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Features Section */}
// //       <section className="py-20 px-6 bg-gradient-to-br from-purple-50/50 to-pink-50/50">
// //         <div className="max-w-7xl mx-auto">
// //           <motion.div
// //             initial={{ opacity: 0, y: 30 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.6 }}
// //             viewport={{ once: true }}
// //             className="text-center mb-12"
// //           >
// //             <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold mb-4">
// //               WHY CHOOSE US
// //             </span>
// //             <h2 className="text-4xl font-bold text-gray-900 mb-4">
// //               The Best Rental Experience
// //             </h2>
// //             <p className="text-gray-600 max-w-2xl mx-auto">
// //               We combine technology with personalized service to deliver an
// //               exceptional car rental experience
// //             </p>
// //           </motion.div>

// //           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
// //             {[
// //               {
// //                 icon: FaCar,
// //                 title: "Wide Selection",
// //                 desc: "Choose from premium vehicles for every need",
// //                 color: "from-purple-500 to-pink-500",
// //               },
// //               {
// //                 icon: FaClock,
// //                 title: "Easy Booking",
// //                 desc: "Book in 3 simple steps, 24/7 availability",
// //                 color: "from-green-500 to-emerald-400",
// //               },
// //               {
// //                 icon: FaShieldAlt,
// //                 title: "Fully Insured",
// //                 desc: "Comprehensive coverage for peace of mind",
// //                 color: "from-blue-500 to-cyan-400",
// //               },
// //               {
// //                 icon: FaCreditCard,
// //                 title: "Flexible Payment",
// //                 desc: "Multiple payment options available",
// //                 color: "from-orange-500 to-yellow-400",
// //               },
// //             ].map((feature, idx) => (
// //               <motion.div
// //                 key={idx}
// //                 initial={{ opacity: 0, y: 50 }}
// //                 whileInView={{ opacity: 1, y: 0 }}
// //                 transition={{ duration: 0.5, delay: idx * 0.1 }}
// //                 viewport={{ once: true }}
// //                 whileHover={{ y: -10 }}
// //                 className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500"
// //               >
// //                 <motion.div
// //                   whileHover={{ scale: 1.1, rotate: 5 }}
// //                   className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-5 transition-transform`}
// //                 >
// //                   <feature.icon className="text-white text-2xl" />
// //                 </motion.div>
// //                 <h3 className="text-xl font-bold text-gray-900 mb-2">
// //                   {feature.title}
// //                 </h3>
// //                 <p className="text-gray-600">{feature.desc}</p>
// //               </motion.div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Vehicle Filter Section */}
// //       <section id="vehicles" className="py-20 px-6">
// //         <div className="max-w-7xl mx-auto">
// //           <motion.div
// //             initial={{ opacity: 0, y: 30 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.6 }}
// //             viewport={{ once: true }}
// //             className="text-center mb-12"
// //           >
// //             <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold mb-4">
// //               OUR FLEET
// //             </span>
// //             <h2 className="text-4xl font-bold text-gray-900 mb-4">
// //               Choose Your Perfect Ride
// //             </h2>
// //             <p className="text-gray-600 max-w-2xl mx-auto">
// //               Select from our premium collection of vehicles
// //             </p>
// //           </motion.div>

// //           {/* Filter Buttons */}
// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.5 }}
// //             viewport={{ once: true }}
// //             className="flex flex-wrap justify-center gap-3 mb-12"
// //           >
// //             {filters.map((filter, idx) => (
// //               <motion.button
// //                 key={filter}
// //                 initial={{ opacity: 0, scale: 0.8 }}
// //                 animate={{ opacity: 1, scale: 1 }}
// //                 transition={{ delay: idx * 0.02 }}
// //                 whileHover={{ scale: 1.05 }}
// //                 whileTap={{ scale: 0.95 }}
// //                 onClick={() => setActiveFilter(filter)}
// //                 className={`px-5 py-2.5 rounded-full transition-all duration-300 ${
// //                   activeFilter === filter
// //                     ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
// //                     : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm border border-gray-200"
// //                 }`}
// //               >
// //                 {filter} {filter === "All vehicles" && `(${vehicles.length})`}
// //               </motion.button>
// //             ))}
// //           </motion.div>

// //           {/* Vehicles Grid */}
// //           {filteredVehicles.length === 0 ? (
// //             <motion.div
// //               initial={{ opacity: 0, scale: 0.9 }}
// //               animate={{ opacity: 1, scale: 1 }}
// //               className="text-center py-20"
// //             >
// //               <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
// //                 <FaCar className="text-gray-400 text-4xl" />
// //               </div>
// //               <h3 className="text-xl font-semibold text-gray-700 mb-2">
// //                 No vehicles found
// //               </h3>
// //               <p className="text-gray-500">
// //                 {searchQuery
// //                   ? `No results for "${searchQuery}"`
// //                   : "Try selecting a different category"}
// //               </p>
// //             </motion.div>
// //           ) : (
// //             <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// //               {filteredVehicles.map((vehicle, idx) => (
// //                 <CarCard key={vehicle._id} vehicle={vehicle} index={idx} />
// //               ))}
// //             </div>
// //           )}
// //         </div>
// //       </section>

// //       {/* How It Works */}
// //       <section
// //         id="how-it-works"
// //         className="py-20 px-6 bg-gradient-to-br from-slate-900 to-purple-900"
// //       >
// //         <div className="max-w-7xl mx-auto">
// //           <motion.div
// //             initial={{ opacity: 0, y: 30 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.6 }}
// //             viewport={{ once: true }}
// //             className="text-center mb-12"
// //           >
// //             <span className="inline-block px-4 py-1.5 bg-white/20 text-white rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
// //               SIMPLE PROCESS
// //             </span>
// //             <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
// //             <p className="text-white/70 max-w-2xl mx-auto">
// //               Get your perfect ride in three simple steps
// //             </p>
// //           </motion.div>

// //           <div className="grid md:grid-cols-3 gap-8">
// //             {[
// //               {
// //                 number: "01",
// //                 title: "Choose Vehicle",
// //                 desc: "Browse our fleet and select your preferred vehicle",
// //                 icon: FaCar,
// //                 color: "from-purple-500 to-pink-500",
// //               },
// //               {
// //                 number: "02",
// //                 title: "Book & Pay",
// //                 desc: "Select dates, add extras, and complete secure payment",
// //                 icon: FaCreditCard,
// //                 color: "from-blue-500 to-cyan-400",
// //               },
// //               {
// //                 number: "03",
// //                 title: "Get Your Vehicle",
// //                 desc: "Pick up from our location or get doorstep delivery",
// //                 icon: FaMapMarkerAlt,
// //                 color: "from-green-500 to-emerald-500",
// //               },
// //             ].map((step, idx) => (
// //               <motion.div
// //                 key={idx}
// //                 initial={{ opacity: 0, y: 50 }}
// //                 whileInView={{ opacity: 1, y: 0 }}
// //                 transition={{ duration: 0.5, delay: idx * 0.1 }}
// //                 viewport={{ once: true }}
// //                 whileHover={{ y: -10 }}
// //                 className="relative text-center"
// //               >
// //                 <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
// //                   {step.number}
// //                 </div>
// //                 <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 pt-12 border border-white/20 hover:border-white/40 transition-all">
// //                   <motion.div
// //                     whileHover={{ scale: 1.1, rotate: 5 }}
// //                     className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center mx-auto mb-5 shadow-lg`}
// //                   >
// //                     <step.icon className="text-white text-3xl" />
// //                   </motion.div>
// //                   <h3 className="text-xl font-bold text-white mb-2">
// //                     {step.title}
// //                   </h3>
// //                   <p className="text-white/70">{step.desc}</p>
// //                 </div>
// //                 {idx < 2 && (
// //                   <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-white/30 text-3xl">
// //                     <FaArrowRight />
// //                   </div>
// //                 )}
// //               </motion.div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Delivery Information */}
// //       <section className="py-20 px-6">
// //         <div className="max-w-7xl mx-auto">
// //           <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-10">
// //             <div className="text-center mb-10">
// //               <h2 className="text-3xl font-bold text-gray-800">
// //                 Delivery Options
// //               </h2>
// //               <p className="text-gray-600 mt-2">
// //                 Choose how you want to receive your vehicle
// //               </p>
// //             </div>
// //             <div className="grid md:grid-cols-2 gap-8">
// //               <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all">
// //                 <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
// //                   <FaMapMarkerAlt className="text-purple-600 text-2xl" />
// //                 </div>
// //                 <h3 className="text-xl font-bold text-gray-800 mb-2">
// //                   Pickup from Location
// //                 </h3>
// //                 <p className="text-gray-600">
// //                   Collect your vehicle from our nearest branch. Our team will
// //                   assist you with the handover process.
// //                 </p>
// //                 <ul className="mt-4 text-left text-sm text-gray-500 space-y-2">
// //                   <li className="flex items-center gap-2">
// //                     <FaCheckCircle className="text-green-500 text-sm" /> Free
// //                     pickup service
// //                   </li>
// //                   <li className="flex items-center gap-2">
// //                     <FaCheckCircle className="text-green-500 text-sm" /> Vehicle
// //                     inspection on site
// //                   </li>
// //                   <li className="flex items-center gap-2">
// //                     <FaCheckCircle className="text-green-500 text-sm" />{" "}
// //                     Document verification
// //                   </li>
// //                 </ul>
// //               </div>
// //               <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all">
// //                 <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
// //                   <FaTruck className="text-pink-600 text-2xl" />
// //                 </div>
// //                 <h3 className="text-xl font-bold text-gray-800 mb-2">
// //                   Doorstep Delivery
// //                 </h3>
// //                 <p className="text-gray-600">
// //                   Get your vehicle delivered to your home, hotel, or office. Our
// //                   driver will bring the car to you.
// //                 </p>
// //                 <ul className="mt-4 text-left text-sm text-gray-500 space-y-2">
// //                   <li className="flex items-center gap-2">
// //                     <FaCheckCircle className="text-green-500 text-sm" />{" "}
// //                     Delivery within Kathmandu Valley
// //                   </li>
// //                   <li className="flex items-center gap-2">
// //                     <FaCheckCircle className="text-green-500 text-sm" /> Free
// //                     delivery for 3+ days booking
// //                   </li>
// //                   <li className="flex items-center gap-2">
// //                     <FaCheckCircle className="text-green-500 text-sm" />{" "}
// //                     Real-time tracking available
// //                   </li>
// //                 </ul>
// //               </div>
// //             </div>
// //             <div className="mt-8 text-center">
// //               <p className="text-sm text-gray-500">
// //                 After booking confirmation, you'll receive a call from our
// //                 support team to confirm delivery/pickup details.
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Stats Section */}
// //       <section className="py-16 px-6 bg-white">
// //         <div className="max-w-7xl mx-auto">
// //           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
// //             {[
// //               {
// //                 value: "98%",
// //                 label: "Customer Satisfaction",
// //                 icon: FaCheckCircle,
// //               },
// //               { value: "5-min", label: "Quick Response", icon: FaClock },
// //               { value: "₹0", label: "Hidden Fees", icon: FaShieldAlt },
// //               { value: "24/7", label: "Support Available", icon: FaHeadset },
// //             ].map((stat, idx) => (
// //               <motion.div
// //                 key={idx}
// //                 initial={{ opacity: 0, y: 20 }}
// //                 whileInView={{ opacity: 1, y: 0 }}
// //                 transition={{ delay: idx * 0.1 }}
// //                 viewport={{ once: true }}
// //                 className="text-center"
// //               >
// //                 <div className="text-3xl font-bold text-purple-600 mb-2">
// //                   {stat.value}
// //                 </div>
// //                 <div className="text-sm text-gray-500 flex items-center justify-center gap-1">
// //                   <stat.icon className="text-purple-400" /> {stat.label}
// //                 </div>
// //               </motion.div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* CTA Section */}
// //       <section className="py-20 px-6">
// //         <div className="max-w-7xl mx-auto">
// //           <motion.div
// //             initial={{ opacity: 0, scale: 0.95 }}
// //             whileInView={{ opacity: 1, scale: 1 }}
// //             transition={{ duration: 0.6 }}
// //             viewport={{ once: true }}
// //             className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 p-12 text-center"
// //           >
// //             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 animate-pulse"></div>
// //             <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-48 translate-y-48 animate-pulse delay-1000"></div>
// //             <div className="relative z-10">
// //               <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full mb-6">
// //                 <FaCrown className="text-yellow-300" />
// //                 <span className="text-white font-semibold">
// //                   Premium Service Guaranteed
// //                 </span>
// //               </div>
// //               <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
// //                 Ready to Hit the Road?
// //               </h2>
// //               <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
// //                 Join thousands of satisfied customers and experience premium car
// //                 rental service like never before
// //               </p>
// //               <div className="flex flex-col sm:flex-row gap-4 justify-center">
// //                 <Link
// //                   to="/signup"
// //                   className="px-8 py-3.5 bg-white text-purple-600 font-semibold rounded-full hover:shadow-xl transition-all transform hover:scale-105"
// //                 >
// //                   Sign Up Now
// //                 </Link>
// //                 <Link
// //                   to="/login"
// //                   className="px-8 py-3.5 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all"
// //                 >
// //                   Login to Account
// //                 </Link>
// //               </div>
// //             </div>
// //           </motion.div>
// //         </div>
// //       </section>
// //       <BikesSection isLoggedIn={false} />

// //       {/* Footer */}
// //       <footer id="contact" className="bg-gray-900 text-white pt-16 pb-8">
// //         {/* Bikes Section */}

// //         <div className="max-w-7xl mx-auto px-6">
// //           <div className="grid md:grid-cols-4 gap-10 mb-12">
// //             <div>
// //               <div className="flex items-center gap-3 mb-6">
// //                 <div className="p-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg">
// //                   <FaCar className="text-white text-2xl" />
// //                 </div>
// //                 <div>
// //                   <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
// //                     Rent<span className="text-white">Ride</span>
// //                   </h1>
// //                   <p className="text-xs text-gray-400 -mt-1">
// //                     Premium Car Rentals
// //                   </p>
// //                 </div>
// //               </div>
// //               <p className="text-gray-400 text-sm leading-relaxed mb-6">
// //                 Premium car rental service offering the best rates and
// //                 exceptional customer experience in Nepal.
// //               </p>
// //               <div className="flex gap-3">
// //                 {[FaFacebook, FaTwitter, FaInstagram, FaWhatsapp].map(
// //                   (Icon, idx) => (
// //                     <div
// //                       key={idx}
// //                       className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer"
// //                     >
// //                       <Icon size={14} />
// //                     </div>
// //                   ),
// //                 )}
// //               </div>
// //             </div>

// //             <div>
// //               <h4 className="font-bold text-lg mb-6">Quick Links</h4>
// //               <ul className="space-y-3 text-gray-400 text-sm">
// //                 <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
// //                   About Us
// //                 </li>
// //                 <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
// //                   Contact Support
// //                 </li>
// //                 <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
// //                   Privacy Policy
// //                 </li>
// //                 <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
// //                   Terms & Conditions
// //                 </li>
// //               </ul>
// //             </div>

// //             <div>
// //               <h4 className="font-bold text-lg mb-6">Our Services</h4>
// //               <ul className="space-y-3 text-gray-400 text-sm">
// //                 <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
// //                   Airport Rentals
// //                 </li>
// //                 <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
// //                   Luxury Cars
// //                 </li>
// //                 <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
// //                   Long Term Rentals
// //                 </li>
// //                 <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
// //                   Doorstep Delivery
// //                 </li>
// //               </ul>
// //             </div>

// //             <div>
// //               <h4 className="font-bold text-lg mb-6">Contact Info</h4>
// //               <ul className="space-y-4 text-gray-400 text-sm">
// //                 <li className="flex items-start gap-3">
// //                   <span className="text-xl">📍</span>
// //                   <span>Kathmandu, Nepal</span>
// //                 </li>
// //                 <li className="flex items-center gap-3">
// //                   <span className="text-xl">📞</span>
// //                   <span>+977 9844177965</span>
// //                 </li>
// //                 <li className="flex items-center gap-3">
// //                   <span className="text-xl">✉️</span>
// //                   <span>support@rentride.com</span>
// //                 </li>
// //                 <li className="flex items-center gap-3">
// //                   <span className="text-xl">🕐</span>
// //                   <span>24/7 Customer Support</span>
// //                 </li>
// //               </ul>
// //             </div>
// //           </div>

// //           <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
// //             <p>© {new Date().getFullYear()} RentRide. All rights reserved.</p>
// //             <p className="mt-1 text-xs">
// //               Premium car rental service in Kathmandu, Nepal
// //             </p>
// //           </div>
// //         </div>
// //       </footer>

// //       {/* Scroll to Top Button */}
// //       <AnimatePresence>
// //         {showScrollTop && (
// //           <motion.button
// //             initial={{ opacity: 0, scale: 0 }}
// //             animate={{ opacity: 1, scale: 1 }}
// //             exit={{ opacity: 0, scale: 0 }}
// //             onClick={scrollToTop}
// //             className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
// //           >
// //             <FaArrowUp />
// //           </motion.button>
// //         )}
// //       </AnimatePresence>

// //       {/* Vehicle Details Modal */}
// //       <AnimatePresence>
// //         {showDetailsModal && selectedVehicle && (
// //           <motion.div
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             exit={{ opacity: 0 }}
// //             className="fixed inset-0 z-[100]"
// //           >
// //             <div
// //               className="absolute inset-0 bg-black/60 backdrop-blur-sm"
// //               onClick={() => setShowDetailsModal(false)}
// //             ></div>
// //             <motion.div
// //               initial={{ scale: 0.9, opacity: 0 }}
// //               animate={{ scale: 1, opacity: 1 }}
// //               exit={{ scale: 0.9, opacity: 0 }}
// //               className="absolute inset-0 flex items-center justify-center p-4"
// //             >
// //               <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
// //                 <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center">
// //                   <div>
// //                     <h2 className="text-3xl font-bold text-gray-900">
// //                       {selectedVehicle.carName}
// //                     </h2>
// //                     <div className="flex items-center gap-3 mt-2">
// //                       <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">
// //                         {selectedVehicle.carType}
// //                       </span>
// //                       <span
// //                         className={`px-3 py-1 rounded-full text-sm font-medium ${
// //                           selectedVehicle.status === "Available"
// //                             ? "bg-green-100 text-green-600"
// //                             : "bg-red-100 text-red-600"
// //                         }`}
// //                       >
// //                         {selectedVehicle.status}
// //                       </span>
// //                       <span className="text-gray-500">
// //                         {selectedVehicle.carNumber}
// //                       </span>
// //                     </div>
// //                   </div>
// //                   <button
// //                     onClick={() => setShowDetailsModal(false)}
// //                     className="p-3 hover:bg-gray-100 rounded-full transition-colors"
// //                   >
// //                     <span className="text-2xl text-gray-500">×</span>
// //                   </button>
// //                 </div>
// //                 <div className="p-8">
// //                   {/* Gallery */}
// //                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
// //                     {selectedVehicle.photos &&
// //                     selectedVehicle.photos.length > 0 ? (
// //                       selectedVehicle.photos.map((photo, index) => (
// //                         <div
// //                           key={index}
// //                           className={`${index === 0 ? "lg:col-span-2" : ""}`}
// //                         >
// //                           <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden">
// //                             <img
// //                               src={`http://localhost:5000/uploads/${selectedVehicle.source === "user" ? "user-vehicles" : "vehicles"}/${photo.filename}`}
// //                               alt={photo.label}
// //                               className="w-full h-full object-cover"
// //                             />
// //                             <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm backdrop-blur-sm">
// //                               {photo.label}
// //                             </div>
// //                           </div>
// //                         </div>
// //                       ))
// //                     ) : (
// //                       <div className="lg:col-span-3 h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
// //                         <FaCar className="text-8xl text-gray-300" />
// //                       </div>
// //                     )}
// //                   </div>

// //                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// //                     <div className="lg:col-span-2">
// //                       <h3 className="text-2xl font-bold text-gray-900 mb-6">
// //                         Specifications
// //                       </h3>
// //                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                         {[
// //                           {
// //                             icon: FaCogs,
// //                             label: "Transmission",
// //                             value: selectedVehicle.gearType,
// //                           },
// //                           {
// //                             icon: FaChair,
// //                             label: "Seats",
// //                             value: `${selectedVehicle.seats} Persons`,
// //                           },
// //                           {
// //                             icon: FaSnowflake,
// //                             label: "Air Conditioning",
// //                             value: selectedVehicle.airCondition,
// //                           },
// //                           {
// //                             icon: FaUserTie,
// //                             label: "Driver",
// //                             value: selectedVehicle.driverName || "Not Included",
// //                           },
// //                           {
// //                             icon: FaPhone,
// //                             label: "Contact",
// //                             value: selectedVehicle.phoneNumber,
// //                           },
// //                           {
// //                             icon: FaCalendarAlt,
// //                             label: "Booking Type",
// //                             value: selectedVehicle.bookingType,
// //                           },
// //                         ].map((spec, index) => (
// //                           <div
// //                             key={index}
// //                             className="flex items-center p-4 bg-gray-50 rounded-xl"
// //                           >
// //                             <div className="p-3 bg-white rounded-lg shadow-sm mr-4">
// //                               <spec.icon className="text-purple-600" />
// //                             </div>
// //                             <div>
// //                               <p className="text-sm text-gray-500">
// //                                 {spec.label}
// //                               </p>
// //                               <p className="font-semibold text-gray-900">
// //                                 {spec.value}
// //                               </p>
// //                             </div>
// //                           </div>
// //                         ))}
// //                       </div>

// //                       {selectedVehicle.features &&
// //                         selectedVehicle.features.length > 0 && (
// //                           <div className="mt-10">
// //                             <h3 className="text-2xl font-bold text-gray-900 mb-6">
// //                               Features & Amenities
// //                             </h3>
// //                             <div className="flex flex-wrap gap-3">
// //                               {selectedVehicle.features.map(
// //                                 (feature, index) => (
// //                                   <span
// //                                     key={index}
// //                                     className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg font-medium"
// //                                   >
// //                                     {feature}
// //                                   </span>
// //                                 ),
// //                               )}
// //                             </div>
// //                           </div>
// //                         )}

// //                       {selectedVehicle.description && (
// //                         <div className="mt-10">
// //                           <h3 className="text-2xl font-bold text-gray-900 mb-4">
// //                             Description
// //                           </h3>
// //                           <p className="text-gray-600 leading-relaxed">
// //                             {selectedVehicle.description}
// //                           </p>
// //                         </div>
// //                       )}
// //                     </div>

// //                     <div className="lg:col-span-1">
// //                       <div className="sticky top-24 bg-gradient-to-b from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-lg">
// //                         <div className="text-center mb-6">
// //                           <p className="text-gray-500 mb-2">Daily Rate</p>
// //                           <div className="flex items-baseline justify-center">
// //                             <span className="text-5xl font-bold text-gray-900">
// //                               रु{selectedVehicle.ratePerDay}
// //                             </span>
// //                             <span className="text-gray-500 ml-2">/day</span>
// //                           </div>
// //                         </div>

// //                         <div className="mb-6 p-4 bg-purple-50 border border-purple-100 rounded-lg">
// //                           <div className="flex items-start">
// //                             <FaInfoCircle className="text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
// //                             <div>
// //                               <h4 className="font-semibold text-purple-800 mb-1">
// //                                 Complete Price Breakdown
// //                               </h4>
// //                               <p className="text-sm text-purple-700">
// //                                 Full price calculation including optional extras
// //                                 will be shown during booking.
// //                               </p>
// //                             </div>
// //                           </div>
// //                         </div>

// //                         <motion.button
// //                           whileHover={{ scale: 1.05 }}
// //                           whileTap={{ scale: 0.95 }}
// //                           onClick={() => {
// //                             handleBookNow(selectedVehicle);
// //                             setShowDetailsModal(false);
// //                           }}
// //                           className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-green-500/30 transition-all duration-300"
// //                         >
// //                           Book This Vehicle
// //                         </motion.button>

// //                         <div className="mt-6 text-center">
// //                           <p className="text-gray-500 text-sm">
// //                             • Free cancellation • 24/7 support • Instant
// //                             confirmation
// //                           </p>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </motion.div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>
// //     </div>
// //   );
// // }

// // // // }

// // // import { Link } from "react-router-dom";
// // // import { useState, useEffect } from "react";
// // // import {
// // //   FaCar,
// // //   FaDollarSign,
// // //   FaShieldAlt,
// // //   FaClock,
// // //   FaUserTie,
// // //   FaTruck,
// // //   FaHeadset,
// // //   FaChevronDown,
// // //   FaStar,
// // //   FaCheckCircle,
// // //   FaMapMarkerAlt,
// // //   FaBolt,
// // //   FaCrown,
// // //   FaHeart,
// // //   FaRegHeart,
// // //   FaUsers,
// // //   FaSnowflake,
// // //   FaCogs,
// // //   FaChair,
// // //   FaInfoCircle,
// // //   FaSearch,
// // //   FaPhone,
// // //   FaCalendarAlt,
// // //   FaEnvelope,
// // //   FaUserCircle,
// // //   FaArrowRight,
// // //   FaCreditCard,
// // //   FaIdCard,
// // //   FaFacebook,
// // //   FaTwitter,
// // //   FaInstagram,
// // // } from "react-icons/fa";
// // // import axios from "axios";
// // // import { useNavigate } from "react-router-dom";

// // // /* Image imports */
// // // import heroVideo from "../../assets/Dashboard/INtro.mp4";
// // // import sedan from "../../assets/Dashboard/sedan.jpg";
// // // import suv from "../../assets/Dashboard/suv.jpg";
// // // import ev from "../../assets/Dashboard/ev.jpg";
// // // import convertible from "../../assets/Dashboard/convertible.jpg";
// // // import minivan from "../../assets/Dashboard/minivan.jpg";
// // // import sport from "../../assets/Dashboard/sport.jpg";

// // // const API_URL = "http://localhost:5000/api";

// // // export default function App() {
// // //   const [favorites, setFavorites] = useState(new Set());
// // //   const [vehicles, setVehicles] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState("");
// // //   const [filteredVehicles, setFilteredVehicles] = useState([]);
// // //   const [activeFilter, setActiveFilter] = useState("All vehicles");
// // //   const [searchQuery, setSearchQuery] = useState("");
// // //   const [selectedVehicle, setSelectedVehicle] = useState(null);
// // //   const [showDetailsModal, setShowDetailsModal] = useState(false);
// // //   const navigate = useNavigate();

// // //   const filters = [
// // //     "All vehicles",
// // //     "Sedan",
// // //     "SUV",
// // //     "Hatchback",
// // //     "MPV",
// // //     "Coupe",
// // //     "Convertible",
// // //     "Pickup",
// // //     "Minivan",
// // //     "Electric",
// // //   ];

// // //   // Fetch vehicles from backend (Public Landing Page - NO AUTH)
// // //   useEffect(() => {
// // //     fetchVehicles();
// // //   }, []);

// // //   const fetchVehicles = async () => {
// // //     try {
// // //       setLoading(true);
// // //       setError("");

// // //       // Fetch admin vehicles (public)
// // //       const adminResponse = await axios.get(
// // //         "http://localhost:5000/api/vehicles",
// // //         {
// // //           timeout: 10000,
// // //         },
// // //       );

// // //       // Fetch user vehicles from public endpoint (only active and listed)
// // //       let userVehicles = [];
// // //       try {
// // //         const userResponse = await axios.get(
// // //           "http://localhost:5000/api/user-vehicles/public/active",
// // //           { timeout: 10000 },
// // //         );
// // //         if (userResponse.data.success) userVehicles = userResponse.data.data;
// // //       } catch (userError) {
// // //         console.log("Could not fetch user vehicles:", userError.message);
// // //       }

// // //       let allVehicles = [];

// // //       // Add admin vehicles
// // //       if (adminResponse.data && Array.isArray(adminResponse.data)) {
// // //         allVehicles = [...adminResponse.data];
// // //       } else if (
// // //         adminResponse.data?.data &&
// // //         Array.isArray(adminResponse.data.data)
// // //       ) {
// // //         allVehicles = [...adminResponse.data.data];
// // //       }

// // //       // Add user vehicles
// // //       userVehicles.forEach((userVehicle) =>
// // //         allVehicles.push({ ...userVehicle, source: "user" }),
// // //       );

// // //       setVehicles(allVehicles);
// // //       setFilteredVehicles(allVehicles);
// // //     } catch (error) {
// // //       console.error("Error fetching vehicles:", error);
// // //       setError("Failed to load vehicles. Please try again.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const toggleFavorite = (vehicleId, e) => {
// // //     e?.stopPropagation();
// // //     const newWishlist = new Set(favorites);
// // //     if (newWishlist.has(vehicleId)) {
// // //       newWishlist.delete(vehicleId);
// // //     } else {
// // //       newWishlist.add(vehicleId);
// // //     }
// // //     setFavorites(newWishlist);
// // //   };

// // //   // Filter vehicles based on active filter and search
// // //   useEffect(() => {
// // //     const filtered = vehicles.filter((vehicle) => {
// // //       const matchesFilter =
// // //         activeFilter === "All vehicles" ||
// // //         vehicle.carType?.toLowerCase() === activeFilter.toLowerCase();
// // //       const matchesSearch =
// // //         searchQuery === "" ||
// // //         vehicle.carName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
// // //         vehicle.carType?.toLowerCase().includes(searchQuery.toLowerCase());
// // //       return matchesFilter && matchesSearch;
// // //     });
// // //     setFilteredVehicles(filtered);
// // //   }, [activeFilter, searchQuery, vehicles]);

// // //   // Get vehicle image URL
// // //   const getVehicleImage = (vehicle) => {
// // //     if (vehicle.photos?.length > 0) {
// // //       const extraView = vehicle.photos.find(
// // //         (photo) => photo.label === "Extra View",
// // //       );
// // //       const photo = extraView || vehicle.photos[0];
// // //       const folder = vehicle.source === "user" ? "user-vehicles" : "vehicles";
// // //       return `http://localhost:5000/uploads/${folder}/${photo.filename}`;
// // //     }

// // //     // Fallback based on car type
// // //     switch (vehicle.carType) {
// // //       case "SUV":
// // //         return suv;
// // //       case "Sedan":
// // //         return sedan;
// // //       case "Hatchback":
// // //         return sedan;
// // //       case "MPV":
// // //         return minivan;
// // //       case "Convertible":
// // //         return convertible;
// // //       case "Coupe":
// // //         return sport;
// // //       case "Pickup":
// // //         return suv;
// // //       case "Minivan":
// // //         return minivan;
// // //       case "Electric":
// // //         return ev;
// // //       default:
// // //         return sedan;
// // //     }
// // //   };

// // //   // Handle View Details click
// // //   const handleViewDetails = (vehicle) => {
// // //     setSelectedVehicle(vehicle);
// // //     setShowDetailsModal(true);
// // //   };

// // //   // Handle Book Now click
// // //   const handleBookNow = (vehicle) => {
// // //     navigate(`/booking/${vehicle._id}`);
// // //   };

// // //   // Format price with रु symbol
// // //   const formatPrice = (price) => {
// // //     return `रु ${price}`;
// // //   };

// // //   // Get rating based on vehicle properties
// // //   const getRating = (vehicle) => {
// // //     let baseRating = 4.0;
// // //     if (vehicle.airCondition === "Yes") baseRating += 0.3;
// // //     if (vehicle.gearType === "Automatic") baseRating += 0.2;
// // //     if (vehicle.seats >= 7) baseRating += 0.2;
// // //     if (vehicle.carType === "SUV" || vehicle.carType === "Convertible")
// // //       baseRating += 0.3;
// // //     return Math.min(5.0, baseRating).toFixed(1);
// // //   };

// // //   // Get review count
// // //   const getReviewCount = (vehicle) => {
// // //     const baseCounts = {
// // //       SUV: 1200,
// // //       Sedan: 1000,
// // //       Hatchback: 800,
// // //       MPV: 600,
// // //       Coupe: 400,
// // //       Convertible: 300,
// // //       Pickup: 200,
// // //       Minivan: 500,
// // //       Electric: 350,
// // //     };
// // //     return baseCounts[vehicle.carType] || 500;
// // //   };

// // //   // Scroll to section
// // //   const scrollToSection = (sectionId) => {
// // //     const section = document.getElementById(sectionId);
// // //     if (section) {
// // //       section.scrollIntoView({ behavior: "smooth" });
// // //     }
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
// // //         <div className="text-center">
// // //           <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
// // //           <p className="text-gray-600 text-lg">Loading vehicles...</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (error) {
// // //     return (
// // //       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
// // //         <div className="text-center">
// // //           <div className="text-red-500 text-5xl mb-4">⚠️</div>
// // //           <h3 className="text-xl font-semibold mb-2">Something went wrong</h3>
// // //           <p className="text-gray-600 mb-6 max-w-md mx-auto">{error}</p>
// // //           <button
// // //             onClick={fetchVehicles}
// // //             className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
// // //           >
// // //             Try Again
// // //           </button>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="font-sans text-gray-900 bg-gradient-to-br from-gray-50 to-blue-50">
// // //       {/* Navbar */}
// // //       <nav className="w-full bg-white/90 backdrop-blur-md shadow-2xl sticky top-0 z-50">
// // //         <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
// // //           {/* <div
// // //             className="flex items-center gap-2 cursor-pointer"
// // //             onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
// // //           >
// // //             <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg">
// // //               <FaCar className="text-white text-2xl" />
// // //             </div>
// // //             <h1 className="text-2xl font-bold">
// // //               Rent<span className="text-blue-600">Ride</span>
// // //             </h1>
// // //           </div> */}
// // //           <div
// // //             className="flex items-center gap-3 cursor-pointer"
// // //             onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
// // //           >
// // //             <div className="p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
// // //               <FaCar className="text-white text-2xl" />
// // //             </div>
// // //             <div>
// // //               <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
// // //                 Rent<span className="text-gray-800">Ride</span>
// // //               </h1>
// // //               <p className="text-xs text-gray-500 -mt-1">Premium Car Rentals</p>
// // //             </div>
// // //           </div>
// // //           {/* Search Bar */}
// // //           <div className="hidden md:block flex-1 max-w-md mx-8">
// // //             <div className="relative">
// // //               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
// // //                 <FaSearch className="text-gray-400" />
// // //               </div>
// // //               <input
// // //                 type="text"
// // //                 placeholder="Search vehicles..."
// // //                 value={searchQuery}
// // //                 onChange={(e) => setSearchQuery(e.target.value)}
// // //                 className="w-full pl-12 pr-4 py-2.5 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-300"
// // //               />
// // //             </div>
// // //           </div>

// // //           <ul className="hidden lg:flex items-center gap-10 text-sm font-medium">
// // //             <li className="relative group">
// // //               <button
// // //                 onClick={() => scrollToSection("home")}
// // //                 className="text-gray-700 group-hover:text-blue-600 transition-all duration-300"
// // //               >
// // //                 Home
// // //               </button>
// // //               <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
// // //             </li>
// // //             <li className="relative group">
// // //               <button
// // //                 onClick={() => scrollToSection("vehicles")}
// // //                 className="text-gray-700 group-hover:text-blue-600 transition-all duration-300"
// // //               >
// // //                 Vehicles
// // //               </button>
// // //               <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
// // //             </li>
// // //             <li className="relative group">
// // //               <button
// // //                 onClick={() => scrollToSection("how-it-works")}
// // //                 className="text-gray-700 group-hover:text-blue-600 transition-all duration-300"
// // //               >
// // //                 How It Works
// // //               </button>
// // //               <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
// // //             </li>
// // //             <li className="relative group">
// // //               <button
// // //                 onClick={() => scrollToSection("contact")}
// // //                 className="text-gray-700 group-hover:text-blue-600 transition-all duration-300"
// // //               >
// // //                 Contact
// // //               </button>
// // //               <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
// // //             </li>
// // //           </ul>

// // //           <div className="flex items-center gap-4">
// // //             <Link
// // //               to="/login"
// // //               className="px-6 py-2.5 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-all duration-300"
// // //             >
// // //               Login
// // //             </Link>
// // //             <Link
// // //               to="/signup"
// // //               className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 transition-all duration-300 text-white px-7 py-2.5 rounded-full text-sm font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
// // //             >
// // //               Sign Up
// // //             </Link>
// // //           </div>
// // //         </div>

// // //         {/* Mobile Search */}
// // //         <div className="md:hidden px-6 pb-4">
// // //           <div className="relative">
// // //             <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
// // //               <FaSearch className="text-gray-400" />
// // //             </div>
// // //             <input
// // //               type="text"
// // //               placeholder="Search vehicles..."
// // //               value={searchQuery}
// // //               onChange={(e) => setSearchQuery(e.target.value)}
// // //               className="w-full pl-12 pr-4 py-3 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-300"
// // //             />
// // //           </div>
// // //         </div>
// // //       </nav>

// // //       {/* Hero Section */}
// // //       <section id="home" className="max-w-7xl mx-auto px-6 py-16">
// // //         <div className="grid md:grid-cols-2 gap-14 items-center bg-gradient-to-br from-white to-blue-50 rounded-3xl p-10 shadow-3xl border border-blue-100 relative overflow-hidden">
// // //           <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-32 translate-x-32"></div>
// // //           <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-full -translate-x-64 translate-y-64"></div>

// // //           <div className="relative z-10">
// // //             <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
// // //               <video
// // //                 src={heroVideo}
// // //                 autoPlay
// // //                 muted
// // //                 loop
// // //                 playsInline
// // //                 className="rounded-2xl w-full h-[380px] object-cover transform group-hover:scale-110 transition-transform duration-700"
// // //               />
// // //               <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
// // //               <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg">
// // //                 <p className="text-sm font-semibold text-gray-800">
// // //                   {vehicles.length}+ Vehicles Available
// // //                 </p>
// // //                 <p className="text-xs text-gray-600">24/7 pickup service</p>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           <div className="relative z-10">
// // //             <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full mb-6 shadow-lg">
// // //               <FaBolt className="text-blue-600" />
// // //               <span className="text-sm font-semibold text-blue-700">
// // //                 Fast & Easy Booking
// // //               </span>
// // //             </div>
// // //             <h2 className="text-[44px] leading-tight font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
// // //               Discover Your <br />
// // //               <span className="relative">
// // //                 Perfect Ride
// // //                 <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600"></span>
// // //               </span>
// // //             </h2>
// // //             <p className="mt-5 text-gray-600 max-w-md text-lg leading-relaxed">
// // //               Experience effortless booking and premium rentals with RentRide.
// // //               Your journey begins with a click.
// // //             </p>
// // //             <div className="flex gap-4 mt-8">
// // //               <button
// // //                 onClick={() => scrollToSection("vehicles")}
// // //                 className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-full hover:shadow-lg transition-all"
// // //               >
// // //                 Explore Cars
// // //               </button>
// // //               <button
// // //                 onClick={() => scrollToSection("how-it-works")}
// // //                 className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-all"
// // //               >
// // //                 How It Works
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* Vehicle Filter Section */}
// // //       <section id="vehicles" className="max-w-7xl mx-auto px-6 py-10">
// // //         <div className="text-center mb-8">
// // //           <h2 className="text-3xl font-bold mb-4">Browse Our Fleet</h2>
// // //           <p className="text-gray-600 mb-8">
// // //             Choose from our wide range of vehicles
// // //           </p>

// // //           {/* Filter Buttons */}
// // //           <div className="flex flex-wrap justify-center gap-4 mb-12">
// // //             {filters.map((filter) => (
// // //               <button
// // //                 key={filter}
// // //                 onClick={() => setActiveFilter(filter)}
// // //                 className={`px-5 py-2.5 rounded-full transition-all duration-300 ${
// // //                   activeFilter === filter
// // //                     ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25"
// // //                     : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
// // //                 }`}
// // //               >
// // //                 {filter} {filter === "All vehicles" && `(${vehicles.length})`}
// // //               </button>
// // //             ))}
// // //           </div>
// // //         </div>

// // //         {/* Vehicles Grid - Enhanced Card Design */}
// // //         <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
// // //           {filteredVehicles.map((vehicle) => (
// // //             <div
// // //               key={vehicle._id}
// // //               className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 cursor-pointer hover:-translate-y-2"
// // //               onClick={() => handleViewDetails(vehicle)}
// // //             >
// // //               {/* Wishlist Button */}
// // //               <button
// // //                 onClick={(e) => toggleFavorite(vehicle._id, e)}
// // //                 className="absolute top-4 right-4 z-10 p-2.5 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 transition-transform duration-300"
// // //               >
// // //                 <FaHeart
// // //                   className={`text-lg ${favorites.has(vehicle._id) ? "text-red-500 fill-red-500" : "text-gray-400"}`}
// // //                 />
// // //               </button>

// // //               {/* Status Badge */}
// // //               <div className="absolute top-4 left-4 z-10">
// // //                 <span
// // //                   className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
// // //                     vehicle.status === "Available"
// // //                       ? "bg-green-500/90 text-white"
// // //                       : "bg-red-500/90 text-white"
// // //                   }`}
// // //                 >
// // //                   {vehicle.status}
// // //                 </span>
// // //               </div>

// // //               {/* Car Image */}
// // //               <div className="h-56 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
// // //                 <img
// // //                   src={getVehicleImage(vehicle)}
// // //                   alt={vehicle.carName}
// // //                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
// // //                   onError={(e) => {
// // //                     e.target.src = sedan;
// // //                   }}
// // //                 />
// // //               </div>

// // //               {/* Car Details */}
// // //               <div className="p-6">
// // //                 <div className="flex justify-between items-start mb-4">
// // //                   <div className="flex-1">
// // //                     <div className="flex items-center gap-2 mb-1">
// // //                       <h3 className="text-xl font-bold text-gray-800 truncate">
// // //                         {vehicle.carName}
// // //                       </h3>
// // //                       <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
// // //                         {vehicle.carType}
// // //                       </span>
// // //                     </div>
// // //                     <div className="flex items-center text-gray-500 text-sm mb-3">
// // //                       <FaMapMarkerAlt className="mr-1.5" />
// // //                       <span>Kathmandu, Nepal</span>
// // //                     </div>
// // //                     <div className="flex items-center gap-1 mb-4">
// // //                       {[...Array(5)].map((_, i) => (
// // //                         <FaStar
// // //                           key={i}
// // //                           className={`text-sm ${
// // //                             i < Math.floor(getRating(vehicle))
// // //                               ? "text-yellow-400 fill-yellow-400"
// // //                               : "text-gray-300"
// // //                           }`}
// // //                         />
// // //                       ))}
// // //                       <span className="text-gray-500 text-sm ml-2">
// // //                         {getRating(vehicle)} ({getReviewCount(vehicle)})
// // //                       </span>
// // //                     </div>
// // //                   </div>
// // //                 </div>

// // //                 {/* Specifications */}
// // //                 <div className="grid grid-cols-2 gap-3 mb-6">
// // //                   <div className="flex items-center gap-2">
// // //                     <div className="p-2 bg-gray-50 rounded-lg">
// // //                       <FaCogs className="text-gray-600" />
// // //                     </div>
// // //                     <div>
// // //                       <p className="text-xs text-gray-500">Transmission</p>
// // //                       <p className="font-medium text-gray-800">
// // //                         {vehicle.gearType}
// // //                       </p>
// // //                     </div>
// // //                   </div>
// // //                   <div className="flex items-center gap-2">
// // //                     <div className="p-2 bg-gray-50 rounded-lg">
// // //                       <FaChair className="text-gray-600" />
// // //                     </div>
// // //                     <div>
// // //                       <p className="text-xs text-gray-500">Seats</p>
// // //                       <p className="font-medium text-gray-800">
// // //                         {vehicle.seats}
// // //                       </p>
// // //                     </div>
// // //                   </div>
// // //                 </div>

// // //                 {/* Price and Action */}
// // //                 <div className="flex items-center justify-between pt-4 border-t border-gray-100">
// // //                   <div>
// // //                     <p className="text-xs text-gray-500">Daily rate</p>
// // //                     <div className="flex items-baseline">
// // //                       <span className="text-2xl font-bold text-gray-800">
// // //                         {formatPrice(vehicle.ratePerDay)}
// // //                       </span>
// // //                       <span className="text-gray-500 text-sm ml-1">/day</span>
// // //                     </div>
// // //                   </div>
// // //                   <button
// // //                     onClick={(e) => {
// // //                       e.stopPropagation();
// // //                       handleViewDetails(vehicle);
// // //                     }}
// // //                     className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
// // //                   >
// // //                     View Details
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           ))}
// // //         </div>

// // //         {filteredVehicles.length === 0 && (
// // //           <div className="text-center py-12">
// // //             <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
// // //               <FaCar className="text-gray-400 text-2xl" />
// // //             </div>
// // //             <h3 className="text-xl font-semibold text-gray-700 mb-2">
// // //               No vehicles found
// // //             </h3>
// // //             <p className="text-gray-500">
// // //               {searchQuery
// // //                 ? `No results for "${searchQuery}"`
// // //                 : "Try selecting a different category"}
// // //             </p>
// // //           </div>
// // //         )}
// // //       </section>

// // //       {/* Vehicle Details Modal */}
// // //       {showDetailsModal && selectedVehicle && (
// // //         <div className="fixed inset-0 z-[100]">
// // //           <div
// // //             className="absolute inset-0 bg-black/60 backdrop-blur-sm"
// // //             onClick={() => setShowDetailsModal(false)}
// // //           ></div>

// // //           <div className="absolute inset-0 flex items-center justify-center p-4">
// // //             <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
// // //               <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center">
// // //                 <div>
// // //                   <h2 className="text-3xl font-bold text-gray-900">
// // //                     {selectedVehicle.carName}
// // //                   </h2>
// // //                   <div className="flex items-center gap-3 mt-2">
// // //                     <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
// // //                       {selectedVehicle.carType}
// // //                     </span>
// // //                     <span
// // //                       className={`px-3 py-1 rounded-full text-sm font-medium ${
// // //                         selectedVehicle.status === "Available"
// // //                           ? "bg-green-100 text-green-600"
// // //                           : "bg-red-100 text-red-600"
// // //                       }`}
// // //                     >
// // //                       {selectedVehicle.status}
// // //                     </span>
// // //                     <span className="text-gray-500">
// // //                       {selectedVehicle.carNumber}
// // //                     </span>
// // //                   </div>
// // //                 </div>
// // //                 <button
// // //                   onClick={() => setShowDetailsModal(false)}
// // //                   className="p-3 hover:bg-gray-100 rounded-full transition-colors"
// // //                 >
// // //                   <span className="text-2xl text-gray-500">×</span>
// // //                 </button>
// // //               </div>

// // //               <div className="p-8">
// // //                 {/* Gallery */}
// // //                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
// // //                   {selectedVehicle.photos &&
// // //                   selectedVehicle.photos.length > 0 ? (
// // //                     selectedVehicle.photos.map((photo, index) => (
// // //                       <div
// // //                         key={index}
// // //                         className={`${index === 0 ? "lg:col-span-2" : ""}`}
// // //                       >
// // //                         <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden">
// // //                           <img
// // //                             src={`http://localhost:5000/uploads/${selectedVehicle.source === "user" ? "user-vehicles" : "vehicles"}/${photo.filename}`}
// // //                             alt={photo.label}
// // //                             className="w-full h-full object-cover"
// // //                           />
// // //                           <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm backdrop-blur-sm">
// // //                             {photo.label}
// // //                           </div>
// // //                         </div>
// // //                       </div>
// // //                     ))
// // //                   ) : (
// // //                     <div className="lg:col-span-3 h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
// // //                       <FaCar className="text-8xl text-gray-300" />
// // //                     </div>
// // //                   )}
// // //                 </div>

// // //                 {/* Main Details */}
// // //                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// // //                   {/* Left Column - Specifications */}
// // //                   <div className="lg:col-span-2">
// // //                     <h3 className="text-2xl font-bold text-gray-900 mb-6">
// // //                       Specifications
// // //                     </h3>
// // //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //                       {[
// // //                         {
// // //                           icon: FaCogs,
// // //                           label: "Transmission",
// // //                           value: selectedVehicle.gearType,
// // //                         },
// // //                         {
// // //                           icon: FaChair,
// // //                           label: "Seats",
// // //                           value: `${selectedVehicle.seats} Persons`,
// // //                         },
// // //                         {
// // //                           icon: FaSnowflake,
// // //                           label: "Air Conditioning",
// // //                           value: selectedVehicle.airCondition,
// // //                         },
// // //                         {
// // //                           icon: FaUserTie,
// // //                           label: "Driver",
// // //                           value: selectedVehicle.driverName || "Not Included",
// // //                         },
// // //                         {
// // //                           icon: FaPhone,
// // //                           label: "Contact",
// // //                           value: selectedVehicle.phoneNumber,
// // //                         },
// // //                         {
// // //                           icon: FaCalendarAlt,
// // //                           label: "Booking Type",
// // //                           value: selectedVehicle.bookingType,
// // //                         },
// // //                       ].map((spec, index) => (
// // //                         <div
// // //                           key={index}
// // //                           className="flex items-center p-4 bg-gray-50 rounded-xl"
// // //                         >
// // //                           <div className="p-3 bg-white rounded-lg shadow-sm mr-4">
// // //                             <spec.icon className="text-blue-600" />
// // //                           </div>
// // //                           <div>
// // //                             <p className="text-sm text-gray-500">
// // //                               {spec.label}
// // //                             </p>
// // //                             <p className="font-semibold text-gray-900">
// // //                               {spec.value}
// // //                             </p>
// // //                           </div>
// // //                         </div>
// // //                       ))}
// // //                     </div>

// // //                     {/* Features */}
// // //                     {selectedVehicle.features &&
// // //                       selectedVehicle.features.length > 0 && (
// // //                         <div className="mt-10">
// // //                           <h3 className="text-2xl font-bold text-gray-900 mb-6">
// // //                             Features & Amenities
// // //                           </h3>
// // //                           <div className="flex flex-wrap gap-3">
// // //                             {selectedVehicle.features.map((feature, index) => (
// // //                               <span
// // //                                 key={index}
// // //                                 className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium"
// // //                               >
// // //                                 {feature}
// // //                               </span>
// // //                             ))}
// // //                           </div>
// // //                         </div>
// // //                       )}

// // //                     {/* Description */}
// // //                     {selectedVehicle.description && (
// // //                       <div className="mt-10">
// // //                         <h3 className="text-2xl font-bold text-gray-900 mb-4">
// // //                           Description
// // //                         </h3>
// // //                         <p className="text-gray-600 leading-relaxed">
// // //                           {selectedVehicle.description}
// // //                         </p>
// // //                       </div>
// // //                     )}
// // //                   </div>

// // //                   {/* Right Column - Pricing & Booking */}
// // //                   <div className="lg:col-span-1">
// // //                     <div className="sticky top-24 bg-gradient-to-b from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-lg">
// // //                       <div className="text-center mb-6">
// // //                         <p className="text-gray-500 mb-2">Daily Rate</p>
// // //                         <div className="flex items-baseline justify-center">
// // //                           <span className="text-5xl font-bold text-gray-900">
// // //                             रु{selectedVehicle.ratePerDay}
// // //                           </span>
// // //                           <span className="text-gray-500 ml-2">/day</span>
// // //                         </div>
// // //                       </div>

// // //                       <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
// // //                         <div className="flex items-start">
// // //                           <FaInfoCircle className="text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
// // //                           <div>
// // //                             <h4 className="font-semibold text-blue-800 mb-1">
// // //                               Complete Price Breakdown
// // //                             </h4>
// // //                             <p className="text-sm text-blue-700">
// // //                               Full price calculation including optional extras
// // //                               will be shown during booking.
// // //                             </p>
// // //                           </div>
// // //                         </div>
// // //                       </div>

// // //                       <button
// // //                         onClick={() => {
// // //                           handleBookNow(selectedVehicle);
// // //                           setShowDetailsModal(false);
// // //                         }}
// // //                         className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-green-500/30 hover:scale-105 transition-all duration-300"
// // //                       >
// // //                         Book This Vehicle
// // //                       </button>

// // //                       <div className="mt-6 text-center">
// // //                         <p className="text-gray-500 text-sm">
// // //                           • Free cancellation • 24/7 support • Instant
// // //                           confirmation
// // //                         </p>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Key Features */}
// // //       <section className="max-w-7xl mx-auto px-6 py-10">
// // //         <div className="text-center mb-16">
// // //           <div className="inline-flex items-center gap-3 mb-4">
// // //             <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
// // //             <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
// // //               Why Choose Us
// // //             </h3>
// // //             <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
// // //           </div>
// // //           <h2 className="text-4xl font-bold mt-2">Key Features</h2>
// // //           <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
// // //             Experience premium car rental service with our standout features
// // //           </p>
// // //         </div>
// // //         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
// // //           <Feature
// // //             icon={<FaClock className="text-2xl" />}
// // //             title="Instant Availability"
// // //             desc="Real-time booking with instant confirmation"
// // //             gradient="from-blue-500 to-blue-600"
// // //           />
// // //           <Feature
// // //             icon={<FaCar className="text-2xl" />}
// // //             title="Comfortable Rides"
// // //             desc="Premium vehicles with latest amenities"
// // //             gradient="from-purple-500 to-purple-600"
// // //           />
// // //           <Feature
// // //             icon={<FaDollarSign className="text-2xl" />}
// // //             title="Best Pricing"
// // //             desc="Competitive rates with no hidden charges"
// // //             gradient="from-green-500 to-green-600"
// // //           />
// // //           <Feature
// // //             icon={<FaShieldAlt className="text-2xl" />}
// // //             title="No Hidden Fees"
// // //             desc="Transparent pricing, all fees included"
// // //             gradient="from-orange-500 to-orange-600"
// // //           />
// // //         </div>
// // //       </section>

// // //       {/* Advantages */}
// // //       <section className="max-w-7xl mx-auto px-6 py-16">
// // //         <div className="text-center mb-16">
// // //           <div className="inline-flex items-center gap-3 mb-4">
// // //             <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
// // //             <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
// // //               Our Benefits
// // //             </h3>
// // //             <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
// // //           </div>
// // //           <h2 className="text-4xl font-bold mt-2">RentRide Advantages</h2>
// // //           <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
// // //             Discover why thousands choose RentRide
// // //           </p>
// // //         </div>
// // //         <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
// // //           <Advantage
// // //             icon={<FaDollarSign className="text-2xl" />}
// // //             title="Best price guarantee"
// // //             desc="We guarantee the best prices in the market"
// // //             color="green"
// // //             stat={`${vehicles.length}+ Vehicles`}
// // //           />
// // //           <Advantage
// // //             icon={<FaUserTie className="text-2xl" />}
// // //             title="Professional drivers"
// // //             desc="Highly trained and certified drivers"
// // //             color="blue"
// // //             stat="500+ Drivers"
// // //           />
// // //           <Advantage
// // //             icon={<FaTruck className="text-2xl" />}
// // //             title="Doorstep delivery"
// // //             desc="Get your car delivered to your location"
// // //             color="purple"
// // //             stat="24/7 Delivery"
// // //           />
// // //           <Advantage
// // //             icon={<FaHeadset className="text-2xl" />}
// // //             title="24/7 support"
// // //             desc="Round-the-clock customer support"
// // //             color="orange"
// // //             stat="Instant Response"
// // //           />
// // //           <Advantage
// // //             icon={<FaCar className="text-2xl" />}
// // //             title="Wide vehicle range"
// // //             desc="Choose from economy to luxury"
// // //             color="red"
// // //             stat={`${vehicles.length} Models`}
// // //           />
// // //         </div>
// // //       </section>

// // //       {/* How it Works */}
// // //       <section
// // //         id="how-it-works"
// // //         className="max-w-7xl mx-auto px-6 py-20 bg-gradient-to-br from-white to-blue-50 rounded-3xl my-16 shadow-3xl relative overflow-hidden"
// // //       >
// // //         <div className="text-center mb-16 relative z-10">
// // //           <div className="inline-flex items-center gap-3 mb-4">
// // //             <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
// // //             <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
// // //               Process
// // //             </h3>
// // //             <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
// // //           </div>
// // //           <h2 className="text-4xl font-bold mt-2">How It Works</h2>
// // //           <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
// // //             Simple steps to get your perfect ride
// // //           </p>
// // //         </div>
// // //         <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto relative z-10">
// // //           <Step
// // //             number="01"
// // //             title="Choose Vehicle"
// // //             desc="Browse our fleet and select your preferred vehicle"
// // //             icon={<FaCar />}
// // //           />
// // //           <Step
// // //             number="02"
// // //             title="Book & Pay"
// // //             desc="Select dates, add extras, and complete secure payment"
// // //             icon={<FaCreditCard />}
// // //           />
// // //           <Step
// // //             number="03"
// // //             title="Get Your Vehicle"
// // //             desc="Pick up from our location or get doorstep delivery"
// // //             icon={<FaMapMarkerAlt />}
// // //           />
// // //         </div>
// // //       </section>

// // //       {/* Delivery Information */}
// // //       <section className="max-w-7xl mx-auto px-6 py-16">
// // //         <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-10">
// // //           <div className="text-center mb-10">
// // //             <h2 className="text-3xl font-bold text-gray-800">
// // //               Delivery Options
// // //             </h2>
// // //             <p className="text-gray-600 mt-2">
// // //               Choose how you want to receive your vehicle
// // //             </p>
// // //           </div>
// // //           <div className="grid md:grid-cols-2 gap-8">
// // //             <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all">
// // //               <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
// // //                 <FaMapMarkerAlt className="text-blue-600 text-2xl" />
// // //               </div>
// // //               <h3 className="text-xl font-bold text-gray-800 mb-2">
// // //                 Pickup from Location
// // //               </h3>
// // //               <p className="text-gray-600">
// // //                 Collect your vehicle from our nearest branch. Our team will
// // //                 assist you with the handover process.
// // //               </p>
// // //               <ul className="mt-4 text-left text-sm text-gray-500 space-y-2">
// // //                 <li className="flex items-center gap-2">
// // //                   <FaCheckCircle className="text-green-500 text-sm" /> Free
// // //                   pickup service
// // //                 </li>
// // //                 <li className="flex items-center gap-2">
// // //                   <FaCheckCircle className="text-green-500 text-sm" /> Vehicle
// // //                   inspection on site
// // //                 </li>
// // //                 <li className="flex items-center gap-2">
// // //                   <FaCheckCircle className="text-green-500 text-sm" /> Document
// // //                   verification
// // //                 </li>
// // //               </ul>
// // //             </div>
// // //             <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all">
// // //               <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
// // //                 <FaTruck className="text-purple-600 text-2xl" />
// // //               </div>
// // //               <h3 className="text-xl font-bold text-gray-800 mb-2">
// // //                 Doorstep Delivery
// // //               </h3>
// // //               <p className="text-gray-600">
// // //                 Get your vehicle delivered to your home, hotel, or office. Our
// // //                 driver will bring the car to you.
// // //               </p>
// // //               <ul className="mt-4 text-left text-sm text-gray-500 space-y-2">
// // //                 <li className="flex items-center gap-2">
// // //                   <FaCheckCircle className="text-green-500 text-sm" /> Delivery
// // //                   within Kathmandu Valley
// // //                 </li>
// // //                 <li className="flex items-center gap-2">
// // //                   <FaCheckCircle className="text-green-500 text-sm" /> Free
// // //                   delivery for 3+ days booking
// // //                 </li>
// // //                 <li className="flex items-center gap-2">
// // //                   <FaCheckCircle className="text-green-500 text-sm" /> Real-time
// // //                   tracking available
// // //                 </li>
// // //               </ul>
// // //             </div>
// // //           </div>
// // //           <div className="mt-8 text-center">
// // //             <p className="text-sm text-gray-500">
// // //               After booking confirmation, you'll receive a call from our support
// // //               team to confirm delivery/pickup details.
// // //             </p>
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* Testimonials */}
// // //       <section className="max-w-7xl mx-auto px-6 py-16">
// // //         <div className="text-center mb-16">
// // //           <div className="inline-flex items-center gap-3 mb-4">
// // //             <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
// // //             <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
// // //               Testimonials
// // //             </h3>
// // //             <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
// // //           </div>
// // //           <h2 className="text-4xl font-bold mt-2">What Our Customers Say</h2>
// // //           <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
// // //             Join thousands of satisfied customers who trust RentRide
// // //           </p>
// // //         </div>
// // //         <div className="grid md:grid-cols-3 gap-8">
// // //           <Testimonial
// // //             name="Bijay Pandey"
// // //             role="Business Traveler"
// // //             text="RentRide made renting a car incredibly easy and stress-free. The vehicle was spotless and perfectly maintained."
// // //             rating={5}
// // //             avatarColor="bg-blue-100"
// // //           />
// // //           <Testimonial
// // //             name="Yogesh Bikram Shah"
// // //             role="Family Vacationer"
// // //             text="Wide selection of vehicles and competitive pricing. Our family trip was comfortable thanks to their excellent service."
// // //             rating={4}
// // //             avatarColor="bg-green-100"
// // //           />
// // //           <Testimonial
// // //             name="Aashriti Karki"
// // //             role="Adventure Seeker"
// // //             text="Support team was very helpful and responsive. The 4x4 I rented handled mountain roads perfectly!"
// // //             rating={5}
// // //             avatarColor="bg-purple-100"
// // //           />
// // //         </div>
// // //       </section>

// // //       {/* FAQ */}
// // //       <section className="max-w-7xl mx-auto px-6 py-16">
// // //         <div className="text-center mb-16">
// // //           <div className="inline-flex items-center gap-3 mb-4">
// // //             <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
// // //             <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
// // //               FAQ
// // //             </h3>
// // //             <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
// // //           </div>
// // //           <h2 className="text-4xl font-bold mt-2">
// // //             Frequently Asked Questions
// // //           </h2>
// // //           <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
// // //             Get answers to common questions
// // //           </p>
// // //         </div>
// // //         <div className="space-y-4 max-w-3xl mx-auto">
// // //           <Faq
// // //             q="How do I book a car?"
// // //             a="Simply choose a vehicle, select your dates, add any extras, and confirm booking with secure payment. You'll receive instant confirmation."
// // //           />
// // //           <Faq
// // //             q="What is included in the insurance?"
// // //             a="Comprehensive insurance covering collision damage, theft, and third-party liability is included in all rentals."
// // //           />
// // //           <Faq
// // //             q="What payment methods are accepted?"
// // //             a="We accept all major credit cards, debit cards, digital wallets (Khalti, eSewa), and bank transfers."
// // //           />
// // //           <Faq
// // //             q="How does delivery work after confirmation?"
// // //             a="After booking confirmation, our support team will contact you within 2 hours to confirm delivery/pickup details. For doorstep delivery, the vehicle will be delivered to your specified location. For pickup, you can collect from our nearest branch."
// // //           />
// // //         </div>
// // //       </section>

// // //       {/* CTA Section */}
// // //       <section className="max-w-7xl mx-auto px-6 py-20">
// // //         <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-3xl p-12 text-center text-white shadow-3xl relative overflow-hidden">
// // //           <div className="relative z-10">
// // //             <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full mb-8">
// // //               <FaCrown className="text-yellow-300" />
// // //               <span className="font-semibold">Premium Service Guaranteed</span>
// // //             </div>
// // //             <h2 className="text-4xl font-bold mb-6">Ready to Hit the Road?</h2>
// // //             <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
// // //               Join thousands of satisfied customers and experience premium car
// // //               rental service like never before
// // //             </p>
// // //             <div className="flex flex-col sm:flex-row gap-6 justify-center">
// // //               <Link
// // //                 to="/signup"
// // //                 className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-12 rounded-xl transition-all duration-300 hover:-translate-y-1 shadow-2xl hover:shadow-3xl flex items-center justify-center gap-3 group"
// // //               >
// // //                 <FaCar className="group-hover:scale-110 transition-transform" />
// // //                 Sign Up Now
// // //               </Link>
// // //               <Link
// // //                 to="/login"
// // //                 className="bg-transparent border-2 border-white hover:bg-white/20 font-bold py-4 px-12 rounded-xl transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
// // //               >
// // //                 Login to Account
// // //               </Link>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* Footer */}
// // //       <footer
// // //         id="contact"
// // //         className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16"
// // //       >
// // //         <div className="max-w-7xl mx-auto px-6">
// // //           <div className="grid md:grid-cols-4 gap-12 mb-12">
// // //             <div>
// // //               {/* <div className="flex items-center gap-3 mb-8">
// // //                 <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-lg">
// // //                   <FaCar className="text-white text-2xl" />
// // //                 </div>
// // //                 <h1 className="text-2xl font-bold">
// // //                   Rent<span className="text-blue-400">Ride</span>
// // //                 </h1>
// // //               </div> */}

// // //               <div className="flex items-center gap-3 mb-8">
// // //                 <div className="p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
// // //                   <FaCar className="text-white text-2xl" />
// // //                 </div>
// // //                 <div>
// // //                   <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
// // //                     Rent<span className="text-white">Ride</span>
// // //                   </h1>
// // //                   <p className="text-xs text-gray-400 -mt-1">
// // //                     Premium Car Rentals
// // //                   </p>
// // //                 </div>
// // //               </div>
// // //               <p className="text-gray-400 text-sm leading-relaxed mb-6">
// // //                 Premium car rental service offering the best rates and
// // //                 exceptional customer experience in Nepal.
// // //               </p>
// // //               <div className="flex gap-4">
// // //                 <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
// // //                   <FaFacebook />
// // //                 </div>
// // //                 <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
// // //                   <FaTwitter />
// // //                 </div>
// // //                 <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
// // //                   <FaInstagram />
// // //                 </div>
// // //               </div>
// // //             </div>
// // //             <div>
// // //               <h4 className="font-bold text-lg mb-8 relative inline-block">
// // //                 Quick Links
// // //                 <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></span>
// // //               </h4>
// // //               <ul className="space-y-4 text-gray-400 text-sm">
// // //                 <li className="hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-2 flex items-center gap-2">
// // //                   <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
// // //                   About Us
// // //                 </li>
// // //                 <li className="hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-2 flex items-center gap-2">
// // //                   <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
// // //                   Contact Support
// // //                 </li>
// // //                 <li className="hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-2 flex items-center gap-2">
// // //                   <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
// // //                   Privacy Policy
// // //                 </li>
// // //                 <li className="hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-2 flex items-center gap-2">
// // //                   <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
// // //                   Terms & Conditions
// // //                 </li>
// // //               </ul>
// // //             </div>
// // //             <div>
// // //               <h4 className="font-bold text-lg mb-8 relative inline-block">
// // //                 Our Services
// // //                 <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></span>
// // //               </h4>
// // //               <ul className="space-y-4 text-gray-400 text-sm">
// // //                 <li className="hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-2 flex items-center gap-2">
// // //                   <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
// // //                   Airport Rentals
// // //                 </li>
// // //                 <li className="hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-2 flex items-center gap-2">
// // //                   <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
// // //                   Luxury Cars
// // //                 </li>
// // //                 <li className="hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-2 flex items-center gap-2">
// // //                   <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
// // //                   Long Term Rentals
// // //                 </li>
// // //                 <li className="hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-2 flex items-center gap-2">
// // //                   <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
// // //                   Doorstep Delivery
// // //                 </li>
// // //               </ul>
// // //             </div>
// // //             <div>
// // //               <h4 className="font-bold text-lg mb-8 relative inline-block">
// // //                 Contact Info
// // //                 <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></span>
// // //               </h4>
// // //               <ul className="space-y-4 text-gray-400 text-sm">
// // //                 <li className="flex items-start gap-3">
// // //                   <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
// // //                     📍
// // //                   </div>
// // //                   <span>Kathmandu, Nepal</span>
// // //                 </li>
// // //                 <li className="flex items-start gap-3">
// // //                   <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
// // //                     📞
// // //                   </div>
// // //                   <span>+977 9844177965</span>
// // //                 </li>
// // //                 <li className="flex items-start gap-3">
// // //                   <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
// // //                     ✉️
// // //                   </div>
// // //                   <span>support@rentride.com</span>
// // //                 </li>
// // //                 <li className="flex items-start gap-3">
// // //                   <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
// // //                     🕐
// // //                   </div>
// // //                   <span>24/7 Customer Support</span>
// // //                 </li>
// // //               </ul>
// // //             </div>
// // //           </div>

// // //           <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
// // //             <p>© {new Date().getFullYear()} RentRide. All rights reserved.</p>
// // //             <p className="mt-2 text-xs">
// // //               Premium car rental service in Kathmandu, Nepal
// // //             </p>
// // //           </div>
// // //         </div>
// // //       </footer>
// // //     </div>
// // //   );
// // // }

// // // /* Components */
// // // function Feature({
// // //   icon,
// // //   title,
// // //   desc,
// // //   gradient = "from-blue-500 to-blue-600",
// // // }) {
// // //   return (
// // //     <div className="group relative">
// // //       <div className="absolute -inset-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 blur transition duration-500 group-hover:duration-200 rounded-2xl"></div>
// // //       <div className="relative bg-white rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 border border-gray-100">
// // //         <div
// // //           className={`bg-gradient-to-br ${gradient} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
// // //         >
// // //           {icon}
// // //         </div>
// // //         <h4 className="font-bold text-xl mb-3 group-hover:text-blue-600 transition-colors">
// // //           {title}
// // //         </h4>
// // //         <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
// // //         <div className="mt-6 h-1 w-12 bg-gradient-to-r from-gray-200 to-transparent group-hover:from-blue-500 transition-all duration-300"></div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function Advantage({ icon, title, desc, color = "blue", stat }) {
// // //   const colorClasses = {
// // //     blue: "from-blue-500 to-blue-600",
// // //     green: "from-green-500 to-green-600",
// // //     purple: "from-purple-500 to-purple-600",
// // //     orange: "from-orange-500 to-orange-600",
// // //     red: "from-red-500 to-red-600",
// // //   };

// // //   return (
// // //     <div className="group relative">
// // //       <div className="absolute -inset-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 blur transition duration-500 group-hover:duration-200 rounded-2xl"></div>
// // //       <div className="relative bg-white rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
// // //         <div
// // //           className={`bg-gradient-to-br ${colorClasses[color]} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
// // //         >
// // //           {icon}
// // //         </div>
// // //         <h4 className="font-bold text-xl mb-3 group-hover:text-gray-800 transition-colors">
// // //           {title}
// // //         </h4>
// // //         <p className="text-gray-600 text-sm leading-relaxed mb-4">{desc}</p>
// // //         {stat && (
// // //           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gray-50 to-gray-100 text-sm font-semibold">
// // //             <FaCheckCircle className="text-green-500" />
// // //             <span>{stat}</span>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function Step({ number, title, desc, icon }) {
// // //   return (
// // //     <div className="relative z-20">
// // //       <div className="text-center bg-white p-10 rounded-2xl shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 group">
// // //         <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 relative">
// // //           {number}
// // //         </div>
// // //         <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center mx-auto mb-4 text-blue-600">
// // //           {icon}
// // //         </div>
// // //         <h4 className="font-bold text-xl mb-4 group-hover:text-blue-600 transition-colors">
// // //           {title}
// // //         </h4>
// // //         <p className="text-gray-600 leading-relaxed">{desc}</p>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function Testimonial({
// // //   name,
// // //   role,
// // //   text,
// // //   rating,
// // //   avatarColor = "bg-blue-100",
// // // }) {
// // //   return (
// // //     <div className="group">
// // //       <div className="bg-white rounded-2xl p-10 shadow-2xl hover:shadow-3xl border border-gray-100 transition-all duration-500 hover:-translate-y-3">
// // //         <div className="flex mb-6">
// // //           {[...Array(5)].map((_, i) => (
// // //             <FaStar
// // //               key={i}
// // //               className={`text-lg ${
// // //                 i < rating ? "text-yellow-400" : "text-gray-300"
// // //               }`}
// // //             />
// // //           ))}
// // //         </div>
// // //         <p className="text-gray-700 text-lg leading-relaxed italic mb-8">
// // //           "{text}"
// // //         </p>
// // //         <div className="flex items-center pt-8 border-t border-gray-100">
// // //           <div
// // //             className={`w-14 h-14 rounded-full ${avatarColor} flex items-center justify-center text-2xl font-bold mr-4 shadow-lg`}
// // //           >
// // //             {name.charAt(0)}
// // //           </div>
// // //           <div>
// // //             <p className="font-bold text-gray-900 text-lg">{name}</p>
// // //             <p className="text-sm text-gray-500">{role}</p>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function Faq({ q, a }) {
// // //   const [open, setOpen] = useState(false);
// // //   return (
// // //     <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group">
// // //       <button
// // //         onClick={() => setOpen(!open)}
// // //         className="w-full flex justify-between items-center p-8 text-left hover:bg-gray-50 transition-colors duration-300"
// // //       >
// // //         <div className="flex items-start gap-4">
// // //           <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
// // //             <span className="text-blue-600 font-semibold">?</span>
// // //           </div>
// // //           <span className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
// // //             {q}
// // //           </span>
// // //         </div>
// // //         <div
// // //           className={`w-10 h-10 rounded-full bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center transition-all duration-300 ${
// // //             open ? "rotate-180 bg-blue-100" : ""
// // //           }`}
// // //         >
// // //           <FaChevronDown className="text-blue-600" />
// // //         </div>
// // //       </button>
// // //       {open && (
// // //         <div className="px-8 pb-8">
// // //           <div className="pl-12 border-l-2 border-blue-200">
// // //             <p className="text-gray-600 leading-relaxed">{a}</p>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // import { Link } from "react-router-dom";
// // import { useState, useEffect } from "react";
// // import {
// //   FaCar,
// //   FaDollarSign,
// //   FaShieldAlt,
// //   FaClock,
// //   FaUserTie,
// //   FaTruck,
// //   FaHeadset,
// //   FaChevronDown,
// //   FaStar,
// //   FaCheckCircle,
// //   FaMapMarkerAlt,
// //   FaBolt,
// //   FaCrown,
// //   FaHeart,
// //   FaRegHeart,
// //   FaUsers,
// //   FaSnowflake,
// //   FaCogs,
// //   FaChair,
// //   FaInfoCircle,
// //   FaSearch,
// //   FaPhone,
// //   FaCalendarAlt,
// //   FaEnvelope,
// //   FaUserCircle,
// //   FaArrowRight,
// //   FaCreditCard,
// //   FaIdCard,
// //   FaFacebook,
// //   FaTwitter,
// //   FaInstagram,
// //   FaWhatsapp,
// //   FaArrowUp,
// // } from "react-icons/fa";
// // import { motion, AnimatePresence } from "framer-motion";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";

// // /* Image imports */
// // import heroVideo from "../../assets/Dashboard/INtro.mp4";
// // import sedan from "../../assets/Dashboard/sedan.jpg";
// // import suv from "../../assets/Dashboard/suv.jpg";
// // import ev from "../../assets/Dashboard/ev.jpg";
// // import convertible from "../../assets/Dashboard/convertible.jpg";
// // import minivan from "../../assets/Dashboard/minivan.jpg";
// // import sport from "../../assets/Dashboard/sport.jpg";

// // const API_URL = "http://localhost:5000/api";

// // export default function App() {
// //   const [favorites, setFavorites] = useState(new Set());
// //   const [vehicles, setVehicles] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const [filteredVehicles, setFilteredVehicles] = useState([]);
// //   const [activeFilter, setActiveFilter] = useState("All vehicles");
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [selectedVehicle, setSelectedVehicle] = useState(null);
// //   const [showDetailsModal, setShowDetailsModal] = useState(false);
// //   const [showScrollTop, setShowScrollTop] = useState(false);
// //   const [activeNav, setActiveNav] = useState("home");
// //   const navigate = useNavigate();

// //   const filters = [
// //     "All vehicles",
// //     "Sedan",
// //     "SUV",
// //     "Hatchback",
// //     "MPV",
// //     "Coupe",
// //     "Convertible",
// //     "Pickup",
// //     "Minivan",
// //     "Electric",
// //   ];

// //   // Scroll to top button visibility
// //   useEffect(() => {
// //     const handleScroll = () => {
// //       setShowScrollTop(window.scrollY > 500);
// //       const sections = ["home", "vehicles", "how-it-works", "contact"];
// //       for (const section of sections) {
// //         const element = document.getElementById(section);
// //         if (element) {
// //           const rect = element.getBoundingClientRect();
// //           if (rect.top <= 100 && rect.bottom >= 100) {
// //             setActiveNav(section);
// //             break;
// //           }
// //         }
// //       }
// //     };
// //     window.addEventListener("scroll", handleScroll);
// //     return () => window.removeEventListener("scroll", handleScroll);
// //   }, []);

// //   // Fetch vehicles
// //   useEffect(() => {
// //     fetchVehicles();
// //   }, []);

// //   const fetchVehicles = async () => {
// //     try {
// //       setLoading(true);
// //       setError("");

// //       const adminResponse = await axios.get(
// //         "http://localhost:5000/api/vehicles",
// //         { timeout: 10000 },
// //       );

// //       let userVehicles = [];
// //       try {
// //         const userResponse = await axios.get(
// //           "http://localhost:5000/api/user-vehicles/public/active",
// //           { timeout: 10000 },
// //         );
// //         if (userResponse.data.success) userVehicles = userResponse.data.data;
// //       } catch (userError) {
// //         console.log("Could not fetch user vehicles:", userError.message);
// //       }

// //       let allVehicles = [];
// //       if (adminResponse.data && Array.isArray(adminResponse.data)) {
// //         allVehicles = [...adminResponse.data];
// //       } else if (
// //         adminResponse.data?.data &&
// //         Array.isArray(adminResponse.data.data)
// //       ) {
// //         allVehicles = [...adminResponse.data.data];
// //       }

// //       userVehicles.forEach((userVehicle) =>
// //         allVehicles.push({ ...userVehicle, source: "user" }),
// //       );

// //       setVehicles(allVehicles);
// //       setFilteredVehicles(allVehicles);
// //     } catch (error) {
// //       console.error("Error fetching vehicles:", error);
// //       setError("Failed to load vehicles. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const toggleFavorite = (vehicleId, e) => {
// //     e?.stopPropagation();
// //     const newWishlist = new Set(favorites);
// //     if (newWishlist.has(vehicleId)) {
// //       newWishlist.delete(vehicleId);
// //     } else {
// //       newWishlist.add(vehicleId);
// //     }
// //     setFavorites(newWishlist);
// //   };

// //   useEffect(() => {
// //     const filtered = vehicles.filter((vehicle) => {
// //       const matchesFilter =
// //         activeFilter === "All vehicles" ||
// //         vehicle.carType?.toLowerCase() === activeFilter.toLowerCase();
// //       const matchesSearch =
// //         searchQuery === "" ||
// //         vehicle.carName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //         vehicle.carType?.toLowerCase().includes(searchQuery.toLowerCase());
// //       return matchesFilter && matchesSearch;
// //     });
// //     setFilteredVehicles(filtered);
// //   }, [activeFilter, searchQuery, vehicles]);

// //   const getVehicleImage = (vehicle) => {
// //     if (vehicle.photos?.length > 0) {
// //       const extraView = vehicle.photos.find(
// //         (photo) => photo.label === "Extra View",
// //       );
// //       const photo = extraView || vehicle.photos[0];
// //       const folder = vehicle.source === "user" ? "user-vehicles" : "vehicles";
// //       return `http://localhost:5000/uploads/${folder}/${photo.filename}`;
// //     }
// //     switch (vehicle.carType) {
// //       case "SUV":
// //         return suv;
// //       case "Sedan":
// //         return sedan;
// //       case "Hatchback":
// //         return sedan;
// //       case "MPV":
// //         return minivan;
// //       case "Convertible":
// //         return convertible;
// //       case "Coupe":
// //         return sport;
// //       case "Pickup":
// //         return suv;
// //       case "Minivan":
// //         return minivan;
// //       case "Electric":
// //         return ev;
// //       default:
// //         return sedan;
// //     }
// //   };

// //   const handleViewDetails = (vehicle) => {
// //     setSelectedVehicle(vehicle);
// //     setShowDetailsModal(true);
// //   };

// //   const handleBookNow = (vehicle) => {
// //     navigate(`/booking/${vehicle._id}`);
// //   };

// //   const formatPrice = (price) => `रु ${price.toLocaleString()}`;

// //   const scrollToTop = () => {
// //     window.scrollTo({ top: 0, behavior: "smooth" });
// //   };

// //   const scrollToSection = (sectionId) => {
// //     const section = document.getElementById(sectionId);
// //     if (section) {
// //       section.scrollIntoView({ behavior: "smooth" });
// //       setActiveNav(sectionId);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="relative w-24 h-24 mx-auto mb-6">
// //             <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full"></div>
// //             <div className="absolute inset-0 border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
// //             <div className="absolute inset-2 border-4 border-t-transparent border-r-blue-500 border-b-transparent border-l-transparent rounded-full animate-spin animation-delay-300"></div>
// //             <FaCar className="absolute inset-0 m-auto text-white text-2xl animate-pulse" />
// //           </div>
// //           <p className="text-white/80 text-lg">Loading premium vehicles...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 flex items-center justify-center">
// //         <div className="text-center max-w-md mx-auto p-8 bg-white/10 backdrop-blur-lg rounded-2xl">
// //           <div className="text-6xl mb-4">⚠️</div>
// //           <h3 className="text-xl font-semibold text-white mb-2">
// //             Something went wrong
// //           </h3>
// //           <p className="text-white/70 mb-6">{error}</p>
// //           <button
// //             onClick={fetchVehicles}
// //             className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
// //           >
// //             Try Again
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="font-sans text-gray-900 bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
// //       {/* Navbar */}
// //       <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100">
// //         <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
// //           <div
// //             className="flex items-center gap-3 cursor-pointer group"
// //             onClick={() => scrollToSection("home")}
// //           >
// //             <div className="p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
// //               <FaCar className="text-white text-2xl" />
// //             </div>
// //             <div>
// //               <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
// //                 Rent<span className="text-gray-800">Ride</span>
// //               </h1>
// //               <p className="text-xs text-gray-500 -mt-1">Premium Car Rentals</p>
// //             </div>
// //           </div>

// //           {/* Desktop Navigation */}
// //           <div className="hidden lg:flex items-center gap-8">
// //             {[
// //               { id: "home", label: "Home" },
// //               { id: "vehicles", label: "Vehicles" },
// //               { id: "how-it-works", label: "How It Works" },
// //               { id: "contact", label: "Contact" },
// //             ].map((item) => (
// //               <button
// //                 key={item.id}
// //                 onClick={() => scrollToSection(item.id)}
// //                 className={`relative text-sm font-medium transition-all duration-300 ${
// //                   activeNav === item.id
// //                     ? "text-purple-600"
// //                     : "text-gray-700 hover:text-purple-600"
// //                 }`}
// //               >
// //                 {item.label}
// //                 {activeNav === item.id && (
// //                   <motion.div
// //                     layoutId="activeNav"
// //                     className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"
// //                     initial={{ width: 0 }}
// //                     animate={{ width: "100%" }}
// //                     transition={{ duration: 0.3 }}
// //                   />
// //                 )}
// //               </button>
// //             ))}
// //           </div>

// //           {/* Search Bar - Desktop */}
// //           <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
// //             <div className="relative w-full">
// //               <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
// //               <input
// //                 type="text"
// //                 placeholder="Search by car name or type..."
// //                 value={searchQuery}
// //                 onChange={(e) => setSearchQuery(e.target.value)}
// //                 className="w-full pl-11 pr-4 py-2.5 bg-gray-100 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
// //               />
// //             </div>
// //           </div>

// //           <div className="flex items-center gap-3">
// //             <Link
// //               to="/login"
// //               className="px-5 py-2 border-2 border-purple-600 text-purple-600 font-semibold rounded-full hover:bg-purple-50 transition-all duration-300 text-sm"
// //             >
// //               Login
// //             </Link>
// //             <Link
// //               to="/signup"
// //               className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all"
// //             >
// //               Sign Up
// //             </Link>
// //           </div>
// //         </div>

// //         {/* Mobile Search */}
// //         <div className="md:hidden px-6 pb-4">
// //           <div className="relative">
// //             <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
// //             <input
// //               type="text"
// //               placeholder="Search vehicles..."
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //               className="w-full pl-11 pr-4 py-3 bg-gray-100 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
// //             />
// //           </div>
// //         </div>
// //       </nav>

// //       {/* Hero Section */}
// //       <section id="home" className="pt-24 pb-16 px-6">
// //         <div className="max-w-7xl mx-auto">
// //           <div className="grid lg:grid-cols-2 gap-12 items-center">
// //             <motion.div
// //               initial={{ opacity: 0, x: -50 }}
// //               animate={{ opacity: 1, x: 0 }}
// //               transition={{ duration: 0.6 }}
// //               className="space-y-6"
// //             >
// //               <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full">
// //                 <FaBolt className="text-purple-600 text-sm" />
// //                 <span className="text-sm font-semibold text-purple-700">
// //                   Trusted by 10,000+ Customers
// //                 </span>
// //               </div>
// //               <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
// //                 Drive Your{" "}
// //                 <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
// //                   Dream Car
// //                 </span>
// //                 <br />
// //                 in Kathmandu
// //               </h1>
// //               <p className="text-gray-600 text-lg max-w-md">
// //                 Experience luxury and convenience with our premium car rental
// //                 service. Book online in minutes, drive away in style.
// //               </p>
// //               <div className="flex flex-wrap gap-4">
// //                 <button
// //                   onClick={() => scrollToSection("vehicles")}
// //                   className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:shadow-xl transition-all transform hover:scale-105"
// //                 >
// //                   Explore Cars
// //                 </button>
// //                 <button
// //                   onClick={() => scrollToSection("how-it-works")}
// //                   className="px-8 py-3.5 border-2 border-purple-600 text-purple-600 font-semibold rounded-full hover:bg-purple-50 transition-all"
// //                 >
// //                   How It Works
// //                 </button>
// //               </div>

// //               {/* Stats */}
// //               <div className="flex flex-wrap gap-8 pt-8">
// //                 {[
// //                   { value: "10K+", label: "Happy Customers", icon: FaUsers },
// //                   { value: "200+", label: "Premium Vehicles", icon: FaCar },
// //                   { value: "15+", label: "Cities", icon: FaMapMarkerAlt },
// //                   { value: "24/7", label: "Support", icon: FaHeadset },
// //                 ].map((stat, idx) => (
// //                   <div key={idx} className="text-center">
// //                     <div className="text-2xl font-bold text-gray-900">
// //                       {stat.value}
// //                     </div>
// //                     <div className="text-sm text-gray-500 flex items-center gap-1">
// //                       <stat.icon className="text-purple-500 text-xs" />{" "}
// //                       {stat.label}
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </motion.div>

// //             <motion.div
// //               initial={{ opacity: 0, x: 50 }}
// //               animate={{ opacity: 1, x: 0 }}
// //               transition={{ duration: 0.6, delay: 0.2 }}
// //               className="relative"
// //             >
// //               <div className="relative rounded-2xl overflow-hidden shadow-2xl">
// //                 <video
// //                   src={heroVideo}
// //                   autoPlay
// //                   muted
// //                   loop
// //                   playsInline
// //                   className="w-full h-[400px] object-cover"
// //                 />
// //                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
// //               </div>
// //               <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 backdrop-blur-sm">
// //                 <p className="text-sm font-semibold text-gray-800">
// //                   {vehicles.length}+ Vehicles Available
// //                 </p>
// //                 <p className="text-xs text-gray-500">24/7 pickup & delivery</p>
// //               </div>
// //             </motion.div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Features Section */}
// //       <section className="py-20 px-6 bg-gradient-to-br from-purple-50/50 to-pink-50/50">
// //         <div className="max-w-7xl mx-auto">
// //           <div className="text-center mb-12">
// //             <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold mb-4">
// //               WHY CHOOSE US
// //             </span>
// //             <h2 className="text-4xl font-bold text-gray-900 mb-4">
// //               The Best Rental Experience
// //             </h2>
// //             <p className="text-gray-600 max-w-2xl mx-auto">
// //               We combine technology with personalized service to deliver an
// //               exceptional car rental experience
// //             </p>
// //           </div>
// //           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
// //             {[
// //               {
// //                 icon: FaCar,
// //                 title: "Wide Selection",
// //                 desc: "Choose from premium vehicles for every need",
// //                 color: "from-blue-500 to-cyan-400",
// //               },
// //               {
// //                 icon: FaClock,
// //                 title: "Easy Booking",
// //                 desc: "Book in 3 simple steps, 24/7 availability",
// //                 color: "from-green-500 to-emerald-400",
// //               },
// //               {
// //                 icon: FaShieldAlt,
// //                 title: "Fully Insured",
// //                 desc: "Comprehensive coverage for peace of mind",
// //                 color: "from-purple-500 to-pink-400",
// //               },
// //               {
// //                 icon: FaCreditCard,
// //                 title: "Flexible Payment",
// //                 desc: "Multiple payment options available",
// //                 color: "from-orange-500 to-yellow-400",
// //               },
// //             ].map((feature, idx) => (
// //               <motion.div
// //                 key={idx}
// //                 initial={{ opacity: 0, y: 30 }}
// //                 whileInView={{ opacity: 1, y: 0 }}
// //                 transition={{ duration: 0.5, delay: idx * 0.1 }}
// //                 viewport={{ once: true }}
// //                 className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
// //               >
// //                 <div
// //                   className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
// //                 >
// //                   <feature.icon className="text-white text-2xl" />
// //                 </div>
// //                 <h3 className="text-xl font-bold text-gray-900 mb-2">
// //                   {feature.title}
// //                 </h3>
// //                 <p className="text-gray-600">{feature.desc}</p>
// //               </motion.div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Vehicle Filter Section */}
// //       <section id="vehicles" className="py-20 px-6">
// //         <div className="max-w-7xl mx-auto">
// //           <div className="text-center mb-12">
// //             <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
// //               OUR FLEET
// //             </span>
// //             <h2 className="text-4xl font-bold text-gray-900 mb-4">
// //               Choose Your Perfect Ride
// //             </h2>
// //             <p className="text-gray-600 max-w-2xl mx-auto">
// //               Select from our premium collection of vehicles
// //             </p>
// //           </div>

// //           {/* Filter Buttons */}
// //           <div className="flex flex-wrap justify-center gap-3 mb-12">
// //             {filters.map((filter) => (
// //               <button
// //                 key={filter}
// //                 onClick={() => setActiveFilter(filter)}
// //                 className={`px-5 py-2.5 rounded-full transition-all duration-300 ${
// //                   activeFilter === filter
// //                     ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
// //                     : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm border border-gray-200"
// //                 }`}
// //               >
// //                 {filter} {filter === "All vehicles" && `(${vehicles.length})`}
// //               </button>
// //             ))}
// //           </div>

// //           {/* Vehicles Grid */}
// //           {filteredVehicles.length === 0 ? (
// //             <div className="text-center py-20">
// //               <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
// //                 <FaCar className="text-gray-400 text-4xl" />
// //               </div>
// //               <h3 className="text-xl font-semibold text-gray-700 mb-2">
// //                 No vehicles found
// //               </h3>
// //               <p className="text-gray-500">
// //                 {searchQuery
// //                   ? `No results for "${searchQuery}"`
// //                   : "Try selecting a different category"}
// //               </p>
// //             </div>
// //           ) : (
// //             <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// //               {filteredVehicles.map((vehicle, idx) => (
// //                 <motion.div
// //                   key={vehicle._id}
// //                   initial={{ opacity: 0, y: 30 }}
// //                   whileInView={{ opacity: 1, y: 0 }}
// //                   transition={{ duration: 0.5, delay: idx * 0.05 }}
// //                   viewport={{ once: true }}
// //                   className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 cursor-pointer hover:-translate-y-2"
// //                   onClick={() => handleViewDetails(vehicle)}
// //                 >
// //                   {/* Wishlist Button */}
// //                   <button
// //                     onClick={(e) => toggleFavorite(vehicle._id, e)}
// //                     className="absolute top-4 right-4 z-10 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:scale-110 transition-transform duration-300"
// //                   >
// //                     <FaHeart
// //                       className={`text-lg ${favorites.has(vehicle._id) ? "text-red-500 fill-red-500" : "text-gray-400"}`}
// //                     />
// //                   </button>

// //                   {/* Status Badge */}
// //                   <div className="absolute top-4 left-4 z-10">
// //                     <span
// //                       className={`px-3 py-1.5 rounded-full text-xs font-semibold ${vehicle.status === "Available" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
// //                     >
// //                       {vehicle.status}
// //                     </span>
// //                   </div>

// //                   {/* Car Image */}
// //                   <div className="h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
// //                     <img
// //                       src={getVehicleImage(vehicle)}
// //                       alt={vehicle.carName}
// //                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
// //                       onError={(e) => {
// //                         e.target.src = sedan;
// //                       }}
// //                     />
// //                   </div>

// //                   {/* Car Details */}
// //                   <div className="p-5">
// //                     <div className="flex items-start justify-between mb-3">
// //                       <div>
// //                         <h3 className="text-lg font-bold text-gray-800">
// //                           {vehicle.carName}
// //                         </h3>
// //                         <div className="flex items-center gap-1 mt-1">
// //                           {[...Array(5)].map((_, i) => (
// //                             <FaStar
// //                               key={i}
// //                               className={`text-xs ${i < 4 ? "text-yellow-400" : "text-gray-300"}`}
// //                             />
// //                           ))}
// //                           <span className="text-xs text-gray-500 ml-1">
// //                             (128 reviews)
// //                           </span>
// //                         </div>
// //                       </div>
// //                       <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
// //                         {vehicle.carType}
// //                       </span>
// //                     </div>

// //                     <div className="flex items-center gap-3 mb-4 text-sm text-gray-500">
// //                       <div className="flex items-center gap-1">
// //                         <FaCogs size={12} />
// //                         <span>{vehicle.gearType}</span>
// //                       </div>
// //                       <div className="flex items-center gap-1">
// //                         <FaChair size={12} />
// //                         <span>{vehicle.seats} seats</span>
// //                       </div>
// //                     </div>

// //                     <div className="flex items-center justify-between pt-3 border-t border-gray-100">
// //                       <div>
// //                         <p className="text-xs text-gray-500">Daily rate</p>
// //                         <p className="text-xl font-bold text-gray-900">
// //                           {formatPrice(vehicle.ratePerDay)}
// //                           <span className="text-sm font-normal text-gray-500">
// //                             /day
// //                           </span>
// //                         </p>
// //                       </div>
// //                       <button
// //                         onClick={(e) => {
// //                           e.stopPropagation();
// //                           handleViewDetails(vehicle);
// //                         }}
// //                         className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-lg hover:shadow-lg transition-all"
// //                       >
// //                         View Details
// //                       </button>
// //                     </div>
// //                   </div>
// //                 </motion.div>
// //               ))}
// //             </div>
// //           )}
// //         </div>
// //       </section>

// //       {/* How It Works */}
// //       <section
// //         id="how-it-works"
// //         className="py-20 px-6 bg-gradient-to-br from-slate-900 to-purple-900"
// //       >
// //         <div className="max-w-7xl mx-auto">
// //           <div className="text-center mb-12">
// //             <span className="inline-block px-4 py-1.5 bg-white/20 text-white rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
// //               SIMPLE PROCESS
// //             </span>
// //             <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
// //             <p className="text-white/70 max-w-2xl mx-auto">
// //               Get your perfect ride in three simple steps
// //             </p>
// //           </div>
// //           <div className="grid md:grid-cols-3 gap-8">
// //             {[
// //               {
// //                 number: "01",
// //                 title: "Choose Vehicle",
// //                 desc: "Browse our fleet and select your preferred vehicle",
// //                 icon: FaCar,
// //                 color: "from-blue-500 to-cyan-400",
// //               },
// //               {
// //                 number: "02",
// //                 title: "Book & Pay",
// //                 desc: "Select dates, add extras, and complete secure payment",
// //                 icon: FaCreditCard,
// //                 color: "from-purple-500 to-pink-500",
// //               },
// //               {
// //                 number: "03",
// //                 title: "Get Your Vehicle",
// //                 desc: "Pick up from our location or get doorstep delivery",
// //                 icon: FaMapMarkerAlt,
// //                 color: "from-green-500 to-emerald-500",
// //               },
// //             ].map((step, idx) => (
// //               <motion.div
// //                 key={idx}
// //                 initial={{ opacity: 0, y: 30 }}
// //                 whileInView={{ opacity: 1, y: 0 }}
// //                 transition={{ duration: 0.5, delay: idx * 0.1 }}
// //                 viewport={{ once: true }}
// //                 className="relative text-center"
// //               >
// //                 <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
// //                   {step.number}
// //                 </div>
// //                 <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 pt-12 border border-white/20 hover:border-white/40 transition-all">
// //                   <div
// //                     className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center mx-auto mb-5 shadow-lg`}
// //                   >
// //                     <step.icon className="text-white text-3xl" />
// //                   </div>
// //                   <h3 className="text-xl font-bold text-white mb-2">
// //                     {step.title}
// //                   </h3>
// //                   <p className="text-white/70">{step.desc}</p>
// //                 </div>
// //                 {idx < 2 && (
// //                   <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-white/30 text-3xl">
// //                     <FaArrowRight />
// //                   </div>
// //                 )}
// //               </motion.div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Delivery Information */}
// //       <section className="py-20 px-6">
// //         <div className="max-w-7xl mx-auto">
// //           <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-10">
// //             <div className="text-center mb-10">
// //               <h2 className="text-3xl font-bold text-gray-800">
// //                 Delivery Options
// //               </h2>
// //               <p className="text-gray-600 mt-2">
// //                 Choose how you want to receive your vehicle
// //               </p>
// //             </div>
// //             <div className="grid md:grid-cols-2 gap-8">
// //               <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all">
// //                 <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
// //                   <FaMapMarkerAlt className="text-blue-600 text-2xl" />
// //                 </div>
// //                 <h3 className="text-xl font-bold text-gray-800 mb-2">
// //                   Pickup from Location
// //                 </h3>
// //                 <p className="text-gray-600">
// //                   Collect your vehicle from our nearest branch. Our team will
// //                   assist you with the handover process.
// //                 </p>
// //                 <ul className="mt-4 text-left text-sm text-gray-500 space-y-2">
// //                   <li className="flex items-center gap-2">
// //                     <FaCheckCircle className="text-green-500 text-sm" /> Free
// //                     pickup service
// //                   </li>
// //                   <li className="flex items-center gap-2">
// //                     <FaCheckCircle className="text-green-500 text-sm" /> Vehicle
// //                     inspection on site
// //                   </li>
// //                   <li className="flex items-center gap-2">
// //                     <FaCheckCircle className="text-green-500 text-sm" />{" "}
// //                     Document verification
// //                   </li>
// //                 </ul>
// //               </div>
// //               <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all">
// //                 <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
// //                   <FaTruck className="text-purple-600 text-2xl" />
// //                 </div>
// //                 <h3 className="text-xl font-bold text-gray-800 mb-2">
// //                   Doorstep Delivery
// //                 </h3>
// //                 <p className="text-gray-600">
// //                   Get your vehicle delivered to your home, hotel, or office. Our
// //                   driver will bring the car to you.
// //                 </p>
// //                 <ul className="mt-4 text-left text-sm text-gray-500 space-y-2">
// //                   <li className="flex items-center gap-2">
// //                     <FaCheckCircle className="text-green-500 text-sm" />{" "}
// //                     Delivery within Kathmandu Valley
// //                   </li>
// //                   <li className="flex items-center gap-2">
// //                     <FaCheckCircle className="text-green-500 text-sm" /> Free
// //                     delivery for 3+ days booking
// //                   </li>
// //                   <li className="flex items-center gap-2">
// //                     <FaCheckCircle className="text-green-500 text-sm" />{" "}
// //                     Real-time tracking available
// //                   </li>
// //                 </ul>
// //               </div>
// //             </div>
// //             <div className="mt-8 text-center">
// //               <p className="text-sm text-gray-500">
// //                 After booking confirmation, you'll receive a call from our
// //                 support team to confirm delivery/pickup details.
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Stats Section */}
// //       <section className="py-16 px-6 bg-white">
// //         <div className="max-w-7xl mx-auto">
// //           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
// //             {[
// //               {
// //                 value: "98%",
// //                 label: "Customer Satisfaction",
// //                 icon: FaCheckCircle,
// //               },
// //               { value: "5-min", label: "Quick Response", icon: FaClock },
// //               { value: "₹0", label: "Hidden Fees", icon: FaShieldAlt },
// //               { value: "24/7", label: "Support Available", icon: FaHeadset },
// //             ].map((stat, idx) => (
// //               <div key={idx} className="text-center">
// //                 <div className="text-3xl font-bold text-purple-600 mb-2">
// //                   {stat.value}
// //                 </div>
// //                 <div className="text-sm text-gray-500 flex items-center justify-center gap-1">
// //                   <stat.icon className="text-purple-400" /> {stat.label}
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* CTA Section */}
// //       <section className="py-20 px-6">
// //         <div className="max-w-7xl mx-auto">
// //           <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 p-12 text-center">
// //             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
// //             <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-48 translate-y-48"></div>
// //             <div className="relative z-10">
// //               <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full mb-6">
// //                 <FaCrown className="text-yellow-300" />
// //                 <span className="text-white font-semibold">
// //                   Premium Service Guaranteed
// //                 </span>
// //               </div>
// //               <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
// //                 Ready to Hit the Road?
// //               </h2>
// //               <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
// //                 Join thousands of satisfied customers and experience premium car
// //                 rental service like never before
// //               </p>
// //               <div className="flex flex-col sm:flex-row gap-4 justify-center">
// //                 <Link
// //                   to="/signup"
// //                   className="px-8 py-3.5 bg-white text-purple-600 font-semibold rounded-full hover:shadow-xl transition-all transform hover:scale-105"
// //                 >
// //                   Sign Up Now
// //                 </Link>
// //                 <Link
// //                   to="/login"
// //                   className="px-8 py-3.5 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all"
// //                 >
// //                   Login to Account
// //                 </Link>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Footer */}
// //       <footer id="contact" className="bg-gray-900 text-white pt-16 pb-8">
// //         <div className="max-w-7xl mx-auto px-6">
// //           <div className="grid md:grid-cols-4 gap-10 mb-12">
// //             <div>
// //               <div className="flex items-center gap-3 mb-6">
// //                 <div className="p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
// //                   <FaCar className="text-white text-2xl" />
// //                 </div>
// //                 <div>
// //                   <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
// //                     Rent<span className="text-white">Ride</span>
// //                   </h1>
// //                   <p className="text-xs text-gray-400 -mt-1">
// //                     Premium Car Rentals
// //                   </p>
// //                 </div>
// //               </div>
// //               <p className="text-gray-400 text-sm leading-relaxed mb-6">
// //                 Premium car rental service offering the best rates and
// //                 exceptional customer experience in Nepal.
// //               </p>
// //               <div className="flex gap-3">
// //                 {[FaFacebook, FaTwitter, FaInstagram, FaWhatsapp].map(
// //                   (Icon, idx) => (
// //                     <div
// //                       key={idx}
// //                       className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer"
// //                     >
// //                       <Icon size={14} />
// //                     </div>
// //                   ),
// //                 )}
// //               </div>
// //             </div>

// //             <div>
// //               <h4 className="font-bold text-lg mb-6">Quick Links</h4>
// //               <ul className="space-y-3 text-gray-400 text-sm">
// //                 <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
// //                   About Us
// //                 </li>
// //                 <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
// //                   Contact Support
// //                 </li>
// //                 <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
// //                   Privacy Policy
// //                 </li>
// //                 <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
// //                   Terms & Conditions
// //                 </li>
// //               </ul>
// //             </div>

// //             <div>
// //               <h4 className="font-bold text-lg mb-6">Our Services</h4>
// //               <ul className="space-y-3 text-gray-400 text-sm">
// //                 <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
// //                   Airport Rentals
// //                 </li>
// //                 <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
// //                   Luxury Cars
// //                 </li>
// //                 <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
// //                   Long Term Rentals
// //                 </li>
// //                 <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
// //                   Doorstep Delivery
// //                 </li>
// //               </ul>
// //             </div>

// //             <div>
// //               <h4 className="font-bold text-lg mb-6">Contact Info</h4>
// //               <ul className="space-y-4 text-gray-400 text-sm">
// //                 <li className="flex items-start gap-3">
// //                   <span className="text-xl">📍</span>
// //                   <span>Kathmandu, Nepal</span>
// //                 </li>
// //                 <li className="flex items-center gap-3">
// //                   <span className="text-xl">📞</span>
// //                   <span>+977 9844177965</span>
// //                 </li>
// //                 <li className="flex items-center gap-3">
// //                   <span className="text-xl">✉️</span>
// //                   <span>support@rentride.com</span>
// //                 </li>
// //                 <li className="flex items-center gap-3">
// //                   <span className="text-xl">🕐</span>
// //                   <span>24/7 Customer Support</span>
// //                 </li>
// //               </ul>
// //             </div>
// //           </div>

// //           <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
// //             <p>© {new Date().getFullYear()} RentRide. All rights reserved.</p>
// //             <p className="mt-1 text-xs">
// //               Premium car rental service in Kathmandu, Nepal
// //             </p>
// //           </div>
// //         </div>
// //       </footer>

// //       {/* Scroll to Top Button */}
// //       <AnimatePresence>
// //         {showScrollTop && (
// //           <motion.button
// //             initial={{ opacity: 0, scale: 0 }}
// //             animate={{ opacity: 1, scale: 1 }}
// //             exit={{ opacity: 0, scale: 0 }}
// //             onClick={scrollToTop}
// //             className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
// //           >
// //             <FaArrowUp />
// //           </motion.button>
// //         )}
// //       </AnimatePresence>

// //       {/* Vehicle Details Modal */}
// //       {showDetailsModal && selectedVehicle && (
// //         <div className="fixed inset-0 z-[100]">
// //           <div
// //             className="absolute inset-0 bg-black/60 backdrop-blur-sm"
// //             onClick={() => setShowDetailsModal(false)}
// //           ></div>
// //           <div className="absolute inset-0 flex items-center justify-center p-4">
// //             <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
// //               <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center">
// //                 <div>
// //                   <h2 className="text-3xl font-bold text-gray-900">
// //                     {selectedVehicle.carName}
// //                   </h2>
// //                   <div className="flex items-center gap-3 mt-2">
// //                     <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
// //                       {selectedVehicle.carType}
// //                     </span>
// //                     <span
// //                       className={`px-3 py-1 rounded-full text-sm font-medium ${
// //                         selectedVehicle.status === "Available"
// //                           ? "bg-green-100 text-green-600"
// //                           : "bg-red-100 text-red-600"
// //                       }`}
// //                     >
// //                       {selectedVehicle.status}
// //                     </span>
// //                     <span className="text-gray-500">
// //                       {selectedVehicle.carNumber}
// //                     </span>
// //                   </div>
// //                 </div>
// //                 <button
// //                   onClick={() => setShowDetailsModal(false)}
// //                   className="p-3 hover:bg-gray-100 rounded-full transition-colors"
// //                 >
// //                   <span className="text-2xl text-gray-500">×</span>
// //                 </button>
// //               </div>
// //               <div className="p-8">
// //                 {/* Gallery */}
// //                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
// //                   {selectedVehicle.photos &&
// //                   selectedVehicle.photos.length > 0 ? (
// //                     selectedVehicle.photos.map((photo, index) => (
// //                       <div
// //                         key={index}
// //                         className={`${index === 0 ? "lg:col-span-2" : ""}`}
// //                       >
// //                         <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden">
// //                           <img
// //                             src={`http://localhost:5000/uploads/${selectedVehicle.source === "user" ? "user-vehicles" : "vehicles"}/${photo.filename}`}
// //                             alt={photo.label}
// //                             className="w-full h-full object-cover"
// //                           />
// //                           <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm backdrop-blur-sm">
// //                             {photo.label}
// //                           </div>
// //                         </div>
// //                       </div>
// //                     ))
// //                   ) : (
// //                     <div className="lg:col-span-3 h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
// //                       <FaCar className="text-8xl text-gray-300" />
// //                     </div>
// //                   )}
// //                 </div>

// //                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// //                   {/* Left Column - Specifications */}
// //                   <div className="lg:col-span-2">
// //                     <h3 className="text-2xl font-bold text-gray-900 mb-6">
// //                       Specifications
// //                     </h3>
// //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                       {[
// //                         {
// //                           icon: FaCogs,
// //                           label: "Transmission",
// //                           value: selectedVehicle.gearType,
// //                         },
// //                         {
// //                           icon: FaChair,
// //                           label: "Seats",
// //                           value: `${selectedVehicle.seats} Persons`,
// //                         },
// //                         {
// //                           icon: FaSnowflake,
// //                           label: "Air Conditioning",
// //                           value: selectedVehicle.airCondition,
// //                         },
// //                         {
// //                           icon: FaUserTie,
// //                           label: "Driver",
// //                           value: selectedVehicle.driverName || "Not Included",
// //                         },
// //                         {
// //                           icon: FaPhone,
// //                           label: "Contact",
// //                           value: selectedVehicle.phoneNumber,
// //                         },
// //                         {
// //                           icon: FaCalendarAlt,
// //                           label: "Booking Type",
// //                           value: selectedVehicle.bookingType,
// //                         },
// //                       ].map((spec, index) => (
// //                         <div
// //                           key={index}
// //                           className="flex items-center p-4 bg-gray-50 rounded-xl"
// //                         >
// //                           <div className="p-3 bg-white rounded-lg shadow-sm mr-4">
// //                             <spec.icon className="text-purple-600" />
// //                           </div>
// //                           <div>
// //                             <p className="text-sm text-gray-500">
// //                               {spec.label}
// //                             </p>
// //                             <p className="font-semibold text-gray-900">
// //                               {spec.value}
// //                             </p>
// //                           </div>
// //                         </div>
// //                       ))}
// //                     </div>

// //                     {selectedVehicle.features &&
// //                       selectedVehicle.features.length > 0 && (
// //                         <div className="mt-10">
// //                           <h3 className="text-2xl font-bold text-gray-900 mb-6">
// //                             Features & Amenities
// //                           </h3>
// //                           <div className="flex flex-wrap gap-3">
// //                             {selectedVehicle.features.map((feature, index) => (
// //                               <span
// //                                 key={index}
// //                                 className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg font-medium"
// //                               >
// //                                 {feature}
// //                               </span>
// //                             ))}
// //                           </div>
// //                         </div>
// //                       )}

// //                     {selectedVehicle.description && (
// //                       <div className="mt-10">
// //                         <h3 className="text-2xl font-bold text-gray-900 mb-4">
// //                           Description
// //                         </h3>
// //                         <p className="text-gray-600 leading-relaxed">
// //                           {selectedVehicle.description}
// //                         </p>
// //                       </div>
// //                     )}
// //                   </div>

// //                   {/* Right Column - Pricing & Booking */}
// //                   <div className="lg:col-span-1">
// //                     <div className="sticky top-24 bg-gradient-to-b from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-lg">
// //                       <div className="text-center mb-6">
// //                         <p className="text-gray-500 mb-2">Daily Rate</p>
// //                         <div className="flex items-baseline justify-center">
// //                           <span className="text-5xl font-bold text-gray-900">
// //                             रु{selectedVehicle.ratePerDay}
// //                           </span>
// //                           <span className="text-gray-500 ml-2">/day</span>
// //                         </div>
// //                       </div>

// //                       <div className="mb-6 p-4 bg-purple-50 border border-purple-100 rounded-lg">
// //                         <div className="flex items-start">
// //                           <FaInfoCircle className="text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
// //                           <div>
// //                             <h4 className="font-semibold text-purple-800 mb-1">
// //                               Complete Price Breakdown
// //                             </h4>
// //                             <p className="text-sm text-purple-700">
// //                               Full price calculation including optional extras
// //                               will be shown during booking.
// //                             </p>
// //                           </div>
// //                         </div>
// //                       </div>

// //                       <button
// //                         onClick={() => {
// //                           handleBookNow(selectedVehicle);
// //                           setShowDetailsModal(false);
// //                         }}
// //                         className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-green-500/30 hover:scale-105 transition-all duration-300"
// //                       >
// //                         Book This Vehicle
// //                       </button>

// //                       <div className="mt-6 text-center">
// //                         <p className="text-gray-500 text-sm">
// //                           • Free cancellation • 24/7 support • Instant
// //                           confirmation
// //                         </p>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import {
//   FaCar,
//   FaDollarSign,
//   FaShieldAlt,
//   FaClock,
//   FaUserTie,
//   FaTruck,
//   FaHeadset,
//   FaChevronDown,
//   FaStar,
//   FaCheckCircle,
//   FaMapMarkerAlt,
//   FaBolt,
//   FaCrown,
//   FaHeart,
//   FaRegHeart,
//   FaUsers,
//   FaSnowflake,
//   FaCogs,
//   FaChair,
//   FaInfoCircle,
//   FaSearch,
//   FaPhone,
//   FaCalendarAlt,
//   FaEnvelope,
//   FaUserCircle,
//   FaArrowRight,
//   FaCreditCard,
//   FaIdCard,
//   FaFacebook,
//   FaTwitter,
//   FaInstagram,
//   FaWhatsapp,
//   FaArrowUp,
// } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import BikesSection from "./BikesSection";

// /* Image imports */
// import heroVideo from "../../assets/Dashboard/INtro.mp4";
// import sedan from "../../assets/Dashboard/sedan.jpg";
// import suv from "../../assets/Dashboard/suv.jpg";
// import ev from "../../assets/Dashboard/ev.jpg";
// import convertible from "../../assets/Dashboard/convertible.jpg";
// import minivan from "../../assets/Dashboard/minivan.jpg";
// import sport from "../../assets/Dashboard/sport.jpg";

// const API_URL = "http://localhost:5000/api";

// const Home = () => {
//   const [favorites, setFavorites] = useState(new Set());
//   const [vehicles, setVehicles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [filteredVehicles, setFilteredVehicles] = useState([]);
//   const [activeFilter, setActiveFilter] = useState("All vehicles");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedVehicle, setSelectedVehicle] = useState(null);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [showScrollTop, setShowScrollTop] = useState(false);
//   const [activeNav, setActiveNav] = useState("home");
//   const [hoveredCard, setHoveredCard] = useState(null);
//   const navigate = useNavigate();

//   const filters = [
//     "All vehicles",
//     "Sedan",
//     "SUV",
//     "Hatchback",
//     "MPV",
//     "Coupe",
//     "Convertible",
//     "Pickup",
//     "Minivan",
//     "Electric",
//   ];

//   // Scroll to top button visibility
//   useEffect(() => {
//     const handleScroll = () => {
//       setShowScrollTop(window.scrollY > 500);
//       const sections = ["home", "vehicles", "how-it-works", "contact"];
//       for (const section of sections) {
//         const element = document.getElementById(section);
//         if (element) {
//           const rect = element.getBoundingClientRect();
//           if (rect.top <= 100 && rect.bottom >= 100) {
//             setActiveNav(section);
//             break;
//           }
//         }
//       }
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Fetch vehicles
//   useEffect(() => {
//     fetchVehicles();
//   }, []);

//   const fetchVehicles = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const adminResponse = await axios.get(
//         "http://localhost:5000/api/vehicles",
//         { timeout: 10000 },
//       );

//       let userVehicles = [];
//       try {
//         const userResponse = await axios.get(
//           "http://localhost:5000/api/user-vehicles/public/active",
//           { timeout: 10000 },
//         );
//         if (userResponse.data.success) userVehicles = userResponse.data.data;
//       } catch (userError) {
//         console.log("Could not fetch user vehicles:", userError.message);
//       }

//       let allVehicles = [];
//       if (adminResponse.data && Array.isArray(adminResponse.data)) {
//         allVehicles = [...adminResponse.data];
//       } else if (
//         adminResponse.data?.data &&
//         Array.isArray(adminResponse.data.data)
//       ) {
//         allVehicles = [...adminResponse.data.data];
//       }

//       userVehicles.forEach((userVehicle) =>
//         allVehicles.push({ ...userVehicle, source: "user" }),
//       );

//       setVehicles(allVehicles);
//       setFilteredVehicles(allVehicles);
//     } catch (error) {
//       console.error("Error fetching vehicles:", error);
//       setError("Failed to load vehicles. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleFavorite = (vehicleId, e) => {
//     e?.stopPropagation();
//     const newWishlist = new Set(favorites);
//     if (newWishlist.has(vehicleId)) {
//       newWishlist.delete(vehicleId);
//     } else {
//       newWishlist.add(vehicleId);
//     }
//     setFavorites(newWishlist);
//   };

//   useEffect(() => {
//     const filtered = vehicles.filter((vehicle) => {
//       const matchesFilter =
//         activeFilter === "All vehicles" ||
//         vehicle.carType?.toLowerCase() === activeFilter.toLowerCase();
//       const matchesSearch =
//         searchQuery === "" ||
//         vehicle.carName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         vehicle.carType?.toLowerCase().includes(searchQuery.toLowerCase());
//       return matchesFilter && matchesSearch;
//     });
//     setFilteredVehicles(filtered);
//   }, [activeFilter, searchQuery, vehicles]);

//   const getVehicleImage = (vehicle) => {
//     if (vehicle.photos?.length > 0) {
//       const extraView = vehicle.photos.find(
//         (photo) => photo.label === "Extra View",
//       );
//       const photo = extraView || vehicle.photos[0];
//       const folder = vehicle.source === "user" ? "user-vehicles" : "vehicles";
//       return `http://localhost:5000/uploads/${folder}/${photo.filename}`;
//     }
//     switch (vehicle.carType) {
//       case "SUV":
//         return suv;
//       case "Sedan":
//         return sedan;
//       case "Hatchback":
//         return sedan;
//       case "MPV":
//         return minivan;
//       case "Convertible":
//         return convertible;
//       case "Coupe":
//         return sport;
//       case "Pickup":
//         return suv;
//       case "Minivan":
//         return minivan;
//       case "Electric":
//         return ev;
//       default:
//         return sedan;
//     }
//   };

//   const handleViewDetails = (vehicle) => {
//     setSelectedVehicle(vehicle);
//     setShowDetailsModal(true);
//   };

//   const handleBookNow = (vehicle) => {
//     navigate(`/booking/${vehicle._id}`);
//   };

//   const formatPrice = (price) => `रु ${price.toLocaleString()}`;

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const scrollToSection = (sectionId) => {
//     const section = document.getElementById(sectionId);
//     if (section) {
//       section.scrollIntoView({ behavior: "smooth" });
//       setActiveNav(sectionId);
//     }
//   };

//   const CarCard = ({ vehicle, index }) => {
//     const imageUrl = getVehicleImage(vehicle);
//     const isWishlisted = favorites.has(vehicle._id);
//     const isHovered = hoveredCard === vehicle._id;

//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: index * 0.05 }}
//         viewport={{ once: true, margin: "-50px" }}
//         onHoverStart={() => setHoveredCard(vehicle._id)}
//         onHoverEnd={() => setHoveredCard(null)}
//         className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 cursor-pointer h-full flex flex-col"
//         onClick={() => handleViewDetails(vehicle)}
//       >
//         <motion.div
//           className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 rounded-2xl"
//           animate={{ opacity: isHovered ? 0.08 : 0 }}
//           transition={{ duration: 0.3 }}
//         />

//         <motion.button
//           whileTap={{ scale: 0.9 }}
//           onClick={(e) => toggleFavorite(vehicle._id, e)}
//           className="absolute top-4 right-4 z-10 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all duration-300"
//         >
//           <motion.div
//             animate={{ scale: isWishlisted ? [1, 1.2, 1] : 1 }}
//             transition={{ duration: 0.3 }}
//           >
//             <FaHeart
//               className={`text-lg ${isWishlisted ? "text-red-500 fill-red-500" : "text-gray-400"}`}
//             />
//           </motion.div>
//         </motion.button>

//         <div className="absolute top-4 left-4 z-10">
//           <motion.span
//             initial={{ x: -20, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             className={`px-3 py-1.5 rounded-full text-xs font-semibold ${vehicle.status === "Available" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
//           >
//             {vehicle.status}
//           </motion.span>
//         </div>

//         <div className="h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0">
//           <motion.img
//             src={imageUrl}
//             alt={vehicle.carName}
//             className="w-full h-full object-cover"
//             animate={{ scale: isHovered ? 1.1 : 1 }}
//             transition={{ duration: 0.5 }}
//           />
//         </div>

//         <div className="p-5 flex flex-col flex-grow">
//           <div className="flex justify-between items-start mb-3">
//             <div className="flex-1">
//               <div className="flex items-center gap-2 mb-1">
//                 <h3 className="text-lg font-bold text-gray-900 truncate">
//                   {vehicle.carName}
//                 </h3>
//                 <span className="px-2 py-0.5 bg-purple-50 text-purple-600 text-xs font-medium rounded-full whitespace-nowrap">
//                   {vehicle.carType}
//                 </span>
//               </div>
//               <div className="flex items-center gap-1 mt-1">
//                 {[...Array(5)].map((_, i) => (
//                   <FaStar
//                     key={i}
//                     className={`text-xs ${i < 4 ? "text-yellow-400" : "text-gray-300"}`}
//                   />
//                 ))}
//                 <span className="text-xs text-gray-500 ml-1">
//                   (128 reviews)
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center gap-3 mb-4 text-sm text-gray-500">
//             <div className="flex items-center gap-1">
//               <FaCogs size={12} className="text-purple-500" />
//               <span>{vehicle.gearType}</span>
//             </div>
//             <div className="flex items-center gap-1">
//               <FaChair size={12} className="text-purple-500" />
//               <span>{vehicle.seats} seats</span>
//             </div>
//             <div className="flex items-center gap-1">
//               <FaSnowflake size={12} className="text-purple-500" />
//               <span>{vehicle.airCondition === "Yes" ? "AC" : "No AC"}</span>
//             </div>
//           </div>

//           <div className="mt-auto pt-3 border-t border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-xs text-gray-500">Daily rate</p>
//                 <p className="text-xl font-bold text-purple-600">
//                   {formatPrice(vehicle.ratePerDay)}
//                   <span className="text-sm font-normal text-gray-500">
//                     /day
//                   </span>
//                 </p>
//               </div>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleViewDetails(vehicle);
//                 }}
//                 className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all whitespace-nowrap"
//               >
//                 View Details
//               </motion.button>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
//         <div className="text-center">
//           <motion.div
//             animate={{ rotate: 360 }}
//             transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//             className="relative w-24 h-24 mx-auto mb-6"
//           >
//             <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full"></div>
//             <div className="absolute inset-0 border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full"></div>
//             <div className="absolute inset-2 border-4 border-t-transparent border-r-blue-500 border-b-transparent border-l-transparent rounded-full"></div>
//             <FaCar className="absolute inset-0 m-auto text-white text-2xl animate-pulse" />
//           </motion.div>
//           <p className="text-white/80 text-lg">Loading premium vehicles...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 flex items-center justify-center">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center max-w-md mx-auto p-8 bg-white/10 backdrop-blur-lg rounded-2xl"
//         >
//           <div className="text-6xl mb-4">⚠️</div>
//           <h3 className="text-xl font-semibold text-white mb-2">
//             Something went wrong
//           </h3>
//           <p className="text-white/70 mb-6">{error}</p>
//           <button
//             onClick={fetchVehicles}
//             className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
//           >
//             Try Again
//           </button>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="font-sans text-gray-900 bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
//       {/* Navbar */}
//       <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100">
//         <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
//           <div
//             className="flex items-center gap-3 cursor-pointer group"
//             onClick={() => scrollToSection("home")}
//           >
//             <div className="p-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
//               <FaCar className="text-white text-2xl" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//                 Rent<span className="text-gray-800">Ride</span>
//               </h1>
//               <p className="text-xs text-gray-500 -mt-1">Premium Car Rentals</p>
//             </div>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center gap-8">
//             {[
//               { id: "home", label: "Home" },
//               { id: "vehicles", label: "Vehicles" },
//               { id: "how-it-works", label: "How It Works" },
//               { id: "contact", label: "Contact" },
//             ].map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => scrollToSection(item.id)}
//                 className={`relative text-sm font-medium transition-all duration-300 ${
//                   activeNav === item.id
//                     ? "text-purple-600"
//                     : "text-gray-700 hover:text-purple-600"
//                 }`}
//               >
//                 {item.label}
//                 {activeNav === item.id && (
//                   <motion.div
//                     layoutId="activeNav"
//                     className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600"
//                     initial={{ width: 0 }}
//                     animate={{ width: "100%" }}
//                     transition={{ duration: 0.3 }}
//                   />
//                 )}
//               </button>
//             ))}
//           </div>

//           {/* Search Bar - Desktop */}
//           <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
//             <div className="relative w-full">
//               <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
//               <input
//                 type="text"
//                 placeholder="Search by car name or type..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-11 pr-4 py-2.5 bg-gray-100 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
//               />
//             </div>
//           </div>

//           <div className="flex items-center gap-3">
//             <Link
//               to="/login"
//               className="px-5 py-2 border-2 border-purple-600 text-purple-600 font-semibold rounded-full hover:bg-purple-50 transition-all duration-300 text-sm"
//             >
//               Login
//             </Link>
//             <Link
//               to="/signup"
//               className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all"
//             >
//               Sign Up
//             </Link>
//           </div>
//         </div>

//         {/* Mobile Search */}
//         <div className="md:hidden px-6 pb-4">
//           <div className="relative">
//             <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search vehicles..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-11 pr-4 py-3 bg-gray-100 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
//             />
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section id="home" className="pt-24 pb-16 px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6 }}
//               className="space-y-6"
//             >
//               <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full">
//                 <FaBolt className="text-purple-600 text-sm" />
//                 <span className="text-sm font-semibold text-purple-700">
//                   Trusted by 10,000+ Customers
//                 </span>
//               </div>
//               <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
//                 Drive Your{" "}
//                 <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//                   Dream Car
//                 </span>
//                 <br />
//                 in Kathmandu
//               </h1>
//               <p className="text-gray-600 text-lg max-w-md">
//                 Experience luxury and convenience with our premium car rental
//                 service. Book online in minutes, drive away in style.
//               </p>
//               <div className="flex flex-wrap gap-4">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => scrollToSection("vehicles")}
//                   className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:shadow-xl transition-all transform hover:scale-105"
//                 >
//                   Explore Cars
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => scrollToSection("how-it-works")}
//                   className="px-8 py-3.5 border-2 border-purple-600 text-purple-600 font-semibold rounded-full hover:bg-purple-50 transition-all"
//                 >
//                   How It Works
//                 </motion.button>
//               </div>

//               {/* Stats */}
//               <div className="flex flex-wrap gap-8 pt-8">
//                 {[
//                   { value: "10K+", label: "Happy Customers", icon: FaUsers },
//                   { value: "200+", label: "Premium Vehicles", icon: FaCar },
//                   { value: "15+", label: "Cities", icon: FaMapMarkerAlt },
//                   { value: "24/7", label: "Support", icon: FaHeadset },
//                 ].map((stat, idx) => (
//                   <motion.div
//                     key={idx}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.1 * idx }}
//                     className="text-center"
//                   >
//                     <div className="text-2xl font-bold text-gray-900">
//                       {stat.value}
//                     </div>
//                     <div className="text-sm text-gray-500 flex items-center gap-1">
//                       <stat.icon className="text-purple-500 text-xs" />{" "}
//                       {stat.label}
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="relative"
//             >
//               <div className="relative rounded-2xl overflow-hidden shadow-2xl">
//                 <video
//                   src={heroVideo}
//                   autoPlay
//                   muted
//                   loop
//                   playsInline
//                   className="w-full h-[400px] object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
//               </div>
//               <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 backdrop-blur-sm">
//                 <p className="text-sm font-semibold text-gray-800">
//                   {vehicles.length}+ Vehicles Available
//                 </p>
//                 <p className="text-xs text-gray-500">24/7 pickup & delivery</p>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 px-6 bg-gradient-to-br from-purple-50/50 to-pink-50/50">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="text-center mb-12"
//           >
//             <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold mb-4">
//               WHY CHOOSE US
//             </span>
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">
//               The Best Rental Experience
//             </h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               We combine technology with personalized service to deliver an
//               exceptional car rental experience
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[
//               {
//                 icon: FaCar,
//                 title: "Wide Selection",
//                 desc: "Choose from premium vehicles for every need",
//                 color: "from-purple-500 to-pink-500",
//               },
//               {
//                 icon: FaClock,
//                 title: "Easy Booking",
//                 desc: "Book in 3 simple steps, 24/7 availability",
//                 color: "from-green-500 to-emerald-400",
//               },
//               {
//                 icon: FaShieldAlt,
//                 title: "Fully Insured",
//                 desc: "Comprehensive coverage for peace of mind",
//                 color: "from-blue-500 to-cyan-400",
//               },
//               {
//                 icon: FaCreditCard,
//                 title: "Flexible Payment",
//                 desc: "Multiple payment options available",
//                 color: "from-orange-500 to-yellow-400",
//               },
//             ].map((feature, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: idx * 0.1 }}
//                 viewport={{ once: true }}
//                 whileHover={{ y: -10 }}
//                 className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500"
//               >
//                 <motion.div
//                   whileHover={{ scale: 1.1, rotate: 5 }}
//                   className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-5 transition-transform`}
//                 >
//                   <feature.icon className="text-white text-2xl" />
//                 </motion.div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-2">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-600">{feature.desc}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Vehicle Filter Section */}
//       <section id="vehicles" className="py-20 px-6">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="text-center mb-12"
//           >
//             <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold mb-4">
//               OUR FLEET
//             </span>
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">
//               Choose Your Perfect Ride
//             </h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Select from our premium collection of vehicles
//             </p>
//           </motion.div>

//           {/* Filter Buttons */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             viewport={{ once: true }}
//             className="flex flex-wrap justify-center gap-3 mb-12"
//           >
//             {filters.map((filter, idx) => (
//               <motion.button
//                 key={filter}
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: idx * 0.02 }}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setActiveFilter(filter)}
//                 className={`px-5 py-2.5 rounded-full transition-all duration-300 ${
//                   activeFilter === filter
//                     ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
//                     : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm border border-gray-200"
//                 }`}
//               >
//                 {filter} {filter === "All vehicles" && `(${vehicles.length})`}
//               </motion.button>
//             ))}
//           </motion.div>

//           {/* Vehicles Grid */}
//           {filteredVehicles.length === 0 ? (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               className="text-center py-20"
//             >
//               <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <FaCar className="text-gray-400 text-4xl" />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-700 mb-2">
//                 No vehicles found
//               </h3>
//               <p className="text-gray-500">
//                 {searchQuery
//                   ? `No results for "${searchQuery}"`
//                   : "Try selecting a different category"}
//               </p>
//             </motion.div>
//           ) : (
//             <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {filteredVehicles.map((vehicle, idx) => (
//                 <CarCard key={vehicle._id} vehicle={vehicle} index={idx} />
//               ))}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Bikes Section */}
//       <BikesSection isLoggedIn={false} />

//       {/* How It Works */}
//       <section
//         id="how-it-works"
//         className="py-20 px-6 bg-gradient-to-br from-slate-900 to-purple-900"
//       >
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="text-center mb-12"
//           >
//             <span className="inline-block px-4 py-1.5 bg-white/20 text-white rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
//               SIMPLE PROCESS
//             </span>
//             <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
//             <p className="text-white/70 max-w-2xl mx-auto">
//               Get your perfect ride in three simple steps
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               {
//                 number: "01",
//                 title: "Choose Vehicle",
//                 desc: "Browse our fleet and select your preferred vehicle",
//                 icon: FaCar,
//                 color: "from-purple-500 to-pink-500",
//               },
//               {
//                 number: "02",
//                 title: "Book & Pay",
//                 desc: "Select dates, add extras, and complete secure payment",
//                 icon: FaCreditCard,
//                 color: "from-blue-500 to-cyan-400",
//               },
//               {
//                 number: "03",
//                 title: "Get Your Vehicle",
//                 desc: "Pick up from our location or get doorstep delivery",
//                 icon: FaMapMarkerAlt,
//                 color: "from-green-500 to-emerald-500",
//               },
//             ].map((step, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: idx * 0.1 }}
//                 viewport={{ once: true }}
//                 whileHover={{ y: -10 }}
//                 className="relative text-center"
//               >
//                 <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//                   {step.number}
//                 </div>
//                 <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 pt-12 border border-white/20 hover:border-white/40 transition-all">
//                   <motion.div
//                     whileHover={{ scale: 1.1, rotate: 5 }}
//                     className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center mx-auto mb-5 shadow-lg`}
//                   >
//                     <step.icon className="text-white text-3xl" />
//                   </motion.div>
//                   <h3 className="text-xl font-bold text-white mb-2">
//                     {step.title}
//                   </h3>
//                   <p className="text-white/70">{step.desc}</p>
//                 </div>
//                 {idx < 2 && (
//                   <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-white/30 text-3xl">
//                     <FaArrowRight />
//                   </div>
//                 )}
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Delivery Information */}
//       <section className="py-20 px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-10">
//             <div className="text-center mb-10">
//               <h2 className="text-3xl font-bold text-gray-800">
//                 Delivery Options
//               </h2>
//               <p className="text-gray-600 mt-2">
//                 Choose how you want to receive your vehicle
//               </p>
//             </div>
//             <div className="grid md:grid-cols-2 gap-8">
//               <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all">
//                 <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <FaMapMarkerAlt className="text-purple-600 text-2xl" />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-800 mb-2">
//                   Pickup from Location
//                 </h3>
//                 <p className="text-gray-600">
//                   Collect your vehicle from our nearest branch. Our team will
//                   assist you with the handover process.
//                 </p>
//                 <ul className="mt-4 text-left text-sm text-gray-500 space-y-2">
//                   <li className="flex items-center gap-2">
//                     <FaCheckCircle className="text-green-500 text-sm" /> Free
//                     pickup service
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <FaCheckCircle className="text-green-500 text-sm" /> Vehicle
//                     inspection on site
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <FaCheckCircle className="text-green-500 text-sm" />{" "}
//                     Document verification
//                   </li>
//                 </ul>
//               </div>
//               <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all">
//                 <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <FaTruck className="text-pink-600 text-2xl" />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-800 mb-2">
//                   Doorstep Delivery
//                 </h3>
//                 <p className="text-gray-600">
//                   Get your vehicle delivered to your home, hotel, or office. Our
//                   driver will bring the car to you.
//                 </p>
//                 <ul className="mt-4 text-left text-sm text-gray-500 space-y-2">
//                   <li className="flex items-center gap-2">
//                     <FaCheckCircle className="text-green-500 text-sm" />{" "}
//                     Delivery within Kathmandu Valley
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <FaCheckCircle className="text-green-500 text-sm" /> Free
//                     delivery for 3+ days booking
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <FaCheckCircle className="text-green-500 text-sm" />{" "}
//                     Real-time tracking available
//                   </li>
//                 </ul>
//               </div>
//             </div>
//             <div className="mt-8 text-center">
//               <p className="text-sm text-gray-500">
//                 After booking confirmation, you'll receive a call from our
//                 support team to confirm delivery/pickup details.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-16 px-6 bg-white">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             {[
//               {
//                 value: "98%",
//                 label: "Customer Satisfaction",
//                 icon: FaCheckCircle,
//               },
//               { value: "5-min", label: "Quick Response", icon: FaClock },
//               { value: "₹0", label: "Hidden Fees", icon: FaShieldAlt },
//               { value: "24/7", label: "Support Available", icon: FaHeadset },
//             ].map((stat, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: idx * 0.1 }}
//                 viewport={{ once: true }}
//                 className="text-center"
//               >
//                 <div className="text-3xl font-bold text-purple-600 mb-2">
//                   {stat.value}
//                 </div>
//                 <div className="text-sm text-gray-500 flex items-center justify-center gap-1">
//                   <stat.icon className="text-purple-400" /> {stat.label}
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 px-6">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 p-12 text-center"
//           >
//             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 animate-pulse"></div>
//             <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-48 translate-y-48 animate-pulse delay-1000"></div>
//             <div className="relative z-10">
//               <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full mb-6">
//                 <FaCrown className="text-yellow-300" />
//                 <span className="text-white font-semibold">
//                   Premium Service Guaranteed
//                 </span>
//               </div>
//               <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
//                 Ready to Hit the Road?
//               </h2>
//               <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
//                 Join thousands of satisfied customers and experience premium car
//                 rental service like never before
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <Link
//                   to="/signup"
//                   className="px-8 py-3.5 bg-white text-purple-600 font-semibold rounded-full hover:shadow-xl transition-all transform hover:scale-105"
//                 >
//                   Sign Up Now
//                 </Link>
//                 <Link
//                   to="/login"
//                   className="px-8 py-3.5 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all"
//                 >
//                   Login to Account
//                 </Link>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </section>
//       {/* Footer */}
//       <footer id="contact" className="bg-gray-900 text-white pt-16 pb-8">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="grid md:grid-cols-4 gap-10 mb-12">
//             <div>
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="p-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg">
//                   <FaCar className="text-white text-2xl" />
//                 </div>
//                 <div>
//                   <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//                     Rent<span className="text-white">Ride</span>
//                   </h1>
//                   <p className="text-xs text-gray-400 -mt-1">
//                     Premium Car Rentals
//                   </p>
//                 </div>
//               </div>
//               <p className="text-gray-400 text-sm leading-relaxed mb-6">
//                 Premium car rental service offering the best rates and
//                 exceptional customer experience in Nepal.
//               </p>
//               <div className="flex gap-3">
//                 {[FaFacebook, FaTwitter, FaInstagram, FaWhatsapp].map(
//                   (Icon, idx) => (
//                     <div
//                       key={idx}
//                       className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer"
//                     >
//                       <Icon size={14} />
//                     </div>
//                   ),
//                 )}
//               </div>
//             </div>

//             <div>
//               <h4 className="font-bold text-lg mb-6">Quick Links</h4>
//               <ul className="space-y-3 text-gray-400 text-sm">
//                 <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
//                   About Us
//                 </li>
//                 <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
//                   Contact Support
//                 </li>
//                 <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
//                   Privacy Policy
//                 </li>
//                 <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
//                   Terms & Conditions
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="font-bold text-lg mb-6">Our Services</h4>
//               <ul className="space-y-3 text-gray-400 text-sm">
//                 <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
//                   Airport Rentals
//                 </li>
//                 <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
//                   Luxury Cars
//                 </li>
//                 <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
//                   Long Term Rentals
//                 </li>
//                 <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
//                   Doorstep Delivery
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="font-bold text-lg mb-6">Contact Info</h4>
//               <ul className="space-y-4 text-gray-400 text-sm">
//                 <li className="flex items-start gap-3">
//                   <span className="text-xl">📍</span>
//                   <span>Kathmandu, Nepal</span>
//                 </li>
//                 <li className="flex items-center gap-3">
//                   <span className="text-xl">📞</span>
//                   <span>+977 9844177965</span>
//                 </li>
//                 <li className="flex items-center gap-3">
//                   <span className="text-xl">✉️</span>
//                   <span>support@rentride.com</span>
//                 </li>
//                 <li className="flex items-center gap-3">
//                   <span className="text-xl">🕐</span>
//                   <span>24/7 Customer Support</span>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
//             <p>© {new Date().getFullYear()} RentRide. All rights reserved.</p>
//             <p className="mt-1 text-xs">
//               Premium car rental service in Kathmandu, Nepal
//             </p>
//           </div>
//         </div>
//       </footer>

//       {/* Scroll to Top Button */}
//       <AnimatePresence>
//         {showScrollTop && (
//           <motion.button
//             initial={{ opacity: 0, scale: 0 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0 }}
//             onClick={scrollToTop}
//             className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
//           >
//             <FaArrowUp />
//           </motion.button>
//         )}
//       </AnimatePresence>

//       {/* Vehicle Details Modal */}
//       <AnimatePresence>
//         {showDetailsModal && selectedVehicle && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[100]"
//           >
//             <div
//               className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//               onClick={() => setShowDetailsModal(false)}
//             ></div>
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="absolute inset-0 flex items-center justify-center p-4"
//             >
//               <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
//                 <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center">
//                   <div>
//                     <h2 className="text-3xl font-bold text-gray-900">
//                       {selectedVehicle.carName}
//                     </h2>
//                     <div className="flex items-center gap-3 mt-2">
//                       <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">
//                         {selectedVehicle.carType}
//                       </span>
//                       <span
//                         className={`px-3 py-1 rounded-full text-sm font-medium ${
//                           selectedVehicle.status === "Available"
//                             ? "bg-green-100 text-green-600"
//                             : "bg-red-100 text-red-600"
//                         }`}
//                       >
//                         {selectedVehicle.status}
//                       </span>
//                       <span className="text-gray-500">
//                         {selectedVehicle.carNumber}
//                       </span>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => setShowDetailsModal(false)}
//                     className="p-3 hover:bg-gray-100 rounded-full transition-colors"
//                   >
//                     <span className="text-2xl text-gray-500">×</span>
//                   </button>
//                 </div>
//                 <div className="p-8">
//                   {/* Gallery */}
//                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
//                     {selectedVehicle.photos &&
//                     selectedVehicle.photos.length > 0 ? (
//                       selectedVehicle.photos.map((photo, index) => (
//                         <div
//                           key={index}
//                           className={`${index === 0 ? "lg:col-span-2" : ""}`}
//                         >
//                           <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden">
//                             <img
//                               src={`http://localhost:5000/uploads/${selectedVehicle.source === "user" ? "user-vehicles" : "vehicles"}/${photo.filename}`}
//                               alt={photo.label}
//                               className="w-full h-full object-cover"
//                             />
//                             <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm backdrop-blur-sm">
//                               {photo.label}
//                             </div>
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <div className="lg:col-span-3 h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
//                         <FaCar className="text-8xl text-gray-300" />
//                       </div>
//                     )}
//                   </div>

//                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                     <div className="lg:col-span-2">
//                       <h3 className="text-2xl font-bold text-gray-900 mb-6">
//                         Specifications
//                       </h3>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         {[
//                           {
//                             icon: FaCogs,
//                             label: "Transmission",
//                             value: selectedVehicle.gearType,
//                           },
//                           {
//                             icon: FaChair,
//                             label: "Seats",
//                             value: `${selectedVehicle.seats} Persons`,
//                           },
//                           {
//                             icon: FaSnowflake,
//                             label: "Air Conditioning",
//                             value: selectedVehicle.airCondition,
//                           },
//                           {
//                             icon: FaUserTie,
//                             label: "Driver",
//                             value: selectedVehicle.driverName || "Not Included",
//                           },
//                           {
//                             icon: FaPhone,
//                             label: "Contact",
//                             value: selectedVehicle.phoneNumber,
//                           },
//                           {
//                             icon: FaCalendarAlt,
//                             label: "Booking Type",
//                             value: selectedVehicle.bookingType,
//                           },
//                         ].map((spec, index) => (
//                           <div
//                             key={index}
//                             className="flex items-center p-4 bg-gray-50 rounded-xl"
//                           >
//                             <div className="p-3 bg-white rounded-lg shadow-sm mr-4">
//                               <spec.icon className="text-purple-600" />
//                             </div>
//                             <div>
//                               <p className="text-sm text-gray-500">
//                                 {spec.label}
//                               </p>
//                               <p className="font-semibold text-gray-900">
//                                 {spec.value}
//                               </p>
//                             </div>
//                           </div>
//                         ))}
//                       </div>

//                       {selectedVehicle.features &&
//                         selectedVehicle.features.length > 0 && (
//                           <div className="mt-10">
//                             <h3 className="text-2xl font-bold text-gray-900 mb-6">
//                               Features & Amenities
//                             </h3>
//                             <div className="flex flex-wrap gap-3">
//                               {selectedVehicle.features.map(
//                                 (feature, index) => (
//                                   <span
//                                     key={index}
//                                     className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg font-medium"
//                                   >
//                                     {feature}
//                                   </span>
//                                 ),
//                               )}
//                             </div>
//                           </div>
//                         )}

//                       {selectedVehicle.description && (
//                         <div className="mt-10">
//                           <h3 className="text-2xl font-bold text-gray-900 mb-4">
//                             Description
//                           </h3>
//                           <p className="text-gray-600 leading-relaxed">
//                             {selectedVehicle.description}
//                           </p>
//                         </div>
//                       )}
//                     </div>

//                     <div className="lg:col-span-1">
//                       <div className="sticky top-24 bg-gradient-to-b from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-lg">
//                         <div className="text-center mb-6">
//                           <p className="text-gray-500 mb-2">Daily Rate</p>
//                           <div className="flex items-baseline justify-center">
//                             <span className="text-5xl font-bold text-gray-900">
//                               रु{selectedVehicle.ratePerDay}
//                             </span>
//                             <span className="text-gray-500 ml-2">/day</span>
//                           </div>
//                         </div>

//                         <div className="mb-6 p-4 bg-purple-50 border border-purple-100 rounded-lg">
//                           <div className="flex items-start">
//                             <FaInfoCircle className="text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
//                             <div>
//                               <h4 className="font-semibold text-purple-800 mb-1">
//                                 Complete Price Breakdown
//                               </h4>
//                               <p className="text-sm text-purple-700">
//                                 Full price calculation including optional extras
//                                 will be shown during booking.
//                               </p>
//                             </div>
//                           </div>
//                         </div>

//                         <motion.button
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           onClick={() => {
//                             handleBookNow(selectedVehicle);
//                             setShowDetailsModal(false);
//                           }}
//                           className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-green-500/30 transition-all duration-300"
//                         >
//                           Book This Vehicle
//                         </motion.button>

//                         <div className="mt-6 text-center">
//                           <p className="text-gray-500 text-sm">
//                             • Free cancellation • 24/7 support • Instant
//                             confirmation
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Home;

// // // }

// // import { Link } from "react-router-dom";
// // import { useState, useEffect } from "react";
// // import {
// //   FaCar,
// //   FaDollarSign,
// //   FaShieldAlt,
// //   FaClock,
// //   FaUserTie,
// //   FaTruck,
// //   FaHeadset,
// //   FaChevronDown,
// //   FaStar,
// //   FaCheckCircle,
// //   FaMapMarkerAlt,
// //   FaBolt,
// //   FaCrown,
// //   FaHeart,
// //   FaRegHeart,
// //   FaUsers,
// //   FaSnowflake,
// //   FaCogs,
// //   FaChair,
// //   FaInfoCircle,
// //   FaSearch,
// //   FaPhone,
// //   FaCalendarAlt,
// //   FaEnvelope,
// //   FaUserCircle,
// //   FaArrowRight,
// //   FaCreditCard,
// //   FaIdCard,
// //   FaFacebook,
// //   FaTwitter,
// //   FaInstagram,
// // } from "react-icons/fa";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";

// // /* Image imports */
// // import heroVideo from "../../assets/Dashboard/INtro.mp4";
// // import sedan from "../../assets/Dashboard/sedan.jpg";
// // import suv from "../../assets/Dashboard/suv.jpg";
// // import ev from "../../assets/Dashboard/ev.jpg";
// // import convertible from "../../assets/Dashboard/convertible.jpg";
// // import minivan from "../../assets/Dashboard/minivan.jpg";
// // import sport from "../../assets/Dashboard/sport.jpg";

// // const API_URL = "http://localhost:5000/api";

// // export default function App() {
// //   const [favorites, setFavorites] = useState(new Set());
// //   const [vehicles, setVehicles] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const [filteredVehicles, setFilteredVehicles] = useState([]);
// //   const [activeFilter, setActiveFilter] = useState("All vehicles");
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [selectedVehicle, setSelectedVehicle] = useState(null);
// //   const [showDetailsModal, setShowDetailsModal] = useState(false);
// //   const navigate = useNavigate();

// //   const filters = [
// //     "All vehicles",
// //     "Sedan",
// //     "SUV",
// //     "Hatchback",
// //     "MPV",
// //     "Coupe",
// //     "Convertible",
// //     "Pickup",
// //     "Minivan",
// //     "Electric",
// //   ];

// //   // Fetch vehicles from backend (Public Landing Page - NO AUTH)
// //   useEffect(() => {
// //     fetchVehicles();
// //   }, []);

// //   const fetchVehicles = async () => {
// //     try {
// //       setLoading(true);
// //       setError("");

// //       // Fetch admin vehicles (public)
// //       const adminResponse = await axios.get(
// //         "http://localhost:5000/api/vehicles",
// //         {
// //           timeout: 10000,
// //         },
// //       );

// //       // Fetch user vehicles from public endpoint (only active and listed)
// //       let userVehicles = [];
// //       try {
// //         const userResponse = await axios.get(
// //           "http://localhost:5000/api/user-vehicles/public/active",
// //           { timeout: 10000 },
// //         );
// //         if (userResponse.data.success) userVehicles = userResponse.data.data;
// //       } catch (userError) {
// //         console.log("Could not fetch user vehicles:", userError.message);
// //       }

// //       let allVehicles = [];

// //       // Add admin vehicles
// //       if (adminResponse.data && Array.isArray(adminResponse.data)) {
// //         allVehicles = [...adminResponse.data];
// //       } else if (
// //         adminResponse.data?.data &&
// //         Array.isArray(adminResponse.data.data)
// //       ) {
// //         allVehicles = [...adminResponse.data.data];
// //       }

// //       // Add user vehicles
// //       userVehicles.forEach((userVehicle) =>
// //         allVehicles.push({ ...userVehicle, source: "user" }),
// //       );

// //       setVehicles(allVehicles);
// //       setFilteredVehicles(allVehicles);
// //     } catch (error) {
// //       console.error("Error fetching vehicles:", error);
// //       setError("Failed to load vehicles. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const toggleFavorite = (vehicleId, e) => {
// //     e?.stopPropagation();
// //     const newWishlist = new Set(favorites);
// //     if (newWishlist.has(vehicleId)) {
// //       newWishlist.delete(vehicleId);
// //     } else {
// //       newWishlist.add(vehicleId);
// //     }
// //     setFavorites(newWishlist);
// //   };

// //   // Filter vehicles based on active filter and search
// //   useEffect(() => {
// //     const filtered = vehicles.filter((vehicle) => {
// //       const matchesFilter =
// //         activeFilter === "All vehicles" ||
// //         vehicle.carType?.toLowerCase() === activeFilter.toLowerCase();
// //       const matchesSearch =
// //         searchQuery === "" ||
// //         vehicle.carName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //         vehicle.carType?.toLowerCase().includes(searchQuery.toLowerCase());
// //       return matchesFilter && matchesSearch;
// //     });
// //     setFilteredVehicles(filtered);
// //   }, [activeFilter, searchQuery, vehicles]);

// //   // Get vehicle image URL
// //   const getVehicleImage = (vehicle) => {
// //     if (vehicle.photos?.length > 0) {
// //       const extraView = vehicle.photos.find(
// //         (photo) => photo.label === "Extra View",
// //       );
// //       const photo = extraView || vehicle.photos[0];
// //       const folder = vehicle.source === "user" ? "user-vehicles" : "vehicles";
// //       return `http://localhost:5000/uploads/${folder}/${photo.filename}`;
// //     }

// //     // Fallback based on car type
// //     switch (vehicle.carType) {
// //       case "SUV":
// //         return suv;
// //       case "Sedan":
// //         return sedan;
// //       case "Hatchback":
// //         return sedan;
// //       case "MPV":
// //         return minivan;
// //       case "Convertible":
// //         return convertible;
// //       case "Coupe":
// //         return sport;
// //       case "Pickup":
// //         return suv;
// //       case "Minivan":
// //         return minivan;
// //       case "Electric":
// //         return ev;
// //       default:
// //         return sedan;
// //     }
// //   };

// //   // Handle View Details click
// //   const handleViewDetails = (vehicle) => {
// //     setSelectedVehicle(vehicle);
// //     setShowDetailsModal(true);
// //   };

// //   // Handle Book Now click
// //   const handleBookNow = (vehicle) => {
// //     navigate(`/booking/${vehicle._id}`);
// //   };

// //   // Format price with रु symbol
// //   const formatPrice = (price) => {
// //     return `रु ${price}`;
// //   };

// //   // Get rating based on vehicle properties
// //   const getRating = (vehicle) => {
// //     let baseRating = 4.0;
// //     if (vehicle.airCondition === "Yes") baseRating += 0.3;
// //     if (vehicle.gearType === "Automatic") baseRating += 0.2;
// //     if (vehicle.seats >= 7) baseRating += 0.2;
// //     if (vehicle.carType === "SUV" || vehicle.carType === "Convertible")
// //       baseRating += 0.3;
// //     return Math.min(5.0, baseRating).toFixed(1);
// //   };

// //   // Get review count
// //   const getReviewCount = (vehicle) => {
// //     const baseCounts = {
// //       SUV: 1200,
// //       Sedan: 1000,
// //       Hatchback: 800,
// //       MPV: 600,
// //       Coupe: 400,
// //       Convertible: 300,
// //       Pickup: 200,
// //       Minivan: 500,
// //       Electric: 350,
// //     };
// //     return baseCounts[vehicle.carType] || 500;
// //   };

// //   // Scroll to section
// //   const scrollToSection = (sectionId) => {
// //     const section = document.getElementById(sectionId);
// //     if (section) {
// //       section.scrollIntoView({ behavior: "smooth" });
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
// //           <p className="text-gray-600 text-lg">Loading vehicles...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="text-red-500 text-5xl mb-4">⚠️</div>
// //           <h3 className="text-xl font-semibold mb-2">Something went wrong</h3>
// //           <p className="text-gray-600 mb-6 max-w-md mx-auto">{error}</p>
// //           <button
// //             onClick={fetchVehicles}
// //             className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
// //           >
// //             Try Again
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="font-sans text-gray-900 bg-gradient-to-br from-gray-50 to-blue-50">
// //       {/* Navbar */}
// //       <nav className="w-full bg-white/90 backdrop-blur-md shadow-2xl sticky top-0 z-50">
// //         <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
// //           {/* <div
// //             className="flex items-center gap-2 cursor-pointer"
// //             onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
// //           >
// //             <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg">
// //               <FaCar className="text-white text-2xl" />
// //             </div>
// //             <h1 className="text-2xl font-bold">
// //               Rent<span className="text-blue-600">Ride</span>
// //             </h1>
// //           </div> */}
// //           <div
// //             className="flex items-center gap-3 cursor-pointer"
// //             onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
// //           >
// //             <div className="p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
// //               <FaCar className="text-white text-2xl" />
// //             </div>
// //             <div>
// //               <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
// //                 Rent<span className="text-gray-800">Ride</span>
// //               </h1>
// //               <p className="text-xs text-gray-500 -mt-1">Premium Car Rentals</p>
// //             </div>
// //           </div>
// //           {/* Search Bar */}
// //           <div className="hidden md:block flex-1 max-w-md mx-8">
// //             <div className="relative">
// //               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
// //                 <FaSearch className="text-gray-400" />
// //               </div>
// //               <input
// //                 type="text"
// //                 placeholder="Search vehicles..."
// //                 value={searchQuery}
// //                 onChange={(e) => setSearchQuery(e.target.value)}
// //                 className="w-full pl-12 pr-4 py-2.5 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-300"
// //               />
// //             </div>
// //           </div>

// //           <ul className="hidden lg:flex items-center gap-10 text-sm font-medium">
// //             <li className="relative group">
// //               <button
// //                 onClick={() => scrollToSection("home")}
// //                 className="text-gray-700 group-hover:text-blue-600 transition-all duration-300"
// //               >
// //                 Home
// //               </button>
// //               <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
// //             </li>
// //             <li className="relative group">
// //               <button
// //                 onClick={() => scrollToSection("vehicles")}
// //                 className="text-gray-700 group-hover:text-blue-600 transition-all duration-300"
// //               >
// //                 Vehicles
// //               </button>
// //               <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
// //             </li>
// //             <li className="relative group">
// //               <button
// //                 onClick={() => scrollToSection("how-it-works")}
// //                 className="text-gray-700 group-hover:text-blue-600 transition-all duration-300"
// //               >
// //                 How It Works
// //               </button>
// //               <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
// //             </li>
// //             <li className="relative group">
// //               <button
// //                 onClick={() => scrollToSection("contact")}
// //                 className="text-gray-700 group-hover:text-blue-600 transition-all duration-300"
// //               >
// //                 Contact
// //               </button>
// //               <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
// //             </li>
// //           </ul>

// //           <div className="flex items-center gap-4">
// //             <Link
// //               to="/login"
// //               className="px-6 py-2.5 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-all duration-300"
// //             >
// //               Login
// //             </Link>
// //             <Link
// //               to="/signup"
// //               className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 transition-all duration-300 text-white px-7 py-2.5 rounded-full text-sm font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
// //             >
// //               Sign Up
// //             </Link>
// //           </div>
// //         </div>

// //         {/* Mobile Search */}
// //         <div className="md:hidden px-6 pb-4">
// //           <div className="relative">
// //             <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
// //               <FaSearch className="text-gray-400" />
// //             </div>
// //             <input
// //               type="text"
// //               placeholder="Search vehicles..."
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //               className="w-full pl-12 pr-4 py-3 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-300"
// //             />
// //           </div>
// //         </div>
// //       </nav>

// //       {/* Hero Section */}
// //       <section id="home" className="max-w-7xl mx-auto px-6 py-16">
// //         <div className="grid md:grid-cols-2 gap-14 items-center bg-gradient-to-br from-white to-blue-50 rounded-3xl p-10 shadow-3xl border border-blue-100 relative overflow-hidden">
// //           <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-32 translate-x-32"></div>
// //           <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-full -translate-x-64 translate-y-64"></div>

// //           <div className="relative z-10">
// //             <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
// //               <video
// //                 src={heroVideo}
// //                 autoPlay
// //                 muted
// //                 loop
// //                 playsInline
// //                 className="rounded-2xl w-full h-[380px] object-cover transform group-hover:scale-110 transition-transform duration-700"
// //               />
// //               <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
// //               <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg">
// //                 <p className="text-sm font-semibold text-gray-800">
// //                   {vehicles.length}+ Vehicles Available
// //                 </p>
// //                 <p className="text-xs text-gray-600">24/7 pickup service</p>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="relative z-10">
// //             <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full mb-6 shadow-lg">
// //               <FaBolt className="text-blue-600" />
// //               <span className="text-sm font-semibold text-blue-700">
// //                 Fast & Easy Booking
// //               </span>
// //             </div>
// //             <h2 className="text-[44px] leading-tight font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
// //               Discover Your <br />
// //               <span className="relative">
// //                 Perfect Ride
// //                 <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600"></span>
// //               </span>
// //             </h2>
// //             <p className="mt-5 text-gray-600 max-w-md text-lg leading-relaxed">
// //               Experience effortless booking and premium rentals with RentRide.
// //               Your journey begins with a click.
// //             </p>
// //             <div className="flex gap-4 mt-8">
// //               <button
// //                 onClick={() => scrollToSection("vehicles")}
// //                 className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-full hover:shadow-lg transition-all"
// //               >
// //                 Explore Cars
// //               </button>
// //               <button
// //                 onClick={() => scrollToSection("how-it-works")}
// //                 className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-all"
// //               >
// //                 How It Works
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Vehicle Filter Section */}
// //       <section id="vehicles" className="max-w-7xl mx-auto px-6 py-10">
// //         <div className="text-center mb-8">
// //           <h2 className="text-3xl font-bold mb-4">Browse Our Fleet</h2>
// //           <p className="text-gray-600 mb-8">
// //             Choose from our wide range of vehicles
// //           </p>

// //           {/* Filter Buttons */}
// //           <div className="flex flex-wrap justify-center gap-4 mb-12">
// //             {filters.map((filter) => (
// //               <button
// //                 key={filter}
// //                 onClick={() => setActiveFilter(filter)}
// //                 className={`px-5 py-2.5 rounded-full transition-all duration-300 ${
// //                   activeFilter === filter
// //                     ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25"
// //                     : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
// //                 }`}
// //               >
// //                 {filter} {filter === "All vehicles" && `(${vehicles.length})`}
// //               </button>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Vehicles Grid - Enhanced Card Design */}
// //         <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
// //           {filteredVehicles.map((vehicle) => (
// //             <div
// //               key={vehicle._id}
// //               className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 cursor-pointer hover:-translate-y-2"
// //               onClick={() => handleViewDetails(vehicle)}
// //             >
// //               {/* Wishlist Button */}
// //               <button
// //                 onClick={(e) => toggleFavorite(vehicle._id, e)}
// //                 className="absolute top-4 right-4 z-10 p-2.5 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 transition-transform duration-300"
// //               >
// //                 <FaHeart
// //                   className={`text-lg ${favorites.has(vehicle._id) ? "text-red-500 fill-red-500" : "text-gray-400"}`}
// //                 />
// //               </button>

// //               {/* Status Badge */}
// //               <div className="absolute top-4 left-4 z-10">
// //                 <span
// //                   className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
// //                     vehicle.status === "Available"
// //                       ? "bg-green-500/90 text-white"
// //                       : "bg-red-500/90 text-white"
// //                   }`}
// //                 >
// //                   {vehicle.status}
// //                 </span>
// //               </div>

// //               {/* Car Image */}
// //               <div className="h-56 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
// //                 <img
// //                   src={getVehicleImage(vehicle)}
// //                   alt={vehicle.carName}
// //                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
// //                   onError={(e) => {
// //                     e.target.src = sedan;
// //                   }}
// //                 />
// //               </div>

// //               {/* Car Details */}
// //               <div className="p-6">
// //                 <div className="flex justify-between items-start mb-4">
// //                   <div className="flex-1">
// //                     <div className="flex items-center gap-2 mb-1">
// //                       <h3 className="text-xl font-bold text-gray-800 truncate">
// //                         {vehicle.carName}
// //                       </h3>
// //                       <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
// //                         {vehicle.carType}
// //                       </span>
// //                     </div>
// //                     <div className="flex items-center text-gray-500 text-sm mb-3">
// //                       <FaMapMarkerAlt className="mr-1.5" />
// //                       <span>Kathmandu, Nepal</span>
// //                     </div>
// //                     <div className="flex items-center gap-1 mb-4">
// //                       {[...Array(5)].map((_, i) => (
// //                         <FaStar
// //                           key={i}
// //                           className={`text-sm ${
// //                             i < Math.floor(getRating(vehicle))
// //                               ? "text-yellow-400 fill-yellow-400"
// //                               : "text-gray-300"
// //                           }`}
// //                         />
// //                       ))}
// //                       <span className="text-gray-500 text-sm ml-2">
// //                         {getRating(vehicle)} ({getReviewCount(vehicle)})
// //                       </span>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Specifications */}
// //                 <div className="grid grid-cols-2 gap-3 mb-6">
// //                   <div className="flex items-center gap-2">
// //                     <div className="p-2 bg-gray-50 rounded-lg">
// //                       <FaCogs className="text-gray-600" />
// //                     </div>
// //                     <div>
// //                       <p className="text-xs text-gray-500">Transmission</p>
// //                       <p className="font-medium text-gray-800">
// //                         {vehicle.gearType}
// //                       </p>
// //                     </div>
// //                   </div>
// //                   <div className="flex items-center gap-2">
// //                     <div className="p-2 bg-gray-50 rounded-lg">
// //                       <FaChair className="text-gray-600" />
// //                     </div>
// //                     <div>
// //                       <p className="text-xs text-gray-500">Seats</p>
// //                       <p className="font-medium text-gray-800">
// //                         {vehicle.seats}
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Price and Action */}
// //                 <div className="flex items-center justify-between pt-4 border-t border-gray-100">
// //                   <div>
// //                     <p className="text-xs text-gray-500">Daily rate</p>
// //                     <div className="flex items-baseline">
// //                       <span className="text-2xl font-bold text-gray-800">
// //                         {formatPrice(vehicle.ratePerDay)}
// //                       </span>
// //                       <span className="text-gray-500 text-sm ml-1">/day</span>
// //                     </div>
// //                   </div>
// //                   <button
// //                     onClick={(e) => {
// //                       e.stopPropagation();
// //                       handleViewDetails(vehicle);
// //                     }}
// //                     className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
// //                   >
// //                     View Details
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>

// //         {filteredVehicles.length === 0 && (
// //           <div className="text-center py-12">
// //             <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
// //               <FaCar className="text-gray-400 text-2xl" />
// //             </div>
// //             <h3 className="text-xl font-semibold text-gray-700 mb-2">
// //               No vehicles found
// //             </h3>
// //             <p className="text-gray-500">
// //               {searchQuery
// //                 ? `No results for "${searchQuery}"`
// //                 : "Try selecting a different category"}
// //             </p>
// //           </div>
// //         )}
// //       </section>

// //       {/* Vehicle Details Modal */}
// //       {showDetailsModal && selectedVehicle && (
// //         <div className="fixed inset-0 z-[100]">
// //           <div
// //             className="absolute inset-0 bg-black/60 backdrop-blur-sm"
// //             onClick={() => setShowDetailsModal(false)}
// //           ></div>

// //           <div className="absolute inset-0 flex items-center justify-center p-4">
// //             <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
// //               <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center">
// //                 <div>
// //                   <h2 className="text-3xl font-bold text-gray-900">
// //                     {selectedVehicle.carName}
// //                   </h2>
// //                   <div className="flex items-center gap-3 mt-2">
// //                     <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
// //                       {selectedVehicle.carType}
// //                     </span>
// //                     <span
// //                       className={`px-3 py-1 rounded-full text-sm font-medium ${
// //                         selectedVehicle.status === "Available"
// //                           ? "bg-green-100 text-green-600"
// //                           : "bg-red-100 text-red-600"
// //                       }`}
// //                     >
// //                       {selectedVehicle.status}
// //                     </span>
// //                     <span className="text-gray-500">
// //                       {selectedVehicle.carNumber}
// //                     </span>
// //                   </div>
// //                 </div>
// //                 <button
// //                   onClick={() => setShowDetailsModal(false)}
// //                   className="p-3 hover:bg-gray-100 rounded-full transition-colors"
// //                 >
// //                   <span className="text-2xl text-gray-500">×</span>
// //                 </button>
// //               </div>

// //               <div className="p-8">
// //                 {/* Gallery */}
// //                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
// //                   {selectedVehicle.photos &&
// //                   selectedVehicle.photos.length > 0 ? (
// //                     selectedVehicle.photos.map((photo, index) => (
// //                       <div
// //                         key={index}
// //                         className={`${index === 0 ? "lg:col-span-2" : ""}`}
// //                       >
// //                         <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden">
// //                           <img
// //                             src={`http://localhost:5000/uploads/${selectedVehicle.source === "user" ? "user-vehicles" : "vehicles"}/${photo.filename}`}
// //                             alt={photo.label}
// //                             className="w-full h-full object-cover"
// //                           />
// //                           <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm backdrop-blur-sm">
// //                             {photo.label}
// //                           </div>
// //                         </div>
// //                       </div>
// //                     ))
// //                   ) : (
// //                     <div className="lg:col-span-3 h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
// //                       <FaCar className="text-8xl text-gray-300" />
// //                     </div>
// //                   )}
// //                 </div>

// //                 {/* Main Details */}
// //                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// //                   {/* Left Column - Specifications */}
// //                   <div className="lg:col-span-2">
// //                     <h3 className="text-2xl font-bold text-gray-900 mb-6">
// //                       Specifications
// //                     </h3>
// //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                       {[
// //                         {
// //                           icon: FaCogs,
// //                           label: "Transmission",
// //                           value: selectedVehicle.gearType,
// //                         },
// //                         {
// //                           icon: FaChair,
// //                           label: "Seats",
// //                           value: `${selectedVehicle.seats} Persons`,
// //                         },
// //                         {
// //                           icon: FaSnowflake,
// //                           label: "Air Conditioning",
// //                           value: selectedVehicle.airCondition,
// //                         },
// //                         {
// //                           icon: FaUserTie,
// //                           label: "Driver",
// //                           value: selectedVehicle.driverName || "Not Included",
// //                         },
// //                         {
// //                           icon: FaPhone,
// //                           label: "Contact",
// //                           value: selectedVehicle.phoneNumber,
// //                         },
// //                         {
// //                           icon: FaCalendarAlt,
// //                           label: "Booking Type",
// //                           value: selectedVehicle.bookingType,
// //                         },
// //                       ].map((spec, index) => (
// //                         <div
// //                           key={index}
// //                           className="flex items-center p-4 bg-gray-50 rounded-xl"
// //                         >
// //                           <div className="p-3 bg-white rounded-lg shadow-sm mr-4">
// //                             <spec.icon className="text-blue-600" />
// //                           </div>
// //                           <div>
// //                             <p className="text-sm text-gray-500">
// //                               {spec.label}
// //                             </p>
// //                             <p className="font-semibold text-gray-900">
// //                               {spec.value}
// //                             </p>
// //                           </div>
// //                         </div>
// //                       ))}
// //                     </div>

// //                     {/* Features */}
// //                     {selectedVehicle.features &&
// //                       selectedVehicle.features.length > 0 && (
// //                         <div className="mt-10">
// //                           <h3 className="text-2xl font-bold text-gray-900 mb-6">
// //                             Features & Amenities
// //                           </h3>
// //                           <div className="flex flex-wrap gap-3">
// //                             {selectedVehicle.features.map((feature, index) => (
// //                               <span
// //                                 key={index}
// //                                 className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium"
// //                               >
// //                                 {feature}
// //                               </span>
// //                             ))}
// //                           </div>
// //                         </div>
// //                       )}

// //                     {/* Description */}
// //                     {selectedVehicle.description && (
// //                       <div className="mt-10">
// //                         <h3 className="text-2xl font-bold text-gray-900 mb-4">
// //                           Description
// //                         </h3>
// //                         <p className="text-gray-600 leading-relaxed">
// //                           {selectedVehicle.description}
// //                         </p>
// //                       </div>
// //                     )}
// //                   </div>

// //                   {/* Right Column - Pricing & Booking */}
// //                   <div className="lg:col-span-1">
// //                     <div className="sticky top-24 bg-gradient-to-b from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-lg">
// //                       <div className="text-center mb-6">
// //                         <p className="text-gray-500 mb-2">Daily Rate</p>
// //                         <div className="flex items-baseline justify-center">
// //                           <span className="text-5xl font-bold text-gray-900">
// //                             रु{selectedVehicle.ratePerDay}
// //                           </span>
// //                           <span className="text-gray-500 ml-2">/day</span>
// //                         </div>
// //                       </div>

// //                       <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
// //                         <div className="flex items-start">
// //                           <FaInfoCircle className="text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
// //                           <div>
// //                             <h4 className="font-semibold text-blue-800 mb-1">
// //                               Complete Price Breakdown
// //                             </h4>
// //                             <p className="text-sm text-blue-700">
// //                               Full price calculation including optional extras
// //                               will be shown during booking.
// //                             </p>
// //                           </div>
// //                         </div>
// //                       </div>

// //                       <button
// //                         onClick={() => {
// //                           handleBookNow(selectedVehicle);
// //                           setShowDetailsModal(false);
// //                         }}
// //                         className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-green-500/30 hover:scale-105 transition-all duration-300"
// //                       >
// //                         Book This Vehicle
// //                       </button>

// //                       <div className="mt-6 text-center">
// //                         <p className="text-gray-500 text-sm">
// //                           • Free cancellation • 24/7 support • Instant
// //                           confirmation
// //                         </p>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Key Features */}
// //       <section className="max-w-7xl mx-auto px-6 py-10">
// //         <div className="text-center mb-16">
// //           <div className="inline-flex items-center gap-3 mb-4">
// //             <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
// //             <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
// //               Why Choose Us
// //             </h3>
// //             <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
// //           </div>
// //           <h2 className="text-4xl font-bold mt-2">Key Features</h2>
// //           <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
// //             Experience premium car rental service with our standout features
// //           </p>
// //         </div>
// //         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
// //           <Feature
// //             icon={<FaClock className="text-2xl" />}
// //             title="Instant Availability"
// //             desc="Real-time booking with instant confirmation"
// //             gradient="from-blue-500 to-blue-600"
// //           />
// //           <Feature
// //             icon={<FaCar className="text-2xl" />}
// //             title="Comfortable Rides"
// //             desc="Premium vehicles with latest amenities"
// //             gradient="from-purple-500 to-purple-600"
// //           />
// //           <Feature
// //             icon={<FaDollarSign className="text-2xl" />}
// //             title="Best Pricing"
// //             desc="Competitive rates with no hidden charges"
// //             gradient="from-green-500 to-green-600"
// //           />
// //           <Feature
// //             icon={<FaShieldAlt className="text-2xl" />}
// //             title="No Hidden Fees"
// //             desc="Transparent pricing, all fees included"
// //             gradient="from-orange-500 to-orange-600"
// //           />
// //         </div>
// //       </section>

// //       {/* Advantages */}
// //       <section className="max-w-7xl mx-auto px-6 py-16">
// //         <div className="text-center mb-16">
// //           <div className="inline-flex items-center gap-3 mb-4">
// //             <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
// //             <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
// //               Our Benefits
// //             </h3>
// //             <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
// //           </div>
// //           <h2 className="text-4xl font-bold mt-2">RentRide Advantages</h2>
// //           <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
// //             Discover why thousands choose RentRide
// //           </p>
// //         </div>
// //         <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
// //           <Advantage
// //             icon={<FaDollarSign className="text-2xl" />}
// //             title="Best price guarantee"
// //             desc="We guarantee the best prices in the market"
// //             color="green"
// //             stat={`${vehicles.length}+ Vehicles`}
// //           />
// //           <Advantage
// //             icon={<FaUserTie className="text-2xl" />}
// //             title="Professional drivers"
// //             desc="Highly trained and certified drivers"
// //             color="blue"
// //             stat="500+ Drivers"
// //           />
// //           <Advantage
// //             icon={<FaTruck className="text-2xl" />}
// //             title="Doorstep delivery"
// //             desc="Get your car delivered to your location"
// //             color="purple"
// //             stat="24/7 Delivery"
// //           />
// //           <Advantage
// //             icon={<FaHeadset className="text-2xl" />}
// //             title="24/7 support"
// //             desc="Round-the-clock customer support"
// //             color="orange"
// //             stat="Instant Response"
// //           />
// //           <Advantage
// //             icon={<FaCar className="text-2xl" />}
// //             title="Wide vehicle range"
// //             desc="Choose from economy to luxury"
// //             color="red"
// //             stat={`${vehicles.length} Models`}
// //           />
// //         </div>
// //       </section>

// //       {/* How it Works */}
// //       <section
// //         id="how-it-works"
// //         className="max-w-7xl mx-auto px-6 py-20 bg-gradient-to-br from-white to-blue-50 rounded-3xl my-16 shadow-3xl relative overflow-hidden"
// //       >
// //         <div className="text-center mb-16 relative z-10">
// //           <div className="inline-flex items-center gap-3 mb-4">
// //             <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
// //             <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
// //               Process
// //             </h3>
// //             <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
// //           </div>
// //           <h2 className="text-4xl font-bold mt-2">How It Works</h2>
// //           <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
// //             Simple steps to get your perfect ride
// //           </p>
// //         </div>
// //         <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto relative z-10">
// //           <Step
// //             number="01"
// //             title="Choose Vehicle"
// //             desc="Browse our fleet and select your preferred vehicle"
// //             icon={<FaCar />}
// //           />
// //           <Step
// //             number="02"
// //             title="Book & Pay"
// //             desc="Select dates, add extras, and complete secure payment"
// //             icon={<FaCreditCard />}
// //           />
// //           <Step
// //             number="03"
// //             title="Get Your Vehicle"
// //             desc="Pick up from our location or get doorstep delivery"
// //             icon={<FaMapMarkerAlt />}
// //           />
// //         </div>
// //       </section>

// //       {/* Delivery Information */}
// //       <section className="max-w-7xl mx-auto px-6 py-16">
// //         <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-10">
// //           <div className="text-center mb-10">
// //             <h2 className="text-3xl font-bold text-gray-800">
// //               Delivery Options
// //             </h2>
// //             <p className="text-gray-600 mt-2">
// //               Choose how you want to receive your vehicle
// //             </p>
// //           </div>
// //           <div className="grid md:grid-cols-2 gap-8">
// //             <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all">
// //               <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
// //                 <FaMapMarkerAlt className="text-blue-600 text-2xl" />
// //               </div>
// //               <h3 className="text-xl font-bold text-gray-800 mb-2">
// //                 Pickup from Location
// //               </h3>
// //               <p className="text-gray-600">
// //                 Collect your vehicle from our nearest branch. Our team will
// //                 assist you with the handover process.
// //               </p>
// //               <ul className="mt-4 text-left text-sm text-gray-500 space-y-2">
// //                 <li className="flex items-center gap-2">
// //                   <FaCheckCircle className="text-green-500 text-sm" /> Free
// //                   pickup service
// //                 </li>
// //                 <li className="flex items-center gap-2">
// //                   <FaCheckCircle className="text-green-500 text-sm" /> Vehicle
// //                   inspection on site
// //                 </li>
// //                 <li className="flex items-center gap-2">
// //                   <FaCheckCircle className="text-green-500 text-sm" /> Document
// //                   verification
// //                 </li>
// //               </ul>
// //             </div>
// //             <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all">
// //               <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
// //                 <FaTruck className="text-purple-600 text-2xl" />
// //               </div>
// //               <h3 className="text-xl font-bold text-gray-800 mb-2">
// //                 Doorstep Delivery
// //               </h3>
// //               <p className="text-gray-600">
// //                 Get your vehicle delivered to your home, hotel, or office. Our
// //                 driver will bring the car to you.
// //               </p>
// //               <ul className="mt-4 text-left text-sm text-gray-500 space-y-2">
// //                 <li className="flex items-center gap-2">
// //                   <FaCheckCircle className="text-green-500 text-sm" /> Delivery
// //                   within Kathmandu Valley
// //                 </li>
// //                 <li className="flex items-center gap-2">
// //                   <FaCheckCircle className="text-green-500 text-sm" /> Free
// //                   delivery for 3+ days booking
// //                 </li>
// //                 <li className="flex items-center gap-2">
// //                   <FaCheckCircle className="text-green-500 text-sm" /> Real-time
// //                   tracking available
// //                 </li>
// //               </ul>
// //             </div>
// //           </div>
// //           <div className="mt-8 text-center">
// //             <p className="text-sm text-gray-500">
// //               After booking confirmation, you'll receive a call from our support
// //               team to confirm delivery/pickup details.
// //             </p>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Testimonials */}
// //       <section className="max-w-7xl mx-auto px-6 py-16">
// //         <div className="text-center mb-16">
// //           <div className="inline-flex items-center gap-3 mb-4">
// //             <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
// //             <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
// //               Testimonials
// //             </h3>
// //             <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
// //           </div>
// //           <h2 className="text-4xl font-bold mt-2">What Our Customers Say</h2>
// //           <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
// //             Join thousands of satisfied customers who trust RentRide
// //           </p>
// //         </div>
// //         <div className="grid md:grid-cols-3 gap-8">
// //           <Testimonial
// //             name="Bijay Pandey"
// //             role="Business Traveler"
// //             text="RentRide made renting a car incredibly easy and stress-free. The vehicle was spotless and perfectly maintained."
// //             rating={5}
// //             avatarColor="bg-blue-100"
// //           />
// //           <Testimonial
// //             name="Yogesh Bikram Shah"
// //             role="Family Vacationer"
// //             text="Wide selection of vehicles and competitive pricing. Our family trip was comfortable thanks to their excellent service."
// //             rating={4}
// //             avatarColor="bg-green-100"
// //           />
// //           <Testimonial
// //             name="Aashriti Karki"
// //             role="Adventure Seeker"
// //             text="Support team was very helpful and responsive. The 4x4 I rented handled mountain roads perfectly!"
// //             rating={5}
// //             avatarColor="bg-purple-100"
// //           />
// //         </div>
// //       </section>

// //       {/* FAQ */}
// //       <section className="max-w-7xl mx-auto px-6 py-16">
// //         <div className="text-center mb-16">
// //           <div className="inline-flex items-center gap-3 mb-4">
// //             <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
// //             <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
// //               FAQ
// //             </h3>
// //             <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
// //           </div>
// //           <h2 className="text-4xl font-bold mt-2">
// //             Frequently Asked Questions
// //           </h2>
// //           <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
// //             Get answers to common questions
// //           </p>
// //         </div>
// //         <div className="space-y-4 max-w-3xl mx-auto">
// //           <Faq
// //             q="How do I book a car?"
// //             a="Simply choose a vehicle, select your dates, add any extras, and confirm booking with secure payment. You'll receive instant confirmation."
// //           />
// //           <Faq
// //             q="What is included in the insurance?"
// //             a="Comprehensive insurance covering collision damage, theft, and third-party liability is included in all rentals."
// //           />
// //           <Faq
// //             q="What payment methods are accepted?"
// //             a="We accept all major credit cards, debit cards, digital wallets (Khalti, eSewa), and bank transfers."
// //           />
// //           <Faq
// //             q="How does delivery work after confirmation?"
// //             a="After booking confirmation, our support team will contact you within 2 hours to confirm delivery/pickup details. For doorstep delivery, the vehicle will be delivered to your specified location. For pickup, you can collect from our nearest branch."
// //           />
// //         </div>
// //       </section>

// //       {/* CTA Section */}
// //       <section className="max-w-7xl mx-auto px-6 py-20">
// //         <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-3xl p-12 text-center text-white shadow-3xl relative overflow-hidden">
// //           <div className="relative z-10">
// //             <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full mb-8">
// //               <FaCrown className="text-yellow-300" />
// //               <span className="font-semibold">Premium Service Guaranteed</span>
// //             </div>
// //             <h2 className="text-4xl font-bold mb-6">Ready to Hit the Road?</h2>
// //             <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
// //               Join thousands of satisfied customers and experience premium car
// //               rental service like never before
// //             </p>
// //             <div className="flex flex-col sm:flex-row gap-6 justify-center">
// //               <Link
// //                 to="/signup"
// //                 className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-12 rounded-xl transition-all duration-300 hover:-translate-y-1 shadow-2xl hover:shadow-3xl flex items-center justify-center gap-3 group"
// //               >
// //                 <FaCar className="group-hover:scale-110 transition-transform" />
// //                 Sign Up Now
// //               </Link>
// //               <Link
// //                 to="/login"
// //                 className="bg-transparent border-2 border-white hover:bg-white/20 font-bold py-4 px-12 rounded-xl transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
// //               >
// //                 Login to Account
// //               </Link>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Footer */}
// //       <footer
// //         id="contact"
// //         className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16"
// //       >
// //         <div className="max-w-7xl mx-auto px-6">
// //           <div className="grid md:grid-cols-4 gap-12 mb-12">
// //             <div>
// //               {/* <div className="flex items-center gap-3 mb-8">
// //                 <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-lg">
// //                   <FaCar className="text-white text-2xl" />
// //                 </div>
// //                 <h1 className="text-2xl font-bold">
// //                   Rent<span className="text-blue-400">Ride</span>
// //                 </h1>
// //               </div> */}

// //               <div className="flex items-center gap-3 mb-8">
// //                 <div className="p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
// //                   <FaCar className="text-white text-2xl" />
// //                 </div>
// //                 <div>
// //                   <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
// //                     Rent<span className="text-white">Ride</span>
// //                   </h1>
// //                   <p className="text-xs text-gray-400 -mt-1">
// //                     Premium Car Rentals
// //                   </p>
// //                 </div>
// //               </div>
// //               <p className="text-gray-400 text-sm leading-relaxed mb-6">
// //                 Premium car rental service offering the best rates and
// //                 exceptional customer experience in Nepal.
// //               </p>
// //               <div className="flex gap-4">
// //                 <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
// //                   <FaFacebook />
// //                 </div>
// //                 <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
// //                   <FaTwitter />
// //                 </div>
// //                 <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
// //                   <FaInstagram />
// //                 </div>
// //               </div>
// //             </div>
// //             <div>
// //               <h4 className="font-bold text-lg mb-8 relative inline-block">
// //                 Quick Links
// //                 <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></span>
// //               </h4>
// //               <ul className="space-y-4 text-gray-400 text-sm">
// //                 <li className="hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-2 flex items-center gap-2">
// //                   <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
// //                   About Us
// //                 </li>
// //                 <li className="hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-2 flex items-center gap-2">
// //                   <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
// //                   Contact Support
// //                 </li>
// //                 <li className="hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-2 flex items-center gap-2">
// //                   <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
// //                   Privacy Policy
// //                 </li>
// //                 <li className="hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-2 flex items-center gap-2">
// //                   <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
// //                   Terms & Conditions
// //                 </li>
// //               </ul>
// //             </div>
// //             <div>
// //               <h4 className="font-bold text-lg mb-8 relative inline-block">
// //                 Our Services
// //                 <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></span>
// //               </h4>
// //               <ul className="space-y-4 text-gray-400 text-sm">
// //                 <li className="hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-2 flex items-center gap-2">
// //                   <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
// //                   Airport Rentals
// //                 </li>
// //                 <li className="hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-2 flex items-center gap-2">
// //                   <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
// //                   Luxury Cars
// //                 </li>
// //                 <li className="hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-2 flex items-center gap-2">
// //                   <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
// //                   Long Term Rentals
// //                 </li>
// //                 <li className="hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-2 flex items-center gap-2">
// //                   <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
// //                   Doorstep Delivery
// //                 </li>
// //               </ul>
// //             </div>
// //             <div>
// //               <h4 className="font-bold text-lg mb-8 relative inline-block">
// //                 Contact Info
// //                 <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></span>
// //               </h4>
// //               <ul className="space-y-4 text-gray-400 text-sm">
// //                 <li className="flex items-start gap-3">
// //                   <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
// //                     📍
// //                   </div>
// //                   <span>Kathmandu, Nepal</span>
// //                 </li>
// //                 <li className="flex items-start gap-3">
// //                   <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
// //                     📞
// //                   </div>
// //                   <span>+977 9844177965</span>
// //                 </li>
// //                 <li className="flex items-start gap-3">
// //                   <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
// //                     ✉️
// //                   </div>
// //                   <span>support@rentride.com</span>
// //                 </li>
// //                 <li className="flex items-start gap-3">
// //                   <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
// //                     🕐
// //                   </div>
// //                   <span>24/7 Customer Support</span>
// //                 </li>
// //               </ul>
// //             </div>
// //           </div>

// //           <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
// //             <p>© {new Date().getFullYear()} RentRide. All rights reserved.</p>
// //             <p className="mt-2 text-xs">
// //               Premium car rental service in Kathmandu, Nepal
// //             </p>
// //           </div>
// //         </div>
// //       </footer>
// //     </div>
// //   );
// // }

// // /* Components */
// // function Feature({
// //   icon,
// //   title,
// //   desc,
// //   gradient = "from-blue-500 to-blue-600",
// // }) {
// //   return (
// //     <div className="group relative">
// //       <div className="absolute -inset-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 blur transition duration-500 group-hover:duration-200 rounded-2xl"></div>
// //       <div className="relative bg-white rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 border border-gray-100">
// //         <div
// //           className={`bg-gradient-to-br ${gradient} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
// //         >
// //           {icon}
// //         </div>
// //         <h4 className="font-bold text-xl mb-3 group-hover:text-blue-600 transition-colors">
// //           {title}
// //         </h4>
// //         <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
// //         <div className="mt-6 h-1 w-12 bg-gradient-to-r from-gray-200 to-transparent group-hover:from-blue-500 transition-all duration-300"></div>
// //       </div>
// //     </div>
// //   );
// // }

// // function Advantage({ icon, title, desc, color = "blue", stat }) {
// //   const colorClasses = {
// //     blue: "from-blue-500 to-blue-600",
// //     green: "from-green-500 to-green-600",
// //     purple: "from-purple-500 to-purple-600",
// //     orange: "from-orange-500 to-orange-600",
// //     red: "from-red-500 to-red-600",
// //   };

// //   return (
// //     <div className="group relative">
// //       <div className="absolute -inset-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 blur transition duration-500 group-hover:duration-200 rounded-2xl"></div>
// //       <div className="relative bg-white rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
// //         <div
// //           className={`bg-gradient-to-br ${colorClasses[color]} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
// //         >
// //           {icon}
// //         </div>
// //         <h4 className="font-bold text-xl mb-3 group-hover:text-gray-800 transition-colors">
// //           {title}
// //         </h4>
// //         <p className="text-gray-600 text-sm leading-relaxed mb-4">{desc}</p>
// //         {stat && (
// //           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gray-50 to-gray-100 text-sm font-semibold">
// //             <FaCheckCircle className="text-green-500" />
// //             <span>{stat}</span>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // function Step({ number, title, desc, icon }) {
// //   return (
// //     <div className="relative z-20">
// //       <div className="text-center bg-white p-10 rounded-2xl shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 group">
// //         <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 relative">
// //           {number}
// //         </div>
// //         <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center mx-auto mb-4 text-blue-600">
// //           {icon}
// //         </div>
// //         <h4 className="font-bold text-xl mb-4 group-hover:text-blue-600 transition-colors">
// //           {title}
// //         </h4>
// //         <p className="text-gray-600 leading-relaxed">{desc}</p>
// //       </div>
// //     </div>
// //   );
// // }

// // function Testimonial({
// //   name,
// //   role,
// //   text,
// //   rating,
// //   avatarColor = "bg-blue-100",
// // }) {
// //   return (
// //     <div className="group">
// //       <div className="bg-white rounded-2xl p-10 shadow-2xl hover:shadow-3xl border border-gray-100 transition-all duration-500 hover:-translate-y-3">
// //         <div className="flex mb-6">
// //           {[...Array(5)].map((_, i) => (
// //             <FaStar
// //               key={i}
// //               className={`text-lg ${
// //                 i < rating ? "text-yellow-400" : "text-gray-300"
// //               }`}
// //             />
// //           ))}
// //         </div>
// //         <p className="text-gray-700 text-lg leading-relaxed italic mb-8">
// //           "{text}"
// //         </p>
// //         <div className="flex items-center pt-8 border-t border-gray-100">
// //           <div
// //             className={`w-14 h-14 rounded-full ${avatarColor} flex items-center justify-center text-2xl font-bold mr-4 shadow-lg`}
// //           >
// //             {name.charAt(0)}
// //           </div>
// //           <div>
// //             <p className="font-bold text-gray-900 text-lg">{name}</p>
// //             <p className="text-sm text-gray-500">{role}</p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // function Faq({ q, a }) {
// //   const [open, setOpen] = useState(false);
// //   return (
// //     <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group">
// //       <button
// //         onClick={() => setOpen(!open)}
// //         className="w-full flex justify-between items-center p-8 text-left hover:bg-gray-50 transition-colors duration-300"
// //       >
// //         <div className="flex items-start gap-4">
// //           <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
// //             <span className="text-blue-600 font-semibold">?</span>
// //           </div>
// //           <span className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
// //             {q}
// //           </span>
// //         </div>
// //         <div
// //           className={`w-10 h-10 rounded-full bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center transition-all duration-300 ${
// //             open ? "rotate-180 bg-blue-100" : ""
// //           }`}
// //         >
// //           <FaChevronDown className="text-blue-600" />
// //         </div>
// //       </button>
// //       {open && (
// //         <div className="px-8 pb-8">
// //           <div className="pl-12 border-l-2 border-blue-200">
// //             <p className="text-gray-600 leading-relaxed">{a}</p>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import {
//   FaCar,
//   FaDollarSign,
//   FaShieldAlt,
//   FaClock,
//   FaUserTie,
//   FaTruck,
//   FaHeadset,
//   FaChevronDown,
//   FaStar,
//   FaCheckCircle,
//   FaMapMarkerAlt,
//   FaBolt,
//   FaCrown,
//   FaHeart,
//   FaRegHeart,
//   FaUsers,
//   FaSnowflake,
//   FaCogs,
//   FaChair,
//   FaInfoCircle,
//   FaSearch,
//   FaPhone,
//   FaCalendarAlt,
//   FaEnvelope,
//   FaUserCircle,
//   FaArrowRight,
//   FaCreditCard,
//   FaIdCard,
//   FaFacebook,
//   FaTwitter,
//   FaInstagram,
//   FaWhatsapp,
//   FaArrowUp,
// } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// /* Image imports */
// import heroVideo from "../../assets/Dashboard/INtro.mp4";
// import sedan from "../../assets/Dashboard/sedan.jpg";
// import suv from "../../assets/Dashboard/suv.jpg";
// import ev from "../../assets/Dashboard/ev.jpg";
// import convertible from "../../assets/Dashboard/convertible.jpg";
// import minivan from "../../assets/Dashboard/minivan.jpg";
// import sport from "../../assets/Dashboard/sport.jpg";

// const API_URL = "http://localhost:5000/api";

// export default function App() {
//   const [favorites, setFavorites] = useState(new Set());
//   const [vehicles, setVehicles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [filteredVehicles, setFilteredVehicles] = useState([]);
//   const [activeFilter, setActiveFilter] = useState("All vehicles");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedVehicle, setSelectedVehicle] = useState(null);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [showScrollTop, setShowScrollTop] = useState(false);
//   const [activeNav, setActiveNav] = useState("home");
//   const navigate = useNavigate();

//   const filters = [
//     "All vehicles",
//     "Sedan",
//     "SUV",
//     "Hatchback",
//     "MPV",
//     "Coupe",
//     "Convertible",
//     "Pickup",
//     "Minivan",
//     "Electric",
//   ];

//   // Scroll to top button visibility
//   useEffect(() => {
//     const handleScroll = () => {
//       setShowScrollTop(window.scrollY > 500);
//       const sections = ["home", "vehicles", "how-it-works", "contact"];
//       for (const section of sections) {
//         const element = document.getElementById(section);
//         if (element) {
//           const rect = element.getBoundingClientRect();
//           if (rect.top <= 100 && rect.bottom >= 100) {
//             setActiveNav(section);
//             break;
//           }
//         }
//       }
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Fetch vehicles
//   useEffect(() => {
//     fetchVehicles();
//   }, []);

//   const fetchVehicles = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const adminResponse = await axios.get(
//         "http://localhost:5000/api/vehicles",
//         { timeout: 10000 },
//       );

//       let userVehicles = [];
//       try {
//         const userResponse = await axios.get(
//           "http://localhost:5000/api/user-vehicles/public/active",
//           { timeout: 10000 },
//         );
//         if (userResponse.data.success) userVehicles = userResponse.data.data;
//       } catch (userError) {
//         console.log("Could not fetch user vehicles:", userError.message);
//       }

//       let allVehicles = [];
//       if (adminResponse.data && Array.isArray(adminResponse.data)) {
//         allVehicles = [...adminResponse.data];
//       } else if (
//         adminResponse.data?.data &&
//         Array.isArray(adminResponse.data.data)
//       ) {
//         allVehicles = [...adminResponse.data.data];
//       }

//       userVehicles.forEach((userVehicle) =>
//         allVehicles.push({ ...userVehicle, source: "user" }),
//       );

//       setVehicles(allVehicles);
//       setFilteredVehicles(allVehicles);
//     } catch (error) {
//       console.error("Error fetching vehicles:", error);
//       setError("Failed to load vehicles. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleFavorite = (vehicleId, e) => {
//     e?.stopPropagation();
//     const newWishlist = new Set(favorites);
//     if (newWishlist.has(vehicleId)) {
//       newWishlist.delete(vehicleId);
//     } else {
//       newWishlist.add(vehicleId);
//     }
//     setFavorites(newWishlist);
//   };

//   useEffect(() => {
//     const filtered = vehicles.filter((vehicle) => {
//       const matchesFilter =
//         activeFilter === "All vehicles" ||
//         vehicle.carType?.toLowerCase() === activeFilter.toLowerCase();
//       const matchesSearch =
//         searchQuery === "" ||
//         vehicle.carName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         vehicle.carType?.toLowerCase().includes(searchQuery.toLowerCase());
//       return matchesFilter && matchesSearch;
//     });
//     setFilteredVehicles(filtered);
//   }, [activeFilter, searchQuery, vehicles]);

//   const getVehicleImage = (vehicle) => {
//     if (vehicle.photos?.length > 0) {
//       const extraView = vehicle.photos.find(
//         (photo) => photo.label === "Extra View",
//       );
//       const photo = extraView || vehicle.photos[0];
//       const folder = vehicle.source === "user" ? "user-vehicles" : "vehicles";
//       return `http://localhost:5000/uploads/${folder}/${photo.filename}`;
//     }
//     switch (vehicle.carType) {
//       case "SUV":
//         return suv;
//       case "Sedan":
//         return sedan;
//       case "Hatchback":
//         return sedan;
//       case "MPV":
//         return minivan;
//       case "Convertible":
//         return convertible;
//       case "Coupe":
//         return sport;
//       case "Pickup":
//         return suv;
//       case "Minivan":
//         return minivan;
//       case "Electric":
//         return ev;
//       default:
//         return sedan;
//     }
//   };

//   const handleViewDetails = (vehicle) => {
//     setSelectedVehicle(vehicle);
//     setShowDetailsModal(true);
//   };

//   const handleBookNow = (vehicle) => {
//     navigate(`/booking/${vehicle._id}`);
//   };

//   const formatPrice = (price) => `रु ${price.toLocaleString()}`;

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const scrollToSection = (sectionId) => {
//     const section = document.getElementById(sectionId);
//     if (section) {
//       section.scrollIntoView({ behavior: "smooth" });
//       setActiveNav(sectionId);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
//         <div className="text-center">
//           <div className="relative w-24 h-24 mx-auto mb-6">
//             <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full"></div>
//             <div className="absolute inset-0 border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
//             <div className="absolute inset-2 border-4 border-t-transparent border-r-blue-500 border-b-transparent border-l-transparent rounded-full animate-spin animation-delay-300"></div>
//             <FaCar className="absolute inset-0 m-auto text-white text-2xl animate-pulse" />
//           </div>
//           <p className="text-white/80 text-lg">Loading premium vehicles...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 flex items-center justify-center">
//         <div className="text-center max-w-md mx-auto p-8 bg-white/10 backdrop-blur-lg rounded-2xl">
//           <div className="text-6xl mb-4">⚠️</div>
//           <h3 className="text-xl font-semibold text-white mb-2">
//             Something went wrong
//           </h3>
//           <p className="text-white/70 mb-6">{error}</p>
//           <button
//             onClick={fetchVehicles}
//             className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="font-sans text-gray-900 bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
//       {/* Navbar */}
//       <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100">
//         <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
//           <div
//             className="flex items-center gap-3 cursor-pointer group"
//             onClick={() => scrollToSection("home")}
//           >
//             <div className="p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
//               <FaCar className="text-white text-2xl" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 Rent<span className="text-gray-800">Ride</span>
//               </h1>
//               <p className="text-xs text-gray-500 -mt-1">Premium Car Rentals</p>
//             </div>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center gap-8">
//             {[
//               { id: "home", label: "Home" },
//               { id: "vehicles", label: "Vehicles" },
//               { id: "how-it-works", label: "How It Works" },
//               { id: "contact", label: "Contact" },
//             ].map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => scrollToSection(item.id)}
//                 className={`relative text-sm font-medium transition-all duration-300 ${
//                   activeNav === item.id
//                     ? "text-purple-600"
//                     : "text-gray-700 hover:text-purple-600"
//                 }`}
//               >
//                 {item.label}
//                 {activeNav === item.id && (
//                   <motion.div
//                     layoutId="activeNav"
//                     className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"
//                     initial={{ width: 0 }}
//                     animate={{ width: "100%" }}
//                     transition={{ duration: 0.3 }}
//                   />
//                 )}
//               </button>
//             ))}
//           </div>

//           {/* Search Bar - Desktop */}
//           <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
//             <div className="relative w-full">
//               <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
//               <input
//                 type="text"
//                 placeholder="Search by car name or type..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-11 pr-4 py-2.5 bg-gray-100 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
//               />
//             </div>
//           </div>

//           <div className="flex items-center gap-3">
//             <Link
//               to="/login"
//               className="px-5 py-2 border-2 border-purple-600 text-purple-600 font-semibold rounded-full hover:bg-purple-50 transition-all duration-300 text-sm"
//             >
//               Login
//             </Link>
//             <Link
//               to="/signup"
//               className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all"
//             >
//               Sign Up
//             </Link>
//           </div>
//         </div>

//         {/* Mobile Search */}
//         <div className="md:hidden px-6 pb-4">
//           <div className="relative">
//             <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search vehicles..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-11 pr-4 py-3 bg-gray-100 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
//             />
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section id="home" className="pt-24 pb-16 px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6 }}
//               className="space-y-6"
//             >
//               <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full">
//                 <FaBolt className="text-purple-600 text-sm" />
//                 <span className="text-sm font-semibold text-purple-700">
//                   Trusted by 10,000+ Customers
//                 </span>
//               </div>
//               <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
//                 Drive Your{" "}
//                 <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//                   Dream Car
//                 </span>
//                 <br />
//                 in Kathmandu
//               </h1>
//               <p className="text-gray-600 text-lg max-w-md">
//                 Experience luxury and convenience with our premium car rental
//                 service. Book online in minutes, drive away in style.
//               </p>
//               <div className="flex flex-wrap gap-4">
//                 <button
//                   onClick={() => scrollToSection("vehicles")}
//                   className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:shadow-xl transition-all transform hover:scale-105"
//                 >
//                   Explore Cars
//                 </button>
//                 <button
//                   onClick={() => scrollToSection("how-it-works")}
//                   className="px-8 py-3.5 border-2 border-purple-600 text-purple-600 font-semibold rounded-full hover:bg-purple-50 transition-all"
//                 >
//                   How It Works
//                 </button>
//               </div>

//               {/* Stats */}
//               <div className="flex flex-wrap gap-8 pt-8">
//                 {[
//                   { value: "10K+", label: "Happy Customers", icon: FaUsers },
//                   { value: "200+", label: "Premium Vehicles", icon: FaCar },
//                   { value: "15+", label: "Cities", icon: FaMapMarkerAlt },
//                   { value: "24/7", label: "Support", icon: FaHeadset },
//                 ].map((stat, idx) => (
//                   <div key={idx} className="text-center">
//                     <div className="text-2xl font-bold text-gray-900">
//                       {stat.value}
//                     </div>
//                     <div className="text-sm text-gray-500 flex items-center gap-1">
//                       <stat.icon className="text-purple-500 text-xs" />{" "}
//                       {stat.label}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="relative"
//             >
//               <div className="relative rounded-2xl overflow-hidden shadow-2xl">
//                 <video
//                   src={heroVideo}
//                   autoPlay
//                   muted
//                   loop
//                   playsInline
//                   className="w-full h-[400px] object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
//               </div>
//               <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 backdrop-blur-sm">
//                 <p className="text-sm font-semibold text-gray-800">
//                   {vehicles.length}+ Vehicles Available
//                 </p>
//                 <p className="text-xs text-gray-500">24/7 pickup & delivery</p>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 px-6 bg-gradient-to-br from-purple-50/50 to-pink-50/50">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-12">
//             <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold mb-4">
//               WHY CHOOSE US
//             </span>
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">
//               The Best Rental Experience
//             </h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               We combine technology with personalized service to deliver an
//               exceptional car rental experience
//             </p>
//           </div>
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[
//               {
//                 icon: FaCar,
//                 title: "Wide Selection",
//                 desc: "Choose from premium vehicles for every need",
//                 color: "from-blue-500 to-cyan-400",
//               },
//               {
//                 icon: FaClock,
//                 title: "Easy Booking",
//                 desc: "Book in 3 simple steps, 24/7 availability",
//                 color: "from-green-500 to-emerald-400",
//               },
//               {
//                 icon: FaShieldAlt,
//                 title: "Fully Insured",
//                 desc: "Comprehensive coverage for peace of mind",
//                 color: "from-purple-500 to-pink-400",
//               },
//               {
//                 icon: FaCreditCard,
//                 title: "Flexible Payment",
//                 desc: "Multiple payment options available",
//                 color: "from-orange-500 to-yellow-400",
//               },
//             ].map((feature, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: idx * 0.1 }}
//                 viewport={{ once: true }}
//                 className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
//               >
//                 <div
//                   className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
//                 >
//                   <feature.icon className="text-white text-2xl" />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-2">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-600">{feature.desc}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Vehicle Filter Section */}
//       <section id="vehicles" className="py-20 px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-12">
//             <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
//               OUR FLEET
//             </span>
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">
//               Choose Your Perfect Ride
//             </h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Select from our premium collection of vehicles
//             </p>
//           </div>

//           {/* Filter Buttons */}
//           <div className="flex flex-wrap justify-center gap-3 mb-12">
//             {filters.map((filter) => (
//               <button
//                 key={filter}
//                 onClick={() => setActiveFilter(filter)}
//                 className={`px-5 py-2.5 rounded-full transition-all duration-300 ${
//                   activeFilter === filter
//                     ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
//                     : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm border border-gray-200"
//                 }`}
//               >
//                 {filter} {filter === "All vehicles" && `(${vehicles.length})`}
//               </button>
//             ))}
//           </div>

//           {/* Vehicles Grid */}
//           {filteredVehicles.length === 0 ? (
//             <div className="text-center py-20">
//               <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <FaCar className="text-gray-400 text-4xl" />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-700 mb-2">
//                 No vehicles found
//               </h3>
//               <p className="text-gray-500">
//                 {searchQuery
//                   ? `No results for "${searchQuery}"`
//                   : "Try selecting a different category"}
//               </p>
//             </div>
//           ) : (
//             <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {filteredVehicles.map((vehicle, idx) => (
//                 <motion.div
//                   key={vehicle._id}
//                   initial={{ opacity: 0, y: 30 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: idx * 0.05 }}
//                   viewport={{ once: true }}
//                   className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 cursor-pointer hover:-translate-y-2"
//                   onClick={() => handleViewDetails(vehicle)}
//                 >
//                   {/* Wishlist Button */}
//                   <button
//                     onClick={(e) => toggleFavorite(vehicle._id, e)}
//                     className="absolute top-4 right-4 z-10 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:scale-110 transition-transform duration-300"
//                   >
//                     <FaHeart
//                       className={`text-lg ${favorites.has(vehicle._id) ? "text-red-500 fill-red-500" : "text-gray-400"}`}
//                     />
//                   </button>

//                   {/* Status Badge */}
//                   <div className="absolute top-4 left-4 z-10">
//                     <span
//                       className={`px-3 py-1.5 rounded-full text-xs font-semibold ${vehicle.status === "Available" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
//                     >
//                       {vehicle.status}
//                     </span>
//                   </div>

//                   {/* Car Image */}
//                   <div className="h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
//                     <img
//                       src={getVehicleImage(vehicle)}
//                       alt={vehicle.carName}
//                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                       onError={(e) => {
//                         e.target.src = sedan;
//                       }}
//                     />
//                   </div>

//                   {/* Car Details */}
//                   <div className="p-5">
//                     <div className="flex items-start justify-between mb-3">
//                       <div>
//                         <h3 className="text-lg font-bold text-gray-800">
//                           {vehicle.carName}
//                         </h3>
//                         <div className="flex items-center gap-1 mt-1">
//                           {[...Array(5)].map((_, i) => (
//                             <FaStar
//                               key={i}
//                               className={`text-xs ${i < 4 ? "text-yellow-400" : "text-gray-300"}`}
//                             />
//                           ))}
//                           <span className="text-xs text-gray-500 ml-1">
//                             (128 reviews)
//                           </span>
//                         </div>
//                       </div>
//                       <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
//                         {vehicle.carType}
//                       </span>
//                     </div>

//                     <div className="flex items-center gap-3 mb-4 text-sm text-gray-500">
//                       <div className="flex items-center gap-1">
//                         <FaCogs size={12} />
//                         <span>{vehicle.gearType}</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <FaChair size={12} />
//                         <span>{vehicle.seats} seats</span>
//                       </div>
//                     </div>

//                     <div className="flex items-center justify-between pt-3 border-t border-gray-100">
//                       <div>
//                         <p className="text-xs text-gray-500">Daily rate</p>
//                         <p className="text-xl font-bold text-gray-900">
//                           {formatPrice(vehicle.ratePerDay)}
//                           <span className="text-sm font-normal text-gray-500">
//                             /day
//                           </span>
//                         </p>
//                       </div>
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleViewDetails(vehicle);
//                         }}
//                         className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-lg hover:shadow-lg transition-all"
//                       >
//                         View Details
//                       </button>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* How It Works */}
//       <section
//         id="how-it-works"
//         className="py-20 px-6 bg-gradient-to-br from-slate-900 to-purple-900"
//       >
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-12">
//             <span className="inline-block px-4 py-1.5 bg-white/20 text-white rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
//               SIMPLE PROCESS
//             </span>
//             <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
//             <p className="text-white/70 max-w-2xl mx-auto">
//               Get your perfect ride in three simple steps
//             </p>
//           </div>
//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               {
//                 number: "01",
//                 title: "Choose Vehicle",
//                 desc: "Browse our fleet and select your preferred vehicle",
//                 icon: FaCar,
//                 color: "from-blue-500 to-cyan-400",
//               },
//               {
//                 number: "02",
//                 title: "Book & Pay",
//                 desc: "Select dates, add extras, and complete secure payment",
//                 icon: FaCreditCard,
//                 color: "from-purple-500 to-pink-500",
//               },
//               {
//                 number: "03",
//                 title: "Get Your Vehicle",
//                 desc: "Pick up from our location or get doorstep delivery",
//                 icon: FaMapMarkerAlt,
//                 color: "from-green-500 to-emerald-500",
//               },
//             ].map((step, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: idx * 0.1 }}
//                 viewport={{ once: true }}
//                 className="relative text-center"
//               >
//                 <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//                   {step.number}
//                 </div>
//                 <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 pt-12 border border-white/20 hover:border-white/40 transition-all">
//                   <div
//                     className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center mx-auto mb-5 shadow-lg`}
//                   >
//                     <step.icon className="text-white text-3xl" />
//                   </div>
//                   <h3 className="text-xl font-bold text-white mb-2">
//                     {step.title}
//                   </h3>
//                   <p className="text-white/70">{step.desc}</p>
//                 </div>
//                 {idx < 2 && (
//                   <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-white/30 text-3xl">
//                     <FaArrowRight />
//                   </div>
//                 )}
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Delivery Information */}
//       <section className="py-20 px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-10">
//             <div className="text-center mb-10">
//               <h2 className="text-3xl font-bold text-gray-800">
//                 Delivery Options
//               </h2>
//               <p className="text-gray-600 mt-2">
//                 Choose how you want to receive your vehicle
//               </p>
//             </div>
//             <div className="grid md:grid-cols-2 gap-8">
//               <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all">
//                 <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <FaMapMarkerAlt className="text-blue-600 text-2xl" />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-800 mb-2">
//                   Pickup from Location
//                 </h3>
//                 <p className="text-gray-600">
//                   Collect your vehicle from our nearest branch. Our team will
//                   assist you with the handover process.
//                 </p>
//                 <ul className="mt-4 text-left text-sm text-gray-500 space-y-2">
//                   <li className="flex items-center gap-2">
//                     <FaCheckCircle className="text-green-500 text-sm" /> Free
//                     pickup service
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <FaCheckCircle className="text-green-500 text-sm" /> Vehicle
//                     inspection on site
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <FaCheckCircle className="text-green-500 text-sm" />{" "}
//                     Document verification
//                   </li>
//                 </ul>
//               </div>
//               <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all">
//                 <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <FaTruck className="text-purple-600 text-2xl" />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-800 mb-2">
//                   Doorstep Delivery
//                 </h3>
//                 <p className="text-gray-600">
//                   Get your vehicle delivered to your home, hotel, or office. Our
//                   driver will bring the car to you.
//                 </p>
//                 <ul className="mt-4 text-left text-sm text-gray-500 space-y-2">
//                   <li className="flex items-center gap-2">
//                     <FaCheckCircle className="text-green-500 text-sm" />{" "}
//                     Delivery within Kathmandu Valley
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <FaCheckCircle className="text-green-500 text-sm" /> Free
//                     delivery for 3+ days booking
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <FaCheckCircle className="text-green-500 text-sm" />{" "}
//                     Real-time tracking available
//                   </li>
//                 </ul>
//               </div>
//             </div>
//             <div className="mt-8 text-center">
//               <p className="text-sm text-gray-500">
//                 After booking confirmation, you'll receive a call from our
//                 support team to confirm delivery/pickup details.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-16 px-6 bg-white">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             {[
//               {
//                 value: "98%",
//                 label: "Customer Satisfaction",
//                 icon: FaCheckCircle,
//               },
//               { value: "5-min", label: "Quick Response", icon: FaClock },
//               { value: "₹0", label: "Hidden Fees", icon: FaShieldAlt },
//               { value: "24/7", label: "Support Available", icon: FaHeadset },
//             ].map((stat, idx) => (
//               <div key={idx} className="text-center">
//                 <div className="text-3xl font-bold text-purple-600 mb-2">
//                   {stat.value}
//                 </div>
//                 <div className="text-sm text-gray-500 flex items-center justify-center gap-1">
//                   <stat.icon className="text-purple-400" /> {stat.label}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 p-12 text-center">
//             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
//             <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-48 translate-y-48"></div>
//             <div className="relative z-10">
//               <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full mb-6">
//                 <FaCrown className="text-yellow-300" />
//                 <span className="text-white font-semibold">
//                   Premium Service Guaranteed
//                 </span>
//               </div>
//               <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
//                 Ready to Hit the Road?
//               </h2>
//               <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
//                 Join thousands of satisfied customers and experience premium car
//                 rental service like never before
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <Link
//                   to="/signup"
//                   className="px-8 py-3.5 bg-white text-purple-600 font-semibold rounded-full hover:shadow-xl transition-all transform hover:scale-105"
//                 >
//                   Sign Up Now
//                 </Link>
//                 <Link
//                   to="/login"
//                   className="px-8 py-3.5 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all"
//                 >
//                   Login to Account
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer id="contact" className="bg-gray-900 text-white pt-16 pb-8">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="grid md:grid-cols-4 gap-10 mb-12">
//             <div>
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
//                   <FaCar className="text-white text-2xl" />
//                 </div>
//                 <div>
//                   <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                     Rent<span className="text-white">Ride</span>
//                   </h1>
//                   <p className="text-xs text-gray-400 -mt-1">
//                     Premium Car Rentals
//                   </p>
//                 </div>
//               </div>
//               <p className="text-gray-400 text-sm leading-relaxed mb-6">
//                 Premium car rental service offering the best rates and
//                 exceptional customer experience in Nepal.
//               </p>
//               <div className="flex gap-3">
//                 {[FaFacebook, FaTwitter, FaInstagram, FaWhatsapp].map(
//                   (Icon, idx) => (
//                     <div
//                       key={idx}
//                       className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer"
//                     >
//                       <Icon size={14} />
//                     </div>
//                   ),
//                 )}
//               </div>
//             </div>

//             <div>
//               <h4 className="font-bold text-lg mb-6">Quick Links</h4>
//               <ul className="space-y-3 text-gray-400 text-sm">
//                 <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
//                   About Us
//                 </li>
//                 <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
//                   Contact Support
//                 </li>
//                 <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
//                   Privacy Policy
//                 </li>
//                 <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
//                   Terms & Conditions
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="font-bold text-lg mb-6">Our Services</h4>
//               <ul className="space-y-3 text-gray-400 text-sm">
//                 <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
//                   Airport Rentals
//                 </li>
//                 <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
//                   Luxury Cars
//                 </li>
//                 <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
//                   Long Term Rentals
//                 </li>
//                 <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
//                   Doorstep Delivery
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="font-bold text-lg mb-6">Contact Info</h4>
//               <ul className="space-y-4 text-gray-400 text-sm">
//                 <li className="flex items-start gap-3">
//                   <span className="text-xl">📍</span>
//                   <span>Kathmandu, Nepal</span>
//                 </li>
//                 <li className="flex items-center gap-3">
//                   <span className="text-xl">📞</span>
//                   <span>+977 9844177965</span>
//                 </li>
//                 <li className="flex items-center gap-3">
//                   <span className="text-xl">✉️</span>
//                   <span>support@rentride.com</span>
//                 </li>
//                 <li className="flex items-center gap-3">
//                   <span className="text-xl">🕐</span>
//                   <span>24/7 Customer Support</span>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
//             <p>© {new Date().getFullYear()} RentRide. All rights reserved.</p>
//             <p className="mt-1 text-xs">
//               Premium car rental service in Kathmandu, Nepal
//             </p>
//           </div>
//         </div>
//       </footer>

// {/* Bike Detail Modal */}
// <AnimatePresence>
//   {showBikeModal && selectedBike && (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100]">
//       <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowBikeModal(false)}></div>
//       <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="absolute inset-0 flex items-center justify-center p-4">
//         <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//           <div className="sticky top-0 bg-white border-b px-8 py-5 flex justify-between items-center">
//             <div>
//               <h2 className="text-2xl font-bold text-gray-900">{selectedBike.bikeName}</h2>
//               <div className="flex items-center gap-2 mt-1">
//                 <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium">{selectedBike.bikeType}</span>
//                 <span className={`px-3 py-1 rounded-full text-sm font-medium ${ selectedBike.status === "Available" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600" }`}>{selectedBike.status}</span>
//               </div>
//             </div>
//             <button onClick={() => setShowBikeModal(false)} className="p-3 hover:bg-gray-100 rounded-full transition-colors"><span className="text-2xl text-gray-500">×</span></button>
//           </div>
//           <div className="p-8">
//             {selectedBike.photos?.length > 0 ? (
//               <div className="grid grid-cols-3 gap-4 mb-8">
//                 {selectedBike.photos.map((photo, idx) => (
//                   <div key={idx} className={`${idx === 0 ? "col-span-2" : ""} relative rounded-2xl overflow-hidden`} style={{height: idx === 0 ? "240px" : "112px"}}>
//                     <img src={`http://localhost:5000/uploads/bikes/${photo.filename}`} alt={photo.label} className="w-full h-full object-cover" />
//                     <div className="absolute bottom-3 left-3 bg-black/60 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm">{photo.label}</div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="h-56 bg-gradient-to-br from-orange-50 to-pink-100 rounded-2xl flex items-center justify-center mb-8"><FaMotorcycle className="text-8xl text-orange-200" /></div>
//             )}
//             <div className="grid grid-cols-2 gap-4 mb-6">
//               {[{label:"Brand",value:selectedBike.brand},{label:"Model",value:selectedBike.model},{label:"Year",value:selectedBike.year},{label:"Engine",value:selectedBike.engineCapacity},{label:"Fuel",value:selectedBike.fuelType},{label:"Transmission",value:selectedBike.transmission},{label:"Mileage",value:selectedBike.mileage},{label:"Contact",value:selectedBike.phoneNumber}].filter(s=>s.value).map((spec,i)=>(
//                 <div key={i} className="flex items-center p-4 bg-gray-50 rounded-xl"><div className="mr-3"><p className="text-sm text-gray-500">{spec.label}</p><p className="font-semibold text-gray-900">{spec.value}</p></div></div>
//               ))}
//             </div>
//             {selectedBike.features?.length > 0 && <div className="mb-6"><h3 className="text-lg font-bold text-gray-900 mb-3">Features</h3><div className="flex flex-wrap gap-2">{selectedBike.features.map((f,i)=><span key={i} className="px-4 py-2 bg-orange-50 text-orange-700 rounded-lg font-medium">{f}</span>)}</div></div>}
//             <div className="sticky top-24 bg-gradient-to-b from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-lg">
//               <div className="text-center mb-5"><p className="text-gray-500 mb-1">Daily Rate</p><div className="flex items-baseline justify-center"><span className="text-5xl font-bold text-gray-900">रु{selectedBike.ratePerDay}</span><span className="text-gray-500 ml-2">/day</span></div></div>
//               <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
//                 onClick={() => { if (selectedBike.status === "Available") { navigate(`/bike-booking/${selectedBike._id}`); setShowBikeModal(false); } }}
//                 disabled={selectedBike.status !== "Available"}
//                 className={`w-full px-8 py-4 font-bold rounded-xl transition-all duration-300 ${ selectedBike.status === "Available" ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:shadow-2xl" : "bg-gray-100 text-gray-400 cursor-not-allowed" }`}
//               >{selectedBike.status === "Available" ? "Book This Bike" : `Currently ${selectedBike.status}`}</motion.button>
//               <div className="mt-4 text-center"><p className="text-gray-500 text-sm">• Free cancellation • 24/7 support</p></div>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   )}
// </AnimatePresence>

//       {/* Scroll to Top Button */}
//       <AnimatePresence>
//         {showScrollTop && (
//           <motion.button
//             initial={{ opacity: 0, scale: 0 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0 }}
//             onClick={scrollToTop}
//             className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
//           >
//             <FaArrowUp />
//           </motion.button>
//         )}
//       </AnimatePresence>

//       {/* Vehicle Details Modal */}
//       {showDetailsModal && selectedVehicle && (
//         <div className="fixed inset-0 z-[100]">
//           <div
//             className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//             onClick={() => setShowDetailsModal(false)}
//           ></div>
//           <div className="absolute inset-0 flex items-center justify-center p-4">
//             <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
//               <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center">
//                 <div>
//                   <h2 className="text-3xl font-bold text-gray-900">
//                     {selectedVehicle.carName}
//                   </h2>
//                   <div className="flex items-center gap-3 mt-2">
//                     <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
//                       {selectedVehicle.carType}
//                     </span>
//                     <span
//                       className={`px-3 py-1 rounded-full text-sm font-medium ${
//                         selectedVehicle.status === "Available"
//                           ? "bg-green-100 text-green-600"
//                           : "bg-red-100 text-red-600"
//                       }`}
//                     >
//                       {selectedVehicle.status}
//                     </span>
//                     <span className="text-gray-500">
//                       {selectedVehicle.carNumber}
//                     </span>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => setShowDetailsModal(false)}
//                   className="p-3 hover:bg-gray-100 rounded-full transition-colors"
//                 >
//                   <span className="text-2xl text-gray-500">×</span>
//                 </button>
//               </div>
//               <div className="p-8">
//                 {/* Gallery */}
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
//                   {selectedVehicle.photos &&
//                   selectedVehicle.photos.length > 0 ? (
//                     selectedVehicle.photos.map((photo, index) => (
//                       <div
//                         key={index}
//                         className={`${index === 0 ? "lg:col-span-2" : ""}`}
//                       >
//                         <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden">
//                           <img
//                             src={`http://localhost:5000/uploads/${selectedVehicle.source === "user" ? "user-vehicles" : "vehicles"}/${photo.filename}`}
//                             alt={photo.label}
//                             className="w-full h-full object-cover"
//                           />
//                           <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm backdrop-blur-sm">
//                             {photo.label}
//                           </div>
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     <div className="lg:col-span-3 h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
//                       <FaCar className="text-8xl text-gray-300" />
//                     </div>
//                   )}
//                 </div>

//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                   {/* Left Column - Specifications */}
//                   <div className="lg:col-span-2">
//                     <h3 className="text-2xl font-bold text-gray-900 mb-6">
//                       Specifications
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       {[
//                         {
//                           icon: FaCogs,
//                           label: "Transmission",
//                           value: selectedVehicle.gearType,
//                         },
//                         {
//                           icon: FaChair,
//                           label: "Seats",
//                           value: `${selectedVehicle.seats} Persons`,
//                         },
//                         {
//                           icon: FaSnowflake,
//                           label: "Air Conditioning",
//                           value: selectedVehicle.airCondition,
//                         },
//                         {
//                           icon: FaUserTie,
//                           label: "Driver",
//                           value: selectedVehicle.driverName || "Not Included",
//                         },
//                         {
//                           icon: FaPhone,
//                           label: "Contact",
//                           value: selectedVehicle.phoneNumber,
//                         },
//                         {
//                           icon: FaCalendarAlt,
//                           label: "Booking Type",
//                           value: selectedVehicle.bookingType,
//                         },
//                       ].map((spec, index) => (
//                         <div
//                           key={index}
//                           className="flex items-center p-4 bg-gray-50 rounded-xl"
//                         >
//                           <div className="p-3 bg-white rounded-lg shadow-sm mr-4">
//                             <spec.icon className="text-purple-600" />
//                           </div>
//                           <div>
//                             <p className="text-sm text-gray-500">
//                               {spec.label}
//                             </p>
//                             <p className="font-semibold text-gray-900">
//                               {spec.value}
//                             </p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     {selectedVehicle.features &&
//                       selectedVehicle.features.length > 0 && (
//                         <div className="mt-10">
//                           <h3 className="text-2xl font-bold text-gray-900 mb-6">
//                             Features & Amenities
//                           </h3>
//                           <div className="flex flex-wrap gap-3">
//                             {selectedVehicle.features.map((feature, index) => (
//                               <span
//                                 key={index}
//                                 className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg font-medium"
//                               >
//                                 {feature}
//                               </span>
//                             ))}
//                           </div>
//                         </div>
//                       )}

//                     {selectedVehicle.description && (
//                       <div className="mt-10">
//                         <h3 className="text-2xl font-bold text-gray-900 mb-4">
//                           Description
//                         </h3>
//                         <p className="text-gray-600 leading-relaxed">
//                           {selectedVehicle.description}
//                         </p>
//                       </div>
//                     )}
//                   </div>

//                   {/* Right Column - Pricing & Booking */}
//                   <div className="lg:col-span-1">
//                     <div className="sticky top-24 bg-gradient-to-b from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-lg">
//                       <div className="text-center mb-6">
//                         <p className="text-gray-500 mb-2">Daily Rate</p>
//                         <div className="flex items-baseline justify-center">
//                           <span className="text-5xl font-bold text-gray-900">
//                             रु{selectedVehicle.ratePerDay}
//                           </span>
//                           <span className="text-gray-500 ml-2">/day</span>
//                         </div>
//                       </div>

//                       <div className="mb-6 p-4 bg-purple-50 border border-purple-100 rounded-lg">
//                         <div className="flex items-start">
//                           <FaInfoCircle className="text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
//                           <div>
//                             <h4 className="font-semibold text-purple-800 mb-1">
//                               Complete Price Breakdown
//                             </h4>
//                             <p className="text-sm text-purple-700">
//                               Full price calculation including optional extras
//                               will be shown during booking.
//                             </p>
//                           </div>
//                         </div>
//                       </div>

//                       <button
//                         onClick={() => {
//                           handleBookNow(selectedVehicle);
//                           setShowDetailsModal(false);
//                         }}
//                         className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-green-500/30 hover:scale-105 transition-all duration-300"
//                       >
//                         Book This Vehicle
//                       </button>

//                       <div className="mt-6 text-center">
//                         <p className="text-gray-500 text-sm">
//                           • Free cancellation • 24/7 support • Instant
//                           confirmation
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaCar,
  FaDollarSign,
  FaShieldAlt,
  FaClock,
  FaUserTie,
  FaTruck,
  FaHeadset,
  FaChevronDown,
  FaStar,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaBolt,
  FaCrown,
  FaHeart,
  FaRegHeart,
  FaUsers,
  FaSnowflake,
  FaCogs,
  FaChair,
  FaInfoCircle,
  FaSearch,
  FaPhone,
  FaCalendarAlt,
  FaEnvelope,
  FaUserCircle,
  FaArrowRight,
  FaCreditCard,
  FaIdCard,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
  FaArrowUp,
  FaMotorcycle,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/* Image imports */
import heroVideo from "../../assets/Dashboard/INtro.mp4";
import sedan from "../../assets/Dashboard/sedan.jpg";
import suv from "../../assets/Dashboard/suv.jpg";
import ev from "../../assets/Dashboard/ev.jpg";
import convertible from "../../assets/Dashboard/convertible.jpg";
import minivan from "../../assets/Dashboard/minivan.jpg";
import sport from "../../assets/Dashboard/sport.jpg";

const API_URL = "http://localhost:5000/api";

export default function App() {
  const [favorites, setFavorites] = useState(new Set());
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All vehicles");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  // Tab state
  const [activeTab, setActiveTab] = useState("cars");

  // Bikes state
  const [bikes, setBikes] = useState([]);
  const [bikesLoading, setBikesLoading] = useState(true);
  const [bikeFilter, setBikeFilter] = useState("All");
  const [filteredBikes, setFilteredBikes] = useState([]);
  const [selectedBike, setSelectedBike] = useState(null);
  const [showBikeModal, setShowBikeModal] = useState(false);

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

  // Scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
      const sections = ["home", "vehicles", "how-it-works", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveNav(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch vehicles
  useEffect(() => {
    fetchVehicles();
    fetchBikes();
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      setError("");

      const adminResponse = await axios.get(
        "http://localhost:5000/api/vehicles",
        { timeout: 10000 },
      );

      let userVehicles = [];
      try {
        const userResponse = await axios.get(
          "http://localhost:5000/api/user-vehicles/public/active",
          { timeout: 10000 },
        );
        if (userResponse.data.success) userVehicles = userResponse.data.data;
      } catch (userError) {
        console.log("Could not fetch user vehicles:", userError.message);
      }

      let allVehicles = [];
      if (adminResponse.data && Array.isArray(adminResponse.data)) {
        allVehicles = [...adminResponse.data];
      } else if (
        adminResponse.data?.data &&
        Array.isArray(adminResponse.data.data)
      ) {
        allVehicles = [...adminResponse.data.data];
      }

      userVehicles.forEach((userVehicle) =>
        allVehicles.push({ ...userVehicle, source: "user" }),
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

  const fetchBikes = async () => {
    try {
      setBikesLoading(true);
      const res = await axios.get("http://localhost:5000/api/bikes");
      if (res.data.success) setBikes(res.data.data);
    } catch (err) {
      console.error("Failed to fetch bikes:", err);
    } finally {
      setBikesLoading(false);
    }
  };

  const toggleFavorite = (vehicleId, e) => {
    e?.stopPropagation();
    const newWishlist = new Set(favorites);
    if (newWishlist.has(vehicleId)) {
      newWishlist.delete(vehicleId);
    } else {
      newWishlist.add(vehicleId);
    }
    setFavorites(newWishlist);
  };

  useEffect(() => {
    const filtered = vehicles.filter((vehicle) => {
      const matchesFilter =
        activeFilter === "All vehicles" ||
        vehicle.carType?.toLowerCase() === activeFilter.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        vehicle.carName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.carType?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
    setFilteredVehicles(filtered);
  }, [activeFilter, searchQuery, vehicles]);

  useEffect(() => {
    const filtered = bikes.filter((bike) => {
      const matchesType = bikeFilter === "All" || bike.bikeType === bikeFilter;
      return matchesType;
    });
    setFilteredBikes(filtered);
  }, [bikeFilter, bikes]);

  const getVehicleImage = (vehicle) => {
    if (vehicle.photos?.length > 0) {
      const extraView = vehicle.photos.find(
        (photo) => photo.label === "Extra View",
      );
      const photo = extraView || vehicle.photos[0];
      const folder = vehicle.source === "user" ? "user-vehicles" : "vehicles";
      return `http://localhost:5000/uploads/${folder}/${photo.filename}`;
    }
    switch (vehicle.carType) {
      case "SUV":
        return suv;
      case "Sedan":
        return sedan;
      case "Hatchback":
        return sedan;
      case "MPV":
        return minivan;
      case "Convertible":
        return convertible;
      case "Coupe":
        return sport;
      case "Pickup":
        return suv;
      case "Minivan":
        return minivan;
      case "Electric":
        return ev;
      default:
        return sedan;
    }
  };

  const handleViewDetails = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowDetailsModal(true);
  };

  const handleBookNow = (vehicle) => {
    navigate(`/booking/${vehicle._id}`);
  };

  const getBikeImage = (bike) => {
    if (bike.photos?.length > 0) {
      const front =
        bike.photos.find((p) => p.label === "Front View") || bike.photos[0];
      return `http://localhost:5000/uploads/bikes/${front.filename}`;
    }
    return null;
  };

  const HomeBikeCard = ({ bike, index }) => {
    const imageUrl = getBikeImage(bike);
    const isAvailable = bike.status === "Available";
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        viewport={{ once: true, margin: "-50px" }}
        className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 cursor-pointer h-full flex flex-col"
        onClick={() => {
          setSelectedBike(bike);
          setShowBikeModal(true);
        }}
      >
        <div className="absolute top-4 left-4 z-10">
          <span
            className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
              isAvailable ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            {bike.status}
          </span>
        </div>
        <div className="h-56 overflow-hidden bg-gradient-to-br from-orange-50 to-pink-100 flex-shrink-0">
          {imageUrl ? (
            <motion.img
              src={imageUrl}
              alt={bike.bikeName}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <FaMotorcycle className="text-6xl text-orange-200" />
            </div>
          )}
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-gray-900 truncate">
              {bike.bikeName}
            </h3>
            <span className="px-2 py-0.5 bg-orange-50 text-orange-600 text-xs font-medium rounded-full whitespace-nowrap ml-2">
              {bike.bikeType}
            </span>
          </div>
          <p className="text-sm text-gray-400 mb-3">
            {bike.brand} {bike.model}
          </p>
          <div className="flex items-center gap-3 mb-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <FaCogs size={12} className="text-orange-400" />
              <span>{bike.transmission}</span>
            </div>
            {bike.engineCapacity && (
              <>
                <span className="text-gray-300">|</span>
                <span>{bike.engineCapacity}</span>
              </>
            )}
          </div>
          <div className="mt-auto pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Daily rate</p>
                <p className="text-xl font-bold text-orange-600">
                  रु {bike.ratePerDay?.toLocaleString()}
                  <span className="text-sm font-normal text-gray-500">
                    /day
                  </span>
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedBike(bike);
                  setShowBikeModal(true);
                }}
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                View Details
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const formatPrice = (price) => `रु ${price.toLocaleString()}`;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveNav(sectionId);
    }
  };

  const CarCard = ({ vehicle, index }) => {
    const imageUrl = getVehicleImage(vehicle);
    const isWishlisted = favorites.has(vehicle._id);
    const isHovered = hoveredCard === vehicle._id;

    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        viewport={{ once: true, margin: "-50px" }}
        onHoverStart={() => setHoveredCard(vehicle._id)}
        onHoverEnd={() => setHoveredCard(null)}
        className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 cursor-pointer h-full flex flex-col"
        onClick={() => handleViewDetails(vehicle)}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 rounded-2xl"
          animate={{ opacity: isHovered ? 0.08 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={(e) => toggleFavorite(vehicle._id, e)}
          className="absolute top-4 right-4 z-10 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all duration-300"
        >
          <motion.div
            animate={{ scale: isWishlisted ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 0.3 }}
          >
            <FaHeart
              className={`text-lg ${isWishlisted ? "text-red-500 fill-red-500" : "text-gray-400"}`}
            />
          </motion.div>
        </motion.button>

        <div className="absolute top-4 left-4 z-10">
          <motion.span
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold ${vehicle.status === "Available" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
          >
            {vehicle.status}
          </motion.span>
        </div>

        <div className="h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0">
          <motion.img
            src={imageUrl}
            alt={vehicle.carName}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-bold text-gray-900 truncate">
                  {vehicle.carName}
                </h3>
                <span className="px-2 py-0.5 bg-purple-50 text-purple-600 text-xs font-medium rounded-full whitespace-nowrap">
                  {vehicle.carType}
                </span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-xs ${i < 4 ? "text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
                <span className="text-xs text-gray-500 ml-1">
                  (128 reviews)
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <FaCogs size={12} className="text-purple-500" />
              <span>{vehicle.gearType}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaChair size={12} className="text-purple-500" />
              <span>{vehicle.seats} seats</span>
            </div>
            <div className="flex items-center gap-1">
              <FaSnowflake size={12} className="text-purple-500" />
              <span>{vehicle.airCondition === "Yes" ? "AC" : "No AC"}</span>
            </div>
          </div>

          <div className="mt-auto pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Daily rate</p>
                <p className="text-xl font-bold text-purple-600">
                  {formatPrice(vehicle.ratePerDay)}
                  <span className="text-sm font-normal text-gray-500">
                    /day
                  </span>
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewDetails(vehicle);
                }}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all whitespace-nowrap"
              >
                View Details
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="relative w-24 h-24 mx-auto mb-6"
          >
            <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full"></div>
            <div className="absolute inset-2 border-4 border-t-transparent border-r-blue-500 border-b-transparent border-l-transparent rounded-full"></div>
            <FaCar className="absolute inset-0 m-auto text-white text-2xl animate-pulse" />
          </motion.div>
          <p className="text-white/80 text-lg">Loading premium vehicles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto p-8 bg-white/10 backdrop-blur-lg rounded-2xl"
        >
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Something went wrong
          </h3>
          <p className="text-white/70 mb-6">{error}</p>
          <button
            onClick={fetchVehicles}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="font-sans text-gray-900 bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => scrollToSection("home")}
          >
            <div className="p-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
              <FaCar className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Rent<span className="text-gray-800">Ride</span>
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Premium Car Rentals</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {[
              { id: "home", label: "Home" },
              { id: "vehicles", label: "Vehicles" },
              { id: "how-it-works", label: "How It Works" },
              { id: "contact", label: "Contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative text-sm font-medium transition-all duration-300 ${
                  activeNav === item.id
                    ? "text-purple-600"
                    : "text-gray-700 hover:text-purple-600"
                }`}
              >
                {item.label}
                {activeNav === item.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Search by car name or type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-gray-100 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-5 py-2 border-2 border-purple-600 text-purple-600 font-semibold rounded-full hover:bg-purple-50 transition-all duration-300 text-sm"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-6 pb-4">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search vehicles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-gray-100 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full">
                <FaBolt className="text-purple-600 text-sm" />
                <span className="text-sm font-semibold text-purple-700">
                  Trusted by 10,000+ Customers
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                Drive Your{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Dream Car
                </span>
                <br />
                in Kathmandu
              </h1>
              <p className="text-gray-600 text-lg max-w-md">
                Experience luxury and convenience with our premium car rental
                service. Book online in minutes, drive away in style.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection("vehicles")}
                  className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:shadow-xl transition-all transform hover:scale-105"
                >
                  Explore Cars
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection("how-it-works")}
                  className="px-8 py-3.5 border-2 border-purple-600 text-purple-600 font-semibold rounded-full hover:bg-purple-50 transition-all"
                >
                  How It Works
                </motion.button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-8">
                {[
                  { value: "10K+", label: "Happy Customers", icon: FaUsers },
                  { value: "200+", label: "Premium Vehicles", icon: FaCar },
                  { value: "15+", label: "Cities", icon: FaMapMarkerAlt },
                  { value: "24/7", label: "Support", icon: FaHeadset },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    className="text-center"
                  >
                    <div className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <stat.icon className="text-purple-500 text-xs" />{" "}
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <video
                  src={heroVideo}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 backdrop-blur-sm">
                <p className="text-sm font-semibold text-gray-800">
                  {vehicles.length}+ Vehicles Available
                </p>
                <p className="text-xs text-gray-500">24/7 pickup & delivery</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-purple-50/50 to-pink-50/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold mb-4">
              WHY CHOOSE US
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              The Best Rental Experience
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We combine technology with personalized service to deliver an
              exceptional car rental experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: FaCar,
                title: "Wide Selection",
                desc: "Choose from premium vehicles for every need",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: FaClock,
                title: "Easy Booking",
                desc: "Book in 3 simple steps, 24/7 availability",
                color: "from-green-500 to-emerald-400",
              },
              {
                icon: FaShieldAlt,
                title: "Fully Insured",
                desc: "Comprehensive coverage for peace of mind",
                color: "from-blue-500 to-cyan-400",
              },
              {
                icon: FaCreditCard,
                title: "Flexible Payment",
                desc: "Multiple payment options available",
                color: "from-orange-500 to-yellow-400",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-5 transition-transform`}
                >
                  <feature.icon className="text-white text-2xl" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
           FLEET SECTION — Tabbed Cars / Bikes
      ═══════════════════════════════════════════ */}
      <section id="vehicles" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold mb-4">
              OUR FLEET
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Perfect Ride
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse our premium cars or explore our bike collection
            </p>
          </motion.div>

          {/* ── Tab Switcher ── */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-white rounded-2xl p-1.5 shadow-lg border border-gray-100 gap-1">
              <button
                onClick={() => setActiveTab("cars")}
                className={`flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                  activeTab === "cars"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30 scale-[1.02]"
                    : "text-gray-500 hover:text-purple-600 hover:bg-purple-50"
                }`}
              >
                <FaCar
                  className={
                    activeTab === "cars" ? "text-white" : "text-purple-400"
                  }
                  size={16}
                />
                <span>Cars</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    activeTab === "cars"
                      ? "bg-white/20 text-white"
                      : "bg-purple-100 text-purple-600"
                  }`}
                >
                  {vehicles.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab("bikes")}
                className={`flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                  activeTab === "bikes"
                    ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg shadow-orange-500/30 scale-[1.02]"
                    : "text-gray-500 hover:text-orange-500 hover:bg-orange-50"
                }`}
              >
                <FaMotorcycle
                  className={
                    activeTab === "bikes" ? "text-white" : "text-orange-400"
                  }
                  size={16}
                />
                <span>Bikes</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    activeTab === "bikes"
                      ? "bg-white/20 text-white"
                      : "bg-orange-100 text-orange-600"
                  }`}
                >
                  {bikes.length}
                </span>
              </button>
            </div>
          </div>

          {/* ── CARS TAB ── */}
          {activeTab === "cars" && (
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-wrap justify-center gap-3 mb-10"
              >
                {filters.map((filter, idx) => (
                  <motion.button
                    key={filter}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.02 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-5 py-2.5 rounded-full transition-all duration-300 ${
                      activeFilter === filter
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                        : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm border border-gray-200"
                    }`}
                  >
                    {filter}{" "}
                    {filter === "All vehicles" && `(${vehicles.length})`}
                  </motion.button>
                ))}
              </motion.div>

              {filteredVehicles.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20"
                >
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaCar className="text-gray-400 text-4xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No vehicles found
                  </h3>
                  <p className="text-gray-500">
                    {searchQuery
                      ? `No results for "${searchQuery}"`
                      : "Try selecting a different category"}
                  </p>
                </motion.div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredVehicles.map((vehicle, idx) => (
                    <CarCard key={vehicle._id} vehicle={vehicle} index={idx} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── BIKES TAB ── */}
          {activeTab === "bikes" && (
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-wrap justify-center gap-3 mb-10"
              >
                {bikeTypes.map((type, idx) => (
                  <motion.button
                    key={type}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.02 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setBikeFilter(type)}
                    className={`px-5 py-2.5 rounded-full transition-all duration-300 ${
                      bikeFilter === type
                        ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg"
                        : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm border border-gray-200"
                    }`}
                  >
                    {type}
                  </motion.button>
                ))}
              </motion.div>

              {bikesLoading ? (
                <div className="text-center py-20">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="relative w-20 h-20 mx-auto mb-5"
                  >
                    <div className="absolute inset-0 border-4 border-orange-200 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-t-orange-500 border-r-transparent border-b-transparent border-l-transparent rounded-full"></div>
                    <FaMotorcycle className="absolute inset-0 m-auto text-orange-400 text-2xl" />
                  </motion.div>
                  <p className="text-white/80 text-lg">Loading bikes...</p>
                </div>
              ) : filteredBikes.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20"
                >
                  <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaMotorcycle className="text-orange-300 text-4xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No bikes found
                  </h3>
                  <p className="text-gray-500">
                    Try selecting a different category
                  </p>
                </motion.div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredBikes.map((bike, idx) => (
                    <HomeBikeCard key={bike._id} bike={bike} index={idx} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="py-20 px-6 bg-gradient-to-br from-slate-900 to-purple-900"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 bg-white/20 text-white rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
              SIMPLE PROCESS
            </span>
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Get your perfect ride in three simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "Choose Vehicle",
                desc: "Browse our fleet and select your preferred vehicle",
                icon: FaCar,
                color: "from-purple-500 to-pink-500",
              },
              {
                number: "02",
                title: "Book & Pay",
                desc: "Select dates, add extras, and complete secure payment",
                icon: FaCreditCard,
                color: "from-blue-500 to-cyan-400",
              },
              {
                number: "03",
                title: "Get Your Vehicle",
                desc: "Pick up from our location or get doorstep delivery",
                icon: FaMapMarkerAlt,
                color: "from-green-500 to-emerald-500",
              },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="relative text-center"
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {step.number}
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 pt-12 border border-white/20 hover:border-white/40 transition-all">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center mx-auto mb-5 shadow-lg`}
                  >
                    <step.icon className="text-white text-3xl" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-white/70">{step.desc}</p>
                </div>
                {idx < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-white/30 text-3xl">
                    <FaArrowRight />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Information */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800">
                Delivery Options
              </h2>
              <p className="text-gray-600 mt-2">
                Choose how you want to receive your vehicle
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaMapMarkerAlt className="text-purple-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Pickup from Location
                </h3>
                <p className="text-gray-600">
                  Collect your vehicle from our nearest branch. Our team will
                  assist you with the handover process.
                </p>
                <ul className="mt-4 text-left text-sm text-gray-500 space-y-2">
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500 text-sm" /> Free
                    pickup service
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500 text-sm" /> Vehicle
                    inspection on site
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500 text-sm" />{" "}
                    Document verification
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaTruck className="text-pink-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Doorstep Delivery
                </h3>
                <p className="text-gray-600">
                  Get your vehicle delivered to your home, hotel, or office. Our
                  driver will bring the car to you.
                </p>
                <ul className="mt-4 text-left text-sm text-gray-500 space-y-2">
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500 text-sm" />{" "}
                    Delivery within Kathmandu Valley
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500 text-sm" /> Free
                    delivery for 3+ days booking
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500 text-sm" />{" "}
                    Real-time tracking available
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                After booking confirmation, you'll receive a call from our
                support team to confirm delivery/pickup details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                value: "98%",
                label: "Customer Satisfaction",
                icon: FaCheckCircle,
              },
              { value: "5-min", label: "Quick Response", icon: FaClock },
              { value: "₹0", label: "Hidden Fees", icon: FaShieldAlt },
              { value: "24/7", label: "Support Available", icon: FaHeadset },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 flex items-center justify-center gap-1">
                  <stat.icon className="text-purple-400" /> {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 p-12 text-center"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-48 translate-y-48 animate-pulse delay-1000"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full mb-6">
                <FaCrown className="text-yellow-300" />
                <span className="text-white font-semibold">
                  Premium Service Guaranteed
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Ready to Hit the Road?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers and experience premium car
                rental service like never before
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/signup"
                  className="px-8 py-3.5 bg-white text-purple-600 font-semibold rounded-full hover:shadow-xl transition-all transform hover:scale-105"
                >
                  Sign Up Now
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-3.5 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all"
                >
                  Login to Account
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white pt-16 pb-8">
        {/* Bikes Section */}

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg">
                  <FaCar className="text-white text-2xl" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Rent<span className="text-white">Ride</span>
                  </h1>
                  <p className="text-xs text-gray-400 -mt-1">
                    Premium Car Rentals
                  </p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Premium car rental service offering the best rates and
                exceptional customer experience in Nepal.
              </p>
              <div className="flex gap-3">
                {[FaFacebook, FaTwitter, FaInstagram, FaWhatsapp].map(
                  (Icon, idx) => (
                    <div
                      key={idx}
                      className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer"
                    >
                      <Icon size={14} />
                    </div>
                  ),
                )}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  About Us
                </li>
                <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  Contact Support
                </li>
                <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  Privacy Policy
                </li>
                <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  Terms & Conditions
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Our Services</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  Airport Rentals
                </li>
                <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  Luxury Cars
                </li>
                <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  Long Term Rentals
                </li>
                <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  Doorstep Delivery
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Contact Info</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-xl">📍</span>
                  <span>Kathmandu, Nepal</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-xl">📞</span>
                  <span>+977 9844177965</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-xl">✉️</span>
                  <span>support@rentride.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-xl">🕐</span>
                  <span>24/7 Customer Support</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} RentRide. All rights reserved.</p>
            <p className="mt-1 text-xs">
              Premium car rental service in Kathmandu, Nepal
            </p>
          </div>
        </div>
      </footer>

      {/* Bike Detail Modal */}
      <AnimatePresence>
        {showBikeModal && selectedBike && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100]"
          >
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setShowBikeModal(false)}
            ></div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b px-8 py-5 flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedBike.bikeName}
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium">
                        {selectedBike.bikeType}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${selectedBike.status === "Available" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
                      >
                        {selectedBike.status}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowBikeModal(false)}
                    className="p-3 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <span className="text-2xl text-gray-500">×</span>
                  </button>
                </div>
                <div className="p-8">
                  {selectedBike.photos?.length > 0 ? (
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      {selectedBike.photos.map((photo, idx) => (
                        <div
                          key={idx}
                          className={`${idx === 0 ? "col-span-2" : ""} relative rounded-2xl overflow-hidden`}
                          style={{ height: idx === 0 ? "240px" : "112px" }}
                        >
                          <img
                            src={`http://localhost:5000/uploads/bikes/${photo.filename}`}
                            alt={photo.label}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-3 left-3 bg-black/60 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm">
                            {photo.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-56 bg-gradient-to-br from-orange-50 to-pink-100 rounded-2xl flex items-center justify-center mb-8">
                      <FaMotorcycle className="text-8xl text-orange-200" />
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {[
                      { label: "Brand", value: selectedBike.brand },
                      { label: "Model", value: selectedBike.model },
                      { label: "Year", value: selectedBike.year },
                      { label: "Engine", value: selectedBike.engineCapacity },
                      { label: "Fuel", value: selectedBike.fuelType },
                      {
                        label: "Transmission",
                        value: selectedBike.transmission,
                      },
                      { label: "Mileage", value: selectedBike.mileage },
                      { label: "Contact", value: selectedBike.phoneNumber },
                    ]
                      .filter((s) => s.value)
                      .map((spec, i) => (
                        <div
                          key={i}
                          className="flex items-center p-4 bg-gray-50 rounded-xl"
                        >
                          <div className="mr-3">
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
                  {selectedBike.features?.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-3">
                        Features
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedBike.features.map((f, i) => (
                          <span
                            key={i}
                            className="px-4 py-2 bg-orange-50 text-orange-700 rounded-lg font-medium"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="sticky top-24 bg-gradient-to-b from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-lg">
                    <div className="text-center mb-5">
                      <p className="text-gray-500 mb-1">Daily Rate</p>
                      <div className="flex items-baseline justify-center">
                        <span className="text-5xl font-bold text-gray-900">
                          रु{selectedBike.ratePerDay}
                        </span>
                        <span className="text-gray-500 ml-2">/day</span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (selectedBike.status === "Available") {
                          navigate(`/bike-booking/${selectedBike._id}`);
                          setShowBikeModal(false);
                        }
                      }}
                      disabled={selectedBike.status !== "Available"}
                      className={`w-full px-8 py-4 font-bold rounded-xl transition-all duration-300 ${selectedBike.status === "Available" ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:shadow-2xl" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
                    >
                      {selectedBike.status === "Available"
                        ? "Book This Bike"
                        : `Currently ${selectedBike.status}`}
                    </motion.button>
                    <div className="mt-4 text-center">
                      <p className="text-gray-500 text-sm">
                        • Free cancellation • 24/7 support
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
          >
            <FaArrowUp />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Vehicle Details Modal */}
      <AnimatePresence>
        {showDetailsModal && selectedVehicle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100]"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowDetailsModal(false)}
            ></div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      {selectedVehicle.carName}
                    </h2>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">
                        {selectedVehicle.carType}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          selectedVehicle.status === "Available"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {selectedVehicle.status}
                      </span>
                      <span className="text-gray-500">
                        {selectedVehicle.carNumber}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="p-3 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <span className="text-2xl text-gray-500">×</span>
                  </button>
                </div>
                <div className="p-8">
                  {/* Gallery */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                    {selectedVehicle.photos &&
                    selectedVehicle.photos.length > 0 ? (
                      selectedVehicle.photos.map((photo, index) => (
                        <div
                          key={index}
                          className={`${index === 0 ? "lg:col-span-2" : ""}`}
                        >
                          <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden">
                            <img
                              src={`http://localhost:5000/uploads/${selectedVehicle.source === "user" ? "user-vehicles" : "vehicles"}/${photo.filename}`}
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
                            icon: FaUserTie,
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
                              <spec.icon className="text-purple-600" />
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
                              Features & Amenities
                            </h3>
                            <div className="flex flex-wrap gap-3">
                              {selectedVehicle.features.map(
                                (feature, index) => (
                                  <span
                                    key={index}
                                    className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg font-medium"
                                  >
                                    {feature}
                                  </span>
                                ),
                              )}
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
                              रु{selectedVehicle.ratePerDay}
                            </span>
                            <span className="text-gray-500 ml-2">/day</span>
                          </div>
                        </div>

                        <div className="mb-6 p-4 bg-purple-50 border border-purple-100 rounded-lg">
                          <div className="flex items-start">
                            <FaInfoCircle className="text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="font-semibold text-purple-800 mb-1">
                                Complete Price Breakdown
                              </h4>
                              <p className="text-sm text-purple-700">
                                Full price calculation including optional extras
                                will be shown during booking.
                              </p>
                            </div>
                          </div>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            handleBookNow(selectedVehicle);
                            setShowDetailsModal(false);
                          }}
                          className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-green-500/30 transition-all duration-300"
                        >
                          Book This Vehicle
                        </motion.button>

                        <div className="mt-6 text-center">
                          <p className="text-gray-500 text-sm">
                            • Free cancellation • 24/7 support • Instant
                            confirmation
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
