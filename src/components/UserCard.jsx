import { Image, Text, TouchableOpacity, View } from 'react-native';
import placeholderImage from '../../assets/adaptive-icon.png';
import AddMessage from './AddMessage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const UserCard = ({ user }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('SingleProfile', { user: user.uid })}
    >
      <View className="w-40 h-60 pt-50 bg-red-100 border-4 border-red-500/10 m-5 items-center">
        <Image
          className="w-full h-1/2 rounded"
          source={{
            uri: `https://storage.googleapis.com/dancify-728c9.appspot.com/userPictures/${user.uid}/profilePicture.jpeg`,
          }}
        />
        <View className="border-2 border-red-500/10 w-5/6 items-center">
          <Text className="text-base mb-2 underline decoration-2">
            {user.firstname}
          </Text>
          <Text className="text-base mb-2">{user.dancestyles}</Text>
          <MaterialCommunityIcons
            className="bg-slate-900"
            user={user}
            name="message"
            size={30}
            color="black"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserCard;
