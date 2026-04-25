// // // // // // import React, {
// // // // // //   createContext,
// // // // // //   useContext,
// // // // // //   useEffect,
// // // // // //   useState,
// // // // // //   useRef,
// // // // // //   useCallback,
// // // // // // } from "react";
// // // // // // import io from "socket.io-client";

// // // // // // const SocketContext = createContext();

// // // // // // export const useSocket = () => {
// // // // // //   const context = useContext(SocketContext);
// // // // // //   if (!context) {
// // // // // //     throw new Error("useSocket must be used within SocketProvider");
// // // // // //   }
// // // // // //   return context;
// // // // // // };

// // // // // // export const SocketProvider = ({ children }) => {
// // // // // //   const [socket, setSocket] = useState(null);
// // // // // //   const [isConnected, setIsConnected] = useState(false);
// // // // // //   const [unreadCount, setUnreadCount] = useState(0);
// // // // // //   const socketRef = useRef(null);
// // // // // //   const newMessageCallbacks = useRef(new Set());

// // // // // //   useEffect(() => {
// // // // // //     const token =
// // // // // //       localStorage.getItem("token") || sessionStorage.getItem("token");

// // // // // //     if (!token) {
// // // // // //       console.log("No token found, skipping socket connection");
// // // // // //       return;
// // // // // //     }

// // // // // //     const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
// // // // // //     const socketUrl = API_URL.replace("/api", "");

// // // // // //     console.log("Connecting to socket at:", socketUrl);

// // // // // //     const newSocket = io(socketUrl, {
// // // // // //       auth: { token },
// // // // // //       transports: ["websocket", "polling"],
// // // // // //       reconnection: true,
// // // // // //       reconnectionAttempts: 5,
// // // // // //       reconnectionDelay: 1000,
// // // // // //     });

// // // // // //     newSocket.on("connect", () => {
// // // // // //       console.log("✅ Socket connected!");
// // // // // //       setIsConnected(true);
// // // // // //     });

// // // // // //     newSocket.on("disconnect", () => {
// // // // // //       console.log("❌ Socket disconnected!");
// // // // // //       setIsConnected(false);
// // // // // //     });

// // // // // //     newSocket.on("connect_error", (error) => {
// // // // // //       console.error("Socket connection error:", error);
// // // // // //       setIsConnected(false);
// // // // // //     });

// // // // // //     newSocket.on("new_message", (data) => {
// // // // // //       console.log("📨 New message received via socket:", data);
// // // // // //       // Call all registered callbacks
// // // // // //       newMessageCallbacks.current.forEach((callback) => {
// // // // // //         try {
// // // // // //           callback(data);
// // // // // //         } catch (err) {
// // // // // //           console.error("Error in message callback:", err);
// // // // // //         }
// // // // // //       });
// // // // // //     });

// // // // // //     newSocket.on("new_message_notification", (data) => {
// // // // // //       console.log("🔔 New message notification:", data);
// // // // // //       setUnreadCount((prev) => prev + 1);
// // // // // //     });

// // // // // //     newSocket.on("messages_read", (data) => {
// // // // // //       console.log("📖 Messages read:", data);
// // // // // //     });

// // // // // //     newSocket.on("user_typing", (data) => {
// // // // // //       console.log("✍️ User typing:", data);
// // // // // //     });

// // // // // //     socketRef.current = newSocket;
// // // // // //     setSocket(newSocket);

// // // // // //     return () => {
// // // // // //       newSocket.close();
// // // // // //     };
// // // // // //   }, []);

// // // // // //   const joinChat = useCallback(
// // // // // //     (chatId) => {
// // // // // //       if (socketRef.current && isConnected) {
// // // // // //         console.log(`Joining chat: ${chatId}`);
// // // // // //         socketRef.current.emit("join_chat", chatId);
// // // // // //       }
// // // // // //     },
// // // // // //     [isConnected],
// // // // // //   );

// // // // // //   const sendMessage = useCallback(
// // // // // //     (chatId, message, attachments = []) => {
// // // // // //       if (socketRef.current && isConnected) {
// // // // // //         console.log(`Sending message to chat: ${chatId}`);
// // // // // //         socketRef.current.emit("send_message", {
// // // // // //           chatId,
// // // // // //           message,
// // // // // //           attachments,
// // // // // //         });
// // // // // //       } else {
// // // // // //         console.log("Socket not connected, message will be sent via API only");
// // // // // //       }
// // // // // //     },
// // // // // //     [isConnected],
// // // // // //   );

// // // // // //   const sendTyping = useCallback(
// // // // // //     (chatId, isTyping) => {
// // // // // //       if (socketRef.current && isConnected) {
// // // // // //         socketRef.current.emit("typing", { chatId, isTyping });
// // // // // //       }
// // // // // //     },
// // // // // //     [isConnected],
// // // // // //   );

// // // // // //   const onNewMessage = useCallback((callback) => {
// // // // // //     newMessageCallbacks.current.add(callback);
// // // // // //     return () => {
// // // // // //       newMessageCallbacks.current.delete(callback);
// // // // // //     };
// // // // // //   }, []);

// // // // // //   const resetUnreadCount = useCallback(() => {
// // // // // //     setUnreadCount(0);
// // // // // //   }, []);

// // // // // //   const value = {
// // // // // //     socket,
// // // // // //     isConnected,
// // // // // //     unreadCount,
// // // // // //     joinChat,
// // // // // //     sendMessage,
// // // // // //     sendTyping,
// // // // // //     onNewMessage,
// // // // // //     resetUnreadCount,
// // // // // //   };

// // // // // //   return (
// // // // // //     <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
// // // // // //   );
// // // // // // };

// // // // // import React, {
// // // // //   createContext,
// // // // //   useContext,
// // // // //   useEffect,
// // // // //   useRef,
// // // // //   useState,
// // // // //   useCallback,
// // // // // } from "react";
// // // // // import { io } from "socket.io-client";

// // // // // const SocketContext = createContext(null);

// // // // // export const SocketProvider = ({ children }) => {
// // // // //   const socketRef = useRef(null);
// // // // //   const [isConnected, setIsConnected] = useState(false);
// // // // //   // Map of chatId → Set of listener callbacks
// // // // //   const messageListenersRef = useRef(new Map());
// // // // //   // Track which chat rooms we've joined
// // // // //   const joinedRoomsRef = useRef(new Set());

// // // // //   // ── Connect / disconnect ────────────────────────────────────────────────
// // // // //   useEffect(() => {
// // // // //     const token =
// // // // //       localStorage.getItem("token") || sessionStorage.getItem("token");
// // // // //     if (!token) return;

// // // // //     const socket = io("http://localhost:5000", {
// // // // //       auth: { token },
// // // // //       transports: ["websocket", "polling"],
// // // // //       reconnectionAttempts: 5,
// // // // //       reconnectionDelay: 1000,
// // // // //     });

// // // // //     socketRef.current = socket;

// // // // //     socket.on("connect", () => {
// // // // //       console.log("✅ Socket connected:", socket.id);
// // // // //       setIsConnected(true);

// // // // //       // Re-join any rooms we were in before reconnect
// // // // //       joinedRoomsRef.current.forEach((chatId) => {
// // // // //         socket.emit("join_chat", chatId);
// // // // //       });
// // // // //     });

// // // // //     socket.on("disconnect", (reason) => {
// // // // //       console.log("🔴 Socket disconnected:", reason);
// // // // //       setIsConnected(false);
// // // // //     });

// // // // //     socket.on("connect_error", (err) => {
// // // // //       console.error("Socket connect error:", err.message);
// // // // //       setIsConnected(false);
// // // // //     });

// // // // //     // ── Core message event — server emits "new_message" ──────────────────
// // // // //     // Your socket server does: io.to(`chat_${chatId}`).emit("new_message", { chatId, message })
// // // // //     socket.on("new_message", (data) => {
// // // // //       console.log("📩 new_message received:", data.chatId);
// // // // //       // Notify all registered listeners for this chatId
// // // // //       const listeners =
// // // // //         messageListenersRef.current.get(data.chatId) || new Set();
// // // // //       listeners.forEach((cb) => cb(data));
// // // // //       // Also notify wildcard listeners (registered with chatId = "*")
// // // // //       const wildcardListeners =
// // // // //         messageListenersRef.current.get("*") || new Set();
// // // // //       wildcardListeners.forEach((cb) => cb(data));
// // // // //     });

