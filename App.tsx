import { NativeBaseProvider, Text } from 'native-base';
import React from 'react';
import { SafeAreaView } from 'react-native';

export default function App() {
  return (
    <NativeBaseProvider>
      <SafeAreaView>
        <Text>12321</Text>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}
