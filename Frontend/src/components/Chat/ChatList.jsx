// import React, { useState, useEffect } from "react";
// import { chatService } from "../../services/chatService";
// import { useSocket } from "../../context/SocketContext";
// import { FaComments, FaSpinner, FaUserCircle, FaCar, FaHeadset, FaClock } from "react-icons/fa";

// const ChatList = ({ onSelectChat, selectedChatId }) => {
//   const [chats, setChats] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { onNewMessageNotification, onNewMessage, socket } = useSocket();
//   const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

//   const loadChats = async () => {
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
//   };

//   useEffect(() => {
//     loadChats();
//   }, []);

//   // Listen for new messages to update chat list
//   useEffect(() => {
//     const unsubscribe = onNewMessage((data) => {
//       loadChats(); // Refresh chat list
//     });
//     return unsubscribe;
//   }, [onNewMessage]);

//   // Listen for notifications to refresh
//   useEffect(() => {
//     const unsubscribe = onNewMessageNotification((data) => {
//       loadChats();
//     });
//     return unsubscribe;
//   }, [onNewMessageNotification]);

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
//     <div className="space-y-2">
//       {chats.map((chat) => {
//         const otherUser = getOtherParticipant(chat);
//         const unreadCount = chat.unreadCounts?.get(currentUser.id) || 0;
        
//         return (
//           <div
//             key={chat._id}
//             onClick={() => onSelectChat(chat)}
//             className={`p-4 rounded-xl cursor-pointer transition-all ${
//               selectedChatId === chat._id
//                 ? "bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500"
//                 : "hover:bg-gray-50 border border-gray-100"
//             }`}
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
//                 {unreadCount > 0 && (
//                   <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
//                     {unreadCount > 9 ? "9+" : unreadCount}
//                   </span>
//                 )}
//               </div>
//               <div className="flex-1 min-w-0">
//                 <div className="flex justify-between items-start">
//                   <h4 className="font-semibold text-gray-900 truncate">
//                     {otherUser?.name || "Support Team"}
//                   </h4>
//                   <span className="text-xs text-gray-400 flex-shrink-0 ml-2 flex items-center gap-1">
//                     <FaClock size={10} />
//                     {formatTime(chat.lastMessageAt || chat.updatedAt)}
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-2 mt-1">
//                   {getChatIcon(chat)}
//                   <p className="text-sm text-gray-500 truncate flex-1">
//                     {chat.lastMessage || "Start a conversation"}
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