import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font'
import * as SecureStore from 'expo-secure-store'
import "./global.css";

import TabNavigation from './app/navigations/TabNavigation';
import LoginNaviagtion from './app/navigations/LoginNaviagtion';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
SplashScreen.preventAutoHideAsync();

const tokenCache = {
  async getToken(key) {
    try {
      const item = await SecureStore.getItemAsync(key)
      if (item) {
        console.log(`${key} was used 🔐 \n`)
      } else {
        console.log('No values stored under key: ' + key)
      }
      return item
    } catch (error) {
      console.error('SecureStore get item error: ', error)
      await SecureStore.deleteItemAsync(key)
      return null
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  },
}

export default function App() {

  const [loaded, error] = useFonts({
    'Poppins-Regular': require("./assets/fonts/Poppins-Regular.ttf"),
    'Poppins-Bold': require("./assets/fonts/Poppins-Bold.ttf"),
    'Poppins-SemiBold': require("./assets/fonts/Poppins-SemiBold.ttf"),
    'Poppins-Medium': require("./assets/fonts/Poppins-Medium.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return(
    <ClerkProvider publishableKey='pk_test_YWJvdmUtbGFjZXdpbmctNjEuY2xlcmsuYWNjb3VudHMuZGV2JA' tokenCache={tokenCache}>
      <View className='flex-1'>
        <SignedIn>
          <TabNavigation/>
        </SignedIn>
        <SignedOut>
          <LoginNaviagtion/>
        </SignedOut>
      </View>
    </ClerkProvider>
  );
}