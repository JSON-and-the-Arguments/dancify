import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigation } from "@react-navigation/native";

import { getUser } from "../../queryutils";

const SingleProfile = ({ route, navigation }) => {
  const { user } = route.params;
  const [profile, setProfile] = useState({});

  useEffect(() => {
    getUser(user).then((res) => {
      return setProfile(res);
    });
  }, []);

  return (
    <View className="bg-black-100">
      <Navbar />
      <ScrollView>

      <Image
        className="w-20 h-20 border-2 bg-black-100"
        source={{
          uri: `https://storage.googleapis.com/dancify-728c9.appspot.com/userPictures/${profile.uid}/profilePicture.jpeg`,
        }}
      />

       <View>
        <Text>{profile.firstname}</Text>
        <Text className="bg-red-100">{profile.lastname}</Text>
        <Text>{profile.dancestyles}</Text>
        <Text>{profile.role}</Text>
      </View> 
      </ScrollView>
    </View>
  );
};

// const styles = StyleSheet.create({
//   img: {
//     height: 20,
//     width: 20,
//   },
export default SingleProfile;
