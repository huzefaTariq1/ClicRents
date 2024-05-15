import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Settings, SettingsDetail} from '../screens';
import {ROUTES} from '../constants';
import AddBuilding from '../screens/Buildings/AddBuilding';
import DetailBuilding from '../screens/Buildings/DetailBuilding';

const Stack = createStackNavigator();

function BuildingNavigator({navigation}) {
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Reset the state of the navigation stack when TenantNavigator is focused
      navigation.reset({
        index: 0,
        routes: [{name: ROUTES.SETTINGS}],
      });
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={ROUTES.SETTINGS} component={AddBuilding} />
      <Stack.Screen name={'DetailBuilding'} component={DetailBuilding} />
    </Stack.Navigator>
  );
}

export default BuildingNavigator;
