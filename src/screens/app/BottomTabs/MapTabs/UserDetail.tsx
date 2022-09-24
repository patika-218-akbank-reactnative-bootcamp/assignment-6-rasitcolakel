import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { removeSpecialCharacters } from '@src/screens/app/BottomTabs/MapTabs/Map';
import { MapTabParamList } from '@src/types/navigation';
import CachedImage from 'expo-cached-image';
import { Center, Heading, View } from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';

type Props = NativeStackScreenProps<MapTabParamList, 'UserDetail'>;
const { width } = Dimensions.get('window');
const UserDetail = ({ route }: Props) => {
  const user = route.params?.user;
  console.log('user', user);
  if (!user) return null;

  return (
    <Center justifyContent="center" flex="1">
      <Heading pb={2}>{user.displayName}</Heading>
      <View mx={2}>
        <CachedImage
          style={{
            height: '80%',
            width: width * 0.9,
            borderRadius: 10,
          }}
          source={{ uri: user.photoURL }}
          cacheKey={removeSpecialCharacters(user.photoURL)}
        />
      </View>
    </Center>
  );
};
export default UserDetail;
