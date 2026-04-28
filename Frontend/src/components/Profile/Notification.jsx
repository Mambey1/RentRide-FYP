// // // // // import React, { useState, useEffect } from "react";
// // // // // import { useNavigate } from "react-router-dom";
// // // // // import {
// // // // //   FaBell,
// // // // //   FaCheckCircle,
// // // // //   FaTimesCircle,
// // // // //   FaInfoCircle,
// // // // //   FaCar,
// // // // //   FaEnvelope,
// // // // //   FaTimes,
// // // // //   FaTrash,
// // // // //   FaWallet,
// // // // //   FaCreditCard,
// // // // //   FaSpinner,
// // // // // } from "react-icons/fa";
// // // // // // import useNotifications from "../../hooks/useNotifications";
// // // // // import { useNotifications } from "../../hooks/useNotifications";

// // // // // const Notification = () => {
// // // // //   const navigate = useNavigate();
// // // // //   const [isOpen, setIsOpen] = useState(false);
// // // // //   const {
// // // // //     notifications,
// // // // //     unreadCount,
// // // // //     loading,
// // // // //     markAsRead,
// // // // //     markAllAsRead,
// // // // //     deleteNotification,
// // // // //     fetchNotifications,
// // // // //   } = useNotifications();

// // // // //   // Fetch notifications when component mounts
// // // // //   useEffect(() => {
// // // // //     fetchNotifications();
// // // // //   }, [fetchNotifications]);

// // // // //   const getNotificationIcon = (type, action) => {
// // // // //     // Check if it's a payment notification
// // // // //     if (action?.type === "payment") {
// // // // //       return <FaWallet className="text-purple-500" />;
// // // // //     }

// // // // //     switch (type) {
// // // // //       case "success":
// // // // //         return <FaCheckCircle className="text-green-500" />;
// // // // //       case "error":
// // // // //         return <FaTimesCircle className="text-red-500" />;
// // // // //       case "warning":
// // // // //         return <FaInfoCircle className="text-yellow-500" />;
// // // // //       case "booking":
// // // // //         return <FaCar className="text-blue-500" />;
// // // // //       case "payment":
// // // // //         return <FaCreditCard className="text-purple-500" />;
// // // // //       default:
// // // // //         return <FaEnvelope className="text-gray-500" />;
// // // // //     }
// // // // //   };

// // // // //   const getNotificationBg = (type, read, action) => {
// // // // //     if (read) return "bg-white border-gray-200";

// // // // //     // Unread notifications have colored backgrounds
// // // // //     if (action?.type === "payment") {
// // // // //       return "bg-purple-50 border-purple-200";
// // // // //     }

// // // // //     switch (type) {
// // // // //       case "success":
// // // // //         return "bg-green-50 border-green-200";
// // // // //       case "error":
// // // // //         return "bg-red-50 border-red-200";
// // // // //       case "warning":
// // // // //         return "bg-yellow-50 border-yellow-200";
// // // // //       case "booking":
// // // // //         return "bg-blue-50 border-blue-200";
// // // // //       case "payment":
// // // // //         return "bg-purple-50 border-purple-200";
// // // // //       default:
// // // // //         return "bg-gray-50 border-gray-200";
// // // // //     }
// // // // //   };

// // // // //   const formatTime = (date) => {
// // // // //     if (!date) return "Just now";

// // // // //     const now = new Date();
// // // // //     const notificationDate = new Date(date);
// // // // //     const diffMs = now - notificationDate;
// // // // //     const diffMins = Math.floor(diffMs / 60000);
// // // // //     const diffHours = Math.floor(diffMs / 3600000);
// // // // //     const diffDays = Math.floor(diffMs / 86400000);

// // // // //     if (diffMins < 1) return "Just now";
// // // // //     if (diffMins < 60) return `${diffMins} min ago`;
// // // // //     if (diffHours < 24)
// // // // //       return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
// // // // //     if (diffDays === 1) return "Yesterday";
// // // // //     if (diffDays < 7) return `${diffDays} days ago`;
// // // // //     return notificationDate.toLocaleDateString();
// // // // //   };

// // // // //   const handleNotificationClick = async (notification) => {
// // // // //     // Mark as read first if not already read
// // // // //     if (!notification.read) {
// // // // //       await markAsRead(notification._id);
// // // // //     }

// // // // //     // Close dropdown
// // // // //     setIsOpen(false);

// // // // //     // Handle action based on notification type and action
// // // // //     if (notification.action) {
// // // // //       // Handle payment action
// // // // //       if (notification.action.type === "payment") {
// // // // //         const bookingId =
// // // // //           notification.metadata?.bookingId ||
// // // // //           notification.action.data?.bookingId;
// // // // //         if (bookingId) {
// // // // //           navigate(`/payment/${bookingId}`);
// // // // //         } else {
// // // // //           navigate("/payment");
// // // // //         }
// // // // //       }
// // // // //       // Handle booking action
// // // // //       else if (notification.action.type === "booking") {
// // // // //         const bookingId = notification.metadata?.bookingId;
// // // // //         if (bookingId) {
// // // // //           navigate(`/booking/confirmation/${bookingId}`);
// // // // //         }
// // // // //       }
// // // // //       // Handle custom path navigation
// // // // //       else if (notification.action.path) {
// // // // //         navigate(notification.action.path);
// // // // //       }
// // // // //     }
// // // // //     // Fallback: if no action but has metadata with bookingId
// // // // //     else if (notification.metadata?.bookingId) {
// // // // //       navigate(`/payment/${notification.metadata.bookingId}`);
// // // // //     }
// // // // //     // Handle chat action
// // // // //     if (notification.action?.type === "chat") {
// // // // //       const chatId = notification.metadata?.chatId;
// // // // //       if (chatId) {
// // // // //         // Navigate to profile with messages tab open and select the chat
// // // // //         const currentPath = window.location.pathname;
// // // // //         if (currentPath === "/profiledetails") {
// // // // //           // Already on profile page, just switch to messages and open chat
// // // // //           window.dispatchEvent(
// // // // //             new CustomEvent("openChat", { detail: { chatId } }),
// // // // //           );
// // // // //         } else {
// // // // //           navigate(`/profiledetails?tab=messages&chat=${chatId}`);
// // // // //         }
// // // // //       }
// // // // //     }
// // // // //   };

// // // // //   const handleDelete = async (e, notificationId) => {
// // // // //     e.stopPropagation();
// // // // //     await deleteNotification(notificationId);
// // // // //   };

// // // // //   const handleMarkAllRead = async () => {
// // // // //     await markAllAsRead();
// // // // //   };

// // // // //   const handleBellClick = () => {
// // // // //     setIsOpen(!isOpen);
// // // // //     // Refresh notifications when opening
// // // // //     if (!isOpen) {
// // // // //       fetchNotifications();
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="relative">
// // // // //       {/* Bell Icon */}
// // // // //       <button
// // // // //         onClick={handleBellClick}
// // // // //         className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
// // // // //         aria-label="Notifications"
// // // // //       >
// // // // //         <FaBell className="text-xl text-gray-600" />
// // // // //         {unreadCount > 0 && (
// // // // //           <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full animate-pulse">
// // // // //             {unreadCount > 9 ? "9+" : unreadCount}
// // // // //           </span>
// // // // //         )}
// // // // //       </button>

// // // // //       {/* Notification Dropdown */}
// // // // //       {isOpen && (
// // // // //         <>
// // // // //           <div
// // // // //             className="fixed inset-0 z-40"
// // // // //             onClick={() => setIsOpen(false)}
// // // // //           ></div>
// // // // //           <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl z-50 border border-gray-200 overflow-hidden">
// // // // //             {/* Header */}
// // // // //             <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
// // // // //               <div>
// // // // //                 <h3 className="text-lg font-semibold text-gray-900">
// // // // //                   Notifications
// // // // //                 </h3>
// // // // //                 <p className="text-xs text-gray-500">
// // // // //                   You have {unreadCount} unread{" "}
// // // // //                   {unreadCount === 1 ? "notification" : "notifications"}
// // // // //                 </p>
// // // // //               </div>
// // // // //               <button
// // // // //                 onClick={() => setIsOpen(false)}
// // // // //                 className="text-gray-400 hover:text-gray-600 transition-colors"
// // // // //               >
// // // // //                 <FaTimes />
// // // // //               </button>
// // // // //             </div>

// // // // //             {/* Notification List */}
// // // // //             <div className="max-h-96 overflow-y-auto">
// // // // //               {loading ? (
// // // // //                 <div className="p-8 text-center">
// // // // //                   <FaSpinner className="w-8 h-8 text-purple-600 animate-spin mx-auto mb-3" />
// // // // //                   <p className="text-gray-500">Loading notifications...</p>
// // // // //                 </div>
// // // // //               ) : notifications && notifications.length > 0 ? (
// // // // //                 notifications.map((notification) => (
// // // // //                   <div
// // // // //                     key={notification._id || notification.id}
// // // // //                     className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-all cursor-pointer ${
// // // // //                       !notification.read
// // // // //                         ? getNotificationBg(
// // // // //                             notification.type,
// // // // //                             notification.read,
// // // // //                             notification.action,
// // // // //                           )
// // // // //                         : ""
// // // // //                     }`}
// // // // //                     onClick={() => handleNotificationClick(notification)}
// // // // //                   >
// // // // //                     <div className="flex items-start gap-3">
// // // // //                       <div className="flex-shrink-0 mt-1">
// // // // //                         {getNotificationIcon(
// // // // //                           notification.type,
// // // // //                           notification.action,
// // // // //                         )}
// // // // //                       </div>
// // // // //                       <div className="flex-1 min-w-0">
// // // // //                         <div className="flex items-center justify-between gap-2 mb-1">
// // // // //                           <h4
// // // // //                             className={`text-sm font-semibold truncate ${
// // // // //                               !notification.read
// // // // //                                 ? "text-gray-900"
// // // // //                                 : "text-gray-600"
// // // // //                             }`}
// // // // //                           >
// // // // //                             {notification.title}
// // // // //                           </h4>
// // // // //                           <span className="text-xs text-gray-400 flex-shrink-0">
// // // // //                             {formatTime(notification.createdAt)}
// // // // //                           </span>
// // // // //                         </div>
// // // // //                         <p className="text-sm text-gray-600 break-words">
// // // // //                           {notification.message}
// // // // //                         </p>
// // // // //                         {notification.details && (
// // // // //                           <p className="text-xs text-gray-500 mt-1">
// // // // //                             {notification.details}
// // // // //                           </p>
// // // // //                         )}
// // // // //                         {notification.action?.type === "payment" && (
// // // // //                           <div className="mt-2">
// // // // //                             <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-purple-700 bg-purple-100 rounded-full">
// // // // //                               <FaWallet className="mr-1 text-xs" />
// // // // //                               Click to Pay Now
// // // // //                             </span>
// // // // //                           </div>
// // // // //                         )}
// // // // //                         {notification.metadata?.amount && (
// // // // //                           <p className="text-xs font-semibold text-purple-600 mt-1">
// // // // //                             Amount: रु{" "}
// // // // //                             {notification.metadata.amount.toLocaleString()}
// // // // //                           </p>
// // // // //                         )}
// // // // //                       </div>
// // // // //                       <button
// // // // //                         onClick={(e) =>
// // // // //                           handleDelete(e, notification._id || notification.id)
// // // // //                         }
// // // // //                         className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
// // // // //                         aria-label="Delete notification"
// // // // //                       >
// // // // //                         <FaTrash size={12} />
// // // // //                       </button>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 ))
// // // // //               ) : (
// // // // //                 <div className="p-8 text-center">
// // // // //                   <FaBell className="text-4xl text-gray-300 mx-auto mb-3" />
// // // // //                   <p className="text-gray-500">No notifications yet</p>
// // // // //                   <p className="text-xs text-gray-400 mt-1">
// // // // //                     You'll see notifications here when you have updates
// // // // //                   </p>
// // // // //                 </div>
// // // // //               )}
// // // // //             </div>

