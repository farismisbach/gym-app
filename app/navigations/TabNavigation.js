import { View, Image, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import CameraScreen from '../screens/CameraScreen';
import CalendarScreen from '../screens/CalendarScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <NavigationContainer>
        <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({ route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let iconStyle = { 
            width: 30, 
            height: 30,
            opacity: focused ? 1 : 0.6,
          };

          if(route.name === 'HomeScreen') {
            iconName = focused ? require('../../assets/items/home-active.png') : require('../../assets/items/home.png');
          } else if (route.name === 'CameraScreen') {
            iconName = focused ? require('../../assets/items/dumble-active.png') : require('../../assets/items/dumble.png');
            iconStyle = {
              ...iconStyle,
              width: 40,
              height: 40,
              backgroundColor: focused ? '#CCFF00' : 'transparent',
              borderRadius: 20,
              padding: 8,
              marginTop: 10,
            };
          } else if (route.name === 'ProfileScreen') {
            iconName = focused ? require('../../assets/items/profile_tab_active.png') : require('../../assets/items/profile_tab.png');
          }  else if (route.name === 'CalenderScreen') {
            iconName = focused ? require('../../assets/items/calendar-active.png') : require('../../assets/items/calendar.png');
          }

          return (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: route.name === 'CameraScreen' ? 0 : 12,
            }}>
              <Image 
                source={iconName} 
                style={iconStyle} 
                resizeMode='contain'
              />
              {focused && route.name !== 'CameraScreen' && (
                <View 
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: '#CCFF00',
                    marginTop: 4
                  }}
                />
              )}
            </View>
          )
        },
        headerShown: false,
        tabBarLabel: () => null,
        tabBarStyle: { 
          backgroundColor: '#000000',
          height: 80,
          borderTopWidth: 0,
          elevation: 0,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          paddingHorizontal: 16,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        tabBarItemStyle: {
          paddingBottom: 8,
        },
      })}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tab.Screen name="CalenderScreen" component={CalendarScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
    </Tab.Navigator>
    </NavigationContainer>
  )
}

export default TabNavigation