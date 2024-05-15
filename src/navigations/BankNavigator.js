import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useFocusEffect} from '@react-navigation/native';
import {ROUTES} from '../constants';
import BankInfo from '../screens/Bank/BankInfo';
import AddFunds from '../screens/Bank/AddFunds';

const Stack = createStackNavigator();

function BankNavigator({navigation}) {
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Reset the state of the navigation stack when DuesNavigator is focused
      navigation.reset({
        index: 0,
        routes: [{name: ROUTES.BANK_INFO}],
      });
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={ROUTES.BANK_INFO} component={BankInfo} />
      <Stack.Screen name={'AddFunds'} component={AddFunds} />
    </Stack.Navigator>
  );
}

export default BankNavigator;
