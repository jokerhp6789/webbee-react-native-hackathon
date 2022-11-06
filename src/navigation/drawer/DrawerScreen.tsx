import React from 'react';
import {View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export interface IDrawerScreenProps {
  [key: string]: any;
}

const DrawerScreen: React.FC<IDrawerScreenProps> = ({}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Text>Drawer Screen</Text>
    </SafeAreaView>
  );
};

export default DrawerScreen;
