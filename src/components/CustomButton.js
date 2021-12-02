import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {colors} from '../constants/colors';
import {textStyles} from '../constants/textStyles';
import {scale} from '../utils/responsive';

const CustomButton = ({title, onPress, isLoading}) => {

  // if (isLoading) {
  //   return <ActivityIndicator size="large" color="blue" style={{alignSelf: 'center'}} />
  // }

  return (
    <TouchableOpacity
      disabled={isLoading}
      onPress={onPress}
      style={styles.container}>
      <View style={{paddingVertical: scale(10)}}>
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={[textStyles.Subline, styles.text]}>{title}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  text: {
    color: 'white',
  },
});
