import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {
  return (
    <View className="flex-1 bg-[#1E1E1E] px-6 py-4">
      {/* Profile Header */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Image
            source={require('../../assets/items/profile.jpg')}
            className="w-12 h-12 rounded-full mr-4"
          />
          <View>
            <Text className="text-[#4ADE80] text-lg font-semibold">Justin Wibowo</Text>
            <Text className="text-[#B2B1A8]">@juswe</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="#4ADE80" />
        </TouchableOpacity>
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
          <Text className="text-[#4ADE80]">juswe@example.com</Text>
        </View>
        <View className="mb-4">
          <Text className="text-[#B2B1A8]">Password</Text>
          <Text className="text-[#4ADE80]">••••••••</Text>
        </View>
        <View>
          <Text className="text-[#B2B1A8]">Joined</Text>
          <Text className="text-[#4ADE80]">May 2021</Text>
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
            <View className="bg-[#2A2A2A] rounded-2xl p-4 mt-4">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-[#4ADE80] font-semibold text-lg">Account</Text>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="#4ADE80" />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Ionicons name="log-out-outline" size={20} color="#4ADE80" />
            <Text className="text-[#4ADE80] ml-2">Logout</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#B2B1A8" />
        </View>
        <View className="flex-row items-center justify-between mt-4">
          <View className="flex-row items-center">
            <Ionicons name="trash-outline" size={20} color="#4ADE80" />
            <Text className="text-[#4ADE80] ml-2">Delete Account</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#B2B1A8" />
        </View>
      </View>
    </View>

    
    
  );
};

export default ProfileScreen;