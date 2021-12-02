import React, {useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppIntroSlider from 'react-native-app-intro-slider';
import {CommonActions} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import RenderItem from './RenderItem';
import {textStyles} from '../../../constants/textStyles';
import {landingAction} from '../../../redux/authSlice';

const data = [
  {
    key: 'one',
    image: require('../../../assets/images/Group.png'),
    title: 'Welcome!',
    text: 'Introducing Smartbiz Attendance app! Using cloud data system making it easy to access anytime and anywhere!',
  },
  {
    key: 'two',
    image: require('../../../assets/images/Group2.png'),
    title: 'Effortless',
    text: 'As a self-service portal, employee can check-in and check-out to apply leaves, push notification, news, and many more',
  },
  {
    key: 'three',
    image: require('../../../assets/images/Group3.png'),
    title: 'More Features',
    text: 'Change the way you manage workforce, employee’s time off and payroll!',
  },
];

const LandingScreen = ({navigation}) => {
  const [indexSlide, setIndexSlide] = useState(0);
  const appIntroRef = useRef(null);
  const dispatch = useDispatch();

  const _next = login => {
    if (login) {
      dispatch(landingAction());
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'AuthLanding'}],
        }),
      );
      // navigation.navigate('AuthLanding');
      return;
    }

    if (appIntroRef.current) {
      if (data.length - 1 > indexSlide) {
        appIntroRef.current.goToSlide(indexSlide + 1);
        setIndexSlide(indexSlide + 1);
      }
    }
  };

  const _back = skip => {
    if (appIntroRef.current) {
      if (skip) {
        appIntroRef.current.goToSlide(data.length - 1);
        setIndexSlide(data.length - 1);
        return;
      }

      if (indexSlide > 0) {
        appIntroRef.current.goToSlide(indexSlide - 1);
        setIndexSlide(indexSlide - 1);
      }
    }
  };

  const _onSlideChange = index => {
    setIndexSlide(index);
  };

  return (
    <LinearGradient colors={['#024B75', '#002B45']} style={styles.container}>
      <AppIntroSlider
        ref={appIntroRef}
        renderPagination={() => <View />}
        onSlideChange={index => _onSlideChange(index)}
        showDoneButton={false}
        renderItem={({item}) => <RenderItem item={item} />}
        data={data}
        showNextButton={false}
      />
      <View style={{paddingHorizontal: 15}}>
        <View style={styles.line} />
        <View style={styles.containerBottom}>
          <Text
            style={[textStyles.Subline, {color: 'gray', flex: 1}]}
            onPress={indexSlide === 0 ? () => _back(true) : () => _back(false)}>
            {indexSlide === 0 ? 'Skip' : 'Back'}
          </Text>
          <Text
            style={[textStyles.Subline, {color: 'white'}]}
            onPress={() => _next(indexSlide === 2)}>
            {indexSlide !== data.length - 1 ? 'Next' : 'Login'}
          </Text>
        </View>
      </View>
      <View style={styles.containerDot}>
        <View
          style={[
            styles.dot,
            {backgroundColor: indexSlide === 0 ? 'white' : 'rgba(0,0,0,0)'},
          ]}
        />
        <View
          style={[
            styles.dot,
            {
              marginHorizontal: 10,
              backgroundColor: indexSlide === 1 ? 'white' : 'rgba(0,0,0,0)',
            },
          ]}
        />
        <View
          style={[
            styles.dot,
            {backgroundColor: indexSlide === 2 ? 'white' : 'rgba(0,0,0,0)'},
          ]}
        />
      </View>
    </LinearGradient>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  containerDot: {
    flexDirection: 'row',
    position: 'absolute',
    top: '62%',
    left: '41%',
  },
  line: {
    backgroundColor: '#045281',
    height: 1,
    width: '100%',
    marginVertical: 20,
  },
  container: {
    flex: 1,
  },
  containerBottom: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  dot: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'white',
    height: 17,
    width: 17,
    borderRadius: 100,
  },
});
