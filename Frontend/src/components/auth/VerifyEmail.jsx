import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaEnvelope, FaLock, FaArrowLeft, FaRedo } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyEmail = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get email from location state or localStorage
    const storedEmail =
      location.state?.email || localStorage.getItem("pendingVerificationEmail");
    if (storedEmail) {
      setEmail(storedEmail);
      localStorage.setItem("pendingVerificationEmail", storedEmail);
    } else {
      navigate("/signup");
    }

    // Start countdown timer if exists
    const lastResendTime = localStorage.getItem("lastResendTime");
    if (lastResendTime) {
      const timePassed = Math.floor(
        (Date.now() - parseInt(lastResendTime)) / 1000,
      );
      const remaining = 60 - timePassed;
      if (remaining > 0) {
        setCountdown(remaining);
      }
    }
  }, [location, navigate]);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Allow only single digit

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (pastedData.length === 6 && /^\d+$/.test(pastedData)) {
      const otpArray = pastedData.split("");
      setOtp(otpArray);
      document.getElementById("otp-5").focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join("");

    if (otpString.length !== 6) {
      toast.error("Please enter complete 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpString }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Verification failed");
      }

      toast.success("Email verified successfully!");

      // Store token and user data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.removeItem("pendingVerificationEmail");

      // Redirect to home after delay
      setTimeout(() => {
        navigate("/rentridehome", { replace: true });
      }, 1500);
    } catch (error) {
      toast.error(error.message || "Verification failed");
      // Clear OTP on error
      setOtp(["", "", "", "", "", ""]);
      document.getElementById("otp-0").focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) {
      toast.error(`Please wait ${countdown} seconds before resending`);
      return;
    }

    setResendLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to resend OTP");
      }

      toast.success("New OTP sent to your email!");

      // Set countdown
      setCountdown(60);
      localStorage.setItem("lastResendTime", Date.now().toString());

      // Clear OTP inputs
      setOtp(["", "", "", "", "", ""]);
      document.getElementById("otp-0").focus();
    } catch (error) {
      toast.error(error.message || "Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <button
              onClick={handleGoBack}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-4"
            >
              <FaArrowLeft />
              <span className="text-sm">Back to Sign Up</span>
            </button>

            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg">
                <FaLock className="text-white text-xl" />
              </div>
              <h1 className="text-2xl font-bold">
                Verify Your <span className="text-blue-600">Email</span>
              </h1>
            </div>

            <p className="text-gray-600">Enter the 6-digit code sent to</p>
            <p className="font-semibold text-gray-900 mt-1">{email}</p>
          </div>

          {/* OTP Inputs */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
              Verification Code
            </label>

            <div
              className="flex justify-center gap-3 mb-6"
              onPaste={handlePaste}
            >
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
              ))}
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Didn't receive the code?</span>
              <button
                onClick={handleResendOTP}
                disabled={countdown > 0 || resendLoading}
                className="text-blue-600 font-medium hover:text-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <FaRedo className={resendLoading ? "animate-spin" : ""} />
                {countdown > 0 ? `Resend in ${countdown}s` : "Resend OTP"}
              </button>
            </div>
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={loading || otp.some((d) => d === "")}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg shadow hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Verifying...
              </>
            ) : (
              "Verify Email"
            )}
          </button>

          {/* Info */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-start gap-3">
              <FaEnvelope className="text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-700">
                  <strong>Check your inbox and spam folder</strong> for the
                  verification email.
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  The OTP is valid for 10 minutes
                </p>
              </div>
            </div>
          </div>

          {/* Help Text */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Having trouble? Contact{" "}
            <a
              href="mailto:support@rentride.com"
              className="text-blue-600 hover:text-blue-700"
            >
              support@rentride.com
            </a>
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>
    </div>
  );
};

export default VerifyEmail;
