import { Button, Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "../screens/Onboarding";
import Profile from "../screens/Profile";
import { AuthContext } from "../hooks/useAuth";
import Home from "../screens/Home";
import Logo from "./Logo";
import Avatar from "./profile/Avatar";
import SignUp from "./Onbording/SignUp";
const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { isLoading, user } = useContext(AuthContext);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoading ? (
          <Stack.Screen
            name="onbroading"
            component={Onboarding}
            options={{ header: () => <></> }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerTitle: () => <Logo />,
                headerRight: () => <HeaderRight />,
                headerLeft: () => <View style={{ width: "20%" }} />,
              }}
            />
            <Stack.Screen
              name="profile"
              component={Profile}
              options={{
                headerTitle: () => <Logo />,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  hearderTitle: {
    alignItems: "center",
    justifyContent: "center",
  },
});

const Header = () => {
  return (
    <Image
      source={require("../assets/images/Logo.png")}
      style={{ resizeMode: "contain", width: 200, height: 50 }}
    />
  );
};

const HeaderRight = () => {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.push("profile")}>
      <Avatar width={50} height={50} fontSize={24}/>
    </Pressable>
  );
};
