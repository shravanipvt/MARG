import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import SOSScreen from './src/screens/SOSScreen';
import GuardiansScreen from './src/screens/GuardiansScreen';
import { initializeApp } from 'firebase/app';
import './firebase';


const Stack = createNativeStackNavigator();


export default function App() {
return (
<NavigationContainer>
<Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#000' }, headerTintColor: '#fff' }}>
<Stack.Screen name="Login" component={LoginScreen} />
<Stack.Screen name="Home" component={HomeScreen} />
<Stack.Screen name="Guardians" component={GuardiansScreen} />
<Stack.Screen name="SOS" component={SOSScreen} />
</Stack.Navigator>
</NavigationContainer>
);
}
