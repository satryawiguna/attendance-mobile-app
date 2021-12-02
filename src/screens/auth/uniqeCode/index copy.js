import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

import CustomHeader from '../../../components/CustomHeader';
// import CustomInput from '../../../components/CustomInput';

const schema = yup.object().shape({
  uniqeCode: yup.string().required('This is required.'),
});

const UniqeCodeScreen = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitAction = data => {};

  return (
    <View style={styles.container}>
      {/* <CustomHeader /> */}
      {/* <Controller
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
        defaultValue=""
      />
      {errors.uniqeCode && (
        <Text style={styles.textError}>{errors.uniqeCode.message}</Text>
      )} */}
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
