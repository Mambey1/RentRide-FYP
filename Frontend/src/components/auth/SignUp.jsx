// // // export default SignUp;
// // import React, { useState } from "react";
// // import signupImage from "../../assets/Auth/LoginDriver.png";
// // import googleLogo from "../../assets/Auth/google-logo.png";
// // import { useNavigate } from "react-router-dom";
// // import {
// //   FaCar,
// //   FaEye,
// //   FaEyeSlash,
// //   FaUser,
// //   FaEnvelope,
// //   FaLock,
// //   FaCheck,
// //   FaTimes,
// // } from "react-icons/fa";
// // import { ToastContainer, toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";

// // const SignUp = () => {
// //   const [name, setName] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [agree, setAgree] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [passwordValidation, setPasswordValidation] = useState({
// //     length: false,
// //     uppercase: false,
// //     lowercase: false,
// //     number: false,
// //   });

// //   const navigate = useNavigate();

// //   // Password validation function
// //   const validatePassword = (pass) => {
// //     const validations = {
// //       length: pass.length >= 8,
// //       uppercase: /[A-Z]/.test(pass),
// //       lowercase: /[a-z]/.test(pass),
// //       number: /[0-9]/.test(pass),
// //     };
// //     setPasswordValidation(validations);
// //     return (
// //       validations.length &&
// //       validations.uppercase &&
// //       validations.lowercase &&
// //       validations.number
// //     );
// //   };

// //   const handlePasswordChange = (value) => {
// //     setPassword(value);
// //     validatePassword(value);
// //   };

// //   const handleSignup = async () => {
// //     // Validation
// //     if (!name || name.trim().length < 3) {
// //       toast.error("Name must be at least 3 characters long");
// //       return;
// //     }

// //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //     if (!emailRegex.test(email)) {
// //       toast.error("Please enter a valid email address");
// //       return;
// //     }

// //     if (!validatePassword(password)) {
// //       toast.error("Password must meet all requirements");
// //       return;
// //     }

// //     if (!agree) {
// //       toast.error("You must agree to the terms & policy");
// //       return;
// //     }

// //     setLoading(true);

// //     try {
// //       const res = await fetch("http://localhost:5000/api/auth/signup", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ name, email, password }),
// //       });

// //       const data = await res.json();

// //       if (!res.ok) {
// //         throw new Error(data.message || "Signup failed");
// //       }

// //       // If verification is required (new flow)
// //       if (data.requiresVerification) {
// //         toast.success("Registration successful! Check your email for OTP.");

// //         // Store email for verification page
// //         localStorage.setItem("pendingVerificationEmail", email);

// //         // Navigate to verification page after delay
// //         setTimeout(() => {
// //           navigate("/verify-email", {
// //             state: {
// //               email: email,
// //               fromSignup: true,
// //             },
// //           });
// //         }, 1500);

// //         return;
// //       }

// //       // Legacy flow (if backend doesn't require verification)
// //       toast.success("Account created successfully!");
// //       setTimeout(() => {
// //         navigate("/login");
// //       }, 1500);
// //     } catch (err) {
// //       toast.error(err.message || "Server not responding");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
// //       <ToastContainer
// //         position="top-right"
// //         autoClose={3000}
// //         hideProgressBar={false}
// //         newestOnTop
// //         closeOnClick
// //         rtl={false}
// //         pauseOnFocusLoss
// //         draggable
// //         pauseOnHover
// //         theme="light"
// //       />

// //       {/* Background blobs */}
// //       <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
// //       <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-200 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>

// //       {/* Main Container - Reduced height and made scrollable */}
// //       <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl flex overflow-hidden border border-gray-100 relative z-10 h-[85vh]">
// //         {/* Left Panel - Scrollable */}
// //         <div className="w-1/2 px-8 py-6 flex flex-col overflow-y-auto">
// //           {/* Logo */}
// //           <div className="mb-6">
// //             <div className="flex items-center gap-3 mb-1">
// //               <div className="p-1.5 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-md">
// //                 <FaCar className="text-white text-lg" />
// //               </div>
// //               <h1 className="text-xl font-bold">
// //                 Rent<span className="text-blue-600">Ride</span>
// //               </h1>
// //             </div>
// //             <p className="text-gray-500 text-xs">Premium Car Rental</p>
// //           </div>

