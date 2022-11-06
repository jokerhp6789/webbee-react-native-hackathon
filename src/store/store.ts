import {compose, createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
// import { createLogger } from 'redux-logger';
// import storage from 'redux-persist/lib/storage';
// import thunk from "redux-thunk";
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './rootReducer';

const persistConfig = {
  key: 'contruction_machines_management',
  storage: AsyncStorage,
  whitelist: ['metaReducer', 'cartReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Load middleware
// const middleware = [thunk];

const store = createStore(
  persistedReducer,
  undefined,
  // compose(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);

// Infer the `AppState` and `AppDispatch` types from the store itself
export type AppStoreState = ReturnType<typeof store.getState>;
export type AppStoreDispatch = typeof store.dispatch;

export default store;
