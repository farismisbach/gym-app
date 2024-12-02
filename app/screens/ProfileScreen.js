import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const ProfileScreen = ({navigation}) => {
  return (
    <SafeAreaView className='flex-1 bg-[#1E1E1E] items-center'>
        <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
            <Image source={require('../../assets/items/profile.jpg')} className='w-48 h-48'/>
        </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileScreen