import {View, Text, StyleSheet} from 'react-native'
import ProfileCircle from './ProfileCircle';

const MyHeader = ({title, showProfileCirCle}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {showProfileCirCle === true ?  
            <ProfileCircle /> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'yellow',
        width: '100%',
        height: 200,
        flex: 1
    },
    title: {
        fontSize: 20
    }
})

export default MyHeader;