// // // // //             {/* Footer */}
// // // // //             {notifications && notifications.length > 0 && (
// // // // //               <div className="p-3 border-t border-gray-200 bg-gray-50">
// // // // //                 <button
// // // // //                   onClick={handleMarkAllRead}
// // // // //                   className="w-full text-center text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors"
// // // // //                 >
// // // // //                   Mark all as read
// // // // //                 </button>
// // // // //               </div>
// // // // //             )}
// // // // //           </div>
// // // // //         </>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default Notification;
// // // // import React, { useState, useEffect, useRef } from "react";
// // // // import { useNavigate } from "react-router-dom";
// // // // import {
// // // //   FaBell,
// // // //   FaCheckCircle,
// // // //   FaTimesCircle,
// // // //   FaInfoCircle,
// // // //   FaCar,
// // // //   FaEnvelope,
// // // //   FaTimes,
// // // //   FaTrash,
// // // //   FaWallet,
// // // //   FaCreditCard,
// // // //   FaSpinner,
// // // //   FaCommentAlt,
// // // //   FaCheck,
// // // //   FaCheckDouble,
// // // // } from "react-icons/fa";
// // // // import { useNotifications } from "../../hooks/useNotifications";

// // // // // ─── Toast Notification Component ────────────────────────────────────────────
// // // // export const ChatToast = ({ toast, onDismiss, onNavigate }) => {
// // // //   const [exiting, setExiting] = useState(false);

// // // //   const handleDismiss = () => {
// // // //     setExiting(true);
// // // //     setTimeout(() => onDismiss(toast.id), 300);
// // // //   };

// // // //   const handleClick = () => {
// // // //     setExiting(true);
// // // //     setTimeout(() => {
// // // //       onDismiss(toast.id);
// // // //       onNavigate(toast.chatId);
// // // //     }, 150);
// // // //   };

// // // //   return (
// // // //     <div
// // // //       className={`flex items-start gap-3 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 w-80 cursor-pointer transition-all duration-300 ${
// // // //         exiting ? "opacity-0 translate-x-full" : "opacity-100 translate-x-0"
// // // //       }`}
// // // //       style={{
// // // //         animation: exiting ? "none" : "slideInRight 0.3s ease-out",
// // // //       }}
// // // //       onClick={handleClick}
// // // //     >
// // // //       {/* Avatar / Icon */}
// // // //       <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
// // // //         <FaCommentAlt className="text-white text-sm" />
// // // //       </div>

// // // //       {/* Content */}
// // // //       <div className="flex-1 min-w-0">
// // // //         <div className="flex items-center justify-between gap-2 mb-0.5">
// // // //           <p className="text-sm font-semibold text-gray-900 truncate">
// // // //             {toast.from}
// // // //           </p>
// // // //           <button
// // // //             onClick={(e) => {
// // // //               e.stopPropagation();
// // // //               handleDismiss();
// // // //             }}
// // // //             className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors p-0.5 rounded-full hover:bg-gray-100"
// // // //           >
// // // //             <FaTimes size={10} />
// // // //           </button>
// // // //         </div>
// // // //         {toast.vehicleName && (
// // // //           <p className="text-xs text-indigo-500 font-medium mb-0.5 flex items-center gap-1">
// // // //             <FaCar size={10} />
// // // //             {toast.vehicleName}
// // // //           </p>
// // // //         )}
// // // //         <p className="text-sm text-gray-600 truncate">{toast.message}</p>
// // // //         <p className="text-xs text-gray-400 mt-1">Tap to reply →</p>
// // // //       </div>

// // // //       {/* Progress bar */}
// // // //       <div
// // // //         className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-b-2xl"
// // // //         style={{ animation: "shrink 5s linear forwards" }}
// // // //       />

// // // //       <style>{`
// // // //         @keyframes slideInRight {
// // // //           from { opacity: 0; transform: translateX(100%); }
// // // //           to { opacity: 1; transform: translateX(0); }
// // // //         }
// // // //         @keyframes shrink {
// // // //           from { width: 100%; }
// // // //           to { width: 0%; }
// // // //         }
// // // //       `}</style>
// // // //     </div>
// // // //   );
// // // // };

// // // // // ─── Toast Container ──────────────────────────────────────────────────────────
// // // // export const ToastContainer = ({ toasts, dismissToast, socket }) => {
// // // //   const navigate = useNavigate();

// // // //   const handleNavigate = (chatId) => {
// // // //     const currentPath = window.location.pathname;
// // // //     if (currentPath === "/profiledetails") {
// // // //       window.dispatchEvent(new CustomEvent("openChat", { detail: { chatId } }));
// // // //     } else {
// // // //       navigate(`/profiledetails?tab=messages&chat=${chatId}`);
// // // //     }
// // // //   };

// // // //   if (!toasts || toasts.length === 0) return null;

// // // //   return (
// // // //     <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 items-end pointer-events-none">
// // // //       {toasts.map((toast) => (
// // // //         <div key={toast.id} className="pointer-events-auto relative overflow-hidden">
// // // //           <ChatToast
// // // //             toast={toast}
// // // //             onDismiss={dismissToast}
// // // //             onNavigate={handleNavigate}
// // // //           />
// // // //         </div>
// // // //       ))}
// // // //     </div>
// // // //   );
// // // // };

// // // // // ─── Notification Bell + Dropdown ─────────────────────────────────────────────
// // // // const Notification = ({ socket }) => {
// // // //   const navigate = useNavigate();
// // // //   const [isOpen, setIsOpen] = useState(false);
// // // //   const dropdownRef = useRef(null);

// // // //   const {
// // // //     notifications,
// // // //     unreadCount,
// // // //     loading,
// // // //     markAsRead,
// // // //     markAllAsRead,
// // // //     deleteNotification,
// // // //     fetchNotifications,
// // // //     toasts,
// // // //     dismissToast,
// // // //   } = useNotifications(socket);

// // // //   // Close on outside click
// // // //   useEffect(() => {
// // // //     const handleClickOutside = (e) => {
// // // //       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
// // // //         setIsOpen(false);
// // // //       }
// // // //     };
// // // //     document.addEventListener("mousedown", handleClickOutside);
// // // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     fetchNotifications();
// // // //   }, [fetchNotifications]);

// // // //   // ── Icon helpers ───────────────────────────────────────────────────────────
// // // //   const getIcon = (type, action) => {
// // // //     if (action?.type === "payment" || type === "payment")
// // // //       return (
// // // //         <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
// // // //           <FaWallet className="text-purple-600 text-xs" />
// // // //         </div>
// // // //       );
// // // //     if (type === "chat")
// // // //       return (
// // // //         <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
// // // //           <FaCommentAlt className="text-indigo-600 text-xs" />
// // // //         </div>
// // // //       );
// // // //     if (type === "booking")
// // // //       return (
// // // //         <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
// // // //           <FaCar className="text-blue-600 text-xs" />
// // // //         </div>
// // // //       );
// // // //     if (type === "success")
// // // //       return (
// // // //         <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
// // // //           <FaCheckCircle className="text-green-600 text-xs" />
// // // //         </div>
// // // //       );
// // // //     if (type === "error")
// // // //       return (
// // // //         <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
// // // //           <FaTimesCircle className="text-red-600 text-xs" />
// // // //         </div>
// // // //       );
// // // //     if (type === "warning")
// // // //       return (
// // // //         <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
// // // //           <FaInfoCircle className="text-amber-600 text-xs" />
// // // //         </div>
// // // //       );
// // // //     return (
// // // //       <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
// // // //         <FaEnvelope className="text-gray-500 text-xs" />
// // // //       </div>
// // // //     );
// // // //   };

// // // //   const getAccentClass = (type, read, action) => {
// // // //     if (read) return "";
// // // //     if (action?.type === "payment" || type === "payment")
// // // //       return "border-l-4 border-l-purple-400 bg-purple-50";
// // // //     if (type === "chat") return "border-l-4 border-l-indigo-400 bg-indigo-50";
// // // //     if (type === "booking") return "border-l-4 border-l-blue-400 bg-blue-50";
// // // //     if (type === "success") return "border-l-4 border-l-green-400 bg-green-50";
// // // //     if (type === "error") return "border-l-4 border-l-red-400 bg-red-50";
// // // //     if (type === "warning") return "border-l-4 border-l-amber-400 bg-amber-50";
// // // //     return "border-l-4 border-l-gray-300 bg-gray-50";
// // // //   };

// // // //   const formatTime = (date) => {
// // // //     if (!date) return "Just now";
// // // //     const now = new Date();
// // // //     const d = new Date(date);
// // // //     const diffMs = now - d;
// // // //     const mins = Math.floor(diffMs / 60000);
// // // //     const hours = Math.floor(diffMs / 3600000);
// // // //     const days = Math.floor(diffMs / 86400000);
// // // //     if (mins < 1) return "Just now";
// // // //     if (mins < 60) return `${mins}m ago`;
// // // //     if (hours < 24) return `${hours}h ago`;
// // // //     if (days === 1) return "Yesterday";
// // // //     if (days < 7) return `${days}d ago`;
// // // //     return d.toLocaleDateString();
// // // //   };

// // // //   // ── Navigation ─────────────────────────────────────────────────────────────
// // // //   const handleNotificationClick = async (notification) => {
// // // //     if (!notification.read) await markAsRead(notification._id || notification.id);
// // // //     setIsOpen(false);

// // // //     if (notification.action) {
// // // //       if (notification.action.type === "payment") {
// // // //         const bookingId =
// // // //           notification.metadata?.bookingId ||
// // // //           notification.action.data?.bookingId;
// // // //         navigate(bookingId ? `/payment/${bookingId}` : "/payment");
// // // //         return;
// // // //       }
// // // //       if (notification.action.type === "booking") {
// // // //         const bookingId = notification.metadata?.bookingId;
// // // //         if (bookingId) { navigate(`/booking/confirmation/${bookingId}`); return; }
// // // //       }
// // // //       if (notification.action.type === "chat") {
// // // //         const chatId = notification.metadata?.chatId;
// // // //         if (chatId) {
// // // //           const currentPath = window.location.pathname;
// // // //           if (currentPath === "/profiledetails") {
// // // //             window.dispatchEvent(new CustomEvent("openChat", { detail: { chatId } }));
// // // //           } else {
// // // //             navigate(`/profiledetails?tab=messages&chat=${chatId}`);
// // // //           }
// // // //           return;
// // // //         }
// // // //       }
// // // //       if (notification.action.path) {
// // // //         navigate(notification.action.path);
// // // //         return;
// // // //       }
// // // //     }
// // // //     if (notification.metadata?.bookingId) {
// // // //       navigate(`/payment/${notification.metadata.bookingId}`);
// // // //     }
// // // //   };

// // // //   const handleDelete = async (e, id) => {
// // // //     e.stopPropagation();
// // // //     await deleteNotification(id);
// // // //   };

// // // //   const handleBellClick = () => {
// // // //     setIsOpen((prev) => !prev);
// // // //     if (!isOpen) fetchNotifications();
// // // //   };

// // // //   const handleNavigate = (chatId) => {
// // // //     const currentPath = window.location.pathname;
// // // //     if (currentPath === "/profiledetails") {
// // // //       window.dispatchEvent(new CustomEvent("openChat", { detail: { chatId } }));
// // // //     } else {
// // // //       navigate(`/profiledetails?tab=messages&chat=${chatId}`);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <>
// // // //       {/* ── Toast Container ────────────────────────────────────────────────── */}
// // // //       <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 items-end pointer-events-none">
// // // //         {toasts.map((toast) => (
// // // //           <div key={toast.id} className="pointer-events-auto relative overflow-hidden">
// // // //             <ChatToast
// // // //               toast={toast}
// // // //               onDismiss={dismissToast}
// // // //               onNavigate={handleNavigate}
// // // //             />
// // // //           </div>
// // // //         ))}
// // // //       </div>

