import React, { useState, useEffect } from "react";
import {
  FaBell,
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
  FaCar,
  FaEnvelope,
  FaTimes,
  FaTrash,
  FaCheck,
} from "react-icons/fa";

const Notification = ({ notifications, onClose, onMarkAsRead, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (notifications) {
      setUnreadCount(notifications.filter((n) => !n.read).length);
    }
  }, [notifications]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return <FaCheckCircle className="text-green-500" />;
      case "error":
        return <FaTimesCircle className="text-red-500" />;
      case "warning":
        return <FaInfoCircle className="text-yellow-500" />;
      case "booking":
        return <FaCar className="text-blue-500" />;
      default:
        return <FaEnvelope className="text-gray-500" />;
    }
  };

  const getNotificationBg = (type) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200";
      case "error":
        return "bg-red-50 border-red-200";
      case "warning":
        return "bg-yellow-50 border-yellow-200";
      case "booking":
        return "bg-blue-50 border-blue-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const formatTime = (date) => {
    const now = new Date();
    const notificationDate = new Date(date);
    const diffMs = now - notificationDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour ago`;
    if (diffDays === 1) return "Yesterday";
    return notificationDate.toLocaleDateString();
  };-6

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-100 rounded-full transition"
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
          <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl z-50 border border-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Notifications
                </h3>
                <p className="text-xs text-gray-500">
                  You have {unreadCount} unread notifications
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>

            {/* Notification List */}
            <div className="max-h-96 overflow-y-auto">
              {notifications && notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer ${
                      !notification.read
                        ? getNotificationBg(notification.type)
                        : ""
                    }`}
                    onClick={() =>
                      onMarkAsRead && onMarkAsRead(notification.id)
                    }
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4
                            className={`text-sm font-semibold ${!notification.read ? "text-gray-900" : "text-gray-600"}`}
                          >
                            {notification.title}
                          </h4>
                          <span className="text-xs text-gray-400">
                            {formatTime(notification.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {notification.message}
                        </p>
                        {notification.details && (
                          <p className="text-xs text-gray-500 mt-1">
                            {notification.details}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete && onDelete(notification.id);
                        }}
                        className="text-gray-400 hover:text-red-500"
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
              <div className="p-3 border-t border-gray-200 bg-gray-50 rounded-b-lg">
                <button
                  onClick={() => {
                    notifications.forEach((n) => {
                      if (!n.read) onMarkAsRead && onMarkAsRead(n.id);
                    });
                  }}
                  className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium"
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
