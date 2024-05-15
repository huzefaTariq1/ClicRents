// LoginScreen.js

import React, {useState} from 'react';
import {View, TextInput, Button, Image, ActivityIndicator} from 'react-native';
import ErrorMessage from '../components/ErrorMessage';
import AppForm from '../components/AppForm';
import AppFormField from '../components/AppFormField';
import AppButton from '../components/AppButton';
import SubmitButton from '../components/SubmitButton';
import * as Yup from 'yup';
import AppText from '../components/AppText';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../axiosInstance';
import AppPasswordField from '../components/AppPasswordField';
import {API_URL, LOGIN_BASE_URL} from '@env';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().label('Password'),
});

const LoginScreen = ({navigation, handleLogin}) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const dispatch = useDispatch();

  const handleLoginButton = async ({email, password}) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `${LOGIN_BASE_URL}/Auth/GetCustomerApps`,
        {
          params: {
            email: email,
            appId: 1,
          },
        },
      );

      setLoading(false);

      if (response.data.length == 0) {
        console.log('hello worls');
        setError(true);
      } else {
        setError(false);

        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('password', password);
        dispatch({type: 'setOrganization', payload: response.data});
        const customerId = response.data[0].customerId;

        await AsyncStorage.setItem('customerId', customerId);
        await AsyncStorage.setItem('email', email);

        const appLoginPayload = {
          email: email,
          password: password,
          customerId: customerId,
        };

        const appLoginResponse = await axiosInstance.post(
          //'${LOGIN_BASE_URL}/Auth/AppLogin',
          `${LOGIN_BASE_URL}/Auth/AppLogin`,
          appLoginPayload,
        );

        const {accessToken, refreshToken, refreshTokenExpire} =
          appLoginResponse.data;

        // Save tokens and expiry in AsyncStorage
        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('refreshToken', refreshToken);
        await AsyncStorage.setItem('refreshTokenExpire', refreshTokenExpire);
        navigation.navigate('Select');
      }
    } catch (error) {
      //console.error('Login error:', error);
      if (error.response && error.response.status === 400) {
        setPasswordError(true);
      }
    }
  };

  return (
    <View style={{paddingHorizontal: 10, justifyContent: 'center', flex: 1}}>
      <View style={{alignItems: 'center'}}>
        <Image
          style={{width: 260, height: 150, paddingBottom: 50}}
          source={require('../../assets/latestlogo.png')}
        />
        <AppText style={{fontSize: 20}}>CR-Login</AppText>
      </View>

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

        {loading && <ActivityIndicator size="large" />}

        {passwordError && (
          <AppText
            style={{
              color: 'red',
              textAlign: 'center',
              fontSize: 14,
              fontWeight: 'bold',
            }}>
            Password is invalid
          </AppText>
        )}

        {error && (
          <AppText
            style={{
              color: 'red',
              textAlign: 'center',
              fontSize: 14,
              fontWeight: 'bold',
            }}>
            No App for This User
          </AppText>
        )}

        <SubmitButton title="CR-Login" />
      </AppForm>

      <AppText style={{color: 'grey', textAlign: 'center'}}>
        Copyright © IMPACT SOFT 2023.
      </AppText>
    </View>
  );
};

export default LoginScreen;
