import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  Button,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Dropdown from '../components/Dropdown';
import Slider from '@react-native-community/slider';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { pickImage, askForPermission, uploadImage } from '../../photoutils';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Navbar from '../components/Navbar';
import { updateProfile } from 'firebase/auth';
import axios from 'axios';
import Ionicons from '@expo/vector-icons/Ionicons';
import ScreenTemplate from '../components/ScreenTemplate';

const initialValues = {
  firstname: '',
  lastname: '',
  image: '',
  postcode: '',
  dancestyles: '',
  role: '',
  range: 0,
  available: false,
  about: '',
  location: '',
};

const dance = [
  { id: 1, name: 'salsa' },
  { id: 2, name: 'bachata' },
  { id: 3, name: 'kizomba' },
  { id: 4, name: 'rumba' },
];

const role = [
  { id: 1, name: 'lead' },
  { id: 2, name: 'follow' },
  { id: 3, name: 'both' },
];

const CreateProfile = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [range, setRange] = useState(0);
  const [isAvailable, setIsAvailable] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [selectedImage, setSelectedImage] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [postcodeVerified, SetPostcodeVerified] = useState(false);
  const [postcodeNotValid, SetPostcodeNotValid] = useState(false);

  const navigation = useNavigation();
  const { currentUser } = auth;

  useEffect(() => {
    (async () => {
      const status = await askForPermission();
      setPermissionStatus(status);
    })();
  }, []);

  const handleProfilePicture = async () => {
    const result = await pickImage();
    if (!result.cancelled) {
      setSelectedImage(result.uri);
      handleInputChange('image', result.uri);
    } else {
      Alert.alert('Image selection failed, try again');
    }
  };

  if (!permissionStatus) {
    return <Text>Loading</Text>;
  }
  if (permissionStatus !== 'granted') {
    return <Text>You need to allow this permission to access Dancify</Text>;
  }

  async function handleUploadPicture() {
    let photoURL;
    if (selectedImage) {
      const { url } = await uploadImage(
        selectedImage,
        `userPictures/${currentUser.uid}`,
        'profilePicture'
      );
      photoURL = url;
    }
    if (photoURL) {
      initialValues.image = photoURL;
    }
  }

  const handleInputChange = (val, val2) => {
    setValues({ ...values, [val]: val2 });
  };

  const patchUser = async () => {
    const user = auth.currentUser;
    const updateProf = doc(db, 'users', user.uid);
    if (!postcodeVerified) {
      alert('Postcode invalid, make sure there are no spaces');
    } else {
      await Promise.all([
        handleUploadPicture(),
        updateProfile(user, values),
        setDoc(updateProf, { ...values, uid: user.uid }),
      ]).then(() => {
        navigation.navigate('Home');
      });
    }
  };

  const toggleSwitch = () => setIsAvailable((previousState) => !previousState);

  const onSelect = (item) => {
    setSelectedItem(item);
    handleInputChange('dancestyles', item.name);
  };
  const onRoleSelect = (item) => {
    setSelectedRole(item);
    handleInputChange('role', item.name);
  };

  const getCoords = async (postcode) => {
    const pcRegex = /^([A-Z]{1,2}\d[A-Z\d]?) ?\d[A-Z]{2}|GIR ?0A{2}$/i;
    const matchedRegex = postcode.match(pcRegex);
    if (!pcRegex.test) {
      Alert.alert('Postcode Invalid, please check it has a space');
    } else {
      try {
        const res = await axios.get(
          `https://api.postcodes.io/outcodes/${matchedRegex[1]}`
        );
        handleInputChange('location', {
          latitude: res.data.result.latitude,
          longitude: res.data.result.longitude,
        });
        SetPostcodeVerified(true);
      } catch (err) {
        SetPostcodeVerified(false);
        SetPostcodeNotValid(true);
        Alert.alert('Postcode Invalid, check it has no spaces');
      }
    }
  };

  return (
    <ScreenTemplate>
      <>
        <Navbar />
        <ScrollView
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            onPress={handleProfilePicture}
            style={{
              marginTop: 15,
              marginBottom: 20,
              borderRadius: 120,
              width: 120,
              height: 120,
              backgroundColor: '#ffffff',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {!selectedImage ? (
              <MaterialCommunityIcons
                name="camera-plus-outline"
                size={45}
                color="black"
              />
            ) : (
              <Image
                source={{ uri: selectedImage }}
                style={{ width: '100%', height: '100%', borderRadius: 120 }}
              />
            )}
          </TouchableOpacity>

          <Text className="text-base text-white">First Name</Text>
          <TextInput
            value={values.firstname}
            onChangeText={(value) => handleInputChange('firstname', value)}
            className="mt-2 block w-80 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
            placeholder="John"
            required
            keyboardType="default"
          />
          <Text className="text-base text-white">Last Name</Text>
          <TextInput
            value={values.lastname}
            onChangeText={(value) => handleInputChange('lastname', value)}
            className="mt-2 block w-80 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
            placeholder="Smith"
            required
            keyboardType="default"
          />

          <Text className="text-base text-white">Post Code</Text>
          <TextInput
            value={values.postcode}
            onChangeText={(value) => handleInputChange('postcode', value)}
            onEndEditing={() => getCoords(values.postcode)}
            className="mt-2 mb-3 block w-80 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
            placeholder="M1 7ED"
            required
            keyboardType="default"
          />
          {postcodeVerified ? (
            <Text>
              <Ionicons name="md-checkmark-circle" size={14} color="green" />
              Postcode Valid
            </Text>
          ) : postcodeNotValid ? (
            <Text>
              <Ionicons name="md-close-circle" size={14} color="red" />
              Postcode Not Valid
            </Text>
          ) : (
            <Text></Text>
          )}

          <Text className="mt-5 mb-2 text-white text-base">Dance Styles</Text>
          <Dropdown value={selectedItem} data={dance} onSelect={onSelect} />

          <Text className="mt-5 mb-2 text-white text-base">Role</Text>
          <Dropdown value={selectedRole} data={role} onSelect={onRoleSelect} />

          <Text className="mt-5 mb-2  text-white text-base">
            Range: {range} miles
          </Text>
          <Slider
            step={5}
            value={range}
            onSlidingComplete={(value) => {
              setRange(value);
              handleInputChange('range', value);
            }}
            style={{ width: 320, height: 40 }}
            minimumValue={0}
            maximumValue={30}
            minimumTrackTintColor="purple"
            maximumTrackTintColor="white"
          />
          <Text className="mt-5 mb-2 text-white text-base">
            {isAvailable ? 'Available' : 'Not Available'}
          </Text>
          <Switch
            trackColor={{ false: '#767577', true: '#A4508B' }}
            thumbColor={isAvailable ? '#5F0A87' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            value={isAvailable}
            onValueChange={(value) => {
              toggleSwitch();
              handleInputChange('available', value);
            }}
          />
          <Text className="mt-5 mb-2 text-base text-white">
            Tell us about Yourself
          </Text>
          <TextInput
            value={values.about}
            onChangeText={(value) => {
              handleInputChange('about', value);
            }}
            className="mt-1  block w-80 px-3 py-2 h-20 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 text-clip overflow-hidden"
            placeholder="about"
            keyboardType="default"
          />
          <View className="mt-5 mb-10">
            <Button
              title="Create"
              onPress={patchUser}
              className="bg-blue-500 hover:bg-blue-700 text-white  font-bold py-2 px-4 rounded-full-5"
              disabled={
                values.firstname.length < 1 ||
                values.lastname.length < 1 ||
                values.postcode.length < 1 ||
                values.role.length < 1
              }
            />
          </View>
        </ScrollView>
      </>
    </ScreenTemplate>
  );
};

export default CreateProfile;
