// ==================== PreviewPostScreen.js ====================
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    ImageBackground,
} from 'react-native';

const PreviewPostScreen = ({ route, navigation }) => {
    const { postData } = route.params;

    const handlePost = () => {
        const finalPostData = {
            title: postData.title,
            bodyText: postData.bodyText,
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

            <ScrollView showsVerticalScrollIndicator={false}>
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

                    {/* STICKER (RIGHT SIDE – OVERLAPS USER + CONTENT) */}
                    {postData.selectedSticker && (
                        <View style={styles.stickerFloating}>
                            <Text style={styles.postSticker}>
                                {postData.selectedSticker}
                            </Text>
                        </View>
                    )}

                    {/* CONTENT */}
                    <View style={styles.postContent}>
                        {postData.selectedMedia && (
                            <View style={styles.tiltedImageContainer}>
                                <Image
                                    source={{ uri: postData.selectedMedia.uri }}
                                    style={styles.tiltedImage}
                                />
                            </View>
                        )}

                        <View style={styles.textContent}>
                            {postData.title && (
                                <Text style={styles.postTitle}>{postData.title}</Text>
                            )}
                            {postData.bodyText && (
                                <Text style={styles.postBody}>{postData.bodyText}</Text>
                            )}
                        </View>
                    </View>
                </ImageBackground>

                <View>
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
                </View>
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
                        <Text style={styles.actionIcon}>📌</Text>
                        <Text style={styles.actionText}>Save</Text>
                    </TouchableOpacity>
                </View>

                {/* INFO */}
                <View style={styles.infoBox}>
                    <Text style={styles.infoIcon}>ℹ️</Text>
                    <Text style={styles.infoText}>
                        This is how your post will appear to others. Review everything and tap
                        "Post" to share.
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};

export default PreviewPostScreen;

/* ==================== STYLES ==================== */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },

    backButton: {
        fontSize: 16,
        fontWeight: '600',
    },

    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
    },

    postButton: {
        backgroundColor: '#3897f0',
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderRadius: 8,
    },

    postButtonText: {
        color: '#fff',
        fontWeight: '700',
    },

    /* POST CARD */
    postCard: {
        margin: 16,
        borderRadius: 20,
        overflow: 'hidden',
        paddingBottom: 16,
        position: 'relative', // REQUIRED for sticker
    },

    backgroundImageStyle: {
        resizeMode: 'cover',
        opacity: 0.35,
    },

    backgroundOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255,255,255,0.85)',
    },

    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        gap: 12,
    },

    userAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#7c4dff',
        justifyContent: 'center',
        alignItems: 'center',
    },

    userAvatarText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
    },

    userName: {
        fontSize: 16,
        fontWeight: '700',
    },

    postTime: {
        fontSize: 12,
        color: '#777',
    },

    /* FLOATING STICKER */
    stickerFloating: {
        position: 'absolute',
        right: 1,
        top: 20, // overlaps user info + content
        zIndex: 20,
    },

    postSticker: {
        fontSize: 72,
    },

    postContent: {
        flexDirection: 'row',
        padding: 16,
        gap: 16,
    },

    tiltedImageContainer: {
        width: 130,
        height: 170,
        transform: [{ rotate: '-8deg' }],
    },

    tiltedImage: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
    },

    textContent: {
        flex: 1,
        justifyContent: 'center',
    },

    postTitle: {
        fontSize: 20,
        fontWeight: '800',
        marginBottom: 8,
    },

    postBody: {
        fontSize: 14,
        color: '#444',
        lineHeight: 20,
    },

    postTags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        paddingHorizontal: 16,
    },

    tagChip: {
        backgroundColor: '#e3f2fd',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },

    postTag: {
        color: '#1976d2',
        fontWeight: '600',
        fontSize: 12,
    },

    postActions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginTop: 8,
        paddingVertical: 12,
        borderRadius: 12,
    },

    actionButton: {
        alignItems: 'center',
    },

    actionIcon: {
        fontSize: 22,
    },

    actionText: {
        fontSize: 12,
        fontWeight: '600',
    },

    infoBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: '#e3f2fd',
        margin: 16,
        padding: 14,
        borderRadius: 12,
    },

    infoIcon: {
        fontSize: 22,
    },

    infoText: {
        flex: 1,
        fontSize: 13,
        color: '#1565c0',
    },
});
