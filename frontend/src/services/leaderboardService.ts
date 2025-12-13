import api from './api';

export interface LeaderboardEntry {
  userId: string;
  name: string | null;
  blurUsername: boolean;
  volume: number;
  spent: number;
  consumptions: number;
}

export interface LeaderboardResponse {
  period: 'week' | 'month' | 'year';
  type: 'volume' | 'spent' | 'consumptions';
  leaderboard: LeaderboardEntry[];
}

export interface ClanLeaderboardEntry {
  clanId: string;
  clanName: string;
  volume: number;
  spent: number;
  consumptions: number;
}

export interface ClanLeaderboardResponse {
  period: 'week' | 'month' | 'year';
  type: 'volume' | 'spent' | 'consumptions';
  leaderboard: ClanLeaderboardEntry[];
}

export const leaderboardService = {
  getLeaderboard: async (period: 'week' | 'month' | 'year' = 'month', type: 'volume' | 'spent' | 'consumptions' = 'volume') => {
    const response = await api.get<LeaderboardResponse>('/leaderboard', {
      params: { period, type }
    });
    return response.data;
  },

  getClansLeaderboard: async (period: 'week' | 'month' | 'year' = 'month', type: 'volume' | 'spent' | 'consumptions' = 'volume') => {
    const response = await api.get<ClanLeaderboardResponse>('/leaderboard/clans', {
      params: { period, type }
    });
    return response.data;
  }
};

