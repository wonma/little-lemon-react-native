import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Logo from "../Logo";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";

const Start = () => {
  return (
    <View style={styles.container}>
      <Logo />

      <MaskedView
        style={{flexDirection: "row", flex : 1}}
        maskElement={
          <View style={{flex : 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.title}>Welcome to Little Lemon</Text>
          </View>
        }
      >
        <LinearGradient
          style={{ flex: 1 }}
          colors={["#F4CE14", "#EE9972", "#FBDABB", "#EDEFEE"]}
          start={{ x: 0.1, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        ></LinearGradient>
      </MaskedView>
    </View>
  );
};

export default Start;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "markazi-regular",
    fontSize: 32,
  },
});
