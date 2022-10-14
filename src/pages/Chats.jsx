import { db } from '../../firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useContext, useEffect } from 'react';
import { Text, View } from 'react-native';
import GlobalContext from '../../context/Context';
import Navbar from '../components/Navbar';

const Chats = () => {
  // need user
  const { rooms, setRooms } = useContext(GlobalContext);
  const chatsQuery = query(
    collection(db, 'rooms'),
    where('userArray', 'array-contains', 'user')
  );

  useEffect(() => {
    const unsubsribe = onSnapshot(chatsQuery, (querySnap) => {
      const parsedChats = querySnap.docs
        .filter((doc) => doc.data().lastMessage)
        .map((doc) => ({
          ...doc.data,
          id: doc.id,
          userB: doc
            .data()
            .users.find((user) => user.username != currentUser.username),
        }));
    });
  });

  return (
    <View>
      <Navbar />
      <Text>Chats</Text>
    </View>
  );
};

export default Chats;
