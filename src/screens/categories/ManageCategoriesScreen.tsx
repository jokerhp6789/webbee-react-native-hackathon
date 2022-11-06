import {map} from 'lodash';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../components/button/Button';
import Card from '../../components/card/Card';
import useKeyBoard from '../../hooks/useKeyboard';
import {ICategory} from '../../interface/categories';
import {crudCategoryAction} from '../../store/categories/categoriesAction';
import {ADD_CATEGORY} from '../../store/categories/categoriesConstant';
import {AppStoreState} from '../../store/store';
import AppSizes from '../../style/AppSizes';
import CategoryCard from './content/CategoryCard';

export interface IManageCategoriesScreenProps {
  [key: string]: any;
}

const ManageCategoriesScreen: React.FC<IManageCategoriesScreenProps> = ({}) => {
  const allCategories: Array<ICategory> = useSelector<AppStoreState>(
    state => state?.categories?.data ?? [],
  ) as any;
  const dispatch = useDispatch();
  const {heightKeyboard} = useKeyBoard();

  return (
    <KeyboardAvoidingView
      style={{
        padding: AppSizes.paddingMedium,
        height: AppSizes.screenHeight,
        flex: 1,
      }}>
      <ScrollView>
        {map(allCategories, (item, index) => {
          return (
            <CategoryCard
              style={{marginTop: AppSizes.paddingMedium}}
              category={item}
              key={`${item?.id}_${index}`}
            />
          );
        })}
        <View style={{height: heightKeyboard + 200}} />
      </ScrollView>
      <Button
        style={[
          {
            position: 'absolute',
            bottom: 20,
            right: AppSizes.paddingMedium,
            left: AppSizes.paddingMedium,
          },
        ]}
        onPress={() => {
          dispatch(crudCategoryAction(ADD_CATEGORY));
        }}>
        ADD NEW CATEGORY
      </Button>
    </KeyboardAvoidingView>
  );
};

export default ManageCategoriesScreen;
