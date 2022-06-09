import React from 'react';
import FriendItem from './FriendItem';

export default function  FriendsItems({isFriends, people, friends, navigation}){

  return isFriends ? friends?.map((person, index)=>{
    return <FriendItem id={index} navigation={navigation} friend={person} isFriend={true}/>
  }) : people?.map((person, index)=>{
    if(friends.some((friend)=>friend.id == person.id)) return <></>
    return <FriendItem id={index} navigation={navigation} friend={person} isFriend={false}/>
  })

}
