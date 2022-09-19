import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  app: NavigatorScreenParams<AppStackParamList>;
  auth: NavigatorScreenParams<AuthStackParamList>;
};
export type AppStackParamList = {
  BottomTabs: NavigatorScreenParams<BottomTabParamList>;
};
export type BottomTabParamList = {
  Home: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};
