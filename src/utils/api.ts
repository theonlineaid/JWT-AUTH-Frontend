// src/utils/axios.ts
import axios from 'axios';

// Base URL configuration
const API_URL = `${'http://localhost:5000'}/api`;

// Create Axios instance with default settings
const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true, // Ensures cookies are sent with requests
});

// Utility functions to handle different types of requests
const fetchData = (url: string, id?: number | null, data: any = null) =>
    axiosInstance[id ? 'post' : 'get'](id ? `${url}${id}/` : url, data);

const postData = (url: string, data: any) => axiosInstance.post(url, data);

const putData = (url: string, id?: number | null, data: any = null) =>
    axiosInstance.put(id ? `${url}${id}/` : url, data);

const patchData = (url: string, data?: any) => axiosInstance.patch(url, data);

const deleteData = (url: string, id?: number | null) =>
    axiosInstance.delete(id ? `${url}${id}/` : url);

// Centralized API calls
const api = {
    register:  (data: any) => postData('/auth/register', data),
    login: (data: any) => postData('/auth/login', data),
    logout: () => postData('/auth/logout', {}),
    getProfile: () => fetchData('/auth/me'),
    // Add more API endpoints as needed
};

export default api;
