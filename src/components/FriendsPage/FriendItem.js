import React from 'react';
import { StyleSheet,View, Text, Pressable, Image} from 'react-native';
import { colors } from 'res';

export default function  FriendItem({ navigation, friend, isFriend}){

  const onClick = () => {
    // передать данные пользователя id
    navigation.navigate('Friend', {friend, isFriend});
  }
  return (
  <View style={styles.body}>
    <Pressable onPress={onClick}
      style={({pressed}) => ({ backgroundColor: pressed? colors.primary: colors.white, ...styles.item})}
    >
      <View style={{marginRight:20, marginLeft: 15}}>
        <Image source={{uri:friend.photo}} style={styles.image} />
      </View>
      <View>
        <Text>
          {friend.fullName ? friend.fullName: "Anonymous" }
        </Text>
      </View>
    </Pressable>
  </View>)
}

const styles = StyleSheet.create({
    body: {
      flex: 1,
      flexDirection:'row',
    },
    item:{
      flexDirection:'row',
      alignItems:'center',
      width:'100%',
      height: 100,

      borderBottomColor: colors.white,
      borderColor: colors.secondary,
      borderTopWidth:3,
      borderWidth:1,
      borderRadius: 10,
    },
    text:{
      textAlign:'center',
      fontSize:20,
      margin: 10,
    },
    image: {
        width: 60, 
        height: 60,
        borderRadius: 100
    }
  });
  