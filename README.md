# Sacred Connect App

Sacred Connect is a comprehensive mobile application that connects devotees with priests for various religious ceremonies and rituals.

## Features

### For Devotees:
- Find priests based on ceremony type, location, and availability
- View priest profiles, ratings, and reviews
- Book ceremonies with selected priests
- Make payments securely through the app
- Track bookings and receive reminders
- Rate and review priests after ceremonies

### For Priests:
- Create and manage professional profiles
- Set availability and pricing for various ceremonies
- Accept or decline booking requests
- Track earnings and request withdrawals
- Manage bookings and calendars
- View ratings and reviews

## Technical Stack

### Frontend
- React Native for cross-platform mobile app
- Redux Toolkit for state management
- React Navigation for navigation
- Various UI libraries (react-native-paper, react-native-vector-icons, etc.)

### Backend
- Node.js with Express.js
- MongoDB for database
- JWT for authentication
- Middleware for request validation
- API endpoints for all app features

## Directory Structure


SacredConnect/
├── android/                # Android project files
├── ios/                    # iOS project files
├── server/                 # Backend server
│   ├── controllers/        # API controllers
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── server.js           # Server entry point
├── src/
│   ├── api/                # API service setup
│   ├── assets/             # Images and assets
│   ├── components/         # Reusable components
│   ├── config/             # App configuration
│   ├── navigation/         # Navigation configuration
│   ├── redux/              # Redux store and slices
│   ├── screens/            # App screens
│   │   ├── auth/           # Authentication screens
│   │   ├── priest/         # Priest-specific screens
│   │   ├── devotee/        # Devotee-specific screens
│   │   ├── common/         # Shared screens
│   ├── services/           # API service functions
│   ├── utils/              # Utility functions
│   ├── App.js              # Main app component
├── index.js                # Entry point


## Installation and Setup

### Prerequisites
- Node.js and npm
- React Native CLI
- Android Studio / Xcode
- MongoDB

### Backend Setup
bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file with required environment variables
# See .env.example for reference

# Start server
npm run dev


### Frontend Setup
bash
# Install dependencies
npm install

# Start Metro bundler
npx react-native start

# Run on Android
npx react-native run-android

# Run on iOS
npx react-native run-ios


### Building Release APK
bash
# Navigate to android directory
cd android

# Generate release APK
./gradlew assembleRelease

# The APK will be available at:
# android/app/build/outputs/apk/release/app-release.apk

# To see the list of emulators




## Acknowledgements

- React Native community for the amazing framework
- All the developers behind the libraries used in this project
- The team at [Your Company] for their contributions and support"# BMP" 
"# BMP" 
"# BMP" 
"# BMP" 
