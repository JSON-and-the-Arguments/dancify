import React from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { useState, useEffect } from 'react';
import { getUsers } from '../../queryutils';
import UserCard from '../components/UserCard';
import Search from '../components/Search';
import Navbar from '../components/Navbar';
import { useNavigation } from '@react-navigation/native';

const SearchPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const params = navigation.getState().routes[0].params;
  useEffect(() => {
    setLoading(true);
    getUsers(params).then((response) => {
      setUsers(response);
      setLoading(false);
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
        
        <KeyboardAvoidingView
    behavior='position'
    >
        <Navbar />
        <ScrollView horizontal={true}>
          {users?.map((user, index) => {
            return <UserCard key={index} user={user} />;
          })}
        </ScrollView>
        <Search />
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

export default SearchPage;
