import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm, Controller} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';

import CustomButton from '../../../components/CustomButton';
import CustomHeader from '../../../components/CustomHeader';
import CustomInput from '../../../components/CustomInput';
import {colors} from '../../../constants/colors';
import {textStyles} from '../../../constants/textStyles';
import {scale} from '../../../utils/responsive';
import {forgotPasswordAction} from '../../../redux/authSlice';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('This is required.'),
});

const ForgetPasswordScreen = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });
  const loading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();

  const onSubmit = data => {
    dispatch(
      forgotPasswordAction({
        email: data.email,
        onSuccess: () => {
          Alert.alert('Success', 'Please check your email');
          navigation.goBack();
        },
        onFailed: () => {
          Alert.alert('Failed', 'Can not find the email');
        },
      }),
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader />
      <View style={styles.containerForm}>
        <Text style={[textStyles.Headline, {fontSize: 20}]}>
          Forgot your password?
        </Text>
        <Text style={[textStyles.normal, {fontSize: 15, color: 'gray'}]}>
          We get it, stuff happens. Just enter your email address below and
          we’ll send you a link to reset your password!
        </Text>
        <View style={{marginVertical: 8}} />
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <CustomInput
              placeholder="Enter Email Address..."
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="email"
          rules={{required: true}}
          defaultValue=""
        />
        {errors.email && (
          <Text style={styles.textError}>{errors.email.message}</Text>
        )}
        <View style={{marginVertical: 5}} />
        <View style={styles.line} />
        <View style={{flexDirection: 'row', flex: 1}}>
          <Text
            onPress={() => navigation.goBack()}
            style={[
              textStyles.normal,
              {
                height: 30,
                color: 'gray',
                fontSize: 14,
                flex: 1,
              },
            ]}>
            Back to Login Page
          </Text>
          <Text
            onPress={() => navigation.navigate('Register')}
            style={[
              textStyles.normal,
              {
                color: colors.DARK_BLUE,
                fontSize: 14,
                height: 30,
              },
            ]}>
            Create an Account
          </Text>
        </View>
        <CustomButton
          isLoading={loading}
          title="Reset Password"
          onPress={handleSubmit(onSubmit)}
        />
        <View style={{marginVertical: 20}} />
      </View>
    </View>
  );
};

export default ForgetPasswordScreen;

const styles = StyleSheet.create({
  textError: {
    color: 'red',
  },
  line: {
    backgroundColor: 'gray',
    height: 1,
    width: '100%',
    marginVertical: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  image: {
    width: scale(200),
    height: scale(200),
  },
  containerForm: {
    marginTop: scale(40),
    paddingHorizontal: scale(30),
    flex: 1,
  },
  imageTitle: {
    marginTop: -scale(10),
    width: scale(270),
    height: scale(100),
  },
});
