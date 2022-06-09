import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, Image, View, Pressable, SafeAreaView, ScrollView, StatusBar} from 'react-native';
import { colors } from 'res';
import { useSelector, useDispatch } from 'react-redux';
import { addFriend, removeFriend} from 'my-redux/Actions/friendsAction';
import { getFriends, getPeople, liveFromFriendPageAction } from '../../redux/Actions/friendsAction';

export default function FriendPage({navigation, route}){

  const {user, isLogin} = useSelector(state => state.auth);
  const {isBlockButton} = useSelector(state => state.friends.friendPage);
  const dispatch = useDispatch();

  const [photo, setPhoto] = useState("");
  const [fullName, setFullName] = useState("");

  const [isFriend, setIsFriend] = useState(false);
  
  useEffect(()=>{
    let friend = route.params.friend;

    setIsFriend(route.params.isFriend);
    setPhoto(friend.photo ? friend.photo : "https://cdn-icons-png.flaticon.com/512/149/149071.png");
    setFullName(friend.fullName ? friend.fullName: "Anonymous");

    return ()=>{
      dispatch(liveFromFriendPageAction());
    };
  },[]);

  const onClick = () => {
    if(isBlockButton) return;

    if(isFriend)
      dispatch(removeFriend(user.id, route.params.friend.id))
    else
      dispatch(addFriend(user.id, route.params.friend.id))

      setIsFriend(item=>!item);
      
      dispatch(getFriends(user.id));
      dispatch(getPeople(user.id));  
  }

  const pressBack = () =>{
    dispatch(liveFromFriendPageAction());
    navigation.goBack();
  }

  return (
    <View style={styles.body}>
      {/* Header */}
      <View style={{marginTop:25, flexDirection:'row', alignItems:'center', backgroundColor:colors.primary}}>
        <View style={{margin: 10}}>
          {/* Back arrow */}
          <Pressable
            style={({pressed}) => ({borderColor: pressed? colors.warning: colors.primary, borderWidth:2, borderRadius: 100})}
            onPress={pressBack}>
            <Image style={{width:30, height: 30}} 
              source={{uri:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Back_Arrow.svg/2048px-Back_Arrow.svg.png"}}/>
          </Pressable>
        </View>
        <View>
          <Text>
            My Friend
          </Text>
        </View>
      </View>
      {/* profile description */}
      <SafeAreaView style={styles.scrollAreaView}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.empty}>
            {/* empty block */}
          </View>
          <View style={{alignItems:'center'}}>
            <Image source={{uri:photo}} style={styles.image} />
            <Text style={{fontSize:36}}>{fullName}</Text>
            <Pressable
              style={({pressed}) => ({backgroundColor: pressed? '#ddd' : isBlockButton ?'#ddd' : colors.primary, width:200, alignItems:'center', borderRadius:30})}
              onPress={onClick}>
              <Text style={{fontSize: 24}}>{isFriend? "Remove": "Add to friend"}</Text>
            </Pressable>
          </View>
          <View style={styles.empty}>
            {/* empty block */}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
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
      flex: 1
    },
    scrollView: {
    },
    empty:{
      width:'100%',
      height:300,
    },
    image: {
      width: 240, 
      height: 240,
      borderRadius: 100
  }
  });
  