
import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, Dimensions, Button } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import {getUsers,  getUsersByQuery} from '../../queryutils'
import { useNavigation } from '@react-navigation/native';
import { getDistance } from 'geolib';
import Slider from '@react-native-community/slider';
import Dropdown from './Dropdown'

import * as Location from 'expo-location';

//const markers = ['M43AQ', 'M27HQ', 'M11LY', 'M54TJ ']

const dance = ['all','salsa','bachata','kizomba','rumba',]
const role = ['all', 'lead', 'follow', 'both']

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
  const[range, setRange] = useState(5)
  const[selectedDance, setSelectedDance] = useState(null)
  const[selectedRole, setSelectedRole] = useState(null)
  const [query, setQuery] = useState({})

  const params = navigation.getState().routes[0].params;

  const handleInputChange = (query, val) => {
      if (val === 'all') {
        setIsLoading(true)
        getUsers(params)
        .then((response) => {
            setDancers(response)
          setIsLoading(false)
        })  
      }
      else {
        setIsLoading(true)
        getUsersByQuery(query, val)
        .then((response) => {
        setDancers(response)
        setIsLoading(false)
      })
      }
      
  }

  

  // const showDancestyles = (item) => {
  //   setIsLoading(true)
  //     getUsersByQuery(item)
  //     .then((response) => {
  //       setDancers(response)
  //       setIsLoading(false)
  //     })
   
    
  // }

  useEffect(() => {
    setIsLoading(true)
    getUsers(params)
    .then((response) => {
        setDancers(response)
        setIsLoading(false)
    })  
  }, [params])
  
     

    //console.log(dancers)
    
    

  
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
   
    // const showDancestyles = () => {
    //   setIsLoading(true)
    //   getUsersByQuery()
    //   .then((response) => {
    //     setDancers(response)
    //     setIsLoading(false)
    //   })
      
    // }

    const onSelect = (item) => {
      setSelectedDance(item)
      handleInputChange("dancestyles", item)
      
    }

    const onSelect2 = (item) => {
      setSelectedRole(item)
      handleInputChange("role", item)
      
    }
          
      
 
  //  dancers.map((dancer) => {
  //   const distance = getDistance(dancer.location, myLocation)
  //   //console.log(`${Math.round((distance/1000)*0.62137)}miles from ${dancer.firstname}`)
  //   const distanceMiles = Math.round((distance/1000)*0.62137)
  //   if (distanceMiles <= 5) {
  //     //console.log(dancer.firstname)
  //   }
  //  })
    
    
        
     
  //console.log(query)
  
  
  
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
              
          {/* {dancers?.map((dancer, index) => {
            return <Marker key={index} coordinate={dancer.location} title={dancer.firstname}/>   
          })} */}

    {/* {dancers.map((dancer, index) => {
    const distance = getDistance(dancer.location, myLocation)
    //console.log(`${Math.round((distance/1000)*0.62137)}miles from ${dancer.firstname}`)
    const distanceMiles = Math.round((distance/1000)*0.62137)
    {distanceMiles <= 5? <Marker key={index} coordinate={dancer.location} title={dancer.firstname}/> : <></>
      
    }
    })} */}

    {dancers.filter((dancer) => (Math.round((getDistance(dancer.location, myLocation)/1000)*0.62137)) <= range )
    .map((filteredDancer, index) => {
      return <Marker key={index} coordinate={filteredDancer.location} title={filteredDancer.firstname}/>
    })}
            
        
         <Marker
              coordinate={mapRegion}
              title="Marker"
              pinColor='blue'
            />
        </MapView> 
        <View className='mt-10 items-center'>
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


        </View>

        <View className='mt-20 items-center'>
          <Dropdown
          value={selectedDance}
          data={dance}
          onSelect={onSelect}/>
        </View>
        
        
        
        
        <View className='mt-20 items-center'>
          <Dropdown
          value={selectedRole}
          data={role}
          onSelect={onSelect2}/>
        </View>
        

        {/* <View className='mt-10'>
              <Button
                title="Kizomba"
                onPress={showDancestyles}
                className="bg-blue-500 hover:bg-blue-700 text-white  font-bold py-2 px-4 rounded-full-5"
              />
        </View> */}
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
    marginTop: 20,
    
  },
  map: {
    width: 400,
    height: 400,
  },
});