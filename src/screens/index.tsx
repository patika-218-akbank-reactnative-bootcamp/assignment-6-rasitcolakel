import { NavigationContainer } from '@react-navigation/native';
import { auth } from '@src/config/firebase';
import AppStack from '@src/screens/app';
import AuthStack from '@src/screens/auth';
import { useAppDispatch, useAppSelector } from '@src/store';
import {
  getCurrentUser,
  setCurrentLocation,
  setUser,
} from '@src/store/slices/userSlice';
import * as Location from 'expo-location';
import * as SecureStore from 'expo-secure-store';
import { StatusBar } from 'expo-status-bar';
import { useColorMode, useTheme } from 'native-base';
import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';

export default function Navigation() {
  const { refreshToken, user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  // app's color scheme
  const colorScheme = useColorScheme();
  // nativeBase's color mode
  const { colorMode, toggleColorMode } = useColorMode();
  const theme = useTheme();
  const setLocation = async () => {
    const { status: locationStatus } =
      await Location.requestForegroundPermissionsAsync();
    if (locationStatus === 'granted') {
      const location = await Location.getCurrentPositionAsync({});
      console.log('locationStatus', location);
      dispatch(
        setCurrentLocation({
          currentLocation: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
        }),
      );
    }
  };
  const initUser = () => {
    auth.onAuthStateChanged(async function (user) {
      if (user) {
        const user = await SecureStore.getItemAsync('user');
        const json = user ? JSON.parse(user) : null;
        if (json) {
          dispatch(setUser(json));
          // set location
          await setLocation();
          await dispatch(getCurrentUser());
        }
      } else {
        // No user is signed in.
      }
    });
  };

  const initTheme = async () => {
    const localTheme = await SecureStore.getItemAsync('theme');
    console.log('localTheme', localTheme, colorMode);
    if (localTheme) {
      if (colorMode !== localTheme) {
        toggleColorMode();
      }
    } else {
      if (colorMode !== colorScheme) {
        toggleColorMode();
      }
    }
  };
  useEffect(() => {
    // initialize user if there is a user in secure store
    initUser();
    // initialize theme if there is a theme in secure store
    initTheme();
  }, []);

  useEffect(() => {
    if (colorMode) {
      SecureStore.setItemAsync('theme', colorMode);
    }
  }, [colorMode]);
  const isDark = colorMode === 'dark';
  return (
    <NavigationContainer
      theme={{
        dark: colorMode === 'dark',
        colors: {
          primary: theme.colors.primary[500],
          background: isDark ? theme.colors.black : theme.colors.white,
          card: isDark ? theme.colors.gray[900] : theme.colors.coolGray[50],
          text: isDark ? theme.colors.white : theme.colors.gray[900],
          border: 'rgb(199, 199, 204)',
          notification: theme.colors.primary[500],
        },
      }}
    >
      <StatusBar style={isDark ? 'light' : 'dark'} />
      {refreshToken && user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
