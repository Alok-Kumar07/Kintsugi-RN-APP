// ==================== SearchScreen.js ====================
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';

const { width } = Dimensions.get('window');

// --- DUMMY DATA ---
const CATEGORIES = [
  'IGTV', 'Shop', 'Style', 'Sports', 'Auto', 'Music', 'Gaming', 'Food', 'Travel', 'Decor', 'Art'
];

// Generate more dummy posts to make it scrollable
const dummyPosts = Array.from({ length: 30 }).map((_, index) => ({
  id: index.toString(),
  image: `https://images.unsplash.com/photo-${[
    '1500530855697-b586d89ba3ee',
    '1494790108377-be9c29b29330',
    '1529626455594-4ff0802cfb7e',
    '1500648767791-00dcc994a43e',
    '1492562080023-ab3db95bfbce',
    '1535713875002-d1d0cf377fde',
    '1517841905240-472988babdf9',
    '1508214751196-bcfd4ca60f91',
    '1499951360447-b19be8fe80f5',
    '1517423440428-a5a00ad493e8',
    '1534528741775-53994a69daeb',
    '1506794778202-cad84cf45f1d',
  ][index % 12]}?w=500`,
  isVideo: index % 3 === 0, // Every 3rd post is a "video"
}));

const SearchScreen = () => {
  const [search, setSearch] = useState('');

  // --- Render Grid Item ---
  const renderItem = ({ item }) => (
    <TouchableOpacity activeOpacity={0.8} style={styles.gridItem}>
      <Image source={{ uri: item.image }} style={styles.gridImage} />
      {/* Video Indicator Overlay */}
      {item.isVideo && (
        <View style={styles.videoIconContainer}>
          <Text style={styles.videoIcon}>▶</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* --- HEADER (Search + Categories) --- */}
      <View style={styles.headerContainer}>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            placeholder="Search"
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
        </View>

        {/* Categories Horizontal Scroll */}
        <View style={styles.categoriesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
            {CATEGORIES.map((category, index) => (
              <TouchableOpacity key={index} style={styles.categoryChip}>
                <Text style={styles.categoryText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* --- EXPLORE GRID --- */}
      <FlatList
        data={dummyPosts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.gridContainer}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;

/* ==================== STYLES ==================== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f0f0ff',
  },

  // --- HEADER ---
  headerContainer: {
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#dbdbdb', // Subtle separator like IG
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#efefef', // Light grey search bar
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    height: 40,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
    color: '#8e8e8e',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    paddingVertical: 0, // Fix alignment on Android
  },

  // --- CATEGORIES ---
  categoriesContainer: {
    height: 35,
  },
  categoriesScroll: {
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  categoryChip: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginRight: 8,
    justifyContent: 'center',
  },
  categoryText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#262626',
  },

  // --- GRID ---
  gridContainer: {
    // No padding to touch edges like IG
  },
  gridItem: {
    width: width / 3, // Exactly 1/3rd of screen width
    height: width / 3, // Square aspect ratio
    borderWidth: 0.5, // Tiny gap
    borderColor: '#fff', // White grid lines
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  
  // --- VIDEO ICON ---
  videoIconContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'transparent',
  },
  videoIcon: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});