import api from './api';

export const adminAPI = {
  // User management
  getUsers: (params) => api.get('/users', { params }),
  getUser: (id) => api.get(`/users/${id}`),
  updateUser: (id, userData) => api.put(`/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/users/${id}`),
  getUserStats: (id) => api.get(`/users/${id}/stats`),
  
  // Platform analytics (you'll need to create these backend endpoints)
  getPlatformStats: () => api.get('/admin/stats'),
  getRevenueAnalytics: (params) => api.get('/admin/analytics/revenue', { params }),
};