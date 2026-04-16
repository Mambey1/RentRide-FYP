// import React, { useState, useEffect, useCallback } from "react";
// import { chatService } from "../../services/chatService";
// import { useSocket } from "../../context/SocketContext";
// import {
//   FaComments,
//   FaSpinner,
//   FaUserCircle,
//   FaCar,
//   FaHeadset,
//   FaClock,
//   FaBan
// } from "react-icons/fa";

// const ChatList = ({ onSelectChat, selectedChatId }) => {
//   const [chats, setChats] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { onNewMessage, onNewMessageNotification, isConnected } = useSocket();
//   const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

//   const loadChats = useCallback(async () => {
//     try {
//       setLoading(true);
//       const response = await chatService.getUserChats();
//       if (response.success) {
//         setChats(response.data);
//       }
//     } catch (error) {
//       console.error("Error loading chats:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     loadChats();
//   }, [loadChats]);

//   // Listen for new messages to update chat list
//   useEffect(() => {
//     const unsubscribe = onNewMessage("*", (data) => {
//       if (data.message) {
//         loadChats();
//       }
//     });
//     return unsubscribe;
//   }, [onNewMessage, loadChats]);

//   // Listen for notifications to refresh
//   useEffect(() => {
//     const unsubscribe = onNewMessageNotification(() => {
//       loadChats();
//     });
//     return unsubscribe;
//   }, [onNewMessageNotification, loadChats]);

//   const getOtherParticipant = (chat) => {
//     const others = chat.participants.filter(p => p._id !== currentUser.id);
//     return others[0] || null;
//   };

//   const getChatIcon = (chat) => {
//     if (chat.chatType === "support") {
//       return <FaHeadset className="text-purple-500" />;
//     }
//     return <FaCar className="text-blue-500" />;
//   };

//   const getUnreadCount = (chat) => {
//     return chat.unreadCounts?.[currentUser.id] || 0;
//   };

//   const formatTime = (date) => {
//     if (!date) return "";
//     const now = new Date();
//     const msgDate = new Date(date);
//     const diffMs = now - msgDate;
//     const diffMins = Math.floor(diffMs / 60000);
//     const diffHours = Math.floor(diffMs / 3600000);
//     const diffDays = Math.floor(diffMs / 86400000);

//     if (diffMins < 1) return "Just now";
//     if (diffMins < 60) return `${diffMins} min ago`;
//     if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
//     if (diffDays === 1) return "Yesterday";
//     return msgDate.toLocaleDateString();
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <FaSpinner className="animate-spin text-blue-500 text-3xl" />
//       </div>
//     );
//   }

//   if (chats.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <FaComments className="text-5xl text-gray-300 mx-auto mb-4" />
//         <p className="text-gray-500">No conversations yet</p>
//         <p className="text-sm text-gray-400 mt-2">
//           Start a chat by messaging a vehicle owner or contacting support
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-2 p-2">
//       {chats.map((chat) => {
//         const otherUser = getOtherParticipant(chat);
//         const unreadCount = getUnreadCount(chat);
//         const isBlocked = chat.isBlocked;

//         return (
//           <div
//             key={chat._id}
//             onClick={() => onSelectChat(chat)}
//             className={`p-4 rounded-xl cursor-pointer transition-all ${
//               selectedChatId === chat._id
//                 ? "bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500"
//                 : "hover:bg-gray-50 border border-gray-100"
//             } ${isBlocked ? "opacity-60" : ""}`}
//           >
//             <div className="flex items-center gap-3">
//               <div className="relative">
//                 {otherUser?.profilePhoto ? (
//                   <img
//                     src={`http://localhost:5000/uploads/profiles/${otherUser.profilePhoto}`}
//                     alt={otherUser.name}
//                     className="w-12 h-12 rounded-full object-cover"
//                   />
//                 ) : (
//                   <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
//                     <FaUserCircle className="text-white text-2xl" />
//                   </div>
//                 )}
//                 {unreadCount > 0 && !isBlocked && (
//                   <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
//                     {unreadCount > 9 ? "9+" : unreadCount}
//                   </span>
//                 )}
//                 {isBlocked && (
//                   <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center">
//                     <FaBan size={8} />
//                   </span>
//                 )}
//               </div>
//               <div className="flex-1 min-w-0">
//                 <div className="flex justify-between items-start">
//                   <h4 className="font-semibold text-gray-900 truncate">
//                     {otherUser?.name || "Support Team"}
//                     {isBlocked && <span className="ml-2 text-xs text-red-500">(Blocked)</span>}
//                   </h4>
//                   <span className="text-xs text-gray-400 flex-shrink-0 ml-2 flex items-center gap-1">
//                     <FaClock size={10} />
//                     {formatTime(chat.lastMessageAt || chat.updatedAt)}
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-2 mt-1">
//                   {getChatIcon(chat)}
//                   <p className="text-sm text-gray-500 truncate flex-1">
//                     {isBlocked ? "Conversation blocked" : (chat.lastMessage || "Start a conversation")}
//                   </p>
//                 </div>
//                 {chat.vehicleName && (
//                   <p className="text-xs text-gray-400 mt-1 truncate">
//                     🚗 {chat.vehicleName}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default ChatList;

