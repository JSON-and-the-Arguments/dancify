import {
   View,
   Text,
   TextInput,
   Button,
   TouchableOpacity,
   Alert,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Navbar from "../components/Navbar";
import { signIn, signUp } from "../../firebase";

const SignUp = () => {
   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [mode, setMode] = useState("signUp");

   const navigation = useNavigation();
   const addUser = async () => {
      if (mode === "signUp") {
         await signUp(email, password)
            .then(() => {
               navigation.navigate("CreateProfile");
            })
            .catch((err) => {
               Alert.alert(
                  "This account already exist",
                  "Login to start using the app"
               );
            });
      }
      if (mode === "logIn") {
         await signIn(email, password)
            .then(() => {
               navigation.navigate("Home");
            })
            .catch((err) => {
               Alert.alert("You don't have an account", "Create one first");
            });
      }
   };

   return (
      <View>
         <Navbar />
         <View className="  justify-center items-center mt-5  space-y-5">
            <Text>Email</Text>
            <TextInput
               value={email}
               onChangeText={setEmail}
               className="mt-1 block w-80 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
               placeholder="email"
               required
               keyboardType="default"
            />
            <Text>Password</Text>
            <TextInput
               value={password}
               onChangeText={setPassword}
               className="mt-1 block w-80 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
               placeholder="password"
               required
               keyboardType="default"
            />
            <View>
               <Button
                  title={mode === "signUp" ? "Sign Up" : "Log in"}
                  disabled={!email || !password}
                  onPress={addUser}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full-5"
               />
            </View>
            <TouchableOpacity
               onPress={() =>
                  mode === "signUp" ? setMode("logIn") : setMode("signUp")
               }
            >
               <Text>
                  {mode === "signUp"
                     ? "Already have an account? Log in"
                     : "Don't have an account? Sign Up"}
               </Text>
            </TouchableOpacity>
         </View>
      </View>
   );
};

export default SignUp;
