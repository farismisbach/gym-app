import { View, Text, ScrollView, Image, Button, TouchableOpacity } from 'react-native'
import React, {useState, useRef, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Video, ResizeMode } from 'expo-av';
import { Ionicons } from '@expo/vector-icons'

const WorkoutDetailScreen = ({navigation, route}) => {

    const item = route.params?.item;
    const video = useRef(null);
    const [status, setStatus] = useState({});

    const videos = {
        pushup: require('./../../assets/Video/Pushup.mp4'),
        squat: require('./../../assets/Video/Squat.mp4'),
        plank: require('./../../assets/Video/Plank.mp4'),
        triceps: require('./../../assets/Video/Triceps.mp4'),
        bicep: require('./../../assets/Video/BicepCurl.mp4'),
        dumbbell: require('./../../assets/Video/DumbellRow.mp4'),
        lunges: require('./../../assets/Video/Lunges.mp4'),
        pullup: require('./../../assets/Video/PullUp.mp4'),
        shoulder: require('./../../assets/Video/ShoulderPress.mp4'),
      };

      const [workoutTime, setWorkoutTime] = useState(20); // seconds
  const [restTime, setRestTime] = useState(15); // seconds
  const [currentSet, setCurrentSet] = useState(1);
  const [totalSets, setTotalSets] = useState(8);
  const [isResting, setIsResting] = useState(false);
  const [timer, setTimer] = useState(workoutTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            if (isResting) {
              if (currentSet < totalSets) {
                setCurrentSet((prevSet) => prevSet + 1);
                setIsResting(false);
                return workoutTime;
              } else {
                setIsRunning(false);
                clearInterval(interval);
                return 0;
              }
            } else {
              setIsResting(true);
              return restTime;
            }
          }
          return prevTimer - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, isResting, currentSet, totalSets, workoutTime, restTime]);

  const startPauseTimer = () => {
    setIsRunning(!isRunning);
  };

  return (
    <SafeAreaView className='flex-1 bg-[#1E1E1E]'>
        <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
            <View>
                <Image source={{uri: item.photo_url}}  style={{ width: '100%', height: 200, borderRadius: 16 }} resizeMode='cover'/>
            </View>
            <View className='px-4 mt-2'>
                <View className='flex-row justify-between items-center'>
                    <Text className='text-[#4ADE80] font-bold text-2xl mb-4'>{item.title}</Text>
                    <View clasName='flex-row items-center'>
                        <Ionicons name="flame-outline" size={14} color="#B2B1A8" className='ml-4'/>
                        <Text className='text-[#B2B1A8] text-sm'>{item.calories} cal</Text>
                    </View>
                </View>
                <Video
                ref={video}
                source={videos[item.path_video]}
                style={{ width: '100%', height: 200 }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
                onPlaybackStatusUpdate={status => setStatus(() => status)}
                />
                <View className='justify-center items-center'>
                    <TouchableOpacity
                    onPress={() =>
                        status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                    }
                    className='h-10 w-1/2 bg-[#4ADE80] rounded-md mt-2 justify-center'
                    >
                        <Text className='text-white font-bold text-lg text-center'>{status.isPlaying ? 'Pause' : 'Play'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View className='px-4 mt-4'>
                <Text className='text-[#4ADE80] font-bold text-2xl mb-2'>Instruction</Text>
                {item?.steps && item.steps.length > 0 ? (
                    item.steps.map((step, index) => (
                        <View key={index} className='mb-4 flex-row'>
                            <Text className='text-[#4ADE80] font-bold text-lg w-1/12'>0{index + 1}</Text>
                            <Text className='text-[#B2B1A8] text-md w-5/6'>{step}</Text>
                        </View>
                    ))
                ) : (
                    <Text className='text-[#B2B1A8] text-sm mt-2'>No instructions available.</Text>
                )}
            </View>

            <View className='px-4 mt-6 items-center  mb-28'>
                <Text className='text-[#4ADE80] font-bold text-xl'>Interval Timer</Text>
                <View className='bg-[#252525] p-6 rounded-lg mt-4 items-center'>
                    <Text className='text-white text-4xl font-bold'>{`${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, '0')}`}</Text>
                    <Text className='text-[#B2B1A8] mt-2'>{isResting ? 'Resting...' : 'Workout!'}</Text>
                    <Text className='text-[#B2B1A8] mt-1'>Set {currentSet} of {totalSets}</Text>

                    <TouchableOpacity
                    onPress={startPauseTimer}
                    className='h-10 w-32 bg-[#4ADE80] rounded-md mt-4 justify-center'
                    >
                    <Text className='text-white font-bold text-sm text-center'>{isRunning ? 'Pause' : 'Start'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default WorkoutDetailScreen