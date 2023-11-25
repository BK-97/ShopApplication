import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Products = ({ route, navigation }) => {
  const { selectedProduct: selectedCategory } = route.params;
  const [products, setProducts] = useState([]);



  const fetchProducts = async (categoryId) => {
    try {
      const response = await fetch(
        `https://apiv5.akilliticaretim.com/api/v5/sf/product/category_products?Id=${categoryId}&PageNumber=1&PageSize=10`,
        {
          method: "GET",
          headers: {
            GUID: "24BE-DB0E-D75E-4060",
          },
        }
      );

      const result = await response.json();

      if (result.status) {
        const products = result.data;

        console.log(result.data);
        if (products) {
          return products;
        } else {
          console.error("Products is undefined");
          return [];
        }
      } else {
        console.error("API Error:", result);
        return [];
      }
    } catch (error) {
      console.error("API Error:", error);
      return [];
    }
  };
  useEffect(() => {
    const fetchProductsAndSet = async () => {
      try {
        const result = await fetchProducts(selectedCategory.id);
        console.log(selectedCategory.id);
        if (result && result.length > 1) {
          setProducts(result.slice(1));
        } else {
          console.error("No products found.");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    fetchProductsAndSet();
  }, [selectedCategory]);
  
  const getAllItems = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys);
      console.log("All items in AsyncStorage:", items);
    } catch (error) {
      console.error("Error getting all items from AsyncStorage:", error);
    }
  };
  const addToCart = async (item) => {
    try {
      const existingCart = await AsyncStorage.getItem("cart");
      let cart = existingCart ? JSON.parse(existingCart) : [];

      const isAlreadyAdded = cart.some((cartItem) => cartItem.id === item.id);
      if (!isAlreadyAdded) {
        cart.push(item);
        getAllItems();
        await AsyncStorage.setItem("cart", JSON.stringify(cart));
        console.log("Item added to cart:", item);
      } else {
        console.log("Item is already in the cart:", item);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  const handleProductPress = async (product) => {
    try {
      await addToCart(product);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  const handleCartPress = async (subcategory) => {
    navigation.navigate("Cart", { selectedProduct: subcategory });
  };

  const rednerProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.verticalButton}
      onPress={() => handleProductPress(item)}
    >
      <Image
        source={{ uri: item.productImages[0].imagePath }}
        style={styles.ImageCategory}
      />
      <View style={styles.buttonUnderTextView}>
        <Text style={styles.buttonUnderText}>{item.stockName}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      {/* FlatList */}
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
          numColumns={3}
          data={products}
          renderItem={rednerProductItem}
          keyExtractor={(item) =>
            item.categoryName
              ? item.categoryName.toString()
              : Math.random().toString()
          }
        />
      </View>
      {/* Cart */}
      <View style={styles.cartContainer}>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => handleCartPress(selectedCategory)}
        >
          <Image source={require("../assets/cart.png")} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Products;
