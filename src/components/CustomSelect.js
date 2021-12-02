import React, {useState} from 'react';
import {Platform, ScrollView, StyleSheet, Text, View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';

import {colors} from '../constants/colors';
import {textStyles} from '../constants/textStyles';

const CustomSelect = ({
  value,
  setValue,
  options,
  paddingVertical = 5,
  isDisable,
}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <View
        style={[
          styles.inputIOS,
          {paddingVertical, backgroundColor: isDisable ? '#EFF4F9' : 'white'},
        ]}>
        <View style={{flex: 1}}>
          {Platform.OS === 'ios' ? (
            <RNPickerSelect
              value={value}
              onValueChange={value => setValue(value)}
              items={options}
            />
          ) : isDisable ? (
            <Text></Text>
          ) : (
            <Text
              onPress={() => {
                setShowModal(true);
              }}>
              {options[options.findIndex(item => item.value === value)].label}
            </Text>
          )}
        </View>
        <Icon name="chevron-small-down" color={colors.GRAY} size={20} />
      </View>
      {Platform.OS === 'android' && (
        <Modal
          isVisible={showModal}
          style={styles.view}
          onBackdropPress={() => setShowModal(false)}
          onBackButtonPress={() => setShowModal(false)}>
          <ScrollView style={{backgroundColor: 'white', padding: 20}}>
            {options.map(item => (
              <View key={item.value}>
                <Text
                  onPress={() => {
                    setShowModal(false);
                    setValue(item.value);
                  }}
                  style={[textStyles.normalBold, {fontSize: 16}]}>
                  {item.label}
                </Text>
                <View style={styles.line} />
              </View>
            ))}
          </ScrollView>
        </Modal>
      )}
    </>
  );
};

export default CustomSelect;

const styles = StyleSheet.create({
  line: {
    backgroundColor: colors.LIGHT_GRAY,
    height: 1,
    width: '100%',
    marginVertical: 10,
  },
  inputIOS: {
    borderWidth: 1,
    width: '100%',
    borderColor: colors.LIGHT_GRAY,
    paddingHorizontal: 10,
    color: 'black',
    flexDirection: 'row',
    alignItems: 'center',
  },
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});
