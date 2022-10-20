import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
  StyleSheet,
  Image
} from 'react-native';
import React, { useState } from 'react';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';



const Navbar = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  return (
    <View className="flex-row justify-between pt-12 px-6 pb-4 bg-transparent">

      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <MaterialCommunityIcons name="dance-ballroom" size={40} color="white" />
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => navigation.navigate('Home')}> */}
      <Image source={require('../../Photo/Dancify.png')} style={{flex: 1, resizeMode: 'contain', height: 30}}/>
      {/* </TouchableOpacity> */}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Feather name="menu" size={28} color="white" />
      </TouchableOpacity>

      

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View className="bg-white" style={styles.modalView}>
          <LinearGradient
            start={{ x: 0.2, y: 0.1 }}
            end={{ x: 0.9, y: 0.3 }}
            colors={[ '#A4508B','#5F0A87']}
            className=" mt-1 px-10 py-3 rounded-md border-none"
            >
            <TouchableOpacity
              
              onPress={() => navigation.navigate('CreateProfile')}
            >
              <Text className="text-xl text-white">Create profile</Text>
            </TouchableOpacity>
            </LinearGradient>
            <LinearGradient
            start={{ x: 0.2, y: 0.1 }}
            end={{ x: 0.9, y: 0.3 }}
            colors={[ '#A4508B','#5F0A87']}
            className="mt-1 px-10 py-3 rounded-md border-none"
            >
            <TouchableOpacity  
              onPress={() => navigation.navigate('SignUp')}
            >
              <Text className="text-xl text-white">SignUp</Text>
            </TouchableOpacity>
            </LinearGradient>
            
            <LinearGradient
            start={{ x: 0.2, y: 0.1 }}
            end={{ x: 0.9, y: 0.3 }}
            colors={[ '#A4508B','#5F0A87']}
            className="mt-1 px-10 py-3 rounded-md border-none"
            >
            <TouchableOpacity
              
              onPress={() => navigation.navigate('Home')}
            >
              <Text className="text-xl text-white">Home</Text>
            </TouchableOpacity>
            </LinearGradient>
            
            <LinearGradient
            start={{ x: 0.2, y: 0.1 }}
            end={{ x: 0.9, y: 0.3 }}
            colors={[ '#A4508B','#5F0A87']}
            className="mt-1 px-10 py-3 rounded-md border-none"
            >
            <TouchableOpacity
              
              onPress={() => navigation.navigate('MyLocation')}
            >
              <Text className="text-xl text-white">Location</Text>
            </TouchableOpacity>
            </LinearGradient>
            
            
            <LinearGradient
            start={{ x: 0.2, y: 0.1 }}
            end={{ x: 0.9, y: 0.3 }}
            colors={[ '#A4508B','#5F0A87']}
            className="mt-1 px-10 py-3 rounded-md border-none"
            >
            <TouchableOpacity
              
              onPress={() => navigation.navigate('Chats')}
            >
              <Text className="text-xl text-white">Chats</Text>
            </TouchableOpacity>
            </LinearGradient>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <AntDesign className="bg-white rounded-none" name="closecircleo" size={24} color="purple" />
            </Pressable>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'black',
    borderRadius: 20,
    
    padding: 35,
    alignItems: "center",
    shadowColor: "#5F0A87",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  
  buttonOpen: {
    backgroundColor: "white",
  },
  buttonClose: {
    backgroundColor: 'black',
    marginTop: 30,
    color: 'white'
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",

  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Navbar;
