import {CommonActions} from '@react-navigation/routers';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import {launchCamera} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-native-modal';

import BackButton from '../../components/BackButton';
import CustomHeader from '../../components/CustomHeader';
import {colors} from '../../constants/colors';
import {textStyles} from '../../constants/textStyles';
import {DASHBOARD_API} from '../../consts/api';
import {
  checkInAction,
  checkOutAction,
  shiftStartAction,
} from '../../redux/dashboardSlice';
import {scale} from '../../utils/responsive';

const Card = ({title, image, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text style={[textStyles.Headline, {fontSize: 24, width: '60%'}]}>
        {title}
      </Text>
      <View style={{flex: 1}} />
      <Image
        resizeMode="contain"
        source={image}
        style={{height: scale(65), width: scale(65)}}
      />
    </TouchableOpacity>
  );
};

const AttendanceMethodScreen = ({navigation, route}) => {
  const token = useSelector(state => state.auth.user.token);
  const dispatch = useDispatch();

  const {endShift} = route.params;

  const [biometricsType, setBiometricsType] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkBiometryc = () => {
    ReactNativeBiometrics.isSensorAvailable().then(resultObject => {
      const {available, biometryType} = resultObject;

      if (available && biometryType === ReactNativeBiometrics.TouchID) {
        setBiometricsType('finger');
      } else if (available && biometryType === ReactNativeBiometrics.FaceID) {
        setBiometricsType('face');
      } else if (
        available &&
        biometryType === ReactNativeBiometrics.Biometrics
      ) {
        setBiometricsType('finger');
      } else {
        Alert.alert('Warning', 'Biometrics not supported');
      }
    });
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message:"App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission given");
        openCamera();
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const openCamera = () => {
    launchCamera({mediaType: 'photo'}, res => {
      if (res.errorCode) {
        return;
      }

      if (res.didCancel) {
        return;
      }

      const photo = res.assets[0];
      setLoading(true);

      const form = new FormData();
      form.append('photo', {
        name: photo.fileName,
        uri:
          Platform.OS === 'android'
            ? photo.uri
            : photo.uri.replace('file://', ''),
        type: photo.type,
      });

      axios
        .post(`${DASHBOARD_API.FACE_VERIFICATION}`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          setLoading(false);
          if (endShift) {
            dispatch(
              checkOutAction({
                onSuccess: () => {
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 1,
                      routes: [{name: 'Dashboard'}, {name: 'AttedanceRecord'}],
                    }),
                  );
                  dispatch(shiftStartAction());
                  Alert.alert('Info', 'Scan Success');
                },
                onFailed: () => {
                  Alert.alert('Error', 'Something Wrong!');
                },
              }),
            );
            return;
          }
          dispatch(
            checkInAction({
              onSuccess: () => {
                dispatch(shiftStartAction());
                navigation.navigate('Dashboard');
                Alert.alert('Info', 'Scan Success');
              },
              onFailed: () => {
                Alert.alert('Error', 'Something Wrong!');
              },
            }),
          );
        })
        .catch(err => {
          setLoading(false);
          Alert.alert('Failed', 'Face not verified');
          console.log('err', err.response);
        });
    });
  };

  useEffect(() => {
    checkBiometryc();
  });

  return (
    <View style={styles.container}>
      <CustomHeader white />
      <View style={{paddingHorizontal: scale(15), paddingTop: 15}}>
        <BackButton navigation={navigation} />
        <View style={{marginVertical: 6}} />
        <Text style={[textStyles.normalBold, {fontSize: scale(17)}]}>
          Select Attendance Method
        </Text>
        <View style={{marginVertical: 5}} />
        {biometricsType === 'face' && (
          <Card
            onPress={() => navigation.navigate('Face')}
            title="Face Recognitaion"
            image={require('../../assets/images/face-recognition.png')}
          />
        )}
        <View style={{marginVertical: 10}} />
        <Card
          onPress={() => navigation.navigate('Scanner', {endShift})}
          title="ID Card Scan"
          image={require('../../assets/images/id-card.png')}
        />
        {/* {biometricsType === 'finger' && (
          <Card
            onPress={() => navigation.navigate('Finger')}
            title="Fingerpirnt"
            image={require('../../assets/images/finger-print.png')}
          />
        )} */}
        <View style={{marginVertical: 10}} />
        <Card
          onPress={requestCameraPermission}
          title="Face Recognize"
          image={require('../../assets/images/face-recognition.png')}
        />
      </View>
      <Modal isVisible={loading}>
        <View style={{alignItems: 'center'}}>
          <ActivityIndicator color={colors.PRIMARY} size="large" />
          <Text style={{color: 'white', marginTop: 5}}>Please wait...</Text>
        </View>
      </Modal>
    </View>
  );
};

export default AttendanceMethodScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.BACKGROUND,
    flex: 1,
  },
  card: {
    backgroundColor: 'white',
    width: '100%',
    height: scale(100),
    borderRadius: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textTitle: {
    color: colors.GRAY,
    fontSize: 24,
    marginLeft: 15,
  },
});
