import { View } from 'react-native';
import UserCard from './UserCard';

const SearchPage = () => {
  return (
    <View
      className="grid grid-rows-4 grid-flow-col gap-4"
      //   horizontal={true}
    >
      <UserCard />
      <UserCard />
      <UserCard />
      <UserCard />
    </View>
  );
};

export default SearchPage;
