import { View, Text, ImageBackground, FlatList, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { collection, getDocs } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons'
import { db } from '../../firebase';

const WorkoutScreen = ({navigation}) => {

    const [popularWorkouts, setPopularWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPopularWorkouts = async () => {
          try {
            const collectionRef = collection(db, 'workouts'); // Pastikan nama koleksi sesuai
            const querySnapshot = await getDocs(collectionRef);
      
            const workouts = querySnapshot.docs.map(doc => ({
              id: doc.id, // Mengambil ID dokumen
              ...doc.data() // Mengambil data dokumen
            }));
      
            setPopularWorkouts(workouts);
          } catch (error) {
            console.error('Error fetching popular workouts: ', error);
          } finally {
            setLoading(false);
          }
        };
      
        fetchPopularWorkouts();
      }, []);

  if (loading) {
    return (
      <SafeAreaView className='flex-1 bg-[#1E1E1E] items-center justify-center'>
        <Text className='text-[#B2B1A8]'>Loading...</Text>
      </SafeAreaView>
    );
  }

  const onPressWorkout = (item) => {
    navigation.navigate("WorkoutDetailScreen", {item});
  };

  const renderWorkout = ({item}) => (
    <TouchableOpacity className='w-full h-44 my-2' onPress={() => onPressWorkout(item)}>
        <ImageBackground 
        source={{uri: item.photo_url}} 
        resizeMode='cover' 
        className='w-full h-full rounded-2xl overflow-hidden'>
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
  )

  return (
    <SafeAreaView className='flex-1 bg-[#1E1E1E] p-4'>
        <Text className='font-bold text-[#4ADE80] text-3xl mb-4'>Workouts</Text>
        <View className='mb-2'>
            <FlatList
                data={popularWorkouts}
                renderItem={renderWorkout}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={{ paddingRight: 24 , paddingBottom: 100}}
            />
        </View>
    </SafeAreaView>
  )
}

export default WorkoutScreen