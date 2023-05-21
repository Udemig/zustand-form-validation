import {
  View,
  Text,
  SafeAreaView,
  Button,
  TextInput,
  StyleSheet,
} from 'react-native';
import React from 'react';
import useCounterStore from './src/app/store';
import Counter from './src/components/Counter';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {useForm, Controller} from 'react-hook-form';

const validationScheme = Yup.object().shape({
  email: Yup.string()
    .email('Geçerli bir e-posta adresi giriniz.')
    .required('E-posta alanı zorunludur'),
  password: Yup.string()
    .min(6, 'Şifre en az 6 karakter olmalıdır.')
    .required('Şifre zorunludur'),
});

export default function App() {
  const showZustandInfo = false;

  const isShowFormik = false;

  const isShowReactHookForms = true;

  //const state = useCounterStore();

  //console.log('State', state);

  const {increment, decrement} = useCounterStore(state => state);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({defaultValues: {email: '', password: ''}});

  const handleOnSubmit = values => {
    console.log('handleOnSubmit', values);

    // axios
    //   .get('https://www.lenasoftware.com/api/v1/en/maestro/1')
    //   .then(response => {
    //     console.log('response', response.data);
    //   });
  };

  console.log('Errors', errors);

  return (
    <SafeAreaView style={{marginHorizontal: 10}}>
      {showZustandInfo && (
        <View>
          <Counter />
          <Button title="Artır" onPress={increment} />
          <Button title="Azalt" onPress={decrement} />
        </View>
      )}
      {isShowFormik && (
        <View>
          <Formik
            validationSchema={validationScheme}
            initialValues={{email: '', password: ''}}
            onSubmit={handleOnSubmit}>
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              touched,
              isValid,
              dirty,
            }) => (
              <View style={styles.inputContainer}>
                <Text>E-Posta</Text>
                <TextInput
                  placeholder="E-Posta"
                  style={styles.input}
                  onChangeText={handleChange('email')}
                  value={values.email}
                  keyboardType="email-address"
                  autoCapitalize={'none'}
                />
                <Text style={styles.errorText}>{errors.email}</Text>
                <Text>Şifre</Text>
                <TextInput
                  placeholder="Şifre"
                  style={styles.input}
                  onChangeText={handleChange('password')}
                  secureTextEntry
                  value={values.password}
                  autoCapitalize={'none'}
                />
                <Text style={styles.errorText}>{errors.password}</Text>

                <Button
                  title="Giriş Yap"
                  onPress={handleSubmit}
                  // disabled={!isValid || !dirty}
                  disabled={!isValid}
                />
              </View>
            )}
          </Formik>
        </View>
      )}

      {isShowReactHookForms && (
        <View>
          <View style={styles.inputContainer}>
            <Text>E-Posta</Text>
            <Controller
              control={control}
              rules={{required: true}}
              name="email"
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  placeholder="E-Posta"
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize={'none'}
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            <Text style={styles.errorText}>{errors.email}</Text>
            <Text>Şifre</Text>
            <Controller
              control={control}
              rules={{required: true}}
              name="password"
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  placeholder="Şifre"
                  style={styles.input}
                  autoCapitalize={'none'}
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />

            <Text style={styles.errorText}>{errors.password}</Text>

            <Button
              title="Giriş Yap"
              onPress={() => handleSubmit(handleOnSubmit)}
              // disabled={!isValid || !dirty}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: 'gray',
  },
  inputContainer: {
    gap: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});
