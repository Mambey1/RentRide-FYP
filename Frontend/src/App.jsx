// // // // // // import {
// // // // // //   BrowserRouter as Router,
// // // // // //   Routes,
// // // // // //   Route,
// // // // // //   Navigate,
// // // // // // } from "react-router-dom";
// // // // // // import Home from "./components/Dashboard/Home";
// // // // // // import Login from "./components/Auth/Login";
// // // // // // import SignUp from "./components/Auth/SignUp";
// // // // // // import RentRideHome from "./components/Dashboard/RentRideHome";
// // // // // // import ProfileDetails from "./components/Profile/Profile";
// // // // // // import Booking from "./components/Booking/Booking";
// // // // // // import VerifyEmail from "./components/Auth/VerifyEmail";
// // // // // // import UploadDocuments from "./components/Booking/UploadDocuments";
// // // // // // import IdentityVerification from "./components/Booking/IdentityVerification";
// // // // // // import ProtectedRoute from "./components/Auth/ProtectedRoute";

// // // // // // // Admin Components
// // // // // // import AdminLayout from "./components/Admin/AdminLayout";
// // // // // // import AdminDashboard from "./AdminDashboard/AdminDashboard";
// // // // // // import AdminBookingApproval from "./AdminDashboard/AdminBookingApproval";
// // // // // // import AdminInventory from "./AdminDashboard/AdminInventory";
// // // // // // import AdminVehicleVerification from "./AdminDashboard/AdminVehicleVerification";

// // // // // // // Vehicle Listing Components
// // // // // // import ListYourVehicle from "./components/Vehicle/ListYourVehicle";
// // // // // // import MyVehicles from "./components/Vehicle/MyVehicles";
// // // // // // import EditVehicle from "./components/Vehicle/EditVehicle";
// // // // // // import VehicleDetails from "./components/Vehicle/VehicleDetails";

// // // // // // // Payment
// // // // // // import PaymentComponent from "./components/Booking/PaymentComponent";
// // // // // // import PaymentSuccess from "./components/Payment/Success";
// // // // // // import PaymentFailure from "./components/Payment/Failure";

// // // // // // // Revenue
// // // // // // import AdminRevenue from "./AdminDashboard/AdminRevenue";

// // // // // // // Profile & Auth
// // // // // // import ForgotPassword from "./components/Auth/ForgotPassword";
// // // // // // import ChangePassword from "./components/Auth/ChangePassword";

// // // // // // // Chat
// // // // // // import { SocketProvider } from "./context/SocketContext";
// // // // // // // import ChatFloatingButton from "./components/Chat/ChatFloatingButton";

// // // // // // function App() {
// // // // // //   return (
// // // // // //     <SocketProvider>
// // // // // //       <Router>
// // // // // //         <Routes>
// // // // // //           {/* Public Routes */}
// // // // // //           <Route path="/" element={<Home />} />
// // // // // //           <Route path="/Home" element={<Home />} />
// // // // // //           <Route path="/login" element={<Login />} />
// // // // // //           <Route path="/signup" element={<SignUp />} />
// // // // // //           <Route path="/verify-email" element={<VerifyEmail />} />
// // // // // //           <Route path="/payment/:bookingId" element={<PaymentComponent />} />
// // // // // //           <Route path="/payment" element={<PaymentComponent />} />
// // // // // //           <Route path="/payment-success" element={<PaymentSuccess />} />
// // // // // //           <Route path="/payment-failure" element={<PaymentFailure />} />
// // // // // //           <Route path="/vehicle-details/:id" element={<VehicleDetails />} />

// // // // // //           {/* Protected User Routes */}
// // // // // //           <Route element={<ProtectedRoute />}>
// // // // // //             {/* Main Dashboard */}
// // // // // //             <Route path="/rentridehome" element={<RentRideHome />} />
// // // // // //             <Route path="/forgot-password" element={<ForgotPassword />} />
// // // // // //             <Route path="/change-password" element={<ChangePassword />} />

// // // // // //             {/* Profile Routes */}
// // // // // //             <Route path="/profiledetails" element={<ProfileDetails />} />

// // // // // //             {/* Booking Routes */}
// // // // // //             <Route path="/booking" element={<Booking />} />
// // // // // //             <Route path="/booking/:vehicleId" element={<Booking />} />
// // // // // //             <Route path="/identity-verification" element={<IdentityVerification />} />
// // // // // //             <Route path="/upload-documents" element={<UploadDocuments />} />

// // // // // //             {/* Vehicle Listing Routes */}
// // // // // //             <Route path="/list-vehicle" element={<ListYourVehicle />} />
// // // // // //             <Route path="/my-vehicles" element={<MyVehicles />} />
// // // // // //             <Route path="/edit-vehicle/:id" element={<EditVehicle />} />
// // // // // //           </Route>

// // // // // //           {/* Admin Routes with Shared Layout */}
// // // // // //           <Route
// // // // // //             path="/admin"
// // // // // //             element={
// // // // // //               <ProtectedRoute requiredRole="admin">
// // // // // //                 <AdminLayout />
// // // // // //               </ProtectedRoute>
// // // // // //             }
// // // // // //           >
// // // // // //             <Route index element={<Navigate to="/admin/dashboard" replace />} />
// // // // // //             <Route path="dashboard" element={<AdminDashboard />} />
// // // // // //             <Route path="inventory" element={<AdminInventory />} />
// // // // // //             <Route path="revenue" element={<AdminRevenue />} />
// // // // // //             <Route path="bookings" element={<AdminBookingApproval />} />
// // // // // //             <Route path="vehicle-verification" element={<AdminVehicleVerification />} />
// // // // // //           </Route>

// // // // // //           {/* Catch-all route - redirect to home */}
// // // // // //           <Route path="*" element={<Navigate to="/rentridehome" replace />} />
// // // // // //         </Routes>
// // // // // //       </Router>
// // // // // //       {/* <ChatFloatingButton /> */}
// // // // // //     </SocketProvider>
// // // // // //   );
// // // // // // }

// // // // // // export default App;

