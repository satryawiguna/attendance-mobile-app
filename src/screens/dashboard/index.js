/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import dayjs from 'dayjs';

import CustomHeader from '../../components/CustomHeader';
import {colors} from '../../constants/colors';
import {textStyles} from '../../constants/textStyles';
import AttadanceItems from './AttadanceItems';
import Banner from './Banner';
import RecordAttendance from './RecordAttendance';
import AttendanceSummary from './AttendanceSummary';
import {getProfileAction} from '../../redux/profileSlice';

const DashboardScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [date, setDate] = useState({
    startDate: dayjs().subtract(1, 'M').format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD'),
  });

  useEffect(() => {
    dispatch(getProfileAction());
  }, []);

  return (
    <View style={styles.container}>
      <CustomHeader white />
      <ScrollView style={{flex: 1}}>
        <View style={{paddingVertical: 5}} />
        <Text style={[textStyles.Headline, styles.textTitle]}>Dashboard</Text>
        <Banner />
        <View style={{paddingHorizontal: 15, flex: 1}}>
          <AttadanceItems />
          <View style={{paddingVertical: 7}} />
          <RecordAttendance />
          <View style={{paddingVertical: 7}} />
          <AttendanceSummary date={date} setDate={setDate} />
          <View style={{paddingVertical: 7}} />
        </View>
      </ScrollView>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.BACKGROUND,
    flex: 1,
  },
  textTitle: {
    color: colors.GRAY,
    fontSize: 24,
    marginLeft: 15,
  },
});
