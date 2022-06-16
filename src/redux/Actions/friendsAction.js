import { 
    collection, getDoc, getDocs, 
    getFirestore, updateDoc, setDoc,
    doc, arrayUnion, query, where, arrayRemove
} from "firebase/firestore"; 
import {getAuth} from "firebase/auth"; 

import {
    ADD_FRIEND_REQUEST,
    ADD_FRIEND_SUCCESS,
    ADD_FRIEND_ERROR,
    GET_FRIENDS_REQUEST,
    GET_FRIENDS_SUCCESS,
    GET_FRIENDS_ERROR,
    GET_PEOPLE_REQUEST,
    GET_PEOPLE_SUCCESS,
    GET_PEOPLE_ERROR,
    REMOVE_FRIEND_REQUEST,
    REMOVE_FRIEND_SUCCESS,
    REMOVE_FRIEND_ERROR,
    GET_FRIENDS_ID_SUCCESS,
    GET_FRIENDS_ID_ERROR,
    LIVE_FROM_FRIEND_PAGE
} from './types';

export const liveFromFriendPageAction = () =>{
    return {
        type: LIVE_FROM_FRIEND_PAGE
    }
}

export const addFriendRequestAction = () => {
    return {
        type: ADD_FRIEND_REQUEST
    }
}

export const addFriendSuccessAction = () => {
    return {
        type: ADD_FRIEND_SUCCESS
    }
}

export const addFriendErrorAction = (error) => {
    return {
        type: ADD_FRIEND_ERROR,
        error
    }
}

export const removeFriendRequestAction = () => {
    return {
        type: REMOVE_FRIEND_REQUEST
    }
}

export const removeFriendSuccessAction = () => {
    return {
        type: REMOVE_FRIEND_SUCCESS
    }
}

export const removeFriendErrorAction = (error) => {
    return {
        type: REMOVE_FRIEND_ERROR,
        error
    }
}

export const getFriendsRequestAction = () => {
    return {
        type: GET_FRIENDS_REQUEST
    }
}

export const getFriendsSuccessAction = (data) => {
    return {
        type: GET_FRIENDS_SUCCESS,
        data
    }
}

export const getFriendsErrorAction = (error) => {
    return {
        type: GET_FRIENDS_ERROR,
        error
    }
}

export const getPeopleRequestAction = () => {
    return {
        type: GET_PEOPLE_REQUEST
    }
}

export const getPeopleSuccessAction = (data) => {
    return {
        type: GET_PEOPLE_SUCCESS,
        data
    }
}

export const getPeopleErrorAction = (error) => {
    return {
        type: GET_PEOPLE_ERROR,
        error
    }
}

export const getFriendsIdSuccessAction = (data) => {
    return {
        type: GET_FRIENDS_ID_SUCCESS,
        data
    }
}

export const getFriendsIdErrorAction = (error) => {
    return {
        type: GET_FRIENDS_ID_ERROR,
        error
    }
}

// action creator

export const addFriend = (ownerId, friendId) => async dispatch => {
    let db = getFirestore();

    try{
        dispatch(addFriendRequestAction());
        
        await updateDoc(doc(db, "friends", ownerId), {
            friends: arrayUnion(friendId) // add uniq elements to array friends
        });

        dispatch(addFriendSuccessAction());

    }catch(error){
        dispatch(addFriendErrorAction(error.message));
    }
}

export const removeFriend = (ownerId, friendId) => async dispatch => {
    let db = getFirestore();

    try{
        dispatch(removeFriendRequestAction());
        
        await updateDoc(doc(db, "friends", ownerId), {
            friends: arrayRemove(friendId) // add uniq elements to array friends
        });

        dispatch(removeFriendSuccessAction());

    }catch(error){
        dispatch(removeFriendErrorAction(error.message));
    }
}

export const getFriends = (ownerId) => async dispatch => {
    let db = getFirestore();

    try{
        dispatch(getFriendsRequestAction());
        
        let friendsRef = doc(db, "friends", ownerId);

        let friendsDoc = await getDoc(friendsRef);

        let usersRef = collection(db, "users");

        let data =[]
        const batches = [];
        let friends = friendsDoc.data().friends;
        
        while(friends.length){
            // firestore limits batches to 10
            const batch = friends.splice(0, 10);
            let q = query(usersRef, where("id", "in", batch));
            batches.push(getDocs(q));    
        }

        // after all of the data is fetched, return it
        await Promise.all(batches)
        .then(content => {
            content.flat().forEach((response) =>{
                response.forEach((snap)=>{
                    data.push(snap.data());
                });       
            })
        });

        dispatch(getFriendsSuccessAction(data));
    }catch(error){
        dispatch(getFriendsErrorAction(error.message));
    }
}

export const getPeople = (ownerId) => async dispatch => {
    let db = getFirestore();
    try{
        
        dispatch(getPeopleRequestAction());

        const usersRef = collection(db, "users");

        // Create a query against the collection.
        const q = query(usersRef, where("id", "!=", ownerId));
        const snapshot = await getDocs(q);
        
        let data =[];

        snapshot.forEach((snap)=>{
            data.push(snap.data());
        });
        
        dispatch(getPeopleSuccessAction(data));        
    }catch(error){
        dispatch(getPeopleErrorAction(error.message));
    }
}

export const getFriendsId = (ownerId) => async dispatch => {
    let db = getFirestore();

    try{
        
        let friendsRef = doc(db, "friends", ownerId);

        let friendsDoc = await getDoc(friendsRef);

        dispatch(getFriendsIdSuccessAction(friendsDoc.data().friends));
    }catch(error){
        dispatch(getFriendsIdErrorAction(error.message));
    }
}
