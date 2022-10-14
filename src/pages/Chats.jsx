import { auth, db } from '../../firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useContext, useEffect } from 'react';
import { Text, View } from 'react-native';
import GlobalContext from '../../context/Context';
import Navbar from '../components/Navbar';

const Chats = () => {
  const { currentUser } = auth;
  const { rooms, setRooms } = useContext(GlobalContext);

  const chatsQuery = query(
    collection(db, 'rooms'),
    where('usersArray', 'array-contains', currentUser.uid)
  );

  useEffect(() => {
    const logout = onSnapshot(chatsQuery, (querySnapshot) => {
      const parsedChats = querySnapshot.docs
        .filter((doc) => doc.data().lastMessage)
        .map((doc) => ({
          ...doc.data,
          id: doc.id,
          userB: doc.data().users.find((user) => user.uid != currentUser.uid),
        }));
      setRooms(parsedChats);
    });
    return () => logout();
  });

  return (
    <View>
      <Navbar />
      <Text>
        {rooms.map((room) => {
          room;
        })}
      </Text>
      <Text>{currentUser.email}</Text>
    </View>
  );
};

export default Chats;
