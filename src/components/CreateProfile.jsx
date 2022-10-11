import { View, Text, ScrollView, TextInput, Button, SafeAreaView, Switch} from 'react-native'
import React, { useState } from 'react'
import Navbar from './Navbar'
import Dropdown from './Dropdown'
import Slider from '@react-native-community/slider';




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
    
    const toggleSwitch = () => setIsAvailable(previousState => !previousState);

    const onSelect = (item) => {
      setSelectedItem(item)
    }
    const onRoleSelect = (item) => {
      setSelectedRole(item)
    }


    
  return (
    <SafeAreaView className='flex-1'>
        <Navbar/>
    <ScrollView contentContainerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
        
        <Text>First Name</Text>
        <TextInput
        //   value={username}
        //   onChangeText={setUsername}
          className="mt-1 block w-80 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
          placeholder="firstname"
          required
          keyboardType="default"
        />
        <Text>Last Name</Text>
        <TextInput
        //   value={email}
        //   onChangeText={setEmail}
          className="mt-1 block w-80 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
          placeholder="lastname"
          required
          keyboardType="default"
        />
        <Text>Image</Text>
        <TextInput
        //   value={password}
        //   onChangeText={setPassword}
          className="mt-1 block w-80 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
          placeholder="image"
          required
          keyboardType="default"
        />
        <Text>Post Code</Text>
        <TextInput
        //   value={password}
        //   onChangeText={setPassword}
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
        onSlidingComplete={setRange}
        //onValueChange={setRange}
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
        onValueChange={toggleSwitch}
        value={isAvailable}
        />
        <Text>Tell us about Yourself</Text>
        <TextInput
        //   value={password}
        //   onChangeText={setPassword}
          className="mt-1  block w-80 px-3 py-2 h-20 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
          placeholder="about"
          
          keyboardType="default"
        />
        <View className='mt-5 mb-10'>
            <Button
                title="Sign Up"
                
                className="bg-blue-500 hover:bg-blue-700 text-white  font-bold py-2 px-4 rounded-full-5"
            />
        </View>
          
        
      </ScrollView>
   </SafeAreaView>
  )
}

export default CreateProfile