import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons,  Feather} from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';




const Navbar = () => {
  const navigation = useNavigation();
  return (
    <View className='flex-row justify-between p-5 bg-red-500'>
      <MaterialCommunityIcons name="dance-ballroom" size={28} color="white" />
      <TouchableOpacity onPress={() => navigation.navigate('CreateProfile')}>
      <Text className='text-xl'>Dancify</Text>
      </TouchableOpacity>
      
      <Feather name="menu" size={28} color="white" />
    </View>
  )
}

export default Navbar