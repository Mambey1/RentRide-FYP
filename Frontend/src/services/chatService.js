// // // // import api from "./api";

// // // // export const chatService = {
// // // //   getVehicleChat: async (vehicleId, vehicleType) => {
// // // //     const response = await api.post("/chats/vehicle", { vehicleId, vehicleType });
// // // //     return response.data;
// // // //   },
// // // //   getSupportChat: async () => {
// // // //     const response = await api.post("/chats/support");
// // // //     return response.data;
// // // //   },
// // // //   getUserChats: async () => {
// // // //     const response = await api.get("/chats/my-chats");
// // // //     return response.data;
// // // //   },
// // // //   getChat: async (chatId) => {
// // // //     const response = await api.get(`/chats/${chatId}`);
// // // //     return response.data;
// // // //   },
// // // //   markAsRead: async (chatId) => {
// // // //     const response = await api.put(`/chats/${chatId}/read`);
// // // //     return response.data;
// // // //   },
// // // //   getUnreadCount: async () => {
// // // //     const response = await api.get("/chats/unread-count");
// // // //     return response.data;
// // // //   },
// // // //   closeChat: async (chatId) => {
// // // //     const response = await api.put(`/chats/${chatId}/close`);
// // // //     return response.data;
// // // //   },
// // // // };

// // // import api from "./api";

// // // export const chatService = {
// // //   // ========== USER METHODS ==========

// // //   // Get or create vehicle chat
// // //   getVehicleChat: async (vehicleId, vehicleType) => {
// // //     const response = await api.post("/chats/vehicle", { vehicleId, vehicleType });
// // //     return response.data;
// // //   },

// // //   // Get or create support chat
// // //   getSupportChat: async () => {
// // //     const response = await api.post("/chats/support");
// // //     return response.data;
// // //   },

// // //   // Get all user's chats
// // //   getUserChats: async () => {
// // //     const response = await api.get("/chats/my-chats");
// // //     return response.data;
// // //   },

// // //   // Get specific chat by ID
// // //   getChat: async (chatId) => {
// // //     const response = await api.get(`/chats/${chatId}`);
// // //     return response.data;
// // //   },

// // //   // Mark messages as read in a chat
// // //   markAsRead: async (chatId) => {
// // //     const response = await api.put(`/chats/${chatId}/read`);
// // //     return response.data;
// // //   },

// // //   // Get total unread count for user
// // //   getUnreadCount: async () => {
// // //     const response = await api.get("/chats/unread-count");
// // //     return response.data;
// // //   },

// // //   // Close a chat (user)
// // //   closeChat: async (chatId) => {
// // //     const response = await api.put(`/chats/${chatId}/close`);
// // //     return response.data;
// // //   },

// // //   // Block user in chat (user blocks admin/owner)
// // //   blockUser: async (chatId) => {
// // //     const response = await api.put(`/chats/${chatId}/block`);
// // //     return response.data;
// // //   },

// // //   // Unblock user in chat
// // //   unblockUser: async (chatId) => {
// // //     const response = await api.put(`/chats/${chatId}/unblock`);
// // //     return response.data;
// // //   },

// // //   // ========== ADMIN METHODS ==========

// // //   // Get all chats for admin (with filters)
// // //   adminGetAllChats: async (filter = "all", search = "") => {
// // //     const response = await api.get(`/admin/chats?filter=${filter}&search=${search}`);
// // //     return response.data;
// // //   },

// // //   // Get specific chat for admin
// // //   adminGetChat: async (chatId) => {
// // //     const response = await api.get(`/admin/chats/${chatId}`);
// // //     return response.data;
// // //   },

// // //   // Send message as admin
// // //   adminSendMessage: async (chatId, message) => {
// // //     const response = await api.post(`/admin/chats/${chatId}/message`, { message });
// // //     return response.data;
// // //   },

// // //   // Mark messages as read (admin)
// // //   adminMarkAsRead: async (chatId) => {
// // //     const response = await api.put(`/admin/chats/${chatId}/read`);
// // //     return response.data;
// // //   },