// // // // // // import {
// // // // // //   BrowserRouter as Router,
// // // // // //   Routes,
// // // // // //   Route,
// // // // // //   Navigate,
// // // // // // } from "react-router-dom";
// // // // // // import Home from "./components/Dashboard/Home";
// // // // // // import Login from "./components/Auth/Login";
// // // // // // import SignUp from "./components/Auth/SignUp";
// // // // // // import RentRideHome from "./components/Dashboard/RentRideHome";
// // // // // // import ProfileDetails from "./components/Profile/Profile";
// // // // // // import Booking from "./components/Booking/Booking";
// // // // // // import VerifyEmail from "./components/Auth/VerifyEmail";
// // // // // // import UploadDocuments from "./components/Booking/UploadDocuments";
// // // // // // import IdentityVerification from "./components/Booking/IdentityVerification";
// // // // // // import ProtectedRoute from "./components/Auth/ProtectedRoute";

// // // // // // // Admin Components
// // // // // // import AdminLayout from "./components/Admin/AdminLayout";
// // // // // // import AdminDashboard from "./AdminDashboard/AdminDashboard";
// // // // // // import AdminBookingApproval from "./AdminDashboard/AdminBookingApproval";
// // // // // // import AdminInventory from "./AdminDashboard/AdminInventory";
// // // // // // import AdminVehicleVerification from "./AdminDashboard/AdminVehicleVerification";
// // // // // // import AdminMessages from "./AdminDashboard/AdminMessages"; // ← new

// // // // // // // Vehicle Listing Components
// // // // // // import ListYourVehicle from "./components/Vehicle/ListYourVehicle";
// // // // // // import MyVehicles from "./components/Vehicle/MyVehicles";
// // // // // // import EditVehicle from "./components/Vehicle/EditVehicle";
// // // // // // import VehicleDetails from "./components/Vehicle/VehicleDetails";

// // // // // // // Payment
// // // // // // import PaymentComponent from "./components/Booking/PaymentComponent";
// // // // // // import PaymentSuccess from "./components/Payment/Success";
// // // // // // import PaymentFailure from "./components/Payment/Failure";

// // // // // // // Revenue
// // // // // // import AdminRevenue from "./AdminDashboard/AdminRevenue";

// // // // // // // Profile & Auth
// // // // // // import ForgotPassword from "./components/Auth/ForgotPassword";
// // // // // // import ChangePassword from "./components/Auth/ChangePassword";

// // // // // // // Socket
// // // // // // import { SocketProvider } from "./context/SocketContext";

// // // // // // function App() {
// // // // // //   return (
// // // // // //     <SocketProvider>
// // // // // //       <Router>
// // // // // //         <Routes>
// // // // // //           {/* Public Routes */}
// // // // // //           <Route path="/" element={<Home />} />
// // // // // //           <Route path="/Home" element={<Home />} />
// // // // // //           <Route path="/login" element={<Login />} />
// // // // // //           <Route path="/signup" element={<SignUp />} />
// // // // // //           <Route path="/verify-email" element={<VerifyEmail />} />
// // // // // //           <Route path="/payment/:bookingId" element={<PaymentComponent />} />
// // // // // //           <Route path="/payment" element={<PaymentComponent />} />
// // // // // //           <Route path="/payment-success" element={<PaymentSuccess />} />
// // // // // //           <Route path="/payment-failure" element={<PaymentFailure />} />
// // // // // //           <Route path="/vehicle-details/:id" element={<VehicleDetails />} />

// // // // // //           {/* Protected User Routes */}
// // // // // //           <Route element={<ProtectedRoute />}>
// // // // // //             <Route path="/rentridehome" element={<RentRideHome />} />
// // // // // //             <Route path="/forgot-password" element={<ForgotPassword />} />
// // // // // //             <Route path="/change-password" element={<ChangePassword />} />
// // // // // //             <Route path="/profiledetails" element={<ProfileDetails />} />
// // // // // //             <Route path="/booking" element={<Booking />} />
// // // // // //             <Route path="/booking/:vehicleId" element={<Booking />} />
// // // // // //             <Route
// // // // // //               path="/identity-verification"
// // // // // //               element={<IdentityVerification />}
// // // // // //             />
// // // // // //             <Route path="/upload-documents" element={<UploadDocuments />} />
// // // // // //             <Route path="/list-vehicle" element={<ListYourVehicle />} />
// // // // // //             <Route path="/my-vehicles" element={<MyVehicles />} />
// // // // // //             <Route path="/edit-vehicle/:id" element={<EditVehicle />} />
// // // // // //           </Route>

// // // // // //           {/* Admin Routes */}
// // // // // //           <Route
// // // // // //             path="/admin"
// // // // // //             element={
// // // // // //               <ProtectedRoute requiredRole="admin">
// // // // // //                 <AdminLayout />
// // // // // //               </ProtectedRoute>
// // // // // //             }
// // // // // //           >
// // // // // //             <Route index element={<Navigate to="/admin/dashboard" replace />} />
// // // // // //             <Route path="dashboard" element={<AdminDashboard />} />
// // // // // //             <Route path="inventory" element={<AdminInventory />} />
// // // // // //             <Route path="revenue" element={<AdminRevenue />} />
// // // // // //             <Route path="bookings" element={<AdminBookingApproval />} />
// // // // // //             <Route
// // // // // //               path="vehicle-verification"
// // // // // //               element={<AdminVehicleVerification />}
// // // // // //             />
// // // // // //             {/* ── New messages route ── */}
// // // // // //             <Route path="messages" element={<AdminMessages />} />
// // // // // //           </Route>

// // // // // //           {/* Catch-all */}
// // // // // //           <Route path="*" element={<Navigate to="/rentridehome" replace />} />
// // // // // //         </Routes>
// // // // // //       </Router>
// // // // // //     </SocketProvider>
// // // // // //   );
// // // // // // }

// // // // // // export default App;

// // // // // import {
// // // // //   BrowserRouter as Router,
// // // // //   Routes,
// // // // //   Route,
// // // // //   Navigate,
// // // // // } from "react-router-dom";
// // // // // import Home from "./components/Dashboard/Home";
// // // // // import Login from "./components/Auth/Login";
// // // // // import SignUp from "./components/Auth/SignUp";
// // // // // import RentRideHome from "./components/Dashboard/RentRideHome";
// // // // // import ProfileDetails from "./components/Profile/Profile";
// // // // // import Booking from "./components/Booking/Booking";
// // // // // import VerifyEmail from "./components/Auth/VerifyEmail";
// // // // // import UploadDocuments from "./components/Booking/UploadDocuments";
// // // // // import IdentityVerification from "./components/Booking/IdentityVerification";
// // // // // import ProtectedRoute from "./components/Auth/ProtectedRoute";

