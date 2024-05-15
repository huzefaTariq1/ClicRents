import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useFocusEffect} from '@react-navigation/native';
import {ROUTES} from '../constants';
import AllDuesScreen from '../screens/Dues/AllDuesScreen';

const Stack = createStackNavigator();

function DuesNavigator({navigation}) {
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Reset the state of the navigation stack when DuesNavigator is focused
      navigation.reset({
        index: 0,
        routes: [{name: ROUTES.ALL_DUES}],
      });
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={ROUTES.ALL_DUES} component={AllDuesScreen} />
    </Stack.Navigator>
  );
}

export default DuesNavigator;
