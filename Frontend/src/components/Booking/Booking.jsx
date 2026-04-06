// // // export default Booking;
// // import React, { useState, useEffect } from "react";
// // import {
// //   FaCar,
// //   FaStar,
// //   FaThumbsUp,
// //   FaThumbsDown,
// //   FaCalendarAlt,
// //   FaClock,
// //   FaMapMarkerAlt,
// //   FaUser,
// //   FaPhone,
// //   FaCreditCard,
// //   FaShieldAlt,
// //   FaArrowLeft,
// //   FaSpinner,
// // } from "react-icons/fa";
// // import { useNavigate, useLocation, useParams } from "react-router-dom";
// // import axios from "axios";

// // const API_URL = "http://localhost:5000/api";

// // // Configure axios with token
// // const axiosInstance = axios.create({
// //   baseURL: API_URL,
// //   timeout: 10000,
// // });

// // // Add request interceptor
// // axiosInstance.interceptors.request.use(
// //   (config) => {
// //     console.log("📤 Axios Request:", {
// //       url: config.url,
// //       method: config.method,
// //       baseURL: config.baseURL,
// //       fullURL: `${config.baseURL}${config.url}`,
// //       headers: config.headers,
// //     });
// //     const token = localStorage.getItem("token");
// //     if (token) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //       console.log("🔑 Token added to request");
// //     } else {
// //       console.log("⚠️ No token found in localStorage");
// //     }
// //     return config;
// //   },
// //   (error) => {
// //     console.error("❌ Axios Request Error:", error);
// //     return Promise.reject(error);
// //   },
// // );

// // // Add response interceptor
// // axiosInstance.interceptors.response.use(
// //   (response) => {
// //     console.log("📥 Axios Response:", {
// //       status: response.status,
// //       url: response.config.url,
// //       data: response.data,
// //     });
// //     return response;
// //   },
// //   (error) => {
// //     console.error("❌ Axios Response Error:", {
// //       message: error.message,
// //       response: error.response?.data,
// //       status: error.response?.status,
// //       url: error.config?.url,
// //     });
// //     return Promise.reject(error);
// //   },
// // );

// // const Booking = () => {
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const { vehicleId } = useParams();
// //   const [selectedDate, setSelectedDate] = useState("");
// //   const [selectedTime, setSelectedTime] = useState("09:00");
// //   const [pickupLocation, setPickupLocation] = useState("Kathmandu, Nepal");
// //   const [dropoffLocation, setDropoffLocation] = useState("Kathmandu, Nepal");
// //   const [bookingDays, setBookingDays] = useState(1);
// //   const [driverOption, setDriverOption] = useState("without");
// //   const [insuranceOption, setInsuranceOption] = useState("basic");
// //   const [vehicleDetails, setVehicleDetails] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const [submitting, setSubmitting] = useState(false);
// //   const [specialRequests, setSpecialRequests] = useState("");
// //   const [emergencyContact, setEmergencyContact] = useState({
// //     name: "",
// //     phone: "",
// //     relationship: "",
// //   });

// //   // Determine available driver options based on vehicle's bookingType
// //   const getAvailableDriverOptions = () => {
// //     if (!vehicleDetails) return { withDriver: false, withoutDriver: false };

// //     const bookingType = vehicleDetails.bookingType || "";

// //     // Check if bookingType indicates both options
// //     if (bookingType.toLowerCase() === "both") {
// //       return { withDriver: true, withoutDriver: true };
// //     }
// //     // Check if only with driver
// //     else if (bookingType.toLowerCase().includes("with driver")) {
// //       return { withDriver: true, withoutDriver: false };
// //     }
// //     // Check if only without driver
// //     else if (bookingType.toLowerCase().includes("without driver")) {
// //       return { withDriver: false, withoutDriver: true };
// //     }
// //     // Default to both if unknown
// //     else {
// //       return { withDriver: true, withoutDriver: true };
// //     }
// //   };

// //   const availableOptions = getAvailableDriverOptions();

// //   // Set default driver option based on availability
// //   useEffect(() => {
// //     if (!availableOptions.withDriver && availableOptions.withoutDriver) {
// //       setDriverOption("without");
// //     } else if (availableOptions.withDriver && !availableOptions.withoutDriver) {
// //       setDriverOption("with");
// //     }
// //   }, [vehicleDetails]);

// //   // Reviews and rating distribution
// //   const reviews = [
// //     {
// //       id: 1,
// //       name: "Sophia Khatun",
// //       date: "May 15, 2024",
// //       rating: 5,
// //       comment:
// //         "Renting the Model S from RentRide was an absolute dream! The car was immaculate, drove like a charm, and the entire process was seamless. Highly recommend!",
// //       likes: 15,
// //       dislikes: 2,
// //       avatarColor: "bg-gradient-to-r from-pink-400 to-rose-500",
// //     },
// //     {
// //       id: 2,
// //       name: "Rajib Takle",
// //       date: "April 22, 2024",
// //       rating: 4,
// //       comment:
// //         "The Model S was great, but there were a few minor issues with the navigation system. Overall, a good experience, but could be better.",
// //       likes: 8,
// //       dislikes: 1,
// //       avatarColor: "bg-gradient-to-r from-blue-400 to-cyan-500",
// //     },
// //     {
// //       id: 3,
// //       name: "Lama Didi",
// //       date: "March 10, 2024",
// //       rating: 5,
// //       comment:
// //         "Absolutely loved the Model S! It was the perfect car for our weekend getaway. RentRide made everything so easy and convenient. Will definitely rent again!",
// //       likes: 20,
// //       dislikes: 3,
// //       avatarColor: "bg-gradient-to-r from-green-400 to-emerald-500",
// //     },
// //   ];

// //   const ratingDistribution = [
// //     { stars: 5, percentage: 75 },
// //     { stars: 4, percentage: 15 },
// //     { stars: 3, percentage: 5 },
// //     { stars: 2, percentage: 3 },
// //     { stars: 1, percentage: 2 },
// //   ];

// //   const timeSlots = [
// //     "09:00",
// //     "10:00",
// //     "11:00",
// //     "12:00",
// //     "13:00",
// //     "14:00",
// //     "15:00",
// //     "16:00",
// //     "17:00",
// //   ];

// //   // Fetch vehicle data when component mounts
// //   useEffect(() => {
// //     const fetchVehicleData = async () => {
// //       try {
// //         setLoading(true);
// //         setError("");

// //         // Check if vehicle data was passed via state
// //         if (location.state?.vehicle) {
// //           console.log("Vehicle data from state:", location.state.vehicle);
// //           setVehicleDetails(location.state.vehicle);
// //           setLoading(false);
// //           return;
// //         }

// //         // Check if vehicle ID is in the URL params
// //         if (vehicleId) {
// //           console.log("Fetching vehicle data for ID:", vehicleId);

// //           // Validate ID format (MongoDB ObjectId is 24 characters)
// //           if (vehicleId.length !== 24) {
// //             console.error("Invalid vehicle ID format:", vehicleId);
// //             setError(
// //               "Invalid vehicle ID format. Please go back and try again.",
// //             );
// //             setLoading(false);
// //             return;
// //           }

// //           let vehicleData = null;
// //           let source = "admin";

// //           // First try to fetch from admin vehicles
// //           try {
// //             console.log("Trying admin vehicles endpoint...");
// //             const adminResponse = await axios.get(
// //               `http://localhost:5000/api/vehicles/${vehicleId}`,
// //               { timeout: 10000 },
// //             );
// //             vehicleData = adminResponse.data;
// //             console.log("✅ Vehicle found in admin collection");
// //           } catch (adminError) {
// //             console.log(
// //               "❌ Vehicle not in admin collection, trying user vehicles public endpoint...",
// //             );

// //             // Try to fetch from user vehicles using PUBLIC endpoint (no auth required)
// //             try {
// //               console.log("Trying user vehicles public endpoint...");
// //               const userResponse = await axios.get(
// //                 `http://localhost:5000/api/user-vehicles/public/${vehicleId}`,
// //                 { timeout: 10000 },
// //               );

// //               console.log("User vehicle public response:", userResponse.data);

// //               if (userResponse.data.success && userResponse.data.data) {
// //                 const userVehicle = userResponse.data.data;
// //                 console.log(
// //                   "✅ User vehicle found via public endpoint:",
// //                   userVehicle,
// //                 );

// //                 // Format user vehicle to match admin vehicle structure
// //                 vehicleData = {
// //                   _id: userVehicle._id,
// //                   carName: userVehicle.carName,
// //                   carNumber: userVehicle.carNumber,
// //                   carType: userVehicle.carType,
// //                   ratePerDay: userVehicle.ratePerDay,
// //                   seats: userVehicle.seats,
// //                   bookingType: userVehicle.bookingType,
// //                   gearType: userVehicle.gearType,
// //                   airCondition: userVehicle.airCondition,
// //                   description: userVehicle.description,
// //                   features: userVehicle.features,
// //                   photos: userVehicle.photos,
// //                   phoneNumber: userVehicle.phoneNumber,
// //                   driverName: userVehicle.driverName,
// //                   status: "Available",
// //                   source: "user",
// //                   owner: userVehicle.owner,
// //                   ownerPhone: userVehicle.ownerPhone,
// //                 };
// //                 source = "user";
// //                 console.log(
// //                   "✅ Vehicle found in user collection via public endpoint",
// //                 );
// //               }
// //             } catch (userError) {
// //               console.log(
// //                 "❌ Vehicle not found in user collection via public endpoint",
// //               );
// //               console.error("User vehicle fetch error:", userError.message);
// //             }
// //           }

// //           if (vehicleData) {
// //             console.log(
// //               "✅ Vehicle data fetched from",
// //               source,
// //               ":",
// //               vehicleData.carName,
// //             );
// //             setVehicleDetails(vehicleData);
// //           } else {
// //             setError(
// //               "Vehicle not found. It may have been removed or is no longer available.",
// //             );
// //           }
// //           setLoading(false);
// //         } else {
// //           console.error("No vehicle data available");
// //           setError("No vehicle selected. Please go back and select a vehicle.");
// //           setLoading(false);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching vehicle data:", error);
// //         setError("Failed to load vehicle details. Please try again.");
// //         setLoading(false);
// //       }
// //     };

// //     fetchVehicleData();
// //   }, [location, vehicleId]);

// //   const calculateTotal = () => {
// //     if (!vehicleDetails)
// //       return {
// //         basePrice: 0,
// //         driverFee: 0,
// //         insuranceFee: 0,
// //         serviceFee: 500,
// //         total: 0,
// //       };

// //     const basePrice = (vehicleDetails.ratePerDay || 5000) * bookingDays;
// //     const driverFee = driverOption === "with" ? 500 * bookingDays : 0;
// //     const insuranceFee = insuranceOption === "premium" ? 1500 * bookingDays : 0;
// //     const serviceFee = 500;

// //     return {
// //       basePrice: basePrice,
// //       driverFee: driverFee,
// //       insuranceFee: insuranceFee,
// //       serviceFee: serviceFee,
// //       total: basePrice + driverFee + insuranceFee + serviceFee,
// //     };
// //   };

// //   const totals = calculateTotal();

// //   // Format Nepalese Rupees with commas
// //   const formatNPR = (amount) => {
// //     return "रु " + amount.toLocaleString("en-NP");
// //   };

// //   // Calculate return date based on pickup date and days
// //   const calculateReturnDate = () => {
// //     if (!selectedDate) return "";
// //     const pickupDate = new Date(selectedDate);
// //     const returnDate = new Date(pickupDate);
// //     returnDate.setDate(returnDate.getDate() + bookingDays);
// //     return returnDate.toISOString().split("T")[0];
// //   };

// //   const handleBookNow = async () => {
// //     console.log("=== handleBookNow START ===");
// //     console.log("Vehicle details:", vehicleDetails);
// //     console.log("Selected date:", selectedDate);
// //     console.log("Emergency contact:", emergencyContact);

// //     // Check if user is logged in
// //     const token =
// //       localStorage.getItem("token") || sessionStorage.getItem("token");
// //     if (!token) {
// //       alert("Please login to book a vehicle");
// //       navigate("/login");
// //       return;
// //     }

// //     if (!vehicleDetails) {
// //       alert("Please select a vehicle first");
// //       return;
// //     }

// //     if (!selectedDate) {
// //       alert("Please select a pickup date");
// //       return;
// //     }

// //     if (!emergencyContact.name || !emergencyContact.phone) {
// //       alert("Please provide emergency contact information");
// //       return;
// //     }

// //     setSubmitting(true);

// //     try {
// //       const returnDate = calculateReturnDate();
// //       const pickupDateTime = new Date(selectedDate);
// //       const returnDateTime = new Date(returnDate);

// //       const bookingData = {
// //         vehicleId: vehicleDetails._id,
// //         pickupDate: pickupDateTime.toISOString(),
// //         pickupTime: selectedTime,
// //         returnDate: returnDateTime.toISOString(),
// //         returnTime: selectedTime,
// //         pickupLocation: pickupLocation,
// //         dropoffLocation: dropoffLocation,
// //         driverOption: driverOption,
// //         insuranceOption: insuranceOption,
// //         specialRequests: specialRequests,
// //         emergencyContact: emergencyContact,
// //         vehicleSource: vehicleDetails.source || "admin",
// //       };

// //       console.log("📤 Submitting booking data:", bookingData);
// //       console.log("🌐 API URL:", `${API_URL}/bookings`);
// //       console.log("🔑 Token present:", !!localStorage.getItem("token"));

// //       const response = await axiosInstance.post("/bookings", bookingData);

// //       console.log("=== ✅ BOOKING RESPONSE ===");
// //       console.log("Response status:", response.status);
// //       console.log("Response data:", response.data);
// //       console.log("Booking ID:", response.data?.data?.booking?.id);

// //       if (!response.data?.data?.booking?.id) {
// //         console.error("❌ No booking ID in response:", response.data);
// //         throw new Error("No booking ID received from server");
// //       }

// //       console.log("🚀 Navigating to upload-documents with state:", {
// //         bookingId: response.data.data.booking.id,
// //         confirmationCode: response.data.data.booking.confirmationCode,
// //       });

// //       navigate("/upload-documents", {
// //         state: {
// //           bookingId: response.data.data.booking.id,
// //           confirmationCode: response.data.data.booking.confirmationCode,
// //           vehicleDetails: vehicleDetails,
// //           driverOption: driverOption,
// //           bookingDetails: {
// //             ...bookingData,
// //             totalAmount: totals.total,
// //             formattedTotal: formatNPR(totals.total),
// //           },
// //         },
// //       });

