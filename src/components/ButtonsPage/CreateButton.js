import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View, TextInput } from "react-native";
import {colors} from 'res'
import DropDownPicker from 'react-native-dropdown-picker';
import { createButton } from "my-redux/Actions/buttonsAction";
import { getMyButtons } from "../../redux/Actions/buttonsAction";
import { useDispatch, useSelector } from "react-redux";

const data =[
    {
        label:'Red button',
        value:'red',
    },
    {
        label:'Blue button',
        value:'blue'
    },
    {
        label:'Green button',
        value:'green'
    },
    {
        label:'Gold button',
        value:'gold'
    }
]

export default CreateButton = ({modalVisible, setModalVisible, friends}) => {

    const {user} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [msg, setMsg] = useState("");

    const [openButtons, setOpenButtons] = useState(false);
    const [valueButton, setValueButton] = useState(null);
    const [itemsButtons, setItemsButtons] = useState(data);

    const [openFriends, setOpenFriends] = useState(false);
    const [valueFrinds, setValueFrinds] = useState([]);
    const [itemsFrinds, setItemsFriends] = useState(friends);

    const create = () => {
        // must be verification
        if(title == ""){
          alert("Title is empty");
          return;
        }

        if(msg == ""){
          alert("Message is empty");
          return;
        }

        if(valueButton == "" || valueButton == null ){
          alert("Choose your button");
          return;
        }

        dispatch(createButton(user.id, title, msg, valueButton, valueFrinds));
        clear();
        dispatch(getMyButtons(user.id));
        setModalVisible(!modalVisible);
    }

    const  close = () => {
      clear();
      setModalVisible(!modalVisible);
    }

    const clear = () =>{
      setTitle("");
      setMsg("");

      setValueButton("");
      setValueFrinds([]);
    }

    return (
        <Modal
          animationType='fade'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            clear();
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Create Button!</Text>
              <DropDownPicker 
                open={openButtons}
                value={valueButton}
                items={itemsButtons}
                setOpen={setOpenButtons}
                setValue={setValueButton}
                setItems={setItemsButtons}
                placeholder="Choose button"
                style={{backgroundColor: colors.white, width:'100%'}}/>
              <TextInput 
                  placeholder="Title"
                  value={title}
                  onChangeText={(value)=>setTitle(value)}
                  style={styles.input}/>
              <TextInput 
                multiline={true}
                placeholder="Message"
                textAlignVertical="top"
                value={msg}
                onChangeText={(value)=>setMsg(value)}
                style={[styles.input, {height:150, paddingTop: 10}]}/>
              <DropDownPicker 
                multiple={true}
                open={openFriends}
                value={valueFrinds}
                items={itemsFrinds}
                setOpen={setOpenFriends}
                setValue={setValueFrinds}
                setItems={setItemsFriends}
                placeholder="Choose friends"
                style={{backgroundColor: colors.white, width:'100%'}}/>
              <View style={{flexDirection:'row'}}>
                <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={close}>
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>
                <Pressable
                style={[styles.button, styles.buttonSave]}
                onPress={create}>
                  <Text style={styles.textStyle}>Create</Text>
                </Pressable>
              </View>
            </View>
          </View>
      </Modal>
    );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width:'100%'
  },
  button: {
    borderRadius: 20,
    padding: 10,
    // elevation: 2,
    marginTop: 5,
    width:'33%'
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonSave: {
    backgroundColor: colors.primary,
    marginLeft: 10
  },
  buttonClose: {
    backgroundColor: colors.error,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize:24
  },
  input:{
    width:'100%',
    borderWidth:1,
    borderColor: "#00000050",
    borderRadius: 10,
    backgroundColor: colors.white,
    fontSize:20,
    marginTop:10,
    marginBottom:10,
    paddingLeft: 10,
  }
});
