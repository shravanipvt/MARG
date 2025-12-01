import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Colors from '../theme/Colors';
import { db, auth } from '../../firebase';
import { collection, addDoc, query, where, getDocs, onSnapshot } from 'firebase/firestore';


export default function GuardiansScreen() {
const [phone, setPhone] = useState('');
const [guardians, setGuardians] = useState([]);
const uid = auth.currentUser?.uid;


useEffect(() => {
if (!uid) return;
const col = collection(db, 'users', uid, 'guardians');
const unsub = onSnapshot(col, (snap) => setGuardians(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
return () => unsub();
}, [uid]);


const addGuardian = async () => {
if (!uid) return;
await addDoc(collection(db, 'users', uid, 'guardians'), { phone, addedAt: Date.now() });
setPhone('');
};


return (
<View style={{ flex: 1, backgroundColor: Colors.background, padding: 20 }}>
<Text style={{ color: Colors.textPrimary, fontSize: 20 }}>Guardians</Text>
<TextInput placeholderTextColor="#666" placeholder="+91xxxxxxxxxx" style={{ color: '#fff', borderBottomWidth: 1, borderBottomColor: '#222', marginTop: 8 }} value={phone} onChangeText={setPhone} />
<TouchableOpacity onPress={addGuardian} style={{ marginTop: 12 }}>
<Text style={{ color: Colors.accent }}>Add Guardian</Text>
</TouchableOpacity>


<FlatList data={guardians} keyExtractor={(i) => i.id} renderItem={({ item }) => (
<View style={{ paddingVertical: 12 }}>
<Text style={{ color: '#fff' }}>{item.phone}</Text>
</View>
)} />
</View>
);
}
