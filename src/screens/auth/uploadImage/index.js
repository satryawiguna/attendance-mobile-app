import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ImageBackground,
  ToastAndroid,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

import CustomHeader from '../../../components/CustomHeader';
import CustomButton from '../../../components/CustomButton';
import {textStyles} from '../../../constants/textStyles';
import {colors} from '../../../constants/colors';
import { registerAction } from '../../../redux/authSlice';

const UploadImageScreen = ({navigation, route}) => {
  const {data, other, supp} = route.params;
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const [photo, setPhoto] = useState(null);
  const [show, setShow] = useState(false);

  const submitAction = () => {
    if (!photo) {
      ToastAndroid.show('Please select photo', ToastAndroid.SHORT);
    }

    dispatch(
      registerAction({
        email: data.email,
        username: data.username,
        nick_name: data.nickName,
        password: data.password,
        confirm_password: data.password,
        device_id: '',
        full_name: data.name,
        phone: other.phoneNumber,
        nip: data.id,
        company_id: other.companyId,
        gender: other.gender,
        photo,
        religion_id: supp.data.religion_id,
        birth_date: supp.data.birth_date,
        onSuccess: () => {
          navigation.navigate('Otp', {data: data});
        },
        onFailed: err => {
          Alert.alert('Failed', err);
        },
      }),
    );
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

  const openLibrary = () => {
    launchImageLibrary({mediaType: 'photo', includeBase64: true}, res => {
      if (res.didCancel) {
        return;
      }
      setPhoto(res.assets[0]);
      setShow(false);
    });
  };

  const openCamera = () => {
    launchCamera({mediaType: 'photo', includeBase64: true}, res => {
      if (res.didCancel) {
        return;
      }
      setPhoto(res.assets[0]);
      setShow(false);
    });
  };

  return (
    <View style={styles.container}>
      <CustomHeader />
      <View style={{paddingHorizontal: 15, marginTop: 10, flex: 1}}>
        <Text style={[textStyles.Headline, {fontSize: 20}]}>
          Please insert photo below here.
        </Text>
        <View style={{marginVertical: 10}} />
        <Pressable onPress={() => setShow(true)} style={{flex: 1}}>
          <ImageBackground
            source={{
              uri: photo ? `data:image/png;base64,${photo.base64}` : null,
            }}
            style={styles.image}>
            {!photo && (
              <AntDesign name="pluscircleo" size={100} color={colors.GRAY} />
            )}
          </ImageBackground>
        </Pressable>
        <View style={{marginVertical: 10}} />
        <CustomButton isLoading={loading} title="Next" onPress={submitAction} />
        <View style={{marginVertical: 10}} />
      </View>
      <Modal isVisible={show} style={styles.containerModal}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
          }}>
          <View style={{paddingVertical: 15, alignItems: 'center'}}>
            <Text style={[textStyles.normal, {fontSize: 17}]}>
              Please select one
            </Text>
          </View>
          <View style={styles.containerModalView}>
            <Pressable onPress={requestCameraPermission}>
              <Text style={textStyles.normal}>Camera</Text>
            </Pressable>
            <View
              style={{
                width: 1,
                height: 40,
                backgroundColor: colors.LIGHT_GRAY,
              }}
            />
            <Pressable onPress={openLibrary}>
              <Text style={textStyles.normal}>Galerry</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default UploadImageScreen;

const styles = StyleSheet.create({
  containerModalView: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: colors.LIGHT_GRAY,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  containerModal: {
    paddingHorizontal: 30,
  },
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  image: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.LIGHT_GRAY,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
