import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import ReviewCard from "./ReviewCard";
import Logo from "../Logo";

const Review = () => {
  return (
    <>
      <Logo />
      <View style={styles.container}>
        {[...Array(3).keys()].map((i) => (
          <ReviewCard key={i} star={Math.round((Math.random() * 10) / 2)} />
        ))}
      </View>
    </>
  );
};

export default Review;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
});
