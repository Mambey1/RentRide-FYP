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
// // } from "react-icons/fa";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";

// // /* ✅ Image imports (based on src/assets/Dashboard/) */
// // import heroVideo from "../../assets/Dashboard/INtro.mp4";
// // import sedan from "../../assets/Dashboard/sedan.jpg";
// // import suv from "../../assets/Dashboard/suv.jpg";
// // import ev from "../../assets/Dashboard/ev.jpg";
// // import convertible from "../../assets/Dashboard/convertible.jpg";
// // import minivan from "../../assets/Dashboard/minivan.jpg";
// // import sport from "../../assets/Dashboard/sport.jpg";

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

// //   // Fetch vehicles from backend
// //   useEffect(() => {
// //     fetchVehicles();
// //   }, []);

// //   const fetchVehicles = async () => {
// //     try {
// //       setLoading(true);
// //       setError("");

// //       const response = await axios.get("http://localhost:5000/api/vehicles", {
// //         timeout: 10000,
// //       });

// //       console.log("✅ Vehicles fetched:", response.data);
// //       setVehicles(response.data);
// //       setFilteredVehicles(response.data);
// //       setLoading(false);
// //     } catch (error) {
// //       console.error("❌ Error fetching vehicles:", error);
// //       setError("Failed to load vehicles. Please try again.");
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
// //     if (vehicle.photos && vehicle.photos.length > 0) {
// //       const extraView = vehicle.photos.find(
// //         (photo) => photo.label === "Extra View",
// //       );
// //       const photo = extraView || vehicle.photos[0];
// //       return `http://localhost:5000/uploads/vehicles/${photo.filename}`;
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
// //           <div className="flex items-center gap-2">
// //             <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg">
// //               <FaCar className="text-white text-2xl" />
// //             </div>
// //             <h1 className="text-2xl font-bold">
// //               Rent<span className="text-blue-600">Ride</span>
// //             </h1>
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
// //               <span className="text-gray-700 group-hover:text-blue-600 transition-all duration-300 cursor-pointer">
// //                 Home
// //               </span>
// //               <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
// //             </li>
// //             <li className="relative group">
// //               <span className="text-gray-700 group-hover:text-blue-600 transition-all duration-300 cursor-pointer">
// //                 Vehicles
// //               </span>
// //               <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
// //             </li>
// //             <li className="relative group">
// //               <span className="text-gray-700 group-hover:text-blue-600 transition-all duration-300 cursor-pointer">
// //                 About
// //               </span>
// //               <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
// //             </li>
// //           </ul>

// //           <div className="flex items-center gap-4">
// //             <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
// //               <FaHeart className="text-gray-600 hover:text-red-500 transition-colors" />
// //             </button>
// //             <Link
// //               to="/signup"
// //               className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 transition-all duration-300 text-white px-7 py-3.5 rounded-full text-sm font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
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
// //       <section className="max-w-7xl mx-auto px-6 py-16">
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
// //           </div>
// //         </div>
// //       </section>

// //       {/* Vehicle Filter Section */}
// //       <section className="max-w-7xl mx-auto px-6 py-10">
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

// //         {/* Vehicles Grid with Home Page Card Design */}
// //         <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
// //           {filteredVehicles.map((vehicle) => (
// //             <div
// //               key={vehicle._id}
// //               className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 cursor-pointer"
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
// //                       <p className="font-medium text-gray-800">{vehicle.gearType}</p>
// //                     </div>
// //                   </div>
// //                   <div className="flex items-center gap-2">
// //                     <div className="p-2 bg-gray-50 rounded-lg">
// //                       <FaChair className="text-gray-600" />
// //                     </div>
// //                     <div>
// //                       <p className="text-xs text-gray-500">Seats</p>
// //                       <p className="font-medium text-gray-800">{vehicle.seats}</p>
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
// //           {/* Backdrop */}
// //           <div
// //             className="absolute inset-0 bg-black/60 backdrop-blur-sm"
// //             onClick={() => setShowDetailsModal(false)}
// //           ></div>

// //           {/* Modal */}
// //           <div className="absolute inset-0 flex items-center justify-center p-4">
// //             <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
// //               {/* Header */}
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

// //               {/* Content */}
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
// //                             src={`http://localhost:5000/uploads/vehicles/${photo.filename}`}
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

// //                       {/* Info Box */}
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
// //                           • Free cancellation • 24/7 support • Instant confirmation
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

// //       {/* Keep all other sections (Key Features, Advantages, How it Works, Testimonials, FAQ, CTA, Footer) exactly as they were */}
// //       {/* ... */}

// //       {/* Enhanced Key Features */}
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

// //       {/* Enhanced Advantages */}
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

// //       {/* Enhanced How it Works */}
// //       <section className="max-w-7xl mx-auto px-6 py-20 bg-gradient-to-br from-white to-blue-50 rounded-3xl my-16 shadow-3xl relative overflow-hidden">
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
// //             title="Select Dates"
// //             desc="Pick your rental dates and delivery location"
// //             icon={<FaClock />}
// //           />
// //           <Step
// //             number="03"
// //             title="Pick Up & Drive"
// //             desc="Collect your car and enjoy the journey"
// //             icon={<FaMapMarkerAlt />}
// //           />
// //         </div>
// //       </section>

// //       {/* Enhanced Testimonials */}
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
// //             name="Bijay Dai"
// //             role="Business Traveler"
// //             text="RentRide made renting a car incredibly easy and stress-free. The vehicle was spotless and perfectly maintained."
// //             rating={5}
// //             avatarColor="bg-blue-100"
// //             textColor="text-blue-600"
// //           />
// //           <Testimonial
// //             name="Yogesh Bikram Shah"
// //             role="Family Vacationer"
// //             text="Wide selection of vehicles and competitive pricing. Our family trip was comfortable thanks to their excellent service."
// //             rating={4}
// //             avatarColor="bg-green-100"
// //             textColor="text-green-600"
// //           />
// //           <Testimonial
// //             name="Aashriti Karki"
// //             role="Adventure Seeker"
// //             text="Support team was very helpful and responsive. The 4x4 I rented handled mountain roads perfectly!"
// //             rating={5}
// //             avatarColor="bg-purple-100"
// //             textColor="text-purple-600"
// //           />
// //         </div>
// //       </section>

// //       {/* Enhanced FAQ */}
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
// //             a="Simply choose a vehicle, select your dates, add any extras, and confirm booking with secure payment."
// //           />
// //           <Faq
// //             q="What is included in the insurance?"
// //             a="Comprehensive insurance covering collision damage, theft, and third-party liability is included in all rentals."
// //           />
// //           <Faq
// //             q="What payment methods are accepted?"
// //             a="We accept all major credit cards, debit cards, digital wallets, and bank transfers."
// //           />
// //           <Faq
// //             q="How does the delivery service work?"
// //             a="Your car is delivered to your chosen location at the scheduled time."
// //           />
// //           <Faq
// //             q="Can I extend my rental period?"
// //             a="Yes, extensions can be requested via your dashboard or by contacting our support team 24/7."
// //           />
// //         </div>
// //       </section>

