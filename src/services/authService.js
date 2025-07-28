// src/services/authService.js
import api from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Service for authentication-related API calls
 */
const authService = {
  /**
   * Login with phone and password
   * @param {string} phone - User's phone number
   * @param {string} password - User's password
   * @returns {Promise} Response from the API
   */
  login: async (phone, password) => {
    try {
      const response = await api.post('/api/auth/login', { phone, password });
      await AsyncStorage.setItem('userToken', response.data.token);
      await AsyncStorage.setItem('userInfo', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Login failed. Please try again.';
    }
  },

  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise} Response from the API
   */
  register: async (userData) => {
    try {
      const response = await api.post('/api/auth/register', userData);
      await AsyncStorage.setItem('userToken', response.data.token);
      await AsyncStorage.setItem('userInfo', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Registration failed. Please try again.';
    }
  },

  /**
   * Logout the current user
   * @returns {Promise} Resolves when logout is complete
   */
  logout: async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userInfo');
      return true;
    } catch (error) {
      throw 'Logout failed. Please try again.';
    }
  },

  /**
   * Check if the user is authenticated
   * @returns {Promise<boolean>} Whether the user is authenticated
   */
  isAuthenticated: async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      return !!token;
    } catch (error) {
      return false;
    }
  },

  /**
   * Get the current user's info
   * @returns {Promise<Object>} The user info
   */
  getUserInfo: async () => {
    try {
      const userInfo = await AsyncStorage.getItem('userInfo');
      return userInfo ? JSON.parse(userInfo) : null;
    } catch (error) {
      return null;
    }
  },

  /**
   * Update user profile
   * @param {Object} profileData - The profile data to update
   * @returns {Promise} Response from the API
   */
  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/api/auth/profile', profileData);

      // Update local storage with updated user info
      const userInfo = await AsyncStorage.getItem('userInfo');
      if (userInfo) {
        const parsedUserInfo = JSON.parse(userInfo);
        const updatedUserInfo = { ...parsedUserInfo, ...response.data };
        await AsyncStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
      }

      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Profile update failed. Please try again.';
    }
  },

  /**
   * Change user password
   * @param {Object} passwordData - The password data (old and new)
   * @returns {Promise} Response from the API
   */
  changePassword: async (passwordData) => {
    try {
      const response = await api.put('/api/auth/change-password', passwordData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Password change failed. Please try again.';
    }
  },

  /**
   * Request password reset
   * @param {string} phone - The phone number to reset password for
   * @returns {Promise} Response from the API
   */
  requestPasswordReset: async (phone) => {
    try {
      const response = await api.post('/api/auth/request-reset', { phone });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Password reset request failed. Please try again.';
    }
  },

  /**
   * Reset password with OTP
   * @param {Object} resetData - The reset data (phone, OTP, new password)
   * @returns {Promise} Response from the API
   */
  resetPassword: async (resetData) => {
    try {
      const response = await api.post('/api/auth/reset-password', resetData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Password reset failed. Please try again.';
    }
  },
};

export default authService;