import { Image, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../hooks/useAuth";
import NoProfile from "./NoProfile";

const Avatar = ({ width = 84, height = 84, fontSize = 36 }) => {
  const { user } = useContext(AuthContext);
  if (user.profile) {
    return (
      <Image
        source={{ uri: user.profile }}
        style={[styles.avatar, { width, height }]}
      />
    );
  }
  return (
    <NoProfile
      fontSize={fontSize}
      first={user.firstName[0]}
      last={user.lastName[0]}
      width={width}
      height={height}
    />
  );
};

export default Avatar;

const styles = StyleSheet.create({
  avatar: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 100,
    backgroundColor: "#F4CE14",
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "center",
  },
});
