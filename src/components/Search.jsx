import { View, TextInput, Text, Button, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const Search = () => {
  const [range, setRange] = useState(0);
  const [searchText, setSearchText] = useState(null);
  const navigation = useNavigation();
  return (
    <View className="bottom-10 bg-red-100 items-center border-4 border-red-500/10 m-5 rounded">
      <Text className="mx-8">Range: {range} miles</Text>
      <Slider
        step={5}
        onSlidingComplete={(value) => {
          setRange(value);
        }}
        style={{ width: 320, height: 40, marginLeft: 10 }}
        minimumValue={0}
        maximumValue={30}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
      <TextInput
        className="shadow-xl bg-white border-4 border-red-500/10 mx-8 h-10 w-40 rounded"
        placeholder="Find user"
        keyboardType="default"
        onChangeText={setSearchText}
      />
      <TouchableOpacity
        className="bg-rose-300 rounded-full py-2 "
        onPress={() => {
          navigation.navigate("Home", {
            user: searchText,
          });
        }}
      >
        <Text className="text-l">Search</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-rose-400 rounded-lg py-2"
        onPress={() => {
          navigation.navigate("Home", {
            user: searchText,
          });
        }}
      >
        <Text className="text-l font-bold bottom-0 ">All users</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-rose-500 rounded-lg py-2 "
        onPress={() => navigation.navigate("MyLocation")}
      >
        <Text className="text-l font-bold bottom-0 ">Location</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Search;
