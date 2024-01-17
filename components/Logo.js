import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Logo = () => {
  return (
    <View style={styles.logo}>
        <Image
          source={require("../assets/adaptive-icon.png")}
          style={{width : 80, height : 50, resizeMode : 'cover'}}
        />
        <Text style={styles.title}>Little Lemon</Text>
      </View>
  )
}

export default Logo

const styles = StyleSheet.create({
    logo: {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',
      },
      title : {
        marginLeft : -20,
        fontFamily : 'markazi-regular',
        fontSize : 32
      }
})