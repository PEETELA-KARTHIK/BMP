// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import priestReducer from './slices/priestSlice';
import devoteeReducer from './slices/devoteeSlice';
import bookingReducer from './slices/bookingSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    priest: priestReducer,
    devotee: devoteeReducer,
    booking: bookingReducer,
  },
});

export default store;