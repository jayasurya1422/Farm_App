import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useRouter } from 'expo-router';

const RegisterScreen = () => {
  const [userType, setUserType] = useState('farmer'); // Default user type
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleRegister = () => {
    if (email === '' || password === '' || confirmPassword === '') {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    // Add your registration logic here
    Alert.alert('Success', 'Registration Successful');

    // Navigate to the login screen after successful registration
    router.push('/screens/Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      {/* Toggle Buttons */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, userType === 'farmer' && styles.activeButton]}
          onPress={() => setUserType('farmer')}
        >
          <Text style={styles.toggleText}>Farmer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, userType === 'retailer' && styles.activeButton]}
          onPress={() => setUserType('retailer')}
        >
          <Text style={styles.toggleText}>Retailer</Text>
        </TouchableOpacity>
      </View>

      {/* Conditional Form Rendering */}
      <View style={styles.formContainer}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCompleteType="email"
          textContentType="emailAddress"
          mode="outlined"
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
          autoCompleteType="password"
          textContentType="password"
          mode="outlined"
        />
        <TextInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
          secureTextEntry
          autoCompleteType="password"
          textContentType="password"
          mode="outlined"
        />
        <Text style={styles.roleText}>Role: {userType.charAt(0).toUpperCase() + userType.slice(1)}</Text>
        <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.loginLinkContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/screens/Login')}>
          <Text style={styles.loginLink}>Go to Login</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  toggleButton: {
    padding: 12,
    margin: 5,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#b0c4de', // Light color border
    backgroundColor: '#ffffff', // Light background color
    elevation: 3, // Shadow effect for Android
    shadowColor: '#000', // Shadow effect for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  activeButton: {
    backgroundColor: '#b0c4de', // Light blue background for active button
  },
  toggleText: {
    fontSize: 16,
    color: '#333',
  },
  formContainer: {
    marginTop: 16,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff', // Light color background
    shadowColor: '#000', // Shadow effect for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // Shadow effect for Android
  },
  roleText: {
    fontSize: 18,
    marginVertical: 12,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    marginBottom: 16,
  },
  registerButton: {
    marginTop: 20,
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#4a90e2', // Light blue background for register button
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#ffffff', // White text color for the button
    fontSize: 18, // Increased font size
    fontWeight: 'bold',
  },
  loginLinkContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    color: '#333',
    fontSize: 20,
  },
  loginLink: {
    color: '#4a90e2', // Light blue color for link
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default RegisterScreen;
