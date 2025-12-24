import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import IncognitoFeedScreen from '../screens/IncognitoFeedScreen';
import PersonalFeedScreen from '../screens/PersonalFeedScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: true }}/>
      <Tab.Screen name="SearchScreen" component={SearchScreen} />
      <Tab.Screen name="PersonalFeedScreen" component={PersonalFeedScreen} /> 
      <Tab.Screen name="IncognitoFeedScreen" component={IncognitoFeedScreen} />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator

const styles = StyleSheet.create({})