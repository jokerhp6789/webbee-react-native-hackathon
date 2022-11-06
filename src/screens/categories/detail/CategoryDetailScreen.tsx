import React from 'react';
import CategoryDetail from './content/CategoryDetail';

export interface ICategoryDetailScreenProps {
  categoryId: string;
}

const CategoryDetailScreen: React.FC<ICategoryDetailScreenProps> = ({
  categoryId,
}) => {
  return <CategoryDetail categoryId={categoryId} />;
};

export default CategoryDetailScreen;
