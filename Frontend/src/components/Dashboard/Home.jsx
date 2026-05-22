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
//   FaMotorcycle,
//   FaQuoteLeft,
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

// /* ── Testimonial Card ─────────────────────────────────────── */
// const Testimonial = ({ name, role, text, rating, avatarColor }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 40 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.5 }}
//     viewport={{ once: true }}
//     className="bg-white rounded-2xl p-7 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 relative overflow-hidden"
//   >
//     <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-3xl pointer-events-none" />
//     <FaQuoteLeft className="text-blue-100 text-3xl mb-4" />
//     <p className="text-gray-600 leading-relaxed mb-6 text-sm">{text}</p>
//     <div className="flex items-center gap-1 mb-4">
//       {[...Array(5)].map((_, i) => (
//         <FaStar
//           key={i}
//           className={`text-sm ${i < rating ? "text-yellow-400" : "text-gray-200"}`}
//         />
//       ))}
//     </div>
//     <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
//       <div
//         className={`w-11 h-11 rounded-full ${avatarColor} flex items-center justify-center text-blue-600 font-bold text-lg`}
//       >
//         {name.charAt(0)}
//       </div>
//       <div>
//         <p className="font-semibold text-gray-900 text-sm">{name}</p>
//         <p className="text-gray-400 text-xs">{role}</p>
//       </div>
//     </div>
//   </motion.div>
// );

// /* ── FAQ Accordion ────────────────────────────────────────── */
// const Faq = ({ q, a }) => {
//   const [open, setOpen] = useState(false);
//   return (
//     <div
//       className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
//       onClick={() => setOpen(!open)}
//     >
//       <button className="w-full flex items-center justify-between px-6 py-5 text-left">
//         <span className="font-semibold text-gray-900 text-sm pr-4">{q}</span>
//         <motion.div
//           animate={{ rotate: open ? 180 : 0 }}
//           transition={{ duration: 0.3 }}
//           className="flex-shrink-0"
//         >
//           <FaChevronDown className="text-blue-500 text-sm" />
//         </motion.div>
//       </button>
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-3">
//               {a}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default function Home() {
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

//   // Tab state
//   const [activeTab, setActiveTab] = useState("cars");

//   // Bikes state
//   const [bikes, setBikes] = useState([]);
//   const [bikesLoading, setBikesLoading] = useState(true);
//   const [bikeFilter, setBikeFilter] = useState("All");
//   const [filteredBikes, setFilteredBikes] = useState([]);
//   const [selectedBike, setSelectedBike] = useState(null);
//   const [showBikeModal, setShowBikeModal] = useState(false);

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

//   const bikeTypes = [
//     "All",
//     "Sports",
//     "Cruiser",
//     "Touring",
//     "Scooter",
//     "Electric",
//     "Dirt Bike",
//     "Standard",
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
//     fetchBikes();
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

//   const fetchBikes = async () => {
//     try {
//       setBikesLoading(true);
//       const res = await axios.get("http://localhost:5000/api/bikes");
//       if (res.data.success) setBikes(res.data.data);
//     } catch (err) {
//       console.error("Failed to fetch bikes:", err);
//     } finally {
//       setBikesLoading(false);
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

//   useEffect(() => {
//     const filtered = bikes.filter((bike) => {
//       const matchesType = bikeFilter === "All" || bike.bikeType === bikeFilter;
//       return matchesType;
//     });
//     setFilteredBikes(filtered);
//   }, [bikeFilter, bikes]);

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

//   const getBikeImage = (bike) => {
//     if (bike.photos?.length > 0) {
//       const front =
//         bike.photos.find((p) => p.label === "Front View") || bike.photos[0];
//       return `http://localhost:5000/uploads/bikes/${front.filename}`;
//     }
//     return null;
//   };

//   const HomeBikeCard = ({ bike, index }) => {
//     const imageUrl = getBikeImage(bike);
//     const isAvailable = bike.status === "Available";
//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: index * 0.05 }}
//         viewport={{ once: true, margin: "-50px" }}
//         className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 cursor-pointer h-full flex flex-col hover:-translate-y-1"
//         onClick={() => {
//           setSelectedBike(bike);
//           setShowBikeModal(true);
//         }}
//       >
//         <div className="absolute top-3 left-3 z-10">
//           <span
//             className={`px-2.5 py-1 rounded-full text-xs font-bold tracking-wide ${
//               isAvailable ? "bg-green-500 text-white" : "bg-red-500 text-white"
//             }`}
//           >
//             {bike.status}
//           </span>
//         </div>
//         <div className="h-52 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0 relative">
//           {imageUrl ? (
//             <img
//               src={imageUrl}
//               alt={bike.bikeName}
//               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
//             />
//           ) : (
//             <div className="w-full h-full flex flex-col items-center justify-center gap-2">
//               <FaMotorcycle className="text-6xl text-gray-300" />
//               <span className="text-xs text-gray-400">No image available</span>
//             </div>
//           )}
//           <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
//         </div>
//         <div className="p-5 flex flex-col flex-grow">
//           <div className="flex items-start justify-between gap-2 mb-2">
//             <h3 className="text-lg font-bold text-gray-900 leading-tight truncate">
//               {bike.bikeName}
//             </h3>
//             <span className="flex-shrink-0 px-2 py-0.5 bg-purple-50 text-purple-600 text-xs font-semibold rounded-full border border-purple-100">
//               {bike.bikeType}
//             </span>
//           </div>
//           <p className="text-xs text-gray-400 mb-3">
//             {bike.brand} {bike.model}
//           </p>
//           <div className="flex items-center gap-4 py-3 px-3 bg-gray-50 rounded-xl mb-4">
//             <div className="flex items-center gap-1.5 text-gray-600 text-xs">
//               <FaCogs size={12} className="text-purple-500" />
//               <span className="font-medium">{bike.transmission}</span>
//             </div>
//             {bike.engineCapacity && (
//               <>
//                 <div className="w-px h-3 bg-gray-300" />
//                 <div className="flex items-center gap-1.5 text-gray-600 text-xs">
//                   <span className="font-medium">{bike.engineCapacity}</span>
//                 </div>
//               </>
//             )}
//           </div>
//           <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
//             <div>
//               <p className="text-xs text-gray-400 mb-0.5">Daily rate</p>
//               <div className="flex items-baseline gap-1">
//                 <span className="text-xl font-bold text-gray-900">
//                   रु {bike.ratePerDay?.toLocaleString()}
//                 </span>
//                 <span className="text-xs text-gray-400">/day</span>
//               </div>
//             </div>
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setSelectedBike(bike);
//                 setShowBikeModal(true);
//               }}
//               className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300"
//             >
//               View Details
//             </button>
//           </div>
//         </div>
//       </motion.div>
//     );
//   };

//   const formatPrice = (price) => `रु ${price?.toLocaleString()}`;

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

//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: index * 0.05 }}
//         viewport={{ once: true, margin: "-50px" }}
//         className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 cursor-pointer h-full flex flex-col hover:-translate-y-1"
//         onClick={() => handleViewDetails(vehicle)}
//       >
//         <button
//           onClick={(e) => toggleFavorite(vehicle._id, e)}
//           className="absolute top-3 right-3 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white hover:scale-110 transition-all duration-300"
//         >
//           <FaHeart
//             className={`text-base ${isWishlisted ? "text-red-500" : "text-gray-400"}`}
//           />
//         </button>

