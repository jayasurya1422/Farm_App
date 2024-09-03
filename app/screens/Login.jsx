import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useRouter } from 'expo-router'; // Ensure this is properly imported

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    // Add your login logic here
    Alert.alert('Success', 'Login Successful');
    // router.push('/screens/Home'); // Navigate to the home screen after login
  };

  const handleRegister = () => {
    router.push('/screens/Register'); // Navigate to Register screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Farmers Market Login</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
        keyboardType="email-address"
        autoCompleteType="email"
        textContentType="emailAddress"
        mode="outlined"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        style={styles.input}
        secureTextEntry
        autoCompleteType="password"
        textContentType="password"
        mode="outlined"
      />
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
        <Text style={styles.registerText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f0f8ff', // Light color background
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#ffffff', // Light color background for input fields
  },
  loginButton: {
    marginTop: 20,
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#4a90e2', // Light blue background for login button
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#ffffff', // White text color for the button
    fontSize: 20, // Increased font size
    fontWeight: 'bold',
  },
  registerButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ffffff', // Light color background for register button
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4a90e2', // Light blue border color
  },
  registerText: {
    color: '#4a90e2', // Light blue color for the text
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
