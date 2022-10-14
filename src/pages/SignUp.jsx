import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useLayoutEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navbar from '../components/Navbar';
import { initializeApp } from 'firebase/app';
import {
  Firestore,
  getFirestore,
  initializeFirestore,
  firestore,
  getDocs,
} from 'firebase/firestore';
import {
  setDoc,
  doc,
  updateDoc,
  getDoc,
  collection,
  query,
} from 'firebase/firestore';
import { firebaseConfig } from '../../config';
import { getUsers } from '../../queryutils';

getUsers();

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  

  const addUser = () => {
    setDoc(doc(db, 'users', `${username}`), {
      username: username,
      email: email,
      password: password,
    });
    
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      headerTitle: 'Home',
    });
  }, []);

  return (
    <View className='flex-1'>
      <Navbar />
      

      

      <View className='justify-center items-center mt-10'>
        <TouchableOpacity onPress={() => navigation.navigate('MyLocation')}>
          <Text className='text-5xl'>Location</Text>
        </TouchableOpacity>
      </View>

      
      
      <View className="flex-1  justify-center items-center mt-5  space-y-5">
        <Text>Username</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          className="mt-1 block w-80 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
          placeholder="username"
          required
          keyboardType="default"
        />
        <Text>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          className="mt-1 block w-80 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
          placeholder="email"
          required
          keyboardType="default"
        />
        <Text>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          className="mt-1 block w-80 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
          placeholder="password"
          required
          keyboardType="default"
        />
        <View>
          <Button
            title="Sign Up"
            onPress={addUser}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full-5"
          />
        </View>
      </View>
    </View>
  );
};

export default SignUp;