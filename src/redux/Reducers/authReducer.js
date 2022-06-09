import { 
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_ERROR,
    SIGNIN_REQUEST,
    SIGNIN_SUCCESS,
    SIGNIN_ERROR,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_ERROR,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_ERROR,
    SET_TOKEN_NOTIFY_SUCCESS,
    SET_TOKEN_NOTIFY_ERROR,
    INIT_TOKEN_NOTIFY,
    CLEAR_AUTH_ERROR
} from "my-redux/Actions/types";

const initialState = {
    user: null,
    isLogin : false,
    tokenNotify: null,
    profilePage : {
        isSave: true
    }
}

function authReducer(state = initialState, action){
    switch(action.type){
        case CLEAR_AUTH_ERROR:
            return {
                ...state,
                error: null
            }
        case SIGNIN_REQUEST:
            return {
                ...state
            };
        case SIGNIN_SUCCESS:
            return {
                ...state,
                user: action.data.user,
                isLogin: action.data.isLogin,
                error: null
            };
        case SIGNIN_ERROR:
            return {
                ...state,
                error: action.error //error.message error.code
            };
        case AUTH_REQUEST:
            return {
                ...state
            };
        case AUTH_SUCCESS:
            return {
                ...state, 
                user: action.data.user,
                isLogin: action.data.isLogin,
                error: null
            };
        case AUTH_ERROR:
            return {
                ...state, 
                error: action.error //error.message error.code
            };
        case LOGOUT_REQUEST:
            return {
                ...state
            };
        case LOGOUT_SUCCESS:
            return {
                ...state, 
                user: null,
                isLogin:false,
                error: null
            };
        case LOGOUT_ERROR:
            return {
                ...state,
                error: action.error //error.message error.code
            };
        case UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                profilePage:{
                    isSave: false
                }
            };
        case UPDATE_PROFILE_SUCCESS:
            let email = action.data.email;
            if(!email) email = state.user.email;
            return {
                ...state,
                user: {...action.data, email},
                profilePage:{
                    isSave: true
                }
            };
        case UPDATE_PROFILE_ERROR:
            return{
                ...state,
                profilePage:{
                    isSave: true
                }
            };
        case SET_TOKEN_NOTIFY_SUCCESS:
            return {
                ...state
            };
        case SET_TOKEN_NOTIFY_ERROR:
            return {
                ...state
            };
        case INIT_TOKEN_NOTIFY:
            return {
                ...state,
                tokenNotify: action.data
            };
        default:
            return state;
    }
}

export default authReducer;