// // // // // // Admin Components
// // // // // import AdminLayout from "./components/Admin/AdminLayout";
// // // // // import AdminDashboard from "./AdminDashboard/AdminDashboard";
// // // // // import AdminBookingApproval from "./AdminDashboard/AdminBookingApproval";
// // // // // import AdminInventory from "./AdminDashboard/AdminInventory";
// // // // // import AdminVehicleVerification from "./AdminDashboard/AdminVehicleVerification";
// // // // // import AdminMessages from "./AdminDashboard/AdminMessages";

// // // // // // Vehicle Listing Components
// // // // // import ListYourVehicle from "./components/Vehicle/ListYourVehicle";
// // // // // import MyVehicles from "./components/Vehicle/MyVehicles";
// // // // // import EditVehicle from "./components/Vehicle/EditVehicle";
// // // // // import VehicleDetails from "./components/Vehicle/VehicleDetails";

// // // // // // Payment
// // // // // import PaymentComponent from "./components/Booking/PaymentComponent";
// // // // // import PaymentSuccess from "./components/Payment/Success";
// // // // // import PaymentFailure from "./components/Payment/Failure";

// // // // // // Revenue
// // // // // import AdminRevenue from "./AdminDashboard/AdminRevenue";

// // // // // // Profile & Auth
// // // // // import ForgotPassword from "./components/Auth/ForgotPassword";
// // // // // import ChangePassword from "./components/Auth/ChangePassword";

// // // // // // Socket
// // // // // import { SocketProvider } from "./context/SocketContext";

// // // // // // Import Chat Floating Button
// // // // // import ChatFloatingButton from "./components/Chat/ChatFloatingButton";

// // // // // function App() {
// // // // //   // Check if user is logged in to show chat button
// // // // //   const isLoggedIn = !!localStorage.getItem("token");

// // // // //   return (
// // // // //     <SocketProvider>
// // // // //       <Router>
// // // // //         <Routes>
// // // // //           {/* Public Routes */}
// // // // //           <Route path="/" element={<Home />} />
// // // // //           <Route path="/Home" element={<Home />} />
// // // // //           <Route path="/login" element={<Login />} />
// // // // //           <Route path="/signup" element={<SignUp />} />
// // // // //           <Route path="/verify-email" element={<VerifyEmail />} />
// // // // //           <Route path="/payment/:bookingId" element={<PaymentComponent />} />
// // // // //           <Route path="/payment" element={<PaymentComponent />} />
// // // // //           <Route path="/payment-success" element={<PaymentSuccess />} />
// // // // //           <Route path="/payment-failure" element={<PaymentFailure />} />
// // // // //           <Route path="/vehicle-details/:id" element={<VehicleDetails />} />

// // // // //           {/* Protected User Routes */}
// // // // //           <Route element={<ProtectedRoute />}>
// // // // //             <Route path="/rentridehome" element={<RentRideHome />} />
// // // // //             <Route path="/forgot-password" element={<ForgotPassword />} />
// // // // //             <Route path="/change-password" element={<ChangePassword />} />
// // // // //             <Route path="/profiledetails" element={<ProfileDetails />} />
// // // // //             <Route path="/booking" element={<Booking />} />
// // // // //             <Route path="/booking/:vehicleId" element={<Booking />} />
// // // // //             <Route
// // // // //               path="/identity-verification"
// // // // //               element={<IdentityVerification />}
// // // // //             />
// // // // //             <Route path="/upload-documents" element={<UploadDocuments />} />
// // // // //             <Route path="/list-vehicle" element={<ListYourVehicle />} />
// // // // //             <Route path="/my-vehicles" element={<MyVehicles />} />
// // // // //             <Route path="/edit-vehicle/:id" element={<EditVehicle />} />
// // // // //           </Route>

// // // // //           {/* Admin Routes */}
// // // // //           <Route
// // // // //             path="/admin"
// // // // //             element={
// // // // //               <ProtectedRoute requiredRole="admin">
// // // // //                 <AdminLayout />
// // // // //               </ProtectedRoute>
// // // // //             }
// // // // //           >
// // // // //             <Route index element={<Navigate to="/admin/dashboard" replace />} />
// // // // //             <Route path="dashboard" element={<AdminDashboard />} />
// // // // //             <Route path="inventory" element={<AdminInventory />} />
// // // // //             <Route path="revenue" element={<AdminRevenue />} />
// // // // //             <Route path="bookings" element={<AdminBookingApproval />} />
// // // // //             <Route
// // // // //               path="vehicle-verification"
// // // // //               element={<AdminVehicleVerification />}
// // // // //             />
// // // // //             <Route path="messages" element={<AdminMessages />} />
// // // // //           </Route>

// // // // //           {/* Catch-all */}
// // // // //           <Route path="*" element={<Navigate to="/rentridehome" replace />} />
// // // // //         </Routes>

// // // // //         {/* Floating Chat Button - Only show for logged in users */}
// // // // //         {isLoggedIn && <ChatFloatingButton />}
// // // // //       </Router>
// // // // //     </SocketProvider>
// // // // //   );
// // // // // }

// // // // // export default App;

// // // // import {
// // // //   BrowserRouter as Router,
// // // //   Routes,
// // // //   Route,
// // // //   Navigate,
// // // // } from "react-router-dom";
// // // // import Home from "./components/Dashboard/Home";
// // // // import Login from "./components/Auth/Login";
// // // // import SignUp from "./components/Auth/SignUp";
// // // // import RentRideHome from "./components/Dashboard/RentRideHome";
// // // // import ProfileDetails from "./components/Profile/Profile.jsx"; // Added .jsx
// // // // import Booking from "./components/Booking/Booking";
// // // // import VerifyEmail from "./components/Auth/VerifyEmail";
// // // // import UploadDocuments from "./components/Booking/UploadDocuments";
// // // // import IdentityVerification from "./components/Booking/IdentityVerification";
// // // // import ProtectedRoute from "./components/Auth/ProtectedRoute";

