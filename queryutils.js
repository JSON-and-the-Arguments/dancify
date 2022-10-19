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
  where
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config';
import { decode, encode } from 'base-64';
import { updateCurrentUser } from 'firebase/auth';
import { auth } from './firebase';

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
  const {currentUser} = auth;
  let paramToQ = params == undefined ? "" : params.user;
  const q = query(collection(db, "users"));
  const querySnapshot = await getDocs(q);
  const newArray = [];

  if (paramToQ === "" || paramToQ === null) {
    querySnapshot.forEach((doc) => {
      if (doc.data().uid !== currentUser.uid) {
        newArray.push(doc.data());
      }
      
    });
  } else {
    querySnapshot.forEach((doc) => {
      if (doc.id == paramToQ) {
        newArray.push(doc.data());
      }
    });
  }

  return newArray;
};
exports.getUser = async (uid) => {
  
  const docRef = doc(db, "users", `${uid}`);
  const docSnap = await getDoc(docRef);
console.log( docSnap.data(), '<<< docSnap');
  // if (docSnap.data().uid == uid) {
    return  docSnap.data();
  // }
};


exports.addContact = async (uid, userB) => {
  return await setDoc(
    doc(
      collection(doc(collection(db, "users"), `${uid}`), "contacts"),
      `${userB}`
    ),
    { uid: `${userB}` }
  );
};

exports.getUsersByQuery = async (item) => {
  let param1 = item.dancestyles == undefined ? "" : item.dancestyles;
  let param2 = item.role == undefined ? "" : item.role;
  const usersCollection = collection(db, "users");
  const compoundQuery = query(
    usersCollection,
    where("dancestyles", "==", item.dancestyles),
    where("role", "==", item.role)
  );
  const danceQuery = query(
    usersCollection,
    where("dancestyles", "==", item.dancestyles)
  );
  const roleQuery = query(usersCollection, where("role", "==", item.role));
  const newArray = [];

  if (param2 === "" || param2 === null) {
    const querySnapshot = await getDocs(danceQuery);
    querySnapshot.forEach((doc) => {
      newArray.push(doc.data());
    });
  }

  if (param1 === "" || param1 === null) {
    const querySnapshot = await getDocs(roleQuery);
    querySnapshot.forEach((doc) => {
      newArray.push(doc.data());
    });
  } else {
    const querySnapshot = await getDocs(compoundQuery);
    querySnapshot.forEach((doc) => {
      newArray.push(doc.data());
    });
  }

  return newArray;
};


