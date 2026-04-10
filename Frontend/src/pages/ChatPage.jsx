// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { chatService } from "../services/chatService";
// import ChatWindow from "../components/Chat/ChatWindow";
// import ChatList from "../components/Chat/ChatList";
// import { FaArrowLeft } from "react-icons/fa";

// const ChatPage = () => {
//   const { chatId } = useParams();
//   const navigate = useNavigate();
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [chats, setChats] = useState([]);

//   useEffect(() => {
//     if (chatId) {
//       loadChat(chatId);
//     }
//     loadChats();
//   }, [chatId]);

//   const loadChat = async (id) => {
//     try {
//       const response = await chatService.getChat(id);
//       if (response.success) {
//         setSelectedChat(response.data);
//       }
//     } catch (error) {
//       console.error("Error loading chat:", error);
//     }
//   };

//   const loadChats = async () => {
//     try {
//       const response = await chatService.getUserChats();
//       if (response.success) {
//         setChats(response.data);
//       }
//     } catch (error) {
//       console.error("Error loading chats:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="container mx-auto px-4 py-8">
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-[80vh] flex">
//           {/* Sidebar */}
//           <div className="w-80 border-r border-gray-200 flex flex-col">
//             <div className="p-4 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white">
//               <button onClick={() => navigate(-1)} className="mr-4">
//                 <FaArrowLeft />
//               </button>
//               <h2 className="text-lg font-semibold inline">Messages</h2>
//             </div>
//             <div className="flex-1 overflow-y-auto">
//               <ChatList onSelectChat={setSelectedChat} selectedChatId={selectedChat?._id} />
//             </div>
//           </div>

//           {/* Chat Window */}
//           <div className="flex-1">
//             {selectedChat ? (
//               <ChatWindow
//                 chat={selectedChat}
//                 onClose={() => setSelectedChat(null)}
//                 onMessageSent={loadChats}
//               />
//             ) : (
//               <div className="flex items-center justify-center h-full text-gray-500">
//                 Select a conversation to start messaging
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { chatService } from "../services/chatService";
import ChatWindow from "../components/Chat/ChatWindow";
import ChatList from "../components/Chat/ChatList";
import { FaArrowLeft, FaComments } from "react-icons/fa";

const ChatPage = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (chatId) {
      loadChat(chatId);
    }
    loadChats();
  }, [chatId]);

  const loadChat = async (id) => {
    try {
      const response = await chatService.getChat(id);
      if (response.success) {
        setSelectedChat(response.data);
      }
    } catch (error) {
      console.error("Error loading chat:", error);
    }
  };

  const loadChats = async () => {
    setLoading(true);
    try {
      const response = await chatService.getUserChats();
      if (response.success) {
        setChats(response.data);
      }
    } catch (error) {
      console.error("Error loading chats:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-[85vh] flex">
          {/* Sidebar */}
          <div className="w-80 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <div className="flex items-center">
                <button
                  onClick={() => navigate(-1)}
                  className="mr-4 hover:bg-white/20 p-2 rounded-full transition"
                >
                  <FaArrowLeft />
                </button>
                <div>
                  <h2 className="text-lg font-semibold">Messages</h2>
                  <p className="text-xs text-white/80">
                    Chat with vehicle owners and support
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <ChatList
                  onSelectChat={setSelectedChat}
                  selectedChatId={selectedChat?._id}
                />
              )}
            </div>
          </div>

          {/* Chat Window */}
          <div className="flex-1">
            {selectedChat ? (
              <ChatWindow
                chat={selectedChat}
                onClose={() => setSelectedChat(null)}
                onMessageSent={loadChats}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <FaComments className="text-6xl text-gray-300 mb-4" />
                <p className="text-lg font-medium">Select a conversation</p>
                <p className="text-sm">
                  Choose a chat from the sidebar to start messaging
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
