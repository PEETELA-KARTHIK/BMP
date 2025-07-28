// src/screens/devotee/PriestSearchScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import { APP_COLORS } from '../../config';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PriestSearchScreen = ({ navigation, route }) => {
  const initialSearchQuery = route.params?.searchQuery || '';
  const initialCeremony = route.params?.ceremony || '';

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCeremony, setSelectedCeremony] = useState(initialCeremony);
  const [selectedReligion, setSelectedReligion] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Mock data for ceremonies
  const ceremonies = [
    'Wedding',
    'Grih Pravesh',
    'Baby Naming',
    'Satyanarayan Katha',
    'Festival Pujas',
    'Funeral Ceremony',
    'All Ceremonies',
  ];

  // Mock data for religions
  const religions = [
    'Hinduism',
    'Buddhism',
    'Jainism',
    'Sikhism',
  ];

  // Mock data for ratings
  const ratings = [
    '4.5 & above',
    '4.0 & above',
    '3.5 & above',
    'Any rating',
  ];

  // Mock data for priests
  const [priests, setPriests] = useState([
    {
      id: '1',
      name: 'Dr. Rajesh Sharma',
      experience: 25,
      religion: 'Hinduism',
      rating: 4.9,
      totalRatings: 120,
      image: require('../../assets/pandit1.jpg'),
      specialties: ['Wedding', 'Grih Pravesh', 'Baby Naming'],
      available: true,
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
      available: false,
    },
    {
      id: '3',
      name: 'Acharya Mohan Trivedi',
      experience: 30,
      religion: 'Hinduism',
      rating: 4.7,
      totalRatings: 150,
      image: require('../../assets/default-profile.png'),
      specialties: ['Wedding', 'Festival Pujas', 'Funeral Ceremony'],
      available: true,
    },
    {
      id: '4',
      name: 'Pandit Rakesh Joshi',
      experience: 15,
      religion: 'Hinduism',
      rating: 4.5,
      totalRatings: 85,
      image: require('../../assets/default-profile.png'),
      specialties: ['Baby Naming', 'Grih Pravesh', 'Festival Pujas'],
      available: true,
    },
  ]);

  // Filter priests based on search criteria
  const filteredPriests = priests.filter((priest) => {
    // Filter by search query
    if (searchQuery && !priest.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Filter by ceremony
    if (selectedCeremony && selectedCeremony !== 'All Ceremonies') {
      if (!priest.specialties.includes(selectedCeremony)) {
        return false;
      }
    }

    // Filter by religion
    if (selectedReligion && priest.religion !== selectedReligion) {
      return false;
    }

    // Filter by rating
    if (selectedRating) {
      let minRating = 0;
      if (selectedRating === '4.5 & above') minRating = 4.5;
      else if (selectedRating === '4.0 & above') minRating = 4.0;
      else if (selectedRating === '3.5 & above') minRating = 3.5;

      if (priest.rating < minRating) {
        return false;
      }
    }

    return true;
  });

  const handleSearch = () => {
    // Implement search logic if needed
  };

  const handleCeremonySelect = (ceremony) => {
    setSelectedCeremony(ceremony === selectedCeremony ? '' : ceremony);
  };

  const handlePriestPress = (priest) => {
    navigation.navigate('PriestDetails', { priestId: priest.id });
  };

  const renderPriestItem = ({ item }) => (
    <TouchableOpacity
      style={styles.priestCard}
      onPress={() => handlePriestPress(item)}
    >
      <Image source={item.image} style={styles.priestImage} />
      <View style={styles.priestInfo}>
        <Text style={styles.priestName}>{item.name}</Text>
        <View style={styles.priestMeta}>
          <Text style={styles.priestDetail}>{item.religion}</Text>
          <Text style={styles.priestDetail}>{item.experience} yrs exp</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>
            {item.rating} ({item.totalRatings})
          </Text>
        </View>
        <View style={styles.specialtiesContainer}>
          {item.specialties.slice(0, 2).map((specialty, index) => (
            <View key={index} style={styles.specialtyBadge}>
              <Text style={styles.specialtyText}>{specialty}</Text>
            </View>
          ))}
          {item.specialties.length > 2 && (
            <View style={styles.specialtyBadge}>
              <Text style={styles.specialtyText}>+{item.specialties.length - 2} more</Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.priestStatus}>
        <View style={[
          styles.statusIndicator,
          item.available ? styles.availableIndicator : styles.unavailableIndicator
        ]} />
        <Text style={[
          styles.statusText,
          item.available ? styles.availableText : styles.unavailableText
        ]}>
          {item.available ? 'Available' : 'Busy'}
        </Text>
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => navigation.navigate('Booking', { priestId: item.id })}
          disabled={!item.available}
        >
          <Text style={styles.bookButtonText}>Book</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={APP_COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Find Priests</Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Ionicons name="options-outline" size={24} color={APP_COLORS.black} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={APP_COLORS.gray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search priests by name"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => setSearchQuery('')}
            >
              <Ionicons name="close-circle" size={20} color={APP_COLORS.gray} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {showFilters && (
        <View style={styles.filtersContainer}>
          <Text style={styles.filterTitle}>Ceremonies</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScroll}
          >
            {ceremonies.map((ceremony) => (
              <TouchableOpacity
                key={ceremony}
                style={[
                  styles.filterChip,
                  selectedCeremony === ceremony && styles.selectedFilterChip,
                ]}
                onPress={() => handleCeremonySelect(ceremony)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    selectedCeremony === ceremony && styles.selectedFilterChipText,
                  ]}
                >
                  {ceremony}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.filterRow}>
            <View style={styles.filterColumn}>
              <Text style={styles.filterTitle}>Religion</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.filterScroll}
              >
                {religions.map((religion) => (
                  <TouchableOpacity
                    key={religion}
                    style={[
                      styles.filterChip,
                      selectedReligion === religion && styles.selectedFilterChip,
                    ]}
                    onPress={() => setSelectedReligion(religion === selectedReligion ? '' : religion)}
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        selectedReligion === religion && styles.selectedFilterChipText,
                      ]}
                    >
                      {religion}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            <View style={styles.filterColumn}>
              <Text style={styles.filterTitle}>Rating</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.filterScroll}
              >
                {ratings.map((rating) => (
                  <TouchableOpacity
                    key={rating}
                    style={[
                      styles.filterChip,
                      selectedRating === rating && styles.selectedFilterChip,
                    ]}
                    onPress={() => setSelectedRating(rating === selectedRating ? '' : rating)}
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        selectedRating === rating && styles.selectedFilterChipText,
                      ]}
                    >
                      {rating}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>

          <View style={styles.filterActions}>
            <TouchableOpacity
              style={styles.clearFiltersButton}
              onPress={() => {
                setSelectedCeremony('');
                setSelectedReligion('');
                setSelectedRating('');
              }}
            >
              <Text style={styles.clearFiltersText}>Clear All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.applyFiltersButton}
              onPress={() => setShowFilters(false)}
            >
              <Text style={styles.applyFiltersText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>
          {filteredPriests.length} {filteredPriests.length === 1 ? 'priest' : 'priests'} found
        </Text>

        <FlatList
          data={filteredPriests}
          renderItem={renderPriestItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.priestsList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="search" size={60} color={APP_COLORS.lightGray} />
              <Text style={styles.emptyText}>No priests found</Text>
              <Text style={styles.emptySubtext}>
                Try adjusting your search criteria
              </Text>
            </View>
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.background,
  },
  header: {
    backgroundColor: APP_COLORS.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: APP_COLORS.lightGray,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  filterButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: APP_COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: APP_COLORS.lightGray,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: APP_COLORS.background,
    borderRadius: 8,
    padding: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  clearButton: {
    padding: 4,
  },
  filtersContainer: {
    backgroundColor: APP_COLORS.white,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: APP_COLORS.lightGray,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  filterScroll: {
    paddingBottom: 8,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: APP_COLORS.background,
    borderWidth: 1,
    borderColor: APP_COLORS.lightGray,
  },
  selectedFilterChip: {
    backgroundColor: APP_COLORS.primary,
    borderColor: APP_COLORS.primary,
  },
  filterChipText: {
    fontSize: 12,
    color: APP_COLORS.black,
  },
  selectedFilterChipText: {
    color: APP_COLORS.white,
    fontWeight: 'bold',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  filterColumn: {
    flex: 1,
  },
  filterActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: APP_COLORS.lightGray,
    paddingTop: 16,
  },
  clearFiltersButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: APP_COLORS.gray,
  },
  clearFiltersText: {
    fontSize: 14,
    color: APP_COLORS.gray,
  },
  applyFiltersButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: APP_COLORS.primary,
  },
  applyFiltersText: {
    fontSize: 14,
    color: APP_COLORS.white,
    fontWeight: 'bold',
  },
  resultsContainer: {
    flex: 1,
    padding: 16,
  },
  resultsText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  priestsList: {
    paddingBottom: 16,
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
  priestMeta: {
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
  priestStatus: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginBottom: 4,
  },
  availableIndicator: {
    backgroundColor: APP_COLORS.success,
  },
  unavailableIndicator: {
    backgroundColor: APP_COLORS.error,
  },
  statusText: {
    fontSize: 12,
    marginBottom: 8,
  },
  availableText: {
    color: APP_COLORS.success,
  },
  unavailableText: {
    color: APP_COLORS.error,
  },
  bookButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: APP_COLORS.primary,
  },
  bookButtonText: {
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
  },
  emptySubtext: {
    fontSize: 14,
    color: APP_COLORS.gray,
    textAlign: 'center',
  },
});

export default PriestSearchScreen;