import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
  const navigation = useNavigation();

  // -----------------------
  // USER DATA (mock)
  // -----------------------
  const user = {
    name: 'Alok',
    profileImage: null,
    // profileImage: 'https://i.pravatar.cc/300',
  };

  const firstLetter = user.name.charAt(0).toUpperCase();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        {/* -------- TOP BAR -------- */}
        <View style={styles.topBar}>

          {/* LEFT + BUTTON */}
          <TouchableOpacity
            onPress={() => navigation.navigate('UploadPost')}
            style={styles.iconButton}
          >
            <Text style={styles.icon}>➕</Text>
          </TouchableOpacity>

          {/* CENTER LOGO */}
          <Text style={styles.logo}>MyApp</Text>

          {/* RIGHT PROFILE */}
          <TouchableOpacity
            onPress={() => navigation.navigate('UserProfile')}
          >
            {user.profileImage ? (
              <Image
                source={{ uri: user.profileImage }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.profileFallback}>
                <Text style={styles.profileLetter}>{firstLetter}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* -------- CONTENT -------- */}
        <View style={styles.content}>
          <Text style={styles.welcome}>Welcome back 👋</Text>
          <Text style={styles.username}>{user.name}</Text>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Home Feed</Text>
            <Text style={styles.cardText}>
              Posts, stories and updates will appear here.
            </Text>
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

// -----------------------
// STYLES
// -----------------------
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },

  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  topBar: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  iconButton: {
    width: 40,
    alignItems: 'flex-start',
  },

  logo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  icon: {
    fontSize: 24,
    color: '#262626',
  },
  profileImage: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },

  profileFallback: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileLetter: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  content: {
    marginTop: 20,
  },

  welcome: {
    fontSize: 16,
    color: '#666',
  },

  username: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#f4f4f4',
    padding: 16,
    borderRadius: 12,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },

  cardText: {
    fontSize: 14,
    color: '#555',
  },
});
