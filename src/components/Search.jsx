import {
  View,
  TextInput,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const Search = () => {
  const [searchText, setSearchText] = useState(null);
  const navigation = useNavigation();

  return (
    <ScrollView>
      <View className="items-center">
        <Text className="mt-2 text-center text-sm">
          Select the desired range to find other dancers
        </Text>
        <TextInput
          className="bg-white border-2 mx-8 h-10 w-4/5 rounded pl-2 mb-5"
          placeholder="Search for a dancer"
          keyboardType="default"
          onChangeText={setSearchText}
        />
        <LinearGradient
          start={{ x: 0.2, y: 0.1 }}
          end={{ x: 0.9, y: 0.3 }}
          colors={['#A4508B', '#5F0A87']}
          className="mt-1 px-10 py-3 rounded-md border-none"
        >
          <TouchableOpacity
            className="bg-rose-400 rounded-lg py-2"
            onPress={() => {
              navigation.navigate('Home', {
                user: searchText,
              });
            }}
          >
            <Text className="text-l">Search</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-rose-400 rounded-lg py-2"
            onPress={() => {
              navigation.navigate('Home', {
                user: searchText,
              });
            }}
          >
            <Text className="text-l font-bold bottom-0 ">All users</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-rose-500 rounded-lg py-2 "
            onPress={() => navigation.navigate('MyLocation')}
          >
            <Text className="text-l font-bold bottom-0 ">Location</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </ScrollView>
  );
};

export default Search;
