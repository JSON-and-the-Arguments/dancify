import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator } from 'react-native'
import React  from 'react'
import {useState, useEffect} from 'react'
import {getUsers, } from '../../queryutils'
import {getImages, displayPhoto} from '../../photoutils'
import {ref, uploadBytes, getDownloadURL, getStorage} from 'firebase/storage'
//import { storage } from "./firebase"
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../config';

const app = initializeApp(firebaseConfig);

const UsersList = () => {
  const [users, setUsers] = useState([])
  const [picture, setPicture] = useState('')
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    setLoading(true)
    getUsers()
    .then((response) => {
        setUsers(response)
        setLoading(false)
    })  
  }, [])
  //console.log(users)

  //  const myUsers =users.map((user) => {
  //   return  user.image
  // })
  // console.log(myUsers)

//   users.forEach((user) => {
//     getImages(user.firstname)
//     .then((response) => {
//         setPicture(response)
//     })
//   })
//   useEffect(() => {
//     getImages(users.firstname)
//     .then((response) => {
//         setPicture(response)
//     })
//   }, [])
  
//   console.log(picture)
//   console.log(picture)
  // const storage = getStorage()
  // const httpsReference = ref(storage, 'gs://dancify-728c9.appspot.com/userPictures/Chad/profilePicture.jpeg');

  
  //  useEffect(() => {
    
  //   getDownloadURL(httpsReference)
  //   .then((url) => {
  //     //console.log(url, '<<<<<<USERS LIST')
  //     setPicture(url)
  //   })
    
  //  }, [])
  
  //console.log(picture, '>>>>>>>>>>>Picture here')

  // return (
  //   <View>
  //     <Text>Users List</Text>
  //     <Image   source={{uri:picture}}/>
  //   </View>
  // )

  if(loading){
    return (
      <View style={[styles.loadingContainer, styles.horizontal]}>
          <ActivityIndicator size="large" color="#00ff00" />
      </View>
      
    ) 
  }

  else {

    return (
    
      
      <ScrollView contentContainerStyle={{justifyContent: 'center'}}  horizontal={true} style={styles.container}>
          
          {users?.map((user, index) => {
              return (
                  <View style={[{ width: 170,height: 130,padding: 5 }]} key={index}>
                      <Text>{user.firstname}</Text>
                      <Image style={{width: 150, height: 150}} source={{uri: `https://storage.googleapis.com/dancify-728c9.appspot.com/userPictures/${user.firstname}/profilePicture.jpeg`}}/>
                      <Text> Wants to dance: {user.dancestyles}</Text>
                      
                  </View>
                  
              )
              
          })}
        
      </ScrollView>
      
    )
  }
  
  
}

const styles = StyleSheet.create({  
  container:{  
      flex: 1,
      margin: 20,
      gap:  5,
      
  },
  loadingContainer:{  
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }

})
export default UsersList