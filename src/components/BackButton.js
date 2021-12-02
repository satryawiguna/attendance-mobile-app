import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import {textStyles} from '../constants/textStyles';

const BackButton = ({navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.container}>
      <Icon name="chevron-left" size={20} />
      <Text style={[textStyles.normal, styles.text]}>Back</Text>
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  container: {flexDirection: 'row', alignItems: 'center'},
  text: {
    fontSize: 15,
  },
});
