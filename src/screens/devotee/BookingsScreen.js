// src/screens/devotee/BookingsScreen.js - Updated with functional buttons and navigation
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { APP_COLORS } from '../../config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fetchBookings } from '../../redux/slices/bookingSlice';
import { formatCurrency, formatDate } from '../../utils/formatUtils';

const BookingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.auth);
  const { bookings: reduxBookings, isLoading } = useSelector(state => state.booking);

  const [selectedFilter, setSelectedFilter] = useState('upcoming');
  const [refreshing, setRefreshing] = useState(false);

  // Sample bookings data (replace with Redux data when available)
  const [bookings, setBookings] = useState([
    {
      id: '1',
      ceremonyType: 'Wedding Ceremony',
      priestName: 'Dr. Rajesh Sharma',
      priestId: 'P001',
      date: new Date('2024-06-10'),
      startTime: '10:30 AM',
      endTime: '1:30 PM',
      location: {
        address: '123 Main Street, Mumbai',
        city: 'Mumbai',
        landmark: 'Near City Mall'
      },
      status: 'confirmed',
      paymentStatus: 'partial',
      basePrice: 8000,
      advance: 3000,
      remaining: 5000,
      rated: false,
      ceremony: {
        type: 'Wedding Ceremony',
        name: 'Hindu Wedding',
        duration: '3 hours',
        image: require('../../assets/wedding.jpg'),
      },
      priest: {
        id: 'P001',
        name: 'Dr. Rajesh Sharma',
        image: require('../../assets/pandit1.jpg'),
      },
      devotee: {
        name: userInfo?.name || 'Current User',
        phone: userInfo?.phone || '+91 9876543210',
        email: userInfo?.email || 'user@example.com',
        image: require('../../assets/default-profile.png'),
      }
    },
    {
      id: '2',
      ceremonyType: 'Baby Naming',
      priestName: 'Pandit Arun Kumar',
      priestId: 'P002',
      date: new Date('2024-06-15'),
      startTime: '9:00 AM',
      endTime: '11:00 AM',
      location: {
        address: '456 Park Avenue, Delhi',
        city: 'Delhi',
        landmark: 'Near Metro Station'
      },
      status: 'pending',
      paymentStatus: 'pending',
      basePrice: 5000,
      advance: 2000,
      remaining: 3000,
      rated: false,
      ceremony: {
        type: 'Baby Naming',
        name: 'Namkaran Ceremony',
        duration: '2 hours',
        image: require('../../assets/baby-naming.jpg'),
      },
      priest: {
        id: 'P002',
        name: 'Pandit Arun Kumar',
        image: require('../../assets/pandit2.jpg'),
      },
      devotee: {
        name: userInfo?.name || 'Current User',
        phone: userInfo?.phone || '+91 9876543210',
        email: userInfo?.email || 'user@example.com',
        image: require('../../assets/default-profile.png'),
      }
    },
    {
      id: '3',
      ceremonyType: 'Housewarming',
      priestName: 'Pandit Mohan Lal',
      priestId: 'P003',
      date: new Date('2024-05-20'),
      startTime: '11:00 AM',
      endTime: '2:00 PM',
      location: {
        address: '789 Garden Street, Bangalore',
        city: 'Bangalore',
        landmark: 'Near Shopping Complex'
      },
      status: 'completed',
      paymentStatus: 'paid',
      basePrice: 6000,
      advance: 6000,
      remaining: 0,
      rated: false,
      ceremony: {
        type: 'Housewarming',
        name: 'Griha Pravesh',
        duration: '3 hours',
        image: require('../../assets/housewarming.png'),
      },
      priest: {
        id: 'P003',
        name: 'Pandit Mohan Lal',
        image: require('../../assets/pandit2.jpg'),
      },
      devotee: {
        name: userInfo?.name || 'Current User',
        phone: userInfo?.phone || '+91 9876543210',
        email: userInfo?.email || 'user@example.com',
        image: require('../../assets/default-profile.png'),
      }
    }
  ]);

  useEffect(() => {
    // Fetch bookings when component mounts
    if (userInfo?.id) {
      dispatch(fetchBookings(userInfo.id));
    }
  }, [dispatch, userInfo?.id]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      if (userInfo?.id) {
        await dispatch(fetchBookings(userInfo.id));
      }
    } catch (error) {
      console.error('Refresh error:', error);
    } finally {
      setRefreshing(false);
    }
  };

  // Handle Pay Now button
  const handlePayNow = (booking) => {
    const paymentType = booking.paymentStatus === 'pending' ? 'advance' : 'remaining';
    const bookingWithPaymentType = {
      ...booking,
      paymentType: paymentType,
      amount: booking.basePrice,
    };

    navigation.navigate('Payment', {
      booking: bookingWithPaymentType,
    });
  };

  // Handle Rate Now button
  const handleRateNow = (booking) => {
    if (booking.status !== 'completed') {
      Alert.alert('Cannot Rate', 'You can only rate completed ceremonies.');
      return;
    }

    if (booking.rated) {
      Alert.alert('Already Rated', 'You have already rated this ceremony.');
      return;
    }

    navigation.navigate('Rating', {
      booking: booking,
    });
  };

  // Handle View Details button
  const handleViewDetails = (booking) => {
    navigation.navigate('BookingDetails', {
      booking: booking,
    });
  };

  // Navigate to booking details when card is pressed
  const handleBookingPress = (booking) => {
    navigation.navigate('BookingDetails', {
      booking: booking,
    });
  };

  const renderBookingItem = ({ item }) => {
    const bookingDate = new Date(item.date);
    const formattedDate = bookingDate.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    const getStatusColor = (status) => {
      switch (status) {
        case 'confirmed':
          return {
            backgroundColor: '#e6f7e6',
            color: APP_COLORS.success,
          };
        case 'completed':
          return {
            backgroundColor: '#e6f0ff',
            color: APP_COLORS.info,
          };
        case 'cancelled':
          return {
            backgroundColor: '#ffe6e6',
            color: APP_COLORS.error,
          };
        case 'pending':
          return {
            backgroundColor: '#fff9e6',
            color: APP_COLORS.warning,
          };
        default:
          return {
            backgroundColor: '#f5f5f5',
            color: APP_COLORS.gray,
          };
      }
    };

    const statusStyle = getStatusColor(item.status);

    return (
      <TouchableOpacity
        style={styles.bookingCard}
        onPress={() => handleBookingPress(item)}
        activeOpacity={0.7}
      >
        <View style={styles.bookingHeader}>
          <Text style={styles.ceremonyType}>{item.ceremonyType}</Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: statusStyle.backgroundColor }
            ]}
          >
            <Text
              style={[
                styles.statusText,
                { color: statusStyle.color }
              ]}
            >
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </View>
        </View>

        <View style={styles.priestInfo}>
          <Text style={styles.priestName}>{item.priestName}</Text>
          {item.paymentStatus && (
            <Text style={styles.paymentStatus}>
              Payment: {item.paymentStatus.charAt(0).toUpperCase() + item.paymentStatus.slice(1)}
            </Text>
          )}
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
            <Text style={styles.amountValue}>
              {formatCurrency ? formatCurrency(item.basePrice) : `₹${item.basePrice}`}

            </Text>
          </View>

          <View style={styles.actionsContainer}>
            {item.status === 'pending' && (
              <TouchableOpacity
                style={styles.payButton}
                onPress={() => handlePayNow(item)}
              >
                <Text style={styles.payButtonText}>Pay Now</Text>
              </TouchableOpacity>
            )}

            {item.status === 'confirmed' && item.paymentStatus !== 'paid' && (
              <TouchableOpacity
                style={styles.payButton}
                onPress={() => handlePayNow(item)}
              >
                <Text style={styles.payButtonText}>
                  {item.paymentStatus === 'pending' ? 'Pay Advance' : 'Pay Remaining'}
                </Text>
              </TouchableOpacity>
            )}

            {item.status === 'confirmed' && (
              <TouchableOpacity
                style={styles.viewButton}
                onPress={() => handleViewDetails(item)}
              >
                <Text style={styles.viewButtonText}>View Details</Text>
              </TouchableOpacity>
            )}

            {item.status === 'completed' && !item.rated && (
              <TouchableOpacity
                style={styles.rateButton}
                onPress={() => handleRateNow(item)}
              >
                <Text style={styles.rateButtonText}>Rate Priest</Text>
              </TouchableOpacity>
            )}

            {item.status === 'completed' && item.rated && (
              <TouchableOpacity
                style={styles.viewButton}
                onPress={() => handleViewDetails(item)}
              >
                <Text style={styles.viewButtonText}>View Details</Text>
              </TouchableOpacity>
            )}

            {item.status === 'cancelled' && (
              <TouchableOpacity
                style={styles.viewButton}
                onPress={() => handleViewDetails(item)}
              >
                <Text style={styles.viewButtonText}>View Details</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const filteredBookings = bookings.filter((booking) => {
    const currentDate = new Date();
    const bookingDate = new Date(booking.date);

    if (selectedFilter === 'upcoming') {
      return booking.status === 'confirmed' && bookingDate >= currentDate;
    } else if (selectedFilter === 'pending') {
      return booking.status === 'pending';
    } else if (selectedFilter === 'past') {
      return booking.status === 'completed' || booking.status === 'cancelled' ||
             (bookingDate < currentDate && booking.status !== 'pending');
    }
    return true; // 'all' filter
  });

  const getFilterCount = (filter) => {
    return bookings.filter((booking) => {
      const currentDate = new Date();
      const bookingDate = new Date(booking.date);

      if (filter === 'upcoming') {
        return booking.status === 'confirmed' && bookingDate >= currentDate;
      } else if (filter === 'pending') {
        return booking.status === 'pending';
      } else if (filter === 'past') {
        return booking.status === 'completed' || booking.status === 'cancelled' ||
               (bookingDate < currentDate && booking.status !== 'pending');
      }
      return true;
    }).length;
  };

  if (isLoading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={APP_COLORS.primary} />
        <Text style={styles.loadingText}>Loading bookings...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Bookings</Text>
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={onRefresh}
          disabled={refreshing}
        >
          <Ionicons
            name="refresh"
            size={20}
            color={APP_COLORS.primary}
            style={refreshing ? styles.rotating : null}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilter === 'all' && styles.activeFilterButton,
            ]}
            onPress={() => setSelectedFilter('all')}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === 'all' && styles.activeFilterText,
              ]}
            >
              All ({bookings.length})
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
              Upcoming ({getFilterCount('upcoming')})
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
              Pending ({getFilterCount('pending')})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilter === 'past' && styles.activeFilterButton,
            ]}
            onPress={() => setSelectedFilter('past')}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === 'past' && styles.activeFilterText,
              ]}
            >
              Past ({getFilterCount('past')})
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {filteredBookings.length > 0 ? (
        <FlatList
          data={filteredBookings}
          renderItem={renderBookingItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[APP_COLORS.primary]}
            />
          }
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="calendar-outline" size={60} color={APP_COLORS.lightGray} />
          <Text style={styles.emptyText}>
            {selectedFilter === 'all'
              ? 'No bookings found'
              : `No ${selectedFilter} bookings`}
          </Text>

          <Text style={styles.emptySubtext}>
            {selectedFilter === 'all'
              ? 'Book a priest for your ceremony and it will show up here'
              : 'You dont have any ${selectedFilter} bookings at the moment'}
          </Text>
          <TouchableOpacity
            style={styles.bookNowButton}
            onPress={() => navigation.navigate('DevoteeTabs', { screen: 'Search' })}
          >
            <Text style={styles.bookNowText}>Find Priests</Text>
          </TouchableOpacity>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: APP_COLORS.background,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: APP_COLORS.gray,
  },
  header: {
    backgroundColor: APP_COLORS.white,
    padding: 16,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: APP_COLORS.lightGray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: APP_COLORS.black,
  },
  refreshButton: {
    padding: 8,
  },
  rotating: {
    transform: [{ rotate: '180deg' }],
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
    backgroundColor: APP_COLORS.white,
  },
  activeFilterButton: {
    backgroundColor: APP_COLORS.primary,
    borderColor: APP_COLORS.primary,
  },
  filterText: {
    color: APP_COLORS.gray,
    fontSize: 14,
    fontWeight: '500',
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
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    color: APP_COLORS.black,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  priestInfo: {
    marginBottom: 12,
  },
  priestName: {
    fontSize: 14,
    color: APP_COLORS.gray,
    fontWeight: '500',
  },
  paymentStatus: {
    fontSize: 12,
    color: APP_COLORS.warning,
    marginTop: 2,
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
    flex: 1,
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
    color: APP_COLORS.black,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  payButton: {
    backgroundColor: APP_COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  payButtonText: {
    color: APP_COLORS.white,
    fontWeight: 'bold',
    fontSize: 12,
  },
  viewButton: {
    borderWidth: 1,
    borderColor: APP_COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: APP_COLORS.white,
  },
  viewButtonText: {
    color: APP_COLORS.primary,
    fontWeight: 'bold',
    fontSize: 12,
  },
  rateButton: {
    backgroundColor: '#FF9800',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  rateButtonText: {
    color: APP_COLORS.white,
    fontWeight: 'bold',
    fontSize: 12,
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
    color: APP_COLORS.black,
  },
  emptySubtext: {
    fontSize: 14,
    color: APP_COLORS.gray,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  bookNowButton: {
    backgroundColor: APP_COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  bookNowText: {
    color: APP_COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default BookingsScreen;