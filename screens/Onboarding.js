import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../App';

import { Text, TextInput, StyleSheet, View, Alert, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button';
import { validateEmail, validateFirstName } from '../utils';

function Onboarding () {
    const [ firstName, setFirstName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ isNameValid, setIsNameValid ] = useState(false);
    const [ isEmailValid, setIsEmailValid ] = useState(false);
    const { setIsOnboardingCompleted } = useContext(AuthContext);

    let activeButton = isNameValid && isEmailValid ;
    
    const onPressAction = async () => {
        try {
            const jsonValue = await JSON.stringify({
                firstName,
                lastName: '',
                email,
                avatar: '',
                phoneNumber: '',
                notification: {
                  orderStatus: true,
                  passwordChange: true,
                  specialOffer: true,
                  newsletter: true
                }
            })
            await AsyncStorage.setItem('loginInfo', jsonValue)
            await setIsOnboardingCompleted(true)
            await console.log(jsonValue)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>First Name</Text>
            <TextInput 
                style={styles.input}
                onChangeText={(text)=>{
                    setFirstName(text)
                    setIsNameValid(validateFirstName(text))
                }}
                value={firstName}
            />
            <Text style={styles.label}>Email</Text>
            <TextInput 
                style={styles.input}
                onChangeText={(text)=>{
                    setEmail(text)
                    setIsEmailValid(validateEmail(text))
                }}
                value={email}
            />
            <Button 
                onPressAction={onPressAction}
                activeButton={activeButton}
            >Next</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    label: {
        fontSize: 16
    },
    input: {
        borderRadius: 8,
        borderWidth: 1
    }
});

export default Onboarding;