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
  FaCar,
  FaExpand,
  FaCompress,
} from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";

const ChatWindow = ({ chat, onClose, onMessageSent }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [typing, setTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState({});
  const [chatPartner, setChatPartner] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const fileInputRef = useRef(null);
  const emojiButtonRef = useRef(null);

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

  // Get chat partner details
  const getChatPartner = useCallback(async () => {
    try {
      const otherParticipant = chat.participants.find(
        (p) => p._id !== currentUser.id,
      );

      if (otherParticipant) {
        let role = "user";
        let displayName = otherParticipant.name;
        let image = null;

        if (chat.chatType === "vehicle") {
          if (otherParticipant.role === "admin") {
            role = "admin";
            displayName = "Support Team";
            image = `https://ui-avatars.com/api/?background=6B21A5&color=fff&rounded=true&size=128&name=Support`;
          } else {
            role = "owner";
            displayName = otherParticipant.name || "Vehicle Owner";
            image = otherParticipant.profilePhoto
              ? `http://localhost:5000/uploads/profiles/${otherParticipant.profilePhoto}`
              : `https://ui-avatars.com/api/?background=16A34A&color=fff&rounded=true&size=128&name=${displayName.charAt(0)}`;
          }
        } else if (chat.chatType === "support") {
          role = "support";
          displayName = "Support Team";
          image = `https://ui-avatars.com/api/?background=6B21A5&color=fff&rounded=true&size=128&name=Support`;
        } else {
          displayName = otherParticipant.name;
          image = otherParticipant.profilePhoto
            ? `http://localhost:5000/uploads/profiles/${otherParticipant.profilePhoto}`
            : `https://ui-avatars.com/api/?background=3B82F6&color=fff&rounded=true&size=128&name=${displayName.charAt(0)}`;
        }

        setChatPartner({
          name: displayName,
          image: image,
          role: role,
        });
      }
    } catch (error) {
      console.error("Error getting chat partner:", error);
    }
  }, [chat, currentUser.id]);

  useEffect(() => {
    if (chat?.participants) {
      getChatPartner();
    }
  }, [chat, getChatPartner]);

  // Load messages
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const response = await chatService.getChat(chat._id);
        if (response.success) {
          setMessages(response.data.messages || []);
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
              : msg,
          ),
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

  // Handle full screen toggle
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || sending) return;

    setSending(true);
    sendMessage(chat._id, newMessage.trim());
    setNewMessage("");
    setSending(false);
    setShowEmojiPicker(false);

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

  const onEmojiClick = (emojiObject) => {
    setNewMessage((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
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

  const isTyping = Object.values(typingUsers).some(Boolean);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <FaSpinner className="animate-spin text-blue-500 text-3xl" />
      </div>
    );
  }

  // Get vehicle name from chat prop
  const displayVehicleName = chat?.vehicleName || null;

  return (
    <div
      className={`flex flex-col bg-white ${isFullScreen ? "fixed inset-0 z-[200] rounded-none" : "h-full rounded-2xl"}`}
    >
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="lg:hidden hover:bg-white/20 p-2 rounded-full transition"
          >
            <FaArrowLeft />
          </button>
          <div className="flex items-center gap-3">
            {chatPartner?.image ? (
              <img
                src={chatPartner.image}
                alt={chatPartner.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-white"
              />
            ) : (
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <FaUserCircle className="text-2xl" />
              </div>
            )}
            <div>
              <h3 className="font-semibold">
                {chatPartner?.name || "Loading..."}
              </h3>
              <div className="flex flex-col text-xs text-white/80">
                <span>
                  {chatPartner?.role === "owner"
                    ? "Vehicle Owner"
                    : chatPartner?.role === "admin"
                      ? "Support Team"
                      : chatPartner?.role === "support"
                        ? "Support Team"
                        : "Online"}
                </span>
                {/* Vehicle Name Display - FIXED */}
                {displayVehicleName && (
                  <span className="flex items-center gap-1 mt-0.5">
                    <FaCar size={10} />
                    {displayVehicleName}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-white/20 rounded-full transition">
            <FaPhone size={16} />
          </button>
          <button className="p-2 hover:bg-white/20 rounded-full transition">
            <FaVideo size={16} />
          </button>
          <button
            onClick={toggleFullScreen}
            className="p-2 hover:bg-white/20 rounded-full transition hidden md:block"
            title={isFullScreen ? "Exit full screen" : "Full screen"}
          >
            {isFullScreen ? <FaCompress size={16} /> : <FaExpand size={16} />}
          </button>
          <button
            onClick={onClose}
            className="hover:bg-white/20 p-2 rounded-full transition"
          >
            <FaTimes />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <FaCar className="text-gray-400 text-3xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No messages yet
            </h3>
            <p className="text-gray-500 text-sm">
              Start a conversation about {displayVehicleName || "this vehicle"}
            </p>
          </div>
        ) : (
          messages.map((message, index) => {
            const isOwn = message.sender?._id === currentUser.id;
            const showDate =
              index === 0 ||
              new Date(message.createdAt).toDateString() !==
                new Date(messages[index - 1]?.createdAt).toDateString();

            return (
              <div key={message._id || index}>
                {showDate && (
                  <div className="text-center my-2">
                    <span className="text-xs text-gray-400 bg-gray-200 px-3 py-1 rounded-full">
                      {formatDate(message.createdAt)}
                    </span>
                  </div>
                )}
                <div
                  className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                >
                  {!isOwn && (
                    <div className="flex-shrink-0 mr-2">
                      {chatPartner?.image ? (
                        <img
                          src={chatPartner.image}
                          alt=""
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {chatPartner?.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                      )}
                    </div>
                  )}
                  <div
                    className={`max-w-[70%] ${isOwn ? "order-1" : "order-2"}`}
                  >
                    <div
                      className={`rounded-2xl px-4 py-2 ${
                        isOwn
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-sm"
                          : "bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-sm"
                      }`}
                    >
                      <p className="text-sm break-words">{message.message}</p>
                    </div>
                    <div
                      className={`text-xs text-gray-400 mt-1 flex items-center gap-1 ${isOwn ? "justify-end" : "justify-start"}`}
                    >
                      <span>{formatTime(message.createdAt)}</span>
                      {isOwn && (
                        <>
                          {message.read ? (
                            <FaCheckDouble
                              className="text-blue-500 text-xs"
                              title="Read"
                            />
                          ) : message.delivered ? (
                            <FaCheck
                              className="text-gray-400 text-xs"
                              title="Delivered"
                            />
                          ) : (
                            <FaSpinner
                              className="animate-spin text-xs"
                              title="Sending"
                            />
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-2 shadow-sm">
              <div className="flex gap-1">
                <span
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></span>
                <span
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></span>
                <span
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area with Emoji Picker */}
      <div className="p-4 border-t bg-white relative">
        <div className="flex items-center gap-3">
          {/* Image Upload Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex-shrink-0 w-10 h-10 text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all rounded-full flex items-center justify-center"
            title="Upload image"
          >
            <FaImage size={20} />
          </button>

          {/* Emoji Picker Button */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="w-10 h-10 text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all rounded-full flex items-center justify-center"
              title="Add emoji"
              ref={emojiButtonRef}
            >
              <FaSmile size={20} />
            </button>
            {showEmojiPicker && (
              <div className="absolute bottom-14 left-0 z-50">
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            )}
          </div>

          {/* Text Input */}
          <input
            type="text"
            value={newMessage}
            onChange={handleTyping}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
          />

          {/* Send Button */}
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || sending}
            className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            title="Send message"
          >
            {sending ? (
              <FaSpinner className="animate-spin" size={18} />
            ) : (
              <FaPaperPlane size={18} />
            )}
          </button>
        </div>

        {/* File input hidden */}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
        />

        {!isConnected && (
          <p className="text-xs text-red-500 text-center mt-3">
            Connecting to chat server...
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