//         <div className="absolute top-3 left-3 z-10">
//           <span
//             className={`px-2.5 py-1 rounded-full text-xs font-bold tracking-wide ${
//               vehicle.status === "Available"
//                 ? "bg-green-500 text-white"
//                 : "bg-red-500 text-white"
//             }`}
//           >
//             {vehicle.status}
//           </span>
//         </div>

//         <div className="h-52 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 relative flex-shrink-0">
//           {imageUrl ? (
//             <img
//               src={imageUrl}
//               alt={vehicle.carName}
//               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
//             />
//           ) : (
//             <div className="w-full h-full flex flex-col items-center justify-center gap-2">
//               <FaCar className="text-6xl text-gray-300" />
//               <span className="text-xs text-gray-400">No image available</span>
//             </div>
//           )}
//           <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
//         </div>

//         <div className="p-5 flex flex-col flex-grow">
//           <div className="flex items-start justify-between gap-2 mb-2">
//             <h3 className="text-lg font-bold text-gray-900 leading-tight truncate">
//               {vehicle.carName}
//             </h3>
//             <span className="flex-shrink-0 px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full border border-blue-100">
//               {vehicle.carType}
//             </span>
//           </div>

//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center text-gray-400 text-xs gap-1">
//               <FaMapMarkerAlt size={10} />
//               <span>Kathmandu, Nepal</span>
//             </div>
//             <div className="flex items-center gap-1">
//               {[...Array(5)].map((_, i) => (
//                 <FaStar
//                   key={i}
//                   className={`text-xs ${i < 4 ? "text-yellow-400" : "text-gray-200"}`}
//                 />
//               ))}
//               <span className="text-xs text-gray-400 ml-1">4.8</span>
//             </div>
//           </div>

//           <div className="flex items-center gap-4 py-3 px-3 bg-gray-50 rounded-xl mb-4">
//             <div className="flex items-center gap-1.5 text-gray-600 text-xs">
//               <FaCogs size={12} className="text-blue-500" />
//               <span className="font-medium">{vehicle.gearType}</span>
//             </div>
//             <div className="w-px h-3 bg-gray-300" />
//             <div className="flex items-center gap-1.5 text-gray-600 text-xs">
//               <FaChair size={12} className="text-blue-500" />
//               <span className="font-medium">{vehicle.seats} Seats</span>
//             </div>
//             <div className="w-px h-3 bg-gray-300" />
//             <div className="flex items-center gap-1.5 text-gray-600 text-xs">
//               <FaSnowflake size={12} className="text-blue-500" />
//               <span className="font-medium">
//                 {vehicle.airCondition === "Yes" ? "AC" : "No AC"}
//               </span>
//             </div>
//           </div>

//           <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
//             <div>
//               <p className="text-xs text-gray-400 mb-0.5">Daily rate</p>
//               <div className="flex items-baseline gap-1">
//                 <span className="text-xl font-bold text-gray-900">
//                   रु {vehicle.ratePerDay?.toLocaleString()}
//                 </span>
//                 <span className="text-xs text-gray-400">/day</span>
//               </div>
//             </div>
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleViewDetails(vehicle);
//               }}
//               className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
//             >
//               View Details
//             </button>
//           </div>
//         </div>
//       </motion.div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
//         <div className="text-center">
//           <motion.div
//             animate={{ rotate: 360 }}
//             transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//             className="relative w-24 h-24 mx-auto mb-6"
//           >
//             <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full"></div>
//             <div className="absolute inset-0 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full"></div>
//             <div className="absolute inset-2 border-4 border-t-transparent border-r-cyan-400 border-b-transparent border-l-transparent rounded-full"></div>
//             <FaCar className="absolute inset-0 m-auto text-white text-2xl animate-pulse" />
//           </motion.div>
//           <p className="text-white/80 text-lg">Loading premium vehicles...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center">
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
//             className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
//           >
//             Try Again
//           </button>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="font-sans text-gray-900 bg-gray-50">
//       {/* ── Navbar ──────────────────────────────────────────────── */}
//       <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
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
//                     ? "text-blue-600"
//                     : "text-gray-600 hover:text-blue-600"
//                 }`}
//               >
//                 {item.label}
//                 {activeNav === item.id && (
//                   <motion.div
//                     layoutId="activeNav"
//                     className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
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
//                 className="w-full pl-11 pr-4 py-3 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
//               />
//             </div>
//           </div>

//           <div className="flex items-center gap-3">
//             <Link
//               to="/login"
//               className="px-5 py-2 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300 text-sm"
//             >
//               Login
//             </Link>
//             <Link
//               to="/signup"
//               className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl transition-all"
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
//               className="w-full pl-11 pr-4 py-3 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         </div>
//       </nav>

//       {/* ── Hero Section ───────────────────────────────────────── */}
//       <section
//         id="home"
//         className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white pt-24"
//       >
//         <div className="absolute inset-0">
//           <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>
//           <video
//             src={heroVideo}
//             autoPlay
//             muted
//             loop
//             playsInline
//             className="absolute inset-0 w-full h-full object-cover z-0"
//           />
//         </div>
//         <div className="container mx-auto px-6 py-24 md:py-32 relative z-20">
//           <div className="max-w-2xl">
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//             >
//               <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/20">
//                 ✨ Premium Service Since 2024
//               </span>
//               <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
//                 Drive Your <span className="text-blue-400">Dream Car</span> in
//                 Kathmandu
//               </h1>
//               <p className="text-xl md:text-2xl mb-10 text-gray-200 max-w-xl">
//                 Experience luxury and convenience with our premium car rental
//                 service. Book online in minutes.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => scrollToSection("vehicles")}
//                   className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:shadow-2xl transition-all"
//                 >
//                   Explore Cars
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => scrollToSection("how-it-works")}
//                   className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-xl hover:bg-white/20"
//                 >
//                   How It Works
//                 </motion.button>
//               </div>
//             </motion.div>
//           </div>
//         </div>

//         {/* Stats bar */}
//         <div className="relative z-20 pb-8">
//           <div className="container mx-auto px-6">
//             <motion.div
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.3 }}
//               className="bg-white rounded-2xl shadow-2xl py-8 px-4 grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-gray-100"
//             >
//               {[
//                 { value: "10K+", label: "Happy Customers" },
//                 { value: "200+", label: "Premium Vehicles" },
//                 { value: "15+", label: "Cities" },
//                 { value: "24/7", label: "Support" },
//               ].map((stat, idx) => (
//                 <div key={idx} className="text-center px-6">
//                   <div className="text-3xl font-bold text-gray-900 mb-2">
//                     {stat.value}
//                   </div>
//                   <div className="text-gray-500 text-sm">{stat.label}</div>
//                 </div>
//               ))}
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* ── Features / Why Choose Us ───────────────────────────── */}
//       <section className="py-20 bg-gradient-to-b from-white to-gray-50">
//         <div className="container mx-auto px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="text-center mb-12"
//           >
//             <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
//               WHY CHOOSE US
//             </span>
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
//               The Best Rental Experience
//             </h2>
//             <p className="text-gray-500 max-w-xl mx-auto text-base">
//               We combine technology with personalized service to deliver an
//               exceptional car rental experience
//             </p>
//           </motion.div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[
//               {
//                 icon: FaCar,
//                 title: "Wide Selection",
//                 description: "Choose from premium vehicles for every need",
//                 gradient: "from-blue-500 to-cyan-400",
//               },
//               {
//                 icon: FaCheckCircle,
//                 title: "Easy Booking",
//                 description: "Book in 3 simple steps, 24/7 availability",
//                 gradient: "from-green-500 to-emerald-400",
//               },
//               {
//                 icon: FaShieldAlt,
//                 title: "Fully Insured",
//                 description: "Comprehensive coverage for peace of mind",
//                 gradient: "from-purple-500 to-pink-400",
//               },
//               {
//                 icon: FaCreditCard,
//                 title: "Flexible Payment",
//                 description: "Multiple payment options available",
//                 gradient: "from-orange-500 to-yellow-400",
//               },
//             ].map((feature, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//                 whileHover={{ y: -8 }}
//                 className="group bg-white p-7 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 relative overflow-hidden"
//               >
//                 <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-gray-50 to-transparent rounded-bl-3xl pointer-events-none" />
//                 <div
//                   className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-5 group-hover:scale-110 transition-transform duration-300 shadow-md`}
//                 >
//                   <feature.icon className="text-white text-3xl" />
//                 </div>
//                 <h3 className="text-lg font-bold text-gray-900 mb-2">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-500 text-sm leading-relaxed">
//                   {feature.description}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── Fleet Section — Tabbed Cars / Bikes ────────────────── */}
//       <section id="vehicles" className="py-20 bg-gray-50">
//         <div className="container mx-auto px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="text-center mb-12"
//           >
//             <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-3">
//               FLEET COLLECTION
//             </span>
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-3">
//               Choose Your Perfect Ride
//             </h2>
//             <p className="text-gray-500 text-base max-w-xl mx-auto">
//               Browse our premium cars or explore our bike collection
//             </p>
//           </motion.div>

