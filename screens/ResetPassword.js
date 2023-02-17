import { Text, View, TextInput, Button} from 'react-native';
import AppStyles from '../styles/AppStyles';
import InlineTextButton from '../components/InlinetextButton';
import React,{useState} from 'react';
import { auth } from "../firebase";
import { sendPasswordResetEmail } from 'firebase/auth';

export default function ResetPassword({ navigation }) {

    let [email, setEmail] = React.useState("");
    let [errorMessage, setErrorMessage] = React.useState("");
    let [isBtnDisabled,setIsBtnDisabled] = useState(false)

    let resetPassword = () => {
      setIsBtnDisabled(true)
      sendPasswordResetEmail(auth, email)
      .then(() => {
      navigation.popToTop();
      setIsBtnDisabled(false);
      })
      .catch((error) => {
      setErrorMessage(error.message);
      setIsBtnDisabled(false);
      });
    }


    return(
      <View style={AppStyles.container}>
      <View style={AppStyles.innerContainer}>
      <Text style={AppStyles.header}>Reset Password</Text>
      <Text style={AppStyles.errorText}>{errorMessage}</Text>
      <TextInput 
      style={[AppStyles.textInput , AppStyles.lightText ,AppStyles.darkTextInput]} 
      placeholder='Email' 
      placeholderTextColor="#BEBEBE" 
      value={email}
      onChangeText={setEmail} 
      />
      <View style={[AppStyles.rowContainer, AppStyles.topMargin]}>
      </View>
      
      <Button title='Reset Password' onPress={resetPassword} color='#000000' disabled={isBtnDisabled}/>
      
      <View style={[AppStyles.rowContainer, AppStyles.topMargin]}>
      <Text style={AppStyles.lightText}>Don't have an account? </Text>
      <InlineTextButton text="Sign Up" onPress={() => navigation.navigate("SignUp")} />
      </View>
      </View>
    </View>
    );
}