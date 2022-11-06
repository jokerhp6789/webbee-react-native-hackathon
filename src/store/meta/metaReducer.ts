export interface IMetaReducer {}

// Set initial state
const initialState: IMetaReducer = {};

export default function metaReducer(
  state = initialState,
  action: any,
): IMetaReducer {
  switch (action.type) {
    // case UPDATE_ID_UNREAD_NOTI:
    //   return {
    //     ...state,
    //     notification: {
    //       ...(state?.notification ?? {}),
    //       readIds: action.data,
    //     },
    //   };
    default:
      return state;
  }
}
