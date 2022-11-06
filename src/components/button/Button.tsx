import React from 'react';
import {
  Pressable,
  PressableProps,
  Text,
  ViewStyle,
  StyleProp,
} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import AppColors from '../../style/AppColors';
import AppSizes from '../../style/AppSizes';

export interface IButtonProps extends PressableProps {
  children?: any;
  style?: StyleProp<ViewStyle>;
  variant?: 'standard' | 'outline';
}

const Button: React.FC<IButtonProps> = ({
  children,
  style,
  variant = 'standard',
  ...rest
}) => {
  const defaultStyle: StyleProp<ViewStyle> = [
    {
      backgroundColor: AppColors.primary,
      padding: 15,
      borderRadius: AppSizes.borderRadiusMedium,
    },
  ];
  if (variant === 'outline') {
    defaultStyle.push({
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: AppColors.primary,
    });
  }
  if (typeof children === 'string') {
    return (
      <Pressable {...rest} style={[defaultStyle, style]}>
        <Text
          style={{
            color: variant === 'standard' ? AppColors.white : AppColors.primary,
            textAlign: 'center',
          }}>
          {children}
        </Text>
      </Pressable>
    );
  }
  return (
    <Pressable {...rest} style={[defaultStyle, style]}>
      {children}
    </Pressable>
  );
};

export default Button;
