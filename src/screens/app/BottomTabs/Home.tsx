import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppDispatch } from '@src/store';
import { setToast } from '@src/store/slices/uiSlice';
import { setCurrentLocation, uploadImage } from '@src/store/slices/userSlice';
import { BottomTabParamList } from '@src/types/navigation';
import { Camera, CameraType } from 'expo-camera';
import { manipulateAsync } from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import {
  Button,
  Center,
  Checkbox,
  HStack,
  Heading,
  Text,
  VStack,
} from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { AppState, ImageBackground, Linking, Pressable } from 'react-native';
import MapView from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const [locationPermission, setLocationPermission] = useState<boolean | null>(
    null,
  );
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(
    null,
  );
  const isFocused = useIsFocused();
  const [cameraType, setCameraType] = useState<CameraType>(CameraType.back);
  const cameraRef = useRef<Camera>(null);
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

  const checkPermissions = async () => {
    const { status: locationStatus } =
      await Location.requestForegroundPermissionsAsync();
    if (locationStatus === 'granted') {
      setLocationPermission(true);
    } else {
      setLocationPermission(false);
      dispatch(
        setToast({
          title: 'Location permission not granted',
          variant: 'error',
        }),
      );
    }
    const { status: cameraStatus } =
      await ImagePicker.requestCameraPermissionsAsync();
    if (cameraStatus === 'granted') {
      setCameraPermission(true);
      await setLocation();
    } else {
      setCameraPermission(false);
      dispatch(
        setToast({
          title: 'Camera permission not granted',
          variant: 'error',
        }),
      );
    }
  };

  const setLocation = async () => {
    const location = await Location.getCurrentPositionAsync({});
    console.log(location);
    mapRef.current?.animateToRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      ...DELTAS,
    });

    dispatch(
      setCurrentLocation({
        currentLocation: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      }),
    );
    setShare((prev) => ({
      ...prev,
      location: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
    }));
  };

  useEffect(() => {
    // when app mounted check permissions
    checkPermissions();
  }, []);

  useEffect(() => {
    AppState.addEventListener('change', (state) => {
      console.log('App state changed', state);
      if (state === 'active') {
        checkPermissions();
      }
    });
  }, []);

  const onShare = () => {
    dispatch(uploadImage(share));
  };

  // While permissions checking
  const renderLoading = () => {
    return <Text>Loading...</Text>;
  };

  // If user denied a permission or not granted, show a link to settings
  const renderSetPermissions = () => {
    return (
      <Center flex={1}>
        <VStack space={4}>
          <Heading alignSelf="center">Permissions Needed</Heading>
          <Text alignSelf="center">
            To share a photo you need to grant location and camera permissions.
          </Text>
          <Checkbox
            isChecked={!!cameraPermission}
            colorScheme="green"
            value="camera"
            isDisabled={!!cameraPermission}
            onChange={() => {
              if (!cameraPermission) {
                Linking.openSettings();
              }
            }}
            size="md"
          >
            Camera Permission
          </Checkbox>
          <Checkbox
            isChecked={!!locationPermission}
            colorScheme="green"
            value="location"
            onChange={() => {
              if (!locationPermission) {
                Linking.openSettings();
              }
            }}
            size="md"
          >
            Location Permission
          </Checkbox>
        </VStack>
      </Center>
    );
  };

  // change camera type
  const changeCameraType = () => {
    console.log('change camera type', cameraType);
    setCameraType(
      cameraType === CameraType.front ? CameraType.back : CameraType.front,
    );
  };

  // take a photo
  const takePhoto = async () => {
    if (cameraPermission) {
      const photo = await cameraRef.current?.takePictureAsync();
      console.log('photo', photo);
      if (photo) {
        setShare((prev) => ({ ...prev, image: photo.uri }));
      }
    }
  };

  // take picture or pick from gallery
  const renderTakePicture = () => {
    return (
      <Camera
        ref={cameraRef}
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'space-between',
        }}
        type={cameraType}
      >
        <HStack />
        <HStack space={4} alignItems="center" justifyContent="center" p={4}>
          <Pressable onPress={pickImage}>
            <AntDesign name="picture" size={30} color="white" />
          </Pressable>
          <Pressable onPress={takePhoto}>
            <Entypo name="circle" size={65} color="white" />
          </Pressable>
          <Pressable onPress={changeCameraType}>
            <Ionicons name="camera-reverse-outline" size={30} color="white" />
          </Pressable>
        </HStack>
      </Camera>
    );
  };

  // on go back reset image

  const onGoBack = () => {
    setShare((prev) => ({ ...prev, image: '' }));
  };
  // If image is selected, show it and a button to share
  const renderShare = () => {
    return (
      <ImageBackground
        style={{
          marginTop: insets.top,
          width: '100%',
          height: '100%',
        }}
        source={{ uri: share.image }}
      >
        <VStack flex={1} justifyContent="space-between" my={5}>
          <HStack space={4} p={4}>
            <Pressable onPress={onGoBack}>
              <Ionicons name="chevron-back" size={55} color="white" />
            </Pressable>
          </HStack>
          <HStack space={4} alignItems="center" justifyContent="center" p={4}>
            <Button
              leftIcon={<Ionicons name="send" size={35} color="white" />}
              onPress={onShare}
            >
              <Text color="white" fontSize="xl">
                Share
              </Text>
            </Button>
          </HStack>
        </VStack>
      </ImageBackground>
    );
  };
  console.log('share', share);
  return (
    <Center flex={1} bg="black">
      {isFocused && <StatusBar style="light" />}
      {locationPermission === null || cameraPermission === null
        ? renderLoading()
        : locationPermission === false || cameraPermission === false
        ? renderSetPermissions()
        : share.image
        ? renderShare()
        : renderTakePicture()}
    </Center>
  );
};

export default Home;
