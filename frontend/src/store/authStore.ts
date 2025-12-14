import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../services/api';

interface User {
  id: string;
  email: string;
  name?: string;
  isPremium: boolean;
  premiumUntil?: string;
  blurUsername?: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => {
        set({ user, token });
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // Also update localStorage directly to ensure sync
        const storage = localStorage.getItem('auth-storage');
        if (storage) {
          try {
            const parsed = JSON.parse(storage);
            parsed.state = { ...parsed.state, user, token };
            localStorage.setItem('auth-storage', JSON.stringify(parsed));
          } catch (e) {
            // Ignore
          }
        }
      },
      logout: () => {
        set({ user: null, token: null });
        delete api.defaults.headers.common['Authorization'];
        localStorage.removeItem('auth-storage');
      },
      updateUser: (updates) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null
        }));
      }
    }),
    {
      name: 'auth-storage',
      // Sync token to API headers when store is rehydrated
      onRehydrateStorage: () => {
        return (state) => {
          if (state?.token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
          }
        };
      }
    }
  )
);

