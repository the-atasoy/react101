import { api } from './api.config';
import { Platform } from '../types/Platform';

export const platformService = {
    getAll: async () => {
        const response = await api.get<Platform[]>('/Platform');
        return response.data;
    },
    
    getById: async (id: string) => {
        const response = await api.get<Platform>(`/Platform/${id}`);
        return response.data;
    },
    
    create: async (platform: Platform) => {
        const response = await api.post<Platform>('/Platform', platform);
        return response.data;
    },
    
    update: async (id: string, platform: Platform) => {
        const response = await api.put<Platform>(`/Platform/${id}`, platform);
        return response.data;
    },
    
    delete: async (id: string) => {
        await api.delete(`/Platform/${id}`);
    }
};