// // //   // Block user (admin blocks user)
// // //   adminBlockUser: async (chatId) => {
// // //     const response = await api.put(`/admin/chats/${chatId}/block`);
// // //     return response.data;
// // //   },

// // //   // Unblock user (admin)
// // //   adminUnblockUser: async (chatId) => {
// // //     const response = await api.put(`/admin/chats/${chatId}/unblock`);
// // //     return response.data;
// // //   },

// // //   // Get total unread count for admin
// // //   adminGetUnreadCount: async () => {
// // //     const response = await api.get("/admin/chats/unread/count");
// // //     return response.data;
// // //   },

// // //   // ========== HELPER METHODS ==========

// // //   // Format time for display
// // //   formatTime: (date) => {
// // //     if (!date) return "";
// // //     const now = new Date();
// // //     const msgDate = new Date(date);
// // //     const diffMs = now - msgDate;
// // //     const diffMins = Math.floor(diffMs / 60000);
// // //     const diffHours = Math.floor(diffMs / 3600000);
// // //     const diffDays = Math.floor(diffMs / 86400000);

// // //     if (diffMins < 1) return "Just now";
// // //     if (diffMins < 60) return `${diffMins} min ago`;
// // //     if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
// // //     if (diffDays === 1) return "Yesterday";
// // //     if (diffDays < 7) return `${diffDays} days ago`;
// // //     return msgDate.toLocaleDateString();
// // //   },

// // //   // Format message time
// // //   formatMessageTime: (date) => {
// // //     return new Date(date).toLocaleTimeString([], {
// // //       hour: "2-digit",
// // //       minute: "2-digit",
// // //     });
// // //   },

// // //   // Get other participant in chat
// // //   getOtherParticipant: (chat, currentUserId) => {
// // //     if (!chat?.participants) return null;
// // //     const others = chat.participants.filter(p => p._id !== currentUserId);
// // //     return others[0] || null;
// // //   },

// // //   // Get chat display name
// // //   getChatDisplayName: (chat, currentUserId) => {
// // //     const other = chatService.getOtherParticipant(chat, currentUserId);
// // //     if (other) return other.name;
// // //     if (chat.chatType === "support") return "Support Team";
// // //     if (chat.vehicleName) return chat.vehicleName;
// // //     return "Chat";
// // //   },

// // //   // Get chat avatar
// // //   getChatAvatar: (chat, currentUserId) => {
// // //     const other = chatService.getOtherParticipant(chat, currentUserId);
// // //     if (other?.profilePhoto) {
// // //       return `http://localhost:5000/uploads/profiles/${other.profilePhoto}`;
// // //     }
// // //     return null;
// // //   },
// // // };

// // // export default chatService;

// // import api from "./api";

// // export const chatService = {
// //   // ========== USER METHODS ==========

// //   // Get or create vehicle chat
// //   getVehicleChat: async (vehicleId, vehicleType) => {
// //     const response = await api.post("/chats/vehicle", {
// //       vehicleId,
// //       vehicleType,
// //     });
// //     return response.data;
// //   },

// //   // Get or create support chat
// //   getSupportChat: async () => {
// //     const response = await api.post("/chats/support");
// //     return response.data;
// //   },

// //   // Get all user's chats
// //   getUserChats: async () => {
// //     const response = await api.get("/chats/my-chats");
// //     return response.data;
// //   },

// //   // Get specific chat by ID
// //   getChat: async (chatId) => {
// //     const response = await api.get(`/chats/${chatId}`);
// //     return response.data;
// //   },

// //   // Mark messages as read in a chat
// //   markAsRead: async (chatId) => {
// //     const response = await api.put(`/chats/${chatId}/read`);
// //     return response.data;
// //   },

// //   // Get total unread count for user
// //   getUnreadCount: async () => {
// //     const response = await api.get("/chats/unread-count");
// //     return response.data;
// //   },

// //   // Close a chat (user)
// //   closeChat: async (chatId) => {
// //     const response = await api.put(`/chats/${chatId}/close`);
// //     return response.data;
// //   },

