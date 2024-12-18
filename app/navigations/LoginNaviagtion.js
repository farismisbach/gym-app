import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import LoginScreens from '../screens/LoginScreen';
import StartScreen from '../screens/StartScreen';

const LoginNaviagtion = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='StartScreen' screenOptions={{headerShown: false,}}>
            <Stack.Screen name="StartScreen" component={StartScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreens} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default LoginNaviagtion