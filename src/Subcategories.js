// Subcategories.js
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image,FlatList,Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';

const Subcategories = () => {
  const navigation = useNavigation();
  const [subcategories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://apiv5.akilliticaretim.com/api/v5/ad/product/categories?parentId=70',
          {
            method: 'GET',
            headers: {
              'GUID': '24BE-DB0E-D75E-4060',
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
  const renderSubcategoryItem = ({ item }) => (
    <TouchableOpacity style={styles.verticalButton} onPress={() => handleSubCategoryPress(item)}>
      <Image
        source={{ uri: item.imagePath.imagePath }}
        style={styles.ImageCategory}
      />
      <View style={styles.buttonUnderTextView}>
        <Text style={styles.buttonTextStyle}>{item.categoryName}</Text>
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
  const handleSubCategoryPress = (category) => {
    navigation.navigate('Products', { selectedProduct: category });
  };
  const handleCartPress = () => {
    navigation.navigate('Cart');
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
      
    
      
      {/* Cart */}
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
      {/* Cart */}
      <View style={styles.cartContainer}>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => handleCartPress()}
        >
          <Image source={require('../assets/cart.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Subcategories;
