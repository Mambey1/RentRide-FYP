// // import React, { useState, useEffect, useRef, useCallback } from "react";
// // import {
// //   FaComments,
// //   FaCommentDots,
// //   FaSearch,
// //   FaTimes,
// //   FaSync,
// //   FaPaperPlane,
// //   FaSmile,
// //   FaSpinner,
// //   FaBan,
// //   FaUnlock,
// //   FaCheck,
// //   FaCheckDouble,
// //   FaLock,
// //   FaArrowLeft,
// //   FaCar,
// //   FaShieldAlt,
// //   FaInbox,
// //   FaUserCircle,
// // } from "react-icons/fa";
// // import axios from "axios";
// // import { toast, ToastContainer } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import { useSocket } from "../context/SocketContext";

// // // Token helper
// // const getToken = () =>
// //   localStorage.getItem("token") || sessionStorage.getItem("token");
// // const authHeader = () => ({ Authorization: `Bearer ${getToken()}` });

// // // API service
// // const adminChatService = {
// //   getAllChats: async (filter = "all", search = "") => {
// //     const res = await axios.get(
// //       `http://localhost:5000/api/admin/chats?filter=${filter}&search=${search}`,
// //       { headers: authHeader() }
// //     );
// //     return res.data;
// //   },
// //   getChat: async (chatId) => {
// //     const res = await axios.get(
// //       `http://localhost:5000/api/admin/chats/${chatId}`,
// //       { headers: authHeader() }
// //     );
// //     return res.data;
// //   },
// //   sendMessage: async (chatId, message) => {
// //     const res = await axios.post(
// //       `http://localhost:5000/api/admin/chats/${chatId}/message`,
// //       { message },
// //       { headers: authHeader() }
// //     );
// //     return res.data;
// //   },
// //   markAsRead: async (chatId) => {
// //     const res = await axios.put(
// //       `http://localhost:5000/api/admin/chats/${chatId}/read`,
// //       {},
// //       { headers: authHeader() }
// //     );
// //     return res.data;
// //   },
// //   blockUser: async (chatId) => {
// //     const res = await axios.put(
// //       `http://localhost:5000/api/admin/chats/${chatId}/block`,
// //       {},
// //       { headers: authHeader() }
// //     );
// //     return res.data;
// //   },
// //   unblockUser: async (chatId) => {
// //     const res = await axios.put(
// //       `http://localhost:5000/api/admin/chats/${chatId}/unblock`,
// //       {},
// //       { headers: authHeader() }
// //     );
// //     return res.data;
// //   },
// //   getUnreadCount: async () => {
// //     const res = await axios.get(
// //       `http://localhost:5000/api/admin/chats/unread/count`,
// //       { headers: authHeader() }
// //     );
// //     return res.data;
// //   },
// // };

// // // Time helpers
// // const formatChatTime = (date) => {
// //   if (!date) return "";
// //   const now = new Date();
// //   const d = new Date(date);
// //   const diffMs = now - d;
// //   const mins = Math.floor(diffMs / 60000);
// //   const hours = Math.floor(diffMs / 3600000);
// //   const days = Math.floor(diffMs / 86400000);
// //   if (mins < 1) return "now";
// //   if (mins < 60) return `${mins}m`;
// //   if (hours < 24) return `${hours}h`;
// //   if (days === 1) return "Yesterday";
// //   return d.toLocaleDateString();
// // };

// // const formatMsgTime = (date) =>
// //   new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

// // // Avatar component
// // const Avatar = ({ user, size = "md", className = "" }) => {
// //   const s =
// //     size === "sm"
// //       ? "w-7 h-7 text-[10px]"
// //       : size === "lg"
// //       ? "w-12 h-12 text-base"
// //       : "w-9 h-9 text-sm";
// //   if (user?.profilePhoto) {
// //     return (
// //       <img
// //         src={`http://localhost:5000/uploads/profiles/${user.profilePhoto}`}
// //         alt={user.name}
// //         className={`${s} rounded-full object-cover flex-shrink-0 ${className}`}
// //       />
// //     );
// //   }
// //   return (
// //     <div
// //       className={`${s} rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0 ${className}`}
// //     >
// //       {user?.name?.charAt(0)?.toUpperCase() || "?"}
// //     </div>
// //   );
// // };

// // const AdminMessages = () => {
// //   const adminUser = JSON.parse(
// //     localStorage.getItem("user") || sessionStorage.getItem("user") || "null"
// //   );
// //   const adminId = adminUser?._id || adminUser?.id;

// //   const { onNewMessage, sendMessage: socketSend, isConnected } = useSocket();

// //   const [chats, setChats] = useState([]);
// //   const [filteredChats, setFilteredChats] = useState([]);
// //   const [chatsLoading, setChatsLoading] = useState(false);
// //   const [selectedChat, setSelectedChat] = useState(null);
// //   const [messages, setMessages] = useState([]);
// //   const [messagesLoading, setMessagesLoading] = useState(false);
// //   const [newMessage, setNewMessage] = useState("");
// //   const [sending, setSending] = useState(false);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [activeFilter, setActiveFilter] = useState("all");
// //   const [showChatWindow, setShowChatWindow] = useState(false);
// //   const [showBlockConfirm, setShowBlockConfirm] = useState(false);
// //   const [showUnblockConfirm, setShowUnblockConfirm] = useState(false);
// //   const [blockingUser, setBlockingUser] = useState(false);
// //   const [totalUnread, setTotalUnread] = useState(0);

// //   const messagesEndRef = useRef(null);
// //   const inputRef = useRef(null);
// //   const selectedChatRef = useRef(null);

// //   useEffect(() => {
// //     selectedChatRef.current = selectedChat;
// //   }, [selectedChat]);

// //   // Fetch unread count periodically
// //   const fetchUnreadCount = useCallback(async () => {
// //     try {
// //       const res = await adminChatService.getUnreadCount();
// //       if (res.success) {
// //         setTotalUnread(res.count);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching unread count:", error);
// //     }
// //   }, []);

// //   // Fetch chats
// //   const fetchChats = useCallback(async () => {
// //     try {
// //       setChatsLoading(true);
// //       const res = await adminChatService.getAllChats(activeFilter, searchQuery);
// //       if (res.success) {
// //         setChats(res.data);
// //         setFilteredChats(res.data);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching chats:", error);
// //       toast.error("Failed to load chats");
// //     } finally {
// //       setChatsLoading(false);
// //     }
// //   }, [activeFilter, searchQuery]);

// //   useEffect(() => {
// //     fetchChats();
// //     fetchUnreadCount();
// //     const interval = setInterval(() => {
// //       fetchChats();
// //       fetchUnreadCount();
// //     }, 30000);
// //     return () => clearInterval(interval);
// //   }, [fetchChats, fetchUnreadCount]);

// //   // Socket listener for new messages
// //   useEffect(() => {
// //     const unsubscribe = onNewMessage((data) => {
// //       fetchChats();
// //       fetchUnreadCount();
// //       const current = selectedChatRef.current;
// //       if (current && data.chatId === current._id) {
// //         setMessages((prev) => {
// //           if (prev.some((m) => m._id === data.message._id)) return prev;
// //           return [...prev, data.message];
// //         });
// //         adminChatService.markAsRead(current._id).catch(() => {});
// //         setTimeout(
// //           () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
// //           100
// //         );
// //       }
// //     });
// //     return unsubscribe;
// //   }, [onNewMessage, fetchChats, fetchUnreadCount]);

// //   // Auto-scroll
// //   useEffect(() => {
// //     if (messagesEndRef.current) {
// //       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
// //     }
// //   }, [messages]);

// //   // Update filtered chats when search changes
// //   useEffect(() => {
// //     if (!searchQuery.trim()) {
// //       setFilteredChats(chats);
// //     } else {
// //       const q = searchQuery.toLowerCase();
// //       setFilteredChats(
// //         chats.filter((c) => {
// //           const userName = c.otherParticipant?.name?.toLowerCase() || "";
// //           const vehicleName = c.vehicleName?.toLowerCase() || "";
// //           const lastMsg = c.lastMessage?.toLowerCase() || "";
// //           return (
// //             userName.includes(q) || vehicleName.includes(q) || lastMsg.includes(q)
// //           );
// //         })
// //       );
// //     }
// //   }, [searchQuery, chats]);

// //   const getUnread = (chat) => chat.unreadForAdmin || 0;
// //   const iBlockedThem =
// //     selectedChat?.isBlocked && selectedChat?.blockedBy === adminId;

// //   const openChat = async (chat) => {
// //     setSelectedChat(chat);
// //     setShowChatWindow(true);
// //     setMessages([]);
// //     if (!chat.isBlocked) {
// //       try {
// //         setMessagesLoading(true);
// //         const res = await adminChatService.getChat(chat._id);
// //         if (res.success) {
// //           setMessages(res.data.messages || []);
// //           await adminChatService.markAsRead(chat._id);
// //           fetchChats();
// //           fetchUnreadCount();
// //         }
// //       } catch (error) {
// //         console.error("Error loading messages:", error);
// //         toast.error("Failed to load messages");
// //       } finally {
// //         setMessagesLoading(false);
// //       }
// //     }
// //     setTimeout(() => inputRef.current?.focus(), 200);
// //   };

// //   const closeChat = () => {
// //     setShowChatWindow(false);
// //     setSelectedChat(null);
// //     setMessages([]);
// //     setNewMessage("");
// //   };

// //   const sendMessage = async () => {
// //     if (!newMessage.trim() || sending || selectedChat?.isBlocked) return;
// //     const text = newMessage.trim();
// //     setSending(true);
// //     const tempMsg = {
// //       _id: `temp-${Date.now()}`,
// //       message: text,
// //       senderType: "admin",
// //       read: false,
// //       createdAt: new Date(),
// //       sender: adminUser,
// //     };
// //     setMessages((prev) => [...prev, tempMsg]);
// //     setNewMessage("");
// //     setTimeout(
// //       () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
// //       100
// //     );
// //     try {
// //       const res = await adminChatService.sendMessage(selectedChat._id, text);
// //       if (res.success) {
// //         setMessages((prev) =>
// //           prev.map((m) => (m._id === tempMsg._id ? res.data : m))
// //         );
// //         if (socketSend && isConnected) socketSend(selectedChat._id, text);
// //         fetchChats();
// //         fetchUnreadCount();
// //       }
// //     } catch (error) {
// //       console.error("Error sending message:", error);
// //       toast.error("Failed to send message");
// //       setMessages((prev) => prev.filter((m) => m._id !== tempMsg._id));
// //     } finally {
// //       setSending(false);
// //     }
// //   };

// //   const handleBlock = async () => {
// //     setBlockingUser(true);
// //     try {
// //       const res = await adminChatService.blockUser(selectedChat._id);
// //       if (res.success) {
// //         toast.success(`${selectedChat.otherParticipant?.name} has been blocked`);
// //         await fetchChats();
// //         setSelectedChat((p) => ({
// //           ...p,
// //           isBlocked: true,
// //           blockedBy: adminId,
// //         }));
// //         setMessages([]);
// //       }
// //     } catch (error) {
// //       console.error("Error blocking user:", error);
// //       toast.error("Failed to block user");
// //     } finally {
// //       setBlockingUser(false);
// //       setShowBlockConfirm(false);
// //     }
// //   };

// //   const handleUnblock = async () => {
// //     setBlockingUser(true);
// //     try {
// //       const res = await adminChatService.unblockUser(selectedChat._id);
// //       if (res.success) {
// //         toast.success(`${selectedChat.otherParticipant?.name} has been unblocked`);
// //         await fetchChats();
// //         setSelectedChat((p) => ({ ...p, isBlocked: false, blockedBy: null }));
// //         const msgRes = await adminChatService.getChat(selectedChat._id);
// //         if (msgRes.success) setMessages(msgRes.data.messages || []);
// //       }
// //     } catch (error) {
// //       console.error("Error unblocking user:", error);
// //       toast.error("Failed to unblock user");
// //     } finally {
// //       setBlockingUser(false);
// //       setShowUnblockConfirm(false);
// //     }
// //   };

// //   const filterTabs = [
// //     { id: "all", label: "All", count: chats.length },
// //     {
// //       id: "vehicle",
// //       label: "Vehicle Chats",
// //       count: chats.filter((c) => c.chatType === "vehicle").length,
// //     },
// //     {
// //       id: "support",
// //       label: "Support",
// //       count: chats.filter((c) => c.chatType === "support").length,
// //     },
// //     {
// //       id: "unread",
// //       label: "Unread",
// //       count: chats.filter((c) => getUnread(c) > 0).length,
// //     },
// //   ];

// //   // Group messages by date
// //   const groupedMessages = (() => {
// //     const groups = [];
// //     let lastDate = null;
// //     messages.forEach((msg, i) => {
// //       const day = new Date(msg.createdAt).toDateString();
// //       if (day !== lastDate) {
// //         const today = new Date().toDateString();
// //         const yesterday = new Date(Date.now() - 86400000).toDateString();
// //         groups.push({
// //           type: "date",
// //           label:
// //             day === today ? "Today" : day === yesterday ? "Yesterday" : day,
// //           key: `date-${i}`,
// //         });
// //         lastDate = day;
// //       }
// //       groups.push({ type: "msg", msg, key: msg._id || i });
// //     });
// //     return groups;
// //   })();

