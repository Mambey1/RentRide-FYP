// // // // import React, { useState } from "react";
// // // // import { useEffect } from "react";

// // // // import loginImage from "../../assets/Auth/LoginDriver.png";
// // // // import googleLogo from "../../assets/Auth/google-logo.png";
// // // // import { useNavigate } from "react-router-dom";
// // // // import {
// // // //   FaCar,
// // // //   FaEye,
// // // //   FaEyeSlash,
// // // //   FaLock,
// // // //   FaEnvelope,
// // // //   FaArrowRight,
// // // // } from "react-icons/fa";

// // // // const Login = () => {
// // // //   const [email, setEmail] = useState("");
// // // //   const [password, setPassword] = useState("");
// // // //   const [remember, setRemember] = useState(false);
// // // //   const [error, setError] = useState("");
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [showPassword, setShowPassword] = useState(false);

// // // //   const navigate = useNavigate();
// // // //   useEffect(() => {
// // // //     const token =
// // // //       localStorage.getItem("token") || sessionStorage.getItem("token");

// // // //     if (token) {
// // // //       navigate("/rentridehome", { replace: true });
// // // //     }
// // // //   }, []);

// // // //   const handleLogin = async () => {
// // // //     setError("");
// // // //     setLoading(true);

// // // //     try {
// // // //       const res = await fetch("http://localhost:5000/api/auth/login", {
// // // //         method: "POST",
// // // //         headers: { "Content-Type": "application/json" },
// // // //         body: JSON.stringify({ email, password }),
// // // //       });

// // // //       const data = await res.json();

// // // //       if (!res.ok) {
// // // //         throw new Error(data.message || "Login failed");
// // // //       }

// // // //       // If verification is required (only for regular users)
// // // //       if (data.requiresVerification) {
// // // //         localStorage.setItem("pendingVerificationEmail", email);
// // // //         navigate("/verify-email", {
// // // //           state: { email: email },
// // // //         });
// // // //         return;
// // // //       }

// // // //       const storage = remember ? localStorage : sessionStorage;
// // // //       storage.setItem("token", data.token);
// // // //       storage.setItem("user", JSON.stringify(data.user));

// // // //       // Check if user is admin and redirect to admin dashboard
// // // //       if (data.user.role === "admin") {
// // // //         console.log("Admin login detected, redirecting to admin dashboard");
// // // //         navigate("/admin/dashboard", { replace: true }); // Changed from /admin-dashboard to /admin/dashboard
// // // //       } else {
// // // //         navigate("/rentridehome", { replace: true });
// // // //       }
// // // //     } catch (err) {
// // // //       setError(err.message || "Server not responding");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const handleGoogleLogin = () => {
// // // //     // Implement Google OAuth
// // // //     console.log("Google login clicked");
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
// // // //       {/* Background decorative elements */}
// // // //       <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
// // // //       <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>

// // // //       <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl flex overflow-hidden border border-gray-100 relative z-10 max-h-[80vh]">
// // // //         {/* Left Panel - Login Form */}
// // // //         <div className="w-1/2 px-8 py-6 flex flex-col justify-center relative">
// // // //           {/* Logo/Branding */}
// // // //           <div className="mb-6">
// // // //             <div className="flex items-center gap-3 mb-1">
// // // //               <div className="p-1.5 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-md">
// // // //                 <FaCar className="text-white text-lg" />
// // // //               </div>

// // // //               <h1 className="text-xl font-bold">
// // // //                 Rent<span className="text-blue-600">Ride</span>
// // // //               </h1>
// // // //             </div>
// // // //             <p className="text-gray-500 text-xs">Premium Car Rental</p>
// // // //           </div>

// // // //           <div className="mb-6">
// // // //             <h1 className="text-2xl font-bold text-gray-900 mb-1">
// // // //               Welcome Back
// // // //             </h1>
// // // //             <p className="text-gray-500 text-sm">
// // // //               Enter your credentials to access your account
// // // //             </p>
// // // //           </div>

// // // //           {/* Error Message */}
// // // //           {error && (
// // // //             <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs flex items-center gap-2">
// // // //               <FaLock className="flex-shrink-0 text-xs" />
// // // //               <span>{error}</span>
// // // //             </div>
// // // //           )}

// // // //           {/* Google Login Button */}
// // // //           <button
// // // //             onClick={handleGoogleLogin}
// // // //             className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-xs font-medium mb-6 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2"
// // // //           >
// // // //             <img src={googleLogo} alt="Google" className="w-4 h-4" />
// // // //             <span>Continue with Google</span>
// // // //           </button>

// // // //           {/* Divider */}
// // // //           <div className="flex items-center mb-6">
// // // //             <div className="flex-1 h-px bg-gray-200"></div>
// // // //             <span className="px-3 text-xs text-gray-500">
// // // //               or continue with email
// // // //             </span>
// // // //             <div className="flex-1 h-px bg-gray-200"></div>
// // // //           </div>

