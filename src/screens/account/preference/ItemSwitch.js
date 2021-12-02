import React from 'react';
import {Text, View} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';

import {colors} from '../../../constants/colors';
import {textStyles} from '../../../constants/textStyles';

const ItemSwitch = ({isOn, onToggle, title, desc}) => {
  return (
    <View>
      <Text style={[textStyles.normalBold, {fontSize: 16}]}>{title}</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={[textStyles.normal, {flex: 1, fontSize: 13}]}>{desc}</Text>
        <ToggleSwitch
          onToggle={onToggle}
          isOn={isOn}
          onColor={colors.PRIMARY}
        />
      </View>
    </View>
  );
};

export default ItemSwitch;
