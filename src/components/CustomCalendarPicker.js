import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import CalendarPicker from 'react-native-calendar-picker';

import {colors} from '../constants/colors';
import {textStyles} from '../constants/textStyles';

const CustomCalendarPicker = ({date, setDate}) => {
  const [showModal, setShowModal] = useState(false);

  const onDateChange = dateChoice => {
    setDate(`${dateChoice.date()}-${+dateChoice.month()+1}-${dateChoice.year()}`);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setShowModal(true)}
        style={styles.container}>
        <View style={{flex: 1}}>
          <Text style={[textStyles.normal]}>{date}</Text>
        </View>
        <Icon name="calendar-today" color={colors.GRAY} size={20} />
      </TouchableOpacity>
      <Modal
        isVisible={showModal}
        style={styles.view}
        onBackdropPress={() => setShowModal(false)}
        onBackButtonPress={() => setShowModal(false)}>
        <View style={{backgroundColor: 'white', padding: 20}}>
          <CalendarPicker onDateChange={onDateChange} />
          <TouchableOpacity
            onPress={() => setShowModal(false)}
            style={styles.containerButton}>
            <Text style={[textStyles.normalBold, styles.textButton]}>Done</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

export default CustomCalendarPicker;

const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    paddingVertical: 10,
    borderWidth: 1,
    width: '100%',
    borderColor: colors.LIGHT_GRAY,
    paddingHorizontal: 10,
    color: 'black',
    flexDirection: 'row',
    alignItems: 'center',
  },
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
});
