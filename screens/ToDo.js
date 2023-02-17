import { View, Button, Text, SafeAreaView , Modal, ActivityIndicator, FlatList } from 'react-native';
import InlineTextButton from '../components/InlinetextButton';
import AppStyles from '../styles/AppStyles';
import { auth, db } from '../firebase';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { sendEmailVerification } from 'firebase/auth';
import React , {useState} from 'react';
import AddToDoModal from '../components/AddToDoModal';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

export default function ToDo({ navigation, route }){

    let [modalVisible, setModalVisible] = React.useState(false);
    let [isLoading, setIsLoading] = React.useState(true);
    let [isRefreshing, setIsRefereshing] = React.useState(false);
    let [toDos, setToDos] = React.useState([]);

    let loadToDoList = async () => {
        const q = query(collection(db, "todos"), where("userId", "==", auth.currentUser.uid));

            const querySnapshot = await getDocs(q);
            let toDos = [];
            querySnapshot.forEach((doc) => {
                let toDo = doc.data();
                toDo.id = doc.id;
                toDos.push(toDo);
        });
        setToDos(toDos); 
        setIsLoading(false);
        setIsRefereshing(false);
    }

    if(isLoading){
        loadToDoList();
    }

    let checkToDoItem = (item, isChecked) => {

    };

    let deleteToDo = async (toDoId) => {
        await deleteDoc(doc(db, "todos", toDoId));
        let updatedToDos = [...toDos].filter((item) => item.id != toDoId);
        setToDos(updatedToDos);
      };

    let renderToDoItem = ({item}) => {
        return(
            <View style={[AppStyles.todoContainer]}>
                <BouncyCheckbox
                    isChecked={item.completed}
                    size={25}
                    fillColor="#258ea6"
                    unfillColor="#FFFFFF"
                    text={item.text}
                    iconStyle={{ borderColor: "#258ea6" }}
                    innerIconStyle={{ borderWidth: 2 }}
                    style={{width:"75%"}}
                    onPress={(isChecked) => { checkToDoItem(item, isChecked)}}
                />
                <View style={AppStyles.rightAligned}>
                    <InlineTextButton text="Delete" color="#258ea6" onPress={() => deleteToDo(item.id)} />
                </View>
            </View>
        );
    }

    let showToDoList = () => {
        return(
            <FlatList
            data={toDos}
            refreshing={isRefreshing}
            onRefresh={ () => {
                loadToDoList();
                setIsRefereshing(true);
            }}
            renderItem={renderToDoItem}
            keyExtractor={item => item.id}
            />
        );
    }

    let showContent = () => {
        return(
            <View style={AppStyles.container}>
            {isLoading ? <ActivityIndicator size="large"/> : showToDoList()}
            <Button 
            title='Add ToDo' 
            onPress={() => setModalVisible(true)} 
            color='#000000' />
            </View>
        );
    };

    let showSendVerificationEmail = () => {
        return (
            <View>
                <Text> Please Verify our email to use ToDo </Text>
                <View style={[AppStyles.rowContainer, AppStyles.topMargin]}> 
                 <Button title='Send Verification Email' onPress={() => {
                    sendEmailVerification(auth.currentUser)
                    navigation.popToTop();
                    }} color='#000000' />
                    </View>
            </View>
            
        );
    };

    let addToDo = async (todo) => {
        let toDoToSave = {
            text: todo,
            completed: false,
            userId: auth.currentUser.uid
        };
        const docRef = await addDoc(collection(db, "todos"),toDoToSave);
      
          toDoToSave.id = docRef.id;
        
        let updatedToDos = [...toDos];
        updatedToDos.push(toDoToSave);

        setToDos(updatedToDos);
    }

    return(
        <>
           <View style={{backgroundColor:"#fff",alignItems:"flex-end"}}>
      
         <InlineTextButton text="Manage Account" color="#258ea6"  onPress={() => navigation.navigate("ManageAccount")} style={{paddingTop:50,paddingRight:20,}} />
       </View>
        <SafeAreaView style={AppStyles.container}>
        <Modal 
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={()=> setModalVisible(false)}
        >
            <AddToDoModal 
               onClose= {() => setModalVisible(false)}
               addToDo= {addToDo}
            />
        </Modal>
        <Text style={AppStyles.header}> ToDo </Text>
            {auth.currentUser.emailVerified ? showContent() : showSendVerificationEmail() }
            
        </SafeAreaView>
        </>
    )
}