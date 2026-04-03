// import React, { useState, useEffect } from "react";
// import {
//   FaCar,
//   FaUserCircle,
//   FaCheckCircle,
//   FaShieldAlt,
//   FaCogs,
//   FaSnowflake,
//   FaFilter,
//   FaUser,
//   FaPhone,
//   FaChair,
//   FaStar,
//   FaHeart,
//   FaMapMarkerAlt,
//   FaClock,
//   FaSearch,
//   FaCalendarAlt,
//   FaCreditCard,
//   FaInfoCircle,
// } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const RentRideHome = () => {
//   const [activeFilter, setActiveFilter] = useState("All vehicles");
//   const [vehicles, setVehicles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selectedVehicle, setSelectedVehicle] = useState(null);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [wishlist, setWishlist] = useState(new Set());
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

//   const features = [
//     {
//       icon: <FaCar className="text-3xl" />,
//       title: "Wide Selection",
//       description: "Choose from premium vehicles for every need",
//       gradient: "from-blue-500 to-cyan-400",
//     },
//     {
//       icon: <FaCheckCircle className="text-3xl" />,
//       title: "Easy Booking",
//       description: "Book in 3 simple steps, 24/7 availability",
//       gradient: "from-green-500 to-emerald-400",
//     },
//     {
//       icon: <FaShieldAlt className="text-3xl" />,
//       title: "Fully Insured",
//       description: "Comprehensive coverage for peace of mind",
//       gradient: "from-purple-500 to-pink-400",
//     },
//     {
//       icon: <FaCreditCard className="text-3xl" />,
//       title: "Flexible Payment",
//       description: "Multiple payment options available",
//       gradient: "from-orange-500 to-yellow-400",
//     },
//   ];

//   // Fetch vehicles from both admin and user sources (PUBLIC)
//   useEffect(() => {
//     fetchAllVehicles();
//   }, []);

//   const fetchAllVehicles = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       // Fetch admin vehicles (public)
//       const adminResponse = await axios.get(
//         "http://localhost:5000/api/vehicles",
//         {
//           timeout: 10000,
//         },
//       );

//       // Fetch public user vehicles (approved and active) - NO AUTH REQUIRED
//       let userVehicles = [];
//       try {
//         const userResponse = await axios.get(
//           "http://localhost:5000/api/user-vehicles/public/active",
//           {
//             timeout: 10000,
//           },
//         );

//         if (userResponse.data.success) {
//           userVehicles = userResponse.data.data;
//           console.log("✅ User vehicles fetched:", userVehicles.length);
//         }
//       } catch (userError) {
//         console.log("Could not fetch user vehicles:", userError.message);
//       }

//       // Combine and format vehicles
//       let allVehicles = [];

//       // Add admin vehicles
//       if (adminResponse.data && Array.isArray(adminResponse.data)) {
//         allVehicles = [...adminResponse.data];
//       } else if (
//         adminResponse.data &&
//         adminResponse.data.data &&
//         Array.isArray(adminResponse.data.data)
//       ) {
//         allVehicles = [...adminResponse.data.data];
//       }

//       // Add user vehicles
//       userVehicles.forEach((userVehicle) => {
//         allVehicles.push({
//           ...userVehicle,
//           source: "user",
//         });
//       });

//       console.log("✅ Combined vehicles:", allVehicles.length);
//       setVehicles(allVehicles);
//       setLoading(false);
//     } catch (error) {
//       console.error("❌ Error fetching vehicles:", error);
//       setError("Failed to load vehicles. Please try again.");
//       setLoading(false);
//     }
//   };

//   // Toggle wishlist
//   const toggleWishlist = (vehicleId, e) => {
//     e.stopPropagation();
//     const newWishlist = new Set(wishlist);
//     if (newWishlist.has(vehicleId)) {
//       newWishlist.delete(vehicleId);
//     } else {
//       newWishlist.add(vehicleId);
//     }
//     setWishlist(newWishlist);
//   };

//   // Filter vehicles based on active filter and search
//   const filteredVehicles = vehicles.filter((vehicle) => {
//     const matchesFilter =
//       activeFilter === "All vehicles" ||
//       vehicle.carType?.toLowerCase() === activeFilter.toLowerCase();
//     const matchesSearch =
//       searchQuery === "" ||
//       vehicle.carName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       vehicle.carType?.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesFilter && matchesSearch;
//   });

