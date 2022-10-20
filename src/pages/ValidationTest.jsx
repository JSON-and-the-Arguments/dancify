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
 import { getUsers } from "../../queryutils";
 
 getUsers();
 
 const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mode, setMode] = useState("signUp");
    const [validEmail, setValidEmail] = useState(false);
    const [validPass, setValidPass] = useState(false);
    const [emailStyle, setEmailStyle] = useState({});
    const [passStyle, setPassStyle] = useState({});
 
    const navigation = useNavigation();
 
    const validateEmail = (email) => {
       const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
 
       if (emailRegex.test(email) === true) {
          setValidEmail(true);
          setEmailStyle({});
       } else {
          alert("Invalid email.");
          setEmailStyle({ backgroundColor: "pink" });
       }
    };
 
    const validatePass = (password) => {
       const passRegex =
          /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
 
       if (passRegex.test(password) === true) {
          setValidPass(true);
          setPassStyle({});
       } else {
          alert(
             "Invalid password. Must contain at least one lowercase letter, one uppercase letter, one digit, one special character and is at least eight characters long"
          );
          setPassStyle({ backgroundColor: "pink" });
       }
    };
 
    const addUser = async () => {
       if (mode === "signUp" && validEmail === true && validPass === true) {
          validateEmail(email);
          validatePass(password);
          signUp(email, password);
          navigation.navigate("CreateProfile");
       }
       // .catch((err) => {
       //   Alert.alert('This account already exist', 'Login to start using the app')
       // })
    };
    if (mode === "logIn") {
       validateEmail(email);
       validatePass(password);
       signIn(email, password);
       navigation.navigate("Home");
 
       // .catch((err) => {
       //   Alert.alert("You don't have an account", "Create one first")
       // })
    }
 
    return (
       <View>
          <Navbar />
          <View className="justify-center items-center mt-5  space-y-5 top-10">
             <Text className="text-lg">Email</Text>
             <TextInput
                value={email}
                onChangeText={setEmail}
                className="mt-1 block w-80 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
                placeholder="e.g. johnsmith@gmail.com"
                required
                keyboardType="default"
                style={emailStyle}
             />
             <Text className="text-lg">Password</Text>
             <TextInput
                value={password}
                onChangeText={setPassword}
                className="mt-1 mb-10 block w-80 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
                placeholder="Tip: Choose a strong password"
                required
                keyboardType="default"
                style={passStyle}
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
                <Text className="text-base mt-5">
                   {mode === "signUp"
                      ? `Already have an account? Log in`
                      : `Don't have an account? Sign Up`}
                </Text>
             </TouchableOpacity>
          </View>
       </View>
    );
 };
 
 export default SignUp;
 