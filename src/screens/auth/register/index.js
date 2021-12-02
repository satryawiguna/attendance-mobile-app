import React, {useEffect, useState} from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  ImageBackground,
} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm, Controller} from 'react-hook-form';
import * as yup from 'yup';
import Icon from 'react-native-vector-icons/Entypo';
import RNPickerSelect from 'react-native-picker-select';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {launchImageLibrary} from 'react-native-image-picker';

import CustomButton from '../../../components/CustomButton';
import CustomHeader from '../../../components/CustomHeader';
import CustomInput from '../../../components/CustomInput';
import {textStyles} from '../../../constants/textStyles';
import {scale} from '../../../utils/responsive';
import {useDispatch, useSelector} from 'react-redux';
import {registerAction} from '../../../redux/authSlice';
import {OTHER_API} from '../../../consts/api';
import {colors} from '../../../constants/colors';

const GENDERS = [
  {
    name: 'Male',
    id: 'MALE',
  },
  {
    name: 'Female',
    id: 'FEMALE',
  },
];

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('This is required.'),
  id: yup.string().required('This is required.'),
  password: yup.string().required('This is required.').min(8),
  name: yup.string().required('This is required.'),
  username: yup.string().required('This is required.'),
  nickName: yup.string().required('This is required.'),
  phone: yup.string().required('This is required.'),
});

const RegisterScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const {data} = route.params;

  console.log('dataa', data);

  const [offices, setOffices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [companyId, setCompanyId] = useState(data.company_id);
  const [errorCompanyId, setErrorCompanyId] = useState(false);
  const [gender, setGender] = useState(data.gender);
  const [errorGender, setErrorGender] = useState(false);
  const [photo, setPhoto] = useState(null);

  const [isCompany, setIsCompany] = useState(true);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  const openLibrary = () => {
    launchImageLibrary({mediaType: 'photo'}, res => {
      if (res.didCancel) {
        return;
      }
      setPhoto(res.assets[0]);
    });
  };

  const onSubmit = currentData => {
    let phoneNumber =
      currentData.phone[0] === '0'
        ? currentData.phone.substring(1)
        : currentData.phone;
    phoneNumber =
      phoneNumber[0] === '6' && phoneNumber[1] === '2'
        ? phoneNumber
        : `0${phoneNumber}`;

    if (!companyId) {
      setErrorCompanyId(true);
      return;
    }

    if (!gender) {
      setErrorGender(true);
      return;
    }

    navigation.navigate('UploadImage', {
      data: currentData,
      other: {phoneNumber, companyId, gender},
      supp: {data},
    });
    // dispatch(
    //   registerAction({
    //     email: currentData.email,
    //     username: currentData.username,
    //     nick_name: currentData.nickName,
    //     password: currentData.password,
    //     confirm_password: currentData.password,
    //     device_id: '',
    //     full_name: currentData.name,
    //     phone: phoneNumber,
    //     nip: currentData.id,
    //     company_id: companyId,
    //     gender,
    //     photo,
    //     religion_id: data.religion_id,
    //     birth_date: data.birth_date,
    //     onSuccess: () => {
    //       navigation.navigate('Otp', {data: currentData});
    //     },
    //     onFailed: err => {
    //       Alert.alert('Failed', err);
    //     },
    //   }),
    // );
  };

  useEffect(() => {
    axios.get(OTHER_API.GET_COMPANY).then(res => {
      const {data} = res;
      const raw = data.return.map(item => ({
        value: item.id,
        label: item.name,
      }));
      console.log(raw);
      setOffices(raw);
    });
  }, []);

  const _changeChoice = choice => {
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <CustomHeader />
      <ScrollView style={{flex: 1}}>
        <View style={styles.containerForm}>
          <Text style={[textStyles.Headline, {fontSize: 20}]}>
            Create an Account
          </Text>

          <View style={{marginVertical: 5}} />
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <CustomInput
                placeholder="Username"
                onChangeText={value => onChange(value)}
                value={value}
                error={errors.username}
              />
            )}
            name="username"
            rules={{required: true}}
            defaultValue=""
          />
          {errors.username && (
            <Text style={styles.textError}>{errors.username.message}</Text>
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
            defaultValue=""
          />
          {errors.password && (
            <Text style={styles.textError}>{errors.password.message}</Text>
          )}
          <View style={{marginVertical: 5}} />
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <CustomInput
                isDisable
                placeholder="Full Name"
                onChangeText={value => onChange(value)}
                value={value}
                error={errors.name}
              />
            )}
            name="name"
            rules={{required: true}}
            defaultValue={data.full_name}
          />
          {errors.name && (
            <Text style={styles.textError}>{errors.name.message}</Text>
          )}
          <View style={{marginVertical: 5}} />
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <CustomInput
                isDisable
                placeholder="Nick Name"
                onChangeText={value => onChange(value)}
                value={value}
                error={errors.nickName}
              />
            )}
            name="nickName"
            rules={{required: true}}
            defaultValue={data.nick_name}
          />
          {errors.nickName && (
            <Text style={styles.textError}>{errors.nickName.message}</Text>
          )}
          <View style={{marginVertical: 5}} />
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <CustomInput
                isDisable
                keyboardType="phone-pad"
                placeholder="ID Number (NIP)"
                onChangeText={value => onChange(value)}
                value={value}
                error={errors.id}
              />
            )}
            name="id"
            rules={{required: true}}
            defaultValue={data.nip}
          />
          {errors.id && (
            <Text style={styles.textError}>{errors.id.message}</Text>
          )}
          <View style={{marginVertical: 5}} />
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <CustomInput
                isDisable
                placeholder="Email Address"
                keyboardType="email-address"
                onChangeText={value => onChange(value)}
                value={value}
                error={errors.email}
              />
            )}
            name="email"
            rules={{required: true}}
            defaultValue={data.email}
          />
          {errors.email && (
            <Text style={styles.textError}>{errors.email.message}</Text>
          )}
          <View style={{marginVertical: 5}} />
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <CustomInput
                isDisable
                placeholder="Phone Number"
                number
                keyboardType="email-address"
                onChangeText={value => onChange(value)}
                value={value}
                error={errors.phone}
              />
            )}
            name="phone"
            rules={{required: true}}
            defaultValue={data.phone}
          />
          {errors.phone && (
            <Text style={styles.textError}>{errors.phone.message}</Text>
          )}
          {offices.length > 0 && (
            <View style={styles.inputIOS}>
              <View style={{flex: 1}}>
                {Platform.OS === 'ios' ? (
                  <RNPickerSelect
                    value={companyId}
                    onValueChange={value => setCompanyId(value)}
                    items={offices}
                  />
                ) : (
                  <Text style={{color: 'gray'}}>
                    {companyId
                      ? offices.find(item => item.value === companyId).label
                      : 'Choose company'}
                  </Text>
                )}
              </View>
              <Icon name="chevron-small-down" color={'gray'} size={20} />
            </View>
          )}
          {errorCompanyId && (
            <Text style={styles.textError}>This is require</Text>
          )}

          <View style={styles.inputIOS}>
            <View style={{flex: 1}}>
              <Text style={{color: 'gray'}}>
                {gender
                  ? GENDERS.find(item => item.id === gender).name
                  : 'Choose Gender'}
              </Text>
            </View>
            <Icon name="chevron-small-down" color={'gray'} size={20} />
          </View>
          {errorGender && <Text style={styles.textError}>This is require</Text>}

          {/* <View style={{marginVertical: 5}} />

          <Text style={{marginBottom: 5}}>Pilih photo</Text>
          <Pressable style={{width: '50%'}} onPress={openLibrary}>
            <ImageBackground
              source={{
                uri: photo ? photo.uri : null,
              }}
              style={styles.image}>
              {!photo && (
                <AntDesign name="pluscircleo" size={25} color={colors.GRAY} />
              )}
            </ImageBackground>
          </Pressable> */}

          <View style={styles.line} />
          <View
            style={{flexDirection: 'row', flex: 1, justifyContent: 'center'}}>
            <Text
              onPress={() => navigation.goBack()}
              style={[
                textStyles.normal,
                {
                  color: 'gray',
                  fontSize: 14,
                },
              ]}>
              Back to Login Page
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={{paddingHorizontal: scale(30), marginVertical: scale(20)}}>
        <CustomButton
          isLoading={loading}
          title="Next"
          onPress={handleSubmit(onSubmit)}
        />
      </View>

      <Modal
        animationType="slide"
        visible={showModal}
        style={styles.view}
        onBackdropPress={() => setShowModal(false)}
        onBackButtonPress={() => setShowModal(false)}>
        <SafeAreaView />
        <View style={{backgroundColor: 'white', padding: 20}}>
          {isCompany
            ? offices.map(item => (
                <View key={item.value}>
                  <Text
                    onPress={() => {
                      setShowModal(false);
                      setCompanyId(item.value);
                      setErrorCompanyId(false);
                    }}
                    style={[textStyles.normalBold, {fontSize: 16}]}>
                    {item.label}
                  </Text>
                  <View style={styles.line} />
                </View>
              ))
            : GENDERS.map(item => (
                <View key={item.id}>
                  <Text
                    onPress={() => {
                      setShowModal(false);
                      setErrorGender(false);
                      setGender(item.id);
                    }}
                    style={[textStyles.normalBold, {fontSize: 16}]}>
                    {item.name}
                  </Text>
                  <View style={styles.line} />
                </View>
              ))}
        </View>
      </Modal>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
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
  textError: {
    color: 'red',
    fontSize: 11,
    marginLeft: 14,
  },
  inputIOS: {
    paddingVertical: 10,
    borderRadius: 100,
    borderWidth: 1,
    width: '100%',
    borderColor: 'gray',
    paddingHorizontal: 10,
    color: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: colors.DARK_WHITE,
  },
  image: {
    width: '100%',
    backgroundColor: colors.LIGHT_GRAY,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
