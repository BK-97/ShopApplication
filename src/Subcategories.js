// Subcategories.js
import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Image, FlatList, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomButton from './Button';
import { styles } from "./styles";

const Subcategories = ({ route }) => {
  const navigation = useNavigation();
  const [subcategories, setSubcategories] = useState([]);
  const { selectedSubcategory } = route.params;
  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await fetch(
          `https://apiv5.akilliticaretim.com/api/v5/ad/product/categories?parentId=${selectedSubcategory.id}`,
          {
            method: "GET",
            headers: {
              "GUID": "24BE-DB0E-D75E-4060",
            },
          }
        );

        const result = await response.json();

        if (result.status) {
          setSubcategories(result.data.categories);
        } else {
          console.error("API Error:", result);
        }
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    fetchSubcategories();
  }, [selectedSubcategory]);

  const renderSubcategoryItem = ({ item }) => {
    return (
    <TouchableOpacity
      style={styles.verticalButton}
      onPress={() => handleSubCategoryPress(item)}
    >
      <Image
        source={{ uri: item.imagePath.imagePath }}
        style={styles.ImageCategory}
      />
      <View style={styles.buttonUnderTextView}>
        <Text style={styles.buttonUnderText}>{item.categoryName}</Text>
      </View>
    </TouchableOpacity>
    );
  };

  const menuButton = () => {
    navigation.navigate("Menu");
  };

  const notificationButton = () => {
    Alert.alert('Will Be Updated!')

  };

  const locationButton = () => {
    Alert.alert('Will Be Updated!')
  };

  const handleSubCategoryPress = (category) => {
    navigation.navigate("Products", { selectedProduct: category });
  };

  const handleCartPress = () => {
    navigation.navigate("Cart");
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Upper Row */}
      <View style={styles.upperRow}>
        {/* Menu Button */}
        <CustomButton onPress={menuButton} iconSource={require("../assets/menuIcon.png")} style={styles.icon} />

        {/* Logo */}
        <Image source={require("../assets/Logo.png")} style={styles.logo} />

        {/* Location Button */}
        <CustomButton onPress={locationButton} iconSource={require("../assets/location.png")} style={styles.icon} />

        {/* Notification Button */}
        <CustomButton onPress={notificationButton} iconSource={require("../assets/notification.png")} style={styles.icon} />
      </View>

      {/* SubCategoryList */}
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
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
        <CustomButton onPress={handleCartPress} iconSource={require("../assets/cart.png")} style={styles.icon} />
      </View>
    </View>
  );
};

export default Subcategories;
