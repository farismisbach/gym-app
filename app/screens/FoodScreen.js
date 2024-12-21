import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  Dimensions,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { set, ref } from 'firebase/database';
import database from '../../firebase';

// Database makanan
const FOOD_DATABASE = [
  { id: '1', name: 'Nasi Putih', calories: 130, portion: '100g', carbs: 28, protein: 2.7, fat: 0.3, water: 65, category: 'Karbo' },
  { id: '2', name: 'Nasi Merah', calories: 111, portion: '100g', carbs: 23, protein: 2.6, fat: 0.9, water: 70, category: 'Karbo' },
  { id: '3', name: 'Kentang Rebus', calories: 93, portion: '100g', carbs: 21, protein: 2.5, fat: 0.1, water: 75, category: 'Karbo' },
  { id: '4', name: 'Ubi Rebus', calories: 86, portion: '100g', carbs: 20, protein: 1.6, fat: 0.1, water: 72, category: 'Karbo' },
  { id: '5', name: 'Quinoa', calories: 120, portion: '100g', carbs: 21, protein: 4.4, fat: 1.9, water: 65, category: 'Karbo' },
  { id: '6', name: 'Ayam Dada', calories: 165, portion: '100g', carbs: 0, protein: 31, fat: 3.6, water: 70, category: 'Protein' },
  { id: '7', name: 'Ikan Salmon', calories: 208, portion: '100g', carbs: 0, protein: 22, fat: 13, water: 62, category: 'Protein' },
  { id: '8', name: 'Telur Rebus', calories: 155, portion: '100g', carbs: 1.1, protein: 13, fat: 11, water: 75, category: 'Protein' },
  { id: '9', name: 'Daging Sapi', calories: 250, portion: '100g', carbs: 0, protein: 26, fat: 17, water: 55, category: 'Protein' },
  { id: '10', name: 'Ikan Tuna', calories: 132, portion: '100g', carbs: 0, protein: 28, fat: 1.3, water: 74, category: 'Protein' },
  { id: '11', name: 'Tempe Goreng', calories: 150, portion: '100g', carbs: 10, protein: 14, fat: 6, water: 60, category: 'Protein Nabati' },
  { id: '12', name: 'Tahu Goreng', calories: 110, portion: '100g', carbs: 2.5, protein: 10, fat: 7, water: 72, category: 'Protein Nabati' },
  { id: '13', name: 'Edamame', calories: 121, portion: '100g', carbs: 8, protein: 11, fat: 5, water: 65, category: 'Protein Nabati' },
  { id: '14', name: 'Almond', calories: 579, portion: '100g', carbs: 21, protein: 21, fat: 49, water: 4, category: 'Snack' },
  { id: '15', name: 'Kacang Tanah', calories: 567, portion: '100g', carbs: 16, protein: 25, fat: 49, water: 5, category: 'Snack' },
  { id: '16', name: 'Apel', calories: 52, portion: '100g', carbs: 14, protein: 0.3, fat: 0.2, water: 85, category: 'Buah' },
  { id: '17', name: 'Pisang', calories: 89, portion: '100g', carbs: 23, protein: 1.1, fat: 0.3, water: 74, category: 'Buah' },
  { id: '18', name: 'Mangga', calories: 60, portion: '100g', carbs: 15, protein: 0.8, fat: 0.4, water: 83, category: 'Buah' },
  { id: '19', name: 'Jeruk', calories: 47, portion: '100g', carbs: 12, protein: 0.9, fat: 0.1, water: 87, category: 'Buah' },
  { id: '20', name: 'Semangka', calories: 30, portion: '100g', carbs: 8, protein: 0.6, fat: 0.2, water: 92, category: 'Buah' },
  { id: '21', name: 'Broccoli', calories: 55, portion: '100g', carbs: 11, protein: 3.7, fat: 0.6, water: 89, category: 'Sayuran' },
  { id: '22', name: 'Bayam', calories: 23, portion: '100g', carbs: 3.6, protein: 2.9, fat: 0.4, water: 91, category: 'Sayuran' },
  { id: '23', name: 'Kangkung', calories: 35, portion: '100g', carbs: 6.6, protein: 3.1, fat: 0.6, water: 92, category: 'Sayuran' },
  { id: '24', name: 'Wortel', calories: 41, portion: '100g', carbs: 10, protein: 0.9, fat: 0.2, water: 88, category: 'Sayuran' },
  { id: '25', name: 'Kubis', calories: 25, portion: '100g', carbs: 6, protein: 1.3, fat: 0.1, water: 92, category: 'Sayuran' },
  { id: '26', name: 'Beng Beng', calories: 120, portion: '1 bar', carbs: 18, protein: 2, fat: 4, water: 5, category: 'Snack' },
  { id: '27', name: 'Tango', calories: 105, portion: '1 bar', carbs: 15, protein: 1.5, fat: 3, water: 5, category: 'Snack' },
  { id: '28', name: 'Oreo', calories: 160, portion: '3 pcs', carbs: 25, protein: 1, fat: 7, water: 4, category: 'Snack' },
  { id: '29', name: 'Susu Greenfields', calories: 120, portion: '200ml', carbs: 12, protein: 8, fat: 4.5, water: 87, category: 'Minuman' },
  { id: '30', name: 'Cokelat SilverQueen', calories: 150, portion: '25g', carbs: 14, protein: 1.2, fat: 9, water: 3, category: 'Snack' },
  { id: '31', name: 'Air Putih', calories: 0, portion: '250ml', carbs: 0, protein: 0, fat: 0, water: 100, category: 'Minuman' },
];


