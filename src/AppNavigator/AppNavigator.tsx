import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginAndRegScreen from '../LoginAndRegister/LoginAndRegScreen';
import BottomTabNavigator from './BottomTabNavigator';
import ProfileScreen from '../screens/OtherScreens/ProfileScreen';
import UploadPostScreen from '../screens/OtherScreens/UploadPostScreen';
import PreviewPostScreen from '../screens/OtherScreens/PreviewPostScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="LoginAndReg" component={LoginAndRegScreen} /> */}
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      <Stack.Screen
        name="UserProfile"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
      <Stack.Screen
        name="UploadPost"
        component={UploadPostScreen}
        options={{ title: 'Upload Post' }}
      />
      <Stack.Screen
        name="PreviewPost"
        component={PreviewPostScreen}
        options={{ title: 'Preview Post' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
