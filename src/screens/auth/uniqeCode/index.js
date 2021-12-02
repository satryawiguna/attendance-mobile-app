import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

import CustomHeader from '../../../components/CustomHeader';
import CustomInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';
import {textStyles} from '../../../constants/textStyles';
import {useDispatch, useSelector} from 'react-redux';
import {getEmployeeAction} from '../../../redux/profileSlice';

const schema = yup.object().shape({
  uniqeCode: yup.string().required('This is required.'),
});

const UniqeCodeScreen = ({navigation}) => {
  const disptach = useDispatch();
  const loading = useSelector(state => state.profile.loading);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitAction = data => {
    disptach(
      getEmployeeAction({
        unique_code: data.uniqeCode,
        onSuccess: (data) => {
          navigation.navigate('Register', {data});
        },
        onFailed: () => {
          Alert.alert('Warning', 'Data not found!');
        },
      }),
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader />
      <View style={{paddingHorizontal: 15, marginTop: 10}}>
        <Text style={[textStyles.Headline, {fontSize: 20}]}>
          Please enter uniqe code below.
        </Text>

        <View style={{marginVertical: 8}} />
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <CustomInput
              placeholder="Uniqe Code"
              onChangeText={value => onChange(value)}
              value={value}
              error={errors.name}
            />
          )}
          name="uniqeCode"
          rules={{required: true}}
        />
        {errors.uniqeCode && (
          <Text style={styles.textError}>{errors.uniqeCode.message}</Text>
        )}
        <View style={{marginVertical: 10}} />

        <CustomButton isLoading={loading} title="Next" onPress={handleSubmit(submitAction)} />
      </View>
    </View>
  );
};

export default UniqeCodeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  textError: {
    color: 'red',
    fontSize: 11,
    marginLeft: 14,
  },
});
