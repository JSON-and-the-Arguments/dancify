import * as ImagePicker from 'expo-image-picker';
import 'react-native-get-random-values';
import { nanoid } from 'nanoid';
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';
//import { storage } from "./firebase"
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config';

const app = initializeApp(firebaseConfig);

export async function pickImage() {
  let result = ImagePicker.launchCameraAsync();
  return result;
}
export async function askForPermission() {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  return status;
}

export async function uploadImage(uri, path, fName) {
  
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });
  
  const fileName = fName || nanoid();
  const imageRef = ref(getStorage(app), `${path}/${fileName}.jpeg`);

  const snapshot = await uploadBytes(imageRef, blob, {
    contentType: 'image/jpeg',
  });

  blob.close();

  const url = await getDownloadURL(snapshot.ref);

  return { url, fileName };
}

export async function getImages(path) {
  getDownloadURL(ref(getStorage(app), `${path}/profilePicture.jpeg`)).then(
    (url) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = (event) => {
        const blob = xhr.response;
      };
      xhr.open('GET', url);
      xhr.send();
    }
  );
  
}

export async function displayPhoto() {
  
  const storage = getStorage();
  const httpsReference = ref(
    storage,
    'gs://dancify-728c9.appspot.com/userPictures/Chad/profilePicture.jpeg'
  );
  getDownloadURL(httpsReference);
  
}

const palette = {
  tealGreen: '#128c7e',
  tealGreenDark: '#075e54',
  green: '#25d366',
  lime: '#dcf8c6',
  skyblue: '#34b7f1',
  smokeWhite: '#ece5dd',
  white: 'white',
  gray: '#3C3C3C',
  lightGray: '#757575',
  iconGray: '#717171',
};

export const theme = {
  colors: {
    background: palette.smokeWhite,
    foreground: palette.tealGreenDark,
    primary: palette.tealGreen,
    tertiary: palette.lime,
    secondary: palette.green,
    white: palette.white,
    text: palette.gray,
    secondaryText: palette.lightGray,
    iconGray: palette.iconGray,
  },
};
