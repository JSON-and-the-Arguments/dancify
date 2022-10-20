import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import { useState, useEffect } from 'react';
import { getUsers, getUser } from '../../queryutils';
import UserCard from '../components/UserCard';
import Search from '../components/Search';
import Navbar from '../components/Navbar';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../firebase';
import { getDistance } from 'geolib';

const Home = ({ route: { params } }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState(40);
  const [myLocation, setMyLocation] = useState({});
  const navigation = useNavigation();
  const { currentUser } = auth;

  useEffect(() => {
    setLoading(true);
    getUser(currentUser.uid)
      .then((me) => {
        setRange(me.range);
        setMyLocation(me.location);
      })
      .then(() => {
        getUsers(params).then((response) => {
          setUsers(response);
          setLoading(false);
        });
      });
  }, [params]);

  if (loading) {
    return (
      <View style={[styles.loadingContainer, styles.horizontal]}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  } else {
    return (
      <View>
        <KeyboardAvoidingView behavior="position">
          <Navbar />
          <ScrollView horizontal={true}>
            {users
              .filter((user) => {
                return (
                  Math.round(
                    (getDistance(user.location, myLocation) / 1000) * 0.62137
                  ) <= range
                );
              })
              .map((filteredUser, index) => {
                return <UserCard key={index} user={filteredUser} />;
              })}
          </ScrollView>
          <Search />
          <TouchableOpacity
            className="mb-4 bg-blue-600 px-4 rounded-lg"
            onPress={() => navigation.navigate('Chats')}
          >
            <Text className="text-xl text-white">Chats</Text>
          </TouchableOpacity>
          <Text className="mx-8 text-center mt-3 mb-3 text-base">
            {range} miles
          </Text>
          <Slider
            step={5}
            value={range}
            onSlidingComplete={(value) => setRange(value)}
            style={{ width: 320, height: 40 }}
            minimumValue={0}
            maximumValue={40}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          />
        </KeyboardAvoidingView>
      </View>
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
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default Home;
