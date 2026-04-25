// // import React, { useState, useEffect, useCallback } from "react";
// // import { FaComments, FaTimes, FaSpinner, FaHeadset } from "react-icons/fa";
// // import { useSocket } from "../../context/SocketContext";
// // import { chatService } from "../../services/chatService";
// // import ChatList from "./ChatList";
// // import ChatWindow from "./ChatWindow";

// // const ChatFloatingButton = () => {
// //   const [isOpen, setIsOpen] = useState(false);
// //   const [selectedChat, setSelectedChat] = useState(null);
// //   const [localUnreadCount, setLocalUnreadCount] = useState(0);
// //   const [loading, setLoading] = useState(false);
// //   const [startingSupportChat, setStartingSupportChat] = useState(false);

// //   const {
// //     isConnected,
// //     unreadCount: socketUnreadCount,
// //     resetUnreadCount,
// //     onNewMessageNotification = () => () => {},
// //   } = useSocket();

// //   // Update local unread count from socket
// //   useEffect(() => {
// //     setLocalUnreadCount(socketUnreadCount);
// //   }, [socketUnreadCount]);

// //   // Fetch unread count on mount
// //   const fetchUnreadCount = useCallback(async () => {
// //     try {
// //       const response = await chatService.getUnreadCount();
// //       if (response.success) {
// //         setLocalUnreadCount(response.unreadCount);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching unread count:", error);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     fetchUnreadCount();
// //     const interval = setInterval(fetchUnreadCount, 30000);
// //     return () => clearInterval(interval);
// //   }, [fetchUnreadCount]);

// //   // Listen for new message notifications
// //   useEffect(() => {
// //     if (!onNewMessageNotification) return;

// //     const unsubscribe = onNewMessageNotification((data) => {
// //       console.log("New message notification received:", data);
// //       setLocalUnreadCount((prev) => prev + 1);
// //       fetchUnreadCount();
// //     });
// //     return unsubscribe;
// //   }, [onNewMessageNotification, fetchUnreadCount]);

// //   // Start a new support chat
// //   const handleStartSupportChat = async () => {
// //     setStartingSupportChat(true);
// //     try {
// //       const response = await chatService.getSupportChat();
// //       if (response.success) {
// //         setSelectedChat(response.data);
// //         // Reset unread count for this chat
// //         await chatService.markAsRead(response.data._id);
// //         if (resetUnreadCount) resetUnreadCount();
// //         fetchUnreadCount();
// //       }
// //     } catch (error) {
// //       console.error("Error starting support chat:", error);
// //       alert("Failed to start support chat. Please try again.");
// //     } finally {
// //       setStartingSupportChat(false);
// //     }
// //   };

// //   const handleSelectChat = (chat) => {
// //     setSelectedChat(chat);
// //     if (resetUnreadCount) resetUnreadCount();
// //     setLocalUnreadCount(0);
// //   };

// //   const handleCloseChat = () => {
// //     setSelectedChat(null);
// //   };

// //   const handleOpenChat = () => {
// //     setIsOpen(!isOpen);
// //     if (selectedChat) {
// //       setSelectedChat(null);
// //     }
// //     if (!isOpen) {
// //       fetchUnreadCount();
// //     }
// //   };

// //   // Don't render if user is not logged in
// //   const token = localStorage.getItem("token");
// //   if (!token) {
// //     return null;
// //   }

// //   return (
// //     <>
// //       {/* Chat Button */}
// //       <button
// //         onClick={handleOpenChat}
// //         className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
// //       >
// //         {isOpen ? (
// //           <FaTimes size={24} />
// //         ) : (
// //           <div className="relative">
// //             <FaComments size={24} />
// //             {localUnreadCount > 0 && (
// //               <span className="absolute -top-2 -right-2 min-w-[20px] h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center px-1 animate-pulse">
// //                 {localUnreadCount > 99 ? "99+" : localUnreadCount}
// //               </span>
// //             )}
// //           </div>
// //         )}
// //       </button>

// //       {/* Chat Panel */}
// //       {isOpen && (
// //         <div className="fixed bottom-24 right-6 z-50 w-96 h-[550px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
// //           {selectedChat ? (
// //             <ChatWindow
// //               chat={selectedChat}
// //               onClose={handleCloseChat}
// //               onMessageSent={() => {
// //                 fetchUnreadCount();
// //                 if (resetUnreadCount) resetUnreadCount();
// //               }}
// //             />
// //           ) : (
// //             <>
// //               <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex justify-between items-center">
// //                 <div>
// //                   <h3 className="font-semibold">Messages</h3>
// //                   <p className="text-xs text-white/80">
// //                     Chat with vehicle owners and support
// //                   </p>
// //                 </div>
// //                 {!isConnected && (
// //                   <FaSpinner className="animate-spin text-white" size={16} />
// //                 )}
// //               </div>

// //               {/* Add Support Chat Button */}
// //               <div className="p-3 border-b border-gray-100">
// //                 <button
// //                   onClick={handleStartSupportChat}
// //                   disabled={startingSupportChat}
// //                   className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50"
// //                 >
// //                   {startingSupportChat ? (
// //                     <FaSpinner className="animate-spin" size={16} />
// //                   ) : (
// //                     <FaHeadset size={16} />
// //                   )}
// //                   <span>Chat with Support</span>
// //                 </button>
// //               </div>

// //               <div className="flex-1 overflow-y-auto">
// //                 <ChatList
// //                   onSelectChat={handleSelectChat}
// //                   selectedChatId={selectedChat?._id}
// //                 />
// //               </div>
// //             </>
// //           )}
// //         </div>
// //       )}
// //     </>
// //   );
// // };

// // export default ChatFloatingButton;

// // import React, { useState, useEffect, useCallback } from "react";
// // import { FaComments, FaTimes, FaSpinner, FaHeadset } from "react-icons/fa";
// // import { useSocket } from "../../context/SocketContext";
// // import { chatService } from "../../services/chatService";
// // import ChatList from "./ChatList";
// // import ChatWindow from "./ChatWindow";

// // const ChatFloatingButton = () => {
// //   const [isOpen, setIsOpen] = useState(false);
// //   const [selectedChat, setSelectedChat] = useState(null);
// //   const [localUnreadCount, setLocalUnreadCount] = useState(0);
// //   const [loading, setLoading] = useState(false);
// //   const [startingSupportChat, setStartingSupportChat] = useState(false);

// //   const {
// //     isConnected,
// //     unreadCount: socketUnreadCount,
// //     resetUnreadCount,
// //     onNewMessageNotification = () => () => {},
// //   } = useSocket();

// //   useEffect(() => {
// //     setLocalUnreadCount(socketUnreadCount);
// //   }, [socketUnreadCount]);

// //   const fetchUnreadCount = useCallback(async () => {
// //     try {
// //       const response = await chatService.getUnreadCount();
// //       if (response.success) {
// //         setLocalUnreadCount(response.unreadCount);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching unread count:", error);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     fetchUnreadCount();
// //     const interval = setInterval(fetchUnreadCount, 30000);
// //     return () => clearInterval(interval);
// //   }, [fetchUnreadCount]);

// //   useEffect(() => {
// //     if (!onNewMessageNotification) return;
// //     const unsubscribe = onNewMessageNotification((data) => {
// //       setLocalUnreadCount((prev) => prev + 1);
// //       fetchUnreadCount();
// //     });
// //     return unsubscribe;
// //   }, [onNewMessageNotification, fetchUnreadCount]);

// //   const handleStartSupportChat = async () => {
// //     setStartingSupportChat(true);
// //     try {
// //       const response = await chatService.getSupportChat();
// //       if (response.success) {
// //         setSelectedChat(response.data);
// //         await chatService.markAsRead(response.data._id);
// //         if (resetUnreadCount) resetUnreadCount();
// //         fetchUnreadCount();
// //       }
// //     } catch (error) {
// //       console.error("Error starting support chat:", error);
// //       alert("Failed to start support chat. Please try again.");
// //     } finally {
// //       setStartingSupportChat(false);
// //     }
// //   };

// //   const handleSelectChat = (chat) => {
// //     setSelectedChat(chat);
// //     if (resetUnreadCount) resetUnreadCount();
// //     setLocalUnreadCount(0);
// //   };

// //   const handleCloseChat = () => setSelectedChat(null);

// //   const handleOpenChat = () => {
// //     setIsOpen(!isOpen);
// //     if (selectedChat) setSelectedChat(null);
// //     if (!isOpen) fetchUnreadCount();
// //   };

// //   const token = localStorage.getItem("token");
// //   if (!token) return null;

// //   return (
// //     <>
// //       {/* Floating Action Button */}
// //       <button
// //         onClick={handleOpenChat}
// //         className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
// //         style={{
// //           background: isOpen
// //             ? "linear-gradient(135deg,#374151,#1f2937)"
// //             : "linear-gradient(135deg,#2563EB,#7C3AED)",
// //         }}
// //       >
// //         {isOpen ? (
// //           <FaTimes size={20} className="text-white" />
// //         ) : (
// //           <div className="relative">
// //             <FaComments size={22} className="text-white" />
// //             {localUnreadCount > 0 && (
// //               <span className="absolute -top-2.5 -right-2.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-semibold rounded-full flex items-center justify-center px-1 border-2 border-white animate-pulse">
// //                 {localUnreadCount > 99 ? "99+" : localUnreadCount}
// //               </span>
// //             )}
// //           </div>
// //         )}
// //       </button>

// //       {/* Chat Panel */}
// //       {isOpen && (
// //         <div
// //           className="fixed bottom-24 right-6 z-50 flex flex-col overflow-hidden"
// //           style={{
// //             width: 360,
// //             height: 560,
// //             borderRadius: 18,
// //             boxShadow: "0 8px 40px rgba(0,0,0,.14), 0 0 0 1px rgba(0,0,0,.06)",
// //             background: "#fff",
// //           }}
// //         >
// //           {selectedChat ? (
// //             <ChatWindow
// //               chat={selectedChat}
// //               onClose={handleCloseChat}
// //               onMessageSent={() => {
// //                 fetchUnreadCount();
// //                 if (resetUnreadCount) resetUnreadCount();
// //               }}
// //             />
// //           ) : (
// //             <div className="flex flex-col h-full">
// //               {/* Panel Header */}
// //               <div
// //                 className="flex-shrink-0 px-4 pb-3 pt-4"
// //                 style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)" }}
// //               >
// //                 <div className="flex items-start justify-between mb-3">
// //                   <div>
// //                     <h3 className="text-white font-semibold text-[15px] leading-tight">
// //                       Messages
// //                     </h3>
// //                     <p className="text-white/70 text-[11.5px] mt-0.5">
// //                       Chat with owners &amp; support
// //                     </p>
// //                   </div>
// //                   <div className="flex items-center gap-2">
// //                     {!isConnected && (
// //                       <div className="flex items-center gap-1.5 bg-white/15 rounded-full px-2.5 py-1">
// //                         <FaSpinner className="animate-spin text-white/80" size={10} />
// //                         <span className="text-white/80 text-[10px]">Connecting</span>
// //                       </div>
// //                     )}
// //                     {localUnreadCount > 0 && (
// //                       <div className="bg-white/20 rounded-full px-2.5 py-1 text-white text-[11px] font-medium">
// //                         {localUnreadCount} unread
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>

// //                 {/* Support Button */}
// //                 <button
// //                   onClick={handleStartSupportChat}
// //                   disabled={startingSupportChat}
// //                   className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-[13px] font-medium transition-all duration-200 disabled:opacity-50"
// //                   style={{
// //                     background: "rgba(255,255,255,.15)",
// //                     border: "1px solid rgba(255,255,255,.25)",
// //                     backdropFilter: "blur(8px)",
// //                   }}
// //                   onMouseEnter={(e) =>
// //                     (e.currentTarget.style.background = "rgba(255,255,255,.25)")
// //                   }
// //                   onMouseLeave={(e) =>
// //                     (e.currentTarget.style.background = "rgba(255,255,255,.15)")
// //                   }
// //                 >
// //                   {startingSupportChat ? (
// //                     <FaSpinner className="animate-spin" size={14} />
// //                   ) : (
// //                     <FaHeadset size={14} />
// //                   )}
// //                   Chat with Support
// //                 </button>

// //                 <p
// //                   className="text-[10.5px] mt-2.5 font-medium tracking-wide uppercase"
// //                   style={{ color: "rgba(255,255,255,.55)" }}
// //                 >
// //                   Recent conversations
// //                 </p>
// //               </div>

// //               {/* Chat List */}
// //               <div className="flex-1 overflow-y-auto">
// //                 <ChatList
// //                   onSelectChat={handleSelectChat}
// //                   selectedChatId={selectedChat?._id}
// //                 />
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       )}
// //     </>
// //   );
// // };

// // export default ChatFloatingButton;

// import React, { useState, useEffect, useCallback } from "react";
// import { FaComments, FaTimes, FaSpinner, FaHeadset } from "react-icons/fa";
// import { useSocket } from "../../context/SocketContext";
// import { chatService } from "../../services/chatService";
// import { useLocation } from "react-router-dom";
// import ChatList from "./ChatList";
// import ChatWindow from "./ChatWindow";

// const ChatFloatingButton = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [localUnreadCount, setLocalUnreadCount] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [startingSupportChat, setStartingSupportChat] = useState(false);

