import { createStackNavigator } from '@react-navigation/stack';
import BottomTabs from '@src/screens/app/BottomTabs';
import { AppStackParamList } from '@src/types/navigation';
import React from 'react';

const Stack = createStackNavigator<AppStackParamList>();

export default function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
    </Stack.Navigator>
  );
}
