import { ScrollView } from "react-native";
import UserCard from "./UserCard";

const SearchPage = () => {
  return (
    <ScrollView horizontal={true}>
      <UserCard />
    </ScrollView>
  );
};

export default SearchPage;
