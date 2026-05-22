// // // import React, { useState } from "react";
// // // import { useNavigate, useLocation } from "react-router-dom";
// // // import {
// // //   FaArrowLeft,
// // //   FaUpload,
// // //   FaCheckCircle,
// // //   FaSpinner,
// // //   FaIdCard,
// // //   FaPassport,
// // //   FaCar,
// // //   FaFileSignature,
// // //   FaExclamationTriangle,
// // //   FaClock,
// // // } from "react-icons/fa";
// // // import axios from "axios";

// // // const API_URL = "http://localhost:5000/api";

// // // const axiosInstance = axios.create({
// // //   baseURL: API_URL,
// // // });

// // // axiosInstance.interceptors.request.use((config) => {
// // //   const token = localStorage.getItem("token");
// // //   if (token) {
// // //     config.headers.Authorization = `Bearer ${token}`;
// // //   }
// // //   return config;
// // // });

// // // const UploadDocuments = () => {
// // //   const navigate = useNavigate();
// // //   const location = useLocation();
// // //   const {
// // //     bookingId,
// // //     confirmationCode,
// // //     vehicleDetails,
// // //     driverOption,
// // //     bookingDetails,
// // //   } = location.state || {};

// // //   const [citizenshipFront, setCitizenshipFront] = useState(null);
// // //   const [citizenshipBack, setCitizenshipBack] = useState(null);
// // //   const [licenseFront, setLicenseFront] = useState(null);
// // //   const [licenseBack, setLicenseBack] = useState(null);
// // //   const [uploading, setUploading] = useState(false);
// // //   const [uploaded, setUploaded] = useState(false);
// // //   const [error, setError] = useState("");
// // //   const [agreedToContract, setAgreedToContract] = useState(false);
// // //   const [showSuccessModal, setShowSuccessModal] = useState(false);

// // //   const isSelfDrive = driverOption === "without";

// // //   if (!bookingId) {
// // //     return (
// // //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// // //         <div className="text-center">
// // //           <p className="text-red-600">No booking found. Please start over.</p>
// // //           <button
// // //             onClick={() => navigate("/rentridehome")}
// // //             className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg"
// // //           >
// // //             Back to Home
// // //           </button>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   const handleFileChange = (e, setFile, fileType) => {
// // //     const file = e.target.files[0];
// // //     if (file) {
// // //       if (file.size > 5 * 1024 * 1024) {
// // //         setError(`${fileType} file size must be less than 5MB`);
// // //         return;
// // //       }
// // //       setFile(file);
// // //       setError("");
// // //     }
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();

// // //     // Validate required documents based on driver option
// // //     if (!citizenshipFront || !citizenshipBack) {
// // //       setError("Please upload both sides of your citizenship certificate");
// // //       return;
// // //     }

// // //     if (isSelfDrive && (!licenseFront || !licenseBack)) {
// // //       setError(
// // //         "For self-drive, please upload both sides of your driver's license",
// // //       );
// // //       return;
// // //     }

// // //     if (!agreedToContract) {
// // //       setError("You must agree to the contract terms before proceeding");
// // //       return;
// // //     }

// // //     setUploading(true);
// // //     setError("");

// // //     const formData = new FormData();
// // //     formData.append("booking", bookingId);
// // //     formData.append("vehicle", vehicleDetails._id);
// // //     formData.append("citizenshipFront", citizenshipFront);
// // //     formData.append("citizenshipBack", citizenshipBack);

// // //     if (isSelfDrive && licenseFront && licenseBack) {
// // //       formData.append("licenseFront", licenseFront);
// // //       formData.append("licenseBack", licenseBack);
// // //     }

// // //     try {
// // //       const response = await axiosInstance.post("/documents/upload", formData, {
// // //         headers: {
// // //           "Content-Type": "multipart/form-data",
// // //         },
// // //       });

// // //       if (response.data.success) {
// // //         setUploaded(true);
// // //         setShowSuccessModal(true); // Show success modal
// // //       }
// // //     } catch (error) {
// // //       console.error("Upload error:", error);
// // //       setError(error.response?.data?.message || "Failed to upload documents");
// // //     } finally {
// // //       setUploading(false);
// // //     }
// // //   };

// // //   const handleCloseModal = () => {
// // //     setShowSuccessModal(false);
// // //     // Optional: Navigate to profile page after closing modal
// // //     // navigate("/profiledetails");
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
// // //       <div className="container mx-auto px-6 max-w-3xl">
// // //         <button
// // //           onClick={() => navigate(-1)}
// // //           className="mb-6 p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center gap-2"
// // //         >
// // //           <FaArrowLeft className="text-gray-700" />
// // //           Back
// // //         </button>

// // //         <div className="bg-white rounded-2xl shadow-lg p-8">
// // //           <div className="text-center mb-8">
// // //             <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
// // //               <FaUpload className="text-blue-600 text-3xl" />
// // //             </div>
// // //             <h1 className="text-2xl font-bold text-gray-900">
// // //               Upload Documents
// // //             </h1>
// // //             <p className="text-gray-600 mt-2">
// // //               Please upload the required documents for verification
// // //             </p>
// // //             {confirmationCode && (
// // //               <p className="text-sm text-blue-600 mt-2">
// // //                 Booking Code: {confirmationCode}
// // //               </p>
// // //             )}
// // //           </div>

// // //           <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
// // //             <div className="flex items-start gap-3">
// // //               <FaCar className="text-blue-600 mt-1" />
// // //               <div>
// // //                 <p className="font-semibold text-gray-900">
// // //                   {vehicleDetails?.carName}
// // //                 </p>
// // //                 <p className="text-sm text-gray-600">Booking ID: {bookingId}</p>
// // //                 <p className="text-sm text-gray-600">
// // //                   Total Amount: रु{" "}
// // //                   {bookingDetails?.totalAmount?.toLocaleString()}
// // //                 </p>
// // //                 <p className="text-sm font-medium text-blue-600 mt-1">
// // //                   Driver Option: {isSelfDrive ? "Self Drive" : "With Driver"}
// // //                 </p>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* Disclaimer Section */}
// // //           <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
// // //             <div className="flex items-start gap-3">
// // //               <FaExclamationTriangle className="text-yellow-600 text-xl mt-1" />
// // //               <div>
// // //                 <h3 className="font-bold text-gray-900 mb-2">
// // //                   Important: Vehicle Pickup Terms
// // //                 </h3>
// // //                 <p className="text-gray-700 text-sm mb-3">
// // //                   At the time of vehicle pickup,{" "}
// // //                   <strong className="text-red-600">
// // //                     the person who has uploaded these documents must be
// // //                     physically present
// // //                   </strong>{" "}
// // //                   to sign the rental contract.
// // //                 </p>
// // //                 <p className="text-gray-700 text-sm">
// // //                   Vehicle will{" "}
// // //                   <strong className="text-red-600">NOT be provided</strong> if:
// // //                 </p>
// // //                 <ul className="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
// // //                   <li>A different person attempts to pick up the vehicle</li>
// // //                   <li>
// // //                     The documents uploaded do not match the person picking up
// // //                   </li>
// // //                   <li>The contract is not signed at the time of pickup</li>
// // //                 </ul>
// // //                 <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
// // //                   <p className="text-red-700 text-sm font-semibold">
// // //                     ⚠️ No signature = No vehicle. This is strictly enforced.
// // //                   </p>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           <form onSubmit={handleSubmit} className="space-y-6">
// // //             {/* Citizenship Certificate - Required for everyone */}
// // //             <div className="border-2 border-dashed border-gray-300 rounded-xl p-6">
// // //               <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
// // //                 <FaIdCard className="text-blue-600" />
// // //                 Citizenship Certificate (Required)
// // //               </h3>

// // //               <label className="block mb-4">
// // //                 <div className="flex items-center gap-3 mb-2">
// // //                   <span className="font-semibold text-gray-900">
// // //                     Front Side
// // //                   </span>
// // //                   <span className="text-red-500">*</span>
// // //                 </div>
// // //                 <div className="flex items-center gap-4">
// // //                   <input
// // //                     type="file"
// // //                     accept="image/*,.pdf"
// // //                     onChange={(e) =>
// // //                       handleFileChange(
// // //                         e,
// // //                         setCitizenshipFront,
// // //                         "Citizenship front",
// // //                       )
// // //                     }
// // //                     className="hidden"
// // //                     id="citizenshipFront"
// // //                   />
// // //                   <label
// // //                     htmlFor="citizenshipFront"
// // //                     className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-100 transition text-center"
// // //                   >
// // //                     {citizenshipFront ? citizenshipFront.name : "Choose file"}
// // //                   </label>
// // //                 </div>
// // //               </label>

// // //               <label className="block">
// // //                 <div className="flex items-center gap-3 mb-2">
// // //                   <span className="font-semibold text-gray-900">Back Side</span>
// // //                   <span className="text-red-500">*</span>
// // //                 </div>
// // //                 <div className="flex items-center gap-4">
// // //                   <input
// // //                     type="file"
// // //                     accept="image/*,.pdf"
// // //                     onChange={(e) =>
// // //                       handleFileChange(
// // //                         e,
// // //                         setCitizenshipBack,
// // //                         "Citizenship back",
// // //                       )
// // //                     }
// // //                     className="hidden"
// // //                     id="citizenshipBack"
// // //                   />
// // //                   <label
// // //                     htmlFor="citizenshipBack"
// // //                     className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-100 transition text-center"
// // //                   >
// // //                     {citizenshipBack ? citizenshipBack.name : "Choose file"}
// // //                   </label>
// // //                 </div>
// // //               </label>
// // //             </div>

// // //             {/* Driver's License - Only for Self Drive */}
// // //             {isSelfDrive && (
// // //               <div className="border-2 border-dashed border-gray-300 rounded-xl p-6">
// // //                 <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
// // //                   <FaPassport className="text-blue-600" />
// // //                   Driver's License (Required for Self Drive)
// // //                 </h3>

// // //                 <label className="block mb-4">
// // //                   <div className="flex items-center gap-3 mb-2">
// // //                     <span className="font-semibold text-gray-900">
// // //                       Front Side
// // //                     </span>
// // //                     <span className="text-red-500">*</span>
// // //                   </div>
// // //                   <div className="flex items-center gap-4">
// // //                     <input
// // //                       type="file"
// // //                       accept="image/*,.pdf"
// // //                       onChange={(e) =>
// // //                         handleFileChange(e, setLicenseFront, "License front")
// // //                       }
// // //                       className="hidden"
// // //                       id="licenseFront"
// // //                     />
// // //                     <label
// // //                       htmlFor="licenseFront"
// // //                       className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-100 transition text-center"
// // //                     >
// // //                       {licenseFront ? licenseFront.name : "Choose file"}
// // //                     </label>
// // //                   </div>
// // //                 </label>

// // //                 <label className="block">
// // //                   <div className="flex items-center gap-3 mb-2">
// // //                     <span className="font-semibold text-gray-900">
// // //                       Back Side
// // //                     </span>
// // //                     <span className="text-red-500">*</span>
// // //                   </div>
// // //                   <div className="flex items-center gap-4">
// // //                     <input
// // //                       type="file"
// // //                       accept="image/*,.pdf"
// // //                       onChange={(e) =>
// // //                         handleFileChange(e, setLicenseBack, "License back")
// // //                       }
// // //                       className="hidden"
// // //                       id="licenseBack"
// // //                     />
// // //                     <label
// // //                       htmlFor="licenseBack"
// // //                       className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-100 transition text-center"
// // //                     >
// // //                       {licenseBack ? licenseBack.name : "Choose file"}
// // //                     </label>
// // //                   </div>
// // //                 </label>
// // //               </div>
// // //             )}

// // //             {/* Contract Agreement */}
// // //             <div className="border-2 border-gray-300 rounded-xl p-6 bg-gray-50">
// // //               <div className="flex items-start gap-3">
// // //                 <FaFileSignature className="text-blue-600 text-xl mt-1" />
// // //                 <div>
// // //                   <h3 className="font-bold text-gray-900 mb-2">
// // //                     Rental Contract Agreement
// // //                   </h3>
// // //                   <p className="text-sm text-gray-700 mb-3">
// // //                     By checking this box, you acknowledge and agree that:
// // //                   </p>
// // //                   <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside mb-4">
// // //                     <li>You are the person who uploaded these documents</li>
// // //                     <li>
// // //                       You will be physically present at the time of vehicle
// // //                       pickup
// // //                     </li>
// // //                     <li>
// // //                       You will sign the rental contract before receiving the
// // //                       vehicle
// // //                     </li>
// // //                     <li>
// // //                       You understand that failure to sign the contract will
// // //                       result in vehicle not being provided
// // //                     </li>
// // //                     <li>
// // //                       You accept full responsibility for the vehicle during the
// // //                       rental period
// // //                     </li>
// // //                   </ul>
// // //                   <label className="flex items-center gap-3 cursor-pointer">
// // //                     <input
// // //                       type="checkbox"
// // //                       checked={agreedToContract}
// // //                       onChange={(e) => setAgreedToContract(e.target.checked)}
// // //                       className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
// // //                     />
// // //                     <span className="text-gray-700 font-medium">
// // //                       I agree to the terms and conditions and confirm that I
// // //                       will sign the contract at pickup
// // //                     </span>
// // //                   </label>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             {error && (
// // //               <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600">
// // //                 {error}
// // //               </div>
// // //             )}