import React, { useState, useEffect, useCallback } from "react";
import { chatService } from "../../services/chatService";
import { useSocket } from "../../context/SocketContext";
import {
  FaComments,
  FaSpinner,
  FaUserCircle,
  FaCar,
  FaHeadset,
  FaBan,
} from "react-icons/fa";

const ChatList = ({ onSelectChat, selectedChatId }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const { onNewMessage, onNewMessageNotification } = useSocket();
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  const loadChats = useCallback(async () => {
    try {
      setLoading(true);
      const response = await chatService.getUserChats();
      if (response.success) setChats(response.data);
    } catch (error) {
      console.error("Error loading chats:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadChats();
  }, [loadChats]);

  useEffect(() => {
    const unsubscribe = onNewMessage("*", (data) => {
      if (data.message) loadChats();
    });
    return unsubscribe;
  }, [onNewMessage, loadChats]);

  useEffect(() => {
    const unsubscribe = onNewMessageNotification(() => loadChats());
    return unsubscribe;
  }, [onNewMessageNotification, loadChats]);

  const getOtherParticipant = (chat) =>
    chat.participants.find((p) => p._id !== currentUser.id) || null;

  const getUnreadCount = (chat) => chat.unreadCounts?.[currentUser.id] || 0;

  const formatTime = (date) => {
    if (!date) return "";
    const now = new Date();
    const msgDate = new Date(date);
    const diffMs = now - msgDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays === 1) return "Yesterday";
    return msgDate.toLocaleDateString([], { month: "short", day: "numeric" });
  };

  /* ── Avatar initials helper ── */
  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    return parts.length >= 2
      ? parts[0][0].toUpperCase() + parts[1][0].toUpperCase()
      : name.slice(0, 2).toUpperCase();
  };

  const avatarGradient = (chat, otherUser) => {
    if (chat.chatType === "support")
      return "linear-gradient(135deg,#8B5CF6,#EC4899)";
    if (otherUser?.role === "admin")
      return "linear-gradient(135deg,#8B5CF6,#EC4899)";
    const idx = (otherUser?.name || "").charCodeAt(0) % 4;
    const gradients = [
      "linear-gradient(135deg,#2563EB,#6366F1)",
      "linear-gradient(135deg,#10B981,#059669)",
      "linear-gradient(135deg,#F59E0B,#EF4444)",
      "linear-gradient(135deg,#3B82F6,#8B5CF6)",
    ];
    return gradients[idx];
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <FaSpinner
          className="animate-spin text-blue-500"
          size={26}
          style={{ opacity: 0.7 }}
        />
        <p className="text-sm" style={{ color: "#9CA3AF" }}>
          Loading conversations…
        </p>
      </div>
    );
  }

  if (chats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
          style={{ background: "#F3F4F6" }}
        >
          <FaComments size={28} style={{ color: "#D1D5DB" }} />
        </div>
        <p className="font-medium text-sm" style={{ color: "#374151" }}>
          No conversations yet
        </p>
        <p
          className="text-xs mt-1.5 leading-relaxed"
          style={{ color: "#9CA3AF" }}
        >
          Start a chat by messaging a vehicle owner or contacting support
        </p>
      </div>
    );
  }

  return (
    <div className="py-2 px-2">
      {chats.map((chat) => {
        const otherUser = getOtherParticipant(chat);
        const unreadCount = getUnreadCount(chat);
        const isBlocked = chat.isBlocked;
        const isActive = selectedChatId === chat._id;
        const isSupport = chat.chatType === "support";
        const displayName = isSupport
          ? "Support Team"
          : otherUser?.name || "Unknown";

        return (
          <div
            key={chat._id}
            onClick={() => onSelectChat(chat)}
            className="flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-all duration-150 rounded-xl mb-0.5"
            style={{
              background: isActive
                ? "linear-gradient(135deg,rgba(37,99,235,.07),rgba(124,58,237,.07))"
                : undefined,
              borderLeft: isActive
                ? "3px solid #2563EB"
                : "3px solid transparent",
              opacity: isBlocked ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isActive) e.currentTarget.style.background = "#F9FAFB";
            }}
            onMouseLeave={(e) => {
              if (!isActive) e.currentTarget.style.background = "";
            }}
          >
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              {otherUser?.profilePhoto ? (
                <img
                  src={`http://localhost:5000/uploads/profiles/${otherUser.profilePhoto}`}
                  alt={displayName}
                  className="w-[42px] h-[42px] rounded-full object-cover"
                />
              ) : (
                <div
                  className="w-[42px] h-[42px] rounded-full flex items-center justify-center text-white text-sm font-semibold"
                  style={{ background: avatarGradient(chat, otherUser) }}
                >
                  {isSupport ? (
                    <FaHeadset size={16} />
                  ) : (
                    getInitials(displayName)
                  )}
                </div>
              )}

              {/* Chat-type badge */}
              <div
                className="absolute -bottom-0.5 -right-0.5 w-[14px] h-[14px] rounded-full flex items-center justify-center border-2 border-white"
                style={{
                  background: isBlocked
                    ? "#EF4444"
                    : isSupport
                      ? "#7C3AED"
                      : "#2563EB",
                }}
              >
                {isBlocked ? (
                  <FaBan size={6} style={{ color: "#fff" }} />
                ) : isSupport ? (
                  <FaHeadset size={6} style={{ color: "#fff" }} />
                ) : (
                  <FaCar size={6} style={{ color: "#fff" }} />
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <span
                  className="font-medium text-[13.5px] truncate"
                  style={{ color: "#111827" }}
                >
                  {displayName}
                  {isBlocked && (
                    <span
                      className="ml-1.5 text-[10.5px] font-normal"
                      style={{ color: "#EF4444" }}
                    >
                      (Blocked)
                    </span>
                  )}
                </span>
                <span
                  className="text-[11px] flex-shrink-0"
                  style={{ color: "#9CA3AF" }}
                >
                  {formatTime(chat.lastMessageAt || chat.updatedAt)}
                </span>
              </div>

              <div className="flex items-center gap-1.5 mt-0.5">
                <p
                  className="text-xs truncate flex-1"
                  style={{
                    color: isBlocked
                      ? "#EF4444"
                      : unreadCount > 0
                        ? "#374151"
                        : "#6B7280",
                    fontWeight: unreadCount > 0 && !isBlocked ? 500 : 400,
                    opacity: isBlocked ? 0.75 : 1,
                  }}
                >
                  {isBlocked
                    ? "Conversation blocked"
                    : chat.lastMessage || "Start a conversation"}
                </p>
                {unreadCount > 0 && !isBlocked && (
                  <span
                    className="flex-shrink-0 min-w-[18px] h-[18px] rounded-full flex items-center justify-center text-white text-[10px] font-semibold px-1"
                    style={{ background: "#2563EB" }}
                  >
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </div>

              {chat.vehicleName && (
                <p
                  className="text-[11px] mt-0.5 truncate"
                  style={{ color: "#9CA3AF" }}
                >
                  🚗 {chat.vehicleName}
                </p>
              )}
            </div>
          </div>
        );
      })}

      <p
        className="text-center text-[11.5px] py-4 mt-1"
        style={{ color: "#D1D5DB" }}
      >
        {chats.length} conversation{chats.length !== 1 ? "s" : ""}
      </p>
    </div>
  );
};

export default ChatList;
