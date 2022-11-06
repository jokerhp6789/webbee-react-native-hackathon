/** @format */

import React from 'react';
import {Dimensions} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import DrawerScreen from './drawer/DrawerScreen';
import ManageCategoriesScreen from '../screens/categories/ManageCategoriesScreen';

const drawerWidth = Dimensions.get('window').width - 50;
const Drawer = createDrawerNavigator();

const AppRoutes = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerScreen {...props} />}
      initialRouteName="dashboard">
      <Drawer.Screen
        name="dashboard"
        options={{headerTitle: 'Dashboard'}}
        component={DashboardScreen}
      />
      {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
      <Drawer.Screen
        name="manageCategories"
        component={ManageCategoriesScreen}
      />
    </Drawer.Navigator>
  );
};

export default AppRoutes;
