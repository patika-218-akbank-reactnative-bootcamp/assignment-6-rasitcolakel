import { NavigatorScreenParams } from '@react-navigation/native';
import { UserType } from '@src/store/slices/userSlice';

export type RootStackParamList = {
  app: NavigatorScreenParams<AppStackParamList>;
  auth: NavigatorScreenParams<AuthStackParamList>;
};
export type AppStackParamList = {
  BottomTabs: NavigatorScreenParams<BottomTabParamList>;
};

export type BottomTabParamList = {
  Home: undefined;
  MapTabs: NavigatorScreenParams<MapTabParamList>;
  ProfileStack: NavigatorScreenParams<ProfileStackParamList>;
};
export type MapTabParamList = {
  Map: undefined;
  UserDetail: { user: UserType } | undefined;
};
export type ProfileStackParamList = {
  Profile: undefined;
  EditProfile: undefined;
  Settings: undefined;
};
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};
