import { Image, Text, View } from 'react-native';
import placeholderImage from '../../assets/adaptive-icon.png';

const UserCard = () => {
  return (
    <View className="w-2/4 h-60 pt-50 bg-red-100 border-2 m-5 items-center">
      <Image className="w-full h-1/2" source={placeholderImage} />
      <View className="border-2 w-1/2 items-center">
        <Text>Name</Text>
        <Text>Location</Text>
        <Text>Dance style</Text>
      </View>
    </View>
  );
};

export default UserCard;
