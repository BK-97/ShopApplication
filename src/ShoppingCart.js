// ShoppingCart.js
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./styles";

const ShoppingCart = () => {
  const [addedItems, setAddedItems] = useState([]);

  const fetchCartItemsFromApi = async () => {
    try {
      const apiUrl = 'https://apiv5.akilliticaretim.com/api/v5/sf/cart/cart-v2';
    
      const headers = {
        'GUID': '24BE-DB0E-D75E-4060',
        'Authorization': 'Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0OGZiMTFkYS1lZmFjLTRmZmUtOTZmNS04N2ExMjY2NzEwZDkiLCJ1c2VyaWQiOiIxMjM2MCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJndWlkIjoiMjRCRS1EQjBFLUQ3NUUtNDA2MCIsImV4cCI6MTY5OTg2OTAyOSwiaXNzIjoiaHR0cHM6Ly93d3cuYWtpbGxpdGljYXJldC5jb20vIiwiYXVkIjoiaHR0cHM6Ly93d3cuYWtpbGxpdGljYXJldC5jb20vIn0.Q9jVNhfWInn2ukad-xzV0_1xNKThjxLQ1n1TC4C7tjs',
      };
  
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: headers,
      });
  
      console.log("API Response Data:", response);

      if (response.ok) {
        const responseData = await response.json();
  
        if (responseData && responseData.status === true) {
          return responseData.data.items; 
        } else {
          console.error('Error fetching cart from API:', responseData);
          return [];
        }
      } else {
        console.error('HTTP Error:', response.statusText);
        return [];
      }
    } catch (error) {
      console.error('API error while fetching cart:', error);
      return [];
    }
  };
  
  

  const removeFromCart = async (productId) => {
    try {
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const BuyButton = async () => {
    try {
      AsyncStorage.clear();
      setAddedItems([]);
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartItems = await fetchCartItemsFromApi();
        
        setAddedItems(cartItems);
  
        console.log("Fetched cart items from API:", cartItems);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
  
    fetchCartItems();
  }, []);
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>

      {addedItems.length > 0 ? (
        <FlatList
          data={addedItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Text style={styles.buttonTextStyle}>{item.stockName}</Text>
              <Text style={styles.buttonTextStyle}>{item.price} TL</Text>
              <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                <Text style={styles.buttonTextStyle}>Remove from Cart</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      )}

      <View style={styles.bottomContainer}>
        {addedItems.length > 0 && (
          <>
            <Text style={styles.totalText}>
              Total: {calculateTotal(addedItems)} TL
            </Text>
            <TouchableOpacity 
              onPress={BuyButton}
              style={styles.checkoutButton} 
            >
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const calculateTotal = (addedItems) => {
  return addedItems.reduce((total, item) => total + item.price, 0);
};

export default ShoppingCart;
