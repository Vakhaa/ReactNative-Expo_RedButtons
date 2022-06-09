import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Pressable} from 'react-native';
import { colors } from 'res';

export default function  ButtonsTools({isMyButtons, setIsMyButtons, setModalVisible, isCanCreate}){

  const colorButton = (is) => {
    return is ? colors.warning: colors.primary;
  }

  const pressCreate = () => {
    isCanCreate ? 
      setModalVisible(true) :
      alert("Sorry, but you need friends :(");
  }

  return (<>
  <View style={styles.body}>
      {/* Tools */}
        {/* Create */}
        <View>
          <Pressable onPress={pressCreate}
              style={({pressed}) => ({backgroundColor: pressed? '#ddd': colors.primary, ...styles.create} )}>
              <Text>Create button + </Text>
          </Pressable>
        </View>
        {/* toggle public and private buttons */}
        <View style={{flexDirection:'row'}}>
          <Pressable onPress={()=>setIsMyButtons(true)}
            style={({pressed}) => ({backgroundColor: pressed? '#ddd': colorButton(isMyButtons), ...styles.private})}>
            <Text>My Buttons</Text>
         </Pressable>
         <Pressable onPress={()=>setIsMyButtons(false)}
            style={({pressed}) => ({backgroundColor: pressed? '#ddd': colorButton(!isMyButtons), ...styles.public})}>
            <Text>Other Buttons</Text>
         </Pressable>
        </View>
    </View>
  </>)
}

const styles = StyleSheet.create({
    body: {
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
        alignItems:'center', 
        borderBottomLeftRadius:15,
        justifyContent: 'center',
        
        borderColor: colors.secondary,
        borderWidth: 3,
    },
    create: {
        width:'100%', 
        alignItems:'center', 
        borderTopLeftRadius:15,  
        borderTopRightRadius:15,
        borderColor: colors.secondary,
        borderWidth: 3,
        height:30,
        justifyContent: 'center'
    }
  });
  