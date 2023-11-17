// Subcategories.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import { styles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Subcategories = ({ route, navigation }) => {
  const { selectedCategory } = route.params;
  const [subcategories, setSubcategories] = useState([]);
  const getAllItems = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys);
  
      // items dizisi, [key, value] çiftlerini içerir
      console.log('All items in AsyncStorage:', items);
    } catch (error) {
      console.error('Error getting all items from AsyncStorage:', error);
    }
  };
  const addToCart = async (item) => {
  try {
    const existingCart = await AsyncStorage.getItem('cart');
    let cart = existingCart ? JSON.parse(existingCart) : [];

    const isAlreadyAdded = cart.some((cartItem) => cartItem.id === item.id);
    if (!isAlreadyAdded) {
      cart.push(item);
      getAllItems();
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      console.log('Item added to cart:', item);
    } else {
      console.log('Item is already in the cart:', item);
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
};

  
  const fetchSubcategories = async (parentId) => {
    try {
      const response = await fetch(
        `https://apiv5.akilliticaretim.com/api/v5/ad/product/categories?parentId=${parentId}`,
        {
          method: 'GET',
          headers: {
            'GUID': '24BE-DB0E-D75E-4060',
          },
        }
      );

      const result = await response.json();

      if (result.status) {
        return result.data.categories;
      } else {
        console.error('API Error:', result);
        return [];
      }
    } catch (error) {
      console.error('API Error:', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchSubcategoriesAndSet = async () => {
      const subcategories = await fetchSubcategories(selectedCategory.id);
      setSubcategories(subcategories);
    };

    fetchSubcategoriesAndSet();
  }, [selectedCategory]);

  const handleSubcategoryPress = async (subcategory) => {
    try {
      await addToCart(subcategory);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };
  const handleCartPress = async (subcategory) => {
    console.log('-----------', JSON.stringify(subcategory));
    navigation.navigate('Cart', { selectedCategory: subcategory });
  };
  
  const renderSubcategoryItem = ({ item }) => (
    <TouchableOpacity style={styles.verticalButton} onPress={() => handleSubcategoryPress(item)}>
      <Image
        source={{ uri: item.imagePath.imagePath }}
        style={styles.ImageCategory}
      />
      <View style={styles.buttonUnderTextView}>
        <Text style={styles.buttonTextStyle}>{item.categoryName}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}
          numColumns={3}
          data={subcategories}
          renderItem={renderSubcategoryItem}
          keyExtractor={(item) =>
            item.id ? item.categoryName.toString() : Math.random().toString()
          }
        />
      </View>
      {/* Cart */}
      <View style={styles.cartContainer}>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => handleCartPress(selectedCategory)}
        >
          <Image source={require('../assets/cart.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Subcategories;
