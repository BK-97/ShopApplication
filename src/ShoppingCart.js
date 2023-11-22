// ShoppingCart.js
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./styles";

const ShoppingCart = () => {
  const [addedItems, setAddedItems] = useState([]);

  const removeFromCart = async (itemId) => {
    try {
      const existingCart = await AsyncStorage.getItem("cart");
      let cart = existingCart ? JSON.parse(existingCart) : [];

      cart = cart.filter((item) => item.id !== itemId);

      await AsyncStorage.setItem("cart", JSON.stringify(cart));

      console.log("Item removed from cart. Updated cart:", cart);

      setAddedItems(cart);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const BuyButton = () => {
    AsyncStorage.clear();
    setAddedItems([]);
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const existingCart = await AsyncStorage.getItem("cart");
        const cart = existingCart ? JSON.parse(existingCart) : [];
        
        setAddedItems(cart);

        console.log("Fetched cart items:", cart);
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
              <Text style={styles.buttonUnderText}>{item.stockName}</Text>
              <Text style={styles.buttonUnderText}>{item.price} TL</Text>
              <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                <Text style={styles.buttonUnderText}>Remove from Cart</Text>
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
