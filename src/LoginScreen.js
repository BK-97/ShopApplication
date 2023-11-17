// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('destek@akilliticaret.com');
  const [password, setPassword] = useState('at253545');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://apiv5.akilliticaretim.com/api/v5/sf/auth/login', {
        method: 'POST',
        headers: {
          'GUID': '24BE-DB0E-D75E-4060',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const result = await response.json();

      if (result.status) {
        navigation.navigate('Home');
      } else {
        Alert.alert('Login Failed.');
      }
      
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Error.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Username:</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
        onFocus={() => console.log('TextInput Focused')}
      />

      <Text>Password:</Text>
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
