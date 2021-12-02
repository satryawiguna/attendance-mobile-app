import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import BackButton from '../../../components/BackButton';
import CustomHeader from '../../../components/CustomHeader';
import {colors} from '../../../constants/colors';
import {textStyles} from '../../../constants/textStyles';
import {PROFILE_API} from '../../../consts/api';
import {scale} from '../../../utils/responsive';
import Item from './Item';

const FaqsScreen = ({navigation}) => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(PROFILE_API.GET_FAQ)
      .then(res => {
        setLoading(false);
        setFaqs(res.data.data);
      })
      .catch(err => {
        setLoading(false);
        console.log('err', err);
      });
  }, []);
  return (
    <View style={styles.container}>
      <CustomHeader white />
      <ScrollView style={{marginHorizontal: scale(15), paddingTop: 15}}>
        <BackButton navigation={navigation} />
        <View style={styles.containerSetting}>
          <Text style={[textStyles.Headline, {fontSize: 20}]}>FAQs</Text>
          <View style={{marginVertical: 10}} />
          {loading && <Text>Please wait...</Text>}
          {faqs.map((item, index) => {
            return (
              <View key={index}>
                <Item title={item.question} desc={item.answer} />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default FaqsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.BACKGROUND,
    flex: 1,
  },
  containerSetting: {
    marginTop: 20,
    backgroundColor: 'white',
    marginBottom: 20,
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
});
