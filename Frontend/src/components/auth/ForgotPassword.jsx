// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import {
// //   FaEnvelope,
// //   FaArrowLeft,
// //   FaSpinner,
// //   FaCheckCircle,
// //   FaKey,
// //   FaShieldAlt,
// //   FaEye,
// //   FaEyeSlash,
// //   FaUnlockAlt,
// // } from "react-icons/fa";
// // import { motion, AnimatePresence } from "framer-motion";

// // const ForgotPassword = () => {
// //   const navigate = useNavigate();
// //   const [step, setStep] = useState(1); // 1: Email, 2: OTP & New Password
// //   const [email, setEmail] = useState("");
// //   const [otp, setOtp] = useState("");
// //   const [newPassword, setNewPassword] = useState("");
// //   const [confirmPassword, setConfirmPassword] = useState("");
// //   const [showPasswords, setShowPasswords] = useState({
// //     new: false,
// //     confirm: false,
// //   });
// //   const [loading, setLoading] = useState(false);
// //   const [message, setMessage] = useState("");
// //   const [error, setError] = useState("");
// //   const [passwordStrength, setPasswordStrength] = useState({
// //     score: 0,
// //     message: "",
// //   });

// //   const togglePasswordVisibility = (field) => {
// //     setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
// //   };

// //   const checkPasswordStrength = (password) => {
// //     let score = 0;
// //     if (password.length >= 6) score++;
// //     if (password.length >= 8) score++;
// //     if (/[A-Z]/.test(password)) score++;
// //     if (/[0-9]/.test(password)) score++;
// //     if (/[^A-Za-z0-9]/.test(password)) score++;

// //     let msg = "";
// //     if (score <= 2) msg = "Weak password";
// //     else if (score <= 4) msg = "Medium password";
// //     else msg = "Strong password";

// //     setPasswordStrength({ score, message: msg });
// //   };

// //   const getStrengthColor = () => {
// //     if (passwordStrength.score <= 2) return "bg-red-500";
// //     if (passwordStrength.score <= 4) return "bg-yellow-500";
// //     return "bg-green-500";
// //   };

// //   const getStrengthWidth = () => `${(passwordStrength.score / 5) * 100}%`;

