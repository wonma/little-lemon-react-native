import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext, USER } from "../hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from "expo-checkbox";
import EditableText from "../components/form/EditableText";
import Avatar from "../components/profile/Avatar";
import { validEmail } from "../components/utils/CheckEmail";
import * as ImagePicker from 'expo-image-picker';


const Profile = () => {
  const { user, updateUser, setIsLoading, loadUser } = useContext(AuthContext);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user?.phone);
  const [profile, setProfile] = useState(user?.profile);
  const [edit, setEdit] = useState(false);

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const [order, setOrder] = useState(user?.order);
  const [passChange, setPassChange] = useState(user?.passChange);
  const [offers, setOffers] = useState(user?.offers);
  const [news, setNews] = useState(user?.news);

  const save = () => {
    if (firstName && lastName && email && validEmail(email)) {
      setEdit(false);
      updateUser({
        firstName,
        lastName,
        email,
        phone,
        order,
        passChange,
        offers,
        news,
      });
    } else {
      if (!firstName) setFirstNameError(true);
      if (!lastName) setLastNameError(true);
      if (!email || !validEmail(email)) setEmailError(true);
    }
  };

  const discard = () => {
    setEdit(false);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setPhone(user?.phone);
  };
  const logOut = async () => {
    await AsyncStorage.removeItem(USER);
    setIsLoading(true);
    loadUser();
  };

  const choose = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    updateUser({profile : result.assets[0].uri})
  }

  const remove = () => {
    updateUser({profile : null})
  }
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Profile</Text>
      <Text style={styles.avatarText}>Avatar</Text>

      <View style={styles.avatarContainer}>
        <Avatar />
        {edit && (
          <View style={styles.buttonContainer}>
            {profile && (
              <Pressable onPress={() => remove()} style={styles.pressable}>
                <Text style={styles.pressableText}>Remove</Text>
              </Pressable>
            )}
            <Pressable onPress={() => choose()} style={styles.pressable}>
              <Text style={styles.pressableText}>Choose</Text>
            </Pressable>
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        {!edit && (
          <Pressable style={styles.pressable} onPress={() => setEdit(true)}>
            <Text style={styles.pressableText}>Edit</Text>
          </Pressable>
        )}
      </View>
      <View style={styles.form}>
        <EditableText
          edit={edit}
          value={firstName}
          onChangeText={(t) => {
            setFirstName(t);
            if (firstNameError) setFirstNameError(false);
          }}
          error={firstNameError}
          errorComponent={
            <Text style={styles.error}>Please enter first name!</Text>
          }
          keyboardType="default"
          lable="First Name"
        />
        <EditableText
          edit={edit}
          value={lastName}
          onChangeText={(t) => {
            setLastName(t);
            if (lastNameError) setLastNameError(false);
          }}
          error={lastNameError}
          errorComponent={
            <Text style={styles.error}>Please enter last name!</Text>
          }
          keyboardType="default"
          lable="Last Name"
        />
        <EditableText
          edit={edit}
          value={email}
          onChangeText={(t) => {
            setEmail(t);
            if (emailError)
              validEmail(email) ? setEmailError(false) : setEmailError(true);
          }}
          error={emailError}
          errorComponent={
            emailError &&
            (email ? (
              <Text style={styles.error}>Please enter valid email!</Text>
            ) : (
              <Text style={styles.error}>Please enter email!</Text>
            ))
          }
          keyboardType="email-address"
          lable="Email"
        />
        <EditableText
          edit={edit}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          lable="Phone"
        />

        <View style={styles.checkboxContainer}>
          <Text style={styles.title}>Email Notifications</Text>
          <View style={styles.checkboxView}>
            <Checkbox value={order} onValueChange={setOrder} disabled={!edit} />
            <Pressable
              onPress={() => setOrder((prev) => !prev)}
              disabled={!edit}
            >
              <Text style={styles.lable}>Order Statuses</Text>
            </Pressable>
          </View>
          <View style={styles.checkboxView}>
            <Checkbox
              value={passChange}
              onValueChange={setPassChange}
              disabled={!edit}
            />
            <Pressable
              onPress={() => setPassChange((prev) => !prev)}
              disabled={!edit}
            >
              <Text style={styles.lable}>Password Change</Text>
            </Pressable>
          </View>
          <View style={styles.checkboxView}>
            <Checkbox
              value={offers}
              onValueChange={setOffers}
              disabled={!edit}
            />
            <Pressable
              onPress={() => setOffers((prev) => !prev)}
              disabled={!edit}
            >
              <Text style={styles.lable}>Special Offers</Text>
            </Pressable>
          </View>
          <View style={styles.checkboxView}>
            <Checkbox value={news} onValueChange={setNews} disabled={!edit} />
            <Pressable
              onPress={() => setNews((prev) => !prev)}
              disabled={!edit}
            >
              <Text style={styles.lable}>NewsLetter</Text>
            </Pressable>
          </View>
        </View>
      </View>

      {edit ? (
        <View style={styles.buttonContainer}>
          <Pressable onPress={() => discard()} style={styles.pressable}>
            <Text style={styles.pressableText}>Discard Changes</Text>
          </Pressable>
          <Pressable onPress={() => save()} style={styles.pressable}>
            <Text style={styles.pressableText}>Save Changes</Text>
          </Pressable>
        </View>
      ) : (
        <Pressable onPress={() => logOut()} style={styles.pressable}>
          <Text style={styles.pressableText}>Log out</Text>
        </Pressable>
      )}
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {},
  avatarContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  avatarText: {
    fontFamily: "karla-regular",
    fontSize: 12,
    marginTop: 10,
    marginStart: 10,
  },
  buttonContainer: {
    margin: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxContainer: {
    gap: 10,
  },
  checkboxView: {
    marginStart: 20,
    gap: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontFamily: "karla-regular",
    fontSize: 24,
    marginHorizontal: 10,
  },

  pressable: {
    padding: 5,
    backgroundColor: "#495E57",
    borderRadius: 20,
    alignItems: "center",
    padding: 10,
    height: 40,
    margin: 5,
  },
  pressableText: {
    fontFamily: "karla-regular",
    fontSize: 16,
    color: "#EDEFEE",
  },
  form: {
    margin: 10,
    gap: 5,
  },
  lable: {
    fontFamily: "karla-regular",
    fontSize: 16,
    color: "#495E57",
  },
  error: {
    color: "#EE9972",
    fontSize: 12,
    fontFamily: "karla-regular",
  },
});
