import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { Button } from 'react-native';
import GlobalContext from '../../context/Context';
import { auth } from '../../firebase';
import { addContact, getRoom } from '../../queryutils';
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

  return <Button onPress={handlePress} title="Message" />;
};

export default AddMessage;