// //   const handleSendOTP = async (e) => {
// //     e.preventDefault();
// //     if (!email) {
// //       setError("Please enter your email address");
// //       return;
// //     }
// //     setLoading(true);
// //     setError("");
// //     setMessage("");
// //     try {
// //       const response = await axios.post(
// //         "http://localhost:5000/api/auth/forgot-password",
// //         { email },
// //       );
// //       if (response.data.success) {
// //         setMessage(response.data.message);
// //         setStep(2);
// //       } else setError(response.data.message);
// //     } catch (err) {
// //       setError(
// //         err.response?.data?.message || "Failed to send OTP. Please try again.",
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleResetPassword = async (e) => {
// //     e.preventDefault();
// //     if (!otp) {
// //       setError("Please enter the OTP");
// //       return;
// //     }
// //     if (newPassword.length < 6) {
// //       setError("Password must be at least 6 characters long");
// //       return;
// //     }
// //     if (newPassword !== confirmPassword) {
// //       setError("Passwords do not match");
// //       return;
// //     }
// //     setLoading(true);
// //     setError("");
// //     setMessage("");
// //     try {
// //       const response = await axios.post(
// //         "http://localhost:5000/api/auth/reset-password",
// //         { email, otp, newPassword },
// //       );
// //       if (response.data.success) {
// //         setMessage(response.data.message);
// //         setTimeout(() => navigate("/login"), 3000);
// //       } else setError(response.data.message);
// //     } catch (err) {
// //       setError(
// //         err.response?.data?.message ||
// //           "Failed to reset password. Please try again.",
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4">
// //       <motion.div
// //         initial={{ opacity: 0, y: 20 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.5 }}
// //         className="max-w-md w-full"
// //       >
// //         <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
// //           {/* Gradient Header */}
// //           <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
// //             <div className="flex items-center justify-center mb-4">
// //               <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
// //                 {step === 1 ? (
// //                   <FaEnvelope className="text-white text-3xl" />
// //                 ) : (
// //                   <FaUnlockAlt className="text-white text-3xl" />
// //                 )}
// //               </div>
// //             </div>
// //             <h1 className="text-2xl font-bold text-white text-center">
// //               {step === 1 ? "Forgot Password?" : "Reset Password"}
// //             </h1>
// //             <p className="text-blue-100 text-center mt-2 text-sm">
// //               {step === 1
// //                 ? "Enter your email and we'll send you an OTP to reset your password."
// //                 : `Enter the OTP sent to ${email} and set your new password.`}
// //             </p>

// //             {/* Step indicator dots */}
// //             <div className="flex items-center justify-center gap-2 mt-4">
// //               <div
// //                 className={`h-2 rounded-full transition-all duration-300 ${step === 1 ? "w-6 bg-white" : "w-2 bg-white/40"}`}
// //               />
// //               <div
// //                 className={`h-2 rounded-full transition-all duration-300 ${step === 2 ? "w-6 bg-white" : "w-2 bg-white/40"}`}
// //               />
// //             </div>
// //           </div>

// //           {/* Step 1: Email */}
// //           <AnimatePresence mode="wait">
// //             {step === 1 && (
// //               <motion.form
// //                 key="step1"
// //                 initial={{ opacity: 0, x: -20 }}
// //                 animate={{ opacity: 1, x: 0 }}
// //                 exit={{ opacity: 0, x: 20 }}
// //                 transition={{ duration: 0.3 }}
// //                 onSubmit={handleSendOTP}
// //                 className="p-8 space-y-6"
// //               >
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Email Address
// //                   </label>
// //                   <div className="relative">
// //                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                       <FaEnvelope className="text-gray-400" />
// //                     </div>
// //                     <input
// //                       type="email"
// //                       value={email}
// //                       onChange={(e) => {
// //                         setEmail(e.target.value);
// //                         setError("");
// //                       }}
// //                       className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
// //                       placeholder="your@email.com"
// //                       required
// //                     />
// //                   </div>
// //                 </div>

// //                 <AnimatePresence>
// //                   {error && (
// //                     <motion.div
// //                       initial={{ opacity: 0, y: -10 }}
// //                       animate={{ opacity: 1, y: 0 }}
// //                       exit={{ opacity: 0, y: -10 }}
// //                       className="p-3 bg-red-50 border border-red-200 rounded-lg"
// //                     >
// //                       <p className="text-red-600 text-sm">{error}</p>
// //                     </motion.div>
// //                   )}
// //                 </AnimatePresence>

// //                 <AnimatePresence>
// //                   {message && (
// //                     <motion.div
// //                       initial={{ opacity: 0, scale: 0.95 }}
// //                       animate={{ opacity: 1, scale: 1 }}
// //                       exit={{ opacity: 0, scale: 0.95 }}
// //                       className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2"
// //                     >
// //                       <FaCheckCircle className="text-green-600" />
// //                       <p className="text-green-600 text-sm">{message}</p>
// //                     </motion.div>
// //                   )}
// //                 </AnimatePresence>

// //                 <div className="flex gap-3 pt-2">
// //                   <button
// //                     type="button"
// //                     onClick={() => navigate("/login")}
// //                     className="flex-1 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 flex items-center justify-center gap-2"
// //                   >
// //                     <FaArrowLeft size={16} />
// //                     Back
// //                   </button>
// //                   <button
// //                     type="submit"
// //                     disabled={loading}
// //                     className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
// //                   >
// //                     {loading ? (
// //                       <>
// //                         <FaSpinner className="animate-spin" /> Sending...
// //                       </>
// //                     ) : (
// //                       <>
// //                         <FaEnvelope /> Send OTP
// //                       </>
// //                     )}
// //                   </button>
// //                 </div>
// //               </motion.form>
// //             )}

// //             {/* Step 2: OTP + New Password */}
// //             {step === 2 && (
// //               <motion.form
// //                 key="step2"
// //                 initial={{ opacity: 0, x: 20 }}
// //                 animate={{ opacity: 1, x: 0 }}
// //                 exit={{ opacity: 0, x: -20 }}
// //                 transition={{ duration: 0.3 }}
// //                 onSubmit={handleResetPassword}
// //                 className="p-8 space-y-6"
// //               >
// //                 {/* OTP */}
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     OTP Code
// //                   </label>
// //                   <div className="relative">
// //                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                       <FaKey className="text-gray-400" />
// //                     </div>
// //                     <input
// //                       type="text"
// //                       value={otp}
// //                       onChange={(e) => {
// //                         setOtp(e.target.value);
// //                         setError("");
// //                       }}
// //                       className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all tracking-widest font-mono"
// //                       placeholder="Enter 6-digit OTP"
// //                       maxLength="6"
// //                       required
// //                     />
// //                   </div>
// //                 </div>

// //                 {/* New Password */}
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     New Password
// //                   </label>
// //                   <div className="relative">
// //                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                       <FaUnlockAlt className="text-gray-400" />
// //                     </div>
// //                     <input
// //                       type={showPasswords.new ? "text" : "password"}
// //                       value={newPassword}
// //                       onChange={(e) => {
// //                         setNewPassword(e.target.value);
// //                         checkPasswordStrength(e.target.value);
// //                         setError("");
// //                       }}
// //                       className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
// //                       placeholder="Minimum 6 characters"
// //                       required
// //                     />
// //                     <button
// //                       type="button"
// //                       onClick={() => togglePasswordVisibility("new")}
// //                       className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition"
// //                     >
// //                       {showPasswords.new ? <FaEyeSlash /> : <FaEye />}
// //                     </button>
// //                   </div>

// //                   {newPassword && (
// //                     <motion.div
// //                       initial={{ opacity: 0, height: 0 }}
// //                       animate={{ opacity: 1, height: "auto" }}
// //                       className="mt-3"
// //                     >
// //                       <div className="flex justify-between items-center mb-1">
// //                         <span className="text-xs text-gray-500">
// //                           Password strength:
// //                         </span>
// //                         <span
// //                           className={`text-xs font-medium ${passwordStrength.score <= 2 ? "text-red-600" : passwordStrength.score <= 4 ? "text-yellow-600" : "text-green-600"}`}
// //                         >
// //                           {passwordStrength.message}
// //                         </span>
// //                       </div>
// //                       <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
// //                         <motion.div
// //                           initial={{ width: 0 }}
// //                           animate={{ width: getStrengthWidth() }}
// //                           transition={{ duration: 0.3 }}
// //                           className={`h-full ${getStrengthColor()} rounded-full`}
// //                         />
// //                       </div>
// //                       <div className="mt-2 text-xs text-gray-500">
// //                         <p>Tips for a strong password:</p>
// //                         <ul className="list-disc list-inside ml-2 mt-1 space-y-0.5">
// //                           <li>At least 8 characters</li>
// //                           <li>Include uppercase letters</li>
// //                           <li>Include numbers</li>
// //                           <li>Include special characters</li>
// //                         </ul>
// //                       </div>
// //                     </motion.div>
// //                   )}
// //                 </div>

// //                 {/* Confirm Password */}
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Confirm New Password
// //                   </label>
// //                   <div className="relative">
// //                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                       <FaShieldAlt className="text-gray-400" />
// //                     </div>
// //                     <input
// //                       type={showPasswords.confirm ? "text" : "password"}
// //                       value={confirmPassword}
// //                       onChange={(e) => {
// //                         setConfirmPassword(e.target.value);
// //                         setError("");
// //                       }}
// //                       className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
// //                       placeholder="Confirm your new password"
// //                       required
// //                     />
// //                     <button
// //                       type="button"
// //                       onClick={() => togglePasswordVisibility("confirm")}
// //                       className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition"
// //                     >
// //                       {showPasswords.confirm ? <FaEyeSlash /> : <FaEye />}
// //                     </button>
// //                   </div>
// //                   {confirmPassword && newPassword !== confirmPassword && (
// //                     <motion.p
// //                       initial={{ opacity: 0 }}
// //                       animate={{ opacity: 1 }}
// //                       className="text-red-500 text-xs mt-1"
// //                     >
// //                       Passwords do not match
// //                     </motion.p>
// //                   )}
// //                   {confirmPassword &&
// //                     newPassword === confirmPassword &&
// //                     newPassword && (
// //                       <motion.p
// //                         initial={{ opacity: 0 }}
// //                         animate={{ opacity: 1 }}
// //                         className="text-green-500 text-xs mt-1 flex items-center gap-1"
// //                       >
// //                         <FaCheckCircle size={10} /> Passwords match
// //                       </motion.p>
// //                     )}
// //                 </div>

// //                 <AnimatePresence>
// //                   {error && (
// //                     <motion.div
// //                       initial={{ opacity: 0, y: -10 }}
// //                       animate={{ opacity: 1, y: 0 }}
// //                       exit={{ opacity: 0, y: -10 }}
// //                       className="p-3 bg-red-50 border border-red-200 rounded-lg"
// //                     >
// //                       <p className="text-red-600 text-sm">{error}</p>
// //                     </motion.div>
// //                   )}
// //                 </AnimatePresence>

// //                 <AnimatePresence>
// //                   {message && (
// //                     <motion.div
// //                       initial={{ opacity: 0, scale: 0.95 }}
// //                       animate={{ opacity: 1, scale: 1 }}
// //                       exit={{ opacity: 0, scale: 0.95 }}
// //                       className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2"
// //                     >
// //                       <FaCheckCircle className="text-green-600" />
// //                       <p className="text-green-600 text-sm">{message}</p>
// //                     </motion.div>
// //                   )}
// //                 </AnimatePresence>

// //                 <div className="flex gap-3 pt-2">
// //                   <button
// //                     type="button"
// //                     onClick={() => {
// //                       setStep(1);
// //                       setError("");
// //                       setMessage("");
// //                     }}
// //                     className="flex-1 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 flex items-center justify-center gap-2"
// //                   >
// //                     <FaArrowLeft size={16} />
// //                     Back
// //                   </button>
// //                   <button
// //                     type="submit"
// //                     disabled={loading}
// //                     className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
// //                   >
// //                     {loading ? (
// //                       <>
// //                         <FaSpinner className="animate-spin" /> Resetting...
// //                       </>
// //                     ) : (
// //                       <>
// //                         <FaKey /> Reset Password
// //                       </>
// //                     )}
// //                   </button>
// //                 </div>
// //               </motion.form>
// //             )}
// //           </AnimatePresence>

// //           {/* Footer */}
// //           <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
// //             <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
// //               <FaShieldAlt />
// //               <span>Your password is encrypted and never shared</span>
// //             </div>
// //           </div>
// //         </div>
// //       </motion.div>
// //     </div>
// //   );
// // };

// // export default ForgotPassword;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   FaEnvelope,
//   FaArrowLeft,
//   FaSpinner,
//   FaCheckCircle,
//   FaKey,
//   FaShieldAlt,
//   FaEye,
//   FaEyeSlash,
//   FaUnlockAlt,
// } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";

// const ForgotPassword = () => {
//   const navigate = useNavigate();
//   const [step, setStep] = useState(1);
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPasswords, setShowPasswords] = useState({
//     new: false,
//     confirm: false,
//   });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [passwordStrength, setPasswordStrength] = useState({
//     score: 0,
//     message: "",
//   });

//   // ✅ Smart back: go to profile if logged in, otherwise go to login
//   const isLoggedIn = !!(
//     localStorage.getItem("token") || sessionStorage.getItem("token")
//   );
//   const backDestination = isLoggedIn ? "/profiledetails" : "/login";

//   const togglePasswordVisibility = (field) => {
//     setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
//   };

//   const checkPasswordStrength = (password) => {
//     let score = 0;
//     if (password.length >= 6) score++;
//     if (password.length >= 8) score++;
//     if (/[A-Z]/.test(password)) score++;
//     if (/[0-9]/.test(password)) score++;
//     if (/[^A-Za-z0-9]/.test(password)) score++;

//     let msg = "";
//     if (score <= 2) msg = "Weak password";
//     else if (score <= 4) msg = "Medium password";
//     else msg = "Strong password";

//     setPasswordStrength({ score, message: msg });
//   };

//   const getStrengthColor = () => {
//     if (passwordStrength.score <= 2) return "bg-red-500";
//     if (passwordStrength.score <= 4) return "bg-yellow-500";
//     return "bg-green-500";
//   };

//   const getStrengthWidth = () => `${(passwordStrength.score / 5) * 100}%`;

//   const handleSendOTP = async (e) => {
//     e.preventDefault();
//     if (!email) {
//       setError("Please enter your email address");
//       return;
//     }
//     setLoading(true);
//     setError("");
//     setMessage("");
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/forgot-password",
//         { email },
//       );
//       if (response.data.success) {
//         setMessage(response.data.message);
//         setStep(2);
//       } else setError(response.data.message);
//     } catch (err) {
//       setError(
//         err.response?.data?.message || "Failed to send OTP. Please try again.",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResetPassword = async (e) => {
//     e.preventDefault();
//     if (!otp) {
//       setError("Please enter the OTP");
//       return;
//     }
//     if (newPassword.length < 6) {
//       setError("Password must be at least 6 characters long");
//       return;
//     }
//     if (newPassword !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }
//     setLoading(true);
//     setError("");
//     setMessage("");
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/reset-password",
//         { email, otp, newPassword },
//       );
//       if (response.data.success) {
//         setMessage(response.data.message);

//         setTimeout(() => navigate("/login"), 3000);

//         // ✅ Also redirects to the smart destination after reset
//         setTimeout(() => navigate(backDestination), 3000);

//       } else setError(response.data.message);
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//           "Failed to reset password. Please try again.",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="max-w-md w-full"
//       >
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
//           {/* Gradient Header */}

//           <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
// =======
//           <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 relative">
//             {/* Back icon in header */}
//             <button
//               type="button"
//               onClick={() => {
//                 if (step === 1) {
//                   navigate(backDestination);
//                 } else {
//                   setStep(1);
//                   setError("");
//                   setMessage("");
//                 }
//               }}
//               className="absolute top-4 left-4 p-2 text-white/70 hover:text-white hover:bg-white/20 rounded-full transition-all duration-200"
//             >
//               <FaArrowLeft size={18} />
//             </button>

//             <div className="flex items-center justify-center mb-4">
//               <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
//                 {step === 1 ? (
//                   <FaEnvelope className="text-white text-3xl" />
//                 ) : (
//                   <FaUnlockAlt className="text-white text-3xl" />
//                 )}
//               </div>
//             </div>
//             <h1 className="text-2xl font-bold text-white text-center">
//               {step === 1 ? "Forgot Password?" : "Reset Password"}
//             </h1>
//             <p className="text-blue-100 text-center mt-2 text-sm">
//               {step === 1
//                 ? "Enter your email and we'll send you an OTP to reset your password."
//                 : `Enter the OTP sent to ${email} and set your new password.`}
//             </p>

//             {/* Step indicator dots */}
//             <div className="flex items-center justify-center gap-2 mt-4">
//               <div
//                 className={`h-2 rounded-full transition-all duration-300 ${step === 1 ? "w-6 bg-white" : "w-2 bg-white/40"}`}
//               />
//               <div
//                 className={`h-2 rounded-full transition-all duration-300 ${step === 2 ? "w-6 bg-white" : "w-2 bg-white/40"}`}
//               />
//             </div>
//           </div>

//           {/* Step 1: Email */}
//           <AnimatePresence mode="wait">
//             {step === 1 && (
//               <motion.form
//                 key="step1"
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: 20 }}
//                 transition={{ duration: 0.3 }}
//                 onSubmit={handleSendOTP}
//                 className="p-8 space-y-6"
//               >
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Email Address
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <FaEnvelope className="text-gray-400" />
//                     </div>
//                     <input
//                       type="email"
//                       value={email}
//                       onChange={(e) => {
//                         setEmail(e.target.value);
//                         setError("");
//                       }}
//                       className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                       placeholder="your@email.com"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <AnimatePresence>
//                   {error && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       className="p-3 bg-red-50 border border-red-200 rounded-lg"
//                     >
//                       <p className="text-red-600 text-sm">{error}</p>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>

