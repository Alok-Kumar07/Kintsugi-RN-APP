// ==================== IncognitoFeedScreen.js ====================
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Modal,
  ScrollView,
  StatusBar,
} from 'react-native';
import Video from 'react-native-video';

const { width, height } = Dimensions.get('window');

// --- DUMMY DATA (Dark/Moody for Incognito) ---
const DUMMY_MEDIA = [
  { type: 'image', uri: 'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=400' },
  { type: 'image', uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400' },
  { type: 'image', uri: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400' },
  { type: 'image', uri: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400' },
];

const DATA = Array.from({ length: 8 }).map((_, index) => ({
  id: `incognito-${index}`,
  title: `Anonymous Story #${index + 1}`,
  // Custom Title Style (White/Light for dark mode)
  titleStyle: { color: '#ffffff', fontWeight: '800', fontFamily: undefined, fontStyle: 'normal' },
  // Text Blocks Structure
  textBlocks: [
    { 
      id: '1', 
      text: "This is a secret thought shared with the world. No names attached.", 
      color: '#cccccc', // Light grey text
      font: { family: undefined, weight: 'normal', style: 'normal' } 
    },
    { 
      id: '2', 
      text: "It feels safer here.", 
      color: '#a0a0a0', 
      font: { family: undefined, weight: 'bold', style: 'italic' } 
    }
  ],
  selectedMedia: DUMMY_MEDIA.slice(0, (index % 4) + 2), // Random 2-5 images
  selectedBackground: { type: 'color', color: '#1a1a1a' }, // Dark Background
  selectedSticker: index % 3 === 0 ? '🔒' : null,
  tags: ['secret', 'confession', 'anonymous'],
  timestamp: '2m ago',
}));

const IncognitoFeedScreen = () => {
  // Modal State
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPostMedia, setCurrentPostMedia] = useState([]);

  // Handle opening media modal
  const openMediaModal = (media) => {
    setCurrentPostMedia(media);
    setModalVisible(true);
  };

  const renderPostItem = ({ item }) => {
    const totalMedia = item.selectedMedia?.length || 0;
    const displayMedia = item.selectedMedia?.slice(0, 4) || [];

    return (
      <View style={styles.postContainer}>
        <ImageBackground
          source={null} // Solid dark color for incognito
          style={[styles.postCard, { backgroundColor: '#121212' }]} 
          imageStyle={styles.backgroundImageStyle}
        >
          {/* 1. Header */}
          <View style={styles.cardHeader}>
            <View style={styles.userInfo}>
              <View style={styles.incognitoAvatar}>
                <Text style={styles.avatarText}>🕵️</Text>
              </View>
              <View>
                <Text style={styles.userName}>Anonymous User</Text>
                <Text style={styles.timestamp}>{item.timestamp}</Text>
              </View>
            </View>
          </View>

          {/* 2. Sticker */}
          {item.selectedSticker && (
            <View style={styles.stickerFloating}>
              <Text style={styles.postSticker}>{item.selectedSticker}</Text>
            </View>
          )}

          {/* 3. Main Layout: Media Left, Text Right */}
          <View style={styles.mainContentLayout}>
            {/* Left: Stacked Media */}
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
                        marginTop: index === 0 ? 0 : -140, // Collapsing effect
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

            {/* Right: Text Content */}
            <View style={styles.textContentSide}>
              {/* Title */}
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

              {/* Text Blocks */}
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

          {/* 5. Actions (Dark Themed) */}
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionBtn}>
                <Text style={styles.actionIcon}>🤍</Text>
                <Text style={styles.actionText}>24</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
                <Text style={styles.actionIcon}>💬</Text>
                <Text style={styles.actionText}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
                <Text style={styles.actionIcon}>🔥</Text>
                <Text style={styles.actionText}>Boost</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      {/* Header */}
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>Incognito Feed 🕵️</Text>
        <Text style={styles.subTitle}>Public • Anonymous • Untraceable</Text>
      </View>

      {/* List */}
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderPostItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* --- MEDIA MODAL --- */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Proof</Text>
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

export default IncognitoFeedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Black background
  },
  
  // --- HEADER ---
  screenHeader: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 1,
  },
  subTitle: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },

  // --- LIST ---
  // listContent: {
  //   padding: 10,
  // },
  postContainer: {
    marginBottom: 2,
    // borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333',
  },
  postCard: {
    minHeight: 400,
    paddingBottom: 12,
    position: 'relative',
  },
  backgroundImageStyle: {
    opacity: 0.1,
  },

  // --- CARD HEADER ---
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  incognitoAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#555',
  },
  avatarText: { fontSize: 18 },
  userName: { fontWeight: '700', fontSize: 14, color: '#fff' },
  timestamp: { fontSize: 10, color: '#666' },
  incognitoBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#333',
    borderRadius: 4,
  },
  badgeText: { color: '#bbb', fontSize: 10, fontWeight: '800', letterSpacing: 1 },

  // --- STICKER ---
  stickerFloating: {
    position: 'absolute',
    top: 20,
    right: 10,
    zIndex: 50,
  },
  postSticker: { fontSize: 60 },

  // --- LAYOUT ---
  mainContentLayout: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    marginTop: 10,
    minHeight: 180,
  },
  mediaStackSide: {
    width: 150,
    paddingTop: 20,
  },
  stackedMediaWrapper: {
    width: 140,
    height: 190,
    borderRadius: 10,
    backgroundColor: '#222',
    borderWidth: 1,
    borderColor: '#444',
    overflow: 'hidden',
    position: 'relative',
    elevation: 5,
  },
  mediaItem: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.8,
  },
  moreOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreText: { color: '#fff', fontWeight: 'bold', fontSize: 20 },

  textContentSide: {
    flex: 1,
    paddingLeft: 14,
    paddingTop: 5,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
  },
  textBlocksContainer: { gap: 4 },
  postBodyBlock: { fontSize: 13, lineHeight: 20 },

  // --- FOOTER ---
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 14,
    marginTop: 16,
    gap: 6,
  },
  tagChip: {
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: { color: '#888', fontSize: 10, fontWeight: '600' },

  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 14,
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#222',
    backgroundColor: '#151515',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionIcon: { fontSize: 16 },
  actionText: {
    fontSize: 12,
    color: '#aaa',
    fontWeight: '600',
  },

  // --- MODAL ---
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