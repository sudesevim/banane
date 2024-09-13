import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FlashMessage from "react-native-flash-message";
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Login from "./pages/auth/Login";
import Sign from "./pages/auth/Sign";
import Messages from "./pages/Messages"; 
import colors from './styles/colors';

const Stack = createNativeStackNavigator();

export default () => {
  const [userSession, setUserSession] = useState();

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      setUserSession(!!user);
    })
  }, [])
  const AuthStack = () => { 
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="LoginPage" component={Login} />
        <Stack.Screen name="SignPage" component={Sign} />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      {!userSession ? (
      <AuthStack />
      ) : (
        <Stack.Navigator>
        <Stack.Screen 
        name="MessagesScreen" 
        component={Messages} 
        options={{title: 'Paylaşımlar', headerTintColor: colors.darkgreen,
          headerRight: () => <Icon name="logout" size={30} color={colors.darkgreen} onPress={() => auth().signOut()}/>
        }} />
        </Stack.Navigator>
      )}
        
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};