// MenuScreen.js
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import { styles } from './styles';

const MenuScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://apiv5.akilliticaretim.com/api/v5/ad/product/categories',
          {
            method: 'GET',
            headers: {
              GUID: '24BE-DB0E-D75E-4060',
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

  const handleCategoryPress = (category) => {
    console.log('Seçilen Kategori:', category);
    navigation.navigate('SubCategory', { selectedSubcategory: category });
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.horizontalButton}
      onPress={() => handleCategoryPress(item)}
    >
      <View style={styles.buttonTextView}>
        <Text style={styles.buttonTextStyle}>{item.categoryName}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.verticalContainer}>
      <FlatList
        contentContainerStyle={{
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}
        numColumns={1}
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) =>
          item.categoryId ? item.categoryId.toString() : Math.random().toString()
        }
      />
    </View>
  );
};

export default MenuScreen;
