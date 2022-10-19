import { View, TextInput, Text, Button, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const Search = () => {
  // const [range, setRange] = useState(0);
  const [searchText, setSearchText] = useState(null);
  const navigation = useNavigation();

  return (
    <ScrollView>
    <View className="items-center">
      <Text className="mt-2 text-center text-sm">Select the desired range to find other dancers</Text>
      <Text className="mx-8 text-center mt-3 mb-3 text-base">{range} miles</Text>
      <Slider
        step={5}
        onSlidingComplete={(value) => {
          setRange(value);
        }}
        style={{ width: 320, height: 40, marginLeft: 32, marginBottom: 32 }}
        minimumValue={0}
        maximumValue={30}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      /> */}
      <TextInput
        className="bg-blue-100 border-2 mx-8 h-10 w-4/5 rounded pl-2 mb-5"
        placeholder="Search for a dancer"
        keyboardType="default"
        onChangeText={setSearchText}
      />
      <Button
        title="Search"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full-5"
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
    </ScrollView>
  );
};

export default Search;
