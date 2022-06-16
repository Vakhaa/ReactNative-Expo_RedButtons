import React from 'react';
import {FlatList, StyleSheet, StatusBar, View} from 'react-native';
import FriendItem from './FriendItem';

export default function  FriendsItems({isFriends, people, friends, navigation}){

  const renderItem = ({ item }) => {

    if(!isFriends) // throw this filter on firestore?
      if(friends.some((friend)=>friend.id == item.id)) return <></>

    return <FriendItem navigation={navigation} friend={item} isFriend={isFriends} key={item.id}/>
  };

  return <View style={styles.container}>
    <FlatList 
      style={styles.scrollAreaView}
      data={isFriends ? friends : people}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
    />
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingTop: StatusBar.currentHeight + 20,
  }
});