// // //             <button
// // //               type="submit"
// // //               disabled={uploading || uploaded}
// // //               className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50"
// // //             >
// // //               {uploading ? (
// // //                 <div className="flex items-center justify-center gap-2">
// // //                   <FaSpinner className="animate-spin" />
// // //                   Uploading...
// // //                 </div>
// // //               ) : (
// // //                 "Submit Documents"
// // //               )}
// // //             </button>

// // //             <p className="text-center text-sm text-gray-500">
// // //               Your documents will be verified by our team. You'll receive a
// // //               notification once verified.
// // //             </p>
// // //           </form>
// // //         </div>
// // //       </div>

// // //       {/* Success Modal */}
// // //       {showSuccessModal && (
// // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// // //           <div className="bg-white rounded-2xl max-w-md w-full p-6 transform transition-all animate-fade-in-up">
// // //             <div className="text-center">
// // //               <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
// // //                 <FaCheckCircle className="text-green-600 text-3xl" />
// // //               </div>
// // //               <h2 className="text-2xl font-bold text-gray-900 mb-2">
// // //                 Documents Submitted Successfully!
// // //               </h2>
// // //               <p className="text-gray-600 mb-6">
// // //                 Your booking has been submitted and is pending verification.
// // //               </p>

// // //               <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
// // //                 <div className="flex items-start gap-3">
// // //                   <FaClock className="text-blue-600 mt-1" />
// // //                   <div className="text-left">
// // //                     <p className="font-semibold text-gray-900 mb-1">
// // //                       What happens next?
// // //                     </p>
// // //                     <ul className="text-sm text-gray-700 space-y-2">
// // //                       <li>
// // //                         ✓ Our team will verify your documents within 24 hours
// // //                       </li>
// // //                       <li>✓ You'll receive a notification once verified</li>
// // //                       <li>
// // //                         ✓ You can track your booking status in your profile
// // //                       </li>
// // //                     </ul>
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               <button
// // //                 onClick={handleCloseModal}
// // //                 className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:shadow-lg transition-all"
// // //               >
// // //                 OK
// // //               </button>

// // //               <p className="text-xs text-gray-500 mt-4">
// // //                 You can check your booking status anytime in your profile
// // //                 dashboard
// // //               </p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       <style jsx>{`
// // //         @keyframes fade-in-up {
// // //           from {
// // //             opacity: 0;
// // //             transform: translateY(20px);
// // //           }
// // //           to {
// // //             opacity: 1;
// // //             transform: translateY(0);
// // //           }
// // //         }
// // //         .animate-fade-in-up {
// // //           animation: fade-in-up 0.3s ease-out;
// // //         }
// // //       `}</style>
// // //     </div>
// // //   );
// // // };

// // // export default UploadDocuments;
// // import React, { useState } from "react";
// // import { useNavigate, useLocation } from "react-router-dom";
// // import {
// //   FaArrowLeft,
// //   FaUpload,
// //   FaCheckCircle,
// //   FaSpinner,
// //   FaIdCard,
// //   FaPassport,
// //   FaCar,
// //   FaFileSignature,
// //   FaExclamationTriangle,
// //   FaClock,
// //   FaCloudUploadAlt,
// //   FaShieldAlt,
// //   FaTimesCircle,
// // } from "react-icons/fa";
// // import axios from "axios";

// // const API_URL = "http://localhost:5000/api";

// // const axiosInstance = axios.create({ baseURL: API_URL });
// // axiosInstance.interceptors.request.use((config) => {
// //   const token = localStorage.getItem("token");
// //   if (token) config.headers.Authorization = `Bearer ${token}`;
// //   return config;
// // });

// // /* ─── Tiny design tokens ─── */
// // const clr = {
// //   navy: "#0F172A",
// //   navyMid: "#1E293B",
// //   slate: "#475569",
// //   slateLight: "#94A3B8",
// //   border: "#E2E8F0",
// //   borderFocus: "#3B82F6",
// //   blue: "#3B82F6",
// //   blueDark: "#1D4ED8",
// //   blueBg: "#EFF6FF",
// //   amber: "#D97706",
// //   amberBg: "#FFFBEB",
// //   amberBorder: "#FDE68A",
// //   red: "#DC2626",
// //   redBg: "#FEF2F2",
// //   redBorder: "#FECACA",
// //   green: "#16A34A",
// //   greenBg: "#F0FDF4",
// //   greenBorder: "#BBF7D0",
// //   surface: "#FFFFFF",
// //   pageBg: "#F8FAFC",
// // };

// // /* ─── FileUploadZone ─── */
// // const FileUploadZone = ({ label, id, file, onChange, required }) => {
// //   const [dragging, setDragging] = useState(false);

// //   const handleDrop = (e) => {
// //     e.preventDefault();
// //     setDragging(false);
// //     const dropped = e.dataTransfer.files[0];
// //     if (dropped) onChange({ target: { files: [dropped] } });
// //   };

// //   return (
// //     <div style={{ marginBottom: 12 }}>
// //       <div
// //         style={{
// //           display: "flex",
// //           alignItems: "center",
// //           gap: 6,
// //           marginBottom: 8,
// //         }}
// //       >
// //         <span
// //           style={{
// //             fontSize: 13,
// //             fontWeight: 600,
// //             color: clr.navy,
// //             letterSpacing: "0.01em",
// //           }}
// //         >
// //           {label}
// //         </span>
// //         {required && (
// //           <span
// //             style={{
// //               fontSize: 10,
// //               fontWeight: 700,
// //               color: clr.blue,
// //               background: clr.blueBg,
// //               padding: "2px 7px",
// //               borderRadius: 20,
// //               letterSpacing: "0.05em",
// //               textTransform: "uppercase",
// //             }}
// //           >
// //             Required
// //           </span>
// //         )}
// //       </div>

// //       <input
// //         type="file"
// //         accept="image/*,.pdf"
// //         onChange={onChange}
// //         id={id}
// //         style={{ display: "none" }}
// //       />
// //       <label
// //         htmlFor={id}
// //         onDragOver={(e) => {
// //           e.preventDefault();
// //           setDragging(true);
// //         }}
// //         onDragLeave={() => setDragging(false)}
// //         onDrop={handleDrop}
// //         style={{
// //           display: "flex",
// //           alignItems: "center",
// //           gap: 14,
// //           padding: "14px 18px",
// //           border: `1.5px dashed ${file ? clr.blue : dragging ? clr.blue : clr.border}`,
// //           borderRadius: 12,
// //           background: file ? clr.blueBg : dragging ? "#EFF6FF" : clr.pageBg,
// //           cursor: "pointer",
// //           transition: "all 0.18s ease",
// //         }}
// //       >
// //         <div
// //           style={{
// //             width: 36,
// //             height: 36,
// //             borderRadius: 8,
// //             background: file ? clr.blue : dragging ? clr.blue : "#E2E8F0",
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "center",
// //             flexShrink: 0,
// //             transition: "background 0.18s",
// //           }}
// //         >
// //           {file ? (
// //             <FaCheckCircle style={{ color: "#fff", fontSize: 15 }} />
// //           ) : (
// //             <FaCloudUploadAlt
// //               style={{
// //                 color: file || dragging ? "#fff" : clr.slate,
// //                 fontSize: 16,
// //               }}
// //             />
// //           )}
// //         </div>
// //         <div style={{ flex: 1, minWidth: 0 }}>
// //           {file ? (
// //             <>
// //               <p
// //                 style={{
// //                   margin: 0,
// //                   fontSize: 13,
// //                   fontWeight: 600,
// //                   color: clr.blueDark,
// //                   whiteSpace: "nowrap",
// //                   overflow: "hidden",
// //                   textOverflow: "ellipsis",
// //                 }}
// //               >
// //                 {file.name}
// //               </p>
// //               <p style={{ margin: "2px 0 0", fontSize: 11, color: clr.blue }}>
// //                 {(file.size / 1024).toFixed(0)} KB · Click to replace
// //               </p>
// //             </>
// //           ) : (
// //             <>
// //               <p
// //                 style={{
// //                   margin: 0,
// //                   fontSize: 13,
// //                   fontWeight: 500,
// //                   color: clr.slate,
// //                 }}
// //               >
// //                 Drop file here or{" "}
// //                 <span style={{ color: clr.blue, fontWeight: 600 }}>browse</span>
// //               </p>
// //               <p
// //                 style={{
// //                   margin: "2px 0 0",
// //                   fontSize: 11,
// //                   color: clr.slateLight,
// //                 }}
// //               >
// //                 JPG, PNG or PDF · max 5 MB
// //               </p>
// //             </>
// //           )}
// //         </div>
// //         {file && (
// //           <FaCheckCircle
// //             style={{ color: clr.green, fontSize: 18, flexShrink: 0 }}
// //           />
// //         )}
// //       </label>
// //     </div>
// //   );
// // };

// // /* ─── Section Card ─── */
// // const SectionCard = ({ icon: Icon, title, badge, children }) => (
// //   <div
// //     style={{
// //       background: clr.surface,
// //       border: `1px solid ${clr.border}`,
// //       borderRadius: 16,
// //       overflow: "hidden",
// //       boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
// //     }}
// //   >
// //     <div
// //       style={{
// //         padding: "16px 22px",
// //         borderBottom: `1px solid ${clr.border}`,
// //         display: "flex",
// //         alignItems: "center",
// //         gap: 10,
// //         background: clr.pageBg,
// //       }}
// //     >
// //       <div
// //         style={{
// //           width: 32,
// //           height: 32,
// //           borderRadius: 8,
// //           background: clr.blueBg,
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "center",
// //         }}
// //       >
// //         <Icon style={{ color: clr.blue, fontSize: 15 }} />
// //       </div>
// //       <span style={{ fontSize: 14, fontWeight: 700, color: clr.navy, flex: 1 }}>
// //         {title}
// //       </span>
// //       {badge && (
// //         <span
// //           style={{
// //             fontSize: 10,
// //             fontWeight: 700,
// //             letterSpacing: "0.06em",
// //             textTransform: "uppercase",
// //             color: clr.blue,
// //             background: clr.blueBg,
// //             padding: "3px 9px",
// //             borderRadius: 20,
// //             border: `1px solid #BFDBFE`,
// //           }}
// //         >
// //           {badge}
// //         </span>
// //       )}
// //     </div>
// //     <div style={{ padding: "20px 22px" }}>{children}</div>
// //   </div>
// // );

// // /* ─── Step indicator ─── */
// // const Steps = ({ current }) => {
// //   const steps = ["Booking", "Documents", "Verification"];
// //   return (
// //     <div
// //       style={{
// //         display: "flex",
// //         alignItems: "center",
// //         gap: 0,
// //         marginBottom: 32,
// //       }}
// //     >
// //       {steps.map((s, i) => (
// //         <React.Fragment key={s}>
// //           <div
// //             style={{
// //               display: "flex",
// //               flexDirection: "column",
// //               alignItems: "center",
// //               gap: 4,
// //             }}
// //           >
// //             <div
// //               style={{
// //                 width: 28,
// //                 height: 28,
// //                 borderRadius: "50%",
// //                 background:
// //                   i < current ? clr.blue : i === current ? clr.blue : "#E2E8F0",
// //                 border:
// //                   i === current ? `3px solid #BFDBFE` : "3px solid transparent",
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //                 transition: "all 0.2s",
// //                 boxSizing: "border-box",
// //               }}
// //             >
// //               {i < current ? (
// //                 <FaCheckCircle style={{ color: "#fff", fontSize: 12 }} />
// //               ) : (
// //                 <span
// //                   style={{
// //                     fontSize: 11,
// //                     fontWeight: 700,
// //                     color: i === current ? "#fff" : clr.slateLight,
// //                   }}
// //                 >
// //                   {i + 1}
// //                 </span>
// //               )}
// //             </div>
// //             <span
// //               style={{
// //                 fontSize: 11,
// //                 fontWeight: i === current ? 700 : 400,
// //                 color: i === current ? clr.navy : clr.slateLight,
// //                 whiteSpace: "nowrap",
// //               }}
// //             >
// //               {s}
// //             </span>
// //           </div>
// //           {i < steps.length - 1 && (
// //             <div
// //               style={{
// //                 flex: 1,
// //                 height: 2,
// //                 margin: "0 6px",
// //                 background: i < current ? clr.blue : clr.border,
// //                 marginBottom: 20,
// //                 transition: "background 0.3s",
// //               }}
// //             />
// //           )}
// //         </React.Fragment>
// //       ))}
// //     </div>
// //   );
// // };