// //           <div className="mb-4">
// //             <h1 className="text-2xl font-bold text-gray-900 mb-1">
// //               Create Account
// //             </h1>
// //             <p className="text-gray-500 text-sm">
// //               Sign up to start your journey
// //             </p>
// //           </div>

// //           {/* Google Signup */}
// //           <button className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-xs font-medium mb-4 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2">
// //             <img src={googleLogo} alt="Google" className="w-4 h-4" />
// //             Continue with Google
// //           </button>

// //           {/* Divider */}
// //           <div className="flex items-center mb-4">
// //             <div className="flex-1 h-px bg-gray-200"></div>
// //             <span className="px-3 text-xs text-gray-500">
// //               or sign up with email
// //             </span>
// //             <div className="flex-1 h-px bg-gray-200"></div>
// //           </div>

// //           {/* Name */}
// //           <div className="mb-3">
// //             <label className="block text-xs font-semibold text-gray-700 mb-2">
// //               Full Name
// //             </label>
// //             <div className="relative">
// //               <input
// //                 type="text"
// //                 value={name}
// //                 onChange={(e) => setName(e.target.value)}
// //                 className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200 focus:outline-none transition-all"
// //                 placeholder="Enter your full name"
// //               />
// //               <FaUser className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
// //             </div>
// //           </div>

// //           {/* Email */}
// //           <div className="mb-3">
// //             <label className="block text-xs font-semibold text-gray-700 mb-2">
// //               Email Address
// //             </label>
// //             <div className="relative">
// //               <input
// //                 type="email"
// //                 value={email}
// //                 onChange={(e) => setEmail(e.target.value)}
// //                 className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200 focus:outline-none transition-all"
// //                 placeholder="Enter your email"
// //               />
// //               <FaEnvelope className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
// //             </div>
// //           </div>

// //           {/* Password */}
// //           <div className="mb-3">
// //             <label className="block text-xs font-semibold text-gray-700 mb-2">
// //               Password
// //             </label>
// //             <div className="relative">
// //               <input
// //                 type={showPassword ? "text" : "password"}
// //                 value={password}
// //                 onChange={(e) => handlePasswordChange(e.target.value)}
// //                 className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200 focus:outline-none transition-all pr-10"
// //                 placeholder="Create a secure password"
// //               />
// //               <button
// //                 type="button"
// //                 onClick={() => setShowPassword(!showPassword)}
// //                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
// //               >
// //                 {showPassword ? (
// //                   <FaEyeSlash className="text-sm" />
// //                 ) : (
// //                   <FaEye className="text-sm" />
// //                 )}
// //               </button>
// //             </div>

