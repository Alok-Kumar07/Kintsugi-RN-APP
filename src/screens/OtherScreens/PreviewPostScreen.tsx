// ==================== PreviewPostScreen.js ====================
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    ImageBackground,
    Dimensions,
    Modal,
} from 'react-native';
import Video from 'react-native-video';

const { width, height } = Dimensions.get('window');

const PreviewPostScreen = ({ route, navigation }) => {
    const { postData } = route.params;
    const [modalVisible, setModalVisible] = useState(false);

    const handlePost = () => {
        const finalPostData = {
            title: postData.title,
            // Reconstruct bodyText for backend as string or keep array
            bodyText: postData.textBlocks ? postData.textBlocks.map(b => b.text).join('\n') : '',
            textBlocks: postData.textBlocks,
            tags: postData.tags?.split(',').map(tag => tag.trim()),
            media: postData.selectedMedia,
            background: postData.selectedBackground,
            sticker: postData.selectedSticker,
            timestamp: new Date().toISOString(),
        };

        console.log('Post Data:', finalPostData);
        alert('Post uploaded successfully!');
        navigation.navigate('Home');
    };

    const totalMedia = postData.selectedMedia?.length || 0;
    const displayMedia = postData.selectedMedia?.slice(0, 4) || []; 

    return (
        <View style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backButton}>← Back</Text>
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Preview Post</Text>

                <TouchableOpacity style={styles.postButton} onPress={handlePost}>
                    <Text style={styles.postButtonText}>Post</Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                {/* ================= POST CARD ================= */}
                <ImageBackground
                    source={
                        postData.selectedBackground?.type === 'image'
                            ? { uri: postData.selectedBackground.uri }
                            : null
                    }
                    style={[
                        styles.postCard,
                        postData.selectedBackground?.type === 'color' && {
                            backgroundColor: postData.selectedBackground.color,
                        },
                    ]}
                    imageStyle={styles.backgroundImageStyle}
                >
                    <View style={styles.backgroundOverlay} />

                    {/* USER INFO */}
                    <View style={styles.userInfo}>
                        <View style={styles.userAvatar}>
                            <Text style={styles.userAvatarText}>U</Text>
                        </View>
                        <View>
                            <Text style={styles.userName}>Your Name</Text>
                            <Text style={styles.postTime}>Just now</Text>
                        </View>
                    </View>

                    {/* STICKER */}
                    {postData.selectedSticker && (
                        <View style={styles.stickerFloating}>
                            <Text style={styles.postSticker}>
                                {postData.selectedSticker}
                            </Text>
                        </View>
                    )}

                    {/* MAIN CONTENT LAYOUT */}
                    <View style={styles.mainContentLayout}>
                        
                        {/* LEFT SIDE: MEDIA */}
                        <View style={styles.mediaStackSide}>
                            {displayMedia.map((media, index) => {
                                const isLastVisible = index === 3;
                                const remainingCount = totalMedia - 4;
                                const showOverlay = isLastVisible && remainingCount > 0;

                                return (
                                    <TouchableOpacity
                                        key={index}
                                        activeOpacity={0.9}
                                        onPress={() => setModalVisible(true)}
                                        style={[
                                            styles.stackedMediaWrapper,
                                            {
                                                marginTop: index === 0 ? 0 : -140,
                                                zIndex: index,
                                                transform: [{ rotate: index % 2 === 0 ? '-5deg' : '5deg' }],
                                            },
                                        ]}
                                    >
                                        {media.type === 'image' ? (
                                            <Image source={{ uri: media.uri }} style={styles.mediaItem} />
                                        ) : (
                                            <Video
                                                source={{ uri: media.uri }}
                                                style={styles.mediaItem}
                                                resizeMode="cover"
                                                paused={true}
                                            />
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

                        {/* RIGHT SIDE: TITLE AND BODY (MULTI-BLOCK RENDER) */}
                        <View style={styles.textContentSide}>
                            {postData.title ? (
                                <Text style={styles.postTitle}>{postData.title}</Text>
                            ) : null}
                            
                            {/* RENDER TEXT BLOCKS */}
                            {postData.textBlocks && postData.textBlocks.length > 0 ? (
                                <View style={styles.textBlocksContainer}>
                                    {postData.textBlocks.map((block) => (
                                        block.text ? (
                                            <Text 
                                                key={block.id}
                                                style={[
                                                    styles.postBodyBlock,
                                                    {
                                                        color: block.color,
                                                        fontFamily: block.font.family,
                                                        fontStyle: block.font.style,
                                                        fontWeight: block.font.weight,
                                                    }
                                                ]}
                                            >
                                                {block.text}
                                            </Text>
                                        ) : null
                                    ))}
                                </View>
                            ) : null}
                        </View>
                    </View>
                </ImageBackground>

                {/* TAGS */}
                {postData.tags && (
                    <View style={styles.postTags}>
                        {postData.tags.split(',').map((tag, index) => (
                            tag.trim() && (
                                <View key={index} style={styles.tagChip}>
                                    <Text style={styles.postTag}>#{tag.trim()}</Text>
                                </View>
                            )
                        ))}
                    </View>
                )}

                {/* ACTIONS */}
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

                {/* INFO BOX */}
                <View style={styles.infoBox}>
                    <Text style={styles.infoIcon}>ℹ️</Text>
                    <Text style={styles.infoText}>
                        This is how your post will appear to others. Review everything and tap "Post" to share.
                    </Text>
                </View>

            </ScrollView>

            {/* MODAL FOR MEDIA */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>All Media ({totalMedia})</Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>✕</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView contentContainerStyle={styles.modalScrollContent}>
                        {postData.selectedMedia && postData.selectedMedia.map((media, index) => (
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

export default PreviewPostScreen;

/* ==================== STYLES ==================== */
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ddd', elevation: 2, zIndex: 100 },
    backButton: { fontSize: 16, fontWeight: '600', color: '#333' },
    headerTitle: { fontSize: 18, fontWeight: '700' },
    postButton: { backgroundColor: '#3897f0', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 8 },
    postButtonText: { color: '#fff', fontWeight: '700' },
    postCard: { minHeight: 400, paddingBottom: 20, overflow: 'hidden', position: 'relative' },
    backgroundImageStyle: { opacity: 0.25, resizeMode: 'cover' },
    backgroundOverlay: { ...StyleSheet.absoluteFillObject },
    userInfo: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
    userAvatar: { width: 40, height: 40, borderRadius: 24, backgroundColor: '#7c4dff', justifyContent: 'center', alignItems: 'center' },
    userAvatarText: { color: '#fff', fontSize: 18, fontWeight: '700' },
    userName: { fontWeight: '700', fontSize: 14 },
    postTime: { fontSize: 11, color: '#666' },
    stickerFloating: { position: 'absolute', top: 20, right: 10, zIndex: 50 },
    postSticker: { fontSize: 70 },
    mainContentLayout: { flexDirection: 'row', paddingHorizontal: 16, marginTop: 10 },
    mediaStackSide: { width: 150, paddingTop: 20 },
    stackedMediaWrapper: { width: 140, height: 190, borderRadius: 15, backgroundColor: '#000', borderWidth: 3, borderColor: '#fff', elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, overflow: 'hidden', position: 'relative' },
    mediaItem: { width: '100%', height: '100%' },
    moreOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
    moreText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
    
    textContentSide: { flex: 1, paddingLeft: 12, paddingTop: 10 },
    postTitle: { fontSize: 20, fontWeight: '800', color: '#1a1a1a', marginBottom: 8 },
    
    // NEW: Style for Text Blocks in Preview
    textBlocksContainer: { flexDirection: 'column', gap: 4 },
    postBodyBlock: { fontSize: 15, lineHeight: 22 },

    postTags: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, marginTop: 15, gap: 6 },
    tagChip: { backgroundColor: '#e3f2fd', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 12 },
    postTag: { color: '#1976d2', fontWeight: '600', fontSize: 12 },
    postActions: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 16, paddingVertical: 12, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#eee', borderBottomWidth: 1, borderBottomColor: '#eee' },
    actionButton: { alignItems: 'center' },
    actionIcon: { fontSize: 22 },
    actionText: { fontSize: 12, fontWeight: '600', marginTop: 2 },
    infoBox: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#e3f2fd', margin: 16, padding: 14, borderRadius: 12 },
    infoIcon: { fontSize: 22 },
    infoText: { flex: 1, fontSize: 13, color: '#1565c0' },
    modalContainer: { flex: 1, backgroundColor: '#000', paddingTop: 50 },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 20 },
    modalTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },
    closeButton: { padding: 8, backgroundColor: '#333', borderRadius: 20, width: 36, height: 36, justifyContent: 'center', alignItems: 'center' },
    closeButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    modalScrollContent: { paddingBottom: 40 },
    modalMediaWrapper: { width: width, height: height * 0.6, marginBottom: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111' },
    modalMediaItem: { width: '100%', height: '100%' },
});