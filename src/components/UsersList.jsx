import { View, Text, Image } from 'react-native'
import React  from 'react'
import {useState, useEffect} from 'react'
import {getUsers, getImages} from '../../queryutils'

const UsersList = () => {
  const [users, setUsers] = useState([])
  const [picture, setPicture] = useState('')

  useEffect(() => {
    getUsers()
    .then((response) => {
        setUsers(response)
    })
  
    
  }, [])
  console.log(users)

   const myUsers =users.map((user) => {
    return  user.image
  })
  console.log(myUsers)

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
  
  return (
    <View>
        {users?.map((user) => {
            return (
                <View key={user}>
                    <Text>{user.dancestyles}</Text>
                    <Image source={{uri: `${user.image}`}}/>
                    <Text>{user.password}</Text>
                </View>
                
            )
            
        })}
      <Text>UsersList</Text>
    </View>
  )
}

export default UsersList