// //             {/* Password Requirements - Compact */}
// //             <div className="mt-2">
// //               <p className="text-xs font-medium text-gray-700 mb-1">
// //                 Password must contain:
// //               </p>
// //               <div className="grid grid-cols-2 gap-1">
// //                 <div className="flex items-center gap-1">
// //                   {passwordValidation.length ? (
// //                     <FaCheck className="text-green-500 text-xs" />
// //                   ) : (
// //                     <FaTimes className="text-red-400 text-xs" />
// //                   )}
// //                   <span
// //                     className={`text-xs ${passwordValidation.length ? "text-green-600" : "text-gray-500"}`}
// //                   >
// //                     8+ characters
// //                   </span>
// //                 </div>
// //                 <div className="flex items-center gap-1">
// //                   {passwordValidation.uppercase ? (
// //                     <FaCheck className="text-green-500 text-xs" />
// //                   ) : (
// //                     <FaTimes className="text-red-400 text-xs" />
// //                   )}
// //                   <span
// //                     className={`text-xs ${passwordValidation.uppercase ? "text-green-600" : "text-gray-500"}`}
// //                   >
// //                     Uppercase
// //                   </span>
// //                 </div>
// //                 <div className="flex items-center gap-1">
// //                   {passwordValidation.lowercase ? (
// //                     <FaCheck className="text-green-500 text-xs" />
// //                   ) : (
// //                     <FaTimes className="text-red-400 text-xs" />
// //                   )}
// //                   <span
// //                     className={`text-xs ${passwordValidation.lowercase ? "text-green-600" : "text-gray-500"}`}
// //                   >
// //                     Lowercase
// //                   </span>
// //                 </div>
// //                 <div className="flex items-center gap-1">
// //                   {passwordValidation.number ? (
// //                     <FaCheck className="text-green-500 text-xs" />
// //                   ) : (
// //                     <FaTimes className="text-red-400 text-xs" />
// //                   )}
// //                   <span
// //                     className={`text-xs ${passwordValidation.number ? "text-green-600" : "text-gray-500"}`}
// //                   >
// //                     Number
// //                   </span>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Terms - Compact */}
// //           <div className="mb-4">
// //             <label className="flex items-start gap-2 cursor-pointer">
// //               <div className="flex items-center h-5 mt-0.5">
// //                 <input
// //                   type="checkbox"
// //                   checked={agree}
// //                   onChange={(e) => setAgree(e.target.checked)}
// //                   className="sr-only peer"
// //                 />
// //                 <div
// //                   className="w-4 h-4 border border-gray-300 rounded-sm flex items-center justify-center
// //                   peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all duration-200"
// //                 >
// //                   {agree && (
// //                     <svg
// //                       className="w-3 h-3 text-white"
// //                       fill="none"
// //                       stroke="currentColor"
// //                       viewBox="0 0 24 24"
// //                     >
// //                       <path
// //                         strokeLinecap="round"
// //                         strokeLinejoin="round"
// //                         strokeWidth="3"
// //                         d="M5 13l4 4L19 7"
// //                       />
// //                     </svg>
// //                   )}
// //                 </div>
// //               </div>
// //               <span className="text-xs text-gray-600 leading-tight">
// //                 I agree to the{" "}
// //                 <button className="text-blue-600 font-medium hover:text-blue-700">
// //                   Terms
// //                 </button>{" "}
// //                 and{" "}
// //                 <button className="text-blue-600 font-medium hover:text-blue-700">
// //                   Privacy
// //                 </button>
// //               </span>
// //             </label>
// //           </div>

// //           {/* Signup Button */}
// //           <button
// //             onClick={handleSignup}
// //             disabled={loading}
// //             className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800
// //               text-white font-semibold py-2.5 rounded-lg shadow hover:shadow-md transition-all duration-200
// //               disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2 mb-4"
// //           >
// //             {loading ? (
// //               <>
// //                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
// //                 Creating Account...
// //               </>
// //             ) : (
// //               "Create Account"
// //             )}
// //           </button>

// //           {/* Login Link */}
// //           <div className="text-center mb-4">
// //             <p className="text-gray-600 text-xs">
// //               Already have an account?{" "}
// //               <button
// //                 onClick={() => navigate("/login")}
// //                 className="text-blue-600 font-semibold hover:text-blue-700"
// //               >
// //                 Sign in here
// //               </button>
// //             </p>
// //           </div>

// //           {/* Email Verification Notice - Compact */}
// //           <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
// //             <div className="flex items-start gap-2">
// //               <FaEnvelope className="text-blue-600 text-sm mt-0.5 flex-shrink-0" />
// //               <div>
// //                 <p className="text-xs font-medium text-gray-900">
// //                   Email Verification Required
// //                 </p>
// //                 <p className="text-xs text-gray-600">
// //                   You'll receive a 6-digit OTP to verify your email
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Right Panel - Image */}
// //         <div className="w-1/2 relative overflow-hidden">
// //           <img
// //             src={signupImage}
// //             alt="Driving"
// //             className="w-full h-full object-cover"
// //           />

// //           {/* Image Overlay */}
// //           <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent"></div>

// //           {/* Content on Image */}
// //           <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
// //             <div className="bg-gradient-to-r from-white/10 to-transparent backdrop-blur-sm rounded-xl p-4 border border-white/20">
// //               <h3 className="text-lg font-bold mb-2">Why Verify Your Email?</h3>
// //               <p className="text-white/90 text-xs mb-3">
// //                 Email verification ensures the security of your account
// //               </p>

