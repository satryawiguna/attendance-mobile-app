import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import CustomHeader from '../../components/CustomHeader';
import {colors} from '../../constants/colors';
import {scale} from '../../utils/responsive';
import CardInfo from './CardInfo';
import Menu from './Menu';

const AccountScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <CustomHeader white />
      <ScrollView style={{paddingHorizontal: scale(15), paddingVertical: 15}}>
        <CardInfo />
        <View style={{marginVertical: 10}} />
        <Menu navigation={navigation} />
      </ScrollView>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.BACKGROUND,
    flex: 1,
  },
});
