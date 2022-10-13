import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps'
import { useNavigation } from '@react-navigation/native'


const MapTest = () => {
    const navigation = useNavigation()
  return (
    <View style={styles.container}>
        {/* <View>
     <TouchableOpacity onPress={navigation.navigate("MyLocation")}><Text>Location</Text></TouchableOpacity> 
       </View> */}
      <MapView style={styles.map} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: 100,
      height: 100
    },
  });

export default MapTest