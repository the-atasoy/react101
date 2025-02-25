import axios from 'axios';

const BASE_URL = 'http://acme.com';

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Optional: Add request/response interceptors
api.interceptors.request.use(
    (config) => {
        // You can add auth headers or other configurations here
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);