// //       console.log("✅ Navigation triggered");
// //     } catch (error) {
// //       console.error("=== ❌ BOOKING ERROR ===");
// //       console.error("Error object:", error);
// //       console.error("Error response:", error.response);
// //       console.error("Error message:", error.message);

// //       if (error.response) {
// //         console.error("Server responded with error:", error.response.data);
// //         alert(
// //           error.response.data.message ||
// //             error.response.data.error ||
// //             `Failed to create booking: ${error.response.status}`,
// //         );
// //       } else if (error.request) {
// //         console.error("No response received - server might be down");
// //         alert(
// //           "Cannot connect to server. Please make sure the backend is running on port 5000",
// //         );
// //       } else {
// //         console.error("Request setup error:", error.message);
// //         alert("An error occurred. Please try again.");
// //       }
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   // Get vehicle image URL
// //   const getVehicleImage = () => {
// //     if (
// //       !vehicleDetails ||
// //       !vehicleDetails.photos ||
// //       vehicleDetails.photos.length === 0
// //     ) {
// //       return "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80";
// //     }

// //     const extraView = vehicleDetails.photos.find(
// //       (photo) => photo.label === "Extra View",
// //     );
// //     const photo = extraView || vehicleDetails.photos[0];
// //     const folder =
// //       vehicleDetails.source === "user" ? "user-vehicles" : "vehicles";
// //     return `http://localhost:5000/uploads/${folder}/${photo.filename}`;
// //   };

// //   // Get all vehicle images
// //   const getVehicleImages = () => {
// //     if (
// //       !vehicleDetails ||
// //       !vehicleDetails.photos ||
// //       vehicleDetails.photos.length === 0
// //     ) {
// //       return [
// //         "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
// //         "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
// //         "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
// //       ];
// //     }

// //     const folder =
// //       vehicleDetails.source === "user" ? "user-vehicles" : "vehicles";
// //     return vehicleDetails.photos.map(
// //       (photo) => `http://localhost:5000/uploads/${folder}/${photo.filename}`,
// //     );
// //   };

// //   // Format vehicle features
// //   const getVehicleFeatures = () => {
// //     if (!vehicleDetails) return [];

// //     const features = [];

// //     if (vehicleDetails.features && Array.isArray(vehicleDetails.features)) {
// //       features.push(...vehicleDetails.features);
// //     }

// //     if (vehicleDetails.airCondition === "Yes") {
// //       features.push("Air Conditioning");
// //     }
// //     if (vehicleDetails.gearType) {
// //       features.push(`${vehicleDetails.gearType} Transmission`);
// //     }
// //     if (vehicleDetails.seats) {
// //       features.push(`${vehicleDetails.seats} Seats`);
// //     }

// //     return features;
// //   };

// //   // Loading state
// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
// //           <p className="text-gray-600">Loading vehicle details...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // Error state
// //   if (error || !vehicleDetails) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="text-red-600 text-4xl mb-4">⚠️</div>
// //           <h2 className="text-xl font-semibold mb-2">Error Loading Vehicle</h2>
// //           <p className="text-gray-600 mb-4">{error || "Vehicle not found"}</p>
// //           <div className="space-y-3">
// //             <button
// //               onClick={() => navigate("/rentridehome")}
// //               className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full"
// //             >
// //               Back to Vehicles
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const vehicleImages = getVehicleImages();
// //   const vehicleFeatures = getVehicleFeatures();

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
// //       {/* Header */}
// //       <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
// //         <div className="container mx-auto px-6 py-4">
// //           <div className="flex items-center justify-between">
// //             <div className="flex items-center gap-6">
// //               <button
// //                 onClick={() => navigate(-1)}
// //                 className="p-2 hover:bg-gray-100 rounded-full transition-colors"
// //               >
// //                 <FaArrowLeft className="text-gray-700 text-lg" />
// //               </button>
// //               <div className="flex items-center gap-3">
// //                 <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg">
// //                   <FaCar className="text-white text-2xl" />
// //                 </div>
// //                 <h1 className="text-2xl font-bold text-gray-900">
// //                   Rent<span className="text-blue-600">Ride</span>
// //                 </h1>
// //               </div>
// //             </div>

// //             <nav className="hidden lg:flex items-center space-x-8">
// //               {["Rent", "Sell", "Finance", "Insurance"].map((item) => (
// //                 <a
// //                   key={item}
// //                   href="#"
// //                   className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
// //                 >
// //                   {item}
// //                 </a>
// //               ))}
// //             </nav>

// //             <div className="flex items-center gap-4">
// //               <button
// //                 onClick={() => navigate("/profiledetails")}
// //                 className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
// //               >
// //                 My Bookings
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </header>

// //       <div className="container mx-auto px-6 py-8">
// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// //           {/* Left Column - Vehicle Details & Booking Form */}
// //           <div className="lg:col-span-2 space-y-8">
// //             {/* Vehicle Details Card */}
// //             <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
// //               <div className="p-8">
// //                 <div className="flex flex-col lg:flex-row gap-8">
// //                   {/* Vehicle Image */}
// //                   <div className="lg:w-2/5">
// //                     <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden">
// //                       <img
// //                         src={getVehicleImage()}
// //                         alt={vehicleDetails.carName}
// //                         className="w-full h-full object-cover"
// //                       />
// //                       <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/60 text-white text-sm font-medium rounded-full backdrop-blur-sm">
// //                         {vehicleDetails.carType || "Premium Vehicle"}
// //                       </div>
// //                       {vehicleDetails.source === "user" && (
// //                         <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-purple-500/90 text-white text-sm font-medium rounded-full backdrop-blur-sm">
// //                           Owner Listed
// //                         </div>
// //                       )}
// //                     </div>

// //                     {/* Additional Images */}
// //                     <div className="flex gap-3 mt-4">
// //                       {vehicleImages.slice(1, 3).map((img, index) => (
// //                         <div
// //                           key={index}
// //                           className="flex-1 h-20 rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
// //                         >
// //                           <img
// //                             src={img}
// //                             alt={`${vehicleDetails.carName} ${index + 2}`}
// //                             className="w-full h-full object-cover"
// //                           />
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </div>

// //                   {/* Vehicle Info */}
// //                   <div className="lg:w-3/5">
// //                     <div className="flex items-start justify-between mb-6">
// //                       <div>
// //                         <h1 className="text-3xl font-bold text-gray-900">
// //                           {vehicleDetails.carName}
// //                         </h1>
// //                         <p className="text-gray-600 mt-1">
// //                           {vehicleDetails.carType}
// //                         </p>
// //                         {vehicleDetails.carNumber && (
// //                           <p className="text-sm text-gray-400 mt-1">
// //                             {vehicleDetails.carNumber}
// //                           </p>
// //                         )}

// //                         {/* Rating */}
// //                         <div className="flex items-center gap-3 mt-4">
// //                           <div className="flex items-center bg-gradient-to-r from-yellow-400 to-orange-400 px-4 py-2 rounded-full">
// //                             <span className="text-2xl font-bold text-white mr-2">
// //                               {vehicleDetails.rating || 4.8}
// //                             </span>
// //                             <div className="flex">
// //                               {[...Array(5)].map((_, i) => (
// //                                 <FaStar
// //                                   key={i}
// //                                   className="text-white text-sm"
// //                                   fill="currentColor"
// //                                 />
// //                               ))}
// //                             </div>
// //                           </div>
// //                           <span className="text-gray-600">
// //                             {vehicleDetails.totalReviews || 125} reviews
// //                           </span>
// //                         </div>
// //                       </div>

// //                       <div className="text-right">
// //                         <div className="text-4xl font-bold text-blue-600">
// //                           {formatNPR(vehicleDetails.ratePerDay || 5000)}
// //                         </div>
// //                         <div className="text-gray-500">प्रति दिन</div>
// //                         <div
// //                           className={`mt-2 px-3 py-1 rounded-full text-sm font-medium ${
// //                             vehicleDetails.status === "Available"
// //                               ? "bg-green-100 text-green-600"
// //                               : "bg-red-100 text-red-600"
// //                           }`}
// //                         >
// //                           {vehicleDetails.status || "Available"}
// //                         </div>
// //                       </div>
// //                     </div>

// //                     {/* Features */}
// //                     <div className="mb-8">
// //                       <h3 className="text-lg font-semibold text-gray-900 mb-3">
// //                         Key Features
// //                       </h3>
// //                       <div className="flex flex-wrap gap-2">
// //                         {vehicleFeatures.map((feature, index) => (
// //                           <span
// //                             key={index}
// //                             className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium"
// //                           >
// //                             {feature}
// //                           </span>
// //                         ))}
// //                       </div>
// //                     </div>

// //                     {/* Specifications */}
// //                     <div>
// //                       <h3 className="text-lg font-semibold text-gray-900 mb-3">
// //                         Specifications
// //                       </h3>
// //                       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
// //                         {vehicleDetails.gearType && (
// //                           <div className="p-3 bg-gray-50 rounded-xl text-center">
// //                             <div className="text-sm text-gray-500">
// //                               Transmission
// //                             </div>
// //                             <div className="font-semibold text-gray-900">
// //                               {vehicleDetails.gearType}
// //                             </div>
// //                           </div>
// //                         )}
// //                         {vehicleDetails.seats && (
// //                           <div className="p-3 bg-gray-50 rounded-xl text-center">
// //                             <div className="text-sm text-gray-500">Seats</div>
// //                             <div className="font-semibold text-gray-900">
// //                               {vehicleDetails.seats}
// //                             </div>
// //                           </div>
// //                         )}
// //                         {vehicleDetails.airCondition && (
// //                           <div className="p-3 bg-gray-50 rounded-xl text-center">
// //                             <div className="text-sm text-gray-500">
// //                               Air Condition
// //                             </div>
// //                             <div className="font-semibold text-gray-900">
// //                               {vehicleDetails.airCondition}
// //                             </div>
// //                           </div>
// //                         )}
// //                         <div className="p-3 bg-gray-50 rounded-xl text-center">
// //                           <div className="text-sm text-gray-500">
// //                             Booking Type
// //                           </div>
// //                           <div className="font-semibold text-gray-900">
// //                             {vehicleDetails.bookingType || "Both"}
// //                           </div>
// //                         </div>
// //                         {vehicleDetails.driverName && (
// //                           <div className="p-3 bg-gray-50 rounded-xl text-center">
// //                             <div className="text-sm text-gray-500">Driver</div>
// //                             <div className="font-semibold text-gray-900">
// //                               {vehicleDetails.driverName}
// //                             </div>
// //                           </div>
// //                         )}
// //                         {vehicleDetails.phoneNumber && (
// //                           <div className="p-3 bg-gray-50 rounded-xl text-center">
// //                             <div className="text-sm text-gray-500">Contact</div>
// //                             <div className="font-semibold text-gray-900">
// //                               {vehicleDetails.phoneNumber}
// //                             </div>
// //                           </div>
// //                         )}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Booking Form */}
// //             <div className="bg-white rounded-2xl shadow-lg p-8">
// //               <h2 className="text-2xl font-bold text-gray-900 mb-6">
// //                 Booking Details
// //               </h2>

// //               {/* Rest of the booking form remains the same */}
// //               <div className="space-y-6">
// //                 {/* Date and Time */}
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-2">
// //                       <div className="flex items-center gap-2">
// //                         <FaCalendarAlt className="text-blue-600" />
// //                         Pickup Date
// //                       </div>
// //                     </label>
// //                     <input
// //                       type="date"
// //                       value={selectedDate}
// //                       onChange={(e) => setSelectedDate(e.target.value)}
// //                       min={new Date().toISOString().split("T")[0]}
// //                       className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                       required
// //                     />
// //                     <p className="text-sm text-gray-500 mt-1">
// //                       Return date:{" "}
// //                       {calculateReturnDate() || "Select pickup date first"}
// //                     </p>
// //                   </div>

// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-2">
// //                       <div className="flex items-center gap-2">
// //                         <FaClock className="text-blue-600" />
// //                         Pickup Time
// //                       </div>
// //                     </label>
// //                     <div className="flex flex-wrap gap-2">
// //                       {timeSlots.map((time) => (
// //                         <button
// //                           key={time}
// //                           onClick={() => setSelectedTime(time)}
// //                           className={`px-4 py-2 rounded-lg transition-all duration-300 ${
// //                             selectedTime === time
// //                               ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
// //                               : "bg-gray-100 text-gray-700 hover:bg-gray-200"
// //                           }`}
// //                         >
// //                           {time}
// //                         </button>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Location */}
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-2">
// //                       <div className="flex items-center gap-2">
// //                         <FaMapMarkerAlt className="text-blue-600" />
// //                         Pickup Location
// //                       </div>
// //                     </label>
// //                     <input
// //                       type="text"
// //                       value={pickupLocation}
// //                       onChange={(e) => setPickupLocation(e.target.value)}
// //                       className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                       placeholder="Enter pickup location"
// //                     />
// //                   </div>

// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-2">
// //                       <div className="flex items-center gap-2">
// //                         <FaMapMarkerAlt className="text-green-600" />
// //                         Drop-off Location
// //                       </div>
// //                     </label>
// //                     <input
// //                       type="text"
// //                       value={dropoffLocation}
// //                       onChange={(e) => setDropoffLocation(e.target.value)}
// //                       className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                       placeholder="Enter drop-off location"
// //                     />
// //                   </div>
// //                 </div>

// //                 {/* Duration */}
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Rental Duration
// //                   </label>
// //                   <div className="flex items-center gap-4">
// //                     <button
// //                       onClick={() =>
// //                         setBookingDays(Math.max(1, bookingDays - 1))
// //                       }
// //                       className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-bold text-xl"
// //                     >
// //                       -
// //                     </button>
// //                     <div className="text-center">
// //                       <div className="text-3xl font-bold text-gray-900">
// //                         {bookingDays} day{bookingDays > 1 ? "s" : ""}
// //                       </div>
// //                       <div className="text-gray-500 text-sm">
// //                         Total:{" "}
// //                         {formatNPR(
// //                           (vehicleDetails.ratePerDay || 5000) * bookingDays,
// //                         )}
// //                       </div>
// //                     </div>
// //                     <button
// //                       onClick={() => setBookingDays(bookingDays + 1)}
// //                       className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-bold text-xl"
// //                     >
// //                       +
// //                     </button>
// //                   </div>
// //                 </div>