// //               <div className="space-y-1">
// //                 <div className="flex items-center gap-2">
// //                   <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
// //                   <span className="text-xs">Secure account recovery</span>
// //                 </div>
// //                 <div className="flex items-center gap-2">
// //                   <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
// //                   <span className="text-xs">Booking confirmations</span>
// //                 </div>
// //                 <div className="flex items-center gap-2">
// //                   <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
// //                   <span className="text-xs">Premium features access</span>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Decorative Corner */}
// //           <div className="absolute top-4 right-4 bg-gradient-to-br from-blue-600 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
// //             <svg
// //               className="w-5 h-5 text-white"
// //               fill="none"
// //               stroke="currentColor"
// //               viewBox="0 0 24 24"
// //             >
// //               <path
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //                 strokeWidth="2"
// //                 d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
// //               />
// //             </svg>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SignUp;
// import React, { useState } from "react";
// import signupImage from "../../assets/Auth/LoginDriver.png";
// import googleLogo from "../../assets/Auth/google-logo.png";
// import { useNavigate } from "react-router-dom";
// import {
//   FaCar,
//   FaEye,
//   FaEyeSlash,
//   FaUser,
//   FaEnvelope,
//   FaLock,
//   FaCheck,
//   FaTimes,
// } from "react-icons/fa";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const SignUp = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [agree, setAgree] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [passwordValidation, setPasswordValidation] = useState({
//     length: false,
//     uppercase: false,
//     lowercase: false,
//     number: false,
//   });

//   const navigate = useNavigate();

//   // Password validation function
//   const validatePassword = (pass) => {
//     const validations = {
//       length: pass.length >= 8,
//       uppercase: /[A-Z]/.test(pass),
//       lowercase: /[a-z]/.test(pass),
//       number: /[0-9]/.test(pass),
//     };
//     setPasswordValidation(validations);
//     return (
//       validations.length &&
//       validations.uppercase &&
//       validations.lowercase &&
//       validations.number
//     );
//   };

//   const handlePasswordChange = (value) => {
//     setPassword(value);
//     validatePassword(value);
//   };

//   const handleSignup = async () => {
//     // Validation
//     if (!name || name.trim().length < 3) {
//       toast.error("Name must be at least 3 characters long");
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       toast.error("Please enter a valid email address");
//       return;
//     }

//     if (!validatePassword(password)) {
//       toast.error("Password must meet all requirements");
//       return;
//     }

//     if (!agree) {
//       toast.error("You must agree to the terms & policy");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:5000/api/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Signup failed");
//       }

//       // If verification is required
//       if (data.requiresVerification) {
//         toast.success("Registration successful! Check your email for OTP.");

//         // Store email for verification page
//         localStorage.setItem("pendingVerificationEmail", email);

//         setTimeout(() => {
//           navigate("/verify-email", {
//             state: {
//               email: email,
//               fromSignup: true,
//             },
//           });
//         }, 1500);
//         return;
//       }

//       // Legacy flow
//       toast.success("Account created successfully!");
//       setTimeout(() => {
//         navigate("/login");
//       }, 1500);
//     } catch (err) {
//       toast.error(err.message || "Server not responding");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />

//       {/* Background blobs */}
//       <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
//       <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-200 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>

//       {/* Main Container */}
//       <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl flex overflow-hidden border border-gray-100 relative z-10 h-[85vh]">
//         {/* Left Panel - Scrollable */}
//         <div className="w-1/2 px-8 py-6 flex flex-col overflow-y-auto">
//           {/* Logo */}
//           <div className="mb-6">
//             <div className="flex items-center gap-3 mb-1">
//               <div className="p-1.5 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-md">
//                 <FaCar className="text-white text-lg" />
//               </div>
//               <h1 className="text-xl font-bold">
//                 Rent<span className="text-blue-600">Ride</span>
//               </h1>
//             </div>
//             <p className="text-gray-500 text-xs">Premium Car Rental</p>
//           </div>

//           <div className="mb-4">
//             <h1 className="text-2xl font-bold text-gray-900 mb-1">
//               Create Account
//             </h1>
//             <p className="text-gray-500 text-sm">
//               Sign up to start your journey
//             </p>
//           </div>

//           {/* Google Signup */}
//           <button className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-xs font-medium mb-4 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2">
//             <img src={googleLogo} alt="Google" className="w-4 h-4" />
//             Continue with Google
//           </button>

