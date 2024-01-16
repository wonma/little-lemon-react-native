import { View, Text, StyleSheet, Pressable } from "react-native";

const Button = ({children, activeButton, onPressAction}) => {
    return (
        <Pressable 
            onPress={
                onPressAction
            }
            style={[styles.buttonWrapper, !activeButton ? {backgroundColor: '#999999'} : {}]}>
            <Text style={styles.buttonText}>{children}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    buttonWrapper: {
        borderRadius: 8,
        backgroundColor: 'green'
    },
    buttonText: {
        fontSize: 20
    }
})

export default Button;