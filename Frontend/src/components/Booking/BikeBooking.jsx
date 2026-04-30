// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   FaMotorcycle,
//   FaCalendarAlt,
//   FaClock,
//   FaMapMarkerAlt,
//   FaPhone,
//   FaShieldAlt,
//   FaArrowLeft,
//   FaSpinner,
//   FaCreditCard,
//   FaInfoCircle,
//   FaUser,
// } from "react-icons/fa";

// import { FaHelmetSafety } from "react-icons/fa6";
// import axios from "axios";

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

// const BikeBooking = () => {
//   const navigate = useNavigate();
//   const { bikeId } = useParams();

//   // Bike state
//   const [bike, setBike] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState("");

//   // Booking form state
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedTime, setSelectedTime] = useState("10:00");
//   const [bookingDays, setBookingDays] = useState(1);
//   const [pickupLocation, setPickupLocation] = useState("Kathmandu, Nepal");
//   const [dropoffLocation, setDropoffLocation] = useState("Kathmandu, Nepal");
//   const [extraHelmet, setExtraHelmet] = useState(false);
//   const [ridingGear, setRidingGear] = useState(false);
//   const [riderExperience, setRiderExperience] = useState("Intermediate");
//   const [specialRequests, setSpecialRequests] = useState("");
//   const [emergencyContact, setEmergencyContact] = useState({
//     name: "",
//     phone: "",
//     relationship: "",
//   });

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
//   const experienceLevels = ["Beginner", "Intermediate", "Experienced"];

//   useEffect(() => {
//     fetchBikeDetails();
//   }, [bikeId]);

//   const fetchBikeDetails = async () => {
//     try {
//       const response = await axios.get(`${API_URL}/bikes/${bikeId}`);
//       if (response.data.success) {
//         setBike(response.data.data);
//       }
//     } catch (error) {
//       setError("Failed to load bike details");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const calculateTotal = () => {
//     if (!bike)
//       return { basePrice: 0, extraCharges: 0, serviceFee: 200, total: 0 };
//     const basePrice = bike.ratePerDay * bookingDays;
//     let extraCharges = 0;
//     if (extraHelmet) extraCharges += 100 * bookingDays;
//     if (ridingGear) extraCharges += 200 * bookingDays;
//     const serviceFee = 200;
//     return {
//       basePrice,
//       extraCharges,
//       serviceFee,
//       total: basePrice + extraCharges + serviceFee,
//     };
//   };

//   const totals = calculateTotal();
//   const formatNPR = (amount) => `रु ${amount?.toLocaleString() || 0}`;

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
//       alert("Please login to book a bike");
//       navigate("/login");
//       return;
//     }

//     if (!bike) {
//       alert("Please select a bike first");
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

//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const pickupDateObj = new Date(selectedDate);
//     if (pickupDateObj < today) {
//       alert("Pickup date cannot be in the past");
//       return;
//     }

//     setSubmitting(true);

//     try {
//       const returnDate = calculateReturnDate();
//       const pickupDateTime = new Date(selectedDate);
//       const returnDateTime = new Date(returnDate);

//       const bookingData = {
//         bikeId: bike._id,
//         pickupDate: pickupDateTime.toISOString(),
//         pickupTime: selectedTime,
//         returnDate: returnDateTime.toISOString(),
//         returnTime: selectedTime,
//         pickupLocation: pickupLocation,
//         dropoffLocation: dropoffLocation,
//         extraHelmet: extraHelmet,
//         ridingGear: ridingGear,
//         riderExperience: riderExperience,
//         specialRequests: specialRequests,
//         emergencyContact: emergencyContact,
//       };

//       const response = await axiosInstance.post("/bikes/bookings", bookingData);

//       if (response.data.success) {
//         sessionStorage.setItem(
//           "current_bike_booking_id",
//           response.data.data.bookingId,
//         );