// //   return (
// //     <>
// //       <ToastContainer position="top-right" autoClose={3000} />
// //       <div className="flex flex-col bg-gradient-to-br from-gray-50 to-gray-100" style={{ height: "100vh" }}>
// //         {/* Header */}
// //         <div className="px-8 py-5 bg-white/80 backdrop-blur-md shadow-sm flex-shrink-0">
// //           <div className="flex justify-between items-center">
// //             <div>
// //               <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent flex items-center gap-2">
// //                 <FaComments className="text-blue-600" />
// //                 Messages
// //                 {totalUnread > 0 && (
// //                   <span className="ml-1 px-2 py-0.5 bg-blue-600 text-white text-xs font-bold rounded-full">
// //                     {totalUnread > 99 ? "99+" : totalUnread}
// //                   </span>
// //                 )}
// //               </h1>
// //               <p className="text-sm text-gray-500 mt-1">
// //                 Manage all user conversations and vehicle inquiries
// //               </p>
// //             </div>
// //             <button
// //               onClick={() => {
// //                 fetchChats();
// //                 fetchUnreadCount();
// //               }}
// //               className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition shadow-sm"
// //             >
// //               <FaSync
// //                 className={chatsLoading ? "animate-spin text-blue-500" : "text-gray-400"}
// //                 size={13}
// //               />
// //               Refresh
// //             </button>
// //           </div>
// //         </div>

// //         {/* Chat panel */}
// //         <div className="flex flex-1 min-h-0 m-6 rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-white">
// //           {/* LEFT: Chat list */}
// //           <div
// //             className={`${
// //               showChatWindow ? "hidden lg:flex" : "flex"
// //             } flex-col w-full lg:w-[340px] border-r border-gray-100 flex-shrink-0`}
// //           >
// //             <div className="p-4 border-b border-gray-100 space-y-3">
// //               <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
// //                 <FaSearch size={12} className="text-gray-400 flex-shrink-0" />
// //                 <input
// //                   value={searchQuery}
// //                   onChange={(e) => setSearchQuery(e.target.value)}
// //                   placeholder="Search conversations, users…"
// //                   className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
// //                 />
// //                 {searchQuery && (
// //                   <button
// //                     onClick={() => setSearchQuery("")}
// //                     className="text-gray-400 hover:text-gray-600"
// //                   >
// //                     <FaTimes size={11} />
// //                   </button>
// //                 )}
// //               </div>
// //               <div className="flex gap-1 overflow-x-auto">
// //                 {filterTabs.map((tab) => (
// //                   <button
// //                     key={tab.id}
// //                     onClick={() => setActiveFilter(tab.id)}
// //                     className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
// //                       activeFilter === tab.id
// //                         ? "bg-blue-600 text-white shadow-sm"
// //                         : "bg-gray-100 text-gray-500 hover:bg-gray-200"
// //                     }`}
// //                   >
// //                     {tab.label}
// //                     {tab.count > 0 && (
// //                       <span
// //                         className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
// //                           activeFilter === tab.id
// //                             ? "bg-white/20 text-white"
// //                             : "bg-gray-300 text-gray-600"
// //                         }`}
// //                       >
// //                         {tab.count}
// //                       </span>
// //                     )}
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>

// //             <div className="flex-1 overflow-y-auto">
// //               {chatsLoading && chats.length === 0 ? (
// //                 <div className="flex items-center justify-center h-32">
// //                   <FaSpinner className="animate-spin text-blue-400 text-xl" />
// //                 </div>
// //               ) : filteredChats.length === 0 ? (
// //                 <div className="flex flex-col items-center justify-center h-full py-12 text-center px-6">
// //                   <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-3">
// //                     <FaInbox className="text-blue-300 text-2xl" />
// //                   </div>
// //                   <p className="text-sm font-semibold text-gray-600">
// //                     {searchQuery ? "No results found" : "No conversations yet"}
// //                   </p>
// //                   <p className="text-xs text-gray-400 mt-1">
// //                     {searchQuery
// //                       ? "Try a different search term"
// //                       : "User conversations will appear here"}
// //                   </p>
// //                 </div>
// //               ) : (
// //                 filteredChats.map((chat) => {
// //                   const unread = getUnread(chat);
// //                   const isSelected = selectedChat?._id === chat._id && showChatWindow;
// //                   const isBlocked = chat.isBlocked;
// //                   const isVehicle = chat.chatType === "vehicle";
// //                   return (
// //                     <div
// //                       key={chat._id}
// //                       onClick={() => openChat(chat)}
// //                       className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer transition-all border-b border-gray-50 ${
// //                         isSelected
// //                           ? "bg-blue-50 border-l-[3px] border-l-blue-500"
// //                           : "hover:bg-gray-50 border-l-[3px] border-l-transparent"
// //                       } ${isBlocked ? "opacity-60" : ""}`}
// //                     >
// //                       <div className="relative flex-shrink-0">
// //                         <Avatar user={chat.otherParticipant} size="md" />
// //                         {isBlocked && (
// //                           <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center shadow-sm">
// //                             <FaBan size={7} />
// //                           </span>
// //                         )}
// //                         {unread > 0 && !isBlocked && (
// //                           <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-blue-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
// //                             {unread > 9 ? "9+" : unread}
// //                           </span>
// //                         )}
// //                       </div>
// //                       <div className="flex-1 min-w-0">
// //                         <div className="flex items-baseline justify-between gap-1 mb-0.5">
// //                           <span
// //                             className={`text-sm font-semibold truncate ${
// //                               unread > 0 ? "text-gray-900" : "text-gray-700"
// //                             }`}
// //                           >
// //                             {chat.otherParticipant?.name || "Unknown User"}
// //                           </span>
// //                           <span className="text-[10px] text-gray-400 flex-shrink-0">
// //                             {formatChatTime(chat.lastMessageAt || chat.updatedAt)}
// //                           </span>
// //                         </div>
// //                         <p
// //                           className={`text-xs truncate ${
// //                             unread > 0 && !isBlocked
// //                               ? "text-gray-700 font-medium"
// //                               : "text-gray-400"
// //                           }`}
// //                         >
// //                           {isBlocked
// //                             ? "Conversation blocked"
// //                             : chat.lastMessage || "No messages yet"}
// //                         </p>
// //                         <div className="flex items-center gap-1.5 mt-1">
// //                           {isVehicle ? (
// //                             <span className="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded-full font-semibold bg-blue-50 text-blue-600 uppercase tracking-wide">
// //                               <FaCar size={7} /> Vehicle
// //                             </span>
// //                           ) : (
// //                             <span className="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded-full font-semibold bg-purple-50 text-purple-600 uppercase tracking-wide">
// //                               <FaShieldAlt size={7} /> Support
// //                             </span>
// //                           )}
// //                           {chat.vehicleName && (
// //                             <span className="text-[10px] text-gray-400 truncate">
// //                               · {chat.vehicleName}
// //                             </span>
// //                           )}
// //                           {isBlocked && (
// //                             <span className="text-[9px] text-red-500 font-bold uppercase">
// //                               Blocked
// //                             </span>
// //                           )}
// //                         </div>
// //                       </div>
// //                     </div>
// //                   );
// //                 })
// //               )}
// //             </div>

// //             <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
// //               <span className="text-xs text-gray-500">
// //                 {chats.length} conversation{chats.length !== 1 ? "s" : ""}
// //               </span>
// //               {totalUnread > 0 && (
// //                 <span className="text-xs font-semibold text-blue-600">
// //                   {totalUnread} unread
// //                 </span>
// //               )}
// //             </div>
// //           </div>

// //           {/* RIGHT: Chat window */}
// //           {showChatWindow && selectedChat ? (
// //             <div className="flex-1 flex flex-col min-w-0">
// //               {/* Header */}
// //               <div className="px-5 py-3.5 bg-white border-b border-gray-100 flex items-center justify-between flex-shrink-0 shadow-sm">
// //                 <div className="flex items-center gap-3">
// //                   <button
// //                     onClick={closeChat}
// //                     className="lg:hidden w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition"
// //                   >
// //                     <FaArrowLeft size={14} />
// //                   </button>
// //                   <Avatar user={selectedChat.otherParticipant} size="md" />
// //                   <div>
// //                     <div className="flex items-center gap-2">
// //                       <p className="text-sm font-bold text-gray-900">
// //                         {selectedChat.otherParticipant?.name || "Unknown User"}
// //                       </p>
// //                       {selectedChat.isBlocked && (
// //                         <span className="inline-flex items-center gap-1 text-[10px] bg-red-50 text-red-500 border border-red-200 px-1.5 py-0.5 rounded-full font-semibold">
// //                           <FaBan size={8} /> Blocked
// //                         </span>
// //                       )}
// //                     </div>
// //                     <div className="flex items-center gap-1.5 mt-0.5">
// //                       <p className="text-xs text-gray-400">
// //                         {selectedChat.otherParticipant?.email}
// //                       </p>
// //                       {selectedChat.vehicleName && (
// //                         <>
// //                           <span className="text-gray-300">·</span>
// //                           <span className="text-xs text-blue-500 flex items-center gap-1">
// //                             <FaCar size={9} /> {selectedChat.vehicleName}
// //                           </span>
// //                         </>
// //                       )}
// //                     </div>
// //                   </div>
// //                 </div>
// //                 <div className="flex items-center gap-2">
// //                   {!selectedChat.isBlocked ? (
// //                     <button
// //                       onClick={() => setShowBlockConfirm(true)}
// //                       className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-500 hover:bg-red-50 border border-red-100 transition"
// //                     >
// //                       <FaBan size={11} /> Block
// //                     </button>
// //                   ) : iBlockedThem ? (
// //                     <button
// //                       onClick={() => setShowUnblockConfirm(true)}
// //                       className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-600 hover:bg-emerald-50 border border-emerald-200 transition"
// //                     >
// //                       <FaUnlock size={11} /> Unblock
// //                     </button>
// //                   ) : null}
// //                 </div>
// //               </div>

// //               {/* Vehicle banner */}
// //               {selectedChat.vehicleId && (
// //                 <div className="px-5 py-2.5 bg-blue-50 border-b border-blue-100 flex items-center gap-3">
// //                   <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
// //                     <FaCar size={12} className="text-blue-600" />
// //                   </div>
// //                   <span className="text-xs font-semibold text-blue-800">
// //                     {selectedChat.vehicleName || "Vehicle Inquiry"}
// //                   </span>
// //                 </div>
// //               )}

// //               {/* Block banner */}
// //               {selectedChat.isBlocked && (
// //                 <div
// //                   className={`flex items-center justify-between px-5 py-3 border-b ${
// //                     iBlockedThem
// //                       ? "bg-red-50 border-red-100"
// //                       : "bg-amber-50 border-amber-100"
// //                   }`}
// //                 >
// //                   <div className="flex items-center gap-3">
// //                     <div
// //                       className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
// //                         iBlockedThem ? "bg-red-100" : "bg-amber-100"
// //                       }`}
// //                     >
// //                       <FaBan
// //                         size={13}
// //                         className={iBlockedThem ? "text-red-500" : "text-amber-500"}
// //                       />
// //                     </div>
// //                     <div>
// //                       <p
// //                         className={`text-xs font-bold ${
// //                           iBlockedThem ? "text-red-700" : "text-amber-700"
// //                         }`}
// //                       >
// //                         {iBlockedThem
// //                           ? `You blocked ${selectedChat.otherParticipant?.name}`
// //                           : "This user has restricted messaging"}
// //                       </p>
// //                       <p
// //                         className={`text-[11px] mt-0.5 ${
// //                           iBlockedThem ? "text-red-500" : "text-amber-500"
// //                         }`}
// //                       >
// //                         {iBlockedThem
// //                           ? "They cannot message you. Unblock to restore the conversation."
// //                           : "You cannot send messages in this conversation."}
// //                       </p>
// //                     </div>
// //                   </div>
// //                   {iBlockedThem && (
// //                     <button
// //                       onClick={() => setShowUnblockConfirm(true)}
// //                       className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition ml-3 whitespace-nowrap"
// //                     >
// //                       <FaUnlock size={10} /> Unblock
// //                     </button>
// //                   )}
// //                 </div>
// //               )}

