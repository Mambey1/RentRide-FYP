// import { useState, useEffect, useCallback } from "react";
// import axios from "axios";

// const API_URL = "http://localhost:5000/api";

// export const useNotifications = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchNotifications = useCallback(async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       const response = await axios.get(`${API_URL}/notifications`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.data.success) {
//         setNotifications(response.data.data);
//         setUnreadCount(response.data.unreadCount);
//       }
//     } catch (err) {
//       console.error("Error fetching notifications:", err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const markAsRead = useCallback(async (notificationId) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       await axios.put(
//         `${API_URL}/notifications/${notificationId}/read`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setNotifications((prev) =>
//         prev.map((n) =>
//           n.id === notificationId ? { ...n, read: true } : n
//         )
//       );
//       setUnreadCount((prev) => Math.max(0, prev - 1));
//     } catch (err) {
//       console.error("Error marking as read:", err);
//     }
//   }, []);

//   const markAllAsRead = useCallback(async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       await axios.put(
//         `${API_URL}/notifications/mark-all-read`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
//       setUnreadCount(0);
//     } catch (err) {
//       console.error("Error marking all as read:", err);
//     }
//   }, []);

//   const deleteNotification = useCallback(async (notificationId) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       await axios.delete(`${API_URL}/notifications/${notificationId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
//       if (!notifications.find((n) => n.id === notificationId)?.read) {
//         setUnreadCount((prev) => Math.max(0, prev - 1));
//       }
//     } catch (err) {
//       console.error("Error deleting notification:", err);
//     }
//   }, [notifications]);

//   // Poll for new notifications every 30 seconds
//   useEffect(() => {
//     fetchNotifications();
//     const interval = setInterval(fetchNotifications, 30000);
//     return () => clearInterval(interval);
//   }, [fetchNotifications]);

//   return {
//     notifications,
//     unreadCount,
//     loading,
//     error,
//     fetchNotifications,
//     markAsRead,
//     markAllAsRead,
//     deleteNotification,
//   };
// };

import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

/**
 * useNotifications
 *
 * Manages persistent in-app notifications (bell dropdown) AND
 * real-time toast notifications triggered by socket events.
 *
 * Expected socket events (attach the socket via `setSocket`):
 *   "new_message_notification"  → show a 5-second toast
 *   "notification_received"     → refresh bell count + prepend notification
 */
export const useNotifications = (socket = null) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── Toast state ────────────────────────────────────────────────────────────
  // Each toast: { id, from, message, chatId, vehicleName, chatType }
  const [toasts, setToasts] = useState([]);
  const toastTimers = useRef({});

  // ── Fetch all notifications ────────────────────────────────────────────────
  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get(`${API_URL}/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setNotifications(response.data.data);
        setUnreadCount(response.data.unreadCount);
      }
    } catch (err) {
      console.error("Error fetching notifications:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Mark single notification as read ──────────────────────────────────────
  const markAsRead = useCallback(async (notificationId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.put(
        `${API_URL}/notifications/${notificationId}/read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setNotifications((prev) =>
        prev.map((n) =>
          (n._id || n.id) === notificationId ? { ...n, read: true } : n,
        ),
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error("Error marking as read:", err);
    }
  }, []);

  // ── Mark all as read ──────────────────────────────────────────────────────
  const markAllAsRead = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.put(
        `${API_URL}/notifications/mark-all-read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error("Error marking all as read:", err);
    }
  }, []);

  // ── Delete notification ───────────────────────────────────────────────────
  const deleteNotification = useCallback(
    async (notificationId) => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        await axios.delete(`${API_URL}/notifications/${notificationId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const target = notifications.find(
          (n) => (n._id || n.id) === notificationId,
        );
        setNotifications((prev) =>
          prev.filter((n) => (n._id || n.id) !== notificationId),
        );
        if (target && !target.read) {
          setUnreadCount((prev) => Math.max(0, prev - 1));
        }
      } catch (err) {
        console.error("Error deleting notification:", err);
      }
    },
    [notifications],
  );

  // ── Toast helpers ─────────────────────────────────────────────────────────
  const dismissToast = useCallback((toastId) => {
    setToasts((prev) => prev.filter((t) => t.id !== toastId));
    if (toastTimers.current[toastId]) {
      clearTimeout(toastTimers.current[toastId]);
      delete toastTimers.current[toastId];
    }
  }, []);

  const addToast = useCallback(
    (toastData) => {
      const id = `toast_${Date.now()}_${Math.random()}`;
      const toast = { id, ...toastData };

      setToasts((prev) => {
        // Deduplicate: replace existing toast for same chatId
        const filtered = prev.filter((t) => t.chatId !== toastData.chatId);
        return [...filtered, toast].slice(-4); // max 4 toasts at once
      });

      // Auto-dismiss after 5 seconds
      toastTimers.current[id] = setTimeout(() => {
        dismissToast(id);
      }, 5000);
    },
    [dismissToast],
  );

  // ── Socket event listeners ────────────────────────────────────────────────
  useEffect(() => {
    if (!socket) return;

    // Real-time toast when user is online
    const handleNewMessageNotification = (data) => {
      addToast({
        chatId: data.chatId,
        from: data.from,
        message: data.message,
        chatType: data.chatType,
        vehicleName: data.vehicleName,
      });
    };

    // In-app notification from delayed/instant scheduler
    const handleNotificationReceived = (data) => {
      if (data.notification) {
        setNotifications((prev) => [data.notification, ...prev]);
        setUnreadCount((prev) => prev + 1);
      }
    };

    socket.on("new_message_notification", handleNewMessageNotification);
    socket.on("notification_received", handleNotificationReceived);

    return () => {
      socket.off("new_message_notification", handleNewMessageNotification);
      socket.off("notification_received", handleNotificationReceived);
    };
  }, [socket, addToast]);

  // ── Poll for notifications every 30 seconds ───────────────────────────────
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  // ── Cleanup toast timers on unmount ───────────────────────────────────────
  useEffect(() => {
    return () => {
      Object.values(toastTimers.current).forEach(clearTimeout);
    };
  }, []);

  return {
    notifications,
    unreadCount,
    loading,
    error,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    // Toast
    toasts,
    dismissToast,
  };
};
