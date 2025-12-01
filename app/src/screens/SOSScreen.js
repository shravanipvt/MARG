import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Colors from '../theme/Colors';
import { sendSOS } from '../services/GuardianService';


export default function SOSScreen() {
const triggerSOS = async () => {
try {
await sendSOS();
Alert.alert('SOS sent to guardians');
} catch (e) {
Alert.alert('Error sending SOS', e.message || 'unknown');
}
};


return (
<View style={{ flex: 1, backgroundColor: Colors.background, justifyContent: 'center', alignItems: 'center' }}>
<TouchableOpacity onPress={triggerSOS} style={{ backgroundColor: Colors.danger, padding: 40, borderRadius: 100 }}>
<Text style={{ color: '#fff', fontSize: 28 }}>SOS</Text>
</TouchableOpacity>
</View>
);
}