// // // //           {/* Email Input */}
// // // //           <div className="mb-4">
// // // //             <label className="block text-xs font-semibold text-gray-700 mb-2">
// // // //               Email Address
// // // //             </label>
// // // //             <div className="relative">
// // // //               <input
// // // //                 type="email"
// // // //                 value={email}
// // // //                 onChange={(e) => setEmail(e.target.value)}
// // // //                 className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200 focus:outline-none transition-all"
// // // //                 placeholder="Enter your email"
// // // //               />
// // // //               <FaEnvelope className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
// // // //             </div>
// // // //           </div>

// // // //           {/* Password Input */}
// // // //           <div className="mb-4">
// // // //             <label className="block text-xs font-semibold text-gray-700 mb-2">
// // // //               Password
// // // //             </label>
// // // //             <div className="relative">
// // // //               <input
// // // //                 type={showPassword ? "text" : "password"}
// // // //                 value={password}
// // // //                 onChange={(e) => setPassword(e.target.value)}
// // // //                 className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200 focus:outline-none transition-all pr-10"
// // // //                 placeholder="Enter your password"
// // // //               />
// // // //               <button
// // // //                 type="button"
// // // //                 onClick={() => setShowPassword(!showPassword)}
// // // //                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
// // // //               >
// // // //                 {showPassword ? (
// // // //                   <FaEyeSlash className="text-sm" />
// // // //                 ) : (
// // // //                   <FaEye className="text-sm" />
// // // //                 )}
// // // //               </button>
// // // //             </div>
// // // //           </div>

// // // //           {/* Remember Me & Forgot Password */}
// // // //           <div className="flex items-center justify-between mb-6">
// // // //             <label
// // // //               htmlFor="remember"
// // // //               className="flex items-center gap-2 cursor-pointer select-none"
// // // //             >
// // // //               <input
// // // //                 type="checkbox"
// // // //                 id="remember"
// // // //                 checked={remember}
// // // //                 onChange={(e) => setRemember(e.target.checked)}
// // // //                 className="sr-only peer"
// // // //               />

// // // //               {/* Custom checkbox */}
// // // //               <div
// // // //                 className="w-4 h-4 border border-gray-300 rounded-sm flex items-center justify-center
// // // //       peer-checked:bg-blue-600 peer-checked:border-blue-600 transition"
// // // //               >
// // // //                 <svg
// // // //                   className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition"
// // // //                   fill="none"
// // // //                   stroke="currentColor"
// // // //                   viewBox="0 0 24 24"
// // // //                 >
// // // //                   <path
// // // //                     strokeLinecap="round"
// // // //                     strokeLinejoin="round"
// // // //                     strokeWidth="3"
// // // //                     d="M5 13l4 4L19 7"
// // // //                   />
// // // //                 </svg>
// // // //               </div>

// // // //               <span className="text-xs text-gray-600">Remember me</span>
// // // //             </label>

// // // //             <button className="text-xs text-blue-600 font-medium hover:text-blue-700 transition-colors">
// // // //               Forgot password?
// // // //             </button>
// // // //           </div>

// // // //           {/* Login Button */}
// // // //           <button
// // // //             onClick={handleLogin}
// // // //             disabled={loading || !email || !password}
// // // //             className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 rounded-lg shadow hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
// // // //           >
// // // //             {loading ? (
// // // //               <span className="flex items-center justify-center gap-2">
// // // //                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
// // // //                 Logging in...
// // // //               </span>
// // // //             ) : (
// // // //               "Login to Account"
// // // //             )}
// // // //           </button>

// // // //           {/* Sign Up Link */}
// // // //           <div className="mt-6 text-center">
// // // //             <p className="text-gray-600 text-xs">
// // // //               Don't have an account?{" "}
// // // //               <button
// // // //                 onClick={() => navigate("/signup")}
// // // //                 className="text-blue-600 font-semibold hover:text-blue-700 transition-colors inline-flex items-center gap-1"
// // // //               >
// // // //                 Sign up now
// // // //               </button>
// // // //             </p>
// // // //           </div>
// // // //         </div>

// // // //         {/* Right Panel - Image */}
// // // //         <div className="w-1/2 relative overflow-hidden">
// // // //           <img
// // // //             src={loginImage}
// // // //             alt="Driving"
// // // //             className="w-full h-full object-cover"
// // // //           />

// // // //           {/* Image Overlay */}
// // // //           <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent"></div>

// // // //           {/* Content on Image */}
// // // //           <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
// // // //             <div className="bg-gradient-to-r from-white/10 to-transparent backdrop-blur-sm rounded-xl p-4 border border-white/20">
// // // //               <h3 className="text-lg font-bold mb-2">Drive Your Dream Car</h3>
// // // //               <p className="text-white/90 text-xs mb-3">
// // // //                 Access premium vehicles with seamless booking
// // // //               </p>
// // // //               <div className="space-y-1">
// // // //                 <div className="flex items-center gap-2">
// // // //                   <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
// // // //                   <span className="text-xs">Instant booking confirmation</span>
// // // //                 </div>
// // // //                 <div className="flex items-center gap-2">
// // // //                   <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
// // // //                   <span className="text-xs">24/7 customer support</span>
// // // //                 </div>
// // // //                 <div className="flex items-center gap-2">
// // // //                   <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
// // // //                   <span className="text-xs">Best price guarantee</span>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           </div>

