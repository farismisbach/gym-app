import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React, {useState} from 'react'
import { Calendar} from 'react-native-calendars';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const getDayName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' }); 
  };

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  return (
    <SafeAreaView className='flex-1 bg-black'>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className='px-4 pt-12 pb-6'>
          <Text className='font-poppins-bold text-xl text-white'>24 Hour Fitness</Text>
          <Text className='font-poppins-regular text-sm text-gray-400 mt-2'>
            Cassuarinca Ground is located in Malang City which is not far from city centre. This house was made in 2019 with all...
            <Text className='text-white'> Show More</Text>
          </Text>
        </View>

        <View className='bg-[#1A1A1A] rounded-t-[32px] min-h-screen p-5'>
          <Text className='font-poppins-semibold text-white text-lg mb-4'>Add Appointment</Text>
          
          <View className='bg-[#2A2A2A] rounded-2xl p-5 mb-4'>
            <Text className='font-poppins-semibold text-white text-lg'>Basic Package</Text>
            <Text className='font-poppins-regular text-gray-400'>$48<Text className='text-xs'>/month</Text></Text>
          </View>

          <Calendar
            current={selectedDate || new Date().toISOString().split('T')[0]}
            onDayPress={onDayPress}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: '#CCFF00' }
            }}
            theme={{
              calendarBackground: '#2A2A2A',
              textSectionTitleColor: '#FFFFFF',
              selectedDayBackgroundColor: '#CCFF00',
              selectedDayTextColor: '#000000',
              todayTextColor: '#CCFF00',
              dayTextColor: '#FFFFFF',
              textDisabledColor: '#444444',
              monthTextColor: '#FFFFFF',
              arrowColor: '#FFFFFF',
              textDayFontFamily: 'Poppins-Regular',
              textMonthFontFamily: 'Poppins-SemiBold',
              textDayHeaderFontFamily: 'Poppins-Medium',
              textDayFontSize: 14,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 14,
              'stylesheet.calendar.header': {
                header: {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                  alignItems: 'center'
                }
              }
            }}
            className='rounded-2xl overflow-hidden'
          />

          {selectedDate && (
            <Text className='font-poppins-regular text-sm text-gray-400 mt-4'>
              Training date: {selectedDate} - {getDayName(selectedDate)}
            </Text>
          )}

          <View className='mt-20'>
            <TouchableOpacity 
              className='bg-white rounded-xl py-4 items-center mb-2'
            >
              <Text className='font-poppins-semibold text-black'>Continue</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              className='items-center py-2 mb-24'
            >
              <Text className='font-poppins-regular text-white'>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default CalendarScreen