//           {/* Tab Switcher */}
//           <div className="flex justify-center mb-10">
//             <div className="inline-flex bg-white rounded-2xl p-1.5 shadow-lg border border-gray-100 gap-1">
//               <button
//                 onClick={() => setActiveTab("cars")}
//                 className={`flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 ${
//                   activeTab === "cars"
//                     ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30 scale-[1.02]"
//                     : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
//                 }`}
//               >
//                 <FaCar
//                   className={
//                     activeTab === "cars" ? "text-white" : "text-blue-400"
//                   }
//                   size={16}
//                 />
//                 <span>Cars</span>
//                 <span
//                   className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
//                     activeTab === "cars"
//                       ? "bg-white/20 text-white"
//                       : "bg-blue-100 text-blue-600"
//                   }`}
//                 >
//                   {vehicles.length}
//                 </span>
//               </button>

//               <button
//                 onClick={() => setActiveTab("bikes")}
//                 className={`flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 ${
//                   activeTab === "bikes"
//                     ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30 scale-[1.02]"
//                     : "text-gray-500 hover:text-purple-600 hover:bg-purple-50"
//                 }`}
//               >
//                 <FaMotorcycle
//                   className={
//                     activeTab === "bikes" ? "text-white" : "text-purple-400"
//                   }
//                   size={16}
//                 />
//                 <span>Bikes</span>
//                 <span
//                   className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
//                     activeTab === "bikes"
//                       ? "bg-white/20 text-white"
//                       : "bg-purple-100 text-purple-600"
//                   }`}
//                 >
//                   {bikes.length}
//                 </span>
//               </button>
//             </div>
//           </div>

//           {/* ── Cars Tab ── */}
//           {activeTab === "cars" && (
//             <div>
//               <div className="flex flex-wrap gap-2 mb-8 justify-center">
//                 {filters.map((filter) => (
//                   <button
//                     key={filter}
//                     onClick={() => setActiveFilter(filter)}
//                     className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
//                       activeFilter === filter
//                         ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25 scale-105"
//                         : "bg-white text-gray-600 hover:bg-gray-100 shadow-sm border border-gray-200 hover:border-blue-200 hover:text-blue-600"
//                     }`}
//                   >
//                     {filter}{" "}
//                     {filter === "All vehicles" && `(${vehicles.length})`}
//                   </button>
//                 ))}
//               </div>

//               {filteredVehicles.length === 0 ? (
//                 <div className="text-center py-24">
//                   <div className="w-24 h-24 mx-auto mb-5 flex items-center justify-center bg-blue-50 rounded-3xl">
//                     <FaCar className="text-4xl text-blue-300" />
//                   </div>
//                   <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                     No vehicles found
//                   </h3>
//                   <p className="text-gray-500 mb-6 max-w-sm mx-auto">
//                     {searchQuery
//                       ? `No results for "${searchQuery}"`
//                       : "No vehicles available in this category"}
//                   </p>
//                   <button
//                     onClick={() => {
//                       setActiveFilter("All vehicles");
//                       setSearchQuery("");
//                     }}
//                     className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
//                   >
//                     View All Vehicles
//                   </button>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                   {filteredVehicles.map((vehicle, idx) => (
//                     <CarCard key={vehicle._id} vehicle={vehicle} index={idx} />
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}

//           {/* ── Bikes Tab ── */}
//           {activeTab === "bikes" && (
//             <div>
//               <div className="flex flex-wrap gap-2 mb-8 justify-center">
//                 {bikeTypes.map((type) => (
//                   <button
//                     key={type}
//                     onClick={() => setBikeFilter(type)}
//                     className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
//                       bikeFilter === type
//                         ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25 scale-105"
//                         : "bg-white text-gray-600 hover:bg-gray-100 shadow-sm border border-gray-200 hover:border-purple-200 hover:text-purple-600"
//                     }`}
//                   >
//                     {type}
//                   </button>
//                 ))}
//               </div>

//               {bikesLoading ? (
//                 <div className="text-center py-24">
//                   <div className="relative w-16 h-16 mx-auto mb-5">
//                     <div className="absolute inset-0 border-4 border-purple-100 rounded-full"></div>
//                     <div className="absolute inset-0 border-4 border-t-purple-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
//                     <FaMotorcycle className="absolute inset-0 m-auto text-purple-400 text-lg" />
//                   </div>
//                   <p className="text-gray-500 font-medium">Loading bikes...</p>
//                 </div>
//               ) : filteredBikes.length === 0 ? (
//                 <div className="text-center py-24">
//                   <div className="w-24 h-24 mx-auto mb-5 flex items-center justify-center bg-purple-50 rounded-3xl">
//                     <FaMotorcycle className="text-4xl text-purple-300" />
//                   </div>
//                   <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                     No bikes found
//                   </h3>
//                   <p className="text-gray-500">
//                     Try selecting a different category
//                   </p>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                   {filteredBikes.map((bike, idx) => (
//                     <HomeBikeCard key={bike._id} bike={bike} index={idx} />
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* ── How It Works ───────────────────────────────────────── */}
//       <section
//         id="how-it-works"
//         className="py-20 bg-gradient-to-r from-gray-900 to-blue-900"
//       >
//         <div className="container mx-auto px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="text-center mb-12"
//           >
//             <span className="inline-block px-4 py-1.5 bg-white/10 text-white rounded-full text-sm font-semibold mb-4 backdrop-blur-sm border border-white/20">
//               SIMPLE PROCESS
//             </span>
//             <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
//               How It Works
//             </h2>
//             <p className="text-gray-300 max-w-2xl mx-auto">
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
//                 gradient: "from-blue-500 to-cyan-400",
//               },
//               {
//                 number: "02",
//                 title: "Book & Pay",
//                 desc: "Select dates, add extras, and complete secure payment",
//                 icon: FaCreditCard,
//                 gradient: "from-green-500 to-emerald-400",
//               },
//               {
//                 number: "03",
//                 title: "Get Your Vehicle",
//                 desc: "Pick up from our location or get doorstep delivery",
//                 icon: FaMapMarkerAlt,
//                 gradient: "from-purple-500 to-pink-400",
//               },
//             ].map((step, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: idx * 0.15 }}
//                 viewport={{ once: true }}
//                 whileHover={{ y: -10 }}
//                 className="relative text-center"
//               >
//                 <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-xl font-bold text-blue-600 z-10">
//                   {step.number}
//                 </div>
//                 <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 pt-14 border border-white/20 hover:border-white/40 transition-all">
//                   <div
//                     className={`inline-flex p-5 rounded-2xl bg-gradient-to-r ${step.gradient} mb-5 shadow-lg`}
//                   >
//                     <step.icon className="text-white text-3xl" />
//                   </div>
//                   <h3 className="text-xl font-bold text-white mb-2">
//                     {step.title}
//                   </h3>
//                   <p className="text-gray-300">{step.desc}</p>
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

