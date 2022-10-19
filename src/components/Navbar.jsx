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



const Navbar = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  return (
    <View className="flex-row justify-between pt-12 px-6 pb-4 bg-red-500">

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
            <TouchableOpacity
              className=" mb-6 bg-blue-600 rounded-lg px-8 py-2"
              onPress={() => navigation.navigate('CreateProfile')}
            >
              <Text className="text-xl text-white">Create profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="mb-6 bg-blue-600 rounded-lg px-8 py-2"
              onPress={() => navigation.navigate('SignUp')}
            >
              <Text className="text-xl text-white">SignUp</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="mb-6 bg-blue-600 rounded-lg px-8 py-2"
              onPress={() => navigation.navigate('Home')}
            >
              <Text className="text-xl text-white">Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="mb-6 bg-blue-600 rounded-lg px-8 py-2"
              onPress={() => navigation.navigate('MyLocation')}
            >
              <Text className="text-xl text-white">Location</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="mb-6 bg-blue-600 rounded-lg px-8 py-2"
              onPress={() => navigation.navigate('Chats')}
            >
              <Text className="text-xl text-white">Chats</Text>
            </TouchableOpacity>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <AntDesign className="bg-white rounded-none" name="closecircleo" size={24} color="black" />
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
    
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: '#ffffff',
    marginTop: 30,
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
