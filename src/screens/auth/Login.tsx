import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomFormControl from '@src/components/CustomFormControl';
import { useAppDispatch } from '@src/store';
import { login } from '@src/store/slices/userSlice';
import { AuthStackParamList } from '@src/types/navigation';
import {
  Box,
  Button,
  Center,
  Heading,
  Input,
  KeyboardAvoidingView,
  Link,
  ScrollView,
  useColorMode,
} from 'native-base';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Platform } from 'react-native';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export type LoginForm = {
  email: string;
  password: string;
};

const Login = ({ navigation }: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginForm>();

  const dispatch = useAppDispatch();
  const onSubmit = async (data: LoginForm) => {
    await dispatch(login(data));
  };

  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        bg={isDark ? 'black' : 'white'}
        flex={1}
      >
        <Center flex={1}>
          <Box
            background={isDark ? 'gray.900' : 'coolGray.100'}
            _text={{
              color: 'white',
              fontWeight: 'bold',
            }}
            shadow={5}
            p={2}
            borderRadius={5}
            w={80}
          >
            <Heading size="lg" py={4} textAlign="center" color="primary.500">
              Login
            </Heading>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomFormControl error={errors.email}>
                  <Input
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </CustomFormControl>
              )}
              name="email"
              rules={{
                required: {
                  value: true,
                  message: 'Email is required',
                },
              }}
              defaultValue=""
            />
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomFormControl error={errors.password}>
                  <Input
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    placeholder="Password"
                    keyboardType="default"
                    autoCapitalize="none"
                    type="password"
                  />
                </CustomFormControl>
              )}
              name="password"
              rules={{
                required: {
                  value: true,
                  message: 'Password is required',
                },
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              }}
              defaultValue=""
            />

            <Button my={2} onPress={handleSubmit(onSubmit)}>
              Sign In
            </Button>
            <Link
              my={1}
              _text={{
                color: 'primary.500',
              }}
              onPress={() => navigation.navigate('Register')}
              alignSelf="center"
            >
              Don't have an account? Register
            </Link>
          </Box>
        </Center>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Login;
