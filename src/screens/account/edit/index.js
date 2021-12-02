import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {useDispatch, useSelector} from 'react-redux';
import {useForm, Controller} from 'react-hook-form';
import * as yup from 'yup';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';

import BackButton from '../../../components/BackButton';
import CustomHeader from '../../../components/CustomHeader';
import CustomInput from '../../../components/CustomInput';
import {colors} from '../../../constants/colors';
import {textStyles} from '../../../constants/textStyles';
import {scale} from '../../../utils/responsive';
import CustomSelect from '../../../components/CustomSelect';
import CustomCalendarPicker from '../../../components/CustomCalendarPicker';
import CustomButton from '../../../components/CustomButton';
import {
  getProfileAction,
  updateProfileAction,
} from '../../../redux/profileSlice';
import {PROFILE_API} from '../../../consts/api';

const schema = yup.object().shape({
  name: yup.string().required('This is required.'),
  religion: yup.string().required('This is required.'),
  birtDate: yup.string().required('This is required.'),
  gender: yup.string().required('This is required.'),
  phone: yup.string().required('This is required.'),
  country: yup.string().required('This is required.'),
  province: yup.string().required('This is required.'),
  district: yup.string().required('This is required.'),
  postalCode: yup.string().required('This is required.'),
  address: yup.string().required('This is required.'),
});

const RELIGION_OPTIONS = [
  {label: 'Catholic', value: '3'},
  {label: 'Hindhu', value: '4'},
  {label: 'Muslim', value: '1'},
  {label: 'Buddha', value: '5'},
  {label: 'Protestant', value: '2'},
  {label: 'Kong Hu Chu', value: '6'},
];

const GENDER_OPTIONS = [
  {label: 'Male', value: 'male'},
  {label: 'Female', value: 'female'},
];

const COUNTRY_OPTIONS = [{label: 'Indonesia', value: '1'}];

