import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState('grid');
  
  // Mock data for posts
  const posts = Array(12).fill(null).map((_, i) => i + 1);
  
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.username}>username</Text>
          <Text style={styles.dropdownIcon}>▼</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.icon}>➕</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.icon}>☰</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Info */}
      <View style={styles.profileInfo}>
        <View style={styles.profilePictureContainer}>
          <View style={styles.gradientRing}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>U</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>54</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>834</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>162</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
      </View>

      {/* Bio */}
      <View style={styles.bio}>
        <Text style={styles.displayName}>Display Name</Text>
        <Text style={styles.bioText}>
          ✨ Bio goes here{'\n'}
          📍 Location{'\n'}
          🔗 link.in.bio
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Share Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Story Highlights */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.highlights}>
        <View style={styles.highlightItem}>
          <View style={styles.highlightCircle}>
            <Text style={styles.highlightIcon}>+</Text>
          </View>
          <Text style={styles.highlightLabel}>New</Text>
        </View>
        {[1, 2, 3, 4].map((i) => (
          <View key={i} style={styles.highlightItem}>
            <View style={styles.highlightCircle}>
              <Text style={styles.highlightIcon}>📷</Text>
            </View>
            <Text style={styles.highlightLabel}>Story {i}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'grid' && styles.tabActive]}
          onPress={() => setActiveTab('grid')}
        >
          <Text style={[styles.tabIcon, activeTab === 'grid' && styles.tabIconActive]}>▦</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'reels' && styles.tabActive]}
          onPress={() => setActiveTab('reels')}
        >
          <Text style={[styles.tabIcon, activeTab === 'reels' && styles.tabIconActive]}>▶</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'tagged' && styles.tabActive]}
          onPress={() => setActiveTab('tagged')}
        >
          <Text style={[styles.tabIcon, activeTab === 'tagged' && styles.tabIconActive]}>👤</Text>
        </TouchableOpacity>
      </View>

      {/* Posts Grid */}
      <View style={styles.postsGrid}>
        {posts.map((post) => (
          <TouchableOpacity key={post} style={styles.postItem}>
            <View style={styles.postPlaceholder}>
              <Text style={styles.postIcon}>📷</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  username: {
    fontSize: 20,
    fontWeight: '600',
    color: '#262626',
  },
  dropdownIcon: {
    fontSize: 10,
    color: '#262626',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 16,
  },
  iconButton: {
    padding: 4,
  },
  icon: {
    fontSize: 24,
    color: '#262626',
  },
  profileInfo: {
    flexDirection: 'row',
    padding: 16,
    gap: 24,
  },
  profilePictureContainer: {
    width: 86,
    height: 86,
  },
  gradientRing: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: '#E1306C',
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '500',
    color: '#262626',
  },
  stats: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: '#262626',
  },
  statLabel: {
    fontSize: 14,
    color: '#262626',
  },
  bio: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  displayName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: '#262626',
  },
  bioText: {
    fontSize: 14,
    lineHeight: 18,
    color: '#262626',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  editButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dbdbdb',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  editButtonText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#262626',
  },
  addButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dbdbdb',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#262626',
  },
  highlights: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb',
  },
  highlightItem: {
    alignItems: 'center',
    marginRight: 16,
    width: 64,
  },
  highlightCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#dbdbdb',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  highlightLabel: {
    fontSize: 12,
    color: '#262626',
  },
  highlightIcon: {
    fontSize: 20,
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#262626',
  },
  tabIcon: {
    fontSize: 24,
    color: '#8e8e8e',
  },
  tabIconActive: {
    color: '#262626',
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  postItem: {
    width: '33.33%',
    aspectRatio: 1,
    padding: 1,
  },
  postPlaceholder: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postIcon: {
    fontSize: 32,
    opacity: 0.3,
  },
});

export default ProfileScreen;