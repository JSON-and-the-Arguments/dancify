import { ScrollView, Text, View } from "react-native";
import UserCard from "./UserCard";
import Search from "./Search";

const SearchPage = () => {
  return (
    <View>
      <ScrollView  horizontal={true}>
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </ScrollView>
      <Search />
      

      
    </View>
  );
};

export default SearchPage;