// // // // // Admin Components
// // // // import AdminLayout from "./components/Admin/AdminLayout";
// // // // import AdminDashboard from "./AdminDashboard/AdminDashboard";
// // // // import AdminBookingApproval from "./AdminDashboard/AdminBookingApproval";
// // // // import AdminInventory from "./AdminDashboard/AdminInventory";
// // // // import AdminVehicleVerification from "./AdminDashboard/AdminVehicleVerification";
// // // // import AdminMessages from "./AdminDashboard/AdminMessages";
// // // // import AdminRevenue from "./AdminDashboard/AdminRevenue";

// // // // // Vehicle Listing Components
// // // // import ListYourVehicle from "./components/Vehicle/ListYourVehicle";
// // // // import MyVehicles from "./components/Vehicle/MyVehicles";
// // // // import EditVehicle from "./components/Vehicle/EditVehicle";
// // // // import VehicleDetails from "./components/Vehicle/VehicleDetails";

// // // // // Payment
// // // // import PaymentComponent from "./components/Booking/PaymentComponent";
// // // // import PaymentSuccess from "./components/Payment/Success";
// // // // import PaymentFailure from "./components/Payment/Failure";

// // // // // Profile & Auth
// // // // import ForgotPassword from "./components/Auth/ForgotPassword";
// // // // import ChangePassword from "./components/Auth/ChangePassword";

// // // // // Socket
// // // // import { SocketProvider } from "./context/SocketContext";

// // // // // Import Chat Components
// // // // import ChatFloatingButton from "./components/Chat/ChatFloatingButton";

// // // // //Bokes
// // // // import BikeBooking from "./components/Booking/BikeBooking";
// // // // import AdminBikes from "./AdminDashboard/AdminBikes";

// // // // function App() {
// // // //   // Check if user is logged in to show chat button
// // // //   const isLoggedIn = !!localStorage.getItem("token");

// // // //   // Check if user is admin
// // // //   const userStr =
// // // //     localStorage.getItem("user") || sessionStorage.getItem("user");
// // // //   let isAdmin = false;
// // // //   try {
// // // //     const user = userStr ? JSON.parse(userStr) : null;
// // // //     isAdmin = user?.role === "admin";
// // // //   } catch (e) {
// // // //     console.error("Error parsing user:", e);
// // // //   }

// // // //   return (
// // // //     <SocketProvider>
// // // //       <Router>
// // // //         <Routes>
// // // //           {/* Public Routes */}
// // // //           <Route path="/" element={<Home />} />
// // // //           <Route path="/Home" element={<Home />} />
// // // //           <Route path="/login" element={<Login />} />
// // // //           <Route path="/signup" element={<SignUp />} />
// // // //           <Route path="/verify-email" element={<VerifyEmail />} />
// // // //           <Route path="/payment/:bookingId" element={<PaymentComponent />} />
// // // //           <Route path="/payment" element={<PaymentComponent />} />
// // // //           <Route path="/payment-success" element={<PaymentSuccess />} />
// // // //           <Route path="/payment-failure" element={<PaymentFailure />} />
// // // //           <Route path="/vehicle-details/:id" element={<VehicleDetails />} />
// // // //           <Route path="/bike-booking/:bikeId" element={<BikeBooking />} />

// // // //           {/* Protected User Routes */}
// // // //           <Route element={<ProtectedRoute />}>
// // // //             <Route path="/rentridehome" element={<RentRideHome />} />
// // // //             <Route path="/forgot-password" element={<ForgotPassword />} />
// // // //             <Route path="/change-password" element={<ChangePassword />} />
// // // //             <Route path="/profiledetails" element={<ProfileDetails />} />
// // // //             <Route path="/booking" element={<Booking />} />
// // // //             <Route path="/booking/:vehicleId" element={<Booking />} />
// // // //             <Route
// // // //               path="/identity-verification"
// // // //               element={<IdentityVerification />}
// // // //             />
// // // //             <Route path="/upload-documents" element={<UploadDocuments />} />
// // // //             <Route path="/list-vehicle" element={<ListYourVehicle />} />
// // // //             <Route path="/my-vehicles" element={<MyVehicles />} />
// // // //             <Route path="/edit-vehicle/:id" element={<EditVehicle />} />
// // // //           </Route>

// // // //           {/* Admin Routes */}
// // // //           <Route
// // // //             path="/admin"
// // // //             element={
// // // //               <ProtectedRoute requiredRole="admin">
// // // //                 <AdminLayout />
// // // //               </ProtectedRoute>
// // // //             }
// // // //           >
// // // //             <Route index element={<Navigate to="/admin/dashboard" replace />} />
// // // //             <Route path="dashboard" element={<AdminDashboard />} />
// // // //             <Route path="inventory" element={<AdminInventory />} />
// // // //             <Route path="revenue" element={<AdminRevenue />} />
// // // //             <Route path="bookings" element={<AdminBookingApproval />} />
// // // //             <Route
// // // //               path="vehicle-verification"
// // // //               element={<AdminVehicleVerification />}
// // // //             />
// // // //             <Route path="messages" element={<AdminMessages />} />
// // // //           </Route>

// // // //           {/* Catch-all - redirect to home or admin dashboard based on role */}
// // // //           <Route
// // // //             path="*"
// // // //             element={
// // // //               isAdmin ? (
// // // //                 <Navigate to="/admin/dashboard" replace />
// // // //               ) : (
// // // //                 <Navigate to="/rentridehome" replace />
// // // //               )
// // // //             }
// // // //           />
// // // //           <Route path="bikes" element={<AdminBikes />} />
// // // //         </Routes>

// // // //         {/* Floating Chat Button - Only show for logged in users (not admins - they have their own chat) */}
// // // //         {isLoggedIn && !isAdmin && <ChatFloatingButton />}
// // // //       </Router>
// // // //     </SocketProvider>
// // // //   );
// // // // }

// // // // export default App;

