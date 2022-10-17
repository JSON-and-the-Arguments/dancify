import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './src/pages/SignUp';
import CreateProfile from './src/pages/CreateProfile';
import Home from './src/pages/Home';
import SingleProfile from './src/pages/SingleProfile';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CreateProfile" component={CreateProfile} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SingleProfile" component={SingleProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
