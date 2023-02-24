import {
  View,
  TextInput,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Slider from "@react-native-community/slider";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const Search = ({ range }) => {
  const [searchText, setSearchText] = useState(null);
  const navigation = useNavigation();

  return (
    <>
      <View className="flex-row w-full items-center justify-center mt-0">
        <View className="flex-row p-0 space-x-2 items-center mb-5">
          <LinearGradient
            start={{ x: 0.2, y: 0.1 }}
            end={{ x: 0.9, y: 0.3 }}
            colors={["#A4508B", "#5F0A87"]}
            className=" mt-10  px-10 py-5 rounded-l-lg border-none"
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Home", {
                  user: searchText,
                });
              }}
            >
              <Text className="text-white text-lg">All users</Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            start={{ x: 0.2, y: 0.1 }}
            end={{ x: 0.9, y: 0.3 }}
            colors={["#A4508B", "#5F0A87"]}
            className="mt-10 px-10 py-5 rounded-r-lg border-none"
          >
            <TouchableOpacity onPress={() => navigation.navigate("MyLocation")}>
              <Text className="text-white text-lg">Location</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>

      <TextInput
        className="bg-white border-2 mx-8 h-10 w-4/5 rounded pl-2 mb-5"
        placeholder="Search for a dancer"
        keyboardType="default"
        onChangeText={setSearchText}
      />
      <View className="flex-row w-full items-center justify-center mt-0">
        <View className="flex-row p-0 space-x-2 items-center mb-5">
          <LinearGradient
            start={{ x: 0.2, y: 0.1 }}
            end={{ x: 0.9, y: 0.3 }}
            colors={["#A4508B", "#5F0A87"]}
            className="mt-1 px-10 py-3 rounded-md border-none"
          >
            <TouchableOpacity
              className=""
              onPress={() => {
                navigation.navigate("Home", {
                  user: searchText,
                });
              }}
            >
              <Text className="text-white text-lg">Search</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
      <Text className="mt-2 text-center text-sm text-white ">
        Select the desired range to find other dancers
      </Text>
      <Text className="text-white text-center mt-3 mb-3 text-base">
        {range} miles
      </Text>
    </>
  );
};

export default Search;