//           {/* Divider */}
//           <div className="flex items-center mb-4">
//             <div className="flex-1 h-px bg-gray-200"></div>
//             <span className="px-3 text-xs text-gray-500">
//               or sign up with email
//             </span>
//             <div className="flex-1 h-px bg-gray-200"></div>
//           </div>

//           {/* Name */}
//           <div className="mb-3">
//             <label className="block text-xs font-semibold text-gray-700 mb-2">
//               Full Name
//             </label>
//             <div className="relative">
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200 focus:outline-none transition-all"
//                 placeholder="Enter your full name"
//               />
//               <FaUser className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
//             </div>
//           </div>

//           {/* Email */}
//           <div className="mb-3">
//             <label className="block text-xs font-semibold text-gray-700 mb-2">
//               Email Address
//             </label>
//             <div className="relative">
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200 focus:outline-none transition-all"
//                 placeholder="Enter your email"
//               />
//               <FaEnvelope className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
//             </div>
//           </div>

//           {/* Password */}
//           <div className="mb-3">
//             <label className="block text-xs font-semibold text-gray-700 mb-2">
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 value={password}
//                 onChange={(e) => handlePasswordChange(e.target.value)}
//                 className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200 focus:outline-none transition-all pr-10"
//                 placeholder="Create a secure password"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
//               >
//                 {showPassword ? (
//                   <FaEyeSlash className="text-sm" />
//                 ) : (
//                   <FaEye className="text-sm" />
//                 )}
//               </button>
//             </div>

