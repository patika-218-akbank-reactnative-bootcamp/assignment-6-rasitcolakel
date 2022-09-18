import { NavigationContainer } from '@react-navigation/native';
import AuthStack from '@src/screens/auth';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import 'react-native-gesture-handler';

export default function App() {
  return (
    // We are using NativeBaseProvider to provide the theme to all the components
    <NativeBaseProvider>
      {/* NavigationContainer is the root of our navigation tree */}
      <NavigationContainer>
        {/* AuthStack is the root stack of our application */}
        <AuthStack />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