// // // // //     // ── Notification event (for unread badge updates) ────────────────────
// // // // //     socket.on("new_message_notification", (data) => {
// // // // //       console.log("🔔 Notification:", data.from, data.chatId);
// // // // //       const wildcardListeners =
// // // // //         messageListenersRef.current.get("*") || new Set();
// // // // //       wildcardListeners.forEach((cb) =>
// // // // //         cb({ chatId: data.chatId, message: null, notification: data }),
// // // // //       );
// // // // //     });

// // // // //     socket.on("messages_read", (data) => {
// // // // //       console.log("✓ Messages read in chat:", data.chatId);
// // // // //     });

// // // // //     socket.on("user_blocked", (data) => {
// // // // //       console.log("🚫 User blocked in chat:", data.chatId);
// // // // //     });

// // // // //     socket.on("error", (err) => {
// // // // //       console.error("Socket error from server:", err.message);
// // // // //     });

// // // // //     return () => {
// // // // //       socket.disconnect();
// // // // //       socketRef.current = null;
// // // // //       joinedRoomsRef.current.clear();
// // // // //     };
// // // // //   }, []); // Only runs once on mount

// // // // //   // ── Join a chat room ────────────────────────────────────────────────────
// // // // //   // Call this when opening a chat window so the socket joins `chat_${chatId}`
// // // // //   const joinChat = useCallback((chatId) => {
// // // // //     if (!chatId) return;
// // // // //     joinedRoomsRef.current.add(chatId);
// // // // //     if (socketRef.current?.connected) {
// // // // //       socketRef.current.emit("join_chat", chatId);
// // // // //       console.log("📡 Joined chat room:", chatId);
// // // // //     }
// // // // //   }, []);

// // // // //   // ── Leave a chat room ───────────────────────────────────────────────────
// // // // //   const leaveChat = useCallback((chatId) => {
// // // // //     if (!chatId) return;
// // // // //     joinedRoomsRef.current.delete(chatId);
// // // // //     if (socketRef.current?.connected) {
// // // // //       socketRef.current.emit("leave_chat", chatId);
// // // // //       console.log("👋 Left chat room:", chatId);
// // // // //     }
// // // // //   }, []);

// // // // //   // ── Subscribe to messages for a specific chat (or "*" for all) ──────────
// // // // //   // Returns an unsubscribe function — call it in useEffect cleanup
// // // // //   //
// // // // //   // Usage:
// // // // //   //   const unsub = onNewMessage(chatId, (data) => { ... })
// // // // //   //   return unsub;  ← in useEffect cleanup
// // // // //   //
// // // // //   // OR for global (any chat):
// // // // //   //   const unsub = onNewMessage("*", (data) => { ... })
// // // // //   const onNewMessage = useCallback((chatIdOrCallback, callbackOrUndefined) => {
// // // // //     // Support legacy single-argument form: onNewMessage(callback)
// // // // //     // In that case subscribe as wildcard "*"
// // // // //     let chatId, callback;
// // // // //     if (typeof chatIdOrCallback === "function") {
// // // // //       chatId = "*";
// // // // //       callback = chatIdOrCallback;
// // // // //     } else {
// // // // //       chatId = chatIdOrCallback;
// // // // //       callback = callbackOrUndefined;
// // // // //     }

// // // // //     if (!messageListenersRef.current.has(chatId)) {
// // // // //       messageListenersRef.current.set(chatId, new Set());
// // // // //     }
// // // // //     messageListenersRef.current.get(chatId).add(callback);

// // // // //     // Return unsubscribe
// // // // //     return () => {
// // // // //       const set = messageListenersRef.current.get(chatId);
// // // // //       if (set) set.delete(callback);
// // // // //     };
// // // // //   }, []);

// // // // //   // ── Send message via socket ─────────────────────────────────────────────
// // // // //   // Your server listens on "send_message" with { chatId, message }
// // // // //   const sendMessage = useCallback((chatId, message) => {
// // // // //     if (!socketRef.current?.connected) {
// // // // //       console.warn("Socket not connected, cannot send via socket");
// // // // //       return false;
// // // // //     }
// // // // //     socketRef.current.emit("send_message", { chatId, message });
// // // // //     return true;
// // // // //   }, []);

// // // // //   // ── Typing indicator ────────────────────────────────────────────────────
// // // // //   const sendTyping = useCallback((chatId, isTyping) => {
// // // // //     socketRef.current?.emit("typing", { chatId, isTyping });
// // // // //   }, []);

// // // // //   // ── Mark messages as read via socket ────────────────────────────────────
// // // // //   const markRead = useCallback((chatId) => {
// // // // //     socketRef.current?.emit("mark_read", chatId);
// // // // //   }, []);

// // // // //   return (
// // // // //     <SocketContext.Provider
// // // // //       value={{
// // // // //         socket: socketRef.current,
// // // // //         isConnected,
// // // // //         joinChat,
// // // // //         leaveChat,
// // // // //         onNewMessage,
// // // // //         sendMessage,
// // // // //         sendTyping,
// // // // //         markRead,
// // // // //       }}
// // // // //     >
// // // // //       {children}
// // // // //     </SocketContext.Provider>
// // // // //   );
// // // // // };

// // // // // export const useSocket = () => {
// // // // //   const ctx = useContext(SocketContext);
// // // // //   if (!ctx) throw new Error("useSocket must be used inside <SocketProvider>");
// // // // //   return ctx;
// // // // // };

// // // // import React, {
// // // //   createContext,
// // // //   useContext,
// // // //   useEffect,
// // // //   useRef,
// // // //   useState,
// // // //   useCallback,
// // // // } from "react";
// // // // import { io } from "socket.io-client";

// // // // const SocketContext = createContext(null);

// // // // export const SocketProvider = ({ children }) => {
// // // //   const socketRef = useRef(null);
// // // //   const [isConnected, setIsConnected] = useState(false);
// // // //   const [unreadCount, setUnreadCount] = useState(0);
// // // //   // Map of chatId → Set of listener callbacks
// // // //   const messageListenersRef = useRef(new Map());
// // // //   // Track which chat rooms we've joined
// // // //   const joinedRoomsRef = useRef(new Set());
// // // //   // Prevent duplicate message processing
// // // //   const processedMessageIdsRef = useRef(new Set());

// // // //   // ── Connect / disconnect ────────────────────────────────────────────────
// // // //   useEffect(() => {
// // // //     const token =
// // // //       localStorage.getItem("token") || sessionStorage.getItem("token");
// // // //     if (!token) return;

// // // //     const socket = io("http://localhost:5000", {
// // // //       auth: { token },
// // // //       transports: ["websocket", "polling"],
// // // //       reconnectionAttempts: 5,
// // // //       reconnectionDelay: 1000,
// // // //     });

// // // //     socketRef.current = socket;

// // // //     socket.on("connect", () => {
// // // //       console.log("✅ Socket connected:", socket.id);
// // // //       setIsConnected(true);
// // // //       // Re-join any rooms we were in before reconnect
// // // //       joinedRoomsRef.current.forEach((chatId) => {
// // // //         socket.emit("join_chat", chatId);
// // // //       });
// // // //     });

// // // //     socket.on("disconnect", (reason) => {
// // // //       console.log("🔴 Socket disconnected:", reason);
// // // //       setIsConnected(false);
// // // //     });

// // // //     socket.on("connect_error", (err) => {
// // // //       console.error("Socket connect error:", err.message);
// // // //       setIsConnected(false);
// // // //     });

// // // //     // ── Core message event ────────────────────────────────────────────────
// // // //     socket.on("new_message", (data) => {
// // // //       console.log("📩 new_message received:", data.chatId, data.message?._id);

// // // //       // Prevent duplicate message processing
// // // //       const messageId = data.message?._id;
// // // //       if (messageId && processedMessageIdsRef.current.has(messageId)) {
// // // //         console.log("Duplicate message ignored:", messageId);
// // // //         return;
// // // //       }
// // // //       if (messageId) {
// // // //         processedMessageIdsRef.current.add(messageId);
// // // //         // Clean up after 5 seconds
// // // //         setTimeout(() => {
// // // //           processedMessageIdsRef.current.delete(messageId);
// // // //         }, 5000);
// // // //       }

// // // //       // Notify all registered listeners for this chatId
// // // //       const listeners =
// // // //         messageListenersRef.current.get(data.chatId) || new Set();
// // // //       listeners.forEach((cb) => cb(data));

// // // //       // Also notify wildcard listeners
// // // //       const wildcardListeners =
// // // //         messageListenersRef.current.get("*") || new Set();
// // // //       wildcardListeners.forEach((cb) => cb(data));
// // // //     });

