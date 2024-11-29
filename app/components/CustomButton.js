import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({mode, title, ...props}) => {
  return (
    <TouchableOpacity 
    className={`w-1/2 h-14 rounded-xl justify-center items-center ${mode === "contained" ? "bg-[#666666]" : ""} ${mode === "outlined" ? "bg-transparent border-2 border-[#666666]" : ""}`}
    {...props}
    >
        <Text className ={`font-poppins-bold text-xl ${mode === "contained" ? "text-[#FAFAFA]" : "text-[#666666]"}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton