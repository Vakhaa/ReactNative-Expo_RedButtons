import React, {useState, useEffect} from 'react';
import { StyleSheet, TextInput,View, SafeAreaView, ScrollView, StatusBar} from 'react-native';
import { colors } from 'res';
import { useSelector, useDispatch } from 'react-redux';
import FriendsTools from './FriendsTools';
import { getFriends, getPeople } from 'my-redux/Actions/friendsAction';
import FriendsItems from './FriendsItems';

export default function  FriendsPage({navigation}){

  const {user, isLogin} = useSelector(state => state.auth);
  const {friends, people} = useSelector(state => state.friends);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [isFriendsButton, setIsFriendsButton] = useState(true);

  useEffect(()=>{
    if(user) {
      if(isFriendsButton){
        dispatch(getFriends(user.id));
      }else{
        dispatch(getPeople(user.id));
      }
    }
  },[isFriendsButton])

  return (
  <View style={styles.body}>
    <View style={{flex:1}}>
      {/* profile description */}
      <View>
        {/*Friends  Buttons */}
        <FriendsItems people={people} friends={friends} isFriends={isFriendsButton} navigation={navigation}/>
      </View>
    </View>
    <View style={{width:'80%'}}>
      {/* Search */}
      <TextInput 
        style={styles.input}
        placeholder='Search'
        value={search}
        onChangeText={(value) => setSearch(value)}
      />
    </View>
    <FriendsTools isFriendsButton={isFriendsButton} setIsFriendsButton={setIsFriendsButton} />
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
      width:'100%',

      borderRadius: 10,      
      borderColor: colors.secondary,
      backgroundColor: colors.white,
      borderWidth:3,

      textAlign:'center',
      fontSize:20,
      marginTop:10,
      marginBottom:10
    },
    scrollAreaView: {
      flex: 1,
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: StatusBar.currentHeight + 20 
    },
    scrollView: {
      marginHorizontal: 20,
    },
    text: {
      fontSize: 42,
    },
});
  