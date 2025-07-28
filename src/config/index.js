// src/config/index.js
import { Platform } from 'react-native';

// Determine correct API URL based on platform and environment
const getApiUrl = () => {
  if (Platform.OS === 'android') {
    if (__DEV__) {
      return 'http://10.0.2.2:5000'; // Android emulator special IP for localhost
    } else {
      return 'http://your-production-server.com';
    }
  } else { // iOS
    if (__DEV__) {
      return 'http://localhost:5000';
    } else {
      return 'http://your-production-server.com';
    }
  }
};

export const API_URL = getApiUrl();

export const APP_COLORS = {
  primary: '#FF6B00',
  secondary: '#FFB273',
  background: '#F5F5F5',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#9E9E9E',
  lightGray: '#E0E0E0',
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FFC107',
  info: '#2196F3',
};

export const FONT_FAMILY = {
  regular: 'System',
  bold: 'System',
};

export const APP_TITLE_STYLE = {
  fontFamily: FONT_FAMILY.bold,
  fontSize: 36,
  fontWeight: 'bold',
  color: APP_COLORS.primary,
  letterSpacing: 1,
  textShadowColor: 'rgba(0, 0, 0, 0.1)',
  textShadowOffset: { width: 1, height: 1 },
  textShadowRadius: 2,
};

export const APP_NAME = 'BookMyPujari';

// App configuration
export const APP_CONFIG = {
  name: APP_NAME,
  tagline: 'Book Your Pujari with Ease',
  version: '1.0.0',
};