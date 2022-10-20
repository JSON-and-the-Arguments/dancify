import { View, Text, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Navbar from '../components/Navbar';
import { signIn, signUp } from '../../firebase';
import ScreenTemplate from '../components/ScreenTemplate';
import { LinearGradient } from 'expo-linear-gradient';



const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('signUp');

  const navigation = useNavigation();
  const addUser = async () => {
    if (mode === 'signUp') {
      await signUp(email, password).then(() => {
        navigation.navigate('CreateProfile');
      })
      .catch((err) => {
        Alert.alert('This account already exist', 'Login to start using the app')
      })
    }
    if (mode === 'logIn') {
      await signIn(email, password).then(() => {
        navigation.navigate('Home');
      })
      .catch((err) => {
        Alert.alert("You don't have an account", "Create one first")
      })
    }
  };

  return (
    <ScreenTemplate>
    <View>
      <Navbar />
      <View className="  justify-center items-center mt-40  space-y-5">
         
        <Text className='text-white text-xl'>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          className="mt-1 block w-80 px-3 py-2 bg-white border border-purple-600 rounded-md text-sm shadow-sm placeholder-slate-400"
          placeholder="email"
          required
          keyboardType="default"
        />
        <Text className='text-white text-xl'>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          className="mt-1 block w-80 px-3 py-2 bg-white border border-purple-600 rounded-md text-sm shadow-sm placeholder-slate-400"
          placeholder="password"
          required
          keyboardType="default"
        />
        <View>
        <Button
            title={mode === 'signUp' ? 'Sign Up' : 'Log in'}
            disabled={!email || !password}
            onPress={addUser}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full-5"
          />
        <LinearGradient
        colors={[ '#A4508B','#5F0A87']}
        className="mt-10 px-10 py-5 rounded-md border-none"
        // style={styles.button}
        >
          
            <TouchableOpacity
                onPress={()=> addUser}>
                
           
            <Text className='text-white text-3xl'>{mode === 'signUp' ? 'Sign Up' : 'Log in'}
            </Text>
            </TouchableOpacity>
        </LinearGradient>
          
        </View>
        
        <TouchableOpacity
          onPress={() =>
            mode === 'signUp' ? setMode('logIn') : setMode('signUp')
          }
        >
          <Text className='text-white text-xl'>
            {mode === 'signUp'
              ? 'Already have an account? Log in'
              : "Don't have an account? Sign Up"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScreenTemplate>
  );
};

export default SignUp;