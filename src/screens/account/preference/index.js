import React, {useState} from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import Toast from 'react-native-toast-message';
import Modal from 'react-native-modal';

import Item from './Item';
import ItemSwitch from './ItemSwitch';

import BackButton from '../../../components/BackButton';
import CustomHeader from '../../../components/CustomHeader';
import CustomSelect from '../../../components/CustomSelect';
import {colors} from '../../../constants/colors';
import {textStyles} from '../../../constants/textStyles';
import {scale} from '../../../utils/responsive';
import CustomInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';

const GPS_OPTIONS = [
  {label: 'Always turn on GPS', value: 'always_turn_on'},
  {label: 'Turn on when used', value: 'turn_on'},
  {label: 'Turn off', value: 'turn_off'},
];

const PreferenceScreen = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState(false);
  const [gps, setGps] = useState('always_turn_on');
  const [darkTheme, setDarkTheme] = useState(false);
  const [security, setSecurity] = useState(false);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe.mo@gmail.com');
  const [password, setPassword] = useState('lalaland');
  const [otp, seOtp] = useState('');

  const deleteCache = () => {
    Alert.alert('Clear', 'Do you sure to clear cache?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => console.log('OK Pressed')},
    ]);
  };

  const showToast = (newValue, isName) => {
    Toast.show({
      text1: 'Info',
      text2: 'Please check the OTP in your email',
    });
    setShowModal(true);
  };

  return (
    <View style={styles.container}>
      <CustomHeader white />
      <ScrollView style={{paddingHorizontal: scale(15), paddingTop: 15}}>
        <BackButton navigation={navigation} />
        <View style={{marginVertical: 10}} />
        <View style={styles.containerForm}>
          <ItemSwitch
            title="Notification"
            desc={`Turn ${notification ? 'on' : 'off'} pop up notification`}
            isOn={notification}
            onToggle={() => setNotification(!notification)}
          />
          <View style={{marginVertical: 5}} />
          <Text style={[textStyles.normalBold, {fontSize: 16}]}>GPS</Text>
          <CustomSelect
            paddingVertical={10}
            options={GPS_OPTIONS}
            value={gps}
            setValue={v => setGps(v)}
          />
          <View style={{marginVertical: 5}} />
          <Item
            title="Data"
            desc="Clear cache"
            pressText="6.6 MB"
            onPress={deleteCache}
          />
          <View style={{marginVertical: 5}} />
          <Item
            title="Username"
            desc={name}
            pressText="Change"
            onDone={v => setName(v)}
            disableEdit
          />
          <View style={{marginVertical: 5}} />
          <Item
            title="Email"
            desc={email}
            pressText="Change"
            disableEdit
            onDone={v => {
              showToast(v, true);
            }}
          />
          <View style={{marginVertical: 5}} />
          <Item
            title="Password"
            desc={password}
            pressText="Change"
            onDone={v => {
              showToast(v, false);
            }}
            isPassword
          />
        </View>
      </ScrollView>
      <Toast ref={ref => Toast.setRef(ref)} />
      <Modal
        isVisible={showModal}
        style={styles.view}
        onBackdropPress={() => setShowModal(false)}
        onBackButtonPress={() => setShowModal(false)}>
        <View
          style={{backgroundColor: 'white', padding: 20, flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <CustomInput
              placeholder="Masukan OTP"
              borderRadius={5}
              value={otp}
              onChangeText={text => seOtp(text)}
            />
          </View>
          <View style={{marginHorizontal: 10}} />
          <CustomButton
            onPress={() => setShowModal(false)}
            title="Save"
            borderRadius={5}
            paddingHorizontal={10}
          />
        </View>
      </Modal>
    </View>
  );
};

export default PreferenceScreen;

const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: colors.BACKGROUND,
    flex: 1,
  },
  containerForm: {
    backgroundColor: 'white',
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
