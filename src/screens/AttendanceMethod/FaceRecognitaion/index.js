import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import CountDown from 'react-native-countdown-component';

import BackButton from '../../../components/BackButton';
import CustomHeader from '../../../components/CustomHeader';
import {colors} from '../../../constants/colors';
import {textStyles} from '../../../constants/textStyles';
import {scale} from '../../../utils/responsive';

const FaceRecogniaionScreen = ({navigation}) => {
  const [status, setStatus] = useState('idle'); // value: 'idle' | 'success' | 'fail'

  useEffect(() => {
    ReactNativeBiometrics.simplePrompt({promptMessage: 'Confirm fingerprint'})
      .then(resultObject => {
        const {success} = resultObject;

        if (success) {
          setStatus('success');
        } else {
          setStatus('fail');
        }
      })
      .catch(() => {
        setStatus('fail');
      });
  }, []);

  return (
    <View style={styles.container}>
      <CustomHeader />
      <View style={styles.containerImage}>
        <View style={{position: 'absolute', top: 20, left: 15}}>
          <BackButton navigation={navigation} />
        </View>

        <Text
          style={[
            textStyles.Subline,
            {textAlign: 'center', marginTop: 30, width: '60%'},
          ]}>
          {status === 'success'
            ? 'Check-in succeeded! Your check-in time is'
            : status === 'idle'
            ? 'Place your finger on your phone’s fingerprint'
            : 'Check-in failed! Please try again'}
        </Text>
        {status === 'success' && (
          <CountDown
            until={100}
            onFinish={() => {}}
            onPress={() => {}}
            size={30}
            timeLabels={{m: null, s: null}}
            showSeparator
            timeToShow={['M', 'S']}
            digitStyle={{
              backgroundColor: colors.BACKGROUND,
            }}
          />
        )}
      </View>
    </View>
  );
};

export default FaceRecogniaionScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.BACKGROUND,
    flex: 1,
  },
  containerImage: {
    paddingHorizontal: scale(15),
    paddingTop: 15,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
