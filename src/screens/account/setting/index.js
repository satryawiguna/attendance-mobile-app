import React from 'react';
import {StyleSheet, View, Text, Image, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';

import BackButton from '../../../components/BackButton';
import CustomHeader from '../../../components/CustomHeader';
import CustomButton from '../../../components/CustomButton';
import {colors} from '../../../constants/colors';
import {textStyles} from '../../../constants/textStyles';
import {scale} from '../../../utils/responsive';

const Item = ({title, desc, flex = 0}) => (
  <View style={{marginBottom: 10, flex}}>
    <Text style={[textStyles.normalBold, {fontSize: scale(15)}]}>{title}</Text>
    <Text style={[textStyles.normal, {fontSize: scale(15)}]}>{desc}</Text>
  </View>
);

const SettingScreen = ({navigation}) => {
  const userProfile = useSelector(state => state.profile.userProfile);
  const userEmployee = useSelector(state => state.profile.userEmployee);
  return (
    <View style={styles.container}>
      <CustomHeader white />
      <ScrollView style={{paddingHorizontal: scale(15), paddingTop: 15}}>
        <BackButton navigation={navigation} />
        <View style={{marginVertical: 6}} />
        <View style={{alignSelf: 'center', alignItems: 'center'}}>
          <Image
            style={{height: scale(90), width: scale(90), borderRadius: 100}}
            source={
              userProfile.photo_profile
                ? {
                    uri: `https://app.attendance.smartbiz.id/${userProfile.photo_profile}`,
                  }
                : require('../../../assets/images/profile.png')
            }
          />
          <Text
            style={[
              textStyles.normalBold,
              {fontSize: scale(16), marginTop: 5},
            ]}>
            {userProfile.full_name}
          </Text>
        </View>
        <View style={{marginVertical: 10}} />
        <View style={styles.containerSetting}>
          <Text style={[textStyles.normalBold, {fontSize: scale(19)}]}>
            Profile
          </Text>
          <View style={{marginVertical: 5}} />
          <Item title="Full Name" desc={userProfile.full_name} />
          <Item title="NIK" desc={userEmployee.nik} />
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <Item flex={1} title="Religion" desc={userEmployee.religion} />
            <Item
              flex={1}
              title="Birth Date"
              desc={userProfile.birth_date || '-'}
            />
          </View>
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <Item flex={1} title="Gender" desc={userProfile.gender} />
            <Item flex={1} title="Phone" desc={userProfile.phone} />
          </View>
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <Item
              flex={1}
              title="Country"
              desc={userProfile.country.length > 0 ? userProfile.country : '-'}
            />
            <Item
              flex={1}
              title="Province"
              desc={userProfile.state.length > 0 ? userProfile.state : '-'}
            />
          </View>
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <Item
              flex={1}
              title="District"
              desc={userProfile.city.length > 0 ? userProfile.city : '-'}
            />
            <Item flex={1} title="Postal Code" desc={userProfile.postcode || '-'} />
          </View>
          <Item title="Address" desc={userEmployee.address} />
          <View style={{marginVertical: 5}} />
          <CustomButton
            onPress={() => navigation.navigate('Edit')}
            icon="edit"
            title="Change Profile"
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

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.BACKGROUND,
    flex: 1,
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
});
