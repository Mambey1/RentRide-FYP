

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

  // Form state
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

  // Separate state for each image with labels
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
      setLoading(false);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (viewType, e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFiles((prev) => ({
        ...prev,
        [viewType]: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => ({
          ...prev,
          [viewType]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (viewType) => {
    setImageFiles((prev) => ({
      ...prev,
      [viewType]: null,
    }));

    setImagePreviews((prev) => ({
      ...prev,
      [viewType]: null,
    }));
  };

  const validateImages = () => {
    const requiredViews = ["frontView", "insideView", "rearView", "sideView"];
    const missingViews = requiredViews.filter(
      (viewType) => !imageFiles[viewType] && !imagePreviews[viewType],
    );

    if (missingViews.length > 0) {
      const missingLabels = missingViews.map((v) => v.replace("View", " View"));
      alert(`Please upload all required views: ${missingLabels.join(", ")}`);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateImages()) {
      return;
    }

    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
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
        featuresArray.forEach((feature) => {
          formDataToSend.append("features[]", feature);
        });
      }

      const photoOrder = [
        "frontView",
        "insideView",
        "rearView",
        "sideView",
        "extraView",
      ];

      photoOrder.forEach((viewType) => {
        if (imageFiles[viewType]) {
          formDataToSend.append("photos", imageFiles[viewType]);
        }
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
        alert("Vehicle updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/vehicles", formDataToSend, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Vehicle added successfully!");
      }

      resetForm();
      fetchVehicles();
      setShowAddModal(false);
      setShowEditModal(false);
    } catch (error) {
      console.error("Error saving vehicle:", error);
      alert(
        error.response?.data?.message ||
          "Failed to save vehicle. Please try again.",
      );
    }
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

    if (vehicle.photos && vehicle.photos.length > 0) {
      const newPreviews = {
        frontView: null,
        insideView: null,
        rearView: null,
        sideView: null,
        extraView: null,
      };

      vehicle.photos.forEach((photo, index) => {
        const viewTypes = [
          "frontView",
          "insideView",
          "rearView",
          "sideView",
          "extraView",
        ];
        if (viewTypes[index]) {
          newPreviews[viewTypes[index]] =
            `http://localhost:5000/uploads/vehicles/${photo.filename}`;
        }
      });

      setImagePreviews(newPreviews);
    }

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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      try {
        const token =
          localStorage.getItem("token") || sessionStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/vehicles/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Vehicle deleted successfully!");
        fetchVehicles();
      } catch (error) {
        console.error("Error deleting vehicle:", error);
        alert("Failed to delete vehicle.");
      }
    }
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
    if (selectedVehicle && selectedVehicle.photos) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === selectedVehicle.photos.length - 1 ? 0 : prevIndex + 1,
      );
    }
  };

  const prevImage = () => {
    if (selectedVehicle && selectedVehicle.photos) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? selectedVehicle.photos.length - 1 : prevIndex - 1,
      );
    }
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
      {/* Page Header */}
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
            <FaPlus />
            Add New Vehicle
          </button>
        </div>
      </div>

      {/* Vehicles Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Vehicle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Car Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Rate/Day
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Images
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vehicles.map((vehicle) => (
                <tr key={vehicle._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {vehicle.photos && vehicle.photos[0] && (
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
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        vehicle.status === "Available"
                          ? "bg-green-100 text-green-800"
                          : vehicle.status === "Booked"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
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
                        onClick={() => handleDelete(vehicle._id)}
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

      {/* Add Vehicle Modal */}
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
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Car Name *
                      </label>
                      <input
                        type="text"
                        name="carName"
                        value={formData.carName}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Car Number *
                      </label>
                      <input
                        type="text"
                        name="carNumber"
                        value={formData.carNumber}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      />
                    </div>
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
                        <option value="SUV">SUV</option>
                        <option value="Sedan">Sedan</option>
                        <option value="Hatchback">Hatchback</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rate Per Day (₹) *
                      </label>
                      <input
                        type="number"
                        name="ratePerDay"
                        value={formData.ratePerDay}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      />
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
                        <option value="Both">Both</option>
                        <option value="With Driver">With Driver</option>
                        <option value="Without Driver">Without Driver</option>
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
                        value={formData.airCondition}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
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
                    <option value="Available">Available</option>
                    <option value="Booked">Booked</option>
                    <option value="Maintenance">Maintenance</option>
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
                      {renderImageUploadSection(
                        "extraView",
                        "Extra View",
                        false,
                      )}
                    </div>
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

      {/* Edit Vehicle Modal */}
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
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Car Name *
                      </label>
                      <input
                        type="text"
                        name="carName"
                        value={formData.carName}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Car Number *
                      </label>
                      <input
                        type="text"
                        name="carNumber"
                        value={formData.carNumber}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      />
                    </div>
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
                        <option value="SUV">SUV</option>
                        <option value="Sedan">Sedan</option>
                        <option value="Hatchback">Hatchback</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rate Per Day (₹) *
                      </label>
                      <input
                        type="number"
                        name="ratePerDay"
                        value={formData.ratePerDay}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      />
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
                        <option value="Both">Both</option>
                        <option value="With Driver">With Driver</option>
                        <option value="Without Driver">Without Driver</option>
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
                        value={formData.airCondition}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
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
                    <option value="Available">Available</option>
                    <option value="Booked">Booked</option>
                    <option value="Maintenance">Maintenance</option>
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
                      {renderImageUploadSection(
                        "extraView",
                        "Extra View",
                        false,
                      )}
                    </div>
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

      {/* Vehicle Details Modal */}
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
                      {selectedVehicle.photos &&
                      selectedVehicle.photos.length > 0 &&
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
                    {selectedVehicle.photos &&
                      selectedVehicle.photos.length > 1 && (
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
                  {selectedVehicle.photos &&
                    selectedVehicle.photos.length > 0 && (
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
                    <div>
                      <p className="text-sm text-gray-500">Car Number</p>
                      <p className="font-semibold">
                        {selectedVehicle.carNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Car Type</p>
                      <p className="font-semibold">{selectedVehicle.carType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Rate/Day</p>
                      <p className="font-semibold text-blue-600 text-lg">
                        ₹{selectedVehicle.ratePerDay}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Seats</p>
                      <p className="font-semibold">{selectedVehicle.seats}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Booking Type</p>
                      <p className="font-semibold">
                        {selectedVehicle.bookingType}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Gear Type</p>
                      <p className="font-semibold">
                        {selectedVehicle.gearType}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Air Condition</p>
                      <p className="font-semibold">
                        {selectedVehicle.airCondition}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-semibold">
                        {selectedVehicle.phoneNumber}
                      </p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Status</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        selectedVehicle.status === "Available"
                          ? "bg-green-100 text-green-800"
                          : selectedVehicle.status === "Booked"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
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
                  {selectedVehicle.features &&
                    selectedVehicle.features.length > 0 && (
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