//         navigate("/bike-upload-documents", {
//           state: {
//             bookingId: response.data.data.bookingId,
//             confirmationCode: response.data.data.confirmationCode,
//             bikeDetails: bike,
//             bookingDetails: {
//               ...bookingData,
//               totalAmount: totals.total,
//               formattedTotal: formatNPR(totals.total),
//               totalDays: bookingDays,
//               basePrice: totals.basePrice,
//               extraCharges: totals.extraCharges,
//               serviceFee: totals.serviceFee,
//             },
//           },
//         });
//       } else {
//         alert(response.data.message || "Failed to create booking");
//       }
//     } catch (error) {
//       console.error("Booking error:", error);
//       alert(
//         error.response?.data?.message ||
//           "Failed to create booking. Please try again.",
//       );
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading bike details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !bike) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-red-600 mb-4">{error || "Bike not found"}</p>
//           <button
//             onClick={() => navigate(-1)}
//             className="px-6 py-2 bg-purple-600 text-white rounded-lg"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       {/* Header */}
//       <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
//         <div className="container mx-auto px-6 py-4">
//           <div className="flex items-center gap-6">
//             <button
//               onClick={() => navigate(-1)}
//               className="p-2 hover:bg-gray-100 rounded-full"
//             >
//               <FaArrowLeft className="text-gray-700" />
//             </button>
//             <div className="flex items-center gap-3">
//               <div className="p-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg">
//                 <FaMotorcycle className="text-white text-2xl" />
//               </div>
//               <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">
//                 Book a Bike
//               </h1>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="container mx-auto px-6 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Bike Details & Form */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Bike Details Card */}
//             <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//               <div className="p-6">
//                 <div className="flex flex-col md:flex-row gap-6">
//                   <div className="md:w-1/3">
//                     <div className="relative h-48 rounded-xl overflow-hidden bg-gray-100">
//                       {bike.photos?.[0] ? (
//                         <img
//                           src={`http://localhost:5000/uploads/bikes/${bike.photos[0].filename}`}
//                           alt={bike.bikeName}
//                           className="w-full h-full object-cover"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center">
//                           <FaMotorcycle className="text-5xl text-gray-300" />
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   <div className="flex-1">
//                     <h1 className="text-2xl font-bold text-gray-900">
//                       {bike.bikeName}
//                     </h1>
//                     <p className="text-gray-500">
//                       {bike.brand} {bike.model} • {bike.year}
//                     </p>
//                     <div className="flex flex-wrap gap-2 mt-3">
//                       <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
//                         {bike.bikeType}
//                       </span>
//                       <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
//                         {bike.engineCapacity}
//                       </span>
//                       <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
//                         {bike.transmission}
//                       </span>
//                     </div>
//                     <div className="mt-4 flex items-center gap-2">
//                       <FaShieldAlt className="text-green-600" />
//                       <span className="text-sm text-gray-600">
//                         {bike.helmetIncluded ? "Helmet Included • " : ""}
//                         {bike.licenseRequired} License Required
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Booking Form */}
//             <div className="bg-white rounded-2xl shadow-lg p-6">
//               <h2 className="text-xl font-bold text-gray-900 mb-6">
//                 Booking Details
//               </h2>

