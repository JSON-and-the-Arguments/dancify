import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import GlobalContext from '../../context/Context';
import { auth } from '../../firebase';
import { addContact } from '../../queryutils';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const AddMessage = ({ user, text }) => {
  const { currentUser } = auth;
  const navigation = useNavigation();
  const { rooms, unfilteredRooms } = useContext(GlobalContext);

  const handlePress = async () => {
    await addContact(currentUser.uid, user);
    await addContact(user, currentUser.uid);
    // await getRoom(rooms, unfilteredRooms);
    navigation.navigate('Chat', { userB: user });
  };

  return (
    <TouchableOpacity
      classname="bg-rose-300 rounded-full py-2 "
      onPress={handlePress}
      title="Message"
    >
      <View className="mt-10">
        <Text className="font-semibold text-white text-xl">
          <MaterialCommunityIcons name="message" size={30} color="white" />{' '}
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AddMessage;
