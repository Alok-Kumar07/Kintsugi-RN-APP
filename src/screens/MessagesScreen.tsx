// ==================== MessagesScreen.js ====================
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

// --- DATA CONFIGURATION ---
const TABS = ['Friends', 'Followers', 'Groups', 'Calls'];

// Helper to generate dummy messages
const generateMessages = (type, count) => {
  return Array.from({ length: count }).map((_, index) => ({
    id: `${type}-${index}`,
    name: `${type} User ${index + 1}`,
    message: index % 2 === 0 ? "Hey, are we still on for today?" : "Sent a photo 📷",
    time: `${index + 2}m`,
    unread: index < 2 ? 1 : 0, 
    avatar: `https://images.unsplash.com/photo-${[
      '1535713875002-d1d0cf377fde', 
      '1494790108377-be9c29b29330', 
      '1527980965255-d3b416303d12', 
      '1599566150163-29194dcaad36', 
      '1500648767791-00dcc994a43e', 
      '1531427186611-ecfd6d936c79', 
    ][index % 6]}?w=200`,
    isOnline: index % 3 === 0,
    // Call Specific Data
    callType: index % 3 === 0 ? 'video' : 'audio',
    callStatus: index % 2 === 0 ? 'incoming' : 'outgoing', // incoming, outgoing, missed
    isMissed: index === 1,
  }));
};

const MESSAGES_DATA = {
  Friends: generateMessages('Friend', 8),
  Followers: generateMessages('Follower', 5),
  Groups: generateMessages('Group', 4),
  Calls: generateMessages('Call', 8), 
};

const MessagesScreen = () => {
  const [activeTab, setActiveTab] = useState('Friend');
  const [searchText, setSearchText] = useState('');

  // 1. Theme Logic
  const isIncognito = activeTab === 'Incognito'; // kept for future ref if you add it back
  
  const theme = {
    bg: '#fff',
    text: '#000',
    subText: '#666',
    inputBg: '#f1f1f1',
    border: '#f0f0f0',
    tint: '#000',
  };

  // 2. Render Functions
  const renderItem = ({ item }) => {
    // If we are in the CALLS tab, render a Call History Item
    if (activeTab === 'Calls') {
      return (
        <TouchableOpacity style={styles.chatItem} activeOpacity={0.7}>
          {/* Avatar */}
          <View style={styles.avatarContainer}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
          </View>

          {/* Call Info */}
          <View style={styles.chatContent}>
            <Text style={[styles.userName, { color: theme.text }]}>{item.name}</Text>
            
            <View style={styles.callDetailsRow}>
              {/* Call Icon Indicator */}
              <Ionicons 
                name={item.callStatus === 'incoming' ? 'arrow-down-outline' : 'arrow-up-outline'} 
                size={16} 
                color={item.isMissed ? '#ff3b30' : (item.callStatus === 'incoming' ? '#34c759' : '#999')}
              />
              <Text style={[styles.timeText, { color: item.isMissed ? '#ff3b30' : theme.subText, marginLeft: 4 }]}>
                {item.isMissed ? 'Missed' : item.callStatus === 'incoming' ? 'Incoming' : 'Outgoing'} • {item.time}
              </Text>
            </View>
          </View>

          {/* Call Button Action */}
          <TouchableOpacity style={styles.callActionButton}>
            <Ionicons 
              name={item.callType === 'video' ? 'videocam-outline' : 'call-outline'} 
              size={24} 
              color="#3897f0" 
            />
          </TouchableOpacity>
        </TouchableOpacity>
      );
    }

    // Default Chat Item (Friend, Follower, Groups)
    return (
      <TouchableOpacity style={styles.chatItem} activeOpacity={0.7}>
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          {item.isOnline && <View style={styles.onlineBadge} />}
        </View>

        {/* Content */}
        <View style={styles.chatContent}>
          <View style={styles.chatHeader}>
            <Text style={[styles.userName, { color: theme.text }]}>{item.name}</Text>
            <Text style={[styles.timeText, { color: theme.subText }]}>{item.time}</Text>
          </View>
          
          <View style={styles.chatFooter}>
            <Text 
              numberOfLines={1} 
              style={[
                styles.lastMessage, 
                { color: item.unread ? theme.text : theme.subText, fontWeight: item.unread ? '700' : '400' }
              ]}
            >
              {item.message}
            </Text>
            {item.unread > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{item.unread}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.bg} />

      {/* --- HEADER --- */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity>
            <Ionicons name="arrow-back" size={28} color={theme.tint} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.tint }]}>
            {activeTab === 'Calls' ? 'Call History' : 'Direct Messages'}
          </Text>
          <TouchableOpacity>
            <Ionicons name={activeTab === 'Calls' ? "call-outline" : "create-outline"} size={28} color={theme.tint} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={[styles.searchContainer, { backgroundColor: theme.inputBg }]}>
          <Ionicons name="search" size={20} color="#999" />
          <TextInput 
            placeholder="Search"
            placeholderTextColor="#999"
            style={[styles.searchInput, { color: theme.text }]}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      {/* --- CUSTOM TABS --- */}
      <View style={styles.tabsContainer}>
        <View style={[styles.tabsScroll, { borderColor: theme.border }]}>
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={[
                  styles.tabPill,
                  isActive && { backgroundColor: '#000' },
                  !isActive && { backgroundColor: 'transparent' }
                ]}
              >
                <Text style={[
                  styles.tabText,
                  { color: isActive ? '#fff' : theme.subText }
                ]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* --- LIST --- */}
      <FlatList
        data={MESSAGES_DATA[activeTab]}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  // Header
  header: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  
  // Search
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 40,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    paddingVertical: 0,
  },

  // Tabs
  tabsContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  tabsScroll: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
    borderBottomWidth: 1,
  },
  tabPill: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
  },

  // Generic List Item
  listContent: {
    paddingBottom: 20,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  
  // Avatar
  avatarContainer: {
    position: 'relative',
    marginRight: 14,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#eee',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4caf50',
    borderWidth: 2,
    borderColor: '#fff',
  },

  // Content
  chatContent: {
    flex: 1,
    justifyContent: 'center',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
  timeText: {
    fontSize: 12,
  },
  chatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 14,
    flex: 1,
    marginRight: 10,
  },
  unreadBadge: {
    backgroundColor: '#3897f0',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },

  // --- CALL SPECIFIC STYLES ---
  callDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  callActionButton: {
    padding: 8,
  },
});