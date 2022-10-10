import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import {useLayoutEffect} from 'react'
import { NavigationContainer, useNavigation  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/components/Home'
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { setDoc, doc } from 'firebase/firestore';
// login details for firebase
import { firebaseConfig } from './config';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Stack = createNativeStackNavigator();

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


    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    </NavigationContainer>

  );
}


