import api from "./api";

export const chatService = {
  // Get or create vehicle chat
  getVehicleChat: async (vehicleId, vehicleType) => {
    const response = await api.post("/chats/vehicle", { vehicleId, vehicleType });
    return response.data;
  },

  // Get or create support chat
  getSupportChat: async () => {
    const response = await api.post("/chats/support");
    return response.data;
  },

  // Get user's all chats
  getUserChats: async () => {
    const response = await api.get("/chats/my-chats");
    return response.data;
  },

  // Get chat by ID
  getChat: async (chatId) => {
    const response = await api.get(`/chats/${chatId}`);
    return response.data;
  },

  // Mark messages as read
  markAsRead: async (chatId) => {
    const response = await api.put(`/chats/${chatId}/read`);
    return response.data;
  },

  // Get unread count
  getUnreadCount: async () => {
    const response = await api.get("/chats/unread-count");
    return response.data;
  },

  // Close chat (admin only)
  closeChat: async (chatId) => {
    const response = await api.put(`/chats/${chatId}/close`);
    return response.data;
  },
};