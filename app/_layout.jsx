import React from 'react';
import { Stack } from 'expo-router';

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="screens/Login" options={{ headerShown: false }} />
      <Stack.Screen name="screens/Register" options={{ headerShown: false }} />
      <Stack.Screen name="screens/ProductList" options={{ headerShown: false }} />
      <Stack.Screen name="screens/ProductDetails" options={{ headerShown: false }} />
      <Stack.Screen name="screens/AddProduct" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
