import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSocket } from "../../context/SocketContext";
import { chatService } from "../../services/chatService";
import {
  FaPaperPlane,
  FaTimes,
  FaUserCircle,
  FaSpinner,
  FaCheck,
  FaCheckDouble,
  FaImage,
  FaSmile,
  FaArrowLeft,
  FaPhone,
  FaVideo,
  FaEllipsisV,
} from "react-icons/fa";

const ChatWindow = ({ chat, onClose, onMessageSent }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [typing, setTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState({});
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const fileInputRef = useRef(null);

  const {
    isConnected,
    joinChat,
    sendMessage,
    sendTyping,
    onNewMessage,
    onMessagesRead,
    onUserTyping,
  } = useSocket();

  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  // Load messages
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const response = await chatService.getChat(chat._id);
        if (response.success) {
          setMessages(response.data.messages || []);
          // Mark messages as read
          await chatService.markAsRead(chat._id);
        }
      } catch (error) {
        console.error("Error loading messages:", error);
      } finally {
        setLoading(false);
      }
    };
    loadMessages();
  }, [chat._id]);

  // Join chat room
  useEffect(() => {
    if (isConnected && chat._id) {
      joinChat(chat._id);
    }
  }, [isConnected, chat._id, joinChat]);

  // Listen for new messages
  useEffect(() => {
    const unsubscribe = onNewMessage((data) => {
      if (data.chatId === chat._id) {
        setMessages((prev) => [...prev, data.message]);
        // Mark as read if window is focused
        chatService.markAsRead(chat._id);
        if (onMessageSent) onMessageSent();
      }
    });
    return unsubscribe;
  }, [chat._id, onNewMessage, onMessageSent]);

  // Listen for messages read event
  useEffect(() => {
    const unsubscribe = onMessagesRead((data) => {
      if (data.chatId === chat._id) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.sender?._id !== currentUser.id && !msg.read
              ? { ...msg, read: true, readAt: new Date() }
              : msg
          )
        );
      }
    });
    return unsubscribe;
  }, [chat._id, currentUser.id, onMessagesRead]);

  // Listen for typing indicators
  useEffect(() => {
    const unsubscribe = onUserTyping((data) => {
      if (data.chatId === chat._id && data.userId !== currentUser.id) {
        setTypingUsers((prev) => ({
          ...prev,
          [data.userId]: data.isTyping,
        }));
        // Auto-clear after 3 seconds if not cleared
        if (data.isTyping) {
          setTimeout(() => {
            setTypingUsers((prev) => ({
              ...prev,
              [data.userId]: false,
            }));
          }, 3000);
        }
      }
    });
    return unsubscribe;
  }, [chat._id, currentUser.id, onUserTyping]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || sending) return;

    setSending(true);
    sendMessage(chat._id, newMessage.trim());
    setNewMessage("");
    setSending(false);
    
    if (onMessageSent) onMessageSent();
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    
    if (!typing) {
      setTyping(true);
      sendTyping(chat._id, true);
    }
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    typingTimeoutRef.current = setTimeout(() => {
      setTyping(false);
      sendTyping(chat._id, false);
    }, 1000);
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (date) => {
    const today = new Date();
    const msgDate = new Date(date);
    
    if (msgDate.toDateString() === today.toDateString()) {
      return "Today";
    }
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (msgDate.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }
    
    return msgDate.toLocaleDateString();
  };

  const getOtherParticipant = () => {
    const others = chat.participants.filter(p => p._id !== currentUser.id);
    if (others.length > 0) return others[0];
    return null;
  };

  const otherUser = getOtherParticipant();
  const isTyping = Object.values(typingUsers).some(Boolean);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <FaSpinner className="animate-spin text-blue-500 text-3xl" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="lg:hidden hover:bg-white/20 p-2 rounded-full transition">
            <FaArrowLeft />
          </button>
          {otherUser?.profilePhoto ? (
            <img
              src={`http://localhost:5000/uploads/profiles/${otherUser.profilePhoto}`}
              alt={otherUser.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-white"
            />
          ) : (
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <FaUserCircle className="text-2xl" />
            </div>
          )}
          <div>
            <h3 className="font-semibold">{otherUser?.name || "Support Team"}</h3>
            <p className="text-xs text-white/80">
              {chat.chatType === "support" ? "Support Team" : 
               otherUser?.role === "admin" ? "Admin" : "Vehicle Owner"}
              {chat.vehicleName && ` • ${chat.vehicleName}`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-white/20 rounded-full transition">
            <FaPhone size={16} />
          </button>
          <button className="p-2 hover:bg-white/20 rounded-full transition">
            <FaVideo size={16} />
          </button>
          <button className="p-2 hover:bg-white/20 rounded-full transition">
            <FaEllipsisV size={16} />
          </button>
          <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition">
            <FaTimes />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message, index) => {
          const isOwn = message.sender?._id === currentUser.id;
          const showDate = index === 0 || 
            new Date(message.createdAt).toDateString() !== new Date(messages[index - 1]?.createdAt).toDateString();
          
          return (
            <div key={message._id || index}>
              {showDate && (
                <div className="text-center my-2">
                  <span className="text-xs text-gray-400 bg-gray-200 px-3 py-1 rounded-full">
                    {formatDate(message.createdAt)}
                  </span>
                </div>
              )}
              <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
                {!isOwn && (
                  <div className="flex-shrink-0 mr-2">
                    {otherUser?.profilePhoto ? (
                      <img
                        src={`http://localhost:5000/uploads/profiles/${otherUser.profilePhoto}`}
                        alt=""
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <FaUserCircle className="text-gray-500" />
                      </div>
                    )}
                  </div>
                )}
                <div className={`max-w-[70%] ${isOwn ? "order-1" : "order-2"}`}>
                  <div
                    className={`rounded-2xl px-4 py-2 ${
                      isOwn
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-sm"
                        : "bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-sm"
                    }`}
                  >
                    <p className="text-sm break-words">{message.message}</p>
                  </div>
                  <div className={`text-xs text-gray-400 mt-1 flex items-center gap-1 ${isOwn ? "justify-end" : "justify-start"}`}>
                    <span>{formatTime(message.createdAt)}</span>
                    {isOwn && (
                      <>
                        {message.read ? (
                          <FaCheckDouble className="text-blue-500 text-xs" title="Read" />
                        ) : message.delivered ? (
                          <FaCheck className="text-gray-400 text-xs" title="Delivered" />
                        ) : (
                          <FaSpinner className="animate-spin text-xs" title="Sending" />
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-2 shadow-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t bg-white">
        <div className="flex items-center gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-gray-500 hover:text-blue-600 transition rounded-full"
          >
            <FaImage size={20} />
          </button>
          <button className="p-2 text-gray-500 hover:text-blue-600 transition rounded-full">
            <FaSmile size={20} />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
          />
          <input
            type="text"
            value={newMessage}
            onChange={handleTyping}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || sending}
            className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg transition disabled:opacity-50"
          >
            <FaPaperPlane size={18} />
          </button>
        </div>
        {!isConnected && (
          <p className="text-xs text-red-500 text-center mt-2">
            Connecting to chat server...
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;