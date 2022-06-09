import { 
    collection, getDoc, getDocs, 
    getFirestore, updateDoc, setDoc,
    doc, arrayUnion, query, where, arrayRemove,
    Timestamp, addDoc
} from "firebase/firestore"; 
import {getAuth} from "firebase/auth"; 

import {
    CREATE_BUTTON_REQUEST,
    CREATE_BUTTON_SUCCESS,
    CREATE_BUTTON_ERROR,
    GET_MY_BUTTON_REQUEST,
    GET_MY_BUTTON_SUCCESS,
    GET_MY_BUTTON_ERROR,
    GET_CURRENT_BUTTON_SUCCESS,
    GET_CURRENT_BUTTON_ERROR,
    UPDATE_BUTTON_SUCCESS,
    UPDATE_BUTTON_ERROR,
    REMOVE_FRIEND_BUTTON_SUCCESS,
    REMOVE_FRIEND_BUTTON_ERROR,
    LEAVE_CURRENT_BUTTON,
    GET_BUTTONS_REQUEST,
    GET_BUTTONS_SUCCESS,
    GET_BUTTONS_ERROR,
    SWITCH_BUTTONS_IN_BUTTONS
} from './types';

export const createButtonRequestAction = () => {
    return {
        type: CREATE_BUTTON_REQUEST
    }
}

export const createButtonSuccessAction = () => {
    return {
        type: CREATE_BUTTON_SUCCESS
    }
}

export const createButtonErrorAction = (error) => {
    return {
        type: CREATE_BUTTON_ERROR,
        error
    }
}

export const getMyButtonsRequestAction = () => {
    return {
        type: GET_MY_BUTTON_REQUEST
    }
}

export const getMyButtonsSuccessAction = (data) => {
    return {
        type: GET_MY_BUTTON_SUCCESS,
        data
    }
}

export const getMyButtonsErrorAction = (error) => {
    return {
        type: GET_MY_BUTTON_ERROR,
        error
    }
}

export const getCurrentButtonsSuccessAction = (data) => {
    return {
        type: GET_CURRENT_BUTTON_SUCCESS,
        data
    }
}

export const getCurrentButtonsErrorAction = (error) => {
    return {
        type: GET_CURRENT_BUTTON_ERROR,
        error
    }
}

export const updateButtonSuccessAction = (data) => {
    return {
        type: UPDATE_BUTTON_SUCCESS,
        data
    }
}

export const updateButtonErrorAction = (error) => {
    return {
        type: UPDATE_BUTTON_ERROR,
        error
    }
}

export const removeFriendFromButtonSuccessAction = () => {
    return {
        type: REMOVE_FRIEND_BUTTON_SUCCESS
    }
}

export const removeFriendFromButtonErrorAction = (error) => {
    return {
        type: REMOVE_FRIEND_BUTTON_ERROR,
        error
    }
}


export const getButtonsRequestAction = () => {
    return {
        type: GET_BUTTONS_REQUEST
    }
}

export const getButtonsSuccessAction = (data) => {
    return {
        type: GET_BUTTONS_SUCCESS,
        data
    }
}

export const getButtonsErrorAction = (error) => {
    return {
        type: GET_BUTTONS_ERROR,
        error
    }
}

//action for page
export const leaveCurrentButtonAction = () =>{
    return {
        type: LEAVE_CURRENT_BUTTON
    }
}

export const switchButtonsInButtonsAction = () => {
    return{
        type:SWITCH_BUTTONS_IN_BUTTONS
    }
}

// action creator

export const createButton = (ownerId, title, message, pattern, friends) => async dispatch => {
    let db = getFirestore();

    try{
        dispatch(createButtonRequestAction());
        
        friends.push(ownerId);

        let button = await addDoc(collection(db, "buttons" ), {
            ownerId,
            title,
            message,
            pattern,
            friends,
            createdAt: Timestamp.fromDate(new Date()),
        });

        await updateDoc(doc(db, "buttons", button.id ), {
            id: button.id
        });
        
        friends.forEach(async (friend)=>{
            if(friend != ownerId)
                await updateDoc(doc(db, "memberOfButton", friend ), {
                    button: arrayUnion(button.id)
                });
        })

        dispatch(createButtonSuccessAction());

    }catch(error){
        dispatch(createButtonErrorAction(error.message));
    }
}

