import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigation } from '@react-navigation/native';
import { getUser } from '../../queryutils';
import AddMessage from '../components/AddMessage';
import ScreenTemplate from '../components/ScreenTemplate';

const SingleProfile = ({ route: { params } }) => {
  const initValues = {
    firstname: '',
    lastname: '',
    dancestyles: '',
    role: '',
    about: '',
  };
  const [profile, setProfile] = useState(initValues);
  const user = params.user;

  useEffect(() => {
    console.log(user);
    getUser(user).then((res) => {
      return setProfile(res);
    });
  }, []);

  return (
    <ScreenTemplate>
      <View className="items-center">
        <Navbar />
        <View className="bg-transparent w-80 items-center  m-5  h-120 rounded  ">
          <View className="p-8 w-full">
            <Image
              className=" w-full h-60  border-solid border-4  rounded-lg "
              source={{
                uri: `https://storage.googleapis.com/dancify-728c9.appspot.com/userPictures/${user}/profilePicture.jpeg`,
              }}
            />
          </View>
          <View className="space-y-3">
            <Text className="font-semibold text-white text-4xl capitalize">
              {profile.firstname} {profile.lastname}{' '}
            </Text>
            <Text className="font-semibold text-white text-xl capitalize">
              Dances: {profile.dancestyles}
            </Text>
            <Text className="font-semibold text-white text-xl capitalize">
              Role: {profile.role}
            </Text>
            <Text className="font-semibold text-white text-xl">
              Bio: {profile.about}
            </Text>
          </View>
          <AddMessage user={user} text={'Message'} />
        </View>
      </View>
    </ScreenTemplate>
  );
};

export default SingleProfile;
