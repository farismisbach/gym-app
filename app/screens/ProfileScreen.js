import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser, useClerk } from '@clerk/clerk-expo';


const ProfileScreen = () => {
  const {user, isLoading} = useUser();
  const passwordLength = user?.password?.length;
  const joinedDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A';
  const { signOut } = useClerk()

  const handleSignOut = async () => {
    try {
      await signOut()
      // Redirect to your desired page
      Linking.openURL(Linking.createURL('/'))
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
    }
  }
  
  return (
    <SafeAreaView className="flex-1 bg-[#1E1E1E] px-6 py-4">
      <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Image
              source={{uri: user?.imageUrl}}
              className="w-12 h-12 rounded-full mr-4"
            />
            <View>
              <Text className="text-[#4ADE80] text-lg font-semibold">{user?.fullName}</Text>
              <Text className="text-[#B2B1A8]">{user?.primaryEmailAddress.emailAddress}</Text>
            </View>
          </View>
        </View>

        {/* Bar Section */}
        <View className="mt-8 bg-[#2A2A2A] rounded-2xl p-4">
          <Text className="text-[#4ADE80] font-semibold text-lg">Weight</Text>
          <View className="flex-row justify-between items-center mt-2">
            <View>
              <Text className="text-[#B2B1A8]">Start</Text>
              <Text className="text-[#4ADE80]">68kg</Text>
            </View>
            <View>
              <Text className="text-[#B2B1A8]">Current</Text>
              <Text className="text-[#4ADE80]">56kg</Text>
            </View>
            <View>
              <Text className="text-[#B2B1A8]">Target</Text>
              <Text className="text-[#4ADE80]">52kg</Text>
            </View>
          </View>
          <View className="h-4 bg-[#4ADE80] rounded-full mt-4" style={{ width: '82%' }} />
        </View>

        {/* Account Info */}
        <View className="mt-8 bg-[#2A2A2A] rounded-2xl p-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-[#4ADE80] font-semibold text-lg">Account</Text>
            <TouchableOpacity>
              <Ionicons name="notifications-outline" size={24} color="#4ADE80" />
            </TouchableOpacity>
          </View>
          <View className="mb-4">
            <Text className="text-[#B2B1A8]">Email</Text>
            <Text className="text-[#4ADE80]">{user?.primaryEmailAddress.emailAddress}</Text>
          </View>
          <View className="mb-4">
            <Text className="text-[#B2B1A8]">Password</Text>
            <Text className="text-[#4ADE80]">{passwordLength || "••••••••"}</Text>
          </View>
          <View>
            <Text className="text-[#B2B1A8]">Joined</Text>
            <Text className="text-[#4ADE80]">{joinedDate}</Text>
          </View>
        </View>

        {/* Sharing and Reviews */}
        <View className="mt-4 bg-[#2A2A2A] rounded-2xl p-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-[#4ADE80] font-semibold text-lg">Sharing & Reviews</Text>
            <TouchableOpacity>
              <Text className="text-[#4ADE80]">Edit</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons name="share-social-outline" size={20} color="#4ADE80" />
              <Text className="text-[#4ADE80] ml-2">Share with friends</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#B2B1A8" />
          </View>
          <View className="flex-row items-center justify-between mt-4">
            <View className="flex-row items-center">
              <Ionicons name="star-outline" size={20} color="#4ADE80" />
              <Text className="text-[#4ADE80] ml-2">Reviews</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#B2B1A8" />
          </View>
        </View>

              {/* Account Actions */}
        <TouchableOpacity className="bg-[#2A2A2A] rounded-2xl p-4 mt-4 mb-24" onPress={handleSignOut}>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons name="log-out-outline" size={20} color="#4ADE80" />
              <Text className="text-[#4ADE80] ml-2">Logout</Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>

    
    
  );
};

export default ProfileScreen;