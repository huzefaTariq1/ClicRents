// import React,{useState,useEffect} from 'react';
// import {createStackNavigator} from '@react-navigation/stack';
// //import {Login, ForgotPassword, Register} from '../screens';
// import {COLORS, ROUTES} from '../constants';
// //import DrawerNavigator from './DrawerNavigator';
// import Screen1 from '../screens/Screen1';
// import DrawerNavigator from './DrawerNavigator';
// import LoginForm from '../screens/Auth/LoginForm';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Stack = createStackNavigator();
// // Navigator, Screen, Group

// let token=true

// function AuthNavigator() {

//   const [accessToken, setAccessToken] = useState('');
//   //const dispatch = useDispatch();

//   useEffect(() => {
//     checkToken();
//   }, []);

//   const checkToken = async () => {
//     try {
//       const token = await AsyncStorage.getItem('accessToken');
//       if (token) {
//         setAccessToken(token);
//       }
//     } catch (error) {
//       console.error('Error checking token:', error);
//     }
//   };

//   return (
//     <Stack.Navigator screenOptions={{}}>

//      {

//       accessToken?
//       <Stack.Screen
//       name={ROUTES.HOME}
//       component={DrawerNavigator}
//       options={{headerShown: false}}
//     />
//     :
//     <Stack.Screen
//     name={"loginform"}
//     component={LoginForm}
//     options={{headerShown: false}}
//   />
//      }

//     </Stack.Navigator>
//   );
// }

// export default AuthNavigator;

// // <Stack.Screen
// // name={ROUTES.HOME}
// // component={DrawerNavigator}
// // options={{headerShown: false}}
// // />

// // <Stack.Screen
// // name={ROUTES.LOGIN}
// // component={Screen1}
// // options={{headerShown: false}}
// // />

import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {COLORS, ROUTES} from '../constants';
import DrawerNavigator from './DrawerNavigator';
//import LoginForm from '../screens/Auth/LoginForm';
import LoginForm from '../screens/Auth/ handleLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

function AuthNavigator() {
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        setAccessToken(token);
      }
    } catch (error) {
      console.error('Error checking token:', error);
    }
  };

  return (
    <Stack.Navigator screenOptions={{}} initialRouteName={'LoginForm'}>
      {accessToken ? (
        <Stack.Screen
          name={ROUTES.HOME}
          component={DrawerNavigator}
          options={{headerShown: false}}
        />
      ) : (
        <Stack.Screen
          name="LoginForm"
          component={LoginForm}
          options={{headerShown: false}}
        />
      )}
    </Stack.Navigator>
  );
}

export default AuthNavigator;
