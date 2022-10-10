import { View, Text } from 'react-native'
import React from 'react'
import {useLayoutEffect} from 'react'
import { NavigationContainer, useNavigation  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Home = () => {

    const navigation = useNavigation()

    useLayoutEffect(() => {
      
        navigation.setOptions({
            headerShown: false,
            headerTitle: 'Hugo'
        })
      
    }, [])
  return (
    <View className='flex-1 justify-center items-center mt-5'>
      <Text className='text-red-700 text-4xl'>Open up App.js to start working on your app!</Text>
      
    </View>
  )
}

export default Home