import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/components/Home'
import CreateProfile from './src/components/CreateProfile';
import UsersList from './src/components/UsersList';
import MapTest from './src/components/MapTest';
import MyLocation from './src/components/Location';

const Stack = createNativeStackNavigator();





export default function App() {


  
  
  return (


    <NavigationContainer>
      
        <Stack.Navigator>      
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="CreateProfile" component={CreateProfile}/>
            <Stack.Screen name="UsersList" component={UsersList} />
            <Stack.Screen name="MapTest" component={MapTest} />
            <Stack.Screen name="MyLocation" component={MyLocation} />
        </Stack.Navigator>
        
    </NavigationContainer>

  );
}


