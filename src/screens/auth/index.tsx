import { createStackNavigator } from '@react-navigation/stack';
import Login from '@src/screens/auth/Login';
import Register from '@src/screens/auth/Register';
import { AuthStackParamList } from '@src/types/navigation';
import React from 'react';

const Stack = createStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}
