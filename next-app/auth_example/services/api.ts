import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const NODE_ENV = process.env.NEXT_PUBLIC_NODE_ENV || 'production';
const isDevelopment = NODE_ENV === 'development';

console.log('API Base URL:', API_BASE_URL);
console.log('Environment:', NODE_ENV);

// Token storage for development mode
let authToken: string | null = null;

// Function to set the auth token (used after login in development mode)
export const setAuthToken = (token: string | null) => {
  authToken = token;
  if (token) {
    // Also store in localStorage for persistence across page refreshes
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  } else {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  }
};

// Function to get the auth token
export const getAuthToken = (): string | null => {
  if (authToken) return authToken;
  // Try to get from localStorage if not in memory
  if (typeof window !== 'undefined') {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      authToken = storedToken;
      return storedToken;
    }
  }
  return null;
};

// Function to clear the auth token (used on logout)
export const clearAuthToken = () => {
  authToken = null;
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
  }
};

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Only use withCredentials in production (cookie-based auth)
  withCredentials: !isDevelopment,
  timeout: 10000, // 10 second timeout
});

// Request interceptor to add auth tokens if needed
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (isDevelopment) {
      // In development, add token to Authorization header
      const token = getAuthToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    // In production, cookies are handled automatically with withCredentials
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling tokens and errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    if (isDevelopment) {
      // In development, extract and store token from response if present
      console.log('Response data:', response.data);
      const token = response.data?.accessToken;
      if (token) {
        setAuthToken(token);
      }
    }
    return response;
  },
  (error) => {
    // Don't redirect on 401 - let components handle it
    // This prevents infinite loops during initial auth check
    if (error.response?.status === 401 && isDevelopment) {
      // Clear token on 401 in development mode
      clearAuthToken();
    }
    return Promise.reject(error);
  }
);

// Accommodation registration interface
export interface AccommodationRegistrationData {
  name: string;
  email: string;
  uniqueId: string;
  college: string;
  residentialAddress: string;
  city: string;
  phone: string;
  gender: string;
  breakfast1: boolean;
  breakfast2: boolean;
  dinner1: boolean;
  dinner2: boolean;
  amenities: string;
  amount: number;
  optin: boolean;
}

// Accommodation registration function
export const registerAccommodation = async (data: AccommodationRegistrationData) => {
  const response = await api.post('/accommodation/register', data);
  return response.data;
};

export default api;
