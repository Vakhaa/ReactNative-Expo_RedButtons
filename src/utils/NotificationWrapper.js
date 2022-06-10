import React, {useState, useEffect, useRef} from 'react';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { useDispatch } from 'react-redux';
import { initTokenNotifyAction } from '../redux/Actions/authAction';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

Notifications.addNotificationReceivedListener((notification)=>{
  // alert(`we received a notofication!`);
  // we can add some data  to state, or what
})

export default function NotificationWrapper({children, ...props}){

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const dispatch = useDispatch();

  const lastNotificationResponse = Notifications.useLastNotificationResponse();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      setExpoPushToken(token);
      dispatch(initTokenNotifyAction(token));
    });

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });
    
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(()=>{
    if(lastNotificationResponse)
      console.log(lastNotificationResponse.notification.request.content.data)
      //Linking.openURL("url");
  },[lastNotificationResponse]);

  return (<>
  {children}
  </>)
}

async function registerForPushNotificationsAsync() {

  if (!Device.isDevice) {
      alert('Must use physical device for Push Notifications');
      return null;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();

  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync(); 
      finalStatus = status;
  }

  if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return null;
  }

  token = (await Notifications.getExpoPushTokenAsync()).data;
  // const token = (await Notifications.getDevicePushTokenAsync()).data;

  if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
      });
  }

  return token;
}

export async function schedulePushNotification() { // local push notifi
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: 'Here is the notification body',
        data: { data: 'goes here' },
      },
      trigger: { seconds: 2 },
    });
}

export async function sendRemoteNotify(token, title, body){
  let data = { 
    to: token, //token
    title,
    body
  }

  const response = await fetch("https://exp.host/--/api/v2/push/send",{
    method: "POST",
    headers:{
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(data)
  });
  	
  return await response.json();
}