//                 <AnimatePresence>
//                   {message && (
//                     <motion.div
//                       initial={{ opacity: 0, scale: 0.95 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       exit={{ opacity: 0, scale: 0.95 }}
//                       className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2"
//                     >
//                       <FaCheckCircle className="text-green-600" />
//                       <p className="text-green-600 text-sm">{message}</p>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>

//                 <div className="flex gap-3 pt-2">
//                   <button
//                     type="button"

//                     onClick={() => navigate("/login")}

//                     onClick={() => navigate(backDestination)}                    className="flex-1 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 flex items-center justify-center gap-2"
//                   >
//                     <FaArrowLeft size={16} />
//                     Back
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                   >
//                     {loading ? (
//                       <>
//                         <FaSpinner className="animate-spin" /> Sending...
//                       </>
//                     ) : (
//                       <>
//                         <FaEnvelope /> Send OTP
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </motion.form>
//             )}

//             {/* Step 2: OTP + New Password */}
//             {step === 2 && (
//               <motion.form
//                 key="step2"
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -20 }}
//                 transition={{ duration: 0.3 }}
//                 onSubmit={handleResetPassword}
//                 className="p-8 space-y-6"
//               >
//                 {/* OTP */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     OTP Code
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <FaKey className="text-gray-400" />
//                     </div>
//                     <input
//                       type="text"
//                       value={otp}
//                       onChange={(e) => {
//                         setOtp(e.target.value);
//                         setError("");
//                       }}
//                       className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all tracking-widest font-mono"
//                       placeholder="Enter 6-digit OTP"
//                       maxLength="6"
//                       required
//                     />
//                   </div>
//                 </div>

