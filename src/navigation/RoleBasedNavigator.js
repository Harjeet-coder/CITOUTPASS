import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StudentDashboard from '../screens/Student/StudentDashboard';
import TeacherDashboard from '../screens/Teacher/TeacherDashboard';
import HODDashboard from '../screens/HOD/HODDashboard';
import WardenDashboard from '../screens/Warden/WardenDashboard';
import SecurityDashboard from '../screens/Security/SecurityDashboard';
import AdminDashboard from '../screens/Admin/AdminDashboard';

const Stack = createNativeStackNavigator();

export default function RoleBasedNavigator({ route }) {
  const { role } = route.params; // Get role from RoleSelectionScreen

  let ScreenComponent;
  switch (role) {
    case 'Student': ScreenComponent = StudentDashboard; break;
    case 'Teacher': ScreenComponent = TeacherDashboard; break;
    case 'HOD': ScreenComponent = HODDashboard; break;
    case 'Warden': ScreenComponent = WardenDashboard; break;
    case 'Security': ScreenComponent = SecurityDashboard; break;
    case 'Admin': ScreenComponent = AdminDashboard; break;
    default: ScreenComponent = StudentDashboard;
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name={`${role}Dashboard`} component={ScreenComponent} options={{ headerShown: true }} />
    </Stack.Navigator>
  );
}
