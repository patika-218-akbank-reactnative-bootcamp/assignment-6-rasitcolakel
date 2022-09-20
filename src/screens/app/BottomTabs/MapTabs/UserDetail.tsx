import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { removeSpecialCharacters } from '@src/screens/app/BottomTabs/MapTabs/Map';
import { MapTabParamList } from '@src/types/navigation';
import CachedImage from 'expo-cached-image';
import { Center, Heading } from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';

type Props = NativeStackScreenProps<MapTabParamList, 'UserDetail'>;
const { width } = Dimensions.get('window');
const UserDetail = ({ route }: Props) => {
  const { user } = route.params;
  if (!user) return null;

  return (
    <Center justifyContent="center" flex="1">
      <Heading>{(user.firstName || '') + ' ' + (user.lastName || '')}</Heading>
      <CachedImage
        style={{ height: undefined, width, aspectRatio: 1 }}
        source={{ uri: user.photoURL }}
        cacheKey={removeSpecialCharacters(user.photoURL)}
        resizeMode="stretch"
      />
    </Center>
  );
};
export default UserDetail;
