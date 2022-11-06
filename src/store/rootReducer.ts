import {combineReducers} from 'redux';
import metadata from './meta/metaReducer';
import categories from './categories/categoryReducer';

const appReducer = combineReducers({metadata, categories});

const rootReducer = (state: any, action: any) => appReducer(state, action);

export default rootReducer;
