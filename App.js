import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { setDoc, doc } from 'firebase/firestore';
// login details for firebase
import { firebaseConfig } from './config';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// variables for connection to form
const username = 'username1';
const email = 'username@gmail.com';
const password = 'password123';

const addUser = async () => {
  const setDocDetails = setDoc(doc(db, 'users', `${username}`), {
    username: username,
    email: email,
    password: password,
  });
  await setDocDetails;
};

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title="submit" onPress={addUser}></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
