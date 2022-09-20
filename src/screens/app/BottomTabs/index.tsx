import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Home from '@src/screens/app/BottomTabs/Home';
import MapTabs from '@src/screens/app/BottomTabs/MapTabs/';
import ProfileStack from '@src/screens/app/BottomTabs/ProfileStack';
import { AppStackParamList, BottomTabParamList } from '@src/types/navigation';
import React from 'react';

type Props = NativeStackScreenProps<AppStackParamList, 'BottomTabs'>;

const Stack = createBottomTabNavigator<BottomTabParamList>();

const BottomTabs = (props: Props) => {
  return (
    <Stack.Navigator initialRouteName="MapTabs">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Camera',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="camera-reverse-outline" size={30} color={color} />
          ),
        }}
      />
      <Stack.Screen
        name="MapTabs"
        component={MapTabs}
        options={{
          headerShown: false,
          title: 'Map',
          tabBarIcon: ({ color }) => (
            <Ionicons name="location-sharp" size={30} color={color} />
          ),
        }}
      />
      <Stack.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          headerShown: false,
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={30} color={color} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default BottomTabs;
