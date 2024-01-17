import { Pressable, Image } from "react-native";

const MyBackButton = () => {
    return (
        <Pressable>
            <Image source={require('../assets/back-button.png')} style={{width: 30, height: 30}}/>
        </Pressable>
    );
}
export default MyBackButton;