// src/redux/slices/devoteeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

// Search priests
export const searchPriests = createAsyncThunk(
  'devotee/searchPriests',
  async (searchParams, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/devotee/priests', { params: searchParams });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to search priests');
    }
  }
);

// Get priest details
export const getPriestDetails = createAsyncThunk(
  'devotee/getPriestDetails',
  async (priestId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/devotee/priests/${priestId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch priest details');
    }
  }
);

// Create booking
export const createBooking = createAsyncThunk(
  'devotee/createBooking',
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/devotee/bookings', bookingData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create booking');
    }
  }
);

const initialState = {
  priests: [],
  selectedPriest: null,
  bookings: [],
  isLoading: false,
  error: null,
};

const devoteeSlice = createSlice({
  name: 'devotee',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle searchPriests
      .addCase(searchPriests.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchPriests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.priests = action.payload;
      })
      .addCase(searchPriests.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Handle getPriestDetails
      .addCase(getPriestDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPriestDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedPriest = action.payload;
      })
      .addCase(getPriestDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Handle createBooking
      .addCase(createBooking.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = devoteeSlice.actions;
export default devoteeSlice.reducer;