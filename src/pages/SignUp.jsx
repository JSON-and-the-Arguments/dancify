import { View, Text, TextInput, Button, Alert, Pressable } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Navbar from '../components/Navbar';
import { signIn, signUp } from '../../firebase';
import Ionicons from '@expo/vector-icons/Ionicons';
import ScreenTemplate from '../components/ScreenTemplate';
import { LinearGradient } from 'expo-linear-gradient';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('signUp');
  const [checkBadEmail, setBadEmail] = useState(false);
  const [checkBadPassword, setBadPassword] = useState(false);
  const [checkValidEmail, setCheckValidEmail] = useState(false);
  const [checkValidPassword, setCheckValidPassword] = useState(false);

  const navigation = useNavigation();

  const handleEmail = (text) => {
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    setEmail(text);
    if (!regex.test(text)) {
      setBadEmail(true);
      setCheckValidEmail(false);
    } else {
      setBadEmail(false);
      setCheckValidEmail(true);
    }
  };

  const handlePassword = (text) => {
    const regex =
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
    setPassword(text);
    if (!regex.test(text)) {
      setBadPassword(true);
      setCheckValidPassword(false);
    } else {
      setBadPassword(false);
      setCheckValidPassword(true);
    }
  };

  const addUser = async () => {
    if (mode === 'signUp') {
      try {
        await signUp(email, password);
        navigation.navigate('CreateProfile');
      } catch (err) {
        Alert.alert('User Already Exists', 'Try logging in instead');
      }
    }
    if (mode === 'logIn') {
      try {
        await signIn(email, password);
        navigation.navigate('Home');
      } catch (err) {
        Alert.alert(
          'Incorrect User / Password',
          'Have you created an account yet?'
        );
      }
    }
  };

  return (
    <ScreenTemplate>
      <View>
        <Navbar />
        <View className="  justify-center items-center mt-5  space-y-5">
          <Text>Email</Text>
          <TextInput
            value={email}
            onChangeText={handleEmail}
            className="mt-1 block w-80 px-3 py-2 bg-white border border-purple-600 rounded-md text-sm shadow-sm placeholder-slate-400"
            placeholder="Email"
            required
            keyboardType="default"
          />
          {checkBadEmail ? (
            <Text>
              <Ionicons name="md-close-circle" size={14} color="red" />
              Email Not Valid
            </Text>
          ) : checkValidEmail ? (
            <Text>
              <Ionicons name="md-checkmark-circle" size={14} color="green" />
              Email Valid
            </Text>
          ) : (
            <Text></Text>
          )}
          <Text className="text-white text-xl">Password</Text>
          <TextInput
            value={password}
            onChangeText={handlePassword}
            className="mt-1 block w-80 px-3 py-2 bg-white border border-purple-600 rounded-md text-sm shadow-sm placeholder-slate-400"
            placeholder="Password"
            required
            keyboardType="default"
            secureTextEntry={true}
          />
          {checkBadPassword ? (
            <Text>
              <Ionicons name="md-close-circle" size={14} color="red" />
              Password Not Valid
            </Text>
          ) : checkValidPassword ? (
            <Text>
              <Ionicons name="md-checkmark-circle" size={14} color="green" />
              Password Valid
            </Text>
          ) : (
            <Text></Text>
          )}
          <View>
            <Button
              title={mode === 'signUp' ? 'Sign Up' : 'Log in'}
              disabled={!checkValidEmail || !checkValidPassword}
              onPress={addUser}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full-5"
            />
            <LinearGradient
              colors={['#A4508B', '#5F0A87']}
              className="mt-10 px-10 py-5 rounded-md border-none"
              // style={styles.button}
            >
              <TouchableOpacity onPress={() => addUser}>
                <Text className="text-white text-3xl">
                  {mode === 'signUp' ? 'Sign Up' : 'Log in'}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
          <Pressable
            onPress={() =>
              mode === 'signUp' ? setMode('logIn') : setMode('signUp')
            }
          >
            <Text className="text-white text-xl">
              {mode === 'signUp'
                ? 'Already have an account? Log in'
                : "Don't have an account? Sign Up"}
            </Text>
          </Pressable>
        </View>
      </View>
    </ScreenTemplate>
  );
};

export default SignUp;
