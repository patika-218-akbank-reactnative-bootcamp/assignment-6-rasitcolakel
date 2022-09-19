import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabParamList } from '@src/types/navigation';
import React from 'react';
import { Text, View } from 'react-native';

type Props = NativeStackScreenProps<BottomTabParamList, 'Home'>;

const Home = ({ navigation }: Props) => {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;
