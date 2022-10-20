import {
  View,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

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
          className="bg-blue-100 border-2 mx-8 h-10 w-4/5 rounded pl-2 mb-5"
          placeholder="Search for a dancer"
          keyboardType="default"
          onChangeText={setSearchText}
        />
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
      </View>
    </ScrollView>
  );
};

export default Search;
