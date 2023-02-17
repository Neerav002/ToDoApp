import { StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 32,
      paddingHorizontal: 2,
    
    },
    innerContainer:{
      width:"90%",

    },
    rowContainer:{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "stretch",
      marginVertical: 4,
    },
    todoContainer:{
      flex: 1,
      flexDirection: "row",
      margin: 6
    },
    rightAligned:{
      marginLeft: "auto",
    },
    leftAligned:{
      marginLeft: "0",
    },
    topMargin:{
      marginTop: 16
    },
    bottomMargin:{
      marginBottom: 16
    },
    rightMargin:{
      marginRight: 2
    },
    leftMargin: {
      marginLeft: 2
    },
    textInput: {
    alignSelf: 'stretch',
    padding: 8,
    borderBottomWidth: 2,
    marginVertical: 8
    },
    lightText:{
      color: '#000000'
    },
    errorText:{
      color: '#000000'
    },
    header:{
      fontSize: 32,
      alignSelf: 'center'
    },
    textInput: {
      alignSelf: 'stretch',
      padding: 8,
      borderBottomWidth: 2,
      marginVertical: 8
    },
    lightTextInput: {
      borderBottomColor: "#ffffff"
    },
    darkTextInput: {
      borderBottomColor: "#000000"
    },
    inlineTextButton: {
      color: "#00aae4",fontSize:16
  
    },
    pressedInlineTextButton: {
      color: "#00aae4",
      opacity: 0.6
    },
    buttonStyles:{
      marginVertical:10
    }
  });