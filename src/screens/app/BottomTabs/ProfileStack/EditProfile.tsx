import { AntDesign, Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomFormControl from '@src/components/CustomFormControl';
import { useAppDispatch, useAppSelector } from '@src/store';
import { changeImageAndUpdate } from '@src/store/slices/userSlice';
import { ProfileStackParamList } from '@src/types/navigation';
import { manipulateAsync } from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import {
  Actionsheet,
  Button,
  HStack,
  Heading,
  Image,
  Input,
  KeyboardAvoidingView,
  ScrollView,
  VStack,
  useColorMode,
  useDisclose,
  useTheme,
} from 'native-base';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Platform } from 'react-native';

type Props = NativeStackScreenProps<ProfileStackParamList, 'EditProfile'>;

export type EditProfileForm = {
  displayName: string;
  userImage?: string;
};

const Login = ({ navigation }: Props) => {
  const displayName = useAppSelector((state) => state.user.user?.displayName);
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<EditProfileForm>({
    defaultValues: {
      displayName,
      userImage: '',
    },
  });
  const { isOpen, onOpen, onClose } = useDisclose();
  const dispatch = useAppDispatch();
  const onSubmit = async (data: EditProfileForm) => {
    await dispatch(changeImageAndUpdate(data));
  };
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';
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
        setValue('userImage', resizedImage.uri);
        onClose();
      } else {
        setValue('userImage', result.uri);
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

    const result = await ImagePicker.launchCameraAsync({
      aspect: [1, 1],
    });

    if (!result.cancelled) {
      setValue('userImage', result.uri);

      onClose();
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        bg={isDark ? 'black' : 'white'}
        flex={1}
        mx={4}
      >
        <Heading size="lg" py={4} textAlign="center" color="primary.500">
          Edit Your Profile
        </Heading>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomFormControl error={errors.displayName}>
              <Input
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                placeholder="Full Name"
              />
            </CustomFormControl>
          )}
          name="displayName"
          rules={{
            required: {
              value: true,
              message: 'Full name is required',
            },
          }}
          defaultValue=""
        />
        <HStack alignItems="center">
          {getValues('userImage') && (
            <Image
              source={{ uri: getValues('userImage') }}
              alt="User avatar"
              size="sm"
              borderRadius={100}
              alignSelf="center"
              mt={4}
            />
          )}
          <Button
            mx={4}
            flex={1}
            rightIcon={
              <AntDesign
                name="camera"
                size={24}
                color={theme.colors.primary[500]}
              />
            }
            variant="ghost"
            onPress={onOpen}
            height={10}
          >
            {`${getValues('userImage') ? 'Change the' : 'Select a'} Photo`}
          </Button>
          <Actionsheet isOpen={isOpen} onClose={onClose} collapsable>
            <Actionsheet.Content alignItems="center">
              <Actionsheet.Item
                leftIcon={
                  <Ionicons
                    name="camera-reverse-outline"
                    size={30}
                    color={colorMode === 'dark' ? 'white' : 'black'}
                  />
                }
                onPress={takePicture}
              >
                Take a Picture
              </Actionsheet.Item>
              <Actionsheet.Item
                leftIcon={
                  <AntDesign
                    name="picture"
                    size={30}
                    color={colorMode === 'dark' ? 'white' : 'black'}
                  />
                }
                onPress={pickImage}
              >
                Pick from Library
              </Actionsheet.Item>
            </Actionsheet.Content>
          </Actionsheet>
        </HStack>

        <Button my={2} onPress={handleSubmit(onSubmit)}>
          Update
        </Button>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Login;
