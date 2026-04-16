// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { useSocket } from "../../context/SocketContext";
// import { chatService } from "../../services/chatService";
// import {
//   FaPaperPlane,
//   FaTimes,
//   FaUserCircle,
//   FaSpinner,
//   FaCheck,
//   FaCheckDouble,
//   FaImage,
//   FaSmile,
//   FaArrowLeft,
//   FaPhone,
//   FaVideo,
//   FaEllipsisV,
//   FaCar,
//   FaExpand,
//   FaCompress,
//   FaBan,
//   FaUnlock,
// } from "react-icons/fa";
// import EmojiPicker from "emoji-picker-react";

// const ChatWindow = ({ chat, onClose, onMessageSent }) => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [sending, setSending] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [chatPartner, setChatPartner] = useState(null);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [isFullScreen, setIsFullScreen] = useState(false);
//   const [showBlockConfirm, setShowBlockConfirm] = useState(false);
//   const [showUnblockConfirm, setShowUnblockConfirm] = useState(false);
//   const [blockingUser, setBlockingUser] = useState(false);
//   const messagesEndRef = useRef(null);
//   const inputRef = useRef(null);
//   const emojiButtonRef = useRef(null);

//   const {
//     isConnected,
//     joinChat,
//     leaveChat,
//     sendMessage: socketSendMessage,
//     onNewMessage,
//     onMessagesRead,
//     onUserTyping,
//     markRead: socketMarkRead,
//   } = useSocket();

//   const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

//   // Get chat partner details
//   const getChatPartner = useCallback(async () => {
//     try {
//       const otherParticipant = chat.participants.find(
//         (p) => p._id !== currentUser.id,
//       );

//       if (otherParticipant) {
//         let role = "user";
//         let displayName = otherParticipant.name;
//         let image = null;

//         if (chat.chatType === "vehicle") {
//           if (otherParticipant.role === "admin") {
//             role = "admin";
//             displayName = "Support Team";
//             image = `https://ui-avatars.com/api/?background=6B21A5&color=fff&rounded=true&size=128&name=Support`;
//           } else {
//             role = "owner";
//             displayName = otherParticipant.name || "Vehicle Owner";
//             image = otherParticipant.profilePhoto
//               ? `http://localhost:5000/uploads/profiles/${otherParticipant.profilePhoto}`
//               : `https://ui-avatars.com/api/?background=16A34A&color=fff&rounded=true&size=128&name=${displayName.charAt(0)}`;
//           }
//         } else if (chat.chatType === "support") {
//           role = "support";
//           displayName = "Support Team";
//           image = `https://ui-avatars.com/api/?background=6B21A5&color=fff&rounded=true&size=128&name=Support`;
//         } else {
//           displayName = otherParticipant.name;
//           image = otherParticipant.profilePhoto
//             ? `http://localhost:5000/uploads/profiles/${otherParticipant.profilePhoto}`
//             : `https://ui-avatars.com/api/?background=3B82F6&color=fff&rounded=true&size=128&name=${displayName.charAt(0)}`;
//         }

//         setChatPartner({
//           name: displayName,
//           image: image,
//           role: role,
//           id: otherParticipant._id,
//         });
//       }
//     } catch (error) {
//       console.error("Error getting chat partner:", error);
//     }
//   }, [chat, currentUser.id]);

//   useEffect(() => {
//     if (chat?.participants) {
//       getChatPartner();
//     }
//   }, [chat, getChatPartner]);

//   // Load messages
//   useEffect(() => {
//     const loadMessages = async () => {
//       try {
//         const response = await chatService.getChat(chat._id);
//         if (response.success) {
//           setMessages(response.data.messages || []);
//           await chatService.markAsRead(chat._id);
//           socketMarkRead(chat._id);
//           if (onMessageSent) onMessageSent();
//         }
//       } catch (error) {
//         console.error("Error loading messages:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadMessages();
//   }, [chat._id, socketMarkRead, onMessageSent]);

//   // Join chat room
//   useEffect(() => {
//     if (isConnected && chat._id) {
//       joinChat(chat._id);
//     }
//     return () => {
//       if (chat._id) {
//         leaveChat(chat._id);
//       }
//     };
//   }, [isConnected, chat._id, joinChat, leaveChat]);

//   // Listen for new messages
//   useEffect(() => {
//     const unsubscribe = onNewMessage(chat._id, (data) => {
//       if (data.message) {
//         setMessages((prev) => {
//           if (prev.some((m) => m._id === data.message._id)) return prev;
//           // Replace optimistic temp message
//           const tempIdx = prev.findIndex(
//             (m) =>
//               m._id?.toString().startsWith("temp-") &&
//               m.message === data.message.message
//           );
//           if (tempIdx !== -1) {
//             const next = [...prev];
//             next[tempIdx] = data.message;
//             return next;
//           }
//           return [...prev, data.message];
//         });
//         chatService.markAsRead(chat._id);
//         socketMarkRead(chat._id);
//         if (onMessageSent) onMessageSent();
//       }
//     });
//     return unsubscribe;
//   }, [chat._id, onNewMessage, socketMarkRead, onMessageSent]);