//   // Get vehicle image URL
//   const getVehicleImage = (vehicle) => {
//     if (vehicle.photos && vehicle.photos.length > 0) {
//       const extraView = vehicle.photos.find(
//         (photo) => photo.label === "Extra View",
//       );
//       const photo = extraView || vehicle.photos[0];
//       const folder = vehicle.source === "user" ? "user-vehicles" : "vehicles";
//       return `http://localhost:5000/uploads/${folder}/${photo.filename}`;
//     }
//     return null;
//   };

//   // Handle View Details click
//   const handleViewDetails = (vehicle) => {
//     setSelectedVehicle(vehicle);
//     setShowDetailsModal(true);
//   };

//   // Handle Book Now click
//   const handleBookNow = (vehicle) => {
//     console.log("Booking vehicle with ID:", vehicle._id);
//     navigate(`/booking/${vehicle._id}`);
//   };

//   // CarCard Component
//   const CarCard = ({ vehicle }) => {
//     const imageUrl = getVehicleImage(vehicle);
//     const isWishlisted = wishlist.has(vehicle._id);
//     const isUserVehicle = vehicle.source === "user";

//     return (
//       <div
//         className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 cursor-pointer"
//         onClick={() => handleViewDetails(vehicle)}
//       >
//         {/* Wishlist Button */}
//         <button
//           onClick={(e) => toggleWishlist(vehicle._id, e)}
//           className="absolute top-4 right-4 z-10 p-2.5 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 transition-transform duration-300"
//         >
//           <FaHeart
//             className={`text-lg ${isWishlisted ? "text-red-500 fill-red-500" : "text-gray-400"}`}
//           />
//         </button>

//         {/* Status Badge */}
//         <div className="absolute top-4 left-4 z-10">
//           <span
//             className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
//               vehicle.status === "Available"
//                 ? "bg-green-500/90 text-white"
//                 : "bg-red-500/90 text-white"
//             }`}
//           >
//             {vehicle.status}
//           </span>
//         </div>

//         {/* Source Badge */}
//         {isUserVehicle && (
//           <div className="absolute bottom-4 left-4 z-10">
//             <span className="px-3 py-1.5 bg-purple-500/90 text-white rounded-full text-xs font-semibold backdrop-blur-sm">
//               Owner Listed
//             </span>
//           </div>
//         )}

//         {/* Car Image */}
//         <div className="h-56 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
//           {imageUrl ? (
//             <img
//               src={imageUrl}
//               alt={vehicle.carName}
//               className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center">
//               <div className="relative">
//                 <FaCar className="text-7xl text-gray-300" />
//                 <div className="absolute -bottom-2 -right-8 text-sm font-bold text-gray-400">
//                   {vehicle.carName}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Car Details */}
//         <div className="p-6">
//           <div className="flex justify-between items-start mb-4">
//             <div className="flex-1">
//               <div className="flex items-center gap-2 mb-1">
//                 <h3 className="text-xl font-bold text-gray-800 truncate">
//                   {vehicle.carName}
//                 </h3>
//                 <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
//                   {vehicle.carType}
//                 </span>
//               </div>
//               <div className="flex items-center text-gray-500 text-sm mb-3">
//                 <FaMapMarkerAlt className="mr-1.5" />
//                 <span>Kathmandu, Nepal</span>
//               </div>
//               <div className="flex items-center gap-1 mb-4">
//                 {[...Array(5)].map((_, i) => (
//                   <FaStar
//                     key={i}
//                     className={`text-sm ${
//                       i < 4
//                         ? "text-yellow-400 fill-yellow-400"
//                         : "text-gray-300"
//                     }`}
//                   />
//                 ))}
//                 <span className="text-gray-500 text-sm ml-2">4.8 (128)</span>
//               </div>
//             </div>
//           </div>

//           {/* Specifications */}
//           <div className="grid grid-cols-2 gap-3 mb-6">
//             <div className="flex items-center gap-2">
//               <div className="p-2 bg-gray-50 rounded-lg">
//                 <FaCogs className="text-gray-600" />
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500">Transmission</p>
//                 <p className="font-medium text-gray-800">{vehicle.gearType}</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="p-2 bg-gray-50 rounded-lg">
//                 <FaChair className="text-gray-600" />
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500">Seats</p>
//                 <p className="font-medium text-gray-800">{vehicle.seats}</p>
//               </div>
//             </div>
//           </div>