// // // //       {/* ── Bell Button + Dropdown ─────────────────────────────────────────── */}
// // // //       <div className="relative" ref={dropdownRef}>
// // // //         <button
// // // //           onClick={handleBellClick}
// // // //           className={`relative p-2.5 rounded-xl transition-all duration-200 ${
// // // //             isOpen
// // // //               ? "bg-indigo-50 text-indigo-600"
// // // //               : "hover:bg-gray-100 text-gray-600"
// // // //           }`}
// // // //           aria-label="Notifications"
// // // //         >
// // // //           <FaBell className={`text-xl transition-transform duration-200 ${isOpen ? "rotate-12" : ""}`} />
// // // //           {unreadCount > 0 && (
// // // //             <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-red-500 rounded-full flex items-center justify-center shadow-sm">
// // // //               {unreadCount > 99 ? "99+" : unreadCount}
// // // //             </span>
// // // //           )}
// // // //         </button>

// // // //         {isOpen && (
// // // //           <div className="absolute right-0 mt-2 w-[380px] bg-white rounded-2xl shadow-2xl z-50 border border-gray-100 overflow-hidden">
// // // //             {/* Header */}
// // // //             <div className="px-5 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-between">
// // // //               <div>
// // // //                 <h3 className="text-base font-bold text-white flex items-center gap-2">
// // // //                   <FaBell className="text-white/80" />
// // // //                   Notifications
// // // //                 </h3>
// // // //                 <p className="text-xs text-white/70 mt-0.5">
// // // //                   {unreadCount > 0
// // // //                     ? `${unreadCount} unread message${unreadCount !== 1 ? "s" : ""}`
// // // //                     : "All caught up!"}
// // // //                 </p>
// // // //               </div>
// // // //               <div className="flex items-center gap-2">
// // // //                 {unreadCount > 0 && (
// // // //                   <button
// // // //                     onClick={markAllAsRead}
// // // //                     className="text-xs text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-full flex items-center gap-1 transition-colors"
// // // //                     title="Mark all as read"
// // // //                   >
// // // //                     <FaCheckDouble size={10} />
// // // //                     All read
// // // //                   </button>
// // // //                 )}
// // // //                 <button
// // // //                   onClick={() => setIsOpen(false)}
// // // //                   className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-colors"
// // // //                 >
// // // //                   <FaTimes size={12} />
// // // //                 </button>
// // // //               </div>
// // // //             </div>

// // // //             {/* List */}
// // // //             <div className="max-h-[420px] overflow-y-auto divide-y divide-gray-50">
// // // //               {loading ? (
// // // //                 <div className="py-12 text-center">
// // // //                   <div className="w-10 h-10 rounded-full border-2 border-indigo-200 border-t-indigo-600 animate-spin mx-auto mb-3" />
// // // //                   <p className="text-sm text-gray-500">Loading notifications…</p>
// // // //                 </div>
// // // //               ) : notifications && notifications.length > 0 ? (
// // // //                 notifications.map((n) => (
// // // //                   <div
// // // //                     key={n._id || n.id}
// // // //                     className={`flex items-start gap-3 px-4 py-3.5 cursor-pointer hover:bg-gray-50 transition-colors ${getAccentClass(
// // // //                       n.type,
// // // //                       n.read,
// // // //                       n.action
// // // //                     )}`}
// // // //                     onClick={() => handleNotificationClick(n)}
// // // //                   >
// // // //                     {getIcon(n.type, n.action)}

// // // //                     <div className="flex-1 min-w-0">
// // // //                       <div className="flex items-start justify-between gap-2">
// // // //                         <p
// // // //                           className={`text-sm leading-tight ${
// // // //                             !n.read
// // // //                               ? "font-semibold text-gray-900"
// // // //                               : "font-medium text-gray-600"
// // // //                           }`}
// // // //                         >
// // // //                           {n.title}
// // // //                         </p>
// // // //                         <span className="text-[10px] text-gray-400 flex-shrink-0 mt-0.5">
// // // //                           {formatTime(n.createdAt)}
// // // //                         </span>
// // // //                       </div>
// // // //                       <p className="text-xs text-gray-500 mt-0.5 leading-relaxed line-clamp-2">
// // // //                         {n.message}
// // // //                       </p>
// // // //                       {n.metadata?.amount && (
// // // //                         <span className="inline-flex items-center gap-1 mt-1.5 text-[11px] font-semibold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
// // // //                           <FaWallet size={9} />
// // // //                           रु {n.metadata.amount.toLocaleString()}
// // // //                         </span>
// // // //                       )}
// // // //                       {n.action?.type === "payment" && (
// // // //                         <span className="inline-flex items-center gap-1 mt-1.5 text-[11px] font-medium text-purple-600 underline underline-offset-2">
// // // //                           Pay now →
// // // //                         </span>
// // // //                       )}
// // // //                     </div>

// // // //                     <div className="flex flex-col items-center gap-2 flex-shrink-0">
// // // //                       {!n.read && (
// // // //                         <span className="w-2 h-2 rounded-full bg-indigo-500" />
// // // //                       )}
// // // //                       <button
// // // //                         onClick={(e) => handleDelete(e, n._id || n.id)}
// // // //                         className="text-gray-300 hover:text-red-400 transition-colors p-0.5 rounded hover:bg-red-50"
// // // //                         aria-label="Delete"
// // // //                       >
// // // //                         <FaTrash size={10} />
// // // //                       </button>
// // // //                     </div>
// // // //                   </div>
// // // //                 ))
// // // //               ) : (
// // // //                 <div className="py-14 text-center">
// // // //                   <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
// // // //                     <FaBell className="text-2xl text-gray-300" />
// // // //                   </div>
// // // //                   <p className="text-sm font-medium text-gray-600">No notifications yet</p>
// // // //                   <p className="text-xs text-gray-400 mt-1">
// // // //                     We'll let you know when something happens
// // // //                   </p>
// // // //                 </div>
// // // //               )}
// // // //             </div>

// // // //             {/* Footer */}
// // // //             {notifications && notifications.length > 0 && (
// // // //               <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
// // // //                 <p className="text-xs text-gray-400">
// // // //                   {notifications.length} notification{notifications.length !== 1 ? "s" : ""}
// // // //                 </p>
// // // //                 <button
// // // //                   onClick={markAllAsRead}
// // // //                   className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1 transition-colors"
// // // //                 >
// // // //                   <FaCheck size={9} />
// // // //                   Mark all read
// // // //                 </button>
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </>
// // // //   );
// // // // };

// // // // export default Notification;

// // // import React, { useState, useEffect, useRef } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import {
// // //   FaBell,
// // //   FaCheckCircle,
// // //   FaTimesCircle,
// // //   FaInfoCircle,
// // //   FaCar,
// // //   FaEnvelope,
// // //   FaTimes,
// // //   FaTrash,
// // //   FaWallet,
// // //   FaCommentAlt,
// // //   FaCheck,
// // //   FaCheckDouble,
// // // } from "react-icons/fa";
// // // import { useNotifications } from "../../hooks/useNotifications";

// // // // ─── Notification Sound ───────────────────────────────────────────────────────
// // // const playNotificationSound = () => {
// // //   try {
// // //     const audio = new Audio("/src/assets/notificationSound/notification.mp3");
// // //     audio.volume = 0.5;
// // //     audio.play().catch(() => {});
// // //   } catch (_) {}
// // // };

// // // // ─── Sender Avatar ────────────────────────────────────────────────────────────
// // // const SenderAvatar = ({ photo, name, size = "w-12 h-12" }) => {
// // //   const [imgError, setImgError] = useState(false);
// // //   const initials = name
// // //     ? name
// // //         .split(" ")
// // //         .map((w) => w[0])
// // //         .join("")
// // //         .toUpperCase()
// // //         .slice(0, 2)
// // //     : "?";

// // //   if (photo && !imgError) {
// // //     const src = photo.startsWith("http")
// // //       ? photo
// // //       : `http://localhost:5000${photo}`;
// // //     return (
// // //       <img
// // //         src={src}
// // //         alt={name}
// // //         className={`${size} rounded-full object-cover ring-2 ring-white shadow-md flex-shrink-0`}
// // //         onError={() => setImgError(true)}
// // //       />
// // //     );
// // //   }
// // //   return (
// // //     <div
// // //       className={`${size} rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 ring-2 ring-white shadow-md`}
// // //     >
// // //       <span className="text-white text-sm font-bold">{initials}</span>
// // //     </div>
// // //   );
// // // };

// // // // ─── Single Toast Card ────────────────────────────────────────────────────────
// // // export const ChatToast = ({ toast, onDismiss, onNavigate }) => {
// // //   const [exiting, setExiting] = useState(false);

// // //   useEffect(() => {
// // //     playNotificationSound();
// // //   }, []);

// // //   const dismiss = (e) => {
// // //     if (e) e.stopPropagation();
// // //     setExiting(true);
// // //     setTimeout(() => onDismiss(toast.id), 280);
// // //   };

// // //   const handleReply = (e) => {
// // //     e.stopPropagation();
// // //     setExiting(true);
// // //     setTimeout(() => {
// // //       onDismiss(toast.id);
// // //       onNavigate(toast.chatId);
// // //     }, 150);
// // //   };

// // //   return (
// // //     <div
// // //       className={`relative w-[340px] bg-white rounded-2xl overflow-hidden transition-all duration-[280ms] ease-in-out ${
// // //         exiting
// // //           ? "opacity-0 translate-y-3 scale-95"
// // //           : "opacity-100 translate-y-0 scale-100"
// // //       }`}
// // //       style={{
// // //         boxShadow:
// // //           "0 12px 40px rgba(99,102,241,0.20), 0 2px 10px rgba(0,0,0,0.08)",
// // //         animation: exiting
// // //           ? "none"
// // //           : "toastUp 0.38s cubic-bezier(0.34,1.56,0.64,1) forwards",
// // //       }}
// // //     >
// // //       {/* Rainbow top accent */}
// // //       <div className="h-[3px] w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

// // //       <div className="px-4 pt-3 pb-4">
// // //         {/* Row: avatar + name + close */}
// // //         <div className="flex items-start gap-3">
// // //           <div className="relative flex-shrink-0 mt-0.5">
// // //             <SenderAvatar
// // //               photo={toast.senderPhoto}
// // //               name={toast.from}
// // //               size="w-10 h-10"
// // //             />
// // //             <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full shadow-sm" />
// // //           </div>

// // //           <div className="flex-1 min-w-0">
// // //             <div className="flex items-center justify-between gap-2">
// // //               <div className="flex items-center gap-1.5 min-w-0">
// // //                 <span className="text-[13px] font-bold text-gray-900 truncate">
// // //                   {toast.from}
// // //                 </span>
// // //                 <span className="flex-shrink-0 text-[9px] font-semibold text-green-600 bg-green-50 border border-green-100 px-1.5 py-0.5 rounded-full">
// // //                   online
// // //                 </span>
// // //               </div>
// // //               <button
// // //                 onClick={dismiss}
// // //                 className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 hover:bg-red-50 hover:text-red-400 text-gray-400 flex items-center justify-center transition-colors"
// // //               >
// // //                 <FaTimes size={8} />
// // //               </button>
// // //             </div>

// // //             {toast.vehicleName && (
// // //               <p className="text-[11px] text-indigo-500 font-medium flex items-center gap-1 mt-0.5">
// // //                 <FaCar size={9} />
// // //                 <span className="truncate">{toast.vehicleName}</span>
// // //               </p>
// // //             )}
// // //           </div>
// // //         </div>