// // // import {
// // //   BrowserRouter as Router,
// // //   Routes,
// // //   Route,
// // //   Navigate,
// // // } from "react-router-dom";
// // // import Home from "./components/Dashboard/Home";
// // // import Login from "./components/Auth/Login";
// // // import SignUp from "./components/Auth/SignUp";
// // // import RentRideHome from "./components/Dashboard/RentRideHome";
// // // import ProfileDetails from "./components/Profile/Profile.jsx";
// // // import Booking from "./components/Booking/Booking";
// // // import VerifyEmail from "./components/Auth/VerifyEmail";
// // // import UploadDocuments from "./components/Booking/UploadDocuments";
// // // import IdentityVerification from "./components/Booking/IdentityVerification";
// // // import ProtectedRoute from "./components/Auth/ProtectedRoute";

// // // // Admin Components
// // // import AdminLayout from "./components/Admin/AdminLayout";
// // // import AdminDashboard from "./AdminDashboard/AdminDashboard";
// // // import AdminBookingApproval from "./AdminDashboard/AdminBookingApproval";
// // // import AdminInventory from "./AdminDashboard/AdminInventory";
// // // import AdminVehicleVerification from "./AdminDashboard/AdminVehicleVerification";
// // // import AdminMessages from "./AdminDashboard/AdminMessages";
// // // import AdminRevenue from "./AdminDashboard/AdminRevenue";
// // // import AdminBikes from "./AdminDashboard/AdminBikes"; // Add this import

// // // // Vehicle Listing Components
// // // import ListYourVehicle from "./components/Vehicle/ListYourVehicle";
// // // import MyVehicles from "./components/Vehicle/MyVehicles";
// // // import EditVehicle from "./components/Vehicle/EditVehicle";
// // // import VehicleDetails from "./components/Vehicle/VehicleDetails";

// // // // Payment
// // // import PaymentComponent from "./components/Booking/PaymentComponent";
// // // import PaymentSuccess from "./components/Payment/Success";
// // // import PaymentFailure from "./components/Payment/Failure";

// // // // Profile & Auth
// // // import ForgotPassword from "./components/Auth/ForgotPassword";
// // // import ChangePassword from "./components/Auth/ChangePassword";

// // // // Socket
// // // import { SocketProvider } from "./context/SocketContext";

// // // // Import Chat Components
// // // import ChatFloatingButton from "./components/Chat/ChatFloatingButton";

// // // // Bikes
// // // import BikeBooking from "./components/Booking/BikeBooking";

// // // function App() {
// // //   // Check if user is logged in to show chat button
// // //   const isLoggedIn = !!localStorage.getItem("token");

// // //   // Check if user is admin
// // //   const userStr =
// // //     localStorage.getItem("user") || sessionStorage.getItem("user");
// // //   let isAdmin = false;
// // //   try {
// // //     const user = userStr ? JSON.parse(userStr) : null;
// // //     isAdmin = user?.role === "admin";
// // //   } catch (e) {
// // //     console.error("Error parsing user:", e);
// // //   }

// // //   return (
// // //     <SocketProvider>
// // //       <Router>
// // //         <Routes>
// // //           {/* Public Routes */}
// // //           <Route path="/" element={<Home />} />
// // //           <Route path="/Home" element={<Home />} />
// // //           <Route path="/login" element={<Login />} />
// // //           <Route path="/signup" element={<SignUp />} />
// // //           <Route path="/verify-email" element={<VerifyEmail />} />
// // //           <Route path="/payment/:bookingId" element={<PaymentComponent />} />
// // //           <Route path="/payment" element={<PaymentComponent />} />
// // //           <Route path="/payment-success" element={<PaymentSuccess />} />
// // //           <Route path="/payment-failure" element={<PaymentFailure />} />
// // //           <Route path="/vehicle-details/:id" element={<VehicleDetails />} />

// // //           {/* Bike Booking Route - Public (but requires login to book) */}
// // //           <Route path="/bike-booking/:bikeId" element={<BikeBooking />} />

// // //           {/* Protected User Routes */}
// // //           <Route element={<ProtectedRoute />}>
// // //             <Route path="/rentridehome" element={<RentRideHome />} />
// // //             <Route path="/forgot-password" element={<ForgotPassword />} />
// // //             <Route path="/change-password" element={<ChangePassword />} />
// // //             <Route path="/profiledetails" element={<ProfileDetails />} />
// // //             <Route path="/booking" element={<Booking />} />
// // //             <Route path="/booking/:vehicleId" element={<Booking />} />
// // //             <Route
// // //               path="/identity-verification"
// // //               element={<IdentityVerification />}
// // //             />
// // //             <Route path="/upload-documents" element={<UploadDocuments />} />
// // //             <Route path="/list-vehicle" element={<ListYourVehicle />} />
// // //             <Route path="/my-vehicles" element={<MyVehicles />} />
// // //             <Route path="/edit-vehicle/:id" element={<EditVehicle />} />
// // //           </Route>

// // //           {/* Admin Routes */}
// // //           <Route
// // //             path="/admin"
// // //             element={
// // //               <ProtectedRoute requiredRole="admin">
// // //                 <AdminLayout />
// // //               </ProtectedRoute>
// // //             }
// // //           >
// // //             <Route index element={<Navigate to="/admin/dashboard" replace />} />
// // //             <Route path="dashboard" element={<AdminDashboard />} />
// // //             <Route path="inventory" element={<AdminInventory />} />
// // //             <Route path="revenue" element={<AdminRevenue />} />
// // //             <Route path="bookings" element={<AdminBookingApproval />} />
// // //             <Route
// // //               path="vehicle-verification"
// // //               element={<AdminVehicleVerification />}
// // //             />
// // //             <Route path="messages" element={<AdminMessages />} />
// // //             {/* Add Bikes route inside admin layout */}
// // //             <Route path="bikes" element={<AdminBikes />} />
// // //           </Route>

// // //           {/* Catch-all - redirect to home or admin dashboard based on role */}
// // //           <Route
// // //             path="*"
// // //             element={
// // //               isAdmin ? (
// // //                 <Navigate to="/admin/dashboard" replace />
// // //               ) : (
// // //                 <Navigate to="/rentridehome" replace />
// // //               )
// // //             }
// // //           />
// // //         </Routes>

// // //         {/* Floating Chat Button - Only show for logged in users (not admins - they have their own chat) */}
// // //         {isLoggedIn && !isAdmin && <ChatFloatingButton />}
// // //       </Router>
// // //     </SocketProvider>
// // //   );
// // // }

