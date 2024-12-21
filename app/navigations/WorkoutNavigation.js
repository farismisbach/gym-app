import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import WorkoutDetailScreen from '../screens/WorkoutDetailScreen';
import WorkoutScreen from '../screens/WorkoutScreen';

const WorkoutNavigation = () => {
    return (  
    <Stack.Navigator initialRouteName='WorkoutScreen' screenOptions={{headerShown: false,}}>
        <Stack.Screen name="WorkoutScreen" component={WorkoutScreen} />
        <Stack.Screen name="WorkoutDetailScreen" component={WorkoutDetailScreen} />
    </Stack.Navigator>
    )
  }
  
  export default WorkoutNavigation