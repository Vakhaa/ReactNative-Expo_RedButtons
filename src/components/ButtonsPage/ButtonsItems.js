import React from 'react';
import { ActivityIndicator } from 'react-native';
import ButtonItem from './ButtonItem';
import {colors} from 'res';

export default function  ButtonsItems({isMyButtons, myButtons, friendsButtons, navigation}){

  if(!isMyButtons && !friendsButtons) return <ActivityIndicator size="large" color={colors.primary} />
  if(isMyButtons && !myButtons) return <ActivityIndicator size="large" color={colors.primary} />

  return isMyButtons? myButtons?.map((button, index)=>{
              
    return <ButtonItem id={index} navigation={navigation} button={button}/>
  }) : 
  friendsButtons?.map((button, index)=>{
    // if(friends.some((friend)=>friend.id == person.id)) return <></>
    return <ButtonItem id={index} navigation={navigation} button={button}/>
  })

}

