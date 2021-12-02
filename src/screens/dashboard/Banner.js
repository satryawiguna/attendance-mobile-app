import React from 'react';
import {StyleSheet, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';

import CardBanner from '../../components/CardBanner';
import {colors} from '../../constants/colors';
import {fullWidthScreen, scale} from '../../utils/responsive';

const Banner = () => {
  const [page, setPage] = React.useState(0);
  const data = [
    {
      title: 'Top Hits Employee',
      name: 'John Dae',
      effect: {
        imageBackground: require('../../assets/images/effect1.png'),
        main: require('../../assets/images/crown-effect.png'),
        effect1: require('../../assets/images/star-effect-1.png'),
        effect2: require('../../assets/images/star-effect-2.png'),
      },
    },
    {
      title: 'Latest Employee',
      name: 'John Dae',
      effect: {
        imageBackground: require('../../assets/images/effect2.png'),
        effect1: require('../../assets/images/emot-effect-1.png'),
        effect2: require('../../assets/images/emot-effect-2.png'),
      },
    },
    {
      title: 'Current Check-In',
      name: 'John Dae',
      effect: {imageBackground: require('../../assets/images/effect3.png')},
    },
    {
      title: 'Current Check-Out',
      name: 'John Dae',
      effect: {imageBackground: require('../../assets/images/effect3.png')},
    },
  ];
  return (
    <View>
      <Carousel
        loop
        keyExtractor={(_, index) => index.toString()}
        onSnapToItem={slide => setPage(slide)}
        sliderWidth={fullWidthScreen}
        inactiveSlideScale={1}
        itemWidth={fullWidthScreen}
        data={data}
        renderItem={({item}) => (
          <CardBanner title={item.title} effect={item.effect} />
        )}
      />
      <View style={styles.containerPagination}>
        {data.map((_, index) => (
          <View
            key={index.toString()}
            style={page === index ? styles.dotActive : styles.dot}
          />
        ))}
      </View>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  containerPagination: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginVertical: 10,
  },
  dot: {
    backgroundColor: '#056B8E',
    width: scale(10),
    height: scale(10),
    borderRadius: 30,
    marginHorizontal: scale(3),
    opacity: 0.5,
  },
  dotActive: {
    backgroundColor: colors.PRIMARY,
    width: scale(10),
    height: scale(10),
    borderRadius: 30,
    marginHorizontal: scale(3),
  },
});
