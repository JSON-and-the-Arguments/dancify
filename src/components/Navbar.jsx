import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  return (
    <View className="flex-row justify-between pt-12 px-6 pb-4 bg-red-500">
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <MaterialCommunityIcons name="dance-ballroom" size={28} color="white" />
      </TouchableOpacity>
      <Text className="text-xl">Dancify</Text>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Feather name="menu" size={28} color="white" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              className=" mb-4 bg-blue-600 px-4 rounded-lg"
              onPress={() => navigation.navigate('CreateProfile')}
            >
              <Text className="text-xl text-white">Create profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="mb-4 bg-blue-600 px-4 rounded-lg"
              onPress={() => navigation.navigate('SignUp')}
            >
              <Text className="text-xl text-white">SignUp</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="mb-4 bg-blue-600 px-4 rounded-lg"
              onPress={() => navigation.navigate('Home')}
            >
              <Text className="text-xl text-white">Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="mb-4 bg-blue-600 px-4 rounded-lg"
              onPress={() => navigation.navigate('Chats')}
            >
              <Text className="text-xl text-white">Chats</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="mb-4 bg-blue-600 px-4 rounded-lg"
              onPress={() => navigation.navigate('Chat')}
            >
              <Text className="text-xl text-white">Chat</Text>
            </TouchableOpacity>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Navbar;
