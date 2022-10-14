import {
  Firestore,
  getFirestore,
  initializeFirestore,
  firestore,
  getDocs,
  doc,
  updateDoc,
  getDoc,
  setDoc,
  collection,
  query,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config';
import { decode, encode } from 'base-64';

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});

exports.getUsers = async (params) => {
  let paramToQ = params == undefined ? '' : params.user;
  const q = query(collection(db, 'users'));
  const querySnapshot = await getDocs(q);
  const newArray = [];

  if (paramToQ === '' || paramToQ === null) {
    querySnapshot.forEach((doc) => {
      const { email, password, username } = doc.data();
      newArray.push(doc.data());
    });
  } else {
    querySnapshot.forEach((doc) => {
      const { email, password, username } = doc.data();
      if (doc.id === paramToQ) {
        newArray.push(doc.data());
      }
    });
  }

  // const users = await firestore().collection('users').get()
  // const docRef = doc(db, "users", "pawel");
  // const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     console.log("Document data:", docSnap.data());
  //   } else {
  //     // doc.data() will be undefined in this case
  //     console.log("No such document!");
  //   }
  return newArray;
};
