import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '@src/store';
import { UserType, getUsers } from '@src/store/slices/userSlice';
import { MapTabParamList } from '@src/types/navigation';
import CachedImage from 'expo-cached-image';
import { Center, View } from 'native-base';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<MapTabParamList, 'Map'>;

const removeSpecialCharacters = (str: string) => {
  return str.replace(/[^a-z0-9]/gi, '');
};

const Map = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.user.users);
  const insets = useSafeAreaInsets();
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  console.log(users);
  const renderMarker = (user: UserType) => (
    <Marker
      coordinate={{
        latitude: user.location?.latitude || 0,
        longitude: user.location?.longitude || 0,
      }}
      key={user.id}
    >
      <Center
        w={16}
        h={16}
        background="primary.500"
        borderRadius={100}
        shadow={3}
      >
        {user.photoURL && (
          <CachedImage
            source={{
              uri: user.photoURL,
              expiresIn: 2_628_288,
            }}
            style={{
              width: '85%',
              height: undefined,
              aspectRatio: 1,
              borderRadius: 100,
            }}
            cacheKey={removeSpecialCharacters(user.photoURL)}
            resizeMode="contain"
          />
        )}
      </Center>
    </Marker>
  );
  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        <View>
          <MaterialCommunityIcons
            name="chevron-left"
            size={55}
            style={{
              top: insets.top,
            }}
            onPress={() => navigation.goBack()}
          />
        </View>
        {users && users.map((user) => renderMarker(user))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default Map;
