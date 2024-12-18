import { View, Text, TouchableOpacity, Image, Dimensions, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import * as WebBrowser from 'expo-web-browser'
import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import { SafeAreaView } from 'react-native-safe-area-context'
import { emailValidator } from '../validator/emailValidator'
import { passwordValidator } from '../validator/passwordValidator'
import CustomButton from '../components/CustomButton'
import BackButton from '../components/BackButton'
import TextInput from '../components/TextInput'

const { width, height } = Dimensions.get('window');

export const useWarmUpBrowser = () => {
    React.useEffect(() => {
      // Warm up the android browser to improve UX
      // https://docs.expo.dev/guides/authentication/#improving-user-experience
      void WebBrowser.warmUpAsync()
      return () => {
        void WebBrowser.coolDownAsync()
      }
    }, [])
  }
  
  WebBrowser.maybeCompleteAuthSession()

const LoginScreens = ({ navigation }) => {
    const [email, setEmail] = useState({ value: "", error: "" });
    const [password, setPassword] = useState({ value: "", error: "" })

    useWarmUpBrowser()

    const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

    const onPress = React.useCallback(async () => {
        try {
          const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
            redirectUrl: Linking.createURL('/dashboard', { scheme: 'myapp' }),
          })
    
          if (createdSessionId) {
            setActive({ session: createdSessionId })
          } else {
            // Use signIn or signUp for next steps such as MFA
          }
        } catch (err) {
          console.error('OAuth error', err)
        }
      }, [])
    
    const onLoginPressed = () => {
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);
        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            return;
        }
        navigation.reset({
            index: 0,
            routes: [{ name: "MainTabs" }],
        });
    }    

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground source={require('../../assets/items/startingWallpaper.jpeg')} className='w-full h-full' resizeMode='cover'>
                <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
                    <View className='absolute bottom-0 w-full h-1/2 bg-[#1E1E1E] rounded-t-3xl items-center justify-center'>
                        <View className="absolute top-16">
                            <Text className="text-[#FFFFFF] text-4xl font-bold text-center">Welcome</Text>
                            <Text className="text-[#888888] text-lg mt-2 text-center">Let's get you logged in</Text>
                        </View>
                        <TouchableOpacity className='flex-row w-3/5 h-14 bg-white rounded-xl items-center justify-center mt-14' onPress={onPress}>
                            <Image source={require("../../assets/items/ggl.png")} className='w-10 h-10'/>
                            <Text className='text-lg text-gray-500 font-semibold ml-4'>Sign in with Google</Text>
                        </TouchableOpacity>
                    </View>
                </View>    
            </ImageBackground>
        </SafeAreaView>
    )
}

export default LoginScreens