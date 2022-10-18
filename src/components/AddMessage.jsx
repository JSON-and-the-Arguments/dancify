import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native';
import { auth } from '../../firebase';
import { addContact } from '../../queryutils';
const AddMessage = ({ user }) => {
  const { currentUser } = auth;
  const navigation = useNavigation();

  const handlePress = async () => {
    await addContact(currentUser.uid, user.uid);
    await addContact(user.uid, currentUser.uid);
    navigation.navigate('Chat', { userB: user.uid });
  };

  return <Button onPress={handlePress} title="Message" />;
};

export default AddMessage;
