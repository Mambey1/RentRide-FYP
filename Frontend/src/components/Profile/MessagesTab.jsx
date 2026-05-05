// import React, { useRef } from "react";
// import {
//   FaTimes,
//   FaSync,
//   FaSearch,
//   FaSpinner,
//   FaCommentDots,
//   FaComments,
//   FaHeadset,
//   FaBan,
//   FaVolumeMute,
//   FaVolumeUp,
//   FaTrash,
//   FaUnlock,
//   FaLock,
//   FaArrowLeft,
//   FaSmile,
//   FaImage,
//   FaPaperPlane,
//   FaReply,
//   FaInfoCircle,
// } from "react-icons/fa";
// import EmojiPicker from "emoji-picker-react";
// import MessageBubble from "./MessageBubble";
// // import { BASE } from "../../services/chatService";
// // import { BASE } from "../../services/api";
// const BASE = "http://localhost:5000";

// const MessagesTab = ({
//   // chat list
//   chats,
//   chatsLoading,
//   filteredChats,
//   chatSearch,
//   setChatSearch,
//   fetchUserChats,
//   getUnreadConversationCount,
//   getUnreadCountForChat,
//   getOtherParticipant,
//   getRoleDisplayForChat,
//   formatChatTime,
//   handleOpenChat,

//   // chat window
//   showChatWindow,
//   selectedChat,
//   handleCloseChat,
//   chatMessages,
//   chatMessagesLoading,
//   messagesEndRef,
//   user,
//   userRef,

//   // input
//   newChatMessage,
//   setNewChatMessage,
//   sendingMessage,
//   uploadingImage,
//   showEmojiPicker,
//   setShowEmojiPicker,
//   emojiPickerRef,
//   inputRef,
//   chatFileInputRef,
//   replyTo,
//   setReplyTo,
//   handleSendChatMessage,
//   handleImageUpload,
//   toggleEmojiPicker,
//   onEmojiClick,

//   // block / mute / delete
//   isConnected,
//   iBlockedThem,
//   handleMuteChat,
//   setShowDeleteConvConfirm,
//   setShowBlockConfirm,
//   setShowUnblockConfirm,

//   // message actions
//   handleUnsendMessage,
//   handleDeleteMessageForMe,
//   handleReactToMessage,

//   // support
//   handleStartSupportChat,
// }) => {
//   return (
//     <div className="flex h-[calc(100vh-180px)] rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-white">
//       {/* ─── Chat List ─── */}
//       <div
//         className={`${showChatWindow ? "hidden md:flex" : "flex"} flex-col md:w-[320px] w-full border-r border-gray-100 bg-white flex-shrink-0`}
//       >
//         {/* Header */}
//         <div className="px-4 pt-4 pb-3 border-b border-gray-100">
//           <div className="flex items-center justify-between mb-3">
//             <div>
//               <h2 className="text-base font-bold text-gray-900">Messages</h2>
//               <p className="text-xs text-gray-400">
//                 {chats.length} conversation{chats.length !== 1 ? "s" : ""}
//               </p>
//             </div>
//             <button
//               onClick={fetchUserChats}
//               title="Refresh"
//               className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-blue-500 transition"
//             >
//               <FaSync className={chatsLoading ? "animate-spin" : ""} size={13} />
//             </button>
//           </div>
//           <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
//             <FaSearch size={11} className="text-gray-400 flex-shrink-0" />
//             <input
//               type="text"
//               value={chatSearch}
//               onChange={(e) => setChatSearch(e.target.value)}
//               placeholder="Search conversations…"
//               className="flex-1 bg-transparent text-xs text-gray-700 placeholder-gray-400 focus:outline-none"
//             />
//             {chatSearch && (
//               <button onClick={() => setChatSearch("")} className="text-gray-400 hover:text-gray-600">
//                 <FaTimes size={10} />
//               </button>
//             )}
//           </div>
//         </div>

//         {/* List */}
//         <div className="flex-1 overflow-y-auto">
//           {chatsLoading ? (
//             <div className="flex justify-center items-center h-32">
//               <FaSpinner className="animate-spin text-blue-400 text-xl" />
//             </div>
//           ) : filteredChats.length === 0 ? (
//             <div className="flex flex-col items-center justify-center h-full py-16 text-center px-6">
//               <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-3">
//                 <FaCommentDots className="text-blue-300 text-2xl" />
//               </div>
//               <p className="text-sm font-medium text-gray-600">
//                 {chatSearch ? "No results found" : "No conversations yet"}
//               </p>
//               <p className="text-xs text-gray-400 mt-1">
//                 {chatSearch
//                   ? "Try a different search"
//                   : "Start a chat from any vehicle listing or click 'Contact Support'"}
//               </p>
//             </div>
//           ) : (
//             filteredChats.map((chat) => {
//               const other = getOtherParticipant(chat);
//               const unreadCnt = getUnreadCountForChat(chat);
//               const lastMsg = chat.lastMessage || "No messages yet";
//               const lastMsgTime = formatChatTime(chat.lastMessageAt || chat.updatedAt);
//               const isVehicleChat = chat.chatType === "vehicle";
//               const isSupportChatItem = chat.chatType === "support";
//               const isBlocked = chat.isBlocked;
//               const isMuted = chat.isMuted;
//               const isSelected = selectedChat?._id === chat._id && showChatWindow;
//               const roleDisplay = getRoleDisplayForChat(chat);

