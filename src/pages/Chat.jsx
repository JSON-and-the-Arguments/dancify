// @refresh reset
import { useRoute } from '@react-navigation/native';
import 'react-native-get-random-values';
import { nanoid } from 'nanoid';
import { Text, View } from 'react-native';
import { auth, db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useEffect } from 'react';

const randomId = nanoid();

const Chat = () => {
  const { currentUser } = auth;
  const route = useRoute();
  const room = route.params.room;
  const userB = route.params.user;
  const sender = currentUser.uid;

  const roomId = room ? room.id : randomId;

  const roomRef = doc(db, 'rooms', roomId);
  const roomMessagesRef = collection(db, 'rooms', roomId, 'messages');

  useEffect(() => {
    async () => {
      if (!room) {
        const currentUserData = {
          displayName: currentUser.displayName,
          id: currentUser.uid,
        };
        const userBData = {
          displayName: userB.displayName,
          id: userB.uid,
        };
        const roomData = {
          users: [currentUserData, userBData],
          usersArray: [currentUser.uid, userB.uid],
        };
        try {
          await setDoc(roomRef, roomData);
        } catch (error) {
          console.log(error);
        }
      }
    };
  });

  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default Chat;