// // //         {/* Message bubble */}
// // //         <div className="mt-2.5 ml-[52px] px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl rounded-tl-sm">
// // //           <p className="text-sm text-gray-700 line-clamp-2 leading-relaxed">
// // //             {toast.message}
// // //           </p>
// // //         </div>

// // //         {/* Reply CTA */}
// // //         <button
// // //           onClick={handleReply}
// // //           className="mt-3 ml-[52px] w-[calc(100%-52px)] flex items-center justify-center gap-2 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-[13px] font-semibold rounded-xl transition-all duration-150 shadow-sm hover:shadow-md active:scale-[0.97]"
// // //         >
// // //           <FaCommentAlt size={10} />
// // //           Reply to {toast.from.split(" ")[0]}
// // //         </button>
// // //       </div>

// // //       {/* Countdown bar */}
// // //       <div
// // //         className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-indigo-400 to-purple-500"
// // //         style={{ animation: "toastShrink 5s linear forwards" }}
// // //       />

// // //       <style>{`
// // //         @keyframes toastUp {
// // //           from { opacity: 0; transform: translateY(20px) scale(0.94); }
// // //           to   { opacity: 1; transform: translateY(0)   scale(1); }
// // //         }
// // //         @keyframes toastShrink {
// // //           from { width: 100%; }
// // //           to   { width: 0%; }
// // //         }
// // //       `}</style>
// // //     </div>
// // //   );
// // // };

// // // // ─── Toast Container — fixed bottom-center ────────────────────────────────────
// // // export const ToastContainer = ({ toasts, dismissToast }) => {
// // //   const navigate = useNavigate();

// // //   const handleNavigate = (chatId) => {
// // //     if (window.location.pathname === "/profiledetails") {
// // //       window.dispatchEvent(new CustomEvent("openChat", { detail: { chatId } }));
// // //     } else {
// // //       navigate(`/profiledetails?tab=messages&chat=${chatId}`);
// // //     }
// // //   };

// // //   if (!toasts || toasts.length === 0) return null;

// // //   return (
// // //     <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col-reverse gap-3 items-center pointer-events-none">
// // //       {toasts.map((toast) => (
// // //         <div key={toast.id} className="pointer-events-auto">
// // //           <ChatToast
// // //             toast={toast}
// // //             onDismiss={dismissToast}
// // //             onNavigate={handleNavigate}
// // //           />
// // //         </div>
// // //       ))}
// // //     </div>
// // //   );
// // // };

// // // // ─── Notification Bell + Dropdown ─────────────────────────────────────────────
// // // const Notification = ({ socket }) => {
// // //   const navigate = useNavigate();
// // //   const [isOpen, setIsOpen] = useState(false);
// // //   const dropdownRef = useRef(null);

// // //   const {
// // //     notifications,
// // //     unreadCount,
// // //     loading,
// // //     markAsRead,
// // //     markAllAsRead,
// // //     deleteNotification,
// // //     fetchNotifications,
// // //     toasts,
// // //     dismissToast,
// // //   } = useNotifications(socket);

// // //   useEffect(() => {
// // //     const handleClickOutside = (e) => {
// // //       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
// // //         setIsOpen(false);
// // //       }
// // //     };
// // //     document.addEventListener("mousedown", handleClickOutside);
// // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // //   }, []);

// // //   useEffect(() => {
// // //     fetchNotifications();
// // //   }, [fetchNotifications]);

// // //   const getIcon = (type, action) => {
// // //     if (action?.type === "payment" || type === "payment")
// // //       return (
// // //         <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
// // //           <FaWallet className="text-purple-600 text-xs" />
// // //         </div>
// // //       );
// // //     if (type === "chat")
// // //       return (
// // //         <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
// // //           <FaCommentAlt className="text-indigo-600 text-xs" />
// // //         </div>
// // //       );
// // //     if (type === "booking")
// // //       return (
// // //         <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
// // //           <FaCar className="text-blue-600 text-xs" />
// // //         </div>
// // //       );
// // //     if (type === "success")
// // //       return (
// // //         <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
// // //           <FaCheckCircle className="text-green-600 text-xs" />
// // //         </div>
// // //       );
// // //     if (type === "error")
// // //       return (
// // //         <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
// // //           <FaTimesCircle className="text-red-600 text-xs" />
// // //         </div>
// // //       );
// // //     if (type === "warning")
// // //       return (
// // //         <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
// // //           <FaInfoCircle className="text-amber-600 text-xs" />
// // //         </div>
// // //       );
// // //     return (
// // //       <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
// // //         <FaEnvelope className="text-gray-500 text-xs" />
// // //       </div>
// // //     );
// // //   };

// // //   const getAccent = (type, read, action) => {
// // //     if (read) return "";
// // //     const map = {
// // //       payment: "border-l-4 border-l-purple-400 bg-purple-50",
// // //       chat: "border-l-4 border-l-indigo-400 bg-indigo-50",
// // //       booking: "border-l-4 border-l-blue-400 bg-blue-50",
// // //       success: "border-l-4 border-l-green-400 bg-green-50",
// // //       error: "border-l-4 border-l-red-400 bg-red-50",
// // //       warning: "border-l-4 border-l-amber-400 bg-amber-50",
// // //     };
// // //     const key = action?.type === "payment" ? "payment" : type;
// // //     return map[key] || "border-l-4 border-l-gray-300 bg-gray-50";
// // //   };

// // //   const formatTime = (date) => {
// // //     if (!date) return "Just now";
// // //     const diff = Date.now() - new Date(date).getTime();
// // //     const m = Math.floor(diff / 60000);
// // //     const h = Math.floor(diff / 3600000);
// // //     const d = Math.floor(diff / 86400000);
// // //     if (m < 1) return "Just now";
// // //     if (m < 60) return `${m}m ago`;
// // //     if (h < 24) return `${h}h ago`;
// // //     if (d === 1) return "Yesterday";
// // //     if (d < 7) return `${d}d ago`;
// // //     return new Date(date).toLocaleDateString();
// // //   };

// // //   const handleNotificationClick = async (n) => {
// // //     if (!n.read) await markAsRead(n._id || n.id);
// // //     setIsOpen(false);
// // //     const { action, metadata } = n;
// // //     if (action?.type === "payment") {
// // //       navigate(
// // //         metadata?.bookingId ? `/payment/${metadata.bookingId}` : "/payment",
// // //       );
// // //     } else if (action?.type === "booking" && metadata?.bookingId) {
// // //       navigate(`/booking/confirmation/${metadata.bookingId}`);
// // //     } else if (action?.type === "chat" && metadata?.chatId) {
// // //       if (window.location.pathname === "/profiledetails") {
// // //         window.dispatchEvent(
// // //           new CustomEvent("openChat", { detail: { chatId: metadata.chatId } }),
// // //         );
// // //       } else {
// // //         navigate(`/profiledetails?tab=messages&chat=${metadata.chatId}`);
// // //       }
// // //     } else if (action?.path) {
// // //       navigate(action.path);
// // //     } else if (metadata?.bookingId) {
// // //       navigate(`/payment/${metadata.bookingId}`);
// // //     }
// // //   };

// // //   return (
// // //     <>
// // //       {/* ── Toast Container bottom-center ──────────────────────────────────── */}
// // //       <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col-reverse gap-3 items-center pointer-events-none">
// // //         {toasts.map((toast) => (
// // //           <div key={toast.id} className="pointer-events-auto">
// // //             <ChatToast
// // //               toast={toast}
// // //               onDismiss={dismissToast}
// // //               onNavigate={(chatId) => {
// // //                 if (window.location.pathname === "/profiledetails") {
// // //                   window.dispatchEvent(
// // //                     new CustomEvent("openChat", { detail: { chatId } }),
// // //                   );
// // //                 } else {
// // //                   navigate(`/profiledetails?tab=messages&chat=${chatId}`);
// // //                 }
// // //               }}
// // //             />
// // //           </div>
// // //         ))}
// // //       </div>

// // //       {/* ── Bell + Dropdown ─────────────────────────────────────────────────── */}
// // //       <div className="relative" ref={dropdownRef}>
// // //         <button
// // //           onClick={() => {
// // //             setIsOpen((p) => !p);
// // //             if (!isOpen) fetchNotifications();
// // //           }}
// // //           className={`relative p-2.5 rounded-xl transition-all duration-200 ${isOpen ? "bg-indigo-50 text-indigo-600" : "hover:bg-gray-100 text-gray-600"}`}
// // //           aria-label="Notifications"
// // //         >
// // //           <FaBell
// // //             className={`text-xl transition-transform duration-200 ${isOpen ? "rotate-12" : ""}`}
// // //           />
// // //           {unreadCount > 0 && (
// // //             <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-red-500 rounded-full flex items-center justify-center shadow-sm animate-pulse">
// // //               {unreadCount > 99 ? "99+" : unreadCount}
// // //             </span>
// // //           )}
// // //         </button>

// // //         {isOpen && (
// // //           <div className="absolute right-0 mt-2 w-[380px] bg-white rounded-2xl shadow-2xl z-50 border border-gray-100 overflow-hidden">
// // //             {/* Header */}
// // //             <div className="px-5 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-between">
// // //               <div>
// // //                 <h3 className="text-base font-bold text-white flex items-center gap-2">
// // //                   <FaBell className="text-white/80" /> Notifications
// // //                 </h3>
// // //                 <p className="text-xs text-white/70 mt-0.5">
// // //                   {unreadCount > 0 ? `${unreadCount} unread` : "All caught up!"}
// // //                 </p>
// // //               </div>
// // //               <div className="flex items-center gap-2">
// // //                 {unreadCount > 0 && (
// // //                   <button
// // //                     onClick={markAllAsRead}
// // //                     className="text-xs text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-full flex items-center gap-1 transition-colors"
// // //                   >
// // //                     <FaCheckDouble size={10} /> All read
// // //                   </button>
// // //                 )}
// // //                 <button
// // //                   onClick={() => setIsOpen(false)}
// // //                   className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-colors"
// // //                 >
// // //                   <FaTimes size={12} />
// // //                 </button>
// // //               </div>
// // //             </div>

// // //             {/* List */}
// // //             <div className="max-h-[420px] overflow-y-auto divide-y divide-gray-50">
// // //               {loading ? (
// // //                 <div className="py-12 text-center">
// // //                   <div className="w-10 h-10 rounded-full border-2 border-indigo-200 border-t-indigo-600 animate-spin mx-auto mb-3" />
// // //                   <p className="text-sm text-gray-500">Loading…</p>
// // //                 </div>
// // //               ) : notifications?.length > 0 ? (
// // //                 notifications.map((n) => (
// // //                   <div
// // //                     key={n._id || n.id}
// // //                     className={`flex items-start gap-3 px-4 py-3.5 cursor-pointer hover:bg-gray-50 transition-colors ${getAccent(n.type, n.read, n.action)}`}
// // //                     onClick={() => handleNotificationClick(n)}
// // //                   >
// // //                     {getIcon(n.type, n.action)}
// // //                     <div className="flex-1 min-w-0">
// // //                       <div className="flex items-start justify-between gap-2">
// // //                         <p
// // //                           className={`text-sm leading-tight ${!n.read ? "font-semibold text-gray-900" : "font-medium text-gray-600"}`}
// // //                         >
// // //                           {n.title}
// // //                         </p>
// // //                         <span className="text-[10px] text-gray-400 flex-shrink-0 mt-0.5">
// // //                           {formatTime(n.createdAt)}
// // //                         </span>
// // //                       </div>
// // //                       <p className="text-xs text-gray-500 mt-0.5 leading-relaxed line-clamp-2">
// // //                         {n.message}
// // //                       </p>
// // //                       {n.metadata?.amount && (
// // //                         <span className="inline-flex items-center gap-1 mt-1.5 text-[11px] font-semibold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
// // //                           <FaWallet size={9} /> रु{" "}
// // //                           {n.metadata.amount.toLocaleString()}
// // //                         </span>
// // //                       )}
// // //                     </div>
// // //                     <div className="flex flex-col items-center gap-2 flex-shrink-0">
// // //                       {!n.read && (
// // //                         <span className="w-2 h-2 rounded-full bg-indigo-500" />
// // //                       )}
// // //                       <button
// // //                         onClick={(e) => {
// // //                           e.stopPropagation();
// // //                           deleteNotification(n._id || n.id);
// // //                         }}
// // //                         className="text-gray-300 hover:text-red-400 transition-colors p-0.5 rounded hover:bg-red-50"
// // //                       >
// // //                         <FaTrash size={10} />
// // //                       </button>
// // //                     </div>
// // //                   </div>
// // //                 ))
// // //               ) : (
// // //                 <div className="py-14 text-center">
// // //                   <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
// // //                     <FaBell className="text-2xl text-gray-300" />
// // //                   </div>
// // //                   <p className="text-sm font-medium text-gray-600">
// // //                     No notifications yet
// // //                   </p>
// // //                   <p className="text-xs text-gray-400 mt-1">
// // //                     We'll let you know when something happens
// // //                   </p>
// // //                 </div>
// // //               )}
// // //             </div>

