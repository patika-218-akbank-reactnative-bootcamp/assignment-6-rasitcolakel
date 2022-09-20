import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '@src/types/navigation';
import { Heading } from 'native-base';
import React from 'react';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Settings'>;
const Settings = ({ route }: Props) => {
  return <Heading>Settings</Heading>;
};
export default Settings;