// // // //     // ── Notification event for unread badge ───────────────────────────────
// // // //     socket.on("new_message_notification", (data) => {
// // // //       console.log("🔔 Notification:", data.from, data.chatId);
// // // //       setUnreadCount((prev) => prev + 1);

// // // //       const wildcardListeners =
// // // //         messageListenersRef.current.get("*") || new Set();
// // // //       wildcardListeners.forEach((cb) =>
// // // //         cb({ chatId: data.chatId, message: null, notification: data }),
// // // //       );
// // // //     });

// // // //     socket.on("messages_read", (data) => {
// // // //       console.log("✓ Messages read in chat:", data.chatId);
// // // //     });

// // // //     socket.on("user_blocked", (data) => {
// // // //       console.log("🚫 User blocked in chat:", data.chatId);
// // // //     });

// // // //     socket.on("error", (err) => {
// // // //       console.error("Socket error from server:", err.message);
// // // //     });

// // // //     return () => {
// // // //       socket.disconnect();
// // // //       socketRef.current = null;
// // // //       joinedRoomsRef.current.clear();
// // // //       processedMessageIdsRef.current.clear();
// // // //     };
// // // //   }, []);

// // // //   // ── Join a chat room ────────────────────────────────────────────────────
// // // //   const joinChat = useCallback((chatId) => {
// // // //     if (!chatId) return;
// // // //     joinedRoomsRef.current.add(chatId);
// // // //     if (socketRef.current?.connected) {
// // // //       socketRef.current.emit("join_chat", chatId);
// // // //       console.log("📡 Joined chat room:", chatId);
// // // //     }
// // // //   }, []);

// // // //   // ── Leave a chat room ───────────────────────────────────────────────────
// // // //   const leaveChat = useCallback((chatId) => {
// // // //     if (!chatId) return;
// // // //     joinedRoomsRef.current.delete(chatId);
// // // //     if (socketRef.current?.connected) {
// // // //       socketRef.current.emit("leave_chat", chatId);
// // // //       console.log("👋 Left chat room:", chatId);
// // // //     }
// // // //   }, []);

// // // //   // ── Subscribe to messages ───────────────────────────────────────────────
// // // //   const onNewMessage = useCallback((chatIdOrCallback, callbackOrUndefined) => {
// // // //     let chatId, callback;
// // // //     if (typeof chatIdOrCallback === "function") {
// // // //       chatId = "*";
// // // //       callback = chatIdOrCallback;
// // // //     } else {
// // // //       chatId = chatIdOrCallback;
// // // //       callback = callbackOrUndefined;
// // // //     }

// // // //     if (!messageListenersRef.current.has(chatId)) {
// // // //       messageListenersRef.current.set(chatId, new Set());
// // // //     }
// // // //     messageListenersRef.current.get(chatId).add(callback);

// // // //     return () => {
// // // //       const set = messageListenersRef.current.get(chatId);
// // // //       if (set) set.delete(callback);
// // // //     };
// // // //   }, []);

// // // //   // ── Send message via socket ─────────────────────────────────────────────
// // // //   const sendMessage = useCallback((chatId, message) => {
// // // //     if (!socketRef.current?.connected) {
// // // //       console.warn("Socket not connected, cannot send via socket");
// // // //       return false;
// // // //     }
// // // //     socketRef.current.emit("send_message", { chatId, message });
// // // //     return true;
// // // //   }, []);

// // // //   // ── Typing indicator ────────────────────────────────────────────────────
// // // //   const sendTyping = useCallback((chatId, isTyping) => {
// // // //     if (socketRef.current?.connected) {
// // // //       socketRef.current.emit("typing", { chatId, isTyping });
// // // //     }
// // // //   }, []);

// // // //   // ── Mark messages as read via socket ────────────────────────────────────
// // // //   const markRead = useCallback((chatId) => {
// // // //     if (socketRef.current?.connected) {
// // // //       socketRef.current.emit("mark_read", chatId);
// // // //     }
// // // //   }, []);

// // // //   const resetUnreadCount = useCallback(() => {
// // // //     setUnreadCount(0);
// // // //   }, []);

// // // //   return (
// // // //     <SocketContext.Provider
// // // //       value={{
// // // //         socket: socketRef.current,
// // // //         isConnected,
// // // //         unreadCount,
// // // //         resetUnreadCount,
// // // //         joinChat,
// // // //         leaveChat,
// // // //         onNewMessage,
// // // //         sendMessage,
// // // //         sendTyping,
// // // //         markRead,
// // // //       }}
// // // //     >
// // // //       {children}
// // // //     </SocketContext.Provider>
// // // //   );
// // // // };

// // // // export const useSocket = () => {
// // // //   const ctx = useContext(SocketContext);
// // // //   if (!ctx) throw new Error("useSocket must be used inside <SocketProvider>");
// // // //   return ctx;
// // // // };

// // // import React, {
// // //   createContext,
// // //   useContext,
// // //   useEffect,
// // //   useRef,
// // //   useState,
// // //   useCallback,
// // // } from "react";
// // // import { io } from "socket.io-client";

// // // const SocketContext = createContext(null);

// // // export const SocketProvider = ({ children }) => {
// // //   const socketRef = useRef(null);
// // //   const [isConnected, setIsConnected] = useState(false);
// // //   const [unreadCount, setUnreadCount] = useState(0);
// // //   const messageListenersRef = useRef(new Map());
// // //   const joinedRoomsRef = useRef(new Set());
// // //   const processedMessageIdsRef = useRef(new Set());
// // //   const currentUserRef = useRef(null);

// // //   const disconnectSocket = useCallback(() => {
// // //     if (socketRef.current) {
// // //       console.log("Disconnecting socket...");
// // //       socketRef.current.disconnect();
// // //       socketRef.current = null;
// // //     }
// // //     setIsConnected(false);
// // //     joinedRoomsRef.current.clear();
// // //     processedMessageIdsRef.current.clear();
// // //     messageListenersRef.current.clear();
// // //   }, []);

// // //   const connectSocket = useCallback(
// // //     (token) => {
// // //       if (!token) {
// // //         console.log("No token provided, skipping socket connection");
// // //         return;
// // //       }

// // //       if (socketRef.current) {
// // //         disconnectSocket();
// // //       }

// // //       console.log("Connecting to socket with new token...");

// // //       const socket = io("http://localhost:5000", {
// // //         auth: { token },
// // //         transports: ["websocket", "polling"],
// // //         reconnectionAttempts: 5,
// // //         reconnectionDelay: 1000,
// // //         reconnection: true,
// // //       });

// // //       socketRef.current = socket;

// // //       socket.on("connect", () => {
// // //         console.log("✅ Socket connected:", socket.id);
// // //         setIsConnected(true);
// // //         joinedRoomsRef.current.forEach((chatId) => {
// // //           socket.emit("join_chat", chatId);
// // //         });
// // //       });

// // //       socket.on("disconnect", (reason) => {
// // //         console.log("🔴 Socket disconnected:", reason);
// // //         setIsConnected(false);
// // //       });

// // //       socket.on("connect_error", (err) => {
// // //         console.error("Socket connect error:", err.message);
// // //         setIsConnected(false);
// // //       });

// // //       socket.on("new_message", (data) => {
// // //         console.log("📩 new_message received:", data.chatId, data.message?._id);

// // //         const messageId = data.message?._id;
// // //         if (messageId && processedMessageIdsRef.current.has(messageId)) {
// // //           console.log("Duplicate message ignored:", messageId);
// // //           return;
// // //         }
// // //         if (messageId) {
// // //           processedMessageIdsRef.current.add(messageId);
// // //           setTimeout(() => {
// // //             processedMessageIdsRef.current.delete(messageId);
// // //           }, 5000);
// // //         }

// // //         const listeners =
// // //           messageListenersRef.current.get(data.chatId) || new Set();
// // //         listeners.forEach((cb) => cb(data));

// // //         const wildcardListeners =
// // //           messageListenersRef.current.get("*") || new Set();
// // //         wildcardListeners.forEach((cb) => cb(data));

// // //         setUnreadCount((prev) => prev + 1);
// // //       });

// // //       socket.on("new_message_notification", (data) => {
// // //         console.log("🔔 Notification:", data.from, data.chatId);
// // //         setUnreadCount((prev) => prev + 1);

// // //         const wildcardListeners =
// // //           messageListenersRef.current.get("*") || new Set();
// // //         wildcardListeners.forEach((cb) =>
// // //           cb({ chatId: data.chatId, message: null, notification: data }),
// // //         );
// // //       });

// // //       socket.on("messages_read", (data) => {
// // //         console.log("✓ Messages read in chat:", data.chatId);
// // //       });

