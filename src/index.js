import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {useSelector} from 'react-redux';

import AuthNavigation from './navigations/authNavigation';
import BottomNavigation from './navigations/bottomNavigation';

function Main({isLogin}) {
  const login = useSelector(state => state.auth.login);
  return (
    <NavigationContainer>
      {login ? <BottomNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
}

export default Main;
