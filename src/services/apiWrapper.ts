import axios, { AxiosError, AxiosResponse } from 'axios';
import { ApiError } from '../types/error';

export async function handleApiRequest<T>(
    request: () => Promise<AxiosResponse<T>>
): Promise<T> {
    try {
        const response = await request();
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw {
                message: error.response?.data?.message || 'Operation failed',
                statusCode: error.response?.status
            } as ApiError;
        }
        throw { message: 'An unexpected error occurred' } as ApiError;
    }
}