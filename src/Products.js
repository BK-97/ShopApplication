import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { styles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Products = ({ route, navigation }) => {
  const { selectedProduct: selectedCategory } = route.params;
  const [products, setProducts] = useState([]);

  const addToCart = async (productId, amount) => {
    try {
      const apiUrl = 'https://apiv5.akilliticaretim.com/api/v5/sf/cart/cart';
      
      const headers = {
        'GUID': '24BE-DB0E-D75E-4060',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0OGZiMTFkYS1lZmZjLTRmZmUtOTZmNS04N2ExMjY2NzEwZDkiLCJ1c2VyaWQiOiIxMjM2MCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJndWlkIjoiMjRCRS1EQjBFLUQ3NUUtNDA2MCIsImV4cCI6MTY5OTg2OTAyOSwiaXNzIjoiaHR0cHM6Ly93d3cuYWtpbGxpdGljYXJldC5jb20vIiwiYXVkIjoiaHR0cHM6Ly93d3cuYWtpbGxpdGljYXJldC5jb20vIn0.Q9jVNhfWInn2ukad-xzV0_1xNKThjxLQ1n1TC4C7tjs',
      };
  
      const requestData = {
        productId: parseInt(productId),
        UserId: 2025,
        amount:amount,
      };
  
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestData),
      });
  
      const responseData = await response.json();

      if (responseData && responseData.status === true) {
        console.log('Ürün sepete eklendi:', responseData);
      } else {
        console.error('Ürün eklenirken bir hata oluştu:', responseData);
      }
    } catch (error) {
      console.error('API hatası:', error);
    }
  };
  

  const fetchProducts = async (categoryId) => {
    try {
      const response = await fetch(
        `https://apiv5.akilliticaretim.com/api/v5/sf/product/category_products?Id=${categoryId}&PageNumber=1&PageSize=10`,
        {
          method: 'GET',
          headers: {
            'GUID': '24BE-DB0E-D75E-4060',
          },
        }
      );

      const result = await response.json();

      if (result.status) {
        const products = result.data;

        if (products) {
          return products;
        } else {
          console.error('Products is undefined');
          return [];
        }
      } else {
        console.error('API Error:', result);
        return [];
      }
    } catch (error) {
      console.error('API Error:', error);
      return [];
    }
  };

  const handleProductPress = async (product) => {
    try {
      await addToCart(parseInt(product.id), 1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };
  useEffect(() => {
    const fetchProductsAndSet = async () => {
      try {
        const result = await fetchProducts(selectedCategory.id);
        if (result && result.length > 0) {
          setProducts(result);
        } else {
          console.error('No products found.');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProductsAndSet();
  }, [selectedCategory]);

  const handleCartPress = async (subcategory) => {
    navigation.navigate('Cart', { selectedProduct: subcategory });
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.verticalButton} onPress={() => handleProductPress(item)}>
      <Image
        source={{ uri: item.productImages[0].imagePath }}
        style={styles.ImageCategory}
      />
      <View style={styles.buttonUnderTextView}>
        <Text style={styles.buttonTextStyle}>{item.stockName}</Text>
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
          data={products}
          renderItem={renderProductItem}
          keyExtractor={(item) =>
            item.categoryName ? item.categoryName.toString() : Math.random().toString()
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

export default Products;
