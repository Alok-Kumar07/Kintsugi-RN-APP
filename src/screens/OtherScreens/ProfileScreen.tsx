import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ImageBackground, Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState('grid');
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(width)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  // Mock data for posts
  const posts = Array(12).fill(null).map((_, i) => i + 1);

  const openMenu = () => {
    setMenuVisible(true);
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeMenu = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: width,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => setMenuVisible(false));
  };

  const menuItems = [
    { icon: '⚙️', label: 'Settings', color: '#4A90E2' },
    { icon: '🔔', label: 'Notifications', color: '#F5A623' },
    { icon: '🔒', label: 'Privacy', color: '#7ED321' },
    { icon: '💾', label: 'Saved', color: '#BD10E0' },
    { icon: '📊', label: 'Insights', color: '#50E3C2' },
    { icon: '👥', label: 'Close Friends', color: '#FF6B6B' },
    { icon: '⭐', label: 'Favorites', color: '#FFD93D' },
    { icon: '❓', label: 'Help', color: '#6C5CE7' },
    { icon: '🚪', label: 'Logout', color: '#FF6B6B' },
  ];

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.icon}>➕</Text>
          </TouchableOpacity>
          <Text style={styles.username}>username</Text>
          <TouchableOpacity style={styles.iconButton} onPress={openMenu}>
            <Text style={styles.icon}>☰</Text>
          </TouchableOpacity>
        </View>

        {/* Cover Photo with Profile Picture */}
        <View style={styles.coverSection}>
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800' }}
            style={styles.coverImage}
            imageStyle={styles.coverImageStyle}
          >
            <View style={styles.overlay} />
          </ImageBackground>
          
          <View style={styles.profilePictureWrapper}>
            <View style={styles.gradientRing}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>PS</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Profile Name and Bio */}
        <View style={styles.profileDetails}>
          <Text style={styles.displayName}>Prakriti Sen</Text>
          <Text style={styles.usernameSmall}>@lisandysworld</Text>
          <Text style={styles.bioText}>
            What's up andyFan don't forget to subscribe to my youtube
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Posts</Text>
            <Text style={styles.statNumber}>132</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Followers</Text>
            <Text style={styles.statNumber}>20K</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Following</Text>
            <Text style={styles.statNumber}>203</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Share Profile</Text>
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
              <Text style={styles.highlightLabel}>Event {i}</Text>
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

      {/* Animated Side Menu */}
      {menuVisible && (
        <>
          {/* Animated Overlay */}
          <Animated.View 
            style={[
              styles.menuOverlay,
              { opacity: backdropOpacity }
            ]}
          >
            <TouchableOpacity 
              style={StyleSheet.absoluteFill} 
              activeOpacity={1} 
              onPress={closeMenu}
            />
          </Animated.View>
          
          {/* Menu Panel */}
          <Animated.View 
            style={[
              styles.menuPanel,
              { transform: [{ translateX: slideAnim }] }
            ]}
          >
            <ImageBackground
              source={{ uri: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800' }}
              style={styles.menuBackground}
              imageStyle={styles.menuBackgroundImage}
            >
              <View style={styles.menuGradientOverlay} />
              
              {/* Menu Header */}
              <View style={styles.menuHeader}>
                <TouchableOpacity onPress={closeMenu} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
                <View style={styles.menuProfileSection}>
                  <View style={styles.menuAvatar}>
                    <Text style={styles.menuAvatarText}>PS</Text>
                  </View>
                  <Text style={styles.menuName}>Prakriti Sen</Text>
                  <Text style={styles.menuUsername}>@lisandysworld</Text>
                </View>
              </View>

              {/* Menu Items */}
              <ScrollView style={styles.menuItemsContainer}>
                {menuItems.map((item, index) => (
                  <TouchableOpacity 
                    key={index} 
                    style={styles.menuItem}
                    onPress={() => {
                      closeMenu();
                      // Handle menu item action here
                    }}
                  >
                    <View style={[styles.menuIconContainer, { backgroundColor: item.color }]}>
                      <Text style={styles.menuItemIcon}>{item.icon}</Text>
                    </View>
                    <Text style={styles.menuItemText}>{item.label}</Text>
                    <Text style={styles.menuArrow}>›</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Menu Footer */}
              <View style={styles.menuFooter}>
                <Text style={styles.menuFooterText}>Version 1.0.0</Text>
              </View>
            </ImageBackground>
          </Animated.View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
    backgroundColor: '#fff',
    zIndex: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: '600',
    color: '#262626',
  },
  iconButton: {
    padding: 4,
  },
  icon: {
    fontSize: 24,
    color: '#262626',
  },
  coverSection: {
    position: 'relative',
    height: 200,
    alignItems: 'center',
  },
  coverImage: {
    width: '100%',
    height: 200,
  },
  coverImageStyle: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  profilePictureWrapper: {
    position: 'absolute',
    bottom: -50,
    alignItems: 'center',
  },
  gradientRing: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#E1306C',
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fff',
  },
  avatar: {
    width: 102,
    height: 102,
    borderRadius: 51,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 40,
    fontWeight: '600',
    color: '#262626',
  },
  profileDetails: {
    marginTop: 60,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  displayName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#262626',
    marginBottom: 4,
  },
  usernameSmall: {
    fontSize: 14,
    color: '#8e8e8e',
    marginBottom: 12,
  },
  bioText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#262626',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    marginHorizontal: 30,
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 13,
    color: '#8e8e8e',
    marginBottom: 4,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#262626',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#dbdbdb',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  editButton: {
    flex: 1,
    paddingVertical: 10,
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
  // Menu Styles
  menuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
  menuPanel: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: width * 0.8,
    zIndex: 1000,
    elevation: 5,
  },
  menuBackground: {
    flex: 1,
  },
  menuBackgroundImage: {
    opacity: 0.3,
  },
  menuGradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  menuHeader: {
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#262626',
    fontWeight: '300',
  },
  menuProfileSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  menuAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E1306C',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  menuAvatarText: {
    fontSize: 32,
    fontWeight: '600',
    color: '#fff',
  },
  menuName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#262626',
    marginBottom: 4,
  },
  menuUsername: {
    fontSize: 14,
    color: '#8e8e8e',
  },
  menuItemsContainer: {
    flex: 1,
    paddingTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuItemIcon: {
    fontSize: 20,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#262626',
  },
  menuArrow: {
    fontSize: 24,
    color: '#c0c0c0',
  },
  menuFooter: {
    padding: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  menuFooterText: {
    fontSize: 12,
    color: '#8e8e8e',
  },
});

export default ProfileScreen;