//               return (
//                 <div
//                   key={chat._id}
//                   onClick={() => handleOpenChat(chat)}
//                   className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all border-b border-gray-50 ${
//                     isSelected
//                       ? "bg-blue-50 border-l-[3px] border-l-blue-500"
//                       : "hover:bg-gray-50 border-l-[3px] border-l-transparent"
//                   } ${isBlocked ? "opacity-70" : ""}`}
//                 >
//                   <div className="relative flex-shrink-0">
//                     {isSupportChatItem ? (
//                       <div className="w-11 h-11 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-lg font-bold">
//                         <FaHeadset size={20} />
//                       </div>
//                     ) : other?.profilePhoto ? (
//                       <img
//                         src={`${BASE}/uploads/profiles/${other.profilePhoto}`}
//                         alt={other.name}
//                         className="w-11 h-11 rounded-full object-cover"
//                       />
//                     ) : (
//                       <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
//                         {other?.name?.charAt(0).toUpperCase() || "?"}
//                       </div>
//                     )}
//                     {unreadCnt > 0 && !isBlocked && !isMuted && (
//                       <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-0.5">
//                         {unreadCnt > 9 ? "9+" : unreadCnt}
//                       </span>
//                     )}
//                     {isBlocked && (
//                       <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center shadow-sm">
//                         <FaBan size={7} />
//                       </span>
//                     )}
//                     {isMuted && !isBlocked && (
//                       <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-gray-400 text-white rounded-full flex items-center justify-center shadow-sm">
//                         <FaVolumeMute size={7} />
//                       </span>
//                     )}
//                   </div>

//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-baseline justify-between gap-1">
//                       <span
//                         className={`text-sm font-semibold truncate ${unreadCnt > 0 && !isMuted ? "text-gray-900" : "text-gray-700"}`}
//                       >
//                         {isSupportChatItem ? "Support Team" : other?.name || "Unknown User"}
//                       </span>
//                       <span className="text-[10px] text-gray-400 flex-shrink-0">{lastMsgTime}</span>
//                     </div>
//                     <p
//                       className={`text-xs truncate mt-0.5 ${unreadCnt > 0 && !isBlocked && !isMuted ? "text-gray-800 font-medium" : "text-gray-400"}`}
//                     >
//                       {isBlocked ? "Conversation blocked" : lastMsg}
//                     </p>
//                     <div className="flex items-center gap-1.5 mt-1">
//                       <span
//                         className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold uppercase tracking-wide ${isSupportChatItem ? "bg-purple-50 text-purple-600" : isVehicleChat ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-600"}`}
//                       >
//                         {roleDisplay}
//                       </span>
//                       {chat.vehicleName && !isSupportChatItem && (
//                         <span className="text-[10px] text-gray-400 truncate">
//                           · {chat.vehicleName}
//                         </span>
//                       )}
//                       {isBlocked && (
//                         <span className="text-[9px] text-red-500 font-semibold uppercase tracking-wide">
//                           Blocked
//                         </span>
//                       )}
//                       {isMuted && (
//                         <span className="text-[9px] text-gray-400 font-semibold uppercase tracking-wide">
//                           Muted
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           )}
//         </div>

//         {/* Footer */}
//         <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
//           <span className="text-xs text-gray-500">
//             {chats.length} conversation{chats.length !== 1 ? "s" : ""}
//           </span>
//           {getUnreadConversationCount() > 0 && (
//             <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-full">
//               {getUnreadConversationCount()} unread
//             </span>
//           )}
//         </div>
//       </div>

//       {/* ─── Chat Window ─── */}
//       {showChatWindow && selectedChat ? (
//         <div className="flex-1 flex flex-col min-w-0">
//           {/* Chat header */}
//           <div className="px-5 py-3 bg-white border-b border-gray-100 flex items-center justify-between shadow-sm">
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={handleCloseChat}
//                 className="lg:hidden w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition"
//               >
//                 <FaArrowLeft size={14} />
//               </button>
//               {(() => {
//                 const other = getOtherParticipant(selectedChat);
//                 const isSupportChatWindow = selectedChat.chatType === "support";
//                 const roleText = getRoleDisplayForChat(selectedChat);
//                 return (
//                   <>
//                     {isSupportChatWindow ? (
//                       <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-lg font-bold">
//                         <FaHeadset size={18} />
//                       </div>
//                     ) : other?.profilePhoto ? (
//                       <img
//                         src={`${BASE}/uploads/profiles/${other.profilePhoto}`}
//                         alt={other.name}
//                         className="w-9 h-9 rounded-full object-cover"
//                       />
//                     ) : (
//                       <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
//                         {other?.name?.charAt(0).toUpperCase() || "?"}
//                       </div>
//                     )}
//                     <div>
//                       <div className="flex items-center gap-2">
//                         <p className="text-sm font-semibold text-gray-900 leading-tight">
//                           {isSupportChatWindow
//                             ? "Support Team"
//                             : other?.name || "Unknown User"}
//                         </p>
//                         {selectedChat.isBlocked && (
//                           <span className="inline-flex items-center gap-1 text-[10px] bg-red-50 text-red-500 border border-red-200 px-1.5 py-0.5 rounded-full font-semibold">
//                             <FaBan size={8} /> Blocked
//                           </span>
//                         )}
//                         {selectedChat.isMuted && (
//                           <span className="inline-flex items-center gap-1 text-[10px] bg-gray-50 text-gray-400 border border-gray-200 px-1.5 py-0.5 rounded-full font-semibold">
//                             <FaVolumeMute size={8} /> Muted
//                           </span>
//                         )}
//                       </div>
//                       <p className="text-xs text-gray-400">
//                         {roleText}
//                         {selectedChat.vehicleName && !isSupportChatWindow && (
//                           <span className="ml-1">· {selectedChat.vehicleName}</span>
//                         )}
//                         {isSupportChatWindow && <span className="ml-1">Available 24/7</span>}
//                       </p>
//                     </div>
//                   </>
//                 );
//               })()}
//             </div>