// //               {/* Messages area */}
// //               <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1 bg-gray-50">
// //                 {messagesLoading ? (
// //                   <div className="flex items-center justify-center h-full">
// //                     <FaSpinner className="animate-spin text-blue-400 text-2xl" />
// //                   </div>
// //                 ) : selectedChat.isBlocked && messages.length === 0 ? (
// //                   <div className="flex flex-col items-center justify-center h-full text-center px-8">
// //                     <div
// //                       className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${
// //                         iBlockedThem ? "bg-red-50" : "bg-amber-50"
// //                       }`}
// //                     >
// //                       <FaLock
// //                         size={28}
// //                         className={iBlockedThem ? "text-red-300" : "text-amber-300"}
// //                       />
// //                     </div>
// //                     <p className="text-sm font-bold text-gray-600">
// //                       {iBlockedThem
// //                         ? "Conversation blocked"
// //                         : "Messaging unavailable"}
// //                     </p>
// //                     <p className="text-xs text-gray-400 mt-2 leading-relaxed max-w-xs">
// //                       {iBlockedThem
// //                         ? `You have blocked ${selectedChat.otherParticipant?.name}. Unblock to restore the conversation.`
// //                         : "This user has restricted messaging."}
// //                     </p>
// //                     {iBlockedThem && (
// //                       <button
// //                         onClick={() => setShowUnblockConfirm(true)}
// //                         className="mt-5 flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition"
// //                       >
// //                         <FaUnlock size={12} /> Unblock{" "}
// //                         {selectedChat.otherParticipant?.name}
// //                       </button>
// //                     )}
// //                   </div>
// //                 ) : messages.length === 0 ? (
// //                   <div className="flex flex-col items-center justify-center h-full text-center">
// //                     <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-3">
// //                       <FaCommentDots className="text-blue-300 text-2xl" />
// //                     </div>
// //                     <p className="text-sm font-semibold text-gray-500">
// //                       No messages yet
// //                     </p>
// //                     <p className="text-xs text-gray-400 mt-1">
// //                       Start the conversation with this user
// //                     </p>
// //                   </div>
// //                 ) : (
// //                   groupedMessages.map((item) => {
// //                     if (item.type === "date") {
// //                       return (
// //                         <div key={item.key} className="flex items-center gap-3 py-2">
// //                           <div className="flex-1 h-px bg-gray-200" />
// //                           <span className="text-[10px] text-gray-400 font-medium px-2.5 py-1 bg-white border border-gray-200 rounded-full whitespace-nowrap shadow-sm">
// //                             {item.label}
// //                           </span>
// //                           <div className="flex-1 h-px bg-gray-200" />
// //                         </div>
// //                       );
// //                     }
// //                     const { msg } = item;
// //                     const isOwn = msg.senderType === "admin" || msg.sender?._id === adminId;
// //                     return (
// //                       <div
// //                         key={item.key}
// //                         className={`flex items-end gap-2 ${
// //                           isOwn ? "justify-end" : "justify-start"
// //                         }`}
// //                       >
// //                         {!isOwn && (
// //                           <div className="flex-shrink-0 mb-1">
// //                             <Avatar user={selectedChat.otherParticipant} size="sm" />
// //                           </div>
// //                         )}
// //                         <div
// //                           className={`flex flex-col ${
// //                             isOwn ? "items-end" : "items-start"
// //                           } max-w-[65%]`}
// //                         >
// //                           <div
// //                             className={`px-4 py-2.5 text-sm leading-relaxed break-words ${
// //                               isOwn
// //                                 ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl rounded-br-sm shadow-sm"
// //                                 : "bg-white text-gray-800 rounded-2xl rounded-bl-sm border border-gray-100 shadow-sm"
// //                             }`}
// //                           >
// //                             {msg.message}
// //                           </div>
// //                           <div
// //                             className={`flex items-center gap-1 mt-1 px-1 ${
// //                               isOwn ? "flex-row-reverse" : ""
// //                             }`}
// //                           >
// //                             <span className="text-[10px] text-gray-400">
// //                               {formatMsgTime(msg.createdAt)}
// //                             </span>
// //                             {isOwn && (
// //                               <FaCheckDouble
// //                                 size={9}
// //                                 className={msg.read ? "text-blue-400" : "text-gray-300"}
// //                               />
// //                             )}
// //                           </div>
// //                         </div>
// //                         {isOwn && (
// //                           <div className="flex-shrink-0 mb-1">
// //                             <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-[10px] font-bold">
// //                               {(adminUser?.name || "A").charAt(0).toUpperCase()}
// //                             </div>
// //                           </div>
// //                         )}
// //                       </div>
// //                     );
// //                   })
// //                 )}
// //                 <div ref={messagesEndRef} />
// //               </div>

// //               {/* Input */}
// //               <div className="px-4 py-3 bg-white border-t border-gray-100 flex-shrink-0">
// //                 {!isConnected && (
// //                   <p className="text-[11px] text-center text-amber-500 mb-2">
// //                     Reconnecting to chat server…
// //                   </p>
// //                 )}
// //                 {selectedChat.isBlocked ? (
// //                   <div
// //                     className={`flex items-center gap-3 rounded-2xl px-4 py-3 ${
// //                       iBlockedThem
// //                         ? "bg-red-50 border border-red-100"
// //                         : "bg-amber-50 border border-amber-100"
// //                     }`}
// //                   >
// //                     <FaLock
// //                       size={14}
// //                       className={iBlockedThem ? "text-red-400" : "text-amber-400"}
// //                     />
// //                     <p
// //                       className={`text-xs flex-1 ${
// //                         iBlockedThem ? "text-red-500" : "text-amber-600"
// //                       }`}
// //                     >
// //                       {iBlockedThem ? (
// //                         <>
// //                           You blocked this user.{" "}
// //                           <button
// //                             onClick={() => setShowUnblockConfirm(true)}
// //                             className="underline font-semibold hover:no-underline"
// //                           >
// //                             Unblock to chat
// //                           </button>
// //                         </>
// //                       ) : (
// //                         "You cannot send messages in this conversation."
// //                       )}
// //                     </p>
// //                   </div>
// //                 ) : (
// //                   <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-3 py-2">
// //                     <button className="text-gray-400 hover:text-blue-500 transition flex-shrink-0">
// //                       <FaSmile size={18} />
// //                     </button>
// //                     <input
// //                       ref={inputRef}
// //                       type="text"
// //                       value={newMessage}
// //                       onChange={(e) => setNewMessage(e.target.value)}
// //                       onKeyPress={(e) => e.key === "Enter" && sendMessage()}
// //                       placeholder="Type a reply…"
// //                       className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
// //                     />
// //                     <button
// //                       onClick={sendMessage}
// //                       disabled={!newMessage.trim() || sending}
// //                       className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-md transition"
// //                     >
// //                       {sending ? (
// //                         <FaSpinner className="animate-spin" size={13} />
// //                       ) : (
// //                         <FaPaperPlane size={13} />
// //                       )}
// //                     </button>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           ) : (
// //             /* Empty state */
// //             <div className="flex-1 hidden lg:flex flex-col items-center justify-center bg-gray-50 text-center px-8">
// //               <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center mb-5 shadow-inner">
// //                 <FaComments className="text-blue-300 text-4xl" />
// //               </div>
// //               <p className="text-lg font-bold text-gray-600">
// //                 Select a conversation
// //               </p>
// //               <p className="text-sm text-gray-400 mt-2 max-w-xs">
// //                 Choose a chat from the left panel to start replying to users
// //               </p>
// //               {totalUnread > 0 && (
// //                 <div className="mt-4 px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl">
// //                   <p className="text-sm font-semibold text-blue-600">
// //                     {totalUnread} unread message
// //                     {totalUnread !== 1 ? "s" : ""} waiting
// //                   </p>
// //                 </div>
// //               )}
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* Block Modal */}
// //       {showBlockConfirm && selectedChat && (
// //         <div
// //           className="fixed inset-0 z-[200] flex items-center justify-center p-4"
// //           style={{ background: "rgba(0,0,0,0.55)" }}
// //         >
// //           <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
// //             <div className="bg-gradient-to-r from-red-500 to-rose-600 px-6 pt-6 pb-10">
// //               <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
// //                 <FaBan size={26} className="text-white" />
// //               </div>
// //               <h3 className="text-white text-center text-lg font-bold">
// //                 Block User?
// //               </h3>
// //               <p className="text-red-100 text-center text-xs mt-1">
// //                 You can unblock them anytime
// //               </p>
// //             </div>
// //             <div className="-mt-4 bg-white rounded-t-2xl px-6 pt-5 pb-6">
// //               <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
// //                 <Avatar user={selectedChat.otherParticipant} size="md" />
// //                 <div>
// //                   <p className="font-semibold text-gray-800 text-sm">
// //                     {selectedChat.otherParticipant?.name}
// //                   </p>
// //                   <p className="text-xs text-gray-500">
// //                     Will be blocked from messaging
// //                   </p>
// //                 </div>
// //               </div>
// //               <ul className="space-y-2 mb-5">
// //                 {[
// //                   "They won't be able to message you",
// //                   "Their messages will be hidden",
// //                   "You can unblock them anytime",
// //                 ].map((t, i) => (
// //                   <li key={i} className="flex items-center gap-2 text-xs text-gray-600">
// //                     <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
// //                       <FaTimes size={7} className="text-red-500" />
// //                     </span>
// //                     {t}
// //                   </li>
// //                 ))}
// //               </ul>
// //               <div className="flex gap-2">
// //                 <button
// //                   onClick={() => setShowBlockConfirm(false)}
// //                   className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition font-medium"
// //                 >
// //                   Cancel
// //                 </button>
// //                 <button
// //                   onClick={handleBlock}
// //                   disabled={blockingUser}
// //                   className="flex-1 px-4 py-2.5 text-sm bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white rounded-xl font-semibold transition flex items-center justify-center gap-2 disabled:opacity-60"
// //                 >
// //                   {blockingUser ? (
// //                     <FaSpinner className="animate-spin" size={13} />
// //                   ) : (
// //                     <FaBan size={12} />
// //                   )}
// //                   {blockingUser ? "Blocking…" : "Block User"}
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Unblock Modal */}
// //       {showUnblockConfirm && selectedChat && (
// //         <div
// //           className="fixed inset-0 z-[200] flex items-center justify-center p-4"
// //           style={{ background: "rgba(0,0,0,0.55)" }}
// //         >
// //           <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
// //             <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 pt-6 pb-10">
// //               <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
// //                 <FaUnlock size={24} className="text-white" />
// //               </div>
// //               <h3 className="text-white text-center text-lg font-bold">
// //                 Unblock User?
// //               </h3>
// //               <p className="text-emerald-100 text-center text-xs mt-1">
// //                 Resume your conversation
// //               </p>
// //             </div>
// //             <div className="-mt-4 bg-white rounded-t-2xl px-6 pt-5 pb-6">
// //               <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
// //                 <Avatar user={selectedChat.otherParticipant} size="md" />
// //                 <div>
// //                   <p className="font-semibold text-gray-800 text-sm">
// //                     {selectedChat.otherParticipant?.name}
// //                   </p>
// //                   <p className="text-xs text-gray-500">Will be unblocked</p>
// //                 </div>
// //               </div>
// //               <ul className="space-y-2 mb-5">
// //                 {[
// //                   "They can message you again",
// //                   "Previous messages will be restored",
// //                   "You can block them again anytime",
// //                 ].map((t, i) => (
// //                   <li key={i} className="flex items-center gap-2 text-xs text-gray-600">
// //                     <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
// //                       <FaCheck size={7} className="text-emerald-600" />
// //                     </span>
// //                     {t}
// //                   </li>
// //                 ))}
// //               </ul>
// //               <div className="flex gap-2">
// //                 <button
// //                   onClick={() => setShowUnblockConfirm(false)}
// //                   className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition font-medium"
// //                 >
// //                   Cancel
// //                 </button>
// //                 <button
// //                   onClick={handleUnblock}
// //                   disabled={blockingUser}
// //                   className="flex-1 px-4 py-2.5 text-sm bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl font-semibold transition flex items-center justify-center gap-2 disabled:opacity-60"
// //                 >
// //                   {blockingUser ? (
// //                     <FaSpinner className="animate-spin" size={13} />
// //                   ) : (
// //                     <FaUnlock size={12} />
// //                   )}
// //                   {blockingUser ? "Unblocking…" : "Unblock User"}
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // };

// // export default AdminMessages;

// import React, { useState, useEffect, useRef, useCallback } from "react";
// import {
//   FaComments,
//   FaCommentDots,
//   FaSearch,
//   FaTimes,
//   FaSync,
//   FaPaperPlane,
//   FaSmile,
//   FaSpinner,
//   FaBan,
//   FaUnlock,
//   FaCheck,
//   FaCheckDouble,
//   FaLock,
//   FaArrowLeft,
//   FaCar,
//   FaShieldAlt,
//   FaInbox,
// } from "react-icons/fa";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useSocket } from "../context/SocketContext"; // adjust path to match your project

// // ─── Token helper ─────────────────────────────────────────────────────────────
// const getToken = () =>
//   localStorage.getItem("token") || sessionStorage.getItem("token");
// const authHeader = () => ({ Authorization: `Bearer ${getToken()}` });

// // ─── API service ──────────────────────────────────────────────────────────────
// const adminChatService = {
//   getAllChats: async (filter = "all", search = "") => {
//     const res = await axios.get(
//       `http://localhost:5000/api/admin/chats?filter=${filter}&search=${encodeURIComponent(search)}`,
//       { headers: authHeader() }
//     );
//     return res.data;
//   },
//   getChat: async (chatId) => {
//     const res = await axios.get(
//       `http://localhost:5000/api/admin/chats/${chatId}`,
//       { headers: authHeader() }
//     );
//     return res.data;
//   },
//   sendMessage: async (chatId, message) => {
//     const res = await axios.post(
//       `http://localhost:5000/api/admin/chats/${chatId}/message`,
//       { message },
//       { headers: authHeader() }
//     );
//     return res.data;
//   },
//   markAsRead: async (chatId) => {
//     const res = await axios.put(
//       `http://localhost:5000/api/admin/chats/${chatId}/read`,
//       {},
//       { headers: authHeader() }
//     );
//     return res.data;
//   },
//   blockUser: async (chatId) => {
//     const res = await axios.put(
//       `http://localhost:5000/api/admin/chats/${chatId}/block`,
//       {},
//       { headers: authHeader() }
//     );
//     return res.data;
//   },
//   unblockUser: async (chatId) => {
//     const res = await axios.put(
//       `http://localhost:5000/api/admin/chats/${chatId}/unblock`,
//       {},
//       { headers: authHeader() }
//     );
//     return res.data;
//   },
// };