// // //       socket.on("user_blocked", (data) => {
// // //         console.log("🚫 User blocked in chat:", data.chatId);
// // //       });

// // //       socket.on("error", (err) => {
// // //         console.error("Socket error from server:", err.message);
// // //       });

// // //       return socket;
// // //     },
// // //     [disconnectSocket],
// // //   );

// // //   useEffect(() => {
// // //     const checkAuth = () => {
// // //       const token =
// // //         localStorage.getItem("token") || sessionStorage.getItem("token");
// // //       const userStr =
// // //         localStorage.getItem("user") || sessionStorage.getItem("user");
// // //       let user = null;
// // //       try {
// // //         user = userStr ? JSON.parse(userStr) : null;
// // //       } catch (e) {
// // //         console.error("Error parsing user:", e);
// // //       }

// // //       const userId = user?._id || user?.id;

// // //       if (currentUserRef.current !== userId) {
// // //         console.log(`User changed from ${currentUserRef.current} to ${userId}`);
// // //         currentUserRef.current = userId;

// // //         if (token && userId) {
// // //           connectSocket(token);
// // //         } else {
// // //           disconnectSocket();
// // //         }
// // //       }
// // //     };

// // //     checkAuth();
// // //     window.addEventListener("storage", checkAuth);
// // //     const interval = setInterval(checkAuth, 2000);

// // //     return () => {
// // //       window.removeEventListener("storage", checkAuth);
// // //       clearInterval(interval);
// // //       disconnectSocket();
// // //     };
// // //   }, [connectSocket, disconnectSocket]);

// // //   const joinChat = useCallback((chatId) => {
// // //     if (!chatId) return;
// // //     joinedRoomsRef.current.add(chatId);
// // //     if (socketRef.current?.connected) {
// // //       socketRef.current.emit("join_chat", chatId);
// // //       console.log("📡 Joined chat room:", chatId);
// // //     }
// // //   }, []);

// // //   const leaveChat = useCallback((chatId) => {
// // //     if (!chatId) return;
// // //     joinedRoomsRef.current.delete(chatId);
// // //     if (socketRef.current?.connected) {
// // //       socketRef.current.emit("leave_chat", chatId);
// // //       console.log("👋 Left chat room:", chatId);
// // //     }
// // //   }, []);

// // //   const onNewMessage = useCallback((chatIdOrCallback, callbackOrUndefined) => {
// // //     let chatId, callback;
// // //     if (typeof chatIdOrCallback === "function") {
// // //       chatId = "*";
// // //       callback = chatIdOrCallback;
// // //     } else {
// // //       chatId = chatIdOrCallback;
// // //       callback = callbackOrUndefined;
// // //     }

// // //     if (!messageListenersRef.current.has(chatId)) {
// // //       messageListenersRef.current.set(chatId, new Set());
// // //     }
// // //     messageListenersRef.current.get(chatId).add(callback);

// // //     return () => {
// // //       const set = messageListenersRef.current.get(chatId);
// // //       if (set) set.delete(callback);
// // //     };
// // //   }, []);

// // //   const sendMessage = useCallback((chatId, message) => {
// // //     if (!socketRef.current?.connected) {
// // //       console.warn("Socket not connected, cannot send via socket");
// // //       return false;
// // //     }
// // //     socketRef.current.emit("send_message", { chatId, message });
// // //     return true;
// // //   }, []);

// // //   const sendTyping = useCallback((chatId, isTyping) => {
// // //     if (socketRef.current?.connected) {
// // //       socketRef.current.emit("typing", { chatId, isTyping });
// // //     }
// // //   }, []);

// // //   const markRead = useCallback((chatId) => {
// // //     if (socketRef.current?.connected) {
// // //       socketRef.current.emit("mark_read", chatId);
// // //     }
// // //   }, []);

// // //   const resetUnreadCount = useCallback(() => {
// // //     setUnreadCount(0);
// // //   }, []);

// // //   return (
// // //     <SocketContext.Provider
// // //       value={{
// // //         socket: socketRef.current,
// // //         isConnected,
// // //         unreadCount,
// // //         resetUnreadCount,
// // //         joinChat,
// // //         leaveChat,
// // //         onNewMessage,
// // //         sendMessage,
// // //         sendTyping,
// // //         markRead,
// // //       }}
// // //     >
// // //       {children}
// // //     </SocketContext.Provider>
// // //   );
// // // };

// // // export const useSocket = () => {
// // //   const ctx = useContext(SocketContext);
// // //   if (!ctx) throw new Error("useSocket must be used inside <SocketProvider>");
// // //   return ctx;
// // // };

// // import React, {
// //   createContext,
// //   useContext,
// //   useEffect,
// //   useRef,
// //   useState,
// //   useCallback,
// // } from "react";
// // import { io } from "socket.io-client";

// // const SocketContext = createContext(null);

// // export const SocketProvider = ({ children }) => {
// //   const socketRef = useRef(null);
// //   const [isConnected, setIsConnected] = useState(false);
// //   const [unreadCount, setUnreadCount] = useState(0);
// //   const messageListenersRef = useRef(new Map());
// //   const joinedRoomsRef = useRef(new Set());
// //   const processedMessageIdsRef = useRef(new Set());
// //   const currentUserRef = useRef(null);
// //   const reconnectAttemptsRef = useRef(0);
// //   const reconnectTimeoutRef = useRef(null);

// //   const disconnectSocket = useCallback(() => {
// //     if (reconnectTimeoutRef.current) {
// //       clearTimeout(reconnectTimeoutRef.current);
// //       reconnectTimeoutRef.current = null;
// //     }
// //     if (socketRef.current) {
// //       console.log("Disconnecting socket...");
// //       socketRef.current.removeAllListeners();
// //       socketRef.current.disconnect();
// //       socketRef.current = null;
// //     }
// //     setIsConnected(false);
// //     joinedRoomsRef.current.clear();
// //     processedMessageIdsRef.current.clear();
// //     // Don't clear message listeners on disconnect - they should persist
// //   }, []);

// //   const connectSocket = useCallback((token) => {
// //     if (!token) {
// //       console.log("No token provided, skipping socket connection");
// //       return null;
// //     }

// //     if (socketRef.current) {
// //       disconnectSocket();
// //     }

// //     console.log("Connecting to socket...");

// //     const socket = io("http://localhost:5000", {
// //       auth: { token },
// //       transports: ["websocket", "polling"],
// //       reconnectionAttempts: 10,
// //       reconnectionDelay: 1000,
// //       reconnectionDelayMax: 5000,
// //       timeout: 20000,
// //       autoConnect: true,
// //       forceNew: true,
// //     });

// //     socketRef.current = socket;

// //     socket.on("connect", () => {
// //       console.log("✅ Socket connected:", socket.id);
// //       setIsConnected(true);
// //       reconnectAttemptsRef.current = 0;

// //       // Re-join rooms after reconnection
// //       joinedRoomsRef.current.forEach((chatId) => {
// //         socket.emit("join_chat", chatId);
// //         console.log("🔄 Re-joined chat room:", chatId);
// //       });
// //     });

// //     socket.on("disconnect", (reason) => {
// //       console.log("🔴 Socket disconnected:", reason);
// //       setIsConnected(false);

// //       // Attempt manual reconnect if needed
// //       if (reason === "io server disconnect" || reason === "transport close") {
// //         console.log("Attempting to reconnect...");
// //         if (reconnectTimeoutRef.current) {
// //           clearTimeout(reconnectTimeoutRef.current);
// //         }
// //         reconnectTimeoutRef.current = setTimeout(() => {
// //           const newToken = localStorage.getItem("token") || sessionStorage.getItem("token");
// //           if (newToken) {
// //             connectSocket(newToken);
// //           }
// //           reconnectTimeoutRef.current = null;
// //         }, 3000);
// //       }
// //     });

// //     socket.on("connect_error", (err) => {
// //       console.error("Socket connect error:", err.message);
// //       setIsConnected(false);
// //       reconnectAttemptsRef.current++;

// //       if (reconnectAttemptsRef.current > 5) {
// //         console.log("Too many reconnect attempts, waiting longer...");
// //         if (reconnectTimeoutRef.current) {
// //           clearTimeout(reconnectTimeoutRef.current);
// //         }
// //         reconnectTimeoutRef.current = setTimeout(() => {
// //           const newToken = localStorage.getItem("token") || sessionStorage.getItem("token");
// //           if (newToken) {
// //             connectSocket(newToken);
// //           }
// //           reconnectAttemptsRef.current = 0;
// //           reconnectTimeoutRef.current = null;
// //         }, 10000);
// //       }
// //     });

