import { Button, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, {useEffect, useState, useRef} from 'react'
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import BackButton from '../components/BackButton';
import * as MediaLibrary from 'expo-media-library'

const CameraScreen = ({navigation}) => {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View className='flex-1 justify-center items-center'>
        <Text className='font-poppins-bold text-center pb-2.5'>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View className='flex-1 justify-center h-full w-full bg-[#000000]'>
      <CameraView className='flex-1 h-full w-full' facing={facing}>
        <View className='items-center bg-transparent py-96'>
          <TouchableOpacity className='absolute top-5' onPress={toggleCameraFacing}>
            <Image source={require('../../assets/items/flip.png')}/>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={navigation.goBack} className='items-center mb-5'>
          <Image source={require('../../assets/items/home.png')}/>
        </TouchableOpacity>
      </CameraView>
    </View>
  );
}

export default CameraScreen