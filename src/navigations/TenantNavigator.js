// import React from 'react';
// import {createStackNavigator} from '@react-navigation/stack';
// import {ROUTES} from '../constants';
// import ViewTenants from '../screens/Tenants/ViewTenants';
// import TenantDetail from '../screens/Tenants/TenantDetail';
// import TenantDues from '../screens/Tenants/TenantDues';
// import AddTenants from '../screens/Tenants/AddTenants';

// const Stack = createStackNavigator();

// function TenantNavigator() {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}
//      >
//       <Stack.Screen name={ROUTES.VIEW_TENANTS} component={ViewTenants} />
//       <Stack.Screen name={ROUTES.TENANT_DETAILS} component={TenantDetail} />
//       <Stack.Screen name={ROUTES.TENANT_DUES} component={TenantDues} />
//       <Stack.Screen name={"abcde"} component={AddTenants} />

//     </Stack.Navigator>
//   );
// }

// export default TenantNavigator;

import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useFocusEffect} from '@react-navigation/native';
import {ROUTES} from '../constants';
import ViewTenants from '../screens/Tenants/ViewTenants';
import TenantDetail from '../screens/Tenants/TenantDetail';
import TenantDues from '../screens/Tenants/TenantDues';
import AddTenants from '../screens/Tenants/AddTenats';
import MessageScreen from '../screens/Tenants/MessageScreen';

const Stack = createStackNavigator();

function TenantNavigator({navigation}) {
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Reset the state of the navigation stack when TenantNavigator is focused
      navigation.reset({
        index: 0,
        routes: [{name: ROUTES.VIEW_TENANTS}],
      });
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={ROUTES.VIEW_TENANTS} component={ViewTenants} />
      <Stack.Screen name={'message'} component={MessageScreen} />
      <Stack.Screen name={ROUTES.TENANT_DETAILS} component={TenantDetail} />
      <Stack.Screen name={ROUTES.TENANT_DUES} component={TenantDues} />
      <Stack.Screen name={ROUTES.ADD_TENANT} component={AddTenants} />
    </Stack.Navigator>
  );
}

export default TenantNavigator;
