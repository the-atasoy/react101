import { api } from './api.config';
import { Command } from '../types/Command';

const commandService = {
    getAll: async (platformId: string) => {
        const response = await api.get<Command[]>(`/c/Command/${platformId}`);
        return response.data;
    },

    getById: async (platformId: string, commandId: string) => {
        const response = await api.get<Command>(`/c/Command/${platformId}/${commandId}`);
        return response.data;
    },

    create: async (platformId: string, command: Omit<Command, 'id'>) => {
        const response = await api.post<Command>(`/c/Command/${platformId}`, command);
        return response.data;
    },

    delete: async (platformId: string, commandId: string) => {
        await api.delete(`/c/Command/${platformId}/${commandId}`);
    }
};

export default commandService;