// // // //           {/* Decorative corner */}
// // // //           <div className="absolute top-4 right-4 bg-gradient-to-br from-blue-600 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
// // // //             <svg
// // // //               className="w-5 h-5 text-white"
// // // //               fill="none"
// // // //               stroke="currentColor"
// // // //               viewBox="0 0 24 24"
// // // //             >
// // // //               <path
// // // //                 strokeLinecap="round"
// // // //                 strokeLinejoin="round"
// // // //                 strokeWidth="2"
// // // //                 d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
// // // //               />
// // // //             </svg>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Login;

// // // import React, { useState } from "react";
// // // import { useEffect } from "react";
// // // import loginImage from "../../assets/Auth/LoginDriver.png";
// // // import googleLogo from "../../assets/Auth/google-logo.png";
// // // import { useNavigate } from "react-router-dom";
// // // import {
// // //   FaCar,
// // //   FaEye,
// // //   FaEyeSlash,
// // //   FaLock,
// // //   FaEnvelope,
// // //   FaArrowRight,
// // // } from "react-icons/fa";
// // // import { toast, ToastContainer } from "react-toastify";
// // // import "react-toastify/dist/ReactToastify.css";

// // // const Login = () => {
// // //   const [email, setEmail] = useState("");
// // //   const [password, setPassword] = useState("");
// // //   const [remember, setRemember] = useState(false);
// // //   const [error, setError] = useState("");
// // //   const [loading, setLoading] = useState(false);
// // //   const [showPassword, setShowPassword] = useState(false);

// // //   const navigate = useNavigate();

// // //   useEffect(() => {
// // //     // Check for existing token on mount
// // //     const token =
// // //       localStorage.getItem("token") || sessionStorage.getItem("token");
// // //     if (token) {
// // //       // Verify token is still valid (optional)
// // //       navigate("/rentridehome", { replace: true });
// // //     }
// // //   }, [navigate]);

// // //   const handleLogin = async () => {
// // //     setError("");
// // //     setLoading(true);

// // //     try {
// // //       const res = await fetch("http://localhost:5000/api/auth/login", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({ email, password }),
// // //       });

// // //       const data = await res.json();

// // //       if (!res.ok) {
// // //         throw new Error(data.message || "Login failed");
// // //       }

// // //       // If verification is required
// // //       if (data.requiresVerification) {
// // //         localStorage.setItem("pendingVerificationEmail", email);
// // //         navigate("/verify-email", {
// // //           state: { email: email },
// // //         });
// // //         return;
// // //       }

// // //       // Store token based on "Remember Me" checkbox
// // //       if (remember) {
// // //         // If remember me is checked - store in localStorage (persists until manually cleared)
// // //         localStorage.setItem("token", data.token);
// // //         localStorage.setItem("user", JSON.stringify(data.user));
// // //         // Also store a flag to know this is a "remember me" session
// // //         localStorage.setItem("rememberMe", "true");
// // //       } else {
// // //         // If remember me is NOT checked - store in sessionStorage (clears when browser closes)
// // //         sessionStorage.setItem("token", data.token);
// // //         sessionStorage.setItem("user", JSON.stringify(data.user));
// // //         // Clear any existing remember me flag
// // //         localStorage.removeItem("rememberMe");
// // //       }

// // //       toast.success("Login successful! Redirecting...");

// // //       // Redirect based on role
// // //       setTimeout(() => {
// // //         if (data.user.role === "admin") {
// // //           navigate("/admin/dashboard", { replace: true });
// // //         } else {
// // //           navigate("/rentridehome", { replace: true });
// // //         }
// // //       }, 1000);
// // //     } catch (err) {
// // //       setError(err.message || "Server not responding");
// // //       toast.error(err.message || "Login failed");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleGoogleLogin = () => {
// // //     // Implement Google OAuth
// // //     console.log("Google login clicked");
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
// // //       <ToastContainer position="top-right" autoClose={3000} />

// // //       {/* Background decorative elements */}
// // //       <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
// // //       <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>

// // //       <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl flex overflow-hidden border border-gray-100 relative z-10 max-h-[80vh]">
// // //         {/* Left Panel - Login Form */}
// // //         <div className="w-1/2 px-8 py-6 flex flex-col justify-center relative">
// // //           {/* Logo/Branding */}
// // //           <div className="mb-6">
// // //             <div className="flex items-center gap-3 mb-1">
// // //               <div className="p-1.5 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-md">
// // //                 <FaCar className="text-white text-lg" />
// // //               </div>
// // //               <h1 className="text-xl font-bold">
// // //                 Rent<span className="text-blue-600">Ride</span>
// // //               </h1>
// // //             </div>
// // //             <p className="text-gray-500 text-xs">Premium Car Rental</p>
// // //           </div>

