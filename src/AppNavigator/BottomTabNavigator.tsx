// ==================== BottomTabNavigator.js ====================
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import PersonalFeedScreen from '../screens/PersonalFeedScreen';
import IncognitoFeedScreen from '../screens/IncognitoFeedScreen';
import MessagesScreen from '../screens/MessagesScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          height: 60,
          backgroundColor: '#fff',
          paddingBottom: 8, // Adds padding for better spacing on mobile
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#3897f0', // Color for active tab
        tabBarInactiveTintColor: '#999',  // Color for inactive tab
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Personal') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Incognito') {
            iconName = focused ? 'eye' : 'eye-outline';
          } else if (route.name === 'Messages') {
            iconName = focused ? 'chatbubble' : 'chatbubble-outline';
          }

          // Return the Icon component
          return <Ionicons name={iconName} size={26} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Personal" component={PersonalFeedScreen} />
      <Tab.Screen name="Incognito" component={IncognitoFeedScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;