// //       {/* Enhanced CTA Section */}
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
// //               <button className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-12 rounded-xl transition-all duration-300 hover:-translate-y-1 shadow-2xl hover:shadow-3xl flex items-center justify-center gap-3 group">
// //                 <FaCar className="group-hover:scale-110 transition-transform" />
// //                 Book Your Ride Now
// //               </button>
// //               <button className="bg-transparent border-2 border-white hover:bg-white/20 font-bold py-4 px-12 rounded-xl transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm">
// //                 Contact Our Team
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Enhanced Footer */}
// //       <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16">
// //         <div className="max-w-7xl mx-auto px-6">
// //           <div className="grid md:grid-cols-4 gap-12 mb-12">
// //             <div>
// //               <div className="flex items-center gap-3 mb-8">
// //                 <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-lg">
// //                   <FaCar className="text-white text-2xl" />
// //                 </div>
// //                 <h1 className="text-2xl font-bold">
// //                   Rent<span className="text-blue-400">Ride</span>
// //                 </h1>
// //               </div>
// //               <p className="text-gray-400 text-sm leading-relaxed mb-6">
// //                 Premium car rental service offering the best rates and
// //                 exceptional customer experience since 2015.
// //               </p>
// //             </div>
// //             <div>
// //               <h4 className="font-bold text-lg mb-8 relative inline-block">
// //                 Quick Links
// //                 <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></span>
// //               </h4>
// //               <ul className="space-y-4 text-gray-400 text-sm">
// //                 <li className="hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-2 flex items-center gap-2">
// //                   <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
// //                   Home
// //                 </li>
// //                 <li className="hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-2 flex items-center gap-2">
// //                   <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
// //                   Vehicles
// //                 </li>
// //                 <li className="hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-2 flex items-center gap-2">
// //                   <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
// //                   About Us
// //                 </li>
// //                 <li className="hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-2 flex items-center gap-2">
// //                   <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
// //                   Contact
// //                 </li>
// //               </ul>
// //             </div>
// //             <div>
// //               <h4 className="font-bold text-lg mb-8 relative inline-block">
// //                 Services
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
// //                   24/7 Support
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
// //                     ✉️
// //                   </div>
// //                   <span>support@rentride.com</span>
// //                 </li>
// //                 <li className="flex items-start gap-3">
// //                   <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
// //                     📞
// //                   </div>
// //                   <span>+1 (555) 123-4567</span>
// //                 </li>
// //                 <li className="flex items-start gap-3">
// //                   <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
// //                     📍
// //                   </div>
// //                   <span>123 Street, City, Country</span>
// //                 </li>
// //               </ul>
// //             </div>
// //           </div>

// //           <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
// //             <p className="mb-4">© 2024 RentRide. All rights reserved.</p>
// //             <div className="flex flex-wrap justify-center gap-8 mt-4">
// //               <span className="hover:text-white transition-colors cursor-pointer hover:scale-105 inline-block">
// //                 Privacy Policy
// //               </span>
// //               <span className="hover:text-white transition-colors cursor-pointer hover:scale-105 inline-block">
// //                 Terms of Service
// //               </span>
// //             </div>
// //           </div>
// //         </div>
// //       </footer>
// //     </div>
// //   );
// // }

// // /* ---------- Other Components (Feature, Advantage, Step, Testimonial, Faq) ---------- */
// // function Feature({ icon, title, desc, gradient = "from-blue-500 to-blue-600" }) {
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

// // function Testimonial({ name, role, text, rating, avatarColor = "bg-blue-100", textColor = "text-blue-600" }) {
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
// } from "react-icons/fa";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// /* ✅ Image imports (based on src/assets/Dashboard/) */
// import heroVideo from "../../assets/Dashboard/INtro.mp4";
// import sedan from "../../assets/Dashboard/sedan.jpg";
// import suv from "../../assets/Dashboard/suv.jpg";
// import ev from "../../assets/Dashboard/ev.jpg";
// import convertible from "../../assets/Dashboard/convertible.jpg";
// import minivan from "../../assets/Dashboard/minivan.jpg";
// import sport from "../../assets/Dashboard/sport.jpg";

// const API_URL = "http://localhost:5000/api";

// const axiosInstance = axios.create({
//   baseURL: API_URL,
//   timeout: 10000,
// });

// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

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
//   const [userProfile, setUserProfile] = useState(null);
//   const [userLoading, setUserLoading] = useState(true);
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

//   // Fetch user profile
//   const fetchUserProfile = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setUserLoading(false);
//         return;
//       }
//       const response = await axiosInstance.get("/profile");
//       if (response.data.success) setUserProfile(response.data.user);
//     } catch (error) {
//       console.error("Error fetching profile:", error);
//     } finally {
//       setUserLoading(false);
//     }
//   };

//   const getProfilePhotoUrl = () =>
//     userProfile?.profilePhoto
//       ? `http://localhost:5000/uploads/profiles/${userProfile.profilePhoto}`
//       : null;
//   const getUserInitial = () =>
//     userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : "U";

//   // Fetch vehicles from backend
//   useEffect(() => {
//     fetchVehicles();
//     fetchUserProfile();
//   }, []);

//   const fetchVehicles = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       // Fetch admin vehicles
//       const adminResponse = await axios.get(
//         "http://localhost:5000/api/vehicles",
//         {
//           timeout: 10000,
//         },
//       );

//       // Get token for authenticated requests
//       const token = localStorage.getItem("token");

//       // Fetch user vehicles from public endpoint WITH token if available
//       let userVehicles = [];
//       try {
//         const headers = token ? { Authorization: `Bearer ${token}` } : {};
//         const userResponse = await axios.get(
//           "http://localhost:5000/api/user-vehicles/public/active",
//           {
//             timeout: 10000,
//             headers: headers,
//           },
//         );
//         if (userResponse.data.success) userVehicles = userResponse.data.data;
//       } catch (userError) {
//         console.log("Could not fetch user vehicles:", userError.message);
//       }

//       // Get current user ID from token (if logged in) - for frontend filtering as backup
//       let currentUserId = null;
//       if (token) {
//         try {
//           const tokenParts = token.split(".");
//           if (tokenParts.length === 3) {
//             const payload = JSON.parse(atob(tokenParts[1]));
//             currentUserId = payload.id || payload.userId;
//             console.log("Current user ID from token:", currentUserId);
//           }
//         } catch (decodeError) {
//           console.error("Error decoding token:", decodeError);
//         }
//       }

//       // Frontend filtering as backup (backend should already filter, but double-check)
//       const filteredUserVehicles = userVehicles.filter((vehicle) => {
//         if (!currentUserId) return true;
//         const vehicleOwnerId = vehicle.userId || vehicle.owner || vehicle.user;
//         const ownerIdStr = vehicleOwnerId?.toString();
//         const currentUserIdStr = currentUserId?.toString();
//         const isNotOwnVehicle = ownerIdStr !== currentUserIdStr;
//         if (!isNotOwnVehicle) {
//           console.log(`🚫 Filtering out own vehicle: ${vehicle.carName}`);
//         }
//         return isNotOwnVehicle;
//       });

//       console.log(
//         `✅ Showing ${filteredUserVehicles.length} out of ${userVehicles.length} user vehicles`,
//       );

//       // Combine admin and user vehicles
//       let allVehicles = [];

//       // Add admin vehicles
//       if (adminResponse.data && Array.isArray(adminResponse.data)) {
//         allVehicles = [...adminResponse.data];
//       } else if (
//         adminResponse.data?.data &&
//         Array.isArray(adminResponse.data.data)
//       ) {
//         allVehicles = [...adminResponse.data.data];
//       }

//       // Add filtered user vehicles (excluding own)
//       filteredUserVehicles.forEach((userVehicle) =>
//         allVehicles.push({ ...userVehicle, source: "user" }),
//       );

//       console.log(`📊 Total vehicles to display: ${allVehicles.length}`);
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

//   // Filter vehicles based on active filter and search
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

//   // Get vehicle image URL
//   const getVehicleImage = (vehicle) => {
//     if (vehicle.photos?.length > 0) {
//       const extraView = vehicle.photos.find(
//         (photo) => photo.label === "Extra View",
//       );
//       const photo = extraView || vehicle.photos[0];
//       const folder = vehicle.source === "user" ? "user-vehicles" : "vehicles";
//       return `http://localhost:5000/uploads/${folder}/${photo.filename}`;
//     }

//     // Fallback based on car type
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

//   // Handle View Details click
//   const handleViewDetails = (vehicle) => {
//     setSelectedVehicle(vehicle);
//     setShowDetailsModal(true);
//   };