// // // export default App;

// // import {
// //   BrowserRouter as Router,
// //   Routes,
// //   Route,
// //   Navigate,
// // } from "react-router-dom";
// // import Home from "./components/Dashboard/Home";
// // import Login from "./components/Auth/Login";
// // import SignUp from "./components/Auth/SignUp";
// // import RentRideHome from "./components/Dashboard/RentRideHome";
// // import ProfileDetails from "./components/Profile/Profile.jsx";
// // import Booking from "./components/Booking/Booking";
// // import VerifyEmail from "./components/Auth/VerifyEmail";
// // import UploadDocuments from "./components/Booking/UploadDocuments";
// // import IdentityVerification from "./components/Booking/IdentityVerification";
// // import ProtectedRoute from "./components/Auth/ProtectedRoute";

// // // Admin Components
// // import AdminLayout from "./components/Admin/AdminLayout";
// // import AdminDashboard from "./AdminDashboard/AdminDashboard";
// // import AdminBookingApproval from "./AdminDashboard/AdminBookingApproval";
// // import AdminInventory from "./AdminDashboard/AdminInventory";
// // import AdminVehicleVerification from "./AdminDashboard/AdminVehicleVerification";
// // import AdminMessages from "./AdminDashboard/AdminMessages";
// // import AdminRevenue from "./AdminDashboard/AdminRevenue";
// // import AdminBikes from "./AdminDashboard/AdminBikes";
// // import AdminBikeBookings from "./AdminDashboard/AdminBikeBookings"; // ← ADD THIS
// // import AdminReports from "./AdminDashboard/AdminReports"; // ← ADD THIS (if you have it)

// // // Vehicle Listing Components
// // import ListYourVehicle from "./components/Vehicle/ListYourVehicle";
// // import MyVehicles from "./components/Vehicle/MyVehicles";
// // import EditVehicle from "./components/Vehicle/EditVehicle";
// // import VehicleDetails from "./components/Vehicle/VehicleDetails";

// // // Payment
// // import PaymentComponent from "./components/Booking/PaymentComponent";
// // import PaymentSuccess from "./components/Payment/Success";
// // import PaymentFailure from "./components/Payment/Failure";

// // // Profile & Auth
// // import ForgotPassword from "./components/Auth/ForgotPassword";
// // import ChangePassword from "./components/Auth/ChangePassword";

// // // Socket
// // import { SocketProvider } from "./context/SocketContext";

// // // Import Chat Components
// // import ChatFloatingButton from "./components/Chat/ChatFloatingButton";

// // // Bikes
// // import BikeBooking from "./components/Booking/BikeBooking";
// // import BikeUploadDocuments from "./components/Booking/BikeUploadDocuments";

// // function App() {
// //   // Check if user is logged in to show chat button
// //   const isLoggedIn = !!localStorage.getItem("token");

// //   // Check if user is admin
// //   const userStr =
// //     localStorage.getItem("user") || sessionStorage.getItem("user");
// //   let isAdmin = false;
// //   try {
// //     const user = userStr ? JSON.parse(userStr) : null;
// //     isAdmin = user?.role === "admin";
// //   } catch (e) {
// //     console.error("Error parsing user:", e);
// //   }

// //   return (
// //     <SocketProvider>
// //       <Router>
// //         <Routes>
// //           {/* Public Routes */}
// //           <Route path="/" element={<Home />} />
// //           <Route path="/Home" element={<Home />} />
// //           <Route path="/login" element={<Login />} />
// //           <Route path="/signup" element={<SignUp />} />
// //           <Route path="/verify-email" element={<VerifyEmail />} />
// //           <Route path="/payment/:bookingId" element={<PaymentComponent />} />
// //           <Route path="/payment" element={<PaymentComponent />} />
// //           <Route path="/payment-success" element={<PaymentSuccess />} />
// //           <Route path="/payment-failure" element={<PaymentFailure />} />
// //           <Route path="/vehicle-details/:id" element={<VehicleDetails />} />

// //           {/* Bike Booking Routes - Public (but requires login to book) */}
// //           <Route path="/bike-booking/:bikeId" element={<BikeBooking />} />
// //           <Route
// //             path="/bike-upload-documents"
// //             element={<BikeUploadDocuments />}
// //           />

// //           {/* Protected User Routes */}
// //           <Route element={<ProtectedRoute />}>
// //             <Route path="/rentridehome" element={<RentRideHome />} />
// //             <Route path="/forgot-password" element={<ForgotPassword />} />
// //             <Route path="/change-password" element={<ChangePassword />} />
// //             <Route path="/profiledetails" element={<ProfileDetails />} />
// //             <Route path="/booking" element={<Booking />} />
// //             <Route path="/booking/:vehicleId" element={<Booking />} />
// //             <Route
// //               path="/identity-verification"
// //               element={<IdentityVerification />}
// //             />
// //             <Route path="/upload-documents" element={<UploadDocuments />} />
// //             <Route path="/list-vehicle" element={<ListYourVehicle />} />
// //             <Route path="/my-vehicles" element={<MyVehicles />} />
// //             <Route path="/edit-vehicle/:id" element={<EditVehicle />} />
// //           </Route>

// //           {/* Admin Routes */}
// //           <Route
// //             path="/admin"
// //             element={
// //               <ProtectedRoute requiredRole="admin">
// //                 <AdminLayout />
// //               </ProtectedRoute>
// //             }
// //           >
// //             <Route index element={<Navigate to="/admin/dashboard" replace />} />
// //             <Route path="dashboard" element={<AdminDashboard />} />
// //             <Route path="inventory" element={<AdminInventory />} />
// //             <Route path="revenue" element={<AdminRevenue />} />
// //             <Route path="bookings" element={<AdminBookingApproval />} />
// //             <Route
// //               path="vehicle-verification"
// //               element={<AdminVehicleVerification />}
// //             />
// //             <Route path="messages" element={<AdminMessages />} />
// //             <Route path="bikes" element={<AdminBikes />} />
// //             {/* ← ADD BIKE BOOKINGS ROUTE */}
// //             <Route path="bike-bookings" element={<AdminBikeBookings />} />
// //             {/* ← ADD REPORTS ROUTE (if you have it) */}
// //             <Route path="reports" element={<AdminReports />} />
// //           </Route>

