import React from 'react';
import {FlatList, StyleSheet, StatusBar} from 'react-native';
import FriendItem from './FriendItem';

export default function  FriendsItems({isFriends, people, friends, navigation}){

  const renderItem = ({ item }) => {

    if(!isFriends)
      if(friends.some((friend)=>friend.id == item.id)) return <></>

    return <FriendItem navigation={navigation} friend={item} isFriend={isFriends} key={item.id}/>
  };

  return <FlatList 
      style={styles.scrollAreaView}
      data={isFriends ? friends : people}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
  />
}

const styles = StyleSheet.create({
  scrollAreaView: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: StatusBar.currentHeight + 20,
    marginHorizontal: 20,
  }
});