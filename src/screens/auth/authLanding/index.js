import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import CustomButton from '../../../components/CustomButton';
import {scale} from '../../../utils/responsive';

const AuthLandingScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerImage}>
        <Image
          resizeMode="contain"
          source={require('../../../assets/images/logo.png')}
          style={styles.image}
        />
        <Image
          resizeMode="contain"
          source={require('../../../assets/images/title.png')}
          style={styles.imageTitle}
        />
      </View>
      <CustomButton
        onPress={() => navigation.navigate('Login')}
        title="Login Account"
      />
      <View style={{paddingVertical: 5}} />
      <CustomButton
        onPress={() => navigation.navigate('UniqeCode')}
        title="Create Account"
      />
    </View>
  );
};

export default AuthLandingScreen;

const styles = StyleSheet.create({
  containerImage: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(40),
  },
  container: {
    flex: 1,
    paddingHorizontal: scale(30),
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    marginBottom: 50,
  },
  image: {
    width: scale(200),
    height: scale(200),
  },
  imageTitle: {
    marginTop: -scale(10),
    width: scale(270),
    height: scale(100),
  },
});