//   const location = useLocation();

//   const {
//     isConnected,
//     unreadCount: socketUnreadCount,
//     resetUnreadCount,
//     onNewMessageNotification = () => () => {},
//   } = useSocket();

//   useEffect(() => {
//     setLocalUnreadCount(socketUnreadCount);
//   }, [socketUnreadCount]);

//   const fetchUnreadCount = useCallback(async () => {
//     try {
//       const response = await chatService.getUnreadCount();
//       if (response.success) {
//         setLocalUnreadCount(response.unreadCount);
//       }
//     } catch (error) {
//       console.error("Error fetching unread count:", error);
//     }
//   }, []);

//   useEffect(() => {
//     fetchUnreadCount();
//     const interval = setInterval(fetchUnreadCount, 30000);
//     return () => clearInterval(interval);
//   }, [fetchUnreadCount]);

//   useEffect(() => {
//     if (!onNewMessageNotification) return;
//     const unsubscribe = onNewMessageNotification((data) => {
//       setLocalUnreadCount((prev) => prev + 1);
//       fetchUnreadCount();
//     });
//     return unsubscribe;
//   }, [onNewMessageNotification, fetchUnreadCount]);

//   const handleStartSupportChat = async () => {
//     setStartingSupportChat(true);
//     try {
//       const response = await chatService.getSupportChat();
//       if (response.success) {
//         setSelectedChat(response.data);
//         await chatService.markAsRead(response.data._id);
//         if (resetUnreadCount) resetUnreadCount();
//         fetchUnreadCount();
//       }
//     } catch (error) {
//       console.error("Error starting support chat:", error);
//       alert("Failed to start support chat. Please try again.");
//     } finally {
//       setStartingSupportChat(false);
//     }
//   };

//   const handleSelectChat = (chat) => {
//     setSelectedChat(chat);
//     if (resetUnreadCount) resetUnreadCount();
//     setLocalUnreadCount(0);
//   };

//   const handleCloseChat = () => setSelectedChat(null);

//   const handleOpenChat = () => {
//     setIsOpen(!isOpen);
//     if (selectedChat) setSelectedChat(null);
//     if (!isOpen) fetchUnreadCount();
//   };

//   const token = localStorage.getItem("token");

//   // Hide on public landing page and auth pages
//   const hiddenRoutes = ["/home", "/login", "/signup"];
//   if (!token || hiddenRoutes.includes(location.pathname)) return null;

//   return (
//     <>
//       {/* Floating Action Button */}
//       <button
//         onClick={handleOpenChat}
//         className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
//         style={{
//           background: isOpen
//             ? "linear-gradient(135deg,#374151,#1f2937)"
//             : "linear-gradient(135deg,#2563EB,#7C3AED)",
//         }}
//       >
//         {isOpen ? (
//           <FaTimes size={20} className="text-white" />
//         ) : (
//           <div className="relative">
//             <FaComments size={22} className="text-white" />
//             {localUnreadCount > 0 && (
//               <span className="absolute -top-2.5 -right-2.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-semibold rounded-full flex items-center justify-center px-1 border-2 border-white animate-pulse">
//                 {localUnreadCount > 99 ? "99+" : localUnreadCount}
//               </span>
//             )}
//           </div>
//         )}
//       </button>

//       {/* Chat Panel */}
//       {isOpen && (
//         <div
//           className="fixed bottom-24 right-6 z-50 flex flex-col overflow-hidden"
//           style={{
//             width: 360,
//             height: 560,
//             borderRadius: 18,
//             boxShadow: "0 8px 40px rgba(0,0,0,.14), 0 0 0 1px rgba(0,0,0,.06)",
//             background: "#fff",
//           }}
//         >
//           {selectedChat ? (
//             <ChatWindow
//               chat={selectedChat}
//               onClose={handleCloseChat}
//               onMessageSent={() => {
//                 fetchUnreadCount();
//                 if (resetUnreadCount) resetUnreadCount();
//               }}
//             />
//           ) : (
//             <div className="flex flex-col h-full">
//               {/* Panel Header */}
//               <div
//                 className="flex-shrink-0 px-4 pb-3 pt-4"
//                 style={{
//                   background: "linear-gradient(135deg,#2563EB,#7C3AED)",
//                 }}
//               >
//                 <div className="flex items-start justify-between mb-3">
//                   <div>
//                     <h3 className="text-white font-semibold text-[15px] leading-tight">
//                       Messages
//                     </h3>
//                     <p className="text-white/70 text-[11.5px] mt-0.5">
//                       Chat with owners &amp; support
//                     </p>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     {!isConnected && (
//                       <div className="flex items-center gap-1.5 bg-white/15 rounded-full px-2.5 py-1">
//                         <FaSpinner
//                           className="animate-spin text-white/80"
//                           size={10}
//                         />
//                         <span className="text-white/80 text-[10px]">
//                           Connecting
//                         </span>
//                       </div>
//                     )}
//                     {localUnreadCount > 0 && (
//                       <div className="bg-white/20 rounded-full px-2.5 py-1 text-white text-[11px] font-medium">
//                         {localUnreadCount} unread
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Support Button */}
//                 <button
//                   onClick={handleStartSupportChat}
//                   disabled={startingSupportChat}
//                   className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-[13px] font-medium transition-all duration-200 disabled:opacity-50"
//                   style={{
//                     background: "rgba(255,255,255,.15)",
//                     border: "1px solid rgba(255,255,255,.25)",
//                     backdropFilter: "blur(8px)",
//                   }}
//                   onMouseEnter={(e) =>
//                     (e.currentTarget.style.background = "rgba(255,255,255,.25)")
//                   }
//                   onMouseLeave={(e) =>
//                     (e.currentTarget.style.background = "rgba(255,255,255,.15)")
//                   }
//                 >
//                   {startingSupportChat ? (
//                     <FaSpinner className="animate-spin" size={14} />
//                   ) : (
//                     <FaHeadset size={14} />
//                   )}
//                   Chat with Support
//                 </button>

//                 <p
//                   className="text-[10.5px] mt-2.5 font-medium tracking-wide uppercase"
//                   style={{ color: "rgba(255,255,255,.55)" }}
//                 >
//                   Recent conversations
//                 </p>
//               </div>

//               {/* Chat List */}
//               <div className="flex-1 overflow-y-auto">
//                 <ChatList
//                   onSelectChat={handleSelectChat}
//                   selectedChatId={selectedChat?._id}
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </>
//   );
// };