//                 {/* New Password */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     New Password
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <FaUnlockAlt className="text-gray-400" />
//                     </div>
//                     <input
//                       type={showPasswords.new ? "text" : "password"}
//                       value={newPassword}
//                       onChange={(e) => {
//                         setNewPassword(e.target.value);
//                         checkPasswordStrength(e.target.value);
//                         setError("");
//                       }}
//                       className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                       placeholder="Minimum 6 characters"
//                       required
//                     />
//                     <button
//                       type="button"
//                       onClick={() => togglePasswordVisibility("new")}
//                       className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition"
//                     >
//                       {showPasswords.new ? <FaEyeSlash /> : <FaEye />}
//                     </button>
//                   </div>

//                   {newPassword && (
//                     <motion.div
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{ opacity: 1, height: "auto" }}
//                       className="mt-3"
//                     >
//                       <div className="flex justify-between items-center mb-1">
//                         <span className="text-xs text-gray-500">
//                           Password strength:
//                         </span>
//                         <span
//                           className={`text-xs font-medium ${passwordStrength.score <= 2 ? "text-red-600" : passwordStrength.score <= 4 ? "text-yellow-600" : "text-green-600"}`}
//                         >
//                           {passwordStrength.message}
//                         </span>
//                       </div>
//                       <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
//                         <motion.div
//                           initial={{ width: 0 }}
//                           animate={{ width: getStrengthWidth() }}
//                           transition={{ duration: 0.3 }}
//                           className={`h-full ${getStrengthColor()} rounded-full`}
//                         />
//                       </div>
//                       <div className="mt-2 text-xs text-gray-500">
//                         <p>Tips for a strong password:</p>
//                         <ul className="list-disc list-inside ml-2 mt-1 space-y-0.5">
//                           <li>At least 8 characters</li>
//                           <li>Include uppercase letters</li>
//                           <li>Include numbers</li>
//                           <li>Include special characters</li>
//                         </ul>
//                       </div>
//                     </motion.div>
//                   )}
//                 </div>

