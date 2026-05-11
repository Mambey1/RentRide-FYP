import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaCar,
  FaArrowLeft,
  FaCheckCircle,
  FaTimesCircle,
  FaUpload,
  FaCamera,
  FaTimes,
  FaUser,
  FaPhone,
  FaIdCard,
  FaMapMarkerAlt,
  FaFileAlt,
  FaShieldAlt,
  FaExclamationTriangle,
  FaInfoCircle,
  FaAddressCard,
  FaFileInvoice,
  FaLeaf,
  FaIdCard as FaCitizenship,
  FaPercentage,
  FaWallet,
} from "react-icons/fa";

const ListYourVehicle = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Vehicle Details State
  const [vehicleData, setVehicleData] = useState({
    carName: "",
    carNumber: "",
    carType: "SUV",
    ratePerDay: "",
    seats: "4",
    bookingType: "Both",
    gearType: "Automatic",
    airCondition: "Yes",
    description: "",
    features: "",
  });

  // Personal Information State
  const [personalData, setPersonalData] = useState({
    fullName: "",
    citizenshipNumber: "",
    phoneNumber: "",
    address: "",
    city: "",
    district: "",
    passportPhoto: null,
  });

  // Citizenship Document State
  const [citizenshipDocs, setCitizenshipDocs] = useState({
    citizenshipFront: null,
    citizenshipBack: null,
  });

  const [citizenshipPreviews, setCitizenshipPreviews] = useState({
    citizenshipFront: null,
    citizenshipBack: null,
  });

  // Vehicle Documents State
  const [documentFiles, setDocumentFiles] = useState({
    blueBook: null,
    insurance: null,
    pollution: null,
  });

  const [documentPreviews, setDocumentPreviews] = useState({
    blueBook: null,
    insurance: null,
    pollution: null,
  });

  // Vehicle Images State
  const [imageFiles, setImageFiles] = useState({
    frontView: null,
    insideView: null,
    rearView: null,
    sideView: null,
    extraView: null,
  });

  const [imagePreviews, setImagePreviews] = useState({
    frontView: null,
    insideView: null,
    rearView: null,
    sideView: null,
    extraView: null,
  });

  const fileInputRefs = {
    frontView: useRef(null),
    insideView: useRef(null),
    rearView: useRef(null),
    sideView: useRef(null),
    extraView: useRef(null),
    passportPhoto: useRef(null),
    citizenshipFront: useRef(null),
    citizenshipBack: useRef(null),
    blueBook: useRef(null),
    insurance: useRef(null),
    pollution: useRef(null),
  };

  const handleVehicleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicleData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePersonalInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (viewType, e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError(`${viewType} file size must be less than 5MB`);
        return;
      }
      setImageFiles((prev) => ({ ...prev, [viewType]: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => ({ ...prev, [viewType]: reader.result }));
      };
      reader.readAsDataURL(file);
      setError("");
    }
  };

  const handleCitizenshipChange = (docType, e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError(`${docType} file size must be less than 5MB`);
        return;
      }
      setCitizenshipDocs((prev) => ({ ...prev, [docType]: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setCitizenshipPreviews((prev) => ({
          ...prev,
          [docType]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
      setError("");
    }
  };

  const handleDocumentChange = (docType, e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError(`${docType} file size must be less than 5MB`);
        return;
      }
      setDocumentFiles((prev) => ({ ...prev, [docType]: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setDocumentPreviews((prev) => ({ ...prev, [docType]: reader.result }));
      };
      reader.readAsDataURL(file);
      setError("");
    }
  };

  const handlePassportPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Passport photo must be less than 5MB");
        return;
      }
      setPersonalData((prev) => ({ ...prev, passportPhoto: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPersonalData((prev) => ({
          ...prev,
          passportPhotoPreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
      setError("");
    }
  };

  const handleRemoveImage = (viewType) => {
    setImageFiles((prev) => ({ ...prev, [viewType]: null }));
    setImagePreviews((prev) => ({ ...prev, [viewType]: null }));
    if (fileInputRefs[viewType].current) {
      fileInputRefs[viewType].current.value = "";
    }
  };

  const handleRemoveCitizenship = (docType) => {
    setCitizenshipDocs((prev) => ({ ...prev, [docType]: null }));
    setCitizenshipPreviews((prev) => ({ ...prev, [docType]: null }));
    if (fileInputRefs[docType].current) {
      fileInputRefs[docType].current.value = "";
    }
  };

  const handleRemoveDocument = (docType) => {
    setDocumentFiles((prev) => ({ ...prev, [docType]: null }));
    setDocumentPreviews((prev) => ({ ...prev, [docType]: null }));
    if (fileInputRefs[docType].current) {
      fileInputRefs[docType].current.value = "";
    }
  };

  const handleRemovePassportPhoto = () => {
    setPersonalData((prev) => ({
      ...prev,
      passportPhoto: null,
      passportPhotoPreview: null,
    }));
    if (fileInputRefs.passportPhoto.current) {
      fileInputRefs.passportPhoto.current.value = "";
    }
  };

  const validateVehicleImages = () => {
    const requiredViews = ["frontView", "insideView", "rearView", "sideView"];
    const missingViews = requiredViews.filter(
      (viewType) => !imageFiles[viewType] && !imagePreviews[viewType],
    );

    if (missingViews.length > 0) {
      setError(
        `Please upload all required vehicle views: ${missingViews.join(", ")}`,
      );
      return false;
    }
    return true;
  };

  const validateCitizenshipDocs = () => {
    if (
      !citizenshipDocs.citizenshipFront &&
      !citizenshipPreviews.citizenshipFront
    ) {
      setError("Please upload front side of citizenship certificate");
      return false;
    }
    if (
      !citizenshipDocs.citizenshipBack &&
      !citizenshipPreviews.citizenshipBack
    ) {
      setError("Please upload back side of citizenship certificate");
      return false;
    }
    return true;
  };

  const validateDocuments = () => {
    const requiredDocs = ["blueBook", "insurance", "pollution"];
    const missingDocs = requiredDocs.filter(
      (doc) => !documentFiles[doc] && !documentPreviews[doc],
    );

    if (missingDocs.length > 0) {
      setError(
        `Please upload all required documents: ${missingDocs.join(", ")}`,
      );
      return false;
    }
    return true;
  };

  const validatePersonalInfo = () => {
    if (!personalData.fullName) {
      setError("Please enter your full name");
      return false;
    }
    if (!personalData.citizenshipNumber) {
      setError("Please enter your citizenship number");
      return false;
    }
    if (!personalData.phoneNumber) {
      setError("Please enter your phone number");
      return false;
    }
    if (!personalData.address) {
      setError("Please enter your address");
      return false;
    }
    if (!personalData.city) {
      setError("Please enter your city");
      return false;
    }
    if (!personalData.passportPhoto && !personalData.passportPhotoPreview) {
      setError("Please upload a passport size photo");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1) {
      if (!agreed) {
        setError("Please agree to the terms and conditions to proceed");
        return;
      }
      setStep(2);
      setError("");
    } else if (step === 2) {
      if (validateVehicleImages()) {
        setStep(3);
        setError("");
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePersonalInfo()) return;
    if (!validateCitizenshipDocs()) return;
    if (!validateDocuments()) return;

    setLoading(true);
    setError("");

    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        setError("Please login to list your vehicle");
        navigate("/login");
        return;
      }

      const formData = new FormData();

      // Append vehicle data
      Object.keys(vehicleData).forEach((key) => {
        if (vehicleData[key]) {
          formData.append(key, vehicleData[key]);
        }
      });

      // Append features as array
      if (vehicleData.features) {
        const featuresArray = vehicleData.features
          .split(",")
          .map((f) => f.trim())
          .filter((f) => f);
        featuresArray.forEach((feature) => {
          formData.append("features[]", feature);
        });
      }

      // Append personal data
      Object.keys(personalData).forEach((key) => {
        if (
          key !== "passportPhoto" &&
          key !== "passportPhotoPreview" &&
          personalData[key]
        ) {
          formData.append(key, personalData[key]);
        }
      });

      // Append passport photo
      if (personalData.passportPhoto) {
        formData.append("passportPhoto", personalData.passportPhoto);
      }

      // Append citizenship documents
      if (citizenshipDocs.citizenshipFront) {
        formData.append("citizenshipFront", citizenshipDocs.citizenshipFront);
      }
      if (citizenshipDocs.citizenshipBack) {
        formData.append("citizenshipBack", citizenshipDocs.citizenshipBack);
      }

      // Append vehicle photos
      const photoOrder = [
        "frontView",
        "insideView",
        "rearView",
        "sideView",
        "extraView",
      ];
      photoOrder.forEach((viewType) => {
        if (imageFiles[viewType]) {
          formData.append("vehiclePhotos", imageFiles[viewType]);
        }
      });

      // Append vehicle documents
      const docOrder = ["blueBook", "insurance", "pollution"];
      docOrder.forEach((docType) => {
        if (documentFiles[docType]) {
          formData.append(docType, documentFiles[docType]);
        }
      });

      const response = await axios.post(
        "http://localhost:5000/api/user-vehicles/list",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.data.success) {
        setSuccess(
          "Vehicle listing submitted successfully! Admin will review and approve your vehicle.",
        );
        setTimeout(() => {
          navigate("/my-vehicles");
        }, 3000);
      } else {
        setError(response.data.message || "Failed to list vehicle");
      }
    } catch (error) {
      console.error("Error listing vehicle:", error);
      setError(
        error.response?.data?.message ||
          "Failed to list vehicle. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const renderImageUploadSection = (viewType, label, required = true) => {
    const preview = imagePreviews[viewType];
    const fileRef = fileInputRefs[viewType];

    return (
      <div className="flex flex-col items-center">
        <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
          {preview ? (
            <div className="relative w-full h-full">
              <img
                src={preview}
                alt={label}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(viewType)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
              >
                <FaTimes size={12} />
              </button>
            </div>
          ) : (
            <div className="text-center p-4">
              <FaCamera className="text-gray-400 text-2xl mx-auto mb-2" />
              <p className="text-gray-600 text-sm">No image uploaded</p>
              {required && (
                <p className="text-red-500 text-xs mt-1">Required</p>
              )}
            </div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(viewType, e)}
          className="hidden"
          ref={fileRef}
        />
        <button
          type="button"
          onClick={() => fileRef.current.click()}
          className={`mt-2 px-4 py-1 rounded text-sm font-medium ${
            preview
              ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
              : "bg-blue-100 text-blue-700 hover:bg-blue-200"
          }`}
        >
          {preview ? "Change Image" : "Upload Image"}
        </button>
      </div>
    );
  };

  const renderCitizenshipUploadSection = (docType, label, required = true) => {
    const preview = citizenshipPreviews[docType];
    const fileRef = fileInputRefs[docType];

    return (
      <div className="flex flex-col items-center">
        <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
          {preview ? (
            <div className="relative w-full h-full">
              <img
                src={preview}
                alt={label}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemoveCitizenship(docType)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
              >
                <FaTimes size={12} />
              </button>
            </div>
          ) : (
            <div className="text-center p-4">
              <FaCitizenship className="text-gray-400 text-3xl mx-auto mb-2" />
              <p className="text-gray-600 text-sm">{label}</p>
              {required && (
                <p className="text-red-500 text-xs mt-1">Required</p>
              )}
            </div>
          )}
        </div>
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={(e) => handleCitizenshipChange(docType, e)}
          className="hidden"
          ref={fileRef}
        />
        <button
          type="button"
          onClick={() => fileRef.current.click()}
          className={`mt-2 px-4 py-1 rounded text-sm font-medium ${
            preview
              ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
              : "bg-blue-100 text-blue-700 hover:bg-blue-200"
          }`}
        >
          {preview ? "Change Document" : "Upload Document"}
        </button>
      </div>
    );
  };

  const renderDocumentUploadSection = (
    docType,
    label,
    icon,
    required = true,
  ) => {
    const preview = documentPreviews[docType];
    const fileRef = fileInputRefs[docType];

    return (
      <div className="flex flex-col items-center">
        <div className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
          {preview ? (
            <div className="relative w-full h-full">
              <img
                src={preview}
                alt={label}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemoveDocument(docType)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
              >
                <FaTimes size={12} />
              </button>
            </div>
          ) : (
            <div className="text-center p-4">
              {icon}
              <p className="text-gray-600 text-sm mt-2">{label}</p>
              {required && (
                <p className="text-red-500 text-xs mt-1">Required</p>
              )}
            </div>
          )}
        </div>
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={(e) => handleDocumentChange(docType, e)}
          className="hidden"
          ref={fileRef}
        />
        <button
          type="button"
          onClick={() => fileRef.current.click()}
          className={`mt-2 px-4 py-1 rounded text-sm font-medium ${
            preview
              ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
              : "bg-blue-100 text-blue-700 hover:bg-blue-200"
          }`}
        >
          {preview ? "Change Document" : "Upload Document"}
        </button>
      </div>
    );
  };

  // Calculate owner's earnings (70%) for display
  const calculateOwnerEarnings = () => {
    const rate = parseFloat(vehicleData.ratePerDay);
    if (isNaN(rate)) return { owner: 0, rentride: 0 };
    return {
      owner: (rate * 0.7).toFixed(0),
      rentride: (rate * 0.3).toFixed(0),
    };
  };

  const earnings = calculateOwnerEarnings();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition mb-4"
          >
            <FaArrowLeft /> Back
          </button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg">
              <FaCar className="text-white text-2xl" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              List Your Vehicle
            </h1>
          </div>
          <p className="text-gray-500 mt-2">
            Earn money by renting out your vehicle
          </p>
        </div>

        {/* Steps Indicator */}
        <div className="flex items-center justify-between mb-8">
          <div
            className={`flex-1 text-center ${step >= 1 ? "text-blue-600" : "text-gray-400"}`}
          >
            <div
              className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center ${step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              1
            </div>
            <p className="text-sm mt-1">Disclaimer</p>
          </div>
          <div
            className={`flex-1 h-1 ${step >= 2 ? "bg-blue-600" : "bg-gray-200"}`}
          ></div>
          <div
            className={`flex-1 text-center ${step >= 2 ? "text-blue-600" : "text-gray-400"}`}
          >
            <div
              className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center ${step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              2
            </div>
            <p className="text-sm mt-1">Vehicle Details</p>
          </div>
          <div
            className={`flex-1 h-1 ${step >= 3 ? "bg-blue-600" : "bg-gray-200"}`}
          ></div>
          <div
            className={`flex-1 text-center ${step >= 3 ? "text-blue-600" : "text-gray-400"}`}
          >
            <div
              className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center ${step >= 3 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              3
            </div>
            <p className="text-sm mt-1">Personal Info & Docs</p>
          </div>
        </div>

        {/* Step 1: Disclaimer */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-6">
              <FaExclamationTriangle className="text-yellow-500 text-5xl mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800">
                Important Disclaimer
              </h2>
              <p className="text-gray-600 mt-2">
                Please read the following terms carefully
              </p>
            </div>

            <div className="space-y-6 mb-8">
              {/* Commission Structure Card - NEW */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <FaPercentage className="text-purple-600 text-xl mt-1" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">
                      Commission Structure
                    </h3>
                    <div className="mt-3 grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg p-3 text-center">
                        <FaWallet className="text-green-600 text-xl mx-auto mb-2" />
                        <p className="text-xs text-gray-500">You Earn</p>
                        <p className="text-2xl font-bold text-green-600">70%</p>
                        <p className="text-xs text-gray-500 mt-1">
                          of each booking
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center">
                        <FaCar className="text-blue-600 text-xl mx-auto mb-2" />
                        <p className="text-xs text-gray-500">RentRide Earns</p>
                        <p className="text-2xl font-bold text-blue-600">30%</p>
                        <p className="text-xs text-gray-500 mt-1">
                          service fee
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-purple-700 mt-3">
                      When your vehicle gets booked, you receive 70% of the
                      total booking amount. RentRide takes 30% as a service fee.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <FaShieldAlt className="text-yellow-600 text-xl mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Document Authenticity
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      All documents submitted must be genuine and belong to you.
                      Any fraudulent documents will result in immediate account
                      suspension.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <FaInfoCircle className="text-blue-600 text-xl mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Ownership Verification
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      The vehicle and documents must match your identity. We
                      verify that the vehicle owner matches the person listing
                      the vehicle.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <FaCar className="text-red-600 text-xl mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Liability Statement
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      RentRide acts as a facilitator. In case of any accident or
                      damage during the rental period, RentRide will not be held
                      responsible. The renter and vehicle owner must ensure
                      proper insurance coverage.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-600 text-xl mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Inspection Required
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      After submission, our team will inspect your vehicle and
                      documents. Approval may take 24-48 hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <label className="flex items-center gap-3 cursor-pointer mb-6">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">
                  I confirm that all information and documents are genuine, and
                  I understand RentRide's policies including the 70/30
                  commission structure.
                </span>
              </label>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-red-600 text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={handleNext}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition"
              >
                I Understand & Proceed
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Vehicle Details */}
        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Vehicle Details
            </h2>

            {/* Earnings Preview - NEW */}
            {vehicleData.ratePerDay && (
              <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <FaWallet className="text-green-600" />
                  Your Earnings Preview
                </h3>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Daily Rate</p>
                    <p className="text-xl font-bold text-gray-800">
                      ₹{vehicleData.ratePerDay}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">You Earn (70%)</p>
                    <p className="text-xl font-bold text-green-600">
                      ₹{earnings.owner}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">RentRide Fee (30%)</p>
                    <p className="text-xl font-bold text-blue-600">
                      ₹{earnings.rentride}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  *For each day your vehicle is booked
                </p>
              </div>
            )}

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Car Name *
                  </label>
                  <input
                    type="text"
                    name="carName"
                    value={vehicleData.carName}
                    onChange={handleVehicleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Toyota Camry"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Car Number *
                  </label>
                  <input
                    type="text"
                    name="carNumber"
                    value={vehicleData.carNumber}
                    onChange={handleVehicleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    placeholder="e.g., BA 1 PA 1234"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Car Type *
                  </label>
                  <select
                    name="carType"
                    value={vehicleData.carType}
                    onChange={handleVehicleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  >
                    <option value="SUV">SUV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="MPV">MPV</option>
                    <option value="Coupe">Coupe</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rate Per Day (₹) *
                  </label>
                  <input
                    type="number"
                    name="ratePerDay"
                    value={vehicleData.ratePerDay}
                    onChange={handleVehicleInputChange}
                    required
                    min="0"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    placeholder="e.g., 5000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seats *
                  </label>
                  <input
                    type="number"
                    name="seats"
                    value={vehicleData.seats}
                    onChange={handleVehicleInputChange}
                    required
                    min="1"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Booking Type *
                  </label>
                  <select
                    name="bookingType"
                    value={vehicleData.bookingType}
                    onChange={handleVehicleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  >
                    <option value="Both">Both (With/Without Driver)</option>
                    <option value="With Driver">With Driver Only</option>
                    <option value="Without Driver">Without Driver Only</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gear Type *
                  </label>
                  <select
                    name="gearType"
                    value={vehicleData.gearType}
                    onChange={handleVehicleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  >
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Air Condition *
                  </label>
                  <select
                    name="airCondition"
                    value={vehicleData.airCondition}
                    onChange={handleVehicleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={vehicleData.description}
                  onChange={handleVehicleInputChange}
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  placeholder="Describe your vehicle's features, condition, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Features (comma separated)
                </label>
                <input
                  type="text"
                  name="features"
                  value={vehicleData.features}
                  onChange={handleVehicleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  placeholder="GPS, Bluetooth, Sunroof, Leather Seats"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Upload Vehicle Photos (All views required)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-3">
                    <h4 className="font-medium text-gray-700 mb-2 text-center">
                      Front View *
                    </h4>
                    {renderImageUploadSection("frontView", "Front View")}
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-3">
                    <h4 className="font-medium text-gray-700 mb-2 text-center">
                      Inside View *
                    </h4>
                    {renderImageUploadSection("insideView", "Inside View")}
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-3">
                    <h4 className="font-medium text-gray-700 mb-2 text-center">
                      Rear View *
                    </h4>
                    {renderImageUploadSection("rearView", "Rear View")}
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-3">
                    <h4 className="font-medium text-gray-700 mb-2 text-center">
                      Side View *
                    </h4>
                    {renderImageUploadSection("sideView", "Side View")}
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-3">
                    <h4 className="font-medium text-gray-700 mb-2 text-center">
                      Extra View
                    </h4>
                    {renderImageUploadSection("extraView", "Extra View", false)}
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-600 text-sm">
                  {error}
                </div>
              )}

              <div className="flex justify-between gap-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                >
                  Next: Personal Info
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Personal Information & Documents */}
        {step === 3 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Personal Information & Documents
            </h2>

            {/* Commission Summary - NEW */}
            {vehicleData.ratePerDay && (
              <div className="mb-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4">
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <FaPercentage className="text-purple-600" />
                  Commission Summary
                </h3>
                <div className="flex justify-between items-center">
                  <div className="text-center flex-1">
                    <p className="text-xs text-gray-500">Your Daily Rate</p>
                    <p className="text-lg font-bold">
                      ₹{vehicleData.ratePerDay}
                    </p>
                  </div>
                  <div className="text-center flex-1 border-l border-r border-purple-200">
                    <p className="text-xs text-gray-500">You Earn (70%)</p>
                    <p className="text-lg font-bold text-green-600">
                      ₹{earnings.owner}
                    </p>
                  </div>
                  <div className="text-center flex-1">
                    <p className="text-xs text-gray-500">RentRide Fee (30%)</p>
                    <p className="text-lg font-bold text-blue-600">
                      ₹{earnings.rentride}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={personalData.fullName}
                    onChange={handlePersonalInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="As per citizenship"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Citizenship Number *
                  </label>
                  <input
                    type="text"
                    name="citizenshipNumber"
                    value={personalData.citizenshipNumber}
                    onChange={handlePersonalInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    placeholder="e.g., 01-02-12345678"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={personalData.phoneNumber}
                    onChange={handlePersonalInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    placeholder="e.g., 9812345678"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={personalData.address}
                    onChange={handlePersonalInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    placeholder="Street address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={personalData.city}
                    onChange={handlePersonalInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    placeholder="e.g., Kathmandu"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    District
                  </label>
                  <input
                    type="text"
                    name="district"
                    value={personalData.district}
                    onChange={handlePersonalInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    placeholder="e.g., Kathmandu"
                  />
                </div>
              </div>

              {/* Passport Size Photo */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Passport Size Photo *
                </h3>
                <div className="max-w-xs">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    {personalData.passportPhotoPreview ? (
                      <div className="relative">
                        <img
                          src={personalData.passportPhotoPreview}
                          alt="Passport"
                          className="w-32 h-32 object-cover rounded-lg mx-auto"
                        />
                        <button
                          type="button"
                          onClick={handleRemovePassportPhoto}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                        >
                          <FaTimes size={12} />
                        </button>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <FaUser className="text-gray-400 text-4xl mx-auto mb-2" />
                        <p className="text-gray-500 text-sm">
                          Upload passport size photo
                        </p>
                        <p className="text-red-500 text-xs mt-1">Required</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePassportPhotoChange}
                      className="hidden"
                      ref={fileInputRefs.passportPhoto}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        fileInputRefs.passportPhoto.current.click()
                      }
                      className="mt-3 w-full px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition"
                    >
                      {personalData.passportPhotoPreview
                        ? "Change Photo"
                        : "Upload Photo"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Citizenship Documents */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Citizenship Certificate *
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-3">
                    <h4 className="font-medium text-gray-700 mb-2 text-center">
                      Front Side *
                    </h4>
                    {renderCitizenshipUploadSection(
                      "citizenshipFront",
                      "Front Side",
                    )}
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-3">
                    <h4 className="font-medium text-gray-700 mb-2 text-center">
                      Back Side *
                    </h4>
                    {renderCitizenshipUploadSection(
                      "citizenshipBack",
                      "Back Side",
                    )}
                  </div>
                </div>
              </div>

              {/* Vehicle Documents */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Vehicle Documents
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-3">
                    <h4 className="font-medium text-gray-700 mb-2 text-center">
                      Blue Book (Registration) *
                    </h4>
                    {renderDocumentUploadSection(
                      "blueBook",
                      "Blue Book",
                      <FaFileInvoice className="text-gray-400 text-3xl mx-auto" />,
                    )}
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-3">
                    <h4 className="font-medium text-gray-700 mb-2 text-center">
                      Insurance Certificate *
                    </h4>
                    {renderDocumentUploadSection(
                      "insurance",
                      "Insurance",
                      <FaShieldAlt className="text-gray-400 text-3xl mx-auto" />,
                    )}
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-3">
                    <h4 className="font-medium text-gray-700 mb-2 text-center">
                      Pollution Certificate *
                    </h4>
                    {renderDocumentUploadSection(
                      "pollution",
                      "Pollution",
                      <FaLeaf className="text-gray-400 text-3xl mx-auto" />,
                    )}
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-600 text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-green-600 text-sm flex items-center gap-2">
                  <FaCheckCircle />
                  {success}
                </div>
              )}

              <div className="flex justify-between gap-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg transition disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Submit for Approval"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListYourVehicle;
