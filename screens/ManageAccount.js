import { Button,  View, TextInput, Text } from 'react-native';
import React from 'react';
import AppStyles from '../styles/AppStyles';
import InlineTextButton from '../components/InlinetextButton';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs, writeBatch } from "firebase/firestore";    
import { signOut, updatePassword, signInWithEmailAndPassword , deleteUser } from 'firebase/auth';

export default function ManageAccount({ navigation }) {

    let [newPassword, setNewPassword] = React.useState("");
    let [currentPassword, setCurrentPassword] = React.useState("");
    let [errorMessage, setErrorMessage] = React.useState("");

    let logout = () => {
        signOut(auth).then(() => {
            navigation.popToTop();
          });    
    }

    let updateUserPassword = () => {
        signInWithEmailAndPassword(auth, auth.currentUser.email, currentPassword)
            .then((userCredential) => {
            const user = userCredential.user;
            updatePassword(auth.currentUser, newPassword).then(() => {
                setNewPassword("");
                setErrorMessage("");
                setCurrentPassword("");
            }).catch((error) => {
                setErrorMessage(error.message);
        });
          }).catch((error) => {
             setErrorMessage(error.message);
          });
          
    };

    let deleteUserAndToDos = () => {
        if (currentPassword === "") {
          setErrorMessage("Must enter current password to delete account");
        } else {
          signInWithEmailAndPassword(auth, auth.currentUser.email, currentPassword)
          .then((userCredential) => {
            const user = userCredential.user;
    
            // Get all todos for user and delete
            let batch = writeBatch(db);
            const q = query(collection(db, "todos"), where("userId", "==", user.uid));
            getDocs(q).then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                batch.delete(doc.ref);
              });
              batch.commit();
      
              deleteUser(user).then(() => { 
                navigation.popToTop();
              }).catch((error) => {
                setErrorMessage(error.message);
              });
            });
          })
          .catch((error) => {
            setErrorMessage(error.message);
          });
        }
      };

    return (
        <>
          
        <InlineTextButton text="Back To ToDos" onPress={() => navigation.pop()} style={{paddingTop:50,paddingLeft:30,backgroundColor:"#fff"}} />
       
        <View style={AppStyles.container}>
          <View style={AppStyles.innerContainer}>
            <Text style={AppStyles.errorText}> {errorMessage} </Text>
            <TextInput
                style={[AppStyles.textInput , AppStyles.lightText ,AppStyles.darkTextInput]}
                placeholder='Current Password'
                value={currentPassword}
                secureTextEntry={true}
                onChangeText={setCurrentPassword} 
            />  
            <TextInput
                style={[AppStyles.textInput , AppStyles.lightText ,AppStyles.darkTextInput]}
                placeholder='New Password'
                value={newPassword}
                secureTextEntry={true}
                onChangeText={setNewPassword} 
            />    
              <View style={[AppStyles.rowContainer, AppStyles.topMargin]}></View>
     
            <Button title='Update Passowrd' onPress={updateUserPassword} color="#000000" />
            <View style={[ AppStyles.topMargin]}></View>
     
            <Button title='Delete Account' onPress={deleteUserAndToDos} />
            <View style={[AppStyles.rowContainer, AppStyles.topMargin]}>
            <InlineTextButton text='Logout' onPress={logout}/></View>
</View>
      </View>
      </>
    )
}