/**
 * API Service Layer
 * Centralized API calls using Axios
 */

import axios from 'axios';

// Use environment variable for API URL, fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Error handler wrapper
const handleError = (error) => {
    if (error.response) {
        // Server responded with error
        throw new Error(error.response.data.detail || 'An error occurred');
    } else if (error.request) {
        // No response received
        throw new Error('No response from server. Please check if the backend is running.');
    } else {
        // Request setup error
        throw new Error(error.message);
    }
};

export const applicationService = {
    /**
     * Get all applications
     */
    getApplications: async () => {
        try {
            const response = await api.get('/applications');
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    /**
     * Get single application by ID
     */
    getApplication: async (id) => {
        try {
            const response = await api.get(`/applications/${id}`);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    /**
     * Create new application
     */
    createApplication: async (data) => {
        try {
            const response = await api.post('/applications', data);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    /**
     * Update existing application
     */
    updateApplication: async (id, data) => {
        try {
            const response = await api.put(`/applications/${id}`, data);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    /**
     * Delete application
     */
    deleteApplication: async (id) => {
        try {
            await api.delete(`/applications/${id}`);
        } catch (error) {
            handleError(error);
        }
    },

    /**
     * Get analytics/statistics
     */
    getStats: async () => {
        try {
            const response = await api.get('/applications/stats');
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },
};

export default api;
