import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Pie from 'react-native-pie';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';
import CountDown from 'react-native-countdown-component';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import dayjs from 'dayjs';
import {Stopwatch, Timer} from 'react-native-stopwatch-timer';

import {colors} from '../../constants/colors';
import {textStyles} from '../../constants/textStyles';
import {fullWidthScreen, scale} from '../../utils/responsive';
import {DASHBOARD_API} from '../../consts/api';
import {
  checkOutAction,
  setAbsentCategoryIdAction,
  setTimeAction,
  shiftStartAction,
} from '../../redux/dashboardSlice';
import {getProjectAction, selectProjectAction} from '../../redux/profileSlice';
import StopWatch from 'react-native-stopwatch-timer/lib/stopwatch';

const LeftItem = ({start, navigation}) => {
  const [time, setTime] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showText, setShowText] = useState(true);
  const startShiftTime = useSelector(state => state.dashboard.startShiftTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowText(showText => !showText);
    }, 1000);
    if (startShiftTime) {
      setTime(dayjs(dayjs()).diff(startShiftTime));
      setLoading(false);

      return;
    }
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <Text>Mohon tunggu...</Text>
      ) : (
        <StopWatch start={start} startTime={time} />
      )}
      <View style={styles.containerTimeRecord}>
        {showText && startShiftTime && (
          <>
            <View style={styles.redDot} />
            <Text style={[textStyles.normalBold, styles.text]}>
              Time Record
            </Text>
          </>
        )}
      </View>
    </>
  );
};

