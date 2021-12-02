import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AccountScreen from '../screens/account';
import SettingScreen from '../screens/account/setting';
import EditScreen from '../screens/account/edit';
import PreferenceScreen from '../screens/account/preference';
import TermAndConditionScreen from '../screens/account/TermAndCondition';
import FaqsScreen from '../screens/account/faqs';

const Stack = createStackNavigator();

function AccountNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Account"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="Setting" component={SettingScreen} />
      <Stack.Screen name="Edit" component={EditScreen} />
      <Stack.Screen name="Preference" component={PreferenceScreen} />
      <Stack.Screen
        name="TermAndCondition"
        component={TermAndConditionScreen}
      />
      <Stack.Screen name="Faqs" component={FaqsScreen} />
    </Stack.Navigator>
  );
}

export default AccountNavigation;
