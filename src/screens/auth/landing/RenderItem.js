import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {textStyles} from '../../../constants/textStyles';
import {
  fullHeightScreen,
  fullWidthScreen,
  scale,
} from '../../../utils/responsive';

const ratio = fullHeightScreen / fullWidthScreen;
const RenderItem = ({item, index}) => {
  return (
    <View style={styles.slide}>
      <Image
        resizeMode="contain"
        source={item.image}
        style={{
          width: scale(ratio > 1.8 ? 300 : item.key === 'three' ? 300 : 200),
          height: scale(ratio > 1.8 ? 300 : 200),
          marginVertical: scale(80),
        }}
      />
      <Text style={[textStyles.Headline, {color: 'white'}]}>{item.title}</Text>
      <Text style={[textStyles.Subline, {color: 'white', textAlign: 'center'}]}>
        {item.text}
      </Text>
    </View>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  image: {},
});

// ratio – 2.1653333333333333
