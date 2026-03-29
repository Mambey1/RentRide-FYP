import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaArrowLeft,
  FaUpload,
  FaCheckCircle,
  FaSpinner,
  FaIdCard,
  FaPassport,
  FaCar,
  FaFileSignature,
  FaExclamationTriangle,
  FaClock,
} from "react-icons/fa";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const UploadDocuments = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    bookingId,
    confirmationCode,
    vehicleDetails,
    driverOption,
    bookingDetails,
  } = location.state || {};

  const [citizenshipFront, setCitizenshipFront] = useState(null);
  const [citizenshipBack, setCitizenshipBack] = useState(null);
  const [licenseFront, setLicenseFront] = useState(null);
  const [licenseBack, setLicenseBack] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState("");
  const [agreedToContract, setAgreedToContract] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const isSelfDrive = driverOption === "without";

  if (!bookingId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">No booking found. Please start over.</p>
          <button
            onClick={() => navigate("/rentridehome")}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleFileChange = (e, setFile, fileType) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError(`${fileType} file size must be less than 5MB`);
        return;
      }
      setFile(file);
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required documents based on driver option
    if (!citizenshipFront || !citizenshipBack) {
      setError("Please upload both sides of your citizenship certificate");
      return;
    }

    if (isSelfDrive && (!licenseFront || !licenseBack)) {
      setError(
        "For self-drive, please upload both sides of your driver's license",
      );
      return;
    }

    if (!agreedToContract) {
      setError("You must agree to the contract terms before proceeding");
      return;
    }

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("booking", bookingId);
    formData.append("vehicle", vehicleDetails._id);
    formData.append("citizenshipFront", citizenshipFront);
    formData.append("citizenshipBack", citizenshipBack);

    if (isSelfDrive && licenseFront && licenseBack) {
      formData.append("licenseFront", licenseFront);
      formData.append("licenseBack", licenseBack);
    }

    try {
      const response = await axiosInstance.post("/documents/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        setUploaded(true);
        setShowSuccessModal(true); // Show success modal
      }
    } catch (error) {
      console.error("Upload error:", error);
      setError(error.response?.data?.message || "Failed to upload documents");
    } finally {
      setUploading(false);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    // Optional: Navigate to profile page after closing modal
    // navigate("/profiledetails");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-6 max-w-3xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center gap-2"
        >
          <FaArrowLeft className="text-gray-700" />
          Back
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUpload className="text-blue-600 text-3xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Upload Documents
            </h1>
            <p className="text-gray-600 mt-2">
              Please upload the required documents for verification
            </p>
            {confirmationCode && (
              <p className="text-sm text-blue-600 mt-2">
                Booking Code: {confirmationCode}
              </p>
            )}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <FaCar className="text-blue-600 mt-1" />
              <div>
                <p className="font-semibold text-gray-900">
                  {vehicleDetails?.carName}
                </p>
                <p className="text-sm text-gray-600">Booking ID: {bookingId}</p>
                <p className="text-sm text-gray-600">
                  Total Amount: रु{" "}
                  {bookingDetails?.totalAmount?.toLocaleString()}
                </p>
                <p className="text-sm font-medium text-blue-600 mt-1">
                  Driver Option: {isSelfDrive ? "Self Drive" : "With Driver"}
                </p>
              </div>
            </div>
          </div>

          {/* Disclaimer Section */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <FaExclamationTriangle className="text-yellow-600 text-xl mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Important: Vehicle Pickup Terms
                </h3>
                <p className="text-gray-700 text-sm mb-3">
                  At the time of vehicle pickup,{" "}
                  <strong className="text-red-600">
                    the person who has uploaded these documents must be
                    physically present
                  </strong>{" "}
                  to sign the rental contract.
                </p>
                <p className="text-gray-700 text-sm">
                  Vehicle will{" "}
                  <strong className="text-red-600">NOT be provided</strong> if:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
                  <li>A different person attempts to pick up the vehicle</li>
                  <li>
                    The documents uploaded do not match the person picking up
                  </li>
                  <li>The contract is not signed at the time of pickup</li>
                </ul>
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm font-semibold">
                    ⚠️ No signature = No vehicle. This is strictly enforced.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Citizenship Certificate - Required for everyone */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaIdCard className="text-blue-600" />
                Citizenship Certificate (Required)
              </h3>

              <label className="block mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-semibold text-gray-900">
                    Front Side
                  </span>
                  <span className="text-red-500">*</span>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) =>
                      handleFileChange(
                        e,
                        setCitizenshipFront,
                        "Citizenship front",
                      )
                    }
                    className="hidden"
                    id="citizenshipFront"
                  />
                  <label
                    htmlFor="citizenshipFront"
                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-100 transition text-center"
                  >
                    {citizenshipFront ? citizenshipFront.name : "Choose file"}
                  </label>
                </div>
              </label>

              <label className="block">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-semibold text-gray-900">Back Side</span>
                  <span className="text-red-500">*</span>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) =>
                      handleFileChange(
                        e,
                        setCitizenshipBack,
                        "Citizenship back",
                      )
                    }
                    className="hidden"
                    id="citizenshipBack"
                  />
                  <label
                    htmlFor="citizenshipBack"
                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-100 transition text-center"
                  >
                    {citizenshipBack ? citizenshipBack.name : "Choose file"}
                  </label>
                </div>
              </label>
            </div>

            {/* Driver's License - Only for Self Drive */}
            {isSelfDrive && (
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FaPassport className="text-blue-600" />
                  Driver's License (Required for Self Drive)
                </h3>

                <label className="block mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-gray-900">
                      Front Side
                    </span>
                    <span className="text-red-500">*</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) =>
                        handleFileChange(e, setLicenseFront, "License front")
                      }
                      className="hidden"
                      id="licenseFront"
                    />
                    <label
                      htmlFor="licenseFront"
                      className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-100 transition text-center"
                    >
                      {licenseFront ? licenseFront.name : "Choose file"}
                    </label>
                  </div>
                </label>

                <label className="block">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-gray-900">
                      Back Side
                    </span>
                    <span className="text-red-500">*</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) =>
                        handleFileChange(e, setLicenseBack, "License back")
                      }
                      className="hidden"
                      id="licenseBack"
                    />
                    <label
                      htmlFor="licenseBack"
                      className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-100 transition text-center"
                    >
                      {licenseBack ? licenseBack.name : "Choose file"}
                    </label>
                  </div>
                </label>
              </div>
            )}

            {/* Contract Agreement */}
            <div className="border-2 border-gray-300 rounded-xl p-6 bg-gray-50">
              <div className="flex items-start gap-3">
                <FaFileSignature className="text-blue-600 text-xl mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    Rental Contract Agreement
                  </h3>
                  <p className="text-sm text-gray-700 mb-3">
                    By checking this box, you acknowledge and agree that:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside mb-4">
                    <li>You are the person who uploaded these documents</li>
                    <li>
                      You will be physically present at the time of vehicle
                      pickup
                    </li>
                    <li>
                      You will sign the rental contract before receiving the
                      vehicle
                    </li>
                    <li>
                      You understand that failure to sign the contract will
                      result in vehicle not being provided
                    </li>
                    <li>
                      You accept full responsibility for the vehicle during the
                      rental period
                    </li>
                  </ul>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreedToContract}
                      onChange={(e) => setAgreedToContract(e.target.checked)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700 font-medium">
                      I agree to the terms and conditions and confirm that I
                      will sign the contract at pickup
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={uploading || uploaded}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50"
            >
              {uploading ? (
                <div className="flex items-center justify-center gap-2">
                  <FaSpinner className="animate-spin" />
                  Uploading...
                </div>
              ) : (
                "Submit Documents"
              )}
            </button>

            <p className="text-center text-sm text-gray-500">
              Your documents will be verified by our team. You'll receive a
              notification once verified.
            </p>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 transform transition-all animate-fade-in-up">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle className="text-green-600 text-3xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Documents Submitted Successfully!
              </h2>
              <p className="text-gray-600 mb-6">
                Your booking has been submitted and is pending verification.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <FaClock className="text-blue-600 mt-1" />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900 mb-1">
                      What happens next?
                    </p>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>
                        ✓ Our team will verify your documents within 24 hours
                      </li>
                      <li>✓ You'll receive a notification once verified</li>
                      <li>
                        ✓ You can track your booking status in your profile
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCloseModal}
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:shadow-lg transition-all"
              >
                OK
              </button>

              <p className="text-xs text-gray-500 mt-4">
                You can check your booking status anytime in your profile
                dashboard
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default UploadDocuments;