// export default ChatFloatingButton;

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  FaComments,
  FaTimes,
  FaSpinner,
  FaHeadset,
  FaArrowLeft,
  FaPaperPlane,
  FaSmile,
  FaImage,
  FaBan,
  FaUnlock,
  FaCheckDouble,
  FaSearch,
  FaSync,
  FaCommentDots,
  FaVolumeMute,
  FaVolumeUp,
  FaTrash,
  FaReply,
  FaEllipsisV,
  FaLock,
  FaCar,
  FaShieldAlt,
  FaInfoCircle,
} from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useSocket } from "../../context/SocketContext";
import { useLocation } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";

// ─── Quick Reactions ──────────────────────────────────────────────────────────
const QUICK_REACTIONS = ["❤️", "😂", "😮", "😢", "😡", "👍"];

// ─── API ──────────────────────────────────────────────────────────────────────
const getToken = () =>
  localStorage.getItem("token") || sessionStorage.getItem("token");
const authHeader = () => ({ Authorization: `Bearer ${getToken()}` });
const BASE = "http://localhost:5000";

const api = {
  getChats: () =>
    axios
      .get(`${BASE}/api/chats/my-chats`, { headers: authHeader() })
      .then((r) => r.data),
  getChat: (id) =>
    axios
      .get(`${BASE}/api/chats/${id}`, { headers: authHeader() })
      .then((r) => r.data),
  sendMessage: (id, message, replyToId) =>
    axios
      .post(
        `${BASE}/api/chats/${id}/message`,
        { message, replyToId },
        { headers: authHeader() },
      )
      .then((r) => r.data),
  sendImage: (id, file) => {
    const fd = new FormData();
    fd.append("image", file);
    return axios
      .post(`${BASE}/api/chats/${id}/image`, fd, {
        headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data);
  },
  markAsRead: (id) =>
    axios
      .put(`${BASE}/api/chats/${id}/read`, {}, { headers: authHeader() })
      .then((r) => r.data),
  getSupportChat: () =>
    axios
      .post(`${BASE}/api/chats/support`, {}, { headers: authHeader() })
      .then((r) => r.data),
  getUnreadCount: () =>
    axios
      .get(`${BASE}/api/chats/unread-count`, { headers: authHeader() })
      .then((r) => r.data),
  unsendMessage: (chatId, msgId) =>
    axios
      .delete(`${BASE}/api/chats/${chatId}/message/${msgId}/unsend`, {
        headers: authHeader(),
      })
      .then((r) => r.data),
  deleteMessageForMe: (chatId, msgId) =>
    axios
      .delete(`${BASE}/api/chats/${chatId}/message/${msgId}`, {
        headers: authHeader(),
      })
      .then((r) => r.data),
  deleteConversation: (chatId) =>
    axios
      .delete(`${BASE}/api/chats/${chatId}/conversation`, {
        headers: authHeader(),
      })
      .then((r) => r.data),
  reactToMessage: (chatId, msgId, emoji) =>
    axios
      .post(
        `${BASE}/api/chats/${chatId}/message/${msgId}/react`,
        { emoji },
        { headers: authHeader() },
      )
      .then((r) => r.data),
  muteChat: (chatId) =>
    axios
      .put(`${BASE}/api/chats/${chatId}/mute`, {}, { headers: authHeader() })
      .then((r) => r.data),
  blockUser: (chatId) =>
    axios
      .put(`${BASE}/api/chats/${chatId}/block`, {}, { headers: authHeader() })
      .then((r) => r.data),
  unblockUser: (chatId) =>
    axios
      .put(`${BASE}/api/chats/${chatId}/unblock`, {}, { headers: authHeader() })
      .then((r) => r.data),
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmtTime = (d) =>
  new Date(d).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const fmtChatTime = (d) => {
  if (!d) return "";
  const diff = Date.now() - new Date(d);
  const m = Math.floor(diff / 60000);
  if (m < 1) return "now";
  if (m < 60) return `${m}m`;
  if (m < 1440) return `${Math.floor(m / 60)}h`;
  return new Date(d).toLocaleDateString();
};

// ─── Message Bubble ───────────────────────────────────────────────────────────
const MessageBubble = ({
  msg,
  isOwn,
  user,
  otherUser,
  isSupportChat,
  onReply,
  onUnsend,
  onDeleteForMe,
  onReact,
}) => {
  const [showActions, setShowActions] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const hasImage = msg.attachments?.length > 0;
  const isUnsent = msg.isUnsent;

  // Group reactions by emoji
  const reactionGroups = (msg.reactions || []).reduce((acc, r) => {
    acc[r.emoji] = (acc[r.emoji] || 0) + 1;
    return acc;
  }, {});
  const myReaction = (msg.reactions || []).find(
    (r) => r.userId === user?._id || r.userId === user?.id,
  );

  return (
    <div
      className={`flex flex-col ${isOwn ? "items-end" : "items-start"} mb-2 group`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => {
        setShowActions(false);
        setShowReactions(false);
      }}
    >
      {/* Reply preview */}
      {msg.replyTo && !isUnsent && (
        <div
          className={`flex items-center gap-1.5 mb-1 px-2 py-1 rounded-lg bg-gray-100 border-l-2 border-blue-400 max-w-[85%] ${isOwn ? "mr-8" : "ml-8"}`}
        >
          <FaReply size={9} className="text-blue-400 flex-shrink-0" />
          <p className="text-[10px] text-gray-500 truncate">
            {msg.replyTo.isUnsent
              ? "Message unsent"
              : msg.replyTo.message || "📷 Image"}
          </p>
        </div>
      )}

      <div
        className={`flex items-end gap-1.5 ${isOwn ? "flex-row-reverse" : "flex-row"} w-full`}
      >
        {/* Avatar */}
        <div className="flex-shrink-0 mb-1">
          {!isOwn &&
            (isSupportChat ? (
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <FaHeadset size={10} className="text-white" />
              </div>
            ) : otherUser?.profilePhoto ? (
              <img
                src={`${BASE}/uploads/profiles/${otherUser.profilePhoto}`}
                className="w-6 h-6 rounded-full object-cover"
                alt=""
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-[9px] font-bold">
                {otherUser?.name?.charAt(0)?.toUpperCase() || "?"}
              </div>
            ))}
          {isOwn &&
            (user?.profilePhoto ? (
              <img
                src={`${BASE}/uploads/profiles/${user.profilePhoto}`}
                className="w-6 h-6 rounded-full object-cover"
                alt=""
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center text-white text-[9px] font-bold">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            ))}
        </div>

        {/* Bubble */}
        <div className={`relative max-w-[75%]`}>
          {/* Action buttons */}
          {showActions && !isUnsent && (
            <div
              className={`absolute top-0 ${isOwn ? "right-full mr-1" : "left-full ml-1"} flex items-center gap-0.5 z-10`}
            >
              {/* Reply */}
              <button
                onClick={() => onReply(msg)}
                className="w-6 h-6 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center hover:bg-blue-50 transition"
                title="Reply"
              >
                <FaReply size={9} className="text-gray-500" />
              </button>

              {/* React */}
              <div className="relative">
                <button
                  onClick={() => setShowReactions(!showReactions)}
                  className="w-6 h-6 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center hover:bg-yellow-50 transition"
                  title="React"
                >
                  <FaSmile size={9} className="text-gray-500" />
                </button>
                {showReactions && (
                  <div
                    className={`absolute bottom-full mb-1 ${isOwn ? "right-0" : "left-0"} flex gap-1 bg-white rounded-full px-2 py-1 shadow-xl border border-gray-100 z-20`}
                  >
                    {QUICK_REACTIONS.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => {
                          onReact(msg._id, emoji);
                          setShowReactions(false);
                        }}
                        className={`text-base hover:scale-125 transition-transform ${myReaction?.emoji === emoji ? "scale-125" : ""}`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* More options */}
              <div className="relative group/more">
                <button className="w-6 h-6 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition">
                  <FaEllipsisV size={8} className="text-gray-500" />
                </button>
                <div
                  className={`absolute top-full mt-1 ${isOwn ? "right-0" : "left-0"} hidden group-hover/more:block bg-white rounded-xl shadow-xl border border-gray-100 z-20 min-w-[130px] py-1`}
                >
                  {isOwn && (
                    <button
                      onClick={() => onUnsend(msg._id)}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-orange-600 hover:bg-orange-50"
                    >
                      <FaTimes size={10} /> Unsend
                    </button>
                  )}
                  <button
                    onClick={() => onDeleteForMe(msg._id)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-500 hover:bg-red-50"
                  >
                    <FaTrash size={10} /> Delete for me
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Message content */}
          <div
            className={`px-3 py-2 text-sm leading-relaxed break-words rounded-2xl ${
              isUnsent
                ? "bg-gray-100 text-gray-400 italic border border-gray-200"
                : isOwn
                  ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-br-sm"
                  : "bg-white text-gray-800 border border-gray-100 rounded-bl-sm shadow-sm"
            }`}
          >
            {isUnsent ? (
              <span className="flex items-center gap-1.5">
                <FaTimes size={10} /> This message was unsent
              </span>
            ) : (
              <>
                {hasImage && (
                  <img
                    src={`${BASE}${msg.attachments[0].url}`}
                    alt="attachment"
                    className="max-w-[180px] max-h-[130px] rounded-lg cursor-pointer mb-1"
                    onClick={() =>
                      window.open(`${BASE}${msg.attachments[0].url}`, "_blank")
                    }
                  />
                )}
                {msg.message && <p>{msg.message}</p>}
              </>
            )}
          </div>

          {/* Reactions display */}
          {Object.keys(reactionGroups).length > 0 && (
            <div
              className={`flex gap-0.5 mt-0.5 flex-wrap ${isOwn ? "justify-end" : "justify-start"}`}
            >
              {Object.entries(reactionGroups).map(([emoji, count]) => (
                <button
                  key={emoji}
                  onClick={() => onReact(msg._id, emoji)}
                  className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[11px] border transition ${
                    myReaction?.emoji === emoji
                      ? "bg-blue-50 border-blue-200 text-blue-700"
                      : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {emoji} {count > 1 && <span>{count}</span>}
                </button>
              ))}
            </div>
          )}

          {/* Time + read receipt */}
          <div
            className={`flex items-center gap-1 mt-0.5 px-0.5 ${isOwn ? "justify-end" : "justify-start"}`}
          >
            <span className="text-[9px] text-gray-400">
              {fmtTime(msg.createdAt)}
            </span>
            {isOwn && !isUnsent && (
              <FaCheckDouble
                size={8}
                className={msg.read ? "text-blue-400" : "text-gray-300"}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Chat Window ──────────────────────────────────────────────────────────────
const InlineChatWindow = ({
  chat,
  user,
  onClose,
  onBack,
  onMuteToggle,
  onDeleteConversation,
  onBlockToggle,
}) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMsg, setNewMsg] = useState("");
  const [sending, setSending] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const emojiRef = useRef(null);

  const { onNewMessage, joinChat, leaveChat, markRead } = useSocket();

  const isSupportChat = chat.chatType === "support";
  const isMuted = chat.isMuted;
  const iBlockedThem =
    chat.isBlocked && chat.blockedBy?.toString() === (user?._id || user?.id);

  const otherUser = chat.participants?.find(
    (p) => p._id !== (user?._id || user?.id),
  );

  const scrollToBottom = (behavior = "smooth") => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior }), 80);
  };

  // Load messages
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await api.getChat(chat._id);
        if (res.success) {
          setMessages(res.data.messages || []);
          await api.markAsRead(chat._id);
          markRead(chat._id);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
        scrollToBottom("instant");
      }
    };
    load();
    joinChat(chat._id);
    return () => leaveChat(chat._id);
  }, [chat._id]);

  // Socket listener
  useEffect(() => {
    const unsub = onNewMessage(chat._id, (data) => {
      if (!data.message) return;
      const isOwn =
        data.senderId === (user?._id || user?.id) ||
        data.message.sender?._id === (user?._id || user?.id);

      if (!isOwn) {
        setMessages((prev) => {
          if (prev.some((m) => m._id === data.message._id)) return prev;
          return [...prev, data.message];
        });
        api.markAsRead(chat._id).catch(() => {});
        markRead(chat._id);
        scrollToBottom();
      }
    });
    return unsub;
  }, [chat._id, onNewMessage, markRead, user]);

  // Socket: unsent
  useEffect(() => {
    const { socket } = useSocket?.() || {};
    if (!socket) return;
    const handler = ({ messageId }) => {
      setMessages((prev) =>
        prev.map((m) =>
          m._id === messageId
            ? {
                ...m,
                isUnsent: true,
                message: "",
                attachments: [],
                reactions: [],
              }
            : m,
        ),
      );
    };
    socket.on("message_unsent", handler);
    return () => socket.off("message_unsent", handler);
  }, []);

  // Socket: reactions
  useEffect(() => {
    const { socket } = useSocket?.() || {};
    if (!socket) return;
    const handler = ({ messageId, reactions }) => {
      setMessages((prev) =>
        prev.map((m) => (m._id === messageId ? { ...m, reactions } : m)),
      );
    };
    socket.on("message_reaction", handler);
    return () => socket.off("message_reaction", handler);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Click outside emoji
  useEffect(() => {
    const handler = (e) => {
      if (
        emojiRef.current &&
        !emojiRef.current.contains(e.target) &&
        !e.target.closest(".emoji-btn-float")
      )
        setShowEmoji(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const sendMessage = async () => {
    if (!newMsg.trim() || sending || chat.isBlocked) return;
    const text = newMsg.trim();
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    setSending(true);
    setNewMsg("");
    setReplyTo(null);
    setShowEmoji(false);

    const temp = {
      _id: `temp-${Date.now()}`,
      message: text,
      senderType: "user",
      read: false,
      delivered: false,
      createdAt: new Date(),
      attachments: [],
      reactions: [],
      isUnsent: false,
      replyTo: replyTo
        ? {
            _id: replyTo._id,
            message: replyTo.message,
            senderType: replyTo.senderType,
            attachments: replyTo.attachments,
          }
        : null,
      sender: {
        _id: currentUser.id,
        name: currentUser.name,
        profilePhoto: currentUser.profilePhoto,
      },
    };

    setMessages((prev) => [...prev, temp]);
    scrollToBottom();

    try {
      const res = await api.sendMessage(chat._id, text, replyTo?._id);
      if (res.success) {
        setMessages((prev) =>
          prev.map((m) => (m._id === temp._id ? res.data : m)),
        );
      } else {
        setMessages((prev) => prev.filter((m) => m._id !== temp._id));
        toast.error("Failed to send message");
      }
    } catch {
      setMessages((prev) => prev.filter((m) => m._id !== temp._id));
      toast.error("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Images only");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Max 5MB");
      return;
    }
    setUploadingImage(true);
    try {
      const res = await api.sendImage(chat._id, file);
      if (res.success) {
        const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
        const temp = {
          _id: `temp-img-${Date.now()}`,
          message: "",
          senderType: "user",
          read: false,
          delivered: false,
          createdAt: new Date(),
          attachments: [{ url: res.data.url, type: "image" }],
          reactions: [],
          isUnsent: false,
          sender: {
            _id: currentUser.id,
            name: currentUser.name,
            profilePhoto: currentUser.profilePhoto,
          },
        };
        setMessages((prev) => [...prev, temp]);
        scrollToBottom();
      }
    } catch {
      toast.error("Failed to upload image");
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleUnsend = async (msgId) => {
    try {
      await api.unsendMessage(chat._id, msgId);
      setMessages((prev) =>
        prev.map((m) =>
          m._id === msgId
            ? {
                ...m,
                isUnsent: true,
                message: "",
                attachments: [],
                reactions: [],
              }
            : m,
        ),
      );
    } catch {
      toast.error("Failed to unsend");
    }
  };

  const handleDeleteForMe = async (msgId) => {
    try {
      await api.deleteMessageForMe(chat._id, msgId);
      setMessages((prev) => prev.filter((m) => m._id !== msgId));
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleReact = async (msgId, emoji) => {
    try {
      const res = await api.reactToMessage(chat._id, msgId, emoji);
      if (res.success) {
        setMessages((prev) =>
          prev.map((m) =>
            m._id === msgId ? { ...m, reactions: res.reactions } : m,
          ),
        );
      }
    } catch {
      toast.error("Failed to react");
    }
  };

  const handleDeleteConversation = async () => {
    try {
      await api.deleteConversation(chat._id);
      setMessages([]);
      setShowDeleteConfirm(false);
      onDeleteConversation(chat._id);
      toast.success("Conversation deleted");
    } catch {
      toast.error("Failed to delete conversation");
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0 flex items-center gap-2 px-3 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600">
        <button
          onClick={onBack}
          className="w-7 h-7 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition"
        >
          <FaArrowLeft size={12} />
        </button>

        {isSupportChat ? (
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <FaHeadset size={16} className="text-white" />
          </div>
        ) : otherUser?.profilePhoto ? (
          <img
            src={`${BASE}/uploads/profiles/${otherUser.profilePhoto}`}
            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
            alt=""
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {(isSupportChat
              ? "S"
              : otherUser?.name?.charAt(0)
            )?.toUpperCase() || "?"}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-semibold truncate leading-tight">
            {isSupportChat ? "Support Team" : otherUser?.name || "Unknown"}
          </p>
          <p className="text-white/70 text-[10px] truncate">
            {isSupportChat
              ? "Available 24/7"
              : chat.vehicleName
                ? `· ${chat.vehicleName}`
                : ""}
            {isMuted && <span className="ml-1">· 🔇 Muted</span>}
          </p>
        </div>

        {/* Menu */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition"
          >
            <FaEllipsisV size={12} />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 min-w-[160px] py-1">
              <button
                onClick={() => {
                  onMuteToggle(chat._id, isMuted);
                  setShowMenu(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50"
              >
                {isMuted ? (
                  <>
                    <FaVolumeUp size={11} /> Unmute notifications
                  </>
                ) : (
                  <>
                    <FaVolumeMute size={11} /> Mute notifications
                  </>
                )}
              </button>
              {!isSupportChat && (
                <button
                  onClick={() => {
                    onBlockToggle(chat);
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-500 hover:bg-red-50"
                >
                  {chat.isBlocked && iBlockedThem ? (
                    <>
                      <FaUnlock size={11} /> Unblock user
                    </>
                  ) : (
                    <>
                      <FaBan size={11} /> Block user
                    </>
                  )}
                </button>
              )}
              <div className="border-t border-gray-100 my-1" />
              <button
                onClick={() => {
                  setShowDeleteConfirm(true);
                  setShowMenu(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50"
              >
                <FaTrash size={11} /> Delete conversation
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 3-day disclaimer banner */}
      <div className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 bg-amber-50 border-b border-amber-100">
        <FaInfoCircle size={10} className="text-amber-500 flex-shrink-0" />
        <p className="text-[9.5px] text-amber-600 leading-tight">
          Messages are automatically deleted after <strong>3 days</strong> to
          protect storage and privacy.
        </p>
      </div>

      {/* Block banner */}
      {chat.isBlocked && (
        <div
          className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 border-b text-xs ${iBlockedThem ? "bg-red-50 border-red-100 text-red-600" : "bg-amber-50 border-amber-100 text-amber-600"}`}
        >
          <FaBan size={10} />
          {iBlockedThem
            ? "You blocked this user."
            : "This user restricted messaging."}
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-2 bg-gray-50 space-y-0.5">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <FaSpinner className="animate-spin text-blue-400 text-xl" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <FaCommentDots className="text-gray-300 text-3xl mb-2" />
            <p className="text-xs text-gray-400">No messages yet. Say hello!</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isOwn =
              msg.sender?._id === (user?._id || user?.id) ||
              msg.sender?._id === user?.id;
            return (
              <MessageBubble
                key={msg._id}
                msg={msg}
                isOwn={isOwn}
                user={user}
                otherUser={otherUser}
                isSupportChat={isSupportChat}
                onReply={setReplyTo}
                onUnsend={handleUnsend}
                onDeleteForMe={handleDeleteForMe}
                onReact={handleReact}
              />
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Reply preview */}
      {replyTo && (
        <div className="flex-shrink-0 flex items-center gap-2 px-3 py-2 bg-blue-50 border-t border-blue-100">
          <FaReply size={10} className="text-blue-500 flex-shrink-0" />
          <p className="flex-1 text-xs text-blue-700 truncate">
            Replying:{" "}
            {replyTo.isUnsent
              ? "Unsent message"
              : replyTo.message || "📷 Image"}
          </p>
          <button
            onClick={() => setReplyTo(null)}
            className="text-blue-400 hover:text-blue-600"
          >
            <FaTimes size={12} />
          </button>
        </div>
      )}

      {/* Input */}
      <div className="flex-shrink-0 px-2 py-2 bg-white border-t border-gray-100">
        {chat.isBlocked ? (
          <div
            className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs ${iBlockedThem ? "bg-red-50 text-red-500" : "bg-amber-50 text-amber-600"}`}
          >
            <FaLock size={11} />
            {iBlockedThem
              ? "You blocked this user. Unblock to chat."
              : "Cannot send messages."}
          </div>
        ) : (
          <div className="relative">
            {showEmoji && (
              <div
                ref={emojiRef}
                className="absolute bottom-full mb-2 right-0 z-50"
              >
                <div className="rounded-2xl shadow-2xl border border-gray-200 overflow-hidden bg-white">
                  <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600">
                    <div className="flex items-center gap-1.5">
                      <FaSmile size={11} className="text-white/80" />
                      <span className="text-xs font-semibold text-white">
                        Emoji
                      </span>
                    </div>
                    <button
                      onClick={() => setShowEmoji(false)}
                      className="w-5 h-5 rounded-full bg-white/20 hover:bg-white/35 text-white flex items-center justify-center"
                    >
                      <FaTimes size={8} />
                    </button>
                  </div>
                  <EmojiPicker
                    onEmojiClick={(e) => {
                      setNewMsg((p) => p + e.emoji);
                      inputRef.current?.focus();
                    }}
                    width={300}
                    height={340}
                    lazyLoad
                  />
                </div>
              </div>
            )}

            <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-2xl px-2 py-1.5">
              <button
                onClick={() => setShowEmoji(!showEmoji)}
                className={`emoji-btn-float flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full transition ${showEmoji ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" : "text-gray-400 hover:text-blue-500 hover:bg-blue-50"}`}
              >
                <FaSmile size={14} />
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingImage}
                className="flex-shrink-0 text-gray-400 hover:text-blue-500 transition"
              >
                {uploadingImage ? (
                  <FaSpinner className="animate-spin" size={14} />
                ) : (
                  <FaImage size={14} />
                )}
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />

              <input
                ref={inputRef}
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message…"
                className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
              />

              <button
                onClick={sendMessage}
                disabled={!newMsg.trim() || sending}
                className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white disabled:opacity-40 hover:shadow-md transition"
              >
                {sending ? (
                  <FaSpinner className="animate-spin" size={11} />
                ) : (
                  <FaPaperPlane size={11} />
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete conversation confirm */}
      {showDeleteConfirm && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 rounded-[18px]">
          <div className="bg-white rounded-2xl p-5 mx-4 shadow-2xl">
            <h4 className="font-bold text-gray-800 text-sm mb-1">
              Delete conversation?
            </h4>
            <p className="text-xs text-gray-500 mb-4">
              This will delete the conversation only for you. The other person
              can still see it.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-2 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConversation}
                className="flex-1 py-2 text-xs bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Chat List Panel ──────────────────────────────────────────────────────────
const ChatListPanel = ({
  onSelectChat,
  onStartSupport,
  startingSupportChat,
  unreadConvoCount,
}) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const currentUser = JSON.parse(
    localStorage.getItem("user") || sessionStorage.getItem("user") || "{}",
  );
  const userId = currentUser._id || currentUser.id;

  const fetchChats = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.getChats();
      if (res.success) setChats(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  const filtered = chats.filter((c) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    const other = c.participants?.find((p) => p._id !== userId);
    return (
      (other?.name || "").toLowerCase().includes(q) ||
      (c.lastMessage || "").toLowerCase().includes(q) ||
      (c.vehicleName || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div
        className="flex-shrink-0 px-4 pb-3 pt-4"
        style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)" }}
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-white font-semibold text-[15px]">Messages</h3>
            <p className="text-white/70 text-[11px] mt-0.5">
              {unreadConvoCount > 0
                ? `${unreadConvoCount} unread conversation${unreadConvoCount > 1 ? "s" : ""}`
                : "All caught up!"}
            </p>
          </div>
          <button
            onClick={fetchChats}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition"
          >
            <FaSync size={11} className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        <button
          onClick={onStartSupport}
          disabled={startingSupportChat}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-[13px] font-medium transition mb-3"
          style={{
            background: "rgba(255,255,255,.15)",
            border: "1px solid rgba(255,255,255,.25)",
          }}
        >
          {startingSupportChat ? (
            <FaSpinner className="animate-spin" size={13} />
          ) : (
            <FaHeadset size={13} />
          )}
          Chat with Support
        </button>

        <div className="flex items-center gap-2 bg-white/15 rounded-xl px-3 py-2">
          <FaSearch size={11} className="text-white/60 flex-shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations…"
            className="flex-1 bg-transparent text-sm text-white placeholder-white/50 focus:outline-none"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-white/60 hover:text-white"
            >
              <FaTimes size={10} />
            </button>
          )}
        </div>
      </div>

      {/* 3-day disclaimer */}
      <div className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 bg-amber-50 border-b border-amber-100">
        <FaInfoCircle size={10} className="text-amber-500 flex-shrink-0" />
        <p className="text-[9.5px] text-amber-600">
          Messages auto-delete after <strong>3 days</strong> for privacy &
          storage.
        </p>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-24">
            <FaSpinner className="animate-spin text-blue-400 text-lg" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-10 text-center px-6">
            <FaCommentDots className="text-gray-300 text-3xl mb-2" />
            <p className="text-sm font-medium text-gray-500">
              {search ? "No results" : "No conversations yet"}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {search
                ? "Try different keywords"
                : "Start by contacting support"}
            </p>
          </div>
        ) : (
          filtered.map((chat) => {
            const other = chat.participants?.find((p) => p._id !== userId);
            const isSupportChat = chat.chatType === "support";
            const unread = chat.unreadCounts?.[userId] || 0;
            const isMuted = chat.isMuted;
            return (
              <div
                key={chat._id}
                onClick={() => onSelectChat(chat)}
                className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 border-b border-gray-50 transition"
              >
                <div className="relative flex-shrink-0">
                  {isSupportChat ? (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      <FaHeadset size={18} className="text-white" />
                    </div>
                  ) : other?.profilePhoto ? (
                    <img
                      src={`${BASE}/uploads/profiles/${other.profilePhoto}`}
                      className="w-10 h-10 rounded-full object-cover"
                      alt=""
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                      {other?.name?.charAt(0)?.toUpperCase() || "?"}
                    </div>
                  )}
                  {unread > 0 && !isMuted && (
                    <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5">
                      {unread > 9 ? "9+" : unread}
                    </span>
                  )}
                  {isMuted && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-gray-400 text-white rounded-full flex items-center justify-center">
                      <FaVolumeMute size={7} />
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-1">
                    <span
                      className={`text-sm font-semibold truncate ${unread > 0 && !isMuted ? "text-gray-900" : "text-gray-600"}`}
                    >
                      {isSupportChat
                        ? "Support Team"
                        : other?.name || "Unknown"}
                    </span>
                    <span className="text-[9px] text-gray-400 flex-shrink-0">
                      {fmtChatTime(chat.lastMessageAt || chat.updatedAt)}
                    </span>
                  </div>
                  <p
                    className={`text-xs truncate mt-0.5 ${unread > 0 && !isMuted ? "text-gray-700 font-medium" : "text-gray-400"}`}
                  >
                    {chat.isBlocked
                      ? "Conversation blocked"
                      : chat.lastMessage || "No messages yet"}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    {isSupportChat ? (
                      <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-purple-50 text-purple-600 font-semibold uppercase">
                        Support
                      </span>
                    ) : chat.chatType === "vehicle" ? (
                      <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-600 font-semibold uppercase flex items-center gap-0.5">
                        <FaCar size={7} /> Vehicle
                      </span>
                    ) : null}
                    {chat.vehicleName && !isSupportChat && (
                      <span className="text-[9px] text-gray-400 truncate">
                        · {chat.vehicleName}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

// ─── Main Floating Button ─────────────────────────────────────────────────────
const ChatFloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [unreadConvoCount, setUnreadConvoCount] = useState(0);
  const [startingSupportChat, setStartingSupportChat] = useState(false);

  const location = useLocation();
  const currentUser = JSON.parse(
    localStorage.getItem("user") || sessionStorage.getItem("user") || "{}",
  );

  const { onNewMessageNotification, resetUnreadCount } = useSocket();

  // Fetch unread conversation count from API
  const fetchUnread = useCallback(async () => {
    try {
      const res = await api.getUnreadCount();
      if (res.success) setUnreadConvoCount(res.unreadCount);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) return;
    fetchUnread();
    const interval = setInterval(fetchUnread, 30000);
    return () => clearInterval(interval);
  }, [fetchUnread]);

  // Increment on notification (only if not muted / not already open)
  useEffect(() => {
    if (!onNewMessageNotification) return;
    const unsub = onNewMessageNotification((data) => {
      if (!isOpen || !selectedChat || selectedChat._id !== data.chatId) {
        fetchUnread(); // re-fetch from server for accuracy
      }
    });
    return unsub;
  }, [onNewMessageNotification, isOpen, selectedChat, fetchUnread]);

  const handleSelectChat = async (chat) => {
    setSelectedChat(chat);
    // Mark as read immediately
    try {
      await api.markAsRead(chat._id);
      fetchUnread();
    } catch (e) {}
  };

  const handleStartSupportChat = async () => {
    setStartingSupportChat(true);
    try {
      const res = await api.getSupportChat();
      if (res.success) {
        setSelectedChat(res.data);
        await api.markAsRead(res.data._id);
        fetchUnread();
      }
    } catch {
      toast.error("Failed to start support chat");
    } finally {
      setStartingSupportChat(false);
    }
  };

  const handleMuteToggle = async (chatId, isMuted) => {
    try {
      const res = await api.muteChat(chatId);
      toast.success(res.muted ? "Chat muted" : "Chat unmuted");
      if (selectedChat?._id === chatId) {
        setSelectedChat((prev) => ({ ...prev, isMuted: res.muted }));
      }
      fetchUnread();
    } catch {
      toast.error("Failed to update mute");
    }
  };

  const handleBlockToggle = async (chat) => {
    const userId = currentUser._id || currentUser.id;
    const iBlockedThem =
      chat.isBlocked && chat.blockedBy?.toString() === userId;
    try {
      if (iBlockedThem) {
        await api.unblockUser(chat._id);
        toast.success("User unblocked");
        setSelectedChat((prev) => ({
          ...prev,
          isBlocked: false,
          blockedBy: null,
        }));
      } else {
        await api.blockUser(chat._id);
        toast.success("User blocked");
        setSelectedChat((prev) => ({
          ...prev,
          isBlocked: true,
          blockedBy: userId,
        }));
      }
    } catch {
      toast.error("Failed");
    }
  };

  const handleDeleteConversation = (chatId) => {
    setSelectedChat(null);
    fetchUnread();
  };

  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const hiddenRoutes = ["/home", "/login", "/signup", "/register"];
  if (!token || hiddenRoutes.includes(location.pathname)) return null;

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) fetchUnread();
        }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
        style={{
          background: isOpen
            ? "linear-gradient(135deg,#374151,#1f2937)"
            : "linear-gradient(135deg,#2563EB,#7C3AED)",
        }}
        title={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <FaTimes size={20} className="text-white" />
        ) : (
          <div className="relative">
            <FaComments size={22} className="text-white" />
            {unreadConvoCount > 0 && (
              <span className="absolute -top-2.5 -right-2.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 border-2 border-white animate-pulse">
                {unreadConvoCount > 9 ? "9+" : unreadConvoCount}
              </span>
            )}
          </div>
        )}
      </button>

      {/* Panel */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 flex flex-col overflow-hidden"
          style={{
            width: 360,
            height: 560,
            borderRadius: 18,
            boxShadow: "0 8px 40px rgba(0,0,0,.18), 0 0 0 1px rgba(0,0,0,.07)",
            background: "#fff",
          }}
        >
          {selectedChat ? (
            <div className="relative flex flex-col h-full">
              <InlineChatWindow
                chat={selectedChat}
                user={currentUser}
                onBack={() => setSelectedChat(null)}
                onClose={() => {
                  setIsOpen(false);
                  setSelectedChat(null);
                }}
                onMuteToggle={handleMuteToggle}
                onDeleteConversation={handleDeleteConversation}
                onBlockToggle={handleBlockToggle}
              />
            </div>
          ) : (
            <ChatListPanel
              onSelectChat={handleSelectChat}
              onStartSupport={handleStartSupportChat}
              startingSupportChat={startingSupportChat}
              unreadConvoCount={unreadConvoCount}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ChatFloatingButton;
