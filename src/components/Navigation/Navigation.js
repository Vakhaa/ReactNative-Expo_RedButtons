import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ButtonsPage from '../ButtonsPage/ButtonsPage';
import Profile from '../Profile/Profile';
import { colors } from 'res';
import Login from '../Login/Login';
import FriendsPage from '../FriendsPage/FriendsPage';
import FriendPage from '../FriendPage/FriendPage';
import ButtonPage from '../ButtonPage/ButtonPage';
import SignUp from '../SignUp/SignUp';

import { useDispatch } from 'react-redux';
import { logout } from 'my-redux/Actions/authAction';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function Navigation() {

  return (
    <NavigationContainer>
      <Stack.Navigator  screenOptions={{ headerShown: false }} initialRouteName="Login">
        <Stack.Screen name="Profile" component={TabNavigation}/>
        <Stack.Screen name="Friends" component={TabNavigation}/>
        <Stack.Screen name="Buttons" component={TabNavigation}/>
        <Stack.Screen name="Friend" component={FriendPage} />
        <Stack.Screen name="Button" component={ButtonPage} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Sign Up" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const TabNavigation = ({navigation}) => {
  return <>
  <Tab.Navigator
     initialRouteName='Buttons'
     activeColor={colors.error}
     inactiveColor={colors.secondary}
     barStyle={{ backgroundColor: "#fff", borderTopColor:'#00000050', borderTopWidth:1}}
     >
      <Tab.Screen name="Profile" component={Profile} options={{
        tabBarIcon: ({focused, size, color}) => <FontAwesome5 name={"grin-alt"} size={ focused ? 25: 20} color={color}/>
      }}/>
       <Tab.Screen name="Buttons" component={ButtonsPage} options={{
        tabBarIcon: ({focused, size, color}) => <FontAwesome5 name={"dot-circle"} size={ focused ? 25: 20} color={color}/>
      }}/>
       <Tab.Screen name="Friends" component={FriendsPage} options={{
        tabBarIcon: ({focused, size, color}) => <FontAwesome5 name={"address-book"} size={ focused ? 25: 20} color={color}/>
      }}/>
      <Tab.Screen name="Logout" component={Logout} options={{
        tabBarIcon: ({focused, size, color}) => <FontAwesome5 name="caret-square-right" size={focused ? 25: 20} color={color}/>
      }}/>
     </Tab.Navigator>
  </>
}

const Logout = ({navigation}) => {

  const dispatch = useDispatch();

  dispatch(logout()); 
  navigation.navigate('Login');

  return (<></>)
}