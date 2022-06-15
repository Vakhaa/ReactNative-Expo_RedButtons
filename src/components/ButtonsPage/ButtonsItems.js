import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, StatusBar } from 'react-native';
import ButtonItem from './ButtonItem';
import {colors} from 'res';

export default function  ButtonsItems({isMyButtons, myButtons, friendsButtons, navigation}){

  if(!isMyButtons && !friendsButtons) return <ActivityIndicator size="large" color={colors.primary} />
  if(isMyButtons && !myButtons) return <ActivityIndicator size="large" color={colors.primary} />


  const renderItem = ({ item }) => (
    <ButtonItem navigation={navigation} button={item}/> 
  );


  return <FlatList 
        style={styles.scrollAreaView}
        data={isMyButtons ? myButtons : friendsButtons}
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