// //                 {/* Driver Option - DYNAMICALLY SHOWN BASED ON VEHICLE'S BOOKING TYPE */}
// //                 {(availableOptions.withDriver || availableOptions.withoutDriver) && (
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-3">
// //                       <div className="flex items-center gap-2">
// //                         <FaUser className="text-blue-600" />
// //                         Driver Option
// //                       </div>
// //                     </label>
// //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                       {/* With Driver Option - Only show if available */}
// //                       {availableOptions.withDriver && (
// //                         <button
// //                           onClick={() => setDriverOption("with")}
// //                           className={`p-4 rounded-xl border-2 transition-all duration-300 ${
// //                             driverOption === "with"
// //                               ? "border-blue-500 bg-blue-50"
// //                               : "border-gray-200 hover:border-blue-300"
// //                           }`}
// //                         >
// //                           <div className="text-left">
// //                             <div className="font-semibold text-gray-900">
// //                               With Driver
// //                             </div>
// //                             <div className="text-sm text-gray-600 mt-1">
// //                               Professional driver included
// //                             </div>
// //                             <div className="text-blue-600 font-bold mt-2">
// //                               +{formatNPR(500)}/day
// //                             </div>
// //                           </div>
// //                         </button>
// //                       )}

// //                       {/* Without Driver Option - Only show if available */}
// //                       {availableOptions.withoutDriver && (
// //                         <button
// //                           onClick={() => setDriverOption("without")}
// //                           className={`p-4 rounded-xl border-2 transition-all duration-300 ${
// //                             driverOption === "without"
// //                               ? "border-blue-500 bg-blue-50"
// //                               : "border-gray-200 hover:border-blue-300"
// //                           }`}
// //                         >
// //                           <div className="text-left">
// //                             <div className="font-semibold text-gray-900">
// //                               Self Drive
// //                             </div>
// //                             <div className="text-sm text-gray-600 mt-1">
// //                               Drive yourself
// //                             </div>
// //                             <div className="text-green-600 font-bold mt-2">
// //                               No extra cost
// //                             </div>
// //                           </div>
// //                         </button>
// //                       )}
// //                     </div>

// //                     {/* Show message if only one option is available */}
// //                     {(!availableOptions.withDriver || !availableOptions.withoutDriver) && (
// //                       <p className="text-sm text-blue-600 mt-3">
// //                         ⚡ This vehicle is only available for {!availableOptions.withDriver ? "Self Drive" : "With Driver"} booking.
// //                       </p>
// //                     )}
// //                   </div>
// //                 )}

// //                 {/* Insurance Option */}
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-3">
// //                     <div className="flex items-center gap-2">
// //                       <FaShieldAlt className="text-blue-600" />
// //                       Insurance Coverage
// //                     </div>
// //                   </label>
// //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                     <button
// //                       onClick={() => setInsuranceOption("basic")}
// //                       className={`p-4 rounded-xl border-2 transition-all duration-300 ${
// //                         insuranceOption === "basic"
// //                           ? "border-blue-500 bg-blue-50"
// //                           : "border-gray-200 hover:border-blue-300"
// //                       }`}
// //                     >
// //                       <div className="text-left">
// //                         <div className="font-semibold text-gray-900">
// //                           Basic Coverage
// //                         </div>
// //                         <div className="text-sm text-gray-600 mt-1">
// //                           Standard protection
// //                         </div>
// //                         <div className="text-green-600 font-bold mt-2">
// //                           Included
// //                         </div>
// //                       </div>
// //                     </button>
// //                     <button
// //                       onClick={() => setInsuranceOption("premium")}
// //                       className={`p-4 rounded-xl border-2 transition-all duration-300 ${
// //                         insuranceOption === "premium"
// //                           ? "border-blue-500 bg-blue-50"
// //                           : "border-gray-200 hover:border-blue-300"
// //                       }`}
// //                     >
// //                       <div className="text-left">
// //                         <div className="font-semibold text-gray-900">
// //                           Premium Coverage
// //                         </div>
// //                         <div className="text-sm text-gray-600 mt-1">
// //                           Full protection with zero deductible
// //                         </div>
// //                         <div className="text-blue-600 font-bold mt-2">
// //                           +{formatNPR(1500)}/day
// //                         </div>
// //                       </div>
// //                     </button>
// //                   </div>
// //                 </div>

// //                 {/* Emergency Contact */}
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-3">
// //                     <div className="flex items-center gap-2">
// //                       <FaPhone className="text-blue-600" />
// //                       Emergency Contact
// //                     </div>
// //                   </label>
// //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                     <input
// //                       type="text"
// //                       value={emergencyContact.name}
// //                       onChange={(e) =>
// //                         setEmergencyContact({
// //                           ...emergencyContact,
// //                           name: e.target.value,
// //                         })
// //                       }
// //                       className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                       placeholder="Full Name"
// //                       required
// //                     />
// //                     <input
// //                       type="tel"
// //                       value={emergencyContact.phone}
// //                       onChange={(e) =>
// //                         setEmergencyContact({
// //                           ...emergencyContact,
// //                           phone: e.target.value,
// //                         })
// //                       }
// //                       className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                       placeholder="Phone Number"
// //                       required
// //                     />
// //                     <input
// //                       type="text"
// //                       value={emergencyContact.relationship}
// //                       onChange={(e) =>
// //                         setEmergencyContact({
// //                           ...emergencyContact,
// //                           relationship: e.target.value,
// //                         })
// //                       }
// //                       className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                       placeholder="Relationship"
// //                     />
// //                   </div>
// //                 </div>

// //                 {/* Special Requests */}
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Special Requests (Optional)
// //                   </label>
// //                   <textarea
// //                     value={specialRequests}
// //                     onChange={(e) => setSpecialRequests(e.target.value)}
// //                     rows="3"
// //                     className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                     placeholder="Any special requests or requirements?"
// //                   />
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Right Column - Pricing Summary */}
// //           <div className="space-y-8">
// //             <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
// //               <h2 className="text-xl font-bold text-gray-900 mb-6">
// //                 Pricing Summary
// //               </h2>

// //               <div className="space-y-4">
// //                 <div className="flex justify-between py-2">
// //                   <span className="text-gray-600">Base Price</span>
// //                   <span className="font-semibold">
// //                     {formatNPR(totals.basePrice)}
// //                   </span>
// //                 </div>

// //                 {totals.driverFee > 0 && (
// //                   <div className="flex justify-between py-2">
// //                     <span className="text-gray-600">Driver Fee</span>
// //                     <span className="font-semibold">
// //                       {formatNPR(totals.driverFee)}
// //                     </span>
// //                   </div>
// //                 )}

// //                 {totals.insuranceFee > 0 && (
// //                   <div className="flex justify-between py-2">
// //                     <span className="text-gray-600">Premium Insurance</span>
// //                     <span className="font-semibold">
// //                       {formatNPR(totals.insuranceFee)}
// //                     </span>
// //                   </div>
// //                 )}

// //                 <div className="flex justify-between py-2">
// //                   <span className="text-gray-600">Service Fee</span>
// //                   <span className="font-semibold">
// //                     {formatNPR(totals.serviceFee)}
// //                   </span>
// //                 </div>

// //                 <div className="border-t pt-4 mt-2">
// //                   <div className="flex justify-between items-center">
// //                     <span className="text-lg font-bold text-gray-900">
// //                       Total
// //                     </span>
// //                     <span className="text-3xl font-bold text-blue-600">
// //                       {formatNPR(totals.total)}
// //                     </span>
// //                   </div>
// //                 </div>

// //                 <button
// //                   onClick={handleBookNow}
// //                   disabled={submitting}
// //                   className="w-full mt-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-green-500/30 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
// //                 >
// //                   <div className="flex items-center justify-center gap-2">
// //                     {submitting ? (
// //                       <>
// //                         <FaSpinner className="animate-spin" />
// //                         Processing...
// //                       </>
// //                     ) : (
// //                       <>
// //                         <FaCreditCard />
// //                         Continue to Document Upload
// //                       </>
// //                     )}
// //                   </div>
// //                 </button>

// //                 <div className="text-center mt-4">
// //                   <p className="text-gray-500 text-sm">
// //                     Free cancellation up to 24 hours before pickup • 24/7
// //                     support
// //                   </p>
// //                   <p className="text-blue-600 text-xs mt-2">
// //                     Next: Upload your documents for verification
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Ratings and Reviews */}
// //             <div className="bg-white rounded-2xl shadow-lg p-6">
// //               <h2 className="text-xl font-bold text-gray-900 mb-6">
// //                 Ratings & Reviews
// //               </h2>

// //               {/* Overall Rating */}
// //               <div className="flex items-center gap-6 mb-8">
// //                 <div className="text-center">
// //                   <div className="text-5xl font-bold text-gray-900">
// //                     {vehicleDetails.rating || 4.8}
// //                   </div>
// //                   <div className="flex items-center justify-center mt-2">
// //                     {[...Array(5)].map((_, i) => (
// //                       <FaStar
// //                         key={i}
// //                         className="text-yellow-400"
// //                         fill="currentColor"
// //                       />
// //                     ))}
// //                   </div>
// //                   <div className="text-gray-600 text-sm mt-1">
// //                     {vehicleDetails.totalReviews || 125} reviews
// //                   </div>
// //                 </div>

// //                 {/* Rating Distribution */}
// //                 <div className="flex-1">
// //                   {ratingDistribution.map((item) => (
// //                     <div
// //                       key={item.stars}
// //                       className="flex items-center gap-3 mb-2"
// //                     >
// //                       <div className="flex items-center w-16">
// //                         <span className="text-sm text-gray-600 w-4">
// //                           {item.stars}
// //                         </span>
// //                         <FaStar className="text-yellow-400 ml-1 text-sm" />
// //                       </div>
// //                       <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
// //                         <div
// //                           className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
// //                           style={{ width: `${item.percentage}%` }}
// //                         ></div>
// //                       </div>
// //                       <span className="text-sm text-gray-600 w-10 text-right">
// //                         {item.percentage}%
// //                       </span>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>

// //               {/* Reviews List */}
// //               <div className="space-y-6">
// //                 {reviews.map((review) => (
// //                   <div
// //                     key={review.id}
// //                     className="border-b border-gray-100 pb-6 last:border-0"
// //                   >
// //                     <div className="flex items-start justify-between mb-3">
// //                       <div className="flex items-center gap-3">
// //                         <div
// //                           className={`w-12 h-12 ${review.avatarColor} rounded-full flex items-center justify-center text-white font-bold`}
// //                         >
// //                           {review.name.charAt(0)}
// //                         </div>
// //                         <div>
// //                           <h4 className="font-semibold text-gray-900">
// //                             {review.name}
// //                           </h4>
// //                           <p className="text-gray-500 text-sm">{review.date}</p>
// //                         </div>
// //                       </div>
// //                       <div className="flex items-center gap-1">
// //                         {[...Array(5)].map((_, i) => (
// //                           <FaStar
// //                             key={i}
// //                             className={`text-sm ${
// //                               i < review.rating
// //                                 ? "text-yellow-400"
// //                                 : "text-gray-300"
// //                             }`}
// //                             fill={i < review.rating ? "currentColor" : "none"}
// //                           />
// //                         ))}
// //                       </div>
// //                     </div>

// //                     <p className="text-gray-700 mb-4">{review.comment}</p>

// //                     <div className="flex items-center gap-4">
// //                       <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
// //                         <FaThumbsUp />
// //                         <span className="text-sm">{review.likes}</span>
// //                       </button>
// //                       <button className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors">
// //                         <FaThumbsDown />
// //                         <span className="text-sm">{review.dislikes}</span>
// //                       </button>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>

// //               <button className="w-full mt-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors">
// //                 View All Reviews
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Footer */}
// //       <footer className="bg-gray-900 text-white mt-12 pt-8 pb-6">
// //         <div className="container mx-auto px-6">
// //           <div className="flex flex-col md:flex-row justify-between items-center">
// //             <div className="flex items-center gap-3 mb-4 md:mb-0">
// //               <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg">
// //                 <FaCar className="text-white" />
// //               </div>
// //               <h3 className="text-xl font-bold">
// //                 Rent<span className="text-blue-400">Ride</span>
// //               </h3>
// //             </div>

// //             <div className="flex items-center gap-8 mb-4 md:mb-0">
// //               {["Rent", "Sell", "Finance", "Insurance"].map((item) => (
// //                 <a
// //                   key={item}
// //                   href="#"
// //                   className="text-gray-400 hover:text-white transition-colors"
// //                 >
// //                   {item}
// //                 </a>
// //               ))}
// //             </div>

// //             <div className="text-gray-400 text-sm">
// //               &copy; {new Date().getFullYear()} RentRide. All rights reserved.
// //             </div>
// //           </div>
// //         </div>
// //       </footer>
// //     </div>
// //   );
// // };

// // export default Booking;

// import React, { useState, useEffect } from "react";
// import {
//   FaCar,
//   FaStar,
//   FaThumbsUp,
//   FaThumbsDown,
//   FaCalendarAlt,
//   FaClock,
//   FaMapMarkerAlt,
//   FaUser,
//   FaPhone,
//   FaCreditCard,
//   FaShieldAlt,
//   FaArrowLeft,
//   FaSpinner,
//   FaTrash,
//   FaEdit,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaInfoCircle,
//   FaUserCircle,
// } from "react-icons/fa";
// import { useNavigate, useLocation, useParams } from "react-router-dom";
// import axios from "axios";

// const API_URL = "http://localhost:5000/api";

// // Configure axios with token
// const axiosInstance = axios.create({
//   baseURL: API_URL,
//   timeout: 10000,
// });

// // Add request interceptor
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

// const Booking = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { vehicleId } = useParams();
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedTime, setSelectedTime] = useState("09:00");
//   const [pickupLocation, setPickupLocation] = useState("Kathmandu, Nepal");
//   const [dropoffLocation, setDropoffLocation] = useState("Kathmandu, Nepal");
//   const [bookingDays, setBookingDays] = useState(1);
//   const [driverOption, setDriverOption] = useState("without");
//   const [insuranceOption, setInsuranceOption] = useState("basic");
//   const [vehicleDetails, setVehicleDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [specialRequests, setSpecialRequests] = useState("");
//   const [emergencyContact, setEmergencyContact] = useState({
//     name: "",
//     phone: "",
//     relationship: "",
//   });