//               {/* Date and Time */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     <FaCalendarAlt className="inline mr-2 text-purple-600" />{" "}
//                     Pickup Date
//                   </label>
//                   <input
//                     type="date"
//                     value={selectedDate}
//                     onChange={(e) => setSelectedDate(e.target.value)}
//                     min={new Date().toISOString().split("T")[0]}
//                     className="w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-purple-500"
//                     required
//                   />
//                   <p className="text-sm text-gray-500 mt-1">
//                     Return date: {calculateReturnDate() || "Select date"}
//                   </p>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     <FaClock className="inline mr-2 text-purple-600" /> Pickup
//                     Time
//                   </label>
//                   <div className="flex flex-wrap gap-2">
//                     {timeSlots.map((time) => (
//                       <button
//                         key={time}
//                         onClick={() => setSelectedTime(time)}
//                         className={`px-3 py-2 rounded-lg text-sm transition ${
//                           selectedTime === time
//                             ? "bg-purple-600 text-white"
//                             : "bg-gray-100 hover:bg-gray-200"
//                         }`}
//                       >
//                         {time}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Locations */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     <FaMapMarkerAlt className="inline mr-2 text-purple-600" />{" "}
//                     Pickup Location
//                   </label>
//                   <input
//                     type="text"
//                     value={pickupLocation}
//                     onChange={(e) => setPickupLocation(e.target.value)}
//                     className="w-full px-4 py-3 bg-gray-50 border rounded-xl"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     <FaMapMarkerAlt className="inline mr-2 text-green-600" />{" "}
//                     Drop-off Location
//                   </label>
//                   <input
//                     type="text"
//                     value={dropoffLocation}
//                     onChange={(e) => setDropoffLocation(e.target.value)}
//                     className="w-full px-4 py-3 bg-gray-50 border rounded-xl"
//                   />
//                 </div>
//               </div>

//               {/* Rental Duration */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Rental Duration
//                 </label>
//                 <div className="flex items-center gap-4">
//                   <button
//                     onClick={() => setBookingDays(Math.max(1, bookingDays - 1))}
//                     className="w-10 h-10 bg-gray-100 rounded-lg text-xl hover:bg-gray-200"
//                   >
//                     -
//                   </button>
//                   <div className="text-center">
//                     <div className="text-2xl font-bold">
//                       {bookingDays} day{bookingDays > 1 ? "s" : ""}
//                     </div>
//                     <div className="text-sm text-gray-500">
//                       Total: {formatNPR(bike.ratePerDay * bookingDays)}
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => setBookingDays(bookingDays + 1)}
//                     className="w-10 h-10 bg-gray-100 rounded-lg text-xl hover:bg-gray-200"
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>

//               {/* Extras */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-3">
//                   <FaHelmetSafety className="inline mr-2 text-purple-600" />{" "}
//                   Extras
//                 </label>
//                 <div className="space-y-2">
//                   <label className="flex items-center gap-3 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={extraHelmet}
//                       onChange={(e) => setExtraHelmet(e.target.checked)}
//                       className="w-4 h-4 text-purple-600 rounded"
//                     />
//                     <span>Extra Helmet (+रु 100/day)</span>
//                   </label>
//                   <label className="flex items-center gap-3 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={ridingGear}
//                       onChange={(e) => setRidingGear(e.target.checked)}
//                       className="w-4 h-4 text-purple-600 rounded"
//                     />
//                     <span>Riding Gear (Jacket + Gloves) (+रु 200/day)</span>
//                   </label>
//                 </div>
//               </div>

//               {/* Rider Experience */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   <FaUser className="inline mr-2 text-purple-600" /> Riding
//                   Experience
//                 </label>
//                 <div className="flex gap-3">
//                   {experienceLevels.map((level) => (
//                     <button
//                       key={level}
//                       onClick={() => setRiderExperience(level)}
//                       className={`px-4 py-2 rounded-lg text-sm transition ${
//                         riderExperience === level
//                           ? "bg-purple-600 text-white"
//                           : "bg-gray-100 hover:bg-gray-200"
//                       }`}
//                     >
//                       {level}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Emergency Contact */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-3">
//                   <FaPhone className="inline mr-2 text-purple-600" /> Emergency
//                   Contact
//                 </label>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <input
//                     type="text"
//                     placeholder="Full Name"
//                     value={emergencyContact.name}
//                     onChange={(e) =>
//                       setEmergencyContact({
//                         ...emergencyContact,
//                         name: e.target.value,
//                       })
//                     }
//                     className="px-4 py-3 bg-gray-50 border rounded-xl"
//                     required
//                   />
//                   <input
//                     type="tel"
//                     placeholder="Phone Number"
//                     value={emergencyContact.phone}
//                     onChange={(e) =>
//                       setEmergencyContact({
//                         ...emergencyContact,
//                         phone: e.target.value,
//                       })
//                     }
//                     className="px-4 py-3 bg-gray-50 border rounded-xl"
//                     required
//                   />
//                   <input
//                     type="text"
//                     placeholder="Relationship"
//                     value={emergencyContact.relationship}
//                     onChange={(e) =>
//                       setEmergencyContact({
//                         ...emergencyContact,
//                         relationship: e.target.value,
//                       })
//                     }
//                     className="px-4 py-3 bg-gray-50 border rounded-xl"
//                   />
//                 </div>
//               </div>

