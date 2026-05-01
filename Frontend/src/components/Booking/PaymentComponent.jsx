// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation, useParams } from "react-router-dom";
// import axios from "axios";
// import {
//   FaWallet,
//   FaShieldAlt,
//   FaCheckCircle,
//   FaArrowLeft,
//   FaSpinner,
// } from "react-icons/fa";

// const API_URL = "http://localhost:5000/api";

// const axiosInstance = axios.create({
//   baseURL: API_URL,
//   timeout: 10000,
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error),
// );

// const PaymentComponent = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { bookingId } = useParams(); // Get booking ID from URL
//   const [paymentMethod, setPaymentMethod] = useState("khalti");
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [error, setError] = useState("");
//   const [booking, setBooking] = useState(null);
//   const [vehicleDetails, setVehicleDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [redirectChecked, setRedirectChecked] = useState(false);

//   // Check for missing booking details and redirect in useEffect
//   useEffect(() => {
//     if (!redirectChecked) {
//       // If we have a bookingId in URL, fetch booking details
//       if (bookingId) {
//         fetchBookingDetails();
//       }
//       // If we have booking details from state, use them
//       else if (location.state?.bookingDetails) {
//         const {
//           bookingDetails,
//           vehicleDetails: vehicle,
//           totals,
//           formattedTotal,
//         } = location.state;
//         setBooking(bookingDetails);
//         setVehicleDetails(vehicle);
//         setLoading(false);
//       }
//       // No booking data, redirect to home
//       else {
//         console.log("No booking details found, redirecting to home");
//         navigate("/rentridehome");
//       }
//       setRedirectChecked(true);
//     }
//   }, [bookingId, location.state, navigate, redirectChecked]);

//   const fetchBookingDetails = async () => {
//     try {
//       setLoading(true);
//       const response = await axiosInstance.get(`/bookings/${bookingId}`);

//       if (response.data.success) {
//         const bookingData = response.data.data.booking;
//         setBooking(bookingData);
//         setVehicleDetails(bookingData.vehicle);
//       } else {
//         setError("Failed to load booking details");
//       }
//     } catch (error) {
//       console.error("Error fetching booking:", error);
//       setError("Booking not found or you don't have permission to view it");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePayment = async () => {
//     setIsProcessing(true);
//     setError("");

//     try {
//       const bookingIdToUse = bookingId || booking?.id;

//       if (!bookingIdToUse) {
//         throw new Error("No booking ID found");
//       }

//       // Initiate payment
//       if (paymentMethod === "khalti") {
//         console.log("Initiating Khalti payment for booking:", bookingIdToUse);
//         const paymentResponse = await axiosInstance.post(
//           "/payments/initiate-khalti",
//           {
//             bookingId: bookingIdToUse,
//           },
//         );

//         if (paymentResponse.data.success && paymentResponse.data.payment_url) {
//           // Store booking ID for verification
//           sessionStorage.setItem("current_booking_id", bookingIdToUse);
//           sessionStorage.setItem(
//             "current_payment_pidx",
//             paymentResponse.data.pidx,
//           );
//           // Redirect to Khalti payment page
//           window.location.href = paymentResponse.data.payment_url;
//         } else {
//           throw new Error(
//             paymentResponse.data.message || "Failed to initiate payment",
//           );
//         }
//       }
//     } catch (error) {
//       console.error("Payment initiation error:", error);
//       setError(
//         error.response?.data?.message ||
//           error.message ||
//           "Payment failed. Please try again.",
//       );
//       setIsProcessing(false);
//     }
//   };

