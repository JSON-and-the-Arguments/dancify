import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator, Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { useState, useEffect } from "react";
import { getUsers, getUser } from "../../queryutils";
import UserCard from "../components/UserCard";
import Search from "../components/Search";
import Navbar from "../components/Navbar";
import Slider from '@react-native-community/slider';
import { useNavigation } from "@react-navigation/native";
import { nanoid } from "nanoid";
import { auth } from '../../firebase';
import { getDistance } from 'geolib';
import { LinearGradient } from 'expo-linear-gradient';
import ScreenTemplate from "../components/ScreenTemplate";

const SearchPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const[range, setRange] = useState(40)
  const[myLocation, setMyLocation] = useState({})
  const navigation = useNavigation();
  const params = navigation.getState().routes[0].params;
  const { currentUser } = auth;
  useEffect(() => {
    setLoading(true);
    getUsers(params).then((response) => {
      setUsers(response);
      setLoading(false);
    });
  }, [params]);
  console.log(currentUser.uid)
  const filterUsers = (value) => {
      setRange(value)
      getUser(currentUser.uid)
      .then((me) => {
        
        setMyLocation(me.location)
        
      })
  }
  
  if (loading) {
    return (
      <View style={[styles.loadingContainer, styles.horizontal]}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  } else {
    return (
      <ScreenTemplate>
      <View>
        
        {/* <KeyboardAvoidingView
    behavior='position'
    > */}
        <Navbar />
        <View>
        <ScrollView>
        <ScrollView horizontal={true}>
          {/* {users?.map((user, index) => {
            return <UserCard key={index} user={user} />;
          })} */}
          {users.filter((user) => {
     return Math.round((getDistance(user.location, myLocation) /1000)*0.62137)
         <= range })
    .map((filteredUser, index,) => {
      return <UserCard key={index} user={filteredUser} />;
    })}
        </ScrollView>
        <View className='flex-row w-full items-center justify-center mt-0'>
          
        <View className='flex-row p-0 space-x-2 items-center mb-5'>
            <LinearGradient
             start={{ x: 0.2, y: 0.1 }}
             end={{ x: 0.9, y: 0.3 }}
             colors={[ '#A4508B','#5F0A87']}
             className=" mt-10  px-10 py-5 rounded-l-lg border-none">
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
            colors={[ '#A4508B','#5F0A87']}
            className="mt-10 px-10 py-5 rounded-r-lg border-none">
              <TouchableOpacity
            
            onPress={() => navigation.navigate("MyLocation")}
            >
            <Text className="text-white text-lg">Location</Text>
          </TouchableOpacity>
            </LinearGradient>
            
          
        </View>
        </View>
        
        <Search />
       

        <Text className="mt-2 text-white text-center text-sm">Select the desired range to find other dancers</Text>
            <Text className="mx-8 text-white text-center mt-3 mb-3 text-base">{range} miles</Text>
            <Slider

          step={5}
          value={range}
          onSlidingComplete={(value) => filterUsers(value)}
          style={{width: 320, height: 40}}
          minimumValue={0}
          maximumValue={40}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          />
          </ScrollView>
          </View>
      </View>
      </ScreenTemplate>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    gap: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default SearchPage;
