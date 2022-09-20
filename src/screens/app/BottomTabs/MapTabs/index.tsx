import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import Map from '@src/screens/app/BottomTabs/MapTabs/Map';
import UserDetail from '@src/screens/app/BottomTabs/MapTabs/UserDetail';
import { BottomTabParamList, MapTabParamList } from '@src/types/navigation';
import React from 'react';

type Props = NativeStackScreenProps<BottomTabParamList, 'MapTabs'>;

const Stack = createNativeStackNavigator<MapTabParamList>();

const MapTabs = (props: Props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen
        name="UserDetail"
        component={UserDetail}
        options={{
          title: 'See Profile',
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default MapTabs;
