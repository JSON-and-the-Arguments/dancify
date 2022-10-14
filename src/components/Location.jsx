
import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import {getUsers, } from '../../queryutils'
import { useNavigation } from '@react-navigation/native';

import * as Location from 'expo-location';

//const markers = ['M43AQ', 'M27HQ', 'M11LY', 'M54TJ ']

export default function MyLocation() {
  const navigation = useNavigation()
  const [errorMsg, setErrorMsg] = useState(null);
  const [mapRegion, setMapRegion] = useState({
      latitude: 53.483959,
      longitude: -2.244644,
      latitudeDelta: 0.2022,
      longitudeDelta: 0.2521,
  })
  const[isLoading, setIsLoading] = useState(false)
  const[myLocation, setMyLocation] = useState({})
  const[dancers, setDancers] = useState([])
  const[liveLoading, setLiveLoading] = useState(false)

  const params = navigation.getState().routes[0].params;

  useEffect(() => {
    setIsLoading(true)
    getUsers(params)
    .then((response) => {
        setDancers(response)
        setIsLoading(false)
    })  
  }, [])
  
     

    
    
    

  
    const userLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }
      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      
    };
    useEffect(() => {
      setLiveLoading(true)
      userLocation();
      setLiveLoading(false)
    },[]);
   
          
          
      
 
      
    
    
        
     
  console.log(dancers)
  
  
  
  if (liveLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  else {
    return (
      <View style={styles}>
         <MapView style={styles.map}  initialRegion={mapRegion}>
           
              
                {/* <Marker coordinate={{
                  latitude: 53.47196,
                  longitude: -2.238185,
                }}
                title="Marker" pinColor='blue'/> */}
              
          {dancers?.map((dancer, index) => {
            return <Marker key={index} coordinate={dancer.location} title={dancer.firstname}/>   
          })}
            
        
         <Marker
              coordinate={mapRegion}
              title="Marker"
              pinColor='blue'
            />
        </MapView> 
      </View>
    );
  }


  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: 400,
    height: 400,
  },
});