export const getMyButtons = (ownerId) => async dispatch => {
    let db = getFirestore();

    try{
        dispatch(getMyButtonsRequestAction());
        
        let buttonsRef = collection(db, "buttons");

        let q = query(buttonsRef, where("ownerId", "==", ownerId));
        const snapshot = await getDocs(q);

        let data =[];
        snapshot.forEach((snap)=>{
            data.push({
                ...snap.data(),
                createdAt: (new Date(snap.data().createdAt.seconds)).toISOString(),
                id: snap.id
            });
        });

        dispatch(getMyButtonsSuccessAction(data));

    }catch(error){
        dispatch(getMyButtonsErrorAction(error.message));
    }
}

export const getCurrentButton = (buttonId) => async dispatch => {
    let db = getFirestore();

    try{
        
        let buttonsRef = doc(db, "buttons", buttonId);
        let button = await getDoc(buttonsRef);

        let usersRef = collection(db, "users");
        let friends =[]

        if(button.data().friends.length > 0){
            let q = query(usersRef, where("id", "in", button.data().friends));
            const snapshot = await getDocs(q);
    
            snapshot.forEach((snap)=>{
                friends.push(snap.data());
            });    
        };

        dispatch(getCurrentButtonsSuccessAction({
            ...button.data(),
            createdAt: new Date(button.data().createdAt.seconds),
            friends
        }));

    }catch(error){
        dispatch(getCurrentButtonsErrorAction(error.message));
    }
}

export const updateButton = (buttonId, newButton, oldFriends) => async dispatch => {
    let db = getFirestore();

    try{
        
        await updateDoc(doc(db,'buttons', buttonId ), newButton);
        //removes button from friends 
        oldFriends.forEach(async (friend)=>{
            
            if(newButton.friends.some((Id) => Id != friend)){
                await updateDoc(doc(db, "memberOfButton", friend ), {
                    button: arrayRemove(buttonId)
                });    
            };
        });

        //add button to friends 
        newButton.friends.forEach(async (friend)=>{
            await updateDoc(doc(db, "memberOfButton", friend ), {
                button: arrayUnion(buttonId)
            });    
        });

        dispatch(updateButtonSuccessAction());

    }catch(error){
        dispatch(updateButtonErrorAction(error.message));
    }
}

export const removeFriendFromButton = (buttonId, friendId) => async dispatch => {
    let db = getFirestore();

    try{
        await updateDoc(doc(db, "buttons", buttonId), {
            friends: arrayRemove(friendId)
        });

        await updateDoc(doc(db, "memberOfButton", friendId ), {
            button: arrayRemove(buttonId)
        });

        dispatch(removeFriendFromButtonSuccessAction());

    }catch(error){
        dispatch(removeFriendFromButtonErrorAction(error.message));
    }
}

export const getButtons = (ownerId) => async dispatch => {
    let db = getFirestore();

    try{
        dispatch(getButtonsRequestAction());
        
        
        let memberOfButtonRef = getDoc(doc(db, "memberOfButton", ownerId));

        memberOfButtonRef.then(async(snapshot)=>{
            
            let data =[]
            let q = query(collection(db, "buttons"), where('id','in', snapshot.data().button));
            let result = await getDocs(q);

            result.forEach((snap)=> data.push({
                ...snap.data(),
                createdAt: (new Date(snap.data().createdAt.seconds)).toString(),
                id: snap.id
            }));
            dispatch(getButtonsSuccessAction(data));
    })

    }catch(error){
        dispatch(getButtonsErrorAction(error.message));
    }
}
