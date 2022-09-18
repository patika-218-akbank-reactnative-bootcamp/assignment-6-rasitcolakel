import { NativeStackScreenProps } from '@react-navigation/native-stack';
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
} from 'native-base';
import React from 'react';
import { Platform } from 'react-native';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const Login = ({ navigation }: Props) => {
  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        bg="yellow.50"
        flex={1}
      >
        <Center flex={1}>
          <Box
            bg="white"
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
            <Input my={1} placeholder="Email" />
            <Input my={1} placeholder="Password" />
            <Button my={2}>Proceed</Button>
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