// //           {/* Catch-all - redirect to home or admin dashboard based on role */}
// //           <Route
// //             path="*"
// //             element={
// //               isAdmin ? (
// //                 <Navigate to="/admin/dashboard" replace />
// //               ) : (
// //                 <Navigate to="/rentridehome" replace />
// //               )
// //             }
// //           />
// //         </Routes>

// //         {/* Floating Chat Button - Only show for logged in users (not admins - they have their own chat) */}
// //         {isLoggedIn && !isAdmin && <ChatFloatingButton />}
// //       </Router>
// //     </SocketProvider>
// //   );
// // }

// // export default App;

// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import Home from "./components/Dashboard/Home";
// import Login from "./components/Auth/Login";
// import SignUp from "./components/Auth/SignUp";
// import RentRideHome from "./components/Dashboard/RentRideHome";
// import ProfileDetails from "./components/Profile/Profile.jsx";
// import Booking from "./components/Booking/Booking";
// import VerifyEmail from "./components/Auth/VerifyEmail";
// import UploadDocuments from "./components/Booking/UploadDocuments";
// import IdentityVerification from "./components/Booking/IdentityVerification";
// import ProtectedRoute from "./components/Auth/ProtectedRoute";

// // Admin Components
// import AdminLayout from "./components/Admin/AdminLayout";
// import AdminDashboard from "./AdminDashboard/AdminDashboard";
// import AdminBookingApproval from "./AdminDashboard/AdminBookingApproval";
// import AdminInventory from "./AdminDashboard/AdminInventory";
// import AdminVehicleVerification from "./AdminDashboard/AdminVehicleVerification";
// import AdminMessages from "./AdminDashboard/AdminMessages";
// import AdminRevenue from "./AdminDashboard/AdminRevenue";
// import AdminBikes from "./AdminDashboard/AdminBikes";
// import AdminBikeBookings from "./AdminDashboard/AdminBikeBookings";
// import AdminReports from "./AdminDashboard/AdminReports";

// // Vehicle Listing Components
// import ListYourVehicle from "./components/Vehicle/ListYourVehicle";
// import MyVehicles from "./components/Vehicle/MyVehicles";
// import EditVehicle from "./components/Vehicle/EditVehicle";
// import VehicleDetails from "./components/Vehicle/VehicleDetails";

// // Payment
// import PaymentComponent from "./components/Booking/PaymentComponent";
// import PaymentSuccess from "./components/Payment/Success";
// import PaymentFailure from "./components/Payment/Failure";

// // Profile & Auth
// import ForgotPassword from "./components/Auth/ForgotPassword";
// import ChangePassword from "./components/Auth/ChangePassword";

// // Socket
// import { SocketProvider, useSocket } from "./context/SocketContext";

// // Chat
// import ChatFloatingButton from "./components/Chat/ChatFloatingButton";

// // Global toast notifications (works on every page)
// import { GlobalChatToasts } from "./components/Profile/Notification";

// // Bikes
// import BikeBooking from "./components/Booking/BikeBooking";
// import BikeUploadDocuments from "./components/Booking/BikeUploadDocuments";

// // ─── Inner app — needs to be inside SocketProvider to use useSocket ───────────
// const AppInner = () => {
//   const isLoggedIn = !!localStorage.getItem("token");

//   const userStr =
//     localStorage.getItem("user") || sessionStorage.getItem("user");
//   let isAdmin = false;
//   try {
//     const user = userStr ? JSON.parse(userStr) : null;
//     isAdmin = user?.role === "admin";
//   } catch (e) {
//     console.error("Error parsing user:", e);
//   }

//   // Get socket from context so GlobalChatToasts can listen for messages
//   // isConnected is a React state — causes re-render when socket connects
//   // so GlobalChatToasts always gets the live socket, never a stale null
//   const { socket, isConnected } = useSocket();

//   return (
//     <>
//       {/* Global toast + sound — visible on every page for logged-in users */}
//       {/* key={isConnected} forces remount when socket connects so the hook
//           re-registers its event listener with the live socket instance */}
//       {isLoggedIn && !isAdmin && (
//         <GlobalChatToasts
//           key={isConnected ? "connected" : "disconnected"}
//           socket={socket}
//         />
//       )}

//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/Home" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/verify-email" element={<VerifyEmail />} />
//         <Route path="/payment/:bookingId" element={<PaymentComponent />} />
//         <Route path="/payment" element={<PaymentComponent />} />
//         <Route path="/payment-success" element={<PaymentSuccess />} />
//         <Route path="/payment-failure" element={<PaymentFailure />} />
//         <Route path="/vehicle-details/:id" element={<VehicleDetails />} />

//         {/* Bike Booking Routes */}
//         <Route path="/bike-booking/:bikeId" element={<BikeBooking />} />
//         <Route
//           path="/bike-upload-documents"
//           element={<BikeUploadDocuments />}
//         />

//         {/* Protected User Routes */}
//         <Route element={<ProtectedRoute />}>
//           <Route path="/rentridehome" element={<RentRideHome />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/change-password" element={<ChangePassword />} />
//           <Route path="/profiledetails" element={<ProfileDetails />} />
//           <Route path="/booking" element={<Booking />} />
//           <Route path="/booking/:vehicleId" element={<Booking />} />
//           <Route
//             path="/identity-verification"
//             element={<IdentityVerification />}
//           />
//           <Route path="/upload-documents" element={<UploadDocuments />} />
//           <Route path="/list-vehicle" element={<ListYourVehicle />} />
//           <Route path="/my-vehicles" element={<MyVehicles />} />
//           <Route path="/edit-vehicle/:id" element={<EditVehicle />} />
//         </Route>

//         {/* Admin Routes */}
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute requiredRole="admin">
//               <AdminLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route index element={<Navigate to="/admin/dashboard" replace />} />
//           <Route path="dashboard" element={<AdminDashboard />} />
//           <Route path="inventory" element={<AdminInventory />} />
//           <Route path="revenue" element={<AdminRevenue />} />
//           <Route path="bookings" element={<AdminBookingApproval />} />
//           <Route
//             path="vehicle-verification"
//             element={<AdminVehicleVerification />}
//           />
//           <Route path="messages" element={<AdminMessages />} />
//           <Route path="bikes" element={<AdminBikes />} />
//           <Route path="bike-bookings" element={<AdminBikeBookings />} />
//           <Route path="reports" element={<AdminReports />} />
//         </Route>

