import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginAndRegScreen from '../LoginAndRegister/LoginAndRegScreen';
import BottomTabNavigator from './BottomTabNavigator';
import ProfileScreen from '../screens/OtherScreens/ProfileScreen';

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
    </Stack.Navigator>
  );
};

export default AppNavigator;
