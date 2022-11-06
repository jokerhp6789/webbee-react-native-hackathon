import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {map} from 'lodash';

import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {ICategory} from '../../interface/categories';
import {AppStoreState} from '../../store/store';

export interface IDrawerScreenProps {
  [key: string]: any;
}

const DrawerScreen: React.FC<IDrawerScreenProps> = (props: any) => {
  const navigation = useNavigation<any>();
  const listCategories = useSelector<AppStoreState>(
    state => state?.categories?.data ?? [],
  ) as ICategory[];
  return (
    <DrawerContentScrollView {...props} style={{flex: 1}}>
      <DrawerItem
        label="Dash Board"
        to="dashboard"
        {...props}
        onPress={() => navigation.navigate('dashboard')}
      />
      {map(listCategories, category => {
        return (
          <DrawerItem
            label={category?.name ?? 'N/A'}
            key={`${category?.id}`}
            onPress={() => {
              navigation.navigate('categoryDetailScreen');
            }}
          />
        );
      })}
      <DrawerItem
        label="Manage Categories"
        to="manageCategories"
        onPress={() => navigation.navigate('manageCategories')}
        {...props}
      />
    </DrawerContentScrollView>
  );
};

export default DrawerScreen;
