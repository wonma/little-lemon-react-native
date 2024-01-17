import { useEffect, useState, createContext, useReducer } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import AsyncStorage from '@react-native-async-storage/async-storage';


import Onboarding from './screens/Onboarding';
import Splash from './screens/Splash';
import Profile from './screens/Profile';
import Home from './screens/Home';

const Stack = createNativeStackNavigator();
export const AuthContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'complete_onboarding': {
      return {
        ...state,
        onBoardingStatus: true
      };
    }
    case 'incomplete_onboarding': {
      return {
        ...state,
        onBoardingStatus: false
      };
    }
    case 'update_user': {
      return {
        ...state,
        user: {
          ...state.user,
          ...action.userInfo
        }
      };
    }
  }
  throw Error('Unknown action: ' + action.type);
}

const initialState = { 
  onBoardingStatus: false,
  user: {
    firstName:'',
    lastName: '',
    email: '',
    avatar: '',
    phoneNumber: '',
    notification: {
      orderStatus: true,
      passwordChange: true,
      specialOffer: true,
      newsletter: true
    }
  }
};


export default function App() {
  const [ isLoading, setIsLoading ] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  if(isLoading) {
    return (
      <Splash />
    )
  }

  return (
    <NavigationContainer>
      <AuthContext.Provider value={{state, dispatch}}>
        <Stack.Navigator>
          {
            state.onBoardingStatus ? (
            // Onboarding completed, user is signed in
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Profile" component={Profile} />
            </>
            ) : (
            // User is NOT signed in
            <Stack.Screen name="Onboarding" component={Onboarding}/>
            )
          }
        </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