//   // Handle Book Now click
//   const handleBookNow = (vehicle) => {
//     navigate(`/booking/${vehicle._id}`);
//   };

//   // Format price with रु symbol
//   const formatPrice = (price) => {
//     return `रु ${price}`;
//   };

//   // Get rating based on vehicle properties
//   const getRating = (vehicle) => {
//     let baseRating = 4.0;
//     if (vehicle.airCondition === "Yes") baseRating += 0.3;
//     if (vehicle.gearType === "Automatic") baseRating += 0.2;
//     if (vehicle.seats >= 7) baseRating += 0.2;
//     if (vehicle.carType === "SUV" || vehicle.carType === "Convertible")
//       baseRating += 0.3;
//     return Math.min(5.0, baseRating).toFixed(1);
//   };

//   // Get review count
//   const getReviewCount = (vehicle) => {
//     const baseCounts = {
//       SUV: 1200,
//       Sedan: 1000,
//       Hatchback: 800,
//       MPV: 600,
//       Coupe: 400,
//       Convertible: 300,
//       Pickup: 200,
//       Minivan: 500,
//       Electric: 350,
//     };
//     return baseCounts[vehicle.carType] || 500;
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600 text-lg">Loading vehicles...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-red-500 text-5xl mb-4">⚠️</div>
//           <h3 className="text-xl font-semibold mb-2">Something went wrong</h3>
//           <p className="text-gray-600 mb-6 max-w-md mx-auto">{error}</p>
//           <button
//             onClick={fetchVehicles}
//             className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="font-sans text-gray-900 bg-gradient-to-br from-gray-50 to-blue-50">
//       {/* Navbar */}
//       <nav className="w-full bg-white/90 backdrop-blur-md shadow-2xl sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
//           <div className="flex items-center gap-2">
//             <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg">
//               <FaCar className="text-white text-2xl" />
//             </div>
//             <h1 className="text-2xl font-bold">
//               Rent<span className="text-blue-600">Ride</span>
//             </h1>
//           </div>

//           {/* Search Bar */}
//           <div className="hidden md:block flex-1 max-w-md mx-8">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                 <FaSearch className="text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search vehicles..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-12 pr-4 py-2.5 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-300"
//               />
//             </div>
//           </div>

//           <ul className="hidden lg:flex items-center gap-10 text-sm font-medium">
//             <li className="relative group">
//               <span className="text-gray-700 group-hover:text-blue-600 transition-all duration-300 cursor-pointer">
//                 Home
//               </span>
//               <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
//             </li>
//             <li className="relative group">
//               <span className="text-gray-700 group-hover:text-blue-600 transition-all duration-300 cursor-pointer">
//                 Vehicles
//               </span>
//               <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
//             </li>
//             <li className="relative group">
//               <span className="text-gray-700 group-hover:text-blue-600 transition-all duration-300 cursor-pointer">
//                 About
//               </span>
//               <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
//             </li>
//           </ul>

//           <div className="flex items-center gap-4">
//             <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
//               <FaHeart className="text-gray-600 hover:text-red-500 transition-colors" />
//             </button>

//             {/* User Profile Section */}
//             {userLoading ? (
//               <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
//             ) : userProfile && getProfilePhotoUrl() ? (
//               <div
//                 onClick={() => navigate("/profiledetails")}
//                 className="cursor-pointer"
//               >
//                 <img
//                   src={getProfilePhotoUrl()}
//                   alt="Profile"
//                   className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
//                   onError={(e) => {
//                     e.target.style.display = "none";
//                     const parent = e.target.parentElement;
//                     if (parent) {
//                       const avatar = document.createElement("div");
//                       avatar.className =
//                         "w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg cursor-pointer";
//                       avatar.textContent = getUserInitial();
//                       parent.innerHTML = "";
//                       parent.appendChild(avatar);
//                     }
//                   }}
//                 />
//               </div>
//             ) : (
//               <div
//                 onClick={() => navigate("/profiledetails")}
//                 className="cursor-pointer"
//               >
//                 <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
//                   {getUserInitial()}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Mobile Search */}
//         <div className="md:hidden px-6 pb-4">
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//               <FaSearch className="text-gray-400" />
//             </div>
//             <input
//               type="text"
//               placeholder="Search vehicles..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-12 pr-4 py-3 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-300"
//             />
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="max-w-7xl mx-auto px-6 py-16">
//         <div className="grid md:grid-cols-2 gap-14 items-center bg-gradient-to-br from-white to-blue-50 rounded-3xl p-10 shadow-3xl border border-blue-100 relative overflow-hidden">
//           <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-32 translate-x-32"></div>
//           <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-full -translate-x-64 translate-y-64"></div>

//           <div className="relative z-10">
//             <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
//               <video
//                 src={heroVideo}
//                 autoPlay
//                 muted
//                 loop
//                 playsInline
//                 className="rounded-2xl w-full h-[380px] object-cover transform group-hover:scale-110 transition-transform duration-700"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
//               <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg">
//                 <p className="text-sm font-semibold text-gray-800">
//                   {vehicles.length}+ Vehicles Available
//                 </p>
//                 <p className="text-xs text-gray-600">24/7 pickup service</p>
//               </div>
//             </div>
//           </div>

//           <div className="relative z-10">
//             <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full mb-6 shadow-lg">
//               <FaBolt className="text-blue-600" />
//               <span className="text-sm font-semibold text-blue-700">
//                 Fast & Easy Booking
//               </span>
//             </div>
//             <h2 className="text-[44px] leading-tight font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               Discover Your <br />
//               <span className="relative">
//                 Perfect Ride
//                 <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600"></span>
//               </span>
//             </h2>
//             <p className="mt-5 text-gray-600 max-w-md text-lg leading-relaxed">
//               Experience effortless booking and premium rentals with RentRide.
//               Your journey begins with a click.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Vehicle Filter Section */}
//       <section className="max-w-7xl mx-auto px-6 py-10">
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-bold mb-4">Browse Our Fleet</h2>
//           <p className="text-gray-600 mb-8">
//             Choose from our wide range of vehicles
//           </p>

//           {/* Filter Buttons */}
//           <div className="flex flex-wrap justify-center gap-4 mb-12">
//             {filters.map((filter) => (
//               <button
//                 key={filter}
//                 onClick={() => setActiveFilter(filter)}
//                 className={`px-5 py-2.5 rounded-full transition-all duration-300 ${
//                   activeFilter === filter
//                     ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25"
//                     : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
//                 }`}
//               >
//                 {filter} {filter === "All vehicles" && `(${vehicles.length})`}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Vehicles Grid */}
//         <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//           {filteredVehicles.map((vehicle) => (
//             <div
//               key={vehicle._id}
//               className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 cursor-pointer"
//               onClick={() => handleViewDetails(vehicle)}
//             >
//               {/* Wishlist Button */}
//               <button
//                 onClick={(e) => toggleFavorite(vehicle._id, e)}
//                 className="absolute top-4 right-4 z-10 p-2.5 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 transition-transform duration-300"
//               >
//                 <FaHeart
//                   className={`text-lg ${favorites.has(vehicle._id) ? "text-red-500 fill-red-500" : "text-gray-400"}`}
//                 />
//               </button>

//               {/* Status Badge */}
//               <div className="absolute top-4 left-4 z-10">
//                 <span
//                   className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
//                     vehicle.status === "Available"
//                       ? "bg-green-500/90 text-white"
//                       : "bg-red-500/90 text-white"
//                   }`}
//                 >
//                   {vehicle.status}
//                 </span>
//               </div>

//               {/* Car Image */}
//               <div className="h-56 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
//                 <img
//                   src={getVehicleImage(vehicle)}
//                   alt={vehicle.carName}
//                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                   onError={(e) => {
//                     e.target.src = sedan;
//                   }}
//                 />
//               </div>

