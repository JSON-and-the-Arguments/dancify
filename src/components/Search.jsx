import { View, TextInput, Text, Button } from "react-native";
import Slider from "@react-native-community/slider";
import { useState } from "react";

const Search = () => {
  const [range, setRange] = useState(0);
  return (
    <View>
      <Text className="mx-8">Range: {range} miles</Text>
      <Slider
        step={5}
        onSlidingComplete={(value) => {
          setRange(value);
        }}
        style={{ width: 320, height: 40, marginLeft: 32 }}
        minimumValue={0}
        maximumValue={30}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
      <TextInput
        className="bg-blue-100 border-2 mx-8 h-10"
        placeholder="Find user"
        keyboardType="default"
      />
      <Button
        title="Search"
        className="bg-blue-500 hover:bg-blue-700 text-white  font-bold py-2 px-4 rounded-full-5"
      />
    </View>
  );
};

export default Search;
