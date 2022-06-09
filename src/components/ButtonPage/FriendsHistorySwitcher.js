import React from 'react';
import { StyleSheet, Text, View, Pressable} from 'react-native';
import { colors } from 'res';
import { useSelector, useDispatch } from 'react-redux';
const friends = [0,1,2,3,4,5,6,7,8,9,10,11,12];

export default function FriendsHistorySwitcher({isHistory, setIsHistory, friendsCount}){

  const {user, isLogin} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const clickHistory = () => {
    console.log("Switch to history")
    setIsHistory(true);
  }

  const clickFrinds = () => {
    console.log("Switch to friends")
    setIsHistory(false);
  }

  return (<>
    <View style={{
      flexDirection:'row', width:'100%',
      borderBottomWidth:1, borderTopWidth:1,
      borderBottomColor:'black',
    }}>
      <View style={{width:'100%', height:'100%',}}>
        <Pressable
          style={isHistory?styles.friendsButtonsOff:styles.friendsButtonsOn}
          onPress={clickFrinds}>
          <Text style={{fontSize: 24}}> Friends: {friendsCount} </Text>
        </Pressable>
      </View>
      <View style={{ width:'100%'}}>
        <Pressable
          style={isHistory?styles.historyButtonsOn:styles.historyButtonsOff}
            //style={({pressed}) => ({backgroundColor: pressed? '#ddd': colors.primary, 
            // width:20, height:20, borderRadius:30, marginLeft: 10, marginTop:7, alignItems:'center'})}
          onPress={clickHistory}>
          <Text style={{fontSize: 24, marginLeft:10}}> History </Text>
        </Pressable>
      </View>
    </View>
  </>)
}

const styles = StyleSheet.create({
  friendsButtonsOn: {
    borderRightWidth:1, borderColor:'black',
    borderTopRightRadius:30,
    backgroundColor: colors.primary, width:'55%'
  },
  historyButtonsOn:{
    width: '55%', marginLeft:'-55%',
    borderLeftWidth:1, borderColor:'black',
    borderTopLeftRadius:30,
    backgroundColor: colors.primary
  },
  friendsButtonsOff: {
    width:'45%'
  },
  historyButtonsOff:{
    width: '45%', marginLeft:'-45%',
  }
  });
  