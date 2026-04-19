import React, { useState, useEffect, useRef } from "react";
import {
  FaMotorcycle,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaTimes,
  FaCamera,
  FaSpinner,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaSearch,
} from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:5000/api";

const AdminBikes = () => {
  const [bikes, setBikes] = useState([]);
  const [filteredBikes, setFilteredBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedBike, setSelectedBike] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
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
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const fileInputRef = useRef(null);

  const bikeTypes = [
    "Sports",
    "Cruiser",
    "Touring",
    "Scooter",
    "Electric",
    "Dirt Bike",
    "Standard",
  ];
  const fuelTypes = ["Petrol", "Electric", "Hybrid"];
  const transmissionTypes = ["Manual", "Automatic", "Semi-Automatic"];
  const licenseTypes = ["Any", "Two-Wheeler", "Heavy"];

  useEffect(() => {
    fetchBikes();
  }, []);

  const fetchBikes = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/bikes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setBikes(response.data.data);
        setFilteredBikes(response.data.data);
      }
    } catch (error) {
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

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }
    setImageFiles(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();

      Object.keys(formData).forEach((key) => {
        if (formData[key] !== undefined && formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
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

      imageFiles.forEach((file) => {
        formDataToSend.append("photos", file);
      });

      let response;
      if (showEditModal && selectedBike) {
        response = await axios.put(
          `${API_URL}/bikes/${selectedBike._id}`,
          formDataToSend,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          },
        );
        toast.success("Bike updated successfully!");
      } else {
        response = await axios.post(`${API_URL}/bikes`, formDataToSend, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Bike added successfully!");
      }

      resetForm();
      fetchBikes();
      setShowAddModal(false);
      setShowEditModal(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save bike");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (bike) => {
    setSelectedBike(bike);
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
    setImageFiles([]);
    setImagePreviews([]);
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this bike?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`${API_URL}/bikes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Bike deleted successfully!");
        fetchBikes();
      } catch (error) {
        toast.error("Failed to delete bike");
      }
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_URL}/bikes/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success(`Bike marked as ${status}`);
      fetchBikes();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const resetForm = () => {
    setFormData({
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
    });
    setImageFiles([]);
    setImagePreviews([]);
    setSelectedBike(null);
  };

  useEffect(() => {
    let filtered = bikes;
    if (filterType !== "all") {
      filtered = filtered.filter((bike) => bike.bikeType === filterType);
    }
    if (searchQuery) {
      filtered = filtered.filter(
        (bike) =>
          bike.bikeName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          bike.bikeNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          bike.brand?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    setFilteredBikes(filtered);
  }, [searchQuery, filterType, bikes]);

  const getStatusBadge = (status) => {
    const config = {
      Available: { color: "bg-green-100 text-green-800", icon: FaCheckCircle },
      Booked: { color: "bg-yellow-100 text-yellow-800", icon: FaClock },
      Maintenance: { color: "bg-red-100 text-red-800", icon: FaTimesCircle },
    };
    const cfg = config[status] || config.Available;
    const Icon = cfg.icon;
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 ${cfg.color}`}
      >
        <Icon size={10} /> {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading bikes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-2">
              <FaMotorcycle /> Bike Fleet Management
            </h1>
            <p className="text-gray-500 mt-2">
              Manage all bikes in your rental fleet
            </p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowAddModal(true);
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2.5 rounded-xl hover:shadow-lg transition-all"
          >
            <FaPlus /> Add New Bike
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilterType("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filterType === "all" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
            >
              All
            </button>
            {bikeTypes.map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filterType === type ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                {type}
              </button>
            ))}
          </div>
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search bikes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Bikes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBikes.map((bike) => (
          <div
            key={bike._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
          >
            {/* Image */}
            <div className="h-48 bg-gray-100 relative">
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
              <div className="absolute top-2 right-2">
                {getStatusBadge(bike.status)}
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 truncate">
                {bike.bikeName}
              </h3>
              <p className="text-sm text-gray-500">
                {bike.brand} {bike.model}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full">
                  {bike.bikeType}
                </span>
                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                  {bike.engineCapacity}
                </span>
              </div>
              <div className="mt-3 flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-500">Daily Rate</p>
                  <p className="text-xl font-bold text-purple-600">
                    रु {bike.ratePerDay}
                    <span className="text-sm font-normal">/day</span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(bike)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(bike._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBikes.length === 0 && (
        <div className="text-center py-12">
          <FaMotorcycle className="text-5xl text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No bikes found</p>
        </div>
      )}

      {/* Add/Edit Modal - Simplified for brevity, similar to car modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">
                {showEditModal ? "Edit Bike" : "Add New Bike"}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setShowEditModal(false);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Form fields - similar structure but simplified for bikes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="bikeName"
                  placeholder="Bike Name *"
                  value={formData.bikeName}
                  onChange={handleInputChange}
                  className="border rounded-lg px-4 py-2"
                  required
                />
                <input
                  type="text"
                  name="bikeNumber"
                  placeholder="Bike Number *"
                  value={formData.bikeNumber}
                  onChange={handleInputChange}
                  className="border rounded-lg px-4 py-2"
                  required
                />
                <select
                  name="bikeType"
                  value={formData.bikeType}
                  onChange={handleInputChange}
                  className="border rounded-lg px-4 py-2"
                >
                  {bikeTypes.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                <input
                  type="text"
                  name="brand"
                  placeholder="Brand *"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className="border rounded-lg px-4 py-2"
                  required
                />
                <input
                  type="text"
                  name="model"
                  placeholder="Model"
                  value={formData.model}
                  onChange={handleInputChange}
                  className="border rounded-lg px-4 py-2"
                />
                <input
                  type="number"
                  name="ratePerDay"
                  placeholder="Rate Per Day *"
                  value={formData.ratePerDay}
                  onChange={handleInputChange}
                  className="border rounded-lg px-4 py-2"
                  required
                />
                <input
                  type="text"
                  name="engineCapacity"
                  placeholder="Engine Capacity (e.g., 150cc)"
                  value={formData.engineCapacity}
                  onChange={handleInputChange}
                  className="border rounded-lg px-4 py-2"
                />
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Contact Number *"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="border rounded-lg px-4 py-2"
                  required
                />
              </div>

              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full border rounded-lg px-4 py-2"
              />

              <div>
                <label className="block text-sm font-medium mb-2">
                  Bike Images (Max 5)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="px-4 py-2 bg-gray-100 rounded-lg"
                >
                  Select Images
                </button>
                {imagePreviews.length > 0 && (
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {imagePreviews.map((preview, idx) => (
                      <img
                        key={idx}
                        src={preview}
                        alt="Preview"
                        className="w-16 h-16 object-cover rounded"
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                    resetForm();
                  }}
                  className="px-6 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg"
                >
                  {submitting ? (
                    <FaSpinner className="animate-spin" />
                  ) : showEditModal ? (
                    "Update"
                  ) : (
                    "Add"
                  )}{" "}
                  Bike
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
