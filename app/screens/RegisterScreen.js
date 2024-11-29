import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { emailValidator } from '../validator/emailValidator'
import { passwordValidator } from '../validator/passwordValidator'
import { nameValidator } from '../validator/nameValidator'
import CustomButton from '../components/CustomButton'
import BackButton from '../components/BackButton'
import TextInput from '../components/TextInput'

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState({ value: "", error: "" });
    const [email, setEmail] = useState({ value: "", error: "" });
    const [password, setPassword] = useState({ value: "", error: "" })
    
    const onSignUpPressed = () => {
        const nameError = nameValidator(name.value);
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);
        if (emailError || passwordError || nameError) {
            setName({ ...name, error: nameError });
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
            <View className="bg-[#1A1A1A] h-full w-full">
                {/* Header Section */}
                <View className="w-full p-4">
                    <TouchableOpacity 
                        onPress={navigation.goBack}
                        className="w-10 h-10 bg-[#2A2A2A] rounded-full justify-center items-center"
                    >
                        <Text className="text-[#E5FF00] text-2xl">&larr;</Text>
                    </TouchableOpacity>
                </View>

                {/* Main Content Container */}
                <View className="flex-1 px-6 pt-8">
                    {/* Title Section */}
                    <View className="mb-8">
                        <Text className="text-[#FFFFFF] text-4xl font-bold">Create Account</Text>
                        <Text className="text-[#888888] text-lg mt-2">Let's get you started</Text>
                    </View>

                    {/* Input Fields Section */}
                    <View className="space-y-6">
                        <View>
                            <Text className="text-white text-base">Username</Text>
                            <TextInput
                                returnKeyType="next"
                                value={name.value}
                                onChangeText={(text) => setName({ value: text, error: "" })}
                                error={!!name.error}
                                errorText={name.error}
                                className="bg-[#FFFFFF] text-black rounded-xl"
                                style={{
                                    paddingVertical: 9,
                                    paddingHorizontal: 16,
                                    fontSize: 16,
                                    height: 48
                                }}
                            />
                        </View>

                        <View>
                            <Text className="text-white text-base">Email</Text>
                            <TextInput
                                returnKeyType="next"
                                value={email.value}
                                onChangeText={(text) => setEmail({ value: text, error: "" })}
                                error={!!email.error}
                                errorText={email.error}
                                autoCapitalize="none"
                                autoCompleteType="email"
                                textContentType="emailAddress"
                                keyboardType="email-address"
                                className="bg-[#FFFFFF] text-black rounded-xl"
                                style={{
                                    paddingVertical: 9,
                                    paddingHorizontal: 16,
                                    fontSize: 16,
                                    height: 48
                                }}
                            />
                        </View>
                        
                        <View>
                            <Text className="text-white text-base">Password</Text>
                            <TextInput
                                returnKeyType="done"
                                value={password.value}
                                onChangeText={(text) => setPassword({ value: text, error: "" })}
                                error={!!password.error}
                                errorText={password.error}
                                secureTextEntry
                                className="bg-[#FFFFFF] text-black rounded-xl"
                                style={{
                                    paddingVertical: 9,
                                    paddingHorizontal: 16,
                                    fontSize: 16,
                                    height: 48
                                }}
                            />
                        </View>
                    </View>

                    {/* Sign Up Button */}
                    <View className="items-center mt-5">
                        <TouchableOpacity 
                            onPress={onSignUpPressed}
                            className="bg-[#4ADE80] w-full rounded-xl py-4 items-center"
                        >
                            <Text className="text-[#1A1A1A] font-bold text-lg">Create Account</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Social Login Section */}
                    <View className="items-center mt-10">
                        <Text className="text-[#888888] mb-6">or continue with</Text>
                        <View className="flex-row space-x-6">
                            <TouchableOpacity className="w-14 h-14 bg-[#2A2A2A] rounded-full items-center justify-center">
                                <Image source={require("../../assets/items/ggl.png")} className="w-8 h-8" resizeMode="contain"/>
                            </TouchableOpacity>
                            <TouchableOpacity className="w-14 h-14 bg-[#2A2A2A] rounded-full items-center justify-center">
                                <Image source={require("../../assets/items/fb.png")} className="w-8 h-8" resizeMode="contain"/>
                            </TouchableOpacity>
                            <TouchableOpacity className="w-14 h-14 bg-[#2A2A2A] rounded-full items-center justify-center">
                                <Image source={require("../../assets/items/apple.png")} className="w-8 h-8" resizeMode="contain"/>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Login Link */}
                    <View className="flex-row justify-center mt-10">
                        <Text className="text-[#888888]">Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
                            <Text className="text-[#E5FF00] font-semibold">Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default RegisterScreen