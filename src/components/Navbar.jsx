import { View, Text } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons,  Feather} from '@expo/vector-icons'; 

const Navbar = () => {
  return (
    <View className='flex-row justify-between p-5 bg-red-500'>
      <MaterialCommunityIcons name="dance-ballroom" size={28} color="white" />
      <Text className='text-xl'>Dancify</Text>
      <Feather name="menu" size={28} color="white" />
    </View>
  )
}

export default Navbar