// // /* ─── Main Component ─── */
// // const UploadDocuments = () => {
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const {
// //     bookingId,
// //     confirmationCode,
// //     vehicleDetails,
// //     driverOption,
// //     bookingDetails,
// //   } = location.state || {};

// //   const [citizenshipFront, setCitizenshipFront] = useState(null);
// //   const [citizenshipBack, setCitizenshipBack] = useState(null);
// //   const [licenseFront, setLicenseFront] = useState(null);
// //   const [licenseBack, setLicenseBack] = useState(null);
// //   const [uploading, setUploading] = useState(false);
// //   const [uploaded, setUploaded] = useState(false);
// //   const [error, setError] = useState("");
// //   const [agreedToContract, setAgreedToContract] = useState(false);
// //   const [showSuccessModal, setShowSuccessModal] = useState(false);

// //   const isSelfDrive = driverOption === "without";

// //   const completedDocs = [
// //     citizenshipFront,
// //     citizenshipBack,
// //     isSelfDrive && licenseFront,
// //     isSelfDrive && licenseBack,
// //   ].filter(Boolean).length;
// //   const totalDocs = isSelfDrive ? 4 : 2;
// //   const progress = Math.round((completedDocs / totalDocs) * 100);

// //   if (!bookingId) {
// //     return (
// //       <div
// //         style={{
// //           minHeight: "100vh",
// //           background: clr.pageBg,
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "center",
// //         }}
// //       >
// //         <div
// //           style={{
// //             textAlign: "center",
// //             padding: 32,
// //             background: clr.surface,
// //             borderRadius: 16,
// //             border: `1px solid ${clr.border}`,
// //           }}
// //         >
// //           <FaTimesCircle
// //             style={{ color: clr.red, fontSize: 40, marginBottom: 12 }}
// //           />
// //           <p style={{ color: clr.red, fontWeight: 600, marginBottom: 16 }}>
// //             No booking found. Please start over.
// //           </p>
// //           <button
// //             onClick={() => navigate("/rentridehome")}
// //             style={{
// //               padding: "10px 24px",
// //               background: clr.blue,
// //               color: "#fff",
// //               border: "none",
// //               borderRadius: 10,
// //               fontWeight: 600,
// //               cursor: "pointer",
// //             }}
// //           >
// //             Back to Home
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const handleFileChange = (e, setFile, fileType) => {
// //     const file = e.target.files[0];
// //     if (!file) return;
// //     if (file.size > 5 * 1024 * 1024) {
// //       setError(`${fileType} must be under 5 MB`);
// //       return;
// //     }
// //     setFile(file);
// //     setError("");
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!citizenshipFront || !citizenshipBack) {
// //       setError("Please upload both sides of your citizenship certificate.");
// //       return;
// //     }
// //     if (isSelfDrive && (!licenseFront || !licenseBack)) {
// //       setError("Self-drive requires both sides of your driver's license.");
// //       return;
// //     }
// //     if (!agreedToContract) {
// //       setError("Please accept the contract terms to proceed.");
// //       return;
// //     }

// //     setUploading(true);
// //     setError("");

// //     const formData = new FormData();
// //     formData.append("booking", bookingId);
// //     formData.append("vehicle", vehicleDetails._id);
// //     formData.append("citizenshipFront", citizenshipFront);
// //     formData.append("citizenshipBack", citizenshipBack);
// //     if (isSelfDrive && licenseFront && licenseBack) {
// //       formData.append("licenseFront", licenseFront);
// //       formData.append("licenseBack", licenseBack);
// //     }

// //     try {
// //       const response = await axiosInstance.post("/documents/upload", formData, {
// //         headers: { "Content-Type": "multipart/form-data" },
// //       });
// //       if (response.data.success) {
// //         setUploaded(true);
// //         setShowSuccessModal(true);
// //       }
// //     } catch (err) {
// //       setError(
// //         err.response?.data?.message || "Upload failed. Please try again.",
// //       );
// //     } finally {
// //       setUploading(false);
// //     }
// //   };

// //   return (
// //     <div
// //       style={{
// //         minHeight: "100vh",
// //         background: clr.pageBg,
// //         fontFamily: "'Inter', -apple-system, sans-serif",
// //       }}
// //     >
// //       {/* Top bar */}
// //       <div
// //         style={{
// //           background: clr.surface,
// //           borderBottom: `1px solid ${clr.border}`,
// //           padding: "0 24px",
// //           height: 60,
// //           display: "flex",
// //           alignItems: "center",
// //           gap: 16,
// //           position: "sticky",
// //           top: 0,
// //           zIndex: 20,
// //         }}
// //       >
// //         <button
// //           onClick={() => navigate(-1)}
// //           style={{
// //             display: "flex",
// //             alignItems: "center",
// //             gap: 6,
// //             background: "none",
// //             border: "none",
// //             cursor: "pointer",
// //             color: clr.slate,
// //             fontSize: 13,
// //             fontWeight: 500,
// //             padding: "6px 10px",
// //             borderRadius: 8,
// //             transition: "background 0.15s",
// //           }}
// //           onMouseEnter={(e) => (e.currentTarget.style.background = clr.pageBg)}
// //           onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
// //         >
// //           <FaArrowLeft style={{ fontSize: 12 }} />
// //           Back
// //         </button>
// //         <div style={{ width: 1, height: 20, background: clr.border }} />
// //         <span style={{ fontSize: 14, fontWeight: 700, color: clr.navy }}>
// //           Document Upload
// //         </span>
// //         {confirmationCode && (
// //           <span
// //             style={{
// //               marginLeft: "auto",
// //               fontSize: 12,
// //               fontWeight: 600,
// //               color: clr.blue,
// //               background: clr.blueBg,
// //               padding: "4px 12px",
// //               borderRadius: 20,
// //               border: `1px solid #BFDBFE`,
// //             }}
// //           >
// //             #{confirmationCode}
// //           </span>
// //         )}
// //       </div>

// //       <div
// //         style={{ maxWidth: 680, margin: "0 auto", padding: "36px 20px 60px" }}
// //       >
// //         <Steps current={1} />

// //         {/* Page header */}
// //         <div style={{ marginBottom: 28 }}>
// //           <h1
// //             style={{
// //               margin: "0 0 6px",
// //               fontSize: 26,
// //               fontWeight: 800,
// //               color: clr.navy,
// //               letterSpacing: "-0.02em",
// //             }}
// //           >
// //             Upload Documents
// //           </h1>
// //           <p style={{ margin: 0, fontSize: 14, color: clr.slate }}>
// //             Securely upload verification documents for your booking.
// //           </p>
// //         </div>

// //         {/* Booking summary card */}
// //         <div
// //           style={{
// //             background: clr.navy,
// //             borderRadius: 16,
// //             padding: "20px 22px",
// //             marginBottom: 20,
// //             display: "flex",
// //             alignItems: "center",
// //             gap: 16,
// //           }}
// //         >
// //           <div
// //             style={{
// //               width: 44,
// //               height: 44,
// //               borderRadius: 10,
// //               background: "rgba(255,255,255,0.1)",
// //               display: "flex",
// //               alignItems: "center",
// //               justifyContent: "center",
// //               flexShrink: 0,
// //             }}
// //           >
// //             <FaCar style={{ color: "#fff", fontSize: 20 }} />
// //           </div>
// //           <div style={{ flex: 1, minWidth: 0 }}>
// //             <p
// //               style={{
// //                 margin: "0 0 2px",
// //                 fontWeight: 700,
// //                 fontSize: 15,
// //                 color: "#fff",
// //               }}
// //             >
// //               {vehicleDetails?.carName || "Vehicle"}
// //             </p>
// //             <p
// //               style={{
// //                 margin: 0,
// //                 fontSize: 12,
// //                 color: "rgba(255,255,255,0.55)",
// //               }}
// //             >
// //               Booking ID: {bookingId}
// //             </p>
// //           </div>
// //           <div style={{ textAlign: "right", flexShrink: 0 }}>
// //             <p
// //               style={{
// //                 margin: "0 0 2px",
// //                 fontWeight: 800,
// //                 fontSize: 18,
// //                 color: "#fff",
// //               }}
// //             >
// //               रु {bookingDetails?.totalAmount?.toLocaleString()}
// //             </p>
// //             <span
// //               style={{
// //                 fontSize: 11,
// //                 fontWeight: 700,
// //                 color: clr.navy,
// //                 background: isSelfDrive ? "#FCD34D" : "#6EE7B7",
// //                 padding: "2px 9px",
// //                 borderRadius: 20,
// //               }}
// //             >
// //               {isSelfDrive ? "Self Drive" : "With Driver"}
// //             </span>
// //           </div>
// //         </div>

// //         {/* Upload progress */}
// //         <div
// //           style={{
// //             background: clr.surface,
// //             border: `1px solid ${clr.border}`,
// //             borderRadius: 12,
// //             padding: "14px 18px",
// //             marginBottom: 20,
// //             display: "flex",
// //             alignItems: "center",
// //             gap: 16,
// //           }}
// //         >
// //           <div style={{ flex: 1 }}>
// //             <div
// //               style={{
// //                 display: "flex",
// //                 justifyContent: "space-between",
// //                 marginBottom: 6,
// //               }}
// //             >
// //               <span style={{ fontSize: 12, fontWeight: 600, color: clr.slate }}>
// //                 Upload progress
// //               </span>
// //               <span style={{ fontSize: 12, fontWeight: 700, color: clr.blue }}>
// //                 {completedDocs}/{totalDocs} files
// //               </span>
// //             </div>
// //             <div
// //               style={{
// //                 height: 6,
// //                 background: "#E2E8F0",
// //                 borderRadius: 99,
// //                 overflow: "hidden",
// //               }}
// //             >
// //               <div
// //                 style={{
// //                   height: "100%",
// //                   width: `${progress}%`,
// //                   background: progress === 100 ? clr.green : clr.blue,
// //                   borderRadius: 99,
// //                   transition: "width 0.4s ease",
// //                 }}
// //               />
// //             </div>
// //           </div>
// //           {progress === 100 && (
// //             <FaCheckCircle
// //               style={{ color: clr.green, fontSize: 20, flexShrink: 0 }}
// //             />
// //           )}
// //         </div>

// //         {/* Alert */}
// //         <div
// //           style={{
// //             background: clr.amberBg,
// //             border: `1px solid ${clr.amberBorder}`,
// //             borderRadius: 12,
// //             padding: "14px 18px",
// //             marginBottom: 24,
// //           }}
// //         >
// //           <div style={{ display: "flex", gap: 12 }}>
// //             <FaExclamationTriangle
// //               style={{
// //                 color: clr.amber,
// //                 fontSize: 15,
// //                 marginTop: 2,
// //                 flexShrink: 0,
// //               }}
// //             />
// //             <div>
// //               <p
// //                 style={{
// //                   margin: "0 0 4px",
// //                   fontWeight: 700,
// //                   fontSize: 13,
// //                   color: "#92400E",
// //                 }}
// //               >
// //                 The document holder must be present at pickup
// //               </p>
// //               <ul
// //                 style={{
// //                   margin: 0,
// //                   paddingLeft: 16,
// //                   fontSize: 12,
// //                   color: "#A16207",
// //                   lineHeight: 1.7,
// //                 }}
// //               >
// //                 <li>A different person cannot collect the vehicle</li>
// //                 <li>Documents must match the person picking up</li>
// //                 <li>Physical signature required — no exceptions</li>
// //               </ul>
// //             </div>
// //           </div>
// //         </div>

// //         <form
// //           onSubmit={handleSubmit}
// //           style={{ display: "flex", flexDirection: "column", gap: 16 }}
// //         >
// //           {/* Citizenship */}
// //           <SectionCard
// //             icon={FaIdCard}
// //             title="Citizenship Certificate"
// //             badge="Always Required"
// //           >
// //             <div
// //               style={{
// //                 display: "grid",
// //                 gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
// //                 gap: 12,
// //               }}
// //             >
// //               <FileUploadZone
// //                 label="Front Side"
// //                 id="citizenshipFront"
// //                 file={citizenshipFront}
// //                 onChange={(e) =>
// //                   handleFileChange(e, setCitizenshipFront, "Citizenship front")
// //                 }
// //                 required
// //               />
// //               <FileUploadZone
// //                 label="Back Side"
// //                 id="citizenshipBack"
// //                 file={citizenshipBack}
// //                 onChange={(e) =>
// //                   handleFileChange(e, setCitizenshipBack, "Citizenship back")
// //                 }
// //                 required
// //               />
// //             </div>
// //           </SectionCard>

// //           {/* License */}
// //           {isSelfDrive && (
// //             <SectionCard
// //               icon={FaPassport}
// //               title="Driver's License"
// //               badge="Self-Drive Required"
// //             >
// //               <div
// //                 style={{
// //                   display: "grid",
// //                   gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
// //                   gap: 12,
// //                 }}
// //               >
// //                 <FileUploadZone
// //                   label="Front Side"
// //                   id="licenseFront"
// //                   file={licenseFront}
// //                   onChange={(e) =>
// //                     handleFileChange(e, setLicenseFront, "License front")
// //                   }
// //                   required
// //                 />
// //                 <FileUploadZone
// //                   label="Back Side"
// //                   id="licenseBack"
// //                   file={licenseBack}
// //                   onChange={(e) =>
// //                     handleFileChange(e, setLicenseBack, "License back")
// //                   }
// //                   required
// //                 />
// //               </div>
// //             </SectionCard>
// //           )}

// //           {/* Contract */}
// //           <SectionCard icon={FaFileSignature} title="Rental Agreement">
// //             <div style={{ marginBottom: 16 }}>
// //               {[
// //                 "I am the person whose documents are being uploaded",
// //                 "I will be physically present at the time of vehicle pickup",
// //                 "I will sign the rental contract before receiving the vehicle",
// //                 "I accept full responsibility for the vehicle during the rental period",
// //               ].map((term, i) => (
// //                 <div
// //                   key={i}
// //                   style={{ display: "flex", gap: 10, marginBottom: 8 }}
// //                 >
// //                   <div
// //                     style={{
// //                       width: 18,
// //                       height: 18,
// //                       borderRadius: "50%",
// //                       flexShrink: 0,
// //                       marginTop: 1,
// //                       background: clr.greenBg,
// //                       border: `1px solid ${clr.greenBorder}`,
// //                       display: "flex",
// //                       alignItems: "center",
// //                       justifyContent: "center",
// //                     }}
// //                   >
// //                     <FaCheckCircle style={{ color: clr.green, fontSize: 9 }} />
// //                   </div>
// //                   <p
// //                     style={{
// //                       margin: 0,
// //                       fontSize: 13,
// //                       color: clr.slate,
// //                       lineHeight: 1.5,
// //                     }}
// //                   >
// //                     {term}
// //                   </p>
// //                 </div>
// //               ))}
// //             </div>

// //             <label
// //               style={{
// //                 display: "flex",
// //                 alignItems: "center",
// //                 gap: 12,
// //                 cursor: "pointer",
// //                 padding: "14px 16px",
// //                 background: agreedToContract ? clr.greenBg : clr.pageBg,
// //                 border: `1.5px solid ${agreedToContract ? clr.greenBorder : clr.border}`,
// //                 borderRadius: 10,
// //                 transition: "all 0.2s",
// //               }}
// //             >
// //               <input
// //                 type="checkbox"
// //                 checked={agreedToContract}
// //                 onChange={(e) => setAgreedToContract(e.target.checked)}
// //                 style={{
// //                   width: 17,
// //                   height: 17,
// //                   accentColor: clr.blue,
// //                   cursor: "pointer",
// //                   flexShrink: 0,
// //                 }}
// //               />
// //               <span
// //                 style={{
// //                   fontSize: 13,
// //                   fontWeight: 600,
// //                   color: agreedToContract ? "#15803D" : clr.navy,
// //                 }}
// //               >
// //                 I confirm and agree to sign the contract at the time of pickup
// //               </span>
// //               {agreedToContract && (
// //                 <FaCheckCircle
// //                   style={{
// //                     color: clr.green,
// //                     fontSize: 16,
// //                     marginLeft: "auto",
// //                     flexShrink: 0,
// //                   }}
// //                 />
// //               )}
// //             </label>
// //           </SectionCard>

// //           {/* Error */}
// //           {error && (
// //             <div
// //               style={{
// //                 display: "flex",
// //                 gap: 10,
// //                 alignItems: "flex-start",
// //                 background: clr.redBg,
// //                 border: `1px solid ${clr.redBorder}`,
// //                 borderRadius: 10,
// //                 padding: "12px 16px",
// //               }}
// //             >
// //               <FaExclamationTriangle
// //                 style={{
// //                   color: clr.red,
// //                   fontSize: 14,
// //                   marginTop: 2,
// //                   flexShrink: 0,
// //                 }}
// //               />
// //               <p
// //                 style={{
// //                   margin: 0,
// //                   fontSize: 13,
// //                   color: clr.red,
// //                   fontWeight: 500,
// //                 }}
// //               >
// //                 {error}
// //               </p>
// //             </div>
// //           )}

// //           {/* Submit */}
// //           <button
// //             type="submit"
// //             disabled={uploading || uploaded}
// //             style={{
// //               width: "100%",
// //               padding: "15px 24px",
// //               background: uploading || uploaded ? "#93C5FD" : clr.blue,
// //               color: "#fff",
// //               border: "none",
// //               borderRadius: 12,
// //               fontSize: 15,
// //               fontWeight: 700,
// //               cursor: uploading || uploaded ? "not-allowed" : "pointer",
// //               display: "flex",
// //               alignItems: "center",
// //               justifyContent: "center",
// //               gap: 10,
// //               boxShadow:
// //                 uploading || uploaded
// //                   ? "none"
// //                   : "0 4px 14px rgba(59,130,246,0.35)",
// //               transition: "all 0.2s",
// //               letterSpacing: "0.01em",
// //             }}
// //           >
// //             {uploading ? (
// //               <>
// //                 <FaSpinner style={{ animation: "spin 1s linear infinite" }} />{" "}
// //                 Uploading documents…
// //               </>
// //             ) : (
// //               <>
// //                 <FaShieldAlt /> Submit for Verification
// //               </>
// //             )}
// //           </button>

// //           <p
// //             style={{
// //               textAlign: "center",
// //               fontSize: 12,
// //               color: clr.slateLight,
// //               margin: "4px 0 0",
// //             }}
// //           >
// //             Documents are encrypted and reviewed within 24 hours
// //           </p>
// //         </form>
// //       </div>

// //       {/* ─── Success Modal ─── */}
// //       {showSuccessModal && (
// //         <div
// //           style={{
// //             position: "fixed",
// //             inset: 0,
// //             background: "rgba(15,23,42,0.55)",
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "center",
// //             zIndex: 50,
// //             padding: 20,
// //             backdropFilter: "blur(3px)",
// //           }}
// //         >
// //           <div
// //             style={{
// //               background: clr.surface,
// //               borderRadius: 20,
// //               maxWidth: 440,
// //               width: "100%",
// //               overflow: "hidden",
// //               boxShadow: "0 25px 60px rgba(0,0,0,0.18)",
// //               animation: "fadeUp 0.3s ease-out",
// //             }}
// //           >
// //             {/* Green top accent */}
// //             <div
// //               style={{
// //                 height: 4,
// //                 background: `linear-gradient(90deg, ${clr.green}, #34D399)`,
// //               }}
// //             />

// //             <div style={{ padding: "32px 32px 28px", textAlign: "center" }}>
// //               <div
// //                 style={{
// //                   width: 64,
// //                   height: 64,
// //                   borderRadius: "50%",
// //                   background: clr.greenBg,
// //                   border: `2px solid ${clr.greenBorder}`,
// //                   display: "flex",
// //                   alignItems: "center",
// //                   justifyContent: "center",
// //                   margin: "0 auto 20px",
// //                 }}
// //               >
// //                 <FaCheckCircle style={{ color: clr.green, fontSize: 28 }} />
// //               </div>

// //               <h2
// //                 style={{
// //                   margin: "0 0 8px",
// //                   fontSize: 20,
// //                   fontWeight: 800,
// //                   color: clr.navy,
// //                   letterSpacing: "-0.02em",
// //                 }}
// //               >
// //                 Documents Submitted
// //               </h2>
// //               <p
// //                 style={{
// //                   margin: "0 0 24px",
// //                   fontSize: 14,
// //                   color: clr.slate,
// //                   lineHeight: 1.6,
// //                 }}
// //               >
// //                 Your booking is pending verification. We'll notify you once your
// //                 documents are reviewed.
// //               </p>

// //               <div
// //                 style={{
// //                   background: clr.pageBg,
// //                   border: `1px solid ${clr.border}`,
// //                   borderRadius: 12,
// //                   padding: "16px 18px",
// //                   marginBottom: 24,
// //                   textAlign: "left",
// //                 }}
// //               >
// //                 <div
// //                   style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
// //                 >
// //                   <FaClock
// //                     style={{
// //                       color: clr.blue,
// //                       fontSize: 15,
// //                       marginTop: 2,
// //                       flexShrink: 0,
// //                     }}
// //                   />
// //                   <div>
// //                     <p
// //                       style={{
// //                         margin: "0 0 8px",
// //                         fontSize: 13,
// //                         fontWeight: 700,
// //                         color: clr.navy,
// //                       }}
// //                     >
// //                       What happens next?
// //                     </p>
// //                     {[
// //                       "Team reviews documents within 24 hours",
// //                       "You receive a confirmation notification",
// //                       "Track status anytime in your profile",
// //                     ].map((step, i) => (
// //                       <div
// //                         key={i}
// //                         style={{
// //                           display: "flex",
// //                           gap: 8,
// //                           marginBottom: i < 2 ? 6 : 0,
// //                         }}
// //                       >
// //                         <span
// //                           style={{
// //                             fontSize: 12,
// //                             fontWeight: 700,
// //                             color: clr.blue,
// //                           }}
// //                         >
// //                           0{i + 1}
// //                         </span>
// //                         <span style={{ fontSize: 12, color: clr.slate }}>
// //                           {step}
// //                         </span>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               </div>

// //               <button
// //                 onClick={() => setShowSuccessModal(false)}
// //                 style={{
// //                   width: "100%",
// //                   padding: "13px 24px",
// //                   background: clr.navy,
// //                   color: "#fff",
// //                   border: "none",
// //                   borderRadius: 10,
// //                   fontSize: 14,
// //                   fontWeight: 700,
// //                   cursor: "pointer",
// //                   letterSpacing: "0.01em",
// //                 }}
// //               >
// //                 Done
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       <style>{`
// //         @keyframes spin { to { transform: rotate(360deg); } }
// //         @keyframes fadeUp {
// //           from { opacity: 0; transform: translateY(16px); }
// //           to   { opacity: 1; transform: translateY(0); }
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default UploadDocuments;

// // export default UploadDocuments;
// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import {
//   FaArrowLeft,
//   FaUpload,
//   FaCheckCircle,
//   FaSpinner,
//   FaIdCard,
//   FaPassport,
//   FaCar,
//   FaFileSignature,
//   FaExclamationTriangle,
//   FaClock,
//   FaCloudUploadAlt,
//   FaShieldAlt,
//   FaTimesCircle,
// } from "react-icons/fa";
// import axios from "axios";

// const API_URL = "http://localhost:5000/api";

// const axiosInstance = axios.create({ baseURL: API_URL });
// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// /* ─── Design tokens ─── */
// const clr = {
//   navy: "#0F172A",
//   navyMid: "#1E293B",
//   slate: "#475569",
//   slateLight: "#94A3B8",
//   border: "#E2E8F0",
//   borderFocus: "#3B82F6",
//   blue: "#3B82F6",
//   blueDark: "#1D4ED8",
//   blueBg: "#EFF6FF",
//   purple: "#8B5CF6",
//   amber: "#D97706",
//   amberBg: "#FFFBEB",
//   amberBorder: "#FDE68A",
//   red: "#DC2626",
//   redBg: "#FEF2F2",
//   redBorder: "#FECACA",
//   green: "#16A34A",
//   greenBg: "#F0FDF4",
//   greenBorder: "#BBF7D0",
//   surface: "#FFFFFF",
//   pageBg: "#F8FAFC",
// };

// /* ─── FileUploadZone ─── */
// const FileUploadZone = ({ label, id, file, onChange, required }) => {
//   const [dragging, setDragging] = useState(false);

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setDragging(false);
//     const dropped = e.dataTransfer.files[0];
//     if (dropped) onChange({ target: { files: [dropped] } });
//   };

//   return (
//     <div style={{ marginBottom: 12 }}>
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           gap: 6,
//           marginBottom: 8,
//         }}
//       >
//         <span
//           style={{
//             fontSize: 13,
//             fontWeight: 600,
//             color: clr.navy,
//             letterSpacing: "0.01em",
//           }}
//         >
//           {label}
//         </span>
//         {required && (
//           <span
//             style={{
//               fontSize: 10,
//               fontWeight: 700,
//               color: clr.blue,
//               background: clr.blueBg,
//               padding: "2px 7px",
//               borderRadius: 20,
//               letterSpacing: "0.05em",
//               textTransform: "uppercase",
//             }}
//           >
//             Required
//           </span>
//         )}
//       </div>

//       <input
//         type="file"
//         accept="image/*,.pdf"
//         onChange={onChange}
//         id={id}
//         style={{ display: "none" }}
//       />
//       <label
//         htmlFor={id}
//         onDragOver={(e) => {
//           e.preventDefault();
//           setDragging(true);
//         }}
//         onDragLeave={() => setDragging(false)}
//         onDrop={handleDrop}
//         style={{
//           display: "flex",
//           alignItems: "center",
//           gap: 14,
//           padding: "14px 18px",
//           border: `1.5px dashed ${file ? clr.blue : dragging ? clr.blue : clr.border}`,
//           borderRadius: 12,
//           background: file ? clr.blueBg : dragging ? "#EFF6FF" : clr.pageBg,
//           cursor: "pointer",
//           transition: "all 0.18s ease",
//         }}
//       >
//         <div
//           style={{
//             width: 36,
//             height: 36,
//             borderRadius: 8,
//             background: file ? clr.blue : dragging ? clr.blue : "#E2E8F0",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             flexShrink: 0,
//             transition: "background 0.18s",
//           }}
//         >
//           {file ? (
//             <FaCheckCircle style={{ color: "#fff", fontSize: 15 }} />
//           ) : (
//             <FaCloudUploadAlt
//               style={{
//                 color: file || dragging ? "#fff" : clr.slate,
//                 fontSize: 16,
//               }}
//             />
//           )}
//         </div>
//         <div style={{ flex: 1, minWidth: 0 }}>
//           {file ? (
//             <>
//               <p
//                 style={{
//                   margin: 0,
//                   fontSize: 13,
//                   fontWeight: 600,
//                   color: clr.blueDark,
//                   whiteSpace: "nowrap",
//                   overflow: "hidden",
//                   textOverflow: "ellipsis",
//                 }}
//               >
//                 {file.name}
//               </p>
//               <p style={{ margin: "2px 0 0", fontSize: 11, color: clr.blue }}>
//                 {(file.size / 1024).toFixed(0)} KB · Click to replace
//               </p>
//             </>
//           ) : (
//             <>
//               <p
//                 style={{
//                   margin: 0,
//                   fontSize: 13,
//                   fontWeight: 500,
//                   color: clr.slate,
//                 }}
//               >
//                 Drop file here or{" "}
//                 <span style={{ color: clr.blue, fontWeight: 600 }}>browse</span>
//               </p>
//               <p
//                 style={{
//                   margin: "2px 0 0",
//                   fontSize: 11,
//                   color: clr.slateLight,
//                 }}
//               >
//                 JPG, PNG or PDF · max 5 MB
//               </p>
//             </>
//           )}
//         </div>
//         {file && (
//           <FaCheckCircle
//             style={{ color: clr.green, fontSize: 18, flexShrink: 0 }}
//           />
//         )}
//       </label>
//     </div>
//   );
// };

// /* ─── Section Card ─── */
// const SectionCard = ({ icon: Icon, title, badge, children }) => (
//   <div
//     style={{
//       background: clr.surface,
//       border: `1px solid ${clr.border}`,
//       borderRadius: 16,
//       overflow: "hidden",
//       boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
//     }}
//   >
//     <div
//       style={{
//         padding: "16px 22px",
//         borderBottom: `1px solid ${clr.border}`,
//         display: "flex",
//         alignItems: "center",
//         gap: 10,
//         background: "linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)",
//       }}
//     >
//       <div
//         style={{
//           width: 32,
//           height: 32,
//           borderRadius: 8,
//           background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           boxShadow: "0 2px 8px rgba(59, 130, 246, 0.25)",
//         }}
//       >
//         <Icon style={{ color: "#fff", fontSize: 15 }} />
//       </div>
//       <span style={{ fontSize: 14, fontWeight: 700, color: clr.navy, flex: 1 }}>
//         {title}
//       </span>
//       {badge && (
//         <span
//           style={{
//             fontSize: 10,
//             fontWeight: 700,
//             letterSpacing: "0.06em",
//             textTransform: "uppercase",
//             color: clr.blue,
//             background: clr.blueBg,
//             padding: "3px 9px",
//             borderRadius: 20,
//             border: `1px solid #BFDBFE`,
//           }}
//         >
//           {badge}
//         </span>
//       )}
//     </div>
//     <div style={{ padding: "20px 22px" }}>{children}</div>
//   </div>
// );

// /* ─── Step indicator ─── */
// const Steps = ({ current }) => {
//   const steps = ["Booking", "Documents", "Verification"];
//   return (
//     <div
//       style={{
//         display: "flex",
//         alignItems: "center",
//         gap: 0,
//         marginBottom: 32,
//       }}
//     >
//       {steps.map((s, i) => (
//         <React.Fragment key={s}>
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               gap: 4,
//             }}
//           >
//             <div
//               style={{
//                 width: 28,
//                 height: 28,
//                 borderRadius: "50%",
//                 background:
//                   i < current
//                     ? "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)"
//                     : i === current
//                       ? clr.blue
//                       : "#E2E8F0",
//                 border:
//                   i === current ? `3px solid #BFDBFE` : "3px solid transparent",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 transition: "all 0.2s",
//                 boxSizing: "border-box",
//                 boxShadow:
//                   i === current ? "0 4px 12px rgba(59, 130, 246, 0.3)" : "none",
//               }}
//             >
//               {i < current ? (
//                 <FaCheckCircle style={{ color: "#fff", fontSize: 12 }} />
//               ) : (
//                 <span
//                   style={{
//                     fontSize: 11,
//                     fontWeight: 700,
//                     color: i === current ? "#fff" : clr.slateLight,
//                   }}
//                 >
//                   {i + 1}
//                 </span>
//               )}
//             </div>
//             <span
//               style={{
//                 fontSize: 11,
//                 fontWeight: i === current ? 700 : 400,
//                 color: i === current ? clr.navy : clr.slateLight,
//                 whiteSpace: "nowrap",
//               }}
//             >
//               {s}
//             </span>
//           </div>
//           {i < steps.length - 1 && (
//             <div
//               style={{
//                 flex: 1,
//                 height: 2,
//                 margin: "0 6px",
//                 background:
//                   i < current
//                     ? "linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)"
//                     : clr.border,
//                 marginBottom: 20,
//                 transition: "background 0.3s",
//               }}
//             />
//           )}
//         </React.Fragment>
//       ))}
//     </div>
//   );
// };

// /* ─── Main Component ─── */
// const UploadDocuments = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { bookingData, vehicleDetails, driverOption, bookingDetails } =
//     location.state || {};

//   const [citizenshipFront, setCitizenshipFront] = useState(null);
//   const [citizenshipBack, setCitizenshipBack] = useState(null);
//   const [licenseFront, setLicenseFront] = useState(null);
//   const [licenseBack, setLicenseBack] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [uploaded, setUploaded] = useState(false);
//   const [error, setError] = useState("");
//   const [agreedToContract, setAgreedToContract] = useState(false);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [createdBookingId, setCreatedBookingId] = useState(null);
//   const [confirmationCode, setConfirmationCode] = useState(null);

//   const isSelfDrive = driverOption === "without";

//   const completedDocs = [
//     citizenshipFront,
//     citizenshipBack,
//     isSelfDrive && licenseFront,
//     isSelfDrive && licenseBack,
//   ].filter(Boolean).length;
//   const totalDocs = isSelfDrive ? 4 : 2;
//   const progress = Math.round((completedDocs / totalDocs) * 100);

//   if (!bookingData || !vehicleDetails) {
//     return (
//       <div
//         style={{
//           minHeight: "100vh",
//           background: clr.pageBg,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <div
//           style={{
//             textAlign: "center",
//             padding: 40,
//             background: clr.surface,
//             borderRadius: 20,
//             border: `1px solid ${clr.border}`,
//             maxWidth: 400,
//             boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
//           }}
//         >
//           <FaTimesCircle
//             style={{ color: clr.red, fontSize: 48, marginBottom: 16 }}
//           />
//           <h3
//             style={{
//               fontSize: 20,
//               fontWeight: 700,
//               color: clr.navy,
//               marginBottom: 8,
//             }}
//           >
//             No Booking Data Found
//           </h3>
//           <p style={{ color: clr.slate, marginBottom: 24, fontSize: 14 }}>
//             Please start a new booking to continue.
//           </p>
//           <button
//             onClick={() => navigate("/rentridehome")}
//             style={{
//               padding: "12px 28px",
//               background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
//               color: "#fff",
//               border: "none",
//               borderRadius: 10,
//               fontWeight: 700,
//               cursor: "pointer",
//               fontSize: 14,
//               boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
//               transition: "transform 0.2s",
//             }}
//             onMouseEnter={(e) =>
//               (e.currentTarget.style.transform = "translateY(-2px)")
//             }
//             onMouseLeave={(e) =>
//               (e.currentTarget.style.transform = "translateY(0)")
//             }
//           >
//             Back to Home
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const handleFileChange = (e, setFile, fileType) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     if (file.size > 5 * 1024 * 1024) {
//       setError(`${fileType} must be under 5 MB`);
//       return;
//     }
//     setFile(file);
//     setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!citizenshipFront || !citizenshipBack) {
//       setError("Please upload both sides of your citizenship certificate.");
//       return;
//     }
//     if (isSelfDrive && (!licenseFront || !licenseBack)) {
//       setError("Self-drive requires both sides of your driver's license.");
//       return;
//     }
//     if (!agreedToContract) {
//       setError("Please accept the contract terms to proceed.");
//       return;
//     }

//     setUploading(true);
//     setError("");

//     try {
//       // Step 1: Create the booking first
//       const bookingResponse = await axiosInstance.post(
//         "/bookings",
//         bookingData,
//       );

//       if (!bookingResponse.data?.data?.booking?.id) {
//         throw new Error("No booking ID received from server");
//       }

//       const newBookingId = bookingResponse.data.data.booking.id;
//       const newConfirmationCode =
//         bookingResponse.data.data.booking.confirmationCode;

//       setCreatedBookingId(newBookingId);
//       setConfirmationCode(newConfirmationCode);

//       // Step 2: Upload documents with the newly created booking ID
//       const formData = new FormData();
//       formData.append("booking", newBookingId);
//       formData.append("vehicle", vehicleDetails._id);
//       formData.append("citizenshipFront", citizenshipFront);
//       formData.append("citizenshipBack", citizenshipBack);
//       if (isSelfDrive && licenseFront && licenseBack) {
//         formData.append("licenseFront", licenseFront);
//         formData.append("licenseBack", licenseBack);
//       }

//       const uploadResponse = await axiosInstance.post(
//         "/documents/upload",
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         },
//       );

//       if (uploadResponse.data.success) {
//         setUploaded(true);
//         setShowSuccessModal(true);
//       }
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//           "Booking creation or upload failed. Please try again.",
//       );
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: clr.pageBg,
//         fontFamily: "'Inter', -apple-system, sans-serif",
//       }}
//     >
//       {/* Enhanced Top Bar with RentRide Branding */}
//       <div
//         style={{
//           background: clr.surface,
//           borderBottom: `1px solid ${clr.border}`,
//           padding: "16px 24px",
//           position: "sticky",
//           top: 0,
//           zIndex: 20,
//           boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//           }}
//         >
//           <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
//             <button
//               onClick={() => navigate(-1)}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 8,
//                 background: "none",
//                 border: "none",
//                 cursor: "pointer",
//                 color: clr.slate,
//                 fontSize: 14,
//                 fontWeight: 500,
//                 padding: "8px 12px",
//                 borderRadius: 8,
//                 transition: "background 0.15s",
//               }}
//               onMouseEnter={(e) =>
//                 (e.currentTarget.style.background = clr.pageBg)
//               }
//               onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
//             >
//               <FaArrowLeft style={{ fontSize: 14 }} />
//               Back
//             </button>
//             <div style={{ width: 1, height: 24, background: clr.border }} />
//             <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//               <div
//                 style={{
//                   padding: "8px",
//                   background:
//                     "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
//                   borderRadius: 10,
//                   boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
//                 }}
//               >
//                 <FaCar style={{ color: "#fff", fontSize: 18 }} />
//               </div>
//               <div>
//                 <div
//                   style={{ display: "flex", alignItems: "baseline", gap: 0 }}
//                 >
//                   <span
//                     style={{
//                       fontSize: 20,
//                       fontWeight: 800,
//                       background:
//                         "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
//                       WebkitBackgroundClip: "text",
//                       WebkitTextFillColor: "transparent",
//                       backgroundClip: "text",
//                     }}
//                   >
//                     Rent
//                   </span>
//                   <span
//                     style={{
//                       fontSize: 20,
//                       fontWeight: 800,
//                       color: clr.navy,
//                     }}
//                   >
//                     Ride
//                   </span>
//                 </div>
//                 <p
//                   style={{
//                     margin: 0,
//                     fontSize: 10,
//                     color: clr.slateLight,
//                     letterSpacing: "0.02em",
//                     marginTop: -2,
//                   }}
//                 >
//                   Premium Car Rentals
//                 </p>
//               </div>
//             </div>
//           </div>
//           {confirmationCode && (
//             <span
//               style={{
//                 fontSize: 13,
//                 fontWeight: 700,
//                 color: clr.blue,
//                 background: clr.blueBg,
//                 padding: "6px 14px",
//                 borderRadius: 20,
//                 border: `1px solid #BFDBFE`,
//                 letterSpacing: "0.02em",
//               }}
//             >
//               #{confirmationCode}
//             </span>
//           )}
//         </div>
//       </div>

//       <div
//         style={{ maxWidth: 680, margin: "0 auto", padding: "36px 20px 60px" }}
//       >
//         <Steps current={1} />

//         {/* Page header */}
//         <div style={{ marginBottom: 28 }}>
//           <h1
//             style={{
//               margin: "0 0 6px",
//               fontSize: 26,
//               fontWeight: 800,
//               color: clr.navy,
//               letterSpacing: "-0.02em",
//             }}
//           >
//             Upload Documents
//           </h1>
//           <p style={{ margin: 0, fontSize: 14, color: clr.slate }}>
//             Securely upload verification documents for your booking.
//           </p>
//         </div>

//         {/* Enhanced Booking Summary Card */}
//         <div
//           style={{
//             background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
//             borderRadius: 16,
//             padding: "20px 22px",
//             marginBottom: 20,
//             display: "flex",
//             alignItems: "center",
//             gap: 16,
//             boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
//           }}
//         >
//           <div
//             style={{
//               width: 44,
//               height: 44,
//               borderRadius: 10,
//               background: "rgba(255,255,255,0.1)",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               flexShrink: 0,
//             }}
//           >
//             <FaCar style={{ color: "#fff", fontSize: 20 }} />
//           </div>
//           <div style={{ flex: 1, minWidth: 0 }}>
//             <p
//               style={{
//                 margin: "0 0 2px",
//                 fontWeight: 700,
//                 fontSize: 15,
//                 color: "#fff",
//               }}
//             >
//               {vehicleDetails?.carName || "Vehicle"}
//             </p>
//             <p
//               style={{
//                 margin: 0,
//                 fontSize: 12,
//                 color: "rgba(255,255,255,0.55)",
//               }}
//             >
//               {createdBookingId
//                 ? `Booking ID: ${createdBookingId}`
//                 : "Pending document upload"}
//             </p>
//           </div>
//           <div style={{ textAlign: "right", flexShrink: 0 }}>
//             <p
//               style={{
//                 margin: "0 0 2px",
//                 fontWeight: 800,
//                 fontSize: 18,
//                 color: "#fff",
//               }}
//             >
//               रु {bookingDetails?.totalAmount?.toLocaleString()}
//             </p>
//             <span
//               style={{
//                 fontSize: 11,
//                 fontWeight: 700,
//                 color: clr.navy,
//                 background: isSelfDrive ? "#FCD34D" : "#6EE7B7",
//                 padding: "2px 9px",
//                 borderRadius: 20,
//               }}
//             >
//               {isSelfDrive ? "Self Drive" : "With Driver"}
//             </span>
//           </div>
//         </div>

//         {/* Enhanced Upload Progress */}
//         <div
//           style={{
//             background: clr.surface,
//             border: `1px solid ${clr.border}`,
//             borderRadius: 12,
//             padding: "14px 18px",
//             marginBottom: 20,
//             display: "flex",
//             alignItems: "center",
//             gap: 16,
//             boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
//           }}
//         >
//           <div style={{ flex: 1 }}>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 marginBottom: 6,
//               }}
//             >
//               <span style={{ fontSize: 12, fontWeight: 600, color: clr.slate }}>
//                 Upload progress
//               </span>
//               <span style={{ fontSize: 12, fontWeight: 700, color: clr.blue }}>
//                 {completedDocs}/{totalDocs} files
//               </span>
//             </div>
//             <div
//               style={{
//                 height: 6,
//                 background: "#E2E8F0",
//                 borderRadius: 99,
//                 overflow: "hidden",
//               }}
//             >
//               <div
//                 style={{
//                   height: "100%",
//                   width: `${progress}%`,
//                   background:
//                     progress === 100
//                       ? clr.green
//                       : "linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)",
//                   borderRadius: 99,
//                   transition: "width 0.4s ease",
//                 }}
//               />
//             </div>
//           </div>
//           {progress === 100 && (
//             <FaCheckCircle
//               style={{ color: clr.green, fontSize: 20, flexShrink: 0 }}
//             />
//           )}
//         </div>

//         {/* Alert */}
//         <div
//           style={{
//             background: clr.amberBg,
//             border: `1px solid ${clr.amberBorder}`,
//             borderRadius: 12,
//             padding: "14px 18px",
//             marginBottom: 24,
//           }}
//         >
//           <div style={{ display: "flex", gap: 12 }}>
//             <FaExclamationTriangle
//               style={{
//                 color: clr.amber,
//                 fontSize: 15,
//                 marginTop: 2,
//                 flexShrink: 0,
//               }}
//             />
//             <div>
//               <p
//                 style={{
//                   margin: "0 0 4px",
//                   fontWeight: 700,
//                   fontSize: 13,
//                   color: "#92400E",
//                 }}
//               >
//                 The document holder must be present at pickup
//               </p>
//               <ul
//                 style={{
//                   margin: 0,
//                   paddingLeft: 16,
//                   fontSize: 12,
//                   color: "#A16207",
//                   lineHeight: 1.7,
//                 }}
//               >
//                 <li>A different person cannot collect the vehicle</li>
//                 <li>Documents must match the person picking up</li>
//                 <li>Physical signature required — no exceptions</li>
//               </ul>
//             </div>
//           </div>
//         </div>

//         <form
//           onSubmit={handleSubmit}
//           style={{ display: "flex", flexDirection: "column", gap: 16 }}
//         >
//           {/* Citizenship */}
//           <SectionCard
//             icon={FaIdCard}
//             title="Citizenship Certificate"
//             badge="Always Required"
//           >
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
//                 gap: 12,
//               }}
//             >
//               <FileUploadZone
//                 label="Front Side"
//                 id="citizenshipFront"
//                 file={citizenshipFront}
//                 onChange={(e) =>
//                   handleFileChange(e, setCitizenshipFront, "Citizenship front")
//                 }
//                 required
//               />
//               <FileUploadZone
//                 label="Back Side"
//                 id="citizenshipBack"
//                 file={citizenshipBack}
//                 onChange={(e) =>
//                   handleFileChange(e, setCitizenshipBack, "Citizenship back")
//                 }
//                 required
//               />
//             </div>
//           </SectionCard>

//           {/* License */}
//           {isSelfDrive && (
//             <SectionCard
//               icon={FaPassport}
//               title="Driver's License"
//               badge="Self-Drive Required"
//             >
//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
//                   gap: 12,
//                 }}
//               >
//                 <FileUploadZone
//                   label="Front Side"
//                   id="licenseFront"
//                   file={licenseFront}
//                   onChange={(e) =>
//                     handleFileChange(e, setLicenseFront, "License front")
//                   }
//                   required
//                 />
//                 <FileUploadZone
//                   label="Back Side"
//                   id="licenseBack"
//                   file={licenseBack}
//                   onChange={(e) =>
//                     handleFileChange(e, setLicenseBack, "License back")
//                   }
//                   required
//                 />
//               </div>
//             </SectionCard>
//           )}

//           {/* Contract */}
//           <SectionCard icon={FaFileSignature} title="Rental Agreement">
//             <div style={{ marginBottom: 16 }}>
//               {[
//                 "I am the person whose documents are being uploaded",
//                 "I will be physically present at the time of vehicle pickup",
//                 "I will sign the rental contract before receiving the vehicle",
//                 "I accept full responsibility for the vehicle during the rental period",
//               ].map((term, i) => (
//                 <div
//                   key={i}
//                   style={{ display: "flex", gap: 10, marginBottom: 8 }}
//                 >
//                   <div
//                     style={{
//                       width: 18,
//                       height: 18,
//                       borderRadius: "50%",
//                       flexShrink: 0,
//                       marginTop: 1,
//                       background: clr.greenBg,
//                       border: `1px solid ${clr.greenBorder}`,
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <FaCheckCircle style={{ color: clr.green, fontSize: 9 }} />
//                   </div>
//                   <p
//                     style={{
//                       margin: 0,
//                       fontSize: 13,
//                       color: clr.slate,
//                       lineHeight: 1.5,
//                     }}
//                   >
//                     {term}
//                   </p>
//                 </div>
//               ))}
//             </div>

//             <label
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 12,
//                 cursor: "pointer",
//                 padding: "14px 16px",
//                 background: agreedToContract ? clr.greenBg : clr.pageBg,
//                 border: `1.5px solid ${agreedToContract ? clr.greenBorder : clr.border}`,
//                 borderRadius: 10,
//                 transition: "all 0.2s",
//               }}
//             >
//               <input
//                 type="checkbox"
//                 checked={agreedToContract}
//                 onChange={(e) => setAgreedToContract(e.target.checked)}
//                 style={{
//                   width: 17,
//                   height: 17,
//                   accentColor: clr.blue,
//                   cursor: "pointer",
//                   flexShrink: 0,
//                 }}
//               />
//               <span
//                 style={{
//                   fontSize: 13,
//                   fontWeight: 600,
//                   color: agreedToContract ? "#15803D" : clr.navy,
//                 }}
//               >
//                 I confirm and agree to sign the contract at the time of pickup
//               </span>
//               {agreedToContract && (
//                 <FaCheckCircle
//                   style={{
//                     color: clr.green,
//                     fontSize: 16,
//                     marginLeft: "auto",
//                     flexShrink: 0,
//                   }}
//                 />
//               )}
//             </label>
//           </SectionCard>

//           {/* Error */}
//           {error && (
//             <div
//               style={{
//                 display: "flex",
//                 gap: 10,
//                 alignItems: "flex-start",
//                 background: clr.redBg,
//                 border: `1px solid ${clr.redBorder}`,
//                 borderRadius: 10,
//                 padding: "12px 16px",
//               }}
//             >
//               <FaExclamationTriangle
//                 style={{
//                   color: clr.red,
//                   fontSize: 14,
//                   marginTop: 2,
//                   flexShrink: 0,
//                 }}
//               />
//               <p
//                 style={{
//                   margin: 0,
//                   fontSize: 13,
//                   color: clr.red,
//                   fontWeight: 500,
//                 }}
//               >
//                 {error}
//               </p>
//             </div>
//           )}

//           {/* Enhanced Submit Button */}
//           <button
//             type="submit"
//             disabled={uploading || uploaded}
//             style={{
//               width: "100%",
//               padding: "15px 24px",
//               background:
//                 uploading || uploaded
//                   ? "#93C5FD"
//                   : "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
//               color: "#fff",
//               border: "none",
//               borderRadius: 12,
//               fontSize: 15,
//               fontWeight: 700,
//               cursor: uploading || uploaded ? "not-allowed" : "pointer",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               gap: 10,
//               boxShadow:
//                 uploading || uploaded
//                   ? "none"
//                   : "0 8px 24px rgba(59, 130, 246, 0.4)",
//               transition: "all 0.2s",
//               letterSpacing: "0.01em",
//             }}
//           >
//             {uploading ? (
//               <>
//                 <FaSpinner style={{ animation: "spin 1s linear infinite" }} />{" "}
//                 Creating booking and uploading…
//               </>
//             ) : (
//               <>
//                 <FaShieldAlt /> Create Booking & Submit Documents
//               </>
//             )}
//           </button>

//           <p
//             style={{
//               textAlign: "center",
//               fontSize: 12,
//               color: clr.slateLight,
//               margin: "4px 0 0",
//             }}
//           >
//             Your booking will be created after successful document upload
//           </p>
//         </form>
//       </div>

//       {/* ─── Enhanced Success Modal ─── */}
//       {showSuccessModal && (
//         <div
//           style={{
//             position: "fixed",
//             inset: 0,
//             background: "rgba(15,23,42,0.6)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             zIndex: 50,
//             padding: 20,
//             backdropFilter: "blur(4px)",
//           }}
//         >
//           <div
//             style={{
//               background: clr.surface,
//               borderRadius: 20,
//               maxWidth: 440,
//               width: "100%",
//               overflow: "hidden",
//               boxShadow: "0 25px 60px rgba(0,0,0,0.2)",
//               animation: "fadeUp 0.3s ease-out",
//             }}
//           >
//             {/* Gradient top accent */}
//             <div
//               style={{
//                 height: 4,
//                 background: "linear-gradient(90deg, #16A34A, #34D399)",
//               }}
//             />

//             <div style={{ padding: "32px 32px 28px", textAlign: "center" }}>
//               <div
//                 style={{
//                   width: 64,
//                   height: 64,
//                   borderRadius: "50%",
//                   background: clr.greenBg,
//                   border: `2px solid ${clr.greenBorder}`,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   margin: "0 auto 20px",
//                   boxShadow: "0 4px 12px rgba(22, 163, 74, 0.2)",
//                 }}
//               >
//                 <FaCheckCircle style={{ color: clr.green, fontSize: 28 }} />
//               </div>

//               <h2
//                 style={{
//                   margin: "0 0 8px",
//                   fontSize: 20,
//                   fontWeight: 800,
//                   color: clr.navy,
//                   letterSpacing: "-0.02em",
//                 }}
//               >
//                 Booking Created Successfully!
//               </h2>
//               {confirmationCode && (
//                 <div
//                   style={{
//                     margin: "0 0 12px",
//                     padding: "8px 16px",
//                     background: clr.blueBg,
//                     border: `1px solid #BFDBFE`,
//                     borderRadius: 20,
//                     display: "inline-block",
//                   }}
//                 >
//                   <span
//                     style={{ fontSize: 13, fontWeight: 700, color: clr.blue }}
//                   >
//                     Confirmation: #{confirmationCode}
//                   </span>
//                 </div>
//               )}
//               <p
//                 style={{
//                   margin: "0 0 24px",
//                   fontSize: 14,
//                   color: clr.slate,
//                   lineHeight: 1.6,
//                 }}
//               >
//                 Your booking and documents have been submitted. We'll notify you
//                 once your documents are reviewed.
//               </p>

//               <div
//                 style={{
//                   background: clr.pageBg,
//                   border: `1px solid ${clr.border}`,
//                   borderRadius: 12,
//                   padding: "16px 18px",
//                   marginBottom: 24,
//                   textAlign: "left",
//                 }}
//               >
//                 <div
//                   style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
//                 >
//                   <FaClock
//                     style={{
//                       color: clr.blue,
//                       fontSize: 15,
//                       marginTop: 2,
//                       flexShrink: 0,
//                     }}
//                   />
//                   <div>
//                     <p
//                       style={{
//                         margin: "0 0 8px",
//                         fontSize: 13,
//                         fontWeight: 700,
//                         color: clr.navy,
//                       }}
//                     >
//                       What happens next?
//                     </p>
//                     {[
//                       "Team reviews documents within 24 hours",
//                       "You receive a confirmation notification",
//                       "Track status anytime in your profile",
//                     ].map((step, i) => (
//                       <div
//                         key={i}
//                         style={{
//                           display: "flex",
//                           gap: 8,
//                           marginBottom: i < 2 ? 6 : 0,
//                         }}
//                       >
//                         <span
//                           style={{
//                             fontSize: 12,
//                             fontWeight: 700,
//                             color: clr.blue,
//                           }}
//                         >
//                           0{i + 1}
//                         </span>
//                         <span style={{ fontSize: 12, color: clr.slate }}>
//                           {step}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               <button
//                 onClick={() => navigate("/profiledetails")}
//                 style={{
//                   width: "100%",
//                   padding: "13px 24px",
//                   background:
//                     "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
//                   color: "#fff",
//                   border: "none",
//                   borderRadius: 10,
//                   fontSize: 14,
//                   fontWeight: 700,
//                   cursor: "pointer",
//                   letterSpacing: "0.01em",
//                   boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
//                   transition: "transform 0.2s",
//                 }}
//                 onMouseEnter={(e) =>
//                   (e.currentTarget.style.transform = "translateY(-2px)")
//                 }
//                 onMouseLeave={(e) =>
//                   (e.currentTarget.style.transform = "translateY(0)")
//                 }
//               >
//                 View My Bookings
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <style>{`
//         @keyframes spin { to { transform: rotate(360deg); } }
//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(16px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default UploadDocuments;

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaArrowLeft,
  FaUpload,
  FaCheckCircle,
  FaSpinner,
  FaIdCard,
  FaPassport,
  FaCar,
  FaFileSignature,
  FaExclamationTriangle,
  FaClock,
  FaCloudUploadAlt,
  FaShieldAlt,
  FaTimesCircle,
} from "react-icons/fa";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const axiosInstance = axios.create({ baseURL: API_URL });
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/* ─── Design tokens ─── */
const clr = {
  navy: "#0F172A",
  navyMid: "#1E293B",
  slate: "#475569",
  slateLight: "#94A3B8",
  border: "#E2E8F0",
  borderFocus: "#3B82F6",
  blue: "#3B82F6",
  blueDark: "#1D4ED8",
  blueBg: "#EFF6FF",
  purple: "#8B5CF6",
  amber: "#D97706",
  amberBg: "#FFFBEB",
  amberBorder: "#FDE68A",
  red: "#DC2626",
  redBg: "#FEF2F2",
  redBorder: "#FECACA",
  green: "#16A34A",
  greenBg: "#F0FDF4",
  greenBorder: "#BBF7D0",
  surface: "#FFFFFF",
  pageBg: "#F8FAFC",
};

/* ─── FileUploadZone ─── */
const FileUploadZone = ({ label, id, file, onChange, required }) => {
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) onChange({ target: { files: [dropped] } });
  };

  return (
    <div style={{ marginBottom: 12 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 8,
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: clr.navy,
            letterSpacing: "0.01em",
          }}
        >
          {label}
        </span>
        {required && (
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: clr.blue,
              background: clr.blueBg,
              padding: "2px 7px",
              borderRadius: 20,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Required
          </span>
        )}
      </div>

      <input
        type="file"
        accept="image/*,.pdf"
        onChange={onChange}
        id={id}
        style={{ display: "none" }}
      />
      <label
        htmlFor={id}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "14px 18px",
          border: `1.5px dashed ${file ? clr.blue : dragging ? clr.blue : clr.border}`,
          borderRadius: 12,
          background: file ? clr.blueBg : dragging ? "#EFF6FF" : clr.pageBg,
          cursor: "pointer",
          transition: "all 0.18s ease",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: file ? clr.blue : dragging ? clr.blue : "#E2E8F0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background 0.18s",
          }}
        >
          {file ? (
            <FaCheckCircle style={{ color: "#fff", fontSize: 15 }} />
          ) : (
            <FaCloudUploadAlt
              style={{
                color: file || dragging ? "#fff" : clr.slate,
                fontSize: 16,
              }}
            />
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          {file ? (
            <>
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  fontWeight: 600,
                  color: clr.blueDark,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {file.name}
              </p>
              <p style={{ margin: "2px 0 0", fontSize: 11, color: clr.blue }}>
                {(file.size / 1024).toFixed(0)} KB · Click to replace
              </p>
            </>
          ) : (
            <>
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  fontWeight: 500,
                  color: clr.slate,
                }}
              >
                Drop file here or{" "}
                <span style={{ color: clr.blue, fontWeight: 600 }}>browse</span>
              </p>
              <p
                style={{
                  margin: "2px 0 0",
                  fontSize: 11,
                  color: clr.slateLight,
                }}
              >
                JPG, PNG or PDF · max 5 MB
              </p>
            </>
          )}
        </div>
        {file && (
          <FaCheckCircle
            style={{ color: clr.green, fontSize: 18, flexShrink: 0 }}
          />
        )}
      </label>
    </div>
  );
};

/* ─── Section Card ─── */
const SectionCard = ({ icon: Icon, title, badge, children }) => (
  <div
    style={{
      background: clr.surface,
      border: `1px solid ${clr.border}`,
      borderRadius: 16,
      overflow: "hidden",
      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
    }}
  >
    <div
      style={{
        padding: "16px 22px",
        borderBottom: `1px solid ${clr.border}`,
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 8px rgba(59, 130, 246, 0.25)",
        }}
      >
        <Icon style={{ color: "#fff", fontSize: 15 }} />
      </div>
      <span style={{ fontSize: 14, fontWeight: 700, color: clr.navy, flex: 1 }}>
        {title}
      </span>
      {badge && (
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: clr.blue,
            background: clr.blueBg,
            padding: "3px 9px",
            borderRadius: 20,
            border: `1px solid #BFDBFE`,
          }}
        >
          {badge}
        </span>
      )}
    </div>
    <div style={{ padding: "20px 22px" }}>{children}</div>
  </div>
);

