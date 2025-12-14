import axios from 'axios';

// Utiliser la variable d'environnement en production, ou le proxy en développement
// En production, VITE_API_URL doit être l'URL complète avec /api (ex: https://alcool-tracker.vercel.app/api)
// En développement, on utilise le proxy qui redirige /api vers localhost:3001
let API_URL = import.meta.env.VITE_API_URL || '/api';

// S'assurer que l'URL se termine par /api si c'est une URL complète
if (API_URL.startsWith('http') && !API_URL.endsWith('/api')) {
  API_URL = API_URL.endsWith('/') ? `${API_URL}api` : `${API_URL}/api`;
}

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

