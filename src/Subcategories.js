// Subcategories.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { styles } from './styles';

const Subcategories = ({ route, navigation }) => {
  const { selectedCategory } = route.params;
  const [subcategories, setSubcategories] = useState([]);

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
      console.log('Subcategories:', subcategories);
    };

    fetchSubcategoriesAndSet();
  }, [selectedCategory]);

  const handleSubcategoryPress = async (subcategory) => {
    try {
      // Sepete ekleme işlemini burada yapabilirsiniz.
      // Örneğin:
      // await addToCart(subcategory);
      
      // Şu anlık sadece bilgiyi gönderiyoruz.
      navigation.navigate('ShoppingCart', {
        selectedSubcategory: {
          id: subcategory.id,
          name: subcategory.categoryName,
          price: subcategory.price, // Bu değeri API'den almanız gerekecek
        },
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
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
          onPress={() => navigation.navigate('Cart')}
        >
          <Image source={require('../assets/cart.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Subcategories;
