import { createContext, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const USER = "user";
export const AuthContext = createContext({});

export default useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});

  const loadUser = async () => {
    let loadedUser = JSON.parse(await AsyncStorage.getItem(USER));
    if (loadedUser) {
      setUser(loadedUser);
      setIsLoading(false);
    }
    SplashScreen.hideAsync();
  };

  const updateUser = async (u) => {
    const existsUser = {...user, ...u};
    await AsyncStorage.setItem(USER, JSON.stringify(existsUser));
    await loadUser();
  };

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    loadUser();
  }, []);

  return { isLoading, user, updateUser, setIsLoading, loadUser };
};
