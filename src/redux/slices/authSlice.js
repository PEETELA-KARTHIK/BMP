// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../api'; // Import the API instance

// Login user
export const login = createAsyncThunk(
  'auth/login',
  async ({ phone, password }, { rejectWithValue }) => {
    try {
      console.log('Attempting login with:', { phone });
      const response = await api.post('/api/auth/login', {
        phone,
        password,
      });

      console.log('Login successful');

      // Store token in AsyncStorage
      await AsyncStorage.setItem('userToken', response.data.token);
      await AsyncStorage.setItem('userInfo', JSON.stringify(response.data));

      return response.data;
    } catch (error) {
      console.error('Login error occurred:', error);

      // Create a user-friendly error message
      let errorMessage = 'An error occurred during login.';

      if (error.response) {
        // The server responded with an error status
        errorMessage = error.response.data.message || `Server error: ${error.response.status}`;
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = 'Unable to reach the server. Please check your internet connection and make sure the server is running.';
      } else {
        // Something happened in setting up the request
        errorMessage = `Request error: ${error.message}`;
      }

      return rejectWithValue(errorMessage);
    }
  }
);

// Register user
export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, phone, password, userType }, { rejectWithValue }) => {
    try {
      console.log('Registration data:', { name, email, phone, userType });
      const response = await api.post('/api/auth/register', {
        name,
        email,
        phone,
        password,
        userType,
      });

      // Store token in AsyncStorage
      await AsyncStorage.setItem('userToken', response.data.token);
      await AsyncStorage.setItem('userInfo', JSON.stringify(response.data));

      return response.data;
    } catch (error) {
      console.error('Registration error:', error);

      let errorMessage = 'An error occurred during registration.';

      if (error.response) {
        errorMessage = error.response.data.message || `Server error: ${error.response.status}`;
      } else if (error.request) {
        errorMessage = 'Unable to reach the server. Please check your internet connection and make sure the server is running.';
      } else {
        errorMessage = `Request error: ${error.message}`;
      }

      return rejectWithValue(errorMessage);
    }
  }
);

// Load user info from AsyncStorage
export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (_, { rejectWithValue }) => {
    try {
      const userInfo = await AsyncStorage.getItem('userInfo');
      const userToken = await AsyncStorage.getItem('userToken');

      if (!userInfo || !userToken) {
        return rejectWithValue('No user info found');
      }

      return JSON.parse(userInfo);
    } catch (error) {
      console.error('Failed to load user info:', error);
      return rejectWithValue('Failed to load user info');
    }
  }
);

// Update profile
export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (profileData, { rejectWithValue, getState }) => {
    try {
      console.log('Updating profile with data:', profileData);

      // Get the auth token from state
      const { userToken } = getState().auth;

      if (!userToken) {
        return rejectWithValue('Authentication required');
      }

      // Make API call to update profile
      const response = await api.put('/api/users/profile', profileData, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      });

      // Update AsyncStorage
      const userInfoStr = await AsyncStorage.getItem('userInfo');
      if (userInfoStr) {
        const userInfo = JSON.parse(userInfoStr);
        const updatedUserInfo = { ...userInfo, ...response.data };

        // Make sure profileCompleted is explicitly set
        if (profileData.profileCompleted !== undefined) {
          updatedUserInfo.profileCompleted = profileData.profileCompleted;
        }

        await AsyncStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
      }

      return response.data;
    } catch (error) {
      console.error('Profile update error:', error);

      let errorMessage = 'Failed to update profile.';

      if (error.response) {
        errorMessage = error.response.data.message || `Server error: ${error.response.status}`;
      } else if (error.request) {
        errorMessage = 'Unable to reach the server. Please check your internet connection.';
      } else {
        errorMessage = `Request error: ${error.message}`;
      }

      return rejectWithValue(errorMessage);
    }
  }
);

// Logout user
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userInfo');
      return null;
    } catch (error) {
      console.error('Logout error:', error);
      return rejectWithValue('Failed to logout properly');
    }
  }
);

const initialState = {
  userInfo: null,
  userToken: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setProfileCompleted: (state, action) => {
      if (state.userInfo) {
        state.userInfo.profileCompleted = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
        state.userToken = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
        state.userToken = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Load User
      .addCase(loadUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
        state.userToken = action.payload.token;
      })
      .addCase(loadUser.rejected, (state) => {
        state.isLoading = false;
        state.userInfo = null;
        state.userToken = null;
      })
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = { ...state.userInfo, ...action.payload };

        // Ensure profileCompleted flag is properly set
        if (action.payload.profileCompleted !== undefined) {
          state.userInfo.profileCompleted = action.payload.profileCompleted;
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.userInfo = null;
        state.userToken = null;
      });
  },
});

export const { clearError, setProfileCompleted } = authSlice.actions;
export default authSlice.reducer;