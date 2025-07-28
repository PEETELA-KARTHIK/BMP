// src/screens/devotee/HomeScreen.js
import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { APP_COLORS } from '../../config';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HEADER_TOP_PADDING = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 44;

const HomeScreen = ({ navigation }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState('');

  // Restore mock data for ceremonies
  const ceremonies = [
    {
      id: '1',
      name: 'Wedding',
      image: require('../../assets/wedding.jpg'),
    },
    {
      id: '2',
      name: 'Grih Pravesh',
      image: require('../../assets/home-rituals.jpg'),
    },
    {
      id: '3',
      name: 'Baby Naming',
      image: require('../../assets/baby-naming.jpg'),
    },
  ];

  // Mock data for recommended priests
  const recommendedPriests = [
    {
      id: '1',
      name: 'Dr. Rajesh Sharma',
      experience: 25,
      religion: 'Hinduism',
      rating: 4.9,
      totalRatings: 120,
      image: require('../../assets/pandit1.jpg'),
      specialties: ['Wedding', 'Grih Pravesh', 'Baby Naming'],
    },
    {
      id: '2',
      name: 'Pandit Arun Kumar',
      experience: 18,
      religion: 'Hinduism',
      rating: 4.8,
      totalRatings: 95,
      image: require('../../assets/pandit2.jpg'),
      specialties: ['Satyanarayan Katha', 'Festival Pujas', 'Baby Naming'],
    },
  ];

  const handleSearch = () => {
    navigation.navigate('PriestSearch', { searchQuery });
  };

  const handleCeremonyPress = (ceremony) => {
    navigation.navigate('PriestSearch', { ceremony: ceremony.name });
  };

  const handlePriestPress = (priest) => {
    navigation.navigate('PriestDetails', { priestId: priest.id });
  };

  return (
    <View style={{ flex: 1, backgroundColor: APP_COLORS.background }}>
      <StatusBar backgroundColor={APP_COLORS.primary} barStyle="light-content" />
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
        <View style={[styles.header, { paddingTop: HEADER_TOP_PADDING, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 4, borderBottomWidth: 1, borderBottomColor: APP_COLORS.lightGray }]}>
          <View style={styles.headerContent}>
            <Text style={styles.welcomeText}>Welcome, {userInfo?.name || 'Devotee'}</Text>
            <Text style={styles.headerTitle}>Find the Perfect Priest</Text>
            <Text style={styles.headerSubtitle}>
              Connect with experienced priests for your sacred ceremonies
            </Text>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color={APP_COLORS.gray} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for priests, ceremonies"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
            />
          </View>
        </View>

        <View style={styles.ceremoniesContainer}>
          <Text style={styles.sectionTitle}>Popular Ceremonies</Text>
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
            <TouchableOpacity
              style={[styles.ceremonyCard, styles.viewAllCard]}
              onPress={() => navigation.navigate('PriestSearch')}
            >
              <View style={styles.viewAllContent}>
                <Text style={styles.viewAllText}>View All</Text>
                <Ionicons name="arrow-forward" size={20} color={APP_COLORS.primary} />
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <View style={styles.priestsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended Priests</Text>
            <TouchableOpacity onPress={() => navigation.navigate('PriestSearch')}>
              <Text style={styles.viewAllTextSmall}>View All</Text>
            </TouchableOpacity>
          </View>

          {recommendedPriests.map((priest) => (
            <TouchableOpacity
              key={priest.id}
              style={styles.priestCard}
              onPress={() => handlePriestPress(priest)}
            >
              <Image source={priest.image} style={styles.priestImage} />
              <View style={styles.priestInfo}>
                <Text style={styles.priestName}>{priest.name}</Text>
                <View style={styles.priestDetails}>
                  <Text style={styles.priestDetail}>{priest.religion}</Text>
                  <Text style={styles.priestDetail}>{priest.experience} years exp</Text>
                </View>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.ratingText}>
                    {priest.rating} ({priest.totalRatings})
                  </Text>
                </View>
                <View style={styles.specialtiesContainer}>
                  {priest.specialties.slice(0, 2).map((specialty, index) => (
                    <View key={index} style={styles.specialtyBadge}>
                      <Text style={styles.specialtyText}>{specialty}</Text>
                    </View>
                  ))}
                  {priest.specialties.length > 2 && (
                    <View style={styles.specialtyBadge}>
                      <Text style={styles.specialtyText}>+{priest.specialties.length - 2} more</Text>
                    </View>
                  )}
                </View>
              </View>
              <View style={styles.bookNowContainer}>
                <TouchableOpacity
                  style={styles.bookNowButton}
                  onPress={() => navigation.navigate('Booking', { priestId: priest.id })}
                >
                  <Text style={styles.bookNowText}>Book Now</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.upcomingBookingsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Bookings</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Bookings')}>
              <Text style={styles.viewAllTextSmall}>View All</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.upcomingBookingCard}
            onPress={() => navigation.navigate('Bookings')}
          >
            <View style={styles.upcomingBookingContent}>
              <Ionicons name="calendar" size={24} color={APP_COLORS.primary} />
              <Text style={styles.upcomingBookingText}>View your upcoming ceremonies</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={APP_COLORS.gray} />
          </TouchableOpacity>
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
    marginBottom: 16,
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
  viewAllCard: {
    backgroundColor: APP_COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: APP_COLORS.lightGray,
    borderStyle: 'dashed',
  },
  viewAllContent: {
    alignItems: 'center',
  },
  viewAllText: {
    color: APP_COLORS.primary,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  priestsContainer: {
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
  priestCard: {
    backgroundColor: APP_COLORS.white,
    borderRadius: 10,
    marginBottom: 16,
    padding: 16,
    flexDirection: 'row',
    elevation: 2,
  },
  priestImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  priestInfo: {
    flex: 1,
    marginLeft: 12,
  },
  priestName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  priestDetails: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  priestDetail: {
    fontSize: 12,
    color: APP_COLORS.gray,
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 12,
    color: APP_COLORS.black,
    marginLeft: 4,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  specialtyBadge: {
    backgroundColor: APP_COLORS.primary + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  specialtyText: {
    fontSize: 10,
    color: APP_COLORS.primary,
  },
  bookNowContainer: {
    justifyContent: 'center',
  },
  bookNowButton: {
    backgroundColor: APP_COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  bookNowText: {
    color: APP_COLORS.white,
    fontWeight: 'bold',
    fontSize: 12,
  },
  upcomingBookingsContainer: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  upcomingBookingCard: {
    backgroundColor: APP_COLORS.white,
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  upcomingBookingContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  upcomingBookingText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default HomeScreen;