// // ─── Time helpers ─────────────────────────────────────────────────────────────
// const formatChatTime = (date) => {
//   if (!date) return "";
//   const now = new Date();
//   const d = new Date(date);
//   const diffMs = now - d;
//   const mins = Math.floor(diffMs / 60000);
//   const hours = Math.floor(diffMs / 3600000);
//   const days = Math.floor(diffMs / 86400000);
//   if (mins < 1) return "now";
//   if (mins < 60) return `${mins}m`;
//   if (hours < 24) return `${hours}h`;
//   if (days === 1) return "Yesterday";
//   return d.toLocaleDateString();
// };
// const formatMsgTime = (date) =>
//   new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

// // ─── Avatar ───────────────────────────────────────────────────────────────────
// const Avatar = ({ user, size = "md", className = "" }) => {
//   const s =
//     size === "sm" ? "w-7 h-7 text-[10px]"
//     : size === "lg" ? "w-12 h-12 text-base"
//     : "w-9 h-9 text-sm";
//   if (user?.profilePhoto) {
//     return (
//       <img
//         src={`http://localhost:5000/uploads/profiles/${user.profilePhoto}`}
//         alt={user.name}
//         className={`${s} rounded-full object-cover flex-shrink-0 ${className}`}
//       />
//     );
//   }
//   return (
//     <div className={`${s} rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0 ${className}`}>
//       {user?.name?.charAt(0)?.toUpperCase() || "?"}
//     </div>
//   );
// };

// // ─── Main Component ───────────────────────────────────────────────────────────
// const AdminMessages = () => {
//   const adminUser = JSON.parse(
//     localStorage.getItem("user") || sessionStorage.getItem("user") || "null"
//   );
//   const adminId = adminUser?._id || adminUser?.id;

//   // ── Socket context ──────────────────────────────────────────────────────
//   const {
//     isConnected,
//     joinChat,
//     leaveChat,
//     onNewMessage,
//     sendMessage: socketSend,
//     markRead: socketMarkRead,
//   } = useSocket();

//   // ── State ───────────────────────────────────────────────────────────────
//   const [chats, setChats] = useState([]);
//   const [filteredChats, setFilteredChats] = useState([]);
//   const [chatsLoading, setChatsLoading] = useState(false);
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [messagesLoading, setMessagesLoading] = useState(false);
//   const [newMessage, setNewMessage] = useState("");
//   const [sending, setSending] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeFilter, setActiveFilter] = useState("all");
//   const [showChatWindow, setShowChatWindow] = useState(false);
//   const [showBlockConfirm, setShowBlockConfirm] = useState(false);
//   const [showUnblockConfirm, setShowUnblockConfirm] = useState(false);
//   const [blockingUser, setBlockingUser] = useState(false);
//   const [totalUnread, setTotalUnread] = useState(0);

//   const messagesEndRef = useRef(null);
//   const inputRef = useRef(null);
//   // Stable ref so socket handlers always see the latest selectedChat
//   const selectedChatRef = useRef(null);
//   useEffect(() => { selectedChatRef.current = selectedChat; }, [selectedChat]);

//   // ── Fetch chat list ─────────────────────────────────────────────────────
//   const fetchChats = useCallback(async () => {
//     try {
//       setChatsLoading(true);
//       const res = await adminChatService.getAllChats(activeFilter, searchQuery);
//       if (res.success) {
//         setChats(res.data);
//         setFilteredChats(res.data);
//         // Sum unread counts from the enriched field the backend sends
//         const unread = res.data.reduce((acc, c) => acc + (c.unreadForAdmin || 0), 0);
//         setTotalUnread(unread);
//       }
//     } catch {
//       toast.error("Failed to load chats");
//     } finally {
//       setChatsLoading(false);
//     }
//   }, [activeFilter, searchQuery]);

//   // Initial load + poll every 60s as a fallback (real-time handles the rest)
//   useEffect(() => {
//     fetchChats();
//     const interval = setInterval(fetchChats, 60000);
//     return () => clearInterval(interval);
//   }, [fetchChats]);

//   // ── Global socket listener — updates chat list sidebar in real-time ─────
//   // Subscribed to "*" so ANY incoming message refreshes the sidebar preview
//   useEffect(() => {
//     const unsubscribe = onNewMessage("*", (data) => {
//       if (!data.message) return; // skip pure notifications with no message

//       // Update the sidebar preview for the affected chat
//       setChats((prev) =>
//         prev.map((c) => {
//           if (c._id !== data.chatId) return c;
//           const isCurrentlyOpen =
//             selectedChatRef.current?._id === data.chatId;
//           return {
//             ...c,
//             lastMessage: data.message.message,
//             lastMessageAt: data.message.createdAt,
//             // Only increment unread if this chat isn't currently open
//             unreadForAdmin: isCurrentlyOpen
//               ? 0
//               : (c.unreadForAdmin || 0) + 1,
//           };
//         })
//       );

//       // Recalculate total unread badge
//       setTotalUnread((prev) => {
//         const isCurrentlyOpen =
//           selectedChatRef.current?._id === data.chatId;
//         return isCurrentlyOpen ? prev : prev + 1;
//       });
//     });
//     return unsubscribe;
//   }, [onNewMessage]);

//   // ── Per-chat socket listener — appends messages in real-time ───────────
//   // Subscribes specifically to the open chat's ID
//   useEffect(() => {
//     if (!selectedChat?._id) return;
//     const chatId = selectedChat._id;

//     const unsubscribe = onNewMessage(chatId, (data) => {
//       if (!data.message) return;
//       setMessages((prev) => {
//         // Deduplicate — server may confirm a message we already added optimistically
//         if (prev.some((m) => m._id === data.message._id)) return prev;
//         // Replace optimistic temp message if same text + senderType + close timestamp
//         const tempIdx = prev.findIndex(
//           (m) =>
//             m._id?.toString().startsWith("temp-") &&
//             m.message === data.message.message &&
//             m.senderType === data.message.senderType
//         );
//         if (tempIdx !== -1) {
//           const next = [...prev];
//           next[tempIdx] = data.message;
//           return next;
//         }
//         return [...prev, data.message];
//       });
//       setTimeout(
//         () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
//         80
//       );
//       // Mark as read since we're actively viewing this chat
//       adminChatService.markAsRead(chatId).catch(() => {});
//       socketMarkRead(chatId);
//     });

//     return unsubscribe;
//   }, [selectedChat?._id, onNewMessage, socketMarkRead]);

//   // ── Auto-scroll ─────────────────────────────────────────────────────────
//   useEffect(() => {
//     if (messagesEndRef.current)
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // ── Local search filter ─────────────────────────────────────────────────
//   useEffect(() => {
//     if (!searchQuery.trim()) {
//       setFilteredChats(chats);
//       return;
//     }
//     const q = searchQuery.toLowerCase();
//     setFilteredChats(
//       chats.filter((c) => {
//         const name = (c.otherParticipant?.name || "").toLowerCase();
//         const vehicle = (c.vehicleName || "").toLowerCase();
//         const last = (c.lastMessage || "").toLowerCase();
//         return name.includes(q) || vehicle.includes(q) || last.includes(q);
//       })
//     );
//   }, [searchQuery, chats]);

//   // ── Open chat ───────────────────────────────────────────────────────────
//   const openChat = async (chat) => {
//     // Leave previous room
//     if (selectedChatRef.current?._id) {
//       leaveChat(selectedChatRef.current._id);
//     }

//     setSelectedChat(chat);
//     setShowChatWindow(true);
//     setMessages([]);

//     // Join the socket room for this chat so we receive new_message events
//     joinChat(chat._id);

//     if (!chat.isBlocked) {
//       try {
//         setMessagesLoading(true);
//         const res = await adminChatService.getChat(chat._id);
//         if (res.success) {
//           setMessages(res.data.messages || []);
//           // Mark read in DB + via socket
//           await adminChatService.markAsRead(chat._id);
//           socketMarkRead(chat._id);
//           // Clear unread badge for this chat in sidebar
//           setChats((prev) =>
//             prev.map((c) =>
//               c._id !== chat._id ? c : { ...c, unreadForAdmin: 0 }
//             )
//           );
//           setTotalUnread((prev) => Math.max(0, prev - (chat.unreadForAdmin || 0)));
//         }
//       } catch {
//         toast.error("Failed to load messages");
//       } finally {
//         setMessagesLoading(false);
//       }
//     }

//     setTimeout(() => inputRef.current?.focus(), 200);
//   };

//   // ── Close chat ──────────────────────────────────────────────────────────
//   const closeChat = () => {
//     if (selectedChatRef.current?._id) leaveChat(selectedChatRef.current._id);
//     setShowChatWindow(false);
//     setSelectedChat(null);
//     setMessages([]);
//     setNewMessage("");
//   };

//   // ── Send message ────────────────────────────────────────────────────────
// //   const sendMessage = async () => {
// //     if (!newMessage.trim() || sending || selectedChat?.isBlocked) return;
// //     const text = newMessage.trim();
// //     setSending(true);

// //     // Optimistic UI — add message immediately
// //     const tempId = `temp-${Date.now()}`;
// //     const tempMsg = {
// //       _id: tempId,
// //       message: text,
// //       senderType: "admin",
// //       read: false,
// //       createdAt: new Date(),
// //       sender: adminUser,
// //     };
// //     setMessages((prev) => [...prev, tempMsg]);
// //     setNewMessage("");
// //     setTimeout(
// //       () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
// //       80
// //     );

// //     try {
// //       // Send via HTTP — the server will emit new_message via socket to all participants
// //       const res = await adminChatService.sendMessage(selectedChat._id, text);
// //       if (res.success) {
// //         // Replace temp with confirmed message from server
// //         setMessages((prev) =>
// //           prev.map((m) => (m._id === tempId ? res.data : m))
// //         );
// //         // Also emit via socket directly (belt-and-suspenders in case server didn't emit)
// //         socketSend(selectedChat._id, text);
// //         // Refresh sidebar preview
// //         setChats((prev) =>
// //           prev.map((c) =>
// //             c._id !== selectedChat._id
// //               ? c
// //               : { ...c, lastMessage: text, lastMessageAt: new Date() }
// //           )
// //         );
// //       }
// //     } catch {
// //       toast.error("Failed to send message");
// //       setMessages((prev) => prev.filter((m) => m._id !== tempId));
// //       setNewMessage(text); // Restore message on failure
// //     } finally {
// //       setSending(false);
// //     }
// //   };

// const sendMessage = async () => {
//   if (!newMessage.trim() || sending || selectedChat?.isBlocked) return;
//   const text = newMessage.trim();
//   setSending(true);

//   // Create temporary message for immediate display
//   const tempMsg = {
//     _id: `temp-${Date.now()}`,
//     message: text,
//     senderType: "admin",
//     read: false,
//     delivered: false,
//     createdAt: new Date(),
//     sender: adminUser,
//   };
//   setMessages((prev) => [...prev, tempMsg]);
//   setNewMessage("");

//   setTimeout(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, 100);

//   try {
//     // Send via API only - socket will be triggered by backend
//     const res = await adminChatService.sendMessage(selectedChat._id, text);
//     if (res.success) {
//       // Replace temp message with real one
//       setMessages((prev) =>
//         prev.map((m) => (m._id === tempMsg._id ? res.data : m))
//       );
//       fetchChats();
//       fetchUnreadCount();
//     } else {
//       // Remove temp message on error
//       setMessages((prev) => prev.filter((m) => m._id !== tempMsg._id));
//       toast.error("Failed to send message");
//     }
//   } catch (error) {
//     console.error("Error sending message:", error);
//     setMessages((prev) => prev.filter((m) => m._id !== tempMsg._id));
//     toast.error("Failed to send message");
//   } finally {
//     setSending(false);
//   }
// };

//   // ── Block / unblock ─────────────────────────────────────────────────────
//   const handleBlock = async () => {
//     setBlockingUser(true);
//     try {
//       const res = await adminChatService.blockUser(selectedChat._id);
//       if (res.success) {
//         toast.success(`${selectedChat.otherParticipant?.name} has been blocked`);
//         setSelectedChat((p) => ({ ...p, isBlocked: true, blockedBy: adminId }));
//         setMessages([]);
//         fetchChats();
//       }
//     } catch {
//       toast.error("Failed to block user");
//     } finally {
//       setBlockingUser(false);
//       setShowBlockConfirm(false);
//     }
//   };

//   const handleUnblock = async () => {
//     setBlockingUser(true);
//     try {
//       const res = await adminChatService.unblockUser(selectedChat._id);
//       if (res.success) {
//         toast.success(`${selectedChat.otherParticipant?.name} has been unblocked`);
//         setSelectedChat((p) => ({ ...p, isBlocked: false, blockedBy: null }));
//         const msgRes = await adminChatService.getChat(selectedChat._id);
//         if (msgRes.success) setMessages(msgRes.data.messages || []);
//         fetchChats();
//       }
//     } catch {
//       toast.error("Failed to unblock user");
//     } finally {
//       setBlockingUser(false);
//       setShowUnblockConfirm(false);
//     }
//   };

//   // ── Derived state ───────────────────────────────────────────────────────
//   const getUnread = (chat) => chat.unreadForAdmin || 0;
//   const iBlockedThem =
//     selectedChat?.isBlocked && selectedChat?.blockedBy === adminId;

