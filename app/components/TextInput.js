import { View, Text, TextInput as Input } from 'react-native'
import React from 'react'

const TextInput = ({ label, errorText, description, ...props }) => {
  return (
    <View className={`my-2.5`}>
        {label && <Text className={`text-lg font-poppins-semibold text-[#000000]`}>{label}</Text>}
      <Input className={`bg-[#CCCCCC] rounded-md border-2 border-[#666666] text-lg text-[#000000] font-poppins-regular py-2 px-5`} placeholderTextColor={"#333333"} underlineColorAndroid={"transparent"} {...props}/>
      {description && !errorText ? (
        <Text className={`text-xs text-[#000000]`}>{description}</Text>
      ): null}
      {errorText ? <Text className={`text-xs text-[#E63946]`}>{errorText}</Text> : null}
    </View>
  )
}

export default TextInput