import React, {useState, useEffect} from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, View, Pressable, SafeAreaView, ScrollView} from 'react-native';
import { colors } from 'res';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile } from 'my-redux/Actions/settingsAction';
import ImagePicker from '../../utils/ImagePicker';

export default function  Profile({navigation}){

  const {user} = useSelector(state => state.auth);
  const {isSave} = useSelector(state => state.auth.profilePage);
  const dispatch = useDispatch();

  const [photo, setPhoto] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(()=>{
    setFullName(user?.fullName == "Anonymous" ? "" : user?.fullName);
    setPhoto(user?.photo);
    setEmail(user?.email);
  },[user]);

  const setProfile = () =>{
    dispatch(updateUserProfile(user.id, 
      fullName == "" ? "Anonymous": fullName,
      photo, 
      user.email != email? email : null));
  };

  const content = () => (
  <View style={styles.body}>
    {/* profile description */}
    <SafeAreaView style={styles.scrollAreaView}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.empty}>
          {/* empty block */}
        </View>
        <View style={{alignItems:'center'}}>
          <ImagePicker photo={photo} callback={setPhoto}/>
          <TextInput style={styles.input}
          placeholder="Full name" value={fullName}
          onChangeText={(value)=>setFullName(value)}/>
          <TextInput style={styles.input}
          placeholder="Email" value={email}
          onChangeText={(value)=>setEmail(value)}/>
          <Pressable
            style={({pressed}) => ({backgroundColor: pressed? '#ddd': colors.primary, width:150, alignItems:'center', borderRadius:30})}
            onPress={setProfile}>
            <Text>Save!</Text>
          </Pressable>
        </View>
        <View style={styles.empty}>
          {/* empty block */}
        </View>
      </ScrollView>
    </SafeAreaView>
  </View>
  )

  const loader = () => (
    <View style={[styles.body, styles.horizontalLoader]}>
    <ActivityIndicator size="large" color={colors.primary} />
  </View>
  )
  
  return (
    isSave ? content() : loader()
  )
}

const styles = StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor: colors.secondary,
      justifyContent: 'center',
    },
    text:{
      color: colors.font,
      fontSize:20,
      margin:10 
    },
    tinyLogo: {
      width: 50,
      height: 50,
      marginLeft: "30%"
    },
    input:{
      width:300,
      borderWidth:1,
      borderColor: "#00000050",
      borderRadius: 10,
      backgroundColor: colors.white,
      textAlign:'center',
      fontSize:20,
      marginTop:10,
      marginBottom:10
    },
    scrollAreaView: {
      flex: 1
    },
    scrollView: {
    },
    empty:{
      width:'100%',
      height:300,
    },
    horizontalLoader: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
    },
  });
  