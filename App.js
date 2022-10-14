import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './src/pages/SignUp';
import CreateProfile from './src/pages/CreateProfile';
import Home from './src/pages/Home';
import Chats from './src/pages/Chats';
import { Text } from 'react-native';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import ContextWrapper from './context/ContextWrapper';

const Stack = createNativeStackNavigator();

export default function App() {
  const [currentUser, setCurrentUSer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const logout = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setCurrentUSer(user);
      }
    });
    return () => logout();
  });
  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ContextWrapper>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen
            name="Home"
            component={Home}
            currentUser={currentUser}
          />
          <Stack.Screen name="CreateProfile" component={CreateProfile} />
          <Stack.Screen name="Chats" component={Chats} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextWrapper>
  );
}
