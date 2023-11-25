// HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, FlatList, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from './Button';
import { styles } from './styles';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://apiv5.akilliticaretim.com/api/v5/ad/product/categories",
          {
            method: "GET",
            headers: {
              "GUID": "24BE-DB0E-D75E-4060",
            },
          }
        );

        const result = await response.json();

        if (result.status) {
          setCategories(result.data.categories);
        } else {
          console.error('API Error:', result);
        }
      } catch (error) {
        console.error('API Error:', error);
      }
    };

    fetchCategories();
  }, []);

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.verticalButton}
      onPress={() => handleCategoryPress(item)}
    >
      <View style={styles.buttonUnderTextView}>
        <Text style={styles.buttonUnderText}>{item.categoryName}</Text>
      </View>
    </TouchableOpacity>
  );

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
    console.log('Seçilen Kategori:', category);

    navigation.navigate('SubCategory', {
      selectedSubcategory: category,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Upper Row */}
      <View style={styles.upperRow}>
        {/* Menu Button */}
        <CustomButton onPress={menuButton} iconSource={require('../assets/menuIcon.png')} style={styles.icon} />

        {/* Logo */}
        <Image source={require('../assets/Logo.png')} style={styles.logo} />

        {/* Location Button */}
        <CustomButton onPress={locationButton} iconSource={require('../assets/location.png')} style={styles.icon} />

        {/* Notification Button */}
        <CustomButton onPress={notificationButton} iconSource={require('../assets/notification.png')} style={styles.icon} />
      </View>
      
      {/* CategoriesList */}
      <FlatList
        contentContainerStyle={{
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}
        numColumns={3}
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) =>
          item.categoryId ? item.categoryId.toString() : Math.random().toString()
        }
      />
      
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
