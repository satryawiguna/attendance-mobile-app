import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';

import CustomButton from '../../components/CustomButton';
import {colors} from '../../constants/colors';
import {textStyles} from '../../constants/textStyles';
import {scale} from '../../utils/responsive';

const CardInfo = () => {
  const userProfile = useSelector(state => state.profile.userProfile);
  const [showModal, setShowModal] = useState(false);
  return (
    <View>
      <View style={styles.containerTopBanner}>
        <Text style={[textStyles.Subline, {color: 'white'}]}>SmartBiz</Text>
      </View>
      <View style={styles.containerBottomBanner}>
        <View>
          <Text
            style={[
              textStyles.normalBold,
              {fontSize: scale(16), color: colors.PRIMARY},
            ]}>
            {userProfile.full_name}
          </Text>
          <View style={{marginVertical: 8}} />
          <Text style={textStyles.normal}>Position</Text>
          <Text
            style={[
              textStyles.normalBold,
              {fontSize: scale(16), color: colors.PRIMARY},
            ]}>
            Marcom Manager
          </Text>
          <View style={{marginVertical: 5}} />
          <Text style={textStyles.normal}>Division</Text>
          <Text
            style={[
              textStyles.normalBold,
              {fontSize: scale(16), color: colors.PRIMARY},
            ]}>
            Marketing department
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Image
            style={{
              height: scale(120),
              width: scale(90),
            }}
            source={
              userProfile.photo_profile
                ? {
                    uri: `https://app.attendance.smartbiz.id/${userProfile.photo_profile}`,
                  }
                : require('../../assets/images/profile.png')
            }
          />
          <TouchableOpacity
            onPress={() => setShowModal(true)}
            style={styles.containerQr}>
            <Image
              style={styles.imageQr}
              source={require('../../assets/images/qrcode.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        isVisible={showModal}
        onBackdropPress={() => setShowModal(false)}
        onBackButtonPress={() => setShowModal(false)}>
        <View style={styles.containerModal}>
          <Image
            style={{height: scale(250), width: scale(250)}}
            source={require('../../assets/images/big-qrcode.png')}
          />
          <Text style={[textStyles.normalBold, {fontSize: scale(15)}]}>
            ID Number: 08992323
          </Text>
          <View style={{marginVertical: 10}} />
          <CustomButton
            onPress={() => setShowModal(false)}
            title="Close"
            borderRadius={5}
            paddingHorizontal={30}
            paddingVertical={8}
          />
        </View>
      </Modal>
    </View>
  );
};

export default CardInfo;

const styles = StyleSheet.create({
  containerModal: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
  },
  containerQr: {
    position: 'absolute',
    bottom: scale(8),
    right: scale(25),
  },
  imageQr: {
    height: scale(30),
    width: scale(30),
  },
  containerBottomBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  containerTopBanner: {
    backgroundColor: colors.PRIMARY,
    alignItems: 'center',
    paddingVertical: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});
