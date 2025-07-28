// src/redux/slices/priestSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

// Get priest profile
export const getProfile = createAsyncThunk(
  'priest/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/priest/profile');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
    }
  }
);

// Get bookings
export const getBookings = createAsyncThunk(
  'priest/getBookings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/priest/bookings');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch bookings');
    }
  }
);

// Get earnings
export const getEarnings = createAsyncThunk(
  'priest/getEarnings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/priest/earnings');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch earnings');
    }
  }
);

const initialState = {
  profile: null,
  bookings: [],
  earnings: null,
  isLoading: false,
  error: null,
};

const priestSlice = createSlice({
  name: 'priest',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle getProfile
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Handle getBookings
      .addCase(getBookings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookings = action.payload;
      })
      .addCase(getBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Handle getEarnings
      .addCase(getEarnings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getEarnings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.earnings = action.payload;
      })
      .addCase(getEarnings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = priestSlice.actions;
export default priestSlice.reducer;