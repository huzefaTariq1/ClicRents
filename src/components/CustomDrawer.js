/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Image,
  View,
  Dimensions,
  DevSettings
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import AppText from './AppText';
import AppButton from './AppButton';
import {useSelector, useDispatch} from 'react-redux';
import CustumDropDown from './CustumDropDown';
import axiosInstance from '../../axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation,useRoute } from '@react-navigation/native';
import {API_URL,LOGIN_BASE_URL} from "@env"
import RNRestart from 'react-native-restart';



const language1 = [
  {
    id: 'en',
    name: 'English',
  },
  {
    id: 'fr',
    name: 'French',
  },
  {
    id: 'gr',
    name: 'German',
  },
];

const {width} = Dimensions.get('screen');

const CustomDrawer = props => {
  useEffect(() => {
    getInitailData();
  }, [selectedOrganization]);

  const navigation = useNavigation();
  const route = useRoute();
  const {langId,langName} = useSelector(state => state.user);
 
  const [organization, setOrganition] = useState([]);
  const [selected,setSelected]=useState()

  const [language,setLanguage]=useState(language1)
  const [selectedLanguage,setSelectedLanguage]=useState()
 
  const dispatch = useDispatch();

  const getInitailData = async () => {
    const id = await AsyncStorage.getItem('customerId');
    //const lanid = await AsyncStorage.getItem('lang');
    setSelected(id)
    const lid = await AsyncStorage.getItem('lang');
     
    if (lid !== undefined && lid !== null) {
      setSelectedLanguage(lid)
    } else {
      setSelectedLanguage('fr')

    }

    //setSelectedLanguage(lanid)

    const email = await AsyncStorage.getItem('email');
    try {
      const response = await axiosInstance.get(
       // 'http://appmanagerapi.nativesystemsltd.com/Auth/GetCustomerApps',
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

  const [selectedOrganization, setSelctedOrganion] = useState();
  const [selectedOrganization1, setSelctedOrganion1] = useState();
  const [error, setError] = useState(false);

  const handleSelectOrganization = async item => {
    dispatch({type: 'setId', payload: item.customerId});
    await AsyncStorage.setItem('customerId', item.customerId);
    await AsyncStorage.setItem('oname', item.organizationName);
    const id = await AsyncStorage.getItem('customerId');

    setSelctedOrganion(item.customerId);
    //DevSettings.reload()
    navigation.navigate('loading');
  };

  const handleSelectLanguage = async item => {

    dispatch({ type: 'setLanguage', payload: item.id });
    dispatch({ type: 'changeLanguage', payload: item.id });
    dispatch({ type: 'changeLanguageName', payload: item.name });
    await AsyncStorage.setItem('lang', item.id);
    await AsyncStorage.setItem('lname', item.name);
    const id = await AsyncStorage.getItem('lang');


    //   setLanguage(item.id);
    // setSelctedOrganion1(item.id);
   // navigation.navigate('loading');
   RNRestart.restart();

    //DevSettings.reload();


  };


  return (
    <View style={styles.container}>
      <DrawerContentScrollView style={{paddingHorizontal: 13}} {...props}>
        <View style={{padding: 6, paddingHorizontal: 4}}>
          <View style={{alignItems: 'center'}}>
            <Image source={require('../../assets/logo.png')} />
          </View>
          <View
            style={{
              borderBottomColor: '#233044',
              borderWidth: 2,
              borderTopColor: 'white',
              borderLeftColor: '#233044',
              borderRightColor: '#233044',
              paddingVertical: 5,
              marginTop: 10,
            }}></View>
          <View></View>
        </View>
        <View>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomContainer}>
         
      <AppText style={styles.selectOrgText}>Select language</AppText>
        <CustumDropDown
          //title="CR-Organization"
          label="name"
          values="id"
          value={selectedLanguage}
          data={language}
          handleSelect={handleSelectLanguage}
        />

        <AppText style={styles.selectOrgText}>Select Organization</AppText>
        <CustumDropDown
          //title="CR-Organization"
          label="organizationName"
          values="customerId"
          value={selected}
          data={organization}
          handleSelect={handleSelectOrganization}
        />
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    // borderTopWidth: 1,
    //borderTopColor: '#9C9C9C',
    backgroundColor: '#233044',
  },
  selectOrgText: {
    paddingBottom: 10,
    fontWeight: 'bold',
    color: 'white',
  },

  //   userImg: {
  //     width: 110,
  //     height: 110,
  //     borderRadius: 110 / 2,
  //     position: "absolute",
  //     left: width / 2 - 110,
  //     bottom: -110 / 2,
  //     borderWidth: 4,
  //     // borderColor: COLORS.white,
  //   },
  //   drawerListWrapper: {
  //     marginTop: 65,
  //   },
});