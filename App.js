import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/components/Home";
import CreateProfile from "./src/components/CreateProfile";
import SearchPage from "./src/components/SearchPage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CreateProfile" component={CreateProfile} />
        <Stack.Screen name="SearchPage" component={SearchPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
