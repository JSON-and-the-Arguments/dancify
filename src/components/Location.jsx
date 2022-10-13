import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

import * as Location from 'expo-location';

export default function MyLocation() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false)
    Location.geocodeAsync("12529 berlin").then((response) => {
        console.log(response);
    })
    // console.log(myAddress);

    const { width, height } = Dimensions.get('window');

    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.0922;
    
    const lat = details.geometry.location.lat;
    const lng = details.geometry.location.lng;
    const latDelta = details.geometry.viewport.northeast.lat - details.geometry.viewport.southwest.lat;
    const lngDelta = latDelta * ASPECT_RATIO;
    
    let coordinate = {
        latitude: lat,
        longitude: lng,
        latitudeDelta: latDelta,
        longitudeDelta: lngDelta
    };
    
//   useEffect(() => {
//     setLoading(true)
//     (async () => {
      
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       setLocation(location);
//       setLoading(false)
//     })();
//   }, [location]);

//   let text = 'Waiting..';
//   if (errorMsg) {
//     text = errorMsg;
//   } else if (location) {
//     text = JSON.stringify(location);
//   }

//   console.log(location.coords.altitude)
// let latitude = location.coords.latitude
// let longitude = location.coords.longitude
if (loading) {
console.log("loading");    
} else {
    console.log(location);
}
// console.log(location)
// let longitude = location.coords.longitude
// console.log(longitude)
// console.log(getRegionForCoordinates([{latitude: latitude, longitude:longitude}]))



  return (
    <View>
      {/* <MapView style={styles.map} initialRegion={{
        latitude: 53.47208507425169,
        longitude: -2.2380451618436488,
      }}/> */}
    </View>
  );
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