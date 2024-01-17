import { Pressable, Image, Text } from "react-native";

const ProfileCircle = ({avatar, navigation}) => {
    return (
        <Pressable onPress={()=>{navigation.navigate("Profile")}}>
            {
                avatar ? 
                <Image 
                style={{width: 200, height: 200}}
                source={{uri: avatar}} />
                : 
                <Text>Click to Profile</Text>
            }
        </Pressable>
    );
}

export default ProfileCircle;