const RecordAttendance = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const token = useSelector(state => state.auth.user.token);
  const isOffice = useSelector(state => state.profile.userOffice);
  const startShift = useSelector(state => state.dashboard.shiftStart);
  const projectAttendace = useSelector(state => state.profile.projectSelected);

  const [recordAttendace, setRecordAttendace] = useState('reguler');
  const [showModal, setShowModal] = useState(false);
  const [isRecordAttendace, setIsRecordAttendace] = useState(true);
  const [canShift, setCanShift] = useState(false);
  const [startCounting, setStartCounting] = useState(0);
  const [persen, setPersen] = useState(100);
  const [setting, setSetting] = useState([]);
  const [listRecord, setListRecord] = useState([
    {
      id: 0,
      label: 'Reguler',
      value: 'reguler',
      type: 'present',
      time: {start: '08:00:00', end: '17:00:00'},
    },
  ]);
  const [listProject, setListProject] = useState([]);

  const _changeChoice = choice => {
    if (isRecordAttendace) {
      setRecordAttendace(choice);
    } else {
      dispatch(selectProjectAction(choice));
    }

    setShowModal(false);
  };

  const getProjectList = () => {
    axios
      .get(DASHBOARD_API.GET_PROJECT_LIST, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        const {data} = res;
      })
      .catch(err => {
        if (__DEV__) {
          console.log('err', err.response);
        }
      });
  };

  const getCurrentAttedance = () => {
    axios
      .get(DASHBOARD_API.GET_ATTEDANCE_CURRENT, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        const {data} = res;
        if (data.return === null) {
          setCanShift(true);
        }
        if (data.return.status === 0) {
          setCanShift(true);
        }
      })
      .catch(err => {
        if (__DEV__) {
          console.log('err', err.response);
        }
      });
  };

  const startShiftAction = () => {
    if (!isOffice) {
      Alert.alert('Attention', 'Anda belum terdaftar di kantor manapun');
      return;
    }

    const idCategory = listRecord.reduce(
      (prev, current) => {
        console.log('item', current);
        if (current.value === recordAttendace) {
          return {
            categoryId: current.id,
            absentType: current.type,
          };
        }
        return prev;
      },
      {categoryId: 0, absentType: 'present'},
    );
    dispatch(setAbsentCategoryIdAction(idCategory));

    let settingData = {
      Geolocation: false,
      BodyTemperature: false,
    };

    setting.map(item => {
      if (item.feature_name === 'Geolocation') {
        settingData.Geolocation = true;
        settingData.GeolocationMin = item.min_value;
        settingData.GeolocationMax = item.max_value;
      }

      if (item.feature_name === 'Body Temperature') {
        settingData.BodyTemperature = true;
        settingData.BodyTemperatureMin = item.min_value;
        settingData.BodyTemperatureMax = item.max_value;
      }
    });

    console.log('settingData', settingData);

    if (settingData.Geolocation) {
      navigation.navigate('GeoValidation', {
        radius: settingData.GeolocationMax,
      });
      return;
    }

    // if (settingData.BodyTemperature) {
    //   navigation.navigate('Attendance');
    //   return;
    // }

    navigation.navigate('Attendance', {endShift: false});
  };

  const endShiftAction = () => {
    Alert.alert('Attention', 'Are you sure you want to end your shift?', [
      {
        text: 'Yes',
        onPress: () => {
          navigation.navigate('Attendance', {endShift: true});
          // dispatch(
          //   checkOutAction({
          //     onSuccess: () => {
          //       navigation.navigate('AttedanceRecord');
          //       dispatch(shiftStartAction());
          //     },
          //     onFailed: () => {
          //       Alert.alert('Error', 'Something Wrong!');
          //     },
          //   }),
          // );
        },
      },
      {text: 'No', onPress: () => {}},
    ]);
  };

  useEffect(() => {
    getCurrentAttedance();
    dispatch(selectProjectAction(''));
    dispatch(
      getProjectAction({
        onSuccess: data => {
          const raw = data.map(item => ({
            id: item.id,
            label: item.name,
            value: item.slug,
          }));
          setListProject([...listProject, ...raw]);
        },
      }),
    );

    axios
      .get(DASHBOARD_API.GET_RECORD, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        const {data} = res;

        let list = data.return.map(item => ({
          id: item.id,
          label: item.name,
          value: item.name.toLowerCase(),
          type: item.type,
          time: {
            start: item.time_start,
            end: item.time_end,
          },
        }));
        list = [
          ...list,
          {
            id: -1,
            label: 'Absent',
            value: 'absent',
            type: 'absent',
            time: {start: '00:00:00', end: '00:00:00'},
          },
        ];
        setListRecord([...listRecord, ...list]);
      })
      .catch(err => console.log('err', err));

    axios
      .get(DASHBOARD_API.GET_SETTING, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        const {data} = res;
        setSetting(data.data);
      })
      .catch(err => console.log('err', err));
  }, []);

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', height: 37}}>
        <View style={styles.containerRecordAttendance}>
          <Text style={[textStyles.normalBold, {fontSize: 14, color: 'white'}]}>
            Record Attendance
          </Text>
        </View>
        <View style={styles.containerDate}>
          <Text style={textStyles.normal}>{dayjs().format('MMM DD YYYY')}</Text>
          <Text style={textStyles.normal}>{dayjs().format('HH:MM')} WITA</Text>
        </View>
      </View>
      <View style={styles.containerInfo}>
        <View style={{flexDirection: 'row', flex: 1}}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <LeftItem start={startShift} navigation={navigation} />
          </View>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View style={styles.containerAction}>
              {recordAttendace === 'absent' ? (
                <View />
              ) : (
                listRecord.find(item => item.value === recordAttendace).time
                  .start && (
                  <>
                    <Image
                      resizeMode="contain"
                      style={styles.image}
                      source={require('../../assets/images/attendace-history.png')}
                    />
                    <View>
                      <Text style={[textStyles.normal, {fontSize: 10}]}>
                        {listRecord
                          .find(item => item.value === recordAttendace)
                          .time.start.slice(0, 5)}{' '}
                        to{' '}
                        {listRecord
                          .find(item => item.value === recordAttendace)
                          .time.end.slice(0, 5)}
                      </Text>
                    </View>
                  </>
                )
              )}
            </View>
            {startShift ? (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 10,
                  }}>
                  <Text style={textStyles.normalBold}>Absence : </Text>
                  <Text style={[textStyles.normal, {color: 'gray'}]}>
                    {
                      listRecord.find(item => item.value === recordAttendace)
                        .label
                    }
                  </Text>
                </View>

                {projectAttendace !== '' && (
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingBottom: 10,
                    }}>
                    <Text style={textStyles.normalBold}>Project : </Text>
                    <Text style={[textStyles.normal, {color: 'gray'}]}>
                      {projectAttendace === ''
                        ? ''
                        : listProject.find(
                            item =>
                              item.value === projectAttendace.toLowerCase(),
                          )?.label}
                    </Text>
                  </View>
                )}
              </>
            ) : (
              <>
                <View style={styles.inputIOS}>
                  <View style={{flex: 1}}>
                    {Platform.OS === 'ios' ? (
                      <RNPickerSelect
                        value={recordAttendace}
                        onValueChange={value => setRecordAttendace(value)}
                        items={listRecord}
                      />
                    ) : (
                      <Text
                        onPress={() => {
                          if (!canShift) {
                            return;
                          }
                          setShowModal(true);
                          setIsRecordAttendace(true);
                        }}>
                        {
                          listRecord.find(
                            item => item.value === recordAttendace,
                          ).label
                        }
                      </Text>
                    )}
                  </View>
                  <Icon
                    name="chevron-small-down"
                    color={colors.GRAY}
                    size={20}
                  />
                </View>

                {listProject.length > 0 && (
                  <View
                    style={[
                      styles.inputIOS,
                      {marginVertical: 0, marginBottom: 10},
                    ]}>
                    <View style={{flex: 1}}>
                      {Platform.OS === 'ios' ? (
                        <RNPickerSelect
                          value={projectAttendace}
                          onValueChange={value =>
                            dispatch(selectProjectAction(value))
                          }
                          items={projectAttendace}
                        />
                      ) : (
                        <Text
                          onPress={() => {
                            if (!canShift) {
                              return;
                            }
                            setShowModal(true);
                            setIsRecordAttendace(false);
                          }}>
                          {projectAttendace === ''
                            ? 'Choose Project'
                            : listProject.find(
                                item =>
                                  item.value === projectAttendace.toLowerCase(),
                              )?.label}
                        </Text>
                      )}
                    </View>
                    <Icon
                      name="chevron-small-down"
                      color={colors.GRAY}
                      size={20}
                    />
                  </View>
                )}
              </>
            )}
            {canShift ? (
              <TouchableOpacity
                onPress={startShift ? endShiftAction : startShiftAction}
                style={{
                  backgroundColor: startShift ? colors.RED : colors.GREEN,
                }}>
                <Text style={[textStyles.normalBold, styles.textButton]}>
                  {startShift ? 'End Shift' : 'Start Shift'}
                </Text>
              </TouchableOpacity>
            ) : (
              <Text style={textStyles.normal}>
                You already submit attedance today!
              </Text>
            )}
          </View>
        </View>
      </View>
      {Platform.OS === 'android' && (
        <Modal
          isVisible={showModal}
          style={styles.view}
          onBackdropPress={() => setShowModal(false)}
          onBackButtonPress={() => setShowModal(false)}>
          <View style={{backgroundColor: 'white', padding: 20}}>
            {isRecordAttendace ? (
              listRecord.map((item, index) => (
                <View key={index.toString()}>
                  <Text
                    onPress={() => _changeChoice(item.value)}
                    style={[textStyles.normalBold, {fontSize: 16}]}>
                    {item.label}
                  </Text>
                  <View style={styles.line} />
                </View>
              ))
            ) : listProject.length === 0 ? (
              <Text>Tidak ada project</Text>
            ) : (
              listProject.map((item, index) => (
                <View key={index.toString()}>
                  <Text
                    onPress={() => _changeChoice(item.value)}
                    style={[textStyles.normalBold, {fontSize: 16}]}>
                    {item.label}
                  </Text>
                  <View style={styles.line} />
                </View>
              ))
            )}
          </View>
        </Modal>
      )}
    </View>
  );
};

export default RecordAttendance;

const styles = StyleSheet.create({
  containerTimeRecord: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginLeft: 15,
    height: 15,
  },
  imagePhoto: {
    width: scale(70),
    height: scale(70),
    borderRadius: 100,
    marginBottom: 5,
  },
  line: {
    backgroundColor: colors.LIGHT_GRAY,
    height: 1,
    width: '100%',
    marginVertical: 10,
  },
  view: {},
  textButton: {
    color: 'white',
    paddingHorizontal: 25,
    paddingVertical: 6,
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
    marginVertical: 10,
  },
  containerAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: scale(20),
    height: scale(20),
    marginRight: 5,
    tintColor: 'gray',
  },
  text: {
    fontSize: 12,
    color: colors.GRAY,
    width: '60%',
    textAlign: 'center',
  },
  containerPie: {
    borderWidth: 4,
    borderColor: colors.LIGHT_GRAY,
    borderRadius: 100,
  },
  containerInfo: {
    backgroundColor: 'white',
    height: scale(155),
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.PRIMARY,
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
  redDot: {
    height: 8,
    width: 8,
    backgroundColor: 'red',
    borderRadius: 100,
  },
});
