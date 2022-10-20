import { Image, Text, TouchableOpacity, View } from 'react-native';
import placeholderImage from '../../assets/adaptive-icon.png';
import AddMessage from './AddMessage';
import { useNavigation } from '@react-navigation/native';

const UserCard = ({ user }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('SingleProfile', { user: user.uid })}
    >
      <View className="w-60 h-80 pt-50  border-red-500/10 m-5 items-center">
        <Image
          className="w-full h-1/2 rounded"
          source={{
            uri: `https://storage.googleapis.com/dancify-728c9.appspot.com/userPictures/${user.uid}/profilePicture.jpeg`,
          }}
        />
        <View className=" flex-row mx-10 justify-between w-full h-30 items-center">
          <View>
            <Text className="text-white text-3xl mb-2  decoration-2">
              {user.firstname}
            </Text>
            <Text className="text-white text-xl capitalize">
              {user.dancestyles}
            </Text>
            <Text className="text-white text-xl">{user.role}</Text>
          </View>
          <AddMessage user={user} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserCard;
