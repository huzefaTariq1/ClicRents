import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {COLORS, ROUTES} from '../constants';
import WelcomeScreen from '../screens/WelcomeScreen';
import BuildingNavigator from './BuildingNavigator';
import TenantNavigator from './TenantNavigator';
import DuesNavigator from './DuesNavigator';
import BankNavigator from './BankNavigator';
import CustomDrawer from '../components/CustomDrawer';
import {Dashboard} from '../components/Icons';
import {Building} from '../components/Icons';
import {Bank} from '../components/Icons';
import {Dues} from '../components/Icons';
import {Tenats} from '../components/Icons';
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: COLORS.primaryBlack,
        },
        drawerActiveBackgroundColor: '#1E293A',
        drawerActiveTintColor: COLORS.white,
        drawerLabelStyle: {
          marginLeft: 10,
          color: COLORS.white,
        },
      }}>
      <Drawer.Screen
        name={ROUTES.DASHBOARD}
        component={WelcomeScreen}
        options={{
          headerShown: false,
          drawerIcon: ({size, color}) => <Dashboard />,
        }}
      />
      <Drawer.Screen
        name={ROUTES.BUILDING}
        component={BuildingNavigator}
        options={{
          headerShown: false,
          drawerIcon: ({size, color}) => <Building />,
        }}
      />
      <Drawer.Screen
        name={ROUTES.TENANTS}
        component={TenantNavigator}
        options={{
          headerShown: false,
          drawerIcon: ({size, color}) => <Tenats />,
        }}
      />
      <Drawer.Screen
        name={ROUTES.DUES}
        component={DuesNavigator}
        options={{
          headerShown: false,
          drawerIcon: ({size, color}) => <Dues />,
        }}
      />
      <Drawer.Screen
        name={ROUTES.BANK}
        component={BankNavigator}
        options={{
          headerShown: false,
          drawerIcon: ({size, color}) => <Bank />,
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
