/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';
import CalendarPicker from 'react-native-calendar-picker';

import {colors} from '../../constants/colors';
import {textStyles} from '../../constants/textStyles';
import {fullWidthScreen, scale} from '../../utils/responsive';
import axios from 'axios';
import {DASHBOARD_API} from '../../consts/api';
import {useSelector} from 'react-redux';

const Progress = ({color, title, progress}) => {
  return (
    <View style={styles.containerProgress}>
      <Text style={textStyles.normal}>{progress}</Text>
      <View style={styles.containerProgressItem}>
        <View
          style={[
            styles.progress,
            {
              height: progress,
              backgroundColor: color,
            },
          ]}
        />
      </View>
      <Text style={[textStyles.normal, {color: colors.GRAY}]}>{title}</Text>
    </View>
  );
};

const RecordAttendance = ({date, setDate}) => {
  const token = useSelector(state => state.auth.user.token);
  const office = useSelector(state => state.profile.userOffice?.name);

  const [data, setData] = useState({
    absentPercentage: 0,
    presentPercentage: 0,
    total: 0,
  });

  const getSummery = () => {
    console.log(date);
    axios
      .post(
        DASHBOARD_API.ATTENDANCE_SUMMARY,
        {
          date_from: date.startDate,
          date_to: date.endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(res => {
        const {data} = res;
        setData({
          absentPercentage: data.return.absent_percentage.toFixed(0),
          presentPercentage: data.return.present_percentage.toFixed(0),
          total: data.return.total_attendance,
        });
      })
      .catch(err => console.log(`err: ${DASHBOARD_API.ATTENDANCE_SUMMARY}`, err.response));
  };

  useEffect(() => {
    getSummery();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const onDateChange = (dateChoice, type) => {
    if (type === 'END_DATE') {
      if (dateChoice) {
        setDate({
          ...date,
          endDate: `${dateChoice.year()}-${+dateChoice.month()+1}-${dateChoice.date()}`,
        });
      }
    } else {
      setDate({
        ...date,
        startDate: `${dateChoice.year()}-${+dateChoice.month()+1}-${dateChoice.date()}`,
      });
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerRecordAttendance}>
        <Text style={[textStyles.normalBold, {fontSize: 14, color: 'white'}]}>
          Attendance Summary
        </Text>
      </View>
      <View style={styles.containerInfo}>
        <View style={{flexDirection: 'row', flex: 1}}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={[textStyles.normal, styles.text]}>
              Show Attendance data from:
            </Text>
            <View style={styles.inputIOS}>
              <TouchableOpacity
                onPress={() => setShowModal(true)}
                style={{flex: 1}}>
                <Text style={[textStyles.normal, {fontSize: 10}]}>
                  {date.startDate} ~ {date.endDate}
                </Text>
              </TouchableOpacity>
              <Icon name="chevron-small-down" color={colors.GRAY} size={20} />
            </View>
            <View style={{marginVertical: 10}} />
            <Text
              style={[
                [textStyles.normalBold, {color: colors.GRAY, fontSize: 15}],
              ]}>
              Office:
            </Text>
            <Text
              style={[
                [textStyles.normalBold, {color: colors.GRAY, fontSize: 20}],
              ]}>
                {office || ''}
            </Text>
          </View>
          <View style={{flex: 0.8}}>
            <View style={styles.containerAction}>
              <Progress
                title="Absent"
                color={colors.RED}
                progress={`${data.absentPercentage}%`}
              />
              <Progress
                title="Attend"
                color={colors.GREEN}
                progress={`${data.presentPercentage}%`}
              />
            </View>
          </View>
        </View>
      </View>
      <Modal
        isVisible={showModal}
        style={styles.view}
        onBackdropPress={() => setShowModal(false)}
        onBackButtonPress={() => setShowModal(false)}>
        <View style={{backgroundColor: 'white', padding: 20}}>
          <CalendarPicker onDateChange={onDateChange} allowRangeSelection />
          <TouchableOpacity
            onPress={() => {
              getSummery();
              setShowModal(false);
            }}
            style={styles.containerButton}>
            <Text style={[textStyles.normalBold, styles.textButton]}>Done</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default RecordAttendance;

const styles = StyleSheet.create({
  containerButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: colors.GREEN,
  },
  textButton: {
    color: 'white',
    paddingVertical: 10,
  },
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  progress: {
    width: '100%',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
  containerProgressItem: {
    height: '70%',
    borderRadius: 5,
    backgroundColor: colors.LIGHT_GRAY,
    width: scale(25),
    justifyContent: 'flex-end',
  },
  containerProgress: {
    flex: 1,
    height: '100%',
    paddingVertical: scale(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputIOS: {
    paddingVertical: 5,
    borderWidth: 1,
    width: '100%',
    borderColor: colors.LIGHT_GRAY,
    paddingHorizontal: 10,
    color: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  containerAction: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 10,
    color: colors.GRAY,
  },
  containerInfo: {
    backgroundColor: 'white',
    height: scale(130),
    width: fullWidthScreen - 30,
    paddingHorizontal: 10,
  },
  containerDate: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F4F7',
  },
  containerRecordAttendance: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.PRIMARY,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  container: {
    backgroundColor: 'white',
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
