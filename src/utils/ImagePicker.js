import React, { useState, useEffect } from 'react';
import {StyleSheet, Pressable, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default ({photo, callback}) => {
  const [image, setImage] = useState(null);

  useEffect(()=>{
      if(photo) setImage(photo);
  },[photo])

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
    
    callback({ 
        uri:result.uri,
        type: `image/jpg`, //${result.uri.split(".")[result.uri.length-1]}
        name: "asdasdsd" 
      });
  };

  return (
    <View style={styles.body}>
      <View><Pressable title="" style={styles.button} onPress={pickImage} /></View>
      <View><Image source={image?{ uri: image }: {uri:"https://cdn-icons-png.flaticon.com/512/149/149071.png"}} style={styles.image} /></View>
    </View>
  );
}

const styles = StyleSheet.create({
    body:{
        //flex:1,
        alignItems:'center'
    },
    image: {
        marginTop:-200,
        width: 200, 
        height: 200,
        borderRadius: 100
    },
    button:{
        width: 200, 
        height: 200,
        zIndex:3,
        borderRadius: 100
    }
  });
  