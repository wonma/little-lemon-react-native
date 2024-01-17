import { StyleSheet, Text, View } from "react-native";
import React from "react";

const NoProfile = ({ first, last, width, height, fontSize }) => {
  return (
    <View style={[styles.container, {width, height}]}>
      <Text style={[styles.text, {fontSize}]}>
        {first}
        {last}
      </Text>
    </View>
  );
};

export default NoProfile;

const styles = StyleSheet.create({
  container: {
    borderWidth : StyleSheet.hairlineWidth,
    borderRadius: 100,
    backgroundColor: "#F4CE14",
    justifyContent : 'center',
    alignItems : 'center',
  },
  text: {
    fontFamily : 'markazi-regular',
    color : '#EDEFEE'
  },
});
