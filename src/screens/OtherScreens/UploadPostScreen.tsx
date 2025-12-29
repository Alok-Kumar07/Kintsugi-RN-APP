// ==================== UploadPostScreen.js ====================
import React, { useState, useRef } from 'react';
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
import { launchImageLibrary } from 'react-native-image-picker';

const UploadPostScreen = ({ navigation }) => {
  // 1. Hooks
  const [title, setTitle] = useState('');
  
  // CHANGED: Instead of a single string, we use an Array of Text Blocks
  // Each block has its own text, color, and font settings.
  const [textBlocks, setTextBlocks] = useState([
    { id: '1', text: '', color: '#262626', font: { name: 'Default', family: undefined, style: 'normal', weight: 'normal' } }
  ]);
  const [activeBlockId, setActiveBlockId] = useState('1');

  const [tags, setTags] = useState('');
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [selectedSticker, setSelectedSticker] = useState(null);
  
  // Modals State
  const [showStickerModal, setShowStickerModal] = useState(false);
  const [showBackgroundModal, setShowBackgroundModal] = useState(false);
  const [showFontModal, setShowFontModal] = useState(false);
  const [showColorModal, setShowColorModal] = useState(false);

  // --- Data Arrays ---
  const stickers = [
    '😀', '😂', '🥰', '😎', '🤩', '🥳', '😍', '🔥',
    '💯', '✨', '⭐', '💖', '👍', '🎉', '🎈', '🎊',
    '🌟', '💫', '🌈', '☀️', '🌙', '⚡', '💥', '🎯',
  ];

  const fontOptions = [
    { name: 'Default', family: undefined, style: 'normal', weight: 'normal' },
    { name: 'Serif', family: 'serif', style: 'normal', weight: 'normal' },
    { name: 'Monospace', family: 'monospace', style: 'normal', weight: 'normal' },
    { name: 'Bold', family: undefined, style: 'normal', weight: 'bold' },
    { name: 'Italic', family: undefined, style: 'italic', weight: 'normal' },
    { name: 'Bold Italic', family: undefined, style: 'italic', weight: 'bold' },
  ];

  const colorOptions = [
    '#262626', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
    '#FFEEAD', '#D4A5A5', '#9B59B6', '#FF9F43', '#54a0ff',
  ];

  const backgrounds = [
    { id: 1, name: 'Sunset', type: 'image', uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', color: '#FF6B6B' },
    { id: 2, name: 'Ocean', type: 'image', uri: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800', color: '#4ECDC4' },
    { id: 3, name: 'Forest', type: 'image', uri: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800', color: '#95E1D3' },
    { id: 4, name: 'City Lights', type: 'image', uri: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800', color: '#F38181' },
    { id: 5, name: 'Mountains', type: 'image', uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', color: '#AA96DA' },
    { id: 6, name: 'Beach', type: 'image', uri: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', color: '#FCBAD3' },
    { id: 7, name: 'Gradient Purple', type: 'color', color: '#667eea' },
    { id: 8, name: 'Gradient Pink', type: 'color', color: '#f093fb' },
    { id: 9, name: 'Gradient Blue', type: 'color', color: '#4facfe' },
    { id: 10, name: 'Gradient Orange', type: 'color', color: '#fa709a' },
  ];

  // --- Helpers for Text Blocks ---

  const addTextBlock = () => {
    const newBlock = {
      id: Date.now().toString(),
      text: '',
      color: '#262626', // Default color
      font: fontOptions[0] // Default font
    };
    setTextBlocks([...textBlocks, newBlock]);
    setActiveBlockId(newBlock.id);
  };

  const updateBlockText = (id, text) => {
    const updatedBlocks = textBlocks.map(block => 
      block.id === id ? { ...block, text } : block
    );
    setTextBlocks(updatedBlocks);
  };

  const updateActiveBlockStyle = (type, value) => {
    // type can be 'color' or 'font'
    const updatedBlocks = textBlocks.map(block => 
      block.id === activeBlockId ? { ...block, [type]: value } : block
    );
    setTextBlocks(updatedBlocks);
  };

  const getActiveBlock = () => {
    return textBlocks.find(b => b.id === activeBlockId) || textBlocks[0];
  };

  // --- Handlers ---

  const handleMediaPick = () => {
    launchImageLibrary(
      { mediaType: 'mixed', selectionLimit: 0, quality: 1 },
      (response) => {
        if (response.didCancel) return;
        if (response.assets?.length) {
          const newMedia = response.assets.map(item => ({
            uri: item.uri,
            type: item.type?.startsWith('video') ? 'video' : 'image',
            fileName: item.fileName,
          }));
          setSelectedMedia(prev => [...prev, ...newMedia]);
        }
      }
    );
  };

  const handlePreview = () => {
    // Basic validation: Check if title exists OR if at least one text block has text OR media exists
    const hasText = textBlocks.some(b => b.text.trim().length > 0);
    
    if (!title && !hasText && !selectedMedia.length) {
      alert('Please add some content to preview!');
      return;
    }
    
    navigation.navigate('PreviewPost', {
      postData: {
        title,
        textBlocks, // Passing array of blocks instead of single string
        tags,
        selectedMedia,
        selectedBackground,
        selectedSticker,
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

        {/* Dynamic Body Text Input */}
        <View style={styles.inputContainer}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>Today's Mood</Text>
            
            {/* Text Styling Toolbar - Applies to ACTIVE block */}
            <View style={styles.textToolbar}>
                <TouchableOpacity style={styles.toolButton} onPress={() => setShowFontModal(true)}>
                    <Text style={styles.toolIcon}>Aa</Text>
                    <Text style={styles.toolLabel}>Font</Text>
                </TouchableOpacity>
                <View style={styles.verticalDivider} />
                <TouchableOpacity style={styles.toolButton} onPress={() => setShowColorModal(true)}>
                    <View style={[styles.colorPreviewDot, { backgroundColor: getActiveBlock().color }]} />
                    <Text style={styles.toolLabel}>Color</Text>
                </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bodyWrapper}>
            {textBlocks.map((block, index) => (
              <TextInput
                key={block.id}
                style={[
                    styles.bodyInputBlock, 
                    { 
                        color: block.color,
                        fontFamily: block.font.family,
                        fontWeight: block.font.weight,
                        fontStyle: block.font.style,
                        // Add some logic to mimic focus
                        borderColor: activeBlockId === block.id ? '#7c4dff' : 'transparent',
                        borderWidth: 1,
                    }
                ]}
                placeholder={index === 0 ? "What's on your mind?" : "Continue writing..."}
                placeholderTextColor="#ccc"
                multiline
                scrollEnabled={false} // Allow container to scroll instead
                value={block.text}
                onChangeText={(text) => updateBlockText(block.id, text)}
                onFocus={() => setActiveBlockId(block.id)}
              />
            ))}
            
            {/* Add New Block Button */}
            <TouchableOpacity style={styles.addBlockButton} onPress={addTextBlock}>
                <Text style={styles.addBlockIcon}>＋</Text>
                <Text style={styles.addBlockText}>Add New Text Section</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Media Section */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Photo / Video</Text>

          {selectedMedia.length > 0 ? (
            <View style={styles.mediaGrid}>
              {selectedMedia.map((item, index) => (
                <View key={index} style={styles.mediaPreview}>
                  {item.type === 'image' ? (
                    <Image source={{ uri: item.uri }} style={styles.previewImage} />
                  ) : (
                    <View style={styles.videoPlaceholder}>
                      <Text style={styles.videoIcon}>🎥</Text>
                      <Text style={styles.videoText}>Video</Text>
                    </View>
                  )}

                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => setSelectedMedia(prev => prev.filter((_, i) => i !== index))}
                  >
                    <Text style={styles.removeButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>
              ))}

              <TouchableOpacity style={styles.addMoreButton} onPress={handleMediaPick}>
                <Text style={styles.uploadIcon}>＋</Text>
                <Text style={styles.uploadText}>Add More</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.uploadButton} onPress={handleMediaPick}>
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
                  <Image source={{ uri: selectedBackground.uri }} style={styles.backgroundSample} />
                ) : (
                  <View style={[styles.backgroundSample, { backgroundColor: selectedBackground.color }]} />
                )}
                <Text style={styles.backgroundText}>{selectedBackground.name}</Text>
                <TouchableOpacity onPress={() => setSelectedBackground(null)} style={styles.removeBackgroundButton}>
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
            placeholder="Add tags..."
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
          <TouchableOpacity style={styles.stickerButton} onPress={() => setShowStickerModal(true)}>
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

      {/* ================= MODALS ================= */}

      {/* Font Modal - Updates ACTIVE block */}
      <Modal visible={showFontModal} transparent={true} animationType="slide" onRequestClose={() => setShowFontModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choose Font Style</Text>
              <TouchableOpacity onPress={() => setShowFontModal(false)}><Text style={styles.modalClose}>✕</Text></TouchableOpacity>
            </View>
            <FlatList 
                data={fontOptions}
                keyExtractor={(item) => item.name}
                renderItem={({item}) => (
                    <TouchableOpacity 
                        style={styles.fontOptionItem}
                        onPress={() => { updateActiveBlockStyle('font', item); setShowFontModal(false); }}
                    >
                        <Text style={[styles.fontOptionText, { fontFamily: item.family, fontStyle: item.style, fontWeight: item.weight }]}>
                            {item.name}
                        </Text>
                        {getActiveBlock().font.name === item.name && <Text style={styles.checkMark}>✓</Text>}
                    </TouchableOpacity>
                )}
            />
          </View>
        </View>
      </Modal>

      {/* Color Modal - Updates ACTIVE block */}
      <Modal visible={showColorModal} transparent={true} animationType="slide" onRequestClose={() => setShowColorModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choose Text Color</Text>
              <TouchableOpacity onPress={() => setShowColorModal(false)}><Text style={styles.modalClose}>✕</Text></TouchableOpacity>
            </View>
            <View style={styles.colorGrid}>
                {colorOptions.map((color, index) => (
                    <TouchableOpacity 
                        key={index}
                        style={[styles.colorOption, { backgroundColor: color }, getActiveBlock().color === color && styles.selectedColorOption]}
                        onPress={() => { updateActiveBlockStyle('color', color); setShowColorModal(false); }}
                    />
                ))}
            </View>
          </View>
        </View>
      </Modal>

      {/* Sticker & Background Modals (Same as before) */}
      <Modal visible={showStickerModal} transparent={true} animationType="slide" onRequestClose={() => setShowStickerModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choose a Sticker</Text>
              <TouchableOpacity onPress={() => setShowStickerModal(false)}><Text style={styles.modalClose}>✕</Text></TouchableOpacity>
            </View>
            <FlatList data={stickers} numColumns={4} keyExtractor={(item, i) => i.toString()} renderItem={({ item }) => (
                <TouchableOpacity style={styles.stickerItem} onPress={() => { setSelectedSticker(item); setShowStickerModal(false); }}>
                  <Text style={styles.stickerEmoji}>{item}</Text>
                </TouchableOpacity>
              )} />
          </View>
        </View>
      </Modal>

      <Modal visible={showBackgroundModal} transparent={true} animationType="slide" onRequestClose={() => setShowBackgroundModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choose Background</Text>
              <TouchableOpacity onPress={() => setShowBackgroundModal(false)}><Text style={styles.modalClose}>✕</Text></TouchableOpacity>
            </View>
            <ScrollView>
              {backgrounds.map((bg) => (
                <TouchableOpacity key={bg.id} style={styles.backgroundItem} onPress={() => { setSelectedBackground(bg); setShowBackgroundModal(false); }}>
                  {bg.type === 'image' ? (
                    <Image source={{ uri: bg.uri }} style={styles.backgroundCircle} />
                  ) : (
                    <View style={[styles.backgroundCircle, { backgroundColor: bg.color }]} />
                  )}
                  <Text style={styles.backgroundName}>{bg.name}</Text>
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
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#e0e0e0', backgroundColor: '#fff' },
  headerButton: { fontSize: 24, color: '#262626', width: 60 },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#262626' },
  previewButton: { backgroundColor: '#7c4dff', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  previewButtonText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  scrollView: { flex: 1, padding: 16 },
  inputContainer: { marginBottom: 24 },
  
  // Toolbar Styles
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  label: { fontSize: 16, fontWeight: '600', color: '#262626' },
  textToolbar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f0f0', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  toolButton: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4 },
  toolIcon: { fontSize: 14, fontWeight: 'bold', marginRight: 4, color: '#333' },
  colorPreviewDot: { width: 14, height: 14, borderRadius: 7, borderWidth: 1, borderColor: '#ddd', marginRight: 6 },
  toolLabel: { fontSize: 12, color: '#333', fontWeight: '500' },
  verticalDivider: { width: 1, height: 16, backgroundColor: '#ccc', marginHorizontal: 4 },

  titleInput: { borderWidth: 1, borderColor: '#dbdbdb', borderRadius: 8, padding: 12, fontSize: 16, color: '#262626' },
  
  // New Multi-Block Body Styles
  bodyWrapper: {
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderRadius: 8,
    padding: 10,
    minHeight: 120,
  },
  bodyInputBlock: {
    fontSize: 16,
    padding: 8,
    marginBottom: 4,
    borderRadius: 4,
  },
  addBlockButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    paddingVertical: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
  },
  addBlockIcon: { fontSize: 18, marginRight: 6, color: '#666' },
  addBlockText: { fontSize: 14, color: '#666', fontWeight: '500' },

  tagsInput: { borderWidth: 1, borderColor: '#dbdbdb', borderRadius: 8, padding: 12, fontSize: 14, color: '#262626' },
  tagsPreview: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8, gap: 8 },
  tagChip: { backgroundColor: '#e1f5fe', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  tagText: { color: '#0277bd', fontSize: 12, fontWeight: '500' },
  uploadButton: { borderWidth: 2, borderColor: '#dbdbdb', borderStyle: 'dashed', borderRadius: 8, padding: 32, alignItems: 'center', backgroundColor: '#fafafa' },
  backgroundButton: { borderWidth: 1, borderColor: '#dbdbdb', borderRadius: 8, padding: 20, alignItems: 'center', backgroundColor: '#fafafa' },
  stickerButton: { borderWidth: 1, borderColor: '#dbdbdb', borderRadius: 8, padding: 20, alignItems: 'center', backgroundColor: '#fafafa' },
  uploadIcon: { fontSize: 40, marginBottom: 8 },
  uploadText: { fontSize: 14, color: '#8e8e8e', fontWeight: '500' },
  
  mediaGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  mediaPreview: { width: '48%', height: 180, borderRadius: 8, overflow: 'hidden', position: 'relative' },
  previewImage: { width: '100%', height: '100%' },
  videoPlaceholder: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  videoIcon: { fontSize: 40, color: '#fff' },
  videoText: { color: '#fff', marginTop: 6 },
  addMoreButton: { width: '48%', height: 180, borderWidth: 2, borderStyle: 'dashed', borderColor: '#ccc', borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  removeButton: { position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(0, 0, 0, 0.6)', width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  removeButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },

  backgroundPreview: { flexDirection: 'row', alignItems: 'center', gap: 12, width: '100%' },
  backgroundSample: { width: 50, height: 50, borderRadius: 8 },
  backgroundText: { flex: 1, fontSize: 16, color: '#262626', fontWeight: '500' },
  removeBackgroundButton: { backgroundColor: 'rgba(0, 0, 0, 0.1)', width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  selectedSticker: { fontSize: 60 },
  
  // Modals
  modalContainer: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: '70%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: '600', color: '#262626' },
  modalClose: { fontSize: 24, color: '#262626' },
  stickerItem: { flex: 1, aspectRatio: 1, justifyContent: 'center', alignItems: 'center', margin: 4, backgroundColor: '#f5f5f5', borderRadius: 8 },
  stickerEmoji: { fontSize: 40 },
  backgroundItem: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  backgroundCircle: { width: 50, height: 50, borderRadius: 25, marginRight: 16 },
  backgroundName: { flex: 1, fontSize: 16, color: '#262626', fontWeight: '500' },

  fontOptionItem: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#f0f0f0', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  fontOptionText: { fontSize: 18, color: '#333' },
  checkMark: { color: '#7c4dff', fontSize: 16, fontWeight: 'bold' },
  colorGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 15, justifyContent: 'center', paddingVertical: 10 },
  colorOption: { width: 45, height: 45, borderRadius: 25, borderWidth: 1, borderColor: '#ddd' },
  selectedColorOption: { borderWidth: 3, borderColor: '#333' },
});