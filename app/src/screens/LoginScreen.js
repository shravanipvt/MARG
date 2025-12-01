import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Colors from '../theme/Colors';
import { auth } from '../../firebase';
import { signInWithPhoneNumber } from 'firebase/auth';


export default function LoginScreen({ navigation }) {
const [phone, setPhone] = useState('');
const [code, setCode] = useState('');
const [confirmResult, setConfirmResult] = useState(null);


const sendOTP = async () => {
try {
// Note: in Firebase v9 modular, phone auth requires Recaptcha for web; in native apps use native flows
const confirmation = await signInWithPhoneNumber(auth, phone);
setConfirmResult(confirmation);
Alert.alert('OTP sent');
} catch (e) {
Alert.alert('Error sending OTP', e.message);
}
};


const confirm = async () => {
try {
if (!confirmResult) return;
await confirmResult.confirm(code);
navigation.replace('Home');
} catch (e) {
Alert.alert('Invalid code');
}
};


return (
<View style={{ flex: 1, backgroundColor: Colors.background, padding: 20 }}>
<Text style={{ color: Colors.textPrimary, fontSize: 32, marginTop: 40 }}>MARG</Text>


<Text style={{ color: '#bbb', marginTop: 12 }}>Phone number (with country code)</Text>
<TextInput placeholderTextColor="#666" placeholder="+91xxxxxxxxxx" style={{ color: '#fff', borderBottomWidth: 1, borderBottomColor: '#222', marginTop: 8 }} value={phone} onChangeText={setPhone} />


<TouchableOpacity onPress={sendOTP} style={{ marginTop: 20 }}>
<Text style={{ color: Colors.accent }}>Send OTP</Text>
</TouchableOpacity>


{confirmResult && (
<>
<TextInput placeholderTextColor="#666" placeholder="Enter OTP" style={{ color: '#fff', borderBottomWidth: 1, borderBottomColor: '#222', marginTop: 20 }} value={code} onChangeText={setCode} />
<TouchableOpacity onPress={confirm} style={{ marginTop: 20 }}>
<Text style={{ color: Colors.accent }}>Verify</Text>
</TouchableOpacity>
</>
)}
</View>
);
}
