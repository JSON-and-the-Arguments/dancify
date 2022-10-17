import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Navbar from '../components/Navbar'
import { useNavigation } from '@react-navigation/native';

const SingleProfile = () => {
    const navigation = useNavigation();
    const UserObj = navigation.getState().routes[1].params.user
    console.log(UserObj.image);
    const img = UserObj.image
  return (
      <View>
        <Navbar />
        <View>
         <Image 
        key={UserObj.firstname}
        styles={styles.img}
         className="w-full h-1/2"
        source={{uri:img }}
      /> 
      </View>
        <View>
        
            <Text>{UserObj.firstname}</Text>
            <Text>{UserObj.lastname}</Text>
            <Text>{UserObj.dancestyles}</Text>
            <Text>Location: {UserObj.postcode}</Text>
            <Text>Availability: {UserObj.available}</Text>


            <Text>{UserObj.about}</Text>

    
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    img: {
      height: 20,
      width: 20,
}})

export default SingleProfile