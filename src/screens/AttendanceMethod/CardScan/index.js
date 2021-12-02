import {CommonActions} from '@react-navigation/native';
import React, {useState} from 'react';
import {Alert, StyleSheet, Text, View, Image} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Spinner from 'react-native-loading-spinner-overlay';
import {useDispatch, useSelector} from 'react-redux';

import BackButton from '../../../components/BackButton';
import CustomHeader from '../../../components/CustomHeader';
import {colors} from '../../../constants/colors';
import {
  checkInAction,
  shiftStartAction,
  checkOutAction,
} from '../../../redux/dashboardSlice';
import {scale} from '../../../utils/responsive';

const CardScanScreen = ({navigation, route}) => {
  const userEmployee = useSelector(state => state.profile.userEmployee);
  const {endShift} = route.params;
  const [isRead, setIsRead] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onCodeRead = ({data}) => {
    if (isRead) {
      return;
    }


    setLoading(true);
    setIsRead(true);

    if (data.split(';')[1] !== userEmployee.nip) {
      Alert.alert('Error', 'ID number incorrect', [
        {onPress: () => setIsRead(false)},
      ]);
      setLoading(false);
      return;
    }

    if (endShift) {
      dispatch(
        checkOutAction({
          onSuccess: () => {
            setLoading(false);
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
            setLoading(false);
            Alert.alert('Error', 'Something Wrong!', [
              {onPress: () => setIsRead(false)},
            ]);
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
          Alert.alert('Error', 'Something Wrong!', [
            {onPress: () => setIsRead(false)},
          ]);
        },
      }),
    );
  };

  return (
    <View style={styles.container}>
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={{color: 'white'}}
      />
      <CustomHeader />
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        onTap={() => {}}
        captureAudio={false}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        onBarCodeRead={onCodeRead}>
        <View style={styles.containerBack}>
          <BackButton navigation={navigation} />
        </View>

        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            justifyContent: 'center',
          }}>
          <Image
            source={require('../../../assets/images/scanner.png')}
            style={{tintColor: 'white'}}
          />
        </View>

        <View style={{width: '70%', marginBottom: scale(50)}}>
          <Text style={{color: 'white', textAlign: 'center'}}>
            Scan your ID Card Make sure to place your card inside the box
          </Text>
        </View>
      </RNCamera>
    </View>
  );
};

export default CardScanScreen;

const styles = StyleSheet.create({
  containerBack: {
    position: 'absolute',
    top: 20,
    left: 15,
    backgroundColor: 'white',
    paddingRight: 10,
    paddingVertical: 5,
  },
  container: {
    backgroundColor: colors.BACKGROUND,
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
