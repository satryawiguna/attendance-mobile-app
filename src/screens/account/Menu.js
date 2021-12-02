import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {colors} from '../../constants/colors';
import {textStyles} from '../../constants/textStyles';
import {logoutAction} from '../../redux/authSlice';
import {scale} from '../../utils/responsive';

const Item = ({title, image, onPress}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{flexDirection: 'row', alignItems: 'center'}}>
    <Image resizeMode="contain" style={styles.image} source={image} />
    <Text
      style={[
        textStyles.normalBold,
        {fontSize: scale(16), color: colors.PRIMARY},
      ]}>
      {title}
    </Text>
  </TouchableOpacity>
);

const Menu = ({navigation}) => {
  const dispatch = useDispatch();

  const logOut = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      {text: 'Yes', onPress: () => dispatch(logoutAction())},
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Item
        onPress={() => navigation.navigate('Setting')}
        title="Profile"
        image={require('../../assets/images/icon-profile.png')}
      />
      <View style={styles.line} />
      <Item
        onPress={() => navigation.navigate('Preference')}
        title="Preference"
        image={require('../../assets/images/icon-preference.png')}
      />
      <View style={styles.line} />
      <Item
        onPress={() => navigation.navigate('TermAndCondition')}
        title="Terms and Conditions"
        image={require('../../assets/images/icon-term.png')}
      />
      <View style={styles.line} />
      <Item
        onPress={() => navigation.navigate('Faqs')}
        title="FAQs"
        image={require('../../assets/images/icon-faqs.png')}
      />
      <View style={styles.line} />
      <Item
        onPress={logOut}
        title="Log Out"
        image={require('../../assets/images/icon-logout.png')}
      />
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  image: {
    width: 25,
    height: 25,
    marginRight: 15,
  },
  container: {
    backgroundColor: 'white',
    marginBottom: 30,
    padding: scale(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  line: {
    marginVertical: 15,
    width: '100%',
    height: scale(1),
    backgroundColor: colors.LIGHT_GRAY,
  },
});
