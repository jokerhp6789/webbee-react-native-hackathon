import {ICategory} from './../../interface/categories';
import {
  ADD_CATEGORY,
  REMOVE_CATEGORY,
  EDIT_CATEGORY,
} from './categoriesConstant';

export type CategoryActionType =
  | typeof ADD_CATEGORY
  | typeof REMOVE_CATEGORY
  | typeof EDIT_CATEGORY;

export interface ICrudCategoryActionPayload {
  id: string;
  [key: string]: any;
}

export interface ICrudCategoryAction {
  type: CategoryActionType;
  data?: ICrudCategoryActionPayload;
}

export const crudCategoryAction = (
  type: CategoryActionType,
  data?: ICrudCategoryActionPayload,
) => {
  return {
    type,
    data,
  };
};
