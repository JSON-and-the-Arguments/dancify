
import { Image, Text, View } from 'react-native';
import placeholderImage from '../../assets/adaptive-icon.png';
import AddMessage from './AddMessage';

const UserCard = ({ user }) => {
  return (
    <View className="w-60 h60 pt-50 bg-red-100 border-4 border-red-500/10 m-5 items-center rounded ">
      <Image
        className="w-full h-1/2 rounded"
        source={{
          uri: `https://storage.googleapis.com/dancify-728c9.appspot.com/userPictures/${user.uid}/profilePicture.jpeg`,
        }}
      />
      <View className="top-10 border-4 border-red-500/10 w-5/6 items-center">
        <Text className= 'text-base mb-2 undeline decoration-2'> {user.firstname}</Text>
        <Text className= 'text-base mb-2'>Dance style- {user.dancestyles}</Text>
        <Text className= 'text-base mb-2'>Role-{user.role}</Text>
        {/* <AddMessage user={user} /> */}
      </View>
    </View>
  );
};

export default UserCard;

