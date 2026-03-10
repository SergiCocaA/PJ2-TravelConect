import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
});

// Interceptor para añadir el JWT automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Métodos para el Chat
export const getChatMessages = (tripId) => api.get(`/missatges/trips/${tripId}/chat`);
export const sendChatMessage = (tripId, data) => api.post(`/missatges/trips/${tripId}/chat/send`, data);

export default api;