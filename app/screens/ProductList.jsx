import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { firestore } from '../config/firebaseConfig';
import { collection, query, where, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import tw from 'twrnc';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params || {}; // Get email parameter from navigation

  const fetchProducts = useCallback(() => {
    if (!email) {
      Alert.alert("Error", "User email is missing");
      return;
    }

    const q = query(
      collection(firestore, 'Products'),
      where('farmerEmail', '==', email)
    );

    // Real-time listener
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const productList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productList);
    }, (error) => {
      Alert.alert("Error", `Error fetching products: ${error.message}`);
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, [email]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleAddProductPress = () => {
    if (!email) {
      Alert.alert("Error", "User email is missing");
      return;
    }
    navigation.navigate('screens/AddProduct', { email });
  };

  const handleEditPress = (product) => {
    navigation.navigate('screens/ProductDetails', { productId: product.id });
  };

  const handleDeletePress = async (productId) => {
    try {
      await deleteDoc(doc(firestore, 'Products', productId));
      Alert.alert("Success", "Product deleted successfully");
    } catch (error) {
      Alert.alert("Error", `Error deleting product: ${error.message}`);
    }
  };

  const renderItem = ({ item }) => {
    const price = item.pricePerUnit !== undefined && item.pricePerUnit !== null ? item.pricePerUnit : 0;

    return (
      <View style={tw`p-4 mb-4 border rounded-lg shadow-lg bg-white border-gray-300`}>
        {item.image && (
          <Image
            source={{ uri: item.image }}
            style={tw`w-full h-48 mb-2 rounded-lg`}
            resizeMode="cover"
          />
        )}
        <Text style={tw`text-lg font-semibold text-gray-800`}>{item.productName}</Text>
        <Text style={tw`text-gray-600 mt-1`}>{item.description}</Text>
        <Text style={tw`text-gray-800 mt-2 text-lg font-bold`}>
          Rs {price.toFixed(2)} per kg
        </Text>
        <View style={tw`flex-row mt-4`}>
          <TouchableOpacity
            onPress={() => handleEditPress(item)}
            style={tw`flex-1 bg-yellow-500 p-3 rounded-lg mr-2`}
          >
            <Text style={tw`text-center text-white font-bold`}>Edit Product</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDeletePress(item.id)}
            style={tw`flex-1 bg-red-500 p-3 rounded-lg`}
          >
            <Text style={tw`text-center text-white font-bold`}>Delete Product</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={tw`flex-1 p-5 bg-gray-100`}>
      <Text style={tw`text-3xl font-bold mb-6 text-gray-900`}>Product List</Text>
      {products.length === 0 ? (
        <View style={tw`flex-1 justify-center items-center`}>
          <Text style={tw`text-lg text-gray-500`}>No products available</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={tw`pb-4`}
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            fetchProducts();
          }}
        />
      )}
      <TouchableOpacity
        onPress={handleAddProductPress}
        style={tw`bg-green-500 p-4 rounded-lg mt-6 shadow-lg`}
      >
        <Text style={tw`text-center text-white text-lg font-bold`}>Add Product</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductList;
