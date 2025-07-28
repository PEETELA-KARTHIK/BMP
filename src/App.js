// Updated App.js to include the animated splash screen
import React, { useEffect } from 'react';
import { StatusBar, LogBox, Text } from 'react-native';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FlashMessage from 'react-native-flash-message';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import store from './redux/store';
import { loadUser } from './redux/slices/authSlice';
import { APP_COLORS } from './config';
import RatingScreen from './screens/devotee/RatingScreen';


// Import the new Splash Screen
import SplashScreen from './screens/SplashScreen';

// Auth Screens
import LoginScreen from './screens/auth/LoginScreen';
import SignUpScreen from './screens/auth/SignUpScreen';

// Priest Screens
import PriestHomeScreen from './screens/priest/HomeScreen';
import PriestBookingsScreen from './screens/priest/BookingsScreen';
import PriestEarningsScreen from './screens/priest/EarningsScreen';
import PriestProfileScreen from './screens/priest/ProfileScreen';
import PriestNotificationsScreen from './screens/priest/NotificationsScreen';
import BookingDetailsScreen from './screens/priest/BookingDetailsScreen';
import ProfileSetupScreen from './screens/priest/ProfileSetupScreen';

// Devotee Screens
import DevoteeHomeScreen from './screens/devotee/HomeScreen';
import DevoteeBookingsScreen from './screens/devotee/BookingsScreen';
import DevoteeProfileScreen from './screens/devotee/ProfileScreen';
import PriestSearchScreen from './screens/devotee/PriestSearchScreen';
import PriestDetailsScreen from './screens/devotee/PriestDetailsScreen';
import BookingScreen from './screens/devotee/BookingScreen';
import PaymentScreen from './screens/devotee/PaymentScreen';
import BookingConfirmationScreen from './screens/devotee/BookingConfirmationScreen';
import SecurityPrivacyScreen from './screens/devotee/SecurityPrivacyScreen';
import PaymentMethodsScreen from './screens/devotee/PaymentMethodsScreen';
import TermsAndConditionsScreen from './screens/devotee/TermsAndConditionsScreen';

// Help & Support
import HelpScreen from './screens/common/HelpScreen';

// Ignore specific warnings
LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Auth Stack - Now includes the splash screen
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
  </Stack.Navigator>
);

// Priest Tabs
const PriestTabNavigator = () => (
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
    })}
  >
    <Tab.Screen name="Home" component={PriestHomeScreen} />
    <Tab.Screen name="Bookings" component={PriestBookingsScreen} />
    <Tab.Screen name="Earnings" component={PriestEarningsScreen} />
    <Tab.Screen name="Profile" component={PriestProfileScreen} />
    <Tab.Screen name="Notifications" component={PriestNotificationsScreen} />
  </Tab.Navigator>
);

// Devotee Tabs
const DevoteeTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName = '';
        if (route.name === 'Home') iconName = 'home';
        else if (route.name === 'Bookings') iconName = 'event';
        else if (route.name === 'Profile') iconName = 'person';
        return <MaterialIcons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: APP_COLORS.primary,
      tabBarInactiveTintColor: APP_COLORS.gray,
      headerShown: false,
    })}
  >
    <Tab.Screen name="Home" component={DevoteeHomeScreen} />
    <Tab.Screen name="Bookings" component={DevoteeBookingsScreen} />
    <Tab.Screen name="Profile" component={DevoteeProfileScreen} />
  </Tab.Navigator>
);

// Priest Stack
const PriestStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="PriestTabs" component={PriestTabNavigator} />
    <Stack.Screen name="BookingDetails" component={BookingDetailsScreen} />
    <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
    <Stack.Screen name="Help" component={HelpScreen} />
  </Stack.Navigator>
);

// Devotee Stack
const DevoteeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="DevoteeTabs" component={DevoteeTabNavigator} />
    <Stack.Screen name="PriestSearch" component={PriestSearchScreen} />
    <Stack.Screen name="PriestDetails" component={PriestDetailsScreen} />
    <Stack.Screen name="Booking" component={BookingScreen} />
    <Stack.Screen name="Payment" component={PaymentScreen} />
    <Stack.Screen name="BookingConfirmation" component={BookingConfirmationScreen} />
    <Stack.Screen name="Rating" component={RatingScreen} />
    <Stack.Screen name="BookingDetails" component={BookingDetailsScreen} />
    <Stack.Screen name="Help" component={HelpScreen} />
    <Stack.Screen name="SecurityPrivacy" component={SecurityPrivacyScreen} />
    <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
    <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} />
  </Stack.Navigator>
);


const App = () => {
  const { userInfo, userToken, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    // Add this for debugging
    if (userInfo) {
      console.log('User info updated:', userInfo);
      console.log('Profile completed status:', userInfo.profileCompleted);
    }
  }, [userInfo]);

  if (isLoading) {
    // We don't need this anymore since we have a dedicated splash screen
    // The splash screen will show initially anyway
    return null;
  }

  // Determine which stack to show based on authentication and profile completion
  let stackToShow = <AuthStack />;

  if (userToken) {
    if (userInfo?.userType === 'priest') {
      console.log('User is priest, profileCompleted:', userInfo.profileCompleted);

      if (userInfo.profileCompleted !== true) { // Strict comparison to make sure it's exactly true
        // Show profile setup screen for priests who haven't completed their profile
        stackToShow = (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
          </Stack.Navigator>
        );
      } else {
        // Show main priest screens
        stackToShow = <PriestStack />;
      }
    } else {
      // Show devotee screens
      stackToShow = <DevoteeStack />;
    }
  }

  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={APP_COLORS.primary}
        barStyle="light-content"
      />
      {stackToShow}
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppWrapper;