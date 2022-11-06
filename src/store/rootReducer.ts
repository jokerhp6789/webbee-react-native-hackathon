import {combineReducers} from 'redux';

// import refresh from "./refresh";
import metadata from './meta/metaReducer';
// import serverdata from "./serverdata";

const appReducer = combineReducers({metadata});

const rootReducer = (state: any, action: any) => appReducer(state, action);

export default rootReducer;
