import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopBar from '../../components/TopBar';
import {useDispatch} from 'react-redux';
import axiosInstance from '../../../axiosInstance';
import AppText from '../../components/AppText';
import {API_URL, LOGIN_BASE_URL} from "@env"

const Organization = ({navigation}) => {
  useEffect(() => {
    getDashBordCard();
  }, []);

  const [organization, setOrganition] = useState([]);
  const dispatch = useDispatch();

  const getDashBordCard = async () => {
    const email = await AsyncStorage.getItem('email');
    try {
      const response = await axiosInstance.get(
        //'https://appmanagerapi.nativesystemsltd.com/Auth/GetCustomerApps',
         `${LOGIN_BASE_URL}/Auth/GetCustomerApps`,
        {
          params: {
            email: email,
            appId: 1,
          },
        },
      );
      setOrganition(response.data);
      dispatch({type: 'setOrganization', payload: response.data});
    } catch (error) {
      console.error('error:', error);
    }
  };

  const handlePress = async obj => {
    await AsyncStorage.setItem('customerId', obj.customerId);
    console.log(obj.customerId);
  };
  return (
    <View>
      <TopBar route="CR-Home / CR-CR-Organization" />
      {organization?.map((obj, ind) => {
        return (
          <TouchableOpacity
            onPress={() => handlePress(obj)}
            key={ind}
            style={{padding: 10}}>
            <AppText>{obj.organizationName}</AppText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Organization;

const styles = StyleSheet.create({});