/* ─── Step indicator ─── */
const Steps = ({ current }) => {
  const steps = ["Booking", "Documents", "Verification"];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 0,
        marginBottom: 32,
      }}
    >
      {steps.map((s, i) => (
        <React.Fragment key={s}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background:
                  i < current
                    ? "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)"
                    : i === current
                      ? clr.blue
                      : "#E2E8F0",
                border:
                  i === current ? `3px solid #BFDBFE` : "3px solid transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
                boxSizing: "border-box",
                boxShadow:
                  i === current ? "0 4px 12px rgba(59, 130, 246, 0.3)" : "none",
              }}
            >
              {i < current ? (
                <FaCheckCircle style={{ color: "#fff", fontSize: 12 }} />
              ) : (
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: i === current ? "#fff" : clr.slateLight,
                  }}
                >
                  {i + 1}
                </span>
              )}
            </div>
            <span
              style={{
                fontSize: 11,
                fontWeight: i === current ? 700 : 400,
                color: i === current ? clr.navy : clr.slateLight,
                whiteSpace: "nowrap",
              }}
            >
              {s}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              style={{
                flex: 1,
                height: 2,
                margin: "0 6px",
                background:
                  i < current
                    ? "linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)"
                    : clr.border,
                marginBottom: 20,
                transition: "background 0.3s",
              }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

/* ─── Main Component ─── */
const UploadDocuments = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookingData, vehicleDetails, driverOption, bookingDetails } =
    location.state || {};

  const [citizenshipFront, setCitizenshipFront] = useState(null);
  const [citizenshipBack, setCitizenshipBack] = useState(null);
  const [licenseFront, setLicenseFront] = useState(null);
  const [licenseBack, setLicenseBack] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState("");
  const [agreedToContract, setAgreedToContract] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdBookingId, setCreatedBookingId] = useState(null);
  const [confirmationCode, setConfirmationCode] = useState(null);

  const isSelfDrive = driverOption === "without";

  const completedDocs = [
    citizenshipFront,
    citizenshipBack,
    isSelfDrive && licenseFront,
    isSelfDrive && licenseBack,
  ].filter(Boolean).length;
  const totalDocs = isSelfDrive ? 4 : 2;
  const progress = Math.round((completedDocs / totalDocs) * 100);

  if (!bookingData || !vehicleDetails) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: clr.pageBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: 40,
            background: clr.surface,
            borderRadius: 20,
            border: `1px solid ${clr.border}`,
            maxWidth: 400,
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          }}
        >
          <FaTimesCircle
            style={{ color: clr.red, fontSize: 48, marginBottom: 16 }}
          />
          <h3
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: clr.navy,
              marginBottom: 8,
            }}
          >
            No Booking Data Found
          </h3>
          <p style={{ color: clr.slate, marginBottom: 24, fontSize: 14 }}>
            Please start a new booking to continue.
          </p>
          <button
            onClick={() => navigate("/rentridehome")}
            style={{
              padding: "12px 28px",
              background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              fontWeight: 700,
              cursor: "pointer",
              fontSize: 14,
              boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-2px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleFileChange = (e, setFile, fileType) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError(`${fileType} must be under 5 MB`);
      return;
    }
    setFile(file);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!citizenshipFront || !citizenshipBack) {
      setError("Please upload both sides of your citizenship certificate.");
      return;
    }
    if (isSelfDrive && (!licenseFront || !licenseBack)) {
      setError("Self-drive requires both sides of your driver's license.");
      return;
    }
    if (!agreedToContract) {
      setError("Please accept the contract terms to proceed.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      // Step 1: Create the booking first
      const bookingResponse = await axiosInstance.post(
        "/bookings",
        bookingData,
      );

      if (!bookingResponse.data?.data?.booking?.id) {
        throw new Error("No booking ID received from server");
      }

      const newBookingId = bookingResponse.data.data.booking.id;
      const newConfirmationCode =
        bookingResponse.data.data.booking.confirmationCode;

      setCreatedBookingId(newBookingId);
      setConfirmationCode(newConfirmationCode);

      // Step 2: Upload documents with the newly created booking ID
      const formData = new FormData();
      formData.append("booking", newBookingId);
      formData.append("vehicle", vehicleDetails._id);
      formData.append("citizenshipFront", citizenshipFront);
      formData.append("citizenshipBack", citizenshipBack);
      if (isSelfDrive && licenseFront && licenseBack) {
        formData.append("licenseFront", licenseFront);
        formData.append("licenseBack", licenseBack);
      }

      const uploadResponse = await axiosInstance.post(
        "/documents/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      if (uploadResponse.data.success) {
        setUploaded(true);
        setShowSuccessModal(true);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Booking creation or upload failed. Please try again.",
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: clr.pageBg,
        fontFamily: "'Inter', -apple-system, sans-serif",
      }}
    >
      {/* Enhanced Top Bar with RentRide Branding */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${clr.border}`,
          padding: "16px 24px",
          position: "sticky",
          top: 0,
          zIndex: 20,
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button
              onClick={() => navigate(-1)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                background: "none",
                border: "none",
                cursor: "pointer",
                color: clr.slate,
                fontSize: 18,
                borderRadius: "50%",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = clr.pageBg)
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
            >
              <FaArrowLeft />
            </button>
            <div style={{ width: 1, height: 24, background: clr.border }} />
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  padding: "10px",
                  background:
                    "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
                  borderRadius: 12,
                  boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
                }}
              >
                <FaCar style={{ color: "#fff", fontSize: 20 }} />
              </div>
              <div>
                <div
                  style={{ display: "flex", alignItems: "baseline", gap: 0 }}
                >
                  <span
                    style={{
                      fontSize: 24,
                      fontWeight: 800,
                      background:
                        "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Rent
                  </span>
                  <span
                    style={{
                      fontSize: 24,
                      fontWeight: 800,
                      color: clr.navy,
                    }}
                  >
                    Ride
                  </span>
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 10,
                    color: clr.slateLight,
                    letterSpacing: "0.02em",
                    marginTop: -2,
                  }}
                >
                  Premium Car Rentals
                </p>
              </div>
            </div>
          </div>
          {confirmationCode && (
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: clr.blue,
                background: clr.blueBg,
                padding: "6px 14px",
                borderRadius: 20,
                border: `1px solid #BFDBFE`,
                letterSpacing: "0.02em",
              }}
            >
              #{confirmationCode}
            </span>
          )}
        </div>
      </div>

      <div
        style={{ maxWidth: 680, margin: "0 auto", padding: "36px 20px 60px" }}
      >
        <Steps current={1} />

        {/* Page header */}
        <div style={{ marginBottom: 28 }}>
          <h1
            style={{
              margin: "0 0 6px",
              fontSize: 26,
              fontWeight: 800,
              color: clr.navy,
              letterSpacing: "-0.02em",
            }}
          >
            Upload Documents
          </h1>
          <p style={{ margin: 0, fontSize: 14, color: clr.slate }}>
            Securely upload verification documents for your booking.
          </p>
        </div>

        {/* Enhanced Booking Summary Card */}
        <div
          style={{
            background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
            borderRadius: 16,
            padding: "20px 22px",
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            gap: 16,
            boxShadow: "0 8px 24px rgba(59, 130, 246, 0.4)",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <FaCar style={{ color: "#fff", fontSize: 20 }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                margin: "0 0 2px",
                fontWeight: 700,
                fontSize: 15,
                color: "#fff",
              }}
            >
              {vehicleDetails?.carName || "Vehicle"}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 12,
                color: "rgba(255,255,255,0.7)",
              }}
            >
              {createdBookingId
                ? `Booking ID: ${createdBookingId}`
                : "Pending document upload"}
            </p>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <p
              style={{
                margin: "0 0 2px",
                fontWeight: 800,
                fontSize: 18,
                color: "#fff",
              }}
            >
              रु {bookingDetails?.totalAmount?.toLocaleString()}
            </p>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: clr.navy,
                background: isSelfDrive ? "#FCD34D" : "#6EE7B7",
                padding: "2px 9px",
                borderRadius: 20,
              }}
            >
              {isSelfDrive ? "Self Drive" : "With Driver"}
            </span>
          </div>
        </div>

        {/* Enhanced Upload Progress */}
        <div
          style={{
            background: clr.surface,
            border: `1px solid ${clr.border}`,
            borderRadius: 12,
            padding: "14px 18px",
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            gap: 16,
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 6,
              }}
            >
              <span style={{ fontSize: 12, fontWeight: 600, color: clr.slate }}>
                Upload progress
              </span>
              <span style={{ fontSize: 12, fontWeight: 700, color: clr.blue }}>
                {completedDocs}/{totalDocs} files
              </span>
            </div>
            <div
              style={{
                height: 6,
                background: "#E2E8F0",
                borderRadius: 99,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  background:
                    progress === 100
                      ? clr.green
                      : "linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)",
                  borderRadius: 99,
                  transition: "width 0.4s ease",
                }}
              />
            </div>
          </div>
          {progress === 100 && (
            <FaCheckCircle
              style={{ color: clr.green, fontSize: 20, flexShrink: 0 }}
            />
          )}
        </div>

        {/* Alert */}
        <div
          style={{
            background: clr.amberBg,
            border: `1px solid ${clr.amberBorder}`,
            borderRadius: 12,
            padding: "14px 18px",
            marginBottom: 24,
          }}
        >
          <div style={{ display: "flex", gap: 12 }}>
            <FaExclamationTriangle
              style={{
                color: clr.amber,
                fontSize: 15,
                marginTop: 2,
                flexShrink: 0,
              }}
            />
            <div>
              <p
                style={{
                  margin: "0 0 4px",
                  fontWeight: 700,
                  fontSize: 13,
                  color: "#92400E",
                }}
              >
                The document holder must be present at pickup
              </p>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: 16,
                  fontSize: 12,
                  color: "#A16207",
                  lineHeight: 1.7,
                }}
              >
                <li>A different person cannot collect the vehicle</li>
                <li>Documents must match the person picking up</li>
                <li>Physical signature required — no exceptions</li>
              </ul>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
          {/* Citizenship */}
          <SectionCard
            icon={FaIdCard}
            title="Citizenship Certificate"
            badge="Always Required"
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: 12,
              }}
            >
              <FileUploadZone
                label="Front Side"
                id="citizenshipFront"
                file={citizenshipFront}
                onChange={(e) =>
                  handleFileChange(e, setCitizenshipFront, "Citizenship front")
                }
                required
              />
              <FileUploadZone
                label="Back Side"
                id="citizenshipBack"
                file={citizenshipBack}
                onChange={(e) =>
                  handleFileChange(e, setCitizenshipBack, "Citizenship back")
                }
                required
              />
            </div>
          </SectionCard>

          {/* License */}
          {isSelfDrive && (
            <SectionCard
              icon={FaPassport}
              title="Driver's License"
              badge="Self-Drive Required"
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: 12,
                }}
              >
                <FileUploadZone
                  label="Front Side"
                  id="licenseFront"
                  file={licenseFront}
                  onChange={(e) =>
                    handleFileChange(e, setLicenseFront, "License front")
                  }
                  required
                />
                <FileUploadZone
                  label="Back Side"
                  id="licenseBack"
                  file={licenseBack}
                  onChange={(e) =>
                    handleFileChange(e, setLicenseBack, "License back")
                  }
                  required
                />
              </div>
            </SectionCard>
          )}

          {/* Contract */}
          <SectionCard icon={FaFileSignature} title="Rental Agreement">
            <div style={{ marginBottom: 16 }}>
              {[
                "I am the person whose documents are being uploaded",
                "I will be physically present at the time of vehicle pickup",
                "I will sign the rental contract before receiving the vehicle",
                "I accept full responsibility for the vehicle during the rental period",
              ].map((term, i) => (
                <div
                  key={i}
                  style={{ display: "flex", gap: 10, marginBottom: 8 }}
                >
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      flexShrink: 0,
                      marginTop: 1,
                      background: clr.greenBg,
                      border: `1px solid ${clr.greenBorder}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FaCheckCircle style={{ color: clr.green, fontSize: 9 }} />
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 13,
                      color: clr.slate,
                      lineHeight: 1.5,
                    }}
                  >
                    {term}
                  </p>
                </div>
              ))}
            </div>

            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                cursor: "pointer",
                padding: "14px 16px",
                background: agreedToContract ? clr.greenBg : clr.pageBg,
                border: `1.5px solid ${agreedToContract ? clr.greenBorder : clr.border}`,
                borderRadius: 10,
                transition: "all 0.2s",
              }}
            >
              <input
                type="checkbox"
                checked={agreedToContract}
                onChange={(e) => setAgreedToContract(e.target.checked)}
                style={{
                  width: 17,
                  height: 17,
                  accentColor: clr.blue,
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: agreedToContract ? "#15803D" : clr.navy,
                }}
              >
                I confirm and agree to sign the contract at the time of pickup
              </span>
              {agreedToContract && (
                <FaCheckCircle
                  style={{
                    color: clr.green,
                    fontSize: 16,
                    marginLeft: "auto",
                    flexShrink: 0,
                  }}
                />
              )}
            </label>
          </SectionCard>

          {/* Error */}
          {error && (
            <div
              style={{
                display: "flex",
                gap: 10,
                alignItems: "flex-start",
                background: clr.redBg,
                border: `1px solid ${clr.redBorder}`,
                borderRadius: 10,
                padding: "12px 16px",
              }}
            >
              <FaExclamationTriangle
                style={{
                  color: clr.red,
                  fontSize: 14,
                  marginTop: 2,
                  flexShrink: 0,
                }}
              />
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  color: clr.red,
                  fontWeight: 500,
                }}
              >
                {error}
              </p>
            </div>
          )}

          {/* Enhanced Submit Button */}
          <button
            type="submit"
            disabled={uploading || uploaded}
            style={{
              width: "100%",
              padding: "15px 24px",
              background:
                uploading || uploaded
                  ? "#93C5FD"
                  : "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
              color: "#fff",
              border: "none",
              borderRadius: 12,
              fontSize: 15,
              fontWeight: 700,
              cursor: uploading || uploaded ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              boxShadow:
                uploading || uploaded
                  ? "none"
                  : "0 8px 24px rgba(59, 130, 246, 0.4)",
              transition: "all 0.2s",
              letterSpacing: "0.01em",
            }}
          >
            {uploading ? (
              <>
                <FaSpinner style={{ animation: "spin 1s linear infinite" }} />{" "}
                Creating booking and uploading…
              </>
            ) : (
              <>
                <FaShieldAlt /> Create Booking & Submit Documents
              </>
            )}
          </button>

          <p
            style={{
              textAlign: "center",
              fontSize: 12,
              color: clr.slateLight,
              margin: "4px 0 0",
            }}
          >
            Your booking will be created after successful document upload
          </p>
        </form>
      </div>

      {/* ─── Enhanced Success Modal ─── */}
      {showSuccessModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15,23,42,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
            padding: 20,
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            style={{
              background: clr.surface,
              borderRadius: 20,
              maxWidth: 440,
              width: "100%",
              overflow: "hidden",
              boxShadow: "0 25px 60px rgba(0,0,0,0.2)",
              animation: "fadeUp 0.3s ease-out",
            }}
          >
            {/* Gradient top accent */}
            <div
              style={{
                height: 4,
                background: "linear-gradient(90deg, #16A34A, #34D399)",
              }}
            />

            <div style={{ padding: "32px 32px 28px", textAlign: "center" }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: clr.greenBg,
                  border: `2px solid ${clr.greenBorder}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  boxShadow: "0 4px 12px rgba(22, 163, 74, 0.2)",
                }}
              >
                <FaCheckCircle style={{ color: clr.green, fontSize: 28 }} />
              </div>

              <h2
                style={{
                  margin: "0 0 8px",
                  fontSize: 20,
                  fontWeight: 800,
                  color: clr.navy,
                  letterSpacing: "-0.02em",
                }}
              >
                Booking Created Successfully!
              </h2>
              {confirmationCode && (
                <div
                  style={{
                    margin: "0 0 12px",
                    padding: "8px 16px",
                    background: clr.blueBg,
                    border: `1px solid #BFDBFE`,
                    borderRadius: 20,
                    display: "inline-block",
                  }}
                >
                  <span
                    style={{ fontSize: 13, fontWeight: 700, color: clr.blue }}
                  >
                    Confirmation: #{confirmationCode}
                  </span>
                </div>
              )}
              <p
                style={{
                  margin: "0 0 24px",
                  fontSize: 14,
                  color: clr.slate,
                  lineHeight: 1.6,
                }}
              >
                Your booking and documents have been submitted. We'll notify you
                once your documents are reviewed.
              </p>

              <div
                style={{
                  background: clr.pageBg,
                  border: `1px solid ${clr.border}`,
                  borderRadius: 12,
                  padding: "16px 18px",
                  marginBottom: 24,
                  textAlign: "left",
                }}
              >
                <div
                  style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
                >
                  <FaClock
                    style={{
                      color: clr.blue,
                      fontSize: 15,
                      marginTop: 2,
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <p
                      style={{
                        margin: "0 0 8px",
                        fontSize: 13,
                        fontWeight: 700,
                        color: clr.navy,
                      }}
                    >
                      What happens next?
                    </p>
                    {[
                      "Team reviews documents within 24 hours",
                      "You receive a confirmation notification",
                      "Track status anytime in your profile",
                    ].map((step, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          gap: 8,
                          marginBottom: i < 2 ? 6 : 0,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 700,
                            color: clr.blue,
                          }}
                        >
                          0{i + 1}
                        </span>
                        <span style={{ fontSize: 12, color: clr.slate }}>
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate("/profiledetails")}
                style={{
                  width: "100%",
                  padding: "13px 24px",
                  background:
                    "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  letterSpacing: "0.01em",
                  boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-2px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                View My Bookings
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default UploadDocuments;
