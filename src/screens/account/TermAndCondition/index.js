import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import BackButton from '../../../components/BackButton';
import CustomHeader from '../../../components/CustomHeader';
import {colors} from '../../../constants/colors';
import {textStyles} from '../../../constants/textStyles';
import {PROFILE_API} from '../../../consts/api';
import {
  fullHeightScreen,
  fullWidthScreen,
  scale,
} from '../../../utils/responsive';

const ratio = fullHeightScreen / fullWidthScreen;

const TermAndConditionScreen = ({navigation}) => {
  const [tna, setTna] = useState('Please wait...');

  useEffect(() => {
    axios
      .get(PROFILE_API.GET_TNC)
      .then(res => {
        setTna(res.data.data.term_and_condition);
      })
      .catch(err => {
        console.log('err', err);
      });
  }, []);

  return (
    <View style={styles.container}>
      <CustomHeader white />
      <View style={{paddingHorizontal: scale(15), paddingTop: 15}}>
        <BackButton navigation={navigation} />
        <View style={styles.containerSetting}>
          <Text
            style={[textStyles.Headline, {fontSize: 20, alignSelf: 'center'}]}>
            Terms and Conditions
          </Text>
          <Text
            style={[textStyles.Headline, {fontSize: 15, alignSelf: 'center'}]}>
            Lorem ipsum dolor
          </Text>
          <View style={styles.containerTerm}>
            <Text>{tna}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TermAndConditionScreen;

const styles = StyleSheet.create({
  containerTerm: {
    marginTop: 20,
    height: scale(ratio > 1.8 ? 400 : 300),
    width: '100%',
    borderWidth: 1,
    borderColor: colors.LIGHT_GRAY,
    borderRadius: 10,
    padding: 20,
  },
  container: {
    backgroundColor: colors.BACKGROUND,
    flex: 1,
  },
  containerSetting: {
    marginTop: 20,
    backgroundColor: 'white',
    marginBottom: 20,
    padding: scale(20),
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