//             <div className="flex items-center gap-2">
//               <button
//                 onClick={handleMuteChat}
//                 className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500 hover:bg-gray-50 border border-gray-200 transition"
//                 title={selectedChat.isMuted ? "Unmute" : "Mute notifications"}
//               >
//                 {selectedChat.isMuted ? <FaVolumeUp size={11} /> : <FaVolumeMute size={11} />}
//               </button>
//               <button
//                 onClick={() => setShowDeleteConvConfirm(true)}
//                 className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500 hover:bg-gray-50 border border-gray-200 transition"
//                 title="Delete conversation"
//               >
//                 <FaTrash size={11} />
//               </button>
//               {!selectedChat.isBlocked ? (
//                 <button
//                   onClick={() => setShowBlockConfirm(true)}
//                   className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-500 hover:bg-red-50 border border-red-100 transition"
//                 >
//                   <FaBan size={11} /> Block
//                 </button>
//               ) : iBlockedThem ? (
//                 <button
//                   onClick={() => setShowUnblockConfirm(true)}
//                   className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-600 hover:bg-emerald-50 border border-emerald-200 transition"
//                 >
//                   <FaUnlock size={11} /> Unblock
//                 </button>
//               ) : null}
//             </div>
//           </div>

//           {/* Auto-delete notice */}
//           <div className="flex items-center gap-2 px-5 py-2 bg-amber-50 border-b border-amber-100">
//             <FaInfoCircle size={10} className="text-amber-500 flex-shrink-0" />
//             <p className="text-[9.5px] text-amber-600">
//               Messages are automatically deleted after <strong>3 days</strong> to protect storage
//               and privacy.
//             </p>
//           </div>

//           {/* Block banner */}
//           {selectedChat.isBlocked && (
//             <div
//               className={`flex items-center justify-between px-5 py-3 border-b ${
//                 iBlockedThem ? "bg-red-50 border-red-100" : "bg-amber-50 border-amber-100"
//               }`}
//             >
//               <div className="flex items-center gap-3">
//                 <div
//                   className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
//                     iBlockedThem ? "bg-red-100" : "bg-amber-100"
//                   }`}
//                 >
//                   <FaBan
//                     size={13}
//                     className={iBlockedThem ? "text-red-500" : "text-amber-500"}
//                   />
//                 </div>
//                 <div>
//                   <p
//                     className={`text-xs font-bold ${
//                       iBlockedThem ? "text-red-700" : "text-amber-700"
//                     }`}
//                   >
//                     {iBlockedThem
//                       ? `You blocked ${getOtherParticipant(selectedChat)?.name}`
//                       : "You can't message this user"}
//                   </p>
//                   <p
//                     className={`text-[11px] mt-0.5 ${
//                       iBlockedThem ? "text-red-500" : "text-amber-500"
//                     }`}
//                   >
//                     {iBlockedThem
//                       ? "They can't message you. Unblock to restore the conversation."
//                       : "This user has restricted messaging."}
//                   </p>
//                 </div>
//               </div>
//               {iBlockedThem && (
//                 <button
//                   onClick={() => setShowUnblockConfirm(true)}
//                   className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition ml-3 whitespace-nowrap"
//                 >
//                   <FaUnlock size={10} /> Unblock
//                 </button>
//               )}
//             </div>
//           )}

