import React, {useState, useEffect} from 'react';
import { StyleSheet,View, Text, Pressable, Image} from 'react-native';
import { colors, pattern } from 'res';

export default function  ButtonItem({id, button, navigation}){

  const [image, setImage] = useState("");

  useEffect(()=>{
    // pattern
    if(button.pattern)
      setImage(pattern[button.pattern].off);
  },[button])


  return ( !button ? <></>:<>
  <View style={styles.body}>
    <Pressable
      style={({pressed}) => ({ backgroundColor: pressed? colors.primary: colors.white, ...styles.item})}
      onPress={()=>{
        navigation.navigate("Button", {buttonId: button.id});
      }}>
      <View style={{marginRight:20, marginLeft: 15}}>
        <Image source={{uri:image}} style={{width:50, height:50}} />
      </View>
      <View>
        <Text>
          {button.title}
        </Text>
        <Text>
          Friends: {button.friends?.length-1}
        </Text>
      </View>
    </Pressable>
  </View>
  </>)
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
    }
  });
  