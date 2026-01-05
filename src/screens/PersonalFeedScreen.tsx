// ==================== PersonalFeedScreen.js ====================
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  FlatList,
  Dimensions,
  Modal,
  ScrollView,
} from 'react-native';
import Video from 'react-native-video';

const { width, height } = Dimensions.get('window');

// --- DUMMY DATA ---
const DUMMY_MEDIA = [
  { type: 'image', uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400' },
  { type: 'image', uri: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400' },
  { type: 'image', uri: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400' },
  { type: 'image', uri: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400' },
  { type: 'image', uri: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400' },
];

const BG_COLORS = ['#ffffff', '#f8f9fa', '#e3f2fd', '#fff3e0'];

const generatePosts = (category, count) => {
  return Array.from({ length: count }).map((_, index) => {
    // Randomly decide background type
    const useImageBg = Math.random() > 0.5;
    let bgData;

    if (useImageBg) {
       // Pick random image for background
       bgData = { type: 'image', uri: DUMMY_MEDIA[index % DUMMY_MEDIA.length].uri };
    } else {
       // Pick random color
       bgData = { type: 'color', color: BG_COLORS[index % BG_COLORS.length] };
    }

    return {
      id: `${category}-${index}`,
      title: `${category.charAt(0).toUpperCase() + category.slice(1)} Post #${index + 1}`,
      titleStyle: { color: '#1a1a1a', fontWeight: '800', fontFamily: undefined, fontStyle: 'normal' },
      textBlocks: [
        { id: '1', text: `This sample post has a ${useImageBg ? 'background image' : 'solid background color'}.`, color: '#333', font: { family: undefined } },
        { id: '2', text: 'The layout matches the preview screen exactly.', color: '#555', font: { weight: 'normal' } }
      ],
      selectedMedia: DUMMY_MEDIA.slice(0, (index % 4) + 2), 
      // UPDATED: Use the randomly chosen background data
      selectedBackground: bgData,
      selectedSticker: index % 3 === 0 ? '✨' : null, 
      tags: ['lifestyle', category, useImageBg ? 'imageBG' : 'colorBG'],
      timestamp: 'Just now',
    };
  });
};

const DATA = {
  public: generatePosts('public', 6),
  private: generatePosts('private', 4),
  incognito: generatePosts('incognito', 5),
  shareWith: generatePosts('Share With', 3),
};

const PersonalFeedScreen = () => {
  const [activeTab, setActiveTab] = useState('public');
  const navigation = useNavigation();
  
  // Modal State for viewing media
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPostMedia, setCurrentPostMedia] = useState([]);

  // Handle opening media modal
  const openMediaModal = (media) => {
    setCurrentPostMedia(media);
    setModalVisible(true);
  };

  const getTabColor = (tab) => {
    switch (tab) {
      case 'public': return '#3897f0';
      case 'private': return '#7c4dff';
      case 'incognito': return '#333';
      default: return '#3897f0';
    }
  };

  // --- Render Single Post ---
  const renderPostItem = ({ item }) => {
    const totalMedia = item.selectedMedia?.length || 0;
    const displayMedia = item.selectedMedia?.slice(0, 4) || [];

    return (
      <View style={styles.postContainer}>
        {/* IMAGE BACKGROUND COMPONENT */}
        <ImageBackground
          source={item.selectedBackground?.type === 'image' ? { uri: item.selectedBackground.uri } : null}
          style={[
            styles.postCard,
            item.selectedBackground?.type === 'color' && { backgroundColor: item.selectedBackground.color },
          ]}
          imageStyle={styles.backgroundImageStyle}
        >
          <View style={styles.backgroundOverlay} />

          {/* 1. Header (User Info) */}
          <View style={styles.cardHeader}>
            <View style={styles.userInfo}>
              <View style={styles.userAvatar}><Text style={styles.avatarText}>U</Text></View>
              <View>
                <Text style={styles.userName}>Your Name</Text>
                <Text style={styles.timestamp}>{item.timestamp}</Text>
              </View>
            </View>
            {/* Tab Badge */}
            <View style={[styles.statusBadge, { backgroundColor: getTabColor(activeTab) }]}>
              <Text style={styles.statusText}>{activeTab.toUpperCase()}</Text>
            </View>
          </View>

          {/* 2. Floating Sticker */}
          {item.selectedSticker && (
            <View style={styles.stickerFloating}>
              <Text style={styles.postSticker}>{item.selectedSticker}</Text>
            </View>
          )}

          {/* 3. Main Layout (Media Left / Text Right) */}
          <View style={styles.mainContentLayout}>
            {/* Left: Media Stack */}
            <View style={styles.mediaStackSide}>
              {displayMedia.map((media, index) => {
                const isLastVisible = index === 3;
                const remainingCount = totalMedia - 4;
                const showOverlay = isLastVisible && remainingCount > 0;

                return (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.9}
                    onPress={() => openMediaModal(item.selectedMedia)}
                    style={[
                      styles.stackedMediaWrapper,
                      {
                        marginTop: index === 0 ? 0 : -140, // Same overlap as Preview
                        zIndex: index,
                        transform: [{ rotate: index % 2 === 0 ? '-5deg' : '5deg' }],
                      },
                    ]}
                  >
                    {media.type === 'image' ? (
                      <Image source={{ uri: media.uri }} style={styles.mediaItem} />
                    ) : (
                      <Video source={{ uri: media.uri }} style={styles.mediaItem} resizeMode="cover" paused={true} />
                    )}
                    {showOverlay && (
                      <View style={styles.moreOverlay}>
                        <Text style={styles.moreText}>+{remainingCount}</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Right: Title & Text Blocks */}
            <View style={styles.textContentSide}>
              {item.title ? (
                <Text 
                  style={[
                    styles.postTitle,
                    item.titleStyle && {
                      color: item.titleStyle.color,
                      fontFamily: item.titleStyle.fontFamily,
                      fontWeight: item.titleStyle.fontWeight,
                      fontStyle: item.titleStyle.fontStyle,
                    }
                  ]}
                >
                  {item.title}
                </Text>
              ) : null}

              {/* Render Text Blocks */}
              <View style={styles.textBlocksContainer}>
                {item.textBlocks && item.textBlocks.map((block) => (
                  <Text
                    key={block.id}
                    style={[
                      styles.postBodyBlock,
                      {
                        color: block.color,
                        fontFamily: block.font?.family,
                        fontWeight: block.font?.weight,
                        fontStyle: block.font?.style,
                      }
                    ]}
                  >
                    {block.text}
                  </Text>
                ))}
              </View>
            </View>
          </View>

          {/* 4. Tags */}
          <View style={styles.tagsRow}>
            {item.tags.map((tag, i) => (
              <View key={i} style={styles.tagChip}>
                <Text style={styles.tagText}>#{tag}</Text>
              </View>
            ))}
          </View>

          {/* 5. Actions */}
          <View style={styles.postActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>❤️</Text>
              <Text style={styles.actionText}>Like</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>💬</Text>
              <Text style={styles.actionText}>Comment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>🔗</Text>
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>...</Text>
              <Text style={styles.actionText}>More</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* --- TOP HEADER --- */}
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={() => navigation.navigate('UploadPost')} style={styles.iconButton}>
          <Text style={styles.icon}>➕</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Your Feed</Text>
        <View style={{ width: 40 }} /> 
      </View>

      {/* --- TAB NAVIGATION --- */}
      <View style={styles.tabContainer}>
        {['public', 'private', 'incognito', 'shareWith'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              activeTab === tab && { borderBottomColor: getTabColor(tab), borderBottomWidth: 3 }
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && { color: getTabColor(tab), fontWeight: '700' }
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* --- POST LIST --- */}
      <FlatList
        data={DATA[activeTab]}
        keyExtractor={(item) => item.id}
        renderItem={renderPostItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* --- MEDIA MODAL (Global for Screen) --- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>All Media</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.modalScrollContent}>
            {currentPostMedia.map((media, index) => (
              <View key={index} style={styles.modalMediaWrapper}>
                {media.type === 'image' ? (
                  <Image source={{ uri: media.uri }} style={styles.modalMediaItem} resizeMode="contain" />
                ) : (
                  <Video source={{ uri: media.uri }} style={styles.modalMediaItem} resizeMode="contain" controls={true} paused={false} />
                )}
              </View>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default PersonalFeedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  
  // --- HEADER & TABS ---
  screenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  iconButton: { width: 40 },
  icon: { fontSize: 24, color: '#262626' },
  screenTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1a1a1a',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    color: '#999',
    fontWeight: '600',
  },

  // --- POST CARD ---
  listContent: {
    paddingBottom: 20,
  },
  postContainer: {
    marginBottom: 4, // Spacing between posts
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  postCard: {
    minHeight: 400,
    paddingBottom: 10,
    overflow: 'hidden',
    position: 'relative',
    // Ensure background color is set if image fails or is null
    backgroundColor: '#fff', 
  },
  // STYLE FOR THE BACKGROUND IMAGE
  backgroundImageStyle: {
    opacity: 0.25, // Low opacity for the background look
    resizeMode: 'cover',
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.3)', // Optional: lighten the background slightly
  },

  // Header of Card
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#7c4dff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { fontWeight: 'bold', color: '#fff' },
  userName: { fontWeight: '700', fontSize: 14, color: '#333' },
  timestamp: { fontSize: 10, color: '#888' },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusText: { color: '#fff', fontSize: 10, fontWeight: '700' },

  // Sticker
  stickerFloating: {
    position: 'absolute',
    top: 20,
    right: 10,
    zIndex: 50,
  },
  postSticker: { fontSize: 60 },

  // Main Layout
  mainContentLayout: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    marginTop: 10,
    minHeight: 180, // Space for stack
  },
  mediaStackSide: {
    width: 150,
    paddingTop: 20,
  },
  stackedMediaWrapper: {
    width: 140,
    height: 190,
    borderRadius: 15,
    backgroundColor: '#000',
    borderWidth: 3,
    borderColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  mediaItem: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  moreOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreText: { color: '#fff', fontWeight: 'bold', fontSize: 20 },

  textContentSide: {
    flex: 1,
    paddingLeft: 12,
    paddingTop: 10,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  textBlocksContainer: {
    flexDirection: 'column',
    gap: 4,
  },
  postBodyBlock: {
    fontSize: 15,
    lineHeight: 22,
  },

  // Tags & Actions
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    marginTop: 12,
    gap: 6,
  },
  tagChip: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagText: { color: '#1565c0', fontSize: 10, fontWeight: '600' },

  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(255,255,255,0.85)', // Slightly transparent to show BG
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  actionButton: { alignItems: 'center' },
  actionIcon: { fontSize: 20 },
  actionText: { fontSize: 12, fontWeight: '600', marginTop: 2, color: '#555' },

  // --- MODAL STYLES ---
  modalContainer: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 50,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  modalTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },
  closeButton: {
    padding: 8,
    backgroundColor: '#333',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  modalScrollContent: { paddingBottom: 40 },
  modalMediaWrapper: {
    width: width,
    height: height * 0.6,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
  },
  modalMediaItem: {
    width: '100%',
    height: '100%',
  },
});