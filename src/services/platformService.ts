import { api } from './api.config';
import { Platform } from '../types/Platform';
import { handleApiRequest } from './apiWrapper';

const platformService = {
    getAll: (): Promise<Platform[]> => 
        handleApiRequest(() => api.get<Platform[]>('Platform')),

    getById: (id: string): Promise<Platform> => 
        handleApiRequest(() => api.get<Platform>(`Platform/${id}`)),

    create: (platform: Omit<Platform, 'id'>): Promise<Platform> => 
        handleApiRequest(() => api.post<Platform>('Platform', platform)),

    update: (id: string, platform: Omit<Platform, 'id'>): Promise<Platform> => 
        handleApiRequest(() => api.put<Platform>(`Platform/${id}`, platform)),

    delete: (id: string): Promise<void> => 
        handleApiRequest(() => api.delete(`Platform/${id}`))
};

export default platformService;