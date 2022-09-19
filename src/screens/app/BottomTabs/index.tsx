import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Home from '@src/screens/app/BottomTabs/Home';
import MapTabs from '@src/screens/app/BottomTabs/MapTabs/';
import { AppStackParamList, BottomTabParamList } from '@src/types/navigation';
import React from 'react';

type Props = NativeStackScreenProps<AppStackParamList, 'BottomTabs'>;

const Stack = createBottomTabNavigator<BottomTabParamList>();

const BottomTabs = (props: Props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="MapTabs"
        component={MapTabs}
        options={{
          headerShown: false,
          tabBarStyle: {
            display: 'none',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default BottomTabs;