//   const formatCurrency = (amount) => {
//     return "रु " + amount.toLocaleString("en-NP");
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading booking details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
//         <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-lg">
//           <div className="text-red-600 text-4xl mb-4">⚠️</div>
//           <h2 className="text-xl font-semibold mb-2">Error</h2>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={() => navigate("/rentridehome")}
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             Back to Home
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
//               className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//             >
//               <FaArrowLeft className="text-gray-700 text-lg" />
//             </button>
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl shadow-lg">
//                 <FaWallet className="text-white text-2xl" />
//               </div>
//               <h1 className="text-2xl font-bold text-gray-900">
//                 Complete<span className="text-purple-600"> Payment</span>
//               </h1>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="container mx-auto px-6 py-12">
//         <div className="max-w-6xl mx-auto">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Payment Methods */}
//             <div className="space-y-6">
//               <div className="bg-white rounded-2xl shadow-lg p-6">
//                 <h2 className="text-xl font-bold text-gray-900 mb-4">
//                   Select Payment Method
//                 </h2>

//                 {/* Khalti Option */}
//                 <div
//                   className={`border-2 rounded-xl p-4 mb-4 cursor-pointer transition-all ${
//                     paymentMethod === "khalti"
//                       ? "border-purple-500 bg-purple-50"
//                       : "border-gray-200 hover:border-purple-300"
//                   }`}
//                   onClick={() => setPaymentMethod("khalti")}
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-4">
//                       <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
//                         <FaWallet className="text-purple-600 text-xl" />
//                       </div>
//                       <div>
//                         <h3 className="font-semibold text-gray-900">Khalti</h3>
//                         <p className="text-sm text-gray-600">
//                           Pay with Khalti wallet, e-banking, or mobile banking
//                         </p>
//                       </div>
//                     </div>
//                     {paymentMethod === "khalti" && (
//                       <FaCheckCircle className="text-purple-600 text-xl" />
//                     )}
//                   </div>
//                 </div>

//                 {error && (
//                   <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
//                     <p className="text-red-600 text-sm">{error}</p>
//                   </div>
//                 )}

//                 <button
//                   onClick={handlePayment}
//                   disabled={isProcessing}
//                   className="w-full mt-6 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {isProcessing ? (
//                     <div className="flex items-center justify-center gap-2">
//                       <FaSpinner className="animate-spin" />
//                       Processing...
//                     </div>
//                   ) : (
//                     `Pay ${formatCurrency(booking?.totalAmount || 0)}`
//                   )}
//                 </button>

//                 <p className="text-center text-xs text-gray-500 mt-4">
//                   Secure payment powered by Khalti. Your payment information is
//                   encrypted.
//                 </p>
//               </div>
//             </div>

//             {/* Booking Summary */}
//             <div className="bg-white rounded-2xl shadow-lg p-6">
//               <h2 className="text-xl font-bold text-gray-900 mb-4">
//                 Booking Summary
//               </h2>

//               <div className="space-y-4">
//                 {/* Vehicle Info */}
//                 {vehicleDetails && (
//                   <div className="flex gap-4 pb-4 border-b">
//                     <img
//                       src={
//                         vehicleDetails.photos?.[0]?.filename
//                           ? `http://localhost:5000/uploads/vehicles/${vehicleDetails.photos[0].filename}`
//                           : vehicleDetails.vehiclePhotos?.[0]?.filename
//                             ? `http://localhost:5000/uploads/user-vehicles/${vehicleDetails.vehiclePhotos[0].filename}`
//                             : "https://images.unsplash.com/photo-1560958089-b8a1929cea89"
//                       }
//                       alt={vehicleDetails.carName}
//                       className="w-20 h-20 object-cover rounded-lg"
//                     />
//                     <div className="flex-1">
//                       <h3 className="font-semibold text-gray-900">
//                         {vehicleDetails.carName}
//                       </h3>
//                       <p className="text-sm text-gray-600">
//                         {vehicleDetails.carType}
//                       </p>
//                       <p className="text-xs text-gray-500 mt-1">
//                         {booking?.totalDays} day(s)
//                       </p>
//                     </div>
//                   </div>
//                 )}

