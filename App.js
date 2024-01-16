import { useEffect, useState, createContext, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


import Onboarding from './screens/Onboarding';
import Splash from './screens/Splash';
import Profile from './screens/Profile';
import Home from './screens/Home';

const Stack = createNativeStackNavigator();
export const AuthContext = createContext();

export default function App() {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isOnboardingCompleted, setIsOnboardingCompleted ] = useState(false);
  const authContext = useMemo(() => ({
    setIsOnboardingCompleted
  }))

  if(isLoading) {
    return (
      <Splash />
    )
  }

  return (
    <NavigationContainer>
      <AuthContext.Provider value={authContext}>
        <Stack.Navigator>
          {
            isOnboardingCompleted ? (
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
