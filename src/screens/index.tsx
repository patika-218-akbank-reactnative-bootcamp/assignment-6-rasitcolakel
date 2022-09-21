import { NavigationContainer } from '@react-navigation/native';
import { auth } from '@src/config/firebase';
import AppStack from '@src/screens/app';
import AuthStack from '@src/screens/auth';
import { useAppDispatch, useAppSelector } from '@src/store';
import { setCurrentLocation, setUser } from '@src/store/slices/userSlice';
import * as Location from 'expo-location';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect } from 'react';

export default function Navigation() {
  const { refreshToken, user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

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
        }
      } else {
        // No user is signed in.
      }
    });
  };
  useEffect(() => {
    // initialize user if there is a user in secure store
    initUser();
  }, []);
  return (
    <NavigationContainer>
      {refreshToken && user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
