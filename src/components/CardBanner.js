import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {colors} from '../constants/colors';
import {textStyles} from '../constants/textStyles';
import {fullWidthScreen, scale} from '../utils/responsive';

const CardBanner = ({effect, title, name}) => {
  const {imageBackground, main, effect1, effect2} = effect;
  return (
    <View style={styles.container}>
      <View style={{flex: 1, justifyContent: 'center', marginLeft: 10}}>
        <Text style={[textStyles.Headline, styles.textHeadline]}>{title}</Text>
        <Text style={[textStyles.normal, styles.text]}>John Doe</Text>
      </View>
      <ImageBackground style={styles.imageBackground} source={imageBackground}>
        <View>
          <Image
            style={styles.image}
            source={require('../assets/images/profile.png')}
          />
          <Image style={styles.effect} resizeMode="contain" source={main} />
          <Image style={styles.effect1} resizeMode="contain" source={effect1} />
          <Image style={styles.effect2} resizeMode="contain" source={effect2} />
        </View>
      </ImageBackground>
    </View>
  );
};

export default CardBanner;

const styles = StyleSheet.create({
  imageBackground: {
    width: 140,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  effect: {
    width: 25,
    height: 25,
    position: 'absolute',
    right: 10,
    top: -15,
  },
  effect2: {
    width: 30,
    height: 30,
    position: 'absolute',
    left: -10,
    top: 5,
  },
  effect1: {
    width: 30,
    height: 30,
    position: 'absolute',
    right: -10,
    bottom: 5,
  },
  image: {
    width: scale(60),
    height: scale(60),
  },
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderLeftColor: colors.PRIMARY,
    borderLeftWidth: 5,
    marginVertical: 8,
    borderRadius: 10,
    width: fullWidthScreen - 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textHeadline: {
    fontSize: 18,
    color: colors.GRAY,
    marginBottom: 3,
  },
  text: {
    color: colors.GRAY,
    fontSize: 14,
  },
});
