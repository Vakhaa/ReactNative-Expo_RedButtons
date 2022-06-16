import React, {useEffect, useState} from 'react';
import { StyleSheet,Text, View,Pressable, TextInput, Alert, Image} from 'react-native';
import { colors } from 'res';
import { useSelector, useDispatch } from 'react-redux';
import { signUp } from 'my-redux/Actions/authAction';

export default function SignUp({navigation}){

  const { user, isLogin, tokenNotify} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  useEffect(()=>{
    setInterval(()=>{
      setTimeout(()=>{setImage("https://i.ibb.co/4YNxkpm/red-button-off.png")},1000);
      setTimeout(()=>{setImage("https://i.ibb.co/c2G8F7f/red-button-on.png")},1000);
    }, 2000);
  },[]);

  useEffect(()=>{
    if(isLogin)
      navigation.navigate('Buttons');
  },[user]);

  const setData = async () =>{

    if(email.length == 0){ //validate email
      Alert.alert('Inccorect email!', 'Please write your email...');
    }else if(password.length == 0){
      Alert.alert('Inccorect password!', 'Field is empty...');
    }else if(password != passwordRepeat){
      Alert.alert('Inccorect password!', 'Password didn`t match ...');
    }else{
      try{
        dispatch(signUp(email, password, tokenNotify));
      }catch(error){
        console.log(error);
      }
    }
  }

  return (
    <View style={styles.body}>
      <Image source={{uri:image}} style={styles.image} />
      <Text style={styles.text}> 
        Email
      </Text>
      <TextInput 
        style={styles.input}
        placeholder="Enter your email"
        onChangeText={(value)=>setEmail(value)}
        />
      <Text style={styles.text}> 
        Password
      </Text>
      <TextInput 
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry={true}
        onChangeText={(value)=>setPassword(value)}
        />
      <Text style={styles.text}> 
        Repeat password
      </Text>
      <TextInput 
        style={styles.input}
        placeholder="Reapeat your password"
        secureTextEntry={true}
        onChangeText={(value)=>setPasswordRepeat(value)}
        />
      <Pressable
        style={({pressed}) => ({backgroundColor: pressed? '#ddd': colors.primary, ...styles.button})}
        onPress={setData}>
        <Text style={{marginLeft:'40%'}}>Accept</Text>
      </Pressable>
      <Pressable
        onPress={()=> navigation.navigate("Login")}>
          {({pressed})=>{
            return (<Text style={{color: pressed? colors.white: "#000"}}>Do you have an account?</Text>)}}
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor: colors.secondary,
      alignItems:'center',
      justifyContent: 'center'
    },
    text:{
      color:"#000",
      fontSize:20,
      margin:10,
      marginBottom:0
    },
    input:{
      width:300,
      borderWidth:1,
      borderColor: "#00000050",
      borderRadius: 10,
      backgroundColor: colors.white,
      textAlign:'center',
      fontSize:20,
      marginTop:5,
      marginBottom:10
    },
    button:{
      width:'50%',
      height:30,
      marginTop:5,
      marginBottom:5,
      justifyContent:'center',
      borderRadius: 30
    },
    image: {
      width: 240, 
      height: 240,
      borderRadius: 100
    }
  });
  