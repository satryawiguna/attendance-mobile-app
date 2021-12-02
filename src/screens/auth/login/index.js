import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm, Controller} from 'react-hook-form';
import * as yup from 'yup';

import CustomButton from '../../../components/CustomButton';
import CustomHeader from '../../../components/CustomHeader';
import CustomInput from '../../../components/CustomInput';
import {colors} from '../../../constants/colors';
import {textStyles} from '../../../constants/textStyles';
import {scale} from '../../../utils/responsive';
import {loginAction} from '../../../redux/authSlice';

const schema = yup.object().shape({
  email: yup.string().required('This is required.'),
  password: yup.string().required('This is required.'),
});

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });
  const rememberMeData = useSelector(state => state.auth.rememberMeData);
  const loading = useSelector(state => state.auth.loading);
  const [rememberMe, setRememberMe] = useState(rememberMeData.remember);

  const onSubmit = data => {
    dispatch(
      loginAction({
        username: data.email,
        password: data.password,
        isRememberMe: rememberMe,
        onFailed: (err) => {
          console.log('object', err);
          Alert.alert('Failed', err);
        },
      }),
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader />
      <View style={styles.containerForm}>
        <Text style={[textStyles.Headline, {fontSize: 20}]}>Hello!</Text>
        <Text style={[textStyles.normal, {fontSize: 15, color: 'gray'}]}>
          Enter your e-mail and password to login
        </Text>
        <View style={{marginVertical: 8}} />
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <CustomInput
              placeholder="Enter Email Address..."
              onChangeText={value => onChange(value)}
              value={value}
              error={errors.email}
            />
          )}
          name="email"
          rules={{required: true}}
          defaultValue={rememberMeData.username}
        />
          {errors.email && (
            <Text style={styles.textError}>{errors.email.message}</Text>
          )}
        <View style={{marginVertical: 5}} />
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <CustomInput
              placeholder="Password"
              secureTextEntry
              onChangeText={value => onChange(value)}
              value={value}
              error={errors.password}
            />
          )}
          name="password"
          rules={{required: true}}
          defaultValue={rememberMeData.password}
        />
        {errors.password && (
          <Text style={styles.textError}>{errors.password.message}</Text>
        )}
        <View style={{marginVertical: 5}} />
        <TouchableOpacity
          onPress={() => setRememberMe(!rememberMe)}
          style={styles.containerRememberMe}>
          <View
            style={[
              styles.checkBox,
              {backgroundColor: rememberMe ? colors.PRIMARY : 'white'},
            ]}
          />
          <Text style={[textStyles.normal, {color: 'gray'}]}>Remember Me</Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <View style={{flexDirection: 'row', flex: 1}}>
          <Text
            onPress={() => navigation.navigate('Register')}
            style={[
              textStyles.normal,
              {
                height: 30,
                color: colors.DARK_BLUE,
                fontSize: 14,
                flex: 1,
              },
            ]}>
            Create an Account
          </Text>
          <Text
            onPress={() => navigation.navigate('Forget')}
            style={[
              textStyles.normal,
              {
                height: 30,
                color: 'gray',
                fontSize: 14,
              },
            ]}>
            Forgot Password?
          </Text>
        </View>
        <CustomButton
          isLoading={loading}
          title="Login"
          onPress={handleSubmit(onSubmit)}
        />
        <View style={{marginVertical: 20}} />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  textError: {
    color: 'red',
    fontSize: 11,
    marginLeft: 14,
  },
  line: {
    backgroundColor: 'gray',
    height: 1,
    width: '100%',
    marginVertical: 10,
  },
  checkBox: {
    width: 15,
    height: 15,
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 6,
  },
  containerRememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
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