//           {/* Price and Action */}
//           <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//             <div>
//               <p className="text-xs text-gray-500">Daily rate</p>
//               <div className="flex items-baseline">
//                 <span className="text-2xl font-bold text-gray-800">
//                   रु {vehicle.ratePerDay}
//                 </span>
//                 <span className="text-gray-500 text-sm ml-1">/day</span>
//               </div>
//               <p className="text-xs text-gray-400 mt-1">Base price only</p>
//             </div>
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleViewDetails(vehicle);
//               }}
//               className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
//             >
//               View Details
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
//         <div className="container mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             {/* Logo */}
//             <div
//               className="flex items-center gap-3 cursor-pointer"
//               onClick={() => navigate("/")}
//             >
//               <div className="p-2.5 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg">
//                 <FaCar className="text-white text-2xl" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">
//                   Rent<span className="text-blue-600">Ride</span>
//                 </h1>
//                 <p className="text-xs text-gray-500 -mt-1">
//                   Premium Car Rentals
//                 </p>
//               </div>
//             </div>

//             {/* Search Bar */}
//             <div className="hidden md:block flex-1 max-w-xl mx-8">
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                   <FaSearch className="text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Search by car name or type..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full pl-12 pr-4 py-3 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-300"
//                 />
//               </div>
//             </div>

//             {/* Navigation */}
//             <nav className="hidden lg:flex items-center space-x-8">
//               <a
//                 href="#vehicles"
//                 className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
//               >
//                 Browse
//               </a>
//               <a
//                 href="#how-it-works"
//                 className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
//               >
//                 How It Works
//               </a>
//               <a
//                 href="#contact"
//                 className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
//               >
//                 Contact
//               </a>
//             </nav>

//             {/* User Actions */}
//             <div className="flex items-center gap-4">
//               <button
//                 className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
//                 onClick={() => navigate("/profiledetails")}
//               >
//                 Book Now
//               </button>
//               <FaUserCircle
//                 onClick={() => navigate("/profiledetails")}
//                 className="text-3xl text-gray-700 hover:text-blue-600 cursor-pointer transition-colors"
//               />
//             </div>
//           </div>

//           {/* Mobile Search */}
//           <div className="md:hidden mt-4">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                 <FaSearch className="text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search vehicles..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-12 pr-4 py-3 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-300"
//               />
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
//         <div className="absolute inset-0">
//           <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>
//           <div
//             className="absolute inset-0 z-0"
//             style={{
//               backgroundImage:
//                 'url("https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//             }}
//           ></div>
//         </div>

