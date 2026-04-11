import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within SocketProvider");
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const socketRef = useRef(null);
  const newMessageCallbacks = useRef(new Set());

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) {
      console.log("No token found, skipping socket connection");
      return;
    }

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
    const socketUrl = API_URL.replace("/api", "");

    console.log("Connecting to socket at:", socketUrl);

    const newSocket = io(socketUrl, {
      auth: { token },
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    newSocket.on("connect", () => {
      console.log("✅ Socket connected!");
      setIsConnected(true);
    });

    newSocket.on("disconnect", () => {
      console.log("❌ Socket disconnected!");
      setIsConnected(false);
    });

    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      setIsConnected(false);
    });

    newSocket.on("new_message", (data) => {
      console.log("📨 New message received via socket:", data);
      // Call all registered callbacks
      newMessageCallbacks.current.forEach((callback) => {
        try {
          callback(data);
        } catch (err) {
          console.error("Error in message callback:", err);
        }
      });
    });

    newSocket.on("new_message_notification", (data) => {
      console.log("🔔 New message notification:", data);
      setUnreadCount((prev) => prev + 1);
    });

    newSocket.on("messages_read", (data) => {
      console.log("📖 Messages read:", data);
    });

    newSocket.on("user_typing", (data) => {
      console.log("✍️ User typing:", data);
    });

    socketRef.current = newSocket;
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const joinChat = useCallback(
    (chatId) => {
      if (socketRef.current && isConnected) {
        console.log(`Joining chat: ${chatId}`);
        socketRef.current.emit("join_chat", chatId);
      }
    },
    [isConnected],
  );

  const sendMessage = useCallback(
    (chatId, message, attachments = []) => {
      if (socketRef.current && isConnected) {
        console.log(`Sending message to chat: ${chatId}`);
        socketRef.current.emit("send_message", {
          chatId,
          message,
          attachments,
        });
      } else {
        console.log("Socket not connected, message will be sent via API only");
      }
    },
    [isConnected],
  );

  const sendTyping = useCallback(
    (chatId, isTyping) => {
      if (socketRef.current && isConnected) {
        socketRef.current.emit("typing", { chatId, isTyping });
      }
    },
    [isConnected],
  );

  const onNewMessage = useCallback((callback) => {
    newMessageCallbacks.current.add(callback);
    return () => {
      newMessageCallbacks.current.delete(callback);
    };
  }, []);

  const resetUnreadCount = useCallback(() => {
    setUnreadCount(0);
  }, []);

  const value = {
    socket,
    isConnected,
    unreadCount,
    joinChat,
    sendMessage,
    sendTyping,
    onNewMessage,
    resetUnreadCount,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