//   // Scroll to bottom when messages change
//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || sending) return;

//     const messageText = newMessage.trim();
//     setSending(true);
    
//     // Optimistic UI - add message immediately
//     const tempMessage = {
//       _id: `temp-${Date.now()}`,
//       message: messageText,
//       senderType: "user",
//       read: false,
//       delivered: false,
//       createdAt: new Date(),
//       sender: {
//         _id: currentUser.id,
//         name: currentUser.name,
//         email: currentUser.email,
//         profilePhoto: currentUser.profilePhoto,
//         role: currentUser.role,
//       },
//     };
    
//     setMessages((prev) => [...prev, tempMessage]);
//     setNewMessage("");
//     setShowEmojiPicker(false);
    
//     setTimeout(() => {
//       messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, 100);
    
//     try {
//       // Send via API
//       const response = await chatService.sendMessage(chat._id, messageText);
//       if (response.success) {
//         // Replace temp message with real one
//         setMessages((prev) =>
//           prev.map((m) => (m._id === tempMessage._id ? response.data : m))
//         );
//         // Also emit via socket for real-time
//         if (socketSendMessage && isConnected) {
//           socketSendMessage(chat._id, messageText);
//         }
//         if (onMessageSent) onMessageSent();
//       } else {
//         // Remove temp message on error
//         setMessages((prev) => prev.filter((m) => m._id !== tempMessage._id));
//       }
//     } catch (error) {
//       console.error("Error sending message:", error);
//       setMessages((prev) => prev.filter((m) => m._id !== tempMessage._id));
//     } finally {
//       setSending(false);
//     }
//   };

//   const handleBlock = async () => {
//     setBlockingUser(true);
//     try {
//       const response = await chatService.blockUser(chat._id);
//       if (response.success) {
//         alert(`${chatPartner?.name} has been blocked`);
//         onClose();
//       }
//     } catch (error) {
//       console.error("Error blocking user:", error);
//       alert("Failed to block user");
//     } finally {
//       setBlockingUser(false);
//       setShowBlockConfirm(false);
//     }
//   };

//   const handleUnblock = async () => {
//     setBlockingUser(true);
//     try {
//       const response = await chatService.unblockUser(chat._id);
//       if (response.success) {
//         alert(`${chatPartner?.name} has been unblocked`);
//         window.location.reload();
//       }
//     } catch (error) {
//       console.error("Error unblocking user:", error);
//       alert("Failed to unblock user");
//     } finally {
//       setBlockingUser(false);
//       setShowUnblockConfirm(false);
//     }
//   };

//   const toggleFullScreen = () => {
//     setIsFullScreen(!isFullScreen);
//   };

//   const onEmojiClick = (emojiObject) => {
//     setNewMessage((prev) => prev + emojiObject.emoji);
//     setShowEmojiPicker(false);
//     inputRef.current?.focus();
//   };

//   const formatTime = (date) => {
//     return new Date(date).toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const formatDate = (date) => {
//     const today = new Date();
//     const msgDate = new Date(date);
//     if (msgDate.toDateString() === today.toDateString()) return "Today";
//     const yesterday = new Date(today);
//     yesterday.setDate(yesterday.getDate() - 1);
//     if (msgDate.toDateString() === yesterday.toDateString()) return "Yesterday";
//     return msgDate.toLocaleDateString();
//   };

//   const isBlocked = chat.isBlocked;
//   const iBlockedThem = isBlocked && chat.blockedBy === currentUser.id;

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-full">
//         <FaSpinner className="animate-spin text-blue-500 text-3xl" />
//       </div>
//     );
//   }

