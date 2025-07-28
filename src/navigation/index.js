// src/navigation/index.js - Updated with new screens and proper structure
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { APP_COLORS } from '../config';

// Auth Screens
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';

// Priest Screens
import PriestHomeScreen from '../screens/priest/HomeScreen';
import PriestBookingsScreen from '../screens/priest/BookingsScreen';
import PriestEarningsScreen from '../screens/priest/EarningsScreen';
import PriestProfileScreen from '../screens/priest/ProfileScreen';
import PriestNotificationsScreen from '../screens/priest/NotificationsScreen';
import BookingDetailsScreen from '../screens/priest/BookingDetailsScreen';
import ProfileSetupScreen from '../screens/priest/ProfileSetupScreen';
import AvailableOffersScreen from '../screens/priest/AvailableOffersScreen';

// Devotee Screens
import DevoteeHomeScreen from '../screens/devotee/HomeScreen';
import DevoteeBookingsScreen from '../screens/devotee/BookingsScreen';
import DevoteeProfileScreen from '../screens/devotee/ProfileScreen';
import PriestSearchScreen from '../screens/devotee/PriestSearchScreen';
import PriestDetailsScreen from '../screens/devotee/PriestDetailsScreen';
import BookingScreen from '../screens/devotee/BookingScreen';
import PaymentScreen from '../screens/devotee/PaymentScreen';
import BookingConfirmationScreen from '../screens/devotee/BookingConfirmationScreen';
import RatingScreen from '../screens/devotee/RatingScreen';

// Common Screens
import HelpScreen from '../screens/common/HelpScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

/**
 * Authentication Stack Navigator
 */
export const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
  </Stack.Navigator>
);

/**
 * Priest Tab Navigator
 */
export const PriestTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Bookings') {
          iconName = focused ? 'calendar' : 'calendar-outline';
        } else if (route.name === 'Earnings') {
          iconName = focused ? 'wallet' : 'wallet-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
        } else if (route.name === 'Notifications') {
          iconName = focused ? 'notifications' : 'notifications-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: APP_COLORS.primary,
      tabBarInactiveTintColor: APP_COLORS.gray,
      headerShown: false,
      tabBarStyle: {
        backgroundColor: APP_COLORS.white,
        borderTopWidth: 1,
        borderTopColor: APP_COLORS.lightGray,
        paddingBottom: 5,
        paddingTop: 5,
        height: 60,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '600',
      },
    })}
  >
    <Tab.Screen
      name="Home"
      component={PriestHomeScreen}
      options={{ tabBarLabel: 'Home' }}
    />
    <Tab.Screen
      name="Bookings"
      component={PriestBookingsScreen}
      options={{ tabBarLabel: 'Bookings' }}
    />
    <Tab.Screen
      name="Earnings"
      component={PriestEarningsScreen}
      options={{ tabBarLabel: 'Earnings' }}
    />
    <Tab.Screen
      name="Profile"
      component={PriestProfileScreen}
      options={{ tabBarLabel: 'Profile' }}
    />
    <Tab.Screen
      name="Notifications"
      component={PriestNotificationsScreen}
      options={{ tabBarLabel: 'Alerts' }}
    />
  </Tab.Navigator>
);

/**
 * Devotee Tab Navigator - Updated with proper structure
 */
export const DevoteeTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Bookings') {
          iconName = focused ? 'calendar' : 'calendar-outline';
        } else if (route.name === 'Search') {
          iconName = focused ? 'search' : 'search-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
        } else if(route.name === 'Payment'){
        iconName = focused ? 'payment' : 'payment-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: APP_COLORS.primary,
      tabBarInactiveTintColor: APP_COLORS.gray,
      headerShown: false,
      tabBarStyle: {
        backgroundColor: APP_COLORS.white,
        borderTopWidth: 1,
        borderTopColor: APP_COLORS.lightGray,
        paddingBottom: 5,
        paddingTop: 5,
        height: 60,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '600',
      },
    })}
  >
    <Tab.Screen
      name="Home"
      component={DevoteeHomeScreen}
      options={{ tabBarLabel: 'Home' }}
    />
    <Tab.Screen
      name="Bookings"
      component={DevoteeBookingsScreen}
      options={{ tabBarLabel: 'My Bookings' }}
    />
    <Tab.Screen
      name="Search"
      component={PriestSearchScreen}
      options={{ tabBarLabel: 'Find Priests' }}
    />
    <Tab.Screen
      name="Profile"
      component={DevoteeProfileScreen}
      options={{ tabBarLabel: 'Profile' }}
    />
  </Tab.Navigator>
);

