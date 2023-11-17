// ShoppingCart.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const ShoppingCart = ({ route }) => {
  const selectedSubcategory = route?.params?.selectedSubcategory;

  if (!selectedSubcategory) {
    console.error('Selected subcategory is undefined.');
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Selected subcategory is undefined.</Text>
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>
      <Text style={styles.selectedCategory}>Selected Subcategory: {selectedSubcategory.categoryName}</Text>

      <FlatList
        data={addedItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text>{item.name}</Text>
            <Text>{item.price} TL</Text>
          </View>
        )}
      />

      <View style={styles.bottomContainer}>
        <Text style={styles.totalText}>Toplam: {calculateTotal(addedItems)} TL</Text>
        {/* Checkout işlemi buraya eklenebilir */}
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const calculateTotal = (addedItems) => {
  return addedItems.reduce((total, item) => total + item.price, 0);
};

const styles = StyleSheet.create({
  // ... diğer stiller
});

export default ShoppingCart;