//         <div className="container mx-auto px-6 py-24 md:py-32 relative z-20">
//           <div className="max-w-2xl">
//             <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
//               🎉 Premium Service Since 2024
//             </span>
//             <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
//               Drive Your <span className="text-blue-400">Dream Car</span> in
//               Kathmandu
//             </h1>
//             <p className="text-xl md:text-2xl mb-10 text-gray-200 max-w-xl">
//               Experience luxury and convenience with our premium car rental
//               service. Book online in minutes.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4">
//               <button
//                 onClick={() =>
//                   document
//                     .getElementById("vehicles")
//                     .scrollIntoView({ behavior: "smooth" })
//                 }
//                 className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1"
//               >
//                 Explore Cars
//               </button>
//               <button
//                 onClick={() =>
//                   document
//                     .getElementById("how-it-works")
//                     .scrollIntoView({ behavior: "smooth" })
//                 }
//                 className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all duration-300"
//               >
//                 How It Works
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Stats Bar */}
//         <div className="relative z-20">
//           <div className="container mx-auto px-6 -mb-12">
//             <div className="bg-white rounded-2xl shadow-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
//               {[
//                 { label: "Happy Customers", value: "10K+" },
//                 { label: "Premium Vehicles", value: "200+" },
//                 { label: "Cities", value: "15+" },
//                 { label: "Support", value: "24/7" },
//               ].map((stat, index) => (
//                 <div key={index} className="text-center">
//                   <div className="text-3xl font-bold text-gray-900 mb-1">
//                     {stat.value}
//                   </div>
//                   <div className="text-gray-600 text-sm">{stat.label}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section
//         id="how-it-works"
//         className="py-20 bg-gradient-to-b from-white to-gray-50"
//       >
//         <div className="container mx-auto px-6">
//           <div className="text-center mb-16">
//             <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
//               WHY CHOOSE US
//             </span>
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//               The Best Rental Experience
//             </h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               We combine technology with personalized service to deliver an
//               exceptional car rental experience
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {features.map((feature, index) => (
//               <div
//                 key={index}
//                 className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent"
//               >
//                 <div
//                   className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}
//                 >
//                   <div className="text-white">{feature.icon}</div>
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-3">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-600">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Choose Your Ride Section */}
//       <section id="vehicles" className="py-20 bg-gray-50">
//         <div className="container mx-auto px-6">
//           <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6">
//             <div>
//               <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
//                 FLEET COLLECTION
//               </span>
//               <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
//                 Choose Your Perfect Ride
//               </h2>
//               <p className="text-gray-600 mt-2">
//                 Select from our premium collection of vehicles
//               </p>
//             </div>

//             <div className="flex items-center gap-4">
//               <div className="text-right">
//                 <div className="text-2xl font-bold text-gray-900">
//                   {filteredVehicles.length}
//                 </div>
//                 <div className="text-gray-600 text-sm">Available Cars</div>
//               </div>
//             </div>
//           </div>

//           {/* Filter Chips */}
//           <div className="flex flex-wrap gap-3 mb-12">
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
//                 {filter}
//               </button>
//             ))}
//           </div>

//           {/* Loading and Error States */}
//           {loading && (
//             <div className="text-center py-20">
//               <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
//               <p className="text-gray-600">Loading premium vehicles...</p>
//             </div>
//           )}

//           {error && !loading && (
//             <div className="text-center py-20">
//               <div className="text-red-500 text-5xl mb-4">⚠️</div>
//               <h3 className="text-xl font-semibold mb-2">
//                 Something went wrong
//               </h3>
//               <p className="text-gray-600 mb-6 max-w-md mx-auto">{error}</p>
//               <button
//                 onClick={fetchAllVehicles}
//                 className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
//               >
//                 Try Again
//               </button>
//             </div>
//           )}

//           {/* Cars Grid */}
//           {!loading && !error && filteredVehicles.length > 0 && (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//               {filteredVehicles.map((vehicle) => (
//                 <CarCard key={vehicle._id} vehicle={vehicle} />
//               ))}
//             </div>
//           )}

//           {/* No Results Message */}
//           {!loading && !error && filteredVehicles.length === 0 && (
//             <div className="text-center py-20">
//               <div className="w-32 h-32 mx-auto mb-6 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl">
//                 <FaCar className="text-6xl text-gray-400" />
//               </div>
//               <h3 className="text-2xl font-semibold text-gray-900 mb-3">
//                 No vehicles found
//               </h3>
//               <p className="text-gray-600 mb-6 max-w-md mx-auto">
//                 {searchQuery
//                   ? `No results for "${searchQuery}"`
//                   : "No vehicles available in this category"}
//               </p>
//               <button
//                 onClick={() => {
//                   setActiveFilter("All vehicles");
//                   setSearchQuery("");
//                 }}
//                 className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
//               >
//                 View All Vehicles
//               </button>
//             </div>
//           )}
//         </div>
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
//                     {selectedVehicle.source === "user" && (
//                       <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">
//                         Owner Listed
//                       </span>
//                     )}
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
//                           icon: FaUser,
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
//                               Full price calculation including optional extras,
//                               service fee, and taxes will be shown during
//                               booking.
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

//       {/* CTA Section */}
//       <section className="py-20 bg-gradient-to-r from-gray-900 to-blue-900">
//         <div className="container mx-auto px-6 text-center">
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//             Ready for Your Next Adventure?
//           </h2>
//           <p className="text-gray-300 text-xl mb-10 max-w-2xl mx-auto">
//             Join thousands of satisfied customers who trust RentRide for their
//             travel needs
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button
//               onClick={() => navigate("/profiledetails")}
//               className="px-10 py-4 bg-white text-gray-900 font-bold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
//             >
//               Start Booking Now
//             </button>
//             <button
//               onClick={() => navigate("/contact")}
//               className="px-10 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300"
//             >
//               Contact Support
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white pt-20 pb-8">
//         <div className="container mx-auto px-6">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
//             <div>
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg">
//                   <FaCar className="text-white" />
//                 </div>
//                 <h3 className="text-2xl font-bold">
//                   Rent<span className="text-blue-400">Ride</span>
//                 </h3>
//               </div>
//               <p className="text-gray-400 mb-6">
//                 Premium car rental service in Kathmandu. Experience luxury,
//                 reliability, and exceptional service.
//               </p>
//             </div>

//             <div>
//               <h4 className="text-lg font-bold mb-6">Quick Links</h4>
//               <ul className="space-y-3">
//                 {["Browse Cars", "How It Works", "About Us", "Contact"].map(
//                   (item, index) => (
//                     <li key={index}>
//                       <a
//                         href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
//                         className="text-gray-400 hover:text-white transition-colors"
//                       >
//                         {item}
//                       </a>
//                     </li>
//                   ),
//                 )}
//               </ul>
//             </div>

//             <div>
//               <h4 className="text-lg font-bold mb-6">Contact Info</h4>
//               <ul className="text-gray-400 space-y-4">
//                 <li className="flex items-start">
//                   <FaMapMarkerAlt className="mr-3 mt-1 text-blue-400" />
//                   <span>Kathmandu, Nepal</span>
//                 </li>
//                 <li className="flex items-center">
//                   <FaPhone className="mr-3 text-blue-400" />
//                   <span>+977 9844177965</span>
//                 </li>
//                 <li className="flex items-center">
//                   <FaClock className="mr-3 text-blue-400" />
//                   <span>24/7 Support</span>
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="text-lg font-bold mb-6">Newsletter</h4>
//               <p className="text-gray-400 mb-4">
//                 Subscribe for exclusive deals and updates
//               </p>
//               <div className="flex">
//                 <input
//                   type="email"
//                   placeholder="Your email"
//                   className="flex-1 px-4 py-3 bg-gray-800 border-0 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-r-lg hover:opacity-90 transition-opacity">
//                   Subscribe
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="border-t border-gray-800 pt-8 text-center">
//             <p className="text-gray-500">
//               &copy; {new Date().getFullYear()} RentRide. All rights reserved.
//             </p>
//             <p className="text-gray-500 text-sm mt-2">
//               Premium car rental service in Kathmandu
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default RentRideHome;


import React, { useState, useEffect } from "react";
import {
  FaCar,
  FaUserCircle,
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
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
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
  const navigate = useNavigate();

  const filters = [
    "All vehicles", "Sedan", "SUV", "Hatchback", "MPV",
    "Coupe", "Convertible", "Pickup", "Minivan", "Electric",
  ];

  const features = [
    { icon: <FaCar className="text-3xl" />, title: "Wide Selection", description: "Choose from premium vehicles for every need", gradient: "from-blue-500 to-cyan-400" },
    { icon: <FaCheckCircle className="text-3xl" />, title: "Easy Booking", description: "Book in 3 simple steps, 24/7 availability", gradient: "from-green-500 to-emerald-400" },
    { icon: <FaShieldAlt className="text-3xl" />, title: "Fully Insured", description: "Comprehensive coverage for peace of mind", gradient: "from-purple-500 to-pink-400" },
    { icon: <FaCreditCard className="text-3xl" />, title: "Flexible Payment", description: "Multiple payment options available", gradient: "from-orange-500 to-yellow-400" },
  ];

  // Fetch user profile
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) { setUserLoading(false); return; }
      const response = await axiosInstance.get("/profile");
      if (response.data.success) setUserProfile(response.data.user);
    } catch (error) { console.error("Error fetching profile:", error);
    } finally { setUserLoading(false); }
  };

  const getProfilePhotoUrl = () => userProfile?.profilePhoto ? `http://localhost:5000/uploads/profiles/${userProfile.profilePhoto}` : null;
  const getUserInitial = () => userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : "U";

  // Handle newsletter subscription
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
      const response = await axios.post(`${API_URL}/subscribe`, { email: subscriberEmail });
      if (response.data.success) {
        setSubscribeMessage("✅ Thank you for subscribing! You'll receive exclusive updates.");
        setSubscribeStatus("success");
        setSubscriberEmail("");
      }
    } catch (error) {
      setSubscribeMessage(error.response?.data?.message || "❌ Subscription failed. Please try again.");
      setSubscribeStatus("error");
    }
    setTimeout(() => setSubscribeMessage(""), 5000);
  };

  // Fetch vehicles
  useEffect(() => {
    fetchAllVehicles();
    fetchUserProfile();
  }, []);

  const fetchAllVehicles = async () => {
    try {
      setLoading(true);
      setError("");
      const adminResponse = await axios.get("http://localhost:5000/api/vehicles", { timeout: 10000 });
      let userVehicles = [];
      try {
        const userResponse = await axios.get("http://localhost:5000/api/user-vehicles/public/active", { timeout: 10000 });
        if (userResponse.data.success) userVehicles = userResponse.data.data;
      } catch (userError) { console.log("Could not fetch user vehicles:", userError.message); }

      let allVehicles = [];
      if (adminResponse.data && Array.isArray(adminResponse.data)) allVehicles = [...adminResponse.data];
      else if (adminResponse.data?.data && Array.isArray(adminResponse.data.data)) allVehicles = [...adminResponse.data.data];
      
      userVehicles.forEach(userVehicle => allVehicles.push({ ...userVehicle, source: "user" }));
      setVehicles(allVehicles);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      setError("Failed to load vehicles. Please try again.");
    } finally { setLoading(false); }
  };

  const toggleWishlist = (vehicleId, e) => { e.stopPropagation(); const newWishlist = new Set(wishlist); newWishlist.has(vehicleId) ? newWishlist.delete(vehicleId) : newWishlist.add(vehicleId); setWishlist(newWishlist); };

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesFilter = activeFilter === "All vehicles" || vehicle.carType?.toLowerCase() === activeFilter.toLowerCase();
    const matchesSearch = searchQuery === "" || vehicle.carName?.toLowerCase().includes(searchQuery.toLowerCase()) || vehicle.carType?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getVehicleImage = (vehicle) => {
    if (vehicle.photos?.length > 0) {
      const extraView = vehicle.photos.find(photo => photo.label === "Extra View");
      const photo = extraView || vehicle.photos[0];
      const folder = vehicle.source === "user" ? "user-vehicles" : "vehicles";
      return `http://localhost:5000/uploads/${folder}/${photo.filename}`;
    }
    return null;
  };

  const handleViewDetails = (vehicle) => { setSelectedVehicle(vehicle); setShowDetailsModal(true); };
  const handleBookNow = (vehicle) => navigate(`/booking/${vehicle._id}`);

  const CarCard = ({ vehicle }) => {
    const imageUrl = getVehicleImage(vehicle);
    const isWishlisted = wishlist.has(vehicle._id);
    const isUserVehicle = vehicle.source === "user";
    return (
      <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 cursor-pointer" onClick={() => handleViewDetails(vehicle)}>
        <button onClick={(e) => toggleWishlist(vehicle._id, e)} className="absolute top-4 right-4 z-10 p-2.5 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 transition-transform duration-300">
          <FaHeart className={`text-lg ${isWishlisted ? "text-red-500 fill-red-500" : "text-gray-400"}`} />
        </button>
        <div className="absolute top-4 left-4 z-10">
          <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${vehicle.status === "Available" ? "bg-green-500/90 text-white" : "bg-red-500/90 text-white"}`}>
            {vehicle.status}
          </span>
        </div>
        {isUserVehicle && <div className="absolute bottom-4 left-4 z-10"><span className="px-3 py-1.5 bg-purple-500/90 text-white rounded-full text-xs font-semibold backdrop-blur-sm">Owner Listed</span></div>}
        <div className="h-56 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          {imageUrl ? <img src={imageUrl} alt={vehicle.carName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            : <div className="w-full h-full flex items-center justify-center"><FaCar className="text-7xl text-gray-300" /></div>}
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1"><h3 className="text-xl font-bold text-gray-800 truncate">{vehicle.carName}</h3><span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">{vehicle.carType}</span></div>
              <div className="flex items-center text-gray-500 text-sm mb-3"><FaMapMarkerAlt className="mr-1.5" /><span>Kathmandu, Nepal</span></div>
              <div className="flex items-center gap-1 mb-4">{[...Array(5)].map((_, i) => <FaStar key={i} className={`text-sm ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />)}<span className="text-gray-500 text-sm ml-2">4.8 (128)</span></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="flex items-center gap-2"><div className="p-2 bg-gray-50 rounded-lg"><FaCogs className="text-gray-600" /></div><div><p className="text-xs text-gray-500">Transmission</p><p className="font-medium text-gray-800">{vehicle.gearType}</p></div></div>
            <div className="flex items-center gap-2"><div className="p-2 bg-gray-50 rounded-lg"><FaChair className="text-gray-600" /></div><div><p className="text-xs text-gray-500">Seats</p><p className="font-medium text-gray-800">{vehicle.seats}</p></div></div>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div><p className="text-xs text-gray-500">Daily rate</p><div className="flex items-baseline"><span className="text-2xl font-bold text-gray-800">रु {vehicle.ratePerDay}</span><span className="text-gray-500 text-sm ml-1">/day</span></div></div>
            <button onClick={(e) => { e.stopPropagation(); handleViewDetails(vehicle); }} className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all">View Details</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
              <div className="p-2.5 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg"><FaCar className="text-white text-2xl" /></div>
              <div><h1 className="text-2xl font-bold text-gray-900">Rent<span className="text-blue-600">Ride</span></h1><p className="text-xs text-gray-500 -mt-1">Premium Car Rentals</p></div>
            </div>
            <div className="hidden md:block flex-1 max-w-xl mx-8">
              <div className="relative"><div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><FaSearch className="text-gray-400" /></div><input type="text" placeholder="Search by car name or type..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
            </div>
            <nav className="hidden lg:flex items-center space-x-8"><a href="#vehicles" className="text-gray-700 hover:text-blue-600 font-medium">Browse</a><a href="#how-it-works" className="text-gray-700 hover:text-blue-600 font-medium">How It Works</a><a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium">Contact</a></nav>
            <div className="flex items-center gap-4">
              <button className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg" onClick={() => navigate("/profiledetails")}>Book Now</button>
              {userLoading ? <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                : userProfile && getProfilePhotoUrl() ? <div onClick={() => navigate("/profiledetails")} className="cursor-pointer"><img src={getProfilePhotoUrl()} alt="Profile" className="w-10 h-10 rounded-full object-cover border-2 border-blue-500" onError={(e) => { e.target.style.display = 'none'; const parent = e.target.parentElement; if (parent) { const avatar = document.createElement('div'); avatar.className = 'w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg cursor-pointer'; avatar.textContent = getUserInitial(); parent.innerHTML = ''; parent.appendChild(avatar); } }} /></div>
                  : <div onClick={() => navigate("/profiledetails")} className="cursor-pointer"><div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">{getUserInitial()}</div></div>}
            </div>
          </div>
          <div className="md:hidden mt-4"><div className="relative"><div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><FaSearch className="text-gray-400" /></div><input type="text" placeholder="Search vehicles..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" /></div></div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
        <div className="absolute inset-0"><div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div><div className="absolute inset-0 z-0" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")', backgroundSize: "cover", backgroundPosition: "center" }}></div></div>
        <div className="container mx-auto px-6 py-24 md:py-32 relative z-20">
          <div className="max-w-2xl"><span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">🎉 Premium Service Since 2024</span><h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">Drive Your <span className="text-blue-400">Dream Car</span> in Kathmandu</h1><p className="text-xl md:text-2xl mb-10 text-gray-200 max-w-xl">Experience luxury and convenience with our premium car rental service. Book online in minutes.</p>
            <div className="flex flex-col sm:flex-row gap-4"><button onClick={() => document.getElementById("vehicles").scrollIntoView({ behavior: "smooth" })} className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:shadow-2xl transition-all">Explore Cars</button><button onClick={() => document.getElementById("how-it-works").scrollIntoView({ behavior: "smooth" })} className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-xl hover:bg-white/20">How It Works</button></div>
          </div>
        </div>
        <div className="relative z-20"><div className="container mx-auto px-6 -mb-12">
          <div className="bg-white rounded-2xl shadow-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center"><div className="text-3xl font-bold text-gray-900 mb-1">10K+</div><div className="text-gray-600 text-sm">Happy Customers</div></div>
            <div className="text-center"><div className="text-3xl font-bold text-gray-900 mb-1">200+</div><div className="text-gray-600 text-sm">Premium Vehicles</div></div>
            <div className="text-center"><div className="text-3xl font-bold text-gray-900 mb-1">15+</div><div className="text-gray-600 text-sm">Cities</div></div>
            <div className="text-center"><div className="text-3xl font-bold text-gray-900 mb-1">24/7</div><div className="text-gray-600 text-sm">Support</div></div>
          </div>
        </div></div>
      </section>

      {/* Features Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6"><div className="text-center mb-16"><span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">WHY CHOOSE US</span><h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">The Best Rental Experience</h2><p className="text-gray-600 max-w-2xl mx-auto">We combine technology with personalized service to deliver an exceptional car rental experience</p></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">{features.map((feature, index) => (<div key={index} className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"><div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.gradient} mb-6 group-hover:scale-110 transition-transform`}><div className="text-white">{feature.icon}</div></div><h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3><p className="text-gray-600">{feature.description}</p></div>))}</div>
        </div>
      </section>

      {/* Vehicles Section */}
      <section id="vehicles" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6"><div><span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">FLEET COLLECTION</span><h2 className="text-4xl md:text-5xl font-bold text-gray-900">Choose Your Perfect Ride</h2><p className="text-gray-600 mt-2">Select from our premium collection of vehicles</p></div><div className="flex items-center gap-4"><div className="text-right"><div className="text-2xl font-bold text-gray-900">{filteredVehicles.length}</div><div className="text-gray-600 text-sm">Available Cars</div></div></div></div>
          
          <div className="flex flex-wrap gap-3 mb-12">{filters.map((filter) => (<button key={filter} onClick={() => setActiveFilter(filter)} className={`px-5 py-2.5 rounded-full transition-all duration-300 ${activeFilter === filter ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg" : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"}`}>{filter}</button>))}</div>

          {loading && <div className="text-center py-20"><div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div><p className="text-gray-600">Loading premium vehicles...</p></div>}
          {error && !loading && <div className="text-center py-20"><div className="text-red-500 text-5xl mb-4">⚠️</div><h3 className="text-xl font-semibold mb-2">Something went wrong</h3><p className="text-gray-600 mb-6">{error}</p><button onClick={fetchAllVehicles} className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg">Try Again</button></div>}
          
          {!loading && !error && filteredVehicles.length > 0 && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">{filteredVehicles.map((vehicle) => (<CarCard key={vehicle._id} vehicle={vehicle} />))}</div>}
          
          {!loading && !error && filteredVehicles.length === 0 && <div className="text-center py-20"><div className="w-32 h-32 mx-auto mb-6 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl"><FaCar className="text-6xl text-gray-400" /></div><h3 className="text-2xl font-semibold text-gray-900 mb-3">No vehicles found</h3><p className="text-gray-600 mb-6">{searchQuery ? `No results for "${searchQuery}"` : "No vehicles available in this category"}</p><button onClick={() => { setActiveFilter("All vehicles"); setSearchQuery(""); }} className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg">View All Vehicles</button></div>}
        </div>
      </section>

      {/* Vehicle Details Modal - Keep your existing modal code */}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-blue-900"><div className="container mx-auto px-6 text-center"><h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready for Your Next Adventure?</h2><p className="text-gray-300 text-xl mb-10 max-w-2xl mx-auto">Join thousands of satisfied customers who trust RentRide for their travel needs</p><div className="flex flex-col sm:flex-row gap-4 justify-center"><button onClick={() => navigate("/profiledetails")} className="px-10 py-4 bg-white text-gray-900 font-bold rounded-xl hover:shadow-2xl transition-all">Start Booking Now</button><button className="px-10 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10">Contact Support</button></div></div></section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-20 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div><div className="flex items-center gap-3 mb-6"><div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg"><FaCar className="text-white" /></div><h3 className="text-2xl font-bold">Rent<span className="text-blue-400">Ride</span></h3></div><p className="text-gray-400 mb-6">Premium car rental service in Kathmandu. Experience luxury, reliability, and exceptional service.</p></div>
            <div><h4 className="text-lg font-bold mb-6">Quick Links</h4><ul className="space-y-3">{["Browse Cars", "How It Works", "About Us", "Contact"].map((item, index) => (<li key={index}><a href={`#${item.toLowerCase().replace(/\s+/g, "-")}`} className="text-gray-400 hover:text-white">{item}</a></li>))}</ul></div>
            <div><h4 className="text-lg font-bold mb-6">Contact Info</h4><ul className="text-gray-400 space-y-4"><li className="flex items-start"><FaMapMarkerAlt className="mr-3 mt-1 text-blue-400" /><span>Kathmandu, Nepal</span></li><li className="flex items-center"><FaPhone className="mr-3 text-blue-400" /><span>+977 9844177965</span></li><li className="flex items-center"><FaClock className="mr-3 text-blue-400" /><span>24/7 Support</span></li></ul></div>
            <div><h4 className="text-lg font-bold mb-6">Newsletter</h4><p className="text-gray-400 mb-4">Subscribe for exclusive deals and updates</p>
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <div className="flex">
                  <input type="email" placeholder="Your email" value={subscriberEmail} onChange={(e) => setSubscriberEmail(e.target.value)} className="flex-1 px-4 py-3 bg-gray-800 border-0 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <button type="submit" className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-r-lg hover:opacity-90 transition-opacity"><FaEnvelope /></button>
                </div>
                {subscribeMessage && <p className={`text-sm ${subscribeStatus === "success" ? "text-green-400" : subscribeStatus === "error" ? "text-red-400" : "text-blue-400"}`}>{subscribeMessage}</p>}
              </form>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center"><p className="text-gray-500">&copy; {new Date().getFullYear()} RentRide. All rights reserved.</p><p className="text-gray-500 text-sm mt-2">Premium car rental service in Kathmandu</p></div>
        </div>
      </footer>
    </div>
  );
};

export default RentRideHome;