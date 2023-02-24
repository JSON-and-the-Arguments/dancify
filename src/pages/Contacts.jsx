// import { useRoute } from '@react-navigation/native';
// import { collection, onSnapshot, query, where } from 'firebase/firestore';
// import { useEffect } from 'react';
// import { useState } from 'react';
// import { useContext } from 'react';
// import { FlatList, Text, View } from 'react-native';
// import GlobalContext from '../../context/Context';
// import useContacts from '../../hooks/useHooks';
// import ListItem from '../components/Listitem';

// const Contacts = () => {
//   const contacts = useContacts();
//   const route = useRoute();
//   const image = route.params && route.params.image;

//   return (
//     <FlatList
//       data={contacts}
//       keyExtractor={(_, i) => i}
//       renderItem={({ item }) => <ContactPreview contact={item} image={image} />}
//     />
//   );
// };

// function ContactPreview({ contact }) {
//   const { rooms } = useContext(GlobalContext);
//   const [user, setUser] = useState(contact);

//   useEffect(() => {
//     const q = query(
//       collection(db, 'users'),
//       where('email', '==', contact.email)
//     );

//     const logout = onSnapshot(q, (snapshot) => {
//       if (snapshot.docs.length) {
//         const userDoc = snapshot.docs[0].data();
//         setUser((prevUser) => ({ ...prevUser, userDoc }));
//       }
//     });
//     return () => logout();
//   }, []);
//   return (
//     <ListItem
//       type={contacts}
//       user={user}
//       image={image}
//       room={rooms.find((room) => room.usersArray.includes(contact.email))}
//     />
//   );
// }

// export default Contacts;
