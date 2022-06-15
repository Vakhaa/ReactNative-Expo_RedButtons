import React, {useState, useEffect} from 'react';
import { ActivityIndicator, StyleSheet, Text, Image, View, Pressable, SafeAreaView, ScrollView, StatusBar} from 'react-native';
import { colors, pattern } from 'res';
import { useSelector, useDispatch } from 'react-redux';
import {schedulePushNotification, sendRemoteNotify} from '../../utils/NotificationWrapper.js'
import FriendsHistorySwitcher from './FriendsHistorySwitcher.js';
import {getCurrentButton, leaveCurrentButtonAction, removeFriendFromButton} from '../../redux/Actions/buttonsAction'
import OwnerSettings from './OwnerSettings.js';
import FoeSettings from './FoeSettings.js';
import { getFriends } from '../../redux/Actions/friendsAction.js';

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
        <ScrollView style={styles.scrollView}>
          {isHistory? <History/> : 
            button.friends.map( (friend, index) => {
              if(friend.id == user.id) return <Empty/>
              return (
                <Friend key={index} navigation={navigation} 
                isOwner={button.ownerId == user.id}
                friend={friend} buttonId={route.params.buttonId}/>
          )})}
        </ScrollView>
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

const Friend = ({key, navigation, friend, buttonId, isOwner}) => {

  let dispatch = useDispatch();

  const pressRemove = () => {
    dispatch(removeFriendFromButton(buttonId, friend.id));
    dispatch(getCurrentButton(buttonId));
  }

  return (
  <View style={styles.friend}>
    <Pressable
      style={({pressed}) => ({ backgroundColor: pressed? colors.primary: colors.white})}
      // onPress={()=>{navigation.navigate("Friend", {friend, isFriend:true})}}
      >
      <View style={{marginRight:20, marginLeft: '10%', flexDirection:'row', alignItems:'center'}}>
        <Image style={{width:40, height:40, borderRadius: 100}} source={{uri:friend.photo}}/>
        <View style={{width:'60%'}}>
          <Text style={{marginLeft:10}}>
            {friend.fullName}
          </Text>
        </View>
        {isOwner && <Pressable
          style={({pressed}) => ({ backgroundColor: pressed? colors.error: colors.white, marginLeft: '10%'})}
          onPress={pressRemove}>
          <Image source={{uri:"https://endlessicons.com/wp-content/uploads/2013/11/cancel-icon.png"}} style={{width:50, height:50}} />
        </Pressable>}
      </View>
    </Pressable>
  </View>)
}

const History = () =>{

  return (<Text>History not implemented yet!!</Text>)
}

const Empty = () => {
  return <></>
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
    scrollView: {
    },
    friend:{
      width:'100%',
      margin: 10,
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
  