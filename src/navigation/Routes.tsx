/** @format */

import React from 'react';
import {Dimensions} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import DrawerScreen from './drawer/DrawerScreen';
import ManageCategoriesScreen from '../screens/categories/manage/ManageCategoriesScreen';
import CategoryDetailScreen from '../screens/categories/detail/CategoryDetailScreen';
import CategoryDetail from '../screens/categories/detail/content/CategoryDetail';

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
      <Drawer.Screen
        name="categoryDetailScreen"
        children={(props: any) => <CategoryDetail {...props} />}
        // options={{headerShown: false}}
      />
      <Drawer.Screen
        name="manageCategories"
        options={{headerTitle: 'Manage Categories'}}
        component={ManageCategoriesScreen}
      />
    </Drawer.Navigator>
  );
};

export default AppRoutes;
