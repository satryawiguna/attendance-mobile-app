import React, {memo} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {scale} from '../utils/responsive';
import {textStyles} from '../constants/textStyles';

const CustomHeader = ({white}) => {
  if (white) {
    return (
      <>
        <SafeAreaView style={{backgroundColor: 'white'}} />
        <View
          style={[
            styles.container,
            {
              backgroundColor: 'white',
              flexDirection: 'row',
              justifyContent: 'flex-start',
            },
          ]}>
          <View style={{flex: 1}}>
            <Image
              resizeMode="contain"
              source={require('../assets/images/Smartbizattendancelogoblack.png')}
              style={styles.image}
            />
          </View>
          {/* <Image
            style={styles.icon}
            source={require('../assets/images/Search.png')}
          /> */}
          <View style={{marginRight: 10}}>
            <Icon name="ios-notifications" size={25} color={'#D1D2E2'} />
            <View style={styles.containerNotif}>
              <Text style={[textStyles.normal, {color: 'white', fontSize: 9}]}>
                3+
              </Text>
            </View>
          </View>
        </View>
      </>
    );
  }

  return (
    <>
      <SafeAreaView style={{backgroundColor: '#024B75'}} />
      <LinearGradient colors={['#024B75', '#002B45']} style={styles.container}>
        <Image
          resizeMode="contain"
          source={require('../assets/images/Smartbizattendancelogo.png')}
          style={styles.image}
        />
      </LinearGradient>
    </>
  );
};

export default memo(white => <CustomHeader white={white} />);

const styles = StyleSheet.create({
  containerNotif: {
    backgroundColor: 'red',
    position: 'absolute',
    top: 0,
    right: -5,
    height: 15,
    width: 17,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  container: {
    paddingHorizontal: 15,
    width: '100%',
    height: scale(45),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 100,
  },
});
