import api from './api';

export const ordersAPI = {
  // For buyers
  getMyOrders: (params) => api.get('/orders/myorders', { params }),
  getOrder: (id) => api.get(`/orders/${id}`),
  createOrder: (orderData) => api.post('/orders', orderData),
  
  // For sellers
  getCooperativeOrders: (params) => api.get('/orders/cooperative/myorders', { params }),
  updateOrderStatus: (id, statusData) => api.put(`/orders/${id}/status`, statusData),
  
  // For admins
  getAllOrders: (params) => api.get('/orders', { params })
};