//           {/* Messages area */}
//           <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1 bg-gray-50">
//             {chatMessagesLoading ? (
//               <div className="flex justify-center items-center h-full">
//                 <FaSpinner className="animate-spin text-blue-400 text-2xl" />
//               </div>
//             ) : selectedChat.isBlocked && chatMessages.length === 0 ? (
//               <div className="flex flex-col items-center justify-center h-full text-center px-8">
//                 <div
//                   className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${
//                     iBlockedThem ? "bg-red-50" : "bg-amber-50"
//                   }`}
//                 >
//                   <FaLock
//                     size={28}
//                     className={iBlockedThem ? "text-red-300" : "text-amber-300"}
//                   />
//                 </div>
//                 <p className="text-sm font-bold text-gray-600">
//                   {iBlockedThem ? "Conversation blocked" : "Messaging unavailable"}
//                 </p>
//                 <p className="text-xs text-gray-400 mt-2 leading-relaxed max-w-xs">
//                   {iBlockedThem
//                     ? `You have blocked ${getOtherParticipant(selectedChat)?.name}. Unblock to restore the conversation.`
//                     : "This user has restricted messaging."}
//                 </p>
//                 {iBlockedThem && (
//                   <button
//                     onClick={() => setShowUnblockConfirm(true)}
//                     className="mt-5 flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition"
//                   >
//                     <FaUnlock size={12} /> Unblock {getOtherParticipant(selectedChat)?.name}
//                   </button>
//                 )}
//               </div>
//             ) : chatMessages.length === 0 ? (
//               <div className="flex flex-col items-center justify-center h-full text-center">
//                 <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-3">
//                   <FaCommentDots className="text-blue-300 text-2xl" />
//                 </div>
//                 <p className="text-sm font-medium text-gray-500">No messages yet</p>
//                 <p className="text-xs text-gray-400 mt-1">Say hello to start the conversation!</p>
//               </div>
//             ) : (
//               (() => {
//                 const groups = [];
//                 let lastDate = null;
//                 chatMessages.forEach((msg, idx) => {
//                   const msgDay = new Date(msg.createdAt).toDateString();
//                   if (msgDay !== lastDate) {
//                     groups.push({ type: "date", label: msgDay, key: `date-${idx}` });
//                     lastDate = msgDay;
//                   }
//                   groups.push({ type: "msg", msg, key: msg._id || idx });
//                 });
//                 return groups.map((item) => {
//                   if (item.type === "date") {
//                     const today = new Date().toDateString();
//                     const yesterday = new Date(Date.now() - 86400000).toDateString();
//                     const label =
//                       item.label === today
//                         ? "Today"
//                         : item.label === yesterday
//                         ? "Yesterday"
//                         : item.label;
//                     return (
//                       <div key={item.key} className="flex items-center gap-3 py-2">
//                         <div className="flex-1 h-px bg-gray-200" />
//                         <span className="text-[10px] text-gray-400 font-medium px-2.5 py-1 bg-white border border-gray-200 rounded-full whitespace-nowrap shadow-sm">
//                           {label}
//                         </span>
//                         <div className="flex-1 h-px bg-gray-200" />
//                       </div>
//                     );
//                   }
//                   const { msg } = item;
//                   const currentUserId = (
//                     userRef?.current?._id ||
//                     userRef?.current?.id ||
//                     user?._id ||
//                     user?.id ||
//                     (() => {
//                       try {
//                         const u = JSON.parse(
//                           localStorage.getItem("user") || sessionStorage.getItem("user") || "{}"
//                         );
//                         return u._id || u.id;
//                       } catch (e) {
//                         return null;
//                       }
//                     })()
//                   )?.toString();
//                   const senderId = (msg.sender?._id || msg.sender?.id || msg.sender)?.toString();
//                   const isOwn = !!(currentUserId && senderId && senderId === currentUserId);
//                   const other = getOtherParticipant(selectedChat);
//                   return (
//                     <MessageBubble
//                       key={item.key}
//                       msg={msg}
//                       isOwn={isOwn}
//                       user={user}
//                       otherParticipant={other}
//                       isSupportChat={selectedChat.chatType === "support"}
//                       onReply={setReplyTo}
//                       onUnsend={handleUnsendMessage}
//                       onDeleteForMe={handleDeleteMessageForMe}
//                       onReact={handleReactToMessage}
//                     />
//                   );
//                 });
//               })()
//             )}
//             <div ref={messagesEndRef} />
//           </div>

//           {/* Reply preview bar */}
//           {replyTo && (
//             <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border-t border-blue-100">
//               <FaReply size={11} className="text-blue-500 flex-shrink-0" />
//               <p className="flex-1 text-xs text-blue-700 truncate">
//                 Replying: {replyTo.isUnsent ? "Unsent message" : replyTo.message || "📷 Image"}
//               </p>
//               <button onClick={() => setReplyTo(null)} className="text-blue-400 hover:text-blue-600">
//                 <FaTimes size={12} />
//               </button>
//             </div>
//           )}

//           {/* Input area */}
//           <div className="px-4 py-3 bg-white border-t border-gray-100">
//             {!isConnected && (
//               <p className="text-[11px] text-center text-amber-500 mb-2">
//                 Reconnecting to chat server…
//               </p>
//             )}
//             {selectedChat.isBlocked ? (
//               <div
//                 className={`flex items-center gap-3 rounded-2xl px-4 py-3 ${
//                   iBlockedThem
//                     ? "bg-red-50 border border-red-100"
//                     : "bg-amber-50 border border-amber-100"
//                 }`}
//               >
//                 <FaLock size={14} className={iBlockedThem ? "text-red-400" : "text-amber-400"} />
//                 <p className={`text-xs flex-1 ${iBlockedThem ? "text-red-500" : "text-amber-600"}`}>
//                   {iBlockedThem ? (
//                     <>
//                       You blocked this user.{" "}
//                       <button
//                         onClick={() => setShowUnblockConfirm(true)}
//                         className="underline font-semibold hover:no-underline"
//                       >
//                         Unblock to chat
//                       </button>
//                     </>
//                   ) : (
//                     "You cannot send messages in this conversation."
//                   )}
//                 </p>
//               </div>
//             ) : (
//               <div className="relative">
//                 {/* Emoji Picker */}
//                 {showEmojiPicker && (
//                   <div ref={emojiPickerRef} className="absolute bottom-full mb-3 right-0 z-50">
//                     <div className="rounded-2xl shadow-2xl border border-gray-200 overflow-hidden bg-white">
//                       <div className="flex items-center justify-between px-3.5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600">
//                         <div className="flex items-center gap-2">
//                           <FaSmile size={13} className="text-white/80" />
//                           <span className="text-xs font-semibold text-white tracking-wide">
//                             Emoji
//                           </span>
//                         </div>
//                         <button
//                           onClick={() => setShowEmojiPicker(false)}
//                           className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 hover:bg-white/35 text-white transition-all duration-150 hover:scale-110"
//                         >
//                           <FaTimes size={9} />
//                         </button>
//                       </div>
//                       <EmojiPicker onEmojiClick={onEmojiClick} width={340} height={380} lazyLoad />
//                     </div>
//                   </div>
//                 )}

