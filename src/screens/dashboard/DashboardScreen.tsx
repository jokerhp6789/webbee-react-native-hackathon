import React from 'react';
import {FlatList, KeyboardAvoidingView, View} from 'react-native';
import {useSelector} from 'react-redux';
import useKeyBoard from '../../hooks/useKeyboard';
import {ICategory} from '../../interface/categories';
import {AppStoreState} from '../../store/store';
import AppSizes from '../../style/AppSizes';
import CategoryDetail from '../categories/detail/content/CategoryDetail';

export interface IDashboardScreenProps {
  [key: string]: any;
}

const DashboardScreen: React.FC<IDashboardScreenProps> = ({}) => {
  const {heightKeyboard} = useKeyBoard();
  const listCategories = useSelector<AppStoreState>(
    state => state?.categories?.data ?? [],
  ) as ICategory[];
  const isTablet = AppSizes.screenwidth > 350;

  const renderCategoryItem = ({item}: any) => {
    return (
      <CategoryDetail
        showFooter={false}
        categoryId={item?.id}
        listKey={item?.id}
      />
    );
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <FlatList
        numColumns={isTablet ? 2 : 1}
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}
        keyExtractor={({item, index}: any) => `${item?.id}_${index}`}
        data={listCategories}
        renderItem={renderCategoryItem}
        ListFooterComponent={<View style={{height: 200 + heightKeyboard}} />}
      />
    </KeyboardAvoidingView>
  );
};

export default DashboardScreen;
