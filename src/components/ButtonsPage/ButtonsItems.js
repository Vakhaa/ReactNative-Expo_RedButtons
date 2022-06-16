import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, StatusBar, View } from 'react-native';
import ButtonItem from './ButtonItem';
import {colors} from 'res';

export default function  ButtonsItems({isMyButtons, myButtons, friendsButtons, navigation}){

  if(!isMyButtons && !friendsButtons) return <View style={styles.container}><ActivityIndicator size="large" color={colors.primary} /></View>
  if(isMyButtons && !myButtons) return <View style={styles.container}><ActivityIndicator size="large" color={colors.primary} /></View>


  const renderItem = ({ item }) => (
    <ButtonItem navigation={navigation} button={item}/> 
  );

  return <View style={styles.container}>
    <FlatList 
        data={isMyButtons ? myButtons : friendsButtons}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
    />
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight + 20,
  }
});
