import {Platform, StyleSheet} from 'react-native';

export const textStyles = StyleSheet.create({
  Headline: {
    fontSize: 30,
    fontFamily: Platform.OS === 'android' ? 'Nunito-SemiBold' : null,
  },
  Subline: {
    fontSize: 18,
    fontWeight: '200',
    fontFamily: Platform.OS === 'android' ? 'Avenir-light' : null,
  },
  normal: {
    fontSize: 12,
    fontFamily: Platform.OS === 'android' ? 'Nunito-Regular' : null,
  },
  normalBold: {
    fontSize: 12,
    fontFamily: Platform.OS === 'android' ? 'Nunito-SemiBold' : null,
  },
});
