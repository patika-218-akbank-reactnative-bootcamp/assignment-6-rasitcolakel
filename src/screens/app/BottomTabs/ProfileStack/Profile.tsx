import { AntDesign, Ionicons } from '@expo/vector-icons';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '@src/store';
import { changeImage } from '@src/store/slices/userSlice';
import {
  BottomTabParamList,
  ProfileStackParamList,
} from '@src/types/navigation';
import CachedImage from 'expo-cached-image';
import { manipulateAsync } from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import {
  Actionsheet,
  Button,
  Center,
  Heading,
  Image,
  Text,
  useDisclose,
} from 'native-base';
import React from 'react';

export const removeSpecialCharacters = (str: string) => {
  return str.replace(/[^a-z0-9]/gi, '');
};

type Props = CompositeScreenProps<
  NativeStackScreenProps<ProfileStackParamList, 'Profile'>,
  NativeStackScreenProps<BottomTabParamList, 'ProfileStack'>
>;
const Profile = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const { userImage } = useAppSelector((state) => state.user.user);
  const fullName = (user?.firstName || '') + ' ' + (user?.lastName || '');
  const { isOpen, onOpen, onClose } = useDisclose();

  // pickImage
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
        dispatch(changeImage(resizedImage.uri));
        onClose();
      } else {
        dispatch(changeImage(result.uri));
        onClose();
      }
    }
  };

  const takePicture = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    if (!result.cancelled) {
      dispatch(changeImage(result.uri));
      onClose();
    }
  };
  console.log('user?.userImage', user?.userImage);
  return (
    <Center py={2}>
      <Center
        justifyContent="center"
        alignItems="center"
        bg="primary.100"
        w={40}
        h={40}
        borderRadius={100}
        shadow={2}
      >
        {userImage && (
          <Image
            borderRadius={100}
            style={{ height: undefined, width: '100%', aspectRatio: 1 }}
            source={{
              uri: userImage,
            }}
            resizeMode="stretch"
            alt="User Image"
          />
        )}
      </Center>
      <Button variant="ghost" onPress={onOpen}>
        <Text color="primary.500">Change Profile Photo</Text>
      </Button>
      <Actionsheet isOpen={isOpen} onClose={onClose} collapsable>
        <Actionsheet.Content alignItems="center">
          <Actionsheet.Item
            leftIcon={
              <Ionicons name="camera-reverse-outline" size={30} color="black" />
            }
            onPress={takePicture}
          >
            Take a Picture
          </Actionsheet.Item>
          <Actionsheet.Item
            leftIcon={<AntDesign name="picture" size={30} color="black" />}
            onPress={pickImage}
          >
            Pick from Library
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
      <Heading>{fullName}</Heading>
    </Center>
  );
};
export default Profile;