//   return (
//     <div
//       className={`flex flex-col bg-white ${isFullScreen ? "fixed inset-0 z-[200] rounded-none" : "h-full rounded-2xl"}`}
//     >
//       {/* Chat Header */}
//       <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <button
//             onClick={onClose}
//             className="lg:hidden hover:bg-white/20 p-2 rounded-full transition"
//           >
//             <FaArrowLeft />
//           </button>
//           <div className="flex items-center gap-3">
//             {chatPartner?.image ? (
//               <img
//                 src={chatPartner.image}
//                 alt={chatPartner.name}
//                 className="w-10 h-10 rounded-full object-cover border-2 border-white"
//               />
//             ) : (
//               <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
//                 <FaUserCircle className="text-2xl" />
//               </div>
//             )}
//             <div>
//               <h3 className="font-semibold">{chatPartner?.name || "Loading..."}</h3>
//               <div className="flex flex-col text-xs text-white/80">
//                 <span>
//                   {chatPartner?.role === "owner"
//                     ? "Vehicle Owner"
//                     : chatPartner?.role === "admin"
//                     ? "Support Team"
//                     : "Online"}
//                 </span>
//                 {chat.vehicleName && (
//                   <span className="flex items-center gap-1 mt-0.5">
//                     <FaCar size={10} /> {chat.vehicleName}
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           {!isBlocked ? (
//             <button
//               onClick={() => setShowBlockConfirm(true)}
//               className="p-2 hover:bg-white/20 rounded-full transition"
//               title="Block user"
//             >
//               <FaBan size={16} />
//             </button>
//           ) : iBlockedThem ? (
//             <button
//               onClick={() => setShowUnblockConfirm(true)}
//               className="p-2 hover:bg-white/20 rounded-full transition"
//               title="Unblock user"
//             >
//               <FaUnlock size={16} />
//             </button>
//           ) : null}
//           <button
//             onClick={toggleFullScreen}
//             className="p-2 hover:bg-white/20 rounded-full transition hidden md:block"
//             title={isFullScreen ? "Exit full screen" : "Full screen"}
//           >
//             {isFullScreen ? <FaCompress size={16} /> : <FaExpand size={16} />}
//           </button>
//           <button
//             onClick={onClose}
//             className="hover:bg-white/20 p-2 rounded-full transition"
//           >
//             <FaTimes />
//           </button>
//         </div>
//       </div>

//       {/* Messages Area */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
//         {messages.length === 0 ? (
//           <div className="flex flex-col items-center justify-center h-full text-center">
//             <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
//               <FaCar className="text-gray-400 text-3xl" />
//             </div>
//             <h3 className="text-lg font-semibold text-gray-700 mb-2">
//               No messages yet
//             </h3>
//             <p className="text-gray-500 text-sm">
//               Start a conversation about {chat.vehicleName || "this vehicle"}
//             </p>
//           </div>
//         ) : (
//           messages.map((message, index) => {
//             const isOwn = message.sender?._id === currentUser.id;
//             const showDate =
//               index === 0 ||
//               new Date(message.createdAt).toDateString() !==
//                 new Date(messages[index - 1]?.createdAt).toDateString();

//             return (
//               <div key={message._id || index}>
//                 {showDate && (
//                   <div className="text-center my-2">
//                     <span className="text-xs text-gray-400 bg-gray-200 px-3 py-1 rounded-full">
//                       {formatDate(message.createdAt)}
//                     </span>
//                   </div>
//                 )}
//                 <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
//                   {!isOwn && (
//                     <div className="flex-shrink-0 mr-2">
//                       {chatPartner?.image ? (
//                         <img
//                           src={chatPartner.image}
//                           alt=""
//                           className="w-8 h-8 rounded-full object-cover"
//                         />
//                       ) : (
//                         <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
//                           {chatPartner?.name?.charAt(0).toUpperCase() || "U"}
//                         </div>
//                       )}
//                     </div>
//                   )}
//                   <div className={`max-w-[70%] ${isOwn ? "order-1" : "order-2"}`}>
//                     <div
//                       className={`rounded-2xl px-4 py-2 ${
//                         isOwn
//                           ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-sm"
//                           : "bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-sm"
//                       }`}
//                     >
//                       <p className="text-sm break-words">{message.message}</p>
//                     </div>
//                     <div
//                       className={`text-xs text-gray-400 mt-1 flex items-center gap-1 ${
//                         isOwn ? "justify-end" : "justify-start"
//                       }`}
//                     >
//                       <span>{formatTime(message.createdAt)}</span>
//                       {isOwn && (
//                         <>
//                           {message.read ? (
//                             <FaCheckDouble className="text-blue-500 text-xs" title="Read" />
//                           ) : message.delivered ? (
//                             <FaCheck className="text-gray-400 text-xs" title="Delivered" />
//                           ) : (
//                             <FaSpinner className="animate-spin text-xs" title="Sending" />
//                           )}
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input Area */}
//       <div className="p-4 border-t bg-white relative">
//         {!isConnected && (
//           <p className="text-[11px] text-center text-amber-500 mb-2">
//             Reconnecting to chat server…
//           </p>
//         )}
//         {isBlocked && iBlockedThem ? (
//           <div className="flex items-center gap-3 rounded-2xl px-4 py-3 bg-red-50 border border-red-100">
//             <FaBan size={14} className="text-red-400" />
//             <p className="text-xs flex-1 text-red-500">
//               You blocked this user.{" "}
//               <button onClick={() => setShowUnblockConfirm(true)} className="underline font-semibold">
//                 Unblock to chat
//               </button>
//             </p>
//           </div>
//         ) : isBlocked ? (
//           <div className="flex items-center gap-3 rounded-2xl px-4 py-3 bg-amber-50 border border-amber-100">
//             <FaBan size={14} className="text-amber-400" />
//             <p className="text-xs flex-1 text-amber-600">
//               You cannot send messages in this conversation.
//             </p>
//           </div>
//         ) : (
//           <div className="flex items-center gap-3">
//             <div className="relative">
//               <button
//                 onClick={() => setShowEmojiPicker(!showEmojiPicker)}
//                 className="flex-shrink-0 w-10 h-10 text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all rounded-full flex items-center justify-center"
//                 ref={emojiButtonRef}
//               >
//                 <FaSmile size={20} />
//               </button>
//               {showEmojiPicker && (
//                 <div className="absolute bottom-14 left-0 z-50">
//                   <EmojiPicker onEmojiClick={onEmojiClick} />
//                 </div>
//               )}
//             </div>
//             <input
//               ref={inputRef}
//               type="text"
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//               placeholder="Type a message..."
//               className="flex-1 px-4 py-2.5 border border-gray-200 rounded-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
//             />
//             <button
//               onClick={handleSendMessage}
//               disabled={!newMessage.trim() || sending}
//               className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//             >
//               {sending ? (
//                 <FaSpinner className="animate-spin" size={18} />
//               ) : (
//                 <FaPaperPlane size={18} />
//               )}
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Block Confirm Modal */}
//       {showBlockConfirm && (
//         <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/50">
//           <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4">
//             <div className="text-center mb-4">
//               <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                 <FaBan className="text-red-500 text-2xl" />
//               </div>
//               <h3 className="text-lg font-bold text-gray-900">Block User?</h3>
//               <p className="text-sm text-gray-500 mt-1">
//                 You will no longer receive messages from {chatPartner?.name}
//               </p>
//             </div>
//             <p className="text-gray-600 text-sm mb-6 text-center">
//               Are you sure you want to block this user? You can unblock them
//               anytime from your chat settings.
//             </p>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setShowBlockConfirm(false)}
//                 className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleBlock}
//                 disabled={blockingUser}
//                 className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
//               >
//                 {blockingUser ? (
//                   <FaSpinner className="animate-spin" size={14} />
//                 ) : (
//                   <FaBan size={14} />
//                 )}
//                 {blockingUser ? "Blocking..." : "Block User"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Unblock Confirm Modal */}
//       {showUnblockConfirm && (
//         <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/50">
//           <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4">
//             <div className="text-center mb-4">
//               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                 <FaUnlock className="text-green-500 text-2xl" />
//               </div>
//               <h3 className="text-lg font-bold text-gray-900">Unblock User?</h3>
//               <p className="text-sm text-gray-500 mt-1">
//                 You will be able to chat with {chatPartner?.name} again
//               </p>
//             </div>
//             <p className="text-gray-600 text-sm mb-6 text-center">
//               Are you sure you want to unblock this user? They will be able to
//               send you messages again.
//             </p>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setShowUnblockConfirm(false)}
//                 className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleUnblock}
//                 disabled={blockingUser}
//                 className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
//               >
//                 {blockingUser ? (
//                   <FaSpinner className="animate-spin" size={14} />
//                 ) : (
//                   <FaUnlock size={14} />
//                 )}
//                 {blockingUser ? "Unblocking..." : "Unblock User"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatWindow;



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
  FaSmile,
  FaArrowLeft,
  FaEllipsisV,
  FaCar,
  FaExpand,
  FaCompress,
  FaBan,
  FaUnlock,
  FaPaperclip,
  FaHeadset,
} from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";

