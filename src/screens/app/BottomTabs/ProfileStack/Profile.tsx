import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppSelector } from '@src/store';
import {
  BottomTabParamList,
  HomeScreenType,
  ProfileStackParamList,
} from '@src/types/navigation';
import CachedImage from 'expo-cached-image';
import { Button, Center, Heading, Text } from 'native-base';
import React from 'react';

type Props = CompositeScreenProps<
  NativeStackScreenProps<ProfileStackParamList, 'Profile'>,
  NativeStackScreenProps<BottomTabParamList, 'ProfileStack'>
>;
const Profile = ({ navigation }: Props) => {
  const user = useAppSelector((state) => state.user.user);
  const fullName = (user?.firstName || '') + ' ' + (user?.lastName || '');

  return (
    <Center py={2}>
      <Center
        justifyContent="center"
        alignItems="center"
        bg="primary.100"
        w={40}
        h={40}
        borderRadius={20}
      >
        {user?.userImage && (
          <CachedImage
            style={{ height: undefined, width: 40, aspectRatio: 1 }}
            source={{ uri: user?.userImage }}
            cacheKey={user?.userImage}
            resizeMode="stretch"
          />
        )}
      </Center>
      <Button variant="ghost">
        <Text color="primary.500">Change Profile Photo</Text>
      </Button>
      <Heading>{fullName}</Heading>
    </Center>
  );
};
export default Profile;
