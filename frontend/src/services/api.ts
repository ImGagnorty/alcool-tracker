import axios from 'axios';

// Utiliser la variable d'environnement en production, ou le proxy en développement
// En production, VITE_API_URL doit être l'URL complète du backend avec /api
// Exemple: https://alcool-tracker.vercel.app/api (backend)
// En développement, on utilise le proxy qui redirige /api vers localhost:3001
let API_URL = import.meta.env.VITE_API_URL;

// Si VITE_API_URL n'est pas défini en production, utiliser l'URL du backend par défaut
if (!API_URL) {
  if (import.meta.env.PROD) {
    // En production, pointer vers le backend Vercel
    API_URL = 'https://alcool-tracker.vercel.app/api';
  } else {
    // En développement, utiliser le proxy Vite
    API_URL = '/api';
  }
}

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

// Function to update token from storage
const updateTokenFromStorage = () => {
  const token = localStorage.getItem('auth-storage');
  if (token) {
    try {
      const parsed = JSON.parse(token);
      if (parsed.state?.token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${parsed.state.token}`;
        return parsed.state.token;
      }
    } catch (e) {
      // Ignore
    }
  }
  return null;
};

// Set initial token
updateTokenFromStorage();

// Request interceptor to ensure token is always up to date
api.interceptors.request.use(
  (config) => {
    // Only add token for API requests (not static files or auth routes)
    // Static files are served directly by Vercel and don't go through axios
    const isAuthRoute = config.url?.includes('/auth/login') || config.url?.includes('/auth/register');
    
    // Only add token for authenticated API routes
    if (!isAuthRoute && config.baseURL) {
      // Update token before each request
      const token = updateTokenFromStorage();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('auth-storage');
      delete api.defaults.headers.common['Authorization'];
      // Only redirect if we're not already on login/register page
      if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
        window.location.href = '/login';
      }
    } else if (error.response?.status === 403) {
      // Forbidden - usually means invalid/expired token or missing authentication
      const errorMessage = error.response?.data?.error || 'Forbidden';
      console.error('403 Forbidden:', error.config?.url, errorMessage);
      
      // Check if it's an authentication issue
      if (errorMessage.includes('token') || errorMessage.includes('Invalid') || errorMessage.includes('expired')) {
        // Token is invalid or expired - clear it and redirect to login
        localStorage.removeItem('auth-storage');
        delete api.defaults.headers.common['Authorization'];
        if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
          window.location.href = '/login';
        }
      } else {
        // Other 403 errors (CORS, permissions, etc.)
        const token = updateTokenFromStorage();
        if (!token && !window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
          // No token at all - redirect to login
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;