// // //             {/* Footer */}
// // //             {notifications?.length > 0 && (
// // //               <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
// // //                 <p className="text-xs text-gray-400">
// // //                   {notifications.length} notification
// // //                   {notifications.length !== 1 ? "s" : ""}
// // //                 </p>
// // //                 <button
// // //                   onClick={markAllAsRead}
// // //                   className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1 transition-colors"
// // //                 >
// // //                   <FaCheck size={9} /> Mark all read
// // //                 </button>
// // //               </div>
// // //             )}
// // //           </div>
// // //         )}
// // //       </div>
// // //     </>
// // //   );
// // // };

// // // export default Notification;

// // import React, { useState, useEffect, useRef } from "react";
// // import { useNavigate } from "react-router-dom";
// // import {
// //   FaBell,
// //   FaCheckCircle,
// //   FaTimesCircle,
// //   FaInfoCircle,
// //   FaCar,
// //   FaEnvelope,
// //   FaTimes,
// //   FaTrash,
// //   FaWallet,
// //   FaCommentAlt,
// //   FaCheck,
// //   FaCheckDouble,
// // } from "react-icons/fa";
// // import { useNotifications } from "../../hooks/useNotifications";

// // // ─── Notification Sound ───────────────────────────────────────────────────────
// // const playNotificationSound = () => {
// //   try {
// //     const audio = new Audio("/src/assets/notificationSound/notification.mp3");
// //     audio.volume = 0.5;
// //     audio.play().catch(() => {});
// //   } catch (_) {}
// // };

// // // ─── Sender Avatar ────────────────────────────────────────────────────────────
// // const SenderAvatar = ({ photo, name, size = "w-12 h-12" }) => {
// //   const [imgError, setImgError] = useState(false);
// //   const initials = name
// //     ? name
// //         .split(" ")
// //         .map((w) => w[0])
// //         .join("")
// //         .toUpperCase()
// //         .slice(0, 2)
// //     : "?";

// //   if (photo && !imgError) {
// //     const src = photo.startsWith("http")
// //       ? photo
// //       : `http://localhost:5000${photo}`;
// //     return (
// //       <img
// //         src={src}
// //         alt={name}
// //         className={`${size} rounded-full object-cover ring-2 ring-white shadow-md flex-shrink-0`}
// //         onError={() => setImgError(true)}
// //       />
// //     );
// //   }
// //   return (
// //     <div
// //       className={`${size} rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 ring-2 ring-white shadow-md`}
// //     >
// //       <span className="text-white text-sm font-bold">{initials}</span>
// //     </div>
// //   );
// // };

// // // ─── Single Toast Card ────────────────────────────────────────────────────────
// // export const ChatToast = ({ toast, onDismiss, onNavigate }) => {
// //   const [exiting, setExiting] = useState(false);

// //   useEffect(() => {
// //     playNotificationSound();
// //   }, []);

// //   const dismiss = (e) => {
// //     if (e) e.stopPropagation();
// //     setExiting(true);
// //     setTimeout(() => onDismiss(toast.id), 280);
// //   };

// //   const handleReply = (e) => {
// //     e.stopPropagation();
// //     setExiting(true);
// //     setTimeout(() => {
// //       onDismiss(toast.id);
// //       onNavigate(toast.chatId);
// //     }, 150);
// //   };

// //   return (
// //     <div
// //       className={`relative w-[340px] bg-white rounded-2xl overflow-hidden transition-all duration-[280ms] ease-in-out ${
// //         exiting
// //           ? "opacity-0 translate-y-3 scale-95"
// //           : "opacity-100 translate-y-0 scale-100"
// //       }`}
// //       style={{
// //         boxShadow:
// //           "0 12px 40px rgba(99,102,241,0.20), 0 2px 10px rgba(0,0,0,0.08)",
// //         animation: exiting
// //           ? "none"
// //           : "toastUp 0.38s cubic-bezier(0.34,1.56,0.64,1) forwards",
// //       }}
// //     >
// //       {/* Rainbow top accent */}
// //       <div className="h-[3px] w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

// //       <div className="px-4 pt-3 pb-4">
// //         {/* Row: avatar + name + close */}
// //         <div className="flex items-start gap-3">
// //           <div className="relative flex-shrink-0 mt-0.5">
// //             <SenderAvatar
// //               photo={toast.senderPhoto}
// //               name={toast.from}
// //               size="w-10 h-10"
// //             />
// //             <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full shadow-sm" />
// //           </div>

// //           <div className="flex-1 min-w-0">
// //             <div className="flex items-center justify-between gap-2">
// //               <div className="flex items-center gap-1.5 min-w-0">
// //                 <span className="text-[13px] font-bold text-gray-900 truncate">
// //                   {toast.from}
// //                 </span>
// //                 <span className="flex-shrink-0 text-[9px] font-semibold text-green-600 bg-green-50 border border-green-100 px-1.5 py-0.5 rounded-full">
// //                   online
// //                 </span>
// //               </div>
// //               <button
// //                 onClick={dismiss}
// //                 className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 hover:bg-red-50 hover:text-red-400 text-gray-400 flex items-center justify-center transition-colors"
// //               >
// //                 <FaTimes size={8} />
// //               </button>
// //             </div>

// //             {toast.vehicleName && (
// //               <p className="text-[11px] text-indigo-500 font-medium flex items-center gap-1 mt-0.5">
// //                 <FaCar size={9} />
// //                 <span className="truncate">{toast.vehicleName}</span>
// //               </p>
// //             )}
// //           </div>
// //         </div>

// //         {/* Message bubble */}
// //         <div className="mt-2.5 ml-[52px] px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl rounded-tl-sm">
// //           <p className="text-sm text-gray-700 line-clamp-2 leading-relaxed">
// //             {toast.message}
// //           </p>
// //         </div>

// //         {/* Reply CTA */}
// //         <button
// //           onClick={handleReply}
// //           className="mt-3 ml-[52px] w-[calc(100%-52px)] flex items-center justify-center gap-2 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-[13px] font-semibold rounded-xl transition-all duration-150 shadow-sm hover:shadow-md active:scale-[0.97]"
// //         >
// //           <FaCommentAlt size={10} />
// //           Reply to {toast.from.split(" ")[0]}
// //         </button>
// //       </div>

// //       {/* Countdown bar */}
// //       <div
// //         className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-indigo-400 to-purple-500"
// //         style={{ animation: "toastShrink 5s linear forwards" }}
// //       />

// //       <style>{`
// //         @keyframes toastUp {
// //           from { opacity: 0; transform: translateY(20px) scale(0.94); }
// //           to   { opacity: 1; transform: translateY(0)   scale(1); }
// //         }
// //         @keyframes toastShrink {
// //           from { width: 100%; }
// //           to   { width: 0%; }
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // // ─── Toast Container — fixed bottom-center ────────────────────────────────────
// // export const ChatToastContainer = ({ toasts, dismissToast }) => {
// //   const navigate = useNavigate();

// //   const handleNavigate = (chatId) => {
// //     if (window.location.pathname === "/profiledetails") {
// //       window.dispatchEvent(new CustomEvent("openChat", { detail: { chatId } }));
// //     } else {
// //       navigate(`/profiledetails?tab=messages&chat=${chatId}`);
// //     }
// //   };

// //   if (!toasts || toasts.length === 0) return null;

// //   return (
// //     <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col-reverse gap-3 items-center pointer-events-none">
// //       {toasts.map((toast) => (
// //         <div key={toast.id} className="pointer-events-auto">
// //           <ChatToast
// //             toast={toast}
// //             onDismiss={dismissToast}
// //             onNavigate={handleNavigate}
// //           />
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // // ─── Global Toast Provider — place once in App.jsx ────────────────────────────
// // // This renders ONLY the toast container (no bell icon).
// // // It makes toasts visible on every page of the app.
// // export const GlobalChatToasts = ({ socket }) => {
// //   const { toasts, dismissToast } = useNotifications(socket);
// //   return <ChatToastContainer toasts={toasts} dismissToast={dismissToast} />;
// // };

// // // ─── Notification Bell + Dropdown ─────────────────────────────────────────────
// // const Notification = ({ socket }) => {
// //   const navigate = useNavigate();
// //   const [isOpen, setIsOpen] = useState(false);
// //   const dropdownRef = useRef(null);

// //   const {
// //     notifications,
// //     unreadCount,
// //     loading,
// //     markAsRead,
// //     markAllAsRead,
// //     deleteNotification,
// //     fetchNotifications,
// //     toasts,
// //     dismissToast,
// //   } = useNotifications(socket);

