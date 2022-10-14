import { View, Text, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Navbar from '../components/Navbar';
import { db, signUp } from '../../firebase';
import { setDoc, doc } from 'firebase/firestore';
import { getUsers } from '../../queryutils';

getUsers();

const Home = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const addUser = () => {
    signUp(email, password).then(() => {
      // need to change this or remove it
      setDoc(doc(db, 'users', `${username}`), {
        username: username,
        email: email,
        password: password,
      }).then(() => {
        navigation.navigate('SignUp');
      });
    });
  };

  return (
    <View>
      <Navbar />
      <View className="  justify-center items-center mt-5  space-y-5">
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

export default Home;
