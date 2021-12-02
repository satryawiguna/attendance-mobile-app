import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../constants/colors';
import {textStyles} from '../../constants/textStyles';
import {scale} from '../../utils/responsive';

const Item = ({image, title, color}) => {
  return (
    <TouchableOpacity style={[styles.containerItem, {borderLeftColor: color}]}>
      <Image style={styles.image} source={image} resizeMode="contain" />
      <Text
        style={[
          textStyles.normalBold,
          {color, textAlign: 'center', width: '70%', fontSize: 11},
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const AttadanceItems = () => {
  return (
    <View style={styles.container}>
      <Item
        color={colors.YELLOW}
        title="Attendance Summary"
        image={require('../../assets/images/attendance-summary.png')}
      />
      <Item
        color={colors.CYAN}
        title="Leave Submission"
        image={require('../../assets/images/leave-submission.png')}
      />
      <Item
        color={colors.PURPLE}
        title="Attendance History"
        image={require('../../assets/images/attendace-history.png')}
      />
    </View>
  );
};

export default AttadanceItems;

const styles = StyleSheet.create({
  image: {
    width: scale(30),
    height: scale(30),
    marginBottom: 5,
  },
  container: {
    flexDirection: 'row',
  },
  containerItem: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    paddingVertical: 10,
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
