import React, {useState, useEffect} from 'react';
import { ActivityIndicator, StyleSheet, Text, Image, View, Pressable, SafeAreaView, Vibration, StatusBar} from 'react-native';
import { colors, pattern } from 'res';
import { useSelector, useDispatch } from 'react-redux';
import {schedulePushNotification, sendRemoteNotify} from '../../utils/NotificationWrapper.js'
import FriendsHistorySwitcher from './FriendsHistorySwitcher.js';
import {getCurrentButton, leaveCurrentButtonAction} from '../../redux/Actions/buttonsAction'
import OwnerSettings from './OwnerSettings.js';
import FoeSettings from './FoeSettings.js';
import { getFriends } from '../../redux/Actions/friendsAction.js';
import FriendsItems from './FriendsItems.js';

export default function ButtonPage({navigation, route}){

  const {user, isLogin, tokenNotify} = useSelector(state => state.auth);
  const {button} = useSelector(state => state.buttons);
  const {friends} = useSelector(state => state.friends);
  const dispatch = useDispatch();

  const [image, setImage] = useState("");
  const [isHistory, setIsHistory] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(()=>{
    dispatch(getCurrentButton(route.params.buttonId));
    dispatch(getFriends(user.id));
  },[route.params.buttonId])

  useEffect(()=>{
    if(button) 
      setImage(pattern[button.pattern].off);
  },[button])

  const pressButton = async () => {
    Vibration.vibrate([1 * 1000, 2 * 1000], false);
    setImage(pattern[button.pattern].on);
    
    button.friends.forEach(async  friend => {
      if(friend.id != user.id)
        await sendRemoteNotify(friend.tokenNotify, button.title, user.fullName +": "+ button.message);
    });

    // if(button.ownerId != user.id)
    //   await sendRemoteNotify(tokenNotify, button.title, user.fullName +": "+ button.message);
    // else
    //   await sendRemoteNotify(tokenNotify, button.title, user.fullName +": "+ button.message); //send there notify

    //await schedulePushNotification();
    setInterval(()=>{setImage(pattern[button.pattern].off)},500);
    // Vibration.cancel();
  }

  const pressBack = () => {
    dispatch(leaveCurrentButtonAction());
    navigation.goBack();
  }

  const content = () => (
<View style={styles.body}>
      {/* Header */}
      <View style={{marginTop:25, flexDirection:'row', alignItems:'center', backgroundColor:colors.primary}}>
        {/* Back arrow */}
        <View style={{margin: 10}}>
          <Pressable
            style={({pressed}) => ({borderColor: pressed? colors.warning: colors.primary, borderWidth:2, borderRadius: 100})}
            onPress={pressBack}>
            <Image style={{width:30, height: 30}} 
              source={{uri:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Back_Arrow.svg/2048px-Back_Arrow.svg.png"}}/>
          </Pressable>
        </View>
        {/* Title*/}
        <View style={{width:'65%'}}>
          <Text>
            {button.title}
          </Text>
        </View>
        {/* Mute */}
        <View style={{marginRight:10}}>
          <Pressable
            style={({pressed}) => ({borderColor: pressed? colors.warning: colors.primary, borderWidth:2, borderRadius: 100})}
            onPress={()=>{alert(`Mute not implemented yet!!`)}}>
            <Image style={{width:30, height: 30}} 
              source={{uri:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Mute_Icon.svg/2048px-Mute_Icon.svg.png"}}/>
          </Pressable>
        </View>
        {/* Settings */}
        <View>
          <Pressable
            style={({pressed}) => ({borderColor: pressed? colors.warning: colors.primary, borderWidth:2, borderRadius: 100})}
            onPress={()=>{setModalVisible(true)}}>
            <Image style={{width:30, height: 30}} 
              source={{uri:"https://cdn-icons-png.flaticon.com/512/126/126472.png"}}/>
          </Pressable>
        </View>
      </View>
      {/* profile button */}
      <View style={{alignItems:'center'}}>
        <Pressable
          onPress={pressButton}>
          <Image source={{uri:image}} style={styles.image} />
        </Pressable>
        {button.ownerId == user.id ? <OwnerSettings modalVisible={modalVisible} setModalVisible={setModalVisible} 
          button={button} buttonId={route.params.buttonId} friends={friends.map((friend)=> {
            return {
              label: friend.fullName,
              value: friend.id
            }
        })}/>: <FoeSettings 
        modalVisible={modalVisible} setModalVisible={setModalVisible} 
        button={button} buttonId={route.params.buttonId} /> }
        <FriendsHistorySwitcher isHistory={isHistory} setIsHistory={setIsHistory} friendsCount={button.friends.length-1}/>
      </View>
      <SafeAreaView style={styles.scrollAreaView}>
          {isHistory? <History/> :
          <FriendsItems 
            userId={user.id} 
            friends={button.friends} 
            buttonId={route.params.buttonId} 
            buttonOwnerId={button.ownerId}/>}
      </SafeAreaView>
    </View>
  );

  const loader = () => (
    <View style={[styles.body, styles.horizontalLoader]}>
    <ActivityIndicator size="large" color={colors.primary} />
  </View>
  );

  return (
    button ? content(): loader() 
  );
}

const History = () =>{

  return (<Text>History not implemented yet!!</Text>)
}

const styles = StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor: colors.white,
      justifyContent: 'center',
    },
    text:{
      color: colors.font,
      fontSize: 20,
      margin: 10 
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
      flex: 1,
    },
    image: {
      width: 240, 
      height: 240,
      borderRadius: 100
    },
    horizontalLoader: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
    },
});
  