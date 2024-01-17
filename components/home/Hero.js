import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const Hero = ({ children }) => {
  return (
    <View style={styles.hero}>
      <View>
        <Text style={styles.heroTitle}>Little Lemon</Text>
        <Text style={styles.heroSubTitle}>Chicago</Text>
        <View style={styles.heroTextContainer}>
          <Text style={styles.heroText} numberOfLines={5}>
            We are a family owned Mediterranean restaurant, focused on
            traditioinal recipes served with a modern twist.
          </Text>
        </View>
      </View>
      <Image
        source={require("../../assets/images/HeroImage.png")}
        style={styles.heroImage}
      />
      {children}
    </View>
  );
};

export default Hero;

const styles = StyleSheet.create({
    hero: {
        gap: 10,
        backgroundColor: "#495E57",
        padding: 10,
      },
      heroTextContainer: {
        width: "50%",
      },
      heroTitle: {
        fontFamily: "markazi-regular",
        fontSize: 56,
        color: "#F4CE14",
      },
      heroSubTitle: {
        fontFamily: "markazi-regular",
        fontSize: 48,
        color: "#EDEFEE",
      },
      heroText: {
        fontFamily: "markazi-regular",
        fontSize: 18,
        color: "#EDEFEE",
      },
      heroImage: {
        position: "absolute",
        top: 70,
        right: 10,
        width: 150,
        height: 150,
        borderRadius: 20,
        resizeMode: "cover",
      },
});
