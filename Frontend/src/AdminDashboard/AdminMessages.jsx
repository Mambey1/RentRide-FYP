// // // // // // import React, { useState, useEffect, useRef, useCallback } from "react";
// // // // // // import {
// // // // // //   FaComments,
// // // // // //   FaCommentDots,
// // // // // //   FaSearch,
// // // // // //   FaTimes,
// // // // // //   FaSync,
// // // // // //   FaPaperPlane,
// // // // // //   FaSmile,
// // // // // //   FaSpinner,
// // // // // //   FaBan,
// // // // // //   FaUnlock,
// // // // // //   FaCheck,
// // // // // //   FaCheckDouble,
// // // // // //   FaLock,
// // // // // //   FaArrowLeft,
// // // // // //   FaCar,
// // // // // //   FaShieldAlt,
// // // // // //   FaInbox,
// // // // // //   FaUserCircle,
// // // // // // } from "react-icons/fa";
// // // // // // import axios from "axios";
// // // // // // import { toast, ToastContainer } from "react-toastify";
// // // // // // import "react-toastify/dist/ReactToastify.css";
// // // // // // import { useSocket } from "../context/SocketContext";

// // // // // // // Token helper
// // // // // // const getToken = () =>
// // // // // //   localStorage.getItem("token") || sessionStorage.getItem("token");
// // // // // // const authHeader = () => ({ Authorization: `Bearer ${getToken()}` });

// // // // // // // API service
// // // // // // const adminChatService = {
// // // // // //   getAllChats: async (filter = "all", search = "") => {
// // // // // //     const res = await axios.get(
// // // // // //       `http://localhost:5000/api/admin/chats?filter=${filter}&search=${search}`,
// // // // // //       { headers: authHeader() }
// // // // // //     );
// // // // // //     return res.data;
// // // // // //   },
// // // // // //   getChat: async (chatId) => {
// // // // // //     const res = await axios.get(
// // // // // //       `http://localhost:5000/api/admin/chats/${chatId}`,
// // // // // //       { headers: authHeader() }
// // // // // //     );
// // // // // //     return res.data;
// // // // // //   },
// // // // // //   sendMessage: async (chatId, message) => {
// // // // // //     const res = await axios.post(
// // // // // //       `http://localhost:5000/api/admin/chats/${chatId}/message`,
// // // // // //       { message },
// // // // // //       { headers: authHeader() }
// // // // // //     );
// // // // // //     return res.data;
// // // // // //   },
// // // // // //   markAsRead: async (chatId) => {
// // // // // //     const res = await axios.put(
// // // // // //       `http://localhost:5000/api/admin/chats/${chatId}/read`,
// // // // // //       {},
// // // // // //       { headers: authHeader() }
// // // // // //     );
// // // // // //     return res.data;
// // // // // //   },
// // // // // //   blockUser: async (chatId) => {
// // // // // //     const res = await axios.put(
// // // // // //       `http://localhost:5000/api/admin/chats/${chatId}/block`,
// // // // // //       {},
// // // // // //       { headers: authHeader() }
// // // // // //     );
// // // // // //     return res.data;
// // // // // //   },
// // // // // //   unblockUser: async (chatId) => {
// // // // // //     const res = await axios.put(
// // // // // //       `http://localhost:5000/api/admin/chats/${chatId}/unblock`,
// // // // // //       {},
// // // // // //       { headers: authHeader() }
// // // // // //     );
// // // // // //     return res.data;
// // // // // //   },
// // // // // //   getUnreadCount: async () => {
// // // // // //     const res = await axios.get(
// // // // // //       `http://localhost:5000/api/admin/chats/unread/count`,
// // // // // //       { headers: authHeader() }
// // // // // //     );
// // // // // //     return res.data;
// // // // // //   },
// // // // // // };

// // // // // // // Time helpers
// // // // // // const formatChatTime = (date) => {
// // // // // //   if (!date) return "";
// // // // // //   const now = new Date();
// // // // // //   const d = new Date(date);
// // // // // //   const diffMs = now - d;
// // // // // //   const mins = Math.floor(diffMs / 60000);
// // // // // //   const hours = Math.floor(diffMs / 3600000);
// // // // // //   const days = Math.floor(diffMs / 86400000);
// // // // // //   if (mins < 1) return "now";
// // // // // //   if (mins < 60) return `${mins}m`;
// // // // // //   if (hours < 24) return `${hours}h`;
// // // // // //   if (days === 1) return "Yesterday";
// // // // // //   return d.toLocaleDateString();
// // // // // // };

// // // // // // const formatMsgTime = (date) =>
// // // // // //   new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

// // // // // // // Avatar component
// // // // // // const Avatar = ({ user, size = "md", className = "" }) => {
// // // // // //   const s =
// // // // // //     size === "sm"
// // // // // //       ? "w-7 h-7 text-[10px]"
// // // // // //       : size === "lg"
// // // // // //       ? "w-12 h-12 text-base"
// // // // // //       : "w-9 h-9 text-sm";
// // // // // //   if (user?.profilePhoto) {
// // // // // //     return (
// // // // // //       <img
// // // // // //         src={`http://localhost:5000/uploads/profiles/${user.profilePhoto}`}
// // // // // //         alt={user.name}
// // // // // //         className={`${s} rounded-full object-cover flex-shrink-0 ${className}`}
// // // // // //       />
// // // // // //     );
// // // // // //   }
// // // // // //   return (
// // // // // //     <div
// // // // // //       className={`${s} rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0 ${className}`}
// // // // // //     >
// // // // // //       {user?.name?.charAt(0)?.toUpperCase() || "?"}
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // const AdminMessages = () => {
// // // // // //   const adminUser = JSON.parse(
// // // // // //     localStorage.getItem("user") || sessionStorage.getItem("user") || "null"
// // // // // //   );
// // // // // //   const adminId = adminUser?._id || adminUser?.id;

// // // // // //   const { onNewMessage, sendMessage: socketSend, isConnected } = useSocket();

// // // // // //   const [chats, setChats] = useState([]);
// // // // // //   const [filteredChats, setFilteredChats] = useState([]);
// // // // // //   const [chatsLoading, setChatsLoading] = useState(false);
// // // // // //   const [selectedChat, setSelectedChat] = useState(null);
// // // // // //   const [messages, setMessages] = useState([]);
// // // // // //   const [messagesLoading, setMessagesLoading] = useState(false);
// // // // // //   const [newMessage, setNewMessage] = useState("");
// // // // // //   const [sending, setSending] = useState(false);
// // // // // //   const [searchQuery, setSearchQuery] = useState("");
// // // // // //   const [activeFilter, setActiveFilter] = useState("all");
// // // // // //   const [showChatWindow, setShowChatWindow] = useState(false);
// // // // // //   const [showBlockConfirm, setShowBlockConfirm] = useState(false);
// // // // // //   const [showUnblockConfirm, setShowUnblockConfirm] = useState(false);
// // // // // //   const [blockingUser, setBlockingUser] = useState(false);
// // // // // //   const [totalUnread, setTotalUnread] = useState(0);

// // // // // //   const messagesEndRef = useRef(null);
// // // // // //   const inputRef = useRef(null);
// // // // // //   const selectedChatRef = useRef(null);

// // // // // //   useEffect(() => {
// // // // // //     selectedChatRef.current = selectedChat;
// // // // // //   }, [selectedChat]);

// // // // // //   // Fetch unread count periodically
// // // // // //   const fetchUnreadCount = useCallback(async () => {
// // // // // //     try {
// // // // // //       const res = await adminChatService.getUnreadCount();
// // // // // //       if (res.success) {
// // // // // //         setTotalUnread(res.count);
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error("Error fetching unread count:", error);
// // // // // //     }
// // // // // //   }, []);

// // // // // //   // Fetch chats
// // // // // //   const fetchChats = useCallback(async () => {
// // // // // //     try {
// // // // // //       setChatsLoading(true);
// // // // // //       const res = await adminChatService.getAllChats(activeFilter, searchQuery);
// // // // // //       if (res.success) {
// // // // // //         setChats(res.data);
// // // // // //         setFilteredChats(res.data);
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error("Error fetching chats:", error);
// // // // // //       toast.error("Failed to load chats");
// // // // // //     } finally {
// // // // // //       setChatsLoading(false);
// // // // // //     }
// // // // // //   }, [activeFilter, searchQuery]);

// // // // // //   useEffect(() => {
// // // // // //     fetchChats();
// // // // // //     fetchUnreadCount();
// // // // // //     const interval = setInterval(() => {
// // // // // //       fetchChats();
// // // // // //       fetchUnreadCount();
// // // // // //     }, 30000);
// // // // // //     return () => clearInterval(interval);
// // // // // //   }, [fetchChats, fetchUnreadCount]);

// // // // // //   // Socket listener for new messages
// // // // // //   useEffect(() => {
// // // // // //     const unsubscribe = onNewMessage((data) => {
// // // // // //       fetchChats();
// // // // // //       fetchUnreadCount();
// // // // // //       const current = selectedChatRef.current;
// // // // // //       if (current && data.chatId === current._id) {
// // // // // //         setMessages((prev) => {
// // // // // //           if (prev.some((m) => m._id === data.message._id)) return prev;
// // // // // //           return [...prev, data.message];
// // // // // //         });
// // // // // //         adminChatService.markAsRead(current._id).catch(() => {});
// // // // // //         setTimeout(
// // // // // //           () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
// // // // // //           100
// // // // // //         );
// // // // // //       }
// // // // // //     });
// // // // // //     return unsubscribe;
// // // // // //   }, [onNewMessage, fetchChats, fetchUnreadCount]);

// // // // // //   // Auto-scroll
// // // // // //   useEffect(() => {
// // // // // //     if (messagesEndRef.current) {
// // // // // //       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
// // // // // //     }
// // // // // //   }, [messages]);

// // // // // //   // Update filtered chats when search changes
// // // // // //   useEffect(() => {
// // // // // //     if (!searchQuery.trim()) {
// // // // // //       setFilteredChats(chats);
// // // // // //     } else {
// // // // // //       const q = searchQuery.toLowerCase();
// // // // // //       setFilteredChats(
// // // // // //         chats.filter((c) => {
// // // // // //           const userName = c.otherParticipant?.name?.toLowerCase() || "";
// // // // // //           const vehicleName = c.vehicleName?.toLowerCase() || "";
// // // // // //           const lastMsg = c.lastMessage?.toLowerCase() || "";
// // // // // //           return (
// // // // // //             userName.includes(q) || vehicleName.includes(q) || lastMsg.includes(q)
// // // // // //           );
// // // // // //         })
// // // // // //       );
// // // // // //     }
// // // // // //   }, [searchQuery, chats]);

// // // // // //   const getUnread = (chat) => chat.unreadForAdmin || 0;
// // // // // //   const iBlockedThem =
// // // // // //     selectedChat?.isBlocked && selectedChat?.blockedBy === adminId;

// // // // // //   const openChat = async (chat) => {
// // // // // //     setSelectedChat(chat);
// // // // // //     setShowChatWindow(true);
// // // // // //     setMessages([]);
// // // // // //     if (!chat.isBlocked) {
// // // // // //       try {
// // // // // //         setMessagesLoading(true);
// // // // // //         const res = await adminChatService.getChat(chat._id);
// // // // // //         if (res.success) {
// // // // // //           setMessages(res.data.messages || []);
// // // // // //           await adminChatService.markAsRead(chat._id);
// // // // // //           fetchChats();
// // // // // //           fetchUnreadCount();
// // // // // //         }
// // // // // //       } catch (error) {
// // // // // //         console.error("Error loading messages:", error);
// // // // // //         toast.error("Failed to load messages");
// // // // // //       } finally {
// // // // // //         setMessagesLoading(false);
// // // // // //       }
// // // // // //     }
// // // // // //     setTimeout(() => inputRef.current?.focus(), 200);
// // // // // //   };

// // // // // //   const closeChat = () => {
// // // // // //     setShowChatWindow(false);
// // // // // //     setSelectedChat(null);
// // // // // //     setMessages([]);
// // // // // //     setNewMessage("");
// // // // // //   };

// // // // // //   const sendMessage = async () => {
// // // // // //     if (!newMessage.trim() || sending || selectedChat?.isBlocked) return;
// // // // // //     const text = newMessage.trim();
// // // // // //     setSending(true);
// // // // // //     const tempMsg = {
// // // // // //       _id: `temp-${Date.now()}`,
// // // // // //       message: text,
// // // // // //       senderType: "admin",
// // // // // //       read: false,
// // // // // //       createdAt: new Date(),
// // // // // //       sender: adminUser,
// // // // // //     };
// // // // // //     setMessages((prev) => [...prev, tempMsg]);
// // // // // //     setNewMessage("");
// // // // // //     setTimeout(
// // // // // //       () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
// // // // // //       100
// // // // // //     );
// // // // // //     try {
// // // // // //       const res = await adminChatService.sendMessage(selectedChat._id, text);
// // // // // //       if (res.success) {
// // // // // //         setMessages((prev) =>
// // // // // //           prev.map((m) => (m._id === tempMsg._id ? res.data : m))
// // // // // //         );
// // // // // //         if (socketSend && isConnected) socketSend(selectedChat._id, text);
// // // // // //         fetchChats();
// // // // // //         fetchUnreadCount();
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error("Error sending message:", error);
// // // // // //       toast.error("Failed to send message");
// // // // // //       setMessages((prev) => prev.filter((m) => m._id !== tempMsg._id));
// // // // // //     } finally {
// // // // // //       setSending(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleBlock = async () => {
// // // // // //     setBlockingUser(true);
// // // // // //     try {
// // // // // //       const res = await adminChatService.blockUser(selectedChat._id);
// // // // // //       if (res.success) {
// // // // // //         toast.success(`${selectedChat.otherParticipant?.name} has been blocked`);
// // // // // //         await fetchChats();
// // // // // //         setSelectedChat((p) => ({
// // // // // //           ...p,
// // // // // //           isBlocked: true,
// // // // // //           blockedBy: adminId,
// // // // // //         }));
// // // // // //         setMessages([]);
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error("Error blocking user:", error);
// // // // // //       toast.error("Failed to block user");
// // // // // //     } finally {
// // // // // //       setBlockingUser(false);
// // // // // //       setShowBlockConfirm(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleUnblock = async () => {
// // // // // //     setBlockingUser(true);
// // // // // //     try {
// // // // // //       const res = await adminChatService.unblockUser(selectedChat._id);
// // // // // //       if (res.success) {
// // // // // //         toast.success(`${selectedChat.otherParticipant?.name} has been unblocked`);
// // // // // //         await fetchChats();
// // // // // //         setSelectedChat((p) => ({ ...p, isBlocked: false, blockedBy: null }));
// // // // // //         const msgRes = await adminChatService.getChat(selectedChat._id);
// // // // // //         if (msgRes.success) setMessages(msgRes.data.messages || []);
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error("Error unblocking user:", error);
// // // // // //       toast.error("Failed to unblock user");
// // // // // //     } finally {
// // // // // //       setBlockingUser(false);
// // // // // //       setShowUnblockConfirm(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const filterTabs = [
// // // // // //     { id: "all", label: "All", count: chats.length },
// // // // // //     {
// // // // // //       id: "vehicle",
// // // // // //       label: "Vehicle Chats",
// // // // // //       count: chats.filter((c) => c.chatType === "vehicle").length,
// // // // // //     },
// // // // // //     {
// // // // // //       id: "support",
// // // // // //       label: "Support",
// // // // // //       count: chats.filter((c) => c.chatType === "support").length,
// // // // // //     },
// // // // // //     {
// // // // // //       id: "unread",
// // // // // //       label: "Unread",
// // // // // //       count: chats.filter((c) => getUnread(c) > 0).length,
// // // // // //     },
// // // // // //   ];

// // // // // //   // Group messages by date
// // // // // //   const groupedMessages = (() => {
// // // // // //     const groups = [];
// // // // // //     let lastDate = null;
// // // // // //     messages.forEach((msg, i) => {
// // // // // //       const day = new Date(msg.createdAt).toDateString();
// // // // // //       if (day !== lastDate) {
// // // // // //         const today = new Date().toDateString();
// // // // // //         const yesterday = new Date(Date.now() - 86400000).toDateString();
// // // // // //         groups.push({
// // // // // //           type: "date",
// // // // // //           label:
// // // // // //             day === today ? "Today" : day === yesterday ? "Yesterday" : day,
// // // // // //           key: `date-${i}`,
// // // // // //         });
// // // // // //         lastDate = day;
// // // // // //       }
// // // // // //       groups.push({ type: "msg", msg, key: msg._id || i });
// // // // // //     });
// // // // // //     return groups;
// // // // // //   })();

// // // // // //   return (
// // // // // //     <>
// // // // // //       <ToastContainer position="top-right" autoClose={3000} />
// // // // // //       <div className="flex flex-col bg-gradient-to-br from-gray-50 to-gray-100" style={{ height: "100vh" }}>
// // // // // //         {/* Header */}
// // // // // //         <div className="px-8 py-5 bg-white/80 backdrop-blur-md shadow-sm flex-shrink-0">
// // // // // //           <div className="flex justify-between items-center">
// // // // // //             <div>
// // // // // //               <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent flex items-center gap-2">
// // // // // //                 <FaComments className="text-blue-600" />
// // // // // //                 Messages
// // // // // //                 {totalUnread > 0 && (
// // // // // //                   <span className="ml-1 px-2 py-0.5 bg-blue-600 text-white text-xs font-bold rounded-full">
// // // // // //                     {totalUnread > 99 ? "99+" : totalUnread}
// // // // // //                   </span>
// // // // // //                 )}
// // // // // //               </h1>
// // // // // //               <p className="text-sm text-gray-500 mt-1">
// // // // // //                 Manage all user conversations and vehicle inquiries
// // // // // //               </p>
// // // // // //             </div>
// // // // // //             <button
// // // // // //               onClick={() => {
// // // // // //                 fetchChats();
// // // // // //                 fetchUnreadCount();
// // // // // //               }}
// // // // // //               className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition shadow-sm"
// // // // // //             >
// // // // // //               <FaSync
// // // // // //                 className={chatsLoading ? "animate-spin text-blue-500" : "text-gray-400"}
// // // // // //                 size={13}
// // // // // //               />
// // // // // //               Refresh
// // // // // //             </button>
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         {/* Chat panel */}
// // // // // //         <div className="flex flex-1 min-h-0 m-6 rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-white">
// // // // // //           {/* LEFT: Chat list */}
// // // // // //           <div
// // // // // //             className={`${
// // // // // //               showChatWindow ? "hidden lg:flex" : "flex"
// // // // // //             } flex-col w-full lg:w-[340px] border-r border-gray-100 flex-shrink-0`}
// // // // // //           >
// // // // // //             <div className="p-4 border-b border-gray-100 space-y-3">
// // // // // //               <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
// // // // // //                 <FaSearch size={12} className="text-gray-400 flex-shrink-0" />
// // // // // //                 <input
// // // // // //                   value={searchQuery}
// // // // // //                   onChange={(e) => setSearchQuery(e.target.value)}
// // // // // //                   placeholder="Search conversations, users…"
// // // // // //                   className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
// // // // // //                 />
// // // // // //                 {searchQuery && (
// // // // // //                   <button
// // // // // //                     onClick={() => setSearchQuery("")}
// // // // // //                     className="text-gray-400 hover:text-gray-600"
// // // // // //                   >
// // // // // //                     <FaTimes size={11} />
// // // // // //                   </button>
// // // // // //                 )}
// // // // // //               </div>
// // // // // //               <div className="flex gap-1 overflow-x-auto">
// // // // // //                 {filterTabs.map((tab) => (
// // // // // //                   <button
// // // // // //                     key={tab.id}
// // // // // //                     onClick={() => setActiveFilter(tab.id)}
// // // // // //                     className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
// // // // // //                       activeFilter === tab.id
// // // // // //                         ? "bg-blue-600 text-white shadow-sm"
// // // // // //                         : "bg-gray-100 text-gray-500 hover:bg-gray-200"
// // // // // //                     }`}
// // // // // //                   >
// // // // // //                     {tab.label}
// // // // // //                     {tab.count > 0 && (
// // // // // //                       <span
// // // // // //                         className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
// // // // // //                           activeFilter === tab.id
// // // // // //                             ? "bg-white/20 text-white"
// // // // // //                             : "bg-gray-300 text-gray-600"
// // // // // //                         }`}
// // // // // //                       >
// // // // // //                         {tab.count}
// // // // // //                       </span>
// // // // // //                     )}
// // // // // //                   </button>
// // // // // //                 ))}
// // // // // //               </div>
// // // // // //             </div>

// // // // // //             <div className="flex-1 overflow-y-auto">
// // // // // //               {chatsLoading && chats.length === 0 ? (
// // // // // //                 <div className="flex items-center justify-center h-32">
// // // // // //                   <FaSpinner className="animate-spin text-blue-400 text-xl" />
// // // // // //                 </div>
// // // // // //               ) : filteredChats.length === 0 ? (
// // // // // //                 <div className="flex flex-col items-center justify-center h-full py-12 text-center px-6">
// // // // // //                   <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-3">
// // // // // //                     <FaInbox className="text-blue-300 text-2xl" />
// // // // // //                   </div>
// // // // // //                   <p className="text-sm font-semibold text-gray-600">
// // // // // //                     {searchQuery ? "No results found" : "No conversations yet"}
// // // // // //                   </p>
// // // // // //                   <p className="text-xs text-gray-400 mt-1">
// // // // // //                     {searchQuery
// // // // // //                       ? "Try a different search term"
// // // // // //                       : "User conversations will appear here"}
// // // // // //                   </p>
// // // // // //                 </div>
// // // // // //               ) : (
// // // // // //                 filteredChats.map((chat) => {
// // // // // //                   const unread = getUnread(chat);
// // // // // //                   const isSelected = selectedChat?._id === chat._id && showChatWindow;
// // // // // //                   const isBlocked = chat.isBlocked;
// // // // // //                   const isVehicle = chat.chatType === "vehicle";
// // // // // //                   return (
// // // // // //                     <div
// // // // // //                       key={chat._id}
// // // // // //                       onClick={() => openChat(chat)}
// // // // // //                       className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer transition-all border-b border-gray-50 ${
// // // // // //                         isSelected
// // // // // //                           ? "bg-blue-50 border-l-[3px] border-l-blue-500"
// // // // // //                           : "hover:bg-gray-50 border-l-[3px] border-l-transparent"
// // // // // //                       } ${isBlocked ? "opacity-60" : ""}`}
// // // // // //                     >
// // // // // //                       <div className="relative flex-shrink-0">
// // // // // //                         <Avatar user={chat.otherParticipant} size="md" />
// // // // // //                         {isBlocked && (
// // // // // //                           <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center shadow-sm">
// // // // // //                             <FaBan size={7} />
// // // // // //                           </span>
// // // // // //                         )}
// // // // // //                         {unread > 0 && !isBlocked && (
// // // // // //                           <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-blue-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
// // // // // //                             {unread > 9 ? "9+" : unread}
// // // // // //                           </span>
// // // // // //                         )}
// // // // // //                       </div>
// // // // // //                       <div className="flex-1 min-w-0">
// // // // // //                         <div className="flex items-baseline justify-between gap-1 mb-0.5">
// // // // // //                           <span
// // // // // //                             className={`text-sm font-semibold truncate ${
// // // // // //                               unread > 0 ? "text-gray-900" : "text-gray-700"
// // // // // //                             }`}
// // // // // //                           >
// // // // // //                             {chat.otherParticipant?.name || "Unknown User"}
// // // // // //                           </span>
// // // // // //                           <span className="text-[10px] text-gray-400 flex-shrink-0">
// // // // // //                             {formatChatTime(chat.lastMessageAt || chat.updatedAt)}
// // // // // //                           </span>
// // // // // //                         </div>
// // // // // //                         <p
// // // // // //                           className={`text-xs truncate ${
// // // // // //                             unread > 0 && !isBlocked
// // // // // //                               ? "text-gray-700 font-medium"
// // // // // //                               : "text-gray-400"
// // // // // //                           }`}
// // // // // //                         >
// // // // // //                           {isBlocked
// // // // // //                             ? "Conversation blocked"
// // // // // //                             : chat.lastMessage || "No messages yet"}
// // // // // //                         </p>
// // // // // //                         <div className="flex items-center gap-1.5 mt-1">
// // // // // //                           {isVehicle ? (
// // // // // //                             <span className="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded-full font-semibold bg-blue-50 text-blue-600 uppercase tracking-wide">
// // // // // //                               <FaCar size={7} /> Vehicle
// // // // // //                             </span>
// // // // // //                           ) : (
// // // // // //                             <span className="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded-full font-semibold bg-purple-50 text-purple-600 uppercase tracking-wide">
// // // // // //                               <FaShieldAlt size={7} /> Support
// // // // // //                             </span>
// // // // // //                           )}
// // // // // //                           {chat.vehicleName && (
// // // // // //                             <span className="text-[10px] text-gray-400 truncate">
// // // // // //                               · {chat.vehicleName}
// // // // // //                             </span>
// // // // // //                           )}
// // // // // //                           {isBlocked && (
// // // // // //                             <span className="text-[9px] text-red-500 font-bold uppercase">
// // // // // //                               Blocked
// // // // // //                             </span>
// // // // // //                           )}
// // // // // //                         </div>
// // // // // //                       </div>
// // // // // //                     </div>
// // // // // //                   );
// // // // // //                 })
// // // // // //               )}
// // // // // //             </div>

// // // // // //             <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
// // // // // //               <span className="text-xs text-gray-500">
// // // // // //                 {chats.length} conversation{chats.length !== 1 ? "s" : ""}
// // // // // //               </span>
// // // // // //               {totalUnread > 0 && (
// // // // // //                 <span className="text-xs font-semibold text-blue-600">
// // // // // //                   {totalUnread} unread
// // // // // //                 </span>
// // // // // //               )}
// // // // // //             </div>
// // // // // //           </div>

// // // // // //           {/* RIGHT: Chat window */}
// // // // // //           {showChatWindow && selectedChat ? (
// // // // // //             <div className="flex-1 flex flex-col min-w-0">
// // // // // //               {/* Header */}
// // // // // //               <div className="px-5 py-3.5 bg-white border-b border-gray-100 flex items-center justify-between flex-shrink-0 shadow-sm">
// // // // // //                 <div className="flex items-center gap-3">
// // // // // //                   <button
// // // // // //                     onClick={closeChat}
// // // // // //                     className="lg:hidden w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition"
// // // // // //                   >
// // // // // //                     <FaArrowLeft size={14} />
// // // // // //                   </button>
// // // // // //                   <Avatar user={selectedChat.otherParticipant} size="md" />
// // // // // //                   <div>
// // // // // //                     <div className="flex items-center gap-2">
// // // // // //                       <p className="text-sm font-bold text-gray-900">
// // // // // //                         {selectedChat.otherParticipant?.name || "Unknown User"}
// // // // // //                       </p>
// // // // // //                       {selectedChat.isBlocked && (
// // // // // //                         <span className="inline-flex items-center gap-1 text-[10px] bg-red-50 text-red-500 border border-red-200 px-1.5 py-0.5 rounded-full font-semibold">
// // // // // //                           <FaBan size={8} /> Blocked
// // // // // //                         </span>
// // // // // //                       )}
// // // // // //                     </div>
// // // // // //                     <div className="flex items-center gap-1.5 mt-0.5">
// // // // // //                       <p className="text-xs text-gray-400">
// // // // // //                         {selectedChat.otherParticipant?.email}
// // // // // //                       </p>
// // // // // //                       {selectedChat.vehicleName && (
// // // // // //                         <>
// // // // // //                           <span className="text-gray-300">·</span>
// // // // // //                           <span className="text-xs text-blue-500 flex items-center gap-1">
// // // // // //                             <FaCar size={9} /> {selectedChat.vehicleName}
// // // // // //                           </span>
// // // // // //                         </>
// // // // // //                       )}
// // // // // //                     </div>
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //                 <div className="flex items-center gap-2">
// // // // // //                   {!selectedChat.isBlocked ? (
// // // // // //                     <button
// // // // // //                       onClick={() => setShowBlockConfirm(true)}
// // // // // //                       className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-500 hover:bg-red-50 border border-red-100 transition"
// // // // // //                     >
// // // // // //                       <FaBan size={11} /> Block
// // // // // //                     </button>
// // // // // //                   ) : iBlockedThem ? (
// // // // // //                     <button
// // // // // //                       onClick={() => setShowUnblockConfirm(true)}
// // // // // //                       className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-600 hover:bg-emerald-50 border border-emerald-200 transition"
// // // // // //                     >
// // // // // //                       <FaUnlock size={11} /> Unblock
// // // // // //                     </button>
// // // // // //                   ) : null}
// // // // // //                 </div>
// // // // // //               </div>

// // // // // //               {/* Vehicle banner */}
// // // // // //               {selectedChat.vehicleId && (
// // // // // //                 <div className="px-5 py-2.5 bg-blue-50 border-b border-blue-100 flex items-center gap-3">
// // // // // //                   <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
// // // // // //                     <FaCar size={12} className="text-blue-600" />
// // // // // //                   </div>
// // // // // //                   <span className="text-xs font-semibold text-blue-800">
// // // // // //                     {selectedChat.vehicleName || "Vehicle Inquiry"}
// // // // // //                   </span>
// // // // // //                 </div>
// // // // // //               )}

// // // // // //               {/* Block banner */}
// // // // // //               {selectedChat.isBlocked && (
// // // // // //                 <div
// // // // // //                   className={`flex items-center justify-between px-5 py-3 border-b ${
// // // // // //                     iBlockedThem
// // // // // //                       ? "bg-red-50 border-red-100"
// // // // // //                       : "bg-amber-50 border-amber-100"
// // // // // //                   }`}
// // // // // //                 >
// // // // // //                   <div className="flex items-center gap-3">
// // // // // //                     <div
// // // // // //                       className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
// // // // // //                         iBlockedThem ? "bg-red-100" : "bg-amber-100"
// // // // // //                       }`}
// // // // // //                     >
// // // // // //                       <FaBan
// // // // // //                         size={13}
// // // // // //                         className={iBlockedThem ? "text-red-500" : "text-amber-500"}
// // // // // //                       />
// // // // // //                     </div>
// // // // // //                     <div>
// // // // // //                       <p
// // // // // //                         className={`text-xs font-bold ${
// // // // // //                           iBlockedThem ? "text-red-700" : "text-amber-700"
// // // // // //                         }`}
// // // // // //                       >
// // // // // //                         {iBlockedThem
// // // // // //                           ? `You blocked ${selectedChat.otherParticipant?.name}`
// // // // // //                           : "This user has restricted messaging"}
// // // // // //                       </p>
// // // // // //                       <p
// // // // // //                         className={`text-[11px] mt-0.5 ${
// // // // // //                           iBlockedThem ? "text-red-500" : "text-amber-500"
// // // // // //                         }`}
// // // // // //                       >
// // // // // //                         {iBlockedThem
// // // // // //                           ? "They cannot message you. Unblock to restore the conversation."
// // // // // //                           : "You cannot send messages in this conversation."}
// // // // // //                       </p>
// // // // // //                     </div>
// // // // // //                   </div>
// // // // // //                   {iBlockedThem && (
// // // // // //                     <button
// // // // // //                       onClick={() => setShowUnblockConfirm(true)}
// // // // // //                       className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition ml-3 whitespace-nowrap"
// // // // // //                     >
// // // // // //                       <FaUnlock size={10} /> Unblock
// // // // // //                     </button>
// // // // // //                   )}
// // // // // //                 </div>
// // // // // //               )}

// // // // // //               {/* Messages area */}
// // // // // //               <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1 bg-gray-50">
// // // // // //                 {messagesLoading ? (
// // // // // //                   <div className="flex items-center justify-center h-full">
// // // // // //                     <FaSpinner className="animate-spin text-blue-400 text-2xl" />
// // // // // //                   </div>
// // // // // //                 ) : selectedChat.isBlocked && messages.length === 0 ? (
// // // // // //                   <div className="flex flex-col items-center justify-center h-full text-center px-8">
// // // // // //                     <div
// // // // // //                       className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${
// // // // // //                         iBlockedThem ? "bg-red-50" : "bg-amber-50"
// // // // // //                       }`}
// // // // // //                     >
// // // // // //                       <FaLock
// // // // // //                         size={28}
// // // // // //                         className={iBlockedThem ? "text-red-300" : "text-amber-300"}
// // // // // //                       />
// // // // // //                     </div>
// // // // // //                     <p className="text-sm font-bold text-gray-600">
// // // // // //                       {iBlockedThem
// // // // // //                         ? "Conversation blocked"
// // // // // //                         : "Messaging unavailable"}
// // // // // //                     </p>
// // // // // //                     <p className="text-xs text-gray-400 mt-2 leading-relaxed max-w-xs">
// // // // // //                       {iBlockedThem
// // // // // //                         ? `You have blocked ${selectedChat.otherParticipant?.name}. Unblock to restore the conversation.`
// // // // // //                         : "This user has restricted messaging."}
// // // // // //                     </p>
// // // // // //                     {iBlockedThem && (
// // // // // //                       <button
// // // // // //                         onClick={() => setShowUnblockConfirm(true)}
// // // // // //                         className="mt-5 flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition"
// // // // // //                       >
// // // // // //                         <FaUnlock size={12} /> Unblock{" "}
// // // // // //                         {selectedChat.otherParticipant?.name}
// // // // // //                       </button>
// // // // // //                     )}
// // // // // //                   </div>
// // // // // //                 ) : messages.length === 0 ? (
// // // // // //                   <div className="flex flex-col items-center justify-center h-full text-center">
// // // // // //                     <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-3">
// // // // // //                       <FaCommentDots className="text-blue-300 text-2xl" />
// // // // // //                     </div>
// // // // // //                     <p className="text-sm font-semibold text-gray-500">
// // // // // //                       No messages yet
// // // // // //                     </p>
// // // // // //                     <p className="text-xs text-gray-400 mt-1">
// // // // // //                       Start the conversation with this user
// // // // // //                     </p>
// // // // // //                   </div>
// // // // // //                 ) : (
// // // // // //                   groupedMessages.map((item) => {
// // // // // //                     if (item.type === "date") {
// // // // // //                       return (
// // // // // //                         <div key={item.key} className="flex items-center gap-3 py-2">
// // // // // //                           <div className="flex-1 h-px bg-gray-200" />
// // // // // //                           <span className="text-[10px] text-gray-400 font-medium px-2.5 py-1 bg-white border border-gray-200 rounded-full whitespace-nowrap shadow-sm">
// // // // // //                             {item.label}
// // // // // //                           </span>
// // // // // //                           <div className="flex-1 h-px bg-gray-200" />
// // // // // //                         </div>
// // // // // //                       );
// // // // // //                     }
// // // // // //                     const { msg } = item;
// // // // // //                     const isOwn = msg.senderType === "admin" || msg.sender?._id === adminId;
// // // // // //                     return (
// // // // // //                       <div
// // // // // //                         key={item.key}
// // // // // //                         className={`flex items-end gap-2 ${
// // // // // //                           isOwn ? "justify-end" : "justify-start"
// // // // // //                         }`}
// // // // // //                       >
// // // // // //                         {!isOwn && (
// // // // // //                           <div className="flex-shrink-0 mb-1">
// // // // // //                             <Avatar user={selectedChat.otherParticipant} size="sm" />
// // // // // //                           </div>
// // // // // //                         )}
// // // // // //                         <div
// // // // // //                           className={`flex flex-col ${
// // // // // //                             isOwn ? "items-end" : "items-start"
// // // // // //                           } max-w-[65%]`}
// // // // // //                         >
// // // // // //                           <div
// // // // // //                             className={`px-4 py-2.5 text-sm leading-relaxed break-words ${
// // // // // //                               isOwn
// // // // // //                                 ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl rounded-br-sm shadow-sm"
// // // // // //                                 : "bg-white text-gray-800 rounded-2xl rounded-bl-sm border border-gray-100 shadow-sm"
// // // // // //                             }`}
// // // // // //                           >
// // // // // //                             {msg.message}
// // // // // //                           </div>
// // // // // //                           <div
// // // // // //                             className={`flex items-center gap-1 mt-1 px-1 ${
// // // // // //                               isOwn ? "flex-row-reverse" : ""
// // // // // //                             }`}
// // // // // //                           >
// // // // // //                             <span className="text-[10px] text-gray-400">
// // // // // //                               {formatMsgTime(msg.createdAt)}
// // // // // //                             </span>
// // // // // //                             {isOwn && (
// // // // // //                               <FaCheckDouble
// // // // // //                                 size={9}
// // // // // //                                 className={msg.read ? "text-blue-400" : "text-gray-300"}
// // // // // //                               />
// // // // // //                             )}
// // // // // //                           </div>
// // // // // //                         </div>
// // // // // //                         {isOwn && (
// // // // // //                           <div className="flex-shrink-0 mb-1">
// // // // // //                             <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-[10px] font-bold">
// // // // // //                               {(adminUser?.name || "A").charAt(0).toUpperCase()}
// // // // // //                             </div>
// // // // // //                           </div>
// // // // // //                         )}
// // // // // //                       </div>
// // // // // //                     );
// // // // // //                   })
// // // // // //                 )}
// // // // // //                 <div ref={messagesEndRef} />
// // // // // //               </div>

// // // // // //               {/* Input */}
// // // // // //               <div className="px-4 py-3 bg-white border-t border-gray-100 flex-shrink-0">
// // // // // //                 {!isConnected && (
// // // // // //                   <p className="text-[11px] text-center text-amber-500 mb-2">
// // // // // //                     Reconnecting to chat server…
// // // // // //                   </p>
// // // // // //                 )}
// // // // // //                 {selectedChat.isBlocked ? (
// // // // // //                   <div
// // // // // //                     className={`flex items-center gap-3 rounded-2xl px-4 py-3 ${
// // // // // //                       iBlockedThem
// // // // // //                         ? "bg-red-50 border border-red-100"
// // // // // //                         : "bg-amber-50 border border-amber-100"
// // // // // //                     }`}
// // // // // //                   >
// // // // // //                     <FaLock
// // // // // //                       size={14}
// // // // // //                       className={iBlockedThem ? "text-red-400" : "text-amber-400"}
// // // // // //                     />
// // // // // //                     <p
// // // // // //                       className={`text-xs flex-1 ${
// // // // // //                         iBlockedThem ? "text-red-500" : "text-amber-600"
// // // // // //                       }`}
// // // // // //                     >
// // // // // //                       {iBlockedThem ? (
// // // // // //                         <>
// // // // // //                           You blocked this user.{" "}
// // // // // //                           <button
// // // // // //                             onClick={() => setShowUnblockConfirm(true)}
// // // // // //                             className="underline font-semibold hover:no-underline"
// // // // // //                           >
// // // // // //                             Unblock to chat
// // // // // //                           </button>
// // // // // //                         </>
// // // // // //                       ) : (
// // // // // //                         "You cannot send messages in this conversation."
// // // // // //                       )}
// // // // // //                     </p>
// // // // // //                   </div>
// // // // // //                 ) : (
// // // // // //                   <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-3 py-2">
// // // // // //                     <button className="text-gray-400 hover:text-blue-500 transition flex-shrink-0">
// // // // // //                       <FaSmile size={18} />
// // // // // //                     </button>
// // // // // //                     <input
// // // // // //                       ref={inputRef}
// // // // // //                       type="text"
// // // // // //                       value={newMessage}
// // // // // //                       onChange={(e) => setNewMessage(e.target.value)}
// // // // // //                       onKeyPress={(e) => e.key === "Enter" && sendMessage()}
// // // // // //                       placeholder="Type a reply…"
// // // // // //                       className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
// // // // // //                     />
// // // // // //                     <button
// // // // // //                       onClick={sendMessage}
// // // // // //                       disabled={!newMessage.trim() || sending}
// // // // // //                       className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-md transition"
// // // // // //                     >
// // // // // //                       {sending ? (
// // // // // //                         <FaSpinner className="animate-spin" size={13} />
// // // // // //                       ) : (
// // // // // //                         <FaPaperPlane size={13} />
// // // // // //                       )}
// // // // // //                     </button>
// // // // // //                   </div>
// // // // // //                 )}
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           ) : (
// // // // // //             /* Empty state */
// // // // // //             <div className="flex-1 hidden lg:flex flex-col items-center justify-center bg-gray-50 text-center px-8">
// // // // // //               <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center mb-5 shadow-inner">
// // // // // //                 <FaComments className="text-blue-300 text-4xl" />
// // // // // //               </div>
// // // // // //               <p className="text-lg font-bold text-gray-600">
// // // // // //                 Select a conversation
// // // // // //               </p>
// // // // // //               <p className="text-sm text-gray-400 mt-2 max-w-xs">
// // // // // //                 Choose a chat from the left panel to start replying to users
// // // // // //               </p>
// // // // // //               {totalUnread > 0 && (
// // // // // //                 <div className="mt-4 px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl">
// // // // // //                   <p className="text-sm font-semibold text-blue-600">
// // // // // //                     {totalUnread} unread message
// // // // // //                     {totalUnread !== 1 ? "s" : ""} waiting
// // // // // //                   </p>
// // // // // //                 </div>
// // // // // //               )}
// // // // // //             </div>
// // // // // //           )}
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* Block Modal */}
// // // // // //       {showBlockConfirm && selectedChat && (
// // // // // //         <div
// // // // // //           className="fixed inset-0 z-[200] flex items-center justify-center p-4"
// // // // // //           style={{ background: "rgba(0,0,0,0.55)" }}
// // // // // //         >
// // // // // //           <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
// // // // // //             <div className="bg-gradient-to-r from-red-500 to-rose-600 px-6 pt-6 pb-10">
// // // // // //               <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
// // // // // //                 <FaBan size={26} className="text-white" />
// // // // // //               </div>
// // // // // //               <h3 className="text-white text-center text-lg font-bold">
// // // // // //                 Block User?
// // // // // //               </h3>
// // // // // //               <p className="text-red-100 text-center text-xs mt-1">
// // // // // //                 You can unblock them anytime
// // // // // //               </p>
// // // // // //             </div>
// // // // // //             <div className="-mt-4 bg-white rounded-t-2xl px-6 pt-5 pb-6">
// // // // // //               <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
// // // // // //                 <Avatar user={selectedChat.otherParticipant} size="md" />
// // // // // //                 <div>
// // // // // //                   <p className="font-semibold text-gray-800 text-sm">
// // // // // //                     {selectedChat.otherParticipant?.name}
// // // // // //                   </p>
// // // // // //                   <p className="text-xs text-gray-500">
// // // // // //                     Will be blocked from messaging
// // // // // //                   </p>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //               <ul className="space-y-2 mb-5">
// // // // // //                 {[
// // // // // //                   "They won't be able to message you",
// // // // // //                   "Their messages will be hidden",
// // // // // //                   "You can unblock them anytime",
// // // // // //                 ].map((t, i) => (
// // // // // //                   <li key={i} className="flex items-center gap-2 text-xs text-gray-600">
// // // // // //                     <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
// // // // // //                       <FaTimes size={7} className="text-red-500" />
// // // // // //                     </span>
// // // // // //                     {t}
// // // // // //                   </li>
// // // // // //                 ))}
// // // // // //               </ul>
// // // // // //               <div className="flex gap-2">
// // // // // //                 <button
// // // // // //                   onClick={() => setShowBlockConfirm(false)}
// // // // // //                   className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition font-medium"
// // // // // //                 >
// // // // // //                   Cancel
// // // // // //                 </button>
// // // // // //                 <button
// // // // // //                   onClick={handleBlock}
// // // // // //                   disabled={blockingUser}
// // // // // //                   className="flex-1 px-4 py-2.5 text-sm bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white rounded-xl font-semibold transition flex items-center justify-center gap-2 disabled:opacity-60"
// // // // // //                 >
// // // // // //                   {blockingUser ? (
// // // // // //                     <FaSpinner className="animate-spin" size={13} />
// // // // // //                   ) : (
// // // // // //                     <FaBan size={12} />
// // // // // //                   )}
// // // // // //                   {blockingUser ? "Blocking…" : "Block User"}
// // // // // //                 </button>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       )}

// // // // // //       {/* Unblock Modal */}
// // // // // //       {showUnblockConfirm && selectedChat && (
// // // // // //         <div
// // // // // //           className="fixed inset-0 z-[200] flex items-center justify-center p-4"
// // // // // //           style={{ background: "rgba(0,0,0,0.55)" }}
// // // // // //         >
// // // // // //           <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
// // // // // //             <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 pt-6 pb-10">
// // // // // //               <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
// // // // // //                 <FaUnlock size={24} className="text-white" />
// // // // // //               </div>
// // // // // //               <h3 className="text-white text-center text-lg font-bold">
// // // // // //                 Unblock User?
// // // // // //               </h3>
// // // // // //               <p className="text-emerald-100 text-center text-xs mt-1">
// // // // // //                 Resume your conversation
// // // // // //               </p>
// // // // // //             </div>
// // // // // //             <div className="-mt-4 bg-white rounded-t-2xl px-6 pt-5 pb-6">
// // // // // //               <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
// // // // // //                 <Avatar user={selectedChat.otherParticipant} size="md" />
// // // // // //                 <div>
// // // // // //                   <p className="font-semibold text-gray-800 text-sm">
// // // // // //                     {selectedChat.otherParticipant?.name}
// // // // // //                   </p>
// // // // // //                   <p className="text-xs text-gray-500">Will be unblocked</p>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //               <ul className="space-y-2 mb-5">
// // // // // //                 {[
// // // // // //                   "They can message you again",
// // // // // //                   "Previous messages will be restored",
// // // // // //                   "You can block them again anytime",
// // // // // //                 ].map((t, i) => (
// // // // // //                   <li key={i} className="flex items-center gap-2 text-xs text-gray-600">
// // // // // //                     <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
// // // // // //                       <FaCheck size={7} className="text-emerald-600" />
// // // // // //                     </span>
// // // // // //                     {t}
// // // // // //                   </li>
// // // // // //                 ))}
// // // // // //               </ul>
// // // // // //               <div className="flex gap-2">
// // // // // //                 <button
// // // // // //                   onClick={() => setShowUnblockConfirm(false)}
// // // // // //                   className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition font-medium"
// // // // // //                 >
// // // // // //                   Cancel
// // // // // //                 </button>
// // // // // //                 <button
// // // // // //                   onClick={handleUnblock}
// // // // // //                   disabled={blockingUser}
// // // // // //                   className="flex-1 px-4 py-2.5 text-sm bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl font-semibold transition flex items-center justify-center gap-2 disabled:opacity-60"
// // // // // //                 >
// // // // // //                   {blockingUser ? (
// // // // // //                     <FaSpinner className="animate-spin" size={13} />
// // // // // //                   ) : (
// // // // // //                     <FaUnlock size={12} />
// // // // // //                   )}
// // // // // //                   {blockingUser ? "Unblocking…" : "Unblock User"}
// // // // // //                 </button>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       )}
// // // // // //     </>
// // // // // //   );
// // // // // // };

// // // // // // export default AdminMessages;

// // // // // import React, { useState, useEffect, useRef, useCallback } from "react";
// // // // // import {
// // // // //   FaComments,
// // // // //   FaCommentDots,
// // // // //   FaSearch,
// // // // //   FaTimes,
// // // // //   FaSync,
// // // // //   FaPaperPlane,
// // // // //   FaSmile,
// // // // //   FaSpinner,
// // // // //   FaBan,
// // // // //   FaUnlock,
// // // // //   FaCheck,
// // // // //   FaCheckDouble,
// // // // //   FaLock,
// // // // //   FaArrowLeft,
// // // // //   FaCar,
// // // // //   FaShieldAlt,
// // // // //   FaInbox,
// // // // // } from "react-icons/fa";
// // // // // import axios from "axios";
// // // // // import { toast, ToastContainer } from "react-toastify";
// // // // // import "react-toastify/dist/ReactToastify.css";
// // // // // import { useSocket } from "../context/SocketContext"; // adjust path to match your project

// // // // // // ─── Token helper ─────────────────────────────────────────────────────────────
// // // // // const getToken = () =>
// // // // //   localStorage.getItem("token") || sessionStorage.getItem("token");
// // // // // const authHeader = () => ({ Authorization: `Bearer ${getToken()}` });

// // // // // // ─── API service ──────────────────────────────────────────────────────────────
// // // // // const adminChatService = {
// // // // //   getAllChats: async (filter = "all", search = "") => {
// // // // //     const res = await axios.get(
// // // // //       `http://localhost:5000/api/admin/chats?filter=${filter}&search=${encodeURIComponent(search)}`,
// // // // //       { headers: authHeader() }
// // // // //     );
// // // // //     return res.data;
// // // // //   },
// // // // //   getChat: async (chatId) => {
// // // // //     const res = await axios.get(
// // // // //       `http://localhost:5000/api/admin/chats/${chatId}`,
// // // // //       { headers: authHeader() }
// // // // //     );
// // // // //     return res.data;
// // // // //   },
// // // // //   sendMessage: async (chatId, message) => {
// // // // //     const res = await axios.post(
// // // // //       `http://localhost:5000/api/admin/chats/${chatId}/message`,
// // // // //       { message },
// // // // //       { headers: authHeader() }
// // // // //     );
// // // // //     return res.data;
// // // // //   },
// // // // //   markAsRead: async (chatId) => {
// // // // //     const res = await axios.put(
// // // // //       `http://localhost:5000/api/admin/chats/${chatId}/read`,
// // // // //       {},
// // // // //       { headers: authHeader() }
// // // // //     );
// // // // //     return res.data;
// // // // //   },
// // // // //   blockUser: async (chatId) => {
// // // // //     const res = await axios.put(
// // // // //       `http://localhost:5000/api/admin/chats/${chatId}/block`,
// // // // //       {},
// // // // //       { headers: authHeader() }
// // // // //     );
// // // // //     return res.data;
// // // // //   },
// // // // //   unblockUser: async (chatId) => {
// // // // //     const res = await axios.put(
// // // // //       `http://localhost:5000/api/admin/chats/${chatId}/unblock`,
// // // // //       {},
// // // // //       { headers: authHeader() }
// // // // //     );
// // // // //     return res.data;
// // // // //   },
// // // // // };

// // // // // // ─── Time helpers ─────────────────────────────────────────────────────────────
// // // // // const formatChatTime = (date) => {
// // // // //   if (!date) return "";
// // // // //   const now = new Date();
// // // // //   const d = new Date(date);
// // // // //   const diffMs = now - d;
// // // // //   const mins = Math.floor(diffMs / 60000);
// // // // //   const hours = Math.floor(diffMs / 3600000);
// // // // //   const days = Math.floor(diffMs / 86400000);
// // // // //   if (mins < 1) return "now";
// // // // //   if (mins < 60) return `${mins}m`;
// // // // //   if (hours < 24) return `${hours}h`;
// // // // //   if (days === 1) return "Yesterday";
// // // // //   return d.toLocaleDateString();
// // // // // };
// // // // // const formatMsgTime = (date) =>
// // // // //   new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

// // // // // // ─── Avatar ───────────────────────────────────────────────────────────────────
// // // // // const Avatar = ({ user, size = "md", className = "" }) => {
// // // // //   const s =
// // // // //     size === "sm" ? "w-7 h-7 text-[10px]"
// // // // //     : size === "lg" ? "w-12 h-12 text-base"
// // // // //     : "w-9 h-9 text-sm";
// // // // //   if (user?.profilePhoto) {
// // // // //     return (
// // // // //       <img
// // // // //         src={`http://localhost:5000/uploads/profiles/${user.profilePhoto}`}
// // // // //         alt={user.name}
// // // // //         className={`${s} rounded-full object-cover flex-shrink-0 ${className}`}
// // // // //       />
// // // // //     );
// // // // //   }
// // // // //   return (
// // // // //     <div className={`${s} rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0 ${className}`}>
// // // // //       {user?.name?.charAt(0)?.toUpperCase() || "?"}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // // ─── Main Component ───────────────────────────────────────────────────────────
// // // // // const AdminMessages = () => {
// // // // //   const adminUser = JSON.parse(
// // // // //     localStorage.getItem("user") || sessionStorage.getItem("user") || "null"
// // // // //   );
// // // // //   const adminId = adminUser?._id || adminUser?.id;

// // // // //   // ── Socket context ──────────────────────────────────────────────────────
// // // // //   const {
// // // // //     isConnected,
// // // // //     joinChat,
// // // // //     leaveChat,
// // // // //     onNewMessage,
// // // // //     sendMessage: socketSend,
// // // // //     markRead: socketMarkRead,
// // // // //   } = useSocket();

// // // // //   // ── State ───────────────────────────────────────────────────────────────
// // // // //   const [chats, setChats] = useState([]);
// // // // //   const [filteredChats, setFilteredChats] = useState([]);
// // // // //   const [chatsLoading, setChatsLoading] = useState(false);
// // // // //   const [selectedChat, setSelectedChat] = useState(null);
// // // // //   const [messages, setMessages] = useState([]);
// // // // //   const [messagesLoading, setMessagesLoading] = useState(false);
// // // // //   const [newMessage, setNewMessage] = useState("");
// // // // //   const [sending, setSending] = useState(false);
// // // // //   const [searchQuery, setSearchQuery] = useState("");
// // // // //   const [activeFilter, setActiveFilter] = useState("all");
// // // // //   const [showChatWindow, setShowChatWindow] = useState(false);
// // // // //   const [showBlockConfirm, setShowBlockConfirm] = useState(false);
// // // // //   const [showUnblockConfirm, setShowUnblockConfirm] = useState(false);
// // // // //   const [blockingUser, setBlockingUser] = useState(false);
// // // // //   const [totalUnread, setTotalUnread] = useState(0);

// // // // //   const messagesEndRef = useRef(null);
// // // // //   const inputRef = useRef(null);
// // // // //   // Stable ref so socket handlers always see the latest selectedChat
// // // // //   const selectedChatRef = useRef(null);
// // // // //   useEffect(() => { selectedChatRef.current = selectedChat; }, [selectedChat]);

// // // // //   // ── Fetch chat list ─────────────────────────────────────────────────────
// // // // //   const fetchChats = useCallback(async () => {
// // // // //     try {
// // // // //       setChatsLoading(true);
// // // // //       const res = await adminChatService.getAllChats(activeFilter, searchQuery);
// // // // //       if (res.success) {
// // // // //         setChats(res.data);
// // // // //         setFilteredChats(res.data);
// // // // //         // Sum unread counts from the enriched field the backend sends
// // // // //         const unread = res.data.reduce((acc, c) => acc + (c.unreadForAdmin || 0), 0);
// // // // //         setTotalUnread(unread);
// // // // //       }
// // // // //     } catch {
// // // // //       toast.error("Failed to load chats");
// // // // //     } finally {
// // // // //       setChatsLoading(false);
// // // // //     }
// // // // //   }, [activeFilter, searchQuery]);

// // // // //   // Initial load + poll every 60s as a fallback (real-time handles the rest)
// // // // //   useEffect(() => {
// // // // //     fetchChats();
// // // // //     const interval = setInterval(fetchChats, 60000);
// // // // //     return () => clearInterval(interval);
// // // // //   }, [fetchChats]);

// // // // //   // ── Global socket listener — updates chat list sidebar in real-time ─────
// // // // //   // Subscribed to "*" so ANY incoming message refreshes the sidebar preview
// // // // //   useEffect(() => {
// // // // //     const unsubscribe = onNewMessage("*", (data) => {
// // // // //       if (!data.message) return; // skip pure notifications with no message

// // // // //       // Update the sidebar preview for the affected chat
// // // // //       setChats((prev) =>
// // // // //         prev.map((c) => {
// // // // //           if (c._id !== data.chatId) return c;
// // // // //           const isCurrentlyOpen =
// // // // //             selectedChatRef.current?._id === data.chatId;
// // // // //           return {
// // // // //             ...c,
// // // // //             lastMessage: data.message.message,
// // // // //             lastMessageAt: data.message.createdAt,
// // // // //             // Only increment unread if this chat isn't currently open
// // // // //             unreadForAdmin: isCurrentlyOpen
// // // // //               ? 0
// // // // //               : (c.unreadForAdmin || 0) + 1,
// // // // //           };
// // // // //         })
// // // // //       );

// // // // //       // Recalculate total unread badge
// // // // //       setTotalUnread((prev) => {
// // // // //         const isCurrentlyOpen =
// // // // //           selectedChatRef.current?._id === data.chatId;
// // // // //         return isCurrentlyOpen ? prev : prev + 1;
// // // // //       });
// // // // //     });
// // // // //     return unsubscribe;
// // // // //   }, [onNewMessage]);

// // // // //   // ── Per-chat socket listener — appends messages in real-time ───────────
// // // // //   // Subscribes specifically to the open chat's ID
// // // // //   useEffect(() => {
// // // // //     if (!selectedChat?._id) return;
// // // // //     const chatId = selectedChat._id;

// // // // //     const unsubscribe = onNewMessage(chatId, (data) => {
// // // // //       if (!data.message) return;
// // // // //       setMessages((prev) => {
// // // // //         // Deduplicate — server may confirm a message we already added optimistically
// // // // //         if (prev.some((m) => m._id === data.message._id)) return prev;
// // // // //         // Replace optimistic temp message if same text + senderType + close timestamp
// // // // //         const tempIdx = prev.findIndex(
// // // // //           (m) =>
// // // // //             m._id?.toString().startsWith("temp-") &&
// // // // //             m.message === data.message.message &&
// // // // //             m.senderType === data.message.senderType
// // // // //         );
// // // // //         if (tempIdx !== -1) {
// // // // //           const next = [...prev];
// // // // //           next[tempIdx] = data.message;
// // // // //           return next;
// // // // //         }
// // // // //         return [...prev, data.message];
// // // // //       });
// // // // //       setTimeout(
// // // // //         () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
// // // // //         80
// // // // //       );
// // // // //       // Mark as read since we're actively viewing this chat
// // // // //       adminChatService.markAsRead(chatId).catch(() => {});
// // // // //       socketMarkRead(chatId);
// // // // //     });

// // // // //     return unsubscribe;
// // // // //   }, [selectedChat?._id, onNewMessage, socketMarkRead]);

// // // // //   // ── Auto-scroll ─────────────────────────────────────────────────────────
// // // // //   useEffect(() => {
// // // // //     if (messagesEndRef.current)
// // // // //       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
// // // // //   }, [messages]);

// // // // //   // ── Local search filter ─────────────────────────────────────────────────
// // // // //   useEffect(() => {
// // // // //     if (!searchQuery.trim()) {
// // // // //       setFilteredChats(chats);
// // // // //       return;
// // // // //     }
// // // // //     const q = searchQuery.toLowerCase();
// // // // //     setFilteredChats(
// // // // //       chats.filter((c) => {
// // // // //         const name = (c.otherParticipant?.name || "").toLowerCase();
// // // // //         const vehicle = (c.vehicleName || "").toLowerCase();
// // // // //         const last = (c.lastMessage || "").toLowerCase();
// // // // //         return name.includes(q) || vehicle.includes(q) || last.includes(q);
// // // // //       })
// // // // //     );
// // // // //   }, [searchQuery, chats]);

// // // // //   // ── Open chat ───────────────────────────────────────────────────────────
// // // // //   const openChat = async (chat) => {
// // // // //     // Leave previous room
// // // // //     if (selectedChatRef.current?._id) {
// // // // //       leaveChat(selectedChatRef.current._id);
// // // // //     }

// // // // //     setSelectedChat(chat);
// // // // //     setShowChatWindow(true);
// // // // //     setMessages([]);

// // // // //     // Join the socket room for this chat so we receive new_message events
// // // // //     joinChat(chat._id);

// // // // //     if (!chat.isBlocked) {
// // // // //       try {
// // // // //         setMessagesLoading(true);
// // // // //         const res = await adminChatService.getChat(chat._id);
// // // // //         if (res.success) {
// // // // //           setMessages(res.data.messages || []);
// // // // //           // Mark read in DB + via socket
// // // // //           await adminChatService.markAsRead(chat._id);
// // // // //           socketMarkRead(chat._id);
// // // // //           // Clear unread badge for this chat in sidebar
// // // // //           setChats((prev) =>
// // // // //             prev.map((c) =>
// // // // //               c._id !== chat._id ? c : { ...c, unreadForAdmin: 0 }
// // // // //             )
// // // // //           );
// // // // //           setTotalUnread((prev) => Math.max(0, prev - (chat.unreadForAdmin || 0)));
// // // // //         }
// // // // //       } catch {
// // // // //         toast.error("Failed to load messages");
// // // // //       } finally {
// // // // //         setMessagesLoading(false);
// // // // //       }
// // // // //     }

// // // // //     setTimeout(() => inputRef.current?.focus(), 200);
// // // // //   };

// // // // //   // ── Close chat ──────────────────────────────────────────────────────────
// // // // //   const closeChat = () => {
// // // // //     if (selectedChatRef.current?._id) leaveChat(selectedChatRef.current._id);
// // // // //     setShowChatWindow(false);
// // // // //     setSelectedChat(null);
// // // // //     setMessages([]);
// // // // //     setNewMessage("");
// // // // //   };

// // // // //   // ── Send message ────────────────────────────────────────────────────────
// // // // // //   const sendMessage = async () => {
// // // // // //     if (!newMessage.trim() || sending || selectedChat?.isBlocked) return;
// // // // // //     const text = newMessage.trim();
// // // // // //     setSending(true);

// // // // // //     // Optimistic UI — add message immediately
// // // // // //     const tempId = `temp-${Date.now()}`;
// // // // // //     const tempMsg = {
// // // // // //       _id: tempId,
// // // // // //       message: text,
// // // // // //       senderType: "admin",
// // // // // //       read: false,
// // // // // //       createdAt: new Date(),
// // // // // //       sender: adminUser,
// // // // // //     };
// // // // // //     setMessages((prev) => [...prev, tempMsg]);
// // // // // //     setNewMessage("");
// // // // // //     setTimeout(
// // // // // //       () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
// // // // // //       80
// // // // // //     );

// // // // // //     try {
// // // // // //       // Send via HTTP — the server will emit new_message via socket to all participants
// // // // // //       const res = await adminChatService.sendMessage(selectedChat._id, text);
// // // // // //       if (res.success) {
// // // // // //         // Replace temp with confirmed message from server
// // // // // //         setMessages((prev) =>
// // // // // //           prev.map((m) => (m._id === tempId ? res.data : m))
// // // // // //         );
// // // // // //         // Also emit via socket directly (belt-and-suspenders in case server didn't emit)
// // // // // //         socketSend(selectedChat._id, text);
// // // // // //         // Refresh sidebar preview
// // // // // //         setChats((prev) =>
// // // // // //           prev.map((c) =>
// // // // // //             c._id !== selectedChat._id
// // // // // //               ? c
// // // // // //               : { ...c, lastMessage: text, lastMessageAt: new Date() }
// // // // // //           )
// // // // // //         );
// // // // // //       }
// // // // // //     } catch {
// // // // // //       toast.error("Failed to send message");
// // // // // //       setMessages((prev) => prev.filter((m) => m._id !== tempId));
// // // // // //       setNewMessage(text); // Restore message on failure
// // // // // //     } finally {
// // // // // //       setSending(false);
// // // // // //     }
// // // // // //   };

// // // // // const sendMessage = async () => {
// // // // //   if (!newMessage.trim() || sending || selectedChat?.isBlocked) return;
// // // // //   const text = newMessage.trim();
// // // // //   setSending(true);

// // // // //   // Create temporary message for immediate display
// // // // //   const tempMsg = {
// // // // //     _id: `temp-${Date.now()}`,
// // // // //     message: text,
// // // // //     senderType: "admin",
// // // // //     read: false,
// // // // //     delivered: false,
// // // // //     createdAt: new Date(),
// // // // //     sender: adminUser,
// // // // //   };
// // // // //   setMessages((prev) => [...prev, tempMsg]);
// // // // //   setNewMessage("");

// // // // //   setTimeout(() => {
// // // // //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// // // // //   }, 100);

// // // // //   try {
// // // // //     // Send via API only - socket will be triggered by backend
// // // // //     const res = await adminChatService.sendMessage(selectedChat._id, text);
// // // // //     if (res.success) {
// // // // //       // Replace temp message with real one
// // // // //       setMessages((prev) =>
// // // // //         prev.map((m) => (m._id === tempMsg._id ? res.data : m))
// // // // //       );
// // // // //       fetchChats();
// // // // //       fetchUnreadCount();
// // // // //     } else {
// // // // //       // Remove temp message on error
// // // // //       setMessages((prev) => prev.filter((m) => m._id !== tempMsg._id));
// // // // //       toast.error("Failed to send message");
// // // // //     }
// // // // //   } catch (error) {
// // // // //     console.error("Error sending message:", error);
// // // // //     setMessages((prev) => prev.filter((m) => m._id !== tempMsg._id));
// // // // //     toast.error("Failed to send message");
// // // // //   } finally {
// // // // //     setSending(false);
// // // // //   }
// // // // // };

// // // // //   // ── Block / unblock ─────────────────────────────────────────────────────
// // // // //   const handleBlock = async () => {
// // // // //     setBlockingUser(true);
// // // // //     try {
// // // // //       const res = await adminChatService.blockUser(selectedChat._id);
// // // // //       if (res.success) {
// // // // //         toast.success(`${selectedChat.otherParticipant?.name} has been blocked`);
// // // // //         setSelectedChat((p) => ({ ...p, isBlocked: true, blockedBy: adminId }));
// // // // //         setMessages([]);
// // // // //         fetchChats();
// // // // //       }
// // // // //     } catch {
// // // // //       toast.error("Failed to block user");
// // // // //     } finally {
// // // // //       setBlockingUser(false);
// // // // //       setShowBlockConfirm(false);
// // // // //     }
// // // // //   };

// // // // //   const handleUnblock = async () => {
// // // // //     setBlockingUser(true);
// // // // //     try {
// // // // //       const res = await adminChatService.unblockUser(selectedChat._id);
// // // // //       if (res.success) {
// // // // //         toast.success(`${selectedChat.otherParticipant?.name} has been unblocked`);
// // // // //         setSelectedChat((p) => ({ ...p, isBlocked: false, blockedBy: null }));
// // // // //         const msgRes = await adminChatService.getChat(selectedChat._id);
// // // // //         if (msgRes.success) setMessages(msgRes.data.messages || []);
// // // // //         fetchChats();
// // // // //       }
// // // // //     } catch {
// // // // //       toast.error("Failed to unblock user");
// // // // //     } finally {
// // // // //       setBlockingUser(false);
// // // // //       setShowUnblockConfirm(false);
// // // // //     }
// // // // //   };

// // // // //   // ── Derived state ───────────────────────────────────────────────────────
// // // // //   const getUnread = (chat) => chat.unreadForAdmin || 0;
// // // // //   const iBlockedThem =
// // // // //     selectedChat?.isBlocked && selectedChat?.blockedBy === adminId;

// // // // //   const filterTabs = [
// // // // //     { id: "all", label: "All", count: chats.length },
// // // // //     { id: "vehicle", label: "Vehicle Chats", count: chats.filter((c) => c.chatType === "vehicle").length },
// // // // //     { id: "support", label: "Support", count: chats.filter((c) => c.chatType === "support").length },
// // // // //     { id: "unread", label: "Unread", count: chats.filter((c) => getUnread(c) > 0).length },
// // // // //   ];

// // // // //   // ── Group messages by date ──────────────────────────────────────────────
// // // // //   const groupedMessages = (() => {
// // // // //     const groups = [];
// // // // //     let lastDate = null;
// // // // //     messages.forEach((msg, i) => {
// // // // //       const day = new Date(msg.createdAt).toDateString();
// // // // //       if (day !== lastDate) {
// // // // //         const today = new Date().toDateString();
// // // // //         const yesterday = new Date(Date.now() - 86400000).toDateString();
// // // // //         groups.push({
// // // // //           type: "date",
// // // // //           label: day === today ? "Today" : day === yesterday ? "Yesterday" : day,
// // // // //           key: `date-${i}`,
// // // // //         });
// // // // //         lastDate = day;
// // // // //       }
// // // // //       groups.push({ type: "msg", msg, key: msg._id || i });
// // // // //     });
// // // // //     return groups;
// // // // //   })();

// // // // //   // ── Render ──────────────────────────────────────────────────────────────
// // // // //   return (
// // // // //     <>
// // // // //       <ToastContainer position="top-right" autoClose={3000} />

// // // // //       <div className="flex flex-col bg-gradient-to-br from-gray-50 to-gray-100" style={{ height: "100vh" }}>
// // // // //         {/* Header */}
// // // // //         <div className="px-8 py-5 bg-white/80 backdrop-blur-md shadow-sm flex-shrink-0">
// // // // //           <div className="flex justify-between items-center">
// // // // //             <div>
// // // // //               <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent flex items-center gap-2">
// // // // //                 <FaComments className="text-blue-600" />
// // // // //                 Messages
// // // // //                 {totalUnread > 0 && (
// // // // //                   <span className="ml-1 px-2 py-0.5 bg-blue-600 text-white text-xs font-bold rounded-full">
// // // // //                     {totalUnread > 99 ? "99+" : totalUnread}
// // // // //                   </span>
// // // // //                 )}
// // // // //               </h1>
// // // // //               <p className="text-sm text-gray-500 mt-1">
// // // // //                 Manage all user conversations and vehicle inquiries
// // // // //                 {isConnected ? (
// // // // //                   <span className="ml-2 inline-flex items-center gap-1 text-green-500 text-xs">
// // // // //                     <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
// // // // //                     Live
// // // // //                   </span>
// // // // //                 ) : (
// // // // //                   <span className="ml-2 inline-flex items-center gap-1 text-amber-500 text-xs">
// // // // //                     <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
// // // // //                     Reconnecting…
// // // // //                   </span>
// // // // //                 )}
// // // // //               </p>
// // // // //             </div>
// // // // //             <button
// // // // //               onClick={fetchChats}
// // // // //               className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition shadow-sm"
// // // // //             >
// // // // //               <FaSync className={chatsLoading ? "animate-spin text-blue-500" : "text-gray-400"} size={13} />
// // // // //               Refresh
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* Chat panel */}
// // // // //         <div className="flex flex-1 min-h-0 m-6 rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-white">

// // // // //           {/* ════ LEFT: Chat list ════ */}
// // // // //           <div className={`${showChatWindow ? "hidden lg:flex" : "flex"} flex-col w-full lg:w-[340px] border-r border-gray-100 flex-shrink-0`}>
// // // // //             <div className="p-4 border-b border-gray-100 space-y-3">
// // // // //               <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
// // // // //                 <FaSearch size={12} className="text-gray-400 flex-shrink-0" />
// // // // //                 <input
// // // // //                   value={searchQuery}
// // // // //                   onChange={(e) => setSearchQuery(e.target.value)}
// // // // //                   placeholder="Search conversations, users…"
// // // // //                   className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
// // // // //                 />
// // // // //                 {searchQuery && (
// // // // //                   <button onClick={() => setSearchQuery("")} className="text-gray-400 hover:text-gray-600">
// // // // //                     <FaTimes size={11} />
// // // // //                   </button>
// // // // //                 )}
// // // // //               </div>
// // // // //               <div className="flex gap-1 overflow-x-auto">
// // // // //                 {filterTabs.map((tab) => (
// // // // //                   <button
// // // // //                     key={tab.id}
// // // // //                     onClick={() => setActiveFilter(tab.id)}
// // // // //                     className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
// // // // //                       activeFilter === tab.id
// // // // //                         ? "bg-blue-600 text-white shadow-sm"
// // // // //                         : "bg-gray-100 text-gray-500 hover:bg-gray-200"
// // // // //                     }`}
// // // // //                   >
// // // // //                     {tab.label}
// // // // //                     {tab.count > 0 && (
// // // // //                       <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
// // // // //                         activeFilter === tab.id ? "bg-white/20 text-white" : "bg-gray-300 text-gray-600"
// // // // //                       }`}>
// // // // //                         {tab.count}
// // // // //                       </span>
// // // // //                     )}
// // // // //                   </button>
// // // // //                 ))}
// // // // //               </div>
// // // // //             </div>

// // // // //             <div className="flex-1 overflow-y-auto">
// // // // //               {chatsLoading && chats.length === 0 ? (
// // // // //                 <div className="flex items-center justify-center h-32">
// // // // //                   <FaSpinner className="animate-spin text-blue-400 text-xl" />
// // // // //                 </div>
// // // // //               ) : filteredChats.length === 0 ? (
// // // // //                 <div className="flex flex-col items-center justify-center h-full py-12 text-center px-6">
// // // // //                   <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-3">
// // // // //                     <FaInbox className="text-blue-300 text-2xl" />
// // // // //                   </div>
// // // // //                   <p className="text-sm font-semibold text-gray-600">
// // // // //                     {searchQuery ? "No results found" : "No conversations yet"}
// // // // //                   </p>
// // // // //                   <p className="text-xs text-gray-400 mt-1">
// // // // //                     {searchQuery ? "Try a different search term" : "User conversations will appear here"}
// // // // //                   </p>
// // // // //                 </div>
// // // // //               ) : (
// // // // //                 filteredChats.map((chat) => {
// // // // //                   const unread = getUnread(chat);
// // // // //                   const isSelected = selectedChat?._id === chat._id && showChatWindow;
// // // // //                   const isBlocked = chat.isBlocked;
// // // // //                   const isVehicle = chat.chatType === "vehicle";
// // // // //                   return (
// // // // //                     <div
// // // // //                       key={chat._id}
// // // // //                       onClick={() => openChat(chat)}
// // // // //                       className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer transition-all border-b border-gray-50 ${
// // // // //                         isSelected
// // // // //                           ? "bg-blue-50 border-l-[3px] border-l-blue-500"
// // // // //                           : "hover:bg-gray-50 border-l-[3px] border-l-transparent"
// // // // //                       } ${isBlocked ? "opacity-60" : ""}`}
// // // // //                     >
// // // // //                       <div className="relative flex-shrink-0">
// // // // //                         <Avatar user={chat.otherParticipant} size="md" />
// // // // //                         {isBlocked && (
// // // // //                           <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center shadow-sm">
// // // // //                             <FaBan size={7} />
// // // // //                           </span>
// // // // //                         )}
// // // // //                         {unread > 0 && !isBlocked && (
// // // // //                           <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-blue-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
// // // // //                             {unread > 9 ? "9+" : unread}
// // // // //                           </span>
// // // // //                         )}
// // // // //                       </div>
// // // // //                       <div className="flex-1 min-w-0">
// // // // //                         <div className="flex items-baseline justify-between gap-1 mb-0.5">
// // // // //                           <span className={`text-sm font-semibold truncate ${unread > 0 ? "text-gray-900" : "text-gray-700"}`}>
// // // // //                             {chat.otherParticipant?.name || "Unknown User"}
// // // // //                           </span>
// // // // //                           <span className="text-[10px] text-gray-400 flex-shrink-0">
// // // // //                             {formatChatTime(chat.lastMessageAt || chat.updatedAt)}
// // // // //                           </span>
// // // // //                         </div>
// // // // //                         <p className={`text-xs truncate ${unread > 0 && !isBlocked ? "text-gray-700 font-medium" : "text-gray-400"}`}>
// // // // //                           {isBlocked ? "Conversation blocked" : chat.lastMessage || "No messages yet"}
// // // // //                         </p>
// // // // //                         <div className="flex items-center gap-1.5 mt-1">
// // // // //                           {isVehicle ? (
// // // // //                             <span className="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded-full font-semibold bg-blue-50 text-blue-600 uppercase tracking-wide">
// // // // //                               <FaCar size={7} /> Vehicle
// // // // //                             </span>
// // // // //                           ) : (
// // // // //                             <span className="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded-full font-semibold bg-purple-50 text-purple-600 uppercase tracking-wide">
// // // // //                               <FaShieldAlt size={7} /> Support
// // // // //                             </span>
// // // // //                           )}
// // // // //                           {chat.vehicleName && (
// // // // //                             <span className="text-[10px] text-gray-400 truncate">· {chat.vehicleName}</span>
// // // // //                           )}
// // // // //                           {isBlocked && (
// // // // //                             <span className="text-[9px] text-red-500 font-bold uppercase">Blocked</span>
// // // // //                           )}
// // // // //                         </div>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   );
// // // // //                 })
// // // // //               )}
// // // // //             </div>

// // // // //             <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
// // // // //               <span className="text-xs text-gray-500">
// // // // //                 {chats.length} conversation{chats.length !== 1 ? "s" : ""}
// // // // //               </span>
// // // // //               {totalUnread > 0 && (
// // // // //                 <span className="text-xs font-semibold text-blue-600">{totalUnread} unread</span>
// // // // //               )}
// // // // //             </div>
// // // // //           </div>

// // // // //           {/* ════ RIGHT: Chat window ════ */}
// // // // //           {showChatWindow && selectedChat ? (
// // // // //             <div className="flex-1 flex flex-col min-w-0">
// // // // //               {/* Header */}
// // // // //               <div className="px-5 py-3.5 bg-white border-b border-gray-100 flex items-center justify-between flex-shrink-0 shadow-sm">
// // // // //                 <div className="flex items-center gap-3">
// // // // //                   <button onClick={closeChat} className="lg:hidden w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition">
// // // // //                     <FaArrowLeft size={14} />
// // // // //                   </button>
// // // // //                   <Avatar user={selectedChat.otherParticipant} size="md" />
// // // // //                   <div>
// // // // //                     <div className="flex items-center gap-2">
// // // // //                       <p className="text-sm font-bold text-gray-900">
// // // // //                         {selectedChat.otherParticipant?.name || "Unknown User"}
// // // // //                       </p>
// // // // //                       {selectedChat.isBlocked && (
// // // // //                         <span className="inline-flex items-center gap-1 text-[10px] bg-red-50 text-red-500 border border-red-200 px-1.5 py-0.5 rounded-full font-semibold">
// // // // //                           <FaBan size={8} /> Blocked
// // // // //                         </span>
// // // // //                       )}
// // // // //                     </div>
// // // // //                     <div className="flex items-center gap-1.5 mt-0.5">
// // // // //                       <p className="text-xs text-gray-400">{selectedChat.otherParticipant?.email}</p>
// // // // //                       {selectedChat.vehicleName && (
// // // // //                         <>
// // // // //                           <span className="text-gray-300">·</span>
// // // // //                           <span className="text-xs text-blue-500 flex items-center gap-1">
// // // // //                             <FaCar size={9} /> {selectedChat.vehicleName}
// // // // //                           </span>
// // // // //                         </>
// // // // //                       )}
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>
// // // // //                 <div className="flex items-center gap-2">
// // // // //                   {!selectedChat.isBlocked ? (
// // // // //                     <button
// // // // //                       onClick={() => setShowBlockConfirm(true)}
// // // // //                       className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-500 hover:bg-red-50 border border-red-100 transition"
// // // // //                     >
// // // // //                       <FaBan size={11} /> Block
// // // // //                     </button>
// // // // //                   ) : iBlockedThem ? (
// // // // //                     <button
// // // // //                       onClick={() => setShowUnblockConfirm(true)}
// // // // //                       className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-600 hover:bg-emerald-50 border border-emerald-200 transition"
// // // // //                     >
// // // // //                       <FaUnlock size={11} /> Unblock
// // // // //                     </button>
// // // // //                   ) : null}
// // // // //                 </div>
// // // // //               </div>

// // // // //               {/* Vehicle banner */}
// // // // //               {selectedChat.vehicleId && (
// // // // //                 <div className="px-5 py-2.5 bg-blue-50 border-b border-blue-100 flex items-center gap-3">
// // // // //                   <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
// // // // //                     <FaCar size={12} className="text-blue-600" />
// // // // //                   </div>
// // // // //                   <span className="text-xs font-semibold text-blue-800">
// // // // //                     {selectedChat.vehicleName || "Vehicle Inquiry"}
// // // // //                   </span>
// // // // //                 </div>
// // // // //               )}

// // // // //               {/* Block banner */}
// // // // //               {selectedChat.isBlocked && (
// // // // //                 <div className={`flex items-center justify-between px-5 py-3 border-b ${iBlockedThem ? "bg-red-50 border-red-100" : "bg-amber-50 border-amber-100"}`}>
// // // // //                   <div className="flex items-center gap-3">
// // // // //                     <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${iBlockedThem ? "bg-red-100" : "bg-amber-100"}`}>
// // // // //                       <FaBan size={13} className={iBlockedThem ? "text-red-500" : "text-amber-500"} />
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <p className={`text-xs font-bold ${iBlockedThem ? "text-red-700" : "text-amber-700"}`}>
// // // // //                         {iBlockedThem ? `You blocked ${selectedChat.otherParticipant?.name}` : "This user has restricted messaging"}
// // // // //                       </p>
// // // // //                       <p className={`text-[11px] mt-0.5 ${iBlockedThem ? "text-red-500" : "text-amber-500"}`}>
// // // // //                         {iBlockedThem ? "They cannot message you. Unblock to restore the conversation." : "You cannot send messages in this conversation."}
// // // // //                       </p>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                   {iBlockedThem && (
// // // // //                     <button
// // // // //                       onClick={() => setShowUnblockConfirm(true)}
// // // // //                       className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition ml-3 whitespace-nowrap"
// // // // //                     >
// // // // //                       <FaUnlock size={10} /> Unblock
// // // // //                     </button>
// // // // //                   )}
// // // // //                 </div>
// // // // //               )}

// // // // //               {/* Messages area */}
// // // // //               <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1 bg-gray-50">
// // // // //                 {messagesLoading ? (
// // // // //                   <div className="flex items-center justify-center h-full">
// // // // //                     <FaSpinner className="animate-spin text-blue-400 text-2xl" />
// // // // //                   </div>
// // // // //                 ) : selectedChat.isBlocked && messages.length === 0 ? (
// // // // //                   <div className="flex flex-col items-center justify-center h-full text-center px-8">
// // // // //                     <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${iBlockedThem ? "bg-red-50" : "bg-amber-50"}`}>
// // // // //                       <FaLock size={28} className={iBlockedThem ? "text-red-300" : "text-amber-300"} />
// // // // //                     </div>
// // // // //                     <p className="text-sm font-bold text-gray-600">
// // // // //                       {iBlockedThem ? "Conversation blocked" : "Messaging unavailable"}
// // // // //                     </p>
// // // // //                     <p className="text-xs text-gray-400 mt-2 leading-relaxed max-w-xs">
// // // // //                       {iBlockedThem
// // // // //                         ? `You have blocked ${selectedChat.otherParticipant?.name}. Unblock to restore the conversation.`
// // // // //                         : "This user has restricted messaging."}
// // // // //                     </p>
// // // // //                     {iBlockedThem && (
// // // // //                       <button
// // // // //                         onClick={() => setShowUnblockConfirm(true)}
// // // // //                         className="mt-5 flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition"
// // // // //                       >
// // // // //                         <FaUnlock size={12} /> Unblock {selectedChat.otherParticipant?.name}
// // // // //                       </button>
// // // // //                     )}
// // // // //                   </div>
// // // // //                 ) : messages.length === 0 ? (
// // // // //                   <div className="flex flex-col items-center justify-center h-full text-center">
// // // // //                     <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-3">
// // // // //                       <FaCommentDots className="text-blue-300 text-2xl" />
// // // // //                     </div>
// // // // //                     <p className="text-sm font-semibold text-gray-500">No messages yet</p>
// // // // //                     <p className="text-xs text-gray-400 mt-1">Start the conversation with this user</p>
// // // // //                   </div>
// // // // //                 ) : (
// // // // //                   groupedMessages.map((item) => {
// // // // //                     if (item.type === "date") {
// // // // //                       return (
// // // // //                         <div key={item.key} className="flex items-center gap-3 py-2">
// // // // //                           <div className="flex-1 h-px bg-gray-200" />
// // // // //                           <span className="text-[10px] text-gray-400 font-medium px-2.5 py-1 bg-white border border-gray-200 rounded-full whitespace-nowrap shadow-sm">
// // // // //                             {item.label}
// // // // //                           </span>
// // // // //                           <div className="flex-1 h-px bg-gray-200" />
// // // // //                         </div>
// // // // //                       );
// // // // //                     }
// // // // //                     const { msg } = item;
// // // // //                     const isOwn = msg.senderType === "admin" || msg.sender?._id === adminId;
// // // // //                     return (
// // // // //                       <div key={item.key} className={`flex items-end gap-2 ${isOwn ? "justify-end" : "justify-start"}`}>
// // // // //                         {!isOwn && (
// // // // //                           <div className="flex-shrink-0 mb-1">
// // // // //                             <Avatar user={selectedChat.otherParticipant} size="sm" />
// // // // //                           </div>
// // // // //                         )}
// // // // //                         <div className={`flex flex-col ${isOwn ? "items-end" : "items-start"} max-w-[65%]`}>
// // // // //                           <div className={`px-4 py-2.5 text-sm leading-relaxed break-words ${
// // // // //                             isOwn
// // // // //                               ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl rounded-br-sm shadow-sm"
// // // // //                               : "bg-white text-gray-800 rounded-2xl rounded-bl-sm border border-gray-100 shadow-sm"
// // // // //                           }`}>
// // // // //                             {msg.message}
// // // // //                           </div>
// // // // //                           <div className={`flex items-center gap-1 mt-1 px-1 ${isOwn ? "flex-row-reverse" : ""}`}>
// // // // //                             <span className="text-[10px] text-gray-400">
// // // // //                               {formatMsgTime(msg.createdAt)}
// // // // //                             </span>
// // // // //                             {isOwn && (
// // // // //                               <FaCheckDouble size={9} className={msg.read ? "text-blue-400" : "text-gray-300"} />
// // // // //                             )}
// // // // //                           </div>
// // // // //                         </div>
// // // // //                         {isOwn && (
// // // // //                           <div className="flex-shrink-0 mb-1">
// // // // //                             <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-[10px] font-bold">
// // // // //                               {(adminUser?.name || "A").charAt(0).toUpperCase()}
// // // // //                             </div>
// // // // //                           </div>
// // // // //                         )}
// // // // //                       </div>
// // // // //                     );
// // // // //                   })
// // // // //                 )}
// // // // //                 <div ref={messagesEndRef} />
// // // // //               </div>

// // // // //               {/* Input */}
// // // // //               <div className="px-4 py-3 bg-white border-t border-gray-100 flex-shrink-0">
// // // // //                 {!isConnected && (
// // // // //                   <p className="text-[11px] text-center text-amber-500 mb-2">
// // // // //                     Reconnecting to chat server…
// // // // //                   </p>
// // // // //                 )}
// // // // //                 {selectedChat.isBlocked ? (
// // // // //                   <div className={`flex items-center gap-3 rounded-2xl px-4 py-3 ${iBlockedThem ? "bg-red-50 border border-red-100" : "bg-amber-50 border border-amber-100"}`}>
// // // // //                     <FaLock size={14} className={iBlockedThem ? "text-red-400" : "text-amber-400"} />
// // // // //                     <p className={`text-xs flex-1 ${iBlockedThem ? "text-red-500" : "text-amber-600"}`}>
// // // // //                       {iBlockedThem ? (
// // // // //                         <>
// // // // //                           You blocked this user.{" "}
// // // // //                           <button onClick={() => setShowUnblockConfirm(true)} className="underline font-semibold hover:no-underline">
// // // // //                             Unblock to chat
// // // // //                           </button>
// // // // //                         </>
// // // // //                       ) : (
// // // // //                         "You cannot send messages in this conversation."
// // // // //                       )}
// // // // //                     </p>
// // // // //                   </div>
// // // // //                 ) : (
// // // // //                   <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-3 py-2">
// // // // //                     <button className="text-gray-400 hover:text-blue-500 transition flex-shrink-0">
// // // // //                       <FaSmile size={18} />
// // // // //                     </button>
// // // // //                     <input
// // // // //                       ref={inputRef}
// // // // //                       type="text"
// // // // //                       value={newMessage}
// // // // //                       onChange={(e) => setNewMessage(e.target.value)}
// // // // //                       onKeyPress={(e) => e.key === "Enter" && sendMessage()}
// // // // //                       placeholder="Type a reply…"
// // // // //                       className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
// // // // //                     />
// // // // //                     <button
// // // // //                       onClick={sendMessage}
// // // // //                       disabled={!newMessage.trim() || sending}
// // // // //                       className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-md transition"
// // // // //                     >
// // // // //                       {sending ? <FaSpinner className="animate-spin" size={13} /> : <FaPaperPlane size={13} />}
// // // // //                     </button>
// // // // //                   </div>
// // // // //                 )}
// // // // //               </div>
// // // // //             </div>
// // // // //           ) : (
// // // // //             <div className="flex-1 hidden lg:flex flex-col items-center justify-center bg-gray-50 text-center px-8">
// // // // //               <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center mb-5 shadow-inner">
// // // // //                 <FaComments className="text-blue-300 text-4xl" />
// // // // //               </div>
// // // // //               <p className="text-lg font-bold text-gray-600">Select a conversation</p>
// // // // //               <p className="text-sm text-gray-400 mt-2 max-w-xs">
// // // // //                 Choose a chat from the left panel to start replying to users
// // // // //               </p>
// // // // //               {totalUnread > 0 && (
// // // // //                 <div className="mt-4 px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl">
// // // // //                   <p className="text-sm font-semibold text-blue-600">
// // // // //                     {totalUnread} unread message{totalUnread !== 1 ? "s" : ""} waiting
// // // // //                   </p>
// // // // //                 </div>
// // // // //               )}
// // // // //             </div>
// // // // //           )}
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* Block Modal */}
// // // // //       {showBlockConfirm && selectedChat && (
// // // // //         <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.55)" }}>
// // // // //           <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
// // // // //             <div className="bg-gradient-to-r from-red-500 to-rose-600 px-6 pt-6 pb-10">
// // // // //               <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
// // // // //                 <FaBan size={26} className="text-white" />
// // // // //               </div>
// // // // //               <h3 className="text-white text-center text-lg font-bold">Block User?</h3>
// // // // //               <p className="text-red-100 text-center text-xs mt-1">You can unblock them anytime</p>
// // // // //             </div>
// // // // //             <div className="-mt-4 bg-white rounded-t-2xl px-6 pt-5 pb-6">
// // // // //               <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
// // // // //                 <Avatar user={selectedChat.otherParticipant} size="md" />
// // // // //                 <div>
// // // // //                   <p className="font-semibold text-gray-800 text-sm">{selectedChat.otherParticipant?.name}</p>
// // // // //                   <p className="text-xs text-gray-500">Will be blocked from messaging</p>
// // // // //                 </div>
// // // // //               </div>
// // // // //               <ul className="space-y-2 mb-5">
// // // // //                 {["They won't be able to message you", "Their messages will be hidden", "You can unblock them anytime"].map((t, i) => (
// // // // //                   <li key={i} className="flex items-center gap-2 text-xs text-gray-600">
// // // // //                     <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
// // // // //                       <FaTimes size={7} className="text-red-500" />
// // // // //                     </span>
// // // // //                     {t}
// // // // //                   </li>
// // // // //                 ))}
// // // // //               </ul>
// // // // //               <div className="flex gap-2">
// // // // //                 <button onClick={() => setShowBlockConfirm(false)} className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition font-medium">Cancel</button>
// // // // //                 <button onClick={handleBlock} disabled={blockingUser} className="flex-1 px-4 py-2.5 text-sm bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl font-semibold transition flex items-center justify-center gap-2 disabled:opacity-60">
// // // // //                   {blockingUser ? <FaSpinner className="animate-spin" size={13} /> : <FaBan size={12} />}
// // // // //                   {blockingUser ? "Blocking…" : "Block User"}
// // // // //                 </button>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}

// // // // //       {/* Unblock Modal */}
// // // // //       {showUnblockConfirm && selectedChat && (
// // // // //         <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.55)" }}>
// // // // //           <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
// // // // //             <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 pt-6 pb-10">
// // // // //               <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
// // // // //                 <FaUnlock size={24} className="text-white" />
// // // // //               </div>
// // // // //               <h3 className="text-white text-center text-lg font-bold">Unblock User?</h3>
// // // // //               <p className="text-emerald-100 text-center text-xs mt-1">Resume your conversation</p>
// // // // //             </div>
// // // // //             <div className="-mt-4 bg-white rounded-t-2xl px-6 pt-5 pb-6">
// // // // //               <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
// // // // //                 <Avatar user={selectedChat.otherParticipant} size="md" />
// // // // //                 <div>
// // // // //                   <p className="font-semibold text-gray-800 text-sm">{selectedChat.otherParticipant?.name}</p>
// // // // //                   <p className="text-xs text-gray-500">Will be unblocked</p>
// // // // //                 </div>
// // // // //               </div>
// // // // //               <ul className="space-y-2 mb-5">
// // // // //                 {["They can message you again", "Previous messages will be restored", "You can block them again anytime"].map((t, i) => (
// // // // //                   <li key={i} className="flex items-center gap-2 text-xs text-gray-600">
// // // // //                     <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
// // // // //                       <FaCheck size={7} className="text-emerald-600" />
// // // // //                     </span>
// // // // //                     {t}
// // // // //                   </li>
// // // // //                 ))}
// // // // //               </ul>
// // // // //               <div className="flex gap-2">
// // // // //                 <button onClick={() => setShowUnblockConfirm(false)} className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition font-medium">Cancel</button>
// // // // //                 <button onClick={handleUnblock} disabled={blockingUser} className="flex-1 px-4 py-2.5 text-sm bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold transition flex items-center justify-center gap-2 disabled:opacity-60">
// // // // //                   {blockingUser ? <FaSpinner className="animate-spin" size={13} /> : <FaUnlock size={12} />}
// // // // //                   {blockingUser ? "Unblocking…" : "Unblock User"}
// // // // //                 </button>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}
// // // // //     </>
// // // // //   );
// // // // // };

// // // // // export default AdminMessages;

// // // // import React, { useState, useEffect, useRef, useCallback } from "react";
// // // // import {
// // // //   FaComments,
// // // //   FaCommentDots,
// // // //   FaSearch,
// // // //   FaTimes,
// // // //   FaSync,
// // // //   FaPaperPlane,
// // // //   FaSmile,
// // // //   FaSpinner,
// // // //   FaBan,
// // // //   FaUnlock,
// // // //   FaCheck,
// // // //   FaCheckDouble,
// // // //   FaLock,
// // // //   FaArrowLeft,
// // // //   FaCar,
// // // //   FaShieldAlt,
// // // //   FaInbox,
// // // // } from "react-icons/fa";
// // // // import axios from "axios";
// // // // import { toast, ToastContainer } from "react-toastify";
// // // // import "react-toastify/dist/ReactToastify.css";
// // // // import { useSocket } from "../context/SocketContext";

// // // // // ─── Token helper ─────────────────────────────────────────────────────────────
// // // // const getToken = () =>
// // // //   localStorage.getItem("token") || sessionStorage.getItem("token");
// // // // const authHeader = () => ({ Authorization: `Bearer ${getToken()}` });

// // // // // ─── API service ──────────────────────────────────────────────────────────────
// // // // const adminChatService = {
// // // //   getAllChats: async (filter = "all", search = "") => {
// // // //     const res = await axios.get(
// // // //       `http://localhost:5000/api/admin/chats?filter=${filter}&search=${encodeURIComponent(search)}`,
// // // //       { headers: authHeader() },
// // // //     );
// // // //     return res.data;
// // // //   },
// // // //   getChat: async (chatId) => {
// // // //     const res = await axios.get(
// // // //       `http://localhost:5000/api/admin/chats/${chatId}`,
// // // //       { headers: authHeader() },
// // // //     );
// // // //     return res.data;
// // // //   },
// // // //   sendMessage: async (chatId, message) => {
// // // //     const res = await axios.post(
// // // //       `http://localhost:5000/api/admin/chats/${chatId}/message`,
// // // //       { message },
// // // //       { headers: authHeader() },
// // // //     );
// // // //     return res.data;
// // // //   },
// // // //   markAsRead: async (chatId) => {
// // // //     const res = await axios.put(
// // // //       `http://localhost:5000/api/admin/chats/${chatId}/read`,
// // // //       {},
// // // //       { headers: authHeader() },
// // // //     );
// // // //     return res.data;
// // // //   },
// // // //   blockUser: async (chatId) => {
// // // //     const res = await axios.put(
// // // //       `http://localhost:5000/api/admin/chats/${chatId}/block`,
// // // //       {},
// // // //       { headers: authHeader() },
// // // //     );
// // // //     return res.data;
// // // //   },
// // // //   unblockUser: async (chatId) => {
// // // //     const res = await axios.put(
// // // //       `http://localhost:5000/api/admin/chats/${chatId}/unblock`,
// // // //       {},
// // // //       { headers: authHeader() },
// // // //     );
// // // //     return res.data;
// // // //   },
// // // //   getUnreadCount: async () => {
// // // //     const res = await axios.get(
// // // //       `http://localhost:5000/api/admin/chats/unread/count`,
// // // //       { headers: authHeader() },
// // // //     );
// // // //     return res.data;
// // // //   },
// // // // };

// // // // // ─── Time helpers ─────────────────────────────────────────────────────────────
// // // // const formatChatTime = (date) => {
// // // //   if (!date) return "";
// // // //   const now = new Date();
// // // //   const d = new Date(date);
// // // //   const diffMs = now - d;
// // // //   const mins = Math.floor(diffMs / 60000);
// // // //   const hours = Math.floor(diffMs / 3600000);
// // // //   const days = Math.floor(diffMs / 86400000);
// // // //   if (mins < 1) return "now";
// // // //   if (mins < 60) return `${mins}m`;
// // // //   if (hours < 24) return `${hours}h`;
// // // //   if (days === 1) return "Yesterday";
// // // //   return d.toLocaleDateString();
// // // // };

// // // // const formatMsgTime = (date) =>
// // // //   new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

// // // // // ─── Avatar ───────────────────────────────────────────────────────────────────
// // // // const Avatar = ({ user, size = "md", className = "" }) => {
// // // //   const s =
// // // //     size === "sm"
// // // //       ? "w-7 h-7 text-[10px]"
// // // //       : size === "lg"
// // // //         ? "w-12 h-12 text-base"
// // // //         : "w-9 h-9 text-sm";
// // // //   if (user?.profilePhoto) {
// // // //     return (
// // // //       <img
// // // //         src={`http://localhost:5000/uploads/profiles/${user.profilePhoto}`}
// // // //         alt={user.name}
// // // //         className={`${s} rounded-full object-cover flex-shrink-0 ${className}`}
// // // //       />
// // // //     );
// // // //   }
// // // //   return (
// // // //     <div
// // // //       className={`${s} rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0 ${className}`}
// // // //     >
// // // //       {user?.name?.charAt(0)?.toUpperCase() || "?"}
// // // //     </div>
// // // //   );
// // // // };

// // // // // ─── Main Component ───────────────────────────────────────────────────────────
// // // // const AdminMessages = () => {
// // // //   const adminUser = JSON.parse(
// // // //     localStorage.getItem("user") || sessionStorage.getItem("user") || "null",
// // // //   );
// // // //   const adminId = adminUser?._id || adminUser?.id;

// // // //   // ── Socket context ──────────────────────────────────────────────────────
// // // //   const {
// // // //     isConnected,
// // // //     joinChat,
// // // //     leaveChat,
// // // //     onNewMessage,
// // // //     markRead: socketMarkRead,
// // // //   } = useSocket();

// // // //   // ── State ───────────────────────────────────────────────────────────────
// // // //   const [chats, setChats] = useState([]);
// // // //   const [filteredChats, setFilteredChats] = useState([]);
// // // //   const [chatsLoading, setChatsLoading] = useState(false);
// // // //   const [selectedChat, setSelectedChat] = useState(null);
// // // //   const [messages, setMessages] = useState([]);
// // // //   const [messagesLoading, setMessagesLoading] = useState(false);
// // // //   const [newMessage, setNewMessage] = useState("");
// // // //   const [sending, setSending] = useState(false);
// // // //   const [searchQuery, setSearchQuery] = useState("");
// // // //   const [activeFilter, setActiveFilter] = useState("all");
// // // //   const [showChatWindow, setShowChatWindow] = useState(false);
// // // //   const [showBlockConfirm, setShowBlockConfirm] = useState(false);
// // // //   const [showUnblockConfirm, setShowUnblockConfirm] = useState(false);
// // // //   const [blockingUser, setBlockingUser] = useState(false);
// // // //   const [totalUnread, setTotalUnread] = useState(0);

// // // //   const messagesEndRef = useRef(null);
// // // //   const inputRef = useRef(null);
// // // //   const selectedChatRef = useRef(null);
// // // //   const initialLoadDone = useRef(false);

// // // //   useEffect(() => {
// // // //     selectedChatRef.current = selectedChat;
// // // //   }, [selectedChat]);

// // // //   // ── Fetch unread count ─────────────────────────────────────────────────
// // // //   const fetchUnreadCount = useCallback(async () => {
// // // //     try {
// // // //       const res = await adminChatService.getUnreadCount();
// // // //       if (res.success) {
// // // //         setTotalUnread(res.count);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error fetching unread count:", error);
// // // //     }
// // // //   }, []);

// // // //   // ── Fetch chat list ─────────────────────────────────────────────────────
// // // //   const fetchChats = useCallback(async () => {
// // // //     try {
// // // //       setChatsLoading(true);
// // // //       const res = await adminChatService.getAllChats(activeFilter, searchQuery);
// // // //       if (res.success) {
// // // //         setChats(res.data);
// // // //         setFilteredChats(res.data);
// // // //         const unread = res.data.reduce(
// // // //           (acc, c) => acc + (c.unreadForAdmin || 0),
// // // //           0,
// // // //         );
// // // //         setTotalUnread(unread);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error fetching chats:", error);
// // // //       toast.error("Failed to load chats");
// // // //     } finally {
// // // //       setChatsLoading(false);
// // // //     }
// // // //   }, [activeFilter, searchQuery]);

// // // //   // ── INITIAL LOAD ONLY (NO POLLING) ──────────────────────────────────────
// // // //   useEffect(() => {
// // // //     if (!initialLoadDone.current) {
// // // //       initialLoadDone.current = true;
// // // //       fetchChats();
// // // //       fetchUnreadCount();
// // // //     }
// // // //   }, [fetchChats, fetchUnreadCount]);

// // // //   // ── Refresh only when filter or search changes ──────────────────────────
// // // //   useEffect(() => {
// // // //     if (initialLoadDone.current) {
// // // //       fetchChats();
// // // //       fetchUnreadCount();
// // // //     }
// // // //   }, [activeFilter, searchQuery, fetchChats, fetchUnreadCount]);

// // // //   // ── GLOBAL SOCKET LISTENER ── Updates sidebar in REAL-TIME ──────────────
// // // //   useEffect(() => {
// // // //     const unsubscribe = onNewMessage("*", (data) => {
// // // //       if (!data.message) return;

// // // //       // Update the sidebar preview for the affected chat INSTANTLY
// // // //       setChats((prev) =>
// // // //         prev.map((c) => {
// // // //           if (c._id !== data.chatId) return c;
// // // //           const isCurrentlyOpen = selectedChatRef.current?._id === data.chatId;
// // // //           return {
// // // //             ...c,
// // // //             lastMessage: data.message.message,
// // // //             lastMessageAt: data.message.createdAt,
// // // //             unreadForAdmin: isCurrentlyOpen ? 0 : (c.unreadForAdmin || 0) + 1,
// // // //           };
// // // //         }),
// // // //       );

// // // //       // Update total unread badge INSTANTLY
// // // //       setTotalUnread((prev) => {
// // // //         const isCurrentlyOpen = selectedChatRef.current?._id === data.chatId;
// // // //         return isCurrentlyOpen ? prev : prev + 1;
// // // //       });
// // // //     });
// // // //     return unsubscribe;
// // // //   }, [onNewMessage]);

// // // //   // ── PER-CHAT SOCKET LISTENER ── Appends messages in REAL-TIME ───────────
// // // //   useEffect(() => {
// // // //     if (!selectedChat?._id) return;
// // // //     const chatId = selectedChat._id;

// // // //     const unsubscribe = onNewMessage(chatId, (data) => {
// // // //       if (!data.message) return;

// // // //       setMessages((prev) => {
// // // //         // Prevent duplicates
// // // //         if (prev.some((m) => m._id === data.message._id)) return prev;

// // // //         // Replace optimistic temp message
// // // //         const tempIdx = prev.findIndex(
// // // //           (m) =>
// // // //             m._id?.toString().startsWith("temp-") &&
// // // //             m.message === data.message.message &&
// // // //             m.senderType === data.message.senderType,
// // // //         );
// // // //         if (tempIdx !== -1) {
// // // //           const next = [...prev];
// // // //           next[tempIdx] = data.message;
// // // //           return next;
// // // //         }
// // // //         return [...prev, data.message];
// // // //       });

// // // //       setTimeout(() => {
// // // //         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// // // //       }, 80);

// // // //       // Mark as read since we're actively viewing this chat
// // // //       adminChatService.markAsRead(chatId).catch(() => {});
// // // //       socketMarkRead(chatId);
// // // //     });

// // // //     return unsubscribe;
// // // //   }, [selectedChat?._id, onNewMessage, socketMarkRead]);

// // // //   // ── Auto-scroll on new messages ─────────────────────────────────────────
// // // //   useEffect(() => {
// // // //     if (messagesEndRef.current) {
// // // //       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
// // // //     }
// // // //   }, [messages]);

// // // //   // ── Local search filter ─────────────────────────────────────────────────
// // // //   useEffect(() => {
// // // //     if (!searchQuery.trim()) {
// // // //       setFilteredChats(chats);
// // // //       return;
// // // //     }
// // // //     const q = searchQuery.toLowerCase();
// // // //     setFilteredChats(
// // // //       chats.filter((c) => {
// // // //         const name = (c.otherParticipant?.name || "").toLowerCase();
// // // //         const vehicle = (c.vehicleName || "").toLowerCase();
// // // //         const last = (c.lastMessage || "").toLowerCase();
// // // //         return name.includes(q) || vehicle.includes(q) || last.includes(q);
// // // //       }),
// // // //     );
// // // //   }, [searchQuery, chats]);

// // // //   // ── Open chat ───────────────────────────────────────────────────────────
// // // //   const openChat = async (chat) => {
// // // //     // Leave previous room
// // // //     if (selectedChatRef.current?._id) {
// // // //       leaveChat(selectedChatRef.current._id);
// // // //     }

// // // //     setSelectedChat(chat);
// // // //     setShowChatWindow(true);
// // // //     setMessages([]);

// // // //     // Join the socket room for this chat
// // // //     joinChat(chat._id);

// // // //     if (!chat.isBlocked) {
// // // //       try {
// // // //         setMessagesLoading(true);
// // // //         const res = await adminChatService.getChat(chat._id);
// // // //         if (res.success) {
// // // //           setMessages(res.data.messages || []);
// // // //           // Mark as read
// // // //           await adminChatService.markAsRead(chat._id);
// // // //           socketMarkRead(chat._id);
// // // //           // Clear unread badge for this chat
// // // //           setChats((prev) =>
// // // //             prev.map((c) =>
// // // //               c._id !== chat._id ? c : { ...c, unreadForAdmin: 0 },
// // // //             ),
// // // //           );
// // // //           await fetchUnreadCount();
// // // //         }
// // // //       } catch (error) {
// // // //         console.error("Error loading messages:", error);
// // // //         toast.error("Failed to load messages");
// // // //       } finally {
// // // //         setMessagesLoading(false);
// // // //       }
// // // //     }

// // // //     setTimeout(() => inputRef.current?.focus(), 200);
// // // //   };

// // // //   // ── Close chat ──────────────────────────────────────────────────────────
// // // //   const closeChat = () => {
// // // //     if (selectedChatRef.current?._id) {
// // // //       leaveChat(selectedChatRef.current._id);
// // // //     }
// // // //     setShowChatWindow(false);
// // // //     setSelectedChat(null);
// // // //     setMessages([]);
// // // //     setNewMessage("");
// // // //   };

// // // //   // ── Send message ────────────────────────────────────────────────────────
// // // //   const sendMessage = async () => {
// // // //     if (!newMessage.trim() || sending || selectedChat?.isBlocked) return;
// // // //     const text = newMessage.trim();
// // // //     setSending(true);

// // // //     // Optimistic UI - show message immediately
// // // //     const tempMsg = {
// // // //       _id: `temp-${Date.now()}`,
// // // //       message: text,
// // // //       senderType: "admin",
// // // //       read: false,
// // // //       delivered: false,
// // // //       createdAt: new Date(),
// // // //       sender: adminUser,
// // // //     };
// // // //     setMessages((prev) => [...prev, tempMsg]);
// // // //     setNewMessage("");

// // // //     setTimeout(() => {
// // // //       messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// // // //     }, 100);

// // // //     try {
// // // //       // Send via API - backend will emit socket event
// // // //       const res = await adminChatService.sendMessage(selectedChat._id, text);
// // // //       if (res.success) {
// // // //         // Replace temp message with real one
// // // //         setMessages((prev) =>
// // // //           prev.map((m) => (m._id === tempMsg._id ? res.data : m)),
// // // //         );
// // // //         // Update sidebar without full refresh
// // // //         setChats((prev) =>
// // // //           prev.map((c) =>
// // // //             c._id !== selectedChat._id
// // // //               ? c
// // // //               : { ...c, lastMessage: text, lastMessageAt: new Date() },
// // // //           ),
// // // //         );
// // // //       } else {
// // // //         // Remove temp message on error
// // // //         setMessages((prev) => prev.filter((m) => m._id !== tempMsg._id));
// // // //         toast.error("Failed to send message");
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error sending message:", error);
// // // //       setMessages((prev) => prev.filter((m) => m._id !== tempMsg._id));
// // // //       toast.error("Failed to send message");
// // // //     } finally {
// // // //       setSending(false);
// // // //     }
// // // //   };

// // // //   // ── Block user ──────────────────────────────────────────────────────────
// // // //   const handleBlock = async () => {
// // // //     setBlockingUser(true);
// // // //     try {
// // // //       const res = await adminChatService.blockUser(selectedChat._id);
// // // //       if (res.success) {
// // // //         toast.success(
// // // //           `${selectedChat.otherParticipant?.name} has been blocked`,
// // // //         );
// // // //         setSelectedChat((p) => ({ ...p, isBlocked: true, blockedBy: adminId }));
// // // //         setMessages([]);
// // // //         fetchChats();
// // // //         fetchUnreadCount();
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error blocking user:", error);
// // // //       toast.error("Failed to block user");
// // // //     } finally {
// // // //       setBlockingUser(false);
// // // //       setShowBlockConfirm(false);
// // // //     }
// // // //   };

// // // //   // ── Unblock user ────────────────────────────────────────────────────────
// // // //   const handleUnblock = async () => {
// // // //     setBlockingUser(true);
// // // //     try {
// // // //       const res = await adminChatService.unblockUser(selectedChat._id);
// // // //       if (res.success) {
// // // //         toast.success(
// // // //           `${selectedChat.otherParticipant?.name} has been unblocked`,
// // // //         );
// // // //         setSelectedChat((p) => ({ ...p, isBlocked: false, blockedBy: null }));
// // // //         const msgRes = await adminChatService.getChat(selectedChat._id);
// // // //         if (msgRes.success) setMessages(msgRes.data.messages || []);
// // // //         fetchChats();
// // // //         fetchUnreadCount();
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error unblocking user:", error);
// // // //       toast.error("Failed to unblock user");
// // // //     } finally {
// // // //       setBlockingUser(false);
// // // //       setShowUnblockConfirm(false);
// // // //     }
// // // //   };

// // // //   // ── Manual refresh (user triggered only) ────────────────────────────────
// // // //   const handleManualRefresh = () => {
// // // //     fetchChats();
// // // //     fetchUnreadCount();
// // // //     toast.info("Refreshed messages");
// // // //   };

// // // //   // ── Derived state ───────────────────────────────────────────────────────
// // // //   const getUnread = (chat) => chat.unreadForAdmin || 0;
// // // //   const iBlockedThem =
// // // //     selectedChat?.isBlocked && selectedChat?.blockedBy === adminId;

// // // //   const filterTabs = [
// // // //     { id: "all", label: "All", count: chats.length },
// // // //     {
// // // //       id: "vehicle",
// // // //       label: "Vehicle Chats",
// // // //       count: chats.filter((c) => c.chatType === "vehicle").length,
// // // //     },
// // // //     {
// // // //       id: "support",
// // // //       label: "Support",
// // // //       count: chats.filter((c) => c.chatType === "support").length,
// // // //     },
// // // //     {
// // // //       id: "unread",
// // // //       label: "Unread",
// // // //       count: chats.filter((c) => getUnread(c) > 0).length,
// // // //     },
// // // //   ];

// // // //   // ── Group messages by date ──────────────────────────────────────────────
// // // //   const groupedMessages = (() => {
// // // //     const groups = [];
// // // //     let lastDate = null;
// // // //     messages.forEach((msg, i) => {
// // // //       const day = new Date(msg.createdAt).toDateString();
// // // //       if (day !== lastDate) {
// // // //         const today = new Date().toDateString();
// // // //         const yesterday = new Date(Date.now() - 86400000).toDateString();
// // // //         groups.push({
// // // //           type: "date",
// // // //           label:
// // // //             day === today ? "Today" : day === yesterday ? "Yesterday" : day,
// // // //           key: `date-${i}`,
// // // //         });
// // // //         lastDate = day;
// // // //       }
// // // //       groups.push({ type: "msg", msg, key: msg._id || i });
// // // //     });
// // // //     return groups;
// // // //   })();

// // // //   return (
// // // //     <>
// // // //       <ToastContainer position="top-right" autoClose={3000} />

// // // //       <div
// // // //         className="flex flex-col bg-gradient-to-br from-gray-50 to-gray-100"
// // // //         style={{ height: "100vh" }}
// // // //       >
// // // //         {/* Header */}
// // // //         <div className="px-8 py-5 bg-white/80 backdrop-blur-md shadow-sm flex-shrink-0">
// // // //           <div className="flex justify-between items-center">
// // // //             <div>
// // // //               <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent flex items-center gap-2">
// // // //                 <FaComments className="text-blue-600" />
// // // //                 Messages
// // // //                 {totalUnread > 0 && (
// // // //                   <span className="ml-1 px-2 py-0.5 bg-blue-600 text-white text-xs font-bold rounded-full">
// // // //                     {totalUnread > 99 ? "99+" : totalUnread}
// // // //                   </span>
// // // //                 )}
// // // //               </h1>
// // // //               <p className="text-sm text-gray-500 mt-1">
// // // //                 Manage all user conversations and vehicle inquiries
// // // //                 {isConnected ? (
// // // //                   <span className="ml-2 inline-flex items-center gap-1 text-green-500 text-xs">
// // // //                     <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
// // // //                     Live
// // // //                   </span>
// // // //                 ) : (
// // // //                   <span className="ml-2 inline-flex items-center gap-1 text-amber-500 text-xs">
// // // //                     <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
// // // //                     Reconnecting…
// // // //                   </span>
// // // //                 )}
// // // //               </p>
// // // //             </div>
// // // //             <button
// // // //               onClick={handleManualRefresh}
// // // //               className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition shadow-sm"
// // // //             >
// // // //               <FaSync
// // // //                 className={
// // // //                   chatsLoading ? "animate-spin text-blue-500" : "text-gray-400"
// // // //                 }
// // // //                 size={13}
// // // //               />
// // // //               Refresh
// // // //             </button>
// // // //           </div>
// // // //         </div>

// // // //         {/* Chat panel */}
// // // //         <div className="flex flex-1 min-h-0 m-6 rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-white">
// // // //           {/* LEFT: Chat list */}
// // // //           <div
// // // //             className={`${showChatWindow ? "hidden lg:flex" : "flex"} flex-col w-full lg:w-[340px] border-r border-gray-100 flex-shrink-0`}
// // // //           >
// // // //             <div className="p-4 border-b border-gray-100 space-y-3">
// // // //               <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
// // // //                 <FaSearch size={12} className="text-gray-400 flex-shrink-0" />
// // // //                 <input
// // // //                   value={searchQuery}
// // // //                   onChange={(e) => setSearchQuery(e.target.value)}
// // // //                   placeholder="Search conversations, users…"
// // // //                   className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
// // // //                 />
// // // //                 {searchQuery && (
// // // //                   <button
// // // //                     onClick={() => setSearchQuery("")}
// // // //                     className="text-gray-400 hover:text-gray-600"
// // // //                   >
// // // //                     <FaTimes size={11} />
// // // //                   </button>
// // // //                 )}
// // // //               </div>
// // // //               <div className="flex gap-1 overflow-x-auto">
// // // //                 {filterTabs.map((tab) => (
// // // //                   <button
// // // //                     key={tab.id}
// // // //                     onClick={() => setActiveFilter(tab.id)}
// // // //                     className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
// // // //                       activeFilter === tab.id
// // // //                         ? "bg-blue-600 text-white shadow-sm"
// // // //                         : "bg-gray-100 text-gray-500 hover:bg-gray-200"
// // // //                     }`}
// // // //                   >
// // // //                     {tab.label}
// // // //                     {tab.count > 0 && (
// // // //                       <span
// // // //                         className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
// // // //                           activeFilter === tab.id
// // // //                             ? "bg-white/20 text-white"
// // // //                             : "bg-gray-300 text-gray-600"
// // // //                         }`}
// // // //                       >
// // // //                         {tab.count}
// // // //                       </span>
// // // //                     )}
// // // //                   </button>
// // // //                 ))}
// // // //               </div>
// // // //             </div>

// // // //             <div className="flex-1 overflow-y-auto">
// // // //               {chatsLoading && chats.length === 0 ? (
// // // //                 <div className="flex items-center justify-center h-32">
// // // //                   <FaSpinner className="animate-spin text-blue-400 text-xl" />
// // // //                 </div>
// // // //               ) : filteredChats.length === 0 ? (
// // // //                 <div className="flex flex-col items-center justify-center h-full py-12 text-center px-6">
// // // //                   <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-3">
// // // //                     <FaInbox className="text-blue-300 text-2xl" />
// // // //                   </div>
// // // //                   <p className="text-sm font-semibold text-gray-600">
// // // //                     {searchQuery ? "No results found" : "No conversations yet"}
// // // //                   </p>
// // // //                   <p className="text-xs text-gray-400 mt-1">
// // // //                     {searchQuery
// // // //                       ? "Try a different search term"
// // // //                       : "User conversations will appear here"}
// // // //                   </p>
// // // //                 </div>
// // // //               ) : (
// // // //                 filteredChats.map((chat) => {
// // // //                   const unread = getUnread(chat);
// // // //                   const isSelected =
// // // //                     selectedChat?._id === chat._id && showChatWindow;
// // // //                   const isBlocked = chat.isBlocked;
// // // //                   const isVehicle = chat.chatType === "vehicle";
// // // //                   return (
// // // //                     <div
// // // //                       key={chat._id}
// // // //                       onClick={() => openChat(chat)}
// // // //                       className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer transition-all border-b border-gray-50 ${
// // // //                         isSelected
// // // //                           ? "bg-blue-50 border-l-[3px] border-l-blue-500"
// // // //                           : "hover:bg-gray-50 border-l-[3px] border-l-transparent"
// // // //                       } ${isBlocked ? "opacity-60" : ""}`}
// // // //                     >
// // // //                       <div className="relative flex-shrink-0">
// // // //                         <Avatar user={chat.otherParticipant} size="md" />
// // // //                         {isBlocked && (
// // // //                           <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center shadow-sm">
// // // //                             <FaBan size={7} />
// // // //                           </span>
// // // //                         )}
// // // //                         {unread > 0 && !isBlocked && (
// // // //                           <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-blue-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
// // // //                             {unread > 9 ? "9+" : unread}
// // // //                           </span>
// // // //                         )}
// // // //                       </div>
// // // //                       <div className="flex-1 min-w-0">
// // // //                         <div className="flex items-baseline justify-between gap-1 mb-0.5">
// // // //                           <span
// // // //                             className={`text-sm font-semibold truncate ${unread > 0 ? "text-gray-900" : "text-gray-700"}`}
// // // //                           >
// // // //                             {chat.otherParticipant?.name || "Unknown User"}
// // // //                           </span>
// // // //                           <span className="text-[10px] text-gray-400 flex-shrink-0">
// // // //                             {formatChatTime(
// // // //                               chat.lastMessageAt || chat.updatedAt,
// // // //                             )}
// // // //                           </span>
// // // //                         </div>
// // // //                         <p
// // // //                           className={`text-xs truncate ${unread > 0 && !isBlocked ? "text-gray-700 font-medium" : "text-gray-400"}`}
// // // //                         >
// // // //                           {isBlocked
// // // //                             ? "Conversation blocked"
// // // //                             : chat.lastMessage || "No messages yet"}
// // // //                         </p>
// // // //                         <div className="flex items-center gap-1.5 mt-1">
// // // //                           {isVehicle ? (
// // // //                             <span className="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded-full font-semibold bg-blue-50 text-blue-600 uppercase tracking-wide">
// // // //                               <FaCar size={7} /> Vehicle
// // // //                             </span>
// // // //                           ) : (
// // // //                             <span className="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded-full font-semibold bg-purple-50 text-purple-600 uppercase tracking-wide">
// // // //                               <FaShieldAlt size={7} /> Support
// // // //                             </span>
// // // //                           )}
// // // //                           {chat.vehicleName && (
// // // //                             <span className="text-[10px] text-gray-400 truncate">
// // // //                               · {chat.vehicleName}
// // // //                             </span>
// // // //                           )}
// // // //                           {isBlocked && (
// // // //                             <span className="text-[9px] text-red-500 font-bold uppercase">
// // // //                               Blocked
// // // //                             </span>
// // // //                           )}
// // // //                         </div>
// // // //                       </div>
// // // //                     </div>
// // // //                   );
// // // //                 })
// // // //               )}
// // // //             </div>

// // // //             <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
// // // //               <span className="text-xs text-gray-500">
// // // //                 {chats.length} conversation{chats.length !== 1 ? "s" : ""}
// // // //               </span>
// // // //               {totalUnread > 0 && (
// // // //                 <span className="text-xs font-semibold text-blue-600">
// // // //                   {totalUnread} unread
// // // //                 </span>
// // // //               )}
// // // //             </div>
// // // //           </div>

// // // //           {/* RIGHT: Chat window */}
// // // //           {showChatWindow && selectedChat ? (
// // // //             <div className="flex-1 flex flex-col min-w-0">
// // // //               {/* Header */}
// // // //               <div className="px-5 py-3.5 bg-white border-b border-gray-100 flex items-center justify-between flex-shrink-0 shadow-sm">
// // // //                 <div className="flex items-center gap-3">
// // // //                   <button
// // // //                     onClick={closeChat}
// // // //                     className="lg:hidden w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition"
// // // //                   >
// // // //                     <FaArrowLeft size={14} />
// // // //                   </button>
// // // //                   <Avatar user={selectedChat.otherParticipant} size="md" />
// // // //                   <div>
// // // //                     <div className="flex items-center gap-2">
// // // //                       <p className="text-sm font-bold text-gray-900">
// // // //                         {selectedChat.otherParticipant?.name || "Unknown User"}
// // // //                       </p>
// // // //                       {selectedChat.isBlocked && (
// // // //                         <span className="inline-flex items-center gap-1 text-[10px] bg-red-50 text-red-500 border border-red-200 px-1.5 py-0.5 rounded-full font-semibold">
// // // //                           <FaBan size={8} /> Blocked
// // // //                         </span>
// // // //                       )}
// // // //                     </div>
// // // //                     <div className="flex items-center gap-1.5 mt-0.5">
// // // //                       <p className="text-xs text-gray-400">
// // // //                         {selectedChat.otherParticipant?.email}
// // // //                       </p>
// // // //                       {selectedChat.vehicleName && (
// // // //                         <>
// // // //                           <span className="text-gray-300">·</span>
// // // //                           <span className="text-xs text-blue-500 flex items-center gap-1">
// // // //                             <FaCar size={9} /> {selectedChat.vehicleName}
// // // //                           </span>
// // // //                         </>
// // // //                       )}
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //                 <div className="flex items-center gap-2">
// // // //                   {!selectedChat.isBlocked ? (
// // // //                     <button
// // // //                       onClick={() => setShowBlockConfirm(true)}
// // // //                       className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-500 hover:bg-red-50 border border-red-100 transition"
// // // //                     >
// // // //                       <FaBan size={11} /> Block
// // // //                     </button>
// // // //                   ) : iBlockedThem ? (
// // // //                     <button
// // // //                       onClick={() => setShowUnblockConfirm(true)}
// // // //                       className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-600 hover:bg-emerald-50 border border-emerald-200 transition"
// // // //                     >
// // // //                       <FaUnlock size={11} /> Unblock
// // // //                     </button>
// // // //                   ) : null}
// // // //                 </div>
// // // //               </div>

// // // //               {/* Vehicle banner */}
// // // //               {selectedChat.vehicleId && (
// // // //                 <div className="px-5 py-2.5 bg-blue-50 border-b border-blue-100 flex items-center gap-3">
// // // //                   <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
// // // //                     <FaCar size={12} className="text-blue-600" />
// // // //                   </div>
// // // //                   <span className="text-xs font-semibold text-blue-800">
// // // //                     {selectedChat.vehicleName || "Vehicle Inquiry"}
// // // //                   </span>
// // // //                 </div>
// // // //               )}

// // // //               {/* Block banner */}
// // // //               {selectedChat.isBlocked && (
// // // //                 <div
// // // //                   className={`flex items-center justify-between px-5 py-3 border-b ${iBlockedThem ? "bg-red-50 border-red-100" : "bg-amber-50 border-amber-100"}`}
// // // //                 >
// // // //                   <div className="flex items-center gap-3">
// // // //                     <div
// // // //                       className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${iBlockedThem ? "bg-red-100" : "bg-amber-100"}`}
// // // //                     >
// // // //                       <FaBan
// // // //                         size={13}
// // // //                         className={
// // // //                           iBlockedThem ? "text-red-500" : "text-amber-500"
// // // //                         }
// // // //                       />
// // // //                     </div>
// // // //                     <div>
// // // //                       <p
// // // //                         className={`text-xs font-bold ${iBlockedThem ? "text-red-700" : "text-amber-700"}`}
// // // //                       >
// // // //                         {iBlockedThem
// // // //                           ? `You blocked ${selectedChat.otherParticipant?.name}`
// // // //                           : "This user has restricted messaging"}
// // // //                       </p>
// // // //                       <p
// // // //                         className={`text-[11px] mt-0.5 ${iBlockedThem ? "text-red-500" : "text-amber-500"}`}
// // // //                       >
// // // //                         {iBlockedThem
// // // //                           ? "They cannot message you. Unblock to restore the conversation."
// // // //                           : "You cannot send messages in this conversation."}
// // // //                       </p>
// // // //                     </div>
// // // //                   </div>
// // // //                   {iBlockedThem && (
// // // //                     <button
// // // //                       onClick={() => setShowUnblockConfirm(true)}
// // // //                       className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition ml-3 whitespace-nowrap"
// // // //                     >
// // // //                       <FaUnlock size={10} /> Unblock
// // // //                     </button>
// // // //                   )}
// // // //                 </div>
// // // //               )}

// // // //               {/* Messages area */}
// // // //               <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1 bg-gray-50">
// // // //                 {messagesLoading ? (
// // // //                   <div className="flex items-center justify-center h-full">
// // // //                     <FaSpinner className="animate-spin text-blue-400 text-2xl" />
// // // //                   </div>
// // // //                 ) : selectedChat.isBlocked && messages.length === 0 ? (
// // // //                   <div className="flex flex-col items-center justify-center h-full text-center px-8">
// // // //                     <div
// // // //                       className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${iBlockedThem ? "bg-red-50" : "bg-amber-50"}`}
// // // //                     >
// // // //                       <FaLock
// // // //                         size={28}
// // // //                         className={
// // // //                           iBlockedThem ? "text-red-300" : "text-amber-300"
// // // //                         }
// // // //                       />
// // // //                     </div>
// // // //                     <p className="text-sm font-bold text-gray-600">
// // // //                       {iBlockedThem
// // // //                         ? "Conversation blocked"
// // // //                         : "Messaging unavailable"}
// // // //                     </p>
// // // //                     <p className="text-xs text-gray-400 mt-2 leading-relaxed max-w-xs">
// // // //                       {iBlockedThem
// // // //                         ? `You have blocked ${selectedChat.otherParticipant?.name}. Unblock to restore the conversation.`
// // // //                         : "This user has restricted messaging."}
// // // //                     </p>
// // // //                     {iBlockedThem && (
// // // //                       <button
// // // //                         onClick={() => setShowUnblockConfirm(true)}
// // // //                         className="mt-5 flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition"
// // // //                       >
// // // //                         <FaUnlock size={12} /> Unblock{" "}
// // // //                         {selectedChat.otherParticipant?.name}
// // // //                       </button>
// // // //                     )}
// // // //                   </div>
// // // //                 ) : messages.length === 0 ? (
// // // //                   <div className="flex flex-col items-center justify-center h-full text-center">
// // // //                     <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-3">
// // // //                       <FaCommentDots className="text-blue-300 text-2xl" />
// // // //                     </div>
// // // //                     <p className="text-sm font-semibold text-gray-500">
// // // //                       No messages yet
// // // //                     </p>
// // // //                     <p className="text-xs text-gray-400 mt-1">
// // // //                       Start the conversation with this user
// // // //                     </p>
// // // //                   </div>
// // // //                 ) : (
// // // //                   groupedMessages.map((item) => {
// // // //                     if (item.type === "date") {
// // // //                       return (
// // // //                         <div
// // // //                           key={item.key}
// // // //                           className="flex items-center gap-3 py-2"
// // // //                         >
// // // //                           <div className="flex-1 h-px bg-gray-200" />
// // // //                           <span className="text-[10px] text-gray-400 font-medium px-2.5 py-1 bg-white border border-gray-200 rounded-full whitespace-nowrap shadow-sm">
// // // //                             {item.label}
// // // //                           </span>
// // // //                           <div className="flex-1 h-px bg-gray-200" />
// // // //                         </div>
// // // //                       );
// // // //                     }
// // // //                     const { msg } = item;
// // // //                     const isOwn =
// // // //                       msg.senderType === "admin" || msg.sender?._id === adminId;
// // // //                     return (
// // // //                       <div
// // // //                         key={item.key}
// // // //                         className={`flex items-end gap-2 ${isOwn ? "justify-end" : "justify-start"}`}
// // // //                       >
// // // //                         {!isOwn && (
// // // //                           <div className="flex-shrink-0 mb-1">
// // // //                             <Avatar
// // // //                               user={selectedChat.otherParticipant}
// // // //                               size="sm"
// // // //                             />
// // // //                           </div>
// // // //                         )}
// // // //                         <div
// // // //                           className={`flex flex-col ${isOwn ? "items-end" : "items-start"} max-w-[65%]`}
// // // //                         >
// // // //                           <div
// // // //                             className={`px-4 py-2.5 text-sm leading-relaxed break-words ${
// // // //                               isOwn
// // // //                                 ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl rounded-br-sm shadow-sm"
// // // //                                 : "bg-white text-gray-800 rounded-2xl rounded-bl-sm border border-gray-100 shadow-sm"
// // // //                             }`}
// // // //                           >
// // // //                             {msg.message}
// // // //                           </div>
// // // //                           <div
// // // //                             className={`flex items-center gap-1 mt-1 px-1 ${isOwn ? "flex-row-reverse" : ""}`}
// // // //                           >
// // // //                             <span className="text-[10px] text-gray-400">
// // // //                               {formatMsgTime(msg.createdAt)}
// // // //                             </span>
// // // //                             {isOwn && (
// // // //                               <FaCheckDouble
// // // //                                 size={9}
// // // //                                 className={
// // // //                                   msg.read ? "text-blue-400" : "text-gray-300"
// // // //                                 }
// // // //                               />
// // // //                             )}
// // // //                           </div>
// // // //                         </div>
// // // //                         {isOwn && (
// // // //                           <div className="flex-shrink-0 mb-1">
// // // //                             <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-[10px] font-bold">
// // // //                               {(adminUser?.name || "A").charAt(0).toUpperCase()}
// // // //                             </div>
// // // //                           </div>
// // // //                         )}
// // // //                       </div>
// // // //                     );
// // // //                   })
// // // //                 )}
// // // //                 <div ref={messagesEndRef} />
// // // //               </div>

// // // //               {/* Input */}
// // // //               <div className="px-4 py-3 bg-white border-t border-gray-100 flex-shrink-0">
// // // //                 {!isConnected && (
// // // //                   <p className="text-[11px] text-center text-amber-500 mb-2">
// // // //                     Reconnecting to chat server…
// // // //                   </p>
// // // //                 )}
// // // //                 {selectedChat.isBlocked ? (
// // // //                   <div
// // // //                     className={`flex items-center gap-3 rounded-2xl px-4 py-3 ${iBlockedThem ? "bg-red-50 border border-red-100" : "bg-amber-50 border border-amber-100"}`}
// // // //                   >
// // // //                     <FaLock
// // // //                       size={14}
// // // //                       className={
// // // //                         iBlockedThem ? "text-red-400" : "text-amber-400"
// // // //                       }
// // // //                     />
// // // //                     <p
// // // //                       className={`text-xs flex-1 ${iBlockedThem ? "text-red-500" : "text-amber-600"}`}
// // // //                     >
// // // //                       {iBlockedThem ? (
// // // //                         <>
// // // //                           You blocked this user.{" "}
// // // //                           <button
// // // //                             onClick={() => setShowUnblockConfirm(true)}
// // // //                             className="underline font-semibold hover:no-underline"
// // // //                           >
// // // //                             Unblock to chat
// // // //                           </button>
// // // //                         </>
// // // //                       ) : (
// // // //                         "You cannot send messages in this conversation."
// // // //                       )}
// // // //                     </p>
// // // //                   </div>
// // // //                 ) : (
// // // //                   <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-3 py-2">
// // // //                     <button className="text-gray-400 hover:text-blue-500 transition flex-shrink-0">
// // // //                       <FaSmile size={18} />
// // // //                     </button>
// // // //                     <input
// // // //                       ref={inputRef}
// // // //                       type="text"
// // // //                       value={newMessage}
// // // //                       onChange={(e) => setNewMessage(e.target.value)}
// // // //                       onKeyPress={(e) => e.key === "Enter" && sendMessage()}
// // // //                       placeholder="Type a reply…"
// // // //                       className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
// // // //                     />
// // // //                     <button
// // // //                       onClick={sendMessage}
// // // //                       disabled={!newMessage.trim() || sending}
// // // //                       className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-md transition"
// // // //                     >
// // // //                       {sending ? (
// // // //                         <FaSpinner className="animate-spin" size={13} />
// // // //                       ) : (
// // // //                         <FaPaperPlane size={13} />
// // // //                       )}
// // // //                     </button>
// // // //                   </div>
// // // //                 )}
// // // //               </div>
// // // //             </div>
// // // //           ) : (
// // // //             <div className="flex-1 hidden lg:flex flex-col items-center justify-center bg-gray-50 text-center px-8">
// // // //               <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center mb-5 shadow-inner">
// // // //                 <FaComments className="text-blue-300 text-4xl" />
// // // //               </div>
// // // //               <p className="text-lg font-bold text-gray-600">
// // // //                 Select a conversation
// // // //               </p>
// // // //               <p className="text-sm text-gray-400 mt-2 max-w-xs">
// // // //                 Choose a chat from the left panel to start replying to users
// // // //               </p>
// // // //               {totalUnread > 0 && (
// // // //                 <div className="mt-4 px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl">
// // // //                   <p className="text-sm font-semibold text-blue-600">
// // // //                     {totalUnread} unread message{totalUnread !== 1 ? "s" : ""}{" "}
// // // //                     waiting
// // // //                   </p>
// // // //                 </div>
// // // //               )}
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //       </div>

// // // //       {/* Block Modal */}
// // // //       {showBlockConfirm && selectedChat && (
// // // //         <div
// // // //           className="fixed inset-0 z-[200] flex items-center justify-center p-4"
// // // //           style={{ background: "rgba(0,0,0,0.55)" }}
// // // //         >
// // // //           <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
// // // //             <div className="bg-gradient-to-r from-red-500 to-rose-600 px-6 pt-6 pb-10">
// // // //               <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
// // // //                 <FaBan size={26} className="text-white" />
// // // //               </div>
// // // //               <h3 className="text-white text-center text-lg font-bold">
// // // //                 Block User?
// // // //               </h3>
// // // //               <p className="text-red-100 text-center text-xs mt-1">
// // // //                 You can unblock them anytime
// // // //               </p>
// // // //             </div>
// // // //             <div className="-mt-4 bg-white rounded-t-2xl px-6 pt-5 pb-6">
// // // //               <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
// // // //                 <Avatar user={selectedChat.otherParticipant} size="md" />
// // // //                 <div>
// // // //                   <p className="font-semibold text-gray-800 text-sm">
// // // //                     {selectedChat.otherParticipant?.name}
// // // //                   </p>
// // // //                   <p className="text-xs text-gray-500">
// // // //                     Will be blocked from messaging
// // // //                   </p>
// // // //                 </div>
// // // //               </div>
// // // //               <ul className="space-y-2 mb-5">
// // // //                 {[
// // // //                   "They won't be able to message you",
// // // //                   "Their messages will be hidden",
// // // //                   "You can unblock them anytime",
// // // //                 ].map((t, i) => (
// // // //                   <li
// // // //                     key={i}
// // // //                     className="flex items-center gap-2 text-xs text-gray-600"
// // // //                   >
// // // //                     <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
// // // //                       <FaTimes size={7} className="text-red-500" />
// // // //                     </span>
// // // //                     {t}
// // // //                   </li>
// // // //                 ))}
// // // //               </ul>
// // // //               <div className="flex gap-2">
// // // //                 <button
// // // //                   onClick={() => setShowBlockConfirm(false)}
// // // //                   className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition font-medium"
// // // //                 >
// // // //                   Cancel
// // // //                 </button>
// // // //                 <button
// // // //                   onClick={handleBlock}
// // // //                   disabled={blockingUser}
// // // //                   className="flex-1 px-4 py-2.5 text-sm bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl font-semibold transition flex items-center justify-center gap-2 disabled:opacity-60"
// // // //                 >
// // // //                   {blockingUser ? (
// // // //                     <FaSpinner className="animate-spin" size={13} />
// // // //                   ) : (
// // // //                     <FaBan size={12} />
// // // //                   )}
// // // //                   {blockingUser ? "Blocking…" : "Block User"}
// // // //                 </button>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {/* Unblock Modal */}
// // // //       {showUnblockConfirm && selectedChat && (
// // // //         <div
// // // //           className="fixed inset-0 z-[200] flex items-center justify-center p-4"
// // // //           style={{ background: "rgba(0,0,0,0.55)" }}
// // // //         >
// // // //           <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
// // // //             <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 pt-6 pb-10">
// // // //               <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
// // // //                 <FaUnlock size={24} className="text-white" />
// // // //               </div>
// // // //               <h3 className="text-white text-center text-lg font-bold">
// // // //                 Unblock User?
// // // //               </h3>
// // // //               <p className="text-emerald-100 text-center text-xs mt-1">
// // // //                 Resume your conversation
// // // //               </p>
// // // //             </div>
// // // //             <div className="-mt-4 bg-white rounded-t-2xl px-6 pt-5 pb-6">
// // // //               <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
// // // //                 <Avatar user={selectedChat.otherParticipant} size="md" />
// // // //                 <div>
// // // //                   <p className="font-semibold text-gray-800 text-sm">
// // // //                     {selectedChat.otherParticipant?.name}
// // // //                   </p>
// // // //                   <p className="text-xs text-gray-500">Will be unblocked</p>
// // // //                 </div>
// // // //               </div>
// // // //               <ul className="space-y-2 mb-5">
// // // //                 {[
// // // //                   "They can message you again",
// // // //                   "Previous messages will be restored",
// // // //                   "You can block them again anytime",
// // // //                 ].map((t, i) => (
// // // //                   <li
// // // //                     key={i}
// // // //                     className="flex items-center gap-2 text-xs text-gray-600"
// // // //                   >
// // // //                     <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
// // // //                       <FaCheck size={7} className="text-emerald-600" />
// // // //                     </span>
// // // //                     {t}
// // // //                   </li>
// // // //                 ))}
// // // //               </ul>
// // // //               <div className="flex gap-2">
// // // //                 <button
// // // //                   onClick={() => setShowUnblockConfirm(false)}
// // // //                   className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition font-medium"
// // // //                 >
// // // //                   Cancel
// // // //                 </button>
// // // //                 <button
// // // //                   onClick={handleUnblock}
// // // //                   disabled={blockingUser}
// // // //                   className="flex-1 px-4 py-2.5 text-sm bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold transition flex items-center justify-center gap-2 disabled:opacity-60"
// // // //                 >
// // // //                   {blockingUser ? (
// // // //                     <FaSpinner className="animate-spin" size={13} />
// // // //                   ) : (
// // // //                     <FaUnlock size={12} />
// // // //                   )}
// // // //                   {blockingUser ? "Unblocking…" : "Unblock User"}
// // // //                 </button>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //     </>
// // // //   );
// // // // };

// // // // export default AdminMessages;

// // // // AdminMessages.jsx - Add emoji picker and image upload
// // // import React, { useState, useEffect, useRef, useCallback } from "react";
// // // import {
// // //   FaComments,
// // //   FaCommentDots,
// // //   FaSearch,
// // //   FaTimes,
// // //   FaSync,
// // //   FaPaperPlane,
// // //   FaSmile,
// // //   FaSpinner,
// // //   FaBan,
// // //   FaUnlock,
// // //   FaCheck,
// // //   FaCheckDouble,
// // //   FaLock,
// // //   FaArrowLeft,
// // //   FaCar,
// // //   FaShieldAlt,
// // //   FaInbox,
// // //   FaImage,
// // //   FaTimesCircle,
// // // } from "react-icons/fa";
// // // import axios from "axios";
// // // import { toast, ToastContainer } from "react-toastify";
// // // import "react-toastify/dist/ReactToastify.css";
// // // import { useSocket } from "../context/SocketContext";
// // // import EmojiPicker from "emoji-picker-react";

// // // const getToken = () =>
// // //   localStorage.getItem("token") || sessionStorage.getItem("token");
// // // const authHeader = () => ({ Authorization: `Bearer ${getToken()}` });

// // // const adminChatService = {
// // //   getAllChats: async (filter = "all", search = "") => {
// // //     const res = await axios.get(
// // //       `http://localhost:5000/api/admin/chats?filter=${filter}&search=${encodeURIComponent(search)}`,
// // //       { headers: authHeader() },
// // //     );
// // //     return res.data;
// // //   },
// // //   getChat: async (chatId) => {
// // //     const res = await axios.get(
// // //       `http://localhost:5000/api/admin/chats/${chatId}`,
// // //       {
// // //         headers: authHeader(),
// // //       },
// // //     );
// // //     return res.data;
// // //   },
// // //   sendMessage: async (chatId, message) => {
// // //     const res = await axios.post(
// // //       `http://localhost:5000/api/admin/chats/${chatId}/message`,
// // //       { message },
// // //       { headers: authHeader() },
// // //     );
// // //     return res.data;
// // //   },
// // //   sendImage: async (chatId, file) => {
// // //     const formData = new FormData();
// // //     formData.append("image", file);
// // //     const res = await axios.post(
// // //       `http://localhost:5000/api/admin/chats/${chatId}/image`,
// // //       formData,
// // //       { headers: { ...authHeader(), "Content-Type": "multipart/form-data" } },
// // //     );
// // //     return res.data;
// // //   },
// // //   markAsRead: async (chatId) => {
// // //     const res = await axios.put(
// // //       `http://localhost:5000/api/admin/chats/${chatId}/read`,
// // //       {},
// // //       { headers: authHeader() },
// // //     );
// // //     return res.data;
// // //   },
// // //   blockUser: async (chatId) => {
// // //     const res = await axios.put(
// // //       `http://localhost:5000/api/admin/chats/${chatId}/block`,
// // //       {},
// // //       { headers: authHeader() },
// // //     );
// // //     return res.data;
// // //   },
// // //   unblockUser: async (chatId) => {
// // //     const res = await axios.put(
// // //       `http://localhost:5000/api/admin/chats/${chatId}/unblock`,
// // //       {},
// // //       { headers: authHeader() },
// // //     );
// // //     return res.data;
// // //   },
// // //   getUnreadCount: async () => {
// // //     const res = await axios.get(
// // //       `http://localhost:5000/api/admin/chats/unread/count`,
// // //       { headers: authHeader() },
// // //     );
// // //     return res.data;
// // //   },
// // // };

// // // const formatChatTime = (date) => {
// // //   if (!date) return "";
// // //   const now = new Date();
// // //   const d = new Date(date);
// // //   const diffMs = now - d;
// // //   const mins = Math.floor(diffMs / 60000);
// // //   const hours = Math.floor(diffMs / 3600000);
// // //   const days = Math.floor(diffMs / 86400000);
// // //   if (mins < 1) return "now";
// // //   if (mins < 60) return `${mins}m`;
// // //   if (hours < 24) return `${hours}h`;
// // //   if (days === 1) return "Yesterday";
// // //   return d.toLocaleDateString();
// // // };

// // // const formatMsgTime = (date) =>
// // //   new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

// // // const Avatar = ({ user, size = "md", className = "" }) => {
// // //   const s =
// // //     size === "sm"
// // //       ? "w-7 h-7 text-[10px]"
// // //       : size === "lg"
// // //         ? "w-12 h-12 text-base"
// // //         : "w-9 h-9 text-sm";
// // //   if (user?.profilePhoto) {
// // //     return (
// // //       <img
// // //         src={`http://localhost:5000/uploads/profiles/${user.profilePhoto}`}
// // //         alt={user.name}
// // //         className={`${s} rounded-full object-cover flex-shrink-0 ${className}`}
// // //       />
// // //     );
// // //   }
// // //   return (
// // //     <div
// // //       className={`${s} rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0 ${className}`}
// // //     >
// // //       {user?.name?.charAt(0)?.toUpperCase() || "?"}
// // //     </div>
// // //   );
// // // };

// // // const AdminMessages = () => {
// // //   const adminUser = JSON.parse(
// // //     localStorage.getItem("user") || sessionStorage.getItem("user") || "null",
// // //   );
// // //   const adminId = adminUser?._id || adminUser?.id;

// // //   const {
// // //     isConnected,
// // //     joinChat,
// // //     leaveChat,
// // //     onNewMessage,
// // //     markRead: socketMarkRead,
// // //   } = useSocket();

// // //   const [chats, setChats] = useState([]);
// // //   const [filteredChats, setFilteredChats] = useState([]);
// // //   const [chatsLoading, setChatsLoading] = useState(false);
// // //   const [selectedChat, setSelectedChat] = useState(null);
// // //   const [messages, setMessages] = useState([]);
// // //   const [messagesLoading, setMessagesLoading] = useState(false);
// // //   const [newMessage, setNewMessage] = useState("");
// // //   const [sending, setSending] = useState(false);
// // //   const [searchQuery, setSearchQuery] = useState("");
// // //   const [activeFilter, setActiveFilter] = useState("all");
// // //   const [showChatWindow, setShowChatWindow] = useState(false);
// // //   const [showBlockConfirm, setShowBlockConfirm] = useState(false);
// // //   const [showUnblockConfirm, setShowUnblockConfirm] = useState(false);
// // //   const [blockingUser, setBlockingUser] = useState(false);
// // //   const [totalUnread, setTotalUnread] = useState(0);
// // //   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
// // //   const [uploadingImage, setUploadingImage] = useState(false);

// // //   const messagesEndRef = useRef(null);
// // //   const inputRef = useRef(null);
// // //   const selectedChatRef = useRef(null);
// // //   const initialLoadDone = useRef(false);
// // //   const fileInputRef = useRef(null);

// // //   useEffect(() => {
// // //     selectedChatRef.current = selectedChat;
// // //   }, [selectedChat]);

// // //   const fetchUnreadCount = useCallback(async () => {
// // //     try {
// // //       const res = await adminChatService.getUnreadCount();
// // //       if (res.success) setTotalUnread(res.count);
// // //     } catch (error) {
// // //       console.error("Error fetching unread count:", error);
// // //     }
// // //   }, []);

// // //   const fetchChats = useCallback(async () => {
// // //     try {
// // //       setChatsLoading(true);
// // //       const res = await adminChatService.getAllChats(activeFilter, searchQuery);
// // //       if (res.success) {
// // //         setChats(res.data);
// // //         setFilteredChats(res.data);
// // //         const unread = res.data.reduce(
// // //           (acc, c) => acc + (c.unreadForAdmin || 0),
// // //           0,
// // //         );
// // //         setTotalUnread(unread);
// // //       }
// // //     } catch (error) {
// // //       console.error("Error fetching chats:", error);
// // //       toast.error("Failed to load chats");
// // //     } finally {
// // //       setChatsLoading(false);
// // //     }
// // //   }, [activeFilter, searchQuery]);

// // //   useEffect(() => {
// // //     if (!initialLoadDone.current) {
// // //       initialLoadDone.current = true;
// // //       fetchChats();
// // //       fetchUnreadCount();
// // //     }
// // //   }, [fetchChats, fetchUnreadCount]);

// // //   useEffect(() => {
// // //     if (initialLoadDone.current) {
// // //       fetchChats();
// // //       fetchUnreadCount();
// // //     }
// // //   }, [activeFilter, searchQuery, fetchChats, fetchUnreadCount]);

// // //   useEffect(() => {
// // //     const unsubscribe = onNewMessage("*", (data) => {
// // //       if (!data.message) return;
// // //       setChats((prev) =>
// // //         prev.map((c) => {
// // //           if (c._id !== data.chatId) return c;
// // //           const isCurrentlyOpen = selectedChatRef.current?._id === data.chatId;
// // //           return {
// // //             ...c,
// // //             lastMessage: data.message.message || "📷 Image",
// // //             lastMessageAt: data.message.createdAt,
// // //             unreadForAdmin: isCurrentlyOpen ? 0 : (c.unreadForAdmin || 0) + 1,
// // //           };
// // //         }),
// // //       );
// // //       setTotalUnread((prev) => {
// // //         const isCurrentlyOpen = selectedChatRef.current?._id === data.chatId;
// // //         return isCurrentlyOpen ? prev : prev + 1;
// // //       });
// // //     });
// // //     return unsubscribe;
// // //   }, [onNewMessage]);

// // //   useEffect(() => {
// // //     if (!selectedChat?._id) return;
// // //     const chatId = selectedChat._id;

// // //     const unsubscribe = onNewMessage(chatId, (data) => {
// // //       if (!data.message) return;

// // //       setMessages((prev) => {
// // //         if (prev.some((m) => m._id === data.message._id)) return prev;
// // //         const tempIdx = prev.findIndex(
// // //           (m) =>
// // //             m._id?.toString().startsWith("temp-") &&
// // //             m.message === data.message.message,
// // //         );
// // //         if (tempIdx !== -1) {
// // //           const next = [...prev];
// // //           next[tempIdx] = data.message;
// // //           return next;
// // //         }
// // //         return [...prev, data.message];
// // //       });

// // //       setTimeout(
// // //         () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
// // //         80,
// // //       );
// // //       adminChatService.markAsRead(chatId).catch(() => {});
// // //       socketMarkRead(chatId);
// // //     });
// // //     return unsubscribe;
// // //   }, [selectedChat?._id, onNewMessage, socketMarkRead]);

// // //   useEffect(() => {
// // //     if (messagesEndRef.current)
// // //       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
// // //   }, [messages]);

// // //   useEffect(() => {
// // //     if (!searchQuery.trim()) {
// // //       setFilteredChats(chats);
// // //       return;
// // //     }
// // //     const q = searchQuery.toLowerCase();
// // //     setFilteredChats(
// // //       chats.filter((c) => {
// // //         const name = (c.otherParticipant?.name || "").toLowerCase();
// // //         const vehicle = (c.vehicleName || "").toLowerCase();
// // //         const last = (c.lastMessage || "").toLowerCase();
// // //         return name.includes(q) || vehicle.includes(q) || last.includes(q);
// // //       }),
// // //     );
// // //   }, [searchQuery, chats]);

// // //   const openChat = async (chat) => {
// // //     if (selectedChatRef.current?._id) leaveChat(selectedChatRef.current._id);
// // //     setSelectedChat(chat);
// // //     setShowChatWindow(true);
// // //     setMessages([]);
// // //     joinChat(chat._id);

// // //     if (!chat.isBlocked) {
// // //       try {
// // //         setMessagesLoading(true);
// // //         const res = await adminChatService.getChat(chat._id);
// // //         if (res.success) {
// // //           setMessages(res.data.messages || []);
// // //           await adminChatService.markAsRead(chat._id);
// // //           socketMarkRead(chat._id);
// // //           setChats((prev) =>
// // //             prev.map((c) =>
// // //               c._id !== chat._id ? c : { ...c, unreadForAdmin: 0 },
// // //             ),
// // //           );
// // //           await fetchUnreadCount();
// // //         }
// // //       } catch (error) {
// // //         console.error("Error loading messages:", error);
// // //         toast.error("Failed to load messages");
// // //       } finally {
// // //         setMessagesLoading(false);
// // //       }
// // //     }
// // //     setTimeout(() => inputRef.current?.focus(), 200);
// // //   };

// // //   const closeChat = () => {
// // //     if (selectedChatRef.current?._id) leaveChat(selectedChatRef.current._id);
// // //     setShowChatWindow(false);
// // //     setSelectedChat(null);
// // //     setMessages([]);
// // //     setNewMessage("");
// // //     setShowEmojiPicker(false);
// // //   };

// // //   const handleImageUpload = async (e) => {
// // //     const file = e.target.files[0];
// // //     if (!file) return;
// // //     if (!file.type.startsWith("image/")) {
// // //       toast.error("Only image files are allowed");
// // //       return;
// // //     }
// // //     if (file.size > 5 * 1024 * 1024) {
// // //       toast.error("Image must be less than 5MB");
// // //       return;
// // //     }

// // //     setUploadingImage(true);
// // //     try {
// // //       const formData = new FormData();
// // //       formData.append("image", file);
// // //       const res = await axios.post(
// // //         `http://localhost:5000/api/admin/chats/${selectedChat._id}/image`,
// // //         formData,
// // //         { headers: { ...authHeader(), "Content-Type": "multipart/form-data" } },
// // //       );
// // //       if (res.data.success) {
// // //         const tempMsg = {
// // //           _id: `temp-${Date.now()}`,
// // //           message: "",
// // //           senderType: "admin",
// // //           read: false,
// // //           delivered: false,
// // //           createdAt: new Date(),
// // //           attachments: [{ url: res.data.data.url, type: "image" }],
// // //           sender: adminUser,
// // //         };
// // //         setMessages((prev) => [...prev, tempMsg]);
// // //         setTimeout(
// // //           () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
// // //           100,
// // //         );
// // //       }
// // //     } catch (error) {
// // //       console.error("Error uploading image:", error);
// // //       toast.error("Failed to upload image");
// // //     } finally {
// // //       setUploadingImage(false);
// // //       if (fileInputRef.current) fileInputRef.current.value = "";
// // //     }
// // //   };

// // //   const sendMessage = async () => {
// // //     if (
// // //       (!newMessage.trim() && !uploadingImage) ||
// // //       sending ||
// // //       selectedChat?.isBlocked
// // //     )
// // //       return;
// // //     const text = newMessage.trim();
// // //     setSending(true);

// // //     const tempMsg = {
// // //       _id: `temp-${Date.now()}`,
// // //       message: text,
// // //       senderType: "admin",
// // //       read: false,
// // //       delivered: false,
// // //       createdAt: new Date(),
// // //       sender: adminUser,
// // //       attachments: [],
// // //     };
// // //     setMessages((prev) => [...prev, tempMsg]);
// // //     setNewMessage("");
// // //     setShowEmojiPicker(false);
// // //     setTimeout(
// // //       () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
// // //       100,
// // //     );

// // //     try {
// // //       const res = await adminChatService.sendMessage(selectedChat._id, text);
// // //       if (res.success) {
// // //         setMessages((prev) =>
// // //           prev.map((m) => (m._id === tempMsg._id ? res.data : m)),
// // //         );
// // //         setChats((prev) =>
// // //           prev.map((c) =>
// // //             c._id !== selectedChat._id
// // //               ? c
// // //               : {
// // //                   ...c,
// // //                   lastMessage: text || "📷 Image",
// // //                   lastMessageAt: new Date(),
// // //                 },
// // //           ),
// // //         );
// // //       } else {
// // //         setMessages((prev) => prev.filter((m) => m._id !== tempMsg._id));
// // //         toast.error("Failed to send message");
// // //       }
// // //     } catch (error) {
// // //       console.error("Error sending message:", error);
// // //       setMessages((prev) => prev.filter((m) => m._id !== tempMsg._id));
// // //       toast.error("Failed to send message");
// // //     } finally {
// // //       setSending(false);
// // //     }
// // //   };

// // //   const handleBlock = async () => {
// // //     setBlockingUser(true);
// // //     try {
// // //       const res = await adminChatService.blockUser(selectedChat._id);
// // //       if (res.success) {
// // //         toast.success(
// // //           `${selectedChat.otherParticipant?.name} has been blocked`,
// // //         );
// // //         setSelectedChat((p) => ({ ...p, isBlocked: true, blockedBy: adminId }));
// // //         setMessages([]);
// // //         fetchChats();
// // //         fetchUnreadCount();
// // //       }
// // //     } catch (error) {
// // //       console.error("Error blocking user:", error);
// // //       toast.error("Failed to block user");
// // //     } finally {
// // //       setBlockingUser(false);
// // //       setShowBlockConfirm(false);
// // //     }
// // //   };

// // //   const handleUnblock = async () => {
// // //     setBlockingUser(true);
// // //     try {
// // //       const res = await adminChatService.unblockUser(selectedChat._id);
// // //       if (res.success) {
// // //         toast.success(
// // //           `${selectedChat.otherParticipant?.name} has been unblocked`,
// // //         );
// // //         setSelectedChat((p) => ({ ...p, isBlocked: false, blockedBy: null }));
// // //         const msgRes = await adminChatService.getChat(selectedChat._id);
// // //         if (msgRes.success) setMessages(msgRes.data.messages || []);
// // //         fetchChats();
// // //         fetchUnreadCount();
// // //       }
// // //     } catch (error) {
// // //       console.error("Error unblocking user:", error);
// // //       toast.error("Failed to unblock user");
// // //     } finally {
// // //       setBlockingUser(false);
// // //       setShowUnblockConfirm(false);
// // //     }
// // //   };

// // //   const handleManualRefresh = () => {
// // //     fetchChats();
// // //     fetchUnreadCount();
// // //     toast.info("Refreshed messages");
// // //   };

// // //   const onEmojiClick = (emojiObject) => {
// // //     setNewMessage((prev) => prev + emojiObject.emoji);
// // //     setShowEmojiPicker(false);
// // //     inputRef.current?.focus();
// // //   };

// // //   const getUnread = (chat) => chat.unreadForAdmin || 0;
// // //   const iBlockedThem =
// // //     selectedChat?.isBlocked && selectedChat?.blockedBy === adminId;

// // //   const filterTabs = [
// // //     { id: "all", label: "All", count: chats.length },
// // //     {
// // //       id: "vehicle",
// // //       label: "Vehicle Chats",
// // //       count: chats.filter((c) => c.chatType === "vehicle").length,
// // //     },
// // //     {
// // //       id: "support",
// // //       label: "Support",
// // //       count: chats.filter((c) => c.chatType === "support").length,
// // //     },
// // //     {
// // //       id: "unread",
// // //       label: "Unread",
// // //       count: chats.filter((c) => getUnread(c) > 0).length,
// // //     },
// // //   ];

// // //   const groupedMessages = (() => {
// // //     const groups = [];
// // //     let lastDate = null;
// // //     messages.forEach((msg, i) => {
// // //       const day = new Date(msg.createdAt).toDateString();
// // //       if (day !== lastDate) {
// // //         const today = new Date().toDateString();
// // //         const yesterday = new Date(Date.now() - 86400000).toDateString();
// // //         groups.push({
// // //           type: "date",
// // //           label:
// // //             day === today ? "Today" : day === yesterday ? "Yesterday" : day,
// // //           key: `date-${i}`,
// // //         });
// // //         lastDate = day;
// // //       }
// // //       groups.push({ type: "msg", msg, key: msg._id || i });
// // //     });
// // //     return groups;
// // //   })();

// // //   return (
// // //     <>
// // //       <ToastContainer position="top-right" autoClose={3000} />
// // //       <div
// // //         className="flex flex-col bg-gradient-to-br from-gray-50 to-gray-100"
// // //         style={{ height: "100vh" }}
// // //       >
// // //         {/* Header */}
// // //         <div className="px-8 py-5 bg-white/80 backdrop-blur-md shadow-sm flex-shrink-0">
// // //           <div className="flex justify-between items-center">
// // //             <div>
// // //               <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent flex items-center gap-2">
// // //                 <FaComments className="text-blue-600" />
// // //                 Messages
// // //                 {totalUnread > 0 && (
// // //                   <span className="ml-1 px-2 py-0.5 bg-blue-600 text-white text-xs font-bold rounded-full">
// // //                     {totalUnread > 99 ? "99+" : totalUnread}
// // //                   </span>
// // //                 )}
// // //               </h1>
// // //               <p className="text-sm text-gray-500 mt-1">
// // //                 Manage all user conversations and vehicle inquiries
// // //                 {isConnected ? (
// // //                   <span className="ml-2 inline-flex items-center gap-1 text-green-500 text-xs">
// // //                     <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />{" "}
// // //                     Live
// // //                   </span>
// // //                 ) : (
// // //                   <span className="ml-2 inline-flex items-center gap-1 text-amber-500 text-xs">
// // //                     <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />{" "}
// // //                     Reconnecting…
// // //                   </span>
// // //                 )}
// // //               </p>
// // //             </div>
// // //             <button
// // //               onClick={handleManualRefresh}
// // //               className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition shadow-sm"
// // //             >
// // //               <FaSync
// // //                 className={
// // //                   chatsLoading ? "animate-spin text-blue-500" : "text-gray-400"
// // //                 }
// // //                 size={13}
// // //               />
// // //               Refresh
// // //             </button>
// // //           </div>
// // //         </div>

// // //         {/* Chat panel */}
// // //         <div className="flex flex-1 min-h-0 m-6 rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-white">
// // //           {/* LEFT: Chat list */}
// // //           <div
// // //             className={`${showChatWindow ? "hidden lg:flex" : "flex"} flex-col w-full lg:w-[340px] border-r border-gray-100 flex-shrink-0`}
// // //           >
// // //             <div className="p-4 border-b border-gray-100 space-y-3">
// // //               <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
// // //                 <FaSearch size={12} className="text-gray-400 flex-shrink-0" />
// // //                 <input
// // //                   value={searchQuery}
// // //                   onChange={(e) => setSearchQuery(e.target.value)}
// // //                   placeholder="Search conversations, users…"
// // //                   className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
// // //                 />
// // //                 {searchQuery && (
// // //                   <button
// // //                     onClick={() => setSearchQuery("")}
// // //                     className="text-gray-400 hover:text-gray-600"
// // //                   >
// // //                     <FaTimes size={11} />
// // //                   </button>
// // //                 )}
// // //               </div>
// // //               <div className="flex gap-1 overflow-x-auto">
// // //                 {filterTabs.map((tab) => (
// // //                   <button
// // //                     key={tab.id}
// // //                     onClick={() => setActiveFilter(tab.id)}
// // //                     className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
// // //                       activeFilter === tab.id
// // //                         ? "bg-blue-600 text-white shadow-sm"
// // //                         : "bg-gray-100 text-gray-500 hover:bg-gray-200"
// // //                     }`}
// // //                   >
// // //                     {tab.label}
// // //                     {tab.count > 0 && (
// // //                       <span
// // //                         className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
// // //                           activeFilter === tab.id
// // //                             ? "bg-white/20 text-white"
// // //                             : "bg-gray-300 text-gray-600"
// // //                         }`}
// // //                       >
// // //                         {tab.count}
// // //                       </span>
// // //                     )}
// // //                   </button>
// // //                 ))}
// // //               </div>
// // //             </div>

// // //             <div className="flex-1 overflow-y-auto">
// // //               {chatsLoading && chats.length === 0 ? (
// // //                 <div className="flex items-center justify-center h-32">
// // //                   <FaSpinner className="animate-spin text-blue-400 text-xl" />
// // //                 </div>
// // //               ) : filteredChats.length === 0 ? (
// // //                 <div className="flex flex-col items-center justify-center h-full py-12 text-center px-6">
// // //                   <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-3">
// // //                     <FaInbox className="text-blue-300 text-2xl" />
// // //                   </div>
// // //                   <p className="text-sm font-semibold text-gray-600">
// // //                     {searchQuery ? "No results found" : "No conversations yet"}
// // //                   </p>
// // //                   <p className="text-xs text-gray-400 mt-1">
// // //                     {searchQuery
// // //                       ? "Try a different search term"
// // //                       : "User conversations will appear here"}
// // //                   </p>
// // //                 </div>
// // //               ) : (
// // //                 filteredChats.map((chat) => {
// // //                   const unread = getUnread(chat);
// // //                   const isSelected =
// // //                     selectedChat?._id === chat._id && showChatWindow;
// // //                   const isBlocked = chat.isBlocked;
// // //                   const isVehicle = chat.chatType === "vehicle";
// // //                   return (
// // //                     <div
// // //                       key={chat._id}
// // //                       onClick={() => openChat(chat)}
// // //                       className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer transition-all border-b border-gray-50 ${
// // //                         isSelected
// // //                           ? "bg-blue-50 border-l-[3px] border-l-blue-500"
// // //                           : "hover:bg-gray-50 border-l-[3px] border-l-transparent"
// // //                       } ${isBlocked ? "opacity-60" : ""}`}
// // //                     >
// // //                       <div className="relative flex-shrink-0">
// // //                         <Avatar user={chat.otherParticipant} size="md" />
// // //                         {isBlocked && (
// // //                           <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center shadow-sm">
// // //                             <FaBan size={7} />
// // //                           </span>
// // //                         )}
// // //                         {unread > 0 && !isBlocked && (
// // //                           <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-blue-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
// // //                             {unread > 9 ? "9+" : unread}
// // //                           </span>
// // //                         )}
// // //                       </div>
// // //                       <div className="flex-1 min-w-0">
// // //                         <div className="flex items-baseline justify-between gap-1 mb-0.5">
// // //                           <span
// // //                             className={`text-sm font-semibold truncate ${unread > 0 ? "text-gray-900" : "text-gray-700"}`}
// // //                           >
// // //                             {chat.otherParticipant?.name || "Unknown User"}
// // //                           </span>
// // //                           <span className="text-[10px] text-gray-400 flex-shrink-0">
// // //                             {formatChatTime(
// // //                               chat.lastMessageAt || chat.updatedAt,
// // //                             )}
// // //                           </span>
// // //                         </div>
// // //                         <p
// // //                           className={`text-xs truncate ${unread > 0 && !isBlocked ? "text-gray-700 font-medium" : "text-gray-400"}`}
// // //                         >
// // //                           {isBlocked
// // //                             ? "Conversation blocked"
// // //                             : chat.lastMessage || "No messages yet"}
// // //                         </p>
// // //                         <div className="flex items-center gap-1.5 mt-1">
// // //                           {isVehicle ? (
// // //                             <span className="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded-full font-semibold bg-blue-50 text-blue-600 uppercase tracking-wide">
// // //                               <FaCar size={7} /> Vehicle
// // //                             </span>
// // //                           ) : (
// // //                             <span className="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded-full font-semibold bg-purple-50 text-purple-600 uppercase tracking-wide">
// // //                               <FaShieldAlt size={7} /> Support
// // //                             </span>
// // //                           )}
// // //                           {chat.vehicleName && (
// // //                             <span className="text-[10px] text-gray-400 truncate">
// // //                               · {chat.vehicleName}
// // //                             </span>
// // //                           )}
// // //                           {isBlocked && (
// // //                             <span className="text-[9px] text-red-500 font-bold uppercase">
// // //                               Blocked
// // //                             </span>
// // //                           )}
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                   );
// // //                 })
// // //               )}
// // //             </div>

// // //             <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
// // //               <span className="text-xs text-gray-500">
// // //                 {chats.length} conversation{chats.length !== 1 ? "s" : ""}
// // //               </span>
// // //               {totalUnread > 0 && (
// // //                 <span className="text-xs font-semibold text-blue-600">
// // //                   {totalUnread} unread
// // //                 </span>
// // //               )}
// // //             </div>
// // //           </div>

// // //           {/* RIGHT: Chat window */}
// // //           {showChatWindow && selectedChat ? (
// // //             <div className="flex-1 flex flex-col min-w-0">
// // //               {/* Header */}
// // //               <div className="px-5 py-3.5 bg-white border-b border-gray-100 flex items-center justify-between flex-shrink-0 shadow-sm">
// // //                 <div className="flex items-center gap-3">
// // //                   <button
// // //                     onClick={closeChat}
// // //                     className="lg:hidden w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition"
// // //                   >
// // //                     <FaArrowLeft size={14} />
// // //                   </button>
// // //                   <Avatar user={selectedChat.otherParticipant} size="md" />
// // //                   <div>
// // //                     <div className="flex items-center gap-2">
// // //                       <p className="text-sm font-bold text-gray-900">
// // //                         {selectedChat.otherParticipant?.name || "Unknown User"}
// // //                       </p>
// // //                       {selectedChat.isBlocked && (
// // //                         <span className="inline-flex items-center gap-1 text-[10px] bg-red-50 text-red-500 border border-red-200 px-1.5 py-0.5 rounded-full font-semibold">
// // //                           <FaBan size={8} /> Blocked
// // //                         </span>
// // //                       )}
// // //                     </div>
// // //                     <div className="flex items-center gap-1.5 mt-0.5">
// // //                       <p className="text-xs text-gray-400">
// // //                         {selectedChat.otherParticipant?.email}
// // //                       </p>
// // //                       {selectedChat.vehicleName && (
// // //                         <>
// // //                           <span className="text-gray-300">·</span>
// // //                           <span className="text-xs text-blue-500 flex items-center gap-1">
// // //                             <FaCar size={9} /> {selectedChat.vehicleName}
// // //                           </span>
// // //                         </>
// // //                       )}
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //                 <div className="flex items-center gap-2">
// // //                   {!selectedChat.isBlocked ? (
// // //                     <button
// // //                       onClick={() => setShowBlockConfirm(true)}
// // //                       className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-500 hover:bg-red-50 border border-red-100 transition"
// // //                     >
// // //                       <FaBan size={11} /> Block
// // //                     </button>
// // //                   ) : iBlockedThem ? (
// // //                     <button
// // //                       onClick={() => setShowUnblockConfirm(true)}
// // //                       className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-600 hover:bg-emerald-50 border border-emerald-200 transition"
// // //                     >
// // //                       <FaUnlock size={11} /> Unblock
// // //                     </button>
// // //                   ) : null}
// // //                 </div>
// // //               </div>

// // //               {/* Vehicle banner */}
// // //               {selectedChat.vehicleId && (
// // //                 <div className="px-5 py-2.5 bg-blue-50 border-b border-blue-100 flex items-center gap-3">
// // //                   <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
// // //                     <FaCar size={12} className="text-blue-600" />
// // //                   </div>
// // //                   <span className="text-xs font-semibold text-blue-800">
// // //                     {selectedChat.vehicleName || "Vehicle Inquiry"}
// // //                   </span>
// // //                 </div>
// // //               )}

// // //               {/* Block banner */}
// // //               {selectedChat.isBlocked && (
// // //                 <div
// // //                   className={`flex items-center justify-between px-5 py-3 border-b ${iBlockedThem ? "bg-red-50 border-red-100" : "bg-amber-50 border-amber-100"}`}
// // //                 >
// // //                   <div className="flex items-center gap-3">
// // //                     <div
// // //                       className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${iBlockedThem ? "bg-red-100" : "bg-amber-100"}`}
// // //                     >
// // //                       <FaBan
// // //                         size={13}
// // //                         className={
// // //                           iBlockedThem ? "text-red-500" : "text-amber-500"
// // //                         }
// // //                       />
// // //                     </div>
// // //                     <div>
// // //                       <p
// // //                         className={`text-xs font-bold ${iBlockedThem ? "text-red-700" : "text-amber-700"}`}
// // //                       >
// // //                         {iBlockedThem
// // //                           ? `You blocked ${selectedChat.otherParticipant?.name}`
// // //                           : "This user has restricted messaging"}
// // //                       </p>
// // //                       <p
// // //                         className={`text-[11px] mt-0.5 ${iBlockedThem ? "text-red-500" : "text-amber-500"}`}
// // //                       >
// // //                         {iBlockedThem
// // //                           ? "They cannot message you. Unblock to restore the conversation."
// // //                           : "You cannot send messages in this conversation."}
// // //                       </p>
// // //                     </div>
// // //                   </div>
// // //                   {iBlockedThem && (
// // //                     <button
// // //                       onClick={() => setShowUnblockConfirm(true)}
// // //                       className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition ml-3 whitespace-nowrap"
// // //                     >
// // //                       <FaUnlock size={10} /> Unblock
// // //                     </button>
// // //                   )}
// // //                 </div>
// // //               )}

// // //               {/* Messages area */}
// // //               <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1 bg-gray-50">
// // //                 {messagesLoading ? (
// // //                   <div className="flex items-center justify-center h-full">
// // //                     <FaSpinner className="animate-spin text-blue-400 text-2xl" />
// // //                   </div>
// // //                 ) : selectedChat.isBlocked && messages.length === 0 ? (
// // //                   <div className="flex flex-col items-center justify-center h-full text-center px-8">
// // //                     <div
// // //                       className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${iBlockedThem ? "bg-red-50" : "bg-amber-50"}`}
// // //                     >
// // //                       <FaLock
// // //                         size={28}
// // //                         className={
// // //                           iBlockedThem ? "text-red-300" : "text-amber-300"
// // //                         }
// // //                       />
// // //                     </div>
// // //                     <p className="text-sm font-bold text-gray-600">
// // //                       {iBlockedThem
// // //                         ? "Conversation blocked"
// // //                         : "Messaging unavailable"}
// // //                     </p>
// // //                     <p className="text-xs text-gray-400 mt-2 leading-relaxed max-w-xs">
// // //                       {iBlockedThem
// // //                         ? `You have blocked ${selectedChat.otherParticipant?.name}. Unblock to restore the conversation.`
// // //                         : "This user has restricted messaging."}
// // //                     </p>
// // //                     {iBlockedThem && (
// // //                       <button
// // //                         onClick={() => setShowUnblockConfirm(true)}
// // //                         className="mt-5 flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition"
// // //                       >
// // //                         <FaUnlock size={12} /> Unblock{" "}
// // //                         {selectedChat.otherParticipant?.name}
// // //                       </button>
// // //                     )}
// // //                   </div>
// // //                 ) : messages.length === 0 ? (
// // //                   <div className="flex flex-col items-center justify-center h-full text-center">
// // //                     <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-3">
// // //                       <FaCommentDots className="text-blue-300 text-2xl" />
// // //                     </div>
// // //                     <p className="text-sm font-semibold text-gray-500">
// // //                       No messages yet
// // //                     </p>
// // //                     <p className="text-xs text-gray-400 mt-1">
// // //                       Start the conversation with this user
// // //                     </p>
// // //                   </div>
// // //                 ) : (
// // //                   groupedMessages.map((item) => {
// // //                     if (item.type === "date") {
// // //                       return (
// // //                         <div
// // //                           key={item.key}
// // //                           className="flex items-center gap-3 py-2"
// // //                         >
// // //                           <div className="flex-1 h-px bg-gray-200" />
// // //                           <span className="text-[10px] text-gray-400 font-medium px-2.5 py-1 bg-white border border-gray-200 rounded-full whitespace-nowrap shadow-sm">
// // //                             {item.label}
// // //                           </span>
// // //                           <div className="flex-1 h-px bg-gray-200" />
// // //                         </div>
// // //                       );
// // //                     }
// // //                     const { msg } = item;
// // //                     const isOwn =
// // //                       msg.senderType === "admin" || msg.sender?._id === adminId;
// // //                     const hasImage = msg.attachments?.length > 0;
// // //                     return (
// // //                       <div
// // //                         key={item.key}
// // //                         className={`flex items-end gap-2 ${isOwn ? "justify-end" : "justify-start"}`}
// // //                       >
// // //                         {!isOwn && (
// // //                           <div className="flex-shrink-0 mb-1">
// // //                             <Avatar
// // //                               user={selectedChat.otherParticipant}
// // //                               size="sm"
// // //                             />
// // //                           </div>
// // //                         )}
// // //                         <div
// // //                           className={`flex flex-col ${isOwn ? "items-end" : "items-start"} max-w-[65%]`}
// // //                         >
// // //                           <div
// // //                             className={`px-4 py-2.5 text-sm leading-relaxed break-words ${
// // //                               isOwn
// // //                                 ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl rounded-br-sm shadow-sm"
// // //                                 : "bg-white text-gray-800 rounded-2xl rounded-bl-sm border border-gray-100 shadow-sm"
// // //                             }`}
// // //                           >
// // //                             {hasImage && (
// // //                               <div className="mb-1">
// // //                                 <img
// // //                                   src={`http://localhost:5000${msg.attachments[0].url}`}
// // //                                   alt="attachment"
// // //                                   className="max-w-[200px] max-h-[150px] rounded-lg cursor-pointer"
// // //                                   onClick={() =>
// // //                                     window.open(
// // //                                       `http://localhost:5000${msg.attachments[0].url}`,
// // //                                       "_blank",
// // //                                     )
// // //                                   }
// // //                                 />
// // //                               </div>
// // //                             )}
// // //                             {msg.message && <p>{msg.message}</p>}
// // //                           </div>
// // //                           <div
// // //                             className={`flex items-center gap-1 mt-1 px-1 ${isOwn ? "flex-row-reverse" : ""}`}
// // //                           >
// // //                             <span className="text-[10px] text-gray-400">
// // //                               {formatMsgTime(msg.createdAt)}
// // //                             </span>
// // //                             {isOwn && (
// // //                               <FaCheckDouble
// // //                                 size={9}
// // //                                 className={
// // //                                   msg.read ? "text-blue-400" : "text-gray-300"
// // //                                 }
// // //                               />
// // //                             )}
// // //                           </div>
// // //                         </div>
// // //                         {isOwn && (
// // //                           <div className="flex-shrink-0 mb-1">
// // //                             <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-[10px] font-bold">
// // //                               {(adminUser?.name || "A").charAt(0).toUpperCase()}
// // //                             </div>
// // //                           </div>
// // //                         )}
// // //                       </div>
// // //                     );
// // //                   })
// // //                 )}
// // //                 <div ref={messagesEndRef} />
// // //               </div>

// // //               {/* Input */}
// // //               <div className="px-4 py-3 bg-white border-t border-gray-100 flex-shrink-0">
// // //                 {!isConnected && (
// // //                   <p className="text-[11px] text-center text-amber-500 mb-2">
// // //                     Reconnecting to chat server…
// // //                   </p>
// // //                 )}
// // //                 {selectedChat.isBlocked ? (
// // //                   <div
// // //                     className={`flex items-center gap-3 rounded-2xl px-4 py-3 ${iBlockedThem ? "bg-red-50 border border-red-100" : "bg-amber-50 border border-amber-100"}`}
// // //                   >
// // //                     <FaLock
// // //                       size={14}
// // //                       className={
// // //                         iBlockedThem ? "text-red-400" : "text-amber-400"
// // //                       }
// // //                     />
// // //                     <p
// // //                       className={`text-xs flex-1 ${iBlockedThem ? "text-red-500" : "text-amber-600"}`}
// // //                     >
// // //                       {iBlockedThem ? (
// // //                         <>
// // //                           You blocked this user.{" "}
// // //                           <button
// // //                             onClick={() => setShowUnblockConfirm(true)}
// // //                             className="underline font-semibold hover:no-underline"
// // //                           >
// // //                             Unblock to chat
// // //                           </button>
// // //                         </>
// // //                       ) : (
// // //                         "You cannot send messages in this conversation."
// // //                       )}
// // //                     </p>
// // //                   </div>
// // //                 ) : (
// // //                   <div className="relative">
// // //                     {showEmojiPicker && (
// // //                       <div className="absolute bottom-full mb-2 right-0 z-50">
// // //                         <EmojiPicker onEmojiClick={onEmojiClick} />
// // //                       </div>
// // //                     )}
// // //                     <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-3 py-2">
// // //                       <button
// // //                         onClick={() => setShowEmojiPicker(!showEmojiPicker)}
// // //                         className="text-gray-400 hover:text-blue-500 transition flex-shrink-0"
// // //                       >
// // //                         <FaSmile size={18} />
// // //                       </button>
// // //                       <button
// // //                         onClick={() => fileInputRef.current?.click()}
// // //                         className="text-gray-400 hover:text-blue-500 transition flex-shrink-0"
// // //                         disabled={uploadingImage}
// // //                       >
// // //                         {uploadingImage ? (
// // //                           <FaSpinner className="animate-spin" size={18} />
// // //                         ) : (
// // //                           <FaImage size={18} />
// // //                         )}
// // //                       </button>
// // //                       <input
// // //                         type="file"
// // //                         ref={fileInputRef}
// // //                         className="hidden"
// // //                         accept="image/*"
// // //                         onChange={handleImageUpload}
// // //                       />
// // //                       <input
// // //                         ref={inputRef}
// // //                         type="text"
// // //                         value={newMessage}
// // //                         onChange={(e) => setNewMessage(e.target.value)}
// // //                         onKeyPress={(e) => e.key === "Enter" && sendMessage()}
// // //                         placeholder="Type a reply…"
// // //                         className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
// // //                       />
// // //                       <button
// // //                         onClick={sendMessage}
// // //                         disabled={!newMessage.trim() || sending}
// // //                         className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-md transition"
// // //                       >
// // //                         {sending ? (
// // //                           <FaSpinner className="animate-spin" size={13} />
// // //                         ) : (
// // //                           <FaPaperPlane size={13} />
// // //                         )}
// // //                       </button>
// // //                     </div>
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             </div>
// // //           ) : (
// // //             <div className="flex-1 hidden lg:flex flex-col items-center justify-center bg-gray-50 text-center px-8">
// // //               <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center mb-5 shadow-inner">
// // //                 <FaComments className="text-blue-300 text-4xl" />
// // //               </div>
// // //               <p className="text-lg font-bold text-gray-600">
// // //                 Select a conversation
// // //               </p>
// // //               <p className="text-sm text-gray-400 mt-2 max-w-xs">
// // //                 Choose a chat from the left panel to start replying to users
// // //               </p>
// // //               {totalUnread > 0 && (
// // //                 <div className="mt-4 px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl">
// // //                   <p className="text-sm font-semibold text-blue-600">
// // //                     {totalUnread} unread message{totalUnread !== 1 ? "s" : ""}{" "}
// // //                     waiting
// // //                   </p>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>

// // //       {/* Block Modal */}
// // //       {showBlockConfirm && selectedChat && (
// // //         <div
// // //           className="fixed inset-0 z-[200] flex items-center justify-center p-4"
// // //           style={{ background: "rgba(0,0,0,0.55)" }}
// // //         >
// // //           <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
// // //             <div className="bg-gradient-to-r from-red-500 to-rose-600 px-6 pt-6 pb-10">
// // //               <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
// // //                 <FaBan size={26} className="text-white" />
// // //               </div>
// // //               <h3 className="text-white text-center text-lg font-bold">
// // //                 Block User?
// // //               </h3>
// // //               <p className="text-red-100 text-center text-xs mt-1">
// // //                 You can unblock them anytime
// // //               </p>
// // //             </div>
// // //             <div className="-mt-4 bg-white rounded-t-2xl px-6 pt-5 pb-6">
// // //               <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
// // //                 <Avatar user={selectedChat.otherParticipant} size="md" />
// // //                 <div>
// // //                   <p className="font-semibold text-gray-800 text-sm">
// // //                     {selectedChat.otherParticipant?.name}
// // //                   </p>
// // //                   <p className="text-xs text-gray-500">
// // //                     Will be blocked from messaging
// // //                   </p>
// // //                 </div>
// // //               </div>
// // //               <ul className="space-y-2 mb-5">
// // //                 {[
// // //                   "They won't be able to message you",
// // //                   "Their messages will be hidden",
// // //                   "You can unblock them anytime",
// // //                 ].map((t, i) => (
// // //                   <li
// // //                     key={i}
// // //                     className="flex items-center gap-2 text-xs text-gray-600"
// // //                   >
// // //                     <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
// // //                       <FaTimes size={7} className="text-red-500" />
// // //                     </span>
// // //                     {t}
// // //                   </li>
// // //                 ))}
// // //               </ul>
// // //               <div className="flex gap-2">
// // //                 <button
// // //                   onClick={() => setShowBlockConfirm(false)}
// // //                   className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition font-medium"
// // //                 >
// // //                   Cancel
// // //                 </button>
// // //                 <button
// // //                   onClick={handleBlock}
// // //                   disabled={blockingUser}
// // //                   className="flex-1 px-4 py-2.5 text-sm bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl font-semibold transition flex items-center justify-center gap-2 disabled:opacity-60"
// // //                 >
// // //                   {blockingUser ? (
// // //                     <FaSpinner className="animate-spin" size={13} />
// // //                   ) : (
// // //                     <FaBan size={12} />
// // //                   )}
// // //                   {blockingUser ? "Blocking…" : "Block User"}
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Unblock Modal */}
// // //       {showUnblockConfirm && selectedChat && (
// // //         <div
// // //           className="fixed inset-0 z-[200] flex items-center justify-center p-4"
// // //           style={{ background: "rgba(0,0,0,0.55)" }}
// // //         >
// // //           <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
// // //             <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 pt-6 pb-10">
// // //               <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
// // //                 <FaUnlock size={24} className="text-white" />
// // //               </div>
// // //               <h3 className="text-white text-center text-lg font-bold">
// // //                 Unblock User?
// // //               </h3>
// // //               <p className="text-emerald-100 text-center text-xs mt-1">
// // //                 Resume your conversation
// // //               </p>
// // //             </div>
// // //             <div className="-mt-4 bg-white rounded-t-2xl px-6 pt-5 pb-6">
// // //               <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
// // //                 <Avatar user={selectedChat.otherParticipant} size="md" />
// // //                 <div>
// // //                   <p className="font-semibold text-gray-800 text-sm">
// // //                     {selectedChat.otherParticipant?.name}
// // //                   </p>
// // //                   <p className="text-xs text-gray-500">Will be unblocked</p>
// // //                 </div>
// // //               </div>
// // //               <ul className="space-y-2 mb-5">
// // //                 {[
// // //                   "They can message you again",
// // //                   "Previous messages will be restored",
// // //                   "You can block them again anytime",
// // //                 ].map((t, i) => (
// // //                   <li
// // //                     key={i}
// // //                     className="flex items-center gap-2 text-xs text-gray-600"
// // //                   >
// // //                     <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
// // //                       <FaCheck size={7} className="text-emerald-600" />
// // //                     </span>
// // //                     {t}
// // //                   </li>
// // //                 ))}
// // //               </ul>
// // //               <div className="flex gap-2">
// // //                 <button
// // //                   onClick={() => setShowUnblockConfirm(false)}
// // //                   className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition font-medium"
// // //                 >
// // //                   Cancel
// // //                 </button>
// // //                 <button
// // //                   onClick={handleUnblock}
// // //                   disabled={blockingUser}
// // //                   className="flex-1 px-4 py-2.5 text-sm bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold transition flex items-center justify-center gap-2 disabled:opacity-60"
// // //                 >
// // //                   {blockingUser ? (
// // //                     <FaSpinner className="animate-spin" size={13} />
// // //                   ) : (
// // //                     <FaUnlock size={12} />
// // //                   )}
// // //                   {blockingUser ? "Unblocking…" : "Unblock User"}
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </>
// // //   );
// // // };

// // // export default AdminMessages;

// // // AdminMessages.jsx - Complete file with updated custom emoji picker UI
// // // import React, { useState, useEffect, useRef, useCallback } from "react";
// // // import {
// // //   FaComments,
// // //   FaCommentDots,
// // //   FaSearch,
// // //   FaTimes,
// // //   FaSync,
// // //   FaPaperPlane,
// // //   FaSmile,
// // //   FaSpinner,
// // //   FaBan,
// // //   FaUnlock,
// // //   FaCheck,
// // //   FaCheckDouble,
// // //   FaLock,
// // //   FaArrowLeft,
// // //   FaCar,
// // //   FaShieldAlt,
// // //   FaInbox,
// // //   FaImage,
// // //   FaTimesCircle,
// // // } from "react-icons/fa";
// // // import axios from "axios";
// // // import { toast, ToastContainer } from "react-toastify";
// // // import "react-toastify/dist/ReactToastify.css";
// // // import { useSocket } from "../context/SocketContext";

// // // const getToken = () =>
// // //   localStorage.getItem("token") || sessionStorage.getItem("token");
// // // const authHeader = () => ({ Authorization: `Bearer ${getToken()}` });

// // // const adminChatService = {
// // //   getAllChats: async (filter = "all", search = "") => {
// // //     const res = await axios.get(
// // //       `http://localhost:5000/api/admin/chats?filter=${filter}&search=${encodeURIComponent(search)}`,
// // //       { headers: authHeader() },
// // //     );
// // //     return res.data;
// // //   },
// // //   getChat: async (chatId) => {
// // //     const res = await axios.get(
// // //       `http://localhost:5000/api/admin/chats/${chatId}`,
// // //       {
// // //         headers: authHeader(),
// // //       },
// // //     );
// // //     return res.data;
// // //   },
// // //   sendMessage: async (chatId, message) => {
// // //     const res = await axios.post(
// // //       `http://localhost:5000/api/admin/chats/${chatId}/message`,
// // //       { message },
// // //       { headers: authHeader() },
// // //     );
// // //     return res.data;
// // //   },
// // //   markAsRead: async (chatId) => {
// // //     const res = await axios.put(
// // //       `http://localhost:5000/api/admin/chats/${chatId}/read`,
// // //       {},
// // //       { headers: authHeader() },
// // //     );
// // //     return res.data;
// // //   },
// // //   blockUser: async (chatId) => {
// // //     const res = await axios.put(
// // //       `http://localhost:5000/api/admin/chats/${chatId}/block`,
// // //       {},
// // //       { headers: authHeader() },
// // //     );
// // //     return res.data;
// // //   },
// // //   unblockUser: async (chatId) => {
// // //     const res = await axios.put(
// // //       `http://localhost:5000/api/admin/chats/${chatId}/unblock`,
// // //       {},
// // //       { headers: authHeader() },
// // //     );
// // //     return res.data;
// // //   },
// // //   getUnreadCount: async () => {
// // //     const res = await axios.get(
// // //       `http://localhost:5000/api/admin/chats/unread/count`,
// // //       { headers: authHeader() },
// // //     );
// // //     return res.data;
// // //   },
// // // };

// // // const formatChatTime = (date) => {
// // //   if (!date) return "";
// // //   const now = new Date();
// // //   const d = new Date(date);
// // //   const diffMs = now - d;
// // //   const mins = Math.floor(diffMs / 60000);
// // //   const hours = Math.floor(diffMs / 3600000);
// // //   const days = Math.floor(diffMs / 86400000);
// // //   if (mins < 1) return "now";
// // //   if (mins < 60) return `${mins}m`;
// // //   if (hours < 24) return `${hours}h`;
// // //   if (days === 1) return "Yesterday";
// // //   return d.toLocaleDateString();
// // // };

// // // const formatMsgTime = (date) =>
// // //   new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

// // // const Avatar = ({ user, size = "md", className = "" }) => {
// // //   const s =
// // //     size === "sm"
// // //       ? "w-7 h-7 text-[10px]"
// // //       : size === "lg"
// // //         ? "w-12 h-12 text-base"
// // //         : "w-9 h-9 text-sm";
// // //   if (user?.profilePhoto) {
// // //     return (
// // //       <img
// // //         src={`http://localhost:5000/uploads/profiles/${user.profilePhoto}`}
// // //         alt={user.name}
// // //         className={`${s} rounded-full object-cover flex-shrink-0 ${className}`}
// // //       />
// // //     );
// // //   }
// // //   return (
// // //     <div
// // //       className={`${s} rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0 ${className}`}
// // //     >
// // //       {user?.name?.charAt(0)?.toUpperCase() || "?"}
// // //     </div>
// // //   );
// // // };

// // // // ─── Emoji Data ───────────────────────────────────────────────────────────────
// // // const EMOJI_CATEGORIES = [
// // //   {
// // //     id: "recent",
// // //     label: "Recently Used",
// // //     icon: "🕐",
// // //     emojis: [
// // //       "😂",
// // //       "❤️",
// // //       "👍",
// // //       "🔥",
// // //       "😊",
// // //       "🎉",
// // //       "✨",
// // //       "💯",
// // //       "🙏",
// // //       "😍",
// // //       "🥳",
// // //       "💪",
// // //       "😭",
// // //       "🤣",
// // //       "😅",
// // //       "🫶",
// // //     ],
// // //   },
// // //   {
// // //     id: "smileys",
// // //     label: "Smileys & Emotion",
// // //     icon: "😀",
// // //     emojis: [
// // //       "😀",
// // //       "😃",
// // //       "😄",
// // //       "😁",
// // //       "😆",
// // //       "😅",
// // //       "😂",
// // //       "🤣",
// // //       "😊",
// // //       "😇",
// // //       "🙂",
// // //       "🙃",
// // //       "😉",
// // //       "😌",
// // //       "😍",
// // //       "🥰",
// // //       "😘",
// // //       "😗",
// // //       "😙",
// // //       "😚",
// // //       "😋",
// // //       "😛",
// // //       "😝",
// // //       "😜",
// // //       "🤪",
// // //       "🤨",
// // //       "🧐",
// // //       "🤓",
// // //       "😎",
// // //       "🥸",
// // //       "🤩",
// // //       "🥳",
// // //       "😏",
// // //       "😒",
// // //       "😞",
// // //       "😔",
// // //       "😟",
// // //       "😕",
// // //       "🙁",
// // //       "☹️",
// // //       "😣",
// // //       "😖",
// // //       "😫",
// // //       "😩",
// // //       "🥺",
// // //       "😢",
// // //       "😭",
// // //       "😤",
// // //       "😠",
// // //       "😡",
// // //       "🤬",
// // //       "🤯",
// // //       "😳",
// // //       "🥵",
// // //       "🥶",
// // //       "😱",
// // //       "😨",
// // //       "😰",
// // //       "😥",
// // //       "😓",
// // //       "🤗",
// // //       "🤔",
// // //       "🫣",
// // //       "🤭",
// // //       "🤫",
// // //       "🤥",
// // //       "😶",
// // //       "😶‍🌫️",
// // //       "😐",
// // //       "😑",
// // //       "😬",
// // //       "🙄",
// // //       "😯",
// // //       "😦",
// // //       "😧",
// // //       "😮",
// // //       "😲",
// // //       "🥱",
// // //       "😴",
// // //       "🤤",
// // //       "😪",
// // //       "😵",
// // //       "😵‍💫",
// // //       "🤐",
// // //       "🥴",
// // //       "🤢",
// // //       "🤮",
// // //       "🤧",
// // //       "😷",
// // //       "🤒",
// // //       "🤕",
// // //       "🤑",
// // //       "🤠",
// // //       "😈",
// // //       "👿",
// // //       "👹",
// // //       "👺",
// // //       "🤡",
// // //       "💩",
// // //       "👻",
// // //       "💀",
// // //       "☠️",
// // //       "👽",
// // //       "👾",
// // //       "🤖",
// // //       "🎃",
// // //       "😺",
// // //       "😸",
// // //       "😹",
// // //       "😻",
// // //       "😼",
// // //       "😽",
// // //       "🙀",
// // //       "😿",
// // //       "😾",
// // //     ],
// // //   },
// // //   {
// // //     id: "people",
// // //     label: "People & Body",
// // //     icon: "👋",
// // //     emojis: [
// // //       "👋",
// // //       "🤚",
// // //       "🖐",
// // //       "✋",
// // //       "🖖",
// // //       "🫱",
// // //       "🫲",
// // //       "🫳",
// // //       "🫴",
// // //       "👌",
// // //       "🤌",
// // //       "🤏",
// // //       "✌️",
// // //       "🤞",
// // //       "🫰",
// // //       "🤟",
// // //       "🤘",
// // //       "🤙",
// // //       "👈",
// // //       "👉",
// // //       "👆",
// // //       "🖕",
// // //       "👇",
// // //       "☝️",
// // //       "🫵",
// // //       "👍",
// // //       "👎",
// // //       "✊",
// // //       "👊",
// // //       "🤛",
// // //       "🤜",
// // //       "👏",
// // //       "🙌",
// // //       "🫶",
// // //       "👐",
// // //       "🤲",
// // //       "🤝",
// // //       "🙏",
// // //       "✍️",
// // //       "💅",
// // //       "🤳",
// // //       "💪",
// // //       "🦾",
// // //       "🦿",
// // //       "🦵",
// // //       "🦶",
// // //       "👂",
// // //       "🦻",
// // //       "👃",
// // //       "🫀",
// // //       "🫁",
// // //       "🧠",
// // //       "🦷",
// // //       "🦴",
// // //       "👀",
// // //       "👁",
// // //       "👅",
// // //       "👄",
// // //       "🫦",
// // //       "👶",
// // //       "🧒",
// // //       "👦",
// // //       "👧",
// // //       "🧑",
// // //       "👱",
// // //       "👨",
// // //       "🧔",
// // //       "👩",
// // //       "🧓",
// // //       "👴",
// // //       "👵",
// // //     ],
// // //   },
// // //   {
// // //     id: "nature",
// // //     label: "Animals & Nature",
// // //     icon: "🌿",
// // //     emojis: [
// // //       "🐶",
// // //       "🐱",
// // //       "🐭",
// // //       "🐹",
// // //       "🐰",
// // //       "🦊",
// // //       "🐻",
// // //       "🐼",
// // //       "🐨",
// // //       "🐯",
// // //       "🦁",
// // //       "🐮",
// // //       "🐷",
// // //       "🐸",
// // //       "🐵",
// // //       "🙈",
// // //       "🙉",
// // //       "🙊",
// // //       "🐔",
// // //       "🐧",
// // //       "🐦",
// // //       "🐤",
// // //       "🦆",
// // //       "🦅",
// // //       "🦉",
// // //       "🦇",
// // //       "🐺",
// // //       "🐗",
// // //       "🐴",
// // //       "🦄",
// // //       "🐝",
// // //       "🐛",
// // //       "🦋",
// // //       "🐌",
// // //       "🐞",
// // //       "🐜",
// // //       "🦟",
// // //       "🦗",
// // //       "🦂",
// // //       "🐢",
// // //       "🐍",
// // //       "🦎",
// // //       "🦖",
// // //       "🦕",
// // //       "🐙",
// // //       "🦑",
// // //       "🦐",
// // //       "🦞",
// // //       "🦀",
// // //       "🐡",
// // //       "🐠",
// // //       "🐟",
// // //       "🐬",
// // //       "🐳",
// // //       "🐋",
// // //       "🦈",
// // //       "🐊",
// // //       "🐅",
// // //       "🐆",
// // //       "🦓",
// // //       "🦍",
// // //       "🦧",
// // //       "🦣",
// // //       "🐘",
// // //       "🦛",
// // //       "🦏",
// // //       "🐪",
// // //       "🐫",
// // //       "🦒",
// // //       "🦘",
// // //       "🦬",
// // //       "🐃",
// // //       "🐂",
// // //       "🐄",
// // //       "🐎",
// // //       "🐖",
// // //       "🐏",
// // //       "🐑",
// // //       "🦙",
// // //       "🐐",
// // //       "🦌",
// // //       "🐕",
// // //       "🐩",
// // //       "🦮",
// // //       "🐈",
// // //       "🐓",
// // //       "🦃",
// // //       "🦤",
// // //       "🦚",
// // //       "🦜",
// // //       "🦢",
// // //       "🦩",
// // //       "🕊",
// // //       "🐇",
// // //       "🦝",
// // //       "🦨",
// // //       "🦡",
// // //       "🦫",
// // //       "🦦",
// // //       "🦥",
// // //       "🐁",
// // //       "🐀",
// // //       "🐿",
// // //       "🦔",
// // //       "🐾",
// // //       "🐉",
// // //       "🌵",
// // //       "🎄",
// // //       "🌲",
// // //       "🌳",
// // //       "🌴",
// // //       "🪵",
// // //       "🌱",
// // //       "🌿",
// // //       "☘️",
// // //       "🍀",
// // //       "🎍",
// // //       "🎋",
// // //       "🍃",
// // //       "🍂",
// // //       "🍁",
// // //       "🪺",
// // //       "🪹",
// // //       "🍄",
// // //       "🌾",
// // //       "💐",
// // //       "🌷",
// // //       "🌹",
// // //       "🥀",
// // //       "🪷",
// // //       "🌺",
// // //       "🌸",
// // //       "🌼",
// // //       "🌻",
// // //       "🌞",
// // //       "🌝",
// // //       "🌛",
// // //       "🌜",
// // //       "🌚",
// // //       "🌕",
// // //       "🌖",
// // //       "🌗",
// // //       "🌘",
// // //       "🌑",
// // //       "🌒",
// // //       "🌓",
// // //       "🌔",
// // //       "🌙",
// // //       "🌟",
// // //       "⭐",
// // //       "🌠",
// // //       "🌌",
// // //       "☁️",
// // //       "⛅",
// // //       "🌤",
// // //       "🌈",
// // //       "🌂",
// // //       "☔",
// // //       "⚡",
// // //       "❄️",
// // //       "☃️",
// // //       "⛄",
// // //       "🌬",
// // //       "💨",
// // //       "🌀",
// // //       "🌊",
// // //       "🌫",
// // //     ],
// // //   },
// // //   {
// // //     id: "food",
// // //     label: "Food & Drink",
// // //     icon: "🍎",
// // //     emojis: [
// // //       "🍎",
// // //       "🍊",
// // //       "🍋",
// // //       "🍇",
// // //       "🍓",
// // //       "🫐",
// // //       "🍈",
// // //       "🍒",
// // //       "🍑",
// // //       "🥭",
// // //       "🍍",
// // //       "🥥",
// // //       "🥝",
// // //       "🍅",
// // //       "🥑",
// // //       "🍆",
// // //       "🥦",
// // //       "🥬",
// // //       "🥒",
// // //       "🌶",
// // //       "🫑",
// // //       "🧄",
// // //       "🧅",
// // //       "🥔",
// // //       "🍠",
// // //       "🫘",
// // //       "🌽",
// // //       "🥕",
// // //       "🧇",
// // //       "🥞",
// // //       "🧆",
// // //       "🍳",
// // //       "🥚",
// // //       "🍤",
// // //       "🍙",
// // //       "🍚",
// // //       "🍘",
// // //       "🍥",
// // //       "🥮",
// // //       "🍢",
// // //       "🧁",
// // //       "🍰",
// // //       "🎂",
// // //       "🍮",
// // //       "🍭",
// // //       "🍬",
// // //       "🍫",
// // //       "🍿",
// // //       "🍩",
// // //       "🍪",
// // //       "🌰",
// // //       "🥜",
// // //       "🍯",
// // //       "🧃",
// // //       "🥤",
// // //       "🧋",
// // //       "☕",
// // //       "🍵",
// // //       "🫖",
// // //       "🍺",
// // //       "🍻",
// // //       "🥂",
// // //       "🍷",
// // //       "🫗",
// // //       "🥃",
// // //       "🍸",
// // //       "🍹",
// // //       "🧉",
// // //       "🍾",
// // //       "🧊",
// // //       "🥄",
// // //       "🍴",
// // //       "🍽",
// // //       "🥢",
// // //       "🧂",
// // //     ],
// // //   },
// // //   {
// // //     id: "activity",
// // //     label: "Activity",
// // //     icon: "⚽",
// // //     emojis: [
// // //       "⚽",
// // //       "🏀",
// // //       "🏈",
// // //       "⚾",
// // //       "🥎",
// // //       "🎾",
// // //       "🏐",
// // //       "🏉",
// // //       "🥏",
// // //       "🎱",
// // //       "🪀",
// // //       "🏓",
// // //       "🏸",
// // //       "🏒",
// // //       "🏑",
// // //       "🥍",
// // //       "🏏",
// // //       "🪃",
// // //       "🥅",
// // //       "⛳",
// // //       "🪁",
// // //       "🏹",
// // //       "🎣",
// // //       "🤿",
// // //       "🥊",
// // //       "🥋",
// // //       "🎽",
// // //       "🛹",
// // //       "🛼",
// // //       "🛷",
// // //       "⛸",
// // //       "🥌",
// // //       "🎿",
// // //       "⛷",
// // //       "🏂",
// // //       "🪂",
// // //       "🏋️",
// // //       "🤼",
// // //       "🤸",
// // //       "⛹️",
// // //       "🤺",
// // //       "🏇",
// // //       "🧘",
// // //       "🏄",
// // //       "🏊",
// // //       "🤽",
// // //       "🚣",
// // //       "🧗",
// // //       "🚵",
// // //       "🚴",
// // //       "🏆",
// // //       "🥇",
// // //       "🥈",
// // //       "🥉",
// // //       "🏅",
// // //       "🎖",
// // //       "🎗",
// // //       "🎫",
// // //       "🎟",
// // //       "🎪",
// // //       "🤹",
// // //       "🎭",
// // //       "🩰",
// // //       "🎨",
// // //       "🎬",
// // //       "🎤",
// // //       "🎧",
// // //       "🎼",
// // //       "🎵",
// // //       "🎶",
// // //       "🎷",
// // //       "🪗",
// // //       "🎸",
// // //       "🎹",
// // //       "🪘",
// // //       "🎺",
// // //       "🎻",
// // //       "🪕",
// // //       "🥁",
// // //       "🪇",
// // //       "🎮",
// // //       "🎲",
// // //       "♟",
// // //       "🎯",
// // //       "🎳",
// // //     ],
// // //   },
// // //   {
// // //     id: "travel",
// // //     label: "Travel & Places",
// // //     icon: "✈️",
// // //     emojis: [
// // //       "🚗",
// // //       "🚕",
// // //       "🚙",
// // //       "🚌",
// // //       "🚎",
// // //       "🏎",
// // //       "🚓",
// // //       "🚑",
// // //       "🚒",
// // //       "🚐",
// // //       "🛻",
// // //       "🚚",
// // //       "🚛",
// // //       "🚜",
// // //       "🛵",
// // //       "🏍",
// // //       "🛺",
// // //       "🚲",
// // //       "🛴",
// // //       "🛹",
// // //       "🛼",
// // //       "🚏",
// // //       "🛣",
// // //       "🛤",
// // //       "⛽",
// // //       "🚧",
// // //       "⚓",
// // //       "🪝",
// // //       "⛵",
// // //       "🛶",
// // //       "🚤",
// // //       "🛥",
// // //       "🛳",
// // //       "⛴",
// // //       "🚢",
// // //       "✈️",
// // //       "🛩",
// // //       "🛫",
// // //       "🛬",
// // //       "🪂",
// // //       "💺",
// // //       "🚁",
// // //       "🚟",
// // //       "🚠",
// // //       "🚡",
// // //       "🛸",
// // //       "🚀",
// // //       "🛰",
// // //       "🚀",
// // //       "💺",
// // //       "🌍",
// // //       "🌎",
// // //       "🌏",
// // //       "🌐",
// // //       "🗺",
// // //       "🧭",
// // //       "🏔",
// // //       "⛰",
// // //       "🌋",
// // //       "🗻",
// // //       "🏕",
// // //       "🏖",
// // //       "🏜",
// // //       "🏝",
// // //       "🏞",
// // //       "🏟",
// // //       "🏛",
// // //       "🏗",
// // //       "🏘",
// // //       "🏚",
// // //       "🏠",
// // //       "🏡",
// // //       "🏢",
// // //       "🏣",
// // //       "🏤",
// // //       "🏥",
// // //       "🏦",
// // //       "🏨",
// // //       "🏩",
// // //       "🏪",
// // //       "🏫",
// // //       "🏬",
// // //       "🏭",
// // //       "🗼",
// // //       "🗽",
// // //       "⛪",
// // //       "🕌",
// // //       "🛕",
// // //       "🕍",
// // //       "⛩",
// // //       "🕋",
// // //       "⛲",
// // //       "⛺",
// // //       "🌁",
// // //       "🌃",
// // //       "🏙",
// // //       "🌄",
// // //       "🌅",
// // //       "🌆",
// // //       "🌇",
// // //       "🌉",
// // //       "🌌",
// // //       "🌠",
// // //       "🎇",
// // //       "🎆",
// // //       "🗺",
// // //     ],
// // //   },
// // //   {
// // //     id: "objects",
// // //     label: "Objects",
// // //     icon: "💡",
// // //     emojis: [
// // //       "💡",
// // //       "🔦",
// // //       "🕯",
// // //       "🪔",
// // //       "🧱",
// // //       "💎",
// // //       "🔮",
// // //       "🧿",
// // //       "💈",
// // //       "🪬",
// // //       "🗝",
// // //       "🔑",
// // //       "🛡",
// // //       "⚔️",
// // //       "🗡",
// // //       "🔧",
// // //       "🪛",
// // //       "🔩",
// // //       "⚙️",
// // //       "🗜",
// // //       "💣",
// // //       "🪤",
// // //       "🪜",
// // //       "🪞",
// // //       "🛋",
// // //       "🚿",
// // //       "🛁",
// // //       "🧴",
// // //       "🧷",
// // //       "🧹",
// // //       "🧺",
// // //       "🧻",
// // //       "🪣",
// // //       "🧼",
// // //       "🫧",
// // //       "🧽",
// // //       "🧯",
// // //       "🛒",
// // //       "🚪",
// // //       "🪟",
// // //       "🛏",
// // //       "🪑",
// // //       "🚽",
// // //       "🧲",
// // //       "🪄",
// // //       "🎩",
// // //       "🪅",
// // //       "🎊",
// // //       "🎉",
// // //       "🎈",
// // //       "🎁",
// // //       "🎀",
// // //       "🎗",
// // //       "🎫",
// // //       "🎟",
// // //       "🏷",
// // //       "📦",
// // //       "📫",
// // //       "📪",
// // //       "📬",
// // //       "📭",
// // //       "📮",
// // //       "🗳",
// // //       "✏️",
// // //       "✒️",
// // //       "🖋",
// // //       "🖊",
// // //       "📝",
// // //       "💼",
// // //       "📁",
// // //       "📂",
// // //       "🗂",
// // //       "📅",
// // //       "📆",
// // //       "🗒",
// // //       "🗓",
// // //       "📇",
// // //       "📈",
// // //       "📉",
// // //       "📊",
// // //       "📋",
// // //       "📌",
// // //       "📍",
// // //       "📎",
// // //       "🖇",
// // //       "📏",
// // //       "📐",
// // //       "✂️",
// // //       "🗃",
// // //       "🗄",
// // //       "🗑",
// // //       "🔒",
// // //       "🔓",
// // //       "🔏",
// // //       "🔐",
// // //       "🗝",
// // //       "🔨",
// // //       "🪓",
// // //       "⛏",
// // //       "⚒",
// // //       "🛠",
// // //       "🗡",
// // //       "⚔️",
// // //       "🛡",
// // //       "🪚",
// // //       "🔫",
// // //       "🪃",
// // //       "🏹",
// // //       "🪤",
// // //       "🪝",
// // //       "🔧",
// // //       "🪛",
// // //       "🔩",
// // //       "⚙️",
// // //       "🗜",
// // //       "🔗",
// // //       "⛓",
// // //       "🪝",
// // //       "🧲",
// // //       "🪜",
// // //       "🧰",
// // //       "🪣",
// // //       "🧲",
// // //       "🔬",
// // //       "🔭",
// // //       "📡",
// // //       "💉",
// // //       "🩸",
// // //       "💊",
// // //       "🩹",
// // //       "🩺",
// // //       "🩻",
// // //       "🩼",
// // //       "🩺",
// // //       "🔐",
// // //       "🚬",
// // //       "⚰️",
// // //       "🪦",
// // //       "⚱️",
// // //       "🏺",
// // //       "🧿",
// // //       "🪬",
// // //     ],
// // //   },
// // //   {
// // //     id: "symbols",
// // //     label: "Symbols",
// // //     icon: "❤️",
// // //     emojis: [
// // //       "❤️",
// // //       "🧡",
// // //       "💛",
// // //       "💚",
// // //       "💙",
// // //       "💜",
// // //       "🖤",
// // //       "🤍",
// // //       "🤎",
// // //       "💔",
// // //       "❤️‍🔥",
// // //       "❤️‍🩹",
// // //       "💕",
// // //       "💞",
// // //       "💓",
// // //       "💗",
// // //       "💖",
// // //       "💘",
// // //       "💝",
// // //       "💟",
// // //       "☮️",
// // //       "✝️",
// // //       "☯️",
// // //       "🕉",
// // //       "🔯",
// // //       "✡️",
// // //       "☦️",
// // //       "🛐",
// // //       "⛎",
// // //       "♈",
// // //       "♉",
// // //       "♊",
// // //       "♋",
// // //       "♌",
// // //       "♍",
// // //       "♎",
// // //       "♏",
// // //       "♐",
// // //       "♑",
// // //       "♒",
// // //       "♓",
// // //       "🆔",
// // //       "⚛️",
// // //       "🉑",
// // //       "☢️",
// // //       "☣️",
// // //       "📴",
// // //       "📳",
// // //       "🈶",
// // //       "🈚",
// // //       "🈸",
// // //       "🈺",
// // //       "🈷️",
// // //       "✴️",
// // //       "🆚",
// // //       "💮",
// // //       "🉐",
// // //       "㊙️",
// // //       "㊗️",
// // //       "🈴",
// // //       "🈵",
// // //       "🈹",
// // //       "🈲",
// // //       "🅰️",
// // //       "🅱️",
// // //       "🆎",
// // //       "🆑",
// // //       "🅾️",
// // //       "🆘",
// // //       "❌",
// // //       "⭕",
// // //       "🛑",
// // //       "⛔",
// // //       "📛",
// // //       "🚫",
// // //       "💯",
// // //       "💢",
// // //       "♨️",
// // //       "🚷",
// // //       "🚯",
// // //       "🚳",
// // //       "🚱",
// // //       "🔞",
// // //       "📵",
// // //       "🔕",
// // //       "🔇",
// // //       "🔈",
// // //       "🔉",
// // //       "🔊",
// // //       "📢",
// // //       "📣",
// // //       "🔔",
// // //       "🔕",
// // //       "🎵",
// // //       "🎶",
// // //       "⚠️",
// // //       "🚸",
// // //       "🔱",
// // //       "⚜️",
// // //       "🔰",
// // //       "♻️",
// // //       "✅",
// // //       "🈯",
// // //       "💹",
// // //       "❇️",
// // //       "✳️",
// // //       "❎",
// // //       "🌐",
// // //       "💠",
// // //       "Ⓜ️",
// // //       "🌀",
// // //       "💤",
// // //       "🏧",
// // //       "🚾",
// // //       "♿",
// // //       "🅿️",
// // //       "🛗",
// // //       "🈳",
// // //       "🈹",
// // //       "🚺",
// // //       "🚹",
// // //       "🚼",
// // //       "⚧",
// // //       "🚻",
// // //       "🚮",
// // //       "🎦",
// // //       "📶",
// // //       "🈁",
// // //       "🔣",
// // //       "ℹ️",
// // //       "🔤",
// // //       "🔡",
// // //       "🔠",
// // //       "🆖",
// // //       "🆗",
// // //       "🆙",
// // //       "🆒",
// // //       "🆕",
// // //       "🆓",
// // //       "0️⃣",
// // //       "1️⃣",
// // //       "2️⃣",
// // //       "3️⃣",
// // //       "4️⃣",
// // //       "5️⃣",
// // //       "6️⃣",
// // //       "7️⃣",
// // //       "8️⃣",
// // //       "9️⃣",
// // //       "🔟",
// // //       "🔢",
// // //       "#️⃣",
// // //       "*️⃣",
// // //       "⏏️",
// // //       "▶️",
// // //       "⏸",
// // //       "⏹",
// // //       "⏺",
// // //       "⏭",
// // //       "⏮",
// // //       "⏩",
// // //       "⏪",
// // //       "⏫",
// // //       "⏬",
// // //       "◀️",
// // //       "🔼",
// // //       "🔽",
// // //       "➡️",
// // //       "⬅️",
// // //       "⬆️",
// // //       "⬇️",
// // //       "↗️",
// // //       "↘️",
// // //       "↙️",
// // //       "↖️",
// // //       "↕️",
// // //       "↔️",
// // //       "↪️",
// // //       "↩️",
// // //       "⤴️",
// // //       "⤵️",
// // //       "🔀",
// // //       "🔁",
// // //       "🔂",
// // //       "🔄",
// // //       "🔃",
// // //       "🎵",
// // //       "🎶",
// // //       "➕",
// // //       "➖",
// // //       "➗",
// // //       "✖️",
// // //       "♾",
// // //       "💲",
// // //       "💱",
// // //       "™️",
// // //       "©️",
// // //       "®️",
// // //       "〰️",
// // //       "➰",
// // //       "➿",
// // //       "🔚",
// // //       "🔙",
// // //       "🔛",
// // //       "🔝",
// // //       "🔜",
// // //       "✔️",
// // //       "☑️",
// // //       "🔘",
// // //       "🔴",
// // //       "🟠",
// // //       "🟡",
// // //       "🟢",
// // //       "🔵",
// // //       "🟣",
// // //       "⚫",
// // //       "⚪",
// // //       "🟤",
// // //       "🔺",
// // //       "🔻",
// // //       "🔷",
// // //       "🔶",
// // //       "🔹",
// // //       "🔸",
// // //       "🔲",
// // //       "🔳",
// // //       "▪️",
// // //       "▫️",
// // //       "◾",
// // //       "◽",
// // //       "◼️",
// // //       "◻️",
// // //       "🟥",
// // //       "🟧",
// // //       "🟨",
// // //       "🟩",
// // //       "🟦",
// // //       "🟪",
// // //       "⬛",
// // //       "⬜",
// // //       "🟫",
// // //       "🔈",
// // //       "🔉",
// // //       "🔊",
// // //       "🔔",
// // //       "🔕",
// // //       "📣",
// // //       "📢",
// // //       "💬",
// // //       "💭",
// // //       "🗯",
// // //       "♠️",
// // //       "♣️",
// // //       "♥️",
// // //       "♦️",
// // //       "🃏",
// // //       "🎴",
// // //       "🀄",
// // //       "🎲",
// // //       "🧩",
// // //       "♟",
// // //     ],
// // //   },
// // // ];

// // // // ─── Custom Emoji Picker Component ───────────────────────────────────────────
// // // const CustomEmojiPicker = ({ onEmojiClick, onClose }) => {
// // //   const [activeCategory, setActiveCategory] = useState("recent");
// // //   const [searchQuery, setSearchQuery] = useState("");
// // //   const [hoveredEmoji, setHoveredEmoji] = useState(null);
// // //   const searchRef = useRef(null);

// // //   useEffect(() => {
// // //     setTimeout(() => searchRef.current?.focus(), 50);
// // //   }, []);

// // //   const currentCategory = EMOJI_CATEGORIES.find((c) => c.id === activeCategory);

// // //   const displayedEmojis = searchQuery.trim()
// // //     ? EMOJI_CATEGORIES.flatMap((c) => c.emojis)
// // //         .filter((e) => e.includes(searchQuery.trim()))
// // //         .slice(0, 64)
// // //     : currentCategory?.emojis || [];

// // //   const sectionLabel = searchQuery.trim()
// // //     ? `Results for "${searchQuery}"`
// // //     : currentCategory?.label || "";

// // //   return (
// // //     <div
// // //       className="absolute bottom-full mb-2 right-0 z-50 w-[336px] bg-white rounded-2xl overflow-hidden shadow-2xl"
// // //       style={{ border: "1px solid rgba(0,0,0,0.08)" }}
// // //     >
// // //       {/* Header: Search + Close */}
// // //       <div className="flex items-center gap-2 px-3 py-2.5 border-b border-gray-100">
// // //         <div className="flex items-center gap-2 flex-1 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5">
// // //           <FaSearch size={10} className="text-gray-400 flex-shrink-0" />
// // //           <input
// // //             ref={searchRef}
// // //             type="text"
// // //             value={searchQuery}
// // //             onChange={(e) => setSearchQuery(e.target.value)}
// // //             placeholder="Search emoji…"
// // //             className="flex-1 bg-transparent text-xs text-gray-700 placeholder-gray-400 focus:outline-none"
// // //           />
// // //           {searchQuery && (
// // //             <button
// // //               onClick={() => setSearchQuery("")}
// // //               className="text-gray-400 hover:text-gray-600 transition"
// // //             >
// // //               <FaTimes size={9} />
// // //             </button>
// // //           )}
// // //         </div>
// // //         <button
// // //           onClick={onClose}
// // //           className="w-[26px] h-[26px] flex items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition flex-shrink-0"
// // //           title="Close"
// // //         >
// // //           <FaTimes size={9} />
// // //         </button>
// // //       </div>

// // //       {/* Category Tabs */}
// // //       {!searchQuery && (
// // //         <div
// // //           className="flex gap-0.5 px-2.5 py-1.5 border-b border-gray-100 overflow-x-auto"
// // //           style={{ scrollbarWidth: "none" }}
// // //         >
// // //           {EMOJI_CATEGORIES.map((cat) => (
// // //             <button
// // //               key={cat.id}
// // //               onClick={() => setActiveCategory(cat.id)}
// // //               title={cat.label}
// // //               className={`w-[30px] h-7 rounded-md text-[15px] flex items-center justify-center transition flex-shrink-0 ${
// // //                 activeCategory === cat.id
// // //                   ? "bg-blue-50"
// // //                   : "bg-transparent hover:bg-gray-100"
// // //               }`}
// // //             >
// // //               {cat.icon}
// // //             </button>
// // //           ))}
// // //         </div>
// // //       )}

// // //       {/* Emoji Grid */}
// // //       <div
// // //         className="overflow-y-auto px-2.5 py-2"
// // //         style={{
// // //           height: "224px",
// // //           scrollbarWidth: "thin",
// // //           scrollbarColor: "#e5e7eb transparent",
// // //         }}
// // //       >
// // //         {sectionLabel && (
// // //           <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5 px-0.5">
// // //             {sectionLabel}
// // //           </p>
// // //         )}
// // //         {displayedEmojis.length === 0 ? (
// // //           <div className="flex flex-col items-center justify-center h-32 text-center">
// // //             <span className="text-3xl mb-2">🔍</span>
// // //             <p className="text-xs text-gray-400">No emoji found</p>
// // //           </div>
// // //         ) : (
// // //           <div className="grid grid-cols-8 gap-0.5">
// // //             {displayedEmojis.map((emoji, i) => (
// // //               <button
// // //                 key={`${emoji}-${i}`}
// // //                 onClick={() => onEmojiClick({ emoji })}
// // //                 onMouseEnter={() => setHoveredEmoji(emoji)}
// // //                 onMouseLeave={() => setHoveredEmoji(null)}
// // //                 className="w-[34px] h-[34px] rounded-lg text-[18px] flex items-center justify-center hover:bg-blue-50 transition-all"
// // //                 style={{
// // //                   transform: hoveredEmoji === emoji ? "scale(1.2)" : "scale(1)",
// // //                 }}
// // //               >
// // //                 {emoji}
// // //               </button>
// // //             ))}
// // //           </div>
// // //         )}
// // //       </div>

// // //       {/* Footer Preview */}
// // //       <div className="flex items-center gap-2 px-3 py-2 border-t border-gray-100 min-h-[36px] bg-gray-50/60">
// // //         {hoveredEmoji ? (
// // //           <>
// // //             <span className="text-[22px] leading-none">{hoveredEmoji}</span>
// // //             <span className="text-[11px] text-gray-500 font-medium">
// // //               {hoveredEmoji}
// // //             </span>
// // //           </>
// // //         ) : (
// // //           <span className="text-[11px] text-gray-400 italic">
// // //             Hover an emoji to preview
// // //           </span>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // // ─── Main Component ───────────────────────────────────────────────────────────
// // // const AdminMessages = () => {
// // //   const adminUser = JSON.parse(
// // //     localStorage.getItem("user") || sessionStorage.getItem("user") || "null",
// // //   );
// // //   const adminId = adminUser?._id || adminUser?.id;

// // //   const {
// // //     isConnected,
// // //     joinChat,
// // //     leaveChat,
// // //     onNewMessage,
// // //     markRead: socketMarkRead,
// // //   } = useSocket();

// // //   const [chats, setChats] = useState([]);
// // //   const [filteredChats, setFilteredChats] = useState([]);
// // //   const [chatsLoading, setChatsLoading] = useState(false);
// // //   const [selectedChat, setSelectedChat] = useState(null);
// // //   const [messages, setMessages] = useState([]);
// // //   const [messagesLoading, setMessagesLoading] = useState(false);
// // //   const [newMessage, setNewMessage] = useState("");
// // //   const [sending, setSending] = useState(false);
// // //   const [searchQuery, setSearchQuery] = useState("");
// // //   const [activeFilter, setActiveFilter] = useState("all");
// // //   const [showChatWindow, setShowChatWindow] = useState(false);
// // //   const [showBlockConfirm, setShowBlockConfirm] = useState(false);
// // //   const [showUnblockConfirm, setShowUnblockConfirm] = useState(false);
// // //   const [blockingUser, setBlockingUser] = useState(false);
// // //   const [totalUnread, setTotalUnread] = useState(0);
// // //   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
// // //   const [uploadingImage, setUploadingImage] = useState(false);

// // //   const messagesEndRef = useRef(null);
// // //   const inputRef = useRef(null);
// // //   const selectedChatRef = useRef(null);
// // //   const initialLoadDone = useRef(false);
// // //   const fileInputRef = useRef(null);
// // //   const emojiPickerRef = useRef(null);

// // //   useEffect(() => {
// // //     selectedChatRef.current = selectedChat;
// // //   }, [selectedChat]);

// // //   // Close emoji picker on outside click
// // //   useEffect(() => {
// // //     const handleClickOutside = (event) => {
// // //       if (
// // //         emojiPickerRef.current &&
// // //         !emojiPickerRef.current.contains(event.target) &&
// // //         !event.target.closest(".emoji-toggle-btn")
// // //       ) {
// // //         setShowEmojiPicker(false);
// // //       }
// // //     };
// // //     document.addEventListener("mousedown", handleClickOutside);
// // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // //   }, []);

// // //   const fetchUnreadCount = useCallback(async () => {
// // //     try {
// // //       const res = await adminChatService.getUnreadCount();
// // //       if (res.success) setTotalUnread(res.count);
// // //     } catch (error) {
// // //       console.error("Error fetching unread count:", error);
// // //     }
// // //   }, []);

// // //   const fetchChats = useCallback(async () => {
// // //     try {
// // //       setChatsLoading(true);
// // //       const res = await adminChatService.getAllChats(activeFilter, searchQuery);
// // //       if (res.success) {
// // //         setChats(res.data);
// // //         setFilteredChats(res.data);
// // //         const unread = res.data.reduce(
// // //           (acc, c) => acc + (c.unreadForAdmin || 0),
// // //           0,
// // //         );
// // //         setTotalUnread(unread);
// // //       }
// // //     } catch (error) {
// // //       console.error("Error fetching chats:", error);
// // //       toast.error("Failed to load chats");
// // //     } finally {
// // //       setChatsLoading(false);
// // //     }
// // //   }, [activeFilter, searchQuery]);

// // //   useEffect(() => {
// // //     if (!initialLoadDone.current) {
// // //       initialLoadDone.current = true;
// // //       fetchChats();
// // //       fetchUnreadCount();
// // //     }
// // //   }, [fetchChats, fetchUnreadCount]);

// // //   useEffect(() => {
// // //     if (initialLoadDone.current) {
// // //       fetchChats();
// // //       fetchUnreadCount();
// // //     }
// // //   }, [activeFilter, searchQuery, fetchChats, fetchUnreadCount]);

// // //   useEffect(() => {
// // //     const unsubscribe = onNewMessage("*", (data) => {
// // //       if (!data.message) return;
// // //       setChats((prev) =>
// // //         prev.map((c) => {
// // //           if (c._id !== data.chatId) return c;
// // //           const isCurrentlyOpen = selectedChatRef.current?._id === data.chatId;
// // //           return {
// // //             ...c,
// // //             lastMessage: data.message.message || "📷 Image",
// // //             lastMessageAt: data.message.createdAt,
// // //             unreadForAdmin: isCurrentlyOpen ? 0 : (c.unreadForAdmin || 0) + 1,
// // //           };
// // //         }),
// // //       );
// // //       setTotalUnread((prev) => {
// // //         const isCurrentlyOpen = selectedChatRef.current?._id === data.chatId;
// // //         return isCurrentlyOpen ? prev : prev + 1;
// // //       });
// // //     });
// // //     return unsubscribe;
// // //   }, [onNewMessage]);

// // //   useEffect(() => {
// // //     if (!selectedChat?._id) return;
// // //     const chatId = selectedChat._id;

// // //     const unsubscribe = onNewMessage(chatId, (data) => {
// // //       if (!data.message) return;

// // //       setMessages((prev) => {
// // //         if (prev.some((m) => m._id === data.message._id)) return prev;
// // //         const tempIdx = prev.findIndex(
// // //           (m) =>
// // //             m._id?.toString().startsWith("temp-") &&
// // //             m.message === data.message.message,
// // //         );
// // //         if (tempIdx !== -1) {
// // //           const next = [...prev];
// // //           next[tempIdx] = data.message;
// // //           return next;
// // //         }
// // //         return [...prev, data.message];
// // //       });

// // //       setTimeout(
// // //         () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
// // //         80,
// // //       );
// // //       adminChatService.markAsRead(chatId).catch(() => {});
// // //       socketMarkRead(chatId);
// // //     });
// // //     return unsubscribe;
// // //   }, [selectedChat?._id, onNewMessage, socketMarkRead]);

// // //   useEffect(() => {
// // //     if (messagesEndRef.current)
// // //       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
// // //   }, [messages]);

// // //   useEffect(() => {
// // //     if (!searchQuery.trim()) {
// // //       setFilteredChats(chats);
// // //       return;
// // //     }
// // //     const q = searchQuery.toLowerCase();
// // //     setFilteredChats(
// // //       chats.filter((c) => {
// // //         const name = (c.otherParticipant?.name || "").toLowerCase();
// // //         const vehicle = (c.vehicleName || "").toLowerCase();
// // //         const last = (c.lastMessage || "").toLowerCase();
// // //         return name.includes(q) || vehicle.includes(q) || last.includes(q);
// // //       }),
// // //     );
// // //   }, [searchQuery, chats]);

// // //   const openChat = async (chat) => {
// // //     if (selectedChatRef.current?._id) leaveChat(selectedChatRef.current._id);
// // //     setSelectedChat(chat);
// // //     setShowChatWindow(true);
// // //     setMessages([]);
// // //     joinChat(chat._id);
// // //     setShowEmojiPicker(false);

// // //     if (!chat.isBlocked) {
// // //       try {
// // //         setMessagesLoading(true);
// // //         const res = await adminChatService.getChat(chat._id);
// // //         if (res.success) {
// // //           setMessages(res.data.messages || []);
// // //           await adminChatService.markAsRead(chat._id);
// // //           socketMarkRead(chat._id);
// // //           setChats((prev) =>
// // //             prev.map((c) =>
// // //               c._id !== chat._id ? c : { ...c, unreadForAdmin: 0 },
// // //             ),
// // //           );
// // //           await fetchUnreadCount();
// // //         }
// // //       } catch (error) {
// // //         console.error("Error loading messages:", error);
// // //         toast.error("Failed to load messages");
// // //       } finally {
// // //         setMessagesLoading(false);
// // //       }
// // //     }
// // //     setTimeout(() => inputRef.current?.focus(), 200);
// // //   };

// // //   const closeChat = () => {
// // //     if (selectedChatRef.current?._id) leaveChat(selectedChatRef.current._id);
// // //     setShowChatWindow(false);
// // //     setSelectedChat(null);
// // //     setMessages([]);
// // //     setNewMessage("");
// // //     setShowEmojiPicker(false);
// // //   };

// // //   const handleImageUpload = async (e) => {
// // //     const file = e.target.files[0];
// // //     if (!file) return;
// // //     if (!file.type.startsWith("image/")) {
// // //       toast.error("Only image files are allowed");
// // //       return;
// // //     }
// // //     if (file.size > 5 * 1024 * 1024) {
// // //       toast.error("Image must be less than 5MB");
// // //       return;
// // //     }

// // //     setUploadingImage(true);
// // //     try {
// // //       const formData = new FormData();
// // //       formData.append("image", file);
// // //       const res = await axios.post(
// // //         `http://localhost:5000/api/admin/chats/${selectedChat._id}/image`,
// // //         formData,
// // //         { headers: { ...authHeader(), "Content-Type": "multipart/form-data" } },
// // //       );
// // //       if (res.data.success) {
// // //         const tempMsg = {
// // //           _id: `temp-${Date.now()}`,
// // //           message: "",
// // //           senderType: "admin",
// // //           read: false,
// // //           delivered: false,
// // //           createdAt: new Date(),
// // //           attachments: [{ url: res.data.data.url, type: "image" }],
// // //           sender: adminUser,
// // //         };
// // //         setMessages((prev) => [...prev, tempMsg]);
// // //         setTimeout(
// // //           () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
// // //           100,
// // //         );
// // //       }
// // //     } catch (error) {
// // //       console.error("Error uploading image:", error);
// // //       toast.error("Failed to upload image");
// // //     } finally {
// // //       setUploadingImage(false);
// // //       if (fileInputRef.current) fileInputRef.current.value = "";
// // //     }
// // //   };

// // //   const sendMessage = async () => {
// // //     if (
// // //       (!newMessage.trim() && !uploadingImage) ||
// // //       sending ||
// // //       selectedChat?.isBlocked
// // //     )
// // //       return;
// // //     const text = newMessage.trim();
// // //     setSending(true);

// // //     const tempMsg = {
// // //       _id: `temp-${Date.now()}`,
// // //       message: text,
// // //       senderType: "admin",
// // //       read: false,
// // //       delivered: false,
// // //       createdAt: new Date(),
// // //       sender: adminUser,
// // //       attachments: [],
// // //     };
// // //     setMessages((prev) => [...prev, tempMsg]);
// // //     setNewMessage("");
// // //     setShowEmojiPicker(false);
// // //     setTimeout(
// // //       () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
// // //       100,
// // //     );

// // //     try {
// // //       const res = await adminChatService.sendMessage(selectedChat._id, text);
// // //       if (res.success) {
// // //         setMessages((prev) =>
// // //           prev.map((m) => (m._id === tempMsg._id ? res.data : m)),
// // //         );
// // //         setChats((prev) =>
// // //           prev.map((c) =>
// // //             c._id !== selectedChat._id
// // //               ? c
// // //               : {
// // //                   ...c,
// // //                   lastMessage: text || "📷 Image",
// // //                   lastMessageAt: new Date(),
// // //                 },
// // //           ),
// // //         );
// // //       } else {
// // //         setMessages((prev) => prev.filter((m) => m._id !== tempMsg._id));
// // //         toast.error("Failed to send message");
// // //       }
// // //     } catch (error) {
// // //       console.error("Error sending message:", error);
// // //       setMessages((prev) => prev.filter((m) => m._id !== tempMsg._id));
// // //       toast.error("Failed to send message");
// // //     } finally {
// // //       setSending(false);
// // //     }
// // //   };

// // //   const handleBlock = async () => {
// // //     setBlockingUser(true);
// // //     try {
// // //       const res = await adminChatService.blockUser(selectedChat._id);
// // //       if (res.success) {
// // //         toast.success(
// // //           `${selectedChat.otherParticipant?.name} has been blocked`,
// // //         );
// // //         setSelectedChat((p) => ({ ...p, isBlocked: true, blockedBy: adminId }));
// // //         setMessages([]);
// // //         fetchChats();
// // //         fetchUnreadCount();
// // //       }
// // //     } catch (error) {
// // //       console.error("Error blocking user:", error);
// // //       toast.error("Failed to block user");
// // //     } finally {
// // //       setBlockingUser(false);
// // //       setShowBlockConfirm(false);
// // //     }
// // //   };

// // //   const handleUnblock = async () => {
// // //     setBlockingUser(true);
// // //     try {
// // //       const res = await adminChatService.unblockUser(selectedChat._id);
// // //       if (res.success) {
// // //         toast.success(
// // //           `${selectedChat.otherParticipant?.name} has been unblocked`,
// // //         );
// // //         setSelectedChat((p) => ({ ...p, isBlocked: false, blockedBy: null }));
// // //         const msgRes = await adminChatService.getChat(selectedChat._id);
// // //         if (msgRes.success) setMessages(msgRes.data.messages || []);
// // //         fetchChats();
// // //         fetchUnreadCount();
// // //       }
// // //     } catch (error) {
// // //       console.error("Error unblocking user:", error);
// // //       toast.error("Failed to unblock user");
// // //     } finally {
// // //       setBlockingUser(false);
// // //       setShowUnblockConfirm(false);
// // //     }
// // //   };

// // //   const handleManualRefresh = () => {
// // //     fetchChats();
// // //     fetchUnreadCount();
// // //     toast.info("Refreshed messages");
// // //   };

// // //   const onEmojiClick = ({ emoji }) => {
// // //     setNewMessage((prev) => prev + emoji);
// // //     inputRef.current?.focus();
// // //   };

// // //   const getUnread = (chat) => chat.unreadForAdmin || 0;
// // //   const iBlockedThem =
// // //     selectedChat?.isBlocked && selectedChat?.blockedBy === adminId;

// // //   const filterTabs = [
// // //     { id: "all", label: "All", count: chats.length },
// // //     {
// // //       id: "vehicle",
// // //       label: "Vehicle Chats",
// // //       count: chats.filter((c) => c.chatType === "vehicle").length,
// // //     },
// // //     {
// // //       id: "support",
// // //       label: "Support",
// // //       count: chats.filter((c) => c.chatType === "support").length,
// // //     },
// // //     {
// // //       id: "unread",
// // //       label: "Unread",
// // //       count: chats.filter((c) => getUnread(c) > 0).length,
// // //     },
// // //   ];

// // //   const groupedMessages = (() => {
// // //     const groups = [];
// // //     let lastDate = null;
// // //     messages.forEach((msg, i) => {
// // //       const day = new Date(msg.createdAt).toDateString();
// // //       if (day !== lastDate) {
// // //         const today = new Date().toDateString();
// // //         const yesterday = new Date(Date.now() - 86400000).toDateString();
// // //         groups.push({
// // //           type: "date",
// // //           label:
// // //             day === today ? "Today" : day === yesterday ? "Yesterday" : day,
// // //           key: `date-${i}`,
// // //         });
// // //         lastDate = day;
// // //       }
// // //       groups.push({ type: "msg", msg, key: msg._id || i });
// // //     });
// // //     return groups;
// // //   })();

// // //   return (
// // //     <>
// // //       <ToastContainer position="top-right" autoClose={3000} />
// // //       <div
// // //         className="flex flex-col bg-gradient-to-br from-gray-50 to-gray-100"
// // //         style={{ height: "100vh" }}
// // //       >
// // //         {/* Top Header */}
// // //         <div className="px-8 py-5 bg-white/80 backdrop-blur-md shadow-sm flex-shrink-0">
// // //           <div className="flex justify-between items-center">
// // //             <div>
// // //               <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent flex items-center gap-2">
// // //                 <FaComments className="text-blue-600" />
// // //                 Messages
// // //                 {totalUnread > 0 && (
// // //                   <span className="ml-1 px-2 py-0.5 bg-blue-600 text-white text-xs font-bold rounded-full">
// // //                     {totalUnread > 99 ? "99+" : totalUnread}
// // //                   </span>
// // //                 )}
// // //               </h1>
// // //               <p className="text-sm text-gray-500 mt-1">
// // //                 Manage all user conversations and vehicle inquiries
// // //                 {isConnected ? (
// // //                   <span className="ml-2 inline-flex items-center gap-1 text-green-500 text-xs">
// // //                     <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />{" "}
// // //                     Live
// // //                   </span>
// // //                 ) : (
// // //                   <span className="ml-2 inline-flex items-center gap-1 text-amber-500 text-xs">
// // //                     <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />{" "}
// // //                     Reconnecting…
// // //                   </span>
// // //                 )}
// // //               </p>
// // //             </div>
// // //             <button
// // //               onClick={handleManualRefresh}
// // //               className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition shadow-sm"
// // //             >
// // //               <FaSync
// // //                 className={
// // //                   chatsLoading ? "animate-spin text-blue-500" : "text-gray-400"
// // //                 }
// // //                 size={13}
// // //               />
// // //               Refresh
// // //             </button>
// // //           </div>
// // //         </div>

// // //         <div className="flex flex-1 min-h-0 m-6 rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-white">
// // //           {/* LEFT: Chat List */}
// // //           <div
// // //             className={`${showChatWindow ? "hidden lg:flex" : "flex"} flex-col w-full lg:w-[340px] border-r border-gray-100 flex-shrink-0`}
// // //           >
// // //             <div className="p-4 border-b border-gray-100 space-y-3">
// // //               <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
// // //                 <FaSearch size={12} className="text-gray-400 flex-shrink-0" />
// // //                 <input
// // //                   value={searchQuery}
// // //                   onChange={(e) => setSearchQuery(e.target.value)}
// // //                   placeholder="Search conversations, users…"
// // //                   className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
// // //                 />
// // //                 {searchQuery && (
// // //                   <button
// // //                     onClick={() => setSearchQuery("")}
// // //                     className="text-gray-400 hover:text-gray-600"
// // //                   >
// // //                     <FaTimes size={11} />
// // //                   </button>
// // //                 )}
// // //               </div>
// // //               <div className="flex gap-1 overflow-x-auto">
// // //                 {filterTabs.map((tab) => (
// // //                   <button
// // //                     key={tab.id}
// // //                     onClick={() => setActiveFilter(tab.id)}
// // //                     className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
// // //                       activeFilter === tab.id
// // //                         ? "bg-blue-600 text-white shadow-sm"
// // //                         : "bg-gray-100 text-gray-500 hover:bg-gray-200"
// // //                     }`}
// // //                   >
// // //                     {tab.label}
// // //                     {tab.count > 0 && (
// // //                       <span
// // //                         className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
// // //                           activeFilter === tab.id
// // //                             ? "bg-white/20 text-white"
// // //                             : "bg-gray-300 text-gray-600"
// // //                         }`}
// // //                       >
// // //                         {tab.count}
// // //                       </span>
// // //                     )}
// // //                   </button>
// // //                 ))}
// // //               </div>
// // //             </div>

// // //             <div className="flex-1 overflow-y-auto">
// // //               {chatsLoading && chats.length === 0 ? (
// // //                 <div className="flex items-center justify-center h-32">
// // //                   <FaSpinner className="animate-spin text-blue-400 text-xl" />
// // //                 </div>
// // //               ) : filteredChats.length === 0 ? (
// // //                 <div className="flex flex-col items-center justify-center h-full py-12 text-center px-6">
// // //                   <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-3">
// // //                     <FaInbox className="text-blue-300 text-2xl" />
// // //                   </div>
// // //                   <p className="text-sm font-semibold text-gray-600">
// // //                     {searchQuery ? "No results found" : "No conversations yet"}
// // //                   </p>
// // //                   <p className="text-xs text-gray-400 mt-1">
// // //                     {searchQuery
// // //                       ? "Try a different search term"
// // //                       : "User conversations will appear here"}
// // //                   </p>
// // //                 </div>
// // //               ) : (
// // //                 filteredChats.map((chat) => {
// // //                   const unread = getUnread(chat);
// // //                   const isSelected =
// // //                     selectedChat?._id === chat._id && showChatWindow;
// // //                   const isBlocked = chat.isBlocked;
// // //                   const isVehicle = chat.chatType === "vehicle";
// // //                   return (
// // //                     <div
// // //                       key={chat._id}
// // //                       onClick={() => openChat(chat)}
// // //                       className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer transition-all border-b border-gray-50 ${
// // //                         isSelected
// // //                           ? "bg-blue-50 border-l-[3px] border-l-blue-500"
// // //                           : "hover:bg-gray-50 border-l-[3px] border-l-transparent"
// // //                       } ${isBlocked ? "opacity-60" : ""}`}
// // //                     >
// // //                       <div className="relative flex-shrink-0">
// // //                         <Avatar user={chat.otherParticipant} size="md" />
// // //                         {isBlocked && (
// // //                           <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center shadow-sm">
// // //                             <FaBan size={7} />
// // //                           </span>
// // //                         )}
// // //                         {unread > 0 && !isBlocked && (
// // //                           <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-blue-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
// // //                             {unread > 9 ? "9+" : unread}
// // //                           </span>
// // //                         )}
// // //                       </div>
// // //                       <div className="flex-1 min-w-0">
// // //                         <div className="flex items-baseline justify-between gap-1 mb-0.5">
// // //                           <span
// // //                             className={`text-sm font-semibold truncate ${unread > 0 ? "text-gray-900" : "text-gray-700"}`}
// // //                           >
// // //                             {chat.otherParticipant?.name || "Unknown User"}
// // //                           </span>
// // //                           <span className="text-[10px] text-gray-400 flex-shrink-0">
// // //                             {formatChatTime(
// // //                               chat.lastMessageAt || chat.updatedAt,
// // //                             )}
// // //                           </span>
// // //                         </div>
// // //                         <p
// // //                           className={`text-xs truncate ${unread > 0 && !isBlocked ? "text-gray-700 font-medium" : "text-gray-400"}`}
// // //                         >
// // //                           {isBlocked
// // //                             ? "Conversation blocked"
// // //                             : chat.lastMessage || "No messages yet"}
// // //                         </p>
// // //                         <div className="flex items-center gap-1.5 mt-1">
// // //                           {isVehicle ? (
// // //                             <span className="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded-full font-semibold bg-blue-50 text-blue-600 uppercase tracking-wide">
// // //                               <FaCar size={7} /> Vehicle
// // //                             </span>
// // //                           ) : (
// // //                             <span className="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded-full font-semibold bg-purple-50 text-purple-600 uppercase tracking-wide">
// // //                               <FaShieldAlt size={7} /> Support
// // //                             </span>
// // //                           )}
// // //                           {chat.vehicleName && (
// // //                             <span className="text-[10px] text-gray-400 truncate">
// // //                               · {chat.vehicleName}
// // //                             </span>
// // //                           )}
// // //                           {isBlocked && (
// // //                             <span className="text-[9px] text-red-500 font-bold uppercase">
// // //                               Blocked
// // //                             </span>
// // //                           )}
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                   );
// // //                 })
// // //               )}
// // //             </div>

// // //             <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
// // //               <span className="text-xs text-gray-500">
// // //                 {chats.length} conversation{chats.length !== 1 ? "s" : ""}
// // //               </span>
// // //               {totalUnread > 0 && (
// // //                 <span className="text-xs font-semibold text-blue-600">
// // //                   {totalUnread} unread
// // //                 </span>
// // //               )}
// // //             </div>
// // //           </div>

// // //           {/* RIGHT: Chat Window */}
// // //           {showChatWindow && selectedChat ? (
// // //             <div className="flex-1 flex flex-col min-w-0">
// // //               {/* Chat Header */}
// // //               <div className="px-5 py-3.5 bg-white border-b border-gray-100 flex items-center justify-between flex-shrink-0 shadow-sm">
// // //                 <div className="flex items-center gap-3">
// // //                   <button
// // //                     onClick={closeChat}
// // //                     className="lg:hidden w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition"
// // //                   >
// // //                     <FaArrowLeft size={14} />
// // //                   </button>
// // //                   <Avatar user={selectedChat.otherParticipant} size="md" />
// // //                   <div>
// // //                     <div className="flex items-center gap-2">
// // //                       <p className="text-sm font-bold text-gray-900">
// // //                         {selectedChat.otherParticipant?.name || "Unknown User"}
// // //                       </p>
// // //                       {selectedChat.isBlocked && (
// // //                         <span className="inline-flex items-center gap-1 text-[10px] bg-red-50 text-red-500 border border-red-200 px-1.5 py-0.5 rounded-full font-semibold">
// // //                           <FaBan size={8} /> Blocked
// // //                         </span>
// // //                       )}
// // //                     </div>
// // //                     <div className="flex items-center gap-1.5 mt-0.5">
// // //                       <p className="text-xs text-gray-400">
// // //                         {selectedChat.otherParticipant?.email}
// // //                       </p>
// // //                       {selectedChat.vehicleName && (
// // //                         <>
// // //                           <span className="text-gray-300">·</span>
// // //                           <span className="text-xs text-blue-500 flex items-center gap-1">
// // //                             <FaCar size={9} /> {selectedChat.vehicleName}
// // //                           </span>
// // //                         </>
// // //                       )}
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //                 <div className="flex items-center gap-2">
// // //                   {!selectedChat.isBlocked ? (
// // //                     <button
// // //                       onClick={() => setShowBlockConfirm(true)}
// // //                       className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-500 hover:bg-red-50 border border-red-100 transition"
// // //                     >
// // //                       <FaBan size={11} /> Block
// // //                     </button>
// // //                   ) : iBlockedThem ? (
// // //                     <button
// // //                       onClick={() => setShowUnblockConfirm(true)}
// // //                       className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-600 hover:bg-emerald-50 border border-emerald-200 transition"
// // //                     >
// // //                       <FaUnlock size={11} /> Unblock
// // //                     </button>
// // //                   ) : null}
// // //                 </div>
// // //               </div>

// // //               {/* Vehicle Banner */}
// // //               {selectedChat.vehicleId && (
// // //                 <div className="px-5 py-2.5 bg-blue-50 border-b border-blue-100 flex items-center gap-3">
// // //                   <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
// // //                     <FaCar size={12} className="text-blue-600" />
// // //                   </div>
// // //                   <span className="text-xs font-semibold text-blue-800">
// // //                     {selectedChat.vehicleName || "Vehicle Inquiry"}
// // //                   </span>
// // //                 </div>
// // //               )}

// // //               {/* Block Banner */}
// // //               {selectedChat.isBlocked && (
// // //                 <div
// // //                   className={`flex items-center justify-between px-5 py-3 border-b ${
// // //                     iBlockedThem
// // //                       ? "bg-red-50 border-red-100"
// // //                       : "bg-amber-50 border-amber-100"
// // //                   }`}
// // //                 >
// // //                   <div className="flex items-center gap-3">
// // //                     <div
// // //                       className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
// // //                         iBlockedThem ? "bg-red-100" : "bg-amber-100"
// // //                       }`}
// // //                     >
// // //                       <FaBan
// // //                         size={13}
// // //                         className={
// // //                           iBlockedThem ? "text-red-500" : "text-amber-500"
// // //                         }
// // //                       />
// // //                     </div>
// // //                     <div>
// // //                       <p
// // //                         className={`text-xs font-bold ${iBlockedThem ? "text-red-700" : "text-amber-700"}`}
// // //                       >
// // //                         {iBlockedThem
// // //                           ? `You blocked ${selectedChat.otherParticipant?.name}`
// // //                           : "This user has restricted messaging"}
// // //                       </p>
// // //                       <p
// // //                         className={`text-[11px] mt-0.5 ${iBlockedThem ? "text-red-500" : "text-amber-500"}`}
// // //                       >
// // //                         {iBlockedThem
// // //                           ? "They cannot message you. Unblock to restore the conversation."
// // //                           : "You cannot send messages in this conversation."}
// // //                       </p>
// // //                     </div>
// // //                   </div>
// // //                   {iBlockedThem && (
// // //                     <button
// // //                       onClick={() => setShowUnblockConfirm(true)}
// // //                       className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition ml-3 whitespace-nowrap"
// // //                     >
// // //                       <FaUnlock size={10} /> Unblock
// // //                     </button>
// // //                   )}
// // //                 </div>
// // //               )}

// // //               {/* Messages Area */}
// // //               <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1 bg-gray-50">
// // //                 {messagesLoading ? (
// // //                   <div className="flex items-center justify-center h-full">
// // //                     <FaSpinner className="animate-spin text-blue-400 text-2xl" />
// // //                   </div>
// // //                 ) : selectedChat.isBlocked && messages.length === 0 ? (
// // //                   <div className="flex flex-col items-center justify-center h-full text-center px-8">
// // //                     <div
// // //                       className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${
// // //                         iBlockedThem ? "bg-red-50" : "bg-amber-50"
// // //                       }`}
// // //                     >
// // //                       <FaLock
// // //                         size={28}
// // //                         className={
// // //                           iBlockedThem ? "text-red-300" : "text-amber-300"
// // //                         }
// // //                       />
// // //                     </div>
// // //                     <p className="text-sm font-bold text-gray-600">
// // //                       {iBlockedThem
// // //                         ? "Conversation blocked"
// // //                         : "Messaging unavailable"}
// // //                     </p>
// // //                     <p className="text-xs text-gray-400 mt-2 leading-relaxed max-w-xs">
// // //                       {iBlockedThem
// // //                         ? `You have blocked ${selectedChat.otherParticipant?.name}. Unblock to restore the conversation.`
// // //                         : "This user has restricted messaging."}
// // //                     </p>
// // //                     {iBlockedThem && (
// // //                       <button
// // //                         onClick={() => setShowUnblockConfirm(true)}
// // //                         className="mt-5 flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition"
// // //                       >
// // //                         <FaUnlock size={12} /> Unblock{" "}
// // //                         {selectedChat.otherParticipant?.name}
// // //                       </button>
// // //                     )}
// // //                   </div>
// // //                 ) : messages.length === 0 ? (
// // //                   <div className="flex flex-col items-center justify-center h-full text-center">
// // //                     <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-3">
// // //                       <FaCommentDots className="text-blue-300 text-2xl" />
// // //                     </div>
// // //                     <p className="text-sm font-semibold text-gray-500">
// // //                       No messages yet
// // //                     </p>
// // //                     <p className="text-xs text-gray-400 mt-1">
// // //                       Start the conversation with this user
// // //                     </p>
// // //                   </div>
// // //                 ) : (
// // //                   groupedMessages.map((item) => {
// // //                     if (item.type === "date") {
// // //                       return (
// // //                         <div
// // //                           key={item.key}
// // //                           className="flex items-center gap-3 py-2"
// // //                         >
// // //                           <div className="flex-1 h-px bg-gray-200" />
// // //                           <span className="text-[10px] text-gray-400 font-medium px-2.5 py-1 bg-white border border-gray-200 rounded-full whitespace-nowrap shadow-sm">
// // //                             {item.label}
// // //                           </span>
// // //                           <div className="flex-1 h-px bg-gray-200" />
// // //                         </div>
// // //                       );
// // //                     }
// // //                     const { msg } = item;
// // //                     const isOwn =
// // //                       msg.senderType === "admin" || msg.sender?._id === adminId;
// // //                     const hasImage = msg.attachments?.length > 0;
// // //                     return (
// // //                       <div
// // //                         key={item.key}
// // //                         className={`flex items-end gap-2 ${isOwn ? "justify-end" : "justify-start"}`}
// // //                       >
// // //                         {!isOwn && (
// // //                           <div className="flex-shrink-0 mb-1">
// // //                             <Avatar
// // //                               user={selectedChat.otherParticipant}
// // //                               size="sm"
// // //                             />
// // //                           </div>
// // //                         )}
// // //                         <div
// // //                           className={`flex flex-col ${isOwn ? "items-end" : "items-start"} max-w-[65%]`}
// // //                         >
// // //                           <div
// // //                             className={`px-4 py-2.5 text-sm leading-relaxed break-words ${
// // //                               isOwn
// // //                                 ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl rounded-br-sm shadow-sm"
// // //                                 : "bg-white text-gray-800 rounded-2xl rounded-bl-sm border border-gray-100 shadow-sm"
// // //                             }`}
// // //                           >
// // //                             {hasImage && (
// // //                               <div className="mb-1">
// // //                                 <img
// // //                                   src={`http://localhost:5000${msg.attachments[0].url}`}
// // //                                   alt="attachment"
// // //                                   className="max-w-[200px] max-h-[150px] rounded-lg cursor-pointer"
// // //                                   onClick={() =>
// // //                                     window.open(
// // //                                       `http://localhost:5000${msg.attachments[0].url}`,
// // //                                       "_blank",
// // //                                     )
// // //                                   }
// // //                                 />
// // //                               </div>
// // //                             )}
// // //                             {msg.message && <p>{msg.message}</p>}
// // //                           </div>
// // //                           <div
// // //                             className={`flex items-center gap-1 mt-1 px-1 ${isOwn ? "flex-row-reverse" : ""}`}
// // //                           >
// // //                             <span className="text-[10px] text-gray-400">
// // //                               {formatMsgTime(msg.createdAt)}
// // //                             </span>
// // //                             {isOwn && (
// // //                               <FaCheckDouble
// // //                                 size={9}
// // //                                 className={
// // //                                   msg.read ? "text-blue-400" : "text-gray-300"
// // //                                 }
// // //                               />
// // //                             )}
// // //                           </div>
// // //                         </div>
// // //                         {isOwn && (
// // //                           <div className="flex-shrink-0 mb-1">
// // //                             <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-[10px] font-bold">
// // //                               {(adminUser?.name || "A").charAt(0).toUpperCase()}
// // //                             </div>
// // //                           </div>
// // //                         )}
// // //                       </div>
// // //                     );
// // //                   })
// // //                 )}
// // //                 <div ref={messagesEndRef} />
// // //               </div>

// // //               {/* Input Area */}
// // //               <div className="px-4 py-3 bg-white border-t border-gray-100 flex-shrink-0">
// // //                 {!isConnected && (
// // //                   <p className="text-[11px] text-center text-amber-500 mb-2">
// // //                     Reconnecting to chat server…
// // //                   </p>
// // //                 )}
// // //                 {selectedChat.isBlocked ? (
// // //                   <div
// // //                     className={`flex items-center gap-3 rounded-2xl px-4 py-3 ${
// // //                       iBlockedThem
// // //                         ? "bg-red-50 border border-red-100"
// // //                         : "bg-amber-50 border border-amber-100"
// // //                     }`}
// // //                   >
// // //                     <FaLock
// // //                       size={14}
// // //                       className={
// // //                         iBlockedThem ? "text-red-400" : "text-amber-400"
// // //                       }
// // //                     />
// // //                     <p
// // //                       className={`text-xs flex-1 ${iBlockedThem ? "text-red-500" : "text-amber-600"}`}
// // //                     >
// // //                       {iBlockedThem ? (
// // //                         <>
// // //                           You blocked this user.{" "}
// // //                           <button
// // //                             onClick={() => setShowUnblockConfirm(true)}
// // //                             className="underline font-semibold hover:no-underline"
// // //                           >
// // //                             Unblock to chat
// // //                           </button>
// // //                         </>
// // //                       ) : (
// // //                         "You cannot send messages in this conversation."
// // //                       )}
// // //                     </p>
// // //                   </div>
// // //                 ) : (
// // //                   <div className="relative" ref={emojiPickerRef}>
// // //                     {/* ── Updated Custom Emoji Picker ── */}
// // //                     {showEmojiPicker && (
// // //                       <CustomEmojiPicker
// // //                         onEmojiClick={onEmojiClick}
// // //                         onClose={() => setShowEmojiPicker(false)}
// // //                       />
// // //                     )}

// // //                     <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-3 py-2">
// // //                       {/* Emoji Toggle */}
// // //                       <button
// // //                         onClick={() => setShowEmojiPicker((v) => !v)}
// // //                         className={`emoji-toggle-btn text-gray-400 hover:text-blue-500 transition flex-shrink-0 ${
// // //                           showEmojiPicker ? "text-blue-500" : ""
// // //                         }`}
// // //                         title={
// // //                           showEmojiPicker
// // //                             ? "Close emoji picker"
// // //                             : "Open emoji picker"
// // //                         }
// // //                       >
// // //                         <FaSmile size={18} />
// // //                       </button>

// // //                       {/* Image Upload */}
// // //                       <button
// // //                         onClick={() => fileInputRef.current?.click()}
// // //                         className="text-gray-400 hover:text-blue-500 transition flex-shrink-0"
// // //                         disabled={uploadingImage}
// // //                         title="Upload image"
// // //                       >
// // //                         {uploadingImage ? (
// // //                           <FaSpinner className="animate-spin" size={18} />
// // //                         ) : (
// // //                           <FaImage size={18} />
// // //                         )}
// // //                       </button>
// // //                       <input
// // //                         type="file"
// // //                         ref={fileInputRef}
// // //                         className="hidden"
// // //                         accept="image/*"
// // //                         onChange={handleImageUpload}
// // //                       />

// // //                       {/* Text Input */}
// // //                       <input
// // //                         ref={inputRef}
// // //                         type="text"
// // //                         value={newMessage}
// // //                         onChange={(e) => setNewMessage(e.target.value)}
// // //                         onKeyPress={(e) => e.key === "Enter" && sendMessage()}
// // //                         placeholder="Type a reply…"
// // //                         className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
// // //                       />

// // //                       {/* Send Button */}
// // //                       <button
// // //                         onClick={sendMessage}
// // //                         disabled={!newMessage.trim() || sending}
// // //                         className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-md transition"
// // //                       >
// // //                         {sending ? (
// // //                           <FaSpinner className="animate-spin" size={13} />
// // //                         ) : (
// // //                           <FaPaperPlane size={13} />
// // //                         )}
// // //                       </button>
// // //                     </div>
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             </div>
// // //           ) : (
// // //             <div className="flex-1 hidden lg:flex flex-col items-center justify-center bg-gray-50 text-center px-8">
// // //               <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center mb-5 shadow-inner">
// // //                 <FaComments className="text-blue-300 text-4xl" />
// // //               </div>
// // //               <p className="text-lg font-bold text-gray-600">
// // //                 Select a conversation
// // //               </p>
// // //               <p className="text-sm text-gray-400 mt-2 max-w-xs">
// // //                 Choose a chat from the left panel to start replying to users
// // //               </p>
// // //               {totalUnread > 0 && (
// // //                 <div className="mt-4 px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl">
// // //                   <p className="text-sm font-semibold text-blue-600">
// // //                     {totalUnread} unread message{totalUnread !== 1 ? "s" : ""}{" "}
// // //                     waiting
// // //                   </p>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>

// // //       {/* Block Modal */}
// // //       {showBlockConfirm && selectedChat && (
// // //         <div
// // //           className="fixed inset-0 z-[200] flex items-center justify-center p-4"
// // //           style={{ background: "rgba(0,0,0,0.55)" }}
// // //         >
// // //           <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
// // //             <div className="bg-gradient-to-r from-red-500 to-rose-600 px-6 pt-6 pb-10">
// // //               <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
// // //                 <FaBan size={26} className="text-white" />
// // //               </div>
// // //               <h3 className="text-white text-center text-lg font-bold">
// // //                 Block User?
// // //               </h3>
// // //               <p className="text-red-100 text-center text-xs mt-1">
// // //                 You can unblock them anytime
// // //               </p>
// // //             </div>
// // //             <div className="-mt-4 bg-white rounded-t-2xl px-6 pt-5 pb-6">
// // //               <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
// // //                 <Avatar user={selectedChat.otherParticipant} size="md" />
// // //                 <div>
// // //                   <p className="font-semibold text-gray-800 text-sm">
// // //                     {selectedChat.otherParticipant?.name}
// // //                   </p>
// // //                   <p className="text-xs text-gray-500">
// // //                     Will be blocked from messaging
// // //                   </p>
// // //                 </div>
// // //               </div>
// // //               <ul className="space-y-2 mb-5">
// // //                 {[
// // //                   "They won't be able to message you",
// // //                   "Their messages will be hidden",
// // //                   "You can unblock them anytime",
// // //                 ].map((t, i) => (
// // //                   <li
// // //                     key={i}
// // //                     className="flex items-center gap-2 text-xs text-gray-600"
// // //                   >
// // //                     <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
// // //                       <FaTimes size={7} className="text-red-500" />
// // //                     </span>
// // //                     {t}
// // //                   </li>
// // //                 ))}
// // //               </ul>
// // //               <div className="flex gap-2">
// // //                 <button
// // //                   onClick={() => setShowBlockConfirm(false)}
// // //                   className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition font-medium"
// // //                 >
// // //                   Cancel
// // //                 </button>
// // //                 <button
// // //                   onClick={handleBlock}
// // //                   disabled={blockingUser}
// // //                   className="flex-1 px-4 py-2.5 text-sm bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl font-semibold transition flex items-center justify-center gap-2 disabled:opacity-60"
// // //                 >
// // //                   {blockingUser ? (
// // //                     <FaSpinner className="animate-spin" size={13} />
// // //                   ) : (
// // //                     <FaBan size={12} />
// // //                   )}
// // //                   {blockingUser ? "Blocking…" : "Block User"}
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Unblock Modal */}
// // //       {showUnblockConfirm && selectedChat && (
// // //         <div
// // //           className="fixed inset-0 z-[200] flex items-center justify-center p-4"
// // //           style={{ background: "rgba(0,0,0,0.55)" }}
// // //         >
// // //           <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
// // //             <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 pt-6 pb-10">
// // //               <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
// // //                 <FaUnlock size={24} className="text-white" />
// // //               </div>
// // //               <h3 className="text-white text-center text-lg font-bold">
// // //                 Unblock User?
// // //               </h3>
// // //               <p className="text-emerald-100 text-center text-xs mt-1">
// // //                 Resume your conversation
// // //               </p>
// // //             </div>
// // //             <div className="-mt-4 bg-white rounded-t-2xl px-6 pt-5 pb-6">
// // //               <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
// // //                 <Avatar user={selectedChat.otherParticipant} size="md" />
// // //                 <div>
// // //                   <p className="font-semibold text-gray-800 text-sm">
// // //                     {selectedChat.otherParticipant?.name}
// // //                   </p>
// // //                   <p className="text-xs text-gray-500">Will be unblocked</p>
// // //                 </div>
// // //               </div>
// // //               <ul className="space-y-2 mb-5">
// // //                 {[
// // //                   "They can message you again",
// // //                   "Previous messages will be restored",
// // //                   "You can block them again anytime",
// // //                 ].map((t, i) => (
// // //                   <li
// // //                     key={i}
// // //                     className="flex items-center gap-2 text-xs text-gray-600"
// // //                   >
// // //                     <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
// // //                       <FaCheck size={7} className="text-emerald-600" />
// // //                     </span>
// // //                     {t}
// // //                   </li>
// // //                 ))}
// // //               </ul>
// // //               <div className="flex gap-2">
// // //                 <button
// // //                   onClick={() => setShowUnblockConfirm(false)}
// // //                   className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition font-medium"
// // //                 >
// // //                   Cancel
// // //                 </button>
// // //                 <button
// // //                   onClick={handleUnblock}
// // //                   disabled={blockingUser}
// // //                   className="flex-1 px-4 py-2.5 text-sm bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold transition flex items-center justify-center gap-2 disabled:opacity-60"
// // //                 >
// // //                   {blockingUser ? (
// // //                     <FaSpinner className="animate-spin" size={13} />
// // //                   ) : (
// // //                     <FaUnlock size={12} />
// // //                   )}
// // //                   {blockingUser ? "Unblocking…" : "Unblock User"}
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </>
// // //   );
// // // };

// // // export default AdminMessages;

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
// //   FaImage,
// //   FaTimesCircle,
// // } from "react-icons/fa";
// // import axios from "axios";
// // import { toast, ToastContainer } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import { useSocket } from "../context/SocketContext";
// // import EmojiPicker from "emoji-picker-react";

// // const getToken = () =>
// //   localStorage.getItem("token") || sessionStorage.getItem("token");
// // const authHeader = () => ({ Authorization: `Bearer ${getToken()}` });

// // const adminChatService = {
// //   getAllChats: async (filter = "all", search = "") => {
// //     const res = await axios.get(
// //       `http://localhost:5000/api/admin/chats?filter=${filter}&search=${encodeURIComponent(search)}`,
// //       { headers: authHeader() },
// //     );
// //     return res.data;
// //   },
// //   getChat: async (chatId) => {
// //     const res = await axios.get(
// //       `http://localhost:5000/api/admin/chats/${chatId}`,
// //       {
// //         headers: authHeader(),
// //       },
// //     );
// //     return res.data;
// //   },
// //   sendMessage: async (chatId, message) => {
// //     const res = await axios.post(
// //       `http://localhost:5000/api/admin/chats/${chatId}/message`,
// //       { message },
// //       { headers: authHeader() },
// //     );
// //     return res.data;
// //   },
// //   markAsRead: async (chatId) => {
// //     const res = await axios.put(
// //       `http://localhost:5000/api/admin/chats/${chatId}/read`,
// //       {},
// //       { headers: authHeader() },
// //     );
// //     return res.data;
// //   },
// //   blockUser: async (chatId) => {
// //     const res = await axios.put(
// //       `http://localhost:5000/api/admin/chats/${chatId}/block`,
// //       {},
// //       { headers: authHeader() },
// //     );
// //     return res.data;
// //   },
// //   unblockUser: async (chatId) => {
// //     const res = await axios.put(
// //       `http://localhost:5000/api/admin/chats/${chatId}/unblock`,
// //       {},
// //       { headers: authHeader() },
// //     );
// //     return res.data;
// //   },
// //   getUnreadCount: async () => {
// //     const res = await axios.get(
// //       `http://localhost:5000/api/admin/chats/unread/count`,
// //       { headers: authHeader() },
// //     );
// //     return res.data;
// //   },
// // };

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

// // const Avatar = ({ user, size = "md", className = "" }) => {
// //   const s =
// //     size === "sm"
// //       ? "w-7 h-7 text-[10px]"
// //       : size === "lg"
// //         ? "w-12 h-12 text-base"
// //         : "w-9 h-9 text-sm";
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
// //     localStorage.getItem("user") || sessionStorage.getItem("user") || "null",
// //   );
// //   const adminId = adminUser?._id || adminUser?.id;

// //   const {
// //     isConnected,
// //     joinChat,
// //     leaveChat,
// //     onNewMessage,
// //     markRead: socketMarkRead,
// //   } = useSocket();

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
// //   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
// //   const [uploadingImage, setUploadingImage] = useState(false);

// //   const messagesEndRef = useRef(null);
// //   const inputRef = useRef(null);
// //   const selectedChatRef = useRef(null);
// //   const initialLoadDone = useRef(false);
// //   const fileInputRef = useRef(null);
// //   const emojiPickerRef = useRef(null);

// //   useEffect(() => {
// //     selectedChatRef.current = selectedChat;
// //   }, [selectedChat]);

// //   // Close emoji picker when clicking outside
// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (
// //         emojiPickerRef.current &&
// //         !emojiPickerRef.current.contains(event.target) &&
// //         !event.target.closest(".emoji-toggle-btn")
// //       ) {
// //         setShowEmojiPicker(false);
// //       }
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   const fetchUnreadCount = useCallback(async () => {
// //     try {
// //       const res = await adminChatService.getUnreadCount();
// //       if (res.success) setTotalUnread(res.count);
// //     } catch (error) {
// //       console.error("Error fetching unread count:", error);
// //     }
// //   }, []);

// //   const fetchChats = useCallback(async () => {
// //     try {
// //       setChatsLoading(true);
// //       const res = await adminChatService.getAllChats(activeFilter, searchQuery);
// //       if (res.success) {
// //         setChats(res.data);
// //         setFilteredChats(res.data);
// //         const unread = res.data.reduce(
// //           (acc, c) => acc + (c.unreadForAdmin || 0),
// //           0,
// //         );
// //         setTotalUnread(unread);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching chats:", error);
// //       toast.error("Failed to load chats");
// //     } finally {
// //       setChatsLoading(false);
// //     }
// //   }, [activeFilter, searchQuery]);

// //   useEffect(() => {
// //     if (!initialLoadDone.current) {
// //       initialLoadDone.current = true;
// //       fetchChats();
// //       fetchUnreadCount();
// //     }
// //   }, [fetchChats, fetchUnreadCount]);

// //   useEffect(() => {
// //     if (initialLoadDone.current) {
// //       fetchChats();
// //       fetchUnreadCount();
// //     }
// //   }, [activeFilter, searchQuery, fetchChats, fetchUnreadCount]);

// //   useEffect(() => {
// //     const unsubscribe = onNewMessage("*", (data) => {
// //       if (!data.message) return;
// //       setChats((prev) =>
// //         prev.map((c) => {
// //           if (c._id !== data.chatId) return c;
// //           const isCurrentlyOpen = selectedChatRef.current?._id === data.chatId;
// //           return {
// //             ...c,
// //             lastMessage: data.message.message || "📷 Image",
// //             lastMessageAt: data.message.createdAt,
// //             unreadForAdmin: isCurrentlyOpen ? 0 : (c.unreadForAdmin || 0) + 1,
// //           };
// //         }),
// //       );
// //       setTotalUnread((prev) => {
// //         const isCurrentlyOpen = selectedChatRef.current?._id === data.chatId;
// //         return isCurrentlyOpen ? prev : prev + 1;
// //       });
// //     });
// //     return unsubscribe;
// //   }, [onNewMessage]);

// //   useEffect(() => {
// //     if (!selectedChat?._id) return;
// //     const chatId = selectedChat._id;

// //     const unsubscribe = onNewMessage(chatId, (data) => {
// //       if (!data.message) return;

// //       setMessages((prev) => {
// //         if (prev.some((m) => m._id === data.message._id)) return prev;
// //         const tempIdx = prev.findIndex(
// //           (m) =>
// //             m._id?.toString().startsWith("temp-") &&
// //             m.message === data.message.message,
// //         );
// //         if (tempIdx !== -1) {
// //           const next = [...prev];
// //           next[tempIdx] = data.message;
// //           return next;
// //         }
// //         return [...prev, data.message];
// //       });

// //       setTimeout(
// //         () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
// //         80,
// //       );
// //       adminChatService.markAsRead(chatId).catch(() => {});
// //       socketMarkRead(chatId);
// //     });
// //     return unsubscribe;
// //   }, [selectedChat?._id, onNewMessage, socketMarkRead]);

// //   useEffect(() => {
// //     if (messagesEndRef.current)
// //       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
// //   }, [messages]);

// //   useEffect(() => {
// //     if (!searchQuery.trim()) {
// //       setFilteredChats(chats);
// //       return;
// //     }
// //     const q = searchQuery.toLowerCase();
// //     setFilteredChats(
// //       chats.filter((c) => {
// //         const name = (c.otherParticipant?.name || "").toLowerCase();
// //         const vehicle = (c.vehicleName || "").toLowerCase();
// //         const last = (c.lastMessage || "").toLowerCase();
// //         return name.includes(q) || vehicle.includes(q) || last.includes(q);
// //       }),
// //     );
// //   }, [searchQuery, chats]);

// //   const openChat = async (chat) => {
// //     if (selectedChatRef.current?._id) leaveChat(selectedChatRef.current._id);
// //     setSelectedChat(chat);
// //     setShowChatWindow(true);
// //     setMessages([]);
// //     joinChat(chat._id);
// //     setShowEmojiPicker(false);

// //     if (!chat.isBlocked) {
// //       try {
// //         setMessagesLoading(true);
// //         const res = await adminChatService.getChat(chat._id);
// //         if (res.success) {
// //           setMessages(res.data.messages || []);
// //           await adminChatService.markAsRead(chat._id);
// //           socketMarkRead(chat._id);
// //           setChats((prev) =>
// //             prev.map((c) =>
// //               c._id !== chat._id ? c : { ...c, unreadForAdmin: 0 },
// //             ),
// //           );
// //           await fetchUnreadCount();
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
// //     if (selectedChatRef.current?._id) leaveChat(selectedChatRef.current._id);
// //     setShowChatWindow(false);
// //     setSelectedChat(null);
// //     setMessages([]);
// //     setNewMessage("");
// //     setShowEmojiPicker(false);
// //   };

// //   const handleImageUpload = async (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;
// //     if (!file.type.startsWith("image/")) {
// //       toast.error("Only image files are allowed");
// //       return;
// //     }
// //     if (file.size > 5 * 1024 * 1024) {
// //       toast.error("Image must be less than 5MB");
// //       return;
// //     }

// //     setUploadingImage(true);
// //     try {
// //       const formData = new FormData();
// //       formData.append("image", file);
// //       const res = await axios.post(
// //         `http://localhost:5000/api/admin/chats/${selectedChat._id}/image`,
// //         formData,
// //         { headers: { ...authHeader(), "Content-Type": "multipart/form-data" } },
// //       );
// //       if (res.data.success) {
// //         const tempMsg = {
// //           _id: `temp-${Date.now()}`,
// //           message: "",
// //           senderType: "admin",
// //           read: false,
// //           delivered: false,
// //           createdAt: new Date(),
// //           attachments: [{ url: res.data.data.url, type: "image" }],
// //           sender: adminUser,
// //         };
// //         setMessages((prev) => [...prev, tempMsg]);
// //         setTimeout(
// //           () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
// //           100,
// //         );
// //       }
// //     } catch (error) {
// //       console.error("Error uploading image:", error);
// //       toast.error("Failed to upload image");
// //     } finally {
// //       setUploadingImage(false);
// //       if (fileInputRef.current) fileInputRef.current.value = "";
// //     }
// //   };

// //   const sendMessage = async () => {
// //     if (
// //       (!newMessage.trim() && !uploadingImage) ||
// //       sending ||
// //       selectedChat?.isBlocked
// //     )
// //       return;
// //     const text = newMessage.trim();
// //     setSending(true);

// //     const tempMsg = {
// //       _id: `temp-${Date.now()}`,
// //       message: text,
// //       senderType: "admin",
// //       read: false,
// //       delivered: false,
// //       createdAt: new Date(),
// //       sender: adminUser,
// //       attachments: [],
// //     };
// //     setMessages((prev) => [...prev, tempMsg]);
// //     setNewMessage("");
// //     setTimeout(
// //       () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
// //       100,
// //     );

// //     try {
// //       const res = await adminChatService.sendMessage(selectedChat._id, text);
// //       if (res.success) {
// //         setMessages((prev) =>
// //           prev.map((m) => (m._id === tempMsg._id ? res.data : m)),
// //         );
// //         setChats((prev) =>
// //           prev.map((c) =>
// //             c._id !== selectedChat._id
// //               ? c
// //               : {
// //                   ...c,
// //                   lastMessage: text || "📷 Image",
// //                   lastMessageAt: new Date(),
// //                 },
// //           ),
// //         );
// //       } else {
// //         setMessages((prev) => prev.filter((m) => m._id !== tempMsg._id));
// //         toast.error("Failed to send message");
// //       }
// //     } catch (error) {
// //       console.error("Error sending message:", error);
// //       setMessages((prev) => prev.filter((m) => m._id !== tempMsg._id));
// //       toast.error("Failed to send message");
// //     } finally {
// //       setSending(false);
// //     }
// //   };

// //   const handleBlock = async () => {
// //     setBlockingUser(true);
// //     try {
// //       const res = await adminChatService.blockUser(selectedChat._id);
// //       if (res.success) {
// //         toast.success(
// //           `${selectedChat.otherParticipant?.name} has been blocked`,
// //         );
// //         setSelectedChat((p) => ({ ...p, isBlocked: true, blockedBy: adminId }));
// //         setMessages([]);
// //         fetchChats();
// //         fetchUnreadCount();
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
// //         toast.success(
// //           `${selectedChat.otherParticipant?.name} has been unblocked`,
// //         );
// //         setSelectedChat((p) => ({ ...p, isBlocked: false, blockedBy: null }));
// //         const msgRes = await adminChatService.getChat(selectedChat._id);
// //         if (msgRes.success) setMessages(msgRes.data.messages || []);
// //         fetchChats();
// //         fetchUnreadCount();
// //       }
// //     } catch (error) {
// //       console.error("Error unblocking user:", error);
// //       toast.error("Failed to unblock user");
// //     } finally {
// //       setBlockingUser(false);
// //       setShowUnblockConfirm(false);
// //     }
// //   };

// //   const handleManualRefresh = () => {
// //     fetchChats();
// //     fetchUnreadCount();
// //     toast.info("Refreshed messages");
// //   };

// //   const toggleEmojiPicker = () => {
// //     setShowEmojiPicker(!showEmojiPicker);
// //   };

// //   // KEY FIX: onEmojiClick does NOT close the picker
// //   const onEmojiClick = (emojiObject) => {
// //     setNewMessage((prev) => prev + emojiObject.emoji);
// //     inputRef.current?.focus();
// //     // DO NOT setShowEmojiPicker(false) here - keep it open!
// //   };

// //   const getUnread = (chat) => chat.unreadForAdmin || 0;
// //   const iBlockedThem =
// //     selectedChat?.isBlocked && selectedChat?.blockedBy === adminId;

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
// //       <div
// //         className="flex flex-col bg-gradient-to-br from-gray-50 to-gray-100"
// //         style={{ height: "100vh" }}
// //       >
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
// //                 {isConnected ? (
// //                   <span className="ml-2 inline-flex items-center gap-1 text-green-500 text-xs">
// //                     <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />{" "}
// //                     Live
// //                   </span>
// //                 ) : (
// //                   <span className="ml-2 inline-flex items-center gap-1 text-amber-500 text-xs">
// //                     <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />{" "}
// //                     Reconnecting…
// //                   </span>
// //                 )}
// //               </p>
// //             </div>
// //             <button
// //               onClick={handleManualRefresh}
// //               className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition shadow-sm"
// //             >
// //               <FaSync
// //                 className={
// //                   chatsLoading ? "animate-spin text-blue-500" : "text-gray-400"
// //                 }
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
// //             className={`${showChatWindow ? "hidden lg:flex" : "flex"} flex-col w-full lg:w-[340px] border-r border-gray-100 flex-shrink-0`}
// //           >
// //             {/* ... (keep the existing chat list code - same as before) ... */}
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
// //                   const isSelected =
// //                     selectedChat?._id === chat._id && showChatWindow;
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
// //                             className={`text-sm font-semibold truncate ${unread > 0 ? "text-gray-900" : "text-gray-700"}`}
// //                           >
// //                             {chat.otherParticipant?.name || "Unknown User"}
// //                           </span>
// //                           <span className="text-[10px] text-gray-400 flex-shrink-0">
// //                             {formatChatTime(
// //                               chat.lastMessageAt || chat.updatedAt,
// //                             )}
// //                           </span>
// //                         </div>
// //                         <p
// //                           className={`text-xs truncate ${unread > 0 && !isBlocked ? "text-gray-700 font-medium" : "text-gray-400"}`}
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
// //                   className={`flex items-center justify-between px-5 py-3 border-b ${iBlockedThem ? "bg-red-50 border-red-100" : "bg-amber-50 border-amber-100"}`}
// //                 >
// //                   <div className="flex items-center gap-3">
// //                     <div
// //                       className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${iBlockedThem ? "bg-red-100" : "bg-amber-100"}`}
// //                     >
// //                       <FaBan
// //                         size={13}
// //                         className={
// //                           iBlockedThem ? "text-red-500" : "text-amber-500"
// //                         }
// //                       />
// //                     </div>
// //                     <div>
// //                       <p
// //                         className={`text-xs font-bold ${iBlockedThem ? "text-red-700" : "text-amber-700"}`}
// //                       >
// //                         {iBlockedThem
// //                           ? `You blocked ${selectedChat.otherParticipant?.name}`
// //                           : "This user has restricted messaging"}
// //                       </p>
// //                       <p
// //                         className={`text-[11px] mt-0.5 ${iBlockedThem ? "text-red-500" : "text-amber-500"}`}
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
// //                       className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${iBlockedThem ? "bg-red-50" : "bg-amber-50"}`}
// //                     >
// //                       <FaLock
// //                         size={28}
// //                         className={
// //                           iBlockedThem ? "text-red-300" : "text-amber-300"
// //                         }
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
// //                         <div
// //                           key={item.key}
// //                           className="flex items-center gap-3 py-2"
// //                         >
// //                           <div className="flex-1 h-px bg-gray-200" />
// //                           <span className="text-[10px] text-gray-400 font-medium px-2.5 py-1 bg-white border border-gray-200 rounded-full whitespace-nowrap shadow-sm">
// //                             {item.label}
// //                           </span>
// //                           <div className="flex-1 h-px bg-gray-200" />
// //                         </div>
// //                       );
// //                     }
// //                     const { msg } = item;
// //                     const isOwn =
// //                       msg.senderType === "admin" || msg.sender?._id === adminId;
// //                     const hasImage = msg.attachments?.length > 0;
// //                     return (
// //                       <div
// //                         key={item.key}
// //                         className={`flex items-end gap-2 ${isOwn ? "justify-end" : "justify-start"}`}
// //                       >
// //                         {!isOwn && (
// //                           <div className="flex-shrink-0 mb-1">
// //                             <Avatar
// //                               user={selectedChat.otherParticipant}
// //                               size="sm"
// //                             />
// //                           </div>
// //                         )}
// //                         <div
// //                           className={`flex flex-col ${isOwn ? "items-end" : "items-start"} max-w-[65%]`}
// //                         >
// //                           <div
// //                             className={`px-4 py-2.5 text-sm leading-relaxed break-words ${
// //                               isOwn
// //                                 ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl rounded-br-sm shadow-sm"
// //                                 : "bg-white text-gray-800 rounded-2xl rounded-bl-sm border border-gray-100 shadow-sm"
// //                             }`}
// //                           >
// //                             {hasImage && (
// //                               <div className="mb-1">
// //                                 <img
// //                                   src={`http://localhost:5000${msg.attachments[0].url}`}
// //                                   alt="attachment"
// //                                   className="max-w-[200px] max-h-[150px] rounded-lg cursor-pointer"
// //                                   onClick={() =>
// //                                     window.open(
// //                                       `http://localhost:5000${msg.attachments[0].url}`,
// //                                       "_blank",
// //                                     )
// //                                   }
// //                                 />
// //                               </div>
// //                             )}
// //                             {msg.message && <p>{msg.message}</p>}
// //                           </div>
// //                           <div
// //                             className={`flex items-center gap-1 mt-1 px-1 ${isOwn ? "flex-row-reverse" : ""}`}
// //                           >
// //                             <span className="text-[10px] text-gray-400">
// //                               {formatMsgTime(msg.createdAt)}
// //                             </span>
// //                             {isOwn && (
// //                               <FaCheckDouble
// //                                 size={9}
// //                                 className={
// //                                   msg.read ? "text-blue-400" : "text-gray-300"
// //                                 }
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

// //               {/* Input - WITH PERSISTENT EMOJI PICKER */}
// //               <div className="px-4 py-3 bg-white border-t border-gray-100 flex-shrink-0">
// //                 {!isConnected && (
// //                   <p className="text-[11px] text-center text-amber-500 mb-2">
// //                     Reconnecting to chat server…
// //                   </p>
// //                 )}
// //                 {selectedChat.isBlocked ? (
// //                   <div
// //                     className={`flex items-center gap-3 rounded-2xl px-4 py-3 ${iBlockedThem ? "bg-red-50 border border-red-100" : "bg-amber-50 border border-amber-100"}`}
// //                   >
// //                     <FaLock
// //                       size={14}
// //                       className={
// //                         iBlockedThem ? "text-red-400" : "text-amber-400"
// //                       }
// //                     />
// //                     <p
// //                       className={`text-xs flex-1 ${iBlockedThem ? "text-red-500" : "text-amber-600"}`}
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
// //                   <div className="relative">
// //                     {/* Emoji Picker - Stays open until manually closed */}
// //                     {showEmojiPicker && (
// //                       <div
// //                         ref={emojiPickerRef}
// //                         className="absolute bottom-full mb-2 right-0 z-50"
// //                       >
// //                         <div className="relative">
// //                           {/* Close button on the picker */}
// //                           <button
// //                             onClick={() => setShowEmojiPicker(false)}
// //                             className="absolute -top-2 -right-2 z-10 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition shadow-lg"
// //                             title="Close emoji picker"
// //                           >
// //                             <FaTimesCircle size={20} />
// //                           </button>
// //                           <EmojiPicker
// //                             onEmojiClick={onEmojiClick}
// //                             width={350}
// //                             height={400}
// //                             lazyLoad={true}
// //                           />
// //                         </div>
// //                       </div>
// //                     )}
// //                     <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-3 py-2">
// //                       <button
// //                         onClick={toggleEmojiPicker}
// //                         className={`emoji-toggle-btn text-gray-400 hover:text-blue-500 transition flex-shrink-0 ${showEmojiPicker ? "text-blue-500" : ""}`}
// //                         title={
// //                           showEmojiPicker
// //                             ? "Close emoji picker"
// //                             : "Open emoji picker"
// //                         }
// //                       >
// //                         <FaSmile size={18} />
// //                       </button>
// //                       <button
// //                         onClick={() => fileInputRef.current?.click()}
// //                         className="text-gray-400 hover:text-blue-500 transition flex-shrink-0"
// //                         disabled={uploadingImage}
// //                         title="Upload image"
// //                       >
// //                         {uploadingImage ? (
// //                           <FaSpinner className="animate-spin" size={18} />
// //                         ) : (
// //                           <FaImage size={18} />
// //                         )}
// //                       </button>
// //                       <input
// //                         type="file"
// //                         ref={fileInputRef}
// //                         className="hidden"
// //                         accept="image/*"
// //                         onChange={handleImageUpload}
// //                       />
// //                       <input
// //                         ref={inputRef}
// //                         type="text"
// //                         value={newMessage}
// //                         onChange={(e) => setNewMessage(e.target.value)}
// //                         onKeyPress={(e) => e.key === "Enter" && sendMessage()}
// //                         placeholder="Type a reply…"
// //                         className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
// //                       />
// //                       <button
// //                         onClick={sendMessage}
// //                         disabled={!newMessage.trim() || sending}
// //                         className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-md transition"
// //                       >
// //                         {sending ? (
// //                           <FaSpinner className="animate-spin" size={13} />
// //                         ) : (
// //                           <FaPaperPlane size={13} />
// //                         )}
// //                       </button>
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           ) : (
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
// //                     {totalUnread} unread message{totalUnread !== 1 ? "s" : ""}{" "}
// //                     waiting
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
// //                   <li
// //                     key={i}
// //                     className="flex items-center gap-2 text-xs text-gray-600"
// //                   >
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
// //                   className="flex-1 px-4 py-2.5 text-sm bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl font-semibold transition flex items-center justify-center gap-2 disabled:opacity-60"
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
// //                   <li
// //                     key={i}
// //                     className="flex items-center gap-2 text-xs text-gray-600"
// //                   >
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
// //                   className="flex-1 px-4 py-2.5 text-sm bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold transition flex items-center justify-center gap-2 disabled:opacity-60"
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
//   FaImage,
// } from "react-icons/fa";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useSocket } from "../context/SocketContext";
// import EmojiPicker from "emoji-picker-react";

// const getToken = () => localStorage.getItem("token") || sessionStorage.getItem("token");
// const authHeader = () => ({ Authorization: `Bearer ${getToken()}` });

// const adminChatService = {
//   getAllChats: async (filter = "all", search = "") => {
//     const res = await axios.get(
//       `http://localhost:5000/api/admin/chats?filter=${filter}&search=${encodeURIComponent(search)}`,
//       { headers: authHeader() }
//     );
//     return res.data;
//   },
//   getChat: async (chatId) => {
//     const res = await axios.get(`http://localhost:5000/api/admin/chats/${chatId}`, {
//       headers: authHeader(),
//     });
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
//     const res = await axios.put(`http://localhost:5000/api/admin/chats/${chatId}/read`, {}, { headers: authHeader() });
//     return res.data;
//   },
//   blockUser: async (chatId) => {
//     const res = await axios.put(`http://localhost:5000/api/admin/chats/${chatId}/block`, {}, { headers: authHeader() });
//     return res.data;
//   },
//   unblockUser: async (chatId) => {
//     const res = await axios.put(`http://localhost:5000/api/admin/chats/${chatId}/unblock`, {}, { headers: authHeader() });
//     return res.data;
//   },
//   getUnreadCount: async () => {
//     const res = await axios.get(`http://localhost:5000/api/admin/chats/unread/count`, { headers: authHeader() });
//     return res.data;
//   },
// };

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

// const Avatar = ({ user, size = "md", className = "" }) => {
//   const s = size === "sm" ? "w-7 h-7 text-[10px]" : size === "lg" ? "w-12 h-12 text-base" : "w-9 h-9 text-sm";
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
//     <div
//       className={`${s} rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0 ${className}`}
//     >
//       {user?.name?.charAt(0)?.toUpperCase() || "?"}
//     </div>
//   );
// };

// const AdminMessages = () => {
//   const adminUser = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user") || "null");
//   const adminId = adminUser?._id || adminUser?.id;

//   const { isConnected, joinChat, leaveChat, onNewMessage, markRead: socketMarkRead } = useSocket();

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
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [uploadingImage, setUploadingImage] = useState(false);

//   const messagesEndRef = useRef(null);
//   const inputRef = useRef(null);
//   const selectedChatRef = useRef(null);
//   const initialLoadDone = useRef(false);
//   const fileInputRef = useRef(null);
//   const emojiPickerRef = useRef(null);

//   useEffect(() => {
//     selectedChatRef.current = selectedChat;
//   }, [selectedChat]);

//   // Close emoji picker when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         emojiPickerRef.current &&
//         !emojiPickerRef.current.contains(event.target) &&
//         !event.target.closest(".emoji-toggle-btn")
//       ) {
//         setShowEmojiPicker(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const fetchUnreadCount = useCallback(async () => {
//     try {
//       const res = await adminChatService.getUnreadCount();
//       if (res.success) setTotalUnread(res.count);
//     } catch (error) {
//       console.error("Error fetching unread count:", error);
//     }
//   }, []);

//   const fetchChats = useCallback(async () => {
//     try {
//       setChatsLoading(true);
//       const res = await adminChatService.getAllChats(activeFilter, searchQuery);
//       if (res.success) {
//         setChats(res.data);
//         setFilteredChats(res.data);
//         const unread = res.data.reduce((acc, c) => acc + (c.unreadForAdmin || 0), 0);
//         setTotalUnread(unread);
//       }
//     } catch (error) {
//       console.error("Error fetching chats:", error);
//       toast.error("Failed to load chats");
//     } finally {
//       setChatsLoading(false);
//     }
//   }, [activeFilter, searchQuery]);

//   useEffect(() => {
//     if (!initialLoadDone.current) {
//       initialLoadDone.current = true;
//       fetchChats();
//       fetchUnreadCount();
//     }
//   }, [fetchChats, fetchUnreadCount]);

//   useEffect(() => {
//     if (initialLoadDone.current) {
//       fetchChats();
//       fetchUnreadCount();
//     }
//   }, [activeFilter, searchQuery, fetchChats, fetchUnreadCount]);

//   useEffect(() => {
//     const unsubscribe = onNewMessage("*", (data) => {
//       if (!data.message) return;
//       setChats((prev) =>
//         prev.map((c) => {
//           if (c._id !== data.chatId) return c;
//           const isCurrentlyOpen = selectedChatRef.current?._id === data.chatId;
//           return {
//             ...c,
//             lastMessage: data.message.message || "📷 Image",
//             lastMessageAt: data.message.createdAt,
//             unreadForAdmin: isCurrentlyOpen ? 0 : (c.unreadForAdmin || 0) + 1,
//           };
//         })
//       );
//       setTotalUnread((prev) => {
//         const isCurrentlyOpen = selectedChatRef.current?._id === data.chatId;
//         return isCurrentlyOpen ? prev : prev + 1;
//       });
//     });
//     return unsubscribe;
//   }, [onNewMessage]);

//   useEffect(() => {
//     if (!selectedChat?._id) return;
//     const chatId = selectedChat._id;

//     const unsubscribe = onNewMessage(chatId, (data) => {
//       if (!data.message) return;

//       setMessages((prev) => {
//         if (prev.some((m) => m._id === data.message._id)) return prev;
//         const tempIdx = prev.findIndex(
//           (m) => m._id?.toString().startsWith("temp-") && m.message === data.message.message
//         );
//         if (tempIdx !== -1) {
//           const next = [...prev];
//           next[tempIdx] = data.message;
//           return next;
//         }
//         return [...prev, data.message];
//       });

//       setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 80);
//       adminChatService.markAsRead(chatId).catch(() => {});
//       socketMarkRead(chatId);
//     });
//     return unsubscribe;
//   }, [selectedChat?._id, onNewMessage, socketMarkRead]);

//   useEffect(() => {
//     if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

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

//   const openChat = async (chat) => {
//     if (selectedChatRef.current?._id) leaveChat(selectedChatRef.current._id);
//     setSelectedChat(chat);
//     setShowChatWindow(true);
//     setMessages([]);
//     joinChat(chat._id);
//     setShowEmojiPicker(false);

//     if (!chat.isBlocked) {
//       try {
//         setMessagesLoading(true);
//         const res = await adminChatService.getChat(chat._id);
//         if (res.success) {
//           setMessages(res.data.messages || []);
//           await adminChatService.markAsRead(chat._id);
//           socketMarkRead(chat._id);
//           setChats((prev) => prev.map((c) => (c._id !== chat._id ? c : { ...c, unreadForAdmin: 0 })));
//           await fetchUnreadCount();
//         }
//       } catch (error) {
//         console.error("Error loading messages:", error);
//         toast.error("Failed to load messages");
//       } finally {
//         setMessagesLoading(false);
//       }
//     }
//     setTimeout(() => inputRef.current?.focus(), 200);
//   };

//   const closeChat = () => {
//     if (selectedChatRef.current?._id) leaveChat(selectedChatRef.current._id);
//     setShowChatWindow(false);
//     setSelectedChat(null);
//     setMessages([]);
//     setNewMessage("");
//     setShowEmojiPicker(false);
//   };

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     if (!file.type.startsWith("image/")) {
//       toast.error("Only image files are allowed");
//       return;
//     }
//     if (file.size > 5 * 1024 * 1024) {
//       toast.error("Image must be less than 5MB");
//       return;
//     }

//     setUploadingImage(true);
//     try {
//       const formData = new FormData();
//       formData.append("image", file);
//       const res = await axios.post(
//         `http://localhost:5000/api/admin/chats/${selectedChat._id}/image`,
//         formData,
//         { headers: { ...authHeader(), "Content-Type": "multipart/form-data" } }
//       );
//       if (res.data.success) {
//         const tempMsg = {
//           _id: `temp-${Date.now()}`,
//           message: "",
//           senderType: "admin",
//           read: false,
//           delivered: false,
//           createdAt: new Date(),
//           attachments: [{ url: res.data.data.url, type: "image" }],
//           sender: adminUser,
//         };
//         setMessages((prev) => [...prev, tempMsg]);
//         setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
//       }
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       toast.error("Failed to upload image");
//     } finally {
//       setUploadingImage(false);
//       if (fileInputRef.current) fileInputRef.current.value = "";
//     }
//   };

//   const sendMessage = async () => {
//     if ((!newMessage.trim() && !uploadingImage) || sending || selectedChat?.isBlocked) return;
//     const text = newMessage.trim();
//     setSending(true);

//     const tempMsg = {
//       _id: `temp-${Date.now()}`,
//       message: text,
//       senderType: "admin",
//       read: false,
//       delivered: false,
//       createdAt: new Date(),
//       sender: adminUser,
//       attachments: [],
//     };
//     setMessages((prev) => [...prev, tempMsg]);
//     setNewMessage("");
//     setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);

//     try {
//       const res = await adminChatService.sendMessage(selectedChat._id, text);
//       if (res.success) {
//         setMessages((prev) => prev.map((m) => (m._id === tempMsg._id ? res.data : m)));
//         setChats((prev) =>
//           prev.map((c) =>
//             c._id !== selectedChat._id ? c : { ...c, lastMessage: text || "📷 Image", lastMessageAt: new Date() }
//           )
//         );
//       } else {
//         setMessages((prev) => prev.filter((m) => m._id !== tempMsg._id));
//         toast.error("Failed to send message");
//       }
//     } catch (error) {
//       console.error("Error sending message:", error);
//       setMessages((prev) => prev.filter((m) => m._id !== tempMsg._id));
//       toast.error("Failed to send message");
//     } finally {
//       setSending(false);
//     }
//   };

//   const handleBlock = async () => {
//     setBlockingUser(true);
//     try {
//       const res = await adminChatService.blockUser(selectedChat._id);
//       if (res.success) {
//         toast.success(`${selectedChat.otherParticipant?.name} has been blocked`);
//         setSelectedChat((p) => ({ ...p, isBlocked: true, blockedBy: adminId }));
//         setMessages([]);
//         fetchChats();
//         fetchUnreadCount();
//       }
//     } catch (error) {
//       console.error("Error blocking user:", error);
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
//         fetchUnreadCount();
//       }
//     } catch (error) {
//       console.error("Error unblocking user:", error);
//       toast.error("Failed to unblock user");
//     } finally {
//       setBlockingUser(false);
//       setShowUnblockConfirm(false);
//     }
//   };

//   const handleManualRefresh = () => {
//     fetchChats();
//     fetchUnreadCount();
//     toast.info("Refreshed messages");
//   };

//   const toggleEmojiPicker = () => {
//     setShowEmojiPicker(!showEmojiPicker);
//   };

//   // KEY FIX: onEmojiClick does NOT close the picker
//   const onEmojiClick = (emojiObject) => {
//     setNewMessage((prev) => prev + emojiObject.emoji);
//     inputRef.current?.focus();
//     // DO NOT setShowEmojiPicker(false) here - keep it open!
//   };

//   const getUnread = (chat) => chat.unreadForAdmin || 0;
//   const iBlockedThem = selectedChat?.isBlocked && selectedChat?.blockedBy === adminId;

//   const filterTabs = [
//     { id: "all", label: "All", count: chats.length },
//     { id: "vehicle", label: "Vehicle Chats", count: chats.filter((c) => c.chatType === "vehicle").length },
//     { id: "support", label: "Support", count: chats.filter((c) => c.chatType === "support").length },
//     { id: "unread", label: "Unread", count: chats.filter((c) => getUnread(c) > 0).length },
//   ];

//   const groupedMessages = (() => {
//     const groups = [];
//     let lastDate = null;
//     messages.forEach((msg, i) => {
//       const day = new Date(msg.createdAt).toDateString();
//       if (day !== lastDate) {
//         const today = new Date().toDateString();
//         const yesterday = new Date(Date.now() - 86400000).toDateString();
//         groups.push({ type: "date", label: day === today ? "Today" : day === yesterday ? "Yesterday" : day, key: `date-${i}` });
//         lastDate = day;
//       }
//       groups.push({ type: "msg", msg, key: msg._id || i });
//     });
//     return groups;
//   })();

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
//                     <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" /> Live
//                   </span>
//                 ) : (
//                   <span className="ml-2 inline-flex items-center gap-1 text-amber-500 text-xs">
//                     <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" /> Reconnecting…
//                   </span>
//                 )}
//               </p>
//             </div>
//             <button
//               onClick={handleManualRefresh}
//               className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition shadow-sm"
//             >
//               <FaSync className={chatsLoading ? "animate-spin text-blue-500" : "text-gray-400"} size={13} />
//               Refresh
//             </button>
//           </div>
//         </div>

//         {/* Chat panel */}
//         <div className="flex flex-1 min-h-0 m-6 rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-white">
//           {/* LEFT: Chat list */}
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
//                       activeFilter === tab.id ? "bg-blue-600 text-white shadow-sm" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
//                     }`}
//                   >
//                     {tab.label}
//                     {tab.count > 0 && (
//                       <span
//                         className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
//                           activeFilter === tab.id ? "bg-white/20 text-white" : "bg-gray-300 text-gray-600"
//                         }`}
//                       >
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
//                   <p className="text-sm font-semibold text-gray-600">{searchQuery ? "No results found" : "No conversations yet"}</p>
//                   <p className="text-xs text-gray-400 mt-1">{searchQuery ? "Try a different search term" : "User conversations will appear here"}</p>
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
//                           {chat.vehicleName && <span className="text-[10px] text-gray-400 truncate">· {chat.vehicleName}</span>}
//                           {isBlocked && <span className="text-[9px] text-red-500 font-bold uppercase">Blocked</span>}
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })
//               )}
//             </div>

//             <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
//               <span className="text-xs text-gray-500">{chats.length} conversation{chats.length !== 1 ? "s" : ""}</span>
//               {totalUnread > 0 && <span className="text-xs font-semibold text-blue-600">{totalUnread} unread</span>}
//             </div>
//           </div>

//           {/* RIGHT: Chat window */}
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
//                       <p className="text-sm font-bold text-gray-900">{selectedChat.otherParticipant?.name || "Unknown User"}</p>
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
//                   <span className="text-xs font-semibold text-blue-800">{selectedChat.vehicleName || "Vehicle Inquiry"}</span>
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
//                     <p className="text-sm font-bold text-gray-600">{iBlockedThem ? "Conversation blocked" : "Messaging unavailable"}</p>
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
//                     const hasImage = msg.attachments?.length > 0;
//                     return (
//                       <div key={item.key} className={`flex items-end gap-2 ${isOwn ? "justify-end" : "justify-start"}`}>
//                         {!isOwn && (
//                           <div className="flex-shrink-0 mb-1">
//                             <Avatar user={selectedChat.otherParticipant} size="sm" />
//                           </div>
//                         )}
//                         <div className={`flex flex-col ${isOwn ? "items-end" : "items-start"} max-w-[65%]`}>
//                           <div
//                             className={`px-4 py-2.5 text-sm leading-relaxed break-words ${
//                               isOwn
//                                 ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl rounded-br-sm shadow-sm"
//                                 : "bg-white text-gray-800 rounded-2xl rounded-bl-sm border border-gray-100 shadow-sm"
//                             }`}
//                           >
//                             {hasImage && (
//                               <div className="mb-1">
//                                 <img
//                                   src={`http://localhost:5000${msg.attachments[0].url}`}
//                                   alt="attachment"
//                                   className="max-w-[200px] max-h-[150px] rounded-lg cursor-pointer"
//                                   onClick={() => window.open(`http://localhost:5000${msg.attachments[0].url}`, "_blank")}
//                                 />
//                               </div>
//                             )}
//                             {msg.message && <p>{msg.message}</p>}
//                           </div>
//                           <div className={`flex items-center gap-1 mt-1 px-1 ${isOwn ? "flex-row-reverse" : ""}`}>
//                             <span className="text-[10px] text-gray-400">{formatMsgTime(msg.createdAt)}</span>
//                             {isOwn && <FaCheckDouble size={9} className={msg.read ? "text-blue-400" : "text-gray-300"} />}
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

//               {/* ── Input bar ── */}
//               <div className="px-4 py-3 bg-white border-t border-gray-100 flex-shrink-0">
//                 {!isConnected && (
//                   <p className="text-[11px] text-center text-amber-500 mb-2">Reconnecting to chat server…</p>
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
//                   <div className="relative">

//                     {/* ── UPDATED EMOJI PICKER ── */}
//                     {showEmojiPicker && (
//                       <div ref={emojiPickerRef} className="absolute bottom-full mb-3 right-0 z-50">
//                         <div className="rounded-2xl shadow-2xl border border-gray-200 overflow-hidden bg-white">

//                           {/* Gradient header bar with close button */}
//                           <div className="flex items-center justify-between px-3.5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600">
//                             <div className="flex items-center gap-2">
//                               <FaSmile size={13} className="text-white/80" />
//                               <span className="text-xs font-semibold text-white tracking-wide">Emoji</span>
//                             </div>
//                             <button
//                               onClick={() => setShowEmojiPicker(false)}
//                               className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 hover:bg-white/35 text-white transition-all duration-150 hover:scale-110"
//                               title="Close"
//                             >
//                               <FaTimes size={9} />
//                             </button>
//                           </div>

//                           <EmojiPicker
//                             onEmojiClick={onEmojiClick}
//                             width={340}
//                             height={380}
//                             lazyLoad={true}
//                           />
//                         </div>
//                       </div>
//                     )}

//                     {/* Input row */}
//                     <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-3 py-2">

//                       {/* ── UPDATED EMOJI TOGGLE BUTTON ── */}
//                       <button
//                         onClick={toggleEmojiPicker}
//                         className={`emoji-toggle-btn flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-150 ${
//                           showEmojiPicker
//                             ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md scale-105"
//                             : "text-gray-400 hover:text-blue-500 hover:bg-blue-50"
//                         }`}
//                         title={showEmojiPicker ? "Close emoji picker" : "Open emoji picker"}
//                       >
//                         <FaSmile size={16} />
//                       </button>

//                       <button
//                         onClick={() => fileInputRef.current?.click()}
//                         className="text-gray-400 hover:text-blue-500 transition flex-shrink-0"
//                         disabled={uploadingImage}
//                         title="Upload image"
//                       >
//                         {uploadingImage ? <FaSpinner className="animate-spin" size={18} /> : <FaImage size={18} />}
//                       </button>
//                       <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />

//                       <input
//                         ref={inputRef}
//                         type="text"
//                         value={newMessage}
//                         onChange={(e) => setNewMessage(e.target.value)}
//                         onKeyPress={(e) => e.key === "Enter" && sendMessage()}
//                         placeholder="Type a reply…"
//                         className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
//                       />

//                       <button
//                         onClick={sendMessage}
//                         disabled={!newMessage.trim() || sending}
//                         className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-md transition"
//                       >
//                         {sending ? <FaSpinner className="animate-spin" size={13} /> : <FaPaperPlane size={13} />}
//                       </button>
//                     </div>
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
//               <p className="text-sm text-gray-400 mt-2 max-w-xs">Choose a chat from the left panel to start replying to users</p>
//               {totalUnread > 0 && (
//                 <div className="mt-4 px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl">
//                   <p className="text-sm font-semibold text-blue-600">{totalUnread} unread message{totalUnread !== 1 ? "s" : ""} waiting</p>
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
//                 <button onClick={() => setShowBlockConfirm(false)} className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition font-medium">
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleBlock}
//                   disabled={blockingUser}
//                   className="flex-1 px-4 py-2.5 text-sm bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl font-semibold transition flex items-center justify-center gap-2 disabled:opacity-60"
//                 >
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
//                 <button onClick={() => setShowUnblockConfirm(false)} className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition font-medium">
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleUnblock}
//                   disabled={blockingUser}
//                   className="flex-1 px-4 py-2.5 text-sm bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold transition flex items-center justify-center gap-2 disabled:opacity-60"
//                 >
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
import axios from "axios";
import { toast } from "react-toastify";
import EmojiPicker from "emoji-picker-react";
import {
  FaSearch,
  FaSync,
  FaHeadset,
  FaCar,
  FaBan,
  FaUnlock,
  FaTimes,
  FaPaperPlane,
  FaSmile,
  FaImage,
  FaReply,
  FaEllipsisV,
  FaTrash,
  FaCheck,
  FaCheckDouble,
  FaSpinner,
  FaCommentDots,
  FaComments,
  FaUser,
  FaVolumeMute,
  FaVolumeUp,
  FaLock,
  FaInfoCircle,
  FaArrowLeft,
} from "react-icons/fa";
import { useSocket } from "../context/SocketContext";

const BASE = "http://localhost:5000";
const QUICK_REACTIONS = ["❤️", "😂", "😮", "😢", "😡", "👍"];

// ─── API helpers ──────────────────────────────────────────────────────────────
const api = {
  token: () => localStorage.getItem("token") || sessionStorage.getItem("token"),
  headers: () => ({ Authorization: `Bearer ${api.token()}` }),

  // Admin-specific endpoints
  getChats: () =>
    axios
      .get(`${BASE}/api/admin/chats`, { headers: api.headers() })
      .then((r) => r.data),
  getChat: (id) =>
    axios
      .get(`${BASE}/api/admin/chats/${id}`, { headers: api.headers() })
      .then((r) => r.data),
  markRead: (id) =>
    axios
      .put(`${BASE}/api/admin/chats/${id}/read`, {}, { headers: api.headers() })
      .then((r) => r.data),
  blockUser: (id) =>
    axios
      .put(
        `${BASE}/api/admin/chats/${id}/block`,
        {},
        { headers: api.headers() },
      )
      .then((r) => r.data),
  unblockUser: (id) =>
    axios
      .put(
        `${BASE}/api/admin/chats/${id}/unblock`,
        {},
        { headers: api.headers() },
      )
      .then((r) => r.data),

  // Message endpoint — admin route has full socket emit + unread tracking built in
  sendMessage: (id, message, replyToId = null) =>
    axios
      .post(
        `${BASE}/api/admin/chats/${id}/message`,
        { message, replyToId },
        { headers: api.headers() },
      )
      .then((r) => r.data),

  // Image endpoint — admin route handles socket + unread tracking
  sendImage: (id, file) => {
    const fd = new FormData();
    fd.append("image", file);
    return axios
      .post(`${BASE}/api/admin/chats/${id}/image`, fd, {
        headers: { ...api.headers(), "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data);
  },

  // These use the shared user chat endpoints (same logic, admin is a participant)
  unsend: (chatId, msgId) =>
    axios
      .delete(`${BASE}/api/chats/${chatId}/message/${msgId}/unsend`, {
        headers: api.headers(),
      })
      .then((r) => r.data),
  deleteForMe: (chatId, msgId) =>
    axios
      .delete(`${BASE}/api/chats/${chatId}/message/${msgId}`, {
        headers: api.headers(),
      })
      .then((r) => r.data),
  react: (chatId, msgId, emoji) =>
    axios
      .post(
        `${BASE}/api/chats/${chatId}/message/${msgId}/react`,
        { emoji },
        { headers: api.headers() },
      )
      .then((r) => r.data),
  closeChat: (id) =>
    axios
      .put(`${BASE}/api/chats/${id}/close`, {}, { headers: api.headers() })
      .then((r) => r.data),
  deleteConv: (id) =>
    axios
      .delete(`${BASE}/api/chats/${id}/conversation`, {
        headers: api.headers(),
      })
      .then((r) => r.data),
};

// ─── Message Bubble ───────────────────────────────────────────────────────────
const MessageBubble = ({
  msg,
  isOwn,
  adminUser,
  otherParticipant,
  onReply,
  onUnsend,
  onDeleteForMe,
  onReact,
}) => {
  const [showActions, setShowActions] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const moreRef = useRef(null);
  const actionsRef = useRef(null);

  const isUnsent = msg.isUnsent;
  const hasImage = msg.attachments?.length > 0;
  const shouldShow = showActions || showReactions || showMore;

  const reactionGroups = (msg.reactions || []).reduce((a, r) => {
    a[r.emoji] = (a[r.emoji] || 0) + 1;
    return a;
  }, {});
  const myReaction = (msg.reactions || []).find(
    (r) => r.userId === adminUser?._id || r.userId === adminUser?.id,
  );

  useEffect(() => {
    const h = (e) => {
      if (
        moreRef.current &&
        !moreRef.current.contains(e.target) &&
        actionsRef.current &&
        !actionsRef.current.contains(e.target)
      ) {
        setShowMore(false);
        setShowReactions(false);
        setShowActions(false);
      }
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const bubble = isUnsent
    ? "bg-gray-100 text-gray-400 italic border border-gray-200 rounded-2xl"
    : isOwn
      ? "bg-gradient-to-br from-indigo-600 to-violet-600 text-white rounded-2xl rounded-br-sm shadow-md"
      : msg.senderType === "admin"
        ? "bg-violet-50 border border-violet-200 text-gray-800 rounded-2xl rounded-bl-sm shadow-sm"
        : "bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-bl-sm shadow-sm";

  return (
    <div
      className={`flex flex-col ${isOwn ? "items-end" : "items-start"} mb-3`}
    >
      {/* Reply preview */}
      {msg.replyTo &&
        msg.replyToSnapshot &&
        msg.replyToSnapshot.message !== undefined &&
        !isUnsent && (
          <div
            className={`flex items-center gap-1.5 mb-1 px-2 py-1.5 rounded-lg bg-gray-100 border-l-2 border-indigo-400 max-w-[65%] ${isOwn ? "mr-8" : "ml-8"}`}
          >
            <FaReply size={9} className="text-indigo-400 flex-shrink-0" />
            <p className="text-[10px] text-gray-500 truncate">
              {msg.replyToSnapshot.isUnsent
                ? "Message was unsent"
                : msg.replyToSnapshot.hasImage
                  ? "📷 Image"
                  : msg.replyToSnapshot.message || "Message"}
            </p>
          </div>
        )}

      <div
        className={`flex items-center gap-1 ${isOwn ? "flex-row-reverse" : "flex-row"} w-full`}
      >
        {/* Avatar */}
        <div className="flex-shrink-0 self-end mb-1">
          {!isOwn ? (
            otherParticipant?.profilePhoto ? (
              <img
                src={`${BASE}/uploads/profiles/${otherParticipant.profilePhoto}`}
                alt=""
                className="w-7 h-7 rounded-full object-cover"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-[10px] font-bold">
                {otherParticipant?.name?.charAt(0)?.toUpperCase() || "?"}
              </div>
            )
          ) : adminUser?.profilePhoto ? (
            <img
              src={`${BASE}/uploads/profiles/${adminUser.profilePhoto}`}
              alt=""
              className="w-7 h-7 rounded-full object-cover"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-[10px] font-bold">
              <FaHeadset size={11} />
            </div>
          )}
        </div>

        <div
          className={`flex items-center max-w-[75%] ${isOwn ? "flex-row-reverse" : "flex-row"}`}
          onMouseEnter={() => setShowActions(true)}
          onMouseLeave={() => {
            if (!showMore && !showReactions) setShowActions(false);
          }}
        >
          {/* Toolbar */}
          {shouldShow && !isUnsent && (
            <div
              ref={actionsRef}
              className="flex items-center gap-0.5 flex-shrink-0 px-1"
            >
              <button
                onClick={() => onReply(msg)}
                className="w-6 h-6 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center hover:bg-indigo-50 transition"
                title="Reply"
              >
                <FaReply size={9} className="text-gray-500" />
              </button>
              <div className="relative">
                <button
                  onClick={() => {
                    setShowReactions(!showReactions);
                    setShowMore(false);
                  }}
                  className={`w-6 h-6 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center hover:bg-yellow-50 transition ${showReactions ? "bg-yellow-50 border-yellow-200" : ""}`}
                >
                  <FaSmile size={9} className="text-gray-500" />
                </button>
                {showReactions && (
                  <div
                    className={`absolute top-full mt-1 flex gap-1 bg-white rounded-full px-2 py-1.5 shadow-xl border border-gray-100 z-30 ${isOwn ? "right-0" : "left-0"}`}
                  >
                    {QUICK_REACTIONS.map((e) => (
                      <button
                        key={e}
                        onClick={() => {
                          onReact(msg._id, e);
                          setShowReactions(false);
                          setShowActions(false);
                        }}
                        className={`text-lg hover:scale-125 transition-transform leading-none ${myReaction?.emoji === e ? "scale-125" : ""}`}
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative" ref={moreRef}>
                <button
                  onClick={() => {
                    setShowMore(!showMore);
                    setShowReactions(false);
                  }}
                  className={`w-6 h-6 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition ${showMore ? "bg-gray-100" : ""}`}
                >
                  <FaEllipsisV size={8} className="text-gray-500" />
                </button>
                {showMore && (
                  <div
                    className={`absolute top-full mt-1 bg-white rounded-xl shadow-xl border border-gray-100 z-30 min-w-[160px] py-1 ${isOwn ? "right-0" : "left-0"}`}
                  >
                    <button
                      onClick={() => {
                        onReply(msg);
                        setShowMore(false);
                        setShowActions(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-indigo-600 hover:bg-indigo-50"
                    >
                      <FaReply size={10} /> Reply
                    </button>
                    {isOwn && (
                      <button
                        onClick={() => {
                          onUnsend(msg._id);
                          setShowMore(false);
                          setShowActions(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-orange-600 hover:bg-orange-50"
                      >
                        <FaTimes size={10} /> Unsend
                      </button>
                    )}
                    <button
                      onClick={() => {
                        onDeleteForMe(msg._id);
                        setShowMore(false);
                        setShowActions(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-red-500 hover:bg-red-50"
                    >
                      <FaTrash size={10} /> Delete for me
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Bubble */}
          <div
            className={`flex flex-col ${isOwn ? "items-end" : "items-start"}`}
          >
            <div
              className={`px-4 py-2.5 text-sm leading-relaxed break-words ${bubble}`}
            >
              {isUnsent ? (
                <span className="flex items-center gap-1.5 text-gray-400">
                  <FaTimes size={10} /> This message was unsent
                </span>
              ) : (
                <>
                  {hasImage && (
                    <div className="mb-1">
                      <img
                        src={`${BASE}${msg.attachments[0].url}`}
                        alt="attachment"
                        className="max-w-[200px] max-h-[150px] rounded-lg cursor-pointer"
                        onClick={() =>
                          window.open(
                            `${BASE}${msg.attachments[0].url}`,
                            "_blank",
                          )
                        }
                      />
                    </div>
                  )}
                  {msg.message && <p>{msg.message}</p>}
                </>
              )}
            </div>

            {/* Reactions */}
            {Object.keys(reactionGroups).length > 0 && (
              <div
                className={`flex gap-0.5 mt-1 flex-wrap ${isOwn ? "justify-end" : "justify-start"}`}
              >
                {Object.entries(reactionGroups).map(([e, c]) => (
                  <button
                    key={e}
                    onClick={() => onReact(msg._id, e)}
                    className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[11px] border transition ${myReaction?.emoji === e ? "bg-indigo-50 border-indigo-200 text-indigo-700" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"}`}
                  >
                    {e}
                    {c > 1 && <span className="ml-0.5">{c}</span>}
                  </button>
                ))}
              </div>
            )}

            {/* Time + read */}
            <div
              className={`flex items-center gap-1 mt-1 px-1 ${isOwn ? "flex-row-reverse" : ""}`}
            >
              <span className="text-[10px] text-gray-400">
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              {isOwn && !isUnsent && (
                <FaCheckDouble
                  size={9}
                  className={msg.read ? "text-indigo-400" : "text-gray-300"}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main AdminMessages Component ─────────────────────────────────────────────
const AdminMessages = () => {
  const [chats, setChats] = useState([]);
  const [chatsLoading, setChatsLoading] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [showChatWindow, setShowChatWindow] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [chatSearch, setChatSearch] = useState("");
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [processedIds, setProcessedIds] = useState(new Set());
  const [filter, setFilter] = useState("all");
  const [showBlockConfirm, setShowBlockConfirm] = useState(false);
  const [showUnblockConfirm, setShowUnblockConfirm] = useState(false);
  const [blockingUser, setBlockingUser] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const emojiRef = useRef(null);
  const selectedChatRef = useRef(null);
  const adminRef = useRef(null);

  const { socket, isConnected, onNewMessage, joinChat, leaveChat, markRead } =
    useSocket();

  // Load admin user from storage
  useEffect(() => {
    try {
      const u = JSON.parse(
        localStorage.getItem("user") || sessionStorage.getItem("user") || "{}",
      );
      setAdminUser(u);
      adminRef.current = u;
    } catch {}
  }, []);

  useEffect(() => {
    fetchChats();
  }, []);
  useEffect(() => {
    fetchChats();
  }, [filter]);

  // Close emoji on outside click
  useEffect(() => {
    const h = (e) => {
      if (
        emojiRef.current &&
        !emojiRef.current.contains(e.target) &&
        !e.target.closest(".emoji-btn")
      )
        setShowEmoji(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  // Socket: unsent messages
  useEffect(() => {
    if (!socket) return;
    const h = ({ messageId }) => {
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
    socket.on("message_unsent", h);
    return () => socket.off("message_unsent", h);
  }, [socket]);

  // Socket: reactions
  useEffect(() => {
    if (!socket) return;
    const h = ({ messageId, reactions }) => {
      setMessages((prev) =>
        prev.map((m) => (m._id === messageId ? { ...m, reactions } : m)),
      );
    };
    socket.on("message_reaction", h);
    return () => socket.off("message_reaction", h);
  }, [socket]);

  // Global socket listener — update chat list in real time
  useEffect(() => {
    const unsub = onNewMessage("*", (data) => {
      if (!data.message) return;
      const msgId = data.message._id;
      if (msgId && processedIds.has(msgId)) return;
      if (msgId) {
        setProcessedIds((prev) => new Set([...prev, msgId]));
        setTimeout(
          () =>
            setProcessedIds((prev) => {
              const s = new Set(prev);
              s.delete(msgId);
              return s;
            }),
          5000,
        );
      }

      const adminId = (
        adminRef.current?._id || adminRef.current?.id
      )?.toString();
      const senderId = (data.senderId || data.message?.sender?._id)?.toString();
      const isOwn = !!(senderId && adminId && senderId === adminId);
      const isOpen = selectedChatRef.current?._id === data.chatId;

      setChats((prev) => {
        const updated = prev.map((c) => {
          if (c._id !== data.chatId) return c;
          const counts = {
            ...(c.unreadCounts instanceof Map
              ? Object.fromEntries(c.unreadCounts)
              : c.unreadCounts || {}),
          };
          const cur = adminId ? counts[adminId] || 0 : 0;
          if (adminId) counts[adminId] = isOwn || isOpen ? 0 : cur + 1;
          return {
            ...c,
            lastMessage:
              data.message.message ||
              (data.message.attachments?.length ? "📷 Image" : ""),
            lastMessageAt: data.message.createdAt || new Date().toISOString(),
            unreadCounts: counts,
          };
        });
        return updated.sort(
          (a, b) =>
            new Date(b.lastMessageAt || b.updatedAt) -
            new Date(a.lastMessageAt || a.updatedAt),
        );
      });

      if (isOpen && !isOwn) {
        setMessages((prev) => {
          if (prev.some((m) => m._id === data.message._id)) return prev;
          return [...prev, data.message];
        });
        api.markRead(data.chatId).catch(() => {});
        markRead(data.chatId);
      }
    });
    return unsub;
  }, [onNewMessage, markRead, processedIds]);

  // Per-chat listener
  useEffect(() => {
    if (!selectedChat?._id) return;
    selectedChatRef.current = selectedChat;
    const chatId = selectedChat._id;
    const adminId = (adminRef.current?._id || adminRef.current?.id)?.toString();

    const unsub = onNewMessage(chatId, (data) => {
      if (!data.message) return;
      const msgId = data.message._id;
      if (msgId && processedIds.has(msgId)) return;
      if (msgId) {
        setProcessedIds((prev) => new Set([...prev, msgId]));
        setTimeout(
          () =>
            setProcessedIds((prev) => {
              const s = new Set(prev);
              s.delete(msgId);
              return s;
            }),
          5000,
        );
      }

      const senderId = (data.senderId || data.message?.sender?._id)?.toString();
      const isOwn = !!(senderId && adminId && senderId === adminId);

      setMessages((prev) => {
        const tempIdx = prev.findIndex(
          (m) =>
            m._id?.toString().startsWith("temp-") &&
            m.message === data.message.message &&
            isOwn,
        );
        if (tempIdx !== -1) {
          const n = [...prev];
          n[tempIdx] = data.message;
          return n;
        }
        if (!isOwn) {
          if (prev.some((m) => m._id === data.message._id)) return prev;
          return [...prev, data.message];
        }
        return prev;
      });

      setTimeout(
        () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
        100,
      );
      if (!isOwn) {
        api.markRead(chatId).catch(() => {});
        markRead(chatId);
      }
    });

    return unsub;
  }, [selectedChat?._id, onNewMessage, markRead, processedIds]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchChats = async (silent = false) => {
    try {
      if (!silent) setChatsLoading(true);
      const res = await api.getChats(filter);
      if (res.success) {
        setChats(
          res.data.sort(
            (a, b) =>
              new Date(b.lastMessageAt || b.updatedAt) -
              new Date(a.lastMessageAt || a.updatedAt),
          ),
        );
      }
    } catch {
      if (!silent) toast.error("Failed to load chats");
    } finally {
      if (!silent) setChatsLoading(false);
    }
  };

  const openChat = async (chat) => {
    if (selectedChatRef.current?._id) leaveChat(selectedChatRef.current._id);
    setSelectedChat(chat);
    selectedChatRef.current = chat;
    setShowChatWindow(true);
    setReplyTo(null);
    setShowEmoji(false);
    joinChat(chat._id);
    try {
      setMessagesLoading(true);
      const res = await api.getChat(chat._id);
      if (res.success) {
        setMessages(res.data.messages || []);
        await api.markRead(chat._id);
        markRead(chat._id);
        // Zero out unread for this chat
        const adminId = (
          adminRef.current?._id || adminRef.current?.id
        )?.toString();
        setChats((prev) =>
          prev.map((c) => {
            if (c._id !== chat._id) return c;
            const counts = {
              ...(c.unreadCounts instanceof Map
                ? Object.fromEntries(c.unreadCounts)
                : c.unreadCounts || {}),
            };
            if (adminId) counts[adminId] = 0;
            return { ...c, unreadCounts: counts };
          }),
        );
        setTimeout(
          () => messagesEndRef.current?.scrollIntoView({ behavior: "instant" }),
          80,
        );
      }
    } catch {
      toast.error("Failed to load messages");
    } finally {
      setMessagesLoading(false);
    }
    setTimeout(() => inputRef.current?.focus(), 200);
  };

  const closeChat = () => {
    if (selectedChatRef.current?._id) leaveChat(selectedChatRef.current._id);
    setShowChatWindow(false);
    setSelectedChat(null);
    selectedChatRef.current = null;
    setMessages([]);
    setNewMessage("");
    setReplyTo(null);
    setShowEmoji(false);
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || sending || !selectedChat) return;
    setSending(true);
    const text = newMessage;
    const replyToId = replyTo?._id || null;
    const adminId = adminRef.current?._id || adminRef.current?.id;

    const temp = {
      _id: `temp-${Date.now()}`,
      message: text,
      senderType: "admin",
      read: false,
      createdAt: new Date(),
      attachments: [],
      reactions: [],
      isUnsent: false,
      replyToSnapshot: replyTo
        ? {
            message: replyTo.message,
            senderType: replyTo.senderType,
            isUnsent: replyTo.isUnsent,
            hasImage: (replyTo.attachments || []).length > 0,
          }
        : null,
      sender: {
        _id: adminId,
        name: adminRef.current?.name,
        role: "admin",
        profilePhoto: adminRef.current?.profilePhoto,
      },
    };
    setMessages((prev) => [...prev, temp]);
    setNewMessage("");
    setReplyTo(null);
    setShowEmoji(false);
    setTimeout(
      () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
      100,
    );

    try {
      const res = await api.sendMessage(selectedChat._id, text, replyToId);
      if (res.success) {
        setMessages((prev) =>
          prev.map((m) => (m._id === temp._id ? res.data : m)),
        );
        setChats((prev) =>
          prev.map((c) =>
            c._id !== selectedChat._id
              ? c
              : { ...c, lastMessage: text, lastMessageAt: new Date() },
          ),
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

  const sendImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Only images allowed");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Max 5MB");
      return;
    }
    setUploadingImage(true);
    try {
      const res = await api.sendImage(selectedChat._id, file);
      if (res.success) {
        setMessages((prev) => {
          if (prev.some((m) => m._id === res.data._id)) return prev;
          return [...prev, res.data];
        });
        setChats((prev) =>
          prev.map((c) =>
            c._id !== selectedChat._id
              ? c
              : { ...c, lastMessage: "📷 Image", lastMessageAt: new Date() },
          ),
        );
        setTimeout(
          () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
          100,
        );
      } else toast.error("Failed to send image");
    } catch {
      toast.error("Failed to upload image");
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const unsendMessage = async (msgId) => {
    try {
      await api.unsend(selectedChat._id, msgId);
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

  const deleteForMe = async (msgId) => {
    try {
      await api.deleteForMe(selectedChat._id, msgId);
      setMessages((prev) => prev.filter((m) => m._id !== msgId));
    } catch {
      toast.error("Failed to delete");
    }
  };

  const reactToMessage = async (msgId, emoji) => {
    try {
      const res = await api.react(selectedChat._id, msgId, emoji);
      if (res.success)
        setMessages((prev) =>
          prev.map((m) =>
            m._id === msgId ? { ...m, reactions: res.reactions } : m,
          ),
        );
    } catch {
      toast.error("Failed to react");
    }
  };

  const handleBlockUser = async () => {
    setBlockingUser(true);
    try {
      await api.blockUser(selectedChat._id);
      toast.success("User blocked");
      setShowBlockConfirm(false);
      setSelectedChat((prev) => ({
        ...prev,
        isBlocked: true,
        blockedBy: adminUser?._id,
      }));
      fetchChats(true);
    } catch {
      toast.error("Failed to block user");
    } finally {
      setBlockingUser(false);
    }
  };

  const handleUnblockUser = async () => {
    setBlockingUser(true);
    try {
      await api.unblockUser(selectedChat._id);
      toast.success("User unblocked");
      setShowUnblockConfirm(false);
      setSelectedChat((prev) => ({
        ...prev,
        isBlocked: false,
        blockedBy: null,
      }));
      fetchChats(true);
    } catch {
      toast.error("Failed to unblock user");
    } finally {
      setBlockingUser(false);
    }
  };

  const handleCloseChat = async () => {
    try {
      await api.closeChat(selectedChat._id);
      toast.success("Chat closed");
      setShowCloseConfirm(false);
      fetchChats();
      closeChat();
    } catch {
      toast.error("Failed to close chat");
    }
  };

  const handleDeleteConv = async () => {
    try {
      await api.deleteConv(selectedChat._id);
      toast.success("Conversation deleted");
      setShowDeleteConfirm(false);
      setMessages([]);
    } catch {
      toast.error("Failed to delete");
    }
  };

  const getOtherParticipant = (chat) => {
    const adminId = (adminRef.current?._id || adminRef.current?.id)?.toString();
    if (!chat?.participants) return null;
    return chat.participants.find((p) => p._id?.toString() !== adminId) || null;
  };

  const getUnread = (chat) => {
    const adminId = (adminRef.current?._id || adminRef.current?.id)?.toString();
    if (!adminId || !chat.unreadCounts) return 0;
    if (chat.unreadCounts[adminId] !== undefined)
      return chat.unreadCounts[adminId] || 0;
    const k = Object.keys(chat.unreadCounts).find(
      (k) => k.toString() === adminId,
    );
    return k ? chat.unreadCounts[k] || 0 : 0;
  };

  const getTotalUnread = () => chats.reduce((s, c) => s + getUnread(c), 0);

  const formatTime = (date) => {
    if (!date) return "";
    const diff = Date.now() - new Date(date).getTime();
    const m = Math.floor(diff / 60000),
      h = Math.floor(diff / 3600000),
      d = Math.floor(diff / 86400000);
    if (m < 1) return "now";
    if (m < 60) return `${m}m`;
    if (h < 24) return `${h}h`;
    if (d === 1) return "Yesterday";
    return new Date(date).toLocaleDateString();
  };

  const filtered = chats.filter((c) => {
    if (!chatSearch.trim()) return true;
    const other = getOtherParticipant(c);
    const q = chatSearch.toLowerCase();
    return (
      (other?.name || "").toLowerCase().includes(q) ||
      (c.lastMessage || "").toLowerCase().includes(q) ||
      (c.vehicleName || "").toLowerCase().includes(q)
    );
  });

  const isOwn = (msg) => {
    const adminId = (adminRef.current?._id || adminRef.current?.id)?.toString();
    const senderId = (
      msg.sender?._id ||
      msg.sender?.id ||
      msg.sender
    )?.toString();
    return !!(adminId && senderId && senderId === adminId);
  };

  return (
    <div className="flex h-[calc(100vh-80px)] bg-gray-50 rounded-2xl overflow-hidden shadow-xl border border-gray-200">
      {/* ── Chat List ── */}
      <div
        className={`${showChatWindow ? "hidden lg:flex" : "flex"} flex-col w-full lg:w-[340px] bg-white border-r border-gray-100 flex-shrink-0`}
      >
        {/* Header */}
        <div className="px-5 pt-5 pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <FaComments className="text-indigo-500" /> Messages
                {getTotalUnread() > 0 && (
                  <span className="bg-red-500 text-white text-[10px] font-bold rounded-full px-2 py-0.5">
                    {getTotalUnread()}
                  </span>
                )}
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                {chats.length} conversation{chats.length !== 1 ? "s" : ""}
              </p>
            </div>
            <button
              onClick={() => fetchChats()}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-indigo-500 transition"
            >
              <FaSync
                className={chatsLoading ? "animate-spin" : ""}
                size={13}
              />
            </button>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 mb-3">
            <FaSearch size={11} className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={chatSearch}
              onChange={(e) => setChatSearch(e.target.value)}
              placeholder="Search conversations…"
              className="flex-1 bg-transparent text-xs text-gray-700 placeholder-gray-400 focus:outline-none"
            />
            {chatSearch && (
              <button
                onClick={() => setChatSearch("")}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes size={10} />
              </button>
            )}
          </div>
          {/* Filter tabs */}
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {[
              ["all", "All"],
              ["support", "Support"],
              ["vehicle", "Vehicle"],
              ["unread", "Unread"],
            ].map(([val, label]) => (
              <button
                key={val}
                onClick={() => {
                  setFilter(val);
                  fetchChats();
                }}
                className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition ${filter === val ? "bg-indigo-600 text-white shadow-sm" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {chatsLoading ? (
            <div className="flex justify-center items-center h-32">
              <FaSpinner className="animate-spin text-indigo-400 text-xl" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-16 text-center px-6">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center mb-3">
                <FaCommentDots className="text-indigo-300 text-2xl" />
              </div>
              <p className="text-sm font-medium text-gray-600">
                {chatSearch ? "No results" : "No conversations"}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {chatSearch
                  ? "Try a different search"
                  : "Messages from users will appear here"}
              </p>
            </div>
          ) : (
            filtered.map((chat) => {
              const other = getOtherParticipant(chat);
              const unread = getUnread(chat);
              const isSelected =
                selectedChat?._id === chat._id && showChatWindow;
              const isSupport = chat.chatType === "support";

              return (
                <div
                  key={chat._id}
                  onClick={() => openChat(chat)}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all border-b border-gray-50 ${isSelected ? "bg-indigo-50 border-l-[3px] border-l-indigo-500" : "hover:bg-gray-50 border-l-[3px] border-l-transparent"}`}
                >
                  <div className="relative flex-shrink-0">
                    {other?.profilePhoto ? (
                      <img
                        src={`${BASE}/uploads/profiles/${other.profilePhoto}`}
                        alt=""
                        className="w-11 h-11 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
                        {other?.name?.charAt(0).toUpperCase() || "?"}
                      </div>
                    )}
                    {unread > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-0.5">
                        {unread > 9 ? "9+" : unread}
                      </span>
                    )}
                    {chat.isBlocked && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center shadow-sm">
                        <FaBan size={7} />
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-1">
                      <span
                        className={`text-sm font-semibold truncate ${unread > 0 ? "text-gray-900" : "text-gray-700"}`}
                      >
                        {other?.name || "Unknown User"}
                      </span>
                      <span className="text-[10px] text-gray-400 flex-shrink-0">
                        {formatTime(chat.lastMessageAt || chat.updatedAt)}
                      </span>
                    </div>
                    <p
                      className={`text-xs truncate mt-0.5 ${unread > 0 ? "text-gray-800 font-medium" : "text-gray-400"}`}
                    >
                      {chat.lastMessage || "No messages yet"}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold uppercase tracking-wide ${isSupport ? "bg-violet-50 text-violet-600" : "bg-blue-50 text-blue-600"}`}
                      >
                        {isSupport ? "Support" : "Vehicle"}
                      </span>
                      {chat.vehicleName && !isSupport && (
                        <span className="text-[10px] text-gray-400 truncate">
                          · {chat.vehicleName}
                        </span>
                      )}
                      {chat.isBlocked && (
                        <span className="text-[9px] text-red-500 font-semibold uppercase">
                          Blocked
                        </span>
                      )}
                      {!chat.isActive && (
                        <span className="text-[9px] text-gray-400 font-semibold uppercase">
                          Closed
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
          {getTotalUnread() > 0 && (
            <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-full">
              {getTotalUnread()} unread
            </span>
          )}
        </div>
      </div>

      {/* ── Chat Window ── */}
      {showChatWindow && selectedChat ? (
        <div className="flex-1 flex flex-col min-w-0">
          {/* Chat Header */}
          <div className="px-5 py-3 bg-white border-b border-gray-100 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <button
                onClick={closeChat}
                className="lg:hidden w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition"
              >
                <FaArrowLeft size={14} />
              </button>
              {(() => {
                const other = getOtherParticipant(selectedChat);
                return (
                  <>
                    {other?.profilePhoto ? (
                      <img
                        src={`${BASE}/uploads/profiles/${other.profilePhoto}`}
                        alt=""
                        className="w-9 h-9 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
                        {other?.name?.charAt(0).toUpperCase() || "?"}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-gray-900">
                          {other?.name || "Unknown"}
                        </p>
                        <span className="text-[10px] text-gray-500">
                          {other?.email}
                        </span>
                        {selectedChat.isBlocked && (
                          <span className="inline-flex items-center gap-1 text-[10px] bg-red-50 text-red-500 border border-red-200 px-1.5 py-0.5 rounded-full font-semibold">
                            <FaBan size={8} /> Blocked
                          </span>
                        )}
                        {!selectedChat.isActive && (
                          <span className="inline-flex items-center gap-1 text-[10px] bg-gray-50 text-gray-500 border border-gray-200 px-1.5 py-0.5 rounded-full font-semibold">
                            <FaLock size={8} /> Closed
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400">
                        {selectedChat.chatType === "support"
                          ? "Support Chat"
                          : `Vehicle: ${selectedChat.vehicleName || "—"}`}
                      </p>
                    </div>
                  </>
                );
              })()}
            </div>

            {/* Header actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => fetchChats(true)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 transition"
                title="Refresh"
              >
                <FaSync size={12} />
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500 hover:bg-gray-50 border border-gray-200 transition"
                title="Delete conversation"
              >
                <FaTrash size={11} />
              </button>
              {!selectedChat.isBlocked ? (
                <button
                  onClick={() => setShowBlockConfirm(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-500 hover:bg-red-50 border border-red-100 transition"
                >
                  <FaBan size={11} /> Block
                </button>
              ) : selectedChat.blockedBy?.toString() ===
                (adminUser?._id || adminUser?.id)?.toString() ? (
                <button
                  onClick={() => setShowUnblockConfirm(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-600 hover:bg-emerald-50 border border-emerald-200 transition"
                >
                  <FaUnlock size={11} /> Unblock
                </button>
              ) : null}
              {selectedChat.isActive && (
                <button
                  onClick={() => setShowCloseConfirm(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-orange-600 hover:bg-orange-50 border border-orange-200 transition"
                >
                  <FaLock size={11} /> Close Chat
                </button>
              )}
            </div>
          </div>

          {/* Info banners */}
          {selectedChat.vehicleId && selectedChat.chatType === "vehicle" && (
            <div className="px-5 py-2.5 bg-blue-50 border-b border-blue-100 flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <FaCar size={12} className="text-blue-600" />
              </div>
              <span className="text-xs font-semibold text-blue-800">
                {selectedChat.vehicleName || "Vehicle Inquiry"}
              </span>
            </div>
          )}
          {selectedChat.chatType === "support" && (
            <div className="px-5 py-2.5 bg-violet-50 border-b border-violet-100 flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-violet-100 flex items-center justify-center flex-shrink-0">
                <FaHeadset size={12} className="text-violet-600" />
              </div>
              <span className="text-xs font-semibold text-violet-800">
                Support Chat — responding as admin
              </span>
            </div>
          )}
          <div className="flex items-center gap-2 px-5 py-1.5 bg-amber-50 border-b border-amber-100">
            <FaInfoCircle size={10} className="text-amber-500 flex-shrink-0" />
            <p className="text-[9.5px] text-amber-600">
              Messages are automatically deleted after <strong>3 days</strong>.
            </p>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1 bg-gray-50">
            {messagesLoading ? (
              <div className="flex justify-center items-center h-full">
                <FaSpinner className="animate-spin text-indigo-400 text-2xl" />
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-3">
                  <FaCommentDots className="text-indigo-300 text-2xl" />
                </div>
                <p className="text-sm font-medium text-gray-500">
                  No messages yet
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Start the conversation as admin
                </p>
              </div>
            ) : (
              (() => {
                const groups = [];
                let lastDate = null;
                messages.forEach((msg, idx) => {
                  const day = new Date(msg.createdAt).toDateString();
                  if (day !== lastDate) {
                    groups.push({
                      type: "date",
                      label: day,
                      key: `date-${idx}`,
                    });
                    lastDate = day;
                  }
                  groups.push({ type: "msg", msg, key: msg._id || idx });
                });
                return groups.map((item) => {
                  if (item.type === "date") {
                    const today = new Date().toDateString();
                    const yesterday = new Date(
                      Date.now() - 86400000,
                    ).toDateString();
                    const label =
                      item.label === today
                        ? "Today"
                        : item.label === yesterday
                          ? "Yesterday"
                          : item.label;
                    return (
                      <div
                        key={item.key}
                        className="flex items-center gap-3 py-2"
                      >
                        <div className="flex-1 h-px bg-gray-200" />
                        <span className="text-[10px] text-gray-400 font-medium px-2.5 py-1 bg-white border border-gray-200 rounded-full whitespace-nowrap shadow-sm">
                          {label}
                        </span>
                        <div className="flex-1 h-px bg-gray-200" />
                      </div>
                    );
                  }
                  const { msg } = item;
                  const own = isOwn(msg);
                  const other = getOtherParticipant(selectedChat);
                  return (
                    <MessageBubble
                      key={item.key}
                      msg={msg}
                      isOwn={own}
                      adminUser={adminUser}
                      otherParticipant={other}
                      onReply={setReplyTo}
                      onUnsend={unsendMessage}
                      onDeleteForMe={deleteForMe}
                      onReact={reactToMessage}
                    />
                  );
                });
              })()
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Reply bar */}
          {replyTo && (
            <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 border-t border-indigo-100">
              <FaReply size={11} className="text-indigo-500 flex-shrink-0" />
              <p className="flex-1 text-xs text-indigo-700 truncate">
                Replying:{" "}
                {replyTo.isUnsent
                  ? "Unsent message"
                  : replyTo.message || "📷 Image"}
              </p>
              <button
                onClick={() => setReplyTo(null)}
                className="text-indigo-400 hover:text-indigo-600"
              >
                <FaTimes size={12} />
              </button>
            </div>
          )}

          {/* Input */}
          <div className="px-4 py-3 bg-white border-t border-gray-100">
            {!isConnected && (
              <p className="text-[11px] text-center text-amber-500 mb-2">
                Reconnecting…
              </p>
            )}
            {!selectedChat.isActive ? (
              <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3">
                <FaLock size={14} className="text-gray-400" />
                <p className="text-xs text-gray-500 flex-1">
                  This chat has been closed by admin.
                </p>
              </div>
            ) : (
              <div className="relative">
                {showEmoji && (
                  <div
                    ref={emojiRef}
                    className="absolute bottom-full mb-3 right-0 z-50"
                  >
                    <div className="rounded-2xl shadow-2xl border border-gray-200 overflow-hidden bg-white">
                      <div className="flex items-center justify-between px-3.5 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600">
                        <div className="flex items-center gap-2">
                          <FaSmile size={13} className="text-white/80" />
                          <span className="text-xs font-semibold text-white">
                            Emoji
                          </span>
                        </div>
                        <button
                          onClick={() => setShowEmoji(false)}
                          className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/35 text-white flex items-center justify-center transition"
                        >
                          <FaTimes size={9} />
                        </button>
                      </div>
                      <EmojiPicker
                        onEmojiClick={(e) => {
                          setNewMessage((p) => p + e.emoji);
                          inputRef.current?.focus();
                        }}
                        width={340}
                        height={380}
                        lazyLoad={true}
                      />
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-3 py-2">
                  <button
                    onClick={() => setShowEmoji(!showEmoji)}
                    className={`emoji-btn flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-all ${showEmoji ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md scale-105" : "text-gray-400 hover:text-indigo-500 hover:bg-indigo-50"}`}
                  >
                    <FaSmile size={16} />
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="text-gray-400 hover:text-indigo-500 transition flex-shrink-0"
                  >
                    {uploadingImage ? (
                      <FaSpinner className="animate-spin" size={18} />
                    ) : (
                      <FaImage size={18} />
                    )}
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={sendImage}
                  />
                  <input
                    ref={inputRef}
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    placeholder={
                      replyTo ? "Type your reply…" : "Reply as admin…"
                    }
                    className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!newMessage.trim() || sending}
                    className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-md transition"
                  >
                    {sending ? (
                      <FaSpinner className="animate-spin" size={13} />
                    ) : (
                      <FaPaperPlane size={13} />
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 hidden lg:flex flex-col items-center justify-center bg-gray-50 text-center px-8">
          <div className="w-20 h-20 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4">
            <FaComments className="text-indigo-300 text-3xl" />
          </div>
          <p className="text-base font-semibold text-gray-600">
            Select a conversation
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Choose a chat from the left to start responding
          </p>
        </div>
      )}

      {/* ── Block Confirm ── */}
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
                They won't be able to message in this chat
              </p>
            </div>
            <div className="-mt-4 bg-white rounded-t-2xl px-6 pt-5 pb-6">
              <div className="flex items-center gap-3 mb-5 p-3 bg-gray-50 rounded-xl border border-gray-100">
                {(() => {
                  const other = getOtherParticipant(selectedChat);
                  return other?.profilePhoto ? (
                    <img
                      src={`${BASE}/uploads/profiles/${other.profilePhoto}`}
                      alt=""
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                      {other?.name?.charAt(0).toUpperCase() || "?"}
                    </div>
                  );
                })()}
                <div>
                  <p className="font-semibold text-gray-800 text-sm">
                    {getOtherParticipant(selectedChat)?.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Will be blocked from this chat
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowBlockConfirm(false)}
                  className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBlockUser}
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

      {/* ── Unblock Confirm ── */}
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
                They'll be able to message again
              </p>
            </div>
            <div className="-mt-4 bg-white rounded-t-2xl px-6 pt-5 pb-6">
              <div className="flex gap-2">
                <button
                  onClick={() => setShowUnblockConfirm(false)}
                  className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUnblockUser}
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

      {/* ── Close Chat Confirm ── */}
      {showCloseConfirm && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.55)" }}
        >
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-6 pt-6 pb-10">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                <FaLock size={24} className="text-white" />
              </div>
              <h3 className="text-white text-center text-lg font-bold">
                Close Chat?
              </h3>
              <p className="text-orange-100 text-center text-xs mt-1">
                The user won't be able to send more messages
              </p>
            </div>
            <div className="-mt-4 bg-white rounded-t-2xl px-6 pt-5 pb-6">
              <p className="text-sm text-gray-600 mb-5 text-center">
                This will mark the conversation as closed. Existing messages
                will remain visible.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowCloseConfirm(false)}
                  className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCloseChat}
                  className="flex-1 px-4 py-2.5 text-sm bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold transition flex items-center justify-center gap-2"
                >
                  <FaLock size={12} /> Close Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Conv Confirm ── */}
      {showDeleteConfirm && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.55)" }}
        >
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-gray-600 to-gray-800 px-6 pt-6 pb-10">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                <FaTrash size={24} className="text-white" />
              </div>
              <h3 className="text-white text-center text-lg font-bold">
                Delete Conversation?
              </h3>
              <p className="text-gray-300 text-center text-xs mt-1">
                Only deleted for you
              </p>
            </div>
            <div className="-mt-4 bg-white rounded-t-2xl px-6 pt-5 pb-6">
              <p className="text-sm text-gray-600 mb-5 text-center">
                This removes all messages for you only. The user can still see
                the conversation.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConv}
                  className="flex-1 px-4 py-2.5 text-sm bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-xl font-semibold transition flex items-center justify-center gap-2"
                >
                  <FaTrash size={12} /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