// //   // Block user in chat (user blocks admin/owner)
// //   blockUser: async (chatId) => {
// //     const response = await api.put(`/chats/${chatId}/block`);
// //     return response.data;
// //   },

// //   // Unblock user in chat
// //   unblockUser: async (chatId) => {
// //     const response = await api.put(`/chats/${chatId}/unblock`);
// //     return response.data;
// //   },

// //   // Send message in chat
// //   sendMessage: async (chatId, message) => {
// //     const response = await api.post(`/chats/${chatId}/message`, { message });
// //     return response.data;
// //   },

// //   // ========== ADMIN METHODS ==========

// //   // Get all chats for admin (with filters)
// //   adminGetAllChats: async (filter = "all", search = "") => {
// //     const response = await api.get(
// //       `/admin/chats?filter=${filter}&search=${encodeURIComponent(search)}`,
// //     );
// //     return response.data;
// //   },

// //   // Get specific chat for admin
// //   adminGetChat: async (chatId) => {
// //     const response = await api.get(`/admin/chats/${chatId}`);
// //     return response.data;
// //   },

// //   // Send message as admin
// //   adminSendMessage: async (chatId, message) => {
// //     const response = await api.post(`/admin/chats/${chatId}/message`, {
// //       message,
// //     });
// //     return response.data;
// //   },

// //   // Mark messages as read (admin)
// //   adminMarkAsRead: async (chatId) => {
// //     const response = await api.put(`/admin/chats/${chatId}/read`);
// //     return response.data;
// //   },

// //   // Block user (admin blocks user)
// //   adminBlockUser: async (chatId) => {
// //     const response = await api.put(`/admin/chats/${chatId}/block`);
// //     return response.data;
// //   },

// //   // Unblock user (admin)
// //   adminUnblockUser: async (chatId) => {
// //     const response = await api.put(`/admin/chats/${chatId}/unblock`);
// //     return response.data;
// //   },

// //   // Get total unread count for admin
// //   adminGetUnreadCount: async () => {
// //     const response = await api.get("/admin/chats/unread/count");
// //     return response.data;
// //   },

// //   // ========== HELPER METHODS ==========

// //   // Format time for display
// //   formatTime: (date) => {
// //     if (!date) return "";
// //     const now = new Date();
// //     const msgDate = new Date(date);
// //     const diffMs = now - msgDate;
// //     const diffMins = Math.floor(diffMs / 60000);
// //     const diffHours = Math.floor(diffMs / 3600000);
// //     const diffDays = Math.floor(diffMs / 86400000);

// //     if (diffMins < 1) return "Just now";
// //     if (diffMins < 60) return `${diffMins} min ago`;
// //     if (diffHours < 24)
// //       return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
// //     if (diffDays === 1) return "Yesterday";
// //     if (diffDays < 7) return `${diffDays} days ago`;
// //     return msgDate.toLocaleDateString();
// //   },

// //   // Format message time
// //   formatMessageTime: (date) => {
// //     return new Date(date).toLocaleTimeString([], {
// //       hour: "2-digit",
// //       minute: "2-digit",
// //     });
// //   },

// //   // Get other participant in chat
// //   getOtherParticipant: (chat, currentUserId) => {
// //     if (!chat?.participants) return null;
// //     const others = chat.participants.filter((p) => p._id !== currentUserId);
// //     return others[0] || null;
// //   },

// //   // Get chat display name
// //   getChatDisplayName: (chat, currentUserId) => {
// //     const other = chatService.getOtherParticipant(chat, currentUserId);
// //     if (other) return other.name;
// //     if (chat.chatType === "support") return "Support Team";
// //     if (chat.vehicleName) return chat.vehicleName;
// //     return "Chat";
// //   },

// //   // Get chat avatar
// //   getChatAvatar: (chat, currentUserId) => {
// //     const other = chatService.getOtherParticipant(chat, currentUserId);
// //     if (other?.profilePhoto) {
// //       return `http://localhost:5000/uploads/profiles/${other.profilePhoto}`;
// //     }
// //     return null;
// //   },

// //   // Get unread count for a specific chat
// //   getUnreadCountForChat: (chat, currentUserId) => {
// //     return chat.unreadCounts?.[currentUserId] || 0;
// //   },