// //   useEffect(() => {
// //     const handleClickOutside = (e) => {
// //       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
// //         setIsOpen(false);
// //       }
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   useEffect(() => {
// //     fetchNotifications();
// //   }, [fetchNotifications]);

// //   const getIcon = (type, action) => {
// //     if (action?.type === "payment" || type === "payment")
// //       return (
// //         <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
// //           <FaWallet className="text-purple-600 text-xs" />
// //         </div>
// //       );
// //     if (type === "chat")
// //       return (
// //         <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
// //           <FaCommentAlt className="text-indigo-600 text-xs" />
// //         </div>
// //       );
// //     if (type === "booking")
// //       return (
// //         <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
// //           <FaCar className="text-blue-600 text-xs" />
// //         </div>
// //       );
// //     if (type === "success")
// //       return (
// //         <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
// //           <FaCheckCircle className="text-green-600 text-xs" />
// //         </div>
// //       );
// //     if (type === "error")
// //       return (
// //         <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
// //           <FaTimesCircle className="text-red-600 text-xs" />
// //         </div>
// //       );
// //     if (type === "warning")
// //       return (
// //         <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
// //           <FaInfoCircle className="text-amber-600 text-xs" />
// //         </div>
// //       );
// //     return (
// //       <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
// //         <FaEnvelope className="text-gray-500 text-xs" />
// //       </div>
// //     );
// //   };

// //   const getAccent = (type, read, action) => {
// //     if (read) return "";
// //     const map = {
// //       payment: "border-l-4 border-l-purple-400 bg-purple-50",
// //       chat: "border-l-4 border-l-indigo-400 bg-indigo-50",
// //       booking: "border-l-4 border-l-blue-400 bg-blue-50",
// //       success: "border-l-4 border-l-green-400 bg-green-50",
// //       error: "border-l-4 border-l-red-400 bg-red-50",
// //       warning: "border-l-4 border-l-amber-400 bg-amber-50",
// //     };
// //     const key = action?.type === "payment" ? "payment" : type;
// //     return map[key] || "border-l-4 border-l-gray-300 bg-gray-50";
// //   };

// //   const formatTime = (date) => {
// //     if (!date) return "Just now";
// //     const diff = Date.now() - new Date(date).getTime();
// //     const m = Math.floor(diff / 60000);
// //     const h = Math.floor(diff / 3600000);
// //     const d = Math.floor(diff / 86400000);
// //     if (m < 1) return "Just now";
// //     if (m < 60) return `${m}m ago`;
// //     if (h < 24) return `${h}h ago`;
// //     if (d === 1) return "Yesterday";
// //     if (d < 7) return `${d}d ago`;
// //     return new Date(date).toLocaleDateString();
// //   };

// //   const handleNotificationClick = async (n) => {
// //     if (!n.read) await markAsRead(n._id || n.id);
// //     setIsOpen(false);
// //     const { action, metadata } = n;
// //     if (action?.type === "payment") {
// //       navigate(
// //         metadata?.bookingId ? `/payment/${metadata.bookingId}` : "/payment",
// //       );
// //     } else if (action?.type === "booking" && metadata?.bookingId) {
// //       navigate(`/booking/confirmation/${metadata.bookingId}`);
// //     } else if (action?.type === "chat" && metadata?.chatId) {
// //       if (window.location.pathname === "/profiledetails") {
// //         window.dispatchEvent(
// //           new CustomEvent("openChat", { detail: { chatId: metadata.chatId } }),
// //         );
// //       } else {
// //         navigate(`/profiledetails?tab=messages&chat=${metadata.chatId}`);
// //       }
// //     } else if (action?.path) {
// //       navigate(action.path);
// //     } else if (metadata?.bookingId) {
// //       navigate(`/payment/${metadata.bookingId}`);
// //     }
// //   };

// //   return (
// //     <>
// //       {/* ── Toast Container bottom-center (shown on Profile page) ─────────── */}
// //       {/* NOTE: For toasts on ALL pages, use <GlobalChatToasts socket={socket} />
// //                in App.jsx instead. The toasts here are kept as a fallback for
// //                when the user is already on the Profile page. */}
// //       <ChatToastContainer toasts={toasts} dismissToast={dismissToast} />

// //       {/* ── Bell + Dropdown ─────────────────────────────────────────────────── */}
// //       <div className="relative" ref={dropdownRef}>
// //         <button
// //           onClick={() => {
// //             setIsOpen((p) => !p);
// //             if (!isOpen) fetchNotifications();
// //           }}
// //           className={`relative p-2.5 rounded-xl transition-all duration-200 ${
// //             isOpen
// //               ? "bg-indigo-50 text-indigo-600"
// //               : "hover:bg-gray-100 text-gray-600"
// //           }`}
// //           aria-label="Notifications"
// //         >
// //           <FaBell
// //             className={`text-xl transition-transform duration-200 ${
// //               isOpen ? "rotate-12" : ""
// //             }`}
// //           />
// //           {unreadCount > 0 && (
// //             <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-red-500 rounded-full flex items-center justify-center shadow-sm animate-pulse">
// //               {unreadCount > 99 ? "99+" : unreadCount}
// //             </span>
// //           )}
// //         </button>

// //         {isOpen && (
// //           <div className="absolute right-0 mt-2 w-[380px] bg-white rounded-2xl shadow-2xl z-50 border border-gray-100 overflow-hidden">
// //             {/* Header */}
// //             <div className="px-5 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-between">
// //               <div>
// //                 <h3 className="text-base font-bold text-white flex items-center gap-2">
// //                   <FaBell className="text-white/80" /> Notifications
// //                 </h3>
// //                 <p className="text-xs text-white/70 mt-0.5">
// //                   {unreadCount > 0 ? `${unreadCount} unread` : "All caught up!"}
// //                 </p>
// //               </div>
// //               <div className="flex items-center gap-2">
// //                 {unreadCount > 0 && (
// //                   <button
// //                     onClick={markAllAsRead}
// //                     className="text-xs text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-full flex items-center gap-1 transition-colors"
// //                   >
// //                     <FaCheckDouble size={10} /> All read
// //                   </button>
// //                 )}
// //                 <button
// //                   onClick={() => setIsOpen(false)}
// //                   className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-colors"
// //                 >
// //                   <FaTimes size={12} />
// //                 </button>
// //               </div>
// //             </div>

// //             {/* List */}
// //             <div className="max-h-[420px] overflow-y-auto divide-y divide-gray-50">
// //               {loading ? (
// //                 <div className="py-12 text-center">
// //                   <div className="w-10 h-10 rounded-full border-2 border-indigo-200 border-t-indigo-600 animate-spin mx-auto mb-3" />
// //                   <p className="text-sm text-gray-500">Loading…</p>
// //                 </div>
// //               ) : notifications?.length > 0 ? (
// //                 notifications.map((n) => (
// //                   <div
// //                     key={n._id || n.id}
// //                     className={`flex items-start gap-3 px-4 py-3.5 cursor-pointer hover:bg-gray-50 transition-colors ${getAccent(
// //                       n.type,
// //                       n.read,
// //                       n.action,
// //                     )}`}
// //                     onClick={() => handleNotificationClick(n)}
// //                   >
// //                     {getIcon(n.type, n.action)}
// //                     <div className="flex-1 min-w-0">
// //                       <div className="flex items-start justify-between gap-2">
// //                         <p
// //                           className={`text-sm leading-tight ${
// //                             !n.read
// //                               ? "font-semibold text-gray-900"
// //                               : "font-medium text-gray-600"
// //                           }`}
// //                         >
// //                           {n.title}
// //                         </p>
// //                         <span className="text-[10px] text-gray-400 flex-shrink-0 mt-0.5">
// //                           {formatTime(n.createdAt)}
// //                         </span>
// //                       </div>
// //                       <p className="text-xs text-gray-500 mt-0.5 leading-relaxed line-clamp-2">
// //                         {n.message}
// //                       </p>
// //                       {n.metadata?.amount && (
// //                         <span className="inline-flex items-center gap-1 mt-1.5 text-[11px] font-semibold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
// //                           <FaWallet size={9} /> रु{" "}
// //                           {n.metadata.amount.toLocaleString()}
// //                         </span>
// //                       )}
// //                     </div>
// //                     <div className="flex flex-col items-center gap-2 flex-shrink-0">
// //                       {!n.read && (
// //                         <span className="w-2 h-2 rounded-full bg-indigo-500" />
// //                       )}
// //                       <button
// //                         onClick={(e) => {
// //                           e.stopPropagation();
// //                           deleteNotification(n._id || n.id);
// //                         }}
// //                         className="text-gray-300 hover:text-red-400 transition-colors p-0.5 rounded hover:bg-red-50"
// //                       >
// //                         <FaTrash size={10} />
// //                       </button>
// //                     </div>
// //                   </div>
// //                 ))
// //               ) : (
// //                 <div className="py-14 text-center">
// //                   <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
// //                     <FaBell className="text-2xl text-gray-300" />
// //                   </div>
// //                   <p className="text-sm font-medium text-gray-600">
// //                     No notifications yet
// //                   </p>
// //                   <p className="text-xs text-gray-400 mt-1">
// //                     We'll let you know when something happens
// //                   </p>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Footer */}
// //             {notifications?.length > 0 && (
// //               <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
// //                 <p className="text-xs text-gray-400">
// //                   {notifications.length} notification
// //                   {notifications.length !== 1 ? "s" : ""}
// //                 </p>
// //                 <button
// //                   onClick={markAllAsRead}
// //                   className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1 transition-colors"
// //                 >
// //                   <FaCheck size={9} /> Mark all read
// //                 </button>
// //               </div>
// //             )}
// //           </div>
// //         )}
// //       </div>
// //     </>
// //   );
// // };

// // export default Notification;

// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   FaBell,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaInfoCircle,
//   FaCar,
//   FaEnvelope,
//   FaTimes,
//   FaTrash,
//   FaWallet,
//   FaCommentAlt,
//   FaCheck,
//   FaCheckDouble,
// } from "react-icons/fa";
// import { useNotifications } from "../../hooks/useNotifications";

// // ─── Notification Sound ───────────────────────────────────────────────────────
// const playNotificationSound = () => {
//   try {
//     const audio = new Audio("/src/assets/notificationSound/notification.mp3");
//     audio.volume = 0.5;
//     audio.play().catch(() => {});
//   } catch (_) {}
// };

// // ─── Sender Avatar ────────────────────────────────────────────────────────────
// const SenderAvatar = ({ photo, name, size = "w-12 h-12" }) => {
//   const [imgError, setImgError] = useState(false);
//   const initials = name
//     ? name
//         .split(" ")
//         .map((w) => w[0])
//         .join("")
//         .toUpperCase()
//         .slice(0, 2)
//     : "?";

//   // Correctly build URL for all storage formats:
//   // "profile-xxx.jpg"         → http://localhost:5000/uploads/profiles/profile-xxx.jpg
//   // "/uploads/profiles/x.jpg" → http://localhost:5000/uploads/profiles/x.jpg
//   // "https://cdn.com/x.jpg"   → https://cdn.com/x.jpg (unchanged)
//   const buildSrc = (p) => {
//     if (!p) return null;
//     if (p.startsWith("http")) return p;
//     if (p.startsWith("/")) return `http://localhost:5000${p}`;
//     return `http://localhost:5000/uploads/profiles/${p}`;
//   };

//   const src = buildSrc(photo);

//   if (src && !imgError) {
//     return (
//       <img
//         src={src}
//         alt={name}
//         className={`${size} rounded-full object-cover ring-2 ring-white shadow-md flex-shrink-0`}
//         onError={() => setImgError(true)}
//       />
//     );
//   }
//   return (
//     <div
//       className={`${size} rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 ring-2 ring-white shadow-md`}
//     >
//       <span className="text-white text-sm font-bold">{initials}</span>
//     </div>
//   );
// };

// // ─── Single Toast Card ────────────────────────────────────────────────────────
// export const ChatToast = ({ toast, onDismiss, onNavigate }) => {
//   const [exiting, setExiting] = useState(false);

//   useEffect(() => {
//     playNotificationSound();
//   }, []);

//   const dismiss = (e) => {
//     if (e) e.stopPropagation();
//     setExiting(true);
//     setTimeout(() => onDismiss(toast.id), 280);
//   };

//   const handleReply = (e) => {
//     e.stopPropagation();
//     setExiting(true);
//     setTimeout(() => {
//       onDismiss(toast.id);
//       onNavigate(toast.chatId);
//     }, 150);
//   };

//   return (
//     <div
//       className={`relative w-[320px] bg-white rounded-2xl overflow-hidden transition-all duration-[280ms] ease-in-out ${
//         exiting
//           ? "opacity-0 translate-x-full scale-95"
//           : "opacity-100 translate-x-0 scale-100"
//       }`}
//       style={{
//         boxShadow:
//           "0 8px 32px rgba(99,102,241,0.22), 0 2px 8px rgba(0,0,0,0.10)",
//         animation: exiting
//           ? "none"
//           : "toastSlideIn 0.38s cubic-bezier(0.34,1.56,0.64,1) forwards",
//       }}
//     >
//       <div className="h-[3px] w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

//       <div className="px-4 pt-3 pb-3">
//         <div className="flex items-center gap-3">
//           <div className="relative flex-shrink-0">
//             <SenderAvatar
//               photo={toast.senderPhoto}
//               name={toast.from}
//               size="w-9 h-9"
//             />
//             <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full" />
//           </div>

//           <div className="flex-1 min-w-0">
//             <div className="flex items-center justify-between gap-1">
//               <div className="flex items-center gap-1.5 min-w-0">
//                 <span className="text-[13px] font-bold text-gray-900 truncate">
//                   {toast.from}
//                 </span>
//                 <span className="flex-shrink-0 text-[8px] font-semibold text-green-600 bg-green-50 border border-green-100 px-1.5 py-0.5 rounded-full">
//                   online
//                 </span>
//               </div>
//               <button
//                 onClick={dismiss}
//                 className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 hover:bg-red-50 hover:text-red-400 text-gray-400 flex items-center justify-center transition-colors"
//               >
//                 <FaTimes size={8} />
//               </button>
//             </div>
//             {toast.vehicleName && (
//               <p className="text-[10px] text-indigo-500 font-medium flex items-center gap-1 mt-0.5">
//                 <FaCar size={8} />
//                 <span className="truncate">{toast.vehicleName}</span>
//               </p>
//             )}
//           </div>
//         </div>

//         <div className="mt-2 ml-[48px] px-2.5 py-1.5 bg-gray-50 border border-gray-100 rounded-xl rounded-tl-sm">
//           <p className="text-xs text-gray-700 line-clamp-2 leading-relaxed">
//             {toast.message}
//           </p>
//         </div>

//         <button
//           onClick={handleReply}
//           className="mt-2 ml-[48px] w-[calc(100%-48px)] flex items-center justify-center gap-1.5 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-[12px] font-semibold rounded-lg transition-all duration-150 shadow-sm hover:shadow-md active:scale-[0.97]"
//         >
//           <FaCommentAlt size={9} />
//           Reply to {toast.from.split(" ")[0]}
//         </button>
//       </div>

//       <div
//         className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-indigo-400 to-purple-500"
//         style={{ animation: "toastShrink 5s linear forwards" }}
//       />

//       <style>{`
//         @keyframes toastSlideIn {
//           from { opacity: 0; transform: translateX(100%) scale(0.95); }
//           to   { opacity: 1; transform: translateX(0)   scale(1); }
//         }
//         @keyframes toastShrink {
//           from { width: 100%; }
//           to   { width: 0%; }
//         }
//       `}</style>
//     </div>
//   );
// };

// // ─── Toast Container — fixed bottom-right ─────────────────────────────────────
// export const ChatToastContainer = ({ toasts, dismissToast }) => {
//   const navigate = useNavigate();

//   const handleNavigate = (chatId) => {
//     if (window.location.pathname === "/profiledetails") {
//       window.dispatchEvent(new CustomEvent("openChat", { detail: { chatId } }));
//     } else {
//       navigate(`/profiledetails?tab=messages&chat=${chatId}`);
//     }
//   };

//   if (!toasts || toasts.length === 0) return null;

//   return (
//     <div className="fixed bottom-6 right-6 z-[9999] flex flex-col-reverse gap-3 items-end pointer-events-none">
//       {toasts.map((t) => (
//         <div key={t.id} className="pointer-events-auto">
//           <ChatToast
//             toast={t}
//             onDismiss={dismissToast}
//             onNavigate={handleNavigate}
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// // ─── Global Toast Provider — place once in App.jsx ────────────────────────────
// export const GlobalChatToasts = ({ socket }) => {
//   const { toasts, dismissToast } = useNotifications(socket);
//   return <ChatToastContainer toasts={toasts} dismissToast={dismissToast} />;
// };

// // ─── Notification Bell + Dropdown ─────────────────────────────────────────────
// const Notification = ({ socket }) => {
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   const {
//     notifications,
//     unreadCount,
//     loading,
//     markAsRead,
//     markAllAsRead,
//     deleteNotification,
//     fetchNotifications,
//     toasts,
//     dismissToast,
//   } = useNotifications(socket);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     fetchNotifications();
//   }, [fetchNotifications]);

//   const getIcon = (type, action) => {
//     if (action?.type === "payment" || type === "payment")
//       return (
//         <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
//           <FaWallet className="text-purple-600 text-xs" />
//         </div>
//       );
//     if (type === "chat")
//       return (
//         <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
//           <FaCommentAlt className="text-indigo-600 text-xs" />
//         </div>
//       );
//     if (type === "booking")
//       return (
//         <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
//           <FaCar className="text-blue-600 text-xs" />
//         </div>
//       );
//     if (type === "success")
//       return (
//         <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
//           <FaCheckCircle className="text-green-600 text-xs" />
//         </div>
//       );
//     if (type === "error")
//       return (
//         <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
//           <FaTimesCircle className="text-red-600 text-xs" />
//         </div>
//       );
//     if (type === "warning")
//       return (
//         <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
//           <FaInfoCircle className="text-amber-600 text-xs" />
//         </div>
//       );
//     return (
//       <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
//         <FaEnvelope className="text-gray-500 text-xs" />
//       </div>
//     );
//   };

//   const getAccent = (type, read, action) => {
//     if (read) return "";
//     const map = {
//       payment: "border-l-4 border-l-purple-400 bg-purple-50",
//       chat: "border-l-4 border-l-indigo-400 bg-indigo-50",
//       booking: "border-l-4 border-l-blue-400 bg-blue-50",
//       success: "border-l-4 border-l-green-400 bg-green-50",
//       error: "border-l-4 border-l-red-400 bg-red-50",
//       warning: "border-l-4 border-l-amber-400 bg-amber-50",
//     };
//     const key = action?.type === "payment" ? "payment" : type;
//     return map[key] || "border-l-4 border-l-gray-300 bg-gray-50";
//   };

//   const formatTime = (date) => {
//     if (!date) return "Just now";
//     const diff = Date.now() - new Date(date).getTime();
//     const m = Math.floor(diff / 60000);
//     const h = Math.floor(diff / 3600000);
//     const d = Math.floor(diff / 86400000);
//     if (m < 1) return "Just now";
//     if (m < 60) return `${m}m ago`;
//     if (h < 24) return `${h}h ago`;
//     if (d === 1) return "Yesterday";
//     if (d < 7) return `${d}d ago`;
//     return new Date(date).toLocaleDateString();
//   };

//   const handleNotificationClick = async (n) => {
//     if (!n.read) await markAsRead(n._id || n.id);
//     setIsOpen(false);
//     const { action, metadata } = n;
//     if (action?.type === "payment") {
//       navigate(
//         metadata?.bookingId ? `/payment/${metadata.bookingId}` : "/payment",
//       );
//     } else if (action?.type === "booking" && metadata?.bookingId) {
//       navigate(`/booking/confirmation/${metadata.bookingId}`);
//     } else if (action?.type === "chat" && metadata?.chatId) {
//       if (window.location.pathname === "/profiledetails") {
//         window.dispatchEvent(
//           new CustomEvent("openChat", { detail: { chatId: metadata.chatId } }),
//         );
//       } else {
//         navigate(`/profiledetails?tab=messages&chat=${metadata.chatId}`);
//       }
//     } else if (action?.path) {
//       navigate(action.path);
//     } else if (metadata?.bookingId) {
//       navigate(`/payment/${metadata.bookingId}`);
//     }
//   };

//   return (
//     <>
//       <ChatToastContainer toasts={toasts} dismissToast={dismissToast} />

//       <div className="relative" ref={dropdownRef}>
//         <button
//           onClick={() => {
//             setIsOpen((p) => !p);
//             if (!isOpen) fetchNotifications();
//           }}
//           className={`relative p-2.5 rounded-xl transition-all duration-200 ${isOpen ? "bg-indigo-50 text-indigo-600" : "hover:bg-gray-100 text-gray-600"}`}
//           aria-label="Notifications"
//         >
//           <FaBell
//             className={`text-xl transition-transform duration-200 ${isOpen ? "rotate-12" : ""}`}
//           />
//           {unreadCount > 0 && (
//             <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-red-500 rounded-full flex items-center justify-center shadow-sm animate-pulse">
//               {unreadCount > 99 ? "99+" : unreadCount}
//             </span>
//           )}
//         </button>

//         {isOpen && (
//           <div className="absolute right-0 mt-2 w-[380px] bg-white rounded-2xl shadow-2xl z-50 border border-gray-100 overflow-hidden">
//             <div className="px-5 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-between">
//               <div>
//                 <h3 className="text-base font-bold text-white flex items-center gap-2">
//                   <FaBell className="text-white/80" /> Notifications
//                 </h3>
//                 <p className="text-xs text-white/70 mt-0.5">
//                   {unreadCount > 0 ? `${unreadCount} unread` : "All caught up!"}
//                 </p>
//               </div>
//               <div className="flex items-center gap-2">
//                 {unreadCount > 0 && (
//                   <button
//                     onClick={markAllAsRead}
//                     className="text-xs text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-full flex items-center gap-1 transition-colors"
//                   >
//                     <FaCheckDouble size={10} /> All read
//                   </button>
//                 )}
//                 <button
//                   onClick={() => setIsOpen(false)}
//                   className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-colors"
//                 >
//                   <FaTimes size={12} />
//                 </button>
//               </div>
//             </div>

//             <div className="max-h-[420px] overflow-y-auto divide-y divide-gray-50">
//               {loading ? (
//                 <div className="py-12 text-center">
//                   <div className="w-10 h-10 rounded-full border-2 border-indigo-200 border-t-indigo-600 animate-spin mx-auto mb-3" />
//                   <p className="text-sm text-gray-500">Loading…</p>
//                 </div>
//               ) : notifications?.length > 0 ? (
//                 notifications.map((n) => (
//                   <div
//                     key={n._id || n.id}
//                     className={`flex items-start gap-3 px-4 py-3.5 cursor-pointer hover:bg-gray-50 transition-colors ${getAccent(n.type, n.read, n.action)}`}
//                     onClick={() => handleNotificationClick(n)}
//                   >
//                     {getIcon(n.type, n.action)}
//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-start justify-between gap-2">
//                         <p
//                           className={`text-sm leading-tight ${!n.read ? "font-semibold text-gray-900" : "font-medium text-gray-600"}`}
//                         >
//                           {n.title}
//                         </p>
//                         <span className="text-[10px] text-gray-400 flex-shrink-0 mt-0.5">
//                           {formatTime(n.createdAt)}
//                         </span>
//                       </div>
//                       <p className="text-xs text-gray-500 mt-0.5 leading-relaxed line-clamp-2">
//                         {n.message}
//                       </p>
//                       {n.metadata?.amount && (
//                         <span className="inline-flex items-center gap-1 mt-1.5 text-[11px] font-semibold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
//                           <FaWallet size={9} /> रु{" "}
//                           {n.metadata.amount.toLocaleString()}
//                         </span>
//                       )}
//                     </div>
//                     <div className="flex flex-col items-center gap-2 flex-shrink-0">
//                       {!n.read && (
//                         <span className="w-2 h-2 rounded-full bg-indigo-500" />
//                       )}
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           deleteNotification(n._id || n.id);
//                         }}
//                         className="text-gray-300 hover:text-red-400 transition-colors p-0.5 rounded hover:bg-red-50"
//                       >
//                         <FaTrash size={10} />
//                       </button>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="py-14 text-center">
//                   <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
//                     <FaBell className="text-2xl text-gray-300" />
//                   </div>
//                   <p className="text-sm font-medium text-gray-600">
//                     No notifications yet
//                   </p>
//                   <p className="text-xs text-gray-400 mt-1">
//                     We'll let you know when something happens
//                   </p>
//                 </div>
//               )}
//             </div>

//             {notifications?.length > 0 && (
//               <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
//                 <p className="text-xs text-gray-400">
//                   {notifications.length} notification
//                   {notifications.length !== 1 ? "s" : ""}
//                 </p>
//                 <button
//                   onClick={markAllAsRead}
//                   className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1 transition-colors"
//                 >
//                   <FaCheck size={9} /> Mark all read
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Notification;



import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBell,
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
  FaCar,
  FaEnvelope,
  FaTimes,
  FaTrash,
  FaWallet,
  FaCommentAlt,
  FaCheck,
  FaCheckDouble,
} from "react-icons/fa";
import { useNotifications } from "../../hooks/useNotifications";

// ─── Notification Sound ───────────────────────────────────────────────────────
const playNotificationSound = () => {
  try {
    // Put notification.mp3 in /public folder so Vite serves it at root
    const audio = new Audio("/notification.mp3");
    audio.volume = 0.5;
    audio.play().catch(() => {});
  } catch (_) {}
};

// ─── Sender Avatar ────────────────────────────────────────────────────────────
const SenderAvatar = ({ photo, name, size = "w-12 h-12" }) => {
  const [imgError, setImgError] = useState(false);
  const initials = name
    ? name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  const buildSrc = (p) => {
    if (!p) return null;
    if (p.startsWith("http")) return p;
    if (p.startsWith("/")) return `http://localhost:5000${p}`;
    return `http://localhost:5000/uploads/profiles/${p}`;
  };

  const src = buildSrc(photo);

  if (src && !imgError) {
    return (
      <img
        src={src}
        alt={name}
        className={`${size} rounded-full object-cover ring-2 ring-white shadow-md flex-shrink-0`}
        onError={() => setImgError(true)}
      />
    );
  }
  return (
    <div className={`${size} rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 ring-2 ring-white shadow-md`}>
      <span className="text-white text-sm font-bold">{initials}</span>
    </div>
  );
};

// ─── Single Toast Card ────────────────────────────────────────────────────────
export const ChatToast = ({ toast, onDismiss, onNavigate }) => {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    playNotificationSound();
  }, []);

  const dismiss = (e) => {
    if (e) e.stopPropagation();
    setExiting(true);
    setTimeout(() => onDismiss(toast.id), 280);
  };

  const handleReply = (e) => {
    e.stopPropagation();
    setExiting(true);
    setTimeout(() => {
      onDismiss(toast.id);
      onNavigate(toast.chatId);
    }, 150);
  };

  return (
    <div
      className={`relative w-[320px] bg-white rounded-2xl overflow-hidden transition-all duration-[280ms] ease-in-out ${
        exiting ? "opacity-0 translate-x-full scale-95" : "opacity-100 translate-x-0 scale-100"
      }`}
      style={{
        boxShadow: "0 8px 32px rgba(99,102,241,0.22), 0 2px 8px rgba(0,0,0,0.10)",
        animation: exiting ? "none" : "toastSlideIn 0.38s cubic-bezier(0.34,1.56,0.64,1) forwards",
      }}
    >
      <div className="h-[3px] w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

      <div className="px-4 pt-3 pb-3">
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <SenderAvatar photo={toast.senderPhoto} name={toast.from} size="w-9 h-9" />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="text-[13px] font-bold text-gray-900 truncate">{toast.from}</span>
                <span className="flex-shrink-0 text-[8px] font-semibold text-green-600 bg-green-50 border border-green-100 px-1.5 py-0.5 rounded-full">online</span>
              </div>
              <button onClick={dismiss} className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 hover:bg-red-50 hover:text-red-400 text-gray-400 flex items-center justify-center transition-colors">
                <FaTimes size={8} />
              </button>
            </div>
            {toast.vehicleName && (
              <p className="text-[10px] text-indigo-500 font-medium flex items-center gap-1 mt-0.5">
                <FaCar size={8} />
                <span className="truncate">{toast.vehicleName}</span>
              </p>
            )}
          </div>
        </div>

        <div className="mt-2 ml-[48px] px-2.5 py-1.5 bg-gray-50 border border-gray-100 rounded-xl rounded-tl-sm">
          <p className="text-xs text-gray-700 line-clamp-2 leading-relaxed">{toast.message}</p>
        </div>

        <button
          onClick={handleReply}
          className="mt-2 ml-[48px] w-[calc(100%-48px)] flex items-center justify-center gap-1.5 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-[12px] font-semibold rounded-lg transition-all duration-150 shadow-sm hover:shadow-md active:scale-[0.97]"
        >
          <FaCommentAlt size={9} />
          Reply to {toast.from.split(" ")[0]}
        </button>
      </div>

      <div className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-indigo-400 to-purple-500"
        style={{ animation: "toastShrink 5s linear forwards" }} />

      <style>{`
        @keyframes toastSlideIn {
          from { opacity: 0; transform: translateX(100%) scale(0.95); }
          to   { opacity: 1; transform: translateX(0)   scale(1); }
        }
        @keyframes toastShrink {
          from { width: 100%; }
          to   { width: 0%; }
        }
      `}</style>
    </div>
  );
};

