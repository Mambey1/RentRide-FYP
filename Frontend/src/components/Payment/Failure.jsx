import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FaTimesCircle, FaArrowLeft } from "react-icons/fa";

const PaymentFailure = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const updatePaymentStatus = async () => {
      const queryParams = new URLSearchParams(location.search);
      const pidx = queryParams.get("pidx");
      const bookingId = sessionStorage.getItem("current_booking_id");

      if (bookingId) {
        try {
          // Update payment status to failed in backend
          await axios.post(
            "http://localhost:5000/api/payments/verify-khalti",
            { 
              pidx, 
              bookingId,
              status: "FAILED" 
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          // Clear session storage
          sessionStorage.removeItem("current_booking_id");
          sessionStorage.removeItem("current_payment_pidx");
        } catch (error) {
          console.error("Error updating payment status:", error);
        }
      }
    };

    updatePaymentStatus();
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center py-12">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaTimesCircle className="text-red-500 text-4xl" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Failed ❌
        </h1>
        <p className="text-gray-600 mb-6">
          Your payment could not be processed. Please try again.
        </p>

        <div className="bg-yellow-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-800 text-left">
            💡 If the amount was deducted from your account, it will be automatically refunded within 3-5 business days.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate(-1)}
            className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2"
          >
            <FaArrowLeft /> Try Again
          </button>
          <button
            onClick={() => navigate("/rentridehome")}
            className="w-full py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;