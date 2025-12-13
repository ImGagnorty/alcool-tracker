import api from './api';

export interface Alcohol {
  id: string;
  name: string;
  brand: string;
  type: string;
  alcoholRate: number;
  sugarRate?: number;
  price?: number;
  volume: number;
  imageUrl?: string;
  description?: string;
}

export interface AlcoholFilters {
  type?: string;
  brand?: string;
  minAlcoholRate?: number;
  maxAlcoholRate?: number;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  page?: number;
  limit?: number;
}

export const alcoholService = {
  getAll: async (filters?: AlcoholFilters) => {
    const response = await api.get('/alcohols', { params: filters });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/alcohols/${id}`);
    return response.data;
  },

  create: async (data: Omit<Alcohol, 'id' | 'createdAt' | 'updatedAt'>) => {
    const response = await api.post('/alcohols', data);
    return response.data;
  }
};

