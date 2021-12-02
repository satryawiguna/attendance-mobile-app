import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View, Text, Alert, Platform} from 'react-native';
import CountDown from 'react-native-countdown-component';
import FingerprintScanner from 'react-native-fingerprint-scanner';

import BackButton from '../../../components/BackButton';
import CustomHeader from '../../../components/CustomHeader';
import {colors} from '../../../constants/colors';
import {textStyles} from '../../../constants/textStyles';
import {scale} from '../../../utils/responsive';

const FingerprintScreen = ({navigation}) => {
  const [status, setStatus] = useState('idle'); // value: 'idle' | 'success' | 'fail'

  const authCurrent = () => {
    FingerprintScanner.authenticate({title: 'Log in with Biometrics'})
      .then(() => {
        setStatus('success');
      })
      .catch(() => setStatus('fail'));
  };

  const authLegacy = () => {
    FingerprintScanner.authenticate({
      onAttempt: handleAuthenticationAttemptedLegacy,
    })
      .then(() => {
        setStatus('success');
      })
      .catch(error => {
        setStatus('fail');
      });
  };

  const handleAuthenticationAttemptedLegacy = error => {
    Alert.alert('Error', error.message);
  };

  const requiresLegacyAuthentication = () => {
    return Platform.Version < 23;
  };

  useEffect(() => {
    if (requiresLegacyAuthentication()) {
      authLegacy();
    } else {
      authCurrent();
    }
    return () => {
      FingerprintScanner.release();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <CustomHeader />
      <View style={styles.containerImage}>
        <View style={{position: 'absolute', top: 20, left: 15}}>
          <BackButton navigation={navigation} />
        </View>
        <Image
          resizeMode="contain"
          source={
            status === 'idle' || status === 'success'
              ? require('../../../assets/images/fingerprint.png')
              : require('../../../assets/images/error.png')
          }
          style={{
            height: scale(160),
            width: scale(160),
            tintColor:
              status === 'success'
                ? 'green'
                : status === 'idle'
                ? 'gray'
                : null,
          }}
        />

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

export default FingerprintScreen;

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
