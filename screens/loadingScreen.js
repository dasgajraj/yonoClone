import React, { useEffect,useCallback } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Dimensions, 
  StatusBar,
  Image 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {useFocusEffect} from '@react-navigation/native'

const { width, height } = Dimensions.get('window');

const LoadingScreen = ({ navigation }) => {
useFocusEffect(
  useCallback(() => {
    const timer = setTimeout(() => {
      navigation.navigate("lock");
    }, 3000);

    return () => clearTimeout(timer); 
  }, [navigation])
);

  return (
    <LinearGradient
      colors={['#E91E63', '#8E24AA', '#5E35B1']}
      start={{ x: 1, y: 1 }}
      end={{ x: 2, y: 0 }}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#E91E63" />
      
      {/* Main Content */}
      <View style={styles.mainContent}>
        
        {/* Main Text */}
        <View style={styles.textContainer}>
          <Text style={styles.mainText}>you</Text>
          <Text style={styles.mainText}>only</Text>
          <Text style={styles.mainText}>need</Text>
          <Text style={styles.mainText}>one</Text>
        </View>
        
        {/* YONO Logo Section */}
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <Image source={require('../assets/yonoLogo.png')} style={styles.logo}/>
          </View>
        </View>
        
      </View>
      
      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <View style={styles.servicesContainer}>
          <Text style={styles.servicesText}>banking • investing • shopping</Text>
        </View>
        
      </View>
      
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  textContainer: {
    marginBottom: 60,
    alignItems: 'center',
  },
mainText: {
  fontSize: 94,
  fontWeight: 'bold',  
  color: '#FFFFFF',
  lineHeight: 80,
  letterSpacing: -1,
  fontFamily: 'System' 
},

  logoSection: {
    alignItems: 'center',
  },
  logoContainer: {
    borderRadius: 30,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  bottomSection: {
    paddingHorizontal: 40,
    paddingBottom: 50,
    alignItems: 'center',
  },
  servicesContainer: {
    marginBottom: 30,
  },
  servicesText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '300',
    textAlign: 'center',
  },

});

export default LoadingScreen;