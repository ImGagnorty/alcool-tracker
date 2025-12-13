import api from './api';

export interface Consumption {
  id: string;
  userId: string;
  alcoholId: string;
  quantity: number;
  date: string;
  barId?: string;
  photoUrl?: string;
  notes?: string;
  alcohol?: any;
  bar?: any;
}

export interface CreateConsumption {
  alcoholId: string;
  quantity: number;
  volumeConsumed?: number; // Volume réel consommé en mL
  format?: string; // Format choisi (ex: "Demi", "Pinte", "Shot 2cl")
  date?: string;
  barId?: string;
  photoUrl?: string;
  notes?: string;
}

export const consumptionService = {
  getAll: async (params?: {
    startDate?: string;
    endDate?: string;
    alcoholId?: string;
    page?: number;
    limit?: number;
  }) => {
    const response = await api.get('/consumptions', { params });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/consumptions/${id}`);
    return response.data;
  },

  create: async (data: CreateConsumption) => {
    const response = await api.post('/consumptions', data);
    return response.data;
  },

  update: async (id: string, data: Partial<CreateConsumption>) => {
    const response = await api.put(`/consumptions/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/consumptions/${id}`);
    return response.data;
  }
};