//         {/* Catch-all */}
//         <Route
//           path="*"
//           element={
//             isAdmin ? (
//               <Navigate to="/admin/dashboard" replace />
//             ) : (
//               <Navigate to="/rentridehome" replace />
//             )
//           }
//         />
//       </Routes>

//       {/* Floating Chat Button - only for logged-in non-admin users */}
//       {isLoggedIn && !isAdmin && <ChatFloatingButton />}
//     </>
//   );
// };

// // ─── Root App — wraps everything in SocketProvider + Router ──────────────────
// function App() {
//   return (
//     <SocketProvider>
//       <Router>
//         <AppInner />
//       </Router>
//     </SocketProvider>
//   );
// }

// export default App;

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
import ProfileDetails from "./components/Profile/Profile.jsx";
import Booking from "./components/Booking/Booking";
import VerifyEmail from "./components/Auth/VerifyEmail";
import UploadDocuments from "./components/Booking/UploadDocuments";
import IdentityVerification from "./components/Booking/IdentityVerification";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

// Admin Components
import AdminLayout from "./components/Admin/AdminLayout";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import AdminBookingApproval from "./AdminDashboard/AdminBookingApproval";
import AdminInventory from "./AdminDashboard/AdminInventory";
import AdminVehicleVerification from "./AdminDashboard/AdminVehicleVerification";
import AdminMessages from "./AdminDashboard/AdminMessages";
import AdminRevenue from "./AdminDashboard/AdminRevenue";
import AdminBikes from "./AdminDashboard/AdminBikes";
import AdminBikeBookings from "./AdminDashboard/AdminBikeBookings";
import AdminReports from "./AdminDashboard/AdminReports";

// Vehicle Listing Components
import ListYourVehicle from "./components/Vehicle/ListYourVehicle";
import MyVehicles from "./components/Vehicle/MyVehicles";
import EditVehicle from "./components/Vehicle/EditVehicle";
import VehicleDetails from "./components/Vehicle/VehicleDetails";

// Payment
import PaymentComponent from "./components/Booking/PaymentComponent";
import PaymentSuccess from "./components/Payment/Success";
import PaymentFailure from "./components/Payment/Failure";

// Profile & Auth
import ForgotPassword from "./components/Auth/ForgotPassword";
import ChangePassword from "./components/Auth/ChangePassword";

// Socket
import { SocketProvider, useSocket } from "./context/SocketContext";

// Chat
import ChatFloatingButton from "./components/Chat/ChatFloatingButton";

// AI Chatbot — floating button, sits above ChatFloatingButton
import AIChatBot from "./components/Chat/AIChatBot";

// Global toast notifications (works on every page)
import { GlobalChatToasts } from "./components/Profile/Notification";

// Bikes
import BikeBooking from "./components/Booking/BikeBooking";
import BikeUploadDocuments from "./components/Booking/BikeUploadDocuments";

// ─── Inner app — needs to be inside SocketProvider to use useSocket ───────────
const AppInner = () => {
  const isLoggedIn = !!localStorage.getItem("token");

  const userStr =
    localStorage.getItem("user") || sessionStorage.getItem("user");
  let isAdmin = false;
  try {
    const user = userStr ? JSON.parse(userStr) : null;
    isAdmin = user?.role === "admin";
  } catch (e) {
    console.error("Error parsing user:", e);
  }

  const { socket, isConnected } = useSocket();

  return (
    <>
      {/* Global toast + sound — visible on every page for logged-in users */}
      {isLoggedIn && !isAdmin && (
        <GlobalChatToasts
          key={isConnected ? "connected" : "disconnected"}
          socket={socket}
        />
      )}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/payment/:bookingId" element={<PaymentComponent />} />
        <Route path="/payment" element={<PaymentComponent />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failure" element={<PaymentFailure />} />
        <Route path="/vehicle-details/:id" element={<VehicleDetails />} />

        {/* Bike Booking Routes */}
        <Route path="/bike-booking/:bikeId" element={<BikeBooking />} />
        <Route
          path="/bike-upload-documents"
          element={<BikeUploadDocuments />}
        />

        {/* Protected User Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/rentridehome" element={<RentRideHome />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/profiledetails" element={<ProfileDetails />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/booking/:vehicleId" element={<Booking />} />
          <Route
            path="/identity-verification"
            element={<IdentityVerification />}
          />
          <Route path="/upload-documents" element={<UploadDocuments />} />
          <Route path="/list-vehicle" element={<ListYourVehicle />} />
          <Route path="/my-vehicles" element={<MyVehicles />} />
          <Route path="/edit-vehicle/:id" element={<EditVehicle />} />
        </Route>

        {/* Admin Routes */}
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
          <Route path="revenue" element={<AdminRevenue />} />
          <Route path="bookings" element={<AdminBookingApproval />} />
          <Route
            path="vehicle-verification"
            element={<AdminVehicleVerification />}
          />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="bikes" element={<AdminBikes />} />
          <Route path="bike-bookings" element={<AdminBikeBookings />} />
          <Route path="reports" element={<AdminReports />} />
        </Route>

        {/* Catch-all */}
        <Route
          path="*"
          element={
            isAdmin ? (
              <Navigate to="/admin/dashboard" replace />
            ) : (
              <Navigate to="/rentridehome" replace />
            )
          }
        />
      </Routes>

      {/*
        ── Floating buttons — bottom-right corner ──────────────────
        ChatFloatingButton  → bottom: 24px  (live human chat)
        AIChatBot           → bottom: 90px  (AI assistant, above it)
        Both hidden for admin users.
      */}
      {isLoggedIn && !isAdmin && (
        <>
          <ChatFloatingButton />
          <AIChatBot />
        </>
      )}
    </>
  );
};

// ─── Root App — wraps everything in SocketProvider + Router ──────────────────
function App() {
  return (
    <SocketProvider>
      <Router>
        <AppInner />
      </Router>
    </SocketProvider>
  );
}

export default App;
