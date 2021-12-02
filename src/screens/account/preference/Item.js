import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import CustomInput from '../../../components/CustomInput';
import {textStyles} from '../../../constants/textStyles';

const Item = ({
  pressText,
  title,
  desc,
  onPress,
  isPassword,
  onDone,
  disableEdit,
}) => {
  const [text, setText] = useState(desc);
  const [isEdit, setIsEdit] = useState(false);

  const _onPress = () => {
    if (onPress) {
      onPress();
      return;
    }
    setIsEdit(true);
  };

  const _onDone = () => {
    setIsEdit(false);
    if (text === '') {
      setText(desc);
      onDone(desc);
      return;
    }
    onDone(text);
  };

  const renderButton = () => {
    if (disableEdit || isEdit) {
      return <View />;
    }
    return (
      <TouchableOpacity onPress={_onPress}>
        <Text style={[textStyles.normal, {fontSize: 13}]}>{pressText}</Text>
        <View style={{borderBottomWidth: 1, borderBottomColor: 'black'}} />
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Text style={[textStyles.normalBold, {fontSize: 16}]}>{title}</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {isEdit ? (
          <View style={{flex: 1}}>
            <CustomInput
              secureTextEntry={isPassword}
              onSubmitEditing={_onDone}
              onChangeText={setText}
              value={text}
              borderRadius={5}
            />
          </View>
        ) : (
          <Text style={[textStyles.normal, {flex: 1, fontSize: 13}]}>
            {isPassword ? '*********' : desc}
          </Text>
        )}
        {renderButton()}
      </View>
    </View>
  );
};

export default Item;
