
import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, Dimensions, ScrollView, Button } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import {getUsers,  getUsersByQuery} from '../../queryutils'
import { useNavigation } from '@react-navigation/native';
import { getDistance } from 'geolib';
import Slider from '@react-native-community/slider';
import Dropdown from './Dropdown'

import * as Location from 'expo-location';
import Navbar from './Navbar';

//const markers = ['M43AQ', 'M27HQ', 'M11LY', 'M54TJ ']

const dance = [{id:1 , name:'salsa' },{id:2 , name:'bachata' },{id:3 , name:'kizomba' },{id:4 , name:'rumba' }]
const role = [{id:1 , name:'lead' }, {id:2 , name:'follow' }, {id:3 , name:'both' }]

// let item = item.name 

const initialQuery = {
  dancestyles: '',
  role: '',
}


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
  const[range, setRange] = useState(40)
  const[selectedDance, setSelectedDance] = useState(null)
  const[selectedRole, setSelectedRole] = useState(null)
  const [query, setQuery] = useState(initialQuery)

  const params = navigation.getState().routes[0].params;


  const handleInputChange = (val, val2) => {
      
    setQuery({...query,
      [val]: val2})
}

  

  useEffect(() => {
    setIsLoading(true)
    getUsers(params)
    .then((response) => {
        setDancers(response)
        setIsLoading(false)
    })  
  }, [params])
  
   
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
      setMyLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })
      
    };
    useEffect(() => {
      setLiveLoading(true)
      userLocation();
      setLiveLoading(false)
    },[]);
   
    


    const onDanceSelect = (item) => {
      setSelectedDance(item.name)
      handleInputChange("dancestyles", item.name)
      setIsLoading(true)
      getUsersByQuery({...query, dancestyles:item.name})
      .then((response) => {
            setDancers(response)
            setIsLoading(false)
          })
    }
    const onRoleSelect = (item) => {
      setSelectedRole(item.name)
      handleInputChange("role", item.name)
      setIsLoading(true)
      getUsersByQuery({...query, role:item.name})
        
      .then((response) => {
             setDancers(response)
            setIsLoading(false)
           })
    }


  
  if (liveLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  else {
    return (
      <ScrollView>
      <Navbar />
      <View style={styles}>
         <MapView style={styles.map}  initialRegion={mapRegion}>
           
              
                {/* <Marker coordinate={{
                  latitude: 53.47196,
                  longitude: -2.238185,
                }}
                title="Marker" pinColor='blue'/> */}
              
          {/* {dancers?.map((dancer, index) => {
            return <Marker key={index} coordinate={dancer.location} title={dancer.firstname}/>   
          })} */}


    {dancers.filter((dancer) => (Math.round((getDistance(dancer.location, myLocation)/1000)*0.62137)) <= range )
    .map((filteredDancer, index,) => {
      
      return <Marker key={index} coordinate={filteredDancer.location} title={filteredDancer.firstname}/>
    })}
            
        
         <Marker
              coordinate={mapRegion}
              title="Marker"
              pinColor='blue'
            />
        </MapView> 
        <View className='mt-10 items-center'>
          <Text>Select the desired range to find a dancer</Text>
        <Slider

          step={0.5}
          value={range}
          onSlidingComplete={(value) => { 
            setRange(value)
            
            
          }
          }
          style={{width: 320, height: 40}}
          minimumValue={0}
          maximumValue={40}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          />
          <Text className="mx-8 text-center mt-2 text-base">{range} miles</Text>
        </View>
        
        <Text className='mt-6 text-center'>Choose a dance style</Text>
        <View className='mt-2 items-center'>
          <Dropdown
          value={selectedDance}
          data={dance}
          onSelect={onDanceSelect}
          className="bg-black"
          />
          
        </View>
        
        <Text className='mt-10 text-center'>Choose your partner role</Text>
        <View className='mt-2 mb-20 items-center'>
          <Dropdown
          value={selectedRole}
          data={role}
          onSelect={onRoleSelect}/>
        </View>
      </View>
      </ScrollView>
    );
  }


  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    
  },
  map: {
    width: 400,
    height: 400,
  },
});