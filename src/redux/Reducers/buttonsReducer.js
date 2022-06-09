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
} from "my-redux/Actions/types";

const init= {
    myButtons:null,
    friendsButtons:null,
    button: null
}

function buttonsReducer(state = init, action){
    switch(action.type){
        case CREATE_BUTTON_REQUEST:
            return {
                ...state
            };
        case CREATE_BUTTON_SUCCESS:
            return {
                ...state,
            };
        case CREATE_BUTTON_ERROR:
            return {
                ...state,
                error: action.error //error.message error.code
            };
        case UPDATE_BUTTON_SUCCESS:
            return {
                ...state
            };
        case UPDATE_BUTTON_ERROR:
            return {
                ...state,
                error: action.error
            };
        case GET_MY_BUTTON_REQUEST:
            return {
                ...state
            };
        case GET_MY_BUTTON_SUCCESS:
            return {
                ...state,
                myButtons: action.data
            };
        case GET_MY_BUTTON_ERROR:
            return {
                ...state,
                error: action.error //error.message error.code
            };           
        case GET_CURRENT_BUTTON_SUCCESS:
            return {
                ...state,
                button: action.data
            };
        case GET_CURRENT_BUTTON_ERROR:
            return{
                ...state,
                error: action.error
            };
        case REMOVE_FRIEND_BUTTON_SUCCESS:
            return {
                ...state
            };
        case REMOVE_FRIEND_BUTTON_ERROR:
            return{
                ...state,
                error: action.error
            };
        case LEAVE_CURRENT_BUTTON:
            return {
                ...state,
                button: null
            };
        case GET_BUTTONS_REQUEST:
            return { 
                ...state 
            };
        case GET_BUTTONS_SUCCESS:
            return { 
                ...state,
                friendsButtons: [...action.data]
             };
        case GET_BUTTONS_ERROR:
             return {
                 ...state,
                 error: action.error
             };
        case SWITCH_BUTTONS_IN_BUTTONS: // it's a shit!
            return {
                ...state,
                friendsButtons: null,
                myButtons: null
            };
        default:
            return state;
    }
}

export default buttonsReducer;