//               {/* Car Details */}
//               <div className="p-6">
//                 <div className="flex justify-between items-start mb-4">
//                   <div className="flex-1">
//                     <div className="flex items-center gap-2 mb-1">
//                       <h3 className="text-xl font-bold text-gray-800 truncate">
//                         {vehicle.carName}
//                       </h3>
//                       <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
//                         {vehicle.carType}
//                       </span>
//                     </div>
//                     <div className="flex items-center text-gray-500 text-sm mb-3">
//                       <FaMapMarkerAlt className="mr-1.5" />
//                       <span>Kathmandu, Nepal</span>
//                     </div>
//                     <div className="flex items-center gap-1 mb-4">
//                       {[...Array(5)].map((_, i) => (
//                         <FaStar
//                           key={i}
//                           className={`text-sm ${
//                             i < Math.floor(getRating(vehicle))
//                               ? "text-yellow-400 fill-yellow-400"
//                               : "text-gray-300"
//                           }`}
//                         />
//                       ))}
//                       <span className="text-gray-500 text-sm ml-2">
//                         {getRating(vehicle)} ({getReviewCount(vehicle)})
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Specifications */}
//                 <div className="grid grid-cols-2 gap-3 mb-6">
//                   <div className="flex items-center gap-2">
//                     <div className="p-2 bg-gray-50 rounded-lg">
//                       <FaCogs className="text-gray-600" />
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500">Transmission</p>
//                       <p className="font-medium text-gray-800">
//                         {vehicle.gearType}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <div className="p-2 bg-gray-50 rounded-lg">
//                       <FaChair className="text-gray-600" />
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500">Seats</p>
//                       <p className="font-medium text-gray-800">
//                         {vehicle.seats}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Price and Action */}
//                 <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                   <div>
//                     <p className="text-xs text-gray-500">Daily rate</p>
//                     <div className="flex items-baseline">
//                       <span className="text-2xl font-bold text-gray-800">
//                         {formatPrice(vehicle.ratePerDay)}
//                       </span>
//                       <span className="text-gray-500 text-sm ml-1">/day</span>
//                     </div>
//                   </div>
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleViewDetails(vehicle);
//                     }}
//                     className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
//                   >
//                     View Details
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {filteredVehicles.length === 0 && (
//           <div className="text-center py-12">
//             <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <FaCar className="text-gray-400 text-2xl" />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-700 mb-2">
//               No vehicles found
//             </h3>
//             <p className="text-gray-500">
//               {searchQuery
//                 ? `No results for "${searchQuery}"`
//                 : "Try selecting a different category"}
//             </p>
//           </div>
//         )}
//       </section>

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

//                 {/* Main Details */}
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
//                             <spec.icon className="text-blue-600" />
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

//                     {/* Features */}
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
//                                 className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium"
//                               >
//                                 {feature}
//                               </span>
//                             ))}
//                           </div>
//                         </div>
//                       )}

//                     {/* Description */}
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

//                       <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
//                         <div className="flex items-start">
//                           <FaInfoCircle className="text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
//                           <div>
//                             <h4 className="font-semibold text-blue-800 mb-1">
//                               Complete Price Breakdown
//                             </h4>
//                             <p className="text-sm text-blue-700">
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

//       {/* Enhanced Key Features */}
//       <section className="max-w-7xl mx-auto px-6 py-10">
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center gap-3 mb-4">
//             <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
//             <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
//               Why Choose Us
//             </h3>
//             <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
//           </div>
//           <h2 className="text-4xl font-bold mt-2">Key Features</h2>
//           <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
//             Experience premium car rental service with our standout features
//           </p>
//         </div>
//         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           <Feature
//             icon={<FaClock className="text-2xl" />}
//             title="Instant Availability"
//             desc="Real-time booking with instant confirmation"
//             gradient="from-blue-500 to-blue-600"
//           />
//           <Feature
//             icon={<FaCar className="text-2xl" />}
//             title="Comfortable Rides"
//             desc="Premium vehicles with latest amenities"
//             gradient="from-purple-500 to-purple-600"
//           />
//           <Feature
//             icon={<FaDollarSign className="text-2xl" />}
//             title="Best Pricing"
//             desc="Competitive rates with no hidden charges"
//             gradient="from-green-500 to-green-600"
//           />
//           <Feature
//             icon={<FaShieldAlt className="text-2xl" />}
//             title="No Hidden Fees"
//             desc="Transparent pricing, all fees included"
//             gradient="from-orange-500 to-orange-600"
//           />
//         </div>
//       </section>

//       {/* Enhanced Advantages */}
//       <section className="max-w-7xl mx-auto px-6 py-16">
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center gap-3 mb-4">
//             <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
//             <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
//               Our Benefits
//             </h3>
//             <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
//           </div>
//           <h2 className="text-4xl font-bold mt-2">RentRide Advantages</h2>
//           <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
//             Discover why thousands choose RentRide
//           </p>
//         </div>
//         <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
//           <Advantage
//             icon={<FaDollarSign className="text-2xl" />}
//             title="Best price guarantee"
//             desc="We guarantee the best prices in the market"
//             color="green"
//             stat={`${vehicles.length}+ Vehicles`}
//           />
//           <Advantage
//             icon={<FaUserTie className="text-2xl" />}
//             title="Professional drivers"
//             desc="Highly trained and certified drivers"
//             color="blue"
//             stat="500+ Drivers"
//           />
//           <Advantage
//             icon={<FaTruck className="text-2xl" />}
//             title="Doorstep delivery"
//             desc="Get your car delivered to your location"
//             color="purple"
//             stat="24/7 Delivery"
//           />
//           <Advantage
//             icon={<FaHeadset className="text-2xl" />}
//             title="24/7 support"
//             desc="Round-the-clock customer support"
//             color="orange"
//             stat="Instant Response"
//           />
//           <Advantage
//             icon={<FaCar className="text-2xl" />}
//             title="Wide vehicle range"
//             desc="Choose from economy to luxury"
//             color="red"
//             stat={`${vehicles.length} Models`}
//           />
//         </div>
//       </section>

//       {/* Enhanced How it Works */}
//       <section className="max-w-7xl mx-auto px-6 py-20 bg-gradient-to-br from-white to-blue-50 rounded-3xl my-16 shadow-3xl relative overflow-hidden">
//         <div className="text-center mb-16 relative z-10">
//           <div className="inline-flex items-center gap-3 mb-4">
//             <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
//             <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
//               Process
//             </h3>
//             <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
//           </div>
//           <h2 className="text-4xl font-bold mt-2">How It Works</h2>
//           <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
//             Simple steps to get your perfect ride
//           </p>
//         </div>
//         <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto relative z-10">
//           <Step
//             number="01"
//             title="Choose Vehicle"
//             desc="Browse our fleet and select your preferred vehicle"
//             icon={<FaCar />}
//           />
//           <Step
//             number="02"
//             title="Select Dates"
//             desc="Pick your rental dates and delivery location"
//             icon={<FaClock />}
//           />
//           <Step
//             number="03"
//             title="Pick Up & Drive"
//             desc="Collect your car and enjoy the journey"
//             icon={<FaMapMarkerAlt />}
//           />
//         </div>
//       </section>

//       {/* Enhanced Testimonials */}
//       <section className="max-w-7xl mx-auto px-6 py-16">
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center gap-3 mb-4">
//             <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
//             <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
//               Testimonials
//             </h3>
//             <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
//           </div>
//           <h2 className="text-4xl font-bold mt-2">What Our Customers Say</h2>
//           <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
//             Join thousands of satisfied customers who trust RentRide
//           </p>
//         </div>
//         <div className="grid md:grid-cols-3 gap-8">
//           <Testimonial
//             name="Bijay Dai"
//             role="Business Traveler"
//             text="RentRide made renting a car incredibly easy and stress-free. The vehicle was spotless and perfectly maintained."
//             rating={5}
//             avatarColor="bg-blue-100"
//             textColor="text-blue-600"
//           />
//           <Testimonial
//             name="Yogesh Bikram Shah"
//             role="Family Vacationer"
//             text="Wide selection of vehicles and competitive pricing. Our family trip was comfortable thanks to their excellent service."
//             rating={4}
//             avatarColor="bg-green-100"
//             textColor="text-green-600"
//           />
//           <Testimonial
//             name="Aashriti Karki"
//             role="Adventure Seeker"
//             text="Support team was very helpful and responsive. The 4x4 I rented handled mountain roads perfectly!"
//             rating={5}
//             avatarColor="bg-purple-100"
//             textColor="text-purple-600"
//           />
//         </div>
//       </section>

//       {/* Enhanced FAQ */}
//       <section className="max-w-7xl mx-auto px-6 py-16">
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center gap-3 mb-4">
//             <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
//             <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
//               FAQ
//             </h3>
//             <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
//           </div>
//           <h2 className="text-4xl font-bold mt-2">
//             Frequently Asked Questions
//           </h2>
//           <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
//             Get answers to common questions
//           </p>
//         </div>
//         <div className="space-y-4 max-w-3xl mx-auto">
//           <Faq
//             q="How do I book a car?"
//             a="Simply choose a vehicle, select your dates, add any extras, and confirm booking with secure payment."
//           />
//           <Faq
//             q="What is included in the insurance?"
//             a="Comprehensive insurance covering collision damage, theft, and third-party liability is included in all rentals."
//           />
//           <Faq
//             q="What payment methods are accepted?"
//             a="We accept all major credit cards, debit cards, digital wallets, and bank transfers."
//           />
//           <Faq
//             q="How does the delivery service work?"
//             a="Your car is delivered to your chosen location at the scheduled time."
//           />
//           <Faq
//             q="Can I extend my rental period?"
//             a="Yes, extensions can be requested via your dashboard or by contacting our support team 24/7."
//           />
//         </div>
//       </section>

//       {/* Enhanced CTA Section */}
//       <section className="max-w-7xl mx-auto px-6 py-20">
//         <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-3xl p-12 text-center text-white shadow-3xl relative overflow-hidden">
//           <div className="relative z-10">
//             <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full mb-8">
//               <FaCrown className="text-yellow-300" />
//               <span className="font-semibold">Premium Service Guaranteed</span>
//             </div>
//             <h2 className="text-4xl font-bold mb-6">Ready to Hit the Road?</h2>
//             <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
//               Join thousands of satisfied customers and experience premium car
//               rental service like never before
//             </p>
//             <div className="flex flex-col sm:flex-row gap-6 justify-center">
//               <button className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-12 rounded-xl transition-all duration-300 hover:-translate-y-1 shadow-2xl hover:shadow-3xl flex items-center justify-center gap-3 group">
//                 <FaCar className="group-hover:scale-110 transition-transform" />
//                 Book Your Ride Now
//               </button>
//               <button className="bg-transparent border-2 border-white hover:bg-white/20 font-bold py-4 px-12 rounded-xl transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm">
//                 Contact Our Team
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Enhanced Footer */}
//       <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="grid md:grid-cols-4 gap-12 mb-12">
//             <div>
//               <div className="flex items-center gap-3 mb-8">
//                 <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-lg">
//                   <FaCar className="text-white text-2xl" />
//                 </div>
//                 <h1 className="text-2xl font-bold">
//                   Rent<span className="text-blue-400">Ride</span>
//                 </h1>
//               </div>
//               <p className="text-gray-400 text-sm leading-relaxed mb-6">
//                 Premium car rental service offering the best rates and
//                 exceptional customer experience since 2015.
//               </p>
//             </div>
//             <div>
//               <h4 className="font-bold text-lg mb-8 relative inline-block">
//                 Quick Links
//                 <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></span>
//               </h4>
//               <ul className="space-y-4 text-gray-400 text-sm">
//                 <li className="hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-2 flex items-center gap-2">
//                   <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
//                   Home
//                 </li>
//                 <li className="hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-2 flex items-center gap-2">
//                   <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
//                   Vehicles
//                 </li>
//                 <li className="hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-2 flex items-center gap-2">
//                   <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
//                   About Us
//                 </li>
//                 <li className="hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-2 flex items-center gap-2">
//                   <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
//                   Contact
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-bold text-lg mb-8 relative inline-block">
//                 Services
//                 <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></span>
//               </h4>
//               <ul className="space-y-4 text-gray-400 text-sm">
//                 <li className="hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-2 flex items-center gap-2">
//                   <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
//                   Airport Rentals
//                 </li>
//                 <li className="hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-2 flex items-center gap-2">
//                   <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
//                   Luxury Cars
//                 </li>
//                 <li className="hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-2 flex items-center gap-2">
//                   <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
//                   Long Term Rentals
//                 </li>
//                 <li className="hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-2 flex items-center gap-2">
//                   <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
//                   24/7 Support
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-bold text-lg mb-8 relative inline-block">
//                 Contact Info
//                 <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></span>
//               </h4>
//               <ul className="space-y-4 text-gray-400 text-sm">
//                 <li className="flex items-start gap-3">
//                   <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
//                     ✉️
//                   </div>
//                   <span>support@rentride.com</span>
//                 </li>
//                 <li className="flex items-start gap-3">
//                   <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
//                     📞
//                   </div>
//                   <span>+1 (555) 123-4567</span>
//                 </li>
//                 <li className="flex items-start gap-3">
//                   <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
//                     📍
//                   </div>
//                   <span>123 Street, City, Country</span>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
//             <p className="mb-4">© 2024 RentRide. All rights reserved.</p>
//             <div className="flex flex-wrap justify-center gap-8 mt-4">
//               <span className="hover:text-white transition-colors cursor-pointer hover:scale-105 inline-block">
//                 Privacy Policy
//               </span>
//               <span className="hover:text-white transition-colors cursor-pointer hover:scale-105 inline-block">
//                 Terms of Service
//               </span>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// /* ---------- Other Components (Feature, Advantage, Step, Testimonial, Faq) ---------- */
// function Feature({
//   icon,
//   title,
//   desc,
//   gradient = "from-blue-500 to-blue-600",
// }) {
//   return (
//     <div className="group relative">
//       <div className="absolute -inset-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 blur transition duration-500 group-hover:duration-200 rounded-2xl"></div>
//       <div className="relative bg-white rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 border border-gray-100">
//         <div
//           className={`bg-gradient-to-br ${gradient} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
//         >
//           {icon}
//         </div>
//         <h4 className="font-bold text-xl mb-3 group-hover:text-blue-600 transition-colors">
//           {title}
//         </h4>
//         <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
//         <div className="mt-6 h-1 w-12 bg-gradient-to-r from-gray-200 to-transparent group-hover:from-blue-500 transition-all duration-300"></div>
//       </div>
//     </div>
//   );
// }

// function Advantage({ icon, title, desc, color = "blue", stat }) {
//   const colorClasses = {
//     blue: "from-blue-500 to-blue-600",
//     green: "from-green-500 to-green-600",
//     purple: "from-purple-500 to-purple-600",
//     orange: "from-orange-500 to-orange-600",
//     red: "from-red-500 to-red-600",
//   };

//   return (
//     <div className="group relative">
//       <div className="absolute -inset-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 blur transition duration-500 group-hover:duration-200 rounded-2xl"></div>
//       <div className="relative bg-white rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
//         <div
//           className={`bg-gradient-to-br ${colorClasses[color]} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
//         >
//           {icon}
//         </div>
//         <h4 className="font-bold text-xl mb-3 group-hover:text-gray-800 transition-colors">
//           {title}
//         </h4>
//         <p className="text-gray-600 text-sm leading-relaxed mb-4">{desc}</p>
//         {stat && (
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gray-50 to-gray-100 text-sm font-semibold">
//             <FaCheckCircle className="text-green-500" />
//             <span>{stat}</span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// function Step({ number, title, desc, icon }) {
//   return (
//     <div className="relative z-20">
//       <div className="text-center bg-white p-10 rounded-2xl shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 group">
//         <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 relative">
//           {number}
//         </div>
//         <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center mx-auto mb-4 text-blue-600">
//           {icon}
//         </div>
//         <h4 className="font-bold text-xl mb-4 group-hover:text-blue-600 transition-colors">
//           {title}
//         </h4>
//         <p className="text-gray-600 leading-relaxed">{desc}</p>
//       </div>
//     </div>
//   );
// }

// function Testimonial({
//   name,
//   role,
//   text,
//   rating,
//   avatarColor = "bg-blue-100",
//   textColor = "text-blue-600",
// }) {
//   return (
//     <div className="group">
//       <div className="bg-white rounded-2xl p-10 shadow-2xl hover:shadow-3xl border border-gray-100 transition-all duration-500 hover:-translate-y-3">
//         <div className="flex mb-6">
//           {[...Array(5)].map((_, i) => (
//             <FaStar
//               key={i}
//               className={`text-lg ${
//                 i < rating ? "text-yellow-400" : "text-gray-300"
//               }`}
//             />
//           ))}
//         </div>
//         <p className="text-gray-700 text-lg leading-relaxed italic mb-8">
//           "{text}"
//         </p>
//         <div className="flex items-center pt-8 border-t border-gray-100">
//           <div
//             className={`w-14 h-14 rounded-full ${avatarColor} flex items-center justify-center text-2xl font-bold mr-4 shadow-lg`}
//           >
//             {name.charAt(0)}
//           </div>
//           <div>
//             <p className="font-bold text-gray-900 text-lg">{name}</p>
//             <p className="text-sm text-gray-500">{role}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Faq({ q, a }) {
//   const [open, setOpen] = useState(false);
//   return (
//     <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group">
//       <button
//         onClick={() => setOpen(!open)}
//         className="w-full flex justify-between items-center p-8 text-left hover:bg-gray-50 transition-colors duration-300"
//       >
//         <div className="flex items-start gap-4">
//           <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
//             <span className="text-blue-600 font-semibold">?</span>
//           </div>
//           <span className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
//             {q}
//           </span>
//         </div>
//         <div
//           className={`w-10 h-10 rounded-full bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center transition-all duration-300 ${
//             open ? "rotate-180 bg-blue-100" : ""
//           }`}
//         >
//           <FaChevronDown className="text-blue-600" />
//         </div>
//       </button>
//       {open && (
//         <div className="px-8 pb-8">
//           <div className="pl-12 border-l-2 border-blue-200">
//             <p className="text-gray-600 leading-relaxed">{a}</p>
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
} from "react-icons/fa";
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

  // Fetch vehicles from backend (Public Landing Page - NO AUTH)
  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      setError("");

      // Fetch admin vehicles (public)
      const adminResponse = await axios.get(
        "http://localhost:5000/api/vehicles",
        {
          timeout: 10000,
        },
      );

      // Fetch user vehicles from public endpoint (only active and listed)
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

      // Add admin vehicles
      if (adminResponse.data && Array.isArray(adminResponse.data)) {
        allVehicles = [...adminResponse.data];
      } else if (
        adminResponse.data?.data &&
        Array.isArray(adminResponse.data.data)
      ) {
        allVehicles = [...adminResponse.data.data];
      }

      // Add user vehicles
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

  // Filter vehicles based on active filter and search
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

  // Get vehicle image URL
  const getVehicleImage = (vehicle) => {
    if (vehicle.photos?.length > 0) {
      const extraView = vehicle.photos.find(
        (photo) => photo.label === "Extra View",
      );
      const photo = extraView || vehicle.photos[0];
      const folder = vehicle.source === "user" ? "user-vehicles" : "vehicles";
      return `http://localhost:5000/uploads/${folder}/${photo.filename}`;
    }

    // Fallback based on car type
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

  // Handle View Details click
  const handleViewDetails = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowDetailsModal(true);
  };

  // Handle Book Now click
  const handleBookNow = (vehicle) => {
    navigate(`/booking/${vehicle._id}`);
  };

  // Format price with रु symbol
  const formatPrice = (price) => {
    return `रु ${price}`;
  };

  // Get rating based on vehicle properties
  const getRating = (vehicle) => {
    let baseRating = 4.0;
    if (vehicle.airCondition === "Yes") baseRating += 0.3;
    if (vehicle.gearType === "Automatic") baseRating += 0.2;
    if (vehicle.seats >= 7) baseRating += 0.2;
    if (vehicle.carType === "SUV" || vehicle.carType === "Convertible")
      baseRating += 0.3;
    return Math.min(5.0, baseRating).toFixed(1);
  };

  // Get review count
  const getReviewCount = (vehicle) => {
    const baseCounts = {
      SUV: 1200,
      Sedan: 1000,
      Hatchback: 800,
      MPV: 600,
      Coupe: 400,
      Convertible: 300,
      Pickup: 200,
      Minivan: 500,
      Electric: 350,
    };
    return baseCounts[vehicle.carType] || 500;
  };

  // Scroll to section
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading vehicles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold mb-2">Something went wrong</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">{error}</p>
          <button
            onClick={fetchVehicles}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans text-gray-900 bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Navbar */}
      <nav className="w-full bg-white/90 backdrop-blur-md shadow-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
          {/* <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg">
              <FaCar className="text-white text-2xl" />
            </div>
            <h1 className="text-2xl font-bold">
              Rent<span className="text-blue-600">Ride</span>
            </h1>
          </div> */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
              <FaCar className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Rent<span className="text-gray-800">Ride</span>
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Premium Car Rentals</p>
            </div>
          </div>
          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search vehicles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-300"
              />
            </div>
          </div>

          <ul className="hidden lg:flex items-center gap-10 text-sm font-medium">
            <li className="relative group">
              <button
                onClick={() => scrollToSection("home")}
                className="text-gray-700 group-hover:text-blue-600 transition-all duration-300"
              >
                Home
              </button>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </li>
            <li className="relative group">
              <button
                onClick={() => scrollToSection("vehicles")}
                className="text-gray-700 group-hover:text-blue-600 transition-all duration-300"
              >
                Vehicles
              </button>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </li>
            <li className="relative group">
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-gray-700 group-hover:text-blue-600 transition-all duration-300"
              >
                How It Works
              </button>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </li>
            <li className="relative group">
              <button
                onClick={() => scrollToSection("contact")}
                className="text-gray-700 group-hover:text-blue-600 transition-all duration-300"
              >
                Contact
              </button>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </li>
          </ul>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="px-6 py-2.5 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-all duration-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 transition-all duration-300 text-white px-7 py-2.5 rounded-full text-sm font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-6 pb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search vehicles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-300"
            />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-14 items-center bg-gradient-to-br from-white to-blue-50 rounded-3xl p-10 shadow-3xl border border-blue-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-full -translate-x-64 translate-y-64"></div>

          <div className="relative z-10">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <video
                src={heroVideo}
                autoPlay
                muted
                loop
                playsInline
                className="rounded-2xl w-full h-[380px] object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg">
                <p className="text-sm font-semibold text-gray-800">
                  {vehicles.length}+ Vehicles Available
                </p>
                <p className="text-xs text-gray-600">24/7 pickup service</p>
              </div>
            </div>
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full mb-6 shadow-lg">
              <FaBolt className="text-blue-600" />
              <span className="text-sm font-semibold text-blue-700">
                Fast & Easy Booking
              </span>
            </div>
            <h2 className="text-[44px] leading-tight font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Discover Your <br />
              <span className="relative">
                Perfect Ride
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600"></span>
              </span>
            </h2>
            <p className="mt-5 text-gray-600 max-w-md text-lg leading-relaxed">
              Experience effortless booking and premium rentals with RentRide.
              Your journey begins with a click.
            </p>
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => scrollToSection("vehicles")}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-full hover:shadow-lg transition-all"
              >
                Explore Cars
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-all"
              >
                How It Works
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Filter Section */}
      <section id="vehicles" className="max-w-7xl mx-auto px-6 py-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Browse Our Fleet</h2>
          <p className="text-gray-600 mb-8">
            Choose from our wide range of vehicles
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 rounded-full transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
                }`}
              >
                {filter} {filter === "All vehicles" && `(${vehicles.length})`}
              </button>
            ))}
          </div>
        </div>

        {/* Vehicles Grid - Enhanced Card Design */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle._id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 cursor-pointer hover:-translate-y-2"
              onClick={() => handleViewDetails(vehicle)}
            >
              {/* Wishlist Button */}
              <button
                onClick={(e) => toggleFavorite(vehicle._id, e)}
                className="absolute top-4 right-4 z-10 p-2.5 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 transition-transform duration-300"
              >
                <FaHeart
                  className={`text-lg ${favorites.has(vehicle._id) ? "text-red-500 fill-red-500" : "text-gray-400"}`}
                />
              </button>

              {/* Status Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                    vehicle.status === "Available"
                      ? "bg-green-500/90 text-white"
                      : "bg-red-500/90 text-white"
                  }`}
                >
                  {vehicle.status}
                </span>
              </div>

              {/* Car Image */}
              <div className="h-56 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                <img
                  src={getVehicleImage(vehicle)}
                  alt={vehicle.carName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    e.target.src = sedan;
                  }}
                />
              </div>

              {/* Car Details */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-gray-800 truncate">
                        {vehicle.carName}
                      </h3>
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
                        {vehicle.carType}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <FaMapMarkerAlt className="mr-1.5" />
                      <span>Kathmandu, Nepal</span>
                    </div>
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`text-sm ${
                            i < Math.floor(getRating(vehicle))
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-gray-500 text-sm ml-2">
                        {getRating(vehicle)} ({getReviewCount(vehicle)})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Specifications */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <FaCogs className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Transmission</p>
                      <p className="font-medium text-gray-800">
                        {vehicle.gearType}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <FaChair className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Seats</p>
                      <p className="font-medium text-gray-800">
                        {vehicle.seats}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500">Daily rate</p>
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold text-gray-800">
                        {formatPrice(vehicle.ratePerDay)}
                      </span>
                      <span className="text-gray-500 text-sm ml-1">/day</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewDetails(vehicle);
                    }}
                    className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredVehicles.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCar className="text-gray-400 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No vehicles found
            </h3>
            <p className="text-gray-500">
              {searchQuery
                ? `No results for "${searchQuery}"`
                : "Try selecting a different category"}
            </p>
          </div>
        )}
      </section>

      {/* Vehicle Details Modal */}
      {showDetailsModal && selectedVehicle && (
        <div className="fixed inset-0 z-[100]">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowDetailsModal(false)}
          ></div>

          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {selectedVehicle.carName}
                  </h2>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
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

                {/* Main Details */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column - Specifications */}
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

                    {/* Features */}
                    {selectedVehicle.features &&
                      selectedVehicle.features.length > 0 && (
                        <div className="mt-10">
                          <h3 className="text-2xl font-bold text-gray-900 mb-6">
                            Features & Amenities
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

                    {/* Description */}
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

                  {/* Right Column - Pricing & Booking */}
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

                      <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                        <div className="flex items-start">
                          <FaInfoCircle className="text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-blue-800 mb-1">
                              Complete Price Breakdown
                            </h4>
                            <p className="text-sm text-blue-700">
                              Full price calculation including optional extras
                              will be shown during booking.
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
                          • Free cancellation • 24/7 support • Instant
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

      {/* Key Features */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
            <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
              Why Choose Us
            </h3>
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
          </div>
          <h2 className="text-4xl font-bold mt-2">Key Features</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
            Experience premium car rental service with our standout features
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <Feature
            icon={<FaClock className="text-2xl" />}
            title="Instant Availability"
            desc="Real-time booking with instant confirmation"
            gradient="from-blue-500 to-blue-600"
          />
          <Feature
            icon={<FaCar className="text-2xl" />}
            title="Comfortable Rides"
            desc="Premium vehicles with latest amenities"
            gradient="from-purple-500 to-purple-600"
          />
          <Feature
            icon={<FaDollarSign className="text-2xl" />}
            title="Best Pricing"
            desc="Competitive rates with no hidden charges"
            gradient="from-green-500 to-green-600"
          />
          <Feature
            icon={<FaShieldAlt className="text-2xl" />}
            title="No Hidden Fees"
            desc="Transparent pricing, all fees included"
            gradient="from-orange-500 to-orange-600"
          />
        </div>
      </section>

      {/* Advantages */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
            <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
              Our Benefits
            </h3>
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
          </div>
          <h2 className="text-4xl font-bold mt-2">RentRide Advantages</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
            Discover why thousands choose RentRide
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <Advantage
            icon={<FaDollarSign className="text-2xl" />}
            title="Best price guarantee"
            desc="We guarantee the best prices in the market"
            color="green"
            stat={`${vehicles.length}+ Vehicles`}
          />
          <Advantage
            icon={<FaUserTie className="text-2xl" />}
            title="Professional drivers"
            desc="Highly trained and certified drivers"
            color="blue"
            stat="500+ Drivers"
          />
          <Advantage
            icon={<FaTruck className="text-2xl" />}
            title="Doorstep delivery"
            desc="Get your car delivered to your location"
            color="purple"
            stat="24/7 Delivery"
          />
          <Advantage
            icon={<FaHeadset className="text-2xl" />}
            title="24/7 support"
            desc="Round-the-clock customer support"
            color="orange"
            stat="Instant Response"
          />
          <Advantage
            icon={<FaCar className="text-2xl" />}
            title="Wide vehicle range"
            desc="Choose from economy to luxury"
            color="red"
            stat={`${vehicles.length} Models`}
          />
        </div>
      </section>

      {/* How it Works */}
      <section
        id="how-it-works"
        className="max-w-7xl mx-auto px-6 py-20 bg-gradient-to-br from-white to-blue-50 rounded-3xl my-16 shadow-3xl relative overflow-hidden"
      >
        <div className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
            <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
              Process
            </h3>
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
          </div>
          <h2 className="text-4xl font-bold mt-2">How It Works</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
            Simple steps to get your perfect ride
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto relative z-10">
          <Step
            number="01"
            title="Choose Vehicle"
            desc="Browse our fleet and select your preferred vehicle"
            icon={<FaCar />}
          />
          <Step
            number="02"
            title="Book & Pay"
            desc="Select dates, add extras, and complete secure payment"
            icon={<FaCreditCard />}
          />
          <Step
            number="03"
            title="Get Your Vehicle"
            desc="Pick up from our location or get doorstep delivery"
            icon={<FaMapMarkerAlt />}
          />
        </div>
      </section>

      {/* Delivery Information */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-10">
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
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaMapMarkerAlt className="text-blue-600 text-2xl" />
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
                  <FaCheckCircle className="text-green-500 text-sm" /> Document
                  verification
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTruck className="text-purple-600 text-2xl" />
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
                  <FaCheckCircle className="text-green-500 text-sm" /> Delivery
                  within Kathmandu Valley
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500 text-sm" /> Free
                  delivery for 3+ days booking
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500 text-sm" /> Real-time
                  tracking available
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              After booking confirmation, you'll receive a call from our support
              team to confirm delivery/pickup details.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
            <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
              Testimonials
            </h3>
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
          </div>
          <h2 className="text-4xl font-bold mt-2">What Our Customers Say</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
            Join thousands of satisfied customers who trust RentRide
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <Testimonial
            name="Bijay Pandey"
            role="Business Traveler"
            text="RentRide made renting a car incredibly easy and stress-free. The vehicle was spotless and perfectly maintained."
            rating={5}
            avatarColor="bg-blue-100"
          />
          <Testimonial
            name="Yogesh Bikram Shah"
            role="Family Vacationer"
            text="Wide selection of vehicles and competitive pricing. Our family trip was comfortable thanks to their excellent service."
            rating={4}
            avatarColor="bg-green-100"
          />
          <Testimonial
            name="Aashriti Karki"
            role="Adventure Seeker"
            text="Support team was very helpful and responsive. The 4x4 I rented handled mountain roads perfectly!"
            rating={5}
            avatarColor="bg-purple-100"
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
            <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
              FAQ
            </h3>
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
          </div>
          <h2 className="text-4xl font-bold mt-2">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
            Get answers to common questions
          </p>
        </div>
        <div className="space-y-4 max-w-3xl mx-auto">
          <Faq
            q="How do I book a car?"
            a="Simply choose a vehicle, select your dates, add any extras, and confirm booking with secure payment. You'll receive instant confirmation."
          />
          <Faq
            q="What is included in the insurance?"
            a="Comprehensive insurance covering collision damage, theft, and third-party liability is included in all rentals."
          />
          <Faq
            q="What payment methods are accepted?"
            a="We accept all major credit cards, debit cards, digital wallets (Khalti, eSewa), and bank transfers."
          />
          <Faq
            q="How does delivery work after confirmation?"
            a="After booking confirmation, our support team will contact you within 2 hours to confirm delivery/pickup details. For doorstep delivery, the vehicle will be delivered to your specified location. For pickup, you can collect from our nearest branch."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-3xl p-12 text-center text-white shadow-3xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full mb-8">
              <FaCrown className="text-yellow-300" />
              <span className="font-semibold">Premium Service Guaranteed</span>
            </div>
            <h2 className="text-4xl font-bold mb-6">Ready to Hit the Road?</h2>
            <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
              Join thousands of satisfied customers and experience premium car
              rental service like never before
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/signup"
                className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-12 rounded-xl transition-all duration-300 hover:-translate-y-1 shadow-2xl hover:shadow-3xl flex items-center justify-center gap-3 group"
              >
                <FaCar className="group-hover:scale-110 transition-transform" />
                Sign Up Now
              </Link>
              <Link
                to="/login"
                className="bg-transparent border-2 border-white hover:bg-white/20 font-bold py-4 px-12 rounded-xl transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
              >
                Login to Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              {/* <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-lg">
                  <FaCar className="text-white text-2xl" />
                </div>
                <h1 className="text-2xl font-bold">
                  Rent<span className="text-blue-400">Ride</span>
                </h1>
              </div> */}

              <div className="flex items-center gap-3 mb-8">
  <div className="p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
    <FaCar className="text-white text-2xl" />
  </div>
  <div>
    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
      Rent<span className="text-white">Ride</span>
    </h1>
    <p className="text-xs text-gray-400 -mt-1">Premium Car Rentals</p>
  </div>
</div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Premium car rental service offering the best rates and
                exceptional customer experience in Nepal.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <FaFacebook />
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <FaTwitter />
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <FaInstagram />
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-8 relative inline-block">
                Quick Links
                <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></span>
              </h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li className="hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-2 flex items-center gap-2">
                  <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                  About Us
                </li>
                <li className="hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-2 flex items-center gap-2">
                  <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                  Contact Support
                </li>
                <li className="hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-2 flex items-center gap-2">
                  <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                  Privacy Policy
                </li>
                <li className="hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-2 flex items-center gap-2">
                  <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                  Terms & Conditions
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-8 relative inline-block">
                Our Services
                <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></span>
              </h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li className="hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-2 flex items-center gap-2">
                  <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                  Airport Rentals
                </li>
                <li className="hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-2 flex items-center gap-2">
                  <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                  Luxury Cars
                </li>
                <li className="hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-2 flex items-center gap-2">
                  <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                  Long Term Rentals
                </li>
                <li className="hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-2 flex items-center gap-2">
                  <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                  Doorstep Delivery
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-8 relative inline-block">
                Contact Info
                <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></span>
              </h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
                    📍
                  </div>
                  <span>Kathmandu, Nepal</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
                    📞
                  </div>
                  <span>+977 9844177965</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
                    ✉️
                  </div>
                  <span>support@rentride.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
                    🕐
                  </div>
                  <span>24/7 Customer Support</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} RentRide. All rights reserved.</p>
            <p className="mt-2 text-xs">
              Premium car rental service in Kathmandu, Nepal
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* Components */
function Feature({
  icon,
  title,
  desc,
  gradient = "from-blue-500 to-blue-600",
}) {
  return (
    <div className="group relative">
      <div className="absolute -inset-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 blur transition duration-500 group-hover:duration-200 rounded-2xl"></div>
      <div className="relative bg-white rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 border border-gray-100">
        <div
          className={`bg-gradient-to-br ${gradient} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
        >
          {icon}
        </div>
        <h4 className="font-bold text-xl mb-3 group-hover:text-blue-600 transition-colors">
          {title}
        </h4>
        <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
        <div className="mt-6 h-1 w-12 bg-gradient-to-r from-gray-200 to-transparent group-hover:from-blue-500 transition-all duration-300"></div>
      </div>
    </div>
  );
}

