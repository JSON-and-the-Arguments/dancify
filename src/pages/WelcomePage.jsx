import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ScreenTemplate from '../components/ScreenTemplate';

const WelcomePage = () => {
  const navigation = useNavigation();

  return (
    <ScreenTemplate>
      <View
        style={styles.container}
        // className="bg-red-500"
      >
        <Text className="text-white text-3xl mt-40">Welcome to</Text>
        <Text className="text-white text-5xl mt-40">Dancify</Text>
        <MaterialCommunityIcons name="dance-ballroom" size={40} color="white" />

        <LinearGradient
          colors={['#A4508B', '#5F0A87']}
          className="mt-10 px-10 py-5 rounded-md border-none"
          // style={styles.button}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignUp');
            }}
          >
            <Text className="text-white text-3xl">Enter</Text>
          </TouchableOpacity>
        </LinearGradient>
        <Text className="mt-20">by JSON and the Arguments</Text>
      </View>
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  button: {
    alignItems: 'center',
    borderRadius: 5,
  },
});

export default WelcomePage;
