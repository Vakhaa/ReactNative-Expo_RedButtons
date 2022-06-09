import { 
    collection, getDoc, 
    getDocs, getFirestore,
    updateDoc,  setDoc,
    doc, arrayUnion, 
    query, where } from "firebase/firestore"; 

import { 
    getAuth, updateEmail
} from "firebase/auth"; 

import {
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_ERROR,
} from './types';


export const updateProfileRequestAction = () => {
    return {
        type: UPDATE_PROFILE_REQUEST
    }
}

export const updateProfileSuccessAction = (data) => {
    return {
        type: UPDATE_PROFILE_SUCCESS,
        data: data
    }
}

export const updateProfileErrorAction = (error) => {
    return {
        type: UPDATE_PROFILE_ERROR,
        error
    }
}

// action creator

export const updateUserProfile = (id, fullName, newPhoto, email) => async dispatch => {
    let db = getFirestore();
    let auth = getAuth();
    
    dispatch(updateProfileRequestAction());
    try{

        let photo="";
        if(typeof(newPhoto) != 'string'){
            let response = await uploadPhotoToImgbb(newPhoto);
            let json = await response.json();

            photo = json.data.url;    
        }else{
            photo = newPhoto;
        }
        console.log(photo);
        
        if(email){
            await updateDoc(doc(db,'users', id), {
                fullName, photo, email
            });
    
            await updateEmail(auth.currentUser, email);
        }else{
            await updateDoc(doc(db,'users', id), {
                fullName, photo
            });
        }

        dispatch(updateProfileSuccessAction({id, fullName, photo, email}));
    }catch(error){
        dispatch(updateProfileErrorAction(error.message));
    }
}

// helper
function uploadPhotoToImgbb(photo){
    let form = new FormData();
    form.append("image", photo);

    return fetch(`https://api.imgbb.com/1/upload?key=7c85f2288e0a4e4425bf0f7660820747`, {
        method: "POST",
        headers:{ 
            "Content-Type": "multipart/form-data",
        },
        body: form
    })
}
