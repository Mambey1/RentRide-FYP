// import React, { useState, useEffect } from "react";
// import { FaComments, FaTimes } from "react-icons/fa";
// import { useSocket } from "../../context/SocketContext";
// import { chatService } from "../../services/chatService";
// import ChatList from "./ChatList";
// import ChatWindow from "./ChatWindow";

// const ChatFloatingButton = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedChat, setSelectedChat] = useState(null);
//   const { unreadCount, resetUnreadCount, onNewMessageNotification } = useSocket();

//   useEffect(() => {
//     const fetchUnreadCount = async () => {
//       try {
//         const response = await chatService.getUnreadCount();
//         if (response.success && response.unreadCount > 0) {
//           resetUnreadCount?.();
//         }
//       } catch (error) {
//         console.error("Error fetching unread count:", error);
//       }
//     };
//     fetchUnreadCount();
//   }, []);

//   const handleSelectChat = (chat) => {
//     setSelectedChat(chat);
//     resetUnreadCount?.();
//   };

//   const handleCloseChat = () => {
//     setSelectedChat(null);
//   };

//   const handleOpenChat = () => {
//     setIsOpen(!isOpen);
//     if (selectedChat) {
//       setSelectedChat(null);
//     }
//   };

//   return (
//     <>
//       {/* Chat Button */}
//       <button
//         onClick={handleOpenChat}
//         className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
//       >
//         {isOpen ? (
//           <FaTimes size={24} />
//         ) : (
//           <div className="relative">
//             <FaComments size={24} />
//             {unreadCount > 0 && (
//               <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
//                 {unreadCount > 9 ? "9+" : unreadCount}
//               </span>
//             )}
//           </div>
//         )}
//       </button>

//       {/* Chat Panel */}
//       {isOpen && (
//         <div className="fixed bottom-24 right-6 z-50 w-96 h-[550px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
//           {selectedChat ? (
//             <ChatWindow
//               chat={selectedChat}
//               onClose={handleCloseChat}
//               onMessageSent={() => {
//                 resetUnreadCount?.();
//               }}
//             />
//           ) : (
//             <>
//               <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
//                 <h3 className="font-semibold">Messages</h3>
//                 <p className="text-xs text-white/80">Chat with vehicle owners and support</p>
//               </div>
//               <div className="flex-1 overflow-y-auto p-4">
//                 <ChatList onSelectChat={handleSelectChat} selectedChatId={selectedChat?._id} />
//               </div>
//             </>
//           )}
//         </div>
//       )}
//     </>
//   );
// };

// export default ChatFloatingButton;
