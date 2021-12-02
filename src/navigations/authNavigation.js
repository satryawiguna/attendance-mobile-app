import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

import LoginScreen from '../screens/auth/login';
import LandingScreen from '../screens/auth/landing';
import AuthLandingScreen from '../screens/auth/authLanding';
import RegisterScreen from '../screens/auth/register';
import OtpScreen from '../screens/auth/otp';
import ForgetPasswordScreen from '../screens/auth/forgotPassword';
import UniqeCodeScreen from '../screens/auth/uniqeCode';
import UploadImageScreen from '../screens/auth/uploadImage';

const Stack = createStackNavigator();

function AuthNavigation() {
  const landing = useSelector(state => state.auth.landing);
  return (
    <Stack.Navigator
      initialRouteName={landing ? 'Landing' : 'AuthLanding'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="AuthLanding" component={AuthLandingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Forget" component={ForgetPasswordScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Otp" component={OtpScreen} />
      <Stack.Screen name="UniqeCode" component={UniqeCodeScreen} />
      <Stack.Screen name="UploadImage" component={UploadImageScreen} />
    </Stack.Navigator>
  );
}

export default AuthNavigation;