// // //           <div className="mb-6">
// // //             <h1 className="text-2xl font-bold text-gray-900 mb-1">
// // //               Welcome Back
// // //             </h1>
// // //             <p className="text-gray-500 text-sm">
// // //               Enter your credentials to access your account
// // //             </p>
// // //           </div>

// // //           {/* Error Message */}
// // //           {error && (
// // //             <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs flex items-center gap-2">
// // //               <FaLock className="flex-shrink-0 text-xs" />
// // //               <span>{error}</span>
// // //             </div>
// // //           )}

// // //           {/* Google Login Button */}
// // //           <button
// // //             onClick={handleGoogleLogin}
// // //             className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-xs font-medium mb-6 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2"
// // //           >
// // //             <img src={googleLogo} alt="Google" className="w-4 h-4" />
// // //             <span>Continue with Google</span>
// // //           </button>

// // //           {/* Divider */}
// // //           <div className="flex items-center mb-6">
// // //             <div className="flex-1 h-px bg-gray-200"></div>
// // //             <span className="px-3 text-xs text-gray-500">
// // //               or continue with email
// // //             </span>
// // //             <div className="flex-1 h-px bg-gray-200"></div>
// // //           </div>

// // //           {/* Email Input */}
// // //           <div className="mb-4">
// // //             <label className="block text-xs font-semibold text-gray-700 mb-2">
// // //               Email Address
// // //             </label>
// // //             <div className="relative">
// // //               <input
// // //                 type="email"
// // //                 value={email}
// // //                 onChange={(e) => setEmail(e.target.value)}
// // //                 className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200 focus:outline-none transition-all"
// // //                 placeholder="Enter your email"
// // //               />
// // //               <FaEnvelope className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
// // //             </div>
// // //           </div>

// // //           {/* Password Input */}
// // //           <div className="mb-4">
// // //             <label className="block text-xs font-semibold text-gray-700 mb-2">
// // //               Password
// // //             </label>
// // //             <div className="relative">
// // //               <input
// // //                 type={showPassword ? "text" : "password"}
// // //                 value={password}
// // //                 onChange={(e) => setPassword(e.target.value)}
// // //                 className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200 focus:outline-none transition-all pr-10"
// // //                 placeholder="Enter your password"
// // //               />
// // //               <button
// // //                 type="button"
// // //                 onClick={() => setShowPassword(!showPassword)}
// // //                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
// // //               >
// // //                 {showPassword ? (
// // //                   <FaEyeSlash className="text-sm" />
// // //                 ) : (
// // //                   <FaEye className="text-sm" />
// // //                 )}
// // //               </button>
// // //             </div>
// // //           </div>

// // //           {/* Remember Me & Forgot Password - FIXED CHECKBOX */}
// // //           <div className="flex items-center justify-between mb-6">
// // //             <label className="flex items-center gap-2 cursor-pointer group">
// // //               <input
// // //                 type="checkbox"
// // //                 checked={remember}
// // //                 onChange={(e) => setRemember(e.target.checked)}
// // //                 className="w-4 h-4 accent-blue-600 cursor-pointer"
// // //               />
// // //               <span className="text-xs text-gray-600 select-none">
// // //                 Remember me
// // //               </span>
// // //             </label>

// // //             <button
// // //               onClick={() => navigate("/forgot-password")}
// // //               className="text-xs text-blue-600 font-medium hover:text-blue-700 transition-colors"
// // //             >
// // //               Forgot password?
// // //             </button>
// // //           </div>

// // //           {/* Login Button */}
// // //           <button
// // //             onClick={handleLogin}
// // //             disabled={loading || !email || !password}
// // //             className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 rounded-lg shadow hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
// // //           >
// // //             {loading ? (
// // //               <span className="flex items-center justify-center gap-2">
// // //                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
// // //                 Logging in...
// // //               </span>
// // //             ) : (
// // //               "Login to Account"
// // //             )}
// // //           </button>

// // //           {/* Sign Up Link */}
// // //           <div className="mt-6 text-center">
// // //             <p className="text-gray-600 text-xs">
// // //               Don't have an account?{" "}
// // //               <button
// // //                 onClick={() => navigate("/signup")}
// // //                 className="text-blue-600 font-semibold hover:text-blue-700 transition-colors inline-flex items-center gap-1"
// // //               >
// // //                 Sign up now
// // //               </button>
// // //             </p>
// // //           </div>
// // //         </div>

// // //         {/* Right Panel - Image */}
// // //         <div className="w-1/2 relative overflow-hidden">
// // //           <img
// // //             src={loginImage}
// // //             alt="Driving"
// // //             className="w-full h-full object-cover"
// // //           />

// // //           {/* Image Overlay */}
// // //           <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent"></div>

