import api from './api';

export interface Statistics {
  period: string;
  summary: {
    totalConsumptions: number;
    standardDrinks: number;
    totalVolumeLiters: number;
    totalAlcoholGrams?: number;
    totalAlcohol?: number;
    totalSugarGrams?: number;
    totalSpent: number;
    averageAlcoholRate: number;
  };
  byType: Record<string, {
    count: number;
    volume: number;
    alcohol: number;
    spent: number;
  }>;
  health: {
    riskLevel: 'low' | 'moderate' | 'high';
    weeklyAverage: number;
  };
}

export interface MostConsumedAlcohol {
  id: string;
  name: string;
  brand: string;
  type: string;
  alcoholRate: number;
  sugarRate?: number;
  price?: number;
  volume: number;
  consumptionCount: number;
}

export const statisticsService = {
  getStatistics: async (period: 'all' | 'year' | 'month' | 'week' | 'day' = 'all') => {
    const response = await api.get<Statistics>('/statistics', {
      params: { period }
    });
    return response.data;
  },

  getTimeline: async (period: 'week' | 'month' | 'year' = 'month', groupBy: 'day' | 'week' | 'month' = 'day') => {
    const response = await api.get('/statistics/timeline', {
      params: { period, groupBy }
    });
    return response.data;
  },

  getMostConsumed: async (limit: number = 5) => {
    const response = await api.get<{ alcohols: MostConsumedAlcohol[] }>('/statistics/most-consumed', {
      params: { limit }
    });
    return response.data.alcohols;
  }
};
