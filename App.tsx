import CustomToast from '@src/components/CustomToast';
import Navigation from '@src/screens';
import store from '@src/store';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { LogBox } from 'react-native';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';

LogBox.ignoreLogs(['firebase', 'AsyncStorage has been extracted']);

export default function App() {
  return (
    // We are using NativeBaseProvider to provide the theme to all the components
    <NativeBaseProvider>
      <Provider store={store}>
        {/* CustomToast is  */}
        <CustomToast />
        {/* NavigationContainer is the root of our navigation tree */}
        <Navigation />
      </Provider>
    </NativeBaseProvider>
  );
}
