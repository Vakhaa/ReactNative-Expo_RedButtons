import React, {useState, useEffect} from 'react';
import { StyleSheet, TextInput,View, StatusBar} from 'react-native';
import { colors } from 'res';
import { useSelector, useDispatch } from 'react-redux';
import ButtonsTools from './ButtonsTools';
import CreateButton from './CreateButton';
import { getMyButtons, getButtons, switchButtonsInButtonsAction } from '../../redux/Actions/buttonsAction';
import { getFriends, getFriendsId } from "../../redux/Actions/friendsAction";
import ButtonsItems from './ButtonsItems';

export default function  ButtonsPage({navigation}){

  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);
  const {myButtons, friendsButtons} = useSelector(state => state.buttons);
  const {friends} = useSelector(state => state.friends);


  const [search, setSearch] = useState("");
  const [isMyButtons, setIsMyButtons] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
    
  useEffect(()=>{
    
    if(isMyButtons){
      dispatch(getMyButtons(user.id));
      dispatch(getFriends(user.id));
    }else{
      dispatch(getButtons(user.id));
      dispatch(getFriends(user.id));
    }
  },[isMyButtons])

  return (
  <View style={styles.body}>
    {/* Buttons */}
    <ButtonsItems myButtons={myButtons} friendsButtons={friendsButtons} isMyButtons={isMyButtons} navigation={navigation}/>
      {/* Search */}
    <View>
      <TextInput 
        style={styles.input}
        placeholder='Search'
        value={search}
        onChangeText={(value) => setSearch(value)}/>
    </View>
    <ButtonsTools isMyButtons={isMyButtons} setIsMyButtons={setIsMyButtons} setModalVisible={setModalVisible} isCanCreate={friends?.length > 0}/>
    {friends?.length > 0 && <CreateButton modalVisible={modalVisible} 
      setModalVisible={setModalVisible} friends={friends.map((friend)=> {
      return {
        label: friend.fullName,
        value: friend.id
      }
    })}/>}
  </View>)
}

const styles = StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor: colors.white,
      alignItems:'center',
      justifyContent: 'center'
    },
    input:{
      width:300,

      borderRadius: 10,      
      borderColor: colors.secondary,
      backgroundColor: colors.white,
      borderWidth:3,

      textAlign:'center',
      fontSize:20,
      marginTop:10,
      marginBottom:10
    },
    text: {
      fontSize: 42,
    },
  });
  