// MenuScreen.js
import React from 'react';
import { View } from 'react-native';
import VerticalList from './VerticalList';
import { styles } from './styles';

const MenuScreen = ({ navigation }) => {
  const handleCategoryPress = (category) => {
    console.log('Seçilen Kategori:', category);
    navigation.navigate('SubCategory', { selectedCategory: category });
  };

  return (
    <View style={styles.verticalContainer}>
      <VerticalList handleCategoryPress={handleCategoryPress} />
    </View>
  );
};

export default MenuScreen;
