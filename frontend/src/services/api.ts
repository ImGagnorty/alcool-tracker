import axios from 'axios';

// Utiliser la variable d'environnement en production, ou le proxy en développement
const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token from storage if available
const token = localStorage.getItem('auth-storage');
if (token) {
  try {
    const parsed = JSON.parse(token);
    if (parsed.state?.token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${parsed.state.token}`;
    }
  } catch (e) {
    // Ignore
  }
}

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('auth-storage');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

