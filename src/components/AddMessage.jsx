import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import GlobalContext from '../../context/Context';
import { auth } from '../../firebase';
import { addContact } from '../../queryutils';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const AddMessage = ({ user }) => {
  const { currentUser } = auth;
  const navigation = useNavigation();
  const { rooms, unfilteredRooms } = useContext(GlobalContext);

  const handlePress = async () => {
    await addContact(currentUser.uid, user.uid);
    await addContact(user.uid, currentUser.uid);
    // await getRoom(rooms, unfilteredRooms);
    navigation.navigate('Chat', { userB: user.uid });
  };

  return (
    <TouchableOpacity
      classname="bg-rose-300 rounded-full py-2 "
      onPress={handlePress}
      title="Message"
    >
      <View className="ml-10">
        <MaterialCommunityIcons name="message" size={30} color="white" />
      </View>
    </TouchableOpacity>
  );
};

export default AddMessage;
