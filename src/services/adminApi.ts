import axios from "axios";

// Backend API base URL - same as main API service
const API_BASE_URL = "http://34.134.72.176:3001/api";

// Create axios instance with admin token
const createAdminApi = (token: string) => {
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const adminAPI = {
  // Admin login
  login: async (username: string, password: string) => {
    const response = await axios.post(`${API_BASE_URL}/auth/admin-login`, {
      username,
      password,
    });
    return response.data;
  },

  // Get dashboard data
  getDashboard: async (token: string) => {
    const api = createAdminApi(token);
    const response = await api.get("/admin/dashboard");
    return response.data;
  },

  // Confirm reservation
  confirmReservation: async (token: string, groupId: string) => {
    const api = createAdminApi(token);
    const response = await api.post(`/admin/reservation/${groupId}/confirm`);
    return response.data;
  },

  // Cancel reservation
  cancelReservation: async (token: string, groupId: string) => {
    const api = createAdminApi(token);
    const response = await api.post(`/admin/reservation/${groupId}/cancel`);
    return response.data;
  },

  // Clear order (mark as handled)
  clearOrder: async (token: string, orderId: string) => {
    const api = createAdminApi(token);
    const response = await api.post(`/admin/order/${orderId}/clear`);
    return response.data;
  },

  // Get all tables
  getTables: async (token: string) => {
    const api = createAdminApi(token);
    const response = await api.get("/admin/tables");
    return response.data;
  },

  // Update table status
  updateTableStatus: async (
    token: string,
    tableId: string,
    status: string,
    currentGuests?: number
  ) => {
    const api = createAdminApi(token);
    const response = await api.put(`/admin/table/${tableId}/status`, {
      status,
      currentGuests,
    });
    return response.data;
  },
};

export default adminAPI;
