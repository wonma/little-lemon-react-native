import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Logo = () => {
  return (
    <View style={styles.logo}>
        <Image
          source={require("../assets/images/Logo.png")}
          style={{width : 200, height : 100, resizeMode : 'contain'}}
        />
        {/* <Text style={styles.title}>Welcome</Text> */}
      </View>
  )
}

export default Logo

const styles = StyleSheet.create({
    logo: {
        flexDirection : 'column',
        alignItems : 'center',
        justifyContent : 'center',
      },
      title : {
        marginLeft : -20,
        fontFamily : 'markazi-regular',
        fontSize : 32
      }
})