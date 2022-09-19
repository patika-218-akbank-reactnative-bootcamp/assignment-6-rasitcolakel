import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MapTabParamList } from '@src/types/navigation';
import React from 'react';
import { Text, View } from 'react-native';

type Props = NativeStackScreenProps<MapTabParamList, 'UserDetail'>;

const UserDetail = ({ route }: Props) => {
  return (
    <View>
      <Text>UserDetail</Text>
    </View>
  );
};

export default UserDetail;
