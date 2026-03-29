

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  FaCar,
  FaArrowLeft,
  FaSave,
  FaTimes,
  FaCamera,
  FaTrash,
} from "react-icons/fa";

const EditVehicle = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [vehicle, setVehicle] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
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
    fullName: "",
    citizenshipNumber: "",
    phoneNumber: "",
    address: "",
    city: "",
    district: "",
  });

  useEffect(() => {
    fetchVehicle();
  }, [id]);

  const fetchVehicle = async () => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/user-vehicles/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.data.success) {
        const vehicleData = response.data.data;
        setVehicle(vehicleData);
        setFormData({
          carName: vehicleData.carName || "",
          carNumber: vehicleData.carNumber || "",
          carType: vehicleData.carType || "SUV",
          ratePerDay: vehicleData.ratePerDay || "",
          seats: vehicleData.seats || "4",
          bookingType: vehicleData.bookingType || "Both",
          gearType: vehicleData.gearType || "Automatic",
          airCondition: vehicleData.airCondition || "Yes",
          description: vehicleData.description || "",
          features: vehicleData.features?.join(", ") || "",
          fullName: vehicleData.fullName || "",
          citizenshipNumber: vehicleData.citizenshipNumber || "",
          phoneNumber: vehicleData.phoneNumber || "",
          address: vehicleData.address || "",
          city: vehicleData.city || "",
          district: vehicleData.district || "",
        });
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching vehicle:", error);
      setError("Failed to load vehicle details");
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      const updateData = {
        ...formData,
        features: formData.features
          .split(",")
          .map((f) => f.trim())
          .filter((f) => f),
      };

      const response = await axios.put(
        `http://localhost:5000/api/user-vehicles/${id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data.success) {
        alert("Vehicle updated successfully!");
        navigate("/my-vehicles");
      } else {
        setError(response.data.message || "Failed to update vehicle");
      }
    } catch (error) {
      console.error("Error updating vehicle:", error);
      setError(error.response?.data?.message || "Failed to update vehicle");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading vehicle details...</p>
        </div>
      </div>
    );
  }

  if (error && !vehicle) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate("/my-vehicles")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            Back to My Vehicles
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/my-vehicles")}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition mb-4"
          >
            <FaArrowLeft /> Back to My Vehicles
          </button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-xl shadow-lg">
              <FaCar className="text-white text-2xl" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              Edit Vehicle Listing
            </h1>
          </div>
          <p className="text-gray-500 mt-2">Update your vehicle information</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500"
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
                  value={formData.ratePerDay}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
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
            </div>

            <div>
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

            <div>
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

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Owner Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Citizenship Number *
                  </label>
                  <input
                    type="text"
                    name="citizenshipNumber"
                    value={formData.citizenshipNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
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
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    District
                  </label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-600 text-sm">
                {error}
              </div>
            )}

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate("/my-vehicles")}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white rounded-lg transition disabled:opacity-50 flex items-center gap-2"
              >
                {submitting ? (
                  "Saving..."
                ) : (
                  <>
                    <FaSave /> Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditVehicle;
