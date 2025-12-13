import api from './api';
import { Alcohol } from './alcoholService';

export interface Favorite {
  id: string;
  userId: string;
  alcoholId: string;
  alcohol: Alcohol;
  createdAt: string;
}

export const favoriteService = {
  getAll: async (): Promise<Favorite[]> => {
    const response = await api.get<Favorite[]>('/favorites');
    return response.data;
  },

  add: async (alcoholId: string): Promise<Alcohol> => {
    const response = await api.post(`/favorites/${alcoholId}`);
    return response.data;
  },

  remove: async (alcoholId: string): Promise<void> => {
    await api.delete(`/favorites/${alcoholId}`);
  },

  check: async (alcoholId: string): Promise<boolean> => {
    const response = await api.get(`/favorites/${alcoholId}/check`);
    return response.data.isFavorite;
  }
};