// // //           {/* Content on Image */}
// // //           <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
// // //             <div className="bg-gradient-to-r from-white/10 to-transparent backdrop-blur-sm rounded-xl p-4 border border-white/20">
// // //               <h3 className="text-lg font-bold mb-2">Drive Your Dream Car</h3>
// // //               <p className="text-white/90 text-xs mb-3">
// // //                 Access premium vehicles with seamless booking
// // //               </p>
// // //               <div className="space-y-1">
// // //                 <div className="flex items-center gap-2">
// // //                   <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
// // //                   <span className="text-xs">Instant booking confirmation</span>
// // //                 </div>
// // //                 <div className="flex items-center gap-2">
// // //                   <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
// // //                   <span className="text-xs">24/7 customer support</span>
// // //                 </div>
// // //                 <div className="flex items-center gap-2">
// // //                   <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
// // //                   <span className="text-xs">Best price guarantee</span>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* Decorative corner */}
// // //           <div className="absolute top-4 right-4 bg-gradient-to-br from-blue-600 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
// // //             <svg
// // //               className="w-5 h-5 text-white"
// // //               fill="none"
// // //               stroke="currentColor"
// // //               viewBox="0 0 24 24"
// // //             >
// // //               <path
// // //                 strokeLinecap="round"
// // //                 strokeLinejoin="round"
// // //                 strokeWidth="2"
// // //                 d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
// // //               />
// // //             </svg>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Login;

// // import React, { useState } from "react";
// // import { useEffect } from "react";
// // import loginImage from "../../assets/Auth/LoginDriver.png";
// // import googleLogo from "../../assets/Auth/google-logo.png";
// // import { useNavigate } from "react-router-dom";
// // import {
// //   FaCar,
// //   FaEye,
// //   FaEyeSlash,
// //   FaLock,
// //   FaEnvelope,
// //   FaArrowRight,
// // } from "react-icons/fa";
// // import { toast, ToastContainer } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";

// // const Login = () => {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [remember, setRemember] = useState(false);
// //   const [error, setError] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [showPassword, setShowPassword] = useState(false);

// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     // Check for existing token on mount
// //     const token =
// //       localStorage.getItem("token") || sessionStorage.getItem("token");
// //     if (token) {
// //       // Verify token is still valid (optional)
// //       navigate("/rentridehome", { replace: true });
// //     }
// //   }, [navigate]);

// //   const handleLogin = async () => {
// //     setError("");
// //     setLoading(true);

// //     try {
// //       const res = await fetch("http://localhost:5000/api/auth/login", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ email, password }),
// //       });

// //       const data = await res.json();

// //       if (!res.ok) {
// //         throw new Error(data.message || "Login failed");
// //       }

// //       // If verification is required
// //       if (data.requiresVerification) {
// //         localStorage.setItem("pendingVerificationEmail", email);
// //         navigate("/verify-email", {
// //           state: { email: email },
// //         });
// //         return;
// //       }

// //       // Store token based on "Remember Me" checkbox
// //       if (remember) {
// //         localStorage.setItem("token", data.token);
// //         localStorage.setItem("user", JSON.stringify(data.user));
// //         localStorage.setItem("rememberMe", "true");
// //       } else {
// //         sessionStorage.setItem("token", data.token);
// //         sessionStorage.setItem("user", JSON.stringify(data.user));
// //         localStorage.removeItem("rememberMe");
// //       }

// //       toast.success("Login successful! Redirecting...");

// //       setTimeout(() => {
// //         if (data.user.role === "admin") {
// //           navigate("/admin/dashboard", { replace: true });
// //         } else {
// //           navigate("/rentridehome", { replace: true });
// //         }
// //       }, 1000);
// //     } catch (err) {
// //       setError(err.message || "Server not responding");
// //       toast.error(err.message || "Login failed");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleGoogleLogin = () => {
// //     console.log("Google login clicked");
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
// //       <ToastContainer position="top-right" autoClose={3000} />

// //       {/* Background decorative elements */}
// //       <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
// //       <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>

// //       <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl flex overflow-hidden border border-gray-100 relative z-10 max-h-[80vh]">
// //         {/* Left Panel - Login Form */}
// //         <div className="w-1/2 px-8 py-6 flex flex-col justify-center relative">
// //           {/* Logo/Branding - UPDATED LIKE PROFILE SIDEBAR AND RENTRIDEHOME */}
// //           <div className="mb-6">
// //             <div className="flex items-center gap-3 mb-1">
// //               <div className="p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
// //                 <FaCar className="text-white text-2xl" />
// //               </div>
// //               <div>
// //                 <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
// //                   Rent<span className="text-gray-800">Ride</span>
// //                 </h1>
// //                 <p className="text-xs text-gray-500 -mt-1">Premium Car Rentals</p>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="mb-6">
// //             <h1 className="text-2xl font-bold text-gray-900 mb-1">
// //               Welcome Back
// //             </h1>
// //             <p className="text-gray-500 text-sm">
// //               Enter your credentials to access your account
// //             </p>
// //           </div>

