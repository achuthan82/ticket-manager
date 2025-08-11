import axios from 'axios';

import { JWT_HOST_API } from 'configs/auth.config';
import { handleUnauthorized } from './authManager';
import { isTokenValid } from './jwt';

// Flag to prevent 401 handling during auth initialization
let isInitializing = false;

export const setInitializing = (initializing) => {
  isInitializing = initializing;
};

const axiosInstance = axios.create({
  baseURL: JWT_HOST_API,
});

// Request interceptor to add authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    
    // Debug logging
    console.log('Request interceptor - Token exists:', !!token);
    console.log('Request interceptor - Token valid:', token ? isTokenValid(token) : false);
    console.log('Request URL:', config.url);
    
    // Add authorization header if token exists
    if (token) {
      // For now, let's add the token even if validation fails (for debugging)
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Authorization header added:', `Bearer ${token.substring(0, 20)}...`);
    } else {
      console.log('No token found in localStorage');
    }
    
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  async (response) => {
    console.log('Response received:', response.status, response.config.url);
    if (response.data.status === 401 && !isInitializing) {
      console.warn('401 Unauthorized - Token expired or invalid');
      await handleUnauthorized(response.data?.message || 'Session expired. Please login again.');
      return Promise.reject({
        response: {
          data: response.data,
          status: response.status
        },
        message: 'Session expired. Please login again.',
        isUnauthorized: true
      });
    }

    return response;
  },
  async (error) => {
    console.error('Response error:', error.response?.status, error.config?.url);
    
    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      const { data, status } = error.response;
      
      // Handle 401 Unauthorized - token expired or invalid
      if (status === 401 && !isInitializing) {
        console.warn('401 Unauthorized - Token expired or invalid');
        await handleUnauthorized(data?.message || 'Session expired. Please login again.');
        return Promise.reject({
          response: {
            data,
            status
          },
          message: 'Session expired. Please login again.',
          isUnauthorized: true
        });
      }
      
      return Promise.reject({
        response: {
          data,
          status
        },
        message: data?.message || `HTTP ${status} error`
      });
    } else if (error.request) {
      // Network error
      return Promise.reject({
        request: error.request,
        message: 'Network error. Please check your connection.'
      });
    } else {
      // Other errors
      return Promise.reject({
        message: error.message || 'Something went wrong'
      });
    }
  }
);

export default axiosInstance;
