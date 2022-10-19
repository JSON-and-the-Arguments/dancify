import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text } from 'react-native';
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

  return <TouchableOpacity classname= 'bg-rose-300 rounded-full py-2 ' onPress={handlePress} title="Message" >
    <Text className="text-xl font-bold "> Message me </Text>
     </TouchableOpacity>
};

export default AddMessage;
