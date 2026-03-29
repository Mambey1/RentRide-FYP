// src/controllers/vehicleController.js
import Vehicle from "../models/Vehicle.js";

// Get all vehicles
export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().sort({ createdAt: -1 });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single vehicle
export const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new vehicle
export const createVehicle = async (req, res) => {
  try {
    const vehicleData = req.body;

    // Handle photos from uploaded files with labels
    if (req.files && req.files.length > 0) {
      const photoLabels = [
        "Front View",
        "Inside View",
        "Rear View",
        "Side View",
        "Extra View",
      ];

      vehicleData.photos = req.files.map((file, index) => ({
        label: photoLabels[index] || `Extra View`,
        filename: file.filename,
      }));
    }

    const vehicle = new Vehicle(vehicleData);
    await vehicle.save();

    res.status(201).json({
      message: "Vehicle created successfully",
      vehicle,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update vehicle
export const updateVehicle = async (req, res) => {
  try {
    const vehicleData = req.body;

    // Handle new photos with labels
    if (req.files && req.files.length > 0) {
      const photoLabels = [
        "Front View",
        "Inside View",
        "Rear View",
        "Side View",
        "Extra View",
      ];

      vehicleData.photos = req.files.map((file, index) => ({
        label: photoLabels[index] || `Extra View`,
        filename: file.filename,
      }));
    }

    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      vehicleData,
      { new: true, runValidators: true }
    );

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.json({
      message: "Vehicle updated successfully",
      vehicle,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete vehicle
export const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
