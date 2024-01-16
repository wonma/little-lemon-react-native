import { View, Text } from 'react-native';
import Button from '../components/Button';

function Home({navigation}) {
    return (
        <View>
            <Button activeButton={true} onPressAction={()=>{navigation.navigate("Profile")}}>
                Go to theProfile
            </Button>
        </View>
    )
}

export default Home;