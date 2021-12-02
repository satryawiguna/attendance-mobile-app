import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import DashboardScreen from '../screens/dashboard';
import AttendanceMethodScreen from '../screens/AttendanceMethod';
import FingerprintScreen from '../screens/AttendanceMethod/Fingerprint';
import FaceRecogniaionScreen from '../screens/AttendanceMethod/FaceRecognitaion';
import GeoValidationScreen from '../screens/GeoValidation';
import CardScanScreen from '../screens/AttendanceMethod/CardScan';
import AttedanceRecordScreen from '../screens/dashboard/AttedanceRecord';

const Stack = createStackNavigator();

function HomeNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="GeoValidation" component={GeoValidationScreen} />
      <Stack.Screen name="Attendance" component={AttendanceMethodScreen} />
      <Stack.Screen name="Finger" component={FingerprintScreen} />
      <Stack.Screen name="Face" component={FaceRecogniaionScreen} />
      <Stack.Screen name="Scanner" component={CardScanScreen} />
      <Stack.Screen name="AttedanceRecord" component={AttedanceRecordScreen} />
    </Stack.Navigator>
  );
}

export default HomeNavigation;
