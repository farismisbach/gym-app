import React, {useState, useEffect} from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser, useClerk } from '@clerk/clerk-expo';
import { onValue, ref, set, get } from 'firebase/database';
import database from '../../firebase';


const ProfileScreen = () => {
  const {user, isLoading} = useUser();
  const passwordLength = user?.password?.length;
  const joinedDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A';
  const { signOut } = useClerk()
  const [weight, setWeight] = useState({ start: '', current: '', target: '' });


  useEffect(() => {
    // Fetch weight data for the user from Firebase
    const weightRef = ref(database, `weights/${user.id}`);
    const unsubscribe = onValue(weightRef, (snapshot) => {
      if (snapshot.exists()) {
        setWeight(snapshot.val());
      } else {
        console.log("No weight data found for user.");
      }
    });

    return () => unsubscribe(); // Cleanup listener
  }, [user.id]);

  const handleSave = async () => {
    try {
      await set(ref(database, `weights/${user.id}`), weight);
      Alert.alert('Success', 'Weight data saved successfully!');
    } catch (error) {
      console.error('Error saving weight data:', error);
      Alert.alert('Error', 'Failed to save weight data.');
    }
  };

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
          <Text className="text-[#4ADE80] font-semibold text-lg">Weight Input</Text>

          {/* Weight Inputs */}
          <View className="mt-4">
            <Text className="text-[#B2B1A8]">Start</Text>
            <TextInput
              style={{
                backgroundColor: '#333',
                color: '#4ADE80',
                padding: 10,
                borderRadius: 8,
                marginTop: 4,
              }}
              value={weight.start}
              onChangeText={(text) => setWeight({ ...weight, start: text })}
              keyboardType="numeric"
              placeholder="Enter starting weight"
              placeholderTextColor="#888"
            />
          </View>

          <View className="mt-4">
            <Text className="text-[#B2B1A8]">Current</Text>
            <TextInput
              style={{
                backgroundColor: '#333',
                color: '#4ADE80',
                padding: 10,
                borderRadius: 8,
                marginTop: 4,
              }}
              value={weight.current}
              onChangeText={(text) => setWeight({ ...weight, current: text })}
              keyboardType="numeric"
              placeholder="Enter current weight"
              placeholderTextColor="#888"
            />
          </View>

          <View className="mt-4">
            <Text className="text-[#B2B1A8]">Target</Text>
            <TextInput
              style={{
                backgroundColor: '#333',
                color: '#4ADE80',
                padding: 10,
                borderRadius: 8,
                marginTop: 4,
              }}
              value={weight.target}
              onChangeText={(text) => setWeight({ ...weight, target: text })}
              keyboardType="numeric"
              placeholder="Enter target weight"
              placeholderTextColor="#888"
            />
          </View>

          {/* Save Button */}
          <TouchableOpacity
            style={{
              marginTop: 20,
              backgroundColor: '#4ADE80',
              padding: 15,
              borderRadius: 8,
              alignItems: 'center',
            }}
            onPress={handleSave}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Save</Text>
          </TouchableOpacity>
        </View>

        <View className="mt-8 bg-[#2A2A2A] rounded-2xl p-4 w-full">
                  <Text className="text-[#4ADE80] font-semibold text-lg">Weight</Text>
                  <View className="flex-row justify-between items-center mt-2">
                    <View className='flex-1'>
                      <Text className="text-[#B2B1A8]">Start</Text>
                      <Text className="text-[#4ADE80]">{weight.start}kg</Text>
                    </View>
                    <View className='flex-1'>
                      <Text className="text-[#B2B1A8]">Current</Text>
                      <Text className="text-[#4ADE80]">{weight.current}kg</Text>
                    </View>
                    <View className='flex-1'>
                      <Text className="text-[#B2B1A8]">Target</Text>
                      <Text className="text-[#4ADE80]">{weight.target}kg</Text>
                    </View>
                  </View>
                  <View className="h-4 bg-[#4ADE80] rounded-full mt-4" style={{ width: `${Math.min(100, (weight.current / weight.target) * 100)}%` }} />
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