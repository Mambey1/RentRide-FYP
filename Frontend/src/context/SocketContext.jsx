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

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) {
      console.log("No token found, skipping socket connection");
      return;
    }

    // Get API URL from environment or use default
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

    newSocket.on("new_message_notification", (data) => {
      console.log("New message notification:", data);
      setUnreadCount((prev) => prev + 1);
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
        socketRef.current.emit("join_chat", chatId);
      }
    },
    [isConnected],
  );

  const sendMessage = useCallback(
    (chatId, message, attachments = []) => {
      if (socketRef.current && isConnected) {
        socketRef.current.emit("send_message", {
          chatId,
          message,
          attachments,
        });
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
    if (socketRef.current) {
      socketRef.current.on("new_message", callback);
      return () => socketRef.current.off("new_message", callback);
    }
    return () => {};
  }, []);

  const onMessagesRead = useCallback((callback) => {
    if (socketRef.current) {
      socketRef.current.on("messages_read", callback);
      return () => socketRef.current.off("messages_read", callback);
    }
    return () => {};
  }, []);

  const onUserTyping = useCallback((callback) => {
    if (socketRef.current) {
      socketRef.current.on("user_typing", callback);
      return () => socketRef.current.off("user_typing", callback);
    }
    return () => {};
  }, []);

  const onNewMessageNotification = useCallback((callback) => {
    if (socketRef.current) {
      socketRef.current.on("new_message_notification", callback);
      return () => socketRef.current.off("new_message_notification", callback);
    }
    return () => {};
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
    onMessagesRead,
    onUserTyping,
    onNewMessageNotification,
    resetUnreadCount,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
