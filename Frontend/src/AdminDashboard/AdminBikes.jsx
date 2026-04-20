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

// Allowed image types
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/webp"];
const ALLOWED_EXT_LABEL = "JPG, JPEG, WEBP";
const MAX_SIZE_MB = 5;

// Photo slot definitions — order matches backend photoLabels array
const PHOTO_SLOTS = [
  { key: "frontView", label: "Front View", icon: "🏍️", required: true },
  { key: "backView", label: "Rear View", icon: "↩️", required: false },
  { key: "extraView", label: "Extra View", icon: "📸", required: false },
];

const validateImageFile = (file) => {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return `"${file.name}" is not allowed. Only ${ALLOWED_EXT_LABEL} files are accepted.`;
  }
  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    return `"${file.name}" exceeds ${MAX_SIZE_MB}MB limit.`;
  }
  return null;
};

const getStatusBadge = (status) => {
  const styles = {
    Available: "bg-green-100 text-green-700 border border-green-200",
    Booked: "bg-blue-100 text-blue-700 border border-blue-200",
    Maintenance: "bg-yellow-100 text-yellow-700 border border-yellow-200",
  };
  return (
    <span
      className={`px-2 py-0.5 text-xs font-semibold rounded-full ${styles[status] || "bg-gray-100 text-gray-600"}`}
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
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
        <span>{slot.icon}</span> {slot.label}
        {slot.required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div
        onClick={() => !preview && inputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl overflow-hidden cursor-pointer transition-all
          ${
            preview
              ? "border-green-400 bg-green-50"
              : "border-gray-300 bg-gray-50 hover:border-purple-400 hover:bg-purple-50"
          } h-36 flex items-center justify-center`}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt={slot.label}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-1.5 right-1.5 flex gap-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClear(slot.key);
                }}
                className="p-1 bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition"
                title="Remove"
              >
                <FaTimes size={10} />
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs text-center py-1">
              <FaCheckCircle className="inline mr-1 text-green-400" />
              {slot.label}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-400 px-3 text-center">
            <FaImage size={28} className="text-gray-300" />
            <p className="text-xs leading-tight">
              Click to upload
              <br />
              <span className="text-purple-500 font-medium">
                {ALLOWED_EXT_LABEL}
              </span>
            </p>
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
      <p className="text-xs text-gray-400">
        Max {MAX_SIZE_MB}MB · {ALLOWED_EXT_LABEL} only
      </p>
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

  // Per-slot image state: { frontView: File|null, backView: File|null, extraView: File|null }
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

      // Append images in slot order — backend uses index to assign labels
      // Slot order: Front View, Rear View, Extra View
      PHOTO_SLOTS.forEach((slot) => {
        if (imageFiles[slot.key]) {
          fd.append("photos", imageFiles[slot.key]);
        }
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

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this bike permanently?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/bikes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Bike deleted");
      fetchBikes();
    } catch {
      toast.error("Failed to delete bike");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_URL}/bikes/${id}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
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

  return (
    <div className="p-6">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FaMotorcycle className="text-purple-600" /> Bike Management
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {bikes.length} bikes in inventory
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow hover:shadow-lg hover:scale-105 transition-all"
        >
          <FaPlus /> Add New Bike
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search bikes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white"
        >
          <option value="all">All Types</option>
          {bikeTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <FaSpinner className="animate-spin text-4xl text-purple-500" />
        </div>
      ) : filteredBikes.length === 0 ? (
        <div className="text-center py-16">
          <FaMotorcycle className="text-6xl text-gray-200 mx-auto mb-3" />
          <p className="text-gray-400 text-lg">No bikes found</p>
          <button
            onClick={openAddModal}
            className="mt-4 text-purple-600 font-semibold hover:underline"
          >
            Add your first bike →
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredBikes.map((bike) => {
            const img = getBikeImage(bike);
            return (
              <div
                key={bike._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group"
              >
                <div className="relative h-44 bg-gradient-to-br from-gray-100 to-gray-200">
                  {img ? (
                    <img
                      src={img}
                      alt={bike.bikeName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FaMotorcycle className="text-5xl text-gray-300" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    {getStatusBadge(bike.status)}
                  </div>
                  {bike.photos?.length > 1 && (
                    <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">
                      {bike.photos.length} photos
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 truncate">
                    {bike.bikeName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {bike.brand} {bike.model}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2 py-0.5 bg-purple-100 text-purple-600 text-xs rounded-full">
                      {bike.bikeType}
                    </span>
                    {bike.engineCapacity && (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                        {bike.engineCapacity}
                      </span>
                    )}
                  </div>
                  <div className="mt-3 flex justify-between items-end">
                    <div>
                      <p className="text-xs text-gray-400">Daily Rate</p>
                      <p className="text-xl font-bold text-purple-600">
                        रु{bike.ratePerDay}
                        <span className="text-sm font-normal text-gray-400">
                          /day
                        </span>
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <select
                        value={bike.status}
                        onChange={(e) =>
                          handleStatusChange(bike._id, e.target.value)
                        }
                        className="text-xs border rounded-lg px-1.5 py-1 focus:outline-none focus:ring-1 focus:ring-purple-300"
                        title="Change status"
                      >
                        <option>Available</option>
                        <option>Booked</option>
                        <option>Maintenance</option>
                      </select>
                      <button
                        onClick={() => openEditModal(bike)}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition"
                        title="Edit"
                      >
                        <FaEdit size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(bike._id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                        title="Delete"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-3xl my-4 shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center rounded-t-2xl z-10">
              <h2 className="text-xl font-bold text-gray-800">
                {editingBike ? "✏️ Edit Bike" : "🏍️ Add New Bike"}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <FaTimes className="text-gray-500" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-6 overflow-y-auto max-h-[75vh]"
            >
              {/* ── Basic Info ── */}
              <section>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      name: "bikeName",
                      placeholder: "Bike Name *",
                      required: true,
                    },
                    {
                      name: "bikeNumber",
                      placeholder: "Plate Number *",
                      required: true,
                    },
                    { name: "brand", placeholder: "Brand *", required: true },
                    { name: "model", placeholder: "Model" },
                    { name: "year", placeholder: "Year", type: "number" },
                    {
                      name: "engineCapacity",
                      placeholder: "Engine Capacity (e.g. 150cc)",
                    },
                  ].map((field) => (
                    <input
                      key={field.name}
                      type={field.type || "text"}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      required={!!field.required}
                      className="border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm"
                    />
                  ))}
                  <select
                    name="bikeType"
                    value={formData.bikeType}
                    onChange={handleInputChange}
                    className="border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm"
                  >
                    {bikeTypes.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                  <select
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleInputChange}
                    className="border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm"
                  >
                    {["Petrol", "Electric", "Hybrid"].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                  <select
                    name="transmission"
                    value={formData.transmission}
                    onChange={handleInputChange}
                    className="border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm"
                  >
                    {["Manual", "Automatic", "Semi-Automatic"].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    name="mileage"
                    placeholder="Mileage (e.g. 45 km/l)"
                    value={formData.mileage}
                    onChange={handleInputChange}
                    className="border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm"
                  />
                </div>
              </section>

              {/* ── Pricing ── */}
              <section>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
                  Pricing & Availability
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      name: "ratePerDay",
                      placeholder: "Rate Per Day (रु) *",
                      required: true,
                    },
                    { name: "ratePerWeek", placeholder: "Rate Per Week (रु)" },
                    {
                      name: "securityDeposit",
                      placeholder: "Security Deposit (रु)",
                    },
                    {
                      name: "quantity",
                      placeholder: "Quantity",
                      type: "number",
                    },
                    {
                      name: "minimumAge",
                      placeholder: "Minimum Age",
                      type: "number",
                    },
                    {
                      name: "phoneNumber",
                      placeholder: "Contact Number *",
                      required: true,
                    },
                  ].map((field) => (
                    <input
                      key={field.name}
                      type={field.type || "number"}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      required={!!field.required}
                      min={field.type === "number" ? 0 : undefined}
                      className="border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm"
                    />
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm"
                  >
                    {["Available", "Booked", "Maintenance"].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                  <select
                    name="licenseRequired"
                    value={formData.licenseRequired}
                    onChange={handleInputChange}
                    className="border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm"
                  >
                    {["Any", "Two-Wheeler", "Heavy"].map((l) => (
                      <option key={l}>{l}</option>
                    ))}
                  </select>
                </div>
                <label className="flex items-center gap-3 mt-4 cursor-pointer">
                  <input
                    type="checkbox"
                    name="helmetIncluded"
                    checked={formData.helmetIncluded}
                    onChange={handleInputChange}
                    className="w-4 h-4 accent-purple-600"
                  />
                  <span className="text-sm text-gray-700 font-medium">
                    Helmet included with bike
                  </span>
                </label>
              </section>

              {/* ── Description & Features ── */}
              <section>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
                  Details
                </h3>
                <textarea
                  name="description"
                  placeholder="Description (optional)"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm resize-none"
                />
                <input
                  type="text"
                  name="features"
                  placeholder="Features (comma-separated, e.g. ABS, LED Lights, Disc Brakes)"
                  value={formData.features}
                  onChange={handleInputChange}
                  className="mt-3 w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm"
                />
              </section>

              {/* ── Photos ── */}
              <section>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Bike Photos
                </h3>
                <div className="flex items-center gap-2 mb-3 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                  <FaExclamationTriangle className="text-amber-500 flex-shrink-0" />
                  <p className="text-xs text-amber-700">
                    Only <strong>{ALLOWED_EXT_LABEL}</strong> files accepted ·
                    Max {MAX_SIZE_MB}MB each.
                    {!editingBike && " Front View is required."}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                {editingBike && editingBike.photos?.length > 0 && (
                  <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-xl">
                    <p className="text-xs text-blue-700 font-medium mb-2">
                      Current photos ({editingBike.photos.length}). Upload new
                      ones above to replace them.
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {editingBike.photos.map((photo, i) => (
                        <div key={i} className="relative">
                          <img
                            src={`http://localhost:5000/uploads/bikes/${photo.filename}`}
                            alt={photo.label}
                            className="w-16 h-16 object-cover rounded-lg border border-blue-200"
                          />
                          <span className="absolute -bottom-1 left-0 right-0 text-center text-[9px] bg-blue-600 text-white rounded-b-lg py-0.5 truncate px-1">
                            {photo.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-2 border-t">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2.5 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg disabled:opacity-60 transition flex items-center gap-2"
                >
                  {submitting ? (
                    <>
                      <FaSpinner className="animate-spin" /> Saving…
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