// //     socket.on("new_message", (data) => {
// //       console.log("📩 new_message received:", data.chatId, data.message?._id);

// //       const messageId = data.message?._id;
// //       if (messageId && processedMessageIdsRef.current.has(messageId)) {
// //         console.log("Duplicate message ignored:", messageId);
// //         return;
// //       }
// //       if (messageId) {
// //         processedMessageIdsRef.current.add(messageId);
// //         setTimeout(() => {
// //           processedMessageIdsRef.current.delete(messageId);
// //         }, 5000);
// //       }

// //       // Update unread count for badge
// //       setUnreadCount((prev) => prev + 1);

// //       // Notify chat-specific listeners
// //       const listeners = messageListenersRef.current.get(data.chatId) || new Set();
// //       listeners.forEach((cb) => cb(data));

// //       // Notify wildcard listeners
// //       const wildcardListeners = messageListenersRef.current.get("*") || new Set();
// //       wildcardListeners.forEach((cb) => cb(data));
// //     });

// //     socket.on("new_message_notification", (data) => {
// //       console.log("🔔 Notification:", data.from, data.chatId);
// //       setUnreadCount((prev) => prev + 1);

// //       const wildcardListeners = messageListenersRef.current.get("*") || new Set();
// //       wildcardListeners.forEach((cb) =>
// //         cb({ chatId: data.chatId, message: null, notification: data })
// //       );
// //     });

// //     socket.on("messages_read", (data) => {
// //       console.log("✓ Messages read in chat:", data.chatId);
// //     });

// //     socket.on("user_blocked", (data) => {
// //       console.log("🚫 User blocked in chat:", data.chatId);
// //     });

// //     socket.on("user_typing", (data) => {
// //       console.log("✍️ User typing:", data.chatId, data.userId, data.isTyping);
// //     });

// //     socket.on("joined_chat", (data) => {
// //       console.log("✅ Joined chat:", data.chatId);
// //     });

// //     socket.on("error", (err) => {
// //       console.error("Socket error from server:", err.message);
// //     });

// //     return socket;
// //   }, [disconnectSocket]);

// //   // Monitor auth changes and reconnect when user logs in/out
// //   useEffect(() => {
// //     const checkAuth = () => {
// //       const token = localStorage.getItem("token") || sessionStorage.getItem("token");
// //       const userStr = localStorage.getItem("user") || sessionStorage.getItem("user");
// //       let user = null;
// //       try {
// //         user = userStr ? JSON.parse(userStr) : null;
// //       } catch (e) {
// //         console.error("Error parsing user:", e);
// //       }

// //       const userId = user?._id || user?.id;

// //       if (currentUserRef.current !== userId) {
// //         console.log(`User changed from ${currentUserRef.current} to ${userId}`);
// //         currentUserRef.current = userId;

// //         if (token && userId) {
// //           connectSocket(token);
// //         } else {
// //           disconnectSocket();
// //         }
// //       }
// //     };

// //     // Initial check
// //     checkAuth();

// //     // Listen for storage events (token changes in another tab)
// //     window.addEventListener("storage", checkAuth);

// //     // Poll for token changes (for same tab)
// //     const interval = setInterval(checkAuth, 3000);

// //     return () => {
// //       window.removeEventListener("storage", checkAuth);
// //       clearInterval(interval);
// //       disconnectSocket();
// //     };
// //   }, [connectSocket, disconnectSocket]);

// //   const joinChat = useCallback((chatId) => {
// //     if (!chatId) return;
// //     joinedRoomsRef.current.add(chatId);
// //     if (socketRef.current?.connected) {
// //       socketRef.current.emit("join_chat", chatId);
// //       console.log("📡 Joined chat room:", chatId);
// //     } else {
// //       console.log("Socket not connected, will join on reconnect");
// //     }
// //   }, []);

// //   const leaveChat = useCallback((chatId) => {
// //     if (!chatId) return;
// //     joinedRoomsRef.current.delete(chatId);
// //     if (socketRef.current?.connected) {
// //       socketRef.current.emit("leave_chat", chatId);
// //       console.log("👋 Left chat room:", chatId);
// //     }
// //   }, []);

// //   const onNewMessage = useCallback((chatIdOrCallback, callbackOrUndefined) => {
// //     let chatId, callback;
// //     if (typeof chatIdOrCallback === "function") {
// //       chatId = "*";
// //       callback = chatIdOrCallback;
// //     } else {
// //       chatId = chatIdOrCallback;
// //       callback = callbackOrUndefined;
// //     }

// //     if (!messageListenersRef.current.has(chatId)) {
// //       messageListenersRef.current.set(chatId, new Set());
// //     }
// //     messageListenersRef.current.get(chatId).add(callback);

// //     return () => {
// //       const set = messageListenersRef.current.get(chatId);
// //       if (set) set.delete(callback);
// //     };
// //   }, []);

// //   const sendMessage = useCallback((chatId, message) => {
// //     if (!socketRef.current?.connected) {
// //       console.warn("Socket not connected, cannot send via socket");
// //       return false;
// //     }
// //     socketRef.current.emit("send_message", { chatId, message });
// //     return true;
// //   }, []);

// //   const sendTyping = useCallback((chatId, isTyping) => {
// //     if (socketRef.current?.connected) {
// //       socketRef.current.emit("typing", { chatId, isTyping });
// //     }
// //   }, []);

// //   const markRead = useCallback((chatId) => {
// //     if (socketRef.current?.connected) {
// //       socketRef.current.emit("mark_read", chatId);
// //     }
// //   }, []);

// //   const resetUnreadCount = useCallback(() => {
// //     setUnreadCount(0);
// //   }, []);

// //   return (
// //     <SocketContext.Provider
// //       value={{
// //         socket: socketRef.current,
// //         isConnected,
// //         unreadCount,
// //         resetUnreadCount,
// //         joinChat,
// //         leaveChat,
// //         onNewMessage,
// //         sendMessage,
// //         sendTyping,
// //         markRead,
// //       }}
// //     >
// //       {children}
// //     </SocketContext.Provider>
// //   );
// // };

// // export const useSocket = () => {
// //   const ctx = useContext(SocketContext);
// //   if (!ctx) throw new Error("useSocket must be used inside <SocketProvider>");
// //   return ctx;
// // };

// // import React, {
// //   createContext,
// //   useContext,
// //   useEffect,
// //   useRef,
// //   useState,
// //   useCallback,
// // } from "react";
// // import { io } from "socket.io-client";

// // const SocketContext = createContext(null);

// // export const SocketProvider = ({ children }) => {
// //   const socketRef = useRef(null);
// //   const [isConnected, setIsConnected] = useState(false);
// //   const [unreadCount, setUnreadCount] = useState(0);
// //   const messageListenersRef = useRef(new Map());
// //   const joinedRoomsRef = useRef(new Set());
// //   const processedMessageIdsRef = useRef(new Set());
// //   const currentUserRef = useRef(null);
// //   const reconnectAttemptsRef = useRef(0);
// //   const reconnectTimeoutRef = useRef(null);
// //   const isConnectingRef = useRef(false);

// //   const disconnectSocket = useCallback(() => {
// //     if (reconnectTimeoutRef.current) {
// //       clearTimeout(reconnectTimeoutRef.current);
// //       reconnectTimeoutRef.current = null;
// //     }
// //     if (socketRef.current) {
// //       console.log("Disconnecting socket...");
// //       socketRef.current.removeAllListeners();
// //       socketRef.current.disconnect();
// //       socketRef.current = null;
// //     }
// //     setIsConnected(false);
// //     isConnectingRef.current = false;
// //     // Don't clear joinedRoomsRef - we'll rejoin on reconnect
// //     // Don't clear message listeners - they should persist
// //   }, []);

// //   const connectSocket = useCallback(
// //     (token) => {
// //       if (!token) {
// //         console.log("No token provided, skipping socket connection");
// //         return null;
// //       }

// //       if (isConnectingRef.current) {
// //         console.log("Already connecting, skipping...");
// //         return null;
// //       }

// //       if (socketRef.current) {
// //         disconnectSocket();
// //       }

// //       isConnectingRef.current = true;
// //       console.log("Connecting to socket...");

// //       const socket = io("http://localhost:5000", {
// //         auth: { token },
// //         transports: ["polling", "websocket"], // Try polling first, then upgrade to websocket
// //         reconnectionAttempts: 5,
// //         reconnectionDelay: 1000,
// //         reconnectionDelayMax: 5000,
// //         timeout: 20000,
// //         autoConnect: true,
// //         forceNew: true,
// //         upgrade: true,
// //         rememberUpgrade: false,
// //       });

