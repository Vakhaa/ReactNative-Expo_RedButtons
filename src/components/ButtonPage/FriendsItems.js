import React from 'react';
import {FlatList, StyleSheet, Text, Image, View, Pressable, StatusBar} from 'react-native';
import { useDispatch } from 'react-redux';
import {getCurrentButton, removeFriendFromButton} from '../../redux/Actions/buttonsAction'
import {colors} from 'res'

export default function  FriendsItems({friends, buttonId, buttonOwnerId , userId}){

  const renderItem = ({ item }) => {

    if(item.id == userId) return <></>
    return (
      <Friend isOwner={buttonOwnerId == userId}
      friend={item} buttonId={buttonId}/>
    )
  };

  return <View style={styles.container}>
    <FlatList 
      style={styles.scrollAreaView}
      data={friends}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
    />
  </View>
}


const Friend = ({friend, buttonId, isOwner}) => {

  let dispatch = useDispatch();

  const pressRemove = () => {
    dispatch(removeFriendFromButton(buttonId, friend.id));
    dispatch(getCurrentButton(buttonId));
  }

  return (
  <View style={styles.friend}>
    <Pressable
      style={({pressed}) => ({ backgroundColor: pressed? colors.primary: colors.white})}
      // onPress={()=>{navigation.navigate("Friend", {friend, isFriend:true})}}
      >
      <View style={{marginRight:20, marginLeft: '10%', flexDirection:'row', alignItems:'center'}}>
        <Image style={{width:40, height:40, borderRadius: 100}} source={{uri:friend.photo}}/>
        <View style={{width:'60%'}}>
          <Text style={{marginLeft:10}}>
            {friend.fullName}
          </Text>
        </View>
        {isOwner && <Pressable
          style={({pressed}) => ({ backgroundColor: pressed? colors.error: colors.white, marginLeft: '10%'})}
          onPress={pressRemove}>
          <Image source={{uri:"https://endlessicons.com/wp-content/uploads/2013/11/cancel-icon.png"}} style={{width:50, height:50}} />
        </Pressable>}
      </View>
    </Pressable>
  </View>)
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    // paddingTop: StatusBar.currentHeight,
  },
  friend:{
    width:'100%',
    margin: 10,
  },
});