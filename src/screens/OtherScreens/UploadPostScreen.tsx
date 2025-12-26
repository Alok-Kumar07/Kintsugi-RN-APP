// ==================== UploadPostScreen.js ====================
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  Image,
  Modal,
  FlatList,
} from 'react-native';

const UploadPostScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [tags, setTags] = useState('');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [selectedSticker, setSelectedSticker] = useState(null);
  const [showStickerModal, setShowStickerModal] = useState(false);
  const [showBackgroundModal, setShowBackgroundModal] = useState(false);

  // Available stickers
  const stickers = [
    '😀', '😂', '🥰', '😎', '🤩', '🥳', '😍', '🔥',
    '💯', '✨', '⭐', '💖', '👍', '🎉', '🎈', '🎊',
    '🌟', '💫', '🌈', '☀️', '🌙', '⚡', '💥', '🎯',
  ];

  // Available background images and themes
  const backgrounds = [
    { 
      id: 1, 
      name: 'Sunset', 
      type: 'image',
      uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      color: '#FF6B6B'
    },
    { 
      id: 2, 
      name: 'Ocean', 
      type: 'image',
      uri: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800',
      color: '#4ECDC4'
    },
    { 
      id: 3, 
      name: 'Forest', 
      type: 'image',
      uri: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
      color: '#95E1D3'
    },
    { 
      id: 4, 
      name: 'City Lights', 
      type: 'image',
      uri: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800',
      color: '#F38181'
    },
    { 
      id: 5, 
      name: 'Mountains', 
      type: 'image',
      uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      color: '#AA96DA'
    },
    { 
      id: 6, 
      name: 'Beach', 
      type: 'image',
      uri: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
      color: '#FCBAD3'
    },
    { 
      id: 7, 
      name: 'Gradient Purple', 
      type: 'color',
      color: '#667eea'
    },
    { 
      id: 8, 
      name: 'Gradient Pink', 
      type: 'color',
      color: '#f093fb'
    },
    { 
      id: 9, 
      name: 'Gradient Blue', 
      type: 'color',
      color: '#4facfe'
    },
    { 
      id: 10, 
      name: 'Gradient Orange', 
      type: 'color',
      color: '#fa709a'
    },
  ];

  const handleMediaPick = () => {
    // Simulate image picker
    setSelectedMedia({
      uri: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800',
      type: 'image'
    });
  };

  const handlePreview = () => {
    if (!title && !bodyText && !selectedMedia) {
      alert('Please add some content to preview!');
      return;
    }
    
    // Navigate to Preview Screen with post data
    navigation.navigate('PreviewPost', {
      postData: {
        title,
        bodyText,
        tags,
        selectedMedia,
        selectedBackground,
        selectedSticker
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.headerButton}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Post</Text>
        <TouchableOpacity onPress={handlePreview} style={styles.previewButton}>
          <Text style={styles.previewButtonText}>👁 Preview</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Title Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.titleInput}
            placeholder="Add a catchy title..."
            placeholderTextColor="#999"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* Body Text Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Today's Mood</Text>
          <TextInput
            style={styles.bodyInput}
            placeholder="What's on your mind?"
            placeholderTextColor="#999"
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            value={bodyText}
            onChangeText={setBodyText}
          />
        </View>

        {/* Media Section */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Photo/Video</Text>
          {selectedMedia ? (
            <View style={styles.mediaPreview}>
              <Image 
                source={{ uri: selectedMedia.uri }} 
                style={styles.previewImage}
              />
              <TouchableOpacity 
                style={styles.removeButton}
                onPress={() => setSelectedMedia(null)}
              >
                <Text style={styles.removeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity 
              style={styles.uploadButton}
              onPress={handleMediaPick}
            >
              <Text style={styles.uploadIcon}>📷</Text>
              <Text style={styles.uploadText}>Add Photo or Video</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Background Image/Theme */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Background</Text>
          <TouchableOpacity 
            style={styles.backgroundButton}
            onPress={() => setShowBackgroundModal(true)}
          >
            {selectedBackground ? (
              <View style={styles.backgroundPreview}>
                {selectedBackground.type === 'image' ? (
                  <Image 
                    source={{ uri: selectedBackground.uri }}
                    style={styles.backgroundSample}
                  />
                ) : (
                  <View style={[styles.backgroundSample, { backgroundColor: selectedBackground.color }]} />
                )}
                <Text style={styles.backgroundText}>{selectedBackground.name}</Text>
                <TouchableOpacity 
                  onPress={() => setSelectedBackground(null)}
                  style={styles.removeBackgroundButton}
                >
                  <Text style={styles.removeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <Text style={styles.uploadIcon}>🎨</Text>
                <Text style={styles.uploadText}>Choose Background</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Tags Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tags</Text>
          <TextInput
            style={styles.tagsInput}
            placeholder="Add tags separated by commas (e.g., travel, food, lifestyle)"
            placeholderTextColor="#999"
            value={tags}
            onChangeText={setTags}
          />
          {tags.length > 0 && (
            <View style={styles.tagsPreview}>
              {tags.split(',').map((tag, index) => (
                tag.trim() && (
                  <View key={index} style={styles.tagChip}>
                    <Text style={styles.tagText}>#{tag.trim()}</Text>
                  </View>
                )
              ))}
            </View>
          )}
        </View>

        {/* Sticker Section */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Sticker</Text>
          <TouchableOpacity 
            style={styles.stickerButton}
            onPress={() => setShowStickerModal(true)}
          >
            {selectedSticker ? (
              <Text style={styles.selectedSticker}>{selectedSticker}</Text>
            ) : (
              <>
                <Text style={styles.uploadIcon}>😀</Text>
                <Text style={styles.uploadText}>Add Sticker</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Sticker Modal */}
      <Modal
        visible={showStickerModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowStickerModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choose a Sticker</Text>
              <TouchableOpacity onPress={() => setShowStickerModal(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={stickers}
              numColumns={4}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.stickerItem}
                  onPress={() => {
                    setSelectedSticker(item);
                    setShowStickerModal(false);
                  }}
                >
                  <Text style={styles.stickerEmoji}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Background Modal */}
      <Modal
        visible={showBackgroundModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowBackgroundModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choose Background</Text>
              <TouchableOpacity onPress={() => setShowBackgroundModal(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView>
              {backgrounds.map((bg) => (
                <TouchableOpacity
                  key={bg.id}
                  style={styles.backgroundItem}
                  onPress={() => {
                    setSelectedBackground(bg);
                    setShowBackgroundModal(false);
                  }}
                >
                  {bg.type === 'image' ? (
                    <Image 
                      source={{ uri: bg.uri }}
                      style={styles.backgroundCircle}
                    />
                  ) : (
                    <View style={[styles.backgroundCircle, { backgroundColor: bg.color }]} />
                  )}
                  <Text style={styles.backgroundName}>{bg.name}</Text>
                  <Text style={styles.backgroundType}>
                    {bg.type === 'image' ? '📷 Image' : '🎨 Color'}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default UploadPostScreen;

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
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  headerButton: {
    fontSize: 24,
    color: '#262626',
    width: 60,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#262626',
  },
  previewButton: {
    backgroundColor: '#7c4dff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  previewButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#262626',
    marginBottom: 8,
  },
  titleInput: {
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#262626',
  },
  bodyInput: {
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#262626',
    minHeight: 120,
  },
  tagsInput: {
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#262626',
  },
  tagsPreview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 8,
  },
  tagChip: {
    backgroundColor: '#e1f5fe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    color: '#0277bd',
    fontSize: 12,
    fontWeight: '500',
  },
  uploadButton: {
    borderWidth: 2,
    borderColor: '#dbdbdb',
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 32,
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  backgroundButton: {
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  stickerButton: {
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  uploadIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  uploadText: {
    fontSize: 14,
    color: '#8e8e8e',
    fontWeight: '500',
  },
  mediaPreview: {
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backgroundPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    width: '100%',
  },
  backgroundSample: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  backgroundText: {
    flex: 1,
    fontSize: 16,
    color: '#262626',
    fontWeight: '500',
  },
  removeBackgroundButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedSticker: {
    fontSize: 60,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#262626',
  },
  modalClose: {
    fontSize: 24,
    color: '#262626',
  },
  stickerItem: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  stickerEmoji: {
    fontSize: 40,
  },
  backgroundItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backgroundCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  backgroundName: {
    flex: 1,
    fontSize: 16,
    color: '#262626',
    fontWeight: '500',
  },
  backgroundType: {
    fontSize: 12,
    color: '#8e8e8e',
  },
});