//                 {/* Input row */}
//                 <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-3 py-2">
//                   <button
//                     onClick={toggleEmojiPicker}
//                     className={`emoji-toggle-btn flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-150 ${
//                       showEmojiPicker
//                         ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md scale-105"
//                         : "text-gray-400 hover:text-blue-500 hover:bg-blue-50"
//                     }`}
//                   >
//                     <FaSmile size={16} />
//                   </button>
//                   <button
//                     onClick={() => chatFileInputRef.current?.click()}
//                     className="text-gray-400 hover:text-blue-500 transition flex-shrink-0"
//                     disabled={uploadingImage}
//                   >
//                     {uploadingImage ? (
//                       <FaSpinner className="animate-spin" size={18} />
//                     ) : (
//                       <FaImage size={18} />
//                     )}
//                   </button>
//                   <input
//                     type="file"
//                     ref={chatFileInputRef}
//                     className="hidden"
//                     accept="image/*"
//                     onChange={handleImageUpload}
//                   />
//                   <input
//                     ref={inputRef}
//                     type="text"
//                     value={newChatMessage}
//                     onChange={(e) => setNewChatMessage(e.target.value)}
//                     onKeyPress={(e) => e.key === "Enter" && handleSendChatMessage()}
//                     placeholder={replyTo ? "Type your reply…" : "Type a message…"}
//                     className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
//                   />
//                   <button
//                     onClick={handleSendChatMessage}
//                     disabled={(!newChatMessage.trim() && !uploadingImage) || sendingMessage}
//                     className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-md transition"
//                   >
//                     {sendingMessage ? (
//                       <FaSpinner className="animate-spin" size={13} />
//                     ) : (
//                       <FaPaperPlane size={13} />
//                     )}
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       ) : (
//         /* Empty state */
//         <div className="flex-1 hidden md:flex flex-col items-center justify-center bg-gray-50 text-center px-8">
//           <div className="w-20 h-20 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
//             <FaComments className="text-blue-300 text-3xl" />
//           </div>
//           <p className="text-base font-semibold text-gray-600">Select a conversation</p>
//           <p className="text-sm text-gray-400 mt-1">
//             Choose a chat from the left to start messaging
//           </p>
//           <button
//             onClick={handleStartSupportChat}
//             className="mt-4 flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
//           >
//             <FaHeadset /> Start Support Chat
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MessagesTab;



import React, { useRef, useState } from "react";
import {
  FaTimes,
  FaSync,
  FaSearch,
  FaSpinner,
  FaCommentDots,
  FaComments,
  FaHeadset,
  FaBan,
  FaVolumeMute,
  FaVolumeUp,
  FaTrash,
  FaUnlock,
  FaLock,
  FaArrowLeft,
  FaSmile,
  FaImage,
  FaPaperPlane,
  FaReply,
  FaInfoCircle,
  FaFlag,
} from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import MessageBubble from "./MessageBubble";
import ReportModal from "./ReportModal";
// import { BASE } from "../../services/chatService";
// import { BASE } from "../../services/api";
const BASE = "http://localhost:5000";

const MessagesTab = ({
  // chat list
  chats,
  chatsLoading,
  filteredChats,
  chatSearch,
  setChatSearch,
  fetchUserChats,
  getUnreadConversationCount,
  getUnreadCountForChat,
  getOtherParticipant,
  getRoleDisplayForChat,
  formatChatTime,
  handleOpenChat,

  // chat window
  showChatWindow,
  selectedChat,
  handleCloseChat,
  chatMessages,
  chatMessagesLoading,
  messagesEndRef,
  user,
  userRef,

  // input
  newChatMessage,
  setNewChatMessage,
  sendingMessage,
  uploadingImage,
  showEmojiPicker,
  setShowEmojiPicker,
  emojiPickerRef,
  inputRef,
  chatFileInputRef,
  replyTo,
  setReplyTo,
  handleSendChatMessage,
  handleImageUpload,
  toggleEmojiPicker,
  onEmojiClick,

  // block / mute / delete
  isConnected,
  iBlockedThem,
  handleMuteChat,
  setShowDeleteConvConfirm,
  setShowBlockConfirm,
  setShowUnblockConfirm,

  // message actions
  handleUnsendMessage,
  handleDeleteMessageForMe,
  handleReactToMessage,

  // support
  handleStartSupportChat,
}) => {
  const [showReportModal, setShowReportModal] = useState(false);
  return (
    <>
    <div className="flex h-[calc(100vh-180px)] rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-white">
      {/* ─── Chat List ─── */}
      <div
        className={`${showChatWindow ? "hidden md:flex" : "flex"} flex-col md:w-[320px] w-full border-r border-gray-100 bg-white flex-shrink-0`}
      >
        {/* Header */}
        <div className="px-4 pt-4 pb-3 border-b border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-base font-bold text-gray-900">Messages</h2>
              <p className="text-xs text-gray-400">
                {chats.length} conversation{chats.length !== 1 ? "s" : ""}
              </p>
            </div>
            <button
              onClick={fetchUserChats}
              title="Refresh"
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-blue-500 transition"
            >
              <FaSync className={chatsLoading ? "animate-spin" : ""} size={13} />
            </button>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
            <FaSearch size={11} className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={chatSearch}
              onChange={(e) => setChatSearch(e.target.value)}
              placeholder="Search conversations…"
              className="flex-1 bg-transparent text-xs text-gray-700 placeholder-gray-400 focus:outline-none"
            />
            {chatSearch && (
              <button onClick={() => setChatSearch("")} className="text-gray-400 hover:text-gray-600">
                <FaTimes size={10} />
              </button>
            )}
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {chatsLoading ? (
            <div className="flex justify-center items-center h-32">
              <FaSpinner className="animate-spin text-blue-400 text-xl" />
            </div>
          ) : filteredChats.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-16 text-center px-6">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-3">
                <FaCommentDots className="text-blue-300 text-2xl" />
              </div>
              <p className="text-sm font-medium text-gray-600">
                {chatSearch ? "No results found" : "No conversations yet"}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {chatSearch
                  ? "Try a different search"
                  : "Start a chat from any vehicle listing or click 'Contact Support'"}
              </p>
            </div>
          ) : (
            filteredChats.map((chat) => {
              const other = getOtherParticipant(chat);
              const unreadCnt = getUnreadCountForChat(chat);
              const lastMsg = chat.lastMessage || "No messages yet";
              const lastMsgTime = formatChatTime(chat.lastMessageAt || chat.updatedAt);
              const isVehicleChat = chat.chatType === "vehicle";
              const isSupportChatItem = chat.chatType === "support";
              const isBlocked = chat.isBlocked;
              const isMuted = chat.isMuted;
              const isSelected = selectedChat?._id === chat._id && showChatWindow;
              const roleDisplay = getRoleDisplayForChat(chat);

              return (
                <div
                  key={chat._id}
                  onClick={() => handleOpenChat(chat)}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all border-b border-gray-50 ${
                    isSelected
                      ? "bg-blue-50 border-l-[3px] border-l-blue-500"
                      : "hover:bg-gray-50 border-l-[3px] border-l-transparent"
                  } ${isBlocked ? "opacity-70" : ""}`}
                >
                  <div className="relative flex-shrink-0">
                    {isSupportChatItem ? (
                      <div className="w-11 h-11 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-lg font-bold">
                        <FaHeadset size={20} />
                      </div>
                    ) : other?.profilePhoto ? (
                      <img
                        src={`${BASE}/uploads/profiles/${other.profilePhoto}`}
                        alt={other.name}
                        className="w-11 h-11 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
                        {other?.name?.charAt(0).toUpperCase() || "?"}
                      </div>
                    )}
                    {unreadCnt > 0 && !isBlocked && !isMuted && (
                      <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-0.5">
                        {unreadCnt > 9 ? "9+" : unreadCnt}
                      </span>
                    )}
                    {isBlocked && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center shadow-sm">
                        <FaBan size={7} />
                      </span>
                    )}
                    {isMuted && !isBlocked && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-gray-400 text-white rounded-full flex items-center justify-center shadow-sm">
                        <FaVolumeMute size={7} />
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-1">
                      <span
                        className={`text-sm font-semibold truncate ${unreadCnt > 0 && !isMuted ? "text-gray-900" : "text-gray-700"}`}
                      >
                        {isSupportChatItem ? "Support Team" : other?.name || "Unknown User"}
                      </span>
                      <span className="text-[10px] text-gray-400 flex-shrink-0">{lastMsgTime}</span>
                    </div>
                    <p
                      className={`text-xs truncate mt-0.5 ${unreadCnt > 0 && !isBlocked && !isMuted ? "text-gray-800 font-medium" : "text-gray-400"}`}
                    >
                      {isBlocked ? "Conversation blocked" : lastMsg}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold uppercase tracking-wide ${isSupportChatItem ? "bg-purple-50 text-purple-600" : isVehicleChat ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-600"}`}
                      >
                        {roleDisplay}
                      </span>
                      {chat.vehicleName && !isSupportChatItem && (
                        <span className="text-[10px] text-gray-400 truncate">
                          · {chat.vehicleName}
                        </span>
                      )}
                      {isBlocked && (
                        <span className="text-[9px] text-red-500 font-semibold uppercase tracking-wide">
                          Blocked
                        </span>
                      )}
                      {isMuted && (
                        <span className="text-[9px] text-gray-400 font-semibold uppercase tracking-wide">
                          Muted
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {chats.length} conversation{chats.length !== 1 ? "s" : ""}
          </span>
          {getUnreadConversationCount() > 0 && (
            <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-full">
              {getUnreadConversationCount()} unread
            </span>
          )}
        </div>
      </div>

      {/* ─── Chat Window ─── */}
      {showChatWindow && selectedChat ? (
        <div className="flex-1 flex flex-col min-w-0">
          {/* Chat header */}
          <div className="px-5 py-3 bg-white border-b border-gray-100 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <button
                onClick={handleCloseChat}
                className="lg:hidden w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition"
              >
                <FaArrowLeft size={14} />
              </button>
              {(() => {
                const other = getOtherParticipant(selectedChat);
                const isSupportChatWindow = selectedChat.chatType === "support";
                const roleText = getRoleDisplayForChat(selectedChat);
                return (
                  <>
                    {isSupportChatWindow ? (
                      <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-lg font-bold">
                        <FaHeadset size={18} />
                      </div>
                    ) : other?.profilePhoto ? (
                      <img
                        src={`${BASE}/uploads/profiles/${other.profilePhoto}`}
                        alt={other.name}
                        className="w-9 h-9 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
                        {other?.name?.charAt(0).toUpperCase() || "?"}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-gray-900 leading-tight">
                          {isSupportChatWindow
                            ? "Support Team"
                            : other?.name || "Unknown User"}
                        </p>
                        {selectedChat.isBlocked && (
                          <span className="inline-flex items-center gap-1 text-[10px] bg-red-50 text-red-500 border border-red-200 px-1.5 py-0.5 rounded-full font-semibold">
                            <FaBan size={8} /> Blocked
                          </span>
                        )}
                        {selectedChat.isMuted && (
                          <span className="inline-flex items-center gap-1 text-[10px] bg-gray-50 text-gray-400 border border-gray-200 px-1.5 py-0.5 rounded-full font-semibold">
                            <FaVolumeMute size={8} /> Muted
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400">
                        {roleText}
                        {selectedChat.vehicleName && !isSupportChatWindow && (
                          <span className="ml-1">· {selectedChat.vehicleName}</span>
                        )}
                        {isSupportChatWindow && <span className="ml-1">Available 24/7</span>}
                      </p>
                    </div>
                  </>
                );
              })()}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleMuteChat}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500 hover:bg-gray-50 border border-gray-200 transition"
                title={selectedChat.isMuted ? "Unmute" : "Mute notifications"}
              >
                {selectedChat.isMuted ? <FaVolumeUp size={11} /> : <FaVolumeMute size={11} />}
              </button>
              <button
                onClick={() => setShowDeleteConvConfirm(true)}
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
              ) : iBlockedThem ? (
                <button
                  onClick={() => setShowUnblockConfirm(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-600 hover:bg-emerald-50 border border-emerald-200 transition"
                >
                  <FaUnlock size={11} /> Unblock
                </button>
              ) : null}
              {selectedChat.chatType !== "support" && (
                <button
                  onClick={() => setShowReportModal(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-orange-500 hover:bg-orange-50 border border-orange-100 transition"
                  title="Report this user"
                >
                  <FaFlag size={11} /> Report
                </button>
              )}
            </div>
          </div>

          {/* Auto-delete notice */}
          <div className="flex items-center gap-2 px-5 py-2 bg-amber-50 border-b border-amber-100">
            <FaInfoCircle size={10} className="text-amber-500 flex-shrink-0" />
            <p className="text-[9.5px] text-amber-600">
              Messages are automatically deleted after <strong>3 days</strong> to protect storage
              and privacy.
            </p>
          </div>

          {/* Block banner */}
          {selectedChat.isBlocked && (
            <div
              className={`flex items-center justify-between px-5 py-3 border-b ${
                iBlockedThem ? "bg-red-50 border-red-100" : "bg-amber-50 border-amber-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    iBlockedThem ? "bg-red-100" : "bg-amber-100"
                  }`}
                >
                  <FaBan
                    size={13}
                    className={iBlockedThem ? "text-red-500" : "text-amber-500"}
                  />
                </div>
                <div>
                  <p
                    className={`text-xs font-bold ${
                      iBlockedThem ? "text-red-700" : "text-amber-700"
                    }`}
                  >
                    {iBlockedThem
                      ? `You blocked ${getOtherParticipant(selectedChat)?.name}`
                      : "You can't message this user"}
                  </p>
                  <p
                    className={`text-[11px] mt-0.5 ${
                      iBlockedThem ? "text-red-500" : "text-amber-500"
                    }`}
                  >
                    {iBlockedThem
                      ? "They can't message you. Unblock to restore the conversation."
                      : "This user has restricted messaging."}
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
            {chatMessagesLoading ? (
              <div className="flex justify-center items-center h-full">
                <FaSpinner className="animate-spin text-blue-400 text-2xl" />
              </div>
            ) : selectedChat.isBlocked && chatMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-8">
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${
                    iBlockedThem ? "bg-red-50" : "bg-amber-50"
                  }`}
                >
                  <FaLock
                    size={28}
                    className={iBlockedThem ? "text-red-300" : "text-amber-300"}
                  />
                </div>
                <p className="text-sm font-bold text-gray-600">
                  {iBlockedThem ? "Conversation blocked" : "Messaging unavailable"}
                </p>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed max-w-xs">
                  {iBlockedThem
                    ? `You have blocked ${getOtherParticipant(selectedChat)?.name}. Unblock to restore the conversation.`
                    : "This user has restricted messaging."}
                </p>
                {iBlockedThem && (
                  <button
                    onClick={() => setShowUnblockConfirm(true)}
                    className="mt-5 flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition"
                  >
                    <FaUnlock size={12} /> Unblock {getOtherParticipant(selectedChat)?.name}
                  </button>
                )}
              </div>
            ) : chatMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-3">
                  <FaCommentDots className="text-blue-300 text-2xl" />
                </div>
                <p className="text-sm font-medium text-gray-500">No messages yet</p>
                <p className="text-xs text-gray-400 mt-1">Say hello to start the conversation!</p>
              </div>
            ) : (
              (() => {
                const groups = [];
                let lastDate = null;
                chatMessages.forEach((msg, idx) => {
                  const msgDay = new Date(msg.createdAt).toDateString();
                  if (msgDay !== lastDate) {
                    groups.push({ type: "date", label: msgDay, key: `date-${idx}` });
                    lastDate = msgDay;
                  }
                  groups.push({ type: "msg", msg, key: msg._id || idx });
                });
                return groups.map((item) => {
                  if (item.type === "date") {
                    const today = new Date().toDateString();
                    const yesterday = new Date(Date.now() - 86400000).toDateString();
                    const label =
                      item.label === today
                        ? "Today"
                        : item.label === yesterday
                        ? "Yesterday"
                        : item.label;
                    return (
                      <div key={item.key} className="flex items-center gap-3 py-2">
                        <div className="flex-1 h-px bg-gray-200" />
                        <span className="text-[10px] text-gray-400 font-medium px-2.5 py-1 bg-white border border-gray-200 rounded-full whitespace-nowrap shadow-sm">
                          {label}
                        </span>
                        <div className="flex-1 h-px bg-gray-200" />
                      </div>
                    );
                  }
                  const { msg } = item;
                  const currentUserId = (
                    userRef?.current?._id ||
                    userRef?.current?.id ||
                    user?._id ||
                    user?.id ||
                    (() => {
                      try {
                        const u = JSON.parse(
                          localStorage.getItem("user") || sessionStorage.getItem("user") || "{}"
                        );
                        return u._id || u.id;
                      } catch (e) {
                        return null;
                      }
                    })()
                  )?.toString();
                  const senderId = (msg.sender?._id || msg.sender?.id || msg.sender)?.toString();
                  const isOwn = !!(currentUserId && senderId && senderId === currentUserId);
                  const other = getOtherParticipant(selectedChat);
                  return (
                    <MessageBubble
                      key={item.key}
                      msg={msg}
                      isOwn={isOwn}
                      user={user}
                      otherParticipant={other}
                      isSupportChat={selectedChat.chatType === "support"}
                      onReply={setReplyTo}
                      onUnsend={handleUnsendMessage}
                      onDeleteForMe={handleDeleteMessageForMe}
                      onReact={handleReactToMessage}
                    />
                  );
                });
              })()
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Reply preview bar */}
          {replyTo && (
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border-t border-blue-100">
              <FaReply size={11} className="text-blue-500 flex-shrink-0" />
              <p className="flex-1 text-xs text-blue-700 truncate">
                Replying: {replyTo.isUnsent ? "Unsent message" : replyTo.message || "📷 Image"}
              </p>
              <button onClick={() => setReplyTo(null)} className="text-blue-400 hover:text-blue-600">
                <FaTimes size={12} />
              </button>
            </div>
          )}

          {/* Input area */}
          <div className="px-4 py-3 bg-white border-t border-gray-100">
            {!isConnected && (
              <p className="text-[11px] text-center text-amber-500 mb-2">
                Reconnecting to chat server…
              </p>
            )}
            {selectedChat.isBlocked ? (
              <div
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 ${
                  iBlockedThem
                    ? "bg-red-50 border border-red-100"
                    : "bg-amber-50 border border-amber-100"
                }`}
              >
                <FaLock size={14} className={iBlockedThem ? "text-red-400" : "text-amber-400"} />
                <p className={`text-xs flex-1 ${iBlockedThem ? "text-red-500" : "text-amber-600"}`}>
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
              <div className="relative">
                {/* Emoji Picker */}
                {showEmojiPicker && (
                  <div ref={emojiPickerRef} className="absolute bottom-full mb-3 right-0 z-50">
                    <div className="rounded-2xl shadow-2xl border border-gray-200 overflow-hidden bg-white">
                      <div className="flex items-center justify-between px-3.5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600">
                        <div className="flex items-center gap-2">
                          <FaSmile size={13} className="text-white/80" />
                          <span className="text-xs font-semibold text-white tracking-wide">
                            Emoji
                          </span>
                        </div>
                        <button
                          onClick={() => setShowEmojiPicker(false)}
                          className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 hover:bg-white/35 text-white transition-all duration-150 hover:scale-110"
                        >
                          <FaTimes size={9} />
                        </button>
                      </div>
                      <EmojiPicker onEmojiClick={onEmojiClick} width={340} height={380} lazyLoad />
                    </div>
                  </div>
                )}

                {/* Input row */}
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-3 py-2">
                  <button
                    onClick={toggleEmojiPicker}
                    className={`emoji-toggle-btn flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-150 ${
                      showEmojiPicker
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md scale-105"
                        : "text-gray-400 hover:text-blue-500 hover:bg-blue-50"
                    }`}
                  >
                    <FaSmile size={16} />
                  </button>
                  <button
                    onClick={() => chatFileInputRef.current?.click()}
                    className="text-gray-400 hover:text-blue-500 transition flex-shrink-0"
                    disabled={uploadingImage}
                  >
                    {uploadingImage ? (
                      <FaSpinner className="animate-spin" size={18} />
                    ) : (
                      <FaImage size={18} />
                    )}
                  </button>
                  <input
                    type="file"
                    ref={chatFileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  <input
                    ref={inputRef}
                    type="text"
                    value={newChatMessage}
                    onChange={(e) => setNewChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendChatMessage()}
                    placeholder={replyTo ? "Type your reply…" : "Type a message…"}
                    className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
                  />
                  <button
                    onClick={handleSendChatMessage}
                    disabled={(!newChatMessage.trim() && !uploadingImage) || sendingMessage}
                    className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-md transition"
                  >
                    {sendingMessage ? (
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
        /* Empty state */
        <div className="flex-1 hidden md:flex flex-col items-center justify-center bg-gray-50 text-center px-8">
          <div className="w-20 h-20 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
            <FaComments className="text-blue-300 text-3xl" />
          </div>
          <p className="text-base font-semibold text-gray-600">Select a conversation</p>
          <p className="text-sm text-gray-400 mt-1">
            Choose a chat from the left to start messaging
          </p>
          <button
            onClick={handleStartSupportChat}
            className="mt-4 flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            <FaHeadset /> Start Support Chat
          </button>
        </div>
      )}
    </div>
    {/* Report Modal */}
    {showChatWindow && selectedChat && (
      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        reportedUser={getOtherParticipant(selectedChat)}
        reportedBy={user}
      />
    )}
    </>
  );
};

export default MessagesTab;