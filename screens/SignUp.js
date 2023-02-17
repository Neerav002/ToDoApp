import {Text, View, TextInput, Button } from 'react-native';
import AppStyles from '../styles/AppStyles';
import InlineTextButton from '../components/InlinetextButton';
import React, {useState} from 'react'; 
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

const auth = getAuth();

export default function SignUp({ navigation }) {

  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");
  let [confirmPassword, setConfirmPassword] = React.useState(""); 
  let [validationMessage, setValidationMessage] = React.useState("");
  let [isBtnDisabled,setIsBtnDisabled] = useState(false)

  let validateAndSet = (value, valueToCompare, setValue) => {
    if(value !== valueToCompare){
        setValidationMessage("Passwords Don't Match ");
    }else{
        setValidationMessage("");
    }

    setValue(value);
  };

  let signUp = () => {
    if(password === confirmPassword){
      setIsBtnDisabled(true)
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        sendEmailVerification(auth.currentUser)
        navigation.navigate("ToDo", {user: userCredential.user });
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setIsBtnDisabled(false)
          })
      .catch((error) => {
        setValidationMessage(error.message);setIsBtnDisabled(false)
      });
    }
    
  }

  return (
    <View style={AppStyles.container}>
    <View style={AppStyles.innerContainer}>
      <Text style={AppStyles.header}>Sign Up</Text>
      <Text style={AppStyles.errorText}>{validationMessage}</Text>
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
      onChangeText={(value) => validateAndSet(value, confirmPassword, setPassword)}  
      />
      <TextInput 
      style={[AppStyles.textInput , AppStyles.lightText ,AppStyles.darkTextInput]} 
      placeholder='Confirm Password' 
      placeholderTextColor="#BEBEBE" 
      secureTextEntry={true} 
      value={confirmPassword}
      onChangeText={(value) => validateAndSet(value, password, setConfirmPassword)}  
      />
       <View style={[AppStyles.rowContainer, AppStyles.topMargin]}></View>
      <Button title='Sign Up' onPress={signUp} color='#000000' disabled={isBtnDisabled}/>
      
      <View style={[AppStyles.rowContainer, AppStyles.topMargin]}>
      <Text style={AppStyles.lightText}>Already have an account? </Text>
      <InlineTextButton text="Login" onPress = {() => navigation.popToTop() }/>
      </View>
      </View>
    </View>
  );
}


