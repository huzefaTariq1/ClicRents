// LoginForm.js

import React, {useState} from 'react';
import {View, TextInput, Button} from 'react-native';
import ErrorMessage from '../../components/ErrorMessage';
import AppForm from '../../components/AppForm';
import AppFormField from '../../components/AppFormField';
import SubmitButton from '../../components/SubmitButton';
import * as Yup from 'yup';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import axiosInstance from '../../../axiosInstance';
import {ROUTES} from '../../constants';
import {API_URL, LOGIN_BASE_URL} from "@env"

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().label('Password'),
});

const LoginForm = ({navigation}) => {
  //const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleLogin = async (email, password) => {
    try {
      const response = await axiosInstance.get(
        `${LOGIN_BASE_URL}/Auth/GetCustomerApps`,
        // `https://appmanagerapi.nativesystemsltd.com/Auth/GetCustomerApps`,
        {
          params: {
            email: email,
            appId: 1,
          },
        },
      );

      const customerId = response.data[0].customerId;

      const appLoginPayload = {
        email: email,
        password: password,
        customerId: customerId,
      };

      const appLoginResponse = await axiosInstance.post(
        `${LOGIN_BASE_URL}/Auth/AppLogin`,
        // `https://appmanagerapi.nativesystemsltd.com/Auth/AppLogin`,
        appLoginPayload,
      );

      const {accessToken, refreshToken, refreshTokenExpire} =
        appLoginResponse.data;

      // Save tokens and expiry in AsyncStorage
      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);
      await AsyncStorage.setItem('refreshTokenExpire', refreshTokenExpire);

      dispatch({type: 'setId', payload: accessToken});
      console.log(accessToken);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLoginButton = ({email, password}) => {
    console.log('huzefa');
    handleLogin(email, password);
    navigation.navigate(ROUTES.HOME);
  };

  return (
    <AppForm
      initialValues={{email: '', password: ''}}
      onSubmit={handleLoginButton}
      validationSchema={validationSchema}>
      <AppFormField
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        name="email"
        placeholder="Email"
        textContentType="emailAddress"
      />
      <AppFormField
        autoCapitalize="none"
        autoCorrect={false}
        name="password"
        placeholder="Password"
        secureTextEntry
        textContentType="password"
      />
      <SubmitButton title="Login" />
    </AppForm>
  );
};

export default LoginForm;