//       {/* ── Delivery Options ───────────────────────────────────── */}
//       <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
//         <div className="container mx-auto px-6">
//           <div className="text-center mb-10">
//             <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
//               DELIVERY
//             </span>
//             <h2 className="text-4xl font-bold text-gray-900 mb-3">
//               Delivery Options
//             </h2>
//             <p className="text-gray-500">
//               Choose how you want to receive your vehicle
//             </p>
//           </div>
//           <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
//             {[
//               {
//                 icon: FaMapMarkerAlt,
//                 title: "Pickup from Location",
//                 desc: "Collect your vehicle from our nearest branch. Our team will assist you with the handover process.",
//                 color: "bg-blue-100 text-blue-600",
//                 items: [
//                   "Free pickup service",
//                   "Vehicle inspection on site",
//                   "Document verification",
//                 ],
//               },
//               {
//                 icon: FaTruck,
//                 title: "Doorstep Delivery",
//                 desc: "Get your vehicle delivered to your home, hotel, or office. Our driver will bring the car to you.",
//                 color: "bg-green-100 text-green-600",
//                 items: [
//                   "Delivery within Kathmandu Valley",
//                   "Free delivery for 3+ days booking",
//                   "Real-time tracking available",
//                 ],
//               },
//             ].map((option, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 40 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: idx * 0.1 }}
//                 viewport={{ once: true }}
//                 className="bg-white rounded-2xl p-7 shadow-md hover:shadow-xl transition-all border border-gray-100 text-center"
//               >
//                 <div
//                   className={`w-16 h-16 ${option.color} rounded-2xl flex items-center justify-center mx-auto mb-5`}
//                 >
//                   <option.icon className="text-2xl" />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-2">
//                   {option.title}
//                 </h3>
//                 <p className="text-gray-500 text-sm mb-5">{option.desc}</p>
//                 <ul className="text-left text-sm text-gray-500 space-y-2">
//                   {option.items.map((item, i) => (
//                     <li key={i} className="flex items-center gap-2">
//                       <FaCheckCircle className="text-green-500 text-sm flex-shrink-0" />
//                       {item}
//                     </li>
//                   ))}
//                 </ul>
//               </motion.div>
//             ))}
//           </div>
//           <div className="mt-8 text-center">
//             <p className="text-sm text-gray-400">
//               After booking confirmation, you'll receive a call from our support
//               team to confirm delivery/pickup details.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* ── Testimonials ───────────────────────────────────────── */}
//       <section className="py-20 bg-white">
//         <div className="container mx-auto px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="text-center mb-12"
//           >
//             <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
//               TESTIMONIALS
//             </span>
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
//               What Our Customers Say
//             </h2>
//             <p className="text-gray-500 max-w-xl mx-auto text-base">
//               Join thousands of satisfied customers who trust RentRide
//             </p>
//           </motion.div>
//           <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
//             <Testimonial
//               name="Bijay Pandey"
//               role="Business Traveler"
//               text="RentRide made renting a car incredibly easy and stress-free. The vehicle was spotless and perfectly maintained. Highly recommended for business trips!"
//               rating={5}
//               avatarColor="bg-blue-100"
//             />
//             <Testimonial
//               name="Yogesh Bikram Shah"
//               role="Family Vacationer"
//               text="Wide selection of vehicles and competitive pricing. Our family trip was comfortable thanks to their excellent service and well-maintained fleet."
//               rating={4}
//               avatarColor="bg-green-100"
//             />
//             <Testimonial
//               name="Aashriti Karki"
//               role="Adventure Seeker"
//               text="Support team was very helpful and responsive. The 4x4 I rented handled mountain roads perfectly! Will definitely use RentRide again."
//               rating={5}
//               avatarColor="bg-purple-100"
//             />
//           </div>
//         </div>
//       </section>

//       {/* ── FAQ ────────────────────────────────────────────────── */}
//       <section className="py-20 bg-gray-50">
//         <div className="container mx-auto px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="text-center mb-12"
//           >
//             <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
//               FAQ
//             </span>
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
//               Frequently Asked Questions
//             </h2>
//             <p className="text-gray-500 max-w-xl mx-auto text-base">
//               Get answers to common questions
//             </p>
//           </motion.div>
//           <div className="space-y-3 max-w-3xl mx-auto">
//             <Faq
//               q="How do I book a car?"
//               a="Simply choose a vehicle, select your dates, add any extras, and confirm booking with secure payment. You'll receive instant confirmation via email and SMS."
//             />
//             <Faq
//               q="What is included in the insurance?"
//               a="Comprehensive insurance covering collision damage, theft, and third-party liability is included in all rentals. Additional premium coverage is available."
//             />
//             <Faq
//               q="What payment methods are accepted?"
//               a="We accept all major credit cards, debit cards, digital wallets (Khalti, eSewa), and bank transfers."
//             />
//             <Faq
//               q="How does delivery work after confirmation?"
//               a="After booking confirmation, our support team will contact you within 2 hours to confirm delivery/pickup details. For doorstep delivery, the vehicle will be delivered to your specified location. For pickup, you can collect from our nearest branch."
//             />
//             <Faq
//               q="Can I cancel my booking?"
//               a="Yes, free cancellation is available up to 24 hours before your pickup time. After that, a small cancellation fee may apply. Check our cancellation policy for details."
//             />
//             <Faq
//               q="Do you offer long-term rental discounts?"
//               a="Yes! We offer significant discounts for weekly and monthly rentals. Contact our support team for custom pricing on long-term bookings."
//             />
//           </div>
//         </div>
//       </section>

