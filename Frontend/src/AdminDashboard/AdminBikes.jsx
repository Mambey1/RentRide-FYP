

import React, { useState, useEffect, useRef } from "react";
import {
  FaMotorcycle,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSpinner,
  FaSearch,
  FaImage,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:5000/api";
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/webp"];
const ALLOWED_EXT_LABEL = "JPG, JPEG, WEBP";
const MAX_SIZE_MB = 5;

const PHOTO_SLOTS = [
  { key: "frontView", label: "Front View", required: true },
  { key: "backView", label: "Rear View", required: false },
  { key: "extraView", label: "Extra View", required: false },
];

const validateImageFile = (file) => {
  if (!ALLOWED_TYPES.includes(file.type))
    return `"${file.name}" is not allowed. Only ${ALLOWED_EXT_LABEL} files are accepted.`;
  if (file.size > MAX_SIZE_MB * 1024 * 1024)
    return `"${file.name}" exceeds ${MAX_SIZE_MB}MB limit.`;
  return null;
};

const getStatusBadge = (status) => {
  const styles = {
    Available: "bg-green-50 text-green-700 border border-green-200",
    Booked: "bg-blue-50 text-blue-700 border border-blue-200",
    Maintenance: "bg-yellow-50 text-yellow-700 border border-yellow-200",
  };
  return (
    <span
      className={`px-2.5 py-0.5 text-xs font-medium rounded-md ${styles[status] || "bg-gray-50 text-gray-600 border border-gray-200"}`}
    >
      {status}
    </span>
  );
};

const ImageUploadSlot = ({ slot, file, preview, onFileSelect, onClear }) => {
  const inputRef = useRef(null);
  const handleChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const err = validateImageFile(f);
    if (err) {
      toast.error(err);
      e.target.value = "";
      return;
    }
    onFileSelect(slot.key, f);
  };
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
        {slot.label}
        {slot.required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <div
        onClick={() => !preview && inputRef.current?.click()}
        className={`relative rounded-lg overflow-hidden transition-all h-32 flex items-center justify-center border ${
          preview
            ? "border-gray-200"
            : "border-dashed border-gray-300 bg-gray-50 hover:border-purple-400 hover:bg-purple-50 cursor-pointer"
        }`}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt={slot.label}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClear(slot.key);
              }}
              className="absolute top-1.5 right-1.5 w-6 h-6 bg-white border border-gray-200 text-gray-500 rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition shadow-sm"
            >
              <FaTimes size={9} />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-1.5 text-gray-400 px-3 text-center">
            <FaImage size={20} className="text-gray-300" />
            <p className="text-xs">Click to upload</p>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept=".jpg,.jpeg,.webp,image/jpeg,image/jpg,image/webp"
          className="hidden"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

const emptyForm = {
  bikeName: "",
  bikeNumber: "",
  bikeType: "Sports",
  brand: "",
  model: "",
  year: new Date().getFullYear(),
  ratePerDay: "",
  ratePerWeek: "",
  securityDeposit: "",
  engineCapacity: "",
  fuelType: "Petrol",
  mileage: "",
  transmission: "Manual",
  features: "",
  description: "",
  phoneNumber: "",
  helmetIncluded: true,
  licenseRequired: "Two-Wheeler",
  minimumAge: 18,
  quantity: 1,
  status: "Available",
};

