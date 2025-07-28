// src/screens/priest/HomeScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
  Platform,
  Dimensions,
} from 'react-native';
import { useSelector } from 'react-redux';
import { APP_COLORS } from '../../config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const HEADER_TOP_PADDING = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 44;
const CARD_WIDTH = Math.floor(Dimensions.get('window').width * 0.7);

const HomeScreen = (props) => {
  const rootNavigation = useNavigation();
  const { userInfo } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileBanner, setShowProfileBanner] = useState(true); // Profile completion banner
  const [isAvailable, setIsAvailable] = useState(true); // Availability toggle
  const [currentTip, setCurrentTip] = useState(0); // For rotating tips

  // Example ceremonies for priests (can be customized)
  const ceremonies = [
    {
      id: '1',
      name: 'Wedding',
      image: require('../../assets/wedding.jpg'),
    },
    {
      id: '2',
      name: 'Housewarming',
      image: require('../../assets/housewarming.png'),
    },
    {
      id: '3',
      name: 'Baby Naming',
      image: require('../../assets/baby-naming.jpg'),
    },
  ];

  // Example upcoming bookings for priests
  const upcomingBookings = [
    {
      id: '1',
      devotee: 'Amit Sharma',
      ceremony: 'Wedding',
      date: '2024-06-10',
      time: '10:00 AM',
    },
    {
      id: '2',
      devotee: 'Priya Verma',
      ceremony: 'Housewarming',
      date: '2024-06-12',
      time: '2:00 PM',
    },
  ];

  const handleSearch = () => {
    // Optionally implement search for ceremonies/bookings
  };

  const handleCeremonyPress = (ceremony) => {
    rootNavigation.navigate('AvailableOffersScreen', { ceremony });
  };

  // Mock: Assume profile is incomplete if userInfo?.profileComplete is falsey
  const isProfileComplete = userInfo?.profileComplete;

  // Mock notifications
  const notifications = [
    { id: 1, message: 'You have a new booking request from Priya Verma.', read: false },
    { id: 2, message: 'Your withdrawal was successful.', read: true },
  ];
  const unreadCount = notifications.filter(n => !n.read).length;
  const latestNotification = notifications[0];

  // Mock tips
  const tips = [
    'Respond quickly to booking requests for higher ratings!',
    'Keep your profile updated for more visibility.',
    'Set your availability to attract more devotees.',
  ];

  // Rotate tips every 6 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [tips.length]);

  return (
    <View style={{ flex: 1, backgroundColor: APP_COLORS.background }}>
      <StatusBar backgroundColor={APP_COLORS.primary} barStyle="light-content" />
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
        {/* Header with Notifications Preview */}
        <View style={[styles.header, { paddingTop: HEADER_TOP_PADDING, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 4, borderBottomWidth: 1, borderBottomColor: APP_COLORS.lightGray }]}>
          <View style={styles.headerRow}>
            <View style={styles.headerContent}>
              <Text style={styles.welcomeText}>Welcome, {userInfo?.name || 'Pandit'}</Text>
              <Text style={styles.headerTitle}>Your Dashboard</Text>
              <Text style={styles.headerSubtitle}>
                Manage your ceremonies, bookings, and earnings
              </Text>
            </View>
            <TouchableOpacity style={styles.notificationBell} onPress={() => props.navigation.navigate('Notifications')}>
              <Ionicons name="notifications-outline" size={28} color={APP_COLORS.white} />
              {unreadCount > 0 && (
                <View style={styles.notificationBadge} />
              )}
            </TouchableOpacity>
          </View>
          {latestNotification && (
            <View style={styles.notificationPreview}>
              <Ionicons name="alert-circle-outline" size={18} color={APP_COLORS.info} style={{ marginRight: 6 }} />
              <Text style={styles.notificationPreviewText} numberOfLines={1}>{latestNotification.message}</Text>
            </View>
          )}
        </View>

        {/* Profile Completion Banner */}
        {showProfileBanner && !isProfileComplete && (
          <View style={styles.profileBanner}>
            <Text style={styles.profileBannerText}>Complete your profile to get more bookings!</Text>
            <TouchableOpacity onPress={() => setShowProfileBanner(false)}>
              <Ionicons name="close" size={18} color={APP_COLORS.white} />
            </TouchableOpacity>
          </View>
        )}

        {/* Earnings Summary Card */}
        <View style={styles.earningsCard}>
          <View style={styles.earningsInfo}>
            <Text style={styles.earningsLabel}>Earnings This Month</Text>
            <View style={styles.earningsRow}>
              <Text style={styles.earningsAmount}>₹24,500</Text>
              <View style={styles.earningsTrend}>
                <Ionicons name="arrow-up" size={16} color={APP_COLORS.success} />
                <Text style={styles.earningsTrendText}>+12%</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.withdrawButton}>
            <Text style={styles.withdrawButtonText}>Withdraw</Text>
          </TouchableOpacity>
        </View>

        {/* Availability Status Toggle */}
        <View style={styles.availabilityContainer}>
          <Text style={styles.availabilityLabel}>Availability:</Text>
          <TouchableOpacity
            style={[styles.availabilityToggle, isAvailable ? styles.available : styles.unavailable]}
            onPress={() => setIsAvailable((prev) => !prev)}
          >
            <View style={[styles.availabilityDot, isAvailable ? styles.availableDot : styles.unavailableDot]} />
            <Text style={[styles.availabilityText, isAvailable ? styles.availableText : styles.unavailableText]}>
              {isAvailable ? 'Online' : 'Offline'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Ceremonies Section */}
        <View style={styles.ceremoniesContainer}>
          <Text style={styles.sectionTitle}>Your Ceremonies</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.ceremoniesScroll}
          >
            {ceremonies.map((ceremony) => (
              <TouchableOpacity
                key={ceremony.id}
                style={styles.ceremonyCard}
                onPress={() => handleCeremonyPress(ceremony)}
              >
                <Image source={ceremony.image} style={styles.ceremonyImage} />
                <View style={styles.ceremonyOverlay} />
                <Text style={styles.ceremonyName}>{ceremony.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Upcoming Bookings Section */}
        <View style={styles.upcomingBookingsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Bookings</Text>
            <TouchableOpacity onPress={() => props.navigation.navigate('Bookings')}>
              <Text style={styles.viewAllTextSmall}>View All</Text>
            </TouchableOpacity>
          </View>
          {upcomingBookings.map((booking) => (
            <View key={booking.id} style={styles.upcomingBookingCard}>
              <View style={styles.upcomingBookingContent}>
                <Ionicons name="calendar" size={24} color={APP_COLORS.primary} />
                <View style={{ flex: 1, flexWrap: 'wrap' }}>
                  <Text style={styles.upcomingBookingText} numberOfLines={3} ellipsizeMode='tail'>
                    {booking.ceremony} for {booking.devotee} on {booking.date} at {booking.time}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Recent Reviews Section */}
        <View style={styles.reviewsContainer}>
          <Text style={styles.sectionTitle}>Recent Reviews</Text>
          {[{
            id: '1',
            devotee: 'Amit Sharma',
            rating: 5,
            comment: 'Very knowledgeable and punctual! Highly recommended.',
          }, {
            id: '2',
            devotee: 'Priya Verma',
            rating: 4,
            comment: 'Great experience, the ceremony was well conducted.',
          }, {
            id: '3',
            devotee: 'Rahul Singh',
            rating: 5,
            comment: 'Very polite and professional priest.',
          }].map((review, index) => (
            <View key={review.id} style={[styles.reviewItem, index === 2 ? {} : { borderBottomWidth: 1, borderBottomColor: APP_COLORS.lightGray }]}>
              <Text style={styles.reviewDevotee}>{review.devotee}</Text>
              <View style={styles.reviewStars}>
                {[...Array(5)].map((_, i) => (
                  <Ionicons
                    key={i}
                    name={i < review.rating ? 'star' : 'star-outline'}
                    size={16}
                    color={APP_COLORS.primary}
                  />
                ))}
              </View>
              <Text style={styles.reviewComment}>{review.comment}</Text>
            </View>
          ))}
        </View>

        {/* Tips/Best Practices Rotating Banner */}
        <View style={styles.tipsBanner}>
          <Ionicons name="bulb-outline" size={15} color={APP_COLORS.primary} style={{ marginRight: 6 }} />
          <Text style={styles.tipsBannerText}>{tips[currentTip]}</Text>
        </View>
      </ScrollView>
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
    paddingBottom: 24,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    // Top padding is now handled dynamically
  },
  headerContent: {
    paddingHorizontal: 16,
  },
  welcomeText: {
    color: APP_COLORS.white,
    opacity: 0.8,
    fontSize: 14,
    marginBottom: 4,
  },
  headerTitle: {
    color: APP_COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    color: APP_COLORS.white,
    opacity: 0.9,
    fontSize: 14,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: APP_COLORS.white,
    borderRadius: 8,
    padding: 12,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  ceremoniesContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  ceremoniesScroll: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  ceremonyCard: {
    width: 140,
    height: 180,
    borderRadius: 10,
    marginRight: 12,
    overflow: 'hidden',
  },
  ceremonyImage: {
    width: '100%',
    height: '100%',
  },
  ceremonyOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  ceremonyName: {
    position: 'absolute',
    bottom: 16,
    left: 12,
    color: APP_COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  upcomingBookingsContainer: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllTextSmall: {
    color: APP_COLORS.primary,
    fontSize: 14,
  },
  upcomingBookingCard: {
    backgroundColor: APP_COLORS.white,
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    marginBottom: 12,
  },
  upcomingBookingContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  upcomingBookingText: {
    marginLeft: 12,
    fontSize: 14,
    fontWeight: '500',
    flexShrink: 1,
    width: '100%',
  },
  earningsCard: {
    backgroundColor: APP_COLORS.white,
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    justifyContent: 'space-between',
  },
  earningsInfo: {
    flex: 1,
  },
  earningsLabel: {
    color: APP_COLORS.gray,
    fontSize: 14,
    marginBottom: 4,
  },
  earningsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  earningsAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: APP_COLORS.primary,
    marginRight: 12,
  },
  earningsTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: APP_COLORS.success + '20',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  earningsTrendText: {
    color: APP_COLORS.success,
    fontSize: 14,
    marginLeft: 2,
    fontWeight: 'bold',
  },
  withdrawButton: {
    backgroundColor: APP_COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 16,
  },
  withdrawButtonText: {
    color: APP_COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  quickAction: {
    flex: 1,
    alignItems: 'center',
  },
  quickActionIconContainer: {
    backgroundColor: APP_COLORS.primary + '10',
    borderRadius: 24,
    padding: 12,
    marginBottom: 4,
  },
  quickActionLabel: {
    fontSize: 12,
    color: APP_COLORS.primary,
    fontWeight: 'bold',
  },
  reviewsContainer: {
    marginBottom: 24,
  },
  reviewItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  reviewDevotee: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
    color: APP_COLORS.primary,
  },
  reviewStars: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  reviewComment: {
    fontSize: 13,
    color: APP_COLORS.gray,
  },
  reviewDivider: {
    borderBottomWidth: 1,
    borderBottomColor: APP_COLORS.lightGray,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
  },
  notificationBell: {
    marginTop: 8,
    marginRight: 8,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: APP_COLORS.error,
    borderWidth: 1,
    borderColor: APP_COLORS.white,
  },
  notificationPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: APP_COLORS.white,
    borderRadius: 8,
    marginTop: 10,
    marginHorizontal: 16,
    padding: 8,
    elevation: 1,
  },
  notificationPreviewText: {
    color: APP_COLORS.info,
    fontSize: 13,
    flex: 1,
  },
  profileBanner: {
    backgroundColor: APP_COLORS.warning,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    marginHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 12,
  },
  profileBannerText: {
    color: APP_COLORS.white,
    fontWeight: 'bold',
    fontSize: 14,
    flex: 1,
    marginRight: 8,
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  availabilityLabel: {
    fontSize: 14,
    color: APP_COLORS.gray,
    marginRight: 8,
  },
  availabilityToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  available: {
    backgroundColor: APP_COLORS.success + '20',
  },
  unavailable: {
    backgroundColor: APP_COLORS.error + '20',
  },
  availabilityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  availableDot: {
    backgroundColor: APP_COLORS.success,
  },
  unavailableDot: {
    backgroundColor: APP_COLORS.error,
  },
  availabilityText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  availableText: {
    color: APP_COLORS.success,
  },
  unavailableText: {
    color: APP_COLORS.error,
  },
  upcomingCeremoniesContainer: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  ceremonyListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: APP_COLORS.white,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    elevation: 1,
  },
  ceremonyListTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: APP_COLORS.primary,
  },
  ceremonyListSub: {
    fontSize: 13,
    color: APP_COLORS.gray,
  },
  tipsBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: APP_COLORS.background,
    borderRadius: 6,
    margin: 10,
    padding: 6,
    elevation: 1,
  },
  tipsBannerText: {
    color: APP_COLORS.primary,
    fontSize: 13,
    fontWeight: 'bold',
    flex: 1,
  },
});

export default HomeScreen;