//       {/* ── Stats Section ──────────────────────────────────────── */}
//       <section className="py-16 bg-white">
//         <div className="container mx-auto px-6">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             {[
//               {
//                 value: "98%",
//                 label: "Customer Satisfaction",
//                 icon: FaCheckCircle,
//               },
//               { value: "5-min", label: "Quick Response", icon: FaClock },
//               { value: "रु0", label: "Hidden Fees", icon: FaShieldAlt },
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
//                 <div className="text-3xl font-bold text-blue-600 mb-2">
//                   {stat.value}
//                 </div>
//                 <div className="text-sm text-gray-500 flex items-center justify-center gap-1">
//                   <stat.icon className="text-blue-400" /> {stat.label}
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── CTA Section ────────────────────────────────────────── */}
//       <section className="py-20 bg-gradient-to-r from-gray-900 to-blue-900">
//         <div className="container mx-auto px-6 text-center">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//           >
//             <span className="inline-block px-4 py-1.5 bg-white/10 text-white rounded-full text-sm font-semibold mb-6 backdrop-blur-sm border border-white/20">
//               Start Your Journey Today
//             </span>
//             <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
//               Ready for Your Next Adventure?
//             </h2>
//             <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
//               Join thousands of satisfied customers who trust RentRide for their
//               travel needs
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Link
//                 to="/signup"
//                 className="px-10 py-4 bg-white text-gray-900 font-bold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-block"
//               >
//                 Sign Up Now
//               </Link>
//               <Link
//                 to="/login"
//                 className="px-10 py-4 bg-transparent border-2 border-white/50 text-white font-bold rounded-xl hover:bg-white/10 hover:border-white transition-all duration-300 inline-block"
//               >
//                 Login to Account
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* ── Footer ─────────────────────────────────────────────── */}
//       <footer id="contact" className="bg-gray-900 text-white pt-20 pb-8">
//         <div className="container mx-auto px-6">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
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
//                     Premium Car Rental
//                   </p>
//                 </div>
//               </div>
//               <p className="text-gray-400 mb-6 text-sm leading-relaxed">
//                 Premium car rental service in Kathmandu. Experience luxury,
//                 reliability, and exceptional service.
//               </p>
//               <div className="flex gap-3">
//                 {[FaFacebook, FaTwitter, FaInstagram, FaWhatsapp].map(
//                   (Icon, idx) => (
//                     <div
//                       key={idx}
//                       className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer"
//                     >
//                       <Icon size={14} />
//                     </div>
//                   ),
//                 )}
//               </div>
//             </div>

//             <div>
//               <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
//               <ul className="space-y-3">
//                 {[
//                   { label: "Browse Cars", href: "#vehicles" },
//                   { label: "How It Works", href: "#how-it-works" },
//                   { label: "About Us", href: "#contact" },
//                   { label: "Contact", href: "#contact" },
//                 ].map((link) => (
//                   <li key={link.label}>
//                     <a
//                       href={link.href}
//                       className="text-gray-400 hover:text-white transition-all duration-200 text-sm block"
//                     >
//                       {link.label}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div>
//               <h4 className="text-lg font-bold mb-6 text-white">
//                 Our Services
//               </h4>
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
//               <h4 className="text-lg font-bold mb-6 text-white">
//                 Contact Info
//               </h4>
//               <ul className="text-gray-400 space-y-4 text-sm">
//                 <li className="flex items-start gap-3">
//                   <FaMapMarkerAlt className="mt-1 text-blue-400 flex-shrink-0" />
//                   <span>Kathmandu, Nepal</span>
//                 </li>
//                 <li className="flex items-center gap-3">
//                   <FaPhone className="text-blue-400 flex-shrink-0" />
//                   <span>+977 9844177965</span>
//                 </li>
//                 <li className="flex items-center gap-3">
//                   <FaEnvelope className="text-blue-400 flex-shrink-0" />
//                   <span>support@rentride.com</span>
//                 </li>
//                 <li className="flex items-center gap-3">
//                   <FaClock className="text-blue-400 flex-shrink-0" />
//                   <span>24/7 Support</span>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div className="border-t border-gray-800 pt-8 text-center">
//             <p className="text-gray-500 text-sm">
//               &copy; {new Date().getFullYear()} RentRide. All rights reserved.
//             </p>
//             <p className="text-gray-600 text-xs mt-2">
//               Premium car rental service in Kathmandu
//             </p>
//           </div>
//         </div>
//       </footer>

//       {/* ── Bike Detail Modal ──────────────────────────────────── */}
//       <AnimatePresence>
//         {showBikeModal && selectedBike && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[100]"
//           >
//             <div
//               className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//               onClick={() => setShowBikeModal(false)}
//             ></div>
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="absolute inset-0 flex items-center justify-center p-4"
//             >
//               <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//                 <div className="sticky top-0 bg-white border-b border-gray-100 px-8 py-5 flex justify-between items-center z-10">
//                   <div>
//                     <h2 className="text-2xl font-bold text-gray-900">
//                       {selectedBike.bikeName}
//                     </h2>
//                     <div className="flex items-center gap-2 mt-2">
//                       <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-semibold border border-purple-100">
//                         {selectedBike.bikeType}
//                       </span>
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-semibold ${selectedBike.status === "Available" ? "bg-green-50 text-green-600 border border-green-100" : "bg-red-50 text-red-600 border border-red-100"}`}
//                       >
//                         {selectedBike.status}
//                       </span>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => setShowBikeModal(false)}
//                     className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-red-50 hover:text-red-500 rounded-full transition-all duration-200 text-gray-500 text-xl font-light"
//                   >
//                     ×
//                   </button>
//                 </div>
//                 <div className="p-8">
//                   {selectedBike.photos?.length > 0 ? (
//                     <div className="grid grid-cols-3 gap-4 mb-8">
//                       {selectedBike.photos.map((photo, idx) => (
//                         <div
//                           key={idx}
//                           className={`${idx === 0 ? "col-span-2" : ""} relative rounded-2xl overflow-hidden`}
//                           style={{ height: idx === 0 ? "240px" : "112px" }}
//                         >
//                           <img
//                             src={`http://localhost:5000/uploads/bikes/${photo.filename}`}
//                             alt={photo.label}
//                             className="w-full h-full object-cover"
//                           />
//                           <div className="absolute bottom-3 left-3 bg-black/60 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm">
//                             {photo.label}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="h-56 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mb-8">
//                       <FaMotorcycle className="text-8xl text-gray-300" />
//                     </div>
//                   )}
//                   <div className="grid grid-cols-2 gap-4 mb-6">
//                     {[
//                       { label: "Brand", value: selectedBike.brand },
//                       { label: "Model", value: selectedBike.model },
//                       { label: "Year", value: selectedBike.year },
//                       { label: "Engine", value: selectedBike.engineCapacity },
//                       { label: "Fuel", value: selectedBike.fuelType },
//                       {
//                         label: "Transmission",
//                         value: selectedBike.transmission,
//                       },
//                       { label: "Mileage", value: selectedBike.mileage },
//                       { label: "Contact", value: selectedBike.phoneNumber },
//                     ]
//                       .filter((s) => s.value)
//                       .map((spec, i) => (
//                         <div
//                           key={i}
//                           className="flex items-center p-4 bg-gray-50 rounded-xl"
//                         >
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
//                   </div>
//                   {selectedBike.features?.length > 0 && (
//                     <div className="mb-6">
//                       <h3 className="text-lg font-bold text-gray-900 mb-3">
//                         Features
//                       </h3>
//                       <div className="flex flex-wrap gap-2">
//                         {selectedBike.features.map((f, i) => (
//                           <span
//                             key={i}
//                             className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg font-medium"
//                           >
//                             {f}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                   <div className="bg-gradient-to-b from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-lg">
//                     <div className="text-center mb-5">
//                       <p className="text-gray-500 mb-1">Daily Rate</p>
//                       <div className="flex items-baseline justify-center">
//                         <span className="text-5xl font-bold text-gray-900">
//                           रु {selectedBike.ratePerDay?.toLocaleString()}
//                         </span>
//                         <span className="text-gray-500 ml-2">/day</span>
//                       </div>
//                     </div>
//                     <button
//                       onClick={() => {
//                         if (selectedBike.status === "Available") {
//                           navigate(`/bike-booking/${selectedBike._id}`);
//                           setShowBikeModal(false);
//                         }
//                       }}
//                       disabled={selectedBike.status !== "Available"}
//                       className={`w-full px-8 py-4 font-bold rounded-xl transition-all duration-300 ${selectedBike.status === "Available" ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-2xl hover:shadow-green-500/30 hover:scale-105" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
//                     >
//                       {selectedBike.status === "Available"
//                         ? "Book This Bike"
//                         : `Currently ${selectedBike.status}`}
//                     </button>
//                     <div className="mt-4 text-center">
//                       <p className="text-gray-500 text-sm">
//                         Free cancellation - 24/7 support - Instant confirmation
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* ── Vehicle Details Modal ──────────────────────────────── */}
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
//                 <div className="sticky top-0 bg-white border-b border-gray-100 px-8 py-5 flex justify-between items-center z-10">
//                   <div>
//                     <h2 className="text-2xl font-bold text-gray-900">
//                       {selectedVehicle.carName}
//                     </h2>
//                     <div className="flex items-center gap-2 mt-2">
//                       <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold border border-blue-100">
//                         {selectedVehicle.carType}
//                       </span>
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                           selectedVehicle.status === "Available"
//                             ? "bg-green-50 text-green-600 border border-green-100"
//                             : "bg-red-50 text-red-600 border border-red-100"
//                         }`}
//                       >
//                         {selectedVehicle.status}
//                       </span>
//                       {selectedVehicle.carNumber && (
//                         <span className="text-gray-400 text-xs">
//                           #{selectedVehicle.carNumber}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => setShowDetailsModal(false)}
//                     className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-red-50 hover:text-red-500 rounded-full transition-all duration-200 text-gray-500 text-xl font-light"
//                   >
//                     ×
//                   </button>
//                 </div>

