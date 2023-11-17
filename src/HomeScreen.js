// HomeScreen.js
import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CategoriesList from './CategoriesList';
import { styles } from './styles';

const HomeScreen = () => {
  const navigation = useNavigation();

  const menuButton = () => {
    navigation.navigate('Menu');
  };

  const notificationButton = () => {
    console.log('notificationButton');
  };

  const locationButton = () => {
    console.log('locationButton');
  };
  const handleCategoryPress = (category) => {
    navigation.navigate('Products', { selectedCategory: category });
  };
  return (
    <View style={{ flex: 1 }}>
      {/* Upper Row */}
      <View style={styles.upperRow}>
        {/* Menu Button */}
        <TouchableOpacity onPress={menuButton}>
          <Image source={require('../assets/menuIcon.png')} style={styles.icon} />
        </TouchableOpacity>

        {/* Logo */}
        <Image source={require('../assets/Logo.png')} style={styles.logo} />

        {/* Location Button */}
        <TouchableOpacity onPress={locationButton}>
          <Image source={require('../assets/location.png')} style={styles.icon} />
        </TouchableOpacity>

        {/* Notification Button */}
        <TouchableOpacity onPress={notificationButton}>
          <Image source={require('../assets/notification.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
      
      {/* CategoriesList */}
      <View style={styles.container}>
        <CategoriesList handleCategoryPress={handleCategoryPress} />
      </View>
      
      {/* Cart */}
      <View style={styles.cartContainer}>
        <TouchableOpacity style={styles.bottomButton} onPress={() => navigation.navigate('Cart')}>
          <Image source={require('../assets/cart.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
