// src/api/index.js
import axios from 'axios';
import { Platform } from 'react-native';

// Helper function to determine the correct API URL
const getBaseURL = () => {
  // REPLACE '192.168.1.100' with your computer's actual IP address
  const YOUR_COMPUTER_IP = '192.168.0.100'; // <-- UPDATE THIS!

  if (Platform.OS === 'android') {
    if (__DEV__) {
      // For physical device testing, use your computer's IP
      return `http://${YOUR_COMPUTER_IP}:5000`;
      // For emulator, you would use: 'http://10.0.2.2:5000'
    } else {
      // For release builds, still use your computer's IP for testing
      return `http://${YOUR_COMPUTER_IP}:5000`;
      // Later, replace with: 'https://your-production-server.com'
    }
  } else {
    // For iOS simulator
    if (__DEV__) {
      return 'http://localhost:5000';
    } else {
      return `http://${YOUR_COMPUTER_IP}:5000`;
    }
  }
};

// Create axios instance with proper configuration
const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add logging interceptors to debug API calls
api.interceptors.request.use(
  config => {
    console.log('API Request:', config.method.toUpperCase(), config.url);
    console.log('Full URL:', config.baseURL + config.url);
    return config;
  },
  error => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => {
    console.log('API Response Status:', response.status);
    return response;
  },
  error => {
    if (error.response) {
      console.error('API Response Error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('API No Response:', error.request);
      console.error('Request details:', error.request);
    } else {
      console.error('API Setup Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;