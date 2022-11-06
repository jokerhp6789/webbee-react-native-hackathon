/** @format */

import React from 'react';
import {Dimensions} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import DrawerScreen from './drawer/DrawerScreen';

const drawerWidth = Dimensions.get('window').width - 50;
const Drawer = createDrawerNavigator();

const AppRoutes = () => {
  return (
    <Drawer.Navigator
      drawerContent={() => <DrawerScreen />}
      initialRouteName="dashboardScreen">
      <Drawer.Screen name="dashboardScreen" component={DashboardScreen} />
      {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
    </Drawer.Navigator>
  );
};

export default AppRoutes;
