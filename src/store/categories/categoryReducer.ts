import {filter, map} from 'lodash';
import {ICategory} from '../../interface/categories';
import StringUtils from '../../utils/StringUtils';
import {CategoryActionType, ICrudCategoryAction} from './categoriesAction';
import {
  ADD_CATEGORY,
  EDIT_CATEGORY,
  REMOVE_CATEGORY,
} from './categoriesConstant';

export interface ICategoryReducer {
  data?: ICategory[];
}

// Set initial state
const initialState: ICategoryReducer = {};

export default function categories(
  state = initialState,
  action: ICrudCategoryAction,
): ICategoryReducer {
  switch (action.type) {
    case ADD_CATEGORY:
      return {
        ...state,
        data: [
          ...(state?.data ?? []),
          {
            id: StringUtils.getUniqueID(),
            name: 'New Category',
            created: new Date(),
          },
        ],
      };
    case EDIT_CATEGORY:
      const editData = action?.data;
      const updatedList = map(state?.data ?? [], item =>
        item?.id === editData?.id ? editData : item,
      );
      return {
        ...state,
        data: updatedList,
      };
    case REMOVE_CATEGORY:
      const removeCate = action?.data;

      return {
        ...state,
        data: filter(state?.data ?? [], item => item?.id !== removeCate?.id),
      };
    default:
      return state;
  }
}
