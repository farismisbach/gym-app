import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const BackButton = ({goBack, ...props}) => {
  return (
    <TouchableOpacity onPress={goBack} {...props}>
        <Image source={require('../../assets/items/arrow_back.png')} className={`w-10 h-10`} resizeMode='contain'/>
    </TouchableOpacity>
  )
}

export default BackButton