// //       socketRef.current = socket;

// //       socket.on("connect", () => {
// //         console.log("✅ Socket connected:", socket.id);
// //         setIsConnected(true);
// //         isConnectingRef.current = false;
// //         reconnectAttemptsRef.current = 0;

// //         // Re-join rooms after reconnection
// //         joinedRoomsRef.current.forEach((chatId) => {
// //           socket.emit("join_chat", chatId);
// //           console.log("🔄 Re-joined chat room:", chatId);
// //         });
// //       });

// //       socket.on("disconnect", (reason) => {
// //         console.log("🔴 Socket disconnected:", reason);
// //         setIsConnected(false);

// //         // Attempt manual reconnect if disconnected by server
// //         if (reason === "io server disconnect") {
// //           console.log("Server disconnected, attempting to reconnect...");
// //           if (reconnectTimeoutRef.current) {
// //             clearTimeout(reconnectTimeoutRef.current);
// //           }
// //           reconnectTimeoutRef.current = setTimeout(() => {
// //             const newToken =
// //               localStorage.getItem("token") || sessionStorage.getItem("token");
// //             if (newToken) {
// //               isConnectingRef.current = false;
// //               connectSocket(newToken);
// //             }
// //             reconnectTimeoutRef.current = null;
// //           }, 2000);
// //         }
// //       });

// //       socket.on("connect_error", (err) => {
// //         console.error("Socket connect error:", err.message);
// //         setIsConnected(false);
// //         isConnectingRef.current = false;
// //         reconnectAttemptsRef.current++;

// //         // Don't retry too aggressively
// //         if (reconnectAttemptsRef.current > 3) {
// //           console.log("Multiple connection failures, will retry later...");
// //         }
// //       });

// //       socket.on("new_message", (data) => {
// //         console.log("📩 new_message received:", data.chatId, data.message?._id);

// //         const messageId = data.message?._id;
// //         if (messageId && processedMessageIdsRef.current.has(messageId)) {
// //           console.log("Duplicate message ignored:", messageId);
// //           return;
// //         }
// //         if (messageId) {
// //           processedMessageIdsRef.current.add(messageId);
// //           setTimeout(() => {
// //             processedMessageIdsRef.current.delete(messageId);
// //           }, 5000);
// //         }

// //         // Update unread count for badge
// //         setUnreadCount((prev) => prev + 1);

// //         // Notify chat-specific listeners
// //         const listeners =
// //           messageListenersRef.current.get(data.chatId) || new Set();
// //         listeners.forEach((cb) => cb(data));

// //         // Notify wildcard listeners
// //         const wildcardListeners =
// //           messageListenersRef.current.get("*") || new Set();
// //         wildcardListeners.forEach((cb) => cb(data));
// //       });

// //       socket.on("new_message_notification", (data) => {
// //         console.log("🔔 Notification:", data.from, data.chatId);
// //         setUnreadCount((prev) => prev + 1);

// //         const wildcardListeners =
// //           messageListenersRef.current.get("*") || new Set();
// //         wildcardListeners.forEach((cb) =>
// //           cb({ chatId: data.chatId, message: null, notification: data }),
// //         );
// //       });

// //       socket.on("messages_read", (data) => {
// //         console.log("✓ Messages read in chat:", data.chatId);
// //       });

// //       socket.on("user_blocked", (data) => {
// //         console.log("🚫 User blocked in chat:", data.chatId);
// //       });

// //       socket.on("user_typing", (data) => {
// //         console.log("✍️ User typing:", data.chatId);
// //       });

// //       socket.on("joined_chat", (data) => {
// //         console.log("✅ Joined chat:", data.chatId);
// //       });

// //       socket.on("error", (err) => {
// //         console.error("Socket error from server:", err.message);
// //       });

// //       return socket;
// //     },
// //     [disconnectSocket],
// //   );

// //   // Monitor auth changes and reconnect when user logs in/out
// //   useEffect(() => {
// //     const checkAuth = () => {
// //       const token =
// //         localStorage.getItem("token") || sessionStorage.getItem("token");
// //       const userStr =
// //         localStorage.getItem("user") || sessionStorage.getItem("user");
// //       let user = null;
// //       try {
// //         user = userStr ? JSON.parse(userStr) : null;
// //       } catch (e) {
// //         console.error("Error parsing user:", e);
// //       }

// //       const userId = user?._id || user?.id;

// //       if (currentUserRef.current !== userId) {
// //         console.log(`User changed from ${currentUserRef.current} to ${userId}`);
// //         currentUserRef.current = userId;

// //         if (token && userId) {
// //           // Small delay to ensure everything is ready
// //           setTimeout(() => {
// //             connectSocket(token);
// //           }, 500);
// //         } else {
// //           disconnectSocket();
// //         }
// //       }
// //     };

// //     // Initial check with delay
// //     setTimeout(checkAuth, 1000);

// //     // Listen for storage events (token changes in another tab)
// //     window.addEventListener("storage", checkAuth);

// //     // Poll for token changes (for same tab)
// //     const interval = setInterval(checkAuth, 5000);

// //     return () => {
// //       window.removeEventListener("storage", checkAuth);
// //       clearInterval(interval);
// //       disconnectSocket();
// //     };
// //   }, [connectSocket, disconnectSocket]);

// //   const joinChat = useCallback((chatId) => {
// //     if (!chatId) return;
// //     joinedRoomsRef.current.add(chatId);
// //     if (socketRef.current?.connected) {
// //       socketRef.current.emit("join_chat", chatId);
// //       console.log("📡 Joined chat room:", chatId);
// //     } else {
// //       console.log("Socket not connected, will join on reconnect");
// //     }
// //   }, []);

// //   const leaveChat = useCallback((chatId) => {
// //     if (!chatId) return;
// //     joinedRoomsRef.current.delete(chatId);
// //     if (socketRef.current?.connected) {
// //       socketRef.current.emit("leave_chat", chatId);
// //       console.log("👋 Left chat room:", chatId);
// //     }
// //   }, []);

// //   const onNewMessage = useCallback((chatIdOrCallback, callbackOrUndefined) => {
// //     let chatId, callback;
// //     if (typeof chatIdOrCallback === "function") {
// //       chatId = "*";
// //       callback = chatIdOrCallback;
// //     } else {
// //       chatId = chatIdOrCallback;
// //       callback = callbackOrUndefined;
// //     }

// //     if (!messageListenersRef.current.has(chatId)) {
// //       messageListenersRef.current.set(chatId, new Set());
// //     }
// //     messageListenersRef.current.get(chatId).add(callback);

// //     return () => {
// //       const set = messageListenersRef.current.get(chatId);
// //       if (set) set.delete(callback);
// //     };
// //   }, []);

// //   const sendMessage = useCallback((chatId, message) => {
// //     if (!socketRef.current?.connected) {
// //       console.warn("Socket not connected, cannot send via socket");
// //       return false;
// //     }
// //     socketRef.current.emit("send_message", { chatId, message });
// //     return true;
// //   }, []);

// //   const sendTyping = useCallback((chatId, isTyping) => {
// //     if (socketRef.current?.connected) {
// //       socketRef.current.emit("typing", { chatId, isTyping });
// //     }
// //   }, []);

// //   const markRead = useCallback((chatId) => {
// //     if (socketRef.current?.connected) {
// //       socketRef.current.emit("mark_read", chatId);
// //     }
// //   }, []);

// //   const resetUnreadCount = useCallback(() => {
// //     setUnreadCount(0);
// //   }, []);

// //   return (
// //     <SocketContext.Provider
// //       value={{
// //         socket: socketRef.current,
// //         isConnected,
// //         unreadCount,
// //         resetUnreadCount,
// //         joinChat,
// //         leaveChat,
// //         onNewMessage,
// //         sendMessage,
// //         sendTyping,
// //         markRead,
// //       }}
// //     >
// //       {children}
// //     </SocketContext.Provider>
// //   );
// // };

// // export const useSocket = () => {
// //   const ctx = useContext(SocketContext);
// //   if (!ctx) throw new Error("useSocket must be used inside <SocketProvider>");
// //   return ctx;
// // };

// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useRef,
//   useState,
//   useCallback,
// } from "react";
// import { io } from "socket.io-client";

// const SocketContext = createContext(null);

