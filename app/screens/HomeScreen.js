import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions, ImageBackground, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { popular } from '../data/DataArrays'
import { useUser } from '@clerk/clerk-expo'

const HomeScreen = ({navigation}) => {
  const {user, isLoading} = useUser();
  const screenWidth = Dimensions.get('window').width
  
  const ProgressBar = ({ progress, total }) => (
    <View className='w-full h-2 bg-[#696861] rounded-full mt-2'>
      <View 
        className='h-full bg-[#4ADE80] rounded-full' 
        style={{ width: `${(progress/total) * 100}%` }}
      />
    </View>
  )

  const ActivityRing = () => (
    <View className='w-20 h-20 items-center justify-center'>
      <View className='absolute w-20 h-20 rounded-full border-4 border-[#696861]' />
      <View className='absolute w-20 h-20 rounded-full border-4 border-[#4ADE80]' 
            style={{
              transform: [{ rotate: '240deg' }],
              borderTopColor: 'transparent',
              borderRightColor: 'transparent',
            }} 
      />
      <Text className='text-[#4ADE80] text-lg font-bold'>68%</Text>
    </View>
  )

  const renderPopular = ({item}) => (
    <TouchableOpacity className='w-72 h-44 mr-4'>
      <ImageBackground 
        source={{uri: item.photo_url}} 
        resizeMode='cover' 
        className='w-full h-full rounded-2xl overflow-hidden'
      >
        <View className='absolute bottom-0 left-0 right-0 p-4 bg-black/50'>
          <Text className='font-semibold text-[#4ADE80] text-lg'>{item.title}</Text>
          <View className='flex-row items-center mt-1'>
            <Ionicons name="time-outline" size={14} color="#B2B1A8" />
            <Text className='text-[#B2B1A8] ml-1 text-sm'>{item.duration} min</Text>
            <Ionicons name="flame-outline" size={14} color="#B2B1A8" className='ml-4' />
            <Text className='text-[#B2B1A8] ml-1 text-sm'>{item.calories} cal</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className='flex-1 bg-[#1E1E1E]'>
      <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className='flex-row justify-between items-center px-6 pt-4'>
          <View className='flex-row items-center'>
            <Image 
              source={{uri:user?.imageUrl}}
              className='w-12 h-12 rounded-full mr-4'
            />
            <View>
              <Text className='text-[#4ADE80] text-lg font-semibold'>Hello {user?.firstName}!</Text>
              <Text className='text-[#B2B1A8]'>Let's start your day</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Ionicons name="trophy-outline" size={24} color="#4ADE80" />
          </TouchableOpacity>
        </View>

        {/* Steps Progress */}
        <View className='mx-6 mt-8 p-4 bg-[#2A2A2A] rounded-2xl'>
          <View className='flex-row justify-between items-center'>
            <Text className='text-[#4ADE80] font-semibold text-lg'>Steps</Text>
            <Text className='text-[#4ADE80]'>68%</Text>
          </View>
          <View className='flex-row items-baseline mt-1'>
            <Text className='text-[#4ADE80] text-3xl font-bold'>11,000</Text>
            <Text className='text-[#B2B1A8] ml-2'>/ 16,000</Text>
          </View>
          <ProgressBar progress={11000} total={16000} />
        </View>

        {/* Daily Activity */}
        <View className='mx-6 mt-4 p-4 bg-[#2A2A2A] rounded-2xl'>
          <View className='flex-row justify-between items-center mb-4'>
            <Text className='text-[#4ADE80] font-semibold text-lg'>Daily Activity</Text>
            <TouchableOpacity>
              <Text className='text-[#4ADE80]'></Text>
            </TouchableOpacity>
          </View>
          
          <View className='flex-row justify-between items-center'>
            <View className='flex-1'>
              <View className='mb-4'>
                <Text className='text-[#B2B1A8]'>Steps</Text>
                <View className='flex-row items-baseline'>
                  <Text className='text-[#4ADE80] text-xl font-bold'>11,000</Text>
                  <Text className='text-[#B2B1A8] ml-2'>/ 16,000</Text>
                </View>
              </View>
              
              <View className='mb-4'>
                <Text className='text-[#B2B1A8]'>Calories</Text>
                <View className='flex-row items-baseline'>
                  <Text className='text-[#4ADE80] text-xl font-bold'>440</Text>
                  <Text className='text-[#B2B1A8] ml-2'>/ 650 Cal</Text>
                </View>
              </View>

              <View className='mb-4'>
                <Text className='text-[#B2B1A8]'>Protein</Text>
                <View className='flex-row items-baseline'>
                  <Text className='text-[#4ADE80] text-xl font-bold'>100</Text>
                  <Text className='text-[#B2B1A8] ml-2'>/ 200 Gr</Text>
                </View>
              </View>
              
              <View>
                <Text className='text-[#B2B1A8]'>Water</Text>
                <View className='flex-row items-baseline'>
                  <Text className='text-[#4ADE80] text-xl font-bold'>1,8</Text>
                  <Text className='text-[#B2B1A8] ml-2'>/ 2,5 L</Text>
                </View>
              </View>
            </View>
            
            <ActivityRing />
          </View>
        </View>

        {/* Workouts */}
        <View className='mx-6 mt-4 p-4 bg-[#2A2A2A] rounded-2xl'>
          <View className='flex-row justify-between items-center mb-4'>
            <Text className='text-[#4ADE80] font-semibold text-lg'>Workouts</Text>
            <TouchableOpacity>
              <Text className='text-[#4ADE80]'>See all</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity className='flex-row justify-between items-center mb-4'>
            <View className='flex-row items-center'>
              <View className='w-10 h-10 bg-[#696861] rounded-full items-center justify-center mr-3'>
                <Ionicons name="walk" size={20} color="#4ADE80" />
              </View>
              <View>
                <Text className='text-[#4ADE80]'>Fullbody Workouts</Text>
                <Text className='text-[#B2B1A8]'>60 minutes</Text>
              </View>
            </View>
            <View className='flex-row items-center'>
              <Text className='text-[#B2B1A8] mr-2'>Today</Text>
              <Ionicons name="chevron-forward" size={20} color="#B2B1A8" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity className='flex-row justify-between items-center mb-4'>
            <View className='flex-row items-center'>
              <View className='w-10 h-10 bg-[#696861] rounded-full items-center justify-center mr-3'>
                <Ionicons name="walk" size={20} color="#4ADE80" />
              </View>
              <View>
                <Text className='text-[#4ADE80]'>Indoor Walk</Text>
                <Text className='text-[#B2B1A8]'>2.44 km</Text>
              </View>
            </View>
            <View className='flex-row items-center'>
              <Text className='text-[#B2B1A8] mr-2'>Today</Text>
              <Ionicons name="chevron-forward" size={20} color="#B2B1A8" />
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity className='flex-row justify-between items-center'>
            <View className='flex-row items-center'>
              <View className='w-10 h-10 bg-[#696861] rounded-full items-center justify-center mr-3'>
                <Ionicons name="walk" size={20} color="#4ADE80" />
              </View>
              <View>
                <Text className='text-[#4ADE80]'>Morning Running</Text>
                <Text className='text-[#B2B1A8]'>3.88 km</Text>
              </View>
            </View>
            <View className='flex-row items-center'>
              <Text className='text-[#B2B1A8] mr-2'>Today</Text>
              <Ionicons name="chevron-forward" size={20} color="#B2B1A8" />
            </View>
          </TouchableOpacity>          
        </View>

        {/* Popular Workouts */}
        <View className='mt-4 px-6'>
          <View className='flex-row justify-between items-center mb-4'>
            <Text className='text-[#4ADE80] font-semibold text-lg'>Popular Workouts</Text>
            <TouchableOpacity>
              <Text className='text-[#4ADE80]'>See all</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={popular}
            renderItem={renderPopular}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 24 , paddingBottom: 100}}
          />
        </View>
      </ScrollView>

      
    </SafeAreaView>
  )
}

export default HomeScreen