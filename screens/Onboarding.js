import {
    Image,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
  } from "react-native";
  import React, { useState } from "react";
  import PagerView from "react-native-pager-view";
  import SignUp from "../components/Onbording/SignUp";
  import Review from "../components/Onbording/Review";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { createNativeStackNavigator } from "@react-navigation/native-stack";
  import Start from "../components/Onbording/Start";
  
  const Stack = createNativeStackNavigator();
  
  const Onboarding = () => {
    const [current, setCurrent] = useState(0);
  
    return (
      <SafeAreaView style={styles.container}>
        <PagerView
          style={styles.viewPager}
          initialPage={0}
          onPageSelected={({ nativeEvent }) => setCurrent(nativeEvent.position)}
        >
          <View style={styles.page} key="1">
            <Start/>
          </View>
  
          <View style={styles.page} key="2">
            <Review />
          </View>
          <View style={styles.page} key="3">
            <SignUp />
          </View>
        </PagerView>
        <View style={styles.dotContainer}>
          {[...Array(3).keys()].map((i) => (
            <View
              style={[
                styles.dot,
                { backgroundColor: i == current ? "white" : "black" },
              ]}
              key={i}
            />
          ))}
        </View>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      gap: 20,
    },
    viewPager: {
      flex: 1,
    },
    page: {},
    dot: {
      width: 10,
      aspectRatio: 1,
      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: 80,
    },
    dotContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 10,
      marginBottom: 10,
    },
  });
  
  export default Onboarding;
  