// export const SocketProvider = ({ children }) => {
//   const socketRef = useRef(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const messageListenersRef = useRef(new Map());
//   const notificationListenersRef = useRef(new Set());
//   const joinedRoomsRef = useRef(new Set());
//   const processedMessageIdsRef = useRef(new Set());
//   const currentUserRef = useRef(null);
//   const reconnectAttemptsRef = useRef(0);
//   const reconnectTimeoutRef = useRef(null);
//   const isConnectingRef = useRef(false);

//   const disconnectSocket = useCallback(() => {
//     if (reconnectTimeoutRef.current) {
//       clearTimeout(reconnectTimeoutRef.current);
//       reconnectTimeoutRef.current = null;
//     }
//     if (socketRef.current) {
//       console.log("Disconnecting socket...");
//       socketRef.current.removeAllListeners();
//       socketRef.current.disconnect();
//       socketRef.current = null;
//     }
//     setIsConnected(false);
//     isConnectingRef.current = false;
//   }, []);

//   const connectSocket = useCallback((token) => {
//     if (!token) {
//       console.log("No token provided, skipping socket connection");
//       return null;
//     }

//     if (isConnectingRef.current) {
//       console.log("Already connecting, skipping...");
//       return null;
//     }

//     if (socketRef.current) {
//       disconnectSocket();
//     }

//     isConnectingRef.current = true;
//     console.log("Connecting to socket...");

//     const socket = io("http://localhost:5000", {
//       auth: { token },
//       transports: ["polling", "websocket"],
//       reconnectionAttempts: 5,
//       reconnectionDelay: 1000,
//       reconnectionDelayMax: 5000,
//       timeout: 20000,
//       autoConnect: true,
//       forceNew: true,
//     });

//     socketRef.current = socket;

//     socket.on("connect", () => {
//       console.log("✅ Socket connected:", socket.id);
//       setIsConnected(true);
//       isConnectingRef.current = false;
//       reconnectAttemptsRef.current = 0;

//       joinedRoomsRef.current.forEach((chatId) => {
//         socket.emit("join_chat", chatId);
//         console.log("🔄 Re-joined chat room:", chatId);
//       });
//     });

//     socket.on("disconnect", (reason) => {
//       console.log("🔴 Socket disconnected:", reason);
//       setIsConnected(false);

//       if (reason === "io server disconnect") {
//         console.log("Server disconnected, attempting to reconnect...");
//         if (reconnectTimeoutRef.current) {
//           clearTimeout(reconnectTimeoutRef.current);
//         }
//         reconnectTimeoutRef.current = setTimeout(() => {
//           const newToken = localStorage.getItem("token") || sessionStorage.getItem("token");
//           if (newToken) {
//             isConnectingRef.current = false;
//             connectSocket(newToken);
//           }
//           reconnectTimeoutRef.current = null;
//         }, 2000);
//       }
//     });

//     socket.on("connect_error", (err) => {
//       console.error("Socket connect error:", err.message);
//       setIsConnected(false);
//       isConnectingRef.current = false;
//       reconnectAttemptsRef.current++;
//     });

//     // New message event
//     socket.on("new_message", (data) => {
//       console.log("📩 new_message received:", data.chatId, data.message?._id);

//       const messageId = data.message?._id;
//       if (messageId && processedMessageIdsRef.current.has(messageId)) {
//         console.log("Duplicate message ignored:", messageId);
//         return;
//       }
//       if (messageId) {
//         processedMessageIdsRef.current.add(messageId);
//         setTimeout(() => {
//           processedMessageIdsRef.current.delete(messageId);
//         }, 5000);
//       }

//       // Update unread count for badge
//       setUnreadCount((prev) => prev + 1);

//       // Notify chat-specific listeners
//       const listeners = messageListenersRef.current.get(data.chatId) || new Set();
//       listeners.forEach((cb) => cb(data));

//       // Notify wildcard listeners
//       const wildcardListeners = messageListenersRef.current.get("*") || new Set();
//       wildcardListeners.forEach((cb) => cb(data));
//     });

//     // Notification event for new messages (for the bell/badge)
//     socket.on("new_message_notification", (data) => {
//       console.log("🔔 Notification:", data.from, data.chatId);
//       setUnreadCount((prev) => prev + 1);

//       // Notify all notification listeners
//       notificationListenersRef.current.forEach((cb) => cb(data));

//       // Also notify wildcard message listeners
//       const wildcardListeners = messageListenersRef.current.get("*") || new Set();
//       wildcardListeners.forEach((cb) => cb({ chatId: data.chatId, message: null, notification: data }));
//     });

//     socket.on("messages_read", (data) => {
//       console.log("✓ Messages read in chat:", data.chatId);
//     });

//     socket.on("user_blocked", (data) => {
//       console.log("🚫 User blocked in chat:", data.chatId);
//     });

//     socket.on("user_typing", (data) => {
//       console.log("✍️ User typing:", data.chatId);
//     });

//     socket.on("joined_chat", (data) => {
//       console.log("✅ Joined chat:", data.chatId);
//     });

//     socket.on("error", (err) => {
//       console.error("Socket error from server:", err.message);
//     });

//     return socket;
//   }, [disconnectSocket]);

//   // Monitor auth changes
//   useEffect(() => {
//     const checkAuth = () => {
//       const token = localStorage.getItem("token") || sessionStorage.getItem("token");
//       const userStr = localStorage.getItem("user") || sessionStorage.getItem("user");
//       let user = null;
//       try {
//         user = userStr ? JSON.parse(userStr) : null;
//       } catch (e) {
//         console.error("Error parsing user:", e);
//       }

//       const userId = user?._id || user?.id;

//       if (currentUserRef.current !== userId) {
//         console.log(`User changed from ${currentUserRef.current} to ${userId}`);
//         currentUserRef.current = userId;

//         if (token && userId) {
//           setTimeout(() => {
//             connectSocket(token);
//           }, 500);
//         } else {
//           disconnectSocket();
//         }
//       }
//     };

//     setTimeout(checkAuth, 1000);
//     window.addEventListener("storage", checkAuth);
//     const interval = setInterval(checkAuth, 5000);

//     return () => {
//       window.removeEventListener("storage", checkAuth);
//       clearInterval(interval);
//       disconnectSocket();
//     };
//   }, [connectSocket, disconnectSocket]);

//   const joinChat = useCallback((chatId) => {
//     if (!chatId) return;
//     joinedRoomsRef.current.add(chatId);
//     if (socketRef.current?.connected) {
//       socketRef.current.emit("join_chat", chatId);
//       console.log("📡 Joined chat room:", chatId);
//     } else {
//       console.log("Socket not connected, will join on reconnect");
//     }
//   }, []);

//   const leaveChat = useCallback((chatId) => {
//     if (!chatId) return;
//     joinedRoomsRef.current.delete(chatId);
//     if (socketRef.current?.connected) {
//       socketRef.current.emit("leave_chat", chatId);
//       console.log("👋 Left chat room:", chatId);
//     }
//   }, []);

//   const onNewMessage = useCallback((chatIdOrCallback, callbackOrUndefined) => {
//     let chatId, callback;
//     if (typeof chatIdOrCallback === "function") {
//       chatId = "*";
//       callback = chatIdOrCallback;
//     } else {
//       chatId = chatIdOrCallback;
//       callback = callbackOrUndefined;
//     }

//     if (!messageListenersRef.current.has(chatId)) {
//       messageListenersRef.current.set(chatId, new Set());
//     }
//     messageListenersRef.current.get(chatId).add(callback);

//     return () => {
//       const set = messageListenersRef.current.get(chatId);
//       if (set) set.delete(callback);
//     };
//   }, []);

//   // Add onNewMessageNotification method
//   const onNewMessageNotification = useCallback((callback) => {
//     notificationListenersRef.current.add(callback);
//     return () => {
//       notificationListenersRef.current.delete(callback);
//     };
//   }, []);

//   const sendMessage = useCallback((chatId, message) => {
//     if (!socketRef.current?.connected) {
//       console.warn("Socket not connected, cannot send via socket");
//       return false;
//     }
//     socketRef.current.emit("send_message", { chatId, message });
//     return true;
//   }, []);

//   const sendTyping = useCallback((chatId, isTyping) => {
//     if (socketRef.current?.connected) {
//       socketRef.current.emit("typing", { chatId, isTyping });
//     }
//   }, []);

//   const markRead = useCallback((chatId) => {
//     if (socketRef.current?.connected) {
//       socketRef.current.emit("mark_read", chatId);
//     }
//   }, []);

//   const resetUnreadCount = useCallback(() => {
//     setUnreadCount(0);
//   }, []);

//   return (
//     <SocketContext.Provider
//       value={{
//         socket: socketRef.current,
//         isConnected,
//         unreadCount,
//         resetUnreadCount,
//         joinChat,
//         leaveChat,
//         onNewMessage,
//         onNewMessageNotification, // ← This was missing!
//         sendMessage,
//         sendTyping,
//         markRead,
//       }}
//     >
//       {children}
//     </SocketContext.Provider>
//   );
// };

// export const useSocket = () => {
//   const ctx = useContext(SocketContext);
//   if (!ctx) throw new Error("useSocket must be used inside <SocketProvider>");
//   return ctx;
// };

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messageListenersRef = useRef(new Map());
  const notificationListenersRef = useRef(new Set());
  const joinedRoomsRef = useRef(new Set());
  const processedMessageIdsRef = useRef(new Set());
  const currentUserRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const isConnectingRef = useRef(false);

  const disconnectSocket = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    if (socketRef.current) {
      console.log("Disconnecting socket...");
      socketRef.current.removeAllListeners();
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    setIsConnected(false);
    isConnectingRef.current = false;
  }, []);

  const connectSocket = useCallback(
    (token) => {
      if (!token) return null;
      if (isConnectingRef.current) return null;
      if (socketRef.current) disconnectSocket();

      isConnectingRef.current = true;

      const socket = io("http://localhost:5000", {
        auth: { token },
        transports: ["polling", "websocket"],
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        timeout: 20000,
        autoConnect: true,
        forceNew: true,
      });

      socketRef.current = socket;

      socket.on("connect", () => {
        console.log("✅ Socket connected:", socket.id);
        setIsConnected(true);
        isConnectingRef.current = false;
        joinedRoomsRef.current.forEach((chatId) => {
          socket.emit("join_chat", chatId);
        });
      });

      socket.on("disconnect", (reason) => {
        console.log("🔴 Socket disconnected:", reason);
        setIsConnected(false);
        if (reason === "io server disconnect") {
          reconnectTimeoutRef.current = setTimeout(() => {
            const newToken =
              localStorage.getItem("token") || sessionStorage.getItem("token");
            if (newToken) {
              isConnectingRef.current = false;
              connectSocket(newToken);
            }
            reconnectTimeoutRef.current = null;
          }, 2000);
        }
      });

      socket.on("connect_error", (err) => {
        console.error("Socket connect error:", err.message);
        setIsConnected(false);
        isConnectingRef.current = false;
      });

      // ── new_message ───────────────────────────────────────────────────────────
      socket.on("new_message", (data) => {
        const messageId = data.message?._id;

        // Dedup
        if (messageId && processedMessageIdsRef.current.has(messageId)) return;
        if (messageId) {
          processedMessageIdsRef.current.add(messageId);
          setTimeout(
            () => processedMessageIdsRef.current.delete(messageId),
            5000,
          );
        }

        // Get current user to check if this is own message
        const userStr =
          localStorage.getItem("user") || sessionStorage.getItem("user");
        let currentUserId = null;
        try {
          const u = userStr ? JSON.parse(userStr) : null;
          currentUserId = u?._id || u?.id;
        } catch (e) {}

        const senderId = data.senderId || data.message?.sender?._id;
        const isOwnMessage =
          senderId && currentUserId && senderId === currentUserId;

        // Only increment unread badge for messages FROM others
        if (!isOwnMessage) {
          setUnreadCount((prev) => prev + 1);
        }

        // Notify per-chat listeners
        const chatListeners =
          messageListenersRef.current.get(data.chatId) || new Set();
        chatListeners.forEach((cb) => cb(data));

        // Notify wildcard listeners
        const wildcardListeners =
          messageListenersRef.current.get("*") || new Set();
        wildcardListeners.forEach((cb) => cb(data));
      });

      // ── new_message_notification (only fires for recipients, not sender) ──────
      socket.on("new_message_notification", (data) => {
        console.log("🔔 Notification:", data.from, data.chatId);
        // This event is only emitted to OTHER participants by the backend
        // so we can safely increment here
        setUnreadCount((prev) => prev + 1);
        notificationListenersRef.current.forEach((cb) => cb(data));
      });

      socket.on("messages_read", (data) => {
        console.log("✓ Messages read:", data.chatId);
      });

      socket.on("user_blocked", (data) => {
        console.log("🚫 Blocked:", data.chatId);
        const listeners =
          messageListenersRef.current.get(data.chatId) || new Set();
        listeners.forEach((cb) =>
          cb({ chatId: data.chatId, event: "user_blocked", ...data }),
        );
      });

      socket.on("user_unblocked", (data) => {
        console.log("🔓 Unblocked:", data.chatId);
      });

      socket.on("message_unsent", (data) => {
        const listeners =
          messageListenersRef.current.get(data.chatId) || new Set();
        listeners.forEach((cb) =>
          cb({ chatId: data.chatId, event: "message_unsent", ...data }),
        );
        const wildcard = messageListenersRef.current.get("*") || new Set();
        wildcard.forEach((cb) =>
          cb({ chatId: data.chatId, event: "message_unsent", ...data }),
        );
      });

      socket.on("message_reaction", (data) => {
        const listeners =
          messageListenersRef.current.get(data.chatId) || new Set();
        listeners.forEach((cb) =>
          cb({ chatId: data.chatId, event: "message_reaction", ...data }),
        );
      });

      socket.on("error", (err) => {
        console.error("Socket error:", err.message);
      });

      return socket;
    },
    [disconnectSocket],
  );

  // Monitor auth changes
  useEffect(() => {
    const checkAuth = () => {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const userStr =
        localStorage.getItem("user") || sessionStorage.getItem("user");
      let user = null;
      try {
        user = userStr ? JSON.parse(userStr) : null;
      } catch (e) {}
      const userId = user?._id || user?.id;

      if (currentUserRef.current !== userId) {
        currentUserRef.current = userId;
        if (token && userId) {
          setTimeout(() => connectSocket(token), 500);
        } else {
          disconnectSocket();
        }
      }
    };

    setTimeout(checkAuth, 1000);
    window.addEventListener("storage", checkAuth);
    const interval = setInterval(checkAuth, 5000);

    return () => {
      window.removeEventListener("storage", checkAuth);
      clearInterval(interval);
      disconnectSocket();
    };
  }, [connectSocket, disconnectSocket]);

  const joinChat = useCallback((chatId) => {
    if (!chatId) return;
    joinedRoomsRef.current.add(chatId);
    if (socketRef.current?.connected) {
      socketRef.current.emit("join_chat", chatId);
      console.log(
        "📡 Joining chat:",
        chatId,
        "for user:",
        currentUserRef.current,
      );
    }
  }, []);

  const leaveChat = useCallback((chatId) => {
    if (!chatId) return;
    joinedRoomsRef.current.delete(chatId);
    if (socketRef.current?.connected) {
      socketRef.current.emit("leave_chat", chatId);
      console.log("👋 User", currentUserRef.current, "left chat", chatId);
    }
  }, []);

  const onNewMessage = useCallback((chatIdOrCallback, callbackOrUndefined) => {
    let chatId, callback;
    if (typeof chatIdOrCallback === "function") {
      chatId = "*";
      callback = chatIdOrCallback;
    } else {
      chatId = chatIdOrCallback;
      callback = callbackOrUndefined;
    }
    if (!messageListenersRef.current.has(chatId)) {
      messageListenersRef.current.set(chatId, new Set());
    }
    messageListenersRef.current.get(chatId).add(callback);
    return () => {
      const set = messageListenersRef.current.get(chatId);
      if (set) set.delete(callback);
    };
  }, []);

  const onNewMessageNotification = useCallback((callback) => {
    notificationListenersRef.current.add(callback);
    return () => notificationListenersRef.current.delete(callback);
  }, []);

  const sendMessage = useCallback((chatId, message) => {
    if (!socketRef.current?.connected) return false;
    socketRef.current.emit("send_message", { chatId, message });
    return true;
  }, []);

  const sendTyping = useCallback((chatId, isTyping) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit("typing", { chatId, isTyping });
    }
  }, []);

  const markRead = useCallback((chatId) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit("mark_read", chatId);
    }
  }, []);

  const resetUnreadCount = useCallback(() => setUnreadCount(0), []);

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
        isConnected,
        unreadCount,
        resetUnreadCount,
        joinChat,
        leaveChat,
        onNewMessage,
        onNewMessageNotification,
        sendMessage,
        sendTyping,
        markRead,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const ctx = useContext(SocketContext);
  if (!ctx) throw new Error("useSocket must be used inside <SocketProvider>");
  return ctx;
};
