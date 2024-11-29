import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const Navbar = ({...props}) => {
  return (
    <View className={`absolute bottom-0 left-0 right-0 flex-row justify-around w-screen h-16 bg-[#000000] rounded-t-2xl`}>
      <TouchableOpacity>
        <Image source={require('../../assets/items/home.png')} className={`w-10 h-10 mt-2`} resizeMode='contain'/>
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={require('../../assets/items/dumble.png')} className={`w-14 h-14`} resizeMode='contain'/>
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={require('../../assets/items/calendar.png')} className={`w-10 h-10 mt-2`} resizeMode='contain'/>
      </TouchableOpacity>
    </View>
  )
}

export default Navbar