// ─── Toast Container — fixed bottom-right ─────────────────────────────────────
export const ChatToastContainer = ({ toasts, dismissToast }) => {
  const navigate = useNavigate();

  const handleNavigate = (chatId) => {
    if (window.location.pathname === "/profiledetails") {
      window.dispatchEvent(new CustomEvent("openChat", { detail: { chatId } }));
    } else {
      navigate(`/profiledetails?tab=messages&chat=${chatId}`);
    }
  };

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col-reverse gap-3 items-end pointer-events-none">
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto">
          <ChatToast toast={t} onDismiss={dismissToast} onNavigate={handleNavigate} />
        </div>
      ))}
    </div>
  );
};

// ─── Global Toast Provider — place once in App.jsx ────────────────────────────
// This renders ONLY the toast container. Add to App.jsx to show toasts on all pages.
export const GlobalChatToasts = ({ socket }) => {
  const { toasts, dismissToast } = useNotifications(socket);
  return <ChatToastContainer toasts={toasts} dismissToast={dismissToast} />;
};

// ─── Notification Bell + Dropdown ─────────────────────────────────────────────
// NOTE: Toasts are NOT rendered here — they are rendered globally via
// <GlobalChatToasts> in App.jsx. This component only shows the bell + dropdown.
const Notification = ({ socket }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // No toasts here — GlobalChatToasts in App.jsx handles them
  const {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    fetchNotifications,
  } = useNotifications(socket);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const getIcon = (type, action) => {
    if (action?.type === "payment" || type === "payment")
      return <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center"><FaWallet className="text-purple-600 text-xs" /></div>;
    if (type === "chat")
      return <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center"><FaCommentAlt className="text-indigo-600 text-xs" /></div>;
    if (type === "booking")
      return <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center"><FaCar className="text-blue-600 text-xs" /></div>;
    if (type === "success")
      return <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center"><FaCheckCircle className="text-green-600 text-xs" /></div>;
    if (type === "error")
      return <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center"><FaTimesCircle className="text-red-600 text-xs" /></div>;
    if (type === "warning")
      return <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center"><FaInfoCircle className="text-amber-600 text-xs" /></div>;
    return <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"><FaEnvelope className="text-gray-500 text-xs" /></div>;
  };

  const getAccent = (type, read, action) => {
    if (read) return "";
    const map = {
      payment: "border-l-4 border-l-purple-400 bg-purple-50",
      chat:    "border-l-4 border-l-indigo-400 bg-indigo-50",
      booking: "border-l-4 border-l-blue-400 bg-blue-50",
      success: "border-l-4 border-l-green-400 bg-green-50",
      error:   "border-l-4 border-l-red-400 bg-red-50",
      warning: "border-l-4 border-l-amber-400 bg-amber-50",
    };
    const key = action?.type === "payment" ? "payment" : type;
    return map[key] || "border-l-4 border-l-gray-300 bg-gray-50";
  };

  const formatTime = (date) => {
    if (!date) return "Just now";
    const diff = Date.now() - new Date(date).getTime();
    const m = Math.floor(diff / 60000);
    const h = Math.floor(diff / 3600000);
    const d = Math.floor(diff / 86400000);
    if (m < 1) return "Just now";
    if (m < 60) return `${m}m ago`;
    if (h < 24) return `${h}h ago`;
    if (d === 1) return "Yesterday";
    if (d < 7) return `${d}d ago`;
    return new Date(date).toLocaleDateString();
  };

  const handleNotificationClick = async (n) => {
    if (!n.read) await markAsRead(n._id || n.id);
    setIsOpen(false);
    const { action, metadata } = n;
    if (action?.type === "payment") {
      navigate(metadata?.bookingId ? `/payment/${metadata.bookingId}` : "/payment");
    } else if (action?.type === "booking" && metadata?.bookingId) {
      navigate(`/booking/confirmation/${metadata.bookingId}`);
    } else if (action?.type === "chat" && metadata?.chatId) {
      if (window.location.pathname === "/profiledetails") {
        window.dispatchEvent(new CustomEvent("openChat", { detail: { chatId: metadata.chatId } }));
      } else {
        navigate(`/profiledetails?tab=messages&chat=${metadata.chatId}`);
      }
    } else if (action?.path) {
      navigate(action.path);
    } else if (metadata?.bookingId) {
      navigate(`/payment/${metadata.bookingId}`);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => { setIsOpen((p) => !p); if (!isOpen) fetchNotifications(); }}
        className={`relative p-2.5 rounded-xl transition-all duration-200 ${isOpen ? "bg-indigo-50 text-indigo-600" : "hover:bg-gray-100 text-gray-600"}`}
        aria-label="Notifications"
      >
        <FaBell className={`text-xl transition-transform duration-200 ${isOpen ? "rotate-12" : ""}`} />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-red-500 rounded-full flex items-center justify-center shadow-sm animate-pulse">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-[380px] bg-white rounded-2xl shadow-2xl z-50 border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FaBell className="text-white/80" /> Notifications
              </h3>
              <p className="text-xs text-white/70 mt-0.5">
                {unreadCount > 0 ? `${unreadCount} unread` : "All caught up!"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button onClick={markAllAsRead} className="text-xs text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-full flex items-center gap-1 transition-colors">
                  <FaCheckDouble size={10} /> All read
                </button>
              )}
              <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-colors">
                <FaTimes size={12} />
              </button>
            </div>
          </div>

          <div className="max-h-[420px] overflow-y-auto divide-y divide-gray-50">
            {loading ? (
              <div className="py-12 text-center">
                <div className="w-10 h-10 rounded-full border-2 border-indigo-200 border-t-indigo-600 animate-spin mx-auto mb-3" />
                <p className="text-sm text-gray-500">Loading…</p>
              </div>
            ) : notifications?.length > 0 ? (
              notifications.map((n) => (
                <div
                  key={n._id || n.id}
                  className={`flex items-start gap-3 px-4 py-3.5 cursor-pointer hover:bg-gray-50 transition-colors ${getAccent(n.type, n.read, n.action)}`}
                  onClick={() => handleNotificationClick(n)}
                >
                  {getIcon(n.type, n.action)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm leading-tight ${!n.read ? "font-semibold text-gray-900" : "font-medium text-gray-600"}`}>
                        {n.title}
                      </p>
                      <span className="text-[10px] text-gray-400 flex-shrink-0 mt-0.5">{formatTime(n.createdAt)}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed line-clamp-2">{n.message}</p>
                    {n.metadata?.amount && (
                      <span className="inline-flex items-center gap-1 mt-1.5 text-[11px] font-semibold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                        <FaWallet size={9} /> रु {n.metadata.amount.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col items-center gap-2 flex-shrink-0">
                    {!n.read && <span className="w-2 h-2 rounded-full bg-indigo-500" />}
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteNotification(n._id || n.id); }}
                      className="text-gray-300 hover:text-red-400 transition-colors p-0.5 rounded hover:bg-red-50"
                    >
                      <FaTrash size={10} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-14 text-center">
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <FaBell className="text-2xl text-gray-300" />
                </div>
                <p className="text-sm font-medium text-gray-600">No notifications yet</p>
                <p className="text-xs text-gray-400 mt-1">We'll let you know when something happens</p>
              </div>
            )}
          </div>

          {notifications?.length > 0 && (
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <p className="text-xs text-gray-400">{notifications.length} notification{notifications.length !== 1 ? "s" : ""}</p>
              <button onClick={markAllAsRead} className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1 transition-colors">
                <FaCheck size={9} /> Mark all read
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;