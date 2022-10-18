
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
  addDoc,
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
exports.getUser = async (uid) => {
  //const user = (doc(collection(db,"users")),`${uid}`)
  const docRef = doc(db, "users", `${uid}`);
  const docSnap = await getDoc(docRef);

  if (docSnap) {
    return  docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

exports.addContact = async (uid, userB) => {
  
  return await setDoc(
    doc(
      collection(doc(collection(db, 'users'), `${uid}`), 'contacts'),
      `${userB}`
    ),
    { uid: `${userB}` }
  );
};

exports.getUsersByQuery = async (item) => {
  
  
  let param1 = item.dancestyles == undefined ? '' : item.dancestyles
  let param2 = item.role == undefined ? '' : item.role
  const usersCollection = collection(db, 'users')
  const compoundQuery = query(usersCollection, where('dancestyles', '==', item.dancestyles), where('role', '==', item.role));
  const danceQuery = query(usersCollection, where('dancestyles', '==', item.dancestyles))
  const roleQuery = query(usersCollection, where('role', '==', item.role))
  const newArray = []
  
  if (param2 === '' || param2 === null) {
    const querySnapshot = await getDocs(danceQuery);
    querySnapshot.forEach((doc) => {
      newArray.push(doc.data());
      
    });
  }

  if (param1 === '' || param1 === null) {
    const querySnapshot = await getDocs(roleQuery);
    querySnapshot.forEach((doc) => {
      newArray.push(doc.data());
      
    });
  }

  else {
    const querySnapshot = await getDocs(compoundQuery);
    querySnapshot.forEach((doc) => {
      newArray.push(doc.data());
      
    });
  }
  
  return newArray
  
};