//                 {/* Booking Details */}
//                 {booking && (
//                   <div className="space-y-2">
//                     <div className="flex justify-between text-sm">
//                       <span className="text-gray-600">Pickup Date</span>
//                       <span className="font-medium">
//                         {new Date(booking.pickupDate).toLocaleDateString()}
//                       </span>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span className="text-gray-600">Pickup Time</span>
//                       <span className="font-medium">{booking.pickupTime}</span>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span className="text-gray-600">Driver Option</span>
//                       <span className="font-medium capitalize">
//                         {booking.driverOption === "with"
//                           ? "With Driver"
//                           : "Self Drive"}
//                       </span>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span className="text-gray-600">Insurance</span>
//                       <span className="font-medium capitalize">
//                         {booking.insuranceOption === "premium"
//                           ? "Premium"
//                           : "Basic"}
//                       </span>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span className="text-gray-600">Confirmation Code</span>
//                       <span className="font-medium text-blue-600">
//                         {booking.confirmationCode}
//                       </span>
//                     </div>
//                   </div>
//                 )}

//                 {/* Price Breakdown */}
//                 {booking && (
//                   <div className="border-t pt-4 mt-4">
//                     <div className="space-y-2">
//                       <div className="flex justify-between text-sm">
//                         <span className="text-gray-600">Base Price</span>
//                         <span>{formatCurrency(booking.basePrice)}</span>
//                       </div>
//                       {booking.driverFee > 0 && (
//                         <div className="flex justify-between text-sm">
//                           <span className="text-gray-600">Driver Fee</span>
//                           <span>{formatCurrency(booking.driverFee)}</span>
//                         </div>
//                       )}
//                       {booking.insuranceFee > 0 && (
//                         <div className="flex justify-between text-sm">
//                           <span className="text-gray-600">
//                             Premium Insurance
//                           </span>
//                           <span>{formatCurrency(booking.insuranceFee)}</span>
//                         </div>
//                       )}
//                       <div className="flex justify-between text-sm">
//                         <span className="text-gray-600">Service Fee</span>
//                         <span>{formatCurrency(booking.serviceFee)}</span>
//                       </div>
//                     </div>

//                     <div className="border-t mt-4 pt-4">
//                       <div className="flex justify-between items-center">
//                         <span className="text-lg font-bold text-gray-900">
//                           Total Amount
//                         </span>
//                         <span className="text-2xl font-bold text-purple-600">
//                           {formatCurrency(booking.totalAmount)}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentComponent;

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import {
  FaWallet,
  FaShieldAlt,
  FaCheckCircle,
  FaArrowLeft,
  FaSpinner,
  FaMotorcycle,
  FaCar,
} from "react-icons/fa";

const API_URL = "http://localhost:5000/api";

const axiosInstance = axios.create({ baseURL: API_URL, timeout: 10000 });
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

const PaymentComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookingId } = useParams();
  const [paymentMethod, setPaymentMethod] = useState("khalti");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [booking, setBooking] = useState(null);
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [redirectChecked, setRedirectChecked] = useState(false);
  const [isBikeBooking, setIsBikeBooking] = useState(false);

  useEffect(() => {
    if (!redirectChecked) {
      if (bookingId) {
        fetchBookingDetails();
      } else if (location.state?.bookingDetails) {
        const { bookingDetails, vehicleDetails: vehicle } = location.state;
        setBooking(bookingDetails);
        setVehicleDetails(vehicle);
        setLoading(false);
      } else {
        navigate("/rentridehome");
      }
      setRedirectChecked(true);
    }
  }, [bookingId, location.state, navigate, redirectChecked]);

  const fetchBookingDetails = async () => {
    try {
      setLoading(true);

      // 1️⃣ Try vehicle booking first
      try {
        const response = await axiosInstance.get(`/bookings/${bookingId}`);
        if (response.data.success) {
          const bookingData = response.data.data.booking;
          setBooking(bookingData);
          setVehicleDetails(bookingData.vehicle);
          setIsBikeBooking(false);
          return;
        }
      } catch (vehicleErr) {
        // 404 → try bike booking
        if (vehicleErr.response?.status !== 404) throw vehicleErr;
      }

      // 2️⃣ Try bike booking
      try {
        const bikeRes = await axiosInstance.get(`/bikes/bookings/${bookingId}`);
        if (bikeRes.data.success) {
          const bikeBooking = bikeRes.data.data;
          setBooking(bikeBooking);
          setVehicleDetails(bikeBooking.bike);
          setIsBikeBooking(true);
          // Store for PaymentSuccess verification
          sessionStorage.setItem("current_bike_booking_id", bookingId);
          return;
        }
      } catch (bikeErr) {
        if (bikeErr.response?.status !== 404) throw bikeErr;
      }

      setError("Booking not found or you don't have permission to view it");
    } catch (err) {
      console.error("Error fetching booking:", err);
      setError("Booking not found or you don't have permission to view it");
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    setError("");

    try {
      const bookingIdToUse = bookingId || booking?.id || booking?._id;
      if (!bookingIdToUse) throw new Error("No booking ID found");

      if (paymentMethod === "khalti") {
        // Choose endpoint based on booking type
        const endpoint = isBikeBooking
          ? "/bike-payments/initiate-khalti"
          : "/payments/initiate-khalti";

        const paymentResponse = await axiosInstance.post(endpoint, {
          bookingId: bookingIdToUse,
        });

        if (paymentResponse.data.success && paymentResponse.data.payment_url) {
          // Store the correct session key for PaymentSuccess to verify
          if (isBikeBooking) {
            sessionStorage.setItem("current_bike_booking_id", bookingIdToUse);
            sessionStorage.removeItem("current_booking_id");
          } else {
            sessionStorage.setItem("current_booking_id", bookingIdToUse);
            sessionStorage.removeItem("current_bike_booking_id");
          }
          sessionStorage.setItem(
            "current_payment_pidx",
            paymentResponse.data.pidx,
          );
          window.location.href = paymentResponse.data.payment_url;
        } else {
          throw new Error(
            paymentResponse.data.message || "Failed to initiate payment",
          );
        }
      }
    } catch (err) {
      console.error("Payment initiation error:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Payment failed. Please try again.",
      );
      setIsProcessing(false);
    }
  };

  const formatCurrency = (amount) =>
    "रु " + (amount || 0).toLocaleString("en-NP");

  const vehicleName = isBikeBooking
    ? vehicleDetails?.bikeName
    : vehicleDetails?.carName;

  const vehicleType = isBikeBooking
    ? vehicleDetails?.bikeType
    : vehicleDetails?.carType;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-lg">
          <div className="text-red-600 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate("/rentridehome")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaArrowLeft className="text-gray-700 text-lg" />
            </button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl shadow-lg">
                {isBikeBooking ? (
                  <FaMotorcycle className="text-white text-2xl" />
                ) : (
                  <FaWallet className="text-white text-2xl" />
                )}
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                Complete<span className="text-purple-600"> Payment</span>
              </h1>
              {isBikeBooking && (
                <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                  Bike Booking
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Payment Methods */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Select Payment Method
                </h2>

                <div
                  className={`border-2 rounded-xl p-4 mb-4 cursor-pointer transition-all ${
                    paymentMethod === "khalti"
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-purple-300"
                  }`}
                  onClick={() => setPaymentMethod("khalti")}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <FaWallet className="text-purple-600 text-xl" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Khalti</h3>
                        <p className="text-sm text-gray-600">
                          Pay with Khalti wallet, e-banking, or mobile banking
                        </p>
                      </div>
                    </div>
                    {paymentMethod === "khalti" && (
                      <FaCheckCircle className="text-purple-600 text-xl" />
                    )}
                  </div>
                </div>

                {error && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full mt-6 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center gap-2">
                      <FaSpinner className="animate-spin" /> Processing...
                    </div>
                  ) : (
                    `Pay ${formatCurrency(booking?.totalAmount || 0)}`
                  )}
                </button>

                <p className="text-center text-xs text-gray-500 mt-4">
                  Secure payment powered by Khalti. Your payment information is
                  encrypted.
                </p>
              </div>
            </div>

            {/* Booking Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Booking Summary
              </h2>
              <div className="space-y-4">
                {/* Vehicle / Bike Info */}
                {vehicleDetails && (
                  <div className="flex gap-4 pb-4 border-b">
                    {isBikeBooking ? (
                      <div className="w-20 h-20 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        {vehicleDetails.photos?.[0]?.filename ? (
                          <img
                            src={`http://localhost:5000/uploads/bikes/${vehicleDetails.photos[0].filename}`}
                            alt={vehicleName}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        ) : (
                          <FaMotorcycle className="text-purple-300 text-4xl" />
                        )}
                      </div>
                    ) : (
                      <img
                        src={
                          vehicleDetails.photos?.[0]?.filename
                            ? `http://localhost:5000/uploads/vehicles/${vehicleDetails.photos[0].filename}`
                            : vehicleDetails.vehiclePhotos?.[0]?.filename
                              ? `http://localhost:5000/uploads/user-vehicles/${vehicleDetails.vehiclePhotos[0].filename}`
                              : "https://images.unsplash.com/photo-1560958089-b8a1929cea89"
                        }
                        alt={vehicleName}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {vehicleName}
                      </h3>
                      <p className="text-sm text-gray-600">{vehicleType}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {booking?.totalDays} day(s)
                      </p>
                    </div>
                  </div>
                )}

                {/* Booking Details */}
                {booking && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Pickup Date</span>
                      <span className="font-medium">
                        {new Date(booking.pickupDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Pickup Time</span>
                      <span className="font-medium">{booking.pickupTime}</span>
                    </div>
                    {!isBikeBooking && (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Driver Option</span>
                          <span className="font-medium">
                            {booking.driverOption === "with"
                              ? "With Driver"
                              : "Self Drive"}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Insurance</span>
                          <span className="font-medium">
                            {booking.insuranceOption === "premium"
                              ? "Premium"
                              : "Basic"}
                          </span>
                        </div>
                      </>
                    )}
                    {isBikeBooking && booking.riderExperience && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Rider Experience</span>
                        <span className="font-medium">
                          {booking.riderExperience}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Confirmation Code</span>
                      <span className="font-medium text-blue-600">
                        {booking.confirmationCode}
                      </span>
                    </div>
                  </div>
                )}

                {/* Price Breakdown */}
                {booking && (
                  <div className="border-t pt-4 mt-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Base Price</span>
                        <span>{formatCurrency(booking.basePrice)}</span>
                      </div>
                      {!isBikeBooking && booking.driverFee > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Driver Fee</span>
                          <span>{formatCurrency(booking.driverFee)}</span>
                        </div>
                      )}
                      {!isBikeBooking && booking.insuranceFee > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            Premium Insurance
                          </span>
                          <span>{formatCurrency(booking.insuranceFee)}</span>
                        </div>
                      )}
                      {isBikeBooking && booking.extraHelmet && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Extra Helmet</span>
                          <span>{formatCurrency(100 * booking.totalDays)}</span>
                        </div>
                      )}
                      {isBikeBooking && booking.ridingGear && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Riding Gear</span>
                          <span>{formatCurrency(200 * booking.totalDays)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Service Fee</span>
                        <span>{formatCurrency(booking.serviceFee)}</span>
                      </div>
                    </div>
                    <div className="border-t mt-4 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900">
                          Total Amount
                        </span>
                        <span className="text-2xl font-bold text-purple-600">
                          {formatCurrency(booking.totalAmount)}
                        </span>
                      </div>
                    </div>
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

export default PaymentComponent;
