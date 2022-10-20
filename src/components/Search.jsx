import { View, TextInput, Text, Button, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';

const Search = () => {
  // const [range, setRange] = useState(0);
  const [searchText, setSearchText] = useState(null);
  const navigation = useNavigation();

  return (
    <ScrollView>
    <View className="items-center">
      
      
      
      <TextInput
        className="bg-white border-2 mx-8 h-10 w-4/5 rounded pl-2 mb-5"
        placeholder="Search for a dancer"
        keyboardType="default"
        onChangeText={setSearchText}
      />
      {/* <TouchableOpacity
        
        className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full-20"
        onPress={() => {
          navigation.navigate("Home", {
            user: searchText,
          });
        }}
      >
        <Text className="text-l">Search</Text>
      </TouchableOpacity> */}
      <LinearGradient
        start={{ x: 0.2, y: 0.1 }}
        end={{ x: 0.9, y: 0.3 }}
        colors={[ '#A4508B','#5F0A87']}
        // style={{ flex: 1, paddingTop: headerPadding ? headerHeight : 0 }}
        className="mt-1 px-10 py-3 rounded-md border-none"
        // style={styles.button}
        >
            <TouchableOpacity
                onPress={() => {navigation.navigate('Home')}}>
                <Text
                className="text-white text-lg"
                >
                    Search
                </Text>
            </TouchableOpacity>
            
        </LinearGradient>

     
    </View>
    </ScrollView>
  );
};

export default Search;
