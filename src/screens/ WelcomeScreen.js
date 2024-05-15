/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useIsFocused} from '@react-navigation/native';

import {useDispatch} from 'react-redux';
//import { useNavigation } from '@react-navigation/native';
import axiosInstance from '../../axiosInstance';
import Screen from '../components/Screen';
import AppText from '../components/AppText';

import TopBar from '../components/TopBar';
import {ROUTES} from '../constants';
import ImagePicker from 'react-native-image-crop-picker';
import {API_URL, LOGIN_BASE_URL} from '@env';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    getDashBordCard();
  }, [isFocused]);

  const counter = useSelector(state => state.counter);
  const {token, organization, customerId} = useSelector(state => state.user);

  const userData = useSelector(state => state.userData);
  const [dashBoardData, setDashboardData] = useState();
  const dispatch = useDispatch();
  // const navigation = useNavigation();

  const getDashBordCard = async () => {
    if (isFocused) {
      try {
        const response = await axiosInstance.get(
          //'https://clicrentapi.nativesystemsltd.com/Dashboard/DashboardCards',
          `${API_URL}/Dashboard/DashboardCards`,
        );

        // Handle the response data as needed
        setDashboardData(response.data);
      } catch (error) {
        console.log('Error fetchtcing', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      console.log('logout');
      await AsyncStorage.removeItem('accessToken');
      dispatch({type: 'setToken', payload: ''});
      // navigation.navigate("LoginForm")
    } catch (error) {
      console.error('Logout error:', error);
    }
    // console.log(token)
  };

  const getUserProfile = async () => {
    try {
      const response = await axiosInstance.get(
        // 'https://appmanagerapi.nativesystemsltd.com/Auth/GetUserProfile',
        `${LOGIN_BASE_URL}/Auth/GetUserProfile`,
      );

      // Handle the response data as needed
      console.log('User Profile:', response.data);
      // dispatch({type:'SET_DATA',payload:response.data})
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const renderCardImage = title => {
    if (title === 'Remaining Dues') {
      return require('../../assets/home.png');
    } else if (title === 'Unconfirmed Dues') {
      return require('../../assets/done.png');
    } else if (title === 'Untraited Transactions') {
      return require('../../assets/done.png');
    } else if (title === 'KBC H') {
      return require('../../assets/wallet.png');
    }
  };

  return (
    <View style={{backgroundColor: '#F4F6F8'}}>
      <TopBar route="CR-Home / CR-CR- Dashboard" />

      <View style={{paddingHorizontal: 10}}>
        <ScrollView height={600}>
          {dashBoardData?.map(obj => {
            const navigateToScreen = () => {
              if (obj.title === 'Remaining Dues') {
                navigation.navigate(ROUTES.TENANTS);
              } else if (obj.title === 'Unconfirmed Dues') {
                navigation.navigate(ROUTES.DUES);
              } else if (obj.title === 'Untraited Transactions') {
                navigation.navigate(ROUTES.BANK);
              } else if (obj.title === 'KBC H') {
                navigation.navigate(ROUTES.BANK);
              }
            };
            console.log(obj.title);
            return (
              <TouchableOpacity
                onPress={navigateToScreen}
                key={obj.title}
                style={styles.bigCard}>
                <View>
                  <Text style={styles.text}>{obj.title}</Text>
                  <Text style={styles.text}>{obj.value}</Text>
                </View>
                <View
                  style={{
                    width: 35,
                    height: 35,
                    backgroundColor: '#FB5E39',
                    borderRadius: 25,
                    marginRight: 10,
                    marginTop: 18,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{width: 15, height: 15}}
                    source={renderCardImage(obj.title)}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#233044',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: 'white',
  },
  card: {
    backgroundColor: '#1E293A',
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  bigCard: {
    backgroundColor: '#1E293A',
    paddingVertical: 30,
    borderRadius: 10,
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: '#FFFFFF',
    paddingLeft: 10,
    fontSize: 12,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    backgroundColor: 'white',
    padding: 10,
    elevation: 4,
  },
});

// <Text>Welcome Screen</Text>

// <Button title="Logout" onPress={handleLogout} />
// <Button title="Get User Profile" onPress={getUserProfile} />

// <DropDown/>

// <Button title="Logout" onPress={handleLogout} />