//   // Review States
//   const [reviews, setReviews] = useState([]);
//   const [reviewsLoading, setReviewsLoading] = useState(true);
//   const [userReview, setUserReview] = useState(null);
//   const [showReviewForm, setShowReviewForm] = useState(false);
//   const [newRating, setNewRating] = useState(5);
//   const [newComment, setNewComment] = useState("");
//   const [submittingReview, setSubmittingReview] = useState(false);
//   const [deletingReview, setDeletingReview] = useState(false);
//   const [editingReview, setEditingReview] = useState(false);
//   const [hasBookedThisVehicle, setHasBookedThisVehicle] = useState(false);
//   const [userBookingStatus, setUserBookingStatus] = useState(null);
//   const [ratingDistribution, setRatingDistribution] = useState([
//     { stars: 5, percentage: 0, count: 0 },
//     { stars: 4, percentage: 0, count: 0 },
//     { stars: 3, percentage: 0, count: 0 },
//     { stars: 2, percentage: 0, count: 0 },
//     { stars: 1, percentage: 0, count: 0 },
//   ]);
//   const [averageRating, setAverageRating] = useState(0);
//   const [totalReviews, setTotalReviews] = useState(0);

//   const timeSlots = [
//     "09:00",
//     "10:00",
//     "11:00",
//     "12:00",
//     "13:00",
//     "14:00",
//     "15:00",
//     "16:00",
//     "17:00",
//   ];

//   // Determine available driver options based on vehicle's bookingType
//   const getAvailableDriverOptions = () => {
//     if (!vehicleDetails) return { withDriver: false, withoutDriver: false };

//     const bookingType = vehicleDetails.bookingType || "";

//     if (bookingType.toLowerCase() === "both") {
//       return { withDriver: true, withoutDriver: true };
//     } else if (bookingType.toLowerCase().includes("with driver")) {
//       return { withDriver: true, withoutDriver: false };
//     } else if (bookingType.toLowerCase().includes("without driver")) {
//       return { withDriver: false, withoutDriver: true };
//     } else {
//       return { withDriver: true, withoutDriver: true };
//     }
//   };

//   const availableOptions = getAvailableDriverOptions();

//   // Set default driver option based on availability
//   useEffect(() => {
//     if (!availableOptions.withDriver && availableOptions.withoutDriver) {
//       setDriverOption("without");
//     } else if (availableOptions.withDriver && !availableOptions.withoutDriver) {
//       setDriverOption("with");
//     }
//   }, [vehicleDetails]);

//   // Fetch vehicle data, reviews, and user booking status
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         // Fetch vehicle details
//         if (location.state?.vehicle) {
//           setVehicleDetails(location.state.vehicle);
//         } else if (vehicleId) {
//           let vehicleData = null;

//           try {
//             const adminResponse = await axios.get(
//               `http://localhost:5000/api/vehicles/${vehicleId}`,
//               { timeout: 10000 },
//             );
//             vehicleData = adminResponse.data;
//           } catch (adminError) {
//             try {
//               const userResponse = await axios.get(
//                 `http://localhost:5000/api/user-vehicles/public/${vehicleId}`,
//                 { timeout: 10000 },
//               );
//               if (userResponse.data.success && userResponse.data.data) {
//                 const userVehicle = userResponse.data.data;
//                 vehicleData = {
//                   _id: userVehicle._id,
//                   carName: userVehicle.carName,
//                   carNumber: userVehicle.carNumber,
//                   carType: userVehicle.carType,
//                   ratePerDay: userVehicle.ratePerDay,
//                   seats: userVehicle.seats,
//                   bookingType: userVehicle.bookingType,
//                   gearType: userVehicle.gearType,
//                   airCondition: userVehicle.airCondition,
//                   description: userVehicle.description,
//                   features: userVehicle.features,
//                   photos: userVehicle.photos,
//                   phoneNumber: userVehicle.phoneNumber,
//                   driverName: userVehicle.driverName,
//                   status: "Available",
//                   source: "user",
//                   owner: userVehicle.owner,
//                   ownerPhone: userVehicle.ownerPhone,
//                 };
//               }
//             } catch (userError) {
//               console.error("Vehicle not found");
//             }
//           }

//           if (vehicleData) {
//             setVehicleDetails(vehicleData);
//           } else {
//             setError("Vehicle not found");
//           }
//         } else {
//           setError("No vehicle selected");
//         }

//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setError("Failed to load vehicle details");
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [location, vehicleId]);

//   // Fetch reviews and user booking status when vehicle is loaded
//   useEffect(() => {
//     if (vehicleDetails && vehicleDetails._id) {
//       fetchReviews();
//       checkUserBookingStatus();
//     }
//   }, [vehicleDetails]);

//   // Fetch reviews for this vehicle
//   const fetchReviews = async () => {
//     try {
//       setReviewsLoading(true);
//       const response = await axios.get(
//         `${API_URL}/reviews/vehicle/${vehicleDetails._id}`,
//       );

//       if (response.data.success) {
//         setReviews(response.data.data.reviews);
//         updateRatingDistribution(response.data.data.reviews);
//         setAverageRating(response.data.data.averageRating || 0);
//         setTotalReviews(response.data.data.totalReviews || 0);
//       }
//     } catch (error) {
//       console.error("Error fetching reviews:", error);
//     } finally {
//       setReviewsLoading(false);
//     }
//   };

//   // Update rating distribution based on reviews
//   const updateRatingDistribution = (reviewsList) => {
//     const distribution = [
//       { stars: 5, percentage: 0, count: 0 },
//       { stars: 4, percentage: 0, count: 0 },
//       { stars: 3, percentage: 0, count: 0 },
//       { stars: 2, percentage: 0, count: 0 },
//       { stars: 1, percentage: 0, count: 0 },
//     ];

//     reviewsList.forEach((review) => {
//       const idx = 5 - review.rating;
//       if (idx >= 0 && idx < 5) {
//         distribution[idx].count++;
//       }
//     });

//     const total = reviewsList.length;
//     distribution.forEach((item) => {
//       item.percentage = total > 0 ? (item.count / total) * 100 : 0;
//     });

//     setRatingDistribution(distribution);
//   };

//   // Check if current user has booked and completed this vehicle
//   const checkUserBookingStatus = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setHasBookedThisVehicle(false);
//         return;
//       }

//       const response = await axiosInstance.get(
//         `/bookings/user/vehicle/${vehicleDetails._id}/status`,
//       );

//       if (response.data.success) {
//         setHasBookedThisVehicle(response.data.data.hasBooked);
//         setUserBookingStatus(response.data.data.status);

//         // Check if user has already reviewed
//         if (response.data.data.hasBooked) {
//           const reviewResponse = await axiosInstance.get(
//             `/reviews/user/vehicle/${vehicleDetails._id}`,
//           );
//           if (reviewResponse.data.success && reviewResponse.data.data) {
//             setUserReview(reviewResponse.data.data);
//           }
//         }
//       }
//     } catch (error) {
//       console.error("Error checking booking status:", error);
//       setHasBookedThisVehicle(false);
//     }
//   };

//   // Submit a new review
//   const handleSubmitReview = async () => {
//     if (!newComment.trim()) {
//       alert("Please enter a review comment");
//       return;
//     }

//     setSubmittingReview(true);
//     try {
//       const response = await axiosInstance.post("/reviews", {
//         vehicleId: vehicleDetails._id,
//         rating: newRating,
//         comment: newComment,
//       });

//       if (response.data.success) {
//         alert("Review submitted successfully!");
//         setShowReviewForm(false);
//         setNewComment("");
//         setNewRating(5);
//         fetchReviews();
//         checkUserBookingStatus();
//       }
//     } catch (error) {
//       console.error("Error submitting review:", error);
//       alert(error.response?.data?.message || "Failed to submit review");
//     } finally {
//       setSubmittingReview(false);
//     }
//   };

//   // Update an existing review
//   const handleUpdateReview = async () => {
//     if (!newComment.trim()) {
//       alert("Please enter a review comment");
//       return;
//     }

//     setSubmittingReview(true);
//     try {
//       const response = await axiosInstance.put(`/reviews/${userReview._id}`, {
//         rating: newRating,
//         comment: newComment,
//       });

//       if (response.data.success) {
//         alert("Review updated successfully!");
//         setEditingReview(false);
//         setShowReviewForm(false);
//         setNewComment("");
//         setNewRating(5);
//         fetchReviews();
//         checkUserBookingStatus();
//       }
//     } catch (error) {
//       console.error("Error updating review:", error);
//       alert(error.response?.data?.message || "Failed to update review");
//     } finally {
//       setSubmittingReview(false);
//     }
//   };

//   // Delete a review
//   const handleDeleteReview = async () => {
//     if (!window.confirm("Are you sure you want to delete your review?")) {
//       return;
//     }

//     setDeletingReview(true);
//     try {
//       const response = await axiosInstance.delete(`/reviews/${userReview._id}`);

//       if (response.data.success) {
//         alert("Review deleted successfully!");
//         setUserReview(null);
//         setShowReviewForm(false);
//         setEditingReview(false);
//         fetchReviews();
//         checkUserBookingStatus();
//       }
//     } catch (error) {
//       console.error("Error deleting review:", error);
//       alert(error.response?.data?.message || "Failed to delete review");
//     } finally {
//       setDeletingReview(false);
//     }
//   };

//   // Open edit review form
//   const handleEditReview = () => {
//     setNewRating(userReview.rating);
//     setNewComment(userReview.comment);
//     setEditingReview(true);
//     setShowReviewForm(true);
//   };

//   // Get profile image URL
//   const getProfileImageUrl = (user) => {
//     if (user?.profilePhoto) {
//       return `http://localhost:5000/uploads/profiles/${user.profilePhoto}`;
//     }
//     return null;
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   const calculateTotal = () => {
//     if (!vehicleDetails)
//       return {
//         basePrice: 0,
//         driverFee: 0,
//         insuranceFee: 0,
//         serviceFee: 500,
//         total: 0,
//       };

//     const basePrice = (vehicleDetails.ratePerDay || 5000) * bookingDays;
//     const driverFee = driverOption === "with" ? 500 * bookingDays : 0;
//     const insuranceFee = insuranceOption === "premium" ? 1500 * bookingDays : 0;
//     const serviceFee = 500;

//     return {
//       basePrice: basePrice,
//       driverFee: driverFee,
//       insuranceFee: insuranceFee,
//       serviceFee: serviceFee,
//       total: basePrice + driverFee + insuranceFee + serviceFee,
//     };
//   };

//   const totals = calculateTotal();

//   const formatNPR = (amount) => {
//     return "रु " + amount.toLocaleString("en-NP");
//   };

//   const calculateReturnDate = () => {
//     if (!selectedDate) return "";
//     const pickupDate = new Date(selectedDate);
//     const returnDate = new Date(pickupDate);
//     returnDate.setDate(returnDate.getDate() + bookingDays);
//     return returnDate.toISOString().split("T")[0];
//   };

//   const handleBookNow = async () => {
//     const token =
//       localStorage.getItem("token") || sessionStorage.getItem("token");
//     if (!token) {
//       alert("Please login to book a vehicle");
//       navigate("/login");
//       return;
//     }

//     if (!vehicleDetails) {
//       alert("Please select a vehicle first");
//       return;
//     }

//     if (!selectedDate) {
//       alert("Please select a pickup date");
//       return;
//     }

//     if (!emergencyContact.name || !emergencyContact.phone) {
//       alert("Please provide emergency contact information");
//       return;
//     }

//     setSubmitting(true);

//     try {
//       const returnDate = calculateReturnDate();
//       const pickupDateTime = new Date(selectedDate);
//       const returnDateTime = new Date(returnDate);

//       const bookingData = {
//         vehicleId: vehicleDetails._id,
//         pickupDate: pickupDateTime.toISOString(),
//         pickupTime: selectedTime,
//         returnDate: returnDateTime.toISOString(),
//         returnTime: selectedTime,
//         pickupLocation: pickupLocation,
//         dropoffLocation: dropoffLocation,
//         driverOption: driverOption,
//         insuranceOption: insuranceOption,
//         specialRequests: specialRequests,
//         emergencyContact: emergencyContact,
//         vehicleSource: vehicleDetails.source || "admin",
//       };

//       const response = await axiosInstance.post("/bookings", bookingData);

//       if (!response.data?.data?.booking?.id) {
//         throw new Error("No booking ID received from server");
//       }

//       navigate("/upload-documents", {
//         state: {
//           bookingId: response.data.data.booking.id,
//           confirmationCode: response.data.data.booking.confirmationCode,
//           vehicleDetails: vehicleDetails,
//           driverOption: driverOption,
//           bookingDetails: {
//             ...bookingData,
//             totalAmount: totals.total,
//             formattedTotal: formatNPR(totals.total),
//           },
//         },
//       });
//     } catch (error) {
//       console.error("Booking error:", error);
//       alert(error.response?.data?.message || "Failed to create booking");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const getVehicleImage = () => {
//     if (
//       !vehicleDetails ||
//       !vehicleDetails.photos ||
//       vehicleDetails.photos.length === 0
//     ) {
//       return "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80";
//     }

//     const extraView = vehicleDetails.photos.find(
//       (photo) => photo.label === "Extra View",
//     );
//     const photo = extraView || vehicleDetails.photos[0];
//     const folder =
//       vehicleDetails.source === "user" ? "user-vehicles" : "vehicles";
//     return `http://localhost:5000/uploads/${folder}/${photo.filename}`;
//   };

//   const getVehicleImages = () => {
//     if (
//       !vehicleDetails ||
//       !vehicleDetails.photos ||
//       vehicleDetails.photos.length === 0
//     ) {
//       return [
//         "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
//       ];
//     }

//     const folder =
//       vehicleDetails.source === "user" ? "user-vehicles" : "vehicles";
//     return vehicleDetails.photos.map(
//       (photo) => `http://localhost:5000/uploads/${folder}/${photo.filename}`,
//     );
//   };

//   const getVehicleFeatures = () => {
//     if (!vehicleDetails) return [];

//     const features = [];

//     if (vehicleDetails.features && Array.isArray(vehicleDetails.features)) {
//       features.push(...vehicleDetails.features);
//     }

//     if (vehicleDetails.airCondition === "Yes") {
//       features.push("Air Conditioning");
//     }
//     if (vehicleDetails.gearType) {
//       features.push(`${vehicleDetails.gearType} Transmission`);
//     }
//     if (vehicleDetails.seats) {
//       features.push(`${vehicleDetails.seats} Seats`);
//     }

//     return features;
//   };

//   // Render star rating
//   const renderStars = (rating, size = "text-sm") => {
//     return (
//       <div className="flex items-center gap-0.5">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <FaStar
//             key={star}
//             className={`${size} ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
//             fill={star <= rating ? "currentColor" : "none"}
//           />
//         ))}
//       </div>
//     );
//   };

//   // Render star input for review form
//   const renderStarInput = () => {
//     return (
//       <div className="flex items-center gap-2 mb-4">
//         <span className="text-gray-700 font-medium">Your Rating:</span>
//         <div className="flex items-center gap-1">
//           {[1, 2, 3, 4, 5].map((star) => (
//             <button
//               key={star}
//               type="button"
//               onClick={() => setNewRating(star)}
//               className="focus:outline-none transition-transform hover:scale-110"
//             >
//               <FaStar
//                 className={`text-2xl ${star <= newRating ? "text-yellow-400" : "text-gray-300"}`}
//                 fill={star <= newRating ? "currentColor" : "none"}
//               />
//             </button>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading vehicle details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !vehicleDetails) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-red-600 text-4xl mb-4">⚠️</div>
//           <h2 className="text-xl font-semibold mb-2">Error Loading Vehicle</h2>
//           <p className="text-gray-600 mb-4">{error || "Vehicle not found"}</p>
//           <button
//             onClick={() => navigate("/rentridehome")}
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//           >
//             Back to Vehicles
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const vehicleImages = getVehicleImages();
//   const vehicleFeatures = getVehicleFeatures();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       {/* Header */}
//       <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
//         <div className="container mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-6">
//               <button
//                 onClick={() => navigate(-1)}
//                 className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               >
//                 <FaArrowLeft className="text-gray-700 text-lg" />
//               </button>
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg">
//                   <FaCar className="text-white text-2xl" />
//                 </div>
//                 <h1 className="text-2xl font-bold text-gray-900">
//                   Rent<span className="text-blue-600">Ride</span>
//                 </h1>
//               </div>
//             </div>

//             <div className="flex items-center gap-4">
//               <button
//                 onClick={() => navigate("/profiledetails")}
//                 className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
//               >
//                 My Bookings
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="container mx-auto px-6 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Vehicle Details & Booking Form */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Vehicle Details Card */}
//             <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//               <div className="p-8">
//                 <div className="flex flex-col lg:flex-row gap-8">
//                   {/* Vehicle Image */}
//                   <div className="lg:w-2/5">
//                     <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden">
//                       <img
//                         src={getVehicleImage()}
//                         alt={vehicleDetails.carName}
//                         className="w-full h-full object-cover"
//                       />
//                       <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/60 text-white text-sm font-medium rounded-full backdrop-blur-sm">
//                         {vehicleDetails.carType || "Premium Vehicle"}
//                       </div>
//                       {vehicleDetails.source === "user" && (
//                         <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-purple-500/90 text-white text-sm font-medium rounded-full backdrop-blur-sm">
//                           Owner Listed
//                         </div>
//                       )}
//                     </div>

//                     {/* Additional Images */}
//                     <div className="flex gap-3 mt-4">
//                       {vehicleImages.slice(1, 3).map((img, index) => (
//                         <div
//                           key={index}
//                           className="flex-1 h-20 rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
//                         >
//                           <img
//                             src={img}
//                             alt={`${vehicleDetails.carName} ${index + 2}`}
//                             className="w-full h-full object-cover"
//                           />
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Vehicle Info */}
//                   <div className="lg:w-3/5">
//                     <div className="flex items-start justify-between mb-6">
//                       <div>
//                         <h1 className="text-3xl font-bold text-gray-900">
//                           {vehicleDetails.carName}
//                         </h1>
//                         <p className="text-gray-600 mt-1">
//                           {vehicleDetails.carType}
//                         </p>
//                         {vehicleDetails.carNumber && (
//                           <p className="text-sm text-gray-400 mt-1">
//                             {vehicleDetails.carNumber}
//                           </p>
//                         )}

//                         {/* Rating */}
//                         <div className="flex items-center gap-3 mt-4">
//                           <div className="flex items-center bg-gradient-to-r from-yellow-400 to-orange-400 px-4 py-2 rounded-full">
//                             <span className="text-2xl font-bold text-white mr-2">
//                               {averageRating.toFixed(1)}
//                             </span>
//                             {renderStars(
//                               Math.round(averageRating),
//                               "text-sm text-white",
//                             )}
//                           </div>
//                           <span className="text-gray-600">
//                             {totalReviews}{" "}
//                             {totalReviews === 1 ? "review" : "reviews"}
//                           </span>
//                         </div>
//                       </div>

//                       <div className="text-right">
//                         <div className="text-4xl font-bold text-blue-600">
//                           {formatNPR(vehicleDetails.ratePerDay || 5000)}
//                         </div>
//                         <div className="text-gray-500">प्रति दिन</div>
//                         <div
//                           className={`mt-2 px-3 py-1 rounded-full text-sm font-medium ${
//                             vehicleDetails.status === "Available"
//                               ? "bg-green-100 text-green-600"
//                               : "bg-red-100 text-red-600"
//                           }`}
//                         >
//                           {vehicleDetails.status || "Available"}
//                         </div>
//                       </div>
//                     </div>

//                     {/* Features */}
//                     <div className="mb-8">
//                       <h3 className="text-lg font-semibold text-gray-900 mb-3">
//                         Key Features
//                       </h3>
//                       <div className="flex flex-wrap gap-2">
//                         {vehicleFeatures.map((feature, index) => (
//                           <span
//                             key={index}
//                             className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium"
//                           >
//                             {feature}
//                           </span>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Specifications */}
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-900 mb-3">
//                         Specifications
//                       </h3>
//                       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                         {vehicleDetails.gearType && (
//                           <div className="p-3 bg-gray-50 rounded-xl text-center">
//                             <div className="text-sm text-gray-500">
//                               Transmission
//                             </div>
//                             <div className="font-semibold text-gray-900">
//                               {vehicleDetails.gearType}
//                             </div>
//                           </div>
//                         )}
//                         {vehicleDetails.seats && (
//                           <div className="p-3 bg-gray-50 rounded-xl text-center">
//                             <div className="text-sm text-gray-500">Seats</div>
//                             <div className="font-semibold text-gray-900">
//                               {vehicleDetails.seats}
//                             </div>
//                           </div>
//                         )}
//                         {vehicleDetails.airCondition && (
//                           <div className="p-3 bg-gray-50 rounded-xl text-center">
//                             <div className="text-sm text-gray-500">
//                               Air Condition
//                             </div>
//                             <div className="font-semibold text-gray-900">
//                               {vehicleDetails.airCondition}
//                             </div>
//                           </div>
//                         )}
//                         <div className="p-3 bg-gray-50 rounded-xl text-center">
//                           <div className="text-sm text-gray-500">
//                             Booking Type
//                           </div>
//                           <div className="font-semibold text-gray-900">
//                             {vehicleDetails.bookingType || "Both"}
//                           </div>
//                         </div>
//                         {vehicleDetails.driverName && (
//                           <div className="p-3 bg-gray-50 rounded-xl text-center">
//                             <div className="text-sm text-gray-500">Driver</div>
//                             <div className="font-semibold text-gray-900">
//                               {vehicleDetails.driverName}
//                             </div>
//                           </div>
//                         )}
//                         {vehicleDetails.phoneNumber && (
//                           <div className="p-3 bg-gray-50 rounded-xl text-center">
//                             <div className="text-sm text-gray-500">Contact</div>
//                             <div className="font-semibold text-gray-900">
//                               {vehicleDetails.phoneNumber}
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Booking Form */}
//             <div className="bg-white rounded-2xl shadow-lg p-8">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                 Booking Details
//               </h2>

//               <div className="space-y-6">
//                 {/* Date and Time */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       <div className="flex items-center gap-2">
//                         <FaCalendarAlt className="text-blue-600" />
//                         Pickup Date
//                       </div>
//                     </label>
//                     <input
//                       type="date"
//                       value={selectedDate}
//                       onChange={(e) => setSelectedDate(e.target.value)}
//                       min={new Date().toISOString().split("T")[0]}
//                       className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       required
//                     />
//                     <p className="text-sm text-gray-500 mt-1">
//                       Return date:{" "}
//                       {calculateReturnDate() || "Select pickup date first"}
//                     </p>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       <div className="flex items-center gap-2">
//                         <FaClock className="text-blue-600" />
//                         Pickup Time
//                       </div>
//                     </label>
//                     <div className="flex flex-wrap gap-2">
//                       {timeSlots.map((time) => (
//                         <button
//                           key={time}
//                           onClick={() => setSelectedTime(time)}
//                           className={`px-4 py-2 rounded-lg transition-all duration-300 ${
//                             selectedTime === time
//                               ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
//                               : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                           }`}
//                         >
//                           {time}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Location */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       <div className="flex items-center gap-2">
//                         <FaMapMarkerAlt className="text-blue-600" />
//                         Pickup Location
//                       </div>
//                     </label>
//                     <input
//                       type="text"
//                       value={pickupLocation}
//                       onChange={(e) => setPickupLocation(e.target.value)}
//                       className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="Enter pickup location"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       <div className="flex items-center gap-2">
//                         <FaMapMarkerAlt className="text-green-600" />
//                         Drop-off Location
//                       </div>
//                     </label>
//                     <input
//                       type="text"
//                       value={dropoffLocation}
//                       onChange={(e) => setDropoffLocation(e.target.value)}
//                       className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="Enter drop-off location"
//                     />
//                   </div>
//                 </div>

//                 {/* Duration */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Rental Duration
//                   </label>
//                   <div className="flex items-center gap-4">
//                     <button
//                       onClick={() =>
//                         setBookingDays(Math.max(1, bookingDays - 1))
//                       }
//                       className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-bold text-xl"
//                     >
//                       -
//                     </button>
//                     <div className="text-center">
//                       <div className="text-3xl font-bold text-gray-900">
//                         {bookingDays} day{bookingDays > 1 ? "s" : ""}
//                       </div>
//                       <div className="text-gray-500 text-sm">
//                         Total:{" "}
//                         {formatNPR(
//                           (vehicleDetails.ratePerDay || 5000) * bookingDays,
//                         )}
//                       </div>
//                     </div>
//                     <button
//                       onClick={() => setBookingDays(bookingDays + 1)}
//                       className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-bold text-xl"
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>

//                 {/* Driver Option */}
//                 {(availableOptions.withDriver ||
//                   availableOptions.withoutDriver) && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-3">
//                       <div className="flex items-center gap-2">
//                         <FaUser className="text-blue-600" />
//                         Driver Option
//                       </div>
//                     </label>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       {availableOptions.withDriver && (
//                         <button
//                           onClick={() => setDriverOption("with")}
//                           className={`p-4 rounded-xl border-2 transition-all duration-300 ${
//                             driverOption === "with"
//                               ? "border-blue-500 bg-blue-50"
//                               : "border-gray-200 hover:border-blue-300"
//                           }`}
//                         >
//                           <div className="text-left">
//                             <div className="font-semibold text-gray-900">
//                               With Driver
//                             </div>
//                             <div className="text-sm text-gray-600 mt-1">
//                               Professional driver included
//                             </div>
//                             <div className="text-blue-600 font-bold mt-2">
//                               +{formatNPR(500)}/day
//                             </div>
//                           </div>
//                         </button>
//                       )}

//                       {availableOptions.withoutDriver && (
//                         <button
//                           onClick={() => setDriverOption("without")}
//                           className={`p-4 rounded-xl border-2 transition-all duration-300 ${
//                             driverOption === "without"
//                               ? "border-blue-500 bg-blue-50"
//                               : "border-gray-200 hover:border-blue-300"
//                           }`}
//                         >
//                           <div className="text-left">
//                             <div className="font-semibold text-gray-900">
//                               Self Drive
//                             </div>
//                             <div className="text-sm text-gray-600 mt-1">
//                               Drive yourself
//                             </div>
//                             <div className="text-green-600 font-bold mt-2">
//                               No extra cost
//                             </div>
//                           </div>
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {/* Insurance Option */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-3">
//                     <div className="flex items-center gap-2">
//                       <FaShieldAlt className="text-blue-600" />
//                       Insurance Coverage
//                     </div>
//                   </label>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <button
//                       onClick={() => setInsuranceOption("basic")}
//                       className={`p-4 rounded-xl border-2 transition-all duration-300 ${
//                         insuranceOption === "basic"
//                           ? "border-blue-500 bg-blue-50"
//                           : "border-gray-200 hover:border-blue-300"
//                       }`}
//                     >
//                       <div className="text-left">
//                         <div className="font-semibold text-gray-900">
//                           Basic Coverage
//                         </div>
//                         <div className="text-sm text-gray-600 mt-1">
//                           Standard protection
//                         </div>
//                         <div className="text-green-600 font-bold mt-2">
//                           Included
//                         </div>
//                       </div>
//                     </button>
//                     <button
//                       onClick={() => setInsuranceOption("premium")}
//                       className={`p-4 rounded-xl border-2 transition-all duration-300 ${
//                         insuranceOption === "premium"
//                           ? "border-blue-500 bg-blue-50"
//                           : "border-gray-200 hover:border-blue-300"
//                       }`}
//                     >
//                       <div className="text-left">
//                         <div className="font-semibold text-gray-900">
//                           Premium Coverage
//                         </div>
//                         <div className="text-sm text-gray-600 mt-1">
//                           Full protection with zero deductible
//                         </div>
//                         <div className="text-blue-600 font-bold mt-2">
//                           +{formatNPR(1500)}/day
//                         </div>
//                       </div>
//                     </button>
//                   </div>
//                 </div>

//                 {/* Emergency Contact */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-3">
//                     <div className="flex items-center gap-2">
//                       <FaPhone className="text-blue-600" />
//                       Emergency Contact
//                     </div>
//                   </label>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <input
//                       type="text"
//                       value={emergencyContact.name}
//                       onChange={(e) =>
//                         setEmergencyContact({
//                           ...emergencyContact,
//                           name: e.target.value,
//                         })
//                       }
//                       className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="Full Name"
//                       required
//                     />
//                     <input
//                       type="tel"
//                       value={emergencyContact.phone}
//                       onChange={(e) =>
//                         setEmergencyContact({
//                           ...emergencyContact,
//                           phone: e.target.value,
//                         })
//                       }
//                       className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="Phone Number"
//                       required
//                     />
//                     <input
//                       type="text"
//                       value={emergencyContact.relationship}
//                       onChange={(e) =>
//                         setEmergencyContact({
//                           ...emergencyContact,
//                           relationship: e.target.value,
//                         })
//                       }
//                       className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="Relationship"
//                     />
//                   </div>
//                 </div>

//                 {/* Special Requests */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Special Requests (Optional)
//                   </label>
//                   <textarea
//                     value={specialRequests}
//                     onChange={(e) => setSpecialRequests(e.target.value)}
//                     rows="3"
//                     className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="Any special requests or requirements?"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Pricing Summary & Reviews */}
//           <div className="space-y-8">
//             <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
//               <h2 className="text-xl font-bold text-gray-900 mb-6">
//                 Pricing Summary
//               </h2>

//               <div className="space-y-4">
//                 <div className="flex justify-between py-2">
//                   <span className="text-gray-600">Base Price</span>
//                   <span className="font-semibold">
//                     {formatNPR(totals.basePrice)}
//                   </span>
//                 </div>

//                 {totals.driverFee > 0 && (
//                   <div className="flex justify-between py-2">
//                     <span className="text-gray-600">Driver Fee</span>
//                     <span className="font-semibold">
//                       {formatNPR(totals.driverFee)}
//                     </span>
//                   </div>
//                 )}

//                 {totals.insuranceFee > 0 && (
//                   <div className="flex justify-between py-2">
//                     <span className="text-gray-600">Premium Insurance</span>
//                     <span className="font-semibold">
//                       {formatNPR(totals.insuranceFee)}
//                     </span>
//                   </div>
//                 )}

//                 <div className="flex justify-between py-2">
//                   <span className="text-gray-600">Service Fee</span>
//                   <span className="font-semibold">
//                     {formatNPR(totals.serviceFee)}
//                   </span>
//                 </div>

//                 <div className="border-t pt-4 mt-2">
//                   <div className="flex justify-between items-center">
//                     <span className="text-lg font-bold text-gray-900">
//                       Total
//                     </span>
//                     <span className="text-3xl font-bold text-blue-600">
//                       {formatNPR(totals.total)}
//                     </span>
//                   </div>
//                 </div>

//                 <button
//                   onClick={handleBookNow}
//                   disabled={submitting}
//                   className="w-full mt-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-green-500/30 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <div className="flex items-center justify-center gap-2">
//                     {submitting ? (
//                       <>
//                         <FaSpinner className="animate-spin" />
//                         Processing...
//                       </>
//                     ) : (
//                       <>
//                         <FaCreditCard />
//                         Continue to Document Upload
//                       </>
//                     )}
//                   </div>
//                 </button>

//                 <div className="text-center mt-4">
//                   <p className="text-gray-500 text-sm">
//                     Free cancellation up to 24 hours before pickup • 24/7
//                     support
//                   </p>
//                   <p className="text-blue-600 text-xs mt-2">
//                     Next: Upload your documents for verification
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Ratings and Reviews - DYNAMIC VERSION */}
//             <div className="bg-white rounded-2xl shadow-lg p-6">
//               <h2 className="text-xl font-bold text-gray-900 mb-6">
//                 Ratings & Reviews
//               </h2>