const ChatWindow = ({ chat, onClose, onMessageSent }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [chatPartner, setChatPartner] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showBlockConfirm, setShowBlockConfirm] = useState(false);
  const [showUnblockConfirm, setShowUnblockConfirm] = useState(false);
  const [blockingUser, setBlockingUser] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const menuRef = useRef(null);

  const {
    isConnected,
    joinChat,
    leaveChat,
    sendMessage: socketSendMessage,
    onNewMessage,
    onMessagesRead,
    onUserTyping,
    markRead: socketMarkRead,
  } = useSocket();

  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  /* ── Avatar helpers ── */
  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    return parts.length >= 2
      ? parts[0][0].toUpperCase() + parts[1][0].toUpperCase()
      : name.slice(0, 2).toUpperCase();
  };

  /* ── Chat partner ── */
  const getChatPartner = useCallback(async () => {
    try {
      const other = chat.participants.find((p) => p._id !== currentUser.id);
      if (!other) return;

      let role = "user";
      let displayName = other.name;
      let image = null;

      if (chat.chatType === "vehicle") {
        if (other.role === "admin") {
          role = "admin";
          displayName = "Support Team";
          image = `https://ui-avatars.com/api/?background=6B21A5&color=fff&rounded=true&size=128&name=Support`;
        } else {
          role = "owner";
          displayName = other.name || "Vehicle Owner";
          image = other.profilePhoto
            ? `http://localhost:5000/uploads/profiles/${other.profilePhoto}`
            : `https://ui-avatars.com/api/?background=16A34A&color=fff&rounded=true&size=128&name=${displayName.charAt(0)}`;
        }
      } else if (chat.chatType === "support") {
        role = "support";
        displayName = "Support Team";
        image = `https://ui-avatars.com/api/?background=6B21A5&color=fff&rounded=true&size=128&name=Support`;
      } else {
        image = other.profilePhoto
          ? `http://localhost:5000/uploads/profiles/${other.profilePhoto}`
          : `https://ui-avatars.com/api/?background=2563EB&color=fff&rounded=true&size=128&name=${displayName.charAt(0)}`;
      }

      setChatPartner({ name: displayName, image, role, id: other._id });
    } catch (error) {
      console.error("Error getting chat partner:", error);
    }
  }, [chat, currentUser.id]);

  useEffect(() => {
    if (chat?.participants) getChatPartner();
  }, [chat, getChatPartner]);

  /* ── Load messages ── */
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const response = await chatService.getChat(chat._id);
        if (response.success) {
          setMessages(response.data.messages || []);
          await chatService.markAsRead(chat._id);
          socketMarkRead(chat._id);
          if (onMessageSent) onMessageSent();
        }
      } catch (error) {
        console.error("Error loading messages:", error);
      } finally {
        setLoading(false);
      }
    };
    loadMessages();
  }, [chat._id, socketMarkRead, onMessageSent]);

  /* ── Socket: join/leave ── */
  useEffect(() => {
    if (isConnected && chat._id) joinChat(chat._id);
    return () => { if (chat._id) leaveChat(chat._id); };
  }, [isConnected, chat._id, joinChat, leaveChat]);

  /* ── Socket: new messages ── */
  useEffect(() => {
    const unsubscribe = onNewMessage(chat._id, (data) => {
      if (data.message) {
        setMessages((prev) => {
          if (prev.some((m) => m._id === data.message._id)) return prev;
          const tempIdx = prev.findIndex(
            (m) =>
              m._id?.toString().startsWith("temp-") &&
              m.message === data.message.message
          );
          if (tempIdx !== -1) {
            const next = [...prev];
            next[tempIdx] = data.message;
            return next;
          }
          return [...prev, data.message];
        });
        chatService.markAsRead(chat._id);
        socketMarkRead(chat._id);
        if (onMessageSent) onMessageSent();
      }
    });
    return unsubscribe;
  }, [chat._id, onNewMessage, socketMarkRead, onMessageSent]);

  /* ── Auto-scroll ── */
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  /* ── Close menu on outside click ── */
  useEffect(() => {
    const handle = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  /* ── Send message ── */
  const handleSendMessage = async () => {
    if (!newMessage.trim() || sending) return;

    const messageText = newMessage.trim();
    setSending(true);

    const tempMessage = {
      _id: `temp-${Date.now()}`,
      message: messageText,
      senderType: "user",
      read: false,
      delivered: false,
      createdAt: new Date(),
      sender: {
        _id: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
        profilePhoto: currentUser.profilePhoto,
        role: currentUser.role,
      },
    };

    setMessages((prev) => [...prev, tempMessage]);
    setNewMessage("");
    setShowEmojiPicker(false);

    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    try {
      const response = await chatService.sendMessage(chat._id, messageText);
      if (response.success) {
        setMessages((prev) =>
          prev.map((m) => (m._id === tempMessage._id ? response.data : m))
        );
        if (socketSendMessage && isConnected) {
          socketSendMessage(chat._id, messageText);
        }
        if (onMessageSent) onMessageSent();
      } else {
        setMessages((prev) => prev.filter((m) => m._id !== tempMessage._id));
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => prev.filter((m) => m._id !== tempMessage._id));
    } finally {
      setSending(false);
    }
  };

  /* ── Block / Unblock ── */
  const handleBlock = async () => {
    setBlockingUser(true);
    try {
      const response = await chatService.blockUser(chat._id);
      if (response.success) {
        alert(`${chatPartner?.name} has been blocked`);
        onClose();
      }
    } catch (error) {
      alert("Failed to block user");
    } finally {
      setBlockingUser(false);
      setShowBlockConfirm(false);
    }
  };

  const handleUnblock = async () => {
    setBlockingUser(true);
    try {
      const response = await chatService.unblockUser(chat._id);
      if (response.success) {
        alert(`${chatPartner?.name} has been unblocked`);
        window.location.reload();
      }
    } catch (error) {
      alert("Failed to unblock user");
    } finally {
      setBlockingUser(false);
      setShowUnblockConfirm(false);
    }
  };

  const onEmojiClick = (emojiObject) => {
    setNewMessage((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
    inputRef.current?.focus();
  };

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const formatDate = (date) => {
    const today = new Date();
    const d = new Date(date);
    if (d.toDateString() === today.toDateString()) return "Today";
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
    return d.toLocaleDateString([], { month: "long", day: "numeric" });
  };

  const isBlocked = chat.isBlocked;
  const iBlockedThem = isBlocked && chat.blockedBy === currentUser.id;

  /* ── Header avatar gradient ── */
  const headerGradient =
    chatPartner?.role === "support" || chatPartner?.role === "admin"
      ? "linear-gradient(135deg,#8B5CF6,#EC4899)"
      : "linear-gradient(135deg,#10B981,#059669)";

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3">
        <FaSpinner className="animate-spin text-blue-500" size={26} style={{ opacity: 0.7 }} />
        <p className="text-sm" style={{ color: "#9CA3AF" }}>Loading messages…</p>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col bg-white"
      style={
        isFullScreen
          ? { position: "fixed", inset: 0, zIndex: 200, borderRadius: 0 }
          : { height: "100%", borderRadius: 18 }
      }
    >
      {/* ── Header ── */}
      <div
        className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
        style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)" }}
      >
        <button
          onClick={onClose}
          className="flex items-center justify-center w-8 h-8 rounded-full transition-all"
          style={{ color: "rgba(255,255,255,.8)", background: "transparent" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,.15)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <FaArrowLeft size={14} />
        </button>

        {/* Avatar */}
        <div className="relative flex-shrink-0">
          {chatPartner?.image ? (
            <img
              src={chatPartner.image}
              alt={chatPartner.name}
              className="w-9 h-9 rounded-full object-cover"
              style={{ border: "2px solid rgba(255,255,255,.4)" }}
            />
          ) : (
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold"
              style={{ background: headerGradient, border: "2px solid rgba(255,255,255,.3)" }}
            >
              {chatPartner?.role === "support" ? (
                <FaHeadset size={14} />
              ) : (
                getInitials(chatPartner?.name || "")
              )}
            </div>
          )}
          <div
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
            style={{ background: "#4ADE80", borderColor: "#2563EB" }}
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold text-sm leading-tight truncate">
            {chatPartner?.name || "Loading…"}
          </p>
          <p className="text-[11px] mt-0.5 truncate" style={{ color: "rgba(255,255,255,.7)" }}>
            {chat.vehicleName ? (
              <span className="flex items-center gap-1">
                <FaCar size={9} /> {chat.vehicleName}
              </span>
            ) : chatPartner?.role === "support" || chatPartner?.role === "admin" ? (
              "Support Team · Always available"
            ) : (
              "Vehicle Owner"
            )}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="flex items-center justify-center w-8 h-8 rounded-full transition-all hidden md:flex"
            style={{ color: "rgba(255,255,255,.8)", background: "transparent" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,.15)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            title={isFullScreen ? "Exit full screen" : "Full screen"}
          >
            {isFullScreen ? <FaCompress size={13} /> : <FaExpand size={13} />}
          </button>

          {/* More menu */}
          {!isBlocked && (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center justify-center w-8 h-8 rounded-full transition-all"
                style={{ color: "rgba(255,255,255,.8)", background: "transparent" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,.15)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <FaEllipsisV size={13} />
              </button>
              {showMenu && (
                <div
                  className="absolute right-0 top-10 w-44 rounded-xl py-1 z-50"
                  style={{
                    background: "#fff",
                    boxShadow: "0 4px 20px rgba(0,0,0,.12), 0 0 0 1px rgba(0,0,0,.05)",
                  }}
                >
                  <button
                    onClick={() => { setShowMenu(false); setShowBlockConfirm(true); }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-left transition-colors"
                    style={{ color: "#EF4444" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#FEF2F2")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "")}
                  >
                    <FaBan size={13} /> Block user
                  </button>
                </div>
              )}
            </div>
          )}

          {isBlocked && iBlockedThem && (
            <button
              onClick={() => setShowUnblockConfirm(true)}
              className="flex items-center justify-center w-8 h-8 rounded-full transition-all"
              style={{ color: "rgba(255,255,255,.8)", background: "transparent" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,.15)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              title="Unblock user"
            >
              <FaUnlock size={13} />
            </button>
          )}
        </div>
      </div>

      {/* ── Messages ── */}
      <div
        className="flex-1 overflow-y-auto px-3 py-4 space-y-3"
        style={{ background: "#F8F9FB" }}
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center gap-3">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: "#F3F4F6" }}
            >
              <FaCar size={26} style={{ color: "#D1D5DB" }} />
            </div>
            <div>
              <p className="font-medium text-sm" style={{ color: "#374151" }}>No messages yet</p>
              <p className="text-xs mt-1" style={{ color: "#9CA3AF" }}>
                Start a conversation about{" "}
                {chat.vehicleName || "this vehicle"}
              </p>
            </div>
          </div>
        ) : (
          messages.map((message, index) => {
            const isOwn = message.sender?._id === currentUser.id;
            const showDate =
              index === 0 ||
              new Date(message.createdAt).toDateString() !==
                new Date(messages[index - 1]?.createdAt).toDateString();
            const isTemp = message._id?.toString().startsWith("temp-");

            return (
              <div key={message._id || index}>
                {showDate && (
                  <div className="flex items-center gap-2 my-3">
                    <div className="flex-1 h-px" style={{ background: "#E5E7EB" }} />
                    <span
                      className="text-[11px] px-3 py-1 rounded-full flex-shrink-0"
                      style={{ background: "#E5E7EB", color: "#6B7280" }}
                    >
                      {formatDate(message.createdAt)}
                    </span>
                    <div className="flex-1 h-px" style={{ background: "#E5E7EB" }} />
                  </div>
                )}

                <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
                  {/* Other user avatar */}
                  {!isOwn && (
                    <div className="flex-shrink-0 mr-2 self-end mb-1">
                      {chatPartner?.image ? (
                        <img
                          src={chatPartner.image}
                          alt=""
                          className="w-7 h-7 rounded-full object-cover"
                        />
                      ) : (
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[9px] font-semibold"
                          style={{ background: "linear-gradient(135deg,#8B5CF6,#EC4899)" }}
                        >
                          {getInitials(chatPartner?.name || "")}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="max-w-[72%]">
                    {/* Bubble */}
                    <div
                      className="px-3.5 py-2 text-[13px] leading-relaxed break-words"
                      style={
                        isOwn
                          ? {
                              background: "linear-gradient(135deg,#2563EB,#7C3AED)",
                              color: "#fff",
                              borderRadius: "14px 14px 4px 14px",
                              opacity: isTemp ? 0.75 : 1,
                            }
                          : {
                              background: "#fff",
                              color: "#111827",
                              borderRadius: "14px 14px 14px 4px",
                              border: "0.5px solid #E5E7EB",
                              boxShadow: "0 1px 3px rgba(0,0,0,.05)",
                            }
                      }
                    >
                      {message.message}
                    </div>

                    {/* Meta */}
                    <div
                      className={`flex items-center gap-1 mt-1 text-[10.5px] ${
                        isOwn ? "justify-end" : "justify-start"
                      }`}
                      style={{ color: "#9CA3AF" }}
                    >
                      <span>{formatTime(message.createdAt)}</span>
                      {isOwn && (
                        isTemp ? (
                          <FaSpinner className="animate-spin" size={10} />
                        ) : message.read ? (
                          <FaCheckDouble size={11} style={{ color: "#2563EB" }} title="Read" />
                        ) : message.delivered ? (
                          <FaCheckDouble size={11} title="Delivered" />
                        ) : (
                          <FaCheck size={10} title="Sent" />
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* ── Input Area ── */}
      <div
        className="flex-shrink-0 px-3 py-3"
        style={{ background: "#fff", borderTop: "1px solid #F3F4F6" }}
      >
        {!isConnected && (
          <p
            className="text-center text-[11px] mb-2 flex items-center justify-center gap-1.5"
            style={{ color: "#F59E0B" }}
          >
            <FaSpinner className="animate-spin" size={10} />
            Reconnecting to chat server…
          </p>
        )}

        {isBlocked && iBlockedThem ? (
          <div
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm"
            style={{ background: "#FEF2F2", border: "1px solid #FECACA", color: "#DC2626" }}
          >
            <FaBan size={14} className="flex-shrink-0" />
            <p className="flex-1 text-xs">
              You blocked this user.{" "}
              <button
                onClick={() => setShowUnblockConfirm(true)}
                className="underline font-medium"
              >
                Unblock to chat
              </button>
            </p>
          </div>
        ) : isBlocked ? (
          <div
            className="flex items-center gap-3 rounded-xl px-4 py-3"
            style={{ background: "#FFFBEB", border: "1px solid #FDE68A", color: "#92400E" }}
          >
            <FaBan size={14} className="flex-shrink-0" />
            <p className="text-xs">You cannot send messages in this conversation.</p>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {/* Emoji */}
            <div className="relative">
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all flex-shrink-0"
                style={{ color: "#9CA3AF", background: "transparent" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#F3F4F6";
                  e.currentTarget.style.color = "#6B7280";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#9CA3AF";
                }}
              >
                <FaSmile size={18} />
              </button>
              {showEmojiPicker && (
                <div className="absolute bottom-12 left-0 z-50">
                  <EmojiPicker onEmojiClick={onEmojiClick} />
                </div>
              )}
            </div>

            {/* Input */}
            <input
              ref={inputRef}
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type a message…"
              className="flex-1 text-sm outline-none"
              style={{
                background: "#F8F9FB",
                border: "1px solid #E5E7EB",
                borderRadius: 22,
                padding: "8px 16px",
                color: "#111827",
                fontFamily: "inherit",
                transition: "border .15s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#2563EB")}
              onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
            />

            {/* Attach */}
            <button
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all flex-shrink-0"
              style={{ color: "#9CA3AF", background: "transparent" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#F3F4F6";
                e.currentTarget.style.color = "#6B7280";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#9CA3AF";
              }}
            >
              <FaPaperclip size={16} />
            </button>

            {/* Send */}
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || sending}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all flex-shrink-0"
              style={{
                background:
                  newMessage.trim() && !sending
                    ? "linear-gradient(135deg,#2563EB,#7C3AED)"
                    : "#E5E7EB",
                color: newMessage.trim() && !sending ? "#fff" : "#9CA3AF",
                cursor: !newMessage.trim() || sending ? "not-allowed" : "pointer",
                boxShadow:
                  newMessage.trim() && !sending
                    ? "0 2px 10px rgba(37,99,235,.3)"
                    : "none",
              }}
            >
              {sending ? (
                <FaSpinner className="animate-spin" size={14} />
              ) : (
                <FaPaperPlane size={14} />
              )}
            </button>
          </div>
        )}
      </div>

      {/* ── Block Modal ── */}
      {showBlockConfirm && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,.4)", borderRadius: 18 }}
        >
          <div
            className="bg-white rounded-2xl p-6 w-72"
            style={{ boxShadow: "0 8px 32px rgba(0,0,0,.18)" }}
          >
            <div className="text-center mb-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3"
                style={{ background: "#FEF2F2" }}
              >
                <FaBan size={22} style={{ color: "#EF4444" }} />
              </div>
              <h3 className="font-semibold text-base" style={{ color: "#111827" }}>
                Block {chatPartner?.name}?
              </h3>
              <p className="text-xs mt-1.5 leading-relaxed" style={{ color: "#6B7280" }}>
                You will no longer receive messages from this user. You can unblock them anytime.
              </p>
            </div>
            <div className="flex gap-2.5">
              <button
                onClick={() => setShowBlockConfirm(false)}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{ border: "1px solid #E5E7EB", color: "#374151" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#F9FAFB")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "")}
              >
                Cancel
              </button>
              <button
                onClick={handleBlock}
                disabled={blockingUser}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                style={{ background: "#EF4444" }}
                onMouseEnter={(e) => { if (!blockingUser) e.currentTarget.style.background = "#DC2626"; }}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#EF4444")}
              >
                {blockingUser ? <FaSpinner className="animate-spin" size={13} /> : <FaBan size={13} />}
                {blockingUser ? "Blocking…" : "Block"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Unblock Modal ── */}
      {showUnblockConfirm && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,.4)", borderRadius: 18 }}
        >
          <div
            className="bg-white rounded-2xl p-6 w-72"
            style={{ boxShadow: "0 8px 32px rgba(0,0,0,.18)" }}
          >
            <div className="text-center mb-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3"
                style={{ background: "#ECFDF5" }}
              >
                <FaUnlock size={22} style={{ color: "#10B981" }} />
              </div>
              <h3 className="font-semibold text-base" style={{ color: "#111827" }}>
                Unblock {chatPartner?.name}?
              </h3>
              <p className="text-xs mt-1.5 leading-relaxed" style={{ color: "#6B7280" }}>
                They will be able to send you messages again.
              </p>
            </div>
            <div className="flex gap-2.5">
              <button
                onClick={() => setShowUnblockConfirm(false)}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{ border: "1px solid #E5E7EB", color: "#374151" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#F9FAFB")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "")}
              >
                Cancel
              </button>
              <button
                onClick={handleUnblock}
                disabled={blockingUser}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                style={{ background: "#10B981" }}
                onMouseEnter={(e) => { if (!blockingUser) e.currentTarget.style.background = "#059669"; }}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#10B981")}
              >
                {blockingUser ? <FaSpinner className="animate-spin" size={13} /> : <FaUnlock size={13} />}
                {blockingUser ? "Unblocking…" : "Unblock"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;