import * as React from 'react';
import {Image, Platform, StatusBar, Text, StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/dashboard';
import {scale} from '../utils/responsive';
import {textStyles} from '../constants/textStyles';
import {colors} from '../constants/colors';
import HomeNavigation from './homeNavigation';
import AccountNavigation from './accountNavigation';

const Tab = createBottomTabNavigator();

function BottomNavigator() {
  React.useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('white');
    }
  }, []);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeNavigation}
        options={({route}) => ({
          tabBarIcon: ({focused}) => {
            return (
              <Image
                resizeMode="contain"
                source={require('../assets/images/home.png')}
                style={{
                  width: scale(20),
                  height: scale(20),
                  marginTop: scale(10),
                  tintColor: focused ? colors.PRIMARY : '#858796',
                }}
              />
            );
          },
          tabBarLabel: ({focused}) => {
            let colorChange = '#858796';
            if (focused) {
              colorChange = colors.PRIMARY;
            }
            return (
              <Text
                style={[
                  textStyles.normal,
                  {
                    color: colorChange,
                    fontSize: scale(9),
                    fontWeight: focused ? '700' : 'normal',
                  },
                ]}>
                {route.name}
              </Text>
            );
          },
        })}
      />
      <Tab.Screen
        name="Employee"
        component={DashboardScreen}
        options={({route}) => ({
          tabBarIcon: ({focused}) => {
            return (
              <Image
                resizeMode="contain"
                source={require('../assets/images/employee.png')}
                style={{
                  width: scale(20),
                  height: scale(20),
                  marginTop: scale(10),
                  tintColor: focused ? colors.PRIMARY : '#858796',
                }}
              />
            );
          },
          tabBarLabel: ({focused}) => {
            let colorChange = '#858796';
            if (focused) {
              colorChange = colors.PRIMARY;
            }
            return (
              <Text
                style={[
                  textStyles.normal,
                  {
                    color: colorChange,
                    fontSize: scale(9),
                    fontWeight: focused ? '700' : 'normal',
                  },
                ]}>
                {route.name}
              </Text>
            );
          },
        })}
      />
      <Tab.Screen
        name="Inbox"
        component={DashboardScreen}
        options={({route}) => ({
          tabBarIcon: ({focused}) => {
            return (
              <View>
                <Image
                  resizeMode="contain"
                  source={require('../assets/images/inbox.png')}
                  style={{
                    width: scale(20),
                    height: scale(20),
                    marginTop: scale(10),
                    tintColor: focused ? colors.PRIMARY : '#858796',
                  }}
                />
                <View style={styles.containerNotif}>
                  <Text
                    style={[textStyles.normal, {color: 'white', fontSize: 9}]}>
                    3+
                  </Text>
                </View>
              </View>
            );
          },
          tabBarLabel: ({focused}) => {
            let colorChange = '#858796';
            if (focused) {
              colorChange = colors.PRIMARY;
            }
            return (
              <Text
                style={[
                  textStyles.normal,
                  {
                    color: colorChange,
                    fontSize: scale(9),
                    fontWeight: focused ? '700' : 'normal',
                  },
                ]}>
                {route.name}
              </Text>
            );
          },
        })}
      />
      <Tab.Screen
        name="Account"
        component={AccountNavigation}
        options={({route}) => ({
          tabBarIcon: ({focused}) => {
            return (
              <Image
                resizeMode="contain"
                source={require('../assets/images/account.png')}
                style={{
                  width: scale(20),
                  height: scale(20),
                  marginTop: scale(10),
                  tintColor: focused ? colors.PRIMARY : '#858796',
                }}
              />
            );
          },
          tabBarLabel: ({focused}) => {
            let colorChange = '#858796';
            if (focused) {
              colorChange = colors.PRIMARY;
            }
            return (
              <Text
                style={[
                  textStyles.normal,
                  {
                    color: colorChange,
                    fontSize: scale(9),
                    fontWeight: focused ? '700' : 'normal',
                  },
                ]}>
                {route.name}
              </Text>
            );
          },
        })}
      />
    </Tab.Navigator>
  );
}

export default BottomNavigator;

const styles = StyleSheet.create({
  containerNotif: {
    backgroundColor: 'red',
    position: 'absolute',
    top: 5,
    right: -5,
    height: 15,
    width: 17,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
