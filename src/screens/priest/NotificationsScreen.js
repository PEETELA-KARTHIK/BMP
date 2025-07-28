// src/screens/priest/NotificationsScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import { APP_COLORS } from '../../config';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HEADER_TOP_PADDING = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 44;

const NotificationsScreen = ({ navigation }) => {
  const notifications = [
    {
      id: '1',
      title: 'New Booking Request',
      message: 'You have a new booking request for Satyanarayan Katha from the Gupta Family.',
      time: '2 hours ago',
      read: false,
      type: 'booking',
    },
    {
      id: '2',
      title: 'Payment Received',
      message: 'You have received a payment of ₹11,000 for Satyanarayan Katha.',
      time: '1 day ago',
      read: true,
      type: 'payment',
    },
    {
      id: '3',
      title: 'Booking Reminder',
      message: 'You have a Grih Pravesh ceremony scheduled tomorrow at 10:30 AM.',
      time: '2 days ago',
      read: true,
      type: 'reminder',
    },
  ];

  const renderNotificationItem = ({ item }) => {
    let iconName;
    let iconColor;

    switch (item.type) {
      case 'booking':
        iconName = 'calendar';
        iconColor = APP_COLORS.primary;
        break;
      case 'payment':
        iconName = 'wallet';
        iconColor = APP_COLORS.success;
        break;
      case 'reminder':
        iconName = 'alarm';
        iconColor = APP_COLORS.warning;
        break;
      default:
        iconName = 'notifications';
        iconColor = APP_COLORS.gray;
    }

    return (
      <TouchableOpacity
        style={[
          styles.notificationCard,
          !item.read && styles.unreadNotification,
        ]}
        onPress={() => {
          // Handle notification tap
          if (item.type === 'booking') {
            navigation.navigate('Bookings');
          }
        }}
      >
        <View style={[styles.iconContainer, { backgroundColor: iconColor + '20' }]}>
          <Ionicons name={iconName} size={24} color={iconColor} />
        </View>
        <View style={styles.notificationContent}>
          <View style={styles.notificationHeader}>
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <Text style={styles.notificationTime}>{item.time}</Text>
          </View>
          <Text style={styles.notificationMessage}>{item.message}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: APP_COLORS.background }}>
      <StatusBar backgroundColor={APP_COLORS.primary} barStyle="light-content" />
      <View style={[styles.header, { paddingTop: HEADER_TOP_PADDING, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 4, borderBottomWidth: 1, borderBottomColor: APP_COLORS.lightGray }]}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity>
          <Text style={styles.markAllText}>Mark all as read</Text>
        </TouchableOpacity>
      </View>

      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.notificationsList}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="notifications-off" size={60} color={APP_COLORS.lightGray} />
          <Text style={styles.emptyText}>No notifications yet</Text>
          <Text style={styles.emptySubtext}>
            You'll be notified about new bookings, payments, and reminders.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.background,
  },
  header: {
    backgroundColor: APP_COLORS.primary,
    paddingHorizontal: 16,
    paddingBottom: 16,
    // Top padding is now handled dynamically
  },
  headerTitle: {
    color: APP_COLORS.white,
    fontSize: 22,
    fontWeight: 'bold',
  },
  markAllText: {
    color: APP_COLORS.primary,
    fontWeight: '500',
  },
  notificationsList: {
    padding: 16,
  },
  notificationCard: {
    backgroundColor: APP_COLORS.white,
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    elevation: 2,
  },
  unreadNotification: {
    borderLeftWidth: 4,
    borderLeftColor: APP_COLORS.primary,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationTime: {
    fontSize: 12,
    color: APP_COLORS.gray,
  },
  notificationMessage: {
    fontSize: 14,
    color: APP_COLORS.black,
    lineHeight: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: APP_COLORS.gray,
    textAlign: 'center',
  },
});

export default NotificationsScreen;