//               {/* Overall Rating */}
//               <div className="flex items-center gap-6 mb-8">
//                 <div className="text-center">
//                   <div className="text-5xl font-bold text-gray-900">
//                     {averageRating.toFixed(1)}
//                   </div>
//                   <div className="flex items-center justify-center mt-2">
//                     {renderStars(Math.round(averageRating), "text-sm")}
//                   </div>
//                   <div className="text-gray-600 text-sm mt-1">
//                     {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
//                   </div>
//                 </div>

//                 {/* Rating Distribution */}
//                 <div className="flex-1">
//                   {ratingDistribution.map((item) => (
//                     <div
//                       key={item.stars}
//                       className="flex items-center gap-3 mb-2"
//                     >
//                       <div className="flex items-center w-16">
//                         <span className="text-sm text-gray-600 w-4">
//                           {item.stars}
//                         </span>
//                         <FaStar className="text-yellow-400 ml-1 text-sm" />
//                       </div>
//                       <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
//                         <div
//                           className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
//                           style={{ width: `${item.percentage}%` }}
//                         ></div>
//                       </div>
//                       <span className="text-sm text-gray-600 w-10 text-right">
//                         {item.percentage.toFixed(0)}%
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Review Form - Only show if user has booked this vehicle */}
//               {hasBookedThisVehicle && !userReview && !showReviewForm && (
//                 <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <FaCheckCircle className="text-green-600 text-lg mb-2" />
//                       <p className="text-green-800 font-medium">
//                         You've booked this vehicle!
//                       </p>
//                       <p className="text-green-600 text-sm">
//                         Share your experience with others
//                       </p>
//                     </div>
//                     <button
//                       onClick={() => setShowReviewForm(true)}
//                       className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
//                     >
//                       Write a Review
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* User's existing review */}
//               {userReview && !editingReview && !showReviewForm && (
//                 <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
//                   <div className="flex items-center justify-between mb-3">
//                     <div className="flex items-center gap-2">
//                       <FaStar className="text-yellow-400" />
//                       <span className="font-semibold">Your Review</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <button
//                         onClick={handleEditReview}
//                         className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg transition"
//                       >
//                         <FaEdit />
//                       </button>
//                       <button
//                         onClick={handleDeleteReview}
//                         disabled={deletingReview}
//                         className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition"
//                       >
//                         {deletingReview ? (
//                           <FaSpinner className="animate-spin" />
//                         ) : (
//                           <FaTrash />
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2 mb-2">
//                     {renderStars(userReview.rating, "text-sm")}
//                     <span className="text-sm text-gray-500">
//                       {formatDate(userReview.createdAt)}
//                     </span>
//                   </div>
//                   <p className="text-gray-700">{userReview.comment}</p>
//                 </div>
//               )}

//               {/* Review Form Modal */}
//               {showReviewForm && (
//                 <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="font-semibold text-gray-900">
//                       {editingReview ? "Edit Your Review" : "Write a Review"}
//                     </h3>
//                     <button
//                       onClick={() => {
//                         setShowReviewForm(false);
//                         setEditingReview(false);
//                         setNewRating(5);
//                         setNewComment("");
//                       }}
//                       className="text-gray-400 hover:text-gray-600"
//                     >
//                       <FaTimesCircle />
//                     </button>
//                   </div>

//                   {renderStarInput()}

//                   <textarea
//                     value={newComment}
//                     onChange={(e) => setNewComment(e.target.value)}
//                     rows="4"
//                     className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
//                     placeholder="Share your experience with this vehicle..."
//                   />

//                   <div className="flex justify-end gap-3">
//                     <button
//                       onClick={() => {
//                         setShowReviewForm(false);
//                         setEditingReview(false);
//                         setNewRating(5);
//                         setNewComment("");
//                       }}
//                       className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       onClick={
//                         editingReview ? handleUpdateReview : handleSubmitReview
//                       }
//                       disabled={submittingReview}
//                       className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
//                     >
//                       {submittingReview ? (
//                         <>
//                           <FaSpinner className="animate-spin inline mr-2" />{" "}
//                           Submitting...
//                         </>
//                       ) : editingReview ? (
//                         "Update Review"
//                       ) : (
//                         "Submit Review"
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* Message for users who haven't booked */}
//               {!hasBookedThisVehicle && (
//                 <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-xl">
//                   <div className="flex items-center gap-3">
//                     <FaInfoCircle className="text-blue-500 text-xl" />
//                     <div>
//                       <p className="text-gray-800 font-medium">
//                         You must book this vehicle before leaving a review
//                       </p>
//                       <p className="text-gray-500 text-sm">
//                         Complete your booking and come back to share your
//                         experience
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Reviews List - DYNAMIC */}
//               {reviewsLoading ? (
//                 <div className="text-center py-8">
//                   <FaSpinner className="animate-spin text-blue-600 text-2xl mx-auto" />
//                   <p className="text-gray-500 mt-2">Loading reviews...</p>
//                 </div>
//               ) : reviews.length === 0 ? (
//                 <div className="text-center py-8">
//                   <p className="text-gray-500">No reviews yet</p>
//                   {hasBookedThisVehicle && !userReview && (
//                     <button
//                       onClick={() => setShowReviewForm(true)}
//                       className="mt-3 text-blue-600 hover:text-blue-700 font-medium"
//                     >
//                       Be the first to review this vehicle!
//                     </button>
//                   )}
//                 </div>
//               ) : (
//                 <div className="space-y-6 max-h-96 overflow-y-auto pr-2">
//                   {reviews.map((review) => (
//                     <div
//                       key={review._id}
//                       className="border-b border-gray-100 pb-6 last:border-0"
//                     >
//                       <div className="flex items-start justify-between mb-3">
//                         <div className="flex items-center gap-3">
//                           {/* User Profile Image */}
//                           {getProfileImageUrl(review.user) ? (
//                             <img
//                               src={getProfileImageUrl(review.user)}
//                               alt={review.user?.name}
//                               className="w-10 h-10 rounded-full object-cover"
//                             />
//                           ) : (
//                             <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
//                               {review.user?.name?.charAt(0).toUpperCase() ||
//                                 "U"}
//                             </div>
//                           )}
//                           <div>
//                             <h4 className="font-semibold text-gray-900">
//                               {review.user?.name || "Anonymous User"}
//                             </h4>
//                             <p className="text-gray-500 text-xs">
//                               {formatDate(review.createdAt)}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           {renderStars(review.rating, "text-sm")}
//                         </div>
//                       </div>
//                       <p className="text-gray-700 pl-13">{review.comment}</p>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white mt-12 pt-8 pb-6">
//         <div className="container mx-auto px-6">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <div className="flex items-center gap-3 mb-4 md:mb-0">
//               <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg">
//                 <FaCar className="text-white" />
//               </div>
//               <h3 className="text-xl font-bold">
//                 Rent<span className="text-blue-400">Ride</span>
//               </h3>
//             </div>
//             <div className="text-gray-400 text-sm">
//               &copy; {new Date().getFullYear()} RentRide. All rights reserved.
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Booking;


