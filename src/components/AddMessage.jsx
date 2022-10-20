import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text } from 'react-native';
import { auth } from '../../firebase';
import { addContact, getRoom } from '../../queryutils';
import {useContext} from 'react'
import GlobalContext from '../../context/Context';
const AddMessage = ({ user }) => {
  const { currentUser } = auth;
  const navigation = useNavigation();
  const { rooms, unfilteredRooms } = useContext(GlobalContext);

  const handlePress = async () => {
    await addContact(currentUser.uid, user.uid);
    await addContact(user.uid, currentUser.uid);
    await getRoom(rooms, unfilteredRooms);
    navigation.navigate('Chat', { userB: user.uid });
  };

  return (
    <TouchableOpacity
      classname="bg-rose-300 rounded-full py-2 "
      onPress={handlePress}
      title="Message"
    >
      <Text className="text-xl font-bold "> Message me </Text>
    </TouchableOpacity>
  );
};

export default AddMessage;
