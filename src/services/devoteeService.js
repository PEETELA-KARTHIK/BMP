// src/services/devoteeService.js
import api from '../api';

/**
 * Service for devotee-related API calls
 */
const devoteeService = {
  /**
   * Get devotee profile
   * @returns {Promise} Response from the API
   */
  getProfile: async () => {
    try {
      const response = await api.get('/api/devotee/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch profile. Please try again.';
    }
  },

  /**
   * Update devotee profile
   * @param {Object} profileData - The profile data to update
   * @returns {Promise} Response from the API
   */
  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/api/devotee/profile', profileData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update profile. Please try again.';
    }
  },

  /**
   * Search for priests
   * @param {Object} searchParams - The search parameters
   * @returns {Promise} Response from the API
   */
  searchPriests: async (searchParams) => {
    try {
      const response = await api.get('/api/devotee/priests', { params: searchParams });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to search priests. Please try again.';
    }
  },

  /**
   * Get priest details
   * @param {string} priestId - The priest ID
   * @returns {Promise} Response from the API
   */
  getPriestDetails: async (priestId) => {
    try {
      const response = await api.get(`/api/devotee/priests/${priestId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch priest details. Please try again.';
    }
  },

  /**
   * Get priest's availability
   * @param {string} priestId - The priest ID
   * @param {string} date - The date to check availability (optional)
   * @returns {Promise} Response from the API
   */
  getPriestAvailability: async (priestId, date) => {
    try {
      const url = date
        ? `/api/devotee/priests/${priestId}/availability?date=${date}`
        : `/api/devotee/priests/${priestId}/availability`;
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch priest availability. Please try again.';
    }
  },

  /**
   * Get devotee's bookings
   * @param {string} status - Filter bookings by status (optional)
   * @returns {Promise} Response from the API
   */
  getBookings: async (status) => {
    try {
      const url = status ? `/api/devotee/bookings?status=${status}` : '/api/devotee/bookings';
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch bookings. Please try again.';
    }
  },

  /**
   * Get booking details
   * @param {string} bookingId - The booking ID
   * @returns {Promise} Response from the API
   */
  getBookingDetails: async (bookingId) => {
    try {
      const response = await api.get(`/api/devotee/bookings/${bookingId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch booking details. Please try again.';
    }
  },

  /**
   * Create a new booking
   * @param {Object} bookingData - The booking data
   * @returns {Promise} Response from the API
   */
  createBooking: async (bookingData) => {
    try {
      const response = await api.post('/api/devotee/bookings', bookingData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to create booking. Please try again.';
    }
  },

  /**
   * Cancel a booking
   * @param {string} bookingId - The booking ID
   * @param {Object} cancellationData - The cancellation data (reason, etc.)
   * @returns {Promise} Response from the API
   */
  cancelBooking: async (bookingId, cancellationData) => {
    try {
      const response = await api.put(`/api/devotee/bookings/${bookingId}/cancel`, cancellationData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to cancel booking. Please try again.';
    }
  },

  /**
   * Process payment for a booking
   * @param {string} bookingId - The booking ID
   * @param {Object} paymentData - The payment data
   * @returns {Promise} Response from the API
   */
  processPayment: async (bookingId, paymentData) => {
    try {
      const response = await api.post(`/api/devotee/bookings/${bookingId}/payment`, paymentData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to process payment. Please try again.';
    }
  },

  /**
   * Submit a review for a priest
   * @param {string} priestId - The priest ID
   * @param {Object} reviewData - The review data
   * @returns {Promise} Response from the API
   */
  submitReview: async (priestId, reviewData) => {
    try {
      const response = await api.post(`/api/devotee/priests/${priestId}/reviews`, reviewData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to submit review. Please try again.';
    }
  },

  /**
   * Get reviews for a priest
   * @param {string} priestId - The priest ID
   * @returns {Promise} Response from the API
   */
  getPriestReviews: async (priestId) => {
    try {
      const response = await api.get(`/api/devotee/priests/${priestId}/reviews`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch reviews. Please try again.';
    }
  },

  /**
   * Get ceremonies/services offered
   * @returns {Promise} Response from the API
   */
  getCeremonies: async () => {
    try {
      const response = await api.get('/api/devotee/ceremonies');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch ceremonies. Please try again.';
    }
  },

  /**
   * Get ceremony details
   * @param {string} ceremonyId - The ceremony ID
   * @returns {Promise} Response from the API
   */
  getCeremonyDetails: async (ceremonyId) => {
    try {
      const response = await api.get(`/api/devotee/ceremonies/${ceremonyId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch ceremony details. Please try again.';
    }
  },

  /**
   * Save a priest as favorite
   * @param {string} priestId - The priest ID
   * @returns {Promise} Response from the API
   */
  addFavoritePriest: async (priestId) => {
    try {
      const response = await api.post('/api/devotee/favorites', { priestId });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to add favorite. Please try again.';
    }
  },

  /**
   * Remove a priest from favorites
   * @param {string} priestId - The priest ID
   * @returns {Promise} Response from the API
   */
  removeFavoritePriest: async (priestId) => {
    try {
      const response = await api.delete(`/api/devotee/favorites/${priestId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to remove favorite. Please try again.';
    }
  },

  /**
   * Get favorite priests
   * @returns {Promise} Response from the API
   */
  getFavoritePriests: async () => {
    try {
      const response = await api.get('/api/devotee/favorites');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch favorites. Please try again.';
    }
  },

  /**
   * Get notifications for the devotee
   * @returns {Promise} Response from the API
   */
  getNotifications: async () => {
    try {
      const response = await api.get('/api/devotee/notifications');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch notifications. Please try again.';
    }
  },

  /**
   * Mark notification as read
   * @param {string} notificationId - The notification ID
   * @returns {Promise} Response from the API
   */
  markNotificationAsRead: async (notificationId) => {
    try {
      const response = await api.put(`/api/devotee/notifications/${notificationId}/read`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to mark notification as read. Please try again.';
    }
  },
};

export default devoteeService;