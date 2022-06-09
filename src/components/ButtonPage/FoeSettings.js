import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View, TextInput } from "react-native";
import {colors} from 'res'
import DropDownPicker from 'react-native-dropdown-picker';
// import { patchButton } from "my-redux/Actions/buttonsAction";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentButton, updateButton } from "../../redux/Actions/buttonsAction";


export default FoeSettings = ({buttonId, button, modalVisible, setModalVisible}) => {

    const {user} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const Create = () => {
      // must be verification
      // dispatch(createButton(user.id, title, msg, valueButton, valueFrinds));
      dispatch(updateButton(buttonId, {
        title,
        message: msg,
        pattern: valueButton,
        friends: valueFrinds
      }, button.friends.map((friend) => friend.id)));

      dispatch(getCurrentButton(buttonId));
      setModalVisible(!modalVisible);
    }

    const  Close = () => {
      setModalVisible(!modalVisible);
    }

    return (
        <Modal
          animationType='fade'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Settings</Text>
              <Text style={styles.modalText}>Not implemented yet!</Text>
              {/* <DropDownPicker 
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
                style={{backgroundColor: colors.white, width:'100%'}}/>*/}
              <View style={{flexDirection:'row'}}> 
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={Close}>
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonSave]}>
                  <Text style={styles.textStyle}>Save</Text>
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
    backgroundColor: colors.white,
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