import React, { useState, useEffect } from "react";
import {
  FaCar,
  FaStar,
  FaThumbsUp,
  FaThumbsDown,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUser,
  FaPhone,
  FaCreditCard,
  FaShieldAlt,
  FaArrowLeft,
  FaSpinner,
  FaTrash,
  FaEdit,
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
  FaUserCircle,
  FaChartBar,
  FaComments,
} from "react-icons/fa";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Configure axios with token
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { vehicleId } = useParams();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] =useState("09:00");
  const [pickupLocation, setPickupLocation] = useState("Kathmandu, Nepal");
  const [dropoffLocation, setDropoffLocation] = useState("Kathmandu, Nepal");
  const [bookingDays, setBookingDays] = useState(1);
  const [driverOption, setDriverOption] = useState("without");
  const [insuranceOption, setInsuranceOption] = useState("basic");
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [specialRequests, setSpecialRequests] = useState("");
  const [emergencyContact, setEmergencyContact] = useState({
    name: "",
    phone: "",
    relationship: "",
  });

  // Review States
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [userReview, setUserReview] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);
  const [deletingReview, setDeletingReview] = useState(false);
  const [editingReview, setEditingReview] = useState(false);
  const [hasBookedThisVehicle, setHasBookedThisVehicle] = useState(false);
  const [userBookingStatus, setUserBookingStatus] = useState(null);
  const [ratingDistribution, setRatingDistribution] = useState([
    { stars: 5, percentage: 0, count: 0 },
    { stars: 4, percentage: 0, count: 0 },
    { stars: 3, percentage: 0, count: 0 },
    { stars: 2, percentage: 0, count: 0 },
    { stars: 1, percentage: 0, count: 0 },
  ]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [showChartModal, setShowChartModal] = useState(false);
  const [likedReviews, setLikedReviews] = useState(new Set());
  const [dislikedReviews, setDislikedReviews] = useState(new Set());
  const [showConversationModal, setShowConversationModal] = useState(false);
  const [selectedReviewUser, setSelectedReviewUser] = useState(null);
  const [conversationMessage, setConversationMessage] = useState("");

  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  // Determine available driver options based on vehicle's bookingType
  const getAvailableDriverOptions = () => {
    if (!vehicleDetails) return { withDriver: false, withoutDriver: false };

    const bookingType = vehicleDetails.bookingType || "";

    if (bookingType.toLowerCase() === "both") {
      return { withDriver: true, withoutDriver: true };
    } else if (bookingType.toLowerCase().includes("with driver")) {
      return { withDriver: true, withoutDriver: false };
    } else if (bookingType.toLowerCase().includes("without driver")) {
      return { withDriver: false, withoutDriver: true };
    } else {
      return { withDriver: true, withoutDriver: true };
    }
  };

  const availableOptions = getAvailableDriverOptions();

  // Set default driver option based on availability
  useEffect(() => {
    if (!availableOptions.withDriver && availableOptions.withoutDriver) {
      setDriverOption("without");
    } else if (availableOptions.withDriver && !availableOptions.withoutDriver) {
      setDriverOption("with");
    }
  }, [vehicleDetails]);

  // Fetch vehicle data, reviews, and user booking status
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        // Fetch vehicle details
        if (location.state?.vehicle) {
          setVehicleDetails(location.state.vehicle);
        } else if (vehicleId) {
          let vehicleData = null;

          try {
            const adminResponse = await axios.get(
              `http://localhost:5000/api/vehicles/${vehicleId}`,
              { timeout: 10000 },
            );
            vehicleData = adminResponse.data;
          } catch (adminError) {
            try {
              const userResponse = await axios.get(
                `http://localhost:5000/api/user-vehicles/public/${vehicleId}`,
                { timeout: 10000 },
              );
              if (userResponse.data.success && userResponse.data.data) {
                const userVehicle = userResponse.data.data;
                vehicleData = {
                  _id: userVehicle._id,
                  carName: userVehicle.carName,
                  carNumber: userVehicle.carNumber,
                  carType: userVehicle.carType,
                  ratePerDay: userVehicle.ratePerDay,
                  seats: userVehicle.seats,
                  bookingType: userVehicle.bookingType,
                  gearType: userVehicle.gearType,
                  airCondition: userVehicle.airCondition,
                  description: userVehicle.description,
                  features: userVehicle.features,
                  photos: userVehicle.photos,
                  phoneNumber: userVehicle.phoneNumber,
                  driverName: userVehicle.driverName,
                  status: "Available",
                  source: "user",
                  owner: userVehicle.owner,
                  ownerPhone: userVehicle.ownerPhone,
                };
              }
            } catch (userError) {
              console.error("Vehicle not found");
            }
          }

          if (vehicleData) {
            setVehicleDetails(vehicleData);
          } else {
            setError("Vehicle not found");
          }
        } else {
          setError("No vehicle selected");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load vehicle details");
        setLoading(false);
      }
    };

    fetchData();
  }, [location, vehicleId]);

  // Fetch reviews and user booking status when vehicle is loaded
  useEffect(() => {
    if (vehicleDetails && vehicleDetails._id) {
      fetchReviews();
      checkUserBookingStatus();
    }
  }, [vehicleDetails]);

  // Fetch reviews for this vehicle
  const fetchReviews = async () => {
    try {
      setReviewsLoading(true);
      const response = await axios.get(
        `${API_URL}/reviews/vehicle/${vehicleDetails._id}`,
      );

      if (response.data.success) {
        setReviews(response.data.data.reviews);
        updateRatingDistribution(response.data.data.reviews);
        setAverageRating(response.data.data.averageRating || 0);
        setTotalReviews(response.data.data.totalReviews || 0);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setReviewsLoading(false);
    }
  };

  // Update rating distribution based on reviews
  const updateRatingDistribution = (reviewsList) => {
    const distribution = [
      { stars: 5, percentage: 0, count: 0 },
      { stars: 4, percentage: 0, count: 0 },
      { stars: 3, percentage: 0, count: 0 },
      { stars: 2, percentage: 0, count: 0 },
      { stars: 1, percentage: 0, count: 0 },
    ];

    reviewsList.forEach((review) => {
      const idx = 5 - review.rating;
      if (idx >= 0 && idx < 5) {
        distribution[idx].count++;
      }
    });

    const total = reviewsList.length;
    distribution.forEach((item) => {
      item.percentage = total > 0 ? (item.count / total) * 100 : 0;
    });

    setRatingDistribution(distribution);
  };

  // Check if current user has booked and completed this vehicle
  const checkUserBookingStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setHasBookedThisVehicle(false);
        return;
      }

      const response = await axiosInstance.get(
        `/bookings/user/vehicle/${vehicleDetails._id}/status`,
      );

      if (response.data.success) {
        setHasBookedThisVehicle(response.data.data.hasBooked);
        setUserBookingStatus(response.data.data.status);

        // Check if user has already reviewed
        if (response.data.data.hasBooked) {
          const reviewResponse = await axiosInstance.get(
            `/reviews/user/vehicle/${vehicleDetails._id}`,
          );
          if (reviewResponse.data.success && reviewResponse.data.data) {
            setUserReview(reviewResponse.data.data);
          }
        }
      }
    } catch (error) {
      console.error("Error checking booking status:", error);
      setHasBookedThisVehicle(false);
    }
  };

  // Submit a new review
  const handleSubmitReview = async () => {
    if (!newComment.trim()) {
      alert("Please enter a review comment");
      return;
    }

    setSubmittingReview(true);
    try {
      const response = await axiosInstance.post("/reviews", {
        vehicleId: vehicleDetails._id,
        rating: newRating,
        comment: newComment,
      });

      if (response.data.success) {
        alert("Review submitted successfully!");
        setShowReviewForm(false);
        setNewComment("");
        setNewRating(5);
        fetchReviews();
        checkUserBookingStatus();
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert(error.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmittingReview(false);
    }
  };

  // Update an existing review
  const handleUpdateReview = async () => {
    if (!newComment.trim()) {
      alert("Please enter a review comment");
      return;
    }

    setSubmittingReview(true);
    try {
      const response = await axiosInstance.put(`/reviews/${userReview._id}`, {
        rating: newRating,
        comment: newComment,
      });

      if (response.data.success) {
        alert("Review updated successfully!");
        setEditingReview(false);
        setShowReviewForm(false);
        setNewComment("");
        setNewRating(5);
        fetchReviews();
        checkUserBookingStatus();
      }
    } catch (error) {
      console.error("Error updating review:", error);
      alert(error.response?.data?.message || "Failed to update review");
    } finally {
      setSubmittingReview(false);
    }
  };

  // Delete a review
  const handleDeleteReview = async () => {
    if (!window.confirm("Are you sure you want to delete your review?")) {
      return;
    }

    setDeletingReview(true);
    try {
      const response = await axiosInstance.delete(`/reviews/${userReview._id}`);

      if (response.data.success) {
        alert("Review deleted successfully!");
        setUserReview(null);
        setShowReviewForm(false);
        setEditingReview(false);
        fetchReviews();
        checkUserBookingStatus();
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      alert(error.response?.data?.message || "Failed to delete review");
    } finally {
      setDeletingReview(false);
    }
  };

  // Open edit review form
  const handleEditReview = () => {
    setNewRating(userReview.rating);
    setNewComment(userReview.comment);
    setEditingReview(true);
    setShowReviewForm(true);
  };

  // Mark review as helpful
  const handleMarkHelpful = async (reviewId, e) => {
    e.stopPropagation();
    if (likedReviews.has(reviewId)) return;
    
    try {
      const response = await axiosInstance.post(`/reviews/${reviewId}/helpful`);
      if (response.data.success) {
        setLikedReviews(prev => new Set([...prev, reviewId]));
        // Update local reviews state
        setReviews(prevReviews => 
          prevReviews.map(review => 
            review._id === reviewId 
              ? { ...review, helpful: (review.helpful || 0) + 1 }
              : review
          )
        );
      }
    } catch (error) {
      console.error("Error marking helpful:", error);
    }
  };

  // Start conversation with reviewer
  const handleStartConversation = (reviewer) => {
    setSelectedReviewUser(reviewer);
    setShowConversationModal(true);
  };

  // Send conversation message
  const handleSendMessage = async () => {
    if (!conversationMessage.trim()) {
      alert("Please enter a message");
      return;
    }
    
    // Here you would implement the messaging API
    alert(`Message sent to ${selectedReviewUser?.name || "user"}! They will be notified.`);
    setShowConversationModal(false);
    setConversationMessage("");
  };

  // Get profile image URL
  const getProfileImageUrl = (user) => {
    if (user?.profilePhoto) {
      return `http://localhost:5000/uploads/profiles/${user.profilePhoto}`;
    }
    return null;
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Render star rating (shows blank stars too)
  const renderStars = (rating, size = "text-sm") => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`${size} ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
            fill={star <= rating ? "currentColor" : "none"}
          />
        ))}
      </div>
    );
  };

  // Render star input for review form (shows blank stars too)
  const renderStarInput = () => {
    return (
      <div className="flex items-center gap-2 mb-4">
        <span className="text-gray-700 font-medium">Your Rating:</span>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setNewRating(star)}
              className="focus:outline-none transition-transform hover:scale-110"
            >
              <FaStar
                className={`text-2xl ${star <= newRating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
              />
            </button>
          ))}
        </div>
      </div>
    );
  };

  const calculateTotal = () => {
    if (!vehicleDetails)
      return {
        basePrice: 0,
        driverFee: 0,
        insuranceFee: 0,
        serviceFee: 500,
        total: 0,
      };

    const basePrice = (vehicleDetails.ratePerDay || 5000) * bookingDays;
    const driverFee = driverOption === "with" ? 500 * bookingDays : 0;
    const insuranceFee = insuranceOption === "premium" ? 1500 * bookingDays : 0;
    const serviceFee = 500;

    return {
      basePrice: basePrice,
      driverFee: driverFee,
      insuranceFee: insuranceFee,
      serviceFee: serviceFee,
      total: basePrice + driverFee + insuranceFee + serviceFee,
    };
  };

  const totals = calculateTotal();

  const formatNPR = (amount) => {
    return "रु " + amount.toLocaleString("en-NP");
  };

  const calculateReturnDate = () => {
    if (!selectedDate) return "";
    const pickupDate = new Date(selectedDate);
    const returnDate = new Date(pickupDate);
    returnDate.setDate(returnDate.getDate() + bookingDays);
    return returnDate.toISOString().split("T")[0];
  };

  const handleBookNow = async () => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      alert("Please login to book a vehicle");
      navigate("/login");
      return;
    }

    if (!vehicleDetails) {
      alert("Please select a vehicle first");
      return;
    }

    if (!selectedDate) {
      alert("Please select a pickup date");
      return;
    }

    if (!emergencyContact.name || !emergencyContact.phone) {
      alert("Please provide emergency contact information");
      return;
    }

    setSubmitting(true);

    try {
      const returnDate = calculateReturnDate();
      const pickupDateTime = new Date(selectedDate);
      const returnDateTime = new Date(returnDate);

      const bookingData = {
        vehicleId: vehicleDetails._id,
        pickupDate: pickupDateTime.toISOString(),
        pickupTime: selectedTime,
        returnDate: returnDateTime.toISOString(),
        returnTime: selectedTime,
        pickupLocation: pickupLocation,
        dropoffLocation: dropoffLocation,
        driverOption: driverOption,
        insuranceOption: insuranceOption,
        specialRequests: specialRequests,
        emergencyContact: emergencyContact,
        vehicleSource: vehicleDetails.source || "admin",
      };

      const response = await axiosInstance.post("/bookings", bookingData);

      if (!response.data?.data?.booking?.id) {
        throw new Error("No booking ID received from server");
      }

      navigate("/upload-documents", {
        state: {
          bookingId: response.data.data.booking.id,
          confirmationCode: response.data.data.booking.confirmationCode,
          vehicleDetails: vehicleDetails,
          driverOption: driverOption,
          bookingDetails: {
            ...bookingData,
            totalAmount: totals.total,
            formattedTotal: formatNPR(totals.total),
          },
        },
      });
    } catch (error) {
      console.error("Booking error:", error);
      alert(error.response?.data?.message || "Failed to create booking");
    } finally {
      setSubmitting(false);
    }
  };

  const getVehicleImage = () => {
    if (
      !vehicleDetails ||
      !vehicleDetails.photos ||
      vehicleDetails.photos.length === 0
    ) {
      return "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80";
    }

    const extraView = vehicleDetails.photos.find(
      (photo) => photo.label === "Extra View",
    );
    const photo = extraView || vehicleDetails.photos[0];
    const folder =
      vehicleDetails.source === "user" ? "user-vehicles" : "vehicles";
    return `http://localhost:5000/uploads/${folder}/${photo.filename}`;
  };

  const getVehicleImages = () => {
    if (
      !vehicleDetails ||
      !vehicleDetails.photos ||
      vehicleDetails.photos.length === 0
    ) {
      return [
        "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
      ];
    }

    const folder =
      vehicleDetails.source === "user" ? "user-vehicles" : "vehicles";
    return vehicleDetails.photos.map(
      (photo) => `http://localhost:5000/uploads/${folder}/${photo.filename}`,
    );
  };

  const getVehicleFeatures = () => {
    if (!vehicleDetails) return [];

    const features = [];

    if (vehicleDetails.features && Array.isArray(vehicleDetails.features)) {
      features.push(...vehicleDetails.features);
    }

    if (vehicleDetails.airCondition === "Yes") {
      features.push("Air Conditioning");
    }
    if (vehicleDetails.gearType) {
      features.push(`${vehicleDetails.gearType} Transmission`);
    }
    if (vehicleDetails.seats) {
      features.push(`${vehicleDetails.seats} Seats`);
    }

    return features;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading vehicle details...</p>
        </div>
      </div>
    );
  }

  if (error || !vehicleDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold mb-2">Error Loading Vehicle</h2>
          <p className="text-gray-600 mb-4">{error || "Vehicle not found"}</p>
          <button
            onClick={() => navigate("/rentridehome")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Back to Vehicles
          </button>
        </div>
      </div>
    );
  }

  const vehicleImages = getVehicleImages();
  const vehicleFeatures = getVehicleFeatures();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FaArrowLeft className="text-gray-700 text-lg" />
              </button>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg">
                  <FaCar className="text-white text-2xl" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Rent<span className="text-blue-600">Ride</span>
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/profiledetails")}
                className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
              >
                My Bookings
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Vehicle Details & Booking Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Vehicle Details Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-8">
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Vehicle Image */}
                  <div className="lg:w-2/5">
                    <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden">
                      <img
                        src={getVehicleImage()}
                        alt={vehicleDetails.carName}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/60 text-white text-sm font-medium rounded-full backdrop-blur-sm">
                        {vehicleDetails.carType || "Premium Vehicle"}
                      </div>
                      {vehicleDetails.source === "user" && (
                        <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-purple-500/90 text-white text-sm font-medium rounded-full backdrop-blur-sm">
                          Owner Listed
                        </div>
                      )}
                    </div>

                    {/* Additional Images */}
                    <div className="flex gap-3 mt-4">
                      {vehicleImages.slice(1, 3).map((img, index) => (
                        <div
                          key={index}
                          className="flex-1 h-20 rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                        >
                          <img
                            src={img}
                            alt={`${vehicleDetails.carName} ${index + 2}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Vehicle Info */}
                  <div className="lg:w-3/5">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                          {vehicleDetails.carName}
                        </h1>
                        <p className="text-gray-600 mt-1">
                          {vehicleDetails.carType}
                        </p>
                        {vehicleDetails.carNumber && (
                          <p className="text-sm text-gray-400 mt-1">
                            {vehicleDetails.carNumber}
                          </p>
                        )}

                        {/* Rating */}
                        <div className="flex items-center gap-3 mt-4">
                          <div className="flex items-center bg-gradient-to-r from-yellow-400 to-orange-400 px-4 py-2 rounded-full">
                            <span className="text-2xl font-bold text-white mr-2">
                              {averageRating.toFixed(1)}
                            </span>
                            {renderStars(
                              Math.round(averageRating),
                              "text-sm text-white",
                            )}
                          </div>
                          <span className="text-gray-600">
                            {totalReviews}{" "}
                            {totalReviews === 1 ? "review" : "reviews"}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-4xl font-bold text-blue-600">
                          {formatNPR(vehicleDetails.ratePerDay || 5000)}
                        </div>
                        <div className="text-gray-500">प्रति दिन</div>
                        <div
                          className={`mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                            vehicleDetails.status === "Available"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {vehicleDetails.status || "Available"}
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Key Features
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {vehicleFeatures.map((feature, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Specifications */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Specifications
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {vehicleDetails.gearType && (
                          <div className="p-3 bg-gray-50 rounded-xl text-center">
                            <div className="text-sm text-gray-500">
                              Transmission
                            </div>
                            <div className="font-semibold text-gray-900">
                              {vehicleDetails.gearType}
                            </div>
                          </div>
                        )}
                        {vehicleDetails.seats && (
                          <div className="p-3 bg-gray-50 rounded-xl text-center">
                            <div className="text-sm text-gray-500">Seats</div>
                            <div className="font-semibold text-gray-900">
                              {vehicleDetails.seats}
                            </div>
                          </div>
                        )}
                        {vehicleDetails.airCondition && (
                          <div className="p-3 bg-gray-50 rounded-xl text-center">
                            <div className="text-sm text-gray-500">
                              Air Condition
                            </div>
                            <div className="font-semibold text-gray-900">
                              {vehicleDetails.airCondition}
                            </div>
                          </div>
                        )}
                        <div className="p-3 bg-gray-50 rounded-xl text-center">
                          <div className="text-sm text-gray-500">
                            Booking Type
                          </div>
                          <div className="font-semibold text-gray-900">
                            {vehicleDetails.bookingType || "Both"}
                          </div>
                        </div>
                        {vehicleDetails.driverName && (
                          <div className="p-3 bg-gray-50 rounded-xl text-center">
                            <div className="text-sm text-gray-500">Driver</div>
                            <div className="font-semibold text-gray-900">
                              {vehicleDetails.driverName}
                            </div>
                          </div>
                        )}
                        {vehicleDetails.phoneNumber && (
                          <div className="p-3 bg-gray-50 rounded-xl text-center">
                            <div className="text-sm text-gray-500">Contact</div>
                            <div className="font-semibold text-gray-900">
                              {vehicleDetails.phoneNumber}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Booking Details
              </h2>

              <div className="space-y-6">
                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-blue-600" />
                        Pickup Date
                      </div>
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Return date:{" "}
                      {calculateReturnDate() || "Select pickup date first"}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <FaClock className="text-blue-600" />
                        Pickup Time
                      </div>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                            selectedTime === time
                              ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-blue-600" />
                        Pickup Location
                      </div>
                    </label>
                    <input
                      type="text"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter pickup location"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-green-600" />
                        Drop-off Location
                      </div>
                    </label>
                    <input
                      type="text"
                      value={dropoffLocation}
                      onChange={(e) => setDropoffLocation(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter drop-off location"
                    />
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rental Duration
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() =>
                        setBookingDays(Math.max(1, bookingDays - 1))
                      }
                      className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-bold text-xl"
                    >
                      -
                    </button>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">
                        {bookingDays} day{bookingDays > 1 ? "s" : ""}
                      </div>
                      <div className="text-gray-500 text-sm">
                        Total:{" "}
                        {formatNPR(
                          (vehicleDetails.ratePerDay || 5000) * bookingDays,
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => setBookingDays(bookingDays + 1)}
                      className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-bold text-xl"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Driver Option */}
                {(availableOptions.withDriver ||
                  availableOptions.withoutDriver) && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      <div className="flex items-center gap-2">
                        <FaUser className="text-blue-600" />
                        Driver Option
                      </div>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {availableOptions.withDriver && (
                        <button
                          onClick={() => setDriverOption("with")}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                            driverOption === "with"
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-blue-300"
                          }`}
                        >
                          <div className="text-left">
                            <div className="font-semibold text-gray-900">
                              With Driver
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              Professional driver included
                            </div>
                            <div className="text-blue-600 font-bold mt-2">
                              +{formatNPR(500)}/day
                            </div>
                          </div>
                        </button>
                      )}

                      {availableOptions.withoutDriver && (
                        <button
                          onClick={() => setDriverOption("without")}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                            driverOption === "without"
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-blue-300"
                          }`}
                        >
                          <div className="text-left">
                            <div className="font-semibold text-gray-900">
                              Self Drive
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              Drive yourself
                            </div>
                            <div className="text-green-600 font-bold mt-2">
                              No extra cost
                            </div>
                          </div>
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Insurance Option */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <div className="flex items-center gap-2">
                      <FaShieldAlt className="text-blue-600" />
                      Insurance Coverage
                    </div>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => setInsuranceOption("basic")}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        insuranceOption === "basic"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                    >
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">
                          Basic Coverage
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          Standard protection
                        </div>
                        <div className="text-green-600 font-bold mt-2">
                          Included
                        </div>
                      </div>
                    </button>
                    <button
                      onClick={() => setInsuranceOption("premium")}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        insuranceOption === "premium"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                    >
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">
                          Premium Coverage
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          Full protection with zero deductible
                        </div>
                        <div className="text-blue-600 font-bold mt-2">
                          +{formatNPR(1500)}/day
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <div className="flex items-center gap-2">
                      <FaPhone className="text-blue-600" />
                      Emergency Contact
                    </div>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      value={emergencyContact.name}
                      onChange={(e) =>
                        setEmergencyContact({
                          ...emergencyContact,
                          name: e.target.value,
                        })
                      }
                      className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Full Name"
                      required
                    />
                    <input
                      type="tel"
                      value={emergencyContact.phone}
                      onChange={(e) =>
                        setEmergencyContact({
                          ...emergencyContact,
                          phone: e.target.value,
                        })
                      }
                      className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Phone Number"
                      required
                    />
                    <input
                      type="text"
                      value={emergencyContact.relationship}
                      onChange={(e) =>
                        setEmergencyContact({
                          ...emergencyContact,
                          relationship: e.target.value,
                        })
                      }
                      className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Relationship"
                    />
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    rows="3"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Any special requests or requirements?"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Pricing Summary & Reviews */}
          <div className="space-y-8">
            {/* Pricing Summary - Sticky */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Pricing Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Base Price</span>
                  <span className="font-semibold">
                    {formatNPR(totals.basePrice)}
                  </span>
                </div>

                {totals.driverFee > 0 && (
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Driver Fee</span>
                    <span className="font-semibold">
                      {formatNPR(totals.driverFee)}
                    </span>
                  </div>
                )}

                {totals.insuranceFee > 0 && (
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Premium Insurance</span>
                    <span className="font-semibold">
                      {formatNPR(totals.insuranceFee)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Service Fee</span>
                  <span className="font-semibold">
                    {formatNPR(totals.serviceFee)}
                  </span>
                </div>

                <div className="border-t pt-4 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">
                      Total
                    </span>
                    <span className="text-3xl font-bold text-blue-600">
                      {formatNPR(totals.total)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleBookNow}
                  disabled={submitting}
                  className="w-full mt-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-green-500/30 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center justify-center gap-2">
                    {submitting ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <FaCreditCard />
                        Continue to Document Upload
                      </>
                    )}
                  </div>
                </button>

                <div className="text-center mt-4">
                  <p className="text-gray-500 text-sm">
                    Free cancellation up to 24 hours before pickup • 24/7
                    support
                  </p>
                  <p className="text-blue-600 text-xs mt-2">
                    Next: Upload your documents for verification
                  </p>
                </div>
              </div>
            </div>

            {/* Ratings and Reviews - Sticky */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-[calc(24rem+2rem)]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Ratings & Reviews
                </h2>
                <button
                  onClick={() => setShowChartModal(true)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                  title="View Rating Chart"
                >
                  <FaChartBar className="text-blue-600" />
                  <span className="text-sm">Chart</span>
                </button>
              </div>

              {/* Overall Rating */}
              <div className="flex items-center gap-6 mb-8">
                <div className="text-center">
                  <div className="text-5xl font-bold text-gray-900">
                    {averageRating.toFixed(1)}
                  </div>
                  <div className="flex items-center justify-center mt-2">
                    {renderStars(Math.round(averageRating), "text-sm")}
                  </div>
                  <div className="text-gray-600 text-sm mt-1">
                    {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
                  </div>
                </div>

                {/* Rating Distribution */}
                <div className="flex-1">
                  {ratingDistribution.map((item) => (
                    <div
                      key={item.stars}
                      className="flex items-center gap-3 mb-2"
                    >
                      <div className="flex items-center w-16">
                        <span className="text-sm text-gray-600 w-4">
                          {item.stars}
                        </span>
                        <FaStar className="text-yellow-400 ml-1 text-sm" />
                      </div>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-10 text-right">
                        {item.percentage.toFixed(0)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review Form - Only show if user has booked this vehicle */}
              {hasBookedThisVehicle && !userReview && !showReviewForm && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <FaCheckCircle className="text-green-600 text-lg mb-2" />
                      <p className="text-green-800 font-medium">
                        You've booked this vehicle!
                      </p>
                      <p className="text-green-600 text-sm">
                        Share your experience with others
                      </p>
                    </div>
                    <button
                      onClick={() => setShowReviewForm(true)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                      Write a Review
                    </button>
                  </div>
                </div>
              )}

              {/* User's existing review */}
              {userReview && !editingReview && !showReviewForm && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <FaStar className="text-yellow-400" />
                      <span className="font-semibold">Your Review</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleEditReview}
                        className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={handleDeleteReview}
                        disabled={deletingReview}
                        className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition"
                      >
                        {deletingReview ? (
                          <FaSpinner className="animate-spin" />
                        ) : (
                          <FaTrash />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    {renderStars(userReview.rating, "text-sm")}
                    <span className="text-sm text-gray-500">
                      {formatDate(userReview.createdAt)}
                    </span>
                  </div>
                  <p className="text-gray-700">{userReview.comment}</p>
                </div>
              )}

              {/* Review Form Modal */}
              {showReviewForm && (
                <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">
                      {editingReview ? "Edit Your Review" : "Write a Review"}
                    </h3>
                    <button
                      onClick={() => {
                        setShowReviewForm(false);
                        setEditingReview(false);
                        setNewRating(5);
                        setNewComment("");
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <FaTimesCircle />
                    </button>
                  </div>

                  {renderStarInput()}

                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows="4"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    placeholder="Share your experience with this vehicle..."
                  />

                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => {
                        setShowReviewForm(false);
                        setEditingReview(false);
                        setNewRating(5);
                        setNewComment("");
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={
                        editingReview ? handleUpdateReview : handleSubmitReview
                      }
                      disabled={submittingReview}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                    >
                      {submittingReview ? (
                        <>
                          <FaSpinner className="animate-spin inline mr-2" />{" "}
                          Submitting...
                        </>
                      ) : editingReview ? (
                        "Update Review"
                      ) : (
                        "Submit Review"
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Message for users who haven't booked */}
              {!hasBookedThisVehicle && (
                <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-xl">
                  <div className="flex items-center gap-3">
                    <FaInfoCircle className="text-blue-500 text-xl" />
                    <div>
                      <p className="text-gray-800 font-medium">
                        You must book this vehicle before leaving a review
                      </p>
                      <p className="text-gray-500 text-sm">
                        Complete your booking and come back to share your
                        experience
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Reviews List */}
              {reviewsLoading ? (
                <div className="text-center py-8">
                  <FaSpinner className="animate-spin text-blue-600 text-2xl mx-auto" />
                  <p className="text-gray-500 mt-2">Loading reviews...</p>
                </div>
              ) : reviews.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No reviews yet</p>
                  {hasBookedThisVehicle && !userReview && (
                    <button
                      onClick={() => setShowReviewForm(true)}
                      className="mt-3 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Be the first to review this vehicle!
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-6 max-h-96 overflow-y-auto pr-2">
                  {reviews.map((review) => (
                    <div
                      key={review._id}
                      className="border-b border-gray-100 pb-6 last:border-0"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {/* User Profile Image */}
                          {getProfileImageUrl(review.user) ? (
                            <img
                              src={getProfileImageUrl(review.user)}
                              alt={review.user?.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                              {review.user?.name?.charAt(0).toUpperCase() ||
                                "U"}
                            </div>
                          )}
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {review.user?.name || "Anonymous User"}
                            </h4>
                            <p className="text-gray-500 text-xs">
                              {formatDate(review.createdAt)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {renderStars(review.rating, "text-sm")}
                          <button
                            onClick={() => handleStartConversation(review.user)}
                            className="ml-2 p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Start conversation with this user"
                          >
                            <FaComments size={14} />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">{review.comment}</p>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={(e) => handleMarkHelpful(review._id, e)}
                          className={`flex items-center gap-2 text-sm transition-colors ${
                            likedReviews.has(review._id)
                              ? "text-blue-600"
                              : "text-gray-500 hover:text-blue-600"
                          }`}
                          disabled={likedReviews.has(review._id)}
                        >
                          <FaThumbsUp />
                          <span>{review.helpful || 0}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Rating Chart Modal */}
      {showChartModal && (
        <div className="fixed inset-0 z-[100]">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowChartModal(false)}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Rating Distribution
                </h3>
                <button
                  onClick={() => setShowChartModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimesCircle size={24} />
                </button>
              </div>
              <div className="space-y-4">
                {ratingDistribution.map((item) => (
                  <div key={item.stars}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">{item.stars}</span>
                        <FaStar className="text-yellow-400 text-sm" />
                      </div>
                      <span className="text-sm text-gray-600">
                        {item.count} reviews
                      </span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transition-all duration-500"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 text-right mt-1">
                      {item.percentage.toFixed(0)}%
                    </p>
                  </div>
                ))}
                <div className="pt-4 border-t text-center">
                  <p className="text-gray-600">
                    Total Reviews: {totalReviews}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    Average Rating: {averageRating.toFixed(1)} / 5
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Start Conversation Modal */}
      {showConversationModal && selectedReviewUser && (
        <div className="fixed inset-0 z-[100]">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowConversationModal(false)}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  {getProfileImageUrl(selectedReviewUser) ? (
                    <img
                      src={getProfileImageUrl(selectedReviewUser)}
                      alt={selectedReviewUser.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {selectedReviewUser.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {selectedReviewUser.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      Start a conversation about this vehicle
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowConversationModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimesCircle size={24} />
                </button>
              </div>

              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  💬 You can ask other customers about their experience with
                  this vehicle.
                </p>
              </div>

              <textarea
                value={conversationMessage}
                onChange={(e) => setConversationMessage(e.target.value)}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                placeholder={`Write your message to ${selectedReviewUser.name}...`}
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowConversationModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                >
                  <FaComments />
                  Send Message
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-4">
                Note: The user will be notified of your message via email and
                in-app notification.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-12 pt-8 pb-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg">
                <FaCar className="text-white" />
              </div>
              <h3 className="text-xl font-bold">
                Rent<span className="text-blue-400">Ride</span>
              </h3>
            </div>
            <div className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} RentRide. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Booking;