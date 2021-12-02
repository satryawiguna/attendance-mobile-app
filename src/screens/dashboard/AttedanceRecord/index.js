/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

import BackButton from '../../../components/BackButton';
import CustomHeader from '../../../components/CustomHeader';
import {colors} from '../../../constants/colors';
import {textStyles} from '../../../constants/textStyles';
import {DASHBOARD_API} from '../../../consts/api';

const AttedanceRecordScreen = ({navigation}) => {
  const token = useSelector(state => state.auth.user.token);

  const [data, setData] = useState({
    date: '',
    type: null, 
    temperature: '',
    time_start: '',
    time_end: '',
  });

  useEffect(() => {
    axios
      .get(DASHBOARD_API.GET_ATTEDANCE_CURRENT, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        const {data} = res;
        console.log(data);
        setData({
          date: data.return.date,
          type: data.return.absent_category?.name,
          temperature: data.return.temperature,
          time_start: data.return.time_start,
          time_end: data.return.time_end,
        });
      })
      .catch(err => {
        if (__DEV__) {
          console.log('err', err);
        }
      });
  }, []);

  return (
    <View style={styles.container}>
      <CustomHeader />
      <View style={{marginHorizontal: 15}}>
        <View style={{marginTop: 15}}>
          <BackButton navigation={navigation} />
        </View>
        <Text style={[textStyles.Subline, {marginVertical: 15}]}>
          Attendance Record
        </Text>
        <View style={styles.containerItem}>
          <Text style={textStyles.normalBold}>Date</Text>
          <Text style={textStyles.normal}>{data.date}</Text>
          <View style={{marginVertical: 5}} />
          {data.type && (
            <>
              <Text style={textStyles.normalBold}>Attendance Category</Text>
              <Text style={textStyles.normal}>{data.type}</Text>
            </>
          )}
          <View style={{marginVertical: 5}} />
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text style={textStyles.normalBold}>Body Temperature</Text>
              <Text style={textStyles.normal}>{data.temperature}° C</Text>
            </View>
            {/* <View style={{flex: 1}}>
              <Text style={textStyles.normalBold}>Location</Text>
              <Text style={textStyles.normal}>10M from office</Text>
            </View> */}
          </View>
          <View style={{marginVertical: 5}} />
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text style={textStyles.normalBold}>Start Shift</Text>
              <Text style={textStyles.normal}>{data.time_start}</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={textStyles.normalBold}>End Shift</Text>
              <Text style={textStyles.normal}>{data.time_end}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AttedanceRecordScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.BACKGROUND,
    flex: 1,
  },
  containerItem: {
    backgroundColor: 'white',
    padding: 15,
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
