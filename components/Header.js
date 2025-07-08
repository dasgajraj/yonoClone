import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      
      {/* Back Button - Absolutely Positioned */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#1A237E" />
      </TouchableOpacity>

      {/* Centered Title */}
      <View style={styles.centerContainer}>
        <Text style={styles.headerText}>YONO</Text>
        <Image source={require('../assets/sbiLogo.png')} style={styles.logo} />
        <Text style={styles.headerText}>SBI</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },

  backButton: {
    position: 'absolute',
    left: 10,
    top: 15,
    padding: 5,
  },

  centerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A237E',
    marginHorizontal: 5,
  },

  logo: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
});