//                 <div className="p-8">
//                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
//                     {selectedVehicle.photos &&
//                     selectedVehicle.photos.length > 0 ? (
//                       selectedVehicle.photos.map((photo, index) => (
//                         <div
//                           key={index}
//                           className={index === 0 ? "lg:col-span-2" : ""}
//                         >
//                           <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden">
//                             <img
//                               src={`http://localhost:5000/uploads/${
//                                 selectedVehicle.source === "user"
//                                   ? "user-vehicles"
//                                   : "vehicles"
//                               }/${photo.filename}`}
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
//                               <spec.icon className="text-blue-600" />
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
//                               Features and Amenities
//                             </h3>
//                             <div className="flex flex-wrap gap-3">
//                               {selectedVehicle.features.map(
//                                 (feature, index) => (
//                                   <span
//                                     key={index}
//                                     className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium"
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
//                               रु {selectedVehicle.ratePerDay?.toLocaleString()}
//                             </span>
//                             <span className="text-gray-500 ml-2">/day</span>
//                           </div>
//                         </div>
//                         <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
//                           <div className="flex items-start">
//                             <FaInfoCircle className="text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
//                             <div>
//                               <h4 className="font-semibold text-blue-800 mb-1">
//                                 Complete Price Breakdown
//                               </h4>
//                               <p className="text-sm text-blue-700">
//                                 Full price calculation including optional
//                                 extras, service fee, and taxes will be shown
//                                 during booking.
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                         <button
//                           onClick={() => {
//                             handleBookNow(selectedVehicle);
//                             setShowDetailsModal(false);
//                           }}
//                           className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-green-500/30 hover:scale-105 transition-all duration-300"
//                         >
//                           Book This Vehicle
//                         </button>
//                         <div className="mt-6 text-center">
//                           <p className="text-gray-500 text-sm">
//                             Free cancellation - 24/7 support - Instant
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

//       {/* ── Scroll to Top ──────────────────────────────────────── */}
//       <AnimatePresence>
//         {showScrollTop && (
//           <motion.button
//             initial={{ opacity: 0, scale: 0 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0 }}
//             onClick={scrollToTop}
//             className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
//           >
//             <FaArrowUp />
//           </motion.button>
//         )}
//       </AnimatePresence>
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
  FaQuoteLeft,
  FaExchangeAlt,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/* Component imports */
import TestimonialsCarousel from "./TestimonialsCarousel";
import VehicleComparison from "./VehicleComparison";

/* Image imports */
import heroVideo from "../../assets/Dashboard/INtro.mp4";
import sedan from "../../assets/Dashboard/sedan.jpg";
import suv from "../../assets/Dashboard/suv.jpg";
import ev from "../../assets/Dashboard/ev.jpg";
import convertible from "../../assets/Dashboard/convertible.jpg";
import minivan from "../../assets/Dashboard/minivan.jpg";
import sport from "../../assets/Dashboard/sport.jpg";

const API_URL = "http://localhost:5000/api";

/* ── Testimonial Card ─────────────────────────────────────── */
const Testimonial = ({ name, role, text, rating, avatarColor }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="bg-white rounded-2xl p-7 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-3xl pointer-events-none" />
    <FaQuoteLeft className="text-blue-100 text-3xl mb-4" />
    <p className="text-gray-600 leading-relaxed mb-6 text-sm">{text}</p>
    <div className="flex items-center gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={`text-sm ${i < rating ? "text-yellow-400" : "text-gray-200"}`}
        />
      ))}
    </div>
    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
      <div
        className={`w-11 h-11 rounded-full ${avatarColor} flex items-center justify-center text-blue-600 font-bold text-lg`}
      >
        {name.charAt(0)}
      </div>
      <div>
        <p className="font-semibold text-gray-900 text-sm">{name}</p>
        <p className="text-gray-400 text-xs">{role}</p>
      </div>
    </div>
  </motion.div>
);

