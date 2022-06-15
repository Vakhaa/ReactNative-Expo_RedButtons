// import 'react-native-gesture-handler'; // depercated
import React from 'react';
import { StyleSheet} from 'react-native';
import Navigation from './src/components/Navigation/Navigation';
import { Provider } from 'react-redux';
import { store } from './src/redux/Store/store';
import NotificationWrapper from './src/utils/NotificationWrapper';
import { initFirebase } from 'utils/Firebase';
// imagePicker 'image/${type}' | 29 strochka
// Гит хаб
// Auth -> error -> view 
// when logout -> wipe all data ?
// При регистрации сохранять дату, что бы выводить новых пользователей на верх
// Search

//Историю событий для каждой кнопки
// Сделать общую историю событий, возможно потребуеться отдельная коллекция, что будет содержать списки
// notifyHistory / [userid] / [{ message: "sosi", sendAt:"11.01.2011 14:41", button: buttonId}] или же в кнопек держать
//DeepLink -> link -> напрвлять по уведомлению на страницу твоих историй, или все же на логин ?

//Notify mute, возможность покинуть кнопку !
//Настрйоки не для владельца кнопки, redux + bd !

initFirebase();

export default function App() {

  return (
    <Provider store={store}>
      <NotificationWrapper>
        <Navigation/>
      </NotificationWrapper>
    </Provider>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems:'center',
    justifyContent: 'center'
  },
  text:{
    color:"#000",
    fontSize:20,
    margin:10 
  },
  input:{
    width:200,
    borderWidth: 1,
    borderColor:'#555',
    borderRadius:5,
    textAlign:'center',
    fontSize:20
  }
});
