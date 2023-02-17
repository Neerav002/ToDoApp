import { View, Text, TextInput, Button } from 'react-native';
import React from 'react';
import AppStyles from '../styles/AppStyles';
import InlineTextButton from './InlinetextButton';

export default function AddToDoModal(props){

    let [todo, setTodo] = React.useState("");

    return(
        <View style={AppStyles.container}>
        <View style={AppStyles.innerContainer}>
        <Text style={AppStyles.header}> Add ToDo</Text>
        <TextInput
            style={[AppStyles.textInput , AppStyles.lightText ,AppStyles.darkTextInput]}
            placeholder='Todo'
            value={todo}
            onChangeText={setTodo} 
        />    
        <View style={[AppStyles.rowContainer, AppStyles.rightAligned, AppStyles.rightMargin]}>
           <InlineTextButton text="Cancel" onPress={props.onClose} style={{marginRight:10}}/>
           <Button title="Add" onPress={() => {
            props.addToDo(todo);
            setTodo("");
            props.onClose();
           }} /> 
        </View>
        </View>
        </View>
    )

}