// //           {/* Error Message */}
// //           {error && (
// //             <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs flex items-center gap-2">
// //               <FaLock className="flex-shrink-0 text-xs" />
// //               <span>{error}</span>
// //             </div>
// //           )}

// //           {/* Google Login Button */}
// //           <button
// //             onClick={handleGoogleLogin}
// //             className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-xs font-medium mb-6 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2"
// //           >
// //             <img src={googleLogo} alt="Google" className="w-4 h-4" />
// //             <span>Continue with Google</span>
// //           </button>

// //           {/* Divider */}
// //           <div className="flex items-center mb-6">
// //             <div className="flex-1 h-px bg-gray-200"></div>
// //             <span className="px-3 text-xs text-gray-500">
// //               or continue with email
// //             </span>
// //             <div className="flex-1 h-px bg-gray-200"></div>
// //           </div>

// //           {/* Email Input */}
// //           <div className="mb-4">
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

// //           {/* Password Input */}
// //           <div className="mb-4">
// //             <label className="block text-xs font-semibold text-gray-700 mb-2">
// //               Password
// //             </label>
// //             <div className="relative">
// //               <input
// //                 type={showPassword ? "text" : "password"}
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200 focus:outline-none transition-all pr-10"
// //                 placeholder="Enter your password"
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
// //           </div>

// //           {/* Remember Me & Forgot Password */}
// //           <div className="flex items-center justify-between mb-6">
// //             <label className="flex items-center gap-2 cursor-pointer group">
// //               <input
// //                 type="checkbox"
// //                 checked={remember}
// //                 onChange={(e) => setRemember(e.target.checked)}
// //                 className="w-4 h-4 accent-blue-600 cursor-pointer"
// //               />
// //               <span className="text-xs text-gray-600 select-none">
// //                 Remember me
// //               </span>
// //             </label>

// //             <button
// //               onClick={() => navigate("/forgot-password")}
// //               className="text-xs text-blue-600 font-medium hover:text-blue-700 transition-colors"
// //             >
// //               Forgot password?
// //             </button>
// //           </div>

// //           {/* Login Button */}
// //           <button
// //             onClick={handleLogin}
// //             disabled={loading || !email || !password}
// //             className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 rounded-lg shadow hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
// //           >
// //             {loading ? (
// //               <span className="flex items-center justify-center gap-2">
// //                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
// //                 Logging in...
// //               </span>
// //             ) : (
// //               "Login to Account"
// //             )}
// //           </button>

// //           {/* Sign Up Link */}
// //           <div className="mt-6 text-center">
// //             <p className="text-gray-600 text-xs">
// //               Don't have an account?{" "}
// //               <button
// //                 onClick={() => navigate("/signup")}
// //                 className="text-blue-600 font-semibold hover:text-blue-700 transition-colors inline-flex items-center gap-1"
// //               >
// //                 Sign up now
// //               </button>
// //             </p>
// //           </div>
// //         </div>

// //         {/* Right Panel - Image */}
// //         <div className="w-1/2 relative overflow-hidden">
// //           <img
// //             src={loginImage}
// //             alt="Driving"
// //             className="w-full h-full object-cover"
// //           />

// //           {/* Image Overlay */}
// //           <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent"></div>

// //           {/* Content on Image */}
// //           <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
// //             <div className="bg-gradient-to-r from-white/10 to-transparent backdrop-blur-sm rounded-xl p-4 border border-white/20">
// //               <h3 className="text-lg font-bold mb-2">Drive Your Dream Car</h3>
// //               <p className="text-white/90 text-xs mb-3">
// //                 Access premium vehicles with seamless booking
// //               </p>
// //               <div className="space-y-1">
// //                 <div className="flex items-center gap-2">
// //                   <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
// //                   <span className="text-xs">Instant booking confirmation</span>
// //                 </div>
// //                 <div className="flex items-center gap-2">
// //                   <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
// //                   <span className="text-xs">24/7 customer support</span>
// //                 </div>
// //                 <div className="flex items-center gap-2">
// //                   <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
// //                   <span className="text-xs">Best price guarantee</span>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Decorative corner */}
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

// // export default Login;\\\\\

// import React, { useState } from "react";
// import { useEffect } from "react";
// import loginImage from "../../assets/Auth/LoginDriver.png";
// import googleLogo from "../../assets/Auth/google-logo.png";
// import { useNavigate } from "react-router-dom";
// import {
//   FaCar,
//   FaEye,
//   FaEyeSlash,
//   FaLock,
//   FaEnvelope,
//   FaArrowRight,
// } from "react-icons/fa";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [remember, setRemember] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check for existing token on mount
//     const token =
//       localStorage.getItem("token") || sessionStorage.getItem("token");
//     if (token) {
//       // Verify token is still valid (optional)
//       navigate("/rentridehome", { replace: true });
//     }
//   }, [navigate]);

