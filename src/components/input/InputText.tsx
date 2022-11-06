import React from 'react';
import {
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import AppColors from '../../style/AppColors';
import AppSizes from '../../style/AppSizes';

export interface IInputTextProps extends TextInputProps {
  label?: string;
  styleWrapper?: StyleProp<ViewStyle>;
  suffix?: any;
}

const InputText: React.FC<IInputTextProps> = ({
  label,
  styleWrapper,
  suffix,
  style,
  ...rest
}) => {
  return (
    <View style={[{marginTop: AppSizes.paddingXSml}, styleWrapper]}>
      <Text style={[{marginBottom: AppSizes.paddingTiny, fontWeight: '500'}]}>
        {label}
      </Text>
      <View
        style={[
          {
            height: 50,
            borderWidth: 1,
            borderColor: AppColors.gray,
            borderRadius: AppSizes.borderRadiusMedium,
            flexDirection: 'row',
          },
        ]}>
        <TextInput
          {...rest}
          placeholder={label}
          style={[
            {
              //   height: 50,
              //   borderWidth: 1,
              //   borderColor: AppColors.gray,
              //   borderRadius: AppSizes.borderRadiusMedium,
              paddingLeft: AppSizes.paddingSml,
              height: 50,
            },
            style,
          ]}
        />
        {suffix}
      </View>
    </View>
  );
};

export default InputText;
