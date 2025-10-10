import api from './api';

export const cooperativesAPI = {
  getAllCooperatives: (params) => api.get('/cooperatives', { params }),
  getCooperative: (id) => api.get(`/cooperatives/${id}`),
  createCooperative: (data) => api.post('/cooperatives', data),
  updateCooperative: (id, data) => api.put(`/cooperatives/${id}`, data),
  deleteCooperative: (id) => api.delete(`/cooperatives/${id}`)
};