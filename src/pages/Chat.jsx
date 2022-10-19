// @refresh reset
import { useNavigation, useRoute } from '@react-navigation/native';
import 'react-native-get-random-values';
import { nanoid } from 'nanoid';
import { Text, View } from 'react-native';
import { auth, db } from '../../firebase';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { useState } from 'react';
import {getUser} from '../../queryutils'
const randomId = nanoid();

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const { currentUser } = auth;
  const route = useRoute();
  const room = route.params.room;
  const userB = route.params.userB;
  const sender = currentUser.uid;

  const roomId = room ? room.id : randomId;
  const roomRef = doc(db, 'rooms', roomId);
  const roomMessagesRef = collection(db, 'rooms', roomId, 'messages');
  // const navigation = useNavigation();

  useEffect(() => {
    getUser(userB).then((userBinfo) => {

    
    (async () => {
      if (!room) {
        const currentUserData = {
          id: currentUser.uid,
        };
        const userBData = {
          id: userB,
          firstname: userBinfo.firstname,
        };
        const roomData = {
          users: [currentUserData, userBData],
          usersArray: [currentUser.uid, userB],
        };
        try {
          await setDoc(roomRef, roomData);
        } catch (error) {
          console.log(error);
        }
      }
    })();
    })
  }, []);



  useEffect(() => {
    const logout = onSnapshot(roomMessagesRef, (querySnapshot) => {
      const messagesFirestore = querySnapshot
        .docChanges()
        .filter(({ type }) => type === 'added')
        .map(({ doc }) => {
          const message = doc.data();
          return { ...message, createdAt: message.createdAt.toDate() };
        });
      appendMessages(messagesFirestore);
    });
    return () => logout();
  }, []);

  const appendMessages = useCallback(
    (messages) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    },
    [messages]
  );

  const onSend = async (messages = []) => {
    const writes = messages.map((m) => addDoc(roomMessagesRef, m));
    const lastMessage = messages[messages.length - 1];
    writes.push(updateDoc(roomRef, { lastMessage }));
    await Promise.all(writes);
  };

  return (
    <GiftedChat onSend={onSend} messages={messages} user={{ _id: sender }} />
  );
};

export default Chat;
