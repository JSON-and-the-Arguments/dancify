import { Image, Text, View } from 'react-native';
import placeholderImage from '../../assets/adaptive-icon.png';
import AddMessage from './AddMessage';

const UserCard = ({ user }) => {
  return (
    <View className="w-40 h-60 pt-50 bg-red-100 border-2 m-5 items-center">
      <Image
        className="w-full h-1/2"
        source={{
          uri: `https://storage.googleapis.com/dancify-728c9.appspot.com/userPictures/${user.firstname}/profilePicture.jpeg`,
        }}
      />
      <View className="border-2 w-1/2 items-center">
        <Text>Name {user.firstname}</Text>
        <Text>Dance style: {user.dancestyles}</Text>
        <AddMessage user={user} />
      </View>
    </View>
  );
};

export default UserCard;
