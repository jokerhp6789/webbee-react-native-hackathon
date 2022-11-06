import {filter, find, map} from 'lodash';
import React, {useMemo} from 'react';
import {Text, View, FlatList, Switch, KeyboardAvoidingView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../../../components/button/Button';
import Card from '../../../../components/card/Card';
import InputDate from '../../../../components/input/InputDate';
import InputText from '../../../../components/input/InputText';
import useKeyBoard from '../../../../hooks/useKeyboard';
import {
  CategoryAttributeType,
  ICategory,
  ICategoryAttribute,
  IMachine,
} from '../../../../interface/categories';
import {crudCategoryAction} from '../../../../store/categories/categoriesAction';
import {EDIT_CATEGORY} from '../../../../store/categories/categoriesConstant';
import {AppStoreState} from '../../../../store/store';
import AppFonts from '../../../../style/AppFonts';
import AppSizes from '../../../../style/AppSizes';
import StringUtils from '../../../../utils/StringUtils';

export interface ICategoryDetailProps {
  categoryId: string;
  listKey: string;
  showFooter?: boolean;
}

const MachineInputItem = ({attribute = {}, value, onChange}: any) => {
  const {type, name} = attribute as ICategoryAttribute;
  switch (type) {
    case CategoryAttributeType.BOOLEAN:
      return (
        <View
          style={{
            marginTop: AppSizes.paddingXSml,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Switch value={value} onChange={() => onChange && onChange(!value)} />
          <Text style={{marginLeft: AppSizes.paddingXSml}}>{name}</Text>
        </View>
      );
    case CategoryAttributeType.NUMBER:
      return (
        <InputText
          label={name}
          keyboardType="number-pad"
          value={value}
          onChangeText={text => onChange(text)}
          styleWrapper={{marginTop: AppSizes.paddingXSml}}
        />
      );
    case CategoryAttributeType.DATE:
      return (
        <InputDate
          label={name}
          value={value}
          onChange={v => onChange(v)}
          style={{marginTop: AppSizes.paddingXSml}}
        />
      );

    default:
      return (
        <InputText
          value={value}
          onChangeText={text => onChange(text)}
          label={name}
          styleWrapper={{marginTop: AppSizes.paddingXSml}}
        />
      );
  }
};

const MachineItem = ({
  machine = {},
  category = {},
  onRemove,
  onUpdate,
}: any) => {
  const {attributes: machineAttribute = []} = machine as IMachine;
  const {titleField, attributes} = category as ICategory;
  const itemTitle = useMemo(() => {
    if (!titleField) {
      return 'No Title';
    }
    const found = find(machineAttribute, i => i?.id === titleField);
    return found?.value ?? 'No Title';
  }, [titleField, machineAttribute]);

  const updateAttributeItem = (idToUpdate: string, v: any) => {
    const isUpdate =
      filter(machineAttribute, i => i?.id === idToUpdate)?.length > 0;
    let updated: any = [];
    if (isUpdate) {
      updated = map(machineAttribute, item =>
        item?.id === idToUpdate ? {...item, value: v} : item,
      );
    } else {
      updated = [...machineAttribute, {id: idToUpdate, value: v}];
    }
    onUpdate && onUpdate({...machine, attributes: updated});
  };

  return (
    <Card style={{marginTop: AppSizes.paddingMedium}} title={`${itemTitle}`}>
      {map(attributes, (item, index) => {
        const itemVlue = find(machineAttribute, i => i?.id === item?.id)?.value;
        return (
          <MachineInputItem
            onChange={(v: any) => {
              updateAttributeItem(item?.id as any, v);
            }}
            value={itemVlue}
            attribute={item}
            key={`${item?.id}_${index}`}
          />
        );
      })}
      <Button
        style={{alignSelf: 'flex-end', marginTop: AppSizes.paddingMedium}}
        variant="outline"
        onPress={onRemove}>
        Remove Item
      </Button>
    </Card>
  );
};

const CategoryDetail: React.FC<ICategoryDetailProps> = (props: any) => {
  const dispatch = useDispatch();
  const {heightKeyboard} = useKeyBoard();
  const {showFooter = true} = props;
  const {categoryId} = props?.route?.params || props || {};
  const listCategories = useSelector<AppStoreState>(
    state => state?.categories?.data ?? [],
  ) as ICategory[];
  const thisCateogry = find(listCategories, item => item?.id === categoryId);
  const {name, machines = []} = thisCateogry || {};

  const onUpdateCategoryMachines = (value: any) => {
    const clone = {...thisCateogry, machines: value};
    dispatch(crudCategoryAction(EDIT_CATEGORY, clone as any));
  };

  const onAddNewItem = () => {
    const cloneMachines = [...machines, {id: StringUtils.getUniqueID()}];
    onUpdateCategoryMachines(cloneMachines);
  };

  const onRemoveItem = (idToRemove: string) => {
    const cloneMachines = filter(machines, i => i?.id !== idToRemove);
    onUpdateCategoryMachines(cloneMachines);
  };

  const onUpdateItemItem = (itemToUpdate: any) => {
    const updatedMachines = map(machines, i =>
      i?.id === itemToUpdate?.id ? itemToUpdate : i,
    );
    console.log(
      '🚀 ~ file: CategoryDetail.tsx ~ line 156 ~ onUpdateItemItem ~ updatedMachines',
      updatedMachines,
    );
    onUpdateCategoryMachines(updatedMachines);
  };

  const renderMachineItem = ({item}: any) => {
    return (
      <MachineItem
        onUpdate={onUpdateItemItem}
        onRemove={() => onRemoveItem(item?.id)}
        machine={item}
        category={thisCateogry}
      />
    );
  };

  return (
    <KeyboardAvoidingView style={[{flex: 1, padding: AppSizes.paddingMedium}]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: AppFonts.h2, fontWeight: '600'}}>{name}</Text>
        <Button onPress={() => onAddNewItem()}>ADD NEW ITEM</Button>
      </View>
      <FlatList
        listKey={props?.listKey}
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}
        keyExtractor={({item, index}) => `${item?.id}_${index}`}
        data={machines}
        renderItem={renderMachineItem}
        ListFooterComponent={
          showFooter ? (
            <View style={{height: 200 + heightKeyboard}} />
          ) : undefined
        }
      />
    </KeyboardAvoidingView>
  );
};

export default CategoryDetail;
