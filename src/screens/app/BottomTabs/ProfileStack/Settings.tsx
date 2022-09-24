import { MaterialIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '@src/types/navigation';
import {
  Center,
  HStack,
  Heading,
  Pressable,
  Text,
  VStack,
  useColorMode,
  useTheme,
} from 'native-base';
import React from 'react';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Settings'>;
const Settings = ({ route }: Props) => {
  const theme = useTheme();
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <Center py={2}>
      <Heading>Select a Theme</Heading>
      <HStack pt="5">
        <VStack alignItems="center" px={4}>
          <Text fontSize="xl" pb={4}>
            Light
          </Text>
          <Pressable
            bg="white"
            w="100px"
            h="100px"
            borderColor={colorMode === 'light' ? 'yellow.500' : 'gray.300'}
            borderWidth="5"
            borderRadius="lg"
            alignItems="center"
            justifyContent="center"
            onPress={() => toggleColorMode()}
            disabled={colorMode === 'light'}
          >
            <MaterialIcons
              name="brightness-5"
              size={50}
              color={theme.colors.yellow[500]}
            />
          </Pressable>
        </VStack>
        <VStack alignItems="center" px={4}>
          <Text fontSize="xl" pb={4}>
            Dark
          </Text>
          <Pressable
            bg="black"
            w="100px"
            h="100px"
            borderColor={colorMode === 'dark' ? 'primary.500' : 'gray.300'}
            borderWidth="5"
            borderRadius="lg"
            alignItems="center"
            justifyContent="center"
            onPress={() => toggleColorMode()}
            disabled={colorMode === 'dark'}
          >
            <MaterialIcons
              name="brightness-3"
              size={50}
              color={theme.colors.primary[500]}
            />
          </Pressable>
        </VStack>
      </HStack>
    </Center>
  );
};
export default Settings;