//   const filterTabs = [
//     { id: "all", label: "All", count: chats.length },
//     { id: "vehicle", label: "Vehicle Chats", count: chats.filter((c) => c.chatType === "vehicle").length },
//     { id: "support", label: "Support", count: chats.filter((c) => c.chatType === "support").length },
//     { id: "unread", label: "Unread", count: chats.filter((c) => getUnread(c) > 0).length },
//   ];

//   // ── Group messages by date ──────────────────────────────────────────────
//   const groupedMessages = (() => {
//     const groups = [];
//     let lastDate = null;
//     messages.forEach((msg, i) => {
//       const day = new Date(msg.createdAt).toDateString();
//       if (day !== lastDate) {
//         const today = new Date().toDateString();
//         const yesterday = new Date(Date.now() - 86400000).toDateString();
//         groups.push({
//           type: "date",
//           label: day === today ? "Today" : day === yesterday ? "Yesterday" : day,
//           key: `date-${i}`,
//         });
//         lastDate = day;
//       }
//       groups.push({ type: "msg", msg, key: msg._id || i });
//     });
//     return groups;
//   })();

//   // ── Render ──────────────────────────────────────────────────────────────
//   return (
//     <>
//       <ToastContainer position="top-right" autoClose={3000} />

//       <div className="flex flex-col bg-gradient-to-br from-gray-50 to-gray-100" style={{ height: "100vh" }}>
//         {/* Header */}
//         <div className="px-8 py-5 bg-white/80 backdrop-blur-md shadow-sm flex-shrink-0">
//           <div className="flex justify-between items-center">
//             <div>
//               <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent flex items-center gap-2">
//                 <FaComments className="text-blue-600" />
//                 Messages
//                 {totalUnread > 0 && (
//                   <span className="ml-1 px-2 py-0.5 bg-blue-600 text-white text-xs font-bold rounded-full">
//                     {totalUnread > 99 ? "99+" : totalUnread}
//                   </span>
//                 )}
//               </h1>
//               <p className="text-sm text-gray-500 mt-1">
//                 Manage all user conversations and vehicle inquiries
//                 {isConnected ? (
//                   <span className="ml-2 inline-flex items-center gap-1 text-green-500 text-xs">
//                     <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
//                     Live
//                   </span>
//                 ) : (
//                   <span className="ml-2 inline-flex items-center gap-1 text-amber-500 text-xs">
//                     <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
//                     Reconnecting…
//                   </span>
//                 )}
//               </p>
//             </div>
//             <button
//               onClick={fetchChats}
//               className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition shadow-sm"
//             >
//               <FaSync className={chatsLoading ? "animate-spin text-blue-500" : "text-gray-400"} size={13} />
//               Refresh
//             </button>
//           </div>
//         </div>

//         {/* Chat panel */}
//         <div className="flex flex-1 min-h-0 m-6 rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-white">

//           {/* ════ LEFT: Chat list ════ */}
//           <div className={`${showChatWindow ? "hidden lg:flex" : "flex"} flex-col w-full lg:w-[340px] border-r border-gray-100 flex-shrink-0`}>
//             <div className="p-4 border-b border-gray-100 space-y-3">
//               <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
//                 <FaSearch size={12} className="text-gray-400 flex-shrink-0" />
//                 <input
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Search conversations, users…"
//                   className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
//                 />
//                 {searchQuery && (
//                   <button onClick={() => setSearchQuery("")} className="text-gray-400 hover:text-gray-600">
//                     <FaTimes size={11} />
//                   </button>
//                 )}
//               </div>
//               <div className="flex gap-1 overflow-x-auto">
//                 {filterTabs.map((tab) => (
//                   <button
//                     key={tab.id}
//                     onClick={() => setActiveFilter(tab.id)}
//                     className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
//                       activeFilter === tab.id
//                         ? "bg-blue-600 text-white shadow-sm"
//                         : "bg-gray-100 text-gray-500 hover:bg-gray-200"
//                     }`}
//                   >
//                     {tab.label}
//                     {tab.count > 0 && (
//                       <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
//                         activeFilter === tab.id ? "bg-white/20 text-white" : "bg-gray-300 text-gray-600"
//                       }`}>
//                         {tab.count}
//                       </span>
//                     )}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="flex-1 overflow-y-auto">
//               {chatsLoading && chats.length === 0 ? (
//                 <div className="flex items-center justify-center h-32">
//                   <FaSpinner className="animate-spin text-blue-400 text-xl" />
//                 </div>
//               ) : filteredChats.length === 0 ? (
//                 <div className="flex flex-col items-center justify-center h-full py-12 text-center px-6">
//                   <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-3">
//                     <FaInbox className="text-blue-300 text-2xl" />
//                   </div>
//                   <p className="text-sm font-semibold text-gray-600">
//                     {searchQuery ? "No results found" : "No conversations yet"}
//                   </p>
//                   <p className="text-xs text-gray-400 mt-1">
//                     {searchQuery ? "Try a different search term" : "User conversations will appear here"}
//                   </p>
//                 </div>
//               ) : (
//                 filteredChats.map((chat) => {
//                   const unread = getUnread(chat);
//                   const isSelected = selectedChat?._id === chat._id && showChatWindow;
//                   const isBlocked = chat.isBlocked;
//                   const isVehicle = chat.chatType === "vehicle";
//                   return (
//                     <div
//                       key={chat._id}
//                       onClick={() => openChat(chat)}
//                       className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer transition-all border-b border-gray-50 ${
//                         isSelected
//                           ? "bg-blue-50 border-l-[3px] border-l-blue-500"
//                           : "hover:bg-gray-50 border-l-[3px] border-l-transparent"
//                       } ${isBlocked ? "opacity-60" : ""}`}
//                     >
//                       <div className="relative flex-shrink-0">
//                         <Avatar user={chat.otherParticipant} size="md" />
//                         {isBlocked && (
//                           <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center shadow-sm">
//                             <FaBan size={7} />
//                           </span>
//                         )}
//                         {unread > 0 && !isBlocked && (
//                           <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-blue-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
//                             {unread > 9 ? "9+" : unread}
//                           </span>
//                         )}
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-baseline justify-between gap-1 mb-0.5">
//                           <span className={`text-sm font-semibold truncate ${unread > 0 ? "text-gray-900" : "text-gray-700"}`}>
//                             {chat.otherParticipant?.name || "Unknown User"}
//                           </span>
//                           <span className="text-[10px] text-gray-400 flex-shrink-0">
//                             {formatChatTime(chat.lastMessageAt || chat.updatedAt)}
//                           </span>
//                         </div>
//                         <p className={`text-xs truncate ${unread > 0 && !isBlocked ? "text-gray-700 font-medium" : "text-gray-400"}`}>
//                           {isBlocked ? "Conversation blocked" : chat.lastMessage || "No messages yet"}
//                         </p>
//                         <div className="flex items-center gap-1.5 mt-1">
//                           {isVehicle ? (
//                             <span className="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded-full font-semibold bg-blue-50 text-blue-600 uppercase tracking-wide">
//                               <FaCar size={7} /> Vehicle
//                             </span>
//                           ) : (
//                             <span className="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded-full font-semibold bg-purple-50 text-purple-600 uppercase tracking-wide">
//                               <FaShieldAlt size={7} /> Support
//                             </span>
//                           )}
//                           {chat.vehicleName && (
//                             <span className="text-[10px] text-gray-400 truncate">· {chat.vehicleName}</span>
//                           )}
//                           {isBlocked && (
//                             <span className="text-[9px] text-red-500 font-bold uppercase">Blocked</span>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })
//               )}
//             </div>

//             <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
//               <span className="text-xs text-gray-500">
//                 {chats.length} conversation{chats.length !== 1 ? "s" : ""}
//               </span>
//               {totalUnread > 0 && (
//                 <span className="text-xs font-semibold text-blue-600">{totalUnread} unread</span>
//               )}
//             </div>
//           </div>

//           {/* ════ RIGHT: Chat window ════ */}
//           {showChatWindow && selectedChat ? (
//             <div className="flex-1 flex flex-col min-w-0">
//               {/* Header */}
//               <div className="px-5 py-3.5 bg-white border-b border-gray-100 flex items-center justify-between flex-shrink-0 shadow-sm">
//                 <div className="flex items-center gap-3">
//                   <button onClick={closeChat} className="lg:hidden w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition">
//                     <FaArrowLeft size={14} />
//                   </button>
//                   <Avatar user={selectedChat.otherParticipant} size="md" />
//                   <div>
//                     <div className="flex items-center gap-2">
//                       <p className="text-sm font-bold text-gray-900">
//                         {selectedChat.otherParticipant?.name || "Unknown User"}
//                       </p>
//                       {selectedChat.isBlocked && (
//                         <span className="inline-flex items-center gap-1 text-[10px] bg-red-50 text-red-500 border border-red-200 px-1.5 py-0.5 rounded-full font-semibold">
//                           <FaBan size={8} /> Blocked
//                         </span>
//                       )}
//                     </div>
//                     <div className="flex items-center gap-1.5 mt-0.5">
//                       <p className="text-xs text-gray-400">{selectedChat.otherParticipant?.email}</p>
//                       {selectedChat.vehicleName && (
//                         <>
//                           <span className="text-gray-300">·</span>
//                           <span className="text-xs text-blue-500 flex items-center gap-1">
//                             <FaCar size={9} /> {selectedChat.vehicleName}
//                           </span>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   {!selectedChat.isBlocked ? (
//                     <button
//                       onClick={() => setShowBlockConfirm(true)}
//                       className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-500 hover:bg-red-50 border border-red-100 transition"
//                     >
//                       <FaBan size={11} /> Block
//                     </button>
//                   ) : iBlockedThem ? (
//                     <button
//                       onClick={() => setShowUnblockConfirm(true)}
//                       className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-600 hover:bg-emerald-50 border border-emerald-200 transition"
//                     >
//                       <FaUnlock size={11} /> Unblock
//                     </button>
//                   ) : null}
//                 </div>
//               </div>

//               {/* Vehicle banner */}
//               {selectedChat.vehicleId && (
//                 <div className="px-5 py-2.5 bg-blue-50 border-b border-blue-100 flex items-center gap-3">
//                   <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
//                     <FaCar size={12} className="text-blue-600" />
//                   </div>
//                   <span className="text-xs font-semibold text-blue-800">
//                     {selectedChat.vehicleName || "Vehicle Inquiry"}
//                   </span>
//                 </div>
//               )}

//               {/* Block banner */}
//               {selectedChat.isBlocked && (
//                 <div className={`flex items-center justify-between px-5 py-3 border-b ${iBlockedThem ? "bg-red-50 border-red-100" : "bg-amber-50 border-amber-100"}`}>
//                   <div className="flex items-center gap-3">
//                     <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${iBlockedThem ? "bg-red-100" : "bg-amber-100"}`}>
//                       <FaBan size={13} className={iBlockedThem ? "text-red-500" : "text-amber-500"} />
//                     </div>
//                     <div>
//                       <p className={`text-xs font-bold ${iBlockedThem ? "text-red-700" : "text-amber-700"}`}>
//                         {iBlockedThem ? `You blocked ${selectedChat.otherParticipant?.name}` : "This user has restricted messaging"}
//                       </p>
//                       <p className={`text-[11px] mt-0.5 ${iBlockedThem ? "text-red-500" : "text-amber-500"}`}>
//                         {iBlockedThem ? "They cannot message you. Unblock to restore the conversation." : "You cannot send messages in this conversation."}
//                       </p>
//                     </div>
//                   </div>
//                   {iBlockedThem && (
//                     <button
//                       onClick={() => setShowUnblockConfirm(true)}
//                       className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition ml-3 whitespace-nowrap"
//                     >
//                       <FaUnlock size={10} /> Unblock
//                     </button>
//                   )}
//                 </div>
//               )}

