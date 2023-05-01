import axios from 'axios';
import { getTokenLocalStorage } from '../../context/AuthProvider/util';

export const API = axios.create({
    baseURL: "http://127.0.0.1:3300"
});

API.interceptors.request.use(
    async (config) => {
        const token = await getTokenLocalStorage();  
        const refresh_token = token?.replaceAll('"', '');
        
        config.headers.Authorization = `Bearer ${refresh_token}`;

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);