// //   // Get total unread count across all chats
// //   getTotalUnreadCount: (chats, currentUserId) => {
// //     return chats.reduce((total, chat) => {
// //       return total + (chat.unreadCounts?.[currentUserId] || 0);
// //     }, 0);
// //   },

// //   // Sort chats by last message time
// //   sortChatsByLastMessage: (chats) => {
// //     return [...chats].sort((a, b) => {
// //       const timeA = new Date(a.lastMessageAt || a.updatedAt);
// //       const timeB = new Date(b.lastMessageAt || b.updatedAt);
// //       return timeB - timeA;
// //     });
// //   },
// // };

// // export default chatService;
// import api from "./api";

// export const chatService = {
//   // ========== USER METHODS ==========
//   getVehicleChat: async (vehicleId, vehicleType) => {
//     const response = await api.post("/chats/vehicle", { vehicleId, vehicleType });
//     return response.data;
//   },

//   getSupportChat: async () => {
//     const response = await api.post("/chats/support");
//     return response.data;
//   },

//   getUserChats: async () => {
//     const response = await api.get("/chats/my-chats");
//     return response.data;
//   },

//   getChat: async (chatId) => {
//     const response = await api.get(`/chats/${chatId}`);
//     return response.data;
//   },

//   markAsRead: async (chatId) => {
//     const response = await api.put(`/chats/${chatId}/read`);
//     return response.data;
//   },

//   getUnreadCount: async () => {
//     const response = await api.get("/chats/unread-count");
//     return response.data;
//   },

//   closeChat: async (chatId) => {
//     const response = await api.put(`/chats/${chatId}/close`);
//     return response.data;
//   },

//   blockUser: async (chatId) => {
//     const response = await api.put(`/chats/${chatId}/block`);
//     return response.data;
//   },

//   unblockUser: async (chatId) => {
//     const response = await api.put(`/chats/${chatId}/unblock`);
//     return response.data;
//   },

//   sendMessage: async (chatId, message) => {
//     const response = await api.post(`/chats/${chatId}/message`, { message });
//     return response.data;
//   },

//   // ========== ADMIN METHODS ==========
//   adminGetAllChats: async (filter = "all", search = "") => {
//     const response = await api.get(`/admin/chats?filter=${filter}&search=${encodeURIComponent(search)}`);
//     return response.data;
//   },

//   adminGetChat: async (chatId) => {
//     const response = await api.get(`/admin/chats/${chatId}`);
//     return response.data;
//   },

//   adminSendMessage: async (chatId, message) => {
//     const response = await api.post(`/admin/chats/${chatId}/message`, { message });
//     return response.data;
//   },

//   adminMarkAsRead: async (chatId) => {
//     const response = await api.put(`/admin/chats/${chatId}/read`);
//     return response.data;
//   },

//   adminBlockUser: async (chatId) => {
//     const response = await api.put(`/admin/chats/${chatId}/block`);
//     return response.data;
//   },

//   adminUnblockUser: async (chatId) => {
//     const response = await api.put(`/admin/chats/${chatId}/unblock`);
//     return response.data;
//   },

//   adminGetUnreadCount: async () => {
//     const response = await api.get("/admin/chats/unread/count");
//     return response.data;
//   },
// };

import api from "./api";

