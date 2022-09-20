import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import EditProfile from '@src/screens/app/BottomTabs/ProfileStack/EditProfile';
import Profile from '@src/screens/app/BottomTabs/ProfileStack/Profile';
import Settings from '@src/screens/app/BottomTabs/ProfileStack/Settings';
import {
  BottomTabParamList,
  ProfileStackParamList,
} from '@src/types/navigation';
import React from 'react';

type Props = NativeStackScreenProps<BottomTabParamList, 'ProfileStack'>;

const Stack = createStackNavigator<ProfileStackParamList>();

const ProfileStack = (props: Props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
