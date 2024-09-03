import React, { useState } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useRouter } from 'expo-router';
import tw from 'twrnc';
import { firestore, auth } from '../config/firebaseConfig'; // Import Firebase configuration
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore methods

const RegisterScreen = () => {
  const [userType, setUserType] = useState('farmer'); // Default user type
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    if (email === '' || password === '' || confirmPassword === '') {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      // Add user data to Firestore
      await addDoc(collection(firestore, 'User-data'), {
        email,
        password, // Note: Storing passwords in plaintext is a security risk. Use authentication methods to handle passwords.
        role: userType.charAt(0).toUpperCase() + userType.slice(1),
      });

      Alert.alert('Success', 'Registration Successful');

      // Navigate to the login screen after successful registration
      router.push('/screens/Login');
    } catch (error) {
      Alert.alert('Error', `Registration failed: ${error.message}`);
    }
  };

  return (
    <View style={tw`flex-1 justify-center p-4 bg-blue-50`}>
      <Text style={tw`text-2xl font-bold mb-6 text-center text-gray-800`}>Register</Text>

      {/* Toggle Buttons */}
      <View style={tw`flex-row justify-center mb-6`}>
        <TouchableOpacity
          style={tw`px-5 py-4 mx-2 rounded-full border-4 border-blue-200 bg-white shadow ${userType === 'farmer' ? 'bg-blue-200' : ''}`}
          onPress={() => setUserType('farmer')}
        >
          <Text style={tw`text-base text-gray-800`}>Farmer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`px-5 py-4 mx-2 rounded-full border-4 border-blue-200 bg-white shadow ${userType === 'retailer' ? 'bg-blue-200' : ''}`}
          onPress={() => setUserType('retailer')}
        >
          <Text style={tw`text-base text-gray-800`}>Retailer</Text>
        </TouchableOpacity>
      </View>

      {/* Conditional Form Rendering */}
      <View style={tw`mt-4 p-5 rounded-lg bg-white shadow-lg`}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={tw`mb-4 bg-white`}
          keyboardType="email-address"
          autoCompleteType="email"
          textContentType="emailAddress"
          mode="outlined"
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          style={tw`mb-4 bg-white`}
          secureTextEntry
          autoCompleteType="password"
          textContentType="password"
          mode="outlined"
        />
        <TextInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={tw`mb-4 bg-white`}
          secureTextEntry
          autoCompleteType="password"
          textContentType="password"
          mode="outlined"
        />
        <Text style={tw`text-lg my-3 text-center text-gray-800`}>
          Role: {userType.charAt(0).toUpperCase() + userType.slice(1)}
        </Text>

        {/* Register Button Centered */}
        <View style={tw`items-center`}>
          <TouchableOpacity onPress={handleRegister} style={tw`w-full mt-5 p-4 rounded bg-blue-500`}>
            <Text style={tw`text-white text-lg font-bold text-center`}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Account Link Centered */}
      <View style={tw`mt-5 flex-row justify-center`}>
        <Text style={tw`text-gray-800 text-lg`}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/screens/Login')}>
          <Text style={tw`text-blue-500 underline font-bold text-lg`}>Go to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;
