import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { firestore } from '../config/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import tw from 'twrnc';

const ProductDetails = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [pricePerUnit, setPricePerUnit] = useState('');
  const [quantityAvailable, setQuantityAvailable] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const { productId } = route.params || {}; // Get productId from navigation

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!productId) {
        Alert.alert("Error", "Product ID is missing");
        return;
      }

      try {
        // Fetch product details from Firestore
        const productRef = doc(firestore, 'Products', productId);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          const productData = productSnap.data();
          // Populate form fields with the existing product data
          setProductName(productData.productName);
          setDescription(productData.description);
          setPricePerUnit(productData.pricePerUnit.toString()); // Convert to string for input field
          setQuantityAvailable(productData.quantityAvailable.toString()); // Convert to string
          setCategory(productData.category);
          setImage(productData.image || '');
        } else {
          Alert.alert("Error", "Product not found");
          navigation.goBack();
        }
      } catch (error) {
        Alert.alert("Error", `Error fetching product: ${error.message}`);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleSavePress = async () => {
    if (!productName || !description || !pricePerUnit || !quantityAvailable || !category) {
      Alert.alert("Error", "Please fill out all fields");
      return;
    }

    try {
      const productRef = doc(firestore, 'Products', productId);

      // Update product details in Firestore
      await updateDoc(productRef, {
        productName,
        description,
        pricePerUnit: parseFloat(pricePerUnit), // Convert to number before saving
        quantityAvailable: parseInt(quantityAvailable), // Convert quantity to number before saving
        category,
        image,
      });

      Alert.alert("Success", "Product updated successfully");
      navigation.goBack(); // Go back to the product list
    } catch (error) {
      Alert.alert("Error", `Error updating product: ${error.message}`);
    }
  };

  return (
    <ScrollView style={tw`flex-1 p-4 bg-gray-100`}>
      <View style={tw`bg-white p-6 rounded-lg shadow-md`}>
        <Text style={tw`text-2xl font-bold mb-6 text-center text-gray-800`}>Edit Product</Text>

        <TextInput
          style={tw`border border-gray-300 p-3 rounded-lg mb-4 shadow-sm bg-gray-50`}
          placeholder="Product Name"
          value={productName}
          onChangeText={setProductName}
        />

        <TextInput
          style={tw`border border-gray-300 p-3 rounded-lg mb-4 shadow-sm bg-gray-50`}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <TextInput
          style={tw`border border-gray-300 p-3 rounded-lg mb-4 shadow-sm bg-gray-50`}
          placeholder="Price Per Unit"
          keyboardType="numeric"
          value={pricePerUnit}
          onChangeText={setPricePerUnit}
        />

        <TextInput
          style={tw`border border-gray-300 p-3 rounded-lg mb-4 shadow-sm bg-gray-50`}
          placeholder="Quantity Available"
          keyboardType="numeric"
          value={quantityAvailable}
          onChangeText={setQuantityAvailable}
        />

        <TextInput
          style={tw`border border-gray-300 p-3 rounded-lg mb-4 shadow-sm bg-gray-50`}
          placeholder="Category"
          value={category}
          onChangeText={setCategory}
        />

        <TextInput
          style={tw`border border-gray-300 p-3 rounded-lg mb-4 shadow-sm bg-gray-50`}
          placeholder="Image URL"
          value={image}
          onChangeText={setImage}
        />

        <TouchableOpacity
          style={tw`bg-green-500 p-4 rounded-lg shadow-md`}
          onPress={handleSavePress}
        >
          <Text style={tw`text-white text-center text-lg font-semibold`}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProductDetails;
