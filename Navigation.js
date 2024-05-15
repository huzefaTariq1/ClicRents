import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import axiosInstance from './axiosInstance';
import {useSelector} from 'react-redux';

import LoginScreen from './src/screens/LoginScreen';

import DrawerNavigator from './src/navigations/DrawerNavigator';
import {ROUTES} from './src/constants';
import SelectOrganization from './src/screens/ SelectOrganization';
import LoadingScreen from './src/screens/LoadingScreen';
import LoadingSpinner from './src/screens/LoadingSpinner';
import {
  addUpdatedTranslation,
  changeLanguage,
  getLanguage,
} from './src/helpers/TranslationUtils';
import {API_URL, LOGIN_BASE_URL} from '@env';

const Stack = createStackNavigator();

const Navigation = () => {
  const [accessToken, setAccessToken] = useState('');
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const {token, userData} = useSelector(state => state.user);

  useEffect(() => {
    fetchLanguageData();
  }, []);
  async function fetchLanguageData() {
    try {
      console.log(LOGIN_BASE_URL);
      const response = await getLanguage();
      if (response) {
        await addUpdatedTranslation(response);
        const currentlang = await AsyncStorage.getItem('lang');
        await changeLanguage(currentlang == null ? 'fr' : currentlang);
        checkToken();
      }
    } catch (error) {
      console.error('Error fetching language dictionary:', error);
    }
  }
  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const customerId = await AsyncStorage.getItem('customerId');
      if (token) {
        setAccessToken(token);
        dispatch({type: 'setToken', payload: token});
        dispatch({type: 'setId', payload: customerId});

        const response = await axiosInstance.get(
          //'${LOGIN_BASE_URL}/Auth/GetUserProfile',
          `${LOGIN_BASE_URL}/Auth/GetUserProfile`,
        );

        dispatch({type: 'setUser', payload: response.data});
      }
      setLoading(false);
    } catch (error) {
      console.error('Error checking token:', error);
    }
  };

  const handelOrganization = async item => {
    try {
      dispatch({type: 'setId', payload: item.customerId});
      await AsyncStorage.setItem('customerId', item.customerId);
      await AsyncStorage.setItem('oname', item.organizationName);
      const id = await AsyncStorage.getItem('customerId');
      const token = await AsyncStorage.getItem('accessToken');
      setAccessToken(token);
      checkToken();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  if (loading) {
    // Show a loader/spinner while checking for the token
    return <LoadingSpinner />;
  }

  return (
    <Stack.Navigator>
      {!token ? (
        <>
          <Stack.Screen name="Login" options={{headerShown: false}}>
            {props => <LoginScreen {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Select" options={{headerShown: false}}>
            {props => (
              <SelectOrganization
                {...props}
                handelOrganization={handelOrganization}
              />
            )}
          </Stack.Screen>
        </>
      ) : (
        <>
          <Stack.Screen
            name={ROUTES.HOME}
            component={DrawerNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'loading'}
            component={LoadingScreen}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Navigation;
