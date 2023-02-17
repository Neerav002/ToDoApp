import {Text, View, TextInput, Button } from 'react-native';
import AppStyles from '../styles/AppStyles';
import InlineTextButton from '../components/InlinetextButton';
import React,{useState} from 'react'; 
import { auth } from "../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";



export default function Login({ navigation }) {

  if(auth.currentUser){
    navigation.navigate("ToDo");
  }else{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate('ToDo');
      }
    });
  }

  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");
  let [errorMessage, setErrorMessage] = React.useState("");
  let [isBtnDisabled,setIsBtnDisabled] = useState(false)

  let login = () => {
    if(email !== "" && password !== ""){
      
      setIsBtnDisabled(true)
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      navigation.navigate("ToDo", { user: userCredential.user });
      setEmail("");
      setPassword("");
      setIsBtnDisabled(false)
      })
      .catch((error) => {
      setErrorMessage(error.message);
      
      setIsBtnDisabled(false);
      });
    }else{
      setErrorMessage("Please Enter Email and Password");
    }
  }

  return (
    <View style={AppStyles.container}>
    <View style={AppStyles.innerContainer}>
      <Text style={AppStyles.header}>Login</Text>
      <Text style={AppStyles.errorText}>{errorMessage}</Text>
      <TextInput 
      style={[AppStyles.textInput , AppStyles.lightText ,AppStyles.darkTextInput]} 
      placeholder='Email' 
      placeholderTextColor="#BEBEBE" 
      value={email}
      onChangeText={setEmail} 
      />
      <TextInput 
      style={[AppStyles.textInput , AppStyles.lightText ,AppStyles.darkTextInput]} 
      placeholder='Password' 
      placeholderTextColor="#BEBEBE" 
      secureTextEntry={true} 
      value={password}
      onChangeText={setPassword}  
      />
     
      <View style={[AppStyles.rowContainer, AppStyles.bottomMargin,AppStyles.rightAligned]}>
      <InlineTextButton text="Forgot Password ?" onPress={() => navigation.navigate("ResetPassword")} />
      </View>
      <Button title='Login' onPress={login} color='#000' disabled={isBtnDisabled}/>
      <View style={[AppStyles.rowContainer, AppStyles.topMargin]}>
      <Text style={AppStyles.lightText}>Don't have an account? </Text>
      <InlineTextButton text="Sign Up" onPress={() => navigation.navigate("SignUp")} />
      </View>
      </View>
    </View>
  );
}


