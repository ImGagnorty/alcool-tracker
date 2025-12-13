import api from './api';

export interface ClanMember {
  id: string;
  userId: string;
  clanId: string;
  role: 'LEADER' | 'MODERATOR' | 'MEMBER';
  joinedAt: string;
  user: {
    id: string;
    name: string | null;
    blurUsername: boolean;
  };
}

export interface Clan {
  id: string;
  name: string;
  description?: string;
  city?: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  members: ClanMember[];
  _count?: {
    members: number;
  };
}

export interface ClanInvitation {
  id: string;
  clanId: string;
  inviterId: string;
  inviteeId?: string;
  inviteeUsername?: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  clan?: Clan;
  inviter?: {
    id: string;
    name: string | null;
    blurUsername: boolean;
  };
}

export interface CreateClanData {
  name: string;
  description?: string;
  city?: string;
  imageUrl?: string;
}

export const clanService = {
  getAll: async () => {
    const response = await api.get<Clan[]>('/clans');
    return response.data;
  },

  getMyClan: async () => {
    const response = await api.get<Clan | null>('/clans/my-clan');
    return response.data;
  },

  create: async (data: CreateClanData) => {
    const response = await api.post<Clan>('/clans', data);
    return response.data;
  },

  update: async (id: string, data: Partial<CreateClanData>) => {
    const response = await api.put<Clan>(`/clans/${id}`, data);
    return response.data;
  },

  invite: async (clanId: string, inviteeUsername: string) => {
    const response = await api.post(`/clans/${clanId}/invite`, { inviteeUsername });
    return response.data;
  },

  acceptInvitation: async (invitationId: string) => {
    const response = await api.post(`/clans/invitations/${invitationId}/accept`);
    return response.data;
  },

  rejectInvitation: async (invitationId: string) => {
    const response = await api.post(`/clans/invitations/${invitationId}/reject`);
    return response.data;
  },

  getInvitations: async () => {
    const response = await api.get<ClanInvitation[]>('/clans/invitations');
    return response.data;
  },

  removeMember: async (clanId: string, userId: string) => {
    await api.delete(`/clans/${clanId}/members/${userId}`);
  },

  leave: async (clanId: string) => {
    await api.delete(`/clans/${clanId}/leave`);
  },

  delete: async (clanId: string) => {
    await api.delete(`/clans/${clanId}`);
  },

  getLeaderboard: async (clanId: string, period: 'week' | 'month' | 'year' = 'month', type: 'volume' | 'spent' | 'consumptions' = 'volume') => {
    const response = await api.get(`/clans/${clanId}/leaderboard`, {
      params: { period, type }
    });
    return response.data;
  }
};

