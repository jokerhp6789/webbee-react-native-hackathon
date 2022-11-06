import React, {useMemo, useState} from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import DatePicker, {DatePickerProps} from 'react-native-date-picker';
import AppColors from '../../style/AppColors';
import AppSizes from '../../style/AppSizes';
import TimeUtils from '../../utils/TimeUtils';

export type TDateFormat =
  | 'DD/MM/YYYY HH:mm'
  | 'DD/MM/YYYY'
  | 'MM/YYYY'
  | 'YYYY'
  | 'HH:mm'
  | 'HH:mm:';

export type InputDateModeType = 'date' | 'time' | 'datetime' | 'month';

export interface IInputDateProps
  extends Omit<DatePickerProps, 'date' | 'onDateChange' | 'mode'> {
  value?: DatePickerProps['date'];
  format?: TDateFormat;
  label?: string;
  classNameLabel?: string;
  classNameText?: string;
  className?: string;
  classNameError?: string;
  cancelText?: string;
  confirmText?: string;
  variant?: 'standard' | 'outline' | 'icon' | 'pill' | 'rounded' | 'trans';
  labelPosition?: 'inside' | 'outside';
  placeholder?: string;
  error?: any;
  height?: number;
  showIcon?: boolean;
  iconName?: string;

  disabled?: boolean;
  styleDatePicker?: StyleProp<ViewStyle>;
  styleLabel?: StyleProp<TextStyle>;
  mode?: InputDateModeType;
  onChange?: DatePickerProps['onDateChange'];
  customIcon?: ((value: any) => Element) | Element;
  onPress?: () => void;
}

const InputDate: React.FC<IInputDateProps> = ({
  label,
  disabled,
  style,
  styleDatePicker,
  styleLabel,
  value,
  onChange,
  format = 'DD/MM/YYYY',
  placeholder,
  mode = 'date',
  ...rest
}) => {
  const [openDateModal, setOpenDateModal] = useState<{
    open: boolean;
    timeStamp?: any;
  }>({open: false});

  const displayValue = useMemo(() => {
    if (!value) {
      if (placeholder) {
        return placeholder;
      }
      return label;
    }
    let res;
    switch (mode) {
      case 'datetime':
        res = TimeUtils.convertMiliToDateTime(value);
        break;
      case 'time':
        res = TimeUtils.toTime(value);
        break;
      default:
        res = TimeUtils.toDate(value);
        break;
    }
    if (format) {
      res = TimeUtils.format(value, format);
    }
    return res;
  }, [value, format, mode, placeholder, label]);

  const renderContent = () => {
    const renderValue = () => {
      return (
        <Text style={{color: !value ? AppColors.gray : undefined}}>
          {displayValue}
        </Text>
      );
    };
    return (
      <View
        style={[
          {height: 50},
          {
            borderColor: AppColors.gray,
            borderWidth: 1,
            borderRadius: AppSizes.borderRadiusMedium,
            justifyContent: 'center',
            paddingLeft: AppSizes.paddingXSml,
          },
        ]}>
        {renderValue()}
      </View>
    );
  };

  return (
    <View style={[{}, style]}>
      {label && (
        <Text style={[{paddingBottom: AppSizes.paddingXSml}, styleLabel]}>
          {label}
        </Text>
      )}
      <TouchableOpacity
        onPress={() => {
          setOpenDateModal({
            open: true,
            timeStamp: new Date().valueOf(),
          });
        }}
        disabled={disabled}>
        {renderContent()}
      </TouchableOpacity>
      {openDateModal.open && (
        <DatePicker
          modal
          open={openDateModal.open}
          onConfirm={date => {
            setOpenDateModal({open: false});
            onChange && onChange(date);
          }}
          onCancel={() => setOpenDateModal({open: false})}
          date={value || new Date()}
          onDateChange={onChange as any}
          style={styleDatePicker}
          focusable
          {...rest}
          androidVariant="nativeAndroid"
          mode={mode as any}
          timeZoneOffsetInMinutes={420}
          theme="light"
          // textColor={isDarkMode ? "white" : "black"}
        />
      )}
    </View>
  );
};

export default InputDate;
