import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
const WelcomePage = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={styles.container}
      // className="bg-red-500"
    >
      <LinearGradient
        colors={['rgba(255,0,0,0.4)', 'rgba(255,0,0,0.6)', 'rgba(255,0,0,0.8)']}
        style={styles.background}
      />
      <Text className="text-white text-lg mt-40">Welcome to</Text>
      <Text className="text-white text-4xl mt-40">Dancify</Text>
      <MaterialCommunityIcons name="dance-ballroom" size={40} color="white" />

      <LinearGradient
        colors={['rgb(119, 0, 200)', 'rgb(95, 0, 160)', 'rgb(60, 0, 100)']}
        className="mt-10 px-10 py-5 rounded-md border-none"
        // style={styles.button}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SignUp');
          }}
        >
          <Text className="text-white text-lg">Start here</Text>
        </TouchableOpacity>
      </LinearGradient>
      <Text className="mt-20">by JSON and the Arguments</Text>
    </SafeAreaView>
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
