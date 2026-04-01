// import React, { useState, useEffect } from "react";
// import {
//   FaBell,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaInfoCircle,
//   FaCar,
//   FaEnvelope,
//   FaTimes,
//   FaTrash,
//   FaCheck,
// } from "react-icons/fa";

// const Notification = ({ notifications, onClose, onMarkAsRead, onDelete }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [unreadCount, setUnreadCount] = useState(0);

//   useEffect(() => {
//     if (notifications) {
//       setUnreadCount(notifications.filter((n) => !n.read).length);
//     }
//   }, [notifications]);

//   const getNotificationIcon = (type) => {
//     switch (type) {
//       case "success":
//         return <FaCheckCircle className="text-green-500" />;
//       case "error":
//         return <FaTimesCircle className="text-red-500" />;
//       case "warning":
//         return <FaInfoCircle className="text-yellow-500" />;
//       case "booking":
//         return <FaCar className="text-blue-500" />;
//       default:
//         return <FaEnvelope className="text-gray-500" />;
//     }
//   };

//   const getNotificationBg = (type) => {
//     switch (type) {
//       case "success":
//         return "bg-green-50 border-green-200";
//       case "error":
//         return "bg-red-50 border-red-200";
//       case "warning":
//         return "bg-yellow-50 border-yellow-200";
//       case "booking":
//         return "bg-blue-50 border-blue-200";
//       default:
//         return "bg-gray-50 border-gray-200";
//     }
//   };

//   const formatTime = (date) => {
//     const now = new Date();
//     const notificationDate = new Date(date);
//     const diffMs = now - notificationDate;
//     const diffMins = Math.floor(diffMs / 60000);
//     const diffHours = Math.floor(diffMs / 3600000);
//     const diffDays = Math.floor(diffMs / 86400000);

//     if (diffMins < 1) return "Just now";
//     if (diffMins < 60) return `${diffMins} min ago`;
//     if (diffHours < 24) return `${diffHours} hour ago`;
//     if (diffDays === 1) return "Yesterday";
//     return notificationDate.toLocaleDateString();
//   };-6

//   return (
//     <div className="relative">
//       {/* Bell Icon */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="relative p-2 hover:bg-gray-100 rounded-full transition"
//       >
//         <FaBell className="text-xl text-gray-600" />
//         {unreadCount > 0 && (
//           <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full animate-pulse">
//             {unreadCount > 9 ? "9+" : unreadCount}
//           </span>
//         )}
//       </button>

//       {/* Notification Dropdown */}
//       {isOpen && (
//         <>
//           <div
//             className="fixed inset-0 z-40"
//             onClick={() => setIsOpen(false)}
//           ></div>
//           <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl z-50 border border-gray-200">
//             {/* Header */}
//             <div className="flex items-center justify-between p-4 border-b border-gray-200">
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900">
//                   Notifications
//                 </h3>
//                 <p className="text-xs text-gray-500">
//                   You have {unreadCount} unread notifications
//                 </p>
//               </div>
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="text-gray-400 hover:text-gray-600"
//               >
//                 <FaTimes />
//               </button>
//             </div>

//             {/* Notification List */}
//             <div className="max-h-96 overflow-y-auto">
//               {notifications && notifications.length > 0 ? (
//                 notifications.map((notification) => (
//                   <div
//                     key={notification.id}
//                     className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer ${
//                       !notification.read
//                         ? getNotificationBg(notification.type)
//                         : ""
//                     }`}
//                     onClick={() =>
//                       onMarkAsRead && onMarkAsRead(notification.id)
//                     }
//                   >
//                     <div className="flex items-start gap-3">
//                       <div className="flex-shrink-0 mt-1">
//                         {getNotificationIcon(notification.type)}
//                       </div>
//                       <div className="flex-1">
//                         <div className="flex items-center justify-between mb-1">
//                           <h4
//                             className={`text-sm font-semibold ${!notification.read ? "text-gray-900" : "text-gray-600"}`}
//                           >
//                             {notification.title}
//                           </h4>
//                           <span className="text-xs text-gray-400">
//                             {formatTime(notification.createdAt)}
//                           </span>
//                         </div>
//                         <p className="text-sm text-gray-600">
//                           {notification.message}
//                         </p>
//                         {notification.details && (
//                           <p className="text-xs text-gray-500 mt-1">
//                             {notification.details}
//                           </p>
//                         )}
//                       </div>
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           onDelete && onDelete(notification.id);
//                         }}
//                         className="text-gray-400 hover:text-red-500"
//                       >
//                         <FaTrash size={12} />
//                       </button>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="p-8 text-center">
//                   <FaBell className="text-4xl text-gray-300 mx-auto mb-3" />
//                   <p className="text-gray-500">No notifications yet</p>
//                   <p className="text-xs text-gray-400 mt-1">
//                     You'll see notifications here when you have updates
//                   </p>
//                 </div>
//               )}
//             </div>

//             {/* Footer */}
//             {notifications && notifications.length > 0 && (
//               <div className="p-3 border-t border-gray-200 bg-gray-50 rounded-b-lg">
//                 <button
//                   onClick={() => {
//                     notifications.forEach((n) => {
//                       if (!n.read) onMarkAsRead && onMarkAsRead(n.id);
//                     });
//                   }}
//                   className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium"
//                 >
//                   Mark all as read
//                 </button>
//               </div>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Notification;

