import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppDispatch } from '@src/store';
import { setToast } from '@src/store/slices/uiSlice';
import { uploadImage } from '@src/store/slices/userSlice';
import { BottomTabParamList } from '@src/types/navigation';
import { manipulateAsync } from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Button, Center, Icon, Image, Pressable } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';

const DELTAS = {
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

type Props = NativeStackScreenProps<BottomTabParamList, 'Home'>;

export type ShareImageFormData = {
  image: string;
  location: {
    latitude: number;
    longitude: number;
  };
};
const Home = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();

  const mapRef = useRef<MapView>(null);
  const [share, setShare] = useState<ShareImageFormData>({
    image: '',
    location: {
      latitude: 0,
      longitude: 0,
    },
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 0.4,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      if (result.fileSize && result.fileSize > 100000) {
        const resizedImage = await manipulateAsync(
          result.uri,
          [
            {
              resize: {
                width: result.width / 2,
                height: result.height / 2,
              },
            },
          ],
          { compress: 0.5 },
        );
        setShare((prev) => ({ ...prev, image: resizedImage.uri }));
      } else {
        setShare((prev) => ({ ...prev, image: result.uri }));
      }
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        dispatch(
          setToast({
            title: 'Permission to access location was denied',
            variant: 'error',
          }),
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      console.log(location);
      mapRef.current?.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        ...DELTAS,
      });
      setShare((prev) => ({
        ...prev,
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      }));
    })();
  }, []);

  const onShare = () => {
    dispatch(uploadImage(share));
  };

  return (
    <Center py={3} flex={1} px={5}>
      {share.image && (
        <Pressable onPress={pickImage} shadow={4}>
          <Image
            source={{ uri: share.image }}
            alt="image"
            size="xl"
            resizeMode="cover"
            w={300}
            h={300}
          />
        </Pressable>
      )}
      <Button
        my={3}
        leftIcon={<Icon as={AntDesign} name="camerao" size="md" />}
        onPress={pickImage}
      >
        {`${share.image ? 'Change' : 'Upload'} Image`}
      </Button>
      <MapView
        ref={mapRef}
        style={{
          width: 300,
          height: 300,
        }}
        initialRegion={{
          ...share.location,
          ...DELTAS,
        }}
        scrollEnabled={false}
        zoomEnabled={false}
      >
        <Marker
          coordinate={{
            ...share.location,
          }}
        >
          <Center
            w={16}
            h={16}
            background="primary.500"
            borderRadius={100}
            shadow={3}
          >
            <MaterialIcons name="location-history" size={60} color="white" />
          </Center>
        </Marker>
      </MapView>
      <Button
        my={3}
        w={300}
        disabled={
          !share.image || !share.location.latitude || !share.location.longitude
        }
        onPress={onShare}
      >
        Share
      </Button>
    </Center>
  );
};

export default Home;
