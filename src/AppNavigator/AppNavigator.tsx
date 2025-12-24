import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginAndRegScreen from '../LoginAndRegister/LoginAndRegScreen';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginAndReg" component={LoginAndRegScreen} />
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