const MealTime = {
  PRE_BREAKFAST: 'Pre-Breakfast',
  BREAKFAST: 'Breakfast',
  MORNING_SNACK: 'Morning Snack',
  LUNCH: 'Lunch',
  AFTERNOON_SNACK: 'Afternoon Snack',
  DINNER: 'Dinner',
};

export default function FoodScreen({navigation}) {
  const [meals, setMeals] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMealTime, setSelectedMealTime] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFoods, setFilteredFoods] = useState(FOOD_DATABASE);

  const calculateTotalNutrients = () => {
    let totalCal = 0;
    let totalCarbs = 0;
    let totalProtein = 0;
    let totalFat = 0;
    let totalWater = 0;

    Object.values(meals).forEach(mealItems => {
      mealItems.forEach(item => {
        totalCal += item.calories;
        totalCarbs += item.carbs;
        totalProtein += item.protein;
        totalFat += item.fat;
        totalWater += item.water || 0
      });
    });

    return {
      calories: Math.round(totalCal),
      carbs: Math.round(totalCarbs * 10) / 10,
      protein: Math.round(totalProtein * 10) / 10,
      fat: Math.round(totalFat * 10) / 10,
      water: Math.round(totalWater * 10) / 10,
    };
  };

  const handleDeleteFood = (mealTime, index) => {
    Alert.alert(
      "Hapus Makanan",
      "Apakah Anda yakin ingin menghapus makanan ini?",
      [
        {
          text: "Batal",
          style: "cancel"
        },
        {
          text: "Hapus",
          onPress: () => {
            setMeals(prev => {
              const updatedMeal = [...prev[mealTime]];
              updatedMeal.splice(index, 1);
              return {
                ...prev,
                [mealTime]: updatedMeal
              };
            });
          },
          style: "destructive"
        }
      ]
    );
  };

  const handleSendData = () => {
    const totals = calculateTotalNutrients();
    navigation.navigate('HomeScreen', { 
      calories: totals.calories, 
      carbs: totals.carbs, 
      protein: totals.protein, 
      fat: totals.fat,
      water: totals.water
    });
  };

  const handleAddFood = (mealTime) => {
    setSelectedMealTime(mealTime);
    setModalVisible(true);
    setFilteredFoods(FOOD_DATABASE);
    setSearchQuery('');
  };

  const handleSelectFood = (food) => {
    setMeals(prev => ({
      ...prev,
      [selectedMealTime]: [...(prev[selectedMealTime] || []), food]
    }));
    setModalVisible(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = FOOD_DATABASE.filter(food => 
      food.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredFoods(filtered);
  };

  const MealSection = ({ title, mealTime }) => {
    const mealItems = meals[mealTime] || [];
    const totalCalories = mealItems.reduce((sum, item) => sum + item.calories, 0);

    return (
      <View style={styles.mealSection}>
        <TouchableOpacity 
          style={styles.mealHeader} 
          onPress={() => handleAddFood(mealTime)}
        >
          <Text style={styles.mealTitle}>{title}</Text>
          <View style={styles.mealHeaderRight}>
            {totalCalories > 0 && (
              <Text style={styles.calorieText}>{totalCalories} kal</Text>
            )}
            <Ionicons name="add-circle" size={24} color="#4ADE80" />
          </View>
        </TouchableOpacity>
        {mealItems.map((item, index) => (
          <View key={index} style={styles.foodItem}>
            <View>
              <Text style={styles.foodName}>{item.name}</Text>
              <Text style={styles.foodPortion}>{item.portion}</Text>
            </View>
            <Text style={styles.foodCalories}>{item.calories} kal</Text>
            <TouchableOpacity 
                onPress={() => handleDeleteFood(mealTime, index)}
            >
                <Ionicons name="close-circle" size={24} color="#FF6B6B" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  };

  const totals = calculateTotalNutrients();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nutrition</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Nutrisi Harian</Text>
          <View style={styles.summaryContent}>
            <View style={styles.nutrientItem}>
              <Text style={styles.nutrientValue}>{totals.fat}g</Text>
              <Text style={styles.nutrientLabel}>Lemak</Text>
            </View>
            <View style={styles.nutrientItem}>
              <Text style={styles.nutrientValue}>{totals.carbs}g</Text>
              <Text style={styles.nutrientLabel}>Karbo</Text>
            </View>
            <View style={styles.nutrientItem}>
              <Text style={styles.nutrientValue}>{totals.protein}g</Text>
              <Text style={styles.nutrientLabel}>Protein</Text>
            </View>
            <View style={styles.nutrientItem}>
              <Text style={styles.nutrientValue}>{totals.calories}</Text>
              <Text style={styles.nutrientLabel}>Kalori</Text>
            </View>
            <View style={styles.nutrientItem}>
              <Text style={styles.nutrientValue}>{totals.water}ml</Text>
              <Text style={styles.nutrientLabel}>Air</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={handleSendData} className='w-1/2 h-10 bg-[#4ADE80] justify-center rounded-md ml-24'>
            <Text className='text-white font-bold text-center'>Save</Text>
        </TouchableOpacity>


        {/* Meal Sections */}
        <View style={styles.mealsContainer}>
          <MealSection title="Pre-Breakfast" mealTime={MealTime.PRE_BREAKFAST} />
          <MealSection title="Breakfast" mealTime={MealTime.BREAKFAST} />
          <MealSection title="Morning Snack" mealTime={MealTime.MORNING_SNACK} />
          <MealSection title="Lunch" mealTime={MealTime.LUNCH} />
          <MealSection title="Afternoon Snack" mealTime={MealTime.AFTERNOON_SNACK} />
          <MealSection title="Dinner" mealTime={MealTime.DINNER} />
        </View>
      </ScrollView>

      {/* Food Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Tambah Makanan</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          
          <TextInput
            style={styles.searchInput}
            placeholder="Cari makanan..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
          
          <FlatList
            data={filteredFoods}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.foodChoice}
                onPress={() => handleSelectFood(item)}
              >
                <View>
                  <Text style={styles.foodChoiceName}>{item.name}</Text>
                  <Text style={styles.foodChoiceCategory}>{item.category}</Text>
                </View>
                <View style={styles.foodChoiceInfo}>
                  <Text style={styles.foodChoiceCalories}>{item.calories} kal</Text>
                  <Text style={styles.foodChoicePortion}>{item.portion}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  header: {
    backgroundColor: '#1E1E1E',
    padding: 15,
    paddingTop: 40,
  },
  headerTitle: {
    color: '#4ADE80',
    fontSize: 30,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  summaryCard: {
    backgroundColor: '#2A2A2A',
    margin: 15,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#666'
  },
  summaryContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  nutrientItem: {
    alignItems: 'center',
  },
  nutrientValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4ADE80',
  },
  nutrientLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  mealsContainer: {
    padding: 15,
    marginBottom: 60
  },
  mealSection: {
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  mealHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4ADE80'
  },
  calorieText: {
    color: '#666',
    marginRight: 10,
  },
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  foodName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4ADE80'
  },
  foodPortion: {
    fontSize: 12,
    color: '#666',
  },
  foodCalories: {
    fontSize: 14,
    color: '#666',
  },
  modalView: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    marginTop: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4ADE80'
  },
  searchInput: {
    backgroundColor: '#4ADE80',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  foodChoice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  foodChoiceName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4ADE80'
  },
  foodChoiceCategory: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  foodChoiceInfo: {
    alignItems: 'flex-end',
  },
  foodChoiceCalories: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666'
  },
  foodChoicePortion: {
    fontSize: 12,
    color: '#666',
  },
});