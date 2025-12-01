import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import Colors from '../theme/Colors';
import * as Location from 'expo-location';
import { startLocationShare } from '../services/LocationService';


export default function HomeScreen({ navigation }) {
const [loc, setLoc] = useState(null);


useEffect(() => {
(async () => {
const { status } = await Location.requestForegroundPermissionsAsync();
if (status === 'granted') {
startLocationShare();
}
})();
}, []);


return (
<View style={{ flex: 1, backgroundColor: Colors.background, padding: 20 }}>
<Text style={{ color: Colors.textPrimary, fontSize: 22 }}>Welcome</Text>
<Button title="SOS" color={Colors.danger} onPress={() => navigation.navigate('SOS')} />
<Button title="Guardians" onPress={() => navigation.navigate('Guardians')} />
</View>
);
}
