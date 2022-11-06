/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

// import { ToastProvider } from "react-native-toast-notifications";
import {PersistGate} from 'redux-persist/integration/react';
import * as React from 'react';
import {StatusBar, Linking} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Routes from './navigation/Routes';
import {Provider} from 'react-redux';
import store, {persistor} from './store/store';

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" translucent />
      <SafeAreaView style={{flex: 1}} edges={['top']}>
        <Routes />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const AppWithStore = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};
export default AppWithStore;
