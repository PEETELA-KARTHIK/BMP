// src/screens/SplashScreen.js - Updated with logo
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
  Image, // Added Image import
} from 'react-native';
import { APP_COLORS } from '../config';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  // Animated values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const moveUpAnim = useRef(new Animated.Value(50)).current;

  // For the logo animation
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.3)).current;

  // For the Om symbol pulse effect
  const omPulse = useRef(new Animated.Value(1)).current;

  // For the tagline text
  const taglineOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Pulse animation for Om symbol
    Animated.loop(
      Animated.sequence([
        Animated.timing(omPulse, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(omPulse, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Logo and text animation sequence
    Animated.sequence([
      // First: Logo appears
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),

      // Small delay
      Animated.delay(200),

      // Then: Text appears
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(moveUpAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),

      // Small delay
      Animated.delay(300),

      // Finally: Tagline appears
      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate to Login after 4 seconds (increased to show full animation)
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={APP_COLORS.primary} barStyle="light-content" />

      {/* Logo */}
      <Animated.View
        style={[
          styles.logoImageContainer,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
          },
        ]}
      >
        <Image
          source={require('../assets/Logo_gpt.png')} // Make sure to add your logo here
          style={styles.logoImage}
          resizeMode="contain"
        />
      </Animated.View>

      {/* Main app text */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [
              { scale: scaleAnim },
              { translateY: moveUpAnim }
            ],
          },
        ]}
      >
        <Text style={styles.logoText}>BookMyPujari</Text>

        {/* Om symbol with pulse animation */}
        <Animated.Text
          style={[
            styles.omSymbol,
            {
              transform: [{ scale: omPulse }]
            }
          ]}
        >
          ॐ
        </Animated.Text>
      </Animated.View>

      {/* Tagline */}
      <Animated.Text
        style={[
          styles.tagline,
          { opacity: taglineOpacity }
        ]}
      >
        Book Your Pujari with Ease
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: APP_COLORS.white,
  },

  logoImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },

  logoImage: {
    width: 120,
    height: 120,
    // Add shadow for better visual effect
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },

  logoText: {
    fontSize: 38, // Slightly smaller to balance with logo
    fontWeight: 'bold',
    color: APP_COLORS.primary,
    textAlign: 'center',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginBottom: 10,
  },

  omSymbol: {
    fontSize: 64, // Slightly smaller to balance with logo
    color: APP_COLORS.primary,
    marginTop: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },

  tagline: {
    fontSize: 16,
    color: APP_COLORS.gray,
    textAlign: 'center',
    marginTop: 30,
    fontStyle: 'italic',
    maxWidth: '80%',
  },
});

export default SplashScreen;