const EditScreen = ({navigation}) => {
  const userProfile = useSelector(state => state.profile.userProfile);
  const userEmployee = useSelector(state => state.profile.userEmployee);
  const token = useSelector(state => state.auth.user.token);
  const loading = useSelector(state => state.profile.loading);
  const dispatch = useDispatch();

  const [stateOption, setStateOption] = useState([{label: '', value: ''}]);
  const [photo, setPhoto] = useState(null);
  const [cityOption, setCityOption] = useState([{label: '', value: ''}]);
  const [countryOption, setCountryOption] = useState([
    {label: 'Indonesia', value: '1'},
  ]);

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  const getState = () => {
    axios
      .get(PROFILE_API.GET_STATE, {
        params: {
          country_id: 1,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        const state = res.data.return.map(item => ({
          label: item.state_name,
          value: item.id,
        }));
        setStateOption([...stateOption, ...state]);
      })
      .catch(err => {
        console.log('err', err.response);
      });
  };

  const getCity = id => {
    setCityOption([{label: '', value: ''}]);
    axios
      .get(PROFILE_API.GET_CITY, {
        params: {
          state_id: id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        const city = res.data.return.map(item => ({
          label: item.city_name,
          value: item.id,
        }));
        setCityOption([{label: '', value: ''}, ...city]);
      });
  };

  const getCountry = () => {
    axios
      .get(PROFILE_API.GET_COUNTRY, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        const country = res.data.return.map(item => ({
          label: item.country_name,
          value: item.id,
        }));
        setCountryOption(country);
      });
  };

  const submitAction = data => {
    dispatch(
      updateProfileAction({
        photo: photo,
        password: undefined,
        gender: data.gender.toUpperCase(),
        fullName: data.name,
        nickName: data.name,
        phone: data.phone,
        countryId: 1,
        stateId: data.province,
        cityId: data.district,
        address: data.address,
        postcode: data.postalCode,
        religionId: data.religion,
        birthDate: data.birtDate,
        onSuccess: () => {
          dispatch(getProfileAction());
          navigation.goBack();
        },
        onFailed: () => {
          console.log('error');
          Alert.alert('error', err.response);
        },
      }),
    );
  };

  const openLibrary = () => {
    launchImageLibrary({mediaType: 'photo', includeBase64: true}, res => {
      if (res.didCancel) {
        return;
      }
      setPhoto(res.assets[0]);
    });
  };

  useEffect(() => {
    getCountry();
    getState();

    if (userProfile.state_id) {
      getCity(userProfile.state_id);
    }
  }, []);

  const imageProfile = () => {
    if (userProfile.photo_profile)
      return {
        uri: `https://app.attendance.smartbiz.id/${userProfile.photo_profile}`,
      };

    if (photo) {
      return {uri: `data:image/png;base64,${photo.base64}`};
    }

    return require('../../../assets/images/profile.png');
  };

  return (
    <View style={styles.container}>
      <CustomHeader white />
      <ScrollView style={{paddingHorizontal: scale(15), paddingTop: 15}}>
        <BackButton navigation={navigation} />
        <TouchableOpacity
          onPress={openLibrary}
          style={{alignSelf: 'center', alignItems: 'center'}}>
          <Image
            style={{height: scale(90), width: scale(90), borderRadius: 100}}
            source={imageProfile()}
          />
          <Image
            style={styles.containerImagePP}
            source={require('../../../assets/images/edit-pp.png')}
          />
          <Text
            style={[
              textStyles.normalBold,
              {fontSize: scale(16), marginTop: 5},
            ]}>
            {userProfile.full_name}
          </Text>
        </TouchableOpacity>
        <View style={{marginVertical: 10}} />
        <View style={styles.containerSetting}>
          <Text style={[textStyles.normalBold, {fontSize: scale(19)}]}>
            Profile
          </Text>
          <View style={{marginVertical: 5}} />
          <Text style={[textStyles.normalBold, {fontSize: scale(15)}]}>
            Full Name
          </Text>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <CustomInput
                onChangeText={value => onChange(value)}
                value={value}
                borderRadius={5}
              />
            )}
            name="name"
            rules={{required: true}}
            defaultValue={userProfile.full_name}
          />
          {errors.name && (
            <Text style={styles.textError}>{errors.name.message}</Text>
          )}

          <View style={{marginVertical: 5}} />
          <Text style={[textStyles.normalBold, {fontSize: scale(15)}]}>
            NIK
          </Text>
          <CustomInput borderRadius={5} value={userEmployee.nik} isDisable />
          <View style={{marginVertical: 5}} />
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text style={[textStyles.normalBold, {fontSize: scale(15)}]}>
                Religion
              </Text>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <CustomSelect
                    paddingVertical={10}
                    options={RELIGION_OPTIONS}
                    value={value}
                    setValue={v => onChange(v)}
                  />
                )}
                name="religion"
                rules={{required: true}}
                defaultValue="4"
              />
            </View>
            {errors.religion && (
              <Text style={styles.textError}>{errors.religion.message}</Text>
            )}

            <View style={{marginHorizontal: 5}} />
            <View style={{flex: 1}}>
              <Text style={[textStyles.normalBold, {fontSize: scale(15)}]}>
                Birth Date
              </Text>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <CustomCalendarPicker
                    setDate={v => onChange(v)}
                    date={value}
                  />
                )}
                name="birtDate"
                rules={{required: true}}
                defaultValue={userProfile.birth_date || ''}
              />
              {errors.birtDate && (
                <Text style={styles.textError}>{errors.birtDate.message}</Text>
              )}
            </View>
          </View>

          <View style={{marginVertical: 5}} />
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text style={[textStyles.normalBold, {fontSize: scale(15)}]}>
                Gender
              </Text>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <CustomSelect
                    paddingVertical={10}
                    options={GENDER_OPTIONS}
                    value={value}
                    setValue={v => onChange(v)}
                  />
                )}
                name="gender"
                rules={{required: true}}
                defaultValue={userProfile.gender.toLowerCase()}
              />
              {errors.gender && (
                <Text style={styles.textError}>{errors.gender.message}</Text>
              )}
            </View>

            <View style={{marginHorizontal: 5}} />
            <View style={{flex: 1}}>
              <Text style={[textStyles.normalBold, {fontSize: scale(15)}]}>
                Phone
              </Text>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <CustomInput
                    isDisable
                    keyboardType="phone-pad"
                    onChangeText={value => onChange(value)}
                    value={value}
                    borderRadius={5}
                  />
                )}
                name="phone"
                rules={{required: true}}
                defaultValue={userProfile.phone}
              />
              {errors.phone && (
                <Text style={styles.textError}>{errors.phone.message}</Text>
              )}
            </View>
          </View>

          <View style={{marginVertical: 5}} />
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text style={[textStyles.normalBold, {fontSize: scale(15)}]}>
                Country
              </Text>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <CustomSelect
                    paddingVertical={10}
                    options={COUNTRY_OPTIONS}
                    value={value}
                    setValue={v => onChange(v)}
                  />
                )}
                name="country"
                rules={{required: true}}
                defaultValue="1"
              />
              {errors.country && (
                <Text style={styles.textError}>{errors.country.message}</Text>
              )}
            </View>

            <View style={{marginHorizontal: 5}} />
            <View style={{flex: 1}}>
              <Text style={[textStyles.normalBold, {fontSize: scale(15)}]}>
                Province
              </Text>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => {
                  return (
                    <CustomSelect
                      isDisable={stateOption.length < 2}
                      paddingVertical={10}
                      options={stateOption}
                      value={value}
                      setValue={v => {
                        onChange(v);
                        getCity(v);
                        setValue('district', '');
                      }}
                    />
                  );
                }}
                name="province"
                rules={{required: true}}
                defaultValue={userProfile.state_id || ''}
              />
              {errors.province && (
                <Text style={styles.textError}>{errors.province.message}</Text>
              )}
            </View>
          </View>

          <View style={{marginVertical: 5}} />
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text style={[textStyles.normalBold, {fontSize: scale(15)}]}>
                District
              </Text>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => {
                  return (
                    <CustomSelect
                      isDisable={cityOption.length <= 1}
                      paddingVertical={10}
                      options={cityOption}
                      value={value}
                      setValue={v => onChange(v)}
                    />
                  );
                }}
                name="district"
                rules={{required: true}}
                defaultValue={userProfile.city_id || ''}
              />
              {errors.district && (
                <Text style={styles.textError}>{errors.district.message}</Text>
              )}
            </View>

            <View style={{marginHorizontal: 5}} />
            <View style={{flex: 1}}>
              <Text style={[textStyles.normalBold, {fontSize: scale(15)}]}>
                Postal Code
              </Text>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <CustomInput
                    onChangeText={value => onChange(value)}
                    value={value}
                    borderRadius={5}
                  />
                )}
                name="postalCode"
                rules={{required: true}}
                defaultValue={userProfile.postcode || ''}
              />
              {errors.postalCode && (
                <Text style={styles.textError}>
                  {errors.postalCode.message}
                </Text>
              )}
            </View>
          </View>

          <View style={{marginVertical: 5}} />
          <Text style={[textStyles.normalBold, {fontSize: scale(15)}]}>
            Address
          </Text>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <CustomInput
                multiline
                onChangeText={value => onChange(value)}
                value={value}
                borderRadius={5}
              />
            )}
            name="address"
            rules={{required: true}}
            defaultValue={userEmployee.address || ''}
          />
          {errors.address && (
            <Text style={styles.textError}>{errors.address.message}</Text>
          )}

          <View style={{marginVertical: 10}} />
          <CustomButton
            isLoading={loading}
            onPress={handleSubmit(submitAction)}
            icon="check-circle"
            title="Save"
            backgroundColor={colors.DARK_BLUE}
            paddingVertical={5}
            borderRadius={5}
            paddingHorizontal={15}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default EditScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.BACKGROUND,
    flex: 1,
  },
  containerImagePP: {
    height: scale(30),
    width: scale(30),
    borderRadius: 100,
    position: 'absolute',
    right: 0,
    bottom: scale(25),
  },
  containerSetting: {
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
  textError: {
    color: 'red',
    fontSize: 11,
  },
});
