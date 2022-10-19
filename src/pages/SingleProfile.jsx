import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigation } from "@react-navigation/native";
import { getUser } from "../../queryutils";
import AddMessage from "../components/AddMessage";

const SingleProfile = ({ route, navigation }) => {
  const { user } = route.params;
  const [profile, setProfile] = useState({});

  useEffect(() => {
    getUser(user).then((res) => {
      return setProfile(res);
    });
  }, []);

  return (
    <View>
      <Navbar />
      <View className="bg-red-100 items-center border-4 border-red-500/10 m-5  h-120 rounded  ">
        <View className="p-8">
          <Image
            className=" w-60 h-60 items- border-solid border-4 border-red-500/10 rounded-lg "
            source={{
              uri: `https://storage.googleapis.com/dancify-728c9.appspot.com/userPictures/${profile.uid}/profilePicture.jpeg`,
            }}
          />
        </View>
        <View className="p-10 pt-5 list-decimal">
          <Text className="font-semibold">Name: {profile.firstname}</Text>
          <Text className="font-semibold">Last name: {profile.lastname}</Text>
          <Text className="font-semibold">style: {profile.dancestyles}</Text>
          <Text className="font-semibold">role: {profile.role}</Text>
          <Text className="font-semibold">about: {profile.about}</Text>
        </View>
        <AddMessage user={user} />
      </View>
    </View>
  );
};

export default SingleProfile;
