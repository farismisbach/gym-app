import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const StartScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={styles.container}>
        <ImageBackground
          source={require('../../assets/items/startingWallpaper.jpeg')}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.overlay}>
            <View style={styles.contentContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>
                  Protect Your Health Companion
                </Text>
                <Text style={styles.subtitle}>
                  Elevate Fitness Journey with a Cutting-Edge to Fuel Your Motivation & Crush Your Goals
                </Text>
              </View>
              
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={() => navigation.replace('LoginScreen')}
              >
                <Text style={styles.buttonText}>Get Started</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: width,
    height: height,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'android' ? 40 : 30,
  },
  textContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 15,
    ...Platform.select({
      android: {
        fontFamily: 'sans-serif-medium',
      },
    }),
  },
  subtitle: {
    fontSize: 16,
    color: '#F5F5F5',
    textAlign: 'center',
    lineHeight: 24,
    ...Platform.select({
      android: {
        fontFamily: 'sans-serif',
      },
    }),
  },
  button: {
    backgroundColor: '#00C853',
    paddingVertical: 16,
    marginBottom: 100,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    ...Platform.select({
      android: {
        fontFamily: 'sans-serif-medium',
      },
    }),
  },
});

export default StartScreen;