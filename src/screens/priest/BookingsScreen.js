// src/screens/priest/BookingsScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import { useSelector } from 'react-redux';
import { APP_COLORS } from '../../config';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HEADER_TOP_PADDING = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 44;

const BookingsScreen = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState('upcoming');
  const [bookings, setBookings] = useState([
    {
      id: '1',
      ceremonyType: 'Wedding Ceremony',
      clientName: 'Sharma Family',
      date: new Date('2024-06-10'),
      startTime: '10:30 AM',
      endTime: '1:30 PM',
      location: {
        address: '123 Main Street, Mumbai',
        city: 'Mumbai'
      },
      status: 'confirmed',
      basePrice: 8000
    },
    {
      id: '2',
      ceremonyType: 'Grih Pravesh',
      clientName: 'Gupta Family',
      date: new Date('2024-06-12'),
      startTime: '4:00 PM',
      endTime: '6:00 PM',
      location: {
        address: '456 Park Avenue, Delhi',
        city: 'Delhi'
      },
      status: 'pending',
      basePrice: 5000
    }
  ]);

  const renderBookingItem = ({ item }) => {
    const bookingDate = new Date(item.date);
    const formattedDate = bookingDate.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    return (
      <TouchableOpacity
        style={styles.bookingCard}
        onPress={() => navigation.navigate('BookingDetails', { booking: item })}
      >
        <View style={styles.bookingHeader}>
          <Text style={styles.ceremonyType}>{item.ceremonyType}</Text>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor:
                  item.status === 'confirmed'
                    ? '#e6f7e6'
                    : item.status === 'completed'
                    ? '#e6f0ff'
                    : item.status === 'cancelled'
                    ? '#ffe6e6'
                    : '#fff9e6',
              },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                {
                  color:
                    item.status === 'confirmed'
                      ? APP_COLORS.success
                      : item.status === 'completed'
                      ? APP_COLORS.info
                      : item.status === 'cancelled'
                      ? APP_COLORS.error
                      : APP_COLORS.warning,
                },
              ]}
            >
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </View>
        </View>

        <View style={styles.clientInfo}>
          <Text style={styles.clientName}>{item.clientName}</Text>
        </View>

        <View style={styles.bookingDetails}>
          <View style={styles.detailRow}>
            <Ionicons name="calendar-outline" size={16} color={APP_COLORS.gray} />
            <Text style={styles.detailText}>{formattedDate}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="time-outline" size={16} color={APP_COLORS.gray} />
            <Text style={styles.detailText}>
              {item.startTime} - {item.endTime}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={16} color={APP_COLORS.gray} />
            <Text style={styles.detailText} numberOfLines={1}>
              {item.location.address}
            </Text>
          </View>
        </View>

        <View style={styles.bookingFooter}>
          <View style={styles.amountContainer}>
            <Text style={styles.amountLabel}>Amount:</Text>
            <Text style={styles.amountValue}>₹{item.basePrice}</Text>
          </View>
          <View style={styles.actionsContainer}>
            {item.status === 'pending' && (
              <>
                <TouchableOpacity style={styles.acceptButton}>
                  <Text style={styles.acceptButtonText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.declineButton}>
                  <Text style={styles.declineButtonText}>Decline</Text>
                </TouchableOpacity>
              </>
            )}
            {item.status === 'confirmed' && (
              <TouchableOpacity style={styles.viewButton}>
                <Text style={styles.viewButtonText}>View Details</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: APP_COLORS.background }}>
      <StatusBar backgroundColor={APP_COLORS.primary} barStyle="light-content" />
      <View style={[styles.header, { paddingTop: HEADER_TOP_PADDING, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 4, borderBottomWidth: 1, borderBottomColor: APP_COLORS.lightGray }]}>
        <Text style={styles.headerTitle}>Bookings</Text>
      </View>

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilter === 'today' && styles.activeFilterButton,
            ]}
            onPress={() => setSelectedFilter('today')}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === 'today' && styles.activeFilterText,
              ]}
            >
              Today
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilter === 'upcoming' && styles.activeFilterButton,
            ]}
            onPress={() => setSelectedFilter('upcoming')}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === 'upcoming' && styles.activeFilterText,
              ]}
            >
              Upcoming
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilter === 'pending' && styles.activeFilterButton,
            ]}
            onPress={() => setSelectedFilter('pending')}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === 'pending' && styles.activeFilterText,
              ]}
            >
              Pending
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilter === 'completed' && styles.activeFilterButton,
            ]}
            onPress={() => setSelectedFilter('completed')}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === 'completed' && styles.activeFilterText,
              ]}
            >
              Completed
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <FlatList
        data={bookings}
        renderItem={renderBookingItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
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
  filterContainer: {
    backgroundColor: APP_COLORS.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: APP_COLORS.lightGray,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: APP_COLORS.lightGray,
  },
  activeFilterButton: {
    backgroundColor: APP_COLORS.primary,
    borderColor: APP_COLORS.primary,
  },
  filterText: {
    color: APP_COLORS.gray,
  },
  activeFilterText: {
    color: APP_COLORS.white,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 16,
  },
  bookingCard: {
    backgroundColor: APP_COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ceremonyType: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  clientInfo: {
    marginBottom: 12,
  },
  clientName: {
    fontSize: 14,
    color: APP_COLORS.gray,
  },
  bookingDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: APP_COLORS.gray,
  },
  bookingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: APP_COLORS.lightGray,
    paddingTop: 12,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountLabel: {
    fontSize: 14,
    color: APP_COLORS.gray,
    marginRight: 4,
  },
  amountValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  acceptButton: {
    backgroundColor: APP_COLORS.success,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 8,
  },
  acceptButtonText: {
    color: APP_COLORS.white,
    fontWeight: 'bold',
  },
  declineButton: {
    backgroundColor: APP_COLORS.error,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 8,
  },
  declineButtonText: {
    color: APP_COLORS.white,
    fontWeight: 'bold',
  },
  viewButton: {
    borderWidth: 1,
    borderColor: APP_COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  viewButtonText: {
    color: APP_COLORS.primary,
    fontWeight: 'bold',
  },
});

export default BookingsScreen;