//                 {/* Confirm Password */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Confirm New Password
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <FaShieldAlt className="text-gray-400" />
//                     </div>
//                     <input
//                       type={showPasswords.confirm ? "text" : "password"}
//                       value={confirmPassword}
//                       onChange={(e) => {
//                         setConfirmPassword(e.target.value);
//                         setError("");
//                       }}
//                       className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                       placeholder="Confirm your new password"
//                       required
//                     />
//                     <button
//                       type="button"
//                       onClick={() => togglePasswordVisibility("confirm")}
//                       className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition"
//                     >
//                       {showPasswords.confirm ? <FaEyeSlash /> : <FaEye />}
//                     </button>
//                   </div>
//                   {confirmPassword && newPassword !== confirmPassword && (
//                     <motion.p
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       className="text-red-500 text-xs mt-1"
//                     >
//                       Passwords do not match
//                     </motion.p>
//                   )}
//                   {confirmPassword &&
//                     newPassword === confirmPassword &&
//                     newPassword && (
//                       <motion.p
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         className="text-green-500 text-xs mt-1 flex items-center gap-1"
//                       >
//                         <FaCheckCircle size={10} /> Passwords match
//                       </motion.p>
//                     )}
//                 </div>

//                 <AnimatePresence>
//                   {error && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       className="p-3 bg-red-50 border border-red-200 rounded-lg"
//                     >
//                       <p className="text-red-600 text-sm">{error}</p>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>

//                 <AnimatePresence>
//                   {message && (
//                     <motion.div
//                       initial={{ opacity: 0, scale: 0.95 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       exit={{ opacity: 0, scale: 0.95 }}
//                       className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2"
//                     >
//                       <FaCheckCircle className="text-green-600" />
//                       <p className="text-green-600 text-sm">{message}</p>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>

//                 <div className="flex gap-3 pt-2">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setStep(1);
//                       setError("");
//                       setMessage("");
//                     }}
//                     className="flex-1 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 flex items-center justify-center gap-2"
//                   >
//                     <FaArrowLeft size={16} />
//                     Back
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                   >
//                     {loading ? (
//                       <>
//                         <FaSpinner className="animate-spin" /> Resetting...
//                       </>
//                     ) : (
//                       <>
//                         <FaKey /> Reset Password
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </motion.form>
//             )}
//           </AnimatePresence>

//           {/* Footer */}
//           <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
//             <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
//               <FaShieldAlt />
//               <span>Your password is encrypted and never shared</span>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default ForgotPassword;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaEnvelope,
  FaArrowLeft,
  FaSpinner,
  FaCheckCircle,
  FaKey,
  FaShieldAlt,
  FaEye,
  FaEyeSlash,
  FaUnlockAlt,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState({
    new: false,
    confirm: false,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: "",
  });

  const isLoggedIn = !!(
    localStorage.getItem("token") || sessionStorage.getItem("token")
  );
  const backDestination = isLoggedIn ? "/profiledetails" : "/login";

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const checkPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    let msg = "";
    if (score <= 2) msg = "Weak password";
    else if (score <= 4) msg = "Medium password";
    else msg = "Strong password";

    setPasswordStrength({ score, message: msg });
  };

  const getStrengthColor = () => {
    if (passwordStrength.score <= 2) return "bg-red-500";
    if (passwordStrength.score <= 4) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthWidth = () => `${(passwordStrength.score / 5) * 100}%`;

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email },
      );
      if (response.data.success) {
        setMessage(response.data.message);
        setStep(2);
      } else setError(response.data.message);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to send OTP. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!otp) {
      setError("Please enter the OTP");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/reset-password",
        { email, otp, newPassword },
      );
      if (response.data.success) {
        setMessage(response.data.message);
        setTimeout(() => navigate(backDestination), 3000);
      } else setError(response.data.message);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to reset password. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Gradient Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 relative">
            {/* Back icon in header */}
            <button
              type="button"
              onClick={() => {
                if (step === 1) {
                  navigate(backDestination);
                } else {
                  setStep(1);
                  setError("");
                  setMessage("");
                }
              }}
              className="absolute top-4 left-4 p-2 text-white/70 hover:text-white hover:bg-white/20 rounded-full transition-all duration-200"
            >
              <FaArrowLeft size={18} />
            </button>

            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                {step === 1 ? (
                  <FaEnvelope className="text-white text-3xl" />
                ) : (
                  <FaUnlockAlt className="text-white text-3xl" />
                )}
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white text-center">
              {step === 1 ? "Forgot Password?" : "Reset Password"}
            </h1>
            <p className="text-blue-100 text-center mt-2 text-sm">
              {step === 1
                ? "Enter your email and we'll send you an OTP to reset your password."
                : `Enter the OTP sent to ${email} and set your new password.`}
            </p>

            {/* Step indicator dots */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  step === 1 ? "w-6 bg-white" : "w-2 bg-white/40"
                }`}
              />
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  step === 2 ? "w-6 bg-white" : "w-2 bg-white/40"
                }`}
              />
            </div>
          </div>

          {/* Step 1: Email */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.form
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSendOTP}
                className="p-8 space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-3 bg-red-50 border border-red-200 rounded-lg"
                    >
                      <p className="text-red-600 text-sm">{error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {message && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2"
                    >
                      <FaCheckCircle className="text-green-600" />
                      <p className="text-green-600 text-sm">{message}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => navigate(backDestination)}
                    className="flex-1 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <FaArrowLeft size={16} />
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <FaSpinner className="animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        <FaEnvelope /> Send OTP
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            )}

            {/* Step 2: OTP + New Password */}
            {step === 2 && (
              <motion.form
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleResetPassword}
                className="p-8 space-y-6"
              >
                {/* OTP */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    OTP Code
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaKey className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => {
                        setOtp(e.target.value);
                        setError("");
                      }}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all tracking-widest font-mono"
                      placeholder="Enter 6-digit OTP"
                      maxLength="6"
                      required
                    />
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUnlockAlt className="text-gray-400" />
                    </div>
                    <input
                      type={showPasswords.new ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        checkPasswordStrength(e.target.value);
                        setError("");
                      }}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Minimum 6 characters"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("new")}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition"
                    >
                      {showPasswords.new ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  {newPassword && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-3"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-500">
                          Password strength:
                        </span>
                        <span
                          className={`text-xs font-medium ${
                            passwordStrength.score <= 2
                              ? "text-red-600"
                              : passwordStrength.score <= 4
                                ? "text-yellow-600"
                                : "text-green-600"
                          }`}
                        >
                          {passwordStrength.message}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: getStrengthWidth() }}
                          transition={{ duration: 0.3 }}
                          className={`h-full ${getStrengthColor()} rounded-full`}
                        />
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        <p>Tips for a strong password:</p>
                        <ul className="list-disc list-inside ml-2 mt-1 space-y-0.5">
                          <li>At least 8 characters</li>
                          <li>Include uppercase letters</li>
                          <li>Include numbers</li>
                          <li>Include special characters</li>
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaShieldAlt className="text-gray-400" />
                    </div>
                    <input
                      type={showPasswords.confirm ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setError("");
                      }}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Confirm your new password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("confirm")}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition"
                    >
                      {showPasswords.confirm ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {confirmPassword && newPassword !== confirmPassword && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-500 text-xs mt-1"
                    >
                      Passwords do not match
                    </motion.p>
                  )}
                  {confirmPassword &&
                    newPassword === confirmPassword &&
                    newPassword && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-green-500 text-xs mt-1 flex items-center gap-1"
                      >
                        <FaCheckCircle size={10} /> Passwords match
                      </motion.p>
                    )}
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-3 bg-red-50 border border-red-200 rounded-lg"
                    >
                      <p className="text-red-600 text-sm">{error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {message && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2"
                    >
                      <FaCheckCircle className="text-green-600" />
                      <p className="text-green-600 text-sm">{message}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setError("");
                      setMessage("");
                    }}
                    className="flex-1 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <FaArrowLeft size={16} />
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <FaSpinner className="animate-spin" /> Resetting...
                      </>
                    ) : (
                      <>
                        <FaKey /> Reset Password
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <FaShieldAlt />
              <span>Your password is encrypted and never shared</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
