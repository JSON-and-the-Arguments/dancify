import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/components/Home'
import CreateProfile from './src/components/CreateProfile';
import UsersList from './src/components/UsersList';


const Stack = createNativeStackNavigator();





export default function App() {


  
  
  return (


    <NavigationContainer>
      
        <Stack.Navigator>
          
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="CreateProfile" component={CreateProfile}/>
            <Stack.Screen name="UsersList" component={UsersList} />
        </Stack.Navigator>
        
    </NavigationContainer>

  );
}