const AdminBikes = () => {
  const [bikes, setBikes] = useState([]);
  const [filteredBikes, setFilteredBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editingBike, setEditingBike] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [imageFiles, setImageFiles] = useState({
    frontView: null,
    backView: null,
    extraView: null,
  });
  const [imagePreviews, setImagePreviews] = useState({
    frontView: null,
    backView: null,
    extraView: null,
  });

  // Confirm modal
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmTitle, setConfirmTitle] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmType, setConfirmType] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);

  // Result animation
  const [showResultAnimation, setShowResultAnimation] = useState(false);
  const [resultType, setResultType] = useState("");
  const [resultLabel, setResultLabel] = useState("");

  const bikeTypes = [
    "Sports",
    "Cruiser",
    "Touring",
    "Scooter",
    "Electric",
    "Dirt Bike",
    "Standard",
  ];

  useEffect(() => {
    fetchBikes();
  }, []);

  useEffect(() => {
    let result = bikes;
    if (filterType !== "all")
      result = result.filter((b) => b.bikeType === filterType);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (b) =>
          b.bikeName?.toLowerCase().includes(q) ||
          b.bikeNumber?.toLowerCase().includes(q) ||
          b.brand?.toLowerCase().includes(q),
      );
    }
    setFilteredBikes(result);
  }, [searchQuery, filterType, bikes]);

  const fetchBikes = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/bikes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setBikes(res.data.data);
        setFilteredBikes(res.data.data);
      }
    } catch {
      toast.error("Failed to fetch bikes");
    } finally {
      setLoading(false);
    }
  };

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
    setTimeout(() => setShowResultAnimation(false), 2500);
  };

  const getConfirmStyle = () => {
    const styles = {
      delete: {
        grad: "from-red-500 to-rose-600",
        btn: "from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700",
        shadow: "shadow-red-200",
        icon: "🗑",
        text: "Delete",
      },
    };
    return styles[confirmType] || styles.delete;
  };

  const getResultStyle = () =>
    ({
      deleted: {
        grad: "from-red-500 to-rose-600",
        shadow: "shadow-red-500/40",
        sub: "text-red-200",
        icon: "✕",
      },
    })[resultType] || {
      grad: "from-red-500 to-rose-600",
      shadow: "shadow-red-500/40",
      sub: "text-red-200",
      icon: "✕",
    };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileSelect = (key, file) => {
    setImageFiles((prev) => ({ ...prev, [key]: file }));
    setImagePreviews((prev) => ({ ...prev, [key]: URL.createObjectURL(file) }));
  };

  const handleFileClear = (key) => {
    if (imagePreviews[key]) URL.revokeObjectURL(imagePreviews[key]);
    setImageFiles((prev) => ({ ...prev, [key]: null }));
    setImagePreviews((prev) => ({ ...prev, [key]: null }));
  };

  const openAddModal = () => {
    setEditingBike(null);
    setFormData(emptyForm);
    clearImages();
    setShowModal(true);
  };

  const openEditModal = (bike) => {
    setEditingBike(bike);
    setFormData({
      bikeName: bike.bikeName || "",
      bikeNumber: bike.bikeNumber || "",
      bikeType: bike.bikeType || "Sports",
      brand: bike.brand || "",
      model: bike.model || "",
      year: bike.year || new Date().getFullYear(),
      ratePerDay: bike.ratePerDay || "",
      ratePerWeek: bike.ratePerWeek || "",
      securityDeposit: bike.securityDeposit || "",
      engineCapacity: bike.engineCapacity || "",
      fuelType: bike.fuelType || "Petrol",
      mileage: bike.mileage || "",
      transmission: bike.transmission || "Manual",
      features: bike.features?.join(", ") || "",
      description: bike.description || "",
      phoneNumber: bike.phoneNumber || "",
      helmetIncluded: bike.helmetIncluded !== false,
      licenseRequired: bike.licenseRequired || "Two-Wheeler",
      minimumAge: bike.minimumAge || 18,
      quantity: bike.quantity || 1,
      status: bike.status || "Available",
    });
    clearImages();
    setShowModal(true);
  };

  const clearImages = () => {
    Object.values(imagePreviews).forEach((url) => {
      if (url) URL.revokeObjectURL(url);
    });
    setImageFiles({ frontView: null, backView: null, extraView: null });
    setImagePreviews({ frontView: null, backView: null, extraView: null });
  };

  const closeModal = () => {
    setShowModal(false);
    clearImages();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFiles.frontView && !editingBike) {
      toast.error("Front View image is required");
      return;
    }
    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const fd = new FormData();
      Object.entries(formData).forEach(([k, v]) => {
        if (v !== undefined && v !== null) fd.append(k, v);
      });
      PHOTO_SLOTS.forEach((slot) => {
        if (imageFiles[slot.key]) fd.append("photos", imageFiles[slot.key]);
      });
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      if (editingBike) {
        await axios.put(`${API_URL}/bikes/${editingBike._id}`, fd, config);
        toast.success("Bike updated successfully!");
      } else {
        await axios.post(`${API_URL}/bikes`, fd, config);
        toast.success("Bike added successfully!");
      }
      closeModal();
      fetchBikes();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save bike");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = (id, bikeName) => {
    showConfirmation(
      async () => {
        const token = localStorage.getItem("token");
        await axios.delete(`${API_URL}/bikes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Bike deleted");
        fetchBikes();
        triggerResult("deleted", "DELETED");
      },
      "Delete Bike",
      `Are you sure you want to permanently delete "${bikeName}"?`,
      "delete",
    );
  };

  const handleStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_URL}/bikes/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success(`Status updated to ${status}`);
      fetchBikes();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const getBikeImage = (bike) => {
    if (bike.photos?.length > 0) {
      const front =
        bike.photos.find((p) => p.label === "Front View") || bike.photos[0];
      return `http://localhost:5000/uploads/bikes/${front.filename}`;
    }
    return null;
  };

  const confirmStyle = getConfirmStyle();
  const resultStyle = getResultStyle();

  const inputCls =
    "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-400 focus:border-purple-400 bg-white text-gray-800 placeholder-gray-400";
  const labelCls =
    "block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5";

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* ── Confirm Modal ── */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setShowConfirmModal(false)}
          />
          <div
            className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 overflow-hidden"
            style={{ animation: "modalPop 0.25s ease-out both" }}
          >
            <div
              className={`h-1 w-full bg-gradient-to-r ${confirmStyle.grad}`}
            />
            <div className="p-6 text-center">
              <div
                className={`w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center bg-gradient-to-br ${confirmStyle.grad}`}
              >
                <span className="text-white text-2xl">{confirmStyle.icon}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {confirmTitle}
              </h3>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                {confirmMessage}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={executeConfirm}
                  disabled={confirmLoading}
                  className={`flex-1 px-4 py-2.5 text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 transition bg-gradient-to-r ${confirmStyle.btn}`}
                >
                  {confirmLoading ? (
                    <FaSpinner className="animate-spin" size={13} />
                  ) : (
                    confirmStyle.text
                  )}
                </button>
              </div>
            </div>
          </div>
          <style>{`@keyframes modalPop{from{opacity:0;transform:scale(0.95) translateY(8px);}to{opacity:1;transform:scale(1) translateY(0);}}`}</style>
        </div>
      )}

      {/* ── Result toast-style overlay ── */}
      {showResultAnimation && (
        <div
          className="fixed bottom-6 right-6 z-[200] flex items-center gap-3 bg-white border border-gray-100 shadow-lg rounded-xl px-4 py-3"
          style={{ animation: "slideIn 0.3s ease-out both" }}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br ${resultStyle.grad}`}
          >
            <span className="text-white text-sm font-bold">
              {resultStyle.icon}
            </span>
          </div>
          <p className="text-sm font-semibold text-gray-800">{resultLabel}</p>
          <style>{`@keyframes slideIn{from{opacity:0;transform:translateX(20px);}to{opacity:1;transform:translateX(0);}}`}</style>
        </div>
      )}

      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
            <FaMotorcycle className="text-purple-600" size={22} /> Bike
            Management
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">
            {bikes.length} bike{bikes.length !== 1 ? "s" : ""} in inventory
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-lg hover:opacity-90 transition shadow-sm"
        >
          <FaPlus size={12} /> Add Bike
        </button>
      </div>

      {/* ── Filters ── */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1 max-w-xs">
          <FaSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={13}
          />
          <input
            type="text"
            placeholder="Search bikes…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-400 bg-white"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-400 bg-white text-gray-700"
        >
          <option value="all">All Types</option>
          {bikeTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* ── Grid ── */}
      {loading ? (
        <div className="flex justify-center py-20">
          <FaSpinner className="animate-spin text-3xl text-purple-400" />
        </div>
      ) : filteredBikes.length === 0 ? (
        <div className="text-center py-20 bg-white border border-gray-100 rounded-xl">
          <FaMotorcycle className="text-5xl text-gray-200 mx-auto mb-3" />
          <p className="text-gray-400 font-medium">No bikes found</p>
          <button
            onClick={openAddModal}
            className="mt-3 text-sm text-purple-600 hover:text-purple-700 font-medium"
          >
            Add your first bike →
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredBikes.map((bike) => {
            const img = getBikeImage(bike);
            return (
              <div
                key={bike._id}
                className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow group"
              >
                {/* Image */}
                <div className="relative h-40 bg-gray-50">
                  {img ? (
                    <img
                      src={img}
                      alt={bike.bikeName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FaMotorcycle className="text-4xl text-gray-200" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    {getStatusBadge(bike.status)}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="mb-3">
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                      {bike.bikeName}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {bike.brand} {bike.model}{" "}
                      {bike.engineCapacity ? `· ${bike.engineCapacity}` : ""}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 mb-3">
                    <span className="px-2 py-0.5 bg-purple-50 text-purple-600 text-xs rounded font-medium">
                      {bike.bikeType}
                    </span>
                    {bike.transmission && (
                      <span className="px-2 py-0.5 bg-gray-50 text-gray-500 text-xs rounded">
                        {bike.transmission}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                    <div>
                      <p className="text-xs text-gray-400">Daily rate</p>
                      <p className="text-base font-bold text-purple-600">
                        रु{bike.ratePerDay}
                        <span className="text-xs font-normal text-gray-400">
                          /day
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <select
                        value={bike.status}
                        onChange={(e) =>
                          handleStatusChange(bike._id, e.target.value)
                        }
                        className="text-xs border border-gray-200 rounded px-1.5 py-1 focus:outline-none focus:ring-1 focus:ring-purple-300 bg-white text-gray-600"
                      >
                        <option>Available</option>
                        <option>Booked</option>
                        <option>Maintenance</option>
                      </select>
                      <button
                        onClick={() => openEditModal(bike)}
                        className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded transition"
                        title="Edit"
                      >
                        <FaEdit size={13} />
                      </button>
                      <button
                        onClick={() => handleDelete(bike._id, bike.bikeName)}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition"
                        title="Delete"
                      >
                        <FaTrash size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Add / Edit Modal ── */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl w-full max-w-2xl my-4 shadow-xl">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900">
                {editingBike ? "Edit Bike" : "Add New Bike"}
              </h2>
              <button
                onClick={closeModal}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 transition"
              >
                <FaTimes size={15} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="overflow-y-auto max-h-[75vh]"
            >
              <div className="p-6 space-y-6">
                {/* Basic Info */}
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                    Basic Information
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: "bikeName", label: "Bike Name", required: true },
                      {
                        name: "bikeNumber",
                        label: "Plate Number",
                        required: true,
                      },
                      { name: "brand", label: "Brand", required: true },
                      { name: "model", label: "Model" },
                      { name: "year", label: "Year", type: "number" },
                      { name: "engineCapacity", label: "Engine Capacity" },
                    ].map((f) => (
                      <div key={f.name}>
                        <label className={labelCls}>
                          {f.label}
                          {f.required && (
                            <span className="text-red-400 ml-1">*</span>
                          )}
                        </label>
                        <input
                          type={f.type || "text"}
                          name={f.name}
                          value={formData[f.name]}
                          onChange={handleInputChange}
                          required={!!f.required}
                          className={inputCls}
                        />
                      </div>
                    ))}
                    <div>
                      <label className={labelCls}>Bike Type</label>
                      <select
                        name="bikeType"
                        value={formData.bikeType}
                        onChange={handleInputChange}
                        className={inputCls}
                      >
                        {bikeTypes.map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Fuel Type</label>
                      <select
                        name="fuelType"
                        value={formData.fuelType}
                        onChange={handleInputChange}
                        className={inputCls}
                      >
                        {["Petrol", "Electric", "Hybrid"].map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Transmission</label>
                      <select
                        name="transmission"
                        value={formData.transmission}
                        onChange={handleInputChange}
                        className={inputCls}
                      >
                        {["Manual", "Automatic", "Semi-Automatic"].map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Mileage</label>
                      <input
                        type="text"
                        name="mileage"
                        placeholder="e.g. 45 km/l"
                        value={formData.mileage}
                        onChange={handleInputChange}
                        className={inputCls}
                      />
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                    Pricing & Availability
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      {
                        name: "ratePerDay",
                        label: "Rate / Day (रु)",
                        required: true,
                      },
                      { name: "ratePerWeek", label: "Rate / Week (रु)" },
                      {
                        name: "securityDeposit",
                        label: "Security Deposit (रु)",
                      },
                      { name: "quantity", label: "Quantity" },
                      { name: "minimumAge", label: "Min. Age" },
                      {
                        name: "phoneNumber",
                        label: "Contact Number",
                        required: true,
                      },
                    ].map((f) => (
                      <div key={f.name}>
                        <label className={labelCls}>
                          {f.label}
                          {f.required && (
                            <span className="text-red-400 ml-1">*</span>
                          )}
                        </label>
                        <input
                          type="number"
                          name={f.name}
                          value={formData[f.name]}
                          onChange={handleInputChange}
                          required={!!f.required}
                          min={0}
                          className={inputCls}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div>
                      <label className={labelCls}>Status</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className={inputCls}
                      >
                        {["Available", "Booked", "Maintenance"].map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>License Required</label>
                      <select
                        name="licenseRequired"
                        value={formData.licenseRequired}
                        onChange={handleInputChange}
                        className={inputCls}
                      >
                        {["Any", "Two-Wheeler", "Heavy"].map((l) => (
                          <option key={l}>{l}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <label className="flex items-center gap-2.5 mt-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="helmetIncluded"
                      checked={formData.helmetIncluded}
                      onChange={handleInputChange}
                      className="w-4 h-4 accent-purple-600 rounded"
                    />
                    <span className="text-sm text-gray-600">
                      Helmet included
                    </span>
                  </label>
                </div>

                {/* Details */}
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                    Details
                  </p>
                  <div className="space-y-3">
                    <div>
                      <label className={labelCls}>Description</label>
                      <textarea
                        name="description"
                        placeholder="Optional description…"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={2}
                        className={`${inputCls} resize-none`}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>
                        Features{" "}
                        <span className="normal-case font-normal text-gray-400">
                          (comma-separated)
                        </span>
                      </label>
                      <input
                        type="text"
                        name="features"
                        placeholder="ABS, LED Lights, Disc Brakes"
                        value={formData.features}
                        onChange={handleInputChange}
                        className={inputCls}
                      />
                    </div>
                  </div>
                </div>

                {/* Photos */}
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                    Photos
                  </p>
                  <p className="text-xs text-amber-600 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mb-3">
                    Only <strong>{ALLOWED_EXT_LABEL}</strong> · Max{" "}
                    {MAX_SIZE_MB}MB each
                    {!editingBike ? " · Front View required" : ""}
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {PHOTO_SLOTS.map((slot) => (
                      <ImageUploadSlot
                        key={slot.key}
                        slot={slot}
                        file={imageFiles[slot.key]}
                        preview={imagePreviews[slot.key]}
                        onFileSelect={handleFileSelect}
                        onClear={handleFileClear}
                      />
                    ))}
                  </div>
                  {editingBike?.photos?.length > 0 && (
                    <div className="mt-3 p-3 bg-gray-50 border border-gray-100 rounded-lg">
                      <p className="text-xs text-gray-500 mb-2">
                        Current photos — upload above to replace
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {editingBike.photos.map((photo, i) => (
                          <div key={i} className="relative">
                            <img
                              src={`http://localhost:5000/uploads/bikes/${photo.filename}`}
                              alt={photo.label}
                              className="w-14 h-14 object-cover rounded-lg border border-gray-200"
                            />
                            <span className="absolute -bottom-1 left-0 right-0 text-center text-[8px] bg-gray-700 text-white rounded-b-lg py-0.5 truncate px-1">
                              {photo.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-2 px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-xl">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-white transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 text-sm bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:opacity-90 disabled:opacity-60 transition flex items-center gap-2"
                >
                  {submitting ? (
                    <>
                      <FaSpinner className="animate-spin" size={13} /> Saving…
                    </>
                  ) : editingBike ? (
                    "Update Bike"
                  ) : (
                    "Add Bike"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBikes;
