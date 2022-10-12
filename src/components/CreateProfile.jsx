import { View, Text, ScrollView, Image, TextInput, Button, SafeAreaView, Switch, TouchableOpacity} from 'react-native'
import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Dropdown from './Dropdown'
import Slider from '@react-native-community/slider';
import { setDoc, doc, updateDoc, getDocs, collection } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import { firebaseConfig } from '../../config';
import { pickImage,  askForPermission, uploadImage } from '../../photoutils';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const db = initializeFirestore(app, {
   experimentalForceLongPolling: true,
   useFetchStreams: false,
 });

const initialValues = {
  firstname: "",
  lastname: "",
  image: "",
  postcode: "",
  dancestyles: "",
  role: "",
  range: 0,
  available: false,
  about: ""
}

// const location = 'manchester';
// const danceStyle = 'salsa';
// const role = 'leader';
// const bio = 'hi';

const dance = [
  {id: 1, name: 'salsa'},
  {id: 2, name: 'bachata'},
  {id: 3, name: 'kizomba'},
  {id: 4, name: 'rumba'}
]

const role = [
  {id:1, name: 'lead',},
  {id:2, name: 'follow'},
  {id:3, name: 'both'}
]


const CreateProfile = () => {
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedRole, setSelectedRole] = useState(null)
  const [range, setRange] = useState(0)
  const [isAvailable, setIsAvailable] = useState(false);
  const [values, setValues] = useState(initialValues)

  const [selectedImage, setSelectedImage] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [photoLink, setPhotoLink] = useState('')

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const status = await askForPermission();
      setPermissionStatus(status);
    })();
  }, []);

  async function handleProfilePicture() {
    const result = await pickImage();
    if (!result.cancelled) {
      setSelectedImage(result.uri);
      handleInputChange("image", result.uri)
    }
    
  }

  if (!permissionStatus) {
    return <Text>Loading</Text>;
  }
  if (permissionStatus !== "granted") {
    return <Text>You need to allow this permission</Text>;
  }

  async function handleUploadPicture() {
    const user = values.firstname;
    let photoURL;
    if (selectedImage) {
      const { url } = await uploadImage(
        selectedImage,
        
        `userPictures/${user}`,
        "profilePicture"
      );
      photoURL = url;
      
      
    }
    // const userData = {
    //   displayName,
    //   email: user.email,
    // };
    if (photoURL) {
      initialValues.image = photoURL
    }

    // await Promise.all([
    //   updateProfile(user, userData),
    //   setDoc(doc(db, "users", user.uid), { ...userData, uid: user.uid }),
    // ]);
    // navigation.navigate("home");
  }


  

  
  const handleInputChange = (val, val2) => {
      setValues({...values,
        [val]: val2})
  }
  
  
  const patchUser = () => {
    
    const updateProfile = doc(db, "users", `${values.firstname}`);
    handleUploadPicture()
    setDoc(updateProfile, values);
    navigation.navigate('Home')
    
  };
  
  const toggleSwitch = () => setIsAvailable(previousState => !previousState);
  
  const onSelect = (item) => {
    setSelectedItem(item)
    handleInputChange("dancestyles", item.name)
  }
  const onRoleSelect = (item) => {
    setSelectedRole(item)
    handleInputChange("role", item.name)
  }

  
    
  return (
    <SafeAreaView className='flex-1'>
        <Navbar/>
    <ScrollView contentContainerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
        
        
    <TouchableOpacity
          onPress={handleProfilePicture}
          
          style={{
            marginTop: 30,
            borderRadius: 120,
            width: 120,
            height: 120,
            backgroundColor: 'grey',
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!selectedImage ? (
            <MaterialCommunityIcons name="camera-plus-outline" size={45} color="black" />
          ) : (
            <Image
              source={{ uri: selectedImage }}
              style={{ width: "100%", height: "100%", borderRadius: 120 }}
            />
          )}
        </TouchableOpacity>
        {/* <Button
                title="Upload Photo"
                onPress={handleUploadPicture}
                /> */}


        




        
        <Text>First Name</Text>
        <TextInput
          value={values.firstname}
          onChangeText={(value) => handleInputChange("firstname", value)}
          className="mt-1 block w-80 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
          placeholder="firstname"
          required
          keyboardType="default"
        />
        <Text>Last Name</Text>
        <TextInput
           value={values.lastname}
           onChangeText={(value) => handleInputChange("lastname", value)}
          className="mt-1 block w-80 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
          placeholder="lastname"
          required
          keyboardType="default"
        />
        {/* <Text>Image</Text> */}
        {/* <TextInput
          value={photoLink}
          onChangeText={(value) => handleInputChange("image", photoLink)}
          className="mt-1 block w-80 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
          placeholder="image"
          required
          keyboardType="default"
        /> */}
        <Text>Post Code</Text>
        <TextInput
          value={values.postcode}
          onChangeText={(value) => handleInputChange("postcode", value)}
          className="mt-1 block w-80 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
          placeholder="postcode"
          required
          keyboardType="default"
        />
        <Text>Dance Styles</Text>
        <Dropdown
        value={selectedItem}
        data={dance}
        onSelect={onSelect}/>
        
        <Text>Role</Text>
        <Dropdown
        value={selectedRole}
        data={role}
        onSelect={onRoleSelect}/>
        
        <Text>Range: {range} miles</Text>
        <Slider

        step={5}
        value={range}
        onSlidingComplete={(value) => { 
          setRange(value)
        handleInputChange("range", value)}
        }
        style={{width: 320, height: 40}}
        minimumValue={0}
        maximumValue={30}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        />
        <Text >{isAvailable? 'Available': 'Not Available'}</Text>
        <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isAvailable ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        value={isAvailable}
        onValueChange={(value) => {
        toggleSwitch()
        handleInputChange("available", value)}
        } 
        />
        <Text>Tell us about Yourself</Text>
        <TextInput
          value={values.about}
          onChangeText={(value) => handleInputChange("about", value)}
          className="mt-1  block w-80 px-3 py-2 h-20 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
          placeholder="about"
          
          keyboardType="default"
        />
        <View className='mt-5 mb-10'>
            <Button
                title="Sign Up"
                onPress={patchUser}
                className="bg-blue-500 hover:bg-blue-700 text-white  font-bold py-2 px-4 rounded-full-5"
            />
        </View>
          
        
      </ScrollView>
   </SafeAreaView>
  )
}

export default CreateProfile