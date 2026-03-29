

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Dashboard/Home";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import RentRideHome from "./components/Dashboard/RentRideHome";
import ProfileDetails from "./components/Profile/Profile";
import Booking from "./components/Booking/Booking";
import VerifyEmail from "./components/auth/VerifyEmail.jsx";
import UploadDocuments from "./components/Booking/UploadDocuments.jsx";
import IdentityVerification from "./components/Booking/IdentityVerification.jsx";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

// Admin Components
import AdminLayout from "./components/Admin/AdminLayout";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import AdminBookingApproval from "./AdminDashboard/AdminBookingApproval";
import AdminInventory from "./AdminDashboard/AdminInventory";
import AdminVehicleVerification from "./AdminDashboard/AdminVehicleVerification";

// Vehicle Listing Components
import ListYourVehicle from "./components/Vehicle/ListYourVehicle";
import MyVehicles from "./components/Vehicle/MyVehicles";
import EditVehicle from "./components/Vehicle/EditVehicle";
import VehicleDetails from "./components/Vehicle/VehicleDetails";


//Notificatgion


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/Home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* Protected User Routes */}
        <Route element={<ProtectedRoute />}>
          {/* Main Dashboard */}
          <Route path="/rentridehome" element={<RentRideHome />} />

          {/* Profile Routes */}
          <Route path="/profiledetails" element={<ProfileDetails />} />

          {/* Booking Routes */}
          <Route path="/booking" element={<Booking />} />
          <Route path="/booking/:vehicleId" element={<Booking />} />
          <Route
            path="/identity-verification"
            element={<IdentityVerification />}
          />
          <Route path="/upload-documents" element={<UploadDocuments />} />

          {/* Vehicle Listing Routes */}
          <Route path="/list-vehicle" element={<ListYourVehicle />} />
          <Route path="/my-vehicles" element={<MyVehicles />} />
          <Route path="/edit-vehicle/:id" element={<EditVehicle />} />
          <Route path="/vehicle-details/:id" element={<VehicleDetails />} />
        </Route>

        {/* Admin Routes with Shared Layout */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="inventory" element={<AdminInventory />} />
          <Route path="bookings" element={<AdminBookingApproval />} />
          <Route
            path="vehicle-verification"
            element={<AdminVehicleVerification />}
          />
        </Route>

        {/* Catch-all route - redirect to home */}
        <Route path="*" element={<Navigate to="/rentridehome" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