function Advantage({ icon, title, desc, color = "blue", stat }) {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600",
    red: "from-red-500 to-red-600",
  };

  return (
    <div className="group relative">
      <div className="absolute -inset-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 blur transition duration-500 group-hover:duration-200 rounded-2xl"></div>
      <div className="relative bg-white rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
        <div
          className={`bg-gradient-to-br ${colorClasses[color]} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
        >
          {icon}
        </div>
        <h4 className="font-bold text-xl mb-3 group-hover:text-gray-800 transition-colors">
          {title}
        </h4>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">{desc}</p>
        {stat && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gray-50 to-gray-100 text-sm font-semibold">
            <FaCheckCircle className="text-green-500" />
            <span>{stat}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function Step({ number, title, desc, icon }) {
  return (
    <div className="relative z-20">
      <div className="text-center bg-white p-10 rounded-2xl shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 group">
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 relative">
          {number}
        </div>
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center mx-auto mb-4 text-blue-600">
          {icon}
        </div>
        <h4 className="font-bold text-xl mb-4 group-hover:text-blue-600 transition-colors">
          {title}
        </h4>
        <p className="text-gray-600 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function Testimonial({
  name,
  role,
  text,
  rating,
  avatarColor = "bg-blue-100",
}) {
  return (
    <div className="group">
      <div className="bg-white rounded-2xl p-10 shadow-2xl hover:shadow-3xl border border-gray-100 transition-all duration-500 hover:-translate-y-3">
        <div className="flex mb-6">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`text-lg ${
                i < rating ? "text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <p className="text-gray-700 text-lg leading-relaxed italic mb-8">
          "{text}"
        </p>
        <div className="flex items-center pt-8 border-t border-gray-100">
          <div
            className={`w-14 h-14 rounded-full ${avatarColor} flex items-center justify-center text-2xl font-bold mr-4 shadow-lg`}
          >
            {name.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-gray-900 text-lg">{name}</p>
            <p className="text-sm text-gray-500">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Faq({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-8 text-left hover:bg-gray-50 transition-colors duration-300"
      >
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
            <span className="text-blue-600 font-semibold">?</span>
          </div>
          <span className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
            {q}
          </span>
        </div>
        <div
          className={`w-10 h-10 rounded-full bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center transition-all duration-300 ${
            open ? "rotate-180 bg-blue-100" : ""
          }`}
        >
          <FaChevronDown className="text-blue-600" />
        </div>
      </button>
      {open && (
        <div className="px-8 pb-8">
          <div className="pl-12 border-l-2 border-blue-200">
            <p className="text-gray-600 leading-relaxed">{a}</p>
          </div>
        </div>
      )}
    </div>
  );
}
