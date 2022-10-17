import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

const ListItem = ({ type, description, user, style, time, room, image }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{ height: 80, ...style }}
      onPress={() => navigation.navigate('chat', { user, room, image })}
    >
      <Text>{user}</Text>
      <Text>{time}</Text>
      <Text>{description}</Text>
    </TouchableOpacity>
  );
};

export default ListItem;
