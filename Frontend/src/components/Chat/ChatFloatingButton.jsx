// import React, { useState, useEffect, useCallback } from "react";
// import { FaComments, FaTimes, FaSpinner, FaHeadset } from "react-icons/fa";
// import { useSocket } from "../../context/SocketContext";
// import { chatService } from "../../services/chatService";
// import ChatList from "./ChatList";
// import ChatWindow from "./ChatWindow";

// const ChatFloatingButton = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [localUnreadCount, setLocalUnreadCount] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [startingSupportChat, setStartingSupportChat] = useState(false);

//   const {
//     isConnected,
//     unreadCount: socketUnreadCount,
//     resetUnreadCount,
//     onNewMessageNotification = () => () => {},
//   } = useSocket();

//   // Update local unread count from socket
//   useEffect(() => {
//     setLocalUnreadCount(socketUnreadCount);
//   }, [socketUnreadCount]);

//   // Fetch unread count on mount
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

//   // Listen for new message notifications
//   useEffect(() => {
//     if (!onNewMessageNotification) return;

//     const unsubscribe = onNewMessageNotification((data) => {
//       console.log("New message notification received:", data);
//       setLocalUnreadCount((prev) => prev + 1);
//       fetchUnreadCount();
//     });
//     return unsubscribe;
//   }, [onNewMessageNotification, fetchUnreadCount]);

//   // Start a new support chat
//   const handleStartSupportChat = async () => {
//     setStartingSupportChat(true);
//     try {
//       const response = await chatService.getSupportChat();
//       if (response.success) {
//         setSelectedChat(response.data);
//         // Reset unread count for this chat
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

//   const handleCloseChat = () => {
//     setSelectedChat(null);
//   };

//   const handleOpenChat = () => {
//     setIsOpen(!isOpen);
//     if (selectedChat) {
//       setSelectedChat(null);
//     }
//     if (!isOpen) {
//       fetchUnreadCount();
//     }
//   };

//   // Don't render if user is not logged in
//   const token = localStorage.getItem("token");
//   if (!token) {
//     return null;
//   }

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
//             {localUnreadCount > 0 && (
//               <span className="absolute -top-2 -right-2 min-w-[20px] h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center px-1 animate-pulse">
//                 {localUnreadCount > 99 ? "99+" : localUnreadCount}
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
//                 fetchUnreadCount();
//                 if (resetUnreadCount) resetUnreadCount();
//               }}
//             />
//           ) : (
//             <>
//               <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex justify-between items-center">
//                 <div>
//                   <h3 className="font-semibold">Messages</h3>
//                   <p className="text-xs text-white/80">
//                     Chat with vehicle owners and support
//                   </p>
//                 </div>
//                 {!isConnected && (
//                   <FaSpinner className="animate-spin text-white" size={16} />
//                 )}
//               </div>

//               {/* Add Support Chat Button */}
//               <div className="p-3 border-b border-gray-100">
//                 <button
//                   onClick={handleStartSupportChat}
//                   disabled={startingSupportChat}
//                   className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50"
//                 >
//                   {startingSupportChat ? (
//                     <FaSpinner className="animate-spin" size={16} />
//                   ) : (
//                     <FaHeadset size={16} />
//                   )}
//                   <span>Chat with Support</span>
//                 </button>
//               </div>

//               <div className="flex-1 overflow-y-auto">
//                 <ChatList
//                   onSelectChat={handleSelectChat}
//                   selectedChatId={selectedChat?._id}
//                 />
//               </div>
//             </>
//           )}
//         </div>
//       )}
//     </>
//   );
// };

// export default ChatFloatingButton;




import React, { useState, useEffect, useCallback } from "react";
import { FaComments, FaTimes, FaSpinner, FaHeadset } from "react-icons/fa";
import { useSocket } from "../../context/SocketContext";
import { chatService } from "../../services/chatService";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";

const ChatFloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [localUnreadCount, setLocalUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [startingSupportChat, setStartingSupportChat] = useState(false);

  const {
    isConnected,
    unreadCount: socketUnreadCount,
    resetUnreadCount,
    onNewMessageNotification = () => () => {},
  } = useSocket();

  useEffect(() => {
    setLocalUnreadCount(socketUnreadCount);
  }, [socketUnreadCount]);

  const fetchUnreadCount = useCallback(async () => {
    try {
      const response = await chatService.getUnreadCount();
      if (response.success) {
        setLocalUnreadCount(response.unreadCount);
      }
    } catch (error) {
      console.error("Error fetching unread count:", error);
    }
  }, []);

  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, [fetchUnreadCount]);

  useEffect(() => {
    if (!onNewMessageNotification) return;
    const unsubscribe = onNewMessageNotification((data) => {
      setLocalUnreadCount((prev) => prev + 1);
      fetchUnreadCount();
    });
    return unsubscribe;
  }, [onNewMessageNotification, fetchUnreadCount]);

  const handleStartSupportChat = async () => {
    setStartingSupportChat(true);
    try {
      const response = await chatService.getSupportChat();
      if (response.success) {
        setSelectedChat(response.data);
        await chatService.markAsRead(response.data._id);
        if (resetUnreadCount) resetUnreadCount();
        fetchUnreadCount();
      }
    } catch (error) {
      console.error("Error starting support chat:", error);
      alert("Failed to start support chat. Please try again.");
    } finally {
      setStartingSupportChat(false);
    }
  };

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    if (resetUnreadCount) resetUnreadCount();
    setLocalUnreadCount(0);
  };

  const handleCloseChat = () => setSelectedChat(null);

  const handleOpenChat = () => {
    setIsOpen(!isOpen);
    if (selectedChat) setSelectedChat(null);
    if (!isOpen) fetchUnreadCount();
  };

  const token = localStorage.getItem("token");
  if (!token) return null;

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={handleOpenChat}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
        style={{
          background: isOpen
            ? "linear-gradient(135deg,#374151,#1f2937)"
            : "linear-gradient(135deg,#2563EB,#7C3AED)",
        }}
      >
        {isOpen ? (
          <FaTimes size={20} className="text-white" />
        ) : (
          <div className="relative">
            <FaComments size={22} className="text-white" />
            {localUnreadCount > 0 && (
              <span className="absolute -top-2.5 -right-2.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-semibold rounded-full flex items-center justify-center px-1 border-2 border-white animate-pulse">
                {localUnreadCount > 99 ? "99+" : localUnreadCount}
              </span>
            )}
          </div>
        )}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 flex flex-col overflow-hidden"
          style={{
            width: 360,
            height: 560,
            borderRadius: 18,
            boxShadow: "0 8px 40px rgba(0,0,0,.14), 0 0 0 1px rgba(0,0,0,.06)",
            background: "#fff",
          }}
        >
          {selectedChat ? (
            <ChatWindow
              chat={selectedChat}
              onClose={handleCloseChat}
              onMessageSent={() => {
                fetchUnreadCount();
                if (resetUnreadCount) resetUnreadCount();
              }}
            />
          ) : (
            <div className="flex flex-col h-full">
              {/* Panel Header */}
              <div
                className="flex-shrink-0 px-4 pb-3 pt-4"
                style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)" }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-white font-semibold text-[15px] leading-tight">
                      Messages
                    </h3>
                    <p className="text-white/70 text-[11.5px] mt-0.5">
                      Chat with owners &amp; support
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {!isConnected && (
                      <div className="flex items-center gap-1.5 bg-white/15 rounded-full px-2.5 py-1">
                        <FaSpinner className="animate-spin text-white/80" size={10} />
                        <span className="text-white/80 text-[10px]">Connecting</span>
                      </div>
                    )}
                    {localUnreadCount > 0 && (
                      <div className="bg-white/20 rounded-full px-2.5 py-1 text-white text-[11px] font-medium">
                        {localUnreadCount} unread
                      </div>
                    )}
                  </div>
                </div>

                {/* Support Button */}
                <button
                  onClick={handleStartSupportChat}
                  disabled={startingSupportChat}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-[13px] font-medium transition-all duration-200 disabled:opacity-50"
                  style={{
                    background: "rgba(255,255,255,.15)",
                    border: "1px solid rgba(255,255,255,.25)",
                    backdropFilter: "blur(8px)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(255,255,255,.25)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "rgba(255,255,255,.15)")
                  }
                >
                  {startingSupportChat ? (
                    <FaSpinner className="animate-spin" size={14} />
                  ) : (
                    <FaHeadset size={14} />
                  )}
                  Chat with Support
                </button>

                <p
                  className="text-[10.5px] mt-2.5 font-medium tracking-wide uppercase"
                  style={{ color: "rgba(255,255,255,.55)" }}
                >
                  Recent conversations
                </p>
              </div>

              {/* Chat List */}
              <div className="flex-1 overflow-y-auto">
                <ChatList
                  onSelectChat={handleSelectChat}
                  selectedChatId={selectedChat?._id}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ChatFloatingButton;