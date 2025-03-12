import { api } from './api.config';
import { Command } from '../types/Command';
import { handleApiRequest } from './apiWrapper';

const commandService = {
    getAll: (platformId: string): Promise<Command[]> => 
        handleApiRequest(() => api.get<Command[]>(`/c/Command/${platformId}`)),

    getById: (platformId: string, commandId: string): Promise<Command> => 
        handleApiRequest(() => api.get<Command>(`/c/Command/${platformId}/${commandId}`)),

    create: (platformId: string, command: Omit<Command, 'id'>): Promise<Command> => 
        handleApiRequest(() => api.post<Command>(`/c/Command/${platformId}`, command)),

    update: (platformId: string, command: Command): Promise<Command> =>
        handleApiRequest(() => api.put<Command>(`/c/Command/${platformId}/${command.id}`, command)),

    delete: (platformId: string, commandId: string): Promise<void> => 
        handleApiRequest(() => api.delete(`/c/Command/${platformId}/${commandId}`))
};

export default commandService;