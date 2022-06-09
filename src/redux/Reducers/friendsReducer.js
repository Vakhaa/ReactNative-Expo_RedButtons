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
} from "my-redux/Actions/types";

const init= {
    friends:[],
    people:[],
    friendPage:{
        isBlockButton: false
    }
}

function friendsReducer(state = init, action){
    switch(action.type){
        case LIVE_FROM_FRIEND_PAGE:
            return {
                ...state,
                friendPage:{
                    isBlockButton: false
                }
            };
        case ADD_FRIEND_REQUEST:
            return {
                ...state,
                friendPage:{
                    isBlockButton: true
                }
            };
        case ADD_FRIEND_SUCCESS:
            return {
                ...state,
                friendPage:{
                    isBlockButton: false
                }
            };
        case ADD_FRIEND_ERROR:
            return {
                ...state,
                friendPage:{
                    isBlockButton: false
                },
                error: action.error //error.message error.code
            };
        case REMOVE_FRIEND_REQUEST:
            return { 
                ...state,
                friendPage:{
                    isBlockButton: true
                }
             };
        case REMOVE_FRIEND_SUCCESS:
            return { 
                ...state,
                friendPage:{
                    isBlockButton: false
                }
             };
        case REMOVE_FRIEND_ERROR:
            return {
                ...state,
                friendPage:{
                    isBlockButton: false
                },
                error: action.error
            };
        case GET_FRIENDS_REQUEST:
            return {
                ...state
            };
        case GET_FRIENDS_SUCCESS:
            return {
                ...state, 
                friends: action.data 
            };
        case GET_FRIENDS_ERROR:
            return {
                ...state, 
                error: action.error //error.message error.code
            };
        case GET_PEOPLE_REQUEST:
            return {
                ...state
            };
        case GET_PEOPLE_SUCCESS:
            return{
                ...state,
                people: action.data
            };
        case GET_PEOPLE_ERROR:
            return{
                ...state,
                error: action.error
            };
        case GET_FRIENDS_ID_SUCCESS:
            return{
                ...state,
                friends: action.data
            };
        case GET_FRIENDS_ID_ERROR:
            return{
                ...state,
                error: action.error
            };
        default:
            return state;
    }
}

export default friendsReducer;