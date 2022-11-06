import React from 'react';
import {View, Text} from 'react-native';

export interface IDashboardScreenProps {
  [key: string]: any;
}

const DashboardScreen: React.FC<IDashboardScreenProps> = ({}) => {
  return (
    <View>
      <Text>Dashboard Screen</Text>
    </View>
  );
};

export default DashboardScreen;
