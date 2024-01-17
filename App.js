import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native";
import useAuth, { AuthContext } from "./hooks/useAuth";
import Navigation from "./components/Navigation";
import { useFonts } from "expo-font";
import { useCallback, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

export default function App() {
  const auth = useAuth();
  const [loaded, error] = useFonts({
    "karla-regular": require("./assets/Fonts/Karla-Regular.ttf"),
    "markazi-regular": require("./assets/Fonts/MarkaziText-Regular.ttf"),
  });

  useEffect(() => {
    (async () => await SplashScreen.preventAutoHideAsync())();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (loaded) {
      await SplashScreen.hideAsync();
    }
  }, [loaded]);
  if(!loaded){
    return null;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
    <View style={styles.container} onLayout={onLayoutRootView}>
      <AuthContext.Provider value={{ ...auth }}>
        <Navigation />
      </AuthContext.Provider>
    </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