//               {/* Messages area */}
//               <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1 bg-gray-50">
//                 {messagesLoading ? (
//                   <div className="flex items-center justify-center h-full">
//                     <FaSpinner className="animate-spin text-blue-400 text-2xl" />
//                   </div>
//                 ) : selectedChat.isBlocked && messages.length === 0 ? (
//                   <div className="flex flex-col items-center justify-center h-full text-center px-8">
//                     <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${iBlockedThem ? "bg-red-50" : "bg-amber-50"}`}>
//                       <FaLock size={28} className={iBlockedThem ? "text-red-300" : "text-amber-300"} />
//                     </div>
//                     <p className="text-sm font-bold text-gray-600">
//                       {iBlockedThem ? "Conversation blocked" : "Messaging unavailable"}
//                     </p>
//                     <p className="text-xs text-gray-400 mt-2 leading-relaxed max-w-xs">
//                       {iBlockedThem
//                         ? `You have blocked ${selectedChat.otherParticipant?.name}. Unblock to restore the conversation.`
//                         : "This user has restricted messaging."}
//                     </p>
//                     {iBlockedThem && (
//                       <button
//                         onClick={() => setShowUnblockConfirm(true)}
//                         className="mt-5 flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition"
//                       >
//                         <FaUnlock size={12} /> Unblock {selectedChat.otherParticipant?.name}
//                       </button>
//                     )}
//                   </div>
//                 ) : messages.length === 0 ? (
//                   <div className="flex flex-col items-center justify-center h-full text-center">
//                     <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-3">
//                       <FaCommentDots className="text-blue-300 text-2xl" />
//                     </div>
//                     <p className="text-sm font-semibold text-gray-500">No messages yet</p>
//                     <p className="text-xs text-gray-400 mt-1">Start the conversation with this user</p>
//                   </div>
//                 ) : (
//                   groupedMessages.map((item) => {
//                     if (item.type === "date") {
//                       return (
//                         <div key={item.key} className="flex items-center gap-3 py-2">
//                           <div className="flex-1 h-px bg-gray-200" />
//                           <span className="text-[10px] text-gray-400 font-medium px-2.5 py-1 bg-white border border-gray-200 rounded-full whitespace-nowrap shadow-sm">
//                             {item.label}
//                           </span>
//                           <div className="flex-1 h-px bg-gray-200" />
//                         </div>
//                       );
//                     }
//                     const { msg } = item;
//                     const isOwn = msg.senderType === "admin" || msg.sender?._id === adminId;
//                     return (
//                       <div key={item.key} className={`flex items-end gap-2 ${isOwn ? "justify-end" : "justify-start"}`}>
//                         {!isOwn && (
//                           <div className="flex-shrink-0 mb-1">
//                             <Avatar user={selectedChat.otherParticipant} size="sm" />
//                           </div>
//                         )}
//                         <div className={`flex flex-col ${isOwn ? "items-end" : "items-start"} max-w-[65%]`}>
//                           <div className={`px-4 py-2.5 text-sm leading-relaxed break-words ${
//                             isOwn
//                               ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl rounded-br-sm shadow-sm"
//                               : "bg-white text-gray-800 rounded-2xl rounded-bl-sm border border-gray-100 shadow-sm"
//                           }`}>
//                             {msg.message}
//                           </div>
//                           <div className={`flex items-center gap-1 mt-1 px-1 ${isOwn ? "flex-row-reverse" : ""}`}>
//                             <span className="text-[10px] text-gray-400">
//                               {formatMsgTime(msg.createdAt)}
//                             </span>
//                             {isOwn && (
//                               <FaCheckDouble size={9} className={msg.read ? "text-blue-400" : "text-gray-300"} />
//                             )}
//                           </div>
//                         </div>
//                         {isOwn && (
//                           <div className="flex-shrink-0 mb-1">
//                             <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-[10px] font-bold">
//                               {(adminUser?.name || "A").charAt(0).toUpperCase()}
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     );
//                   })
//                 )}
//                 <div ref={messagesEndRef} />
//               </div>

//               {/* Input */}
//               <div className="px-4 py-3 bg-white border-t border-gray-100 flex-shrink-0">
//                 {!isConnected && (
//                   <p className="text-[11px] text-center text-amber-500 mb-2">
//                     Reconnecting to chat server…
//                   </p>
//                 )}
//                 {selectedChat.isBlocked ? (
//                   <div className={`flex items-center gap-3 rounded-2xl px-4 py-3 ${iBlockedThem ? "bg-red-50 border border-red-100" : "bg-amber-50 border border-amber-100"}`}>
//                     <FaLock size={14} className={iBlockedThem ? "text-red-400" : "text-amber-400"} />
//                     <p className={`text-xs flex-1 ${iBlockedThem ? "text-red-500" : "text-amber-600"}`}>
//                       {iBlockedThem ? (
//                         <>
//                           You blocked this user.{" "}
//                           <button onClick={() => setShowUnblockConfirm(true)} className="underline font-semibold hover:no-underline">
//                             Unblock to chat
//                           </button>
//                         </>
//                       ) : (
//                         "You cannot send messages in this conversation."
//                       )}
//                     </p>
//                   </div>
//                 ) : (
//                   <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-3 py-2">
//                     <button className="text-gray-400 hover:text-blue-500 transition flex-shrink-0">
//                       <FaSmile size={18} />
//                     </button>
//                     <input
//                       ref={inputRef}
//                       type="text"
//                       value={newMessage}
//                       onChange={(e) => setNewMessage(e.target.value)}
//                       onKeyPress={(e) => e.key === "Enter" && sendMessage()}
//                       placeholder="Type a reply…"
//                       className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
//                     />
//                     <button
//                       onClick={sendMessage}
//                       disabled={!newMessage.trim() || sending}
//                       className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-md transition"
//                     >
//                       {sending ? <FaSpinner className="animate-spin" size={13} /> : <FaPaperPlane size={13} />}
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ) : (
//             <div className="flex-1 hidden lg:flex flex-col items-center justify-center bg-gray-50 text-center px-8">
//               <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center mb-5 shadow-inner">
//                 <FaComments className="text-blue-300 text-4xl" />
//               </div>
//               <p className="text-lg font-bold text-gray-600">Select a conversation</p>
//               <p className="text-sm text-gray-400 mt-2 max-w-xs">
//                 Choose a chat from the left panel to start replying to users
//               </p>
//               {totalUnread > 0 && (
//                 <div className="mt-4 px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl">
//                   <p className="text-sm font-semibold text-blue-600">
//                     {totalUnread} unread message{totalUnread !== 1 ? "s" : ""} waiting
//                   </p>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Block Modal */}
//       {showBlockConfirm && selectedChat && (
//         <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.55)" }}>
//           <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
//             <div className="bg-gradient-to-r from-red-500 to-rose-600 px-6 pt-6 pb-10">
//               <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
//                 <FaBan size={26} className="text-white" />
//               </div>
//               <h3 className="text-white text-center text-lg font-bold">Block User?</h3>
//               <p className="text-red-100 text-center text-xs mt-1">You can unblock them anytime</p>
//             </div>
//             <div className="-mt-4 bg-white rounded-t-2xl px-6 pt-5 pb-6">
//               <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
//                 <Avatar user={selectedChat.otherParticipant} size="md" />
//                 <div>
//                   <p className="font-semibold text-gray-800 text-sm">{selectedChat.otherParticipant?.name}</p>
//                   <p className="text-xs text-gray-500">Will be blocked from messaging</p>
//                 </div>
//               </div>
//               <ul className="space-y-2 mb-5">
//                 {["They won't be able to message you", "Their messages will be hidden", "You can unblock them anytime"].map((t, i) => (
//                   <li key={i} className="flex items-center gap-2 text-xs text-gray-600">
//                     <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
//                       <FaTimes size={7} className="text-red-500" />
//                     </span>
//                     {t}
//                   </li>
//                 ))}
//               </ul>
//               <div className="flex gap-2">
//                 <button onClick={() => setShowBlockConfirm(false)} className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition font-medium">Cancel</button>
//                 <button onClick={handleBlock} disabled={blockingUser} className="flex-1 px-4 py-2.5 text-sm bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl font-semibold transition flex items-center justify-center gap-2 disabled:opacity-60">
//                   {blockingUser ? <FaSpinner className="animate-spin" size={13} /> : <FaBan size={12} />}
//                   {blockingUser ? "Blocking…" : "Block User"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Unblock Modal */}
//       {showUnblockConfirm && selectedChat && (
//         <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.55)" }}>
//           <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
//             <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 pt-6 pb-10">
//               <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
//                 <FaUnlock size={24} className="text-white" />
//               </div>
//               <h3 className="text-white text-center text-lg font-bold">Unblock User?</h3>
//               <p className="text-emerald-100 text-center text-xs mt-1">Resume your conversation</p>
//             </div>
//             <div className="-mt-4 bg-white rounded-t-2xl px-6 pt-5 pb-6">
//               <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
//                 <Avatar user={selectedChat.otherParticipant} size="md" />
//                 <div>
//                   <p className="font-semibold text-gray-800 text-sm">{selectedChat.otherParticipant?.name}</p>
//                   <p className="text-xs text-gray-500">Will be unblocked</p>
//                 </div>
//               </div>
//               <ul className="space-y-2 mb-5">
//                 {["They can message you again", "Previous messages will be restored", "You can block them again anytime"].map((t, i) => (
//                   <li key={i} className="flex items-center gap-2 text-xs text-gray-600">
//                     <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
//                       <FaCheck size={7} className="text-emerald-600" />
//                     </span>
//                     {t}
//                   </li>
//                 ))}
//               </ul>
//               <div className="flex gap-2">
//                 <button onClick={() => setShowUnblockConfirm(false)} className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition font-medium">Cancel</button>
//                 <button onClick={handleUnblock} disabled={blockingUser} className="flex-1 px-4 py-2.5 text-sm bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold transition flex items-center justify-center gap-2 disabled:opacity-60">
//                   {blockingUser ? <FaSpinner className="animate-spin" size={13} /> : <FaUnlock size={12} />}
//                   {blockingUser ? "Unblocking…" : "Unblock User"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AdminMessages;

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  FaComments,
  FaCommentDots,
  FaSearch,
  FaTimes,
  FaSync,
  FaPaperPlane,
  FaSmile,
  FaSpinner,
  FaBan,
  FaUnlock,
  FaCheck,
  FaCheckDouble,
  FaLock,
  FaArrowLeft,
  FaCar,
  FaShieldAlt,
  FaInbox,
} from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSocket } from "../context/SocketContext";

// ─── Token helper ─────────────────────────────────────────────────────────────
const getToken = () =>
  localStorage.getItem("token") || sessionStorage.getItem("token");
const authHeader = () => ({ Authorization: `Bearer ${getToken()}` });

// ─── API service ──────────────────────────────────────────────────────────────
const adminChatService = {
  getAllChats: async (filter = "all", search = "") => {
    const res = await axios.get(
      `http://localhost:5000/api/admin/chats?filter=${filter}&search=${encodeURIComponent(search)}`,
      { headers: authHeader() },
    );
    return res.data;
  },
  getChat: async (chatId) => {
    const res = await axios.get(
      `http://localhost:5000/api/admin/chats/${chatId}`,
      { headers: authHeader() },
    );
    return res.data;
  },
  sendMessage: async (chatId, message) => {
    const res = await axios.post(
      `http://localhost:5000/api/admin/chats/${chatId}/message`,
      { message },
      { headers: authHeader() },
    );
    return res.data;
  },
  markAsRead: async (chatId) => {
    const res = await axios.put(
      `http://localhost:5000/api/admin/chats/${chatId}/read`,
      {},
      { headers: authHeader() },
    );
    return res.data;
  },
  blockUser: async (chatId) => {
    const res = await axios.put(
      `http://localhost:5000/api/admin/chats/${chatId}/block`,
      {},
      { headers: authHeader() },
    );
    return res.data;
  },
  unblockUser: async (chatId) => {
    const res = await axios.put(
      `http://localhost:5000/api/admin/chats/${chatId}/unblock`,
      {},
      { headers: authHeader() },
    );
    return res.data;
  },
  getUnreadCount: async () => {
    const res = await axios.get(
      `http://localhost:5000/api/admin/chats/unread/count`,
      { headers: authHeader() },
    );
    return res.data;
  },
};

