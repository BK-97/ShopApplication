// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/LoginScreen";
import HomeScreen from "./src/HomeScreen";
import MenuScreen from "./src/MenuScreen";
import ShoppingCart from "./src/ShoppingCart";
import Subcategories from "./src/Subcategories";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Products" component={Subcategories} />
        <Stack.Screen name="Cart" component={ShoppingCart} />
        <Stack.Screen name="Menu" component={MenuScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
