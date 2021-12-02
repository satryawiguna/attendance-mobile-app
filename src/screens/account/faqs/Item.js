import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/Entypo';

import {colors} from '../../../constants/colors';
import {textStyles} from '../../../constants/textStyles';

const Item = ({title, desc}) => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <View>
      <TouchableOpacity
        onPress={() => setCollapsed(!collapsed)}
        style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={[textStyles.normalBold, {fontSize: 14, flex: 1}]}>
          {title}
        </Text>
        <Icon name={collapsed ? 'chevron-right' : 'chevron-down'} size={20} />
      </TouchableOpacity>
      <View style={styles.line} />
      <Collapsible collapsed={collapsed}>
        <Text>{desc}</Text>
        <View style={{marginVertical: 10}} />
      </Collapsible>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  line: {
    height: 1,
    width: '100%',
    backgroundColor: colors.DARK_WHITE,
    marginVertical: 15,
  },
});
