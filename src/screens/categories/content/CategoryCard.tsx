import {styles} from 'd-react-native-styles';
import {filter, map} from 'lodash';
import React from 'react';
import {Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import Button from '../../../components/button/Button';
import Card, {ICardProps} from '../../../components/card/Card';
import Dropdown from '../../../components/dropdown/Dropdown';
import InputText from '../../../components/input/InputText';
import {
  CATEGORY_ATTRIBUTE_TYPES,
  ICategory,
  ICategoryAttribute,
} from '../../../interface/categories';
import {crudCategoryAction} from '../../../store/categories/categoriesAction';
import {
  EDIT_CATEGORY,
  REMOVE_CATEGORY,
} from '../../../store/categories/categoriesConstant';
import AppColors from '../../../style/AppColors';
import AppSizes from '../../../style/AppSizes';
import StringUtils from '../../../utils/StringUtils';

export interface ICategoryCardProps extends ICardProps {
  category: ICategory;
}

const CategoryAttributeInput = ({
  attribute,
  onEdit,
  onRemove,
}: {
  attribute: ICategoryAttribute;
  onRemove: any;
  onEdit: any;
}) => {
  const {name, type} = attribute || {};
  return (
    <View style={[styles('flex-row align-items-end')]}>
      <InputText
        styleWrapper={{flex: 1, marginRight: AppSizes.paddingXSml}}
        style={{flex: 1}}
        label={name}
        suffix={
          <View
            style={[
              styles('flex-center p-1 rounded-2 text-center'),
              {width: 70},
            ]}>
            <Text style={{color: AppColors.primary, fontWeight: '700'}}>
              {type}
            </Text>
          </View>
        }
        onChangeText={text => {
          onEdit({...attribute, name: text});
        }}
        value={name}
      />

      <Button variant="outline" onPress={onRemove}>
        Remove
      </Button>
    </View>
  );
};

const CategoryCard: React.FC<ICategoryCardProps> = ({category, ...rest}) => {
  const {name, attributes = []} = category;
  const dispatch = useDispatch();

  const onChangeCategoryData = (key: keyof ICategory, value: any) => {
    const clone = {...category, [key]: value};
    dispatch(crudCategoryAction(EDIT_CATEGORY, clone));
  };

  const onAddNewField = (attributeData: {id: string; label: string}) => {
    const newItemToAdd: ICategoryAttribute = {
      id: StringUtils.getUniqueID(),
      type: attributeData?.id as any,
      name: 'New Atrribute',
    };
    const cloneAttr = [...attributes, newItemToAdd];
    onChangeCategoryData('attributes', cloneAttr);
  };

  const onUpdateField = (itemToUpdate: any) => {
    const updatedAttrs = map(attributes, i =>
      i?.id === itemToUpdate?.id ? itemToUpdate : i,
    );
    onChangeCategoryData('attributes', updatedAttrs);
  };

  const onRemoveField = (itemToRemove: any) => {
    const removed = filter(attributes, i => i?.id !== itemToRemove?.id);
    onChangeCategoryData('attributes', removed);
  };

  const renderContent = () => {
    return (
      <React.Fragment>
        {map(attributes, item => {
          return (
            <CategoryAttributeInput
              key={item?.id}
              onEdit={(updateItem: any) => onUpdateField(updateItem)}
              onRemove={() => onRemoveField(item)}
              attribute={item}
            />
          );
        })}
      </React.Fragment>
    );
  };

  const renderFooter = () => {
    return (
      <React.Fragment>
        <Dropdown
          options={[...attributes]}
          getLabel={(item: any) => item?.name}
          onSelect={(index, value) =>
            onChangeCategoryData('titleField', value?.id)
          }
          buttonProps={{
            style: {marginTop: AppSizes.paddingXSml},
          }}>{`TITLE FIELD`}</Dropdown>
        <View style={[styles('flex-center-y mt-2')]}>
          <Dropdown
            onSelect={(index, item) => onAddNewField(item)}
            options={CATEGORY_ATTRIBUTE_TYPES}
            buttonProps={{
              variant: 'outline',
              style: {flex: 1},
            }}>{`ADD NEW FIELD`}</Dropdown>
          <Button
            variant="outline"
            style={styles('flex-1 ml-2')}
            onPress={() => {
              dispatch(crudCategoryAction(REMOVE_CATEGORY, category));
            }}>
            REMOVE CATEGORY
          </Button>
        </View>
      </React.Fragment>
    );
  };

  return (
    <Card title={name} {...rest}>
      {/* <Icon name="delete" /> */}
      <InputText
        label="Category Name"
        onChangeText={text => onChangeCategoryData('name', text)}
      />
      {renderContent()}
      {renderFooter()}
    </Card>
  );
};

export default CategoryCard;
