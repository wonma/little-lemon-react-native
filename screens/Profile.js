import { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import Button from '../components/Button';
import { AuthContext } from '../App';
import * as ImagePicker from 'expo-image-picker';
import { validatePhoneNumber } from '../utils';

function Profile () {
  const [ user, setUser ] = useState(null);
  const {setIsOnboardingCompleted} = useContext(AuthContext);

  useEffect(()=> {
    (async () => {
      try{
          const jsonValue = await AsyncStorage.getItem('loginInfo');
          const result = await jsonValue !== null ? JSON.parse(jsonValue) : null;
          await result && setUser(result);
          await console.log(user);
      } catch(e){
          console.log(e)

      }
  })()
  }, [])

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setUser({
        ...user,
        avatar: result.assets[0].uri
      });
    }
  };
1

  const logOut = () => {
    setIsOnboardingCompleted(false)
  }

  const updateStorage = async () => {
    await AsyncStorage.mergeItem('loginInfo', JSON.stringify(user))
    // read merged item
    const currentUserInfo = await AsyncStorage.getItem('loginInfo')
    console.log(currentUserInfo)
  }

  const discardChange = async() => {
    try{
      const jsonValue = await AsyncStorage.getItem('loginInfo');
      const result = await jsonValue !== null ? JSON.parse(jsonValue) : null;
      await result && setUser(result);
      await console.log(user);
    } catch(e){
        console.log(e)
    }
  }

  return (
      <View>
          <View>
              <Text>Header</Text>
              <Image source={require("../assets/favicon.png")} /> 
          </View>
          <View>
              <Text>First Name:</Text>
              <TextInput
                value={user === null ? 'Not registered': user.firstName}
                onChangeText={(text) => setUser({...user, firstName: text})}
              />
          </View>
          <View>
              <Text>Notification customizing</Text>
          </View>
          <View>
            <TextInput onChangeText={(text) => 
              setUser({
                ...user,
                phoneNumber: text
              })} 
              placeholder='(334)123-1234'
              keyboardType='phone-pad'
              value={user && user.phoneNumber}
            />
          </View>
          <View style={{borderRadius: 100}}>
            {user !== null ? 
               (
                user.avatar ? <Image source={{uri: user.avatar }}  style={{ width: 200, height: 200 }}/> : <Text>Initial</Text>
               ): <Text>Not registered..</Text>}
            <Button activeButton={true} onPressAction={pickImage}>Pick Image</Button>
          </View>
          <Button activeButton={true} onPressAction={discardChange}>Discard Change</Button>
          <Button activeButton={true} onPressAction={updateStorage}>Save Change</Button>
          <Button activeButton={true} onPressAction={logOut}>Logout</Button>
      </View>
  )
}

export default Profile;