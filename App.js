import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import RoleSelection from './src/screens/Auth/RoleSelection'; 
import StudentDashboard from './src/screens/Student/StudentDashboard'; 
import RequestOutpass from './src/screens/Student/RequestOutpass'; 
import TeacherDashboard from './src/screens/Teacher/TeacherDashboard'; 
import HODDashboard from './src/screens/HOD/HODDashboard'; 
import WardenDashboard from './src/screens/Warden/WardenDashboard'; 
import SecurityDashboard from './src/screens/Security/SecurityDashboard'; 
import AdminDashboard from './src/screens/Admin/AdminDashboard'; 

// Import Outpass Provider
import { OutpassProvider } from './src/context/OutpassContext'; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <OutpassProvider> {/* Wrap your app with OutpassProvider */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="RoleSelection">
          <Stack.Screen name="RoleSelection" component={RoleSelection} />
          <Stack.Screen name="StudentDashboard" component={StudentDashboard} />
          <Stack.Screen name="RequestOutpass" component={RequestOutpass} />
          <Stack.Screen name="TeacherDashboard" component={TeacherDashboard} />
          <Stack.Screen name="HODDashboard" component={HODDashboard} />
          <Stack.Screen name="WardenDashboard" component={WardenDashboard} />
          <Stack.Screen name="SecurityDashboard" component={SecurityDashboard} />
          <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </OutpassProvider> 
  );
}
