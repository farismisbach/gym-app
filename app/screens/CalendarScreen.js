import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [events, setEvents] = useState({});
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');

  const getDayName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const deleteEvent = (eventIndex) => {
    setEvents((prevEvents) => {
      const updatedEvents = { ...prevEvents };
      updatedEvents[selectedDate] = updatedEvents[selectedDate].filter((_, index) => index !== eventIndex);
      if (updatedEvents[selectedDate].length === 0) delete updatedEvents[selectedDate]; // Remove date if no events left
      return updatedEvents;
    });
  };

  const addEvent = () => {
    if (!title || !selectedDate) return alert('Please provide a title and select a date.');

    setEvents((prevEvents) => ({
      ...prevEvents,
      [selectedDate]: [...(prevEvents[selectedDate] || []), { title, location }],
    }));

    // Clear inputs
    setTitle('');
    setLocation('');
  };

  return (
    <SafeAreaView className='flex-1 bg-[#1E1E1E]'>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className='px-4 pt-12 pb-6'>
          <Text className='font-bold text-3xl text-[#4ADE80]'>Schedule</Text>
        </View>

        <View className='bg-[#1A1A1A] rounded-t-[32px] min-h-screen p-5'>

          {/* Calendar */}
          <Calendar
            current={selectedDate || new Date().toISOString().split('T')[0]}
            onDayPress={onDayPress}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: '#4ADE80' },
            }}
            theme={{
              calendarBackground: '#2A2A2A',
              textSectionTitleColor: '#FFFFFF',
              selectedDayBackgroundColor: '#4ADE80',
              selectedDayTextColor: '#000000',
              todayTextColor: '#4ADE80',
              dayTextColor: '#FFFFFF',
              textDisabledColor: '#444444',
              monthTextColor: '#FFFFFF',
              arrowColor: '#FFFFFF',
            }}
            className='rounded-2xl overflow-hidden'
          />

          {/* Event Input */}
          <View className='bg-[#2A2A2A] rounded-2xl p-4 mt-4'>
            <TextInput
              placeholder='Workouts'
              placeholderTextColor='#666'
              value={title}
              onChangeText={setTitle}
              className='bg-[#1E1E1E] text-white rounded-md p-3 mb-2'
            />
            <TouchableOpacity
              onPress={addEvent}
              className='bg-[#4ADE80] rounded-md py-3 mt-2 items-center'
            >
              <Text className='font-poppins-semibold text-black'>Add Workout</Text>
            </TouchableOpacity>
          </View>

          {/* Selected Date and Events */}
          {selectedDate && (
            <View className='mt-4'>
              <Text className='font-poppins-semibold text-white text-lg'>
                Workouts on {selectedDate} - {getDayName(selectedDate)}
              </Text>
              {events[selectedDate] && events[selectedDate].length > 0 ? (
                events[selectedDate].map((event, index) => (
                  <View key={index} className='bg-[#2A2A2A] rounded-md p-3 mt-2 flex-row justify-between items-center'>
                    <View className='w-1/2'>
                      <Text className='font-semibold text-white'>{event.title}</Text>
                      {event.location ? (
                        <Text className='font-poppins-regular text-gray-400'>{event.location}</Text>
                      ) : null}
                    </View>
                    <TouchableOpacity
                      onPress={() => deleteEvent(index)}
                      className='bg-[#FF3B30] rounded-md px-4 py-2'
                    >
                      <Text className='text-white font-semibold'>Delete</Text>
                    </TouchableOpacity>
                  </View>
                ))
              ) : (
                <Text className='font-poppins-regular text-gray-400 mt-2'>No workout for this date.</Text>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CalendarScreen;