import React, { useState, useEffect } from "react";
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
  FaCreditCard,
  FaSpinner,
} from "react-icons/fa";
// import useNotifications from "../../hooks/useNotifications";
import { useNotifications } from "../../hooks/useNotifications";

const Notification = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    fetchNotifications,
  } = useNotifications();

  // Fetch notifications when component mounts
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const getNotificationIcon = (type, action) => {
    // Check if it's a payment notification
    if (action?.type === "payment") {
      return <FaWallet className="text-purple-500" />;
    }

    switch (type) {
      case "success":
        return <FaCheckCircle className="text-green-500" />;
      case "error":
        return <FaTimesCircle className="text-red-500" />;
      case "warning":
        return <FaInfoCircle className="text-yellow-500" />;
      case "booking":
        return <FaCar className="text-blue-500" />;
      case "payment":
        return <FaCreditCard className="text-purple-500" />;
      default:
        return <FaEnvelope className="text-gray-500" />;
    }
  };

  const getNotificationBg = (type, read, action) => {
    if (read) return "bg-white border-gray-200";

    // Unread notifications have colored backgrounds
    if (action?.type === "payment") {
      return "bg-purple-50 border-purple-200";
    }

    switch (type) {
      case "success":
        return "bg-green-50 border-green-200";
      case "error":
        return "bg-red-50 border-red-200";
      case "warning":
        return "bg-yellow-50 border-yellow-200";
      case "booking":
        return "bg-blue-50 border-blue-200";
      case "payment":
        return "bg-purple-50 border-purple-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const formatTime = (date) => {
    if (!date) return "Just now";

    const now = new Date();
    const notificationDate = new Date(date);
    const diffMs = now - notificationDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return notificationDate.toLocaleDateString();
  };

  const handleNotificationClick = async (notification) => {
    // Mark as read first if not already read
    if (!notification.read) {
      await markAsRead(notification._id);
    }

    // Close dropdown
    setIsOpen(false);

    // Handle action based on notification type and action
    if (notification.action) {
      // Handle payment action
      if (notification.action.type === "payment") {
        const bookingId =
          notification.metadata?.bookingId ||
          notification.action.data?.bookingId;
        if (bookingId) {
          navigate(`/payment/${bookingId}`);
        } else {
          navigate("/payment");
        }
      }
      // Handle booking action
      else if (notification.action.type === "booking") {
        const bookingId = notification.metadata?.bookingId;
        if (bookingId) {
          navigate(`/booking/confirmation/${bookingId}`);
        }
      }
      // Handle custom path navigation
      else if (notification.action.path) {
        navigate(notification.action.path);
      }
    }
    // Fallback: if no action but has metadata with bookingId
    else if (notification.metadata?.bookingId) {
      navigate(`/payment/${notification.metadata.bookingId}`);
    }
  };

  const handleDelete = async (e, notificationId) => {
    e.stopPropagation();
    await deleteNotification(notificationId);
  };

  const handleMarkAllRead = async () => {
    await markAllAsRead();
  };

  const handleBellClick = () => {
    setIsOpen(!isOpen);
    // Refresh notifications when opening
    if (!isOpen) {
      fetchNotifications();
    }
  };

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button
        onClick={handleBellClick}
        className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Notifications"
      >
        <FaBell className="text-xl text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full animate-pulse">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl z-50 border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Notifications
                </h3>
                <p className="text-xs text-gray-500">
                  You have {unreadCount} unread{" "}
                  {unreadCount === 1 ? "notification" : "notifications"}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            {/* Notification List */}
            <div className="max-h-96 overflow-y-auto">
              {loading ? (
                <div className="p-8 text-center">
                  <FaSpinner className="w-8 h-8 text-purple-600 animate-spin mx-auto mb-3" />
                  <p className="text-gray-500">Loading notifications...</p>
                </div>
              ) : notifications && notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification._id || notification.id}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-all cursor-pointer ${
                      !notification.read
                        ? getNotificationBg(
                            notification.type,
                            notification.read,
                            notification.action,
                          )
                        : ""
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(
                          notification.type,
                          notification.action,
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4
                            className={`text-sm font-semibold truncate ${
                              !notification.read
                                ? "text-gray-900"
                                : "text-gray-600"
                            }`}
                          >
                            {notification.title}
                          </h4>
                          <span className="text-xs text-gray-400 flex-shrink-0">
                            {formatTime(notification.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 break-words">
                          {notification.message}
                        </p>
                        {notification.details && (
                          <p className="text-xs text-gray-500 mt-1">
                            {notification.details}
                          </p>
                        )}
                        {notification.action?.type === "payment" && (
                          <div className="mt-2">
                            <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-purple-700 bg-purple-100 rounded-full">
                              <FaWallet className="mr-1 text-xs" />
                              Click to Pay Now
                            </span>
                          </div>
                        )}
                        {notification.metadata?.amount && (
                          <p className="text-xs font-semibold text-purple-600 mt-1">
                            Amount: रु{" "}
                            {notification.metadata.amount.toLocaleString()}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={(e) =>
                          handleDelete(e, notification._id || notification.id)
                        }
                        className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                        aria-label="Delete notification"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <FaBell className="text-4xl text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No notifications yet</p>
                  <p className="text-xs text-gray-400 mt-1">
                    You'll see notifications here when you have updates
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications && notifications.length > 0 && (
              <div className="p-3 border-t border-gray-200 bg-gray-50">
                <button
                  onClick={handleMarkAllRead}
                  className="w-full text-center text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors"
                >
                  Mark all as read
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Notification;