/**
 * Priest Stack Navigator - Updated with all necessary screens
 */
export const PriestNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="PriestTabs" component={PriestTabNavigator} />
    <Stack.Screen name="BookingDetails" component={BookingDetailsScreen} />
    <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
    <Stack.Screen name="Help" component={HelpScreen} />
    <Stack.Screen name="AvailableOffersScreen" component={AvailableOffersScreen} />
  </Stack.Navigator>
);

/**
 * Devotee Stack Navigator - Updated with Rating screen and proper flow
 */
export const DevoteeNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="DevoteeTabs" component={DevoteeTabNavigator} />
    <Stack.Screen
      name="PriestDetails"
      component={PriestDetailsScreen}
      options={{
        presentation: 'modal',
        animationTypeForReplace: 'push',
      }}
    />
    <Stack.Screen
      name="Booking"
      component={BookingScreen}
      options={{
        presentation: 'card',
      }}
    />
    <Stack.Screen
      name="Payment"
      component={PaymentScreen}
      options={{
        presentation: 'card',
      }}
    />
    <Stack.Screen
      name="BookingConfirmation"
      component={BookingConfirmationScreen}
      options={{
        gestureEnabled: false,
        presentation: 'card',
      }}
    />
    <Stack.Screen
      name="Rating"
      component={RatingScreen}
      options={{
        presentation: 'modal',
      }}
    />
    <Stack.Screen
      name="BookingDetails"
      component={BookingDetailsScreen}
      options={{
        presentation: 'card',
      }}
    />
    <Stack.Screen name="Help" component={HelpScreen} />
  </Stack.Navigator>
);

/**
 * Profile Setup Stack Navigator - For incomplete priest profiles
 */
export const ProfileSetupNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
    <Stack.Screen name="Help" component={HelpScreen} />
  </Stack.Navigator>
);

/**
 * Main Navigator - determines which navigator to show based on auth state
 * @param {Object} props - Props containing user info and token
 */
export const MainNavigator = ({ userInfo, userToken, profileCompleted }) => {
  // Show auth screens if not logged in
  if (!userToken) {
    return <AuthNavigator />;
  }

  // Handle priest users
  if (userInfo?.userType === 'priest') {
    // Show profile setup if profile is not completed
    if (!profileCompleted) {
      return <ProfileSetupNavigator />;
    }
    // Show main priest navigation
    return <PriestNavigator />;
  }

  // Show devotee navigation for devotee users
  if (userInfo?.userType === 'devotee') {
    return <DevoteeNavigator />;
  }

  // Fallback to auth if user type is not recognized
  return <AuthNavigator />;
};

/**
 * Navigation Helper Functions
 */
export const navigationHelpers = {
  // Navigate to booking details from any screen
  navigateToBookingDetails: (navigation, booking, userType) => {
    if (userType === 'priest') {
      navigation.navigate('PriestTabs', {
        screen: 'Bookings',
        params: { bookingId: booking.id }
      });
    } else {
      navigation.navigate('DevoteeTabs', {
        screen: 'Bookings',
        params: { bookingId: booking.id }
      });
    }
  },

  // Navigate to home screen
  navigateToHome: (navigation, userType) => {
    if (userType === 'priest') {
      navigation.navigate('PriestTabs', { screen: 'Home' });
    } else {
      navigation.navigate('DevoteeTabs', { screen: 'Home' });
    }
  },

  // Navigate to profile screen
  navigateToProfile: (navigation, userType) => {
    if (userType === 'priest') {
      navigation.navigate('PriestTabs', { screen: 'Profile' });
    } else {
      navigation.navigate('DevoteeTabs', { screen: 'Profile' });
    }
  },

  // Navigate to bookings screen
  navigateToBookings: (navigation, userType) => {
    if (userType === 'priest') {
      navigation.navigate('PriestTabs', { screen: 'Bookings' });
    } else {
      navigation.navigate('DevoteeTabs', { screen: 'Bookings' });
    }
  },
};

// Export individual navigators for direct use if needed
export {
  AuthNavigator,
  PriestTabNavigator,
  DevoteeTabNavigator,
  PriestNavigator,
  DevoteeNavigator,
  ProfileSetupNavigator,
};