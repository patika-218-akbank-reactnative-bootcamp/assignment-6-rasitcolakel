import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '@src/types/navigation';
import { Heading } from 'native-base';
import React from 'react';

type Props = NativeStackScreenProps<ProfileStackParamList, 'EditProfile'>;
const EditProfile = ({ route }: Props) => {
  return <Heading>Edit Profile</Heading>;
};
export default EditProfile;
