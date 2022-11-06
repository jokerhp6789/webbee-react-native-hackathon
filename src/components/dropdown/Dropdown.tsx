import React from 'react';
import {Text} from 'react-native';
import ModalDropdown, {ModalDropdownProps} from 'react-native-modal-dropdown';
import AppFonts from '../../style/AppFonts';
import AppSizes from '../../style/AppSizes';
import Button, {IButtonProps} from '../button/Button';

export interface IDropdownProps extends ModalDropdownProps {
  buttonProps?: IButtonProps;
  children?: any;
  getLabel?: any;
}

const Dropdown: React.FC<IDropdownProps> = ({
  buttonProps,
  children,
  getLabel = (item: any) => item?.label,
  ...rest
}) => {
  const renderRow = (item: any, index: string) => {
    return (
      <Text
        style={[{padding: AppSizes.paddingMedium}, {fontSize: AppFonts.h3}]}>
        {getLabel(item)}
      </Text>
    );
  };

  return (
    <ModalDropdown
      isFullWidth
      dropdownStyle={{minHeight: 220}}
      options={['option 1', 'option 2']}
      renderRow={renderRow}
      {...rest}>
      <Button {...buttonProps} disabled>
        {children}
      </Button>
    </ModalDropdown>
  );
};

export default Dropdown;
