import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
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
import Chat from './src/pages/Chat';
import Location from './src/components/Location';
import SingleProfile from './src/pages/SingleProfile';
import WelcomePage from './src/pages/WelcomePage';

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    backgroundGradient: 'vertical',
    backgroundGradientTop: 'rgb(119, 0, 200)'[
      ('rgb(119, 0, 200)', 'rgb(95, 0, 160)', 'rgb(60, 0, 100)')
    ],
  },
};

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const logout = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setCurrentUser(user);
      }
    });
    return () => logout();
  });
  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ContextWrapper>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="WelcomePage" component={WelcomePage} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="CreateProfile" component={CreateProfile} />
          <Stack.Screen
            name="Home"
            component={Home}
            currentUser={currentUser}
          ></Stack.Screen>
          <Stack.Screen name="Chats" component={Chats} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="MyLocation" component={Location} />
          <Stack.Screen name="SingleProfile" component={SingleProfile} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextWrapper>
  );
}