//               {/* Special Requests */}
//               <div>
//                 <textarea
//                   value={specialRequests}
//                   onChange={(e) => setSpecialRequests(e.target.value)}
//                   rows="2"
//                   placeholder="Special requests (optional)"
//                   className="w-full px-4 py-3 bg-gray-50 border rounded-xl resize-none"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Pricing Summary */}
//           <div className="space-y-6">
//             <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
//               <h2 className="text-xl font-bold text-gray-900 mb-6">
//                 Price Summary
//               </h2>
//               <div className="space-y-3">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">
//                     Base Price ({bookingDays} days)
//                   </span>
//                   <span>{formatNPR(totals.basePrice)}</span>
//                 </div>
//                 {extraHelmet && (
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Extra Helmet</span>
//                     <span>{formatNPR(100 * bookingDays)}</span>
//                   </div>
//                 )}
//                 {ridingGear && (
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Riding Gear</span>
//                     <span>{formatNPR(200 * bookingDays)}</span>
//                   </div>
//                 )}
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Service Fee</span>
//                   <span>{formatNPR(totals.serviceFee)}</span>
//                 </div>
//                 <div className="border-t pt-3 mt-3">
//                   <div className="flex justify-between items-center">
//                     <span className="text-lg font-bold">Total</span>
//                     <span className="text-2xl font-bold text-purple-600">
//                       {formatNPR(totals.total)}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               <button
//                 onClick={handleBookNow}
//                 disabled={submitting}
//                 className="w-full mt-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:shadow-lg transition disabled:opacity-50"
//               >
//                 {submitting ? (
//                   <FaSpinner className="animate-spin mx-auto" />
//                 ) : (
//                   <>
//                     Continue to Document Upload{" "}
//                     <FaCreditCard className="inline ml-2" />
//                   </>
//                 )}
//               </button>
//               <div className="mt-4 text-center text-sm text-gray-500">
//                 • Free cancellation up to 24h before pickup • Helmet included
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white mt-12 pt-8 pb-6">
//         <div className="container mx-auto px-6">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <div className="flex items-center gap-3 mb-4 md:mb-0">
//               <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
//                 <FaMotorcycle className="text-white" />
//               </div>
//               <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//                 Rent<span className="text-white">Ride</span>
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

// export default BikeBooking;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaMotorcycle,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaPhone,
  FaShieldAlt,
  FaArrowLeft,
  FaSpinner,
  FaCreditCard,
  FaInfoCircle,
  FaUser,
} from "react-icons/fa";

import { FaHelmetSafety } from "react-icons/fa6";
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

