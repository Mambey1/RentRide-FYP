import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  FaMotorcycle,
  FaArrowLeft,
  FaSpinner,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";

const API_URL = "http://localhost:5000/api";

const BikePayment = () => {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBooking();
  }, [bookingId]);

  const fetchBooking = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/bikes/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setBooking(res.data.data);
      } else {
        setError("Booking not found");
      }
    } catch (err) {
      // If no specific bike booking endpoint, use the booking details from sessionStorage context
      setError("Failed to load booking details");
    } finally {
      setLoading(false);
    }
  };

  const handlePayNow = async () => {
    setPaying(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API_URL}/bike-payments/initiate-khalti`,
        { bookingId },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (res.data.success && res.data.payment_url) {
        // Store booking ID so PaymentSuccess can verify it
        sessionStorage.setItem("current_bike_booking_id", bookingId);
        window.location.href = res.data.payment_url;
      } else {
        setError("Failed to initiate payment. Please try again.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to initiate payment. Please try again.",
      );
    } finally {
      setPaying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading booking details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <FaArrowLeft /> Back
        </button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaMotorcycle className="text-white text-4xl" />
            </div>
            <h1 className="text-2xl font-bold text-white">
              Complete Your Payment
            </h1>
            <p className="text-purple-100 mt-1 text-sm">
              Bike Booking Confirmation
            </p>
          </div>

          <div className="p-6">
            {error ? (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-600 text-sm">
                {error}
              </div>
            ) : booking ? (
              <>
                {/* Booking Summary */}
                <div className="bg-gray-50 rounded-2xl p-4 mb-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Booking ID</span>
                    <span className="font-semibold text-gray-800">
                      {booking.confirmationCode}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Bike</span>
                    <span className="font-semibold text-gray-800">
                      {booking.bike?.bikeName || "Bike"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Duration</span>
                    <span className="font-semibold text-gray-800">
                      {booking.totalDays} day
                      {booking.totalDays !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between">
                    <span className="font-bold text-gray-800">
                      Total Amount
                    </span>
                    <span className="font-black text-2xl text-purple-600">
                      रु {booking.totalAmount?.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                  <FaShieldAlt className="text-green-500 flex-shrink-0" />
                  <span>
                    Secure payment via Khalti · SSL encrypted · Instant
                    confirmation
                  </span>
                </div>
              </>
            ) : (
              /* No booking data — show payment button anyway using bookingId from URL */
              <div className="bg-purple-50 rounded-2xl p-4 mb-6">
                <p className="text-purple-700 text-sm text-center">
                  Click below to proceed with your bike booking payment.
                </p>
              </div>
            )}

            {/* Pay Button */}
            <button
              onClick={handlePayNow}
              disabled={paying}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl hover:shadow-2xl hover:shadow-purple-500/30 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {paying ? (
                <>
                  <FaSpinner className="animate-spin" /> Redirecting to
                  Khalti...
                </>
              ) : (
                <>
                  <img
                    src="https://web.khalti.com/static/img/logo1.png"
                    alt="Khalti"
                    className="h-6"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                  Pay with Khalti
                </>
              )}
            </button>

            <p className="text-center text-xs text-gray-400 mt-4">
              You'll be redirected to Khalti's secure payment page
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BikePayment;