/* ── FAQ Accordion ────────────────────────────────────────── */
const Faq = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
      onClick={() => setOpen(!open)}
    >
      <button className="w-full flex items-center justify-between px-6 py-5 text-left">
        <span className="font-semibold text-gray-900 text-sm pr-4">{q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <FaChevronDown className="text-blue-500 text-sm" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-3">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Home() {
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
  
  // Comparison modals state
  const [showVehicleComparison, setShowVehicleComparison] = useState(false);
  const [showBikeComparison, setShowBikeComparison] = useState(false);

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
        className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 cursor-pointer h-full flex flex-col hover:-translate-y-1"
        onClick={() => {
          setSelectedBike(bike);
          setShowBikeModal(true);
        }}
      >
        <div className="absolute top-3 left-3 z-10">
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-bold tracking-wide ${
              isAvailable ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            {bike.status}
          </span>
        </div>
        <div className="h-52 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0 relative">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={bike.bikeName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
              <FaMotorcycle className="text-6xl text-gray-300" />
              <span className="text-xs text-gray-400">No image available</span>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-lg font-bold text-gray-900 leading-tight truncate">
              {bike.bikeName}
            </h3>
            <span className="flex-shrink-0 px-2 py-0.5 bg-purple-50 text-purple-600 text-xs font-semibold rounded-full border border-purple-100">
              {bike.bikeType}
            </span>
          </div>
          <p className="text-xs text-gray-400 mb-3">
            {bike.brand} {bike.model}
          </p>
          <div className="flex items-center gap-4 py-3 px-3 bg-gray-50 rounded-xl mb-4">
            <div className="flex items-center gap-1.5 text-gray-600 text-xs">
              <FaCogs size={12} className="text-purple-500" />
              <span className="font-medium">{bike.transmission}</span>
            </div>
            {bike.engineCapacity && (
              <>
                <div className="w-px h-3 bg-gray-300" />
                <div className="flex items-center gap-1.5 text-gray-600 text-xs">
                  <span className="font-medium">{bike.engineCapacity}</span>
                </div>
              </>
            )}
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Daily rate</p>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-gray-900">
                  रु {bike.ratePerDay?.toLocaleString()}
                </span>
                <span className="text-xs text-gray-400">/day</span>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedBike(bike);
                setShowBikeModal(true);
              }}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300"
            >
              View Details
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  const formatPrice = (price) => `रु ${price?.toLocaleString()}`;

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

    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        viewport={{ once: true, margin: "-50px" }}
        className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 cursor-pointer h-full flex flex-col hover:-translate-y-1"
        onClick={() => handleViewDetails(vehicle)}
      >
        <button
          onClick={(e) => toggleFavorite(vehicle._id, e)}
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

        <div className="h-52 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 relative flex-shrink-0">
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

        <div className="p-5 flex flex-col flex-grow">
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

          <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
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
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="relative w-24 h-24 mx-auto mb-6"
          >
            <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full"></div>
            <div className="absolute inset-2 border-4 border-t-transparent border-r-cyan-400 border-b-transparent border-l-transparent rounded-full"></div>
            <FaCar className="absolute inset-0 m-auto text-white text-2xl animate-pulse" />
          </motion.div>
          <p className="text-white/80 text-lg">Loading premium vehicles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center">
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
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="font-sans text-gray-900 bg-gray-50">
      {/* ── Navbar ──────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => scrollToSection("home")}
          >
            <div className="p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
              <FaCar className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
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
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {item.label}
                {activeNav === item.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
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
                className="w-full pl-11 pr-4 py-3 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-5 py-2 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300 text-sm"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl transition-all"
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
              className="w-full pl-11 pr-4 py-3 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </nav>

      {/* ── Hero Section ───────────────────────────────────────── */}
      <section
        id="home"
        className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white pt-24"
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>
          <video
            src={heroVideo}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        </div>
        <div className="container mx-auto px-6 py-24 md:py-32 relative z-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/20">
                ✨ Premium Service Since 2024
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
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection("vehicles")}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:shadow-2xl transition-all"
                >
                  Explore Cars
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection("how-it-works")}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-xl hover:bg-white/20"
                >
                  How It Works
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative z-20 pb-8">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-2xl py-8 px-4 grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-gray-100"
            >
              {[
                { value: "10K+", label: "Happy Customers" },
                { value: "200+", label: "Premium Vehicles" },
                { value: "15+", label: "Cities" },
                { value: "24/7", label: "Support" },
              ].map((stat, idx) => (
                <div key={idx} className="text-center px-6">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Features / Why Choose Us ───────────────────────────── */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
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
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: FaCar,
                title: "Wide Selection",
                description: "Choose from premium vehicles for every need",
                gradient: "from-blue-500 to-cyan-400",
              },
              {
                icon: FaCheckCircle,
                title: "Easy Booking",
                description: "Book in 3 simple steps, 24/7 availability",
                gradient: "from-green-500 to-emerald-400",
              },
              {
                icon: FaShieldAlt,
                title: "Fully Insured",
                description: "Comprehensive coverage for peace of mind",
                gradient: "from-purple-500 to-pink-400",
              },
              {
                icon: FaCreditCard,
                title: "Flexible Payment",
                description: "Multiple payment options available",
                gradient: "from-orange-500 to-yellow-400",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group bg-white p-7 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-gray-50 to-transparent rounded-bl-3xl pointer-events-none" />
                <div
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-5 group-hover:scale-110 transition-transform duration-300 shadow-md`}
                >
                  <feature.icon className="text-white text-3xl" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Fleet Section — Tabbed Cars / Bikes ────────────────── */}
      <section id="vehicles" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-3">
              FLEET COLLECTION
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-3">
              Choose Your Perfect Ride
            </h2>
            <p className="text-gray-500 text-base max-w-xl mx-auto">
              Browse our premium cars or explore our bike collection
            </p>
          </motion.div>

          {/* Tab Switcher */}
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
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    activeTab === "cars"
                      ? "bg-white/20 text-white"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {vehicles.length}
                </span>
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
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    activeTab === "bikes"
                      ? "bg-white/20 text-white"
                      : "bg-purple-100 text-purple-600"
                  }`}
                >
                  {bikes.length}
                </span>
              </button>
            </div>
          </div>

          {/* ── Cars Tab ── */}
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
                    {filter}{" "}
                    {filter === "All vehicles" && `(${vehicles.length})`}
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

              {filteredVehicles.length === 0 ? (
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
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredVehicles.map((vehicle, idx) => (
                    <CarCard key={vehicle._id} vehicle={vehicle} index={idx} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Bikes Tab ── */}
          {activeTab === "bikes" && (
            <div>
              <div className="flex flex-wrap gap-2 mb-8 justify-center">
                {bikeTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setBikeFilter(type)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                      bikeFilter === type
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25 scale-105"
                        : "bg-white text-gray-600 hover:bg-gray-100 shadow-sm border border-gray-200 hover:border-purple-200 hover:text-purple-600"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Compare Bikes Button */}
              {!bikesLoading && filteredBikes.length > 0 && (
                <div className="flex justify-center mb-8">
                  <button
                    onClick={() => setShowBikeComparison(true)}
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-2xl hover:scale-105 transition-all inline-flex items-center gap-2"
                  >
                    <FaExchangeAlt /> Compare Bikes
                  </button>
                </div>
              )}

              {bikesLoading ? (
                <div className="text-center py-24">
                  <div className="relative w-16 h-16 mx-auto mb-5">
                    <div className="absolute inset-0 border-4 border-purple-100 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-t-purple-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                    <FaMotorcycle className="absolute inset-0 m-auto text-purple-400 text-lg" />
                  </div>
                  <p className="text-gray-500 font-medium">Loading bikes...</p>
                </div>
              ) : filteredBikes.length === 0 ? (
                <div className="text-center py-24">
                  <div className="w-24 h-24 mx-auto mb-5 flex items-center justify-center bg-purple-50 rounded-3xl">
                    <FaMotorcycle className="text-4xl text-purple-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No bikes found
                  </h3>
                  <p className="text-gray-500">
                    Try selecting a different category
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredBikes.map((bike, idx) => (
                    <HomeBikeCard key={bike._id} bike={bike} index={idx} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── How It Works ───────────────────────────────────────── */}
      <section
        id="how-it-works"
        className="py-20 bg-gradient-to-r from-gray-900 to-blue-900"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 bg-white/10 text-white rounded-full text-sm font-semibold mb-4 backdrop-blur-sm border border-white/20">
              SIMPLE PROCESS
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
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
                gradient: "from-blue-500 to-cyan-400",
              },
              {
                number: "02",
                title: "Book & Pay",
                desc: "Select dates, add extras, and complete secure payment",
                icon: FaCreditCard,
                gradient: "from-green-500 to-emerald-400",
              },
              {
                number: "03",
                title: "Get Your Vehicle",
                desc: "Pick up from our location or get doorstep delivery",
                icon: FaMapMarkerAlt,
                gradient: "from-purple-500 to-pink-400",
              },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="relative text-center"
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-xl font-bold text-blue-600 z-10">
                  {step.number}
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 pt-14 border border-white/20 hover:border-white/40 transition-all">
                  <div
                    className={`inline-flex p-5 rounded-2xl bg-gradient-to-r ${step.gradient} mb-5 shadow-lg`}
                  >
                    <step.icon className="text-white text-3xl" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-300">{step.desc}</p>
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

      {/* ── Delivery Options ───────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
              DELIVERY
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Delivery Options
            </h2>
            <p className="text-gray-500">
              Choose how you want to receive your vehicle
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: FaMapMarkerAlt,
                title: "Pickup from Location",
                desc: "Collect your vehicle from our nearest branch. Our team will assist you with the handover process.",
                color: "bg-blue-100 text-blue-600",
                items: [
                  "Free pickup service",
                  "Vehicle inspection on site",
                  "Document verification",
                ],
              },
              {
                icon: FaTruck,
                title: "Doorstep Delivery",
                desc: "Get your vehicle delivered to your home, hotel, or office. Our driver will bring the car to you.",
                color: "bg-green-100 text-green-600",
                items: [
                  "Delivery within Kathmandu Valley",
                  "Free delivery for 3+ days booking",
                  "Real-time tracking available",
                ],
              },
            ].map((option, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-7 shadow-md hover:shadow-xl transition-all border border-gray-100 text-center"
              >
                <div
                  className={`w-16 h-16 ${option.color} rounded-2xl flex items-center justify-center mx-auto mb-5`}
                >
                  <option.icon className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {option.title}
                </h3>
                <p className="text-gray-500 text-sm mb-5">{option.desc}</p>
                <ul className="text-left text-sm text-gray-500 space-y-2">
                  {option.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500 text-sm flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              After booking confirmation, you'll receive a call from our support
              team to confirm delivery/pickup details.
            </p>
          </div>
        </div>
      </section>

      {/* ── Testimonials Section ───────────────────────────────── */}
      <TestimonialsCarousel />

      {/* ── FAQ ────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
              FAQ
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-base">
              Get answers to common questions
            </p>
          </motion.div>
          <div className="space-y-3 max-w-3xl mx-auto">
            <Faq
              q="How do I book a car?"
              a="Simply choose a vehicle, select your dates, add any extras, and confirm booking with secure payment. You'll receive instant confirmation via email and SMS."
            />
            <Faq
              q="What is included in the insurance?"
              a="Comprehensive insurance covering collision damage, theft, and third-party liability is included in all rentals. Additional premium coverage is available."
            />
            <Faq
              q="What payment methods are accepted?"
              a="We accept all major credit cards, debit cards, digital wallets (Khalti, eSewa), and bank transfers."
            />
            <Faq
              q="How does delivery work after confirmation?"
              a="After booking confirmation, our support team will contact you within 2 hours to confirm delivery/pickup details. For doorstep delivery, the vehicle will be delivered to your specified location. For pickup, you can collect from our nearest branch."
            />
            <Faq
              q="Can I cancel my booking?"
              a="Yes, free cancellation is available up to 24 hours before your pickup time. After that, a small cancellation fee may apply. Check our cancellation policy for details."
            />
            <Faq
              q="Do you offer long-term rental discounts?"
              a="Yes! We offer significant discounts for weekly and monthly rentals. Contact our support team for custom pricing on long-term bookings."
            />
          </div>
        </div>
      </section>

      {/* ── Stats Section ──────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                value: "98%",
                label: "Customer Satisfaction",
                icon: FaCheckCircle,
              },
              { value: "5-min", label: "Quick Response", icon: FaClock },
              { value: "रु0", label: "Hidden Fees", icon: FaShieldAlt },
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
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 flex items-center justify-center gap-1">
                  <stat.icon className="text-blue-400" /> {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-blue-900">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
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
              <Link
                to="/signup"
                className="px-10 py-4 bg-white text-gray-900 font-bold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-block"
              >
                Sign Up Now
              </Link>
              <Link
                to="/login"
                className="px-10 py-4 bg-transparent border-2 border-white/50 text-white font-bold rounded-xl hover:bg-white/10 hover:border-white transition-all duration-300 inline-block"
              >
                Login to Account
              </Link>
            </div>
          </motion.div>
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
              <div className="flex gap-3">
                {[FaFacebook, FaTwitter, FaInstagram, FaWhatsapp].map(
                  (Icon, idx) => (
                    <div
                      key={idx}
                      className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer"
                    >
                      <Icon size={14} />
                    </div>
                  ),
                )}
              </div>
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
                Our Services
              </h4>
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
                  <FaEnvelope className="text-blue-400 flex-shrink-0" />
                  <span>support@rentride.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaClock className="text-blue-400 flex-shrink-0" />
                  <span>24/7 Support</span>
                </li>
              </ul>
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

      {/* ── Bike Detail Modal ──────────────────────────────────── */}
      <AnimatePresence>
        {showBikeModal && selectedBike && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100]"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowBikeModal(false)}
            ></div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-100 px-8 py-5 flex justify-between items-center z-10">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedBike.bikeName}
                    </h2>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-semibold border border-purple-100">
                        {selectedBike.bikeType}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${selectedBike.status === "Available" ? "bg-green-50 text-green-600 border border-green-100" : "bg-red-50 text-red-600 border border-red-100"}`}
                      >
                        {selectedBike.status}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowBikeModal(false)}
                    className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-red-50 hover:text-red-500 rounded-full transition-all duration-200 text-gray-500 text-xl font-light"
                  >
                    ×
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
                    <div className="h-56 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mb-8">
                      <FaMotorcycle className="text-8xl text-gray-300" />
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
                  {selectedBike.features?.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-3">
                        Features
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedBike.features.map((f, i) => (
                          <span
                            key={i}
                            className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg font-medium"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="bg-gradient-to-b from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-lg">
                    <div className="text-center mb-5">
                      <p className="text-gray-500 mb-1">Daily Rate</p>
                      <div className="flex items-baseline justify-center">
                        <span className="text-5xl font-bold text-gray-900">
                          रु {selectedBike.ratePerDay?.toLocaleString()}
                        </span>
                        <span className="text-gray-500 ml-2">/day</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (selectedBike.status === "Available") {
                          navigate(`/bike-booking/${selectedBike._id}`);
                          setShowBikeModal(false);
                        }
                      }}
                      disabled={selectedBike.status !== "Available"}
                      className={`w-full px-8 py-4 font-bold rounded-xl transition-all duration-300 ${selectedBike.status === "Available" ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-2xl hover:shadow-green-500/30 hover:scale-105" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
                    >
                      {selectedBike.status === "Available"
                        ? "Book This Bike"
                        : `Currently ${selectedBike.status}`}
                    </button>
                    <div className="mt-4 text-center">
                      <p className="text-gray-500 text-sm">
                        Free cancellation - 24/7 support - Instant confirmation
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Vehicle Details Modal ──────────────────────────────── */}
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

                      {selectedVehicle.features &&
                        selectedVehicle.features.length > 0 && (
                          <div className="mt-10">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">
                              Features and Amenities
                            </h3>
                            <div className="flex flex-wrap gap-3">
                              {selectedVehicle.features.map(
                                (feature, index) => (
                                  <span
                                    key={index}
                                    className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium"
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
                                Full price calculation including optional
                                extras, service fee, and taxes will be shown
                                during booking.
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Vehicle Comparison Modal ───────────────────────────── */}
      {showVehicleComparison && (
        <VehicleComparison
          vehicles={filteredVehicles}
          onClose={() => setShowVehicleComparison(false)}
          type="car"
        />
      )}

      {/* ── Bike Comparison Modal ──────────────────────────────── */}
      {showBikeComparison && (
        <VehicleComparison
          vehicles={filteredBikes}
          onClose={() => setShowBikeComparison(false)}
          type="bike"
        />
      )}

      {/* ── Scroll to Top ──────────────────────────────────────── */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
          >
            <FaArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}