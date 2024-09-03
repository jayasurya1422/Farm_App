import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useRouter } from 'expo-router';
import tw from 'twrnc';
import { firestore } from '../config/firebaseConfig'; // Import Firebase configuration
import { query, collection, where, getDocs } from 'firebase/firestore'; // Import Firestore methods

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('farmer'); // Default role
  const router = useRouter();

  const handleLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      // Query Firestore to check if the user exists with the given email, password, and role
      const q = query(
        collection(firestore, 'User-data'),
        where('email', '==', email),
        where('password', '==', password),
        where('role', '==', role.charAt(0).toUpperCase() + role.slice(1))
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // User exists
        Alert.alert('Success', 'Login Successful');
        // Navigate to home screen (you will change this to the actual home page later)
        router.push('/screens/Register'); // Redirect to register page or home page
      } else {
        // User does not exist
        Alert.alert('Error', 'Invalid credentials. Please check your email, password, and role.');
      }
    } catch (error) {
      Alert.alert('Error', `Login failed: ${error.message}`);
    }
  };

  const handleRegister = () => {
    router.push('/screens/Register');
  };

  return (
    <View style={tw`flex-1 justify-center p-4 bg-white`}>
      <Text style={tw`text-2xl mb-6 text-center text-black`}>Farmers Market Login</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        style={tw`mb-4 bg-white text-black`}
        keyboardType="email-address"
        autoCompleteType="email"
        textContentType="emailAddress"
        mode="outlined"
        theme={{ colors: { text: 'black', placeholder: 'gray', background: '#ffffff', primary: 'gray' } }}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        style={tw`mb-4 bg-white text-black`}
        secureTextEntry
        autoCompleteType="password"
        textContentType="password"
        mode="outlined"
        theme={{ colors: { text: 'black', placeholder: 'gray', background: '#ffffff', primary: 'gray' } }}
      />
      {/* Role Selection */}
      <View style={tw`flex-row justify-center mb-6`}>
        <TouchableOpacity
          style={tw`px-5 py-4 mx-2 rounded-full border-4 border-blue-200 bg-white shadow ${role === 'farmer' ? 'bg-blue-200' : ''}`}
          onPress={() => setRole('farmer')}
        >
          <Text style={tw`text-base text-gray-800`}>Farmer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`px-5 py-4 mx-2 rounded-full border-4 border-blue-200 bg-white shadow ${role === 'retailer' ? 'bg-blue-200' : ''}`}
          onPress={() => setRole('retailer')}
        >
          <Text style={tw`text-base text-gray-800`}>Retailer</Text>
        </TouchableOpacity>
      </View>
      <View style={tw`items-center`}>
        <TouchableOpacity onPress={handleLogin} style={tw`w-full mt-5 p-4 rounded bg-blue-500`}>
          <Text style={tw`text-white text-lg font-bold text-center`}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegister} style={tw`w-full mt-5 p-4 rounded border border-blue-500`}>
          <Text style={tw`text-blue-500 text-lg font-bold text-center`}>Don't have an account? Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
