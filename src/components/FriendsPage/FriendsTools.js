import React from 'react';
import { StyleSheet, Text, View, Pressable} from 'react-native';
import { colors } from 'res';

export default function  FriendsTools({isFriendsButton, setIsFriendsButton}){

  const colorButton = (is) =>{
    return is ? colors.warning: colors.primary;
  }

  return (<>
    {/* toggle public and private buttons */}
    <View style={styles.body}>
      <Pressable
        style={({pressed}) => ({backgroundColor: pressed? '#ddd': colorButton(isFriendsButton), ...styles.private})}
        onPress={()=>setIsFriendsButton(true)}>
        <Text>My friends</Text>
      </Pressable>
      <Pressable
        style={({pressed}) => ({backgroundColor: pressed? '#ddd': colorButton(!isFriendsButton), ...styles.public})}
        onPress={()=>setIsFriendsButton(false)}>
        <Text>People</Text>
      </Pressable>
    </View>
  </>)
}

const styles = StyleSheet.create({
    body: {
        flexDirection:'row',
        marginBottom:10,
        marginLeft:45,
        marginRight:45
    },
    public:{
        width:"50%",
        height:30,
        alignItems:'center',
        borderBottomRightRadius:15,
        justifyContent: 'center',

        borderColor: colors.secondary,
        borderWidth: 3,
    },
    private: {
        width:"50%",
        height:30, 
        alignItems:'center', 
        borderBottomLeftRadius:15,
        justifyContent: 'center',
        
        borderColor: colors.secondary,
        borderWidth: 3,
    }
  });
  