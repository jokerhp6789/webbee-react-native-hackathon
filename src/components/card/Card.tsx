import React from 'react';
import {StyleProp, Text, View, ViewStyle} from 'react-native';
import AppColors from '../../style/AppColors';
import AppFonts from '../../style/AppFonts';
import AppSizes from '../../style/AppSizes';

export interface ICardProps {
  title?: string;
  style?: StyleProp<ViewStyle>;
  children?: any;
}

const Card: React.FC<ICardProps> = ({title, style, children}) => {
  return (
    <View
      style={[
        {
          padding: AppSizes.paddingMedium,
          backgroundColor: AppColors.white,
          borderRadius: AppSizes.borderRadiusMedium,
        },
        style,
      ]}>
      <Text style={{fontWeight: 'bold', fontSize: AppFonts.h3}}>{title}</Text>
      {children}
    </View>
  );
};

export default Card;
