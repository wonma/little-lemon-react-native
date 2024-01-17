import { Pressable, Image, Text, StyleSheet } from "react-native";

const ProfileCircle = ({avatar, navigation}) => {
    return (
        <Pressable 
            style={styles.container}
            onPress={()=>{navigation.navigate("Profile")}}
        >
            {
                avatar ? 
                <Image 
                style={styles.image}
                source={{uri: avatar}} />
                : 
                <Text>Click to Profile</Text>
            }
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 100
    },
    image: {
        width: 60, 
        height: 60,
        borderRadius: 100
    }
})

export default ProfileCircle;