import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {colors} from '../constants/colors';
import {textStyles} from '../constants/textStyles';
import {scale} from '../utils/responsive';

const CustomInput = ({
  placeholder,
  onChangeText,
  value,
  secureTextEntry = false,
  number,
  keyboardType = 'default',
  borderRadius = 100,
  isDisable,
  multiline,
  error = false,
  onSubmitEditing = () => {},
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          borderRadius,
          backgroundColor: isDisable ? colors.DARK_WHITE : 'white',
          borderColor: error ? 'red' : 'gray'
        },
      ]}>
      <View style={[styles.containerInput, {height: multiline ? 60 : 40}]}>
        {number && (
          <>
            <Text style={[textStyles.normal, {color: 'gray'}]}>+62</Text>
            <View style={styles.containerNumber} />
          </>
        )}
        <TextInput
          textAlignVertical="top"
          multiline={multiline}
          editable={!isDisable}
          keyboardType={number ? 'phone-pad' : keyboardType}
          placeholder={placeholder}
          value={value}
          secureTextEntry={secureTextEntry}
          onSubmitEditing={onSubmitEditing}
          onChangeText={onChangeText}
          style={[styles.text, {textAlignVertical: 'top'}]}
        />
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  containerNumber: {
    height: scale(15),
    width: 1,
    backgroundColor: 'gray',
    marginHorizontal: 5,
  },
  containerInput: {
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  container: {
    borderWidth: 1,
    borderColor: 'gray',
  },
  text: {
    flex: 1,
    color: 'black'
  },
});
