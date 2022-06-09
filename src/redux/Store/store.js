import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'my-redux/Reducers/authReducer';
import friendsReducer from 'my-redux/Reducers/friendsReducer';
import buttonsReducer from 'my-redux/Reducers/buttonsReducer';

export const store = configureStore({
    reducer: {
      auth: authReducer,
      friends: friendsReducer,
      buttons: buttonsReducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  })


// Can still subscribe to the store
store.subscribe(() => console.log(store.getState()))


//Przyszłość
// const rootReducer = combineReducer({
//     user: userReducer
// });

// export const store = createStore(rootReducer, applyMiddleware(thunk));