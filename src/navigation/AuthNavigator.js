import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import RoleSelectionScreen from '../screens/Auth/RoleSelectionScreen';
import RoleBasedNavigator from './RoleBasedNavigator';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
      <Stack.Screen name="Dashboard" component={RoleBasedNavigator} />
    </Stack.Navigator>
  );
}
