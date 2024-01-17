import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import Hero from "../home/Hero";
import Logo from "../Logo";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext, USER } from "../../hooks/useAuth";
import { validEmail } from "../utils/CheckEmail";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const { loadUser } = useContext(AuthContext);

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const signUp = async () => {
    console.log("press");
    if (firstName && lastName && email && validEmail(email)) {
      await AsyncStorage.setItem(
        USER,
        JSON.stringify({ firstName, email, lastName })
      );
      loadUser();
    } else {
      if (!firstName) setFirstNameError(true);
      if (!lastName) setLastNameError(true);
      if (!password) setPasswordError(true);
      if (!email || !validEmail(email)) setEmailError(true);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Logo />
      <Hero />
      <View style={styles.form}>
        <Text style={styles.lable}>
          First Name <Text style={styles.require}>*</Text>{" "}
        </Text>
        <TextInput
          value={firstName}
          onChangeText={(t) => {
            setFirstName(t);
            if (firstNameError) setFirstNameError(false);
          }}
          style={styles.input}
          keyboardType="default"
          inputMode="text"
        />
        {firstNameError && (
          <Text style={styles.error}>Please enter first name!</Text>
        )}

        <Text style={styles.lable}>
          Last Name <Text style={styles.require}>*</Text>
        </Text>
        <TextInput
          value={lastName}
          onChangeText={(t) => {
            setLastName(t);
            if (lastNameError) setLastNameError(false);
          }}
          style={styles.input}
          keyboardType="default"
          inputMode="text"
        />
        {lastNameError && (
          <Text style={styles.error}>Please enter last name!</Text>
        )}

        <Text style={styles.lable}>
          Password <Text style={styles.require}>*</Text>
        </Text>
        <TextInput
          secureTextEntry={true}
          value={password}
          onChangeText={(t) => {
            setPassword(t);
            if (passwordError) setPasswordError(false);
          }}
          style={styles.input}
        />
        {passwordError && (
          <Text style={styles.error}>Please enter passoword!</Text>
        )}

        <Text style={styles.lable}>
          Email <Text style={styles.require}>*</Text>
        </Text>
        <TextInput
          inputMode="email"
          value={email}
          onChangeText={(t) => {
            setEmail(t);
            if (emailError)
              validEmail(email) ? setEmailError(false) : setEmailError(true);
          }}
          style={styles.input}
          keyboardType="email-address"
        />
        {emailError &&
          (email ? (
            <Text style={styles.error}>Please enter valid email!</Text>
          ) : (
            <Text style={styles.error}>Please enter email!</Text>
          ))}

        <View style={{ flexDirection: "row-reverse" }}>
          <View style={styles.next}>
            <Pressable style={styles.pressable} onPress={() => signUp()}>
              <Text style={styles.pressableText}>Next</Text>
            </Pressable>
            <AntDesign name="doubleright" size={16} color="#EDEFEE" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },
  lable: {
    fontFamily: "karla-regular",
    fontSize: 16,
    color: "#495E57",
  },
  input: {
    borderRadius: 10,
    borderColor: "#000",
    borderWidth: StyleSheet.hairlineWidth,
    padding: 5,
    fontFamily: "karla-regular",
    fontSize: 16,
  },
  pressable: {
    padding: 5,
  },
  pressableText: {
    fontFamily: "karla-regular",
    fontSize: 16,
    color: "#EDEFEE",
  },
  next: {
    flexDirection: "row",
    backgroundColor: "#495E57",
    borderRadius: 10,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#495E57",
    borderWidth: StyleSheet.hairlineWidth,
  },
  form: {
    margin: 10,
    gap: 5,
  },
  require: {
    color: "#EE9972",
    fontSize: 20,
  },
  error: {
    color: "#EE9972",
    fontSize: 12,
    fontFamily: "karla-regular",
  },
});
