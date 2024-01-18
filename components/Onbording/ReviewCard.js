import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign } from "@expo/vector-icons";


const ReviewCard = ({star}) => {
    return (
        <View style={styles.container}>
          <View style={styles.starContainer}>
            {[...Array(5).keys()].map((i) => (
              <AntDesign key={i} name="star" size={24} color={i < star ? "#f8cb59" : 'white'} />
            ))}
          </View>
          <View style={styles.card}>
            <Image
              source={require("../../assets/images/Profile.png")}
              style={{ width: 60, height: 60, resizeMode: "center", borderRadius : 50 }}
            />
            <View>
              <Text style={styles.text}>Sara Lopez</Text>
              <Text style={styles.text}>Sara 72</Text>
            </View>
          </View>
            <Text style={[styles.text, {width : 200}]} numberOfLines={3}>
              "We love Little Lemon so much!!"
            </Text>
        </View>
      );
}

export default ReviewCard

const styles = StyleSheet.create({
    container: {
        padding : 10,
        justifyContent: "center",
        gap : 10,
        // borderWidth : StyleSheet.hairlineWidth,
        // borderColor : '#333333',
        backgroundColor : '#afcc8b',
        borderRadius : 10,
      },
      starContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
      },
      card: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap : 10
      },
      text : {
        textAlign : "justify",
        fontFamily : 'karla-regular',
        fontSize : 12,
        marginHorizontal : 10
      }
})