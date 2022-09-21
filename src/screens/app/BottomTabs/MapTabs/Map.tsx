import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '@src/store';
import { UserType, getUsers } from '@src/store/slices/userSlice';
import { MapTabParamList } from '@src/types/navigation';
import CachedImage from 'expo-cached-image';
import { Box, Center, Text, View, useTheme } from 'native-base';
import React, { useEffect, useRef } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import MapView from 'react-native-map-clustering';
import OriginalMapView, { Marker } from 'react-native-maps';

type Props = NativeStackScreenProps<MapTabParamList, 'Map'>;

const DELTAS = {
  latitudeDelta: 4,
  longitudeDelta: 4.5,
};

export const removeSpecialCharacters = (str: string) => {
  return str.replace(/[^a-z0-9]/gi, '');
};

const Map = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.user.users);
  const user = useAppSelector((state) => state.user.user);
  const currentLocation = useAppSelector(
    (state) => state.user.user?.currentLocation,
  );
  const mapRef = useRef<OriginalMapView>(null);
  const { colors } = useTheme();
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    navigation.addListener('focus', () => {
      console.log('Map screen focused');
      dispatch(getUsers());
    });
  }, [navigation]);

  useEffect(() => {
    if (currentLocation) {
      mapRef?.current?.animateToRegion(
        {
          ...currentLocation,
          ...DELTAS,
        },
        1000,
      );
    }
  }, [currentLocation]);

  const renderMarker = (_user: UserType) => (
    <Marker
      coordinate={{
        latitude: _user.location?.latitude || 0,
        longitude: _user.location?.longitude || 0,
      }}
      key={_user.id + '-' + removeSpecialCharacters(_user.photoURL)}
      onPress={() => {
        navigation.navigate('UserDetail', {
          user: _user,
        });
      }}
    >
      <Center>
        <Center
          w={12}
          h={12}
          background="amber.500"
          borderRadius={100}
          shadow={3}
        >
          {_user.photoURL && (
            <CachedImage
              source={{
                uri: _user.photoURL,
                expiresIn: 2_628_288,
              }}
              style={{
                width: '85%',
                height: undefined,
                aspectRatio: 1,
                borderRadius: 100,
              }}
              cacheKey={removeSpecialCharacters(_user.photoURL)}
              resizeMode="cover"
            />
          )}
        </Center>
        {user?.id === _user.id && (
          <Box background="amber.500" borderRadius={5}>
            <Text color="white" px={3}>
              You
            </Text>
          </Box>
        )}
      </Center>
    </Marker>
  );
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: currentLocation?.latitude || 0,
          longitude: currentLocation?.longitude || 0,
          latitudeDelta: 10,
          longitudeDelta: 15,
        }}
        clusterColor={colors.amber[500]}
      >
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