export const chatService = {
  // ========== USER METHODS ==========

  getVehicleChat: async (vehicleId, vehicleType) => {
    const response = await api.post("/chats/vehicle", {
      vehicleId,
      vehicleType,
    });
    return response.data;
  },

  getSupportChat: async () => {
    const response = await api.post("/chats/support");
    return response.data;
  },

  getUserChats: async () => {
    const response = await api.get("/chats/my-chats");
    return response.data;
  },

  getChat: async (chatId) => {
    const response = await api.get(`/chats/${chatId}`);
    return response.data;
  },

  markAsRead: async (chatId) => {
    const response = await api.put(`/chats/${chatId}/read`);
    return response.data;
  },

  // Returns conversation count (not message count), excludes muted chats
  getUnreadCount: async () => {
    const response = await api.get("/chats/unread-count");
    return response.data;
  },

  closeChat: async (chatId) => {
    const response = await api.put(`/chats/${chatId}/close`);
    return response.data;
  },

  blockUser: async (chatId) => {
    const response = await api.put(`/chats/${chatId}/block`);
    return response.data;
  },

  unblockUser: async (chatId) => {
    const response = await api.put(`/chats/${chatId}/unblock`);
    return response.data;
  },

  // Send message — supports optional replyToId for reply feature
  sendMessage: async (chatId, message, replyToId = null) => {
    const response = await api.post(`/chats/${chatId}/message`, {
      message,
      ...(replyToId && { replyToId }),
    });
    return response.data;
  },

  // Send image attachment
  sendImage: async (chatId, file) => {
    const formData = new FormData();
    formData.append("image", file);
    const response = await api.post(`/chats/${chatId}/image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // Unsend a message — shows "This message was unsent" to everyone
  unsendMessage: async (chatId, messageId) => {
    const response = await api.delete(
      `/chats/${chatId}/message/${messageId}/unsend`,
    );
    return response.data;
  },

  // Delete a message only for the current user
  deleteMessageForMe: async (chatId, messageId) => {
    const response = await api.delete(`/chats/${chatId}/message/${messageId}`);
    return response.data;
  },

  // Delete entire conversation for the current user only
  deleteConversation: async (chatId) => {
    const response = await api.delete(`/chats/${chatId}/conversation`);
    return response.data;
  },

  // React to a message with an emoji (toggles — same emoji removes it)
  reactToMessage: async (chatId, messageId, emoji) => {
    const response = await api.post(
      `/chats/${chatId}/message/${messageId}/react`,
      { emoji },
    );
    return response.data;
  },

  // Toggle mute on a chat — returns { muted: true/false }
  muteChat: async (chatId) => {
    const response = await api.put(`/chats/${chatId}/mute`);
    return response.data;
  },

  // ========== ADMIN METHODS ==========

  adminGetAllChats: async (filter = "all", search = "") => {
    const response = await api.get(
      `/admin/chats?filter=${filter}&search=${encodeURIComponent(search)}`,
    );
    return response.data;
  },

  adminGetChat: async (chatId) => {
    const response = await api.get(`/admin/chats/${chatId}`);
    return response.data;
  },

  // Admin send message — supports optional replyToId
  adminSendMessage: async (chatId, message, replyToId = null) => {
    const response = await api.post(`/admin/chats/${chatId}/message`, {
      message,
      ...(replyToId && { replyToId }),
    });
    return response.data;
  },

  // Admin send image
  adminSendImage: async (chatId, file) => {
    const formData = new FormData();
    formData.append("image", file);
    const response = await api.post(`/admin/chats/${chatId}/image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  adminMarkAsRead: async (chatId) => {
    const response = await api.put(`/admin/chats/${chatId}/read`);
    return response.data;
  },

  adminBlockUser: async (chatId) => {
    const response = await api.put(`/admin/chats/${chatId}/block`);
    return response.data;
  },

  adminUnblockUser: async (chatId) => {
    const response = await api.put(`/admin/chats/${chatId}/unblock`);
    return response.data;
  },

  // Returns conversation count (not message count) for admin badge
  adminGetUnreadCount: async () => {
    const response = await api.get("/admin/chats/unread/count");
    return response.data;
  },

  // Admin unsend a message
  adminUnsendMessage: async (chatId, messageId) => {
    const response = await api.delete(
      `/admin/chats/${chatId}/message/${messageId}/unsend`,
    );
    return response.data;
  },

  // Admin delete message for themselves
  adminDeleteMessageForMe: async (chatId, messageId) => {
    const response = await api.delete(
      `/admin/chats/${chatId}/message/${messageId}`,
    );
    return response.data;
  },

  // Admin react to a message
  adminReactToMessage: async (chatId, messageId, emoji) => {
    const response = await api.post(
      `/admin/chats/${chatId}/message/${messageId}/react`,
      { emoji },
    );
    return response.data;
  },
};