const BikeBooking = () => {
  const navigate = useNavigate();
  const { bikeId } = useParams();

  const [bike, setBike] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("10:00");
  const [bookingDays, setBookingDays] = useState(1);
  const [pickupLocation, setPickupLocation] = useState("Kathmandu, Nepal");
  const [dropoffLocation, setDropoffLocation] = useState("Kathmandu, Nepal");
  const [extraHelmet, setExtraHelmet] = useState(false);
  const [ridingGear, setRidingGear] = useState(false);
  const [riderExperience, setRiderExperience] = useState("Intermediate");
  const [specialRequests, setSpecialRequests] = useState("");
  const [emergencyContact, setEmergencyContact] = useState({
    name: "",
    phone: "",
    relationship: "",
  });

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
  const experienceLevels = ["Beginner", "Intermediate", "Experienced"];

  useEffect(() => {
    fetchBikeDetails();
  }, [bikeId]);

  const fetchBikeDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/bikes/${bikeId}`);
      if (response.data.success) setBike(response.data.data);
    } catch (error) {
      setError("Failed to load bike details");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    if (!bike)
      return { basePrice: 0, extraCharges: 0, serviceFee: 200, total: 0 };
    const basePrice = bike.ratePerDay * bookingDays;
    let extraCharges = 0;
    if (extraHelmet) extraCharges += 100 * bookingDays;
    if (ridingGear) extraCharges += 200 * bookingDays;
    const serviceFee = 200;
    return {
      basePrice,
      extraCharges,
      serviceFee,
      total: basePrice + extraCharges + serviceFee,
    };
  };

  const totals = calculateTotal();
  const formatNPR = (amount) => `रु ${amount?.toLocaleString() || 0}`;

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
      alert("Please login to book a bike");
      navigate("/login");
      return;
    }
    if (!bike) {
      alert("Please select a bike first");
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
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const pickupDateObj = new Date(selectedDate);
    if (pickupDateObj < today) {
      alert("Pickup date cannot be in the past");
      return;
    }

    setSubmitting(true);
    try {
      const returnDate = calculateReturnDate();
      const pickupDateTime = new Date(selectedDate);
      const returnDateTime = new Date(returnDate);
      const bookingData = {
        bikeId: bike._id,
        pickupDate: pickupDateTime.toISOString(),
        pickupTime: selectedTime,
        returnDate: returnDateTime.toISOString(),
        returnTime: selectedTime,
        pickupLocation,
        dropoffLocation,
        extraHelmet,
        ridingGear,
        riderExperience,
        specialRequests,
        emergencyContact,
      };
      const response = await axiosInstance.post("/bikes/bookings", bookingData);
      if (response.data.success) {
        sessionStorage.setItem(
          "current_bike_booking_id",
          response.data.data.bookingId,
        );
        navigate("/bike-upload-documents", {
          state: {
            bookingId: response.data.data.bookingId,
            confirmationCode: response.data.data.confirmationCode,
            bikeDetails: bike,
            bookingDetails: {
              ...bookingData,
              totalAmount: totals.total,
              formattedTotal: formatNPR(totals.total),
              totalDays: bookingDays,
              basePrice: totals.basePrice,
              extraCharges: totals.extraCharges,
              serviceFee: totals.serviceFee,
            },
          },
        });
      } else {
        alert(response.data.message || "Failed to create booking");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert(
        error.response?.data?.message ||
          "Failed to create booking. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading bike details...</p>
        </div>
      </div>
    );
  }

  if (error || !bike) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || "Bike not found"}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <FaArrowLeft className="text-gray-700" />
            </button>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg">
                <FaMotorcycle className="text-white text-2xl" />
              </div>
              <h1 className="text-2xl font-bold text-blue-700">Book a Bike</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <div className="relative h-48 rounded-xl overflow-hidden bg-gray-100">
                      {bike.photos?.[0] ? (
                        <img
                          src={`http://localhost:5000/uploads/bikes/${bike.photos[0].filename}`}
                          alt={bike.bikeName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FaMotorcycle className="text-5xl text-gray-300" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900">
                      {bike.bikeName}
                    </h1>
                    <p className="text-gray-500">
                      {bike.brand} {bike.model} • {bike.year}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm border border-blue-100">
                        {bike.bikeType}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {bike.engineCapacity}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {bike.transmission}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <FaShieldAlt className="text-green-600" />
                      <span className="text-sm text-gray-600">
                        {bike.helmetIncluded ? "Helmet Included • " : ""}
                        {bike.licenseRequired} License Required
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Booking Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaCalendarAlt className="inline mr-2 text-blue-600" />{" "}
                    Pickup Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Return date: {calculateReturnDate() || "Select date"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaClock className="inline mr-2 text-blue-600" /> Pickup
                    Time
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`px-3 py-2 rounded-lg text-sm transition ${selectedTime === time ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaMapMarkerAlt className="inline mr-2 text-blue-600" />{" "}
                    Pickup Location
                  </label>
                  <input
                    type="text"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaMapMarkerAlt className="inline mr-2 text-green-600" />{" "}
                    Drop-off Location
                  </label>
                  <input
                    type="text"
                    value={dropoffLocation}
                    onChange={(e) => setDropoffLocation(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border rounded-xl"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rental Duration
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setBookingDays(Math.max(1, bookingDays - 1))}
                    className="w-10 h-10 bg-gray-100 rounded-lg text-xl hover:bg-gray-200"
                  >
                    -
                  </button>
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {bookingDays} day{bookingDays > 1 ? "s" : ""}
                    </div>
                    <div className="text-sm text-gray-500">
                      Total: {formatNPR(bike.ratePerDay * bookingDays)}
                    </div>
                  </div>
                  <button
                    onClick={() => setBookingDays(bookingDays + 1)}
                    className="w-10 h-10 bg-gray-100 rounded-lg text-xl hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <FaHelmetSafety className="inline mr-2 text-blue-600" />{" "}
                  Extras
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={extraHelmet}
                      onChange={(e) => setExtraHelmet(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span>Extra Helmet (+रु 100/day)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={ridingGear}
                      onChange={(e) => setRidingGear(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span>Riding Gear (Jacket + Gloves) (+रु 200/day)</span>
                  </label>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaUser className="inline mr-2 text-blue-600" /> Riding
                  Experience
                </label>
                <div className="flex gap-3">
                  {experienceLevels.map((level) => (
                    <button
                      key={level}
                      onClick={() => setRiderExperience(level)}
                      className={`px-4 py-2 rounded-lg text-sm transition ${riderExperience === level ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <FaPhone className="inline mr-2 text-blue-600" /> Emergency
                  Contact
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={emergencyContact.name}
                    onChange={(e) =>
                      setEmergencyContact({
                        ...emergencyContact,
                        name: e.target.value,
                      })
                    }
                    className="px-4 py-3 bg-gray-50 border rounded-xl"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={emergencyContact.phone}
                    onChange={(e) =>
                      setEmergencyContact({
                        ...emergencyContact,
                        phone: e.target.value,
                      })
                    }
                    className="px-4 py-3 bg-gray-50 border rounded-xl"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Relationship"
                    value={emergencyContact.relationship}
                    onChange={(e) =>
                      setEmergencyContact({
                        ...emergencyContact,
                        relationship: e.target.value,
                      })
                    }
                    className="px-4 py-3 bg-gray-50 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <textarea
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  rows="2"
                  placeholder="Special requests (optional)"
                  className="w-full px-4 py-3 bg-gray-50 border rounded-xl resize-none"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Price Summary
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Base Price ({bookingDays} days)
                  </span>
                  <span>{formatNPR(totals.basePrice)}</span>
                </div>
                {extraHelmet && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Extra Helmet</span>
                    <span>{formatNPR(100 * bookingDays)}</span>
                  </div>
                )}
                {ridingGear && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Riding Gear</span>
                    <span>{formatNPR(200 * bookingDays)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Fee</span>
                  <span>{formatNPR(totals.serviceFee)}</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-2xl font-bold text-blue-700">
                      {formatNPR(totals.total)}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleBookNow}
                disabled={submitting}
                className="w-full mt-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:shadow-lg transition disabled:opacity-50"
              >
                {submitting ? (
                  <FaSpinner className="animate-spin mx-auto" />
                ) : (
                  <>
                    Continue to Document Upload{" "}
                    <FaCreditCard className="inline ml-2" />
                  </>
                )}
              </button>
              <div className="mt-4 text-center text-sm text-gray-500">
                • Free cancellation up to 24h before pickup • Helmet included
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-white mt-12 pt-8 pb-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="p-2 bg-blue-700 rounded-lg">
                <FaMotorcycle className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-blue-600">
                Rent<span className="text-white">Ride</span>
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

export default BikeBooking;