//   const handleLogin = async () => {
//     setError("");
//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         // Check if user is blocked
//         if (data.isBlocked) {
//           toast.error(
//             data.message ||
//               "Your account has been blocked. Please contact support.",
//           );
//           setError(
//             data.message ||
//               "Your account has been blocked. Please contact support.",
//           );
//           setLoading(false);
//           return;
//         }
//         throw new Error(data.message || "Login failed");
//       }

//       // If verification is required
//       if (data.requiresVerification) {
//         localStorage.setItem("pendingVerificationEmail", email);
//         navigate("/verify-email", {
//           state: { email: email },
//         });
//         return;
//       }

//       // Check if user is blocked from the response
//       if (data.user && data.user.isBlocked) {
//         toast.error("Your account has been blocked. Please contact support.");
//         setError("Your account has been blocked. Please contact support.");
//         setLoading(false);
//         return;
//       }

//       // Store token based on "Remember Me" checkbox
//       if (remember) {
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("user", JSON.stringify(data.user));
//         localStorage.setItem("rememberMe", "true");
//       } else {
//         sessionStorage.setItem("token", data.token);
//         sessionStorage.setItem("user", JSON.stringify(data.user));
//         localStorage.removeItem("rememberMe");
//       }

//       toast.success("Login successful! Redirecting...");

//       setTimeout(() => {
//         if (data.user.role === "admin") {
//           navigate("/admin/dashboard", { replace: true });
//         } else {
//           navigate("/rentridehome", { replace: true });
//         }
//       }, 1000);
//     } catch (err) {
//       setError(err.message || "Server not responding");
//       toast.error(err.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

// const handleGoogleLogin = () => {
//   // Prevent multiple redirects
//   if (loading) return;
//   setLoading(true);
//   window.location.href = "http://localhost:5000/api/auth/google";
// };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
//       <ToastContainer position="top-right" autoClose={3000} />

//       {/* Background decorative elements */}
//       <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
//       <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>

//       <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl flex overflow-hidden border border-gray-100 relative z-10 max-h-[80vh]">
//         {/* Left Panel - Login Form */}
//         <div className="w-1/2 px-8 py-6 flex flex-col justify-center relative">
//           {/* Logo/Branding - UPDATED LIKE PROFILE SIDEBAR AND RENTRIDEHOME */}
//           <div className="mb-6">
//             <div className="flex items-center gap-3 mb-1">
//               <div className="p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
//                 <FaCar className="text-white text-2xl" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                   Rent<span className="text-gray-800">Ride</span>
//                 </h1>
//                 <p className="text-xs text-gray-500 -mt-1">
//                   Premium Car Rentals
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="mb-6">
//             <h1 className="text-2xl font-bold text-gray-900 mb-1">
//               Welcome Back
//             </h1>
//             <p className="text-gray-500 text-sm">
//               Enter your credentials to access your account
//             </p>
//           </div>

//           {/* Error Message */}
//           {error && (
//             <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs flex items-center gap-2">
//               <FaLock className="flex-shrink-0 text-xs" />
//               <span>{error}</span>
//             </div>
//           )}

//           {/* Google Login Button */}
//           <button
//             onClick={handleGoogleLogin}
//             className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-xs font-medium mb-6 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2"
//           >
//             <img src={googleLogo} alt="Google" className="w-4 h-4" />
//             <span>Continue with Google</span>
//           </button>

//           {/* Divider */}
//           <div className="flex items-center mb-6">
//             <div className="flex-1 h-px bg-gray-200"></div>
//             <span className="px-3 text-xs text-gray-500">
//               or continue with email
//             </span>
//             <div className="flex-1 h-px bg-gray-200"></div>
//           </div>

//           {/* Email Input */}
//           <div className="mb-4">
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

//           {/* Password Input */}
//           <div className="mb-4">
//             <label className="block text-xs font-semibold text-gray-700 mb-2">
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200 focus:outline-none transition-all pr-10"
//                 placeholder="Enter your password"
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
//           </div>

//           {/* Remember Me & Forgot Password */}
//           <div className="flex items-center justify-between mb-6">
//             <label className="flex items-center gap-2 cursor-pointer group">
//               <input
//                 type="checkbox"
//                 checked={remember}
//                 onChange={(e) => setRemember(e.target.checked)}
//                 className="w-4 h-4 accent-blue-600 cursor-pointer"
//               />
//               <span className="text-xs text-gray-600 select-none">
//                 Remember me
//               </span>
//             </label>

//             <button
//               onClick={() => navigate("/forgot-password")}
//               className="text-xs text-blue-600 font-medium hover:text-blue-700 transition-colors"
//             >
//               Forgot password?
//             </button>
//           </div>

//           {/* Login Button */}
//           <button
//             onClick={handleLogin}
//             disabled={loading || !email || !password}
//             className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 rounded-lg shadow hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
//           >
//             {loading ? (
//               <span className="flex items-center justify-center gap-2">
//                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                 Logging in...
//               </span>
//             ) : (
//               "Login to Account"
//             )}
//           </button>

