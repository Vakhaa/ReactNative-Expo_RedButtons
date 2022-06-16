import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,  
    getAuth, signOut,
} from "firebase/auth";

import { collection, getDoc, 
    getDocs, getFirestore,
    updateDoc,  setDoc,
    doc, arrayUnion, 
    query, where 
} from "firebase/firestore"; 


import {
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_ERROR,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_ERROR,
    SET_TOKEN_NOTIFY_SUCCESS,
    SET_TOKEN_NOTIFY_ERROR,
    INIT_TOKEN_NOTIFY,
    CLEAR_AUTH_ERROR
} from './types';

export const clearAuthErrorAction = () => {
    return {
        type: CLEAR_AUTH_ERROR
    }
}

export const authRequestAction = () => {
    return {
        type: AUTH_REQUEST
    }
}

export const authSuccessAction = (data) => {
    return {
        type: AUTH_SUCCESS,
        data: data
    }
}

export const authErrorAction = (error) => {
    return {
        type: AUTH_ERROR,
        error: error
    }
}

export const signUpRequestAction = () => {
    return {
        type: SIGNUP_REQUEST
    }
}

export const signUpSuccessAction = (data) => {
    return {
        type: SIGNUP_SUCCESS,
        data: data
    }
}

export const signUpErrorAction = (error) => {
    return {
        type: SIGNUP_ERROR,
        error: error
    }
}

export const logoutRequestAction = () => {
    return {
        type: LOGOUT_REQUEST
    }
}

export const logoutSuccessAction = () => {
    return {
        type: LOGOUT_SUCCESS,
    }
}

export const logoutErrorAction = (error) => {
    return {
        type: LOGOUT_ERROR,
        error: error
    }
}

export const setTokenNotifySuccessAction = () => {
    return {
        type: SET_TOKEN_NOTIFY_SUCCESS,
    }
}

export const setTokenNotifyErrorAction = (error) => {
    return {
        type: SET_TOKEN_NOTIFY_ERROR,
        error: error
    }
}

export const initTokenNotifyAction = (data) => {
    return {
        type: INIT_TOKEN_NOTIFY,
        data
    }
}

// action creator

export const logIn = (email, password, token) => async dispatch =>{
    
    let auth = getAuth();
    let db = getFirestore();

    dispatch(authRequestAction());
    
    signInWithEmailAndPassword(auth, email, password).then(async (userCredential)=>{
        const userId = userCredential.user.uid; 
        const user = await getDoc(doc(db, 'users', userId));

        dispatch(setTokenNotify(token));
        dispatch(authSuccessAction({ user: user.data(), isLogin: true}));
    }).catch((error) => {
        dispatch(authErrorAction(error.message));
    });
}

export const signUp = (email, password, token) => dispatch => {
    let auth = getAuth();
    let db = getFirestore();
    
    dispatch(signUpRequestAction());

    createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
        // Signed in 
        const user = userCredential.user;
        dispatch(signUpSuccessAction({
            user:{
                id: user.uid,
                fullName: "Anonymous",
                email: user.email,
                photo: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
                tokenNotify: token
            }, 
            isLogin: true
        }));
        
        await setDoc(doc(db, "users", user.uid), {
            id: user.uid,
            fullName: "Anonymous",
            email: user.email,
            photo: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
            tokenNotify: token
        })

        await setDoc(doc(db, "friends", user.uid), {
            friends:[]
        })

        await setDoc(doc(db, "memberOfButton", user.uid ), {
            button: []
        });

        // dispatch(setTokenNotify(token));
    })
    .catch((error) => {
        dispatch(signUpErrorAction(error.message));
    });
}

export const logout = () => dispatch => {
    let auth = getAuth();

    dispatch(logoutRequestAction());

    signOut(auth).then(()=>{
        dispatch(logoutSuccessAction());
    }).catch((error => {
        dispatch(logoutErrorAction(error.message));
    }));
}

export const setTokenNotify = (token) => async dispatch => {
    let auth = getAuth();
    let db = getFirestore();
    
    try {
        if(auth.currentUser?.uid)
            await updateDoc(doc(db,'users', auth.currentUser.uid), { tokenNotify: token });
        
        dispatch(setTokenNotifySuccessAction());
    } catch (error) {
        dispatch(setTokenNotifyErrorAction(error.message));
    }
}