//             {/* Password Requirements */}
//             <div className="mt-2">
//               <p className="text-xs font-medium text-gray-700 mb-1">
//                 Password must contain:
//               </p>
//               <div className="grid grid-cols-2 gap-1">
//                 <div className="flex items-center gap-1">
//                   {passwordValidation.length ? (
//                     <FaCheck className="text-green-500 text-xs" />
//                   ) : (
//                     <FaTimes className="text-red-400 text-xs" />
//                   )}
//                   <span
//                     className={`text-xs ${passwordValidation.length ? "text-green-600" : "text-gray-500"}`}
//                   >
//                     8+ characters
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   {passwordValidation.uppercase ? (
//                     <FaCheck className="text-green-500 text-xs" />
//                   ) : (
//                     <FaTimes className="text-red-400 text-xs" />
//                   )}
//                   <span
//                     className={`text-xs ${passwordValidation.uppercase ? "text-green-600" : "text-gray-500"}`}
//                   >
//                     Uppercase
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   {passwordValidation.lowercase ? (
//                     <FaCheck className="text-green-500 text-xs" />
//                   ) : (
//                     <FaTimes className="text-red-400 text-xs" />
//                   )}
//                   <span
//                     className={`text-xs ${passwordValidation.lowercase ? "text-green-600" : "text-gray-500"}`}
//                   >
//                     Lowercase
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   {passwordValidation.number ? (
//                     <FaCheck className="text-green-500 text-xs" />
//                   ) : (
//                     <FaTimes className="text-red-400 text-xs" />
//                   )}
//                   <span
//                     className={`text-xs ${passwordValidation.number ? "text-green-600" : "text-gray-500"}`}
//                   >
//                     Number
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Terms - FIXED CHECKBOX */}
//           <div className="mb-4">
//             <label className="flex items-start gap-2 cursor-pointer group">
//               <input
//                 type="checkbox"
//                 checked={agree}
//                 onChange={(e) => setAgree(e.target.checked)}
//                 className="w-4 h-4 mt-0.5 accent-blue-600 cursor-pointer"
//               />
//               <span className="text-xs text-gray-600 leading-tight select-none">
//                 I agree to the{" "}
//                 <button className="text-blue-600 font-medium hover:text-blue-700">
//                   Terms of Service
//                 </button>{" "}
//                 and{" "}
//                 <button className="text-blue-600 font-medium hover:text-blue-700">
//                   Privacy Policy
//                 </button>
//               </span>
//             </label>
//           </div>

//           {/* Signup Button */}
//           <button
//             onClick={handleSignup}
//             disabled={loading}
//             className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 
//               text-white font-semibold py-2.5 rounded-lg shadow hover:shadow-md transition-all duration-200 
//               disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2 mb-4"
//           >
//             {loading ? (
//               <>
//                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                 Creating Account...
//               </>
//             ) : (
//               "Create Account"
//             )}
//           </button>

//           {/* Login Link */}
//           <div className="text-center mb-4">
//             <p className="text-gray-600 text-xs">
//               Already have an account?{" "}
//               <button
//                 onClick={() => navigate("/login")}
//                 className="text-blue-600 font-semibold hover:text-blue-700"
//               >
//                 Sign in here
//               </button>
//             </p>
//           </div>

//           {/* Email Verification Notice */}
//           <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
//             <div className="flex items-start gap-2">
//               <FaEnvelope className="text-blue-600 text-sm mt-0.5 flex-shrink-0" />
//               <div>
//                 <p className="text-xs font-medium text-gray-900">
//                   Email Verification Required
//                 </p>
//                 <p className="text-xs text-gray-600">
//                   You'll receive a 6-digit OTP to verify your email
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Panel - Image */}
//         <div className="w-1/2 relative overflow-hidden">
//           <img
//             src={signupImage}
//             alt="Driving"
//             className="w-full h-full object-cover"
//           />

//           {/* Image Overlay */}
//           <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent"></div>

//           {/* Content on Image */}
//           <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
//             <div className="bg-gradient-to-r from-white/10 to-transparent backdrop-blur-sm rounded-xl p-4 border border-white/20">
//               <h3 className="text-lg font-bold mb-2">Why Verify Your Email?</h3>
//               <p className="text-white/90 text-xs mb-3">
//                 Email verification ensures the security of your account
//               </p>

//               <div className="space-y-1">
//                 <div className="flex items-center gap-2">
//                   <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
//                   <span className="text-xs">Secure account recovery</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
//                   <span className="text-xs">Booking confirmations</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
//                   <span className="text-xs">Premium features access</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Decorative Corner */}
//           <div className="absolute top-4 right-4 bg-gradient-to-br from-blue-600 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
//             <svg
//               className="w-5 h-5 text-white"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
//               />
//             </svg>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;





import React, { useState } from "react";
import signupImage from "../../assets/Auth/LoginDriver.png";
import googleLogo from "../../assets/Auth/google-logo.png";
import { useNavigate } from "react-router-dom";
import {
  FaCar,
  FaEye,
  FaEyeSlash,
  FaUser,
  FaEnvelope,
  FaLock,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
  });

  const navigate = useNavigate();

  const validatePassword = (pass) => {
    const validations = {
      length: pass.length >= 8,
      uppercase: /[A-Z]/.test(pass),
      lowercase: /[a-z]/.test(pass),
      number: /[0-9]/.test(pass),
    };
    setPasswordValidation(validations);
    return (
      validations.length &&
      validations.uppercase &&
      validations.lowercase &&
      validations.number
    );
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    validatePassword(value);
  };

  const handleSignup = async () => {
    if (!name || name.trim().length < 3) {
      toast.error("Name must be at least 3 characters long");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!validatePassword(password)) {
      toast.error("Password must meet all requirements");
      return;
    }

    if (!agree) {
      toast.error("You must agree to the terms & policy");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      if (data.requiresVerification) {
        toast.success("Registration successful! Check your email for OTP.");
        localStorage.setItem("pendingVerificationEmail", email);
        setTimeout(() => {
          navigate("/verify-email", {
            state: {
              email: email,
              fromSignup: true,
            },
          });
        }, 1500);
        return;
      }

      toast.success("Account created successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      toast.error(err.message || "Server not responding");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-200 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>

      {/* Main Container */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl flex overflow-hidden border border-gray-100 relative z-10 h-[85vh]">
        {/* Left Panel - Scrollable */}
        <div className="w-1/2 px-8 py-6 flex flex-col overflow-y-auto">
          {/* Logo - UPDATED LIKE PROFILE SIDEBAR AND RENTRIDEHOME */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
                <FaCar className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Rent<span className="text-gray-800">Ride</span>
                </h1>
                <p className="text-xs text-gray-500 -mt-1">Premium Car Rentals</p>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Create Account
            </h1>
            <p className="text-gray-500 text-sm">
              Sign up to start your journey
            </p>
          </div>

          {/* Google Signup */}
          <button className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-xs font-medium mb-4 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2">
            <img src={googleLogo} alt="Google" className="w-4 h-4" />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center mb-4">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="px-3 text-xs text-gray-500">
              or sign up with email
            </span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Name */}
          <div className="mb-3">
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200 focus:outline-none transition-all"
                placeholder="Enter your full name"
              />
              <FaUser className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            </div>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200 focus:outline-none transition-all"
                placeholder="Enter your email"
              />
              <FaEnvelope className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            </div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200 focus:outline-none transition-all pr-10"
                placeholder="Create a secure password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
              >
                {showPassword ? (
                  <FaEyeSlash className="text-sm" />
                ) : (
                  <FaEye className="text-sm" />
                )}
              </button>
            </div>

            {/* Password Requirements */}
            <div className="mt-2">
              <p className="text-xs font-medium text-gray-700 mb-1">
                Password must contain:
              </p>
              <div className="grid grid-cols-2 gap-1">
                <div className="flex items-center gap-1">
                  {passwordValidation.length ? (
                    <FaCheck className="text-green-500 text-xs" />
                  ) : (
                    <FaTimes className="text-red-400 text-xs" />
                  )}
                  <span
                    className={`text-xs ${passwordValidation.length ? "text-green-600" : "text-gray-500"}`}
                  >
                    8+ characters
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {passwordValidation.uppercase ? (
                    <FaCheck className="text-green-500 text-xs" />
                  ) : (
                    <FaTimes className="text-red-400 text-xs" />
                  )}
                  <span
                    className={`text-xs ${passwordValidation.uppercase ? "text-green-600" : "text-gray-500"}`}
                  >
                    Uppercase
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {passwordValidation.lowercase ? (
                    <FaCheck className="text-green-500 text-xs" />
                  ) : (
                    <FaTimes className="text-red-400 text-xs" />
                  )}
                  <span
                    className={`text-xs ${passwordValidation.lowercase ? "text-green-600" : "text-gray-500"}`}
                  >
                    Lowercase
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {passwordValidation.number ? (
                    <FaCheck className="text-green-500 text-xs" />
                  ) : (
                    <FaTimes className="text-red-400 text-xs" />
                  )}
                  <span
                    className={`text-xs ${passwordValidation.number ? "text-green-600" : "text-gray-500"}`}
                  >
                    Number
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="mb-4">
            <label className="flex items-start gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="w-4 h-4 mt-0.5 accent-blue-600 cursor-pointer"
              />
              <span className="text-xs text-gray-600 leading-tight select-none">
                I agree to the{" "}
                <button className="text-blue-600 font-medium hover:text-blue-700">
                  Terms of Service
                </button>{" "}
                and{" "}
                <button className="text-blue-600 font-medium hover:text-blue-700">
                  Privacy Policy
                </button>
              </span>
            </label>
          </div>

          {/* Signup Button */}
          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 
              text-white font-semibold py-2.5 rounded-lg shadow hover:shadow-md transition-all duration-200 
              disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2 mb-4"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>

          {/* Login Link */}
          <div className="text-center mb-4">
            <p className="text-gray-600 text-xs">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-blue-600 font-semibold hover:text-blue-700"
              >
                Sign in here
              </button>
            </p>
          </div>

          {/* Email Verification Notice */}
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-start gap-2">
              <FaEnvelope className="text-blue-600 text-sm mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-gray-900">
                  Email Verification Required
                </p>
                <p className="text-xs text-gray-600">
                  You'll receive a 6-digit OTP to verify your email
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Image */}
        <div className="w-1/2 relative overflow-hidden">
          <img
            src={signupImage}
            alt="Driving"
            className="w-full h-full object-cover"
          />

          {/* Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent"></div>

          {/* Content on Image */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="bg-gradient-to-r from-white/10 to-transparent backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <h3 className="text-lg font-bold mb-2">Why Verify Your Email?</h3>
              <p className="text-white/90 text-xs mb-3">
                Email verification ensures the security of your account
              </p>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  <span className="text-xs">Secure account recovery</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  <span className="text-xs">Booking confirmations</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  <span className="text-xs">Premium features access</span>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Corner */}
          <div className="absolute top-4 right-4 bg-gradient-to-br from-blue-600 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;