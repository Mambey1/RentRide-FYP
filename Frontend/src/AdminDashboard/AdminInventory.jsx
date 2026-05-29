

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaCar,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaTimes,
  FaImage,
  FaCogs,
  FaCamera,
  FaCheckCircle,
  FaClock,
  FaArrowLeft,
  FaChevronLeft,
  FaChevronRight,
  FaSpinner,
} from "react-icons/fa";

const AdminInventory = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  // ── Grand confirm modal state ─────────────────────────────────────────────
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmTitle, setConfirmTitle] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmType, setConfirmType] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);

  // ── Result animation state ────────────────────────────────────────────────
  const [showResultAnimation, setShowResultAnimation] = useState(false);
  const [resultType, setResultType] = useState("");
  const [resultLabel, setResultLabel] = useState("");

  const [formData, setFormData] = useState({
    carName: "",
    carNumber: "",
    carType: "SUV",
    phoneNumber: "",
    ratePerDay: "",
    seats: "4",
    bookingType: "Both",
    gearType: "Automatic",
    airCondition: "Yes",
    driverName: "",
    description: "",
    features: "",
    status: "Available",
  });

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
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/vehicles", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVehicles(response.data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      toast.error("Failed to fetch vehicles");
    } finally {
      setLoading(false);
    }
  };

  // ── Confirm modal helpers ─────────────────────────────────────────────────
  const showConfirmation = (action, title, message, type) => {
    setConfirmAction(() => action);
    setConfirmTitle(title);
    setConfirmMessage(message);
    setConfirmType(type);
    setShowConfirmModal(true);
  };

  const executeConfirm = async () => {
    if (!confirmAction) return;
    setConfirmLoading(true);
    try {
      await confirmAction();
    } finally {
      setConfirmLoading(false);
      setShowConfirmModal(false);
      setConfirmAction(null);
    }
  };

  const triggerResult = (type, label) => {
    setResultType(type);
    setResultLabel(label);
    setShowResultAnimation(true);
    setTimeout(() => setShowResultAnimation(false), 3000);
  };

  const getConfirmStyle = () => {
    const styles = {
      delete: {
        grad: "from-red-500 to-rose-600",
        btn: "from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700",
        shadow: "shadow-red-300",
        icon: "🗑",
        text: "Yes, Delete",
      },
      add: {
        grad: "from-blue-400 to-purple-500",
        btn: "from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600",
        shadow: "shadow-blue-200",
        icon: "✓",
        text: "Yes, Add",
      },
      update: {
        grad: "from-green-400 to-emerald-500",
        btn: "from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600",
        shadow: "shadow-green-200",
        icon: "✓",
        text: "Yes, Update",
      },
    };
    return styles[confirmType] || styles.delete;
  };

  const getResultStyle = () => {
    const styles = {
      deleted: {
        grad: "from-red-500 to-rose-600",
        shadow: "shadow-red-500/50",
        sub: "text-red-200",
        icon: "✕",
      },
      added: {
        grad: "from-blue-400 to-purple-500",
        shadow: "shadow-blue-500/50",
        sub: "text-blue-200",
        icon: "✓",
      },
      updated: {
        grad: "from-green-400 to-emerald-500",
        shadow: "shadow-green-500/50",
        sub: "text-green-200",
        icon: "✓",
      },
    };
    return styles[resultType] || styles.deleted;
  };

  const confirmStyle = getConfirmStyle();
  const resultStyle = getResultStyle();

  // ── Form handlers ─────────────────────────────────────────────────────────
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (viewType, e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFiles((prev) => ({ ...prev, [viewType]: file }));
      const reader = new FileReader();
      reader.onloadend = () =>
        setImagePreviews((prev) => ({ ...prev, [viewType]: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (viewType) => {
    setImageFiles((prev) => ({ ...prev, [viewType]: null }));
    setImagePreviews((prev) => ({ ...prev, [viewType]: null }));
  };

  const validateImages = () => {
    const requiredViews = ["frontView", "insideView", "rearView", "sideView"];
    const missingViews = requiredViews.filter(
      (viewType) => !imageFiles[viewType] && !imagePreviews[viewType],
    );
    if (missingViews.length > 0 && !showEditModal) {
      const missingLabels = missingViews.map((v) => v.replace("View", " View"));
      toast.error(
        `Please upload all required views: ${missingLabels.join(", ")}`,
      );
      return false;
    }
    return true;
  };

  const doSubmit = async () => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== undefined && formData[key] !== null)
        formDataToSend.append(key, formData[key]);
    });
    if (formData.features) {
      const featuresArray = formData.features
        .split(",")
        .map((f) => f.trim())
        .filter((f) => f);
      featuresArray.forEach((feature) =>
        formDataToSend.append("features[]", feature),
      );
    }
    const photoOrder = [
      "frontView",
      "insideView",
      "rearView",
      "sideView",
      "extraView",
    ];
    photoOrder.forEach((viewType) => {
      if (imageFiles[viewType])
        formDataToSend.append("photos", imageFiles[viewType]);
    });

    if (selectedVehicle && showEditModal) {
      await axios.put(
        `http://localhost:5000/api/vehicles/${selectedVehicle._id}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      resetForm();
      fetchVehicles();
      setShowEditModal(false);
      triggerResult("updated", "UPDATED!");
      toast.success("Vehicle updated successfully!");
    } else {
      await axios.post("http://localhost:5000/api/vehicles", formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      resetForm();
      fetchVehicles();
      setShowAddModal(false);
      triggerResult("added", "ADDED!");
      toast.success("Vehicle added successfully!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateImages()) return;
    const isEdit = selectedVehicle && showEditModal;
    showConfirmation(
      async () => {
        setSubmitting(true);
        try {
          await doSubmit();
        } finally {
          setSubmitting(false);
        }
      },
      isEdit ? "Update Vehicle" : "Add Vehicle",
      isEdit
        ? `Are you sure you want to update "${formData.carName}"?`
        : `Are you sure you want to add "${formData.carName}" to the inventory?`,
      isEdit ? "update" : "add",
    );
  };

  const handleEdit = (vehicle) => {
    setSelectedVehicle(vehicle);
    setFormData({
      carName: vehicle.carName,
      carNumber: vehicle.carNumber,
      carType: vehicle.carType,
      phoneNumber: vehicle.phoneNumber,
      ratePerDay: vehicle.ratePerDay,
      seats: vehicle.seats,
      bookingType: vehicle.bookingType,
      gearType: vehicle.gearType,
      airCondition: vehicle.airCondition,
      driverName: vehicle.driverName || "",
      description: vehicle.description || "",
      features: vehicle.features?.join(", ") || "",
      status: vehicle.status || "Available",
    });
    const newPreviews = {
      frontView: null,
      insideView: null,
      rearView: null,
      sideView: null,
      extraView: null,
    };
    if (vehicle.photos?.length > 0) {
      const viewTypes = [
        "frontView",
        "insideView",
        "rearView",
        "sideView",
        "extraView",
      ];
      vehicle.photos.forEach((photo, index) => {
        if (viewTypes[index])
          newPreviews[viewTypes[index]] =
            `http://localhost:5000/uploads/vehicles/${photo.filename}`;
      });
    }
    setImagePreviews(newPreviews);
    setImageFiles({
      frontView: null,
      insideView: null,
      rearView: null,
      sideView: null,
      extraView: null,
    });
    setShowEditModal(true);
  };

  const handleViewDetails = (vehicle) => {
    setSelectedVehicle(vehicle);
    setCurrentImageIndex(0);
    setShowDetailsModal(true);
  };

  const handleDelete = (id, carName) => {
    showConfirmation(
      async () => {
        const token =
          localStorage.getItem("token") || sessionStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/vehicles/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchVehicles();
        triggerResult("deleted", "DELETED");
        toast.success("Vehicle deleted successfully!");
      },
      "Delete Vehicle",
      `Are you sure you want to permanently delete "${carName}"? This action cannot be undone.`,
      "delete",
    );
  };

  const resetForm = () => {
    setFormData({
      carName: "",
      carNumber: "",
      carType: "SUV",
      phoneNumber: "",
      ratePerDay: "",
      seats: "4",
      bookingType: "Both",
      gearType: "Automatic",
      airCondition: "Yes",
      driverName: "",
      description: "",
      features: "",
      status: "Available",
    });
    setImageFiles({
      frontView: null,
      insideView: null,
      rearView: null,
      sideView: null,
      extraView: null,
    });
    setImagePreviews({
      frontView: null,
      insideView: null,
      rearView: null,
      sideView: null,
      extraView: null,
    });
    setSelectedVehicle(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowAddModal(true);
  };
  const nextImage = () => {
    if (selectedVehicle?.photos)
      setCurrentImageIndex((p) =>
        p === selectedVehicle.photos.length - 1 ? 0 : p + 1,
      );
  };
  const prevImage = () => {
    if (selectedVehicle?.photos)
      setCurrentImageIndex((p) =>
        p === 0 ? selectedVehicle.photos.length - 1 : p - 1,
      );
  };
  const handleCancelEdit = () => {
    setShowEditModal(false);
    resetForm();
  };
  const handleCancelAdd = () => {
    setShowAddModal(false);
    resetForm();
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
          className={`mt-2 px-4 py-1 rounded text-sm font-medium ${preview ? "bg-gray-100 text-gray-700 hover:bg-gray-200" : "bg-blue-100 text-blue-700 hover:bg-blue-200"}`}
        >
          {preview ? "Change Image" : "Upload Image"}
        </button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading vehicles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* ══════════ GRAND CONFIRMATION MODAL ══════════ */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => setShowConfirmModal(false)}
          />
          <div
            className="relative w-full max-w-md mx-4"
            style={{
              animation: "modalPop 0.35s cubic-bezier(0.34,1.56,0.64,1) both",
            }}
          >
            <div
              className={`absolute -inset-1 rounded-3xl blur-xl opacity-60 bg-gradient-to-r ${confirmStyle.grad}`}
            />
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div
                className={`h-2 w-full bg-gradient-to-r ${confirmStyle.grad}`}
              />
              <div className="p-8 text-center">
                <div
                  className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center shadow-lg bg-gradient-to-br ${confirmStyle.grad}`}
                  style={{
                    animation:
                      "iconBounce 0.5s 0.2s cubic-bezier(0.34,1.56,0.64,1) both",
                  }}
                >
                  <span className="text-white text-4xl font-bold">
                    {confirmStyle.icon}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">
                  {confirmTitle}
                </h3>
                <p className="text-gray-500 mb-8 leading-relaxed">
                  {confirmMessage}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="flex-1 px-5 py-3.5 border-2 border-gray-200 text-gray-600 font-semibold rounded-2xl hover:bg-gray-50 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={executeConfirm}
                    disabled={confirmLoading || submitting}
                    className={`flex-1 px-5 py-3.5 text-white font-bold rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg ${confirmStyle.shadow} hover:scale-[1.02] disabled:opacity-50 bg-gradient-to-r ${confirmStyle.btn}`}
                  >
                    {confirmLoading || submitting ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      confirmStyle.text
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════ RESULT ANIMATION ══════════ */}
      {showResultAnimation && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <div
            className="relative flex flex-col items-center justify-center"
            style={{ animation: "resultFadeIn 0.4s ease-out both" }}
          >
            <div
              className={`w-40 h-40 rounded-full bg-gradient-to-br ${resultStyle.grad} flex items-center justify-center shadow-2xl ${resultStyle.shadow} mb-6`}
              style={{
                animation:
                  "resultBounce 0.6s cubic-bezier(0.34,1.56,0.64,1) both",
              }}
            >
              <span className="text-white text-6xl font-bold">
                {resultStyle.icon}
              </span>
            </div>
            <div
              className="text-center text-white"
              style={{
                animation: "resultFadeIn 0.4s 0.5s ease-out both",
                opacity: 0,
              }}
            >
              <p className="text-4xl font-black tracking-wide drop-shadow-lg">
                {resultLabel}
              </p>
              <p className={`mt-2 text-lg font-medium ${resultStyle.sub}`}>
                Vehicle has been {resultType} successfully
              </p>
            </div>
            {(resultType === "added" || resultType === "updated") &&
              [...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    background: [
                      "#10b981",
                      "#34d399",
                      "#6ee7b7",
                      "#fbbf24",
                      "#f59e0b",
                      "#3b82f6",
                      "#60a5fa",
                      "#a78bfa",
                      "#f472b6",
                    ][i % 9],
                    animation: `confetti${i} 1s 0.3s ease-out both`,
                    top: "50%",
                    left: "50%",
                  }}
                />
              ))}
          </div>
          <style>{`
            @keyframes modalPop{from{opacity:0;transform:scale(0.8) translateY(20px);}to{opacity:1;transform:scale(1) translateY(0);}}
            @keyframes iconBounce{from{opacity:0;transform:scale(0);}to{opacity:1;transform:scale(1);}}
            @keyframes resultFadeIn{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
            @keyframes resultBounce{from{opacity:0;transform:scale(0.3);}to{opacity:1;transform:scale(1);}}
            @keyframes confetti0{0%{opacity:1;transform:translate(-50%,-50%);}100%{opacity:0;transform:translate(calc(-50% + 120px),calc(-50% + 0px)) scale(0);}}
            @keyframes confetti1{0%{opacity:1;transform:translate(-50%,-50%);}100%{opacity:0;transform:translate(calc(-50% + 104px),calc(-50% + 60px)) scale(0);}}
            @keyframes confetti2{0%{opacity:1;transform:translate(-50%,-50%);}100%{opacity:0;transform:translate(calc(-50% + 60px),calc(-50% + 104px)) scale(0);}}
            @keyframes confetti3{0%{opacity:1;transform:translate(-50%,-50%);}100%{opacity:0;transform:translate(calc(-50% + 0px),calc(-50% + 130px)) scale(0);}}
            @keyframes confetti4{0%{opacity:1;transform:translate(-50%,-50%);}100%{opacity:0;transform:translate(calc(-50% + -60px),calc(-50% + 104px)) scale(0);}}
            @keyframes confetti5{0%{opacity:1;transform:translate(-50%,-50%);}100%{opacity:0;transform:translate(calc(-50% + -104px),calc(-50% + 60px)) scale(0);}}
            @keyframes confetti6{0%{opacity:1;transform:translate(-50%,-50%);}100%{opacity:0;transform:translate(calc(-50% + -140px),calc(-50% + 0px)) scale(0);}}
            @keyframes confetti7{0%{opacity:1;transform:translate(-50%,-50%);}100%{opacity:0;transform:translate(calc(-50% + -104px),calc(-50% + -60px)) scale(0);}}
            @keyframes confetti8{0%{opacity:1;transform:translate(-50%,-50%);}100%{opacity:0;transform:translate(calc(-50% + -60px),calc(-50% + -104px)) scale(0);}}
            @keyframes confetti9{0%{opacity:1;transform:translate(-50%,-50%);}100%{opacity:0;transform:translate(calc(-50% + 0px),calc(-50% + -130px)) scale(0);}}
            @keyframes confetti10{0%{opacity:1;transform:translate(-50%,-50%);}100%{opacity:0;transform:translate(calc(-50% + 60px),calc(-50% + -104px)) scale(0);}}
            @keyframes confetti11{0%{opacity:1;transform:translate(-50%,-50%);}100%{opacity:0;transform:translate(calc(-50% + 104px),calc(-50% + -60px)) scale(0);}}
          `}</style>
        </div>
      )}

      {/* ══════════ PAGE HEADER (original) ══════════ */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Vehicle Inventory
            </h1>
            <p className="text-gray-500 mt-2">
              Manage all vehicles in your rental fleet
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2.5 px-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <FaPlus /> Add New Vehicle
          </button>
        </div>
      </div>

      {/* ══════════ TABLE (original) ══════════ */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Vehicle",
                  "Car Number",
                  "Type",
                  "Rate/Day",
                  "Status",
                  "Images",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vehicles.map((vehicle) => (
                <tr key={vehicle._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {vehicle.photos?.[0] && (
                        <img
                          src={`http://localhost:5000/uploads/vehicles/${vehicle.photos[0].filename}`}
                          alt={vehicle.carName}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                      )}
                      <div>
                        <p className="font-medium text-gray-900">
                          {vehicle.carName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {vehicle.seats} seats • {vehicle.gearType}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {vehicle.carNumber}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {vehicle.carType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold">₹{vehicle.ratePerDay}</span>
                    <span className="text-xs text-gray-500">/day</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${vehicle.status === "Available" ? "bg-green-100 text-green-800" : vehicle.status === "Booked" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}
                    >
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <FaImage className="mr-1" />
                      {vehicle.photos?.length || 0}/5 views
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewDetails(vehicle)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handleEdit(vehicle)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() =>
                          handleDelete(vehicle._id, vehicle.carName)
                        }
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ══════════ ADD VEHICLE MODAL (original — unchanged) ══════════ */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Add New Vehicle
                </h3>
                <button
                  onClick={handleCancelAdd}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes size={24} />
                </button>
              </div>
            </div>
            <div className="p-6">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    {[
                      ["carName", "Car Name *", "text", true],
                      ["carNumber", "Car Number *", "text", true],
                      ["phoneNumber", "Phone Number *", "tel", true],
                      ["ratePerDay", "Rate Per Day (₹) *", "number", true],
                    ].map(([name, label, type, req]) => (
                      <div key={name}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {label}
                        </label>
                        <input
                          type={type}
                          name={name}
                          value={formData[name]}
                          onChange={handleInputChange}
                          required={req}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        />
                      </div>
                    ))}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Car Type *
                      </label>
                      <select
                        name="carType"
                        value={formData.carType}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      >
                        {[
                          "SUV",
                          "Sedan",
                          "Hatchback",
                          "Coupe",
                          "Convertible",
                          "Sports",
                          "Luxury",
                          "Pickup",
                          "Van",
                          "Electric",
                          "Hybrid",
                        ].map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Seats *
                      </label>
                      <input
                        type="number"
                        name="seats"
                        value={formData.seats}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Booking Type *
                      </label>
                      <select
                        name="bookingType"
                        value={formData.bookingType}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      >
                        {["Both", "With Driver", "Without Driver"].map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gear Type *
                      </label>
                      <select
                        name="gearType"
                        value={formData.gearType}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      >
                        {["Automatic", "Manual"].map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Air Condition *
                      </label>
                      <select
                        name="airCondition"
                        value={formData.airCondition}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      >
                        {["Yes", "No"].map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Driver Name
                      </label>
                      <input
                        type="text"
                        name="driverName"
                        value={formData.driverName}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  >
                    {["Available", "Booked", "Maintenance"].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Features (comma separated)
                  </label>
                  <input
                    type="text"
                    name="features"
                    value={formData.features}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    placeholder="GPS, Bluetooth, Sunroof"
                  />
                </div>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Upload Vehicle Images
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      ["frontView", "Front View", true],
                      ["insideView", "Inside View", true],
                      ["rearView", "Rear View", true],
                      ["sideView", "Side View", true],
                      ["extraView", "Extra View", false],
                    ].map(([vt, label, req]) => (
                      <div
                        key={vt}
                        className="border-2 border-dashed border-gray-300 rounded-lg p-3"
                      >
                        <h4 className="font-medium text-gray-700 mb-2 text-center">
                          {label}
                          {req ? " *" : ""}
                        </h4>
                        {renderImageUploadSection(vt, label, req)}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleCancelAdd}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium"
                  >
                    Add Vehicle
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ══════════ EDIT VEHICLE MODAL (original — unchanged) ══════════ */}
      {showEditModal && selectedVehicle && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Edit Vehicle
                </h3>
                <button
                  onClick={handleCancelEdit}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes size={24} />
                </button>
              </div>
            </div>
            <div className="p-6">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    {[
                      ["carName", "Car Name *", "text", true],
                      ["carNumber", "Car Number *", "text", true],
                      ["phoneNumber", "Phone Number *", "tel", true],
                      ["ratePerDay", "Rate Per Day (₹) *", "number", true],
                    ].map(([name, label, type, req]) => (
                      <div key={name}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {label}
                        </label>
                        <input
                          type={type}
                          name={name}
                          value={formData[name]}
                          onChange={handleInputChange}
                          required={req}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        />
                      </div>
                    ))}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Car Type *
                      </label>
                      <select
                        name="carType"
                        value={formData.carType}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      >
                        {[
                          "SUV",
                          "Sedan",
                          "Hatchback",
                          "Coupe",
                          "Convertible",
                          "Sports",
                          "Luxury",
                          "Pickup",
                          "Van",
                          "Electric",
                          "Hybrid",
                        ].map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Seats *
                      </label>
                      <input
                        type="number"
                        name="seats"
                        value={formData.seats}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Booking Type *
                      </label>
                      <select
                        name="bookingType"
                        value={formData.bookingType}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      >
                        {["Both", "With Driver", "Without Driver"].map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gear Type *
                      </label>
                      <select
                        name="gearType"
                        value={formData.gearType}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      >
                        {["Automatic", "Manual"].map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Air Condition *
                      </label>
                      <select
                        name="airCondition"
                        value={formData.airCondition}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      >
                        {["Yes", "No"].map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Driver Name
                      </label>
                      <input
                        type="text"
                        name="driverName"
                        value={formData.driverName}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  >
                    {["Available", "Booked", "Maintenance"].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Features (comma separated)
                  </label>
                  <input
                    type="text"
                    name="features"
                    value={formData.features}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Update Vehicle Images
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      ["frontView", "Front View", true],
                      ["insideView", "Inside View", true],
                      ["rearView", "Rear View", true],
                      ["sideView", "Side View", true],
                      ["extraView", "Extra View", false],
                    ].map(([vt, label, req]) => (
                      <div
                        key={vt}
                        className="border-2 border-dashed border-gray-300 rounded-lg p-3"
                      >
                        <h4 className="font-medium text-gray-700 mb-2 text-center">
                          {label}
                          {req ? " *" : ""}
                        </h4>
                        {renderImageUploadSection(vt, label, req)}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-medium"
                  >
                    Update Vehicle
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ══════════ VEHICLE DETAILS MODAL (original — unchanged) ══════════ */}
      {showDetailsModal && selectedVehicle && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaArrowLeft size={20} />
                  </button>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Vehicle Details
                  </h3>
                </div>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes size={24} />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <div className="relative mb-4">
                    <div className="h-80 bg-gray-100 rounded-xl overflow-hidden">
                      {selectedVehicle.photos?.length > 0 &&
                      selectedVehicle.photos[currentImageIndex] ? (
                        <img
                          src={`http://localhost:5000/uploads/vehicles/${selectedVehicle.photos[currentImageIndex].filename}`}
                          alt={selectedVehicle.carName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FaCar className="text-gray-400 text-6xl" />
                        </div>
                      )}
                    </div>
                    {selectedVehicle.photos?.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
                        >
                          <FaChevronLeft />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
                        >
                          <FaChevronRight />
                        </button>
                      </>
                    )}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} /{" "}
                      {selectedVehicle.photos?.length || 0}
                    </div>
                  </div>
                  {selectedVehicle.photos?.length > 0 && (
                    <div className="grid grid-cols-5 gap-2">
                      {selectedVehicle.photos.map((photo, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`rounded-lg overflow-hidden border-2 ${currentImageIndex === index ? "border-blue-500" : "border-gray-300"}`}
                        >
                          <img
                            src={`http://localhost:5000/uploads/vehicles/${photo.filename}`}
                            alt={photo.label}
                            className="w-full h-20 object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6">
                  <h4 className="text-2xl font-bold text-gray-800 mb-4">
                    {selectedVehicle.carName}
                  </h4>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {[
                      ["Car Number", selectedVehicle.carNumber],
                      ["Car Type", selectedVehicle.carType],
                      ["Seats", selectedVehicle.seats],
                      ["Booking Type", selectedVehicle.bookingType],
                      ["Gear Type", selectedVehicle.gearType],
                      ["Air Condition", selectedVehicle.airCondition],
                      ["Phone", selectedVehicle.phoneNumber],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <p className="text-sm text-gray-500">{label}</p>
                        <p className="font-semibold">{value}</p>
                      </div>
                    ))}
                    <div>
                      <p className="text-sm text-gray-500">Rate/Day</p>
                      <p className="font-semibold text-blue-600 text-lg">
                        ₹{selectedVehicle.ratePerDay}
                      </p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Status</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${selectedVehicle.status === "Available" ? "bg-green-100 text-green-800" : selectedVehicle.status === "Booked" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}
                    >
                      {selectedVehicle.status}
                    </span>
                  </div>
                  {selectedVehicle.description && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">Description</p>
                      <p className="text-gray-700">
                        {selectedVehicle.description}
                      </p>
                    </div>
                  )}
                  {selectedVehicle.features?.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Features</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedVehicle.features.map((feature, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    handleEdit(selectedVehicle);
                  }}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium"
                >
                  Edit Vehicle
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminInventory;