// ─── Time helpers ─────────────────────────────────────────────────────────────
const formatChatTime = (date) => {
  if (!date) return "";
  const now = new Date();
  const d = new Date(date);
  const diffMs = now - d;
  const mins = Math.floor(diffMs / 60000);
  const hours = Math.floor(diffMs / 3600000);
  const days = Math.floor(diffMs / 86400000);
  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m`;
  if (hours < 24) return `${hours}h`;
  if (days === 1) return "Yesterday";
  return d.toLocaleDateString();
};

const formatMsgTime = (date) =>
  new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

// ─── Avatar ───────────────────────────────────────────────────────────────────
const Avatar = ({ user, size = "md", className = "" }) => {
  const s =
    size === "sm"
      ? "w-7 h-7 text-[10px]"
      : size === "lg"
        ? "w-12 h-12 text-base"
        : "w-9 h-9 text-sm";
  if (user?.profilePhoto) {
    return (
      <img
        src={`http://localhost:5000/uploads/profiles/${user.profilePhoto}`}
        alt={user.name}
        className={`${s} rounded-full object-cover flex-shrink-0 ${className}`}
      />
    );
  }
  return (
    <div
      className={`${s} rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0 ${className}`}
    >
      {user?.name?.charAt(0)?.toUpperCase() || "?"}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const AdminMessages = () => {
  const adminUser = JSON.parse(
    localStorage.getItem("user") || sessionStorage.getItem("user") || "null",
  );
  const adminId = adminUser?._id || adminUser?.id;

  // ── Socket context ──────────────────────────────────────────────────────
  const {
    isConnected,
    joinChat,
    leaveChat,
    onNewMessage,
    markRead: socketMarkRead,
  } = useSocket();

  // ── State ───────────────────────────────────────────────────────────────
  const [chats, setChats] = useState([]);
  const [filteredChats, setFilteredChats] = useState([]);
  const [chatsLoading, setChatsLoading] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [showChatWindow, setShowChatWindow] = useState(false);
  const [showBlockConfirm, setShowBlockConfirm] = useState(false);
  const [showUnblockConfirm, setShowUnblockConfirm] = useState(false);
  const [blockingUser, setBlockingUser] = useState(false);
  const [totalUnread, setTotalUnread] = useState(0);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const selectedChatRef = useRef(null);
  const initialLoadDone = useRef(false);

  useEffect(() => {
    selectedChatRef.current = selectedChat;
  }, [selectedChat]);

  // ── Fetch unread count ─────────────────────────────────────────────────
  const fetchUnreadCount = useCallback(async () => {
    try {
      const res = await adminChatService.getUnreadCount();
      if (res.success) {
        setTotalUnread(res.count);
      }
    } catch (error) {
      console.error("Error fetching unread count:", error);
    }
  }, []);

  // ── Fetch chat list ─────────────────────────────────────────────────────
  const fetchChats = useCallback(async () => {
    try {
      setChatsLoading(true);
      const res = await adminChatService.getAllChats(activeFilter, searchQuery);
      if (res.success) {
        setChats(res.data);
        setFilteredChats(res.data);
        const unread = res.data.reduce(
          (acc, c) => acc + (c.unreadForAdmin || 0),
          0,
        );
        setTotalUnread(unread);
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
      toast.error("Failed to load chats");
    } finally {
      setChatsLoading(false);
    }
  }, [activeFilter, searchQuery]);

  // ── INITIAL LOAD ONLY (NO POLLING) ──────────────────────────────────────
  useEffect(() => {
    if (!initialLoadDone.current) {
      initialLoadDone.current = true;
      fetchChats();
      fetchUnreadCount();
    }
  }, [fetchChats, fetchUnreadCount]);

  // ── Refresh only when filter or search changes ──────────────────────────
  useEffect(() => {
    if (initialLoadDone.current) {
      fetchChats();
      fetchUnreadCount();
    }
  }, [activeFilter, searchQuery, fetchChats, fetchUnreadCount]);

  // ── GLOBAL SOCKET LISTENER ── Updates sidebar in REAL-TIME ──────────────
  useEffect(() => {
    const unsubscribe = onNewMessage("*", (data) => {
      if (!data.message) return;

      // Update the sidebar preview for the affected chat INSTANTLY
      setChats((prev) =>
        prev.map((c) => {
          if (c._id !== data.chatId) return c;
          const isCurrentlyOpen = selectedChatRef.current?._id === data.chatId;
          return {
            ...c,
            lastMessage: data.message.message,
            lastMessageAt: data.message.createdAt,
            unreadForAdmin: isCurrentlyOpen ? 0 : (c.unreadForAdmin || 0) + 1,
          };
        }),
      );

      // Update total unread badge INSTANTLY
      setTotalUnread((prev) => {
        const isCurrentlyOpen = selectedChatRef.current?._id === data.chatId;
        return isCurrentlyOpen ? prev : prev + 1;
      });
    });
    return unsubscribe;
  }, [onNewMessage]);

  // ── PER-CHAT SOCKET LISTENER ── Appends messages in REAL-TIME ───────────
  useEffect(() => {
    if (!selectedChat?._id) return;
    const chatId = selectedChat._id;

    const unsubscribe = onNewMessage(chatId, (data) => {
      if (!data.message) return;

      setMessages((prev) => {
        // Prevent duplicates
        if (prev.some((m) => m._id === data.message._id)) return prev;

        // Replace optimistic temp message
        const tempIdx = prev.findIndex(
          (m) =>
            m._id?.toString().startsWith("temp-") &&
            m.message === data.message.message &&
            m.senderType === data.message.senderType,
        );
        if (tempIdx !== -1) {
          const next = [...prev];
          next[tempIdx] = data.message;
          return next;
        }
        return [...prev, data.message];
      });

      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 80);

      // Mark as read since we're actively viewing this chat
      adminChatService.markAsRead(chatId).catch(() => {});
      socketMarkRead(chatId);
    });

    return unsubscribe;
  }, [selectedChat?._id, onNewMessage, socketMarkRead]);

  // ── Auto-scroll on new messages ─────────────────────────────────────────
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // ── Local search filter ─────────────────────────────────────────────────
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredChats(chats);
      return;
    }
    const q = searchQuery.toLowerCase();
    setFilteredChats(
      chats.filter((c) => {
        const name = (c.otherParticipant?.name || "").toLowerCase();
        const vehicle = (c.vehicleName || "").toLowerCase();
        const last = (c.lastMessage || "").toLowerCase();
        return name.includes(q) || vehicle.includes(q) || last.includes(q);
      }),
    );
  }, [searchQuery, chats]);

  // ── Open chat ───────────────────────────────────────────────────────────
  const openChat = async (chat) => {
    // Leave previous room
    if (selectedChatRef.current?._id) {
      leaveChat(selectedChatRef.current._id);
    }

    setSelectedChat(chat);
    setShowChatWindow(true);
    setMessages([]);

    // Join the socket room for this chat
    joinChat(chat._id);

    if (!chat.isBlocked) {
      try {
        setMessagesLoading(true);
        const res = await adminChatService.getChat(chat._id);
        if (res.success) {
          setMessages(res.data.messages || []);
          // Mark as read
          await adminChatService.markAsRead(chat._id);
          socketMarkRead(chat._id);
          // Clear unread badge for this chat
          setChats((prev) =>
            prev.map((c) =>
              c._id !== chat._id ? c : { ...c, unreadForAdmin: 0 },
            ),
          );
          await fetchUnreadCount();
        }
      } catch (error) {
        console.error("Error loading messages:", error);
        toast.error("Failed to load messages");
      } finally {
        setMessagesLoading(false);
      }
    }

    setTimeout(() => inputRef.current?.focus(), 200);
  };

  // ── Close chat ──────────────────────────────────────────────────────────
  const closeChat = () => {
    if (selectedChatRef.current?._id) {
      leaveChat(selectedChatRef.current._id);
    }
    setShowChatWindow(false);
    setSelectedChat(null);
    setMessages([]);
    setNewMessage("");
  };

  // ── Send message ────────────────────────────────────────────────────────
  const sendMessage = async () => {
    if (!newMessage.trim() || sending || selectedChat?.isBlocked) return;
    const text = newMessage.trim();
    setSending(true);

    // Optimistic UI - show message immediately
    const tempMsg = {
      _id: `temp-${Date.now()}`,
      message: text,
      senderType: "admin",
      read: false,
      delivered: false,
      createdAt: new Date(),
      sender: adminUser,
    };
    setMessages((prev) => [...prev, tempMsg]);
    setNewMessage("");

    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    try {
      // Send via API - backend will emit socket event
      const res = await adminChatService.sendMessage(selectedChat._id, text);
      if (res.success) {
        // Replace temp message with real one
        setMessages((prev) =>
          prev.map((m) => (m._id === tempMsg._id ? res.data : m)),
        );
        // Update sidebar without full refresh
        setChats((prev) =>
          prev.map((c) =>
            c._id !== selectedChat._id
              ? c
              : { ...c, lastMessage: text, lastMessageAt: new Date() },
          ),
        );
      } else {
        // Remove temp message on error
        setMessages((prev) => prev.filter((m) => m._id !== tempMsg._id));
        toast.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => prev.filter((m) => m._id !== tempMsg._id));
      toast.error("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  // ── Block user ──────────────────────────────────────────────────────────
  const handleBlock = async () => {
    setBlockingUser(true);
    try {
      const res = await adminChatService.blockUser(selectedChat._id);
      if (res.success) {
        toast.success(
          `${selectedChat.otherParticipant?.name} has been blocked`,
        );
        setSelectedChat((p) => ({ ...p, isBlocked: true, blockedBy: adminId }));
        setMessages([]);
        fetchChats();
        fetchUnreadCount();
      }
    } catch (error) {
      console.error("Error blocking user:", error);
      toast.error("Failed to block user");
    } finally {
      setBlockingUser(false);
      setShowBlockConfirm(false);
    }
  };

  // ── Unblock user ────────────────────────────────────────────────────────
  const handleUnblock = async () => {
    setBlockingUser(true);
    try {
      const res = await adminChatService.unblockUser(selectedChat._id);
      if (res.success) {
        toast.success(
          `${selectedChat.otherParticipant?.name} has been unblocked`,
        );
        setSelectedChat((p) => ({ ...p, isBlocked: false, blockedBy: null }));
        const msgRes = await adminChatService.getChat(selectedChat._id);
        if (msgRes.success) setMessages(msgRes.data.messages || []);
        fetchChats();
        fetchUnreadCount();
      }
    } catch (error) {
      console.error("Error unblocking user:", error);
      toast.error("Failed to unblock user");
    } finally {
      setBlockingUser(false);
      setShowUnblockConfirm(false);
    }
  };

  // ── Manual refresh (user triggered only) ────────────────────────────────
  const handleManualRefresh = () => {
    fetchChats();
    fetchUnreadCount();
    toast.info("Refreshed messages");
  };

  // ── Derived state ───────────────────────────────────────────────────────
  const getUnread = (chat) => chat.unreadForAdmin || 0;
  const iBlockedThem =
    selectedChat?.isBlocked && selectedChat?.blockedBy === adminId;

  const filterTabs = [
    { id: "all", label: "All", count: chats.length },
    {
      id: "vehicle",
      label: "Vehicle Chats",
      count: chats.filter((c) => c.chatType === "vehicle").length,
    },
    {
      id: "support",
      label: "Support",
      count: chats.filter((c) => c.chatType === "support").length,
    },
    {
      id: "unread",
      label: "Unread",
      count: chats.filter((c) => getUnread(c) > 0).length,
    },
  ];

  // ── Group messages by date ──────────────────────────────────────────────
  const groupedMessages = (() => {
    const groups = [];
    let lastDate = null;
    messages.forEach((msg, i) => {
      const day = new Date(msg.createdAt).toDateString();
      if (day !== lastDate) {
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        groups.push({
          type: "date",
          label:
            day === today ? "Today" : day === yesterday ? "Yesterday" : day,
          key: `date-${i}`,
        });
        lastDate = day;
      }
      groups.push({ type: "msg", msg, key: msg._id || i });
    });
    return groups;
  })();

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <div
        className="flex flex-col bg-gradient-to-br from-gray-50 to-gray-100"
        style={{ height: "100vh" }}
      >
        {/* Header */}
        <div className="px-8 py-5 bg-white/80 backdrop-blur-md shadow-sm flex-shrink-0">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent flex items-center gap-2">
                <FaComments className="text-blue-600" />
                Messages
                {totalUnread > 0 && (
                  <span className="ml-1 px-2 py-0.5 bg-blue-600 text-white text-xs font-bold rounded-full">
                    {totalUnread > 99 ? "99+" : totalUnread}
                  </span>
                )}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage all user conversations and vehicle inquiries
                {isConnected ? (
                  <span className="ml-2 inline-flex items-center gap-1 text-green-500 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                    Live
                  </span>
                ) : (
                  <span className="ml-2 inline-flex items-center gap-1 text-amber-500 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
                    Reconnecting…
                  </span>
                )}
              </p>
            </div>
            <button
              onClick={handleManualRefresh}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition shadow-sm"
            >
              <FaSync
                className={
                  chatsLoading ? "animate-spin text-blue-500" : "text-gray-400"
                }
                size={13}
              />
              Refresh
            </button>
          </div>
        </div>

        {/* Chat panel */}
        <div className="flex flex-1 min-h-0 m-6 rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-white">
          {/* LEFT: Chat list */}
          <div
            className={`${showChatWindow ? "hidden lg:flex" : "flex"} flex-col w-full lg:w-[340px] border-r border-gray-100 flex-shrink-0`}
          >
            <div className="p-4 border-b border-gray-100 space-y-3">
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
                <FaSearch size={12} className="text-gray-400 flex-shrink-0" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search conversations, users…"
                  className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes size={11} />
                  </button>
                )}
              </div>
              <div className="flex gap-1 overflow-x-auto">
                {filterTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveFilter(tab.id)}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
                      activeFilter === tab.id
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    {tab.label}
                    {tab.count > 0 && (
                      <span
                        className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                          activeFilter === tab.id
                            ? "bg-white/20 text-white"
                            : "bg-gray-300 text-gray-600"
                        }`}
                      >
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {chatsLoading && chats.length === 0 ? (
                <div className="flex items-center justify-center h-32">
                  <FaSpinner className="animate-spin text-blue-400 text-xl" />
                </div>
              ) : filteredChats.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center px-6">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-3">
                    <FaInbox className="text-blue-300 text-2xl" />
                  </div>
                  <p className="text-sm font-semibold text-gray-600">
                    {searchQuery ? "No results found" : "No conversations yet"}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {searchQuery
                      ? "Try a different search term"
                      : "User conversations will appear here"}
                  </p>
                </div>
              ) : (
                filteredChats.map((chat) => {
                  const unread = getUnread(chat);
                  const isSelected =
                    selectedChat?._id === chat._id && showChatWindow;
                  const isBlocked = chat.isBlocked;
                  const isVehicle = chat.chatType === "vehicle";
                  return (
                    <div
                      key={chat._id}
                      onClick={() => openChat(chat)}
                      className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer transition-all border-b border-gray-50 ${
                        isSelected
                          ? "bg-blue-50 border-l-[3px] border-l-blue-500"
                          : "hover:bg-gray-50 border-l-[3px] border-l-transparent"
                      } ${isBlocked ? "opacity-60" : ""}`}
                    >
                      <div className="relative flex-shrink-0">
                        <Avatar user={chat.otherParticipant} size="md" />
                        {isBlocked && (
                          <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center shadow-sm">
                            <FaBan size={7} />
                          </span>
                        )}
                        {unread > 0 && !isBlocked && (
                          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-blue-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                            {unread > 9 ? "9+" : unread}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-1 mb-0.5">
                          <span
                            className={`text-sm font-semibold truncate ${unread > 0 ? "text-gray-900" : "text-gray-700"}`}
                          >
                            {chat.otherParticipant?.name || "Unknown User"}
                          </span>
                          <span className="text-[10px] text-gray-400 flex-shrink-0">
                            {formatChatTime(
                              chat.lastMessageAt || chat.updatedAt,
                            )}
                          </span>
                        </div>
                        <p
                          className={`text-xs truncate ${unread > 0 && !isBlocked ? "text-gray-700 font-medium" : "text-gray-400"}`}
                        >
                          {isBlocked
                            ? "Conversation blocked"
                            : chat.lastMessage || "No messages yet"}
                        </p>
                        <div className="flex items-center gap-1.5 mt-1">
                          {isVehicle ? (
                            <span className="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded-full font-semibold bg-blue-50 text-blue-600 uppercase tracking-wide">
                              <FaCar size={7} /> Vehicle
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded-full font-semibold bg-purple-50 text-purple-600 uppercase tracking-wide">
                              <FaShieldAlt size={7} /> Support
                            </span>
                          )}
                          {chat.vehicleName && (
                            <span className="text-[10px] text-gray-400 truncate">
                              · {chat.vehicleName}
                            </span>
                          )}
                          {isBlocked && (
                            <span className="text-[9px] text-red-500 font-bold uppercase">
                              Blocked
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
              <span className="text-xs text-gray-500">
                {chats.length} conversation{chats.length !== 1 ? "s" : ""}
              </span>
              {totalUnread > 0 && (
                <span className="text-xs font-semibold text-blue-600">
                  {totalUnread} unread
                </span>
              )}
            </div>
          </div>

          {/* RIGHT: Chat window */}
          {showChatWindow && selectedChat ? (
            <div className="flex-1 flex flex-col min-w-0">
              {/* Header */}
              <div className="px-5 py-3.5 bg-white border-b border-gray-100 flex items-center justify-between flex-shrink-0 shadow-sm">
                <div className="flex items-center gap-3">
                  <button
                    onClick={closeChat}
                    className="lg:hidden w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition"
                  >
                    <FaArrowLeft size={14} />
                  </button>
                  <Avatar user={selectedChat.otherParticipant} size="md" />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-gray-900">
                        {selectedChat.otherParticipant?.name || "Unknown User"}
                      </p>
                      {selectedChat.isBlocked && (
                        <span className="inline-flex items-center gap-1 text-[10px] bg-red-50 text-red-500 border border-red-200 px-1.5 py-0.5 rounded-full font-semibold">
                          <FaBan size={8} /> Blocked
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <p className="text-xs text-gray-400">
                        {selectedChat.otherParticipant?.email}
                      </p>
                      {selectedChat.vehicleName && (
                        <>
                          <span className="text-gray-300">·</span>
                          <span className="text-xs text-blue-500 flex items-center gap-1">
                            <FaCar size={9} /> {selectedChat.vehicleName}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!selectedChat.isBlocked ? (
                    <button
                      onClick={() => setShowBlockConfirm(true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-500 hover:bg-red-50 border border-red-100 transition"
                    >
                      <FaBan size={11} /> Block
                    </button>
                  ) : iBlockedThem ? (
                    <button
                      onClick={() => setShowUnblockConfirm(true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-600 hover:bg-emerald-50 border border-emerald-200 transition"
                    >
                      <FaUnlock size={11} /> Unblock
                    </button>
                  ) : null}
                </div>
              </div>

              {/* Vehicle banner */}
              {selectedChat.vehicleId && (
                <div className="px-5 py-2.5 bg-blue-50 border-b border-blue-100 flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <FaCar size={12} className="text-blue-600" />
                  </div>
                  <span className="text-xs font-semibold text-blue-800">
                    {selectedChat.vehicleName || "Vehicle Inquiry"}
                  </span>
                </div>
              )}

              {/* Block banner */}
              {selectedChat.isBlocked && (
                <div
                  className={`flex items-center justify-between px-5 py-3 border-b ${iBlockedThem ? "bg-red-50 border-red-100" : "bg-amber-50 border-amber-100"}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${iBlockedThem ? "bg-red-100" : "bg-amber-100"}`}
                    >
                      <FaBan
                        size={13}
                        className={
                          iBlockedThem ? "text-red-500" : "text-amber-500"
                        }
                      />
                    </div>
                    <div>
                      <p
                        className={`text-xs font-bold ${iBlockedThem ? "text-red-700" : "text-amber-700"}`}
                      >
                        {iBlockedThem
                          ? `You blocked ${selectedChat.otherParticipant?.name}`
                          : "This user has restricted messaging"}
                      </p>
                      <p
                        className={`text-[11px] mt-0.5 ${iBlockedThem ? "text-red-500" : "text-amber-500"}`}
                      >
                        {iBlockedThem
                          ? "They cannot message you. Unblock to restore the conversation."
                          : "You cannot send messages in this conversation."}
                      </p>
                    </div>
                  </div>
                  {iBlockedThem && (
                    <button
                      onClick={() => setShowUnblockConfirm(true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition ml-3 whitespace-nowrap"
                    >
                      <FaUnlock size={10} /> Unblock
                    </button>
                  )}
                </div>
              )}

              {/* Messages area */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1 bg-gray-50">
                {messagesLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <FaSpinner className="animate-spin text-blue-400 text-2xl" />
                  </div>
                ) : selectedChat.isBlocked && messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center px-8">
                    <div
                      className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${iBlockedThem ? "bg-red-50" : "bg-amber-50"}`}
                    >
                      <FaLock
                        size={28}
                        className={
                          iBlockedThem ? "text-red-300" : "text-amber-300"
                        }
                      />
                    </div>
                    <p className="text-sm font-bold text-gray-600">
                      {iBlockedThem
                        ? "Conversation blocked"
                        : "Messaging unavailable"}
                    </p>
                    <p className="text-xs text-gray-400 mt-2 leading-relaxed max-w-xs">
                      {iBlockedThem
                        ? `You have blocked ${selectedChat.otherParticipant?.name}. Unblock to restore the conversation.`
                        : "This user has restricted messaging."}
                    </p>
                    {iBlockedThem && (
                      <button
                        onClick={() => setShowUnblockConfirm(true)}
                        className="mt-5 flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition"
                      >
                        <FaUnlock size={12} /> Unblock{" "}
                        {selectedChat.otherParticipant?.name}
                      </button>
                    )}
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-3">
                      <FaCommentDots className="text-blue-300 text-2xl" />
                    </div>
                    <p className="text-sm font-semibold text-gray-500">
                      No messages yet
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Start the conversation with this user
                    </p>
                  </div>
                ) : (
                  groupedMessages.map((item) => {
                    if (item.type === "date") {
                      return (
                        <div
                          key={item.key}
                          className="flex items-center gap-3 py-2"
                        >
                          <div className="flex-1 h-px bg-gray-200" />
                          <span className="text-[10px] text-gray-400 font-medium px-2.5 py-1 bg-white border border-gray-200 rounded-full whitespace-nowrap shadow-sm">
                            {item.label}
                          </span>
                          <div className="flex-1 h-px bg-gray-200" />
                        </div>
                      );
                    }
                    const { msg } = item;
                    const isOwn =
                      msg.senderType === "admin" || msg.sender?._id === adminId;
                    return (
                      <div
                        key={item.key}
                        className={`flex items-end gap-2 ${isOwn ? "justify-end" : "justify-start"}`}
                      >
                        {!isOwn && (
                          <div className="flex-shrink-0 mb-1">
                            <Avatar
                              user={selectedChat.otherParticipant}
                              size="sm"
                            />
                          </div>
                        )}
                        <div
                          className={`flex flex-col ${isOwn ? "items-end" : "items-start"} max-w-[65%]`}
                        >
                          <div
                            className={`px-4 py-2.5 text-sm leading-relaxed break-words ${
                              isOwn
                                ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl rounded-br-sm shadow-sm"
                                : "bg-white text-gray-800 rounded-2xl rounded-bl-sm border border-gray-100 shadow-sm"
                            }`}
                          >
                            {msg.message}
                          </div>
                          <div
                            className={`flex items-center gap-1 mt-1 px-1 ${isOwn ? "flex-row-reverse" : ""}`}
                          >
                            <span className="text-[10px] text-gray-400">
                              {formatMsgTime(msg.createdAt)}
                            </span>
                            {isOwn && (
                              <FaCheckDouble
                                size={9}
                                className={
                                  msg.read ? "text-blue-400" : "text-gray-300"
                                }
                              />
                            )}
                          </div>
                        </div>
                        {isOwn && (
                          <div className="flex-shrink-0 mb-1">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-[10px] font-bold">
                              {(adminUser?.name || "A").charAt(0).toUpperCase()}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="px-4 py-3 bg-white border-t border-gray-100 flex-shrink-0">
                {!isConnected && (
                  <p className="text-[11px] text-center text-amber-500 mb-2">
                    Reconnecting to chat server…
                  </p>
                )}
                {selectedChat.isBlocked ? (
                  <div
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 ${iBlockedThem ? "bg-red-50 border border-red-100" : "bg-amber-50 border border-amber-100"}`}
                  >
                    <FaLock
                      size={14}
                      className={
                        iBlockedThem ? "text-red-400" : "text-amber-400"
                      }
                    />
                    <p
                      className={`text-xs flex-1 ${iBlockedThem ? "text-red-500" : "text-amber-600"}`}
                    >
                      {iBlockedThem ? (
                        <>
                          You blocked this user.{" "}
                          <button
                            onClick={() => setShowUnblockConfirm(true)}
                            className="underline font-semibold hover:no-underline"
                          >
                            Unblock to chat
                          </button>
                        </>
                      ) : (
                        "You cannot send messages in this conversation."
                      )}
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-3 py-2">
                    <button className="text-gray-400 hover:text-blue-500 transition flex-shrink-0">
                      <FaSmile size={18} />
                    </button>
                    <input
                      ref={inputRef}
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                      placeholder="Type a reply…"
                      className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!newMessage.trim() || sending}
                      className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-md transition"
                    >
                      {sending ? (
                        <FaSpinner className="animate-spin" size={13} />
                      ) : (
                        <FaPaperPlane size={13} />
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1 hidden lg:flex flex-col items-center justify-center bg-gray-50 text-center px-8">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center mb-5 shadow-inner">
                <FaComments className="text-blue-300 text-4xl" />
              </div>
              <p className="text-lg font-bold text-gray-600">
                Select a conversation
              </p>
              <p className="text-sm text-gray-400 mt-2 max-w-xs">
                Choose a chat from the left panel to start replying to users
              </p>
              {totalUnread > 0 && (
                <div className="mt-4 px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl">
                  <p className="text-sm font-semibold text-blue-600">
                    {totalUnread} unread message{totalUnread !== 1 ? "s" : ""}{" "}
                    waiting
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Block Modal */}
      {showBlockConfirm && selectedChat && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.55)" }}
        >
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-rose-600 px-6 pt-6 pb-10">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                <FaBan size={26} className="text-white" />
              </div>
              <h3 className="text-white text-center text-lg font-bold">
                Block User?
              </h3>
              <p className="text-red-100 text-center text-xs mt-1">
                You can unblock them anytime
              </p>
            </div>
            <div className="-mt-4 bg-white rounded-t-2xl px-6 pt-5 pb-6">
              <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <Avatar user={selectedChat.otherParticipant} size="md" />
                <div>
                  <p className="font-semibold text-gray-800 text-sm">
                    {selectedChat.otherParticipant?.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Will be blocked from messaging
                  </p>
                </div>
              </div>
              <ul className="space-y-2 mb-5">
                {[
                  "They won't be able to message you",
                  "Their messages will be hidden",
                  "You can unblock them anytime",
                ].map((t, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-xs text-gray-600"
                  >
                    <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                      <FaTimes size={7} className="text-red-500" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowBlockConfirm(false)}
                  className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBlock}
                  disabled={blockingUser}
                  className="flex-1 px-4 py-2.5 text-sm bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl font-semibold transition flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {blockingUser ? (
                    <FaSpinner className="animate-spin" size={13} />
                  ) : (
                    <FaBan size={12} />
                  )}
                  {blockingUser ? "Blocking…" : "Block User"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Unblock Modal */}
      {showUnblockConfirm && selectedChat && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.55)" }}
        >
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 pt-6 pb-10">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                <FaUnlock size={24} className="text-white" />
              </div>
              <h3 className="text-white text-center text-lg font-bold">
                Unblock User?
              </h3>
              <p className="text-emerald-100 text-center text-xs mt-1">
                Resume your conversation
              </p>
            </div>
            <div className="-mt-4 bg-white rounded-t-2xl px-6 pt-5 pb-6">
              <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <Avatar user={selectedChat.otherParticipant} size="md" />
                <div>
                  <p className="font-semibold text-gray-800 text-sm">
                    {selectedChat.otherParticipant?.name}
                  </p>
                  <p className="text-xs text-gray-500">Will be unblocked</p>
                </div>
              </div>
              <ul className="space-y-2 mb-5">
                {[
                  "They can message you again",
                  "Previous messages will be restored",
                  "You can block them again anytime",
                ].map((t, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-xs text-gray-600"
                  >
                    <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <FaCheck size={7} className="text-emerald-600" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowUnblockConfirm(false)}
                  className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUnblock}
                  disabled={blockingUser}
                  className="flex-1 px-4 py-2.5 text-sm bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold transition flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {blockingUser ? (
                    <FaSpinner className="animate-spin" size={13} />
                  ) : (
                    <FaUnlock size={12} />
                  )}
                  {blockingUser ? "Unblocking…" : "Unblock User"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminMessages;
 