//           {/* Sign Up Link */}
//           <div className="mt-6 text-center">
//             <p className="text-gray-600 text-xs">
//               Don't have an account?{" "}
//               <button
//                 onClick={() => navigate("/signup")}
//                 className="text-blue-600 font-semibold hover:text-blue-700 transition-colors inline-flex items-center gap-1"
//               >
//                 Sign up now
//               </button>
//             </p>
//           </div>
//         </div>

//         {/* Right Panel - Image */}
//         <div className="w-1/2 relative overflow-hidden">
//           <img
//             src={loginImage}
//             alt="Driving"
//             className="w-full h-full object-cover"
//           />

//           {/* Image Overlay */}
//           <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent"></div>

//           {/* Content on Image */}
//           <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
//             <div className="bg-gradient-to-r from-white/10 to-transparent backdrop-blur-sm rounded-xl p-4 border border-white/20">
//               <h3 className="text-lg font-bold mb-2">Drive Your Dream Car</h3>
//               <p className="text-white/90 text-xs mb-3">
//                 Access premium vehicles with seamless booking
//               </p>
//               <div className="space-y-1">
//                 <div className="flex items-center gap-2">
//                   <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
//                   <span className="text-xs">Instant booking confirmation</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
//                   <span className="text-xs">24/7 customer support</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
//                   <span className="text-xs">Best price guarantee</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Decorative corner */}
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

// export default Login;



import React, { useState, useEffect } from "react";
import loginImage from "../../assets/Auth/LoginDriver.png";
import googleLogo from "../../assets/Auth/google-logo.png";
import { useNavigate } from "react-router-dom";
import {
  FaCar,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaEnvelope,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      navigate("/rentridehome", { replace: true });
    }
  }, []); // ← FIXED: empty array, was [navigate] which caused infinite loop

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.isBlocked) {
          toast.error(
            data.message ||
              "Your account has been blocked. Please contact support."
          );
          setError(
            data.message ||
              "Your account has been blocked. Please contact support."
          );
          setLoading(false);
          return;
        }
        throw new Error(data.message || "Login failed");
      }

      if (data.requiresVerification) {
        localStorage.setItem("pendingVerificationEmail", email);
        navigate("/verify-email", { state: { email: email } });
        return;
      }

      if (data.user && data.user.isBlocked) {
        toast.error("Your account has been blocked. Please contact support.");
        setError("Your account has been blocked. Please contact support.");
        setLoading(false);
        return;
      }

      if (remember) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("rememberMe", "true");
      } else {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("user", JSON.stringify(data.user));
        localStorage.removeItem("rememberMe");
      }

      toast.success("Login successful! Redirecting...");

      setTimeout(() => {
        if (data.user.role === "admin") {
          navigate("/admin/dashboard", { replace: true });
        } else {
          navigate("/rentridehome", { replace: true });
        }
      }, 1000);
    } catch (err) {
      setError(err.message || "Server not responding");
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ── Google Login ──────────────────────────────────────────────
  const handleGoogleLogin = () => {
    window.location.replace("http://localhost:5000/api/auth/google");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>

      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl flex overflow-hidden border border-gray-100 relative z-10 max-h-[80vh]">
        {/* Left Panel */}
        <div className="w-1/2 px-8 py-6 flex flex-col justify-center relative">
          {/* Logo */}
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

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome Back</h1>
            <p className="text-gray-500 text-sm">
              Enter your credentials to access your account
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs flex items-center gap-2">
              <FaLock className="flex-shrink-0 text-xs" />
              <span>{error}</span>
            </div>
          )}

          {/* Google Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-xs font-medium mb-6 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <img src={googleLogo} alt="Google" className="w-4 h-4" />
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center mb-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="px-3 text-xs text-gray-500">or continue with email</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Email */}
          <div className="mb-4">
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
          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200 focus:outline-none transition-all pr-10"
                placeholder="Enter your password"
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
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 accent-blue-600 cursor-pointer"
              />
              <span className="text-xs text-gray-600 select-none">Remember me</span>
            </label>
            <button
              onClick={() => navigate("/forgot-password")}
              className="text-xs text-blue-600 font-medium hover:text-blue-700 transition-colors"
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading || !email || !password}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 rounded-lg shadow hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Logging in...
              </span>
            ) : (
              "Login to Account"
            )}
          </button>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-xs">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                Sign up now
              </button>
            </p>
          </div>
        </div>

        {/* Right Panel - Image */}
        <div className="w-1/2 relative overflow-hidden">
          <img
            src={loginImage}
            alt="Driving"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="bg-gradient-to-r from-white/10 to-transparent backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <h3 className="text-lg font-bold mb-2">Drive Your Dream Car</h3>
              <p className="text-white/90 text-xs mb-3">
                Access premium vehicles with seamless booking
              </p>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  <span className="text-xs">Instant booking confirmation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  <span className="text-xs">24/7 customer support</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  <span className="text-xs">Best price guarantee</span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-4 right-4 bg-gradient-to-br from-blue-600 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

export default Login;