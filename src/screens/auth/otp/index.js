import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import CustomButton from '../../../components/CustomButton';
import CustomHeader from '../../../components/CustomHeader';
import {textStyles} from '../../../constants/textStyles';
import {scale} from '../../../utils/responsive';
import {colors} from '../../../constants/colors';
import {useDispatch, useSelector} from 'react-redux';
import {submitOtpAction} from '../../../redux/authSlice';

const OtpScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const [counting, setCounting] = useState(59);
  const [pin, setPin] = useState('');

  // const countingFunction = () => {
  //   let count = 59;
  //   const countDown = setInterval(() => {
  //     if (count <= 1) {
  //       clearInterval(countDown);
  //     }
  //     count--;
  //     setCounting(count);
  //   }, 1000);
  // };

  // useEffect(countingFunction, []);

  const submitOtp = () => {
    dispatch(
      submitOtpAction({
        email: route.params.data.email,
        otp: pin,
        onSuccess: () => {
          navigation.navigate('Login');
        },
        onFailed: err => {
          Alert.alert('Failed', err);
        },
      }),
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader />
      <View style={styles.containerForm}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="chevron-left" size={20} />
          <Text style={[textStyles.normal, {fontSize: 15}]}>Back</Text>
        </TouchableOpacity>
        <View style={{marginVertical: 8}} />
        <Text style={[textStyles.Headline, {fontSize: 20}]}>
          OTP Verification
        </Text>
        <Text style={[textStyles.normal, {fontSize: 15, color: 'gray'}]}>
          Please enter 6-digit code we have send to your phone number.
        </Text>
        <OTPInputView
          onCodeChanged={v => setPin(v)}
          pinCount={6}
          style={{width: '100%', height: 80}}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
        />
        <Text
          style={[
            textStyles.normalBold,
            {fontSize: 15, color: colors.PRIMARY, flex: 1},
          ]}>
          {/* Resend code in 00:
          {counting === 0 ? '00' : counting < 10 ? `0${counting}` : counting} */}
        </Text>
        <CustomButton isLoading={loading} onPress={submitOtp} title="Register Account" />
        <View style={{marginVertical: 20}} />
      </View>
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  containerForm: {
    marginTop: scale(15),
    paddingHorizontal: scale(15),
    flex: 1,
  },
  underlineStyleBase: {
    color: 'black',
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
});
