import api from "./api";

export const chatService = {
  getVehicleChat: async (vehicleId, vehicleType) => {
    const response = await api.post("/chats/vehicle", { vehicleId, vehicleType });
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
  getUnreadCount: async () => {
    const response = await api.get("/chats/unread-count");
    return response.data;
  },
  closeChat: async (chatId) => {
    const response = await api.put(`/chats/${chatId}/close`);
    return response.data;
  },
};